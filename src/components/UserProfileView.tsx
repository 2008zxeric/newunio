import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Edit3, 
  Check, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  Package, 
  Award,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { UnioLogo } from './UnioLogo';
import { ProductItem } from '../types';
import { fetchAllProducts } from '../data/adaptedDataService';

interface UserProfileViewProps {
  onSelectProduct: (product: ProductItem) => void;
  onNavigateTab: (tab: string) => void;
}

export interface UserHealthProfile {
  name: string;
  phone: string;
  email: string;
  vipTier: string;
  preferredNotes: string[];
  ageGroup: string;
  gender: string;
  sleepQuality: string;
  stressLevel: string;
  skinType: string;
  contraindications: string[];
  shippingAddress: string;
}

const DEFAULT_PROFILE: UserHealthProfile = {
  name: '宋元静',
  phone: '138****8823',
  email: 'song.yj@unioaroma.com',
  vipTier: 'UNIO 觉知黑金会员',
  preferredNotes: ['深沉木质调', '保加利亚玫瑰', '阿曼乳香'],
  ageGroup: '31-45 岁',
  gender: 'female',
  sleepQuality: '浅睡多梦 / 易惊醒',
  stressLevel: '高度工作压力 / 肩颈紧绷',
  skinType: '混合偏干 / 轻度敏感',
  contraindications: ['无孕期', '轻度花粉过敏'],
  shippingAddress: '浙江省宁波市鄞州区首南街道UNIO寻香工作室 302室',
};

const MOCK_ORDERS = [
  {
    id: 'ORD-20260728-892',
    date: '2026-07-28',
    status: '已结缘配送',
    items: [
      { name: 'UNIO 阿曼神圣乳香精油 10ml', code: 'UNIO-EO-001', price: 420, qty: 1 },
      { name: 'UNIO 黑色火山石扩香器物', code: 'UNIO-ACC-003', price: 280, qty: 1 },
    ],
    total: 700,
    coaBatch: 'COA-2026-FRANK-882',
    tracking: '顺丰速运 SF18293019283',
  },
  {
    id: 'ORD-20260615-104',
    date: '2026-06-15',
    status: '已完成研磨',
    items: [
      { name: '一人一方 · 沉静降逆安眠复方 (定制 30ml)', code: 'UNIO-CUSTOM-092', price: 580, qty: 1 },
    ],
    total: 580,
    coaBatch: 'COA-2026-CUSTOM-092',
    tracking: '顺丰速运 SF90218239012',
  },
];

const MOCK_FORMULATION_HISTORY = [
  {
    id: 'FORM-20260728',
    date: '2026-07-28',
    title: '沉静降逆安眠复方 (Night Tranquility)',
    concept: '以阿曼乳香镇静虚火，保加利亚大马士革玫瑰舒缓情绪中枢，高山真薰衣草诱导深沉慢波睡眠。',
    components: ['阿曼神圣乳香 (40%)', '保加利亚大马士革玫瑰 (20%)', '法国高山真薰衣草 (40%)'],
    carrier: '空间无水扩香 / 晚间掌心吸嗅',
    coaBatch: 'COA-BATCH-89201',
  },
  {
    id: 'FORM-20260510',
    date: '2026-05-10',
    title: '极境冷杉肩颈解压精华油 (Forest Neck Oil)',
    concept: '融合西伯利亚冷杉与大西洋雪松，针对长期伏案肩颈僵硬，舒缓肌肉气场滞留。',
    components: ['西伯利亚冷杉 (35%)', '大西洋雪松 (35%)', '有机甜杏仁基础油 (30%)'],
    carrier: '滚珠随身涂抹',
    coaBatch: 'COA-BATCH-55102',
  },
];

