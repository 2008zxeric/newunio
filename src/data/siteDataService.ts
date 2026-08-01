import { supabase } from '../lib/supabase';
import { ProductItem, Country, Banner, Review, InventoryItem, DictItem } from '../types';
import { ALL_PRODUCTS } from './catalogData';

// Country coordinates lookup
export const COUNTRY_COORDS: Record<string, [number, number]> = {
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
  '四川': [104.1, 30.6],
  '海南': [109.5, 19.2],
  '广西': [108.3, 23.7],
  '云南': [101.5, 25.0],
  '湖北': [112.3, 30.6],
  '湖南': [111.7, 26.9],
  '西藏': [87.5, 34.1],
  '青海': [96.4, 35.7],
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
    sub_region: '五指山野生沉香区',
    description: '海南野生白木香（沉香），历经油脂自然沉淀，带有高古幽透的木质沉香气韵，为 UNIO 元香顶级珍藏。',
    technical_info: '低压温和蒸馏 · 沉香醇含量极其丰富 · 禅修与深度归真',
    image_url: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/province/hainan.webp',
    scenery_url: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/province/hainan.webp',
    gallery_urls: [
      'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/province/hainan.webp'
    ],
    eric_diary: '海南奇楠与海南白木沉香，是东方香道与西洋芳疗融合的核心基石。',
    visit_count: 1620,
    is_active: true,
    sort_order: 6,
    is_china_province: true,
    coordinates: [109.5, 19.2]
  }
];

export async function fetchProductsFromSupabase(): Promise<ProductItem[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return ALL_PRODUCTS;
    }

    return data.map((p: any, idx: number) => ({
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
      image: p.image_url || ALL_PRODUCTS[idx % ALL_PRODUCTS.length]?.image || 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800',
      gallery_urls: p.gallery_urls || [],
      isActive: p.is_active !== false,
      stock: p.stock || 50,
      costPrice: p.cost_price || 120,
    }));
  } catch (e) {
    console.warn('Supabase products fetch fallback to ALL_PRODUCTS:', e);
    return ALL_PRODUCTS;
  }
}

export async function fetchCountriesFromSupabase(): Promise<Country[]> {
  try {
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_COUNTRIES;
    }

    return data.map((c: any) => ({
      ...c,
      coordinates: COUNTRY_COORDS[c.name_cn] || [100.0, 30.0],
      scenery_url: c.scenery_url || c.image_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200',
    }));
  } catch (e) {
    console.warn('Supabase countries fetch fallback to FALLBACK_COUNTRIES:', e);
    return FALLBACK_COUNTRIES;
  }
}
