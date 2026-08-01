import { supabase } from '../lib/supabase';
import { ProductItem, Country, Banner, Review, InventoryItem, DictItem } from '../types';
import { ALL_PRODUCTS } from './catalogData';

// ── 内存缓存：避免每次切换 Tab 都重新查 Supabase（首次 ~14s，缓存后 <10ms）──
const memoryCache = new Map<string, unknown>();
let productsPromise: Promise<ProductItem[]> | null = null;
let countriesPromise: Promise<Country[]> | null = null;

function cachedOrFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  if (memoryCache.has(key)) return Promise.resolve(memoryCache.get(key) as T);
  const p = fetcher().then((data) => {
    memoryCache.set(key, data);
    return data;
  });
  return p;
}

// Country coordinates lookup
export const COUNTRY_COORDS: Record<string, [number, number]> = {
  // Global Locations
  '保加利亚': [25.4, 42.7],
  '法国': [2.2, 46.2],
  '摩洛哥': [-5.8, 31.8],
  '阿曼': [57.0, 21.0],
  '埃及': [30.8, 26.8],
  '马达加斯加': [46.8, -18.7],
  '印度': [78.9, 20.5],
  '斯里兰卡': [80.8, 7.9],
  '海地': [-72.3, 19.0],
  '肯尼亚': [38.0, 0.0],
  '西班牙': [-3.7, 40.4],
  '葡萄牙': [-8.2, 39.4],
  '墨西哥': [-102.6, 23.6],
  '阿根廷': [-63.6, -38.4],
  '冰岛': [-19.0, 64.9],
  '奥地利': [14.6, 47.5],
  '波兰': [19.1, 51.9],
  '古巴': [-77.8, 21.5],
  '突尼斯': [10.2, 36.8],
  '塞舌尔': [55.5, -4.6],
  '多米尼加': [-69.9, 18.5],
  '印度尼西亚': [106.8, -6.2],
  '北马其顿': [21.4, 41.6],
  '泰国': [100.5, 13.7],
  '中国香港': [114.2, 22.3],
  '马来西亚': [101.7, 3.1],
  '希腊': [23.7, 38.0],
  '阿联酋': [54.3, 24.4],
  '越南': [105.8, 21.0],
  '日本': [139.7, 35.7],
  '菲律宾': [121.0, 14.6],
  '伊朗': [51.4, 35.7],
  '新加坡': [103.8, 1.3],
  '韩国': [127.0, 37.5],
  '尼泊尔': [85.3, 27.7],
  '土耳其': [32.8, 39.9],
  '哈萨克斯坦': [71.4, 51.1],
  '约旦': [35.9, 31.9],
  '中国澳门': [113.5, 22.2],
  '柬埔寨': [104.9, 11.5],
  '朝鲜': [125.7, 39.0],
  '德国': [13.4, 52.5],
  '意大利': [12.5, 41.9],
  '英国': [-0.1, 51.5],
  '荷兰': [4.9, 52.4],
  '丹麦': [12.6, 55.7],
  '匈牙利': [19.0, 47.5],
  '摩纳哥': [7.4, 43.7],
  '卢森堡': [6.1, 49.6],
  '南非': [28.0, -26.2],
  '津巴布韦': [31.0, -17.8],
  '毛里求斯': [57.5, -20.3],
  '美国': [-95.7, 37.1],
  '加拿大': [-106.3, 56.1],
  '巴西': [-51.9, -14.2],
  '澳大利亚': [133.8, -25.3],
  '秘鲁': [-75.0, -9.1],

  // Chinese Provinces & Regions
  '北京': [116.4, 39.9],
  '天津': [117.2, 39.1],
  '河北': [114.5, 38.0],
  '山西': [112.5, 37.8],
  '内蒙古': [111.7, 40.8],
  '辽宁': [123.4, 41.8],
  '吉林': [125.3, 43.8],
  '黑龙江': [126.6, 45.7],
  '上海': [121.5, 31.2],
  '江苏': [118.8, 32.1],
  '浙江': [120.2, 30.3],
  '安徽': [117.3, 31.8],
  '福建': [119.3, 26.1],
  '江西': [115.9, 28.7],
  '山东': [117.0, 36.7],
  '河南': [113.6, 34.8],
  '湖北': [112.3, 30.6],
  '湖南': [111.7, 28.2],
  '广东': [113.3, 23.1],
  '广西': [108.3, 23.7],
  '海南': [109.5, 19.2],
  '香港': [114.2, 22.3],
  '澳门': [113.5, 22.2],
  '重庆': [106.5, 29.5],
  '四川': [104.1, 30.6],
  '贵州': [106.7, 26.6],
  '云南': [101.5, 25.0],
  '西藏': [87.5, 34.1],
  '陕西': [108.9, 34.3],
  '甘肃': [103.8, 36.1],
  '青海': [96.4, 35.7],
  '宁夏': [106.2, 38.5],
  '新疆': [87.6, 43.8],
  '台湾': [121.5, 25.0],
  '中国': [104.2, 35.8],
};

