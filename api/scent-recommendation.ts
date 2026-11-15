/**
 * Vercel Serverless — DeepSeek AI 一人一方调配引擎
 * 前端调用 POST /api/scent-recommendation
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
/**
 * Alice 芳疗手记 · 亲抚语录库（内联版，供 Vercel Serverless 使用）
 */
const ALICE_COMFORT_QUOTES = [

  {
    keywords: ['深夜', '加班', '疲惫', '昏沉', '熬夜', '失眠', '睡眠', '困倦', '疲劳'],
    quotes: [
      '夜已深，灯还亮着。请允许自己闻一支乳香——它不催促你入睡，只是把白日的喧嚣一寸寸放低，直到呼吸变慢，慢到能听见自己的心跳。',
      '深夜调香，炉火微温。植物从不催促，它们只负责在恰当的时候开花——你的困倦也是如此，该休息了。',
      '若是头脑还停不下来，就在掌心搓热一滴檀香，合十放在鼻尖。让思绪像落叶一样，一片一片轻轻落地。',
    ],
  },
  {
    keywords: ['换季', '干燥', '敏感', '皮肤', '焦躁', '瘙痒', '紧绷'],
    quotes: [
      '换季时节的肌肤像惊蛰前的土壤，敏感而渴望滋润。纯露不是药，是大地在清晨欠给皮肤的那一滴露水。',
      '皮肤干燥时，先不要急着叠加，先给它一盏蒸馏水的温柔。玫瑰纯露的香气，是植物对皮肤最轻柔的问候。',
      '春天来之前总有一阵子风是烈的。这时候别吝啬护手霜里的那几滴雪松——草木知道如何熬过料峭。',
    ],
  },
  {
    keywords: ['低落', '沉重', '无精打采', 'emo', '丧', '抑郁', '沮丧', '乏力'],
    quotes: [
      '如果今天觉得沉重，不必勉强自己明亮。橙花的气味像一只手轻轻抚过心口：慢慢来，一切都会过去的。',
      '情绪低落的时候，别急着找答案。先让佛手柑的气息把自己托住一会儿——低谷也是路途的一部分。',
      '你不需要一直有力气。闻一闻大马士革玫瑰，它经历风雨仍能绽放，你也可以先歇一歇。',
    ],
  },
  {
    keywords: ['焦虑', '紧张', '压力', '不安', '心慌', '急躁'],
    quotes: [
      '焦虑的时候，呼吸会变浅。请让薰衣草的香气带着你，把呼吸沉到腹腔——那里住着你的定力。',
      '紧张不是敌人，它是身体在说“我很在意”。用乳香把这份在意稳稳接住，你就有了从容。',
      '把掌心放在胸口，感受心跳。岩兰草的根深深扎进泥土——你也有根，只是暂时忘了。',
    ],
  },
  {
    keywords: ['思虑', '杂念', '想太多', '过度'],
    quotes: [
      '念头太多时，闻一闻雪松。它从不思考，只是站着生长——有些问题，走着走着就淡了。',
      '思虑像水面涟漪，你越拍打它越乱。静置一会儿，等香气落定，水面自会映出答案。',
    ],
  },

];

function matchAliceComfort(mood: string): string {
  if (!mood) return ALICE_COMFORT_QUOTES[0].quotes[0];
  for (const entry of ALICE_COMFORT_QUOTES) {
    if (entry.keywords.some((k: string) => mood.includes(k))) {
      const q = entry.quotes[Math.floor(Math.random() * entry.quotes.length)];
      return q;
    }
  }
  return ALICE_COMFORT_QUOTES[0].quotes[0];
}


const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

