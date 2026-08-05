export type SeriesKey = 'yuan' | 'he' | 'sheng' | 'jing';

export interface ProductItem {
  id?: string;
  no: number;
  code: string;
  series: SeriesKey;
  subgroup: string; // e.g. "金", "木", "身", "清净", "香境"
  cn: string;
  en: string;
  origin: string;
  latinName?: string;
  botanicalFamily?: string; // 植物科属 e.g. "松科雪松属", "菊科蒿属"
  extractionMethod?: string; // 提取/萃取方式 e.g. "水蒸气蒸馏法", "冷压压榨法", "溶剂萃取法"
  plantPart?: string; // 利用部位 e.g. "树皮", "新鲜叶片", "树脂", "新鲜花朵", "根部"
  storageInfo?: string; // 储存方式
  prices: string[];
  tag: string;
  shortDesc: string;
  description: string;
  benefits?: string[]; // 常见功效标签
  applicationScenarios?: {
    title: string;
    desc: string;
    method?: string;
  }[]; // 运用场景
  chemicalProfile?: {
    name: string;
    percentage?: string;
    effect: string;
  }[]; // 化学成分结构与活性分析
  aromatherapistNotes?: string; // Alice 创始人 & 专业芳疗师手记 (感性随感与能量共鸣)
  ericNotes?: string; // ERIC 寻香旅记 (偏旅行感悟，与精油原产地人文风土相关)
  aliceNotes?: string; // ALICE 芳疗日记 (以温暖和充满好奇的专业芳疗师视角)
  aliceDiary?: {
    title: string;
    date?: string;
    content: string;
    keyObservation?: string;
    blendSuggestion?: string;
  }; // Alice 的芳疗日记
  userReviews?: {
    id?: string;
    userName: string;
    userTag?: string; // 用户身份标签，如 "资深芳疗爱好者", "高压程序员/失眠调理"
    rating: number; // 1-5 星级
    date: string;
    comment: string;
    usageScenario?: string; // 使用场景
    likesCount?: number;
  }[]; // 用户真实试用与爱用点评
  recommendedPairings?: {
    code: string;
    name: string;
    reason: string;
  }[]; // 黄金调香协同推荐
  isCompound?: boolean; // 是否为复方精油/复方配方
  originDisplayType?: 'single' | 'multi' | 'hidden'; // 产地显示方式: 单一产地(single) | 多国/协同产地(multi) | 隐藏产地(hidden)
  formulation?: string; // 配方详情与调配思路
  ingredients?: string[]; // 成分列表 / 精油构成列表
  // 复方精油专属科学配方原料构成 (用于合系列 Synergistic Blends)
  blendFormula?: {
    ingredient: string; // 构成原精油名称 e.g. "蓝桉尤加利", "大马士革玫瑰"
    role: string;       // 在配方中的作用 e.g. "清通下呼吸道与黏膜", "理气活血主调"
    origin?: string;    // 原料产地 e.g. "澳大利亚", "保加利亚"
    note?: string;      // 香阶 e.g. "前调", "中调", "后调"
  }[];
  // 空间器物/香/境系列专属规格 (用于境系列 Incense & Artifacts)
  artifactSpecs?: {
    material: string;   // 器物材质 e.g. "紫铜 / 红木", "火山熔岩石"
    craft: string;      // 制作工序 e.g. "手工锻打锤纹 / 无漆过蜡"
    scene: string;      // 适用场景 e.g. "茶室静修 / 沉香熏蒸", "床头安神扩香"
    dimension?: string; // 规格尺寸 e.g. "180mm x 220mm", "200ml水箱"
  };
  scentPyramid?: {
    top?: string;
    middle?: string;
    base?: string;
  };
  coaNumber: string;
  batchTrace: string;
  image: string;
  gallery_urls?: string[];
  isFeatured?: boolean;
  stock?: number;
  costPrice?: number;
  purchasePrice?: number;
  isActive?: boolean;
}

export interface SeriesMeta {
  key: SeriesKey;
  title: string;
  enTitle: string;
  cnSub: string;
  color: string;
  subgroups: { label: string; en: string }[];
  description: string;
  bannerImage: string;
}

export interface Country {
  id: string;
  name_cn: string;
  name_en?: string;
  region?: string;
  sub_region?: string;
  description?: string;
  technical_info?: string;
  image_url?: string;
  scenery_url?: string;
  gallery_urls?: string[];
  eric_diary?: string;
  alice_diary?: string;
  visit_count: number;
  is_active: boolean;
  sort_order: number;
  is_china_province?: boolean;
  is_unlocked?: boolean; // true: 已解锁 (到访直采), false: 待解锁 (元境寻香探索)
  product_ids?: string[];
  coordinates?: [number, number];
}

export interface Banner {
  id: string;
  name: string;
  image_url: string;
  link_url?: string;
  position: string;
  is_active: boolean;
  sort_order: number;
}

export interface QuestionnaireData {
  ageGroup: string;
  gender: string;
  conditions: string[];
  specialStatus: string[];
  onMedication: 'yes' | 'no' | '';
  medicationDetails: string;
  skinType: string;
  skinSensitivity: string;
  usagePreference: string;
  scentPreference: string;
}

export interface Review {
  id: string;
  product_id?: string;
  product_name?: string;
  user_nickname: string;
  user_avatar?: string;
  rating: number;
  content: string;
  scent_notes_feedback?: string;
  created_at: string;
  is_featured?: boolean;
  is_active: boolean;
}

export interface InventoryItem {
  id: string;
  product_id: string;
  product_code: string;
  product_name: string;
  quantity: number;
  safety_stock: number;
  purchase_price: number;
  selling_price: number;
  last_restock_date: string;
}

export interface DictItem {
  id: string;
  category: string;
  key: string;
  value: string;
  description?: string;
}

export interface ScentConsultationResult {
  formulaTitle: string;
  poeticConcept: string;
  recommendedComponents: {
    series: string;
    code: string;
    name: string;
    origin: string;
    reason: string;
  }[];
  usageRitual: string[];
  aromatherapistNote: string;
  coaBatchNote: string;
}

export interface SoundTrack {
  id: string;
  name: string;
  enName: string;
  type: 'synth' | 'binaural';
  freq?: number;
  desc: string;
}