// Fallback Global Fragrance Origins with Real GitHub Assets
export const FALLBACK_COUNTRIES: Country[] = [
  {
    id: 'c-bulgaria',
    name_cn: '保加利亚',
    name_en: 'Bulgaria',
    region: '欧洲',
    sub_region: '玫瑰谷 Kazanlak Valley',
    description: '全球顶级大马士革玫瑰原产地。高山冷泉与早晚晨露蒸馏出的精油，保留完整花香频次与微量植物活性成分。',
    technical_info: '蒸馏法萃取 · 铜锅低压蒸馏 · GC-MS 香茅醇/香叶醇达标',
    image_url: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/destinations/Bulgaria.webp',
    scenery_url: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/destinations/Bulgaria.webp',
    gallery_urls: [
      'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/destinations/Bulgaria.webp',
      'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/ericphoto/ind1.webp'
    ],
    eric_diary: '2016年5月拜访卡赞勒克玫瑰谷，晨曦5点花农手工采摘露水玫瑰，纯正高雅的香气令人震撼。',
    alice_diary: '大马士革玫瑰精油中的香茅醇与香叶醇天然比例极为精妙，在临床上对情绪疏导与肌肤提亮有着无可替代的安抚力量。',
    visit_count: 1420,
    is_active: true,
    sort_order: 1,
    coordinates: [25.4, 42.7]
  },
  {
    id: 'c-france',
    name_cn: '法国',
    name_en: 'France',
    region: '欧洲',
    sub_region: '普罗旺斯高地瓦朗索尔',
    description: '海拔800米以上高地野生狭叶薰衣草，低乙酸芳樟酯，高沉静调理气场，是纯净镇定与夜间舒压的黄金标准。',
    technical_info: '蒸汽蒸馏 · 极深镇静 · 双重有机认证',
    image_url: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/brand/brand.webp',
    scenery_url: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/brand/brand.webp',
    gallery_urls: [
      'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/brand/brand.webp'
    ],
    eric_diary: '瓦朗索尔的高地薰衣草带着凛冽而澄澈的木质草本香，非普通杂交薰衣草可比。',
    alice_diary: '海拔800米以上的狭叶薰衣草含有极高的乙酸芳樟酯，是神经系统与深层睡眠恢复的黄金调配基底。',
    visit_count: 2180,
    is_active: true,
    sort_order: 2,
    coordinates: [2.2, 46.2]
  },
  {
    id: 'c-oman',
    name_cn: '阿曼',
    name_en: 'Oman',
    region: '亚洲',
    sub_region: '多法尔高原 Dhofar',
    description: '神圣乳香波斯树脂原产地。沙漠极境裂痕中凝结出如琥珀般珍贵泪滴，蕴含神圣乳香酸，呼吸收束感极佳。',
    technical_info: '树脂冷凝蒸馏 · 高纯度 alpha-pinene 蒎烯 · 深层收束',
    image_url: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/destinations/Egypt.webp',
    scenery_url: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/destinations/Egypt.webp',
    gallery_urls: [
      'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/destinations/Egypt.webp'
    ],
    eric_diary: '多法尔绿洲与炽热岩石交界处的乳香树，每一滴泪滴都是极境生存的奇迹。',
    alice_diary: '神圣乳香树脂中的乳香酸能迅速安抚躁动呼吸，在冥想与能量收束配方中具有极高的定香与沉静价值。',
    visit_count: 980,
    is_active: true,
    sort_order: 3,
    coordinates: [57.0, 21.0]
  },
  {
    id: 'c-madagascar',
    name_cn: '马达加斯加',
    name_en: 'Madagascar',
    region: '非洲',
    sub_region: '诺西贝岛 Nosy Be',
    description: '特级依兰依兰(Ylang Ylang Extra)与罗文莎叶(Ravintsara)的极境乐园。浓郁甜美与清劲树脂相扣。',
    technical_info: '分段分级蒸馏 · 神经系统平衡',
    image_url: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/destinations/Madagascar.webp',
    scenery_url: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/destinations/Madagascar.webp',
    gallery_urls: [
      'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/destinations/Madagascar.webp'
    ],
    eric_diary: '印度洋暖风中的黄花依兰，散发着安抚心悸与提升欢愉感的异域暖香。',
    alice_diary: '分段蒸馏的特级依兰依兰花香分子极为丰盈，只需极低浓度即可在复方油中起到提振情致与平衡内分泌的作用。',
    visit_count: 1150,
    is_active: true,
    sort_order: 4,
    coordinates: [46.8, -18.7]
  },
  {
    id: 'c-sichuan',
    name_cn: '四川',
    name_en: 'Sichuan, China',
    region: '中国',
    sub_region: '蜀山贡嘎高山绿洲',
    description: '四川汉源蜀椒与高山竹林，带有辛香透彻的通透触觉，专用于驱寒排湿与空间辟秽。',
    technical_info: '超临界 CO2 萃取 · 辛香麻爽 · 空间气场净化',
    image_url: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/province/sichuan.webp',
    scenery_url: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/province/sichuan.webp',
    gallery_urls: [
      'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/province/sichuan.webp'
    ],
    eric_diary: '贡嘎雪山脚下的野花与高山松柏，是成都工作室调配五行木调配方的灵感源泉。',
    alice_diary: '四川高山竹林与蜀椒的辛香通透分子，对于祛湿散寒、辟秽清浊有着显著的古法芳疗效用。',
    visit_count: 1890,
    is_active: true,
    sort_order: 5,
    is_china_province: true,
    coordinates: [104.1, 30.6]
  },
  {
    id: 'c-hainan',
    name_cn: '海南',
    name_en: 'Hainan, China',
    region: '中国',
    sub_region: '五指山原生沉香区',
    description: '海南野生白木香（沉香），历经油脂自然沉淀，带有高古幽透的木质沉香气韵，为 UNIO 元香顶级珍藏。',
    technical_info: '低压温和蒸馏 · 沉香醇含量极其丰富 · 禅修与深度归真',
    image_url: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/province/hainan.webp',
    scenery_url: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/province/hainan.webp',
    gallery_urls: [
      'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/province/hainan.webp'
    ],
    eric_diary: '海南奇楠与海南白木沉香，是东方香道与西洋芳疗融合的核心基石。',
    alice_diary: '白木香沉香醇在微温下缓慢释放，能诱发脑波进入深层 Alpha 波状态，为高阶禅修与身心归真的灵魂基底。',
    visit_count: 1620,
    is_active: true,
    sort_order: 6,
    is_china_province: true,
    coordinates: [109.5, 19.2]
  }
];

