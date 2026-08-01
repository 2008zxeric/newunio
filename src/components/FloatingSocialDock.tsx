import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  QrCode, 
  MessageCircle, 
  Sparkles, 
  ArrowUp, 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  User,
  Heart,
  Share2
} from 'lucide-react';
import { UnioLogo } from './UnioLogo';

interface FloatingSocialDockProps {
  onNavigateTab: (tab: string) => void;
}

export const FloatingSocialDock: React.FC<FloatingSocialDockProps> = ({ onNavigateTab }) => {
  const [activeModal, setActiveModal] = useState<'xiaohongshu' | 'miniprogram' | 'service' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Side Dock — 移动端折叠为单按钮，桌面端完整展开 */}
      <div className="fixed right-4 bottom-8 z-40 flex flex-col gap-2.5 items-end">
        
        {/* ── 移动端：主开关按钮（其他按钮在开关上方展开） ── */}
        <div className="flex md:hidden flex-col gap-2.5 items-end">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`w-11 h-11 rounded-full bg-[#0c120e] text-[#d2c4ad] border border-[#d2c4ad]/50 shadow-xl flex items-center justify-center transition-all duration-300 ${mobileOpen ? 'rotate-45' : ''}`}
            title="快捷入口"
          >
            <X className={`w-5 h-5 ${mobileOpen ? '' : 'hidden'}`} />
            <Sparkles className={`w-5 h-5 ${mobileOpen ? 'hidden' : ''}`} />
          </button>
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="flex flex-col gap-2.5 items-end"
              >
                {/* Xiaohongshu (小红书) Float Button */}
                <button
                  onClick={() => setActiveModal('xiaohongshu')}
                  className="w-11 h-11 rounded-full bg-[#FF2442] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 relative"
                  title="UNIO 元香小红书官方号"
                >
                  <span className="font-bold text-[10px] tracking-tighter font-sans">小红书</span>
                </button>

                {/* WeChat Mini Program */}
                <button
                  onClick={() => setActiveModal('miniprogram')}
                  className="w-11 h-11 rounded-full bg-[#07C160] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
                  title="UNIO 微信官方小程序"
                >
                  <QrCode className="w-5 h-5" />
                </button>

                {/* WeChat Customer Service */}
                <button
                  onClick={() => setActiveModal('service')}
                  className="w-11 h-11 rounded-full bg-[#2D2D2A] text-[#d2c4ad] border border-[#d2c4ad]/40 shadow-lg flex items-center justify-center hover:bg-[#0c120e] hover:scale-110 transition-all duration-300"
                  title="UNIO 微信专属芳疗客服"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>

                {/* Quick One-Scent */}
                <button
                  onClick={() => { setMobileOpen(false); onNavigateTab('ai-consult'); }}
                  className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1a241e] to-[#0c120e] text-[#d2c4ad] border border-[#d2c4ad]/50 shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300"
                  title="AI 一人一方智能调配"
                >
                  <Sparkles className="w-5 h-5" />
                </button>

                {/* Scroll To Top */}
                <button
                  onClick={scrollToTop}
                  className="w-10 h-10 rounded-full bg-[#EFEDE7] text-[#2D2D2A] border border-[#2D2D2A]/15 shadow-md flex items-center justify-center hover:bg-[#2D2D2A] hover:text-[#f6f2eb] transition-all"
                  title="回到顶部"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── 桌面端：完整展开（md+） ── */}
        <div className="hidden md:flex flex-col gap-2.5 items-end">
        
        {/* Xiaohongshu (小红书) Float Button */}
        <div className="relative group">
          <button
            onClick={() => setActiveModal('xiaohongshu')}
            className="w-12 h-12 rounded-full bg-[#FF2442] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 relative group"
            title="UNIO 元香小红书官方号"
          >
            <span className="font-bold text-xs tracking-tighter font-sans">小红书</span>
            {/* Ping animation dot */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-[#FF2442] animate-ping opacity-75" />
          </button>

          {/* Hover Preview Tooltip */}
          <div className="absolute right-14 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 px-3 py-2 rounded-xl text-xs whitespace-nowrap shadow-xl pointer-events-none z-50">
            <span className="w-2 h-2 rounded-full bg-[#FF2442]" />
            <span>小红书：UNIO元香 (UNIO_AROMA)</span>
          </div>
        </div>

        {/* WeChat Mini Program (微信小程序) Float Button */}
        <div className="relative group">
          <button
            onClick={() => setActiveModal('miniprogram')}
            className="w-12 h-12 rounded-full bg-[#07C160] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 relative"
            title="UNIO 微信官方小程序"
          >
            <QrCode className="w-5 h-5" />
          </button>

          <div className="absolute right-14 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 px-3 py-2 rounded-xl text-xs whitespace-nowrap shadow-xl pointer-events-none z-50">
            <span className="w-2 h-2 rounded-full bg-[#07C160]" />
            <span>微信小程序：扫码结缘订制</span>
          </div>
        </div>

        {/* WeChat Customer Service (专属客服) Float Button */}
        <div className="relative group">
          <button
            onClick={() => setActiveModal('service')}
            className="w-12 h-12 rounded-full bg-[#2D2D2A] text-[#d2c4ad] border border-[#d2c4ad]/40 shadow-lg flex items-center justify-center hover:bg-[#0c120e] hover:scale-110 transition-all duration-300"
            title="UNIO 微信专属芳疗客服"
          >
            <MessageCircle className="w-5 h-5" />
          </button>

          <div className="absolute right-14 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 px-3 py-2 rounded-xl text-xs whitespace-nowrap shadow-xl pointer-events-none z-50">
            <span className="w-2 h-2 rounded-full bg-[#d2c4ad]" />
            <span>微信客服：1对1芳疗师咨询</span>
          </div>
        </div>

        {/* Quick One-Scent (一人一方) Float Button */}
        <button
          onClick={() => onNavigateTab('ai-consult')}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a241e] to-[#0c120e] text-[#d2c4ad] border border-[#d2c4ad]/50 shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group relative"
          title="AI 一人一方智能调配"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 bg-[#d2c4ad] text-[#0c120e] font-serif text-[9px] px-1 rounded-full font-bold">一方</span>
        </button>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#EFEDE7] text-[#2D2D2A] border border-[#2D2D2A]/15 shadow-md flex items-center justify-center hover:bg-[#2D2D2A] hover:text-[#f6f2eb] transition-all"
          title="回到顶部"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
        </div>{/* ── 桌面端展开区块结束 ── */}
      </div>

      {/* QR Code & Social Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#0c120e] text-[#f6f2eb] rounded-3xl border border-[#d2c4ad]/30 max-w-md w-full p-6 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal 1: Xiaohongshu */}
              {activeModal === 'xiaohongshu' && (
                <div className="space-y-5 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2442]/20 border border-[#FF2442]/40 text-[#FF2442] text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#FF2442]" />
                    <span>小红书官方品牌号</span>
                  </div>

                  <h3 className="font-serif text-2xl text-white font-normal">
                    UNIO 元香芳疗生活
                  </h3>

                  <p className="text-xs text-[#b4aca2] leading-relaxed">
                    在小红书关注 UNIO 元香，探索 23 年芳疗调香灵感、植物原产地采风日志与独家配方解读。
                  </p>

                  {/* Simulated QR Code Canvas Frame */}
                  <div className="p-4 rounded-2xl bg-white text-black mx-auto w-52 h-52 flex flex-col items-center justify-center space-y-2 border-4 border-[#FF2442] shadow-xl">
                    <div className="w-36 h-36 border-2 border-dashed border-[#FF2442] rounded-xl flex flex-col items-center justify-center p-2 text-center bg-[#fdf8f8]">
                      <UnioLogo size={36} color="#FF2442" />
                      <span className="text-[10px] font-bold text-[#FF2442] mt-1">小红书扫码关注</span>
                      <span className="text-[9px] text-gray-500 font-mono">UNIO_AROMA</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-2">
                    <span className="text-xs text-[#d2c4ad] font-mono">账号: UNIO_AROMA</span>
                    <button
                      onClick={() => copyToClipboard('UNIO_AROMA')}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-[#d2c4ad] flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? '已复制' : '复制号'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Modal 2: Mini Program */}
              {activeModal === 'miniprogram' && (
                <div className="space-y-5 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07C160]/20 border border-[#07C160]/40 text-[#07C160] text-xs font-semibold">
                    <QrCode className="w-3.5 h-3.5" />
                    <span>微信官方小程序</span>
                  </div>

                  <h3 className="font-serif text-2xl text-white font-normal">
                    UNIO 元香官方小程序
                  </h3>

                  <p className="text-xs text-[#b4aca2] leading-relaxed">
                    手机微信扫码进入 UNIO 官方小程序，享有极速配方预订、纯露直采与“一人一方”个人健康档案同步。
                  </p>

                  <div className="p-4 rounded-2xl bg-white text-black mx-auto w-52 h-52 flex flex-col items-center justify-center space-y-2 border-4 border-[#07C160] shadow-xl">
                    <div className="w-36 h-36 border-2 border-[#07C160] rounded-full flex flex-col items-center justify-center p-2 text-center bg-[#f2fcf5] relative overflow-hidden">
                      <UnioLogo size={42} color="#07C160" />
                      <span className="text-[9px] font-bold text-[#07C160] mt-1">微信长按或扫码</span>
                      <span className="text-[8px] text-gray-500">UNIO Aroma Mini</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#d2c4ad] font-mono">
                    包含 219 款馆藏精油、COA 检测报告查询与在线寻香
                  </p>
                </div>
              )}

              {/* Modal 3: Customer Service */}
              {activeModal === 'service' && (
                <div className="space-y-5 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d2c4ad]/20 border border-[#d2c4ad]/40 text-[#d2c4ad] text-xs font-serif">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>高级芳疗师 1对1 微信咨询</span>
                  </div>

                  <h3 className="font-serif text-2xl text-white font-normal">
                    UNIO 寻香顾问微信
                  </h3>

                  <p className="text-xs text-[#b4aca2] leading-relaxed">
                    任何关于精油禁忌、一人一方定制或批次 COA 疑问，可随时联系高级芳疗师获取专业解惑。
                  </p>

                  <div className="p-4 rounded-2xl bg-white text-black mx-auto w-52 h-52 flex flex-col items-center justify-center space-y-2 border-4 border-[#d2c4ad] shadow-xl">
                    <div className="w-36 h-36 border border-gray-300 rounded-xl flex flex-col items-center justify-center p-2 text-center bg-[#faf9f6]">
                      <UnioLogo size={36} color="#2D2D2A" />
                      <span className="text-[10px] font-serif font-bold text-[#2D2D2A] mt-2">扫码添加专属客服</span>
                      <span className="text-[9px] text-[#8C7E6A]">微信 ID: UNIO_AROMA_VIP</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-2">
                    <span className="text-xs text-[#d2c4ad] font-mono">微信: UNIO_AROMA_VIP</span>
                    <button
                      onClick={() => copyToClipboard('UNIO_AROMA_VIP')}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-[#d2c4ad] flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? '已复制' : '复制微信号'}</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
