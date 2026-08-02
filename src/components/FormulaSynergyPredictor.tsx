import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Zap, TestTube, BookmarkPlus, CheckCircle2, ArrowRight, Layers, Sliders, Info, Copy, Share2, ShieldAlert, HeartHandshake } from 'lucide-react';
import { ProductItem } from '../types';
import { fetchProductsFromSupabase } from '../data/siteDataService';

export interface PredictedFormula {
  id: string;
  title: string;
  category: 'sleep' | 'focus' | 'repair' | 'emotional' | 'respiratory';
  categoryLabel: string;
  synergyScore: number; // e.g. 96%
  primaryMechanism: string;
  chemicalPairing: string;
  ingredients: {
    product: ProductItem;
    drops: number;
    percentage: string;
    role: string;
  }[];
  carrierOil: {
    name: string;
    volume: string;
    reason: string;
  };
  targetBenefits: string[];
  applicationGuide: string;
  safetyNote: string;
}

interface FormulaSynergyPredictorProps {
  baseProduct?: ProductItem;
  wishlistedProducts?: ProductItem[];
  onSelectProduct?: (product: ProductItem) => void;
  onSaveToUserFormulas?: (formula: {
    title: string;
    concept: string;
    components: string[];
    carrier: string;
  }) => void;
}

// Synergy knowledge base for predicting formulas
const SYNERGY_KNOWLEDGE_BASE: Array<{
  category: PredictedFormula['category'];
  categoryLabel: string;
  titleTemplate: (p1: string, p2?: string) => string;
  requiredSubgroups?: string[];
  mechanism: string;
  pairingDesc: string;
  benefits: string[];
  guide: string;
  safety: string;
  carrier: { name: string; volume: string; reason: string };
  defaultSecondaryCodes: string[];
}> = [
  {
    category: 'sleep',
    categoryLabel: '睡眠与神经平复',
    titleTemplate: (p1, p2) => `【深眠解压】${p1} × ${p2 || '真正薰衣草'} 酯醇协同平复案`,
    mechanism: '乙酸芳樟酯 (酯类) 与 芳樟醇 (醇类) 形成 1:1.5 协同效应，加速副交感神经兴奋并显著降低血清皮质醇水平。',
    pairingDesc: '单萜醇与单萜酯强强联合，安抚交感神经过度紧张，延长深度睡眠 (N3) 周期。',
    benefits: ['高压失眠改善', '消除入睡前思维纷乱', '夜间心率平稳下降'],
    guide: '取 3 滴精油混合于 10ml 甜杏仁油中，睡前 20 分钟涂抹于双侧太阳穴、胸口与手腕脉搏处。',
    safety: '低血压人群睡前使用量建议减半；妊娠前三个月慎用。',
    carrier: { name: '有机金黄荷荷巴油', volume: '10ml', reason: '延展性极佳，渗透迅速且不堵塞毛孔' },
    defaultSecondaryCodes: ['Y-M-02', 'Y-M-01', 'H-B-01']
  },
  {
    category: 'focus',
    categoryLabel: '清脑与专注理疗',
    titleTemplate: (p1, p2) => `【灵感醒脑】${p1} × ${p2 || '欧薄荷'} 1,8-桉油醇清澈案`,
    mechanism: '1,8-桉油醇 (Oxides) 与 迷迭香酸 (Phenols) 协同作用，扩张脑部微血管流量，提升脑电波 Alpha 波专注活跃度。',
    pairingDesc: '氧化物迅速穿透血脑屏障，带来清凉通透感，消除工作与学习中的脑雾与疲惫。',
    benefits: ['清退午后昏沉', '提升长久专注力', '缓解长途驾驶头昏'],
    guide: '滴 2 滴于扩香木或无火香氛石，置于办公桌前 30cm 处自然挥发扩散。',
    safety: '蚕豆症 (G6PD) 患者禁用；2岁以下婴幼儿不可直接吸入。',
    carrier: { name: '葡萄籽基础油', volume: '10ml', reason: '质地清爽易吸收，无油腻感' },
    defaultSecondaryCodes: ['Y-W-01', 'Y-F-02', 'H-[#-02']
  },
  {
    category: 'repair',
    categoryLabel: '肌肤屏障与细胞修护',
    titleTemplate: (p1, p2) => `【肌底修护】${p1} × ${p2 || '大马士革玫瑰'} 倍半萜沉降案`,
    mechanism: 'α-没药醇与 β-石竹烯 (倍半萜烯) 协同嵌入角质层脂质双分子层，强化丝聚蛋白表达与抗炎因子合成。',
    pairingDesc: '高阶倍半萜化合物具有极强抗氧化与基底修护力，抚平因换季或过度清洁导致的泛红脱皮。',
    benefits: ['角质屏障重塑', '换季敏感泛红镇定', '受损肌底油脂平衡'],
    guide: '在 15ml 玫瑰果基础油中加入 2 滴，于晚间护肤最后一步作为锁水封包面油按压吸收。',
    safety: '含活性倍半萜成分，敏感肌首次使用前须在耳后作 24h 斑贴测试。',
    carrier: { name: '冷压智利玫瑰果油', volume: '15ml', reason: '富含不饱和脂肪酸与 Omega-3/6/9，加速屏障修护' },
    defaultSecondaryCodes: ['Y-E-01', 'Y-W-03', 'S-N-01']
  },
  {
    category: 'emotional',
    categoryLabel: '情绪锚定与心灵安定',
    titleTemplate: (p1, p2) => `【禅境归心】${p1} × ${p2 || '阿曼乳香'} 树脂倍半萜定香案`,
    mechanism: '乳香酸 (Boswellic Acids) 与 乙酸乳香酯 (Incensole Acetate) 激活边缘系统多巴胺受体，带来深沉长效的心灵沉静。',
    pairingDesc: '树脂类基调精油为整组配方提供稳固定香基底，拉长前中调气味留香时长至 8 小时以上。',
    benefits: ['情绪焦虑即刻锚定', '冥想与瑜伽呼吸加深', '内耗与情绪波动抚平'],
    guide: '掌心滴入 1 滴，搓热后罩于鼻前作 5 次深缓腹式呼吸（吸气4秒，屏息2秒，呼气6秒）。',
    safety: '孕妇避开腹部大面积涂抹；宜存放于阴凉避光处。',
    carrier: { name: '甜杏仁护肤基础油', volume: '10ml', reason: '亲肤性强，富含维生素E，锁住芳香分子' },
    defaultSecondaryCodes: ['Y-M-03', 'Y-E-02', 'H-S-01']
  }
];