export async function fetchProductsFromSupabase(): Promise<ProductItem[]> {
  // 立即返回 catalogData 219 款（完整目录，含价格），页面秒开不卡 loading
  // 防御：productsPromise 只接受真正的 Promise<数组>；HMR/异常可能残留函数引用
  if (productsPromise && typeof productsPromise.then === 'function') {
    const cached = await productsPromise;
    return Array.isArray(cached) ? cached : ALL_PRODUCTS;
  }

  // 1. 先立即 resolve catalogData（同步可用，页面不等待）
  const fallback = Promise.resolve(ALL_PRODUCTS);
  memoryCache.set('products', ALL_PRODUCTS);

  // 2. 后台异步用 Supabase 增强并更新缓存（网络慢/失败不影响首屏）
  productsPromise = (async () => {
    try {
      const timeout = new Promise<{ data: null; error: { message: string } }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: { message: 'timeout' } }), 12000)
      );
      const query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      const result = await Promise.race([query, timeout]);

      const { data, error } = result as any;
      if (error || !data || data.length === 0) {
        return ALL_PRODUCTS;
      }

      // ── 合并策略：Supabase 真实数据 + catalogData 补全缺失款（219 款完整目录）──
      const dbProducts = data.map((p: any, idx: number) => ({
        id: p.id,
        no: p.sort_order || idx + 1,
        code: p.code || `Y-${idx + 1}`,
        series: (p.series_code || p.series_id || 'yuan') as any,
        subgroup: p.element || p.group_name || p.category || '单方',
        cn: p.name_cn,
        en: p.name_en || '',
        origin: p.origin || p.country_id || '全球原产地',
        latinName: p.scientific_name,
        prices: [
          p.price_5ml ? `5ml: ¥${p.price_5ml}` : null,
          p.price_10ml ? `10ml: ¥${p.price_10ml}` : null,
          p.price_15ml ? `15ml: ¥${p.price_15ml}` : null,
          p.price_30ml ? `30ml: ¥${p.price_30ml}` : null,
          p.price ? `¥${p.price}` : null,
        ].filter(Boolean) as string[],
        tag: p.element || p.category || '极境精油',
        shortDesc: p.short_desc || p.description?.slice(0, 30) || '有机萃取，纯素原生气息',
        description: p.detail_intro || p.description || '',
        coaNumber: `UNIO-COA-${p.code || '2026'}`,
        batchTrace: p.alice_lab || 'GC-MS 测定批次已归档',
        image: p.image_url || 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800',
        gallery_urls: p.gallery_urls || [],
        isActive: p.is_active !== false,
        stock: p.stock || 50,
        costPrice: p.cost_price || 120,
      }));

      // catalogData 中数据库没有的款（新增 45 款等）→ 追加
      const dbCodes = new Set(dbProducts.map((p: any) => p.code));
      const extra = ALL_PRODUCTS.filter((c) => !dbCodes.has(c.code));
      const dbCount = dbProducts.length;
      const merged = [
        ...dbProducts,
        ...extra.map((c, idx) => ({
          ...c,
          no: dbCount + idx + 1,
          isActive: true,
          stock: c.stock || 50,
          costPrice: c.costPrice || 120,
        })),
      ];
      // 关键：数据库 sort_order 大量重复（999×114），强制按合并顺序重排 no，保证 React key 唯一
      return merged.map((p, idx) => ({ ...p, no: idx + 1 }));
    } catch (e) {
      console.warn('Supabase products fetch fallback to ALL_PRODUCTS:', e);
      return ALL_PRODUCTS;
    }
  })();
  return productsPromise;
}

