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
  ArrowRight,
  Printer,
  Image as ImageIcon
} from 'lucide-react';
import { ProductItem } from '../types';
import { BrandBookViewer } from './BrandBookViewer';
import { PosterExporter } from './PosterExporter';
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
  isMobile?: boolean;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ 
  onSelectProduct, 
  onNavigateToCatalog,
  isMobile = false 
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'narrative' | 'handbook' | 'poster'>('narrative');
  const [startFullscreen, setStartFullscreen] = useState<boolean>(false);

  const handleOpenHandbookFullscreen = () => {
    setActiveSubTab('handbook');
    setStartFullscreen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 space-y-12">
      
      {/* 1. Header & Navigation Toggles */}
      <BilingualHeader
        categoryEn={`BRAND STORY & HERITAGE / ${YEAR_RANGE_TEXT}`}
        titleZh="UNIO 元香 · 品牌故事与全景手册"
        titleEn="Brand Heritage & Master Guide"
        descZh={`从 ${FOUNDING_YEAR} 年首篇芳疗临床手记，到全球 50 余国与中国 31 省元境地标原产地直采。探索 UNIO ${YEARS_OF_JOURNEY} 年植物哲学与 品牌全景采购指南，或为门店定制专属宣传海报。`}
        descEn="Explore 23 years of botanical wisdom, clinical archives, and complete purchasing guidance across 36 countries and 31 provinces/regions."
        extraRight={
          <div className="flex items-center gap-1.5 p-1 bg-[#EFEDE7] border border-[#2D2D2A]/15 rounded-full w-fit">
            <button
              onClick={() => setActiveSubTab('narrative')}
              className={`px-4 py-2 rounded-full text-xs font-serif transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'narrative'
                  ? 'bg-[#2D2D2A] text-[#F9F7F2] shadow-md font-semibold'
                  : 'text-[#2D2D2A]/70 hover:text-[#2D2D2A]'
              }`}
            >
              <Feather className="w-3.5 h-3.5" />
              <span>品牌哲学 <span className="font-mono text-[9px] opacity-75 font-normal ml-0.5">/ Story</span></span>
            </button>

            {/* Handbook & Poster Tabs - Handbook visible on mobile (tap to open); Poster desktop-only */}
            <button
              onClick={() => setActiveSubTab('handbook')}
              className={`px-3 md:px-4 py-2 rounded-full text-xs font-serif transition-all items-center gap-1.5 cursor-pointer flex ${
                activeSubTab === 'handbook'
                  ? 'bg-[#2D2D2A] text-[#F9F7F2] shadow-md font-semibold'
                  : 'text-[#2D2D2A]/70 hover:text-[#2D2D2A]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>品牌画册 <span className="hidden sm:inline font-mono text-[9px] opacity-75 font-normal ml-0.5">/ Handbook</span></span>
            </button>
            {!isMobile && (
              <button
                onClick={() => setActiveSubTab('poster')}
                className={`hidden md:flex px-4 py-2 rounded-full text-xs font-serif transition-all items-center gap-1.5 cursor-pointer ${
                  activeSubTab === 'poster'
                    ? 'bg-[#A82E2E] text-white shadow-md font-semibold'
                    : 'text-[#2D2D2A]/70 hover:text-[#2D2D2A]'
                }`}
              >
                <Printer className="w-3.5 h-3.5 text-[#F9F7F2]" />
                <span>海报生成 <span className="font-mono text-[9px] opacity-80 font-normal ml-0.5">/ Poster</span></span>
              </button>
            )}
          </div>
        }
      />

      {/* 2. Sub-tab Content: Narrative vs Handbook vs Poster */}
      {activeSubTab === 'handbook' ? (
        <div className="space-y-4">
          <div className="md:hidden p-4 rounded-2xl bg-[#EFEDE7] border border-[#2D2D2A]/15 text-xs text-[#2D2D2A] flex items-center justify-between gap-3">
            <span>为展示效果，请在电脑上查看</span>
          </div>
          <div className="block">
            <BrandBookViewer 
              onSelectProduct={onSelectProduct} 
              onNavigateToCatalog={onNavigateToCatalog}
              initialFullscreen={startFullscreen}
            />
          </div>
        </div>
      ) : activeSubTab === 'poster' && !isMobile ? (
        <div className="space-y-4">
          <div className="md:hidden p-4 rounded-2xl bg-[#EFEDE7] border border-[#2D2D2A]/15 text-xs text-[#2D2D2A] flex items-center justify-between gap-3">
            <span>门店海报与卡片导出适合电脑端 2K 全景生成。手机端建议浏览元境作品与故事。</span>
            <button
              onClick={() => setActiveSubTab('narrative')}
              className="px-3 py-1.5 rounded-full bg-[#2D2D2A] text-white text-[11px] whitespace-nowrap"
            >
              看品牌故事
            </button>
          </div>
          <div className="hidden md:block">
            <PosterExporter />
          </div>
        </div>
      ) : (
        <div className="space-y-16">
          
          {/* Hero Banner Narrative */}
          <section className="relative rounded-3xl overflow-hidden bg-[#2c2a26] text-[#f6f2eb] p-6 sm:p-8 md:p-14 border border-[#d2c4ad]/30 shadow-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none filter brightness-90"
              style={{ backgroundImage: `url('/founder-memorial.jpg')` }}
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

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveSubTab('handbook')}
                    className="hidden md:flex px-6 py-3 rounded-full bg-[#d2c4ad] text-[#2c2a26] text-xs font-mono font-semibold tracking-wider hover:bg-[#e5d8c5] transition-all items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>在线翻阅 品牌全景手册</span>
                  </button>

                  <button
                    onClick={() => setActiveSubTab('poster')}
                    className="hidden md:flex px-6 py-3 rounded-full bg-[#A82E2E] text-white text-xs font-mono font-semibold tracking-wider hover:bg-[#801e1e] transition-all items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>门店海报生成与宣传卡片导出</span>
                  </button>

                  <button
                    onClick={onNavigateToCatalog}
                    className="px-6 py-3 rounded-full bg-[#d2c4ad] md:bg-white/10 md:border md:border-white/20 text-[#2c2a26] md:text-[#f6f2eb] text-xs font-mono font-semibold md:font-normal tracking-wider hover:bg-white/20 transition-all flex items-center gap-2 cursor-pointer shadow-md md:shadow-none"
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

          {/* 3 Founders Legacy Section */}
          <section className="bg-[#EFEDE7] rounded-3xl p-6 sm:p-10 md:p-12 border border-[#2D2D2A]/15 space-y-10 shadow-sm">
            
            {/* Section Header */}
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2D2D2A] text-[#F9F7F2] text-[11px] font-mono tracking-widest uppercase">
                <Users className="w-3.5 h-3.5 text-[#d2c4ad]" />
                <span>TRIO FOUNDERS & HERITAGE STORY · 三位创始人的生命交响</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#2D2D2A] leading-tight">
                初始于 Alice，重拾于 Eric 与 Amanda
              </h2>
              <p className="text-xs sm:text-sm text-[#2D2D2A]/75 font-sans leading-relaxed">
                从 22 岁那年的植物相伴奇迹，到全球 85 处元境足迹，再到专业芳疗的严苛守护。三位创始人的执念与爱，交织出 UNIO 元香最真实的生命温度。
              </p>
            </div>

            {/* 1. Main Founder Feature: Alice (The Soul & Origin) */}
            <div className="bg-[#F9F7F2] rounded-2xl border border-[#2D2D2A]/12 p-6 sm:p-8 md:p-10 shadow-md space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Photo & Memorial Label */}
                <div className="lg:col-span-5 relative aspect-[4/5] rounded-xl overflow-hidden border border-[#2D2D2A]/20 shadow-xl group">
                  <img
                    src="/founder-memorial.jpg"
                    alt="Alice Memorial Green Meadow"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c2a26]/90 via-[#2c2a26]/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#d2c4ad]/30 text-[10px] font-mono text-[#d2c4ad] uppercase tracking-wider">
                    <Feather className="w-3 h-3 text-[#d2c4ad]" />
                    <span>SOUL & FOUNDER / 灵魂与起源</span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-center text-white space-y-1">
                    <span className="text-[10px] font-mono text-[#d2c4ad] tracking-[0.25em] uppercase block">CHIEF EXPERT & SPIRIT</span>
                    <h3 className="font-serif text-2xl font-normal">Alice · 刘元红</h3>
                    <p className="text-xs text-[#b4aca2] font-mono">1972 - 2024 · 首席专家 · “绿野芳踪”</p>
                  </div>
                </div>

                {/* Alice Narrative Story */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C2E20] text-[#D2C4AD] text-[10px] font-mono tracking-widest uppercase">
                    <Heart className="w-3 h-3 text-[#A82E2E]" />
                    <span>首席专家 ALICE · 三十年植物陪伴奇迹</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2D2A]">
                    “让自己成为一片让人安静下来的绿色原野”
                  </h3>

                  <div className="space-y-3.5 text-xs sm:text-sm text-[#2D2D2A]/85 leading-relaxed font-sans">
                    <p>
                      <strong className="text-[#1C2E20] font-serif font-semibold">【生命的温和抉择】</strong> 22 岁那年，Alice 被确诊心肌炎，医生告诉她需要换心才能存活。她选择了一条更温和的路——让植物陪伴自己。后来的每一天，她都当作额外的礼物。她崇尚自然与静心，身边的朋友都知道，她是一个随时会赞美别人、感恩生活的人。她叫自己“绿野芳踪”——她自己，就是一片让人安静下来的绿色原野。她用精油陪伴了自己三十年，直到 52 岁离世。比医生预判的，多活了近三十年。
                    </p>
                    <p>
                      <strong className="text-[#1C2E20] font-serif font-semibold">【科学频率与宁静避难所】</strong> 首席专家 Alice 廿载深耕芳疗临床，她致力于将这份极致的芳香传播给更多追求觉知的人。她将元境的单方原力进行科学频率重构，打造出属于现代人的“宁静避难所”。这是专业积淀与分享精神的完美交响。
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#EFEDE7] border border-[#8C7E6A]/20 font-serif text-xs sm:text-sm text-[#1C2E20] italic leading-relaxed">
                    “精油不仅是分子的组合，更是大自然寄给人类的书信。闻香见人，念念不忘。”
                  </div>
                </div>

              </div>
            </div>

            {/* 2. Co-Founders Grid: Eric & Amanda */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Eric Card */}
              <div className="bg-[#F9F7F2] rounded-2xl border border-[#2D2D2A]/12 p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between hover:border-[#8C7E6A]/40 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D2D2A] text-[#F9F7F2] text-[10px] font-mono tracking-wider uppercase">
                      <Compass className="w-3 h-3 text-[#d2c4ad]" />
                      <span>THE PERCEIVER / 守护者 · 首席行者</span>
                    </span>
                    <span className="text-xs font-mono text-[#8C7E6A]">FOUNDER 02</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-[#2D2D2A]/20 shadow-md shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300"
                        alt="Eric"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl text-[#2D2D2A] font-bold">Eric</h4>
                      <p className="text-xs text-[#8C7E6A] font-mono">首席行者 · Alice 的亲人</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#2D2D2A]/80 leading-relaxed font-sans">
                    首席行者。Alice 的亲人，当年从世界各地为她带回最好的精油。在Alice 离开后，他与 Amanda 约定——共同重拾元香，将其发扬壮大。
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#2c2a26] text-[#f6f2eb] border border-[#d2c4ad]/30 space-y-2">
                  <span className="text-[10px] font-mono text-[#d2c4ad] tracking-widest uppercase block">ERIC'S COVENANT</span>
                  <p className="font-serif text-xs sm:text-sm italic text-[#e5d8c5] leading-relaxed">
                    “我在全球 85 个元境行走，只为捕捉那一抹未被现代工业驯化的野性香气。”
                  </p>
                </div>
              </div>

              {/* Amanda Card */}
              <div className="bg-[#F9F7F2] rounded-2xl border border-[#2D2D2A]/12 p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between hover:border-[#8C7E6A]/40 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C2E20] text-[#D2C4AD] text-[10px] font-mono tracking-wider uppercase">
                      <ShieldCheck className="w-3 h-3 text-[#d2c4ad]" />
                      <span>THE GUARDIAN / 传承者 · 品控守护</span>
                    </span>
                    <span className="text-xs font-mono text-[#8C7E6A]">FOUNDER 03</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-[#2D2D2A]/20 shadow-md shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300"
                        alt="Amanda"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl text-[#2D2D2A] font-bold">Amanda</h4>
                      <p className="text-xs text-[#8C7E6A] font-mono">传承者 & 守护者 · Alice 的闺蜜</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#2D2D2A]/80 leading-relaxed font-sans">
                    Alice 的闺蜜。在 Eric 的提议下，两人约定共同将 Alice 的芳香事业传承下去。Amanda 为此专程考取了芳疗师资格，决心将芳疗的路走得更远。她继承了 Alice 对植物的信任与爱，为品牌注入了专业的品控与品质保障。
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#1C2E20] text-[#F9F7F2] border border-[#8C7E6A]/30 space-y-2">
                  <span className="text-[10px] font-mono text-[#d2c4ad] tracking-widest uppercase block">AMANDA'S GUARDIANSHIP</span>
                  <p className="font-serif text-xs sm:text-sm italic text-[#f6f2eb] leading-relaxed">
                    “如果说 Alice 是品牌的灵魂，那 Amanda 就是品牌最坚实的守护者。”
                  </p>
                </div>
              </div>

            </div>

            {/* 3. Covenant Banner */}
            <div className="bg-[#2c2a26] rounded-2xl p-6 sm:p-8 text-[#f6f2eb] border border-[#d2c4ad]/30 text-center space-y-4 shadow-xl">
              <span className="text-[10px] font-mono text-[#d2c4ad] tracking-[0.3em] uppercase block">THE NAME OF UNIO · 约定与起源</span>
              <p className="font-serif text-lg sm:text-2xl text-[#e5d8c5] max-w-3xl mx-auto leading-relaxed">
                「元」取自 Alice 名中一字。这个名字，是 Eric 与 Amanda 约定的起点——他们以此为名，把 Alice 的芳香带到更远的地方。
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[#b4aca2]">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">3 位创始人生命重逢</span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">23 年临床档案沉淀</span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">85 处元境足迹</span>
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
                  建立成都首间芳疗临床工作室，收集全球 50 余种原生单方精油样本，完成元系单方框架。
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#EFEDE7] border border-[#2D2D2A]/15 space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-[#2D2D2A] text-[#F9F7F2] font-mono text-xs flex items-center justify-center font-bold">
                  02
                </div>
                <span className="font-mono text-xs text-[#8C7E6A] block">2011 - 2017</span>
                <h3 className="font-serif text-lg text-[#2D2D2A]">产地直采与五行分系</h3>
                <p className="text-xs text-[#2D2D2A]/70 leading-relaxed font-sans">
                  确立全球 50 余国与中国 31 省元境地标原产地契约，推出以金木水火土为核心的“元系”与协同身心的“合系”复方。
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
          <section className="rounded-3xl bg-[#2c2a26] text-[#f6f2eb] p-8 md:p-10 text-center space-y-6 border border-[#d2c4ad]/30 shadow-2xl">
            <BookOpen className="w-10 h-10 text-[#d2c4ad] mx-auto" />
            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#f6f2eb]">
                深入翻阅 UNIO AROMA 品牌全景采购手册
              </h3>
              <p className="text-xs sm:text-sm text-[#b4aca2] max-w-xl mx-auto font-sans">
                内含创始人手稿、四大系列作品全景价格与配比表、全球 92 地标产地解构及 B2B 酒店空间高定说明。
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setStartFullscreen(false);
                  setActiveSubTab('handbook');
                }}
                className="px-6 py-3.5 rounded-full bg-[#d2c4ad] text-[#2c2a26] text-xs font-mono font-bold tracking-widest hover:bg-[#e5d8c5] transition-all inline-flex items-center gap-2 shadow-xl"
              >
                <span>开启品牌全景手册</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleOpenHandbookFullscreen}
                className="px-6 py-3.5 rounded-full bg-[#1a2e22] text-[#e8dac8] border border-[#c5b49a]/40 text-xs font-mono font-bold tracking-widest hover:bg-[#233b2c] hover:border-[#c5b49a] transition-all inline-flex items-center gap-2 shadow-xl"
              >
                <span>100% 全屏沉浸阅读</span>
              </button>
            </div>
          </section>

        </div>
      )}

    </div>
  );
};
