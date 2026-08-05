import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import JSZip from 'jszip';
import { 
  ChevronLeft, ChevronRight, LayoutGrid, BookOpen, Download, Search, Check, 
  Sparkles, MapPin, Award, ArrowRight, Globe, ShieldCheck, Heart, Leaf, 
  Sun, Moon, Droplets, Layers, Building, Users, GraduationCap, RefreshCw,
  FileCode, Printer, Image, FileText, X, CheckCircle, PackageCheck, Loader2,
  Maximize2, Minimize2, Eye, EyeOff, Sliders, Hash, Play, Pause, Volume2, VolumeX, Clock
} from 'lucide-react';
import { ALL_PRODUCTS, SERIES_META } from '../data/catalogData';
import { ProductItem } from '../types';
import { matchProductWithPinyin } from '../utils/pinyinSearch';
import { UnioLogo } from './UnioLogo';

import { elementToPNGDataURL, printElementAsPNG } from '../utils/printExport';
import { 
  YEAR_RANGE_TEXT, 
  CHINESE_YEAR_JOURNEY, 
  YEARS_OF_JOURNEY, 
  FOUNDING_YEAR, 
  CURRENT_YEAR 
} from '../utils/brandConstants';

export const BOOK_PAGE_TITLES: string[] = [
  "P.01 品牌封面 Cover (极简象征)",
  "P.02 扉页：元境生境纯粹之美 Flyleaf",
  "P.03 品牌起源与 Alice 档案 Origin & Alice Archive",
  "P.04 全册 45 页目录指南 Master Contents",
  "P.05 芳香哲学与五行相生 Philosophy",
  "P.06 全球原产地 Origins Map",
  "P.07 元境萃取 Distillation",
  "P.08 元境检测 Testing & Safety",
  "P.09 香气工坊 Studios",
  "P.10 元系概述 Yuan Overview",
  "P.11 元系 金 Elemental Metal",
  "P.12 元系 木 Elemental Wood Part 1",
  "P.13 元系 木 Elemental Wood Part 2",
  "P.14 元系 水 Elemental Water",
  "P.15 元系 火 Elemental Fire",
  "P.16 元系 土 Elemental Earth",
  "P.17 植物基底油 Base Oils Part 1",
  "P.18 植物基底油 Base Oils Part 2",
  "P.19 配方哲学 Blending Science",
  "P.20 合系概述 He Series Overview",
  "P.21 合系 身 Body",
  "P.22 合系 心 Mind",
  "P.23 合系 灵 Soul",
  "P.24 生系概述 Sheng Series Overview",
  "P.25 生系 净 Purify",
  "P.26 生系 养 Nourish",
  "P.27 生系 舒 Soothe",
  "P.28 香系概述 Jing Series Overview",
  "P.29 香系 香境 Realm",
  "P.30 香系 禅思 Zen",
  "P.31 全系总图谱 Master Index Pt 1",
  "P.32 全系总图谱 Master Index Pt 2",
  "P.33 全系总图谱 Master Index Pt 3",
  "P.34 交互检索 Interactive Search",
  "P.35 商业空间与酒店SPA香氛 Commercial Scenting & Hotel",
  "P.36 企业团体订制与VIP礼盒 Custom Corporate Gifts",
  "P.37 元境自然图谱：花草石山河湖海 Nature Spectrum",
  "P.38 高定配方代工与OEM/ODM White Label & OEM/ODM",
  "P.39 企业健康与员工芳疗工作坊 Wellness Salons",
  "P.40 渠道加盟与独家保护 Boutique Wholesale Policy",
  "P.41 学院与芳疗师赋能 UNIO Academy",
  "P.42 绿色生态与可持续 Organic Farm Sustainability",
  "P.43 商业跨界与空间案例 B2B Case Showcase",
  "P.44 品牌愿景与永续典藏 Brand Vision",
  "P.45 封底与商务联系 Back Cover & Business Enquiries"
];

interface BrandBookViewerProps {
  onSelectProduct: (product: ProductItem) => void;
  onNavigateToCatalog: () => void;
  initialFullscreen?: boolean;
}

// Helper to convert modern CSS oklab/oklch colors to standard rgb/hex using canvas context
const convertModernColorToRgb = (colorStr: string): string => {
  if (!colorStr || (!colorStr.includes('oklab') && !colorStr.includes('oklch'))) {
    return colorStr;
  }
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#000000';
      ctx.fillStyle = colorStr;
      const resolved = ctx.fillStyle;
      if (resolved && !resolved.includes('oklab') && !resolved.includes('oklch')) {
        return resolved;
      }
    }
  } catch {
    // Fallback if conversion fails
  }
  return 'rgba(210, 196, 173, 0.8)';
};

export const PAGE_BACKGROUNDS: Record<number, string> = {
  0: '/assets/book-bg/首页.jpg',
  1: '/assets/book-bg/场景设计_001.png',
  2: '/assets/book-bg/精油瓶盖h.jpg',
  3: '/assets/book-bg/暗色纹理_001.jpg',
  4: '/assets/book-bg/田野背景.jpg',
  5: '/assets/book-bg/品牌产品_004.png',
  6: '/assets/book-bg/环境氛围_002.jpg',
  7: '/assets/book-bg/场景 1.png',
  8: '/assets/book-bg/场景设计_003.png',
  9: '/assets/book-bg/背景纹理_014.png',
  10: '/assets/book-bg/花草_006.jpg',
  11: '/assets/book-bg/自然_007.jpg',
  12: '/assets/book-bg/截屏2026-08-03 08.52.42.png',
  13: '/assets/book-bg/火焰暖光_014.jpg',
  14: '/assets/book-bg/优先背景 3.png',
  15: '/assets/book-bg/香薰瓶 1.jpg',
  16: '/assets/book-bg/花草_009.jpg',
  17: '/assets/book-bg/截屏2026-08-03 08.54.07.png',
  18: '/assets/book-bg/场景 8.png',
  19: '/assets/book-bg/按摩 4.jpg',
  20: '/assets/book-bg/截屏2026-08-03 08.54.20.png',
  21: '/assets/book-bg/截屏2026-08-03 08.54.34.png',
  22: '/assets/book-bg/rose 玫瑰 2.jpg',
  23: '/assets/book-bg/花草_010.jpg',
  24: '/assets/book-bg/截屏2026-08-03 08.54.50.png',
  25: '/assets/book-bg/截屏2026-08-03 09.00.57.png',
  26: '/assets/book-bg/精油香薰_001.jpg',
  27: '/assets/book-bg/截屏2026-08-03 09.03.20.png',
  28: '/assets/book-bg/截屏2026-08-03 09.03.34.png',
  29: '/assets/book-bg/背景纹理_017.png',
  30: '/assets/book-bg/截屏2026-08-03 09.06.40.png',
  31: '/assets/book-bg/截屏2026-08-03 09.07.18.png',
  32: '/assets/book-bg/陈列 4.jpg',
  33: '/assets/book-bg/截屏2026-08-03 09.10.10.png',
  34: '/assets/book-bg/截屏2026-08-03 09.10.27.png',
  35: '/assets/book-bg/陈列店铺_002.jpg',
  36: '/assets/book-bg/截屏2026-08-03 09.11.05.png',
  37: '/assets/book-bg/截屏2026-08-03 09.11.19.png',
  38: '/assets/book-bg/截屏2026-08-03 09.11.39.png',
  39: '/assets/book-bg/底页.jpg',
  40: '/assets/book-bg/场景设计_004.png',
  41: '/assets/book-bg/田野背景.jpg',
  42: '/assets/book-bg/场景 8.png',
  43: '/assets/book-bg/优先背景 3.png',
  44: '/assets/book-bg/底页.jpg',
};

