import React, { useState } from 'react';
import { MEMBER_LEVELS } from '../types';
import { useMemberData } from '../hooks/useMemberData';
import { ChevronDown, Crown, Sparkles } from 'lucide-react';

/**
 * 会员仪表盘：当前等级 + 积分进度 + 权益 + 可展开积分规则
 * 数据源：useMemberData（localStorage 积分 → 自动等级计算）
 */
export function MemberDashboard() {
  const { memberData } = useMemberData();
  const [showRules, setShowRules] = useState(false);
  const { points, level, nextLevel, progressPercent } = memberData;

  const levelColors: Record<string, string> = {
    tongMu: 'from-[#8B7355] to-[#6b553a]',
    yinYe: 'from-[#9BA8B8] to-[#7d8a9a]',
    jinHua: 'from-[#D4AF37] to-[#a8842a]',
    yuanXiang: 'from-[#D75437] to-[#a83a24]',
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-[#2c2a26] text-[#f6f2eb] border border-[#d2c4ad]/30 shadow-xl">
      {/* 等级卡头 */}
      <div className={`p-5 bg-gradient-to-br ${levelColors[level.key] || levelColors.tongMu}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-7 h-7 text-white/90" />
            <div>
              <p className="text-[10px] text-white/70 tracking-widest">UNIO 会员等级</p>
              <h3 className="font-serif text-xl font-bold text-white">
                {level.cn} <span className="text-xs font-normal text-white/70">{level.name}</span>
              </h3>
            </div>
          </div>
          <span className="text-2xl font-bold text-white/95">{points}<span className="text-xs font-normal ml-1 text-white/70">积分</span></span>
        </div>
      </div>

      {/* 进度条 */}
      <div className="px-5 py-4 space-y-3">
        <div className="flex justify-between text-[11px] text-[#d2c4ad]/80">
          <span>当前权益：{level.discount < 1 ? `${(level.discount * 100).toFixed(0)} 折优惠` : '基础会员权益'}</span>
          <span>
            {nextLevel ? `距 ${nextLevel.cn} 还差 ${Math.max(0, nextLevel.threshold - points)} 积分` : '已达最高等级'}
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#D75437] transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {nextLevel && (
          <p className="text-[10px] text-white/50">
            升级 {nextLevel.cn}：{nextLevel.threshold} 积分 · {nextLevel.discount < 1 ? `${(nextLevel.discount * 100).toFixed(0)} 折` : '原价'} · {nextLevel.benefits[0]}
          </p>
        )}

        {/* 权益列表 */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {level.benefits.map((b) => (
            <span key={b} className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#d2c4ad]/15 text-[10px] text-[#d2c4ad]">
              <Sparkles className="w-3 h-3" /> {b}
            </span>
          ))}
        </div>
      </div>

      {/* 积分规则（可展开） */}
      <button
        onClick={() => setShowRules(!showRules)}
        className="w-full px-5 py-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#d2c4ad]/70 hover:bg-white/5 transition-colors"
      >
        <span>查看积分规则与折扣</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showRules ? 'rotate-180' : ''}`} />
      </button>
      {showRules && (
        <div className="px-5 pb-4 space-y-1.5 border-t border-white/5 pt-3">
          {MEMBER_LEVELS.map((l) => (
            <div key={l.key} className="flex justify-between items-center text-[11px] py-1">
              <span className="text-[#d2c4ad]">{l.cn} ({l.name})</span>
              <span className="text-white/60">
                {l.threshold} 积分 · {l.discount < 1 ? `${(l.discount * 100).toFixed(0)}折` : '无折扣'}
              </span>
            </div>
          ))}
          <p className="text-[10px] text-white/40 pt-1">每消费 ¥1 累积 1 积分，等级自动计算。</p>
        </div>
      )}
    </div>
  );
}
