import { match } from 'pinyin-pro';

/**
 * Multi-dimensional match helper:
 * 1. Standard text substring match (case-insensitive)
 * 2. Pinyin match (pinyin-pro match) supporting full pinyin (e.g. "ning", "ningmeng"),
 *    pinyin prefixes (e.g. "n", "ni"), and pinyin initials (e.g. "nm" for "柠檬", "rx" for "乳香").
 */
export function matchPinyinOrText(targetText: string | undefined | null, query: string): boolean {
  if (!targetText || !query) return false;
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return false;

  const cleanTarget = targetText.toLowerCase();

  // 1. Direct substring match
  if (cleanTarget.includes(cleanQuery)) {
    return true;
  }

  // 2. Pinyin match using pinyin-pro
  try {
    const result = match(targetText, cleanQuery, { precision: 'start' });
    if (result && result.length > 0) {
      return true;
    }
  } catch (e) {
    // Fallback on unexpected regex parse
  }

  return false;
}

export interface SearchableProduct {
  no?: number;
  cn: string;
  en?: string;
  code?: string;
  origin?: string;
  subgroup?: string;
  coaNumber?: string;
  latinName?: string;
  botanicalFamily?: string;
  description?: string;
  series?: string;
}

/**
 * 精确档案编号筛选 + 全局多维搜索
 * 逻辑：意图识别（纯数字/显式编号修饰符）→ product.no 严格等值 → 熔断 → 全字段模糊匹配
 */
export function matchProductWithPinyin(product: SearchableProduct, query: string): boolean {
  if (!query || !query.trim()) return true;
  const raw = query.trim();
  const q = raw.toLowerCase();

  // 1. 意图识别与数字净化
  // 清理前缀（#、NO.、档案编号、第）与后缀（号）
  const digitsOnly = raw
    .replace(/^(#|no\.?|档案编号?|档案|第)/i, '')
    .replace(/号$/, '')
    .trim();

  // 是否包含显式编号修饰符（如 #12, 档案编号12, 12号）
  const isExplicitArchiveSearch = /^(#|no\.?|档案编号?|档案|第)/i.test(raw) || /号$/.test(raw);

  // 是否为纯数字查询（如 "12"、"012"）
  const isPureDigits = /^\d+$/.test(digitsOnly);

  // 2. 档案编号严格等值匹配
  if (product.no !== undefined && product.no !== null && (isPureDigits || isExplicitArchiveSearch)) {
    const noNum = product.no;
    const noStr = String(noNum);                 // "12"
    const noPadded2 = noStr.padStart(2, '0');    // "12"
    const noPadded3 = noStr.padStart(3, '0');    // "012"

    if (isPureDigits) {
      const queryNum = parseInt(digitsOnly, 10);
      // 严格判断数值相等或字符串精准匹配
      if (
        noNum === queryNum ||
        noStr === digitsOnly ||
        noPadded2 === digitsOnly ||
        noPadded3 === digitsOnly
      ) {
        return true; // 精确匹配到档案编号为 12 的产品
      }
    } else {
      // 显式编号搜索（#12 / 档案编号12 / 12号）同样严格等值
      const qq = digitsOnly.replace(/^0+/, '');
      if (
        noStr === qq ||
        noPadded2 === digitsOnly ||
        noPadded3 === digitsOnly
      ) {
        return true;
      }
    }
  }

  // 3. 数字意图熔断拦截（解决 12x 与代码误匹配的核心）
  // 如果用户输入的是纯数字（12）或显式档案搜索（#12），但该产品的 no 不等于 12，直接返回 false
  if (isExplicitArchiveSearch || isPureDigits) {
    return false; // 拦截 120、121 以及分类代码 H-B-012
  }

  // 4. 分类代码与多维文本搜索（非纯数字输入）
  return (
    matchPinyinOrText(product.cn, q) ||
    (product.en && product.en.toLowerCase().includes(q)) ||
    (product.code && product.code.toLowerCase().includes(q)) ||
    (product.origin && (product.origin.toLowerCase().includes(q) || matchPinyinOrText(product.origin, q))) ||
    (product.subgroup && (product.subgroup.toLowerCase().includes(q) || matchPinyinOrText(product.subgroup, q))) ||
    (product.coaNumber && product.coaNumber.toLowerCase().includes(q)) ||
    (product.latinName && product.latinName.toLowerCase().includes(q)) ||
    (product.botanicalFamily && (product.botanicalFamily.toLowerCase().includes(q) || matchPinyinOrText(product.botanicalFamily, q))) ||
    (product.description && (product.description.toLowerCase().includes(q) || matchPinyinOrText(product.description, q)))
  );
}

/**
 * 权重评分排序：确保精准匹配项置顶
 * 档案编号精确匹配 1000 / 分类代码完全匹配 900 / 中文名称完全匹配 850 / 普通文本模糊 100-400
 */
export function getSearchRelevanceScore(product: SearchableProduct, query: string): number {
  if (!query || !query.trim()) return 0;
  const raw = query.trim();
  const q = raw.toLowerCase();

  const digitsOnly = raw
    .replace(/^(#|no\.?|档案编号?|档案|第)/i, '')
    .replace(/号$/, '')
    .trim();
  const isExplicitArchiveSearch = /^(#|no\.?|档案编号?|档案|第)/i.test(raw) || /号$/.test(raw);
  const isPureDigits = /^\d+$/.test(digitsOnly);

  // 档案编号精确匹配：1000
  if (product.no !== undefined && product.no !== null && (isPureDigits || isExplicitArchiveSearch)) {
    const noStr = String(product.no);
    const noPadded3 = noStr.padStart(3, '0');
    if (noStr === digitsOnly || noPadded3 === digitsOnly || (isPureDigits && product.no === parseInt(digitsOnly, 10))) {
      return 1000;
    }
  }

  // 分类代码完全匹配（H-B-012）：900
  if (product.code && product.code.toLowerCase() === q) {
    return 900;
  }

  // 中文名称完全匹配：850
  if (product.cn && product.cn.toLowerCase() === q) {
    return 850;
  }

  // 普通文本模糊匹配：100 - 400（按字段权重）
  let score = 0;
  if (product.code && product.code.toLowerCase().includes(q)) score = Math.max(score, 400);
  if (product.cn && matchPinyinOrText(product.cn, q)) score = Math.max(score, 350);
  if (product.en && product.en.toLowerCase().includes(q)) score = Math.max(score, 300);
  if (product.origin && (product.origin.toLowerCase().includes(q) || matchPinyinOrText(product.origin, q))) score = Math.max(score, 250);
  if (product.subgroup && (product.subgroup.toLowerCase().includes(q) || matchPinyinOrText(product.subgroup, q))) score = Math.max(score, 200);
  if (product.coaNumber && product.coaNumber.toLowerCase().includes(q)) score = Math.max(score, 180);
  if (product.latinName && product.latinName.toLowerCase().includes(q)) score = Math.max(score, 160);
  if (product.botanicalFamily && (product.botanicalFamily.toLowerCase().includes(q) || matchPinyinOrText(product.botanicalFamily, q))) score = Math.max(score, 140);
  if (product.description && (product.description.toLowerCase().includes(q) || matchPinyinOrText(product.description, q))) score = Math.max(score, 100);

  return score;
}
