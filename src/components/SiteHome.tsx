import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Grid, 
  Globe, 
  Bot, 
  ShieldCheck, 
  Compass, 
  Droplets, 
  Wind, 
  Leaf, 
  Flame, 
  Award,
  ChevronRight,
  Printer
} from 'lucide-react';
import { SERIES_META } from '../data/catalogData';
import { fetchProductsFromSupabase } from '../data/siteDataService';
import { ProductItem } from '../types';
import { UnioLogo } from './UnioLogo';
import { 
  YEAR_RANGE_TEXT, 
  CHINESE_YEAR_JOURNEY, 
  YEARS_OF_JOURNEY, 
  FOUNDING_YEAR, 
  CURRENT_YEAR 
} from '../utils/brandConstants';

interface SiteHomeProps {
  onSelectProduct: (product: ProductItem) => void;
  onNavigateTab: (tab: string) => void;
}

export const SiteHome: React.FC<SiteHomeProps> = ({ onSelectProduct, onNavigateTab }) => {
  // Featured top products for home display
  const [featuredProducts, setFeaturedProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchProductsFromSupabase().then((products) => {
      if (mounted) setFeaturedProducts(products.slice(0, 8));
    });
    return () => { mounted = false; };
  }, []);

  // Parallax scroll controls for Hero section
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0px", "50px"]);

  return (
    <div className="w-full space-y-12 sm:space-y-16 pb-12 overflow-hidden">
      
      {/* 1. HERO BANNER - High-End Minimalist Botanical Sanctuary with Frosted Glass & Olive Gold Aesthetic */}
      <section 
        ref={heroRef}
        className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center bg-[#F5EFE6] text-[#2D2D2A] px-4 py-16 sm:py-24 overflow-hidden border-b border-[#D2C4AD]/40"
      >
        
        {/* Parallax Background - Warm Organic Botanical Scene (High Clarity & Vivid Visibility) */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center opacity-85 sm:opacity-90 filter contrast-105 saturate-110 transition-transform ease-out pointer-events-none will-change-transform"
          style={{ 
            y: yBg, 
            scale: scaleBg,
            backgroundImage: `url('https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=2000')` 
          }}
        />
        
        {/* Ambient Soft Vignette Lighting - Subtle so photo underneath is clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5EFE6]/30 via-transparent to-[#F5EFE6]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,239,230,0.3),transparent_75%)] pointer-events-none" />

        {/* Content Container with Frosted Glass (毛玻璃) Backdrop for Ultra Readability & High Aesthetic */}
        <motion.div 
          style={{ y: yContent, opacity: opacityContent }}
          className="relative z-20 max-w-3xl mx-auto text-center space-y-8 sm:space-y-10 backdrop-blur-2xl bg-[#F5EFE6]/55 sm:bg-[#F5EFE6]/50 border border-white/80 rounded-3xl p-6 sm:p-12 shadow-[0_25px_60px_rgba(28,46,32,0.12)]"
        >
          
          {/* Central Minimalist Brand Logo & Tagline */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1C2E20]/90 backdrop-blur-md border-2 border-[#C5B49A]/80 p-4 flex items-center justify-center shadow-2xl relative group hover:scale-105 transition-transform duration-500">
              <UnioLogo size={52} color="#E8DAC8" animatedBreathing={true} />
            </div>

            <div className="flex items-center gap-3 whitespace-nowrap">
              <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent via-[#8C7E6A]/50 to-transparent" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] sm:tracking-[0.45em] text-[#8C7E6A] uppercase font-semibold whitespace-nowrap">
                UNIO AROMA · 始于 {FOUNDING_YEAR}
              </span>
              <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent via-[#8C7E6A]/50 to-transparent" />
            </div>
          </motion.div>

          {/* Ultra-Minimalist Editorial Hero Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl font-normal leading-[1.12] tracking-tight text-[#1C2E20]">
              <span className="whitespace-nowrap">UNIO&nbsp;元香</span>
              <span className="text-[#8C7E6A] font-light italic text-2xl sm:text-5xl block sm:inline mt-2 sm:mt-0 font-serif"> · 世界芳疗</span>
            </h1>
            <p className="max-w-xl mx-auto text-base sm:text-2xl text-[#2D2D2A]/85 font-serif italic tracking-wide leading-relaxed pt-2">
              “从极境撷取芳香，因世界元于一息。”
            </p>
          </motion.div>

          {/* Action CTAs with Frosted Glass Pill Styling */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4"
          >
            <button
              onClick={() => onNavigateTab('collection')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1C2E20]/90 backdrop-blur-md text-[#E8DAC8] font-sans text-xs tracking-widest font-semibold hover:bg-[#1C2E20] transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105 group border border-[#C5B49A]/40"
            >
              <span>探索 219 款全系作品 <span className="font-mono text-[10px] opacity-75 font-normal ml-0.5">/ Collection</span></span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C5B49A]" />
            </button>

            <button
              onClick={() => onNavigateTab('ai-consult')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#E8DAC8]/70 backdrop-blur-md border border-[#8C7E6A]/50 text-[#1C2E20] hover:bg-[#E8DAC8] font-sans text-xs tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-[#8C7E6A]" />
              <span>AI 一人一方 <span className="font-mono text-[10px] text-[#8C7E6A] ml-0.5">/ Prescription</span></span>
            </button>

            <button
              onClick={() => onNavigateTab('atlas')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/50 backdrop-blur-md border border-[#8C7E6A]/40 text-[#2D2D2A] hover:bg-white/90 font-sans text-xs tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4 text-[#8C7E6A]" />
              <span>寻香图谱 <span className="font-mono text-[10px] text-[#8C7E6A] ml-0.5">/ Scent Atlas</span></span>
            </button>
          </motion.div>

        </motion.div>
      </section>

      {/* 2. CORE FOUR SERIES SHOWCASE (四大系列: 元 · 合 · 生 · 香) */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs tracking-[0.35em] text-[#8C7E6A] uppercase font-mono font-medium block">
            THE FOUR ARCHITECTURAL SERIES / 四大核心体系
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2D2A]">
            UNIO 元香四大作品系列 <span className="font-serif italic font-light text-xl text-[#8C7E6A] block sm:inline">/ Four Core Collections</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#2D2D2A]/65 max-w-xl mx-auto font-sans leading-relaxed">
            从植物单方到身心灵协同复方，从低温纯露到高定空间扩香器物。
            <span className="block text-[11px] text-[#8C7E6A] font-mono tracking-wide mt-0.5">
              From pure botanical singles to synergistic blends, organic hydrosols, and ceramic diffusers.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Series 1: 元系 */}
          <div 
            onClick={() => onNavigateTab('collection')}
            className="group relative rounded-2xl overflow-hidden bg-[#1C2E20] border border-[#C5B49A]/30 hover:border-[#C5B49A]/70 transition-all cursor-pointer p-6 min-h-[380px] flex flex-col justify-between shadow-lg hover:shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              style={{ backgroundImage: `url('${SERIES_META.yuan.bannerImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C2E20]/95 via-[#1C2E20]/60 to-[#1C2E20]/40 pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="w-10 h-10 rounded-full bg-[#E8DAC8]/20 border border-[#E8DAC8]/50 flex items-center justify-center font-serif text-lg text-[#E8DAC8] font-bold">
                元
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#E8DAC8] bg-[#1C2E20]/80 px-2 py-0.5 rounded border border-[#C5B49A]/30">
                118 款作品
              </span>
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5B49A] block font-mono">YUAN SERIES</span>
              <h3 className="font-serif text-2xl text-[#FAF8F5] font-normal">单方精油 & 基础油</h3>
              <p className="text-xs text-[#D5CBB9] leading-relaxed line-clamp-3 font-light">
                全球 28 国原生产地直接封瓶，五行分系（金木水火土），还原最纯粹的植物本源分子。
              </p>
              <div className="pt-2 flex items-center gap-1 text-xs text-[#E8DAC8] font-mono group-hover:translate-x-1 transition-transform">
                <span>浏览元系档案</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5B49A]" />
              </div>
            </div>
          </div>

          {/* Series 2: 合系 */}
          <div 
            onClick={() => onNavigateTab('collection')}
            className="group relative rounded-2xl overflow-hidden bg-[#1C2E20] border border-[#C5B49A]/30 hover:border-[#C5B49A]/70 transition-all cursor-pointer p-6 min-h-[380px] flex flex-col justify-between shadow-lg hover:shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              style={{ backgroundImage: `url('${SERIES_META.he.bannerImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C2E20]/95 via-[#1C2E20]/60 to-[#1C2E20]/40 pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="w-10 h-10 rounded-full bg-[#E8DAC8]/20 border border-[#E8DAC8]/50 flex items-center justify-center font-serif text-lg text-[#E8DAC8] font-bold">
                合
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#E8DAC8] bg-[#1C2E20]/80 px-2 py-0.5 rounded border border-[#C5B49A]/30">
                50 款作品
              </span>
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5B49A] block font-mono">HE SERIES</span>
              <h3 className="font-serif text-2xl text-[#FAF8F5] font-normal">身心灵协同复方</h3>
              <p className="text-xs text-[#D5CBB9] leading-relaxed line-clamp-3 font-light">
                针对睡眠、情绪、呼吸与深层能量的协同配比，构建安稳凝神的身心平衡场。
              </p>
              <div className="pt-2 flex items-center gap-1 text-xs text-[#E8DAC8] font-mono group-hover:translate-x-1 transition-transform">
                <span>浏览合系档案</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5B49A]" />
              </div>
            </div>
          </div>

          {/* Series 3: 生系 */}
          <div 
            onClick={() => onNavigateTab('collection')}
            className="group relative rounded-2xl overflow-hidden bg-[#1C2E20] border border-[#C5B49A]/30 hover:border-[#C5B49A]/70 transition-all cursor-pointer p-6 min-h-[380px] flex flex-col justify-between shadow-lg hover:shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              style={{ backgroundImage: `url('${SERIES_META.sheng.bannerImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C2E20]/95 via-[#1C2E20]/60 to-[#1C2E20]/40 pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="w-10 h-10 rounded-full bg-[#E8DAC8]/20 border border-[#E8DAC8]/50 flex items-center justify-center font-serif text-lg text-[#E8DAC8] font-bold">
                生
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#E8DAC8] bg-[#1C2E20]/80 px-2 py-0.5 rounded border border-[#C5B49A]/30">
                41 款作品
              </span>
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5B49A] block font-mono">SHENG SERIES</span>
              <h3 className="font-serif text-2xl text-[#FAF8F5] font-normal">有机植物纯露水相</h3>
              <p className="text-xs text-[#D5CBB9] leading-relaxed line-clamp-3 font-light">
                低温慢速水蒸气蒸馏，水相保留溶解于植物细胞水中的全光谱活性与温和补水。
              </p>
              <div className="pt-2 flex items-center gap-1 text-[#E8DAC8] text-xs font-mono group-hover:translate-x-1 transition-transform">
                <span>浏览生系档案</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5B49A]" />
              </div>
            </div>
          </div>

          {/* Series 4: 香系 */}
          <div 
            onClick={() => onNavigateTab('collection')}
            className="group relative rounded-2xl overflow-hidden bg-[#1C2E20] border border-[#C5B49A]/30 hover:border-[#C5B49A]/70 transition-all cursor-pointer p-6 min-h-[380px] flex flex-col justify-between shadow-lg hover:shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              style={{ backgroundImage: `url('${SERIES_META.jing.bannerImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C2E20]/95 via-[#1C2E20]/60 to-[#1C2E20]/40 pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="w-10 h-10 rounded-full bg-[#E8DAC8]/20 border border-[#E8DAC8]/50 flex items-center justify-center font-serif text-lg text-[#E8DAC8] font-bold">
                香
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#E8DAC8] bg-[#1C2E20]/80 px-2 py-0.5 rounded border border-[#C5B49A]/30">
                10 款作品
              </span>
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5B49A] block font-mono">JING SERIES</span>
              <h3 className="font-serif text-2xl text-[#FAF8F5] font-normal">空间器物 & 扩香</h3>
              <p className="text-xs text-[#D5CBB9] leading-relaxed line-clamp-3 font-light">
                无热无水冷喷精油扩香仪、黑岩香炉与空间香氛，为酒店与家居营造高定场域。
              </p>
              <div className="pt-2 flex items-center gap-1 text-[#E8DAC8] text-xs font-mono group-hover:translate-x-1 transition-transform">
                <span>浏览香系档案</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5B49A]" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. AI SCENT CONSULTANT SPOTLIGHT (一人一方 · AI 调配引擎) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1C2E20] via-[#233827] to-[#17251B] border border-[#C5B49A]/40 p-8 md:p-12 text-[#FAF8F5] shadow-2xl">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5B49A]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DAC8]/15 border border-[#C5B49A]/40 text-xs text-[#E8DAC8] font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#C5B49A]" />
                <span>{CHINESE_YEAR_JOURNEY}临床档案 + 智能推理算法</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-normal leading-tight">
                AI 智能问诊 · 一人一方调配引擎
              </h2>

              <p className="text-xs sm:text-sm text-[#D5CBB9] leading-relaxed font-light">
                基于 UNIO 元香 {CHINESE_YEAR_JOURNEY}真实客户问诊记录与植物药理数据库。输入您的年龄、作息、肤质、睡眠与情绪困扰，系统将实时计算生成独一无二的专属滴数调配方与使用仪式。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-2">
                <div className="p-3 rounded-xl bg-[#17251B]/70 border border-[#C5B49A]/30">
                  <span className="text-[#E8DAC8] font-bold block mb-0.5">精准精准匹配</span>
                  <span className="text-[10px] text-[#D5CBB9]">复方/单方协同建议</span>
                </div>
                <div className="p-3 rounded-xl bg-[#17251B]/70 border border-[#C5B49A]/30">
                  <span className="text-[#E8DAC8] font-bold block mb-0.5">稀释安全指导</span>
                  <span className="text-[10px] text-[#D5CBB9]">基础油比例与禁用提示</span>
                </div>
                <div className="p-3 rounded-xl bg-[#17251B]/70 border border-[#C5B49A]/30">
                  <span className="text-[#E8DAC8] font-bold block mb-0.5">专属使用仪式</span>
                  <span className="text-[10px] text-[#D5CBB9]">吸吸法/按摩/扩香建议</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateTab('ai-consult')}
                  className="px-6 py-3 rounded-full bg-[#E8DAC8] text-[#1C2E20] font-sans text-xs tracking-widest font-bold hover:bg-[#FAF8F5] transition-all flex items-center gap-2 shadow-lg hover:scale-105"
                >
                  <span>立即体验 AI 问诊</span>
                  <ArrowRight className="w-4 h-4 text-[#1C2E20]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-black/60 border border-[#d2c4ad]/30 p-6 backdrop-blur-md space-y-4 shadow-2xl">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <UnioLogo size={20} color="#d2c4ad" />
                    <span className="font-serif text-xs text-[#d2c4ad]">FORMULA DEMO</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#b4aca2]">100% PERSONALIZED</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-[10px] text-[#b4aca2] uppercase block">配方主题</span>
                    <span className="text-[#f6f2eb] font-bold">深宵降噪 · 沉香与真正薰衣草</span>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-[#b4aca2]">
                      <span>YU02 真正薰衣草 (法国)</span>
                      <span className="text-[#d2c4ad]">3 滴</span>
                    </div>
                    <div className="flex justify-between text-[#b4aca2]">
                      <span>HE01 深眠复方精油</span>
                      <span className="text-[#d2c4ad]">2 滴</span>
                    </div>
                    <div className="flex justify-between text-[#b4aca2]">
                      <span>YU15 荷荷巴基础油</span>
                      <span className="text-[#d2c4ad]">10 ml</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 text-[10px] text-[#b4aca2] font-mono flex items-center justify-between">
                  <span>安全批签: COA-2026-089</span>
                  <span className="text-[#d2c4ad]">已通过禁忌核查</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. BRAND BOOK & ARCHIVE ENTRANCE SECTION (品牌手册 纪念专区) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-[#EFEDE7] border border-[#2D2D2A]/15 p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center shadow-sm">
          
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D2D2A] text-[#F9F7F2] text-[10px] sm:text-[11px] font-mono tracking-widest uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>BRAND ARCHIVE BOOK / {YEAR_RANGE_TEXT}</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#2D2D2A]">
              UNIO AROMA 40 页品牌全景手册 & 采购白皮书
            </h3>

            <p className="text-xs sm:text-sm text-[#2D2D2A]/70 leading-relaxed font-sans">
              完整收录品牌 {YEARS_OF_JOURNEY} 年创立历程、创始人 Alice 刘元红纪念手稿、四大作品全景检索表、全球原生产地地图及 B2B 商业空间扩香指南。支持在线高分辨率翻阅。
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs font-mono text-[#8C7E6A] pt-1">
              <span>✓ 40 页高清精装画册</span>
              <span>✓ 219 款作品完整价格表</span>
              <span>✓ 创始人纪念特辑</span>
              <span>✓ 商业空间定制规范</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
            <button
              onClick={() => onNavigateTab('story')}
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-2xl bg-[#0c120e] text-[#d2c4ad] font-sans text-xs tracking-widest font-semibold hover:bg-[#1a241e] transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-105"
            >
              <BookOpen className="w-4 h-4 text-[#d2c4ad]" />
              <span>翻阅 40 页品牌手册</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. FEATURED PRODUCTS SPOTLIGHT (明星单品展台) */}
      <section className="max-w-7xl mx-auto px-4 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#2D2D2A]/10 pb-4">
          <div>
            <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#8C7E6A] uppercase font-sans font-medium block">
              FEATURED BOTANICAL WORKS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#2D2D2A]">
              明星作品展台
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('collection')}
            className="text-xs font-mono text-[#8C7E6A] hover:text-[#2D2D2A] transition-colors flex items-center gap-1 self-start sm:self-auto"
          >
            <span>查看完整 219 款目录</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.code}
              onClick={() => onSelectProduct(product)}
              className="group bg-[#EFEDE7] rounded-2xl p-3 sm:p-4 border border-[#2D2D2A]/10 hover:border-[#8C7E6A] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2 sm:space-y-3">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black/5">
                  <img
                    src={product.image}
                    alt={product.cn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 sm:px-2 py-0.5 rounded-full bg-black/70 text-[#d2c4ad] font-mono text-[9px] sm:text-[10px]">
                    {product.code}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] sm:text-[10px] text-[#8C7E6A] font-mono uppercase truncate max-w-[70%]">{product.subgroup} · {product.origin}</span>
                    <span className="text-[9px] sm:text-[10px] text-[#2D2D2A]/60 font-mono">{product.prices[0]}</span>
                  </div>
                  <h4 className="font-serif text-sm sm:text-lg text-[#2D2D2A] group-hover:text-[#8C7E6A] transition-colors font-semibold truncate">
                    {product.cn}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[#2D2D2A]/70 line-clamp-2 mt-0.5 font-sans">
                    {product.shortDesc}
                  </p>
                </div>
              </div>

              <div className="pt-2 sm:pt-4 mt-2 border-t border-[#2D2D2A]/10 flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#8C7E6A]">
                <span>COA 归档</span>
                <span className="group-hover:translate-x-1 transition-transform">详情 →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FOUNDER TRIBUTE & BRAND HERITAGE SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-[#1C2E20] text-[#FAF8F5] border border-[#C5B49A]/40 p-6 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center shadow-2xl">
          
          <div className="md:col-span-5 space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#C5B49A]/30 relative shadow-xl">
              <img
                src="/founder-memorial.jpg"
                alt="Founder Memorial"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C2E20]/90 via-[#1C2E20]/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-[10px] tracking-[0.25em] text-[#E8DAC8] font-mono block">FOUNDER MEMORIAL ARCHIVE</span>
                <span className="font-serif text-base sm:text-lg text-[#FAF8F5]">敬 品牌创始人 Alice-刘元红</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4 sm:space-y-5">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#C5B49A] uppercase font-mono block">
              HERITAGE & CLINICAL RECORD / {YEAR_RANGE_TEXT}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF8F5] font-normal leading-tight">
              “岁岁闻香，岁岁念你”
            </h2>
            <p className="text-xs sm:text-sm text-[#D5CBB9] leading-relaxed font-light">
              UNIO 元香由创始人 Alice 刘元红女士创立于 {FOUNDING_YEAR} 年。从最早的单方精油手记，到今天跨越 50 国原生产地的 219 款芳疗档案。松针与绿意蔓延，清冽瓶身盛载岁月沉淀。闻香见人，念念不忘。
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2 font-mono text-center text-xs border-t border-[#C5B49A]/20">
              <div>
                <span className="text-[#E8DAC8] font-bold block">成都据点</span>
                <span className="text-[10px] text-[#D5CBB9]">西南寻香工坊</span>
              </div>
              <div>
                <span className="text-[#E8DAC8] font-bold block">宁波据点</span>
                <span className="text-[10px] text-[#b4aca2]">海风芳疗观察站</span>
              </div>
              <div>
                <span className="text-[#E8DAC8] font-bold block">芭提雅据点</span>
                <span className="text-[10px] text-[#D5CBB9]">东南亚热带基地</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. GLOBAL FOOTPRINT & COA QUALITY GUARANTEE */}
      <section className="max-w-7xl mx-auto px-4 text-center space-y-6">
        <div className="p-8 rounded-2xl bg-[#EFEDE7] border border-[#2D2D2A]/10 space-y-4">
          <div className="flex justify-center items-center gap-2 text-[#8C7E6A]">
            <Award className="w-5 h-5" />
            <span className="text-xs font-serif font-bold uppercase tracking-widest">
              LABORATORY QUALITY & SAFETY GUARANTEE
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-[#2D2D2A]">
            全系 100% 实验室级 COA & MSDS 检验批签归档
          </h3>
          <p className="text-xs text-[#2D2D2A]/70 max-w-2xl mx-auto font-sans">
            每批次精油均通过气相色谱-质谱联用 (GC-MS) 检测，确保零农残、无重金属、无化学合成添香。产地溯源码实时开放查询。
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => onNavigateTab('atlas')}
              className="px-5 py-2.5 rounded-full bg-[#2D2D2A] text-[#F9F7F2] text-xs font-mono tracking-wider hover:bg-[#8C7E6A] transition-colors"
            >
              查看全球 28 国原生产地地图 →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
