import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Layers, 
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
import { ScentParticlesCanvas } from './ScentParticlesCanvas';

interface SiteHomeProps {
  onSelectProduct: (product: ProductItem) => void;
  onNavigateTab: (tab: string) => void;
}

export const SiteHome: React.FC<SiteHomeProps> = ({ onSelectProduct, onNavigateTab }) => {
  // Featured top products (loaded from Supabase)
  const [featuredProducts, setFeaturedProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchProductsFromSupabase().then((products) => {
      if (mounted) setFeaturedProducts(products.slice(0, 8));
    });
    return () => { mounted = false; };
  }, []);
  const [particleTheme, setParticleTheme] = useState<'amber' | 'rose' | 'forest'>('amber');

  return (
    <div className="w-full space-y-16 pb-12 overflow-hidden">
      
      {/* 1. HERO BANNER - High-End Luxury Dark Atmosphere with Interactive Scent Particles Canvas & Breathing Logo */}
      <section className="relative min-h-[88vh] flex items-center justify-center bg-[#0c120e] text-[#f6f2eb] px-4 py-20 overflow-hidden border-b border-[#d2c4ad]/20">
        
        {/* Interactive Floating Botanical / Scent Particles Canvas */}
        <ScentParticlesCanvas particleCount={60} colorTheme={particleTheme} interactive={true} />

        {/* Wavy Ambient Dark 3D Background Mask */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity filter brightness-90 contrast-125 transition-all duration-1000 scale-105 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1800')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c120e]/80 via-[#0c120e]/50 to-[#0c120e] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(210,196,173,0.15),transparent_70%)] pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Central Metallic 4-Petal Emblem Icon with Breathing Glow Halo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="relative group cursor-pointer">
              {/* Pulsing Breathing Light Ring Behind Logo */}
              <div className="absolute -inset-3 rounded-full bg-[#d2c4ad]/20 blur-xl animate-pulse scale-125" />
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-[#1a241e] via-[#0c120e] to-black border border-[#d2c4ad]/40 p-4 flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative group-hover:border-[#d2c4ad] transition-all">
                <UnioLogo size={68} color="#e5d8c5" animatedBreathing={true} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#d2c4ad]/40" />
              <span className="text-xs font-mono tracking-[0.35em] text-[#d2c4ad] uppercase font-light">
                UNIO AROMA · 始于 2003
              </span>
              <span className="w-8 h-[1px] bg-[#d2c4ad]/40" />
            </div>

            {/* Interactive Scent Atmosphere Aura Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-[10px] font-mono text-[#b4aca2] mt-1">
              <span className="px-2 text-[#d2c4ad]/70">香气气场粒子:</span>
              <button
                onClick={() => setParticleTheme('amber')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  particleTheme === 'amber' ? 'bg-[#d2c4ad] text-[#0c120e] font-bold shadow-sm' : 'hover:text-[#f6f2eb]'
                }`}
              >
                Amber 琥珀光尘
              </button>
              <button
                onClick={() => setParticleTheme('rose')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  particleTheme === 'rose' ? 'bg-[#e2afb9] text-[#0c120e] font-bold shadow-sm' : 'hover:text-[#f6f2eb]'
                }`}
              >
                Rose 大马士革玫瑰
              </button>
              <button
                onClick={() => setParticleTheme('forest')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  particleTheme === 'forest' ? 'bg-[#b4c8af] text-[#0c120e] font-bold shadow-sm' : 'hover:text-[#f6f2eb]'
                }`}
              >
                Forest 极境冷杉
              </button>
            </div>
          </motion.div>

          {/* Hero Titles */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] tracking-tight text-[#f6f2eb]">
              UNIO 元香 <span className="text-[#d2c4ad] font-light italic text-3xl sm:text-5xl block sm:inline mt-1 sm:mt-0">· 精品芳疗</span>
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#d2c4ad] font-serif italic leading-relaxed">
              “从极境撷取芳香，因世界元于一息。”
            </p>
            <p className="max-w-3xl mx-auto text-xs sm:text-sm text-[#b4aca2] font-light leading-relaxed">
              ORIGINAL HARMONY SANCTUARY · 廿三载寻香，始于觉知。沉淀 23 年临床芳疗档案，涵盖全球 50 余国原产地及 219 款作品的完整香气体系。
              蒸馏天地之灵，寻归身心本源。
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => onNavigateTab('collection')}
              className="px-6 py-3.5 rounded-full bg-[#d2c4ad] text-[#0c120e] font-sans text-xs tracking-widest font-semibold hover:bg-[#e5d8c5] transition-all flex items-center gap-2 shadow-lg shadow-[#d2c4ad]/10 group"
            >
              <span>探索 219 款全系作品</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigateTab('ai-consult')}
              className="px-6 py-3.5 rounded-full bg-black/60 border border-[#d2c4ad]/40 text-[#f6f2eb] hover:border-[#d2c4ad] hover:bg-black/90 font-sans text-xs tracking-widest transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-[#d2c4ad]" />
              <span>AI 一人一方调剂</span>
            </button>

            <button
              onClick={() => onNavigateTab('atlas')}
              className="px-6 py-3.5 rounded-full bg-white/5 border border-white/10 text-[#d2c4ad] hover:bg-white/10 font-sans text-xs tracking-widest transition-all flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span>寻香地图 (接近50国原产地)</span>
            </button>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 border-t border-white/10 text-center font-mono text-xs">
            <div className="space-y-0.5">
              <span className="text-xl font-serif text-[#d2c4ad]">CRAFT 23年</span>
              <span className="block text-[10px] text-[#b4aca2]">廿三载寻香，始于觉知</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xl font-serif text-[#d2c4ad]">ORIGINS 50国</span>
              <span className="block text-[10px] text-[#b4aca2]">Global Botanicals 原产地</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xl font-serif text-[#d2c4ad]">COLLECTIONS 4系</span>
              <span className="block text-[10px] text-[#b4aca2]">4 Curated Series 219款</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xl font-serif text-[#d2c4ad]">100%</span>
              <span className="block text-[10px] text-[#b4aca2]">实验室 COA 批签</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CORE FOUR SERIES SHOWCASE (四大系列: 元 · 合 · 生 · 香) */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs tracking-[0.3em] text-[#8C7E6A] uppercase font-sans font-medium block">
            THE FOUR ARCHITECTURAL SERIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2D2A]">
            UNIO 元香四大作品系列
          </h2>
          <p className="text-xs text-[#2D2D2A]/60 max-w-xl mx-auto font-sans">
            从植物单方到身心灵协同复方，从低温纯露到高定空间扩香器物。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Series 1: 元系 */}
          <div 
            onClick={() => onNavigateTab('collection')}
            className="group relative rounded-2xl overflow-hidden bg-[#0c120e] border border-[#d2c4ad]/20 hover:border-[#d2c4ad]/60 transition-all cursor-pointer p-6 min-h-[380px] flex flex-col justify-between shadow-lg hover:shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-35 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              style={{ backgroundImage: `url('${SERIES_META.yuan.bannerImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="w-10 h-10 rounded-full bg-[#d2c4ad]/20 border border-[#d2c4ad]/40 flex items-center justify-center font-serif text-lg text-[#d2c4ad] font-bold">
                元
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#d2c4ad] bg-black/40 px-2 py-0.5 rounded border border-white/10">
                118 款作品
              </span>
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d2c4ad] block font-mono">YUAN SERIES</span>
              <h3 className="font-serif text-2xl text-white font-normal">单方精油 & 基础油</h3>
              <p className="text-xs text-[#b4aca2] leading-relaxed line-clamp-3 font-light">
                全球 28 国野生产地直接封瓶，五行分系（金木水火土），还原最纯粹的植物本源分子。
              </p>
              <div className="pt-2 flex items-center gap-1 text-xs text-[#d2c4ad] font-mono group-hover:translate-x-1 transition-transform">
                <span>浏览元系档案</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Series 2: 合系 */}
          <div 
            onClick={() => onNavigateTab('collection')}
            className="group relative rounded-2xl overflow-hidden bg-[#0c120e] border border-[#d2c4ad]/20 hover:border-[#d2c4ad]/60 transition-all cursor-pointer p-6 min-h-[380px] flex flex-col justify-between shadow-lg hover:shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-35 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              style={{ backgroundImage: `url('${SERIES_META.he.bannerImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="w-10 h-10 rounded-full bg-[#d2c4ad]/20 border border-[#d2c4ad]/40 flex items-center justify-center font-serif text-lg text-[#d2c4ad] font-bold">
                合
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#d2c4ad] bg-black/40 px-2 py-0.5 rounded border border-white/10">
                50 款作品
              </span>
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d2c4ad] block font-mono">HE SERIES</span>
              <h3 className="font-serif text-2xl text-white font-normal">身心灵协同复方</h3>
              <p className="text-xs text-[#b4aca2] leading-relaxed line-clamp-3 font-light">
                针对睡眠、情绪、呼吸与深层能量的协同配比，构建安稳凝神的身心平衡场。
              </p>
              <div className="pt-2 flex items-center gap-1 text-xs text-[#d2c4ad] font-mono group-hover:translate-x-1 transition-transform">
                <span>浏览合系档案</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Series 3: 生系 */}
          <div 
            onClick={() => onNavigateTab('collection')}
            className="group relative rounded-2xl overflow-hidden bg-[#0c120e] border border-[#d2c4ad]/20 hover:border-[#d2c4ad]/60 transition-all cursor-pointer p-6 min-h-[380px] flex flex-col justify-between shadow-lg hover:shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-35 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              style={{ backgroundImage: `url('${SERIES_META.sheng.bannerImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="w-10 h-10 rounded-full bg-[#d2c4ad]/20 border border-[#d2c4ad]/40 flex items-center justify-center font-serif text-lg text-[#d2c4ad] font-bold">
                生
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#d2c4ad] bg-black/40 px-2 py-0.5 rounded border border-white/10">
                41 款作品
              </span>
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d2c4ad] block font-mono">SHENG SERIES</span>
              <h3 className="font-serif text-2xl text-white font-normal">有机植物纯露水相</h3>
              <p className="text-xs text-[#b4aca2] leading-relaxed line-clamp-3 font-light">
                低温慢速水蒸气蒸馏，水相保留溶解于植物细胞水中的全光谱活性与温和补水。
              </p>
              <div className="pt-2 flex items-center gap-1 text-[#d2c4ad] text-xs font-mono group-hover:translate-x-1 transition-transform">
                <span>浏览生系档案</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Series 4: 香系 */}
          <div 
            onClick={() => onNavigateTab('collection')}
            className="group relative rounded-2xl overflow-hidden bg-[#0c120e] border border-[#d2c4ad]/20 hover:border-[#d2c4ad]/60 transition-all cursor-pointer p-6 min-h-[380px] flex flex-col justify-between shadow-lg hover:shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-35 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              style={{ backgroundImage: `url('${SERIES_META.jing.bannerImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="w-10 h-10 rounded-full bg-[#d2c4ad]/20 border border-[#d2c4ad]/40 flex items-center justify-center font-serif text-lg text-[#d2c4ad] font-bold">
                香
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#d2c4ad] bg-black/40 px-2 py-0.5 rounded border border-white/10">
                10 款作品
              </span>
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d2c4ad] block font-mono">JING SERIES</span>
              <h3 className="font-serif text-2xl text-white font-normal">空间器物 & 扩香</h3>
              <p className="text-xs text-[#b4aca2] leading-relaxed line-clamp-3 font-light">
                无热无水冷喷精油扩香仪、黑岩香炉与空间香氛，为酒店与家居营造高定场域。
              </p>
              <div className="pt-2 flex items-center gap-1 text-[#d2c4ad] text-xs font-mono group-hover:translate-x-1 transition-transform">
                <span>浏览香系档案</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. AI SCENT CONSULTANT SPOTLIGHT (一人一方 · AI 调配引擎) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1a241e] via-[#0c120e] to-[#253229] border border-[#d2c4ad]/30 p-8 md:p-12 text-[#f6f2eb] shadow-2xl">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d2c4ad]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d2c4ad]/15 border border-[#d2c4ad]/30 text-xs text-[#d2c4ad] font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>23年临床档案 + 智能推理算法</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#f6f2eb] font-normal leading-tight">
                AI 智能问诊 · 一人一方调配引擎
              </h2>

              <p className="text-xs sm:text-sm text-[#b4aca2] leading-relaxed font-light">
                基于 UNIO 元香 23 年真实客户问诊记录与植物药理数据库。输入您的年龄、作息、肤质、睡眠与情绪困扰，系统将实时计算生成独一无二的专属滴数调配方与使用仪式。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-2">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[#d2c4ad] font-bold block mb-0.5">精准精准匹配</span>
                  <span className="text-[10px] text-[#b4aca2]">复方/单方协同建议</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[#d2c4ad] font-bold block mb-0.5">稀释安全指导</span>
                  <span className="text-[10px] text-[#b4aca2]">基础油比例与禁用提示</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[#d2c4ad] font-bold block mb-0.5">专属使用仪式</span>
                  <span className="text-[10px] text-[#b4aca2]">吸吸法/按摩/扩香建议</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateTab('ai-consult')}
                  className="px-6 py-3 rounded-full bg-[#d2c4ad] text-[#0c120e] font-sans text-xs tracking-widest font-semibold hover:bg-[#e5d8c5] transition-all flex items-center gap-2 shadow-lg"
                >
                  <span>立即体验 AI 问诊</span>
                  <ArrowRight className="w-4 h-4" />
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

      {/* 4. BRAND BOOK & ARCHIVE ENTRANCE SECTION (品牌手册 2003-2026 专区) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-[#EFEDE7] border border-[#2D2D2A]/15 p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D2D2A] text-[#F9F7F2] text-[11px] font-mono tracking-widest uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>BRAND ARCHIVE BOOK / 2003 - 2026</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2D2A]">
              UNIO AROMA 40 页品牌全景手册 & 采购白皮书
            </h3>

            <p className="text-xs sm:text-sm text-[#2D2D2A]/70 leading-relaxed font-sans">
              完整收录品牌 23 年创立历程、创始人 Alice 刘元红纪念手稿、四大作品全景检索表、全球野生产地地图及 B2B 商业空间扩香指南。支持在线高分辨率翻阅。
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-[#8C7E6A] pt-1">
              <span>✓ 40 页高清精装画册</span>
              <span>✓ 219 款作品完整价格表</span>
              <span>✓ 创始人纪念特辑</span>
              <span>✓ 商业空间定制规范</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
            <button
              onClick={() => onNavigateTab('story')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0c120e] text-[#d2c4ad] font-sans text-xs tracking-widest font-semibold hover:bg-[#1a241e] transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-105"
            >
              <BookOpen className="w-4 h-4 text-[#d2c4ad]" />
              <span>翻阅 40 页品牌手册</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. FEATURED PRODUCTS SPOTLIGHT (明星单品展台) */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#2D2D2A]/10 pb-4">
          <div>
            <span className="text-xs tracking-[0.3em] text-[#8C7E6A] uppercase font-sans font-medium block">
              FEATURED BOTANICAL WORKS
            </span>
            <h2 className="font-serif text-3xl text-[#2D2D2A]">
              明星作品展台
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('collection')}
            className="text-xs font-mono text-[#8C7E6A] hover:text-[#2D2D2A] transition-colors flex items-center gap-1"
          >
            <span>查看完整 219 款目录</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.code}
              onClick={() => onSelectProduct(product)}
              className="group bg-[#EFEDE7] rounded-2xl p-4 border border-[#2D2D2A]/10 hover:border-[#8C7E6A] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black/5">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600'}
                    alt={product.cn}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600'; }}
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-[#d2c4ad] font-mono text-[10px]">
                    {product.code}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-[#8C7E6A] font-mono uppercase">{product.subgroup} · {product.origin}</span>
                    <span className="text-[10px] text-[#2D2D2A]/60 font-mono">{product.prices[0]}</span>
                  </div>
                  <h4 className="font-serif text-lg text-[#2D2D2A] group-hover:text-[#8C7E6A] transition-colors font-semibold">
                    {product.cn}
                  </h4>
                  <p className="text-[11px] text-[#2D2D2A]/70 line-clamp-2 mt-1 font-sans">
                    {product.shortDesc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-[#2D2D2A]/10 flex items-center justify-between text-xs font-mono text-[#8C7E6A]">
                <span>COA 归档</span>
                <span className="group-hover:translate-x-1 transition-transform">详情 →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FOUNDER TRIBUTE & BRAND HERITAGE SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-2xl">
          
          <div className="md:col-span-5 space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 relative shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000"
                alt="Founder Memorial"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-[10px] tracking-[0.25em] text-[#d2c4ad] font-mono block">FOUNDER MEMORIAL ARCHIVE</span>
                <span className="font-serif text-lg text-white">敬 品牌创始人 Alice-刘元红</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-5">
            <span className="text-xs tracking-[0.3em] text-[#d2c4ad] uppercase font-mono block">
              HERITAGE & CLINICAL RECORD / 2003 - 2026
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f6f2eb] font-normal leading-tight">
              “岁岁闻香，岁岁念你”
            </h2>
            <p className="text-xs sm:text-sm text-[#b4aca2] leading-relaxed font-light">
              UNIO 元香由创始人 Alice 刘元红女士创立于 2003 年。从最早的单方精油手记，到今天跨越 28 国野生产地的 219 款芳疗档案。松针与绿意蔓延，清冽瓶身盛载岁月沉淀。闻香见人，念念不忘。
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2 font-mono text-center text-xs border-t border-white/10">
              <div>
                <span className="text-[#d2c4ad] font-bold block">成都据点</span>
                <span className="text-[10px] text-[#b4aca2]">西南寻香工坊</span>
              </div>
              <div>
                <span className="text-[#d2c4ad] font-bold block">宁波据点</span>
                <span className="text-[10px] text-[#b4aca2]">海风芳疗观察站</span>
              </div>
              <div>
                <span className="text-[#d2c4ad] font-bold block">芭提雅据点</span>
                <span className="text-[10px] text-[#b4aca2]">东南亚热带基地</span>
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
              查看全球 28 国野生产地地图 →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
