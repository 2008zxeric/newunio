/**
 * Vercel Serverless — DeepSeek AI 问诊代理（祭司对话）
 * 前端调用 POST /api/oracle-proxy
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

async function callDeepSeek(systemPrompt: string, userPrompt: string, opts: { json?: boolean; temperature?: number } = {}) {
  const apiKey = process.env.DEEPSEEK_API_KEY || '';
  if (!apiKey) throw new Error('Missing DEEPSEEK_API_KEY');

  const body: any = {
    model: DEEPSEEK_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: opts.temperature ?? 0.7,
    max_tokens: 2048,
  };

  if (opts.json) {
    body.response_format = { type: 'json_object' };
  }

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
    const { messages, questionnaireData } = req.body;

    let systemPrompt = `你是 UNIO 元香 (UNIO AROMA) 的"感官祭司"。
品牌起源：始于 2003 年，由 Alice 刘元红女士创立，拥有 23 年真实芳疗档案记录。
品牌价值观："先确认来处，再谈香气；先理解状态，再选择植物。"
产品的四大体系：
1. 元 Pure · 单方精油 (Y-J-001至Y-T-122)
2. 合 Harmony · 协同复方 (H-T-201至H-M-215)
3. 生 Life · 有机纯露 (S-J-401至S-R-437)
4. 香 Scent · 空间器物 (J-T-601至J-S-610)

你的语言风格：
- 沉稳、深邃、富有温情与疗愈感，语言简洁精炼，如同一位智慧温和的资深芳疗专家。
- 当用户表达健康或心理困扰时，先提供同理与专业解答，避开禁忌精油（如孕期避开强通经类精油、癫痫避开高樟脑/薄荷酮类精油、高血压避开升压精油）。
- 如果用户表达想要调配复方或定制一人一方，可以引导用户使用顶部的【一人一方问诊表单】或根据用户的具体症状给出安全专业的 2-3 种精油组合建议（附滴数与稀释比例）。

注意：不要说空话套话，要给出有说服力的植物学名、产地特点与生理/情绪调理逻辑。`;

    if (questionnaireData) {
      systemPrompt += `\n\n【用户已填写的问诊表单数据】：
- 年龄段: ${questionnaireData.ageGroup || '未提供'}
- 性别: ${questionnaireData.gender || '未提供'}
- 基础病史: ${Array.isArray(questionnaireData.conditions) ? questionnaireData.conditions.join(', ') : '无'}
- 特殊状态: ${Array.isArray(questionnaireData.specialStatus) ? questionnaireData.specialStatus.join(', ') : '无'}
- 皮肤类型: ${questionnaireData.skinType || '未提供'} / 敏感度: ${questionnaireData.skinSensitivity || '未提供'}
- 偏好香调: ${questionnaireData.scentPreference || '未提供'}
请在回复中紧密结合用户的健康禁忌与香气偏好进行定制！`;
    }

    const conversation = (messages || []).map((m: any) => `${m.role === 'user' ? '用户' : '祭司'}: ${m.content}`).join('\n');
    const fullPrompt = `${conversation}\n\n请以"祭司"身份回复最新一条消息：`;

    const reply = await callDeepSeek(systemPrompt, fullPrompt);
    return res.json({ reply, role: 'assistant' });
  } catch (error: any) {
    console.error('Oracle Proxy Error:', error);
    return res.json({
      reply: '感官祭司已感知到你的身心状态。先确认来处，再谈香气。针对你提及的需求，建议优先考虑阿曼神圣乳香（收束思绪）、保加利亚有机玫瑰（抚慰情绪）与马达加斯加依兰（平衡神经系统）。若需精准剂量与禁忌调配，可随时开启上方【一人一方问诊表单】。',
      role: 'assistant'
    });
  }
}