export async function fetchCountriesFromSupabase(): Promise<Country[]> {
  if (countriesPromise) return countriesPromise;
  countriesPromise = cachedOrFetch('countries', async () => {
    try {
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_COUNTRIES;
    }

    const CHINA_PROVINCES = [
      '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
      '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
      '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
      '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '台湾', '香港', '中国香港', '澳门', '中国澳门', '中国'
    ];

    return data.map((c: any) => {
      const fixUrl = (url?: string) => {
        if (!url) return undefined;
        if (url.startsWith('/assets/')) {
          return `https://raw.githubusercontent.com/2008zxeric/unio-aroma/main${url}`;
        }
        return url;
      };

      const isChina =
        c.region === '神州' ||
        c.region === '中国' ||
        c.is_china === true ||
        c.is_china_province === true ||
        CHINA_PROVINCES.some((p) => c.name_cn && c.name_cn.includes(p));

      const rawImg = c.image_url || c.scenery_url;
      const fixedImg = fixUrl(rawImg) || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200';
      const fixedScenery = fixUrl(c.scenery_url) || fixedImg;

      return {
        ...c,
        is_china_province: isChina,
        region: isChina ? (c.region === '神州' ? '神州' : '中国') : c.region,
        coordinates: COUNTRY_COORDS[c.name_cn] || [100.0, 30.0],
        image_url: fixedImg,
        scenery_url: fixedScenery,
        gallery_urls: Array.isArray(c.gallery_urls) && c.gallery_urls.length > 0
          ? c.gallery_urls.map(fixUrl)
          : [fixedScenery],
      };
    });
    } catch (e) {
      console.warn('Supabase countries fetch fallback to FALLBACK_COUNTRIES:', e);
      return FALLBACK_COUNTRIES;
    }
  });
  return countriesPromise;
}
