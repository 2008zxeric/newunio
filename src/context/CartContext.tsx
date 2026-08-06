import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Order, OrderStatus } from '../types';

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
  submitOrder: (wechatId: string, note?: string) => Order | null;
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

  const submitOrder = (wechatId: string, note?: string): Order | null => {
    if (cart.length === 0) return null;
    const order: Order = {
      id: 'UO-' + Date.now().toString().slice(-8),
      items: [...cart],
      totalPrice: cartTotal,
      wechatId,
      status: 'pending',
      note,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    return order;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status, trackingNumber: trackingNumber ?? o.trackingNumber } : o))
    );
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
