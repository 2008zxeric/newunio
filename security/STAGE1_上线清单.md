# Stage 1 上线清单（代码已就绪，分支 `security/hardening`）

改动已提交并本地实测通过（`vite build` + `vite preview` 逐页验证），**未部署，线上不受影响**。

## 已完成的改动

| 文件 | 改动 |
|---|---|
| `src/lib/auth.tsx` | 登录优先走 `supabase.auth.signInWithPassword`；过渡期保留 `admin_users.password_hash` 兜底；登出同步 `signOut()` |
| `src/lib/auth.tsx` | 删除前端硬编码明文密码（`yuan/he/sheng`），`getUserPassword()` 返回 undefined |
| `api/oracle-proxy.ts` / `api/scent-recommendation.ts` | 增加 Origin 白名单（本站 + localhost），削弱第三方盗用 AI 额度 |
| `security/*.sql` | Stage 0 已执行；Stage 2 全量 RLS 待执行 |

实测结果：生产 bundle 中明文密码已为 0 处；本地预览首页/馆藏/登录页正常；`/auth/v1/token` 对错误密码返回 `invalid_credentials`（走兜底，老账号仍能登录）。

## 上线步骤

1. **建 Supabase Auth 账号**（Dashboard → Authentication → Users → Add user，关闭邮箱确认）
   - `eric@unioaroma.com`（超级管理员）
   - `yuan@unioaroma.com`（管理员）
   - `he@unioaroma.com`（查看）
   - `sheng@unioaroma.com`（仓库）
   - `xiang@unioaroma.com`（编辑）
   - 密码用强密码；用户名规则固定为 `用户名@unioaroma.com`
2. **部署预览**：`vercel`（不带 --prod）→ 用 eric 新密码登录 → 检查 产品/横幅/文案/库存/系列/图片 各页
3. **上生产**：`vercel --prod --force` → `vercel alias set`（主域 + www，一次一个）
4. **执行 RLS**：`security/2026-09-30_stage2_target_rls.sql`
5. **验收**（用匿名探针）
   - `PATCH /rest/v1/products?id=eq.<不存在>` → 期望 401
   - `GET /rest/v1/products?limit=1` → 期望 200
   - `GET /rest/v1/admin_users` → 期望 401
   - 前台下单一次 → 成功写入 orders

## 已知限制（不在本次范围）

- `orders` 的 SELECT 仍对匿名开放：订单按 `wechat_id` 归属，没有顾客登录态，收紧了「我的档案-订单」就查不到。彻底解决需要顾客侧登录体系。
- 后台「用户管理/修改密码」在 Stage 0 后已无写权限，需在 Stage 1 里改为调用 `supabase.auth.admin`（服务端）或暂时由 Supabase 控制台维护密码。
