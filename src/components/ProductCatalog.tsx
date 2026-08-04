import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { SERIES_META } from '../data/catalogData';
import { fetchProductsFromSupabase } from '../data/siteDataService';
import { matchProductWithPinyin } from '../utils/pinyinSearch';
import { ProductItem, SeriesKey } from '../types';
import { Search, Filter, ShieldCheck, CheckCircle2, ArrowUpDown, Star, MessageSquare, Heart, Compass, BookOpen, FlaskConical, Package } from 'lucide-react';
import { BilingualHeader } from '../utils/i18n';
import { useWishlist } from '../hooks/useWishlist';

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
  const [onlyWishlist, setOnlyWishlist] = useState(false);

  // Load real products from Supabase
  useEffect(() => {
    let mounted = true;
    fetchProductsFromSupabase().then((products) => {
      if (mounted) {
        setAllProducts(products);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const { wishlistCodes, toggleWishlist, isWishlisted } = useWishlist();

  // Available subgroups based on series selection
  const availableSubgroups = useMemo(() => {
    if (selectedSeries === 'all') return [];
    return SERIES_META[selectedSeries].subgroups;
  }, [selectedSeries]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Wishlist filter
      if (onlyWishlist && !isWishlisted(product.code)) return false;

      // Series filter
      if (selectedSeries !== 'all' && product.series !== selectedSeries) return false;

      // Subgroup filter
      if (selectedSubgroup !== 'all' && product.subgroup !== selectedSubgroup) return false;

      // Search query with Pinyin support (e.g. "ning", "n", "nm" -> "柠檬")
      if (searchQuery.trim()) {
        return matchProductWithPinyin(product, searchQuery);
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'code') return a.code.localeCompare(b.code);
      if (sortBy === 'cn') return a.cn.localeCompare(b.cn, 'zh-CN');
      return a.no - b.no;
    });
  }, [selectedSeries, selectedSubgroup, searchQuery, sortBy, onlyWishlist, wishlistCodes, allProducts]);

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 space-y-6">
      
      {/* Catalog Title & Header */}
      <BilingualHeader
        categoryEn={`COMPLETE ARCHIVE / ${allProducts.length} BOTANICAL FORMULATION RECORDS`}
        titleZh="UNIO 元香 调配档案索引"
        titleEn="Aroma Formulation Directory"
        descZh="实时检索单方精油、协同复方、植物纯露与空间器物，全部配备 COA & MSDS 实验室批次检验码。"
        descEn="Comprehensive directory for single essential oils, synergistic blends, hydrosols and diffuser apparatus with batch verification."
        extraRight={
          <div className="flex items-center gap-2 text-xs text-[#d2c4ad] bg-[#0c120e] border border-[#d2c4ad]/30 px-4 py-2 rounded-full w-fit font-sans shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#d2c4ad]" />
            <span>100% COA 批次验证档案 <span className="font-mono text-[9px] text-[#b4aca2] uppercase ml-1">Verified</span></span>
          </div>
        }
      />

      {/* Filter & Search Bar */}
      <div className="bg-[#FFFFFF] border border-[#2D2D2A]/12 rounded-3xl p-5 md:p-6 space-y-4 shadow-sm relative overflow-hidden">
        
        {/* Top Row: Search Input & Sort Selector */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7E6A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索产品中文、拼音 (如 n / ni / ning 匹配 柠檬)、编号、产地、COA码..."
              className="w-full bg-[#F9F7F2] border border-[#2D2D2A]/15 rounded-full pl-10 pr-4 py-2 text-xs text-[#2D2D2A] placeholder-[#8C7E6A]/70 focus:outline-none focus:border-[#8C7E6A] focus:ring-1 focus:ring-[#8C7E6A] transition-all font-sans shadow-inner"
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
              className="bg-[#F9F7F2] border border-[#2D2D2A]/15 rounded-full px-3 py-2 text-xs text-[#2D2D2A] focus:outline-none focus:border-[#8C7E6A] font-sans cursor-pointer transition-all"
            >
              <option value="no">按档案编号 (No.1-{allProducts.length})</option>
              <option value="code">按分类编码 (Code)</option>
              <option value="cn">按中文名称</option>
            </select>
          </div>
        </div>

        {/* Series Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-sans">
          <span className="text-[#8C7E6A] text-[11px] whitespace-nowrap">筛选:</span>
          
          <button
            onClick={() => {
              setOnlyWishlist(false);
              setSelectedSeries('all');
              setSelectedSubgroup('all');
            }}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
              selectedSeries === 'all' && !onlyWishlist
                ? 'bg-[#2D2D2A] text-[#F9F7F2] font-medium shadow-xs'
                : 'bg-[#F9F7F2] text-[#2D2D2A]/70 hover:bg-[#DED9D2] hover:text-[#2D2D2A]'
            }`}
          >
            全部 ({allProducts.length})
          </button>

          {/* Wishlist Filter Button */}
          {(() => {
            const wishlistCount = allProducts.filter((p) => isWishlisted(p.code)).length;
            return (
              <button
                onClick={() => setOnlyWishlist(!onlyWishlist)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  onlyWishlist
                    ? 'bg-[#A85852] text-white font-medium shadow-xs'
                    : 'bg-[#F9F7F2] text-[#2D2D2A]/70 hover:bg-[#DED9D2] hover:text-[#2D2D2A]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${onlyWishlist || wishlistCount > 0 ? 'fill-current text-[#A85852]' : ''} ${onlyWishlist ? 'text-white' : ''}`} />
                <span>心愿单 ({wishlistCount})</span>
              </button>
            );
          })()}

          {(Object.keys(SERIES_META) as SeriesKey[]).map((key) => {
            const meta = SERIES_META[key];
            const isSelected = selectedSeries === key && !onlyWishlist;
            const seriesCount = allProducts.filter((p) => p.series === key).length;
            return (
              <button
                key={key}
                onClick={() => {
                  setOnlyWishlist(false);
                  setSelectedSeries(key);
                  setSelectedSubgroup('all');
                }}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#2D2D2A] text-[#F9F7F2] font-medium shadow-xs'
                    : 'bg-[#F9F7F2] text-[#2D2D2A]/70 hover:bg-[#DED9D2] hover:text-[#2D2D2A]'
                }`}
              >
                {meta.title} ({seriesCount})
              </button>
            );
          })}
        </div>

        {/* Subgroup Filter Tabs (Conditional) */}
        {selectedSeries !== 'all' && availableSubgroups.length > 0 && (
          <div className="flex items-center gap-2 pt-2 border-t border-[#2D2D2A]/10 overflow-x-auto no-scrollbar text-xs font-sans">
            <span className="text-[#8C7E6A] text-[11px] whitespace-nowrap">子类:</span>
            {(() => {
              const currentSeriesProducts = allProducts.filter((p) => p.series === selectedSeries);
              return (
                <>
                  <button
                    onClick={() => setSelectedSubgroup('all')}
                    className={`px-3 py-1 rounded-full whitespace-nowrap text-[11px] transition-all ${
                      selectedSubgroup === 'all'
                        ? 'bg-[#8C7E6A] text-[#F9F7F2] font-medium shadow-xs'
                        : 'bg-[#F9F7F2] text-[#2D2D2A]/70 hover:bg-[#DED9D2]'
                    }`}
                  >
                    全部子类 ({currentSeriesProducts.length})
                  </button>
                  {availableSubgroups.map((sub, idx) => {
                    const subCount = currentSeriesProducts.filter((p) => p.subgroup === sub.label).length;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSubgroup(sub.label)}
                        className={`px-3 py-1 rounded-full whitespace-nowrap text-[11px] transition-all ${
                          selectedSubgroup === sub.label
                            ? 'bg-[#8C7E6A] text-[#F9F7F2] font-medium shadow-xs'
                            : 'bg-[#F9F7F2] text-[#2D2D2A]/70 hover:bg-[#DED9D2]'
                        }`}
                      >
                        {sub.label} · {sub.en} ({subCount})
                      </button>
                    );
                  })}
                </>
              );
            })()}
          </div>
        )}

      </div>

      {/* Catalog Results Count */}
      <div className="flex justify-between items-center text-xs text-[#8C7E6A] px-1 font-sans">
        <span>已为您筛选出 <strong className="text-[#0c120e] font-semibold">{filteredProducts.length}</strong> 款经典作品</span>
        {searchQuery && (
          <span>当前搜索: "<span className="text-[#2D2D2A] font-medium">{searchQuery}</span>"</span>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.no}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(idx * 0.015, 0.2) }}
              onClick={() => onSelectProduct(product)}
              className="bg-[#FFFFFF] border border-[#2D2D2A]/12 hover:border-[#8C7E6A] rounded-2xl p-3 sm:p-4 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-xl hover:shadow-[#8C7E6A]/10 relative"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EFEDE7] mb-2 sm:mb-3">
                  <img
                    src={product.image}
                    alt={product.cn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex items-center gap-1 bg-[#2D2D2A]/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 text-[9px] sm:text-[10px] text-[#F9F7F2] font-mono shadow-xs">
                    <span>No.{product.no}</span>
                    <span className="text-[#d2c4ad] hidden xs:inline">|</span>
                    <span className="hidden xs:inline">{product.code}</span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex items-center gap-1 bg-[#1C2E20]/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-[#C5B49A]/30 text-[9px] text-[#E8DAC8] font-mono shadow-xs">
                    <Star className="w-2.5 h-2.5 fill-current text-[#C5B49A]" />
                    <span className="font-bold">4.9</span>
                    <span className="text-[8px] text-[#C5B49A] hidden xs:inline">({product.userReviews?.length || 2})</span>
                  </div>

                  {/* Wishlist Heart Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.code);
                    }}
                    className={`absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 p-1.5 rounded-full backdrop-blur-md transition-all z-10 shadow-sm ${
                      isWishlisted(product.code)
                        ? 'bg-[#A85852] text-white scale-110'
                        : 'bg-[#2D2D2A]/60 text-white/80 hover:bg-[#A85852] hover:text-white'
                    }`}
                    title={isWishlisted(product.code) ? "从心愿单移出" : "加入我的心愿单"}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted(product.code) ? 'fill-current text-white' : ''}`} />
                  </button>

                  <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-[#EFEDE7]/90 backdrop-blur-md text-[#2D2D2A] px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono border border-[#2D2D2A]/20 flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="w-2.5 h-2.5 text-[#8C7E6A]" />
                    <span className="hidden xs:inline">COA Verified</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[9px] sm:text-[10px] text-[#8C7E6A] font-semibold uppercase tracking-wider font-sans bg-[#F9F7F2] px-1.5 sm:px-2 py-0.5 rounded-full border border-[#8C7E6A]/20 truncate max-w-[70%]">
                      {product.subgroup} · {product.origin}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      {product.series === 'he' ? (
                        <span className="text-[9px] sm:text-[10px] text-[#3A2B1D] font-semibold tracking-wider font-sans bg-[#E8DAC8] px-2 py-0.5 rounded-full border border-[#B08968]/30 flex items-center gap-1">
                          <FlaskConical className="w-2.5 h-2.5 text-[#B08968]" />
                          <span className="hidden sm:inline">合 · 多国地标协同</span>
                          <span className="sm:hidden">合</span>
                        </span>
                      ) : product.series === 'jing' ? (
                        <span className="text-[9px] sm:text-[10px] text-[#2F1D3A] font-semibold tracking-wider font-sans bg-[#EAE2EF] px-2 py-0.5 rounded-full border border-[#7B5294]/30 flex items-center gap-1">
                          <Package className="w-2.5 h-2.5 text-[#7B5294]" />
                          <span className="hidden sm:inline">境 · {product.subgroup}器物</span>
                          <span className="sm:hidden">境</span>
                        </span>
                      ) : null}
                      {product.plantPart && (
                        <span className="text-[9px] text-[#1C2E20] font-mono bg-[#E8DAC8]/40 px-1.5 py-0.5 rounded-md shrink-0">
                          {product.plantPart}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-serif text-sm sm:text-base text-[#2D2D2A] group-hover:text-[#8C7E6A] transition-colors font-medium pt-0.5 line-clamp-1">
                    {product.cn}
                  </h3>

                  <p className="text-[10px] sm:text-[11px] text-[#2D2D2A]/60 font-sans italic truncate">
                    {product.en}
                  </p>

                  <p className="text-[11px] sm:text-xs text-[#2D2D2A]/70 line-clamp-2 pt-0.5 font-sans font-light leading-relaxed">
                    {product.shortDesc}
                  </p>

                  {/* ERIC Scent Journey & ALICE Diary Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                    <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-md bg-[#2D2319] text-[#E8DAC8] border border-[#B08968]/30 font-serif">
                      <Compass className="w-2.5 h-2.5 text-[#B08968]" />
                      <span>ERIC 寻香旅记</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-md bg-[#1C2E20] text-[#E8DAC8] border border-[#8C7E6A]/30 font-serif">
                      <BookOpen className="w-2.5 h-2.5 text-[#C5B49A]" />
                      <span>ALICE 芳疗日记</span>
                    </span>
                  </div>

                  {/* Benefits chips on card */}
                  {product.benefits && product.benefits.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1.5">
                      {product.benefits.slice(0, 2).map((b, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-md bg-[#EFEDE7] text-[#1C2E20] border border-[#8C7E6A]/15 font-sans">
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-[#2D2D2A]/10 flex items-center justify-between text-xs">
                <span className="text-[#0c120e] font-mono font-bold text-xs sm:text-sm">
                  {product.prices[0]}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#8C7E6A] group-hover:text-[#0c120e] font-medium transition-colors">
                  档案 &gt;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#FFFFFF] border border-[#2D2D2A]/12 rounded-2xl space-y-3 shadow-xs">
          <p className="text-sm text-[#8C7E6A] font-sans">未找到符合条件的香气作品</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSeries('all');
              setSelectedSubgroup('all');
            }}
            className="px-4 py-1.5 rounded-full bg-[#2D2D2A] text-[#F9F7F2] text-xs font-sans font-medium hover:bg-[#8C7E6A] transition-colors"
          >
            重置搜索与筛选
          </button>
        </div>
      )}

    </div>
  );
};
