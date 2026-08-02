import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, ChevronRight, ChevronDown, Compass, Flame, Droplets, Wind, Sun, Moon, Leaf, Heart, ArrowRight, BookOpen, ExternalLink, X, Check, Bookmark, Wand2, RotateCcw, Sliders } from 'lucide-react';
import { fetchProductsFromSupabase } from '../data/siteDataService';
import { ProductItem } from '../types';
import { useSavedFormulas } from '../hooks/useSavedFormulas';
import { SolarTermD3Graph } from './SolarTermD3Graph';

export interface SolarTermInfo {
  id: string;
  name: string;
  pinyin: string;
  enName: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  startMonth: number; // 1-12
  startDay: number;
  endMonth: number;
  endDay: number;
  element: string; // 木, 火, 土, 金, 水
  summary: string;
  phenology: string[]; // 三候
  culture: string;
  wellnessAdvice: string[];
  scentProfile: {
    title: string;
    description: string;
    recommendedOils: string[];
    suggestedProductCode: string;
    blendFormula: string;
  };
}

export interface OilDetail {
  name: string;
  latinName: string;
  category: string;
  benefits: string;
  emotionalBenefits: string;
  element: string;
}

export const ESSENTIAL_OIL_INFO: Record<string, OilDetail> = {
  '佛手柑': {
    name: '佛手柑',
    latinName: 'Citrus bergamia',
    category: '柑橘调 · 头香',
    benefits: '疏肝理气、舒缓消化不良、平衡肌肤油脂分泌、收敛毛孔。',
    emotionalBenefits: '被称为“情绪安抚剂”，能迅速化解抑郁与焦虑，带来光明与欢愉。',
    element: '木'
  },
  '甜橙': {
    name: '甜橙',
    latinName: 'Citrus sinensis',
    category: '柑橘调 · 头香',
    benefits: '促进肠胃蠕动、改善食欲、温和排毒与亮泽暗沉肌肤。',
    emotionalBenefits: '温暖而充盈的阳光能量，驱散阴霾，带来童心般单纯的快乐与安全感。',
    element: '火'
  },
  '快乐鼠尾草': {
    name: '快乐鼠尾草',
    latinName: 'Salvia sclarea',
    category: '草本花香 · 中香',
    benefits: '调节女性生理节律、舒缓痉挛与肌肉紧张、平衡头皮油脂。',
    emotionalBenefits: '强大的镇静与放松感，破除执念，助人进入深层沉静的冥想状态。',
    element: '木'
  },
  '罗曼洋甘菊': {
    name: '罗曼洋甘菊',
    latinName: 'Chamaemelum nobile',
    category: '草本调 · 中香',
    benefits: '抗敏镇静、舒缓皮肤红肿发炎、平息胃部不适。',
    emotionalBenefits: '如同母亲温柔的抚摸，安抚惊恐不安、易怒与过度敏感的心灵。',
    element: '土'
  },
  '广藿香': {
    name: '广藿香',
    latinName: 'Pogostemon cablin',
    category: '木质东方调 · 基香',
    benefits: '收敛防腐、去湿消肿、促进皮肤细胞再生与伤口愈合。',
    emotionalBenefits: '深沉扎根的力量，抚平浮躁思绪，让人重获踏实感与内在笃定。',
    element: '土'
  },
  '橙花': {
    name: '橙花',
    latinName: 'Citrus aurantium',
    category: '花香调 · 中香',
    benefits: '增强细胞活力、淡化细纹、舒缓心悸与神经性结肠炎。',
    emotionalBenefits: '高雅纯净的安抚之香，平复剧烈创伤、惊恐与深层焦虑，重塑心灵纯真。',
    element: '金'
  },
  '苦橙叶': {
    name: '苦橙叶',
    latinName: 'Citrus aurantium leaf',
    category: '木质草本 · 中头香',
    benefits: '调节皮脂分泌、抗痉挛、帮助缓解呼吸道不适。',
    emotionalBenefits: '沉稳而清爽的定心能量，缓解长期压力、惊恐与夜间失眠。',
    element: '木'
  },
  '柠檬': {
    name: '柠檬',
    latinName: 'Citrus limon',
    category: '柑橘调 · 头香',
    benefits: '净化血液、提亮肤色、促进淋巴排毒与提升免疫。',
    emotionalBenefits: '澄澈清明的心智之光，清除思维迷雾，提升专注力与理清混沌情绪。',
    element: '金'
  },
  '真正薰衣草': {
    name: '真正薰衣草',
    latinName: 'Lavandula angustifolia',
    category: '花香草本 · 中香',
    benefits: '烫伤修复、安神助眠、降血压与镇静止痛。',
    emotionalBenefits: '无条件的包容与疗愈，抚平一切急躁与不安，带来宁静祥和的安眠环境。',
    element: '水'
  },
  '天竺葵': {
    name: '天竺葵',
    latinName: 'Pelargonium graveolens',
    category: '花香调 · 中香',
    benefits: '平衡荷尔蒙、改善淋巴循环、收敛平衡混合型肌肤。',
    emotionalBenefits: '均衡之精油，调和理智与感性的冲突，释放压抑，恢复心灵的弹性。',
    element: '火'
  },
  '迷迭香': {
    name: '迷迭香',
    latinName: 'Rosmarinus officinalis',
    category: '草本调 · 头中香',
    benefits: '刺激脑部血液循环、增强记忆力、强健发根与紧致肌肤。',
    emotionalBenefits: '“记忆之草”，破除昏沉疲惫，唤醒警觉心与高昂的行动意志。',
    element: '木'
  },
  '尤加利': {
    name: '尤加利',
    latinName: 'Eucalyptus globulus',
    category: '樟脑草本 · 头香',
    benefits: '强效呼吸道杀菌、祛痰通鼻、缓解肌肉酸痛。',
    emotionalBenefits: '打破沉闷僵局，开阔心胸空间，赋予面对变革与危机的勇气。',
    element: '金'
  },
  '丝柏': {
    name: '丝柏',
    latinName: 'Cupressus sempervirens',
    category: '木质调 · 中香',
    benefits: '收敛静脉曲张、调节体液流失、改善多汗与水肿。',
    emotionalBenefits: '引导转化的坚定力量，帮助度过人生重大转折期，放下悲伤与过往执念。',
    element: '金'
  },
  '薄荷': {
    name: '薄荷',
    latinName: 'Mentha piperita',
    category: '草本凉香 · 头香',
    benefits: '清凉止痒、缓解头疼偏头痛、消食祛胀气。',
    emotionalBenefits: '清爽强烈的震撼感，迅速冷却暴躁情绪，给过热的头脑带来冷静与清明。',
    element: '水'
  },
  '大马士革玫瑰': {
    name: '大马士革玫瑰',
    latinName: 'Rosa damascena',
    category: '花香调 · 中基香',
    benefits: '滋养成熟干性肌肤、调理子宫与生殖系统、抗衰老。',
    emotionalBenefits: '爱与美的终极象征，疗愈情感创伤，唤醒深层自我接纳与爱的能力。',
    element: '火'
  },
  '玫瑰': {
    name: '大马士革玫瑰',
    latinName: 'Rosa damascena',
    category: '花香调 · 中基香',
    benefits: '滋养成熟干性肌肤、调理子宫与生殖系统、抗衰老。',
    emotionalBenefits: '爱与美的终极象征，疗愈情感创伤，唤醒深层自我接纳与爱的能力。',
    element: '火'
  },
  '檀香': {
    name: '檀香',
    latinName: 'Santalum album',
    category: '木质香调 · 基香',
    benefits: '深层滋润干燥敏感肌、镇静生殖泌尿系统、平喘止咳。',
    emotionalBenefits: '高尚神圣的灵性木香，拔除杂念与执念，带人步入禅定深寂的超然境界。',
    element: '土'
  },
  '依兰': {
    name: '依兰依兰',
    latinName: 'Cananga odorata',
    category: '花香调 · 中基香',
    benefits: '降血压、平衡皮脂分泌、改善呼吸急促。',
    emotionalBenefits: '欢愉与催情之花，释放受压抑的热情，抚平焦虑、惊恐与挫败感。',
    element: '火'
  },
  '大西洋雪松': {
    name: '大西洋雪松',
    latinName: 'Cedrus atlantica',
    category: '木质调 · 基香',
    benefits: '溶解脂肪、改善皮屑与脱发、促进淋巴循环。',
    emotionalBenefits: '巍峨挺拔的古树能量，给予危机中孤立无援者坚定支撑与安全感。',
    element: '土'
  },
  '雪松': {
    name: '大西洋雪松',
    latinName: 'Cedrus atlantica',
    category: '木质调 · 基香',
    benefits: '溶解脂肪、改善皮屑与脱发、促进淋巴循环。',
    emotionalBenefits: '巍峨挺拔的古树能量，给予危机中孤立无援者坚定支撑与安全感。',
    element: '土'
  },
  '杜松子': {
    name: '杜松子',
    latinName: 'Juniperus communis',
    category: '松脂木香 · 中香',
    benefits: '强大利尿排毒、改善水肿与关节炎、净化阻塞毛孔。',
    emotionalBenefits: '负能量扫除者，净化混浊气场，释放积压的负面情绪与恐惧。',
    element: '水'
  },
  '岩兰草': {
    name: '岩兰草',
    latinName: 'Vetiveria zizanioides',
    category: '泥土木香 · 基香',
    benefits: '镇静神经系统、促进血液循环、改善严重失眠。',
    emotionalBenefits: '“宁静之油”，极强的扎根地气，安抚极度疲惫、虚脱与身心失衡者。',
    element: '土'
  },
  '乳香': {
    name: '乳香',
    latinName: 'Boswellia carterii',
    category: '树脂调 · 基香',
    benefits: '赐予肌肤新生、平缓呼吸加深呼吸深度、平息粘膜发炎。',
    emotionalBenefits: '连接天地之香，安抚焦虑不安，帮助加深呼吸，唤醒高维灵性觉知。',
    element: '金'
  },
  '没药': {
    name: '没药',
    latinName: 'Commiphora myrrha',
    category: '树脂调 · 基香',
    benefits: '强效抗炎愈伤、改善口腔溃疡、温滋干裂肌肤。',
    emotionalBenefits: '安抚创伤与悲痛，为受创心灵筑起保护屏障，重建内在安全感。',
    element: '水'
  },
  '肉桂': {
    name: '肉桂',
    latinName: 'Cinnamomum verum',
    category: '辛香调 · 中基香',
    benefits: '强效驱寒温阳、促进血液循环、改善四肢冰冷。',
    emotionalBenefits: '如烈火般炽热温暖，驱散孤独感与冷漠，激发内在的热情与生存活力。',
    element: '火'
  },
  '生姜': {
    name: '生姜',
    latinName: 'Zingiber officinale',
    category: '辛香调 · 中头香',
    benefits: '温中散寒、止呕止痛、发汗解表、改善关节冷痛。',
    emotionalBenefits: '注入强劲的阳刚意志，消除沮丧与拖延，赋能勇敢果断的执行力。',
    element: '火'
  }
};

