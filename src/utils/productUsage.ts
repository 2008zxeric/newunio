import { ProductItem } from '../types';

/**
 * 产品用途智能对应系统（芳疗专业知识库映射）
 * 根据品名、系列与分组自动判定核心用途，供列表卡片/首页推荐/全局搜索/收藏中心统一使用
 */
export interface ProductUsageInfo {
  typeLabel: string;     // 例如 "单方精油", "复方精油", "植物纯露", "香道器物"
  categoryTag: string;   // 例如 "安神助眠", "缓解肌痛", "抗敏补水"
  usages: string[];      // 例如 ["镇静安神", "深度助眠", "修护退红"]
  mainSummary: string;   // 例如 "主要用途：镇静安神 · 深度助眠"
}

const build = (typeLabel: string, categoryTag: string, usages: string[]): ProductUsageInfo => ({
  typeLabel,
  categoryTag,
  usages,
  mainSummary: `主要用途：${usages.join(' · ')}`,
});

/** 单方精油（元系列）用途规则 */
const SINGLE_USAGE_RULES: Array<{ kw: string[]; tag: string; usages: string[] }> = [
  { kw: ['茶树', '茶村'], tag: '杀菌祛痘', usages: ['杀菌祛痘', '控油净化', '提升防御'] },
  { kw: ['薰衣草', '真正薰衣草'], tag: '镇静安神', usages: ['镇静安神', '深度助眠', '烫伤修护'] },
  { kw: ['橙花'], tag: '安神美白', usages: ['安神抗焦虑', '提亮褪黑', '细致毛孔'] },
  { kw: ['薄荷'], tag: '冰爽止痛', usages: ['冰爽止痛', '提神醒脑', '缓解头痛'] },
  { kw: ['生姜', '姜'], tag: '驱寒暖身', usages: ['驱寒暖身', '促进循环', '缓解关节痛'] },
  { kw: ['肉桂'], tag: '驱寒暖身', usages: ['驱寒暖身', '暖胃助运', '提振阳气'] },
  { kw: ['洋甘菊', '罗马洋甘菊'], tag: '舒缓敏感', usages: ['舒缓敏感', '安抚情绪', '退红修护'] },
  { kw: ['玫瑰'], tag: '滋养润泽', usages: ['滋养润泽', '焕亮肤色', '安抚情绪'] },
  { kw: ['乳香'], tag: '安神冥想', usages: ['安神冥想', '深沉放松', '岁月修护'] },
  { kw: ['檀香'], tag: '静心安神', usages: ['静心安神', '助眠入定', '空间净化'] },
  { kw: ['依兰'], tag: '平衡情绪', usages: ['平衡情绪', '放松身心', '夜间安抚'] },
  { kw: ['佛手柑', '佛手'], tag: '舒压解郁', usages: ['舒压解郁', '提振情绪', '清新氛围'] },
  { kw: ['柠檬'], tag: '清新醒神', usages: ['清新醒神', '净化空气', '提振专注'] },
  { kw: ['尤加利', '桉'], tag: '呼吸畅通', usages: ['呼吸畅通', '净化呼吸道', '提神醒脑'] },
  { kw: ['迷迭香'], tag: '健脑提神', usages: ['健脑提神', '强韧发丝', '提振专注'] },
  { kw: ['雪松'], tag: '沉静放松', usages: ['沉静放松', '大地安神', '夜间助眠'] },
  { kw: ['甜橙', '橙'], tag: '温暖愉悦', usages: ['温暖愉悦', '点亮心情', '清新环境'] },
  { kw: ['天竺葵'], tag: '平衡身心', usages: ['平衡身心', '安抚情绪', '焕活肌肤'] },
  { kw: ['茉莉'], tag: '愉悦自信', usages: ['愉悦自信', '柔润肌肤', '浪漫氛围'] },
  { kw: ['广藿香'], tag: '大地安定', usages: ['大地安定', '定神安眠', '镇静舒缓'] },
  { kw: ['荷荷巴', '葡萄籽', '甜杏仁', '椰子', '玫瑰果', '月见草', '山茶', '橄榄', '沙棘', '芝麻'], tag: '基础滋养', usages: ['稀释复配', '滋润保湿', '护肤基底'] },
];

