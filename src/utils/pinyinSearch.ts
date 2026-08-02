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

export function matchProductWithPinyin(product: {
  cn: string;
  en: string;
  code: string;
  origin: string;
  subgroup?: string;
  coaNumber?: string;
  series?: string;
}, query: string): boolean {
  if (!query || !query.trim()) return true;
  const q = query.trim().toLowerCase();

  return (
    matchPinyinOrText(product.cn, q) ||
    (product.en && product.en.toLowerCase().includes(q)) ||
    (product.code && product.code.toLowerCase().includes(q)) ||
    (product.origin && (product.origin.toLowerCase().includes(q) || matchPinyinOrText(product.origin, q))) ||
    (product.subgroup && (product.subgroup.toLowerCase().includes(q) || matchPinyinOrText(product.subgroup, q))) ||
    (product.coaNumber && product.coaNumber.toLowerCase().includes(q))
  );
}
