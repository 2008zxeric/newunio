import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  QrCode, 
  MessageCircle, 
  Sparkles, 
  ArrowUp, 
  X, 
  Copy, 
  Check, 
  User,
  Heart,
  Share2
} from 'lucide-react';

interface FloatingSocialDockProps {
  onNavigateTab: (tab: string) => void;
}

export const FloatingSocialDock: React.FC<FloatingSocialDockProps> = ({ onNavigateTab }) => {
  const [activeModal, setActiveModal] = useState<'miniprogram' | 'service' | 'pub' | null>(null);
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
                {/* Xiaohongshu (小红书) — 点击直接跳转 */}
                <a
                  href="https://xhslink.cn/m/7CjzT1BVh39"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#FF2442] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 relative"
                  title="UNIO 元香小红书官方号"
                >
                  <span className="font-bold text-[10px] tracking-tighter font-sans">小红书</span>
                </a>

                {/* WeChat Mini Program — 点击自动复制链接 + 弹窗扫码 */}
                <button
                  onClick={() => { copyToClipboard('#小程序://元香/DpKfR4C3wvtoTXf'); setActiveModal('miniprogram'); }}
                  className="w-11 h-11 rounded-full bg-[#07C160] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
                  title="UNIO 微信官方小程序"
                >
                  <QrCode className="w-5 h-5" />
                </button>

                {/* WeChat Official Account (公众号) */}
                <button
                  onClick={() => setActiveModal('pub')}
                  className="w-11 h-11 rounded-full bg-[#1AAD19] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
                  title="UNIO 微信公众号"
                >
                  <span className="font-bold text-[9px] tracking-tighter font-sans">公众号</span>
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
        
        {/* Xiaohongshu (小红书) Float Button — 点击直接跳转 */}
        <div className="relative group">
          <a
            href="https://xhslink.cn/m/7CjzT1BVh39"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-[#FF2442] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 relative group"
            title="UNIO 元香小红书官方号"
          >
            <span className="font-bold text-xs tracking-tighter font-sans">小红书</span>
            {/* Ping animation dot */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-[#FF2442] animate-ping opacity-75" />
          </a>

          {/* Hover Preview Tooltip */}
          <div className="absolute right-14 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 px-3 py-2 rounded-xl text-xs whitespace-nowrap shadow-xl pointer-events-none z-50">
            <span className="w-2 h-2 rounded-full bg-[#FF2442]" />
            <span>小红书：UNIO元香 (UNIO_AROMA) 点击直达</span>
          </div>
        </div>

        {/* WeChat Mini Program (微信小程序) Float Button — 点击自动复制 + 弹窗扫码 */}
        <div className="relative group">
          <button
            onClick={() => { copyToClipboard('#小程序://元香/DpKfR4C3wvtoTXf'); setActiveModal('miniprogram'); }}
            className="w-12 h-12 rounded-full bg-[#07C160] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 relative"
            title="UNIO 微信官方小程序"
          >
            <QrCode className="w-5 h-5" />
          </button>

          <div className="absolute right-14 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 px-3 py-2 rounded-xl text-xs whitespace-nowrap shadow-xl pointer-events-none z-50">
            <span className="w-2 h-2 rounded-full bg-[#07C160]" />
            <span>微信小程序：扫码或复制链接</span>
          </div>
        </div>

        {/* WeChat Official Account (公众号) Float Button */}
        <div className="relative group">
          <button
            onClick={() => setActiveModal('pub')}
            className="w-12 h-12 rounded-full bg-[#1AAD19] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 relative"
            title="UNIO 微信公众号"
          >
            <span className="font-bold text-[10px] tracking-tighter font-sans">公众号</span>
          </button>

          <div className="absolute right-14 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 px-3 py-2 rounded-xl text-xs whitespace-nowrap shadow-xl pointer-events-none z-50">
            <span className="w-2 h-2 rounded-full bg-[#1AAD19]" />
            <span>微信公众号：关注获取最新资讯</span>
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

              {/* Modal 1: Mini Program — 真实小程序二维码 + 一键复制链接 */}
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
                    微信扫码或长按识别进入 UNIO 元香官方小程序，享有配方预订、纯露直采与“一人一方”档案同步。
                  </p>

                  <div className="bg-white/[0.06] border border-[#d2c4ad]/20 rounded-2xl p-3 inline-block">
                    <img
                      src="/wechat-miniapp.jpg"
                      alt="微信小程序二维码"
                      className="w-44 h-44 object-contain rounded-xl"
                    />
                  </div>

                  <p className="text-[10px] text-[#8C7E6A] font-mono tracking-wider">
                    长按识别二维码 · 进入小程序
                  </p>

                  <div className="flex items-center justify-center gap-2 pt-1">
                    <span className="text-[10px] text-[#b4aca2] font-mono">或在微信中打开:</span>
                    <button
                      onClick={() => copyToClipboard('#小程序://元香/DpKfR4C3wvtoTXf')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all ${
                        copied
                          ? 'bg-emerald-500 text-white'
                          : 'bg-[#07C160] text-white hover:bg-[#05A854]'
                      }`}
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? '已复制' : '一键复制链接'}
                    </button>
                  </div>
                </div>
              )}

              {/* Modal 3: Customer Service — 真实客服二维码 */}
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
                    扫码添加微信客服，任何关于精油禁忌、一人一方定制或批次 COA 疑问，随时获得专业解惑。
                  </p>

                  <div className="bg-white/[0.06] border border-[#d2c4ad]/20 rounded-2xl p-3 inline-block">
                    <img
                      src="/wechat-qr.png"
                      alt="微信客服二维码"
                      className="w-44 h-44 object-contain rounded-xl"
                    />
                  </div>

                  <p className="text-[10px] text-[#8C7E6A] font-mono tracking-wider">
                    长按识别二维码 · 添加专属芳疗师
                  </p>
                </div>
              )}

              {/* Modal 4: WeChat Official Account (公众号) — 真实公众号二维码 */}
              {activeModal === 'pub' && (
                <div className="space-y-5 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1AAD19]/20 border border-[#1AAD19]/40 text-[#1AAD19] text-xs font-semibold">
                    <QrCode className="w-3.5 h-3.5" />
                    <span>微信公众号</span>
                  </div>

                  <h3 className="font-serif text-2xl text-white font-normal">
                    UNIO 元香公众号
                  </h3>

                  <p className="text-xs text-[#b4aca2] leading-relaxed">
                    关注公众号，获取 UNIO 元香最新产品资讯、芳疗知识与品牌故事。
                  </p>

                  <div className="bg-white/[0.06] border border-[#d2c4ad]/20 rounded-2xl p-3 inline-block">
                    <img
                      src="/wechat-pub.webp"
                      alt="微信公众号二维码"
                      className="w-44 h-44 object-contain rounded-xl"
                    />
                  </div>

                  <p className="text-[10px] text-[#8C7E6A] font-mono tracking-wider">
                    长按识别二维码 · 关注公众号
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
