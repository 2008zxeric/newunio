import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import { toJpeg } from 'html-to-image';
import JSZip from 'jszip';
import { 
  ChevronLeft, ChevronRight, LayoutGrid, BookOpen, Download, Search, Check, 
  Sparkles, MapPin, Award, ArrowRight, Globe, ShieldCheck, Heart, Leaf, 
  Sun, Moon, Droplets, Layers, Building, Users, GraduationCap, RefreshCw,
  FileCode, Printer, Image, FileText, X, CheckCircle, PackageCheck, Loader2,
  Maximize2, Minimize2, Eye
} from 'lucide-react';
import { SERIES_META } from '../data/catalogData';
import { fetchProductsFromSupabase } from '../data/siteDataService';
import { ProductItem } from '../types';
import { UnioLogo } from './UnioLogo';

interface BrandBookViewerProps {
  onSelectProduct: (product: ProductItem) => void;
  onNavigateToCatalog: () => void;
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
  0: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1600', // Cover: Blooming damask rose in full bloom
  1: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1600', // P02 Origin & Alice Archive: Solitary misty pine forest
  2: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1600', // P03 Master Contents: Botanical essential oil dropper macro
  3: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600', // P04 Philosophy: Deep misty woods contemplation
  4: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600', // P05 Global Origins: Mountain mist wilderness
  5: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=1600', // P06 Distillation: Laboratory amber glass & botanical extraction
  6: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1600', // P07 Safety & Purity: Clean organic lab glass & leaves
  7: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600', // P08 Studios: Zen spa interior with warm candles
  8: 'https://images.unsplash.com/photo-1512290900673-0498a4d46813?q=80&w=1600', // P09 Yuan Series: Dark moody botanical foliage
  9: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1600', // P10 Yuan Metal: Silver eucalyptus foliage & soft light
  10: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600', // P11 Yuan Wood: Foggy mountain pine forest
  11: 'https://images.unsplash.com/photo-1511497584788-876761c11969?q=80&w=1600', // P12 Yuan Wood 2: Ancient cedar bark texture
  12: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600', // P13 Yuan Water: Tranquil dark ocean waves at twilight
  13: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600', // P14 Yuan Fire: Warm sunbeam ray in deep forest
  14: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600', // P15 Yuan Earth: Rich dark soil & green sprout
  15: 'https://images.unsplash.com/photo-1608571424266-edeb9bbefdec?q=80&w=1600', // P16 Base Oils 1: Golden dropper essential oil bottle
  16: 'https://images.unsplash.com/photo-1528319725582-ddc09f38b617?q=80&w=1600', // P17 Base Oils 2: Dry herbs & lavender bundle
  17: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1600', // P18 Blending Science: Aromatherapy mortar and pestle
  18: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600', // P19 He Series: Meditation in dark serene nature
  19: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600', // P20 He Body: Spa massage ritual & warm towel
  20: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600', // P21 He Mind: Solitary dark starry night wilderness
  21: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=1600', // P22 He Soul: Zen incense smoke swirl in ambient light
  22: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600', // P23 Sheng Series: Damask rose with morning dew drop
  23: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=1600', // P24 Sheng Purify: Fresh mint & lavender field
  24: 'https://images.unsplash.com/photo-1546852199-2d7e912a99c4?q=80&w=1600', // P25 Sheng Nourish: Organic chamomile hydrosol & water drop on dark leaf
  25: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600', // P26 Sheng Soothe: Mountain fog mist
  26: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1600', // P27 Jing Series: Amber glass oil bottles & dried botanicals
  27: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1600', // P28 Jing Realm: Luxury hotel lobby scenting
  28: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1600', // P29 Jing Zen: Zen tea ceremony
  29: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1600', // P30 Yuan Index: Dark emerald tropical monstera leaf texture
  30: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?q=80&w=1600', // P31 He Index: Apothecary glass bottles & dried flowers
  31: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1600', // P32 Sheng & Jing Index: Dark spa stone & bamboo water
  32: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600', // P33 Commercial Search: Luxury architectural gallery
  33: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600', // P34 Hotel & Spa: Wellness yoga & meditation space
  34: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1600', // P35 Enterprise Customization: Dark luxury gift box
  35: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1600', // P36 Partner Policies: Minimalist boutique shelf
  36: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1600', // P37 UNIO Academy: Vintage study book & dried botanicals
  37: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?q=80&w=1600', // P38 Sustainability: Organic herb plantation farm
  38: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600', // P39 Case Studies: Starry night mountain peak
  39: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1600', // P40 Back Cover: Misty bamboo grove path
};

