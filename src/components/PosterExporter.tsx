import React, { useState, useEffect } from 'react';
import { Printer, Download, Sparkles, Check, Layout, Share2, Layers } from 'lucide-react';
import { fetchProductsFromSupabase } from '../data/siteDataService';
import { UnioLogo } from './UnioLogo';

export const PosterExporter: React.FC = () => {
  const [headline, setHeadline] = useState('岁岁闻香，岁岁念你');
  const [tagline, setTagline] = useState('敬 品牌创始人 Alice-元红 — 一套从 2003 年真实芳疗记录、全球原料与长期配方中生长出来的精品香气体系。');
  const [quote, setQuote] = useState('“元取自创始人中间名，UNIO 意为融合自然。把个人记忆沉淀为完整、专业且可追溯的品牌表达。”');
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [featuredProduct, setFeaturedProduct] = useState<ProductItem | null>(null);
  const [posterStyle, setPosterStyle] = useState<'dark' | 'moss' | 'gold'>('dark');

  // Load real products from Supabase
  useEffect(() => {
    let mounted = true;
    fetchProductsFromSupabase().then((products) => {
      if (mounted) {
        setAllProducts(products);
        if (products.length > 0) setFeaturedProduct(products[0]);
      }
    });
    return () => { mounted = false; };
  }, []);

  const applyPreset = (type: 'founder' | 'lotus' | 'rose' | 'alchemy') => {
    if (type === 'founder') {
      setHeadline('岁岁闻香，岁岁念你');
      setTagline('敬 品牌创始人 Alice-元红 — 一套从 2003 年真实芳疗记录、全球原料与长期配方中生长出来的精品香气体系。');
      setQuote('“元取自创始人中间名，UNIO 意为融合自然。把个人记忆沉淀为完整、专业且可追溯的品牌表达。”');
      setPosterStyle('dark');
      const prod = allProducts.find((p) => p.code.includes('Y-B-001')) || allProducts[0];
      setFeaturedProduct(prod || null);
    } else if (type === 'lotus') {
      setHeadline('元 · 纯素原生气息');
      setTagline('UNIO AROMA 五行单方与植物基底油系列 · 原生位格');
      setQuote('“先确认来处，再谈香气；先理解状态，再选择植物。”');
      setPosterStyle('dark');
      const prod = allProducts.find((p) => p.code.includes('Y-J-021')) || allProducts[0];
      setFeaturedProduct(prod || null);
    } else if (type === 'rose') {
      setHeadline('The Symphony of Damask Rose');
      setTagline('保加利亚双有机大马士革玫瑰 · 萃集万朵柔情');
      setQuote('“从极境原野到温抚肌肤，保存植物最清晰的原生能量与温抚触感。”');
      setPosterStyle('moss');
      const prod = allProducts.find((p) => p.cn.includes('玫瑰')) || allProducts[0];
      setFeaturedProduct(prod || null);
    } else if (type === 'alchemy') {
      setHeadline("NATURE'S ALCHEMY. PUREST ESSENCE.");
      setTagline('极境萃取 · 实验室 GC-MS 与 COA 全成分追溯');
      setQuote('“无化学添加，无人工稀释，确保每一滴精油均具备安全检测数据。”');
      setPosterStyle('gold');
      const prod = allProducts.find((p) => p.series === 'he') || allProducts[0];
      setFeaturedProduct(prod || null);
    }
  };

  const [downloading, setDownloading] = useState(false);

  if (!featuredProduct) {
    return (
      <div className="w-full max-w-6xl mx-auto py-24 px-4 text-center text-xs text-[#8C7E6A] animate-pulse">
        正在加载产品档案，准备画报编辑器...
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 font-sans">
        <span className="text-xs tracking-[0.3em] text-[#8C7E6A] uppercase font-medium">
          PROMOTIONAL BROCHURE GENERATOR / 画报定制与导出
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2D2A]">
          UNIO 元香 品牌宣传画报排版器
        </h2>
        <p className="text-xs sm:text-sm text-[#2D2D2A]/70 font-sans">
          可自定义海报文案、精选主推作品与风格调性，生成高分辨率印刷画报与展厅宣传单页。
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start font-sans">
        
        {/* Left Controls Column (5 Cols) */}
        <div className="lg:col-span-5 bg-[#EFEDE7] border border-[#2D2D2A]/15 rounded-3xl p-6 space-y-4 shadow-sm text-xs text-[#2D2D2A]">
          
          <div className="border-b border-[#2D2D2A]/10 pb-3 flex justify-between items-center">
            <span className="font-serif text-sm font-semibold text-[#2D2D2A] flex items-center gap-1.5">
              <Layout className="w-4 h-4 text-[#8C7E6A]" />
              <span>画报元素配置</span>
            </span>
            <span className="text-[10px] text-[#8C7E6A] font-mono">Customizer</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[#2D2D2A] mb-1 font-medium">快速画报预设快捷键 Preset Templates</label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => applyPreset('founder')}
                  className="p-2 rounded-xl bg-[#2D2D2A] text-[#d2c4ad] text-[11px] font-medium hover:bg-[#8C7E6A] hover:text-[#F9F7F2] transition-all text-left flex flex-col justify-between border border-[#d2c4ad]/30"
                >
                  <span className="font-serif font-bold">① 创始人致敬画报</span>
                  <span className="text-[9px] opacity-80">岁岁闻香，岁岁念你</span>
                </button>
                <button
                  onClick={() => applyPreset('lotus')}
                  className="p-2 rounded-xl bg-[#F9F7F2] text-[#2D2D2A] text-[11px] font-medium hover:bg-[#DED9D2] transition-all text-left flex flex-col justify-between border border-[#2D2D2A]/15"
                >
                  <span className="font-serif font-bold">② 紫金莲花纯香</span>
                  <span className="text-[9px] text-[#8C7E6A]">元香五行位格</span>
                </button>
                <button
                  onClick={() => applyPreset('rose')}
                  className="p-2 rounded-xl bg-[#F9F7F2] text-[#2D2D2A] text-[11px] font-medium hover:bg-[#DED9D2] transition-all text-left flex flex-col justify-between border border-[#2D2D2A]/15"
                >
                  <span className="font-serif font-bold">③ 大马士革玫瑰</span>
                  <span className="text-[9px] text-[#8C7E6A]">万朵柔情萃集</span>
                </button>
                <button
                  onClick={() => applyPreset('alchemy')}
                  className="p-2 rounded-xl bg-[#F9F7F2] text-[#2D2D2A] text-[11px] font-medium hover:bg-[#DED9D2] transition-all text-left flex flex-col justify-between border border-[#2D2D2A]/15"
                >
                  <span className="font-serif font-bold">④ Nature's Alchemy</span>
                  <span className="text-[9px] text-[#8C7E6A]">GC-MS/COA纯度</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[#2D2D2A] mb-1 font-medium">1. 主标题 Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full bg-[#F9F7F2] border border-[#2D2D2A]/15 rounded-xl p-2.5 text-[#2D2D2A] focus:outline-none focus:border-[#2D2D2A]"
              />
            </div>

            <div>
              <label className="block text-[#2D2D2A] mb-1 font-medium">2. 品牌副标题 Tagline</label>
              <textarea
                rows={2}
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-[#F9F7F2] border border-[#2D2D2A]/15 rounded-xl p-2.5 text-[#2D2D2A] focus:outline-none focus:border-[#2D2D2A]"
              />
            </div>

            <div>
              <label className="block text-[#2D2D2A] mb-1 font-medium">3. 品牌名言 Quote</label>
              <input
                type="text"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full bg-[#F9F7F2] border border-[#2D2D2A]/15 rounded-xl p-2.5 text-[#2D2D2A] focus:outline-none focus:border-[#2D2D2A]"
              />
            </div>

            <div>
              <label className="block text-[#2D2D2A] mb-1 font-medium">4. 选择展示主推作品</label>
              <select
                value={featuredProduct.no}
                onChange={(e) => {
                  const p = allProducts.find((item) => item.no === Number(e.target.value));
                  if (p) setFeaturedProduct(p);
                }}
                className="w-full bg-[#F9F7F2] border border-[#2D2D2A]/15 rounded-xl p-2.5 text-[#2D2D2A] focus:outline-none focus:border-[#2D2D2A]"
              >
                {allProducts.slice(0, 20).map((p) => (
                  <option key={p.no} value={p.no}>
                    [{p.code}] {p.cn} - {p.prices[0]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#2D2D2A] mb-1 font-medium">5. 画报色彩调性</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'dark', label: '深焦墨 Charcoal' },
                  { id: 'moss', label: '静谧褐色 Taupe' },
                  { id: 'gold', label: '极简素卡 Beige' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setPosterStyle(s.id as any)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      posterStyle === s.id
                        ? 'bg-[#2D2D2A] text-[#F9F7F2] font-medium border-[#2D2D2A]'
                        : 'bg-[#F9F7F2] border-[#2D2D2A]/15 text-[#8C7E6A] hover:bg-[#DED9D2]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#2D2D2A]/10 flex gap-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 rounded-xl bg-[#2D2D2A] text-[#F9F7F2] font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#8C7E6A] transition-all shadow-sm"
            >
              <Printer className="w-4 h-4 text-[#DED9D2]" />
              <span>高清打印 / 导出 PDF</span>
            </button>
          </div>

        </div>

        {/* Right Preview Column (7 Cols) */}
        <div className="lg:col-span-7 flex justify-center">
          
          {/* Printable Poster Canvas Area */}
          <div 
            id="print-poster-canvas"
            className={`w-full max-w-lg aspect-[1/1.414] rounded-3xl p-8 md:p-10 border border-[#2D2D2A]/20 shadow-2xl flex flex-col justify-between relative overflow-hidden transition-all ${
              posterStyle === 'dark' ? 'bg-[#2D2D2A] text-[#F9F7F2]' :
              posterStyle === 'moss' ? 'bg-[#8C7E6A] text-[#F9F7F2]' :
              'bg-[#EFEDE7] text-[#2D2D2A]'
            }`}
          >
            <div className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
                 style={{ backgroundImage: `url(${featuredProduct.image})` }} />

            {/* Top Logo Header */}
            <div className={`relative z-10 flex justify-between items-center border-b pb-4 ${
              posterStyle === 'gold' ? 'border-[#2D2D2A]/20' : 'border-white/20'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className={`p-1 rounded-full ${
                  posterStyle === 'gold' ? 'bg-[#2D2D2A]' : 'bg-[#0c120e] border border-white/20'
                }`}>
                  <UnioLogo size={24} color={posterStyle === 'gold' ? '#F9F7F2' : '#d2c4ad'} />
                </div>
                <span className="font-serif text-sm tracking-[0.2em] font-medium">UNIO 元香</span>
              </div>
              <span className={`text-[10px] font-mono tracking-widest uppercase ${
                posterStyle === 'gold' ? 'text-[#8C7E6A]' : 'text-[#DED9D2]'
              }`}>PROMOTIONAL EDITION</span>
            </div>

            {/* Middle Main Content */}
            <div className="relative z-10 my-auto space-y-5">
              <div className="space-y-2">
                <span className={`text-[10px] tracking-widest uppercase font-mono block ${
                  posterStyle === 'gold' ? 'text-[#8C7E6A]' : 'text-[#DED9D2]'
                }`}>UNIO AROMA EXHIBITION</span>
                <h2 className="font-serif text-3xl sm:text-4xl leading-tight font-normal">
                  {headline}
                </h2>
                <p className="text-xs leading-relaxed font-light opacity-90 font-sans">
                  {tagline}
                </p>
              </div>

              <div className={`p-3.5 rounded-xl border text-xs italic ${
                posterStyle === 'gold' ? 'bg-[#F9F7F2] border-[#2D2D2A]/15 text-[#2D2D2A]' : 'bg-black/20 border-white/15 text-[#F9F7F2]'
              }`}>
                {quote}
              </div>

              {/* Featured Product Card */}
              <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
                posterStyle === 'gold' ? 'bg-[#F9F7F2] border-[#2D2D2A]/15' : 'bg-black/30 border-white/20'
              }`}>
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.cn}
                  className="w-16 h-16 rounded-xl object-cover border border-black/10"
                />
                <div className="space-y-0.5">
                  <span className={`text-[9px] font-mono ${posterStyle === 'gold' ? 'text-[#8C7E6A]' : 'text-[#DED9D2]'}`}>{featuredProduct.code} · {featuredProduct.origin}</span>
                  <h4 className="font-serif text-sm font-semibold">{featuredProduct.cn}</h4>
                  <p className="text-[10px] opacity-80 line-clamp-1 font-sans">{featuredProduct.shortDesc}</p>
                  <span className="text-[10px] font-mono font-bold block pt-0.5">{featuredProduct.prices[0]}</span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className={`relative z-10 border-t pt-4 flex justify-between items-center text-[10px] font-sans ${
              posterStyle === 'gold' ? 'border-[#2D2D2A]/20 text-[#2D2D2A]/70' : 'border-white/20 text-[#F9F7F2]/80'
            }`}>
              <span>官网: unioaroma.com</span>
              <span className="font-mono">COA/MSDS Certified</span>
              <span>成都 · 宁波 · 泰国</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
