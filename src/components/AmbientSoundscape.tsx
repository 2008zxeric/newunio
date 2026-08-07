import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Wind, Flame, CloudRain, BellRing, Droplets, Clock, Sparkles, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AmbientSoundscapeProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

type SoundType = 'bowl' | 'rain' | 'wind' | 'fire' | 'stream';

interface SoundOption {
  id: SoundType;
  label: string;
  subLabel: string;
  icon: React.ElementType;
  description: string;
}

const SOUND_OPTIONS: SoundOption[] = [
  { id: 'bowl', label: '颂钵 Resonance', subLabel: '432Hz 磬音', icon: BellRing, description: '432Hz 正弦与泛音谐振，沉降杂念，深层平衡身心能量' },
  { id: 'rain', label: '竹檐细雨 Rain', subLabel: '自然水相', icon: CloudRain, description: '深山竹叶落雨声，低频白噪音包裹，营造安稳睡眠气场' },
  { id: 'wind', label: '深山松风 Wind', subLabel: '风吹松林', icon: Wind, description: '高山松针微风律动，自然频带呼吸起伏，清明思绪' },
  { id: 'fire', label: '围炉听香 Fire', subLabel: '沉香炭火', icon: Flame, description: '暖心香炭爆裂与低频余温，唤醒内生温暖与安全感' },
  { id: 'stream', label: '古溪水滴 Stream', subLabel: '幽谷清泉', icon: Droplets, description: '山涧竹管汲水与幽谷水滴，清冽通透，带走躁动情绪' },
];

