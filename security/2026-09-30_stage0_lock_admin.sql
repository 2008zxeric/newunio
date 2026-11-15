-- ============================================================
-- UNIO AROMA · 安全加固 第一阶段（Stage 0）
-- 目的：阻断「匿名读取密码哈希 → 改写密码 → 登录后台」的接管链
-- 影响面：仅后台「用户管理/修改密码」与「审计日志」页面暂时不可用；
--         前台浏览、下单、AI 问诊、后台其他所有页面均不受影响
-- 回滚：见文件末尾
-- 执行位置：Supabase Dashboard → SQL Editor（项目 xuicjydgtoltdhkbqoju）
-- ============================================================

begin;

-- 1) 收回匿名角色对后台账号表的写权限（INSERT/UPDATE/DELETE）
--    这是接管链的关键：此前 anon 可 UPDATE password_hash
revoke insert, update, delete on table public.admin_users from anon;

-- 2) 收回匿名角色对审计日志的读权限（含用户名 / IP / User-Agent）
revoke select on table public.audit_logs from anon;

commit;

-- 让 PostgREST 立即刷新权限缓存（否则可能延迟生效）
notify pgrst, 'reload schema';

-- ============================================================
-- 执行后自检（应当看到 admin_users 只剩 SELECT，audit_logs 无授权）
-- ============================================================
select table_name, string_agg(privilege_type, ',' order by privilege_type) as anon_privs
from information_schema.role_table_grants
where table_schema = 'public' and grantee = 'anon'
  and table_name in ('admin_users', 'audit_logs')
group by 1 order by 1;

-- ============================================================
-- 回滚（如需恢复原状，单独执行以下两行）
-- ============================================================
-- grant insert, update, delete on table public.admin_users to anon;
-- grant select on table public.audit_logs to anon;
