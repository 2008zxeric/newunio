import React from 'react';

/**
 * UNIO AROMA 品牌 Logo 组件
 * ⚠️ 使用品牌金色中文 logo（/logo-cn-gold.png，与首页一致）
 * 注：官方 logo.svg 为纯黑描边，深色背景下不可见，故用金色版
 */
interface UnioLogoProps {
  className?: string;
  size?: number;
  color?: string;
  variant?: 'emblem' | 'full' | 'badge';
  showText?: boolean;
  animatedBreathing?: boolean;
}

const OFFICIAL_LOGO = '/logo-cn-gold.png';

export const UnioLogo: React.FC<UnioLogoProps> = ({
  className = '',
  size = 32,
  variant = 'emblem',
  showText = false,
  animatedBreathing = false,
}) => {
  const isFull = variant === 'full';
  const height = isFull ? Math.round(size * 1.2) : size;

  const logoContent = (
    <div className={`relative inline-flex items-center justify-center ${animatedBreathing ? 'group' : ''}`}>
      {animatedBreathing && (
        <>
          {/* Outer Breathing Aura Halo Ring */}
          <div className="absolute inset-0 rounded-full bg-[#d2c4ad]/20 blur-xl animate-pulse scale-150 pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-[#d2c4ad]/30 animate-ping opacity-25 pointer-events-none" style={{ animationDuration: '4s' }} />
        </>
      )}
      <div className={animatedBreathing ? 'relative z-10 transition-transform duration-700 group-hover:scale-105' : ''}>
        {/* 官方品牌 Logo 图片 */}
        <img
          src={OFFICIAL_LOGO}
          alt="UNIO 元香"
          width={size}
          height={height}
          className="inline-block flex-shrink-0 object-contain"
          style={{ width: size, height }}
          loading="eager"
        />
      </div>
    </div>
  );

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <div className="p-1.5 rounded-full bg-[#0c120e] border border-[#d2c4ad]/40 shadow-sm flex items-center justify-center relative">
          {logoContent}
        </div>
        {showText && (
          <div className="flex flex-col text-left">
            <span className="font-serif tracking-[0.25em] text-[#2D2D2A] font-bold text-base">UNIO 元香</span>
            <span className="text-[9px] text-[#8C7E6A] tracking-[0.2em] uppercase font-mono">UNIO AROMA · 2003</span>
          </div>
        )}
      </div>
    );
  }

  if (showText) {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        {logoContent}
        <div className="flex flex-col text-left">
          <span className="font-serif tracking-[0.25em] text-[#2D2D2A] font-bold text-lg">UNIO 元香</span>
          <span className="text-[10px] text-[#8C7E6A] tracking-[0.2em] uppercase font-sans">
            UNIO AROMA · 岁岁闻香
          </span>
        </div>
      </div>
    );
  }

  return <div className={`inline-block ${className}`}>{logoContent}</div>;
};
