import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { BrandBookViewer } from './components/BrandBookViewer';
import { SeriesShowcase } from './components/SeriesShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AIScentConsultant } from './components/AIScentConsultant';
import { AmbientSoundscape } from './components/AmbientSoundscape';
import { PosterExporter } from './components/PosterExporter';
import { SiteAtlas } from './components/SiteAtlas';
import { AdminConsole } from './components/AdminConsole';
import { ProductItem } from './types';
import { ShieldCheck, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('brand-book');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [soundscapePlaying, setSoundscapePlaying] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#2D2D2A] font-sans flex flex-col selection:bg-[#2D2D2A] selection:text-[#F9F7F2]">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundscapePlaying={soundscapePlaying}
        toggleSoundscape={() => setSoundscapePlaying((prev) => !prev)}
      />

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
      <main className="flex-1 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {activeTab === 'brand-book' && (
              <BrandBookViewer
                onSelectProduct={(p) => setSelectedProduct(p)}
                onNavigateToCatalog={() => setActiveTab('catalog')}
              />
            )}

            {activeTab === 'series' && (
              <SeriesShowcase
                onSelectProduct={(p) => setSelectedProduct(p)}
                onNavigateToCatalog={() => setActiveTab('catalog')}
              />
            )}

            {activeTab === 'catalog' && (
              <ProductCatalog
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
            )}

            {activeTab === 'atlas' && (
              <SiteAtlas
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
            )}

            {activeTab === 'ai-consult' && (
              <AIScentConsultant />
            )}

            {activeTab === 'poster-export' && (
              <PosterExporter />
            )}

            {activeTab === 'admin' && (
              <AdminConsole />
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
          </div>

          <div className="space-y-2">
            <span className="text-[#2D2D2A] font-serif font-semibold block uppercase tracking-[0.2em] text-[11px]">四大系列</span>
            <ul className="space-y-1 text-[11px] text-[#2D2D2A]/70">
              <li><button onClick={() => setActiveTab('series')} className="hover:text-[#8C7E6A] transition-colors">元 · 单方精油/基础油</button></li>
              <li><button onClick={() => setActiveTab('series')} className="hover:text-[#8C7E6A] transition-colors">合 · 协同复方</button></li>
              <li><button onClick={() => setActiveTab('series')} className="hover:text-[#8C7E6A] transition-colors">生 · 有机纯露</button></li>
              <li><button onClick={() => setActiveTab('series')} className="hover:text-[#8C7E6A] transition-colors">香 · 空间与器物</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-[#2D2D2A] font-serif font-semibold block uppercase tracking-[0.2em] text-[11px]">功能导航</span>
            <ul className="space-y-1 text-[11px] text-[#2D2D2A]/70">
              <li><button onClick={() => setActiveTab('brand-book')} className="hover:text-[#8C7E6A] transition-colors">品牌手册 (25页排版)</button></li>
              <li><button onClick={() => setActiveTab('catalog')} className="hover:text-[#8C7E6A] transition-colors">174款调配档案检索</button></li>
              <li><button onClick={() => setActiveTab('ai-consult')} className="hover:text-[#8C7E6A] transition-colors">AI 一人一方调配引擎</button></li>
              <li><button onClick={() => setActiveTab('poster-export')} className="hover:text-[#8C7E6A] transition-colors">宣传画报定制与导出</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-[#2D2D2A] font-serif font-semibold block uppercase tracking-[0.2em] text-[11px]">寻香工作室</span>
            <p className="text-[11px] text-[#2D2D2A]/70">成都 · 西南起点</p>
            <p className="text-[11px] text-[#2D2D2A]/70">宁波 · 海风据点</p>
            <p className="text-[11px] text-[#2D2D2A]/70">泰国 · 芭提雅观察点</p>
            <p className="text-[11px] text-[#8C7E6A] font-mono pt-1">unioaroma.com</p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-[#2D2D2A]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#2D2D2A]/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8C7E6A]" />
            <span>COA & MSDS 全系检验报告归档 | Pure · Harmony · Life · Scent</span>
          </div>

          <div className="flex items-center gap-4">
            <span>© 2003 - 2026 UNIO 元香 (UNIO AROMA)</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#DED9D2] hover:bg-[#2D2D2A] text-[#2D2D2A] hover:text-[#F9F7F2] transition-colors"
              title="回到顶部"
            >
              <ArrowUp className="w-3.5 h-3.5" />
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
}
