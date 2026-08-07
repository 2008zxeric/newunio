import React, { useState, useEffect } from 'react';
import { MEMBER_LEVELS, MemberLevelKey } from '../types';
import { supabase } from '../lib/supabase';
import { Crown, Search, User, TrendingUp, Undo2, Plus, Minus, History, X, RefreshCw, Users, Wallet, ShoppingBag, Target, BadgeCheck, CalendarDays } from 'lucide-react';

interface MemberRow {
  id: string;
  user_id: string | null;
  email: string;
  nickname: string | null;
  points: number;
  level_override: string | null;
  created_at: string;
}

interface PointLog {
  id: string;
  points_change: number;
  balance_after: number;
  reason: string | null;
  operator: string | null;
  created_at: string;
}

interface OrderRow {
  id: string;
  wechat_id: string | null;
  items: any[] | null;
  total_price: number;
  status: string;
  note: string | null;
  created_at: string;
}

const levelOf = (m: MemberRow): MemberLevelKey => {
  if (m.level_override && MEMBER_LEVELS.some((l) => l.key === m.level_override)) {
    return m.level_override as MemberLevelKey;
  }
  const l = MEMBER_LEVELS.slice().reverse().find((x) => m.points >= x.threshold);
  return l ? l.key : 'tongMu';
};

const STATUS_CN: Record<string, string> = { pending: '待付款', paid: '已付款', prepared: '备货中', shipped: '已发货', delivered: '已收货', cancelled: '已取消' };

/**
 * 会员管理后台（完整版）：
 * ① 积分线：会员列表（名/等级/积分）+ 积分管理弹窗（调积分/积分历史/指定等级）
 * ② 画像线：360° 会员画像弹窗（消费能力 / 购买产品 / 等级进度 / 客户档案）
 * 数据：Supabase members + point_logs + orders 表
 */
