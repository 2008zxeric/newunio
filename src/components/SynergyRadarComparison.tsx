import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip
} from 'recharts';
import { Sparkles, Layers, SlidersHorizontal, Activity, Zap, Info } from 'lucide-react';
import { ProductItem } from '../types';

interface SynergyRadarComparisonProps {
  primaryProduct: ProductItem;
  secondaryProduct: ProductItem;
  availableSecondaryProducts?: ProductItem[];
  onSelectSecondaryProduct?: (product: ProductItem) => void;
}

type ViewDimension = 'volatility' | 'aroma' | 'efficacy';

// Helper to deterministically calculate normalized radar scores (0-100) for any product
function computeProductRadarScores(product: ProductItem) {
  const text = `${product.cn} ${product.en} ${product.subgroup} ${product.series} ${product.plantPart || ''} ${product.tag || ''} ${product.benefits?.join(' ') || ''}`.toLowerCase();

  // 1. Volatility Rate & Notes (前调/中调/后调/扩散度/留香度)
  let top = 40;
  let middle = 40;
  let base = 40;
  let diffusion = 50;
  let tenacity = 50;

  if (text.includes('柑橘') || text.includes('柠檬') || text.includes('甜橙') || text.includes('佛手柑') || text.includes('葡萄柚') || text.includes('薄荷') || text.includes('尤加利')) {
    top = 90; middle = 50; base = 20; diffusion = 92; tenacity = 35;
  } else if (text.includes('花') || text.includes('薰衣草') || text.includes('玫瑰') || text.includes('茉莉') || text.includes('依兰') || text.includes('天竺葵')) {
    top = 45; middle = 92; base = 60; diffusion = 75; tenacity = 70;
  } else if (text.includes('木') || text.includes('檀香') || text.includes('雪松') || text.includes('乳香') || text.includes('广藿香') || text.includes('岩兰草') || text.includes('树脂')) {
    top = 25; middle = 50; base = 95; diffusion = 45; tenacity = 95;
  } else if (text.includes('草') || text.includes('迷迭香') || text.includes('百里香') || text.includes('罗勒') || text.includes('鼠尾草')) {
    top = 70; middle = 75; base = 35; diffusion = 80; tenacity = 50;
  }

  // Hash-based fine-tuning for uniqueness
  const codeHash = (product.code || 'A0').charCodeAt(0) % 15;
  top = Math.min(100, Math.max(15, top + (codeHash % 7) - 3));
  middle = Math.min(100, Math.max(15, middle + ((codeHash * 2) % 7) - 3));
  base = Math.min(100, Math.max(15, base + ((codeHash * 3) % 7) - 3));

  // 2. Aroma Profile (木香/花香/柑橘/树脂/草本)
  let woody = text.includes('木') || text.includes('雪松') || text.includes('檀香') || text.includes('柏') || text.includes('松') ? 85 : 20;
  let floral = text.includes('花') || text.includes('玫瑰') || text.includes('薰衣草') || text.includes('依兰') || text.includes('橙花') ? 88 : 15;
  let citrus = text.includes('柑') || text.includes('橙') || text.includes('柠檬') || text.includes('柚') || text.includes('佛手') ? 90 : 15;
  let resinous = text.includes('树脂') || text.includes('乳香') || text.includes('没药') || text.includes('安息香') || text.includes('沉香') ? 85 : 15;
  let herbal = text.includes('草') || text.includes('迷迭香') || text.includes('薄荷') || text.includes('鼠尾草') || text.includes('蒿') ? 85 : 20;

  // 3. Therapeutic Efficacy (睡眠安神/情绪舒缓/肌底修护/呼吸通透/专注醒脑)
  let sleepCalm = text.includes('睡') || text.includes('安神') || text.includes('失眠') || text.includes('薰衣草') || text.includes('洋甘菊') ? 92 : 35;
  let emotionalBalance = text.includes('情绪') || text.includes('舒缓') || text.includes('解压') || text.includes('焦虑') || text.includes('玫瑰') ? 88 : 40;
  let skinRepair = text.includes('肌') || text.includes('修护') || text.includes('屏障') || text.includes('茶树') || text.includes('乳香') ? 90 : 30;
  let respiratory = text.includes('呼吸') || text.includes('通透') || text.includes('鼻') || text.includes('尤加利') || text.includes('薄荷') ? 92 : 25;
  let focusClarity = text.includes('专注') || text.includes('醒脑') || text.includes('头脑') || text.includes('迷迭香') || text.includes('柠檬') ? 90 : 30;

  return {
    volatility: [
      { subject: '前调 (高挥发)', primary: top, secondary: 0 },
      { subject: '中调 (中挥发)', primary: middle, secondary: 0 },
      { subject: '后调 (定香基底)', primary: base, secondary: 0 },
      { subject: '空气扩散力', primary: diffusion, secondary: 0 },
      { subject: '留香持久度', primary: tenacity, secondary: 0 },
    ],
    aroma: [
      { subject: '木质调 (Woody)', primary: woody, secondary: 0 },
      { subject: '花香调 (Floral)', primary: floral, secondary: 0 },
      { subject: '柑橘调 (Citrus)', primary: citrus, secondary: 0 },
      { subject: '树脂调 (Resinous)', primary: resinous, secondary: 0 },
      { subject: '草本调 (Herbal)', primary: herbal, secondary: 0 },
    ],
    efficacy: [
      { subject: '睡眠与神经安神', primary: sleepCalm, secondary: 0 },
      { subject: '情绪释放与舒缓', primary: emotionalBalance, secondary: 0 },
      { subject: '肌底修护与屏障', primary: skinRepair, secondary: 0 },
      { subject: '呼吸道舒爽通透', primary: respiratory, secondary: 0 },
      { subject: '专注力与清醒度', primary: focusClarity, secondary: 0 },
    ]
  };
}

