import React, { useState, useEffect, useMemo } from 'react';
import { ProductItem } from '../types';
import { 
  X, ShieldCheck, Copy, Check, MapPin, Sparkles, BookOpen, Layers, 
  Droplet, Feather, TestTube, Compass, Clock, HeartHandshake, Award, FileText,
  Star, MessageSquareQuote, ThumbsUp, UserCheck, Send, CheckCircle2, Heart,
  Zap, Plus, ArrowRight, RotateCcw, Calculator, Sliders, ShieldAlert, FlaskConical, Scale,
  AlertTriangle, Sun, Baby, HeartPulse, Brain, Moon, Wind, Activity, Download, Image, Package
} from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { ALL_PRODUCTS, PRODUCT_DIARY_MAP } from '../data/catalogData';
import { FormulaSynergyPredictor } from './FormulaSynergyPredictor';
import { AromatherapySafetyAlert } from './AromatherapySafetyAlert';
import { SynergyRadarComparison } from './SynergyRadarComparison';
import { SpaceDiffusionCalculator } from './SpaceDiffusionCalculator';
import { getProductTypeSafetyNotice } from '../utils/productSafetyUtils';
import { CompoundIngredientsSynergy } from './CompoundIngredientsSynergy';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCustomBlend?: (product: ProductItem) => void;
  onSelectProduct?: (product: ProductItem) => void;
}

