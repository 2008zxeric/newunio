import React, { useState, useEffect, useMemo } from 'react';
import { SERIES_META, fetchAllProducts, searchProducts } from '../data/adaptedDataService';
import { ProductItem, SeriesKey } from '../types';
import { Search, Filter, ShieldCheck, CheckCircle2, ArrowUpDown } from 'lucide-react';

interface ProductCatalogProps {
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onSelectProduct }) => {
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<SeriesKey | 'all'>('all');
  const [selectedSubgroup, setSelectedSubgroup] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'no' | 'code' | 'cn'>('no');

  // Load products from Supabase
  useEffect(() => {
    let mounted = true;
    fetchAllProducts().then((products) => {
      if (mounted) {
        setAllProducts(products);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  // Available subgroups based on series selection
  const availableSubgroups = useMemo(() => {
    if (selectedSeries === 'all') return [];
    return SERIES_META[selectedSeries].subgroups;
  }, [selectedSeries]);

  // Filtered Products (with pinyin search)
  const filteredProducts = useMemo(() => {
    let list = allProducts;
    // Series filter
    if (selectedSeries !== 'all') {
      list = list.filter((product) => product.series === selectedSeries);
    }
    // Subgroup filter
    if (selectedSubgroup !== 'all') {
      list = list.filter((product) => product.subgroup === selectedSubgroup);
    }
    // Search query (pinyin-aware)
    list = searchProducts(list, searchQuery);

    return [...list].sort((a, b) => {
      if (sortBy === 'code') return a.code.localeCompare(b.code);
      if (sortBy === 'cn') return a.cn.localeCompare(b.cn, 'zh-CN');
      return a.no - b.no;
    });
  }, [allProducts, selectedSeries, selectedSubgroup, searchQuery, sortBy]);

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 space-y-6">
      
      {/* Catalog Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2D2D2A]/10 pb-6">
        <div>
          <span className="text-xs tracking-[0.3em] text-[#8C7E6A] uppercase font-sans font-medium block mb-1">
            COMPLETE ARCHIVE / 全系 {allProducts.length} 款完整目录
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2D2A]">
            UNIO 元香 调配档案索引
          </h2>
          <p className="text-xs sm:text-sm text-[#2D2D2A]/70 mt-1 font-sans">
            实时检索单方精油、协同复方、植物纯露与空间器物，全部配备 COA & MSDS 批次检验码。
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#2D2D2A] bg-[#EFEDE7] border border-[#2D2D2A]/15 px-4 py-2 rounded-full w-fit font-sans">
          <ShieldCheck className="w-4 h-4 text-[#8C7E6A]" />
          <span>全系支持批次溯源与专业检验报告</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#EFEDE7] border border-[#2D2D2A]/15 rounded-2xl p-4 md:p-6 space-y-4 shadow-sm">
        
        {/* Top Row: Search Input & Sort Selector */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7E6A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索产品名称、编号 (如 Y-J-01)、产地 (如 阿曼)、成分、COA码..."
              className="w-full bg-[#F9F7F2] border border-[#2D2D2A]/15 rounded-full pl-10 pr-4 py-2 text-xs text-[#2D2D2A] placeholder-[#8C7E6A]/70 focus:outline-none focus:border-[#2D2D2A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8C7E6A] hover:text-[#2D2D2A]"
              >
                清除
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ArrowUpDown className="w-4 h-4 text-[#8C7E6A]" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-[#F9F7F2] border border-[#2D2D2A]/15 rounded-full px-3 py-2 text-xs text-[#2D2D2A] focus:outline-none focus:border-[#2D2D2A] font-sans"
            >
              <option value="no">按档案编号 (No.1-174)</option>
              <option value="code">按分类编码 (Code)</option>
              <option value="cn">按中文名称</option>
            </select>
          </div>
        </div>

        {/* Series Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-sans">
          <span className="text-[#8C7E6A] text-[11px] whitespace-nowrap">系列:</span>
          <button
            onClick={() => {
              setSelectedSeries('all');
              setSelectedSubgroup('all');
            }}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
              selectedSeries === 'all'
                ? 'bg-[#2D2D2A] text-[#F9F7F2] font-medium'
                : 'bg-[#F9F7F2] text-[#2D2D2A]/70 hover:bg-[#DED9D2]'
            }`}
          >
            全部 ({allProducts.length})
          </button>

          {(Object.keys(SERIES_META) as SeriesKey[]).map((key) => {
            const meta = SERIES_META[key];
            const isSelected = selectedSeries === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedSeries(key);
                  setSelectedSubgroup('all');
                }}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#2D2D2A] text-[#F9F7F2] font-medium'
                    : 'bg-[#F9F7F2] text-[#2D2D2A]/70 hover:bg-[#DED9D2]'
                }`}
              >
                {meta.title}
              </button>
            );
          })}
        </div>

        {/* Subgroup Filter Tabs (Conditional) */}
        {selectedSeries !== 'all' && availableSubgroups.length > 0 && (
          <div className="flex items-center gap-2 pt-2 border-t border-[#2D2D2A]/10 overflow-x-auto no-scrollbar text-xs font-sans">
            <span className="text-[#8C7E6A] text-[11px] whitespace-nowrap">子类:</span>
            <button
              onClick={() => setSelectedSubgroup('all')}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap text-[11px] ${
                selectedSubgroup === 'all'
                  ? 'bg-[#2D2D2A] text-[#F9F7F2] font-medium'
                  : 'bg-[#F9F7F2] text-[#2D2D2A]/70 hover:bg-[#DED9D2]'
              }`}
            >
              全部子类
            </button>
            {availableSubgroups.map((sub, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSubgroup(sub.label)}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap text-[11px] ${
                  selectedSubgroup === sub.label
                    ? 'bg-[#2D2D2A] text-[#F9F7F2] font-medium'
                    : 'bg-[#F9F7F2] text-[#2D2D2A]/70 hover:bg-[#DED9D2]'
                }`}
              >
                {sub.label} · {sub.en}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* Catalog Results Count */}
      <div className="flex justify-between items-center text-xs text-[#8C7E6A] px-1 font-sans">
        <span>显示 {filteredProducts.length} 款作品</span>
        {searchQuery && (
          <span>搜索关键词: "<span className="text-[#2D2D2A] font-medium">{searchQuery}</span>"</span>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-20 bg-[#EFEDE7] border border-[#2D2D2A]/15 rounded-2xl text-xs text-[#8C7E6A] animate-pulse">
          正在加载全系产品档案...
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.no}
              onClick={() => onSelectProduct(product)}
              className="bg-[#FFFFFF] border border-[#2D2D2A]/15 hover:border-[#8C7E6A] rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EFEDE7] mb-3">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600'}
                    alt={product.cn}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600'; }}
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#2D2D2A] backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 text-[10px] text-[#F9F7F2] font-mono">
                    <span>No.{product.no}</span>
                    <span>|</span>
                    <span>{product.code}</span>
                  </div>

                  <div className="absolute bottom-2 right-2 bg-[#EFEDE7] text-[#2D2D2A] px-2 py-0.5 rounded-full text-[9px] font-mono border border-[#2D2D2A]/20 flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5 text-[#8C7E6A]" />
                    <span>COA Verified</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#8C7E6A] font-medium uppercase tracking-wider font-sans">
                      {product.subgroup} · {product.origin}
                    </span>
                  </div>

                  <h3 className="font-serif text-base text-[#2D2D2A] group-hover:text-[#8C7E6A] transition-colors font-medium">
                    {product.cn}
                  </h3>

                  <p className="text-[11px] text-[#2D2D2A]/60 font-sans italic">
                    {product.en}
                  </p>

                  <p className="text-xs text-[#2D2D2A]/70 line-clamp-2 pt-1 font-sans font-light">
                    {product.shortDesc}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#2D2D2A]/10 flex items-center justify-between text-xs">
                <span className="text-[#2D2D2A] font-mono font-medium">
                  {product.prices[0]}
                </span>
                <span className="text-[10px] text-[#8C7E6A] group-hover:text-[#2D2D2A]">
                  查看检测档案 &gt;
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#EFEDE7] border border-[#2D2D2A]/15 rounded-2xl space-y-3">
          <p className="text-sm text-[#8C7E6A] font-sans">未找到符合条件的香气作品</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSeries('all');
              setSelectedSubgroup('all');
            }}
            className="px-4 py-1.5 rounded-full bg-[#2D2D2A] text-[#F9F7F2] text-xs font-sans font-medium"
          >
            重置搜索与筛选
          </button>
        </div>
      )}

    </div>
  );
};
