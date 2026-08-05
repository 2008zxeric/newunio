import React, { useMemo, useState } from 'react';
import { 
  FlaskConical, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Zap, 
  PieChart as PieIcon, 
  BarChart3, 
  Activity, 
  ChevronRight, 
  Info,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { ProductItem } from '../types';

interface CompoundIngredientsSynergyProps {
  product: ProductItem;
  className?: string;
}

// Default synergy dimension computer if custom synergy dimensions aren't provided
function getFallbackSynergyDimensions(product: ProductItem) {
  const formulaText = (product.blendFormula || []).map(b => `${b.ingredient} ${b.role} ${b.synergyEffect || ''}`).join(' ') + ' ' + (product.cn || '');

  let respiratory = 75;
  let nervousCalm = 75;
  let emotionalElevate = 75;
  let grounding = 75;
  let barrierRepair = 70;

  if (/呼吸|咽|肺|尤加利|薄荷|茶树|松/i.test(formulaText)) {
    respiratory = 96; nervousCalm = 82; emotionalElevate = 78; grounding = 70; barrierRepair = 80;
  } else if (/睡眠|安神|冥想|薰衣草|洋甘菊|鼠尾草/i.test(formulaText)) {
    nervousCalm = 98; emotionalElevate = 88; grounding = 90; respiratory = 72; barrierRepair = 75;
  } else if (/暖|温|循环|姜|玫瑰|天竺葵/i.test(formulaText)) {
    emotionalElevate = 94; grounding = 88; barrierRepair = 86; nervousCalm = 85; respiratory = 76;
  } else if (/专注|觉察|迷迭香|柠檬|佛手柑/i.test(formulaText)) {
    respiratory = 88; nervousCalm = 70; emotionalElevate = 96; grounding = 82; barrierRepair = 72;
  } else if (/归真|顶轮|檀香|乳香|沉香|岩兰草/i.test(formulaText)) {
    grounding = 98; nervousCalm = 95; emotionalElevate = 90; respiratory = 82; barrierRepair = 80;
  }

  return [
    { label: '呼吸道畅通度', score: respiratory, desc: '1,8-桉叶素与蒎烯协同拓展肺部通气量' },
    { label: '神经平息安抚指数', score: nervousCalm, desc: '乙酸芳樟酯共振抑制交感神经亢奋' },
    { label: '心绪抚慰与提振', score: emotionalElevate, desc: '单体倍半萜烯缓解焦虑抑郁情绪' },
    { label: '身体归真定轴感', score: grounding, desc: '倍半萜醇分子深层沉降锚定身心' },
    { label: '肌底与屏障舒敏', score: barrierRepair, desc: '母菊蓝烯与没药醇相协同抗炎' },
  ];
}

export const CompoundIngredientsSynergy: React.FC<CompoundIngredientsSynergyProps> = ({
  product,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'ratio' | 'radar' | 'mechanism'>('ratio');

  const blendFormula = useMemo(() => {
    if (product.blendFormula && product.blendFormula.length > 0) {
      return product.blendFormula;
    }
    // Fallback formula if blendFormula is missing for a compound product
    return [
      { ingredient: '高阶地标精油 A', role: '核心功效主调', origin: product.origin || '原产地', note: '前调', ratio: '40%', synergyEffect: '高挥发分子迅速穿透嗅觉通道' },
      { ingredient: '高阶地标精油 B', role: '协同平衡中调', origin: '契约农场', note: '中调', ratio: '35%', synergyEffect: '中挥发分子抚慰心肺与交感神经' },
      { ingredient: '高阶地标精油 C', role: '沉稳定香基底', origin: '极境产地', note: '后调', ratio: '25%', synergyEffect: '慢挥发分子深层沉降锚定能量' },
    ];
  }, [product]);

  const synergyGoal = product.synergyAnalysis?.primarySynergyGoal || 
    `相阶分子协同倍增 · ${product.subgroup || '协同'}全维疗愈能量`;

  const synergyScore = product.synergyAnalysis?.synergyScore || 95;

  const synergyMechanism = product.synergyAnalysis?.synergyMechanism ||
    `【UNIO 科学复方协同原理】：复方精油绝非单方精油的简单物理混合。当 ${blendFormula.map(b => b.ingredient).join('、')} 按精确比例相交融时，不同单方精油中的烯烃、醇类与酯类分子将发生相阶重叠，产生 1+1>2 的生理与心理协同功效。前调分子引领通达，中调分子抚慰中枢，后调分子持久沉降。`;

  const dimensions = useMemo(() => {
    if (product.synergyAnalysis?.dimensions && product.synergyAnalysis.dimensions.length > 0) {
      return product.synergyAnalysis.dimensions;
    }
    return getFallbackSynergyDimensions(product);
  }, [product]);

  // Color helper for volatility notes
  const getNoteBadgeStyle = (note?: string) => {
    if (!note) return 'bg-[#B08968]/20 text-[#E8DAC8] border-[#B08968]/40';
    if (note.includes('前') || note.toLowerCase().includes('top')) {
      return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
    if (note.includes('中') || note.toLowerCase().includes('middle')) {
      return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }
    return 'bg-amber-900/40 text-amber-200 border-amber-700/50';
  };

  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-[#1C2520] text-[#E8DAC8] border border-[#B08968]/40 space-y-4 shadow-xl relative overflow-hidden ${className}`}>
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#B08968]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#102830]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Module Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#B08968]/25 pb-3 gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#B08968]/20 text-[#B08968] border border-[#B08968]/40 shrink-0">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#F5EFEA]">
                成分构成与协同作用
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#B08968]/25 text-[#E5C3A6] border border-[#B08968]/40 font-bold">
                Ingredients & Synergy Breakdown
              </span>
            </div>
            <p className="text-xs text-[#E8DAC8]/75 font-sans mt-0.5">
              {synergyGoal}
            </p>
          </div>
        </div>

        {/* Synergy Score Metric Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-[#B08968]/30 shrink-0 self-start sm:self-auto">
          <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
          <div>
            <span className="text-[9px] text-[#E8DAC8]/60 font-mono block">协同倍增效能</span>
            <span className="font-serif font-bold text-sm text-amber-300">
              {synergyScore}<span className="text-xs text-amber-400/80 font-normal"> / 100</span>
            </span>
          </div>
        </div>
      </div>

      {/* Sub-view Navigation Switcher */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-[#B08968]/20 text-xs font-mono relative z-10">
        <button
          type="button"
          onClick={() => setActiveTab('ratio')}
          className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'ratio'
              ? 'bg-[#B08968] text-[#1C2520] font-bold shadow-sm'
              : 'text-[#E8DAC8]/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <PieIcon className="w-3.5 h-3.5" />
          <span>植物成分与比例拆解</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('radar')}
          className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'radar'
              ? 'bg-[#B08968] text-[#1C2520] font-bold shadow-sm'
              : 'text-[#E8DAC8]/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>协同功效五维拆解</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('mechanism')}
          className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'mechanism'
              ? 'bg-[#B08968] text-[#1C2520] font-bold shadow-sm'
              : 'text-[#E8DAC8]/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>相阶分子机制</span>
        </button>
      </div>

      {/* TAB 1: RATIO & INGREDIENT LIST (成分构成与比例拆解) */}
      {activeTab === 'ratio' && (
        <div className="space-y-4 relative z-10">
          {/* Visual Formula Ratio Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[11px] text-[#E8DAC8]/80 font-mono">
              <span className="flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-[#B08968]" />
                <span>科学配比阶梯 (Formula Ratio Spectrum)</span>
              </span>
              <span>100% 纯天然植物萃取</span>
            </div>
            <div className="h-3.5 w-full rounded-full bg-black/50 p-0.5 flex overflow-hidden border border-[#B08968]/30">
              {blendFormula.map((item, idx) => {
                const colors = [
                  'bg-amber-600',
                  'bg-emerald-600',
                  'bg-sky-600',
                  'bg-rose-600',
                  'bg-indigo-600',
                ];
                const bg = colors[idx % colors.length];
                const widthPercent = item.ratio || `${Math.round(100 / blendFormula.length)}%`;
                return (
                  <div
                    key={idx}
                    style={{ width: widthPercent }}
                    className={`${bg} h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full relative group cursor-pointer`}
                    title={`${item.ingredient}: ${widthPercent}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Ingredient Detailed Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {blendFormula.map((item, idx) => (
              <div 
                key={idx} 
                className="p-3.5 rounded-xl bg-black/40 border border-[#B08968]/30 hover:border-[#B08968]/70 transition-all space-y-2"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#B08968]/30 text-amber-200 text-xs font-mono font-bold flex items-center justify-center border border-[#B08968]/40">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#F5EFEA] flex items-center gap-1.5">
                        <span>{item.ingredient}</span>
                        {item.ratio && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {item.ratio}
                          </span>
                        )}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {item.note && (
                      <span className={`text-[9px] px-2 py-0.5 rounded border font-mono ${getNoteBadgeStyle(item.note)}`}>
                        {item.note}
                      </span>
                    )}
                    {item.origin && (
                      <span className="text-[9px] px-2 py-0.5 rounded bg-white/10 text-[#E8DAC8]/80 font-mono border border-white/10">
                        {item.origin}
                      </span>
                    )}
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-xs text-[#E8DAC8]/90 font-sans leading-relaxed">
                  <strong className="text-amber-300 font-medium">配方角色：</strong>{item.role}
                </p>

                {/* Synergy Effect (if present or computed) */}
                {item.synergyEffect && (
                  <div className="p-2 rounded-lg bg-[#B08968]/15 border border-[#B08968]/20 text-[11px] text-amber-200/90 font-sans leading-relaxed flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong className="text-amber-300">协同互补：</strong>{item.synergyEffect}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SYNERGY DIMENSIONS (协同功效五维拆解) */}
      {activeTab === 'radar' && (
        <div className="space-y-4 relative z-10">
          <div className="p-3.5 rounded-xl bg-black/40 border border-[#B08968]/25 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-[#F5EFEA] flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>植物精油协同功效维度分析</span>
              </span>
              <span className="text-[10px] font-mono text-[#E8DAC8]/60">100分满分指标</span>
            </div>

            <div className="space-y-3">
              {dimensions.map((dim, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-serif text-[#F5EFEA] font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{dim.label}</span>
                    </span>
                    <span className="font-mono font-bold text-amber-300 text-xs">
                      {dim.score} / 100
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden p-0.5">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-400 transition-all duration-700" 
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>

                  {dim.desc && (
                    <p className="text-[11px] text-[#E8DAC8]/70 font-sans pl-3 border-l border-amber-500/30">
                      {dim.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MECHANISM EXPLANATION (相阶分子机制解密) */}
      {activeTab === 'mechanism' && (
        <div className="space-y-3 relative z-10">
          <div className="p-4 rounded-xl bg-black/50 border border-[#B08968]/30 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-sm border-b border-white/10 pb-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>【UNIO 协同相阶分子机制解密】</span>
            </div>
            <p className="text-xs text-[#E8DAC8]/90 font-sans leading-relaxed pt-1">
              {synergyMechanism}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] text-amber-400 font-mono font-bold block">01 / 前调扩散协同</span>
              <p className="text-[11px] text-[#E8DAC8]/80">高挥发分子迅速穿透嗅觉黏膜，开启理气醒脑通路。</p>
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] text-rose-400 font-mono font-bold block">02 / 中调心肺共振</span>
              <p className="text-[11px] text-[#E8DAC8]/80">中挥发单体进入血液与神经受体，实现心舒肺平。</p>
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] text-amber-300 font-mono font-bold block">03 / 后调锚定沉降</span>
              <p className="text-[11px] text-[#E8DAC8]/80">慢挥发倍半萜成分锁住香气，维持长达数小时余韵。</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Assurance Banner */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[#E8DAC8]/60 pt-2 border-t border-white/10 relative z-10">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>GC-MS 色谱流式检测合格 · 0合成香精添加</span>
        </span>
        <span>UNIO BOTANICAL FORMULATION</span>
      </div>
    </div>
  );
};