export const SynergyRadarComparison: React.FC<SynergyRadarComparisonProps> = ({
  primaryProduct,
  secondaryProduct,
  availableSecondaryProducts = [],
  onSelectSecondaryProduct,
}) => {
  const [activeDimension, setActiveDimension] = useState<ViewDimension>('volatility');

  // Compute scores for primary & secondary
  const primaryScores = useMemo(() => computeProductRadarScores(primaryProduct), [primaryProduct]);
  const secondaryScores = useMemo(() => computeProductRadarScores(secondaryProduct), [secondaryProduct]);

  // Combine scores for Recharts
  const chartData = useMemo(() => {
    const listP = primaryScores[activeDimension];
    const listS = secondaryScores[activeDimension];

    return listP.map((item, idx) => ({
      subject: item.subject,
      [primaryProduct.cn]: item.primary,
      [secondaryProduct.cn]: listS[idx]?.primary || 0,
    }));
  }, [primaryScores, secondaryScores, activeDimension, primaryProduct, secondaryProduct]);

  // Derive synergy compliment narrative
  const synergyNarrative = useMemo(() => {
    if (activeDimension === 'volatility') {
      return `【挥发度金字塔互补】: ${primaryProduct.cn} 与 ${secondaryProduct.cn} 的前、中、后调挥发速率呈阶梯式穿插。单用易挥发或沉闷，二者结合能构建出长达 8-12 小时的三段式气味演变与稳定留香。`;
    } else if (activeDimension === 'aroma') {
      return `【香调层级重叠与丰满】: ${primaryProduct.cn} 的气味基调与 ${secondaryProduct.cn} 形成天然轮廓重组，补充了单一精油香气的单薄感，带来如高级沙龙香水般的丰富层次感。`;
    } else {
      return `【芳疗功效双重增效】: 协同分子在受体结合点产生相辅相成的增效作用，显著提升疗愈靶点的生理响应度，同时分散单一活性成分的皮肤刺激风险。`;
    }
  }, [activeDimension, primaryProduct, secondaryProduct]);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#152319] border border-[#8C7E6A]/30 space-y-4 shadow-lg text-[#E8DAC8]">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#8C7E6A]/20 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#C5B49A]/20 text-[#C5B49A]">
              <Activity className="w-4 h-4" />
            </span>
            <h5 className="font-serif font-bold text-sm text-[#E8DAC8]">
              成分协同可视化对比雷达图 (Synergy Spectrum Radar)
            </h5>
          </div>
          <p className="text-[11px] text-[#E8DAC8]/70 font-sans">
            对比【{primaryProduct.cn}】与【{secondaryProduct.cn}】在三大维度的多维重叠与互补增效
          </p>
        </div>

        {/* Secondary product switcher if available */}
        {availableSecondaryProducts.length > 1 && onSelectSecondaryProduct && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#C5B49A] font-serif shrink-0">对比精油:</span>
            <select
              value={secondaryProduct.code}
              onChange={(e) => {
                const found = availableSecondaryProducts.find((p) => p.code === e.target.value);
                if (found) onSelectSecondaryProduct(found);
              }}
              className="px-2.5 py-1 rounded-xl bg-black/40 border border-[#8C7E6A]/40 text-xs text-[#E8DAC8] focus:outline-none focus:border-[#C5B49A]"
            >
              {availableSecondaryProducts.map((p) => (
                <option key={p.code} value={p.code} className="bg-[#1C2E20] text-[#E8DAC8]">
                  {p.cn} ({p.code})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Dimension Switch Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-black/30 p-1 rounded-xl border border-white/10">
        <button
          onClick={() => setActiveDimension('volatility')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-serif font-bold transition-all ${
            activeDimension === 'volatility'
              ? 'bg-[#C5B49A] text-[#1C2E20] shadow-sm'
              : 'text-[#E8DAC8]/70 hover:text-[#E8DAC8] hover:bg-white/5'
          }`}
        >
          1. 挥发度与留香阶梯
        </button>
        <button
          onClick={() => setActiveDimension('aroma')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-serif font-bold transition-all ${
            activeDimension === 'aroma'
              ? 'bg-[#C5B49A] text-[#1C2E20] shadow-sm'
              : 'text-[#E8DAC8]/70 hover:text-[#E8DAC8] hover:bg-white/5'
          }`}
        >
          2. 香调属性分布
        </button>
        <button
          onClick={() => setActiveDimension('efficacy')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-serif font-bold transition-all ${
            activeDimension === 'efficacy'
              ? 'bg-[#C5B49A] text-[#1C2E20] shadow-sm'
              : 'text-[#E8DAC8]/70 hover:text-[#E8DAC8] hover:bg-white/5'
          }`}
        >
          3. 芳疗疗愈效益
        </button>
      </div>

      {/* Radar Chart Display */}
      <div className="w-full h-64 sm:h-72 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
            <PolarGrid stroke="rgba(197, 180, 154, 0.25)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#E8DAC8', fontSize: 11, fontFamily: 'serif' }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: 'rgba(232, 218, 200, 0.4)', fontSize: 9 }}
              stroke="rgba(197, 180, 154, 0.2)"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 18, 0.95)',
                borderColor: '#C5B49A',
                borderRadius: '12px',
                color: '#E8DAC8',
                fontSize: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '10px',
                fontSize: '12px',
                fontFamily: 'serif'
              }}
            />
            <Radar
              name={`主产品: ${primaryProduct.cn}`}
              dataKey={primaryProduct.cn}
              stroke="#F59E0B"
              fill="#F59E0B"
              fillOpacity={0.4}
            />
            <Radar
              name={`协同搭档: ${secondaryProduct.cn}`}
              dataKey={secondaryProduct.cn}
              stroke="#34D399"
              fill="#34D399"
              fillOpacity={0.45}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Narrative Explanation Banner */}
      <div className="p-3 rounded-xl bg-black/40 border border-[#C5B49A]/20 flex items-start gap-2.5 text-xs text-[#E8DAC8]/90 font-sans">
        <Sparkles className="w-4 h-4 text-[#C5B49A] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {synergyNarrative}
        </p>
      </div>
    </div>
  );
};