export const BrandBookViewer: React.FC<BrandBookViewerProps> = ({
  onSelectProduct,
  onNavigateToCatalog
}) => {
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [viewMode, setViewMode] = useState<'flip' | 'overview'>('flip');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [isFullscreenImmersive, setIsFullscreenImmersive] = useState<boolean>(false);
  const [fullscreenScaleMode, setFullscreenScaleMode] = useState<'height-fit' | 'width-fit' | 'zoom-in'>('height-fit');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [exportStatus, setExportStatus] = useState<string>('');

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

  // Touch gesture swipe handlers for paper page turning
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setTouchStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || e.changedTouches.length === 0) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // Swipe distance threshold > 45px
    if (diff > 45) {
      handleNextPage();
    } else if (diff < -45) {
      handlePrevPage();
    }
    setTouchStartX(null);
  };

  // Total 40 Pages Comprehensive Brand Book & Catalog Manual
  const TOTAL_PAGES = 40;

  // 1. Export ALL 40 Pages as high-res JPEGs in a single ZIP archive
  const handleExportAllPagesZipJPEG = async () => {
    if (isCapturing) return;
    setIsCapturing(true);
    setExportProgress(0);
    setExportStatus('准备开始一次性打包全部 40 页高清 JPEG，请稍候...');
    
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
          imgData = await toJpeg(el, {
            quality: 0.92,
            backgroundColor: '#0c120e',
            pixelRatio: 2,
            cacheBust: true,
          });
        } catch (primaryErr) {
          console.warn(`toJpeg failed on page ${i + 1}, falling back to html2canvas:`, primaryErr);
          const canvas = await html2canvas(el, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#0c120e',
          });
          imgData = canvas.toDataURL('image/jpeg', 0.92);
        }

        const base64Data = imgData.replace(/^data:image\/jpeg;base64,/, '');
        zip.file(`UNIO_BrandBook_P${pageNumStr}.jpg`, base64Data, { base64: true });
      }

      setExportStatus('全部 40 页高清画面捕捉完成，正在打包压缩 ZIP 压缩包...');
      const zipContent = await zip.generateAsync({ type: 'blob' }, (metadata) => {
        setExportStatus(`正在构建压缩包... [${Math.round(metadata.percent)}%]`);
      });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipContent);
      link.download = 'UNIO_Aroma_BrandBook_40Pages_JPEG_Collection.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExportStatus('🎉 全部 40 页高清 JPEG 压缩包 (ZIP) 已成功导出并开始下载！');
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
        imgData = await toJpeg(el, {
          quality: 0.95,
          backgroundColor: '#0c120e',
          pixelRatio: 2,
          cacheBust: true,
        });
      } catch (primaryErr) {
        console.warn('html-to-image failed, falling back to canvas clone capture:', primaryErr);
        const canvas = await html2canvas(el, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#0c120e',
        });
        imgData = canvas.toDataURL('image/jpeg', 0.95);
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
      const pageTitles = [
        "P.01 品牌封面 Cover",
        "P.02 创始人故事 Origin",
        "P.03 全景目录 Index",
        "P.04 品牌哲学 Philosophy",
        "P.05 全球原产地 Origins Map",
        "P.06 极境萃取 Distillation",
        "P.07 极境检测 Testing & Safety",
        "P.08 香气工坊 Studios",
        "P.09 元系概述 Yuan Overview",
        "P.10 元系 金 Elemental Metal",
        "P.11 元系 木 Elemental Wood Part 1",
        "P.12 元系 木 Elemental Wood Part 2",
        "P.13 元系 水 Elemental Water",
        "P.14 元系 火 Elemental Fire",
        "P.15 元系 土 Elemental Earth",
        "P.16 植物基底油 Base Oils Part 1",
        "P.17 植物基底油 Base Oils Part 2",
        "P.18 配方哲学 Blending Science",
        "P.19 合系概述 He Series Overview",
        "P.20 合系 身 Body",
        "P.21 合系 心 Mind",
        "P.22 合系 灵 Soul",
        "P.23 生系概述 Sheng Series Overview",
        "P.24 生系 净 Purify",
        "P.25 生系 养 Nourish",
        "P.26 生系 舒 Soothe",
        "P.27 香系概述 Jing Series Overview",
        "P.28 香系 香境 Realm",
        "P.29 香系 禅思 Zen",
        "P.30 全系总图谱 Master Index Pt 1",
        "P.31 全系总图谱 Master Index Pt 2",
        "P.32 全系总图谱 Master Index Pt 3",
        "P.33 商业空间定制 Commercial Scenting",
        "P.34 酒店与SPA定制 Hotel & Spa",
        "P.35 尊享礼盒与OEM VIP Gift & OEM",
        "P.36 渠道与零售合作 Policy",
        "P.37 学院与芳疗师赋能 Academy",
        "P.38 绿色生态有机农场 Sustainability",
        "P.39 商业展厅案例 B2B Showcase",
        "P.40 封底与联系 Back Cover"
      ];

      const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UNIO 元香 - 40页品牌画册与采购手册 (1:1 桌面离线版)</title>
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
      <span class="text-xs text-[#b4aca2] border-l border-white/20 pl-3">40页完整品牌画册 (离线 1:1 版)</span>
    </div>
    <div class="flex items-center gap-2">
      <button onclick="prevPage()" class="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs rounded-full text-[#d2c4ad] transition-all">上一页</button>
      <span id="page-num" class="text-xs font-mono px-3 text-[#d2c4ad]">P.01 / P.40</span>
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
        一套从 2003 年真实芳疗记录、全球野生与有机产地及 219 款作品中生长的精品香气体系。
      </p>
    </div>
    <div class="z-10 pt-3 border-t border-white/10 flex justify-between text-xs text-[#b4aca2]">
      <span>2003 - 2026 OFFICIAL CATALOGUE</span>
      <span>unioaroma.com</span>
    </div>
  </div>

  <div class="mt-8 text-center text-xs text-[#b4aca2]">
    <p>UNIO 元香 品牌官方画册桌面导出文件 · 1:1 离线完整版</p>
  </div>

  <script>
    const pageTitles = ${JSON.stringify(pageTitles)};
    let cur = 0;
    function update() {
      document.getElementById('page-num').innerText = 'P.' + String(cur+1).padStart(2,'0') + ' / P.40';
      document.getElementById('page-tag').innerText = 'P.' + String(cur+1).padStart(2,'0');
      document.getElementById('page-title').innerText = pageTitles[cur];
    }
    function prevPage() { if(cur>0) { cur--; update(); } }
    function nextPage() { if(cur<39) { cur++; update(); } }
  </script>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'UNIO_Aroma_BrandBook_40Pages_Interactive.html';
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

  // 3. Export PDF via Window Print
  const handleExportPDFPrint = () => {
    setExportStatus('已唤起 1:1 PDF 打印窗口，请在目标打印机中选择“另存为 PDF”');
    window.print();
  };

  const handleNextPage = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Keyboard navigation support & Escape key / Fullscreen exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreenImmersive) {
        handleCloseFullscreen();
      }
      if (viewMode !== 'flip') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'd' || e.key === 'D') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'a' || e.key === 'A') {
        handlePrevPage();
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
  }, [currentPage, viewMode, isFullscreenImmersive]);

  // Preload all 40 page background images and catalog product images in browser cache
  // so page turns render background image and text in the exact same frame
  useEffect(() => {
    if (typeof window === 'undefined') return;
    Object.values(PAGE_BACKGROUNDS).forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
    // Load real products from Supabase
    let mounted = true;
    fetchProductsFromSupabase().then((products) => {
      if (!mounted) return;
      setAllProducts(products);
      products.forEach((p) => {
        if (p.image) {
          const img = new window.Image();
          img.src = p.image;
        }
      });
    });
    return () => { mounted = false; };
  }, []);

  const yuanProducts = allProducts.filter((p) => p.series === 'yuan');
  const heProducts = allProducts.filter((p) => p.series === 'he');
  const shengProducts = allProducts.filter((p) => p.series === 'sheng');
  const jingProducts = allProducts.filter((p) => p.series === 'jing');

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
  const renderPage = (pageIdx: number) => {
    const bgUrl = PAGE_BACKGROUNDS[pageIdx] || PAGE_BACKGROUNDS[0];

    return (
      <div 
        id="brand-book-page-container"
        className="relative h-full w-full p-6 md:p-10 flex flex-col justify-between overflow-hidden bg-[#0c120e] text-[#f6f2eb] border border-[#d2c4ad]/25 rounded-2xl shadow-2xl font-sans select-none"
      >
        {/* Background Atmosphere Image Layer - rendered with img tag for reliable loading & onError fallback */}
        <img 
          src={bgUrl} 
          alt={`UNIO Brand Book Page ${pageIdx + 1}`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1600';
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
      // P01: Cover Poster (3D Wavy Dark Emblem & Typography Mastery)
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
                Official Edition / 40 Pages
              </span>
            </div>

            {/* Central Focal Hero - Sculpted 3D Metallic Emblem & UnioAroma Branding */}
            <div className="relative z-10 my-auto flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto py-6">
              {/* Metallic 4-Petal Emblem Box matching user uploaded artwork */}
              <div className="relative p-8 rounded-full bg-black/40 backdrop-blur-xl border border-[#d2c4ad]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group transition-all duration-500 hover:border-[#d2c4ad]/60 hover:scale-105">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d2c4ad]/10 via-transparent to-white/10 opacity-50 blur-sm pointer-events-none" />
                <UnioLogo size={88} color="#e5d8c5" />
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-5xl md:text-6xl font-normal tracking-wide text-[#f6f2eb]">
                  UnioAroma
                </h1>
                <p className="font-serif text-lg tracking-[0.3em] text-[#d2c4ad] uppercase font-light">
                  UNIO · 元香
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-[#d2c4ad]/30 text-xs text-[#d2c4ad] font-mono tracking-widest uppercase shadow-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ORIGINAL HARMONY SANCTUARY · 廿三载寻香，始于觉知</span>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-[#d2c4ad]/20 backdrop-blur-md space-y-2 max-w-lg shadow-xl">
                <p className="text-xs md:text-sm leading-relaxed text-[#f6f2eb]/90 font-serif italic">
                  “从极境撷取芳香，因世界元于一息。”
                </p>
                <p className="text-[11px] text-[#b4aca2] font-light leading-relaxed">
                  CRAFT 23 Years · COLLECTIONS 4 Series · ORIGINS Global Botanicals 接近 50 国原产地直采。
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full pt-1 font-mono text-center text-xs">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
                  <span className="block text-[#d2c4ad] font-bold">元系 · 118款</span>
                  <span className="text-[9px] text-[#b4aca2]">单方与基底油</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
                  <span className="block text-[#d2c4ad] font-bold">合系 · 50款</span>
                  <span className="text-[9px] text-[#b4aca2]">身心灵复方</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
                  <span className="block text-[#d2c4ad] font-bold">生系 · 41款</span>
                  <span className="text-[9px] text-[#b4aca2]">有机纯露水相</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
                  <span className="block text-[#d2c4ad] font-bold">香系 · 10款</span>
                  <span className="text-[9px] text-[#b4aca2]">空间器物与扩香</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-[#d2c4ad]/20 flex items-center justify-between text-xs text-[#b4aca2] font-mono">
              <span className="tracking-widest">2003 - 2026 CONTINUUM</span>
              <span className="text-[#d2c4ad] tracking-widest uppercase">unioaroma.com</span>
            </div>
          </>
        );

      // P02: Brand Origin, Philosophy & Subdued Founder Memorial
      case 1:
        return (
          <>
            <div className="relative z-10 grid md:grid-cols-2 gap-6 h-full my-auto items-center">
              <div className="flex flex-col justify-between space-y-3.5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d2c4ad]/15 border border-[#d2c4ad]/30 text-[#d2c4ad] text-xs font-mono tracking-wider uppercase mb-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d2c4ad]" />
                    <span>P.02 · 品牌起源与融合秩序</span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-5xl font-normal leading-tight text-[#f6f2eb] mb-2.5">
                    极境寻香，<br />
                    <span className="text-[#d2c4ad]">融万物于一息。</span>
                  </h2>
                  <p className="text-xs md:text-sm leading-relaxed text-[#b4aca2]">
                    UNIO 元香创立于 2003 年。“UNIO”取意“融合与统一”，代表自然与生命的和谐共生。立足全球近 50 国原产地直采与 GC-MS 色谱严格检测，我们将对生命的温度沉淀为一套可追溯的纯素香气秩序。
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/15 text-xs text-[#f6f2eb]/90 leading-relaxed border-l-2 border-l-[#d2c4ad] space-y-1">
                  <p className="font-serif text-sm text-[#d2c4ad] italic">“从极境撷取芳香，因世界元于一息。”</p>
                  <p className="text-[10px] text-[#b4aca2] pt-0.5">ORIGINAL HARMONY SANCTUARY · 廿三载寻香，始于觉知。</p>
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

                {/* Subdued Founder Memorial Section placed at the lower section */}
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
                   style={{ backgroundImage: `url('https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000')` }}>
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
              <span>P.02 · BRAND ORIGIN & HERITAGE</span>
              <span>02 / 40</span>
            </div>
          </>
        );

      // P03: Master Manual Table of Contents (40-Page Map)
      case 2:
        return (
          <>
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold">P.03 · MASTER MANUAL CONTENTS</span>
              <span className="text-xs text-[#b4aca2]">40 页全册目录指南</span>
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
                  { no: '01', title: '品牌原点与故事', page: 'P.01 - P.08' },
                  { no: '02', title: '元系列 (118款) 单方与基础油', page: 'P.09 - P.18' },
                  { no: '03', title: '合系列 (50款) 身心灵协同复方', page: 'P.19 - P.22' },
                  { no: '04', title: '生系列 (41款) 有机纯露水相', page: 'P.23 - P.26' },
                  { no: '05', title: '香系列 (10款) 空间扩香与器物', page: 'P.27 - P.29' },
                  { no: '06', title: '219款 完整索引与矩阵', page: 'P.30 - P.33' },
                  { no: '07', title: '商业方案与空间定制', page: 'P.34 - P.39' },
                  { no: '08', title: '官方联系与展厅', page: 'P.40' },
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
              <span className="font-mono">03 / 40</span>
            </div>
          </>
        );

      // P04: Brand Core Philosophy & 4 Pillars
      case 3:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.04 · Brand Philosophy / 核心主张</div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#f6f2eb]">元香不是单一产品，而是一套可持续生长的芳香秩序。</h2>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3.5 my-auto">
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-[#d2c4ad] font-serif font-bold">
                  <Award className="w-4 h-4" />
                  <span>纯正天然与源头检定</span>
                </div>
                <p className="text-xs text-[#b4aca2]">沿用早期档案中严选的全球野生与有机蒸馏原料，具备 COA / MSDS 专业报告。</p>
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
              <span className="font-mono">04 / 40</span>
            </div>
          </>
        );

      // P05: Global Origin Sourcing Map
      case 4:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.05 · Global Origins / 全球原产地地图</div>
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
              <span className="font-mono">05 / 40</span>
            </div>
          </>
        );

      // P06: Distillation & Extraction Standards
      case 5:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.06 · Extraction Standards / 萃取与蒸馏工艺</div>
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
              <span className="font-mono">06 / 40</span>
            </div>
          </>
        );

      // P07: Quality Assurance & Testing Standards
      case 6:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.07 · Testing & Safety / 国际检测与安全规范</div>
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
              <span className="font-mono">07 / 40</span>
            </div>
          </>
        );

      // P08: Three Major R&D Studios
      case 7:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.08 · Three R&D Studios / 三大实验室</div>
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
              <span className="font-mono">08 / 40</span>
            </div>
          </>
        );

      // P09: Yuan Series Overview (118 Single Oils & Base Oils)
      case 8:
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
              <span className="font-mono">09 / 40</span>
            </div>
          </>
        );

      // P10: Yuan Metal Element (18 Single Oils)
      case 9:
        return renderYuanSpread('jin', '金系 Metal (18款) · 呼吸与理气', '以白千层、尤加利、乳香等为主，清醒通透，舒缓上呼吸道。', 10);

      // P11: Yuan Wood Element Part 1 (16 Single Oils)
      case 10:
        return renderYuanSpread('mu', '木系 Wood Part 1 (16款) · 疏肝与舒展', '包含松针、丝柏、樟树等，散发郁郁森林气息，提升机体活力。', 11);

      // P12: Yuan Wood Element Part 2 (16 Single Oils)
      case 11:
        return renderYuanSpread('mu2', '木系 Wood Part 2 (16款) · 树脂与森林沉降', '包含沉香、冷杉、杜松子等珍稀木质萃取，带来安稳与静心支持。', 12);

      // P13: Yuan Water Element (11 Single Oils)
      case 12:
        return renderYuanSpread('shui', '水系 Water (11款) · 固本与沉静', '岩兰草、老山檀香、广藿香等根部与深层油脂，凝神固本。', 13);

      // P14: Yuan Fire Element (9 Single Oils)
      case 13:
        return renderYuanSpread('huo', '火系 Fire (9款) · 温煦与欢愉', '依兰依兰、甜橙、黑胡椒等，唤醒热情与温暖能量。', 14);

      // P15: Yuan Earth Element (9 Single Oils)
      case 14:
        return renderYuanSpread('tu', '土系 Earth (9款) · 中正与归元', '小豆蔻、藏茴香、莳萝等，温和理气，帮助运化与接地感。', 15);

      // P16: Base Oils Part 1 (20 Vegetable Oils)
      case 15:
        return renderBaseOilSpread('part1', '基础植物油 Part 1 (20款) · 冷压油脂', '荷荷巴油、阿甘油、甜杏仁油等高纯度调配基底。', 16);

      // P17: Base Oils Part 2 (19 Vegetable Oils & Herbal Infusions)
      case 16:
        return renderBaseOilSpread('part2', '基础植物油 Part 2 (19款) · 稀有与浸泡油', '圣约翰草浸泡油、金盏花油、玫瑰果油等强效修护油脂。', 17);

      // P18: Yuan Formulation & Blending Dilution Guide
      case 17:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.18 · Blending Science / 单方精油调配与稀释比例</div>
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
              <span className="font-mono">18 / 40</span>
            </div>
          </>
        );

      // P19: He (合) Series Overview (15 Synergistic Blends)
      case 18:
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
              <span className="font-mono">19 / 40</span>
            </div>
          </>
        );

      // P20: Body Care Blends (17 Blends)
      case 19:
        return renderHeSubgroupSpread('body', '身 Body · 17款身体平衡复方', '关注肌肉张力、血液循环与生理节律照护。', 20);

      // P21: Mind Care Blends (17 Blends)
      case 20:
        return renderHeSubgroupSpread('mind', '心 Mind · 17款情绪减压复方', '安抚焦虑、改善睡眠质量与平复思绪。', 21);

      // P22: Soul Care Blends (16 Blends)
      case 21:
        return renderHeSubgroupSpread('soul', '灵 Soul · 16款冥想灵感复方', '助益瑜伽、禅修与深层自我对话。', 22);

      // P23: Sheng (生) Series Overview (41 Organic Hydrosols)
      case 22:
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
              <span className="font-mono">23 / 40</span>
            </div>
          </>
        );

      // P24: Purify Hydrosols (14 Hydrosols)
      case 23:
        return renderShengSubgroupSpread('purify', '清净系 Purify (14款) · 水油平衡与收敛', '净化毛孔、调理油脂与收敛肤感。', 24);

      // P25: Nourish Hydrosols (14 Hydrosols)
      case 24:
        return renderShengSubgroupSpread('nourish', '润养系 Nourish (14款) · 深度补水与弹润', '强健屏障、改善暗沉与深度注水。', 25);

      // P26: Soothe Hydrosols (13 Hydrosols)
      case 25:
        return renderShengSubgroupSpread('soothe', '舒缓系 Soothe (13款) · 敏感修护与退红', '抚平刺痛、安抚泛红与脆弱肌肤修护。', 26);

      // P27: Jing (香) Series Overview (10 Space & Lifestyle Objects)
      case 26:
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
                <p className="text-xs text-[#b4aca2]">野生沉香线香、手作黄铜香座与竹木收纳托盘。</p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>JING SERIES OVERVIEW</span>
              <span className="font-mono">27 / 40</span>
            </div>
          </>
        );

      // P28: Scent Realm Objects (5 Items)
      case 27:
        return renderJingSubgroupSpread('realm', '香境 Realm (5款) · 空间扩香与喷雾', '以气味重构空间氛围与居室节奏。', 28);

      // P29: Zen Contemplation Objects (5 Items)
      case 28:
        return renderJingSubgroupSpread('zen', '禅思 Zen (5款) · 沉香线香与手作器物', '静心品香与手工质感器物。', 29);

      // P30: Master Catalog Index Part 1 (Yuan Series 118 Codes)
      case 29:
        return (
          <>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold">
                  MASTER INDEX PART 1 / 219款图谱 (元系列 118款)
                </span>
                <span className="text-[10px] text-[#b4aca2] font-mono">118 ITEMS</span>
              </div>
              <h3 className="font-serif text-lg text-[#f6f2eb]">元系列 (Yuan Series) 完整产品编码与价格表</h3>
            </div>

            <div className="relative z-10 my-auto overflow-y-auto max-h-[360px] pr-1 space-y-2 no-scrollbar">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 text-[10px]">
                {yuanProducts.map((p) => (
                  <div 
                    key={p.code} 
                    onClick={() => onSelectProduct(p)}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#d2c4ad] hover:bg-white/10 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div className="truncate">
                      <span className="text-[#d2c4ad] font-mono mr-1 font-bold">{p.code}</span>
                      <span className="text-[#f6f2eb]">{p.cn}</span>
                    </div>
                    <span className="text-[#b4aca2] font-mono text-[9px] ml-1">{p.prices[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>YUAN SERIES INDEX</span>
              <span className="font-mono">30 / 40</span>
            </div>
          </>
        );

      // P31: Master Catalog Index Part 2 (He & Sheng Series Codes)
      case 30:
        return (
          <>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold">
                  MASTER INDEX PART 2 / 合系列 (50款) & 生系列 (41款)
                </span>
                <span className="text-[10px] text-[#b4aca2] font-mono">91 ITEMS</span>
              </div>
              <h3 className="font-serif text-lg text-[#f6f2eb]">合系列与生系列 完整检索矩阵</h3>
            </div>

            <div className="relative z-10 my-auto overflow-y-auto max-h-[360px] pr-1 space-y-3 no-scrollbar text-[10px]">
              <div>
                <span className="text-[#d2c4ad] font-serif font-bold block mb-1">合系列 (50款复方)</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {heProducts.map((p) => (
                    <div key={p.code} onClick={() => onSelectProduct(p)} className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#d2c4ad] cursor-pointer flex justify-between">
                      <span className="truncate"><strong className="text-[#d2c4ad] font-mono mr-1">{p.code}</strong>{p.cn}</span>
                      <span className="text-[#b4aca2] font-mono">{p.prices[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[#d2c4ad] font-serif font-bold block mb-1">生系列 (41款有机纯露)</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {shengProducts.map((p) => (
                    <div key={p.code} onClick={() => onSelectProduct(p)} className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#d2c4ad] cursor-pointer flex justify-between">
                      <span className="truncate"><strong className="text-[#d2c4ad] font-mono mr-1">{p.code}</strong>{p.cn}</span>
                      <span className="text-[#b4aca2] font-mono">{p.prices[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>HE & SHENG INDEX</span>
              <span className="font-mono">31 / 40</span>
            </div>
          </>
        );

      // P32: Master Catalog Index Part 3 (Jing Series & Price Distribution)
      case 31:
        return (
          <>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs tracking-widest text-[#d2c4ad] uppercase font-semibold">
                  MASTER INDEX PART 3 / 香系列 (10款) & 价格区间分布
                </span>
                <span className="text-[10px] text-[#b4aca2] font-mono">10 ITEMS</span>
              </div>
              <h3 className="font-serif text-lg text-[#f6f2eb]">香系列产品与 219 款价格梯度统计</h3>
            </div>

            <div className="relative z-10 my-auto space-y-4 text-xs">
              <div>
                <span className="text-[#d2c4ad] font-serif font-bold block mb-2">香系列 (10款空间器物)</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px]">
                  {jingProducts.map((p) => (
                    <div key={p.code} onClick={() => onSelectProduct(p)} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#d2c4ad] cursor-pointer flex justify-between">
                      <span className="truncate"><strong className="text-[#d2c4ad] font-mono mr-1">{p.code}</strong>{p.cn}</span>
                      <span className="text-[#b4aca2] font-mono">{p.prices[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-[#d2c4ad] font-serif font-bold block">219 款作品价格梯度区间</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] text-center">
                  <div className="p-2 rounded bg-black/40 border border-white/10">
                    <span className="text-[#d2c4ad] font-bold block">¥128 - ¥268</span>
                    <span className="text-[#b4aca2]">基础纯露 & 入门单方</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/10">
                    <span className="text-[#d2c4ad] font-bold block">¥280 - ¥480</span>
                    <span className="text-[#b4aca2]">复方精油 & 进阶单方</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/10">
                    <span className="text-[#d2c4ad] font-bold block">¥580 - ¥980</span>
                    <span className="text-[#b4aca2]">珍稀萃取 & 空间扩香</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/10">
                    <span className="text-[#d2c4ad] font-bold block">¥1280 - ¥3200</span>
                    <span className="text-[#b4aca2]">老山檀/大马士革玫瑰/沉香</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>JING INDEX & PRICE RANGE</span>
              <span className="font-mono">32 / 40</span>
            </div>
          </>
        );

      // P33: Digital Interactive Search Gateway
      case 32:
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
              <span className="font-mono">33 / 40</span>
            </div>
          </>
        );

      // P34: Commercial Space Solutions
      case 33:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.34 · Commercial Scenarios / 商业空间香氛方案</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">精品酒店 · 高端 SPA · 瑜伽理疗空间。</h2>
            </div>

            <div className="relative z-10 grid md:grid-cols-3 gap-3 my-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <Building className="w-5 h-5 text-[#d2c4ad]" />
                <h4 className="font-serif text-sm text-[#f6f2eb]">精品美学酒店</h4>
                <p className="text-[11px] text-[#b4aca2]">公区新风冷香扩香、客房睡眠安抚备品与定制气味名片。</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <Heart className="w-5 h-5 text-[#d2c4ad]" />
                <h4 className="font-serif text-sm text-[#f6f2eb]">高端 SPA & 疗愈馆</h4>
                <p className="text-[11px] text-[#b4aca2]">一人一方前诊精油调配、身体按摩基础油与有机纯露敷面。</p>
              </div>

              <div className="p-4 rounded-xl bg-[#1c2923] border border-white/10 space-y-2">
                <Leaf className="w-5 h-5 text-[#d2c4ad]" />
                <h4 className="font-serif text-sm text-[#f6f2eb]">瑜伽与冥想空间</h4>
                <p className="text-[11px] text-[#b4aca2]">灵系复方天然无火扩香、手作沉香线香与氛围喷雾。</p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>COMMERCIAL SOLUTIONS</span>
              <span className="font-mono">34 / 40</span>
            </div>
          </>
        );

      // P35: Enterprise Customization & OEM/ODM
      case 34:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.35 · Customization & OEM/ODM / 企业礼赠与高定</div>
              <h2 className="font-serif text-2xl text-[#f6f2eb]">企业专属气味定制与高定代工。</h2>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-4 my-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs font-serif text-[#d2c4ad] font-bold block">企业高级礼盒 Custom Gifts</span>
                <p className="text-xs text-[#b4aca2] leading-relaxed">
                  可定制紫晶瓶烫金 Logo、专属香气卡与高定手作香盒，提供端午、中秋及品牌周年庆尊荣礼赠。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs font-serif text-[#d2c4ad] font-bold block">高定配方代工 OEM/ODM</span>
                <p className="text-xs text-[#b4aca2] leading-relaxed">
                  依靠三大工作室成熟研发能力，支持从小批量高定打样至大批量标准化灌装生产。
                </p>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-3 flex justify-between text-xs text-[#b4aca2]">
              <span>ENTERPRISE CUSTOMIZATION</span>
              <span className="font-mono">35 / 40</span>
            </div>
          </>
        );

      // P36: Wholesale & Partner Policies
      case 35:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.36 · Partner Policies / 经销商与加盟合作政策</div>
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
              <span className="font-mono">36 / 40</span>
            </div>
          </>
        );

      // P37: Brand Academy & Aromatherapy Training
      case 36:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.37 · UNIO Academy / 芳疗师培与气味沙龙</div>
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
              <span className="font-mono">37 / 40</span>
            </div>
          </>
        );

      // P38: Sustainability & Ethical Sourcing
      case 37:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.38 · Sustainability / 可持续承诺与环保</div>
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
              <span className="font-mono">38 / 40</span>
            </div>
          </>
        );

      // P39: Selected Client Case Studies
      case 38:
        return (
          <>
            <div className="relative z-10 space-y-1">
              <div className="text-xs tracking-widest text-[#d2c4ad] uppercase">P.39 · Case Studies / 精选合作空间案例</div>
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
              <span className="font-mono">39 / 40</span>
            </div>
          </>
        );

      // P40: Back Cover & Contact Information
      case 39:
      default:
        return (
          <>
            <div className="relative z-10 border-b border-white/15 pb-3 flex justify-between items-center text-xs">
              <span className="tracking-[0.25em] text-[#d2c4ad] uppercase font-semibold">UNIO AROMA · ENDING NOTE</span>
              <span className="text-[#b4aca2]">P.40 · 封底与联系</span>
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

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-left space-y-1 font-mono max-w-xs mx-auto text-[#d2c4ad]">
                <p>官方网站: unioaroma.com</p>
                <p>商务邮箱: partner@unioaroma.com</p>
                <p>微信公众号: UNIO元香官方</p>
                <p>线下展厅: 成都 · 宁波 · 芭提雅</p>
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
      prods = prods.filter((p) => p.cn.includes(yuanSearch) || p.code.toLowerCase().includes(yuanSearch.toLowerCase()));
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

        <div className="relative z-10 my-2 flex-1 overflow-y-auto max-h-[380px] pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 no-scrollbar">
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
          <span className="font-mono">{pageNum} / 40</span>
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

        <div className="relative z-10 my-2 flex-1 overflow-y-auto max-h-[380px] pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 no-scrollbar">
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
          <span className="font-mono">{pageNum} / 40</span>
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

        <div className="relative z-10 my-2 flex-1 space-y-2.5">
          {prods.map((p) => (
            <div
              key={p.code}
              onClick={() => onSelectProduct(p)}
              className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 hover:border-[#d2c4ad] hover:bg-black/60 transition-all cursor-pointer flex items-center gap-3"
            >
              <img src={p.image || 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600'} alt={p.cn} loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600'; }} className="w-12 h-12 rounded-lg object-cover bg-black/40 flex-shrink-0 border border-white/10" />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[10px] text-[#d2c4ad] font-mono font-bold">{p.code}</span>
                  <span className="text-[10px] text-[#b4aca2] font-mono">{p.prices[0]}</span>
                </div>
                <h4 className="font-serif text-xs text-[#f6f2eb] font-semibold">{p.cn} · {p.en}</h4>
                <p className="text-[10px] text-[#b4aca2] line-clamp-1">{p.shortDesc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 border-t border-white/10 pt-2 flex items-center justify-between text-[10px] text-[#b4aca2]">
          <span>精准分子协同复配，支持一人一方微调</span>
          <span className="font-mono">{pageNum} / 40</span>
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

        <div className="relative z-10 my-2 flex-1 overflow-y-auto max-h-[380px] pr-1 grid grid-cols-2 sm:grid-cols-3 gap-2 no-scrollbar">
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
          <span className="font-mono">{pageNum} / 40</span>
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

        <div className="relative z-10 my-2 flex-1 space-y-2.5">
          {prods.map((p) => (
            <div
              key={p.code}
              onClick={() => onSelectProduct(p)}
              className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 hover:border-[#d2c4ad] hover:bg-black/60 transition-all cursor-pointer flex items-center gap-3"
            >
              <img src={p.image || 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600'} alt={p.cn} loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600'; }} className="w-12 h-12 rounded-lg object-cover bg-black/40 flex-shrink-0 border border-white/10" />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[10px] text-[#d2c4ad] font-mono font-bold">{p.code}</span>
                  <span className="text-[10px] text-[#b4aca2] font-mono">{p.prices[0]}</span>
                </div>
                <h4 className="font-serif text-xs text-[#f6f2eb] font-semibold">{p.cn} · {p.en}</h4>
                <p className="text-[10px] text-[#b4aca2] line-clamp-1">{p.shortDesc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 border-t border-white/10 pt-2 flex items-center justify-between text-[10px] text-[#b4aca2]">
          <span>天然原石、沉香与匠人手作美学器物</span>
          <span className="font-mono">{pageNum} / 40</span>
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
            <span>40页画册翻页</span>
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
            <span>40页海报全景总览</span>
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

        {/* Center: Flip Controls */}
        {viewMode === 'flip' && (
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="p-2 rounded-full bg-[#F9F7F2] border border-[#2D2D2A]/15 hover:bg-[#DED9D2] text-[#2D2D2A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono tracking-widest text-[#2D2D2A] font-medium">
              P.{String(currentPage + 1).padStart(2, '0')} / P.{String(TOTAL_PAGES).padStart(2, '0')}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === TOTAL_PAGES - 1}
              className="p-2 rounded-full bg-[#F9F7F2] border border-[#2D2D2A]/15 hover:bg-[#DED9D2] text-[#2D2D2A] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Right: Quick Jump Sections */}
        <div className="flex items-center gap-1.5 text-xs overflow-x-auto no-scrollbar">
          <span className="text-[#8C7E6A] text-[11px] hidden lg:inline font-mono">跳转:</span>
          {[
            { label: '封面 P.01', page: 0 },
            { label: '起源 P.02', page: 1 },
            { label: '目录 P.03', page: 2 },
            { label: '元系 P.09', page: 8 },
            { label: '合系 P.19', page: 18 },
            { label: '生系 P.23', page: 22 },
            { label: '香系 P.27', page: 26 },
            { label: '总图谱 P.30', page: 29 },
            { label: '商业定制 P.34', page: 33 },
            { label: '封底 P.40', page: 39 },
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

          {/* Book Canvas Stage */}
          <div 
            className="relative w-full max-w-4xl mx-auto aspect-[1/1.35] min-h-[600px] sm:min-h-[750px] touch-pan-y"
            onTouchStart={handleTouchStart}
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
                {renderPage(idx)}
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
                支持一次性打包导出全书 40 页高清 JPEG 压缩包、单文件离线 HTML 或 1:1 矢量 PDF。
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
                      <span>一次性打包导出全部 40 页 JPEG</span>
                      <span className="text-[10px] font-sans font-normal px-2 py-0.5 bg-[#d2c4ad]/20 text-[#d2c4ad] rounded-full border border-[#d2c4ad]/30">推荐 · 高清全图集</span>
                    </h4>
                    <p className="text-xs text-[#F9F7F2]/80 mt-1 leading-relaxed">
                      自动逐页高清捕捉全书 40 页画面，打包压缩为单文件 ZIP 包（下载解压即得 P.01-P.40 高清图片）。
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
                      <span>打包导出全部 40 页 (ZIP)</span>
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
                    下载为单文件 `.html`，放到桌面后无需联网即可双击在浏览器中直接翻阅 40 页画册。
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
            className="fixed inset-0 z-50 bg-[#060a07] text-[#f6f2eb] flex flex-col justify-between p-3 sm:p-6 select-none overflow-hidden backdrop-blur-3xl font-sans"
          >
            {/* Top Bar: Minimal Chrome */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 max-w-7xl w-full mx-auto">
              <div className="flex items-center gap-3">
                <UnioLogo size={28} color="#d2c4ad" />
                <div>
                  <span className="font-serif text-sm font-semibold tracking-wider text-[#d2c4ad] block">
                    UNIO 元香 · 40页品牌全景手册 [100% 沉浸全屏]
                  </span>
                  <span className="text-[10px] text-[#b4aca2] font-mono tracking-widest uppercase">
                    IMMERSIVE FULLSCREEN MANUAL · 2003-2026
                  </span>
                </div>
              </div>

              {/* Display Scale Switcher */}
              <div className="flex items-center gap-1.5 bg-black/60 border border-white/15 p-1 rounded-full backdrop-blur-md text-[11px] font-mono">
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
                  125% 放大沉浸
                </button>
              </div>

              {/* Center Quick Page Range Indicator */}
              <div className="flex items-center gap-3 bg-black/60 border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-md">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="p-1 rounded-full text-[#d2c4ad] hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="上一页"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono tracking-widest text-[#d2c4ad] font-semibold">
                  P.{String(currentPage + 1).padStart(2, '0')} / P.{String(TOTAL_PAGES).padStart(2, '0')}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === TOTAL_PAGES - 1}
                  className="p-1 rounded-full text-[#d2c4ad] hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="下一页"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Exit Immersive Button */}
              <button
                onClick={handleCloseFullscreen}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#d2c4ad] hover:text-white text-xs font-medium transition-all shadow-lg hover:scale-105"
              >
                <Minimize2 className="w-4 h-4" />
                <span className="hidden sm:inline">退出沉浸全屏</span>
                <span className="text-[10px] font-mono text-[#d2c4ad]/60">(Esc)</span>
              </button>
            </div>

            {/* Center Area: Page Book Canvas with Touch/Gesture Page Turning */}
            <div 
              className="relative my-auto w-full max-w-7xl mx-auto flex items-center justify-center h-[calc(100vh-120px)] touch-pan-y py-2"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Left Arrow Floating Button */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="absolute left-2 sm:left-4 lg:left-8 z-30 group flex flex-col items-center gap-1.5 p-3 sm:p-5 rounded-2xl bg-black/80 hover:bg-black border border-[#d2c4ad]/40 text-[#d2c4ad] hover:text-white hover:scale-110 active:scale-95 disabled:opacity-10 disabled:cursor-not-allowed transition-all backdrop-blur-xl shadow-2xl"
                title="上一页 (← / A 键)"
              >
                <ChevronLeft className="w-6 h-6 sm:w-9 sm:h-9 transition-transform group-hover:-translate-x-1" />
                <span className="text-[10px] font-mono tracking-widest font-bold uppercase hidden sm:block">
                  {currentPage > 0 ? `P.${String(currentPage).padStart(2, '0')}` : '封面'}
                </span>
                <span className="text-[9px] text-[#b4aca2] font-mono hidden sm:block">上一页 [←]</span>
              </button>

              {/* Main Immersive Page Render Box */}
              <div 
                className={`transition-all duration-300 flex items-center justify-center ${
                  fullscreenScaleMode === 'height-fit'
                    ? 'h-[calc(100vh-130px)] max-h-[88vh] aspect-[1/1.35] w-auto max-w-[92vw]'
                    : fullscreenScaleMode === 'width-fit'
                    ? 'w-full max-w-5xl h-[calc(100vh-110px)] aspect-[1/1.35]'
                    : 'w-full max-w-6xl h-[calc(100vh-80px)] aspect-[1/1.35] scale-105'
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
                  >
                    {renderPage(currentPage)}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Arrow Floating Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === TOTAL_PAGES - 1}
                className="absolute right-2 sm:right-4 lg:right-8 z-30 group flex flex-col items-center gap-1.5 p-3 sm:p-5 rounded-2xl bg-black/80 hover:bg-black border border-[#d2c4ad]/40 text-[#d2c4ad] hover:text-white hover:scale-110 active:scale-95 disabled:opacity-10 disabled:cursor-not-allowed transition-all backdrop-blur-xl shadow-2xl"
                title="下一页 (→ / D 键)"
              >
                <ChevronRight className="w-6 h-6 sm:w-9 sm:h-9 transition-transform group-hover:translate-x-1" />
                <span className="text-[10px] font-mono tracking-widest font-bold uppercase hidden sm:block">
                  {currentPage < TOTAL_PAGES - 1 ? `P.${String(currentPage + 2).padStart(2, '0')}` : '封底'}
                </span>
                <span className="text-[9px] text-[#b4aca2] font-mono hidden sm:block">下一页 [→]</span>
              </button>
            </div>

            {/* Bottom Floating Minimalist Bar */}
            <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10 max-w-7xl w-full mx-auto text-xs text-[#b4aca2] font-mono">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#d2c4ad]" />
                <span>左右划动手势 / 键盘方向键 (← →) 翻页</span>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full">
                {[
                  { label: '封面 P.01', page: 0 },
                  { label: '目录 P.03', page: 2 },
                  { label: '元系 P.09', page: 8 },
                  { label: '合系 P.19', page: 18 },
                  { label: '生系 P.23', page: 22 },
                  { label: '香系 P.27', page: 26 },
                  { label: '总图谱 P.30', page: 29 },
                  { label: '封底 P.40', page: 39 },
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