export function getOilDetail(oilName: string): OilDetail {
  const cleanName = oilName.trim();
  if (ESSENTIAL_OIL_INFO[cleanName]) {
    return ESSENTIAL_OIL_INFO[cleanName];
  }
  for (const key of Object.keys(ESSENTIAL_OIL_INFO)) {
    if (cleanName.includes(key) || key.includes(cleanName)) {
      return ESSENTIAL_OIL_INFO[key];
    }
  }
  return {
    name: cleanName,
    latinName: 'Essential Oil Extract',
    category: '天然植物萃取 · 单方精油',
    benefits: '富含天然活性植物萃取成分，舒缓理气，温和滋养肌肤屏障与机体健康。',
    emotionalBenefits: '芳香分子作用于脑部边缘系统，释放压力与疲惫，恢复心灵安宁与澄澈。',
    element: '木'
  };
}

export const SOLAR_TERMS_DATA: SolarTermInfo[] = [
  {
    id: 'lichun',
    name: '立春',
    pinyin: 'Lì Chūn',
    enName: 'Beginning of Spring',
    season: 'spring',
    startMonth: 2, startDay: 3, endMonth: 2, endDay: 18,
    element: '木',
    summary: '阳气初升，万物萌动。宜舒畅肝木，清发积素。',
    phenology: ['一候东风解冻', '二候蛰虫始振', '三候鱼陟负冰'],
    culture: '立春乃二十四节气之首，岁始之日。古人于立春迎春赐彩，句芒司春，象征生命力自大地深处悄然复苏。',
    wellnessAdvice: [
      '春属木，对应人体肝脏。宜顺应阳气升发，早起散步。',
      '饮食宜少酸多甘，戒怒戒郁，保持胸怀开朗。',
      '宜用轻盈透发的头香精油疏理肝气，焕发机体活力。'
    ],
    scentProfile: {
      title: '疏肝解郁 · 萌发之香',
      description: '带有初春新绿与清爽柑橘气息的调配，助阳气顺畅升发。',
      recommendedOils: ['佛手柑', '甜橙', '快乐鼠尾草'],
      suggestedProductCode: 'SYN-001',
      blendFormula: '佛手柑 3滴 + 快乐鼠尾草 2滴 + 大西洋雪松 1滴'
    }
  },
  {
    id: 'yushui',
    name: '雨水',
    pinyin: 'Yǔ Shuǐ',
    enName: 'Rain Water',
    season: 'spring',
    startMonth: 2, startDay: 19, endMonth: 3, endDay: 5,
    element: '木',
    summary: '润物无声，湿气渐生。宜温脾化湿，滋润心肺。',
    phenology: ['一候獭祭鱼', '二候鸿雁来', '三候草木萌动'],
    culture: '雨水节气东风解冻，散而为雨。天地间水汽逐渐充沛，大地受甘霖滋养，草木吐翠。',
    wellnessAdvice: [
      '湿气渐重，易伤脾胃，宜食山药、薏米等温脾健胃之品。',
      '注意下半身保暖，“春捂”御寒，防止湿寒侵体。',
      '香芬宜选兼具温化湿气与草本甘甜之味的植物萃取。'
    ],
    scentProfile: {
      title: '温脾化湿 · 润泽之香',
      description: '结合清新草本与温和木香，祛除空气潮湿感，安抚身心。',
      recommendedOils: ['罗曼洋甘菊', '广藿香', '甜橙'],
      suggestedProductCode: 'ESS-001',
      blendFormula: '罗曼洋甘菊 2滴 + 广藿香 1滴 + 甜橙 3滴'
    }
  },
  {
    id: 'jingzhe',
    name: '惊蛰',
    pinyin: 'Jīng Zhé',
    enName: 'Awakening of Insects',
    season: 'spring',
    startMonth: 3, startDay: 6, endMonth: 3, endDay: 20,
    element: '木',
    summary: '春雷响动，万物惊醒。宜宣肺理气，预防春燥。',
    phenology: ['一候桃始华', '二候仓庚鸣', '三候鹰化为鸠'],
    culture: '春雷始鸣，惊醒蛰伏地下冬眠的昆虫。惊蛰标志着仲春时节的开始，桃花红、李花白，大地生机勃勃。',
    wellnessAdvice: [
      '春雷震响，人体气机升发剧烈，需防肝火上亢。',
      '多饮温水与花草茶，适当增加户外有氧运动。',
      '宜以花香与柑橘协同调配，平衡情绪，宣畅气血。'
    ],
    scentProfile: {
      title: '春雷唤醒 · 宣畅之香',
      description: '明亮的花草清香伴随微风，唤醒沉睡身心与肌肤能量。',
      recommendedOils: ['橙花', '苦橙叶', '柠檬'],
      suggestedProductCode: 'HYD-001',
      blendFormula: '橙花 2滴 + 苦橙叶 2滴 + 柠檬 2滴'
    }
  },
  {
    id: 'chunfen',
    name: '春分',
    pinyin: 'Chūn Fēn',
    enName: 'Spring Equinox',
    season: 'spring',
    startMonth: 3, startDay: 21, endMonth: 4, endDay: 4,
    element: '木',
    summary: '阴阳相半，昼夜均长。宜平肝调阴阳，平衡气血。',
    phenology: ['一候玄鸟至', '二候雷乃发声', '三候始电'],
    culture: '春分者，阴阳相半也，故昼夜均而寒暑平。古有春分祭日之俗，天地气血处于至臻平衡之态。',
    wellnessAdvice: [
      '养生原则重在“求平”，防大喜大怒，保持气血调和。',
      '调息冥想，结合芳香扩散，助心神安宁。',
      '选用平衡身心、中和阴阳的花木复合香气。'
    ],
    scentProfile: {
      title: '阴阳平协调 · 中和之香',
      description: '花香与木香和谐交织，缔造中正平和的清幽空间。',
      recommendedOils: ['大马士革玫瑰', '檀香', '天竺葵'],
      suggestedProductCode: 'ESS-002',
      blendFormula: '大马士革玫瑰 2滴 + 天竺葵 2滴 + 檀香 1滴'
    }
  },
  {
    id: 'qingming',
    name: '清明',
    pinyin: 'Qīng Míng',
    enName: 'Clear and Bright',
    season: 'spring',
    startMonth: 4, startDay: 5, endMonth: 4, endDay: 19,
    element: '木',
    summary: '气清景明，万物皆显。宜吐故纳新，清心安神。',
    phenology: ['一候桐始华', '二候田鼠化为鴽', '三候虹始见'],
    culture: '万物皆洁齐而清明。既是慎终追远之祭祖节，亦是踏青亲近自然的清朗时节。',
    wellnessAdvice: [
      '春深湿热微动，宜多户外踏青吸纳清气，吐故纳新。',
      '清淡饮食，柔肝养肺，避免吃大辛大热之物。',
      '精油宜选具有高山清冽感与沉香木韵之气。'
    ],
    scentProfile: {
      title: '气清景明 · 清涤之香',
      description: '透亮高山纯露与沉稳木香，洗涤沉闷，焕发澄澈心智。',
      recommendedOils: ['高山薰衣草', '迷迭香', '欧洲冷杉'],
      suggestedProductCode: 'HYD-002',
      blendFormula: '高山薰衣草 3滴 + 迷迭香 1滴 + 欧洲冷杉 2滴'
    }
  },
  {
    id: 'guyu',
    name: '谷雨',
    pinyin: 'Gǔ Yǔ',
    enName: 'Grain Rain',
    season: 'spring',
    startMonth: 4, startDay: 20, endMonth: 5, endDay: 4,
    element: '木',
    summary: '雨生百谷，暮春将尽。宜清热祛湿，养护肌表。',
    phenology: ['一候萍始生', '二候鸣鸠拂其羽', '三候戴胜降于桑'],
    culture: '谷雨乃春季最后一个节气。雨水滋润百谷，牡丹吐艳，茶农采摘谷雨前春茶，满腹清芬。',
    wellnessAdvice: [
      '气温升高，雨水增多，湿热交加，需提防皮肤敏感与湿疹。',
      '宜饮谷雨春茶，清热利湿，健脾祛火。',
      '使用茶香与青草调植物萃取，舒缓肌表烦躁。'
    ],
    scentProfile: {
      title: '谷雨润物 · 绿意之香',
      description: '春茶清香与晨露清气，赋予肌表与呼吸天然屏障。',
      recommendedOils: ['茶树', '柠檬铁线莲', '薄荷'],
      suggestedProductCode: 'ESS-003',
      blendFormula: '茶树 2滴 + 柠檬 3滴 + 薄荷 1滴'
    }
  },
  {
    id: 'lixia',
    name: '立夏',
    pinyin: 'Lì Xià',
    enName: 'Beginning of Summer',
    season: 'summer',
    startMonth: 5, startDay: 5, endMonth: 5, endDay: 20,
    element: '火',
    summary: '暑气渐萌，万物并秀。宜养心安神，清热除烦。',
    phenology: ['一候蛙始鸣', '二候蚯蚓出', '三候王瓜生'],
    culture: '立夏天地始交，万物并秀。夏主火，内应于心，古人有立夏尝新、尝麦与斗茶之俗。',
    wellnessAdvice: [
      '心气当令，宜静心养性，防心火内生、躁动不安。',
      '适当午休以养心阳，多食红色食物与苦味蔬菜。',
      '选用具有降火安神功效的苦柑叶与花香精油。'
    ],
    scentProfile: {
      title: '初夏清心 · 养神之香',
      description: '苦橙叶的微苦草本感结合橙花，抚平心火躁动。',
      recommendedOils: ['苦橙叶', '橙花', '檀香'],
      suggestedProductCode: 'SYN-002',
      blendFormula: '苦橙叶 3滴 + 橙花 2滴 + 檀香 1滴'
    }
  },
  {
    id: 'xiaoman',
    name: '小满',
    pinyin: 'Xiǎo Mǎn',
    enName: 'Grain Buds',
    season: 'summer',
    startMonth: 5, startDay: 21, endMonth: 6, endDay: 5,
    element: '火',
    summary: '麦类渐满，湿热微浸。宜清热利湿，安稳皮脂。',
    phenology: ['一候苦菜秀', '二候靡草死', '三候麦秋至'],
    culture: '小满者，物至于此小得盈满。夏熟作物籽粒开始灌浆饱满，天地间风暖暑湿渐显。',
    wellnessAdvice: [
      '注意皮肤清洁与水油平衡，防暑湿致痤疮。',
      '避免暴饮暴食生冷冰品，保护脾胃阳气。',
      '宜用天竺葵与柑橘清香平衡肌肤与情志。'
    ],
    scentProfile: {
      title: '微风盈满 · 平衡之香',
      description: '优雅天竺葵与清甜草木，帮助肌表调理水油平衡。',
      recommendedOils: ['玫瑰天竺葵', '柠檬', '丝柏'],
      suggestedProductCode: 'ESS-002',
      blendFormula: '玫瑰天竺葵 3滴 + 柠檬 2滴 + 丝柏 1滴'
    }
  },
  {
    id: 'mangzhong',
    name: '芒种',
    pinyin: 'Máng Zhòng',
    enName: 'Grain in Ear',
    season: 'summer',
    startMonth: 6, startDay: 6, endMonth: 6, endDay: 20,
    element: '火',
    summary: '家家麦饭，黄梅时节。宜清热解暑，舒缓身心。',
    phenology: ['一候螳螂生', '二候鵙始鸣', '三候反舌无声'],
    culture: '芒种字面意为“有芒之谷可种”。此时南方进入梅雨季节，空气潮湿闷热，古有煮梅祭花神之习俗。',
    wellnessAdvice: [
      '梅雨湿热，人体易感倦怠乏力、头重如裹。',
      '宜常吃青梅、薏米、冬瓜，祛湿解暑。',
      '选用透发性强、带有凉感的薄荷与尤加利净油。'
    ],
    scentProfile: {
      title: '黄梅煮青 · 驱湿之香',
      description: '透亮薄荷与青梅酸甜风韵，驱散室内沉闷湿热。',
      recommendedOils: ['蓝胶尤加利', '胡椒薄荷', '柠檬草'],
      suggestedProductCode: 'HYD-003',
      blendFormula: '蓝胶尤加利 2滴 + 胡椒薄荷 2滴 + 柠檬草 1滴'
    }
  },
  {
    id: 'xiazhi',
    name: '夏至',
    pinyin: 'Xià Zhì',
    enName: 'Summer Solstice',
    season: 'summer',
    startMonth: 6, startDay: 21, endMonth: 7, endDay: 6,
    element: '火',
    summary: '日长之至，阳极阴生。宜避暑清心，安神定志。',
    phenology: ['一候鹿角解', '二候蝉始鸣', '三候半夏生'],
    culture: '夏至日白昼最长，阳气达到极致，一阴始生。古人于夏至祭地、吃夏至面，避暑驱虫。',
    wellnessAdvice: [
      '阳极阴生，切忌夜饮冷凉，防心阳受损。',
      '午时适当静坐沉思，以顺应天地阴阳交替。',
      '精油宜选高山冷杉与深沉岩兰草，沉降浮躁。'
    ],
    scentProfile: {
      title: '阳极阴生 · 静定之香',
      description: '高山松针与岩兰草深沉根香，平定盛夏浮躁心神。',
      recommendedOils: ['岩兰草', '欧洲冷杉', '薰衣草'],
      suggestedProductCode: 'ESS-001',
      blendFormula: '岩兰草 1滴 + 欧洲冷杉 3滴 + 高山薰衣草 2滴'
    }
  },
  {
    id: 'xiaoshu',
    name: '小暑',
    pinyin: 'Xiǎo Shǔ',
    enName: 'Minor Heat',
    season: 'summer',
    startMonth: 7, startDay: 7, endMonth: 7, endDay: 22,
    element: '火',
    summary: '小暑至，伏天始。宜清热解暑，健脾益气。',
    phenology: ['一候温风至', '二候蟋蟀居壁', '三候鹰始挚'],
    culture: '小暑即小热，代表炎热天气拉开序幕。温风盛行，蟋蟀避热居于墙角，伏天晒伏、吃伏羊。',
    wellnessAdvice: [
      '注意防止中暑与空调病，多饮温热绿茶或荷叶水。',
      '晚间宜精油薰香舒缓受热肌表，安抚睡眠。',
      '使用清凉柑橘与香草协同降低体感温度。'
    ],
    scentProfile: {
      title: '温风避暑 · 清凉之香',
      description: '冷压葡萄柚与甜橙，带来充沛清爽果香，安抚夏夜。',
      recommendedOils: ['葡萄柚', '绿薄荷', '薰衣草'],
      suggestedProductCode: 'SYN-003',
      blendFormula: '葡萄柚 3滴 + 绿薄荷 1滴 + 薰衣草 2滴'
    }
  },
  {
    id: 'dashu',
    name: '大暑',
    pinyin: 'Dà Shǔ',
    enName: 'Great Heat',
    season: 'summer',
    startMonth: 7, startDay: 23, endMonth: 8, endDay: 6,
    element: '土',
    summary: '湿热交蒸，一年极热。宜清心涤暑，安神宁静。',
    phenology: ['一候腐草为萤', '二候土润溽暑', '三候大雨时行'],
    culture: '大暑乃一年中气温最高、湿热最重之节气。萤火虫在夏夜草丛闪烁，大雨骤降，天地如蒸笼。',
    wellnessAdvice: [
      '“大暑热不透，大五谷不收”。身心防暑降温同时需保脾胃温煦。',
      '晚间可点燃沉香或薰衣草精油，驱散室内溽热闷气。',
      '极宜使用具有冷感清心、强健肌肤屏障的纯露与单方。'
    ],
    scentProfile: {
      title: '清心涤暑 · 凉润之香',
      description: '大马士革玫瑰纯露与高山真薰衣草交织，抚平溽热烦躁。',
      recommendedOils: ['真薰衣草', '罗马洋甘菊', '檀香'],
      suggestedProductCode: 'ESS-001',
      blendFormula: '真薰衣草 3滴 + 罗马洋甘菊 2滴 + 檀香 1滴'
    }
  },
  {
    id: 'liqiu',
    name: '立秋',
    pinyin: 'Lì Qiū',
    enName: 'Beginning of Autumn',
    season: 'autumn',
    startMonth: 8, startDay: 7, endMonth: 8, endDay: 22,
    element: '金',
    summary: '凉风至，秋敛始。宜润肺敛气，平怀定心。',
    phenology: ['一候凉风至', '二候白露降', '三候寒蝉鸣'],
    culture: '立秋秋高气爽，阳气收敛。古有贴秋膘、啃秋瓜之俗，象征丰收季节的开始。',
    wellnessAdvice: [
      '虽然“秋老虎”余热未消，但早晚已有微凉，注意保暖。',
      '饮食宜“少辛增酸”，多吃蜂蜜、芝麻、百合润肺。',
      '芳香疗法宜从夏日清凉转向温润敛气的木香与乳香。'
    ],
    scentProfile: {
      title: '秋敛润肺 · 沉静之香',
      description: '温润乳香与大西洋雪松，带给呼吸系统丝丝润泽与定力。',
      recommendedOils: ['乳香', '大西洋雪松', '甜橙'],
      suggestedProductCode: 'ESS-004',
      blendFormula: '乳香 2滴 + 大西洋雪松 2滴 + 甜橙 2滴'
    }
  },
  {
    id: 'chushu',
    name: '处暑',
    pinyin: 'Chù Shǔ',
    enName: 'End of Heat',
    season: 'autumn',
    startMonth: 8, startDay: 23, endMonth: 9, endDay: 7,
    element: '金',
    summary: '暑气即止，秋意渐浓。宜防秋燥，温养心肺。',
    phenology: ['一候鹰乃祭鸟', '二候天地始肃', '三候禾乃登'],
    culture: '“处”止也，暑气至此终止。五谷丰登，天地间显露清肃之气，正是观云赏景最佳时。',
    wellnessAdvice: [
      '秋燥渐显，易感皮肤干燥紧绷，需加倍保湿润肤。',
      '保持充足睡眠，防“秋乏”侵扰。',
      '推荐选用带有温润花香与基底植物油的复方抚育肌表。'
    ],
    scentProfile: {
      title: '止暑迎秋 · 滋润之香',
      description: '大马士革玫瑰与安息香，给予干燥肌肤深层滋养与安抚。',
      recommendedOils: ['大马士革玫瑰', '安息香', '天竺葵'],
      suggestedProductCode: 'ESS-002',
      blendFormula: '大马士革玫瑰 2滴 + 天竺葵 2滴 + 安息香 1滴'
    }
  },
  {
    id: 'bailu',
    name: '白露',
    pinyin: 'Bái Lù',
    enName: 'White Dew',
    season: 'autumn',
    startMonth: 9, startDay: 8, endMonth: 9, endDay: 22,
    element: '金',
    summary: '阴气渐重，露凝而白。宜滋阴润燥，保暖御寒。',
    phenology: ['一候鸿雁来', '二候玄鸟归', '三候群鸟养羞'],
    culture: '白露是反映自然界气温变化的重要节气。夜间水汽凝结成白色露珠，古人有收白露水煎茶之雅趣。',
    wellnessAdvice: [
      '“白露身不露”，切勿再穿露脐或短裤，防止寒从脚下生。',
      '多食银耳、梨汁润肺生津，缓解咽喉干燥。',
      '香芬宜选具有温润香气与安神特质的依兰与檀香。'
    ],
    scentProfile: {
      title: '露凝温润 · 滋生之香',
      description: '温和依兰与沉香檀木，为凉夜注入融融暖意与滋润。',
      recommendedOils: ['依兰依兰', '檀香', '甜橙'],
      suggestedProductCode: 'SYN-004',
      blendFormula: '依兰依兰 1滴 + 檀香 2滴 + 甜橙 3滴'
    }
  },
  {
    id: 'qiufen',
    name: '秋分',
    pinyin: 'Qiū Fēn',
    enName: 'Autumn Equinox',
    season: 'autumn',
    startMonth: 9, startDay: 23, endMonth: 10, endDay: 7,
    element: '金',
    summary: '阴阳平分，秋高气爽。宜收敛神气，滋润肺金。',
    phenology: ['一候雷始收声', '二候蛰虫坯户', '三候水始涸'],
    culture: '秋分日昼夜平分，雷声渐息。我国定秋分日为“中国农民丰收节”，风清气爽，丹桂飘香。',
    wellnessAdvice: [
      '阴阳持平，宜早睡早起，顺应秋气收敛。',
      '秋燥伤肺，多做深呼吸与扩胸运动。',
      '选用桂花、天竺葵与树脂类精油平衡身心。'
    ],
    scentProfile: {
      title: '丹桂飘香 · 丰润之香',
      description: '高雅花香与树脂底韵，如秋日金桂拂过面颊般温暖舒适。',
      recommendedOils: ['桂花', '天竺葵', '没药'],
      suggestedProductCode: 'ESS-002',
      blendFormula: '桂花 2滴 + 天竺葵 2滴 + 没药 1滴'
    }
  },
  {
    id: 'hanlu',
    name: '寒露',
    pinyin: 'Hán Lù',
    enName: 'Cold Dew',
    season: 'autumn',
    startMonth: 10, startDay: 8, endMonth: 10, endDay: 22,
    element: '金',
    summary: '露水日寒，将凝结霜。宜温养肝肾，润燥防寒。',
    phenology: ['一候鸿雁来宾', '二候雀入大水为蛤', '三候菊有黄华'],
    culture: '寒露时节气温比白露更低，露水寒冷将凝。菊花盛开，古人赏菊、饮菊花酒、登高远眺。',
    wellnessAdvice: [
      '寒露脚不露，坚持每晚温水泡脚，促进血液循环。',
      '多吃温热润燥食物，如黑芝麻、红枣、核桃。',
      '使用温热性质的姜、肉桂或岩兰草精油护理双足。'
    ],
    scentProfile: {
      title: '寒露凝霜 · 温通之香',
      description: '带有一丝暖意的生姜与甜橙，驱散冷露寒气。',
      recommendedOils: ['生姜', '甜橙', '大西洋雪松'],
      suggestedProductCode: 'ESS-004',
      blendFormula: '生姜 1滴 + 甜橙 3滴 + 大西洋雪松 2滴'
    }
  },
  {
    id: 'shuangjiang',
    name: '霜降',
    pinyin: 'Shuāng Jiàng',
    enName: 'Frost Descent',
    season: 'autumn',
    startMonth: 10, startDay: 23, endMonth: 11, endDay: 6,
    element: '金',
    summary: '深秋霜降，黄叶凝霜。宜平补脾胃，固补元气。',
    phenology: ['一候草木黄落', '二候蛰虫咸俯', '三候豺乃祭兽'],
    culture: '霜降是秋季的最后一个节气，代表深秋至初冬的过渡。枫叶经霜红艳，古有“补冬不如补霜降”之说。',
    wellnessAdvice: [
      '深秋防寒保暖第一，尤其是胃部与关节部位。',
      '适度进补，多食牛肉、山药、柿子。',
      '选择具有深沉暖意与护体功效的木质香调精油。'
    ],
    scentProfile: {
      title: '深秋枫红 · 暖护之香',
      description: '沉香、乳香与甜暖柑橘，为初冬预热温润底色。',
      recommendedOils: ['乳香', '檀香', '红橘'],
      suggestedProductCode: 'SYN-005',
      blendFormula: '乳香 2滴 + 檀香 2滴 + 红橘 2滴'
    }
  },
  {
    id: 'lidong',
    name: '立冬',
    pinyin: 'Lì Dōng',
    enName: 'Beginning of Winter',
    season: 'winter',
    startMonth: 11, startDay: 7, endMonth: 11, endDay: 21,
    element: '水',
    summary: '冬者终也，万物收藏。宜滋阴潜阳，休养生息。',
    phenology: ['一候水始冰', '二候地始冻', '三候雉入大水为蜃'],
    culture: '立冬标志着冬季到来，万物进入休养收藏状态。民间有立冬吃饺子、补冬迎冬之俗。',
    wellnessAdvice: [
      '冬主封藏，宜早睡晚起，待日光照射后活动。',
      '保护肾气，多食用黑色食物如黑豆、黑芝麻。',
      '芳疗宜用深沉固本的根部与木质部精油安抚情志。'
    ],
    scentProfile: {
      title: '封藏归元 · 固本之香',
      description: '岩兰草与檀香稳固气场，守护冬夜宁静睡眠。',
      recommendedOils: ['岩兰草', '檀香', '薰衣草'],
      suggestedProductCode: 'ESS-001',
      blendFormula: '岩兰草 2滴 + 檀香 2滴 + 薰衣草 2滴'
    }
  },
  {
    id: 'xiaoxue',
    name: '小雪',
    pinyin: 'Xiǎo Xuě',
    enName: 'Minor Snow',
    season: 'winter',
    startMonth: 11, startDay: 22, endMonth: 12, endDay: 6,
    element: '水',
    summary: '气寒将雪，天地闭塞。宜温阳活血，驱寒御冬。',
    phenology: ['一候虹藏不见', '二候天气上升地气下降', '三候闭塞而成冬'],
    culture: '小雪气寒，降水凝结为雪。南方腌腊肉，北方吃涮羊肉，一家围炉而坐，温馨御寒。',
    wellnessAdvice: [
      '室内取暖易致内热生干燥，注意补充水分与室内加湿。',
      '多做温和拉伸运动，促进周身气血循环。',
      '薰香宜选带有辛香暖感的肉桂、丁香与红橘。'
    ],
    scentProfile: {
      title: '围炉暖雪 · 馨香之香',
      description: '微辛肉桂与甜橙相融，打造如红酒煮香料般温馨的空间。',
      recommendedOils: ['肉桂', '甜橙', '丁香'],
      suggestedProductCode: 'SYN-005',
      blendFormula: '甜橙 4滴 + 肉桂 1滴 + 丁香 1滴'
    }
  },
  {
    id: 'daxue',
    name: '大雪',
    pinyin: 'Dà Xuě',
    enName: 'Major Snow',
    season: 'winter',
    startMonth: 12, startDay: 7, endMonth: 12, endDay: 21,
    element: '水',
    summary: '至此雪盛，万物蛰伏。宜温补肾阳，静养心神。',
    phenology: ['一候鹃鸥不鸣', '二候虎始交', '三候荔挺出'],
    culture: '大雪标志着仲冬时节开始。雪花纷飞，江河凝冰，古有“大雪进补，春来打虎”之说。',
    wellnessAdvice: [
      '严冬御寒第一，格外保护头部、背部与足部。',
      '静心养神，减少剧烈出汗消耗阳气。',
      '选用具有强效暖意与抗寒属性的精油复方护理。'
    ],
    scentProfile: {
      title: '雪落归寂 · 暖心之香',
      description: '安息香与大西洋雪松，在银装素裹中送上一抹深情暖意。',
      recommendedOils: ['安息香', '大西洋雪松', '甜橙'],
      suggestedProductCode: 'ESS-004',
      blendFormula: '安息香 2滴 + 大西洋雪松 3滴 + 甜橙 2滴'
    }
  },
  {
    id: 'dongzhi',
    name: '冬至',
    pinyin: 'Dōng Zhì',
    enName: 'Winter Solstice',
    season: 'winter',
    startMonth: 12, startDay: 22, endMonth: 1, endDay: 5,
    element: '水',
    summary: '日短之至，一阳初生。宜温阳培本，安静安神。',
    phenology: ['一候蚯蚓结', '二候麋角解', '三候水泉动'],
    culture: '冬至大如年。白昼最短，夜最长，一阳始生。北方吃饺子、南方吃汤圆，数九寒天由此始。',
    wellnessAdvice: [
      '一阳初生极微弱，需精心保护，防过度劳累损伤生机。',
      '多食温补食物，夜间泡脚并辅以足部按摩。',
      '精油选用具有温暖生命力象征的乳香与没药。'
    ],
    scentProfile: {
      title: '一阳初生 · 启生之香',
      description: '古老圣香乳香与没药，守护微弱阳气复苏，寓意生机重现。',
      recommendedOils: ['乳香', '没药', '佛手柑'],
      suggestedProductCode: 'SYN-001',
      blendFormula: '乳香 2滴 + 没药 2滴 + 佛手柑 2滴'
    }
  },
  {
    id: 'xiaohan',
    name: '小寒',
    pinyin: 'Xiǎo Hán',
    enName: 'Minor Cold',
    season: 'winter',
    startMonth: 1, startDay: 6, endMonth: 1, endDay: 19,
    element: '水',
    summary: '冷在三九，气寒日严。宜防寒保暖，温中健脾。',
    phenology: ['一候雁北乡', '二候鹊始巢', '三候雉始雊'],
    culture: '小寒标志着开始进入一年中最寒冷的“三九天”。腊梅吐艳，人们吃腊八粥、吃菜饭迎新年。',
    wellnessAdvice: [
      '防寒保暖重中之重，增加户外阳光照射时间。',
      '饮食宜多温热，如当归羊肉汤、桂圆红枣茶。',
      '香芬宜用具有强效温通气血的生姜与杜松。'
    ],
    scentProfile: {
      title: '腊梅迎寒 · 暖通之香',
      description: '生姜与杜松浆果，如冬日烈酒般驱散通体寒意。',
      recommendedOils: ['生姜', '杜松浆果', '甜橙'],
      suggestedProductCode: 'ESS-004',
      blendFormula: '生姜 2滴 + 杜松浆果 2滴 + 甜橙 2滴'
    }
  },
  {
    id: 'dahan',
    name: '大寒',
    pinyin: 'Dà Hán',
    enName: 'Major Cold',
    season: 'winter',
    startMonth: 1, startDay: 20, endMonth: 2, endDay: 2,
    element: '水',
    summary: '大寒岁暮，隐怀春意。宜固本迎春，积蓄生机。',
    phenology: ['一候鸡始乳', '二候征鸟厉疾', '三候水泽腹坚'],
    culture: '二十四节气之最后一个节气。大寒岁暮，除旧迎新，除夕与春节将至，冰雪之下暗涌新春萌动。',
    wellnessAdvice: [
      '大寒宜温补，适量进食红枣、桂圆、黄芪。',
      '整理环境与身心，为即将到来的立春做准备。',
      '使用带有微苦柑橘与花香的调配，预告新春萌发。'
    ],
    scentProfile: {
      title: '岁暮蓄锐 · 迎春之香',
      description: '橙花与佛手柑的明亮交响，拂去岁末疲惫，喜迎新春。',
      recommendedOils: ['橙花', '佛手柑', '乳香'],
      suggestedProductCode: 'SYN-001',
      blendFormula: '橙花 2滴 + 佛手柑 3滴 + 乳香 1滴'
    }
  }
];