export const BrandBookViewer: React.FC<BrandBookViewerProps> = ({
  onSelectProduct,
  onNavigateToCatalog,
  initialFullscreen = false
}) => {
  const [viewMode, setViewMode] = useState<'flip' | 'overview'>('flip');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [isFullscreenImmersive, setIsFullscreenImmersive] = useState<boolean>(initialFullscreen);
  const [fullscreenScaleMode, setFullscreenScaleMode] = useState<'height-fit' | 'width-fit' | 'zoom-in'>('height-fit');
  const [hideChromeInImmersive, setHideChromeInImmersive] = useState<boolean>(false);
  const [showJumpModal, setShowJumpModal] = useState<boolean>(false);
  const [jumpPageInput, setJumpPageInput] = useState<string>('');
  const [touchStartPos, setTouchStartPos] = useState<{ x: number; y: number } | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [exportStatus, setExportStatus] = useState<string>('');

  // Audio Sound Effect & Auto Cruise Flip States
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const isSoundEnabledRef = useRef<boolean>(isSoundEnabled);
  const [isAutoFlipping, setIsAutoFlipping] = useState<boolean>(false);
  const [autoFlipSpeed, setAutoFlipSpeed] = useState<number>(4); // default 4 seconds per page

  // Synchronize ref with state
  useEffect(() => {
    isSoundEnabledRef.current = isSoundEnabled;
  }, [isSoundEnabled]);

  // HTML5 Audio Ref for real classical piano BGM (Satie Gymnopédie No.1 / Debussy Clair de Lune)
  const bgmAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgmNodesRef = useRef<{ stop: () => void }[]>([]);
  const bgmTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Total 45 Pages Comprehensive Brand Book & B2B Cooperation Manual
  const TOTAL_PAGES = 45;

  // Initialize or resume Web Audio Context safely
  const getAudioContext = (): AudioContext | null => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtxClass) return null;
        audioCtxRef.current = new AudioCtxClass();
      }
      if (audioCtxRef.current.state === 'suspended' && isSoundEnabledRef.current) {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch (e) {
      return null;
    }
  };

  // Stop continuous BGM soundscape
  const stopBgm = () => {
    if (bgmAudioRef.current) {
      try {
        bgmAudioRef.current.pause();
        bgmAudioRef.current.currentTime = 0;
        bgmAudioRef.current.muted = true;
      } catch (e) {}
    }
    if (bgmTimerRef.current) {
      clearInterval(bgmTimerRef.current);
      bgmTimerRef.current = null;
    }
    bgmNodesRef.current.forEach((node) => {
      try { node.stop(); } catch (e) {}
    });
    bgmNodesRef.current = [];

    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      try {
        audioCtxRef.current.suspend();
      } catch (e) {}
    }
  };

  // Play a single piano note with realistic acoustic decay and overtones
  const playPianoNote = (ctx: AudioContext, freq: number, startTime: number, duration: number = 3.5, volume: number = 0.15) => {
    if (!isSoundEnabledRef.current) return;
    try {
      // Fundamental oscillator
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'triangle';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(freq, startTime);
      osc2.frequency.setValueAtTime(freq * 2, startTime); // 1st octave overtone

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, startTime);
      filter.frequency.exponentialRampToValueAtTime(300, startTime + duration);

      // Piano attack envelope: quick attack, exponential decay
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration);
      osc2.stop(startTime + duration);

      bgmNodesRef.current.push({
        stop: () => {
          try { osc1.stop(); osc2.stop(); } catch (e) {}
        }
      });
    } catch (e) {}
  };

  // Classical Satie Gymnopédie No.1 Procedural Piano Melodic Sequencer
  const startProceduralClassicalPiano = (ctx: AudioContext) => {
    if (!isSoundEnabledRef.current) return;
    // Gymnopédie No. 1 Harmonic Chords (Gmaj7 / Dmaj7)
    // Note frequencies in Hz
    const NOTES = {
      G2: 98.00, B2: 123.47, D3: 146.83, Fs3: 185.00, A3: 220.00,
      D2: 73.42, Fs2: 92.50, A2: 110.00, Csharp3: 138.59, E3: 164.81,
      B3: 246.94, D4: 293.66, Fs4: 369.99, A4: 440.00, B4: 493.88, Csharp4: 554.37
    };

    // 3/4 Time Signature Pattern (Measure length = ~3.6 seconds)
    const measureLength = 3.6;
    
    const playMeasure = (measureIndex: number) => {
      if (!isSoundEnabledRef.current) return;
      const now = ctx.currentTime;
      const isGmaj7 = measureIndex % 2 === 0;

      if (isGmaj7) {
        // Beat 1: Low Bass G2
        playPianoNote(ctx, NOTES.G2, now, 3.2, 0.22);
        // Beat 2: Accompaniment Chord (B3 + D4 + Fs4)
        playPianoNote(ctx, NOTES.B3, now + 1.2, 2.4, 0.12);
        playPianoNote(ctx, NOTES.D4, now + 1.2, 2.4, 0.12);
        playPianoNote(ctx, NOTES.Fs4, now + 1.2, 2.4, 0.10);
        // Beat 3: Gentle upper harmonic (A4)
        playPianoNote(ctx, NOTES.A4, now + 2.4, 2.0, 0.08);
      } else {
        // Beat 1: Low Bass D2
        playPianoNote(ctx, NOTES.D2, now, 3.2, 0.22);
        // Beat 2: Accompaniment Chord (Fs3 + A3 + Csharp4)
        playPianoNote(ctx, NOTES.Fs3, now + 1.2, 2.4, 0.12);
        playPianoNote(ctx, NOTES.A3, now + 1.2, 2.4, 0.12);
        playPianoNote(ctx, NOTES.Csharp4, now + 1.2, 2.4, 0.10);
        // Beat 3: Upper melody line (B4)
        playPianoNote(ctx, NOTES.B4, now + 2.4, 2.0, 0.08);
      }
    };

    let step = 0;
    playMeasure(step);
    step++;

    bgmTimerRef.current = setInterval(() => {
      if (!isSoundEnabledRef.current) {
        stopBgm();
        return;
      }
      playMeasure(step);
      step++;
    }, measureLength * 1000);
  };

  // Start classic elegant background music (Erik Satie - Gymnopédie No.1 / Classical Piano)
  const startBgm = () => {
    stopBgm();
    if (!isSoundEnabledRef.current) return;

    // 1. Try playing real classical audio track (Erik Satie Gymnopédie No.1 - Piano)
    if (!bgmAudioRef.current) {
      const audio = new Audio();
      // Public Domain High-Quality Classical Audio Stream
      audio.src = 'https://upload.wikimedia.org/wikipedia/commons/3/34/Erik_Satie_-_Gymnop%C3%A9die_No._1.ogg';
      audio.loop = true;
      audio.volume = 0.35;
      bgmAudioRef.current = audio;
    }
    bgmAudioRef.current.muted = false;

    const playPromise = bgmAudioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (!isSoundEnabledRef.current) return;
        // Fallback to Web Audio Procedural Classical Piano Sequencer if media playback fails
        const ctx = getAudioContext();
        if (ctx) {
          startProceduralClassicalPiano(ctx);
        }
      });
    }
  };

  // Toggle Sound & BGM with gesture unlock
  const toggleSoundAndBgm = () => {
    const nextState = !isSoundEnabled;
    setIsSoundEnabled(nextState);
    if (nextState) {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
    }
  };

  // Synchronize BGM playback with isSoundEnabled state
  useEffect(() => {
    if (isSoundEnabled) {
      startBgm();
    } else {
      stopBgm();
    }
    return () => {
      stopBgm();
    };
  }, [isSoundEnabled]);

  // Realistic Web Audio API synthetic paper page-flip rustle sound
  const playPageFlipSound = () => {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const bufferSize = Math.floor(ctx.sampleRate * 0.09); // 90ms crisp paper sound
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.22));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch (e) {
      // Ignore audio restriction
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < TOTAL_PAGES - 1 ? prev + 1 : 0));
    playPageFlipSound();
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : TOTAL_PAGES - 1));
    playPageFlipSound();
  };

  // Automatic Cruise Page Flipping Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isAutoFlipping && viewMode === 'flip') {
      timer = setInterval(() => {
        setCurrentPage((prev) => {
          const next = prev < TOTAL_PAGES - 1 ? prev + 1 : 0;
          playPageFlipSound();
          return next;
        });
      }, autoFlipSpeed * 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoFlipping, autoFlipSpeed, viewMode, isSoundEnabled]);

  // Global Keyboard Navigation (Right/Left Arrow, Space for Auto Flip & Esc/Fullscreen exit)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreenImmersive) {
        handleCloseFullscreen();
      }
      if (showJumpModal || showExportModal) return;
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'd' || e.key === 'D') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'a' || e.key === 'A') {
        handlePrevPage();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoFlipping((prev) => !prev);
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreenImmersive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [showJumpModal, showExportModal, isFullscreenImmersive, isSoundEnabled]);

  // Synchronize initialFullscreen prop changes
  useEffect(() => {
    if (initialFullscreen) {
      setViewMode('flip');
      setIsFullscreenImmersive(true);
    }
  }, [initialFullscreen]);

  // Native HTML5 Fullscreen API toggle
  const handleOpenFullscreen = async () => {
    setViewMode('flip');
    setIsFullscreenImmersive(true);
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {
      // Fallback if blocked by browser/iframe environment
    }
  };

  const handleCloseFullscreen = async () => {
    setIsFullscreenImmersive(false);
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch (e) {
      // Ignored
    }
  };

  // Enhanced Touch Gesture Swipe & Drag Handlers for Paper Page Turning
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setTouchStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setTouchDeltaX(0);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos || e.touches.length === 0) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartPos.x);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos || e.changedTouches.length === 0) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartPos.x - touchEndX;
    const diffY = touchStartPos.y - touchEndY;
    
    // Swipe distance threshold > 35px & horizontal swipe dominance
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY) * 1.1) {
      if (diffX > 0) {
        handleNextPage();
      } else {
        handlePrevPage();
      }
    }
    setTouchStartPos(null);
    setTouchDeltaX(0);
  };

  // 1. Export ALL 40 Pages as high-res JPEGs in a single ZIP archive
  const handleExportAllPagesZipJPEG = async () => {
    if (isCapturing) return;
    setIsCapturing(true);
    setExportProgress(0);
    setExportStatus('准备开始一次性打包全部 45 页高清 JPEG，请稍候...');
    
    const originalPage = currentPage;
    const originalViewMode = viewMode;
    setViewMode('flip');

    const zip = new JSZip();

    try {
      for (let i = 0; i < TOTAL_PAGES; i++) {
        setCurrentPage(i);
        const pageNumStr = String(i + 1).padStart(2, '0');
        const pct = Math.round(((i + 1) / TOTAL_PAGES) * 100);
        setExportProgress(pct);
        setExportStatus(`正在生成第 ${i + 1} / ${TOTAL_PAGES} 页 (P.${pageNumStr}) 高清 JPEG [${pct}%]...`);

        // Wait 150ms for React DOM to settle
        await new Promise((resolve) => setTimeout(resolve, 150));

        const el = document.getElementById('brand-book-page-container');
        if (!el) continue;

        let imgData = '';
        try {
          // 统一走 printExport：img 预转 dataURL + SVG foreignObject（底图/相对路径图不丢失）
          imgData = await elementToPNGDataURL(el, 2, '#0c120e', 'jpeg', 0.92);
        } catch (err) {
          console.warn(`elementToPNGDataURL failed on page ${i + 1}:`, err);
          continue;
        }

        const base64Data = imgData.replace(/^data:image\/jpeg;base64,/, '');
        zip.file(`UNIO_BrandBook_P${pageNumStr}.jpg`, base64Data, { base64: true });
      }

      setExportStatus('全部 45 页高清画面捕捉完成，正在打包压缩 ZIP 压缩包...');
      const zipContent = await zip.generateAsync({ type: 'blob' }, (metadata) => {
        setExportStatus(`正在构建压缩包... [${Math.round(metadata.percent)}%]`);
      });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipContent);
      link.download = 'UNIO_Aroma_BrandBook_40Pages_JPEG_Collection.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExportStatus('🎉 全部 45 页高清 JPEG 压缩包 (ZIP) 已成功导出并开始下载！');
    } catch (err) {
      console.error('Batch JPEG Zip Export Error:', err);
      setExportStatus('一次性打包导出 JPEG 时出错，请重试');
    } finally {
      setCurrentPage(originalPage);
      setViewMode(originalViewMode);
      setIsCapturing(false);
    }
  };

  // 2. Export Current Page as High-Res JPEG Image
  const handleExportCurrentPageJPEG = async () => {
    const el = document.getElementById('brand-book-page-container');
    if (!el) {
      setExportStatus('未找到画册页面，请先切换至画册视图');
      return;
    }
    try {
      setIsCapturing(true);
      setExportStatus('正在捕捉当前 1:1 页面高分辨率画面...');
      
      let imgData = '';
      try {
        // 统一走 printExport：img 预转 dataURL + SVG foreignObject（底图不丢失）
        imgData = await elementToPNGDataURL(el, 2, '#0c120e', 'jpeg', 0.95);
      } catch (err) {
        console.error('elementToPNGDataURL failed:', err);
        setExportStatus('导出 JPEG 图像时出错，请重试');
        return;
      }

      const link = document.createElement('a');
      link.href = imgData;
      link.download = `UNIO_BrandBook_P${String(currentPage + 1).padStart(2, '0')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setExportStatus(`P.${currentPage + 1} 页画册 JPEG 图像已成功保存！`);
    } catch (err) {
      console.error('JPEG Export Error:', err);
      setExportStatus('导出 JPEG 图像时出错，请重试');
    } finally {
      setIsCapturing(false);
    }
  };

  // 2. Export Standalone 1:1 Offline Interactive HTML File
  const handleExportOfflineHTML = () => {
    try {
      setExportStatus('正在生成单文件 1:1 离线 HTML 画册...');
      const pageTitles = BOOK_PAGE_TITLES;
      // 每页章节内容描述（保证 45 页全部有内容）
      const pageDescs = pageTitles.map((t: string) => {
        if (t.includes('合系 身')) return '收录 18 款身体调理复方：呼吸清咽、暖宫温经、舒缓肩颈、深眠体感等，每款含 3-5 成分科学配方构成与 Alice 配方试验手记。';
        if (t.includes('合系 心')) return '收录 16 款心智调频复方：深度专注、减压平息、安睡深眠、灵感涌动等。';
        if (t.includes('合系 灵')) return '收录 16 款灵魂安顿复方：极境归真、觉知开悟、心轮绽放、禅修定慧等。';
        if (t.includes('合系概述')) return '合 · 身心灵协同复方：50 款科学复方，每款 3-5 成分构成与 Alice 配方试验手记。';
        if (t.includes('品牌封面')) return 'UNIO AROMA · 2003-2026 品牌全景手册官方封面。';
        if (t.includes('目录')) return '全册 45 页目录指南，八大章节速达索引。';
        if (t.includes('起源')) return '创始人 Alice 刘元红纪念档案：从 2003 年单方手记到 219 款芳疗档案的廿余载历程。';
        if (t.includes('哲学')) return '芳香哲学与五行相生：元合生香四大体系的设计原点。';
        if (t.includes('原产地')) return '全球 50 余国原产地地图与 92 处元境地标。';
        if (t.includes('萃取')) return '元境萃取工艺：低温蒸馏、溶剂萃取、CO₂ 超临界全解析。';
        if (t.includes('检测')) return '实验室检测与安全标准：GC-MS 全批次质检、COA/MSDS 归档。';
        if (t.includes('工坊')) return '全球香气工坊：成都西南工坊、宁波海风观察站、芭提雅热带基地。';
        if (t.includes('元系概述')) return '元 · 单方精油与基础油：118 款全球原产地单方精油，金木水火土五行分类。';
        if (t.includes('基底油')) return '植物基底油：荷荷巴、甜杏仁、葡萄籽等基础油品鉴与稀释配比。';
        if (t.includes('配方哲学')) return '复方协同原理：挥发阶梯、分子协同金字塔与安全稀释浓度。';
        if (t.includes('生系概述')) return '生 · 有机植物纯露水相：41 款低温纯露，清净/润养/舒缓三组。';
        if (t.includes('香系概述')) return '香 · 空间器物与扩香：10 款高定扩香器物，黑岩陶瓷工艺。';
        if (t.includes('总图谱')) return '全系 219 款作品总图谱：产品编码、系列归属、产地与价格一页速览。';
        if (t.includes('交互检索')) return '全系 219 款作品交互检索：拼音/关键词/系列速查。';
        if (t.includes('商业空间')) return '商业空间与酒店 SPA 香氛定制：空间香氛方案与案例。';
        if (t.includes('礼盒')) return '企业团体订制与 VIP 礼盒：OEM 定制与尊享礼盒方案。';
        if (t.includes('自然图谱')) return '元境自然图谱：花草石山河湖海，源自世界各原产地的自然物语。';
        if (t.includes('渠道')) return '渠道加盟与独家保护政策：经销商体系与区域保护。';
        if (t.includes('学院')) return '学院与芳疗师赋能：专业芳疗教育课程与认证。';
        if (t.includes('生态')) return '绿色生态与有机农场：可持续种植与原产地保护。';
        if (t.includes('封底')) return '封底与联系：UNIO AROMA · 元合生香生物科技有限公司 · unioaroma.com';
        return 'UNIO AROMA 品牌全景手册章节内容。';
      });



      const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UNIO 元香 - 品牌画册与采购手册 (1:1 桌面离线版)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #0c120e; color: #f6f2eb; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; margin: 0; padding: 20px; }
    .page-card { aspect-ratio: 1 / 1.35; max-width: 800px; margin: 0 auto; background: #0c120e; border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; }
    .paper-texture { position: absolute; inset: 0; opacity: 0.04; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
  </style>
</head>
<body class="min-h-screen flex flex-col items-center justify-between p-4 sm:p-8">
  <div class="w-full max-w-4xl flex flex-wrap items-center justify-between mb-6 pb-4 border-b border-white/10 gap-4">
    <div class="flex items-center gap-3">
      <h1 class="font-serif text-2xl font-bold tracking-widest text-[#d2c4ad]">UNIO 元香</h1>
      <span class="text-xs text-[#b4aca2] border-l border-white/20 pl-3">完整品牌画册 (离线 1:1 版)</span>
    </div>
    <div class="flex items-center gap-2">
      <button onclick="prevPage()" class="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs rounded-full text-[#d2c4ad] transition-all">上一页</button>
      <span id="page-num" class="text-xs font-mono px-3 text-[#d2c4ad]">P.01 / P.{TOTAL_PAGES}</span>
      <button onclick="nextPage()" class="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs rounded-full text-[#d2c4ad] transition-all">下一页</button>
    </div>
  </div>

  <div class="page-card w-full shadow-2xl my-auto">
    <div class="paper-texture"></div>
    <div class="z-10 flex justify-between border-b border-white/10 pb-3 text-xs text-[#d2c4ad]">
      <span>UNIO AROMA · BRAND VISUAL MANUAL</span>
      <span id="page-tag" class="font-mono">P.01</span>
    </div>
    <div class="my-auto z-10 space-y-4 py-8">
      <div class="inline-block px-3 py-1 bg-white/10 rounded-full text-xs text-[#d2c4ad] font-mono">1:1 OFFLINE EDITION</div>
      <h2 id="page-title" class="text-3xl sm:text-5xl font-serif text-[#f6f2eb] leading-tight">UNIO 元香</h2>
      <p id="page-desc" class="text-sm text-[#b4aca2] max-w-md leading-relaxed">
        一套从 ${FOUNDING_YEAR} 年真实芳疗记录、全球原生与有机产地及 219 款作品中生长的精品香气体系。
      </p>
    </div>
    <div class="z-10 pt-3 border-t border-white/10 flex justify-between text-xs text-[#b4aca2]">
      <span>${YEAR_RANGE_TEXT} OFFICIAL CATALOGUE</span>
      <span>unioaroma.com</span>
    </div>
  </div>

  <div class="mt-8 text-center text-xs text-[#b4aca2]">
    <p>UNIO 元香 品牌官方画册桌面导出文件 · 1:1 离线完整版</p>
  </div>

  <script>
    const pageTitles = ${JSON.stringify(pageTitles)};
    const pageDescs = ${JSON.stringify(pageDescs)};
    let cur = 0;
    function update() {
      document.getElementById('page-num').innerText = 'P.' + String(cur+1).padStart(2,'0') + ' / P.' + String(${TOTAL_PAGES}).padStart(2,'0');
      document.getElementById('page-tag').innerText = 'P.' + String(cur+1).padStart(2,'0');
      document.getElementById('page-title').innerText = pageTitles[cur];
      document.getElementById('page-desc').innerText = pageDescs[cur] || '';
    }
    function prevPage() { if(cur>0) { cur--; update(); } }
    function nextPage() { if(cur<${TOTAL_PAGES - 1}) { cur++; update(); } }
  </script>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'UNIO_Aroma_BrandBook_${TOTAL_PAGES}Pages_Interactive.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setExportStatus('单文件 1:1 离线 HTML 画册已成功导出到本地！');
    } catch (err) {
      console.error('HTML Export Error:', err);
      setExportStatus('导出 HTML 时出错，请重试');
    }
  };

  // 3. Export PDF via Window Print（printExport 方案：生成 PNG 插入 #print-image-wrap + window.print，无白屏）
  const handleExportPDFPrint = async () => {
    const el = document.getElementById('brand-book-page-container');
    if (!el) {
      setExportStatus('未找到画册页面，请先切换至画册视图');
      return;
    }
    setExportStatus('正在生成 1:1 高清打印图像（请稍候）...');
    try {
      await printElementAsPNG(el);
      setExportStatus('已唤起 1:1 PDF 打印窗口，请在目标打印机中选择“另存为 PDF”');
    } catch (err) {
      console.error('PDF Print Export Error:', err);
      setExportStatus('打印导出时出错，请重试');
    }
  };

  // Preload all 40 page background images and catalog product images in browser cache
  // so page turns render background image and text in the exact same frame
  useEffect(() => {
    if (typeof window === 'undefined') return;
    Object.values(PAGE_BACKGROUNDS).forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
    ALL_PRODUCTS.forEach((p) => {
      if (p.image) {
        const img = new window.Image();
        img.src = p.image;
      }
    });
  }, []);

  const yuanProducts = ALL_PRODUCTS.filter((p) => p.series === 'yuan');
  const heProducts = ALL_PRODUCTS.filter((p) => p.series === 'he');
  const shengProducts = ALL_PRODUCTS.filter((p) => p.series === 'sheng');
  const jingProducts = ALL_PRODUCTS.filter((p) => p.series === 'jing');

  const [yuanSearch, setYuanSearch] = useState<string>('');

  // Image Placeholder Helper Component for custom post-production photo placements
  const ImagePlaceholderBox: React.FC<{ label?: string; hint?: string }> = ({
    label = '预留 1:1 配图框 · IMAGE PLACEHOLDER',
    hint = '后期可直接在此替换为实拍大图或矢量插图'
  }) => (
    <div className="w-full h-full min-h-[160px] border border-dashed border-[#d2c4ad]/35 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-white/[0.02] relative group hover:border-[#d2c4ad]/60 transition-colors">
      <div className="w-8 h-8 rounded-full bg-[#d2c4ad]/10 border border-[#d2c4ad]/20 flex items-center justify-center text-[#d2c4ad] mb-1.5 shadow-sm">
        <Image className="w-4 h-4 opacity-75" />
      </div>
      <span className="text-[10px] font-mono tracking-widest text-[#d2c4ad] uppercase font-bold">
        [ {label} ]
      </span>
      <span className="text-[10px] text-[#b4aca2] mt-1 font-light max-w-xs leading-relaxed">
        {hint}
      </span>
      {/* Corner Bracket Details */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#d2c4ad]/40" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#d2c4ad]/40" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#d2c4ad]/40" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#d2c4ad]/40" />
    </div>
  );

  // Render Page Content based on Page Index (0 to 39)
  const [pageLoaded, setPageLoaded] = useState<number>(0); // 记录已加载的页码（图片就绪后整页显示）
  const renderPage = (pageIdx: number, forceVisible = false) => {
    const bgUrl = PAGE_BACKGROUNDS[pageIdx] || PAGE_BACKGROUNDS[0];

    return (
      <div 
        id={forceVisible ? undefined : 'brand-book-page-container'}
        className={`relative h-full w-full p-6 md:p-10 flex flex-col justify-between overflow-hidden bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/25 rounded-2xl shadow-2xl font-sans select-none transition-opacity duration-300 ${
          pageLoaded === pageIdx || forceVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Background Atmosphere Image Layer - rendered with img tag for reliable loading & onError fallback */}
        <img 
          src={bgUrl} 
          alt={`UNIO Brand Book Page ${pageIdx + 1}`}
          onLoad={() => setPageLoaded(pageIdx)}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/assets/book-bg/底页.jpg';
            setPageLoaded(pageIdx);
          }}
          className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none filter brightness-105 contrast-105 saturate-110 transition-opacity duration-300 ${
            pageIdx === 0 ? 'opacity-80 md:opacity-90 scale-105' : 'opacity-40 md:opacity-50'
          }`}
        />
        
        {/* Fine Soft Light Mask Overlay with Brand Almond Tint */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(210,196,173,0.18),transparent_60%)] pointer-events-none" />
        <div className={`absolute inset-0 pointer-events-none ${
          pageIdx === 0
            ? 'bg-gradient-to-b from-black/50 via-black/20 to-[#0c120e]/85'
            : 'bg-gradient-to-b from-[#0c120e]/65 via-[#0c120e]/45 to-[#0c120e]/85 backdrop-blur-[1px]'
        }`} />

        {/* Minimalist Bookbinding Architectural Frame Lines */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#d2c4ad]/30 pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#d2c4ad]/30 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#d2c4ad]/30 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#d2c4ad]/30 pointer-events-none" />

        {/* Paper Edge Hover Turn Indicators */}
        {pageIdx > 0 && (
          <div 
            onClick={(e) => { e.stopPropagation(); handlePrevPage(); }}
            className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 z-30 cursor-pointer group opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-r from-black/60 via-black/20 to-transparent flex items-center justify-start pl-2"
            title="点击翻至上一页"
          >
            <div className="p-2 rounded-full bg-[#0c120e]/90 border border-[#d2c4ad]/50 text-[#d2c4ad] shadow-2xl group-hover:scale-110 transition-transform flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>
        )}

        {pageIdx < TOTAL_PAGES - 1 && (
          <div 
            onClick={(e) => { e.stopPropagation(); handleNextPage(); }}
            className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 z-30 cursor-pointer group opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-l from-black/60 via-black/20 to-transparent flex items-center justify-end pr-2"
            title="点击翻至下一页"
          >
            <div className="p-2 rounded-full bg-[#0c120e]/90 border border-[#d2c4ad]/50 text-[#d2c4ad] shadow-2xl group-hover:scale-110 transition-transform flex items-center gap-1">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Page Inner Container */}
        {renderPageBody(pageIdx)}
      </div>
    );
  };

  const renderPageBody = (pageIdx: number) => {
    switch (pageIdx) {
      // P01: Cover Poster (Minimalist Symbol: Logo and Brand Name only)
      case 0:
        return (
          <>
            <div className="relative z-10 flex items-center justify-between border-b border-[#d2c4ad]/20 pb-4">
              <div className="flex items-center gap-3">
                <UnioLogo size={32} color="#d2c4ad" />
                <span className="text-xs tracking-[0.25em] text-[#d2c4ad] uppercase font-mono font-semibold">
                  UNIO AROMA · BRAND MANUAL
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-[#b4aca2] uppercase font-mono">
                Official Edition / 45 Pages
              </span>
            </div>

            {/* Central Focal Hero - Minimalist Logo & Title */}
            <div className="relative z-10 my-auto flex flex-col items-center text-center space-y-8 max-w-xl mx-auto py-12">
              <div className="relative p-10 rounded-full bg-black/40 backdrop-blur-2xl border border-[#d2c4ad]/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group transition-all duration-700 hover:border-[#d2c4ad]/70 hover:scale-105">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d2c4ad]/20 via-transparent to-white/10 opacity-60 blur-md pointer-events-none" />
                <UnioLogo size={100} color="#e5d8c5" />
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-wide text-[#f6f2eb]">
                  UnioAroma
                </h1>
                <p className="font-serif text-xl sm:text-2xl tracking-[0.4em] text-[#d2c4ad] uppercase font-light">
                  UNIO · 元香
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-[#d2c4ad]/20 flex items-center justify-between text-xs text-[#b4aca2] font-mono">
              <span className="tracking-widest">{YEAR_RANGE_TEXT} CONTINUUM</span>
              <span className="text-[#d2c4ad] tracking-widest uppercase">unioaroma.com</span>
            </div>
          </>
        );

      // P02: Flyleaf (Subtitle, Tagline, Heritage Stats & 4 Series Cards)
      case 1:
        return (
          <>
            <div className="relative z-10 flex items-center justify-between border-b border-[#d2c4ad]/20 pb-3">
              <div className="flex items-center gap-2">
                <UnioLogo size={28} color="#d2c4ad" />
                <span className="text-xs tracking-[0.25em] text-[#d2c4ad] uppercase font-mono font-semibold">
                  P.02 · 扉页：元境生境纯粹之美 FLYLEAF
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-[#b4aca2] uppercase font-mono">
                02 / 45
              </span>
            </div>

            <div className="relative z-10 my-auto flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto py-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-[#d2c4ad]/30 text-xs text-[#d2c4ad] font-mono tracking-widest uppercase shadow-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ORIGINAL HARMONY SANCTUARY · {CHINESE_YEAR_JOURNEY}寻香，始于觉知</span>
              </div>

              <div className="p-6 rounded-2xl bg-black/50 border border-[#d2c4ad]/25 backdrop-blur-md space-y-3 max-w-xl shadow-2xl">
                <p className="text-sm md:text-base leading-relaxed text-[#f6f2eb] font-serif italic">
                  “从极境撷取芳香，因世界元于一息。”
                </p>
                <p className="text-xs text-[#b4aca2] font-light leading-relaxed">
                  CRAFT {YEARS_OF_JOURNEY} Years · COLLECTIONS 4 Series · ORIGINS Global Botanicals 50 余国与中国 31 省元境地标原产地直采。
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-2 font-mono text-center text-xs">
                <div className="p-3 rounded-xl bg-black/50 border border-white/15 backdrop-blur-sm">
                  <span className="block text-[#d2c4ad] font-serif font-bold text-sm">元系 · 118款</span>
                  <span className="text-[10px] text-[#b4aca2]">单方与基底油</span>
                </div>
                <div className="p-3 rounded-xl bg-black/50 border border-white/15 backdrop-blur-sm">
                  <span className="block text-[#d2c4ad] font-serif font-bold text-sm">合系 · 50款</span>
                  <span className="text-[10px] text-[#b4aca2]">身心灵复方</span>
                </div>
                <div className="p-3 rounded-xl bg-black/50 border border-white/15 backdrop-blur-sm">
                  <span className="block text-[#d2c4ad] font-serif font-bold text-sm">生系 · 41款</span>
                  <span className="text-[10px] text-[#b4aca2]">有机纯露水相</span>
                </div>
                <div className="p-3 rounded-xl bg-black/50 border border-white/15 backdrop-blur-sm">
                  <span className="block text-[#d2c4ad] font-serif font-bold text-sm">香系 · 10款</span>
                  <span className="text-[10px] text-[#b4aca2]">空间器物与扩香</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-3 border-t border-[#d2c4ad]/20 flex items-center justify-between text-xs text-[#b4aca2] font-mono">
              <span>{YEAR_RANGE_TEXT} CONTINUUM</span>
              <span>02 / 45</span>
            </div>
          </>
        );

      // P03: Brand Origin, Philosophy & Subdued Founder Memorial
      case 2:
        return (
          <>
            <div className="relative z-10 grid md:grid-cols-2 gap-6 h-full my-auto items-center">
              <div className="flex flex-col justify-between space-y-3.5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d2c4ad]/15 border border-[#d2c4ad]/30 text-[#d2c4ad] text-xs font-mono tracking-wider uppercase mb-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d2c4ad]" />
                    <span>P.03 · 品牌起源与融合秩序</span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-5xl font-normal leading-tight text-[#f6f2eb] mb-2.5">
                    元境寻香，<br />
                    <span className="text-[#d2c4ad]">融万物于一息。</span>
                  </h2>
                  <p className="text-xs md:text-sm leading-relaxed text-[#b4aca2]">
                    UNIO 元香创立于 2003 年。“UNIO”取意“融合与统一”，代表自然与生命的和谐共生。立足全球 50 余国与中国 31 省元境地标原产地直采与 GC-MS 色谱严格检测，我们将对生命的温度沉淀为一套可追溯的纯素香气秩序。
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/15 text-xs text-[#f6f2eb]/90 leading-relaxed border-l-2 border-l-[#d2c4ad] space-y-1">
                  <p className="font-serif text-sm text-[#d2c4ad] italic">“从极境撷取芳香，因世界元于一息。”</p>
                  <p className="text-[10px] text-[#b4aca2] pt-0.5">ORIGINAL HARMONY SANCTUARY · {CHINESE_YEAR_JOURNEY}寻香，始于觉知。</p>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
                    <span className="font-serif text-lg text-[#d2c4ad] font-bold">2003</span>
                    <span className="block text-[9px] text-[#b4aca2]">品牌创元</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
                    <span className="font-serif text-lg text-[#d2c4ad] font-bold">50+</span>
                    <span className="block text-[9px] text-[#b4aca2]">全球原产地</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
                    <span className="font-serif text-lg text-[#d2c4ad] font-bold">219</span>
                    <span className="block text-[9px] text-[#b4aca2]">独家配方</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
                    <span className="font-serif text-lg text-[#d2c4ad] font-bold">23Y</span>
                    <span className="block text-[9px] text-[#b4aca2]">芳疗沉淀</span>
                  </div>
                </div>

                {/* Subdued Founder Memorial Section */}
                <div className="p-3 rounded-xl bg-black/40 border border-[#d2c4ad]/20 backdrop-blur-md space-y-1">
                  <div className="flex items-center gap-1.5 text-[#d2c4ad] font-serif text-xs">
                    <Heart className="w-3 h-3 text-[#d2c4ad] opacity-80" />
                    <span className="tracking-wide font-medium">敬 品牌创始人 Alice 刘元红女士</span>
                  </div>
                  <p className="text-[11px] text-[#b4aca2] leading-relaxed font-light">
                    “元”取自创始人中间名。23 年真实临床日记与独立芳疗精神，已永久沉淀为 UNIO 品牌不随波逐流的坚韧灵魂。岁岁闻香，岁岁念你。
                  </p>
                </div>
              </div>

              {/* Brand Heritage & Botanical Atmosphere Card */}
              <div className="relative rounded-2xl overflow-hidden border border-[#d2c4ad]/30 flex flex-col justify-between p-6 bg-cover bg-center min-h-[300px] shadow-2xl"
                   style={{ backgroundImage: `url('/assets/book-bg/首页.jpg')` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30"></div>
                
                <div className="relative z-10 flex justify-between items-center border-b border-white/20 pb-3">
                  <div className="flex items-center gap-2">
                    <UnioLogo size={24} color="#d2c4ad" />
                    <span className="font-serif text-xs tracking-widest text-[#d2c4ad]">UNIO AROMA</span>
                  </div>
                  <span className="text-[10px] tracking-widest text-[#b4aca2] font-mono">BRAND ORIGIN</span>
                </div>

                <div className="relative z-10 space-y-2 my-auto py-4">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#d2c4ad] font-semibold block">HERITAGE & BOTANICAL ORDER</span>
                  <h3 className="font-serif text-2xl font-normal text-white leading-tight">
                    源于自然 · 归于觉知
                  </h3>
                  <p className="text-xs text-[#f6f2eb]/90 leading-relaxed font-light">
                    松针与绿意蔓延，清冽瓶身盛载岁月沉淀。从原生叶片到一滴精油，UNIO 以纯粹与可追溯的哲学敬畏生命。
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-white/20 flex items-center justify-between text-[10px] text-[#d2c4ad] font-mono">
                  <span>UNIO AROMA · 2003-2026</span>
                  <span>ORIGINAL SANCTUARY</span>
                </div>
              </div>
            </div>
            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2] font-mono">
              <span>P.03 · BRAND ORIGIN & HERITAGE</span>
              <span>03 / 45</span>
            </div>
          </>
        );

      // P04: Master Manual Table of Contents (45-Page Map)
      case 3:
        return (
          <>
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold">P.04 · MASTER MANUAL CONTENTS</span>
              <span className="text-xs text-[#b4aca2]">45 页全册目录指南</span>
            </div>

            <div className="relative z-10 my-auto grid md:grid-cols-2 gap-6 py-4">
              <div className="space-y-3">
                <h2 className="font-serif text-2xl text-[#f6f2eb]">八大章节，收录 219 款作品与商业合作全景。</h2>
                <p className="text-xs text-[#b4aca2] leading-relaxed">
                  按品牌起源、蒸馏检测、四大系列、检索图谱与商业落地方案逻辑编排，方便阅读与商务采购。
                </p>
                <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <p className="font-serif text-xs text-[#d2c4ad] mb-1">“从极境撷取芳香，因世界元于一息。”</p>
                  <p className="text-[10px] text-[#b4aca2]">ORIGINAL HARMONY SANCTUARY · 支持电子版与高清 JPEG 导出。</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                {[
                  { no: '01', title: '品牌原点与故事', page: 'P.01 - P.09' },
                  { no: '02', title: '元系列 (118款) 单方与基础油', page: 'P.10 - P.19' },
                  { no: '03', title: '合系列 (50款) 身心灵协同复方', page: 'P.20 - P.23' },
                  { no: '04', title: '生系列 (41款) 有机纯露水相', page: 'P.24 - P.27' },
                  { no: '05', title: '香系列 (10款) 空间扩香与器物', page: 'P.28 - P.30' },
                  { no: '06', title: '219款 完整索引与矩阵', page: 'P.31 - P.34' },
                  { no: '07', title: '商业方案与空间定制', page: 'P.35 - P.44' },
                  { no: '08', title: '官方联系与展厅', page: 'P.45' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <span className="font-serif text-xs text-[#d2c4ad] font-bold">{item.no}</span>
                      <span className="text-xs text-[#f6f2eb]">{item.title}</span>
                    </div>
                    <span className="text-[10px] text-[#d2c4ad] font-mono">{item.page}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>UNIO AROMA MANUAL</span>
              <span className="font-mono">04 / 45</span>
            </div>
          </>
        );

      // P05: Brand Core Philosophy & 4 Pillars
      case 4:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.05 · Brand Philosophy / 核心主张</div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#f6f2eb]">元香不是单一产品，而是一套可持续生长的芳香秩序。</h2>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3.5 my-auto">
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-[#d2c4ad] font-serif font-bold">
                  <Award className="w-4 h-4" />
                  <span>纯正天然与源头检定</span>
                </div>
                <p className="text-xs text-[#b4aca2]">沿用早期档案中严选的全球原生与有机蒸馏原料，具备 COA / MSDS 专业报告。</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-[#d2c4ad] font-serif font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>一人一方与配方算法</span>
                </div>
                <p className="text-xs text-[#b4aca2]">结合芳疗师 20 年经验与智能匹配系统，针对个人体质与状态调配专属方案。</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-[#d2c4ad] font-serif font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>三大研发工作室</span>
                </div>
                <p className="text-xs text-[#b4aca2]">成都、宁波、泰国芭提雅三地工作室，提供产地观察与多元气味试验。</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-[#d2c4ad] font-serif font-bold">
                  <BookOpen className="w-4 h-4" />
                  <span>元/合/生/香 四大系列</span>
                </div>
                <p className="text-xs text-[#b4aca2]">219 款产品构成完备体系，涵盖单方、基础油、复方、纯露与空间器物。</p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>CORE PHILOSOPHY</span>
              <span className="font-mono">05 / 45</span>
            </div>
          </>
        );

      // P06: Global Origin Sourcing Map
      case 5:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.06 · Global Origins / 全球原产地地图</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">寻找最适宜气味落脚的原产地。</h2>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3 my-auto">
              <div className="md:col-span-2 grid grid-cols-2 gap-2">
                {[
                  { country: '法国 Provence', items: '真正薰衣草 / 鼠尾草', icon: '🇫🇷' },
                  { country: '保加利亚 Kazanlak', items: '大马士革玫瑰', icon: '🇧🇬' },
                  { country: '意大利 Calabria', items: '佛手柑 / 苦橙叶', icon: '🇮🇹' },
                  { country: '马达加斯加', items: '依兰依兰 / 绿花白千层', icon: '🇲🇬' },
                  { country: '澳洲 NSW', items: '茶树 / 尤加利', icon: '🇦🇺' },
                  { country: '印度 Mysore', items: '老山檀香 / 岩兰草', icon: '🇮🇳' },
                ].map((loc, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-0.5">
                    <span className="text-xs">{loc.icon}</span>
                    <div className="font-serif text-xs text-[#d2c4ad] font-bold">{loc.country}</div>
                    <p className="text-[10px] text-[#b4aca2]">{loc.items}</p>
                  </div>
                ))}
              </div>
              <div className="md:col-span-1 h-full min-h-[160px]">
                <ImagePlaceholderBox label="全球产地原植物插画 / 矢量地图预留" className="h-full min-h-[160px]" />
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>GLOBAL ORIGIN SOURCING</span>
              <span className="font-mono">06 / 45</span>
            </div>
          </>
        );

      // P07: Distillation & Extraction Standards
      case 6:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.07 · Extraction Standards / 萃取与蒸馏工艺</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">遵循物理冷压与铜锅低温蒸馏法则。</h2>
            </div>

            <div className="relative z-10 grid md:grid-cols-3 gap-3 my-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-mono font-bold block">01 / 水蒸气蒸馏</span>
                <p className="text-xs text-[#f6f2eb] font-serif">Low-Temp Steam Distillation</p>
                <p className="text-[11px] text-[#b4aca2] leading-relaxed">
                  专用于花叶与树脂。精准控制蒸汽压力与温度，保留植物完整活性芳香分子。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-mono font-bold block">02 / 首道头道蒸馏</span>
                <p className="text-xs text-[#f6f2eb] font-serif">First-Fraction Hydrosol</p>
                <p className="text-[11px] text-[#b4aca2] leading-relaxed">
                  生系列 31 款纯露仅冷凝萃取第一阶段饱和水相，富含高浓度微量溶脂性精油分子。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-mono font-bold block">03 / 物理冷压萃取</span>
                <p className="text-xs text-[#f6f2eb] font-serif">Cold-Pressed Botanical Oil</p>
                <p className="text-[11px] text-[#b4aca2] leading-relaxed">
                  柑橘果皮与基础植物油采用全程低温物理榨压，不使用化学溶剂萃取。
                </p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>EXTRACTION & DISTILLATION</span>
              <span className="font-mono">07 / 45</span>
            </div>
          </>
        );

      // P08: Quality Assurance & Testing Standards
      case 7:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.08 · Testing & Safety / 国际检测与安全规范</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">每批次均具备完整质检档案。</h2>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-4 my-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#d2c4ad] font-bold">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>GC-MS 色谱/质谱联用图谱</span>
                </div>
                <p className="text-xs text-[#b4aca2] leading-relaxed">
                  精准测定单方精油中包含的成百上千种挥发性化合物比重，确保无添加人工合成单体香料或重金属残留。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#d2c4ad] font-bold">
                  <Award className="w-5 h-5 text-amber-300" />
                  <span>COA 与 MSDS 国际安全认证</span>
                </div>
                <p className="text-xs text-[#b4aca2] leading-relaxed">
                  完全符合 IFRA（国际香料协会）安全限量标准，具备完整 MSDS 材料安全数据表，支持商业空间与理疗机构无忧采购。
                </p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>QUALITY & TESTING</span>
              <span className="font-mono">08 / 45</span>
            </div>
          </>
        );

      // P09: Three Major R&D Studios
      case 8:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.09 · Three R&D Studios / 三大实验室</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">成都 · 宁波 · 泰国芭提雅 跨域研发。</h2>
            </div>

            <div className="relative z-10 grid md:grid-cols-3 gap-3 my-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-mono font-bold block">CHENGDU STUDIO</span>
                <h4 className="font-serif text-sm text-[#f6f2eb]">成都 · 配方与一人一方中心</h4>
                <p className="text-[11px] text-[#b4aca2]">负责芳疗个案记录、一人一方调配诊断与智能配方算法迭代。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-mono font-bold block">NINGBO STUDIO</span>
                <h4 className="font-serif text-sm text-[#f6f2eb]">宁波 · 空间美学与器物工坊</h4>
                <p className="text-[11px] text-[#b4aca2]">专注于紫晶瓶包装、手作无火扩香与美学器物设计与打样。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-mono font-bold block">PATTAYA STUDIO</span>
                <h4 className="font-serif text-sm text-[#f6f2eb]">芭提雅 · 亚热带植物基地</h4>
                <p className="text-[11px] text-[#b4aca2]">开展热带花卉、树脂萃取与跨国芳香植物栽培实验。</p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>R&D STUDIOS</span>
              <span className="font-mono">09 / 45</span>
            </div>
          </>
        );

      // P10: Yuan Series Overview (118 Single Oils & Base Oils)
      case 9:
        return (
          <>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold">
                  YUAN SERIES OVERVIEW / 元系列 118款总览
                </span>
                <span className="text-[10px] text-[#b4aca2] font-mono">118 ITEMS</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#f6f2eb]">
                元 · 植物单方精油与基础植物油
              </h2>
              <p className="text-xs text-[#b4aca2] leading-relaxed">
                按五行“金 · 木 · 水 · 火 · 土”五种植物气能，结合 39 款冷压基础植物油，构成了包含 118 款天然植物萃取物的单方典藏库。
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-2.5 my-auto text-xs">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="font-serif text-sm text-[#d2c4ad] font-bold block">金系 Metal (18款)</span>
                <span className="text-[10px] text-[#b4aca2]">呼吸、理气与清澈 (尤加利、白千层)</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="font-serif text-sm text-[#d2c4ad] font-bold block">木系 Wood (32款)</span>
                <span className="text-[10px] text-[#b4aca2]">疏肝、舒展与森林气息 (冷杉、丝柏)</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="font-serif text-sm text-[#d2c4ad] font-bold block">水系 Water (11款)</span>
                <span className="text-[10px] text-[#b4aca2]">固本、沉静与深层下行 (岩兰草、檀香)</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="font-serif text-sm text-[#d2c4ad] font-bold block">火系 Fire (9款)</span>
                <span className="text-[10px] text-[#b4aca2]">温煦、欢愉与心轮开启 (依兰、甜橙)</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="font-serif text-sm text-[#d2c4ad] font-bold block">土系 Earth (9款)</span>
                <span className="text-[10px] text-[#b4aca2]">中正、归元与消化理气 (小豆蔻、茴香)</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="font-serif text-sm text-[#d2c4ad] font-bold block">基础油 Base Oils (39款)</span>
                <span className="text-[10px] text-[#b4aca2]">冷压稀释油与浸泡油脂 (荷荷巴、阿甘)</span>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>YUAN SERIES ARCHIVE</span>
              <span className="font-mono">10 / 45</span>
            </div>
          </>
        );

      // P11: Yuan Metal Element (18 Single Oils)
      case 10:
        return renderYuanSpread('jin', '金系 Metal (18款) · 呼吸与理气', '以白千层、尤加利、乳香等为主，清醒通透，舒缓上呼吸道。', 11);

      // P12: Yuan Wood Element Part 1 (16 Single Oils)
      case 11:
        return renderYuanSpread('mu', '木系 Wood Part 1 (16款) · 疏肝与舒展', '包含松针、丝柏、樟树等，散发郁郁森林气息，提升机体活力。', 12);

      // P13: Yuan Wood Element Part 2 (16 Single Oils)
      case 12:
        return renderYuanSpread('mu2', '木系 Wood Part 2 (16款) · 树脂与森林沉降', '包含沉香、冷杉、杜松子等珍稀木质萃取，带来安稳与静心支持。', 13);

      // P14: Yuan Water Element (11 Single Oils)
      case 13:
        return renderYuanSpread('shui', '水系 Water (11款) · 固本与沉静', '岩兰草、老山檀香、广藿香等根部与深层油脂，凝神固本。', 14);

      // P15: Yuan Fire Element (9 Single Oils)
      case 14:
        return renderYuanSpread('huo', '火系 Fire (9款) · 温煦与欢愉', '依兰依兰、甜橙、黑胡椒等，唤醒热情与温暖能量。', 15);

      // P16: Yuan Earth Element (9 Single Oils)
      case 15:
        return renderYuanSpread('tu', '土系 Earth (9款) · 中正与归元', '小豆蔻、藏茴香、莳萝等，温和理气，帮助运化与接地感。', 16);

      // P17: Base Oils Part 1 (20 Vegetable Oils)
      case 16:
        return renderBaseOilSpread('part1', '基础植物油 Part 1 (20款) · 冷压油脂', '荷荷巴油、阿甘油、甜杏仁油等高纯度调配基底。', 17);

      // P18: Base Oils Part 2 (19 Vegetable Oils & Herbal Infusions)
      case 17:
        return renderBaseOilSpread('part2', '基础植物油 Part 2 (19款) · 稀有与浸泡油', '圣约翰草浸泡油、金盏花油、玫瑰果油等强效修护油脂。', 18);

      // P19: Yuan Formulation & Blending Dilution Guide
      case 18:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.19 · Blending Science / 单方精油调配与稀释比例</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">科学稀释，发挥植物最大协同效应。</h2>
            </div>

            <div className="relative z-10 grid md:grid-cols-3 gap-3 my-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-mono font-bold block">1% 敏感/面部比例</span>
                <p className="text-xs text-[#f6f2eb] font-serif">10ml 基础油 + 2 滴精油</p>
                <p className="text-[10px] text-[#b4aca2]">适用于面部日常护理、眼周及敏感肌肤安抚。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-mono font-bold block">2.5% 身体日常比例</span>
                <p className="text-xs text-[#f6f2eb] font-serif">10ml 基础油 + 5 滴精油</p>
                <p className="text-[10px] text-[#b4aca2]">适用于全身按摩、肩颈放松及日常淋巴理疗。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-mono font-bold block">5% 局部调理比例</span>
                <p className="text-xs text-[#f6f2eb] font-serif">10ml 基础油 + 10 滴精油</p>
                <p className="text-[10px] text-[#b4aca2]">适用于关节、肌肉紧绷或特定局部高强度护理。</p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>BLENDING DILUTION GUIDE</span>
              <span className="font-mono">19 / 45</span>
            </div>
          </>
        );

      // P20: He (合) Series Overview (15 Synergistic Blends)
      case 19:
        return (
          <>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold">
                  HE SERIES OVERVIEW / 合系列 50款协同复方
                </span>
                <span className="text-[10px] text-[#b4aca2] font-mono">50 BLENDS</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#f6f2eb]">
                合 · 身 · 心 · 灵 三维协同复方
              </h2>
              <p className="text-xs text-[#b4aca2] leading-relaxed">
                针对现代都市人群的健康需求，将多重单方精油按分子协同效应精准复配，分为“身 Body · 心 Mind · 灵 Soul”三大维度，共 50 款复方作品。
              </p>
            </div>

            <div className="relative z-10 grid md:grid-cols-3 gap-3 my-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-bold block">身 Body · 身体平衡 (17款)</span>
                <p className="text-[11px] text-[#b4aca2]">归元、清肌、舒敏、通络、焕能等 17 款身体护理复方。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-bold block">心 Mind · 情绪安定 (17款)</span>
                <p className="text-[11px] text-[#b4aca2]">安神、定心、解忧、舒压、清解等 17 款心灵释压复方。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-bold block">灵 Soul · 精神冥想 (16款)</span>
                <p className="text-[11px] text-[#b4aca2]">开悟、寻真、禅意、灵感、觉照等 16 款灵魂潜修复方。</p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>HE SERIES OVERVIEW</span>
              <span className="font-mono">20 / 45</span>
            </div>
          </>
        );

      // P21: Body Care Blends (17 Blends)
      case 20:
        return renderHeSubgroupSpread('body', '身 Body · 17款身体平衡复方', '关注肌肉张力、血液循环与生理节律照护。', 21);

      // P22: Mind Care Blends (17 Blends)
      case 21:
        return renderHeSubgroupSpread('mind', '心 Mind · 17款情绪减压复方', '安抚焦虑、改善睡眠质量与平复思绪。', 22);

      // P23: Soul Care Blends (16 Blends)
      case 22:
        return renderHeSubgroupSpread('soul', '灵 Soul · 16款冥想灵感复方', '助益瑜伽、禅修与深层自我对话。', 23);

      // P24: Sheng (生) Series Overview (41 Organic Hydrosols)
      case 23:
        return (
          <>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold">
                  SHENG SERIES OVERVIEW / 生系列 41款纯露水相
                </span>
                <span className="text-[10px] text-[#b4aca2] font-mono">41 HYDROSOLS</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#f6f2eb]">
                生 · 有机头道蒸馏水相
              </h2>
              <p className="text-xs text-[#b4aca2] leading-relaxed">
                蒸馏天然植物时冷凝结晶的首道纯露水，富含植物水溶性活性成分与微量精油，分为清净、润养与舒缓三大水相。
              </p>
            </div>

            <div className="relative z-10 grid md:grid-cols-3 gap-3 my-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-bold block">清净 Purify (14款)</span>
                <p className="text-[11px] text-[#b4aca2]">茶树、迷迭香、橙花等水油平衡水相。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-bold block">润养 Nourish (14款)</span>
                <p className="text-[11px] text-[#b4aca2]">大马士革玫瑰、天竺葵等弹润保湿水相。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-bold block">舒缓 Soothe (13款)</span>
                <p className="text-[11px] text-[#b4aca2]">罗马洋甘菊、薰衣草等敏感退红水相。</p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>SHENG SERIES OVERVIEW</span>
              <span className="font-mono">24 / 45</span>
            </div>
          </>
        );

      // P25: Purify Hydrosols (14 Hydrosols)
      case 24:
        return renderShengSubgroupSpread('purify', '清净系 Purify (14款) · 水油平衡与收敛', '净化毛孔、调理油脂与收敛肤感。', 25);

      // P26: Nourish Hydrosols (14 Hydrosols)
      case 25:
        return renderShengSubgroupSpread('nourish', '润养系 Nourish (14款) · 深度补水与弹润', '强健屏障、改善暗沉与深度注水。', 26);

      // P27: Soothe Hydrosols (13 Hydrosols)
      case 26:
        return renderShengSubgroupSpread('soothe', '舒缓系 Soothe (13款) · 敏感修护与退红', '抚平刺痛、安抚泛红与脆弱肌肤修护。', 27);

      // P28: Jing (香) Series Overview (10 Space & Lifestyle Objects)
      case 27:
        return (
          <>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold">
                  JING SERIES OVERVIEW / 香系列 10款空间与器物
                </span>
                <span className="text-[10px] text-[#b4aca2] font-mono">10 OBJECTS</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#f6f2eb]">
                香 · 空间扩香与手作禅意器物
              </h2>
              <p className="text-xs text-[#b4aca2] leading-relaxed">
                让气味延伸至居室空间与日常仪式中。包含 5 款无火扩香/喷雾，与 5 款手作线香与黄铜托盘器物。
              </p>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-4 my-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-bold block">香境 Realm (5款)</span>
                <p className="text-xs text-[#b4aca2]">空间气味喷雾、天然火山石扩香礼盒与无火精油扩香。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs text-[#d2c4ad] font-bold block">禅思 Zen (5款)</span>
                <p className="text-xs text-[#b4aca2]">原生沉香线香、手作黄铜香座与竹木收纳托盘。</p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>JING SERIES OVERVIEW</span>
              <span className="font-mono">28 / 45</span>
            </div>
          </>
        );

      // P29: Scent Realm Objects (5 Items)
      case 28:
        return renderJingSubgroupSpread('realm', '香境 Realm (5款) · 空间扩香与喷雾', '以气味重构空间氛围与居室节奏。', 29);

      // P30: Zen Contemplation Objects (5 Items)
      case 29:
        return renderJingSubgroupSpread('zen', '禅思 Zen (5款) · 沉香线香与手作器物', '静心品香与手工质感器物。', 30);

      // P31: Master Catalog Index Part 1 (Yuan Series 118 Codes)
      case 30:
        return (
          <>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#d2c4ad]" />
                  <span>MASTER INDEX PART 1 / 219款图谱 (元系列 118款单方与基底)</span>
                </span>
                <span className="text-[10px] text-[#b4aca2] font-mono bg-white/10 px-2 py-0.5 rounded">118 ITEMS · FULL SPECTRUM</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-lg text-[#f6f2eb]">元系列 (Yuan Series) 118 款单方精油与植物基底油总案</h3>
                <span className="text-[10px] text-[#d2c4ad] font-mono">GC-MS 色谱档案备查 · 全球产地直供</span>
              </div>
              {/* Category Summary Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono border-y border-white/10 py-1.5 text-[#b4aca2]">
                <div><span className="text-[#d2c4ad] font-bold">56款</span> 经典花草木果单方</div>
                <div><span className="text-[#d2c4ad] font-bold">32款</span> 元境珍稀高阶萃取</div>
                <div><span className="text-[#d2c4ad] font-bold">30款</span> 冷压有机植物基底油</div>
                <div><span className="text-[#d2c4ad] font-bold">100%</span> 纯自然无化学添加</div>
              </div>
            </div>

            <div className="relative z-10 my-auto overflow-y-auto min-h-[520px] max-h-[660px] pr-1 space-y-2 no-scrollbar">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1.5 text-[10px]">
                {yuanProducts.map((p) => (
                  <div 
                    key={p.code} 
                    onClick={() => onSelectProduct(p)}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#d2c4ad] hover:bg-white/12 cursor-pointer transition-all flex flex-col justify-between space-y-0.5 group"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[#d2c4ad] font-mono font-bold text-[9px]">{p.code}</span>
                        <span className="text-[#b4aca2] font-mono text-[8px] bg-black/40 px-1 rounded">{p.prices[0]}</span>
                      </div>
                      <h4 className="font-serif text-[11px] text-[#f6f2eb] font-bold truncate group-hover:text-[#d2c4ad] transition-colors">{p.cn}</h4>
                      <p className="text-[8px] text-[#b4aca2] font-mono truncate">{p.latinName || p.en}</p>
                    </div>
                    <div className="border-t border-white/10 pt-0.5 flex items-center justify-between text-[8px] text-[#d2c4ad]/80 font-mono">
                      <span className="truncate">{p.origin || '全球原萃'}</span>
                      <span className="text-[7px] text-[#b4aca2]">属{p.subgroup || '五行'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-2 flex justify-between items-center text-xs text-[#b4aca2]">
              <span>YUAN SERIES MASTER INDEX · 点击任意条目即可调取 100% 原产地检定卡</span>
              <span className="font-mono">31 / 45</span>
            </div>
          </>
        );

      // P32: Master Catalog Index Part 2 (He & Sheng Series Codes)
      case 31:
        return (
          <>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5 text-[#d2c4ad]" />
                  <span>MASTER INDEX PART 2 / 合系列 (50款复方) & 生系列 (41款有机纯露)</span>
                </span>
                <span className="text-[10px] text-[#b4aca2] font-mono bg-white/10 px-2 py-0.5 rounded">91 ITEMS</span>
              </div>
              <h3 className="font-serif text-lg text-[#f6f2eb]">合系列 (身心灵协力复方) 与生系列 (活性水相纯露) 检索矩阵</h3>
            </div>

            <div className="relative z-10 my-auto overflow-y-auto min-h-[520px] max-h-[660px] pr-1 space-y-4 no-scrollbar text-[10px]">
              {/* He Series Box */}
              <div>
                <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-white/10">
                  <span className="text-[#d2c4ad] font-serif font-bold text-xs flex items-center gap-1.5">
                    <span>合系列 · 50款身心灵协同复方 (He Synergy Blends)</span>
                  </span>
                  <span className="text-[9px] font-mono text-[#b4aca2]">一人一方前诊与日常身心气场调和</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1.5">
                  {heProducts.map((p) => (
                    <div 
                      key={p.code} 
                      onClick={() => onSelectProduct(p)} 
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#d2c4ad] hover:bg-white/10 cursor-pointer transition-all flex flex-col justify-between space-y-0.5"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[8px]">
                          <span className="text-[#d2c4ad] font-mono font-bold">{p.code}</span>
                          <span className="text-[#b4aca2] font-mono">{p.prices[0]}</span>
                        </div>
                        <h4 className="font-serif text-[11px] text-[#f6f2eb] font-bold truncate">{p.cn}</h4>
                      </div>
                      <p className="text-[8px] text-[#b4aca2] truncate font-sans">{p.shortDesc || p.en}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sheng Series Box */}
              <div>
                <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-white/10">
                  <span className="text-[#d2c4ad] font-serif font-bold text-xs flex items-center gap-1.5">
                    <span>生系列 · 41款蒸馏有机植物纯露 (Sheng Hydrosols)</span>
                  </span>
                  <span className="text-[9px] font-mono text-[#b4aca2]">细密温和水相微小水分子</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1.5">
                  {shengProducts.map((p) => (
                    <div 
                      key={p.code} 
                      onClick={() => onSelectProduct(p)} 
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#d2c4ad] hover:bg-white/10 cursor-pointer transition-all flex flex-col justify-between space-y-0.5"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[8px]">
                          <span className="text-[#d2c4ad] font-mono font-bold">{p.code}</span>
                          <span className="text-[#b4aca2] font-mono">{p.prices[0]}</span>
                        </div>
                        <h4 className="font-serif text-[11px] text-[#f6f2eb] font-bold truncate">{p.cn}</h4>
                      </div>
                      <p className="text-[8px] text-[#b4aca2] truncate font-sans">{p.latinName || p.en}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-2 flex justify-between items-center text-xs text-[#b4aca2]">
              <span>HE & SHENG MASTER INDEX · 点击项目查看配方成分与试香感受</span>
              <span className="font-mono">32 / 45</span>
            </div>
          </>
        );

      // P33: Master Catalog Index Part 3 (Jing Series & Price Distribution)
      case 32:
        return (
          <>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#d2c4ad]" />
                  <span>MASTER INDEX PART 3 / 香系列 (10款器物) & 全系价格梯度结构</span>
                </span>
                <span className="text-[10px] text-[#b4aca2] font-mono bg-white/10 px-2 py-0.5 rounded">10 ITEMS + TIER ANALYSIS</span>
              </div>
              <h3 className="font-serif text-lg text-[#f6f2eb]">香系列 (Jing Ambient Objects) 与 219 款全图谱价格金字塔</h3>
            </div>

            <div className="relative z-10 my-auto space-y-4 text-xs max-h-[460px] overflow-y-auto no-scrollbar">
              <div>
                <span className="text-[#d2c4ad] font-serif font-bold block mb-2 text-xs">香系列 · 10款空间香氛与禅思器物 (Jing Realm & Zen)</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-[10px]">
                  {jingProducts.map((p) => (
                    <div key={p.code} onClick={() => onSelectProduct(p)} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#d2c4ad] cursor-pointer flex flex-col justify-between space-y-1">
                      <div>
                        <div className="flex justify-between text-[9px]">
                          <strong className="text-[#d2c4ad] font-mono">{p.code}</strong>
                          <span className="text-[#b4aca2] font-mono">{p.prices[0]}</span>
                        </div>
                        <h4 className="font-serif font-bold text-[#f6f2eb] truncate text-xs mt-0.5">{p.cn}</h4>
                      </div>
                      <p className="text-[8px] text-[#b4aca2] truncate">{p.shortDesc || '空间意境香气'}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extended Rich Price Gradient Box */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[#d2c4ad] font-serif font-bold text-xs">UNIO 219 款作品四阶价格金字塔</span>
                  <span className="text-[10px] font-mono text-[#b4aca2]">零售与 VIP 尊享价全覆盖</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-[10px]">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-[#d2c4ad] font-bold block text-xs">¥128 - ¥268</span>
                    <span className="text-[#f6f2eb] font-semibold block">入门感知阶 · 41款</span>
                    <p className="text-[#b4aca2] text-[9px] leading-relaxed">有机蒸馏纯露、经典单方入门款（甜橙、薄荷、尤加利）及试香卡包。</p>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-[#d2c4ad] font-bold block text-xs">¥280 - ¥480</span>
                    <span className="text-[#f6f2eb] font-semibold block">日常疗愈阶 · 112款</span>
                    <p className="text-[#b4aca2] text-[9px] leading-relaxed">合系列 50 款复方精油、高品质单方（大西洋雪松、高地薰衣草、茶树）。</p>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-[#d2c4ad] font-bold block text-xs">¥580 - ¥980</span>
                    <span className="text-[#f6f2eb] font-semibold block">进阶结界阶 · 48款</span>
                    <p className="text-[#b4aca2] text-[9px] leading-relaxed">珍稀花朵萃取（罗马洋甘菊、橙花）、香系列扩香器物与商业定制香氛。</p>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-[#d2c4ad] font-bold block text-xs">¥1280 - ¥3200</span>
                    <span className="text-[#f6f2eb] font-semibold block">元境珍藏阶 · 18款</span>
                    <p className="text-[#b4aca2] text-[9px] leading-relaxed">印度老山檀香、大马士革玫瑰纯精油、野生沉香纯油与高定尊享木盒。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-2 flex justify-between items-center text-xs text-[#b4aca2]">
              <span>JING INDEX & COMPLETE PRICE TIER SYSTEM</span>
              <span className="font-mono">32 / 45</span>
            </div>
          </>
        );

      // P34: Digital Interactive Search Gateway
      case 33:
        return (
          <>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold">
                  INTERACTIVE SEARCH GATEWAY / 全网动态交互检索
                </span>
                <span className="text-[10px] text-[#b4aca2] font-mono">ONLINE TOOL</span>
              </div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">随时开启 219 款作品多维度搜索。</h2>
              <p className="text-xs text-[#b4aca2]">
                可按中文名、英文名、植物学名、拉丁学名、产地、提取部位、价格与五行归属秒级筛选。
              </p>
            </div>

            <div className="relative z-10 my-auto text-center space-y-4 p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 max-w-lg mx-auto">
              <Search className="w-8 h-8 text-[#d2c4ad] mx-auto" />
              <h3 className="font-serif text-xl text-[#f6f2eb]">进入 UNIO 交互式产品目录库</h3>
              <p className="text-xs text-[#b4aca2]">包含详细成分比例、COA 检测卡与调配建议。</p>
              <button
                onClick={onNavigateToCatalog}
                className="px-6 py-2.5 rounded-full bg-[#d2c4ad] text-[#0c120e] text-xs font-bold hover:brightness-110 transition-all shadow-lg"
              >
                启动 219 款全功能搜索 Filter
              </button>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>INTERACTIVE SEARCH</span>
              <span className="font-mono">34 / 45</span>
            </div>
          </>
        );

      // P35: Commercial Space & Hotel/Spa Solutions
      case 34:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.35 · Commercial Scenting / 商业空间与高端酒店SPA香氛</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">精品美学酒店 · 高端 SPA · 艺术展厅空间</h2>
            </div>

            <div className="relative z-10 grid md:grid-cols-3 gap-3 my-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <Building className="w-5 h-5 text-[#d2c4ad]" />
                <h4 className="font-serif text-sm text-[#f6f2eb]">精品美学酒店</h4>
                <p className="text-[11px] text-[#b4aca2] leading-relaxed">公区新风冷香扩香、客房睡眠安抚备品与专属气味卡片。</p>
                <div className="text-[10px] text-[#d2c4ad] pt-1 font-mono">冷香扩香 · 睡眠备品</div>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <Heart className="w-5 h-5 text-[#d2c4ad]" />
                <h4 className="font-serif text-sm text-[#f6f2eb]">高端 SPA & 疗愈馆</h4>
                <p className="text-[11px] text-[#b4aca2] leading-relaxed">一人一方前诊精油调配、身体按摩基底油与有机纯露敷面。</p>
                <div className="text-[10px] text-[#d2c4ad] pt-1 font-mono">前诊调配 · 按摩油</div>
              </div>

              <div className="p-4 rounded-xl bg-[#1c2923] border border-white/10 space-y-2">
                <Leaf className="w-5 h-5 text-[#d2c4ad]" />
                <h4 className="font-serif text-sm text-[#f6f2eb]">瑜伽与冥想美学空间</h4>
                <p className="text-[11px] text-[#b4aca2] leading-relaxed">灵系复方天然无火扩香、手作沉香线香与氛围空间喷雾。</p>
                <div className="text-[10px] text-[#d2c4ad] pt-1 font-mono">无火扩香 · 沉香线香</div>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>COMMERCIAL SOLUTIONS</span>
              <span className="font-mono">35 / 45</span>
            </div>
          </>
        );

      // P36: Corporate Group Customization & VIP Gifts
      case 35:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.36 · Corporate Gifts / 企业团体订制与VIP尊享礼盒</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">节日礼赠 · 年会伴手礼 · 品牌专属烫印</h2>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-4 my-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif text-[#d2c4ad] font-bold">企业高级礼盒定制 Custom Gifts</span>
                  <span className="text-[9px] bg-[#d2c4ad]/20 text-[#d2c4ad] px-2 py-0.5 rounded font-mono">MOQ 50 套起</span>
                </div>
                <p className="text-xs text-[#b4aca2] leading-relaxed">
                  定制紫晶瓶烫金 Logo、专属香气卡与高定手作木质香盒，为端午、中秋及品牌周年庆提供高雅尊荣礼赠。
                </p>
                <div className="pt-2 text-[10px] text-[#d2c4ad] font-serif border-t border-white/10">
                  支持定制：瓶身刻字 / 烫金卡片 / 木盒激光雕刻 / 封套设计
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif text-[#d2c4ad] font-bold">VIP 客户专属调配 VIP Salon</span>
                  <span className="text-[9px] bg-[#d2c4ad]/20 text-[#d2c4ad] px-2 py-0.5 rounded font-mono">专属气味档案</span>
                </div>
                <p className="text-xs text-[#b4aca2] leading-relaxed">
                  为银行、高尔夫俱乐部、车主会等高端 VIP 客户提供定制调香体验，并建立永久追溯的气味档案。
                </p>
                <div className="pt-2 text-[10px] text-[#d2c4ad] font-serif border-t border-white/10">
                  包含服务：一对一诊疗问讯 / 调香师定制 / 个人调配配方留存
                </div>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>CORPORATE GIFTS</span>
              <span className="font-mono">36 / 45</span>
            </div>
          </>
        );

      // P37: Nature Spectrum (Flowers, Plants, Stones, Mountains, Lakes, Rivers, Oceans)
      case 36:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.37 · Nature Spectrum / 元境自然图谱：花草石山河湖海</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">万物有灵 · 取法自然 · 身心共振</h2>
            </div>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-2.5 my-auto text-xs">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                <span className="text-[#d2c4ad] font-bold block">🌸 花 (Flowers)</span>
                <p className="text-[10px] text-[#b4aca2]">大马士革玫瑰 · 茉莉 · 洋甘菊。抚慰情绪，滋养女性心气。</p>
              </div>

              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                <span className="text-[#d2c4ad] font-bold block">🌿 草/森林 (Forests)</span>
                <p className="text-[10px] text-[#b4aca2]">高原薰衣草 · 薄荷 · 尤加利 · 沉香冷杉。净化空间，畅通呼吸。</p>
              </div>

              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                <span className="text-[#d2c4ad] font-bold block">🪨 石 (Stones/Aroma)</span>
                <p className="text-[10px] text-[#b4aca2]">火山岩 · 紫水晶 · 汉白玉香盘。扩香媒介与金石质感相映。</p>
              </div>

              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                <span className="text-[#d2c4ad] font-bold block">⛰️ 山/雪山 (Mountains)</span>
                <p className="text-[10px] text-[#b4aca2]">喜马拉雅雪松 · 高山冰川泉水。沉稳定轴，接地生根。</p>
              </div>

              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1 col-span-2 md:col-span-2">
                <span className="text-[#d2c4ad] font-bold block">🌊 河/湖/海 (Waters & Oceans)</span>
                <p className="text-[10px] text-[#b4aca2]">元境水相蒸馏纯露 · 海盐冷萃 · 澄澈如镜的深层心灵疗愈。</p>
              </div>

              <div className="p-3 rounded-xl bg-[#1c2923] border border-white/10 space-y-1 col-span-2 md:col-span-2">
                <span className="text-[#d2c4ad] font-bold block">❄️ 冰雪/松针 (Glacier Ice)</span>
                <p className="text-[10px] text-[#b4aca2]">清冽透彻的空气质感，将雪山冰川的纯净能量注入每一滴作品。</p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>NATURE SPECTRUM</span>
              <span className="font-mono">37 / 45</span>
            </div>
          </>
        );

      // P38: White Label & OEM/ODM Manufacturing
      case 37:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.38 · OEM/ODM Manufacturing / 高定配方代工与配方研发</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">三大工作室研发 · 柔性起订 · 标准灌装</h2>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-4 my-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs font-serif text-[#d2c4ad] font-bold block">高定配方打样 Formula R&D</span>
                <p className="text-xs text-[#b4aca2] leading-relaxed">
                  依托 23 年临床经验与 219 款成熟作品库，最快 7 天内完成专属香气配方打样与色谱检测。
                </p>
                <div className="pt-2 text-[10px] text-[#d2c4ad] font-serif border-t border-white/10">
                  配方储备：219+ 现成配方 / 单批次 GC-MS 检测保障
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs font-serif text-[#d2c4ad] font-bold block">小批量柔性灌装 Flexible Production</span>
                <p className="text-xs text-[#b4aca2] leading-relaxed">
                  打破传统代工工厂高门槛，支持百件级小批量灌装与贴牌，降低独立品牌试错成本。
                </p>
                <div className="pt-2 text-[10px] text-[#d2c4ad] font-serif border-t border-white/10">
                  支持起订：最小 100 瓶起灌 / 紫晶瓶与环保包材全套匹配
                </div>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>OEM/ODM MANUFACTURING</span>
              <span className="font-mono">38 / 45</span>
            </div>
          </>
        );

      // P39: Corporate Wellness & Employee Salons
      case 38:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.39 · Corporate Wellness / 企业健康与员工芳疗减压工作坊</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">企业团建 · 高管减压 · 线下手作工作坊</h2>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-4 my-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <Users className="w-5 h-5 text-[#d2c4ad]" />
                <h4 className="font-serif text-sm text-[#f6f2eb]">企业员工减压芳疗课</h4>
                <p className="text-xs text-[#b4aca2] leading-relaxed">
                  为知名企业 HR 团队提供“职场香气减压”体验课，指导员工现场手作个性化滚珠精油与睡眠喷雾。
                </p>
                <div className="text-[10px] text-[#d2c4ad] font-mono">改善睡眠 · 提振专注</div>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <Sparkles className="w-5 h-5 text-[#d2c4ad]" />
                <h4 className="font-serif text-sm text-[#f6f2eb]">高管私人定制静心研习</h4>
                <p className="text-xs text-[#b4aca2] leading-relaxed">
                  在竹林与茶室空间为高管层定制深层冥想与香气定轴仪式，释放长期经营压力。
                </p>
                <div className="text-[10px] text-[#d2c4ad] font-mono">深度冥想 · 身心安顿</div>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>CORPORATE WELLNESS</span>
              <span className="font-mono">39 / 45</span>
            </div>
          </>
        );

      // P40: Wholesale & Partner Policies
      case 39:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.40 · Partner Policies / 经销商与加盟合作政策</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">透明、稳健的合作伙伴支持体系。</h2>
            </div>

            <div className="relative z-10 grid md:grid-cols-3 gap-3 my-auto text-xs">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-[#d2c4ad] font-bold block">买手店 & 展厅配货</span>
                <p className="text-[11px] text-[#b4aca2]">低起订量试调、样品陈列托盘与陈列美学物料全套支持。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-[#d2c4ad] font-bold block">区域独家保护政策</span>
                <p className="text-[11px] text-[#b4aca2]">严格的区域价格管控体系，确保经销商合理利润与品牌形象。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-[#d2c4ad] font-bold block">定期调换货机制</span>
                <p className="text-[11px] text-[#b4aca2]">灵活的季节产品调换支持，降低合作伙伴库存周转风险。</p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>PARTNER POLICIES</span>
              <span className="font-mono">40 / 45</span>
            </div>
          </>
        );

      // P41: Brand Academy & Aromatherapy Training
      case 40:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.41 · UNIO Academy / 芳疗师培与气味沙龙</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">传递专业芳疗知识与感官美学。</h2>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-4 my-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <GraduationCap className="w-5 h-5 text-[#d2c4ad]" />
                <h4 className="font-serif text-sm text-[#f6f2eb]">芳疗师实战研修班</h4>
                <p className="text-xs text-[#b4aca2] leading-relaxed">
                  包含单方精油分子学、复方协同比重、一人一方诊断法与理疗手法研习。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <Users className="w-5 h-5 text-[#d2c4ad]" />
                <h4 className="font-serif text-sm text-[#f6f2eb]">品牌气味沙龙与体验课</h4>
                <p className="text-xs text-[#b4aca2] leading-relaxed">
                  为合作空间提供线下调香沙龙、节气气味体验与生活方式分享讲座。
                </p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>UNIO ACADEMY</span>
              <span className="font-mono">41 / 45</span>
            </div>
          </>
        );

      // P42: Sustainability & Ethical Sourcing
      case 41:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.42 · Sustainability / 可持续承诺与环保</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">尊重自然生命，守护纯净生态。</h2>
            </div>

            <div className="relative z-10 grid md:grid-cols-3 gap-3 my-auto text-xs">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-[#d2c4ad] font-bold block">100% 零残忍 (Cruelty-Free)</span>
                <p className="text-[11px] text-[#b4aca2]">绝不进行任何动物实验，所有测试均在志愿者与实验室完成。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-[#d2c4ad] font-bold block">紫晶瓶高避光可循环</span>
                <p className="text-[11px] text-[#b4aca2]">采用能够阻隔可见光的高级紫晶玻璃瓶，可反复清洗并回收。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-[#d2c4ad] font-bold block">公平贸易与有机农场</span>
                <p className="text-[11px] text-[#b4aca2]">与全球中小独立农场直接合作，支持可持续采摘与土壤保护。</p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>SUSTAINABILITY COMMITMENT</span>
              <span className="font-mono">42 / 45</span>
            </div>
          </>
        );

      // P43: Selected Client Case Studies
      case 42:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.43 · Case Studies / 精选合作空间案例</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">气味融入生活场景的真实记录。</h2>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-4 my-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#d2c4ad] font-mono font-bold block font-serif mb-1">CASE 01 · 杭州松林山居酒店</span>
                  <h4 className="font-serif text-sm text-[#f6f2eb] mb-1">山林主题专属全区香氛</h4>
                  <p className="text-xs text-[#b4aca2] leading-relaxed">
                    结合木系冷杉与水系岩兰草，为山居客房打造“入山息心”主题散香方案，提升客户留存与赞誉。
                  </p>
                </div>
                <div className="mt-3">
                  <ImagePlaceholderBox label="空间实景照片预留 / 酒店大堂或客房" className="h-28" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#d2c4ad] font-mono font-bold block font-serif mb-1">CASE 02 · 成都静心瑜伽舍</span>
                  <h4 className="font-serif text-sm text-[#f6f2eb] mb-1">灵系复方与纯露习练伴手礼</h4>
                  <p className="text-xs text-[#b4aca2] leading-relaxed">
                    引入开悟 (H-11) 与玫瑰纯露，作为会员高阶课后冷敷与芳疗伴手礼，深受会员好评。
                  </p>
                </div>
                <div className="mt-3">
                  <ImagePlaceholderBox label="空间实景照片预留 / 瑜伽舍与伴手礼" className="h-28" />
                </div>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>CASE STUDIES</span>
              <span className="font-mono">43 / 45</span>
            </div>
          </>
        );

      // P44: Partnership & Cooperation Process
      case 43:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.44 · Partnership Guide / 品牌合作与接洽流程</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">标准化商务流程 · 高效专业响应</h2>
            </div>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 my-auto text-xs">
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
                <span className="text-[10px] text-[#d2c4ad] font-mono font-bold block">STEP 01</span>
                <h4 className="font-serif text-sm text-[#f6f2eb]">需求初诊与沟通</h4>
                <p className="text-[11px] text-[#b4aca2]">明确空间调性、礼赠预算或代工需求。</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
                <span className="text-[10px] text-[#d2c4ad] font-mono font-bold block">STEP 02</span>
                <h4 className="font-serif text-sm text-[#f6f2eb]">香气寄样与打样</h4>
                <p className="text-[11px] text-[#b4aca2]">寄送 2-3 款主题香气样品与包材小样。</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
                <span className="text-[10px] text-[#d2c4ad] font-mono font-bold block">STEP 03</span>
                <h4 className="font-serif text-sm text-[#f6f2eb]">签约与打样确认</h4>
                <p className="text-[11px] text-[#b4aca2]">签署商务合同并确认生产标准样卡。</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
                <span className="text-[10px] text-[#d2c4ad] font-mono font-bold block">STEP 04</span>
                <h4 className="font-serif text-sm text-[#f6f2eb]">标准化交付与售后</h4>
                <p className="text-[11px] text-[#b4aca2]">专业冷链发货与长期使用培训指导。</p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>PARTNERSHIP GUIDE</span>
              <span className="font-mono">44 / 45</span>
            </div>
          </>
        );

      // P45: Back Cover & Contact Information
      case 44:
      default:
        return (
          <>
            <div className="relative z-10 border-b border-white/15 pb-3 flex justify-between items-center text-xs">
              <span className="tracking-[0.25em] text-[#d2c4ad] uppercase font-semibold">UNIO AROMA · ENDING NOTE</span>
              <span className="text-[#b4aca2]">P.45 · 封底与商务接洽</span>
            </div>

            <div className="relative z-10 my-auto text-center space-y-5 max-w-lg mx-auto">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0c120e] border border-[#d2c4ad]/50 flex items-center justify-center p-2 shadow-lg">
                <UnioLogo size={48} color="#d2c4ad" />
              </div>

              <h1 className="font-serif text-4xl md:text-5xl text-[#f6f2eb]">
                UNIO <span className="text-[#d2c4ad]">元香</span>
              </h1>

              <p className="text-xs md:text-sm text-[#f6f2eb]/80 leading-relaxed font-light">
                让植物、身体与空间在更长的时间里相遇。期待与您携手开启长期芳香合作。
              </p>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-left space-y-1.5 font-mono max-w-xs mx-auto text-[#d2c4ad]">
                <p>官方网站: unioaroma.com</p>
                <p>商务合作: partner@unioaroma.com</p>
                <p>微信公众号: UNIO元香官方</p>
                <p>全球展厅: 成都 · 宁波 · 芭提雅</p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/15 pt-3 text-center text-[10px] text-[#b4aca2]">
              Pure · Harmony · Life · Scent | © 2003 - 2026 UNIO AROMA. All Rights Reserved.
            </div>
          </>
        );
    }
  };

  // Helper renderers for series spreads
  const renderYuanSpread = (group: string, title: string, subtitle: string, pageNum: number) => {
    const groupMap: Record<string, string> = {
      jin: '金',
      mu: '木',
      mu2: '木',
      shui: '水',
      huo: '火',
      tu: '土',
    };
    const targetSubgroup = groupMap[group] || group;
    let prods = yuanProducts.filter((p) => p.subgroup === targetSubgroup);
    if (group === 'mu') {
      prods = prods.slice(0, 16);
    } else if (group === 'mu2') {
      prods = prods.slice(16);
    }
    if (yuanSearch) {
      prods = prods.filter((p) => matchProductWithPinyin(p, yuanSearch));
    }

    return (
      <>
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold">
              P.{String(pageNum).padStart(2, '0')} · YUAN SERIES / 元系列
            </span>
            <span className="text-[10px] text-[#b4aca2] font-mono">{prods.length} ITEMS</span>
          </div>
          <h3 className="font-serif text-lg text-[#f6f2eb]">{title}</h3>
          <p className="text-xs text-[#b4aca2]">{subtitle}</p>
        </div>

        <div className="relative z-10 my-2 flex-1 overflow-y-auto min-h-[480px] max-h-[620px] pr-1 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 no-scrollbar">
          {prods.map((p) => (
            <div
              key={p.code}
              onClick={() => onSelectProduct(p)}
              className="p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 hover:border-[#d2c4ad] hover:bg-black/60 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-[#d2c4ad] font-mono font-bold">{p.code}</span>
                  <span className="text-[9px] text-[#b4aca2] font-mono">{p.prices[0]}</span>
                </div>
                <h4 className="font-serif text-xs text-[#f6f2eb] font-semibold truncate">{p.cn}</h4>
                <p className="text-[9px] text-[#b4aca2] truncate">{p.en}</p>
              </div>
              <span className="text-[8px] text-[#d2c4ad]/80 mt-1 block truncate font-mono">{p.latinName}</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 border-t border-white/10 pt-2 flex items-center justify-between text-[10px] text-[#b4aca2]">
          <span>点击卡片可查看成分明细、萃取部位与检定报告</span>
          <span className="font-mono">{pageNum} / 44</span>
        </div>
      </>
    );
  };

  const renderBaseOilSpread = (part: 'part1' | 'part2', title: string, subtitle: string, pageNum: number) => {
    let prods = yuanProducts.filter((p) => p.subgroup === '基础' || p.subgroup === 'base');
    if (part === 'part1') prods = prods.slice(0, 20);
    else prods = prods.slice(20);

    return (
      <>
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold">
              P.{String(pageNum).padStart(2, '0')} · YUAN BASE OILS / 基础植物油
            </span>
            <span className="text-[10px] text-[#b4aca2] font-mono">{prods.length} ITEMS</span>
          </div>
          <h3 className="font-serif text-lg text-[#f6f2eb]">{title}</h3>
          <p className="text-xs text-[#b4aca2]">{subtitle}</p>
        </div>

        <div className="relative z-10 my-2 flex-1 overflow-y-auto min-h-[480px] max-h-[620px] pr-1 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 no-scrollbar">
          {prods.map((p) => (
            <div
              key={p.code}
              onClick={() => onSelectProduct(p)}
              className="p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 hover:border-[#d2c4ad] hover:bg-black/60 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-[#d2c4ad] font-mono font-bold">{p.code}</span>
                  <span className="text-[9px] text-[#b4aca2] font-mono">{p.prices[0]}</span>
                </div>
                <h4 className="font-serif text-xs text-[#f6f2eb] font-semibold truncate">{p.cn}</h4>
                <p className="text-[9px] text-[#b4aca2] truncate">{p.en}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 border-t border-white/10 pt-2 flex items-center justify-between text-[10px] text-[#b4aca2]">
          <span>冷压离心离析技术，未精炼全活性脂质</span>
          <span className="font-mono">{pageNum} / 44</span>
        </div>
      </>
    );
  };

  const renderHeSubgroupSpread = (subgroup: string, title: string, subtitle: string, pageNum: number) => {
    const subgroupMap: Record<string, string> = {
      body: '身体',
      mind: '心智',
      soul: '灵魂',
    };
    const targetSubgroup = subgroupMap[subgroup] || subgroup;
    const prods = heProducts.filter((p) => p.subgroup === targetSubgroup);

    return (
      <>
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold">
              P.{String(pageNum).padStart(2, '0')} · HE SERIES / 合系列复方
            </span>
            <span className="text-[10px] text-[#b4aca2] font-mono">{prods.length} BLENDS</span>
          </div>
          <h3 className="font-serif text-lg text-[#f6f2eb]">{title}</h3>
          <p className="text-xs text-[#b4aca2]">{subtitle}</p>
        </div>

        <div className="relative z-10 my-2 flex-1 overflow-y-auto min-h-[440px] max-h-[580px] pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 no-scrollbar">
          {prods.map((p) => (
            <div
              key={p.code}
              onClick={() => onSelectProduct(p)}
              className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 hover:border-[#d2c4ad] hover:bg-black/60 transition-all cursor-pointer flex items-center gap-3 group"
            >
              <img src={p.image} alt={p.cn} className="w-12 h-12 rounded-lg object-cover bg-black/40 flex-shrink-0 border border-white/10 group-hover:scale-105 transition-transform" />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[10px] text-[#d2c4ad] font-mono font-bold">{p.code}</span>
                  <span className="text-[10px] text-[#b4aca2] font-mono">{p.prices[0]}</span>
                </div>
                <h4 className="font-serif text-xs text-[#f6f2eb] font-semibold truncate group-hover:text-[#d2c4ad] transition-colors">{p.cn} · {p.en}</h4>
                <p className="text-[10px] text-[#b4aca2] line-clamp-1">{p.shortDesc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 border-t border-white/10 pt-2 flex items-center justify-between text-[10px] text-[#b4aca2]">
          <span>精准分子协同复配，支持一人一方微调</span>
          <span className="font-mono">{pageNum} / 44</span>
        </div>
      </>
    );
  };

  const renderShengSubgroupSpread = (subgroup: string, title: string, subtitle: string, pageNum: number) => {
    const subgroupMap: Record<string, string> = {
      purify: '清净',
      nourish: '润养',
      soothe: '舒缓',
    };
    const targetSubgroup = subgroupMap[subgroup] || subgroup;
    const prods = shengProducts.filter((p) => p.subgroup === targetSubgroup);

    return (
      <>
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold">
              P.{String(pageNum).padStart(2, '0')} · SHENG SERIES / 生系列纯露
            </span>
            <span className="text-[10px] text-[#b4aca2] font-mono">{prods.length} HYDROSOLS</span>
          </div>
          <h3 className="font-serif text-lg text-[#f6f2eb]">{title}</h3>
          <p className="text-xs text-[#b4aca2]">{subtitle}</p>
        </div>

        <div className="relative z-10 my-2 flex-1 overflow-y-auto min-h-[480px] max-h-[620px] pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 no-scrollbar">
          {prods.map((p) => (
            <div
              key={p.code}
              onClick={() => onSelectProduct(p)}
              className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 hover:border-[#d2c4ad] hover:bg-black/60 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] text-[#d2c4ad] font-mono font-bold">{p.code}</span>
                  <span className="text-[9px] text-[#b4aca2] font-mono">{p.prices[0]}</span>
                </div>
                <h4 className="font-serif text-xs text-[#f6f2eb] font-semibold truncate">{p.cn}</h4>
                <p className="text-[9px] text-[#b4aca2] truncate">{p.en}</p>
              </div>
              <p className="text-[9px] text-[#b4aca2] line-clamp-1 mt-1">{p.shortDesc}</p>
            </div>
          ))}
        </div>

        <div className="relative z-10 border-t border-white/10 pt-2 flex items-center justify-between text-[10px] text-[#b4aca2]">
          <span>有机无公害农场头道水相蒸馏提取</span>
          <span className="font-mono">{pageNum} / 44</span>
        </div>
      </>
    );
  };

  const renderJingSubgroupSpread = (subgroup: string, title: string, subtitle: string, pageNum: number) => {
    const subgroupMap: Record<string, string> = {
      realm: '香境',
      zen: '禅思',
    };
    const targetSubgroup = subgroupMap[subgroup] || subgroup;
    const prods = jingProducts.filter((p) => p.subgroup === targetSubgroup);

    return (
      <>
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold">
              P.{String(pageNum).padStart(2, '0')} · JING SERIES / 香系列器物
            </span>
            <span className="text-[10px] text-[#b4aca2] font-mono">{prods.length} OBJECTS</span>
          </div>
          <h3 className="font-serif text-lg text-[#f6f2eb]">{title}</h3>
          <p className="text-xs text-[#b4aca2]">{subtitle}</p>
        </div>

        <div className="relative z-10 my-2 flex-1 overflow-y-auto min-h-[440px] max-h-[580px] pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 no-scrollbar">
          {prods.map((p) => (
            <div
              key={p.code}
              onClick={() => onSelectProduct(p)}
              className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 hover:border-[#d2c4ad] hover:bg-black/60 transition-all cursor-pointer flex items-center gap-3 group"
            >
              <img src={p.image} alt={p.cn} className="w-12 h-12 rounded-lg object-cover bg-black/40 flex-shrink-0 border border-white/10 group-hover:scale-105 transition-transform" />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[10px] text-[#d2c4ad] font-mono font-bold">{p.code}</span>
                  <span className="text-[10px] text-[#b4aca2] font-mono">{p.prices[0]}</span>
                </div>
                <h4 className="font-serif text-xs text-[#f6f2eb] font-semibold truncate group-hover:text-[#d2c4ad] transition-colors">{p.cn} · {p.en}</h4>
                <p className="text-[10px] text-[#b4aca2] line-clamp-1">{p.shortDesc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 border-t border-white/10 pt-2 flex items-center justify-between text-[10px] text-[#b4aca2]">
          <span>天然原石、沉香与匠人手作美学器物</span>
          <span className="font-mono">{pageNum} / 44</span>
        </div>
      </>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 space-y-6">
      
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#EFEDE7] p-4 rounded-2xl border border-[#2D2D2A]/15 shadow-sm font-sans">
        
        {/* Left: View Mode Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('flip')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              viewMode === 'flip'
                ? 'bg-[#2D2D2A] text-[#F9F7F2] font-medium shadow-sm'
                : 'text-[#8C7E6A] hover:bg-[#DED9D2]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>画册翻页</span>
          </button>

          <button
            onClick={() => setViewMode('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              viewMode === 'overview'
                ? 'bg-[#2D2D2A] text-[#F9F7F2] font-medium shadow-sm'
                : 'text-[#8C7E6A] hover:bg-[#DED9D2]'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>海报全景总览</span>
          </button>

          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#8C7E6A] hover:bg-[#2D2D2A] text-white rounded-full text-xs font-medium transition-all shadow-sm ml-1"
          >
            <Download className="w-4 h-4" />
            <span>导出 / 下载画册 (1:1)</span>
          </button>

          <button
            onClick={handleOpenFullscreen}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0c120e] hover:bg-[#1a241e] text-[#d2c4ad] rounded-full text-xs font-serif font-semibold transition-all shadow-md hover:scale-105 ml-1 border border-[#d2c4ad]/30"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#d2c4ad]" />
            <span>100% 全屏沉浸阅读</span>
          </button>
        </div>

        {/* Center: Flip Controls & Auto-Cruise & Audio Toggle */}
        {viewMode === 'flip' && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrevPage}
              className="p-2 rounded-full bg-[#F9F7F2] border border-[#2D2D2A]/15 hover:bg-[#DED9D2] text-[#2D2D2A] transition-all"
              title="上一页"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono tracking-widest text-[#2D2D2A] font-bold px-1">
              P.{String(currentPage + 1).padStart(2, '0')} / P.{String(TOTAL_PAGES).padStart(2, '0')}
            </span>

            <button
              onClick={handleNextPage}
              className="p-2 rounded-full bg-[#F9F7F2] border border-[#2D2D2A]/15 hover:bg-[#DED9D2] text-[#2D2D2A] transition-all"
              title="下一页"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Auto-Flip Cruise Control */}
            <div className="flex items-center gap-1 bg-[#F9F7F2] border border-[#2D2D2A]/15 p-1 rounded-full ml-1">
              <button
                onClick={() => setIsAutoFlipping(!isAutoFlipping)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all ${
                  isAutoFlipping
                    ? 'bg-[#1C2E20] text-[#E8DAC8] font-bold shadow-md animate-pulse'
                    : 'text-[#2D2D2A] hover:bg-[#DED9D2]'
                }`}
                title={isAutoFlipping ? '点击暂停自动巡航翻页' : '点击开启自动巡航翻页'}
              >
                {isAutoFlipping ? <Pause className="w-3.5 h-3.5 text-[#C5B49A]" /> : <Play className="w-3.5 h-3.5 text-[#8C7E6A]" />}
                <span>{isAutoFlipping ? `巡航中 (${autoFlipSpeed}s)` : '自动翻页'}</span>
              </button>

              {isAutoFlipping && (
                <div className="flex items-center gap-1 px-1 border-l border-[#2D2D2A]/10 text-[10px] font-mono">
                  {[3, 5, 8].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setAutoFlipSpeed(speed)}
                      className={`px-1.5 py-0.5 rounded transition-colors ${
                        autoFlipSpeed === speed ? 'bg-[#1C2E20] text-[#E8DAC8] font-bold' : 'text-[#8C7E6A] hover:text-[#2D2D2A]'
                      }`}
                    >
                      {speed}s
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sound & BGM Toggle Button */}
            <button
              onClick={toggleSoundAndBgm}
              className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 text-xs font-mono ${
                isSoundEnabled
                  ? 'bg-[#1C2E20] text-[#E8DAC8] border-[#C5B49A]/60 shadow-md'
                  : 'bg-[#F9F7F2] text-[#8C7E6A] border-[#2D2D2A]/15 opacity-60 hover:opacity-100'
              }`}
              title={isSoundEnabled ? '古典优雅钢琴配乐 (萨蒂: 吉诺佩蒂No.1) 与翻页音效已开启' : '点击开启古典优雅钢琴配乐与翻页音效'}
            >
              {isSoundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#C5B49A]" />
                  <span className="hidden sm:inline text-[11px] font-sans font-medium text-[#E8DAC8]">古典优雅配乐</span>
                  <span className="inline-flex items-end gap-0.5 h-3 ml-0.5">
                    <span className="w-0.5 bg-[#C5B49A] animate-pulse h-2.5"></span>
                    <span className="w-0.5 bg-[#C5B49A] animate-pulse h-3.5"></span>
                    <span className="w-0.5 bg-[#C5B49A] animate-pulse h-2"></span>
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px] font-sans">配乐已静音</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Right: Quick Jump Sections */}
        <div className="flex items-center gap-1.5 text-xs overflow-x-auto no-scrollbar">
          <span className="text-[#8C7E6A] text-[11px] hidden lg:inline font-mono">跳转:</span>
          {[
            { label: '封面 P.01', page: 0 },
            { label: '扉页 P.02', page: 1 },
            { label: '起源 P.03', page: 2 },
            { label: '目录 P.04', page: 3 },
            { label: '哲学 P.05', page: 4 },
            { label: '元系 P.10', page: 9 },
            { label: '合系 P.20', page: 19 },
            { label: '生系 P.24', page: 23 },
            { label: '香系 P.28', page: 27 },
            { label: '总图谱 P.31', page: 30 },
            { label: '商业 P.35', page: 34 },
            { label: '学院 P.41', page: 40 },
            { label: '封底 P.45', page: 44 },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setViewMode('flip');
                setCurrentPage(item.page);
              }}
              className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-all ${
                currentPage === item.page && viewMode === 'flip'
                  ? 'bg-[#2D2D2A] text-[#F9F7F2] font-medium shadow-sm'
                  : 'bg-[#F9F7F2] border border-[#2D2D2A]/10 text-[#8C7E6A] hover:bg-[#DED9D2]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

      </div>

      {/* Main Content Display Area */}
      {viewMode === 'flip' ? (
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center py-2">
          
          {/* Left Side Floating Arrow Button */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="absolute -left-2 sm:-left-10 lg:-left-16 z-30 group flex flex-col items-center gap-1 p-2.5 sm:p-4 rounded-2xl bg-[#0c120e]/90 hover:bg-[#0c120e] text-[#d2c4ad] border border-[#d2c4ad]/35 shadow-2xl backdrop-blur-md disabled:opacity-20 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
            title="上一页 (← / 键盘)"
          >
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:-translate-x-1 text-[#d2c4ad]" />
            <span className="text-[10px] font-mono tracking-widest font-bold uppercase hidden sm:block">
              {currentPage > 0 ? `P.${String(currentPage).padStart(2, '0')}` : '封面'}
            </span>
            <span className="text-[9px] text-[#b4aca2] font-mono hidden md:block">上一页</span>
          </button>

          {/* Book Canvas Stage with Touch Gestures */}
          <div 
            className="relative w-full max-w-4xl mx-auto aspect-[1/1.35] min-h-[600px] sm:min-h-[750px] touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 24, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -24, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full shadow-2xl rounded-2xl overflow-hidden"
                style={{
                  transform: touchDeltaX ? `translateX(${touchDeltaX * 0.25}px)` : undefined
                }}
              >
                {renderPage(currentPage)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side Floating Arrow Button */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === TOTAL_PAGES - 1}
            className="absolute -right-2 sm:-right-10 lg:-right-16 z-30 group flex flex-col items-center gap-1 p-2.5 sm:p-4 rounded-2xl bg-[#0c120e]/90 hover:bg-[#0c120e] text-[#d2c4ad] border border-[#d2c4ad]/35 shadow-2xl backdrop-blur-md disabled:opacity-20 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
            title="下一页 (→ / 键盘)"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-1 text-[#d2c4ad]" />
            <span className="text-[10px] font-mono tracking-widest font-bold uppercase hidden sm:block">
              {currentPage < TOTAL_PAGES - 1 ? `P.${String(currentPage + 2).padStart(2, '0')}` : '封底'}
            </span>
            <span className="text-[9px] text-[#b4aca2] font-mono hidden md:block">下一页</span>
          </button>

        </div>
      ) : (
        /* Overview Mode: Render All 40 Posters in a Grid Matrix */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: TOTAL_PAGES }).map((_, idx) => (
            <div
              key={idx}
              onClick={() => {
                setCurrentPage(idx);
                setViewMode('flip');
              }}
              className="aspect-[1/1.35] w-full rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#d2c4ad] hover:scale-[1.02] transition-all shadow-lg group relative bg-[#0c120e]"
            >
              <div className="absolute top-2.5 left-2.5 z-20 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-[#d2c4ad] font-mono border border-white/10 font-bold">
                P.{String(idx + 1).padStart(2, '0')}
              </div>
              <div className="w-full h-full pointer-events-none transform origin-top-left scale-[0.5] w-[200%] h-[200%]">
                {renderPage(idx, true)}
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors pointer-events-none flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-[#d2c4ad] text-[#0c120e] text-xs font-bold px-3 py-1.5 rounded-full shadow-xl transition-opacity">
                  阅读 P.{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Page Flipping Indicator (页脚翻页指示器) */}
      {viewMode === 'overview' && (
        <div className="w-full bg-[#121a14] text-[#f6f2eb] p-4 sm:p-6 rounded-2xl border border-[#d2c4ad]/30 shadow-xl font-sans">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif text-lg text-[#d2c4ad] font-bold">海报全景总览 · {TOTAL_PAGES} 页全览</h3>
              <p className="text-xs text-[#b4aca2] mt-0.5">点击任意缩略页即可跳转阅读该页 · 每页均完整呈现 1:1 内容</p>
            </div>
            <span className="text-[10px] font-mono text-[#b4aca2] bg-white/5 px-2.5 py-1 rounded-full border border-[#d2c4ad]/20">
              {TOTAL_PAGES} PAGES · 1:1
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {Array.from({ length: TOTAL_PAGES }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setCurrentPage(idx); setViewMode('flip'); }}
                className="group text-left focus:outline-none"
                title={`P.${String(idx + 1).padStart(2, '0')} · ${BOOK_PAGE_TITLES[idx] || ''}`}
              >
                <div className="relative w-full aspect-[1/1.35] overflow-hidden rounded-lg border border-[#d2c4ad]/25 bg-[#0c120e] transition-all group-hover:border-[#d2c4ad]/70 group-hover:shadow-lg group-hover:shadow-black/50 group-hover:scale-[1.02]">
                  <div className="absolute inset-0" style={{ transform: 'scale(0.28)', transformOrigin: 'top left', width: '358%', height: '483%' }}>
                    {renderPage(idx, true)}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5 flex items-center justify-between pointer-events-none">
                    <span className="font-mono text-[10px] text-[#d2c4ad]">P.{String(idx + 1).padStart(2, '0')}</span>
                    <span className="text-[9px] text-[#b4aca2] truncate max-w-[70%]">{BOOK_PAGE_TITLES[idx] || ''}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer Page Flipping Indicator (页脚翻页指示器) */}
      {viewMode === 'flip' && (
        <div className="w-full bg-[#121a14] text-[#f6f2eb] p-3 sm:p-5 rounded-2xl border border-[#d2c4ad]/30 shadow-xl space-y-3 font-sans">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Left: Page Title Badge & Progress */}
            <div className="flex items-center gap-2 font-mono text-xs text-[#e8dac8]">
              <span className="px-3 py-1 rounded-full bg-[#d2c4ad]/20 border border-[#d2c4ad]/40 text-[#d2c4ad] font-bold">
                P.{String(currentPage + 1).padStart(2, '0')} / P.{String(TOTAL_PAGES).padStart(2, '0')}
              </span>
              <span className="text-xs font-serif truncate max-w-[200px] sm:max-w-[280px]">
                {BOOK_PAGE_TITLES[currentPage]}
              </span>
              <span className="text-[10px] text-[#b4aca2] hidden sm:inline font-mono">
                ({Math.round(((currentPage + 1) / TOTAL_PAGES) * 100)}%)
              </span>
            </div>

            {/* Center: Interactive Progress Bar Slider */}
            <div className="flex items-center gap-2 w-full md:w-auto flex-1 max-w-md px-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#d2c4ad] disabled:opacity-20 disabled:cursor-not-allowed transition-all shrink-0"
                title="上一页"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min={0}
                  max={TOTAL_PAGES - 1}
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#d2c4ad]"
                />
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === TOTAL_PAGES - 1}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#d2c4ad] disabled:opacity-20 disabled:cursor-not-allowed transition-all shrink-0"
                title="下一页"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Auto Cruise, Sound, Quick Jump & Immersive Mode buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsAutoFlipping(!isAutoFlipping)}
                className={`px-3 py-1.5 rounded-full border text-[11px] font-mono flex items-center gap-1.5 transition-all ${
                  isAutoFlipping
                    ? 'bg-[#d2c4ad] text-[#0c120e] border-[#d2c4ad] font-bold shadow-md animate-pulse'
                    : 'bg-white/10 hover:bg-white/20 border-white/15 text-[#e8dac8]'
                }`}
                title={isAutoFlipping ? '暂停自动巡航' : '开启自动巡航'}
              >
                {isAutoFlipping ? <Pause className="w-3.5 h-3.5 text-[#0c120e]" /> : <Play className="w-3.5 h-3.5 text-[#d2c4ad]" />}
                <span>{isAutoFlipping ? `巡航中 (${autoFlipSpeed}s)` : '自动翻页'}</span>
              </button>

              <button
                onClick={toggleSoundAndBgm}
                className={`px-2.5 py-1.5 rounded-full border transition-all text-[11px] font-mono flex items-center gap-1.5 ${
                  isSoundEnabled
                    ? 'bg-white/20 text-[#d2c4ad] border-[#d2c4ad]/60 shadow-sm'
                    : 'bg-white/5 text-[#b4aca2] border-white/10 opacity-60 hover:opacity-100'
                }`}
                title={isSoundEnabled ? '古典优雅钢琴配乐 (萨蒂: 吉诺佩蒂No.1) 已开启' : '点击开启古典优雅钢琴配乐'}
              >
                {isSoundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#d2c4ad]" />
                    <span className="hidden sm:inline">古典优雅配乐</span>
                    <span className="inline-flex items-end gap-0.5 h-2.5">
                      <span className="w-0.5 bg-[#d2c4ad] animate-pulse h-2"></span>
                      <span className="w-0.5 bg-[#d2c4ad] animate-pulse h-2.5"></span>
                      <span className="w-0.5 bg-[#d2c4ad] animate-pulse h-1.5"></span>
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">配乐静音</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowJumpModal(true)}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] text-[#e8dac8] font-mono flex items-center gap-1 transition-all"
                title="快速跳转到任意页"
              >
                <Hash className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">直达指定页</span>
              </button>

              <button
                onClick={handleOpenFullscreen}
                className="px-3.5 py-1.5 rounded-full bg-[#d2c4ad] hover:bg-white text-[#0c120e] font-bold text-[11px] font-mono flex items-center gap-1.5 transition-all shadow-md"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>100% 全屏</span>
              </button>
            </div>

          </div>

          {/* Bottom Row: Quick Section Bookmarks */}
          <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[10px] font-mono">
            <span className="text-[#b4aca2] shrink-0 mr-1 hidden sm:inline">章节速达:</span>
            {[
            { label: '封面 P.01', page: 0 },
            { label: '扉页 P.02', page: 1 },
            { label: '起源 P.03', page: 2 },
            { label: '目录 P.04', page: 3 },
            { label: '哲学 P.05', page: 4 },
            { label: '元系 P.10', page: 9 },
            { label: '合系 P.20', page: 19 },
            { label: '生系 P.24', page: 23 },
            { label: '香系 P.28', page: 27 },
            { label: '总图谱 P.31', page: 30 },
            { label: '商业 P.35', page: 34 },
            { label: '学院 P.41', page: 40 },
            { label: '封底 P.45', page: 44 },
          ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setViewMode('flip');
                  setCurrentPage(item.page);
                }}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all ${
                  currentPage === item.page
                    ? 'bg-[#d2c4ad] text-[#0c120e] font-bold shadow-sm'
                    : 'bg-white/5 border border-white/10 text-[#d2c4ad] hover:bg-white/15'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

        </div>
      )}

      {/* Quick Page Jump Modal Overlay */}
      {showJumpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
          <div className="bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/30 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowJumpModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#e8dac8]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-[#e8dac8] flex items-center gap-2">
                <Hash className="w-5 h-5 text-[#d2c4ad]" />
                <span>快速跳转至指定页</span>
              </h3>
              <p className="text-xs text-[#b4aca2]">输入 1 至 45 页码，或点击下方主要章节标记。</p>
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                min={1}
                max={40}
                value={jumpPageInput}
                onChange={(e) => setJumpPageInput(e.target.value)}
                placeholder={`当前 P.${currentPage + 1} (1-40)`}
                className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-[#d2c4ad]/30 text-[#f6f2eb] text-sm focus:outline-none focus:border-[#d2c4ad]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const p = parseInt(jumpPageInput, 10);
                    if (p >= 1 && p <= 40) {
                      setCurrentPage(p - 1);
                      setShowJumpModal(false);
                      setJumpPageInput('');
                    }
                  }
                }}
              />
              <button
                onClick={() => {
                  const p = parseInt(jumpPageInput, 10);
                  if (p >= 1 && p <= 40) {
                    setCurrentPage(p - 1);
                    setShowJumpModal(false);
                    setJumpPageInput('');
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-[#d2c4ad] text-[#0c120e] font-bold text-xs hover:bg-white transition-all"
              >
                跳转
              </button>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <span className="text-xs text-[#b4aca2] font-mono block">主要章节索引:</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono max-h-48 overflow-y-auto pr-1">
                {[0, 1, 2, 3, 8, 18, 22, 26, 29, 32, 36, 39].map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      setShowJumpModal(false);
                    }}
                    className={`p-2 rounded-lg text-left text-[11px] truncate transition-all ${
                      currentPage === pageNum
                        ? 'bg-[#d2c4ad] text-[#0c120e] font-bold'
                        : 'bg-white/5 hover:bg-white/15 text-[#e8dac8] border border-white/5'
                    }`}
                  >
                    {BOOK_PAGE_TITLES[pageNum]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1:1 Local Export Modal Overlay */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in font-sans">
          <div className="bg-[#EFEDE7] text-[#2D2D2A] border border-[#2D2D2A]/20 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative overflow-hidden">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setShowExportModal(false);
                setExportStatus('');
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#2D2D2A]/10 hover:bg-[#2D2D2A] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title & Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#8C7E6A] text-xs font-mono tracking-widest uppercase">
                <Download className="w-4 h-4" />
                <span>UNIO AROMA LOCAL EXPORT CENTER</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#2D2D2A]">
                画册 1:1 本地导出与桌面保存
              </h3>
              <p className="text-xs text-[#2D2D2A]/70">
                支持一次性打包导出全书 45 页高清 JPEG 压缩包、单文件离线 HTML 或 1:1 矢量 PDF。
              </p>
            </div>

            {/* Featured Primary Card: Export ALL 40 Pages as JPEG ZIP */}
            <div className="bg-gradient-to-r from-[#2D2D2A] via-[#232320] to-[#1a1a18] text-[#F9F7F2] p-5 rounded-2xl border border-[#d2c4ad]/30 shadow-xl space-y-3 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#d2c4ad] text-[#2D2D2A] flex items-center justify-center font-bold shadow-md flex-shrink-0 mt-0.5 sm:mt-0">
                    <PackageCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#d2c4ad] flex items-center gap-2 flex-wrap">
                      <span>一次性打包导出全部 45 页 JPEG</span>
                      <span className="text-[10px] font-sans font-normal px-2 py-0.5 bg-[#d2c4ad]/20 text-[#d2c4ad] rounded-full border border-[#d2c4ad]/30">推荐 · 高清全图集</span>
                    </h4>
                    <p className="text-xs text-[#F9F7F2]/80 mt-1 leading-relaxed">
                      自动逐页高清捕捉全书 45 页画面，打包压缩为单文件 ZIP 包（下载解压即得 P.01-P.45 高清图片）。
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleExportAllPagesZipJPEG}
                  disabled={isCapturing}
                  className="px-5 py-3 bg-[#d2c4ad] text-[#2D2D2A] hover:bg-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 whitespace-nowrap flex-shrink-0"
                >
                  {isCapturing && exportProgress > 0 ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>正在处理 ({exportProgress}%)...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>打包导出全部 45 页 (ZIP)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Live Export Progress Bar */}
              {isCapturing && exportProgress > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-[#d2c4ad] h-full transition-all duration-300 rounded-full shadow-sm"
                      style={{ width: `${exportProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#d2c4ad]/80 font-mono">
                    <span>处理进度: {exportProgress}%</span>
                    <span>40 PAGES HIGH RES CAPTURE</span>
                  </div>
                </div>
              )}
            </div>

            {/* Other Export Format Options */}
            <div className="grid sm:grid-cols-3 gap-4">
              
              {/* Option 1: HTML Bundle */}
              <div className="bg-[#F9F7F2] p-4 rounded-2xl border border-[#2D2D2A]/15 flex flex-col justify-between space-y-3 shadow-sm hover:border-[#8C7E6A] transition-all">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#2D2D2A] text-[#d2c4ad] flex items-center justify-center">
                    <FileCode className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#2D2D2A]">单文件 1:1 离线 HTML</h4>
                  <p className="text-[11px] text-[#2D2D2A]/70 leading-relaxed">
                    下载为单文件 `.html`，放到桌面后无需联网即可双击在浏览器中直接翻阅 45 页画册。
                  </p>
                </div>
                <button
                  onClick={handleExportOfflineHTML}
                  disabled={isCapturing}
                  className="w-full py-2 bg-[#2D2D2A] text-[#F9F7F2] hover:bg-[#8C7E6A] rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>下载 HTML (.html)</span>
                </button>
              </div>

              {/* Option 2: 1:1 PDF Vector Print */}
              <div className="bg-[#F9F7F2] p-4 rounded-2xl border border-[#2D2D2A]/15 flex flex-col justify-between space-y-3 shadow-sm hover:border-[#8C7E6A] transition-all">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#2D2D2A] text-[#d2c4ad] flex items-center justify-center">
                    <Printer className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#2D2D2A]">1:1 矢量 PDF 导出</h4>
                  <p className="text-[11px] text-[#2D2D2A]/70 leading-relaxed">
                    调用标准矢量 1:1 格式，直接通过浏览器另存为矢量 PDF，完美保持 A4/画刊级高保真排版。
                  </p>
                </div>
                <button
                  onClick={handleExportPDFPrint}
                  disabled={isCapturing}
                  className="w-full py-2 bg-[#2D2D2A] text-[#F9F7F2] hover:bg-[#8C7E6A] rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>另存为 1:1 PDF</span>
                </button>
              </div>

              {/* Option 3: Current Page JPEG */}
              <div className="bg-[#F9F7F2] p-4 rounded-2xl border border-[#2D2D2A]/15 flex flex-col justify-between space-y-3 shadow-sm hover:border-[#8C7E6A] transition-all">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#2D2D2A] text-[#d2c4ad] flex items-center justify-center">
                    <Image className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#2D2D2A]">当前页 JPEG 单图</h4>
                  <p className="text-[11px] text-[#2D2D2A]/70 leading-relaxed">
                    仅导出当前页面 (P.{String(currentPage + 1).padStart(2, '0')}) 为 2x 高清 JPEG 图片。
                  </p>
                </div>
                <button
                  onClick={handleExportCurrentPageJPEG}
                  disabled={isCapturing}
                  className="w-full py-2 bg-[#2D2D2A] text-[#F9F7F2] hover:bg-[#8C7E6A] rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isCapturing ? '正在处理...' : `导出 P.${currentPage + 1} JPEG`}</span>
                </button>
              </div>

            </div>

            {/* Status notification area */}
            {exportStatus && (
              <div className="p-3 bg-[#d2c4ad]/20 border border-[#8C7E6A]/30 rounded-xl text-xs text-[#2D2D2A] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#8C7E6A] flex-shrink-0" />
                <span>{exportStatus}</span>
              </div>
            )}

            {/* Footer Notice */}
            <div className="pt-2 border-t border-[#2D2D2A]/10 text-[11px] text-[#8C7E6A] flex justify-between items-center font-mono">
              <span>UNIO AROMA BRAND MANUAL · 1:1 HIGH FIDELITY EXPORT</span>
              <span>2003-2026 EDITION</span>
            </div>

          </div>
        </div>
      )}

      {/* Fullscreen Immersive Mode Overlay */}
      <AnimatePresence>
        {isFullscreenImmersive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#060a07] text-[#f6f2eb] flex flex-col justify-between p-2 sm:p-5 select-none overflow-hidden backdrop-blur-3xl font-sans"
          >
            {/* Top Bar: Minimal Chrome (Optionally Hideway in Pure Mode) */}
            <div className={`relative z-30 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-2.5 max-w-7xl w-full mx-auto transition-all duration-300 ${
              hideChromeInImmersive ? 'opacity-20 hover:opacity-100' : 'opacity-100'
            }`}>
              <div className="flex items-center gap-2.5">
                <UnioLogo size={26} color="#d2c4ad" />
                <div>
                  <span className="font-serif text-sm font-semibold tracking-wider text-[#d2c4ad] block">
                    UNIO 元香 · 品牌全景手册
                  </span>
                  <span className="text-[10px] text-[#b4aca2] font-mono tracking-widest uppercase hidden sm:block">
                    IMMERSIVE FULLSCREEN MANUAL · 2003-2026
                  </span>
                </div>
              </div>

              {/* Display Scale Switcher */}
              <div className="hidden lg:flex items-center gap-1 bg-black/60 border border-white/15 p-1 rounded-full backdrop-blur-md text-[11px] font-mono">
                <button
                  onClick={() => setFullscreenScaleMode('height-fit')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    fullscreenScaleMode === 'height-fit'
                      ? 'bg-[#d2c4ad] text-[#0c120e] font-bold shadow-md'
                      : 'text-[#d2c4ad] hover:bg-white/10'
                  }`}
                >
                  100% 垂直自适应
                </button>
                <button
                  onClick={() => setFullscreenScaleMode('width-fit')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    fullscreenScaleMode === 'width-fit'
                      ? 'bg-[#d2c4ad] text-[#0c120e] font-bold shadow-md'
                      : 'text-[#d2c4ad] hover:bg-white/10'
                  }`}
                >
                  100% 宽度撑满
                </button>
                <button
                  onClick={() => setFullscreenScaleMode('zoom-in')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    fullscreenScaleMode === 'zoom-in'
                      ? 'bg-[#d2c4ad] text-[#0c120e] font-bold shadow-md'
                      : 'text-[#d2c4ad] hover:bg-white/10'
                  }`}
                >
                  125% 放大
                </button>
              </div>

              {/* Center Quick Page Range & Title Badge */}
              <button
                onClick={() => setShowJumpModal(true)}
                className="flex items-center gap-2 bg-black/60 border border-white/15 px-3.5 py-1.5 rounded-full backdrop-blur-md text-xs font-mono text-[#d2c4ad] hover:border-[#d2c4ad] transition-all"
                title="点击快速跳转"
              >
                <span className="font-bold">
                  P.{String(currentPage + 1).padStart(2, '0')} / P.{String(TOTAL_PAGES).padStart(2, '0')}
                </span>
                <span className="text-xs font-serif text-[#e8dac8] truncate max-w-[150px] sm:max-w-[220px]">
                  {BOOK_PAGE_TITLES[currentPage]}
                </span>
              </button>

              <div className="flex items-center gap-2">
                {/* Auto-Cruise Toggle Button */}
                <div className="flex items-center gap-1 bg-black/60 border border-white/15 p-1 rounded-full backdrop-blur-md">
                  <button
                    onClick={() => setIsAutoFlipping(!isAutoFlipping)}
                    className={`px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                      isAutoFlipping
                        ? 'bg-[#d2c4ad] text-[#0c120e] font-bold shadow-md animate-pulse'
                        : 'text-[#d2c4ad] hover:bg-white/10'
                    }`}
                    title={isAutoFlipping ? '点击暂停自动巡航' : '点击开启自动巡航'}
                  >
                    {isAutoFlipping ? <Pause className="w-3.5 h-3.5 text-[#0c120e]" /> : <Play className="w-3.5 h-3.5 text-[#d2c4ad]" />}
                    <span>{isAutoFlipping ? `巡航中 (${autoFlipSpeed}s)` : '自动翻页'}</span>
                  </button>
                  {isAutoFlipping && (
                    <div className="flex items-center gap-1 px-1 border-l border-white/15 text-[10px] font-mono">
                      {[3, 5, 8].map((s) => (
                        <button
                          key={s}
                          onClick={() => setAutoFlipSpeed(s)}
                          className={`px-1.5 py-0.5 rounded ${
                            autoFlipSpeed === s ? 'bg-[#d2c4ad] text-[#0c120e] font-bold' : 'text-[#b4aca2] hover:text-white'
                          }`}
                        >
                          {s}s
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sound & BGM Toggle Button */}
                <button
                  onClick={toggleSoundAndBgm}
                  className={`px-3 py-1.5 rounded-full border backdrop-blur-md transition-all text-xs font-mono flex items-center gap-1.5 ${
                    isSoundEnabled
                      ? 'bg-[#d2c4ad]/20 text-[#d2c4ad] border-[#d2c4ad]/60 shadow-md'
                      : 'bg-black/60 text-[#b4aca2] border-white/15 opacity-60 hover:opacity-100'
                  }`}
                  title={isSoundEnabled ? '432Hz 沉香冥想配乐与翻页音效已开启' : '点击开启 432Hz 沉香冥想配乐与翻页音效'}
                >
                  {isSoundEnabled ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#d2c4ad]" />
                      <span className="hidden sm:inline">432Hz 配乐</span>
                      <span className="inline-flex items-end gap-0.5 h-2.5">
                        <span className="w-0.5 bg-[#d2c4ad] animate-pulse h-2.5"></span>
                        <span className="w-0.5 bg-[#d2c4ad] animate-pulse h-3"></span>
                        <span className="w-0.5 bg-[#d2c4ad] animate-pulse h-1.5"></span>
                      </span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">配乐静音</span>
                    </>
                  )}
                </button>

                {/* Toggle Chrome Hide Mode */}
                <button
                  onClick={() => setHideChromeInImmersive(!hideChromeInImmersive)}
                  className={`p-2 rounded-full border transition-all text-xs flex items-center gap-1.5 ${
                    hideChromeInImmersive
                      ? 'bg-[#d2c4ad] text-[#0c120e] border-[#d2c4ad] font-bold'
                      : 'bg-white/10 text-[#d2c4ad] border-white/15 hover:bg-white/20'
                  }`}
                  title={hideChromeInImmersive ? "显示完整界面" : "纯粹无界阅读 (隐匿边框)"}
                >
                  {hideChromeInImmersive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="hidden md:inline">{hideChromeInImmersive ? "退出纯净模式" : "纯粹阅读"}</span>
                </button>

                {/* Exit Immersive Button */}
                <button
                  onClick={handleCloseFullscreen}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#d2c4ad] hover:text-white text-xs font-medium transition-all shadow-lg hover:scale-105"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">退出全屏</span>
                  <span className="text-[10px] font-mono text-[#d2c4ad]/60">(Esc)</span>
                </button>
              </div>
            </div>

            {/* Center Area: Page Book Canvas with Touch Gesture & Side Tap Page Turning */}
            <div 
              className="relative my-auto w-full max-w-7xl mx-auto flex items-center justify-center h-[calc(100vh-130px)] touch-pan-y py-1 select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Screen Left 12% Tap Area for Instant Turn Back */}
              <div 
                onClick={handlePrevPage}
                className="absolute left-0 top-0 bottom-0 w-[12%] z-20 cursor-pointer group flex items-center justify-start pl-2 sm:pl-4 opacity-0 hover:opacity-100 transition-opacity"
                title="点击左侧翻回上一页"
              >
                <div className="p-3 rounded-2xl bg-black/80 border border-[#d2c4ad]/40 text-[#d2c4ad] shadow-2xl backdrop-blur-md group-hover:scale-110 transition-transform">
                  <ChevronLeft className="w-6 h-6" />
                </div>
              </div>

              {/* Left Arrow Floating Button */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="absolute left-2 sm:left-4 lg:left-8 z-30 group flex flex-col items-center gap-1.5 p-3 sm:p-4 rounded-2xl bg-black/80 hover:bg-black border border-[#d2c4ad]/40 text-[#d2c4ad] hover:text-white hover:scale-110 active:scale-95 disabled:opacity-10 disabled:cursor-not-allowed transition-all backdrop-blur-xl shadow-2xl"
                title="上一页 (← / A 键)"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:-translate-x-1" />
                <span className="text-[10px] font-mono tracking-widest font-bold uppercase hidden sm:block">
                  {currentPage > 0 ? `P.${String(currentPage).padStart(2, '0')}` : '封面'}
                </span>
                <span className="text-[9px] text-[#b4aca2] font-mono hidden sm:block">上一页 [←]</span>
              </button>

              {/* Main Immersive Page Render Box */}
              <div 
                className={`transition-all duration-300 flex items-center justify-center ${
                  fullscreenScaleMode === 'height-fit'
                    ? 'h-[calc(100vh-140px)] max-h-[88vh] aspect-[1/1.35] w-auto max-w-[92vw]'
                    : fullscreenScaleMode === 'width-fit'
                    ? 'w-full max-w-5xl h-[calc(100vh-120px)] aspect-[1/1.35]'
                    : 'w-full max-w-6xl h-[calc(100vh-90px)] aspect-[1/1.35] scale-105'
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, scale: 0.96, x: 24 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.96, x: -24 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full shadow-[0_25px_80px_rgba(0,0,0,0.95)] rounded-2xl overflow-hidden border border-[#d2c4ad]/30"
                    style={{
                      transform: touchDeltaX ? `translateX(${touchDeltaX * 0.25}px)` : undefined
                    }}
                  >
                    {renderPage(currentPage)}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Arrow Floating Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === TOTAL_PAGES - 1}
                className="absolute right-2 sm:right-4 lg:right-8 z-30 group flex flex-col items-center gap-1.5 p-3 sm:p-4 rounded-2xl bg-black/80 hover:bg-black border border-[#d2c4ad]/40 text-[#d2c4ad] hover:text-white hover:scale-110 active:scale-95 disabled:opacity-10 disabled:cursor-not-allowed transition-all backdrop-blur-xl shadow-2xl"
                title="下一页 (→ / D 键)"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-1" />
                <span className="text-[10px] font-mono tracking-widest font-bold uppercase hidden sm:block">
                  {currentPage < TOTAL_PAGES - 1 ? `P.${String(currentPage + 2).padStart(2, '0')}` : '封底'}
                </span>
                <span className="text-[9px] text-[#b4aca2] font-mono hidden sm:block">下一页 [→]</span>
              </button>

              {/* Screen Right 12% Tap Area for Instant Turn Forward */}
              <div 
                onClick={handleNextPage}
                className="absolute right-0 top-0 bottom-0 w-[12%] z-20 cursor-pointer group flex items-center justify-end pr-2 sm:pr-4 opacity-0 hover:opacity-100 transition-opacity"
                title="点击右侧翻向下一页"
              >
                <div className="p-3 rounded-2xl bg-black/80 border border-[#d2c4ad]/40 text-[#d2c4ad] shadow-2xl backdrop-blur-md group-hover:scale-110 transition-transform">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Bottom Floating Minimalist Page Indicator Bar */}
            <div className={`relative z-30 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10 max-w-7xl w-full mx-auto text-xs text-[#b4aca2] font-mono transition-all duration-300 ${
              hideChromeInImmersive ? 'opacity-20 hover:opacity-100' : 'opacity-100'
            }`}>
              
              {/* Progress Track Slider */}
              <div className="flex items-center gap-2 w-full sm:w-80">
                <span className="text-[10px] text-[#d2c4ad] font-bold">P.01</span>
                <input
                  type="range"
                  min={0}
                  max={TOTAL_PAGES - 1}
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#d2c4ad]"
                />
                <span className="text-[10px] text-[#d2c4ad] font-bold">P.45</span>
              </div>

              {/* Gesture & Keyboard Hints */}
              <div className="hidden md:flex items-center gap-2 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-[#d2c4ad]" />
                <span>左右划动手势 / 点击边缘 / 键盘 (← →) 均可翻页</span>
              </div>

              {/* Quick Bookmarks Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full">
                {[
                  { label: '封面 P.01', page: 0 },
                  { label: '扉页 P.02', page: 1 },
                  { label: '目录 P.04', page: 3 },
                  { label: '元系 P.10', page: 9 },
                  { label: '合系 P.20', page: 19 },
                  { label: '生系 P.24', page: 23 },
                  { label: '香系 P.28', page: 27 },
                  { label: '总图谱 P.31', page: 30 },
                  { label: '商业 P.35', page: 34 },
                  { label: '封底 P.45', page: 44 },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(item.page)}
                    className={`px-2.5 py-1 rounded-full text-[10px] transition-all whitespace-nowrap ${
                      currentPage === item.page
                        ? 'bg-[#d2c4ad] text-[#0c120e] font-bold shadow-md'
                        : 'bg-white/10 text-[#d2c4ad] hover:bg-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
