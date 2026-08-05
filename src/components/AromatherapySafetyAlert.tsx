import React from 'react';
import { ShieldAlert, Baby, Sun, AlertTriangle, TestTube, Info, CheckCircle2, ShieldCheck, Sparkles, Droplet, FlaskConical } from 'lucide-react';
import { ProductItem } from '../types';
import { getProductTypeSafetyNotice } from '../utils/productSafetyUtils';

export interface SafetyProfile {
  isPhotosensitive: boolean;
  photosensitivityText: string;
  pregnancyStatus: string;
  pregnancyBadgeColor: string;
  pregnancyDesc: string;
  allergens: string[];
  skinPatchDirective: string;
  maxFacialConc: string;
}

interface AromatherapySafetyAlertProps {
  product: ProductItem;
  safetyProfile: SafetyProfile;
}

export const AromatherapySafetyAlert: React.FC<AromatherapySafetyAlertProps> = ({
  product,
  safetyProfile,
}) => {
  const typeNotice = getProductTypeSafetyNotice(product);

  return (
    <div className="p-5 rounded-3xl bg-[#0F1712] text-[#E8DAC8] space-y-4 shadow-xl border border-[#D97706]/40 relative overflow-hidden">
      {/* Background Radial Light Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#D97706]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#D97706]/20 text-[#F59E0B] border border-[#D97706]/40 shadow-xs">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-base font-bold text-[#E8DAC8] flex items-center gap-2">
              <span>芳疗安全使用与成分禁忌预警</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#D97706]/20 text-[#F59E0B] text-[10px] font-mono font-bold border border-[#D97706]/30">
                SAFETY ADVISORY
              </span>
            </h4>
            <p className="text-xs text-[#E8DAC8]/70 font-sans mt-0.5">
              根据【{product.cn}】GC-MS 活性成分天然分型，国际芳疗协会 (IFA) 及 EU REACH 规程风险披露
            </p>
          </div>
        </div>

        {/* Safe Concentration Badge */}
        <div className="p-2 px-3 rounded-xl bg-black/40 border border-white/10 text-right shrink-0">
          <span className="text-[10px] text-[#C5B49A] font-mono block">面部建议浓度上限</span>
          <span className="font-mono font-bold text-xs text-[#F59E0B]">{safetyProfile.maxFacialConc}</span>
        </div>
      </div>

      {/* Series / Type Notice Banner */}
      <div className="p-4 rounded-2xl bg-black/50 border border-[#D97706]/40 text-xs space-y-2 relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-[#F59E0B] font-serif font-bold text-xs sm:text-sm">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{typeNotice.title}</span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-[#D97706]/20 text-[#F59E0B] text-[10px] font-mono font-bold border border-[#D97706]/30">
            {typeNotice.badgeText}
          </span>
        </div>
        <p className="text-[#E8DAC8]/90 text-[11px] sm:text-xs leading-relaxed font-sans">
          {typeNotice.statement}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/10">
          {typeNotice.highlights.map((item, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-[#E8DAC8]/90">
              ✓ {item}
            </span>
          ))}
        </div>
      </div>

      {/* Safety Tags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10">
        
        {/* 1. Pregnancy & Nursing Warning Tag */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5 flex flex-col justify-between hover:border-[#F59E0B]/40 transition-colors">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-[#E8DAC8] flex items-center gap-1.5">
                <Baby className="w-4 h-4 text-[#F59E0B]" />
                <span>孕期与哺乳期禁忌</span>
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${safetyProfile.pregnancyBadgeColor}`}>
                {safetyProfile.pregnancyStatus}
              </span>
            </div>
            <p className="text-xs text-[#E8DAC8]/80 leading-relaxed font-sans">
              {safetyProfile.pregnancyDesc}
            </p>
          </div>
          <div className="pt-2 border-t border-white/10 text-[10px] text-[#C5B49A] font-mono flex items-center gap-1">
            <Info className="w-3 h-3 text-[#F59E0B]" />
            <span>通经与宫缩风险等级认证</span>
          </div>
        </div>

        {/* 2. Photosensitivity Warning Tag */}
        <div className={`p-4 rounded-2xl bg-black/40 border space-y-2.5 flex flex-col justify-between transition-colors ${
          safetyProfile.isPhotosensitive ? 'border-amber-500/50 hover:border-amber-400' : 'border-white/10 hover:border-emerald-500/30'
        }`}>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-[#E8DAC8] flex items-center gap-1.5">
                <Sun className={`w-4 h-4 ${safetyProfile.isPhotosensitive ? 'text-amber-400' : 'text-emerald-400'}`} />
                <span>日光光敏性预警</span>
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                safetyProfile.isPhotosensitive 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}>
                {safetyProfile.isPhotosensitive ? '含日光光敏成分' : '无光敏风险'}
              </span>
            </div>
            <p className="text-xs text-[#E8DAC8]/80 leading-relaxed font-sans">
              {safetyProfile.photosensitivityText}
            </p>
          </div>
          <div className="pt-2 border-t border-white/10 text-[10px] text-[#C5B49A] font-mono flex items-center gap-1">
            {safetyProfile.isPhotosensitive ? (
              <AlertTriangle className="w-3 h-3 text-amber-400" />
            ) : (
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            )}
            <span>{safetyProfile.isPhotosensitive ? '涂抹后12小时内需严格避光' : '日间可搭配基础油正常使用'}</span>
          </div>
        </div>

        {/* 3. Natural Allergens Warning Tag */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5 flex flex-col justify-between hover:border-[#C5B49A]/40 transition-colors">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-[#E8DAC8] flex items-center gap-1.5">
                <TestTube className="w-4 h-4 text-[#C5B49A]" />
                <span>天然过敏源披露 (EU Allergens)</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#C5B49A]/20 text-[#C5B49A] border border-[#C5B49A]/30">
                {safetyProfile.allergens.length} 项活性成分
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {safetyProfile.allergens.map((allergen, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#FAF8F5]/10 border border-white/15 text-[11px] text-[#E8DAC8] font-mono"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t border-white/10 text-[10px] text-[#C5B49A] font-mono flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#C5B49A]" />
            <span>大面积使用前作 24h 手臂内侧皮试</span>
          </div>
        </div>

      </div>

      {/* Skin Patch Directive Footer Banner */}
      <div className="p-3 rounded-2xl bg-[#1C2E20]/80 border border-[#C5B49A]/30 flex items-center gap-2.5 text-xs text-[#E8DAC8]/90 font-sans relative z-10">
        <Droplet className="w-4 h-4 text-[#C5B49A] shrink-0" />
        <p className="leading-snug text-[11px]">
          <strong className="text-[#C5B49A] font-serif font-bold">【24小时皮肤过敏测试规程】：</strong>
          {safetyProfile.skinPatchDirective}
        </p>
      </div>
    </div>
  );
};
