import React, { useState, useEffect } from 'react';
import { SERIES_META } from '../data/catalogData';
import { fetchProductsFromSupabase } from '../data/siteDataService';
import { SeriesKey, ProductItem } from '../types';
import { getPrimaryUsage } from '../utils/productUsage';
import { Sparkles, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface SeriesShowcaseProps {
  onSelectProduct: (product: ProductItem) => void;
  onNavigateToCatalog: () => void;
}

export const SeriesShowcase: React.FC<SeriesShowcaseProps> = ({
  onSelectProduct,
  onNavigateToCatalog,
}) => {
  const [selectedSeries, setSelectedSeries] = useState<SeriesKey>('yuan');
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchProductsFromSupabase().then((products) => {
      if (mounted) setAllProducts(products);
    });
    return () => { mounted = false; };
  }, []);

  const activeMeta = SERIES_META[selectedSeries];
  const seriesProducts = allProducts.filter((p) => p.series === selectedSeries).slice(0, 8);

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 space-y-8">
      
      {/* Series Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs tracking-[0.4em] text-[#8C7E6A] uppercase font-sans font-medium">
          FOUR SERIES ARCHIVE / 四大系列架构
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2D2A]">
          元 · 合 · 生 · 香
        </h2>
        <div className="w-12 h-[1px] bg-[#2D2D2A]/20 mx-auto"></div>
        <p className="text-xs sm:text-sm text-[#2D2D2A]/70 leading-relaxed font-sans">
          一套可溯源、可理解、可长期展开的香气馆藏结构。四大系列分别回答原生、协同、水相与空间的需求。
        </p>
      </div>

      {/* Series Tabs Switcher */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(Object.keys(SERIES_META) as SeriesKey[]).map((key) => {
          const meta = SERIES_META[key];
          const isSelected = selectedSeries === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedSeries(key)}
              className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#2D2D2A] text-[#F9F7F2] border-[#2D2D2A] shadow-md'
                  : 'bg-[#EFEDE7] text-[#2D2D2A] border-[#2D2D2A]/15 hover:bg-[#DED9D2]'
              }`}
            >
              <span className={`text-[10px] uppercase font-mono tracking-widest block mb-1 ${
                isSelected ? 'text-[#DED9D2]' : 'text-[#8C7E6A]'
              }`}>
                Series {key.toUpperCase()}
              </span>
              <h3 className={`font-serif text-lg font-semibold mb-1 ${
                isSelected ? 'text-[#F9F7F2]' : 'text-[#2D2D2A]'
              }`}>
                {meta.title}
              </h3>
              <p className={`text-[11px] line-clamp-1 ${
                isSelected ? 'text-[#DED9D2]/80' : 'text-[#2D2D2A]/70'
              }`}>{meta.cnSub}</p>

              {isSelected && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#8C7E6A]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Series Banner Card */}
      <div className="relative rounded-3xl overflow-hidden border border-[#2D2D2A]/15 bg-[#EFEDE7] p-8 md:p-12 shadow-lg">
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${activeMeta.bannerImage})` }}
        />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-[#2D2D2A] text-[#F9F7F2] text-xs uppercase font-mono tracking-wider">
            {activeMeta.enTitle}
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2D2A] font-light">
            {activeMeta.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#2D2D2A]/80 leading-relaxed font-sans">
            {activeMeta.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {activeMeta.subgroups.map((sub, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full bg-[#F9F7F2] border border-[#2D2D2A]/15 text-[#2D2D2A] font-sans">
                {sub.label} · {sub.en}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Active Series Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl text-[#2D2D2A]">
            {activeMeta.title} 精选代表作品
          </h3>
          <button
            onClick={onNavigateToCatalog}
            className="flex items-center gap-1.5 text-xs text-[#8C7E6A] hover:text-[#2D2D2A] font-sans tracking-wider hover:underline transition-colors"
          >
            <span>探索该系列全部目录</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seriesProducts.map((product) => (
            <div
              key={product.code}
              onClick={() => onSelectProduct(product)}
              className="bg-[#FFFFFF] border border-[#2D2D2A]/15 hover:border-[#8C7E6A] rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#EFEDE7] mb-3">
                  <img loading="lazy"
                    src={product.image}
                    alt={product.cn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#2D2D2A] text-[#F9F7F2] text-[10px] font-mono border border-white/20">
                    {product.code}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-[#8C7E6A] uppercase tracking-wider font-medium block font-sans">
                    {product.subgroup} · {product.tag}
                  </span>
                  <h4 className="font-serif text-base text-[#2D2D2A] group-hover:text-[#8C7E6A] transition-colors font-medium">
                    {product.cn}
                  </h4>
                  <p className="text-[11px] text-[#2D2D2A]/60 font-sans italic">
                    {product.en}
                  </p>
                  <p className="text-xs text-[#2D2D2A]/70 line-clamp-2 pt-1 font-sans font-light">
                    {product.shortDesc}
                  </p>
                  <p className="text-[10px] font-serif italic text-[#8C6D3F] truncate pt-1.5">
                    ✦ {getPrimaryUsage(product).mainSummary}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#2D2D2A]/10 flex items-center justify-between text-xs">
                <span className="text-[#2D2D2A] font-mono font-medium">
                  {product.prices[0]}
                </span>
                <span className="text-[10px] text-[#8C7E6A] group-hover:text-[#2D2D2A] flex items-center gap-0.5">
                  查看 COA &gt;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
