import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, BookOpen, Grid, Bot, Music, Globe, User, Menu, X, ChevronRight, Sparkles, Search } from 'lucide-react';
import { UnioLogo } from './UnioLogo';
import { GlobalHeaderSearch } from './GlobalHeaderSearch';
import { ProductItem } from '../types';
import { YEAR_RANGE_TEXT, CHINESE_YEAR_JOURNEY } from '../utils/brandConstants';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string, subTab?: string) => void;
  soundscapePlaying: boolean;
  toggleSoundscape: () => void;
  onSelectProduct?: (product: ProductItem) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  soundscapePlaying,
  toggleSoundscape,
  onSelectProduct
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = activeTab === 'home';

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

  const navItems = [
    { id: 'home', label: '品牌首页', icon: Home, desc: '始于2003 · 世界芳疗' },
    { id: 'collection', label: '馆藏陈列', icon: Grid, badge: '219款作品', desc: '元/合/生/香 四大系列' },
    { id: 'atlas', label: '寻香地图', icon: Globe, badge: '极境地标', desc: '全球 50 余国极境地标' },
    { id: 'ai-consult', label: '一人一方', icon: Bot, badge: '智能调配', desc: '临床案例量身高定' },
    { id: 'story', label: '品牌故事', icon: BookOpen, badge: `${CHINESE_YEAR_JOURNEY}历程`, desc: 'Alice 创始人手记' },
    { id: 'profile', label: '我的档案', icon: User, badge: '个人', desc: '问诊记录与香藏' },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Brand Tagline Bar */}
      <div 
        className="bg-gradient-to-r from-[#17251B] via-[#1C2E20] to-[#17251B] text-[#E8DAC8] text-[11px] py-1.5 px-4 text-center border-b border-[#C5B49A]/30 font-serif flex items-center justify-center gap-2 cursor-pointer hover:bg-[#1C2E20] transition-colors shadow-inner select-none"
        onClick={() => handleSelectTab('home')}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5B49A] animate-ping shrink-0" />
        <span className="tracking-[0.18em] font-light">“UNIO 撷取芳香，元于一息 2003-2026”</span>
        <span className="text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded bg-white/10 text-[#FAF8F5] hidden sm:inline border border-white/10">Est. 2003</span>
      </div>

      <header className={`sticky top-0 z-40 px-4 lg:px-8 py-3 transition-all duration-300 ${
        isHome 
          ? 'bg-[#17251B]/95 backdrop-blur-md border-b border-[#C5B49A]/30 text-[#FAF8F5]' 
          : 'bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#2D2D2A]/10 text-[#2D2D2A]'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Brand Logo & Tagline */}
          <button 
            onClick={() => handleSelectTab('home')}
            onPointerDown={startPress}
            onPointerUp={cancelPress}
            onPointerLeave={cancelPress}
            onPointerCancel={cancelPress}
            onContextMenu={(e) => e.preventDefault()}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0 select-none"
          >
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border p-1 flex items-center justify-center shadow-sm group-hover:scale-105 transition-all relative shrink-0 ${
              isHome 
                ? 'bg-[#1C2E20] border-[#C5B49A]/60 group-hover:border-[#C5B49A]' 
                : 'bg-[#1C2E20] border-[#C5B49A]/40 group-hover:border-[#C5B49A]'
            }`}>
              <UnioLogo size={26} color="#E8DAC8" animatedBreathing={true} />
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
            <div className="shrink-0">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className={`font-serif text-base sm:text-lg tracking-[0.12em] font-semibold transition-colors whitespace-nowrap ${
                  isHome ? 'text-[#FAF8F5]' : 'text-[#1C2E20] group-hover:text-[#2D2D2A]'
                }`}>
                  UNIO&nbsp;元香
                </span>
                <span className={`text-[9px] sm:text-[10px] tracking-[0.12em] border px-1.5 py-0.5 rounded-full uppercase font-sans shrink-0 ${
                  isHome 
                    ? 'text-[#E8DAC8] border-[#C5B49A]/40 bg-[#C5B49A]/15' 
                    : 'text-[#8C7E6A] border-[#8C7E6A]/30 bg-[#EFEDE7]'
                }`}>
                  Aroma
                </span>
              </div>
              <p className={`text-[10px] tracking-[0.15em] uppercase hidden sm:block font-sans whitespace-nowrap ${
                isHome ? 'text-[#D5CBB9]' : 'text-[#8C7E6A]'
              }`}>
                Pure · Harmony · Life · Scent | {YEAR_RANGE_TEXT}
              </p>
            </div>
          </button>

          {/* Navigation Tabs - Desktop */}
          <nav className={`hidden md:flex items-center gap-1 p-1 rounded-full border shadow-inner ${
            isHome 
              ? 'bg-[#1C2E20] border-[#C5B49A]/30' 
              : 'bg-[#EFEDE7] border-[#2D2D2A]/10'
          }`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-sans tracking-[0.12em] transition-all flex items-center gap-1.5 ${
                    isActive
                      ? isHome ? 'text-[#17251B] font-semibold' : 'text-[#FAF8F5] font-semibold'
                      : isHome ? 'text-[#E8DAC8]/80 hover:text-[#FAF8F5] hover:bg-white/5' : 'text-[#2D2D2A]/70 hover:text-[#2D2D2A] hover:bg-[#DED9D2]/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeHeaderTabPill"
                      className={`absolute inset-0 rounded-full shadow-sm ${
                        isHome ? 'bg-[#E8DAC8]' : 'bg-[#1C2E20]'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full border transition-colors ${
                        isActive 
                          ? isHome ? 'bg-[#17251B]/20 text-[#17251B] border-[#17251B]/30' : 'bg-[#E8DAC8]/30 text-[#E8DAC8] border-[#E8DAC8]/40' 
                          : isHome ? 'bg-[#C5B49A]/20 text-[#E8DAC8] border-[#C5B49A]/30' : 'bg-[#8C7E6A]/15 text-[#8C7E6A] border-[#8C7E6A]/30'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Global Search, Soundscape Music & Mobile Hamburger Trigger */}
          <div className="flex items-center gap-2">
            <GlobalHeaderSearch
              isHome={isHome}
              onSelectProduct={onSelectProduct}
              onNavigateTab={(tab, subTab) => handleSelectTab(tab)}
            />

            <button
              onClick={toggleSoundscape}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all active:scale-95 ${
                soundscapePlaying
                  ? 'bg-[#1C2E20] border-[#C5B49A] text-[#E8DAC8] shadow-[0_0_12px_rgba(197,180,154,0.3)]'
                  : isHome
                    ? 'bg-[#1C2E20] border-[#C5B49A]/40 text-[#E8DAC8] hover:border-[#C5B49A]'
                    : 'bg-[#EFEDE7] border-[#2D2D2A]/15 text-[#2D2D2A] hover:bg-[#DED9D2] hover:border-[#8C7E6A]'
              }`}
              title="开启/关闭 禅意冥想音效"
            >
              {soundscapePlaying ? (
                <div className="flex items-end gap-0.5 h-3.5 w-3.5 pb-0.5">
                  <span className="w-0.5 bg-[#E8DAC8] rounded-full animate-pulse h-full" style={{ animationDuration: '0.6s' }} />
                  <span className="w-0.5 bg-[#E8DAC8] rounded-full animate-pulse h-2/3" style={{ animationDuration: '0.9s' }} />
                  <span className="w-0.5 bg-[#E8DAC8] rounded-full animate-pulse h-4/5" style={{ animationDuration: '0.7s' }} />
                </div>
              ) : (
                <Music className={`w-3.5 h-3.5 ${isHome ? 'text-[#C5B49A]' : 'text-[#8C7E6A]'}`} />
              )}
              <span className="font-sans tracking-wider text-[11px] hidden sm:inline">{soundscapePlaying ? '音步疗愈中' : '禅意音效'}</span>
            </button>

            {/* Mobile Menu Trigger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-full border transition-all active:scale-95 ${
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
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#17251B] border-l border-[#C5B49A]/30 text-[#FAF8F5] shadow-2xl flex flex-col justify-between overflow-y-auto p-6"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-[#C5B49A]/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#1C2E20] border border-[#C5B49A]/50 p-1 flex items-center justify-center">
                      <UnioLogo size={24} color="#E8DAC8" animatedBreathing={true} />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg tracking-wider text-[#FAF8F5]">UNIO 元香</h2>
                      <p className="text-[10px] text-[#C5B49A] font-mono tracking-widest">WORLD AROMATHERAPY</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full bg-white/5 border border-white/10 text-[#E8DAC8] hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav Items List */}
                <div className="py-6 space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectTab(item.id)}
                        className={`w-full p-3.5 rounded-2xl flex items-center justify-between transition-all text-left ${
                          isActive
                            ? 'bg-[#233827] border border-[#C5B49A]/60 text-[#E8DAC8] shadow-md'
                            : 'bg-white/5 border border-white/5 text-[#D5CBB9] hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${isActive ? 'bg-[#17251B] text-[#E8DAC8]' : 'bg-white/5 text-[#C5B49A]'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-sm font-medium">{item.label}</span>
                              {item.badge && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#C5B49A]/20 text-[#E8DAC8] border border-[#C5B49A]/30">
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
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="pt-6 border-t border-[#C5B49A]/20 space-y-3">
                <button
                  onClick={toggleSoundscape}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#233827] border border-[#C5B49A]/30 text-xs text-[#E8DAC8] flex items-center justify-between font-mono"
                >
                  <div className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-[#C5B49A]" />
                    <span>禅意冥想音效</span>
                  </div>
                  <span className="text-[10px] text-[#C5B49A]">{soundscapePlaying ? '● 播放中' : '已暂停'}</span>
                </button>

                <div className="text-center text-[10px] text-[#C5B49A]/60 font-mono tracking-wider pt-2">
                  UNIO AROMA · 始于2003 · 世界芳疗
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating App Bottom Bar for Quick Mobile Access */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#17251B]/95 backdrop-blur-md border-t border-[#C5B49A]/30 px-2 py-2 flex items-center justify-around shadow-2xl font-sans">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
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
              <span className={`text-[10px] tracking-tight mt-1 ${isActive ? 'font-medium text-[#FAF8F5]' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
};