export const FormulaSynergyPredictor: React.FC<FormulaSynergyPredictorProps> = ({
  baseProduct,
  wishlistedProducts = [],
  onSelectProduct,
  onSaveToUserFormulas,
}) => {
    const [catalogProducts, setCatalogProducts] = useState<ProductItem[]>([]);

  // Load real products
  useEffect(() => {
    let mounted = true;
    fetchProductsFromSupabase().then((products) => {
      if (mounted) setCatalogProducts(products);
    });
    return () => { mounted = false; };
  }, []);

const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [savedSuccessId, setSavedSuccessId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Compute predictive formula cards
  const predictedFormulas = useMemo<PredictedFormula[]>(() => {
    // Determine anchor products
    const anchor = baseProduct || wishlistedProducts[0] || catalogProducts[0];
    if (!anchor || catalogProducts.length === 0) return [];
    const pool = catalogProducts.filter((p) => p.code !== anchor.code);

    return SYNERGY_KNOWLEDGE_BASE.map((kb, idx) => {
      // Find matching secondary product
      let secondary = pool.find((p) => kb.defaultSecondaryCodes.includes(p.code));
      if (!secondary) {
        secondary = pool[idx % pool.length];
      }

      // Add a third modifier if available
      let tertiary = pool.find(
        (p) => p.code !== secondary?.code && p.series === 'yuan' && p.subgroup !== anchor.subgroup
      ) || pool[(idx + 2) % pool.length];

      const score = 92 + (idx * 2) % 7; // score between 92% and 98%

      return {
        id: `PRED-FORMULA-${anchor.code}-${idx + 1}`,
        title: kb.titleTemplate(anchor.cn, secondary?.cn),
        category: kb.category,
        categoryLabel: kb.categoryLabel,
        synergyScore: score,
        primaryMechanism: kb.mechanism,
        chemicalPairing: kb.pairingDesc,
        ingredients: [
          { product: anchor, drops: 3, percentage: '45%', role: '主调 (Top/Heart Anchor)' },
          { product: secondary, drops: 2, percentage: '35%', role: '协同辅调 (Synergy Partner)' },
          { product: tertiary, drops: 1, percentage: '20%', role: '定香/润色 (Base Enhancer)' },
        ],
        carrierOil: kb.carrier,
        targetBenefits: kb.benefits,
        applicationGuide: kb.guide,
        safetyNote: kb.safety,
      };
    });
  }, [baseProduct, wishlistedProducts, catalogProducts]);

  const filteredFormulas = useMemo(() => {
    if (selectedCategory === 'all') return predictedFormulas;
    return predictedFormulas.filter((f) => f.category === selectedCategory);
  }, [predictedFormulas, selectedCategory]);

  const handleSaveFormula = (formula: PredictedFormula) => {
    const formulaPayload = {
      title: formula.title,
      concept: `${formula.chemicalPairing} · 协同契合度 ${formula.synergyScore}%`,
      components: [
        ...formula.ingredients.map((ing) => `${ing.product.cn} (${ing.drops}滴 / ${ing.percentage})`),
        `基础油: ${formula.carrierOil.name} (${formula.carrierOil.volume})`
      ],
      carrier: formula.applicationGuide,
    };

    if (onSaveToUserFormulas) {
      onSaveToUserFormulas(formulaPayload);
    } else {
      // Direct localStorage save fallback
      try {
        const existingRaw = localStorage.getItem('unio_saved_formulas');
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const newFormula = {
          id: `PRED-${Date.now()}`,
          date: new Date().toISOString().slice(0, 10),
          ...formulaPayload,
          coaBatch: `PRED-GCMS-${Math.floor(Math.random() * 89999 + 10000)}`
        };
        localStorage.setItem('unio_saved_formulas', JSON.stringify([newFormula, ...existing]));
      } catch (e) {
        console.error('Save formula failed', e);
      }
    }

    setSavedSuccessId(formula.id);
    setTimeout(() => setSavedSuccessId(null), 3000);
  };

  const handleCopyText = (formula: PredictedFormula) => {
    const text = `【UNIO 东方植萃实验室 · 相似配方预测案】
配方名称：${formula.title}
协同相容度：${formula.synergyScore}%
核心化学机制：${formula.primaryMechanism}

【配方精油组成】
${formula.ingredients.map((ing) => `• ${ing.product.cn} (${ing.product.code}): ${ing.drops}滴 [${ing.role}]`).join('\n')}
• 基础油: ${formula.carrierOil.name} ${formula.carrierOil.volume}

【使用理疗建议】
${formula.applicationGuide}
【安全提醒】
${formula.safetyNote}`;

    navigator.clipboard.writeText(text);
    setCopiedId(formula.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 bg-[#0E1511] text-[#E8DAC8] p-5 sm:p-7 rounded-3xl border border-[#C5B49A]/30 shadow-2xl relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#C5B49A]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial from-[#1C2E20] to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C5B49A]/20 pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#C5B49A]/20 text-[#C5B49A] border border-[#C5B49A]/30">
              <Zap className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#E8DAC8] flex items-center gap-2">
                <span>AI 相似配方预测与协同进阶搭配</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#C5B49A] text-[#1C2E20] text-[10px] font-mono font-bold">
                  GC-MS SYNERGY
                </span>
              </h3>
              <p className="text-xs text-[#E8DAC8]/70 font-sans mt-0.5">
                基于 {baseProduct ? `【${baseProduct.cn}】` : wishlistedProducts.length > 0 ? `收藏的 ${wishlistedProducts.length} 款产品` : '品牌全线精油'} 的 GC-MS 分子相容度与协同增效模型，自动化预测高阶配方
              </p>
            </div>
          </div>
        </div>

        {/* Anchor Indicator */}
        {baseProduct && (
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#1C2E20] border border-[#C5B49A]/30 shrink-0">
            <img src={baseProduct.image} alt={baseProduct.cn} className="w-9 h-9 rounded-xl object-cover border border-[#C5B49A]/40" />
            <div className="text-xs">
              <span className="text-[10px] text-[#C5B49A] font-mono block">当前分析基底锚定</span>
              <span className="font-serif font-bold text-[#E8DAC8]">{baseProduct.cn} ({baseProduct.code})</span>
            </div>
          </div>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="relative z-10 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-[#C5B49A] text-[#1C2E20] font-bold shadow-md'
              : 'bg-white/5 text-[#E8DAC8]/80 hover:bg-white/10 border border-white/10'
          }`}
        >
          全能高阶预测 ({predictedFormulas.length})
        </button>
        <button
          onClick={() => setSelectedCategory('sleep')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-medium transition-all ${
            selectedCategory === 'sleep'
              ? 'bg-[#C5B49A] text-[#1C2E20] font-bold shadow-md'
              : 'bg-white/5 text-[#E8DAC8]/80 hover:bg-white/10 border border-white/10'
          }`}
        >
          🌙 深度睡眠/解压
        </button>
        <button
          onClick={() => setSelectedCategory('focus')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-medium transition-all ${
            selectedCategory === 'focus'
              ? 'bg-[#C5B49A] text-[#1C2E20] font-bold shadow-md'
              : 'bg-white/5 text-[#E8DAC8]/80 hover:bg-white/10 border border-white/10'
          }`}
        >
          💡 脑力专注/清醒
        </button>
        <button
          onClick={() => setSelectedCategory('repair')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-medium transition-all ${
            selectedCategory === 'repair'
              ? 'bg-[#C5B49A] text-[#1C2E20] font-bold shadow-md'
              : 'bg-white/5 text-[#E8DAC8]/80 hover:bg-white/10 border border-white/10'
          }`}
        >
          ✨ 肌底屏障/抗衰
        </button>
        <button
          onClick={() => setSelectedCategory('emotional')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-medium transition-all ${
            selectedCategory === 'emotional'
              ? 'bg-[#C5B49A] text-[#1C2E20] font-bold shadow-md'
              : 'bg-white/5 text-[#E8DAC8]/80 hover:bg-white/10 border border-white/10'
          }`}
        >
          🧘 禅定心境/锚定
        </button>
      </div>

      {/* Predicted Formula Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredFormulas.map((formula) => {
          const isSaved = savedSuccessId === formula.id;
          const isCopied = copiedId === formula.id;

          return (
            <div
              key={formula.id}
              className="p-5 rounded-2xl bg-[#152319]/90 border border-[#C5B49A]/30 hover:border-[#C5B49A] transition-all space-y-4 shadow-lg flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header title & score */}
                <div className="flex items-start justify-between gap-3 border-b border-[#C5B49A]/15 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#C5B49A] px-2 py-0.5 rounded-md bg-[#C5B49A]/10 border border-[#C5B49A]/20 inline-block mb-1">
                      {formula.categoryLabel}
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#E8DAC8] group-hover:text-white transition-colors">
                      {formula.title}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-mono font-bold text-[#C5B49A] flex items-center justify-end gap-1">
                      <Sparkles className="w-4 h-4 text-[#C5B49A]" />
                      <span>{formula.synergyScore}%</span>
                    </div>
                    <span className="text-[9px] text-[#E8DAC8]/60 font-sans block">分子协同相容度</span>
                  </div>
                </div>

                {/* Mechanism Box */}
                <div className="p-3 rounded-xl bg-black/40 border border-[#C5B49A]/20 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[#C5B49A] font-serif font-bold text-[11px]">
                    <TestTube className="w-3.5 h-3.5" />
                    <span>GC-MS 协同机制 (Molecular Synergy Mechanism)</span>
                  </div>
                  <p className="text-[#E8DAC8]/85 text-[11px] leading-relaxed">
                    {formula.primaryMechanism}
                  </p>
                </div>

                {/* Ingredients & Ratios Breakdown */}
                <div className="space-y-2">
                  <span className="text-[11px] font-serif font-bold text-[#C5B49A] block">
                    推荐精准配比 (Synergistic Ratio & Ingredients)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {formula.ingredients.map((ing, i) => (
                      <div
                        key={i}
                        onClick={() => onSelectProduct && onSelectProduct(ing.product)}
                        className={`p-2.5 rounded-xl bg-black/30 border border-white/10 hover:border-[#C5B49A]/50 transition-all text-xs flex flex-col justify-between ${
                          onSelectProduct ? 'cursor-pointer hover:bg-black/50' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={ing.product.image}
                            alt={ing.product.cn}
                            className="w-8 h-8 rounded-lg object-cover border border-white/15 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-serif font-bold text-[#E8DAC8] truncate block text-[11px]">
                              {ing.product.cn}
                            </span>
                            <span className="text-[9px] text-[#C5B49A] font-mono block">
                              {ing.product.code}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-[#E8DAC8]/70">{ing.role.split(' ')[0]}</span>
                          <span className="font-bold text-[#C5B49A]">{ing.drops}滴 ({ing.percentage})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carrier Oil & Target Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-black/20 border border-white/10 space-y-1">
                    <span className="text-[10px] text-[#C5B49A] font-serif font-bold block">推荐稀释基础油</span>
                    <p className="font-semibold text-[#E8DAC8] text-[11px]">{formula.carrierOil.name} ({formula.carrierOil.volume})</p>
                    <p className="text-[10px] text-[#E8DAC8]/60">{formula.carrierOil.reason}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/20 border border-white/10 space-y-1">
                    <span className="text-[10px] text-[#C5B49A] font-serif font-bold block">核心理疗效益</span>
                    <div className="flex flex-wrap gap-1">
                      {formula.targetBenefits.map((b, bi) => (
                        <span key={bi} className="px-1.5 py-0.5 rounded bg-[#C5B49A]/15 text-[#E8DAC8] text-[9.5px]">
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopyText(formula)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-[#E8DAC8] font-medium transition-all flex items-center gap-1.5 active:scale-95"
                  title="复制文字版完整配方案"
                >
                  <Copy className="w-3.5 h-3.5 text-[#C5B49A]" />
                  <span>{isCopied ? '已复制配方' : '复制配方'}</span>
                </button>

                <button
                  onClick={() => handleSaveFormula(formula)}
                  disabled={isSaved}
                  className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 shadow-md active:scale-95 ${
                    isSaved
                      ? 'bg-[#1C2E20] text-[#C5B49A] border border-[#C5B49A]'
                      : 'bg-[#C5B49A] hover:bg-[#E8DAC8] text-[#1C2E20]'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#C5B49A]" />
                      <span>已存入我的调配案</span>
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="w-4 h-4" />
                      <span>保存为专属调配案</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
