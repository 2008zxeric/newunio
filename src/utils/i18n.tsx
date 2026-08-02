import React from 'react';

// Lightweight Bilingual Helper Utilities for UNIO High-End International Branding

export interface BilingualLabel {
  zh: string;
  en: string;
}

/**
 * Returns a React element with Chinese primary text and English secondary sub-text
 */
export const BilingualSpan: React.FC<{
  zh: string;
  en?: string;
  className?: string;
  enClassName?: string;
}> = ({ zh, en, className = '', enClassName = 'text-[0.82em] opacity-80 font-sans tracking-wider uppercase ml-1.5' }) => {
  if (!en) return <span className={className}>{zh}</span>;
  return (
    <span className={className}>
      <span>{zh}</span>
      <span className={enClassName}>{en}</span>
    </span>
  );
};

/**
 * Reusable Luxury Header component with bilingual titles and description
 */
export const BilingualHeader: React.FC<{
  categoryEn: string;
  categoryZh?: string;
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn?: string;
  extraRight?: React.ReactNode;
  className?: string;
}> = ({
  categoryEn,
  categoryZh,
  titleZh,
  titleEn,
  descZh,
  descEn,
  extraRight,
  className = ''
}) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2D2D2A]/15 pb-6 ${className}`}>
      <div className="space-y-1.5">
        <span className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.38em] text-[#8C7E6A] uppercase font-mono font-medium block">
          {categoryEn} {categoryZh && `· ${categoryZh}`}
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#2D2D2A] leading-tight flex flex-wrap items-baseline gap-2">
          <span>{titleZh}</span>
          <span className="font-serif italic font-light text-lg sm:text-2xl text-[#8C7E6A] block sm:inline">
            / {titleEn}
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-[#2D2D2A]/75 max-w-3xl font-sans leading-relaxed pt-0.5">
          <span>{descZh}</span>
          {descEn && (
            <span className="block text-[11px] sm:text-xs text-[#8C7E6A] font-mono tracking-wide mt-0.5">
              {descEn}
            </span>
          )}
        </p>
      </div>
      {extraRight && <div className="shrink-0">{extraRight}</div>}
    </div>
  );
};

/**
 * Key Dictionary for standard global labels across UNIO Aroma
 */
export const DICTIONARY = {
  home: {
    heroTag: { zh: "UNIO AROMA · 始于 2003", en: "Est. 2003" },
    title: { zh: "UNIO 元香", en: "Aroma Sanctuary" },
    subtitle: { zh: "世界芳疗", en: "Global Botanical Therapy" },
    quote: { zh: "“从极境撷取芳香，因世界元于一息。”", en: '"Harvesting essence from extreme realms; unified in a single breath."' },
    exploreBtn: { zh: "探索 219 款全系作品", en: "Explore Collection" },
    consultBtn: { zh: "AI 一人一方", en: "AI Prescription" },
    atlasBtn: { zh: "寻香图谱", en: "Scent Atlas" },
  },
  catalog: {
    badge: { zh: "全系 219 款调配档案", en: "Complete Archive 219" },
    title: { zh: "UNIO 元香 调配档案索引", en: "Aroma Formulation Directory" },
    desc: { zh: "实时检索单方精油、协同复方、植物纯露与空间器物，全部配备 COA & MSDS 实验室批次检验码。", en: "Interactive catalog for single essential oils, synergistic blends, hydrosols and diffuser apparatus with batch COA certificates." },
    searchPlaceholder: { zh: "搜索产品名称、英文名、编号 (如 Y-J-01)、产地、COA检验码...", en: "Search by botanical name, code, origin, COA..." },
    sortDefault: { zh: "默认排序", en: "Default Order" },
    sortCode: { zh: "按产品编号", en: "By Product Code" },
    sortName: { zh: "按中文拼音", en: "Alphabetical" },
  },
  story: {
    badge: { zh: "品牌故事与全景手册", en: "Heritage & Master Guide" },
    title: { zh: "UNIO 元香 · 23年植物哲学", en: "23-Year Botanical Philosophy" },
    desc: { zh: "从 2003 年首篇芳疗临床手记，到全球 50 余国原产地直采。探索 UNIO 沉淀的核心理念与全景档案。", en: "From the first clinical notes in 2003 to direct sourcing across 50 countries." }
  }
};
