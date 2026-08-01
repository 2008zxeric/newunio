import React from 'react';

interface UnioLogoProps {
  className?: string;
  size?: number;
  color?: string;
  variant?: 'emblem' | 'full' | 'badge';
  showText?: boolean;
  animatedBreathing?: boolean;
}

export const UnioLogo: React.FC<UnioLogoProps> = ({
  className = '',
  size = 32,
  color = '#d2c4ad',
  variant = 'emblem',
  showText = false,
  animatedBreathing = false,
}) => {
  // SVG matching the exact official UNIO AROMA 4-petal geometric leaf emblem
  const isFull = variant === 'full';
  const viewBox = isFull ? "0 0 200 240" : "0 0 200 200";
  const height = isFull ? Math.round(size * 1.2) : size;

  const emblemSvg = (
    <svg
      width={size}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block flex-shrink-0 transition-transform duration-300"
    >
      <defs>
        {/* Single Leaf Template pointing North (Up) */}
        <g id="unio-leaf-north">
          {/* Outer Almond Leaf Contour */}
          <path
            d="M 100 14 C 138 52, 132 82, 100 100 C 68 82, 62 52, 100 14 Z"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Central Stem Vein */}
          <path
            d="M 100 14 L 100 78"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Inner Left Vein Arc */}
          <path
            d="M 100 38 C 82 56, 82 78, 100 90"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Inner Right Vein Arc */}
          <path
            d="M 100 38 C 118 56, 118 78, 100 90"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </defs>

      {/* Four Radial Symmetrical Leaves (North, East, South, West) */}
      <use href="#unio-leaf-north" transform="rotate(0, 100, 100)" />
      <use href="#unio-leaf-north" transform="rotate(90, 100, 100)" />
      <use href="#unio-leaf-north" transform="rotate(180, 100, 100)" />
      <use href="#unio-leaf-north" transform="rotate(270, 100, 100)" />

      {/* Central Ring Geometry */}
      <circle
        cx="100"
        cy="100"
        r="28"
        stroke={color}
        strokeWidth="3"
        fill="none"
      />

      {/* Central 4-Petal Intersecting Arcs (Seed of Life Flower) */}
      <path
        d="M 100 72 A 28 28 0 0 0 100 128"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M 100 72 A 28 28 0 0 1 100 128"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M 72 100 A 28 28 0 0 1 128 100"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M 72 100 A 28 28 0 0 0 128 100"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
      />

      {/* Official UNIO AROMA Brand Typography below emblem if full */}
      {isFull && (
        <text
          x="100"
          y="232"
          textAnchor="middle"
          fill={color}
          fontSize="18"
          fontWeight="700"
          letterSpacing="0.28em"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        >
          UNIO AROMA
        </text>
      )}
    </svg>
  );

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
        {emblemSvg}
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

