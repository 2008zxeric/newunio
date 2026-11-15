# UNIO AROMA 安全加固（2026-09-30 体检发现）

## 现状（实测）
Supabase 项目 `xuicjydgtoltdhkbqoju` 的 public 表未启用 RLS，配合前台公开的 anon key：

| 表 | 匿名可读 | 匿名可写 | 风险 |
|---|---|---|---|
| admin_users | 是（含 password_hash） | 是 | **可改密码哈希后直接登录后台 = 接管** |
| orders | 是（wechat_id / 备注 / 金额） | 是 | 客户信息泄露、订单可篡改 |
| products / banners | 是 | 是 | 价格、横幅可被任意修改 |
| audit_logs | 是（用户名/IP/UA） | 是（插入） | 内部操作记录泄露 |

密码算法：`sha256("unio_aroma_" + 密码)`（固定盐），哈希公网可读 → 可离线爆破。

## 分阶段处置

### Stage 0（立即执行，本目录 `2026-09-30_stage0_lock_admin.sql`）
- 收回 anon 对 `admin_users` 的写权限 → 接管链断开
- 收回 anon 对 `audit_logs` 的读权限
- 影响：后台「用户管理 / 修改密码」暂时不可用；「审计日志」页面空数据
- 前台、下单、AI 问诊、后台其他页面不受影响
- 可 1 分钟内回滚（文件末尾两行 grant）

### Stage 1（需改代码 + 上线）
后台登录从「前端比对哈希」改为 Supabase Auth（`signInWithPassword`）：
- 在 Supabase Authentication 中为 eric / he / sheng 建账号（邮箱 + 强密码）
- `src/lib/auth.tsx` 的 login 改为调用 `supabase.auth.signInWithPassword`
- 会话由 Supabase 托管，RLS 依据 JWT 的 `authenticated` 角色放行
- 顺带取消 `admin_users.password_hash` 的读取需求

### Stage 2（Stage 1 上线后执行 `2026-09-30_stage2_target_rls.sql`）
全表启用 RLS：匿名只读公开内容 + 仅允许 INSERT 订单；写操作仅 `authenticated`。

## 验证方式（无需登录）
用站点公开的 anon key 直接请求 REST：
- 期望：`PATCH /rest/v1/admin_users?id=eq.<不存在 id>` → 401/403（而非当前的 204）
- 期望：`GET /rest/v1/admin_users?select=username` → 401/403
- 期望：`GET /rest/v1/orders?limit=1` → 401/403

## Stage 0 实测结果（2026-09-30 已执行）

| 探针 | 结果 |
|---|---|
| GET admin_users | 200（登录所需，保留） |
| PATCH / DELETE / INSERT admin_users | **401 42501 permission denied**（接管链已断） |
| GET audit_logs | **401 42501**（日志不再外泄） |
| INSERT audit_logs | 201（登录写日志正常） |

副作用：后台「用户管理 / 修改密码」报权限错误；「审计日志」页面空数据。

