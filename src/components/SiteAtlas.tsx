import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Globe, MapPin, Search, Sparkles, Navigation, ChevronRight, Compass, ArrowUpRight, Filter, BookOpen, Lock, Footprints , ChevronUp, ChevronDown } from 'lucide-react';
import { Country, ProductItem } from '../types';
import { fetchCountriesFromSupabase, fetchProductsFromSupabase, COUNTRY_COORDS } from '../data/siteDataService';
import { UnioLogo } from './UnioLogo';
import { matchPinyinOrText } from '../utils/pinyinSearch';

interface SiteAtlasProps {
  onSelectProduct?: (product: ProductItem) => void;
}

export const SiteAtlas: React.FC<SiteAtlasProps> = ({ onSelectProduct }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'global' | 'china'>('global');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [cData, pData] = await Promise.all([
        fetchCountriesFromSupabase(),
        fetchProductsFromSupabase(),
      ]);
      setCountries(cData);
      setProducts(pData);
      if (cData.length > 0) {
        setSelectedCountry(cData[0]);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  // Separate global and china countries for dynamic counts
  const globalCountriesList = useMemo(() => {
    return countries.filter((c) => !Boolean(c.is_china_province || c.region === '中国' || c.region === '神州' || c.is_china));
  }, [countries]);

  const chinaCountriesList = useMemo(() => {
    return countries.filter((c) => Boolean(c.is_china_province || c.region === '中国' || c.region === '神州' || c.is_china));
  }, [countries]);

  // Compute counts for regions dynamically
  const regionCounts = useMemo(() => {
    if (activeTab === 'global') {
      const counts: Record<string, number> = {
        all: globalCountriesList.length,
        '欧洲': globalCountriesList.filter((c) => c.region === '欧洲' || c.sub_region === '欧洲').length,
        '亚洲': globalCountriesList.filter((c) => c.region === '亚洲' || c.sub_region === '亚洲').length,
        '非洲': globalCountriesList.filter((c) => c.region === '非洲' || c.sub_region === '非洲').length,
        '美洲': globalCountriesList.filter((c) => c.region === '美洲' || c.sub_region === '美洲').length,
        '大洋洲': globalCountriesList.filter((c) => c.region === '大洋洲' || c.sub_region === '大洋洲').length,
      };
      return counts;
    } else {
      const counts: Record<string, number> = {
        all: chinaCountriesList.length,
        '西南': chinaCountriesList.filter((c) => ['云南', '四川', '贵州', '重庆', '西藏'].some(p => c.name_cn.includes(p) || (c.sub_region && c.sub_region.includes(p)))).length,
        '华南': chinaCountriesList.filter((c) => ['广东', '广西', '海南', '香港', '澳门'].some(p => c.name_cn.includes(p) || (c.sub_region && c.sub_region.includes(p)))).length,
        '华中': chinaCountriesList.filter((c) => ['湖北', '湖南', '江西'].some(p => c.name_cn.includes(p) || (c.sub_region && c.sub_region.includes(p)))).length,
        '西北': chinaCountriesList.filter((c) => ['新疆', '陕西', '甘肃', '青海', '宁夏'].some(p => c.name_cn.includes(p) || (c.sub_region && c.sub_region.includes(p)))).length,
        '华东': chinaCountriesList.filter((c) => ['浙江', '江苏', '上海', '安徽', '福建', '山东', '台湾'].some(p => c.name_cn.includes(p) || (c.sub_region && c.sub_region.includes(p)))).length,
        '华北': chinaCountriesList.filter((c) => ['北京', '天津', '河北', '山西', '内蒙古'].some(p => c.name_cn.includes(p) || (c.sub_region && c.sub_region.includes(p)))).length,
      };
      return counts;
    }
  }, [activeTab, globalCountriesList, chinaCountriesList]);

  // Filter countries based on mode (global vs china), region, and search query
  const filteredCountries = useMemo(() => {
    return countries.filter((c) => {
      const isChina = Boolean(c.is_china_province || c.region === '中国' || c.region === '神州' || c.is_china);
      if (activeTab === 'china' && !isChina) return false;
      if (activeTab === 'global' && isChina) return false;

      if (selectedRegion !== 'all') {
        if (activeTab === 'china') {
          const regionMap: Record<string, string[]> = {
            '西南': ['云南', '四川', '贵州', '重庆', '西藏'],
            '华南': ['广东', '广西', '海南', '香港', '澳门'],
            '华中': ['湖北', '湖南', '江西'],
            '西北': ['新疆', '陕西', '甘肃', '青海', '宁夏'],
            '华东': ['浙江', '江苏', '上海', '安徽', '福建', '山东', '台湾'],
            '华北': ['北京', '天津', '河北', '山西', '内蒙古'],
          };
          const matches = regionMap[selectedRegion];
          if (matches) {
            const isMatch = matches.some(p => c.name_cn.includes(p) || (c.sub_region && c.sub_region.includes(p)));
            if (!isMatch) return false;
          } else if (c.region !== selectedRegion && c.sub_region !== selectedRegion) {
            return false;
          }
        } else {
          if (c.region !== selectedRegion && c.sub_region !== selectedRegion) return false;
        }
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = matchPinyinOrText(c.name_cn, q) || (c.name_en && c.name_en.toLowerCase().includes(q));
        const descMatch = Boolean(c.description && (c.description.toLowerCase().includes(q) || matchPinyinOrText(c.description, q)));
        const regionMatch = Boolean(c.sub_region && (c.sub_region.toLowerCase().includes(q) || matchPinyinOrText(c.sub_region, q)));
        const diaryMatch = Boolean(
          (c.eric_diary && (c.eric_diary.toLowerCase().includes(q) || matchPinyinOrText(c.eric_diary, q))) ||
          (c.alice_diary && (c.alice_diary.toLowerCase().includes(q) || matchPinyinOrText(c.alice_diary, q)))
        );
        return nameMatch || descMatch || regionMatch || diaryMatch;
      }

      return true;
    });
  }, [countries, activeTab, selectedRegion, searchQuery]);

  // Keep selectedCountry updated when tab or filter changes
  useEffect(() => {
    if (filteredCountries.length > 0) {
      if (!selectedCountry || !filteredCountries.some((c) => c.id === selectedCountry.id)) {
        setSelectedCountry(filteredCountries[0]);
      }
    } else {
      setSelectedCountry(null);
    }
  }, [filteredCountries]);

  // Find products associated with selected country
  const relatedProducts = useMemo(() => {
    if (!selectedCountry) return [];
    return products.filter((p) => {
      return (
        p.origin.includes(selectedCountry.name_cn) ||
        (selectedCountry.name_en && p.origin.toLowerCase().includes(selectedCountry.name_en.toLowerCase()))
      );
    });
  }, [products, selectedCountry]);

  const REGIONS = activeTab === 'global' 
    ? ['all', '欧洲', '亚洲', '非洲', '美洲', '大洋洲'] 
    : ['all', '华东', '西南', '华南', '华中', '西北', '华北'];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Top Banner Header */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0c120e] text-[#f6f2eb] p-6 md:p-10 border border-[#d2c4ad]/30 shadow-2xl">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600')` }}
        />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d2c4ad]/20 border border-[#d2c4ad]/30 text-[#d2c4ad] text-xs font-serif">
              <Compass className="w-3.5 h-3.5" />
              <span>ORIGINS · 涵盖 {globalCountriesList.length} 个全球元境国家与 {chinaCountriesList.length} 个中国原生产地地标</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-white font-normal leading-tight">
              寻香世界 Global Botanicals Atlas
            </h1>
            <p className="text-xs md:text-sm text-[#b4aca2] leading-relaxed">
              从极境撷取芳香，因世界元于一息。涵盖保加利亚、法国、埃及、马达加斯加、西班牙、海地、墨西哥、肯尼亚、阿根廷、巴西、柬埔寨、古巴、伊朗、哈萨克斯坦、卢森堡、马来西亚、毛里求斯、摩纳哥、波兰、葡萄牙、新加坡、南非、津巴布韦、冰岛、印度、印度尼西亚、约旦、荷兰、菲律宾、泰国、土耳其、阿联酋、越南、澳大利亚、新西兰等 {globalCountriesList.length} 个全球元境国家与 {chinaCountriesList.length} 个中国原生产地元境地标。每一款精油均精确标记原产地纬度、海拔与气候基因。
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex bg-[#1a241e] p-1.5 rounded-2xl border border-[#d2c4ad]/30 self-start md:self-auto">
            <button
              onClick={() => { setActiveTab('global'); setSelectedRegion('all'); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-serif transition-all flex items-center gap-2 ${
                activeTab === 'global'
                  ? 'bg-[#d2c4ad] text-[#2D2D2A] font-bold shadow'
                  : 'text-[#b4aca2] hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>全球寻香地图</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">({globalCountriesList.length})</span>
            </button>
            <button
              onClick={() => { setActiveTab('china'); setSelectedRegion('all'); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-serif transition-all flex items-center gap-2 ${
                activeTab === 'china'
                  ? 'bg-[#d2c4ad] text-[#2D2D2A] font-bold shadow'
                  : 'text-[#b4aca2] hover:text-white'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>中国寻香地图</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">({chinaCountriesList.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#F9F7F2] p-4 rounded-2xl border border-[#2D2D2A]/10 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#2D2D2A]/15 text-xs font-serif text-[#2D2D2A] hover:border-[#8C7E6A] transition-all whitespace-nowrap"
          >
            <span>筛选: {selectedRegion === 'all' ? (activeTab === 'global' ? '全部国家' : '全部地标') : selectedRegion}</span>
            {isFilterExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7E6A]" />
            <input
              type="text"
              placeholder="搜索产地、植物、或寻香笔记..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#2D2D2A]/15 text-xs text-[#2D2D2A] focus:outline-none focus:border-[#8C7E6A]"
            />
          </div>
        </div>

        {isFilterExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-2 pt-2 border-t border-[#2D2D2A]/10 overflow-hidden"
          >
          {REGIONS.map((r) => {
            const count = regionCounts[r] || 0;
            return (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-4 py-2 rounded-xl text-xs font-serif whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedRegion === r
                    ? 'bg-[#2D2D2A] text-[#d2c4ad] font-bold shadow-sm'
                    : 'bg-white text-[#8C7E6A] hover:bg-[#DED9D2]'
                }`}
              >
                <span>{r === 'all' ? (activeTab === 'global' ? '全部国家' : '全部地标') : r}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${selectedRegion === r ? 'bg-white/20 text-[#d2c4ad]' : 'bg-[#2D2D2A]/5 text-[#8C7E6A]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
          </motion.div>
        )}
      </div>

      {/* Main Content Layout: Left Grid / Right Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left List of Destinations */}
        <div className="lg:col-span-5 space-y-4 max-h-[780px] overflow-y-auto pr-1">
          <div className="text-xs text-[#8C7E6A] font-mono flex items-center justify-between">
            <span>SHOWING {filteredCountries.length} ORIGIN DESTINATIONS</span>
            <span>CLICK TO VIEW DETAILS</span>
          </div>

          {loading ? (
            <div className="py-20 text-center text-xs text-[#8C7E6A] animate-pulse">
              加载寻香地图档案中...
            </div>
          ) : filteredCountries.length === 0 ? (
            <div className="py-16 text-center text-xs text-[#8C7E6A] bg-[#F9F7F2] rounded-2xl p-6">
              未搜索到匹配的寻香地标，请尝试切换关键字。
            </div>
          ) : (
            filteredCountries.map((c) => {
              const isSelected = selectedCountry?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCountry(c)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-[#2D2D2A] text-[#F9F7F2] border-[#d2c4ad] shadow-lg scale-[1.01]'
                      : 'bg-white hover:bg-[#F9F7F2] text-[#2D2D2A] border-[#2D2D2A]/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative bg-gray-200">
                      <img loading="lazy"
                        src={c.scenery_url || c.image_url}
                        alt={c.name_cn}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#d2c4ad]/20 border-2 border-[#d2c4ad] rounded-xl" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-serif font-medium text-base truncate ${isSelected ? 'text-[#d2c4ad]' : 'text-[#2D2D2A]'}`}>
                          {c.name_cn}
                          {c.name_en && <span className="text-xs opacity-60 font-sans ml-2">/ {c.name_en}</span>}
                        </h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded ${isSelected ? 'bg-white/10 text-[#d2c4ad]' : 'bg-[#2D2D2A]/5 text-[#8C7E6A]'}`}>
                          {c.sub_region || c.region}
                        </span>
                      </div>
                      {/* 原产地到访次数（0 次 → UNLOCKED 待解锁） */}
                      <div className="flex items-center gap-1.5">
                        {c.visit_count > 0 ? (
                          <span className={`inline-flex items-center gap-1 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${isSelected ? 'bg-[#d2c4ad]/20 text-[#d2c4ad] border-[#d2c4ad]/40' : 'bg-[#F7F3EA] text-[#8C6D3F] border-[#d2c4ad]/60 shadow-sm'}`}>
                            <Footprints className="w-3 h-3" />
                            <span>原产地到访 {c.visit_count} 次</span>
                          </span>
                        ) : (
                          <span className={`inline-flex items-center gap-1 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${isSelected ? 'bg-white/5 text-[#8a857a] border-white/15' : 'bg-[#F1EFEA] text-[#A39D93] border-[#2D2D2A]/15'}`}>
                            <Lock className="w-3 h-3" />
                            <span>UNLOCKED · 待探访</span>
                          </span>
                        )}
                      </div>
                      <p className={`text-xs line-clamp-1 ${isSelected ? 'text-[#b4aca2]' : 'text-[#8C7E6A]'}`}>
                        {c.description}
                      </p>
                    </div>

                    <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-[#d2c4ad]' : 'text-[#2D2D2A]/30'}`} />
                  </div>

                  {/* 寻香人 ERIC 寻香旅记（每个国家卡片下方） */}
                  {(c.eric_diary || c.ericDiary) && (
                    <div className={`pt-3 border-t ${isSelected ? 'border-[#d2c4ad]/20' : 'border-[#2D2D2A]/10'}`}>
                      <div className={`flex items-center gap-1.5 text-[10px] font-serif font-semibold tracking-wide ${isSelected ? 'text-[#d2c4ad]' : 'text-[#B08968]'}`}>
                        <Compass className="w-3 h-3" />
                        <span>寻香人 ERIC 寻香旅记</span>
                      </div>
                      <p className={`mt-1.5 text-[11px] leading-relaxed font-serif italic ${isSelected ? 'text-[#b4aca2]' : 'text-[#8C7E6A]'}`}>
                        “{c.eric_diary || c.ericDiary}”
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Right Selected Country Showcase Detail */}
        <div className="lg:col-span-7">
          {selectedCountry ? (
            <div className="sticky top-24 bg-white rounded-3xl border border-[#2D2D2A]/10 p-6 md:p-8 space-y-6 shadow-xl">
              {/* Header Photo Showcase */}
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                <img
                  src={selectedCountry.scenery_url || selectedCountry.image_url}
                  alt={selectedCountry.name_cn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] text-[#d2c4ad] font-mono">
                    <MapPin className="w-3 h-3" />
                    <span>LAT/LON: {selectedCountry.coordinates ? `${selectedCountry.coordinates[1]}°N, ${selectedCountry.coordinates[0]}°E` : 'LOCAL COORD'}</span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-4xl text-white font-semibold">
                    {selectedCountry.name_cn} {selectedCountry.name_en && `/ ${selectedCountry.name_en}`}
                  </h2>
                  <p className="text-xs text-[#d2c4ad] font-light">
                    地质及气候特质：{selectedCountry.sub_region || selectedCountry.region}
                  </p>
                </div>
              </div>

              {/* Geographic Description */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-[#8C7E6A] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#8C7E6A]" />
                  <span>元境地理与蒸馏环境</span>
                </h4>
                <p className="text-xs md:text-sm text-[#2D2D2A] leading-relaxed">
                  {selectedCountry.description}
                </p>
                {selectedCountry.technical_info && (
                  <div className="p-3 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/10 text-xs text-[#8C7E6A] font-mono">
                    ⚙️ 萃取指标: {selectedCountry.technical_info}
                  </div>
                )}
              </div>

              {/* Scent Explorer ERIC Journal */}
              {selectedCountry.eric_diary && (
                <div className="p-4 rounded-2xl bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#d2c4ad] font-serif">
                    <Compass className="w-4 h-4 text-[#d2c4ad]" />
                    <span className="font-semibold tracking-wide">寻香人 ERIC 寻香日记</span>
                  </div>
                  <p className="text-xs text-[#b4aca2] leading-relaxed italic">
                    “{selectedCountry.eric_diary}”
                  </p>
                </div>
              )}

              {/* Founder ALICE Aromatherapist Journal */}
              {selectedCountry.alice_diary && (
                <div className="p-4 rounded-2xl bg-[#16211a] text-[#f6f2eb] border border-[#d2c4ad]/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#d2c4ad] font-serif">
                    <BookOpen className="w-4 h-4 text-[#d2c4ad]" />
                    <span className="font-semibold tracking-wide">创始人 ALICE 芳疗师日记</span>
                  </div>
                  <p className="text-xs text-[#b4aca2] leading-relaxed italic">
                    “{selectedCountry.alice_diary}”
                  </p>
                </div>
              )}

              {/* Connected Products */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase tracking-widest text-[#2D2D2A] font-semibold flex items-center justify-between">
                  <span>来自该地标的 UNIO 元香作品 ({relatedProducts.length})</span>
                  <span className="text-[10px] text-[#8C7E6A]">ORIGIN LINKED</span>
                </h4>

                {relatedProducts.length === 0 ? (
                  <p className="text-xs text-[#8C7E6A] italic">暂无直接标注作品，可通过主目录查看该产地定制配方。</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {relatedProducts.map((p) => (
                      <div
                        key={p.code}
                        onClick={() => onSelectProduct && onSelectProduct(p)}
                        className="p-3 rounded-xl border border-[#2D2D2A]/10 bg-[#F9F7F2] hover:bg-white hover:border-[#8C7E6A] transition-all cursor-pointer flex items-center gap-3 group"
                      >
                        <img loading="lazy"
                          src={p.image}
                          alt={p.cn}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-serif text-xs font-semibold text-[#2D2D2A] group-hover:text-[#8C7E6A] truncate">
                            {p.cn}
                          </div>
                          <div className="text-[10px] text-[#8C7E6A] font-mono truncate">
                            {p.code} · {p.prices[0]}
                          </div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#8C7E6A] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex items-center justify-center border border-dashed border-[#2D2D2A]/20 rounded-3xl p-8 text-center text-xs text-[#8C7E6A]">
              请从左侧列表选择寻香地标以查看元境档案与寻香笔记
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
