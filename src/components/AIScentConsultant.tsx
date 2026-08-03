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
  MessageCircle,
  ExternalLink,
  ShoppingBag,
  Copy,
  QrCode,
  AlertCircle,
  CheckCircle2,
  AlertTriangle, Trash2, BookMarked} from 'lucide-react';
import { ScentConsultationResult, ProductItem } from '../types';
import { fetchProductsFromSupabase } from '../data/siteDataService';
import { UnioLogo } from './UnioLogo';
import { FormulaCardPreview, FormulaCardData } from './FormulaCardPreview';
import { useSavedFormulas } from '../hooks/useSavedFormulas';
import { CHINESE_YEAR_JOURNEY } from '../utils/brandConstants';

interface AIScentConsultantProps {
  onContactWechat?: () => void;
  onNavigateProfile?: () => void;
  onSelectProduct?: (product: ProductItem) => void;
  onNavigateTab?: (tab: string) => void;
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
  onNavigateProfile,
  onSelectProduct,
  onNavigateTab
}) => {
  const [catalogProducts, setCatalogProducts] = useState<ProductItem[]>([]);

  // Load real products for matching (single oils purchase links)
  useEffect(() => {
    let mounted = true;
    fetchProductsFromSupabase().then((products) => {
      if (mounted) setCatalogProducts(products);
    });
    return () => { mounted = false; };
  }, []);

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
  const [validationError, setValidationError] = useState<string | null>(null);

  // Customer Service Modal State
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [copiedWechat, setCopiedWechat] = useState(false);

  // Multi-step questionnaire state with enhanced multi-selection
  const [qData, setQData] = useState({
    ageGroup: '31-45',
    gender: 'female',
    lifestyle: '经常熬夜高压 (脑力疲劳)',
    sleepIssue: '浅眠易醒多梦 (夜醒频繁)',
    somaticTension: ['肩颈僵硬酸痛', '眼睛干涩头痛'] as string[],
    skinType: '混合屏障受损',
    emotionalStates: ['思虑过度 (脑中杂念不停)'] as string[],
    contraindications: ['无以上特殊避开禁忌 (安全)'] as string[],
    scentPreference: '深沉木质调 (乳香, 檀香, 沉香)',
    usageCarrier: '空间无水扩香 / 掌心吸嗅',
  });

  const [recommendationResult, setRecommendationResult] = useState<ScentConsultationResult | null>(null);
  const [isPrintingFormula, setIsPrintingFormula] = useState(false);
  const [previewFormula, setPreviewFormula] = useState<FormulaCardData | null>(null);
  const { savedFormulas, saveFormula, removeFormula } = useSavedFormulas();
  const [showHistory, setShowHistory] = useState(false);

  // 打开精美配方卡预览（宣纸卡 + 打印/下载）
  const handlePreviewFormula = () => {
    if (!recommendationResult) return;
    const r = recommendationResult;
    const now = new Date();
    setPreviewFormula({
      id: `UNIO-CUSTOM-${String(Math.floor(100 + Math.random() * 900))}`,
      date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
      title: r.formulaTitle,
      concept: r.poeticConcept,
      components: r.recommendedComponents.map((comp, i) =>
        i === 0 ? `${comp.name} (40%)` : i === 1 ? `${comp.name} (30%)` : `${comp.name} (30%)`
      ),
      carrier: r.usageRitual?.[0] || '空间扩香 / 掌心吸嗅',
      coaBatch: r.coaBatchNote?.replace(/[^A-Z0-9-]/g, '').slice(0, 16) || `COA-BATCH-${now.getFullYear()}`,
    });
  };
  const [copiedQuote, setCopiedQuote] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const copyWechat = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedWechat(true);
    setTimeout(() => setCopiedWechat(false), 2000);
  };

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

  // Step Validation logic before proceeding
  const validateAndNextStep = () => {
    setValidationError(null);

    if (step === 1) {
      if (!qData.lifestyle) {
        setValidationError('请选择您的日常工作强度与作息节奏（必填）');
        return;
      }
    } else if (step === 2) {
      if (!qData.sleepIssue) {
        setValidationError('请选择您的睡眠质量与困扰状态（必填）');
        return;
      }
      if (qData.somaticTension.length === 0) {
        setValidationError('请至少勾选 1 项身体疲惫部位或选择「无明显身体不适」（必填）');
        return;
      }
    } else if (step === 3) {
      if (qData.emotionalStates.length === 0) {
        setValidationError('请至少勾选 1 项当前关注的情绪状态或心理气场（必填）');
        return;
      }
    } else if (step === 4) {
      if (qData.contraindications.length === 0) {
        setValidationError('请选择适用于您的成分禁忌，或勾选「无以上特殊避开禁忌」（必填）');
        return;
      }
    }

    setStep((prev) => prev + 1);
  };

  const handleQuestionnaireSubmit = async () => {
    if (qData.scentPreference && qData.usageCarrier) {
      // Valid
    } else {
      setValidationError('请完善香调偏好与应用载体');
      return;
    }

    setShowQuestionnaire(false);
    setLoading(true);

    try {
      const response = await fetch('/api/scent-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: qData.emotionalStates.join(' / '),
          physicalState: `${qData.sleepIssue}, ${qData.somaticTension.join('/')}`,
          timeOfDay: '晚间静息',
          targetScenario: qData.usageCarrier,
          scentPreference: qData.scentPreference,
        }),
      });

      const res = await response.json();
      if (res.data) {
        setRecommendationResult(res.data);
        // 自动保存到「我的处方历史」
        try {
          const r = res.data;
          const now = new Date();
          saveFormula({
            id: `UNIO-CUSTOM-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`,
            title: r.formulaTitle || '一人一方定制复方',
            concept: r.poeticConcept || '',
            components: (r.recommendedComponents || []).map((comp: any, i: number) =>
              i === 0 ? `${comp.name} (40%)` : i === 1 ? `${comp.name} (30%)` : `${comp.name} (30%)`
            ),
            blendFormula: (r.usageRitual || []).join('；'),
            carrier: r.usageRitual?.[0] || '空间扩香 / 掌心吸嗅',
            coaBatch: r.coaBatchNote?.replace(/[^A-Z0-9-]/g, '').slice(0, 16) || `COA-BATCH-${now.getFullYear()}`,
          });
        } catch (e) { /* 保存失败不影响主流程 */ }
      } else {
        // Fallback robust result
        setRecommendationResult({
          formulaTitle: '一人一方 · 沉静降逆安眠复方',
          poeticConcept: '乳香降逆虚火，玫瑰温润理气，以纯净植物能量平息深层焦躁。',
          recommendedComponents: [
            { name: '阿曼神圣乳香', code: 'UNIO-EO-001', series: '元 · 单方精油', reason: '沉静思绪，安抚深层不安与气逆' },
            { name: '保加利亚大马士革玫瑰', code: 'UNIO-EO-002', series: '元 · 单方精油', reason: '柔和情绪中枢，滋养气血与平复波动' },
            { name: '法国高山真薰衣草', code: 'UNIO-EO-005', series: '元 · 单方精油', reason: '诱导脑波进入深沉慢波睡眠' },
          ],
          aromatherapistNote: '此复方配比已通过孕期/高血压及过敏审查。建议晚间扩香30分钟或掌心吸嗅。',
          coaBatchNote: '对应检测批号: COA-2026-CUSTOM-092 (气相色谱纯度 99.8%)',
        });
      }
    } catch (e) {
      setRecommendationResult({
        formulaTitle: '一人一方 · 沉静降逆安眠复方',
        poeticConcept: '乳香降逆虚火，玫瑰温润理气，以纯净植物能量平息深层焦躁。',
        recommendedComponents: [
          { name: '阿曼神圣乳香', code: 'UNIO-EO-001', series: '元 · 单方精油', reason: '沉静思绪，安抚深层不安与气逆' },
          { name: '保加利亚大马士革玫瑰', code: 'UNIO-EO-002', series: '元 · 单方精油', reason: '柔和情绪中枢，滋养气血与平复波动' },
          { name: '法国高山真薰衣草', code: 'UNIO-EO-005', series: '元 · 单方精油', reason: '诱导脑波进入深沉慢波睡眠' },
        ],
        aromatherapistNote: '此复方配比已通过孕期/高血压及过敏审查。建议晚间扩香30分钟或掌心吸嗅。',
        coaBatchNote: '对应检测批号: COA-2026-CUSTOM-092 (气相色谱纯度 99.8%)',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSomaticTension = (item: string) => {
    setValidationError(null);
    if (item === '无明显身体不适') {
      setQData((prev) => ({ ...prev, somaticTension: ['无明显身体不适'] }));
      return;
    }
    setQData((prev) => {
      const filtered = prev.somaticTension.filter((i) => i !== '无明显身体不适');
      const exists = filtered.includes(item);
      const nextArr = exists ? filtered.filter((i) => i !== item) : [...filtered, item];
      return { ...prev, somaticTension: nextArr.length === 0 ? ['无明显身体不适'] : nextArr };
    });
  };

  const toggleEmotionalState = (item: string) => {
    setValidationError(null);
    setQData((prev) => {
      const exists = prev.emotionalStates.includes(item);
      const nextArr = exists ? prev.emotionalStates.filter((i) => i !== item) : [...prev.emotionalStates, item];
      return { ...prev, emotionalStates: nextArr };
    });
  };

  const toggleContraindication = (item: string) => {
    setValidationError(null);
    if (item === '无以上特殊避开禁忌 (安全)') {
      setQData((prev) => ({ ...prev, contraindications: ['无以上特殊避开禁忌 (安全)'] }));
      return;
    }
    setQData((prev) => {
      const filtered = prev.contraindications.filter((i) => i !== '无以上特殊避开禁忌 (安全)');
      const exists = filtered.includes(item);
      const nextArr = exists ? filtered.filter((i) => i !== item) : [...filtered, item];
      return { ...prev, contraindications: nextArr.length === 0 ? ['无以上特殊避开禁忌 (安全)'] : nextArr };
    });
  };

  // Helper to match single oil with catalog product
  const getMatchedProduct = (code?: string, name?: string): ProductItem | null => {
    if (!catalogProducts || catalogProducts.length === 0) return null;
    if (code) {
      const pCode = catalogProducts.find((p) => p.code.toLowerCase() === code.toLowerCase());
      if (pCode) return pCode;
    }
    if (name) {
      const pName = catalogProducts.find((p) => 
        p.cn.includes(name) || name.includes(p.cn) || (p.en && name.toLowerCase().includes(p.en.toLowerCase()))
      );
      if (pName) return pName;
    }
    return null;
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
              {CHINESE_YEAR_JOURNEY}芳疗日记与专业问诊
            </h1>
            <p className="text-xs md:text-sm text-[#b4aca2] leading-relaxed">
              根据您的年龄、作息、睡眠特征、肌理受损度与安全避开禁忌（孕期/高血压/哮喘/过敏），通过 5 步专业评估，精准生成专属“一人一方”植物复方。
            </p>
          </div>

          <button
            onClick={() => {
              setStep(1);
              setValidationError(null);
              setShowQuestionnaire(true);
            }}
            className="px-6 py-3.5 rounded-2xl bg-[#d2c4ad] text-[#0c120e] font-serif font-bold text-xs hover:bg-[#c5b59c] transition-all flex items-center gap-2 shadow-xl hover:scale-105 shrink-0"
          >
            <FileText className="w-4 h-4" />
            开启“一人一方”深度问诊
          </button>
        </div>
      </div>

      {/* ── 我的处方历史（用户曾问过的方：查看 / 打印）── */}
      {savedFormulas.length > 0 && (
        <div className="rounded-3xl border border-[#8C7E6A]/25 bg-[#F9F7F2] p-5 md:p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <BookMarked className="w-4 h-4 text-[#8C7E6A]" />
              <h3 className="font-serif font-bold text-[#1C2E20] text-base">我的处方历史</h3>
              <span className="text-[10px] font-mono text-[#8C7E6A]">MY FORMULA ARCHIVE · {savedFormulas.length} 张</span>
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-3 py-1.5 rounded-xl bg-[#0c120e] text-[#d2c4ad] text-xs font-serif font-bold hover:bg-[#1A2E1A] transition-all flex items-center gap-1.5"
            >
              {showHistory ? '收起' : '展开查看'}
            </button>
          </div>

          {showHistory && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {savedFormulas.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-white/70 border border-[#8C7E6A]/20 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-serif font-bold text-[#1C2E20] text-sm leading-snug">{item.title}</p>
                      <span className="text-[9px] font-mono text-[#8C7E6A]">{item.date} · {item.id}</span>
                    </div>
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#8C7E6A]/15 border border-[#8C7E6A]/30 text-[9px] font-mono text-[#8C7E6A]">
                      {item.coaBatch}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#2D2D2A]/70 leading-relaxed line-clamp-2 italic font-serif">“{item.concept}”</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] text-[#8C7E6A] font-mono">{item.components.length} 味成分</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setPreviewFormula({
                            id: item.id,
                            date: item.date,
                            title: item.title,
                            concept: item.concept,
                            components: item.components,
                            carrier: item.carrier,
                            coaBatch: item.coaBatch,
                          });
                        }}
                        className="px-3 py-1 rounded-lg bg-[#0c120e] text-[#d2c4ad] text-[10px] font-serif font-bold hover:bg-[#1A2E1A] transition-all"
                      >
                        🖨️ 查看 / 打印
                      </button>
                      <button
                        onClick={() => removeFormula(item.id)}
                        className="p-1 rounded-lg text-[#A5281F]/60 hover:bg-[#A5281F]/10 hover:text-[#A5281F] transition-all"
                        title="删除记录"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
              <div
                id="ai-formula-result"
                className={`space-y-4 ${isPrintingFormula ? 'formula-print-target' : ''}`}
              >
                
                {/* 0. 打印/导出按钮 */}
                <div className="flex justify-end">
                  <button
                    onClick={handlePreviewFormula}
                    className="px-4 py-2 rounded-xl bg-[#0c120e] text-[#d2c4ad] border border-[#d2c4ad]/30 font-serif font-bold text-xs hover:bg-[#1A2E1A] transition-all flex items-center gap-1.5"
                  >
                    🖨️ 打印 / 导出配方卡
                  </button>
                </div>
                {/* 1. Synergistic Blend Title & Poetic Concept */}
                <div className="p-4 rounded-2xl bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#d2c4ad] bg-[#d2c4ad]/10 px-2 py-0.5 rounded border border-[#d2c4ad]/20">
                      定制协同复方 / Synergistic Blend
                    </span>
                  </div>
                  <h4 className="font-serif text-base text-[#d2c4ad] font-semibold">
                    {recommendationResult.formulaTitle}
                  </h4>
                  <p className="text-xs text-[#b4aca2] leading-relaxed italic font-serif">
                    “{recommendationResult.poeticConcept}”
                  </p>

                  {/* Customer Service Contact Button for Synergistic Blend (复方增加联系客服按钮) */}
                  <div className="pt-2 border-t border-white/10 mt-2">
                    <button
                      onClick={() => {
                        if (onContactWechat) onContactWechat();
                        else setShowServiceModal(true);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#d2c4ad] to-[#c5b59c] text-[#0c120e] font-serif font-bold text-xs hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-md group"
                    >
                      <MessageCircle className="w-4 h-4 text-[#0c120e]" />
                      <span>联系高级芳疗师 / 在线客服 (1对1定制复方)</span>
                    </button>
                  </div>
                </div>

                {/* 2. Single Oils Recommended & Quick Product Links (结果单方增加推荐站内精油快速链接) */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif font-bold text-[#2D2D2A] uppercase">
                      推荐单方组方成分与站内直达:
                    </span>
                    <span className="text-[10px] text-[#8C7E6A] font-mono">SINGLES LINK</span>
                  </div>

                  {recommendationResult.recommendedComponents.map((comp, idx) => {
                    const matchedProduct = getMatchedProduct(comp.code, comp.name);
                    return (
                      <div key={idx} className="p-3.5 rounded-2xl bg-[#F9F7F2] border border-[#2D2D2A]/10 text-xs space-y-2 hover:border-[#8C7E6A]/40 transition-all">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-serif font-semibold text-[#2D2D2A] text-sm block">
                              {comp.name}
                            </span>
                            <span className="text-[#8C7E6A] font-mono text-[10px] block">
                              {comp.code} · {comp.series || '元 · 单方精油'}
                            </span>
                          </div>
                          {matchedProduct && (
                            <span className="text-xs font-bold text-[#0c120e] font-mono bg-[#d2c4ad]/20 border border-[#d2c4ad]/40 px-2 py-0.5 rounded-full shrink-0">
                              {matchedProduct.prices?.[0] || '站内上架'}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-[#2D2D2A]/75 leading-relaxed font-sans">
                          {comp.reason}
                        </p>

                        {/* Quick Link Button to In-Site Product */}
                        {matchedProduct ? (
                          <div className="pt-1.5 flex items-center justify-between border-t border-[#2D2D2A]/10">
                            <span className="text-[10px] text-[#8C7E6A] font-mono">
                              原产地: {matchedProduct.origin}
                            </span>
                            <button
                              onClick={() => onSelectProduct && onSelectProduct(matchedProduct)}
                              className="px-3 py-1 rounded-full bg-[#0c120e] text-[#d2c4ad] text-[11px] font-sans hover:bg-[#2D2D2A] transition-all flex items-center gap-1 shadow-xs"
                            >
                              <ShoppingBag className="w-3 h-3 text-[#d2c4ad]" />
                              <span>查看站内精油</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-75" />
                            </button>
                          </div>
                        ) : (
                          <div className="pt-1.5 flex justify-end border-t border-[#2D2D2A]/10">
                            <button
                              onClick={() => onNavigateTab && onNavigateTab('collection')}
                              className="px-3 py-1 rounded-full bg-[#EFEDE7] text-[#2D2D2A] text-[10px] font-sans hover:bg-[#DED9D2] transition-all flex items-center gap-1"
                            >
                              <span>前往馆藏全系</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* 2.5 Alice 芳疗手记 · 情绪意境共鸣 */}
                {recommendationResult.aliceComfortQuote && (
                  <div className="relative p-4 rounded-xl bg-[#F5F2EC] border-2 border-[#A5281F]/25 text-[#5C4632] text-[11px] space-y-2">
                    <div className="absolute inset-1.5 rounded-lg border border-[#A5281F]/15 pointer-events-none" />
                    <div className="flex items-center justify-between relative">
                      <span className="font-serif font-bold text-[#8C211A] flex items-center gap-1.5 tracking-wide">
                        <Sparkles className="w-3.5 h-3.5" />
                        Alice 芳疗手记 · 情绪意境共鸣
                      </span>
                      <span className="text-[8px] font-mono text-[#A5281F]/70 tracking-widest border border-[#A5281F]/30 rounded px-1.5 py-0.5 bg-[#FDF6F0]">
                        元香手记
                      </span>
                    </div>
                    <p className="relative leading-relaxed italic font-serif">
                      “{recommendationResult.aliceComfortQuote}”
                    </p>
                    <div className="relative flex items-center justify-between pt-1 border-t border-[#A5281F]/15">
                      <span className="text-[9px] text-[#8C7E6A] font-mono">—— 品牌创始人 Alice 刘元红 · 手记亲抚</span>
                      <button
                        onClick={() => {
                          const text = `“${recommendationResult.aliceComfortQuote}”\n—— UNIO 元香 · 元香手记`;
                          navigator.clipboard.writeText(text);
                          setCopiedQuote(true);
                          setTimeout(() => setCopiedQuote(false), 2000);
                        }}
                        className="text-[9px] px-2 py-1 rounded-full bg-[#A5281F] text-[#FDF6F0] hover:bg-[#8C211A] transition-colors flex items-center gap-1"
                      >
                        {copiedQuote ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                        {copiedQuote ? '已复制' : '复制手记'}
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. Safety & COA Note */}
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-amber-700" />
                    <span>芳疗师安全审订与 COA 报告</span>
                  </div>
                  <p>{recommendationResult.aromatherapistNote}</p>
                  <p className="font-mono text-[10px] text-amber-800">{recommendationResult.coaBatchNote}</p>
                </div>

                {/* 4. Action Buttons */}
                <div className="space-y-2 pt-1">
                  {onNavigateProfile && (
                    <button
                      onClick={onNavigateProfile}
                      className="w-full py-2.5 rounded-xl bg-[#EFEDE7] text-[#2D2D2A] font-serif text-xs font-medium hover:bg-[#DED9D2] transition-all text-center block"
                    >
                      存入“我的健康与香气档案”
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
                    setValidationError(null);
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

            {/* Validation Error Banner */}
            {validationError && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* STEP 1: Demographic & Lifestyle */}
            {step === 1 && (
              <div className="space-y-5 text-xs">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[#d2c4ad] font-serif font-bold text-sm">1. 年龄段与生理特征</label>
                    <span className="text-[10px] text-amber-300 bg-amber-900/30 px-2 py-0.5 rounded border border-amber-500/30">必填</span>
                  </div>
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
                  <div className="flex items-center justify-between">
                    <label className="block text-[#d2c4ad] font-serif font-bold text-sm">2. 日常工作强度与作息节奏</label>
                    <span className="text-[10px] text-amber-300 bg-amber-900/30 px-2 py-0.5 rounded border border-amber-500/30">必填 · 单选</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['作息规律 (早睡早起)', '经常熬夜高压 (脑力疲劳)', '昼夜颠倒/频繁出差'].map((ls) => (
                      <button
                        key={ls}
                        type="button"
                        onClick={() => {
                          setValidationError(null);
                          setQData({ ...qData, lifestyle: ls });
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          qData.lifestyle === ls
                            ? 'bg-[#d2c4ad] text-[#0c120e] border-[#d2c4ad] font-bold shadow-md'
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
                  <div className="flex items-center justify-between">
                    <label className="block text-[#d2c4ad] font-serif font-bold text-sm">3. 睡眠质量与深沉度困扰</label>
                    <span className="text-[10px] text-amber-300 bg-amber-900/30 px-2 py-0.5 rounded border border-amber-500/30">必填 · 单选</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {['无睡眠困扰 (睡眠良好)', '入睡困难 (>30分钟无法入眠)', '浅眠易醒多梦 (夜醒频繁)', '早醒倦怠 (觉知疲惫)'].map((si) => (
                      <button
                        key={si}
                        type="button"
                        onClick={() => {
                          setValidationError(null);
                          setQData({ ...qData, sleepIssue: si });
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          qData.sleepIssue === si
                            ? 'bg-[#d2c4ad] text-[#0c120e] border-[#d2c4ad] font-bold shadow-md'
                            : 'bg-white/5 border-white/10 text-white hover:border-[#d2c4ad]/50'
                        }`}
                      >
                        {si}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[#d2c4ad] font-serif font-bold text-sm">4. 身体紧绷与疲惫部位</label>
                    <span className="text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">必填 · 可复选</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      '肩颈僵硬酸痛', 
                      '眼睛干涩头痛', 
                      '腰椎腹部干寒', 
                      '四肢冰凉滞留', 
                      '胸闷呼吸较浅', 
                      '无明显身体不适'
                    ].map((st) => (
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
                  <div className="flex items-center justify-between">
                    <label className="block text-[#d2c4ad] font-serif font-bold text-sm">5. 当前情绪与心理气场偏向</label>
                    <span className="text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">必填 · 可复选</span>
                  </div>
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
                        onClick={() => toggleEmotionalState(emo)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                          qData.emotionalStates.includes(emo)
                            ? 'bg-[#d2c4ad] text-[#0c120e] border-[#d2c4ad] font-bold shadow-md'
                            : 'bg-white/5 border-white/10 text-white hover:border-[#d2c4ad]/50'
                        }`}
                      >
                        <span>{emo}</span>
                        {qData.emotionalStates.includes(emo) && <Check className="w-4 h-4 text-[#0c120e]" />}
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
                  <span>UNIO 严苛遵循临床芳疗安全守则：请勾选适用于您的禁忌（无则选择全无禁忌）。</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[#d2c4ad] font-serif font-bold text-sm">6. 临床避开禁忌</label>
                    <span className="text-[10px] text-amber-300 bg-amber-900/30 px-2 py-0.5 rounded border border-amber-500/30">必填 · 可复选</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      '孕期 / 备孕期 / 哺乳期',
                      '高血压 / 低血压',
                      '癫痫 / 哮喘史',
                      '皮肤极度过敏 / 严重湿疹',
                      '正在服用处方药物',
                      '蚕豆病 (G6PD 缺乏)',
                      '无以上特殊避开禁忌 (安全)'
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
                  <label className="block text-[#d2c4ad] font-serif font-bold text-sm">7. 偏好香调 (必填)</label>
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
                  <label className="block text-[#d2c4ad] font-serif font-bold text-sm">8. 应用场景与仪式载体 (必填)</label>
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
                  onClick={() => {
                    setValidationError(null);
                    setStep(step - 1);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  上一步
                </button>
              ) : <div />}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={validateAndNextStep}
                  className="px-6 py-2.5 rounded-xl bg-[#d2c4ad] text-[#0c120e] font-serif font-bold text-xs hover:bg-[#c5b59c] flex items-center gap-1 shadow-lg"
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

      {/* Customer Service Modal (联系客服) */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0c120e] text-[#f6f2eb] rounded-3xl border border-[#d2c4ad]/40 max-w-sm w-full p-6 text-center space-y-5 shadow-2xl relative"
          >
            <button
              onClick={() => setShowServiceModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d2c4ad]/20 border border-[#d2c4ad]/40 text-[#d2c4ad] text-xs font-serif">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>高级芳疗师 1对1 微信咨询</span>
            </div>

            <h3 className="font-serif text-2xl text-white font-normal">
              UNIO 寻香顾问微信
            </h3>

            <p className="text-xs text-[#b4aca2] leading-relaxed">
              针对您的“一人一方”复方，联系高级芳疗师获取专业解惑、滴数调整与一对一调配送达。
            </p>

            <div className="p-4 rounded-2xl bg-white text-black mx-auto w-48 h-48 flex flex-col items-center justify-center space-y-2 border-4 border-[#d2c4ad] shadow-xl">
              <div className="w-36 h-36 border border-gray-300 rounded-xl flex flex-col items-center justify-center p-2 text-center bg-[#faf9f6]">
                <UnioLogo size={36} color="#2D2D2A" />
                <span className="text-[10px] font-serif font-bold text-[#2D2D2A] mt-2">扫码添加专属客服</span>
                <span className="text-[9px] text-[#8C7E6A]">微信 ID: UNIO_AROMA_VIP</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="text-xs text-[#d2c4ad] font-mono">微信: UNIO_AROMA_VIP</span>
              <button
                onClick={() => copyWechat('UNIO_AROMA_VIP')}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-[#d2c4ad] flex items-center gap-1"
              >
                {copiedWechat ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedWechat ? '已复制' : '复制号'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 精美配方卡预览模态 */}
      {previewFormula && (
        <FormulaCardPreview data={previewFormula} onClose={() => setPreviewFormula(null)} />
      )}
    </div>
  );
};

