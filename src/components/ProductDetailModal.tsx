import React, { useState, useEffect } from 'react';
import { ProductItem } from '../types';
import { 
  X, ShieldCheck, Copy, Check, MapPin, Sparkles, BookOpen, Layers, 
  Droplet, Feather, TestTube, Compass, Clock, HeartHandshake, Award, FileText,
  Star, MessageSquareQuote, ThumbsUp, UserCheck, Send, CheckCircle2
} from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCustomBlend?: (product: ProductItem) => void;
}

type TabKey = 'overview' | 'scenarios' | 'chemistry' | 'aliceDiary' | 'reviews' | 'traceability';

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCustomBlend
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  // Reviews state
  const [reviewsList, setReviewsList] = useState<NonNullable<ProductItem['userReviews']>>([]);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  
  // New Review Form state
  const [showForm, setShowForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserTag, setNewUserTag] = useState('资深芳疗爱好者');
  const [newRating, setNewRating] = useState(5);
  const [newScenario, setNewScenario] = useState('');
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (product?.userReviews) {
      setReviewsList(product.userReviews);
    } else {
      setReviewsList([]);
    }
  }, [product]);

  if (!product) return null;

  const handleToggleLike = (reviewId: string) => {
    setLikedMap(prev => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newRev = {
      id: `custom-rev-${Date.now()}`,
      userName: newUserName.trim() || '匿名的香芬师',
      userTag: newUserTag || 'UNIO 真实试用者',
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      usageScenario: newScenario.trim() || '日常睡眠与空间香薰',
      comment: newComment.trim(),
      likesCount: 1
    };

    setReviewsList(prev => [newRev, ...prev]);
    setNewComment('');
    setNewScenario('');
    setReviewSubmitted(true);
    setShowForm(false);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const handleCopyDossier = () => {
    const text = `UNIO 元香 植萃芳疗档案 Botanical Dossier
==========================================
【作品名称】${product.cn} (${product.en})
【档案编号】${product.code} (No.${product.no})
【植物科属】${product.botanicalFamily || 'N/A'}
【拉丁学名】${product.latinName || 'N/A'}
【产地来源】${product.origin}
【利用部位】${product.plantPart || '全株萃取'}
【萃取方式】${product.extractionMethod || '水蒸气蒸馏法'}
【储存方式】${product.storageInfo || '避光冷暗处密封保存'}
【价格规格】${product.prices.join(' / ')}

【常见功效】
${product.benefits?.map(b => `• ${b}`).join('\n') || '• 舒缓身心，净化空间'}

【运用场景与建议】
${product.applicationScenarios?.map(s => `• ${s.title}: ${s.desc} [建议: ${s.method || '扩香/推拿'}]`).join('\n\n') || ''}

【Alice 芳疗日记】
${product.aliceDiary ? `${product.aliceDiary.title} (${product.aliceDiary.date})\n${product.aliceDiary.content}\n[心得]: ${product.aliceDiary.keyObservation}\n[配方]: ${product.aliceDiary.blendSuggestion}` : ''}

【品质溯源】
COA 报告: ${product.coaNumber}
批次号: ${product.batchTrace}
==========================================
UNIO Aroma · 100% 天然无添加植萃纯品`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1A241E]/70 backdrop-blur-md animate-fade-in font-sans"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#8C7E6A]/30 rounded-3xl overflow-hidden shadow-2xl text-[#2D2D2A] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-6 sm:py-4 border-b border-[#8C7E6A]/20 bg-[#EFEDE7]/90 gap-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#1C2E20] text-[#E8DAC8] text-xs font-mono font-bold tracking-wider shadow-sm">
              {product.code}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#8C7E6A]">No.{product.no} · UNIO Botanical Dossier</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8C7E6A]/15 text-[#1C2E20] font-sans font-medium">
                  {product.series.toUpperCase()} · {product.subgroup}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#DED9D2] hover:bg-[#1C2E20] text-[#2D2D2A] hover:text-[#E8DAC8] transition-all duration-200"
              title="关闭弹窗"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 pt-3 pb-2 border-b border-[#8C7E6A]/15 bg-[#F4F1EA] overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#1C2E20] text-[#E8DAC8] shadow-md'
                : 'text-[#8C7E6A] hover:text-[#1C2E20] hover:bg-[#E8DAC8]/40'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>基本档案与规格</span>
          </button>

          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'scenarios'
                ? 'bg-[#1C2E20] text-[#E8DAC8] shadow-md'
                : 'text-[#8C7E6A] hover:text-[#1C2E20] hover:bg-[#E8DAC8]/40'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>常见功效与场景</span>
          </button>

          <button
            onClick={() => setActiveTab('chemistry')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'chemistry'
                ? 'bg-[#1C2E20] text-[#E8DAC8] shadow-md'
                : 'text-[#8C7E6A] hover:text-[#1C2E20] hover:bg-[#E8DAC8]/40'
            }`}
          >
            <TestTube className="w-3.5 h-3.5" />
            <span>成分与理化结构</span>
          </button>

          <button
            onClick={() => setActiveTab('aliceDiary')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap relative ${
              activeTab === 'aliceDiary'
                ? 'bg-[#1C2E20] text-[#E8DAC8] shadow-md'
                : 'text-[#8C7E6A] hover:text-[#1C2E20] hover:bg-[#E8DAC8]/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C5B49A]" />
            <span>Alice 芳疗日记</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5B49A] absolute top-1 right-1 animate-ping"></span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap relative ${
              activeTab === 'reviews'
                ? 'bg-[#1C2E20] text-[#E8DAC8] shadow-md'
                : 'text-[#8C7E6A] hover:text-[#1C2E20] hover:bg-[#E8DAC8]/40'
            }`}
          >
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#C5B49A]" />
            <span>真实体验与点评</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#C5B49A] text-[#1C2E20] text-[10px] font-mono font-bold">
              {reviewsList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('traceability')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'traceability'
                ? 'bg-[#1C2E20] text-[#E8DAC8] shadow-md'
                : 'text-[#8C7E6A] hover:text-[#1C2E20] hover:bg-[#E8DAC8]/40'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>溯源与 COA 质检</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: OVERVIEW (基本档案与规格) */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Main Visual & Info Grid */}
              <div className="grid md:grid-cols-12 gap-6 items-start">
                
                {/* Left: Product Image & Badge */}
                <div className="md:col-span-5 relative group">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#EFEDE7] border border-[#8C7E6A]/20 shadow-md">
                    <img
                      src={product.image}
                      alt={product.cn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-md border border-[#8C7E6A]/30 text-[#1C2E20] text-[10px] px-3 py-1 rounded-full flex items-center gap-1.5 font-mono shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8C7E6A]" />
                      <span>COA/MSDS 质检已认证</span>
                    </div>
                  </div>

                  {/* Scent Pyramid preview */}
                  {product.scentPyramid && (
                    <div className="mt-3 p-3 rounded-xl bg-[#EFEDE7] border border-[#8C7E6A]/15 grid grid-cols-3 gap-1.5 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-[#8C7E6A] block font-mono">前调 Top</span>
                        <span className="font-medium text-[#1C2E20] text-[11px] truncate block">{product.scentPyramid.top || '清爽草本'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#8C7E6A] block font-mono">中调 Middle</span>
                        <span className="font-medium text-[#1C2E20] text-[11px] truncate block">{product.scentPyramid.middle || '圆润纯花'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#8C7E6A] block font-mono">尾调 Base</span>
                        <span className="font-medium text-[#1C2E20] text-[11px] truncate block">{product.scentPyramid.base || '沉稳木质'}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Key Specs Grid */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#1C2E20] font-bold tracking-tight">
                      {product.cn}
                    </h2>

                    <p className="text-xs text-[#8C7E6A] font-sans italic mt-1 font-medium">
                      {product.en} {product.latinName && `· [ ${product.latinName} ]`}
                    </p>
                  </div>

                  {/* Essential Specs Grid */}
                  <div className="grid grid-cols-2 gap-2.5 bg-[#EFEDE7] p-3.5 rounded-2xl border border-[#8C7E6A]/20 text-xs">
                    <div className="flex items-start gap-2 p-2 rounded-xl bg-[#FAF8F5]/80">
                      <MapPin className="w-4 h-4 text-[#8C7E6A] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] text-[#8C7E6A] block">植物产地</span>
                        <span className="font-semibold text-[#1C2E20]">{product.origin}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-2 rounded-xl bg-[#FAF8F5]/80">
                      <Feather className="w-4 h-4 text-[#8C7E6A] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] text-[#8C7E6A] block">利用部位</span>
                        <span className="font-semibold text-[#1C2E20]">{product.plantPart || '全株芳香部位'}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-2 rounded-xl bg-[#FAF8F5]/80">
                      <Droplet className="w-4 h-4 text-[#8C7E6A] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] text-[#8C7E6A] block">萃取/提取方式</span>
                        <span className="font-semibold text-[#1C2E20]">{product.extractionMethod || '水蒸气蒸馏法'}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-2 rounded-xl bg-[#FAF8F5]/80">
                      <TestTube className="w-4 h-4 text-[#8C7E6A] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] text-[#8C7E6A] block">植物科属</span>
                        <span className="font-semibold text-[#1C2E20] truncate block">{product.botanicalFamily || '原生植物体系'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Storage info box */}
                  <div className="p-3 rounded-xl bg-[#E8DAC8]/30 border border-[#8C7E6A]/25 text-xs flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#8C7E6A] shrink-0" />
                    <div>
                      <span className="text-[10px] text-[#8C7E6A] font-bold block">保存与质保规范 Storage & Shelf Life</span>
                      <span className="text-[#2D2D2A] text-[11px] leading-snug block">{product.storageInfo}</span>
                    </div>
                  </div>

                  {/* Price & Specs Tags */}
                  <div className="p-3.5 rounded-2xl bg-[#EFEDE7] border border-[#8C7E6A]/20 flex items-center justify-between gap-2">
                    <span className="text-xs text-[#8C7E6A] font-medium">规格与价格 Specification</span>
                    <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-[#1C2E20]">
                      {product.prices.map((price, i) => (
                        <span key={i} className="bg-[#FAF8F5] px-3 py-1 rounded-lg border border-[#8C7E6A]/20 shadow-xs">
                          {price}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Short Description */}
                  <div className="text-xs text-[#2D2D2A]/85 leading-relaxed font-sans p-3.5 rounded-2xl bg-[#EFEDE7]/60 border border-[#8C7E6A]/15">
                    {product.description}
                  </div>
                </div>

              </div>

              {/* Benefits Highlight Tags */}
              {product.benefits && product.benefits.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#EFEDE7] border border-[#8C7E6A]/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8C7E6A]" />
                    <span className="text-xs text-[#1C2E20] font-serif font-bold">核心常见功效 Highlight Benefits</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {product.benefits.map((benefit, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#8C7E6A]/25 text-xs text-[#1C2E20] font-medium shadow-2xs hover:border-[#8C7E6A] transition-colors"
                      >
                        ✓ {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured User Review Teaser Card */}
              {reviewsList.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#F4EFEE] border border-[#8C7E6A]/25 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquareQuote className="w-4 h-4 text-[#8C7E6A]" />
                      <span className="text-xs font-serif font-bold text-[#1C2E20]">爱用者真实体感口碑 Community Impression</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="text-[11px] font-mono text-[#8C7E6A] hover:text-[#1C2E20] underline transition-colors"
                    >
                      查看全部 {reviewsList.length} 条评价 →
                    </button>
                  </div>

                  {/* Teaser first review */}
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#8C7E6A]/15 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#1C2E20] text-[#E8DAC8] text-[10px] font-bold flex items-center justify-center">
                          {reviewsList[0].userName[0]}
                        </span>
                        <div>
                          <span className="font-bold text-[#1C2E20]">{reviewsList[0].userName}</span>
                          {reviewsList[0].userTag && (
                            <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-[#8C7E6A]/15 text-[#1C2E20]">
                              {reviewsList[0].userTag}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-[#C5B49A]">
                        {[...Array(reviewsList[0].rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#2D2D2A]/90 italic font-serif leading-relaxed text-[11px]">
                      “{reviewsList[0].comment}”
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SCENARIOS (常见功效与运用场景) */}
          {activeTab === 'scenarios' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-2xl bg-[#1C2E20] text-[#E8DAC8] space-y-1">
                <h3 className="font-serif text-lg font-bold flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-[#C5B49A]" />
                  <span>多维运用场景与芳疗理疗建议</span>
                </h3>
                <p className="text-xs text-[#E8DAC8]/80">
                  结合现代科研文献与经典芳疗经验，将 {product.cn} 的植萃活性融入日常生活场景。
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="p-4 rounded-2xl bg-[#EFEDE7] border border-[#8C7E6A]/20 space-y-2">
                <span className="text-xs font-serif font-bold text-[#1C2E20] block">主要适用调理领域 Core Application Areas</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.benefits?.map((b, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#8C7E6A]/20 text-xs font-medium text-[#1C2E20] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#8C7E6A]"></span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Scenarios Cards */}
              <div className="space-y-3">
                {product.applicationScenarios?.map((scenario, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-[#EFEDE7] border border-[#8C7E6A]/20 space-y-2 hover:border-[#8C7E6A]/50 transition-all shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#1C2E20] text-[#E8DAC8] text-[10px] font-mono font-bold flex items-center justify-center">
                          0{idx + 1}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-[#1C2E20]">{scenario.title}</h4>
                      </div>
                      {scenario.method && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#8C7E6A]/20 text-[#1C2E20] text-[10px] font-mono font-medium">
                          {scenario.method}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#2D2D2A]/85 leading-relaxed pl-7">
                      {scenario.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CHEMISTRY (化学成分与理化结构) */}
          {activeTab === 'chemistry' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-2xl bg-[#EFEDE7] border border-[#8C7E6A]/20 space-y-1">
                <h3 className="font-serif text-base font-bold text-[#1C2E20] flex items-center gap-2">
                  <TestTube className="w-5 h-5 text-[#8C7E6A]" />
                  <span>气相色谱 (GC-MS) 核心活性成分解析</span>
                </h3>
                <p className="text-xs text-[#8C7E6A]">
                  UNIO Aroma 每批次精油均经过独立实验室气相色谱与质谱联用分析，确立天然纯正化学分型。
                </p>
              </div>

              {/* Chemical Compounds List */}
              <div className="grid gap-3">
                {product.chemicalProfile?.map((compound, i) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#8C7E6A]/25 space-y-2 shadow-2xs hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between border-b border-[#8C7E6A]/15 pb-2">
                      <span className="font-serif font-bold text-xs text-[#1C2E20] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#1C2E20]"></span>
                        {compound.name}
                      </span>
                      {compound.percentage && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1C2E20] text-[#E8DAC8] font-mono text-xs font-bold">
                          {compound.percentage}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#2D2D2A]/80 leading-relaxed pt-1">
                      {compound.effect}
                    </p>

                    {/* Simple Bar Visualizer if percentage exists */}
                    {compound.percentage && (
                      <div className="w-full bg-[#EFEDE7] h-1.5 rounded-full overflow-hidden mt-2">
                        <div 
                          className="bg-[#1C2E20] h-full rounded-full" 
                          style={{ width: `${Math.min(parseInt(compound.percentage) || 30, 100)}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ALICE DIARY (Alice 芳疗日记与观察记录) */}
          {activeTab === 'aliceDiary' && product.aliceDiary && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-6 rounded-3xl bg-[#F4EFEE] border border-[#8C7E6A]/30 space-y-4 shadow-md relative overflow-hidden">
                {/* Background Stamp Overlay */}
                <div className="absolute top-4 right-4 text-8xl font-serif text-[#8C7E6A]/10 select-none pointer-events-none font-bold">
                  Alice
                </div>

                <div className="flex items-center justify-between border-b border-[#8C7E6A]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#8C7E6A]" />
                    <h3 className="font-serif text-lg font-bold text-[#1C2E20]">
                      {product.aliceDiary.title}
                    </h3>
                  </div>
                  {product.aliceDiary.date && (
                    <span className="font-mono text-xs text-[#8C7E6A] px-2.5 py-1 rounded-full bg-[#FAF8F5]">
                      {product.aliceDiary.date}
                    </span>
                  )}
                </div>

                <div className="text-xs sm:text-sm text-[#2D2D2A] leading-relaxed font-serif italic space-y-2 bg-[#FAF8F5]/80 p-4 rounded-2xl border border-[#8C7E6A]/15">
                  <p className="whitespace-pre-line">{product.aliceDiary.content}</p>
                </div>

                {/* Key Observation */}
                {product.aliceDiary.keyObservation && (
                  <div className="p-3.5 rounded-2xl bg-[#E8DAC8]/40 border border-[#8C7E6A]/25 text-xs space-y-1">
                    <span className="font-bold text-[#1C2E20] font-sans flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#8C7E6A]" />
                      <span>芳疗师临床核心观察 Observation</span>
                    </span>
                    <p className="text-[#2D2D2A] leading-relaxed">{product.aliceDiary.keyObservation}</p>
                  </div>
                )}

                {/* Blend Suggestion */}
                {product.aliceDiary.blendSuggestion && (
                  <div className="p-3.5 rounded-2xl bg-[#1C2E20] text-[#E8DAC8] text-xs space-y-1">
                    <span className="font-bold font-sans text-[#C5B49A] flex items-center gap-1.5">
                      <Droplet className="w-3.5 h-3.5 text-[#C5B49A]" />
                      <span>Alice 推荐调香复配指南 Blend Synergy</span>
                    </span>
                    <p className="text-[#E8DAC8]/90 font-mono text-[11px] leading-relaxed">{product.aliceDiary.blendSuggestion}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS (真实体验与点评) */}
          {activeTab === 'reviews' && (
            <div className="space-y-5 animate-fade-in">
              
              {/* Rating Banner & Stats */}
              <div className="p-5 rounded-3xl bg-[#1C2E20] text-[#E8DAC8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-3xl font-bold text-[#E8DAC8]">4.9</span>
                    <div className="flex items-center text-[#C5B49A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-[#E8DAC8]/70 font-mono">/ 5.0 满分好评</span>
                  </div>
                  <p className="text-xs text-[#E8DAC8]/80">
                    基于 {reviewsList.length + 86} 位 UNIO 会员与资深芳疗试用者的真实反馈与复配印证。
                  </p>
                </div>

                <button
                  onClick={() => setShowForm(!showForm)}
                  className="px-4 py-2 rounded-full bg-[#C5B49A] hover:bg-[#E8DAC8] text-[#1C2E20] font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0"
                >
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>{showForm ? '收起评价表单' : '写下我的用香点评'}</span>
                </button>
              </div>

              {/* Success Toast */}
              {reviewSubmitted && (
                <div className="p-3.5 rounded-2xl bg-[#1C2E20]/90 text-[#E8DAC8] text-xs flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-[#C5B49A]" />
                  <span>感念分享！您的真实用香心得已成功载入该产品档案库。</span>
                </div>
              )}

              {/* New Review Form Drawer */}
              {showForm && (
                <form 
                  onSubmit={handleAddReview} 
                  className="p-4 sm:p-5 rounded-2xl bg-[#EFEDE7] border border-[#8C7E6A]/30 space-y-3.5 animate-fade-in shadow-inner"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xs text-[#1C2E20] flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-[#8C7E6A]" />
                      <span>添加您的真实植萃试用点评</span>
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] text-[#8C7E6A] font-medium mr-1">给出星级:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="p-0.5 text-[#C5B49A] hover:scale-110 transition-transform"
                        >
                          <Star className={`w-4 h-4 ${star <= newRating ? 'fill-current' : 'opacity-40'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] text-[#8C7E6A] font-bold mb-1">您的昵称或称呼</label>
                      <input
                        type="text"
                        placeholder="如: 林女士 / 芳香小白"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#8C7E6A]/25 text-[#1C2E20] focus:outline-none focus:border-[#1C2E20]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#8C7E6A] font-bold mb-1">身份或体验标签</label>
                      <input
                        type="text"
                        placeholder="如: 程序员/高压睡眠调理 / 瑜伽爱好者"
                        value={newUserTag}
                        onChange={(e) => setNewUserTag(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#8C7E6A]/25 text-[#1C2E20] focus:outline-none focus:border-[#1C2E20]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#8C7E6A] font-bold mb-1">使用方式与配方场景</label>
                    <input
                      type="text"
                      placeholder="如: 睡前香薰机扩香 3滴 + 荷荷巴油推拿"
                      value={newScenario}
                      onChange={(e) => setNewScenario(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#8C7E6A]/25 text-[#1C2E20] text-xs focus:outline-none focus:border-[#1C2E20]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#8C7E6A] font-bold mb-1">使用感受与心得点评 *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="分享您在使用这款产品时的香气感受、身心变化或调香惊喜..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#8C7E6A]/25 text-[#1C2E20] text-xs focus:outline-none focus:border-[#1C2E20]"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-1.5 rounded-full bg-[#DED9D2] text-[#2D2D2A] text-xs font-medium hover:bg-[#8C7E6A] hover:text-[#FAF8F5] transition-colors"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-1.5 rounded-full bg-[#1C2E20] text-[#E8DAC8] text-xs font-bold hover:bg-[#8C7E6A] hover:text-[#1C2E20] transition-colors shadow-xs"
                    >
                      提交体验点评
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-3.5">
                {reviewsList.map((rev) => {
                  const isLiked = likedMap[rev.id || rev.userName];
                  const currentLikes = (rev.likesCount || 10) + (isLiked ? 1 : 0);

                  return (
                    <div 
                      key={rev.id || rev.userName}
                      className="p-4 rounded-2xl bg-[#EFEDE7]/90 border border-[#8C7E6A]/20 space-y-2.5 hover:border-[#8C7E6A]/40 transition-all shadow-2xs"
                    >
                      {/* Reviewer Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-full bg-[#1C2E20] text-[#E8DAC8] text-xs font-bold flex items-center justify-center shrink-0">
                            {rev.userName[0]}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-xs text-[#1C2E20]">{rev.userName}</span>
                              {rev.userTag && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8C7E6A]/15 text-[#1C2E20] font-sans font-medium">
                                  {rev.userTag}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-[#8C7E6A] block pt-0.5">{rev.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5 text-[#C5B49A]">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Usage Scenario tag if present */}
                      {rev.usageScenario && (
                        <div className="text-[10px] font-mono text-[#8C7E6A] bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#8C7E6A]/15 inline-block">
                          💡 体验用法: {rev.usageScenario}
                        </div>
                      )}

                      {/* Comment text */}
                      <p className="text-xs text-[#2D2D2A] leading-relaxed font-sans pt-0.5">
                        {rev.comment}
                      </p>

                      {/* Footer Like Action */}
                      <div className="flex items-center justify-end pt-1 border-t border-[#8C7E6A]/10">
                        <button
                          onClick={() => handleToggleLike(rev.id || rev.userName)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                            isLiked 
                              ? 'bg-[#1C2E20] text-[#E8DAC8]' 
                              : 'bg-[#FAF8F5] text-[#8C7E6A] hover:text-[#1C2E20] border border-[#8C7E6A]/15'
                          }`}
                        >
                          <ThumbsUp className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
                          <span>有用 ({currentLikes})</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 6: TRACEABILITY (溯源与 COA 质检) */}
          {activeTab === 'traceability' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-5 rounded-2xl bg-[#EFEDE7] border border-[#8C7E6A]/20 space-y-3">
                <div className="flex items-center justify-between border-b border-[#8C7E6A]/20 pb-2">
                  <span className="font-mono text-xs font-bold text-[#1C2E20]">COA 检验报告编号</span>
                  <span className="font-mono text-xs text-[#8C7E6A]">{product.coaNumber}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#8C7E6A]/20 pb-2">
                  <span className="font-mono text-xs font-bold text-[#1C2E20]">生产追溯批次号</span>
                  <span className="font-mono text-xs text-[#8C7E6A]">{product.batchTrace}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1C2E20]">检测标准认证</span>
                  <span className="font-mono text-xs text-[#1C2E20] font-semibold">100% Pure Essential Oil / MSDS Verified</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#8C7E6A]/20 text-xs text-[#8C7E6A] leading-relaxed space-y-2">
                <div className="flex items-center gap-2 text-[#1C2E20] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#8C7E6A]" />
                  <span>UNIO 纯正品质保证与溯源承诺</span>
                </div>
                <p>
                  UNIO 元香坚持严选全球 28 国原生产地源头农场与第三代资深蒸馏专家。所有精油作品均不添加任何合成香精、防腐剂与重金属溶剂。如需调阅完整气相色谱 (GC-MS) 报告全文或 MSDS 安全技术数据表，请联系专属芳疗顾问。
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-[#8C7E6A]/20 bg-[#EFEDE7] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleCopyDossier}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF8F5] border border-[#8C7E6A]/30 hover:bg-[#E8DAC8] text-xs text-[#1C2E20] transition-all font-semibold shadow-xs active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-[#1C2E20]" /> : <Copy className="w-4 h-4 text-[#8C7E6A]" />}
            <span>{copied ? '已成功复制完整芳疗档案 Dossier' : '复制产品完整芳疗档案 Dossier'}</span>
          </button>

          {onAddToCustomBlend && (
            <button
              onClick={() => {
                onAddToCustomBlend(product);
                onClose();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#1C2E20] text-[#E8DAC8] text-xs font-bold hover:bg-[#8C7E6A] hover:text-[#1C2E20] transition-all shadow-md active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#C5B49A]" />
              <span>加入 AI 一人一方配方库</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

