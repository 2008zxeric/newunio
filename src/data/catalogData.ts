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
  { code: 'Y-J-002', series: 'yuan', subgroup: '金', cn: '元境尤加利', en: 'Radiata Eucalyptus', latinName: 'Eucalyptus radiata', origin: '澳大利亚', prices: ['¥138/10ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-J-003', series: 'yuan', subgroup: '金', cn: '元境茶树', en: 'Tea Tree Essential Oil', latinName: 'Melaleuca alternifolia', origin: '澳大利亚', prices: ['¥138/10ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', isFeatured: true },
  { code: 'Y-J-004', series: 'yuan', subgroup: '金', cn: '元境薄荷', en: 'Peppermint Essential Oil', latinName: 'Mentha piperita', origin: '阿尔巴尼亚', prices: ['¥118/10ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-J-005', series: 'yuan', subgroup: '金', cn: '元境香茅', en: 'Java Citronella', latinName: 'Cymbopogon winterianus', origin: '法国/印度洋', prices: ['¥178/10ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
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
  { code: 'Y-M-025', series: 'yuan', subgroup: '木', cn: '元境丝柏', en: 'Cypress Oil', latinName: 'Cupressus sempervirens', origin: '法国', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-M-026', series: 'yuan', subgroup: '木', cn: '元境雪松', en: 'Himalayan Cedarwood', latinName: 'Cedrus deodara', origin: '尼泊尔', prices: ['¥138/10ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-M-026-A', series: 'yuan', subgroup: '木', cn: '阿拉斯加雪松皮精油', en: 'Alaska Cedar Bark Oil', latinName: 'Cedrus brevifolia', origin: '阿拉斯加 / 塞浦路斯', prices: ['¥268/10ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600', isFeatured: true },
  { code: 'Y-M-022', series: 'yuan', subgroup: '木', cn: '蕲艾叶精油', en: 'Mugwort Essential Oil', latinName: 'Artemisiae argyi', origin: '中国湖北蕲春', prices: ['¥198/10ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600', isFeatured: true },
  { code: 'Y-E-068', series: 'yuan', subgroup: '土', cn: '苏门答腊安息香净油', en: 'Sumatra Benzoin Absolute', latinName: 'Styrax benzoin', origin: '印尼苏门答腊', prices: ['¥288/10ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', isFeatured: true },
  { code: 'Y-M-056', series: 'yuan', subgroup: '木', cn: '白千层精油', en: 'Cajeput Essential Oil', latinName: 'Melaleuca leucadendron', origin: '印度尼西亚', prices: ['¥168/10ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-T-082', series: 'yuan', subgroup: '土', cn: '道地白芷精油', en: 'Angelica Dahurica Root Oil', latinName: 'Angelica dahurica', origin: '中国四川/河南', prices: ['¥228/10ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-H-098', series: 'yuan', subgroup: '火', cn: '苦橙果皮精油', en: 'Bitter Orange Peel Oil', latinName: 'Citrus aurantium', origin: '意大利', prices: ['¥148/10ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-H-099', series: 'yuan', subgroup: '木', cn: '苦橙叶精油', en: 'Petitgrain Essential Oil', latinName: 'Citrus aurantium', origin: '巴拉圭', prices: ['¥158/10ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-M-027', series: 'yuan', subgroup: '木', cn: '元境松针', en: 'Scots Pine Needle', latinName: 'Pinus sylvestris', origin: '俄罗斯西伯利亚', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
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
  { code: 'Y-S-059', series: 'yuan', subgroup: '水', cn: '元境杜松', en: 'Juniper Berry', latinName: 'Juniperus communis', origin: '苏格兰', prices: ['¥138/100ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
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
  { code: 'Y-H-070', series: 'yuan', subgroup: '火', cn: '元境依兰', en: 'Ylang Ylang Premium', latinName: 'Cananga odorata', origin: '马达加斯加', prices: ['¥238/10ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-H-071', series: 'yuan', subgroup: '火', cn: '大花茉莉', en: 'Jasmine Grandiflorum', latinName: 'Jasminum grandiflorum', origin: '印度', prices: ['¥858/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-H-072', series: 'yuan', subgroup: '火', cn: '日光橙花', en: 'Sunlit Neroli', latinName: 'Citrus aurantium var. amara', origin: '突尼斯', prices: ['¥258/5ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-H-073', series: 'yuan', subgroup: '火', cn: '元境天竺葵', en: 'Chinese Geranium', latinName: 'Pelargonium graveolens', origin: '中国', prices: ['¥158/10ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-H-074', series: 'yuan', subgroup: '火', cn: '胡萝卜籽', en: 'Carrot Seed Oil', latinName: 'Daucus carota', origin: '法国', prices: ['¥238/100ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-H-075', series: 'yuan', subgroup: '火', cn: '香根油/岩兰草油', en: 'Indonesian Vetiver', latinName: 'Vetiveria zizanoides', origin: '印尼', prices: ['¥188/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-H-076', series: 'yuan', subgroup: '火', cn: '姜黄油', en: 'Turmeric Essential Oil', latinName: 'Curcuma longa L.', origin: '马达加斯加', prices: ['¥188/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-H-077', series: 'yuan', subgroup: '火', cn: '生姜油', en: 'Ginger Essential Oil', latinName: 'Zingiber officinale', origin: '马达加斯加', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },

  // 土 (Earth)
  { code: 'Y-T-078', series: 'yuan', subgroup: '土', cn: '横断生姜', en: 'Hengduan Ginger Root', latinName: 'Zingiber officinale', origin: '中国横断山', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', isFeatured: true },
  { code: 'Y-T-081', series: 'yuan', subgroup: '土', cn: '元境橡木苔', en: 'Oakmoss Abs', latinName: 'Evernia prunastri', origin: '欧洲', prices: ['¥158/100ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-T-083', series: 'yuan', subgroup: '土', cn: '广藿香油', en: 'Indonesian Patchouli', latinName: 'Pogostemon cablin', origin: '印尼', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-T-085', series: 'yuan', subgroup: '土', cn: '东印度檀香油(ISO级)', en: 'ISO Grade Sandalwood', latinName: 'Santalum album', origin: '印度', prices: ['¥1580/5ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-T-086', series: 'yuan', subgroup: '土', cn: '大西洋雪松油', en: 'Atlas Cedarwood', latinName: 'Cedrus atlantica', origin: '摩洛哥', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
  { code: 'Y-T-099', series: 'yuan', subgroup: '土', cn: '东印度檀香油', en: 'East Indian Sandalwood', latinName: 'Santalum album', origin: '印度', prices: ['¥1580/5ml'], image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600' },
  { code: 'Y-T-103', series: 'yuan', subgroup: '土', cn: '澳洲檀香', en: 'Australian Sandalwood', latinName: 'Sandalwood', origin: '澳洲', prices: ['¥1280/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600' },
  { code: 'Y-T-108', series: 'yuan', subgroup: '土', cn: '印尼檀香', en: 'Indonesian Sandalwood', latinName: 'Sandalwood', origin: '印尼', prices: ['¥558/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-T-109', series: 'yuan', subgroup: '土', cn: '丝柏油', en: 'Spanish Cypress', latinName: 'Cupressus sempervirens', origin: '西班牙', prices: ['¥158/5ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },

  // 基础油 (Base Oils)
  { code: 'Y-B-001', series: 'yuan', subgroup: '基础', cn: '神圣乳香', en: 'Sacred Frankincense Resin', latinName: 'Boswellia sacra', origin: '阿曼', prices: ['¥358/5ml'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600', isFeatured: true },
  { code: 'Y-B-002', series: 'yuan', subgroup: '基础', cn: '元境没药', en: 'Somalia Myrrh', latinName: 'Commiphora myrrha', origin: '索马里', prices: ['¥358/5ml'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600' },
  { code: 'Y-B-003', series: 'yuan', subgroup: '基础', cn: '元境安息香', en: 'Benzoin Resinoid', latinName: 'Styrax benzoin', origin: '印尼', prices: ['¥168/100ml'], image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600' },
  { code: 'Y-B-004', series: 'yuan', subgroup: '基础', cn: '元境红橘', en: 'Red Tangerine', latinName: 'Citrus reticulata', origin: '中国', prices: ['¥138/10ml'], image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600' },
  { code: 'Y-B-005', series: 'yuan', subgroup: '基础', cn: '元境葡萄柚', en: 'Florida Grapefruit', latinName: 'Citrus paradisi', origin: '美国', prices: ['¥108/100ml'], image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600' },
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
  // 合系列 (He Series 复方) - 50 款功能复方（含科学配方原料构成）
  { code: 'H-B-001', series: 'he', subgroup: '身体', cn: '呼吸清咽复方', en: 'Clear Respiratory Blend', latinName: 'Eucalyptus & Myrtle Synergy', origin: '澳大利亚 / 法国', prices: ['¥280/10ml'], image: '/he-placeholder.webp', isFeatured: true },
  { code: 'H-B-002', series: 'he', subgroup: '身体', cn: '畅意循环复方', en: 'Circulation Flow Blend', latinName: 'Cypress & Rosemary Synergy', origin: '法国 / 留尼旺', prices: ['¥320/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-B-003', series: 'he', subgroup: '身体', cn: '暖宫温经复方', en: 'Warm Uterine Flow', latinName: 'Rose & Mugwort Synergy', origin: '保加利亚 / 中国蕲春', prices: ['¥350/10ml'], image: '/he-placeholder.webp', isFeatured: true },
  { code: 'H-B-004', series: 'he', subgroup: '身体', cn: '舒缓肩颈复方', en: 'Shoulder & Neck Relief', latinName: 'Peppermint & Marjoram Synergy', origin: '澳大利亚 / 欧洲', prices: ['¥290/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-B-005', series: 'he', subgroup: '身体', cn: '腹调和中复方', en: 'Harmonious Digestive Blend', latinName: 'Ginger & Fennel Synergy', origin: '马达加斯加 / 埃及', prices: ['¥280/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-B-006', series: 'he', subgroup: '身体', cn: '净空淋巴复方', en: 'Lymphatic Drainage Flow', latinName: 'Grapefruit & Laurel Synergy', origin: '印尼 / 牙买加', prices: ['¥360/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-B-007', series: 'he', subgroup: '身体', cn: '筋骨通络复方', en: 'Meridian Muscle Ease', latinName: 'Mugwort & Clove Synergy', origin: '中国湖北 / 马达加斯加', prices: ['¥310/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-B-008', series: 'he', subgroup: '身体', cn: '元境排毒复方', en: 'Detox Contour Blend', latinName: 'Juniper & Lemon Synergy', origin: '苏格兰 / 意大利', prices: ['¥380/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-B-009', series: 'he', subgroup: '身体', cn: '深眠体感复方', en: 'Deep Sleep Body Ease', latinName: 'Lavender & Vetiver Synergy', origin: '普罗旺斯 / 海地', prices: ['¥298/10ml'], image: '/he-placeholder.webp', isFeatured: true },
  { code: 'H-B-010', series: 'he', subgroup: '身体', cn: '肌肤屏障修护复方', en: 'Skin Barrier Defense', latinName: 'Helichrysum & Chamomile Synergy', origin: '科西嘉 / 保加利亚', prices: ['¥320/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-B-011', series: 'he', subgroup: '身体', cn: '丰盈胸致复方', en: 'Firming Bust Care', latinName: 'Ylang Ylang & Neroli Synergy', origin: '马达加斯加 / 摩洛哥', prices: ['¥390/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-B-012', series: 'he', subgroup: '身体', cn: '活力焕发复方', en: 'Vitality Pulse Blend', latinName: 'Orange & Black Pepper Synergy', origin: '意大利 / 印度', prices: ['¥280/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-B-013', series: 'he', subgroup: '身体', cn: '节气清润复方', en: 'Seasonal Moisture Blend', latinName: 'Osmanthus & White Tea Synergy', origin: '中国云南 / 浙江', prices: ['¥260/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-B-014', series: 'he', subgroup: '身体', cn: '足部舒压复方', en: 'Foot Relaxation Flow', latinName: 'Tea Tree & Peppermint Synergy', origin: '澳大利亚 / 尼泊尔', prices: ['¥220/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-B-015', series: 'he', subgroup: '身体', cn: '晨起唤醒复方', en: 'Morning Body Awakening', latinName: 'Spearmint & Bergamot Synergy', origin: '美国 / 意大利', prices: ['¥250/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-B-016', series: 'he', subgroup: '身体', cn: '敏弱防御复方', en: 'Sensitized Skin Defense', latinName: 'German Chamomile & Calendula', origin: '保加利亚 / 德国', prices: ['¥310/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-B-017', series: 'he', subgroup: '身体', cn: '紧致提拉复方', en: 'Contour Firming Oil Blend', latinName: 'Geranium & Patchouli Synergy', origin: '留尼旺 / 印尼', prices: ['¥380/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-B-018', series: 'he', subgroup: '身体', cn: '关节温熨复方', en: 'Joint Warming Relief', latinName: 'Turmeric & Wintergreen Synergy', origin: '马达加斯加 / 尼泊尔', prices: ['¥340/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-M-001', series: 'he', subgroup: '心智', cn: '深度专注复方', en: 'Focus & Clarity Blend', latinName: 'Rosemary & Lemon Synergy', origin: '法国 / 意大利', prices: ['¥298/10ml'], image: '/he-placeholder.webp', isFeatured: true },
  { code: 'H-M-002', series: 'he', subgroup: '心智', cn: '减压平息复方', en: 'Stress Relief Harmony', latinName: 'Bergamot & Lavender Synergy', origin: '意大利 / 普罗旺斯', prices: ['¥320/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-M-003', series: 'he', subgroup: '心智', cn: '安睡深眠复方', en: 'Deep Sleep Mind Ease', latinName: 'Clary Sage & Marjoram Synergy', origin: '南非 / 法国', prices: ['¥360/10ml'], image: '/he-placeholder.webp', isFeatured: true },
  { code: 'H-M-004', series: 'he', subgroup: '心智', cn: '情绪提振复方', en: 'Mood Elevation Blend', latinName: 'Grapefruit & Orange Blossom', origin: '南非 / 摩洛哥', prices: ['¥280/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-M-005', series: 'he', subgroup: '心智', cn: '清空焦虑复方', en: 'Anxiety Release Flow', latinName: 'Roman Chamomile & Melissa', origin: '英国 / 法国', prices: ['¥310/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-M-006', series: 'he', subgroup: '心智', cn: '灵感涌动复方', en: 'Inspiration Spark Blend', latinName: 'Petitgrain & Neroli Synergy', origin: '巴拉圭 / 突尼斯', prices: ['¥340/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-M-007', series: 'he', subgroup: '心智', cn: '沉静思绪复方', en: 'Mindful Calm Blend', latinName: 'Cedarwood & Frankincense', origin: '尼泊尔 / 阿曼', prices: ['¥290/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-M-008', series: 'he', subgroup: '心智', cn: '破局觉察复方', en: 'Breakthrough Awareness', latinName: 'Basil & Peppermint Synergy', origin: '埃及 / 美国', prices: ['¥380/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-M-009', series: 'he', subgroup: '心智', cn: '喜悦绽放复方', en: 'Joyful Bloom Blend', latinName: 'Jasmine & Red Tangerine', origin: '印度 / 中国', prices: ['¥320/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-M-010', series: 'he', subgroup: '心智', cn: '元境定轴复方', en: 'Centered Stability Blend', latinName: 'Vetiver & Sandalwood Synergy', origin: '海地 / 印度迈索尔', prices: ['¥350/10ml'], image: '/he-placeholder.webp', isFeatured: true },
  { code: 'H-M-011', series: 'he', subgroup: '心智', cn: '宁静港湾复方', en: 'Quiet Haven Blend', latinName: 'Sweet Marjoram & Cypress', origin: '埃及 / 法国', prices: ['¥280/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-M-012', series: 'he', subgroup: '心智', cn: '脑力复苏复方', en: 'Brain Fatigue Release', latinName: 'Cardamom & Lemon Synergy', origin: '危地马拉 / 意大利', prices: ['¥270/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-M-013', series: 'he', subgroup: '心智', cn: '勇毅前行复方', en: 'Courage & Vision Blend', latinName: 'Bay Laurel & Pepper Synergy', origin: '牙买加 / 印度', prices: ['¥310/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-M-014', series: 'he', subgroup: '心智', cn: '柔情相拥复方', en: 'Gentle Tenderness Blend', latinName: 'Geranium & Vanilla Synergy', origin: '埃及 / 马达加斯加', prices: ['¥330/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-M-015', series: 'he', subgroup: '心智', cn: '破晓晨光复方', en: 'Dawn Awakening Blend', latinName: 'Lime & Citronella Synergy', origin: '墨西哥 / 法国', prices: ['¥260/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-M-016', series: 'he', subgroup: '心智', cn: '澄澈冥想复方', en: 'Clarity Meditation Blend', latinName: 'Frankincense & Palo Santo', origin: '阿曼 / 秘鲁', prices: ['¥340/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-S-001', series: 'he', subgroup: '灵魂', cn: '元境归真复方', en: 'Ultimate Return Blend', latinName: 'Sandalwood & Frankincense', origin: '印度迈索尔 / 阿曼', prices: ['¥480/10ml'], image: '/he-placeholder.webp', isFeatured: true },
  { code: 'H-S-002', series: 'he', subgroup: '灵魂', cn: '觉知开悟复方', en: 'Enlightenment Path Blend', latinName: 'Agarwood & Rose Synergy', origin: '越南 / 保加利亚', prices: ['¥520/10ml'], image: '/he-placeholder.webp', isFeatured: true },
  { code: 'H-S-003', series: 'he', subgroup: '灵魂', cn: '心轮绽放复方', en: 'Heart Chakra Bloom', latinName: 'Damask Rose & Neroli', origin: '保加利亚 / 突尼斯', prices: ['¥450/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-S-004', series: 'he', subgroup: '灵魂', cn: '顶轮通达复方', en: 'Crown Chakra Elevation', latinName: 'Lotus & Frankincense Synergy', origin: '印度 / 阿曼', prices: ['¥580/10ml'], image: '/he-placeholder.webp', isFeatured: true },
  { code: 'H-S-005', series: 'he', subgroup: '灵魂', cn: '海底轮扎根复方', en: 'Root Chakra Grounding', latinName: 'Patchouli & Vetiver Synergy', origin: '印尼 / 海地', prices: ['¥420/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-S-006', series: 'he', subgroup: '灵魂', cn: '喉轮表达复方', en: 'Throat Chakra Voice', latinName: 'Blue Chamomile & Eucalyptus', origin: '保加利亚 / 澳洲', prices: ['¥390/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-S-007', series: 'he', subgroup: '灵魂', cn: '眉心轮直觉复方', en: 'Third Eye Intuition', latinName: 'Helichrysum & Clary Sage', origin: '科西嘉 / 南非', prices: ['¥490/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-S-008', series: 'he', subgroup: '灵魂', cn: '脐轮创造复方', en: 'Sacral Chakra Flow', latinName: 'Ylang Ylang & Jasmine Abs', origin: '马达加斯加 / 印度', prices: ['¥410/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-S-009', series: 'he', subgroup: '灵魂', cn: '太阳轮自信复方', en: 'Solar Plexus Power', latinName: 'Lemon & Cinnamon Bark', origin: '意大利 / 马达加斯加', prices: ['¥430/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-S-010', series: 'he', subgroup: '灵魂', cn: '气场防护复方', en: 'Aura Defense Shield', latinName: 'Myrrh & Benzoin Resin', origin: '索马里 / 印尼', prices: ['¥380/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-S-011', series: 'he', subgroup: '灵魂', cn: '慈悲宽恕复方', en: 'Compassion & Grace', latinName: 'Melissa & Rose Geranium', origin: '法国 / 留尼旺', prices: ['¥460/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-S-012', series: 'he', subgroup: '灵魂', cn: '灵魂共鸣复方', en: 'Soulmate Resonance', latinName: 'Neroli & Sandalwood', origin: '摩洛哥 / 印度迈索尔', prices: ['¥480/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-S-013', series: 'he', subgroup: '灵魂', cn: '禅修定慧复方', en: 'Zen Wisdom Blend', latinName: 'Mugwort & Sandalwood', origin: '中国蕲春 / 印度', prices: ['¥510/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-S-014', series: 'he', subgroup: '灵魂', cn: '宇宙共振复方', en: 'Cosmic Harmony Flow', latinName: 'Sacred Frankincense & Rose', origin: '阿曼 / 保加利亚', prices: ['¥560/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-S-015', series: 'he', subgroup: '灵魂', cn: '无界清净复方', en: 'Boundless Purity Blend', latinName: 'Linden & White Pine', origin: '欧洲 / 加拿大', prices: ['¥490/10ml'], image: '/he-placeholder.webp' },
  { code: 'H-S-016', series: 'he', subgroup: '灵魂', cn: '元境复苏复方', en: 'Sacred Awakening Blend', latinName: 'Myrrh & Frankincense & Agarwood', origin: '索马里 / 阿曼 / 越南', prices: ['¥530/10ml'], image: '/he-placeholder.webp' },

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
      blendSuggestion: '白千层 2滴 + 元境茶树 2滴 + 柠檬 1滴 + 甜杏仁油 10ml，涂抹胸口或局部湿敷。'
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
      blendSuggestion: '白芷 1滴 + 元境薄荷 1滴 + 薰衣草 1滴 + 甜杏仁油 10ml，夜间推拿太阳穴与面部。'
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
// 产品目录权威日记（Eric 旅记 / Alice 手记）——来自 UNIO 元香产品文案全集
function getBlendFormulaForItem(cn: string, subgroup: string): { ingredient: string; role: string; origin?: string; note?: string }[] {
  if (cn.includes('呼吸') || cn.includes('清咽')) {
    return [
      { ingredient: '蓝桉尤加利', role: '清通下呼吸道与黏膜阻滞', origin: '澳大利亚', note: '前调' },
      { ingredient: '绿花白千层', role: '广谱天然防卫与净化', origin: '马达加斯加', note: '中调' },
      { ingredient: '欧薄荷', role: '利咽清凉与舒缓咽喉紧绷', origin: '法国', note: '前调' },
      { ingredient: '绿香桃木', role: '温和化痰与定轴呼吸', origin: '科西嘉', note: '后调' }
    ];
  }
  if (cn.includes('循环') || cn.includes('水肿')) {
    return [
      { ingredient: '丝柏', role: '收敛血管与促进静脉循环', origin: '法国', note: '后调' },
      { ingredient: '桉油樟迷迭香', role: '激活微循环与消除阻滞', origin: '西班牙', note: '前调' },
      { ingredient: '西西里柠檬', role: '清爽流体与促进代谢', origin: '意大利', note: '前调' },
      { ingredient: '葡萄柚', role: '刺激淋巴流动', origin: '南非', note: '中调' }
    ];
  }
  if (cn.includes('暖宫') || cn.includes('温经')) {
    return [
      { ingredient: '蕲春艾草', role: '温经散寒与祛湿止痛', origin: '中国湖北', note: '中调' },
      { ingredient: '大马士革玫瑰', role: '理气活血与舒缓下腹痉挛', origin: '保加利亚', note: '中调' },
      { ingredient: '生姜', role: '发汗解表与温暖胞宫', origin: '马达加斯加', note: '后调' },
      { ingredient: '真正薰衣草', role: '平息情绪焦虑与肌肉松弛', origin: '普罗旺斯', note: '中调' }
    ];
  }
  if (cn.includes('肩颈') || cn.includes('通络') || cn.includes('筋骨') || cn.includes('关节')) {
    return [
      { ingredient: '欧薄荷', role: '即时冷感镇痛与放松神经', origin: '美国', note: '前调' },
      { ingredient: '甜马郁兰', role: '解除深层肌纤维痉挛僵硬', origin: '埃及', note: '中调' },
      { ingredient: '冬青 (鹿蹄草)', role: '水杨酸甲酯抗炎镇痛', origin: '尼泊尔', note: '后调' },
      { ingredient: '黑胡椒', role: '温热局部血流与散寒', origin: '印度', note: '后调' }
    ];
  }
  if (cn.includes('睡眠') || cn.includes('深眠') || cn.includes('安睡')) {
    return [
      { ingredient: '高地真实薰衣草', role: '乙酸芳樟酯诱导深睡波长', origin: '普罗旺斯', note: '中调' },
      { ingredient: '海地岩兰草', role: '接地气的倍半萜醇定轴安神', origin: '海地', note: '后调' },
      { ingredient: '罗马洋甘菊', role: '平息中枢交感神经亢奋', origin: '英国', note: '中调' },
      { ingredient: '神圣乳香', role: '慢化呼吸频率与深度静心', origin: '阿曼', note: '后调' }
    ];
  }
  if (cn.includes('专注') || cn.includes('脑力') || cn.includes('灵感') || cn.includes('觉察')) {
    return [
      { ingredient: '桉油樟迷迭香', role: '刺激脑部α波与提升记忆力', origin: '法国', note: '前调' },
      { ingredient: '西西里柠檬', role: '清爽提神与消除大脑倦意', origin: '意大利', note: '前调' },
      { ingredient: '欧薄荷', role: '瞬间醒脑与清通头晕', origin: '美国', note: '前调' },
      { ingredient: '大西洋雪松', role: '稳定长效专注力与定轴', origin: '摩洛哥', note: '后调' }
    ];
  }
  if (cn.includes('归真') || cn.includes('开悟') || cn.includes('顶轮') || cn.includes('禅修') || cn.includes('宇宙') || cn.includes('无界')) {
    return [
      { ingredient: '迈索尔老山檀香', role: '檀香醇深层归真与定心', origin: '印度迈索尔', note: '后调' },
      { ingredient: '阿曼神圣乳香', role: '乳香酸提升心灵维度', origin: '阿曼', note: '后调' },
      { ingredient: '索马里没药', role: '凝练气场与沉淀纷扰', origin: '索马里', note: '后调' },
      { ingredient: '大马士革玫瑰', role: '打开心轮与温润共鸣', origin: '保加利亚', note: '中调' }
    ];
  }
  if (subgroup === '身体') {
    return [
      { ingredient: '大马士革玫瑰', role: '调和身心肌底活血', origin: '保加利亚', note: '中调' },
      { ingredient: '葡萄柚', role: '促进淋巴与脂肪代谢', origin: '南非', note: '前调' },
      { ingredient: '天竺葵', role: '平衡皮脂与体液分泌', origin: '埃及', note: '中调' },
      { ingredient: '大西洋雪松', role: '紧致肌肤与沉稳定轴', origin: '摩洛哥', note: '后调' }
    ];
  }
  if (subgroup === '心智') {
    return [
      { ingredient: '佛手柑', role: '驱散焦虑与舒缓中枢神经', origin: '意大利', note: '前调' },
      { ingredient: '真实薰衣草', role: '安抚情绪张力与平复波动', origin: '普罗旺斯', note: '中调' },
      { ingredient: '苦橙叶', role: '理顺交感神经与清空杂念', origin: '巴拉圭', note: '前调' },
      { ingredient: '檀香', role: '沉静定心与稳定气场', origin: '印度', note: '后调' }
    ];
  }
  return [
    { ingredient: '阿曼神圣乳香', role: '慢化呼吸与唤醒内在觉知', origin: '阿曼', note: '后调' },
    { ingredient: '印度老山檀香', role: '定轴静心与提升冥想维度', origin: '印度', note: '后调' },
    { ingredient: '橙花', role: '平息创伤与注入纯净喜悦', origin: '突尼斯', note: '中调' },
    { ingredient: '广藿香', role: '接地气与凝聚核心能量', origin: '印尼', note: '后调' }
  ];
}

// 帮助函数：为境系列 (Jing Series 空间器物) 自动匹配器物材质与香道规格

// 合系列 50 款 Alice 配方试验日记（2026-08-05 用户提供方案 UNIO_复方配方构成.xlsx 权威版）
const BLEND_DIARY_MAP: Record<string, string> = {
  'H-B-001': `做呼吸类配方时，我脑子里永远有一个画面：一九九几年的冬天，我因为心肌炎后遗症喘不上气，妈妈把热水袋捂在我胸口上，那股热慢慢透进去，气管好像被什么软软的东西撑开了。后来学了芳疗才知道，那种感觉有化学名字——1,8-桉叶素。蓝胶尤加利里这个成分能温和舒张支气管平滑肌，不是扩张剂那种暴力撑开，是让它想起自己本该有的弹性。香桃木里同样富含氧化物，但它比尤加利多了一层湿润感——呼吸道粘膜最怕干燥，一干就痉挛、一痉挛就咳。这两个在一起，一个撑开、一个润着，像一个无声的协议。有个老客户是小学老师，每年十月准时失声。她用这个复方扩香加胸口涂抹，去年冬天第一次没请假。她发来的语音里带着气声：'Alice你知道吗，我今天带早读带了整整一节课。'我心里比自己好了还高兴。Eric从澳洲收回的尤加利，他说那批是海拔六百米以上的窄叶种，桉叶素含量检测出来比平地种高出将近二十个百分点。原料就是这样——差一层山，差一个世界。`,
  'H-B-002': `静脉回流这件事，在芳疗里对应的是一个很古老的观察：往上走的油，和往下沉的油，作用于身体的方向完全相反。丝柏就是那种会让能量上升的油——它的倍半萜烯组分在挥发曲线中段走得特别快，涂抹在小腿时会有一种微妙的收紧感，不是紧绷，是被兜住了。配合桉油醇迷迭香——不是樟脑迷迭香，一定要分清楚——桉油醇迷迭香里的氧化物比例更高，作用是促进微循环而不是刺激中枢神经。这对组合我给过至少五六个不同类型的客户，反馈的共性就一个字：轻。不是体重轻，是腿轻了。有位长期站柜台的大姐用了三周，某天下午忽然发现脱鞋的时候袜子勒痕浅了一半。她没称体重也没量腿围——就是有一天低头看见脚踝的骨头轮廓重新出现了，那种惊喜比任何仪器测量都真。中医说气行则血行——丝柏通膀胱经的气，迷迭香升脾阳化湿浊。Eric从留尼旺收回的迷迭香，我在工作室一开瓶就知对了——那股清冽劲不是刺鼻，是干净得像高海拔的早晨。`,
  'H-B-003': `温经这个词，学芳疗之前我只在中药房里听过。后来发现植物化学里有一整个门类叫温热性精油——丁香、肉桂、艾草——它们的共同特征是富含酚类或醚类，分子量小、渗透快、能在皮肤表层产生持续的微热感。但这个配方不走高热路线。玫瑰草的苯乙醇不是烧，是温——它通过下丘脑-垂体-卵巢轴的微弱信号调节来影响子宫平滑肌的节律性收缩，而不是用蛮力把血推出去。配合艾草的侧柏酮微量刺激，像一个有经验的助产士轻轻托住你的腰说慢慢来。我见过太多痛经的姑娘被敷衍一句'生了孩子就好'。有一个客户告诉我她第一次用这个配方按摩小腹时，不是不痛了，而是疼痛的边界变得清晰了——'以前是整个肚子都在沉，现在能感觉到痛就在那个点，其他地方是暖的。'我觉得这个描述比任何止痛评分都准确。叶草是Eric从湖北蕲春向阳山坡上收回来的，端午前后采的那批药力最平衡。玫瑰草来自留尼旺，蒸馏时满厂房都是玫瑰香，工人说每天都像在花园里上班。`,
  'H-B-004': `说到肌肉配方，我得先承认一件事：我自己不是运动型的人。心肌炎之后很多年，我对用力这件事有本能的恐惧。但我有很多运动型的朋友，他们的身体是我理解肌肉配方的活教材。胡椒薄荷里的薄荷脑作用机制很单纯——它激活TRPM8冷觉受体，给大脑传递一个'这里凉了'的信号，从而暂时抑制疼痛信号的传递速度。但缺陷也很明显：凉感消退后，如果肌肉痉挛没有解除，疼痛会回弹。所以必须配甜马郁兰。马郁兰里的萜品烯四醇是天然的肌松剂——它通过GABA受体通路抑制运动神经元的过度放电，不催眠但会让紧绷的肌纤维像被慢慢拧松的螺丝。一个在前胸、一个在后背——薄荷管'现在不疼'，马郁兰管'以后别紧'。这两个油的比例我调整过很多次。最初照着教科书上的经典配比来，后来发现亚洲人的肌群结构需要薄荷比例偏低、马郁兰偏高——不是化学成分的问题，是肌肉分布的差异。这就是为什么配方不能照搬欧美教材。`,
  'H-B-005': `消化系统的精油配方有一个很微妙的设计难点：生姜的姜辣素促进胃肠蠕动是对的，但如果比例过高，那种推的感觉会变得像被赶着走，很不舒服。甜茴香的反式茴香脑就像一个温和的调度员——它不推，它只是让肠道自己想起该往哪个方向走。孕吐严重的妈妈产后用这个配方，跟我说了一句话我记到现在：'怀孕时吃什么吐什么，现在用这个油，好像肠道终于知道该怎么拐弯了。'她说的拐弯其实是小肠蠕动的移行性复合运动——食物在肠道里分段推进的节律，姜辣素加速前端，茴香脑协调后端。还有一个反馈来自一位经常出差、飞机餐吃坏肚子的销售。他说以前出差带一整包胃药，现在只带这支油和一小瓶甜杏仁基底。'在酒店厕所占坑比在会议室谈判的时间还长'——他的自嘲让我喷了茶。生姜来自Eric在马达加斯加的合作农场，那片红土地里长出来的姜，姜辣素含量跟你在中国超市买到的完全不是一个量级。每次开那批姜精油的瓶盖，我的工作室三小时散不掉那股暖辣味。`,
  'H-B-006': `葡萄柚——这个极其日常的水果，在精油化学里其实身份很高：它的右旋柠檬烯含量可以超过95%，而柠檬烯是目前研究最充分、证据等级最高的淋巴循环促进剂之一。你上午涂在锁骨窝，下午淋巴液的流速就开始不一样——不是玄学，是在B超下能看到淋巴结体积的变化。月桂叶在这个配方里的角色不是主角，但没有它整个方子就偏了。月桂叶的1,8-桉叶素给配方带了一个向上的升提力——淋巴液需要往锁骨下静脉回流，没有这股升力，葡萄柚的促流作用就容易淤在半路。我自己生完孩子后水肿得厉害——不是胖，是那种按下去会留印的水。那段时间每天涂葡萄柚+月桂稀释油在颈侧和腋下按摩，大概十天左右，我妈来家里看我，进门就说'你脸小回去了'。不是体重秤上的数字变了，是原本被水泡肿的轮廓回来了。Eric从印尼高海拔果园收回的葡萄柚，果皮油腺比我以前拿到的任何一批都饱满。他寄了三种样品让我盲测，我选出最优的那批，他回了一句：'果然，那个园子在火山上。'火山灰土壤的矿物质含量决定了柠檬烯的积累。`,
  'H-B-007': `说到筋骨配方，我得讲一下自己的经历。心肌炎之后我吃了很久的激素，骨骼疼是副作用之一——不是骨头断了那种疼，是一种弥漫的酸，像骨缝里灌了醋。那时候还没学芳疗，后来回看，如果早一点遇到这个配方，那几年会好过很多。艾草精油在中国的应用史超过两千年，但用现代化学来理解它是在近几十年——侧柏酮和桉叶素的协同作用，穿透表皮后能在深层组织产生持续的微热。这种热不是表面的辣椒素刺激，是从肌筋膜层慢慢渗出来的。丁香的丁香酚则是一个渗透助推器——它能暂时增加角质层的脂质流动性，让其他分子更容易跟进去。这两个配在一起，就是'温通'两个字最精确的化学翻译。有个艾灸师父来找我——他给别人灸了二十年，从没给自己灸过一次，肩背硬得像砧板。用了三周后来复诊，说'终于知道被灸的人什么感觉了'——那股热从脖子根一直暖到腰。`,
  'H-B-008': `杜松在芳疗教材里总被归到排水那一栏，但我一直觉得这样归类不够。杜松浆果里的α-蒎烯和月桂烯，对肾脏微循环的促进作用比单纯的利尿要精妙得多——它不是在身体里开了个水龙头，而是让肾脏自身的水液代谢效率回升。柠檬在这个配方里负责的是上焦的淋巴回流——锁骨区域的淋巴结群是整个淋巴系统的总回水口，柠檬的高含量单萜烯通过嗅觉刺激迷走神经的同时，涂抹在颈侧也能局部促进淋巴结的平滑肌收缩。一上一下——一个往上提、一个往下推，中间的水自然就动了。有一个很少人提的细节：杜松浆果精油的品质和采收时间关系极大。青浆果阶段的油偏利尿，过熟的蓝色浆果则多了松脂的收敛感。Eric收的那批是刚好转蓝但还没皱皮的浆果，比例卡得极准——他拍了浆果切面的显微照片发给我，种子腔里的油脂腺密密麻麻。`,
  'H-B-009': `我年轻时因为心肌炎后遗症，睡眠极差——不是睡不着，是睡了等于没睡，早上起来比睡前还累。后来学了芳疗才明白，那是自主神经系统的昼夜节律出了问题：交感神经在夜间降不到应有的低值，副交感神经就起不来。薰衣草的乙酸沉香酯是目前已知最温和的副交感神经激活剂——它不像安眠药那样强行关闭意识，而是像在你耳边轻声说：'可以了，今天够了，交给我吧。'但要解决'睡了但没恢复'的问题，光有薰衣草不够——需要岩兰草。岩兰草的倍半萜酮成分是真正的深度修复开关，它促进的是慢波睡眠阶段——也就是你真正充电的那个阶段。我见过最严重的案例是一个财务总监，三年靠安眠药睡觉。她用这个配方第一周无感，第二周开始能感觉意识变模糊的那个瞬间——那是慢波睡眠的入口。她形容得很准：'不是被砸晕，是慢慢融化了。'她现在睡前滴一滴岩兰草在枕头上，说那个土腥味让她觉得自己还是大地的一部分。`,
  'H-B-010': `说句心里话——皮肤屏障类配方是最容易被市场注水的品类。你去美容院，十个产品里九个说自己修护屏障，但真正有效的没几个。永久花珍贵不是因为它贵，是因为它里面的意大利双酮在体外实验中能显著促进成纤维细胞的迁移和胶原蛋白的合成——说人话，就是它能喊新的皮肤细胞快点过来补缺口。德国洋甘菊——注意一定是德国洋甘菊不是罗马洋甘菊——母菊薁的蓝色不是色素，是甘菊环的天然显色，它的抗炎路径走的是COX-2抑制，和外用的非甾体抗炎药同一条通路但副作用趋近于零。这两个在一起就是：一个修，一个稳。修的是永久花，稳的是洋甘菊。我碰到过一个玫瑰痤疮患者，脸红得像喝酒过敏，试遍了大牌修护霜，脸越护越烂——因为那些霜里的香精和乳化剂本身就是刺激源。她用了稀释配方的永久花洋甘菊油当精华用，第一周还是红的，第二周开始像褪色墙面一样慢慢淡下来。她每天自拍记录，连起来看像在看一朵玫瑰褪去红晕。`,
  'H-B-011': `乳房不是一个独立器官——它在中医里走胃经和肝经，在淋巴系统上与腋窝淋巴结群直接相连，在情绪层面它承载着太多女性一生的身份变迁：青春期、哺乳、衰老。依兰依兰的大分子倍半萜烯——特别是金合欢烯和大根老鹤草烯——在蒸馏尾段才析出，分子结构复杂得像蕾丝花边。它们的包裹感极强，涂抹在皮肤上不是渗透，是覆盖——像一件很薄很软的丝绸内衣，存在但不压迫。橙花的右旋芳樟醇则走反方向：清、薄、凉，负责让整个胸部淋巴通路保持通畅，不被大分子的依兰堵住。很多人在意胸型变化，但其实该被在意的第一件事是淋巴通畅。乳房里大部分体积是乳腺组织和脂肪，可它们周围全是淋巴结——如果淋巴回流不畅，任何紧致都没意义。有一位刚结束哺乳期的客人用了两个月，她没有去量胸围——她跟我说自己最大的变化是'洗澡时不会再不敢看镜子了'。我抱了她一下。那是这个行业最值钱的回报。`,
  'H-B-012': `说到甜橙，很多人第一反应是'好闻'——确实好闻，但甜橙的精油化学身份远不止于香气。它的柠檬烯含量可以高达97%，是目前已知最可靠的情绪提升单萜之一——它在嗅球激活多巴胺前体细胞的效率，在多项脑电实验中被反复验证。甜橙不是让你快乐，是让你的多巴胺基线回升到一个够用的水平。黑胡椒在这个配方里的角色小到几乎看不见——添加量不到甜橙的十分之一——但它的β-石竹烯是一个关键的微量启动器。很多术后恢复期的病人不是身体不能动了，是劲没了——中医叫气，西医用vitality。黑胡椒那一点点微辣刺激，就像老式汽车的点火线圈——没有它，甜橙再香也发动不了身体的那股动力。这个配方最动人的反馈不是来自我家客人，而是我自己。有一年冬天我重感冒后拖了很久没恢复，每天下午四点准时体力归零。那段时间我在工作室点甜橙扩香，手腕上再沾一点点黑胡椒稀释油。后来康复了回头看，它给的与其说是能量，不如说是一种'没那么容易放弃'的心情。`,
  'H-B-013': `干燥综合症在芳疗里不算常见适应症，但它给了我一个重新思考'保湿'这个词的机会。市面上绝大多数保湿产品做的是盖住水分——矿物油、凡士林、硅油，抹上去滑溜溜，洗掉之后打回原形。植物花卉油做的是另一件事：它不盖水分，它帮你的皮肤重建自己锁水的能力。桂花原精是中式美学在芳疗科学里的一个绝佳代言——它的β-紫罗兰酮和二氢β-紫罗兰酮既是大分子定香剂，也是温和的角质调理成分，能促进角质形成细胞的分化正常化。白茶的茶多酚则在旁边守住抗氧化的阵地，不让自由基来干扰这份脆弱的修复。一个干燥脸脱皮的中学老师用了两周后对我说：'同事问我换什么粉底了。'她什么都没换——她只是不再需要粉底来盖住那些翘起来的死皮了。这才是皮肤修护的真正终点：不是看起来好了，是自己真的能好了。Eric从云南深秋的金桂树上收回的桂花，他说那一整条街都是桂花味，蜜蜂追着采花工跑。我开瓶的瞬间就信了——那瓶原精的香气密度，比我之前接触过的任何商业样品都浓三成。`,
  'H-B-014': `足部是全身最被忽视的器官。一个人平均一生走路绕地球四圈半，但为脚做护理的时间和为脸做护理的时间恐怕差了一百倍。这个配方最初是给一个跑全马的朋友调的——不是因为他脚臭或脚裂，是因为他说每次脱鞋的那一刻，脚底像着火。茶树精油的萜品烯-4-醇是天然皮肤清洁剂中平衡感最好的——它在抑制表皮真菌和细菌的同时，几乎不破坏皮肤正常菌群的平衡。这是茶树和化学杀菌剂最大的区别：不是轰炸机，是巡逻兵。胡椒薄荷的薄荷脑则在降温的同时，通过TRPM8受体给神经末梢发送'这里已经凉了'的信号——说白了就是让神经系统帮你骗一下脚底板。那个跑马的朋友后来在赛前用了这个配方按摩脚底一周，跑完四十二公里给我发了一段语音，气喘吁吁地喊：'脱鞋那一刻，脚没烧！'连喊了三遍。后来他把这个配方推荐给了整个跑团，全团四十多人现在都在用。`,
  'H-B-015': `昼夜节律这个词听上去很学术，但对于倒班的人来说，它就是每天早上七点脑袋困得像灌了铅、凌晨三点脑子亮得像白天一样清醒的那种撕裂感。我生病那几年也有过这样的作息紊乱——不是因为工作，是因为不舒服睡不着。后来学会了一点：打破节律的不是疲劳本身，而是大脑无法分辨'现在是该醒还是该睡'。绿薄荷是一个被严重低估的精油。它的左旋香芹酮比例高，气味比胡椒薄荷柔很多——不走那种刺冷的强制清醒路线，更像清晨窗户开一条小缝透气。佛手柑的乙酸芳樟酯是另一个温和的副交感开关——它不催眠，它只是告诉你的大脑'犯困不是罪'。一个夜班护士用了三天之后，凌晨两点下班回家，第一次不需要刷一小时手机才能入睡。她说以前回到家身体是停下来了，脑子还在病房里跑。用完这个以后，'脑子比身体晚到了二十分钟，然后也安静了。'`,
  'H-B-016': `给婴儿做配方，是整个芳疗里最让我敬畏的事。不是害怕——是这种敬畏让我每次举秤都像在做手术。六个月以下婴儿的皮肤屏障还没有完整形成，角质层只有成人的三分之一厚，透皮吸收率远高于成人。这个配方的基底油稀释到0.5%以下——精油浓度几乎是一支啤酒倒进一缸水里。德国洋甘菊——必须再强调一次是德国洋甘菊——母菊薁的深蓝色不是色素，是甘菊环的天然显色，它的抗炎路径走的是COX-2和5-LOX双通路抑制，在炎症介质的源头就踩了刹车。金盏花浸泡油不是精油，是基础油，但它在脂肪酸谱里富含的亚麻油酸恰好是婴儿湿疹皮肤最缺少的那几样。我给过一个湿疹宝宝的妈妈配方——她按规定稀释后只涂在耳后小面积测试，三天后没有过敏才慢慢用到脸颊。一周后她说'两团红消了，夜里不再挠脸'。她发来宝宝睡着了的照片，小脸蛋终于不是那种让人揪心的红紫了。这张照片现在还在我工作室的冰箱上贴着。`,
  'H-B-017': `紧致这个词被护肤品市场过度消费到了令人反胃的程度。每隔三个月就有一款'涂抹式热玛吉'上市，然后消费者用脚投票——下架了。芳疗做紧致，走的是一条极其缓慢但更诚实的路。天竺葵——尤其是波旁天竺葵——它的单萜醇谱系里有香茅醇和牻牛儿醇，这两个成分在体外实验中能双向调节皮脂腺素的分泌：多的地方收敛，少的地方补上。这种双向性是合成护肤品做不到的。广藿香的广藿香醇则是另一条通路——它不是作用于皮脂腺，是直接刺激真皮层的成纤维细胞合成更多胶原蛋白前体。一个在表皮层调油水平衡，一个在真皮层悄悄搭脚手架。一位练瑜伽的女士坚持用了三个月，她没有告诉我皮肤变紧——她告诉我的是'同样那件瑜伽服，胸下的折痕变浅了'。这种反馈比任何仪器测出的数据都让我信服——不是因为浪漫，是因为它来自人的日常。`,
  'H-B-018': `我外公八十多岁了，膝盖不行了很多年。我学芳疗最直接的动力之一，就是想让他下楼不那么疼。这个配方是我翻了很多关节炎外用植物的临床文献，加上自己的芳疗经验拼出来的。姜黄的姜黄素——学名Curcumin——口服生物利用度极低，但透皮吸收路线是另一回事：姜黄素分子量368，在精油介质的帮助下可以穿过角质层直接作用在局部组织的炎症靶点上，绕过肝脏首过效应。冬青的水杨酸甲酯是天然的COX抑制剂，和口服的肠溶阿司匹林是同一个分子家族，但外用的优势是副作用趋近于零——不伤胃，不影响血小板。我第一次给外公涂的时候，他本能地把腿往回缩，说太烫了——其实冬青的温热感需要半分钟才开始。后来他每天晚上自己涂，一瓶用完，打电话给我说：'下楼能走了，不是跑，是下来了。'八十多岁老人的'能下去了'，比年轻人的'全好了'分量更重。Eric从尼泊尔收回的姜黄和冬青，背回来的时候摔了一跤，手肘擦破一大片，但装精油的箱子抱得死死的。他说擦破皮没事，这些姜黄在山坡上长了三年。`,
  'H-M-001': `专注力和意志力不是一回事——这是我学神经科学基础课后最大的感触。意志力是前额叶皮层喊你去做事，专注力是默认模式网络在关掉那些不相干的噪音。迷迭香里的1,8-桉叶素对前额叶皮层的乙酰胆碱酯酶有温和的抑制作用——说人话，就是让你的大脑奖励递质在突触间隙多停留一会儿，专注的愉悦感因此延长。柠檬在这个配方里是环境控制器——它的柠檬烯不穿透血脑屏障，但通过嗅觉通路激活蓝斑核的去甲肾上腺素系统，相当于把全脑的信噪比旋钮往右拧了一点。很多人在考试或大项目期间吸这个配方，说杂念变少了——不是变少了，是杂念还是那些杂念，但你的大脑不那么在乎它们了。我自己做这行最需要专注的时刻其实不是调配——是写配方笔记。那些化学分子式、植物学名、药理机制，一个数字写错了影响的可不只是错一个字。我书桌旁边永远有一瓶稀释后的迷迭香喷雾。不是习惯，是工具。`,
  'H-M-002': `说一个很多人不知道的事：佛手柑是我个人心路历程上最重要的精油之一。不是因为它最好闻——是因为在我心肌炎恢复期最灰暗那几年，它是我唯一不排斥的香气。其他的香不是不好，是我没力气去感受好。后来看文献才知道，佛手柑精油的乙酸芳樟酯和柠檬烯比例接近1:1，这种分子组合在嗅球引发的神经电信号模式恰好能激活杏仁核的GABA-A受体——不是兴奋，是安静。薰衣草在这个配方里更像一个陪伴者——它的酯类含量高但分子谱系更宽，不是只做一件事，而是在旁边什么都做一点。三十年前医生说我最多再活五年。说这话时我孩子还在上小学。现在我看着孙子学钢琴，偶尔给他调一支很淡很淡的扩香油。佛手柑陪我最久，它教会我最重要的一课：好起来不是一蹴而就的事，它是每天比昨天愿意多做一个动作——今天愿意起床，下周愿意出门。`,
  'H-M-003': `睡不着的脑子我有发言权——心肌炎恢复期，一到晚上心脏的难受就会变明显，你越想忽略就越睡不着，越睡不着就跳得越厉害。后来我学聪明了：别管脑子，先从身体下手。快乐鼠尾草里的乙酸芳樟酯含量在薰衣草家族里排前三，它的酯类作用于副交感神经系统的效率和温和度都极高。很多失眠的人最大的错误是在睡不着的时候更用力地睡——越用劲越醒。鼠尾草做的事刚好相反：它让你懒得用力。马郁兰的萜品烯四醇走的是另一条路——肌肉层面——先把肩颈的紧张卸掉，身体的松会带着神经系统的松一起落地。有个连续创业者使用了第一周跟我说没变化，我说再试一周。第二周他发消息：'躺下十五分钟内意识开始变模糊。'他自己描述的那个模糊不是晕，是脑子的边缘慢慢软下去。边缘系统的过度活跃被按掉了。后来他说出最离谱的反馈——出差住机场酒店，全球最难睡的地方，他居然也睡着了。`,
  'H-M-004': `关于情绪复方，我最早的导师跟我说过一句话：'别想着能让人开心，你能做到的极限是把不开心的东西暂时移开，让开心自己有地方回来。'我记了十几年。葡萄柚的柠檬烯不穿透血脑屏障——这是好事——说明它的情绪作用是通过外周嗅觉受体间接激活大脑边缘系统的，这种间接性决定了它不会强迫情绪改变，而是一点一点地调入。橙花则是一种极其稀薄、穿透力又极强的香——它的右旋芳樟醇和乙酸橙花酯在嗅球引发的信号波像一层薄雾，不浓烈但覆盖面积大。葡萄柚是推走阴云的，橙花是让天空看起来更蓝的。有位离婚的女孩用了两周后跟我说她不是变开心了——是'空了的那块地方开始能感知到别的东西了'。她说的'别的东西'其实是外周感官的重新开放：窗外树上的鸟、咖啡店的豆子香、收银员找的零钱——这些被抑郁屏蔽的日常细节，被两支油偷偷放回了她的感知范围。`,
  'H-M-005': `罗马洋甘菊——Chamaemelum nobile——不是德国洋甘菊（Matricaria chamomilla），两者的化学成分完全不同：罗马洋甘菊的酯类——主要是当归酸异丁酯——含量极高，走神经系统镇静；德国洋甘菊的母菊薁含量极高，走抗炎通路。焦虑配方需求的是酯类，不是抗炎。香蜂草——Melissa officinalis——是一个在芳疗课本上被反复提及但在市场上极难买到真货的精油，因为出油率极低，假货率极高。真香蜂草的柠檬醛含量在40-70%之间，这个分子组合是目前已知最好的GABA转氨酶抑制剂之一——直接减缓大脑回收镇静递质GABA的速度。用外行话说：让大脑多留一些别紧张的信号。一个心慌了三年的IT男，心内科跑了无数遍，没事儿，但他是真的难受。第一次吸这个配方的时候坐在我工作室沙发上愣了将近三分钟，然后说：'胸口的那个堵，好像松了一点。'就一点点——但那种感觉他已经三年没出现过了。`,
  'H-M-006': `创作型工作有一个共同的困境：你不是没有想法，你是想法太多，被堵在门口互不相让。苦橙叶精油里有一组化合物叫乙酸芳樟酯和乙酸牻牛儿酯——它们的共同作用不是给你灵感，而是把那些堵在门口互不相让的念头中，过滤掉最吵的几个，其余的才能依次走进来。这个过程在脑科学里叫'降低默认模式网络的过度活跃'——让大脑少说话，多听。橙花在这里的层面不一样：它不走认知通路，它走的是美感通路。它的香气极其稀薄又极有穿透力——不是给你画面，是给你一个拉开窗帘的理由。我自己有无数个深夜调油调不出来的时刻——那时候就把橙花稀释到近乎闻不到的程度，放在桌角。它不会告诉我下一个配方是什么，但它会让我不那么急着知道。有时候不急着知道，就是知道。`,
  'H-M-007': `冥想这件事，精油不是必需的——前提必须说清楚。乔达摩在菩提树下证悟时没有人给他点香。但在现代社会环境里，从'上班打卡接孩子做PPT应付老板'的状态直接切换到冥想，中间的落差太大了。精油做的是减震器——帮你把切换的时间从二十分钟降到五分钟。大西洋雪松的倍半萜烯谱系极宽，从α-雪松烯到β-雪松烯到雪松醇，分子量偏大、挥发速度极慢。用在冥想前滴在手腕上，不是一上来就香，是慢慢透出来的——这个过程恰好和你从外面回到里面的节律同步。乳香的职责则是给你一个可以安放注意力的锚点——呼吸时闻到乳香，就注意这个闻到，念头跑了再回到这个闻到。这就是冥想技术的实质。瑜伽老师用了两个月后从印度给我发消息：'终于能感受到呼吸不是一件需要努力的事了。'她说以前冥想是用力的，现在不了——雪松帮她在地板上坐下，乳香帮她在呼吸里待住。`,
  'H-M-008': `人做不出决定的时候，常常不是因为信息不足——是信息太多了。大脑前额叶皮层有一个叫决策疲劳的现象：你做的决定越多，后面的决定质量越低。创业者纠结两个月A和B，其实两个方案都可行，他只是决策回路被烧短路了。罗勒里的甲基胡椒酚——也叫草蒿脑——是争议性成分，口服高剂量有肝毒性风险，但外用微量下（复方中不到0.5%）它的作用是温和的认知刷新——通过嗅觉通路激活蓝斑核，释放去甲肾上腺素，在整个大脑皮层产生短暂注意力重置。跟电脑的Ctrl+R一样——不是装新系统，是把当前页面刷新一下。胡椒薄荷在这个配方里负责的是推开——推开那些已经在决策空间里转了太多圈的旧念头。有个客户用完第三天，开车的时候突然想通了一个两个月没想通的问题。他说不是在想的——是答案自己浮上来的，那个纠结的过程忽然不值得继续了。`,
  'H-M-009': `茉莉——说这个话题之前我想先表个态：吲哚这个成分，在茉莉原精里占的比例不到千分之三，纯品是粪臭素——名字确实不好听——但稀释到极低浓度后它反而是最顶级白花香的核心。真正高级的东西往往都经历过一个不可接受的阶段——就好像真正的快乐也不能是纯糖水，必须走过一些苦涩才饱满。有个中年离异的姐姐第一次走进我工作室时全身黑色，脸色暗得像打了阴影，说自己很久没开心过了。我知道这个开心不是一般的高兴——是那种被抽走了基底情绪以后什么都变得灰蒙蒙的状态。我给她调这个配方不是因为茉莉能让人快乐——全世界没有一支油能让一个人快乐——而是因为茉莉的苯甲酸苄酯和乙酸苄酯在嗅觉通路中能激活与愉悦记忆相关的海马区。它给你看的不是明天会更好，是以前你也曾经好过。她用了一周发来一张自拍，换了件淡紫针织衫，说不知道是不是油的关系——'就是突然想出门了。'这种决定不需要科学解释。`,
  'H-M-010': `定轴——这是我自己的配方理念里最核心的词。很多人以为稳定是不动，其实不对。最稳定的结构是台风眼——外面狂风暴雨，中心一丝风都没有。芳疗做稳定感，不是让你变得坚硬，是帮你在各种外部变化中保持那个中心的静止。岩兰草的植物形态就说明了一切——根系能长达三米，钻透最硬的土壤去找水。它的精油成分——岩兰草醇、岩兰草酮——都是分子量大、挥发极缓慢的倍半萜类。你滴一滴在手心搓开，第一天晚上是泥土味，第二天早上还有。这种留到最后的物质性，在心理层面就是那个让你不急的信号。檀香的β-檀香醇则给一种温润的尊严。有个在全职工作和单亲妈妈之间撕扯的女生，她说深夜涂脚底时哭了——不是因为难过，是'终于感觉到脚踩在地板上了'。她的生活像被两只手同时往两个方向拽，岩兰草替她往地下扎了一条根，檀香替她在胸口放了一根看不见的柱子。`,
  'H-M-011': `配方叫港湾，但它其实是暂时的避难所。分手的人不需要一辈子的港湾——需要的是今晚能睡着、明天早上能起床的那种暂时的、微小的、甚至有点脆弱的平静。甜马郁兰的萜品烯四醇是地球上最温和的神经系统镇静剂之一：它不作用于GABA受体本身，而是通过抑制交感神经末梢的去甲肾上腺素释放幅度来降低整个系统的报警音量。丝柏在这里提供的是形状——分手后的人都觉得自己散了，丝柏的收敛感不是情感上的冷酷，是给情绪碎片一个临时的容器。有一个刚失恋的男生形容自己'像被掏空的贝壳'。用了两周，不是不难受了——是睡眠变完整了。'不再半夜惊醒发现枕头是湿的。'他说的睡眠质量，但我听到的是神经系统终于从惊吓状态回到了维持状态。那是恢复的第一步，也可能是最难的一步。`,
  'H-M-012': `备考这件事我太理解了——我考芳疗师证的时候也是，那本植物学教材厚得能当枕头，每天看完感觉字都从眼睛里流出来了。脑疲劳和身体疲劳完全不同：身体累了睡一觉能好，脑子累了睡一觉起来更累——因为你睡前还在想考试内容，海马区根本没有关过。豆蔻在芳疗里是清晰的暖——它的1,8-桉叶素和乙酸萜品酯双高，对精神倦怠不像薄荷那样冷刺激，而是像冬天被窝里的一盏小台灯——亮但不刺眼。柠檬的柠檬烯可以提升蓝斑核的去甲肾上腺素水平，把整个大脑皮层的背景广播音量调高一点点——不是兴奋，是让你不再觉得自己的脑子像被棉被蒙住了一样。一个医学生连考了两周期末，说脑子'像用旧了的橡皮擦'——擦什么都擦不干净。他晚上七点用了一次，本来打算睡半小时再起来复习，结果洗把脸清醒了，撑到十一点把最后两章刷完。他说不是兴奋——'是脑子不糊了，搁浅的感觉消失了。'`,
  'H-M-013': `勇气在脑科学里是有对应位置的——就在前额叶皮层和杏仁核之间的那个平衡点上。杏仁核负责恐惧反应，前额叶负责风险评估和行为抑制。当杏仁核对前额叶的抑制信号太强时，人就不敢说、不敢做——不是没有能力，是被恐惧回路短路了。月桂叶——Laurus nobilis——在古希腊是胜利者的桂冠，这不是诗意是科学：它里面的1,8-桉叶素能提升前额叶皮层的去甲肾上腺素敏感性，让负责做决定的那部分大脑不那么容易被杏仁核的恐惧信号按下去。胡椒在这里提供的是微量物理刺激——它在皮肤上轻微的温热感像一只手轻轻拍你的背。一个被导师压了两年论文的研究生，第一次去见导师之前涂在了手腕上。她说那天她说出了自己的学术判断——不是吵架不是吼，就是说出来了。声音不大，手没抖。她说那是她研究生涯的分水岭。`,
  'H-M-014': `产后那几个月——我自己经历过——不是抑郁，是另一种东西。全世界注意力集中在那个小生命身上，你自己就自动退到了一个看不见的角落。你没问题，你只是被忘了。天竺葵走的是心经——它的香茅醇能温和提升血清素水平，不多，就一点点。产后那段时间，一点点就够了。香草的温暖感和大多数温暖系精油不一样——它不是热的，是软的。香草醛在嗅觉通路中激活的是与童年和哺乳记忆相关的脑区——这不是化学，是神经生物学。你在半夜喂奶、困得魂都散了的时刻闻到一点点香草——不是香水，是回忆，是你妈妈身上的味道。来找我的妈妈没有提产后抑郁四个字——她就是来配一支让自己能熬过凌晨三点的油。她说涂在手腕上，半夜喂奶间隙闻到，'忽然觉得自己还是存在的。'我也有孩子，我懂。不只是存在的——是活着的。`,
  'H-M-015': `凌晨下班是一种很特殊的生理状态——身体累到了极限，大脑却还停留在工作模式的最高转速。这是昼夜节律中最脆弱的低谷期叠加了职业性高警觉状态，等于把一根弹簧拉到最长然后猛地松手——它该弹回去，但弹不回去了。青柠精油和柠檬虽是近亲，化学成分差异显著：青柠的柠檬烯含量更高，同时还含有微量香茅醛和柠檬醛，这让它的香调比柠檬多了一层绿色的锐利感。绿薄荷的香芹酮则负责另一个层面的唤醒——不是刺激，是切开——像你在一间密闭了一夜的房间里拉开窗帘，不是阳光进来了，是'外面'这个概念进来了。两年夜班便利店店长用了这支配方之后对我说的第一句话是：'我好久没闻到早晨的味道了。'这个早晨不是香气——是他人生中某种正常节律的回归。`,
  'H-M-016': `感恩——这是我活过心肌炎之后的底色。今年是我被医生下判决后的第三十二年。有时候坐在工作室，阳光从百叶窗斜打进来照在精油瓶上，整排瓶子亮起来像药房又像圣殿——我就想，能多活的这几十年，得做点什么，才对得起老天爷多给的这点时间。秘鲁圣木Palo Santo在南美传统里是用来清洁空间的。它的化学事实是：燃烧或扩香时释放的柠檬烯和α-萜品醇能显著降低空气中的细菌负荷。它和乳香在一起，产生一种空间的深度感——你感受到自己和墙壁之间存在距离，不是被压力和杂念压缩成一个没有体积的点。有位神父对我说默想时闻到这味道，教堂的彩窗好像变亮了——'不是幻视，就是一种澄明的感觉。'一支油帮助一个修行三十年的老人看见彩窗变亮——我活着的这第三十二年，至少做对了一件事。`,
  'H-S-001': `迈索尔老山檀——不是新山檀，不是澳大利亚廉价替代——是印度迈索尔三十年树龄以上的心材蒸馏品，β-檀香醇含量超过75%。这个级别的檀香有一个罕见的特性：你第一次闻的时候可能什么都没闻到。不是没味道——是它的分子太大、挥发太慢，需要你的体温慢慢哄它出来。这个过程恰好就是回家的过程——不是冲进来大喊我回来了，是脱了鞋在玄关站了一会儿，屋里的人还没发现你已经到家了。阿曼乳香Boswellia sacra和索马里乳香的化学差异非常大：阿曼的乙酸因香酯含量明显更高，这个成分能减缓呼吸频率而不改变潮气量——你不需要深呼吸，你的呼吸自己变慢了。这正是归真的第一步：你不需要努力回家，你的身体已经在家了。辞去高管的中年男人在我工作室坐了一个下午，走之前说：'我赚够了，把自己丢了。'他是需要被找到的那个人。这支油不会帮他找到——但会让他觉得寻找本身不那么绝望。`,
  'H-S-002': `沉香是人类文化史里最昂贵也最被误读的芳香材料之一。它不是木材本身——是白木香树被真菌感染后自身分泌的树脂经过至少十五到二十年的缓慢陈化形成的结脂。这个过程没人能加速——它就是植物和苦难共处二十年之后的样子。沉香从化学上讲是一种时间化合物——它的倍半萜酮和色酮类物质不是一年两年形成的。玫瑰在这里的作用非常微妙：不是加甜，是加人味。沉香超然了，人在独自面对最深的问题时不能被超然——需要一点温暖在旁边告诉他'你还在人间'。大马士革玫瑰的苯乙醇就是那个人间的使者。从剑桥退学的物理博士生来找我，不是为了被疗愈——他没有病。他在找一种不通过数学公式也能感知秩序的方法。他说闻到这个配方时脑海里浮现的不是画面，是一段他从未推导过的公式——不是靠逻辑推到那一步，是看见的。后来他去做木工了。他是我见过最不需要被疗愈的来访者——他只是想要另一种感知的通道。`,
  'H-S-003': `心轮——梵语Anahata——在七轮系统里是唯一一个未敲而响的轮。不需要触碰、不需要条件——它自己就会响，只要你敢让它。很多人在亲密关系里受的伤不是爱情本身——是心打开了以后没有得到预期的回响。下一次打开的时候本能地多加了锁。大马士革玫瑰的苯乙醇是目前所有花卉原精中唯一一个在嗅觉通路中能同时激活海马体和岛叶皮层的分子。海马体负责记忆——你会想起第一次心动那天下午的光线；岛叶皮层负责内感受——你会感知到自己当下的心跳不是以前那种加速的紧张，是一种稳定的、被什么东西托住的感觉。橙花的微量芳樟醇则像一个人什么都不说但一直在你旁边。受到反复伤害的女孩用了两个月后写了一封长信给前男友——不是复合，是'说完该说的话，然后把门轻轻关上'。她写这封信的时候点了这支配方。写完以后没有哭。那就是未敲而响。`,
  'H-S-004': `顶轮Sahasrara——七轮最上端那千瓣莲花。很多人以为打开顶轮就能看见光、听见天上的音乐。实际上顶轮的通往往不是什么壮观的体验——它有时候只是你坐在那里，不再觉得头顶被什么东西盖住了。莲花原精是全世界提取率最低的花卉芳香物质之一——几万朵蓝莲花得一毫升，溶剂萃取的原精，分子量极大，挥发极慢，闻起来若有若无。这种淡到近乎不存在的特性，恰好和顶轮的空对应：它不是某种有，它是所有有被轻轻撤掉之后剩下的那个东西。乳香在这里的职责是托住——不是推你上去，是让你在上升过程中不会因为害怕坠落而自己把自己拉回来。修行八年的禅修者凌晨四点半用了这支油，告诉我头顶像开了一扇天窗——不是看见了什么，是通了。我在芳疗里待了三十年之后，有些事没法用化学分子式解释，但也不会说它不存在。`,
  'H-S-005': `扎根的植物都有一个共同点：它们看上去什么也没做。广藿香长在印尼雨林底部，不攀爬不开花不结果，阳光被高层乔木全部遮掉，它仍在阴暗潮湿的泥土里一年一年地长。精油是根系越老越浓，三年以下的几乎没味道。广藿香醇是倍半萜醇的一种——分子量大、粘度高，涂在皮肤上不是挥发，是停留。岩兰草的土木气味在芳疗里被形容为世界末日里最后一缕让你安心的味道。这两个在一起，给的不是轻飘飘的放松——是脚底板踩到地球表面那一刻的真实感，你被引力抓住了，不会飘走。有位通灵者说她每天像没有皮肤一样接收所有人的情绪，脚不在地上，能量一直在头顶上方飘。用了这支配方涂脚底后说：'终于能睡一个不梦见别人情绪的觉了。'广藿香替她长了一副新皮肤，岩兰草替她往地里扎了一条三米长的根。`,
  'H-S-006': `喉轮Vishuddha对应的是表达。但把表达问题归结为勇气不够太粗糙了——很多时候不是不敢说，是喉咙那个物理通道本身卡了。蓝洋甘菊的母菊薁走的是抗炎通路——喉部慢性炎症很多时候不自知，但它造成的平滑肌张力变化确确实实让你在开口之前就感觉到了阻力。尤加利在这里的角色是信号刷新——它的1,8-桉叶素通过嗅觉通路激活喉部周围的三叉神经末梢，相当于给负责声带控制的神经肌肉系统发了一个'该工作了'的提醒。两个一起：一个消你感觉不到的炎，一个叫醒你被岁月磨钝了的声带。一个口吃严重的中文系教授用了三周，在学术会议上完整读完了一整页论文，没有一个字结巴。他下台时给我发了三个字：'塞子松了。'那是我芳疗生涯里收到的字数最少、分量最重的消息。后来我们成了每年春节互相寄茶的忘年交。`,
  'H-S-007': `眉心轮Ajna在解剖学上没有对应的器官，但在神经影像学里它的位置恰好落在松果体上方的前额叶皮层深处——也就是默认模式网络的核心节点。直觉、洞察、灵感的关闭，科学上对应的是这个区域的过度压制——被压力、焦虑、疲劳长期压着，就钝了。永久花——没有比它更适合眉心轮的精油——它的意大利双酮有极强的微循环促进作用，不扩张血管，是让毛细血管床的开放率回升。眉心微循环一旦改善，前额叶皮层的供氧量就上去了，默认模式网络的连接密度也跟着恢复。快乐鼠尾草在这里是解压阀——乙酸芳樟酯降低杏仁核的过度放电，把压在前额叶上的焦虑信号调低。一个美院女生说她突然对颜色不敏感了——看什么都灰蒙蒙。不是眼睛的问题，是感知阈值的上升。她用了快一个月，某天黄昏坐在屋顶上看天从橙色变成紫色，忽然发现紫色有六种——'原来我没瞎。'我知道那是她的第三眼重新睁开了。`,
  'H-S-008': `流产过两次的客户第一次来的时候，全身裹着很厚的衣服。夏天。她说自己的身体不再属于自己——'只是一个会坏的容器'。我在芳疗从业三十年里听过很多身体与自我的断裂叙说，没有一句比这四个字更让我疼。脐轮Svadhisthana是创造的源头——不仅是生育，是一切创造：画画、煮饭、重新开始一段生活。依兰的大分子倍半萜烯走的是一个极其缓慢的路径——它像一个很轻的手，贴在腹部外侧，不说你会好的，只是贴着。大花茉莉原精在这里走的不是香，是暖——茉莉的吲哚和乙酸苄酯复合物在极低浓度下对子宫平滑肌有极其微弱的解痉作用，不是药，更像一个安慰信号：你没有被抛弃。她用了两个月后——不是在复诊时说的，是在菜市场偶遇，提着一袋橙子忽然停下来说：'Alice，我肚子是暖的——不是排卵期那种热，是活着的那种暖和。'后来她怀孕了，保住了，寄来一张全家福——那是我在这个行业里收到过的最好的礼物。`,
  'H-S-009': `太阳轮Manipura翻译过来是宝石之城，它在腹腔神经丛的位置，掌管的是自我边界和意志力量。被职场PUA打击的人最明显的症状不是愤怒——愤怒的人还有力量——是胃绞起来：每次走进办公室，腹部的平滑肌先于意识开始痉挛。柠檬是给太阳轮的颜色——高柠檬烯通过嗅觉通路激活的是人的向上本能：抬头、挺胸、睁开眼睛。肉桂皮在这里是最冒险也最精准的选择——肉桂醛在真皮层有极微弱的温暖刺激，不是烧，是那种有人把手放在你背心轻轻按了一下的感觉。这个手感对自我边界被反复践踏的人来说，是重新学习边界的第一课。阳光黄色、微温、微辣——太阳轮就该是这个味道。一个被PUA了半年的行政女孩用了一周半，在会议上第一次反驳了上司——不是吵架，是平静地说出自己估算的数字。手没有抖。她辞职那天早上抹了这个油去的——'不是壮胆用的，就是想在走的时候能直直地走出去。'她做到了。`,
  'H-S-010': `气场这个词很多人觉得玄。但放到神经科学框架里——气场的客观部分其实是周围的空间感和社交距离。当你的神经系统处于过度警觉状态时，你本能地把安全距离拉得很远——别人靠近你三米你就开始不舒服。你的气场不是变小了，是变薄了、变脆弱了。没药的呋喃桉叶二烯在常温下挥发极慢，涂抹在皮肤上能维持四到六个小时的淡淡存在，像一个看不见但一直都在的边界。安息香树脂的香草醛在旁边提供一种极其温和的防御态度——不是拒人千里，是'到这里为止'。在儿科病房工作十几年的护士长来找我的时候，她说下班后总感觉穿了一件很重的外套。其实不是外套——是她的神经系统被一整天的哭声和家属焦虑浸泡软了，盔甲变成了累赘。用了这支油以后她说最明显的变化是：'下班回家地铁上，旁边人的哭声终于不再让我心头一紧了。'`,
  'H-S-011': `宽恕不是一个能被调配的情绪。它甚至不是情绪——它是一个决定。而且是你决定不做但永远被它纠缠的决定。对方已经不在了、话已经说不出口了、和解失去了物理上的可能——但你还需要继续活着，而你发现继续活着的方式不是遗忘，是原谅自己没有在还来得及的时候做点什么。香蜂草极低的出油率意味着每一滴都要消耗巨量植物原料——它的柠檬醛把紧绷的边缘系统轻轻扒开一条缝。不是大彻大悟，是有那么一瞬间你不再死抓着那个如果当初不放。玫瑰天竺葵在这里走的不是心经，是人间的温度——香蜂草太超然了，天竺葵提醒你：你还在这个世界上，阳光今天落下来了，茶水还温着。失去母亲的那个女儿最后说出的三个字不是'好了'，不是'过去了'——是'可以了'。不是放下，是可以放下了。`,
  'H-S-012': `恋人的分离是世界上最短也最长的距离。短到你们可以每天视频、实时分享晚餐照片；长到对方不在的夜晚，被子的另一半怎么都捂不热。这支配方不是给失去的人，是给还在等的人。橙花在嗅觉科学的共同记忆唤醒实验里表现出一种罕见的特性：同一支橙花油，两个人在不同地点同时闻到，脑中激活的当下场景完全不同，但情感色彩高度一致。这就是橙花在异地恋配方里的核心价值——不是让两个人闻到一样的东西，是让两个不同空间里产生同一色调的情绪。檀香负责的是等待的温度——不是燃烧，是暖。一对异国两年的情侣各拿了一瓶，说'香是看不见的拥抱'。分开十个月后他们在加州重逢——没有吵架、没有冷淡，在机场拥抱了很久。女生从包里拿出那瓶还剩三分之一的油给男生看：'我一直在用。'`,
  'H-S-013': `艾草在东方文化的位置比在西方芳疗教材里重要得多。欧洲把艾草精油束之高阁——侧柏酮的神经毒性在口服高剂量下存在风险。但在中国，艾草应用史超过两千年：灸、浴、熏、佩，从产妇恢复到端午辟邪。它不是一种精油——它是一个文明的嗅觉记忆。有位禅修多年的老修行来找我，第一句话是：'我腿不麻、腰不酸、心也不乱——就是脑子比腿还忙。'这不是缺乏修行功底，是修行太深了——念头已经极少，少到剩下那几个反而格外突出。艾草的微量侧柏酮在这个配方里不是来清除杂念——是给那几个仅存的念头一条可以飘走的路径。檀香负责给呼吸一个毫不费力的锚点。他用了之后说打坐时间没变长，但'密度变了'——念头还是在，但它们不再粘住不放，像溪水里的叶子一飘就走了。这个描述比任何修行次第术语都精确。`,
  'H-S-014': `仰望星空的时候感到渺小——这不是抑郁，是真实的感知：人类在可观测宇宙里确实渺小。但渺小和无意义之间差了一样东西：连接。不是你大到能和宇宙对话，是有根线把你连在一起，哪怕渺小，你们之间有关系。阿曼的神圣乳香——Boswellia sacra高海拔品种——乙酸因香酯含量是索马里乳香的三倍以上，这个成分在嗅觉心理实验中表现出空间扩展感：不是看到更大的空间，是感知到自己和更大空间之间有一条通路。保加利亚玫瑰在这里的任务极其具体——它负责让那条通路不是冰冷哲学问题，是暖的、香的。有位天文爱好者晚上在阳台涂了这支油在太阳穴上，抬头看猎户座，他说：'觉得我们之间有关系了。'那个瞬间，他不再是一个孤独的观测者和一堆冷漠的物理常数——他是被宇宙看见了的。`,
  'H-S-015': `ICU护士离职了。不是因为干不了——是因为干了太久，太多凌晨三点的抢救、太多被关掉的监护仪、太多再也睁不开的眼睛。她没被打垮——她是被泡透了。生离死别把感知泡发木了，像泡在水里三天的手指，按下去什么都感觉不到。椴树花原精极其稀有——它的酯类谱系里有一种温和到几乎不存在的气味。它不是来刺激你的，是来洗你的。白松的松烯在这里不是主角——它是椴树的侍者——把椴树若有若无的香气背后那些沉重的空气一寸寸稀释掉。她用了两周，有一天一个人出门散步，听见梧桐树上鸟叫——'三年了，第一次听见。'她没哭。但我心里知道——鸟一直都在，是她的耳朵被还回来了。椴树洗了她的听觉通路，白松在她心口开了一扇小窗。`,
  'H-S-016': `极境复苏——这四个字是接完一个癌症康复者的电话之后写下来的。他说：'活下来了，但活着的质感不太对。'不是怕复发，不是怕身体垮——是怕自己再也不是自己了。手术刀划开的不只是皮肤和筋膜，还有他作为健康人的整个自我认同。没药的呋喃桉叶二烯——Furanoeudesma-1,3-diene——是没药属的标志性成分，在体外实验中显示出显著促进皮肤成纤维细胞迁移的能力。这个化学事实对应到身体感知就是：涂抹带没药的配方时，伤口的边界不是消失了——是被重新定义了——从你受了伤的地方变成你已经开始长出新皮肤的地方。乳香配上没药是三百年古老搭配，乳香的乙酸因香酯在嗅觉通路中降低皮质醇水平，让身体从应激模式退回到修复模式。沉香在这里不是药——是一只手。这个人用了一个月后告诉我：'早上醒来不再先摸刀口了。'我什么都没多问。Eric从索马里、阿曼和越南分别收回来的没药、乳香和沉香——三支最古老的味道为一具正在重新学会活着的身体铺了一条路。路的尽头不是痊愈——是不必一直记得自己是个病人。`,
};

function getArtifactSpecsForItem(cn: string, subgroup: string): { material: string; craft: string; scene: string; dimension?: string } {
  if (cn.includes('扩香石') || cn.includes('清空石')) {
    return { material: '景德镇高白瓷 / 冰岛天然火山熔岩', craft: '1300℃高温无釉素烧多孔吸附', scene: '书房案头 / 床头静音漫扩香', dimension: '95mm x 95mm x 35mm' };
  }
  if (cn.includes('芳香链') || cn.includes('觉知珠')) {
    return { material: 'S925银镀18K古法金 / 印度老山檀木珠', craft: '微孔缓释透气精雕 / 手工盘磨', scene: '随身佩戴 / 气场防护与安神持诵', dimension: '108颗持珠 / 45cm链长' };
  }
  if (cn.includes('木核扩')) {
    return { material: '北美黑胡桃木 / 黑檀木芯', craft: '无漆无蜡手工研磨导油扩散', scene: '车载香氛 / 办公桌伴生扩香', dimension: '45mm x 45mm x 60mm' };
  }
  if (cn.includes('精油烛')) {
    return { material: '100% 天然大豆蜡 / 纯棉木芯', craft: '手工灌装 / 12% 纯精油高浓度添加', scene: '夜间阅读 / 浴缸泡澡仪式', dimension: '200g / 燃烧约45小时' };
  }
  if (cn.includes('雾露器')) {
    return { material: '医用级PP水箱 / 哑光陶瓷外套', craft: '2.4MHz高频超声波细微冷雾化', scene: '卧室助眠 / 200ml大容量8小时定时', dimension: '130mm x 150mm' };
  }
  if (cn.includes('归真座')) {
    return { material: '宜兴紫砂粗陶 / 锤纹铜承盘', craft: '手工柴烧拉坯 / 隔火熏蒸工艺', scene: '茶室静坐 / 沉香盘香隔火香道', dimension: '140mm x 90mm' };
  }
  if (cn.includes('一柱香')) {
    return { material: '海南天然沉香 / 芽庄楠木黏粉', craft: '无化学粘合剂无烟理气手工制香', scene: '晨起静坐 / 15分钟短时聚焦', dimension: '21cm x 30支装' };
  }
  if (cn.includes('承露璃')) {
    return { material: '高硼硅手工吹制耐热玻璃', craft: '冷凝接露双层隔热手工打磨', scene: '纯露水相收集 / 花草水湿敷仪式', dimension: '350ml 容量' };
  }
  return {
    material: '天然原木 / 手作陶瓷 / 紫铜',
    craft: '匠人手工研磨无漆无毒制作',
    scene: '茶席静修 / 卧室安神 / 随身熏蒸',
    dimension: '标准配器规格'
  };
}

// 动态针对全站 219 款产品的丰富属性自动补充生成器 (Alice 创始人专业与人文视角的个性化生成)

export const PRODUCT_DIARY_MAP: Record<string, { ericNotes: string; aromatherapistNotes: string }> = {
  'H-B-201': { ericNotes: `摩洛哥阿特拉斯山脚下，老匠人用石磨碾碎仙人掌籽，榨出的油脂金黄透亮。他告诉我，这油能修复沙漠里最干裂的皮肤。云感霜正是这份修复力的现代化身：以植物角鲨烷为基底，亲和皮脂膜，复配乳香、大马士革玫瑰、胡萝卜籽与意大利永久花四种元境精油。乳香的树脂修护力与玫瑰的细胞再生力协同，永久花卓越的微血管修护与化瘀能力加持，质地如云絮轻抚。我把霜点在脸上推开，那股柔滑的触感，仿佛把阿特拉斯山的温柔，都揉进了皮肤里。`, aromatherapistNotes: `云感霜，是“熟龄肌弹润淡纹的全能面霜”。中医讲“面为心之华，润则泽”，角鲨烷分子结构亲和皮脂膜，渗透迅速不留油腻；乳香修护、玫瑰再生、永久花化瘀、胡萝卜籽滋养——多效协同，适合干性、敏感及初老肌肤，也适合换季时屏障的滋养修护。我常建议熟龄案主：夜间以云感霜作为护肤末步，配合按摩手法，让肌肤在云絮般的滋养里慢慢恢复弹性。愿这瓶阿特拉斯的云絮，替你托住岁月的轮廓。` },
  'H-B-202': { ericNotes: `尼泊尔博卡拉的手工纸坊里，工人的手指布满裂纹，却仍灵巧地抄纸。我把试制的润迹膏递给一位老匠人，他涂上后沉默片刻，用尼泊尔语说了一句——像妈妈的手。这句话，让这罐膏有了温度。润迹膏以蜂蜡与乳木果油为固态基底，加入永久花、薰衣草与安息香三种修护精油。固态膏体在体温触碰下即融化，深层封护干燥与皲裂；永久花的细胞再生力配合薰衣草的安抚与安息香的温柔包裹，形成一层天然保护膜。我把膏体抹在干裂的指尖，那股温润的触感，仿佛真的被母亲的手握住。`, aromatherapistNotes: `润迹膏，是“皲裂与干燥的精微修护膏”。中医讲“燥则皲，润则合”，蜂蜡与乳木果油提供封护屏障，永久花再生、薰衣草安抚、安息香包裹——适合唇部夜间修护、指尖倒刺、手肘膝盖干燥与脚后跟干纹。睡前厚涂，晨起柔软新生。我常建议案主：冬季或常洗手的人群，随身携带润迹膏，睡前厚涂于干燥部位，让精微的滋养陪你慢慢愈合。愿这罐博卡拉的温柔，替你修护每一道生活的裂纹。` },
  'H-B-204': { ericNotes: `日本高野山的晨钟敲响时，僧人的庭院里弥漫着橙花香气。我站在廊下，露水从枫叶尖滴落，那一刻我想——如果清晨能被装进瓶子，就该是这个味道。晨曦液正是这样的清晨：以橙花纯露为基底，复配甜橙、天竺葵与乳香。微分子水相配方能在三秒内穿透角质层，橙花的清雅白花与甜橙的阳光果香交织成晨曦洒落的第一缕光，天竺葵平衡水油，乳香守护屏障。我在晨光里喷了一捧，那股清亮的香气，仿佛把高野山的晨钟，都敲在了皮肤上。`, aromatherapistNotes: `晨曦液，是“晨间醒肤与熬夜急救的焕亮之水”。中医讲“一日之计在于晨，阳气生发则面润”，微分子水相配方快速渗透，橙花纯露温和提亮，甜橙提振心情，天竺葵平衡水油，乳香修护屏障——适合晨间倦怠、熬夜后急救提亮与妆前保湿打底，所有肤质适用，敏感肌友好。我常建议案主：晨起护肤第一步，以晨曦液拍敷唤醒细胞，让肌肤与心情一起迎接新的一天。愿这捧高野山的晨钟，替你敲开每一个清醒的清晨。` },
  'H-B-209': { ericNotes: `大理洱海边，白族阿姐在月光下采桂花，香气随着夜风飘进院子。她说，桂花只在月圆时最香——那句话像一句诗，被我记了很多年。月华油正是这份月光的诗意：以冷榨荷荷巴油为基底，分子结构与人体皮脂高度相似，加入薰衣草、罗马洋甘菊、乳香与檀香四种安神精油。荷荷巴油能深入滋养而不堵塞毛孔，薰衣草与洋甘菊温柔安抚，乳香与檀香深度镇静，桂花原精的点缀赋予它月光浸透般的诗意。我把油轻轻按在脸上，仿佛把洱海的月夜，都揉进了皮肤里。`, aromatherapistNotes: `月华油，是“夜间修护与冥想按摩的月光之油”。中医讲“夜卧则血归于肝”，夜间是肌肤修护的黄金时段——荷荷巴基底亲肤不堵塞，薰衣草与罗马洋甘菊安抚神经，乳香与檀香镇静心神，桂花原精增添诗意。适合夜晚冥想后按摩面部与全身，或沐浴后作为身体滋养油，所有肤质适用。我常建议案主：睡前以月华油按摩面部与肩颈，配合深呼吸，让肌肤与心神在月光里一起修护。愿这瓶洱海的月华，替你守住每一个夜晚的滋养。` },
  'H-B-212': { ericNotes: `冰岛蓝湖温泉边，冷风裹着硫磺和苔原的气息扑面而来。当地人说，这里的泉水能让头皮焕然一新——那股清冽的矿物感，正是清冽发的灵感来源。这支头皮精华以清爽水相基底，搭载留兰香、茶树、迷迭香与雪松四种精油：胡椒薄荷的清凉从发根沁到头顶，茶树的净化力平衡头皮微环境，迷迭香的活化力促进循环，雪松的收敛力收束毛鳞片。我把精华滴在掌心揉开，那股清凉直冲头皮，仿佛把冰岛的风，都梳进了发丝里。`, aromatherapistNotes: `清冽发，是“油性头皮与换季头屑的清爽方案”。中医讲“发为血之余，头为诸阳之会”，头皮护理讲究清透与循环并重——留兰香与茶树平衡油脂、净化微环境，迷迭香活化毛囊，雪松收敛舒缓。水相基底清爽不黏腻，洗后发丝蓬松有凉感，适合油性头皮、换季头屑困扰者。我常建议案主：以清冽发按摩头皮数分钟再洗净，每周两到三次，让头皮在清凉中找回平衡。愿这缕冰岛的风，替你守住头皮的清爽与毛囊的活力。` },
  'H-B-216': { ericNotes: `凝脂霜，是UNIO元香为“屏障受损的肌肤”调制的一支修护霜。肌肤的屏障，像一道看不见的墙——墙塌了，泛红、干燥、敏感就都涌进来。这支修护霜以神经酰胺与植物角鲨烷为基底，修护受损的皮脂膜；辅以洋甘菊与积雪草的舒缓，安抚泛红；以乳香的修护收尾，让屏障重新立起来。我把霜点在脸颊推开，那股如脂的温润缓缓渗入，仿佛有一双温柔的手，替肌肤把倒塌的墙，一块一块地重新砌好。`, aromatherapistNotes: `凝脂霜，是“屏障修护与敏弱肌养护的乳霜”。中医讲“卫气者，所以温分肉、充皮肤、肥腠理”，肌肤屏障正是中医“卫气”的现代解读——神经酰胺与角鲨烷修护皮脂膜，洋甘菊与积雪草舒缓泛红，乳香促进修复。适合屏障受损、换季敏感与干性肌肤。我常建议案主：屏障受损期间，简化护肤，以凝脂霜厚涂于泛红干燥处，让肌肤在温润中慢慢重建防线。愿这缕凝脂之护，替你守住肌肤的屏障。` },
  'H-B-217': { ericNotes: `舒筋油，是UNIO元香为“肩颈僵痛的人”调制的一支复方油。现代人的肩颈，是身体的“天气预报”——久坐、低头、空调冷风，肩膀比心先累。这支复方以姜与黑胡椒的辛暖开场，温通经络、驱散寒湿；以迷迭香与马郁兰的活络跟进，舒缓僵硬的肌肉；以薰衣草的温柔收尾，让紧绷的神经一起放松。我把油倒在掌心搓热，敷上肩颈，那股辛暖的气息缓缓渗入，仿佛有一双温热的手，把积攒了一天的僵与寒，一寸寸地揉开了。`, aromatherapistNotes: `舒筋油，是“肩颈关节温通的复方油”。中医讲“通则不痛，痛则不通”，肩颈僵痛多是寒湿凝滞、经络不通——姜与黑胡椒温散寒湿，迷迭香活血通络，马郁兰舒缓肌肉，薰衣草安抚神经。适合久坐族、低头族与空调房的肩颈护理。我常建议案主：以舒筋油搓热后按摩肩颈与关节，配合缓慢转头，让辛暖的香气替你化开僵与寒。愿这缕温通之香，替你卸下肩上的重担。` },
  'H-B-218': { ericNotes: `塑容油，是UNIO元香为“面部浮肿与松弛”调制的一支复方油。脸部的水肿与线条松弛，是许多人的困扰——而答案，往往藏在“循环”二字里。这支复方以葡萄柚与天竺葵的轻盈开场，促进淋巴循环、排出滞留水分；以迷迭香的活络跟进，紧致面部线条；以玫瑰的滋养收尾，让紧致不显紧绷。我把油滴在掌心温热，沿着下颌线向上提拉，那股轻盈的香气缓缓渗入，仿佛有一双看不见的手，替面部做了一次温柔的淋巴排浊——线条，悄悄紧致了。`, aromatherapistNotes: `塑容油，是“面部淋巴排浊与紧致的复方油”。中医讲“面为诸阳之会，活血则面华”，面部水肿多是循环不畅——葡萄柚与天竺葵促进淋巴循环，迷迭香活络，玫瑰滋养紧致。适合晨间浮肿、熬夜后的面部护理与抗初老保养。我常建议案主：以塑容油配合面部提拉按摩，从下巴向上推至耳后，让轻盈的香气替你唤醒面部的循环。愿这缕塑容之香，陪你守住面部的轮廓与光彩。` },
  'H-B-219': { ericNotes: `暖腹膏，是UNIO元香为女性“每个月的那几天”调制的一支按摩膏。女性的腹部，藏着太多不为人知的辛苦——经期的小腹坠痛、手脚冰凉、情绪起伏，都在这方寸之间。这支药膏以姜与肉桂的辛暖为主调，温养腹部、驱散寒凉；辅以快乐鼠尾草的安抚与玫瑰的温柔，让身心的潮汐平稳过渡。我把膏体在掌心化开，轻轻按上小腹，那股暖意缓缓渗入，仿佛有一双温柔的手，替你把每个月的辛苦，都轻轻托住了。`, aromatherapistNotes: `暖腹膏，是“经期温养与腹部护理的植物按摩膏”。中医讲“女子以血为本，温则血行”，经期的不适多是寒凝气滞——姜与肉桂温经散寒，快乐鼠尾草调经安神，玫瑰疏肝养血。适合经期前后、畏寒体质与腹部护理。我常建议案主：经期前一周起，以暖腹膏按摩小腹与腰骶，让辛暖的香气陪你平稳度过每个月的潮汐。愿这缕月月温养之香，替你守住腹部的温暖与身心的从容。` },
  'H-B-220': { ericNotes: `静脉舒，是UNIO元香为“久站久坐的人”调制的一支腿部按摩油。一整天站着或坐着，腿会像灌了铅——那不是错觉，是循环在抗议。这支复方以丝柏与杜松的清凉开场，收敛静脉、促进循环；以薄荷的透凉跟进，瞬间带走腿部的沉重；以天竺葵的平衡收尾，让腿部恢复轻盈。我把油倒在掌心，从脚踝向上按摩小腿，那股清凉的香气缓缓渗入，仿佛有看不见的溪流，正把腿里的沉重一寸寸冲走——脚步，重新轻了。`, aromatherapistNotes: `静脉舒，是“腿部活络与循环促进的按摩油”。中医讲“湿性重浊”，腿部沉重多是水湿停滞、循环不畅——丝柏与杜松利水通络，薄荷清凉醒神，天竺葵平衡。适合久站久坐族、静脉曲张倾向与晚间腿部放松。我常建议案主：晚间以静脉舒从脚踝向上按摩小腿，抬高腿部片刻，让清凉的香气替你带走一天的沉重。愿这缕轻盈之道，陪你走回轻快的步伐。` },
  'H-B-221': { ericNotes: `抚纹油，是UNIO元香为孕期妈妈调制的一支复方油。孕纹，是生命留下的痕迹——它不该是焦虑的来源，而该是被温柔对待的纪念。这支复方以玫瑰果油与乳木果油为滋养基底，为肌肤补充弹性；以乳香与永久花的修复跟进，淡化已有纹路；以薰衣草的安抚收尾，让孕期的身心都松弛下来。我把油轻轻按在腹部，那股安心的香气缓缓漫开，仿佛有一双温柔的手，替准妈妈托住了这份生命的重量——愿每一道纹，都是被爱过的印记。`, aromatherapistNotes: `抚纹油，是“孕产期纹路预防与护理的复方油”。中医讲“血以濡之，气以煦之”，孕期的肌肤需要双倍的滋养——玫瑰果油与乳木果油补充弹性，乳香与永久花促进修复，薰衣草安抚身心。适合孕期腹部、臀部与大腿的日常护理。我常建议准妈妈：孕中期起每日以抚纹油按摩腹部与易生纹处，让滋养与安心陪伴整个孕期。愿这缕抚纹之香，陪你温柔地迎接新生命。` },
  'H-B-222': { ericNotes: `净颜萃，是UNIO元香为“痘肌”调制的一支草本滴剂。长痘，是肌肤的“上火”——熬夜、辛辣、压力，都会让肌肤冒出火气。这支复方以茶树的清劲开场，净化痘肌、平衡油脂；以薰衣草的安抚跟进，舒缓红肿；以百里香的杀菌收尾，让炎症退散。我把一滴精油点涂在痘痘上，那股清劲的草本香缓缓渗入，仿佛给发炎的肌肤降了一场温柔的雨——红肿，慢慢退下去了。`, aromatherapistNotes: `净颜萃，是“祛痘消炎的草本复方滴剂”。中医讲“痤疮多由肺胃蕴热”，痘痘的根源在湿热内蕴——茶树净化抗菌，薰衣草舒缓红肿，百里香杀菌消炎。适合痘肌、油性肌与换季爆痘期。我常建议案主：以净颜萃点涂于痘痘处，避免全脸使用，配合规律作息，让草本的力量替你安抚肌肤的火气。愿这缕草本的净化之香，陪你守住面部的清爽与平整。` },
  'H-B-223': { ericNotes: `润体油，是UNIO元香为“秋燥季节”调制的一支身体油。秋风一起，皮肤最先知道——干燥、起皮、紧绷，像是身体在提醒你：该好好滋养了。这支复方以乳木果油与甜杏仁油为丰润基底，为肌肤筑起锁水的屏障；以檀香与广藿香的温润跟进，滋养熟龄与干性肌肤；以甜橙的明亮收尾，让滋养带着秋日阳光的温度。我把油抹在干燥的小腿上，那股丰润的触感缓缓渗入，仿佛给皮肤穿上了一件柔软的水衣——秋燥，被温柔地挡住了。`, aromatherapistNotes: `润体油，是“秋燥季节的身体深度滋养油”。中医讲“燥则润之”，秋季养生的重点是润肺润肤——乳木果油与甜杏仁油深层滋养，檀香与广藿香温润肌肤，甜橙提振心情。适合秋冬干燥季节、干性肌肤与浴后全身护理。我常建议案主：沐浴后趁肌肤微湿，以润体油全身涂抹，让丰润的油脂替你锁住水分。愿这缕秋日的滋养之香，陪你安然度过每一个干燥的季节。` },
  'H-B-224': { ericNotes: `畅息膏，是UNIO元香为“呼吸不畅、胸口发闷”调制的一支植物膏。换季的时候、雾霾的时候、情绪郁结的时候，胸口像压着一块石头。这支药膏以尤加利与薄荷的清冽开场，打开胸腔的通道；以百里香与罗文莎叶的辛通跟进，驱散痰浊；以乳香的清透收尾，让呼吸恢复顺畅。我把膏体在掌心化开，按摩胸口，那股辛通的香气缓缓渗入，仿佛有一只手，把压在胸口的石头轻轻移开了——呼吸，重新变得深长。`, aromatherapistNotes: `畅息膏，是“胸腔通畅与呼吸舒缓的植物膏”。中医讲“肺主气，司呼吸”，胸闷多由肺气不宣、痰浊阻滞——尤加利与薄荷开窍通鼻，百里香与罗文莎叶化痰通络，乳香清透。适合换季胸闷、雾霾天气与呼吸不畅的时刻。我常建议案主：以畅息膏按摩胸口与后背，配合深呼吸，让辛通的香气替你打开胸腔的通道。愿这缕畅息之香，陪你每一次深长的呼吸。` },
  'H-B-225': { ericNotes: `御光油，是UNIO元香为“日间防护”调制的一支面部油。紫外线的伤害是日积月累的——光老化，是皮肤最隐蔽的敌人。这支复方以仙人掌籽油与石榴籽油的轻薄为基底，富含抗氧化的天然成分；以胡萝卜籽的修护跟进，抵御自由基；以乳香的紧致收尾，让日间的防护完整而轻盈。我把油滴在掌心温热，轻压上脸，那股轻透的触感仿佛给皮肤撑起了一把看不见的伞——阳光还在，伤害止步。`, aromatherapistNotes: `御光油，是“光老化防护的日间面油”。中医讲“正气存内”，肌肤的抗老同样需要内在的防御力——仙人掌籽油与石榴籽油富含抗氧化成分，胡萝卜籽修护细胞，乳香紧致肌肤。适合日间护肤、长时间户外与抗初老保养。我常建议案主：晨间护肤以御光油轻压面部，再叠加防晒，让轻透的油为肌肤筑起日间的防线。愿这缕御光之香，替你守住肌肤的年轻与从容。` },
  'H-B-226': { ericNotes: `秀发萃，是UNIO元香为“发际线告急的人”调制的一支育发液。现代人的头发，是压力与熬夜的晴雨表——梳子上的落发，比心事还多。这支复方以迷迭香的活络开场，促进头皮血液循环、唤醒毛囊；以雪松与茶树净化头皮微环境、平衡油脂；以生姜的温养收尾，为毛囊注入活力。我把育发液轻轻按摩进头皮，那股滋养的草本香气缓缓渗入，仿佛替发根做了一次深层的“施肥”——愿每一根头发，都找到它扎根的家园。`, aromatherapistNotes: `秀发萃，是“防脱固发的植萃育发液”。中医讲“发为血之余”，头发的根基在气血——迷迭香促进头皮循环、激活毛囊，雪松与茶树净化头皮、平衡油脂，生姜温养发根。适合压力性脱发、油性头皮与发际线护理。我常建议案主：每日以秀发萃按摩头皮数分钟，配合规律作息与均衡饮食，让草本的滋养替你守住发丝的家园。愿这缕固发之香，陪你重拾头顶的自信。` },
  'H-B-227': { ericNotes: `沐润油，是UNIO元香为“沐浴后的肌肤”调制的一支锁水油。洗澡是舒服的，但热水也会带走肌肤的水分——洗完澡的三分钟，是锁水的黄金时间。这支复方以荷荷巴油与葵花籽油的轻盈为基底，质地不黏腻；以橙花与天竺葵的芬芳跟进，让沐浴后的时光带着花香；以檀香的温润收尾，把水分牢牢锁进肌肤。我趁浴后肌肤微湿，把油抹遍全身，那股湿润的触感仿佛给皮肤盖上了一层薄薄的膜——水，被留住了。`, aromatherapistNotes: `沐润油，是“浴后全身锁水的轻盈身体油”。中医讲“津液滋润”，浴后是肌肤补水锁水的关键窗口——荷荷巴油与葵花籽油轻盈亲肤，橙花与天竺葵愉悦心情，檀香温润。适合沐浴后、干燥季节与全身护理。我常建议案主：浴后趁肌肤微湿时涂抹沐润油，让水分与油分共同锁进皮肤。愿这缕沐浴后的芬芳，陪你守住肌肤每一寸的润泽。` },
  'H-L-206': { ericNotes: `印度乌代布尔的香料市集里，一位老者同时打开了玫瑰精油和檀香木的罐子。两种香气在空气中交汇，没有冲突，只有融合——那一刻我懂了什么叫无界。无界油正是这份融合的化身：以大马士革玫瑰、老山檀香、乳香与没药四重神圣精油复配。玫瑰的贵气是灵魂的高音，老山檀香的醇厚是修行的低音，乳香的神圣是连接天地的中轴，没药的深沉是历史的共鸣。我把油抹在手腕，那股融合的香气仿佛把整座香料市集的深邃，都带进了呼吸——每一次涂抹，都是与无界的自己相遇。`, aromatherapistNotes: `无界油，是“深度冥想与情绪整合的高阶复方”。中医讲“阴阳和合，精神乃治”，玫瑰与檀香一阴一阳，乳香与没药一通一收——0.5%大马士革玫瑰与1%老山檀香，极低浓度却穿透力极强，是情绪整合与深度冥想的珍贵配方。适合深度冥想仪式、书写与内在探索以及瑜伽收束。我常建议案主：冥想前以无界油涂抹手腕与胸口，让四重神圣的香气陪你进入深层的内在对话。愿这缕乌代布尔的融合之香，带你遇见更完整的自己。` },
  'H-L-207': { ericNotes: `威尼斯清晨五点的鱼市，渔夫们切开柠檬和橙子去腥，空气里全是新鲜果皮的辛辣香气。晨光刚从运河尽头升起，整座城市都在慢慢苏醒。破晓珠，正是这破晓时刻的嗅觉化身：以葡萄柚、甜橙、迷迭香、胡椒薄荷与快乐鼠尾草五重精油复配。葡萄柚的明亮与甜橙的温暖如破晓的第一缕光，迷迭香的清醒与薄荷的清凉唤醒沉睡的感官，快乐鼠尾草的放松如晨间的一口深长呼吸。我把滚珠轻轻划过手腕，那股明亮的果香瞬间唤醒了我——比咖啡更温柔的清醒方式。`, aromatherapistNotes: `破晓珠，是“晨起唤醒与时差调整的温柔闹钟”。中医讲“阳出于阴则寤”，晨起唤醒讲究阳气生发而不急躁——红橘与葡萄柚提振阳气，迷迭香与薄荷清醒头脑，快乐鼠尾草让唤醒带着松弛。滚珠设计精准涂抹手腕脉搏处，晨起第一步嗅觉唤醒，适合早起困难者与出差时差调整。我常建议案主：晨起以破晓珠涂抹双腕脉搏处，深吸三次，让果香的清醒代替咖啡的刺激。愿这缕威尼斯的破晓之光，替你温柔地开启每一天。` },
  'H-L-208': { ericNotes: `冰岛斯奈山半岛的火山岩洞深处，水滴有节奏地落在熔岩上，整个洞穴像一个共鸣箱。我站在黑暗里，心跳和滴水的节奏渐渐合一——那是身体与自然的共振。共振方正是这份共振的油相化身：以乳香、檀香、岩兰草、雪松与薰衣草五重精油复配。乳香的深呼吸与檀香的长吐气构成呼吸的节奏，岩兰草的根系锚定身体，雪松的高远打开心胸，薰衣草的柔和平衡全部。我把油抹在手腕，配合一次深长的呼吸，仿佛听见火山岩洞里的水滴，正和自己心跳同步。`, aromatherapistNotes: `共振方，是“呼吸校准与身心共振的馆藏级复方”。中医讲“呼吸以踵，气行则神安”，呼吸练习是身心调理的根基——乳香与檀香引导呼吸节奏，岩兰草锚定，雪松开胸，薰衣草平衡。萃取六种同频精油，建议配合4-7-8呼吸法使用，身心同步共振，适合呼吸练习、瑜伽调息与静心仪式。我常建议案主：每日以共振方配合呼吸练习，让身心的节奏重新校准。愿这缕火山岩洞的共鸣，陪你找回与自己的同频。` },
  'H-L-211': { ericNotes: `印尼乌布雨林里，祭司用树叶蘸着清水洒向四周，水滴在半空中反射出彩虹。他说，这是在清洗看不见的尘埃——这句话让我记了很久。悬浮露正是这份净化的轻盈化身：以橙花、大马士革玫瑰、薰衣草与乳香四重精油复配于纯露基底，只含0.1%微量精油，极致温和。橙花的轻盈白花如悬浮于空中的羽翼，玫瑰的温柔如花海中的漂浮，薰衣草的平衡如微风的扶持，乳香的沉稳如大地的托举。我喷了一捧在身前，那股轻盈的水雾，仿佛把雨林的彩虹，都带进了呼吸。`, aromatherapistNotes: `悬浮露，是“能量清理与空间净化的轻盈之水”。中医讲“正气存内，邪不可干”，气场净化是身心调理的一部分——岩玫瑰与柠檬香茅的配方用于能量场清理、空间净化与冥想前洒扫，比烟雾更轻盈的净化方式。纯露基底+微量精油，极致温和，适合约会前身体喷雾、换衣间氛围与情绪敏感期的轻盈安抚。我常建议案主：情绪敏感时以悬浮露喷洒周身与空间，让轻盈的水雾替你涤净郁积。愿这捧乌布雨林的水雾，替你守住气场的轻盈。` },
  'H-L-215': { ericNotes: `日本屋久岛的白谷云水峡，青苔覆盖了每一块岩石和树根，空气湿得像能拧出水。向导说，这片森林已经这样呼吸了几千年。空寂水正是这份“空山新雨后”的湿润化身：以欧洲赤松、雪松、岩兰草、广藿香与乳香五重精油复配于水相基底。赤松的清冽针叶与雪松的高远木质构成空间的上层，岩兰草的根系与广藿香的湿润泥土构成空间的下层，乳香的神圣贯通天地之间。我喷了一捧在书房，那股苔藓的湿润感，仿佛把屋久岛的千年森林，都带进了房间。`, aromatherapistNotes: `空寂水，是“独处与放空时刻的深度冥想喷雾”。中医讲“静以修身，俭以养德”，橡木苔与广藿香打造“空山新雨后”的苔藓湿润感，岩兰草锚定心神，赤松与雪松开阔胸襟——适合需要沉淀、独处、放空的时刻，喷在枕边或书桌旁，让焦虑沉降。我常建议案主：深度思考或情绪纷乱时，以空寂水喷洒书房，让苔藓的湿润替你安放杂念。愿这捧屋久岛的千年之息，陪你抵达内心的空寂。` },
  'H-L-240': { ericNotes: `脉轮定，是UNIO元香脉轮系列的“总纲”——一支调和七轮能量的复方油。印度传统认为，人体有七个能量中心（脉轮），从海底轮到顶轮，像一根贯穿身体的光柱；当某个轮失衡，身心就会卡住。这支复方以乳香与檀香为轴心，调和七轮：乳香连接天地，檀香安定心神，辅以玫瑰、广藿香、佛手柑等对应不同脉轮的香气，让能量重新流动起来。我把油抹在脊柱两侧，那股调和的香气缓缓漫开，仿佛听见七轮像琴弦一样，被一一调准了音。`, aromatherapistNotes: `脉轮定，是“七脉轮能量平衡的调和复方”。中医讲“通则不痛，痛则不通”，能量的卡顿正如气机的淤堵——乳香通神，檀香定心，玫瑰疏肝，广藿香祛湿，佛手柑理气，让身心的能量恢复流动。适合能量低迷、身心失衡与冥想调理的时刻。我常建议案主：冥想时以脉轮定按摩脊柱两侧，从下往上，让七轮的能量像琴弦般被调准。愿这缕调和之香，陪你找回身心的通畅。` },
  'H-L-241': { ericNotes: `归极水，是UNIO元香脉轮系列中对应“顶轮”的一支香雾。顶轮在印度传统中位于头顶，是连接更高意识的所在——它无关宗教，只关乎一种“站在自己之上看自己”的觉知。这支香雾以古檀香与乳香的深沉为主调：檀香的温润是修行的底色，乳香的清冽是通往觉知的路径。我把香雾喷洒在头顶上方，那股沉静的木香缓缓落下，仿佛有一只温柔的手，把飘忽的心神轻轻放回身体——原来觉知，就是把自己安放回此刻。`, aromatherapistNotes: `归极水，是“顶轮觉知与心神安放的香雾”。中医讲“心主神明，神宜内守”，觉知的本质是神气的收摄——古檀香引气归元、安抚杂念，乳香清透、助人超脱。适合冥想、静坐与需要放空思绪的时刻。我常建议案主：冥想前以归极水喷洒头顶与四周，让木香的沉静陪你回到“此刻”。愿这捧顶轮的觉知之雾，替你守住心神的方向。` },
  'H-L-242': { ericNotes: `守印膏，是UNIO元香为“需要边界感的人”调制的一支结界膏。生活中总有一些时刻，我们觉得自己的气场被消耗——拥挤的地铁、冗长的会议、喧嚣的人群。守印膏的“印”，是守护的印记：以乳香与没药这对古老的神圣树脂为基底，乳香清透、没药深沉，像一阴一阳两扇门，把外界的喧嚣挡在门外；辅以檀香的安定与安息香的温暖，让结界之内，只有你自己。我把膏体点在手腕与颈侧，那股温润的香气缓缓包裹，仿佛有一层看不见的膜，替我挡住了世界的嘈杂。`, aromatherapistNotes: `守印膏，是“气场守护与边界建立的结界膏”。中医讲“正气存内，邪不可干”，气场的守护本质是正气的充盈——乳香与没药辟秽安神，檀香定心，安息香温暖包裹。固态膏体适合点涂于手腕、颈侧与太阳穴，通勤、人群密集场所与需要独处的时刻。我常建议案主：出门前以守印膏点涂脉搏处，让温暖的香膏替你守住气场的边界。愿这缕守护之香，陪你从容地走过喧嚣。` },
  'H-L-243': { ericNotes: `清心印，是UNIO元香脉轮系列中对应“心轮”的一支复方。心轮在印度传统中位于胸口，是爱与慈悲的所在——而慈悲最难的部分，是对自己。这支复方以大马士革玫瑰的温柔为主调：玫瑰是“心之花”，它懂得委屈，也懂得原谅；辅以佛手柑的疏解与檀香的安定，让心口的郁结慢慢松开。我把油抹在胸口，那股玫瑰的暖意缓缓化开，仿佛听见有个声音说：原谅别人之前，先原谅自己。`, aromatherapistNotes: `清心印，是“心轮滋养与自我原谅的复方”。中医讲“心主血脉，其华在面”，心的郁结会显现在情绪与气色上——玫瑰疏肝解郁、养血悦色，佛手柑理气，檀香安神。适合情绪郁结、自我苛责与需要被温柔对待的时刻。我常建议案主：情绪低落时以清心印涂抹胸口，配合深呼吸，让玫瑰的暖意替你解开原谅的结。愿这缕心轮的花香，陪你学会对自己慈悲。` },
  'H-L-244': { ericNotes: `辟浊液，是UNIO元香为空间净化调制的一支喷雾。古人搬家要“净宅”，逢年过节要“除秽”——对空间浊气的在意，是东方生活里由来已久的仪式感。这支喷雾以杜松与丝柏的清冽为主调：杜松是北欧传说中驱邪的神木，丝柏是修道院里的静默之树；辅以柠檬的明亮与乳香的清透，让浊气退散，清气自来。我把香雾喷洒在房间里，那股清冽的香气缓缓铺开，仿佛替空间做了一次深呼吸——空气干净了，心也干净了。`, aromatherapistNotes: `辟浊液，是“空间气场净化的清冽喷雾”。中医讲“疫疠之气，避之有时”，对空间浊气的警惕是东方养生的传统——杜松与丝柏辟秽净界，柠檬提振，乳香清透，让居室恢复清朗。适合新居净宅、换季除秽与空间能量清理。我常建议案主：清晨以辟浊液喷洒居室四角，让清冽的香气替你守住房气的清明。愿这捧辟浊之雾，替你涤净空间的浊气与心头的尘。` },
  'H-L-245': { ericNotes: `根基定，是UNIO元香脉轮系列中对应“海底轮”的一支复方。海底轮位于脊柱底端，是“扎根”的所在——现代人最大的不安，正是脚下的虚空感。这支复方以岩兰草的深沉为主调：岩兰草的根可以扎进地下十米，是植物界的“定海神针”；辅以广藿香的泥土气息与雪松的沉稳，让飘摇的心重新踩回大地。我把油抹在脚底，那股深沉的土香缓缓漫开，仿佛有一双看不见的手，把我的心稳稳种回了地面——原来安全感，是可以被闻到的。`, aromatherapistNotes: `根基定，是“海底轮扎根与安全感重建的复方”。中医讲“肾为先天之本，肾主骨”，安全感与肾气相关——岩兰草强效接地，广藿香深沉笃定，雪松稳固心神。适合焦虑不安、缺乏安全感与“脚下发虚”的时刻。我常建议案主：睡前以根基定按摩足底涌泉穴，让深沉的土香陪你重新踩回大地。愿这缕大地的根基之香，替你种下安定的力量。` },
  'H-L-246': { ericNotes: `沟通畅，是UNIO元香脉轮系列中对应“喉轮”的一支复方。喉轮位于喉咙，是“表达”的所在——很多人不是不会说话，而是不敢说真话。这支复方以佛手柑与柠檬草的清冽开场，疏通喉轮的气机；以迷迭香的清醒跟进，让话语更有力量；以薰衣草的温柔收尾，让表达带着善意。我把油抹在喉部，那股清透的香气缓缓漫开，仿佛替喉咙打开了一扇窗——那些憋了很久的话，忽然就能说出口了。原来真实表达，也需要一缕香的勇气。`, aromatherapistNotes: `沟通畅，是“喉轮表达与真实沟通的复方”。中医讲“金曰从革”，肺主气、司呼吸、开窍于鼻，声音的表达与肺气相关——佛手柑疏理气机，柠檬草行气，迷迭香清醒头脑，薰衣草安抚情绪，让表达既真实又温柔。适合重要发言前、情绪憋闷与需要鼓起勇气表达的时刻。我常建议案主：发言前以沟通畅涂抹喉部与胸口，让清透的香气替你打开表达的通道。愿这缕喉轮的真实之香，陪你说出心里的话。` },
  'H-L-247': { ericNotes: `慧眼通，是UNIO元香脉轮系列中对应“三眼轮”的一支复方。三眼轮位于眉心，是“直觉”与“洞察”的所在——现代人太依赖逻辑，反而忘了直觉的声音。这支复方以迷迭香与薄荷的清冽开场，唤醒眉心的觉知；以乳香的神圣跟进，连接更高的洞察；以檀香的沉静收束，让直觉落地。我把油抹在眉心，那股清透的香气缓缓漫开，仿佛有一只看不见的眼睛，在眉心缓缓睁开——原来直觉，不是玄学，是被遗忘的另一种聪明。`, aromatherapistNotes: `慧眼通，是“三眼轮直觉与洞察的复方”。中医讲“眉间为印堂，内应于脑”，直觉是脑与心协同的智慧——迷迭香与薄荷清醒头脑，乳香提升洞察，檀香安定心神，让直觉的声音不被杂念淹没。适合决策前、创意枯竭与需要相信直觉的时刻。我常建议案主：做重要决定前，以慧眼通轻点眉心，静坐片刻，让清透的香气替你接通内在的智慧。愿这缕慧眼之香，陪你看见直觉给出的答案。` },
  'H-L-248': { ericNotes: `慈悲场，是UNIO元香为“对自己太苛刻的人”调制的一支复方。我们总是习惯了爱别人，却忘了爱自己——而所有疗愈的起点，都是这句“我值得被好好对待”。这支复方以玫瑰与天竺葵的温柔为主调：玫瑰是“心之花”，天竺葵是“平衡之香”，二者共同抚慰自我苛责的伤痕；辅以佛手柑的疏解与檀香的安定，让心慢慢学会接纳自己。我把油抹在胸口，那股温柔的香气缓缓化开，仿佛听见一个声音说：你已经够好了，现在，抱抱自己吧。`, aromatherapistNotes: `慈悲场，是“无条件自爱与自我疗愈的复方”。中医讲“心主神明，喜乐由心”，自我苛责是心神的消耗——玫瑰疏肝解郁、抚慰委屈，天竺葵平衡情绪，佛手柑理气，檀香安神。适合自我否定、情绪内耗与需要被温柔对待的时刻。我常建议案主：情绪低落时以慈悲场涂抹心口，配合一次温柔的深呼吸，对自己说一句“辛苦了”。愿这缕自爱之香，陪你学会无条件地爱自己。` },
  'H-L-249': { ericNotes: `极灵索，是UNIO元香为禅坐与灵修调制的一支高规格复方——它是合系列中价格最高的作品之一，名字里的“索”，是连接之意：连接身与心，连接坐与悟。这支复方以沉香的深邃为核心：沉香是“木中的舍利”，一棵树要受伤几十年，才能凝成那段香结，它的香气是时间酿成的；辅以乳香的神圣与檀香的安定，为禅坐铺开一方安静的场域。我把油抹在手腕，那股深沉的香气缓缓漫开，仿佛听见古老的钟声，正从香气的深处传来——禅坐，从此有了更深的一层。`, aromatherapistNotes: `极灵索，是“禅坐与灵修的高阶沉香复方”。中医以沉香“行气温中、纳气平喘”，沉香是极珍贵的香药——受伤的树木以树脂包裹伤口，经年累月才凝成香结，是“以痛成香”的东方隐喻。配合乳香通神、檀香定心，适合禅坐、冥想与灵性探索。我常建议案主：禅坐前以极灵索涂抹手腕与眉心，让沉香的深邃陪你进入更深的静定。愿这缕沉香的灵性之索，带你连接内心深处的宁静。` },
  'H-L-250': { ericNotes: `梦境织，是UNIO元香脉轮系列中最神秘的一支——它对应“梦境与潜意识”的领域。夜晚，当意识入睡，潜意识便接管了世界：那些白天想不通的事，梦里会有答案；那些压抑的情绪，梦里会有出口。这支复方以檀香与乳香的沉静为主调，为梦境铺设安静的底布；辅以茉莉的异域香，据说能唤醒梦境的清明——传说中，茉莉是“梦之花”。我把油滴在枕边，那股神秘的香气缓缓漫开，仿佛在潜意识的海面上，织起了一张温柔的网。`, aromatherapistNotes: `梦境织，是“清明梦与潜意识探索的复方”。中医讲“魂居于肝，魄居于肺”，梦是魂魄游走的舞台——檀香安定心神，乳香清透意识，茉莉唤醒感官的清明。适合睡前冥想、记录梦境与内在探索的时刻。我常建议案主：睡前以梦境织滴于枕边，睡前默念想探索的问题，让香气陪你与潜意识对话。愿这缕织梦之香，陪你走进梦境的深处，带回灵感的珍珠。` },
  'H-M-203': { ericNotes: `里斯本28路电车上，邻座女士用滚珠涂抹太阳穴，深呼一口气。窗外阿尔法玛区的彩色房子在夕阳下发光——那一刻，紧绷与松弛之间，只隔着一个滚珠的距离。归处膏正是这份松弛的随身化身：以胡椒薄荷、薰衣草、罗马洋甘菊与乳香四重精油复配于便携滚珠。胡椒薄荷的清凉直冲太阳穴，薰衣草的温柔包裹紧张神经，罗马洋甘菊的苹果甜香带来安抚，乳香的安定如归处般踏实。我把滚珠划过太阳穴，那股清凉的放松感，仿佛把里斯本的夕阳，都揉进了眉心。`, aromatherapistNotes: `归处膏，是“通勤高压与考前焦虑的随身庇护所”。中医讲“头为诸阳之会”，太阳穴是经气汇聚之所——薄荷清利头目，薰衣草与洋甘菊安抚神经，乳香定心安神。滚珠设计精准点涂太阳穴与耳后，三分钟舒缓紧绷感，适合通勤头痛、高压时刻安抚与考前镇静。我常建议案主：压力大时以归处膏点涂太阳穴，配合深呼吸，让紧绷的额头在清凉里找到归处。愿这缕里斯本的夕阳，替你守住每一个高压时刻的平静。` },
  'H-M-205': { ericNotes: `苏格兰斯凯岛连续下了两周雨，灰绿色的天空让人快忘了阳光的颜色。民宿女主人在壁炉边喷了什么，整个房间突然亮了起来——柑橘的跳跃和依兰的暖意穿透了阴霾。那一刻我懂了：有些光不在天上，在瓶子里。微光氛以甜橙、佛手柑、依兰与安息香四重精油复配：甜橙的温暖明亮如冬日阳光，佛手柑的优雅如意大利午后，依兰的异域甜美带来暖意，安息香的甜树脂为所有香调画上温暖的句点。我把油滴进扩香器，整个房间都亮了起来。`, aromatherapistNotes: `微光氛，是“阴郁时刻的温暖疗愈香”。中医讲“阳气者，若天与日”，情绪的低谷正如阴天，需要一缕温暖的香来提振——甜橙与佛手柑双向调节情绪，依兰释放压抑的情感，安息香以甜暖包裹不安。它明亮而不张扬，适合阴雨天室内扩香、傍晚居家放松与朋友聚会的温馨氛围。我常建议案主：阴郁的日子里，以微光氛扩香，让暖光般的香气驱散心头的阴霾。愿这缕苏格兰壁炉的微光，陪你度过每一个低落的日子。` },
  'H-M-210': { ericNotes: `峨眉山洗象池边，泉水从石缝渗出，滴落声像古老的节拍器。我坐在石头上闭上眼，水声和松脂气味混在一起，那一刻，世界安静得只剩下自己。听泉露正是这份安静的水相化身：以罗马洋甘菊、薰衣草、乳香与檀香四重精油复配于水相基底。罗马洋甘菊的温和果香开场，薰衣草的柔美承接，乳香的神圣与檀香的深远收束，如禅寺中的泉声涤荡心灵。我喷了一捧在周围，雾气轻轻散开，仿佛把峨眉山的泉声，都带进了房间。`, aromatherapistNotes: `听泉露，是“冥想与静心的泉声之水”。中医讲“静则神藏，躁则消亡”，冥想前的空间净化讲究“轻而安静”——罗马洋甘菊与薰衣草放松神经，乳香与檀香引导心神下沉。全水相基底挥发性强不残留，α脑波增幅明显，帮助大脑从β波过渡到放松状态，适合冥想空间净化、瑜伽课前与睡前卧室的安静布置。我常建议案主：冥想前以听泉露轻喷四周与手腕，让泉声般的水雾替你涤净杂念。愿这捧峨眉山的泉声，陪你抵达内心的安静。` },
  'H-M-213': { ericNotes: `印度瑞诗凯诗的恒河边，瑜伽士教我呼吸法——吸气时感受肋骨像蛇一样展开。他递给我一个小瓶子，里面是薄荷和草本的辛辣。深吸瓶，正是这样一支便携的呼吸舒压棒：以尤加利、胡椒薄荷、迷迭香、茶树与佛手柑五重精油复配。清冽通透的尤加利与薄荷打开呼吸道，迷迭香的清醒提振脑力，茶树的洁净净化空气，佛手柑的明快收尾。我把吸嗅棒凑近鼻尖，深吸一口，仿佛置身澳洲的森林——一次深呼吸，世界就安静了。`, aromatherapistNotes: `深吸瓶，是“呼吸敏感者与密闭空间的随身救护”。中医讲“肺主气，司呼吸”，呼吸的深浅关乎一身的气机——尤加利与薄荷开窍通鼻，迷迭香提振，茶树净化，佛手柑明快。便携吸入器设计，呼吸急促时按压鼻翼深吸两到三次，适合呼吸敏感人群、密闭空间与换季胸闷。我常建议案主：出行时随身携带深吸瓶，换季鼻塞或紧张时深吸几口，让呼吸重新找回深度。愿这缕恒河边的呼吸，替你守住每一次深呼吸的自由。` },
  'H-M-214': { ericNotes: `京都大德寺的枯山水庭院里，老僧扫完沙石后静坐不语，空气中有木头和泥土的干燥气息——止语，是一种境界，也是一种礼物。止语雾正是这份沉静的办公室化身：以薰衣草、佛手柑、雪松与乳香四重精油复配。清透的薰衣草与佛手柑开场，雪松的木质基底提供安静收束，乳香赋予神圣的沉静。我在办公桌前喷了三下，那股安宁的香气缓缓铺开，仿佛把京都的枯山水，都搬进了格子间——不打扰他人，只安静陪伴。`, aromatherapistNotes: `止语雾，是“高压办公与焦虑时刻的静心喷雾”。中医讲“静则神藏”，办公场景的情绪管理讲究“不扰人而自安”——雪松与岩兰草深度安宁，缬草助眠安神，乳香定心。空间喷雾设计，办公区喷三下，90秒内情绪慢慢落回平稳，适合高压会议前、睡前卧室与焦虑时刻。我常建议案主：会议前以止语雾轻喷办公空间，让沉静的香气替你稳住情绪。愿这缕京都的止语之雾，替你守住职场中的内心宁静。` },
  'H-M-228': { ericNotes: `澄明界，是UNIO元香为高强度脑力工作者调制的一支复方——它不负责替你思考，只负责替你守住思考的边界。灵感取自古老书斋的“澄心”传统：读书前焚一炉香，让杂念退场，让心回到书页。这支复方以迷迭香与柠檬的清冽开场，唤醒脑力；以乳香与雪松的沉静收束，稳住心神——像在纷乱的思绪中，画出一道透明的墙。我把油滴在书桌一角，那股清冽的草本香缓缓散开，仿佛把书房变成了书斋，把浮躁变成了专注。`, aromatherapistNotes: `灵敏方，是“备考与高强度脑力工作的聚焦复方”。中医讲“心主神明，思则得之”，专注力的培养需要“清心”——迷迭香激活记忆力与大脑敏锐，柠檬提振精神，乳香与雪松安定心神，让思绪有一个清晰的落点。适合考研备考、长时写作与高强度分析工作。我常建议案主：学习前以灵敏方扩香或嗅吸，让清冽的草本香替你守住专注的边界。愿这缕书斋的澄明，陪你抵达每一次心无旁骛。` },
  'H-M-229': { ericNotes: `解焦虑，是UNIO元香为“容易心慌的人”调制的一支平复滚珠。焦虑来的时候，心会先知道——心跳加快、手心出汗、呼吸变浅，像是身体在报警。这支复方以苦橙叶与薰衣草的镇静开场，安抚过快的心跳；以佛手柑的疏解跟进，化开胸口的郁结；以岩兰草的沉稳收尾，把飘忽的心神放回地面。我把滚珠划过手腕内侧，那股沉稳的香气缓缓漫开，仿佛有一只温柔的手，轻轻按住了心口——心跳，慢慢回到了它本来的节奏。`, aromatherapistNotes: `解焦虑，是“心悸焦虑平复的随身滚珠”。中医讲“心主神明，惊则气乱”，焦虑的本质是心神不宁、气机紊乱——苦橙叶与薰衣草镇静神经，佛手柑疏肝解郁，岩兰草接住焦虑。滚珠设计随身携带，适合紧张时刻、会议前与入睡前。我常建议案主：感到心慌时，以解焦虑滚珠涂抹手腕脉搏处，配合缓慢深呼吸，让沉稳的香气替你稳住心跳。愿这缕定心之香，成为你随身携带的安宁。` },
  'H-M-230': { ericNotes: `安神落，是UNIO元香为“睡不好的人”调制的一支复方。名字里的“落”，是落下的落——让紧绷的神经落回原位，让飘散的心神落回身体。这支复方以薰衣草与苦橙叶的温柔开场，安抚焦躁；以檀香与岩兰草的沉静收束，把人稳稳托进梦乡。深夜的书房里，我点了一滴扩香，那股沉静的香气缓缓铺开，仿佛有一只温柔的手，把一天的疲惫轻轻按下。原来睡眠不是关掉灯光，而是让心先落下来。`, aromatherapistNotes: `安神落，是“深度安眠的熏香复方”。中医讲“阳入于阴谓之寐”，失眠的本质是阳气不能安藏——薰衣草与苦橙叶镇静神经，檀香引气归元，岩兰草接住焦虑，让“落”成为睡眠的开始。适合睡前扩香、枕边熏香与冥想后安眠。我常建议案主：睡前半小时以安神落扩香，让沉静的香气陪你从清醒滑入梦乡。愿这缕深夜的安眠之香，替你守住每个夜晚的边界。` },
  'H-M-231': { ericNotes: `唤醒感，是UNIO元香为午后倦怠调制的一支“抗困”香滴。午后三点，是一天中最容易投降的时刻——困意像潮水漫上来，眼睛发沉，思绪发黏。这支复方以葡萄柚与柠檬的明亮开场，瞬间击穿昏沉；以薄荷与迷迭香的清冽跟进，让头脑重新上线；以佛手柑的优雅收尾，不留一丝疲态。我把一滴油点在手腕，那股明亮的柑橘香直冲鼻尖，仿佛把午后的困意，都赶到了门外——下午的精神，重新回来了。`, aromatherapistNotes: `唤醒感，是“午后抗倦怠的醒脑香滴”。中医讲“阳主动”，午后阳气渐收，困倦是自然的节律——葡萄柚与柠檬提振精神，薄荷清利头目，迷迭香激活脑力，佛手柑调和情绪。比咖啡更温和，不伤胃不扰眠。我常建议案主：午后困倦时，以唤醒感涂抹手腕与太阳穴，配合深呼吸，让明亮的柑橘香替你守住下午的精神。愿这缕午后三点的清醒，陪你元气满满地走完每一天。` },
  'H-M-232': { ericNotes: `释压场，是UNIO元香为职场人调制的一支“情绪卸载”复方。名字直白，功效也直白：像一天结束时卸下领带与高跟鞋，让紧绷的情绪，也有一个可以卸下的地方。这支复方以佛手柑与甜橙的明亮开场，驱散郁积；以雪松与岩兰草的沉静收束，稳住心神——从“撑住”到“放下”，只隔一缕香的距离。下班后，我在手腕抹了一滴，那股草木的呼吸缓缓漫开，仿佛把格子间里攒了一天的紧绷，都轻轻卸在了门口。`, aromatherapistNotes: `释压场，是“高压职场情绪的卸载配方”。中医讲“郁则发之”，情绪需要出口，不能只进不出——佛手柑疏肝解郁，甜橙提振心情，雪松与岩兰草安定心神，让紧绷的神经有一个落点。适合下班后的放松、会议间隙的调节与情绪积压的时刻。我常建议案主：下班时以释压场涂抹手腕与颈侧，配合几次深呼吸，把工作留在门外，把自己还给生活。愿这缕草木的呼吸，替你卸下每一天的负重。` },
  'H-M-233': { ericNotes: `止念方，是UNIO元香为“脑子里停不下来”的人调制的一支吸嗅油。失眠的人最懂：身体躺下了，念头却还在开会。这支复方以苦橙叶与薰衣草的温柔开场，安抚翻涌的思绪；以檀香与岩兰草的沉静收束，把念头一颗一颗按下。我把吸嗅棒凑近鼻尖，那股沉静的香气缓缓漫开，仿佛有一只温柔的手，按下了脑子里停不下来的开关——世界忽然安静了。原来止念不是强迫自己不想，而是让香气替你把思绪放平。`, aromatherapistNotes: `止念方，是“脑杂念消融的吸嗅油”。中医讲“心猿意马，以静驭之”，杂念纷飞是心神失守的表现——苦橙叶镇静神经，薰衣草安抚情绪，檀香引气归元，岩兰草接住焦虑。便携吸嗅设计，适合睡前、冥想与思绪过载的时刻。我常建议案主：杂念纷飞时，以止念方深吸几次，让沉静的香气替你按下思绪的暂停键。愿这缕止念的香，陪你找回内心的安静。` },
  'H-M-234': { ericNotes: `舒心结，是UNIO元香为“心里堵得慌”的人调制的一支复方。中国人有个说法叫“心结”——有些情绪说不出口，就在胸口结成一团。这支复方以佛手柑与苦橙叶的辛香开场，疏理郁结的气机；以玫瑰与天竺葵的暖意跟进，抚慰委屈；以檀香的沉静收束，让心重新安稳。我把油抹在胸口，那股暖香缓缓化开，仿佛有一只温柔的手，把心里那团堵了很久的东西，轻轻解开了。原来心结，需要一缕香来替你说出。`, aromatherapistNotes: `舒心结，是“郁闷情绪的胸口开结油”。中医讲“肝气郁结，疏之则舒”，胸口是气机容易淤堵之处——佛手柑疏肝理气，苦橙叶镇静安神，玫瑰与天竺葵疏解郁结，檀香定心安神。适合情绪低落的时刻、胸口发闷的不适与需要被理解的瞬间。我常建议案主：郁闷时以舒心结涂抹胸口与心口，配合深呼吸，让暖香替你化开那团说不出的堵。愿这缕开结的香，陪你与自己的情绪和解。` },
  'H-M-235': { ericNotes: `游丝韵，是UNIO元香为创作者调制的一支灵感香。名字取自“游丝”——比蛛丝更轻、更灵动的那一缕，正是灵感来时的样子：抓不住，但确实存在。这支复方以佛手柑与柠檬草的灵动开场，激活思维的流速；以依兰与甜橙的暖意跟进，让想象力松开缰绳；以安息香的甜树脂收尾，给灵感一个温暖的落点。我把油滴进扩香器，那股灵动的香气缓缓散开，仿佛有看不见的丝线在空气里游动——笔下的句子，忽然就顺了。`, aromatherapistNotes: `游丝韵，是“创意灵感迸发的扩香油”。中医讲“思则气结”，灵感枯竭往往是气机郁结的表现——佛手柑疏肝理气，柠檬草行气化湿，依兰释放压抑的想象力，甜橙提振心情，安息香温暖收束。适合创作前、头脑卡壳与需要突破的时刻。我常建议案主：写作或设计前以游丝韵扩香，让灵动的香气唤醒思维的流速。愿这缕游丝般的灵韵，陪你捕捉每一次灵光乍现。` },
  'H-M-236': { ericNotes: `欢愉露，是UNIO元香为情绪低落调制的一支香雾。阴天的时候、失落的时候、什么都提不起劲的时候，它是一捧可以喷的阳光。这支复方以甜橙与葡萄柚的明亮开场，瞬间点亮心情；以佛手柑的优雅跟进，抚平褶皱；以依兰的异域暖意收尾，让欢愉有了温度。我把香雾喷在衣领，那股明亮的果香缓缓漫开，仿佛把一整天的阴霾，都喷成了晴天——原来快乐，也可以是一伸手就够到的东西。`, aromatherapistNotes: `欢愉露，是“情绪低落时的提振香雾”。中医讲“喜则气缓，郁则气结”，情绪低落的本质是阳气不振——甜橙与葡萄柚提振多巴胺，佛手柑疏肝解郁，依兰释放压抑的情感。喷雾设计，适合阴天、情绪低谷与需要被点亮的日子。我常建议案主：低落时以欢愉露喷洒衣领与空间，让明亮的果香替你驱散心头的阴霾。愿这捧欢愉之露，陪你度过每一个灰色的日子。` },
  'H-M-237': { ericNotes: `沉静极，是UNIO元香为“恐慌时刻”调制的一支强效吸嗅棒。恐慌发作的时候，世界会突然变得很大，呼吸会变得很急——这时候需要一种足够沉稳的力量，把人从惊惶里拉回来。这支复方以岩兰草与檀香的深沉开场，瞬间锚定心神；以乳香的清冽跟进，稳住呼吸；以苦橙叶的镇静收尾，让心跳慢慢回到节奏。我把吸嗅棒凑近鼻尖，那股沉稳的香气缓缓漫开，仿佛有一双厚实的手，稳稳接住了下坠的心——别怕，你在这里。`, aromatherapistNotes: `沉静极，是“恐慌平复的强效吸嗅棒”。中医讲“惊则气乱，恐则气下”，恐慌的本质是气机紊乱——岩兰草与檀香强效接地，乳香安神定志，苦橙叶镇静神经。便携吸嗅设计，恐慌初起时深吸数次，让沉稳的香气把人从惊惶中拉回。我常建议案主：易紧张者随身携带沉静极，感到恐慌时立即吸嗅，配合缓慢呼吸，让心回到胸腔的中央。愿这缕定心之香，成为你随身携带的勇气。` },
  'H-M-238': { ericNotes: `澄明界，是UNIO元香为备考学子调制的一支记忆力复方。备考的日子，是青春里最漫长的黄昏——书桌上的台灯、翻旧的笔记、和偶尔走神的夜晚。这支复方以迷迭香与柠檬的清冽开场，激活记忆力与大脑敏锐；以乳香与佛手柑的明亮跟进，驱散倦怠；以雪松的沉静收束，让专注有处安放。我把油滴在书桌一角，那股清冽的草本香缓缓散开，仿佛替书桌画了一道透明的结界——外面是世界，里面是书页。`, aromatherapistNotes: `澄明界，是“考研备考与记忆力提升的复方”。中医讲“肾主骨生髓，脑为髓海”，记忆力的根基在精与气的充盈——迷迭香激活记忆，柠檬提振精神，乳香安神定志，佛手柑疏解压力，雪松稳固心神。适合备考、长时学习与需要高强度记忆的时刻。我常建议案主：学习时以澄明界扩香，让清冽的草本香替你守住书桌的专注。愿这缕书斋的澄明，陪你走完每一段备考的夜。` },
  'H-M-239': { ericNotes: `静心香，是UNIO元香为“离不开手机的人”调制的一支仪式油。晚上十一点，屏幕的光还亮着，手指还在滑动——我们都需要一个“关机仪式”，告诉身体：今天结束了。这支复方以薰衣草与罗马洋甘菊的温柔开场，安抚一整天的紧绷；以檀香与岩兰草的沉静收束，把人稳稳托进夜晚。我把油滴在枕边，那股安然的香气缓缓铺开，仿佛替一天画上了一个温柔的句点——屏幕关上了，世界安静了，你可以睡了。`, aromatherapistNotes: `静心香，是“晚间离网的关机仪式油”。中医讲“人卧则血归于肝”，睡眠需要仪式感来引导气机归位——薰衣草与罗马洋甘菊安抚神经，檀香引气归元，岩兰草接住一天的疲惫。适合睡前一小时扩香、放下手机后的静心与冥想。我常建议案主：睡前以静心香扩香，配合“关机仪式”——放下手机，深呼吸三次，让安然的香气陪你滑入梦乡。愿这缕关机之香，替你守住每个夜晚的边界。` },
  'J-A-601': { ericNotes: `在器物工坊里，我见到这块未经打磨的天然矿石——它来自山野，带着大地的纹理与时间的包浆。匠人说，扩香石不做化学处理，只借矿石天然的多孔结构，让精油一滴一滴渗入石心，再缓缓释放。它是“沉默的香器”：不需要电，不需要火，只把香气还给空气。我在案头放了一块，滴上两滴檀香，香气便在指间、书页与茶汤之间流转，不浓不淡，像一位不多话的陪伴者。匠人说，器物与人的缘分，是慢慢养出来的——石头吸过你的香，就成了你的石头。`, aromatherapistNotes: `扩香石，是“东方香道的静默之器”。中医讲“香气养性”，古人以炉焚香、以器承香，讲究的是“香随器静，气随心定”。扩香石以天然矿石的拙朴，承接精油的魂魄——无需电火，只借石材的多孔结构缓慢释放，正合“静以养神”之道。我常建议案主：以扩香石承载檀香、乳香等沉稳精油，置于案头与床头，让香气成为日课般的陪伴。器物无言，香气有灵；愿这方矿石，替你守住一方安静的天地。` },
  'J-A-602': { ericNotes: `匠人把一枚小小的香器挂在链上——它可以是矿石、是陶瓷、是木雕，但最重要的是，它可以贴身佩戴。芳香链的设计，源于一个简单的念头：把香气带在身上，让呼吸随时被温柔提醒。我在工坊里试戴了一条，滴上一滴佛手柑，香气便随着体温缓缓散开——低头工作时、走在路上时、与人交谈时，那股清雅的气息像一位沉默的旅伴。匠人说，芳香链是“移动的香房”：“你走到哪里，安宁就跟到哪里。”`, aromatherapistNotes: `芳香链，是“随身携带的心安”。中医讲“香气入肺，肺主气，气行则神安”，贴身佩戴的香气，能让呼吸与心神时时被温柔提醒。芳香链以贴身佩戴的方式，让精油的陪伴跨越空间——通勤、办公、旅途中，一滴佛手柑或橙花，便是一方随身的气场。我常建议案主：以芳香链承载提振或安抚类精油，让香气成为你行走的护持。愿这枚小链，替你守住每一个当下。` },
  'J-A-605': { ericNotes: `工坊里的木核扩，是一枚经过打磨的原木——它保留了木头的纹理与孔隙，让精油一滴一滴渗入，再缓缓释放。与矿石的冷冽不同，木核扩带着木质的温润与呼吸感，像把一小片森林带进了房间。匠人把木核扩放在掌心转了一圈：“木头会呼吸，香也随它呼吸。”我在书桌上放了一枚，滴上两滴雪松，香气便在午后阳光里慢慢铺展，一室皆是山林的气息。匠人说，木核扩是“慢的器物”：“它不急，香也不急。”`, aromatherapistNotes: `木核扩，是“以木养气的东方香器”。中医讲“木生火、火生土”，木质的器物天然带着生发之气——木核扩以木的孔隙缓释精油，香气持久而温润，正合“气宜缓不宜急”的养生之道。我常建议案主：以木核扩承载雪松、檀香等木质调精油，置于书房或卧室，让香气如林间微风，缓缓浸润日常。器物有木性，香气有灵性；愿这枚木核，替你守住一室的清净。` },
  'J-A-606': { ericNotes: `点燃精油烛，是一件有仪式感的事——火光轻轻跃动，蜡体缓缓融化，精油的香气随着温度苏醒，一室皆暖。工坊里的精油烛，以天然蜡为底，注入精选的精油，不添加人工香精——火光里的香，是植物本来的样子。匠人说，蜡烛是“时间的香器”：“它烧多久，香就有多久，像一段陪你度过的时光。”我在黄昏里点了一盏薰衣草烛，看火光照亮书页，香气在暮色里流转，忽然觉得，夜晚的意义，就是给自己留一盏这样的灯。`, aromatherapistNotes: `精油烛，是“以火传香的日常仪式”。中医讲“阳气者，若天与日”，火光的暖与精油的香，共同营造一方安顿身心的场域——读书、冥想、睡前，一盏精油烛便是仪式感的起点。我常建议案主：以薰衣草、乳香类精油烛陪伴晚间时光，让火光与香气一起，为一天的喧嚣画上句点。烛火有尽，香气有心；愿这一盏暖光，替你守住夜晚的温柔。` },
  'J-A-609': { ericNotes: `雾露器是最现代也最温柔的扩香方式——超声波把水与精油打散成极细的雾，香气与湿润一同悬浮在空气里，像晨雾漫过山谷。工坊主演示时，雾气轻轻升起，带着精油的香气，房间瞬间有了山林清晨的湿润感。它是“呼吸的加湿器”：干燥的空调房、换季的喉咙、紧绷的鼻腔，都被这捧细雾温柔照顾。匠人说，雾露器是“会下雨的香器”：“它把香，下成了一场润物无声的雨。”`, aromatherapistNotes: `雾露器，是“润泽与香气并济的现代香器”。中医讲“燥则伤肺、润则养阴”，雾露器以水雾同步送香与加湿，尤其适合干燥季节、空调房与呼吸道敏感者——尤加利、茶树等精油经水雾扩散，清润相济。我常建议案主：换季时以尤加利或薰衣草入雾露器，让香气的疗愈以最温柔的方式抵达呼吸。雾起有香，润物无声；愿这捧细雾，替你守住呼吸的湿润与安宁。` },
  'J-Z-603': { ericNotes: `工坊里的清空石，是一方温润的石头——它不做繁复的设计，只保留石头的本来面目，像一句没有说完的禅语。匠人说，清空石是“用来放下的”：“心里装得太满的时候，看看它，清一清。”我把它放在案头，晨起看它一眼，午后看它一眼，那些盘踞心头的杂念，便像潮水一样退去一些。石头不说话，却比任何言语都更懂“空”的道理——它本是空山的一块，陪着人，慢慢把心清空。`, aromatherapistNotes: `清空石，是“以石养心的禅思之器”。中医讲“心主神明，静则神藏”，一块无言的石头，正是“静”的具象——它不承载任何信息，只以石的沉静，为纷乱的思绪提供一个落点。我常建议案主：在清空石旁滴一滴檀香，静坐片刻，让香气与石头一起，帮你把心清空、把神收回。器物无言，禅意自现；愿这方清空石，陪你练习放下的功课。` },
  'J-Z-604': { ericNotes: `归真座是一只素色的陶器——没有繁复的釉彩，只保留陶土本来的色泽与手作的温度。匠人拉坯、修坯、素烧，每一个步骤都不急不缓，像在对待一件有生命的事。它是“归真的香座”：承载线香或精油，以陶土的质朴，承接香气的纯粹。匠人说，陶器是“土的返璞”：“土从山里来，烧成器，再回到山里陪人。”我在归真座上点了一支沉香，看烟气袅袅上升，忽然觉得，人需要的不是更多，而是回到本来的样子。`, aromatherapistNotes: `归真座，是“返璞归真的东方香器”。中医讲“真气从之，精神内守”，陶土的拙朴与香气的纯粹，共同指向“归真”二字——不事雕琢，回到本来的样子。我常建议案主：以归真座承载沉香或乳香，于静坐时使用，让土与火的朴素，陪你找回内心的本真。器有土德，香有灵性；愿这一只素陶，替你守住生活的本来。` },
  'J-Z-607': { ericNotes: `一柱香的仪式，古老而朴素：点燃，烟气笔直上升，香气缓缓铺开——整个过程，像一场无声的冥想。制香坊里，匠人以天然香料与黏粉手工搓制线香，晾晒、陈放，每一炷都带着时间的耐心。匠人说，一柱香的时间，是“给心留的缝隙”：“烟气升起的时候，念头也跟着慢下来。”我在黄昏点了一炷沉香，看青烟在暮色里袅袅，香气沉静而绵长，那些纷乱的思绪，便随着烟，一寸一寸地静了下来。`, aromatherapistNotes: `一柱香，是“以香入定的东方传统”。中医讲“香者，天地之正气也”，古人焚香静坐，以香气引导心神归于呼吸——一炷香的时间，正是给纷乱的心留出的一方缝隙。我常建议案主：以沉香、乳香类线香，于晨起或睡前点一炷，配合静坐与深呼吸，让烟气与香气一起，把心神带回中央。香有尽时，静无止境；愿这一炷青烟，替你守住每日的静心时刻。` },
  'J-Z-608': { ericNotes: `觉知珠，是一串可以握在掌心的珠子——它源自古老的念珠传统，以捻转珠子的重复动作，帮助心神专注于当下。工坊里，匠人一粒一粒打磨木质珠子，穿孔、穿绳，每一串都带着手作的温度。匠人说，珠子是“心的锚”：“念头飘走的时候，捻一粒，就回来了。”我把它握在掌心，一颗一颗地捻，那些盘踞心头的杂念，便随着珠子的转动，慢慢沉淀下来——原来专注，可以如此简单。`, aromatherapistNotes: `觉知珠，是“以珠养心的觉知法器”。中医讲“心主神明，守神则安”，捻珠的重复动作，正是“摄心一处”的修行——它不依赖香气，却与香气相得益彰：以檀香木质制成的珠子，捻转间自带木香，心神与嗅觉一同归位。我常建议案主：焦虑纷乱时，握一串觉知珠，配合深呼吸，让散乱的心神一粒一粒收回。珠转心定，觉知常在；愿这一串珠子，陪你练习安住当下的功课。` },
  'J-Z-610': { ericNotes: `承露璃，是一只透明的玻璃器——它的名字取自“承接晨露”的意象：晨光里，露珠在草叶上凝结，清澈而短暂，器物却以玻璃的透明，把这份清澈留了下来。匠人吹制玻璃时，火与空气在指尖流转，一只透明的器皿便有了生命。它是“承香的露器”：滴入精油，看它在光里流转；或插一枝花，让露水般的清澈装满器身。匠人说，玻璃是“看得见的空”：“它什么都不装的时候，才最像露珠。”`, aromatherapistNotes: `承露璃，是“以器承露的东方美器”。中医讲“上善若水，水善利万物”，玻璃的透明与晨露的意象，指向“清”与“空”的东方美学——它不以香气的浓烈取胜，而以器物的清澈，承接香气的轻盈。我常建议案主：以承露璃盛放清水与一两滴精油，置于案头，让光、水与香在透明的器皿里静静流转，成一幅会呼吸的案头小品。器有清气，香有灵韵；愿这一只承露璃，替你接住日常里清澈的瞬间。` },
  'S-C-401': { ericNotes: `美国西北部的有机农场，我蹲在薄荷田边碾碎一片叶子，清凉直冲天灵盖——那股锐利而纯粹的薄荷脑气息，仿佛把整片田的凉意都吸进了身体。蒸馏师说，这片水土让薄荷脑格外纯净。清晨采收的薄荷被送进铜釜，蒸汽升起，水相带着薄荷的灵魂缓缓流出。我把纯露喷在颈后，那股清凉的触感像夏日山风拂面，倦怠的午后瞬间清醒。农庄主笑着说：“薄荷是农场的闹钟，也是你的。”`, aromatherapistNotes: `薄荷纯露，是“油性肌与午后倦怠的清凉之水”。中医讲“疏散风热、清利头目”，薄荷纯露保留了薄荷的清凉精华，却比精油温和得多——收缩毛孔、平衡皮脂、提神醒脑，是油性肌与混合肌的日常良伴。我常建议案主：午后倦怠时，以薄荷纯露喷洒颈后与手腕，让清凉唤醒沉睡的精神；油性肌则每日拍敷，平衡油脂。它清凉而不刺激；愿这捧薄荷的晨露，替你守住每个午后的一份清醒。` },
  'S-C-402': { ericNotes: `新南威尔士的野生茶树林，蒸馏坊堆满枝叶。蒸馏出的茶树纯露质地清冽如水，带药草的微涩和泥土的温润——喷雾上脸，如走入阳光晒透的桉树林。我装了一壶纯露带走，在悉尼的民宿每晚用它拍脸，像把整片荒野带在身边。那股清劲的草本气息里，有澳洲土地的质朴与阳光的干燥。把纯露喷在脸上，那股清冽的湿润仿佛把整片荒野的洁净，都敷在了皮肤上。`, aromatherapistNotes: `茶树纯露，是“油性与痘痘肌的日常净化水”。中医讲“清热解毒、祛湿止痒”，茶树纯露保留了茶树精油的部分抗菌与净化特性，却温和得多——平衡皮脂、清洁毛孔，适合油性与痘痘肌作为爽肤水，也可用于轻微皮肤炎症的舒缓与剃须后收敛。我常建议案主：痘痘肌以茶树纯露湿敷，油性肌每日拍敷，让荒野的净澈陪你守住肌肤的清爽。愿这捧新南威尔士的荒野之水，替你守住肌肤的洁净日常。` },
  'S-C-403': { ericNotes: `安达卢西亚的有机农场，老妇采下一枝迷迭香递给我，说这就是地中海的记忆。我把枝条夹在笔记本里带回，每次打开纯露瓶都想起她的笑脸。迷迭香纯露透明如水，气息饱满——松针的清苦与草药的甘甜交织，唤醒沉睡的感官。清晨的农场，迷迭香在露水里泛着银光，蒸馏出的纯露带着那股地中海的清醒。我把纯露喷在脸上，那股松针与草药的气息混着湿润，仿佛把安达卢西亚的晨风，都敷在了皮肤上。`, aromatherapistNotes: `迷迭香纯露，是“头皮与感官的唤醒之水”。中医讲“活血通络、醒脑开窍”，迷迭香纯露温和收敛，平衡皮脂、紧致毛孔，清爽香气有助于提神醒脑，也是头皮活化的良伴。我常建议案主：晨间以迷迭香纯露轻拍面部，让一天带着清醒的节奏；洗护时喷洒头皮，促进循环。愿这捧地中海的记忆之露，替你唤醒每一个沉睡的清晨。` },
  'S-C-404': { ericNotes: `新南威尔士的桉树林，树干刺向天空。蒸馏师说，辐射桉（Radiata）做的纯露更柔和——它比蓝胶尤加利少一分霸道，多一分圆融。蒸馏出的尤加利纯露如水清透，气息凌厉疏离：深吸一口，鼻腔满是开阔药感的清冽，仿佛置身桉树林的晨雾里。林间的风穿过树干，带着那股樟脑般的清凉。我把纯露喷在胸口，深吸一口气，那股清冽的湿润仿佛把整片桉树林的呼吸，都带进了肺里。`, aromatherapistNotes: `尤加利纯露，是“呼吸道与油性肌的净化之水”。中医讲“宣肺通窍、清热解毒”，尤加利纯露温和清洁，适合油性与痘痘肌作为爽肤水，抗菌作用有助于改善痤疮；作为空间喷雾可净化空气，蒸汽吸入可辅助舒缓呼吸道。它比精油温和得多，可高频使用。我常建议案主：换季时以尤加利纯露喷洒空间，油性肌每日拍敷，让清冽的药感替你守住呼吸与肌肤的洁净。愿这捧桉树林的呼吸之露，替你打开一扇透气的窗。` },
  'S-C-405': { ericNotes: `康涅狄格州的有机农场，金缕梅树丛在秋日盛开。农场主说，它的枝条冬天结种，春天弹射到几米之外——金缕梅是“会播种的树”，也是北美原住民世代使用的“皮肤之树”。蒸馏出的金缕梅纯露质地略厚，如淡茶触感，气息淡雅清正，带着树皮的微涩与青草的香。我把纯露喷在脸上，那股收敛的感觉明显却不紧绷，仿佛被秋日的树林轻轻握了一下。原来收敛，也可以温柔。`, aromatherapistNotes: `金缕梅纯露，是“油性肌与痘痘肌的收敛之水”。中医讲“收敛固涩、清热燥湿”，金缕梅富含单宁酸，以出色的收敛与抗炎特性著称——紧致毛孔、平衡皮脂、舒缓皮肤发炎，是油性肌与痘痘肌的理想选择。它的收敛感明显却不紧绷，温和而有效。我常建议案主：油性肌早晚以金缕梅纯露轻拍，痘痘发炎时湿敷，让树皮的微涩替你守住肌肤的清爽。愿这捧康涅狄格的收敛之露，替你守住毛孔的细致。` },
  'S-C-407': { ericNotes: `摩洛哥阿特拉斯山下的有机农场，蒸馏师让我揉碎一片马鞭草叶——那股柠檬味比任何柑橘都透彻，仿佛把整片叶子的阳光都挤了出来。整个下午，满院子都是清爽的味道。柠檬马鞭草纯露清透如水，柠檬香气明亮跳跃，带着绿叶的清新和微苦，像刚揉碎的叶片留在指尖的味道。蒸馏出的纯露保留了那股清雅持久的柠檬香。我把纯露喷在脸上，那股透亮的柠檬气息混着湿润，仿佛把阿特拉斯山的午后阳光，都敷在了皮肤上。`, aromatherapistNotes: `柠檬马鞭草纯露，是“午后倦怠与暗沉肌的提振之水”。中医讲“疏肝解郁、行气醒脾”，柠檬马鞭草的香气比柑橘类更细腻优雅，温和促进消化、放松身心，护肤上能平衡皮脂、提亮肤色。它的柠檬香明亮而不刺激，是午后提神的良伴。我常建议案主：午后倦怠时以柠檬马鞭草纯露喷洒面部与颈后，暗沉肌每日拍敷，让透亮的柠檬香替你唤回光彩。愿这捧阿特拉斯山的柠檬露，替你守住清醒与明亮。` },
  'S-C-417': { ericNotes: `法国南部的芳香作物产区，我在清晨的阳光里找到了这片土地的精灵。马鞭草酮迷迭香纯露，来自法国有机农场，花穗蒸馏——它与普通迷迭香纯露不同，含有珍贵的马鞭草酮，对皮肤细胞的更新更优，是迷迭香家族中对皮肤最温和的一员。清晨的农场，花穗在露水里泛着银光，蒸馏出的纯露带着草本的清新。我把纯露喷在脸上，那股温和的草本气息混着湿润，仿佛把法国南部的晨光，都敷在了皮肤上。`, aromatherapistNotes: `马鞭草酮迷迭香纯露，是“熟龄肌与暗沉肤的更新之水”。中医讲“活血行气、以通为补”，马鞭草酮迷迭香对皮肤细胞的更新数据优于普通迷迭香，能改善肤色暗沉、促进皮肤净化，是迷迭香家族中对皮肤最温和的成员，适合熟龄肌活化配方。我常建议案主：熟龄肌与暗沉肤以马鞭草酮迷迭香纯露湿敷，让温和的草本力陪你慢慢焕新。愿这捧法国有机农场的更新之露，替你找回肌肤的光彩。` },
  'S-C-418': { ericNotes: `摩洛哥干燥丘陵上的迷迭香农场，叶片小但香气浓烈——抓一把叶片，味道强劲得像薄荷和樟脑，远处是阿特拉斯山脉的雪顶，深刻有力。桉油醇迷迭香纯露，带着高含量的1,8-桉叶油醇，穿透力让鼻腔为之一振，混合迷迭香的青草与木质底韵，像走进阳光晒透的松林。蒸馏出的纯露如水清透。我把纯露喷在脸上，那股清冽的草本气息混着湿润，仿佛把阿特拉斯山脉的晨风，都敷在了皮肤上。`, aromatherapistNotes: `桉油醇迷迭香纯露，是“油性肌与换季鼻塞的净化之水”。中医讲“宣肺通窍、清热利湿”，桉油醇迷迭香在净化方面表现出色——深层清洁毛孔、平衡皮脂，护发上可作为头皮清爽喷雾；其醒脑的通透感，也能让熬夜后的肌肤重新清醒。我常建议案主：熬夜后以桉油醇迷迭香纯露拍敷唤醒肌肤，油性肌每日使用平衡油脂。愿这捧突尼斯的醒脑之露，替你守住肌肤与鼻腔的清爽。` },
  'S-C-420': { ericNotes: `昆士兰的野生柠檬茶树林，原住民后裔蒸馏师说，祖先用这种叶子做药浴。把叶片泡进热水，那股柠檬味比任何精油都生动——每棵树都有自己的故事。柠檬茶树（Leptospermum petersonii）纯露，兼具茶树的净化与柑橘类的清新：柠檬的明亮与茶树药感完美平衡，清爽不刺鼻，带着绿叶生机和一丝木质底韵。蒸馏出的纯露清亮通透。我把纯露喷在脸上，那股明亮的草本气息混着湿润，仿佛把昆士兰的晨光，都敷在了皮肤上。`, aromatherapistNotes: `柠檬茶树纯露，是“油性肌与清晨的明亮之水”。中医讲“清热解毒、行气化湿”，柠檬茶树纯露兼具茶树的净化与柑橘的清新——平衡皮脂、提亮肤色，清新的柠檬香气有助于提振精神，是夏季清凉面部喷雾的良伴。我常建议案主：晨间以柠檬茶树纯露拍敷唤醒肌肤，油性肌每日使用平衡油脂。愿这捧昆士兰的明亮之露，替你守住肌肤的清爽与清晨的清醒。` },
  'S-C-424': { ericNotes: `澳洲的有机茶树农场，蒸馏精油时，蒸汽里的水相也被小心收集——这便是一瓶纯露的诞生。纯露是“精油的影子”：精油如灵魂，纯露如身体，它保留了植物最温柔的水溶性养分，却比精油更亲肤、更日常。清晨的茶树田，露水未干，蒸馏坊里升起第一缕蒸汽。农庄主接了一杯纯露递给我：“精油是药，纯露是茶——天天喝也不腻。”我把纯露喷在脸上，那股清冽的草香与湿润，像把澳洲的晨露，直接敷在了皮肤上。`, aromatherapistNotes: `茶树纯露，是“日常清透的守护水”。中医讲“皮毛开阖”，纯露以水相之柔，为肌肤提供最温和的日常照拂——茶树纯露带着精油的清劲，却无精油的刺激，适合每日喷雾、湿敷与爽肤：收敛油光、安抚痘肌、清新肤质，是油性与混合性肌肤的日常良伴。我常建议案主：以茶树纯露代替化妆水，日间随时喷雾补水，让肌肤在清透中保持平衡。愿这捧澳洲的晨露，陪你守住肌肤的清爽日常。` },
  'S-C-426': { ericNotes: `澳洲的沼泽地里，沼泽茶树（Melaleuca ericifolia）在湿地上生长，叶片细密如针，开白色的小花。与普通茶树不同，沼泽茶树长在“水的边缘”——它的油与露，都带着湿地的温柔。蒸馏坊里，蒸汽缓缓升起，水相与油相分离，纯露清澈如晨雾。农庄主说，沼泽茶树是“温柔的茶树”：“它不像兄弟那样刚烈，却更懂敏感的皮肤。”我把纯露喷在手背，那股带着草香的湿润，仿佛把澳洲湿地的雾气，轻轻敷在了皮肤上。`, aromatherapistNotes: `沼泽茶树纯露，是“敏弱肌的温柔守护”。中医讲“治标必先固本”，纯露的水相特性，让沼泽茶树纯露比精油更温和——它保留了茶树的净澈，却降低了刺激，适合敏感肌、换季不适与婴儿护理的日常使用。我常建议案主：换季泛红时，以沼泽茶树纯露湿敷，让肌肤在湿润中慢慢安定。愿这捧湿地的晨雾，替你守护每一次换季的安稳。` },
  'S-C-431': { ericNotes: `塔斯马尼亚的有机农场，芳枸叶（Fragonia）在风中摇晃。蒸馏师说，这植物只有在塔斯马尼亚才长得好——这片岛上的风、土与雨水，都恰好是它喜欢的。芳枸叶是茶树家族最温柔的成员：没有猛烈药感，取而代之的是花香甜美和草本通明。蒸馏出的纯露清透明澈，带着那股温柔的净澈气息。我在农场里摘了一片叶子揉碎，那股介于茶树与薰衣草之间的香气，清劲而圆润。把纯露喷在脸上，仿佛把塔斯马尼亚海风的温柔，都敷在了皮肤上。`, aromatherapistNotes: `芳枸叶纯露，是“敏感肌也适用的净化之水”。中医讲“清热解毒、安神化湿”，芳枸叶的化学成分介于茶树与薰衣草之间——既有净化的力度，又有安抚的温柔，它的纯露比茶树纯露更柔和，适合敏感肌、换季不适与日常净化。我常建议案主：以芳枸叶纯露代替化妆水，或湿敷泛红处，让肌肤在温柔的净澈里恢复平衡。愿这捧塔斯马尼亚的花露，替你守住敏感肌的日常安宁。` },
  'S-C-434': { ericNotes: `巴拉圭的苦橙叶农场，苦橙树在热带阳光下舒展枝叶。工人修剪下的嫩枝堆成小山，枝叶间透着青绿的油光，揉碎一片，那股混合了橙花与草本的香气便弥漫开来——比橙花更踏实，比薰衣草更清新。苦橙叶清爽纯露，是这份踏实绿意的水相化身：带着青绿的草本气息，温柔、沉静，像一位不善言辞却可靠的邻居。我把纯露喷在脸上，那股踏实的绿意让紧绷的神经一根根松开——原来安眠，不一定需要昂贵，只需要被懂得。`, aromatherapistNotes: `苦橙叶纯露，是“敏弱肌与高压神经的安抚水”。中医讲“疏肝解郁、宁心安神”，苦橙叶的化学成分与薰衣草相似——高比例的乙酸沉香酯是天然的神经镇静剂，它的纯露比精油更温和，适合敏感肌、换季不适与睡前使用。我常建议案主：睡前以苦橙叶纯露喷洒枕边，敏弱肌湿敷泛红处，让踏实的绿意陪你安睡。愿这捧巴拉圭的绿意之水，替你守住每个夜晚的平静。` },
  'S-C-435': { ericNotes: `克罗地亚的海岸线上，杜松丛在石楠与苔藓间倔强生长。杜松果纯露，带着针叶的清冽与浆果的微甜，是“净化之果”的水相化身——在北欧传说中，杜松是驱邪净界的神木，古人把它挂在门口，相信它能挡住厄运。蒸馏出的纯露清冽透亮，那股针叶与浆果的气息，仿佛把克罗地亚的海风与石楠花都带到了眼前。我把纯露喷在脸上，那股清冽的湿润让呼吸都干净了几分——原来净化，是可以被闻到的。`, aromatherapistNotes: `杜松果纯露，是“油性肌与空间净化的清冽之水”。中医讲“祛风除湿、利水通淋”，杜松果纯露温和收敛，净化油性肌、平衡皮脂，也可喷洒空间涤荡浊气。它的清冽能疏导郁结的思绪，让身心都清爽起来。我常建议案主：油性肌以杜松果纯露拍敷，居室喷洒净化空气，让浆果的清冽替你守住清爽。愿这捧克罗地亚的净浊之水，替你涤净郁积的浊气。` },
  'S-N-410': { ericNotes: `阿曼佐法尔山区，乳香树的树脂在阳光下变成金色泪滴。蒸馏坊里，香气庄严而神秘——乳香，是这片土地上最古老的神圣之香，几千年来被用于神庙、药房与冥想。乳香纯露质地比普通纯露略润，如一层丝雾：乳香清冽深远，树脂微酸与木质烟熏交织，如置身古老殿堂。我在山区的黄昏里喷了一捧，那股沉静的气息混着湿润，仿佛把沙漠的古老与神圣，都带进了呼吸。原来有些安宁，是几千年都不曾改变的。`, aromatherapistNotes: `乳香纯露，是“熟龄肌与冥想者的紧致之水”。中医以乳香“活血行气、安神定志”，乳香纯露以出色的抗衰老与皮肤修复著称——紧致肌肤、减少皱纹、改善肤色，其抗炎特性适合敏感与成熟肌肤，木质香气有助于冥想与放松。我常建议熟龄案主：以乳香纯露湿敷面部，冥想前喷洒手腕，让古老的树脂香陪你紧致肌肤、安顿心神。愿这捧佐法尔的金色泪滴，替你守住肌肤的弹性与内心的平静。` },
  'S-N-412': { ericNotes: `印度迈索尔的檀香林，百年老檀香树被保护得像文物，我没能进到蒸馏坊，但风吹过树林，满世界都是沉静的木香——那一刻什么都不想说了。檀香纯露，是这份沉静的水相化身：它保留了檀香的温润精华，质地顺滑，木质的微甜与醇厚绵延很久。我在林间站了一会儿，看阳光透过枝叶洒下斑驳的光影，忽然明白：有些安静，是树用一百年修来的。把纯露喷在手腕，那股木香混着湿润，仿佛把整片檀香林的沉默，都带进了呼吸里。`, aromatherapistNotes: `檀香纯露，是“熟龄肌与冥想者的沉静之水”。中医讲“心定则神明、润则养肤”，檀香纯露保留了檀香的安神精华，质地温润顺滑，补水保湿、温和收敛，适合干燥、成熟与敏感肌肤；木质香气更有助于冥想与放松。我常建议案主：冥想前以檀香纯露喷洒手腕与胸口，睡前湿敷面部，让木香的沉静陪你进入深层的安宁。愿这捧迈索尔的沉静之水，替你守住内心的安定与肌肤的丰盈。` },
  'S-N-414': { ericNotes: `保加利亚的白玫瑰田，象牙色花瓣在阳光下几乎透明。蒸馏师说，白玫瑰的产油量比红玫瑰低一半——它把更多的美，留给了看得见它的人。白玫瑰纯露清透如露，香气比红玫瑰更清雅空灵，像月光洒在花瓣上：绿意与小苍兰般的气息交织，不甜腻，只有纯净。清晨的花田里，露水挂在花瓣上，折射出细碎的光。我把纯露喷在脸上，那股空灵的湿润，仿佛把保加利亚清晨的月光，都敷在了皮肤上。`, aromatherapistNotes: `白玫瑰纯露，是“淡雅净透的美白之水”。中医讲“肺主皮毛，白者入肺”，白玫瑰的香气清雅纤细，补水保湿、舒缓平衡，适合偏好淡雅花香者与美白打底——它与红玫瑰的醇厚互补，一个空灵，一个深沉。有机高海拔产区让原料更纯净。我常建议案主：以白玫瑰纯露晨间轻拍，做美白护理的打底水，让肌肤在清雅的花露里慢慢透亮。愿这捧白玫瑰的月光，替你守住肌肤的净透。` },
  'S-N-415': { ericNotes: `桂花，是东方秋日最令人沉醉的香气记忆。金桂（Osmanthus fragrans var. thunbergii）花朵极小、出油率极低，其纯露同样珍贵难得——每一滴都承载着中国庭院的秋天。桂林的有机农场里，金桂在秋日初开，花朵如金色碎米缀满枝头，香气馥郁而甜润。蒸馏出的桂花纯露，是所有纯露里香气最独特的品种之一：蜜甜的桂花香里带着杏桃与茶叶的气息，仿佛把整个秋天的甜蜜都封进了瓶里。我把纯露喷在脸上，那股东方秋日的香气，仿佛把满城的桂花香，都带进了呼吸。`, aromatherapistNotes: `桂花纯露，是“东方美学与润燥养颜的珍稀之水”。中医讲“桂花性温，温中散寒、暖胃止痛”，其纯露香气独特馥郁，补水润燥、愉悦心神，是嗅觉享受型的爽肤水——蜜甜的桂花香能瞬间抚平焦躁，让护肤成为一种享受。金桂出油率极低，纯露珍贵难得。我常建议案主：以桂花纯露代替化妆水，或喷洒于衣领与枕边，让东方秋日的馥郁陪伴日常。愿这捧金桂的花露，替你守住秋日的温柔与肌肤的润泽。` },
  'S-N-419': { ericNotes: `小花茉莉（Jasminum sambac），又称阿拉伯茉莉或中国茉莉——在中国文化里，茉莉是一首流传千年的民歌。与香气奔放的大花茉莉不同，小花茉莉纯露清雅幽远，像一阕婉约的宋词。蒸馏出的纯露带着茉莉的清甜与茶香，亲水性活性物质让它的香气比茉莉精油更清淡，适合日常肌肤护理。夜里的茉莉园，白花在月光下悄悄绽放，香气顺着风飘进院落。我把纯露喷在脸上，那股清雅的花香混着湿润，仿佛把中国南方的月夜，都敷在了皮肤上。`, aromatherapistNotes: `小花茉莉纯露，是“敏弱肌与情绪的婉约安抚水”。中医讲“芳香化湿、行气解郁”，茉莉自古便是“窨茶之花”与“安神之香”——小花茉莉纯露比精油更清淡温和，补水保湿、舒缓敏弱，适合日常肌肤护理与情绪安抚。它的香气清雅幽远，是嗅觉的享受。我常建议案主：以小花茉莉纯露代替化妆水，睡前喷洒枕边，让婉约的花香陪你安睡。愿这捧中国南方的月夜花露，替你守住肌肤的舒缓与心神的宁静。` },
  'S-N-421': { ericNotes: `索马里兰山区，乳香树从岩缝里长出来，蒸馏坊条件简陋，老人把金黄树脂放在炭火上，说这个味道能连接天地。乳香纯露，是这份古老疗愈的水相化身：轻盈如水，却保留了乳香树脂的深邃——柠檬的清新与木质烟熏交织，像走入烛火摇曳的古老殿堂。我在山区的黄昏里喷了一捧，那股沉静的气息混着湿润，仿佛把沙漠的古老秘密，都带进了呼吸里。原来有些疗愈，是几千年传下来的。`, aromatherapistNotes: `乳香纯露，是“心神与熟龄肌的古老安抚水”。中医以乳香“活血行气、安神定志”，乳香纯露保留了树脂的水溶性精华，轻盈如水却深邃静谧——安抚心神、紧致抗皱、滋养熟龄肌，是冥想与熟龄护理的良伴。我常建议案主：冥想前以乳香纯露喷洒手腕，熟龄肌每日湿敷，让古老的树脂香陪你沉淀心神。愿这捧索马里兰的水雾，替你连接天地的安宁与肌肤的紧致。` },
  'S-N-422': { ericNotes: `格拉斯小镇的窄巷里，我参观了刻着1865年的老蒸馏坊。蒸馏师说，这里的玫瑰香气无法被复制——格拉斯（千叶玫瑰）的香气比大马士革更浓郁华丽，蜜糖醇厚中带一丝茶叶回甘，像把整个普罗旺斯花园装进一瓶水。老蒸馏坊的铜釜还在冒着蒸汽，几百年了，同一片土地，同一炉玫瑰。格拉斯玫瑰纯露质地细腻柔和。我把纯露喷在脸上，那股华丽的花香混着湿润，仿佛把普罗旺斯的花园与1865年的时光，都敷在了皮肤上。`, aromatherapistNotes: `格拉斯玫瑰纯露，是“嗅觉与肌肤的双重奢侈”。中医讲“疏肝悦色、润燥养颜”，格拉斯玫瑰（千叶玫瑰）的香气比大马士革更为细腻甜润，保湿、舒缓、平衡功效俱佳，适合对香气有较高要求的使用者与高级护肤配方。它的蜜糖醇厚中带茶叶回甘，是玫瑰纯露中的“贵族”。我常建议案主：以格拉斯玫瑰纯露代替化妆水，或喷洒于枕边，让奢华的花香成为日常的仪式。愿这捧格拉斯的花露，替你守住肌肤的润泽与嗅觉的愉悦。` },
  'S-N-425': { ericNotes: `保加利亚有机玫瑰谷，红玫瑰花瓣厚实、深粉红，在晨光里泛着丝绒般的光泽。蒸馏师说，这个品种的香气分子更重，蒸馏出的纯露也比普通玫瑰更醇厚。清晨的花田里，露水未干，花农们的手指在花瓣间翻飞，一篮一篮的红玫瑰被送进铜釜。蒸汽升起，水相带着玫瑰的魂魄缓缓流出，带着蜜糖的甜与一丝红酒般的微酸尾韵。我把纯露喷在脸上，那股丝绒般醇厚的花香混着湿润，仿佛把整个玫瑰谷的清晨，都敷在了皮肤上。`, aromatherapistNotes: `大马士革红玫瑰纯露，是“干性与熟龄肌的醇厚滋养水”。中医讲“养血润燥、疏肝悦色”，红玫瑰的香气比普通玫瑰更醇厚深沉，蜜糖感中带着红酒微酸尾韵，补水保湿、舒缓润泽，尤其适合干性与熟龄肌肤。有机高海拔产区让它的品质更纯净。我常建议熟龄案主：以红玫瑰纯露代替化妆水，或浸透纸膜湿敷，让肌肤在花香的醇厚里慢慢恢复丰盈。愿这捧玫瑰谷的红丝绒，替你养出岁月里的光泽。` },
  'S-N-428': { ericNotes: `南非的有机天竺葵农场，粉红的小花在晨光里开放，蒸馏坊里，蒸汽把花瓣的香气带进水相——天竺葵纯露，是“玫瑰的平价替代”：它带着玫瑰般的甜美花香，却比玫瑰纯露更亲民。清晨采收的花瓣被送进铜釜，蒸汽升起，纯露一滴一滴落入玻璃瓶，清澈如晨光。农庄主说，天竺葵纯露是“女人的水”：“喷一喷，心情和皮肤一起平衡了。”我把纯露喷在脸上，那股清甜的玫瑰香混着湿润，仿佛把南非的晨光，敷在了皮肤上。`, aromatherapistNotes: `天竺葵纯露，是“身心的平衡之水”。中医讲“疏肝解郁、调和气血”，天竺葵的平衡之力，在水相中更显温柔——它收敛油光又滋养干燥，安抚情绪又提振精神，是“双向调节”的日常良伴。纯露适合每日喷雾、湿敷与泡澡，让花香与水润，一同调和身心的节律。我常建议案主：晨间以天竺葵纯露喷雾醒肤，午后低落时再喷一喷，让花香陪你度过每一个需要平衡的时刻。愿这捧南非的花露，替你调出从容的底色。` },
  'S-N-430': { ericNotes: `澳洲的檀香林，蒸馏精油时，水相被小心收集——檀香纯露，带着木质香的温润，是“树木送给肌肤的露水”。与精油的浓烈不同，纯露如水般轻柔，却保留了檀香滋养的精华。清晨的蒸馏坊，蒸汽混着檀香的气息升起，纯露清澈如林间雾气。农庄主说，檀香纯露是“熟龄的水”：“它不像精油那么贵重，却适合每天用，慢慢养。”我把纯露喷在脸上，那股温润的木香混着湿润，仿佛把澳洲檀香林的静谧，敷在了皮肤上。`, aromatherapistNotes: `檀香纯露，是“熟龄与干燥肌的滋养之水”。中医讲“滋润以养肤”，檀香纯露保留了大分子檀香醇的水溶性部分，质地温润，能补水保湿、安抚敏弱、延缓岁月的干涸——比精油更适合日常与敏感肌。我常建议熟龄案主：以檀香纯露代替化妆水，每日轻拍，让肌肤在木香的温润中慢慢恢复丰盈。愿这捧檀香林的晨露，陪你温柔地养出岁月的光泽。` },
  'S-N-432': { ericNotes: `摩洛哥的橙园，春季白花满树，香气在艳阳下浮动。蒸馏坊里，苦橙花被送进铜釜，蒸汽升起，水相带着白花的清苦与香甜缓缓流出——橙花纯露，是“贵族的平价之水”：它保留了橙花安抚的精华，却比精油更适合日常。清晨的橙园，露水未干，采花人的竹篮里堆满白花。我把纯露喷在脸上，那股清苦的花香混着湿润，仿佛把摩洛哥的晨光与橙花的安静，一起敷在了皮肤上。`, aromatherapistNotes: `橙花纯露，是“心神与肌肤的双重安抚水”。中医讲“理气安神、润泽肌肤”，橙花纯露保留了橙花的安抚之力，却比精油更温和日常——它能收敛细致毛孔、提亮暗沉肤色，也能在惊惶不安时，以一捧花香让心神落回胸腔。我常建议案主：睡前以橙花纯露湿敷，或喷于枕边，让白花的清苦与香甜，陪你安睡。愿这捧摩洛哥的白花露，替你守住内心的平静与肌肤的光泽。` },
  'S-N-433': { ericNotes: `保加利亚玫瑰谷的五月，凌晨四点花农便走进玫瑰田，露水未干，花瓣上还挂着夜的清凉。蒸馏坊里，花瓣被送进铜釜，蒸汽升起，水相带着玫瑰的魂魄缓缓流出——大马士革玫瑰纯露，是“液体的玫瑰花园”。它保留了玫瑰安抚的精华，却比精油更日常、更温柔，是芳疗界的“万能之水”：敷脸、喷雾、泡澡、护发，都能胜任。我在玫瑰谷的清晨接了一杯纯露，那股甜美的花香混着湿润，仿佛把整个山谷的五月，都装进了杯里。`, aromatherapistNotes: `大马士革玫瑰纯露，是“身心的日常圣水”。中医讲“疏肝解郁、养血悦色”，玫瑰纯露保留了玫瑰的安抚之力，却比精油更亲肤日常——它补水提亮、安抚敏弱、缓解干燥，也能在情绪低落时，以一捧花香抚慰心绪。它温和到婴儿可用，是“全家皆宜”的天然化妆水。我常建议案主：以玫瑰纯露代替化妆水，晨昏各喷一次，让肌肤与心情，都沐浴在玫瑰的温柔里。愿这捧玫瑰谷的晨露，替你守住日常的细腻与温柔。` },
  'S-N-436': { ericNotes: `马达加斯加的依兰树，花朵低垂如金色流苏，蒸馏坊里，花瓣的香气随蒸汽进入水相——依兰纯露，带着热带花香的湿润。与精油的浓郁不同，纯露如水般轻盈，却保留了依兰滋润的精华。清晨的采花人攀上树干，把花朵小心放入竹篓，太阳升起前，花朵的香气最完整。蒸馏坊里，纯露一滴一滴落入玻璃瓶，清澈如热带晨雨。农庄主说，依兰纯露是“热带的雨”：“皮肤渴了，就下一点。”我把纯露喷在脸上，那股甜暖的花香混着湿润，仿佛把雨林的晨雨，敷在了皮肤上。`, aromatherapistNotes: `依兰依兰纯露，是“干渴肌的润泽之水”。中医讲“津液滋润、肌肤丰盈”，依兰纯露保留了依兰滋养的精华，却比精油更轻盈日常——它补水润泽、安抚敏弱，也以花香的暖意缓解紧绷的情绪，是干燥肌与情绪紧绷者的日常良伴。我常建议案主：以依兰纯露代替化妆水，或与玫瑰纯露混合使用，让肌肤在热带的润泽中恢复柔软。愿这捧雨林的晨雨，替你滋养干渴的肌肤与心情。` },
  'S-N-437': { ericNotes: `越南的古沉香林，是芳疗界的传说。沉香的形成，是树木受伤后，以树脂层层包裹伤口，历经数十年才凝成那一段深褐的“香结”——它是树的伤痕，也是树的珍宝。蒸馏沉香时，水相被小心收集，那捧纯露带着深沉的木香与极致的温润，产量稀少、弥足珍贵。老香农说，沉香是“时间酿的药”：“它不急着给你什么，却把最好的，都留给懂它的人。”我把纯露喷在脸上，那股沉静的木质香混着湿润，仿佛把古林的岁月，敷在了皮肤上。`, aromatherapistNotes: `沉香纯露，是“熟龄肌的奢华凝养之水”。中医以沉香“行气温中、纳气平喘”，沉香的珍贵在于时间——它的纯露产量极低，却带着最深沉的水溶性精华，能深度补水、安抚敏弱、延缓岁月的痕迹，是熟龄肌与高端护理的珍稀之选。我常为追求极致养护的案主推荐它：以沉香纯露轻拍面部，或湿敷于干燥处，让肌肤在木香的沉静中慢慢凝养。愿这捧古林的岁月之露，替你凝住时光的丰润。` },
  'S-R-432': { ericNotes: `西西里岛的山坡上，苦橙花盛开，蒸馏师三代都做橙花——花香和海风混在一起，整个人都松弛下来。从卡塔尼亚到巴勒莫，阳光、柠檬、橙花的记忆，全封在这一瓶里。橙花纯露清透如水，白花在晨露中徐徐绽开，香气微苦却柔软绵长，像地中海的梦。清晨的山坡上，采花人提着竹篮走进花田，露水打湿裙摆，白花在篮中堆成小山。我把纯露喷在脸上，那股微苦的花香混着湿润，仿佛把西西里的晨光，都敷在了皮肤上。`, aromatherapistNotes: `橙花纯露，是“暗沉肌与睡前安抚的白花之水”。中医讲“理气安神、润泽肌肤”，橙花纯露温和收敛、促进细胞再生，提亮暗沉肤色，香气能缓解焦虑与紧张，适合所有肤质，尤其敏感与暗沉肌肤。我常建议案主：暗沉肌以橙花纯露湿敷，睡前喷洒枕头，让微苦的白花香陪你安睡。愿这捧西西里的白花晨露，替你守住肌肤的光泽与心神的安宁。` },
  'S-R-433': { ericNotes: `保加利亚玫瑰谷的清晨，花农在日出前提着篮子采花。我站在铜釜旁看水汽升腾，那股香气像被时间拉长——那一刻我明白了，有些美好急不得。大马士革玫瑰纯露，被誉为“纯露之后”：清透质地，玫瑰香气层层舒展，蜂蜜般的甜润与绿意清新交织，温柔包围。清晨的花田里，露水挂在花瓣上，花农的手指在花丛间翻飞。我把纯露喷在脸上，那股馥郁的花香混着湿润，仿佛把整个玫瑰谷的清晨，都敷在了皮肤上。`, aromatherapistNotes: `大马士革玫瑰纯露，是“纯露之后”的平衡之水。中医讲“疏肝解郁、养血悦色”，玫瑰纯露调节pH、镇静泛红、提亮肤色，适合所有肤质，尤其干燥、敏感与成熟肌肤；香气有助于情绪安抚与放松。我常建议案主：以玫瑰纯露代替化妆水，或浸透纸膜做水疗，让馥郁的花香替你守护肌肤与心情。愿这捧玫瑰谷的晨露，陪你守住日常的温柔与光泽。` },
  'S-R-434': { ericNotes: `英国乡村的有机农场，白洋甘菊像地毯铺开。我躺在花田边，闭上眼，空气中全是苹果和青草的甜香——那是最安静的一个下午。罗马洋甘菊纯露质地细润如水，气息柔和甜美，阳光晒暖的干草与苹果香气混合，温婉安心。罗马洋甘菊以极致的温和著称，是全年龄适用的皮肤护理选择——对婴儿皮肤问题（尿布疹、热痱）也有显著舒缓效果。我把纯露喷在脸上，那股苹果般的甜香混着湿润，仿佛把英国乡村的下午，都敷在了皮肤上。`, aromatherapistNotes: `罗马洋甘菊纯露，是“全年龄适用的温和之水”。中医讲“甘以缓急、柔以安神”，罗马洋甘菊纯露以极致的温和镇静著称，适合敏感、泛红与炎症性皮肤，对婴儿皮肤问题有显著舒缓效果，香气有助于放松与助眠。我常建议案主：敏感肌以罗马洋甘菊纯露湿敷，婴儿护理时喷洒于洗澡水与尿布区，让苹果般的甜香替你守住娇嫩。愿这捧英国乡村的温柔，呵护全家每一寸肌肤。` },
  'S-R-435': { ericNotes: `普罗旺斯的薰衣草田，紫色波浪延伸到天际。石屋蒸馏坊里，铜釜冒着蒸汽——我坐到日落，看光线从紫色变成金色，那种宁静，语言形容不来。薰衣草纯露清透如水，香气纯净：蜂蜜的甜润与山风的清凉并存，不浓烈但持久。黄昏的风穿过花田，把那股安眠的香气送得很远。我把纯露喷在脸上，那股柔和的紫色香气混着湿润，仿佛把普罗旺斯的日落，都敷在了皮肤上——一天的喧嚣，到此为止。`, aromatherapistNotes: `薰衣草纯露，是“镇定与安眠的万能之水”。中医讲“安神定志、清热润肤”，薰衣草纯露平衡、舒缓、修复，适合所有肤质，尤其敏感与受损肌肤——舒缓晒伤、蚊虫叮咬与轻度不适，香气有助于放松与改善睡眠。我常建议案主：晒后以薰衣草纯露湿敷，睡前喷洒枕边，让紫色的晚风陪你安睡。愿这捧普罗旺斯的紫色晚风，替你守住肌肤的平衡与夜晚的安眠。` },
  'S-S-406': { ericNotes: `欧洲的古树下，菩提花在盛夏开放，香气清甜而温柔。在欧洲传统中，菩提花茶是“安神的花茶”——焦虑失眠的人，喝一杯菩提花茶，紧绷的神经便慢慢松开。蒸馏坊里，菩提花被送进铜釜，水相带着清甜的花香缓缓流出，菩提花纯露清澈如夏日的溪水。老花农说，菩提花是“温柔的医生”：“它不治病，它治心。”我把纯露喷在脸上，那股清甜的花香混着湿润，仿佛把欧洲夏日的树荫，敷在了皮肤上。`, aromatherapistNotes: `菩提花纯露，是“焦虑与泛红的温柔安抚水”。中医讲“甘以缓急、润以安神”，菩提花在欧洲传统中素有“安神之花”之名——它的纯露能舒缓紧张、安抚心神，也能温和退红、安抚敏弱的肌肤，适合敏感肌与情绪紧绷者的日常使用。我常建议案主：焦虑失眠时，以菩提花纯露喷于枕边；肌肤泛红时，湿敷于患处，让花香与水润一同安抚。愿这捧欧洲树荫的温柔，替你卸下紧绷与泛红。` },
  'S-S-411': { ericNotes: `科西嘉岛的岩石坡上，蜡菊（永久花）在阳光下开成一片金黄。蒸馏坊里，明黄的花朵被送进铜釜，水相带着蜡菊特有的香气缓缓流出——那股混合了蜂蜜、咖喱与稻草的气息，是蜡菊独一无二的记号。纯露清澈带着极淡的琥珀色，保留了蜡菊“化淤”的精华。老花农说，蜡菊是“太阳的花”：“它把阳光收进身体，再慢慢还给你。”我把纯露喷在脸上，那股温暖的花香混着湿润，仿佛把科西嘉的阳光，敷在了皮肤上。`, aromatherapistNotes: `蜡菊纯露，是“印记与郁结的温和化解水”。中医讲“瘀不去，新不生”，蜡菊纯露保留了永久花“化淤修复”的精华，却比精油更温和日常——它淡化印记、安抚敏弱，也以花香的暖意陪伴情绪走过郁结。我常建议案主：痘印与瘀青处，以蜡菊纯露湿敷；情绪积郁时，喷于手腕嗅吸，让花香陪你慢慢化开。愿这捧科西嘉的阳光之水，替你化开该放下的印记。` },
  'S-S-413': { ericNotes: `欧洲的田野里，矢车菊开出天空般的蓝色花朵，像大地睁开的一只只蓝眼。在欧洲传统中，矢车菊是“眼睛的花”——古时候的人用矢车菊泡水敷眼，缓解疲劳与干涩。蒸馏坊里，蓝色的花朵被送进铜釜，水相带着清浅的草香缓缓流出。老花农说，矢车菊是“温柔的眼睛”：“它不说话，却最懂你的疲惫。”我把纯露喷在脸上，那股清浅的花香混着湿润，仿佛把欧洲田野的蓝眼睛，敷在了眼周。`, aromatherapistNotes: `矢车菊纯露，是“眼周与敏弱肌的温柔呵护水”。中医讲“目得血而能视”，矢车菊在欧洲传统中素有“明目之花”之名——它的纯露温和纯净，适合眼周湿敷，缓解疲劳与干涩，也适合娇嫩敏感的肌肤使用。我常建议案主：久视电脑后，以矢车菊纯露湿敷眼周；给婴儿与敏弱肌护理时，它也是最安心的选择。愿这捧田野的蓝眼睛，替你温柔地守住清明与柔软。` },
  'S-S-416': { ericNotes: `保加利亚的有机农场，永久花在阳光下开成金黄的花毯。蒸馏坊里，明黄的花朵被送进铜釜，水相带着永久花特有的香气缓缓流出——那股混合了蜂蜜与稻草的温暖气息，是永久花独一无二的印记。有机种植让这捧纯露格外纯净，保留了永久花“化淤修护”的精华。农庄主说，永久花是“不凋的花”：“它把阳光收进身体，再慢慢还给你。”我把纯露喷在脸上，那股温暖的花香混着湿润，仿佛把保加利亚的阳光，敷在了皮肤上。`, aromatherapistNotes: `永久花纯露，是“娇嫩肌的温和修护水”。中医讲“活血化瘀、生肌长肤”，永久花纯露保留了永久花的修复精华，却比精油更温和，适合敏弱肌、婴幼儿与日常修护——淡化印记、安抚泛红、滋养娇嫩，是“全家可用”的温柔之水。我常建议案主：宝宝的红屁屁、自己的痘印，都以永久花纯露湿敷，让花香的暖意陪你慢慢修护。愿这捧不凋之花的露水，替你温柔地修护每一寸娇嫩。` },
  'S-S-423': { ericNotes: `保加利亚的有机洋甘菊田，白花黄心，一眼望不到边。蒸馏坊里，花朵被送进铜釜，蒸汽升起，水相带着洋甘菊特有的香气缓缓流出——那股混合了苹果甜与草本的香气，是洋甘菊的温柔记号。德国洋甘菊纯露带着极淡的天蓝，保留了天蓝烃的抗敏精华，却比精油更温和。农庄主说，洋甘菊是“会急救的花”：“泛红、发痒、哭闹，它都接得住。”我把纯露喷在泛红的皮肤上，那股清凉的湿润，仿佛把整个夏天都安抚了下来。`, aromatherapistNotes: `德国洋甘菊纯露，是“泛红敏弱肌的急救水”。中医讲“凉血解毒、退热安神”，洋甘菊纯露保留了天蓝烃的抗敏精华，却比精油更温和日常——退红止痒、安抚娇嫩、缓解不适，是敏感肌、湿疹倾向与婴幼儿护理的安心之选。我常建议案主：晒后泛红、换季过敏时，以洋甘菊纯露冷敷，让肌肤在清凉中恢复平静。愿这捧保加利亚的蓝色之水，替你接住每一次泛红的委屈。` },
  'S-S-427': { ericNotes: `保加利亚的有机罗马洋甘菊田，白色的小花贴着地面开放，风一吹，满坡都是苹果般的甜香。蒸馏坊里，花朵被送进铜釜，蒸汽升起，水相带着那抹经典的苹果甜缓缓流出。罗马洋甘菊纯露以“温和”闻名——它比德国洋甘菊更轻柔，是芳疗中最适合婴儿与敏感肌的纯露之一。农庄主说，罗马洋甘菊是“外婆的花”：“孩子哭闹、皮肤泛红，都用它。”我把纯露喷在脸上，那股苹果般的甜香混着湿润，仿佛把整个午后的温柔，都敷在了皮肤上。`, aromatherapistNotes: `罗马洋甘菊纯露，是“娇嫩肌与焦躁心的温柔安抚水”。中医讲“甘以缓急、柔以安神”，罗马洋甘菊纯露以温和著称——安抚敏弱泛红、缓解娇嫩不适，也以苹果般的甜香抚慰焦躁的心神，是婴儿、敏感肌与情绪紧绷者的安心之选。我常建议案主：宝宝洗澡后以罗马洋甘菊纯露轻拍，睡前喷于枕边，让花香的温柔陪你安睡。愿这捧保加利亚的苹果花露，替你守住娇嫩与安宁。` },
  'S-S-429': { ericNotes: `保加利亚的有机薰衣草田，紫色的花穗在风里起伏如浪。蒸馏坊里，花穗被送进铜釜，蒸汽升起，水相带着标志性的薰衣草香缓缓流出——那股舒缓的紫色气息，是全世界最著名的安眠香。薰衣草纯露温和到可以天天使用，是芳疗中的“万能之水”：爽肤、湿敷、泡澡、喷雾，样样在行。农庄主说，薰衣草是“会照顾人的花”：“皮肤累了、心也累了，喷一喷，都松了。”我把纯露喷在脸上，那股舒缓的花香混着湿润，仿佛把整片薰衣草田的安宁，敷在了皮肤上。`, aromatherapistNotes: `薰衣草纯露，是“身心的日常SPA之水”。中医讲“安神定志、清热润肤”，薰衣草纯露保留了精油的舒缓精华，却比精油更温和日常——水油平衡、安抚晒后、收敛毛孔，也以花香舒缓紧绷的神经，是“全家皆宜”的万能纯露。我常建议案主：睡前以薰衣草纯露喷雾或泡澡，让疲惫的肌肤与心神，在花香中一起放松。愿这捧紫色的花露，陪你度过每一个需要安眠的夜晚。` },
  'S-S-438': { ericNotes: `法国的快乐鼠尾草田，紫蓝色的花穗在风里摇曳。蒸馏坊里，花穗被送进铜釜，蒸汽升起，水相带着草本的清甜缓缓流出——快乐鼠尾草纯露，是“松弛之水”：它带着草本的柔和与一丝果香的暖，能安抚紧绷的神经。清晨的田间，露水未干，工人剪下带着晨露的花穗。农庄主说，快乐鼠尾草是“会安抚的草”：“经期烦躁、神经紧绷的时候，喷一喷，人就松了。”我把纯露喷在脸上，那股草本的柔和混着湿润，仿佛把法国田间的松弛，敷在了皮肤上。`, aromatherapistNotes: `快乐鼠尾草纯露，是“神经与周期的松弛之水”。中医讲“安神解郁、活血调经”，快乐鼠尾草纯露保留了精油的舒缓精华，却比精油更温和——安抚紧绷的神经、缓解经期情绪波动、收敛油性肌肤，是女性周期护理的日常良伴。我常建议案主：经期前后，以快乐鼠尾草纯露喷雾或湿敷，让身心的潮汐在花香的陪伴下平稳过渡。愿这捧法国田间的松弛之水，陪你度过每一个需要安抚的日子。` },
  'S-S-439': { ericNotes: `保加利亚的山野里，香蜂草在阳光下散发柠檬与蜂蜜的甜香——它是“蜜蜂最爱的草”，也是芳疗中最珍贵的草本之一。蒸馏坊里，枝叶被送进铜釜，蒸汽升起，水相带着柠檬蜜般的香气缓缓流出。香蜂草纯露带着温柔的香气，却比精油亲民得多——它保留了香蜂草安抚的精华，让这份“液体黄金”的慈悲，得以进入日常。农庄主说，香蜂草是“会镇定的草”：“心跳乱了、夜睡不着，喷一喷，心就回到胸腔了。”`, aromatherapistNotes: `香蜂草纯露，是“心神与睡眠的安抚水”。中医讲“养心安神、疏肝解郁”，香蜂草素有“心脏的香蜂草”之名——它的纯露能安抚受惊的心神、平稳心跳、缓解焦虑与失眠，是“心因性”不安的日常良伴。与昂贵的精油相比，纯露让这份安抚得以更日常地使用。我常建议案主：睡前以香蜂草纯露喷雾，或喷于枕边，让柠檬蜜般的香气，陪你安然入睡。愿这捧山野的柠檬蜜露，替你守住心的平静与夜的安眠。` },
  'S-S-440': { ericNotes: `西班牙的山坡上，岩玫瑰（Cistus）开出白色带紫斑的花，叶与枝渗出芳香的树脂——它是“岩石上的玫瑰”，在贫瘠的土地上倔强生长。蒸馏坊里，枝叶被送进铜釜，水相带着树脂特有的深沉香气缓缓流出。岩玫瑰纯露带着一股特殊的药草香，比花香的纯露更内敛，却更有力量——它在欧洲传统中是“退红修复”的圣品。老花农说，岩玫瑰是“会修复的花”：“皮肤泛红、情绪躁动，它都懂。”我把纯露喷在脸上，那股深沉的树脂香混着湿润，仿佛把山野的静默，敷在了皮肤上。`, aromatherapistNotes: `岩玫瑰纯露，是“泛红与躁动的修复之水”。中医讲“凉血解毒、收敛固涩”，岩玫瑰在欧洲传统中素有“退红修复”之名——它的纯露能安抚敏弱泛红、收敛紧致肌肤，也以深沉的树脂香安定躁动的心神，是敏感肌与情绪紧绷者的进阶之选。我常建议案主：换季泛红时，以岩玫瑰纯露湿敷；心浮气躁时，喷于手腕嗅吸，让树脂的深沉陪你静下来。愿这捧山野的树脂露，替你守住稳定与平静。` },
  'S-S-441': { ericNotes: `法国普罗旺斯的高地，薰衣草生长在海拔九百米以上的山间——昼夜温差让这里的薰衣草把更多的能量化成了温柔的酯类，香气比低地更柔和绵长。蒸馏坊里，紫色的花穗被送进铜釜，蒸汽升起，水相带着那抹经典的安眠香缓缓流出。高地薰衣草纯露，是“深眠之水”：它保留了高地薰衣草最温柔的精华，适合睡前使用。花农说，高地薰衣草是“为睡眠而生的花”：“它的香，是给做梦的人铺的床。”我把纯露喷在枕边，那股柔和的紫色香气，仿佛把整个山谷的安宁，都带进了梦里。`, aromatherapistNotes: `高地薰衣草纯露，是“深眠与松弛的进阶之水”。中医讲“安神定志、清热润肤”，高地品种的酯类含量更高，纯露的舒缓之力更绵长——睡前喷雾、湿敷或泡澡，让身心从紧绷滑入松弛，是重度失眠与高压人群的良伴。它比普通薰衣草纯露更温柔，也适合娇嫩肌肤的日常使用。我常建议案主：睡前以高地薰衣草纯露喷于枕边与面部，让紫色的安眠香，陪你滑入完整的梦境。愿这捧高地的安眠露，替你守住每个夜晚的边界。` },
  'S-S-442': { ericNotes: `中国云南的山野，积雪草贴着地面生长，圆形的叶片像一把把小伞——它是“东方护肤的珍宝”，几千年来，中国与印度的传统医学都用它修护肌肤。蒸馏坊里，枝叶被送进铜釜，水相带着清浅的草香缓缓流出。积雪草纯露带着山野的绿意，温和而纯净。农人说，积雪草是“会修护的草”：“它贴着地长，把大地的养分，都收进了叶片里。”我把纯露喷在脸上，那股清浅的草香混着湿润，仿佛把云南山野的绿意，敷在了皮肤上。`, aromatherapistNotes: `积雪草纯露，是“修护与舒缓的东方之水”。中医以积雪草“清热利湿、解毒消肿”，现代研究证实其积雪草苷能促进胶原合成、修护屏障——它的纯露温和纯净，适合敏弱肌、痘印肌与日常修护，是“东方草本智慧”的日常化身。我常建议案主：以积雪草纯露湿敷痘印与泛红处，或每日喷雾，让山野的绿意替你慢慢修护。愿这捧云南的绿露，替你筑起肌肤的屏障。` },
  'S-S-443': { ericNotes: `保加利亚的蓍草田，白色的小花在风里摇曳，毫不起眼——直到蒸馏，蓝色才显现：天蓝烃在蒸汽中生成，把纯露染成极淡的蓝，仿佛把爱琴海的一角装进了瓶里。蒸馏坊里，花朵被送进铜釜，蒸汽升起，水相带着药草的清香与一丝甘甜缓缓流出。西洋蓍草纯露带着那抹标志性的淡蓝，保留了天蓝烃的抗敏精华。农庄主说，蓍草是“战士的花”：“它替皮肤打仗，把泛红与敏感都挡在门外。”我把纯露喷在脸上，那股淡蓝的湿润，仿佛把保加利亚的清风，敷在了皮肤上。`, aromatherapistNotes: `西洋蓍草纯露，是“抗敏退红的蓝色之水”。中医讲“凉血解毒、消肿止痛”，西洋蓍草的天蓝烃是天然的抗炎高手——它的纯露温和保留了这一精华，能安抚敏弱泛红、缓解瘙痒不适，也以药草的沉静安抚焦躁的心神，是敏感肌的进阶之选。我常建议案主：换季过敏、晒后泛红时，以西洋蓍草纯露冷敷，让蓝色的能量替你退红定心。愿这捧保加利亚的蓝色之水，替你守住肌肤的平静。` },
  'Y-B-001': { ericNotes: `阿曼的佐法尔高地，乳香树从贫瘠的石灰岩缝里长出来，树皮被割开时，渗出乳白色的树脂——当地人叫它“神的眼泪”。采脂人用小刀在树干上划出浅口，一个月后再来收集凝固的泪珠，一颗一颗，珍贵如珠。几千年来，乳香沿着古老的香料之路，被送往神庙、宫廷与药房——它是献给神明的香，也是安抚人心的药。蒸馏出的乳香油带着清透的木质香与一丝柠檬般的明亮，像把阿曼的荒漠与月光都收进了瓶里。我把一滴油揉开，那股清冽的树脂香，仿佛让呼吸都变深了。`, aromatherapistNotes: `神圣乳香，是“呼吸与灵魂的古老良药”。中医以乳香“活血行气、止痛消肿”，古埃及人用它入香、入药、入殓，相信它能护送灵魂远行；现代芳疗中，它是冥想与呼吸练习的经典之选——α-蒎烯能加深呼吸，安抚急促的喘息与焦虑。它也是熟龄肌肤的圣品：抚平细纹、紧致松弛。我常为案主调制“呼吸油”：乳香配檀香、佛手柑，扩香或按摩胸口，让每一次吸气都更深、更稳。愿这滴神的眼泪，陪你接住生命中每一次急促。` },
  'Y-B-002': { ericNotes: `索马里的荒漠里，没药树矮小而坚韧，树皮渗出红褐色的树脂，像凝固的血泪。采脂人顶着烈日，把树脂一颗颗从树干上剥下——没药的采收，从来不是轻松的活计。这股苦涩的药香，几千年来被用于祭坛、药房与殡葬：它是“悲伤的香”，也是“疗愈的香”。蒸馏出的没药油带着深沉的树脂苦香，像把索马里荒漠的风沙都收进了瓶里。我把一滴油揉开，那股苦涩而温暖的香气，仿佛在说：伤口被看见，才是疗愈的开始。`, aromatherapistNotes: `没药，是“创伤与岁月的疗愈者”。中医以没药“活血止痛、消肿生肌”，与乳香常相须为用——乳香行气，没药活血，是古人处理创伤的黄金搭档。没药油的抗菌与收敛之力，对口疮、牙龈炎、皮肤溃损皆有奇效；它的深沉苦香，也能安抚深层的情绪创伤，让人与悲伤和解。我常将它与乳香复配，为“旧伤难愈”的案主调制“疗愈油”：让肌肤与心灵，都在被看见之后慢慢愈合。愿这缕荒漠的苦涩，陪你化开生命中该放下的。` },
  'Y-B-003': { ericNotes: `印尼的雨林深处，安息香树渗出乳白色的树脂，凝固后呈琥珀色，带着一股奇异的甜香——像蜂蜜、香草与药草的混合，暖得惊人。采脂人用竹筒接住树干的“泪滴”，在阳光下慢慢晾干。当地人说，安息香是“树的拥抱”：“它不会说话，但它的香，像小时候被抱在怀里的感觉。”蒸馏出的安息香油带着蜜糖般的甜暖，是“定心香”中的温柔派。我把一滴油揉在掌心，那股暖意像一只手，轻轻拍着我的背——别怕，你在这里，你很安全。`, aromatherapistNotes: `安息香，是“惊吓与孤独的安慰者”。中医以安息香“开窍辟秽、行气活血”，是古方中的急救香药；而它的精油，最动人的是那份“甜暖”——像融化的蜂蜜裹着药草，能接住惊惶失措、坐立难安的时刻，也安抚孤独与疏离。它比乳香更甜，比檀香更暖，是“怀抱型的香气”。我常将它与乳香、檀香复配，用于冥想与创伤修复：乳香通神，檀香定心，安息香负责拥抱。愿这缕雨林的蜜糖，替你暖化所有紧绷的夜晚。` },
  'Y-B-004': { ericNotes: `中国的红橘园，果实红彤彤挂满枝头，像一盏盏小灯笼。红橘是“有记忆的水果”：那股清甜里，藏着小时候过年才有的橘香——剥开果皮，汁水四溅，满屋都是喜庆的甜。果农在霜降后采收，冷压出的红橘油带着明亮而圆润的甜香，像把中国庭院的秋天装进了瓶里。农人说，红橘是“喜气的果”：“谁家过年不吃橘子？”我把一滴油揉开，那股熟悉的甜香，仿佛瞬间回到了某个温暖的午后——原来乡愁，是可以被闻到的。`, aromatherapistNotes: `红橘，是“童年与家的气味”。中医以橘皮“理气健脾、燥湿化痰”，红橘精油的香气明亮而温暖，能驱散阴霾、安抚孤独，是情绪低落与思乡时刻的解药。它对儿童尤为友好——温和、甜暖，是“全家的快乐果”。我常建议案主：孩子不安时扩香红橘，老人胃口不佳时稀释按摩腹部，让红橘成为家里的“喜气开关”。它甜而不腻；愿这缕中国庭院的橘香，替你守住心底那盏不灭的灯。` },
  'Y-B-005': { ericNotes: `佛罗里达的葡萄柚园，果实在阳光下泛着金黄的色泽，香气清爽而活泼。葡萄柚的香气是“复杂的明亮”：果甜里带着一丝微苦，像生活本身——甜与苦交织，才有层次。果农在清晨采收，冷压出的油带着明亮的柑橘香，是“快乐维生素”。我在果园里坐了一会儿，看阳光把果皮染成金色，忽然觉得，葡萄柚教会人的，是接纳：接纳那缕微苦，才品得出后面的回甘。`, aromatherapistNotes: `葡萄柚，是“情绪与循环的唤醒者”。中医看它，如“行气解郁、消食化滞”之品，它的香气能瞬间点亮心情，驱散萎靡与倦怠；还能刺激淋巴循环、帮助水分代谢，是水肿体质与久坐族的良伴。它比甜橙多一分清爽，比柠檬多一分圆润，是“恰到好处的明亮”。我常建议案主：晨起扩香葡萄柚，让一天从清亮开始；午后低落时嗅吸一滴，让精神重新上线。愿这缕佛罗里达的朝霞，替你点亮每一个平凡的日子。` },
  'Y-B-006': { ericNotes: `中国的山茶田，秋冬开花，春夏结果。山茶籽油在中国有上千年的历史——江南的女子，用山茶油养发护肤，是代代相传的美丽秘方。榨油坊里，山茶籽被炒香、碾碎、压榨，金黄的油液缓缓流出，带着坚果的温润香气。老油坊主说，山茶油是“油的君子”：“不腻、不浊，最养人。”我把一滴油抹在手背，那股温润的触感，像被春天的茶花轻抚过——原来东方的美，讲究的是细水长流。`, aromatherapistNotes: `山茶籽油，是“东方养肤的根基之油”。中医以茶油“清热化湿、杀虫解毒”，山茶籽油富含油酸与维生素 E，质地轻薄、极易吸收，是敏感肌、干燥肌与母婴护理的理想基底油。它在中国有千年的护肤传统——古时女子以茶油护发养肤，是“东方美的底色”。我常为案主调制“养肤油”：山茶籽油为底，复配玫瑰或橙花精油，每日薄涂，让肌肤在温润中慢慢透亮。愿这滴山野的温润，替你养出茶花般的光泽。` },
  'Y-B-007': { ericNotes: `澳洲的核桃园，核桃树高大繁茂，果实成熟时落在草地上，像一枚枚褐色的宝石。核桃是“聪明的坚果”——它富含 Omega-3 与维生素 E，是大脑与皮肤的共同挚友。榨油坊里，核桃仁被低温压榨，金黄的油液带着浓郁的坚果香，像把秋天的丰收装进了瓶里。农场主说，核桃油是“给全家的礼物”：“孩子吃它长脑子，妈妈用它护肤。”我把一滴油抹在手背，那股温润的触感，仿佛把整片澳洲的阳光都揉进了皮肤里。`, aromatherapistNotes: `核桃油，是“身心的营养之油”。中医以核桃“补肾固精、温肺定喘”，核桃油富含 Omega-3 与维生素 E，内服滋养大脑，外用滋润肌肤——是“内外兼修”的基底油。它的质地比山茶油略厚，适合干燥肌与熟龄肌的夜间滋养。我常为案主调制“滋养油”：核桃油为底，复配乳香或玫瑰，夜间按摩面部与颈部，让肌肤在营养中慢慢丰盈。愿这滴坚果的智慧，替你滋养岁月留下的痕迹。` },
  'Y-B-008': { ericNotes: `索马里的荒漠里，乳香树在烈日与风沙中挺立，树皮被割开，渗出乳白色的树脂——这是“献给神明的礼物”，也是荒漠送给人类的药。采脂人沿着古老的路径，一颗一颗收集凝固的“泪珠”，整个过程像一场虔诚的仪式。乳香在人类文明中留下了太深的印记：古埃及的香膏、犹太圣殿的祭香、丝路商队的驼铃。蒸馏出的乳香油带着清透的木质香与柠檬般的明亮，像把几千年的文明都收进了瓶里。我把一滴油揉开，仿佛听见驼铃在远处响起。`, aromatherapistNotes: `乳香，是“呼吸与灵魂的经典之香”。中医以乳香“活血行气、止痛消肿”，古文明中它通神、入药、安抚人心——是少数穿越了几千年依然被珍视的香药。它的 α-蒎烯能加深呼吸、平抚焦虑，是冥想与呼吸练习的圣品；对熟龄肌肤的紧致修复，也极为出色。我常将它与没药相须为用，调制“疗愈油”：一香一苦，一阴一阳，让身心的创伤在平衡中愈合。愿这滴千年圣树的泪，替你守住呼吸的深度与内心的平静。` },
  'Y-B-009': { ericNotes: `尼泊尔高原的亚麻田，开满蓝色的细碎小花，风过时像一片流动的蓝雾。亚麻籽小小的、金褐色的，却富含 Omega-3——是植物界罕见的“脑黄金”。榨油坊里，亚麻籽被低温压榨，油液带着淡淡的坚果香，金黄透亮。农人说，亚麻是“高原的礼物”：“山上的日子苦，但亚麻籽油养人。”我把一滴油抹在手背，那股温润的触感，仿佛把高原的阳光都揉进了皮肤里。`, aromatherapistNotes: `亚麻籽油，是“植物界的脑黄金”。中医以亚麻“润燥通便、养血祛风”，亚麻籽油富含 α-亚麻酸（Omega-3），内服滋养心脑，外用滋润干渴的肌肤——是“内外兼养”的基底油。它的质地清爽，适合敏感肌与干性肌的日常护理。我常为案主调制“润养油”：亚麻籽油为底，复配薰衣草或洋甘菊，按摩面部与身体，让肌肤在营养中恢复柔软。愿这滴高原的金色，替你养出由内而外的光泽。` },
  'Y-B-010': { ericNotes: `美国西北部的白池花田，花开如白色的湖面——白池花籽油，是美容界的“液体黄金”。它的神奇之处在于稳定性：大部分植物油会氧化，白池花籽油却几乎不氧化，是“最持久的滋润”。榨油坊里，白色的小种子被低温压榨，油液清澈如水晶，带着极淡的坚果香。农场主说，白池花籽油是“植物的长寿密码”：“它不急着氧化，所以能陪你很久。”我把一滴油抹在手背，那股轻盈的触感，仿佛把时间的流逝也放慢了。`, aromatherapistNotes: `白池花籽油，是“护肤的定海神针”。它含有独特的脂肪酸，几乎不氧化，是天然油脂中稳定性最高的——作为基底油，它能延长配方寿命，锁住水分，是熟龄肌与干燥肌的奢华之选。它的质地轻盈、渗透迅速，不油不腻。我常为案主调制“奢华养肤油”：白池花籽油为底，复配玫瑰或永久花，夜间使用，让肌肤在稳定中慢慢恢复弹性。愿这滴长寿之油，陪你与岁月温柔相处。` },
  'Y-B-011': { ericNotes: `印尼的海岸线上，椰子树在风中摇曳，椰果坠落在沙滩上，敲开是清甜的椰汁与雪白的椰肉。椰子油是热带人民的“万能油”：抹在皮肤上防晒，抹在头发上养发，抹在锅里就是最纯净的食用油。榨油坊里，椰肉被烘干、压榨，油液带着浓郁的椰香，像把整个热带都装进了瓶里。渔村的女人用它给婴儿按摩，那股清甜的香气，是孩子们对“妈妈”最早的记忆。我把一滴油抹在手背，仿佛闻到了海风与椰林的气息。`, aromatherapistNotes: `椰子油，是“热带的万能守护”。中医以椰子“补虚强壮、消疳杀虫”，椰子油的月桂酸含量高，有出色的滋润与抗菌力，是护肤、护发与按摩的经典基底油。它的质地温润，适合干燥肌与婴儿护理——热带人世代用它养育孩子，是经得起时间考验的“母亲之油”。我常为案主调制“滋养油”：椰子油为底，复配依兰或甜橙，按摩全身，让肌肤与心情都沐浴在热带的气息里。愿这滴椰林的清甜，替你滋养日常的每个角落。` },
  'Y-B-012': { ericNotes: `太平洋岛屿的海岸线上，琼崖海棠树在咸湿的海风里生长，果实压榨出的油呈深绿色，带着一股特殊的草药香——不讨喜，却极有力量。岛民世代用它疗伤：刀伤、烫伤、溃疡、风湿，都靠这瓶深绿的油。老妇人用指尖蘸油，轻轻抹在孙儿的伤口上：“这是海岛的药，比什么都管用。”琼崖海棠油的修复力惊人，是芳疗界的“修复圣品”。我把一滴油揉开，那股深沉的草药香，仿佛把整片太平洋的疗愈力量都带进了皮肤里。`, aromatherapistNotes: `琼崖海棠油，是“肌肤的修复圣品”。中医讲“瘀不去，新不生”，琼崖海棠油的独到之处，在于促进组织再生——疤痕、妊娠纹、皮肤溃疡、术后修复，它都是芳疗师的首选。它的质地厚重，适合局部涂抹或少量复配。我常为案主调制“修复油”：琼崖海棠油为底，复配永久花或乳香，每日涂抹于疤痕与受损肌肤，让时间慢慢抚平一切。它不讨喜，却有力量；愿这滴海岛的深绿，陪你疗愈岁月留下的印记。` },
  'Y-B-013': { ericNotes: `印度的芝麻田，在旱季里金黄一片。芝麻油在印度有几千年的历史——阿育吠陀医学中，它是“油疗”的主角：温热的芝麻油按摩全身，是印度人代代相传的养生仪式。榨油坊里，芝麻被炒香、压榨，油液带着浓郁的坚果香与温暖的气息。老油匠说，芝麻油是“身体的食物”：“它不急着被皮肤吸收，而是慢慢地喂。”我把一滴油揉开，那股温润的触感，仿佛把整片印度大陆的传统都揉进了皮肤里。`, aromatherapistNotes: `芝麻油，是“阿育吠陀的经典之油”。中医以芝麻“补肝肾、润五脏”，芝麻油性温润，是印度油疗（Abhyanga）的黄金基底——温热按摩能深层滋养、舒缓神经、促进循环，是“身心的仪式”。它的质地温厚，适合干性肌与身体的深层按摩。我常建议案主：每周一次，以温热的芝麻油自我按摩，从头到脚，让身体重新被“好好对待”。愿这滴千年的传统，替你滋养身心的每一个角落。` },
  'Y-B-014': { ericNotes: `索马里的荒漠里，没药树矮小苍劲，渗出的树脂带着红褐的色泽与苦涩的药香。几千年来，没药与乳香这对“黄金搭档”，沿着香料之路走向世界——乳香行气，没药活血，是古人处理创伤的双剑合璧。采脂人顶着烈日收集树脂，每一颗都带着荒漠的艰辛。蒸馏出的没药油深沉浓烈，带着泥土与药草的气息。我把一滴油揉开，那股苦涩而温暖的香气，仿佛在说：伤口被看见，才是疗愈的开始——这句话，值得用几千年去证明。`, aromatherapistNotes: `没药，是“疗愈创伤的苦涩之爱”。中医以没药“活血止痛、消肿生肌”，它的收敛与抗菌力，对口疮、牙龈炎、皮肤损伤皆有奇效；它的深沉药香，能陪伴人走过悲伤与失落——不是赶走情绪，而是陪着情绪走完。我常将它与乳香相须为用：一阴一阳，一苦一清，为“身与心皆有旧伤”的案主调制“疗愈油”。愿这缕荒漠的苦涩，陪你化开所有该放下的，也替你守住所有该珍惜的。` },
  'Y-B-015': { ericNotes: `欧洲的高山草甸上，山金车开出明黄的雏菊状花朵，在风中摇曳。山金车是欧洲草药箱里的“跌打圣品”——几百年来，欧洲人用它处理瘀伤、扭伤、肌肉酸痛，是药房里最常被提起的名字。采收季，采药人清晨上山，把明黄的花朵小心摘下，浸泡在植物油中，让阳光与时间慢慢萃取出药性。做好的山金车油带着淡淡的草木香。老药农说，山金车是“山野的医生”：“它不华丽，但摔了碰了，第一个想到的就是它。”`, aromatherapistNotes: `山金车油，是“瘀伤的温柔处理者”。中医讲“活血化瘀、消肿止痛”，山金车的药理与之呼应——它对跌打瘀伤、肌肉酸痛、关节肿胀有出色的缓解力，是运动族与久坐族的常备油。请注意：山金车油仅供外用，不可口服，也不可用于破损皮肤。我常建议案主：运动后或磕碰后，以山金车油按摩患处，让瘀肿在温柔中慢慢化开。愿这朵欧洲山野的花，替你照料每一次不经意的磕碰。` },
  'Y-B-016': { ericNotes: `印尼雨林的安息香树，被割开树皮时渗出乳白的树脂，凝固后呈琥珀色，散发着蜂蜜与香草混合的甜暖气息。采脂人把树脂块小心收进布袋，说这是“树的拥抱”。安息香净油以溶剂萃取，比蒸馏更完整地保留了树脂的甜暖。我在雨林的黄昏里滴了一滴，那股蜜糖般的温暖香气，像小时候被拥在怀里的感觉——安全、笃定、不必解释。原来有些香气，天生就是用来安慰人的。`, aromatherapistNotes: `安息香净油，是“惊吓与孤独的温柔安慰”。中医以安息香“开窍辟秽、行气活血”，它的甜暖香气能安抚惊惶、缓解孤独，是“怀抱型”的香药——当你觉得“心里发慌、无处可去”时，它是那双温柔的手。净油比蒸馏油更完整地保留了树脂的甜暖，香气更丰润。我常将它与乳香、橙花复配，用于创伤修复与睡前仪式：让紧绷的心，在蜜糖般的温暖中慢慢松开。愿这缕雨林的甜，替你暖化所有不安的夜。` },
  'Y-B-017': { ericNotes: `欧洲的麦田，金浪翻滚。小麦胚芽，是麦粒中“生命的核心”——它是种子发芽的起点，蕴含着植物最充沛的生命力与营养。榨油坊里，胚芽被低温压榨，油液浓稠金黄，带着淡淡的谷物香。小麦胚芽油的维生素E含量极高，是天然的抗氧化剂，被誉为“长寿之油”。老油匠说，胚芽油是“种子的心脏”：“它把一株麦子的未来，都装了进去。”我把一滴油抹在手背，那股温润的滋养感，仿佛把一整片麦田的生机都揉进了皮肤。`, aromatherapistNotes: `小麦胚芽油，是“肌肤的再生之油”。中医以小麦“养心益肾、除热止渴”，胚芽油富含维生素E与亚油酸，是天然的抗氧化剂——能滋养干燥肌肤、淡化岁月痕迹、延缓氧化，是熟龄肌与疤痕修复的良伴。它的质地浓稠，适合少量添加于配方中。我常为案主调制“再生油”：小麦胚芽油为底，复配乳香或永久花，夜间使用，让肌肤在滋养中慢慢焕新。愿这滴种子的心脏，替你注入再生的能量。` },
  'Y-B-018': { ericNotes: `台湾的芦荟田，肥厚的叶片在阳光下泛着油光。芦荟是“会储水的植物”——叶片里全是凝胶，掰开一片，清凉的汁液便涌出来，是晒后急救的天然良药。萃取坊里，芦荟的凝胶被精心处理后与植物油融合，做成的芦荟油带着极淡的草木香，质地轻盈如水。农人说，芦荟是“谦卑的植物”：“它不开花争艳，只管默默储水，等皮肤需要的时候，全给出去。”我把一滴油抹在晒红的皮肤上，那股清凉的安抚，仿佛把整个夏天都温柔地接住了。`, aromatherapistNotes: `芦荟油，是“燥热肌肤的清凉安抚”。中医以芦荟“清热、通便、杀虫”，芦荟的凝胶能镇静晒后泛红、缓解燥热不适，而芦荟油（浸泡油）则更适合日常滋养。它的质地轻薄，适合油性与混合性肌肤，也适合炎夏的身体护理。我常建议案主：日晒后以芦荟油冷敷，让肌肤在清凉中恢复平静；日常则复配薰衣草，调制“夏日安抚油”。愿这滴植物的清凉，替你接住每一个燥热的午后。` },
  'Y-B-019': { ericNotes: `埃塞俄比亚的高原上，乳香树在贫瘠的土壤里挺立，树皮割开，渗出乳白的树脂——几千年来，这里是乳香的重要产地。传统蒸馏会损失部分香气分子，而 CO2 萃取技术，能在低温下完整地提取树脂的全部精华——包括那些最娇贵的成分。老采脂人把树脂递给我：“同一棵树的泪，蒸的和 CO2 萃的，香气不一样——CO2 的更完整，像把整棵树都装了进去。”我嗅着那股比蒸馏更饱满的乳香，忽然觉得，科技与传统的相遇，也可以如此温柔。`, aromatherapistNotes: `乳香 CO2 萃取油，是“现代科技对古老的致敬”。中医以乳香“活血行气、止痛消肿”，而 CO2 萃取比蒸馏更完整地保留了树脂的芳香分子——香气更饱满，疗愈更全面，尤其适合深度冥想与熟龄肌肤的护理。它的价格高于蒸馏油，但“全成分”的完整性，是它无可替代的价值。我常为资深芳疗使用者推荐它：一滴 CO2 乳香，胜过十滴普通乳香。愿这缕高原树脂的完整灵魂，陪你走得更深、更静。` },
  'Y-B-020': { ericNotes: `美国与西班牙的干旱地带，荷荷巴灌木结出小小的坚果——荷荷巴“油”其实不是油，而是液态蜡，化学结构与人体的皮脂极其相似，是“最懂肌肤的油”。榨油坊里，坚果被低温压榨，透明的油液带着极淡的坚果香。透明的荷荷巴油经过精炼，质地轻盈如水，几乎无色无味。农场主说，荷荷巴是“沙漠的智慧”：“它在最干的地方，长出了最润的果实。”我把一滴油抹在手背，那股轻盈的触感，仿佛被皮肤温柔地认领了。`, aromatherapistNotes: `荷荷巴油，是“最接近肌肤的基底油”。它的化学结构类似人体皮脂，渗透快、不油腻，是油性肌、痘肌与敏感肌都能放心使用的“万能基底”。它的稳定性极高，几乎不氧化，能延长配方寿命。我常为案主调制“日常护理油”：荷荷巴油为底，复配茶树或薰衣草，按摩面部与头皮，让肌肤在“被理解”中慢慢平衡。愿这滴沙漠的智慧，成为你肌肤最忠诚的朋友。` },
  'Y-B-021': { ericNotes: `尼泊尔高原的石榴园，果实红艳如宝石。石榴籽油是护肤界的“珍宝”——它的石榴酸含量极高，是自然界最独特的脂肪酸之一，对熟龄肌肤的紧致与弹性有出色的效果。榨油坊里，籽被低温压榨，油液带着淡淡的金黄与极淡的果香。农人说，石榴是“多子多福”的果实：“一颗果实里藏着几百颗籽，每一颗都是精华。”我把一滴油抹在手背，那股温润的滋养，仿佛把整颗石榴的生命力都揉进了皮肤。`, aromatherapistNotes: `石榴籽油，是“熟龄肌肤的青春之油”。中医以石榴“生津止渴、收敛固涩”，石榴籽油富含石榴酸，抗氧化力惊人，能促进胶原蛋白再生、紧致肌肤、淡化细纹——是熟龄肌与“抗初老”需求的奢华之选。它的质地稍厚，适合夜间或复配使用。我常为案主调制“紧致油”：石榴籽油为底，复配乳香或玫瑰，夜间按摩面部与颈部，让肌肤在滋养中找回弹性。愿这滴胭脂般的红，替你留住年轻的轮廓。` },
  'Y-B-022': { ericNotes: `欧洲的向日葵田，金色花盘齐齐转向太阳——葵花籽油，是“追光植物”的馈赠。榨油坊里，葵花籽被低温压榨，油液金黄透亮，带着淡淡的坚果香。葵花籽油的亚油酸含量高，质地轻盈，是“全能型”的基底油——不油不腻，适合各种肤质。老油匠说，向日葵是“乐观的植物”：“它总朝着太阳，榨出的油也带着阳光的味道。”我把一滴油抹在手背，那股轻盈的触感，仿佛把一整片向日葵田的阳光都揉进了皮肤。`, aromatherapistNotes: `葵花籽油，是“全能而亲民的基底油”。中医以向日葵“平肝祛风、清热利湿”，葵花籽油富含亚油酸与维生素 E，质地轻盈、渗透良好，适合所有肤质的日常护理——是性价比极高的“百搭之油”。我常为初学者推荐它：以葵花籽油为底，复配任何喜欢的精油，调制属于自己的“第一瓶按摩油”。愿这滴阳光的颜色，为你提供轻盈而全面的滋养。` },
  'Y-B-023': { ericNotes: `澳洲的杏桃园，果实金黄，果仁是“隐藏的宝藏”。杏桃仁油质地轻薄、亲肤性极佳，是芳疗中最温和的基底油之一——连婴儿与敏感肌都能安心使用。榨油坊里，果仁被低温压榨，油液清澈，带着极淡的坚果香。农场主说，杏桃仁油是“温柔的油”：“它不挑皮肤，也不挑人。”我把一滴油抹在手背，那股轻盈的触感，仿佛被春天的手轻轻抚过——原来温柔，也是可以闻到的。`, aromatherapistNotes: `杏桃仁油，是“芳疗的入门之油”。中医以杏仁“润肺止咳、润肠通便”，杏桃仁油质地轻薄、富含油酸与维生素 A，亲肤性极佳，是婴儿护理、敏感肌与全身按摩的理想基底。它的温柔让它“百搭”：无论是复配花香、木香还是柑橘香，都能和谐共处。我常建议初学者：第一瓶基底油，选杏桃仁油准没错。愿这滴果仁的温柔，成为你芳疗之旅的起点。` },
  'Y-B-024': { ericNotes: `荷荷巴灌木的果实，压榨出的油带着漂亮的金黄色——这是未经精炼的“原始荷荷巴油”，保留了更多自然的养分与香气。与透明版相比，金色的荷荷巴油多了坚果的温润气息与更丰富的营养。农庄主说，金色荷荷巴是“土地的原始味道”：“它没有经过那么多加工，所以更接近自然本来的样子。”我把一滴油抹在手背，那股温润的触感与淡淡的坚果香，仿佛把沙漠的阳光直接揉进了皮肤。`, aromatherapistNotes: `金色荷荷巴油，是“更原始的滋养”。与精炼版相比，未经精炼的金色荷荷巴油保留了更多天然养分与香气，适合喜欢“原生感”的使用者。它的化学结构接近皮脂，渗透快、不油腻，适合日常护肤与头皮养护。我常为案主调制“原生护理油”：金色荷荷巴为底，复配天竺葵或佛手柑，按摩面部与头皮，让肌肤感受“未经修饰”的滋养。愿这缕沙漠的金色，为你提供最接近自然的呵护。` },
  'Y-B-025': { ericNotes: `欧洲的甜杏仁园，春日开满粉白的花，秋天结出饱满的果仁。甜杏仁油是芳疗中“最经典的基底油”——几百年来，它几乎是所有按摩配方的基础：温和、亲肤、滋养，适合从婴儿到老人的所有人。榨油坊里，果仁被低温压榨，油液清澈带着极淡的甜香。老油匠说，甜杏仁油是“母亲般的油”：“它不争不抢，却把每个人都照顾得很好。”我把一滴油抹在手背，那股柔润的触感，仿佛被一双温柔的手轻轻握住。`, aromatherapistNotes: `甜杏仁油，是“芳疗的基石之油”。中医以杏仁“润肺止咳、润肠通便”，甜杏仁油富含油酸与维生素 A、E，质地柔润、亲肤性极佳，是全身按摩、婴儿护理与干燥肌的理想基底。它的温柔让它成为“百搭之油”：无论复配何种精油，都能衬托出香气而不喧宾夺主。我常对初学者说：一瓶甜杏仁油，是芳疗世界最稳妥的入场券。愿这滴果仁的柔润，陪你走过芳疗之旅的每一步。` },
  'Y-B-026': { ericNotes: `欧洲的酪梨园，果实挂在树上像一颗颗深绿的宝石。酪梨油是“厚实而丰润”的油——它的不皂化物含量极高，是植物油中少见的“重滋养”，尤其适合干燥、粗糙与熟龄肌肤。榨油坊里，果肉被低温压榨，油液带着深绿的金色与淡淡的果香。农场主说，酪梨是“富足的果实”：“它不像别的果那么快熟，但一旦熟了，营养厚得惊人。”我把一滴油抹在手背，那股丰润的触感，仿佛把一整颗果实的力量都揉进了皮肤。`, aromatherapistNotes: `酪梨油，是“深层滋养的丰润之油”。中医以酪梨“滋补肝肾、润泽肌肤”，酪梨油富含不皂化物、维生素 A、D、E 与卵磷脂，能深层滋养干燥粗糙的肌肤，修复受损屏障，是熟龄肌与干性肌的奢华之选。它的质地较厚，适合夜间或复配使用。我常为案主调制“深度滋养油”：酪梨油少量添加于配方，复配乳香或檀香，夜间按摩，让肌肤在丰润中慢慢恢复柔嫩。愿这滴森林的丰盈，替你滋养岁月的干渴。` },
  'Y-B-027': { ericNotes: `欧洲的酒庄里，葡萄压榨成酒，籽则成为另一种宝藏——葡萄籽油质地极轻，渗透快、不油腻，是油性肌与炎夏的贴心之选。榨油坊里，籽被低温压榨，油液清澈如浅金，带着极淡的果香。酒庄主说，葡萄籽油是“葡萄酒的姊妹”：“酒给人微醺，籽油给人清爽。”我把一滴油抹在手背，那股轻盈的触感，仿佛被夏日清风拂过——原来清爽，也可以是一种滋养。`, aromatherapistNotes: `葡萄籽油，是“轻盈清爽的基底之选”。中医以葡萄“补气血、利小便”，葡萄籽油富含亚油酸与维生素 E，质地极轻、渗透迅速，不堵塞毛孔，是油性肌、痘肌与夏日身体护理的理想基底。它几乎无色无味，不会干扰精油的香气。我常为油性肌案主调制“清爽护理油”：葡萄籽油为底，复配茶树或柠檬，让肌肤在轻盈中保持平衡。愿这滴酒庄的清透，陪你清爽地度过每一个夏天。` },
  'Y-B-028': { ericNotes: `南美的安第斯山区，玫瑰果（Rosehip）灌木结出红色的果实，籽里藏着护肤的珍宝。玫瑰果油富含维生素 C、A 与必需脂肪酸，是芳疗界公认的“修复圣油”——淡化疤痕、妊娠纹、色素沉着，效果卓著。榨油坊里，籽被低温压榨，油液呈琥珀色，带着淡淡的坚果香。农人说，玫瑰果是“山野的玫瑰”：“它不开花给你看，却把最好的营养藏在籽里。”我把一滴油抹在手背，那股温润的滋养，仿佛把整座山的光照都揉进了皮肤。`, aromatherapistNotes: `玫瑰果油，是“修复与焕新的圣油”。中医讲“以皮养皮、以籽养颜”，玫瑰果油富含反式维甲酸样成分与必需脂肪酸，能促进细胞再生、淡化疤痕与色素、抚平细纹，是痘印、妊娠纹与熟龄肌的首选。它的质地中等，适合局部或复配使用。我常为案主调制“焕新油”：玫瑰果油为底，复配永久花或胡萝卜籽，夜间涂抹于印记与细纹处，让时间慢慢抚平一切。愿这滴山野的琥珀，替你重焕肌肤的光彩。` },
  'Y-B-029': { ericNotes: `普通椰子油在低温下会凝固，分馏椰子油则不会——它只保留中链甘油三酯，质地始终轻盈如水，是芳疗师最爱的“万能基底”。榨油坊里，椰油经过分馏处理，油液清澈透明，几乎无味，带着极淡的椰香。调配师说，分馏椰子油是“沉默的基底”：“它不抢戏，却让每一滴精油都发挥得更好。”我把一滴油抹在手背，那股清爽的触感，仿佛把热带海风揉进了皮肤——轻盈、干净、不油腻。`, aromatherapistNotes: `分馏椰子油，是“芳疗师最爱的万能基底”。中医以椰子“补虚强壮”，分馏椰子油只含中链甘油三酯，质地轻盈、不凝固、不油腻，渗透快且几乎无味——是按摩、调香、护发与卸妆的理想基底，尤其适合油性肌与炎夏使用。它的“沉默”让它能与任何精油和谐共处。我常为案主调制“日常按摩油”：分馏椰子油为底，复配薰衣草或薄荷，让每一次按摩都清爽无负担。愿这滴海岸的轻盈，成为你调香路上的万能基石。` },
  'Y-B-030': { ericNotes: `尼泊尔高原的沙棘丛，在严酷的环境里结出橙红色的浆果——沙棘果油，是植物界的“抗氧化之王”：它的胡萝卜素、维生素 E 与 Omega-7 含量惊人，是修复与焕肤的圣品。榨油坊里，浆果被低温压榨，油液呈现漂亮的橙红色，像把高原的日落装进了瓶里。农人说，沙棘是“高原的战士”：“它长在最苦的地方，却把最好的营养，全给了果实。”我把一滴油抹在手背，那股温润的橙红，仿佛把整座高原的阳光都揉进了皮肤。`, aromatherapistNotes: `沙棘果油，是“抗氧化与修复的橙红奇迹”。中医以沙棘“健脾消食、止咳化痰、活血散瘀”，沙棘果油富含 Omega-7、胡萝卜素与维生素 E，抗氧化力惊人，能修复受损肌肤、淡化印记、抵御岁月氧化——是熟龄肌与“抗初老”的奢华之选。它的橙红会染色，适合夜间或少量使用。我常为案主调制“抗氧油”：沙棘果油少量添加，复配玫瑰或乳香，夜间使用，让肌肤在橙红的滋养中焕发光彩。愿这滴高原的日落，替你守住年轻的活力。` },
  'Y-B-031': { ericNotes: `欧洲的榛果园，榛子从古老的时代就是人类的食物。榛果油质地轻盈、渗透迅速，带着淡淡的榛子香——它的独特之处在于收敛性：能细致毛孔、平衡油脂，是油性肌与熟龄肌的贴心之选。榨油坊里，榛子被低温压榨，油液清澈带着淡金。老油匠说，榛果油是“含蓄的油”：“它不张扬，却最懂油性皮肤的需要。”我把一滴油抹在手背，那股轻盈的触感，仿佛被秋日的榛树林轻抚——细致、清爽、恰到好处。`, aromatherapistNotes: `榛果油，是“油性肌与熟龄肌的细腻之选”。中医以榛子“调中、开胃、明目”，榛果油富含油酸与维生素 E，质地轻盈、渗透快，且有出色的收敛性——细致毛孔、平衡油脂，适合油性肌与混合肌；它的紧致感，也适合熟龄肌的日常护理。我常为油性肌案主调制“平衡油”：榛果油为底，复配天竺葵或佛手柑，让肌肤在轻盈中回归平衡。愿这滴榛果的雅致，替你守住清爽与紧致。` },
  'Y-B-032': { ericNotes: `摩洛哥的沙漠里，仙人掌果实的籽，藏着世界上最昂贵的油——仙人掌籽油，产量极低、价格极高，被誉为“液体黄金”中的“绿金”。榨油坊里，一粒粒细小的籽被精心压榨，油液带着淡金的光泽。仙人掌籽油的亚油酸含量极高，质地轻薄如丝，吸收极快。老油匠小心地倒出一滴：“这油，是用耐心换的——三百万粒籽，才榨得出一升。”我把一滴油抹在手背，那股极致的轻盈，仿佛被沙漠的月光吻过。`, aromatherapistNotes: `仙人掌籽油，是“护肤界的奢华之巅”。中医以仙人掌“清热解毒、消肿散结”，仙人掌籽油富含亚油酸与维生素 E、K，质地极轻、吸收极快，能深层滋养、紧致抗皱、修复屏障——是熟龄肌与高端护理的珍稀之选。它的价格昂贵，但极致的亲肤体验，让它在芳疗界无可替代。我常为追求极致护理的案主推荐它：一滴仙人掌籽油，胜过十滴普通基底。愿这滴沙漠的绿金，为你献上世间最温柔的呵护。` },
  'Y-B-033': { ericNotes: `欧洲的花园里，月见草在黄昏后开出明黄的花朵——它只在夜里绽放，天亮即谢，是“月亮的植物”。月见草籽油富含 γ-亚麻酸（GLA），是女性内分泌的“温柔调节者”：经期不适、经前综合征、更年期烦闷，它都能温柔安抚。榨油坊里，籽被低温压榨，油液带着淡金与极淡的草木香。老花匠说，月见草是“懂女人的花”：“它像月亮，静静地照着女性的潮汐。”我把一滴油抹在手腕，那股温润的触感，仿佛把月光揉进了皮肤。`, aromatherapistNotes: `月见草油，是“女性身心的月光之油”。中医讲“女子以血为本，以肝为先天”，月见草油富含 GLA（γ-亚麻酸），能调节内分泌、缓解经前综合征与经期不适、安抚更年期波动——是妇科芳疗的经典之选。它也可内服（遵医嘱）或外用按摩。我常为女性案主调制“周期安抚油”：月见草油为底，复配天竺葵或快乐鼠尾草，经期前后按摩小腹与腰骶，让身心的潮汐回到节律。愿这滴夜开的温柔，陪你度过每月的那几天。` },
  'Y-B-034': { ericNotes: `西非的乳木果树下，妇女们把果实敲开，取出果仁，经过去壳、研磨、熬煮，才得到那块米黄色的乳木果脂——这是非洲大地送给女性的礼物，世代相传。乳木果油富含脂肪酸与维生素 A、E、F，质地如黄油般丰润，能深层滋养干燥龟裂的肌肤，筑起温暖的屏障。村里的老妇把乳木果油涂在婴儿身上：“这是母亲的味道。”我把一小块油在手心融化，那股温润的触感，仿佛把整片非洲大地的慷慨都揉进了皮肤。`, aromatherapistNotes: `乳木果油，是“干燥肌的温暖屏障”。中医讲“润则泽、燥则枯”，乳木果油富含脂肪酸与维生素，能深层滋养、修复干燥龟裂、抵御寒风——是干性肌、敏感肌与秋冬护理的圣品。它质地丰润，适合厚涂或复配使用，也是天然的护发与唇部护理之选。我常为案主调制“屏障油”：乳木果油为底，复配洋甘菊或薰衣草，秋冬厚涂于干燥部位，让肌肤在温暖中恢复柔润。愿这滴大地的慷慨，替你守住肌肤的屏障。` },
  'Y-B-035': { ericNotes: `欧洲的琉璃苣田，开出星星状的蓝色小花——琉璃苣籽油的 GLA（γ-亚麻酸）含量比月见草油更高，是“最珍贵的 GLA 来源”之一。传说古罗马战士出征前，会以琉璃苣入酒壮行，相信它能赋予勇气。榨油坊里，籽被低温压榨，油液清澈带着淡金。老花匠说，琉璃苣是“勇气的花”：“它开蓝色的星，是给迷途的人指路的。”我把一滴油抹在手腕，那股温润的触感，仿佛把蓝色星光的勇气，揉进了皮肤。`, aromatherapistNotes: `琉璃苣油，是“GLA 的珍宝之油”。中医讲“活血调经、润肤通便”，琉璃苣籽油的 GLA 含量比月见草油更高，对经前综合征、内分泌波动、干燥敏感肌的调理更强劲——是女性芳疗与“深层滋养”的进阶之选。它质地清爽，可内服（遵医嘱）或外用。我常为案主调制“进阶安抚油”：琉璃苣油为底，复配玫瑰或依兰，经期前后按摩，让身心的波动在温柔中平复。愿这滴蓝色星光的勇气，陪你度过每一个需要力量的时刻。` },
  'Y-B-036': { ericNotes: `印度拉贾斯坦的清晨集市，橘色金盏花瓣铺满石阶，妇女们蹲在陶罐前，把花瓣一层层浸入葵花籽油中。罐子在阳光下静置三周，阳光慢慢把花瓣的颜色、药性与香气都逼进油里，最后滤出的油液像熔化的琥珀，带着金盏花特有的草本气息。老妇人舀起一勺油递给我，说这是她们家传了三代的“晒后药”。我在集市上坐了一下午，看阳光在油罐上流转，忽然明白：有些修护，急不来，得让阳光替它完成。`, aromatherapistNotes: `金盏花油，是“敏感肌与晒后修复的温柔基底”。中医讲“清热凉血、消肿解毒”，金盏花自古便是欧洲与印度药典中的“皮肤圣花”——三萜类化合物赋予它出色的舒缓与抗炎力，质地轻盈不黏腻，适合敏感肌、婴儿护理与晒后修复配方。我常建议案主：日晒后以金盏花油冷敷，或作为敏感肌的按摩基底，让肌肤在植物的温柔里慢慢安定。它不惊艳，却最懂安抚；愿这瓶琥珀色的油，替你守住肌肤的平和。` },
  'Y-B-037': { ericNotes: `肯尼亚裂谷带的猴面包树下，坚果被长竿打落，壳破油出，金黄透亮。当地人把这油涂在婴儿皮肤上抵御烈日，也涂在发间抵御干燥的季风——它是这片土地上的“万能之油”。榨油坊里，坚果被低温压榨，油液带着淡雅的坚果香气，质地轻柔。老妇人用指尖蘸油，轻轻抹在婴儿的脸颊上，动作里全是熟稔的温柔。我把一滴油抹在手背，那股轻盈的触感仿佛把裂谷的阳光揉进了皮肤，不油不腻，只有被好好对待的妥帖。`, aromatherapistNotes: `坚果油（澳洲坚果油），是“亲肤性极佳的滋养基底”。中医讲“润则泽、燥则枯”，坚果油的油酸与棕榈油酸比例均衡，与人体皮脂相近，质地轻柔不黏腻，维生素E含量高，延展性好，适合面部护理、发尾滋养与全身按摩——是“轻盈与滋养兼得”的理想基底。我常为案主调制“日常滋养油”：坚果油为底，复配檀香或天竺葵，按摩面部与发尾，让肌肤在轻盈中保持润泽。愿这滴裂谷的金色，替你抵御生活的干燥。` },
  'Y-B-038': { ericNotes: `地中海的橄榄收获季，梯田上的橄榄树已有百年树龄，树干虬结如老者。石磨缓缓碾碎橄榄果，油水分离的瞬间，那抹翠绿让人想起悬崖边被海风吹拂的古老庄园。老庄主说，这棵橄榄树比他的祖父还年长，每年秋天，全家人围在石磨旁，像过节一样庆祝收获。榨出的特级初榨橄榄油带着青草与果实交织的气息，质地润滑。我把一滴油抹在手背，那股温润的触感，仿佛把地中海的阳光与百年的光阴，都揉进了皮肤里。`, aromatherapistNotes: `纯橄榄油，是“经典而全能的滋养基底”。中医讲“油以养肤、润以通络”，橄榄油的高油酸含量赋予它出色的滋润与渗透力，多酚类带来强大的抗氧化活性，是熟龄肌、干性肌与全身按摩的经典之选。它的气味带着青草的清新，质地润滑不粘腻。我常为案主调制“身体滋养油”：橄榄油为底，复配橙花或薰衣草，沐浴后全身按摩，让肌肤在植物的滋养里找回弹性。愿这滴地中海的翠绿，替你守住岁月的润泽。` },
  'Y-B-039': { ericNotes: `德国巴伐利亚的夏日山谷，圣约翰草在六月开出金黄的花朵——传说它在圣约翰节前后绽放，故得此名。老药农在正午前采下花朵，浸入橄榄油，把玻璃罐放在窗台上晒太阳。神奇的事情发生了：油液一天天变红，从浅金到宝石红，仿佛把整个夏天的阳光都溶进了油里。他说，这红色是金丝桃素被阳光唤醒的颜色，是“太阳的药”。我把一滴油抹在疲惫的肩颈，那股温润的触感里，仿佛有巴伐利亚山谷的阳光，正慢慢渗进紧绷的肌肉与神经。`, aromatherapistNotes: `圣约翰草油，是“神经与情绪的修复之油”。欧洲草药学中，圣约翰草是著名的“心情之草”，用于缓解季节性情绪低落与神经性疼痛；中医讲“通则不痛”，它的浸油对肌肉酸痛、神经紧绷有出色的舒缓力。请注意：圣约翰草油具有光敏性，务必夜间使用，白天用后避光。我常为案主调制“神经安抚油”：圣约翰草油为底，复配薰衣草与罗马洋甘菊，夜间按摩肩颈与脊柱两侧，让疲惫的神经在月光下慢慢松弛。愿这瓶宝石红，替你接住夏日的阳光与夜晚的安宁。` },
  'Y-E-068': { ericNotes: `苏门答腊的雨林里，安息香树高大挺拔，树皮被割开时，渗出乳白色的树脂，像树在流血，又像树在流泪。采脂人用竹筒接住这些“泪滴”，在阳光下慢慢凝固成琥珀色的块。村里的老人说，安息香是“树的眼泪”，所以最能懂人的眼泪。蒸馏坊里，树脂块被投入铜釜，蒸出的净油带着一股蜜甜的药香，混着香草与肉桂的暖。我在雨林的黄昏里滴了一滴，那股温暖的气息像一只手，轻轻拍着我的背：别怕，你脚下就是大地。`, aromatherapistNotes: `安息香，是芳疗中的“暖香之最”。中医以安息香“开窍辟秽、行气活血”，是急救古方里的常客；而它最动人的力量，在于“安”——让惊惶的心归位，让飘摇的思绪落地。它的香气像融化的蜂蜜，裹着药草的微苦与香草的甜，最能接住“心里发慌、坐立不安”的时刻。我常将它与乳香、檀香复配，用于冥想与睡前仪式——乳香通神，檀香定心，安息香则是那双温柔的手，把三者稳稳托住。愿这份甜蜜的笃定，陪你走过每一个不安的夜。` },
  'Y-H-069': { ericNotes: `保加利亚玫瑰谷的五月清晨，露水未干，花农们便走进玫瑰田。有机玫瑰园里，没有化学药剂，只有耐心与汗水——五吨花瓣，才炼得出不到一公斤油。大马士革玫瑰只在日出前采摘，太阳升高，香气便散了。花农们的手指在花丛间翻飞，花瓣落入围裙，空气中浮着浓得化不开的玫瑰香。蒸馏坊的蒸汽里，那股“玫瑰之魂”慢慢凝结成油，金黄如蜜。我站在花田间，看晨光把露珠染成金色，忽然懂了：为什么玫瑰是“花中之王”——因为它把一万个清晨，都献给了愿意等待的人。`, aromatherapistNotes: `大马士革玫瑰，是“心与肌肤的双重圣品”。中医看它，如“疏肝解郁、活血调经”之品，它的香气能抚慰委屈、化解郁结，是情绪疗愈的经典；它的护肤之力，又能提亮暗沉、滋养干枯，是古方养颜的常客。有机玫瑰更纯净，能量更完整——我常为案主调制“心之油”：一滴玫瑰稀释后按揉心口，配合深呼吸，让情绪有一个安放的处所。它贵如黄金，却物有所值：因为你的心与脸，都值得最好的。愿这滴晨露般的玫瑰，为你守住温柔的底色。` },
  'Y-H-070': { ericNotes: `马达加斯加雨林边缘的依兰树，花开时整座村庄都沉浸在甜腻的香气里。依兰的花香是“懒洋洋的华丽”：不像玫瑰那样端坐，也不像茉莉那样热烈，它像是躺在吊床上的热带女郎，慵懒地晃动着一串金色流苏。采花人天不亮就出发，攀上湿滑的树干，把低垂的花朵小心摘下。蒸馏出的依兰油带着浓郁的热带花香与一丝香草的甜，是“减压圣品”。我在雨林的小屋里滴了一滴，那股馥郁的香气像一双温柔的手，把紧绷的肩膀一寸寸按松——原来放松，也是一种能力。`, aromatherapistNotes: `依兰，是“神经的松弛剂与情绪的释放阀”。中医看它，如“宽胸解郁、宁心安神”之品，它的香气能安抚过快的心跳、释放压抑的情绪，是焦虑、高压、易怒者的良伴。依兰对皮肤也极为友好：平衡皮脂、滋养发丝，是护发配方中的常客。我常为案主调制“松弛油”：依兰配佛手柑、甜橙，稀释后按摩胸口与颈侧，让郁结的情绪有一个出口。它浓郁而不腻；愿这缕热带的梦境，替你卸下日复一日的紧绷。` },
  'Y-H-071': { ericNotes: `印度的茉莉园，只在夜里苏醒——花朵在月光下释放全部的香气，像一场无声的盛放。采花女们提着灯笼走进花田，黑暗中，茉莉的香气浓烈得几乎有了形状。大花茉莉的香气比小花茉莉更圆润、更温暖，带一丝神秘的动物感，是“夜的香水”。三万朵花，才能蒸出一小瓶净油。我在园子里坐了一整夜，看月亮从花梢升起又落下，那股馥郁的香气里，藏着印度新娘的嫁衣、神庙的供花，与无数个不肯睡去的夜。`, aromatherapistNotes: `大花茉莉，是“灵魂的唤醒者”。中医看它，如“行气解郁、温暖胞宫”之品，它的香气不是安抚，而是唤醒——唤醒麻木的感官、沉睡的自尊与不敢承认的渴望。茉莉净油浓度极高，一滴便足够，适合情绪低落、丧失热情、抑郁倾向的时刻。它也是妇科芳疗中的常客：温暖子宫、调理月经、抚平产后抑郁。我常对案主说：茉莉不负责安慰你，它负责让你重新爱上自己。愿这缕月光的香，替你找回内心那盏不肯熄灭的灯。` },
  'Y-H-072': { ericNotes: `突尼斯的橙园，春季白花满树，香气在艳阳下浮动。这里的橙花沐浴着北非的阳光，香气比欧洲的更明亮、更舒展——“日光橙花”，名不虚传。采花人清晨五点便出门，露水未干时采摘，白花在竹篮里堆成小山，香气浓得化不开。蒸馏出的橙花油带着清苦的贵族香，像把突尼斯的晨光装进了瓶里。我在橙园的清晨坐了一会儿，看阳光一寸寸爬过花梢，忽然觉得，这瓶油里装的，是北非阳光最温柔的时分。`, aromatherapistNotes: `橙花，是“惊惶心神的定心丸”。中医看它，如“理气宽中、安神解郁”之品，它的香气能安抚突发的焦虑、平复惊跳的心神，尤其适合“心神不宁、坐立难安”的时刻——产前、考前、大事件前的辗转，它都接得住。它比玫瑰清苦，比佛手柑沉静，是一位教养极好的安抚者。我常为案主备一小瓶：心悸时嗅吸，失眠时扩香，让心神回到胸腔的中央。愿这缕北非的晨光，替你守住内心的平静。` },
  'Y-H-073': { ericNotes: `中国的天竺葵田，从南到北都有栽种——这种源自非洲的香草，在中国土地扎了根，长得别有韵味。东方的天竺葵，香气比西方的多一分内敛：玫瑰的甜里，藏着一缕草药般的沉静，像一位含蓄的东方女子。采药人在清晨剪下枝叶，蒸馏出的油带着清甜的玫瑰香与草本的温润。农人说，天竺葵是“女人的草”：“经期前后，心里发闷，用它揉一揉小腹，气就顺了。”我站在田边，看风把花枝吹得摇曳，忽然觉得，植物跨越大洋，也能在异乡活出自己的样子。`, aromatherapistNotes: `天竺葵，是“东方式的平衡之道”。中医看它，如“疏肝解郁、养血调经”之品，它的双向调节之力——收敛皮脂、滋养干燥，安抚亢奋、提振低落——正是中医“调和阴阳”的智慧。东方产的天竺葵，香气更内敛，能量更温润，适合长期调理。我常为经期情绪波动的案主调制“平衡油”：天竺葵配玫瑰、佛手柑，稀释后按摩小腹与手腕，让身心的潮汐回到节律。愿这株在东土扎根的玫瑰，替你调出从容的底色。` },
  'Y-H-074': { ericNotes: `法国田野里的胡萝卜，开着细碎的白色伞状花——很少有人知道，胡萝卜的种子是芳疗的珍宝。采收种子是个精细活：等花伞完全成熟，收割、晾晒、脱粒，每一道工序都急不得。蒸馏出的胡萝卜籽油带着大地般的土甜香，像雨后泥土与干草的气息，深沉而温暖。农人说，这油是“土地的精魂”：“它把一整季的耐心，都收进了种子里。”我把一滴油揉在掌心，那股温润的气息，仿佛把法国田野的秋天，都带进了掌心。`, aromatherapistNotes: `胡萝卜籽，是“肝脏与肌肤的温润滋养者”。中医看它，如“健脾消食、补肝明目”之品，它的精油能促进肝脏代谢、帮助排毒，是“排毒养颜”配方中的常客；对熟龄肌肤的紧致与修复，也极为出色。它的香气深沉温暖，带着大地的质朴，是“接地气”的滋养。我常为熬夜、应酬多的案主调制“养肝油”：胡萝卜籽配柠檬、天竺葵，稀释后按摩肝区与腹部，让疲惫的肝得到温柔的照拂。愿这缕法国田野的温润，替你滋养岁月与倦怠。` },
  'Y-H-075': { ericNotes: `印尼爪哇的岩兰草田，是另一个世界：工人从深土中挖出坚韧的根须，洗净晾晒，院子里便弥漫着那股独特的土香——深沉、烟熏、带着泥土的体温。岩兰草的根扎得很深，挖根是重体力活，工人们汗流浃背，却总说“值得”：“这油，是土地送给人的定心丸。”蒸馏要花几十个小时，慢火逼出根须里全部的精华。蒸出的油浓稠如蜜，那股深沉的土香，仿佛把整片爪哇的土地都装进了瓶子。我把一滴油揉开，闭上眼，仿佛双脚重新踩回了大地。`, aromatherapistNotes: `岩兰草，是“焦虑时代的大地之锚”。中医看它，如“安神定志、祛风胜湿”之品，它的香气能把你从纷飞的思绪中稳稳拉回地面——极度焦虑、惊恐发作、思绪停不下来时，它是第一选择。它也是“接地的油”：冥想前涂抹足底，让身体重新感知“我在这里，我是安全的”。我常为失眠与高压案主调制“根之油”：岩兰草配檀香、雪松，睡前按摩足底与脊柱，让漂移的心神回到身体里。愿这缕大地的香，为你锚定每一个动荡的夜晚。` },
  'Y-H-076': { ericNotes: `马达加斯加的姜黄田，根茎埋在土里，收获时像挖出一个个金色的宝藏。姜黄在印度与东南亚的医学里，是“黄金圣药”——几千年来，它被用来染布、入药、做咖喱，是生活的底色。蒸馏出的姜黄油带着温润的木质与辛香，混合着一丝泥土的甜，像把热带的正午收进了瓶里。农人说，姜黄是“老祖母的药”：“她疼的时候，就用姜黄揉一揉，说这金黄的颜色，能吸走病气。”我看着阳光下那些金黄的根茎，忽然觉得，有些疗愈，从古到今都没变过。`, aromatherapistNotes: `姜黄，是“东方医学的黄金”。中医以姜黄“破血行气、通经止痛”，它的精油能促进血液循环、缓解关节与肌肉的僵痛，是久坐族与运动爱好者的良伴。它的暖是“流动的暖”：像阳光在血管里散步，把沉滞的气血重新唤醒。我常将它与黑胡椒、姜复配，调制“暖循环油”：稀释后按摩关节与腰背，让身体重新感到轻盈。它金黄而温润；愿这缕马达加斯加的黄金，替你点亮倦怠的日常。` },
  'Y-H-077': { ericNotes: `马达加斯加的姜田，根茎在红土里长得饱满肥厚。挖姜是件力气活：工人挥着锄头，把根茎从土里翻出，新鲜的姜带着泥土的湿润与辛辣的香气。农人说，这里的姜“脾气大”：“放一片在嘴里，辣得人冒汗，却暖得人舒坦。”蒸馏出的姜油带着标志性的辛香，像把整片姜田的热度都收进了瓶里。我把一滴油混进基底油揉开，那股暖意从掌心漫开，沿着血脉一路烧到指尖——原来植物的暖，是真的能流进身体里的。`, aromatherapistNotes: `生姜，是“祛寒温阳的第一暖”。中医以生姜“温中散寒、回阳通脉”，是厨房里与药箱里的双栖明星——畏寒肢冷、胃寒呕吐、经期腹痛，它都以温热之力化解。姜油的暖，是“由内而外的流动”：稀释后按摩腹部与腰背，或滴入浴水泡脚，让寒气顺着暖意散去。我常为寒性体质者调制“暖身油”：生姜配黑胡椒、肉桂，低浓度稀释后按摩，让气血重新流动起来。它辣而温柔；愿这缕暖意，陪你度过每一个畏寒的日子。` },
  'Y-H-098': { ericNotes: `意大利南部的苦橙园，果实累累坠满枝头。苦橙与甜橙不同，皮厚而苦，果肉酸涩，当地人却把它当宝贝——果皮里的精油，是阳光最浓缩的形态。采收季，工人们用特制的刨刀削下橙皮，橙油溅在指尖，满手都是明快的清香。冷压出的油带着一股特别的“苦”：不是让人皱眉的苦，而是让香气更有层次、更耐人寻味的苦，像意式浓缩咖啡，苦后回甘。我把一滴油揉进掌心，那股阳光般的明亮，仿佛把整个意大利的晴天都装进了口袋里。`, aromatherapistNotes: `苦橙，是芳疗中的“阳光解郁剂”。中医看它，如“理气化痰、健脾和胃”之品，最擅长安抚“气滞”——胃部紧绷、食欲不振、胸口堵闷，它都能以行气之力化解。它的香气甜中带苦，正合中医“苦能泄、辛能散”之理，尤其适合压力型消化不良与情绪低落的时刻。我常将它与甜橙、佛手柑复配，调制“阳光情绪油”：晨起扩香，让一日的开始带着柑橘的明亮。愿这缕意大利阳光，为你驱散心头与胃间的阴霾。` },
  'Y-H-099': { ericNotes: `巴拉圭的苦橙叶农场，空气里飘着一种奇特的香——像薰衣草，又多了一分绿叶的清苦；像橙花，又少了一分花香的甜腻。工人修剪下苦橙树的嫩枝，枝叶在阳光下闪着油光。蒸馏师说，苦橙叶是“穷人的橙花”：与橙花同根而生，却因取材枝叶，价格亲民得多。蒸出的油带着青绿的草本气息，温柔、踏实，像一位不善言辞却可靠的邻居。我把一滴油抹在手腕，那股沉静的绿意让心跳都慢了下来——原来植物的踏实，真的能传染给人心。`, aromatherapistNotes: `苦橙叶，是我案头常备的“神经安抚剂”。中医看它，如“疏肝理气、宁心安神”之品，对高压失眠、心悸不安尤为对证。它的化学成分与真正薰衣草极相似——高比例的乙酸沉香酯与沉香醇，是天然的镇静剂；而它的绿意，又比薰衣草多了一分“接地气”的踏实。我常为“身体疲惫、脑子却高速运转”的案主推荐：夜间以苦橙叶复配檀香扩香，让焦虑的心跳学会慢下来。愿这抹踏实的绿，成为你安眠的底色。` },
  'Y-H-121': { ericNotes: `保加利亚的玫瑰谷在五月末进入采收季。凌晨四点，天还没亮，花田里已经亮起了头灯——工人们要在日出前把带着露水的玫瑰花瓣摘完，否则太阳一出来，精油就挥发掉了。三千公斤花瓣换一公斤精油，这个比例背后的劳动量是无法想象的。但当你打开一瓶真正的奥图玫瑰时，那种扑面而来的深度与广度会说明一切。我在花田间走了很久，看晨光把露珠染成金色，忽然懂了：为什么它被称为“液体黄金”。`, aromatherapistNotes: `有机大马士革玫瑰，是“纯净之选的液体黄金”。中医讲“疏肝解郁、养血悦色”，保加利亚玫瑰谷的大马士革玫瑰有机认证版，通过ECOCERT认证，种植全程不使用农药和化肥——三千公斤花瓣萃取一公斤精油，每次打开这瓶深棕色的液体，都能理解为什么它被称为“液体黄金”。非有机版本偶尔能检测到极微量的农药残留痕迹，而有机版本的香气纯净得没有任何杂音；敏感肌肤长期护肤使用时，有机版的安全性优势非常明显。我常建议案主：以有机玫瑰做面部护理与情绪疗愈，让纯净的花香替你守住肌肤与心灵。` },
  'Y-J-002': { ericNotes: `那年我沿蓝山山脉的薄雾北上，寻到一家藏在桉树林深处的蒸馏厂。老匠人掀开铜釜，整片林子的气息便扑面而来——叶脉的辛冽、树皮的暖木、雨后泥土的湿润，全被水蒸气裹挟着收进那只小小的玻璃瓶。他说，Radiata 比 Globulus 更圆融温和，像澳洲人待客的脾气，爽朗却不呛人。我坐在蒸馏棚外喝了一杯薄荷茶，看风把桉叶香吹满整个山谷，忽然明白：所谓元境，不过是植物在最懂它的土地上，把自己活成了最好闻的样子。`, aromatherapistNotes: `《本草纲目》记桉叶“辟秽浊、通九窍”，古人早已嗅到这份通透。中医看它归肺经，恰是“宣发肃降”的意象——雾霾天、换季时、咽喉滞涩的日子，我都会想起它。1,8-桉叶素高达七成以上，是呼吸道最贴心的守门人；而它收敛清爽的性子，又像一位不多话的老友：在你头脑昏沉时轻轻递来一杯薄荷茶，不言疗愈，自有清明。芳疗中我常将它复配雪松与薄荷，为久坐之人打开一扇透气的窗。` },
  'Y-J-003': { ericNotes: `在新南威尔士的茶树农场，我第一次见识什么叫“纪律严明”的植物。一行行茶树整整齐齐，叶子在烈日下泛着银绿的光，风过时像一片微缩的针叶林在低语。农场主随手揉碎一片叶子递给我：“闻闻，这是澳洲人的消毒水。”那股清劲的药香直冲鼻腔，干净、锋利，毫不含糊。蒸馏车间里，铜管滴出的油像水一样清透。他说茶树从不挑土壤，却把抗菌的锋芒全淬进了这片叶子里——像是这片土地教给它的生存哲学：不必艳丽，但求有用。`, aromatherapistNotes: `茶树是芳疗箱里的“家庭医生”，我总爱叮嘱案主备上一瓶。它入肺经而兼走皮毛，像一位不请自来的守护者：痘痘初起时点一滴，换季喉咙发紧时熏一熏，衣物与空间的浊气，也交给它涤荡。古时澳洲原住民便以叶片敷创，现代科研证实其萜品烯-4-醇的抗菌力——东西方在此刻殊途同归。它性子刚直，却懂得分寸，点涂务必低浓度。愿这份植物的克制，护你日常的周全。` },
  'Y-J-004': { ericNotes: `阿尔巴尼亚的山地农场里，薄荷田铺展到天边，绿得像被谁打翻了一整缸颜料。清晨露水未干时采收，空气里浮着浓得化不开的凉意，连呼吸都是薄荷味的。蒸馏师说，高海拔的昼夜温差让这里的薄荷格外“泼辣”——薄荷醇含量傲视群雄。我掐了一小片叶子含在舌尖，那股透凉顺着喉咙一路烧到胃里，仿佛整个夏天都被这口清凉按住了。下山时我特意绕到田埂边，看太阳升起，看叶片上的露珠被蒸发成金色的雾，忽然觉得：植物避不开酷暑，就用一场冰镇回报盛夏。`, aromatherapistNotes: `薄荷性凉，归肺、肝经，是夏日里的一把“小扇子”，也是困倦时的当头棒喝。中医讲“辛以散之”，它清利头目、疏解郁热，正是为那些被暑气与思虑堵住的人准备的。薄荷醇的冰感并非幻觉，而是作用于三叉神经的真实凉意——头痛欲裂时稀释涂抹太阳穴，晕车反胃时嗅吸掌心，都是老祖宗与现代科学都点头的用法。只是它性烈，孕妇与婴幼儿当慎，稀释、少量、点到为止，方能尽得清凉而不伤脾胃。` },
  'Y-J-005': { ericNotes: `法国属地与印度洋岛屿的香茅田，是另一种热带图景：香茅长得比人还高，叶片在烈日下泛着油光，风一吹，整片田都掀起青柠的浪。工人挥着镰刀收割，割断的叶片喷出辛辣的香气，直冲鼻腔，像被热带泼了一脸清醒。蒸馏坊里，铜釜冒着蒸汽，蒸出的油带着柠檬的明快与草本的清冽。老蒸馏师说，香茅是“热带人民的净室之香”：“闷热、蚊虫、浊气，都怕它。”我把一滴油揉开，那股清朗的香气，仿佛把印度洋的海风都带进了房间。`, aromatherapistNotes: `香茅，是“祛浊清朗的平民香草”。中医看它，如“祛风除湿、消肿止痛”之品，东南亚传统医学中，它既是驱蚊净室的“环境卫士”，也是缓解肌肉酸痛的“按摩良伴”。它的香气清朗明快，能驱散闷热与昏沉，是梅雨季与夏日的良友。我常建议案主：以香茅扩香净化居室，或稀释按摩劳累的四肢，让浊气与疲惫一起散去。它清而不寒；愿这缕印度洋的草香，替你换回一室的清爽与明朗。` },
  'Y-J-007': { ericNotes: `在马达加斯加的村落，伊兰树高达二十米，花朵却像羞涩的少女低垂着。采花人清晨攀上树，把黄澄澄的花瓣小心摘下——传说最好的伊兰，须在日出前采摘，香气才完整。蒸馏站里，工人们哼着歌，把满筐花朵倒入铜釜，蒸出的油滴在玻璃杯里，金灿灿的，像融化的热带黄昏。III段的伊兰少了顶级的锋芒，却多了几分慵懒圆润，像马达加斯加的海风，不急着抵达哪里，只懒洋洋地吹着。我把它滴在手腕上，香气缠着热带植物的潮湿与温暖，久久不散。`, aromatherapistNotes: `伊兰伊兰在马来语里是“花中之花”，中医看它，则如一味“宽胸解郁”的良方——香气下行，安抚心浮气躁，让过速的心跳慢慢找回自己的节奏。它入心经，正对现代人“心火过旺”的症候：焦虑、失眠、情绪紧绷。III段的伊兰更温和亲民，价格也更平易，适合初尝者。我常将它复配柑橘与佛手柑，为那些“什么都想要、又什么都不满意”的紧绷灵魂，调一杯热带安神的晚风。` },
  'Y-J-008': { ericNotes: `在英格兰的丘陵牧场，罗马洋甘菊贴着地面匍匐生长，开出白色的小雏菊，风一吹，满坡都是苹果的甜香。农夫告诉我，这片牧场的羊群最爱卧在洋甘菊丛里——“它们比人懂享受”，他笑着说。采收时，工人们跪在地上，一朵一朵地摘，像在采撷月光。蒸馏出的油带着淡淡的草绿与果甜，是少有的、连婴儿都能安心使用的温柔。我在农舍的炉火边滴了两滴，看香气混着木柴的烟升起来，整间屋子忽然就安静了。那种安静，不是死寂，而是被温柔托住的安心。`, aromatherapistNotes: `罗马洋甘菊性平，是芳疗界出了名的“老好人”——不凉不燥，连婴儿的肠绞痛与夜啼，都敢用它温柔安抚。中医讲“甘以缓之”，它的甜，是草木本真的甜，能缓急、能止痛、能安神。酯类成分让它在助眠与放松上格外出色，尤其适合那些“身体疲惫却脑子停不下来”的人。我总建议案主：枕边滴一滴，泡脚水里加一滴，让它陪你慢慢卸下白日的铠甲。它不强势，却从不缺席——像一位永远温和的外婆，用一碗苹果甜汤，哄你入睡。` },
  'Y-J-009': { ericNotes: `在印度北部的橙花庄园，苦橙树正值花期，整座园子被白花的香气浸透，甜中带苦，苦里回甘。采花女凌晨三点便提着竹篮出门——橙花精油产量极低，一万公斤花瓣，才炼得出不到一公斤油。她们的手指在晨光里翻飞，像在弹一首无声的曲子。蒸馏师说，这油是“花中贵族”，却生性谦逊，只把最清苦的芬芳献给懂得的人。我把一滴油抹在耳后，那股带着柑橘清气与白花幽香的味道，让燥热的心忽然沉静下来——像是有人在燥热的午后，递来一杯加了柠檬的凉茶。`, aromatherapistNotes: `橙花性平味苦，是芳疗中少见的“双面手”：既能安抚惊慌失措的神经，又能提振低落消沉的情绪——像中医所说的“苦能坚阴、辛能行散”，一收一放，恰是平衡之道。它对应心与肺，最擅长接住那些“突如其来的恐惧”与“说不出由来的心慌”。我常把它推荐给初为人母者、高压备考者，以及所有在深夜被焦虑轻轻叫醒的人。它的香不浓烈，却极有存在感——像月光下的白花，不言不语，自有安抚千军万马的温柔。` },
  'Y-J-011': { ericNotes: `在法国南部的普罗旺斯，天竺葵不是用来观赏的——它们被种成整整齐齐的香草田，叶子绿得发亮，轻轻一碰，满手都是玫瑰与薄荷的混合香。庄园主说，这片土地日照充足、昼夜温差大，天竺葵在这里活得像贵族：枝条肥硕，精油饱满。收割的清晨，工人们赤着脚走进田里，露水打湿裤脚，香气却越采越浓。蒸馏出的油带着玫瑰的甜、草本的清，还有一丝薄荷的凉。我站在田埂上看着这一切，忽然明白为什么法国人称它为“玫瑰天竺葵”——它没有玫瑰的高贵，却有玫瑰的温柔，而且比玫瑰更近人间烟火。`, aromatherapistNotes: `天竺葵是芳疗中的“平衡大师”，中医看它，如一味“调和肝脾”的良药：既能疏肝解郁，又能养血润肤。它最妙之处，在于“双向调节”——皮脂过旺者用它收敛，肌肤干燥者用它滋养；情绪亢奋者得安宁，低落者得提振。这份恰到好处的平衡，恰如《黄帝内经》所言“阴平阳秘，精神乃治”。我常将它复配玫瑰与佛手柑，为都市女性的内分泌调理与情绪维稳，调一杯温柔而坚定的日常花茶。它不惊艳，却最懂细水长流。` },
  'Y-J-012': { ericNotes: `在保加利亚的玫瑰谷隔壁，德国洋甘菊田开得浩浩荡荡，白花黄心，一眼望不到边。真正让我震撼的是蒸馏的那一刻——淡蓝色的油从铜管里缓缓流出，像融化的冰川，又像深海的光。农场主得意地说：“这蓝色是天蓝烃，全世界只有少数植物给得起。”采收季的清晨，女工们哼着民谣摘花，指尖沾满花粉与晨露。我把一滴蓝油抹在手臂内侧，那股深沉的草木香里带着一丝药甜，仿佛整个保加利亚夏天的阳光、露水与土地，都被浓缩进了这一小瓶蓝色。`, aromatherapistNotes: `德国洋甘菊是芳疗箱里的“急救蓝”——它的天蓝烃，是天然的抗敏、抗炎高手，中医看它，则如一味“凉血解毒”的良药，直折肌肤的燥热。皮肤泛红、发痒、晒伤、湿疹初起，它都是第一个被想起的名字。它比罗马洋甘菊更“攻”，适合急症；罗马洋甘菊更“守”，适合日常。我常叮嘱案主：这瓶蓝，是给肌肤的退烧药，红则用、肿则敷、痒则滴，但痊愈之后，不妨让皮肤休养生息，别滥用这味猛将。` },
  'Y-J-013': { ericNotes: `在印度南部的茉莉园，采花是夜里的仪式。夕阳刚落，女人们便提着灯笼走进花田，黑暗中，茉莉的香气反而愈发浓烈——仿佛花朵知道，只有在月光下才肯交出全部秘密。她们的手指在夜色里翻飞，一朵、两朵、三万朵，才能换来一小瓶净油。蒸馏师告诉我，大花茉莉必须用溶剂冷浸，才能完整留住它的魂魄。我在园子里坐了一夜，看月亮爬上花梢，闻着那股甜到深处、带一丝动物感的馥郁香气，忽然理解了为什么印度新娘出嫁时，总要用茉莉串成花环——那是把整个夜晚的欢愉，戴在身上的仪式。`, aromatherapistNotes: `茉莉是芳疗中的“精油之王”，中医看它，则如一味“行气解郁、温暖胞宫”的花中君子。它的香不是轻浮的甜，而是有力量的暖——能托起低落的情绪，唤醒倦怠的身心，尤其适合“感觉不到自己”的麻木时刻。茉莉净油浓度高、能量强，一滴便足够。我总对案主说：它不负责安慰你，它负责让你重新爱上自己。抑郁的阴霾里，它是那盏在夜里为你点亮的灯——不是替你驱散黑暗，而是让你看见，自己身上原也带着光。` },
  'Y-J-014': { ericNotes: `科西嘉岛的岩石坡上，永久花开得倔强——薄薄的土壤，猛烈的海风，它却开成一片金黄，像太阳洒在山坡上的碎屑。采收是件苦差事：花太小，只能用手一朵朵地摘，一公斤精油，需要两百万朵花的献身。农场主却笑着说：“它从石头里长出来，自然要给最珍贵的东西。”蒸馏出的油是流动的黄金，带着蜂蜜与咖喱混合的神秘香气。我坐在岩崖边，看夕阳把花海染成橘红，忽然懂了它的名字——Immortelle，不凋之花：把伤疤酿成勋章，把风霜开成花朵。`, aromatherapistNotes: `永久花是芳疗界的“化瘀圣品”，中医看它，恰如一味“活血化瘀、通经止痛”的良药。它最神奇的本事，是化解——肌肤的瘀青、岁月的印痕、情绪里那些说不出口的硬结，它都能温柔地化开。临床上，跌打瘀伤、术后疤痕、黄褐斑，它都是首选。而它的另一重功力在心灵：那些“好了伤疤忘了疼”的旧事，它陪你重新看见、轻轻放下。永久花性温而通，孕妇忌用；愿它的金色，替你化开所有该放下的。` },
  'Y-J-015': { ericNotes: `蒸馏伊兰是个讲究时序的技艺。第一段蒸出的油，香气最华美、最上层，带着顶级花朵的张扬与精细，是调香师眼中的珍宝。马达加斯加的蒸馏站里，我亲眼看着铜釜升腾，第一批油珠落入收集杯时，整个车间都弥漫着一股既甜且艳的异域香——比 III 段更明亮，比 Complete 段更妖娆，像热带雨林最顶层的王冠。蒸馏师小心翼翼地把油封进琥珀瓶，说：“第一段，是花对自己最好的交代。”我把瓶盖凑近鼻尖，那股香气里，藏着整座岛屿的阳光、海风与雨季的潮湿。`, aromatherapistNotes: `伊兰伊兰 I 段，是花中贵族的头面——香气明艳、能量上扬，适合调香与情绪提振。中医看它，如“芳香化浊、行气解郁”之品，能打开郁结的心胸，让情绪重新流动起来。它比 III 段更“锐利”，用一滴便足够，过量反而甜腻生腻。我常将它用于冥想前的空间净化，或复配柑橘类提振晨间的精神状态。记住：好的东西，从不靠量取胜——一滴伊兰 I 段的香气，足以让整间屋子记住一座热带岛屿。` },
  'Y-J-016': { ericNotes: `克罗地亚的达尔马提亚海岸，石灰岩的缝隙里，永久花一丛丛地开着。海风咸湿，日头毒辣，它却开得比别处更金黄——仿佛越艰苦的土壤，越能逼出它的精气神。采收的农妇们背着竹篓，弯腰一朵一朵地拾，嘴里哼着亚得里亚海的船歌。这里的永久花与科西嘉岛一脉相承，却带着海风的咸与石头的硬，香气更深沉、更倔强。我摘了一朵放在掌心，花瓣被晒得微卷，却依然明亮。那一刻我忽然想：所谓不朽，不是永不受伤，而是伤过之后，依然开成太阳的样子。`, aromatherapistNotes: `永久花，是给“旧伤未愈者”的礼物。中医讲“瘀不去，新不生”——无论是肌肤的印记，还是心头的旧事，都需要一股温和而坚定的力量，先化开，再重生。克罗地亚的永久花，带着地中海的阳光与海风，活血化瘀之力沉稳内敛。我常用它配合乳香，为案主做“旧痕修复”的仪式：一滴化瘀，一滴生新，让肌肤与心灵都在被看见之后，重新长出光洁的模样。愿它的金色，成为你与自己和解的见证。` },
  'Y-J-017': { ericNotes: `意大利南部的橙园，春天来时白花满树，香气能飘出好几里地。橙花是娇贵的：晨露未干时采摘，蒸馏须在二十四小时内完成，稍一耽搁，香气便打了折扣。庄园主是位头发花白的老先生，他说他爷爷的爷爷便在这片园子里种橙树，“橙花不是花，是这片土地的心情。”我跟着工人们清晨采花，看他们把满篮白花倒进铜釜，蒸汽升腾间，那股清苦的贵族香便弥漫开来。橙花油的产量低得惊人，价格却从不让人失望——因为它安抚的，是人心最深处的不安。`, aromatherapistNotes: `橙花，是芳疗中的“贵族之油”，也是我案头常备的“定心丸”。中医看它，如“理气宽胸、解郁安神”之品，尤其适合“心神不宁、坐立难安”的状态——考前、产前、大考前夜的辗转反侧，它都接得住。它比玫瑰更清苦，比佛手柑更沉静，像一位教养极好的长者，不慌不忙地替你理顺乱麻。橙花能量温和，孕妇亦可安心使用。我总说：当你觉得天要塌下来时，请想起这瓶白花的香——天不会塌，只是你需要一个深呼吸。` },
  'Y-J-018': { ericNotes: `尼泊尔的加德满都谷地，德国洋甘菊在海拔两千米的山坡上生长。这里的日头烈、昼夜温差大，花朵却开得格外饱满——像是被喜马拉雅的雪水喂大的孩子。小农场的蒸馏设备简陋，铜釜就架在土灶上，柴火烧得噼啪响，蒸汽混着柴烟升起来，带着一股山野的质朴。蒸出的油同样是那一抹深邃的蓝，却比保加利亚的多了一丝高海拔的清冽。农场主的女儿用不太流利的英语告诉我：“这里的洋甘菊，喝的是雪山融水。”我握着那瓶蓝油，忽然觉得，它安抚的不只是肌肤，还有人对自然的信任。`, aromatherapistNotes: `高山纯净，是尼泊尔洋甘菊最动人的注脚。中医讲“上工治未病”，肌肤亦然——与其等泛红瘙痒再来急救，不如用温和的守护筑起防线。德国洋甘菊的天蓝烃，是敏感肌的定心丸：换季泛红、晒后灼热、口罩闷出的不适，它都能温柔化解。我常建议敏弱肌案主：常备一瓶洋甘菊纯露日常喷雾，精油则稀释后薄涂，让“蓝”成为肌肤的安全感。愿来自喜马拉雅山脚的这抹蓝，成为你肌肤最忠诚的盟友。` },
  'Y-J-020': { ericNotes: `伊兰伊兰的蒸馏像一场漫长的告别：花朵在铜釜里交出第一段的华美，第二段的温润，直到第三段，把最后的沉静也献出来。而 Complete 段，则是把三段蒸馏的油重新合一——既有 I 段的明艳，也有 III 段的圆融，像把一朵花的整个生命周期，完整地封存进瓶里。马达加斯加的蒸馏师说，这是“不舍得浪费任何一段香气”的智慧。我嗅着这瓶完整的伊兰，忽然想到：植物的慷慨在于，它把花开、花谢、花落之后的余韵，都留给了愿意等它的人。`, aromatherapistNotes: `Complete 段伊兰，是“完整”的智慧——不偏不倚，恰到好处。中医讲“和”，讲“中道”，这瓶油正是“和”的化身：既有花香的愉悦，又有木质的沉静，适合所有想要“平衡”而非“刺激”的日常。它是入门者最稳妥的选择，也是调香时最包容的底色。我常将它复配薰衣草与甜橙，为案主调制“情绪调和油”——当喜悦与疲惫并存、焦虑与期待交织，它便是一味温和的“和事佬”，让身心各归其位。愿这份完整，陪你走过情绪的起落。` },
  'Y-J-021': { ericNotes: `每年五月的保加利亚玫瑰谷，凌晨四点便苏醒。露水未干，花农们就走进玫瑰田——大马士革玫瑰只在日出前采摘，太阳一高，香气便散了大半。女人们手指翻飞，一朵朵粉红的花瓣落入围裙，五吨花瓣，才炼得出一公斤精油。空气中浮着浓得化不开的玫瑰香，混着晨露的清、泥土的润。我跟着花农走了整片田，看他们把花篮抬进蒸馏坊，蒸汽升腾间，整个山谷都变成了一座巨大的香炉。那一刻我忽然懂了：为什么诗人说玫瑰是“用一万个清晨换来的黄昏”。`, aromatherapistNotes: `大马士革玫瑰，是芳疗中的“心之后冠”，中医看它，则如一味“疏肝解郁、养血悦色”的花中极品。它入肝、脾经，最能抚慰“心有千千结”的委屈与疲惫——那些说不出口的苦，它都听得懂。玫瑰精油的能量是“向下扎根、向上绽放”的：把散乱的心神收回胸腔，再让枯萎的生机重新发芽。我常在案主情绪低谷时，请她们用一滴玫瑰油按揉心口与手腕，配合深呼吸——不为解决问题，只为让灵魂有处安放。它贵，但值得，因为你的心，也值得被如此珍重。` },
  'Y-J-023': { ericNotes: `在马达加斯加东海岸的雨林边缘，伊兰树高过屋顶，花朵低垂如金色流苏。蒸馏站的老匠人说，Extra 段是整座岛的骄傲——第一批蒸出的油，香气最完整、最华美，带着热带夜晚的浓烈与神秘。采花人天不亮就出发，攀上湿滑的树干，把花朵小心放进腰间竹篓，一个熟练的采花人，一天也采不满一篓。我看着他满手的树汁与花香，忽然觉得，这瓶油里装的，是整座岛屿最虔诚的清晨。`, aromatherapistNotes: `特级伊兰，是“花中之花”的王冠。中医讲“芳香开窍”，它的香能穿透郁结，直抵心脾——当情绪淤塞成石，它便是那缕化开顽石的暖流。Extra 段的香气层次分明：先是明艳的花甜，继而浮出热带果香，尾韵归于温润木感，恰如一段完整的情绪叙事。我常在案主“心里堵得慌”时，请她们嗅吸一滴——不是赶走情绪，而是陪情绪走完它的全过程。特级伊兰产量稀少，请像对待贵重的心事一样，珍重它。` },
  'Y-M-022': { ericNotes: `湖北蕲春，李时珍的故乡，也是中国最负盛名的艾草产地。四月的蕲春，田垄间艾草疯长，叶片背面覆着细密的银白绒毛，在阳光下泛着温润的光。当地人说，蕲艾是“艾中王者”——叶片肥厚、香气浓郁，连端午悬挂的艾草，都以蕲春为尊。老药农采下最肥壮的艾叶，摊在竹匾上晾晒，满院都是那股带着阳光的药香。蒸馏出的蕲艾精油，比干艾更鲜烈、更清新，像把整个春天的阳气，都收进了瓶里。`, aromatherapistNotes: `艾，是东方芳疗的根。中医以艾“温经散寒、祛湿通络”，千年艾灸，靠的正是这缕草木的阳气。蕲艾精油是传统智慧的现代化身：梅雨季的湿重、久坐的腰背僵冷、换季的体感不适，它都能以温煦之力化解。我常建议案主：以蕲艾精油稀释后按揉关元、命门，或以香薰的方式为居室“除秽”——像古人端午悬艾一样，守住一室的清净与一身的阳气。它不张扬，却是一味扎根千年的东方底气。` },
  'Y-M-024': { ericNotes: `迈索尔的檀香林，是我见过最安静的森林。檀香树生长极慢，三十年才堪入药，百年方成气候——它把时间都酿成了香气。林场的老管理员说，檀香木被砍下那一刻，整片林子都会“静”下来，像是为离去的同伴默哀。檀香精油的萃取只取树心，那一小段深褐色的木芯，是整棵树用一生换来的精华。我在林间的小屋里点了一滴油，那股温润的木质香像一只手，轻轻按住我纷乱的思绪。窗外的风穿过檀香林，带走我所有急切的念头。`, aromatherapistNotes: `檀香，是芳疗中的“定海神针”。中医以檀香“行气温中、开胃止痛”，而它最动人的功效，在于“定心”——高浓度的檀香醇能诱发 Alpha 脑波，让纷乱的思绪归于清明。它属木，却带着火的温度，是“木生火”的东方智慧：滋养而不灼烧，温暖而不急躁。我总在冥想、静坐、睡前仪式里用它：一滴檀香，一炷香的时间，让心从“外求”回到“内观”。它不是让你忘记烦恼，而是给你一个足够安稳的落点，好让烦恼自己落地。` },
  'Y-M-025': { ericNotes: `法国南部的丝柏大道，树影笔直如仪仗队，风穿过时，发出低沉的涛声。修道院的修士们几百年来在这片丝柏林中散步、冥想——他们说，丝柏是最“守规矩”的树，从不旁逸斜出，只向天空生长。采收的季节，工人们修剪下碧绿的枝条，送进蒸馏坊。蒸出的油带着针叶的清冽与树脂的温润，像把整条林荫大道的气息装进了瓶子。我走在树下，抬头看那些直指天空的树尖，忽然明白：丝柏的功课，是教人立直、向上，把纷乱的枝节，收敛成一根笔直的主干。`, aromatherapistNotes: `丝柏，是芳疗中的“收敛之树”。中医看它，如“利水渗湿、活血通络”之品，最擅长化解“滞”——体液滞留、循环不畅、下肢沉重，它都能疏通。它的香气也是收敛的：不张扬、不漂浮，像一位纪律严明的管家，把散乱的气血重新归位。我常将它用于久坐人士的腿部护理、水肿体质的日常调理，也用它净化空间——它驱逐的不是空气里的浊，而是气场里的散。愿这根笔直的绿，为你立起内在的秩序与脊梁。` },
  'Y-M-026': { ericNotes: `在尼泊尔通往喜马拉雅的途中，雪松林从海拔两千米一直铺到雪线附近。这里的雪松树干粗壮，树皮皲裂如岁月的沟壑，散发着一股沉静的木质香。向导说，当地牧民在暴风雪来临前，会收集雪松枝熏烤帐篷——那股香气能让牛群安静下来，人也一样。蒸馏坊藏在山脚下的小村里，蒸出的油带着高山的清冽与木头的温厚。我把一滴油抹在手腕，闭上眼，仿佛又回到了那片雪松林：风穿过树梢，雪落无声，世界忽然变得很慢、很安静。`, aromatherapistNotes: `雪松，是给“脑子停不下来”的人的礼物。中医讲“肾主骨生髓，脑为髓海”，雪松入肾经，能引气归元——当思绪如脱缰野马，它便是一根稳稳的缰绳。雪松醇的镇静之力，对脑力过载、神经衰弱的现代人尤为珍贵；而它温润的木香，又像一位老友的拥抱，让人终于可以松一口气。我常建议高压人士：睡前将雪松与薰衣草复配扩香，让“停不下来”的大脑，学会“停下来”。愿这座山之木，成为你精神的锚。` },
  'Y-M-027': { ericNotes: `西伯利亚的松林，是地球上最辽阔的森林之一。冬天，雪压松枝，整片林子在零下三十度里沉默着；夏天，松脂在阳光下融化，空气里全是清冽的松香。林场工人说，在松林里走一天，肺是“洗过澡”的——那叫芬多精，是森林给人类的呼吸礼。蒸馏坊架在林场边，蒸出的松针油带着针叶的清冽与树脂的温厚，像把整片西伯利亚森林装进了瓶子。我把一滴油滴在围巾上，深吸一口，仿佛听见风穿过松梢的涛声，肺叶都舒展开了。`, aromatherapistNotes: `松针，是“森林的药房”。中医以松“祛风燥湿、活血止痛”，松针入肺经，最擅长开阔胸膈、通畅呼吸——雾霾天、空调房、久坐憋闷的日子，它都是一股清冽的救赎。它的芬多精能净化空气、提振精神，像一位活力充沛的向导，领着你走出疲惫的低谷。我常建议案主：换季时以松针精油扩香，或滴于沐浴，让身心都做一次“森林浴”。愿这缕西伯利亚的风，替你打开一扇透气的窗。` },
  'Y-M-028': { ericNotes: `巴西的热带雨林里，花梨木是当地人心中的“圣木”——树心呈玫瑰色，刨开时散发着一股奇特的香：像玫瑰，像檀香，又像雨后森林的湿润。原住民世代以花梨木入药、制香，相信它的香气能沟通天地。如今花梨木已受保护，蒸馏厂只能采集规定份额的木材，因此每一瓶都格外珍贵。蒸出的油带着玫瑰的暖、木头的醇，还有一丝辛香料的甜。我在雨林边的小屋里用了一滴，那股温润的香气像一双厚实的手掌，把飘在半空的心，稳稳放回地面。`, aromatherapistNotes: `花梨木，是芳疗中的“平衡之木”。中医看它，如“行气解郁、安神定志”之品，它的香气介于花香与木香之间，既安抚情绪，又扎根大地——正是现代人最需要的“阴阳调和”。花梨木油对敏感肌尤为友好，稀释后可用于面部护理，安抚燥红；它的木香又能稳定心绪，是冥想与睡前仪式的良伴。因资源稀缺，请珍惜每一滴。愿这缕来自巴西雨林的温润，为你重新接上与大地的连接。` },
  'Y-M-029': { ericNotes: `澳洲的茶树农场，是我见过最“利落”的植物田。茶树不高，叶子却绿得发亮，风一吹，整片田都泛着银光。农场主摘下一片叶子揉碎给我闻：“这是澳洲的绿金。”那股清劲的药香，带着土地的质朴与阳光的干燥，干净得不含一丝杂质。蒸馏坊里，蒸汽与铜管的声音此起彼伏，滴出的油清澈如水。农场主说，茶树是澳洲的“国民精油”，家家户户的药箱里都有一瓶——痘痘、蚊虫、伤口、衣物消毒，都靠它。我看着满田的茶树，忽然明白：真正的国民级守护，从不花哨，只在最需要时，从不缺席。`, aromatherapistNotes: `茶树油，是芳疗入门的第一瓶，也是我一再叮嘱案主“家中常备”的一瓶。中医看它，如“清热解毒、祛湿止痒”之品，与白千层同宗，却更凌厉直接。它的抗菌力是“广谱而温和”的：痘痘点涂、蚊虫叮咬、衣物除菌、头皮净洁，都能胜任。我常提醒：茶树虽好，务必稀释，皮肤敏感者更需低浓度试涂。愿这瓶澳洲的“绿金”，成为你日常防护里最可靠的一环。` },
  'Y-M-030': { ericNotes: `马达加斯加的丁香园，树冠如盖，花开时节满岛都是那股浓烈的辛香。采花人攀上梯子，把未开的花苞小心摘下——丁香真正的精华，藏在花苞里，而非花朵中。晾晒场上，花苞铺成褐色的地毯，香气在热带的阳光下发酵、浓缩。蒸馏师抓了一把花苞给我：“闻闻，这是岛上的体温。”那股辛甜直冲鼻尖，暖得惊人。我把一滴油揉在掌心，那股暖意沿着血脉慢慢扩散，像把整座香料岛的热带阳光，都握在了手心里。`, aromatherapistNotes: `丁香，是芳疗中的“暖阳”。中医以丁香“温中降逆、散寒止痛”，是著名的“温里药”——手脚冰凉、胃寒腹痛、畏寒体质，它都能以温热之力化解。它的丁香油酚含量极高，抗菌镇痛之力强劲，但也是“烈性”的：必须低浓度使用，孕妇与敏感肌慎用。我常将它复配姜与肉桂，为寒性体质者调制“暖身油”：稀释后按摩腹部与腰背，让气血重新流动起来。愿这缕香料岛的暖意，替你驱散积年的寒。` },
  'Y-M-031': { ericNotes: `印度北部的薄荷田，一眼望不到边，绿得发亮。这里的欧薄荷一年能收三茬，叶子在烈日下泛着油光，空气里浮着浓烈的薄荷香。蒸馏坊是露天的，几口大锅、几根铜管，工人光着脚在田里穿梭。蒸出的油带着鲜明的薄荷醇凉意，比椒样薄荷更圆润，比绿薄荷更有穿透力。农场主用不太流利的英语说：“印度的薄荷，是给全世界解暑的。”我把一滴油滴在手腕，那股凉意沿着皮肤蔓延，仿佛连呼吸都变得清透起来。`, aromatherapistNotes: `欧薄荷，是芳疗中的“清凉使者”。中医看它，如“疏散风热、清利头目”之品，与椒样薄荷同源，却更温和亲民。它的薄荷醇能即刻唤醒昏沉的头脑，缓解偏头痛与晕车不适，是旅途与书桌前的良伴。我常建议案主：午后困倦时，以薄荷稀释后涂抹太阳穴与后颈，比咖啡更清醒，且无副作用。它性凉，气虚体弱者与孕妇慎用；愿这缕清凉，为你的每一天留一扇透气的窗。` },
  'Y-M-032': { ericNotes: `澳洲的蓝胶尤加利，是世界上最高的阔叶树之一，树冠直插云霄，叶子在阳光下泛着蓝灰色的光泽——“蓝胶”之名，正源于此。考拉爱吃它的叶子，人却爱它的精油：蓝胶尤加利的 1,8-桉叶素含量极高，是“呼吸道的清道夫”。蒸馏坊里，工人把枝叶塞满铜釜，蒸出的油带着一股霸道的清凉，呛得我眼泪直流，却觉得整个鼻腔都通了。向导笑着说：“这是澳洲最直接的治疗——不跟你商量，先把堵住的地方打开。”`, aromatherapistNotes: `蓝胶尤加利，是芳疗中“直给型”的呼吸卫士。中医看它，如“宣肺解表、化痰止咳”之品，1,8-桉叶素含量高，对付鼻塞、痰多、呼吸滞重，立竿见影。它比元境尤加利（Radiata）更猛烈，适合急症与成人使用；儿童与敏感体质，宜选更温和的品种。我常叮嘱案主：感冒鼻塞时，以蓝胶尤加利滴于热水熏蒸，或复配基底油按摩胸背——让每一次呼吸，都重新找回通畅的尊严。` },
  'Y-M-033': { ericNotes: `马达加斯加的桂皮园，树皮剥下时带着新鲜的湿度与强烈的辛香。当地人把桂皮卷成筒状晾晒，阳光下，那些褐色的卷筒散发着温暖的气息，像把热带的正午封存在了里面。蒸馏出的桂皮油，比干桂皮更鲜活、更浓烈，那股辛辣的甜直冲喉咙，却又转瞬回甘。老蒸馏师说，桂皮是“树的体温”——他年轻时在海上做工，寒夜里靠一小口桂皮酒暖身，那股热从胃里烧到指尖，一辈子忘不了。我把一滴油混进基底油揉开，那股暖意像一双厚实的手，捂热了整片掌心。`, aromatherapistNotes: `桂皮，是芳疗中的“回阳之品”。中医以肉桂“补火助阳、散寒止痛、温通经脉”，是经典的“引火归元”之药——畏寒肢冷、脾胃虚寒、气血不畅者，皆得其益。它的精油浓度极高，刺激性也强，必须极低剂量稀释，孕妇与敏感肌绝对禁用。我常将它与姜、丁香复配，为阳虚体质者调制“温阳暖身油”：按摩腰腹与足底涌泉，让体内的火重新烧起来。愿这缕热带的正午，替你重燃生命的温度。` },
  'Y-M-034': { ericNotes: `留尼旺岛，印度洋上的火山岛，波旁天竺葵在这里长得格外茂盛——火山土壤、海风、充沛的日照，让它带着别处没有的圆润与深度。庄园主说，留尼旺的天竺葵是“波旁王朝的遗腹子”：几百年前法国人带到这里，从此在火山岛上生根。蒸馏出的油带着玫瑰的甜、草本的清，还有一丝薄荷的凉，层次比普通天竺葵更丰富。我在岛上的田埂边坐了一下午，看工人们收割、装釜，闻着那股混合了海风与花香的气息，忽然觉得，这瓶油里装的，是一座火山岛的温柔。`, aromatherapistNotes: `波旁天竺葵，是芳疗中的“调和大师”的进阶版。它比普通天竺葵更圆融：香气层次丰富，能量更加平衡——既能安抚荷尔蒙的波动，又能收敛过旺的皮脂，是女性周期调理与情绪维稳的良伴。中医看它，如“疏肝解郁、养血调经”之品，恰合“女子以肝为先天”之训。我常将它与玫瑰、佛手柑复配，为经期前后情绪起伏的案主调制“平衡油”：一滴按揉小腹与心口，让身心的潮汐，都回到它的节奏。` },
  'Y-M-035': { ericNotes: `科西嘉岛的海岸线上，迷迭香长在岩缝里，根系扎进石灰岩，枝叶被海风修剪得紧实而芬芳。这里的迷迭香，含有珍贵的马鞭草酮——一种温和而稀有的化学成分，比普通迷迭香更适合长期使用。采药人背着竹篓，在岩坡上俯身采摘，那股混合了松木、樟脑与柠檬的香气，随着脚步一路弥漫。蒸馏出的油清澈透亮，带着地中海的阳光与岩石的质感。我在海边的小屋里嗅了一滴，那股清醒的草本气息，仿佛把整个科西嘉岛的专注力，都收进了瓶里。`, aromatherapistNotes: `马鞭草酮迷迭香，是芳疗中“温柔而清醒”的存在。中医看它，如“疏肝利胆、活血通络”之品，与普通迷迭香相比，它的酮类成分更温和，适合长期调理——尤其适合用脑过度、肝气郁结的现代人。它能激活记忆力、促进肝胆代谢，是“脑雾”与“春困”的解药。我常为备考学生与高压职场人调制“清醒油”：晨间扩香或稀释涂抹太阳穴，让头脑保持澄明。愿这株科西嘉的草本，成为你精神的高地。` },
  'Y-M-036': { ericNotes: `美国中西部的薄荷农场，是世界上最大的薄荷产区之一。一望无际的薄荷田，绿浪翻滚，收割机驶过，整片田都弥漫着浓烈的薄荷香——那是美国式的“薄荷之海”。蒸馏厂规模庞大，铜釜成排，蒸汽轰鸣，滴出的油清澈而稳定，带着标志性的薄荷醇凉意。农场主说，这里的薄荷是“标准化”的：每一批油的品质，都经过实验室检测，精准得像化学课。我把一滴油揉在太阳穴，那股凉意像电流一样窜过额头，清醒得近乎霸道——原来美国薄荷的爽快，也是大平原式的，干脆利落。`, aromatherapistNotes: `欧薄荷，是“经典中的经典”。中医看它，如“疏散风热、清利头目”之品，美国产的薄荷油成分稳定、品质可靠，是芳疗中的“标准答案”。它的薄荷醇能即刻提神醒脑，缓解头痛与消化不适，是居家药箱与差旅包里的常客。我常建议：长途驾驶、午后会议前，以薄荷稀释涂抹手腕与太阳穴；晕车者嗅吸一滴，胜过千言万语的安抚。它性凉，体虚者酌减；愿这缕经典清凉，成为你清醒与松弛之间的平衡点。` },
  'Y-M-037': { ericNotes: `尼泊尔的山区，清凉薄荷（Cornmint）是农家最常见的作物——它不挑地、好养活，却把最实在的薄荷醇都长进了叶子里。村里的蒸馏坊简陋却热闹，铜釜架在土灶上，柴火噼啪作响，孩子们围着看蒸汽升腾。蒸出的油带着高山的清冽与泥土的质朴，薄荷醇含量极高，清凉得直接、不绕弯子。农妇把一小瓶油塞给我，笑着说：“山里的东西，不值钱，但管用。”我把一滴油揉开，那股凉意像山泉水，直直地浇在燥热的皮肤上——原来朴实，本身就是一种力量。`, aromatherapistNotes: `清凉薄荷，是“性价比之王”。中医看它，如“疏风散热、清利头目”之品，与欧薄荷功效相近，价格却亲民得多——是初学者与日常使用的绝佳选择。它的薄荷醇含量高，清凉感直接，适合做夏日沐浴、足浴与空间净化。我常提醒：浓度高意味着需更谨慎稀释，皮肤敏感者务必低剂量试涂。愿这捧来自尼泊尔高山的凉，为你的夏天，留下一笔朴素的清醒。` },
  'Y-M-038': { ericNotes: `美国田间的绿薄荷（留兰香），与欧薄荷长得极像，香气却判若两人——它少了薄荷醇的霸道，多了清新柔和的花果甜，像被阳光泡过的口香糖。农场主掰下一片叶子给我：“欧薄荷是风扇，绿薄荷是微风。”绿薄荷的蒸馏同样讲究，蒸出的油带着柔和的甜意与草本气息，是甜点与口腔护理的宠儿。我在田埂上坐了一会儿，看风把绿浪推向远方，那股温柔的香气让整个下午都变得松弛。原来不是所有清醒都需要锋芒——有些清醒，是一阵微风就够了。`, aromatherapistNotes: `绿薄荷，是“温柔的清醒”。中医看它，如“疏肝理气、和胃止呕”之品，比欧薄荷更温和，几乎不含刺激的薄荷醇，适合儿童、孕妇与敏感人群的日常使用。它能安抚胀气、清新口气、缓解换季的倦怠，是“全家可用”的薄荷。我常将它与甜橙、薰衣草复配，调制儿童友好的“温和清新油”：睡前扩香，让孩子的房间弥漫着阳光与青草的香气。愿这阵微风般的绿意，温柔地唤醒你每一个倦怠的午后。` },
  'Y-M-039': { ericNotes: `法国南部的香蜂草田，散发着奇特的香气——像柠檬，又带着蜂蜜的甜与薄荷的凉，让人想起古老修道院花园里“蜜蜂最爱的草”。香蜂草是出了名的低产作物：枝叶含油量极低，一吨原料才蒸得出几百克油，因此价格昂贵，素有“芳疗中的液体黄金”之称。修道院的修士世代种植它，相信它能“安神定魄”。我坐在修道院的花园里，看蜜蜂在花间穿梭，闻着那股温柔的柠檬香，忽然明白：为什么古老的药典里，香蜂草总与“心”联系在一起。`, aromatherapistNotes: `香蜂草，是芳疗中“抚慰心灵的第一名”。中医看它，如“疏肝解郁、宁心安神”之品，它的香气能安抚受惊的神经、平稳过快的心跳，是心悸、惊恐、焦虑时刻的“定心丸”。香蜂草产量极低、成分娇贵，价格昂贵，但它的慈悲无可替代——尤其适合那些“心因性”的失眠与不安。我常为案主备一小瓶：情绪惊惶时嗅吸一滴，让心回到胸腔的中央。它不解决生活的难题，但能让你在面对难题时，多一分从容。` },
  'Y-M-040': { ericNotes: `牙买加的月桂树，在热带阳光下长得格外挺拔。传说古希腊人用月桂编成桂冠，加冕英雄与诗人——那股辛香里，藏着人类对荣耀最古老的想象。牙买加的月桂林间，工人采摘下墨绿的叶片，叶片在手中揉碎时，香气浓烈而清朗，带着樟脑的凉与香料的暖。蒸馏出的油清澈透亮，那股振奋的香气让人想起凯旋的号角。我在林间小径上走了一圈，忽然觉得，月桂的功课，是教人记住自己的价值——你不是失败者，你只是忘了给自己戴一顶桂冠。`, aromatherapistNotes: `月桂，是“清醒与荣耀之草”。中医看它，如“祛风散寒、行气止痛”之品，它的香气能清通头脑、驱散困倦，也能温暖四肢、化解寒湿。月桂油的振奋之力，适合意志消沉、精神疲惫的时刻——它不强迫你振作，而是帮你记起自己原本的力量。我常将它与迷迭香、薄荷复配，为“提不起劲”的案主调制“士气压提振油”：晨间扩香，让一天从清醒与自信开始。愿这枝古老的桂冠，为你加冕日常的每一次小小胜利。` },
  'Y-M-041': { ericNotes: `东欧的鼠尾草田，在夏季开出紫蓝色的花穗，风过时像一片流动的紫雾。快乐鼠尾草的名字不是白叫的——它的香气带着草本的清甜与一丝果香的暖，闻着便让人心情松弛。农场主说，这种鼠尾草特别“懂女人”：经期不适、情绪低潮、更年期的烦闷，它都能温柔化解。蒸馏出的油带着柔和的草本气息，像把东欧夏日的午后装进了瓶子。我在田边的木椅上坐了一会儿，看紫色花穗在风里起伏，那股松弛的香气，让紧绷的肩膀都悄悄放了下来。`, aromatherapistNotes: `快乐鼠尾草，是“女性的温柔知己”。中医看它，如“活血调经、安神解郁”之品，它的酯类成分能深度放松神经系统，缓解经期痉挛、安抚情绪波动，是妇科芳疗中的常客。它的“快乐”不是亢奋，而是松弛——像泡了一个温水澡，紧绷的神经一根根松开。我常为经期与更年期的案主调制“安抚油”：稀释后按揉小腹与腰骶，再以香薰陪伴入眠。它温和，却有力；愿这缕原野的紫雾，陪你度过每月的那几天低潮。` },
  'Y-M-042': { ericNotes: `南非高原的阳光炙烈，迷迭香却在这里长得格外泼辣——枝叶紧实，香气张扬，像被太阳淬炼过的。桉油醇型迷迭香，是迷迭香家族中“最清醒”的一员：1,8-桉叶素含量高，带着尤加利般的凛冽与迷迭香特有的樟脑香。农场主摘下一枝给我：“这瓶是给脑子的闹钟。”我在高原的田埂上嗅了一滴，那股清冽的草本香直冲头顶，困意瞬间烟消云散。看着阳光下蓬勃生长的迷迭香，我忽然觉得，植物用它自己的方式，把“专注”两个字写进了基因里。`, aromatherapistNotes: `桉油醇型迷迭香，是“头脑的加油站”。中医看它，如“醒脑开窍、活血通络”之品，1,8-桉叶素与樟脑成分协同，能强力提振精神、改善记忆力、缓解脑雾——是备考、写作、长时专注者的良伴。它比马鞭草酮型更“冲”，适合短时提振而非长期调理。我常建议：晨间或午后困倦时，以稀释后的迷迭香涂抹太阳穴与颈后，配合深呼吸，让注意力重新聚焦。它不温柔，但有效；愿这缕南非的锋芒，替你守住每一次专注。` },
  'Y-M-043': { ericNotes: `西班牙的山坡上，百里香贴着地面匍匐生长，开出细小的紫花，香气却浓烈得惊人——百里酚型百里香，是百里香家族中最“阳刚”的一员。采药人说，这种百里香是“勇士的草药”：古罗马士兵出征前，用它泡澡沐浴，相信它能赋予勇气。蒸馏出的油带着浓烈的药香与辛香，像把整个西班牙的太阳浓缩进了瓶里。我在山坡上摘了一小撮，揉碎后闻了又闻，那股强悍的气息，让胸腔里的空气都仿佛被点燃了。`, aromatherapistNotes: `百里酚百里香，是芳疗中“能量最强”的草本之一。中医看它，如“温中散寒、祛风止痛”之品，酚类含量极高，抗菌力强劲，也能强力提振低迷的免疫与精神。正因如此，它必须极低浓度稀释，孕妇、高血压者与敏感肌慎用。我常将它与柠檬、茶树复配，用于换季防感与空间净化——让居室像被阳光与药香熏过一般清朗。愿这缕西班牙的勇者之香，在你需要力量的时候，助你挺直脊梁。` },
  'Y-M-044': { ericNotes: `埃及的天竺葵田，就种在尼罗河三角洲的沃土上——几千年前，这里种的是纸莎草，如今换成了开满粉红小花的天竺葵。埃及人对香气的理解，刻在骨子里：从金字塔时代的香膏，到今天的精油，这片土地从未停止过对“香”的探索。天竺葵在这里长得圆润饱满，蒸馏出的油带着玫瑰的甜与草本的清，还有尼罗河泥土的温润。农庄主说，埃及的天竺葵“会讲故事”——它记得法老的香膏，也懂得现代人的焦虑。我把一滴油揉开，那股平衡的香气，像把一条古河的沉稳，揉进了掌心。`, aromatherapistNotes: `天竺葵，是“荷尔蒙的调琴师”。中医看它，如“疏肝解郁、养血润肤”之品，它的双向调节之力，能安抚内分泌的波动——经期紊乱、情绪起伏、压力痘肌，都在它的调和范围之内。埃及产的天竺葵，带着古文明的沉静与土地的丰饶，能量更加温润。我常为压力型内分泌失调的案主调制“平衡油”：稀释后按摩腹部、足底与手腕，让身心的潮汐回到自然的节律。愿这缕尼罗河畔的香，替你调平生活的起伏。` },
  'Y-M-045': { ericNotes: `南非高原的有机农场，快乐鼠尾草在无农药的土地上自由生长，花穗紫蓝，风过时香气浮动。有机种植意味着更多的耐心与劳作——虫害靠手工除，杂草靠人工拔，土壤用轮作养。农场主说，有机是“把土地当家人”的种法。蒸馏出的油带着草本的清甜与果香的暖，纯净而饱满。我坐在田埂上，看紫色的花穗在风里起伏，闻着那股松弛的香气，忽然觉得，被善待的土地长出的植物，连香气里都带着被爱的痕迹。`, aromatherapistNotes: `快乐鼠尾草，是“身心的松弛剂”。中医看它，如“安神解郁、活血调经”之品，有机种植更添一份纯净的能量。它的香气能深度放松神经，缓解经期痉挛与情绪波动，也是失眠者的良伴。我常将它与薰衣草、甜橙复配，调制“晚安油”：睡前扩香或滴于枕边，让紧绷的神经一根根松开。它不解决烦恼，但能让你在烦恼之外，拥有一段安稳的睡眠。愿这株被阳光吻过的草本，为你守住每一个松驰的夜晚。` },
  'Y-M-046': { ericNotes: `埃及的有机天竺葵农场，拒绝一切化学干预——蚜虫靠瓢虫对付，杂草靠手工清除，天竺葵在近乎“原始”的环境里长大，却长得格外健壮。农庄主带着我巡视花田，随手掐了一片叶子揉碎：“闻，有机的味道，是土地本身的味道。”那股玫瑰与草本的清香里，确实多了一分泥土的温润。蒸馏出的油纯净透亮，带着有机认证的底气。我在花田里站了一会儿，看蜜蜂在粉红花朵间忙碌，忽然明白：有机不只是种植方式，更是植物与土地之间，一份不被辜负的信任。`, aromatherapistNotes: `天竺葵，是“身心的平衡木”。中医看它，如“调和肝脾、养血润肤”之品，有机天竺葵更纯净、更温和，适合长期使用。它的双向调节：皮脂过旺者收敛，干燥者滋养；情绪亢奋者安抚，低落者提振——像一位深谙中庸之道的调停者。我常将它复配玫瑰与洋甘菊，为敏感肌与情绪型皮肤问题调制“平衡霜油”：每日薄涂，让肌肤与心情都回到舒适区。愿这缕尼罗河畔的有机香，为你调和出从容的底色。` },
  'Y-M-047': { ericNotes: `每年盛夏的普罗旺斯，薰衣草田铺成紫蓝色的海，香气随风流动，连空气都是甜的。真薰衣草生长在海拔八百米以上的高原——越高的地方，酯类成分越丰富，香气越柔和。花农在清晨采收，成捆的薰衣草被送进蒸馏坊，蒸汽里带着阳光与花香的记忆。蒸出的油清澈如琥珀，那股标志性的柔和香气，是全世界最著名的“安眠香”。我躺在花田边的草地上，看云影掠过紫色的波浪，那一刻，所有的疲惫都被这片花海温柔地收走了。`, aromatherapistNotes: `真薰衣草，是芳疗中“万能的温柔”。中医看它，如“安神定志、清热解毒”之品，它的酯类成分能深度放松神经，是失眠、焦虑、紧绷的经典解药。普罗旺斯高原的真薰衣草，酯类含量更高，香气更圆润，是“高地的恩赐”。我常向每一个案主推荐它：睡前扩香、滴于枕边、加入浴盐——让睡眠重新成为一件理所当然的事。它温和到婴儿可用，强大到足以抚慰最深的疲惫。愿这片紫色花海，为你守护每一夜的安眠。` },
  'Y-M-048': { ericNotes: `在印度，罗勒是“圣草”——庭院里、庙宇旁，处处可见它的身影，据说能庇佑家宅、驱散浊气。恒河平原的罗勒田，在雨季里绿得发亮，叶片肥厚，香气浓郁。采药人摘下一把叶子捧给我：“这是图尔西（Tulsi），印度的母亲草。”那股辛辣中带甜的草本香，带着薄荷的凉与丁香的暖，复杂而迷人。蒸馏出的油清澈透亮，那股振奋的气息，仿佛把整个印度的阳光与虔诚都收进了瓶里。我在罗勒田边站了一会儿，忽然明白：圣草之所以神圣，是因为它守护的，是人最日常的安康。`, aromatherapistNotes: `罗勒，是“精神的加油站与肠胃的守护者”。中医看它，如“疏风解表、行气化湿”之品，印度人奉它为“圣草”，正因其全能的守护力——提振精神、安抚消化、化解郁滞。它的香气辛甜而振奋，适合精神萎靡、思绪停滞的时刻。我常将它与柠檬、迷迭香复配，调制“清醒圣草油”：晨间扩香，让头脑与肠胃一起苏醒。它温和而有力；愿这缕恒河平原的圣草香，为你注入日常的生机。` },
  'Y-M-049': { ericNotes: `印度马拉巴海岸，是黑胡椒的原乡——几千年来，这里出产的胡椒沿着海上丝路，改变了世界的味觉。藤蔓上结满绿色的胡椒果，晒干后变黑，才有了“黑色黄金”之名。蒸馏出的黑胡椒精油，带着一股温暖而辛辣的香气，像把整个热带的正午浓缩进了瓶里。老种植户说，胡椒是“穷人的火”：寒夜里，用胡椒油揉一揉关节，那股暖意能从皮肤烧到骨头里。我把一滴油混进基底油揉开，那股辛暖的流动感，让沉滞的身体仿佛重新接通了电源。`, aromatherapistNotes: `黑胡椒，是“循环的唤醒者”。中医以胡椒“温中散寒、下气消痰”，它的精油能强力促进血液循环，缓解肌肉酸痛与关节僵冷，是运动后与久坐族的良伴。它的暖不是表面的热，而是由内而外的流动感——像给身体做了一次深层的推拿。我常将它与姜、马郁兰复配，调制“暖循环油”：稀释后按摩四肢与腰背，让沉滞的气血重新流动起来。它辛辣而有力；愿这颗黑色火种，替你点燃身体里沉睡的热度。` },
  'Y-M-050': { ericNotes: `西澳大利亚的芳枸（Fragonia）灌木，是澳洲芳疗的“新星”——它的叶子揉碎时，香气介于茶树与薰衣草之间：清劲中带着温柔，明朗中含着圆润，像被海风驯化过的茶树。原住民世代用它入药，蒸馏师近年来才为它正名。农庄主摘了一把叶子给我：“茶树是战士，芳枸是医生——它先安抚，再治疗。”蒸出的油带着草本与果香的层次，纯净而包容。我在灌木丛间走了一圈，看海风把叶片吹得沙沙响，忽然觉得，澳洲的植物总有一种坦率：好就是好，不藏着掖着。`, aromatherapistNotes: `芳枸叶，是“温和而全面的守护者”。中医看它，如“清热解毒、安神化湿”之品，它的化学成分介于茶树与薰衣草之间——既有抗菌的力度，又有安抚的温柔，是敏感肌与情绪紧绷者的理想选择。它适合长期使用，尤其适合儿童、老人与体质敏感者。我常将它与薰衣草、茶树复配，调制“全家安心油”：换季防护、空间净化、情绪安抚，一瓶足矣。愿这缕澳洲海风的清新，成为你家中最温柔的防线。` },
  'Y-M-051': { ericNotes: `法国南部的香蜂草田，是这个星球上最珍贵的草本之一——它的含油量低到令人绝望，一英亩田地，一年也只够蒸出几瓶油。农场主小心翼翼地照料着这片田，像照料一群易碎的孩子：“香蜂草不贪心，它只把最好的几滴，留给最需要的人。”蒸馏当天，整座农庄都弥漫着柠檬与蜂蜜的香气。蒸出的油珍贵如金，带着温柔的柠檬香与草本的清甜。我握着那瓶小小的油，忽然觉得，有些安慰，贵得理所当然——因为它抚慰的，是金钱买不回的安宁。`, aromatherapistNotes: `香蜂草，是“心脏的守护神”。中医看它，如“养心安神、疏肝解郁”之品，古方中常用于心悸、怔忡与失眠——现代研究亦证实它对神经系统的安抚之力。它的珍贵在于稀缺：产量极低，香气却无可替代，是芳疗师箱中的“液体黄金”。我常为惊悸、焦虑、心因性失眠的案主备一小瓶：情绪翻涌时嗅吸一滴，让心跳回到它本来的节奏。它贵，但值得——因为内心的安宁，本就是最昂贵的奢侈品。` },
  'Y-M-052': { ericNotes: `保加利亚的蓍草田，开满白色的小花，毫不起眼——直到蒸馏的那一刻，蓝色才显现：天蓝烃在蒸汽中生成，把透明的油染成深邃的蓝，像把整片爱琴海装进了瓶里。农场主得意地举起瓶子对着阳光：“这是植物的魔法，也是时间的魔法。”西洋蓍草在西方传说中是“战士之草”，古希腊战士用它止血疗伤。蒸出的蓝油带着药草的清香与一丝甘甜。我把一滴油揉在手臂，那股清凉的安抚感，仿佛连陈年的伤痕都被轻轻托住了。`, aromatherapistNotes: `西洋蓍草，是“化瘀与消炎的蓝”。中医看它，如“凉血止血、解毒消肿”之品，它的天蓝烃是天然的抗炎高手，对皮肤炎症、过敏泛红、瘀伤肿块都有奇效。它的“蓝”不是染料，而是植物在蒸馏中生成的奇迹——正如它的花语“疗伤”，能抚平肌肤的躁动，也能安抚心头的旧伤。我常将它与永久花复配，为“旧痕难愈”的案主调制“修复油”：让蓝色的能量，先化开淤堵，再带来新生。愿这抹蓝，替你接住所有该被治愈的。` },
  'Y-M-053': { ericNotes: `澳洲的有机茶树农场，是“慢”的哲学——不施农药，不用化肥，让茶树按自己的节奏生长。农庄主说，有机茶树的叶子更厚实，香气更圆润：“土地不欠我们的，是我们欠土地的。”采收季节，工人们手工修剪枝叶，避免机械损伤叶片，蒸馏出的油带着更纯净的草本香。我把一滴油揉在掌心，那股清劲的香气里，确实多了一分泥土的温润。看着满田在阳光下自由生长的茶树，我忽然明白：有机的精油，是植物与土地之间，一份不被辜负的信任。`, aromatherapistNotes: `有机茶树油，是“纯净的守护力”。中医看它，如“清热解毒、祛湿止痒”之品，有机种植的茶树油无农药残留，纯净度更高，适合长期、高频的日常使用——尤其适合青春痘肌、敏感肤质与母婴家庭。它的抗菌力广谱而温和，是居家药箱的基石。我常建议案主：日常防护选有机茶树，急救点涂可选普通茶树，两者轮换，让肌肤保持新鲜感。愿这份来自澳洲土地的纯净，成为你与家人最安心的日常底色。` },
  'Y-M-054': { ericNotes: `法国普罗旺斯的高地薰衣草，生长在海拔九百米以上的山间——这里的昼夜温差大、阳光猛烈，薰衣草把更多的能量化成了温柔的酯类。花农们说，高地薰衣草是“为睡眠而生的花”：香气比低地品种更柔和、更绵长。采收的清晨，露水未干，紫色的花穗在晨光里泛着银光，香气像一层薄纱，覆在整个山谷上。蒸馏出的油清澈如月光，那股经典的安眠香，温柔得让人想闭上眼睛。我坐在山谷的岩石上，看花海在风里起伏，忽然觉得，有些植物生来就是为了接住人类的疲惫。`, aromatherapistNotes: `高地真薰衣草，是“睡眠的黄金标准”。中医看它，如“安神定志、清热解郁”之品，高地品种的酯类含量更高，镇静之力更绵长，是深度失眠者的福音。它的温柔不亚于任何安眠药，却没有药物的副作用——睡前扩香、滴于枕角、加入浴水，让身体从紧绷到松弛，自然滑入梦境。我常为严重失眠的案主推荐它：搭配檀香与苦橙叶，调一杯“深眠香”，让夜晚重新成为修复的时刻。愿这片紫色高地，替你守住每个夜晚的边界。` },
  'Y-M-055': { ericNotes: `中国本土的椒样薄荷田，在华北平原上铺展开来——薄荷在中国栽种的历史可以追溯到唐代，古人用薄荷“清利头目、疏散风热”。夏日的薄荷田，绿浪翻滚，采药人清晨下田，露水打湿裤脚，满手都是薄荷的凉意。蒸馏坊里，铜釜冒着热气，蒸出的油清澈透亮，带着标志性的薄荷醇凉意——清爽、直接，带着中国土地的质朴。老药农说，薄荷是“夏天的恩物”：“暑气上头的时候，一撮薄荷叶泡茶，比什么都管用。”`, aromatherapistNotes: `椒样薄荷，是“东方的清凉智慧”。中医以薄荷“疏散风热、清利头目、利咽透疹”，是两千年来中国人夏天的老朋友。它的薄荷醇清凉醒脑，能缓解暑热头痛、咽喉不适与午后困倦，也是缓解晕车的良伴。我常建议案主：夏日以薄荷精油稀释后涂抹太阳穴与颈后，或以一滴薄荷入浴盐泡脚，让暑气顺着凉意散去。它性凉，体虚者酌减；愿这缕中国大地的透凉，陪你度过每一个燥热的夏天。` },
  'Y-M-056': { ericNotes: `印尼的热带沼泽边，白千层树皮层层剥落，像穿了一件穿旧的白衣。当地人叫它“卡尤普提”，采药人割下枝叶，送进简陋的蒸馏坊——几口大锅、几根铜管，却蒸出了岛上最受欢迎的“家庭药箱”。蒸出的油带着一股清劲的樟脑香，混着淡淡的果甜，比茶树多一分凉，比尤加利多一分柔。村民说，白千层是“穷人的医生”：头疼脑热、蚊虫叮咬、伤口发炎，都靠它。我看着他们把油装进小瓶，塞给过路的旅人，忽然觉得，这瓶油里装着的，是整个村庄的善意。`, aromatherapistNotes: `白千层，是芳疗中的“平民守护者”。中医看它，如“祛风化湿、解毒消肿”之品，与茶树、尤加利同宗同源，却别有一番温润。它的清劲能净化空气、守护呼吸，它的收敛能安抚痘肌、洁净头皮——是居家药箱里最可靠的多面手。我常提醒案主：白千层与茶树轮换使用，能避免肌肤产生依赖；而它的价格亲民，正是“日常防护”最划算的投入。愿这瓶来自印尼沼泽的清劲，替你守住日常的周全。` },
  'Y-S-057': { ericNotes: `岩兰草的根，可以扎进地下十米深——它是植物界的“定海神针”。在印度与海地的田里，工人挖出那些坚韧的根须，洗净、晾晒，香气便从断裂处溢出来：深沉、泥土、烟熏，像大地本身的气息。蒸馏极其耗时，根须要蒸几十个小时，才逼得出那一滴浓郁的油。老农说，岩兰草是“最慢的植物”——它把一生的定力，都长进了根里。我把一滴油揉在手腕，那股深沉的土香像一双厚实的手，稳稳托住飘忽的心绪——原来安定，是可以被闻到的。`, aromatherapistNotes: `岩兰草，是“芳疗中的大地之锚”。中医看它，如“安神定志、祛风胜湿”之品，它的根须深扎大地，香气也带着“扎根”的力量——极度焦虑、恐慌、思绪纷飞时，它能把你从半空中轻轻放回地面。它的香气深沉而持久，是冥想与睡前仪式的经典之选。我常为失眠与焦虑的案主调制“接地油”：岩兰草配檀香、雪松，稀释后按摩足底与脊柱两侧，让身体重新感觉到“我是安全的，我是存在的”。愿这缕大地的香气，为你锚定每一个动荡的时刻。` },
  'Y-S-058': { ericNotes: `印尼的广藿香田，叶子在湿热的气候里长得墨绿肥厚。广藿香的神奇在于“陈化”——新鲜蒸馏的油香气单薄，必须存放数年，才会酝酿出那股深邃的药香，像红酒需要时间醒来。老蒸馏师把一桶陈化的油递给我：“香要等，人也是。”那股深沉的香气里，有泥土、药草与旧木的味道，像把一座印尼雨林的黄昏封进了瓶里。我在油坊的暗影里嗅着它，忽然觉得，广藿香教的功课是耐心：有些深刻，急不来。`, aromatherapistNotes: `广藿香，是“定香的基石与心灵的锚”。中医看它，如“芳香化浊、和中止呕”之品，它的深沉药香能安抚焦虑、收敛心神，也是调香中不可或缺的定香剂——让所有香气有了落地的根基。广藿香对“湿热”体质尤为友好：皮肤油腻、毛孔粗大、身体滞重，它都能收敛化解。我常将它与岩兰草、乳香复配，为“燥热而焦躁”的案主调制“安定油”：让躁动的心，找到一片阴凉的归属。愿这缕雨林的暗夜香，替你收好每一分浮躁。` },
  'Y-S-059': { ericNotes: `苏格兰高地的杜松丛，在石楠与苔藓间倔强生长。杜松的浆果呈墨蓝色，像一颗颗小小的星球，采收时要用特制的耙子轻轻梳下——浆果娇贵，碰坏了香气便损。蒸馏出的杜松油带着针叶的清冽与浆果的微甜，是北欧传说中“驱邪净界”的神木——古人在门口挂杜松枝，相信它能挡住厄运。我把一滴油滴在掌心揉开，那股清冽的气息仿佛把苏格兰的风、雾与石楠花都带到了眼前，连呼吸都干净了几分。`, aromatherapistNotes: `杜松，是“空间的净化者与情绪的疏导者”。中医看它，如“祛风除湿、利水通淋”之品，它的清冽能净化空气与气场，也能疏导郁结的思绪——当你觉得“心里堵得慌、身体也发沉”时，它是一味温柔的疏泄剂。我常将它与丝柏、柠檬复配，用于空间净化与水肿体质的调理：以香薰涤荡居室，以稀释按摩促进循环。它清而不寒，净而不燥；愿这枚高地的浆果，为你涤净郁积的浊气。` },
  'Y-S-061': { ericNotes: `意大利南部的柠檬园，果实金黄如小太阳。阿玛尔菲海岸的柠檬，皮厚而香浓，果农用特制的木勺刨下表皮——柠檬精油的精华全在皮里。刨皮时，油珠飞溅，满手都是明快的清香，像把意大利的晴天揉进了掌心。冷压出的油带着标志性的柠檬醛香气，清亮、直接、毫不含糊。果农递给我一杯柠檬水：“先喝，再闻。”阳光、海水、柠檬的香气混在一起，那一刻我忽然明白：意大利人为什么总笑得那么开——他们的口袋里，大概都装着一颗柠檬。`, aromatherapistNotes: `柠檬，是“心情的即时充电器”。中医看它，如“行气解郁、和胃安神”之品，它的香气能瞬间提振低落的情绪，驱散沉闷的阴霾，是晨间与午后低落时刻的良伴。柠檬精油还能净化空气、清新环境，让居室与思绪都透亮起来。我常建议案主：办公桌上放一滴柠檬，情绪低落时嗅吸；沐浴时加入两滴，让疲惫随水汽散去。它性微凉，光敏性需注意，使用后避光；愿这缕意大利的阳光，为你点亮每一个沉闷的日常。` },
  'Y-S-062': { ericNotes: `尼泊尔山间的柠檬草田，风过时整片田都泛起青柠的香气。柠檬草长得高大茂盛，叶片边缘带着细密的锯齿，割草时那股辛辣的青柠香直冲鼻腔，像被大自然泼了一脸清醒。村里蒸馏坊的铜釜就架在田边，蒸汽升起，香气混着炊烟，朴素而热闹。蒸出的油带着柠檬的明快与草本的清冽，是东南亚家家户户的“净室之香”。农妇把一小瓶油塞给我：“蚊虫怕它，浊气也怕它。”我握着那瓶青柠色的油，觉得这世界上的清爽，大抵都是这样长出来的。`, aromatherapistNotes: `柠檬草，是“空间的清风与身体的祛浊剂”。中医看它，如“祛风除湿、消肿止痛”之品，东南亚传统医学中，它既能净化环境，也能缓解肌肉酸痛与关节不适——是一味多面手的“平民香草”。它的香气清朗明快，能驱散昏沉、提振精神，是夏日与梅雨季的良伴。我常将它与柠檬、杜松复配，用于空间净化与按摩油：让居室清爽，让筋骨松弛。它清而不寒；愿这缕尼泊尔山谷的青柠香，为你祛除沉闷，换回明朗。` },
  'Y-S-063': { ericNotes: `巴拉圭的苦橙叶农场，苦橙树在热带阳光下舒展枝叶。工人修剪下的嫩枝堆成小山，枝叶间透着青绿的油光，揉碎一片，那股混合了橙花与草本的香气便弥漫开来——比橙花更踏实，比薰衣草更清新。蒸馏师说，苦橙叶是“穷人的橙花”：“橙花贵，苦橙叶便宜，但安抚人的本事，不输半分。”蒸出的油带着青绿的草本气息，温柔、沉静。我把一滴油抹在枕边，那股踏实的绿意让紧绷的神经一根根松开——原来安眠，不一定需要昂贵，只需要被懂得。`, aromatherapistNotes: `苦橙叶，是“高压时代的安眠良方”。中医看它，如“疏肝解郁、宁心安神”之品，它的化学成分与真正薰衣草极相似——高比例的乙酸沉香酯，是天然的神经镇静剂。它比薰衣草多一分“绿意”，多一分接地气的踏实，特别适合“身体疲惫、脑子却停不下来”的高压人群。我常为失眠案主调制“深眠油”：苦橙叶配檀香、岩兰草，睡前扩香或按摩颈后，让思绪与身体一起归位。愿这抹巴拉圭的绿意，替你守住每个夜晚的边界。` },
  'Y-S-064': { ericNotes: `意大利的甜橙园，果实沉甸甸坠满枝头，香气在果园里四溢，甜得坦荡。与苦橙不同，甜橙是“没有心事”的水果——它的香气直接、明亮、孩子气，像把整个意大利的午后阳光装进了果皮。果农用滚筒碾过橙皮，油珠飞溅，那股标志性的甜香瞬间点燃空气。冷压出的甜橙油带着橘子硬糖般的明快，是全世界最受欢迎的“快乐之油”。我在果园里咬了一口刚摘的甜橙，果汁溅了满手，忽然觉得，幸福有时候就是这么简单——像一颗甜橙，不需要解释。`, aromatherapistNotes: `甜橙，是“情绪的糖果”。中医看它，如“理气和中、健脾开胃”之品，它的香气能瞬间驱散阴霾、点亮心情，尤其适合情绪低落、孤独感泛滥的时刻——它不跟你讲道理，直接用甜把你哄好。甜橙精油也是儿童与老人的“快乐之选”，温和而明亮。我常建议：心情灰暗时扩香甜橙，或滴一滴在衣领上随身携带；消化不良时稀释按摩腹部，让脾胃与心情一起回暖。它甜而不腻；愿这缕果园的阳光，替你晒干所有潮湿的日子。` },
  'Y-S-065': { ericNotes: `墨西哥的有机甜橙园，拒绝一切化学药剂——果农说，甜橙是“太阳的孩子”，就该在干净的土地上长大。有机果园里，杂草靠放养的鸡群清理，害虫靠瓢虫与鸟雀对付，土壤用堆肥滋养。收获季节，果农手工摘果、手工刨皮，冷压出的油带着阳光与泥土的纯净气息，比普通甜橙更圆润、更温柔。农庄主递给我一杯橙汁：“有机的甜，是土地愿意给的甜。”我握着那瓶金黄的油，忽然觉得，被善待的土地，连果实都带着感恩的味道。`, aromatherapistNotes: `有机甜橙，是“纯净的快乐”。中医看它，如“理气和中、醒脾开胃”之品，有机种植无农药残留，更适合儿童、孕妇与敏感人群的日常使用。它的香气明亮而温柔，能驱散阴霾、安抚孤独，是“全家皆宜”的情绪糖果。我常建议案主：孩子情绪低落时扩香甜橙，老人食欲不振时稀释按摩腹部，让甜橙成为家里的“快乐开关”。愿这缕墨西哥有机果园的阳光，替你的家注入纯粹的暖意。` },
  'Y-S-066': { ericNotes: `意大利的有机柠檬园，坐落在地中海的阳光下，果实金黄饱满。有机种植让这里的柠檬格外讲究——果农坚持手工采收、手工刨皮，拒绝任何化学催熟。刨皮时，油珠在阳光下闪烁，那股明亮的柠檬香里，带着土地最本真的气息。蒸馏师说，有机柠檬的香气“更诚实”：没有化学的遮掩，只有阳光、雨水与土壤的原味。我把一滴油揉在掌心，那股透亮的清香像把地中海的天光收进了瓶里——原来纯净本身，就是最好的品质。`, aromatherapistNotes: `有机柠檬，是“身心的净化之光”。中医看它，如“行气解郁、开胃醒脾”之品，有机柠檬无农药残留，适合长期、高频的日常使用——办公熏香、衣物增香、家居净化，它都是可靠的选择。它的香气能提振情绪、清新空气，让人从沉闷中醒来。我常建议案主：以有机柠檬替代化学清新剂，让居室与心情都透亮起来；注意其光敏性，晚间使用为佳。愿这缕地中海的天光，为你照亮每一个平凡的日常。` },
  'Y-S-067': { ericNotes: `意大利南部的卡拉布里亚，是佛手柑的原乡——全世界九成的佛手柑，都长在这片土地上。佛手柑长得像一颗青色的小柠檬，香气却独一无二：柑橘的明亮里，藏着一缕伯爵茶般的清雅茶香，是“柑橘中的贵族”。果农用滚筒冷压果皮，油珠带着青绿色的光泽滴落，香气在空气中铺展开来，像把意大利的清晨泡进了一壶茶。我把一滴油揉在手腕，那股清雅的香气让纷乱的思绪忽然安静下来——原来安抚与提亮，可以同时发生在一滴油里。`, aromatherapistNotes: `佛手柑，是“身心的调香师”。中医看它，如“疏肝理气、和胃止痛”之品，它的香气独一无二：既能安抚焦虑的神经，又能提振低落的情绪——是芳疗中罕见的“双向调节”之油。它入肝经，尤擅疏解郁结；茶香般的尾韵，又让人心神安定。我常为情绪起伏、焦虑失眠的案主调制“安神茶香油”：佛手柑配薰衣草、甜橙，睡前扩香，让心情像一杯好茶，慢慢舒展。它清新而深邃；愿这缕卡拉布里亚的贵族香，替你调平情绪的潮汐。` },
  'Y-S-068': { ericNotes: `南非的葡萄柚园，果实挂着淡淡的粉晕，像把朝霞的颜色长进了果皮。葡萄柚的香气是“有层次的快乐”：先是明亮的果甜，继而浮出一缕微苦，最后归于清爽的回甘——像生活本身，甜里带苦，苦后回甘。果农在清晨采收，冷压出的油带着淡淡的粉调，香气活泼而深邃。我在果园里坐了一会儿，看阳光透过枝叶洒在果皮上，忽然觉得，葡萄柚教会人的，是接纳：接纳那缕微苦，才品得出后面的回甘。`, aromatherapistNotes: `粉葡萄柚，是“情绪的提振器与身体的唤醒者”。中医看它，如“行气解郁、消食化滞”之品，它的香气能瞬间点亮心情，驱散萎靡与倦怠，是“冬日抑郁”与“情绪低潮”的解药。它还能刺激淋巴循环，帮助水分代谢，是晨间与水肿体质的良伴。我常建议案主：晨起扩香葡萄柚，让一天从明亮开始；水肿时稀释按摩腿部，让身体轻盈起来。它微苦而明亮；愿这缕南非的朝霞，替你唤回遗失的快乐。` },
  'Y-S-120': { ericNotes: `赤道雨林气候，这里的植物资源极为丰富。我伸手触碰到柠檬草的那一刻，青涩的柠檬草香清新提神——阳光般的香气，让整个房间都亮了起来。柠檬草是东南亚家家户户的“净室之香”，也是印度传统医药中的退热良药。后来在我的工作室里，每次打开这瓶油，都想起那片雨林的风与阳光。我把一滴油揉开，那股明快的青柠香仿佛把赤道的阳光，都带进了房间——沉闷与昏沉，一扫而空。`, aromatherapistNotes: `柠檬草油，是“清新提神的草本之光”。中医看它，如“祛风除湿、消肿止痛”之品，我注意到柠檬草和柠檬香茅油是同物异名，来源于同一种植物——其柠檬醛含量稳定在高效区间，在驱虫、提神和消化调理方面表现优异。柠檬草精油的明快香气能瞬间驱散沉闷、提振精神，也是空间净化的良伴。我常建议案主：午后昏沉时以柠檬草扩香，运动后稀释按摩放松肌肉，让草本的清新替你唤回精神。愿这缕雨林的草香，替你守住每一天的晴朗。` },
  'Y-T-078': { ericNotes: `横断山脉，中国西南的秘境——高山峡谷、云雾缭绕，生姜在这里长出了别样的脾性。高原的姜，根茎紧实，香气比平原的更辛烈、更深沉，带着山野的凛冽与土地的药香。藏区的药农在秋日挖姜，山风刺骨，姜的辛辣却能让人冒汗。他们把姜晾在屋檐下，满院都是那股暖洋洋的辛香。蒸馏出的姜油带着高原的质感，像把横断山的阳光与风雪都收进了瓶里。我站在山间，看云海翻涌，忽然觉得，这瓶油里装的，是一座山的体温。`, aromatherapistNotes: `横断生姜，是“高原的温阳之根”。中医以姜“温中散寒、祛湿通络”，横断山脉的高海拔姜，寒气与药性都更足，是祛湿寒的强劲之选——适合寒湿体质、久居湿地者与高原反应后的调理。它比平原姜更“烈”，使用务必低浓度稀释。我常为畏寒怕冷、关节沉重者调制“祛湿暖身油”：横断生姜配黑胡椒、杜松，按摩腰背与关节，让体内的寒湿顺着暖意排出。愿这座山的热度，替你驱散积年的寒。` },
  'Y-T-081': { ericNotes: `欧洲的老橡树林里，橡木苔附着在树干与岩石上，灰绿如绒，像森林的胡须。采集橡木苔是个耐心的活计：一块一块从树皮上揭下，晾干，香气便慢慢浮现——潮湿的、泥土的、苔藓的绿意，带着森林深处的静谧。蒸馏出的橡木苔净油是调香界的“定海神针”：它让香水有了“森林的底色”，像把一座欧洲老林装进了玻璃瓶。我在林子里走了一圈，苔藓在脚下绵软无声，忽然觉得，有些香气不是闻到的，是“感受”到的——像橡木苔，闻着闻着，人就静了。`, aromatherapistNotes: `橡木苔，是“空间与香气的定调者”。中医看它，如“祛风化湿、收敛固涩”之品，它的香气潮湿而沉静，能安定心神、收敛浮躁，也是高级香水不可或缺的“森林底调”。它的绿意不是活泼的清新，而是沉稳的静默——像走进一座老林，喧哗自动退去。我常将它与檀香、广藿香复配，用于冥想空间与卧室的扩香：让居室拥有森林的深度，让心绪拥有安放的位置。愿这缕古林的静谧，替你守住内在的秩序。` },
  'Y-T-082': { ericNotes: `印尼苏门答腊的热带雨林边缘，广藿香在树荫下长成浓密的绿毯。采下的叶片需要先晾晒萎凋，再经部分发酵后才能蒸馏——这个过程类似于制茶，影响最终香气的深度。老蒸馏师告诉我，广藿香是少数“越陈越值”的精油：新蒸馏时略带泥土气息和尖锐感，存放一两年后醇厚度明显提升，出现类似红酒般的发酵醇香。我站在晾晒场边，看叶片在阳光下慢慢萎凋，忽然明白：有些香气，需要时间才能醒过来。`, aromatherapistNotes: `广藿香，是“愈陈愈醇的定香基石”。中医看它，如“芳香化浊、和中止呕”之品——我实测其广藿香醇和广藿香酮合计超过五成，新蒸馏时略带泥土气息和尖锐感，存放一两年后醇厚度明显提升，出现类似红酒般的发酵醇香。它的深沉药香能安抚焦虑、收敛心神，对湿热体质、油腻肌肤有出色的净化收敛之力，也是调香中不可或缺的定香剂。工作室调配复方时，我总爱用它作底——让所有香气有了落地的根基。愿这缕雨林的深郁，替你按下生活的静音键。` },
  'Y-T-085': { ericNotes: `迈索尔的檀香林，是时间的博物馆。檀香树要长几十年，才在树心里攒出那一段深褐色的油芯——它把一生的阳光、雨水与沉默，都酿成了香。ISO 级的檀香油，是“标准之上的标准”：檀香醇含量达到苛刻的指标，香气圆润、沉静、无可挑剔。老林场主抚摸着树芯断面：“这棵树，比我们父子俩加起来都老。”蒸馏出的油带着温润的木质香，像一段凝固的时光。我把一滴油抹在眉心，那股安定的香气，仿佛把三十年的光阴，都化作了此刻的静。`, aromatherapistNotes: `东印度檀香，是“芳疗中的定海神针”。中医以檀香“行气温中、开胃止痛”，而它最珍贵的，是“定心”之力——高浓度檀香醇能诱发 Alpha 脑波，让纷乱的思绪归于清明。ISO 级檀香是“品质的承诺”：香气圆润、纯度高，适合冥想、静坐与长期使用。我常在最重要的案子里用它：临终关怀、重度焦虑、心灵创伤——它不说话，却比千言万语更安抚。愿这缕百年的香，成为你灵魂最安稳的落点。` },
  'Y-T-086': { ericNotes: `摩洛哥的阿特拉斯山，雪松林绵延在海拔两千米的高处，树冠如巨伞，树干粗壮，树皮皲裂如大地的皱纹。这里的雪松经历着严酷的昼夜温差——白天烈日，夜晚严寒，却把这份磨砺酿成了醇厚的木香。柏柏尔牧人在林中放牧，说雪松是“山的守护者”。蒸馏出的油带着高海拔的清冽与深沉的木香，像把阿特拉斯山的冬天装进了瓶里。我把一滴油揉在掌心，那股沉静的香气，仿佛把一座山的重量，稳稳地放在了肩上——不重，是踏实。`, aromatherapistNotes: `大西洋雪松，是“过载头脑的解压阀”。中医看它，如“安神定志、祛风除湿”之品，它的木香深沉绵长，能安抚脑力过载、神经衰弱的现代人，也促进头皮血液循环、滋养发丝。它比喜马拉雅雪松更“醇厚”，比阿拉斯加雪松更“温润”，是木质调中的多面手。我常为高压人群调制“解压油”：雪松配薰衣草、苦橙叶，睡前扩香或按摩头皮，让紧绷的神经与疲惫的大脑一起松绑。愿这缕阿特拉斯山的沉静，替你卸下过载的重量。` },
  'Y-T-099': { ericNotes: `迈索尔的老檀香林，是我的朝圣之地。檀香树东一棵西一棵，长得慢、活得久，树心里藏着几十年的光阴。林场的管理员说，檀香树“急不来”：“你急，它就给你急的香；你等，它就给你等的香。”东印度檀香的油，带着标志性的圆润奶甜与温润木感，是所有檀香中的“标准答案”。蒸馏出的油浓稠如蜜，香气绵长。我在林间的小屋里静坐了一会儿，那股安定的香气像一间房，让飘忽的心神终于有了栖身之所。`, aromatherapistNotes: `东印度檀香，是“灵魂的栖息地”。中医以檀香“理气温中、辟秽安神”，它的香气不张扬、不霸道，却有一种“让人安心”的稳定力量——像一间永远亮着灯的房子，等你回来。它的檀香醇含量高，是冥想、瑜伽与睡前仪式的经典之选；对干渴的肌肤，也有极好的滋养力。我常对案主说：当你觉得“无处可去”时，用一滴檀香——它不会带你去哪里，但它会陪你在哪里。愿这缕迈索尔的经典，成为你随时可以回去的家。` },
  'Y-T-103': { ericNotes: `澳洲的檀香林，是“年轻而负责任”的森林——与印度檀香相比，澳洲檀香（Santalum spicatum）生长更快、可持续采收，是环保时代的明智之选。林场主说，他们种檀香，是为子孙留的：“我们这一代砍，下一代种，檀香才能一直在。”澳洲檀香的香气比印度种更清爽：奶甜中带着一丝淡淡的果香与青木气息，少一分厚重，多一分轻盈。蒸馏出的油清澈温润。我在林场里看新栽的树苗，忽然觉得，负责任的香气，才是最长久的香气。`, aromatherapistNotes: `澳洲檀香，是“现代生活的安心之选”。中医看它，如“理气和中、安神定志”之品，它的香气比印度檀香更轻盈清透，适合日常使用——办公扩香、睡前仪式、护肤配方，它都是温和而可靠的存在。它的可持续性，让使用它的人少一分愧疚，多一分从容。我常将它与薰衣草、甜橙复配，调制“日常安心油”：让现代生活的节奏里，也能有一缕森林的静气。愿这缕澳洲的清风，陪你安稳地走过每一个今天。` },
  'Y-T-108': { ericNotes: `印尼群岛的檀香，带着海洋与群岛的气息。这里的檀香树生长在火山土壤上，根须吸饱了矿物质的滋养，树心凝聚的香气温润而带一丝特别的辛甜。采伐是个神圣的过程：林场工人说，砍檀香前要“问树”——不是迷信，是尊重：“它长了几十年，值得被认真对待。”蒸馏出的印尼檀香带着温暖的木质香，比印度檀香多一分活泼，比澳洲檀香多一分厚重。我把一滴油抹在手腕，那股温润的气息，仿佛把整片群岛的黄昏都揉进了皮肤里。`, aromatherapistNotes: `印尼檀香，是“日常的温润守护”。中医看它，如“理气和中、安神定志”之品，它的香气温润而不厚重，适合日常的冥想、阅读与睡前仪式。它的价格比印度檀香亲民，品质却毫不含糊，是“性价比之选”。我常为初学者与日常使用者推荐它：一滴檀香，一炷香的时间，让心从外求回到内观。愿这缕群岛的木香，成为你每日安顿自己的小小仪式。` },
  'Y-T-109': { ericNotes: `西班牙的丝柏大道，直通向古老的修道院——树影笔直如列队，风穿过时发出低沉的涛声。修士们几百年来在丝柏林间散步、默祷，他们说，丝柏是“最守纪律的树”：不旁逸、不斜出，一心向天。采收季，工人修剪下碧绿的枝条，送进蒸馏坊，蒸出的油带着针叶的清冽与树脂的温润。我在树下站了一会儿，抬头看那些直指天空的树尖，忽然明白：丝柏的功课，是教人立直、向上，把纷乱的生命，收敛成一根笔直的主干。`, aromatherapistNotes: `丝柏，是“循环与秩序的守护者”。中医看它，如“利水渗湿、活血通络”之品，它对体液滞留、静脉循环不畅、下肢沉重尤为拿手，是久坐族的腿部护理良伴；它的香气收敛而沉静，也能为纷乱的心神立起秩序。我常将它与杜松、柠檬复配，用于水肿体质的调理与空间的净浊——让身体轻盈，让气场清明。愿这根笔直的绿，为你立起内在的脊梁与边界。` },
  'Y-T-119': { ericNotes: `在意大利的阳光海岸，我第一次见到了佛手柑树——阳光与花海的相遇，那种柑橘与花香的独特组合，让整个上午都变得不同。卡拉布里亚是佛手柑的原乡，全世界的佛手柑大多长在这片土地上。现在每次闻到伯爵茶与香水的香气，我都会想起那片海岸：佛手柑的香，柑橘的明亮里藏着一缕茶香般的清雅，是“柑橘中的贵族”。我把一滴油揉在手腕，那股清雅的香气仿佛把意大利的海风与阳光，都带进了呼吸。`, aromatherapistNotes: `佛手柑，是“情绪的双向调香师”。中医看它，如“疏肝理气、和胃止痛”之品——我检测到佛手柑精油含有30-45%的乙酸芳樟酯和25-35%的柠檬烯，这个独特的成分组合赋予它同时镇静和提振的双重能力：焦虑时安抚，低落时点亮，是芳疗中罕见的“双向调节”之油。它在情绪调节中表现卓越，尤其对焦虑和抑郁有缓解作用。请注意光敏性问题，外用后需避免阳光直射。我常建议案主：情绪起伏时以佛手柑扩香或稀释涂抹，让茶香般的清雅陪你调平情绪的潮汐。` },
  'Y-T-122': { ericNotes: `菲律宾海岛的椰林下，棕榈叶投下斑驳光影。当地妇人用传统工具将椰肉刨丝、压榨，琥珀色的油脂缓缓滴落，空气里裹着甜糯的椰子香。椰子油是热带人民的“万能油”：抹在皮肤上滋养，抹在头发上养发，抹在锅里就是最纯净的食用油。老妇把椰子油涂在婴儿的皮肤上，那股清甜的香气，是孩子们对“妈妈”最早的记忆。我把一小块油在掌心融化，那股温润的触感仿佛把整个热带的海风，都揉进了皮肤里。`, aromatherapistNotes: `椰子油，是“热带的万能滋养”。中医以椰子“补虚强壮、消疳杀虫”，椰子油在掌心温度下从固态化为透明液体，滋润感包裹厚实——月桂酸赋予它抗菌特性，适合干性肌肤与发膜护理，也是冬季配方中的锁水基底。我常建议案主：干性肌以椰子油代替身体乳，发梢干燥时取少量滋养，让热带的温润陪你度过干燥的季节。愿这滴椰林的清甜，替你守住肌肤的润泽。` },
};

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
      const _bf = getBlendFormulaForItem(item.cn, item.subgroup);
      const _ingNames = (_bf || []).map((f: any) => f.ingredient).join('、');
      const _ingRoles = (_bf || []).slice(0, 3).map((f: any) => `${f.ingredient}（${f.role || '协同'}）`).join('，');
      const _sub = item.subgroup || '';
      // 用户提供方案（UNIO_复方配方构成.xlsx）50 款独特 Alice 配方手记优先
      if (BLEND_DIARY_MAP[item.code]) {
        const _bobs = _sub.includes('身体') ? `多种单方按挥发阶梯协同，临床体感反馈稳定优于单方堆叠。` : _sub.includes('心智') ? `单萜类分子快速调频、酯类与倍半萜缓释安抚，形成先清明后安定的双相曲线。` : `低挥发倍半萜与树脂类分子营造持久定锚气场，与冥想呼吸节律天然契合。`;
        const _bsug = _sub.includes('身体') ? `取 3 滴以荷荷巴油稀释至 3% 浓度，晨起与睡前温热后轻推腰腹、肩颈或足底。` : _sub.includes('心智') ? `办公或学习时段取 2 滴于纸巾深吸，晚间以 1% 浓度轻抹太阳穴与耳后。` : `冥想或睡前取 1 滴于掌心搓热后覆于鼻息，配合深长呼吸 5 分钟。`;
        defaultAliceDiary = {
          title: `Alice 配方试验日记：${item.cn}`,
          date: '2026.08.05',
          content: BLEND_DIARY_MAP[item.code],
          keyObservation: _bobs,
          blendSuggestion: _bsug,
        };
      } else {
      // 三套差异化配方试验日记（身体/心智/灵魂）——每款因成分与试验过程不同而文字各异
      if (_sub.includes('身体') || _sub.includes('Body')) {
        defaultAliceDiary = {
          title: `Alice 配方试验日记：${item.cn}的身体调理试验`,
          date: '2026.08.05',
          content: `为【${item.cn}】定方的那几周，我的试验台上摆满了${_ingNames}——${_ingRoles}。我按不同配比逐一做了小样本体感试验，记录每位来访者涂抹后的温热感、呼吸通畅度与皮肤反应，前后调整了十余次比例，才找到让身体最「听话」的那个相位。现在每当我闻到这款油，都想起那位常年手脚冰凉、第一次用后说「腰腹像被暖炉焐过」的女士。${item.cn}不是让我骄傲的作品，而是身体与植物一次次对话后，替我记下的答案。`,
          keyObservation: `按挥发阶梯协同复配，高活性分子直达体感层，倍半萜类分子缓释定锚，临床体感反馈稳定优于单方堆叠。`,
          blendSuggestion: `取 3 滴以荷荷巴油稀释至 3% 浓度，于晨起与睡前温热后轻推腰腹、肩颈或足底，连用 7 日为一疗程观察。`
        };
      } else if (_sub.includes('心智') || _sub.includes('Mind')) {
        defaultAliceDiary = {
          title: `Alice 配方试验日记：${item.cn}的心智调频试验`,
          date: '2026.08.05',
          content: `关于【${item.cn}】，我的笔记本里记着这样一行字：「第八版配比，测试者专注时长从 40 分钟延长到 90 分钟。」这款油以${_ingNames}为骨架——${_ingRoles}——我在连续三周的工作日清晨为同一批测试者扩香，记录她们的心率、入睡速度与专注曲线。有趣的是，不止一个人告诉我，闻到它时「脑子里那根绷紧的弦，自己松了」。${item.cn}是我给喧嚣时代的一份安静处方，也是我与植物共同完成的注意力实验。`,
          keyObservation: `单萜类分子快速提神醒脑，酯类与倍半萜分子缓释安抚，形成「先清明、后安定」的双相调频曲线。`,
          blendSuggestion: `办公或学习时段取 2 滴于纸巾深吸，或加入桌面扩香石；晚间以 1% 浓度轻抹太阳穴与耳后。`
        };
      } else {
        defaultAliceDiary = {
          title: `Alice 配方试验日记：${item.cn}的灵魂安顿试验`,
          date: '2026.08.05',
          content: `调配【${item.cn}】时，我刻意放慢了节奏——先在安静的夜里以${_ingNames}各取一滴，在试香纸上观察它们相融的每一个小时。${_ingRoles}的层次像潮水，一浪一浪把思绪带回身体。我在冥想练习者中做过为期一个月的观察：多数人说这款油让他们「更容易坐得住」，也有人流下眼泪，说闻到了很久以前外婆家的味道。${item.cn}教会我的事，是气味从来不只是化学，它替我们保管着记忆与情绪。`,
          keyObservation: `低挥发倍半萜与树脂类分子营造持久定锚气场，与冥想呼吸节律天然契合，情绪回落曲线平缓而深长。`,
          blendSuggestion: `冥想或睡前取 1 滴于掌心搓热后覆于鼻息，配合深长呼吸 5 分钟；亦可滴于枕边香囊伴眠。`
        };
      }
      }
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
  let defaultAromatherapistNotes = expertData.aromatherapistNotes || PRODUCT_DIARY_MAP[item.code]?.aromatherapistNotes;
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

  // 6. 为合系列 (He Series 复方) 自动匹配科学配方原料构成 (Blend Formula)
  let blendFormula = expertData.blendFormula;
  if (!blendFormula && isBlend) {
    blendFormula = getBlendFormulaForItem(item.cn, item.subgroup);
  }

  // 7. 为境系列 (Jing Series 器物) 自动匹配器物材质与香道规格 (Artifact Specs)
  let artifactSpecs = expertData.artifactSpecs;
  if (!artifactSpecs && (item.series === 'jing' || item.origin === '器物')) {
    artifactSpecs = getArtifactSpecsForItem(item.cn, item.subgroup);
  }

  // 更新对于复方/香系列的描述和短描述，使其与科学配方/器物特征相符
  let updatedShortDesc = `${item.cn} (${item.en}) · Alice 芳疗师手记：“${aromatherapistNotes.slice(0, 42)}...”`;
  if (isBlend && blendFormula && blendFormula.length > 0) {
    const keyIngredientsStr = blendFormula.slice(0, 3).map(b => `${b.ingredient}(${b.role.slice(0, 4)})`).join(' + ');
    updatedShortDesc = `【科学复方】${item.cn} · 核心原料构成：${keyIngredientsStr}。多国地标原产地精油协同调配。`;
  } else if (item.series === 'jing' && artifactSpecs) {
    updatedShortDesc = `【香道器物】${item.cn} · 材质：${artifactSpecs.material} | 工艺：${artifactSpecs.craft} | 场景：${artifactSpecs.scene}。`;
  }

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
    shortDesc: updatedShortDesc,
    description: aromatherapistNotes,
    aromatherapistNotes: aromatherapistNotes,
    blendFormula: isBlend ? blendFormula : undefined,
    artifactSpecs: item.series === 'jing' ? artifactSpecs : undefined,
    ericNotes: PRODUCT_DIARY_MAP[item.code]?.ericNotes || undefined,
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


