import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  Sparkles, 
  BookOpen, 
  Globe, 
  Grid, 
  ChevronRight, 
  MapPin, 
  Tag, 
  Feather, 
  Bot, 
  User, 
  ArrowRight,
  SlidersHorizontal,
  CornerDownLeft
} from 'lucide-react';
import { fetchProductsFromSupabase } from '../data/siteDataService';
import { FALLBACK_COUNTRIES } from '../data/siteDataService';
import { ProductItem } from '../types';
import { matchPinyinOrText } from '../utils/pinyinSearch';
import { BOOK_PAGE_TITLES } from './BrandBookViewer';

interface SearchStoryItem {
  id: string;
  title: string;
  category: 'story' | 'handbook' | 'ai-consult' | 'profile';
  desc: string;
  tab: string;
  subTab?: string;
  pageIndex?: number;
  badge?: string;
}

// Pre-curated Story and Handbook search entries
const BRAND_STORY_ENTRIES: SearchStoryItem[] = [
  {
    id: 'story-1',
    title: 'Alice 创始人寻香手记与 23 年历程',
    category: 'story',
    desc: '始于 2003 年首篇芳疗临床病例手记，记录跨越全球 36 国与中国 31 省的植物生命哲学与调配法则。',
    tab: 'story',
    badge: '品牌故事'
  },
  {
    id: 'story-2',
    title: 'UNIO 品牌全景采购指南 (Master Handbook)',
    category: 'handbook',
    desc: '包含完整品牌哲学、全系作品图谱、商业空间/SPA定制方案与VIP采购政策。',
    tab: 'story',
    subTab: 'handbook',
    badge: '品牌画册'
  },
  {
    id: 'story-3',
    title: '元 / 合 / 生 / 香 四大系列香气哲学',
    category: 'story',
    desc: '元系单方与基底油、合系身心灵协同复方、生系有机植物纯露水相、香系黑岩扩香。',
    tab: 'collection',
    badge: '馆藏哲学'
  },
  {
    id: 'story-4',
    title: '一人一方 AI 智能调配与二十四节气指南',
    category: 'ai-consult',
    desc: '基于 23 年临床病例数据库，提供精准身心问诊与节气阴阳芳香调配建议。',
    tab: 'ai-consult',
    badge: '智能调配'
  },
  {
    id: 'story-5',
    title: 'COA 质谱分析与 GC-MS 批次检测档案',
    category: 'story',
    desc: '每款精油均附带 GC-MS 气相色谱-质谱联用分析，成分透明度 100% 达标。',
    tab: 'story',
    badge: '检验检测'
  },
  {
    id: 'story-6',
    title: '商业空间香氛定制与 Luxury Hotel SPA',
    category: 'handbook',
    desc: '为高端酒店、会所、办公空间与品牌展示中心提供专属空间嗅觉身份打造。',
    tab: 'story',
    subTab: 'handbook',
    pageIndex: 32,
    badge: 'B2B定制'
  },
  {
    id: 'story-7',
    title: '我的健康与香藏档案 (Profile & Archives)',
    category: 'profile',
    desc: '查看个人问诊历史、定制调配方、订单归档与已收藏的极境作品。',
    tab: 'profile',
    badge: '个人中心'
  }
];

// Map 40 Handbook Page Titles to searchable Story Items
const HANDBOOK_PAGE_ENTRIES: SearchStoryItem[] = BOOK_PAGE_TITLES.map((title, idx) => ({
  id: `handbook-page-${idx + 1}`,
  title: title,
  category: 'handbook',
  desc: `UNIO 品牌全景手册 第 ${idx + 1} 页：探索相关章节的精油图谱、配方理论与采购指南。`,
  tab: 'story',
  subTab: 'handbook',
  pageIndex: idx,
  badge: `手册 P.${idx + 1}`
}));

