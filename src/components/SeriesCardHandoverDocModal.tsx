import React, { useState } from 'react';
import { 
  X, FileText, CheckCircle2, ShieldCheck, Layers, Sparkles, 
  Package, FlaskConical, Droplet, Compass, Copy, Check, Download, 
  Code2, AlertCircle, Database, LayoutGrid, CheckSquare
} from 'lucide-react';
import { UnioLogo } from './UnioLogo';

interface SeriesCardHandoverDocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeriesCardHandoverDocModal: React.FC<SeriesCardHandoverDocModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeSeriesTab, setActiveSeriesTab] = useState<'he' | 'jing' | 'yuan' | 'sheng' | 'architecture'>('he');
  const [copiedCode, setCopiedCode] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setDownloadSuccessToast(msg);
    setTimeout(() => setDownloadSuccessToast(null), 3000);
  };

  const codeSnippets = {
    he: `// 合系列 (He Series - 复方精油) 字段约束与数据结构接口
export interface BlendFormulaItem {
  ingredient: string; // 构成原精油名称 e.g. "蓝桉尤加利", "大马士革玫瑰"
  role: string;       // 在配方中的作用 e.g. "清通下呼吸道与黏膜", "理气活血主调"
  origin?: string;    // 原料地标产地 e.g. "澳大利亚", "保加利亚"
  note?: string;      // 挥发调性 e.g. "前调", "中调", "后调"
}

// ProductItem 必填关联字段:
// 1. blendFormula: BlendFormulaItem[] (复方科学配方原料构成表 - 强制必须提供)
// 2. formulation: string (协同作用逻辑与调配原理 breakdown)
// 3. scentPyramid: { top: string; middle: string; base: string; }`,

    jing: `// 香系列 (Jing Series - 器物与熏香) 字段约束与数据结构接口
export interface ArtifactSpecs {
  material: string;   // 器具材质 e.g. "紫铜 / 红木", "火山熔岩石"
  craft: string;      // 制作工序与匠人美学 e.g. "手工锻打锤纹 / 无漆过蜡"
  scene: string;      // 推荐适用场景 e.g. "茶室静修 / 沉香熏蒸", "床头安神扩香"
  dimension?: string; // 规格尺寸与容积 e.g. "180mm x 220mm", "200ml水箱"
}

// ProductItem 必填关联字段:
// 1. artifactSpecs: ArtifactSpecs (器具材质与香道规格 - 强制必须提供)
// 2. description: string (养护与香境使用仪式指南)`,

    yuan: `// 元系列 (Yuan Series - 单方精油) 字段约束与数据结构接口
export interface ChemicalProfileItem {
  name: string;       // 核心化学分子名称 e.g. "1,8-桉树脑", "α-蒎烯"
  percentage?: string;// GC-MS 质谱占比 e.g. "68.5%"
  effect: string;     // 活性作用 e.g. "清通粘膜、抗炎镇痛"
}

// ProductItem 必填关联字段:
// 1. latinName: string (植物学拉丁学名 - 强制)
// 2. botanicalFamily: string (植物科属)
// 3. extractionMethod: string (萃取方式 e.g. "水蒸气蒸馏法")
// 4. chemicalProfile: ChemicalProfileItem[] (GC-MS 结构表)
// 5. coaNumber: string & batchTrace: string (COA 检定报告与批次追溯)`,

    sheng: `// 生系列 (Sheng Series - 纯露水相) 字段约束与数据结构接口
// ProductItem 必填关联字段:
// 1. extractionMethod: "水蒸气蒸馏头道水相 (1:1 或 1:0.8)"
// 2. storageInfo: "避光冷藏、开封后6个月内用毕"
// 3. applicationScenarios: 湿敷与补水喷雾运用场景
// 4. 零添加、无人工香精、无防腐剂声明`
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleExportMarkdownDoc = () => {
    const docContent = `# UNIO AROMA 元香 · 四大产品系列卡面内容规则与后台录入实现交接规范
版本：v2026.8 | 发布时间：2026-08-04 | 适用对象：前端开发、UI设计师、中枢后台管理员

## 一、系统核心设计原则
1. **东方植萃四系分明**：元（单方纯精油）、合（复方协同精油）、生（头道纯露水相）、香（香器与熏香器物）。
2. **卡面信息零模糊**：不同系列卡面必须严格按照专用模板进行组装展示，严禁跨系信息缺失或混淆。
3. **后台动态表单联动**：管理员在后台新建/修改精油作品时，切换“系列”字段将自动加载对应的专属录入入口与必填项校验。

---

## 二、四大系列卡面规则与字段映射

### 1. 合系列 (He Series - Synergistic Blends 复方精油)
- **卡面必须包含内容**：
  - **【复方精油成分构成表 (Ingredients List Breakdown)】**：列表展示每一味构成原精油名称、在配方中的协同作用角色、原料地标产地、挥发香阶（前调/中调/后调）。
  - **【复方科学配方原理与调配思路 (Formulation Logic)】**：解释单萜烯与酯类分子的协同互补机制。
  - **【三阶香气金字塔 (Scent Pyramid)】**：前调、中调、后调声响。
  - **【稀释比例与运用指南】**：面部按摩、SPA身体油与扩香仪的推荐滴数与基底油配置。
- **后台录入字段**：
  - \`blendFormula\`: Array<{ ingredient, role, origin, note }>
  - \`formulation\`: string
  - \`scentPyramid\`: { top, middle, base }

---

### 2. 香系列 (Jing Series - Scent & Artifacts 香器与器物)
- **卡面必须包含内容**：
  - **【器具材质 (Vessel Material)】**：紫铜、红木、火山熔岩石、手作陶土等。
  - **【制作工序与匠人美学 (Artisan Crafting Process)】**：手工锻打锤纹、无漆过蜡、高温窑变等。
  - **【推荐使用场景与空间 (Scene & Space)】**：茶室静修、卧室安神、SPA接待区等。
  - **【规格尺寸与容积 (Dimensions)】**：180mm x 220mm, 200ml 水箱等。
  - **【养护与保养指南 (Maintenance Guide)】**：纯铜抗氧化保养法、扩香石清洁指南。
- **后台录入字段**：
  - \`artifactSpecs\`: { material, craft, scene, dimension }
  - \`description\`: string

---

### 3. 元系列 (Yuan Series - Monoterpene Single Oils 单方精油)
- **卡面必须包含内容**：
  - **【植物学档案 (Botanical Archive)】**：植物拉丁学名 (\`latinName\`)、植物科属 (\`botanicalFamily\`)、萃取部位 (\`plantPart\`)。
  - **【GC-MS 化学分子结构 (Chemical Profile)】**：核心化合物及其百分比占比与生理功效（如 1,8-桉树脑 68%）。
  - **【单地标原产地 (Single Origin)】**：庄园直采地标及地图联动。
  - **【五行与 COA 质检】**：金木水火土五行属性、COA 检验报告单号 (\`coaNumber\`) 与批次追溯 (\`batchTrace\`)。
- **后台录入字段**：
  - \`latinName\`, \`botanicalFamily\`, \`extractionMethod\`, \`plantPart\`
  - \`chemicalProfile\`: Array<{ name, percentage, effect }>
  - \`coaNumber\`, \`batchTrace\`

---

### 4. 生系列 (Sheng Series - Pure Waters & Hydrosols 纯露水相)
- **卡面必须包含内容**：
  - **【水蒸馏提纯比例】**：1:1 或 1:0.8 植物头道水相蒸馏纯度。
  - **【零添加防腐声明】**：无酒精、无人工香精、无化学防腐剂。
  - **【水相湿敷与喷雾仪式】**：湿敷棉使用法、空间芳香喷雾。
- **后台录入字段**：
  - \`extractionMethod\`, \`applicationScenarios\`, \`storageInfo\`

---

## 三、后台管理控制台 (Admin Console) 录入与校验规范
1. **录入入口**：位于管理控制台 -> 【🌿 精油作品库】 -> 【新增/编辑精油】弹窗。
2. **系列切换自动更新**：选择不同系列下拉菜单，表单卡片将动态呈现专属模块：
   - 切换至 **合系**：显示【复方科学配方原料构成表】编辑器。
   - 切换至 **香系**：显示【器物材质与香道规格】编辑器。
   - 切换至 **元系**：显示【植物学与 GC-MS 化学结构】编辑器。
   - 切换至 **生系**：显示【水相纯露萃取与湿敷参数】编辑器。
3. **数据校验机制**：保存更改前，系统自动校验卡面规则必填项并给予弹窗或 Toast 确认。

---
UNIO AROMA 元香 研发团队 & 运维团队 备用交接文档
`;

    const blob = new Blob([docContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `UNIO_Aroma_Series_Card_Handover_Spec_2026.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('已导出交接规范文档为 Markdown (.md)');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Toast */}
      {downloadSuccessToast && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl bg-[#C5B49A] text-[#1C2E20] font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadSuccessToast}</span>
        </div>
      )}

      <div className="relative w-full max-w-5xl bg-[#0c120e] text-[#f6f2eb] rounded-3xl border border-[#d2c4ad]/30 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-black/40 flex-shrink-0">
          <div className="flex items-center gap-3">
            <UnioLogo size={32} color="#d2c4ad" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl text-[#d2c4ad] font-bold">
                  UNIO 四大产品系列卡面内容规则与系统实现交接规范
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#d2c4ad]/20 text-[#d2c4ad] text-[10px] font-mono border border-[#d2c4ad]/30">
                  HANDOVER SPEC
                </span>
              </div>
              <p className="text-xs text-[#b4aca2] mt-0.5">
                前端卡面渲染规范 · 复方构成表与香器材质约束 · 后台字段录入及管理入口指南
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportMarkdownDoc}
              className="hidden sm:flex px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#d2c4ad] text-xs font-serif items-center gap-1.5 transition-all cursor-pointer"
              title="导出 Markdown 交接文档"
            >
              <Download className="w-3.5 h-3.5" />
              <span>导出 Markdown 文档</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 bg-white/5 border-b border-white/10 overflow-x-auto no-scrollbar flex-shrink-0">
          {[
            { id: 'he', label: '🌿 合系 (复方精油配方表)', icon: Layers, color: 'text-amber-300' },
            { id: 'jing', label: '🏺 香系 (器物材质与规格)', icon: Package, color: 'text-purple-300' },
            { id: 'yuan', label: '💧 元系 (单方GC-MS植物学)', icon: FlaskConical, color: 'text-emerald-300' },
            { id: 'sheng', label: '🌸 生系 (纯露水相提纯)', icon: Droplet, color: 'text-cyan-300' },
            { id: 'architecture', label: '⚙️ 系统架构与后台录入入口', icon: Database, color: 'text-[#d2c4ad]' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSeriesTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-serif whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                activeSeriesTab === tab.id
                  ? 'bg-[#d2c4ad] text-[#2D2D2A] font-bold shadow-md'
                  : 'bg-white/5 text-[#b4aca2] hover:bg-white/10 border border-white/5'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeSeriesTab === tab.id ? 'text-[#2D2D2A]' : tab.color}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Body Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs leading-relaxed text-[#e0dad1]">
          {/* TAB 1: HE SERIES (复方) */}
          {activeSeriesTab === 'he' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#2C1D11]/80 border border-[#B08968]/50 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-base text-[#f6f2eb] font-bold flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#B08968]" />
                    <span>合系列 (He Series - Synergistic Blends 复方精油) 卡面规范</span>
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-[#B08968]/20 text-[#B08968] font-mono text-[10px] border border-[#B08968]/30">
                    核心强制规则：必须包含复方精油成分构成表
                  </span>
                </div>
                <p className="text-xs text-[#b4aca2]">
                  复方精油强调多味原精油分子间的“协同增效 (Synergy)”，卡面绝不可仅简单展示总描述，必须提供精确的成分拆解与科学调配逻辑。
                </p>
              </div>

              {/* Mandatory Checklist Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#d2c4ad] flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                    1. 必须有复方精油成分构成表 (Ingredients List)
                  </h4>
                  <p className="text-[11px] text-[#b4aca2]">
                    表项需明确包含：
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#e0dad1] font-sans">
                    <li><strong className="text-amber-200">构成原精油名称</strong> (如: 蓝桉尤加利、保加利亚大马士革玫瑰)</li>
                    <li><strong className="text-amber-200">配方中的协同作用 breakdown</strong> (如: 清通下呼吸道粘膜、理气活血主调)</li>
                    <li><strong className="text-amber-200">原料地标原产地</strong> (如: 澳大利亚、保加利亚)</li>
                    <li><strong className="text-amber-200">挥发香阶</strong> (前调 / 中调 / 后调)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#d2c4ad] flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                    2. 科学配方逻辑与调香金字塔 (Formulation & Pyramid)
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#e0dad1] font-sans">
                    <li><strong className="text-amber-200">科学配方原理</strong>：解释单萜烯、倍半萜烯与酯类分子的互补作用机制。</li>
                    <li><strong className="text-amber-200">三阶香气金字塔</strong>：明确前调 (Top)、中调 (Middle)、后调 (Base) 主导气味。</li>
                    <li><strong className="text-amber-200">复配与扩香推荐</strong>：面部护理、身体SPA与香氛机的黄金滴数比例。</li>
                  </ul>
                </div>
              </div>

              {/* Sample Card Visual Demo */}
              <div className="p-4 rounded-2xl bg-black/60 border border-[#B08968]/40 space-y-3">
                <div className="flex justify-between items-center text-xs text-[#B08968]">
                  <span className="font-serif font-bold">合系列前端卡面展示效果范例 (Sample UI Output)</span>
                  <span className="font-mono">HE-201 呼吸清通复方</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#2C1D11]/60 border border-[#B08968]/30 space-y-2">
                  <div className="text-xs font-serif font-bold text-[#f6f2eb]">
                    复方科学配方原料构成与协同作用 breakdown
                  </div>
                  <div className="space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between items-center p-2 rounded bg-black/40 border border-white/10">
                      <div>
                        <span className="font-bold text-amber-200">澳大利亚蓝桉尤加利</span>
                        <span className="text-[10px] text-[#b4aca2] ml-2">主调 · 前调</span>
                      </div>
                      <span className="text-xs text-[#d2c4ad] font-sans">作用：清通下呼吸道与黏膜，净化空气</span>
                    </div>

                    <div className="flex justify-between items-center p-2 rounded bg-black/40 border border-white/10">
                      <div>
                        <span className="font-bold text-amber-200">普罗旺斯高地薰衣草</span>
                        <span className="text-[10px] text-[#b4aca2] ml-2">辅助 · 中调</span>
                      </div>
                      <span className="text-xs text-[#d2c4ad] font-sans">作用：缓和尤加利冲劲，平沉呼吸与情绪张力</span>
                    </div>

                    <div className="flex justify-between items-center p-2 rounded bg-black/40 border border-white/10">
                      <div>
                        <span className="font-bold text-amber-200">索马里神圣乳香</span>
                        <span className="text-[10px] text-[#b4aca2] ml-2">定香 · 后调</span>
                      </div>
                      <span className="text-xs text-[#d2c4ad] font-sans">作用：深化呼吸波长，提供木质沉静底韵</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Interface */}
              <div className="p-4 rounded-2xl bg-black/80 border border-white/15 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between items-center text-[#d2c4ad]">
                  <span className="font-bold flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-amber-300" />
                    TypeScript 接口定义与数据结构 (TypeScript Interface)
                  </span>
                  <button
                    onClick={() => handleCopyCode(codeSnippets.he)}
                    className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? '已复制' : '复制接口'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-black text-amber-100/90 overflow-x-auto whitespace-pre-wrap">
                  {codeSnippets.he}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: JING SERIES (香系) */}
          {activeSeriesTab === 'jing' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#2F1D3A]/80 border border-[#7B5294]/50 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-base text-[#f6f2eb] font-bold flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#7B5294]" />
                    <span>香系列 (Jing Series - Scent & Artifacts 器物与熏香) 卡面规范</span>
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-[#7B5294]/20 text-purple-200 font-mono text-[10px] border border-[#7B5294]/30">
                    核心强制规则：必须包含器具材质与规格
                  </span>
                </div>
                <p className="text-xs text-[#b4aca2]">
                  香系涵盖香器、扩香石、水蒸熏香机与美学器具。卡面必须明确展示材质来源、手作工艺、规格尺寸与适用空间。
                </p>
              </div>

              {/* Mandatory Checklist Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#d2c4ad] flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-purple-400" />
                    1. 必须有器具材质 (Material) & 匠人工艺 (Craft)
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#e0dad1] font-sans">
                    <li><strong className="text-purple-200">器具材质</strong>：紫铜、紫砂、黑曜石、火山熔岩石、天然胡桃木等。</li>
                    <li><strong className="text-purple-200">手作工艺</strong>：手工锻打锤纹、高温无漆过蜡、窑变釉采等。</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#d2c4ad] flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-purple-400" />
                    2. 适用场景 (Scene) & 规格尺寸 (Dimensions)
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#e0dad1] font-sans">
                    <li><strong className="text-purple-200">推荐适用场景</strong>：茶室静修、卧室睡眠安神、SPA接待区香氛。</li>
                    <li><strong className="text-purple-200">规格尺寸/容积</strong>：180mm x 220mm, 200ml 超声波水箱。</li>
                    <li><strong className="text-purple-200">养护指南</strong>：纯铜抗氧化保养法、扩香石清洁法。</li>
                  </ul>
                </div>
              </div>

              {/* Sample Card Visual Demo */}
              <div className="p-4 rounded-2xl bg-black/60 border border-[#7B5294]/40 space-y-3">
                <div className="flex justify-between items-center text-xs text-purple-300">
                  <span className="font-serif font-bold">香系列前端卡面展示效果范例 (Sample UI Output)</span>
                  <span className="font-mono">JING-401 锤纹紫铜熏香炉</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-[11px]">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] text-[#b4aca2] block">器具材质</span>
                    <span className="font-bold text-purple-200 font-sans">特级紫铜 / 红木底座</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] text-[#b4aca2] block">制作工序</span>
                    <span className="font-bold text-purple-200 font-sans">手工锤纹锻打 / 无漆过蜡</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] text-[#b4aca2] block">适用场景</span>
                    <span className="font-bold text-purple-200 font-sans">茶室静修 / 沉香熏蒸</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] text-[#b4aca2] block">规格尺寸</span>
                    <span className="font-bold text-purple-200 font-sans">180mm x 220mm</span>
                  </div>
                </div>
              </div>

              {/* Code Interface */}
              <div className="p-4 rounded-2xl bg-black/80 border border-white/15 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between items-center text-[#d2c4ad]">
                  <span className="font-bold flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-purple-300" />
                    TypeScript 接口定义与数据结构 (Artifact Specs)
                  </span>
                  <button
                    onClick={() => handleCopyCode(codeSnippets.jing)}
                    className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? '已复制' : '复制接口'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-black text-purple-100/90 overflow-x-auto whitespace-pre-wrap">
                  {codeSnippets.jing}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: YUAN SERIES (元系/单方) */}
          {activeSeriesTab === 'yuan' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#132A1C]/80 border border-[#4E8B5E]/50 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-base text-[#f6f2eb] font-bold flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-[#4E8B5E]" />
                    <span>元系列 (Yuan Series - Monoterpene Single Oils 单方精油) 卡面规范</span>
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-[#4E8B5E]/20 text-emerald-200 font-mono text-[10px] border border-[#4E8B5E]/30">
                    核心强制规则：必须包含植物学档案与 GC-MS 结构
                  </span>
                </div>
                <p className="text-xs text-[#b4aca2]">
                  单方精油强调单一植物学纯度、GC-MS 气相色谱质谱化学分析、五行相生及单地标庄园直采。
                </p>
              </div>

              {/* Mandatory Checklist Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#d2c4ad] flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                    1. 植物学档案 (Botanical Archive)
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#e0dad1] font-sans">
                    <li><strong className="text-emerald-200">植物学拉丁学名</strong>：如 <em>Boswellia carterii</em> (神圣乳香)。</li>
                    <li><strong className="text-emerald-200">植物科属与利用部位</strong>：橄榄科乳香属 / 树脂。</li>
                    <li><strong className="text-emerald-200">提取/萃取方式</strong>：水蒸气蒸馏法 / 冷压压榨法。</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#d2c4ad] flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                    2. GC-MS 化学结构 & 质检追溯
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#e0dad1] font-sans">
                    <li><strong className="text-emerald-200">GC-MS 质谱数据</strong>：核心成分占比（如 α-蒎烯 48.2%）。</li>
                    <li><strong className="text-emerald-200">COA 检定报告单号</strong>：COA-2026-EO101，批次追溯。</li>
                    <li><strong className="text-emerald-200">五行元系归属</strong>：金、木、水、火、土。</li>
                  </ul>
                </div>
              </div>

              {/* Code Interface */}
              <div className="p-4 rounded-2xl bg-black/80 border border-white/15 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between items-center text-[#d2c4ad]">
                  <span className="font-bold flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-emerald-300" />
                    TypeScript 接口定义与数据结构 (Chemical Profile)
                  </span>
                  <button
                    onClick={() => handleCopyCode(codeSnippets.yuan)}
                    className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? '已复制' : '复制接口'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-black text-emerald-100/90 overflow-x-auto whitespace-pre-wrap">
                  {codeSnippets.yuan}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: SHENG SERIES (生系/纯露) */}
          {activeSeriesTab === 'sheng' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#11242C]/80 border border-[#3A7CA5]/50 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-base text-[#f6f2eb] font-bold flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-[#3A7CA5]" />
                    <span>生系列 (Sheng Series - Pure Waters & Hydrosols 纯露) 卡面规范</span>
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-[#3A7CA5]/20 text-cyan-200 font-mono text-[10px] border border-[#3A7CA5]/30">
                    核心强制规则：水蒸馏比例与湿敷指南
                  </span>
                </div>
                <p className="text-xs text-[#b4aca2]">
                  纯露属于天然温和水相成分，卡面必须突出头道蒸馏水相纯度、零防腐剂声明与湿敷补水方式。
                </p>
              </div>

              {/* Mandatory Checklist Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#d2c4ad] flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-cyan-400" />
                    1. 1:1 水蒸馏纯度 & 零添加声明
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#e0dad1] font-sans">
                    <li><strong className="text-cyan-200">头道蒸馏比</strong>：标注 1:1 或 1:0.8 高活性水相蒸馏。</li>
                    <li><strong className="text-cyan-200">无添加保障</strong>：零酒精、零化学防腐剂、零香精。</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#d2c4ad] flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-cyan-400" />
                    2. 湿敷与喷雾仪式指南
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#e0dad1] font-sans">
                    <li><strong className="text-cyan-200">面部水相湿敷</strong>：搭配压缩面膜湿敷 5-10 分钟。</li>
                    <li><strong className="text-cyan-200">保质期与保存</strong>：开封后避光冷藏，6个月内用毕。</li>
                  </ul>
                </div>
              </div>

              {/* Code Interface */}
              <div className="p-4 rounded-2xl bg-black/80 border border-white/15 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between items-center text-[#d2c4ad]">
                  <span className="font-bold flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-cyan-300" />
                    TypeScript 接口定义与数据结构 (Hydrosol Specs)
                  </span>
                  <button
                    onClick={() => handleCopyCode(codeSnippets.sheng)}
                    className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? '已复制' : '复制接口'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-black text-cyan-100/90 overflow-x-auto whitespace-pre-wrap">
                  {codeSnippets.sheng}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 5: SYSTEM ARCHITECTURE & ADMIN CONSOLE */}
          {activeSeriesTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#0c120e] border border-[#d2c4ad]/30 space-y-2">
                <h3 className="font-serif text-base text-[#d2c4ad] font-bold flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#C5B49A]" />
                  <span>后台录入与管理不同入口和字段规范 (Admin Entry & Management Spec)</span>
                </h3>
                <p className="text-xs text-[#b4aca2]">
                  后台控制台 `AdminConsole.tsx` 已全面升级，实现四系字段的动态显示、录入入口与字段合规校验。
                </p>
              </div>

              {/* Admin Workflow Flowchart */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-[#d2c4ad] block">STEP 01</span>
                  <h4 className="font-serif font-bold text-sm text-[#f6f2eb]">进入精油编辑弹窗</h4>
                  <p className="text-[11px] text-[#b4aca2]">
                    在后台控制台【精油作品库】选项卡中，点击任意作品右侧编辑图标或【新增精油】按钮。
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-[#d2c4ad] block">STEP 02</span>
                  <h4 className="font-serif font-bold text-sm text-[#f6f2eb]">切换“系列”触发专属字段</h4>
                  <p className="text-[11px] text-[#b4aca2]">
                    切换【所属系列】下拉框（元/合/生/香），系统将实时挂载并渲染对应的专属输入组件（如复方配方表、器物规格表）。
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-[#d2c4ad] block">STEP 03</span>
                  <h4 className="font-serif font-bold text-sm text-[#f6f2eb]">校验与保存持久化</h4>
                  <p className="text-[11px] text-[#b4aca2]">
                    点击【保存更改】前，系统检验是否满足相应卡面规则，保存成功后同步至状态与数据层，前端卡面实时生效。
                  </p>
                </div>
              </div>

              {/* Interactive Quality Assurance Matrix */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                <h4 className="font-serif font-bold text-sm text-[#d2c4ad] flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-[#C5B49A]" />
                  <span>四大系列字段与卡面规则映射矩阵 (Field Mapping Matrix)</span>
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-white/10 text-[#d2c4ad] font-serif">
                      <tr>
                        <th className="p-2.5">系列 Key</th>
                        <th className="p-2.5">系列名称</th>
                        <th className="p-2.5">核心必填专属字段</th>
                        <th className="p-2.5">后台编辑组件</th>
                        <th className="p-2.5">前端卡面触发机制</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-[#e0dad1]">
                      <tr>
                        <td className="p-2.5 text-amber-300 font-bold">he</td>
                        <td className="p-2.5 font-sans">合 Harmony (复方)</td>
                        <td className="p-2.5">`blendFormula`, `formulation`, `scentPyramid`</td>
                        <td className="p-2.5 font-sans">复方配方原料表编辑器 (+动态增删)</td>
                        <td className="p-2.5 font-sans">渲染【复方精油成分构成表】与作用角色</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-purple-300 font-bold">jing</td>
                        <td className="p-2.5 font-sans">香 Scent (器物)</td>
                        <td className="p-2.5">`artifactSpecs` (`material`, `craft`, `scene`, `dimension`)</td>
                        <td className="p-2.5 font-sans">器物材质与香道规格编辑器</td>
                        <td className="p-2.5 font-sans">渲染【器具材质/手作工艺/使用场景/尺寸】</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-emerald-300 font-bold">yuan</td>
                        <td className="p-2.5 font-sans">元 Pure (单方)</td>
                        <td className="p-2.5">`latinName`, `botanicalFamily`, `chemicalProfile`</td>
                        <td className="p-2.5 font-sans">植物学与 GC-MS 结构编辑器</td>
                        <td className="p-2.5 font-sans">渲染植物学档案与 GC-MS 质谱结构表</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-cyan-300 font-bold">sheng</td>
                        <td className="p-2.5 font-sans">生 Life (纯露)</td>
                        <td className="p-2.5">`extractionMethod`, `storageInfo`, `applicationScenarios`</td>
                        <td className="p-2.5 font-sans">纯露蒸馏比例与保质规则编辑器</td>
                        <td className="p-2.5 font-sans">渲染 1:1 头道纯露水相与湿敷指南</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-white/10 bg-black/40 flex-shrink-0 text-xs text-[#b4aca2]">
          <span>UNIO AROMA 元香 · 东方植萃品牌中枢研发部</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#d2c4ad] text-[#2D2D2A] font-serif font-bold hover:bg-[#e2d6bf] transition-all cursor-pointer"
          >
            已阅读并掌握规范
          </button>
        </div>
      </div>
    </div>
  );
};
