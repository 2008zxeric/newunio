-- ============================================================
-- UNIO AROMA · 安全加固 目标态（RLS 全量策略）
-- ⚠️ 不要现在执行！必须先完成「后台登录迁移到 Supabase Auth」并上线，
--    否则后台所有写操作会因 anon 无权限而全部失败。
-- 前提：后台页面以登录用户 JWT（role=authenticated）访问 Supabase。
-- 执行位置：Supabase Dashboard → SQL Editor
-- ============================================================

begin;

-- ---------- 1. 前台只读表：匿名可读，登录用户可写 ----------
do $$
declare t text;
begin
  foreach t in array array['products','banners','countries','series','site_texts',
                           'dict_items','home_recommends','reviews']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists %I on public.%I', t||'_public_read', t);
    execute format('create policy %I on public.%I for select to anon, authenticated using (true)', t||'_public_read', t);
    execute format('drop policy if exists %I on public.%I', t||'_auth_write', t);
    execute format('create policy %I on public.%I for all to authenticated using (true) with check (true)', t||'_auth_write', t);
  end loop;
end $$;

-- ---------- 2. 订单：匿名只能下单，不能读/改/删 ----------
alter table public.orders enable row level security;
drop policy if exists orders_public_insert on public.orders;
create policy orders_public_insert on public.orders
  for insert to anon, authenticated with check (true);

drop policy if exists orders_auth_all on public.orders;
create policy orders_auth_all on public.orders
  for all to authenticated using (true) with check (true);

-- ---------- 3. 后台账号与审计日志：仅登录用户 ----------
alter table public.admin_users enable row level security;
drop policy if exists admin_users_auth on public.admin_users;
create policy admin_users_auth on public.admin_users
  for all to authenticated using (true) with check (true);

alter table public.audit_logs enable row level security;
drop policy if exists audit_logs_auth on public.audit_logs;
create policy audit_logs_auth on public.audit_logs
  for all to authenticated using (true) with check (true);

-- ---------- 4. 财务/库存等后台专用表（如存在） ----------
do $$
declare t text;
begin
  foreach t in array array['sales_records','purchase_records','finance_records',
                           'reimbursements','inventory_records','product_images']
  loop
    if exists (select 1 from information_schema.tables
               where table_schema='public' and table_name=t) then
      execute format('alter table public.%I enable row level security', t);
      execute format('drop policy if exists %I on public.%I', t||'_auth_all', t);
      execute format('create policy %I on public.%I for all to authenticated using (true) with check (true)', t||'_auth_all', t);
    end if;
  end loop;
end $$;

commit;

-- 自检：所有 public 表应 relrowsecurity = true
select c.relname, c.relrowsecurity as rls, count(p.policyname) as policies
from pg_class c
left join pg_policies p on p.schemaname='public' and p.tablename=c.relname
where c.relnamespace='public'::regnamespace and c.relkind='r'
group by 1,2 order by 1;
