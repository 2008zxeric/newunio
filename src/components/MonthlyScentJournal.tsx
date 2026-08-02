import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, CheckCircle2, Feather, Send, BookOpen, Heart } from 'lucide-react';

export const MonthlyScentJournal: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    '时令植物调香',
    'Alice 芳疗手记',
  ]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState('');

  const TOPICS = [
    { id: '时令植物调香', label: '🌿 时令植物调香' },
    { id: 'Alice 芳疗手记', label: '📖 Alice 芳疗手记' },
    { id: '原料 COA 溯源', label: '🧪 原料 COA 溯源简报' },
    { id: '会员试香配方', label: '🎁 会员专享配方灵感' },
  ];

  useEffect(() => {
    try {
      const saved = localStorage.getItem('unio_scent_journal_subscription');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email) {
          setIsSubscribed(true);
          setSubscribedEmail(parsed.email);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleToggleTopic = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((t) => t !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    const subscriptionData = {
      email: email.trim(),
      topics: selectedTopics,
      subscribedAt: new Date().toISOString(),
    };

    localStorage.setItem('unio_scent_journal_subscription', JSON.stringify(subscriptionData));
    setSubscribedEmail(email.trim());
    setIsSubscribed(true);
  };

  const handleUnsubscribe = () => {
    localStorage.removeItem('unio_scent_journal_subscription');
    setIsSubscribed(false);
    setEmail('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto mb-10 px-4">
      <div className="relative rounded-3xl bg-[#EFEDE7] border border-[#8C7E6A]/25 p-6 sm:p-8 md:p-10 shadow-xs overflow-hidden">
        {/* Subtle Background Watermark Stamp */}
        <div className="absolute -right-8 -bottom-10 opacity-5 pointer-events-none text-[#1C2E20]">
          <Feather className="w-64 h-64" />
        </div>

        {isSubscribed ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 animate-fade-in">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C2E20] text-[#E8DAC8] text-xs font-mono font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5B49A]" />
                <span>已成功订阅《月度寻香期刊》</span>
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C2E20]">
                感念陪伴 · 寻香便笺将投递至 {subscribedEmail}
              </h3>
              <p className="text-xs text-[#8C7E6A] max-w-xl leading-relaxed">
                我们将在每月初为您呈送 Alice 团队撰写的节气芳疗调配指南、全球溯源新批次动向与纯露芳香养生手记。
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-2 rounded-2xl bg-[#FAF8F5] border border-[#8C7E6A]/20 text-xs font-mono text-[#1C2E20] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#8C7E6A]" />
                <span>投递频率: 1期/月</span>
              </div>
              <button
                onClick={handleUnsubscribe}
                className="text-xs text-[#8C7E6A] hover:text-[#1C2E20] underline transition-colors"
              >
                修改或退订
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C2E20]/10 border border-[#1C2E20]/15 text-[#1C2E20] text-xs font-mono">
                <Mail className="w-3.5 h-3.5 text-[#8C7E6A]" />
                <span>UNIO 月度寻香期刊 · Scent Journal</span>
              </div>

              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C2E20] tracking-tight">
                将自然节气与植物芳香，装进每月一封的书信里
              </h3>

              <p className="text-xs sm:text-sm text-[#2D2D2A]/80 leading-relaxed font-sans">
                无营销干扰，仅静心分享。每月初精心整理 Alice 的芳疗日记、50 余国地标产地季候动向、纯油协同复方手记与会员专属试香礼。
              </p>

              {/* Topic Selectors */}
              <div className="pt-1">
                <span className="text-[10px] font-mono uppercase text-[#8C7E6A] block mb-2 font-bold tracking-wider">
                  定制感兴趣的期刊主题 (可多选):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {TOPICS.map((topic) => {
                    const active = selectedTopics.includes(topic.id);
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => handleToggleTopic(topic.id)}
                        className={`px-3 py-1 rounded-full text-xs transition-all font-medium ${
                          active
                            ? 'bg-[#1C2E20] text-[#E8DAC8] shadow-2xs'
                            : 'bg-[#FAF8F5] text-[#2D2D2A]/70 hover:bg-[#DED9D2] hover:text-[#1C2E20] border border-[#8C7E6A]/20'
                        }`}
                      >
                        {topic.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-6 bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#8C7E6A]/20 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#8C7E6A]/15 pb-3">
                <span className="font-serif font-bold text-xs text-[#1C2E20] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5B49A]" />
                  <span>加入全球 12,000+ 位芳疗爱好者的寻香网络</span>
                </span>
                <span className="font-mono text-[10px] text-[#8C7E6A]">No Spam · Zero Ad</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="输入您的常用电子邮箱 (如 user@example.com)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#EFEDE7] border border-[#8C7E6A]/30 text-xs text-[#1C2E20] placeholder-[#8C7E6A]/60 focus:outline-none focus:border-[#1C2E20] focus:ring-1 focus:ring-[#1C2E20] transition-all font-mono"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg bg-[#1C2E20] hover:bg-[#8C7E6A] text-[#E8DAC8] hover:text-[#1C2E20] text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs active:scale-95"
                  >
                    <span>订阅期刊</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#8C7E6A] font-mono pt-1">
                  <span className="flex items-center gap-1">
                    <Feather className="w-3 h-3 text-[#C5B49A]" />
                    <span>首期即赠《2026 全球精油产地与化学型溯源白皮书》电子版</span>
                  </span>
                  <span>随时一键退订</span>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
