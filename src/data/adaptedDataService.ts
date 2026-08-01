/**
 * UNIO AROMA 数据适配层 v2
 * 将 Supabase 真实数据（现有 siteDataService）适配为品牌手册风格组件需要的 ProductItem 格式
 * 保留：localStorage 缓存、拼音搜索、并发去重
 */
import { getProducts, getGlobalCountries, getChinaProvinces, getCountries, getSeries, getBannerUrls } from '../site/siteDataService';
import { ProductItem, SeriesKey, Country } from '../types';
import { matchProduct } from '../site/searchUtils';

// 系列映射：数据库 series_code -> 品牌手册 SeriesKey
const SERIES_KEY_MAP: Record<string, SeriesKey> = {
  yuan: 'yuan',
  he: 'he',
  sheng: 'sheng',
  jing: 'jing',
};

// 子分类中文标签（五行/身心灵/清润舒/香禅）
const ELEMENT_CN: Record<string, string> = {
  fire: '火', metal: '金', wood: '木', water: '水', earth: '土', base: '基础',
  body: '身体', mind: '心智', soul: '灵魂',
  clear: '清净', nourish: '润养', soothe: '舒缓',
  aesthetic: '香境', meditation: '禅思',
};

let cachedItems: ProductItem[] | null = null;
let cachedCountries: Country[] | null = null;

// ============ 产品适配 ============
function mapProductToItem(p: any, idx: number): ProductItem {
  const seriesKey = SERIES_KEY_MAP[p.series_code] || 'yuan';
  const prices: string[] = [];
  if (p.price_5ml) prices.push(`5ml ¥${p.price_5ml}`);
  if (p.price_10ml) prices.push(`10ml ¥${p.price_10ml}`);
  if (p.price_15ml) prices.push(`15ml ¥${p.price_15ml}`);
  if (p.price_30ml) prices.push(`30ml ¥${p.price_30ml}`);
  if (p.price_100ml) prices.push(`100ml ¥${p.price_100ml}`);
  if (p.price_piece) prices.push(`件 ¥${p.price_piece}`);
  if (prices.length === 0 && p.price) prices.push(`¥${p.price}`);

  const subgroup = ELEMENT_CN[p.element] || p.group_name || '单方';
  const image = p.image_url || (p.gallery_urls && p.gallery_urls[0]) || '';

  return {
    id: p.id,
    no: p.sort_order || idx + 1,
    code: p.code,
    series: seriesKey,
    subgroup,
    cn: p.name_cn,
    en: p.name_en || '',
    origin: p.origin || '全球原产地',
    latinName: p.scientific_name,
    prices,
    tag: subgroup,
    shortDesc: p.short_desc || p.description?.slice(0, 60) || '',
    description: p.detail_intro || p.description || '',
    coaNumber: `UNIO-COA-${p.code}-2026`,
    batchTrace: p.alice_lab || 'GC-MS 批次已归档',
    image,
    gallery_urls: p.gallery_urls || [],
    isFeatured: (p.sort_order && p.sort_order <= 8) || false,
    stock: p.stock ?? 0,
    costPrice: p.cost_price ?? undefined,
    purchasePrice: p.purchase_price ?? undefined,
    isActive: p.is_active !== false,
  };
}

// 获取全部产品（含缓存）
export async function fetchAllProducts(): Promise<ProductItem[]> {
  if (cachedItems) return cachedItems;
  try {
    const products = await getProducts();
    cachedItems = products.map((p: any, idx: number) => mapProductToItem(p, idx));
    return cachedItems;
  } catch (e) {
    console.warn('fetchAllProducts fallback:', e);
    return [];
  }
}

// 按系列获取
export async function fetchProductsBySeries(series: SeriesKey): Promise<ProductItem[]> {
  const all = await fetchAllProducts();
  return all.filter((p) => p.series === series);
}

// 拼音搜索（保留现有 searchUtils 的能力）
export function searchProducts(items: ProductItem[], query: string): ProductItem[] {
  if (!query.trim()) return items;
  return items.filter((p) =>
    matchProduct(
      {
        name_cn: p.cn,
        name_en: p.en,
        code: p.code,
        origin: p.origin,
        short_desc: p.shortDesc,
      } as any,
      query
    )
  );
}

