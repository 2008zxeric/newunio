import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, BookOpen, Grid, Bot, Music, Globe, ShieldCheck, User, Menu, X, ChevronRight, Sparkles, Search, Compass, Award, FileText, ShoppingBag } from 'lucide-react';
import { UnioLogo } from './UnioLogo';
import { GlobalHeaderSearch } from './GlobalHeaderSearch';
import { SeriesCardHandoverDocModal } from './SeriesCardHandoverDocModal';
import { ProductItem } from '../types';
import { YEAR_RANGE_TEXT, CHINESE_YEAR_JOURNEY } from '../utils/brandConstants';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string, subTab?: string) => void;
  soundscapePlaying?: boolean;
  toggleSoundscape?: () => void;
  onSelectProduct?: (product: ProductItem) => void;
  isMobile?: boolean;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  soundscapePlaying = false,
  toggleSoundscape,
  onSelectProduct,
  isMobile = false,
  cartCount = 0,
  onOpenCart
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [handoverOpen, setHandoverOpen] = useState(false);
  const isHome = activeTab === 'home';

  // Track page scroll to subtly shrink header height and enhance backdrop glass blur
  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 20;
      // 状态无变化时跳过 setState（避免每次滚动触发 re-render 导致导航抖动）
      setScrolled((prev) => (prev === next ? prev : next));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: '品牌首页', icon: Home, badge: '始于2003', desc: '世界芳疗 · 东方一息' },
    { id: 'collection', label: '馆藏陈列', icon: Grid, badge: '219款作品', desc: '元/合/生/香 四大系列' },
    { id: 'atlas', label: '寻香地图', icon: Globe, badge: '元境地标', desc: '全球 50 余国与中国 31 省' },
    { id: 'ai-consult', label: '一人一方', icon: Bot, badge: '智能调配', desc: '临床案例量身高定' },
    { id: 'story', label: '品牌故事', icon: BookOpen, badge: `${CHINESE_YEAR_JOURNEY}历程`, desc: 'Alice 创始人手记' },
    { id: 'profile', label: '我的档案', icon: User, badge: '个人档案', desc: '问诊记录与香藏' },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

