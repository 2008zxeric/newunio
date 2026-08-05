import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { 
  LayoutDashboard, Package, MapPin, Layers, Image as ImageIcon, 
  DollarSign, MessageSquare, ShieldCheck, Search, Plus, Edit2, 
  Trash2, Eye, EyeOff, Save, CheckCircle2, AlertCircle, RefreshCw, Lock, Key, Download, 
  Sparkles, Calculator, ShieldAlert, Sliders, Activity, FlaskConical, Droplet, Sun, Baby, 
  HeartPulse, Brain, Moon, Wind, Check, FileText, Settings, Award, AlertTriangle
} from 'lucide-react';
import { ProductItem, Country, SeriesKey } from '../types';
import { fetchProductsFromSupabase, fetchCountriesFromSupabase } from '../data/siteDataService';
import { UnioLogo } from './UnioLogo';
import { SeriesCardHandoverDocModal } from './SeriesCardHandoverDocModal';
import { matchProductWithPinyin } from '../utils/pinyinSearch';
import { fetchFrontConfig, saveFrontConfig } from '../lib/configService';

interface CarrierOilItem {
  id: string;
  nameCn: string;
  nameEn: string;
  density: string;
  absorption: string;
  bestFor: string;
  status: 'active' | 'inactive';
}

interface SafetyRuleItem {
  id: string;
  category: 'photosensitive' | 'pregnancy' | 'allergen' | 'patchTest';
  oilName: string;
  level: string;
  warningText: string;
  avoidHours?: number;
}

interface FormulaExportLog {
  id: string;
  oilCode: string;
  oilName: string;
  carrierMl: number;
  dilutionPercent: number;
  totalDrops: number;
  date: string;
  exportedBy: string;
}