export const UserProfileView: React.FC<UserProfileViewProps> = ({ onSelectProduct, onNavigateTab }) => {
  const [profile, setProfile] = useState<UserHealthProfile>(() => {
    const saved = localStorage.getItem('unio_user_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [activeSubTab, setActiveSubTab] = useState<'archive' | 'orders' | 'formulations' | 'wishlist'>('archive');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserHealthProfile>(profile);
  const [wishlistProducts, setWishlistProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    localStorage.setItem('unio_user_profile', JSON.stringify(profile));
  }, [profile]);

  // Load real products for wishlist tab
  useEffect(() => {
    let mounted = true;
    fetchAllProducts().then((products) => {
      if (mounted) setWishlistProducts(products.slice(0, 3));
    });
    return () => { mounted = false; };
  }, []);

  const handleSaveProfile = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0c120e] text-[#f6f2eb] p-6 md:p-10 border border-[#d2c4ad]/30 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden md:block">
          <UnioLogo size={180} color="#d2c4ad" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#1a241e] to-black border-2 border-[#d2c4ad] flex items-center justify-center p-1 shadow-xl relative">
              <span className="font-serif text-3xl font-normal text-[#d2c4ad]">
                {profile.name.slice(0, 1)}
              </span>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#d2c4ad] text-[#0c120e] flex items-center justify-center text-[10px] font-bold">
                <Award className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl md:text-3xl text-white font-medium">
                  {profile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#d2c4ad]/20 border border-[#d2c4ad]/40 text-[#d2c4ad] text-[11px] font-mono">
                  {profile.vipTier}
                </span>
              </div>
              <p className="text-xs text-[#b4aca2] flex items-center gap-3">
                <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-[#d2c4ad]" /> {profile.phone}</span>
                <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-[#d2c4ad]" /> {profile.email}</span>
              </p>
              <div className="pt-1 flex flex-wrap gap-1.5 text-[10px] text-[#d2c4ad]">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">喜爱香调: {profile.preferredNotes.join(' / ')}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-[#f6f2eb] hover:bg-[#d2c4ad] hover:text-[#0c120e] transition-all text-xs flex items-center gap-2 font-serif"
          >
            <Edit3 className="w-4 h-4" />
            <span>编辑个人基础资料</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#2D2D2A]/10 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('archive')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-serif transition-all flex items-center gap-2 ${
            activeSubTab === 'archive'
              ? 'bg-[#2D2D2A] text-[#f6f2eb] font-bold shadow-md'
              : 'bg-[#EFEDE7] text-[#2D2D2A]/70 hover:bg-[#DED9D2]'
          }`}
        >
          <Heart className="w-4 h-4 text-[#d2c4ad]" />
          <span>我的健康与香气档案</span>
        </button>

        <button
          onClick={() => setActiveSubTab('formulations')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-serif transition-all flex items-center gap-2 ${
            activeSubTab === 'formulations'
              ? 'bg-[#2D2D2A] text-[#f6f2eb] font-bold shadow-md'
              : 'bg-[#EFEDE7] text-[#2D2D2A]/70 hover:bg-[#DED9D2]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#d2c4ad]" />
          <span>“一人一方”处方记录 ({MOCK_FORMULATION_HISTORY.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('orders')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-serif transition-all flex items-center gap-2 ${
            activeSubTab === 'orders'
              ? 'bg-[#2D2D2A] text-[#f6f2eb] font-bold shadow-md'
              : 'bg-[#EFEDE7] text-[#2D2D2A]/70 hover:bg-[#DED9D2]'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-[#d2c4ad]" />
          <span>我的订单历史 ({MOCK_ORDERS.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('wishlist')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-serif transition-all flex items-center gap-2 ${
            activeSubTab === 'wishlist'
              ? 'bg-[#2D2D2A] text-[#f6f2eb] font-bold shadow-md'
              : 'bg-[#EFEDE7] text-[#2D2D2A]/70 hover:bg-[#DED9D2]'
          }`}
        >
          <FileText className="w-4 h-4 text-[#d2c4ad]" />
          <span>馆藏典藏与常购</span>
        </button>
      </div>

      {/* TAB 1: Health & Aroma Archive */}
      {activeSubTab === 'archive' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-[#2D2D2A]/10 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#2D2D2A]/10 pb-3">
              <h3 className="font-serif font-bold text-base text-[#2D2D2A] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#8C7E6A]" />
                <span>身心能量与睡眠特征诊断</span>
              </h3>
              <span className="text-[10px] text-[#8C7E6A] font-mono">HEALTH SPECTRUM</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#F9F7F2] border border-[#2D2D2A]/10 flex justify-between items-center">
                <span className="text-[#8C7E6A] font-serif">睡眠状态评估:</span>
                <span className="font-bold text-[#2D2D2A]">{profile.sleepQuality}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F9F7F2] border border-[#2D2D2A]/10 flex justify-between items-center">
                <span className="text-[#8C7E6A] font-serif">压力与肌肉紧绷度:</span>
                <span className="font-bold text-[#2D2D2A]">{profile.stressLevel}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F9F7F2] border border-[#2D2D2A]/10 flex justify-between items-center">
                <span className="text-[#8C7E6A] font-serif">肤质与受损敏感度:</span>
                <span className="font-bold text-[#2D2D2A]">{profile.skinType}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F9F7F2] border border-[#2D2D2A]/10 space-y-1">
                <span className="text-[#8C7E6A] font-serif block">健康禁忌与避开成分:</span>
                <div className="flex flex-wrap gap-1.5">
                  {profile.contraindications.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#2D2D2A]/10 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#2D2D2A]/10 pb-3">
              <h3 className="font-serif font-bold text-base text-[#2D2D2A] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8C7E6A]" />
                <span>常用收货地址与专员安排</span>
              </h3>
              <span className="text-[10px] text-[#8C7E6A] font-mono">DELIVERY LOGISTICS</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F9F7F2] border border-[#2D2D2A]/10 text-xs space-y-2">
              <div className="flex justify-between font-bold text-[#2D2D2A]">
                <span>{profile.name}</span>
                <span>{profile.phone}</span>
              </div>
              <p className="text-[#8C7E6A] leading-relaxed">{profile.shippingAddress}</p>
              <span className="inline-block text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">
                默认顺丰冷链/恒温护送
              </span>
            </div>

            <button
              onClick={() => onNavigateTab('ai-consult')}
              className="w-full py-3 rounded-2xl bg-[#0c120e] text-[#d2c4ad] font-serif text-xs font-bold hover:bg-[#1a241e] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              重新开启“一人一方”问诊更新档案
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: Formulations History */}
      {activeSubTab === 'formulations' && (
        <div className="space-y-4">
          {MOCK_FORMULATION_HISTORY.map((item) => (
            <div key={item.id} className="bg-[#0c120e] text-[#f6f2eb] rounded-3xl border border-[#d2c4ad]/30 p-6 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <UnioLogo size={24} color="#d2c4ad" />
                  <div>
                    <h3 className="font-serif text-lg text-[#d2c4ad] font-medium">{item.title}</h3>
                    <span className="text-[10px] text-[#b4aca2] font-mono">{item.date} · 编码: {item.id}</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#d2c4ad]/20 border border-[#d2c4ad]/40 text-[#d2c4ad] text-xs font-mono">
                  {item.coaBatch}
                </span>
              </div>

              <p className="text-xs text-[#b4aca2] leading-relaxed italic font-serif">
                “{item.concept}”
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {item.components.map((comp, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span className="text-[#d2c4ad] font-serif font-bold">{comp}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs text-[#b4aca2] pt-2 border-t border-white/10">
                <span>推荐载体: {item.carrier}</span>
                <button
                  onClick={() => onNavigateTab('ai-consult')}
                  className="px-4 py-1.5 rounded-xl bg-[#d2c4ad] text-[#0c120e] font-serif font-bold hover:bg-[#c5b59c] transition-all"
                >
                  按此配方再次研磨订制
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Order History */}
      {activeSubTab === 'orders' && (
        <div className="space-y-4">
          {MOCK_ORDERS.map((ord) => (
            <div key={ord.id} className="bg-white rounded-3xl border border-[#2D2D2A]/10 p-6 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#2D2D2A]/10 pb-3">
                <div>
                  <span className="font-serif font-bold text-sm text-[#2D2D2A]">订单号: {ord.id}</span>
                  <span className="block text-[11px] text-[#8C7E6A] font-mono">下单时间: {ord.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {ord.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {ord.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-2xl bg-[#F9F7F2] border border-[#2D2D2A]/10">
                    <div>
                      <span className="font-serif font-bold text-[#2D2D2A] block">{it.name}</span>
                      <span className="text-[10px] text-[#8C7E6A] font-mono">{it.code}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-sm text-[#2D2D2A] font-bold">¥{it.price}</span>
                      <span className="block text-[10px] text-[#8C7E6A]">x{it.qty}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2 text-xs border-t border-[#2D2D2A]/10">
                <div className="text-[#8C7E6A] space-y-0.5">
                  <p className="flex items-center gap-1"><Package className="w-3.5 h-3.5" /> 物理追踪: {ord.tracking}</p>
                  <p className="flex items-center gap-1 font-mono text-[10px]"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> GC-MS COA 报告编号: {ord.coaBatch}</p>
                </div>
                <div className="text-right font-serif">
                  <span className="text-xs text-[#8C7E6A] mr-2">实付金额:</span>
                  <span className="text-lg font-bold text-[#2D2D2A]">¥{ord.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: Wishlist / Saved Products */}
      {activeSubTab === 'wishlist' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.code}
              onClick={() => onSelectProduct(product)}
              className="bg-white rounded-2xl border border-[#2D2D2A]/10 p-4 space-y-3 cursor-pointer hover:shadow-lg transition-all group"
            >
              <div className="h-40 rounded-xl overflow-hidden bg-gray-100 relative">
                <img
                  src={product.image}
                  alt={product.cn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-mono backdrop-blur-md">
                  {product.series}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#8C7E6A] font-mono uppercase">{product.code}</span>
                <h4 className="font-serif font-bold text-sm text-[#2D2D2A]">{product.cn}</h4>
                <p className="text-xs text-[#8C7E6A] line-clamp-1">{product.shortDesc}</p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#2D2D2A]/10">
                <span className="font-mono text-sm font-bold text-[#2D2D2A]">{product.prices[0]}</span>
                <span className="text-xs text-[#8C7E6A] group-hover:text-[#2D2D2A]">查看详情 →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0c120e] text-[#f6f2eb] rounded-3xl border border-[#d2c4ad]/30 max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <h3 className="font-serif text-lg text-[#d2c4ad] font-medium border-b border-white/10 pb-3">
              修改个人基础档案
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#b4aca2] mb-1">姓名 / 尊称</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-[#b4aca2] mb-1">联系电话</label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-[#b4aca2] mb-1">顺丰配送地址</label>
                <textarea
                  rows={2}
                  value={editForm.shippingAddress}
                  onChange={(e) => setEditForm({ ...editForm, shippingAddress: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/15 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs"
              >
                取消
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2 rounded-xl bg-[#d2c4ad] text-[#0c120e] font-serif font-bold text-xs hover:bg-[#c5b59c]"
              >
                保存档案
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
