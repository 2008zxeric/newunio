import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  Heart, 
  Globe, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Calendar, 
  Users, 
  Feather, 
  Compass, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { ProductItem } from '../types';
import { BrandBookViewer } from './BrandBookViewer';
import { UnioLogo } from './UnioLogo';
import { BilingualHeader } from '../utils/i18n';
import { 
  YEAR_RANGE_TEXT, 
  CHINESE_YEAR_JOURNEY, 
  YEARS_OF_JOURNEY, 
  FOUNDING_YEAR, 
  CURRENT_YEAR 
} from '../utils/brandConstants';

interface BrandStoryProps {
  onSelectProduct: (product: ProductItem) => void;
  onNavigateToCatalog: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onSelectProduct, onNavigateToCatalog }) => {
  const [activeSubTab, setActiveSubTab] = useState<'narrative' | 'handbook'>('narrative');

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 space-y-12">
      
      {/* 1. Header & Navigation Toggles */}
      <BilingualHeader
        categoryEn={`BRAND STORY & HERITAGE / ${YEAR_RANGE_TEXT}`}
        titleZh="UNIO 元香 · 品牌故事与全景手册"
        titleEn="Brand Heritage & Master Guide"
        descZh={`从 ${FOUNDING_YEAR} 年首篇芳疗临床手记，到全球 50 余国原产地直采。探索 UNIO ${YEARS_OF_JOURNEY} 年植物哲学与 40 页品牌全景采购指南。`}
        descEn="Explore 23 years of botanical wisdom, clinical archives, and complete purchasing guidance across 50 countries."
        extraRight={
          <div className="flex items-center gap-1.5 p-1 bg-[#EFEDE7] border border-[#2D2D2A]/15 rounded-full w-fit">
            <button
              onClick={() => setActiveSubTab('narrative')}
              className={`px-5 py-2 rounded-full text-xs font-serif transition-all flex items-center gap-2 ${
                activeSubTab === 'narrative'
                  ? 'bg-[#2D2D2A] text-[#F9F7F2] shadow-md font-semibold'
                  : 'text-[#2D2D2A]/70 hover:text-[#2D2D2A]'
              }`}
            >
              <Feather className="w-3.5 h-3.5" />
              <span>品牌哲学 <span className="font-mono text-[9px] opacity-75 font-normal ml-0.5">/ Heritage</span></span>
            </button>

            <button
              onClick={() => setActiveSubTab('handbook')}
              className={`px-5 py-2 rounded-full text-xs font-serif transition-all flex items-center gap-2 ${
                activeSubTab === 'handbook'
                  ? 'bg-[#2D2D2A] text-[#F9F7F2] shadow-md font-semibold'
                  : 'text-[#2D2D2A]/70 hover:text-[#2D2D2A]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>40页手册 <span className="font-mono text-[9px] opacity-75 font-normal ml-0.5">/ Handbook</span></span>
            </button>
          </div>
        }
      />

      {/* 2. Sub-tab Content: Narrative vs Handbook */}
      {activeSubTab === 'handbook' ? (
        <BrandBookViewer 
          onSelectProduct={onSelectProduct} 
          onNavigateToCatalog={onNavigateToCatalog} 
        />
      ) : (
        <div className="space-y-16">
          
          {/* Hero Banner Narrative */}
          <section className="relative rounded-3xl overflow-hidden bg-[#0c120e] text-[#f6f2eb] p-8 md:p-14 border border-[#d2c4ad]/30 shadow-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none filter brightness-90"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1600')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d2c4ad]/15 border border-[#d2c4ad]/30 text-xs text-[#d2c4ad] font-mono tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ORIGINAL HARMONY SANCTUARY · {CHINESE_YEAR_JOURNEY}寻香，始于觉知</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#f6f2eb]">
                  “从极境撷取芳香，<br />
                  <span className="text-[#d2c4ad] italic font-light">因世界元于一息。”</span>
                </h2>

                <p className="text-xs sm:text-sm text-[#b4aca2] leading-relaxed font-light max-w-2xl">
                  UNIO 元香创立于 {FOUNDING_YEAR} 年。我们深信，真正具有疗愈力量的精油，绝非人工调香或化学合成的产物，而是原生植物在风土、阳光与四季交替中积淀的分子语言。
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveSubTab('handbook')}
                    className="px-6 py-3 rounded-full bg-[#d2c4ad] text-[#0c120e] text-xs font-mono font-semibold tracking-wider hover:bg-[#e5d8c5] transition-all flex items-center gap-2 shadow-lg"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>在线翻阅 40 页品牌全景手册</span>
                  </button>
                  <button
                    onClick={onNavigateToCatalog}
                    className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-[#f6f2eb] text-xs font-mono tracking-wider hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    <span>浏览 219 款作品陈列</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="p-8 rounded-full bg-black/60 border border-[#d2c4ad]/40 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center space-y-3">
                  <UnioLogo size={80} color="#e5d8c5" />
                  <span className="font-serif text-lg text-[#f6f2eb]">UNIO AROMA</span>
                  <span className="text-[10px] font-mono text-[#d2c4ad] tracking-widest uppercase">元香 · 始于 {FOUNDING_YEAR}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Founder Memorial Tribute Section */}
          <section className="bg-[#EFEDE7] rounded-3xl p-8 md:p-12 border border-[#2D2D2A]/15 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#2D2D2A]/20 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200"
                    alt="Alice Memorial Woods"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c120e]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-center text-white space-y-1">
                    <span className="text-[10px] font-mono text-[#d2c4ad] tracking-[0.25em] uppercase block">IN MEMORY OF FOUNDER</span>
                    <h3 className="font-serif text-2xl">Alice · 刘元红</h3>
                    <p className="text-xs text-[#b4aca2] font-mono">1978 - 2024 · 品牌创始人与首席芳疗师</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D2D2A] text-[#F9F7F2] text-[11px] font-mono tracking-widest uppercase">
                  <Heart className="w-3.5 h-3.5 text-[#d2c4ad]" />
                  <span>SPECIAL MEMORIAL TRIBUTE</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2D2A]">
                  “岁岁闻香，岁岁念你”
                </h2>

                <div className="space-y-4 text-xs sm:text-sm text-[#2D2D2A]/80 leading-relaxed font-sans">
                  <p>
                    Alice 刘元红女士于 {FOUNDING_YEAR} 年建立 UNIO 元香实验室。在过去的二十余年间，她深入法国保加利亚大马士革玫瑰庄园、索马里乳香干谷与阿曼沉香林，用严苛的 GC-MS 气相色谱标准建立起包含 219 款作品的完整档案。
                  </p>
                  <p>
                    “精油不仅是分子的组合，更是大自然寄给人类的书信。” 她的坚守与独立芳疗理念，构成了 UNIO 今日不随波逐流的品牌灵魂。松针与绿意蔓延，清冽瓶身盛载岁月沉淀。闻香见人，念念不忘。
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#2D2D2A]/15 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/10">
                    <span className="text-[#8C7E6A] font-bold block">{FOUNDING_YEAR} 年</span>
                    <span className="text-[10px] text-[#2D2D2A]/60">成都据点·临床手记</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/10">
                    <span className="text-[#8C7E6A] font-bold block">2012 年</span>
                    <span className="text-[10px] text-[#2D2D2A]/60">宁波据点·海风工作室</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/10">
                    <span className="text-[#8C7E6A] font-bold block">2018 年</span>
                    <span className="text-[10px] text-[#2D2D2A]/60">芭提雅据点·热带基地</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Milestone Timeline */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs tracking-[0.3em] text-[#8C7E6A] uppercase font-mono block">
                {YEARS_OF_JOURNEY}-YEAR HERITAGE CHRONICLE
              </span>
              <h2 className="font-serif text-3xl text-[#2D2D2A]">
                UNIO 发展大事记 ({YEAR_RANGE_TEXT})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div className="p-6 rounded-2xl bg-[#EFEDE7] border border-[#2D2D2A]/15 space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-[#2D2D2A] text-[#F9F7F2] font-mono text-xs flex items-center justify-center font-bold">
                  01
                </div>
                <span className="font-mono text-xs text-[#8C7E6A] block">2003 - 2010</span>
                <h3 className="font-serif text-lg text-[#2D2D2A]">草创与单方手记</h3>
                <p className="text-xs text-[#2D2D2A]/70 leading-relaxed font-sans">
                  建立成都首间芳疗临床工作室，收集全球 50 余种野生单方精油样本，完成元系单方框架。
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#EFEDE7] border border-[#2D2D2A]/15 space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-[#2D2D2A] text-[#F9F7F2] font-mono text-xs flex items-center justify-center font-bold">
                  02
                </div>
                <span className="font-mono text-xs text-[#8C7E6A] block">2011 - 2017</span>
                <h3 className="font-serif text-lg text-[#2D2D2A]">产地直采与五行分系</h3>
                <p className="text-xs text-[#2D2D2A]/70 leading-relaxed font-sans">
                  确立 50 余国原产地契约，推出以金木水火土为核心的“元系”与协同身心的“合系”复方。
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#EFEDE7] border border-[#2D2D2A]/15 space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-[#2D2D2A] text-[#F9F7F2] font-mono text-xs flex items-center justify-center font-bold">
                  03
                </div>
                <span className="font-mono text-xs text-[#8C7E6A] block">2018 - 2023</span>
                <h3 className="font-serif text-lg text-[#2D2D2A]">全线水相与高定扩香</h3>
                <p className="text-xs text-[#2D2D2A]/70 leading-relaxed font-sans">
                  研发生系有机纯露水蒸气蒸馏体系，并联合酒店集团推出香系空间黑岩扩香与冷喷拓扑仪。
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#EFEDE7] border border-[#2D2D2A]/15 space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-[#2D2D2A] text-[#F9F7F2] font-mono text-xs flex items-center justify-center font-bold">
                  04
                </div>
                <span className="font-mono text-xs text-[#8C7E6A] block">2024 - {CURRENT_YEAR}</span>
                <h3 className="font-serif text-lg text-[#2D2D2A]">AI一人一方与数字溯源</h3>
                <p className="text-xs text-[#2D2D2A]/70 leading-relaxed font-sans">
                  整合 {YEARS_OF_JOURNEY} 年临床档案上线 AI 智能调剂系统，全系 219 款作品实现 100% 实验室 COA 数字归档。
                </p>
              </div>

            </div>
          </section>

          {/* Prompt to Open 40-Page Interactive Book */}
          <section className="rounded-3xl bg-[#0c120e] text-[#f6f2eb] p-8 md:p-10 text-center space-y-6 border border-[#d2c4ad]/30 shadow-2xl">
            <BookOpen className="w-10 h-10 text-[#d2c4ad] mx-auto" />
            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#f6f2eb]">
                深入翻阅 UNIO AROMA 40 页品牌全景采购手册
              </h3>
              <p className="text-xs sm:text-sm text-[#b4aca2] max-w-xl mx-auto font-sans">
                内含创始人手稿、四大系列作品全景价格与配比表、全球 92 地标产地解构及 B2B 酒店空间高定说明。
              </p>
            </div>
            <button
              onClick={() => setActiveSubTab('handbook')}
              className="px-8 py-3.5 rounded-full bg-[#d2c4ad] text-[#0c120e] text-xs font-mono font-bold tracking-widest hover:bg-[#e5d8c5] transition-all inline-flex items-center gap-2 shadow-xl"
            >
              <span>立即开启 40 页全景手册</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>

        </div>
      )}

    </div>
  );
};
