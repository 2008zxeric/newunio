/**
 * UNIO AROMA 前台主入口 v4 — 品牌官网（最新设计稿）
 * 整合：品牌首页 / 馆藏陈列 / 寻香地图 / AI问诊 / 品牌故事 / 我的档案 + 完整后台
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { SiteHome } from '../components/SiteHome';
import { BrandStory } from '../components/BrandStory';
import { ProductCatalog } from '../components/ProductCatalog';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { AIScentConsultant } from '../components/AIScentConsultant';
import { UserProfileView } from '../components/UserProfileView';
import { BrandBookViewer } from '../components/BrandBookViewer';
import { PosterExporter } from '../components/PosterExporter';
import { FloatingSocialDock } from '../components/FloatingSocialDock';
import { AmbientSoundscape } from '../components/AmbientSoundscape';
import { SiteAtlas } from '../components/SiteAtlas';
import { ProductItem } from '../types';
import { ArrowUp } from 'lucide-react';

type TabKey = 'home' | 'collection' | 'atlas' | 'ai-consult' | 'story' | 'profile' | 'book' | 'poster';

const SiteApp: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [soundscapePlaying, setSoundscapePlaying] = useState<boolean>(false);
  const [initialSeries, setInitialSeries] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 处理 Tab 切换（后台特殊处理 → 跳转 /admin 完整后台）
  // 支持 'collection:yuan' 等带系列参数的跳转（首页四大系列卡片）
  const handleSetTab = (tab: string) => {
    if (tab === 'admin') {
      navigate('/admin');
      return;
    }
    if (tab.startsWith('collection:')) {
      const series = tab.split(':')[1];
      setInitialSeries(series);
      setActiveTab('collection');
      scrollToTop();
      return;
    }
    if (tab === 'collection') {
      setInitialSeries(null);
      setActiveTab('collection');
      scrollToTop();
      return;
    }
    setActiveTab(tab as TabKey);
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#2D2D2A] font-sans flex flex-col selection:bg-[#2D2D2A] selection:text-[#F9F7F2] relative">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleSetTab}
        soundscapePlaying={soundscapePlaying}
        toggleSoundscape={() => setSoundscapePlaying((prev) => !prev)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Floating Social & Fast Access Dock */}
      <FloatingSocialDock onNavigateTab={handleSetTab} />

      {/* Soundscape Control Widget */}
      {soundscapePlaying && (
        <div className="max-w-7xl mx-auto px-4 w-full pt-4">
          <AmbientSoundscape
            isPlaying={soundscapePlaying}
            onTogglePlay={() => setSoundscapePlaying((prev) => !prev)}
          />
        </div>
      )}

      {/* Main View Container */}
      <main className="flex-1 pb-16 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 1.01 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {activeTab === 'home' && (
              <SiteHome
                onSelectProduct={(p) => setSelectedProduct(p)}
                onNavigateTab={handleSetTab}
              />
            )}

            {activeTab === 'story' && (
              <BrandStory
                onSelectProduct={(p) => setSelectedProduct(p)}
                onNavigateToCatalog={() => handleSetTab('collection')}
              />
            )}

            {activeTab === 'collection' && (
              <ProductCatalog
                key={`collection-${initialSeries || 'all'}`}
                onSelectProduct={(p) => setSelectedProduct(p)}
                initialSeries={initialSeries}
              />
            )}

            {activeTab === 'atlas' && (
              <SiteAtlas
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
            )}

            {activeTab === 'ai-consult' && (
              <AIScentConsultant
                onNavigateProfile={() => handleSetTab('profile')}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onNavigateTab={handleSetTab}
              />
            )}

            {activeTab === 'profile' && (
              <UserProfileView
                onSelectProduct={(p) => setSelectedProduct(p)}
                onNavigateTab={handleSetTab}
              />
            )}

            {activeTab === 'book' && (
              <BrandBookViewer
                onSelectProduct={(p) => setSelectedProduct(p)}
                onNavigateToCatalog={() => handleSetTab('collection')}
              />
            )}

            {activeTab === 'poster' && (
              <PosterExporter />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* High-End Minimalist Footer */}
      <footer className="border-t border-[#2D2D2A]/15 bg-[#EFEDE7] pt-10 pb-12 px-4 sm:px-6 text-xs text-[#2D2D2A]/80 font-sans">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Main Footer Grid: 2 Cols on Mobile, 4 Cols on Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 border-b border-[#2D2D2A]/10 pb-8">
            
            {/* Brand Intro Column - Full width on mobile */}
            <div className="col-span-2 sm:col-span-2 md:col-span-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#0c120e] text-[#d2c4ad] font-serif font-semibold text-xs flex items-center justify-center shrink-0 border border-[#d2c4ad]/40 shadow-xs">
                  U
                </span>
                <div>
                  <span className="font-serif text-base text-[#2D2D2A] font-semibold tracking-wider block leading-none">
                    UNIO&nbsp;元香
                  </span>
                  <span className="font-mono text-[9px] text-[#8C7E6A] tracking-widest uppercase">
                    Aroma Sanctuary · 2003
                  </span>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed font-light text-[#2D2D2A]/75 max-w-sm">
                始于 2003 年。一套从真实芳疗记录、全球 50 国原料与长期配方中生长出来的精品香气体系。
              </p>
              <div className="pt-1">
                <button 
                  onClick={() => handleSetTab('profile')}
                  className="px-3.5 py-1.5 rounded-full bg-[#2D2D2A] text-[#d2c4ad] text-[10px] font-mono tracking-wider hover:bg-[#0c120e] transition-all inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>我的健康与订单档案</span>
                  <span className="opacity-60 text-[9px]">/ Profile</span>
                </button>
              </div>
            </div>

            {/* Col 1: Collection */}
            <div className="space-y-2.5">
              <div className="border-b border-[#2D2D2A]/10 pb-1.5">
                <span className="text-[#2D2D2A] font-serif font-semibold block text-[12px] tracking-wide">
                  馆藏陈列
                </span>
                <span className="text-[9px] font-mono text-[#8C7E6A] uppercase tracking-widest block">
                  Collections
                </span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-[#2D2D2A]/75">
                <li><button onClick={() => handleSetTab('collection')} className="hover:text-[#8C7E6A] transition-colors text-left">元 · 单方精油与基础油</button></li>
                <li><button onClick={() => handleSetTab('collection')} className="hover:text-[#8C7E6A] transition-colors text-left">合 · 身心灵协同复方</button></li>
                <li><button onClick={() => handleSetTab('collection')} className="hover:text-[#8C7E6A] transition-colors text-left">生 · 有机植物纯露水相</button></li>
                <li><button onClick={() => handleSetTab('collection')} className="hover:text-[#8C7E6A] transition-colors text-left">香 · 空间黑岩扩香器物</button></li>
              </ul>
            </div>

            {/* Col 2: Experience & Community */}
            <div className="space-y-2.5">
              <div className="border-b border-[#2D2D2A]/10 pb-1.5">
                <span className="text-[#2D2D2A] font-serif font-semibold block text-[12px] tracking-wide">
                  品牌体验
                </span>
                <span className="text-[9px] font-mono text-[#8C7E6A] uppercase tracking-widest block">
                  Experience
                </span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-[#2D2D2A]/75">
                <li><button onClick={() => handleSetTab('story')} className="hover:text-[#8C7E6A] transition-colors text-left">品牌故事与品牌画册</button></li>
                <li><button onClick={() => handleSetTab('atlas')} className="hover:text-[#8C7E6A] transition-colors text-left">寻香地图 (50余国92地标)</button></li>
                <li><button onClick={() => handleSetTab('ai-consult')} className="hover:text-[#8C7E6A] transition-colors text-left">AI 一人一方智能调配</button></li>
                <li><button onClick={() => handleSetTab('profile')} className="hover:text-[#8C7E6A] transition-colors text-left">我的健康与香气档案</button></li>
              </ul>
            </div>

            {/* Col 3: Atelier & Contact */}
            <div className="col-span-2 sm:col-span-1 space-y-2.5">
              <div className="border-b border-[#2D2D2A]/10 pb-1.5">
                <span className="text-[#2D2D2A] font-serif font-semibold block text-[12px] tracking-wide">
                  工作室与联络
                </span>
                <span className="text-[9px] font-mono text-[#8C7E6A] uppercase tracking-widest block">
                  Atelier & Contact
                </span>
              </div>
              <div className="space-y-1.5 text-[11px] text-[#2D2D2A]/75">
                <p>成都 · 西南起点 <span className="font-mono text-[9px] text-[#8C7E6A] ml-1">Chengdu</span></p>
                <p>宁波 · 海风据点 <span className="font-mono text-[9px] text-[#8C7E6A] ml-1">Ningbo</span></p>
                <p className="pt-0.5">小红书: <span className="font-medium text-[#2D2D2A]">UNIO元香</span> <span className="font-mono text-[9px] text-[#8C7E6A] block sm:inline">(UNIO_AROMA)</span></p>
                <p className="font-mono text-[10px] text-[#8C7E6A] font-medium pt-1 tracking-wider">unioaroma.com</p>
              </div>
            </div>

          </div>

          {/* Footer Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#2D2D2A]/60 font-sans pt-2">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span>COA & MSDS 全系检验报告归档 | Pure · Harmony · Life · Scent</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-[#8C7E6A]">© 2003 - 2026 UNIO AROMA</span>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-full bg-[#DED9D2] hover:bg-[#2D2D2A] text-[#2D2D2A] hover:text-[#F9F7F2] transition-colors shadow-xs"
                title="回到顶部"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
};

export default SiteApp;
