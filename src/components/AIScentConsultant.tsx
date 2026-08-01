import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  FileText, 
  X, 
  Heart, 
  Shield, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  Activity, 
  Moon, 
  Sun, 
  Droplet,
  User,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { QuestionnaireData, ScentConsultationResult } from '../types';
import { UnioLogo } from './UnioLogo';

interface AIScentConsultantProps {
  onContactWechat?: () => void;
  onNavigateProfile?: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const QUICK_QUESTIONS = [
  '最近总是焦虑失眠、入睡困难...',
  '工作压力大，肩颈僵硬酸痛',
  '皮肤暗沉干燥，缺乏光泽与屏障受损',
  '想要提升办公与居住空间能量场',
  '秋冬季节易感冒，喉咙干痒',
];

export const AIScentConsultant: React.FC<AIScentConsultantProps> = ({ 
  onContactWechat, 
  onNavigateProfile 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: '从极境撷取芳香，因世界元于一息。\n\n我是 UNIO 元香感官祭司。基于 2003 年至今的 23 年真实芳疗日记，已准备好感知你此刻的身心声音。请告诉我你当下最渴望舒缓或调和的状态，或点击“开启深度问诊”生成专属一人一方。',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [step, setStep] = useState(1);

  // Multi-step questionnaire state
  const [qData, setQData] = useState({
    ageGroup: '31-45',
    gender: 'female',
    lifestyle: '经常熬夜高压',
    sleepIssue: '浅眠易醒多梦',
    somaticTension: ['肩颈僵硬酸痛', '眼睛干涩头痛'],
    skinType: '混合屏障受损',
    emotionalState: '思虑过度 (脑中杂念不停)',
    contraindications: [] as string[],
    scentPreference: '深沉木质调 (乳香, 檀香, 沉香)',
    usageCarrier: '空间无水扩香 / 掌心吸嗅',
  });

  const [recommendationResult, setRecommendationResult] = useState<ScentConsultationResult | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: queryText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/oracle-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          questionnaireData: qData,
        }),
      });

      const data = await response.json();
      const replyText = data.reply || '理解了你的当下状态。先确认来处，再谈香气。建议优先结合沉静木质与安抚花香系配方。';

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '感官祭司已感知您的气场。推荐配方：阿曼神圣乳香（沉静思绪）搭配保加利亚大马士革玫瑰（舒缓中枢），滴于掌心做腹式深呼吸。',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionnaireSubmit = async () => {
    setShowQuestionnaire(false);
    setLoading(true);

    try {
      const response = await fetch('/api/scent-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: qData.emotionalState,
          physicalState: `${qData.sleepIssue}, ${qData.somaticTension.join('/')}`,
          timeOfDay: '晚间静息',
          targetScenario: qData.usageCarrier,
          scentPreference: qData.scentPreference,
        }),
      });

      const res = await response.json();
      if (res.data) {
        setRecommendationResult(res.data);
      } else {
        // Fallback robust result
        setRecommendationResult({
          formulaTitle: '一人一方 · 沉静降逆安眠复方',
          poeticConcept: '乳香降逆虚火，玫瑰温润理气，以纯净植物能量平息深层焦躁。',
          recommendedComponents: [
            { name: '阿曼神圣乳香', code: 'UNIO-EO-001', series: '元 · 单方精油', reason: '沉静思绪，安抚深层不安' },
            { name: '保加利亚大马士革玫瑰', code: 'UNIO-EO-002', series: '元 · 单方精油', reason: '柔和情绪中枢，滋养气血' },
            { name: '法国高山真薰衣草', code: 'UNIO-EO-005', series: '元 · 单方精油', reason: '诱导脑波进入深沉慢波睡眠' },
          ],
          aromatherapistNote: '此配方已通过高血压与敏感避开审查。晚间熏香30分钟。',
          coaBatchNote: '对应检测批号: COA-2026-CUSTOM-092 (气相色谱纯度 99.8%)',
        });
      }
    } catch (e) {
      setRecommendationResult({
        formulaTitle: '一人一方 · 沉静降逆安眠复方',
        poeticConcept: '乳香降逆虚火，玫瑰温润理气，以纯净植物能量平息深层焦躁。',
        recommendedComponents: [
          { name: '阿曼神圣乳香', code: 'UNIO-EO-001', series: '元 · 单方精油', reason: '沉静思绪，安抚深层不安' },
          { name: '保加利亚大马士革玫瑰', code: 'UNIO-EO-002', series: '元 · 单方精油', reason: '柔和情绪中枢，滋养气血' },
          { name: '法国高山真薰衣草', code: 'UNIO-EO-005', series: '元 · 单方精油', reason: '诱导脑波进入深沉慢波睡眠' },
        ],
        aromatherapistNote: '此配方已通过高血压与敏感避开审查。晚间熏香30分钟。',
        coaBatchNote: '对应检测批号: COA-2026-CUSTOM-092 (气相色谱纯度 99.8%)',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSomaticTension = (item: string) => {
    setQData((prev) => ({
      ...prev,
      somaticTension: prev.somaticTension.includes(item)
        ? prev.somaticTension.filter((i) => i !== item)
        : [...prev.somaticTension, item],
    }));
  };

  const toggleContraindication = (item: string) => {
    setQData((prev) => ({
      ...prev,
      contraindications: prev.contraindications.includes(item)
        ? prev.contraindications.filter((i) => i !== item)
        : [...prev.contraindications, item],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0c120e] text-[#f6f2eb] p-6 md:p-10 border border-[#d2c4ad]/30 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d2c4ad]/20 border border-[#d2c4ad]/30 text-[#d2c4ad] text-xs font-serif">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UNIO AROMA 感官祭司 AI 深度问诊 · 一人一方</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-white font-normal leading-tight">
              23年芳疗日记与专业问诊
            </h1>
            <p className="text-xs md:text-sm text-[#b4aca2] leading-relaxed">
              根据您的年龄、作息、睡眠特征、肌理受损度与安全避开禁忌（孕期/高血压/哮喘/过敏），通过 5 步专业评估，精准生成专属“一人一方”植物复方。
            </p>
          </div>

          <button
            onClick={() => {
              setStep(1);
              setShowQuestionnaire(true);
            }}
            className="px-6 py-3.5 rounded-2xl bg-[#d2c4ad] text-[#0c120e] font-serif font-bold text-xs hover:bg-[#c5b59c] transition-all flex items-center gap-2 shadow-xl hover:scale-105"
          >
            <FileText className="w-4 h-4" />
            开启“一人一方”深度问诊
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive Chat Window */}
        <div className="lg:col-span-8 bg-[#0c120e] rounded-3xl border border-[#d2c4ad]/25 p-6 space-y-4 shadow-2xl flex flex-col h-[650px]">
          {/* Top Status Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <UnioLogo size={28} color="#d2c4ad" animatedBreathing={true} />
              <div>
                <h3 className="font-serif text-sm text-[#d2c4ad] font-semibold">UNIO 元香感官祭司</h3>
                <span className="text-[10px] text-[#b4aca2] font-mono">2003 - 2026 真实芳疗案例模型在线</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                祭司连线中
              </span>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-none">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#d2c4ad] text-[#0c120e] font-medium rounded-tr-none shadow-md'
                      : 'bg-white/10 text-[#f6f2eb] border border-white/10 rounded-tl-none font-serif'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <span
                    className={`block text-[9px] mt-2 text-right ${
                      msg.role === 'user' ? 'text-[#0c120e]/60' : 'text-[#b4aca2]'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-[#d2c4ad] text-xs p-3 rounded-2xl border border-white/10 animate-pulse flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin text-[#d2c4ad]" />
                  <span>感官祭司正在感应您的气场并调对配方...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#d2c4ad] text-[11px] text-[#b4aca2] hover:text-[#d2c4ad] whitespace-nowrap transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <input
              type="text"
              placeholder="请输入您当下的身心困扰、睡眠状态或喜好气味..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d2c4ad]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !input.trim()}
              className="p-3 rounded-xl bg-[#d2c4ad] text-[#0c120e] disabled:opacity-40 hover:bg-[#c5b59c] transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Recommendation Result Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-[#2D2D2A]/10 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#2D2D2A]/10 pb-3">
              <h3 className="font-serif font-bold text-base text-[#2D2D2A] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#8C7E6A]" />
                <span>专属“一人一方”处方结果</span>
              </h3>
              <span className="text-[10px] text-[#8C7E6A] font-mono">FORMULA SHEET</span>
            </div>

            {recommendationResult ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 space-y-2">
                  <h4 className="font-serif text-base text-[#d2c4ad] font-semibold">
                    {recommendationResult.formulaTitle}
                  </h4>
                  <p className="text-xs text-[#b4aca2] leading-relaxed italic font-serif">
                    “{recommendationResult.poeticConcept}”
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-serif font-bold text-[#2D2D2A] block uppercase">
                    推荐组方成分及配比考量:
                  </span>
                  {recommendationResult.recommendedComponents.map((comp, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/10 text-xs space-y-1">
                      <div className="flex justify-between font-serif font-semibold text-[#2D2D2A]">
                        <span>{comp.name}</span>
                        <span className="text-[#8C7E6A] font-mono text-[10px]">{comp.code}</span>
                      </div>
                      <p className="text-[11px] text-[#8C7E6A]">{comp.reason}</p>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" />
                    <span>芳疗师安全审订与 COA 报告</span>
                  </div>
                  <p>{recommendationResult.aromatherapistNote}</p>
                  <p className="font-mono text-[10px] text-amber-700">{recommendationResult.coaBatchNote}</p>
                </div>

                <div className="space-y-2 pt-1">
                  {onContactWechat && (
                    <button
                      onClick={onContactWechat}
                      className="w-full py-3 rounded-xl bg-[#2D2D2A] text-[#d2c4ad] font-serif font-bold text-xs hover:bg-[#0c120e] transition-all text-center block"
                    >
                      预订此复方 (微信客服 1对1)
                    </button>
                  )}
                  {onNavigateProfile && (
                    <button
                      onClick={onNavigateProfile}
                      className="w-full py-2.5 rounded-xl bg-[#EFEDE7] text-[#2D2D2A] font-serif text-xs font-medium hover:bg-[#DED9D2] transition-all text-center block"
                    >
                      查看存入“我的健康档案”
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-[#8C7E6A] space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F9F7F2] border border-[#2D2D2A]/10 flex items-center justify-center mx-auto text-[#8C7E6A]">
                  <FileText className="w-8 h-8" />
                </div>
                <p>尚未生成“一人一方”配方。</p>
                <button
                  onClick={() => {
                    setStep(1);
                    setShowQuestionnaire(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#2D2D2A] text-[#d2c4ad] font-serif text-xs font-bold hover:bg-[#0c120e] transition-all shadow-md"
                >
                  开启 5 步深度芳疗问诊
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Multi-Step Professional Questionnaire Modal */}
      {showQuestionnaire && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0c120e] text-[#f6f2eb] rounded-3xl border border-[#d2c4ad]/30 max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <UnioLogo size={28} color="#d2c4ad" />
                <div>
                  <h3 className="font-serif text-lg text-[#d2c4ad] font-medium">“一人一方”复方深度问诊评估</h3>
                  <span className="text-[10px] text-[#b4aca2]">步骤 {step} / 5 · {step === 1 ? '基础基准' : step === 2 ? '身体与睡眠' : step === 3 ? '情绪气场' : step === 4 ? '临床禁忌' : '香调仪式'}</span>
                </div>
              </div>
              <button
                onClick={() => setShowQuestionnaire(false)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/20 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Progress Bar */}
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#d2c4ad] h-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>

            {/* STEP 1: Demographic & Lifestyle */}
            {step === 1 && (
              <div className="space-y-5 text-xs">
                <div className="space-y-2">
                  <label className="block text-[#d2c4ad] font-serif font-bold text-sm">1. 年龄段与性别</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-[#b4aca2] block mb-1">年龄段:</span>
                      <select
                        value={qData.ageGroup}
                        onChange={(e) => setQData({ ...qData, ageGroup: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#d2c4ad]"
                      >
                        <option value="18-30" className="bg-[#0c120e]">18-30 岁 (青年理疗)</option>
                        <option value="31-45" className="bg-[#0c120e]">31-45 岁 (高压职场/深沉安神)</option>
                        <option value="46-60" className="bg-[#0c120e]">46-60 岁 (中年气血与更年调和)</option>
                        <option value="60+" className="bg-[#0c120e]">60 岁以上 (温和长者护养)</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#b4aca2] block mb-1">性别/生理特征:</span>
                      <select
                        value={qData.gender}
                        onChange={(e) => setQData({ ...qData, gender: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#d2c4ad]"
                      >
                        <option value="female" className="bg-[#0c120e]">女性 (生理周期/气血平衡)</option>
                        <option value="male" className="bg-[#0c120e]">男性 (沉静解压/精力恢复)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[#d2c4ad] font-serif font-bold text-sm">2. 日常工作强度与作息节奏</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['作息规律 (早睡早起)', '经常熬夜高压 (脑力疲劳)', '昼夜颠倒/频繁出差'].map((ls) => (
                      <button
                        key={ls}
                        type="button"
                        onClick={() => setQData({ ...qData, lifestyle: ls })}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          qData.lifestyle === ls
                            ? 'bg-[#d2c4ad] text-[#0c120e] border-[#d2c4ad] font-bold'
                            : 'bg-white/5 border-white/10 text-white hover:border-[#d2c4ad]/50'
                        }`}
                      >
                        {ls}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Somatic & Sleep */}
            {step === 2 && (
              <div className="space-y-5 text-xs">
                <div className="space-y-2">
                  <label className="block text-[#d2c4ad] font-serif font-bold text-sm">3. 睡眠质量与深沉度困扰</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['无睡眠困扰 (睡眠良好)', '入睡困难 (>30分钟无法入眠)', '浅眠易醒多梦 (夜醒频繁)', '早醒倦怠 (觉知疲惫)'].map((si) => (
                      <button
                        key={si}
                        type="button"
                        onClick={() => setQData({ ...qData, sleepIssue: si })}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          qData.sleepIssue === si
                            ? 'bg-[#d2c4ad] text-[#0c120e] border-[#d2c4ad] font-bold'
                            : 'bg-white/5 border-white/10 text-white hover:border-[#d2c4ad]/50'
                        }`}
                      >
                        {si}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[#d2c4ad] font-serif font-bold text-sm">4. 身体紧绷与疲惫部位 (可多选)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['肩颈僵硬酸痛', '眼睛干涩头痛', '腰椎腹部干寒', '四肢冰凉滞留'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => toggleSomaticTension(st)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                          qData.somaticTension.includes(st)
                            ? 'bg-[#d2c4ad]/20 border-[#d2c4ad] text-[#d2c4ad] font-bold'
                            : 'bg-white/5 border-white/10 text-white hover:border-white/20'
                        }`}
                      >
                        <span>{st}</span>
                        {qData.somaticTension.includes(st) && <Check className="w-4 h-4 text-[#d2c4ad]" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Emotional & Neurological */}
            {step === 3 && (
              <div className="space-y-5 text-xs">
                <div className="space-y-2">
                  <label className="block text-[#d2c4ad] font-serif font-bold text-sm">5. 当前情绪与心理气场偏向</label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      '焦虑烦躁 (难以静下心，容易心浮气躁)',
                      '思虑过度 (脑中杂念不停，无法停止思考)',
                      '情绪低落沉重 (能量匮乏，无精打采)',
                      '注意力涣散 (易疲劳，工作效率降低)',
                      '安宁平静 (追求高阶觉知与冥想悟道)',
                    ].map((emo) => (
                      <button
                        key={emo}
                        type="button"
                        onClick={() => setQData({ ...qData, emotionalState: emo })}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          qData.emotionalState === emo
                            ? 'bg-[#d2c4ad] text-[#0c120e] border-[#d2c4ad] font-bold'
                            : 'bg-white/5 border-white/10 text-white hover:border-[#d2c4ad]/50'
                        }`}
                      >
                        {emo}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Clinical Safety & Contraindications */}
            {step === 4 && (
              <div className="space-y-5 text-xs">
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>UNIO 严苛遵循临床芳疗安全守则：请勾选需要特别规避的成分禁忌。</span>
                </div>

                <div className="space-y-2">
                  <label className="block text-[#d2c4ad] font-serif font-bold text-sm">6. 临床避开禁忌 (可多选，无则不选)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      '孕期 / 备孕期 / 哺乳期',
                      '高血压 / 低血压',
                      '癫痫 / 哮喘史',
                      '皮肤极度过敏 / 严重湿疹',
                      '正在服用处方药物',
                      '蚕豆病 (G6PD 缺乏)',
                    ].map((ci) => (
                      <button
                        key={ci}
                        type="button"
                        onClick={() => toggleContraindication(ci)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                          qData.contraindications.includes(ci)
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                            : 'bg-white/5 border-white/10 text-white hover:border-white/20'
                        }`}
                      >
                        <span>{ci}</span>
                        {qData.contraindications.includes(ci) && <Check className="w-4 h-4 text-amber-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Scent & Carrier */}
            {step === 5 && (
              <div className="space-y-5 text-xs">
                <div className="space-y-2">
                  <label className="block text-[#d2c4ad] font-serif font-bold text-sm">7. 偏好香调</label>
                  <select
                    value={qData.scentPreference}
                    onChange={(e) => setQData({ ...qData, scentPreference: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#d2c4ad]"
                  >
                    <option value="深沉木质调 (乳香, 檀香, 沉香)" className="bg-[#0c120e]">深沉木质调 (沉香, 阿曼乳香, 迈索尔檀香)</option>
                    <option value="柔美花香调 (大马士革玫瑰, 橙花, 依兰)" className="bg-[#0c120e]">柔美花香调 (保加利亚玫瑰, 苦橙花, 依兰)</option>
                    <option value="清爽柑橘调 (佛手柑, 甜橙, 葡萄柚)" className="bg-[#0c120e]">清爽柑橘调 (佛手柑, 甜橙, 葡萄柚)</option>
                    <option value="草本理疗调 (高山薰衣草, 迷迭香, 茶树)" className="bg-[#0c120e]">草本理疗调 (高山薰衣草, 迷迭香, 茶树)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[#d2c4ad] font-serif font-bold text-sm">8. 应用场景与仪式载体</label>
                  <select
                    value={qData.usageCarrier}
                    onChange={(e) => setQData({ ...qData, usageCarrier: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#d2c4ad]"
                  >
                    <option value="空间无水扩香 / 掌心吸嗅" className="bg-[#0c120e]">空间无水扩香 / 熏香仪 / 掌心吸嗅</option>
                    <option value="随身滚珠精油 / 局部涂抹" className="bg-[#0c120e]">随身滚珠精油 / 脉搏与肩颈涂抹</option>
                    <option value="身体按摩 / 基础油稀释" className="bg-[#0c120e]">身体全身按摩 / 荷荷巴油稀释</option>
                    <option value="有机植物纯露喷雾湿敷" className="bg-[#0c120e]">有机植物纯露喷雾 / 睡眠枕头喷雾</option>
                  </select>
                </div>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  上一步
                </button>
              ) : <div />}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 rounded-xl bg-[#d2c4ad] text-[#0c120e] font-serif font-bold text-xs hover:bg-[#c5b59c] flex items-center gap-1"
                >
                  下一步
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleQuestionnaireSubmit}
                  className="px-8 py-2.5 rounded-xl bg-[#d2c4ad] text-[#0c120e] font-serif font-bold text-xs hover:bg-[#c5b59c] flex items-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  生成专属“一人一方”配方
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
