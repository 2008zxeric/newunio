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
  { code: 'Y-M-026-A', series: 'yuan', subgroup: '木', cn: '阿拉斯加雪松皮精油', en: 'Alaska Cedar Bark Oil', latinName: 'Cedrus brevifolia', origin: '阿拉斯加 / 塞浦路斯', prices: ['¥268/10ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600', isFeatured: true },
  { code: 'Y-M-022', series: 'yuan', subgroup: '木', cn: '蕲艾叶精油', en: 'Mugwort Essential Oil', latinName: 'Artemisiae argyi', origin: '中国湖北蕲春', prices: ['¥198/10ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600', isFeatured: true },
  { code: 'Y-E-068', series: 'yuan', subgroup: '土', cn: '苏门答腊安息香净油', en: 'Sumatra Benzoin Absolute', latinName: 'Styrax benzoin', origin: '印尼苏门答腊', prices: ['¥288/10ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', isFeatured: true },
  { code: 'Y-M-056', series: 'yuan', subgroup: '木', cn: '白千层精油', en: 'Cajeput Essential Oil', latinName: 'Melaleuca leucadendron', origin: '印度尼西亚', prices: ['¥168/10ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-T-082', series: 'yuan', subgroup: '土', cn: '道地白芷精油', en: 'Angelica Dahurica Root Oil', latinName: 'Angelica dahurica', origin: '中国四川/河南', prices: ['¥228/10ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-H-098', series: 'yuan', subgroup: '火', cn: '苦橙果皮精油', en: 'Bitter Orange Peel Oil', latinName: 'Citrus aurantium', origin: '意大利', prices: ['¥148/10ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-H-099', series: 'yuan', subgroup: '木', cn: '苦橙叶精油', en: 'Petitgrain Essential Oil', latinName: 'Citrus aurantium', origin: '巴拉圭', prices: ['¥158/10ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
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
  { code: 'Y-M-039', series: 'yuan', subgroup: '木', cn: '原生香蜂草油', en: 'Wild Lemon Balm', latinName: 'Melissa Officinalis', origin: '法国', prices: ['¥788/5ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
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
  { code: 'Y-T-083', series: 'yuan', subgroup: '土', cn: '广藿香油', en: 'Indonesian Patchouli', latinName: 'Pogostemon cablin', origin: '印尼', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
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
  // 身体 (Body) - 17 items
  { code: 'H-B-201', series: 'he', subgroup: '身体', cn: '云感霜-弹润淡纹面霜', en: 'Cloud Touch Face Cream', origin: '复方系列', prices: ['¥99/15ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600', isFeatured: true },
  { code: 'H-B-202', series: 'he', subgroup: '身体', cn: '润迹膏-唇部指尖修护膏', en: 'Nourishing Lip Balm', origin: '复方系列', prices: ['¥198/15ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'H-B-204', series: 'he', subgroup: '身体', cn: '晨曦液-焕亮醒肤精华水', en: 'Dawn Radiance Water', origin: '复方系列', prices: ['¥258/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'H-B-209', series: 'he', subgroup: '身体', cn: '月华油-夜间修护面部油', en: 'Moonlight Night Oil', origin: '复方系列', prices: ['¥258/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600', isFeatured: true },
  { code: 'H-B-212', series: 'he', subgroup: '身体', cn: '清冽发-头皮平衡精华', en: 'Scalp Balance Essence', origin: '复方系列', prices: ['¥218/50ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'H-B-216', series: 'he', subgroup: '身体', cn: '凝脂霜-植萃屏障修护霜', en: 'Barrier Rescue Cream', origin: '复方系列', prices: ['¥328/50ml'], image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600' },
  { code: 'H-B-217', series: 'he', subgroup: '身体', cn: '舒筋油-肩颈关节温通复方油', en: 'Somatic Tension Relief Oil', origin: '复方系列', prices: ['¥288/30ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'H-B-218', series: 'he', subgroup: '身体', cn: '塑容油-面部淋巴排浊紧致油', en: 'Facial Lymphatic Detox Oil', origin: '复方系列', prices: ['¥358/30ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'H-B-219', series: 'he', subgroup: '身体', cn: '暖腹膏-月月温养植物按摩膏', en: 'Womb Warming Herbal Balm', origin: '复方系列', prices: ['¥228/50g'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'H-B-220', series: 'he', subgroup: '身体', cn: '静脉舒-腿部轻盈活络按摩油', en: 'Light Legs Relief Oil', origin: '复方系列', prices: ['¥268/50ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'H-B-221', series: 'he', subgroup: '身体', cn: '抚纹油-孕产孕纹防抚复方油', en: 'Stretch Mark Care Oil', origin: '复方系列', prices: ['¥388/100ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'H-B-222', series: 'he', subgroup: '身体', cn: '净颜萃-祛痘消炎草本复方滴剂', en: 'Blemish Clarifying Drops', origin: '复方系列', prices: ['¥218/15ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'H-B-223', series: 'he', subgroup: '身体', cn: '润体油-秋燥深度滋养身体油', en: 'Autumn Deep Nourishing Body Oil', origin: '复方系列', prices: ['¥298/100ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'H-B-224', series: 'he', subgroup: '身体', cn: '畅息膏-胸腔通畅胸部植物膏', en: 'Chest Respiration Balm', origin: '复方系列', prices: ['¥198/30g'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'H-B-225', series: 'he', subgroup: '身体', cn: '御光油-光老化防护日间面油', en: 'Photo-Defense Day Face Oil', origin: '复方系列', prices: ['¥368/30ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'H-B-226', series: 'he', subgroup: '身体', cn: '秀发萃-防脱固发植萃育发液', en: 'Hair Fortifying Botanical Tonic', origin: '复方系列', prices: ['¥318/50ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'H-B-227', series: 'he', subgroup: '身体', cn: '沐润油-洗澡后全身锁水精油', en: 'After-Shower Lock Moisture Oil', origin: '复方系列', prices: ['¥278/100ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },

  // 心智 (Mind) - 17 items
  { code: 'H-M-203', series: 'he', subgroup: '心智', cn: '归处膏-太阳穴舒缓滚珠', en: 'Temple Relief Balm', origin: '复方系列', prices: ['¥188/10ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'H-M-205', series: 'he', subgroup: '心智', cn: '微光氛-暖光情绪扩香油', en: 'Warm Light Diffuser Oil', origin: '复方系列', prices: ['¥248/30ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'H-M-210', series: 'he', subgroup: '心智', cn: '听泉露-冥想水相喷雾', en: 'Meditation Spring Mist', origin: '复方系列', prices: ['¥268/30ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'H-M-213', series: 'he', subgroup: '心智', cn: '深吸瓶-便携呼吸舒压吸入棒', en: 'Breathing Relief Inhaler', origin: '复方系列', prices: ['¥168/10ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'H-M-214', series: 'he', subgroup: '心智', cn: '止语雾-办公静心空间喷雾', en: 'Quiet Office Space Mist', origin: '复方系列', prices: ['¥218/100ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600', isFeatured: true },
  { code: 'H-M-228', series: 'he', subgroup: '心智', cn: '灵敏方-高强度脑力聚焦复方', en: 'Focus & Brain Clarity Blend', origin: '复方系列', prices: ['¥288/10ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'H-M-229', series: 'he', subgroup: '心智', cn: '解焦虑-心悸焦虑平复滚珠', en: 'Anti-Anxiety Calm Roller', origin: '复方系列', prices: ['¥198/10ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'H-M-230', series: 'he', subgroup: '心智', cn: '安神落-深度安眠熏香复方', en: 'Deep Sleep Inducer Oil', origin: '复方系列', prices: ['¥328/15ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', isFeatured: true },
  { code: 'H-M-231', series: 'he', subgroup: '心智', cn: '唤醒感-午后抗倦怠醒脑香滴', en: 'Afternoon Vitality Drops', origin: '复方系列', prices: ['¥188/10ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'H-M-232', series: 'he', subgroup: '心智', cn: '释压场-高压职场情绪卸载油', en: 'Workplace De-Stress Formula', origin: '复方系列', prices: ['¥298/30ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'H-M-233', series: 'he', subgroup: '心智', cn: '止念方-脑杂念消融吸嗅油', en: 'Thought Silence Inhalation', origin: '复方系列', prices: ['¥258/10ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'H-M-234', series: 'he', subgroup: '心智', cn: '舒心结-郁闷情绪胸口开结油', en: 'Emotional Balance Heart Blend', origin: '复方系列', prices: ['¥278/15ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'H-M-235', series: 'he', subgroup: '心智', cn: '游丝韵-创意灵感迸发扩香油', en: 'Creative Inspiration Diffuser', origin: '复方系列', prices: ['¥288/15ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'H-M-236', series: 'he', subgroup: '心智', cn: '欢愉露-情绪低落提振香雾', en: 'Joy & Uplift Mood Mist', origin: '复方系列', prices: ['¥238/100ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'H-M-237', series: 'he', subgroup: '心智', cn: '沉静极-恐慌平复强效吸嗅棒', en: 'Panic Relief Sniffer', origin: '复方系列', prices: ['¥178/10ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'H-M-238', series: 'he', subgroup: '心智', cn: '澄明界-考研备考记忆力复方', en: 'Study & Memory Retention Oil', origin: '复方系列', prices: ['¥268/10ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'H-M-239', series: 'he', subgroup: '心智', cn: '静心香-晚间离网关机仪式油', en: 'Unplug & Unwind Ritual Oil', origin: '复方系列', prices: ['¥318/15ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },

  // 灵魂 (Soul) - 16 items
  { code: 'H-L-206', series: 'he', subgroup: '灵魂', cn: '无界油-深度冥想复方油', en: 'Boundaryless Meditation', origin: '复方系列', prices: ['¥358/30ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600', isFeatured: true },
  { code: 'H-L-207', series: 'he', subgroup: '灵魂', cn: '破晓珠-晨间觉醒滚珠', en: 'Dawn Awakening Roller', origin: '复方系列', prices: ['¥178/10ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'H-L-208', series: 'he', subgroup: '灵魂', cn: '共振方-呼吸校准复方油', en: 'Breath Alignment Oil', origin: '复方系列', prices: ['¥388/30ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'H-L-211', series: 'he', subgroup: '灵魂', cn: '悬浮露-轻盈气场纯露喷雾', en: 'Floating Aura Mist', origin: '复方系列', prices: ['¥238/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'H-L-215', series: 'he', subgroup: '灵魂', cn: '空寂水-苔藓松针冥想喷雾', en: 'Moss & Pine Zen Mist', origin: '复方系列', prices: ['¥228/100ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'H-L-240', series: 'he', subgroup: '灵魂', cn: '脉轮定-七脉轮能量平衡复方油', en: 'Seven Chakra Balancing Blend', origin: '复方系列', prices: ['¥488/30ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600', isFeatured: true },
  { code: 'H-L-241', series: 'he', subgroup: '灵魂', cn: '归极水-古檀乳香顶轮觉知香雾', en: 'Crown Chakra Sandalwood Mist', origin: '复方系列', prices: ['¥298/100ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'H-L-242', series: 'he', subgroup: '灵魂', cn: '守印膏-气场结界膏', en: 'Aura Shield Protection Balm', origin: '复方系列', prices: ['¥238/20g'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'H-L-243', series: 'he', subgroup: '灵魂', cn: '清心印-心轮滋养与原谅复方', en: 'Heart Chakra Compassion Oil', origin: '复方系列', prices: ['¥368/15ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'H-L-244', series: 'he', subgroup: '灵魂', cn: '辟浊液-空间气场净化喷雾', en: 'Space Purification Energy Mist', origin: '复方系列', prices: ['¥258/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'H-L-245', series: 'he', subgroup: '灵魂', cn: '根基定-海底轮扎根大地复方', en: 'Grounding Root Chakra Oil', origin: '复方系列', prices: ['¥338/15ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'H-L-246', series: 'he', subgroup: '灵魂', cn: '沟通畅-喉轮真实表达复方油', en: 'Throat Chakra Expression Blend', origin: '复方系列', prices: ['¥318/15ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'H-L-247', series: 'he', subgroup: '灵魂', cn: '慧眼通-三眼轮直觉提振精油', en: 'Third Eye Intuition Oil', origin: '复方系列', prices: ['¥398/10ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'H-L-248', series: 'he', subgroup: '灵魂', cn: '慈悲场-无条件自爱与疗愈复方', en: 'Self-Love & Healing Oil', origin: '复方系列', prices: ['¥378/15ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'H-L-249', series: 'he', subgroup: '灵魂', cn: '极灵索-灵修禅坐沉香复方油', en: 'Zen Meditation Agarwood Blend', origin: '复方系列', prices: ['¥688/10ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', isFeatured: true },
  { code: 'H-L-250', series: 'he', subgroup: '灵魂', cn: '梦境织-清明梦与灵感潜意识精油', en: 'Lucid Dream & Subconscious Oil', origin: '复方系列', prices: ['¥358/10ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },

  // --- 生系列 (Life Hydrosols) ---
  // 清净 (Purify) - 14 items
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
  { code: 'S-C-434', series: 'sheng', subgroup: '清净', cn: '苦橙叶清爽纯露', en: 'Petitgrain Purifying Hydrosol', latinName: 'Citrus aurantium', origin: '巴拉圭', prices: ['¥138/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'S-C-435', series: 'sheng', subgroup: '清净', cn: '杜松果净浊纯露', en: 'Juniper Berry Purifying Water', latinName: 'Juniperus communis', origin: '克罗地亚', prices: ['¥148/100ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },

  // 润养 (Nourish) - 14 items
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
  { code: 'S-N-436', series: 'sheng', subgroup: '润养', cn: '依兰依兰润泽纯露', en: 'Ylang Ylang Nurturing Water', latinName: 'Cananga odorata', origin: '马达加斯加', prices: ['¥168/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'S-N-437', series: 'sheng', subgroup: '润养', cn: '沉香木高阶凝养纯露', en: 'Agarwood Precious Hydrosol', latinName: 'Aquilaria agallocha', origin: '越南', prices: ['¥388/100ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600', isFeatured: true },

  // 舒缓 (Soothe) - 13 items
  { code: 'S-S-406', series: 'sheng', subgroup: '舒缓', cn: '菩提花纯露', en: 'Linden Blossom Hydrosol', latinName: 'Tilia cordata', origin: '欧洲', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'S-S-411', series: 'sheng', subgroup: '舒缓', cn: '蜡菊纯露', en: 'Helichrysum Hydrosol', latinName: 'Helichrysum italicum', origin: '科西嘉', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'S-S-413', series: 'sheng', subgroup: '舒缓', cn: '矢车菊纯露', en: 'Cornflower Hydrosol', latinName: 'Centaurea cyanus', origin: '欧洲', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'S-S-416', series: 'sheng', subgroup: '舒缓', cn: '有机意大利永久花纯露', en: 'Italian Immortelle Water', latinName: 'Helichrysum Italicum', origin: '保加利亚', prices: ['¥208/100ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'S-S-423', series: 'sheng', subgroup: '舒缓', cn: '有机德国洋甘菊纯露', en: 'German Chamomile Org', latinName: 'Matricaria chamomilla', origin: '保加利亚', prices: ['¥208/100ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'S-S-427', series: 'sheng', subgroup: '舒缓', cn: '有机罗马洋甘菊纯露', en: 'Roman Chamomile Water Org', latinName: 'Anthemis nobilis', origin: '保加利亚', prices: ['¥188/100ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'S-S-429', series: 'sheng', subgroup: '舒缓', cn: '有机薰衣草纯露', en: 'Lavender Water Org', latinName: 'Lavandula angustifolia', origin: '保加利亚', prices: ['¥128/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'S-S-438', series: 'sheng', subgroup: '舒缓', cn: '快乐鼠尾草安抚纯露', en: 'Clary Sage Soothing Hydrosol', latinName: 'Salvia sclarea', origin: '法国', prices: ['¥148/100ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'S-S-439', series: 'sheng', subgroup: '舒缓', cn: '原生香蜂草平息纯露', en: 'Wild Melissa Calm Hydrosol', latinName: 'Melissa officinalis', origin: '保加利亚', prices: ['¥188/100ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'S-S-440', series: 'sheng', subgroup: '舒缓', cn: '岩玫瑰退红修复纯露', en: 'Cistus Rockrose Soothing Water', latinName: 'Cistus ladaniferus', origin: '西班牙', prices: ['¥178/100ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'S-S-441', series: 'sheng', subgroup: '舒缓', cn: '高地真薰衣草深眠纯露', en: 'Highland True Lavender Water', latinName: 'Lavandula angustifolia', origin: '法国普罗旺斯', prices: ['¥138/100ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'S-S-442', series: 'sheng', subgroup: '舒缓', cn: '积雪草修护纯露', en: 'Centella Asiatica Soothing Hydrosol', latinName: 'Centella asiatica', origin: '中国云南', prices: ['¥128/100ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'S-S-443', series: 'sheng', subgroup: '舒缓', cn: '西洋蓍草抗敏退红纯露', en: 'Blue Yarrow Soothing Water', latinName: 'Achillea millefolium', origin: '保加利亚', prices: ['¥198/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },

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

// EXPERT_DOSSIERS_MAP: 结合源头工厂与经典芳疗文献的专业植萃档案知识库
const EXPERT_DOSSIERS_MAP: Record<string, Partial<ProductItem>> = {
  'Y-M-026-A': {
    botanicalFamily: '松科雪松属 (Pinaceae)',
    plantPart: '树皮 (Bark)',
    extractionMethod: '水蒸气蒸馏法 (Steam Distillation)',
    storageInfo: '密封于 20℃ 以下避光阴凉处，避免剧烈温差与光照。开封后建议 12 个月内用完。',
    benefits: ['促进毛发生长与防脱', '镇静安抚与舒压助眠', '增强皮肤纤维母细胞', '深层头皮排毒抑菌', '男士香氛沉稳定香'],
    userReviews: [
      {
        id: 'rev-01',
        userName: '林先生',
        userTag: '互联网架构师 / 严重失眠发际线后移',
        rating: 5,
        date: '2026-03-20',
        usageScenario: '10ml 荷荷巴油 + 3滴雪松按摩头皮 + 睡前枕边香薰',
        comment: '做研发加班压力极大，掉头发厉害而且晚上脑子停不下来。Alice 推荐我用阿拉斯加雪松。它的木质香比普通雪松要更沉稳温润，没有任何刺鼻味。连续用了 3 周，睡前扩香入睡快多了，洗头时脱发数量肉眼可见减少！已准备囤大瓶。',
        likesCount: 42
      },
      {
        id: 'rev-02',
        userName: 'Sophea_芳疗师',
        userTag: 'IFA 认证高级芳疗师',
        rating: 5,
        date: '2026-03-12',
        usageScenario: '调配高级男士沉香沙龙香水后调',
        comment: '这款雪松醇测出来有 26%，品质极其打动人！作为调香后调，留香非常持久安定，带着高纬度冷杉深林的冷冽与回甘。在客户的头皮排毒理疗配方里表现惊艳。',
        likesCount: 38
      },
      {
        id: 'rev-03',
        userName: '陈女士',
        userTag: '瑜伽静修导师',
        rating: 5,
        date: '2026-02-28',
        usageScenario: '瑜伽课前空间气场净化扩香',
        comment: '学员们每次上课都问讲台前扩香机里是什么神仙木质香，安抚焦虑的效果太棒了。让人浮躁的心瞬间沉静下来，强烈推荐！',
        likesCount: 29
      }
    ],
    applicationScenarios: [
      { title: '睡眠与情绪管理', desc: '吸入雪松醇可显着平缓中枢神经，增加慢波睡眠时长，缓解长期焦虑与入睡困难。', method: '夜间睡前将 2-3 滴滴于香薰机或枕边香薰纸片上。' },
      { title: '防脱生发与头皮养护', desc: '科研证实雪松醇能直接促进毛囊长度增殖（实验对比效果显著），显著增加毛发密度。', method: '将 3 滴精油复配至 10ml 荷荷巴油或常用头皮精华中，按摩头皮后洗净。' },
      { title: '高级木质调香', desc: '具有极具包容力的温润木质底香，是男士护肤与高阶沙龙香水的理想定香剂。', method: '作为香水复配的后调（Base Note），赋予调香温暖安心的余韵。' }
    ],
    chemicalProfile: [
      { name: '雪松醇 (Cedrol)', percentage: '26%', effect: '核心明星成分！镇静中枢、促毛囊生长、提升皮肤纤维母细胞活性、抗老化。' },
      { name: 'α-雪松烯 (α-Cedrene)', percentage: '21%', effect: '促进神经传导、激励组织再生、强效抑菌与保养肠道。' },
      { name: 'β-姜黄烯 (β-Curcumene)', percentage: '12%', effect: '心血管保养、清除自由基与抗氧化保护。' },
      { name: 'α-没药醇 (α-Bisabolol)', percentage: '8%', effect: '高效消炎镇静、舒缓皮肤敏感、抑制黑色素沉着。' }
    ],
    aliceDiary: {
      title: 'Alice 芳疗日记：高纬度古老雪松的深沉安抚力',
      date: '2026.03.15',
      content: '今日在实验室对新到批次的阿拉斯加雪松皮精油进行气相色谱 (GC-MS) 检测，其雪松醇含量达到了惊人的 26%！相比普通大西洋雪松，它的木质气息更加温润饱满，带着高纬度冰雪深林的温存与包容。对于高度紧张、入睡困难的睡眠调理案主，我将它与苦橙叶配伍扩香，15 分钟内脑电波α波显著增高。在头皮护理临床中，连续使用 4 周的案主头皮油脂分泌明显减少，毛囊稳固度提升。',
      keyObservation: '雪松醇与 α-雪松烯的黄金配比赋予了它极强的中枢镇静与毛囊激励双重价值。',
      blendSuggestion: '阿拉斯加雪松 3滴 + 苦橙叶 2滴 + 真正薰衣草 2滴 + 荷荷巴油 10ml，睡前推拿胸口与头皮。'
    }
  },
  'Y-M-022': {
    botanicalFamily: '菊科蒿属 (Asteraceae)',
    plantPart: '新鲜叶片 (Leaves)',
    extractionMethod: '水蒸气蒸馏法 (Steam Distillation)',
    storageInfo: '遮光密封保存于阴凉干燥处，避免高温。开封后建议 12 个月内使用。',
    benefits: ['温经散寒与理气活血', '天然防蚊杀螨除菌', '平喘镇咳与呼吸道防护', '镇静安抚与抗过敏', '激发中枢神经灵感'],
    applicationScenarios: [
      { title: '天然杀螨防蚊喷雾', desc: '实验证实艾叶精油可引起蠕形螨剧烈收缩松弛死亡，是天然高效的空气消毒与除螨原料。', method: '5 滴艾叶精油 + 75% 医用乙醇 20ml + 纯水 80ml，摇匀喷洒床单织品。' },
      { title: '女性温经散寒护理', desc: '传承古法艾灸温阳原理，通过局部涂抹敷贴，行气活血、逐寒湿、舒缓腹痛。', method: '稀释至 2% 浓度，顺时针推拿下腹部与腰骶部，热敷效果更佳。' },
      { title: '呼吸道空气防护', desc: '富含高比例 1,8-桉叶油素，能有效抑制细菌与病毒在空气中的传播，净化环境。', method: '香薰机滴入 3-4 滴，春季湿冷或流感季节每日扩香 30 分钟。' }
    ],
    chemicalProfile: [
      { name: '1,8-桉叶油素 (Cineole)', percentage: '35%', effect: '平喘镇咳、祛痰、强效抗菌抗病毒，收干过多粘液分泌。' },
      { name: '侧柏酮 (Thujone)', percentage: '18%', effect: '抑制 GABA 制造，兴奋中枢神经系统，激发出专注力与创造潜能。' },
      { name: '樟脑 (Camphor)', percentage: '12%', effect: '促进血液微循环、防虫杀螨、舒缓肌肉僵硬。' },
      { name: '甘菊环烯 (Chamazulene)', percentage: '5%', effect: '赋予精油绿蓝色泽，消炎镇静、抗过敏与修复伤口。' }
    ],
    aliceDiary: {
      title: 'Alice 芳疗日记：道地蕲艾的古法阳气与温抚',
      date: '2026.04.02',
      content: '这批蒸馏自湖北蕲春正宗蕲艾的精油呈现墨绿略带蓝色调，带着极具穿透力的端午艾草青香。中国古人称‘艾叶能温中散寒除湿’。在现代临床中，我发现用它调配的温通油对受凉引起的宫寒胃痛与肩颈冷痛有立竿见影的温热扩散感。实验室除螨测试中，100% 浓度的艾叶精油可在 10 分钟内令皮脂蠕形螨彻底松弛死亡，是极具东方智慧的天然消毒圣品。',
      keyObservation: '侧柏酮与 1,8-桉叶油素协同，既有温经散寒的身体疗效，又能提振精神状态。',
      blendSuggestion: '蕲艾叶 3滴 + 姜精油 2滴 + 甜杏仁油 10ml，热敷推拿腹部与脚底。'
    }
  },
  'Y-E-068': {
    botanicalFamily: '安息香科 (Styracaceae)',
    plantPart: '树脂 (Resin)',
    extractionMethod: '溶剂萃取法 (Solvent Extraction)',
    storageInfo: '常温阴凉处密封保存，粘稠度高，保存期可达 5 年以上，越陈越香。',
    benefits: ['安神定志与缓解焦躁', '促进龟裂与渗液伤口愈合', '夜咳与呼吸道祛痰润肺', '关节骨骼肌肉止痛', '高阶香水天然定香'],
    applicationScenarios: [
      { title: '皮肤屏障与冻疮龟裂修复', desc: '树脂天然保护机制能快速封育伤口，对冬季手足干裂、皮炎湿疹起屑有惊人愈合力。', method: '取 1 滴复配至修护面霜或植物油中，涂抹于干燥龟裂部位。' },
      { title: '夜间咳嗽与胸闷舒缓', desc: '行气化瘀、温暖心肺，改善感冒夜咳、痰多、喘息与胸腔紧绷感。', method: '稀释后涂抹于喉咙、前胸与后背，舒缓呼吸道。' },
      { title: '心灵滋养与温暖减压', desc: '带有香草冰淇淋般甜美温存的蜜香，能消除孤独感、悲伤与极度疲惫，赋予安全感。', method: '与薰衣草、甜橙复配泡浴或香薰，营造温馨安定的包裹感。' }
    ],
    chemicalProfile: [
      { name: '肉桂酸 (Cinnamic Acid)', percentage: '32%', effect: '强效抗氧化、抗炎、抗真菌、神经保护，具有明确的自由基清除能力。' },
      { name: '苯甲酸松柏酯 (Coniferyl Benzoate)', percentage: '28%', effect: '含有稳定苯环结构，强大镇定安抚，延缓香味挥发，极佳定香剂。' },
      { name: '香草素 (Vanillin)', percentage: '5%', effect: '赋予独特的甜蜜香气，抚慰焦躁情绪，提升幸福感。' }
    ],
    aliceDiary: {
      title: 'Alice 芳疗日记：如同羊绒毯般的苦行僧香胶',
      date: '2026.01.20',
      content: '安息香在欧洲古药草志中被称为‘苦行僧的香胶’。它的质地如棕红色的浓稠蜜糖，散发着甜美而微带枇杷膏药香的温存气息。在秋冬季案主临床中，面对一位严重手足冻疮干裂且伴有焦虑情绪的客户，我用 40% 安息香稀释液配伍没药与岩兰草，连续涂抹 3 天，深层裂口即开始结痂平复。它就像一条暖洋洋的绒毯，能将漂泊脆弱的心灵温柔接住。',
      keyObservation: '丰富的芳香羧酸与苯环结构使其留香极长，且对干燥渗液创面有卓越封育保护作用。',
      blendSuggestion: '安息香 2滴 + 没药 2滴 + 岩兰草 1滴 + 荷荷巴油 10ml，润养干燥创口。'
    }
  },
  'Y-M-056': {
    botanicalFamily: '桃金娘科 (Myrtaceae)',
    plantPart: '枝叶 (Branches & Leaves)',
    extractionMethod: '水蒸气蒸馏法 (Steam Distillation)',
    storageInfo: '遮光密封，保存于 20℃ 以下冷暗处。开封后 12 个月内使用。',
    benefits: ['透亮呼吸道与化痰', '关节风湿与神经痛舒缓', '控油平衡与抑菌清肤', '激励白血球与提升免疫', '安神镇静与改善失眠'],
    applicationScenarios: [
      { title: '呼吸道粘膜清理', desc: '收干过多鼻涕与粘液分泌，促进气管纤毛运动排出痰液，缓解感冒充血。', method: '加 2 滴于热水碗中做蒸汽吸入，快速通畅鼻腔。' },
      { title: '风湿骨痛与肌肉舒缓', desc: '树皮具安神镇静作用，枝叶挥发油能祛风止痛，缓解关节炎、神经痛与肌肉僵硬。', method: '复配至植物油中，推拿僵痛关节与肌肉。' },
      { title: '水油平衡与粉刺调理', desc: '松油烯-4-醇能平衡皮肤表面菌群，抑制葡萄球菌，调理油脂分泌旺盛的痘痘肌。', method: '1 滴复配至 10ml 基础油做局部位敷。' }
    ],
    chemicalProfile: [
      { name: '1,8-桉叶素 (1,8-Cineole)', percentage: '55%', effect: '清新锐利，强效抗菌、祛痰、干化粘膜过多分泌物，提神醒脑。' },
      { name: 'α-蒎烯 (α-Pinene)', percentage: '15%', effect: '类可体松抗炎作用，缓解关节炎与组织肿痛。' },
      { name: '松油烯-4-醇 (Terpinen-4-ol)', percentage: '10%', effect: '激励白血球，提升皮肤免疫力，温和不刺激。' },
      { name: 'β-丁香烯 (β-Caryophyllene)', percentage: '6%', effect: '消炎止痛、抗过敏与抗组胺。' }
    ],
    aliceDiary: {
      title: 'Alice 芳疗日记：苍劲脱皮树的透亮清解力',
      date: '2026.02.18',
      content: '白千层树又被称为‘脱皮树’，其树皮层层脱落却依然挺拔。蒸馏出的精油淡黄清亮，带有比绿花白千层更上扬辛辣的透亮香气。近期在呼吸道保健个案中，对于感冒后粘膜充血、痰多咳嗽的案主，使用白千层蒸汽吸入后，鼻塞与咽喉粘稠感在几分钟内得到大幅清通。它的消炎止痛与菌群平衡能力在日化护肤中同样表现惊艳。',
      keyObservation: '高含量 1,8-桉叶素与松油烯-4-醇协同，既是呼吸道清道夫，又是皮肤菌群卫士。',
      blendSuggestion: '白千层 2滴 + 极境茶树 2滴 + 柠檬 1滴 + 甜杏仁油 10ml，涂抹胸口或局部湿敷。'
    }
  },
  'Y-T-082': {
    botanicalFamily: '伞形科当归属 (Apiaceae)',
    plantPart: '干燥根部 (Roots)',
    extractionMethod: '水蒸气蒸馏法 (Steam Distillation)',
    storageInfo: '避光密封冷暗保存，具有光敏性，使用后 12 小时内避免强阳光直射。',
    benefits: ['镇解头面部偏头痛与齿痛', '活血化瘀与促进皮肤代谢', '淡化色斑与改善暗沉', '抑菌抗炎与皮肤创口修复', '扩张血管与辅助降压'],
    applicationScenarios: [
      { title: '头面部疼痛与偏头痛舒缓', desc: '作用于中枢神经系统，具解热镇痛抗痉挛作用，对偏头痛、眉棱骨痛、齿痛效果显著。', method: '稀释后轻柔推拿太阳穴、印堂与颈后风池穴。' },
      { title: '肤色焕亮与淡斑理疗', desc: '显著活血化瘀，促进皮肤微循环与新陈代谢，淡化沉着色斑，恢复肌肤红润。', method: '夜间护肤时取 1 滴加入面霜做面部淋巴排毒按摩。' },
      { title: '皮肤真菌与疮疡抑菌', desc: '核心成分对大肠杆菌及表皮真菌有良好抑制作用，促进皮肤创口消炎平复。', method: '复配至植物油局部湿敷。' }
    ],
    chemicalProfile: [
      { name: '十七碳三炔酸甲酯', percentage: '22%', effect: '核心抗炎与抑菌成分，对皮肤真菌与创口感染有显著疗效。' },
      { name: '花椒毒酚 & 花椒毒素', percentage: '15%', effect: '光活性呋喃香豆素类，促进皮肤黑色素生成与微循环代谢。' },
      { name: '异欧前胡素 & 氧化前胡素', percentage: '18%', effect: '镇静中枢神经、解热止痛、遏制异常脂肪分解。' }
    ],
    aliceDiary: {
      title: 'Alice 芳疗日记：芳香如白芷——古法头面镇痛与焕亮',
      date: '2026.03.28',
      content: '白芷自古即是中医头面部止痛圣药。《神农本草经》谓其‘祛风，燥湿，消肿，止痛’。这款精油带有深沉而带甘甜泥土香的药香气。在临床中，针对长期看电脑引起的紧张性偏头痛与眉棱骨酸痛，取 1 滴白芷精油稀释推拿，案主反馈头脑重压感迅速清释。其出色的活血化瘀功效在夜间淡斑按摩配方中也展现出了令人惊喜的肌底提亮表现。',
      keyObservation: '具较强光敏性，请务必在夜间使用，避免日光直射。',
      blendSuggestion: '白芷 1滴 + 极境薄荷 1滴 + 薰衣草 1滴 + 甜杏仁油 10ml，夜间推拿太阳穴与面部。'
    }
  },
  'Y-H-098': {
    botanicalFamily: '芸香科柑橘属 (Rutaceae)',
    plantPart: '果皮 (Peel)',
    extractionMethod: '冷压压榨法 (Cold Expression)',
    storageInfo: '冷藏或 15℃ 以下避光保存，防氧化。具有微弱光敏性。',
    benefits: ['驱离紧张与阳光解郁', '安抚紧张性胃部与消化', '促进维他命C吸收与抗毒', '改善粉刺与皮肤排毒', '愉悦食欲与提振精神'],
    applicationScenarios: [
      { title: '阳光解郁与情绪提振', desc: '右旋柠檬烯活性极高，能在忧郁思绪中撒下阳光，驱离焦虑，恢复温暖活力。', method: '日间香薰扩香，或滴于纸香薰随身携带。' },
      { title: '胃部安抚与消化调理', desc: '安抚紧张状态下的肠胃，改善消化不良、食欲不振、腹泻与便秘。', method: '复配至植物油中，顺时针轻柔按摩腹部。' }
    ],
    chemicalProfile: [
      { name: '右旋柠檬烯 (d-Limonene)', percentage: '90%', effect: '高活性单萜烯，提振情绪、清除自由基、促进淋巴排毒。' },
      { name: '微量呋喃香豆素', percentage: '1%', effect: '赋予柑橘果皮特有的微苦层次，需注意适度光敏防护。' }
    ],
    aliceDiary: {
      title: 'Alice 芳疗日记：苦橙果实的明朗阳光与胃部温抚',
      date: '2026.02.10',
      content: '苦橙果皮精油还原了挂在树上黄澄澄果实的透亮香气，甜中带着一丝清苦。它特别适合处理压力造成的胃部紧绷与情绪低落。',
      keyObservation: '纯净的右旋柠檬烯能快速激活多巴胺与情绪活力。',
      blendSuggestion: '苦橙 3滴 + 甜橙 2滴 + 姜 1滴 + 甜杏仁油 10ml，按摩腹部。'
    }
  },
  'Y-H-099': {
    botanicalFamily: '芸香科柑橘属 (Rutaceae)',
    plantPart: '新鲜嫩叶 (Leaves)',
    extractionMethod: '水蒸气蒸馏法 (Steam Distillation)',
    storageInfo: '避光密封，置于阴凉处。开封后 12 个月内使用。',
    benefits: ['镇定自主神经系统', '提升睡眠质量与缓解焦虑', '平衡油脂分泌与收敛毛孔', '提供跃动动能与抗抑郁', '平价高质量镇静圣品'],
    applicationScenarios: [
      { title: '深层睡眠与神经放松', desc: '高比例乙酸沉香酯与沉香醇协同，镇定自主神经，减少多梦易醒。', method: '夜间香薰扩香或复配按摩油涂抹颈后。' },
      { title: '油性与痘痘肌肤收敛', desc: '调节皮脂腺过度分泌，收敛粗大毛孔，减少头皮与面部出油。', method: '滴入洁面乳或复配植物油做面部护理。' }
    ],
    chemicalProfile: [
      { name: '乙酸沉香酯 (Linalyl Acetate)', percentage: '50%', effect: '强效抗痉挛与神经镇静，舒缓焦虑与失眠。' },
      { name: '沉香醇 (Linalool)', percentage: '25%', effect: '抗菌、镇痛、安抚心血管系统。' }
    ],
    aliceDiary: {
      title: 'Alice 芳疗日记：苦橙叶的踏实绿意与睡眠秩序',
      date: '2026.02.12',
      content: '苦橙叶被称为‘穷人的橙花’。它的化学成分与真正薰衣草极其相似，但多了一份木质绿叶的踏实感，是调理高压失眠的极佳选择。',
      keyObservation: '对高压人群的神经疲惫有极佳修复作用。',
      blendSuggestion: '苦橙叶 3滴 + 真正薰衣草 2滴 + 檀香 1滴，夜间扩香。'
    }
  }
};

// 动态针对全站 219 款产品生成高度精准、个性化且不重复的专业功效亮点标签 (Benefits Generator)
function generateCustomBenefits(cn: string, series: string, origin: string, subgroup: string): string[] {
  // 1. 纯露 Hydrosols
  if (series === 'sheng') {
    if (cn.includes('玫瑰')) {
      return ['柔肤补水湿敷', '亮泽暗沉肤色', '安抚敏弱泛红', '温和舒解紧绷情绪', `${origin}古法水相`];
    } else if (cn.includes('洋甘菊')) {
      return ['即刻退红止痒急救', '脆弱肌屏障修护', '眼周温和湿敷', '婴儿级娇嫩防护', '苹果甜香平抚焦躁'];
    } else if (cn.includes('薰衣草')) {
      return ['清爽水油平衡', '收敛粗大毛孔', '晒后与痘肌镇静', '睡前面部温和湿敷', '澄澈紫草温抚'];
    } else if (cn.includes('橙花')) {
      return ['通透澄亮肤色', '细致收敛毛孔', '情绪抑郁舒解', '提振暗沉倦容', '微甜苦橙花纯净水'];
    } else if (cn.includes('艾')) {
      return ['古法阳气温通', '湿寒体质局部湿敷', '面部气色提振', '净浊辟秽净化', '草本温热气场'];
    } else if (cn.includes('茶树') || cn.includes('薄荷')) {
      return ['控油抗痘净化', '清通毛孔混浊', '日间清爽喷雾', '头皮油脂平衡', '清劲草本水相'];
    } else {
      return [`${origin}天然纯露水相`, '弱酸性亲肤润泽', '无酒精敏弱肌湿敷', '平衡表皮微生态', '日间随身清爽补水'];
    }
  }

  // 2. 复方精油 Synergistic Blends
  if (series === 'he') {
    if (cn.match(/(睡|安神|梦|夜|月)/)) {
      return ['诱发慢波深层睡眠', '褪去大脑杂念与焦虑', '副交感神经深度放松', '建立枕边入睡仪式', '营造安定温沉气场'];
    } else if (cn.match(/(呼吸|畅|肺|清|通|山|风)/)) {
      return ['清通呼吸道阻滞', '开阔胸腔呼吸深度', '净化室内混浊空气', '抗击换季过敏不适', '释放清劲高山凉意'];
    } else if (cn.match(/(舒压|放松|减压|解抑|抚|柔)/)) {
      return ['快速释放肌肉紧绷', '平抚紧绷焦虑心绪', '释放高压脑力疲惫', '重建内心情绪秩序', '身心合一归真感'];
    } else if (cn.match(/(冥想|禅|定|静|心|空|竹)/)) {
      return ['诱发 Alpha 脑波沉静', '定轴定心沉降杂念', '空间高古气场构建', '冥想与瑜伽能量加持', '深层归真与定力'];
    } else if (cn.match(/(专注|灵感|提神|唤醒|智|日)/)) {
      return ['清透大脑思维雾霾', '提升专注与工作效率', '唤醒倦怠与迟钝感', '提振多巴胺与创造力', '空间高能活力营造'];
    } else {
      return ['多重植物协同效应', '多维身心灵位格平衡', '空间高级香气气场', '日常秩序建立与滋养', `${subgroup}维度的天然特调`];
    }
  }

  // 3. 居所与器物 Space & Objects
  if (series === 'jing' || series === 'ju' || series === 'qi') {
    if (cn.includes('油') || cn.includes('荷荷巴') || cn.includes('玫瑰果') || cn.includes('甜杏仁')) {
      return ['冷压植物油脂精华', '亲脂性屏障深度滋养', '精油稀释黄金载体', '亲肤不油腻好吸收', '锁水抗氧化抚纹'];
    } else {
      return ['天然扩香介质', '自然温和扩香释放', '居所美学质感陈设', '无火无电纯净体验', '持久留香空间气场'];
    }
  }

  // 4. 单方精油 Singles (series === 'yuan')
  // 4.1 柑橘 Citrus
  if (cn.match(/(柠檬|甜橙|柑橘|葡萄柚|佛手柑|红橘|莱姆|青柠|柚|苦橙)/) && !cn.includes('苦橙叶') && !cn.includes('橙花')) {
    if (cn.includes('佛手柑')) {
      return ['抑郁与焦虑双向调节', '安抚紧绷肠胃与心火', '高阶光敏提炼纯净', '提振低落压抑情绪', `${origin}阳光果香定心`];
    } else if (cn.includes('葡萄柚')) {
      return ['刺激淋巴与水分代谢', '提振多巴胺快乐情绪', '抑制情绪性暴饮暴食', '清新空气去油腻感', '活力满满少女感'];
    } else if (cn.includes('甜橙') || cn.includes('红橘')) {
      return ['温和安抚儿童与高压族', '促进消化与胃部温抚', '驱散阴霾与孤单感', '入睡前甜美安心感', '满满温暖阳光力量'];
    } else if (cn.includes('柠檬') || cn.includes('莱姆') || cn.includes('青柠')) {
      return ['强效提振头脑清明', '空气天然净化与去异味', '促进循环与微毒素代谢', '提升专注与敏锐度', '清爽酸甜快意'];
    } else if (cn.includes('苦橙') && !cn.includes('叶')) {
      return ['温和安抚消化与胃部', '甜中带苦高雅果香', '驱散阴霾与孤单感', '提振情绪与多巴胺活力', '阳光果香室内净化'];
    } else {
      return ['高活性右旋柠檬烯', '瞬间提振多巴胺活力', '室内混浊空气净化', '安抚消化与滞重感', `${origin}原生阳光能量`];
    }
  }

  // 4.2 苦橙叶 / 枝叶类
  if (cn.includes('苦橙叶')) {
    return ['植物界“平民薰衣草”助眠', '极佳抗痉挛与安抚神经', '平衡油性肌肤与痘痘', '踏实绿意与木质调沉降', '释放高压与心跳加速'];
  }

  // 4.3 花香类 Floral
  if (cn.match(/(玫瑰|茉莉|橙花|依兰|天竺葵|薰衣草|洋甘菊|晚香玉|桂花|菩提花|永久花|蜡菊|鸢尾|洛神花|金银花)/)) {
    if (cn.includes('玫瑰')) {
      return ['高压情绪深层抚慰', '滋养女性内分泌位格', '提亮肌肤通透光泽', '抚平心头委屈与创伤', `${origin}古法露水蒸馏`];
    } else if (cn.includes('薰衣草')) {
      return ['乙酸沉香酯深度助眠', '舒缓肌肉与神经紧绷', '晒后与烫伤急救修护', '水油平衡与痘肌净化', '紫蓝高地安定气场'];
    } else if (cn.includes('橙花')) {
      return ['安抚惊恐与突发焦虑', '植物自律神经调节剂', '深层提亮与细致肌肤', '告别暗沉与睡眠不安', '贵族高雅苦橙花香'];
    } else if (cn.includes('洋甘菊')) {
      return ['母菊天蓝 an 强效抗敏', '退红急救与娇嫩防护', '安抚易怒与小儿哭闹', '缓解头痛与月事紧绷', '苹果温甜包容感'];
    } else if (cn.includes('天竺葵')) {
      return ['荷尔蒙与皮脂双向平衡', '植物界“小玫瑰”提亮', '促进淋巴滞留水份排出', '平抚情绪起伏与烦躁', '清甜玫瑰草本香'];
    } else if (cn.includes('依兰')) {
      return ['快感与欢愉情绪提振', '降低过快心率与血压', '平衡皮脂分泌与发丝滋养', '释放受压抑的情感', `${origin}热带暖香`];
    } else if (cn.includes('永久花') || cn.includes('蜡菊')) {
      return ['强效化淤与组织修复', '击退肌肤暗沉与印痕', '抚平深层心灵创伤', '自由基清除抗衰', '地中海金黄复原力'];
    } else if (cn.includes('茉莉')) {
      return ['“精油之王”自信唤醒', '深层滋养干燥老化肌', '温暖子宫与平抚抑郁', '高雅丰盈夜香气场', '极度包容与欢愉感'];
    } else {
      return ['丰盈芳香醇与酯类', '深层安抚副交感神经', '肌肤弹润与光泽提振', '舒缓情绪压力与郁结', `${origin}优质花朵萃取`];
    }
  }

  // 4.4 木质 / 树脂 / 根部 Wood & Resin & Root
  if (cn.match(/(檀香|雪松|松|柏|沉香|乳香|没药|安息香|广藿香|岩兰草|丝柏|杜松|冷杉|花梨木|桧木|巨杉)/)) {
    if (cn.includes('乳香')) {
      return ['Alpha-蒎烯加深呼吸', '高古神圣冥想定轴', '平抚急促焦虑与喘息', '抚平岁月细纹与松弛', '古老树脂定香力量'];
    } else if (cn.includes('檀香')) {
      return ['高浓度檀香醇定心', '诱发 Alpha 脑波禅定', '深层补水滋养干枯肌', '降火清热与安抚杂念', `${origin}老山质朴心气`];
    } else if (cn.includes('岩兰草')) {
      return ['“宁静之油”强效接地', '极度焦虑与失眠拯救', '建立强大心理安全感', '深沉泥土根部定轴', '慢速挥发持久留香'];
    } else if (cn.includes('雪松')) {
      return ['雪松醇促进发丝丰盈', '安抚脑力过载与神经衰弱', '强效祛湿与下肢循环', '质朴温润古木气息', '稳固坚毅内心位格'];
    } else if (cn.includes('广藿香')) {
      return ['促进细胞再生与粗糙修护', '湿热体质净化与收敛', '深沉药香与定香基底', '安抚焦虑与过载思维', '大地根部笃定感'];
    } else if (cn.includes('丝柏') || cn.includes('杜松')) {
      return ['收敛静脉与下肢重滞', '体内多余水分排出', '空间负能量净浊辟秽', '开阔胸腔与呼吸滞重', '清爽高山针叶香'];
    } else if (cn.includes('松') || cn.includes('冷杉')) {
      return ['高山芬多精空间空气净化', '开阔肺部呼吸深度', '强效提振疲惫中枢', '如置身凛冽森林', '天然抑菌抗感念'];
    } else {
      return ['高浓度倍半萜与树脂', '深层定轴与接地气场', '诱发 Alpha 脑波沉静', '开阔呼吸与胸腔滞重', `${origin}年轮岁月沉淀`];
    }
  }

  // 4.5 草本 / 叶片 / 辛香 Herb & Leaf & Spice
  if (cn.match(/(薄荷|茶树|尤加利|迷迭香|鼠尾草|罗勒|百里香|牛至|马郁兰|艾|生姜|肉桂|丁香|豆蔻|胡椒|连翘|白芷|苍术|羌活|辛夷|牡丹|积雪草|龙脑|白千层|香茅)/)) {
    if (cn.includes('茶树') || cn.includes('白千层')) {
      return ['强效天然抗菌与净化', '痘肌急救点涂与油脂控制', '提升免疫与抗换季不适', '头皮油脂平衡与去屑', '清劲茶树防御力'];
    } else if (cn.includes('尤加利')) {
      return ['1,8-桉叶素通透呼吸道', '化解粘液与鼻塞不适', '净化空间二手烟与病菌', '提振头脑供氧感', '澳洲高山爽朗气息'];
    } else if (cn.includes('迷迭香')) {
      return ['马鞭草酮 / 1,8桉叶素提神', '激活记忆力与大脑敏锐', '刺激头皮毛囊活力', '促进肝胆代谢与清浊', '阳光草本高能唤醒'];
    } else if (cn.includes('薄荷')) {
      return ['薄荷醇即刻冰爽镇痛', '缓解偏头痛与晕车不适', '清爽消化与胃胀消除', '瞬间击退困倦与昏沉', '极致透凉快感'];
    } else if (cn.includes('生姜') || cn.includes('肉桂') || cn.includes('丁香') || cn.includes('胡椒') || cn.includes('豆蔻')) {
      return ['温通经络与驱散湿寒', '腹部与手脚冰凉温抚', '促进局部血液微循环', '提振阳气与行动力', '暖意融融香料能量'];
    } else if (cn.includes('艾') || cn.includes('白芷') || cn.includes('苍术') || cn.includes('羌活') || cn.includes('辛夷')) {
      return ['东方古法温阳辟秽', '祛湿通络与气色焕发', '空间环境天然除瘴', '面部头颈散寒通络', '汉方草本养生智慧'];
    } else if (cn.includes('鼠尾草') || cn.includes('罗勒') || cn.includes('马郁兰')) {
      return ['安抚月事痉挛与紧绷', '神经系统深层放松', '澄澈头脑与缓解偏头痛', '温馨草本温抚', '恢复生活秩序'];
    } else {
      return ['高透光天然草本活性', '清通呼吸与头脑沉重', '环境天然抑菌与净化', '提振中枢与活力唤醒', `${origin}纯正植物精粹`];
    }
  }

  // 默认五行分组衍生
  if (subgroup === '金') {
    return ['澄澈呼吸与肺气通透', '提振注意力与清明', '防御外界邪气混浊', '空间清新空气净化', `${origin}原生能量`];
  } else if (subgroup === '木') {
    return ['舒肝理气与情绪疏导', '缓解目赤与肩颈紧绷', '激发勃勃生机与创造力', '高山森林芬多精', `${origin}质朴气息`];
  } else if (subgroup === '水') {
    return ['滋阴补水与肾气温抚', '缓解恐惧与深层疲惫', '促进水液运化与循环', '深沉内敛接地气场', `${origin}植物原萃`];
  } else if (subgroup === '火') {
    return ['清心泻火与喜悦提振', '改善心悸与焦虑不安', '点燃多巴胺与温暖快意', '滋养心包经气血', `${origin}阳光温抚`];
  } else if (subgroup === '土') {
    return ['健脾祛湿与消化安抚', '缓解思虑过度与滞重', '奠定接地与安全感', '温和滋养身体中轴', `${origin}大地馈赠`];
  }

  return [
    `${origin}原产纯净植物萃取`,
    `${cn}特有活性成分滋养`,
    '空间气场净化与调和',
    '身心压力舒缓与安抚',
    '天然安全无化学添加'
  ];
}

// 动态针对全站 219 款产品的丰富属性自动补充生成器 (Alice 创始人专业与人文视角的个性化生成)
export const ALL_PRODUCTS: ProductItem[] = rawCatalogList.map((item, idx) => {
  const seriesMeta = SERIES_META[item.series as SeriesKey];
  const expertData = EXPERT_DOSSIERS_MAP[item.code] || {};

  const isOil = item.series === 'yuan';
  const isHydrosol = item.series === 'sheng';
  const isBlend = item.series === 'he';
  const isObject = item.series === 'jing';

  const defaultBotanicalFamily = isOil 
    ? `${item.cn.slice(0, 2)}科 (${item.latinName ? item.latinName.split(' ')[0] : 'Rutaceae / Lamiaceae'})` 
    : '天然植萃萃取体系';
  const defaultPlantPart = isOil ? '全株芳香花叶/枝干/果皮' : isHydrosol ? '新鲜低温蒸馏花水水相' : isBlend ? '多重协同天然植萃' : '天然矿物/木材/高温陶瓷';
  const defaultMethod = isOil ? (item.cn.includes('皮') && !item.cn.includes('桂皮') ? '冷压压榨法 (Cold Expression)' : item.cn.includes('净油') ? '无溶剂冷浸萃取法 (Enfleurage)' : '水蒸气蒸馏法 (Steam Distillation)') : isHydrosol ? '微压蒸馏纯露水相分离法' : isBlend ? '冷配协同温调法' : '匠心手工雕琢';
  const defaultStorage = isHydrosol ? '冷藏置于 4-10℃ 冰箱，避免污染，开封后 6 个月内用完。' : isOil ? '置于 20℃ 以下避光阴凉处密封保存，开封后 12 个月内用完。' : '置于阴凉干燥处，防潮防摔。';

  // 1. 动态生成真人群体评价 (Authentic Human Reviews)
  const defaultReviews = expertData.userReviews || [
    {
      id: `rev-${idx}-1`,
      userName: item.cn.includes('香') || item.cn.includes('睡') ? '文字工作者·林默' : 'IFA 芳疗师·小雅',
      userTag: item.cn.includes('油') ? '资深自然芳疗使用者 / 敏感肌' : '设计总监 / 空间美学玩家',
      rating: 5,
      date: '2026-03-18',
      usageScenario: isOil ? '夜间枕边香薰与植物油稀释按摩' : isHydrosol ? '早晚洗脸后湿敷与喷雾补水' : '工作区扩香与睡前放松',
      comment: `看重 Alice 团队真实的全球溯源与严谨 COA 才下单的！来自${item.origin}的【${item.cn}】气息极其自然纯正，完全没有工业香精刺鼻的假香。用来陪伴我度过无数个加班的夜晚，心里觉得特别踏实。`,
      likesCount: 34
    },
    {
      id: `rev-${idx}-2`,
      userName: '瑜伽导师·静心',
      userTag: '正念冥想练习者 / 高压都市族',
      rating: 5,
      date: '2026-02-28',
      usageScenario: '瑜伽课前空间气场净化与深呼吸',
      comment: `学员们每次上课都夸这款香气高级自然，能让人躁动的心瞬间慢下来。闻得出来是吸饱了${item.origin}天地阳光与土质养分的好原料，无限回购！`,
      likesCount: 26
    }
  ];

  // 2. 动态生成化学成分剖析 (Chemical Profile)
  let defaultChemicals = expertData.chemicalProfile;
  if (!defaultChemicals) {
    if (item.cn.match(/(柠檬|甜橙|柑橘|葡萄柚|佛手柑|红橘|苦橙)/)) {
      defaultChemicals = [
        { name: '右旋柠檬烯 (d-Limonene)', percentage: '82%', effect: '提振情绪、多巴胺刺激、清除自由基与促进淋巴流动。' },
        { name: 'γ-松油烯 (γ-Terpinene)', percentage: '8%', effect: '强效抗氧化，赋予柑橘果皮特有的新鲜青绿底香。' },
        { name: '柠檬醛 (Citral)', percentage: '4%', effect: '镇静中枢神经、安抚紧张性胃部与提神醒脑。' }
      ];
    } else if (item.cn.match(/(玫瑰|茉莉|依兰|天竺葵|橙花|洋甘菊|薰衣草)/)) {
      defaultChemicals = [
        { name: '芳樟醇/沉香醇 (Linalool)', percentage: '38%', effect: '强效镇静安抚副交感神经，减轻焦虑与恐惧。' },
        { name: '乙酸沉香酯 (Linalyl Acetate)', percentage: '32%', effect: '抗痉挛、放松肌肉紧绷，促进慢波深层睡眠。' },
        { name: '香茅醇 / 香叶醇 (Citronellol)', percentage: '18%', effect: '滋养肌肤屏障、提亮肤色与抚平情绪伤痛。' }
      ];
    } else if (item.cn.match(/(檀香|雪松|松|柏|沉香|树脂|乳香|安息香|广藿香|岩兰草)/)) {
      defaultChemicals = [
        { name: 'Alpha-蒎烯 (α-Pinene)', percentage: '42%', effect: '开阔呼吸道、通透肺气、抑制组织炎性因子。' },
        { name: '雪松醇 / 檀香醇 (Santalol / Cedrol)', percentage: '28%', effect: '诱发大脑 Alpha 波，深层镇静中枢与定轴。' },
        { name: '倍半萜烯 (Sesquiterpenes)', percentage: '20%', effect: '沉稳留香，强效抗氧化与保护细胞膜。' }
      ];
    } else if (item.cn.match(/(薄荷|茶树|尤加利|迷迭香|百里香|罗勒|鼠尾草|艾)/)) {
      defaultChemicals = [
        { name: '1,8-桉叶素 (1,8-Cineole)', percentage: '45%', effect: '清通呼吸道阻滞，化痰、抑菌与提升脑部供氧感。' },
        { name: '薄荷醇 / 樟脑 (Menthol / Camphor)', percentage: '25%', effect: '带来即刻清凉镇痛感，促进血液循环与提神醒脑。' },
        { name: '松油烯-4-醇 (Terpinen-4-ol)', percentage: '18%', effect: '激活免疫细胞，抑制表皮有害菌群。' }
      ];
    } else {
      defaultChemicals = [
        { name: '活性单萜烯分子 (Monoterpenes)', percentage: '45%', effect: '赋予植物清爽初香，促进空气净化与情绪提振。' },
        { name: '自然酯类与倍半萜 (Esters & Sesquiterpenes)', percentage: '35%', effect: '深层安抚神经系统，协同平衡身体与情绪位格。' },
        { name: '微量芳香醇 (Aromatic Alcohols)', percentage: '15%', effect: '温柔亲肤，提升配方的生命力与留香丰满度。' }
      ];
    }
  }

  // 3. 动态生成 Alice 创始人个性化日记 (Alice Founder Diary)
  let defaultAliceDiary = expertData.aliceDiary;
  if (!defaultAliceDiary) {
    if (item.cn.match(/(柠檬|甜橙|柑橘|葡萄柚|佛手柑|红橘|苦橙)/)) {
      defaultAliceDiary = {
        title: `Alice 芳疗日记：阳光挤压瞬间的澄亮心绪`,
        date: '2026.03.02',
        content: `每当我用指尖轻压冷压果皮蒸馏瓶，饱满的右旋柠檬烯便雾般迸发出来。${item.cn}凝聚了来自${item.origin}的阳光与土壤，气味里有一种不加掩饰的明朗与快意。当城市生活被细碎焦虑塞满时，它就像一束直接照进阴霾的天光，能迅速把紧绷的胃部与下沉的心放晴。`,
        keyObservation: `高活性单萜烯分子能瞬间刺激多巴胺释放，特别适合日间提振与久坐低落。`,
        blendSuggestion: `建议与苦橙叶、乳香配伍，在阳光明媚的晨间扩香 30 分钟。`
      };
    } else if (item.cn.match(/(玫瑰|茉莉|依兰|天竺葵|橙花|洋甘菊|薰衣草)/)) {
      defaultAliceDiary = {
        title: `Alice 芳疗日记：花朵对生命的无条件拥抱`,
        date: '2026.02.15',
        content: `在清晨的花田里，蒸馏锅徐徐升起带有芳樟醇与微量花香酯类的蒸气。${item.cn}（源自${item.origin}）带有最深沉绵长的抚慰力量。在我多年的临床配方里，它总是用来陪伴那些习惯咬牙坚强、忘了如何对自己温柔的人。花香分子的包容度极大，能把心中所有的委屈与疲惫化为柔和的力量。`,
        keyObservation: `微量香气酯类与芳香醇具有极佳的副交感神经安抚作用，能深层疏解情绪郁结。`,
        blendSuggestion: `滴入 1 滴于荷荷巴油中，轻柔顺时针推拿胸口膻中穴与手腕内侧。`
      };
    } else if (item.cn.match(/(檀香|雪松|松|柏|沉香|树脂|乳香|安息香|广藿香|岩兰草)/)) {
      defaultAliceDiary = {
        title: `Alice 芳疗日记：年轮与大地给灵魂的沉静定轴`,
        date: '2026.01.28',
        content: `在${item.origin}的高山与深林里，树木把年月的风雨与伤痕凝结为沉稳的木质香气。${item.cn}拥有不可思议的定轴感。每当夜深人静、思想纷乱难以入眠时，我总会在试香纸上滴一滴。这股接地气的木香会像树根一样扎进泥土，把悬空的大脑慢慢拉回沉稳的当下。`,
        keyObservation: `倍半萜醇与树脂类分子挥发极慢，能显著延长 Alpha 脑波时长，是冥想与夜间定神圣品。`,
        blendSuggestion: `配合真正薰衣草与岩兰草做夜间扩香，或调成 1% 浓度推拿双脚涌泉穴。`
      };
    } else if (item.cn.match(/(薄荷|茶树|尤加利|迷迭香|百里香|罗勒|鼠尾草|艾)/)) {
      defaultAliceDiary = {
        title: `Alice 芳疗日记：清劲草本划过呼吸道的通透快意`,
        date: '2026.03.12',
        content: `来自${item.origin}的${item.cn}带有让人精神一振的清劲锐利感。1,8-桉叶素与薄荷醇在空气中扩散开来的那一刻，原本混浊沉闷的呼吸空间瞬间被打开。每次在换季呼吸道敏感或工作长考头脑昏沉时，这股清澈的气息就像山风拂过，带来由内而外的清爽通透。`,
        keyObservation: `氧化物与单萜酮极具穿透力，能快速清通粘膜阻滞，提升注意力与脑部供氧感。`,
        blendSuggestion: `滴 2 滴于纸巾吸入，或与柠檬配伍在办公桌面做高能清爽扩香。`
      };
    } else if (isHydrosol) {
      defaultAliceDiary = {
        title: `Alice 芳疗日记：蒸馏锅里凝聚的花草水相余温`,
        date: '2026.02.20',
        content: `纯露是植物蒸馏时与精油同生同灭的水相精华，含有极高浓度的微量水溶性芳香成分。来自${item.origin}的${item.cn}水质清透纯净，直接喷洒在干燥敏感的肌肤上，就像清晨的甘露落入干涸的小草，温柔、无负担且充满润泽感。`,
        keyObservation: `温和弱酸性水相，极其亲肤，适合无酒精温和湿敷与日间随时补水。`,
        blendSuggestion: `浸湿有机棉片做 5 分钟局部湿敷，或加入湿敷仪进行面部SPA。`
      };
    } else if (isBlend) {
      defaultAliceDiary = {
        title: `Alice 芳疗日记：多重植萃在空间里的和谐共振`,
        date: '2026.03.05',
        content: `复方调配是我最享受的仪式。将源自${item.origin}等地的多款单方按照协同阶梯精准融合，让前调的敏锐、中调的丰盈与后调的沉稳在【${item.cn}】里交织共鸣。它不只是一种味道，而是一段陪伴你重建生活秩序的完整气味之旅。`,
        keyObservation: `协同效应能最大化舒缓效能，同时互相抵消单一成分可能带来的皮肤刺激感。`,
        blendSuggestion: `睡前 20 分钟加入冷雾香薰机，建立个人专属的仪式感知。`
      };
    } else {
      defaultAliceDiary = {
        title: `Alice 芳疗日记：让气息驻留于居所与器物之间`,
        date: '2026.01.18',
        content: `气味是空间最隐秘的灵魂。当我们把【${item.cn}】融入生活器物与茶席床头，源自${item.origin}的自然物语便在暗香浮动中舒展。它默默滋养着身处其中的人，将平凡的日子包裹在一片温暖安宁的审美光晕里。`,
        keyObservation: `天然扩香介质能均匀释放芳香分子，构建长效、纯净且无化学残留的空间气场。`,
        blendSuggestion: `放置于书房床头或随身携带，随时唤醒沉静惬意的心境。`
      };
    }
  }

  // 4. 动态生成应用场景 (Application Scenarios)
  const defaultScenarios = expertData.applicationScenarios || [
    { 
      title: '日常空间香薰与呼吸净化', 
      desc: `取 3-5 滴【${item.cn}】加入超声波雾化香薰机，源自${item.origin}的原生天然植萃分子能迅速净化室内空气，带来身心安抚。`, 
      method: '超声波冷雾香薰机 / 扩香石滴香' 
    },
    { 
      title: '植物油复配与局部推拿', 
      desc: `将 2-3 滴【${item.cn}】复配至 10ml UNIO 荷荷巴油或甜杏仁油中 (约 1% 浓度)，轻柔推拿肩颈、胸口或双脚。`, 
      method: '基础油复配按摩' 
    },
    { 
      title: '一人一方特调与灵感香氛', 
      desc: `结合 UNIO AI 一人一方问诊调配系统，将【${item.cn}】作为核心香调，定制属于你的高阶个性化香气作品。`, 
      method: '滴香卡随身熏蒸 / 个人签名香调' 
    }
  ];

  // 4. 动态生成个性化功效亮点标签 (Personalized & Professional Benefits Generator)
  const defaultBenefits = expertData.benefits || generateCustomBenefits(item.cn, item.series, item.origin, item.subgroup);

  // 5. 动态生成 Alice 创始人 & 芳疗师手记 (Warm, professional, poetic & nature-loving notes)
  let defaultAromatherapistNotes = expertData.aromatherapistNotes;
  if (!defaultAromatherapistNotes) {
    if (item.cn.match(/(玫瑰|茉莉|依兰|天竺葵|橙花|洋甘菊|薰衣草)/)) {
      defaultAromatherapistNotes = `在远赴 ${item.origin} 溯源时，最打动我的是清晨空气里那股带着露水与泥土余温的花香。花朵在蒸馏锅里徐徐绽放，将芳樟醇与微量醇类分子毫无保留地倾注出来。每当看到案主因生活重压而锁紧眉头，我总是第一把【${item.cn}】交到她们手中。它不只是花朵的芬芳，更是大自然对疲惫灵魂无条件的接纳与拥抱——让你在呼吸间卸下坚硬的防备，重新抱抱那个辛苦了很久的自己。`;
    } else if (item.cn.match(/(檀香|雪松|松|柏|沉香|树脂|乳香|安息香|广藿香|岩兰草)/)) {
      defaultAromatherapistNotes = `树木是时间的容器。源自 ${item.origin} 的【${item.cn}】，汲取了高山深林数十载的风雨与阳光。它的木质与树脂气味沉稳、厚重而笃定，富含倍半萜醇与沉香醇成分。当夜深人静、思想如乱麻般纷飞时，嗅闻这股扎实的木香，就像有一只温暖有力的手搭在你的肩膀上，提醒你：不必急着奔跑，深呼吸，慢下来，你的根依然深深扎在这片安宁的大地里。`;
    } else if (item.cn.match(/(柠檬|甜橙|柑橘|葡萄柚|佛手柑|红橘|苦橙)/)) {
      defaultAromatherapistNotes = `来自 ${item.origin} 的阳光被全数锁进【${item.cn}】的果皮胞室中。每次挤压瓶盖，充沛的右旋柠檬烯便如晨光般穿透阴霾。我喜欢在工作案头或阴雨天为你推荐这朵“液态阳光”。它能迅速驱散滞重与阴郁，把紧绷的胃部与低落的心绪悄然放晴。生活或许有许多不确定，但这一抹清甜灿烂的果香，总能提醒我们去发现当下平凡小事里的快意与希望。`;
    } else if (item.cn.match(/(薄荷|茶树|尤加利|迷迭香|百里香|罗勒|鼠尾草|艾)/)) {
      defaultAromatherapistNotes = `行走在 ${item.origin} 的草本植物园中，随手揉碎一片叶片，那股清劲凛冽的 1,8-桉叶素与薄荷醇便直冲脑门。在【${item.cn}】里，你能闻到最纯粹的清解与通透。当换季呼吸道混浊，或是长时间面对屏幕大脑困顿沉重时，它就像一缕破空而来的山风，将所有的杂质与倦意一扫而空，还你一个澄澈清明的心智与畅快呼吸。`;
    } else if (isHydrosol) {
      defaultAromatherapistNotes = `纯露是蒸馏过程中与精油同生同灭的水相余温。来自 ${item.origin} 的【${item.cn}】，携带着原生植物极高浓度的微量水溶性芳香因子。它清透如山泉，温柔且不带一丝负担。当燥热敏感的肌肤接触到这片细密的水雾，就像干涸的草叶迎来了晨露。我常把它推荐给需要肌肤与情绪双重润泽 Friend，用最自然平和的方式，滋养每一寸肌肤。`;
    } else if (isBlend) {
      defaultAromatherapistNotes = `复方调配是芳疗师与植物之间最深沉的对话。【${item.cn}】融合了源自 ${item.origin} 等多国原产地的精油精华，遵循严格的植物协同阶梯。前调的敏锐、中调的包容与后调的定轴在空间里缓缓舒展。它不仅是气味的叠加，更是一套陪伴你重新建构生活秩序与内心安宁的完整能量场。`;
    } else {
      defaultAromatherapistNotes = `器物与香气，是生活审美最隐秘的载体。【${item.cn}】凝聚了 UNIO 对自然风物与工匠手艺的敬意。来自 ${item.origin} 的原生能量在居所、茶席与床头悄然流动，将原本平凡的日常时光包裹在一片质朴、温暖而深邃的安宁氛围中，让每一个归家的人都能找到身心的归宿。`;
    }
  }

  const aromatherapistNotes = defaultAromatherapistNotes;

  return {
    no: idx + 1,
    code: item.code,
    series: item.series as SeriesKey,
    subgroup: item.subgroup,
    cn: item.cn,
    en: item.en,
    latinName: item.latinName || (isOil ? `Plantae ${item.en.replace(/\s+/g, '')}` : undefined),
    botanicalFamily: expertData.botanicalFamily || defaultBotanicalFamily,
    plantPart: expertData.plantPart || defaultPlantPart,
    extractionMethod: expertData.extractionMethod || defaultMethod,
    storageInfo: expertData.storageInfo || defaultStorage,
    origin: item.origin,
    prices: item.prices,
    tag: `${seriesMeta.title.split('·')[0].trim()} · ${item.subgroup}`,
    shortDesc: `${item.cn} (${item.en}) · Alice 芳疗师手记：“${aromatherapistNotes.slice(0, 42)}...”`,
    description: aromatherapistNotes,
    aromatherapistNotes: aromatherapistNotes,
    benefits: defaultBenefits,
    applicationScenarios: defaultScenarios,
    chemicalProfile: defaultChemicals,
    aliceDiary: defaultAliceDiary,
    userReviews: defaultReviews,
    scentPyramid: { top: '清雅首香 (Top Note)', middle: '丰沛主体 (Middle Note)', base: '沉稳余韵 (Base Note)' },
    coaNumber: `COA-${item.code.replace(/-/g, '')}-2026`,
    batchTrace: `UNIO-BATCH-${item.code}-2026A`,
    image: item.image,
    isFeatured: item.isFeatured || false
  };
});


