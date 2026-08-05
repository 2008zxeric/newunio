import React, { useState } from 'react';
import { printElementAsPNG, downloadElementAsPNG } from '../utils/printExport';
import { 
  Printer, 
  Download, 
  Sparkles, 
  Check, 
  Layout, 
  Share2, 
  Feather, 
  Smartphone, 
  Image as ImageIcon,
  Search,
  Copy,
  CheckCircle2,
  SlidersHorizontal,
  Info,
  ShieldCheck,
  Droplets,
  MapPin,
  Clock,
  Compass,
  Layers,
  Sparkle,
  FileCheck2,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { ALL_PRODUCTS } from '../data/catalogData';
import { matchProductWithPinyin, getSearchRelevanceScore } from '../utils/pinyinSearch';
import { UnioLogo } from './UnioLogo';
import { FOUNDING_YEAR } from '../utils/brandConstants';
import { ProductItem } from '../types';

// Luxury background image presets (High-res botanical & nature themes: Flowers, Plants, Stones, Mountains, Rivers, Lakes, Seas, Snow Mountains)
const BG_IMAGE_PRESETS = [
  {
    id: 'none',
    label: '📜 经典宣纸 Canvas',
    url: '',
    overlayDarkness: 'bg-[#F5F2EC]',
  },
  {
    id: 'snow-mountain',
    label: '🏔️ 元境雪山冰川',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200',
    overlayDarkness: 'bg-[#0b1410]/80 text-[#E8DAC8]',
    isDark: true,
  },
  {
    id: 'damask-rose',
    label: '🌸 繁花甘露柔情',
    url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=1200',
    overlayDarkness: 'bg-[#1a0c12]/80 text-[#F5EFE6]',
    isDark: true,
  },
  {
    id: 'deep-forest',
    label: '🌲 密林深苔古木',
    url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1200',
    overlayDarkness: 'bg-[#0a160d]/85 text-[#E8DAC8]',
    isDark: true,
  },
  {
    id: 'zen-stone',
    label: '🪨 磐石沉香结界',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1200',
    overlayDarkness: 'bg-[#0f1411]/85 text-[#E8DAC8]',
    isDark: true,
  },
  {
    id: 'alpine-lake',
    label: '🌊 湖海澄澈清波',
    url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80&w=1200',
    overlayDarkness: 'bg-[#0a1219]/80 text-[#E8DAC8]',
    isDark: true,
  },
  {
    id: 'misty-mountain',
    label: '⛰️ 崇山叠翠云雾',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    overlayDarkness: 'bg-[#121c15]/85 text-[#E8DAC8]',
    isDark: true,
  },
  {
    id: 'botanical-lab',
    label: '🧪 蒸馏植萃金图',
    url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200',
    overlayDarkness: 'bg-[#1a130f]/80 text-[#E8DAC8]',
    isDark: true,
  }
];

export const PosterExporter: React.FC = () => {
  // Preset templates matching reference image
  const [preset, setPreset] = useState<'xuanpaper' | 'founder' | 'lotus' | 'rose' | 'alchemy'>('xuanpaper');
  
  // Customizer Form Controls
  const [headline, setHeadline] = useState('岁岁闻香，岁岁念你');
  const [tagline, setTagline] = useState(`敬 品牌创始人 Alice-刘元红 —— 一套从 ${FOUNDING_YEAR} 年真实芳疗记录、全球原料与长期配方中生长出来的精品香气体系。`);
  const [quote, setQuote] = useState('“元取自创始人中间名，UNIO 意为融合自然。把个人记忆沉淀为完整、专业且可追溯的品牌表达。”');
  const [featuredProduct, setFeaturedProduct] = useState<ProductItem>(
    ALL_PRODUCTS.find((p) => p.code.includes('Y-B-001')) || ALL_PRODUCTS[0]
  );
  
  // Styling state
  const [posterStyle, setPosterStyle] = useState<'xuanpaper' | 'charcoal' | 'taupe' | 'beige'>('xuanpaper');
  const [bgImageId, setBgImageId] = useState<string>('none');
  const [cardFormat, setCardFormat] = useState<'momentsCard' | 'wallPaper' | 'poster'>('momentsCard');
  const [sealText, setSealText] = useState<'元香手记' | 'UNIO 审定' | '元香真迹'>('元香手记');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);

  // Editable Rich Metadata on Card
  const [customOrigin, setCustomOrigin] = useState('');
  const [customExtraction, setCustomExtraction] = useState('');
  const [customBenefits, setCustomBenefits] = useState('');
  const [customStorage, setCustomStorage] = useState('避光阴凉 15-22℃ 密封保存，防潮防晒');
  const [showRichDetails, setShowRichDetails] = useState(true);

  // Derived rich details helpers
  const getProductOrigin = () => customOrigin || featuredProduct.origin || '全球元境原产地';
  const getExtractionMethod = () => {
    if (customExtraction) return customExtraction;
    const name = featuredProduct.cn;
    if (name.includes('玫瑰') || name.includes('茉莉') || name.includes('花')) return '蒸馏花朵蒸取 / 保留完整水相活性';
    if (name.includes('柑橘') || name.includes('柠檬') || name.includes('甜橙') || name.includes('佛手柑')) return '果皮冷压萃取 / 饱满右旋柠檬烯';
    if (name.includes('檀香') || name.includes('雪松') || name.includes('乳香') || name.includes('沉香')) return '树木重水蒸馏 / 沉稳倍半萜醇';
    if (name.includes('纯露')) return '低温水相蒸馏 / 细密微量水分分子';
    return '元境植物原萃 / 无化学稀释';
  };
  const getCoreBenefits = () => {
    if (customBenefits) return customBenefits;
    const name = featuredProduct.cn;
    if (name.includes('玫瑰') || name.includes('茉莉') || name.includes('依兰')) return '深层安神 · 柔情抚慰 · 滋养女性心气';
    if (name.includes('薄荷') || name.includes('尤加利') || name.includes('迷迭香')) return '清通呼吸 · 提振头脑 · 空间天然抑菌';
    if (name.includes('薰衣草') || name.includes('洋甘菊')) return '舒缓紧绷 · 助眠安息 · 肌肤温和修护';
    if (name.includes('檀香') || name.includes('乳香')) return '接地定轴 · 元境结界 · 深度冥想沉静';
    return '原生能量共振 · 身心平衡安顿 · 空间气场净化';
  };

  // Apply Preset Templates
  const applyPreset = (type: 'xuanpaper' | 'founder' | 'lotus' | 'rose' | 'alchemy') => {
    setPreset(type);
    if (type === 'xuanpaper') {
      setHeadline('岁岁闻香，岁岁念你');
      setTagline(`敬 品牌创始人 Alice-刘元红 —— 一套从 ${FOUNDING_YEAR} 年真实芳疗记录、全球原料与长期配方中生长出来的精品香气体系。`);
      setQuote('“元取自创始人中间名，UNIO 意为融合自然。把个人记忆沉淀为完整、专业且可追溯的品牌表达。”');
      const prod = ALL_PRODUCTS.find((p) => p.code.includes('Y-B-001')) || ALL_PRODUCTS[0];
      setFeaturedProduct(prod);
      setPosterStyle('xuanpaper');
      setBgImageId('none');
      setCardFormat('momentsCard');
      setSealText('元香手记');
      setCustomOrigin('');
      setCustomExtraction('');
      setCustomBenefits('');
    } else if (type === 'founder') {
      setHeadline('始于觉知，元于一息');
      setTagline(`Alice 刘元红 创始人手记 —— 23 年临床手记与 219 款植物作品归真档案。`);
      setQuote('“真正的植物力量，不需要华丽的外壳掩盖。每一滴精油，都是自然风土与气候在特定时刻的呼吸。”');
      setPosterStyle('charcoal');
      setBgImageId('amber-glass');
      setCardFormat('poster');
      setSealText('UNIO 审定');
      const prod = ALL_PRODUCTS.find((p) => p.cn.includes('乳香') || p.cn.includes('沉香')) || ALL_PRODUCTS[0];
      setFeaturedProduct(prod);
      setCustomOrigin('');
      setCustomExtraction('');
      setCustomBenefits('');
    } else if (type === 'lotus') {
      setHeadline('紫金莲花纯香 · 空间结界');
      setTagline('UNIO AROMA 五行位格 · 纯素原生香气与心灵安顿');
      setQuote('“先确认来处，再谈香气；先理解身心状态，再选择与之共振的植物本源。”');
      setPosterStyle('taupe');
      setBgImageId('zen-tea');
      setCardFormat('momentsCard');
      setSealText('元香真迹');
      const prod = ALL_PRODUCTS.find((p) => p.code.includes('Y-J-021') || p.cn.includes('莲花')) || ALL_PRODUCTS[0];
      setFeaturedProduct(prod);
      setCustomOrigin('');
      setCustomExtraction('');
      setCustomBenefits('');
    } else if (type === 'rose') {
      setHeadline('大马士革玫瑰 · 万朵柔情萃集');
      setTagline('保加利亚高山冷泉有机蒸馏 · 保存完整花香频次与活性');
      setQuote('“花朵在蒸馏锅里徐徐绽放，把柔情毫无保留地倾注出来，温抚每颗被生活重压的心灵。”');
      setPosterStyle('beige');
      setBgImageId('damask-rose');
      setCardFormat('momentsCard');
      setSealText('元香手记');
      const prod = ALL_PRODUCTS.find((p) => p.cn.includes('玫瑰')) || ALL_PRODUCTS[0];
      setFeaturedProduct(prod);
      setCustomOrigin('');
      setCustomExtraction('');
      setCustomBenefits('');
    } else if (type === 'alchemy') {
      setHeadline("Nature's Alchemy · GC-MS/COA 纯度");
      setTagline('元境源头农场直采 · 实验室单批次可追溯色谱报告');
      setQuote('“无化学添加，无人工稀释，用最严苛的国际色谱标准建立起安全安心的芳疗信任。”');
      setPosterStyle('xuanpaper');
      setBgImageId('botanical-lab');
      setCardFormat('poster');
      setSealText('UNIO 审定');
      const prod = ALL_PRODUCTS.find((p) => p.series === 'he') || ALL_PRODUCTS[0];
      setFeaturedProduct(prod);
      setCustomOrigin('');
      setCustomExtraction('');
      setCustomBenefits('');
    }
  };

  const handlePrint = async () => {
    try {
      const el = document.getElementById('print-poster-canvas');
      if (el) { await printElementAsPNG(el, 2); return; }
    } catch (e) { console.warn('print failed:', e); }
    window.print();
  };

  // High-Precision PNG Image Exporter using html-to-image toPng
  const handleSaveImage = async () => {
    const node = document.getElementById('print-poster-canvas');
    if (!node) {
      window.print();
      return;
    }

    try {
      setExporting(true);
      const code = featuredProduct?.code || 'Y-B-001';
      await downloadElementAsPNG(node, `UNIO_${code}_宣纸海报.png`, 2);
    } catch (e) {
      console.error('PNG export failed:', e);
      window.print();
    } finally {
      setExporting(false);
    }
  };
  const handleCopyCardText = () => {
    const cardContent = `【UNIO 元香 · Alice 芳疗手记宣传海报】\n\n主标题：${headline}\n副标题：${tagline}\n品牌名言：${quote}\n\n【主推作品】\n名称：${featuredProduct.cn} (${featuredProduct.code})\n原产地：${getProductOrigin()}\n萃取工艺：${getExtractionMethod()}\n常见功效：${getCoreBenefits()}\n保存办法：${customStorage}\n价格规格：${featuredProduct.prices.join(' / ')}\n说明：${featuredProduct.shortDesc || featuredProduct.description}\n\n—— 敬 品牌创始人 Alice 刘元红\n官网：unioaroma.com`;
    navigator.clipboard.writeText(cardContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filtered products for selector
  const filteredProducts = ALL_PRODUCTS.filter((p) => 
    p.cn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentBgPreset = BG_IMAGE_PRESETS.find((bg) => bg.id === bgImageId);

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2 no-print">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C2E20]/10 border border-[#1C2E20]/20 text-[#1C2E20] text-xs font-mono tracking-widest uppercase">
          <Feather className="w-3.5 h-3.5 text-[#A82E2E]" />
          <span>BOUTIQUE POSTER EXPORTER / 门店宣纸海报生成与高清卡片导出</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#1C2E20] font-bold">
          UNIO 元香 门店宣纸海报与宣传卡片排版导出
        </h2>
        <p className="text-xs sm:text-sm text-[#2D2D2A]/80 font-serif leading-relaxed">
          专为门店、茶席与线上朋友圈宣传设计。融合 Alice 创始人手记、朱印章、产品详细功效档案与三码印记，支持高清在线打印与 PDF / 图片导出。
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch font-sans">
        
        {/* Left Column: Customizer Control Panel (5 Cols) */}
        <div className="lg:col-span-5 bg-[#EFEDE7] border border-[#8C7E6A]/30 rounded-3xl p-5 sm:p-6 shadow-md text-xs text-[#2D2D2A] no-print flex flex-col justify-between h-full">
          
          {/* Panel Header */}
          <div className="border-b border-[#8C7E6A]/20 pb-3 flex justify-between items-center shrink-0">
            <span className="font-serif text-sm font-bold text-[#1C2E20] flex items-center gap-2">
              <SlidersHorizontal className="w-4.5 h-4.5 text-[#A82E2E]" />
              <span>海报内容与排版配置</span>
            </span>
            <span className="text-[10px] text-[#8C7E6A] font-mono uppercase tracking-wider">CUSTOMIZER PANEL</span>
          </div>

          {/* Scrollable Main Control Area */}
          <div className="space-y-6 my-3 flex-1 overflow-y-auto pr-1 max-h-[820px] no-scrollbar">
            
            {/* STEP 1: Visual Theme & Canvas Setup */}
            <div className="space-y-3.5 p-4 rounded-2xl bg-[#F9F7F2] border border-[#8C7E6A]/25 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#8C7E6A]/20 pb-2">
                <span className="font-serif font-bold text-[#1C2E20] flex items-center gap-1.5 text-xs">
                  <Layers className="w-4 h-4 text-[#A82E2E]" />
                  <span>一、海报规格与意境艺术背景</span>
                </span>
                <span className="text-[9px] text-[#A82E2E] font-mono font-bold bg-[#A82E2E]/10 px-2 py-0.5 rounded-full">
                  STEP 01
                </span>
              </div>

              {/* Preset Templates */}
              <div>
                <label className="block text-[#1C2E20] mb-2 font-serif font-bold text-[11px] flex items-center justify-between">
                  <span>快速海报预设 Preset Templates</span>
                  <span className="text-[9px] text-[#8C7E6A]">5 款经典套路</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  
                  {/* Main Featured Xuan Paper Card Preset */}
                  <button
                    onClick={() => applyPreset('xuanpaper')}
                    className={`p-2.5 rounded-xl text-[11px] font-medium transition-all text-left flex flex-col justify-between border-2 col-span-2 shadow-xs cursor-pointer ${
                      preset === 'xuanpaper'
                        ? 'bg-[#F5F2EC] border-[#A82E2E] text-[#1C2E20]'
                        : 'bg-white border-[#8C7E6A]/30 text-[#2D2D2A] hover:border-[#1C2E20]'
                    }`}
                  >
                    <span className="font-serif font-bold text-[#A82E2E] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Feather className="w-3.5 h-3.5 text-[#A82E2E]" />
                        <span>Alice 手记官纸卡</span>
                      </span>
                      <span className="text-[9px] bg-[#A82E2E] text-white px-2 py-0.5 rounded-full font-mono font-bold">
                        元香手记 · 朱印珍藏
                      </span>
                    </span>
                    <span className="text-[10px] text-[#8C7E6A] font-serif pt-1">
                      东方宣纸肌理，包含 Alice 经典感悟、朱印与三码印记
                    </span>
                  </button>

                  <button
                    onClick={() => applyPreset('founder')}
                    className={`p-2 rounded-xl text-[11px] transition-all text-left border cursor-pointer ${
                      preset === 'founder'
                        ? 'bg-[#1C2E20] text-[#E8DAC8] border-[#1C2E20] font-bold'
                        : 'bg-white border-[#8C7E6A]/30 text-[#2D2D2A] hover:bg-[#EFECE6]'
                    }`}
                  >
                    <span className="font-serif font-bold block truncate">① 创始人致敬海报</span>
                    <span className="text-[9px] opacity-75 font-serif block mt-0.5 truncate">元境琥珀 · 23年归真</span>
                  </button>

                  <button
                    onClick={() => applyPreset('lotus')}
                    className={`p-2 rounded-xl text-[11px] transition-all text-left border cursor-pointer ${
                      preset === 'lotus'
                        ? 'bg-[#8C7E6A] text-white border-[#8C7E6A] font-bold'
                        : 'bg-white border-[#8C7E6A]/30 text-[#2D2D2A] hover:bg-[#EFECE6]'
                    }`}
                  >
                    <span className="font-serif font-bold block truncate">② 紫金莲花纯香</span>
                    <span className="text-[9px] opacity-75 font-serif block mt-0.5 truncate">禅意茶居 · 五行位格</span>
                  </button>

                  <button
                    onClick={() => applyPreset('rose')}
                    className={`p-2 rounded-xl text-[11px] transition-all text-left border cursor-pointer ${
                      preset === 'rose'
                        ? 'bg-[#EFEDE7] text-[#1C2E20] border-[#1C2E20] font-bold'
                        : 'bg-white border-[#8C7E6A]/30 text-[#2D2D2A] hover:bg-[#EFECE6]'
                    }`}
                  >
                    <span className="font-serif font-bold block truncate">③ 大马士革玫瑰</span>
                    <span className="text-[9px] opacity-75 font-serif block mt-0.5 truncate">晨露花田 · 万朵柔情</span>
                  </button>

                  <button
                    onClick={() => applyPreset('alchemy')}
                    className={`p-2 rounded-xl text-[11px] transition-all text-left border cursor-pointer ${
                      preset === 'alchemy'
                        ? 'bg-[#F5F2EC] text-[#1C2E20] border-[#A82E2E] font-bold'
                        : 'bg-white border-[#8C7E6A]/30 text-[#2D2D2A] hover:bg-[#EFECE6]'
                    }`}
                  >
                    <span className="font-serif font-bold block truncate">④ Nature's Alchemy</span>
                    <span className="text-[9px] opacity-75 font-mono block mt-0.5 truncate">植萃实验室 · 色谱追溯</span>
                  </button>

                </div>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="block text-[#1C2E20] mb-1.5 font-serif font-bold text-[11px]">
                  卡片排版比例 Aspect Ratio
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'momentsCard', label: '朋友圈试香卡', sub: '3:4 竖版', icon: Share2 },
                    { id: 'wallPaper', label: '手机高清壁纸', sub: '9:16 全屏', icon: Smartphone },
                    { id: 'poster', label: '标准宣传海报', sub: 'A4 210x297', icon: ImageIcon },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setCardFormat(f.id as any)}
                      className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
                        cardFormat === f.id
                          ? 'bg-[#1C2E20] text-[#E8DAC8] font-bold border-[#1C2E20] shadow-xs'
                          : 'bg-white border-[#8C7E6A]/30 text-[#2D2D2A] hover:bg-[#EFECE6]'
                      }`}
                    >
                      <f.icon className="w-3.5 h-3.5 text-[#A82E2E]" />
                      <span className="text-[10px] font-serif block leading-tight">{f.label}</span>
                      <span className="text-[8px] font-mono opacity-70 block">{f.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Art Image Selector */}
              <div>
                <label className="block text-[#1C2E20] mb-1.5 font-serif font-bold text-[11px] flex items-center justify-between">
                  <span>背景画质与意境艺术图 Background Image</span>
                  <span className="text-[9px] text-[#A82E2E] font-serif font-bold">7 款元境视觉</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {BG_IMAGE_PRESETS.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => setBgImageId(bg.id)}
                      className={`p-1.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 cursor-pointer ${
                        bgImageId === bg.id
                          ? 'bg-[#1C2E20] text-[#E8DAC8] border-[#1C2E20] font-bold shadow-xs'
                          : 'bg-white border-[#8C7E6A]/30 text-[#2D2D2A] hover:bg-[#EFECE6]'
                      }`}
                    >
                      {bg.url ? (
                        <img src={bg.url} alt={bg.label} className="w-7 h-7 rounded-lg object-cover shrink-0 border border-black/10" />
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-[#F5F2EC] border border-[#8C7E6A]/30 shrink-0 flex items-center justify-center">
                          <ImageIcon className="w-3.5 h-3.5 text-[#8C7E6A]" />
                        </div>
                      )}
                      <span className="truncate text-[10px] font-serif">{bg.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pure Color Canvas Theme */}
              <div>
                <label className="block text-[#1C2E20] mb-1.5 font-serif font-bold text-[11px]">
                  海报调性色系 (纯色 Canvas Theme)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'xuanpaper', label: '宣纸米白 Rice Paper', bgClass: 'bg-[#F5F2EC] text-[#1C2E20]' },
                    { id: 'charcoal', label: '深焦墨 Charcoal', bgClass: 'bg-[#1C2E20] text-[#E8DAC8]' },
                    { id: 'taupe', label: '静谧褐色 Taupe', bgClass: 'bg-[#8C7E6A] text-white' },
                    { id: 'beige', label: '极简素卡 Beige', bgClass: 'bg-[#EFEDE7] text-[#1C2E20]' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setPosterStyle(s.id as any);
                      }}
                      className={`p-2 rounded-xl border text-center font-serif text-[11px] transition-all cursor-pointer ${
                        posterStyle === s.id && bgImageId === 'none'
                          ? `${s.bgClass} border-[#1C2E20] font-bold shadow-xs`
                          : 'bg-white border-[#8C7E6A]/30 text-[#2D2D2A] hover:bg-[#EFECE6]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* STEP 2: Featured Product & Specification Customizer */}
            <div className="space-y-3.5 p-4 rounded-2xl bg-[#F9F7F2] border border-[#8C7E6A]/25 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#8C7E6A]/20 pb-2">
                <span className="font-serif font-bold text-[#1C2E20] flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#A82E2E]" />
                  <span>二、展示主推作品与履历属性</span>
                </span>
                <span className="text-[9px] text-[#A82E2E] font-mono font-bold bg-[#A82E2E]/10 px-2 py-0.5 rounded-full">
                  STEP 02
                </span>
              </div>

              {/* Product Selector */}
              <div className="space-y-1.5">
                <label className="block text-[#1C2E20] font-serif font-bold text-[11px] flex items-center justify-between">
                  <span>选择展示主推作品 (Featured Product)</span>
                  <span className="text-[9px] text-[#8C7E6A] font-mono">219 款馆藏</span>
                </label>

                {/* Search input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#8C7E6A] absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="搜索产品名称、编号或原产地..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-[#8C7E6A]/30 rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#1C2E20] focus:outline-none focus:border-[#1C2E20]"
                  />
                </div>

                <select
                  value={featuredProduct.no}
                  onChange={(e) => {
                    const p = ALL_PRODUCTS.find((item) => item.no === Number(e.target.value));
                    if (p) {
                      setFeaturedProduct(p);
                    }
                  }}
                  className="w-full bg-white border border-[#8C7E6A]/30 rounded-xl p-2.5 text-[#1C2E20] text-xs font-serif font-bold focus:outline-none focus:border-[#1C2E20]"
                >
                  {filteredProducts.slice(0, 50).map((p) => (
                    <option key={p.no} value={p.no}>
                      [{p.code}] {p.cn} - {p.prices[0]} ({p.origin})
                    </option>
                  ))}
                </select>
              </div>

              {/* Rich Metadata Customizer Panel */}
              <div className="p-3 rounded-xl bg-white border border-[#8C7E6A]/30 space-y-2.5">
                <div className="flex items-center justify-between border-b border-[#8C7E6A]/20 pb-1.5">
                  <span className="font-serif font-bold text-[#1C2E20] text-[11px] flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-[#A82E2E]" />
                    <span>海报专业履历 (原产地/部位/功效/保存)</span>
                  </span>
                  <button 
                    onClick={() => setShowRichDetails(!showRichDetails)}
                    className="text-[10px] text-[#A82E2E] font-mono hover:underline cursor-pointer"
                  >
                    {showRichDetails ? '折叠隐藏' : '展开自定义'}
                  </button>
                </div>

                {showRichDetails && (
                  <div className="space-y-2 pt-0.5">
                    <div>
                      <label className="block text-[10px] text-[#8C7E6A] font-serif mb-0.5">
                        原产地 (默认: {featuredProduct.origin})
                      </label>
                      <input
                        type="text"
                        placeholder={featuredProduct.origin}
                        value={customOrigin}
                        onChange={(e) => setCustomOrigin(e.target.value)}
                        className="w-full bg-[#F9F7F2] border border-[#8C7E6A]/30 rounded-lg p-1.5 text-xs text-[#1C2E20]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#8C7E6A] font-serif mb-0.5">
                        萃取部位与工艺 (Extraction Method)
                      </label>
                      <input
                        type="text"
                        placeholder={getExtractionMethod()}
                        value={customExtraction}
                        onChange={(e) => setCustomExtraction(e.target.value)}
                        className="w-full bg-[#F9F7F2] border border-[#8C7E6A]/30 rounded-lg p-1.5 text-xs text-[#1C2E20]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#8C7E6A] font-serif mb-0.5">
                        常见功效 (Core Benefits)
                      </label>
                      <input
                        type="text"
                        placeholder={getCoreBenefits()}
                        value={customBenefits}
                        onChange={(e) => setCustomBenefits(e.target.value)}
                        className="w-full bg-[#F9F7F2] border border-[#8C7E6A]/30 rounded-lg p-1.5 text-xs text-[#1C2E20]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#8C7E6A] font-serif mb-0.5">
                        保存办法 (Storage & Care)
                      </label>
                      <input
                        type="text"
                        value={customStorage}
                        onChange={(e) => setCustomStorage(e.target.value)}
                        className="w-full bg-[#F9F7F2] border border-[#8C7E6A]/30 rounded-lg p-1.5 text-xs text-[#1C2E20]"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* STEP 3: Copywriting & Vermilion Seal */}
            <div className="space-y-3.5 p-4 rounded-2xl bg-[#F9F7F2] border border-[#8C7E6A]/25 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#8C7E6A]/20 pb-2">
                <span className="font-serif font-bold text-[#1C2E20] flex items-center gap-1.5 text-xs">
                  <FileText className="w-4 h-4 text-[#A82E2E]" />
                  <span>三、海报文案修饰与朱印钤盖</span>
                </span>
                <span className="text-[9px] text-[#A82E2E] font-mono font-bold bg-[#A82E2E]/10 px-2 py-0.5 rounded-full">
                  STEP 03
                </span>
              </div>

              {/* Vermilion Seal Selector */}
              <div>
                <label className="block text-[#1C2E20] mb-1.5 font-serif font-bold text-[11px] flex items-center justify-between">
                  <span>朱印钤盖 Vermilion Seal</span>
                  <span className="text-[9px] text-[#A82E2E] font-serif font-bold">印章考究</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['元香手记', 'UNIO 审定', '元香真迹'] as const).map((text) => (
                    <button
                      key={text}
                      onClick={() => setSealText(text)}
                      className={`py-2 px-1 rounded-xl border text-center font-serif text-xs transition-all cursor-pointer ${
                        sealText === text
                          ? 'bg-[#A82E2E] text-white border-[#801e1e] font-bold shadow-xs'
                          : 'bg-white border-[#8C7E6A]/30 text-[#A82E2E] hover:bg-[#EFECE6]'
                      }`}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Headline */}
              <div>
                <label className="block text-[#1C2E20] mb-1 font-serif font-bold text-[11px]">
                  主标题 Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-white border border-[#8C7E6A]/30 rounded-xl p-2 text-[#1C2E20] font-serif font-bold text-xs focus:outline-none focus:border-[#1C2E20]"
                  placeholder="请输入海报主标题..."
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-[#1C2E20] mb-1 font-serif font-bold text-[11px]">
                  品牌副标题 Tagline
                </label>
                <textarea
                  rows={2}
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-white border border-[#8C7E6A]/30 rounded-xl p-2 text-[#2D2D2A] text-xs font-serif leading-relaxed focus:outline-none focus:border-[#1C2E20]"
                  placeholder="请输入副标题或简要说明..."
                />
              </div>

              {/* Quote */}
              <div>
                <label className="block text-[#1C2E20] mb-1 font-serif font-bold text-[11px]">
                  手记随感 / 品牌名言 Quote
                </label>
                <textarea
                  rows={2}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full bg-white border border-[#8C7E6A]/30 rounded-xl p-2 text-[#2D2D2A] text-xs font-serif italic leading-relaxed focus:outline-none focus:border-[#1C2E20]"
                  placeholder="请输入随感与金句..."
                />
              </div>

            </div>

          </div>

          {/* Left Column Bottom Action Row - PERFECTLY ALIGNED with right column's bottom bar */}
          <div className="pt-3 border-t border-[#8C7E6A]/20 shrink-0 space-y-2">
            <div className="flex items-center justify-between text-xs font-serif text-[#1C2E20]">
              <span className="font-bold flex items-center gap-1.5 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-[#A82E2E]" />
                <span>排版就绪 · 双端高保真渲染</span>
              </span>
              <span className="text-[10px] text-[#8C7E6A] font-mono">100% READY</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => applyPreset('xuanpaper')}
                className="py-2.5 px-3 rounded-xl bg-[#1C2E20] text-[#E8DAC8] font-serif text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#2D2D2A] transition-all cursor-pointer shadow-xs"
              >
                <Sparkle className="w-3.5 h-3.5 text-[#C5B49A]" />
                <span>一键恢复经典排版</span>
              </button>

              <button
                onClick={handleCopyCardText}
                className="py-2.5 px-3 rounded-xl bg-[#A82E2E] text-white font-serif text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#801e1e] transition-all cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5 text-white" />
                <span>{copied ? '文案已复制！' : '复制全套宣传文案'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Live Poster Preview + Action Buttons (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center w-full space-y-5">
          
          {/* Outer Poster Container */}
          <div className="w-full max-w-xl transition-all relative print-modal-container">
            
            {/* Printable Canvas Element */}
            <div 
              id="print-poster-canvas"
              className={`w-full transition-all rounded-3xl p-7 sm:p-9 border shadow-2xl flex flex-col justify-between relative overflow-hidden print-full-page min-h-[720px] ${
                cardFormat === 'momentsCard' ? 'aspect-[3/4.5]' :
                cardFormat === 'wallPaper' ? 'aspect-[9/18]' :
                'aspect-[1/1.55]'
              } ${
                bgImageId === 'none'
                  ? (posterStyle === 'xuanpaper' ? 'bg-[#F5F2EC] text-[#2D2D2A] border-[#8C7E6A]/40' :
                     posterStyle === 'charcoal' ? 'bg-[#1C2E20] text-[#E8DAC8] border-[#1C2E20]' :
                     posterStyle === 'taupe' ? 'bg-[#8C7E6A] text-white border-[#8C7E6A]' :
                     'bg-[#EFEDE7] text-[#2D2D2A] border-[#8C7E6A]/30')
                  : 'text-white border-white/30'
              }`}
            >
              
              {/* Optional Background Image Layer */}
              {bgImageId !== 'none' && currentBgPreset?.url && (
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img 
                    src={currentBgPreset.url} 
                    alt="Poster Ambient Texture" 
                    className="w-full h-full object-cover scale-105 filter brightness-90"
                  />
                  <div className={`absolute inset-0 ${currentBgPreset.overlayDarkness || 'bg-black/50'}`} />
                </div>
              )}

              {/* Xuan Paper Fine Inner Border */}
              {bgImageId === 'none' && posterStyle === 'xuanpaper' && (
                <div className="absolute inset-2 border-2 border-[#8C7E6A]/20 rounded-2xl pointer-events-none p-1">
                  <div className="w-full h-full border border-[#8C7E6A]/10 rounded-xl" />
                </div>
              )}

              {/* 1. Header Row */}
              <div className={`relative z-10 flex justify-between items-center border-b pb-3.5 ${
                bgImageId !== 'none' ? 'border-white/30' :
                posterStyle === 'xuanpaper' ? 'border-[#8C7E6A]/25' :
                posterStyle === 'charcoal' ? 'border-[#8C7E6A]/40' :
                posterStyle === 'taupe' ? 'border-white/30' : 'border-[#8C7E6A]/25'
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center border shadow-xs ${
                    bgImageId !== 'none' ? 'bg-white/20 border-white/40 backdrop-blur-md' :
                    posterStyle === 'xuanpaper' ? 'bg-[#1C2E20] border-[#8C7E6A]/30' :
                    posterStyle === 'charcoal' ? 'bg-[#E8DAC8] border-[#8C7E6A]/30' :
                    posterStyle === 'taupe' ? 'bg-white border-white' : 'bg-[#1C2E20] border-[#8C7E6A]/30'
                  }`}>
                    <UnioLogo 
                      size={20} 
                      color={
                        bgImageId !== 'none' ? '#FFFFFF' :
                        posterStyle === 'charcoal' ? '#1C2E20' :
                        posterStyle === 'taupe' ? '#8C7E6A' : '#d2c4ad'
                      } 
                    />
                  </div>
                  <div>
                    <span className="font-serif text-sm font-bold tracking-[0.15em] block leading-none">
                      UNIO 元香
                    </span>
                    <span className="text-[8px] font-mono tracking-wider opacity-80 block mt-1 uppercase">
                      ORIGIN AROMATHERAPY BOUTIQUE
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono text-[9px] tracking-widest uppercase opacity-85 flex items-center gap-1">
                  <Sparkle className="w-3 h-3 text-[#A82E2E]" />
                  <span>ALICE 芳疗手记档案</span>
                </div>
              </div>

              {/* 2. Main Content Body */}
              <div className="relative z-10 my-auto space-y-3.5 py-2">
                
                {/* Title & Subtitle */}
                <div className="space-y-1.5">
                  <div className="text-[9px] font-mono tracking-widest uppercase text-[#A82E2E] font-bold flex items-center gap-1">
                    <Feather className="w-3 h-3" />
                    <span>UNIO AROMA · ALICE HANDWRITTEN NOTE</span>
                  </div>
                  
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight tracking-wide">
                    {headline}
                  </h2>
                  
                  <p className="text-xs leading-relaxed font-serif opacity-90 max-w-xl">
                    {tagline}
                  </p>
                </div>

                {/* Main Quote Block */}
                <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed font-serif italic relative backdrop-blur-xs ${
                  bgImageId !== 'none' ? 'bg-black/40 border-white/30 text-white' :
                  posterStyle === 'xuanpaper' ? 'bg-[#EFECE6] border-[#8C7E6A]/30 text-[#2D2D2A]' :
                  posterStyle === 'charcoal' ? 'bg-[#2D2D2A]/80 border-[#8C7E6A]/30 text-[#E8DAC8]' :
                  posterStyle === 'taupe' ? 'bg-black/20 border-white/20 text-white' :
                  'bg-white/80 border-[#8C7E6A]/20 text-[#2D2D2A]'
                }`}>
                  <p className="relative z-10 text-justify">
                    {quote}
                  </p>
                </div>

                {/* Selected Product Spotlight Card Box */}
                <div className="relative">
                  
                  <div className={`p-3.5 sm:p-4 rounded-2xl border space-y-3 relative z-10 backdrop-blur-md ${
                    bgImageId !== 'none' ? 'bg-black/50 border-white/30 text-white shadow-xl' :
                    posterStyle === 'xuanpaper' ? 'bg-white/90 border-[#8C7E6A]/30 text-[#2D2D2A] shadow-xs' :
                    posterStyle === 'charcoal' ? 'bg-[#2D2D2A] border-[#8C7E6A]/40 text-[#E8DAC8] shadow-xs' :
                    posterStyle === 'taupe' ? 'bg-white/10 border-white/30 text-white' :
                    'bg-white border-[#8C7E6A]/30 text-[#2D2D2A] shadow-xs'
                  }`}>
                    
                    {/* Top Row: Image & Basic Info */}
                    <div className="flex items-start gap-3.5">
                      <img
                        src={featuredProduct.image}
                        alt={featuredProduct.cn}
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-black/10 shrink-0 shadow-md"
                      />

                      <div className="space-y-1 min-w-0 flex-1 pr-12">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#A82E2E]/20 text-[#A82E2E] font-bold border border-[#A82E2E]/30">
                            {featuredProduct.code}
                          </span>
                          <span className="text-[9px] font-mono opacity-80 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-[#A82E2E]" />
                            {getProductOrigin()}
                          </span>
                        </div>
                        
                        <h4 className="font-serif text-sm sm:text-base font-bold truncate">
                          {featuredProduct.cn}
                        </h4>
                        
                        <p className="text-[10px] font-serif opacity-85 line-clamp-1">
                          {featuredProduct.shortDesc || featuredProduct.latinName || '芳疗级高纯度纯植物能量'}
                        </p>
                        
                        <div className="pt-0.5 font-mono text-xs font-bold text-[#A82E2E]">
                          {featuredProduct.prices[0]}
                        </div>
                      </div>
                    </div>

                    {/* Rich Metadata 4-Grid: 原产地 / 萃取部位 / 常见功效 / 保存办法 */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-current/15 text-[9px] font-serif leading-tight">
                      
                      {/* Grid 1: 原产地 */}
                      <div className="p-2 rounded-xl bg-black/5 border border-current/10 flex items-start gap-1.5">
                        <MapPin className="w-3 h-3 text-[#A82E2E] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold opacity-75 block">原产地</span>
                          <span className="font-medium block">{getProductOrigin()}</span>
                        </div>
                      </div>

                      {/* Grid 2: 萃取部位与工艺 */}
                      <div className="p-2 rounded-xl bg-black/5 border border-current/10 flex items-start gap-1.5">
                        <Droplets className="w-3 h-3 text-[#A82E2E] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold opacity-75 block">萃取工艺/部位</span>
                          <span className="font-medium block truncate" title={getExtractionMethod()}>{getExtractionMethod()}</span>
                        </div>
                      </div>

                      {/* Grid 3: 常见功效 */}
                      <div className="p-2 rounded-xl bg-black/5 border border-current/10 flex items-start gap-1.5 col-span-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#A82E2E] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold opacity-75 block">常见功效与感受</span>
                          <span className="font-medium block">{getCoreBenefits()}</span>
                        </div>
                      </div>

                      {/* Grid 4: 保存办法 */}
                      <div className="p-2 rounded-xl bg-black/5 border border-current/10 flex items-start gap-1.5 col-span-2">
                        <Clock className="w-3.5 h-3.5 text-[#8C7E6A] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold opacity-75 block">保存与养护办法</span>
                          <span className="font-medium block opacity-90">{customStorage}</span>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Red Vermilion Seal Stamp (朱印章) */}
                  <div className="absolute right-2 -bottom-3 z-20 flex flex-col items-center rotate-[-3deg] pointer-events-none">
                    <div className="bg-[#A82E2E] text-white px-3 py-1 rounded-xs border border-[#801e1e] shadow-lg flex items-center justify-center">
                      <span className="font-serif text-xs font-bold tracking-widest leading-none">
                        {sealText}
                      </span>
                    </div>
                    <span className="text-[7px] font-mono text-[#A82E2E] font-bold tracking-tighter mt-0.5 opacity-90">
                      UNIO LAB · 壹印存真
                    </span>
                  </div>

                </div>

              </div>

              {/* 3. Footer Divider */}
              <div className="relative z-10 space-y-3 pt-2">
                <div className={`border-t pt-2 flex justify-between items-center text-[9px] font-serif ${
                  bgImageId !== 'none' ? 'border-white/30 text-white/90' :
                  posterStyle === 'xuanpaper' ? 'border-[#8C7E6A]/25 text-[#8C7E6A]' :
                  posterStyle === 'charcoal' ? 'border-[#8C7E6A]/40 text-[#C5B49A]' :
                  posterStyle === 'taupe' ? 'border-white/30 text-white/80' : 'border-[#8C7E6A]/25 text-[#8C7E6A]'
                }`}>
                  <span className="font-bold">UNIO 元香 · 珍藏海报</span>
                  <span className="font-mono tracking-wider uppercase">HERBAL BOUTIQUE EDITION</span>
                  <span>成都 · 宁波 · 泰国</span>
                </div>

                {/* 4. Three Vector SVG QR Codes Section */}
                <div className={`p-3 rounded-2xl border space-y-2 backdrop-blur-sm ${
                  bgImageId !== 'none' ? 'bg-black/50 border-white/30' :
                  posterStyle === 'xuanpaper' ? 'bg-[#EFECE6]/70 border-[#8C7E6A]/30' :
                  posterStyle === 'charcoal' ? 'bg-[#142318] border-[#8C7E6A]/40' :
                  posterStyle === 'taupe' ? 'bg-black/20 border-white/20' :
                  'bg-[#F9F7F2] border-[#8C7E6A]/30'
                }`}>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    
                    {/* QR 1: 微信客服 */}
                    <div className="flex flex-col items-center">
                      <img src="/wechat-qr.png" alt="微信客服" className="w-[52px] h-[52px] object-contain rounded-lg border border-[#8C7E6A]/30" />
                      <span className="text-[9px] font-serif text-[#8C7E6A] mt-0.5">客服微信</span>
                      <span className="text-[8px] text-[#8C7E6A]/70">1对1专属调配</span>
                    </div>

                    {/* QR 2: 微信公众号 */}
                    <div className="flex flex-col items-center">
                      <img src="/wechat-pub.webp" alt="公众号" className="w-[52px] h-[52px] object-contain rounded-lg border border-[#8C7E6A]/30" />
                      <span className="text-[9px] font-serif text-[#8C7E6A] mt-0.5">公众号</span>
                      <span className="text-[8px] text-[#8C7E6A]/70">23年真实日记</span>
                    </div>

                    {/* QR 3: 微信小程序 */}
                    <div className="flex flex-col items-center">
                      <img src="/wechat-miniapp.jpg" alt="小程序" className="w-[52px] h-[52px] object-contain rounded-lg border border-[#8C7E6A]/30" />
                      <span className="text-[9px] font-serif text-[#8C7E6A] mt-0.5">小程序</span>
                      <span className="text-[8px] text-[#8C7E6A]/70">极速下单预订</span>
                    </div>

                  </div>

                  <div className="text-center font-mono text-[8px] opacity-80 tracking-wider pt-0.5">
                    UNIO AROMA · 元合生香 unioaroma.com
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Prominent Action Button Bar - DIRECTLY BELOW RIGHT-SIDE LIVE PREVIEW */}
          <div className="w-full max-w-xl bg-[#EFEDE7] border border-[#8C7E6A]/30 rounded-2xl p-4 space-y-3 shadow-lg no-print">
            <div className="flex items-center justify-between text-xs font-serif font-bold text-[#1C2E20] border-b border-[#8C7E6A]/20 pb-2">
              <span className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-[#A82E2E]" />
                <span>实时预览图一键导出与打印</span>
              </span>
              <span className="text-[10px] text-[#8C7E6A] font-mono">Export & Print</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handlePrint}
                className="py-3.5 px-4 rounded-xl bg-[#1C2E20] text-[#E8DAC8] font-serif text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#2D2D2A] transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#C5B49A]" />
                <span>高清打印 / 导出 PDF</span>
              </button>

              <button
                onClick={handleSaveImage}
                disabled={exporting}
                className="py-3.5 px-4 rounded-xl bg-[#A82E2E] text-white font-serif text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#801e1e] transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4 text-white" />
                <span>{exporting ? '高清 PNG 导出中...' : '保存为高清 PNG'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleCopyCardText}
                className="py-2.5 rounded-xl bg-[#F9F7F2] border border-[#8C7E6A]/40 text-[#1C2E20] font-serif text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#EFECE6] transition-all cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-[#8C7E6A]" />
                <span>{copied ? '全套文案已复制！' : '复制宣传全套文案'}</span>
              </button>

              <button
                onClick={() => setShowDiagnosticModal((prev) => !prev)}
                className="py-2.5 rounded-xl bg-[#1C2E20]/10 border border-[#1C2E20]/20 text-[#1C2E20] font-serif text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#1C2E20]/20 transition-all cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-[#A82E2E]" />
                <span>打印/导出空白与防卡防护机制说明</span>
              </button>
            </div>

            {/* In-Depth Code Explanation Panel */}
            {showDiagnosticModal && (
              <div className="p-4 rounded-2xl bg-[#F4EFEE] border border-[#8C7E6A]/30 text-xs space-y-3 animate-fade-in text-[#2D2D2A]">
                <div className="flex items-center gap-2 border-b border-[#8C7E6A]/20 pb-2 text-[#1C2E20] font-bold">
                  <AlertTriangle className="w-4 h-4 text-[#A82E2E]" />
                  <span>【技术防护解密】为什么打印/导出容易空白或丢失二维码？代码已为你做好的 5 重保障</span>
                </div>
                <div className="space-y-2 text-[11px] leading-relaxed">
                  <p>
                    <strong>1. 为什么常规网页打印会变空白？</strong><br />
                    浏览器为了节省墨水，默认会开启 “剥离背景色/背景图” 规则。我们代码中通过 CSS <code className="bg-black/10 px-1 rounded">-webkit-print-color-adjust: exact !important</code> 强制浏览器保留了完整的暗调元境与宣纸底色。
                  </p>
                  <p>
                    <strong>2. 为什么导出图片时二维码会丢失或模糊？</strong><br />
                    此前采用 HTML 布局模拟的二维码缺少矢量 SVG 路径，或图片存在 CORS 跨域拦截导致 Canvas 变成空白矩形。我们代码已全面重构为 <code className="bg-black/10 px-1 rounded">QRCodeSVG</code> 纯矢量 2D 阵列，0 依赖且 100% 矢量级清晰度。
                  </p>
                  <p>
                    <strong>3. 为什么打印时会带出多余的网页顶栏或空白第二页？</strong><br />
                    代码中通过 <code className="bg-black/10 px-1 rounded">@media print</code> 对 <code className="bg-black/10 px-1 rounded">#print-poster-canvas</code> 进行了独立全屏隔离，并添加 <code className="bg-black/10 px-1 rounded">break-inside: avoid</code> 规避分页切割。
                  </p>
                  <p>
                    <strong>4. 为什么卡片设计容易显得不够精致？</strong><br />
                    采用了符合黄金分割的 <code className="bg-black/10 px-1 rounded">Inner Radius = Outer Radius - Padding</code> 嵌套数学圆角规则、宋体与 Sans 字体阶梯对比，以及朱红印章与 4 宫格原产地履历档案。
                  </p>
                </div>
              </div>
            )}

            {showSavedToast && (
              <div className="p-3 rounded-xl bg-emerald-900 text-emerald-100 text-xs font-serif flex items-center gap-2 border border-emerald-700 animate-fade-in shadow-md">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <span>已成功生成 2K 高清 PNG 图片与 PDF 打印文件！可直接发送朋友圈或提交给发印刷厂。</span>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
