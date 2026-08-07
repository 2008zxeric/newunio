import React, { useState, useEffect } from 'react';
import { MEMBER_LEVELS, MemberLevelKey } from '../types';
import { supabase } from '../lib/supabase';
import { Crown, Search, User, TrendingUp, Undo2, Plus, Minus, History, X, RefreshCw, Users } from 'lucide-react';

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

const levelOf = (m: MemberRow): MemberLevelKey => {
  if (m.level_override && MEMBER_LEVELS.some((l) => l.key === m.level_override)) {
    return m.level_override as MemberLevelKey;
  }
  const l = MEMBER_LEVELS.slice().reverse().find((x) => m.points >= x.threshold);
  return l ? l.key : 'tongMu';
};

/**
 * 会员管理后台（完整版）：
 * 会员列表与查询 / 会员画像（档案）/ 积分调整（含历史）/ 手动指定等级
 * 数据：Supabase members + point_logs 表（登录用户自动建档）；表未建时提示执行 SQL
 */
export function MemberManagement() {
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [selected, setSelected] = useState<MemberRow | null>(null);
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

  const openDetail = async (m: MemberRow) => {
    setSelected(m);
    try {
      const { data } = await supabase
        .from('point_logs')
        .select('*')
        .eq('user_id', m.user_id)
        .order('created_at', { ascending: false })
        .limit(50);
      setPointLogs((data || []) as PointLog[]);
    } catch (e) { setPointLogs([]); }
  };

  /** 调整积分（正加负减）+ 写历史 */
  const adjustPoints = async (m: MemberRow, delta: number, reason: string) => {
    if (!delta || !m.user_id) return;
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
    setMembers((prev) => prev.map((x) => (x.id === m.id ? { ...x, points: newPoints } : x)));
    setSelected((prev) => (prev ? { ...prev, points: newPoints } : prev));
    if (selected && selected.id === m.id) {
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
    setMembers((prev) => prev.map((x) => (x.id === m.id ? { ...x, level_override: key } : x)));
    setSelected((prev) => (prev ? { ...prev, level_override: key } : prev));
    showToast(key ? `✅ ${m.email} 已指定为 ${MEMBER_LEVELS.find((l) => l.key === key)?.cn}` : `✅ ${m.email} 已恢复积分自动计算`);
  };

  const filtered = members.filter((m) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (m.email || '').toLowerCase().includes(q) || (m.nickname || '').toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Crown className="w-5 h-5 text-[#D4AF37]" />
          <div>
            <h2 className="text-lg font-serif font-bold text-[#2D2D2A]">会员管理</h2>
            <p className="text-xs text-slate-400">会员查询 / 积分调整 / 等级指定 / 会员画像</p>
          </div>
        </div>
        <button onClick={load} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-500 hover:border-[#d2c4ad] transition-all">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> 刷新
        </button>
      </div>

      {dbError && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-700">
          ⚠️ 会员表尚未就绪：{dbError}
          <p className="mt-1 text-amber-600">请在 Supabase SQL Editor 执行桌面文件「UNIO会员体系建表SQL.sql」后刷新（与 orders 表操作一致）。当前显示演示数据。</p>
        </div>
      )}

      {/* 搜索 */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索会员邮箱 / 昵称..."
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
                  <button onClick={() => openDetail(m)} className="flex items-center gap-3 text-left flex-1 min-w-0">
                    <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2c2a26] to-[#1c2a22] text-[#d2c4ad] flex items-center justify-center text-xs font-bold shrink-0">
                      {(m.nickname || m.email || '?').slice(0, 1).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#2D2D2A] truncate">{m.nickname || m.email.split('@')[0]}</p>
                      <p className="text-[11px] text-slate-400 truncate">{m.email}</p>
                    </div>
                  </button>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${lv.key === 'yuanXiang' ? 'bg-[#D75437]/15 text-[#D75437]' : lv.key === 'jinHua' ? 'bg-[#D4AF37]/15 text-[#8a6d1a]' : lv.key === 'yinYe' ? 'bg-slate-100 text-slate-500' : 'bg-[#8C7E6A]/10 text-[#8C7E6A]'}`}>
                      {lv.cn}{m.level_override ? ' · 指定' : ''}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{m.points?.toLocaleString() ?? 0} 分</span>
                    <button onClick={() => openDetail(m)} className="px-2.5 py-1 rounded-lg border border-slate-200 text-[10px] text-slate-500 hover:border-[#d2c4ad] transition-all">
                      画像
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

      {/* 会员画像弹窗 */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl max-h-[88vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2c2a26] to-[#1c2a22] text-[#d2c4ad] flex items-center justify-center text-lg font-bold">
                  {(selected.nickname || selected.email || '?').slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <p className="text-base font-bold text-[#2D2D2A]">{selected.nickname || selected.email.split('@')[0]}</p>
                  <p className="text-xs text-slate-400">{selected.email}</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">注册：{new Date(selected.created_at).toLocaleDateString('zh-CN')}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="p-6 space-y-5">
              {/* 会员画像 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-[10px] text-slate-400 mb-1">当前积分</p>
                  <p className="text-xl font-bold font-mono text-[#2D2D2A]">{selected.points?.toLocaleString() ?? 0}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-[10px] text-slate-400 mb-1">会员等级</p>
                  <p className="text-xl font-bold text-[#2D2D2A]">{MEMBER_LEVELS.find((l) => l.key === levelOf(selected))?.cn}
                    {selected.level_override && <span className="text-[10px] text-[#D4AF37] ml-1">指定</span>}
                  </p>
                </div>
              </div>

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
                    onClick={() => { const v = parseInt(adjustValue, 10); if (!isNaN(v)) { adjustPoints(selected, v, adjustReason); setAdjustValue(''); setAdjustReason(''); } }}
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
                      onClick={() => setLevelOverride(selected, l.key)}
                      className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all ${selected.level_override === l.key ? 'bg-[#2c2a26] text-[#d2c4ad] border-[#2c2a26]' : 'bg-white text-slate-500 border-slate-200 hover:border-[#d2c4ad]'}`}
                    >
                      {l.cn} {l.discount < 1 ? `${(l.discount * 100).toFixed(0)}折` : ''}
                    </button>
                  ))}
                  {selected.level_override && (
                    <button onClick={() => setLevelOverride(selected, null)} className="px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-500 hover:border-[#D75437] hover:text-[#D75437] transition-all flex items-center gap-1">
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
