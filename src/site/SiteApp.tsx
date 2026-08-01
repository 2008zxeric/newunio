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
import { FloatingSocialDock } from '../components/FloatingSocialDock';
import { AmbientSoundscape } from '../components/AmbientSoundscape';
import { SiteAtlas } from '../components/SiteAtlas';
import { ProductItem } from '../types';

type TabKey = 'home' | 'collection' | 'atlas' | 'ai-consult' | 'story' | 'profile' | 'book';

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
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2D2D2A]/10 bg-[#EFEDE7] py-12 px-4 text-xs text-[#2D2D2A]/80 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#2D2D2A] text-[#F9F7F2] font-serif font-light text-xs flex items-center justify-center">U</span>
              <span className="font-serif text-base text-[#2D2D2A] font-semibold tracking-wider">UNIO 元香</span>
            </div>
            <p className="text-[11px] leading-relaxed font-light text-[#2D2D2A]/70">
              始于 2003 年。一套从真实芳疗记录、全球原料与长期配方中生长出来的精品香气体系。
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={() => handleSetTab('profile')}
                className="px-3 py-1 rounded-full bg-[#2D2D2A] text-[#d2c4ad] text-[11px] font-serif hover:bg-[#8C7E6A] hover:text-white transition-all"
              >
                我的健康与订单档案
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[#2D2D2A] font-serif font-semibold block uppercase tracking-[0.2em] text-[11px]">馆藏陈列</span>
            <ul className="space-y-1 text-[11px] text-[#2D2D2A]/70">
              <li><button onClick={() => handleSetTab('collection')} className="hover:text-[#8C7E6A] transition-colors">元 · 单方精油与基础油</button></li>
              <li><button onClick={() => handleSetTab('collection')} className="hover:text-[#8C7E6A] transition-colors">合 · 身心灵协同复方</button></li>
              <li><button onClick={() => handleSetTab('collection')} className="hover:text-[#8C7E6A] transition-colors">生 · 有机植物纯露水相</button></li>
              <li><button onClick={() => handleSetTab('collection')} className="hover:text-[#8C7E6A] transition-colors">香 · 空间与器物黑岩扩香</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-[#2D2D2A] font-serif font-semibold block uppercase tracking-[0.2em] text-[11px]">品牌体验与社区</span>
            <ul className="space-y-1 text-[11px] text-[#2D2D2A]/70">
              <li><button onClick={() => handleSetTab('story')} className="hover:text-[#8C7E6A] transition-colors">品牌故事与 40 页全景手册</button></li>
              <li><button onClick={() => handleSetTab('atlas')} className="hover:text-[#8C7E6A] transition-colors">寻香地图 (50余国92地标)</button></li>
              <li><button onClick={() => handleSetTab('ai-consult')} className="hover:text-[#8C7E6A] transition-colors">AI 一人一方智能调配</button></li>
              <li><button onClick={() => handleSetTab('profile')} className="hover:text-[#8C7E6A] transition-colors">我的健康与香气档案</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-[#2D2D2A] font-serif font-semibold block uppercase tracking-[0.2em] text-[11px]">寻香工作室与联络</span>
            <p className="text-[11px] text-[#2D2D2A]/70">成都 · 西南起点</p>
            <p className="text-[11px] text-[#2D2D2A]/70">宁波 · 海风据点</p>
            <p className="text-[11px] text-[#2D2D2A]/70">小红书官方号: UNIO元香 (UNIO_AROMA)</p>
            <p className="text-[11px] text-[#8C7E6A] font-mono pt-1">unioaroma.com</p>
            <button
              onClick={() => navigate('/admin')}
              className="mt-2 text-[10px] px-3 py-1 rounded-full bg-[#2D2D2A] text-[#F9F7F2] hover:bg-[#8C7E6A] transition-colors"
            >
              管理后台入口
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-[#2D2D2A]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#2D2D2A]/60">
          <div className="flex items-center gap-2">
            <span>COA & MSDS 全系检验报告归档 | Pure · Harmony · Life · Scent</span>
          </div>
          <div className="flex items-center gap-4">
            <span>© 2003 - 2026 UNIO 元香 (UNIO AROMA)</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#DED9D2] hover:bg-[#2D2D2A] text-[#2D2D2A] hover:text-[#F9F7F2] transition-colors"
              title="回到顶部"
            >
              ↑
            </button>
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