export const AdminConsole: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHandoverDocOpen, setIsHandoverDocOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'calculator' | 'safety' | 'spectrum' | 'inventory' | 'origins' | 'series' | 'reviews'
  >('dashboard');
  
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters for products
  const [productQuery, setProductQuery] = useState('');
  const [selectedSeriesFilter, setSelectedSeriesFilter] = useState<string>('all');

  // Editing modal state
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Carrier Oils State (Dilution Calculator Admin)
  const [carrierOils, setCarrierOils] = useState<CarrierOilItem[]>([
    { id: '1', nameCn: '有机荷荷巴油', nameEn: 'Jojoba Oil', density: '0.86 g/ml', absorption: '中等亲肤，接近人皮脂', bestFor: '面部抗衰、水油平衡、敏弱屏障', status: 'active' },
    { id: '2', nameCn: '冷压甜杏仁油', nameEn: 'Sweet Almond Oil', density: '0.91 g/ml', absorption: '高滋润度，延展性极佳', bestFor: '全身舒压按摩、干性肌肤', status: 'active' },
    { id: '3', nameCn: '智利野生玫瑰果油', nameEn: 'Rosehip Seed Oil', density: '0.92 g/ml', absorption: '深层渗透，抗氧化', bestFor: '淡化细纹、印痕修护、夜间焕采', status: 'active' },
    { id: '4', nameCn: '极萃葡萄籽油', nameEn: 'Grapeseed Oil', density: '0.90 g/ml', absorption: '清爽易吸收，零油腻感', bestFor: '油性肌肤、夏季清爽调配', status: 'active' },
    { id: '5', nameCn: '摩洛哥阿甘坚果油', nameEn: 'Argan Oil', density: '0.91 g/ml', absorption: '醇厚滋养，锁水屏障', bestFor: '熟龄肌修护、发丝滋养', status: 'active' },
  ]);

  const [editingCarrier, setEditingCarrier] = useState<CarrierOilItem | null>(null);
  const [newCarrier, setNewCarrier] = useState<Partial<CarrierOilItem>>({
    nameCn: '',
    nameEn: '',
    density: '0.90 g/ml',
    absorption: '中等亲肤',
    bestFor: '通用调配',
    status: 'active',
  });
  const [isAddingCarrier, setIsAddingCarrier] = useState(false);

  // Dilution Presets Config
  const [dropRatioFactor, setDropRatioFactor] = useState<number>(20); // 1ml = 20 drops
  const [watermarkText, setWatermarkText] = useState<string>('UNIO BOTANICAL ARCHIVE · 东方植萃 芳疗验印');
  const [formulaSerialPrefix, setFormulaSerialPrefix] = useState<string>('UNIO-FORMULA-2026-');

  // Safety Advisory Admin State
  const [safetyRules, setSafetyRules] = useState<SafetyRuleItem[]>([
    { id: '1', category: 'photosensitive', oilName: '佛手柑 / 柠檬 / 甜橙 / 青柠', level: '高风险', warningText: '含有呋喃香豆素成分，涂抹后 12 小时内严禁晒太阳或接触强紫外线灯。', avoidHours: 12 },
    { id: '2', category: 'pregnancy', oilName: '迷迭香 / 鼠尾草 / 百里香 / 樟树', level: '全阶段禁用', warningText: '含高活性樟脑或单萜酮成分，具强通经与刺激宫缩作用，孕妇全期禁用。' },
    { id: '3', category: 'pregnancy', oilName: '大马士革玫瑰 / 薰衣草 / 依兰 / 茉莉', level: '孕早期禁用', warningText: '孕前12周建议严格禁用，孕中晚期扩香使用浓度需低于 0.5%。' },
    { id: '4', category: 'allergen', oilName: '松木 / 冷杉 / 杜松子', level: 'EU 26过敏源', warningText: '含有柠檬烯 (Limonene) 与 蒎烯 (Pinene)，易敏肌肤使用前必须作 24 小时皮试。' },
    { id: '5', category: 'patchTest', oilName: '高纯单方精油通用规则', level: '强制测试', warningText: '切勿未经稀释直接接触黏膜或原液点涂。首用请作臂内侧皮试。' },
  ]);

  // Formula Card Export Log Simulation
  const [formulaLogs] = useState<FormulaExportLog[]>([
    { id: 'FL-2026-0801', oilCode: 'EO-101', oilName: '神圣乳香精油', carrierMl: 30, dilutionPercent: 1.0, totalDrops: 6, date: '2026-08-01 14:22', exportedBy: 'Cynthia (北京)' },
    { id: 'FL-2026-0802', oilCode: 'EO-102', oilName: '保加利亚大马士革玫瑰', carrierMl: 50, dilutionPercent: 0.5, totalDrops: 5, date: '2026-08-01 16:05', exportedBy: 'Alice (上海)' },
    { id: 'FL-2026-0803', oilCode: 'EO-105', oilName: '普罗旺斯高地薰衣草', carrierMl: 30, dilutionPercent: 2.0, totalDrops: 12, date: '2026-08-02 09:15', exportedBy: '林元香 (广州)' },
    { id: 'FL-2026-0804', oilCode: 'EO-108', oilName: '大西洋雪松精油', carrierMl: 100, dilutionPercent: 1.5, totalDrops: 30, date: '2026-08-02 10:40', exportedBy: '陈观微 (成都)' },
  ]);

  // Efficacy Spectrum Admin Config (Per Product Rating)
  const [selectedSpectrumOilCode, setSelectedSpectrumOilCode] = useState<string>('EO-101');
  const [spectrumRatings, setSpectrumRatings] = useState<Record<string, { emotional: number; sleep: number; skin: number; respiratory: number; focus: number }>>({
    'EO-101': { emotional: 95, sleep: 88, skin: 92, respiratory: 78, focus: 85 },
    'EO-102': { emotional: 98, sleep: 82, skin: 96, respiratory: 65, focus: 72 },
    'EO-105': { emotional: 94, sleep: 96, skin: 88, respiratory: 70, focus: 60 },
    'EO-108': { emotional: 86, sleep: 75, skin: 80, respiratory: 90, focus: 92 },
  });

  // Reviews State
  const [reviews, setReviews] = useState([
    { id: '1', user: '林元香', text: '神圣乳香在夜间熏香时让人心境极其沉静，使用调配计算器生成的卡片比例非常精准！', rating: 5, date: '2026-07-28', status: 'approved' },
    { id: '2', user: 'Alice_Scent', text: '大马士革玫瑰纯露用来湿敷，配方导出的水印卡片十分有东方仪式感。', rating: 5, date: '2026-07-25', status: 'approved' },
    { id: '3', user: '陈观微', text: '大西洋雪松精油的木质调非常醇厚，搭配浓度计算器换算的12滴复配很适合晚上安神。', rating: 5, date: '2026-07-20', status: 'pending' },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    async function loadAdminData() {
      setLoading(true);
      const [pData, cData, cfg] = await Promise.all([
        fetchProductsFromSupabase(),
        fetchCountriesFromSupabase(),
        fetchFrontConfig(),
      ]);
      setProducts(pData);
      setCountries(cData);
      // 从 Storage 载入可配置数据（有则用，无则保持本地默认）
      if (cfg) {
        if (cfg.carrier_oils?.length) setCarrierOils(cfg.carrier_oils as any);
        if (cfg.safety_rules?.length) setSafetyRules(cfg.safety_rules as any);
        if (cfg.spectrum_ratings && Object.keys(cfg.spectrum_ratings).length) setSpectrumRatings(cfg.spectrum_ratings);
      }
      if (pData.length > 0) {
        setSelectedSpectrumOilCode(pData[0].code);
      }
      setLoading(false);
    }
    loadAdminData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '2003' || passcode === 'admin' || passcode === 'unio') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedSeriesFilter !== 'all' && p.series !== selectedSeriesFilter) return false;
      if (productQuery.trim()) {
        return matchProductWithPinyin(p, productQuery);
      }
      return true;
    });
  }, [products, selectedSeriesFilter, productQuery]);

  const handleSaveProduct = async (updated: ProductItem) => {
    // 1. 更新前端 state（即时反馈）
    setProducts((prev) => prev.map((p) => (p.code === updated.code ? updated : p)));
    setEditingProduct(null);
    showToast(`已成功保存精油作品：【${updated.cn}】`);
    // 2. 持久化到 Supabase（含复方/器物/成分等新字段）
    try {
      const payload: Record<string, unknown> = {
        name_cn: updated.cn,
        name_en: updated.en,
        origin: updated.origin,
        image_url: updated.image,
        description: updated.description || updated.shortDesc || '',
        short_desc: updated.shortDesc || '',
        element: updated.subgroup,
        series_code: updated.series,
        price: updated.prices?.[0] || null,
        is_compound: updated.isCompound || updated.series === 'he' || false,
        blend_formula: updated.blendFormula || null,
        artifact_specs: updated.artifactSpecs || null,
        ingredients: updated.ingredients ? JSON.stringify(updated.ingredients) : null,
        formulation: updated.formulation || null,
        scent_pyramid: updated.scentPyramid || null,
        narrative: updated.ericNotes || null,
        alice_lab: updated.aromatherapistNotes || updated.aliceDiary?.content || null,
      };
      const { error } = await supabase.from('products').update(payload).eq('code', updated.code);
      if (error) console.warn('保存到 Supabase 失败:', error.message);
      else showToast(`已同步保存到数据库：【${updated.cn}】`);
    } catch (e) {
      console.warn('Supabase 保存异常:', e);
    }
  };

  const handleToggleActiveProduct = (code: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.code === code ? { ...p, isActive: !p.isActive } : p))
    );
    showToast('更新上架状态成功');
  };

  const exportCSV = () => {
    const headers = ['编号', '代码', '中文名', '英文/学名', '系列', '分类', '产地', '价格', 'COA号'];
    const rows = products.map(p => [
      p.no,
      p.code,
      `"${p.cn}"`,
      `"${p.en}"`,
      p.series,
      p.subgroup,
      p.origin,
      `"${p.prices.join(' / ')}"`,
      p.coaNumber || ''
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `UNIO_Aroma_Catalog_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('已导出全量产品 CSV 表格');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 sm:my-16 p-6 sm:p-8 rounded-3xl bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <UnioLogo size={36} color="#d2c4ad" className="mx-auto" />
          <h2 className="font-serif text-2xl text-[#d2c4ad] font-semibold">UNIO 元香 管理控制台</h2>
          <p className="text-xs text-[#b4aca2]">请输入管理员密钥（默认: 2003）</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#d2c4ad]" />
            <input
              type="password"
              placeholder="请输入管理员密钥..."
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d2c4ad]"
            />
          </div>

          {authError && (
            <p className="text-xs text-rose-400 text-center">密钥不正确，请尝试 2003 或 admin</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#d2c4ad] text-[#2D2D2A] font-serif font-bold text-xs hover:bg-[#c5b59c] transition-all cursor-pointer"
          >
            进入管理控制台
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 sm:space-y-8 text-[#2D2D2A]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl bg-[#C5B49A] text-[#1C2E20] font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Luxury Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0c120e] text-[#f6f2eb] p-5 sm:p-6 rounded-3xl border border-[#d2c4ad]/30 shadow-2xl">
        <div className="flex items-center gap-3">
          <UnioLogo size={36} color="#d2c4ad" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-base sm:text-2xl text-[#d2c4ad] font-bold whitespace-nowrap">
                UNIO AROMA 元香 中枢管理控制台
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-[#C5B49A]/20 text-[#C5B49A] text-[10px] font-mono border border-[#C5B49A]/30">
                v2026.8
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-[#b4aca2] font-mono mt-0.5">
              SUPABASE ONLINE · {products.length} 精油作品 · {carrierOils.length} 基础油标本 · 浓度计算器/安全预警管理已接入
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setIsHandoverDocOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#d2c4ad] text-[#2D2D2A] hover:bg-[#e2d4bd] text-xs font-serif font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            title="查看四大产品系列卡面规则与后台实现交接文档"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>卡面交接与后台规范</span>
          </button>
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 rounded-xl bg-white/10 text-xs text-[#d2c4ad] hover:bg-white/20 transition-all flex items-center gap-1.5 font-serif cursor-pointer"
            title="导出为 CSV 表格"
          >
            <Download className="w-3.5 h-3.5" />
            <span>全量导出 CSV</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3.5 py-2 rounded-xl bg-white/10 text-xs text-[#b4aca2] hover:bg-white/20 transition-all cursor-pointer"
          >
            安全退出
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#2D2D2A]/10">
        {[
          { id: 'dashboard', label: '📊 仪表盘概览', icon: LayoutDashboard },
          { id: 'products', label: `🌿 精油作品库 (${products.length})`, icon: Package },
          { id: 'calculator', label: `🧪 浓度计算与配方参数 (${carrierOils.length})`, icon: Calculator },
          { id: 'safety', label: `🛡️ 芳疗安全与禁忌库 (${safetyRules.length})`, icon: ShieldAlert },
          { id: 'spectrum', label: '📈 疗效图谱五维调校', icon: Activity },
          { id: 'inventory', label: '📦 库存与成本', icon: DollarSign },
          { id: 'origins', label: `🗺️ 寻香地标 (${countries.length})`, icon: MapPin },
          { id: 'series', label: '🏷️ 四大系列配置', icon: Layers },
          { id: 'reviews', label: `💬 鉴赏家评价 (${reviews.length})`, icon: MessageSquare },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-serif whitespace-nowrap transition-all cursor-pointer ${
              activeTab === t.id
                ? 'bg-[#0c120e] text-[#d2c4ad] font-bold shadow-md border border-[#d2c4ad]/40'
                : 'bg-[#F9F7F2] text-[#8C7E6A] hover:bg-[#DED9D2] border border-transparent'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#2D2D2A]/10 space-y-1 shadow-xs hover:shadow-md transition-all">
              <span className="text-[10px] sm:text-xs text-[#8C7E6A] uppercase font-mono block truncate">在售精油档案</span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2D2A]">{products.length} 款</div>
              <span className="text-[9px] sm:text-[10px] text-emerald-700 font-mono block truncate">包含 元/合/生/香 体系</span>
            </div>

            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#2D2D2A]/10 space-y-1 shadow-xs hover:shadow-md transition-all">
              <span className="text-[10px] sm:text-xs text-[#8C7E6A] uppercase font-mono block truncate">基础植物油标本</span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2D2A]">{carrierOils.length} 种</div>
              <span className="text-[9px] sm:text-[10px] text-emerald-700 font-mono block truncate">均已配置密度与吸收度</span>
            </div>

            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#2D2D2A]/10 space-y-1 shadow-xs hover:shadow-md transition-all">
              <span className="text-[10px] sm:text-xs text-[#8C7E6A] uppercase font-mono block truncate">调配计算器使用量</span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2D2A]">3,920+ 次</div>
              <span className="text-[9px] sm:text-[10px] text-emerald-700 font-mono block truncate">导出的配方卡片 840+ 张</span>
            </div>

            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#2D2D2A]/10 space-y-1 shadow-xs hover:shadow-md transition-all">
              <span className="text-[10px] sm:text-xs text-[#8C7E6A] uppercase font-mono block truncate">安全合规与预警率</span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2D2A]">100% 涵盖</div>
              <span className="text-[9px] sm:text-[10px] text-amber-700 font-mono block truncate">含孕期/光敏/EU过敏源</span>
            </div>
          </div>

          {/* New Feature Admin Overview Banner */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 space-y-4 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-3">
              <div>
                <h3 className="font-serif text-lg text-[#d2c4ad] font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C5B49A]" />
                  <span>新增芳疗模块中枢管理状态</span>
                </h3>
                <p className="text-xs text-[#b4aca2] mt-0.5">
                  精油安全稀释计算器、芳疗安全预警与效果图谱已成功在客户端与详情页加载
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('calculator')}
                  className="px-3 py-1.5 rounded-xl bg-[#d2c4ad] text-[#2D2D2A] font-serif font-bold text-xs hover:bg-[#e5d8c5] transition-all cursor-pointer"
                >
                  配置计算器
                </button>
                <button
                  onClick={() => setActiveTab('safety')}
                  className="px-3 py-1.5 rounded-xl bg-white/10 text-[#d2c4ad] font-serif text-xs hover:bg-white/20 transition-all cursor-pointer"
                >
                  维护安全禁忌
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs font-serif font-bold text-[#C5B49A] flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" />
                  精油稀释计算器
                </div>
                <p className="text-[11px] text-[#b4aca2] leading-relaxed">
                  标准换算: 1ml = {dropRatioFactor} 滴精油。支持预设 0.5%, 1.0%, 2.0%, 3.0% 浓度与基础油参数。
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs font-serif font-bold text-amber-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  安全禁忌与过敏源
                </div>
                <p className="text-[11px] text-[#b4aca2] leading-relaxed">
                  针对柑橘光敏性（12h避光）、孕期阶段禁忌、及 EU 标准 26 种自然芳香过敏源提示。
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs font-serif font-bold text-emerald-300 flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  身心效果五维图谱
                </div>
                <p className="text-[11px] text-[#b4aca2] leading-relaxed">
                  从情绪舒缓、深度睡眠、肌肤屏障修护、呼吸道通透、专注沉静量化评分。
                </p>
              </div>
            </div>
          </div>

          {/* Formula Export Logs Table Preview */}
          <div className="bg-white rounded-3xl border border-[#2D2D2A]/10 p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-[#2D2D2A]/10 pb-2">
              <h3 className="font-serif font-bold text-sm text-[#2D2D2A] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#8C7E6A]" />
                近期客户调配配方卡片导出日志 (Formula Card Logs)
              </h3>
              <span className="text-xs text-[#8C7E6A] font-mono">水印前缀: {formulaSerialPrefix}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#2D2D2A]">
                <thead className="bg-[#F9F7F2] text-[#8C7E6A] font-serif">
                  <tr>
                    <th className="p-2.5">配方编号</th>
                    <th className="p-2.5">主调精油</th>
                    <th className="p-2.5">基础油容量</th>
                    <th className="p-2.5">目标浓度</th>
                    <th className="p-2.5">换算总滴数</th>
                    <th className="p-2.5">生成时间</th>
                    <th className="p-2.5">调配地点/客户</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2D2D2A]/10 font-mono">
                  {formulaLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#F9F7F2]/60">
                      <td className="p-2.5 text-[#8C7E6A] font-bold">{log.id}</td>
                      <td className="p-2.5 font-serif font-semibold">{log.oilName} ({log.oilCode})</td>
                      <td className="p-2.5">{log.carrierMl} ml</td>
                      <td className="p-2.5">{log.dilutionPercent} %</td>
                      <td className="p-2.5 font-bold text-emerald-800">{log.totalDrops} 滴</td>
                      <td className="p-2.5 text-[#8C7E6A]">{log.date}</td>
                      <td className="p-2.5 font-sans">{log.exportedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS CATALOG */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-[#F9F7F2] p-3 sm:p-4 rounded-2xl border border-[#2D2D2A]/10">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
              {['all', 'yuan', 'he', 'sheng', 'jing'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSeriesFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-serif whitespace-nowrap transition-all cursor-pointer ${
                    selectedSeriesFilter === s
                      ? 'bg-[#2D2D2A] text-[#d2c4ad] font-bold shadow-xs'
                      : 'bg-white text-[#8C7E6A] border border-[#2D2D2A]/10'
                  }`}
                >
                  {s === 'all' ? '全部作品' : s === 'yuan' ? '元 Pure (单方)' : s === 'he' ? '合 Harmony (复方)' : s === 'sheng' ? '生 Life (纯露)' : '香 Scent (器物)'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7E6A]" />
                <input
                  type="text"
                  placeholder="搜索精油名称/代码/产地..."
                  value={productQuery}
                  onChange={(e) => setProductQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-[#2D2D2A]/15 text-xs text-[#2D2D2A] focus:outline-none"
                />
              </div>

              <button
                onClick={() => setIsCreatingProduct(true)}
                className="px-3.5 py-1.5 rounded-xl bg-[#0c120e] text-[#d2c4ad] text-xs font-serif font-bold whitespace-nowrap flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>新增精油</span>
              </button>
            </div>
          </div>

          {/* Desktop Product Table */}
          <div className="bg-white rounded-3xl border border-[#2D2D2A]/10 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs text-[#2D2D2A]">
              <thead className="bg-[#F9F7F2] text-[#8C7E6A] font-serif border-b border-[#2D2D2A]/10">
                <tr>
                  <th className="p-3">编码</th>
                  <th className="p-3">精油中文名 / 学名</th>
                  <th className="p-3">产地与采风地标</th>
                  <th className="p-3">系列与分类</th>
                  <th className="p-3">价格规格</th>
                  <th className="p-3">上架状态</th>
                  <th className="p-3 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D2D2A]/10">
                {filteredProducts.map((p) => (
                  <tr key={p.code} className="hover:bg-[#F9F7F2]/60 transition-colors">
                    <td className="p-3 font-mono font-bold text-[#8C7E6A]">{p.code}</td>
                    <td className="p-3">
                      <div className="font-serif font-semibold text-sm">{p.cn}</div>
                      <div className="text-[10px] text-[#8C7E6A] font-mono italic">{p.en}</div>
                    </td>
                    <td className="p-3 text-[#8C7E6A]">{p.origin}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-[#2D2D2A]/5 text-[10px] font-mono font-bold">
                        {p.series} / {p.subgroup}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-semibold text-[#2D2D2A]">
                      {p.prices.join(', ')}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleToggleActiveProduct(p.code)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono cursor-pointer ${
                          p.isActive !== false
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {p.isActive !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {p.isActive !== false ? '在售上架' : '下架隐藏'}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="p-1.5 rounded-lg bg-[#2D2D2A]/5 hover:bg-[#2D2D2A] hover:text-[#d2c4ad] transition-all text-[#2D2D2A] cursor-pointer"
                        title="编辑精油参数"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DILUTION CALCULATOR & CARRIER OILS ADMIN */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#2D2D2A]/10 p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-[#2D2D2A]/10 pb-3">
              <div>
                <h3 className="font-serif font-bold text-base text-[#2D2D2A] flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#8C7E6A]" />
                  <span>精油稀释计算器参数与基础植物油数据库</span>
                </h3>
                <p className="text-xs text-[#8C7E6A]">
                  维护客户端调配计算器调用的基础植物油选项、密谋换算标准与配方卡水印参数
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddingCarrier(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0c120e] text-[#d2c4ad] text-xs font-serif font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>添加基础植物油</span>
                </button>
              </div>
            </div>

            {/* Global Ratio Settings Card */}
            <div className="p-4 rounded-2xl bg-[#F9F7F2] border border-[#2D2D2A]/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-serif font-bold text-[#2D2D2A] block mb-1">
                  精油换算基准 (滴数/ml)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={dropRatioFactor}
                    onChange={(e) => setDropRatioFactor(Number(e.target.value) || 20)}
                    className="w-20 px-3 py-1.5 rounded-xl bg-white border border-[#2D2D2A]/15 font-mono text-center font-bold"
                  />
                  <span className="text-[#8C7E6A]">滴 = 1 毫升 (ml)</span>
                </div>
              </div>

              <div>
                <label className="font-serif font-bold text-[#2D2D2A] block mb-1">
                  导出卡片水印文字 (Watermark)
                </label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#2D2D2A]/15 text-xs font-serif"
                />
              </div>

              <div>
                <label className="font-serif font-bold text-[#2D2D2A] block mb-1">
                  调配案编号前缀 (Serial Prefix)
                </label>
                <input
                  type="text"
                  value={formulaSerialPrefix}
                  onChange={(e) => setFormulaSerialPrefix(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#2D2D2A]/15 text-xs font-mono"
                />
              </div>
            </div>

            {/* Carrier Oils Table */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-xs text-[#2D2D2A]">【已入库基础植物油/媒介油清单】</h4>
              <div className="overflow-x-auto rounded-2xl border border-[#2D2D2A]/10">
                <table className="w-full text-left text-xs text-[#2D2D2A]">
                  <thead className="bg-[#F9F7F2] text-[#8C7E6A] font-serif border-b border-[#2D2D2A]/10">
                    <tr>
                      <th className="p-3">名称 (中文/英文)</th>
                      <th className="p-3">密度参数</th>
                      <th className="p-3">吸收度与触感</th>
                      <th className="p-3">推荐调配用途</th>
                      <th className="p-3">状态</th>
                      <th className="p-3 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2D2D2A]/10">
                    {carrierOils.map((c) => (
                      <tr key={c.id} className="hover:bg-[#F9F7F2]/60">
                        <td className="p-3">
                          <div className="font-serif font-bold">{c.nameCn}</div>
                          <div className="text-[10px] text-[#8C7E6A] font-mono">{c.nameEn}</div>
                        </td>
                        <td className="p-3 font-mono font-bold text-[#8C7E6A]">{c.density}</td>
                        <td className="p-3 text-[#8C7E6A]">{c.absorption}</td>
                        <td className="p-3 font-serif">{c.bestFor}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${c.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}>
                            {c.status === 'active' ? '启用' : '禁用'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setEditingCarrier(c)}
                            className="p-1 rounded-lg hover:bg-black/5 text-[#2D2D2A] cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SAFETY ADVISORY & CONTRAINDICATIONS MATRIX */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#2D2D2A]/10 p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-[#2D2D2A]/10 pb-3">
              <div>
                <h3 className="font-serif font-bold text-base text-[#2D2D2A] flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <span>芳疗安全预警与禁忌准则管理</span>
                </h3>
                <p className="text-xs text-[#8C7E6A]">
                  维护精油在孕期禁忌、日光光敏性、欧盟 26 种自然芳香过敏源及斑贴测试指南
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safetyRules.map((rule) => (
                <div
                  key={rule.id}
                  className="p-4 rounded-2xl bg-[#F9F7F2] border border-[#2D2D2A]/10 space-y-2 relative"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-serif font-bold text-xs text-[#2D2D2A] flex items-center gap-1.5">
                      {rule.category === 'photosensitive' && <Sun className="w-4 h-4 text-amber-600" />}
                      {rule.category === 'pregnancy' && <Baby className="w-4 h-4 text-rose-600" />}
                      {rule.category === 'allergen' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                      {rule.category === 'patchTest' && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                      {rule.oilName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      {rule.level}
                    </span>
                  </div>

                  <p className="text-xs text-[#8C7E6A] leading-relaxed">
                    {rule.warningText}
                  </p>

                  {rule.avoidHours && (
                    <div className="text-[10px] font-mono text-amber-800 font-bold pt-1">
                      推荐涂抹后避光时常: {rule.avoidHours} 小时
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: EFFICACY SPECTRUM CONFIGURATOR */}
      {activeTab === 'spectrum' && (
        <div className="bg-white rounded-3xl border border-[#2D2D2A]/10 p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="border-b border-[#2D2D2A]/10 pb-3">
            <h3 className="font-serif font-bold text-base text-[#2D2D2A] flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-700" />
              <span>精油身心疗效五维图谱评分调校</span>
            </h3>
            <p className="text-xs text-[#8C7E6A]">
              量化设定每一款精油在情绪舒缓、深度睡眠、屏障修护、呼吸通透、专注沉静维度的疗效指数
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-serif font-bold text-[#2D2D2A]">选择精油作品:</label>
            <select
              value={selectedSpectrumOilCode}
              onChange={(e) => setSelectedSpectrumOilCode(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs font-serif focus:outline-none"
            >
              {products.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.cn} ({p.code}) - {p.subgroup}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Sliders */}
          {selectedSpectrumOilCode && (
            <div className="p-5 rounded-2xl bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 space-y-4 max-w-2xl">
              <h4 className="font-serif text-sm font-bold text-[#d2c4ad]">
                当前编辑作品: 【{products.find(p => p.code === selectedSpectrumOilCode)?.cn}】
              </h4>

              {(() => {
                const cur = spectrumRatings[selectedSpectrumOilCode] || { emotional: 85, sleep: 75, skin: 80, respiratory: 70, focus: 65 };
                const updateCur = (key: string, val: number) => {
                  setSpectrumRatings({
                    ...spectrumRatings,
                    [selectedSpectrumOilCode]: {
                      ...cur,
                      [key]: val,
                    },
                  });
                };

                return (
                  <div className="space-y-3 text-xs">
                    {[
                      { key: 'emotional', label: '1. 情绪舒缓 & 压力疏解', icon: HeartPulse, val: cur.emotional },
                      { key: 'sleep', label: '2. 深度睡眠 & 镇静安神', icon: Moon, val: cur.sleep },
                      { key: 'skin', label: '3. 肌肤屏障修护 & 赋活', icon: Sparkles, val: cur.skin },
                      { key: 'respiratory', label: '4. 呼吸道通透 & 净化', icon: Wind, val: cur.respiratory },
                      { key: 'focus', label: '5. 专注沉静 & 认知提振', icon: Brain, val: cur.focus },
                    ].map((item) => {
                      const IconComp = item.icon;
                      return (
                        <div key={item.key} className="space-y-1">
                          <div className="flex justify-between items-center text-[#d2c4ad]">
                            <span className="flex items-center gap-1.5 font-serif">
                              <IconComp className="w-3.5 h-3.5" />
                              {item.label}
                            </span>
                            <span className="font-mono font-bold">{item.val}%</span>
                          </div>
                          <input
                            type="range"
                            min={20}
                            max={100}
                            value={item.val}
                            onChange={(e) => updateCur(item.key, Number(e.target.value))}
                            className="w-full accent-[#C5B49A] cursor-pointer"
                          />
                        </div>
                      );
                    })}

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => showToast(`已更新【${selectedSpectrumOilCode}】五维疗效评分`)}
                        className="px-4 py-2 rounded-xl bg-[#d2c4ad] text-[#2D2D2A] font-serif font-bold text-xs hover:bg-[#e5d8c5] cursor-pointer"
                      >
                        保存效能评分
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: INVENTORY */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-[#2D2D2A]/10 p-5 sm:p-6 space-y-4 shadow-xs">
          <h3 className="font-serif font-bold text-base text-[#2D2D2A]">库存与进销存管理</h3>
          <p className="text-xs text-[#8C7E6A]">监控每一款 5ml / 10ml / 30ml 产品的物理库存与采购成本率。</p>

          <div className="divide-y divide-[#2D2D2A]/10 text-xs">
            {products.slice(0, 10).map((p) => (
              <div key={p.code} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="font-serif font-bold text-[#2D2D2A]">{p.cn} ({p.code})</span>
                  <span className="block text-[10px] text-[#8C7E6A] font-mono">{p.prices[0]}</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 font-mono w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs">库存: 85瓶</span>
                  <span className="text-emerald-700 font-bold text-xs">毛利率 ~72%</span>
                  <button className="px-3 py-1 rounded-lg bg-[#2D2D2A] text-[#d2c4ad] text-[11px] cursor-pointer">补货存量</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: ORIGINS */}
      {activeTab === 'origins' && (
        <div className="bg-white rounded-3xl border border-[#2D2D2A]/10 p-5 sm:p-6 space-y-4 shadow-xs">
          <h3 className="font-serif font-bold text-base text-[#2D2D2A]">{countries.length} 处极境寻香地标管理</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {countries.map((c) => (
              <div key={c.id} className="p-3.5 rounded-2xl bg-[#F9F7F2] border border-[#2D2D2A]/10 flex items-center gap-3">
                <img src={c.scenery_url || c.image_url} alt={c.name_cn} className="w-12 h-12 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="font-serif font-bold text-xs text-[#2D2D2A]">{c.name_cn} ({c.name_en})</div>
                  <div className="text-[10px] text-[#8C7E6A] line-clamp-1">{c.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: SERIES */}
      {activeTab === 'series' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: '元 Pure', code: 'yuan', desc: '极境生存原力 · 单方精油与基础植物油', color: '#1B2A26' },
            { name: '合 Harmony', code: 'he', desc: '临床疗效复方 · 情绪与身心协同重构', color: '#3A2B1D' },
            { name: '生 Life', code: 'sheng', desc: '纯露与水相植萃 · 湿敷与水能量调理', color: '#1D2D3A' },
            { name: '香 Scent', code: 'jing', desc: '空间器物与香境 · 铜锅扩散与静心仪轨', color: '#2F1D3A' },
          ].map((s) => (
            <div key={s.code} className="p-5 sm:p-6 rounded-3xl bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 space-y-2">
              <h4 className="font-serif text-lg text-[#d2c4ad] font-bold">{s.name}</h4>
              <p className="text-xs text-[#b4aca2]">{s.desc}</p>
              <span className="inline-block text-[10px] font-mono text-[#d2c4ad] pt-2">STATUS: ACTIVE</span>
            </div>
          ))}
        </div>
      )}

      {/* TAB 9: REVIEWS */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-3xl border border-[#2D2D2A]/10 p-5 sm:p-6 space-y-4 shadow-xs">
          <h3 className="font-serif font-bold text-base text-[#2D2D2A]">气味鉴赏家评价审核与置顶</h3>
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="p-4 rounded-2xl bg-[#F9F7F2] border border-[#2D2D2A]/10 space-y-1 text-xs">
                <div className="flex justify-between font-serif font-bold text-[#2D2D2A]">
                  <span>{r.user} ({r.rating}★)</span>
                  <span className="text-[10px] text-[#8C7E6A] font-mono">{r.date}</span>
                </div>
                <p className="text-[#8C7E6A] italic">“{r.text}”</p>
                <div className="pt-2 flex justify-between items-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] ${r.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {r.status === 'approved' ? '已通过首页置顶' : '待审核'}
                  </span>
                  {r.status === 'pending' && (
                    <button
                      onClick={() => {
                        setReviews(reviews.map(item => item.id === r.id ? { ...item, status: 'approved' } : item));
                        showToast('操作成功：已通过该条评价置顶');
                      }}
                      className="px-2.5 py-1 rounded-xl bg-[#0c120e] text-[#d2c4ad] text-[10px] font-mono cursor-pointer"
                    >
                      通过并置顶
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#0c120e] text-[#f6f2eb] rounded-3xl border border-[#d2c4ad]/30 max-w-xl w-full p-5 sm:p-6 space-y-4 shadow-2xl my-8">
            <h3 className="font-serif text-lg text-[#d2c4ad] font-bold">编辑精油作品信息 ({editingProduct.code})</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#b4aca2] mb-1">中文名称</label>
                <input
                  type="text"
                  value={editingProduct.cn}
                  onChange={(e) => setEditingProduct({ ...editingProduct, cn: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#b4aca2] mb-1">英文名称与拉丁学名</label>
                <input
                  type="text"
                  value={editingProduct.en}
                  onChange={(e) => setEditingProduct({ ...editingProduct, en: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#b4aca2] mb-1">产地地标</label>
                <input
                  type="text"
                  value={editingProduct.origin}
                  onChange={(e) => setEditingProduct({ ...editingProduct, origin: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none"
                />
              </div>

              {/* HE SERIES (复方) SCIENTIFIC FORMULA EDITOR */}

              {(editingProduct.series === 'he' || editingProduct.isCompound || editingProduct.blendFormula) && (

                <div className="p-3.5 rounded-2xl bg-[#1C2E20] border border-[#B08968]/30 space-y-3">

                  <div className="flex items-center justify-between">

                    <span className="font-serif font-bold text-xs text-[#E8DAC8] flex items-center gap-1.5">

                      <FlaskConical className="w-4 h-4 text-[#B08968]" />

                      复方科学配方原料构成与作用 (Blend Formula)

                    </span>

                    <button

                      type="button"

                      onClick={() => {

                        const currentFormulas = editingProduct.blendFormula || [];

                        setEditingProduct({

                          ...editingProduct,

                          blendFormula: [

                            ...currentFormulas,

                            { ingredient: '高阶精油', role: '协同镇静安抚', origin: '法国', note: '中调' }

                          ]

                        });

                      }}

                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#B08968] text-[#1C2E20] font-bold"

                    >

                      + 添加配方原料

                    </button>

                  </div>



                  <div className="space-y-2">

                    {(editingProduct.blendFormula || []).map((fItem, fIdx) => (

                      <div key={fIdx} className="p-2.5 rounded-xl bg-black/40 border border-[#B08968]/20 space-y-1.5 text-[11px]">

                        <div className="grid grid-cols-2 gap-2">

                          <div>

                            <span className="text-[10px] text-[#B08968] block">原料精油名称</span>

                            <input

                              type="text"

                              value={fItem.ingredient}

                              onChange={(e) => {

                                const newFormula = [...(editingProduct.blendFormula || [])];

                                newFormula[fIdx] = { ...newFormula[fIdx], ingredient: e.target.value };

                                setEditingProduct({ ...editingProduct, blendFormula: newFormula });

                              }}

                              className="w-full p-1.5 rounded bg-white/10 text-white border border-white/10"

                            />

                          </div>

                          <div>

                            <span className="text-[10px] text-[#B08968] block">在配方中的作用</span>

                            <input

                              type="text"

                              value={fItem.role}

                              onChange={(e) => {

                                const newFormula = [...(editingProduct.blendFormula || [])];

                                newFormula[fIdx] = { ...newFormula[fIdx], role: e.target.value };

                                setEditingProduct({ ...editingProduct, blendFormula: newFormula });

                              }}

                              className="w-full p-1.5 rounded bg-white/10 text-white border border-white/10"

                            />

                          </div>

                        </div>

                        <div className="grid grid-cols-2 gap-2">

                          <div>

                            <span className="text-[10px] text-[#B08968] block">地标原产地</span>

                            <input

                              type="text"

                              value={fItem.origin || ''}

                              onChange={(e) => {

                                const newFormula = [...(editingProduct.blendFormula || [])];

                                newFormula[fIdx] = { ...newFormula[fIdx], origin: e.target.value };

                                setEditingProduct({ ...editingProduct, blendFormula: newFormula });

                              }}

                              className="w-full p-1.5 rounded bg-white/10 text-white border border-white/10"

                            />

                          </div>

                          <div>

                            <span className="text-[10px] text-[#B08968] block">挥发调性 (前调/中调/后调)</span>

                            <input

                              type="text"

                              value={fItem.note || ''}

                              onChange={(e) => {

                                const newFormula = [...(editingProduct.blendFormula || [])];

                                newFormula[fIdx] = { ...newFormula[fIdx], note: e.target.value };

                                setEditingProduct({ ...editingProduct, blendFormula: newFormula });

                              }}

                              className="w-full p-1.5 rounded bg-white/10 text-white border border-white/10"

                            />

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              )}



              {/* JING SERIES (器物) ARTIFACT SPECS EDITOR */}

              {(editingProduct.series === 'jing' || editingProduct.artifactSpecs) && (

                <div className="p-3.5 rounded-2xl bg-[#2F1D3A]/80 border border-[#7B5294]/40 space-y-2 text-[11px]">

                  <span className="font-serif font-bold text-xs text-[#EAE2EF] flex items-center gap-1.5">

                    <Package className="w-4 h-4 text-[#7B5294]" />

                    器物材质与香道规格 (Artifact Specs)

                  </span>



                  <div className="grid grid-cols-2 gap-2">

                    <div>

                      <span className="text-[10px] text-[#7B5294] block">材质 (Material)</span>

                      <input

                        type="text"

                        value={editingProduct.artifactSpecs?.material || ''}

                        onChange={(e) => setEditingProduct({

                          ...editingProduct,

                          artifactSpecs: { ...(editingProduct.artifactSpecs || { craft: '', scene: '' }), material: e.target.value }

                        })}

                        className="w-full p-1.5 rounded bg-white/10 text-white border border-white/10"

                      />

                    </div>

                    <div>

                      <span className="text-[10px] text-[#7B5294] block">手作工艺 (Craft)</span>

                      <input

                        type="text"

                        value={editingProduct.artifactSpecs?.craft || ''}

                        onChange={(e) => setEditingProduct({

                          ...editingProduct,

                          artifactSpecs: { ...(editingProduct.artifactSpecs || { material: '', scene: '' }), craft: e.target.value }

                        })}

                        className="w-full p-1.5 rounded bg-white/10 text-white border border-white/10"

                      />

                    </div>

                  </div>



                  <div className="grid grid-cols-2 gap-2">

                    <div>

                      <span className="text-[10px] text-[#7B5294] block">推荐使用场景 (Scene)</span>

                      <input

                        type="text"

                        value={editingProduct.artifactSpecs?.scene || ''}

                        onChange={(e) => setEditingProduct({

                          ...editingProduct,

                          artifactSpecs: { ...(editingProduct.artifactSpecs || { material: '', craft: '' }), scene: e.target.value }

                        })}

                        className="w-full p-1.5 rounded bg-white/10 text-white border border-white/10"

                      />

                    </div>

                    <div>

                      <span className="text-[10px] text-[#7B5294] block">规格尺寸 (Dimension)</span>

                      <input

                        type="text"

                        value={editingProduct.artifactSpecs?.dimension || ''}

                        onChange={(e) => setEditingProduct({

                          ...editingProduct,

                          artifactSpecs: { ...(editingProduct.artifactSpecs || { material: '', craft: '', scene: '' }), dimension: e.target.value }

                        })}

                        className="w-full p-1.5 rounded bg-white/10 text-white border border-white/10"

                      />

                    </div>

                  </div>

                </div>

              )}



              <div>

                <label className="block text-[#b4aca2] mb-1">封面图片 URL</label>

                <input

                  type="text"

                  value={editingProduct.image}

                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}

                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none font-mono text-[11px]"

                />

              </div>

            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={() => handleSaveProduct(editingProduct)}
                className="px-6 py-2 rounded-xl bg-[#d2c4ad] text-[#2D2D2A] font-serif font-bold text-xs cursor-pointer"
              >
                保存更改
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Handover Spec Modal */}
      <SeriesCardHandoverDocModal
        isOpen={isHandoverDocOpen}
        onClose={() => setIsHandoverDocOpen(false)}
      />

    </div>
  );
};