import React, { useState, useEffect, useRef } from 'react';
import { Printer, Download, Sparkles, Check, Layout, Share2, Layers, Copy, Image as ImageIcon } from 'lucide-react';
import { fetchProductsFromSupabase } from '../data/siteDataService';
import { ProductItem } from '../types';
import { UnioLogo } from './UnioLogo';
import { FOUNDING_YEAR } from '../utils/brandConstants';

type PosterStyle = 'dark' | 'moss' | 'gold' | 'paper';
type CardRatio = 'friend' | 'wallpaper' | 'a4';

const RATIO_META: Record<CardRatio, { label: string; desc: string; cls: string }> = {
  friend: { label: '朋友圈试香卡', desc: '3:4 竖版', cls: 'aspect-[3/4]' },
  wallpaper: { label: '手机高清壁纸', desc: '9:16 全屏', cls: 'aspect-[9/16]' },
  a4: { label: '标准宣传画报', desc: 'A4 210×297', cls: 'aspect-[210/297]' },
};

const SEALS = ['元香手记', 'Alice 审定', '元香真迹'];

export const PosterExporter: React.FC = () => {
  const [headline, setHeadline] = useState('岁岁闻香，岁岁念你');
  const [tagline, setTagline] = useState(`敬 品牌创始人 Alice-元红 — 一套从 ${FOUNDING_YEAR} 年真实芳疗记录、全球原料与长期配方中生长出来的精品香气体系。`);
  const [quote, setQuote] = useState('“元取自创始人中间名，UNIO 意为融合自然。把个人记忆沉淀为完整、专业且可追溯的品牌表达。”');
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [featuredProduct, setFeaturedProduct] = useState<ProductItem | null>(null);
  const [posterStyle, setPosterStyle] = useState<PosterStyle>('paper');
  const [cardRatio, setCardRatio] = useState<CardRatio>('friend');
  const [sealText, setSealText] = useState<string>('元香手记');
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

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

  const applyPreset = (type: 'founder' | 'lotus' | 'rose' | 'alchemy' | 'paper') => {
    if (type === 'founder') {
      setHeadline('岁岁闻香，岁岁念你');
      setTagline(`敬 品牌创始人 Alice-元红 — 一套从 ${FOUNDING_YEAR} 年真实芳疗记录、全球原料与长期配方中生长出来的精品香气体系。`);
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
    } else if (type === 'paper') {
      setHeadline('岁岁闻香，岁岁念你');
      setTagline(`敬 品牌创始人 Alice-元红 — 从 ${FOUNDING_YEAR} 年首篇芳疗手记到今天的精品香气体系。每一滴精油背后都有一片土地、一群人、一个故事。`);
      setQuote('“深夜调香，炉火微温。植物从不催促，它们只负责在恰当的时候开花——香气也是如此。”');
      setPosterStyle('paper');
      const prod = allProducts.find((p) => p.code.includes('Y-B-001')) || allProducts[0];
      setFeaturedProduct(prod || null);
    }
  };

  const handleCopyQuote = () => {
    const text = `${headline}\n${quote}\n—— UNIO 元香 · ${sealText}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPNG = () => {
    if (!cardRef.current) return;
    // Use html2canvas-like approach via native SVG foreignObject capture
    const node = cardRef.current;
    const w = node.offsetWidth * 2;
    const h = node.offsetHeight * 2;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', String(w));
    svg.setAttribute('height', String(h));
    const foreign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    foreign.setAttribute('width', '100%');
    foreign.setAttribute('height', '100%');
    const clone = node.cloneNode(true) as HTMLElement;
    clone.style.transform = 'none';
    clone.style.overflow = 'visible';
    const scaleFactor = 2;
    const styleEl = document.createElement('style');
    styleEl.textContent = `* { box-sizing: border-box; } img { max-width: 100%; }`;
    foreign.appendChild(styleEl);
    foreign.appendChild(clone);
    svg.appendChild(foreign);
    const xml = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([`<?xml version="1.0" encoding="UTF-8"?>${xml}`], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = posterStyle === 'paper' ? '#F5F2EC' : '#2D2D2A';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      const a = document.createElement('a');
      a.download = `UNIO-手记试香卡-${Date.now()}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.onerror = () => { URL.revokeObjectURL(url); };
    img.src = url;
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

  const sealBg = '#A5281F';
  const sealBorder = '#8C211A';

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
                  onClick={() => applyPreset('paper')}
                  className="p-2 rounded-xl bg-[#F5F2EC] text-[#8C211A] text-[11px] font-medium hover:bg-[#EADFD2] transition-all text-left flex flex-col justify-between border-2 border-[#A5281F]/60 shadow-sm"
                >
                  <span className="font-serif font-bold">✦ Alice 手记宣纸卡</span>
                  <span className="text-[9px] opacity-80">元香手记 · 朱印珍藏</span>
                </button>
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

            {/* 卡片比例切换 */}
            <div>
              <label className="block text-[#2D2D2A] mb-1 font-medium">卡片比例 Aspect Ratio</label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(RATIO_META) as CardRatio[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setCardRatio(r)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      cardRatio === r
                        ? 'bg-[#2D2D2A] text-[#F9F7F2] font-medium border-[#2D2D2A]'
                        : 'bg-[#F9F7F2] border-[#2D2D2A]/15 text-[#8C7E6A] hover:bg-[#DED9D2]'
                    }`}
                  >
                    <span className="block font-medium">{RATIO_META[r].label}</span>
                    <span className={`text-[9px] ${cardRatio === r ? 'text-[#d2c4ad]' : 'text-[#8C7E6A]'}`}>{RATIO_META[r].desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 朱印选择 */}
            <div>
              <label className="block text-[#2D2D2A] mb-1 font-medium">朱印钤盖 Vermilion Seal</label>
              <div className="grid grid-cols-3 gap-2">
                {SEALS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSealText(s)}
                    className={`p-2 rounded-xl border text-center transition-all flex items-center justify-center gap-1.5 ${
                      sealText === s
                        ? 'bg-[#A5281F] text-[#FDF6F0] font-medium border-[#A5281F]'
                        : 'bg-[#F9F7F2] border-[#2D2D2A]/15 text-[#A5281F] hover:bg-[#F5E3DF]'
                    }`}
                  >
                    <span className="font-serif font-bold">{s}</span>
                  </button>
                ))}
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
              <label className="block text-[#2D2D2A] mb-1 font-medium">3. 手记随感 / 品牌名言 Quote</label>
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
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'paper', label: '宣纸米白 Rice Paper' },
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
            <button
              onClick={handleDownloadPNG}
              className="flex-1 py-3 rounded-xl bg-[#A5281F] text-[#FDF6F0] font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#8C211A] transition-all shadow-sm"
            >
              <ImageIcon className="w-4 h-4 text-[#F5D5C8]" />
              <span>保存为高清 PNG</span>
            </button>
          </div>

          <button
            onClick={handleCopyQuote}
            className="w-full py-2.5 rounded-xl border border-[#A5281F]/40 text-[#A5281F] font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#F5E3DF] transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? '已复制手记文案' : '复制手记试香文案'}
          </button>

        </div>

        {/* Right Preview Column (7 Cols) */}
        <div className="lg:col-span-7 flex justify-center">
          
          {/* Printable Poster Canvas Area */}
          <div 
            id="print-poster-canvas"
            ref={cardRef}
            className={`w-full max-w-lg ${RATIO_META[cardRatio].cls} rounded-3xl p-8 md:p-10 border border-[#2D2D2A]/20 shadow-2xl flex flex-col justify-between relative overflow-hidden transition-all ${
              posterStyle === 'dark' ? 'bg-[#2D2D2A] text-[#F9F7F2]' :
              posterStyle === 'moss' ? 'bg-[#8C7E6A] text-[#F9F7F2]' :
              posterStyle === 'gold' ? 'bg-[#EFEDE7] text-[#2D2D2A]' :
              'bg-[#F5F2EC] text-[#2D2D2A]'
            }`}
          >
            {posterStyle !== 'paper' && (
              <div className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
                   style={{ backgroundImage: `url(${featuredProduct.image})` }} />
            )}

            {/* 宣纸竹节双框 */}
            {posterStyle === 'paper' && (
              <>
                <div className="absolute inset-2 rounded-2xl border border-[#A5281F]/30 pointer-events-none" />
                <div className="absolute inset-3 rounded-xl border border-[#A5281F]/15 pointer-events-none" />
              </>
            )}

            {/* Top Logo Header */}
            <div className={`relative z-10 flex justify-between items-center border-b pb-4 ${
              posterStyle === 'gold' || posterStyle === 'paper' ? 'border-[#2D2D2A]/20' : 'border-white/20'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className={`p-1 rounded-full ${
                  posterStyle === 'gold' ? 'bg-[#2D2D2A]' : posterStyle === 'paper' ? 'bg-[#0c120e]' : 'bg-[#0c120e] border border-white/20'
                }`}>
                  <UnioLogo size={24} color={posterStyle === 'gold' || posterStyle === 'paper' ? '#d2c4ad' : '#d2c4ad'} />
                </div>
                <span className="font-serif text-sm tracking-[0.2em] font-medium">UNIO 元香</span>
              </div>
              <span className={`text-[10px] font-mono tracking-widest uppercase ${
                posterStyle === 'gold' || posterStyle === 'paper' ? 'text-[#8C7E6A]' : 'text-[#DED9D2]'
              }`}>{posterStyle === 'paper' ? 'ALICE HANDWRITTEN NOTE' : 'PROMOTIONAL EDITION'}</span>
            </div>

            {/* Middle Main Content */}
            <div className="relative z-10 my-auto space-y-5">
              <div className="space-y-2">
                <span className={`text-[10px] tracking-widest uppercase font-mono block ${
                  posterStyle === 'gold' || posterStyle === 'paper' ? 'text-[#8C7E6A]' : 'text-[#DED9D2]'
                }`}>{posterStyle === 'paper' ? 'UNIO 芳疗手记 · ALICE' : 'UNIO AROMA EXHIBITION'}</span>
                <h2 className="font-serif text-3xl sm:text-4xl leading-tight font-normal">
                  {headline}
                </h2>
                <p className="text-xs leading-relaxed font-light opacity-90 font-sans">
                  {tagline}
                </p>
              </div>

              <div className={`p-3.5 rounded-xl border text-xs italic ${
                posterStyle === 'gold' ? 'bg-[#F9F7F2] border-[#2D2D2A]/15 text-[#2D2D2A]' :
                posterStyle === 'paper' ? 'bg-[#FDFBF6] border-[#A5281F]/25 text-[#5C4632]' :
                'bg-black/20 border-white/15 text-[#F9F7F2]'
              }`}>
                {quote}
              </div>

              {/* Featured Product Card */}
              <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
                posterStyle === 'gold' ? 'bg-[#F9F7F2] border-[#2D2D2A]/15' :
                posterStyle === 'paper' ? 'bg-[#FDFBF6] border-[#A5281F]/20' :
                'bg-black/30 border-white/20'
              }`}>
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.cn}
                  className="w-16 h-16 rounded-xl object-cover border border-black/10"
                />
                <div className="space-y-0.5">
                  <span className={`text-[9px] font-mono ${posterStyle === 'gold' || posterStyle === 'paper' ? 'text-[#8C7E6A]' : 'text-[#DED9D2]'}`}>{featuredProduct.code} · {featuredProduct.origin}</span>
                  <h4 className="font-serif text-sm font-semibold">{featuredProduct.cn}</h4>
                  <p className="text-[10px] opacity-80 line-clamp-1 font-sans">{featuredProduct.shortDesc}</p>
                  <span className="text-[10px] font-mono font-bold block pt-0.5">{featuredProduct.prices[0]}</span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className={`relative z-10 border-t pt-4 flex justify-between items-center text-[10px] font-sans ${
              posterStyle === 'gold' || posterStyle === 'paper' ? 'border-[#2D2D2A]/20 text-[#2D2D2A]/70' : 'border-white/20 text-[#F9F7F2]/80'
            }`}>
              {posterStyle === 'paper' ? (
                <>
                  <span className="font-serif tracking-wide">UNIO 元香 · 手记珍藏</span>
                  <span className="font-mono">RICE PAPER EDITION</span>
                  <span>成都 · 宁波 · 泰国</span>
                </>
              ) : (
                <>
                  <span>官网: unioaroma.com</span>
                  <span className="font-mono">COA/MSDS Certified</span>
                  <span>成都 · 宁波 · 泰国</span>
                </>
              )}
            </div>

            {/* 红色朱印 Vermilion Seal */}
            {posterStyle === 'paper' && (
              <div className="absolute z-20 right-7 bottom-10 flex flex-col items-center gap-1 select-none">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-center shadow-lg"
                  style={{
                    background: `linear-gradient(145deg, ${sealBg}, ${sealBorder})`,
                    boxShadow: `inset 0 0 6px rgba(0,0,0,0.35), 0 2px 8px rgba(140,33,26,0.35)`,
                    border: '2px solid #7A1D16',
                  }}
                >
                  <span
                    className="font-serif text-[13px] leading-[1.2] text-[#FDF6F0] tracking-wide font-bold"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
                  >
                    {sealText.split('').map((ch, i) => (
                      <span key={i} className="block">{ch}</span>
                    ))}
                  </span>
                </div>
                <span className="text-[8px] font-mono text-[#A5281F]/70 tracking-widest">UNIO LAB · 验印存真</span>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
