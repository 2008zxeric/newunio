import React, { useState } from 'react';
import { ProductItem } from '../types';
import { X, ShieldCheck, Copy, Check, MapPin, Sparkles, BookOpen, Layers } from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCustomBlend?: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCustomBlend
}) => {
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const handleCopyDossier = () => {
    const text = `UNIO 元香 调配档案 Dossier
产品: ${product.cn} (${product.en})
编号: ${product.code} (No.${product.no})
产地: ${product.origin}
拉丁学名: ${product.latinName || 'N/A'}
COA 报告: ${product.coaNumber}
批次号: ${product.batchTrace}
价格: ${product.prices.join(' / ')}
说明: ${product.description}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2D2A]/60 backdrop-blur-md animate-fade-in font-sans">
      
      <div 
        className="relative w-full max-w-2xl bg-[#F9F7F2] border border-[#2D2D2A]/20 rounded-3xl overflow-hidden shadow-2xl text-[#2D2D2A] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2D2D2A]/10 bg-[#EFEDE7]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#2D2D2A] text-[#F9F7F2] text-[10px] font-mono font-medium">
              {product.code}
            </span>
            <span className="text-xs text-[#8C7E6A]">No.{product.no} · UNIO Archive</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#DED9D2] hover:bg-[#2D2D2A] text-[#2D2D2A] hover:text-[#F9F7F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Visual & Info Hero */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#EFEDE7] border border-[#2D2D2A]/15">
              <img
                src={product.image}
                alt={product.cn}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-[#F9F7F2] border border-[#2D2D2A]/20 text-[#2D2D2A] text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C7E6A]" />
                <span>COA/MSDS Verified</span>
              </div>
            </div>

            <div className="space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs text-[#8C7E6A] uppercase font-mono tracking-wider block mb-1">
                  {product.series.toUpperCase()} · {product.subgroup}
                </span>

                <h2 className="font-serif text-2xl text-[#2D2D2A] font-semibold">
                  {product.cn}
                </h2>

                <p className="text-xs text-[#8C7E6A] font-sans italic mt-0.5">
                  {product.en} {product.latinName && `(${product.latinName})`}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-[#2D2D2A] mt-2 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#8C7E6A]" />
                  <span>产地来源: {product.origin}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#EFEDE7] border border-[#2D2D2A]/15 space-y-1">
                <span className="text-[10px] text-[#8C7E6A] uppercase tracking-wider block font-sans">价格与规格</span>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#2D2D2A] font-semibold">
                  {product.prices.map((p, idx) => (
                    <span key={idx} className="bg-[#F9F7F2] px-2.5 py-1 rounded-lg border border-[#2D2D2A]/15">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-[#2D2D2A]/80 leading-relaxed font-sans font-light">
                {product.shortDesc}
              </div>
            </div>
          </div>

          {/* Scent Pyramid (If available) */}
          {product.scentPyramid && (
            <div className="p-4 rounded-2xl bg-[#EFEDE7] border border-[#2D2D2A]/15 space-y-2">
              <span className="text-xs text-[#2D2D2A] font-serif block font-semibold">香调金字塔 Scent Profile</span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/10">
                  <span className="text-[10px] text-[#8C7E6A] block">前调 Top</span>
                  <span className="text-xs text-[#2D2D2A] font-medium">{product.scentPyramid.top || '清爽草本'}</span>
                </div>
                <div className="p-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/10">
                  <span className="text-[10px] text-[#8C7E6A] block">中调 Middle</span>
                  <span className="text-xs text-[#2D2D2A] font-medium">{product.scentPyramid.middle || '圆润纯花'}</span>
                </div>
                <div className="p-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/10">
                  <span className="text-[10px] text-[#8C7E6A] block">尾调 Base</span>
                  <span className="text-xs text-[#2D2D2A] font-medium">{product.scentPyramid.base || '沉稳木质'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Full Description & Heritage */}
          <div className="space-y-2">
            <span className="text-xs text-[#2D2D2A] font-serif block font-semibold">档案记载 & Botanical Heritage</span>
            <p className="text-xs text-[#2D2D2A]/80 leading-relaxed font-light bg-[#EFEDE7] p-4 rounded-2xl border border-[#2D2D2A]/15">
              {product.description}
            </p>
          </div>

          {/* Quality & Traceability Block */}
          <div className="p-4 rounded-2xl bg-[#EFEDE7] border border-[#2D2D2A]/20 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#2D2D2A] font-mono text-[11px] font-medium">
              <span>COA 检验报告: {product.coaNumber}</span>
              <span>批次: {product.batchTrace}</span>
            </div>
            <p className="text-[#8C7E6A] text-[11px] leading-relaxed">
              UNIO 元香坚持不添加人工合成香精，所有批次检测记录与 MSDS 资料均可在官方档案库中核对。
            </p>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-[#2D2D2A]/10 bg-[#EFEDE7] flex items-center justify-between gap-3">
          <button
            onClick={handleCopyDossier}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F9F7F2] border border-[#2D2D2A]/15 hover:bg-[#DED9D2] text-xs text-[#2D2D2A] transition-colors font-medium"
          >
            {copied ? <Check className="w-4 h-4 text-[#8C7E6A]" /> : <Copy className="w-4 h-4 text-[#8C7E6A]" />}
            <span>{copied ? '已复制档案资料' : '复制产品档案 Dossier'}</span>
          </button>

          {onAddToCustomBlend && (
            <button
              onClick={() => {
                onAddToCustomBlend(product);
                onClose();
              }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#2D2D2A] text-[#F9F7F2] text-xs font-medium hover:bg-[#8C7E6A] transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#DED9D2]" />
              <span>加入 AI 一人一方配方库</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