const ALL_STORY_SEARCH_ITEMS = [...BRAND_STORY_ENTRIES, ...HANDBOOK_PAGE_ENTRIES];

// Popular search tags for empty state
const POPULAR_TAGS = [
  '玫瑰', '檀香', '乳香', '薰衣草', '四川柏木', '保加利亚',
  'Y-1', '五行合系', 'Alice日记', '品牌画册', '节气调配', 'GC-MS检测'
];

interface GlobalHeaderSearchProps {
  isHome: boolean;
  onSelectProduct?: (product: ProductItem) => void;
  onNavigateTab: (tab: string, subTab?: string) => void;
}

export const GlobalHeaderSearch: React.FC<GlobalHeaderSearchProps> = ({
  isHome,
  onSelectProduct,
  onNavigateTab
}) => {
  const [catalogProducts, setCatalogProducts] = useState<ProductItem[]>([]);

  // Load real products
  useEffect(() => {
    let mounted = true;
    fetchProductsFromSupabase().then((products) => {
      if (mounted) setCatalogProducts(products);
    });
    return () => { mounted = false; };
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'products' | 'stories' | 'origins'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Global shortcut cmd+k / ctrl+k listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Auto focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Search execution logic
  const searchResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      return { products: [], stories: [], origins: [] };
    }

    // 1. Filter Products
    const matchedProducts = catalogProducts.filter((p) => {
      return (
        matchPinyinOrText(p.cn, cleanQuery) ||
        (p.en && p.en.toLowerCase().includes(cleanQuery)) ||
        (p.code && p.code.toLowerCase().includes(cleanQuery)) ||
        (p.origin && (p.origin.toLowerCase().includes(cleanQuery) || matchPinyinOrText(p.origin, cleanQuery))) ||
        (p.subgroup && (p.subgroup.toLowerCase().includes(cleanQuery) || matchPinyinOrText(p.subgroup, cleanQuery))) ||
        (p.latinName && p.latinName.toLowerCase().includes(cleanQuery)) ||
        (p.botanicalFamily && (p.botanicalFamily.toLowerCase().includes(cleanQuery) || matchPinyinOrText(p.botanicalFamily, cleanQuery))) ||
        (p.extractionMethod && matchPinyinOrText(p.extractionMethod, cleanQuery)) ||
        (p.description && (p.description.toLowerCase().includes(cleanQuery) || matchPinyinOrText(p.description, cleanQuery))) ||
        (p.shortDesc && (p.shortDesc.toLowerCase().includes(cleanQuery) || matchPinyinOrText(p.shortDesc, cleanQuery))) ||
        (p.benefits && p.benefits.some((b) => matchPinyinOrText(b, cleanQuery))) ||
        (p.tag && matchPinyinOrText(p.tag, cleanQuery))
      );
    });

    // 2. Filter Stories & Handbook
    const matchedStories = ALL_STORY_SEARCH_ITEMS.filter((item) => {
      return (
        matchPinyinOrText(item.title, cleanQuery) ||
        matchPinyinOrText(item.desc, cleanQuery) ||
        (item.badge && matchPinyinOrText(item.badge, cleanQuery))
      );
    });

    // 3. Filter Origins & Aromatic Botanicals
    const matchedOrigins = FALLBACK_COUNTRIES.filter((c) => {
      return (
        matchPinyinOrText(c.name_cn, cleanQuery) ||
        (c.name_en && c.name_en.toLowerCase().includes(cleanQuery)) ||
        (c.sub_region && matchPinyinOrText(c.sub_region, cleanQuery)) ||
        (c.description && matchPinyinOrText(c.description, cleanQuery)) ||
        (c.technical_info && matchPinyinOrText(c.technical_info, cleanQuery)) ||
        (c.alice_diary && matchPinyinOrText(c.alice_diary, cleanQuery)) ||
        (c.eric_diary && matchPinyinOrText(c.eric_diary, cleanQuery))
      );
    });

    return {
      products: matchedProducts,
      stories: matchedStories,
      origins: matchedOrigins,
    };
  }, [query]);

  const totalResultsCount =
    searchResults.products.length +
    searchResults.stories.length +
    searchResults.origins.length;

  const handleSelectProduct = (product: ProductItem) => {
    setIsOpen(false);
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      onNavigateTab('collection');
    }
  };

  const handleSelectStory = (story: SearchStoryItem) => {
    setIsOpen(false);
    onNavigateTab(story.tab, story.subTab);
  };

  const handleSelectOrigin = () => {
    setIsOpen(false);
    onNavigateTab('atlas');
  };

  return (
    <>
      {/* Header Search Input Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all duration-200 active:scale-95 select-none cursor-pointer ${
          isHome
            ? 'bg-[#1C2E20]/90 border-[#C5B49A]/40 text-[#E8DAC8] hover:border-[#C5B49A] hover:bg-[#233827]'
            : 'bg-[#EFEDE7] border-[#2D2D2A]/15 text-[#2D2D2A] hover:bg-[#DED9D2] hover:border-[#8C7E6A]'
        }`}
        title="点击全景搜索作品、故事、成分与极境产地 (⌘K)"
      >
        <Search className={`w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-110 ${
          isHome ? 'text-[#C5B49A]' : 'text-[#8C7E6A]'
        }`} />
        <span className="font-serif text-[11px] tracking-wider font-medium">
          检索
        </span>
        <kbd className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[9px] font-mono rounded border shrink-0 ${
          isHome
            ? 'bg-white/10 border-white/15 text-[#C5B49A]'
            : 'bg-black/5 border-black/10 text-[#8C7E6A]'
        }`}>
          ⌘K
        </kbd>
      </button>

      {/* Global Search Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 px-3 sm:px-4 pb-6 no-print">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-[#17251B] border border-[#C5B49A]/35 text-[#FAF8F5] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10 font-sans"
            >
              
              {/* Top Search Input Bar */}
              <div className="p-4 sm:p-5 border-b border-[#C5B49A]/20 flex items-center gap-3 bg-[#1C2E20]/80">
                <Search className="w-5 h-5 text-[#C5B49A] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜索作品 (如 玫瑰 / 檀香 / Y-1)、故事 (如 23年历程)、产地 (如 保加利亚)..."
                  className="w-full bg-transparent text-sm sm:text-base text-[#FAF8F5] placeholder-[#C5B49A]/50 focus:outline-none font-sans"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 rounded-full bg-white/10 text-[#C5B49A] hover:text-[#FAF8F5] hover:bg-white/20 transition-colors"
                    title="清空"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-[#C5B49A] hover:bg-white/10 hover:text-white transition-colors"
                >
                  ESC
                </button>
              </div>

              {/* Category Filter Tabs */}
              <div className="px-4 sm:px-5 py-2.5 bg-[#17251B] border-b border-[#C5B49A]/15 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar text-xs">
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setSelectedFilter('all')}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono transition-colors ${
                      selectedFilter === 'all'
                        ? 'bg-[#C5B49A] text-[#17251B] font-semibold'
                        : 'bg-white/5 text-[#C5B49A] hover:bg-white/10'
                    }`}
                  >
                    全部 All ({query.trim() ? totalResultsCount : catalogProducts.length + ALL_STORY_SEARCH_ITEMS.length + FALLBACK_COUNTRIES.length})
                  </button>

                  <button
                    onClick={() => setSelectedFilter('products')}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono transition-colors flex items-center gap-1 ${
                      selectedFilter === 'products'
                        ? 'bg-[#C5B49A] text-[#17251B] font-semibold'
                        : 'bg-white/5 text-[#C5B49A] hover:bg-white/10'
                    }`}
                  >
                    <Grid className="w-3 h-3" />
                    <span>作品 ({query.trim() ? searchResults.products.length : catalogProducts.length})</span>
                  </button>

                  <button
                    onClick={() => setSelectedFilter('stories')}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono transition-colors flex items-center gap-1 ${
                      selectedFilter === 'stories'
                        ? 'bg-[#C5B49A] text-[#17251B] font-semibold'
                        : 'bg-white/5 text-[#C5B49A] hover:bg-white/10'
                    }`}
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>故事 ({query.trim() ? searchResults.stories.length : ALL_STORY_SEARCH_ITEMS.length})</span>
                  </button>

                  <button
                    onClick={() => setSelectedFilter('origins')}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono transition-colors flex items-center gap-1 ${
                      selectedFilter === 'origins'
                        ? 'bg-[#C5B49A] text-[#17251B] font-semibold'
                        : 'bg-white/5 text-[#C5B49A] hover:bg-white/10'
                    }`}
                  >
                    <Globe className="w-3 h-3" />
                    <span>产地 ({query.trim() ? searchResults.origins.length : FALLBACK_COUNTRIES.length})</span>
                  </button>
                </div>

                <span className="text-[10px] text-[#C5B49A]/60 font-mono hidden sm:inline">
                  pinyin & keyword smart match
                </span>
              </div>

              {/* Main Content Area */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh] space-y-6">
                
                {/* 1. Empty Query State (Show Popular Tags & Quick Entry) */}
                {!query.trim() && (
                  <div className="space-y-6 py-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#C5B49A] font-serif mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-[#C5B49A]" />
                        <span>热门香气与推荐搜索词 / Popular Aromas</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {POPULAR_TAGS.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setQuery(tag)}
                            className="px-3 py-1.5 rounded-full bg-[#1C2E20] border border-[#C5B49A]/25 text-xs text-[#E8DAC8] hover:border-[#C5B49A] hover:bg-[#233827] transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Tag className="w-3 h-3 text-[#C5B49A]" />
                            <span>{tag}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Access Portals */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <button
                        onClick={() => { setIsOpen(false); onNavigateTab('collection'); }}
                        className="p-3.5 rounded-2xl bg-[#1C2E20] border border-[#C5B49A]/20 hover:border-[#C5B49A]/50 transition-all text-left group"
                      >
                        <div className="flex items-center justify-between text-[#E8DAC8] mb-1">
                          <span className="font-serif text-sm font-medium">全系219款作品</span>
                          <Grid className="w-4 h-4 text-[#C5B49A]" />
                        </div>
                        <p className="text-[11px] text-[#C5B49A]/70 leading-relaxed">元 / 合 / 生 / 香 四大绝版图谱</p>
                      </button>

                      <button
                        onClick={() => { setIsOpen(false); onNavigateTab('story'); }}
                        className="p-3.5 rounded-2xl bg-[#1C2E20] border border-[#C5B49A]/20 hover:border-[#C5B49A]/50 transition-all text-left group"
                      >
                        <div className="flex items-center justify-between text-[#E8DAC8] mb-1">
                          <span className="font-serif text-sm font-medium">品牌全景手册</span>
                          <BookOpen className="w-4 h-4 text-[#C5B49A]" />
                        </div>
                        <p className="text-[11px] text-[#C5B49A]/70 leading-relaxed">23年寻香哲学与采购配方指南</p>
                      </button>

                      <button
                        onClick={() => { setIsOpen(false); onNavigateTab('atlas'); }}
                        className="p-3.5 rounded-2xl bg-[#1C2E20] border border-[#C5B49A]/20 hover:border-[#C5B49A]/50 transition-all text-left group"
                      >
                        <div className="flex items-center justify-between text-[#E8DAC8] mb-1">
                          <span className="font-serif text-sm font-medium">寻香世界地图</span>
                          <Globe className="w-4 h-4 text-[#C5B49A]" />
                        </div>
                        <p className="text-[11px] text-[#C5B49A]/70 leading-relaxed">全球50余国及中国29省市极境地标</p>
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. No Results State */}
                {query.trim() && totalResultsCount === 0 && (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#1C2E20] border border-[#C5B49A]/30 mx-auto flex items-center justify-center text-[#C5B49A]">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-base text-[#FAF8F5]">未找到与 “{query}” 相关的香气作品或故事</h3>
                    <p className="text-xs text-[#C5B49A]/80 max-w-md mx-auto leading-relaxed">
                      尝试搜索植物学名（如玫瑰、檀香、乳香）、产品编号（如 Y-1）、原产地（如 保加利亚、四川）或拼音首字母。
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setQuery('')}
                        className="px-4 py-1.5 rounded-full bg-[#C5B49A]/20 text-[#E8DAC8] border border-[#C5B49A]/30 text-xs hover:bg-[#C5B49A]/30 transition-colors"
                      >
                        清空搜索框
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. Search Results Sections */}
                {query.trim() && totalResultsCount > 0 && (
                  <div className="space-y-6">
                    
                    {/* SECTION A: PRODUCTS */}
                    {(selectedFilter === 'all' || selectedFilter === 'products') && searchResults.products.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-[#C5B49A] border-b border-[#C5B49A]/15 pb-1.5 font-serif">
                          <div className="flex items-center gap-1.5">
                            <Grid className="w-3.5 h-3.5 text-[#C5B49A]" />
                            <span>馆藏精油与扩香作品 ({searchResults.products.length})</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#C5B49A]/60">Products</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {searchResults.products.slice(0, selectedFilter === 'products' ? 30 : 6).map((product) => (
                            <div
                              key={product.code}
                              onClick={() => handleSelectProduct(product)}
                              className="p-3 rounded-2xl bg-[#1C2E20] border border-[#C5B49A]/20 hover:border-[#C5B49A]/60 transition-all cursor-pointer flex items-center gap-3 group hover:bg-[#233827]"
                            >
                              <img
                                src={product.image}
                                alt={product.cn}
                                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#C5B49A]/20 text-[#E8DAC8] border border-[#C5B49A]/30 shrink-0">
                                    {product.code}
                                  </span>
                                  <h4 className="font-serif text-xs font-semibold text-[#FAF8F5] truncate">
                                    {product.cn}
                                  </h4>
                                </div>
                                <p className="text-[10px] text-[#C5B49A]/80 font-mono truncate mt-0.5">
                                  {product.en} · {product.origin}
                                </p>
                                <p className="text-[10px] text-[#D5CBB9]/70 truncate mt-1">
                                  {product.shortDesc}
                                </p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-[#C5B49A]/40 group-hover:text-[#E8DAC8] group-hover:translate-x-0.5 transition-all shrink-0" />
                            </div>
                          ))}
                        </div>

                        {selectedFilter === 'all' && searchResults.products.length > 6 && (
                          <button
                            onClick={() => setSelectedFilter('products')}
                            className="text-xs text-[#C5B49A] hover:text-[#FAF8F5] font-mono flex items-center gap-1 pt-1"
                          >
                            <span>查看剩余 {searchResults.products.length - 6} 款作品</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}

                    {/* SECTION B: STORIES & HANDBOOK */}
                    {(selectedFilter === 'all' || selectedFilter === 'stories') && searchResults.stories.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-[#C5B49A] border-b border-[#C5B49A]/15 pb-1.5 font-serif">
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-[#C5B49A]" />
                            <span>品牌故事、手册与指南 ({searchResults.stories.length})</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#C5B49A]/60">Stories & Handbook</span>
                        </div>

                        <div className="space-y-2">
                          {searchResults.stories.slice(0, selectedFilter === 'stories' ? 20 : 4).map((story) => (
                            <div
                              key={story.id}
                              onClick={() => handleSelectStory(story)}
                              className="p-3.5 rounded-2xl bg-[#1C2E20] border border-[#C5B49A]/20 hover:border-[#C5B49A]/60 transition-all cursor-pointer flex items-center justify-between gap-3 group hover:bg-[#233827]"
                            >
                              <div className="space-y-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C5B49A]/20 text-[#E8DAC8] border border-[#C5B49A]/30 shrink-0">
                                    {story.badge || '品牌指南'}
                                  </span>
                                  <h4 className="font-serif text-xs font-medium text-[#FAF8F5] truncate">
                                    {story.title}
                                  </h4>
                                </div>
                                <p className="text-[11px] text-[#C5B49A]/80 leading-relaxed line-clamp-1">
                                  {story.desc}
                                </p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-[#C5B49A]/40 group-hover:text-[#E8DAC8] group-hover:translate-x-0.5 transition-all shrink-0" />
                            </div>
                          ))}
                        </div>

                        {selectedFilter === 'all' && searchResults.stories.length > 4 && (
                          <button
                            onClick={() => setSelectedFilter('stories')}
                            className="text-xs text-[#C5B49A] hover:text-[#FAF8F5] font-mono flex items-center gap-1 pt-1"
                          >
                            <span>查看剩余 {searchResults.stories.length - 4} 条故事与手册</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}

                    {/* SECTION C: ORIGINS & BOTANICALS */}
                    {(selectedFilter === 'all' || selectedFilter === 'origins') && searchResults.origins.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-[#C5B49A] border-b border-[#C5B49A]/15 pb-1.5 font-serif">
                          <div className="flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-[#C5B49A]" />
                            <span>全球极境产地与成分地图 ({searchResults.origins.length})</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#C5B49A]/60">Botanical Origins</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {searchResults.origins.slice(0, selectedFilter === 'origins' ? 20 : 4).map((country) => (
                            <div
                              key={country.id}
                              onClick={handleSelectOrigin}
                              className="p-3 rounded-2xl bg-[#1C2E20] border border-[#C5B49A]/20 hover:border-[#C5B49A]/60 transition-all cursor-pointer flex items-center gap-3 group hover:bg-[#233827]"
                            >
                              <img
                                src={country.image_url || country.scenery_url}
                                alt={country.name_cn}
                                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-3 h-3 text-[#C5B49A] shrink-0" />
                                  <h4 className="font-serif text-xs font-semibold text-[#FAF8F5] truncate">
                                    {country.name_cn} {country.name_en ? `(${country.name_en})` : ''}
                                  </h4>
                                </div>
                                <p className="text-[10px] text-[#C5B49A]/80 font-mono truncate mt-0.5">
                                  {country.region} · {country.sub_region || '极境原产区'}
                                </p>
                                <p className="text-[10px] text-[#D5CBB9]/70 truncate mt-1">
                                  {country.description}
                                </p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-[#C5B49A]/40 group-hover:text-[#E8DAC8] group-hover:translate-x-0.5 transition-all shrink-0" />
                            </div>
                          ))}
                        </div>

                        {selectedFilter === 'all' && searchResults.origins.length > 4 && (
                          <button
                            onClick={() => setSelectedFilter('origins')}
                            className="text-xs text-[#C5B49A] hover:text-[#FAF8F5] font-mono flex items-center gap-1 pt-1"
                          >
                            <span>查看剩余 {searchResults.origins.length - 4} 处产地</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}

                  </div>
                )}

              </div>

              {/* Modal Bottom Footer Bar */}
              <div className="px-5 py-3 bg-[#1C2E20] border-t border-[#C5B49A]/20 text-[11px] text-[#C5B49A]/70 flex items-center justify-between font-mono">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-white/10 border border-white/15 text-[9px]">ESC</kbd> 关闭
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-white/10 border border-white/15 text-[9px]">↵</kbd> 选择
                  </span>
                </div>
                <span>UNIO AROMA SEARCH INDEX</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
