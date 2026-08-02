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
  ChevronUp
} from 'lucide-react';
import { UnioLogo } from './UnioLogo';

interface FloatingSocialDockProps {
  onNavigateTab: (tab: string) => void;
}

export const FloatingSocialDock: React.FC<FloatingSocialDockProps> = ({ onNavigateTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'xiaohongshu' | 'miniprogram' | 'service' | null>(null);
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAction = (type: 'xiaohongshu' | 'miniprogram' | 'service' | 'ai') => {
    setIsOpen(false);
    if (type === 'ai') {
      onNavigateTab('ai-consult');
    } else {
      setActiveModal(type);
    }
  };

  return (
    <>
      {/* Floating Speed Dial Container */}
      <div className="fixed right-3 sm:right-6 bottom-8 sm:bottom-10 z-40 flex flex-col items-end pointer-events-none">
        
        {/* Expanded Sub-Buttons */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex flex-col gap-2.5 items-end mb-3 pointer-events-auto"
            >
              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 group focus:outline-none"
              >
                <span className="text-[10px] sm:text-[11px] font-serif bg-[#0c120e]/85 text-[#d2c4ad] border border-[#d2c4ad]/30 px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  回到顶部 <span className="font-sans text-[9px] text-[#b4aca2] ml-1">Top</span>
                </span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EFEDE7] text-[#2D2D2A] border border-[#2D2D2A]/15 shadow-lg flex items-center justify-center hover:bg-[#2D2D2A] hover:text-[#f6f2eb] transition-all">
                  <ArrowUp className="w-4 h-4" />
                </div>
              </button>

              {/* AI One Scent One Formula */}
              <button
                onClick={() => handleAction('ai')}
                className="flex items-center gap-2 group focus:outline-none"
              >
                <span className="text-[10px] sm:text-[11px] font-serif bg-[#0c120e]/85 text-[#d2c4ad] border border-[#d2c4ad]/30 px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  AI 一人一方 <span className="font-sans text-[9px] text-[#b4aca2] ml-1">AI Prescription</span>
                </span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#1a241e] to-[#0c120e] text-[#d2c4ad] border border-[#d2c4ad]/50 shadow-lg flex items-center justify-center hover:scale-105 transition-all">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
              </button>

              {/* Customer Service */}
              <button
                onClick={() => handleAction('service')}
                className="flex items-center gap-2 group focus:outline-none"
              >
                <span className="text-[10px] sm:text-[11px] font-serif bg-[#0c120e]/85 text-[#d2c4ad] border border-[#d2c4ad]/30 px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  芳疗师问诊 <span className="font-sans text-[9px] text-[#b4aca2] ml-1">Consultant</span>
                </span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2D2D2A] text-[#d2c4ad] border border-[#d2c4ad]/40 shadow-lg flex items-center justify-center hover:bg-[#0c120e] hover:scale-105 transition-all">
                  <MessageCircle className="w-4.5 h-4.5" />
                </div>
              </button>

              {/* WeChat Mini Program */}
              <button
                onClick={() => handleAction('miniprogram')}
                className="flex items-center gap-2 group focus:outline-none"
              >
                <span className="text-[10px] sm:text-[11px] font-serif bg-[#0c120e]/85 text-[#d2c4ad] border border-[#d2c4ad]/30 px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  微信小程序 <span className="font-sans text-[9px] text-[#b4aca2] ml-1">WeChat</span>
                </span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#07C160] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-all">
                  <QrCode className="w-4.5 h-4.5" />
                </div>
              </button>

              {/* Xiaohongshu */}
              <button
                onClick={() => handleAction('xiaohongshu')}
                className="flex items-center gap-2 group focus:outline-none"
              >
                <span className="text-[10px] sm:text-[11px] font-serif bg-[#0c120e]/85 text-[#d2c4ad] border border-[#d2c4ad]/30 px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  小红书专区 <span className="font-sans text-[9px] text-[#b4aca2] ml-1">RED</span>
                </span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FF2442] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-all">
                  <span className="font-bold text-[11px] tracking-tighter">RED</span>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Single Master Trigger Button with Glassmorphism */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`pointer-events-auto h-10 sm:h-11 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] border transition-all duration-300 flex items-center gap-2 px-3 sm:px-3.5 backdrop-blur-xl ${
            isOpen 
              ? 'bg-[#d2c4ad] text-[#0c120e] border-[#d2c4ad] ring-2 ring-[#0c120e]/20' 
              : 'bg-[#080d0a]/80 text-[#d2c4ad] border-[#d2c4ad]/35 hover:border-[#d2c4ad] hover:bg-[#080d0a]/95'
          }`}
          title={isOpen ? '收起快捷通道' : '展开 UNIO 寻香通道'}
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4" />
              <span className="font-serif text-xs font-bold whitespace-nowrap pr-0.5">收起 · Close</span>
            </>
          ) : (
            <>
              <div className="relative flex items-center justify-center">
                <UnioLogo size={18} color="#d2c4ad" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FF2442] animate-pulse" />
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="font-serif text-[11px] sm:text-xs tracking-wider whitespace-nowrap font-medium text-[#f6f2eb]">
                  寻香通道
                </span>
                <span className="font-sans text-[8px] tracking-widest text-[#d2c4ad]/80 uppercase">
                  Scent Portal
                </span>
              </div>
              <ChevronUp className="w-3.5 h-3.5 opacity-70 ml-0.5" />
            </>
          )}
        </button>

      </div>

      {/* Backdrop overlay when open on mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-xs transition-opacity"
        />
      )}

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