// Helper to determine current solar term based on month & day
export function getCurrentSolarTerm(date: Date = new Date()): SolarTermInfo {
  const m = date.getMonth() + 1; // 1-12
  const d = date.getDate();

  for (const term of SOLAR_TERMS_DATA) {
    if (term.startMonth === term.endMonth) {
      if (m === term.startMonth && d >= term.startDay && d <= term.endDay) {
        return term;
      }
    } else if (term.startMonth < term.endMonth) {
      // e.g. Jul 23 - Aug 6
      if (
        (m === term.startMonth && d >= term.startDay) ||
        (m === term.endMonth && d <= term.endDay)
      ) {
        return term;
      }
    } else {
      // e.g. Dec 22 - Jan 5 (Cross year)
      if (
        (m === term.startMonth && d >= term.startDay) ||
        (m === term.endMonth && d <= term.endDay)
      ) {
        return term;
      }
    }
  }

  // Fallback to Great Heat or Lichun if matching fails
  return SOLAR_TERMS_DATA.find((t) => t.id === 'dashu') || SOLAR_TERMS_DATA[0];
}

export const QUIZ_MOOD_OPTIONS = [
  { id: 'calm', label: '澄澈宁静', desc: '沉淀浮躁思绪，找回内在平静与专注', icon: '🧘‍♀️' },
  { id: 'warm', label: '温暖扎根', desc: '驱散身心寒凉，滋养笃定与安全感', icon: '🪵' },
  { id: 'release', label: '舒怒解郁', desc: '疏解胸闷郁结，释放压抑的心灵负担', icon: '🌿' },
  { id: 'energy', label: '充沛活力', desc: '破除昏沉倦怠，激发敏锐与充沛干劲', icon: '☀️' },
  { id: 'sleep', label: '深层安眠', desc: '放松绷紧神经，轻松步入祥和好梦', icon: '🌙' },
];

