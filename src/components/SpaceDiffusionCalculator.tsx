import React, { useState, useMemo } from 'react';
import { Wind, Waves, Flame, Box, Sparkles, Clock, Droplets, Compass, ShieldCheck, Zap, Info, RotateCcw } from 'lucide-react';
import { ProductItem } from '../types';

interface SpaceDiffusionCalculatorProps {
  product: ProductItem;
}

export type DiffuserDeviceType = 'ultrasonic' | 'nebulizer' | 'stone_wood' | 'burner';
export type RoomSizeCategory = 'desk' | 'bedroom' | 'living';

interface DeviceOption {
  id: DiffuserDeviceType;
  name: string;
  icon: React.ReactNode;
  desc: string;
  waterRequired: boolean;
  baseWaterMl: number;
}

const DEVICE_OPTIONS: DeviceOption[] = [
  {
    id: 'ultrasonic',
    name: '超声波冷雾香薰机',
    icon: <Waves className="w-4 h-4" />,
    desc: '加水香薰，出雾细致温和，适合卧室与办公空间',
    waterRequired: true,
    baseWaterMl: 150,
  },
  {
    id: 'nebulizer',
    name: '纯精油冷喷扩香仪',
    icon: <Wind className="w-4 h-4" />,
    desc: '无需加水，高压气流将纯精油雾化，高浓度大空间强效扩香',
    waterRequired: false,
    baseWaterMl: 0,
  },
  {
    id: 'stone_wood',
    name: '扩香木 / 扩香石',
    icon: <Box className="w-4 h-4" />,
    desc: '微孔自然吸附静音挥发，适合办公桌、床头及车内近距离',
    waterRequired: false,
    baseWaterMl: 0,
  },
  {
    id: 'burner',
    name: '烛光 / 恒温加热香薰炉',
    icon: <Flame className="w-4 h-4" />,
    desc: '温热加速分子挥发，香气浓郁迅速铺满空间',
    waterRequired: true,
    baseWaterMl: 30,
  },
];