export const AmbientSoundscape: React.FC<AmbientSoundscapeProps> = ({ isPlaying, onTogglePlay }) => {
  const [activeSound, setActiveSound] = useState<SoundType>('bowl');
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [timerMinutes, setTimerMinutes] = useState<number>(0); // 0 = off, 15, 30, 45
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [breathingPhase, setBreathingPhase] = useState<'吸气 Inhale' | '屏息 Hold' | '呼气 Exhale'>('吸气 Inhale');
  const [breathCount, setBreathingCount] = useState<number>(4);

  // Web Audio Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<{ stop: () => void }[]>([]);

  // Initialize Web Audio Context
  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Stop current playing audio generators
  const stopCurrentSound = () => {
    activeNodesRef.current.forEach((node) => {
      try {
        node.stop();
      } catch (e) {
        // Ignore already stopped
      }
    });
    activeNodesRef.current = [];
  };

  // Sound Synthesizers
  const playSound = (type: SoundType) => {
    stopCurrentSound();
    if (!isPlaying) return;

    try {
      const ctx = getAudioContext();
      if (!masterGainRef.current) {
        masterGainRef.current = ctx.createGain();
        masterGainRef.current.connect(ctx.destination);
      }
      masterGainRef.current.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);

      if (type === 'bowl') {
        // Tibetan Bowl Overtone Synthesizer (432Hz Fundamental + 864Hz + 1296Hz)
        const freqs = [432, 864, 1296, 216];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          // Subtle detune for rich chorusing/beating effect
          osc.detune.setValueAtTime((idx - 1) * 3, ctx.currentTime);

          const volScale = [0.25, 0.1, 0.05, 0.15][idx];
          gain.gain.setValueAtTime(volScale, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 5.5);

          osc.connect(gain);
          gain.connect(masterGainRef.current!);
          osc.start();
          osc.stop(ctx.currentTime + 6);

          activeNodesRef.current.push({
            stop: () => {
              try { osc.stop(); } catch (e) {}
            }
          });
        });

      } else if (type === 'rain') {
        // Rain Noise Generator (Filtered Pink Noise + Droplet Randomizer)
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          data[i] *= 0.11;
          b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.18, ctx.currentTime);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainRef.current!);
        noise.start();

        activeNodesRef.current.push({
          stop: () => {
            try { noise.stop(); } catch (e) {}
          }
        });

      } else if (type === 'wind') {
        // Wind Synthesizer (Bandpass Filtered Pink Noise with LFO Modulation)
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);
        filter.Q.setValueAtTime(3, ctx.currentTime);

        // LFO for wind gust sweeping
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(250, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.25, ctx.currentTime);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainRef.current!);

        noise.start();
        lfo.start();

        activeNodesRef.current.push({
          stop: () => {
            try { noise.stop(); lfo.stop(); } catch (e) {}
          }
        });

      } else if (type === 'fire') {
        // Wood Fire Crackle & Low Warmth
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(65, ctx.currentTime); // Low warm rumble
        gain.gain.setValueAtTime(0.12, ctx.currentTime);

        osc.connect(gain);
        gain.connect(masterGainRef.current!);
        osc.start();

        // Crackle generator interval
        const crackleInterval = setInterval(() => {
          if (!isPlaying) return;
          try {
            const crackleOsc = ctx.createOscillator();
            const crackleGain = ctx.createGain();
            crackleOsc.type = 'sawtooth';
            crackleOsc.frequency.setValueAtTime(1200 + Math.random() * 2000, ctx.currentTime);
            crackleGain.gain.setValueAtTime(0.04 + Math.random() * 0.05, ctx.currentTime);
            crackleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

            crackleOsc.connect(crackleGain);
            crackleGain.connect(masterGainRef.current!);
            crackleOsc.start();
            crackleOsc.stop(ctx.currentTime + 0.04);
          } catch (e) {}
        }, 150);

        activeNodesRef.current.push({
          stop: () => {
            try { osc.stop(); clearInterval(crackleInterval); } catch (e) {}
          }
        });

      } else if (type === 'stream') {
        // Bamboo Water Drop & Creek Stream
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(masterGainRef.current!);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);

        activeNodesRef.current.push({
          stop: () => {
            try { osc.stop(); } catch (e) {}
          }
        });
      }
    } catch (e) {
      console.warn('Audio Synthesis Error:', e);
    }
  };

  // Update volume when volume slider or mute changes
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(
        isMuted ? 0 : volume,
        audioCtxRef.current.currentTime
      );
    }
  }, [volume, isMuted]);

  // Trigger sound generation when playing state or sound selection changes
  useEffect(() => {
    if (isPlaying) {
      playSound(activeSound);
    } else {
      stopCurrentSound();
    }
    return () => {
      stopCurrentSound();
    };
  }, [isPlaying, activeSound]);

  // Handle Timer Countdowns
  useEffect(() => {
    if (timerMinutes > 0) {
      setRemainingTime(timerMinutes * 60);
    } else {
      setRemainingTime(0);
    }
  }, [timerMinutes]);

  useEffect(() => {
    if (!isPlaying || remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          onTogglePlay(); // Auto stop
          setTimerMinutes(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, remainingTime, onTogglePlay]);

  // Breathing Loop (4s Inhale, 7s Hold, 8s Exhale)
  useEffect(() => {
    if (!isPlaying) return;

    let count = 4;
    setBreathingPhase('吸气 Inhale');
    setBreathingCount(4);

    const interval = setInterval(() => {
      setBreathingCount((prev) => {
        if (prev > 1) return prev - 1;

        if (breathingPhase === '吸气 Inhale') {
          setBreathingPhase('屏息 Hold');
          return 7;
        } else if (breathingPhase === '屏息 Hold') {
          setBreathingPhase('呼气 Exhale');
          return 8;
        } else {
          setBreathingPhase('吸气 Inhale');
          // Re-trigger bowl/chime at the start of new breath cycle
          if (activeSound === 'bowl' || activeSound === 'stream') {
            playSound(activeSound);
          }
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, breathingPhase, activeSound]);

  const currentOption = SOUND_OPTIONS.find((s) => s.id === activeSound) || SOUND_OPTIONS[0];

  const formatTimerSeconds = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-gradient-to-b from-[#FFFFFF] to-[#F9F7F2] border border-[#2D2D2A]/15 rounded-3xl p-5 sm:p-7 shadow-lg text-[#2D2D2A] max-w-2xl mx-auto my-4 space-y-6 font-sans relative overflow-hidden">
      
      {/* Decorative Zen Atmosphere Accent Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d2c4ad]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#16221a]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2D2D2A]/10 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#8C7E6A] font-mono tracking-[0.2em] uppercase font-semibold block">
              ZEN SCENT SOUNDSCAPE / 禅意冥想与音疗
            </span>
            <span className="text-[9px] bg-[#2c2a26] text-[#d2c4ad] px-2 py-0.5 rounded-full font-mono">
              Web Audio 432Hz
            </span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl text-[#2D2D2A] font-semibold mt-1 flex items-center gap-2">
            <span>4-7-8 调息律动与原音场疗愈</span>
            {isPlaying && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#8C7E6A] animate-ping" />
              </span>
            )}
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onTogglePlay}
            className={`px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all shadow-sm active:scale-95 ${
              isPlaying
                ? 'bg-[#2c2a26] text-[#d2c4ad] border border-[#d2c4ad]/40 shadow-md'
                : 'bg-[#2D2D2A] text-[#F9F7F2] hover:bg-[#8C7E6A]'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-[#d2c4ad]" /> : <Play className="w-4 h-4" />}
            <span className="font-serif tracking-wider">{isPlaying ? '暂停音疗' : '开启沉浸音效'}</span>
          </button>
        </div>
      </div>

      {/* Sound Scene Mode Selector (Horizontal Touch Slider for Mobile) */}
      <div className="space-y-2 relative z-10">
        <div className="flex items-center justify-between text-xs text-[#8C7E6A] font-sans">
          <span>选择禅意音效场景:</span>
          <span className="text-[11px] font-mono text-[#2D2D2A]">{currentOption.subLabel}</span>
        </div>

        <div className="flex sm:grid sm:grid-cols-5 gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
          {SOUND_OPTIONS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSound === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSound(item.id);
                }}
                className={`flex-shrink-0 sm:flex-shrink p-3 rounded-2xl border transition-all flex flex-col items-center gap-1.5 min-w-[100px] sm:min-w-0 ${
                  isActive
                    ? 'bg-[#2c2a26] border-[#d2c4ad] text-[#d2c4ad] font-medium shadow-md scale-[1.02]'
                    : 'bg-[#F9F7F2] border-[#2D2D2A]/10 text-[#2D2D2A]/70 hover:bg-[#EFEDE7] hover:text-[#2D2D2A]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#d2c4ad]' : 'text-[#8C7E6A]'}`} />
                <span className="text-xs font-serif whitespace-nowrap">{item.label.split(' ')[0]}</span>
                <span className={`text-[9px] font-sans ${isActive ? 'text-[#d2c4ad]/80' : 'text-[#8C7E6A]'}`}>
                  {item.subLabel}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-[#8C7E6A] font-light font-sans bg-[#EFEDE7]/70 p-2.5 rounded-xl border border-[#2D2D2A]/10 mt-1">
          {currentOption.description}
        </p>
      </div>

      {/* Dynamic Breathing & Visualizer Stage */}
      <div className="bg-[#EFEDE7] border border-[#2D2D2A]/12 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center space-y-4 text-center">
        
        {/* Breathing Ring Stage */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center my-2">
          
          {/* Outer Breathing Wave 1 */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#8C7E6A]/30 bg-[#8C7E6A]/10"
            animate={
              isPlaying
                ? breathingPhase === '吸气 Inhale'
                  ? { scale: [1, 1.25, 1.3], opacity: [0.3, 0.6, 0.7] }
                  : breathingPhase === '屏息 Hold'
                  ? { scale: 1.3, opacity: 0.8, borderColor: '#2c2a26' }
                  : { scale: [1.3, 1, 0.85], opacity: [0.7, 0.4, 0.2] }
                : { scale: 1, opacity: 0.3 }
            }
            transition={{ duration: breathingPhase === '吸气 Inhale' ? 4 : breathingPhase === '屏息 Hold' ? 7 : 8, ease: 'easeInOut' }}
          />

          {/* Inner Breathing Core */}
          <motion.div
            className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#2c2a26] text-[#d2c4ad] border border-[#d2c4ad]/40 flex flex-col items-center justify-center shadow-xl p-2"
            animate={isPlaying ? { scale: [0.95, 1.05, 0.95] } : { scale: 1 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <Sparkles className="w-4 h-4 text-[#d2c4ad] opacity-80 mb-0.5" />
            <span className="font-serif text-xs font-semibold block text-[#d2c4ad]">
              {isPlaying ? breathingPhase : '点击开启调息'}
            </span>
            <span className="font-mono text-2xl font-bold tracking-tight text-[#F9F7F2]">
              {isPlaying ? `${breathCount}s` : '4-7-8'}
            </span>
            {isPlaying && (
              <span className="text-[9px] font-sans text-[#d2c4ad]/70 mt-0.5">
                {breathingPhase === '吸气 Inhale' ? '深长吸气' : breathingPhase === '屏息 Hold' ? '香气浸润' : '徐徐吐纳'}
              </span>
            )}
          </motion.div>

          {/* Frequency Visualizer Equalizer Bars around bottom */}
          {isPlaying && (
            <div className="absolute -bottom-2 flex items-end gap-1 h-6 z-20">
              {[0.4, 0.8, 0.5, 0.9, 0.6, 0.95, 0.45, 0.75, 0.5, 0.85].map((val, idx) => (
                <motion.span
                  key={idx}
                  className="w-1 bg-[#2c2a26] rounded-full"
                  animate={{ height: ['4px', `${val * 22}px`, '6px'] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.5 + (idx % 3) * 0.2,
                    repeatType: 'mirror',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-[#2D2D2A]/80 max-w-sm font-light leading-relaxed">
          搭配 UNIO 精油吸嗅或扩香，随 4 秒深吸、7 秒沉淀与 8 秒放空吐纳，释放全天深层紧绷。
        </p>
      </div>

      {/* Bottom Controls: Volume & Sleep Timer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F9F7F2] p-4 rounded-2xl border border-[#2D2D2A]/10 text-xs font-sans">
        
        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-[#8C7E6A] hover:text-[#2D2D2A] transition-colors"
            title={isMuted ? '取消静音' : '静音'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-full accent-[#2c2a26] cursor-pointer h-1.5 bg-[#DED9D2] rounded-lg"
          />
          <span className="font-mono text-[11px] text-[#8C7E6A] w-8 text-right">
            {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
          </span>
        </div>

        {/* Sleep Timer Selector */}
        <div className="flex items-center justify-between sm:justify-end gap-2">
          <div className="flex items-center gap-1 text-[#8C7E6A]">
            <Clock className="w-3.5 h-3.5" />
            <span>定时关机:</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px]">
            {[0, 15, 30, 45].map((mins) => (
              <button
                key={mins}
                onClick={() => setTimerMinutes(mins)}
                className={`px-2 py-1 rounded-md transition-all ${
                  timerMinutes === mins
                    ? 'bg-[#2c2a26] text-[#d2c4ad] font-bold'
                    : 'bg-[#EFEDE7] text-[#8C7E6A] hover:bg-[#DED9D2]'
                }`}
              >
                {mins === 0 ? '关闭' : `${mins}m`}
              </button>
            ))}
          </div>

          {remainingTime > 0 && (
            <span className="font-mono text-[10px] text-[#2c2a26] bg-[#d2c4ad]/30 border border-[#d2c4ad] px-1.5 py-0.5 rounded ml-1">
              {formatTimerSeconds(remainingTime)}
            </span>
          )}
        </div>

      </div>

    </div>
  );
};
