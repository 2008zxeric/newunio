import React from 'react';
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
  const navItems = [
    { id: 'home', label: '品牌首页', icon: Home },
    { id: 'collection', label: '馆藏陈列', icon: Grid, badge: '174款' },
    { id: 'atlas', label: '寻香地图', icon: Globe, badge: '92地标' },
    { id: 'ai-consult', label: 'AI 一人一方', icon: Bot, badge: '智能调配' },
    { id: 'story', label: '品牌故事', icon: BookOpen, badge: '23年历程' },
    { id: 'profile', label: '我的', icon: User, badge: '档案' },
    { id: 'admin', label: '后台管理', icon: ShieldCheck },
  ];

  return (
    <>
      {/* Top Founder Tribute Bar */}
      <div className="bg-[#0c120e] text-[#d2c4ad] text-[11px] py-1.5 px-4 text-center border-b border-[#d2c4ad]/20 font-serif flex items-center justify-center gap-2 cursor-pointer hover:bg-[#1a241e] transition-colors"
           onClick={() => setActiveTab('home')}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#d2c4ad] animate-pulse"></span>
        <span className="tracking-widest font-light">“岁岁闻香，岁岁念你” · 敬 品牌创始人 Alice-元红</span>
        <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-white/10 text-[#f6f2eb] hidden sm:inline">2003 - 2026 纪念特辑</span>
      </div>

      <header className="sticky top-0 z-50 bg-[#F9F7F2]/90 backdrop-blur-md border-b border-[#2D2D2A]/10 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tagline */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-[#0c120e] border border-[#d2c4ad]/40 p-1 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform relative">
            <UnioLogo size={28} color="#d2c4ad" animatedBreathing={true} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg tracking-[0.2em] text-[#2D2D2A] font-medium">UNIO 元香</span>
              <span className="text-[10px] tracking-[0.2em] text-[#8C7E6A] border border-[#8C7E6A]/30 px-1.5 py-0.5 rounded-full uppercase font-sans">
                Aroma
              </span>
            </div>
            <p className="text-[10px] text-[#8C7E6A] tracking-[0.15em] uppercase hidden sm:block font-sans">
              Pure · Harmony · Life · Scent | 2003 - 2026
            </p>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#EFEDE7] p-1 rounded-full border border-[#2D2D2A]/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-sans tracking-[0.15em] transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#2D2D2A] text-[#F9F7F2] font-medium shadow-sm'
                    : 'text-[#2D2D2A]/70 hover:text-[#2D2D2A] hover:bg-[#DED9D2]/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] bg-[#8C7E6A]/20 text-[#8C7E6A] border border-[#8C7E6A]/30 px-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Ambient Music & Quick Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSoundscape}
            className={`flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-full border transition-all ${
              soundscapePlaying
                ? 'bg-[#0c120e] border-[#d2c4ad]/60 text-[#d2c4ad] shadow-inner'
                : 'bg-[#EFEDE7] border-[#2D2D2A]/15 text-[#2D2D2A] hover:bg-[#DED9D2]'
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

      {/* Mobile Nav Bar */}
      <div className="flex md:hidden items-center justify-around mt-2 pt-2 border-t border-[#2D2D2A]/10 overflow-x-auto gap-2 text-[11px] no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap px-3 py-1 rounded-full ${
              activeTab === item.id ? 'bg-[#2D2D2A] text-[#F9F7F2] font-medium' : 'text-[#2D2D2A]/70'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
    </>
  );
};