export const QUIZ_NOTE_OPTIONS = [
  { id: 'citrus', label: '清甜柑橘', desc: '明亮欢愉 · 佛手柑 / 甜橙 / 苦橙叶', oils: ['佛手柑', '甜橙', '苦橙叶'] },
  { id: 'wood', label: '幽静木质', desc: '深沉扎根 · 大西洋雪松 / 檀香 / 岩兰草', oils: ['大西洋雪松', '檀香', '岩兰草'] },
  { id: 'floral', label: '温润花香', desc: '高雅抚慰 · 大马士革玫瑰 / 橙花 / 真正薰衣草', oils: ['大马士革玫瑰', '橙花', '真正薰衣草'] },
  { id: 'resin', label: '神圣树脂', desc: '空灵宁静 · 乳香 / 没药', oils: ['乳香', '没药'] },
  { id: 'herbal', label: '清新草本', desc: '通透醒脑 · 快乐鼠尾草 / 迷迭香 / 薄荷', oils: ['快乐鼠尾草', '迷迭香', '薄荷'] },
];

export const QUIZ_CARRIER_OPTIONS = [
  { id: 'palm', label: '掌心吸嗅冥想', desc: '滴于掌心搓热，深呼吸芳香分子', icon: '🤲' },
  { id: 'diffuser', label: '卧室 / 案头扩香', desc: '超声波扩香仪或扩香木随身伴读', icon: '💨' },
  { id: 'rollon', label: '随身滚珠精油', desc: '稀释后涂抹于手腕脉搏与太阳穴', icon: '💧' },
  { id: 'spray', label: '空间净化喷雾', desc: '喷洒于枕头、衣物或私密空间', icon: '✨' },
];

