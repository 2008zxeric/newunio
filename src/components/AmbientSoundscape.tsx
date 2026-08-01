import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Wind, Flame, CloudRain, BellRing } from 'lucide-react';

interface AmbientSoundscapeProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

type SoundId = 'bowl' | 'rain' | 'wind' | 'fire';

// ── Web Audio 环境音合成引擎 ──
// 每种音效都是持续播放的环境声（非一次性），暂停用 AudioContext.suspend/resume 真正暂停

function createNoiseBuffer(ctx: AudioContext, seconds = 4, brown = false): AudioBuffer {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  if (brown) {
    // 棕噪：低频能量强（炉火/风）
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return buffer;
}

export const AmbientSoundscape: React.FC<AmbientSoundscapeProps> = ({ isPlaying, onTogglePlay }) => {
  const [activeSound, setActiveSound] = useState<SoundId>('bowl');
  const [breathingPhase, setBreathingPhase] = useState<'吸气 Inhale' | '屏息 Hold' | '呼气 Exhale'>('吸气 Inhale');
  const [breathCount, setBreathingCount] = useState<number>(4);

  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);
  const activeSoundRef = useRef<SoundId>('bowl');

  // 获取/创建 AudioContext
  const getCtx = useCallback((): AudioContext | null => {
    try {
      if (!ctxRef.current) {
        ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (ctxRef.current.state === 'suspended') {
        ctxRef.current.resume();
      }
      return ctxRef.current;
    } catch (e) {
      console.warn('AudioContext error:', e);
      return null;
    }
  }, []);

  // 停止当前音效并释放节点
  const stopCurrent = useCallback(() => {
    if (nodesRef.current) {
      try { nodesRef.current.stop(); } catch { /* ignore */ }
      nodesRef.current = null;
    }
  }, []);

  // ── 音效构建器：返回 { stop } ──
  const buildSound = useCallback((type: SoundId) => {
    const ctx = getCtx();
    if (!ctx) return null;

    const master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);

    if (type === 'bowl') {
      // 颂钵：基频 216Hz + 泛音 432/648Hz，缓慢呼吸式持续
      const base = 216;
      const freqs = [base, base * 2, base * 3];
      const oscs = freqs.map((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? 'sine' : 'sine';
        osc.frequency.value = f;
        const g = ctx.createGain();
        g.gain.value = i === 0 ? 0.16 : 0.05;
        osc.connect(g);
        g.connect(master);
        return { osc, g };
      });
      // 缓慢拍频呼吸
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.1;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.04;
      lfo.connect(lfoGain);
      lfoGain.connect(oscs[0].g.gain);
      lfo.start();
      oscs.forEach(({ osc }) => osc.start());
      return {
        stop: () => {
          try {
            oscs.forEach(({ osc }) => { try { osc.stop(); } catch {} });
            lfo.stop();
            master.disconnect();
          } catch { /* ignore */ }
        },
      };
    }

    // 噪声类：白噪/棕噪 + 滤波器
    const noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx, 4, type === 'fire' || type === 'wind');
    noise.loop = true;

    if (type === 'rain') {
      // 细雨：白噪 → bandpass 2500Hz 柔和持续
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2500;
      filter.Q.value = 0.6;
      const g = ctx.createGain();
      g.gain.value = 0.22;
      noise.connect(filter);
      filter.connect(g);
      g.connect(master);
      // 轻微起伏
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.35;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.03;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      lfo.start();
      noise.start();
      return {
        stop: () => {
          try { noise.stop(); lfo.stop(); master.disconnect(); } catch {}
        },
      };
    }

    if (type === 'wind') {
      // 松风：棕噪 → lowpass 600Hz，LFO 缓慢起伏
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 650;
      filter.Q.value = 0.4;
      const g = ctx.createGain();
      g.gain.value = 0.3;
      noise.connect(filter);
      filter.connect(g);
      g.connect(master);
      // 0.08Hz 慢呼吸风感
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.08;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.12;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      lfo.start();
      noise.start();
      return {
        stop: () => {
          try { noise.stop(); lfo.stop(); master.disconnect(); } catch {}
        },
      };
    }

    // fire 炉火：棕噪 → lowpass 300Hz + 高频噼啪层
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 320;
    filter.Q.value = 0.5;
    const g = ctx.createGain();
    g.gain.value = 0.32;
    noise.connect(filter);
    filter.connect(g);
    g.connect(master);
    // 火焰抖动
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.9;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.06;
    lfo.connect(lfoGain);
    lfoGain.connect(g.gain);
    lfo.start();
    // 噼啪：随机短高频噪声脉冲
    const crackle = ctx.createBufferSource();
    crackle.buffer = createNoiseBuffer(ctx, 1);
    crackle.loop = true;
    const crackleFilter = ctx.createBiquadFilter();
    crackleFilter.type = 'highpass';
    crackleFilter.frequency.value = 4000;
    const crackleGain = ctx.createGain();
    crackleGain.gain.value = 0.015;
    crackle.connect(crackleFilter);
    crackleFilter.connect(crackleGain);
    crackleGain.connect(master);
    noise.start();
    crackle.start();
    return {
      stop: () => {
        try { noise.stop(); crackle.stop(); lfo.stop(); master.disconnect(); } catch {}
      },
    };
  }, [getCtx]);

  // 播放指定音效（停止旧的，启动新的）
  const playSound = useCallback((type: SoundId) => {
    stopCurrent();
    const s = buildSound(type);
    if (s) nodesRef.current = s;
  }, [buildSound, stopCurrent]);

  // isPlaying 变化：播放 / 暂停
  useEffect(() => {
    if (isPlaying) {
      playSound(activeSoundRef.current);
    } else {
      // 暂停：suspend 音频上下文（真正暂停，声音状态保留）
      try {
        ctxRef.current?.suspend();
      } catch { /* ignore */ }
      stopCurrent();
    }
  }, [isPlaying, playSound, stopCurrent]);

  // 切换音效
  const handleSelectSound = (id: SoundId) => {
    setActiveSound(id);
    activeSoundRef.current = id;
    if (isPlaying) playSound(id);
  };

  // 呼吸循环 (4-7-8)
  useEffect(() => {
    if (!isPlaying) return;

    setBreathingPhase('吸气 Inhale');
    setBreathingCount(4);

    const interval = setInterval(() => {
      setBreathingCount((prev) => {
        if (prev > 1) return prev - 1;
        // 阶段结束 → 切换到下一阶段并重置秒数
        setBreathingPhase((phase) => {
          if (phase === '吸气 Inhale') { setBreathingCount(7); return '屏息 Hold'; }
          if (phase === '屏息 Hold') { setBreathingCount(8); return '呼气 Exhale'; }
          setBreathingCount(4); return '吸气 Inhale';
        });
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // 卸载清理
  useEffect(() => {
    return () => {
      stopCurrent();
      try { ctxRef.current?.close(); } catch { /* ignore */ }
    };
  }, [stopCurrent]);

  return (
    <div className="bg-[#EFEDE7] border border-[#2D2D2A]/15 rounded-3xl p-6 shadow-md text-[#2D2D2A] max-w-xl mx-auto my-6 space-y-6 font-sans">
      
      {/* Soundscape Header */}
      <div className="flex items-center justify-between border-b border-[#2D2D2A]/10 pb-4">
        <div>
          <span className="text-[10px] text-[#8C7E6A] font-mono tracking-widest uppercase block">
            ZEN SCENT SOUNDSCAPE / 禅意冥想与呼吸
          </span>
          <h3 className="font-serif text-lg text-[#2D2D2A] font-semibold mt-0.5">
            4-7-8 腹式呼吸与声频疗愈
          </h3>
        </div>

        <button
          onClick={onTogglePlay}
          className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 transition-all ${
            isPlaying
              ? 'bg-[#8C7E6A] text-[#F9F7F2] shadow-sm animate-pulse'
              : 'bg-[#2D2D2A] text-[#F9F7F2] hover:bg-[#8C7E6A]'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isPlaying ? '暂停冥想' : '开启冥想'}</span>
        </button>
      </div>

      {/* Sound Selection Row — 每种音效独立真实持续环境声 */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        {[
          { id: 'bowl' as SoundId, label: '颂钵 Resonance', icon: BellRing, desc: '泛音持续' },
          { id: 'rain' as SoundId, label: '细雨 Rain', icon: CloudRain, desc: '白噪细密' },
          { id: 'wind' as SoundId, label: '松风 Wind', icon: Wind, desc: '低吟起伏' },
          { id: 'fire' as SoundId, label: '炉火 Fire', icon: Flame, desc: '噼啪暖响' },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeSound === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectSound(item.id)}
              className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1.5 ${
                isActive
                  ? 'bg-[#F9F7F2] border-[#2D2D2A] text-[#2D2D2A] font-medium shadow-sm'
                  : 'bg-[#F9F7F2]/60 border-[#2D2D2A]/10 text-[#8C7E6A] hover:bg-[#F9F7F2]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[11px] font-serif">{item.label}</span>
              <span className={`text-[9px] font-mono ${isActive ? 'text-[#8C7E6A]' : 'text-[#8C7E6A]/60'}`}>{item.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Visual Breathing Circle animation */}
      <div className="flex flex-col items-center justify-center py-6 space-y-4">
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Animated pulse circle */}
          <div
            className={`absolute inset-0 rounded-full bg-[#2D2D2A]/10 border border-[#2D2D2A]/30 transition-all duration-1000 ${
              isPlaying
                ? breathingPhase === '吸气 Inhale'
                  ? 'scale-125 bg-[#8C7E6A]/20'
                  : breathingPhase === '屏息 Hold'
                  ? 'scale-125 bg-[#2D2D2A]/20 border-[#2D2D2A]/50'
                  : 'scale-90 bg-transparent'
                : 'scale-100 opacity-40'
            }`}
          />

          <div className="relative z-10 text-center space-y-1">
            <span className="font-serif text-[#8C7E6A] text-sm font-semibold block">
              {isPlaying ? breathingPhase : '未开始'}
            </span>
            <span className="font-mono text-2xl font-bold text-[#2D2D2A]">
              {isPlaying ? `${breathCount}s` : 'START'}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#2D2D2A]/70 text-center max-w-xs font-light font-sans">
          随{activeSound === 'bowl' ? '颂钵泛音' : activeSound === 'rain' ? '细雨声' : activeSound === 'wind' ? '松风声' : '炉火声'}深长吸气，屏息感受香气浸润，再徐徐呼气释放周身疲惫。
        </p>
      </div>

    </div>
  );
};
