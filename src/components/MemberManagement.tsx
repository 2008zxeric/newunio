import React, { useState } from 'react';
import { MEMBER_LEVELS, MemberLevelKey } from '../types';
import { Crown, Save, TrendingUp, UserCog, Undo2 } from 'lucide-react';
import { useMemberData } from '../hooks/useMemberData';

/**
 * 会员管理后台：等级规则与折扣配置展示 + 会员积分设置
 * 修改折扣：直接改 /src/types.ts 的 MEMBER_LEVELS（前端 UI 与下单核算自动同步）
 */
export function MemberManagement() {
  const [memberPoints, setMemberPoints] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState(false);
  const { memberData, setOverrideLevel } = useMemberData();

  const savePoints = (key: string) => {
    const uid = key; // 账号 UID（演示：按输入设置）
    const pts = memberPoints[key] || 0;
    try {
      localStorage.setItem('unio_member_points', String(pts));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) { /* ignore */ }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Crown className="w-5 h-5 text-[#D4AF37]" />
        <div>
          <h2 className="text-lg font-serif font-bold text-[#2D2D2A]">会员等级与折扣管理</h2>
          <p className="text-xs text-slate-400">等级规则配置见 /src/types.ts MEMBER_LEVELS——修改后前端 UI 与下单核算自动同步</p>
        </div>
      </div>

      {/* 等级规则表 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/60 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-bold text-slate-600">等级规则与折扣</span>
        </div>
        <div className="divide-y divide-slate-100">
          {MEMBER_LEVELS.map((l) => (
            <div key={l.key} className="px-5 py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0c120e] to-[#1c2a22] text-[#d2c4ad] flex items-center justify-center text-xs font-bold">
                  {l.cn.slice(0, 1)}
                </span>
                <div>
                  <p className="text-sm font-bold text-[#2D2D2A]">{l.cn} <span className="text-[10px] text-slate-400 font-mono">{l.name}</span></p>
                  <p className="text-[11px] text-slate-400">{l.benefits.join(' · ')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-slate-500">{l.threshold.toLocaleString()} 积分</p>
                <p className="text-xs font-bold text-[#D75437]">{l.discount < 1 ? `${(l.discount * 100).toFixed(0)} 折` : '原价'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 手动指定会员等级（管理员直接给予身份——积分不达标也生效，用于折扣计算） */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <UserCog className="w-4 h-4 text-[#D4AF37]" />
          <p className="text-sm font-bold text-slate-600">手动指定会员等级（管理员直接给予身份）</p>
        </div>
        <p className="text-[11px] text-slate-400 mb-3">指定后该会员按此等级计算折扣（即使积分不达标）；不指定则按积分自动计算。</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {MEMBER_LEVELS.map((l) => (
            <button
              key={l.key}
              onClick={() => { setOverrideLevel(l.key); setSaved(true); setTimeout(() => setSaved(false), 2000); }}
              className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                memberData.levelKey === l.key && memberData.isOverride
                  ? 'bg-[#0c120e] text-[#d2c4ad] border-[#0c120e] shadow-lg'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-[#d2c4ad]'
              }`}
            >
              <span className="block">{l.cn}</span>
              <span className={`block text-[10px] mt-0.5 ${l.discount < 1 ? 'text-[#D75437]' : 'text-slate-400'}`}>
                {l.discount < 1 ? `${(l.discount * 100).toFixed(0)}折` : '原价'}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[11px] text-slate-400">
            当前：{memberData.level.cn}（{memberData.isOverride ? '管理员指定' : '积分自动'}）
            {memberData.isOverride && ` · 积分 ${memberData.points}（按 ${memberData.level.cn} 折扣 ${memberData.level.discount < 1 ? (memberData.level.discount * 100).toFixed(0) + '折' : '原价'} 计算）`}
          </span>
          {memberData.isOverride && (
            <button
              onClick={() => { setOverrideLevel(null); setSaved(true); setTimeout(() => setSaved(false), 2000); }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-500 hover:border-[#D75437] hover:text-[#D75437] transition-all"
            >
              <Undo2 className="w-3 h-3" /> 恢复积分自动计算
            </button>
          )}
        </div>
      </div>

      {/* 积分设置（演示：设置全局会员积分） */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-sm font-bold text-slate-600 mb-3">设置会员积分（当前账号）</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={memberPoints['current'] ?? ''}
            onChange={(e) => setMemberPoints({ ...memberPoints, current: parseInt(e.target.value || '0', 10) })}
            placeholder="输入积分（如 5000 = 金花等级）"
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#d2c4ad]/50"
          />
          <button
            onClick={() => savePoints('current')}
            className="px-4 py-2.5 rounded-xl bg-[#0c120e] text-[#d2c4ad] text-xs font-bold hover:bg-[#1c2a22] transition-all flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" /> 保存
          </button>
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          演示环境：积分存 localStorage（前台会员仪表盘实时生效）。正式环境可接入 Supabase 按账号存储。
        </p>
        {saved && <p className="text-xs text-emerald-600 mt-2">✅ 积分已保存，前台会员仪表盘已更新</p>}
      </div>
    </div>
  );
}
