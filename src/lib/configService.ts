/**
 * 前台配置服务 — 通过 Supabase Storage 的 configs/front-config.json 读写可配置数据
 * 数据：载体油 / 安全规则 / Alice 语录 / 五维图谱评分
 * 后台 AdminConsole 写入，前台读取（带本地默认值回退）
 */
import { supabase } from './supabase';

export interface CarrierOilCfg {
  id: string;
  nameCn: string;
  nameEn: string;
  density: string;
  absorption: string;
  bestFor: string;
  status: 'active' | 'inactive';
}

export interface SafetyRuleCfg {
  id: string;
  category: 'photosensitive' | 'pregnancy' | 'allergen' | 'patchTest';
  oilName: string;
  level: string;
  warningText: string;
  avoidHours?: number;
}

export interface FrontConfig {
  carrier_oils: CarrierOilCfg[];
  safety_rules: SafetyRuleCfg[];
  alice_quotes: string[];
  spectrum_ratings: Record<string, { emotional: number; sleep: number; skin: number; respiratory: number; focus: number }>;
  formula_params: FormulaParamsCfg;
  updated_at: string;
}

/** 配方卡参数（计算器滴数基准 + 导出水印 + 编号前缀） */
export interface FormulaParamsCfg {
  drops_per_ml: number;        // 1ml 精油滴数基准（默认 20）
  card_watermark: string;      // 导出卡片水印文案
  card_prefix: string;         // 配方编号前缀（如 UNIO-EO）
  dilution_default: number;    // 默认稀释浓度 %
  max_face_conc: number;       // 面部浓度上限 %
}

const CONFIG_BUCKET = 'configs';
const CONFIG_FILE = 'front-config.json';

/** 默认配置（本地回退值） */
export const DEFAULT_FRONT_CONFIG: FrontConfig = {
  carrier_oils: [
    { id: '1', nameCn: '有机荷荷巴油', nameEn: 'Jojoba Oil', density: '0.86 g/ml', absorption: '中等亲肤，接近人皮脂', bestFor: '面部抗衰、水油平衡、敏弱屏障', status: 'active' },
    { id: '2', nameCn: '冷压甜杏仁油', nameEn: 'Sweet Almond Oil', density: '0.91 g/ml', absorption: '高滋润度，延展性极佳', bestFor: '全身舒压按摩、干性肌肤', status: 'active' },
    { id: '3', nameCn: '智利野生玫瑰果油', nameEn: 'Rosehip Seed Oil', density: '0.92 g/ml', absorption: '深层渗透，抗氧化', bestFor: '淡化细纹、印痕修护、夜间焕采', status: 'active' },
    { id: '4', nameCn: '极萃葡萄籽油', nameEn: 'Grapeseed Oil', density: '0.90 g/ml', absorption: '清爽易吸收，零油腻感', bestFor: '油性肌肤、夏季清爽调配', status: 'active' },
    { id: '5', nameCn: '摩洛哥阿甘坚果油', nameEn: 'Argan Oil', density: '0.91 g/ml', absorption: '醇厚滋养，锁水屏障', bestFor: '熟龄肌修护、发丝滋养', status: 'active' },
  ],
  safety_rules: [
    { id: '1', category: 'photosensitive', oilName: '佛手柑 / 柠檬 / 甜橙 / 青柠', level: '高风险', warningText: '含有呋喃香豆素成分，涂抹后 12 小时内严禁晒太阳或接触强紫外线灯。', avoidHours: 12 },
    { id: '2', category: 'pregnancy', oilName: '快乐鼠尾草 / 茉莉 / 雪松 / 迷迭香', level: '禁用', warningText: '孕期前三个月及哺乳期禁用，可能引起子宫收缩或荷尔蒙波动。' },
    { id: '3', category: 'allergen', oilName: '苯甲醇 / 香茅醇 / 柠檬烯等 26 种', level: '披露', warningText: '欧盟 26 种自然过敏源披露，敏感人群使用前请先做局部皮试。' },
    { id: '4', category: 'patchTest', oilName: '所有单方精油', level: '必须', warningText: '首次使用请于手臂内侧进行 24 小时斑贴测试，确认无红疹再用于面部。' },
  ],
  alice_quotes: [],
  spectrum_ratings: {},
  formula_params: {
    drops_per_ml: 20,
    card_watermark: 'UNIO BOTANICAL ARCHIVE · 元香芳疗档案',
    card_prefix: 'UNIO-EO',
    dilution_default: 1.0,
    max_face_conc: 2.0,
  },
  updated_at: '',
};

/** 读取前台配置（失败或不存在时回退默认值） */
export async function fetchFrontConfig(): Promise<FrontConfig> {
  try {
    const { data, error } = await supabase.storage
      .from(CONFIG_BUCKET)
      .download(CONFIG_FILE);
    if (error) throw error;
    const text = await data.text();
    const parsed = JSON.parse(text) as FrontConfig;
    // 合并默认值，保证结构完整
    return {
      ...DEFAULT_FRONT_CONFIG,
      ...parsed,
      carrier_oils: parsed.carrier_oils?.length ? parsed.carrier_oils : DEFAULT_FRONT_CONFIG.carrier_oils,
      safety_rules: parsed.safety_rules?.length ? parsed.safety_rules : DEFAULT_FRONT_CONFIG.safety_rules,
    };
  } catch (err) {
    console.warn('[configService] 读取配置失败，使用默认值:', err);
    return DEFAULT_FRONT_CONFIG;
  }
}

/** 保存前台配置（后台 AdminConsole 调用） */
export async function saveFrontConfig(config: FrontConfig): Promise<boolean> {
  try {
    const finalConfig = { ...config, updated_at: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(finalConfig)], { type: 'application/json' });
    const { error } = await supabase.storage
      .from(CONFIG_BUCKET)
      .upload(CONFIG_FILE, blob, { upsert: true, contentType: 'application/json' });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('[configService] 保存配置失败:', err);
    return false;
  }
}
