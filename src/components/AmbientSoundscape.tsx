import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Wind, Flame, CloudRain, BellRing } from 'lucide-react';

interface AmbientSoundscapeProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AmbientSoundscape: React.FC<AmbientSoundscapeProps> = ({ isPlaying, onTogglePlay }) => {
  const [activeSound, setActiveSound] = useState<'bowl' | 'rain' | 'wind' | 'fire'>('bowl');
  const [breathingPhase, setBreathingPhase] = useState<'吸气 Inhale' | '屏息 Hold' | '呼气 Exhale'>('吸气 Inhale');
  const [breathCount, setBreathingCount] = useState<number>(4);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Web Audio Synth for Tibetan Singing Bowl
  const playBowlSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(216, ctx.currentTime); // 216Hz Warm harmonic A
      osc.frequency.exponentialRampToValueAtTime(108, ctx.currentTime + 3);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 4);
    } catch (e) {
      console.warn('Audio Context error:', e);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      playBowlSound();
    }
  }, [isPlaying]);

  // Breathing Loop (4s Inhale, 7s Hold, 8s Exhale)
  useEffect(() => {
    if (!isPlaying) return;

    let timer: any;
    let count = 4;
    setBreathingPhase('吸气 Inhale');
    setBreathingCount(4);

    const interval = setInterval(() => {
      setBreathingCount((prev) => {
        if (prev > 1) return prev - 1;

        // Transition phases
        if (breathingPhase === '吸气 Inhale') {
          setBreathingPhase('屏息 Hold');
          return 7;
        } else if (breathingPhase === '屏息 Hold') {
          setBreathingPhase('呼气 Exhale');
          return 8;
        } else {
          setBreathingPhase('吸气 Inhale');
          playBowlSound();
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, breathingPhase]);

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

      {/* Sound Selection Row */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        {[
          { id: 'bowl', label: '颂钵 Resonance', icon: BellRing },
          { id: 'rain', label: '细雨 Rain', icon: CloudRain },
          { id: 'wind', label: '松风 Wind', icon: Wind },
          { id: 'fire', label: '炉火 Fire', icon: Flame },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeSound === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveSound(item.id as any);
                if (isPlaying) playBowlSound();
              }}
              className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1.5 ${
                isActive
                  ? 'bg-[#F9F7F2] border-[#2D2D2A] text-[#2D2D2A] font-medium shadow-sm'
                  : 'bg-[#F9F7F2]/60 border-[#2D2D2A]/10 text-[#8C7E6A] hover:bg-[#F9F7F2]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[11px] font-serif">{item.label}</span>
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
          随颂钵泛音深长吸气，屏息感受香气浸润，再徐徐呼气释放周身疲惫。
        </p>
      </div>

    </div>
  );
};
