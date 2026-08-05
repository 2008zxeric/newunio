# Codex 交接文档：全景总览缩略图不显现问题

> 目标：让 Codex 独立完成「海报全景总览缩略图不能正常显现」的修复。
> 更新时间：2026-08-05 · 交接人：Hermes Agent

---

## 一、项目快速上手

| 项 | 值 |
|---|---|
| 项目路径 | `/Users/EricMac/.qclaw/newunio` |
| 技术栈 | React 19 + Vite 6 + TypeScript + TailwindCSS 4 + Supabase + HashRouter |
| 启动开发 | `cd /Users/EricMac/.qclaw/newunio && npx vite --port 5178 --strictPort` |
| 构建验证 | `npm run build`（必须通过后再谈部署） |
| 线上地址 | https://newunio.vercel.app |
| 问题页面 | 首页 → 品牌故事（导航第 5 项）→ 品牌画册 → 右上「海报全景总览」按钮 |

---

## 二、问题现象

点击「海报全景总览」按钮后，进入 `viewMode === 'overview'` 模式：
- 网格框架、页码角标、标题文字**正常显示**（45 页缩略框都有）
- 但**每页缩略框内的页面内容（图片+文字）几乎全黑/不显现**
- 预期：每页缩略框内应**等比例完整显示**该页的缩小版全屏页内容

---

## 三、已定位的根因（重要，请先验证再动手）

### 根因 1（主因）：pageLoaded 单值 state 导致 44/45 页 opacity-0

文件：`src/components/BrandBookViewer.tsx`

- **L833**：`const [pageLoaded, setPageLoaded] = useState<number>(0);` —— **单个 number state，只能记录一个页码**
- **L841**：`renderPage` 根 div 的 className：`pageLoaded === pageIdx ? 'opacity-100' : 'opacity-0'`
- **L848**：背景图 `onLoad={() => setPageLoaded(pageIdx)}` —— 每页图片加载完成都会覆盖 pageLoaded

**为什么 flip 模式正常、overview 全黑**：
- flip 模式一次只渲染 1 页（`renderPage(currentPage)`）→ onLoad 后该页 opacity-100 ✅
- overview 模式一次渲染 **45 页**（`Array.from({length: TOTAL_PAGES}).map(... renderPage(idx))`）→ 每页 img 加载都触发 onLoad → pageLoaded 被不断覆盖 → **最终只有最后一个完成加载的页码匹配 opacity-100，其余 44 页 opacity-0（不可见）** → 缩略图基本全黑

**修复建议（方向，可自由优化）**：
给 `renderPage` 增加可选参数（如 `forceVisible?: boolean`）：
```tsx
const renderPage = (pageIdx: number, forceVisible = false) => {
  // className 中：pageLoaded === pageIdx 或 forceVisible 时 opacity-100
  const visible = forceVisible || pageLoaded === pageIdx;
  className: `${visible ? 'opacity-100' : 'opacity-0'} ...`
};
```
overview 缩略图调用处传 `renderPage(idx, true)`（强制可见，不做加载淡入）。

### 根因 2（次要）：重复 DOM id

`renderPage` 根 div 有 `id="brand-book-page-container"`（L839 附近）——overview 渲染 45 页会产生 **45 个重复 id**（非法 DOM + 潜在 CSS/JS 干扰）。overview 模式下建议：
- 方案 A：renderPage 加参数去掉 id（`id={forceVisible ? undefined : 'brand-book-page-container'}`）
- 方案 B：id 改为 `brand-book-page-${pageIdx}`

### 根因 3（历史，已修复勿动）：缩放比例

overview 缩略图内层容器当前为：
```tsx
<div className="absolute inset-0" style={{ transform: 'scale(0.28)', transformOrigin: 'top left', width: '357%', height: '482%' }}>
  {renderPage(idx)}
</div>
```
- `357%` = 100% / 0.28（宽度放大倍数）
- `482%` = 357% × 1.35（画册页比例 1:1.35，等比例充满，无黑边）
- **这个比例是对的，不要回退**（此前 357%/357% 会压扁，已修）

---

## 四、代码地图（缩略图相关）

| 位置 | 内容 |
|---|---|
| `src/components/BrandBookViewer.tsx` L188 | `const TOTAL_PAGES = 45;` |
| 同上 L833 | `pageLoaded` state（根因 1） |
| 同上 L841-905 | `renderPage(pageIdx)` 单页渲染（背景图 + 内容 + onLoad） |
| 同上 L910+ | `renderPageBody(pageIdx)` 每页内容 switch（45 个 case） |
| 同上 ~L2820-2860 | **overview 缩略图网格**（viewMode === 'overview' 渲染块） |
| 同上 ~L2580-2595 | 「海报全景总览」按钮（setViewMode('overview')） |
| `src/data/brandConstants.ts` | `BOOK_PAGE_TITLES`（45 页标题）、`PAGE_BACKGROUNDS`（每页背景图） |

---

## 五、验证方法

1. `npm run build` 通过
2. 本地 `npx vite --port 5178 --strictPort` 启动
3. 浏览器访问 `http://localhost:5178/` → 品牌故事 → 品牌画册 → 「海报全景总览」
4. **验收标准**：45 个缩略框内每页内容（背景图 + 标题 + 文字）都清晰可见，等比例充满无黑边无压扁
5. 点击任一缩略页 → 跳转到对应页 flip 模式（回归验证：flip 模式翻页正常、淡入效果仍在）
6. 检查浏览器 console 无报错

---

## 六、铁律（必须遵守，违反会被用户拉黑）

1. **只用 patch 不要重写整个文件**（BrandBookViewer 170KB+，重写必炸）
2. **不碰与缩略图无关的功能**（合系列产品、数据库、后台、Header、极境/元境文案一律不动）
3. 改前先 `git status` 确认工作区状态；改后 `npm run build` 必须通过
4. 不要部署（Vercel 部署由用户/Hermes 负责），只提交本地修复并说明
5. 画册共 **45 页**（TOTAL_PAGES=45），任何地方出现写死 40 都算 bug
6. 文案口径：50 余国（不是 57 国）；「元境」不是「极境」；slogan「从极境撷取芳香，因世界元于一息」不变
7. 项目 git 分支：main，改动直接 commit（用户授权此项目可提交，但**不可 push 到 GitHub**，部署走 Vercel）
8. 如有疑问或遇到与预期不符的现象，先查 `git log --oneline -5` 看近期改动，不要猜

---

## 七、其他已知背景（非本任务，供参考）

- 合系列 50 款复方 = Desktop 代码权威（配方构成 3-5 成分 + Alice 配方试验日记来自 UNIO_复方配方构成.xlsx）
- 后台完整版 = `src/admin/`（AdminRouter + AdminLayout 左侧导航），入口 = 前台 Header 金色 logo 长按 3 秒 → `#/admin/login`，账号 admin_users 表
- 前台无可见后台入口（铁律）
- 导出 HTML 已修 45 页（`UNIO_Aroma_BrandBook_45Pages_Interactive.html`）
- 性能：manualChunks 分包（vendor-react/motion/d3/lucide），勿引入 React.lazy（曾两次白屏）
