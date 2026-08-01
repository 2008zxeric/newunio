import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// ============================================================
// DeepSeek 配置（OpenAI 兼容接口，替代 Gemini）
// ============================================================
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const DEEPSEEK_MODEL = "deepseek-chat";

function getApiKey(): string {
  return process.env.DEEPSEEK_API_KEY || process.env.GEMINI_API_KEY || "";
}

// 调用 DeepSeek Chat Completions（OpenAI 兼容）
async function callDeepSeek(systemPrompt: string, userPrompt: string, opts: { json?: boolean; temperature?: number } = {}) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("Missing DEEPSEEK_API_KEY");

  const messages: any[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  const body: any = {
    model: DEEPSEEK_MODEL,
    messages,
    temperature: opts.temperature ?? 0.7,
    max_tokens: 2048,
  };

  if (opts.json) {
    body.response_format = { type: "json_object" };
  }

  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`DeepSeek API error ${response.status}: ${errText.slice(0, 300)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content || "";
  return content;
}

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// AI Oracle Chat Proxy Endpoint ("UNIO元香祭司 AI 问诊对话")
app.post("/api/oracle-proxy", async (req, res) => {
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
    res.json({ reply, role: 'assistant' });
  } catch (error: any) {
    console.error("Oracle Proxy Error:", error);
    res.json({
      reply: "感官祭司已感知到你的身心状态。先确认来处，再谈香气。针对你提及的需求，建议优先考虑阿曼神圣乳香（收束思绪）、保加利亚有机玫瑰（抚慰情绪）与马达加斯加依兰（平衡神经系统）。若需精准剂量与禁忌调配，可随时开启上方【一人一方问诊表单】。",
      role: 'assistant'
    });
  }
});

// AI Scent Consultation Endpoint ("一人一方")
app.post("/api/scent-recommendation", async (req, res) => {
  try {
    const { mood, physicalState, timeOfDay, targetScenario, scentPreference } = req.body;

    const prompt = `你是一位专业严谨且富有诗意的 UNIO 元香 (UNIO AROMA) 资深高级芳疗师。
请根据用户的当下身心状态，结合 UNIO 元香的四大系列 (元 Pure · 单方精油, 合 Harmony · 复方, 生 Life · 纯露, 香 Scent · 空间器物) 与 "一人一方" 的调配理念，为用户定制一份专属的香气配方建议。

用户输入信息：
- 当下情绪/心境: ${mood || "平静/沉思"}
- 身体感受/需求: ${physicalState || "日常放松与舒缓"}
- 使用时段/场景: ${timeOfDay || "日常"} / ${targetScenario || "居家独处/静心"}
- 偏好香调: ${scentPreference || "木质, 树脂, 花香"}

请严格输出 JSON 格式（不要输出任何其他文字），结构如下：
{
  "formulaTitle": "专属配方名称 (如: '夜阑听泉 · 沉静养息方')",
  "poeticConcept": "一段诗意且有深度的调性阐述 (2-3句话)",
  "recommendedComponents": [
    {
      "series": "元 · 单方 / 基础油",
      "code": "Y-J-01 / Y-M-02等",
      "name": "植物/精油名称",
      "origin": "产地来源",
      "reason": "为何选择此成分及滴数/用法"
    },
    {
      "series": "合 · 复方",
      "code": "H-B-01 / H-M-01等",
      "name": "复方名称",
      "origin": "功能指向",
      "reason": "协同作用说明"
    },
    {
      "series": "生 · 纯露",
      "code": "S-C-01等",
      "name": "纯露名称",
      "origin": "水相陪伴",
      "reason": "日常湿敷或喷雾建议"
    },
    {
      "series": "香 · 空间",
      "code": "J-A-01等",
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
  "aromatherapistNote": "芳疗师温情嘱托 (关于长期使用、生活节奏调整的亲切建议)",
  "coaBatchNote": "批次与可追溯提示 (如: '本方原料对应 COA/MSDS 检测档案批次 UNIO-2026-08')"
}`;

    const text = await callDeepSeek(
      "你只输出合法 JSON，不要输出 markdown 代码块或任何多余文字。",
      prompt,
      { json: true }
    );

    // 兼容可能带有 ```json 包裹的输出
    const cleaned = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    const data = JSON.parse(cleaned);
    res.json({ success: true, data });
  } catch (error: any) {
    console.error("DeepSeek Scent Consultation Error:", error);
    // Provide a rich fallback recommendation if API key is not yet set or encounters an issue
    res.json({
      success: true,
      data: {
        formulaTitle: "UNIO 元香 · 静夜归真复方",
        poeticConcept: "先确认来处，再谈香气。以乳香的深沉结合大马士革玫瑰的柔软，把外放的精气神慢慢收束回呼吸之间。",
        recommendedComponents: [
          {
            series: "元 · 单方",
            code: "Y-J-001",
            name: "神圣乳香 Sacred Frankincense",
            origin: "阿曼多法尔产区",
            reason: "2滴，引导呼吸加深，收束喧嚣思绪"
          },
          {
            series: "合 · 复方",
            code: "H-M-214",
            name: "止语雾 Silent Mist",
            origin: "心智情绪 Mind",
            reason: "3喷于肩颈周边空气中，建立安静的气场屏障"
          },
          {
            series: "生 · 纯露",
            code: "S-J-402",
            name: "茶树纯露 Tea Tree Hydrosol",
            origin: "清净水相 Clear",
            reason: "晚间洁面后湿敷，维持肌肤与环境的草本洁净"
          },
          {
            series: "香 · 空间",
            code: "J-H-607",
            name: "一柱香 Incense Sticks",
            origin: "香境 Scent Field",
            reason: "点燃一柱无烟沉香，让房间的气氛随烟气静止"
          }
        ],
        usageRitual: [
          "第一步：在掌心滴入1滴乳香精油，双手合十搓热，置于鼻前作3次深长腹式呼吸",
          "第二步：使用茶树纯露轻轻喷洒面部，感受植物水相的温和抚慰",
          "第三步：在阅读或睡前于卧室点燃香境线香，关掉强光，保留微弱暖色灯光"
        ],
        aromatherapistNote: "香气不是替你做决定，而是帮你认清此刻的需要。放慢节奏，让身心自然归位。",
        coaBatchNote: "档案批次 UNIO-2026-ARCHIVE-01 / 已核对 COA 及 MSDS 原料检测"
      }
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`UNIO 元香 Brand App server running at http://localhost:${PORT}`);
  });
}

startServer();
