import React from 'react';

/**
 * 品牌联系信息页脚（打印/导出卡片通用）
 * 三个二维码：客服微信 / 公众号 / 小程序 + 品牌域名
 * 用法：在打印卡面底部渲染 <PrintBrandFooter />（打印时随卡片一起输出）
 */
export const PrintBrandFooter: React.FC<{ dark?: boolean; compact?: boolean }> = ({ dark = false, compact = false }) => {
  const textMain = dark ? '#E8DAC8' : '#1C2E20';
  const textSub = dark ? '#d2c4ad' : '#8C7E6A';
  const qrSize = compact ? 40 : 48;
  const labelSize = compact ? 9 : 10;

  return (
    <div className={`flex items-center justify-between gap-4 ${compact ? 'pt-2' : 'pt-3 mt-1'} border-t border-[#8C7E6A]/20`} style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
      {/* 三个二维码 */}
      <div className="flex items-center gap-2.5">
        {[
          { src: '/wechat-qr.png', label: '客服微信' },
          { src: '/wechat-pub.webp', label: '公众号' },
          { src: '/wechat-miniapp.jpg', label: '小程序' },
        ].map((q) => (
          <div key={q.label} className="flex items-center gap-1">
            <img
              src={q.src}
              alt={q.label}
              style={{ width: qrSize, height: qrSize, borderRadius: 4, objectFit: 'cover' }}
            />
            <span style={{ fontSize: labelSize, color: textSub, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              {q.label}
            </span>
          </div>
        ))}
      </div>
      {/* 域名 */}
      <div className="text-right">
        <div style={{ fontSize: compact ? 8 : 9, color: textMain, fontFamily: 'serif', fontWeight: 700, letterSpacing: '0.08em' }}>
          UNIO AROMA · 元合生香
        </div>
        <div style={{ fontSize: compact ? 8 : 9, color: textSub, fontFamily: 'monospace' }}>
          unioaroma.com
        </div>
      </div>
    </div>
  );
};

export default PrintBrandFooter;