/** 复方精油（合系列）用途规则 */
const BLEND_USAGE_RULES: Array<{ kw: string[]; tag: string; usages: string[] }> = [
  { kw: ['肩颈', '肌痛', '酸痛', '颈椎', '肌肉'], tag: '缓解肌痛', usages: ['缓解肌痛', '舒筋活血', '松弛痉挛'] },
  { kw: ['暖宫', '月经', '经期', '痛经', '经前'], tag: '月经暖宫', usages: ['缓解月经疼', '暖宫驱寒', '理气活血'] },
  { kw: ['睡眠', '深眠', '失眠', '安眠', '助眠', '好梦'], tag: '深度助眠', usages: ['深度助眠', '镇静安神', '平息焦虑'] },
  { kw: ['专注', '脑力', '提神', '醒脑', '效率', '清明'], tag: '提神醒脑', usages: ['提神醒脑', '提升专注', '消除疲惫'] },
  { kw: ['紧致', '纤体', '塑形', '排水', '消肿', '曲线'], tag: '皮肤紧致', usages: ['皮肤紧致', '消除水肿', '促进循环'] },
  { kw: ['呼吸', '清咽', '喉咙', '鼻', '通畅', '咽喉'], tag: '呼吸清润', usages: ['呼吸清润', '舒缓咽喉', '畅通呼吸'] },
  { kw: ['消化', '肠胃', '胃', '腹胀', '积食'], tag: '健脾和胃', usages: ['健脾和胃', '舒缓腹胀', '助运消化'] },
  { kw: ['减压', '焦虑', '放松', '舒缓', '解压', '静心'], tag: '舒压静心', usages: ['舒缓压力', '平复焦虑', '深度放松'] },
  { kw: ['驱蚊', '防蚊', '虫'], tag: '天然驱蚊', usages: ['天然驱蚊', '舒缓叮咬', '清新空间'] },
  { kw: ['免疫力', '免疫', '防御', '元气', '活力', '焕发'], tag: '提升防御', usages: ['提升防御', '焕发活力', '强健体魄'] },
  { kw: ['情绪', '抑郁', '低落', '闷'], tag: '愉悦情绪', usages: ['愉悦心情', '疏解郁结', '温暖心境'] },
  { kw: ['头痛', '偏头痛', '头风'], tag: '舒缓头痛', usages: ['舒缓头痛', '放松神经', '清神醒脑'] },
];

/** 植物纯露（生系列）用途规则 */
const HYDROSOL_USAGE_RULES: Array<{ kw: string[]; tag: string; usages: string[] }> = [
  { kw: ['玫瑰'], tag: '补水提亮', usages: ['补水湿敷', '润泽提亮', '替代爽肤水'] },
  { kw: ['洋甘菊', '甘菊'], tag: '抗敏退红', usages: ['抗敏退红', '敏感肌湿敷', '急救止痒'] },
  { kw: ['薰衣草'], tag: '控油修护', usages: ['水油平衡', '控油祛痘', '晒后镇静'] },
  { kw: ['茶树'], tag: '净化祛痘', usages: ['净化毛孔', '祛痘控油', '清爽收敛'] },
  { kw: ['橙花', '橙'], tag: '焕亮安神', usages: ['提亮肤色', '细致毛孔', '安抚情绪'] },
  { kw: ['薄荷'], tag: '清凉醒肤', usages: ['清凉醒肤', '舒缓倦容', '夏季喷雾'] },
  { kw: ['乳香'], tag: '紧致修护', usages: ['紧致肌肤', '修护弹力', '岁月滋养'] },
  { kw: ['茉莉'], tag: '柔润香氛', usages: ['柔润肌肤', '雅致香氛', '补水喷雾'] },
  { kw: ['马鞭草', '柠檬草', '香茅'], tag: '清爽净化', usages: ['清爽净化', '收敛毛孔', '夏日醒肤'] },
];

/** 香道器物（香系列）用途 */
const JING_USAGE: ProductUsageInfo = build('香道器物', '禅修安神', ['空间香氛', '禅修安神', '静心养气']);

/**
 * 核心用途解析引擎：根据品名/系列/分组自动判定用途
 */
export function getPrimaryUsage(product: ProductItem): ProductUsageInfo {
  const cn = product.cn || '';
  const series = product.series;

  // 香道器物（香系列）
  if (series === 'jing') {
    return JING_USAGE;
  }

  // 植物纯露（生系列 / 名称含纯露）
  if (series === 'sheng' || cn.includes('纯露')) {
    const rule = HYDROSOL_USAGE_RULES.find((r) => r.kw.some((k) => cn.includes(k)));
    if (rule) return build('植物纯露', rule.tag, rule.usages);
    return build('植物纯露', '补水湿敷', ['补水湿敷', '柔润肌肤', '日常喷雾']);
  }

  // 复方精油（合系列 / isCompound）
  if (series === 'he' || product.isCompound) {
    const rule = BLEND_USAGE_RULES.find((r) => r.kw.some((k) => cn.includes(k)));
    if (rule) return build('复方精油', rule.tag, rule.usages);
    return build('复方精油', '协同调理', ['多效协同', '身心调理', '按需使用']);
  }

  // 单方精油（元系列 / 基础油）
  const rule = SINGLE_USAGE_RULES.find((r) => r.kw.some((k) => cn.includes(k)));
  if (rule) return build('单方精油', rule.tag, rule.usages);

  // 兜底
  return build('单方精油', '芳疗经典', ['芳疗经典', '日常香护', '按需调配']);
}
