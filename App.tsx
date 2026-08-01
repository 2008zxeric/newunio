import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// 后台路由 — 懒加载，避免前台加载 admin 代码
const AdminRouter = lazy(() => import("./src/admin/router"));

// 前台 — 品牌手册风格（懒加载）
const SiteApp = lazy(() => import("./src/site/SiteApp"));

const App = () => {
  return (
    <Routes>
      {/* 后台 — 必须在通配符前面 */}
      <Route path="/admin/*" element={
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]"><div className="w-10 h-10 border-4 border-[#2D2D2A]/10 border-t-[#2D2D2A] rounded-full animate-spin" /></div>}>
          <AdminRouter />
        </Suspense>
      } />

      {/* 前台 — 品牌手册风格完整版 */}
      <Route
        path="/*"
        element={
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]">
                <div className="w-12 h-12 border-4 border-[#d2c4ad]/30 border-t-[#2D2D2A] rounded-full animate-spin" />
              </div>
            }
          >
            <SiteApp />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
