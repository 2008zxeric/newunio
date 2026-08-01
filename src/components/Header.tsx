import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Home, Sparkles, BookOpen, Layers, Grid, Bot, Music, Printer, Globe, ShieldCheck, User } from 'lucide-react';
import { UnioLogo } from './UnioLogo';

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
  // ── 长按 Logo 环形进度 → 自动打开后台 ──
  const [pressProgress, setPressProgress] = useState(0); // 0~100
  const pressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pressStarted = useRef(false);
  const HOLD_MS = 3000; // 3 秒长按

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

  // SVG 环形进度：周长 2πr，r=20 → C≈125.66
  const RING_R = 20;
  const RING_C = 2 * Math.PI * RING_R;
  const ringOffset = RING_C * (1 - pressProgress / 100);
  const navItems = [
    { id: 'home', label: '品牌首页', icon: Home },
    { id: 'collection', label: '馆藏陈列', icon: Grid, badge: '219款' },
    { id: 'atlas', label: '寻香地图', icon: Globe, badge: '92地标' },
    { id: 'ai-consult', label: 'AI 一人一方', icon: Bot, badge: '智能调配' },
    { id: 'story', label: '品牌故事', icon: BookOpen, badge: '23年历程' },
    { id: 'profile', label: '我的', icon: User, badge: '档案' },
    { id: 'admin', label: '后台管理', icon: ShieldCheck },
  ];

  return (
    <>
      {/* Top Founder Tribute Bar */}
      <div className="bg-gradient-to-r from-[#0c120e] via-[#16221a] to-[#0c120e] text-[#d2c4ad] text-[11px] py-1.5 px-4 text-center border-b border-[#d2c4ad]/20 font-serif flex items-center justify-center gap-2 cursor-pointer hover:bg-[#1a241e] transition-colors shadow-inner"
           onClick={() => setActiveTab('home')}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#d2c4ad] animate-ping" />
        <span className="tracking-widest font-light">“岁岁闻香，岁岁念你” · 敬 品牌创始人 Alice-元红</span>
        <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-white/10 text-[#f6f2eb] hidden sm:inline border border-white/10">2003 - 2026 纪念特辑</span>
      </div>

      <header className="sticky top-0 z-50 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#2D2D2A]/10 px-4 lg:px-8 py-3 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tagline — 长按 3 秒环形闭合 → 打开后台 */}
        <button 
          onClick={() => { if (pressProgress < 100) setActiveTab('home'); }}
          onPointerDown={startPress}
          onPointerUp={cancelPress}
          onPointerLeave={cancelPress}
          onPointerCancel={cancelPress}
          onContextMenu={(e) => e.preventDefault()}
          className="flex items-center gap-3 text-left group focus:outline-none select-none"
          title="长按 3 秒进入后台"
        >
          <div className="w-10 h-10 rounded-full bg-[#0c120e] border border-[#d2c4ad]/40 p-1 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:border-[#d2c4ad] transition-all relative overflow-visible">
            <img src="/logo-cn-gold.png" alt="UNIO 元香" className="w-full h-full object-contain" draggable={false} />
            {/* 长按环形进度 — 环闭合后自动打开后台 */}
            <svg
              viewBox="0 0 44 44"
              className="absolute -inset-1 w-[48px] h-[48px] pointer-events-none"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <circle
                cx="22" cy="22" r={RING_R}
                fill="none"
                stroke="#d2c4ad"
                strokeOpacity="0.2"
                strokeWidth="2"
              />
              <circle
                cx="22" cy="22" r={RING_R}
                fill="none"
                stroke="#d2c4ad"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                strokeDashoffset={ringOffset}
                style={{ transition: 'stroke-dashoffset 50ms linear' }}
              />
            </svg>
            {/* 进度提示 — 长按中显示百分比 */}
            {pressProgress > 0 && pressProgress < 100 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#d2c4ad] text-[#0c120e] text-[9px] font-bold flex items-center justify-center shadow">
                {Math.round(pressProgress / 10)}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg tracking-[0.2em] text-[#2D2D2A] font-medium group-hover:text-[#0c120e] transition-colors">UNIO 元香</span>
              <span className="text-[10px] tracking-[0.2em] text-[#8C7E6A] border border-[#8C7E6A]/30 px-1.5 py-0.5 rounded-full uppercase font-sans bg-[#EFEDE7]">
                Aroma
              </span>
            </div>
            <p className="text-[10px] text-[#8C7E6A] tracking-[0.15em] uppercase hidden sm:block font-sans">
              Pure · Harmony · Life · Scent | 2003 - 2026
            </p>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#EFEDE7] p-1 rounded-full border border-[#2D2D2A]/10 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-sans tracking-[0.15em] transition-all flex items-center gap-2 ${
                  isActive
                    ? 'text-[#F9F7F2] font-medium'
                    : 'text-[#2D2D2A]/70 hover:text-[#2D2D2A] hover:bg-[#DED9D2]/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeHeaderTabPill"
                    className="absolute inset-0 bg-[#2D2D2A] rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full border transition-colors ${
                      isActive 
                        ? 'bg-[#d2c4ad]/30 text-[#d2c4ad] border-[#d2c4ad]/40' 
                        : 'bg-[#8C7E6A]/15 text-[#8C7E6A] border-[#8C7E6A]/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Ambient Music & Quick Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSoundscape}
            className={`flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-full border transition-all active:scale-95 ${
              soundscapePlaying
                ? 'bg-[#0c120e] border-[#d2c4ad] text-[#d2c4ad] shadow-[0_0_12px_rgba(210,196,173,0.3)]'
                : 'bg-[#EFEDE7] border-[#2D2D2A]/15 text-[#2D2D2A] hover:bg-[#DED9D2] hover:border-[#8C7E6A]'
            }`}
            title="开启/关闭 禅意冥想音效"
          >
            {soundscapePlaying ? (
              <div className="flex items-end gap-0.5 h-3.5 w-3.5 pb-0.5">
                <span className="w-0.5 bg-[#d2c4ad] rounded-full animate-pulse h-full" style={{ animationDuration: '0.6s' }} />
                <span className="w-0.5 bg-[#d2c4ad] rounded-full animate-pulse h-2/3" style={{ animationDuration: '0.9s' }} />
                <span className="w-0.5 bg-[#d2c4ad] rounded-full animate-pulse h-4/5" style={{ animationDuration: '0.7s' }} />
              </div>
            ) : (
              <Music className="w-3.5 h-3.5 text-[#8C7E6A]" />
            )}
            <span className="hidden sm:inline font-sans tracking-wider">{soundscapePlaying ? '冥想音与气场中' : '禅意音效'}</span>
          </button>
        </div>

      </div>

      {/* Mobile Nav Bar — 5 个核心 Tab 图标导航（后台管理已由长按 Logo 进入） */}
      <div className="flex md:hidden items-center justify-between mt-2 pt-2 border-t border-[#2D2D2A]/10 gap-1 text-[10px] no-scrollbar px-1">
        {navItems.filter((item) => item.id !== 'admin').map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl min-w-0 flex-1 transition-all ${
                isActive ? 'bg-[#2D2D2A] text-[#F9F7F2] font-medium shadow-xs' : 'text-[#2D2D2A]/70 hover:bg-[#EFEDE7]'
              }`}
            >
              <Icon size={16} className="flex-shrink-0" />
              <span className="whitespace-nowrap leading-none">{item.label.replace('品牌', '').replace('AI 一人一方', 'AI问诊').replace('寻香地图', '寻香').replace('馆藏陈列', '馆藏')}</span>
            </button>
          );
        })}
      </div>
    </header>
    </>
  );
};
