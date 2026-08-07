import React from 'react';
import { UnioLogo } from './UnioLogo';

interface LogoWatermarkProps {
  /** 水印尺寸 */
  size?: number;
  /** 位置：右下角（默认）或居中 */
  position?: 'bottom-right' | 'center';
  /** 透明度（0-1，默认 0.05 淡显） */
  opacity?: number;
  /** 额外类名 */
  className?: string;
}

/**
 * 大块暗色区块的淡 logo 水印（提升专业感）
 * 用法：父容器需 relative + overflow-hidden
 */
export const LogoWatermark: React.FC<LogoWatermarkProps> = ({
  size = 200,
  position = 'bottom-right',
  opacity = 0.05,
  className = '',
}) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={position === 'center'
          ? 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          : 'absolute -right-10 -bottom-10'}
        style={{ opacity }}
      >
        <UnioLogo size={size} color="#d2c4ad" className="rotate-[-8deg]" />
      </div>
    </div>
  );
};
