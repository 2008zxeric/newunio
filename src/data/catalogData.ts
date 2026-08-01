import { ProductItem, SeriesMeta, SeriesKey } from '../types';

export const SERIES_META: Record<SeriesKey, SeriesMeta> = {
  yuan: {
    key: 'yuan',
    title: '元 · 单方 / 基础油',
    enTitle: 'Pure · Singles & Base Oils',
    cnSub: '原生气息 · 五行相生',
    color: '#d2c4ad',
    subgroups: [
      { label: '金', en: 'Metal' },
      { label: '木', en: 'Wood' },
      { label: '水', en: 'Water' },
      { label: '火', en: 'Fire' },
      { label: '土', en: 'Earth' },
      { label: '基础', en: 'Base Oils' }
    ],
    description: '从全球严选单方精油到高品质植物基础油，保存植物最清晰的原生气息、能量位格与温抚触感。',
    bannerImage: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/brand/banner.webp'
  },
  he: {
    key: 'he',
    title: '合 · 复方',
    enTitle: 'Harmony · Synergistic Blends',
    cnSub: '身心灵相合 · 日常秩序',
    color: '#bac2b9',
    subgroups: [
      { label: '身体', en: 'Body' },
      { label: '心智', en: 'Mind' },
      { label: '灵魂', en: 'Soul' }
    ],
    description: '以身（Body）、心（Mind）、灵（Soul）为线索，将数种精油精确配比，形成贴近生活节奏的复方解法。',
    bannerImage: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/products/body/Moonlight%20Oil.webp'
  },
  sheng: {
    key: 'sheng',
    title: '生 · 纯露',
    enTitle: 'Life · Organic Hydrosols',
    cnSub: '轻盈水相 · 植物原息',
    color: '#a8b5a0',
    subgroups: [
      { label: '清净', en: 'Purify' },
      { label: '润养', en: 'Nourish' },
      { label: '舒缓', en: 'Soothe' }
    ],
    description: '植物蒸馏过程中诞生的清透水相，包含丰富的微量水溶性芳香分子，适合日常无负担的肌肤与环境护理。',
    bannerImage: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/brand/spary.webp'
  },
  jing: {
    key: 'jing',
    title: '香 · 空间与器物',
    enTitle: 'Scent · Space & Objects',
    cnSub: '香境禅思 · 空间气场',
    color: '#e0d9c9',
    subgroups: [
      { label: '香境', en: 'Scent Field' },
      { label: '禅思', en: 'Zen Contemplation' }
    ],
    description: '让气味进入空间、器物与仪式，把自然植物的气息延伸至居所、茶席、床头与随身角落。',
    bannerImage: 'https://raw.githubusercontent.com/2008zxeric/unio-aroma/main/assets/products/place/candle.webp'
  }
};

