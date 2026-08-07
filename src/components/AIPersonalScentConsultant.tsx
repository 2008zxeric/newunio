import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, X, CheckCircle, Download, Image as ImageIcon, Share2, Heart } from 'lucide-react';
import { ScentConsultationResult } from '../types';
import { useSavedFormulas } from '../hooks/useSavedFormulas';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface QuestionnaireData {
  purpose: string;
  gender: string;
  age: string;
  effect: string;
  scentNote: string;
  environment: string;
  userNote: string;
}

interface Props {
  onComplete: (result: ScentConsultationResult) => void;
  onClose: () => void;
}

/**
 * 高定芳香引导问卷（快速问答入口）：7 步精准测评 + 特殊需求文本域
 * 完成 → 结果卡片（PDF 导出 / 分享海报 / Web Share / 收藏至档案）
 */
export const AIPersonalScentConsultant: React.FC<Props> = ({ onComplete, onClose }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuestionnaireData>({
    purpose: '',
    gender: '',
    age: '',
    effect: '',
    scentNote: '',
    environment: '',
    userNote: '',
  });
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<ScentConsultationResult | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const { savedFormulas, saveFormula, isFormulaSaved } = useSavedFormulas();

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('scent-questionnaire-data');
      if (saved) setData(JSON.parse(saved));
    } catch (e) { /* ignore */ }
  }, []);

  // 检查是否已收藏（固定 id：AI 高定方案）
  useEffect(() => {
    if (result) {
      setIsSaved(isFormulaSaved('AI-PRESCRIPTION'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, savedFormulas]);

  const updateData = (key: keyof QuestionnaireData, value: string) => {
    const newData = { ...data, [key]: value };
    setData(newData);
    try { localStorage.setItem('scent-questionnaire-data', JSON.stringify(newData)); } catch (e) { /* ignore */ }
  };

  const steps = [
    { title: '芳香用途', field: 'purpose', options: ['本人使用', '礼品馈赠'] },
    { title: '性别偏好', field: 'gender', options: ['男士', '女士', '中性'] },
    { title: '年龄范围', field: 'age', options: ['18-25', '26-35', '36-45', '46+'] },
    { title: '期望效果', field: 'effect', options: ['舒缓安神', '专注提升', '愉悦释放'] },
    { title: '香调偏好', field: 'scentNote', options: ['木质调', '花果调', '柑橘调', '东方调'] },
    { title: '使用环境', field: 'environment', options: ['居家放松', '办公商务', '社交聚会'] },
    { title: '特殊需求', field: 'userNote', options: [] }, // Step 7: Notes
  ];

  const handleNext = () => {
    if (step < steps.length) setStep(step + 1);
    else {
      const finalResult: ScentConsultationResult = {
        formulaTitle: `基于 ${data.purpose} 与 ${data.effect} 的定制香氛方案`,
        poeticConcept: `源于 ${data.scentNote} 的感知，契合 ${data.environment} 的生活律动。`,
        recommendedComponents: [
          { series: 'H', code: 'AI-001', name: '檀香', origin: '迈索尔', reason: '安神基底' },
          { series: 'H', code: 'AI-002', name: '岩兰草', origin: '海地', reason: '稳定情绪' },
          { series: 'H', code: 'AI-003', name: '佛手柑', origin: '卡拉布里亚', reason: '愉悦前调' },
        ],
        usageRitual: ['建议在工作间隙或居家静修时使用', '通过扩香机或直接嗅闻'],
        aromatherapistNote: '这是一份根据您的状态精心甄选的高定芳香引导建议。',
        coaBatchNote: '批号：UNIO-AI-2026',
        precautions: ['孕妇慎用', '避光阴凉处保存', '如有不适请停止使用'],
      };
      setResult(finalResult);
      setShowResult(true);

      // Save result to history
      try {
        const savedHistory = localStorage.getItem('unio-consultation-history');
        const history = savedHistory ? JSON.parse(savedHistory) : [];
        history.unshift({ ...finalResult, timestamp: new Date().toISOString() });
        localStorage.setItem('unio-consultation-history', JSON.stringify(history));
      } catch (e) { /* ignore */ }

      onComplete(finalResult);
    }
  };

  /** PDF 导出：html2canvas 截取结果卡片 → jsPDF A4 */
  const exportPDF = async () => {
    if (!resultRef.current || !result) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(resultRef.current, { scale: 2, backgroundColor: '#2c2a26' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, 297));
      pdf.save(`UNIO_高定香气处方_${Date.now()}.pdf`);
    } catch (e) {
      console.error('PDF 导出失败:', e);
    } finally {
      setIsExporting(false);
    }
  };

  /** 分享海报：隐藏品牌模板容器 → html2canvas → PNG 下载 */
  const handleSharePoster = async () => {
    if (!posterRef.current || !result) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(posterRef.current, { scale: 2, backgroundColor: '#2c2a26' });
      const link = document.createElement('a');
      link.download = `UNIO_香气海报_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('海报生成失败:', e);
    } finally {
      setIsExporting(false);
    }
  };

  /** Web Share API：移动端原生分享 */
  const handleShare = async () => {
    if (!result) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'UNIO 高定香气处方',
          text: `我的定制方案：${result.formulaTitle}`,
          url: window.location.href,
        });
      } catch (e) { /* 用户取消 */ }
    } else {
      try {
        await navigator.clipboard.writeText(`${result.formulaTitle} - ${result.poeticConcept}`);
        alert('已复制方案摘要，可粘贴分享给好友');
      } catch (e) { /* ignore */ }
    }
  };

  /** 收藏至我的档案 */
  const handleSave = () => {
    if (!result || isSaved) return;
    saveFormula({
      id: 'AI-PRESCRIPTION',
      title: result.formulaTitle,
      concept: result.poeticConcept,
      components: result.recommendedComponents.map((c) => `${c.name}（${c.reason}·${c.origin}）`),
      blendFormula: result.recommendedComponents.map((c) => c.name).join(' + '),
      carrier: '建议载体见场景建议',
      coaBatch: result.coaBatchNote || 'UNIO-AI-2026',
      aromatherapistNotes: result.aromatherapistNote,
    });
    setIsSaved(true);
  };

  const currentStep = steps[step - 1];

  return (
    <div className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div className="bg-[#2c2a26] text-[#f6f2eb] rounded-3xl p-8 max-w-lg w-full border border-[#d2c4ad]/30 shadow-2xl my-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif text-[#d2c4ad]">{showResult ? '高定芳香建议' : '高定芳香引导'} ({step}/{steps.length})</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        {!showResult ? (
          <div className="space-y-6">
            <p className="text-lg font-serif">{currentStep.title}</p>
            {currentStep.options.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {currentStep.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => updateData(currentStep.field as keyof QuestionnaireData, opt)}
                    className={`p-4 rounded-xl border transition-all ${data[currentStep.field as keyof QuestionnaireData] === opt ? 'bg-[#d2c4ad] text-[#2c2a26] border-[#d2c4ad]' : 'bg-white/5 border-white/10 hover:border-[#d2c4ad]'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <textarea
                value={data.userNote}
                onChange={(e) => updateData('userNote', e.target.value)}
                placeholder="请输入您的具体身心感受或特殊调配需求（选填）..."
                className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#d2c4ad]"
              />
            )}

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(Math.max(1, step - 1))} className="text-gray-400" disabled={step === 1}>返回</button>
              <button onClick={handleNext} className="bg-[#d2c4ad] text-[#2c2a26] px-6 py-2 rounded-xl font-bold">
                {step === steps.length ? '生成建议' : '下一步'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-[#f6f2eb]">
            {/* 结果卡片（PDF 导出区域） */}
            <div ref={resultRef} className="space-y-6">
              <div className="text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-[#d2c4ad] mx-auto" />
                <h3 className="text-xl font-serif text-[#d2c4ad]">{result?.formulaTitle}</h3>
                <p className="text-xs italic text-gray-400">{result?.poeticConcept}</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-[#d2c4ad]/20 space-y-3">
                <h4 className="font-serif text-sm text-[#d2c4ad]">推荐构成</h4>
                <div className="grid grid-cols-1 gap-2">
                  {result?.recommendedComponents.map((comp, idx) => (
                    <div key={idx} className="flex justify-between text-xs border-b border-white/5 pb-1">
                      <span className="font-bold">{comp.name} <span className="font-normal text-gray-400">({comp.reason})</span></span>
                      <span className="text-gray-400">{comp.origin}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 text-xs">
                <div className="space-y-1">
                  <h4 className="font-serif text-[#d2c4ad]">场景建议</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-0.5">
                    {result?.usageRitual.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-sm text-[#d2c4ad]">注意事项</h4>
                <ul className="list-disc list-inside text-xs text-gray-300">
                  {result?.precautions?.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-4 text-center">
                <p className="text-xs italic">{result?.aromatherapistNote}</p>
                <p className="text-[10px] text-gray-500 mt-2">{result?.coaBatchNote}</p>
              </div>
            </div>

            {/* 操作栏：PDF / 海报 / 分享 / 收藏 */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={exportPDF}
                disabled={isExporting}
                className="flex items-center justify-center gap-2 bg-white/10 border border-[#d2c4ad]/30 py-2.5 rounded-xl text-xs font-bold text-[#d2c4ad] hover:bg-[#d2c4ad]/20 disabled:opacity-50 transition-all"
              >
                <Download className="w-4 h-4" /> {isExporting ? '生成中...' : '导出 PDF'}
              </button>
              <button
                onClick={handleSharePoster}
                disabled={isExporting}
                className="flex items-center justify-center gap-2 bg-white/10 border border-[#d2c4ad]/30 py-2.5 rounded-xl text-xs font-bold text-[#d2c4ad] hover:bg-[#d2c4ad]/20 disabled:opacity-50 transition-all"
              >
                <ImageIcon className="w-4 h-4" /> 分享海报
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 bg-white/10 border border-[#d2c4ad]/30 py-2.5 rounded-xl text-xs font-bold text-[#d2c4ad] hover:bg-[#d2c4ad]/20 transition-all"
              >
                <Share2 className="w-4 h-4" /> 分享链接
              </button>
              <button
                onClick={handleSave}
                disabled={isSaved}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${isSaved ? 'bg-[#d2c4ad]/20 text-[#d2c4ad] border border-[#d2c4ad]/40' : 'bg-[#d2c4ad] text-[#2c2a26] hover:bg-[#c5b59c]'}`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#d2c4ad]' : ''}`} /> {isSaved ? '已收藏' : '收藏至档案'}
              </button>
            </div>

            <button onClick={onClose} className="w-full bg-white/5 border border-white/10 text-[#d2c4ad] py-3 rounded-xl font-bold hover:bg-white/10 transition-all">
              确 认
            </button>
          </div>
        )}
      </motion.div>

      {/* 隐藏的品牌海报模板（分享海报用） */}
      {result && (
        <div style={{ position: 'fixed', left: '-9999px', top: 0, width: 750, background: '#2c2a26', padding: 48 }}>
          <div ref={posterRef} style={{ width: 750, background: 'linear-gradient(160deg, #2c2a26 0%, #3a3732 100%)', border: '2px solid rgba(210,196,173,0.4)', borderRadius: 28, padding: 48, color: '#f6f2eb' }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontSize: 40 }}>🪷</div>
              <div style={{ fontSize: 15, letterSpacing: 8, color: '#d2c4ad', fontFamily: 'serif', marginTop: 8 }}>UNIO AROMA · 高定香气处方</div>
            </div>
            <div style={{ fontSize: 24, fontFamily: 'serif', color: '#d2c4ad', textAlign: 'center', marginBottom: 10 }}>{result.formulaTitle}</div>
            <div style={{ fontSize: 13, color: '#b4aca2', textAlign: 'center', fontStyle: 'italic', marginBottom: 24 }}>{result.poeticConcept}</div>
            <div style={{ fontSize: 13, color: '#f6f2eb', marginBottom: 18 }}>
              {result.recommendedComponents.map((c) => (
                <div key={c.code} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <span>{c.name}（{c.reason}）</span>
                  <span style={{ color: '#b4aca2' }}>{c.origin}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: '#b4aca2', lineHeight: 1.8, marginBottom: 18 }}>
              <div style={{ color: '#d2c4ad', marginBottom: 4 }}>▸ 场景建议</div>
              {result.usageRitual.map((r, i) => <div key={i}>{r}</div>)}
              <div style={{ color: '#d2c4ad', marginTop: 10, marginBottom: 4 }}>▸ 注意事项</div>
              {result.precautions?.map((p, i) => <div key={i}>{p}</div>)}
            </div>
            <div style={{ fontSize: 12, fontStyle: 'italic', color: '#b4aca2', textAlign: 'center', marginBottom: 6 }}>{result.aromatherapistNote}</div>
            <div style={{ fontSize: 10, color: '#7a7368', textAlign: 'center' }}>{result.coaBatchNote} · 从极境撷取芳香，因世界元于一息。</div>
          </div>
        </div>
      )}
    </div>
  );
};
