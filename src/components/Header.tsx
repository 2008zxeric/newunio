import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, BookOpen, Grid, Bot, Music, Globe, User, Menu, X } from 'lucide-react';
import { UnioLogo } from './UnioLogo';
import { YEAR_RANGE_TEXT, CHINESE_YEAR_JOURNEY } from '../utils/brandConstants';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  soundscapePlaying: boolean;
  toggleSoundscape: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  soundscapePlaying,
  toggleSoundscape
}) => {
  const isHome = activeTab === 'home';
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // ── 长按 Logo 环形进度 → 自动打开后台（3 秒）──
  const [pressProgress, setPressProgress] = useState(0); // 0~100
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
        // 环闭合 → 自动打开后台
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

  // SVG 环形进度：周长 2πr，r=14 → C≈87.96
  const RING_R = 14;
  const RING_C = 2 * Math.PI * RING_R;
  const ringOffset = RING_C * (1 - pressProgress / 100);

  const navItems = [
    { id: 'home', label: '品牌首页', icon: Home, desc: 'UNIO 元香 精品芳疗' },
    { id: 'collection', label: '馆藏陈列', icon: Grid, badge: '219款', desc: '全系调配档案' },
    { id: 'atlas', label: '寻香地图', icon: Globe, badge: '92地标', desc: '全球极境原产地' },
    { id: 'ai-consult', label: 'AI 一人一方', icon: Bot, badge: '智能调配', desc: '临床级专属配方' },
    { id: 'story', label: '品牌故事', icon: BookOpen, badge: `${CHINESE_YEAR_JOURNEY}历程`, desc: 'Alice 创始人手记' },
    { id: 'profile', label: '我的', icon: User, badge: '档案', desc: '健康与香气档案' },
  ];

  // 移动端底部悬浮栏只保留 5 个核心入口
  const bottomNavItems = navItems.filter((item) => ['home', 'collection', 'atlas', 'ai-consult', 'story'].includes(item.id));

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    setMobileDrawerOpen(false);
  };

  return (
    <>
      {/* Top Brand Tagline Bar */}
      <div 
        className="bg-[#1C2E20] text-[#E8DAC8] text-[11px] py-1.5 px-4 text-center border-b border-[#C5B49A]/30 font-serif flex items-center justify-center gap-2 cursor-pointer hover:bg-[#243b28] transition-colors shadow-inner select-none"
        onClick={() => handleNav('home')}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#E8DAC8] animate-ping shrink-0" />
        <span className="tracking-[0.2em] font-light">“UNIO 撷取芳香，元于一息 {YEAR_RANGE_TEXT}”</span>
        <span className="text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded bg-[#E8DAC8]/15 text-[#E8DAC8] hidden sm:inline border border-[#C5B49A]/30">Est. 2003</span>
      </div>

      <header className={`sticky top-0 z-40 px-4 lg:px-8 py-3 transition-all duration-300 ${
        isHome 
          ? 'bg-[#F5EFE6]/95 backdrop-blur-md border-b border-[#C5B49A]/40' 
          : 'bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#2D2D2A]/10'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo & Tagline — 长按 3 秒环形闭合进后台 */}
          <button 
            onClick={() => handleNav('home')}
            onPointerDown={startPress}
            onPointerUp={cancelPress}
            onPointerLeave={cancelPress}
            onPointerCancel={cancelPress}
            onContextMenu={(e) => e.preventDefault()}
            className="flex items-center gap-2 sm:gap-3 text-left group focus:outline-none shrink-0 select-none"
          >
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border p-1 flex items-center justify-center shadow-sm group-hover:scale-105 transition-all relative shrink-0 ${
              isHome 
                ? 'bg-[#1C2E20] border-[#C5B49A]/60 group-hover:border-[#C5B49A]' 
                : 'bg-[#0c120e] border-[#C5B49A]/40 group-hover:border-[#C5B49A]'
            }`}>
              <UnioLogo size={26} color="#E8DAC8" animatedBreathing={true} />
              {/* 长按环形进度 */}
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
              <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                <span className={`font-serif text-base sm:text-lg tracking-[0.12em] sm:tracking-[0.2em] font-semibold transition-colors whitespace-nowrap ${
                  isHome ? 'text-[#1C2E20]' : 'text-[#2D2D2A] group-hover:text-[#0c120e]'
                }`}>
                  UNIO&nbsp;元香
                </span>
                <span className={`text-[9px] sm:text-[10px] tracking-[0.12em] border px-1.5 py-0.5 rounded-full uppercase font-sans shrink-0 ${
                  isHome 
                    ? 'text-[#8C7E6A] border-[#8C7E6A]/40 bg-[#E8DAC8]/50' 
                    : 'text-[#8C7E6A] border-[#8C7E6A]/30 bg-[#EFEDE7]'
                }`}>
                  Aroma
                </span>
              </div>
              <p className={`text-[10px] tracking-[0.15em] uppercase hidden sm:block font-sans whitespace-nowrap ${
                isHome ? 'text-[#8C7E6A]' : 'text-[#8C7E6A]'
              }`}>
                Pure · Harmony · Life · Scent | {YEAR_RANGE_TEXT}
              </p>
            </div>
          </button>

          {/* Navigation Tabs - Desktop */}
          <nav className={`hidden md:flex items-center gap-1 p-1 rounded-full border shadow-inner ${
            isHome 
              ? 'bg-[#E8DAC8]/40 border-[#C5B49A]/40' 
              : 'bg-[#EFEDE7] border-[#2D2D2A]/10'
          }`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-sans tracking-[0.15em] transition-all flex items-center gap-2 ${
                    isActive
                      ? isHome ? 'text-[#F5EFE6] font-medium' : 'text-[#F9F7F2] font-medium'
                      : isHome ? 'text-[#1C2E20]/70 hover:text-[#1C2E20] hover:bg-[#E8DAC8]/60' : 'text-[#2D2D2A]/70 hover:text-[#2D2D2A] hover:bg-[#DED9D2]/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeHeaderTabPill"
                      className={`absolute inset-0 rounded-full shadow-sm ${
                        isHome ? 'bg-[#1C2E20]' : 'bg-[#2D2D2A]'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full border transition-colors ${
                        isActive 
                          ? isHome ? 'bg-[#F5EFE6]/20 text-[#F5EFE6] border-[#F5EFE6]/30' : 'bg-[#d2c4ad]/30 text-[#d2c4ad] border-[#d2c4ad]/40' 
                          : isHome ? 'bg-[#8C7E6A]/15 text-[#8C7E6A] border-[#8C7E6A]/30' : 'bg-[#8C7E6A]/15 text-[#8C7E6A] border-[#8C7E6A]/30'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Soundscape + Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSoundscape}
              className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border transition-all active:scale-95 ${
                soundscapePlaying
                  ? 'bg-[#1C2E20] border-[#C5B49A] text-[#E8DAC8] shadow-[0_0_12px_rgba(197,180,154,0.35)]'
                  : isHome
                    ? 'bg-[#E8DAC8]/50 border-[#C5B49A]/50 text-[#1C2E20] hover:border-[#C5B49A]'
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
                <Music className={`w-3.5 h-3.5 ${isHome ? 'text-[#1C2E20]' : 'text-[#8C7E6A]'}`} />
              )}
              <span className="font-sans tracking-wider text-[11px] sm:text-xs hidden sm:inline">{soundscapePlaying ? '音步疗愈中' : '禅意音效'}</span>
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileDrawerOpen((prev) => !prev)}
              className={`md:hidden flex items-center justify-center w-9 h-9 rounded-full border transition-all active:scale-95 ${
                mobileDrawerOpen
                  ? 'bg-[#1C2E20] border-[#C5B49A] text-[#E8DAC8]'
                  : isHome
                    ? 'bg-[#E8DAC8]/50 border-[#C5B49A]/50 text-[#1C2E20]'
                    : 'bg-[#EFEDE7] border-[#2D2D2A]/15 text-[#2D2D2A]'
              }`}
              aria-label={mobileDrawerOpen ? '关闭菜单' : '打开菜单'}
            >
              {mobileDrawerOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-[#0c120e]/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileDrawerOpen(false)}
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[82%] max-w-sm bg-[#F9F7F2] border-l border-[#C5B49A]/40 shadow-2xl md:hidden flex flex-col overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#2D2D2A]/10 bg-[#1C2E20]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#F5EFE6] border border-[#C5B49A]/60 p-1 flex items-center justify-center">
                      <UnioLogo size={24} color="#1C2E20" />
                    </div>
                    <div>
                      <div className="font-serif text-[#E8DAC8] text-sm tracking-[0.15em] font-semibold">UNIO 元香</div>
                      <div className="text-[9px] text-[#C5B49A] font-mono tracking-widest uppercase">Aroma Sanctuary · {YEAR_RANGE_TEXT}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="w-8 h-8 rounded-full bg-[#E8DAC8]/15 border border-[#C5B49A]/40 text-[#E8DAC8] flex items-center justify-center hover:bg-[#E8DAC8]/30 transition-colors"
                    aria-label="关闭菜单"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Drawer Nav Items */}
              <nav className="flex-1 p-4 space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all text-left ${
                        isActive
                          ? 'bg-[#1C2E20] text-[#E8DAC8] shadow-md'
                          : 'bg-[#EFEDE7] text-[#2D2D2A]/85 hover:bg-[#E8DAC8]/60 hover:text-[#1C2E20]'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-[#E8DAC8]/20 text-[#E8DAC8]' : 'bg-[#1C2E20]/10 text-[#1C2E20]'
                      }`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${isActive ? 'text-[#E8DAC8]' : 'text-[#2D2D2A]'}`}>{item.label}</span>
                          {item.badge && (
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${
                              isActive ? 'bg-[#E8DAC8]/20 text-[#E8DAC8] border-[#C5B49A]/40' : 'bg-[#8C7E6A]/10 text-[#8C7E6A] border-[#8C7E6A]/30'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.desc && (
                          <div className={`text-[10px] mt-0.5 truncate ${isActive ? 'text-[#C5B49A]' : 'text-[#2D2D2A]/50'}`}>
                            {item.desc}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Drawer Footer: Soundscape Control */}
              <div className="p-4 border-t border-[#2D2D2A]/10 bg-[#EFEDE7]">
                <button
                  onClick={toggleSoundscape}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border text-xs font-sans tracking-wider transition-all active:scale-95 ${
                    soundscapePlaying
                      ? 'bg-[#1C2E20] border-[#C5B49A] text-[#E8DAC8]'
                      : 'bg-[#F9F7F2] border-[#2D2D2A]/15 text-[#2D2D2A]'
                  }`}
                >
                  <Music className="w-3.5 h-3.5" />
                  {soundscapePlaying ? '禅意冥想音效播放中' : '开启禅意冥想音效'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating App Bottom Navigation Bar for Mobile Phones (核心5入口) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-[#1C2E20]/95 backdrop-blur-md border-t border-[#C5B49A]/30 px-1 py-1.5 flex items-center justify-around shadow-2xl font-sans">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
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
              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-medium text-[#F5EFE6]' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
};
