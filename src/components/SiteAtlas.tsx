import React, { useState, useEffect, useMemo } from 'react';
import { Globe, MapPin, Search, Sparkles, Navigation, ChevronRight, Compass, ArrowUpRight, Filter, BookOpen } from 'lucide-react';
import { Country, ProductItem } from '../types';
import { fetchCountriesFromSupabase, fetchProductsFromSupabase, COUNTRY_COORDS } from '../data/siteDataService';
import { UnioLogo } from './UnioLogo';

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

  // Filter countries based on mode (global vs china), region, and search query
  const filteredCountries = useMemo(() => {
    return countries.filter((c) => {
      const isChina = Boolean(c.is_china_province || c.region === '中国' || c.region === '神州' || c.is_china);
      if (activeTab === 'china' && !isChina) return false;
      if (activeTab === 'global' && isChina) return false;

      if (selectedRegion !== 'all') {
        if (c.region !== selectedRegion && c.sub_region !== selectedRegion) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = c.name_cn.toLowerCase().includes(q) || (c.name_en && c.name_en.toLowerCase().includes(q));
        const descMatch = Boolean(c.description && c.description.toLowerCase().includes(q));
        const regionMatch = Boolean(c.sub_region && c.sub_region.toLowerCase().includes(q));
        const diaryMatch = Boolean(
          (c.eric_diary && c.eric_diary.toLowerCase().includes(q)) ||
          (c.alice_diary && c.alice_diary.toLowerCase().includes(q))
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
    : ['all', '西南', '华南', '华中', '西北', '华东', '华北', '东北'];

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
              <span>ORIGINS · 接近 50 国全球原产地 · 92 处极境地标</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-white font-normal leading-tight">
              寻香世界 Global Botanicals Atlas
            </h1>
            <p className="text-xs md:text-sm text-[#b4aca2] leading-relaxed">
              从极境撷取芳香，因世界元于一息。涵盖保加利亚、法国、阿曼、马达加斯加等接近 50 国全球原产地。每一款精油均精确标记原产地纬度、海拔与气候基因。
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
              全球寻香地图
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
              中国寻香地图
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#F9F7F2] p-4 rounded-2xl border border-[#2D2D2A]/10">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-4 py-2 rounded-xl text-xs font-serif whitespace-nowrap transition-all ${
                selectedRegion === r
                  ? 'bg-[#2D2D2A] text-[#d2c4ad] font-bold shadow-sm'
                  : 'bg-white text-[#8C7E6A] hover:bg-[#DED9D2]'
              }`}
            >
              {r === 'all' ? '全部产地' : r}
            </button>
          ))}
        </div>

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
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                    isSelected
                      ? 'bg-[#2D2D2A] text-[#F9F7F2] border-[#d2c4ad] shadow-lg scale-[1.01]'
                      : 'bg-white hover:bg-[#F9F7F2] text-[#2D2D2A] border-[#2D2D2A]/10'
                  }`}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative bg-gray-200">
                    <img
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
                    <p className={`text-xs line-clamp-1 ${isSelected ? 'text-[#b4aca2]' : 'text-[#8C7E6A]'}`}>
                      {c.description}
                    </p>
                  </div>

                  <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-[#d2c4ad]' : 'text-[#2D2D2A]/30'}`} />
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
                  <span>极境地理与蒸馏环境</span>
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
                        <img
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
              请从左侧列表选择寻香地标以查看极境档案与寻香笔记
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
