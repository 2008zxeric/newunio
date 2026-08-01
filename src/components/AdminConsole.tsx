import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, Package, MapPin, Layers, Image as ImageIcon, 
  DollarSign, MessageSquare, ShieldCheck, Search, Plus, Edit2, 
  Trash2, Eye, EyeOff, Save, CheckCircle2, AlertCircle, RefreshCw, Lock, Key
} from 'lucide-react';
import { ProductItem, Country, SeriesKey } from '../types';
import { fetchProductsFromSupabase, fetchCountriesFromSupabase } from '../data/siteDataService';
import { UnioLogo } from './UnioLogo';

export const AdminConsole: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'inventory' | 'origins' | 'series' | 'reviews' | 'reports'>('dashboard');
  
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters for products
  const [productQuery, setProductQuery] = useState('');
  const [selectedSeriesFilter, setSelectedSeriesFilter] = useState<string>('all');

  // Editing modal state
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);

  useEffect(() => {
    async function loadAdminData() {
      setLoading(true);
      const [pData, cData] = await Promise.all([
        fetchProductsFromSupabase(),
        fetchCountriesFromSupabase(),
      ]);
      setProducts(pData);
      setCountries(cData);
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
        const q = productQuery.toLowerCase();
        return (
          p.cn.toLowerCase().includes(q) ||
          p.en.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, selectedSeriesFilter, productQuery]);

  const handleSaveProduct = (updated: ProductItem) => {
    setProducts((prev) => prev.map((p) => (p.code === updated.code ? updated : p)));
    setEditingProduct(null);
  };

  const handleToggleActiveProduct = (code: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.code === code ? { ...p, isActive: !p.isActive } : p))
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 shadow-2xl space-y-6">
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
            className="w-full py-3 rounded-xl bg-[#d2c4ad] text-[#2D2D2A] font-serif font-bold text-xs hover:bg-[#c5b59c] transition-all"
          >
            进入系统
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0c120e] text-[#f6f2eb] p-6 rounded-3xl border border-[#d2c4ad]/30 shadow-2xl">
        <div className="flex items-center gap-3">
          <UnioLogo size={32} color="#d2c4ad" />
          <div>
            <h1 className="font-serif text-2xl text-[#d2c4ad] font-bold">UNIO AROMA 管理控制台</h1>
            <p className="text-xs text-[#b4aca2] font-mono">SUPABASE CONNECTED · 182 PRODUCTS · 92 ORIGINS</p>
          </div>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 rounded-xl bg-white/10 text-xs text-[#b4aca2] hover:bg-white/20 transition-all"
        >
          安全退出
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#2D2D2A]/10">
        {[
          { id: 'dashboard', label: '📊 仪表盘概览', icon: LayoutDashboard },
          { id: 'products', label: '🌿 产品库管理 (182)', icon: Package },
          { id: 'inventory', label: '📦 库存与成本', icon: DollarSign },
          { id: 'origins', label: '🗺️ 寻香地标 (92)', icon: MapPin },
          { id: 'series', label: '🏷️ 四大系列配置', icon: Layers },
          { id: 'reviews', label: '💬 香气评价审核', icon: MessageSquare },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-serif whitespace-nowrap transition-all ${
              activeTab === t.id
                ? 'bg-[#2D2D2A] text-[#d2c4ad] font-bold shadow'
                : 'bg-[#F9F7F2] text-[#8C7E6A] hover:bg-[#DED9D2]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#2D2D2A]/10 space-y-1 shadow-sm">
              <span className="text-xs text-[#8C7E6A] uppercase font-mono">全线在售精油与器具</span>
              <div className="font-serif text-3xl font-bold text-[#2D2D2A]">{products.length} 款</div>
              <span className="text-[10px] text-emerald-600 font-mono">涵盖 元 / 融 / 元香 / 合 体系</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#2D2D2A]/10 space-y-1 shadow-sm">
              <span className="text-xs text-[#8C7E6A] uppercase font-mono">全球/中国寻香地标</span>
              <div className="font-serif text-3xl font-bold text-[#2D2D2A]">{countries.length} 处</div>
              <span className="text-[10px] text-emerald-600 font-mono">含纬度、海拔与 GC-MS 数据</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#2D2D2A]/10 space-y-1 shadow-sm">
              <span className="text-xs text-[#8C7E6A] uppercase font-mono">预警预控库存状态</span>
              <div className="font-serif text-3xl font-bold text-[#2D2D2A]">正常</div>
              <span className="text-[10px] text-[#8C7E6A] font-mono">3 款单方精油处于补充期</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#2D2D2A]/10 space-y-1 shadow-sm">
              <span className="text-xs text-[#8C7E6A] uppercase font-mono">AI 祭司问诊匹配数</span>
              <div className="font-serif text-3xl font-bold text-[#2D2D2A]">1,480+ 次</div>
              <span className="text-[10px] text-emerald-600 font-mono">一人一方问卷满意度 99.2%</span>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="p-6 rounded-3xl bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 space-y-4">
            <h3 className="font-serif text-base text-[#d2c4ad] font-semibold">系统快速通道</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => setActiveTab('products')}
                className="p-3 rounded-xl bg-white/10 hover:bg-[#d2c4ad] hover:text-[#2D2D2A] transition-all text-xs text-left space-y-1"
              >
                <div className="font-bold font-serif">➕ 添加新精油作品</div>
                <div className="text-[10px] opacity-70">支持输入 Latin 学名与 COA 编号</div>
              </button>

              <button
                onClick={() => setActiveTab('origins')}
                className="p-3 rounded-xl bg-white/10 hover:bg-[#d2c4ad] hover:text-[#2D2D2A] transition-all text-xs text-left space-y-1"
              >
                <div className="font-bold font-serif">📍 更新寻香地标笔记</div>
                <div className="text-[10px] opacity-70">更新创始人 Alice 采风档案</div>
              </button>

              <button
                onClick={() => setActiveTab('inventory')}
                className="p-3 rounded-xl bg-white/10 hover:bg-[#d2c4ad] hover:text-[#2D2D2A] transition-all text-xs text-left space-y-1"
              >
                <div className="font-bold font-serif">📦 批量更新精油库存</div>
                <div className="text-[10px] opacity-70">设定安全库存告警与售价</div>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className="p-3 rounded-xl bg-white/10 hover:bg-[#d2c4ad] hover:text-[#2D2D2A] transition-all text-xs text-left space-y-1"
              >
                <div className="font-bold font-serif">💬 精选置顶客户评价</div>
                <div className="text-[10px] opacity-70">管理气味鉴赏家反馈</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Catalog Management */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#F9F7F2] p-4 rounded-2xl border border-[#2D2D2A]/10">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
              {['all', 'yuan', 'he', 'sheng', 'jing'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSeriesFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-all ${
                    selectedSeriesFilter === s
                      ? 'bg-[#2D2D2A] text-[#d2c4ad] font-bold'
                      : 'bg-white text-[#8C7E6A]'
                  }`}
                >
                  {s === 'all' ? '全部系列' : s === 'yuan' ? '元 Pure' : s === 'he' ? '合 Harmony' : s === 'sheng' ? '生 Life' : '香 Scent'}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7E6A]" />
              <input
                type="text"
                placeholder="搜索产品编号、名称或产地..."
                value={productQuery}
                onChange={(e) => setProductQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#2D2D2A]/15 text-xs text-[#2D2D2A] focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#2D2D2A]/10 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs text-[#2D2D2A]">
              <thead className="bg-[#F9F7F2] text-[#8C7E6A] font-serif border-b border-[#2D2D2A]/10">
                <tr>
                  <th className="p-3">编码</th>
                  <th className="p-3">名/英文/学名</th>
                  <th className="p-3">产地</th>
                  <th className="p-3">系列/分类</th>
                  <th className="p-3">规格与价格</th>
                  <th className="p-3">状态</th>
                  <th className="p-3 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D2D2A]/10">
                {filteredProducts.map((p) => (
                  <tr key={p.code} className="hover:bg-[#F9F7F2]/60 transition-colors">
                    <td className="p-3 font-mono font-bold text-[#8C7E6A]">{p.code}</td>
                    <td className="p-3">
                      <div className="font-serif font-semibold">{p.cn}</div>
                      <div className="text-[10px] text-[#8C7E6A] font-mono">{p.en}</div>
                    </td>
                    <td className="p-3 text-[#8C7E6A]">{p.origin}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-[#2D2D2A]/5 text-[10px] font-mono">
                        {p.series} / {p.subgroup}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-semibold text-[#2D2D2A]">
                      {p.prices.join(', ')}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleToggleActiveProduct(p.code)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono ${
                          p.isActive !== false
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {p.isActive !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {p.isActive !== false ? '上架在售' : '下架隐藏'}
                      </button>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="p-1.5 rounded-lg bg-[#2D2D2A]/5 hover:bg-[#2D2D2A] hover:text-[#d2c4ad] transition-all text-[#2D2D2A]"
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

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0c120e] text-[#f6f2eb] rounded-3xl border border-[#d2c4ad]/30 max-w-xl w-full p-6 space-y-4 shadow-2xl">
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
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs"
              >
                取消
              </button>
              <button
                onClick={() => handleSaveProduct(editingProduct)}
                className="px-6 py-2 rounded-xl bg-[#d2c4ad] text-[#2D2D2A] font-serif font-bold text-xs"
              >
                保存更改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-2xl border border-[#2D2D2A]/10 p-6 space-y-4">
          <h3 className="font-serif font-bold text-base text-[#2D2D2A]">库存与进销存管理</h3>
          <p className="text-xs text-[#8C7E6A]">监控每一款 5ml / 10ml / 30ml 产品的物理库存与采购成本率。</p>

          <div className="divide-y divide-[#2D2D2A]/10 text-xs">
            {products.slice(0, 10).map((p) => (
              <div key={p.code} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-serif font-bold text-[#2D2D2A]">{p.cn} ({p.code})</span>
                  <span className="block text-[10px] text-[#8C7E6A] font-mono">{p.prices[0]}</span>
                </div>
                <div className="flex items-center gap-4 font-mono">
                  <span>库存: 85瓶</span>
                  <span className="text-emerald-600 font-bold">毛利率 ~72%</span>
                  <button className="px-3 py-1 rounded-lg bg-[#2D2D2A] text-[#d2c4ad]">补货存量</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fragrance Origins Management */}
      {activeTab === 'origins' && (
        <div className="bg-white rounded-2xl border border-[#2D2D2A]/10 p-6 space-y-4">
          <h3 className="font-serif font-bold text-base text-[#2D2D2A]">92 处极境寻香地标</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {countries.map((c) => (
              <div key={c.id} className="p-4 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/10 flex items-center gap-3">
                <img src={c.scenery_url || c.image_url} alt={c.name_cn} className="w-14 h-14 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="font-serif font-bold text-xs text-[#2D2D2A]">{c.name_cn} ({c.name_en})</div>
                  <div className="text-[10px] text-[#8C7E6A] line-clamp-1">{c.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Series Management */}
      {activeTab === 'series' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: '元 Pure', code: 'yuan', desc: '极境生存原力 · 单方精油与基础植物油', color: '#1B2A26' },
            { name: '合 Harmony', code: 'he', desc: '临床疗效复方 · 情绪与身心协同重构', color: '#3A2B1D' },
            { name: '生 Life', code: 'sheng', desc: '纯露与水相植萃 · 湿敷与水能量调理', color: '#1D2D3A' },
            { name: '香 Scent', code: 'jing', desc: '空间器物与香境 · 铜锅扩散与静心仪轨', color: '#2F1D3A' },
          ].map((s) => (
            <div key={s.code} className="p-6 rounded-2xl bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 space-y-2">
              <h4 className="font-serif text-lg text-[#d2c4ad] font-bold">{s.name}</h4>
              <p className="text-xs text-[#b4aca2]">{s.desc}</p>
              <span className="inline-block text-[10px] font-mono text-[#d2c4ad] pt-2">STATUS: ACTIVE</span>
            </div>
          ))}
        </div>
      )}

      {/* Reviews Moderation */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-2xl border border-[#2D2D2A]/10 p-6 space-y-4">
          <h3 className="font-serif font-bold text-base text-[#2D2D2A]">气味鉴赏家评价审核与置顶</h3>
          <div className="space-y-3">
            {[
              { user: '林元香', text: '神圣乳香在夜间熏香时让人心境极其沉静，呼吸自然加深。', rating: 5, date: '2026-07-28' },
              { user: 'Alice_Scent', text: '大马士革玫瑰纯露用来湿敷，肌肤透亮舒缓，带着晨露般的天然清香。', rating: 5, date: '2026-07-25' },
            ].map((r, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/10 space-y-1 text-xs">
                <div className="flex justify-between font-serif font-bold text-[#2D2D2A]">
                  <span>{r.user} ({r.rating}★)</span>
                  <span className="text-[10px] text-[#8C7E6A] font-mono">{r.date}</span>
                </div>
                <p className="text-[#8C7E6A] italic">“{r.text}”</p>
                <div className="pt-2 flex gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">已通过首页置顶</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
