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
  prices: string[];
  tag: string;
  shortDesc: string;
  description: string;
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
  visit_count: number;
  is_active: boolean;
  sort_order: number;
  is_china_province?: boolean;
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