// ── 长按 Logo 环形进度 → 自动打开后台（3 秒）──
  const [pressProgress, setPressProgress] = useState(0);
  const pressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pressStarted = useRef(false);
  const HOLD_MS = 3000;

  const startPress = () => {
    if (pressStarted.current) return;
    pressStarted.current = true;
    setPressProgress(0);
    const startTime = Date.now();
    pressTimer.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / HOLD_MS) * 100);
      setPressProgress(progress);
      if (progress >= 100) {
        cancelPress();
        setActiveTab('admin');
      }
    }, 50);
  };

  const cancelPress = () => {
    pressStarted.current = false;
    if (pressTimer.current) {
      clearInterval(pressTimer.current);
      pressTimer.current = null;
    }
    setPressProgress(0);
  };

  const RING_R = 14;
  const RING_C = 2 * Math.PI * RING_R;
  const ringOffset = RING_C * (1 - pressProgress / 100);

  return (
    <div className="sticky top-0 z-50 w-full no-print">
      {/* Top Brand Announcement Bar (Oriental Gold Ribbon) */}
      <div 
        className={`bg-gradient-to-r from-[#0F1912] via-[#1C2E20] to-[#0F1912] text-[#E8DAC8] text-[10px] sm:text-[11px] py-1 px-4 text-center border-b border-[#C5B49A]/30 font-serif flex items-center justify-between transition-all duration-300 select-none ${
          scrolled ? 'h-0 py-0 opacity-0 overflow-hidden border-none' : 'h-7 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div 
            onClick={() => handleSelectTab('home')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5B49A] animate-ping shrink-0" />
            <span className="tracking-[0.18em] font-light">“UNIO 撷取芳香，元于一息 2003-2026”</span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[10px] font-mono text-[#C5B49A]/80">
            <span className="flex items-center gap-1">
              <Compass className="w-3 h-3 text-[#C5B49A]" />
              <span>50 余国原香产地</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-[#C5B49A]/40" />
            <span className="flex items-center gap-1">
              <Award className="w-3 h-3 text-[#C5B49A]" />
              <span>23年临床积累</span>
            </span>
            <span className="text-[9px] uppercase font-mono tracking-widest px-2 py-0.2 rounded bg-white/10 text-[#FAF8F5] border border-white/10 ml-1">
              Est. 2003
            </span>
          </div>
        </div>
      </div>

      {/* Main Luxury Sticky Navigation Bar */}
      <header className={`w-full transition-all duration-300 border-b backdrop-blur-xl ${
        isHome 
          ? 'bg-[#17251B]/95 border-[#C5B49A]/30 text-[#FAF8F5] shadow-lg shadow-black/20' 
          : 'bg-[#F9F7F2]/95 border-[#2D2D2A]/10 text-[#2D2D2A] shadow-xs'
      } ${scrolled ? 'py-2' : 'py-3'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo & Title */}
          <button 
            onClick={() => handleSelectTab('home')}
            onPointerDown={startPress}
            onPointerUp={cancelPress}
            onPointerLeave={cancelPress}
            onPointerCancel={cancelPress}
            onContextMenu={(e) => e.preventDefault()}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0 cursor-pointer select-none"
          >
            <div className={`rounded-full border p-1 flex items-center justify-center shadow-md group-hover:scale-105 transition-all relative shrink-0 ${
              scrolled ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-9 h-9 sm:w-10 sm:h-10'
            } ${
              isHome 
                ? 'bg-[#1C2E20] border-[#C5B49A]/70 group-hover:border-[#E8DAC8]' 
                : 'bg-[#1C2E20] border-[#C5B49A]/50 group-hover:border-[#1C2E20]'
            }`}>
              <UnioLogo size={scrolled ? 22 : 25} color="#E8DAC8" animatedBreathing={true} />
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className={`font-serif tracking-[0.14em] font-bold transition-colors whitespace-nowrap ${
                  scrolled ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
                } ${
                  isHome ? 'text-[#FAF8F5]' : 'text-[#1C2E20] group-hover:text-[#8C7E6A]'
                }`}>
                  UNIO&nbsp;元香
                </span>
                <span className={`text-[9px] tracking-[0.12em] border px-1.5 py-0.2 rounded-full uppercase font-sans shrink-0 hidden xs:inline-block ${
                  isHome 
                    ? 'text-[#E8DAC8] border-[#C5B49A]/40 bg-[#C5B49A]/15' 
                    : 'text-[#8C7E6A] border-[#8C7E6A]/30 bg-[#EFEDE7]'
                }`}>
                  Sanctuary
                </span>
              </div>
              <p className={`text-[9px] tracking-[0.15em] uppercase hidden xl:block font-sans whitespace-nowrap ${
                isHome ? 'text-[#D5CBB9]' : 'text-[#8C7E6A]'
              }`}>
                Pure · Harmony · Life · Scent | {YEAR_RANGE_TEXT}
              </p>
            </div>
          </button>

          {/* Luxury Floating Navigation Navigation Pills (Desktop) */}
          <nav className={`hidden lg:flex items-center gap-1 p-1 rounded-full border shadow-inner transition-all ${
            isHome 
              ? 'bg-[#121E15]/90 border-[#C5B49A]/30' 
              : 'bg-[#EFEDE7] border-[#2D2D2A]/12'
          }`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer group select-none ${
                    isActive
                      ? isHome ? 'text-[#17251B] font-bold' : 'text-[#FAF8F5] font-bold'
                      : isHome 
                        ? 'text-[#E8DAC8]/80 hover:text-[#FAF8F5] hover:bg-white/5' 
                        : 'text-[#2D2D2A]/75 hover:text-[#1C2E20] hover:bg-[#DED9D2]/60'
                  }`}
                >
                  {/* Active Motion Animated Capsule Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeHeaderTabPill"
                      className={`absolute inset-0 rounded-full shadow-md ${
                        isHome 
                          ? 'bg-gradient-to-r from-[#E8DAC8] via-[#F3EBE1] to-[#E8DAC8]' 
                          : 'bg-gradient-to-r from-[#1C2E20] via-[#2D4532] to-[#1C2E20]'
                      }`}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                      isActive 
                        ? isHome ? 'text-[#17251B]' : 'text-[#E8DAC8]'
                        : isHome ? 'text-[#C5B49A]' : 'text-[#8C7E6A]'
                    }`} />
                    
                    {/* Main Label */}
                    <span className="font-serif text-xs tracking-wider whitespace-nowrap">{item.label}</span>

                    {/* Multi-layered Sub-Badge (219款作品 / 元境地标 / 智能调配 etc) */}
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono transition-all border whitespace-nowrap ${
                        isActive 
                          ? isHome 
                            ? 'bg-[#17251B]/15 text-[#17251B] border-[#17251B]/30 font-bold' 
                            : 'bg-[#E8DAC8]/25 text-[#E8DAC8] border-[#E8DAC8]/40 font-bold' 
                          : isHome 
                            ? 'bg-[#C5B49A]/15 text-[#E8DAC8] border-[#C5B49A]/30 group-hover:border-[#C5B49A]' 
                            : 'bg-[#8C7E6A]/12 text-[#8C7E6A] border-[#8C7E6A]/25 group-hover:border-[#8C7E6A]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Secondary Controls: Global Search & Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {!isMobile && (
              <GlobalHeaderSearch
                isHome={isHome}
                onSelectProduct={onSelectProduct}
                onNavigateTab={(tab) => handleSelectTab(tab)}
              />
            )}

            {/* 购物车入口 */}
            <button
              onClick={onOpenCart}
              className={`relative p-2 rounded-full border transition-all active:scale-95 cursor-pointer ${
                isHome
                  ? 'bg-[#1C2E20] border-[#C5B49A]/50 text-[#E8DAC8]'
                  : 'bg-[#EFEDE7] border-[#2D2D2A]/15 text-[#2D2D2A]'
              }`}
              aria-label="打开购物车"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[18px] px-1 rounded-full bg-[#D75437] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile Navigation Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full border transition-all active:scale-95 cursor-pointer ${
                isHome
                  ? 'bg-[#1C2E20] border-[#C5B49A]/50 text-[#E8DAC8]'
                  : 'bg-[#EFEDE7] border-[#2D2D2A]/15 text-[#2D2D2A]'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              className="absolute top-0 right-0 bottom-0 w-[88%] max-w-sm bg-[#121E15] border-l border-[#C5B49A]/30 text-[#FAF8F5] shadow-2xl flex flex-col justify-between overflow-y-auto p-6"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-5 border-b border-[#C5B49A]/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#1C2E20] border border-[#C5B49A]/50 p-1 flex items-center justify-center shadow-xs">
                      <UnioLogo size={24} color="#E8DAC8" animatedBreathing={true} />
              {pressProgress > 0 && (
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r={RING_R} fill="none" stroke="rgba(210,196,173,0.2)" strokeWidth="2.5" />
                  <circle
                    cx="18" cy="18" r={RING_R} fill="none"
                    stroke="#d2c4ad" strokeWidth="2.5" strokeLinecap="round"
                    strokeDasharray={RING_C}
                    strokeDashoffset={ringOffset}
                  />
                </svg>
              )}
                    </div>
                    <div>
                      <h2 className="font-serif text-lg tracking-wider text-[#FAF8F5] font-bold">UNIO 元香</h2>
                      <p className="text-[10px] text-[#C5B49A] font-mono tracking-widest uppercase">WORLD AROMATHERAPY</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-[#E8DAC8] hover:bg-white/10 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav Items List */}
                <div className="py-5 space-y-2.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectTab(item.id)}
                        className={`w-full p-3.5 rounded-2xl flex items-center justify-between transition-all text-left cursor-pointer ${
                          isActive
                            ? 'bg-[#1F3323] border border-[#C5B49A]/60 text-[#E8DAC8] shadow-md'
                            : 'bg-white/5 border border-white/5 text-[#D5CBB9] hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${isActive ? 'bg-[#17251B] text-[#E8DAC8]' : 'bg-white/5 text-[#C5B49A]'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-sm font-bold">{item.label}</span>
                              {item.badge && (
                                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C5B49A]/20 text-[#E8DAC8] border border-[#C5B49A]/30">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-[#C5B49A]/70 font-sans mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#E8DAC8] translate-x-1' : 'text-[#C5B49A]/40'}`} />
                      </button>
                    );
                  })}
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenCart && onOpenCart(); }}
                    className="w-full p-3.5 rounded-2xl flex items-center justify-between transition-all text-left cursor-pointer bg-[#D75437]/15 border border-[#D75437]/30 text-[#E8DAC8]"
                  >
                    <span className="flex items-center gap-3">
                      <ShoppingBag className="w-4 h-4 text-[#D75437]" />
                      <span className="text-sm font-semibold">购物车</span>
                    </span>
                    <span className="flex items-center gap-2">
                      {cartCount > 0 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D75437] text-white font-bold">{cartCount}</span>
                      )}
                      <ChevronRight className="w-4 h-4 opacity-60" />
                    </span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="pt-5 border-t border-[#C5B49A]/20 space-y-3">
                <button
                  onClick={toggleSoundscape}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1F3323] border border-[#C5B49A]/30 text-xs text-[#E8DAC8] flex items-center justify-between font-mono cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-[#C5B49A]" />
                    <span>禅意冥想音效</span>
                  </div>
                  <span className="text-[10px] text-[#C5B49A]">{soundscapePlaying ? '● 播放中' : '已暂停'}</span>
                </button>

                <div className="text-center text-[10px] text-[#C5B49A]/60 font-mono tracking-wider pt-1">
                  UNIO AROMA · 始于2003 · 世界芳疗
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating App Bottom Bar for Quick Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#121E15]/95 backdrop-blur-md border-t border-[#C5B49A]/30 px-2 py-2 flex items-center justify-around shadow-2xl font-sans no-print">
        {navItems.slice(0, 6).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative cursor-pointer ${
                isActive ? 'text-[#E8DAC8]' : 'text-[#C5B49A]/60 hover:text-[#E8DAC8]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110 text-[#E8DAC8]' : ''}`} />
                {isActive && (
                  <motion.span
                    layoutId="mobileBottomDot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E8DAC8]"
                  />
                )}
              </div>
              <span className={`text-[9px] tracking-tight mt-1 ${isActive ? 'font-bold text-[#FAF8F5]' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <SeriesCardHandoverDocModal
        isOpen={handoverOpen}
        onClose={() => setHandoverOpen(false)}
      />
    </div>
  );
};


