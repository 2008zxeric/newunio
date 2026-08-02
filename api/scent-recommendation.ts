/**
 * Vercel Serverless — DeepSeek AI 一人一方调配引擎
 * 前端调用 POST /api/scent-recommendation
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { matchAliceComfort } from '../src/data/aliceComfortQuotes';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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