interface SolarTermsBannerProps {
  onSelectProduct?: (product: ProductItem) => void;
  onNavigateTab?: (tab: string) => void;
}

export const SolarTermsBanner: React.FC<SolarTermsBannerProps> = ({ onSelectProduct, onNavigateTab }) => {
  const currentTerm = useMemo(() => getCurrentSolarTerm(), []);
    const [catalogProducts, setCatalogProducts] = useState<ProductItem[]>([]);

  // Load real products for scent suggestions
  useEffect(() => {
    let mounted = true;
    fetchProductsFromSupabase().then((products) => {
      if (mounted) setCatalogProducts(products);
    });
    return () => { mounted = false; };
  }, []);

const [selectedTermId, setSelectedTermId] = useState<string>(currentTerm.id);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isShimmering, setIsShimmering] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeOilTooltip, setActiveOilTooltip] = useState<OilDetail | null>(null);

  // Quiz states
  const [quizStep, setQuizStep] = useState<number>(1); // 1: Mood, 2: Note, 3: Carrier, 4: Result
  const [quizMood, setQuizMood] = useState<string>('calm');
  const [quizNote, setQuizNote] = useState<string>('citrus');
  const [quizCarrier, setQuizCarrier] = useState<string>('diffuser');
  const [isQuizBlending, setIsQuizBlending] = useState<boolean>(false);

  const { isFormulaSaved, toggleSaveFormula } = useSavedFormulas();

  const activeTerm = useMemo(
    () => SOLAR_TERMS_DATA.find((t) => t.id === selectedTermId) || currentTerm,
    [selectedTermId, currentTerm]
  );

  const matchedProduct = useMemo(
    () => catalogProducts.find((p) => p.code === activeTerm.scentProfile.suggestedProductCode) || catalogProducts[0],
    [activeTerm]
  );

  // Trigger subtle shimmer animation when active solar term changes
  useEffect(() => {
    setIsShimmering(true);
    const timer = setTimeout(() => setIsShimmering(false), 800);
    return () => clearTimeout(timer);
  }, [activeTerm.id]);

  // Quiz calculations
  const currentQuizMood = useMemo(
    () => QUIZ_MOOD_OPTIONS.find((m) => m.id === quizMood) || QUIZ_MOOD_OPTIONS[0],
    [quizMood]
  );
  const currentQuizNote = useMemo(
    () => QUIZ_NOTE_OPTIONS.find((n) => n.id === quizNote) || QUIZ_NOTE_OPTIONS[0],
    [quizNote]
  );
  const currentQuizCarrier = useMemo(
    () => QUIZ_CARRIER_OPTIONS.find((c) => c.id === quizCarrier) || QUIZ_CARRIER_OPTIONS[0],
    [quizCarrier]
  );

  const quizResultFormula = useMemo(() => {
    const mainOil = currentQuizNote.oils[0];
    const subOil = currentQuizNote.oils[1] || '真正薰衣草';
    const termOil = activeTerm.scentProfile.recommendedOils[0] || '乳香';
    const components = Array.from(new Set([mainOil, subOil, termOil]));

    return {
      id: `QUIZ-${activeTerm.id}-${quizMood}-${quizNote}`,
      termId: activeTerm.id,
      termName: activeTerm.name,
      title: `${activeTerm.name}·${currentQuizMood.label}${currentQuizNote.label}当令特调`,
      blendFormula: `${mainOil} 3滴 + ${subOil} 2滴 + ${termOil} 1滴`,
      concept: `顺应【${activeTerm.name}】节气天时（五行属${activeTerm.element}），以【${currentQuizNote.label}】为主调，融入【${currentQuizMood.label}】之意境，为【${currentQuizCarrier.label}】生活场景专属定制。`,
      components,
      carrier: currentQuizCarrier.label,
      coaBatch: `SOLAR-QUIZ-${activeTerm.id.toUpperCase()}-882`,
      isSolarTerm: true,
    };
  }, [activeTerm, quizMood, quizNote, quizCarrier, currentQuizMood, currentQuizNote, currentQuizCarrier]);

  const handleStartQuizBlending = () => {
    setIsQuizBlending(true);
    setTimeout(() => {
      setIsQuizBlending(false);
      setQuizStep(4);
    }, 1200);
  };

  const seasonBadgeColors = {
    spring: 'bg-[#4A6B53]/15 text-[#2A4432] border-[#4A6B53]/30',
    summer: 'bg-[#A85852]/15 text-[#6E2A25] border-[#A85852]/30',
    autumn: 'bg-[#C58B3A]/15 text-[#704B14] border-[#C58B3A]/30',
    winter: 'bg-[#3A5B6C]/15 text-[#1B3644] border-[#3A5B6C]/30',
  };

  const seasonIcons = {
    spring: Leaf,
    summer: Sun,
    autumn: Wind,
    winter: Droplets,
  };

  const SeasonIcon = seasonIcons[activeTerm.season];

  return (
    <div className="w-full max-w-7xl mx-auto my-8 px-4">
      {/* Banner Container */}
      <div className={`bg-[#EFEDE7] rounded-3xl border ${isShimmering ? 'border-[#C58B3A]/60 shadow-md ring-2 ring-[#C58B3A]/20' : 'border-[#8C7E6A]/30 shadow-xs'} p-5 sm:p-8 relative overflow-hidden transition-all duration-500`}>
        {/* Subtle Shimmer Flash Overlay on Update */}
        <AnimatePresence>
          {isShimmering && (
            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: [0, 0.6, 0], x: '100%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#C58B3A]/20 to-transparent z-20"
            />
          )}
        </AnimatePresence>

        {/* Subtle Decorative Background Stamp */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none font-serif text-8xl font-bold text-[#1C2E20] select-none">
          {activeTerm.name}
        </div>

        {/* Top Bar Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#8C7E6A]/20 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1C2E20] text-[#E8DAC8] text-xs font-mono font-medium">
                <Compass className="w-3.5 h-3.5 text-[#C5B49A]" />
                <span>时令节气芳香指南 · Solar Scent Almanac</span>
              </span>

              {activeTerm.id === currentTerm.id && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#A85852] text-white text-[11px] font-mono animate-pulse">
                  <Flame className="w-3 h-3" />
                  <span>今日当令节气</span>
                </span>
              )}

              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${seasonBadgeColors[activeTerm.season]}`}>
                五行属{activeTerm.element} · {activeTerm.pinyin}
              </span>
            </div>

            <motion.h2 
              key={`title-${activeTerm.id}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="font-serif font-bold text-2xl sm:text-3xl text-[#1C2E20] flex items-center gap-3 pt-1"
            >
              <span>{activeTerm.name}</span>
              <span className="text-xs sm:text-sm font-mono font-normal text-[#8C7E6A] tracking-wider">
                [{activeTerm.startMonth}月{activeTerm.startDay}日 - {activeTerm.endMonth}月{activeTerm.endDay}日]
              </span>
            </motion.h2>
          </div>

          {/* Action to Toggle Detail Expansion */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4 py-2.5 rounded-2xl bg-[#1C2E20] hover:bg-[#8C7E6A] text-[#E8DAC8] hover:text-[#1C2E20] text-xs font-bold transition-all flex items-center gap-2 shadow-xs active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>{isExpanded ? '收起节气调配档案' : '展开节气文化与专属香方'}</span>
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Quick Summary Strip (Always Visible, with fade-in animation) */}
        <motion.div 
          key={`summary-${activeTerm.id}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
        >
          <div className="md:col-span-8 space-y-2">
            <p className="text-sm font-serif text-[#2D2D2A] leading-relaxed">
              <strong className="text-[#1C2E20]">当令发抒：</strong>
              {activeTerm.summary}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8C7E6A] flex-wrap">
              <span className="font-bold text-[#1C2E20]">节气物候：</span>
              {activeTerm.phenology.map((p, idx) => (
                <span key={idx} className="bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#8C7E6A]/20">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className={`md:col-span-4 bg-[#FAF8F5] p-3 rounded-2xl border ${isShimmering ? 'border-[#C58B3A]/50 ring-1 ring-[#C58B3A]/30' : 'border-[#8C7E6A]/20'} transition-all duration-300 flex items-center justify-between gap-3 relative overflow-hidden`}>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#8C7E6A] uppercase block flex items-center gap-1">
                <span>当令推荐调配香方</span>
                {isShimmering && <Sparkles className="w-3 h-3 text-[#C58B3A] animate-spin" />}
              </span>
              <h4 className="font-serif font-bold text-xs text-[#1C2E20]">{activeTerm.scentProfile.title}</h4>
              <p className="text-[11px] font-mono text-[#8C7E6A] line-clamp-1">{activeTerm.scentProfile.blendFormula}</p>
              
              {/* Interactive Oil Badges in Summary Strip */}
              <div className="flex flex-wrap gap-1 pt-1">
                {activeTerm.scentProfile.recommendedOils.map((oil, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveOilTooltip(getOilDetail(oil));
                    }}
                    className="px-1.5 py-0.5 rounded bg-[#1C2E20]/10 hover:bg-[#C58B3A]/25 text-[#1C2E20] border border-[#1C2E20]/15 hover:border-[#C58B3A] text-[9px] font-mono font-medium transition-all cursor-pointer flex items-center gap-0.5 hover:scale-105"
                    title={`点击查看 ${oil} 精油功效与心理疗愈`}
                  >
                    <span>🌿 {oil}</span>
                  </button>
                ))}
              </div>
            </div>
            {matchedProduct && onSelectProduct && (
              <button
                onClick={() => onSelectProduct(matchedProduct)}
                className="p-2 rounded-xl bg-[#1C2E20] text-[#E8DAC8] hover:bg-[#8C7E6A] hover:text-[#1C2E20] transition-colors shrink-0 shadow-xs"
                title="查看当令精选作品"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* 24 Solar Terms Quick Navigation Tabs */}
        <div className="pt-2 border-t border-[#8C7E6A]/15 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max py-1">
            <span className="text-[10px] font-mono text-[#8C7E6A] uppercase font-bold mr-1">节气快捷探索:</span>
            {SOLAR_TERMS_DATA.map((term) => {
              const isCurrent = term.id === currentTerm.id;
              const isSelected = term.id === selectedTermId;
              return (
                <button
                  key={term.id}
                  onClick={() => {
                    setSelectedTermId(term.id);
                    setIsExpanded(true); // Auto expand on click to explore
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-mono transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#1C2E20] text-[#E8DAC8] font-bold shadow-xs scale-105'
                      : isCurrent
                      ? 'bg-[#A85852]/20 text-[#A85852] border border-[#A85852]/40 font-bold'
                      : 'bg-[#FAF8F5] text-[#2D2D2A]/80 hover:bg-[#DED9D2] hover:text-[#1C2E20] border border-[#8C7E6A]/20'
                  }`}
                >
                  <span>{term.name}</span>
                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#A85852]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* EXPANDED DETAILS PANEL (Cultural, Wellness, Scent Formula) */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t-2 border-[#8C7E6A]/25 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in bg-[#FAF8F5] p-6 rounded-2xl border border-[#8C7E6A]/20">
            {/* Column 1: 节气文化与物候背景 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-[#8C7E6A]/20 pb-2">
                <div className="p-1.5 rounded-lg bg-[#1C2E20] text-[#E8DAC8]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-bold text-sm text-[#1C2E20]">节气文化典故与物候</h3>
              </div>

              <p className="text-xs text-[#2D2D2A]/90 leading-relaxed font-sans">
                {activeTerm.culture}
              </p>

              <div className="bg-[#EFEDE7] p-3 rounded-xl border border-[#8C7E6A]/20 space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#8C7E6A] uppercase block">【物候三候】解密</span>
                <ul className="text-xs text-[#1C2E20] space-y-1">
                  {activeTerm.phenology.map((p, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8C7E6A]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 2: 身体调节与芳养建议 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-[#8C7E6A]/20 pb-2">
                <div className="p-1.5 rounded-lg bg-[#A85852] text-white">
                  <Heart className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-bold text-sm text-[#1C2E20]">身心节律与身心调节</h3>
              </div>

              <ul className="space-y-2 text-xs text-[#2D2D2A]/90 leading-relaxed">
                {activeTerm.wellnessAdvice.map((advice, i) => (
                  <li key={i} className="flex items-start gap-2 bg-[#EFEDE7]/70 p-2.5 rounded-xl border border-[#8C7E6A]/15">
                    <span className="w-4 h-4 rounded-full bg-[#1C2E20]/10 text-[#1C2E20] font-mono text-[10px] flex items-center justify-center shrink-0 font-bold">
                      {i + 1}
                    </span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: 专属推荐香氛配方与精选作品 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-[#8C7E6A]/20 pb-2">
                <div className="p-1.5 rounded-lg bg-[#C58B3A] text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-bold text-sm text-[#1C2E20]">当令专属香氛配方</h3>
              </div>

              <div className="space-y-2 bg-[#EFEDE7] p-4 rounded-xl border border-[#8C7E6A]/25">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#8C7E6A] font-bold">配方名称</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#1C2E20] text-[#E8DAC8] text-[10px] font-mono">
                    UNIO Formula
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1C2E20]">{activeTerm.scentProfile.title}</h4>
                <p className="text-xs text-[#8C7E6A] leading-relaxed">{activeTerm.scentProfile.description}</p>

                <div className="pt-2 border-t border-[#8C7E6A]/20 space-y-1">
                  <span className="text-[10px] font-mono text-[#8C7E6A] block">【建议扩香/调配比例】:</span>
                  <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#8C7E6A]/20 text-xs font-mono font-bold text-[#1C2E20]">
                    {activeTerm.scentProfile.blendFormula}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5 items-center">
                  <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#8C7E6A]">
                    <span>【推荐核心单方精油】:</span>
                    <span className="text-[9px] text-[#C58B3A] font-sans font-medium flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> 点击精油卡片查看疗愈属性
                    </span>
                  </div>
                  {activeTerm.scentProfile.recommendedOils.map((oil, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveOilTooltip(getOilDetail(oil));
                      }}
                      className="px-2.5 py-1 rounded-md bg-[#1C2E20]/10 hover:bg-[#C58B3A]/25 text-[#1C2E20] border border-[#1C2E20]/20 hover:border-[#C58B3A] text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95 group shadow-2xs"
                      title={`点击查看《${oil}》的生理功效与心理疗愈属性`}
                    >
                      <span>🌿</span>
                      <span>{oil}</span>
                      <Sparkles className="w-2.5 h-2.5 text-[#C58B3A] opacity-60 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>

                {/* 收藏至香气档案 Button */}
                <div className="pt-2 border-t border-[#8C7E6A]/20">
                  <button
                    onClick={() => {
                      const isNowSaved = toggleSaveFormula({
                        termId: activeTerm.id,
                        termName: activeTerm.name,
                        title: `${activeTerm.name} · ${activeTerm.scentProfile.title}`,
                        concept: activeTerm.scentProfile.description,
                        components: activeTerm.scentProfile.recommendedOils,
                        blendFormula: activeTerm.scentProfile.blendFormula,
                        carrier: '节气养生扩香 / 掌心吸嗅',
                        coaBatch: `SOLAR-2026-${activeTerm.id.toUpperCase()}`,
                        isSolarTerm: true,
                      });
                      const msg = isNowSaved
                        ? `已将《${activeTerm.name} · ${activeTerm.scentProfile.title}》收藏至香气档案`
                        : `已从香气档案中移除该节气配方`;
                      setToastMessage(msg);
                      setTimeout(() => setToastMessage(null), 3500);
                    }}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-serif font-bold transition-all flex items-center justify-center gap-2 border shadow-2xs cursor-pointer ${
                      isFormulaSaved(activeTerm.id)
                        ? 'bg-[#1C2E20] text-[#E8DAC8] border-[#1C2E20] hover:bg-[#2A4432]'
                        : 'bg-[#FAF8F5] text-[#1C2E20] border-[#8C7E6A]/40 hover:bg-[#1C2E20] hover:text-[#E8DAC8]'
                    }`}
                  >
                    {isFormulaSaved(activeTerm.id) ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#C58B3A]" />
                        <span>已收藏至香气档案</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5 text-[#C58B3A]" />
                        <span>收藏至香气档案</span>
                      </>
                    )}
                  </button>

                  {/* Toast Notification */}
                  <AnimatePresence>
                    {toastMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-2 p-2.5 rounded-lg bg-[#1C2E20] text-[#E8DAC8] text-[11px] font-serif flex items-center justify-between gap-2 shadow-md border border-[#C58B3A]/40"
                      >
                        <span className="flex items-center gap-1.5 line-clamp-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#C58B3A] shrink-0" />
                          <span>{toastMessage}</span>
                        </span>
                        {onNavigateTab && (
                          <button
                            onClick={() => onNavigateTab('profile')}
                            className="px-2 py-0.5 rounded bg-[#C58B3A] text-[#1C2E20] text-[10px] font-bold shrink-0 hover:bg-[#d99c43] transition-colors"
                          >
                            去查看档案 →
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {matchedProduct && onSelectProduct && (
                <button
                  onClick={() => onSelectProduct(matchedProduct)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1C2E20] hover:bg-[#8C7E6A] text-[#E8DAC8] hover:text-[#1C2E20] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
                >
                  <span>查看推荐当令作品: {matchedProduct.cn} ({matchedProduct.code})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* D3.js Interactive Essential Oil & Solar Term Correlation Knowledge Graph */}
            <div className="md:col-span-3 pt-2">
              <SolarTermD3Graph
                activeTerm={activeTerm}
                onSelectOil={(oilDetail) => setActiveOilTooltip(oilDetail)}
              />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* Seasonal Scent Customizer Quiz Game (时令调香测试)        */}
        {/* ========================================================= */}
        <div className="mt-6 bg-[#0C120E] text-[#E8DAC8] border border-[#C58B3A]/40 rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
          {/* Subtle Decorative Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C58B3A]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1C2E20]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#C58B3A]/20 text-[#C58B3A] text-[10px] font-mono font-bold tracking-wider uppercase border border-[#C58B3A]/40 flex items-center gap-1">
                    <Wand2 className="w-3 h-3 text-[#C58B3A]" />
                    <span>UNIO 互动节气调香测试</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#b4aca2]">
                    当令节气: <strong className="text-[#E8DAC8]">{activeTerm.name}</strong> ({activeTerm.element}行)
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#E8DAC8] flex items-center gap-2">
                  <span>【{activeTerm.name}】感官调香测算实验室</span>
                </h3>
                <p className="text-xs text-[#b4aca2] font-sans mt-0.5">
                  融合【{activeTerm.name}】天时气场与您的感官直觉，智能生成契合此时此刻身心节律的私人专属香方
                </p>
              </div>

              {quizStep > 1 && quizStep < 4 && (
                <button
                  onClick={() => setQuizStep(1)}
                  className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#b4aca2] hover:text-white border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>重置选择</span>
                </button>
              )}
            </div>

            {/* Quiz Steps Progress Bar */}
            {quizStep < 4 && (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-mono text-[#b4aca2]">
                  <span>测算进度: Step {quizStep} / 3</span>
                  <span>
                    {quizStep === 1 && '第一步: 心境灵感'}
                    {quizStep === 2 && '第二步: 偏好香调'}
                    {quizStep === 3 && '第三步: 调理场景'}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#C58B3A] to-[#d99c43] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${(quizStep / 3) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* STEP 1: Desired Mood */}
            {quizStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h4 className="text-sm font-serif font-bold text-[#C58B3A] flex items-center gap-2">
                  <span>1. 此时此刻，您最渴望身心获得哪种感受？</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
                  {QUIZ_MOOD_OPTIONS.map((mood) => {
                    const isSelected = quizMood === mood.id;
                    return (
                      <button
                        key={mood.id}
                        onClick={() => setQuizMood(mood.id)}
                        className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-2 relative overflow-hidden ${
                          isSelected 
                            ? 'bg-[#C58B3A]/20 border-[#C58B3A] shadow-lg ring-1 ring-[#C58B3A]/50' 
                            : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-2xl">{mood.icon}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#C58B3A]" />}
                        </div>
                        <div>
                          <div className="font-serif font-bold text-sm text-[#E8DAC8]">{mood.label}</div>
                          <div className="text-[10px] text-[#b4aca2] mt-1 line-clamp-2 leading-relaxed">{mood.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setQuizStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-[#C58B3A] text-[#0C120E] font-serif font-bold text-xs hover:bg-[#d99c43] transition-all flex items-center gap-2 shadow-md cursor-pointer active:scale-95"
                  >
                    <span>下一步: 选择主导香调</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Note Preference */}
            {quizStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h4 className="text-sm font-serif font-bold text-[#C58B3A] flex items-center gap-2">
                  <span>2. 您偏好的主导香气与嗅觉质感？</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
                  {QUIZ_NOTE_OPTIONS.map((note) => {
                    const isSelected = quizNote === note.id;
                    return (
                      <button
                        key={note.id}
                        onClick={() => setQuizNote(note.id)}
                        className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-2 relative overflow-hidden ${
                          isSelected 
                            ? 'bg-[#C58B3A]/20 border-[#C58B3A] shadow-lg ring-1 ring-[#C58B3A]/50' 
                            : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-mono text-[#C58B3A]">🌿 核心调</span>
                          {isSelected && <Check className="w-4 h-4 text-[#C58B3A]" />}
                        </div>
                        <div>
                          <div className="font-serif font-bold text-sm text-[#E8DAC8]">{note.label}</div>
                          <div className="text-[10px] text-[#b4aca2] mt-1 line-clamp-2 leading-relaxed">{note.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setQuizStep(1)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#b4aca2] border border-white/10 transition-colors cursor-pointer"
                  >
                    ← 上一步
                  </button>
                  <button
                    onClick={() => setQuizStep(3)}
                    className="px-5 py-2.5 rounded-xl bg-[#C58B3A] text-[#0C120E] font-serif font-bold text-xs hover:bg-[#d99c43] transition-all flex items-center gap-2 shadow-md cursor-pointer active:scale-95"
                  >
                    <span>下一步: 用香调理场景</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Usage Carrier */}
            {quizStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h4 className="text-sm font-serif font-bold text-[#C58B3A] flex items-center gap-2">
                  <span>3. 您计划如何在生活中体验这款香气？</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                  {QUIZ_CARRIER_OPTIONS.map((carrier) => {
                    const isSelected = quizCarrier === carrier.id;
                    return (
                      <button
                        key={carrier.id}
                        onClick={() => setQuizCarrier(carrier.id)}
                        className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-2 relative overflow-hidden ${
                          isSelected 
                            ? 'bg-[#C58B3A]/20 border-[#C58B3A] shadow-lg ring-1 ring-[#C58B3A]/50' 
                            : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-2xl">{carrier.icon}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#C58B3A]" />}
                        </div>
                        <div>
                          <div className="font-serif font-bold text-sm text-[#E8DAC8]">{carrier.label}</div>
                          <div className="text-[10px] text-[#b4aca2] mt-1 line-clamp-2 leading-relaxed">{carrier.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setQuizStep(2)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#b4aca2] border border-white/10 transition-colors cursor-pointer"
                  >
                    ← 上一步
                  </button>
                  <button
                    onClick={handleStartQuizBlending}
                    disabled={isQuizBlending}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C58B3A] to-[#d99c43] text-[#0C120E] font-serif font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-lg cursor-pointer active:scale-95"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>生成【{activeTerm.name}】专属定制香方</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Blending Animation State */}
            {isQuizBlending && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="py-12 flex flex-col items-center justify-center space-y-4 text-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-[#C58B3A]/30 border-t-[#C58B3A] animate-spin flex items-center justify-center" />
                  <Sparkles className="w-6 h-6 text-[#C58B3A] absolute inset-0 m-auto animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-base text-[#E8DAC8]">
                    正在契合【{activeTerm.name}】节气天时与【{activeTerm.element}】行气场...
                  </h4>
                  <p className="text-xs text-[#b4aca2] font-mono">
                    测算精油滴定比例中...
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Generated Result Card */}
            {quizStep === 4 && !isQuizBlending && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                {/* Result Banner */}
                <div className="bg-white/5 border border-[#C58B3A]/50 rounded-2xl p-4 sm:p-5 relative overflow-hidden space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#C58B3A]/20 text-[#C58B3A] text-[10px] font-mono font-bold">
                          {quizResultFormula.coaBatch}
                        </span>
                        <span className="text-[10px] font-mono text-[#b4aca2]">
                          载体: {quizResultFormula.carrier}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-lg sm:text-xl text-[#C58B3A] mt-1">
                        {quizResultFormula.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuizStep(1)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#b4aca2] hover:text-white border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>重新测算</span>
                      </button>
                    </div>
                  </div>

                  {/* Formula Recipe & Interactive Badges */}
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-[#b4aca2] flex items-center gap-1">
                      <span>【推荐测算调配比例】:</span>
                      <span className="text-[#C58B3A] text-[10px]">(点击下方精油卡片查看功效与心理疗愈)</span>
                    </div>
                    <div className="bg-[#0C120E] p-3 rounded-xl border border-white/10 flex flex-wrap items-center gap-2">
                      <span className="font-serif font-bold text-sm text-[#E8DAC8] mr-2">
                        💧 {quizResultFormula.blendFormula}
                      </span>
                      {quizResultFormula.components.map((oil, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveOilTooltip(getOilDetail(oil));
                          }}
                          className="px-2.5 py-1 rounded-md bg-[#C58B3A]/15 hover:bg-[#C58B3A]/30 text-[#E8DAC8] border border-[#C58B3A]/40 text-xs font-mono font-medium transition-all flex items-center gap-1 cursor-pointer hover:scale-105"
                          title={`点击查看 ${oil} 精油功效与心理疗愈`}
                        >
                          <span>🌿 {oil}</span>
                          <Sparkles className="w-3 h-3 text-[#C58B3A]" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rationale Concept */}
                  <div className="bg-white/5 p-3.5 rounded-xl text-xs text-[#E8DAC8]/90 font-sans leading-relaxed border border-white/5">
                    <span className="font-serif font-bold text-[#C58B3A] block mb-1">【当令调香理念】</span>
                    {quizResultFormula.concept}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      onClick={() => {
                        toggleSaveFormula({
                          id: quizResultFormula.id,
                          termId: quizResultFormula.termId,
                          termName: quizResultFormula.termName,
                          title: quizResultFormula.title,
                          blendFormula: quizResultFormula.blendFormula,
                          concept: quizResultFormula.concept,
                          components: quizResultFormula.components,
                          carrier: quizResultFormula.carrier,
                          coaBatch: quizResultFormula.coaBatch,
                          isSolarTerm: true,
                        });
                        setToastMessage(`已将《${quizResultFormula.title}》保存至个人香气档案`);
                        setTimeout(() => setToastMessage(null), 3500);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#E8DAC8] border border-white/20 text-xs font-serif font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      {isFormulaSaved(quizResultFormula.id) ? (
                        <>
                          <Check className="w-4 h-4 text-[#C58B3A]" />
                          <span>已收藏至香气档案</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-4 h-4 text-[#C58B3A]" />
                          <span>收藏定制香方至档案</span>
                        </>
                      )}
                    </button>

                    {onNavigateTab && (
                      <button
                        onClick={() => onNavigateTab('ai-consult')}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#C58B3A] hover:bg-[#d99c43] text-[#0C120E] text-xs font-serif font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>预约按此香方配比高级私人定制作品 →</span>
                      </button>
                    )}
                  </div>

                  {/* Toast Notification */}
                  <AnimatePresence>
                    {toastMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="p-2.5 rounded-lg bg-[#1C2E20] text-[#E8DAC8] text-[11px] font-serif flex items-center justify-between gap-2 shadow-md border border-[#C58B3A]/40"
                      >
                        <span className="flex items-center gap-1.5 line-clamp-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#C58B3A] shrink-0" />
                          <span>{toastMessage}</span>
                        </span>
                        {onNavigateTab && (
                          <button
                            onClick={() => onNavigateTab('profile')}
                            className="px-2.5 py-1 rounded bg-[#C58B3A] text-[#1C2E20] text-[10px] font-bold shrink-0 hover:bg-[#d99c43] transition-colors"
                          >
                            去查看档案 →
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Lightweight Interactive Essential Oil Tooltip Modal */}
      <AnimatePresence>
        {activeOilTooltip && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
            onClick={() => setActiveOilTooltip(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0C120E] text-[#E8DAC8] border border-[#C58B3A]/60 rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl space-y-4 relative overflow-hidden"
            >
              {/* Decorative Ambient Gold Radial Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C58B3A]/15 rounded-full blur-2xl pointer-events-none" />

              {/* Modal Header */}
              <div className="flex justify-between items-start gap-3 border-b border-white/15 pb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono text-[#C58B3A] uppercase tracking-wider font-bold bg-[#C58B3A]/15 px-2 py-0.5 rounded-md border border-[#C58B3A]/30">
                      {activeOilTooltip.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-[#b4aca2] border border-white/10">
                      五行属{activeOilTooltip.element}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#E8DAC8] mt-1.5 flex items-center gap-2">
                    <span>🌿 {activeOilTooltip.name}</span>
                  </h3>
                  <p className="text-[11px] font-mono text-[#b4aca2] italic mt-0.5">{activeOilTooltip.latinName}</p>
                </div>
                <button
                  onClick={() => setActiveOilTooltip(null)}
                  className="p-1.5 rounded-full text-[#b4aca2] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="关闭"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body Section 1: 生理与肌肤功效 */}
              <div className="space-y-1.5 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#C58B3A]">
                  <Droplets className="w-4 h-4" />
                  <span>生理与肌肤功效</span>
                </div>
                <p className="text-xs text-[#E8DAC8]/90 leading-relaxed font-sans">
                  {activeOilTooltip.benefits}
                </p>
              </div>

              {/* Body Section 2: 心理与情绪疗愈 */}
              <div className="space-y-1.5 bg-[#C58B3A]/10 p-3.5 rounded-2xl border border-[#C58B3A]/30">
                <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#C58B3A]">
                  <Heart className="w-4 h-4" />
                  <span>心理与情绪疗愈属性</span>
                </div>
                <p className="text-xs text-[#E8DAC8]/95 leading-relaxed font-sans">
                  {activeOilTooltip.emotionalBenefits}
                </p>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-between items-center pt-2 border-t border-white/10 text-[11px]">
                <span className="text-[#b4aca2] font-mono text-[10px] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#C58B3A]" />
                  <span>UNIO 节气芳养精油档案</span>
                </span>
                <button
                  onClick={() => setActiveOilTooltip(null)}
                  className="px-4 py-1.5 rounded-xl bg-[#C58B3A] text-[#0C120E] font-serif font-bold hover:bg-[#d99c43] transition-colors shadow-xs cursor-pointer"
                >
                  确定
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