type TabKey = 'overview' | 'scenarios' | 'chemistry' | 'reviews' | 'traceability';

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product: initialProduct,
  onClose,
  onAddToCustomBlend,
  onSelectProduct
}) => {
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(initialProduct);
  const [productHistory, setProductHistory] = useState<ProductItem[]>([]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [blendAddedToast, setBlendAddedToast] = useState<string | null>(null);

  // Synchronize initial product when prop changes
  useEffect(() => {
    setActiveProduct(initialProduct);
    setProductHistory([]);
  }, [initialProduct]);

  const product = activeProduct;

  // Reviews state
  const [reviewsList, setReviewsList] = useState<NonNullable<ProductItem['userReviews']>>([]);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  
  // New Review Form state
  const [showForm, setShowForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserTag, setNewUserTag] = useState('资深芳疗爱好者');
  const [newRating, setNewRating] = useState(5);
  const [newScenario, setNewScenario] = useState('');
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Dilution Calculator State
  const [calcCarrierMl, setCalcCarrierMl] = useState<number>(30);
  const [calcDilutionPercent, setCalcDilutionPercent] = useState<number>(1.0);
  const [selectedPartnerIndex, setSelectedPartnerIndex] = useState<number>(0);
  const [radarSecondaryProduct, setRadarSecondaryProduct] = useState<ProductItem | null>(null);

  // Card Exporter State
  const [isExportingCard, setIsExportingCard] = useState(false);
  const [exportCardSuccessToast, setExportCardSuccessToast] = useState<string | null>(null);
  const [customCardNote, setCustomCardNote] = useState<string>('赠予挚友·晚安舒压特调');
  const [customCardDate, setCustomCardDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    if (product?.userReviews) {
      setReviewsList(product.userReviews);
    } else {
      setReviewsList([]);
    }
  }, [product]);

  // Ingredient Synergy Analysis & Brand Product Pairing Calculations
  const synergyRecommendations = useMemo(() => {
    if (!product || !ALL_PRODUCTS || ALL_PRODUCTS.length === 0) return [];

    const otherProducts = ALL_PRODUCTS.filter((p) => p.code !== product.code);
    const currentSubgroup = product.subgroup || '';
    const currentSeries = product.series || '';

    // Find complementary products
    const rec1 = otherProducts.find((p) => {
      if (currentSubgroup.includes('花') || currentSubgroup.includes('柑橘')) {
        return p.subgroup.includes('木') || p.subgroup.includes('树脂');
      }
      return p.subgroup.includes('花') || p.subgroup.includes('草本');
    }) || otherProducts[0];

    const rec2 = otherProducts.find((p) => {
      return p.code !== rec1.code && p.series !== currentSeries;
    }) || otherProducts[1] || otherProducts[0];

    const rec3 = otherProducts.find((p) => {
      return p.code !== rec1.code && p.code !== rec2.code && (p.cn.includes('乳香') || p.cn.includes('薰衣草') || p.cn.includes('檀香') || p.cn.includes('佛手柑'));
    }) || otherProducts[2] || otherProducts[0];

    return [
      {
        product: rec1,
        matchScore: 98,
        synergyType: '理化成分双效协同',
        principle: `【${product.cn}】核心成分与【${rec1.cn}】之${rec1.subgroup}活性互补，挥发分子间形成双相交联网络，可显著提升留香延展度与肌底修护协同效果。`,
        ratio: `建议复配比例 2:1 （${product.cn} 2滴 + ${rec1.cn} 1滴）`,
      },
      {
        product: rec2,
        matchScore: 95,
        synergyType: '前中尾调香阶平衡',
        principle: `【${product.cn}】与【${rec2.cn}】共构圆融的前中尾调相阶。清灵前调与温润尾调交织，有效平缓情绪张力，升华空间与身心气场。`,
        ratio: `建议扩香比例 3:2 （滴入扩香仪/扩香石）`,
      },
      {
        product: rec3,
        matchScore: 92,
        synergyType: '五行相生与深层疗愈',
        principle: `在 UNIO 品牌植萃体系中，两者属经典相生组合。融合【${product.cn}】之${product.subgroup}行韵与【${rec3.cn}】之沉静质感，深层舒缓累积压力。`,
        ratio: `建议复配比例 1:1 （加入10ml植物底油复配）`,
      },
    ];
  }, [product]);

  // Dilution calculation: 1 ml = 20 drops
  const calcTotalDrops = useMemo(() => {
    return Math.max(1, Math.round(calcCarrierMl * (calcDilutionPercent / 100) * 20));
  }, [calcCarrierMl, calcDilutionPercent]);

  const partnerProduct = synergyRecommendations[selectedPartnerIndex]?.product || null;

  const dropsProductA = useMemo(() => {
    if (!partnerProduct) return calcTotalDrops;
    return Math.max(1, Math.round(calcTotalDrops * 0.6));
  }, [calcTotalDrops, partnerProduct]);

  const dropsProductB = useMemo(() => {
    if (!partnerProduct) return 0;
    return Math.max(0, calcTotalDrops - dropsProductA);
  }, [calcTotalDrops, dropsProductA, partnerProduct]);

  // Dynamic Safety & Contraindications Profile
  const safetyProfile = useMemo(() => {
    if (!product) return null;
    const name = (product.cn + ' ' + product.en + ' ' + (product.subgroup || '')).toLowerCase();

    // Photosensitivity Risk
    const isPhotosensitive = /柑橘|柠檬|佛手柑|葡萄柚|青柠|citrus|bergamot|lemon|grapefruit|lime/i.test(name);

    // Pregnancy & Lactation Risk
    const isHighPregnancyCaution = /迷迭香|鼠尾草|樟树|百里香|牛至|桂皮|肉桂|rosemary|sage|thyme|cinnamon/i.test(name);
    const isModeratePregnancyCaution = /玫瑰|薰衣草|茉莉|依兰|天竺葵|rose|lavender|jasmine|ylang/i.test(name);

    // Allergens
    const allergens: string[] = [];
    if (/柑橘|佛手柑|柠檬|甜橙|松木|冷杉|杜松/i.test(name)) allergens.push('柠檬烯 (Limonene)', '蒎烯 (Pinene)');
    if (/薰衣草|玫瑰|鼠尾草|天竺葵|依兰|花/i.test(name)) allergens.push('芳樟醇 (Linalool)', '香叶醇 (Geraniol)');
    if (/丁香|肉桂|桂皮/i.test(name)) allergens.push('丁香油酚 (Eugenol)');
    if (/柠檬草|香茅|山苍子/i.test(name)) allergens.push('柠檬醛 (Citral)');
    if (allergens.length === 0) allergens.push('芳樟醇 (Linalool)', '乙酸芳樟酯 (Linalyl Acetate)');

    return {
      isPhotosensitive,
      photosensitivityText: isPhotosensitive
        ? '强光敏性风险：含有冷压呋喃香豆素成分。涂抹于皮肤后 12 小时内必须严格避免日光或紫外线灯照射，建议仅在夜间使用或进行无接触扩香。'
        : '无明显光敏性：本品不含高剂量呋喃香豆素，可在日间配合基础油正常涂抹使用。',
      pregnancyStatus: isHighPregnancyCaution
        ? '孕期全阶段禁用'
        : isModeratePregnancyCaution
        ? '孕早期(前12周)禁用'
        : '孕中晚期谨慎低浓度使用',
      pregnancyBadgeColor: isHighPregnancyCaution
        ? 'bg-red-500/20 text-red-300 border-red-500/40'
        : isModeratePregnancyCaution
        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        : 'bg-[#C5B49A]/20 text-[#C5B49A] border-[#C5B49A]/30',
      pregnancyDesc: isHighPregnancyCaution
        ? '含有高活性单萜酮类或酚类分子，具有强通经或促进宫缩风险，孕期及哺乳期女性禁用。'
        : isModeratePregnancyCaution
        ? '含挥发性芳香酯类，孕早期（前12周）建议严格禁用；孕中后期扩香浓度需控制在 0.5% 以下。'
        : '建议在专业芳疗师指导下使用，面部调配浓度低于 0.5%。',
      allergens,
      skinPatchDirective: '初次使用前，请将 1 滴精油溶于 5ml 基础油中，涂抹于手臂内侧，观察 24 小时无红肿或瘙痒感后再进行大面积使用。',
      maxFacialConc: isPhotosensitive ? '0.5% - 1.0%' : '1.0% - 2.0%',
    };
  }, [product]);

  // Dynamic Product Type Specific Safety Notice (单方、复方、纯露、香器)
  const typeNotice = useMemo(() => {
    return product ? getProductTypeSafetyNotice(product) : null;
  }, [product]);

  // Dynamic Essential Oil Efficacy Spectrum Visualization
  const efficacySpectrum = useMemo(() => {
    if (!product) return [];
    const text = (
      product.cn + ' ' +
      product.en + ' ' +
      product.subgroup + ' ' +
      (product.scentProfile?.description || '')
    ).toLowerCase();

    let emotional = 85;
    let sleep = 70;
    let respiratory = 65;
    let skinRepair = 75;
    let focus = 60;

    if (/舒缓|放松|安神|薰衣草|檀香|乳香|沉香|洋甘菊|睡眠|静心/i.test(text)) {
      sleep = 96; emotional = 94; skinRepair = 88;
    }
    if (/焕活|提神|专注|迷迭香|薄荷|尤加利|柠檬|葡萄柚|醒脑|灵感/i.test(text)) {
      focus = 95; respiratory = 92; emotional = 88; sleep = 40;
    }
    if (/修护|屏障|消炎|大马士革玫瑰|茶树|广藿香|没药|积雪草|润泽/i.test(text)) {
      skinRepair = 96; emotional = 82; sleep = 75;
    }
    if (/通透|呼吸|尤加利|松木|冷杉|柏木|罗勒/i.test(text)) {
      respiratory = 96; focus = 88; emotional = 80;
    }

    return [
      { label: '情绪舒缓 & 压力疏解', score: emotional, icon: HeartPulse, color: 'from-[#C5B49A] to-[#E8DAC8]', desc: '平缓中枢交感神经张力，沉降情绪焦虑与烦躁气场' },
      { label: '深度睡眠 & 镇静安神', score: sleep, icon: Moon, color: 'from-[#4E8B5E] to-[#88B04B]', desc: '诱导副交感神经兴奋，延长深睡波长与恢复效率' },
      { label: '肌肤屏障修护 & 赋活', score: skinRepair, icon: Sparkles, color: 'from-[#D4AF37] to-[#F3E5AB]', desc: '清除脂质自由基，增强表皮脂质屏障水合力' },
      { label: '呼吸道通透 & 净化', score: respiratory, icon: Wind, color: 'from-[#3A7CA5] to-[#81C7D4]', desc: '挥发性单萜烯成分清通呼吸道通道，净化空间气味' },
      { label: '专注沉静 & 认知提振', score: focus, icon: Brain, color: 'from-[#9B59B6] to-[#D8BFD8]', desc: '刺激脑α波活动，升华专注力与直觉灵感觉知' },
    ];
  }, [product]);

  // Export Formula Card as PNG image using 2D Canvas
  const handleExportFormulaCard = () => {
    if (!product) return;
    setIsExportingCard(true);

    try {
      const canvas = document.createElement('canvas');
      const width = 1000;
      const height = 1380;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background Fill
      ctx.fillStyle = '#0F1712';
      ctx.fillRect(0, 0, width, height);

      // Subtle Radial Light Accent
      const radGrad = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, 650);
      radGrad.addColorStop(0, 'rgba(28, 46, 32, 0.95)');
      radGrad.addColorStop(1, 'rgba(15, 23, 18, 1)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      // Ornate Double Gold Frames
      ctx.strokeStyle = '#C5B49A';
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 30, width - 60, height - 60);

      ctx.strokeStyle = 'rgba(197, 180, 154, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(42, 42, width - 84, height - 84);

      // Four Corner Accents
      const drawCorner = (x: number, y: number, dirX: number, dirY: number) => {
        ctx.beginPath();
        ctx.moveTo(x, y + dirY * 25);
        ctx.lineTo(x, y);
        ctx.lineTo(x + dirX * 25, y);
        ctx.strokeStyle = '#C5B49A';
        ctx.lineWidth = 4;
        ctx.stroke();
      };
      drawCorner(30, 30, 1, 1);
      drawCorner(width - 30, 30, -1, 1);
      drawCorner(30, height - 30, 1, -1);
      drawCorner(width - 30, height - 30, -1, -1);

      // Large Translucent Watermark Text
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(-Math.PI / 6);
      ctx.font = 'bold 72px serif';
      ctx.fillStyle = 'rgba(197, 180, 154, 0.04)';
      ctx.textAlign = 'center';
      ctx.fillText('UNIO BOTANICAL ARCHIVE', 0, -30);
      ctx.fillText('东方植萃 芳疗验印', 0, 70);
      ctx.restore();

      // Header Section
      ctx.textAlign = 'center';
      ctx.fillStyle = '#C5B49A';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('UNIO BOTANICAL FORMULATION RECORD', width / 2, 95);

      ctx.font = 'bold 36px serif';
      ctx.fillStyle = '#E8DAC8';
      ctx.fillText('专属东方芳疗调配案', width / 2, 145);

      ctx.font = '14px sans-serif';
      ctx.fillStyle = 'rgba(232, 218, 200, 0.75)';
      ctx.fillText('专业精油安全稀释与调配滴数报告 · 品牌典藏版', width / 2, 175);

      // Divider Line
      ctx.beginPath();
      ctx.moveTo(100, 200);
      ctx.lineTo(width - 100, 200);
      ctx.strokeStyle = 'rgba(197, 180, 154, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Helper for wrapping text
      const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
        let words = text.split('');
        let line = '';
        let currentY = y;
        for (let n = 0; n < words.length; n++) {
          let testLine = line + words[n];
          let metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line, x, currentY);
            line = words[n];
            currentY += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, x, currentY);
        return currentY;
      };

      // Main Formula Specs Card Box
      ctx.fillStyle = 'rgba(28, 46, 32, 0.85)';
      ctx.fillRect(80, 230, width - 160, 350);
      ctx.strokeStyle = 'rgba(197, 180, 154, 0.4)';
      ctx.lineWidth = 1;
      ctx.strokeRect(80, 230, width - 160, 350);

      // Specs Title
      ctx.textAlign = 'left';
      ctx.font = 'bold 18px serif';
      ctx.fillStyle = '#C5B49A';
      ctx.fillText('【调配参数与配比方案】', 110, 270);

      ctx.font = '16px serif';
      ctx.fillStyle = '#E8DAC8';
      ctx.fillText(`主调单方精油： ${product.cn} (${product.code})`, 110, 315);

      if (partnerProduct) {
        ctx.fillText(`协同复配搭档： ${partnerProduct.cn} (${partnerProduct.code})`, 110, 355);
      } else {
        ctx.fillText(`协同复配搭档： 单调高纯度稀释使用`, 110, 355);
      }

      ctx.fillText(`基础油/植物油容量： ${calcCarrierMl} ml`, 110, 395);
      ctx.fillText(`目标配比浓度： ${calcDilutionPercent} %`, 110, 435);

      // Big Drops Display Box
      ctx.fillStyle = 'rgba(15, 23, 18, 0.9)';
      ctx.fillRect(width - 380, 260, 260, 160);
      ctx.strokeStyle = 'rgba(197, 180, 154, 0.5)';
      ctx.strokeRect(width - 380, 260, 260, 160);

      ctx.textAlign = 'center';
      ctx.font = '12px monospace';
      ctx.fillStyle = 'rgba(232, 218, 200, 0.7)';
      ctx.fillText('精油换算滴数 (1ml≈20滴)', width - 250, 295);

      ctx.font = 'bold 44px serif';
      ctx.fillStyle = '#C5B49A';
      ctx.fillText(`${calcTotalDrops} 滴`, width - 250, 355);

      ctx.font = '13px sans-serif';
      ctx.fillStyle = '#E8DAC8';
      if (partnerProduct) {
        ctx.fillText(`主调 ${dropsProductA}滴 + 协同 ${dropsProductB}滴`, width - 250, 395);
      } else {
        ctx.fillText(`高纯单方精油 ${calcTotalDrops}滴`, width - 250, 395);
      }

      // Usage Rationale
      ctx.textAlign = 'left';
      ctx.font = 'bold 15px serif';
      ctx.fillStyle = '#C5B49A';
      ctx.fillText('建议操作：', 110, 485);

      ctx.font = '14px sans-serif';
      ctx.fillStyle = 'rgba(232, 218, 200, 0.9)';
      const ratioText = partnerProduct
        ? `按 ${dropsProductA}:${dropsProductB} 复配主调与协同精油。加入 ${calcCarrierMl}ml 植物基础油，避光轻摇均匀后置于阴凉处熟成 24 小时即可。`
        : `取 ${calcCarrierMl}ml 植物基础油，滴入 ${calcTotalDrops} 滴 ${product.cn}，轻摇均匀后即可用于面部或身体护理。`;
      wrapText(ratioText, 110, 515, width - 220, 24);

      // Safety Advisory Box
      ctx.fillStyle = 'rgba(24, 17, 13, 0.9)';
      ctx.fillRect(80, 610, width - 160, 380);
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
      ctx.lineWidth = 1;
      ctx.strokeRect(80, 610, width - 160, 380);

      ctx.font = 'bold 18px serif';
      ctx.fillStyle = '#F59E0B';
      ctx.fillText('【专业芳疗安全与禁忌指南】', 110, 645);

      if (safetyProfile) {
        ctx.font = 'bold 15px serif';
        ctx.fillStyle = '#E8DAC8';
        ctx.fillText(`• 孕期及哺乳期： ${safetyProfile.pregnancyStatus}`, 110, 680);

        ctx.font = '13px sans-serif';
        ctx.fillStyle = 'rgba(232, 218, 200, 0.8)';
        wrapText(safetyProfile.pregnancyDesc, 130, 705, width - 260, 22);

        ctx.font = 'bold 15px serif';
        ctx.fillStyle = '#E8DAC8';
        ctx.fillText(`• 光敏性预警： ${safetyProfile.isPhotosensitive ? '含有日光光敏成分 (涂抹后12小时避光)' : '无日光光敏风险'}`, 110, 765);

        ctx.font = '13px sans-serif';
        ctx.fillStyle = 'rgba(232, 218, 200, 0.8)';
        wrapText(safetyProfile.photosensitivityText, 130, 790, width - 260, 22);

        ctx.font = 'bold 15px serif';
        ctx.fillStyle = '#E8DAC8';
        ctx.fillText(`• 天然过敏源披露： ${safetyProfile.allergens.join('、')}`, 110, 850);

        ctx.font = 'bold 15px serif';
        ctx.fillStyle = '#E8DAC8';
        ctx.fillText(`• 面部安全浓度上限： ${safetyProfile.maxFacialConc} (大面积使用前需作24h皮试)`, 110, 885);
      }

      // Personal Commemoration & Custom Note Box
      ctx.fillStyle = 'rgba(28, 46, 32, 0.9)';
      ctx.fillRect(80, 1010, width - 160, 80);
      ctx.strokeStyle = 'rgba(197, 180, 154, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(80, 1010, width - 160, 80);

      ctx.textAlign = 'left';
      ctx.font = 'bold 14px serif';
      ctx.fillStyle = '#C5B49A';
      ctx.fillText('【调配人专属纪念印记 & 寄语】', 105, 1035);

      ctx.font = '13px sans-serif';
      ctx.fillStyle = '#E8DAC8';
      const noteDisplay = customCardNote.trim() || 'UNIO 东方植萃特调 · 芳香典藏验印';
      const dateDisplay = customCardDate.trim() || new Date().toLocaleDateString('zh-CN');
      ctx.fillText(`寄语/备注： ${noteDisplay}`, 105, 1065);

      ctx.textAlign = 'right';
      ctx.font = 'bold 13px monospace';
      ctx.fillStyle = '#C5B49A';
      ctx.fillText(`调配日期： ${dateDisplay}`, width - 105, 1065);

      // Watermark Stamp Emblem
      const stampX = width - 180;
      const stampY = 1170;
      ctx.save();
      ctx.translate(stampX, stampY);
      ctx.rotate(-0.15);
      ctx.beginPath();
      ctx.arc(0, 0, 55, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(197, 180, 154, 0.75)';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 47, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(197, 180, 154, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = 'bold 11px serif';
      ctx.fillStyle = '#C5B49A';
      ctx.textAlign = 'center';
      ctx.fillText('UNIO LAB', 0, -12);
      ctx.font = 'bold 15px serif';
      ctx.fillText('验印存真', 0, 8);
      ctx.font = '9px monospace';
      ctx.fillText('FORMULA VERIFIED', 0, 26);
      ctx.restore();

      // Footer Info
      ctx.textAlign = 'left';
      ctx.font = 'bold 14px serif';
      ctx.fillStyle = '#C5B49A';
      ctx.fillText('UNIO 东方植萃实验室 · 芳疗研发中心', 110, 1130);

      ctx.font = '12px monospace';
      ctx.fillStyle = 'rgba(232, 218, 200, 0.6)';
      const formulaCode = `UNIO-${product.code}-${calcCarrierMl}ML-${calcDilutionPercent}%-${Date.now().toString().slice(-6)}`;
      ctx.fillText(`配方编号: ${formulaCode}`, 110, 1158);

      ctx.fillText(`出案日期: ${dateDisplay} · 版权所有 © UNIO BOTANICALS`, 110, 1182);

      // ── 三码 + 域名 Footer（客服/公众号/小程序 + unioaroma.com）──
      ctx.fillStyle = 'rgba(197, 180, 154, 0.35)';
      ctx.fillRect(110, 1200, width - 220, 1);
      const qrMeta = [
        { src: '/wechat-qr.png', label: '客服微信' },
        { src: '/wechat-pub.webp', label: '公众号' },
        { src: '/wechat-miniapp.jpg', label: '小程序' },
      ];
      const qrSize = 58;
      const qrGap = 14;
      const qrStartY = 1218;
      const totalW = qrMeta.length * qrSize + (qrMeta.length - 1) * qrGap;
      let qx = (width - totalW) / 2;
      // 先画标签（同步），二维码图片加载完成后异步绘制
      qrMeta.forEach((q) => {
        ctx.fillStyle = 'rgba(232, 218, 200, 0.75)';
        ctx.font = '11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(q.label, qx + qrSize / 2, qrStartY + qrSize + 16);
        qx += qrSize + qrGap;
      });
      ctx.textAlign = 'left';
      ctx.font = 'bold 15px serif';
      ctx.fillStyle = '#C5B49A';
      ctx.fillText('UNIO AROMA · 元合生香', (width - 240) / 2, 1335);
      ctx.font = '12px monospace';
      ctx.fillStyle = 'rgba(232, 218, 200, 0.6)';
      ctx.fillText('unioaroma.com', (width - 150) / 2, 1360);

      // 加载三码图片（Promise 等待全部完成后再导出）
      const loadImages = qrMeta.map((q, i) => new Promise<void>((resolve) => {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          try {
            const startX = (width - totalW) / 2 + i * (qrSize + qrGap);
            ctx.drawImage(img, startX, qrStartY, qrSize, qrSize);
          } catch (e) { /* ignore */ }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = q.src;
      }));

      // Download PNG trigger（等三码绘制完成）
      Promise.all(loadImages).then(() => {
        const link = document.createElement('a');
        link.download = `UNIO_调配配方卡_${product.cn}_${calcCarrierMl}ml.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        setExportCardSuccessToast(`已成功导出【${product.cn}】专属调配配方卡片 (PNG)`);
        setTimeout(() => setExportCardSuccessToast(null), 4000);
      });
    } catch (e) {
      console.error('Export card failed:', e);
    } finally {
      setIsExportingCard(false);
    }
  };


  if (!product) return null;

  const handleSwitchToProduct = (targetProduct: ProductItem) => {
    if (product) {
      setProductHistory((prev) => [...prev, product]);
    }
    setActiveProduct(targetProduct);
    setActiveTab('overview');
    if (onSelectProduct) {
      onSelectProduct(targetProduct);
    }
  };

  const handleGoBackProduct = () => {
    if (productHistory.length === 0) return;
    const prev = productHistory[productHistory.length - 1];
    setProductHistory((prevList) => prevList.slice(0, prevList.length - 1));
    setActiveProduct(prev);
    setActiveTab('overview');
  };

  const handleToggleLike = (reviewId: string) => {
    setLikedMap(prev => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newRev = {
      id: `custom-rev-${Date.now()}`,
      userName: newUserName.trim() || '匿名的香芬师',
      userTag: newUserTag || 'UNIO 真实试用者',
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      usageScenario: newScenario.trim() || '日常睡眠与空间香薰',
      comment: newComment.trim(),
      likesCount: 1
    };

    setReviewsList(prev => [newRev, ...prev]);
    setNewComment('');
    setNewScenario('');
    setReviewSubmitted(true);
    setShowForm(false);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const handleCopyDossier = () => {
    const text = `UNIO 元香 植萃芳疗档案 Botanical Dossier
==========================================
【作品名称】${product.cn} (${product.en})
【档案编号】${product.code} (No.${product.no})
【植物科属】${product.botanicalFamily || 'N/A'}
【拉丁学名】${product.latinName || 'N/A'}
【产地来源】${product.origin}
【利用部位】${product.plantPart || '全株萃取'}
【萃取方式】${product.extractionMethod || '水蒸气蒸馏法'}
【储存方式】${product.storageInfo || '避光冷暗处密封保存'}
【价格规格】${product.prices.join(' / ')}

【常见功效】
${product.benefits?.map(b => `• ${b}`).join('\n') || '• 舒缓身心，净化空间'}

【运用场景与建议】
${product.applicationScenarios?.map(s => `• ${s.title}: ${s.desc} [建议: ${s.method || '扩香/推拿'}]`).join('\n\n') || ''}

【Alice 芳疗师手记】
${product.aromatherapistNotes || product.description}

【Alice 临床观察日记】
${product.aliceDiary ? `${product.aliceDiary.title} (${product.aliceDiary.date})\n${product.aliceDiary.content}\n[心得]: ${product.aliceDiary.keyObservation}\n[配方]: ${product.aliceDiary.blendSuggestion}` : ''}

【品质溯源】
COA 报告: ${product.coaNumber}
批次号: ${product.batchTrace}
==========================================
UNIO Aroma · 100% 天然无添加植萃纯品`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1A241E]/70 backdrop-blur-md animate-fade-in font-sans"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#8C7E6A]/30 rounded-3xl overflow-hidden shadow-2xl text-[#2D2D2A] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        {productHistory.length > 0 && (
          <div className="px-4 py-2 bg-[#1C2E20] text-[#E8DAC8] text-xs flex items-center justify-between border-b border-[#8C7E6A]/30 font-mono">
            <span>正在浏览协同推荐作品: <strong>{product.cn}</strong></span>
            <button
              onClick={handleGoBackProduct}
              className="flex items-center gap-1 text-[#C5B49A] hover:text-[#E8DAC8] underline transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>返回上一作品【{productHistory[productHistory.length - 1].cn}】</span>
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-6 sm:py-4 border-b border-[#8C7E6A]/20 bg-[#EFEDE7]/90 gap-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#1C2E20] text-[#E8DAC8] text-xs font-mono font-bold tracking-wider shadow-sm">
              {product.code}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#8C7E6A]">No.{product.no} · UNIO Botanical Dossier</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8C7E6A]/15 text-[#1C2E20] font-sans font-medium">
                  {product.series.toUpperCase()} · {product.subgroup}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            {/* Wishlist Header Toggle Button */}
            <button
              onClick={() => toggleWishlist(product.code)}
              className={`px-3 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-1.5 text-xs font-semibold ${
                isWishlisted(product.code)
                  ? 'bg-[#A85852] border-[#A85852] text-white shadow-sm'
                  : 'bg-[#DED9D2] hover:bg-[#1C2E20] border-[#8C7E6A]/30 text-[#2D2D2A] hover:text-[#E8DAC8]'
              }`}
              title={isWishlisted(product.code) ? "从心愿单移出" : "加入我的心愿单"}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted(product.code) ? 'fill-current text-white' : 'text-[#A85852]'}`} />
              <span>{isWishlisted(product.code) ? '已加入心愿单' : '加入心愿单'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#DED9D2] hover:bg-[#1C2E20] text-[#2D2D2A] hover:text-[#E8DAC8] transition-all duration-200"
              title="关闭弹窗"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 pt-3 pb-2 border-b border-[#8C7E6A]/15 bg-[#F4F1EA] overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#1C2E20] text-[#E8DAC8] shadow-md'
                : 'text-[#8C7E6A] hover:text-[#1C2E20] hover:bg-[#E8DAC8]/40'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>基本档案与规格</span>
          </button>

          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'scenarios'
                ? 'bg-[#1C2E20] text-[#E8DAC8] shadow-md'
                : 'text-[#8C7E6A] hover:text-[#1C2E20] hover:bg-[#E8DAC8]/40'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>常见功效与场景</span>
          </button>

          <button
            onClick={() => setActiveTab('chemistry')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'chemistry'
                ? 'bg-[#1C2E20] text-[#E8DAC8] shadow-md'
                : 'text-[#8C7E6A] hover:text-[#1C2E20] hover:bg-[#E8DAC8]/40'
            }`}
          >
            <TestTube className="w-3.5 h-3.5" />
            <span>成分与理化结构</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap relative ${
              activeTab === 'reviews'
                ? 'bg-[#1C2E20] text-[#E8DAC8] shadow-md'
                : 'text-[#8C7E6A] hover:text-[#1C2E20] hover:bg-[#E8DAC8]/40'
            }`}
          >
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#C5B49A]" />
            <span>真实体验与点评</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#C5B49A] text-[#1C2E20] text-[10px] font-mono font-bold">
              {reviewsList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('traceability')}
            className={`px-3.5 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'traceability'
                ? 'bg-[#1C2E20] text-[#E8DAC8] shadow-md'
                : 'text-[#8C7E6A] hover:text-[#1C2E20] hover:bg-[#E8DAC8]/40'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>溯源与 COA 质检</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Series/Type-Specific Dynamic Safety Notice Banner */}
          {typeNotice && (
            <div className={`p-4 rounded-2xl text-xs space-y-2.5 border shadow-sm transition-all ${typeNotice.themeColorClass.bg} ${typeNotice.themeColorClass.text} ${typeNotice.themeColorClass.border}`}>
              <div className="flex items-center justify-between border-b border-white/15 pb-2 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className={`w-4 h-4 ${typeNotice.themeColorClass.accent} shrink-0`} />
                  <span className="font-serif font-bold text-xs sm:text-sm tracking-wide">
                    {typeNotice.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${typeNotice.themeColorClass.badgeBg} ${typeNotice.themeColorClass.badgeText} border border-white/10 font-bold`}>
                    {typeNotice.badgeText}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-white/80 border border-white/10 hidden sm:inline-block">
                    SAFETY ADVISORY
                  </span>
                </div>
              </div>

              <p className="text-[11px] sm:text-xs leading-relaxed font-sans opacity-95">
                {typeNotice.statement}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/10">
                {typeNotice.highlights.map((item, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-black/30 text-[10px] font-mono opacity-90 border border-white/10 flex items-center gap-1">
                    <span className={typeNotice.themeColorClass.accent}>✓</span>
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* TAB 1: OVERVIEW (基本档案与规格) */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Main Visual & Info Grid */}
              <div className="grid md:grid-cols-12 gap-6 items-start">
                
                {/* Left: Product Image & Badge */}
                <div className="md:col-span-5 relative group">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#EFEDE7] border border-[#8C7E6A]/20 shadow-md">
                    <img
                      src={product.image}
                      alt={product.cn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-md border border-[#8C7E6A]/30 text-[#1C2E20] text-[10px] px-3 py-1 rounded-full flex items-center gap-1.5 font-mono shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8C7E6A]" />
                      <span>COA/MSDS 质检已认证</span>
                    </div>
                  </div>

                  {/* Scent Pyramid preview */}
                  {product.scentPyramid && (
                    <div className="mt-3 p-3 rounded-xl bg-[#EFEDE7] border border-[#8C7E6A]/15 grid grid-cols-3 gap-1.5 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-[#8C7E6A] block font-mono">前调 Top</span>
                        <span className="font-medium text-[#1C2E20] text-[11px] truncate block">{product.scentPyramid.top || '清爽草本'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#8C7E6A] block font-mono">中调 Middle</span>
                        <span className="font-medium text-[#1C2E20] text-[11px] truncate block">{product.scentPyramid.middle || '圆润纯花'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#8C7E6A] block font-mono">尾调 Base</span>
                        <span className="font-medium text-[#1C2E20] text-[11px] truncate block">{product.scentPyramid.base || '沉稳木质'}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Key Specs Grid */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#1C2E20] font-bold tracking-tight">
                      {product.cn}
                    </h2>

                    <p className="text-xs text-[#8C7E6A] font-sans italic mt-1 font-medium">
                      {product.en} {product.latinName && `· [ ${product.latinName} ]`}
                    </p>
                  </div>

                  {/* Dynamic Essential Specs & Formulation / Origin Layout (Based on isCompound or Series) */}
                  {product.isCompound || product.series === 'he' || product.blendFormula ? (
                    <div className="space-y-3">
                      {/* 复方成分表 (Ingredients Table & Component Overview) */}
                      <div className="p-3.5 rounded-2xl bg-[#F5EFEA] border border-[#B08968]/25 text-xs space-y-2">
                        <div className="flex items-center justify-between border-b border-[#B08968]/20 pb-1.5">
                          <span className="font-serif font-bold text-[#3A2B1D] flex items-center gap-1.5">
                            <FlaskConical className="w-4 h-4 text-[#B08968]" />
                            复方精油成分构成表 (Ingredients List)
                          </span>
                          <span className="text-[10px] font-mono text-[#B08968] bg-[#E8DAC8]/60 px-2 py-0.5 rounded-full font-bold">
                            100% 纯天然复方
                          </span>
                        </div>

                        {/* Ingredients List / Table */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-0.5">
                          {(product.ingredients && product.ingredients.length > 0 
                            ? product.ingredients 
                            : (product.blendFormula ? product.blendFormula.map(b => b.ingredient) : ['地标原萃精油'])
                          ).map((ing, idx) => (
                            <div key={idx} className="p-2 rounded-xl bg-white/80 border border-[#B08968]/20 flex items-center gap-1.5 shadow-2xs">
                              <span className="w-4 h-4 rounded-full bg-[#E8DAC8] text-[#3A2B1D] text-[9px] font-mono flex items-center justify-center font-bold shrink-0">
                                {idx + 1}
                              </span>
                              <span className="font-semibold text-[#1C2E20] truncate text-[11px]">{ing}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 复方配方思路与调配详情 (Formulation Description Section) */}
                      <div className="p-3.5 rounded-2xl bg-[#2A241E] text-[#E8DAC8] border border-[#B08968]/30 text-xs space-y-2 shadow-xs">
                        <div className="flex items-center justify-between border-b border-[#B08968]/25 pb-1.5">
                          <span className="font-serif font-bold text-[#E8DAC8] flex items-center gap-1.5 text-xs">
                            <Sparkles className="w-4 h-4 text-[#B08968]" />
                            配方调配思路与分子协同 (Formulation Concept)
                          </span>
                          <span className="text-[9px] font-mono text-[#B08968] bg-black/40 px-2 py-0.5 rounded">
                            微滴冷熟化
                          </span>
                        </div>
                        <p className="text-[11px] leading-relaxed font-sans text-[#E8DAC8]/90 text-justify">
                          {product.formulation || (product.blendFormula 
                            ? `本复方精油由 ${product.blendFormula.map(b => b.ingredient).join('、')} 按科学挥发阶梯与分子协同金字塔黄金比例调配，发挥全维协同疗愈功效。` 
                            : '严选地标原产地精油按科学挥发阶梯协同调配，发挥全维协同功效。'
                          )}
                        </p>
                      </div>
                    </div>
                  ) : product.series === 'jing' || product.artifactSpecs ? (
                    <div className="grid grid-cols-2 gap-2.5 bg-[#F6F2F8] p-3.5 rounded-2xl border border-[#7B5294]/25 text-xs">
                      <div className="flex items-start gap-2 p-2 rounded-xl bg-white/80 shadow-2xs">
                        <Package className="w-4 h-4 text-[#7B5294] mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] text-[#7B5294] block font-medium">器物材质</span>
                          <span className="font-semibold text-[#1C2E20]">{product.artifactSpecs?.material || '天然陶石原木'}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 p-2 rounded-xl bg-white/80 shadow-2xs">
                        <Sparkles className="w-4 h-4 text-[#7B5294] mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] text-[#7B5294] block font-medium">手作工艺</span>
                          <span className="font-semibold text-[#1C2E20]">{product.artifactSpecs?.craft || '匠人手工精雕研磨'}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 p-2 rounded-xl bg-white/80 shadow-2xs">
                        <Compass className="w-4 h-4 text-[#7B5294] mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] text-[#7B5294] block font-medium">推荐使用场景</span>
                          <span className="font-semibold text-[#1C2E20]">{product.artifactSpecs?.scene || '书房案头 / 茶室静修'}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 p-2 rounded-xl bg-white/80 shadow-2xs">
                        <ShieldCheck className="w-4 h-4 text-[#7B5294] mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] text-[#7B5294] block font-medium">美学规格尺寸</span>
                          <span className="font-semibold text-[#1C2E20]">{product.artifactSpecs?.dimension || '标准美学配件'}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* 单方产品 (Standard / Single-Note Essential Oils & Hydrosols): Retain detailed origin, plant part, extraction & botanical family */
                    <div className="grid grid-cols-2 gap-2.5 bg-[#EFEDE7] p-3.5 rounded-2xl border border-[#8C7E6A]/20 text-xs">
                      <div className="flex items-start gap-2 p-2 rounded-xl bg-[#FAF8F5]/80">
                        <MapPin className="w-4 h-4 text-[#8C7E6A] mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] text-[#8C7E6A] block">植物产地 (Origin)</span>
                          <span className="font-semibold text-[#1C2E20]">{product.origin}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 p-2 rounded-xl bg-[#FAF8F5]/80">
                        <Feather className="w-4 h-4 text-[#8C7E6A] mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] text-[#8C7E6A] block">利用部位 (Plant Part)</span>
                          <span className="font-semibold text-[#1C2E20]">{product.plantPart || '全株芳香部位'}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 p-2 rounded-xl bg-[#FAF8F5]/80">
                        <Droplet className="w-4 h-4 text-[#8C7E6A] mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] text-[#8C7E6A] block">萃取/提取方式</span>
                          <span className="font-semibold text-[#1C2E20]">{product.extractionMethod || '水蒸气蒸馏法'}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 p-2 rounded-xl bg-[#FAF8F5]/80">
                        <TestTube className="w-4 h-4 text-[#8C7E6A] mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] text-[#8C7E6A] block">植物科属</span>
                          <span className="font-semibold text-[#1C2E20] truncate block">{product.botanicalFamily || '原生植物体系'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Storage info box */}
                  <div className="p-3 rounded-xl bg-[#E8DAC8]/30 border border-[#8C7E6A]/25 text-xs flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#8C7E6A] shrink-0" />
                    <div>
                      <span className="text-[10px] text-[#8C7E6A] font-bold block">保存与质保规范 Storage & Shelf Life</span>
                      <span className="text-[#2D2D2A] text-[11px] leading-snug block">{product.storageInfo}</span>
                    </div>
                  </div>

                  {/* Price & Specs Tags */}
                  <div className="p-3.5 rounded-2xl bg-[#EFEDE7] border border-[#8C7E6A]/20 flex items-center justify-between gap-2">
                    <span className="text-xs text-[#8C7E6A] font-medium">规格与价格 Specification</span>
                    <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-[#1C2E20]">
                      {product.prices.map((price, i) => (
                        <span key={i} className="bg-[#FAF8F5] px-3 py-1 rounded-lg border border-[#8C7E6A]/20 shadow-xs">
                          {price}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ERIC 寻香人 · 产地风土与极境考察笔记 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#2A241E] text-[#E8DAC8] border border-[#B08968]/35 space-y-3 relative overflow-hidden shadow-sm">
                    <div className="absolute top-2 right-3 text-7xl font-serif text-[#B08968]/10 select-none pointer-events-none font-bold">
                      ERIC
                    </div>
                    <div className="flex items-center justify-between border-b border-[#B08968]/25 pb-2">
                      <div className="flex items-center gap-2">
                        <Compass className="w-4.5 h-4.5 text-[#B08968]" />
                        <span className="text-xs sm:text-sm font-serif font-bold tracking-wide text-white">
                          ERIC 寻香人 · 产地风土与极境考察笔记
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#B08968] bg-black/40 px-2.5 py-0.5 rounded-full border border-[#B08968]/20">
                        {product.origin} 极境考察
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed font-serif italic text-[#E8DAC8]/95 text-justify whitespace-pre-line">
                      {product.ericNotes || `【ERIC 寻香旅记】在 ${product.origin} 原生产地，深入无人干扰的极境高山与原始森林。这里的原生土壤与气候条件，让 ${product.cn}（${product.latinName || 'Botanic'}）展现出极为纯粹的植物本源气场与分子活性。`}
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-[#B08968]/15 text-[10px] font-mono text-[#B08968]">
                      <span>风土基因 / 海拔土壤 / 野性原萃</span>
                      <span className="font-serif italic text-white/80">—— ERIC 寻香人 Field Notes</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* SCIENTIFIC BLEND FORMULA & SYNERGY BREAKDOWN SECTION (For He Series / Blends) */}
              {(product.isCompound || product.series === 'he' || (product.blendFormula && product.blendFormula.length > 0)) && (
                <CompoundIngredientsSynergy product={product} />
              )}

              {/* ARTIFACT CRAFT & SPECIFICATIONS SECTION (For Jing Series / Scent Objects) */}
              {product.series === 'jing' && product.artifactSpecs && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F4FA] border border-[#7B5294]/30 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#7B5294]/20 pb-2">
                    <div className="flex items-center gap-2">
                      <Package className="w-4.5 h-4.5 text-[#7B5294]" />
                      <h3 className="text-sm sm:text-base font-serif font-bold text-[#2F1D3A]">
                        【器物美学工艺与香道规格 Specification】
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-[#7B5294] bg-[#EAE2EF] px-2.5 py-0.5 rounded-full font-bold">
                      自然物语 · 香道工艺
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-[#7B5294]/20 space-y-1">
                      <span className="text-[10px] text-[#7B5294] font-bold block font-mono">材质 Material</span>
                      <p className="font-semibold text-[#1C2E20]">{product.artifactSpecs.material}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#7B5294]/20 space-y-1">
                      <span className="text-[10px] text-[#7B5294] font-bold block font-mono">制作工艺 Handcraft</span>
                      <p className="font-semibold text-[#1C2E20]">{product.artifactSpecs.craft}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#7B5294]/20 space-y-1">
                      <span className="text-[10px] text-[#7B5294] font-bold block font-mono">推荐使用场景 Usage Scene</span>
                      <p className="font-semibold text-[#1C2E20]">{product.artifactSpecs.scene}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#7B5294]/20 space-y-1">
                      <span className="text-[10px] text-[#7B5294] font-bold block font-mono">产品规格尺寸 Dimensions</span>
                      <p className="font-semibold text-[#1C2E20]">{product.artifactSpecs.dimension || '标准规格'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits Highlight Tags */}
              {product.benefits && product.benefits.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#EFEDE7] border border-[#8C7E6A]/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8C7E6A]" />
                    <span className="text-xs text-[#1C2E20] font-serif font-bold">核心常见功效 Highlight Benefits</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {product.benefits.map((benefit, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#8C7E6A]/25 text-xs text-[#1C2E20] font-medium shadow-2xs hover:border-[#8C7E6A] transition-colors"
                      >
                        ✓ {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured User Review Teaser Card */}
              {reviewsList.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#F4EFEE] border border-[#8C7E6A]/25 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquareQuote className="w-4 h-4 text-[#8C7E6A]" />
                      <span className="text-xs font-serif font-bold text-[#1C2E20]">爱用者真实体感口碑 Community Impression</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="text-[11px] font-mono text-[#8C7E6A] hover:text-[#1C2E20] underline transition-colors"
                    >
                      查看全部 {reviewsList.length} 条评价 →
                    </button>
                  </div>

                  {/* Teaser first review */}
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#8C7E6A]/15 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#1C2E20] text-[#E8DAC8] text-[10px] font-bold flex items-center justify-center">
                          {reviewsList[0].userName[0]}
                        </span>
                        <div>
                          <span className="font-bold text-[#1C2E20]">{reviewsList[0].userName}</span>
                          {reviewsList[0].userTag && (
                            <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-[#8C7E6A]/15 text-[#1C2E20]">
                              {reviewsList[0].userTag}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-[#C5B49A]">
                        {[...Array(reviewsList[0].rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#2D2D2A]/90 italic font-serif leading-relaxed text-[11px]">
                      “{reviewsList[0].comment}”
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SCENARIOS (常见功效与运用场景) */}
          {activeTab === 'scenarios' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-2xl bg-[#1C2E20] text-[#E8DAC8] space-y-1">
                <h3 className="font-serif text-lg font-bold flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-[#C5B49A]" />
                  <span>多维运用场景与芳疗理疗建议</span>
                </h3>
                <p className="text-xs text-[#E8DAC8]/80">
                  结合现代科研文献与经典芳疗经验，将 {product.cn} 的植萃活性融入日常生活场景。
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="p-4 rounded-2xl bg-[#EFEDE7] border border-[#8C7E6A]/20 space-y-2">
                <span className="text-xs font-serif font-bold text-[#1C2E20] block">主要适用调理领域 Core Application Areas</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.benefits?.map((b, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#8C7E6A]/20 text-xs font-medium text-[#1C2E20] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#8C7E6A]"></span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Scenarios Cards */}
              <div className="space-y-3">
                {product.applicationScenarios?.map((scenario, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-[#EFEDE7] border border-[#8C7E6A]/20 space-y-2 hover:border-[#8C7E6A]/50 transition-all shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#1C2E20] text-[#E8DAC8] text-[10px] font-mono font-bold flex items-center justify-center">
                          0{idx + 1}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-[#1C2E20]">{scenario.title}</h4>
                      </div>
                      {scenario.method && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#8C7E6A]/20 text-[#1C2E20] text-[10px] font-mono font-medium">
                          {scenario.method}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#2D2D2A]/85 leading-relaxed pl-7">
                      {scenario.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CHEMISTRY (化学成分与理化结构) */}
          {activeTab === 'chemistry' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-2xl bg-[#EFEDE7] border border-[#8C7E6A]/20 space-y-1">
                <h3 className="font-serif text-base font-bold text-[#1C2E20] flex items-center gap-2">
                  <TestTube className="w-5 h-5 text-[#8C7E6A]" />
                  <span>气相色谱 (GC-MS) 核心活性成分解析</span>
                </h3>
                <p className="text-xs text-[#8C7E6A]">
                  UNIO Aroma 每批次精油均经过独立实验室气相色谱与质谱联用分析，确立天然纯正化学分型。
                </p>
              </div>

              {/* Chemical Compounds List */}
              <div className="grid gap-3">
                {product.chemicalProfile?.map((compound, i) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#8C7E6A]/25 space-y-2 shadow-2xs hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between border-b border-[#8C7E6A]/15 pb-2">
                      <span className="font-serif font-bold text-xs text-[#1C2E20] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#1C2E20]"></span>
                        {compound.name}
                      </span>
                      {compound.percentage && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1C2E20] text-[#E8DAC8] font-mono text-xs font-bold">
                          {compound.percentage}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#2D2D2A]/80 leading-relaxed pt-1">
                      {compound.effect}
                    </p>

                    {/* Simple Bar Visualizer if percentage exists */}
                    {compound.percentage && (
                      <div className="w-full bg-[#EFEDE7] h-1.5 rounded-full overflow-hidden mt-2">
                        <div 
                          className="bg-[#1C2E20] h-full rounded-full" 
                          style={{ width: `${Math.min(parseInt(compound.percentage) || 30, 100)}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ALICE 创始人 · 芳疗临床日记与理化实证 */}
              {product.aliceDiary ? (
                <div className="p-5 rounded-3xl bg-[#F4EFEE] border border-[#8C7E6A]/30 space-y-4 shadow-md relative overflow-hidden">
                  <div className="absolute top-3 right-4 text-8xl font-serif text-[#8C7E6A]/10 select-none pointer-events-none font-bold">
                    Alice
                  </div>

                  <div className="flex items-center justify-between border-b border-[#8C7E6A]/20 pb-3">
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-5 h-5 text-[#8C7E6A]" />
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C2E20]">
                          {product.aliceDiary.title}
                        </h3>
                        <p className="text-[11px] text-[#8C7E6A] font-sans">
                          ALICE 创始人 · 芳疗临床日记与理化结构实证
                        </p>
                      </div>
                    </div>
                    {product.aliceDiary.date && (
                      <span className="font-mono text-xs text-[#8C7E6A] px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#8C7E6A]/20">
                        {product.aliceDiary.date}
                      </span>
                    )}
                  </div>

                  <div className="text-xs sm:text-sm text-[#2D2D2A] leading-relaxed font-serif italic space-y-2 bg-[#FAF8F5]/90 p-4 rounded-2xl border border-[#8C7E6A]/15">
                    <p className="whitespace-pre-line">{product.aliceDiary.content}</p>
                  </div>

                  {/* Key Observation */}
                  {product.aliceDiary.keyObservation && (
                    <div className="p-3.5 rounded-2xl bg-[#E8DAC8]/40 border border-[#8C7E6A]/25 text-xs space-y-1">
                      <span className="font-bold text-[#1C2E20] font-sans flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#8C7E6A]" />
                        <span>Alice 临床理化核心观察 Observation</span>
                      </span>
                      <p className="text-[#2D2D2A] leading-relaxed">{product.aliceDiary.keyObservation}</p>
                    </div>
                  )}

                  {/* Blend Suggestion */}
                  {product.aliceDiary.blendSuggestion && (
                    <div className="p-3.5 rounded-2xl bg-[#1C2E20] text-[#E8DAC8] text-xs space-y-1">
                      <span className="font-bold font-sans text-[#C5B49A] flex items-center gap-1.5">
                        <Droplet className="w-3.5 h-3.5 text-[#C5B49A]" />
                        <span>Alice 推荐理化成分复配指南 Blend Synergy</span>
                      </span>
                      <p className="text-[#E8DAC8]/90 font-mono text-[11px] leading-relaxed">{product.aliceDiary.blendSuggestion}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-5 rounded-3xl bg-[#1C2E20] text-[#E8DAC8] border border-[#8C7E6A]/35 space-y-3 shadow-md">
                  <div className="flex items-center gap-2 border-b border-[#8C7E6A]/30 pb-2">
                    <BookOpen className="w-5 h-5 text-[#C5B49A]" />
                    <h3 className="font-serif text-base font-bold text-white">ALICE 创始人 · 芳疗手记与理化实证</h3>
                  </div>
                  <p className="text-xs leading-relaxed font-serif italic">
                    “{product.aromatherapistNotes || product.description}”
                  </p>
                </div>
              )}

              {/* Aromatherapy Safety Advisory Alert (芳疗安全与成分禁忌提示) */}
              <div className="mt-6">
                <AromatherapySafetyAlert
                  product={product}
                  safetyProfile={safetyProfile}
                />
              </div>

              {/* Ingredient Synergy Analysis & Brand Pairing Block */}
              <div className="mt-6 p-5 rounded-3xl bg-[#1C2E20] text-[#E8DAC8] space-y-4 shadow-xl border border-[#8C7E6A]/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#8C7E6A]/30 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-[#C5B49A]/20 text-[#C5B49A]">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#E8DAC8] flex items-center gap-2">
                        <span>成分协同分析与品牌体系搭配推荐</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#C5B49A] text-[#1C2E20] text-[10px] font-mono font-bold">
                          SYNERGY LAB
                        </span>
                      </h4>
                      <p className="text-xs text-[#E8DAC8]/70 font-sans mt-0.5">
                        依据 GC-MS 分子结构与 UNIO 品牌产品体系相性算法，自动匹配最佳辅助精油
                      </p>
                    </div>
                  </div>
                </div>

                {/* Toast Notification when added to blend */}
                {blendAddedToast && (
                  <div className="p-3 rounded-xl bg-[#C5B49A] text-[#1C2E20] text-xs font-bold flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{blendAddedToast}</span>
                  </div>
                )}

                {/* Synergy Recommendations Cards */}
                <div className="space-y-3 pt-1">
                  {synergyRecommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#2A3F30] border border-[#8C7E6A]/30 space-y-3 hover:border-[#C5B49A]/60 transition-all shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={rec.product.image}
                            alt={rec.product.cn}
                            className="w-12 h-12 rounded-xl object-cover border border-[#8C7E6A]/30 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-sm text-[#E8DAC8]">
                                {rec.product.cn}
                              </span>
                              <span className="text-xs text-[#C5B49A] font-mono">
                                ({rec.product.code})
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-[#C5B49A]/20 text-[#C5B49A] text-[10px] font-mono font-bold">
                                {rec.matchScore}% 协同契合
                              </span>
                            </div>
                            <p className="text-[11px] text-[#E8DAC8]/70 font-mono mt-0.5">
                              {rec.product.en} · {rec.product.subgroup}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {onAddToCustomBlend && (
                            <button
                              onClick={() => {
                                onAddToCustomBlend(rec.product);
                                setBlendAddedToast(`已将【${rec.product.cn}】与【${product.cn}】加入调香配方案`);
                                setTimeout(() => setBlendAddedToast(null), 3000);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-[#C5B49A] hover:bg-[#E8DAC8] text-[#1C2E20] text-xs font-bold transition-all flex items-center gap-1 shadow-xs active:scale-95"
                              title="加入我的定制调香案"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>加入调香案</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleSwitchToProduct(rec.product)}
                            className="px-3 py-1.5 rounded-xl bg-[#1C2E20] hover:bg-[#2A3F30] border border-[#8C7E6A]/40 text-[#E8DAC8] text-xs font-medium transition-all flex items-center gap-1 active:scale-95"
                            title="查看此产品完整档案"
                          >
                            <span>查看档案</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Synergy Rationale */}
                      <div className="p-3 rounded-xl bg-[#1C2E20]/70 border border-[#8C7E6A]/20 text-xs space-y-1.5">
                        <div className="flex items-center justify-between text-[#C5B49A] text-[11px] font-mono font-bold">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#C5B49A]" />
                            {rec.synergyType}
                          </span>
                          <span className="text-[#E8DAC8]/80 font-normal">{rec.ratio}</span>
                        </div>
                        <p className="text-[#E8DAC8]/90 text-[11px] leading-relaxed">
                          {rec.principle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Radar Visual Comparison Component (挥发度、香调属性与芳疗功效雷达对比) */}
                {synergyRecommendations.length > 0 && (
                  <div className="pt-3 border-t border-[#8C7E6A]/30">
                    <SynergyRadarComparison
                      primaryProduct={product}
                      secondaryProduct={radarSecondaryProduct || synergyRecommendations[0].product}
                      availableSecondaryProducts={synergyRecommendations.map((r) => r.product)}
                      onSelectSecondaryProduct={(sec) => setRadarSecondaryProduct(sec)}
                    />
                  </div>
                )}
              </div>

              {/* AI Synergistic Similar Formula Prediction (AI 相似配方预测与协同进阶搭配) */}
              <div className="mt-6">
                <FormulaSynergyPredictor
                  baseProduct={product}
                  onSelectProduct={handleSwitchToProduct}
                />
              </div>

              {/* Space Diffusion Solution & Drop Calculator (空间扩香方案与滴数时长计算) */}
              <div className="mt-6">
                <SpaceDiffusionCalculator product={product} />
              </div>

              {/* Essential Oil Dilution & Safety Calculator (精油安全稀释与配比滴数计算器) */}
              <div className="mt-6 p-5 rounded-3xl bg-[#0F1712] text-[#E8DAC8] space-y-4 shadow-2xl border border-[#C5B49A]/40 relative overflow-hidden">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-[#C5B49A]/20 text-[#C5B49A]">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#E8DAC8] flex items-center gap-2">
                        <span>精油安全稀释与配比滴数计算器</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#C5B49A]/20 text-[#C5B49A] text-[10px] font-mono font-bold border border-[#C5B49A]/30">
                          1ml ≈ 20滴
                        </span>
                      </h4>
                      <p className="text-xs text-[#E8DAC8]/70 font-sans mt-0.5">
                        精准换算基础油容量与目标浓度滴数，确保高纯度单方精油调配之安全性与功效最大化
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {/* Left Column: Interactive Inputs */}
                  <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                    {/* 1. Carrier Oil Volume */}
                    <div className="space-y-2">
                      <label className="text-xs font-serif font-bold text-[#C5B49A] flex justify-between items-center">
                        <span>1. 基础油/植物油容量 (ml)</span>
                        <span className="text-white font-mono">{calcCarrierMl} ml</span>
                      </label>
                      {/* Preset Buttons */}
                      <div className="grid grid-cols-4 gap-1.5">
                        {[
                          { label: '10ml', value: 10, desc: '眼周/局部' },
                          { label: '30ml', value: 30, desc: '日常面部' },
                          { label: '50ml', value: 50, desc: '身体按摩' },
                          { label: '100ml', value: 100, desc: '居家大瓶' },
                        ].map((preset) => (
                          <button
                            key={preset.value}
                            type="button"
                            onClick={() => setCalcCarrierMl(preset.value)}
                            className={`p-1.5 rounded-xl text-center border text-xs transition-all cursor-pointer ${
                              calcCarrierMl === preset.value
                                ? 'bg-[#C5B49A] text-[#1C2E20] border-[#C5B49A] font-bold shadow-md'
                                : 'bg-white/5 text-[#E8DAC8]/80 border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <div className="font-mono">{preset.label}</div>
                            <div className="text-[9px] opacity-80">{preset.desc}</div>
                          </button>
                        ))}
                      </div>
                      {/* Custom Input */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[11px] text-[#E8DAC8]/70 font-mono">自定义容量:</span>
                        <input
                          type="number"
                          min={1}
                          max={500}
                          value={calcCarrierMl}
                          onChange={(e) => setCalcCarrierMl(Math.max(1, Number(e.target.value) || 1))}
                          className="w-20 px-2.5 py-1 rounded-lg bg-black/40 border border-white/20 text-xs font-mono text-center text-[#E8DAC8] focus:outline-none focus:border-[#C5B49A]"
                        />
                        <span className="text-xs font-mono text-[#E8DAC8]/70">毫升 (ml)</span>
                      </div>
                    </div>

                    {/* 2. Dilution Percentage */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <label className="text-xs font-serif font-bold text-[#C5B49A] flex justify-between items-center">
                        <span>2. 目标稀释浓度 (%)</span>
                        <span className="text-white font-mono">{calcDilutionPercent}%</span>
                      </label>
                      {/* Presets */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                        {[
                          { label: '0.5%', value: 0.5, desc: '敏弱肌/眼周' },
                          { label: '1.0%', value: 1.0, desc: '日常面部' },
                          { label: '2.0%', value: 2.0, desc: '身体舒压' },
                          { label: '3.0%', value: 3.0, desc: '局部强效' },
                        ].map((preset) => (
                          <button
                            key={preset.value}
                            type="button"
                            onClick={() => setCalcDilutionPercent(preset.value)}
                            className={`p-1.5 rounded-xl text-center border text-xs transition-all cursor-pointer ${
                              calcDilutionPercent === preset.value
                                ? 'bg-[#C5B49A] text-[#1C2E20] border-[#C5B49A] font-bold shadow-md'
                                : 'bg-white/5 text-[#E8DAC8]/80 border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <div className="font-mono">{preset.label}</div>
                            <div className="text-[9px] opacity-80">{preset.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3. Partner Selection */}
                    {synergyRecommendations.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-white/10">
                        <label className="text-xs font-serif font-bold text-[#C5B49A]">
                          3. 选择协同复配搭档 (自动分拆滴数)
                        </label>
                        <select
                          value={selectedPartnerIndex}
                          onChange={(e) => setSelectedPartnerIndex(Number(e.target.value))}
                          className="w-full p-2 rounded-xl bg-black/40 border border-white/20 text-xs font-serif text-[#E8DAC8] focus:outline-none focus:border-[#C5B49A]"
                        >
                          {synergyRecommendations.map((rec, idx) => (
                            <option key={idx} value={idx} className="bg-[#1C2E20] text-[#E8DAC8]">
                              与【{rec.product.cn}】协同复配 ({rec.synergyType})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Calculation Result Output */}
                  <div className="bg-[#1C2E20] p-4 rounded-2xl border border-[#C5B49A]/40 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#C5B49A] font-mono border-b border-white/10 pb-2">
                        <span className="flex items-center gap-1 font-bold">
                          <FlaskConical className="w-3.5 h-3.5" />
                          配比换算结果
                        </span>
                        <span>换算基准: 1ml = 20滴</span>
                      </div>

                      {/* Big Drops Display */}
                      <div className="my-3 text-center p-3 rounded-xl bg-black/30 border border-white/5">
                        <div className="text-[10px] text-[#E8DAC8]/70 font-mono">
                          {calcCarrierMl}ml 基础油 + {calcDilutionPercent}% 浓度需要精油总量
                        </div>
                        <div className="text-3xl font-serif font-bold text-[#C5B49A] mt-1 flex items-center justify-center gap-1">
                          <Droplet className="w-7 h-7 text-[#C5B49A] animate-pulse" />
                          <span>{calcTotalDrops} 滴</span>
                        </div>
                      </div>

                      {/* Breakdown by Product */}
                      {partnerProduct && (
                        <div className="space-y-2 text-xs">
                          <div className="text-[11px] font-serif font-bold text-[#C5B49A]">
                            【推荐分拆复配比例】:
                          </div>
                          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                            <div className="flex justify-between items-center">
                              <span className="font-serif text-[#E8DAC8] flex items-center gap-1">
                                <span>主调: 【{product.cn}】</span>
                              </span>
                              <span className="font-mono font-bold text-[#C5B49A]">
                                {dropsProductA} 滴
                              </span>
                            </div>
                            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-[#C5B49A] h-full rounded-full transition-all duration-300"
                                style={{ width: `${(dropsProductA / calcTotalDrops) * 100}%` }}
                              />
                            </div>

                            <div className="flex justify-between items-center pt-1">
                              <span className="font-serif text-[#E8DAC8] flex items-center gap-1">
                                <span>协同: 【{partnerProduct.cn}】</span>
                              </span>
                              <span className="font-mono font-bold text-[#C5B49A]">
                                {dropsProductB} 滴
                              </span>
                            </div>
                            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-[#4E8B5E] h-full rounded-full transition-all duration-300"
                                style={{ width: `${(dropsProductB / calcTotalDrops) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Safety Notice */}
                    <div className="p-2.5 rounded-xl bg-black/40 border border-amber-500/30 text-[10px] text-[#E8DAC8]/80 space-y-1">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>专业芳疗调配安全提示</span>
                      </div>
                      <p className="leading-relaxed">
                        高纯度单方精油切勿未经稀释直接接触黏膜。初次调配建议于手臂内侧进行 24 小时皮试。敏感肌、眼周及婴幼儿调配浓度请保持在 0.5% 以下。
                      </p>
                    </div>
                  </div>
                </div>

                {/* Personal Commemoration Customization Inputs */}
                <div className="p-3.5 rounded-2xl bg-[#0F1712]/80 border border-[#C5B49A]/30 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-serif font-bold text-[#C5B49A]">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#C5B49A]" />
                      <span>配方卡专属典藏印记（自定义寄语与调配纪念日）</span>
                    </span>
                    <span className="text-[10px] text-[#E8DAC8]/60 font-sans font-normal hidden sm:inline">
                      将高清印刻于生成的 PNG 卡片上
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] text-[#E8DAC8]/80 block font-serif">
                        调配人寄语 / 个人备注
                      </label>
                      <input
                        type="text"
                        value={customCardNote}
                        onChange={(e) => setCustomCardNote(e.target.value)}
                        placeholder="例如：赠予挚友Alice·晚安舒压特调"
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-[#E8DAC8] placeholder-[#E8DAC8]/30 focus:outline-none focus:border-[#C5B49A] transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-[#E8DAC8]/80 block font-serif">
                        调配 / 纪念日期
                      </label>
                      <input
                        type="date"
                        value={customCardDate}
                        onChange={(e) => setCustomCardDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-[#E8DAC8] focus:outline-none focus:border-[#C5B49A] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Export Formula Card Action Bar */}
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-[#E8DAC8]/70 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5B49A] shrink-0" />
                    <span>自动将配比滴数、调配建议与安全指南整合为带有品牌水印的高清 PNG 配方卡</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleExportFormulaCard}
                    disabled={isExportingCard}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#C5B49A] hover:bg-[#E8DAC8] text-[#1C2E20] text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isExportingCard ? '配方卡片生成中...' : '导出专属调配配方卡片 (PNG)'}</span>
                  </button>
                </div>

                {exportCardSuccessToast && (
                  <div className="p-3 rounded-xl bg-[#C5B49A] text-[#1C2E20] text-xs font-bold flex items-center gap-2 animate-fade-in shadow-lg">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{exportCardSuccessToast}</span>
                  </div>
                )}
              </div>

              {/* Essential Oil Efficacy Spectrum Visualization (精油效果多维可视化) */}
              <div className="mt-6 p-5 rounded-3xl bg-[#1C2E20] text-[#E8DAC8] space-y-4 shadow-xl border border-[#8C7E6A]/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#8C7E6A]/30 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-[#C5B49A]/20 text-[#C5B49A]">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#E8DAC8] flex items-center gap-2">
                        <span>精油多维疗效与身心作用图谱</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#C5B49A] text-[#1C2E20] text-[10px] font-mono font-bold">
                          EFFICACY SPECTRUM
                        </span>
                      </h4>
                      <p className="text-xs text-[#E8DAC8]/70 font-sans mt-0.5">
                        基于【{product.cn}】核心芳香分子结构，量化呈现五大身心疗愈维度效能
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  {efficacySpectrum.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#2A3F30] border border-[#8C7E6A]/20 space-y-2 hover:border-[#C5B49A]/50 transition-all"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-serif font-bold text-[#E8DAC8] flex items-center gap-2">
                            <IconComp className="w-4 h-4 text-[#C5B49A]" />
                            {item.label}
                          </span>
                          <div className="flex items-center gap-1.5 font-mono">
                            <span className="text-[10px] text-[#E8DAC8]/60">效能指数</span>
                            <span className="text-sm font-bold text-[#C5B49A]">{item.score}%</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-[#1C2E20] h-2 rounded-full overflow-hidden p-0.5 border border-[#8C7E6A]/20">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-700 shadow-xs`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>

                        <p className="text-[11px] text-[#E8DAC8]/80 leading-relaxed font-sans pl-6">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Aromatherapy Safety Advisory Component (芳疗安全提示指南) */}
              {safetyProfile && (
                <div className="mt-6 p-5 rounded-3xl bg-[#18110D] text-[#E8DAC8] space-y-4 shadow-xl border border-amber-900/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-800/30 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-bold text-amber-100 flex items-center gap-2">
                          <span>{typeNotice?.typeName || '芳疗'}专属安全提示与禁忌预警</span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/30">
                            {typeNotice?.badgeText || 'SAFETY ADVISORY'}
                          </span>
                        </h4>
                        <p className="text-xs text-[#E8DAC8]/70 font-sans mt-0.5">
                          针对【{product.cn}】活性成分与理化属性，为您提供严谨专业的临床芳疗指引
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Type-Specific Professional Advisory Callout */}
                  {typeNotice && (
                    <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-700/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs font-bold text-amber-200 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-amber-400" />
                          <span>{typeNotice.title}</span>
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-700/40 font-bold">
                          {typeNotice.badgeText}
                        </span>
                      </div>
                      <p className="text-xs text-[#E8DAC8]/90 leading-relaxed font-sans">
                        {typeNotice.statement}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-amber-800/30">
                        {typeNotice.highlights.map((hl, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-black/40 text-[10px] font-mono text-amber-200/90 border border-amber-800/40">
                            ✓ {hl}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                    {/* 1. Pregnancy & Lactation Risk */}
                    <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs font-bold text-amber-200 flex items-center gap-1.5">
                          <Baby className="w-4 h-4 text-amber-400" />
                          孕期及哺乳期使用禁忌
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${safetyProfile.pregnancyBadgeColor}`}>
                          {safetyProfile.pregnancyStatus}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#E8DAC8]/80 leading-relaxed">
                        {safetyProfile.pregnancyDesc}
                      </p>
                    </div>

                    {/* 2. Photosensitivity Risk */}
                    <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs font-bold text-amber-200 flex items-center gap-1.5">
                          <Sun className="w-4 h-4 text-amber-400" />
                          光敏性反应预警
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                          safetyProfile.isPhotosensitive
                            ? 'bg-red-500/20 text-red-300 border-red-500/40'
                            : 'bg-[#C5B49A]/20 text-[#C5B49A] border-[#C5B49A]/30'
                        }`}>
                          {safetyProfile.isPhotosensitive ? '含冷压光敏成分' : '无日光光敏风险'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#E8DAC8]/80 leading-relaxed">
                        {safetyProfile.photosensitivityText}
                      </p>
                    </div>

                    {/* 3. Natural Allergen Warnings */}
                    <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs font-bold text-amber-200 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          天然芳香过敏源披露
                        </span>
                        <span className="text-[10px] text-amber-300/70 font-mono">
                          EU 标准过敏源
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {safetyProfile.allergens.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-lg bg-amber-900/40 text-amber-200 text-[10px] font-mono border border-amber-700/40"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 4. Patch Test & Facial Concentration */}
                    <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs font-bold text-amber-200 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-amber-400" />
                          过敏斑贴测试与面部浓度
                        </span>
                        <span className="text-[10px] font-mono text-amber-300 font-bold">
                          面部推荐: {safetyProfile.maxFacialConc}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#E8DAC8]/80 leading-relaxed">
                        {safetyProfile.skinPatchDirective}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}



          {/* TAB 5: REVIEWS (真实体验与点评) */}
          {activeTab === 'reviews' && (
            <div className="space-y-5 animate-fade-in">
              
              {/* Rating Banner & Stats */}
              <div className="p-5 rounded-3xl bg-[#1C2E20] text-[#E8DAC8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-3xl font-bold text-[#E8DAC8]">4.9</span>
                    <div className="flex items-center text-[#C5B49A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-[#E8DAC8]/70 font-mono">/ 5.0 满分好评</span>
                  </div>
                  <p className="text-xs text-[#E8DAC8]/80">
                    基于 {reviewsList.length + 86} 位 UNIO 会员与资深芳疗试用者的真实反馈与复配印证。
                  </p>
                </div>

                <button
                  onClick={() => setShowForm(!showForm)}
                  className="px-4 py-2 rounded-full bg-[#C5B49A] hover:bg-[#E8DAC8] text-[#1C2E20] font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0"
                >
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>{showForm ? '收起评价表单' : '写下我的用香点评'}</span>
                </button>
              </div>

              {/* Success Toast */}
              {reviewSubmitted && (
                <div className="p-3.5 rounded-2xl bg-[#1C2E20]/90 text-[#E8DAC8] text-xs flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-[#C5B49A]" />
                  <span>感念分享！您的真实用香心得已成功载入该产品档案库。</span>
                </div>
              )}

              {/* New Review Form Drawer */}
              {showForm && (
                <form 
                  onSubmit={handleAddReview} 
                  className="p-4 sm:p-5 rounded-2xl bg-[#EFEDE7] border border-[#8C7E6A]/30 space-y-3.5 animate-fade-in shadow-inner"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xs text-[#1C2E20] flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-[#8C7E6A]" />
                      <span>添加您的真实植萃试用点评</span>
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] text-[#8C7E6A] font-medium mr-1">给出星级:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="p-0.5 text-[#C5B49A] hover:scale-110 transition-transform"
                        >
                          <Star className={`w-4 h-4 ${star <= newRating ? 'fill-current' : 'opacity-40'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] text-[#8C7E6A] font-bold mb-1">您的昵称或称呼</label>
                      <input
                        type="text"
                        placeholder="如: 林女士 / 芳香小白"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#8C7E6A]/25 text-[#1C2E20] focus:outline-none focus:border-[#1C2E20]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#8C7E6A] font-bold mb-1">身份或体验标签</label>
                      <input
                        type="text"
                        placeholder="如: 程序员/高压睡眠调理 / 瑜伽爱好者"
                        value={newUserTag}
                        onChange={(e) => setNewUserTag(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#8C7E6A]/25 text-[#1C2E20] focus:outline-none focus:border-[#1C2E20]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#8C7E6A] font-bold mb-1">使用方式与配方场景</label>
                    <input
                      type="text"
                      placeholder="如: 睡前香薰机扩香 3滴 + 荷荷巴油推拿"
                      value={newScenario}
                      onChange={(e) => setNewScenario(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#8C7E6A]/25 text-[#1C2E20] text-xs focus:outline-none focus:border-[#1C2E20]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#8C7E6A] font-bold mb-1">使用感受与心得点评 *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="分享您在使用这款产品时的香气感受、身心变化或调香惊喜..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#8C7E6A]/25 text-[#1C2E20] text-xs focus:outline-none focus:border-[#1C2E20]"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-1.5 rounded-full bg-[#DED9D2] text-[#2D2D2A] text-xs font-medium hover:bg-[#8C7E6A] hover:text-[#FAF8F5] transition-colors"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-1.5 rounded-full bg-[#1C2E20] text-[#E8DAC8] text-xs font-bold hover:bg-[#8C7E6A] hover:text-[#1C2E20] transition-colors shadow-xs"
                    >
                      提交体验点评
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-3.5">
                {reviewsList.map((rev) => {
                  const isLiked = likedMap[rev.id || rev.userName];
                  const currentLikes = (rev.likesCount || 10) + (isLiked ? 1 : 0);

                  return (
                    <div 
                      key={rev.id || rev.userName}
                      className="p-4 rounded-2xl bg-[#EFEDE7]/90 border border-[#8C7E6A]/20 space-y-2.5 hover:border-[#8C7E6A]/40 transition-all shadow-2xs"
                    >
                      {/* Reviewer Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-full bg-[#1C2E20] text-[#E8DAC8] text-xs font-bold flex items-center justify-center shrink-0">
                            {rev.userName[0]}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-xs text-[#1C2E20]">{rev.userName}</span>
                              {rev.userTag && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8C7E6A]/15 text-[#1C2E20] font-sans font-medium">
                                  {rev.userTag}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-[#8C7E6A] block pt-0.5">{rev.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5 text-[#C5B49A]">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Usage Scenario tag if present */}
                      {rev.usageScenario && (
                        <div className="text-[10px] font-mono text-[#8C7E6A] bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#8C7E6A]/15 inline-block">
                          💡 体验用法: {rev.usageScenario}
                        </div>
                      )}

                      {/* Comment text */}
                      <p className="text-xs text-[#2D2D2A] leading-relaxed font-sans pt-0.5">
                        {rev.comment}
                      </p>

                      {/* Footer Like Action */}
                      <div className="flex items-center justify-end pt-1 border-t border-[#8C7E6A]/10">
                        <button
                          onClick={() => handleToggleLike(rev.id || rev.userName)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                            isLiked 
                              ? 'bg-[#1C2E20] text-[#E8DAC8]' 
                              : 'bg-[#FAF8F5] text-[#8C7E6A] hover:text-[#1C2E20] border border-[#8C7E6A]/15'
                          }`}
                        >
                          <ThumbsUp className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
                          <span>有用 ({currentLikes})</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 6: TRACEABILITY (溯源与 COA 质检) */}
          {activeTab === 'traceability' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-5 rounded-2xl bg-[#EFEDE7] border border-[#8C7E6A]/20 space-y-3">
                <div className="flex items-center justify-between border-b border-[#8C7E6A]/20 pb-2">
                  <span className="font-mono text-xs font-bold text-[#1C2E20]">COA 检验报告编号</span>
                  <span className="font-mono text-xs text-[#8C7E6A]">{product.coaNumber}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#8C7E6A]/20 pb-2">
                  <span className="font-mono text-xs font-bold text-[#1C2E20]">生产追溯批次号</span>
                  <span className="font-mono text-xs text-[#8C7E6A]">{product.batchTrace}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1C2E20]">检测标准认证</span>
                  <span className="font-mono text-xs text-[#1C2E20] font-semibold">100% Pure Essential Oil / MSDS Verified</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#8C7E6A]/20 text-xs text-[#8C7E6A] leading-relaxed space-y-2">
                <div className="flex items-center gap-2 text-[#1C2E20] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#8C7E6A]" />
                  <span>UNIO 纯正品质保证与溯源承诺</span>
                </div>
                <p>
                  UNIO 元香坚持严选全球 50 余国与中国 31 省极境地标原生产地源头农场与第三代资深蒸馏专家。所有精油作品均不添加任何合成香精、防腐剂与重金属溶剂。如需调阅完整气相色谱 (GC-MS) 报告全文或 MSDS 安全技术数据表，请联系专属芳疗顾问。
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-[#8C7E6A]/20 bg-[#EFEDE7] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyDossier}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF8F5] border border-[#8C7E6A]/30 hover:bg-[#E8DAC8] text-xs text-[#1C2E20] transition-all font-semibold shadow-xs active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-[#1C2E20]" /> : <Copy className="w-4 h-4 text-[#8C7E6A]" />}
              <span>{copied ? '已复制档案 Dossier' : '复制档案 Dossier'}</span>
            </button>

            <button
              onClick={() => toggleWishlist(product.code)}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border transition-all text-xs font-semibold shadow-xs active:scale-95 ${
                isWishlisted(product.code)
                  ? 'bg-[#A85852] border-[#A85852] text-white'
                  : 'bg-[#FAF8F5] border-[#8C7E6A]/30 text-[#1C2E20] hover:bg-[#E8DAC8]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted(product.code) ? 'fill-current text-white' : 'text-[#A85852]'}`} />
              <span>{isWishlisted(product.code) ? '已收录于心愿单' : '加入心愿单 Wishlist'}</span>
            </button>
          </div>

          {onAddToCustomBlend && (
            <button
              onClick={() => {
                onAddToCustomBlend(product);
                onClose();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#1C2E20] text-[#E8DAC8] text-xs font-bold hover:bg-[#8C7E6A] hover:text-[#1C2E20] transition-all shadow-md active:scale-95 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-[#C5B49A]" />
              <span>加入 AI 一人一方配方库</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