// 清除缓存（产品编辑后调用）
export function clearProductCache(): void {
  cachedItems = null;
}

// ============ 国家适配 ============
// 数据库国家 -> 品牌手册 Country 格式
async function fetchAllCountries(): Promise<Country[]> {
  if (cachedCountries) return cachedCountries;
  try {
    const [globalC, chinaC] = await Promise.all([
      getGlobalCountries(),
      getChinaProvinces(),
    ]);
    const merged = [...globalC, ...chinaC];
    cachedCountries = merged.map((c: any) => ({
      id: c.id,
      name_cn: c.name_cn,
      name_en: c.name_en || '',
      region: c.region || '全球',
      sub_region: c.sub_region || '',
      description: c.description || '',
      technical_info: c.technical_info || '',
      image_url: c.image_url || '',
      scenery_url: c.scenery_url || c.image_url || '',
      gallery_urls: c.gallery_urls || [],
      eric_diary: c.eric_diary || '',
      visit_count: c.visit_count || 0,
      is_active: c.is_active !== false,
      sort_order: c.sort_order || 0,
      is_china_province: !!c.is_china_province,
      coordinates: c.coordinates as [number, number] | undefined,
    }));
    return cachedCountries;
  } catch (e) {
    console.warn('fetchAllCountries fallback:', e);
    return [];
  }
}

export async function fetchCountries(): Promise<Country[]> {
  return fetchAllCountries();
}

// ============ 系列元信息（与品牌手册一致的静态配置） ============
export const SERIES_META = {
  yuan: {
    key: 'yuan',
    title: '元 · 单方 / 基础油',
    enTitle: 'Pure · Singles & Base Oils',
    cnSub: '原生气息 · 五行相生',
    color: '#d2c4ad',
    subgroups: [
      { label: '金', en: 'Metal' }, { label: '木', en: 'Wood' },
      { label: '水', en: 'Water' }, { label: '火', en: 'Fire' },
      { label: '土', en: 'Earth' }, { label: '基础', en: 'Base Oils' },
    ],
    description: '从全球严选单方精油到高品质植物基础油，保存植物最清晰的原生气息、能量位格与温抚触感。',
    bannerImage: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/brand/banner.webp',
  },
  he: {
    key: 'he',
    title: '合 · 复方',
    enTitle: 'Harmony · Synergistic Blends',
    cnSub: '身心灵相合 · 日常秩序',
    color: '#bac2b9',
    subgroups: [
      { label: '身体', en: 'Body' }, { label: '心智', en: 'Mind' }, { label: '灵魂', en: 'Soul' },
    ],
    description: '以身（Body）、心（Mind）、灵（Soul）为线索，将数种精油精确配比，形成贴近生活节奏的复方解法。',
    bannerImage: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/products/body/Moonlight%20Oil.webp',
  },
  sheng: {
    key: 'sheng',
    title: '生 · 纯露',
    enTitle: 'Life · Organic Hydrosols',
    cnSub: '轻盈水相 · 植物原息',
    color: '#a8b5a0',
    subgroups: [
      { label: '清净', en: 'Purify' }, { label: '润养', en: 'Nourish' }, { label: '舒缓', en: 'Soothe' },
    ],
    description: '植物蒸馏过程中诞生的清透水相，包含丰富的微量水溶性芳香分子，适合日常无负担的肌肤与环境护理。',
    bannerImage: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/brand/spary.webp',
  },
  jing: {
    key: 'jing',
    title: '香 · 空间与器物',
    enTitle: 'Scent · Space & Objects',
    cnSub: '香境禅思 · 空间气场',
    color: '#e0d9c9',
    subgroups: [
      { label: '香境', en: 'Scent Field' }, { label: '禅思', en: 'Zen Contemplation' },
    ],
    description: '让气味进入空间、器物与仪式，把自然植物的气息延伸至居所、茶席、床头与随身角落。',
    bannerImage: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/products/place/candle.webp',
  },
};

// ============ Banner 获取 ============
export async function fetchBannerUrls(names: string[]): Promise<Record<string, string>> {
  try {
    return await getBannerUrls(names);
  } catch (e) {
    return {};
  }
}

export type { SeriesKey };
