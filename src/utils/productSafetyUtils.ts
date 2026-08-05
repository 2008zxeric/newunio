import { ProductItem } from '../types';

export interface ProductTypeSafetyAdvisory {
  typeKey: 'single' | 'compound' | 'hydrosol' | 'object';
  typeName: string;
  badgeText: string;
  title: string;
  guideHeadline: string;
  statement: string;
  highlights: string[];
  themeColorClass: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    badgeBg: string;
    badgeText: string;
    iconColor: string;
  };
}

export function getProductTypeSafetyNotice(product: ProductItem): ProductTypeSafetyAdvisory {
  const code = (product.code || '').toUpperCase();
  const subgroup = product.subgroup || '';
  const series = product.series || '';
  const cn = product.cn || '';

  // 1. 香器 / 空间器物 (Jing Series or subgroup/cn indicating objects)
  if (
    series === 'jing' || 
    code.startsWith('J-') || 
    subgroup === '香境' || 
    subgroup === '禅思' ||
    /器|炉|香薰机|线香|扩香|喷雾|瓶|Vase|Burner|Diffuser/i.test(cn)
  ) {
    return {
      typeKey: 'object',
      typeName: '空间香氛器物',
      badgeText: '扩香与高温安全规范',
      title: '【香气器物 · 空间扩香与高温安全操作规范】',
      guideHeadline: '熏香扩香与高温器物操作，请保持室内空气流通并防范高温烫伤。',
      statement: '使用高温熏香炉、线香、沉香或无火扩香器物时，请置于平稳耐热台面并保持室内良好空气流通；点燃后切勿离开视野，确保远离窗帘、纸张等易燃物品，并放置于儿童与宠物无法触及的防跌落位置；呼吸道高敏感人群建议控制单次熏香时长在 30~45 分钟以内。',
      highlights: [
        '保持室内良好空气流通',
        '远离窗帘等易燃物品',
        '放置于孩童与宠物接触不到处'
      ],
      themeColorClass: {
        bg: 'bg-[#25182C]/90',
        border: 'border-[#9B59B6]/50',
        text: 'text-[#F3EAF8]',
        accent: 'text-[#C39BD3]',
        badgeBg: 'bg-[#9B59B6]/20',
        badgeText: 'text-[#D7BDE2]',
        iconColor: 'text-[#9B59B6]'
      }
    };
  }

  // 2. 有机纯露 (Sheng Series or hydrosol)
  if (
    series === 'sheng' || 
    code.startsWith('S-') || 
    subgroup === '清净' || 
    subgroup === '润养' || 
    subgroup === '舒缓' ||
    cn.includes('纯露') || 
    cn.includes('花水') || 
    cn.includes('Water')
  ) {
    return {
      typeKey: 'hydrosol',
      typeName: '1:1 头道蒸馏纯露',
      badgeText: '头道保存与湿敷测试',
      title: '【蒸馏纯露 · 头道高活性保存与湿敷测试须知】',
      guideHeadline: '1:1 饱和头道蒸馏水相，零添加防腐剂，开封后建议 5~15℃ 冷藏保存。',
      statement: '本品为 1:1 饱和植物头道蒸馏天然水相纯露，零添加人工合成香精、防腐剂与酒精成分。因含丰富活性植萃胶体，开封后建议置于 5~15℃ 阴凉避光处或冰箱冷藏保存，并在 6 个月内使用完毕。敏弱肌人群首次进行全脸水膜湿敷前，请先于耳后或下颌角处进行 15 分钟局部湿敷测试。',
      highlights: [
        '零添加防腐剂与酒精',
        '建议 5~15℃ 冷藏保存',
        '湿敷前先作耳后敏弱测试'
      ],
      themeColorClass: {
        bg: 'bg-[#102830]/90',
        border: 'border-[#3A7CA5]/50',
        text: 'text-[#E2F5F8]',
        accent: 'text-[#73C6B6]',
        badgeBg: 'bg-[#3A7CA5]/20',
        badgeText: 'text-[#A3E4D7]',
        iconColor: 'text-[#3A7CA5]'
      }
    };
  }

  // 3. 复方精油 (He Series or isCompound)
  if (
    series === 'he' || 
    code.startsWith('H-') || 
    product.isCompound || 
    (product.blendFormula && product.blendFormula.length > 0) ||
    subgroup === '身体' || 
    subgroup === '心智' || 
    subgroup === '空间' ||
    cn.includes('复方') || 
    cn.includes('Synergy')
  ) {
    return {
      typeKey: 'compound',
      typeName: '协同复方精油',
      badgeText: '通用配方参考声明',
      title: '【复方精油 · 通用配方参考与个体差异声明】',
      guideHeadline: '多种高活性精油相阶协同复配，配方应用因个体体质与季候不同而异。',
      statement: '本复方由多种高活性纯植物精油按特定相阶协同复配而成，产品效能因个人体质、季候环境及应用场景不同而有所差异。所呈现之配方构成、协同比例及应用场景仅作为通用芳疗参考，不作为医疗诊断或治愈依据。使用前请做手臂内侧 24 小时贴肤过敏测试；如正在使用医师处方药物，建议咨询专业医生或芳疗师。',
      highlights: [
        '通用配方参考与应用指导',
        '协同效果存在个体体质差异',
        '敏弱肌请先进行24小时皮试'
      ],
      themeColorClass: {
        bg: 'bg-[#2A241E]/90',
        border: 'border-[#B08968]/50',
        text: 'text-[#F5EFEA]',
        accent: 'text-[#E5C3A6]',
        badgeBg: 'bg-[#B08968]/20',
        badgeText: 'text-[#E5C3A6]',
        iconColor: 'text-[#B08968]'
      }
    };
  }

  // 4. 单方精油 (Yuan Series or Default Single Essential Oil)
  return {
    typeKey: 'single',
    typeName: '单方纯精油',
    badgeText: '芳疗师指导提醒',
    title: '【单方精油 · 芳疗师稀释指导与安全提醒】',
    guideHeadline: '100% 纯天然植物单方萃取原油，须在专业芳疗师评估指导下稀释使用。',
    statement: '本品为 100% 纯天然未经稀释高活性植物单方精油，高浓度活性成分禁止未经稀释直接大面积接触皮肤或口服。须遵循专业国际认证芳疗师（IFA / NAHA）指导，配合高品质植物基础油按安全比例（面部 0.5%~1.0%，身体 1.0%~3.0%）调配后使用。孕妇、婴幼儿、癫痫及高血压人群，须获医生或资深芳疗师临床评估确认后使用。',
    highlights: [
      '须在专业芳疗师指导下稀释',
      '严禁未稀释直接涂抹或口服',
      '建议作24小时手臂内侧皮试'
    ],
    themeColorClass: {
      bg: 'bg-[#2E2013]/90',
      border: 'border-[#D97706]/50',
      text: 'text-[#FCEBD5]',
      accent: 'text-[#F59E0B]',
      badgeBg: 'bg-[#D97706]/20',
      badgeText: 'text-[#F59E0B]',
      iconColor: 'text-[#F59E0B]'
    }
  };
}