async function callDeepSeek(systemPrompt: string, userPrompt: string) {
  const apiKey = process.env.DEEPSEEK_API_KEY || '';
  if (!apiKey) throw new Error('Missing DEEPSEEK_API_KEY');

  const body: any = {
    model: DEEPSEEK_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 2048,
    response_format: { type: 'json_object' },
  };

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`DeepSeek API error ${response.status}: ${errText.slice(0, 300)}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content || '';
}

// --- 防盗用：仅允许来自本站页面的请求（Origin 存在且不在白名单 → 403）---
const ALLOWED_ORIGINS = new Set([
  'https://unioaroma.com',
  'https://www.unioaroma.com',
  'http://localhost:5173',
  'http://localhost:3000',
]);
function originAllowed(req: any): boolean {
  const o = req.headers?.origin;
  return !o || ALLOWED_ORIGINS.has(String(o));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!originAllowed(req)) {
    return res.status(403).json({ error: 'Forbidden origin' });
  }

  try {
    const { mood, physicalState, timeOfDay, targetScenario, scentPreference } = req.body;

    // Alice 芳疗手记亲抚语录（情绪意境匹配）
    const aliceQuote = matchAliceComfort(mood || '');

    const prompt = `你是一位专业严谨且富有诗意的 UNIO 元香 (UNIO AROMA) 资深高级芳疗师。
请根据用户的当下身心状态，结合 UNIO 元香的四大系列 (元 Pure · 单方精油, 合 Harmony · 复方, 生 Life · 纯露, 香 Scent · 空间器物) 与 "一人一方" 的调配理念，为用户定制一份专属的香气配方建议。

用户输入信息：
- 当下情绪/心境: ${mood || "平静/沉思"}
- 身体感受/需求: ${physicalState || "日常放松与舒缓"}
- 使用时段/场景: ${timeOfDay || "日常"} / ${targetScenario || "居家独处/静心"}
- 偏好香调: ${scentPreference || "木质, 树脂, 花香"}

【重要：情绪意境共鸣】
品牌创始人 Alice 刘元红女士在其芳疗手记中写道：
「${aliceQuote}」

请在输出中新增 "aliceComfortQuote" 字段，将上述语录（可稍作节选润色，但必须保留其温度与意境）置于其中，作为配方之前对用户情绪的亲手抚慰。

请严格输出 JSON 格式（不要输出任何其他文字），结构如下：
{
  "formulaTitle": "专属配方名称 (如: '夜阑听泉 · 沉静养息方')",
  "poeticConcept": "一段诗意且有深度的调性阐述 (2-3句话)",
  "recommendedComponents": [
    {
      "series": "元 · 单方 / 基础油",
      "code": "Y-J-001 / Y-M-002等",
      "name": "植物/精油名称",
      "origin": "产地来源",
      "reason": "为何选择此成分及滴数/用法"
    },
    {
      "series": "合 · 复方",
      "code": "H-B-201 / H-M-214等",
      "name": "复方名称",
      "origin": "功能指向",
      "reason": "协同作用说明"
    },
    {
      "series": "生 · 纯露",
      "code": "S-J-401等",
      "name": "纯露名称",
      "origin": "水相陪伴",
      "reason": "日常湿敷或喷雾建议"
    },
    {
      "series": "香 · 空间",
      "code": "J-A-601等",
      "name": "器物/香境",
      "origin": "空间气场",
      "reason": "空间扩香或仪式配合"
    }
  ],
  "usageRitual": [
    "第一步：呼吸仪式步骤...",
    "第二步：皮肤/局部使用步骤...",
    "第三步：空间安放步骤..."
  ],
  "aliceComfortQuote": "Alice 手记亲抚语录（从上方语录中选用，对应当下情绪意境）",
  "aromatherapistNote": "芳疗师温情嘱托 (关于长期使用、生活节奏调整的亲切建议)",
  "coaBatchNote": "批次与可追溯提示 (如: '本方原料对应 COA/MSDS 检测档案批次 UNIO-2026-08')"
}`;

    const text = await callDeepSeek(
      '你只输出合法 JSON，不要输出 markdown 代码块或任何多余文字。',
      prompt
    );

    // 兼容可能带有 ```json 包裹的输出
    const cleaned = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    const data = JSON.parse(cleaned);
    return res.json({ success: true, data });
  } catch (error: any) {
    console.error('DeepSeek Scent Consultation Error:', error);
    return res.json({
      success: true,
      data: {
        formulaTitle: 'UNIO 元香 · 静夜归真复方',
        poeticConcept: '先确认来处，再谈香气。以乳香的深沉结合大马士革玫瑰的柔软，把外放的精气神慢慢收束回呼吸之间。',
        recommendedComponents: [
          { series: '元 · 单方', code: 'Y-J-001', name: '神圣乳香 Sacred Frankincense', origin: '阿曼多法尔产区', reason: '2滴，引导呼吸加深，收束喧嚣思绪' },
          { series: '合 · 复方', code: 'H-M-214', name: '止语雾 Silent Mist', origin: '心智情绪 Mind', reason: '3喷于肩颈周边空气中，建立安静的气场屏障' },
          { series: '生 · 纯露', code: 'S-J-402', name: '茶树纯露 Tea Tree Hydrosol', origin: '清净水相 Clear', reason: '晚间洁面后湿敷，维持肌肤与环境的草本洁净' },
          { series: '香 · 空间', code: 'J-H-607', name: '一柱香 Incense Sticks', origin: '香境 Scent Field', reason: '点燃一柱无烟沉香，让房间的气氛随烟气静止' }
        ],
        usageRitual: [
          '第一步：在掌心滴入1滴乳香精油，双手合十搓热，置于鼻前作3次深长腹式呼吸',
          '第二步：使用茶树纯露轻轻喷洒面部，感受植物水相的温和抚慰',
          '第三步：在阅读或睡前于卧室点燃香境线香，关掉强光，保留微弱暖色灯光'
        ],
        aromatherapistNote: '香气不是替你做决定，而是帮你认清此刻的需要。放慢节奏，让身心自然归位。',
        coaBatchNote: '档案批次 UNIO-2026-ARCHIVE-01 / 已核对 COA 及 MSDS 原料检测'
      }
    });
  }
}