export const SpaceDiffusionCalculator: React.FC<SpaceDiffusionCalculatorProps> = ({ product }) => {
  const [deviceType, setDeviceType] = useState<DiffuserDeviceType>('ultrasonic');
  const [roomSize, setRoomSize] = useState<RoomSizeCategory>('bedroom');
  const [waterVolumeMl, setWaterVolumeMl] = useState<number>(150);

  // Detect Volatility Note Profile of the current product
  const volatilityInfo = useMemo(() => {
    const text = `${product.cn} ${product.en} ${product.subgroup} ${product.series} ${product.plantPart || ''}`.toLowerCase();

    if (
      text.includes('柑橘') ||
      text.includes('柠檬') ||
      text.includes('甜橙') ||
      text.includes('佛手柑') ||
      text.includes('葡萄柚') ||
      text.includes('薄荷') ||
      text.includes('尤加利') ||
      text.includes('红橘')
    ) {
      return {
        level: '高挥发度 (Top Note / 快板)',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        rateMultiplier: 1.25, // Needs slightly more frequent re-fill or slightly more drops
        rateDesc: '分子较小，爆香快，空气穿透力强，但挥发周期较短 (约 1-2 小时)。',
        durationAdvice: '建议采用低频间歇模式扩香，或搭配木质/树脂类低挥发精油定香。',
      };
    } else if (
      text.includes('木') ||
      text.includes('檀香') ||
      text.includes('雪松') ||
      text.includes('乳香') ||
      text.includes('广藿香') ||
      text.includes('岩兰草') ||
      text.includes('沉香') ||
      text.includes('安息香')
    ) {
      return {
        level: '低挥发度 (Base Note / 慢板定香)',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        rateMultiplier: 0.85, // Highly concentrated base note, fewer drops needed
        rateDesc: '分子庞大，挥发缓慢稳重，留香极长 (可达 6-12 小时以上)，具强效沉降定香力。',
        durationAdvice: '滴数宜少不宜多，避免积聚过于沉闷；适合长时间静音慢熏。',
      };
    } else {
      return {
        level: '中挥发度 (Middle Note / 柔板中调)',
        badgeColor: 'bg-amber-200/20 text-amber-200 border-amber-300/40',
        rateMultiplier: 1.0,
        rateDesc: '挥发速率适中平衡，香气饱满温和，持香周期约 3-5 小时。',
        durationAdvice: '经典居家扩香首选，气味演变自然平滑。',
      };
    }
  }, [product]);

  // Compute Diffusion Calculation Logic
  const calculation = useMemo(() => {
    let baseDrops = 4;
    let durationText = '';
    let refillsText = '';
    let intensityIndex = '82% (适中怡人)';
    let coverageRadius = '2 - 3 米';

    // Room factor
    if (roomSize === 'desk') {
      baseDrops = 2;
      coverageRadius = '1 - 1.5 米 (桌面局部精准气场)';
    } else if (roomSize === 'bedroom') {
      baseDrops = 5;
      coverageRadius = '3 - 4 米 (覆盖 10-15 ㎡ 卧室/书房)';
    } else if (roomSize === 'living') {
      baseDrops = 9;
      coverageRadius = '5 - 8 米 (覆盖 25-35 ㎡ 客厅/开放空间)';
    }

    // Adjust for product volatility
    const calculatedDrops = Math.max(1, Math.round(baseDrops * volatilityInfo.rateMultiplier));

    // Device specific instructions
    if (deviceType === 'ultrasonic') {
      durationText = '连续扩香 45-60 分钟，或开启【间歇模式】(喷30秒停30秒) 运行 2-3 小时。';
      refillsText = `水箱建议加水约 ${waterVolumeMl}ml，水尽时自动停机保护。`;
      intensityIndex = roomSize === 'living' ? '88% (清透绵密)' : '78% (柔和润泽)';
    } else if (deviceType === 'nebulizer') {
      const nebDrops = Math.max(2, Math.round(calculatedDrops * 0.7));
      durationText = '强烈建议开启【低阶间歇档位】(如雾化10秒/停50秒)，运行 30-45 分钟即可铺满空间。';
      refillsText = `无需水稀释，直接加入瓶中，建议每次充盈 ${nebDrops} - ${nebDrops + 2} 滴。`;
      intensityIndex = '95% (高纯度高震撼)';
    } else if (deviceType === 'stone_wood') {
      durationText = '滴落后自然缓释，最佳气味赏味期约为 3 - 6 小时。';
      refillsText = '挥发减弱后，可再次向扩香木/石中心补充 2-3 滴。';
      intensityIndex = '65% (静谧私密)';
    } else if (deviceType === 'burner') {
      durationText = '加热扩香不宜超过 45 分钟，水温过高前宜熄灭蜡烛。';
      refillsText = '上层水皿须先加八分满温水，切勿干烧。';
      intensityIndex = '90% (温暖浓郁)';
    }

    return {
      recommendedDrops: calculatedDrops,
      durationText,
      refillsText,
      intensityIndex,
      coverageRadius,
    };
  }, [deviceType, roomSize, waterVolumeMl, volatilityInfo]);

  return (
    <div className="p-5 rounded-3xl bg-[#0F1712] text-[#E8DAC8] space-y-5 shadow-2xl border border-[#C5B49A]/40 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-radial from-[#C5B49A]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#C5B49A]/20 text-[#C5B49A] border border-[#C5B49A]/30">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-base font-bold text-[#E8DAC8] flex items-center gap-2">
              <span>空间扩香方案 & 滴数时长计算器</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#C5B49A]/20 text-[#C5B49A] text-[10px] font-mono font-bold border border-[#C5B49A]/30">
                AMBIENT DIFFUSION
              </span>
            </h4>
            <p className="text-xs text-[#E8DAC8]/70 font-sans mt-0.5">
              根据【{product.cn}】的分子挥发速率与扩香载体，智能测算最佳滴数配比与呼吸时长
            </p>
          </div>
        </div>

        {/* Volatility Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className={`px-3 py-1 rounded-full text-xs font-serif font-bold border ${volatilityInfo.badgeColor}`}>
            {volatilityInfo.level}
          </span>
        </div>
      </div>

      {/* Interactive Controls & Output Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        {/* Left Column: Device & Space Selectors (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* 1. Device Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-serif font-bold text-[#C5B49A] flex items-center gap-1.5">
              <span>1. 选择扩香设备载体 (Diffuser Device)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {DEVICE_OPTIONS.map((dev) => {
                const isSelected = deviceType === dev.id;
                return (
                  <button
                    key={dev.id}
                    onClick={() => {
                      setDeviceType(dev.id);
                      if (dev.baseWaterMl > 0) setWaterVolumeMl(dev.baseWaterMl);
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1C2E20] border-[#C5B49A] shadow-md ring-1 ring-[#C5B49A]'
                        : 'bg-black/30 border-white/10 hover:border-white/20 hover:bg-black/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-serif font-bold text-xs flex items-center gap-1.5 ${isSelected ? 'text-[#C5B49A]' : 'text-[#E8DAC8]'}`}>
                        {dev.icon}
                        <span>{dev.name}</span>
                      </span>
                    </div>
                    <p className="text-[10px] text-[#E8DAC8]/60 leading-tight font-sans">
                      {dev.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Room Size Selector */}
          <div className="space-y-2">
            <label className="text-xs font-serif font-bold text-[#C5B49A] flex items-center gap-1.5">
              <span>2. 设定空间坪数与区域 (Room / Space Area)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setRoomSize('desk')}
                className={`py-2 px-3 rounded-xl text-xs font-serif transition-all text-center border ${
                  roomSize === 'desk'
                    ? 'bg-[#C5B49A] text-[#1C2E20] font-bold border-[#C5B49A]'
                    : 'bg-black/30 text-[#E8DAC8]/80 border-white/10 hover:bg-black/50'
                }`}
              >
                🖥️ 办公桌局部 (1-3 ㎡)
              </button>
              <button
                onClick={() => setRoomSize('bedroom')}
                className={`py-2 px-3 rounded-xl text-xs font-serif transition-all text-center border ${
                  roomSize === 'bedroom'
                    ? 'bg-[#C5B49A] text-[#1C2E20] font-bold border-[#C5B49A]'
                    : 'bg-black/30 text-[#E8DAC8]/80 border-white/10 hover:bg-black/50'
                }`}
              >
                🛏️ 卧室/书房 (10-15 ㎡)
              </button>
              <button
                onClick={() => setRoomSize('living')}
                className={`py-2 px-3 rounded-xl text-xs font-serif transition-all text-center border ${
                  roomSize === 'living'
                    ? 'bg-[#C5B49A] text-[#1C2E20] font-bold border-[#C5B49A]'
                    : 'bg-black/30 text-[#E8DAC8]/80 border-white/10 hover:bg-black/50'
                }`}
              >
                🛋️ 客厅/开放区 (20-35 ㎡)
              </button>
            </div>
          </div>

          {/* 3. Water Tank Volume Slider (if water required) */}
          {deviceType === 'ultrasonic' && (
            <div className="p-3 rounded-2xl bg-black/30 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#C5B49A] font-serif flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>香薰机水箱注水量:</span>
                </span>
                <span className="font-mono font-bold text-[#E8DAC8]">{waterVolumeMl} ml</span>
              </div>
              <input
                type="range"
                min="80"
                max="500"
                step="10"
                value={waterVolumeMl}
                onChange={(e) => setWaterVolumeMl(Number(e.target.value))}
                className="w-full accent-[#C5B49A] cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Right Column: Calculated Results Card (5 Cols) */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-[#1C2E20]/90 border border-[#C5B49A]/40 space-y-4 flex flex-col justify-between shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#C5B49A]/20 pb-2">
              <span className="text-xs font-serif font-bold text-[#C5B49A] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C5B49A]" />
                <span>建议扩香方案 (Optimal Recipe)</span>
              </span>
              <span className="text-[10px] font-mono text-[#E8DAC8]/60">AUTOMATED RESULT</span>
            </div>

            {/* Recommended Drops Display */}
            <div className="p-3.5 rounded-xl bg-black/50 border border-[#C5B49A]/30 text-center space-y-1">
              <span className="text-[10px] text-[#C5B49A] font-mono block">推荐精油加入滴数</span>
              <div className="text-3xl font-serif font-bold text-[#F59E0B] flex items-center justify-center gap-1">
                <span>{calculation.recommendedDrops}</span>
                <span className="text-sm font-sans text-[#E8DAC8]/80 font-normal">滴</span>
              </div>
              <p className="text-[10px] text-[#E8DAC8]/60 font-sans">
                基于【{volatilityInfo.level.split(' ')[0]}】精油挥发率微调
              </p>
            </div>

            {/* Time & Refill Instructions */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/10 space-y-1">
                <span className="text-[10px] text-[#C5B49A] font-serif font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C5B49A]" />
                  <span>扩香时长与建议运行模式</span>
                </span>
                <p className="text-[11px] text-[#E8DAC8] leading-relaxed">
                  {calculation.durationText}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-black/30 border border-white/10 space-y-1">
                <span className="text-[10px] text-[#C5B49A] font-serif font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5B49A]" />
                  <span>补充频率与氛围指数</span>
                </span>
                <p className="text-[10px] text-[#E8DAC8]/80 font-sans">
                  • 覆盖半径：{calculation.coverageRadius}
                </p>
                <p className="text-[10px] text-[#E8DAC8]/80 font-sans">
                  • 补水/续滴：{calculation.refillsText}
                </p>
              </div>
            </div>
          </div>

          {/* Volatility Note Advisory Footer */}
          <div className="p-2.5 rounded-xl bg-black/40 border border-[#C5B49A]/20 text-[10px] text-[#E8DAC8]/80 leading-normal font-sans">
            <span className="text-[#C5B49A] font-serif font-bold block mb-0.5">💡 【挥发特性调和建议】：</span>
            {volatilityInfo.durationAdvice}
          </div>
        </div>
      </div>
    </div>
  );
};
