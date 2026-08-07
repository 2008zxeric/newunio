import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Minus, Plus, ShoppingBag, CheckCircle2, MessageCircle, MapPin, Copy, ClipboardCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { useWishlist } from '../hooks/useWishlist';
import { Order, CartItem } from '../types';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  wishlistCodes?: string[];
  onRemoveWishlist?: (codes: string[]) => void;
  /** 打开时若购物车有货，直接进入结算步骤（合并加购/快捷购买场景） */
  autoCheckout?: boolean;
  /** 心愿单直提模式：直接传入待提交商品（不经购物车），打开即进入确认提交页 */
  checkoutItems?: CartItem[] | null;
}

/**
 * 购物车抽屉：结算 → 微信 ID → 提交订单 → motion 确认动画
 * 提交后询问是否从心愿单移除已下单产品；集成快捷咨询（线下店地址一键复制）
 */
export function CartDrawer({ open, onClose, wishlistCodes = [], onRemoveWishlist, autoCheckout = false, checkoutItems = null }: CartDrawerProps) {
  // 直提模式：传入 checkoutItems → 打开即进入确认提交页
  const [prevOpen, setPrevOpen] = useState(false);
  React.useEffect(() => {
    if (open && !prevOpen) {
      if (checkoutItems && checkoutItems.length > 0) {
        setStep('checkout');
      } else if (autoCheckout) {
        setStep((s) => (s === 'cart' ? 'checkout' : s));
      } else {
        setStep('cart');
      }
    }
    setPrevOpen(open);
  }, [open, prevOpen, autoCheckout, checkoutItems]);
  const { cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, submitOrder } = useCart();
  const { offlineLocations } = useSettings();
  const [wechatId, setWechatId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [note, setNote] = useState('');
  const [step, setStep] = useState<'cart' | 'checkout' | 'done'>('cart');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [removeFromWishlist, setRemoveFromWishlist] = useState(true);
  const [copiedCity, setCopiedCity] = useState<string | null>(null);

  const copyLocation = (city: string, address: string) => {
    try {
      navigator.clipboard.writeText(`${city} · ${address}`);
      setCopiedCity(city);
      setTimeout(() => setCopiedCity(null), 1500);
    } catch (e) {
      console.error('copy failed', e);
    }
  };

  // 直提模式：显示/提交 checkoutItems；否则用购物车
  const submitItems = checkoutItems && checkoutItems.length > 0 ? checkoutItems : cart;
  const submitTotal = submitItems.reduce((sum, i) => {
    const price = parseFloat(i.price.replace(/[¥,￥\s]/g, '')) || 0;
    return sum + price * i.qty;
  }, 0);

  const handleSubmit = async () => {
    if (!wechatId.trim() || submitItems.length === 0 || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // 模拟网络延迟，防止重复点击
      const order = submitOrder(wechatId.trim(), checkoutItems && checkoutItems.length > 0 ? submitItems : undefined, note.trim() || undefined);
    if (order) {
      setLastOrder(order);
      if (removeFromWishlist && onRemoveWishlist && wishlistCodes.length > 0) {
        const orderedCodes = order.items.map((i) => i.code);
        onRemoveWishlist(orderedCodes.filter((c) => wishlistCodes.includes(c)));
      }
      setStep('done');
      setWechatId('');
      setNote('');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const orderStatusLabel: Record<string, string> = {
    pending: '待处理',
    paid: '已核销',
    prepared: '待配货',
    shipped: '已发货',
    delivered: '已收货',
    cancelled: '已取消',
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#F9F7F2] shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#d2c4ad]/25 bg-gradient-to-r from-[#2c2a26] to-[#16211b]">
              <h3 className="font-serif text-lg font-bold text-[#d2c4ad] flex items-center gap-2">
                <ShoppingBag size={18} />
                {step === 'done' ? '订单已提交' : '购物车'}
              </h3>
              <button onClick={onClose} className="p-1.5 rounded-lg text-[#b4aca2] hover:text-white hover:bg-white/10 transition-colors">
                <X size={18} />
              </button>
            </div>

            {step === 'cart' && (
              <>
                {/* 商品列表 */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 text-slate-400 text-sm">
                      <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      购物车还是空的，去馆藏逛逛吧
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.code} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-[#d2c4ad]/15 shadow-sm">
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-mono text-[#8C7E6A]">{item.code}</p>
                          <p className="font-semibold text-[#2D2D2A] text-sm truncate">{item.cn}</p>
                          <p className="text-[11px] text-slate-400 truncate">{item.en}</p>
                          <p className="text-[#D75437] font-bold text-sm mt-0.5">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => updateQty(item.code, item.qty - 1)} className="w-6 h-6 rounded-md bg-[#EFEDE7] flex items-center justify-center text-slate-500 hover:bg-[#d2c4ad]/30 transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="w-7 text-center text-sm font-medium">{item.qty}</span>
                          <button onClick={() => updateQty(item.code, item.qty + 1)} className="w-6 h-6 rounded-md bg-[#EFEDE7] flex items-center justify-center text-slate-500 hover:bg-[#d2c4ad]/30 transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.code)} className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* 底部结算栏 */}
                {cart.length > 0 && (
                  <div className="px-5 py-4 border-t border-[#d2c4ad]/25 bg-white/60 backdrop-blur-sm space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">合计</span>
                      <span className="font-bold text-lg text-[#D75437]">¥{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={clearCart}
                        className="flex-1 py-2.5 rounded-xl border border-[#d2c4ad]/40 text-[#8C7E6A] text-sm hover:bg-[#EFEDE7] transition-colors"
                      >
                        清空
                      </button>
                      <button
                        onClick={() => setStep('checkout')}
                        className="flex-[2] py-2.5 rounded-xl bg-gradient-to-r from-[#D75437] to-[#c4452a] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#D75437]/25 transition-all"
                      >
                        去结算
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {step === 'checkout' && (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  <div className="rounded-xl border border-[#D75437]/25 bg-[#D75437]/5 p-3">
                    <p className="text-xs font-semibold text-[#D75437] mb-2 flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                      请填写您的微信 ID 完成提交
                    </p>
                    <label className="text-xs font-medium text-slate-500 block mb-1.5">微信 ID（用于核销联系）</label>
                    <input
                      value={wechatId}
                      onChange={(e) => setWechatId(e.target.value)}
                      placeholder="请输入您的微信 ID，如 unio_aroma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2c4ad]/40 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D75437]/50"
                    />
                    <p className="text-[11px] text-slate-400 mt-1.5">提交后我们将通过该微信与您核销确认，请确保填写正确。</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1.5">备注（可选）</label>
                    <input
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="如：希望顺丰发货 / 需要发票"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2c4ad]/40 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d2c4ad]/50"
                    />
                  </div>
                  <div className="bg-white rounded-xl border border-[#d2c4ad]/20 p-3 space-y-1.5">
                    <p className="text-xs font-semibold text-[#8C7E6A] flex items-center gap-1.5">
                      <MapPin size={12} /> 线下体验店（快捷咨询）
                    </p>
                    {offlineLocations.map((loc) => (
                      <button
                        key={loc.city}
                        onClick={() => copyLocation(loc.city, loc.address)}
                        className="w-full flex items-center justify-between text-left text-[11px] text-slate-500 hover:text-[#2D2D2A] hover:bg-[#EFEDE7] rounded-lg px-2 py-1.5 transition-colors group"
                      >
                        <span className="truncate">
                          <span className="font-medium text-[#2D2D2A]">{loc.city}</span> · {loc.address}
                        </span>
                        {copiedCity === loc.city ? (
                          <ClipboardCheck size={13} className="text-emerald-500 flex-shrink-0" />
                        ) : (
                          <Copy size={13} className="opacity-0 group-hover:opacity-60 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="px-5 py-4 border-t border-[#d2c4ad]/25 bg-white/60 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">合计（{submitItems.length} 款）</span>
                    <span className="font-bold text-lg text-[#D75437]">¥{submitTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => (checkoutItems && checkoutItems.length > 0 ? onClose() : setStep('cart'))} className="flex-1 py-2.5 rounded-xl border border-[#d2c4ad]/40 text-[#8C7E6A] text-sm hover:bg-[#EFEDE7] transition-colors">
                      {checkoutItems && checkoutItems.length > 0 ? '取消' : '返回'}
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!wechatId.trim() || isSubmitting}
                      className={`flex-[2] py-2.5 rounded-xl bg-gradient-to-r from-[#2c2a26] to-[#16211b] text-[#d2c4ad] text-sm font-semibold disabled:opacity-40 hover:shadow-lg transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'cursor-wait' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                          正在提交...
                        </>
                      ) : (
                        '提交订单'
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            {step === 'done' && lastOrder && (
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#2D2D2A]">订单提交成功</h4>
                  <p className="text-xs text-slate-400 mt-1">订单号 {lastOrder.id} · 状态：待处理</p>
                  <div className="mt-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-700 text-left leading-relaxed">
                    订单已进入「待处理」状态——我们将通过您的微信 ID 与您核销确认，随后安排配货与发货，请留意微信消息。
                  </div>
                  <div className="mt-4 bg-white rounded-xl border border-[#d2c4ad]/20 p-3 text-left space-y-1.5">
                    {lastOrder.items.map((i) => (
                      <div key={i.code} className="flex justify-between text-xs">
                        <span className="text-slate-500">{i.cn} × {i.qty}</span>
                        <span className="font-medium">{i.price}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm pt-1.5 border-t border-[#d2c4ad]/15">
                      <span className="text-slate-500">合计</span>
                      <span className="font-bold text-[#D75437]">¥{lastOrder.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* 移除心愿单询问 */}
                  {wishlistCodes.length > 0 && (
                    <label className="mt-4 flex items-center gap-2 justify-center text-xs text-slate-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={removeFromWishlist}
                        onChange={(e) => setRemoveFromWishlist(e.target.checked)}
                        className="accent-[#D75437]"
                      />
                      同时从心愿单移除已下单产品
                    </label>
                  )}

                  <div className="mt-4 rounded-xl bg-gradient-to-r from-[#2c2a26] to-[#16211b] p-4 text-left">
                    <p className="text-xs font-semibold text-[#d2c4ad] flex items-center gap-1.5 mb-2">
                      <MessageCircle size={13} /> 快捷咨询 · 线下体验店
                    </p>
                    {offlineLocations.map((loc) => (
                      <button
                        key={loc.city}
                        onClick={() => copyLocation(loc.city, loc.address)}
                        className="w-full text-left text-[11px] text-[#b4aca2] hover:text-white hover:bg-white/5 rounded-lg px-2 py-1.5 transition-colors flex items-center justify-between group"
                      >
                        <span className="truncate">
                          <span className="text-[#f6f2eb] font-medium">{loc.city}</span> · {loc.address}
                        </span>
                        {copiedCity === loc.city ? (
                          <ClipboardCheck size={12} className="text-emerald-400 flex-shrink-0" />
                        ) : (
                          <Copy size={12} className="opacity-0 group-hover:opacity-60 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => { setStep('cart'); onClose(); }}
                    className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D75437] to-[#c4452a] text-white text-sm font-semibold hover:shadow-lg transition-all"
                  >
                    完成
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