const rawCatalogList = [
  // --- 元系列 (Yuan Singles & Base Oils) ---
  // 金 (Metal)
  { code: 'Y-J-002', series: 'yuan', subgroup: '金', cn: '极境尤加利', en: 'Radiata Eucalyptus', latinName: 'Eucalyptus radiata', origin: '澳大利亚', prices: ['¥138/10ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-J-003', series: 'yuan', subgroup: '金', cn: '极境茶树', en: 'Tea Tree Essential Oil', latinName: 'Melaleuca alternifolia', origin: '澳大利亚', prices: ['¥138/10ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', isFeatured: true },
  { code: 'Y-J-004', series: 'yuan', subgroup: '金', cn: '极境薄荷', en: 'Peppermint Essential Oil', latinName: 'Mentha piperita', origin: '阿尔巴尼亚', prices: ['¥118/10ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-J-005', series: 'yuan', subgroup: '金', cn: '极境香茅', en: 'Java Citronella', latinName: 'Cymbopogon winterianus', origin: '法国/印度洋', prices: ['¥178/10ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-J-007', series: 'yuan', subgroup: '金', cn: '依兰依兰油-III段', en: 'Ylang Ylang III', latinName: 'Cananga odorata', origin: '马达加斯加', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-J-008', series: 'yuan', subgroup: '金', cn: '罗马洋甘菊油', en: 'Roman Chamomile', latinName: 'Anthemis nobilis', origin: '英国', prices: ['¥558/5ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-J-009', series: 'yuan', subgroup: '金', cn: '橙花油', en: 'Neroli Blossom', latinName: 'Citrus aurantium var. Amara', origin: '印度', prices: ['¥258/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', isFeatured: true },
  { code: 'Y-J-011', series: 'yuan', subgroup: '金', cn: '玫瑰天竺葵油', en: 'Rose Geranium', latinName: 'Pelargonium roseum', origin: '法国', prices: ['¥258/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-J-012', series: 'yuan', subgroup: '金', cn: '德国洋甘菊油(有机)', en: 'German Chamomile Org', latinName: 'Matricaria chamomilla L.', origin: '保加利亚', prices: ['¥688/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-J-013', series: 'yuan', subgroup: '金', cn: '大花茉莉净油(原精)', en: 'Jasmine Grandiflorum Abs', latinName: 'Jasminum grandiflorum', origin: '印度', prices: ['¥858/5ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600', isFeatured: true },
  { code: 'Y-J-014', series: 'yuan', subgroup: '金', cn: '意大利永久花油/蜡菊油(有机)', en: 'Helichrysum Corsica Org', latinName: 'Helichrysum Italicum', origin: '法国科西嘉', prices: ['¥958/5ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-J-015', series: 'yuan', subgroup: '金', cn: '依兰依兰油-I段', en: 'Ylang Ylang I', latinName: 'Cananga odorata', origin: '马达加斯加', prices: ['¥358/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-J-016', series: 'yuan', subgroup: '金', cn: '意大利永久花油/蜡菊油', en: 'Helichrysum Italicum', latinName: 'Helichrysum Italicum', origin: '克罗地亚', prices: ['¥958/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-J-017', series: 'yuan', subgroup: '金', cn: '橙花油', en: 'Neroli Italy', latinName: 'Citrus aurantium var. Amara', origin: '意大利', prices: ['¥258/5ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-J-018', series: 'yuan', subgroup: '金', cn: '德国洋甘菊油', en: 'German Chamomile Nepal', latinName: 'Matricaria chamomilla L.', origin: '尼泊尔', prices: ['¥688/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-J-020', series: 'yuan', subgroup: '金', cn: '完全依兰依兰油(有机)', en: 'Ylang Ylang Complete Org', latinName: 'Cananga odorata', origin: '马达加斯加', prices: ['¥218/5ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-J-021', series: 'yuan', subgroup: '金', cn: '大马士革玫瑰油(双有机)', en: 'Rose Damascena Dual Org', latinName: 'Rosa damascena mill.', origin: '保加利亚', prices: ['¥1358/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', isFeatured: true },
  { code: 'Y-J-023', series: 'yuan', subgroup: '金', cn: '特级依兰依兰油(有机)', en: 'Ylang Ylang Extra Org', latinName: 'Cananga odorata', origin: '马达加斯加', prices: ['¥258/5ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },

  // 木 (Wood)
  { code: 'Y-M-024', series: 'yuan', subgroup: '木', cn: '老山檀香', en: 'Mysore Sandalwood', latinName: 'Santalum album', origin: '印度迈索尔', prices: ['¥688/10ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', isFeatured: true },
  { code: 'Y-M-025', series: 'yuan', subgroup: '木', cn: '极境丝柏', en: 'Cypress Oil', latinName: 'Cupressus sempervirens', origin: '法国', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-M-026', series: 'yuan', subgroup: '木', cn: '极境雪松', en: 'Himalayan Cedarwood', latinName: 'Cedrus deodara', origin: '尼泊尔', prices: ['¥138/10ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-M-027', series: 'yuan', subgroup: '木', cn: '极境松针', en: 'Scots Pine Needle', latinName: 'Pinus sylvestris', origin: '俄罗斯西伯利亚', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-M-028', series: 'yuan', subgroup: '木', cn: '神圣花梨木', en: 'Rosewood Essential Oil', latinName: 'Aniba rosaeodora', origin: '巴西', prices: ['¥188/100ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-M-029', series: 'yuan', subgroup: '木', cn: '澳洲茶树油', en: 'Australian Tea Tree', latinName: 'Melaleuca alternifolia', origin: '澳洲', prices: ['¥188/5ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-M-030', series: 'yuan', subgroup: '木', cn: '丁香花苞油', en: 'Clove Bud Oil', latinName: 'Syzygium aromaticum', origin: '马达加斯加', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-M-031', series: 'yuan', subgroup: '木', cn: '欧薄荷油(有机)', en: 'Peppermint India Org', latinName: 'Mentha piperita L.', origin: '印度', prices: ['¥228/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-M-032', series: 'yuan', subgroup: '木', cn: '蓝胶尤加利油', en: 'Globulus Eucalyptus', latinName: 'Eucalyptus globulus', origin: '澳洲', prices: ['¥88/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-M-033', series: 'yuan', subgroup: '木', cn: '桂皮油', en: 'Cassia Cinnamon Bark', latinName: 'Cinnamomum cassia', origin: '马达加斯加', prices: ['¥258/5ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-M-034', series: 'yuan', subgroup: '木', cn: '波旁天竺葵油', en: 'Bourbon Geranium', latinName: 'Pelargonium asperum', origin: '法国留尼旺', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-M-035', series: 'yuan', subgroup: '木', cn: '马鞭草酮迷迭香', en: 'Verbenone Rosemary', latinName: 'Rosmarinus officinalis ct. verbenone', origin: '法国科西嘉', prices: ['¥168/5ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-M-036', series: 'yuan', subgroup: '木', cn: '欧薄荷油/胡椒薄荷油', en: 'Peppermint USA', latinName: 'Mentha piperita L.', origin: '美国', prices: ['¥228/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-M-037', series: 'yuan', subgroup: '木', cn: '清凉薄荷油', en: 'Cornmint Oil', latinName: 'Mentha arvensis', origin: '尼泊尔', prices: ['¥128/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-M-038', series: 'yuan', subgroup: '木', cn: '绿薄荷油/留兰香油', en: 'Spearmint Oil', latinName: 'Mentha spicata L.', origin: '美国', prices: ['¥118/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-M-039', series: 'yuan', subgroup: '木', cn: '野生香蜂草油', en: 'Wild Lemon Balm', latinName: 'Melissa Officinalis', origin: '法国', prices: ['¥788/5ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-M-040', series: 'yuan', subgroup: '木', cn: '月桂油', en: 'Bay Laurel Leaf', latinName: 'Laurus nobilis', origin: '牙买加', prices: ['¥258/5ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-M-041', series: 'yuan', subgroup: '木', cn: '快乐鼠尾草油', en: 'Clary Sage', latinName: 'Salvia sclarea', origin: '东欧', prices: ['¥188/5ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-M-042', series: 'yuan', subgroup: '木', cn: '桉油醇型迷迭香油', en: 'Cineole Rosemary', latinName: 'Rosmarinus officinalis ct cineol', origin: '南非', prices: ['¥128/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-M-043', series: 'yuan', subgroup: '木', cn: '百里酚百里香油', en: 'Thymol Thyme', latinName: 'Thymus Thymol', origin: '西班牙', prices: ['¥228/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-M-044', series: 'yuan', subgroup: '木', cn: '天竺葵油/香叶油', en: 'Egyptian Geranium', latinName: 'Pelargonium graveolens', origin: '埃及', prices: ['¥188/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-M-045', series: 'yuan', subgroup: '木', cn: '快乐鼠尾草油(有机)', en: 'Clary Sage Org', latinName: 'Salvia sclarea', origin: '南非', prices: ['¥188/5ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-M-046', series: 'yuan', subgroup: '木', cn: '天竺葵油(有机)', en: 'Geranium Egypt Org', latinName: 'Pelargonium graveolens', origin: '埃及', prices: ['¥188/5ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-M-047', series: 'yuan', subgroup: '木', cn: '真薰衣草油(有机)', en: 'True Lavender Provence Org', latinName: 'Lavandula angustifolia', origin: '法国普罗旺斯', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600', isFeatured: true },
  { code: 'Y-M-048', series: 'yuan', subgroup: '木', cn: '罗勒', en: 'Sweet Basil', latinName: 'Ocimum basilicum', origin: '印度/埃及', prices: ['¥138/100ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-M-049', series: 'yuan', subgroup: '木', cn: '黑胡椒油', en: 'Black Pepper Oil', latinName: 'Piper nigrum L.', origin: '印度', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-M-050', series: 'yuan', subgroup: '木', cn: '芳枸叶油/芬芳茶树油', en: 'Fragonia Essential Oil', latinName: 'Agonis fragrans', origin: '澳洲', prices: ['¥358/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-M-051', series: 'yuan', subgroup: '木', cn: '香蜂草油(有机)', en: 'Lemon Balm Org', latinName: 'Melissa Officinalis', origin: '法国', prices: ['¥1258/5ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-M-052', series: 'yuan', subgroup: '木', cn: '西洋蓍草', en: 'Blue Yarrow', latinName: 'Achillea millefolium', origin: '保加利亚', prices: ['¥288/5ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-M-053', series: 'yuan', subgroup: '木', cn: '澳洲茶树油(有机)', en: 'Australian Tea Tree Org', latinName: 'Melaleuca alternifolia', origin: '澳洲', prices: ['¥188/5ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-M-054', series: 'yuan', subgroup: '木', cn: '真薰衣草油(高地)', en: 'Highland Lavender', latinName: 'Lavandula angustifolia', origin: '法国', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-M-055', series: 'yuan', subgroup: '木', cn: '椒样薄荷油', en: 'China Peppermint', latinName: 'Mentha piperita L.', origin: '中国', prices: ['¥98/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },

  // 水 (Water)
  { code: 'Y-S-057', series: 'yuan', subgroup: '水', cn: '深根岩兰草', en: 'Deep Vetiver Root', latinName: 'Vetiveria zizanoides', origin: '印度/海地', prices: ['¥188/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', isFeatured: true },
  { code: 'Y-S-058', series: 'yuan', subgroup: '水', cn: '暗夜广藿香', en: 'Dark Patchouli', latinName: 'Pogostemon cablin', origin: '印度尼西亚', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-S-059', series: 'yuan', subgroup: '水', cn: '极境杜松', en: 'Juniper Berry', latinName: 'Juniperus communis', origin: '苏格兰', prices: ['¥138/100ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-S-061', series: 'yuan', subgroup: '水', cn: '柠檬油', en: 'Italian Lemon', latinName: 'Citrus limonum', origin: '意大利', prices: ['¥98/5ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-S-062', series: 'yuan', subgroup: '水', cn: '柠檬草油', en: 'Lemongrass Oil', latinName: 'Cymbopogon flexuosus', origin: '尼泊尔', prices: ['¥118/5ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-S-063', series: 'yuan', subgroup: '水', cn: '苦橙叶油', en: 'Petitgrain Paraguay', latinName: 'Citrus aurantium', origin: '巴拉圭', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-S-064', series: 'yuan', subgroup: '水', cn: '甜橙油', en: 'Sweet Orange', latinName: 'Citrus sinensis', origin: '意大利', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-S-065', series: 'yuan', subgroup: '水', cn: '甜橙油(有机)', en: 'Sweet Orange Mexico Org', latinName: 'Citrus sinensis', origin: '墨西哥', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-S-066', series: 'yuan', subgroup: '水', cn: '柠檬油(有机)', en: 'Organic Lemon Italy', latinName: 'Citrus limon', origin: '意大利', prices: ['¥98/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-S-067', series: 'yuan', subgroup: '水', cn: '佛手柑', en: 'Bergamot Reggio', latinName: 'Citrus bergamia', origin: '意大利', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-S-068', series: 'yuan', subgroup: '水', cn: '粉葡萄柚油', en: 'Pink Grapefruit', latinName: 'Citrus paradisi', origin: '南非', prices: ['¥138/5ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },

  // 火 (Fire)
  { code: 'Y-H-069', series: 'yuan', subgroup: '火', cn: '大马士革玫瑰(有机)', en: 'Damask Rose Org', latinName: 'Rosa damascena', origin: '保加利亚', prices: ['¥1358/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', isFeatured: true },
  { code: 'Y-H-070', series: 'yuan', subgroup: '火', cn: '极境依兰', en: 'Ylang Ylang Premium', latinName: 'Cananga odorata', origin: '马达加斯加', prices: ['¥238/10ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-H-071', series: 'yuan', subgroup: '火', cn: '大花茉莉', en: 'Jasmine Grandiflorum', latinName: 'Jasminum grandiflorum', origin: '印度', prices: ['¥858/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-H-072', series: 'yuan', subgroup: '火', cn: '日光橙花', en: 'Sunlit Neroli', latinName: 'Citrus aurantium var. amara', origin: '突尼斯', prices: ['¥258/5ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-H-073', series: 'yuan', subgroup: '火', cn: '极境天竺葵', en: 'Chinese Geranium', latinName: 'Pelargonium graveolens', origin: '中国', prices: ['¥158/10ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-H-074', series: 'yuan', subgroup: '火', cn: '胡萝卜籽', en: 'Carrot Seed Oil', latinName: 'Daucus carota', origin: '法国', prices: ['¥238/100ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-H-075', series: 'yuan', subgroup: '火', cn: '香根油/岩兰草油', en: 'Indonesian Vetiver', latinName: 'Vetiveria zizanoides', origin: '印尼', prices: ['¥188/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-H-076', series: 'yuan', subgroup: '火', cn: '姜黄油', en: 'Turmeric Essential Oil', latinName: 'Curcuma longa L.', origin: '马达加斯加', prices: ['¥188/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-H-077', series: 'yuan', subgroup: '火', cn: '生姜油', en: 'Ginger Essential Oil', latinName: 'Zingiber officinale', origin: '马达加斯加', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },

  // 土 (Earth)
  { code: 'Y-T-078', series: 'yuan', subgroup: '土', cn: '横断生姜', en: 'Hengduan Ginger Root', latinName: 'Zingiber officinale', origin: '中国横断山', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', isFeatured: true },
  { code: 'Y-T-081', series: 'yuan', subgroup: '土', cn: '极境橡木苔', en: 'Oakmoss Abs', latinName: 'Evernia prunastri', origin: '欧洲', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-T-082', series: 'yuan', subgroup: '土', cn: '广藿香油', en: 'Indonesian Patchouli', latinName: 'Pogostemon cablin', origin: '印尼', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-T-085', series: 'yuan', subgroup: '土', cn: '东印度檀香油(ISO级)', en: 'ISO Grade Sandalwood', latinName: 'Santalum album', origin: '印度', prices: ['¥1580/5ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-T-086', series: 'yuan', subgroup: '土', cn: '大西洋雪松油', en: 'Atlas Cedarwood', latinName: 'Cedrus atlantica', origin: '摩洛哥', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-T-099', series: 'yuan', subgroup: '土', cn: '东印度檀香油', en: 'East Indian Sandalwood', latinName: 'Santalum album', origin: '印度', prices: ['¥1580/5ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-T-103', series: 'yuan', subgroup: '土', cn: '澳洲檀香', en: 'Australian Sandalwood', latinName: 'Sandalwood', origin: '澳洲', prices: ['¥1280/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-T-108', series: 'yuan', subgroup: '土', cn: '印尼檀香', en: 'Indonesian Sandalwood', latinName: 'Sandalwood', origin: '印尼', prices: ['¥558/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-T-109', series: 'yuan', subgroup: '土', cn: '丝柏油', en: 'Spanish Cypress', latinName: 'Cupressus sempervirens', origin: '西班牙', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },

  // 基础油 (Base Oils)
  { code: 'Y-B-001', series: 'yuan', subgroup: '基础', cn: '神圣乳香', en: 'Sacred Frankincense Resin', latinName: 'Boswellia sacra', origin: '阿曼', prices: ['¥358/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', isFeatured: true },
  { code: 'Y-B-002', series: 'yuan', subgroup: '基础', cn: '极境没药', en: 'Somalia Myrrh', latinName: 'Commiphora myrrha', origin: '索马里', prices: ['¥358/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-B-003', series: 'yuan', subgroup: '基础', cn: '极境安息香', en: 'Benzoin Resinoid', latinName: 'Styrax benzoin', origin: '印尼', prices: ['¥168/100ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-B-004', series: 'yuan', subgroup: '基础', cn: '极境红橘', en: 'Red Tangerine', latinName: 'Citrus reticulata', origin: '中国', prices: ['¥138/10ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-B-005', series: 'yuan', subgroup: '基础', cn: '极境葡萄柚', en: 'Florida Grapefruit', latinName: 'Citrus paradisi', origin: '美国', prices: ['¥108/100ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-B-006', series: 'yuan', subgroup: '基础', cn: '山茶籽油', en: 'Camellia Seed Oil', latinName: 'Camellia japonica', origin: '中国', prices: ['¥68/30ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-B-007', series: 'yuan', subgroup: '基础', cn: '核桃油', en: 'Walnut Carrier Oil', latinName: 'Juglans regia', origin: '澳洲', prices: ['¥88/30ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-B-008', series: 'yuan', subgroup: '基础', cn: '乳香油', en: 'Frankincense Oil', latinName: 'Boswellia carterii', origin: '索马里', prices: ['¥358/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-B-009', series: 'yuan', subgroup: '基础', cn: '亚麻籽油', en: 'Flaxseed Oil', latinName: 'Linum usitatissimum', origin: '尼泊尔', prices: ['¥78/30ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-B-010', series: 'yuan', subgroup: '基础', cn: '白池花籽油', en: 'Meadowfoam Seed Oil', latinName: 'Limnanthes alba', origin: '美国', prices: ['¥228/30ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-B-011', series: 'yuan', subgroup: '基础', cn: '椰子油', en: 'Virgin Coconut Oil', latinName: 'Cocos nucifera', origin: '印尼', prices: ['¥68/30ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-B-012', series: 'yuan', subgroup: '基础', cn: '琼崖海棠油', en: 'Tamanu Carrier Oil', latinName: 'Calophyllum inophyllum', origin: '美国', prices: ['¥458/30ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-B-013', series: 'yuan', subgroup: '基础', cn: '芝麻油', en: 'Sesame Seed Oil', latinName: 'Sesamum indicum', origin: '印度', prices: ['¥58/30ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-B-014', series: 'yuan', subgroup: '基础', cn: '没药油', en: 'Myrrh Essential Oil', latinName: 'Commiphora myrrha', origin: '索马里', prices: ['¥358/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-B-015', series: 'yuan', subgroup: '基础', cn: '山金车油', en: 'Arnica Infused Oil', latinName: 'Arnica Montana', origin: '英国', prices: ['¥328/30ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-B-016', series: 'yuan', subgroup: '基础', cn: '安息香净油', en: 'Benzoin Abs', latinName: 'Styrax benzoin', origin: '印尼', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-B-017', series: 'yuan', subgroup: '基础', cn: '小麦胚芽油', en: 'Wheat Germ Oil', latinName: 'Triticum vulgare', origin: '英国', prices: ['¥88/30ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-B-018', series: 'yuan', subgroup: '基础', cn: '芦荟油', en: 'Aloe Vera Macerated', latinName: 'Aloe barbadensis', origin: '台湾', prices: ['¥88/30ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-B-019', series: 'yuan', subgroup: '基础', cn: '乳香油(全成分)', en: 'Frankincense CO2 Extract', latinName: 'Boswellia carterii', origin: '埃塞俄比亚', prices: ['¥358/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-B-020', series: 'yuan', subgroup: '基础', cn: '透明荷荷巴油', en: 'Clear Jojoba Oil', latinName: 'Simmondsia chinensis', origin: '西班牙', prices: ['¥158/30ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-B-021', series: 'yuan', subgroup: '基础', cn: '石榴籽油', en: 'Pomegranate Seed Oil', latinName: 'Punica granatum L.', origin: '尼泊尔', prices: ['¥258/30ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-B-022', series: 'yuan', subgroup: '基础', cn: '葵花籽油', en: 'Sunflower Seed Oil', latinName: 'Helianthus annuus', origin: '英国', prices: ['¥58/30ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-B-023', series: 'yuan', subgroup: '基础', cn: '杏桃仁油', en: 'Apricot Kernel Oil', latinName: 'Prunus armeniaca', origin: '澳洲', prices: ['¥78/30ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-B-024', series: 'yuan', subgroup: '基础', cn: '金色荷荷巴油', en: 'Golden Jojoba Oil', latinName: 'Simmondsia chinensis', origin: '西班牙', prices: ['¥158/30ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-B-025', series: 'yuan', subgroup: '基础', cn: '甜杏仁油', en: 'Sweet Almond Oil', latinName: 'Prunus amygdalus', origin: '英国', prices: ['¥58/30ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-B-026', series: 'yuan', subgroup: '基础', cn: '酪梨油', en: 'Avocado Carrier Oil', latinName: 'Persea americana', origin: '英国', prices: ['¥128/30ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-B-027', series: 'yuan', subgroup: '基础', cn: '葡萄籽油', en: 'Grapeseed Oil', latinName: 'Vitis vinifera', origin: '英国', prices: ['¥68/30ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-B-028', series: 'yuan', subgroup: '基础', cn: '玫瑰果油', en: 'Rosehip Seed Oil', latinName: 'Rosa rubiginosa', origin: '英国', prices: ['¥198/30ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-B-029', series: 'yuan', subgroup: '基础', cn: '分馏椰子油', en: 'Fractionated Coconut', latinName: 'Cocos nucifera', origin: '中国', prices: ['¥98/30ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-B-030', series: 'yuan', subgroup: '基础', cn: '沙棘果油', en: 'Sea Buckthorn Fruit', latinName: 'Hippophae rhamnoides', origin: '尼泊尔', prices: ['¥188/30ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-B-031', series: 'yuan', subgroup: '基础', cn: '榛果油', en: 'Hazelnut Carrier Oil', latinName: 'Corylus avellana', origin: '英国', prices: ['¥68/30ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-B-032', series: 'yuan', subgroup: '基础', cn: '仙人掌籽油', en: 'Prickly Pear Seed Oil', latinName: 'Opuntia Ficus-indica', origin: '摩洛哥', prices: ['¥3558/30ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-B-033', series: 'yuan', subgroup: '基础', cn: '月见草油', en: 'Evening Primrose Oil', latinName: 'Oenothera biennis', origin: '英国', prices: ['¥128/30ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-B-034', series: 'yuan', subgroup: '基础', cn: '乳木果油', en: 'Shea Butter Pure', latinName: 'Butyrospermum parkii', origin: '非洲', prices: ['¥88/30ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-B-035', series: 'yuan', subgroup: '基础', cn: '琉璃苣油', en: 'Borage Seed Oil', latinName: 'Borago officinalis', origin: '英国', prices: ['¥258/30ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-B-036', series: 'yuan', subgroup: '基础', cn: '金盏花油', en: 'Calendula Macerated', latinName: 'Calendula officinalis', origin: '印度', prices: ['¥228/30ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-B-037', series: 'yuan', subgroup: '基础', cn: '坚果油', en: 'Macadamia Nut Oil', latinName: 'Macadamia ternifolia', origin: '澳洲', prices: ['¥98/30ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-B-038', series: 'yuan', subgroup: '基础', cn: '纯橄榄油', en: 'Pure Olive Carrier', latinName: 'Olea europaea', origin: '英国', prices: ['¥78/30ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-B-039', series: 'yuan', subgroup: '基础', cn: '圣约翰草油', en: 'St John Wort Infused', latinName: 'Hypericum perforatum', origin: '澳洲', prices: ['¥198/30ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },

  // --- 合系列 (Harmony Blends) ---
  // 身体 (Body)
  { code: 'H-B-201', series: 'he', subgroup: '身体', cn: '云感霜-弹润淡纹面霜', en: 'Cloud Touch Face Cream', origin: '复方系列', prices: ['¥99/15ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600', isFeatured: true },
  { code: 'H-B-202', series: 'he', subgroup: '身体', cn: '润迹膏-唇部指尖修护膏', en: 'Nourishing Lip Balm', origin: '复方系列', prices: ['¥198/15ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'H-B-204', series: 'he', subgroup: '身体', cn: '晨曦液-焕亮醒肤精华水', en: 'Dawn Radiance Water', origin: '复方系列', prices: ['¥258/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'H-B-209', series: 'he', subgroup: '身体', cn: '月华油-夜间修护面部油', en: 'Moonlight Night Oil', origin: '复方系列', prices: ['¥258/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600', isFeatured: true },
  { code: 'H-B-212', series: 'he', subgroup: '身体', cn: '清冽发-头皮平衡精华', en: 'Scalp Balance Essence', origin: '复方系列', prices: ['¥218/50ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },

  // 心智 (Mind)
  { code: 'H-M-203', series: 'he', subgroup: '心智', cn: '归处膏-太阳穴舒缓滚珠', en: 'Temple Relief Balm', origin: '复方系列', prices: ['¥188/10ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'H-M-205', series: 'he', subgroup: '心智', cn: '微光氛-暖光情绪扩香油', en: 'Warm Light Diffuser Oil', origin: '复方系列', prices: ['¥248/30ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'H-M-210', series: 'he', subgroup: '心智', cn: '听泉露-冥想水相喷雾', en: 'Meditation Spring Mist', origin: '复方系列', prices: ['¥268/30ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'H-M-213', series: 'he', subgroup: '心智', cn: '深吸瓶-便携呼吸舒压吸入棒', en: 'Breathing Relief Inhaler', origin: '复方系列', prices: ['¥168/10ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'H-M-214', series: 'he', subgroup: '心智', cn: '止语雾-办公静心空间喷雾', en: 'Quiet Office Space Mist', origin: '复方系列', prices: ['¥218/100ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600', isFeatured: true },

  // 灵魂 (Soul)
  { code: 'H-L-206', series: 'he', subgroup: '灵魂', cn: '无界油-深度冥想复方油', en: 'Boundaryless Meditation', origin: '复方系列', prices: ['¥358/30ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600', isFeatured: true },
  { code: 'H-L-207', series: 'he', subgroup: '灵魂', cn: '破晓珠-晨间觉醒滚珠', en: 'Dawn Awakening Roller', origin: '复方系列', prices: ['¥178/10ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'H-L-208', series: 'he', subgroup: '灵魂', cn: '共振方-呼吸校准复方油', en: 'Breath Alignment Oil', origin: '复方系列', prices: ['¥388/30ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'H-L-211', series: 'he', subgroup: '灵魂', cn: '悬浮露-轻盈气场纯露喷雾', en: 'Floating Aura Mist', origin: '复方系列', prices: ['¥238/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'H-L-215', series: 'he', subgroup: '灵魂', cn: '空寂水-苔藓松针冥想喷雾', en: 'Moss & Pine Zen Mist', origin: '复方系列', prices: ['¥228/100ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },

  // --- 生系列 (Life Hydrosols) ---
  // 清净 (Purify)
  { code: 'S-C-401', series: 'sheng', subgroup: '清净', cn: '薄荷纯露', en: 'Peppermint Hydrosol', latinName: 'Mentha piperita', origin: '美国', prices: ['¥138/100ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'S-C-402', series: 'sheng', subgroup: '清净', cn: '茶树纯露', en: 'Tea Tree Hydrosol', latinName: 'Melaleuca alternifolia', origin: '澳大利亚', prices: ['¥208/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600', isFeatured: true },
  { code: 'S-C-403', series: 'sheng', subgroup: '清净', cn: '迷迭香纯露', en: 'Rosemary Hydrosol', latinName: 'Rosmarinus officinalis', origin: '西班牙', prices: ['¥128/100ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'S-C-404', series: 'sheng', subgroup: '清净', cn: '尤加利纯露', en: 'Eucalyptus Hydrosol', latinName: 'Eucalyptus radiata', origin: '澳大利亚', prices: ['¥138/100ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'S-C-405', series: 'sheng', subgroup: '清净', cn: '金缕梅纯露', en: 'Witch Hazel Hydrosol', latinName: 'Hamamelis virginiana', origin: '北美', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'S-C-407', series: 'sheng', subgroup: '清净', cn: '柠檬马鞭草纯露', en: 'Lemon Verbena Hydrosol', latinName: 'Aloysia triphylla', origin: '摩洛哥', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'S-C-417', series: 'sheng', subgroup: '清净', cn: '马鞭草酮迷迭香纯露', en: 'Verbenone Rosemary Water', latinName: 'Rosmarinus verbenone', origin: '南非', prices: ['¥276/250ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'S-C-418', series: 'sheng', subgroup: '清净', cn: '桉油醇迷迭香纯露', en: 'Cineole Rosemary Hydrosol', latinName: 'Rosmarinus cineole', origin: '突尼斯', prices: ['¥128/100ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'S-C-420', series: 'sheng', subgroup: '清净', cn: '柠檬茶树纯露', en: 'Lemon Tea Tree Hydrosol', latinName: 'Leptospermum petersonii', origin: '澳大利亚', prices: ['¥208/100ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'S-C-424', series: 'sheng', subgroup: '清净', cn: '有机澳洲茶树纯露', en: 'Australian Tea Tree Org', latinName: 'Melaleuca alternifolia', origin: '澳大利亚', prices: ['¥208/100ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'S-C-426', series: 'sheng', subgroup: '清净', cn: '沼泽茶树/菱娜玫瑰纯露', en: 'Rosalina Hydrosol', latinName: 'Melaleuca ericifolia', origin: '澳大利亚', prices: ['¥133/100ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'S-C-431', series: 'sheng', subgroup: '清净', cn: '芬芳茶树(芳枸叶)纯露', en: 'Fragonia Hydrosol', latinName: 'Agonis fragrans', origin: '澳大利亚', prices: ['¥208/100ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },

  // 润养 (Nourish)
  { code: 'S-N-410', series: 'sheng', subgroup: '润养', cn: '乳香纯露', en: 'Frankincense Hydrosol', latinName: 'Boswellia sacra', origin: '阿曼', prices: ['¥108/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'S-N-412', series: 'sheng', subgroup: '润养', cn: '檀香纯露', en: 'Sandalwood Hydrosol', latinName: 'Santalum album', origin: '印度', prices: ['¥208/100ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600', isFeatured: true },
  { code: 'S-N-414', series: 'sheng', subgroup: '润养', cn: '有机大马士革白玫瑰纯露', en: 'White Rose Hydrosol Org', latinName: 'Rosa alba', origin: '保加利亚', prices: ['¥228/100ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600', isFeatured: true },
  { code: 'S-N-415', series: 'sheng', subgroup: '润养', cn: '桂花纯露(金桂)', en: 'Osmanthus Hydrosol', latinName: 'Osmanthus fragrans', origin: '中国', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'S-N-419', series: 'sheng', subgroup: '润养', cn: '小花茉莉纯露', en: 'Sambac Jasmine Water', latinName: 'Jasminum sambac', origin: '中国', prices: ['¥148/100ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'S-N-421', series: 'sheng', subgroup: '润养', cn: '索马里乳香纯露', en: 'Somalia Frankincense Water', latinName: 'Boswellia carterii', origin: '索马里', prices: ['¥108/100ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'S-N-422', series: 'sheng', subgroup: '润养', cn: '格拉斯玫瑰纯露', en: 'Grasse Rose Hydrosol', latinName: 'Rosa centifolia', origin: '中国', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'S-N-425', series: 'sheng', subgroup: '润养', cn: '有机大马士革红玫瑰纯露', en: 'Damask Red Rose Org', latinName: 'Rosa damascena', origin: '保加利亚', prices: ['¥208/100ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'S-N-428', series: 'sheng', subgroup: '润养', cn: '有机天竺葵纯露', en: 'Organic Geranium Water', latinName: 'Pelargonium graveolens', origin: '南非', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'S-N-430', series: 'sheng', subgroup: '润养', cn: '澳洲檀香纯露', en: 'Aussie Sandalwood Water', latinName: 'Santalum spicatum', origin: '澳大利亚', prices: ['¥208/100ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'S-N-432', series: 'sheng', subgroup: '润养', cn: '橙花纯露', en: 'Neroli Blossom Hydrosol', latinName: 'Citrus aurantium', origin: '摩洛哥', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'S-N-433', series: 'sheng', subgroup: '润养', cn: '大马士革玫瑰纯露', en: 'Damask Rose Water', latinName: 'Rosa damascena', origin: '保加利亚', prices: ['¥258/100ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },

  // 舒缓 (Soothe)
  { code: 'S-S-406', series: 'sheng', subgroup: '舒缓', cn: '菩提花纯露', en: 'Linden Blossom Hydrosol', latinName: 'Tilia cordata', origin: '欧洲', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'S-S-411', series: 'sheng', subgroup: '舒缓', cn: '蜡菊纯露', en: 'Helichrysum Hydrosol', latinName: 'Helichrysum italicum', origin: '科西嘉', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'S-S-413', series: 'sheng', subgroup: '舒缓', cn: '矢车菊纯露', en: 'Cornflower Hydrosol', latinName: 'Centaurea cyanus', origin: '欧洲', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'S-S-416', series: 'sheng', subgroup: '舒缓', cn: '有机意大利永久花纯露', en: 'Italian Immortelle Water', latinName: 'Helichrysum Italicum', origin: '保加利亚', prices: ['¥208/100ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'S-S-423', series: 'sheng', subgroup: '舒缓', cn: '有机德国洋甘菊纯露', en: 'German Chamomile Org', latinName: 'Matricaria chamomilla', origin: '保加利亚', prices: ['¥208/100ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'S-S-427', series: 'sheng', subgroup: '舒缓', cn: '有机罗马洋甘菊纯露', en: 'Roman Chamomile Water Org', latinName: 'Anthemis nobilis', origin: '保加利亚', prices: ['¥188/100ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'S-S-429', series: 'sheng', subgroup: '舒缓', cn: '有机薰衣草纯露', en: 'Lavender Water Org', latinName: 'Lavandula angustifolia', origin: '保加利亚', prices: ['¥128/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },

  // --- 香系列 (Scent Space & Zen Objects) ---
  // 香境 (Aroma)
  { code: 'J-A-601', series: 'jing', subgroup: '香境', cn: '扩香石', en: 'Aroma Stone Set', origin: '器物', prices: ['¥428/件'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600', isFeatured: true },
  { code: 'J-A-602', series: 'jing', subgroup: '香境', cn: '芳香链', en: 'Aroma Pendant Necklace', origin: '器物', prices: ['¥398/件'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'J-A-605', series: 'jing', subgroup: '香境', cn: '木核扩', en: 'Wooden Core Diffuser', origin: '器物', prices: ['¥228/件'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'J-A-606', series: 'jing', subgroup: '香境', cn: '精油烛', en: 'Aromatherapy Candle', origin: '器物', prices: ['¥258/件'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'J-A-609', series: 'jing', subgroup: '香境', cn: '雾露器', en: 'Ultrasonic Mist Diffuser', origin: '器物', prices: ['¥188/件'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },

  // 禅思 (Zen)
  { code: 'J-Z-603', series: 'jing', subgroup: '禅思', cn: '清空石', en: 'Clarity Zen Stone', origin: '器物', prices: ['¥198/件'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'J-Z-604', series: 'jing', subgroup: '禅思', cn: '归真座', en: 'Ceramic Zen Base', origin: '器物', prices: ['¥298/件'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600', isFeatured: true },
  { code: 'J-Z-607', series: 'jing', subgroup: '禅思', cn: '一柱香', en: 'Single Incense Stick Set', origin: '器物', prices: ['¥148/件'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'J-Z-608', series: 'jing', subgroup: '禅思', cn: '觉知珠', en: 'Awareness Mala Beads', origin: '器物', prices: ['¥128/10ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'J-Z-610', series: 'jing', subgroup: '禅思', cn: '承露璃', en: 'Dew Collector Glass Vase', origin: '器物', prices: ['¥368/件'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' }
];

export const ALL_PRODUCTS: ProductItem[] = rawCatalogList.map((item, idx) => {
  const seriesMeta = SERIES_META[item.series as SeriesKey];
  return {
    no: idx + 1,
    code: item.code,
    series: item.series as SeriesKey,
    subgroup: item.subgroup,
    cn: item.cn,
    en: item.en,
    latinName: item.latinName,
    origin: item.origin,
    prices: item.prices,
    tag: `${seriesMeta.title.split('·')[0].trim()} · ${item.subgroup}`,
    shortDesc: `${item.cn} (${item.en})，源自${item.origin}。UNIO 元香经典归档产品。`,
    description: `UNIO 元香 ${seriesMeta.title} 体系，秉承 ${seriesMeta.description} 档案编号 ${item.code}。经过规范化 COA 检测与 MSDS 全成分追溯，无化学添加，品质清纯安全。`,
    scentPyramid: { top: '清雅首香', middle: '丰沛主体', base: '沉稳余韵' },
    coaNumber: `COA-${item.code.replace(/-/g, '')}-2026`,
    batchTrace: `UNIO-BATCH-${item.code}-2026A`,
    image: item.image,
    isFeatured: item.isFeatured || false
  };
});
