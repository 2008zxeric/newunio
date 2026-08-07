import React from 'react';
import { Sparkles, FileText } from 'lucide-react';
import { LogoWatermark } from '../LogoWatermark';

interface ConsultationHubProps {
  onStartDeepConsult: () => void;
  onStartQuickConsult: () => void;
}

/** 一人一方频道双向服务入口：高定芳香交互问答（快速即时）+ 深度问诊（专业系统） */
export const ConsultationHub: React.FC<ConsultationHubProps> = ({ onStartDeepConsult, onStartQuickConsult }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        onClick={onStartQuickConsult}
        className="relative bg-[#2c2a26] p-6 rounded-3xl border border-[#d2c4ad]/30 text-left hover:border-[#d2c4ad] transition-all group shadow-xl overflow-hidden"
      >
        <LogoWatermark size={120} opacity={0.05} />
        <Sparkles className="relative w-7 h-7 text-[#d2c4ad] mb-3" />
        <h3 className="text-lg font-serif text-[#d2c4ad] mb-1">高定芳香交互问答</h3>
        <p className="text-xs text-[#b4aca2]">基于即时状态的快速气味指南</p>
      </button>

      <button
        onClick={onStartDeepConsult}
        className="relative bg-[#2c2a26] p-6 rounded-3xl border border-[#d2c4ad]/30 text-left hover:border-[#d2c4ad] transition-all group shadow-xl overflow-hidden"
      >
        <LogoWatermark size={120} opacity={0.05} />
        <FileText className="relative w-7 h-7 text-[#d2c4ad] mb-3" />
        <h3 className="text-lg font-serif text-[#d2c4ad] mb-1">“一人一方”深度问诊</h3>
        <p className="text-xs text-[#b4aca2]">6 步专业评估，精准定制复方</p>
      </button>
    </div>
  );
};
