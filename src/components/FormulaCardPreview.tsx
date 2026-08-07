import React, { useState, useRef } from 'react';
import { X, Printer, Download, Check } from 'lucide-react';
import { UnioLogo } from './UnioLogo';
import { printElementAsPNG, downloadElementAsPNG } from '../utils/printExport';
import { PrintBrandFooter } from './PrintBrandFooter';

/** 处方卡数据（与 UserProfileView MOCK_FORMULATION_HISTORY 结构一致） */
export interface FormulaCardData {
  id: string;
  date: string;
  title: string;
  concept: string;
  components: string[];
  carrier: string;
  coaBatch: string;
}

interface FormulaCardPreviewProps {
  data: FormulaCardData;
  onClose: () => void;
}

/**
 * 精美配方卡打印预览 — 宣纸风格（米白宣纸 #F5F2EC + 双重竹节微框 + 金色 logo + 朱印）
 * 支持：打印（精准打印卡面） / 下载 PNG
 */
export const FormulaCardPreview: React.FC<FormulaCardPreviewProps> = ({ data, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSeal, setShowSeal] = useState(true);

  const sealBg = '#A5281F';
  const sealBorder = '#8C211A';

  // 解析成分（名称 + 比例）
  const parsedComponents = data.components.map((comp) => {
    const m = comp.match(/^(.+?)\s*\((\d+)%\)$/);
    if (m) return { name: m[1], pct: Number(m[2]) };
    const m2 = comp.match(/^(.+?)\s*\((.+)\)$/);
    if (m2) return { name: m2[1], pct: null, note: m2[2] };
    return { name: comp, pct: null };
  });

  // 预加载卡面内所有图片 → dataURL（解决 html2canvas 跨域丢图）
  
  const handlePrint = async () => {
    const card = cardRef.current;
    if (!card) return;
    try {
      await printElementAsPNG(card, 2);
    } catch (e) { console.warn('处方卡打印失败:', e); }
  };

  const handleDownload = async () => {
    const card = cardRef.current;
    if (!card || downloading) return;
    setDownloading(true);
    try {
      await downloadElementAsPNG(card, `UNIO-配方卡-${data.id}.png`, 2);
    } catch (e) { console.warn('配方卡导出失败:', e); }
    finally { setDownloading(false); }
  };

  const handleCopy = () => {
    const text = `【UNIO 一人一方 · 私人配方卡】\n${data.title}\n日期：${data.date} · 编码：${data.id}\n\n「${data.concept}」\n\n配方成分：\n${parsedComponents.map((c, i) => `${i + 1}. ${c.name}${c.pct ? ` (${c.pct}%)` : ''}`).join('\n')}\n\n推荐载体：${data.carrier}\n质检批号：${data.coaBatch}\n—— UNIO 元香 · 一人一方定制`;
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl my-4">
        {/* 顶部工具栏 */}
        <div className="flex items-center justify-between mb-3 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono tracking-widest text-white/70">配方卡预览 · FORMULA CARD</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs flex items-center gap-1.5 transition-all">
              {copied ? <Check className="w-3.5 h-3.5" /> : <span>⧉</span>}
              {copied ? '已复制' : '复制文案'}
            </button>
            <button onClick={handleDownload} disabled={downloading}
              className="px-3.5 py-2 rounded-xl bg-[#d2c4ad] text-[#2c2a26] text-xs font-bold flex items-center gap-1.5 hover:bg-[#c5b59c] transition-all disabled:opacity-50">
              <Download className="w-3.5 h-3.5" /> {downloading ? '生成中...' : '下载 PNG'}
            </button>
            <button onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white text-[#2c2a26] text-xs font-bold flex items-center gap-1.5 hover:bg-white/90 transition-all">
              <Printer className="w-3.5 h-3.5" /> 打印
            </button>
            <button onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 宣纸配方卡 */}
        <div
          ref={cardRef}
          id="formula-card-print"
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: '#F5F2EC',
            // 双重竹节微框：外框 + 内框
            border: '3px double #8C7E6A',
            boxShadow: 'inset 0 0 0 8px #F5F2EC, inset 0 0 0 9px rgba(140,126,106,0.35), inset 0 0 0 16px #F5F2EC, inset 0 0 0 17px rgba(140,126,106,0.25)',
          }}
        >
          {/* 宣纸纹理 */}
          <div className="absolute inset-0 opacity-[0.5] pointer-events-none paper-grain" />

          {/* 内容 */}
          <div className="relative p-8 sm:p-10 space-y-5">
            {/* 头部：logo + 品牌 */}
            <div className="flex items-center justify-between border-b border-[#8C7E6A]/30 pb-4">
              <div className="flex items-center gap-2.5">
                <UnioLogo size={30} color="#8C7E6A" />
                <div>
                  <div className="font-serif font-bold text-[#1C2E20] tracking-wide text-sm">UNIO 元香 · 一人一方</div>
                  <div className="text-[9px] font-mono text-[#8C7E6A] tracking-widest">PRIVATE FORMULA · CUSTOM BLEND</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#8C7E6A]/15 border border-[#8C7E6A]/30 text-[10px] font-mono text-[#8C7E6A]">
                {data.coaBatch}
              </span>
            </div>

            {/* 标题 + 日期编码 */}
            <div className="text-center space-y-1.5">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C2E20] leading-snug">
                {data.title}
              </h2>
              <p className="text-[10px] font-mono text-[#8C7E6A]">
                {data.date} · 处方编码 {data.id}
              </p>
            </div>

            {/* 理念 */}
            <div className="p-4 rounded-xl bg-[#EFEDE7] border border-[#8C7E6A]/25">
              <p className="text-xs text-[#2D2D2A] leading-relaxed italic font-serif text-center">
                “{data.concept}”
              </p>
            </div>

            {/* 成分 */}
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-1 h-3.5 bg-[#D75437] rounded-full" />
                <span className="text-[10px] font-bold tracking-widest text-[#1C2E20] font-sans">配方成分 · COMPOSITION</span>
              </div>
              <div className="space-y-2">
                {parsedComponents.map((c, i) => (
                  <div key={i} className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-white/60 border border-[#8C7E6A]/20">
                    <span className="text-xs font-serif font-bold text-[#1C2E20]">{c.name}</span>
                    <span className="text-xs font-mono text-[#D75437] font-bold">
                      {c.pct !== null ? `${c.pct}%` : (c.note || '适量')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 载体 + 落款 */}
            <div className="flex items-end justify-between pt-3 border-t border-[#8C7E6A]/25">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-[#8C7E6A] tracking-widest">RECOMMENDED CARRIER</span>
                <p className="text-[11px] text-[#2D2D2A] font-serif">{data.carrier}</p>
              </div>
              <div className="flex items-end gap-3">
                <div className="text-right pb-1">
                  <p className="text-[9px] font-mono text-[#8C7E6A]">UNIO BOTANICAL ARCHIVE</p>
                  <p className="text-[10px] font-serif text-[#1C2E20] font-bold">元香 · 一人一方定制</p>
                </div>
                {/* 朱印 */}
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-[#F5F2EC] font-serif font-bold text-[10px] leading-tight text-center shadow-md select-none"
                  style={{
                    background: `linear-gradient(145deg, ${sealBg}, ${sealBorder})`,
                    boxShadow: `inset 0 0 0 2px rgba(245,242,236,0.35), 0 2px 6px rgba(165,40,31,0.35)`,
                  }}
                >
                  一人一方
                  <br />元香
                </div>
              </div>
            </div>

            {/* 三码 + 域名页脚 */}
            <PrintBrandFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaCardPreview;