export function MemberManagement() {
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  // 画像弹窗
  const [profileView, setProfileView] = useState<MemberRow | null>(null);
  const [profileOrders, setProfileOrders] = useState<OrderRow[]>([]);
  // 积分弹窗
  const [pointsView, setPointsView] = useState<MemberRow | null>(null);
  const [pointLogs, setPointLogs] = useState<PointLog[]>([]);
  const [adjustValue, setAdjustValue] = useState('');
  const [adjustReason, setAdjustReason] = useState('');
  const [toast, setToast] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('members').select('*').order('created_at', { ascending: false }).limit(200);
      if (error) {
        setDbError(error.message);
        setMembers([]);
      } else {
        setDbError(null);
        setMembers(data as MemberRow[]);
      }
    } catch (e: any) {
      setDbError(String(e?.message || e));
      setMembers([]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  /** 打开 360° 画像：拉取该会员订单（wechat_id = 昵称 或 邮箱前缀）→ 聚合分析 */
  const openProfile = async (m: MemberRow) => {
    setProfileView(m);
    setProfileOrders([]);
    const wechatKeys = [m.nickname, m.email ? m.email.split('@')[0] : null].filter(Boolean) as string[];
    try {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .in('wechat_id', wechatKeys)
        .order('created_at', { ascending: false });
      setProfileOrders((data || []) as OrderRow[]);
    } catch (e) { setProfileOrders([]); }
  };

  /** 打开积分管理 */
  const openPoints = async (m: MemberRow) => {
    setPointsView(m);
    setPointLogs([]);
    try {
      const { data } = await supabase
        .from('point_logs')
        .select('*')
        .or(`user_id.eq.${m.user_id},email.eq.${m.email}`)
        .order('created_at', { ascending: false })
        .limit(50);
      setPointLogs((data || []) as PointLog[]);
    } catch (e) { setPointLogs([]); }
  };

  /** 调整积分（正加负减）+ 写历史 */
  const adjustPoints = async (m: MemberRow, delta: number, reason: string) => {
    if (!delta) return;
    const newPoints = Math.max(0, (m.points || 0) + delta);
    const { error } = await supabase
      .from('members')
      .update({ points: newPoints, updated_at: new Date().toISOString() })
      .eq('id', m.id);
    if (error) { showToast('❌ 调整失败：' + error.message); return; }
    await supabase.from('point_logs').insert({
      member_id: m.id,
      user_id: m.user_id,
      email: m.email,
      points_change: delta,
      balance_after: newPoints,
      reason: reason || '管理员调整',
      operator: 'admin',
    }).then(() => {}, () => {});
    const upd = (list: MemberRow[]) => list.map((x) => (x.id === m.id ? { ...x, points: newPoints } : x));
    setMembers(upd);
    setProfileView((p) => (p && p.id === m.id ? { ...p, points: newPoints } : p));
    setPointsView((p) => (p && p.id === m.id ? { ...p, points: newPoints } : p));
    if (pointsView && pointsView.id === m.id) {
      setPointLogs((prev) => [{ id: String(Date.now()), points_change: delta, balance_after: newPoints, reason: reason || '管理员调整', operator: 'admin', created_at: new Date().toISOString() }, ...prev]);
    }
    showToast(`✅ ${m.email} 积分 ${delta > 0 ? '+' : ''}${delta} → ${newPoints}`);
  };

  /** 手动指定等级（按会员） */
  const setLevelOverride = async (m: MemberRow, key: MemberLevelKey | null) => {
    const { error } = await supabase
      .from('members')
      .update({ level_override: key, updated_at: new Date().toISOString() })
      .eq('id', m.id);
    if (error) { showToast('❌ 指定失败：' + error.message); return; }
    const upd = (list: MemberRow[]) => list.map((x) => (x.id === m.id ? { ...x, level_override: key } : x));
    setMembers(upd);
    setProfileView((p) => (p && p.id === m.id ? { ...p, level_override: key } : p));
    setPointsView((p) => (p && p.id === m.id ? { ...p, level_override: key } : p));
    showToast(key ? `✅ ${m.email} 已指定为 ${MEMBER_LEVELS.find((l) => l.key === key)?.cn}` : `✅ ${m.email} 已恢复积分自动计算`);
  };

  /** 画像聚合：消费能力 */
  const profileStats = (() => {
    const orders = profileOrders;
    const totalSpend = orders.reduce((s, o) => s + (o.total_price || 0), 0);
    const paidOrders = orders.filter((o) => o.status !== 'cancelled');
    const avgOrder = paidOrders.length ? totalSpend / paidOrders.length : 0;
    const recent = orders.length ? orders[0].created_at : null;
    const recentDays = recent ? Math.max(0, Math.round((Date.now() - new Date(recent).getTime()) / 864e5)) : null;
    // 消费力评级（按总消费）
    const spendLevel = totalSpend >= 3000 ? '高' : totalSpend >= 1000 ? '中' : totalSpend > 0 ? '低' : '暂无消费';
    // 购买产品聚合（去重 + 次数）
    const productMap = new Map<string, { name: string; qty: number; last: number }>();
    orders.forEach((o) => (o.items || []).forEach((i) => {
      const key = i.code || i.cn || '';
      const prev = productMap.get(key) || { name: i.cn || i.en || key, qty: 0, last: 0 };
      prev.qty += i.qty || 0;
      prev.last = Math.max(prev.last, new Date(o.created_at).getTime());
      productMap.set(key, prev);
    }));
    const products = [...productMap.values()].sort((a, b) => b.last - a.last);
    return { totalSpend, orderCount: orders.length, avgOrder, recentDays, spendLevel, products };
  })();

  const filtered = members.filter((m) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    const lvName = MEMBER_LEVELS.find((l) => l.key === levelOf(m))?.cn || '';
    return (
      (m.email || '').toLowerCase().includes(q) ||
      (m.nickname || '').toLowerCase().includes(q) ||
      lvName.includes(search.trim())
    );
  });

  const lvColor = (key: MemberLevelKey) =>
    key === 'yuanXiang' ? 'bg-[#D75437]/15 text-[#D75437]' : key === 'jinHua' ? 'bg-[#D4AF37]/15 text-[#8a6d1a]' : key === 'yinYe' ? 'bg-slate-100 text-slate-500' : 'bg-[#8C7E6A]/10 text-[#8C7E6A]';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Crown className="w-5 h-5 text-[#D4AF37]" />
          <div>
            <h2 className="text-lg font-serif font-bold text-[#2D2D2A]">会员管理</h2>
            <p className="text-xs text-slate-400">会员列表 · 360° 画像 · 积分管理</p>
          </div>
        </div>
        <button onClick={load} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-500 hover:border-[#d2c4ad] transition-all">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> 刷新
        </button>
      </div>

      {dbError && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-700">
          ⚠️ 会员表尚未就绪：{dbError}
          <p className="mt-1 text-amber-600">请在 Supabase SQL Editor 执行桌面文件「UNIO会员体系建表SQL.sql」后刷新。</p>
        </div>
      )}

      {/* 搜索 */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索会员邮箱 / 昵称 / 等级（模糊匹配）..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#d2c4ad]/50"
        />
      </div>

      {/* 会员列表 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/60 flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-bold text-slate-600">会员列表（{filtered.length}）</span>
        </div>
        {loading ? (
          <div className="p-8 text-center text-sm text-slate-400">加载中...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-400">
            {dbError ? '表未建——请先执行建表 SQL' : '暂无会员——前台用户登录后自动建档'}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((m) => {
              const lv = MEMBER_LEVELS.find((l) => l.key === levelOf(m))!;
              return (
                <div key={m.id} className="px-5 py-3 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                  <button onClick={() => openProfile(m)} className="flex items-center gap-3 text-left flex-1 min-w-0">
                    <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2c2a26] to-[#1c2a22] text-[#d2c4ad] flex items-center justify-center text-xs font-bold shrink-0">
                      {(m.nickname || m.email || '?').slice(0, 1).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#2D2D2A] truncate">{m.nickname || m.email.split('@')[0]}</p>
                      <p className="text-[11px] text-slate-400 truncate">{m.email}</p>
                    </div>
                  </button>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${lvColor(lv.key)}`}>
                      {lv.cn}{m.level_override ? ' · 指定' : ''}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{m.points?.toLocaleString() ?? 0} 分</span>
                    <button onClick={() => openProfile(m)} className="px-2.5 py-1 rounded-lg border border-[#D4AF37]/40 text-[10px] font-bold text-[#8a6d1a] hover:bg-[#D4AF37]/10 transition-all">
                      画像
                    </button>
                    <button onClick={() => openPoints(m)} className="px-2.5 py-1 rounded-lg border border-slate-200 text-[10px] text-slate-500 hover:border-[#d2c4ad] transition-all">
                      积分
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 等级规则（参考） */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/60 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-bold text-slate-600">等级规则（积分门槛与折扣）</span>
        </div>
        <div className="divide-y divide-slate-100">
          {MEMBER_LEVELS.map((l) => (
            <div key={l.key} className="px-5 py-3 flex items-center justify-between">
              <span className="text-sm font-bold text-[#2D2D2A]">{l.cn} <span className="text-[10px] text-slate-400 font-mono">{l.name}</span></span>
              <span className="text-xs text-slate-500">{l.threshold.toLocaleString()} 分 · <span className="text-[#D75437] font-bold">{l.discount < 1 ? `${(l.discount * 100).toFixed(0)}折` : '原价'}</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* ============ 360° 会员画像弹窗 ============ */}
      {profileView && (() => {
        const m = profileView;
        const lv = MEMBER_LEVELS.find((l) => l.key === levelOf(m))!;
        const next = MEMBER_LEVELS.find((l) => l.threshold > (m.points || 0));
        const progress = next ? Math.min(100, Math.round(((m.points || 0) - lv.threshold) / (next.threshold - lv.threshold) * 100)) : 100;
        const s = profileStats;
        return (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setProfileView(null)}>
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {/* 头部 */}
              <div className="p-6 bg-gradient-to-br from-[#2c2a26] to-[#1c2a22] text-[#d2c4ad] flex items-start justify-between rounded-t-3xl">
                <div className="flex items-center gap-4">
                  <span className="w-14 h-14 rounded-full bg-white/10 border border-[#d2c4ad]/30 flex items-center justify-center text-xl font-bold">
                    {(m.nickname || m.email || '?').slice(0, 1).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-lg font-serif font-bold">{m.nickname || m.email.split('@')[0]}</p>
                    <p className="text-xs text-[#d2c4ad]/70">{m.email}</p>
                    <p className="text-[10px] text-[#d2c4ad]/50 mt-1">注册于 {new Date(m.created_at).toLocaleDateString('zh-CN')}</p>
                  </div>
                </div>
                <button onClick={() => setProfileView(null)} className="text-[#d2c4ad]/60 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="p-6 space-y-5">
                {/* 等级与积分概览 */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 rounded-2xl p-4 text-center">
                    <p className="text-[10px] text-slate-400 mb-1">会员等级</p>
                    <p className="text-lg font-bold text-[#2D2D2A]">{lv.cn}</p>
                    {m.level_override && <p className="text-[10px] text-[#D4AF37] mt-0.5">管理员指定</p>}
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 text-center">
                    <p className="text-[10px] text-slate-400 mb-1">当前积分</p>
                    <p className="text-lg font-bold font-mono text-[#2D2D2A]">{(m.points || 0).toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{lv.discount < 1 ? `${(lv.discount * 100).toFixed(0)}折` : '原价'}</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 text-center">
                    <p className="text-[10px] text-slate-400 mb-1">消费能力</p>
                    <p className="text-lg font-bold text-[#2D2D2A]">{s.spendLevel}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">累计 ¥{s.totalSpend.toFixed(0)}</p>
                  </div>
                </div>

                {/* 等级进度 */}
                <div className="border border-slate-200 rounded-2xl p-4">
                  <p className="text-sm font-bold text-slate-600 mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-[#D4AF37]" />升级进度</p>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#D75437] rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    {next
                      ? `距 ${next.cn}（${next.threshold.toLocaleString()} 分）还差 ${(next.threshold - (m.points || 0)).toLocaleString()} 积分`
                      : '已达最高等级'}
                  </p>
                </div>

                {/* 消费能力分析 */}
                <div className="border border-slate-200 rounded-2xl p-4">
                  <p className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-2"><Wallet className="w-4 h-4 text-emerald-600" />消费能力分析</p>
                  {s.orderCount === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-3 bg-slate-50 rounded-xl">暂无订单记录</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-emerald-50 rounded-xl p-3 text-center">
                        <p className="text-[10px] text-emerald-700/60">累计消费</p>
                        <p className="text-base font-bold text-emerald-700 font-mono">¥{s.totalSpend.toFixed(0)}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 text-center">
                        <p className="text-[10px] text-slate-400">订单数</p>
                        <p className="text-base font-bold text-slate-600">{s.orderCount} 单</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 text-center">
                        <p className="text-[10px] text-slate-400">客单价</p>
                        <p className="text-base font-bold text-slate-600">¥{s.avgOrder.toFixed(0)}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 text-center">
                        <p className="text-[10px] text-slate-400">最近购买</p>
                        <p className="text-base font-bold text-slate-600">{s.recentDays === null ? '—' : `${s.recentDays} 天前`}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 购买产品记录 */}
                <div className="border border-slate-200 rounded-2xl p-4">
                  <p className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-2"><ShoppingBag className="w-4 h-4 text-[#D75437]" />曾购买产品</p>
                  {s.products.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-3 bg-slate-50 rounded-xl">暂无购买记录</p>
                  ) : (
                    <div className="space-y-2">
                      {s.products.map((p) => (
                        <div key={p.name} className="flex items-center justify-between bg-slate-50 rounded-xl px-3.5 py-2.5">
                          <span className="text-xs text-slate-600">{p.name}</span>
                          <span className="text-[11px] text-slate-400">× {p.qty} · {Math.max(0, Math.round((Date.now() - p.last) / 864e5))} 天前</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 客户档案提示（年龄等） */}
                <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                  <BadgeCheck className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div className="text-[11px] text-amber-700">
                    <p className="font-bold mb-1">客户档案画像</p>
                    <p>年龄 / 职业等个人画像暂未填写——前台「我的档案」完善后（含健康档案与香调偏好）此处将呈现更完整的客户画像。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ============ 积分管理弹窗 ============ */}
      {pointsView && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPointsView(null)}>
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl max-h-[88vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2c2a26] to-[#1c2a22] text-[#d2c4ad] flex items-center justify-center text-lg font-bold">
                  {(pointsView.nickname || pointsView.email || '?').slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <p className="text-base font-bold text-[#2D2D2A]">{pointsView.nickname || pointsView.email.split('@')[0]}</p>
                  <p className="text-xs text-slate-400">{pointsView.email}</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">积分管理 · 当前 {(pointsView.points || 0).toLocaleString()} 分</p>
                </div>
              </div>
              <button onClick={() => setPointsView(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="p-6 space-y-5">
              {/* 调整积分 */}
              <div className="border border-slate-200 rounded-2xl p-4 space-y-3">
                <p className="text-sm font-bold text-slate-600 flex items-center gap-2"><Plus className="w-4 h-4 text-emerald-600" />调整积分</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={adjustValue}
                    onChange={(e) => setAdjustValue(e.target.value)}
                    placeholder="变动值（正加负减，如 500 或 -200）"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#d2c4ad]/50"
                  />
                  <button
                    onClick={() => { const v = parseInt(adjustValue, 10); if (!isNaN(v)) { adjustPoints(pointsView, v, adjustReason); setAdjustValue(''); setAdjustReason(''); } }}
                    className="px-4 py-2 rounded-xl bg-[#2c2a26] text-[#d2c4ad] text-xs font-bold hover:bg-[#1c2a22] transition-all flex items-center gap-1"
                  >
                    <Minus className="w-3.5 h-3.5" /> 应用
                  </button>
                </div>
                <input
                  type="text"
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  placeholder="变动原因（如：活动赠送 / 消费扣减 / 补偿）"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#d2c4ad]/50"
                />
              </div>

              {/* 手动指定等级 */}
              <div className="border border-slate-200 rounded-2xl p-4 space-y-3">
                <p className="text-sm font-bold text-slate-600 flex items-center gap-2"><User className="w-4 h-4 text-[#D4AF37]" />手动指定等级（积分不达标也生效）</p>
                <div className="flex flex-wrap gap-2">
                  {MEMBER_LEVELS.map((l) => (
                    <button
                      key={l.key}
                      onClick={() => setLevelOverride(pointsView, l.key)}
                      className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all ${pointsView.level_override === l.key ? 'bg-[#2c2a26] text-[#d2c4ad] border-[#2c2a26]' : 'bg-white text-slate-500 border-slate-200 hover:border-[#d2c4ad]'}`}
                    >
                      {l.cn} {l.discount < 1 ? `${(l.discount * 100).toFixed(0)}折` : ''}
                    </button>
                  ))}
                  {pointsView.level_override && (
                    <button onClick={() => setLevelOverride(pointsView, null)} className="px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-500 hover:border-[#D75437] hover:text-[#D75437] transition-all flex items-center gap-1">
                      <Undo2 className="w-3 h-3" /> 恢复自动
                    </button>
                  )}
                </div>
              </div>

              {/* 积分历史 */}
              <div>
                <p className="text-sm font-bold text-slate-600 mb-2 flex items-center gap-2"><History className="w-4 h-4 text-slate-400" />积分变动历史</p>
                {pointLogs.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4 bg-slate-50 rounded-xl">暂无积分变动记录</p>
                ) : (
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {pointLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between bg-slate-50 rounded-xl px-3.5 py-2.5">
                        <div>
                          <p className="text-xs text-slate-600">{log.reason || '积分变动'}</p>
                          <p className="text-[10px] text-slate-400">{new Date(log.created_at).toLocaleString('zh-CN')} · 余额 {log.balance_after?.toLocaleString()}</p>
                        </div>
                        <span className={`text-sm font-bold font-mono ${(log.points_change || 0) >= 0 ? 'text-emerald-600' : 'text-[#D75437]'}`}>
                          {(log.points_change || 0) >= 0 ? '+' : ''}{log.points_change}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-[#2c2a26] text-[#d2c4ad] px-5 py-2.5 rounded-xl text-xs font-bold shadow-2xl">
          {toast}
        </div>
      )}
    </div>
  );
}
