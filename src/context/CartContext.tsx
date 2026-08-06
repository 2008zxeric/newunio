import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Order, OrderStatus } from '../types';
import { supabase } from '../lib/supabase';

/**
 * 购物车与订单管理（CartContext）
 * 状态流转：pending (待处理) → paid (已核销) → prepared (待配货) → shipped (已发货) → delivered (已收货) → cancelled (已取消)
 * 数据持久化：localStorage（对接真实数据库时在 setOrders 处增加 API 请求）
 */
const CART_KEY = 'unio_cart_v1';
const ORDERS_KEY = 'unio_orders_v1';

interface CartContextValue {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (code: string) => void;
  updateQty: (code: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  orders: Order[];
  submitOrder: (wechatId: string, items?: CartItem[], note?: string) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch (e) {
    console.error(`Failed to load ${key}`, e);
    return fallback;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => loadJSON<CartItem[]>(CART_KEY, []));
  const [orders, setOrders] = useState<Order[]>(() => loadJSON<Order[]>(ORDERS_KEY, []));

  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { console.error(e); }
  }, [cart]);

  useEffect(() => {
    try { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); } catch (e) { console.error(e); }
  }, [orders]);

  // 跨设备同步：启动时从 Supabase orders 表拉取（表不存在/失败自动降级 localStorage）
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(100);
        if (error || !data || data.length === 0) return;
        const dbOrders: Order[] = data.map((r: any) => ({
          id: r.id,
          items: Array.isArray(r.items) ? r.items : [],
          totalPrice: Number(r.total_price || 0),
          wechatId: r.wechat_id || '',
          status: (r.status || 'pending') as OrderStatus,
          trackingNumber: r.tracking_number || undefined,
          note: r.note || undefined,
          createdAt: r.created_at || new Date().toISOString(),
        }));
        if (mounted) {
          // DB 优先 + localStorage 补充（未入库的本地订单）
          setOrders((prev) => {
            const dbIds = new Set(dbOrders.map((o) => o.id));
            return [...dbOrders, ...prev.filter((o) => !dbIds.has(o.id))];
          });
        }
      } catch (e) {
        console.warn('orders DB sync skipped (table may not exist yet):', (e as any)?.message || e);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.code === item.code);
      if (existing) {
        return prev.map((i) => (i.code === item.code ? { ...i, qty: i.qty + item.qty } : i));
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (code: string) => {
    setCart((prev) => prev.filter((i) => i.code !== code));
  };

  const updateQty = (code: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((i) => i.code !== code) : prev.map((i) => (i.code === code ? { ...i, qty } : i))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, i) => {
    const price = parseFloat(i.price.replace(/[¥,￥\s]/g, '')) || 0;
    return sum + price * i.qty;
  }, 0);

  const submitOrder = (wechatId: string, items?: CartItem[], note?: string): Order | null => {
    // 支持直接传入 items 提交（心愿单直提模式，不经购物车）；缺省用购物车
    const submitItems = items ?? cart;
    if (submitItems.length === 0) return null;
    const total = submitItems.reduce((sum, i) => {
      const price = parseFloat(i.price.replace(/[¥,￥\s]/g, '')) || 0;
      return sum + price * i.qty;
    }, 0);
    const order: Order = {
      id: 'UO-' + Date.now().toString().slice(-8),
      items: submitItems,
      totalPrice: total,
      wechatId,
      status: 'pending',
      note,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    if (!items) setCart([]);
    // 跨设备同步：写入 Supabase orders 表（表不存在/失败自动降级——本地继续可用）
    try {
      supabase.from('orders').insert({
        id: order.id,
        items: order.items,
        total_price: order.totalPrice,
        wechat_id: order.wechatId,
        status: order.status,
        tracking_number: order.trackingNumber || null,
        note: order.note || null,
        // 鉴权预留：表含 user_id 列（可空）后，Auth 会话存在时由下方 getUser 异步绑定
      }).then(({ error }) => {
        if (error) console.warn('orders insert skipped:', error.message);
      });
    } catch (e) {
      console.warn('orders insert skipped:', (e as any)?.message || e);
    }
    return order;
  };

  // 合法状态流转表（文档 Roadmap：禁止跳级，如 pending 不可直跳 delivered）
  const ALLOWED_TRANSITIONS: Partial<Record<OrderStatus, OrderStatus[]>> = {
    pending: ['paid', 'cancelled'],
    paid: ['prepared', 'cancelled'],
    prepared: ['shipped', 'cancelled'],
    shipped: ['delivered'],
    delivered: [],
    cancelled: [],
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    // 流转校验：仅允许合法路径（pending→paid→prepared→shipped→delivered）
    const target = orders.find((o) => o.id === orderId);
    if (target && target.status !== status) {
      const allowed = ALLOWED_TRANSITIONS[target.status] || [];
      if (!allowed.includes(status)) {
        console.warn(`订单状态流转被拒绝: ${target.status} → ${status}（合法: ${allowed.join(', ')}）`);
        return false;
      }
    }
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status, trackingNumber: trackingNumber ?? o.trackingNumber } : o))
    );
    // 跨设备同步：更新 Supabase orders 表（表不存在/失败自动降级）
    try {
      supabase.from('orders').update({
        status,
        tracking_number: trackingNumber ?? undefined,
      }).eq('id', orderId).then(({ error }) => {
        if (error) console.warn('orders update skipped:', error.message);
      });
    } catch (e) {
      console.warn('orders update skipped:', (e as any)?.message || e);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, orders, submitOrder, updateOrderStatus }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
