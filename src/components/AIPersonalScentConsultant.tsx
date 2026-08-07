import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, X, CheckCircle } from 'lucide-react';
import { ScentConsultationResult } from '../types';

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
 * 完成 → onComplete(result)（父组件将总结发送给感官祭司触发对话）
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

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('scent-questionnaire-data');
      if (saved) setData(JSON.parse(saved));
    } catch (e) { /* ignore */ }
  }, []);

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

  const currentStep = steps[step - 1];

  return (
    <div className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div className="bg-[#0c120e] text-[#f6f2eb] rounded-3xl p-8 max-w-lg w-full border border-[#d2c4ad]/30 shadow-2xl max-h-[88vh] overflow-y-auto">
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
                    className={`p-4 rounded-xl border transition-all ${data[currentStep.field as keyof QuestionnaireData] === opt ? 'bg-[#d2c4ad] text-[#0c120e] border-[#d2c4ad]' : 'bg-white/5 border-white/10 hover:border-[#d2c4ad]'}`}
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
              <button onClick={handleNext} className="bg-[#d2c4ad] text-[#0c120e] px-6 py-2 rounded-xl font-bold">
                {step === steps.length ? '生成建议' : '下一步'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-[#f6f2eb]">
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

            <button onClick={onClose} className="w-full bg-[#d2c4ad] text-[#0c120e] py-3 rounded-xl font-bold">
              确 认
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
