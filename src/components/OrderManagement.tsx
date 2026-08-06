import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Truck, CheckCircle2, XCircle, ClipboardList, Search, Download } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Order, OrderStatus } from '../types';

const STATUS_META: Record<OrderStatus, { label: string; color: string; dot: string }> = {
  pending: { label: '待处理', color: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  paid: { label: '已核销', color: 'bg-sky-100 text-sky-700 border-sky-200', dot: 'bg-sky-500' },
  prepared: { label: '待配货', color: 'bg-violet-100 text-violet-700 border-violet-200', dot: 'bg-violet-500' },
  shipped: { label: '已发货', color: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  delivered: { label: '已收货', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  cancelled: { label: '已取消', color: 'bg-red-100 text-red-600 border-red-200', dot: 'bg-red-500' },
};

const FLOW: OrderStatus[] = ['pending', 'paid', 'prepared', 'shipped', 'delivered'];

/**
 * 订单管理面板（后台）：状态筛选 + 核销/配货/录入物流单号发货
 * 数据源：CartContext.orders（localStorage）
 */
export function OrderManagement() {
  const { orders, updateOrderStatus } = useCart();
  const [filter, setFilter] = useState<'all' | OrderStatus>('all');
  const [search, setSearch] = useState('');
  const [trackingInput, setTrackingInput] = useState<Record<string, string>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    if (filter !== 'all' && o.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.wechatId.toLowerCase().includes(q) ||
        o.items.some((i) => i.cn.includes(search) || i.code.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const countBy = (s: OrderStatus) => orders.filter((o) => o.status === s).length;

  // 导出 CSV（当前筛选结果，BOM 防 Excel 乱码）
  const exportCSV = () => {
    const rows = filteredOrders.map((o) => ({
      订单号: o.id,
      下单时间: new Date(o.createdAt).toLocaleString('zh-CN'),
      微信ID: o.wechatId,
      商品: o.items.map((i) => `${i.cn || i.en} x${i.qty}`).join('；'),
      金额: o.totalPrice,
      状态: STATUS_META[o.status]?.label || o.status,
      物流单号: o.trackingNumber || '',
    }));
    if (rows.length === 0) return;
    const header = Object.keys(rows[0]);
    const csv = [
      header.join(','),
      ...rows.map((r) => header.map((h) => `"${String(r[h]).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `UNIO_订单报表_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleShip = (order: Order) => {
    const tn = (trackingInput[order.id] || '').trim();
    updateOrderStatus(order.id, 'shipped', tn || undefined);
    setTrackingInput((prev) => ({ ...prev, [order.id]: '' }));
  };

  return (
    <div className="space-y-4">
      {/* 状态统计条 */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-xl border px-2 py-2 text-center transition-all ${filter === 'all' ? 'bg-[#0c120e] text-white border-[#0c120e] shadow-lg' : 'bg-white border-slate-200 text-slate-500 hover:border-[#d2c4ad]'}`}
        >
          <p className="text-lg font-bold">{orders.length}</p>
          <p className="text-[10px]">全部</p>
        </button>
        <div className="rounded-xl border border-slate-200 bg-white px-2 py-2 text-center">
          <p className="text-lg font-bold text-[#D75437]">¥{orders.reduce((s, o) => s + (o.totalPrice || 0), 0).toFixed(0)}</p>
          <p className="text-[10px] text-slate-500">订单金额</p>
        </div>
        {FLOW.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-xl border px-2 py-2 text-center transition-all ${filter === s ? 'bg-[#0c120e] text-white border-[#0c120e] shadow-lg' : 'bg-white border-slate-200 text-slate-500 hover:border-[#d2c4ad]'}`}
          >
            <p className="text-lg font-bold">{countBy(s)}</p>
            <p className="text-[10px]">{STATUS_META[s].label}</p>
          </button>
        ))}
      </div>

      {/* 搜索 */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索订单号 / 微信 ID / 产品名..."
          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d2c4ad]/50"
        />
        <button
          onClick={exportCSV}
          className="shrink-0 px-3 py-2.5 rounded-xl bg-[#0c120e] text-[#d2c4ad] text-xs font-bold hover:bg-[#1c2a22] transition-all flex items-center gap-1.5 whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" /> 导出 CSV
        </button>
      </div>

      {/* 订单列表 */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-14 text-slate-400 text-sm">
            <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-30" />
            暂无订单
          </div>
        )}
        <AnimatePresence>
          {filtered.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              statusMeta={STATUS_META}
              expanded={expandedId === order.id}
              onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
              onUpdate={updateOrderStatus}
              tracking={trackingInput[order.id] || ''}
              setTracking={(v) => setTrackingInput((prev) => ({ ...prev, [order.id]: v }))}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * 订单卡片（React.memo 优化：仅订单数据/状态变化时重渲染）
 * 含交互式生命周期进度条：点击时间轴节点快速切换状态（shipped 需用单号输入框）
 */
const OrderItem = React.memo(function OrderItem({
  order: o,
  statusMeta,
  expanded,
  onToggle,
  onUpdate,
  tracking,
  setTracking,
}: {
  order: Order;
  statusMeta: Record<OrderStatus, { label: string; color: string; dot: string }>;
  expanded: boolean;
  onToggle: () => void;
  onUpdate: (id: string, status: OrderStatus, trackingNumber?: string) => void;
  tracking: string;
  setTracking: (v: string) => void;
}) {
  const FLOW_STEPS: OrderStatus[] = ['pending', 'paid', 'prepared', 'shipped', 'delivered'];
  const currentStep = FLOW_STEPS.indexOf(o.status);

  const handleShip = () => {
    const tn = tracking.trim();
    onUpdate(o.id, 'shipped', tn || undefined);
    setTracking('');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
    >
      {/* 订单头 */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50/60 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`w-2 h-2 rounded-full ${statusMeta[o.status].dot} flex-shrink-0`} />
          <div className="text-left min-w-0">
            <p className="font-mono text-xs text-slate-600">{o.id}</p>
            <p className="text-[11px] text-slate-400">
              {new Date(o.createdAt).toLocaleString('zh-CN')} · {o.items.length} 款
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${statusMeta[o.status].color}`}>
            {statusMeta[o.status].label}
          </span>
          <span className="font-bold text-sm text-[#2D2D2A]">¥{o.totalPrice.toFixed(2)}</span>
        </div>
      </button>

      {/* 展开详情 */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-3">
          {/* 交互式生命周期进度条：点击节点切换状态 */}
          <div className="flex justify-between items-center text-[10px] py-2 relative">
            <div className="absolute top-5 left-4 right-4 h-0.5 bg-gray-200" />
            {FLOW_STEPS.map((status) => {
              const stepConfig = statusMeta[status];
              const isCompleted = FLOW_STEPS.indexOf(status) <= currentStep;
              return (
                <button
                  key={status}
                  onClick={() => {
                    if (status !== 'shipped') {
                      if (status !== o.status) onUpdate(o.id, status);
                    } else {
                      alert('发货状态请使用下方操作按钮录入单号后确认发货');
                    }
                  }}
                  className={`flex flex-col items-center gap-1 z-10 transition-colors ${isCompleted ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-300'}`}>
                    {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                  <span>{stepConfig.label}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-50 rounded-lg p-3 space-y-1.5">
            {o.items.map((i) => (
              <div key={i.code} className="flex justify-between text-xs">
                <span className="text-slate-500">
                  <span className="font-mono text-[10px] text-[#8C7E6A]">{i.code}</span> {i.cn} × {i.qty}
                </span>
                <span className="font-medium text-slate-700">{i.price}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-500">微信：{o.wechatId}</span>
            {o.trackingNumber && (
              <span className="px-2 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-600 font-mono">单号：{o.trackingNumber}</span>
            )}
            {o.note && (
              <span className="px-2 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-700">备注：{o.note}</span>
            )}
          </div>

          {/* 状态流转操作按钮 */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {o.status === 'pending' && (
              <ActionBtn onClick={() => onUpdate(o.id, 'paid')} color="sky">
                <CheckCircle2 size={14} /> 确认核销
              </ActionBtn>
            )}
            {o.status === 'paid' && (
              <ActionBtn onClick={() => onUpdate(o.id, 'prepared')} color="violet">
                <Package size={14} /> 开始配货
              </ActionBtn>
            )}
            {o.status === 'prepared' && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  value={tracking}
                  onChange={(e) => setTracking(e.target.value)}
                  placeholder="录入物流单号"
                  className="flex-1 sm:flex-none sm:w-48 px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#d2c4ad]/50"
                />
                <ActionBtn onClick={handleShip} color="blue">
                  <Truck size={14} /> 确认发货
                </ActionBtn>
              </div>
            )}
            {o.status === 'shipped' && (
              <ActionBtn onClick={() => onUpdate(o.id, 'delivered')} color="emerald">
                <CheckCircle2 size={14} /> 确认收货
              </ActionBtn>
            )}
            {(o.status === 'pending' || o.status === 'paid') && (
              <ActionBtn onClick={() => onUpdate(o.id, 'cancelled')} color="red">
                <XCircle size={14} /> 取消订单
              </ActionBtn>
            )}
            {o.status === 'cancelled' && (
              <span className="text-[11px] text-red-400">该订单已取消</span>
            )}
            {o.status === 'delivered' && (
              <span className="text-[11px] text-emerald-500">已完成交易</span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
});

function ActionBtn({ children, onClick, color }: { children: React.ReactNode; onClick: () => void; color: string }) {
  const colors: Record<string, string> = {
    sky: 'bg-sky-50 text-sky-600 border-sky-200 hover:bg-sky-100',
    violet: 'bg-violet-50 text-violet-600 border-violet-200 hover:bg-violet-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100',
    red: 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100',
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${colors[color]}`}
    >
      {children}
    </button>
  );
}
