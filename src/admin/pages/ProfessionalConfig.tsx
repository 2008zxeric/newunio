import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, RefreshCw, Droplets, ShieldAlert, Activity, FlaskConical } from 'lucide-react';
import { fetchFrontConfig, saveFrontConfig, CarrierOilCfg, SafetyRuleCfg, FrontConfig, FormulaParamsCfg } from '../../lib/configService';

type CfgTab = 'carrier' | 'safety' | 'spectrum' | 'formula';

const SPECTRUM_DIMS = [
  { key: 'emotional', label: '情绪安抚' },
  { key: 'sleep', label: '睡眠助益' },
  { key: 'skin', label: '肌肤护理' },
  { key: 'respiratory', label: '呼吸道' },
  { key: 'focus', label: '专注力' },
] as const;

export default function ProfessionalConfigPage() {
  const [tab, setTab] = useState<CfgTab>('carrier');
  const [config, setConfig] = useState<FrontConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [spectrumOilCode, setSpectrumOilCode] = useState('');
  const [spectrumValues, setSpectrumValues] = useState<Record<string, number>>({});

  // 新增载体油表单
  const [newCarrier, setNewCarrier] = useState({ nameCn: '', nameEn: '', density: '', absorption: '', bestFor: '' });
  // 新增安全规则
  const [newSafety, setNewSafety] = useState({ category: 'photosensitive', oilName: '', level: '', warningText: '' });
  // 配方参数编辑
  const [formulaParams, setFormulaParams] = useState<FormulaParamsCfg>({ drops_per_ml: 20, card_watermark: '', card_prefix: 'UNIO-EO', dilution_default: 1.0, max_face_conc: 2.0 });

  // 加载配方参数
  const loadFormulaParams = () => {
    if (config?.formula_params) setFormulaParams(config.formula_params);
  };

  const loadConfig = async () => {
    setLoading(true);
    const cfg = await fetchFrontConfig();
    setConfig(cfg);
    setFormulaParams(cfg.formula_params || { drops_per_ml: 20, card_watermark: '', card_prefix: 'UNIO-EO', dilution_default: 1.0, max_face_conc: 2.0 });
    setLoading(false);
  };

  useEffect(() => { loadConfig(); }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const persist = async (next: FrontConfig) => {
    setSaving(true);
    const ok = await saveFrontConfig(next);
    setConfig(next);
    setSaving(false);
    showToast(ok ? '✅ 配置已保存到云端（前台即时生效）' : '❌ 保存失败，请重试');
  };

  // ── 配方参数 ──
  const saveFormulaParams = async () => {
    if (!config) return;
    const next: FrontConfig = { ...config, formula_params: formulaParams };
    await persist(next);
  };

  // ── 载体油 ──
  const addCarrier = async () => {
    if (!config || !newCarrier.nameCn) { showToast('请填写载体油中文名称'); return; }
    const item: CarrierOilCfg = {
      id: String(Date.now()),
      nameCn: newCarrier.nameCn,
      nameEn: newCarrier.nameEn || '',
      density: newCarrier.density || '',
      absorption: newCarrier.absorption || '',
      bestFor: newCarrier.bestFor || '',
      status: 'active',
    };
    await persist({ ...config, carrier_oils: [...config.carrier_oils, item] });
    setNewCarrier({ nameCn: '', nameEn: '', density: '', absorption: '', bestFor: '' });
  };

  const removeCarrier = async (id: string) => {
    if (!config) return;
    await persist({ ...config, carrier_oils: config.carrier_oils.filter((c) => c.id !== id) });
  };

  // ── 安全规则 ──
  const addSafety = async () => {
    if (!config || !newSafety.oilName) { showToast('请填写精油名称'); return; }
    const item: SafetyRuleCfg = {
      id: String(Date.now()),
      category: newSafety.category as SafetyRuleCfg['category'],
      oilName: newSafety.oilName,
      level: newSafety.level || '提示',
      warningText: newSafety.warningText || '',
    };
    await persist({ ...config, safety_rules: [...config.safety_rules, item] });
    setNewSafety({ category: 'photosensitive', oilName: '', level: '', warningText: '' });
  };

  const removeSafety = async (id: string) => {
    if (!config) return;
    await persist({ ...config, safety_rules: config.safety_rules.filter((s) => s.id !== id) });
  };

  // ── 五维图谱 ──
  const saveSpectrum = async () => {
    if (!config || !spectrumOilCode) { showToast('请选择精油编码'); return; }
    const ratings = { ...(config.spectrum_ratings || {}) };
    ratings[spectrumOilCode] = spectrumValues as any;
    await persist({ ...config, spectrum_ratings: ratings });
  };

  const selectSpectrumOil = (code: string) => {
    setSpectrumOilCode(code);
    const cur = config?.spectrum_ratings?.[code];
    setSpectrumValues(cur || { emotional: 80, sleep: 70, skin: 75, respiratory: 65, focus: 60 });
  };

  const CATEGORY_LABELS: Record<string, string> = {
    photosensitive: '光敏预警', pregnancy: '孕期禁忌', allergen: '过敏源披露', patchTest: '皮试规程',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#2D2D2A]">专业配置中心</h2>
          <p className="text-xs text-[#8C7E6A]">载体油 / 安全规则 / 五维图谱 — 保存后前台即时生效（Supabase Storage 同步）</p>
        </div>
        <button onClick={loadConfig} className="px-3 py-1.5 rounded-xl bg-white border border-[#2D2D2A]/15 text-xs hover:bg-[#EFEDE7] flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5" /> 刷新
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#2D2D2A]/10 pb-3">
        {([
          { id: 'carrier', label: '载体油库', icon: Droplets },
          { id: 'safety', label: '安全规则', icon: ShieldAlert },
          { id: 'spectrum', label: '五维调校', icon: Activity },
          { id: 'formula', label: '配方参数', icon: FlaskConical },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              tab === t.id ? 'bg-[#0c120e] text-[#d2c4ad]' : 'bg-white text-[#8C7E6A] hover:bg-[#EFEDE7] border border-[#2D2D2A]/10'
            }`}
          >
            <t.icon className="w-3.5 h-3.5" /> {t.label}
          </button>
        ))}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-[#0c120e] text-[#d2c4ad] text-xs px-4 py-2.5 rounded-xl shadow-lg animate-pulse">
          {toast}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-xs text-[#8C7E6A] animate-pulse">加载配置中...</div>
      ) : !config ? (
        <div className="py-20 text-center text-xs text-red-500">配置加载失败</div>
      ) : (
        <>
          {/* ── 载体油 ── */}
          {tab === 'carrier' && (
            <div className="space-y-4">
              {/* 添加表单 */}
              <div className="bg-white rounded-2xl border border-[#2D2D2A]/10 p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#2D2D2A]">➕ 添加基础植物油</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <input value={newCarrier.nameCn} onChange={(e) => setNewCarrier({ ...newCarrier, nameCn: e.target.value })}
                    placeholder="中文名称 *" className="px-3 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs" />
                  <input value={newCarrier.nameEn} onChange={(e) => setNewCarrier({ ...newCarrier, nameEn: e.target.value })}
                    placeholder="英文名称" className="px-3 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs" />
                  <input value={newCarrier.density} onChange={(e) => setNewCarrier({ ...newCarrier, density: e.target.value })}
                    placeholder="密度 (如 0.91 g/ml)" className="px-3 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs" />
                  <input value={newCarrier.absorption} onChange={(e) => setNewCarrier({ ...newCarrier, absorption: e.target.value })}
                    placeholder="亲肤度" className="px-3 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs" />
                  <input value={newCarrier.bestFor} onChange={(e) => setNewCarrier({ ...newCarrier, bestFor: e.target.value })}
                    placeholder="最佳用途" className="px-3 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs col-span-2" />
                  <button onClick={addCarrier} disabled={saving}
                    className="px-4 py-2 rounded-xl bg-[#0c120e] text-[#d2c4ad] text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-50">
                    <Save className="w-3.5 h-3.5" /> {saving ? '保存中...' : '保存'}
                  </button>
                </div>
              </div>

              {/* 列表 */}
              <div className="bg-white rounded-2xl border border-[#2D2D2A]/10 divide-y divide-[#2D2D2A]/5">
                {config.carrier_oils.map((c) => (
                  <div key={c.id} className="p-3.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#2D2D2A]">{c.nameCn} <span className="text-[#8C7E6A] font-normal">{c.nameEn}</span></div>
                      <div className="text-[10px] text-[#8C7E6A] mt-0.5">{c.density} · {c.absorption} · {c.bestFor}</div>
                    </div>
                    <button onClick={() => removeCarrier(c.id)} disabled={saving}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 disabled:opacity-40">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {config.carrier_oils.length === 0 && <div className="p-6 text-center text-xs text-[#8C7E6A]">暂无载体油</div>}
              </div>
            </div>
          )}

          {/* ── 安全规则 ── */}
          {tab === 'safety' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#2D2D2A]/10 p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#2D2D2A]">➕ 添加安全规则</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <select value={newSafety.category} onChange={(e) => setNewSafety({ ...newSafety, category: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs">
                    {Object.entries(CATEGORY_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                  <input value={newSafety.oilName} onChange={(e) => setNewSafety({ ...newSafety, oilName: e.target.value })}
                    placeholder="精油名称 *" className="px-3 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs" />
                  <input value={newSafety.level} onChange={(e) => setNewSafety({ ...newSafety, level: e.target.value })}
                    placeholder="风险等级 (高/中/禁用)" className="px-3 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs" />
                  <input value={newSafety.warningText} onChange={(e) => setNewSafety({ ...newSafety, warningText: e.target.value })}
                    placeholder="预警文案" className="px-3 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs" />
                  <button onClick={addSafety} disabled={saving}
                    className="px-4 py-2 rounded-xl bg-[#0c120e] text-[#d2c4ad] text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-50">
                    <Save className="w-3.5 h-3.5" /> {saving ? '保存中...' : '保存'}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#2D2D2A]/10 divide-y divide-[#2D2D2A]/5">
                {config.safety_rules.map((s) => (
                  <div key={s.id} className="p-3.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#2D2D2A]">
                        <span className="px-1.5 py-0.5 rounded bg-[#D75437]/10 text-[#D75437] text-[10px] mr-2">{CATEGORY_LABELS[s.category] || s.category}</span>
                        {s.oilName} <span className="text-[#D75437] font-normal">{s.level}</span>
                      </div>
                      <div className="text-[10px] text-[#8C7E6A] mt-0.5">{s.warningText}</div>
                    </div>
                    <button onClick={() => removeSafety(s.id)} disabled={saving}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 disabled:opacity-40">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {config.safety_rules.length === 0 && <div className="p-6 text-center text-xs text-[#8C7E6A]">暂无安全规则</div>}
              </div>
            </div>
          )}

          {/* ── 五维图谱 ── */}
          {tab === 'spectrum' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#2D2D2A]/10 p-4 space-y-4">
                <h3 className="text-xs font-bold text-[#2D2D2A]">📈 精油五维疗效评分调校</h3>
                <div>
                  <label className="block text-[10px] text-[#8C7E6A] mb-1">选择精油编码（产品管理中的 code）</label>
                  <input value={spectrumOilCode} onChange={(e) => selectSpectrumOil(e.target.value)}
                    placeholder="如 Y-J-001 / H-B-201" className="px-3 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs w-full" />
                </div>
                {spectrumOilCode && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {SPECTRUM_DIMS.map((d) => (
                      <div key={d.key} className="space-y-1.5">
                        <div className="flex justify-between text-[10px] text-[#8C7E6A]">
                          <span>{d.label}</span>
                          <span className="font-bold text-[#2D2D2A]">{spectrumValues[d.key] ?? 0} 分</span>
                        </div>
                        <input type="range" min={0} max={100}
                          value={spectrumValues[d.key] ?? 0}
                          onChange={(e) => setSpectrumValues({ ...spectrumValues, [d.key]: Number(e.target.value) })}
                          className="w-full accent-[#D75437]" />
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={saveSpectrum} disabled={saving || !spectrumOilCode}
                  className="px-4 py-2 rounded-xl bg-[#0c120e] text-[#d2c4ad] text-xs font-bold flex items-center gap-1.5 disabled:opacity-50">
                  <Save className="w-3.5 h-3.5" /> {saving ? '保存中...' : '保存五维评分'}
                </button>
              </div>
            </div>
          )}

          {/* ── 配方参数 ── */}
          {tab === 'formula' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#2D2D2A]/10 p-4 space-y-4">
                <h3 className="text-xs font-bold text-[#2D2D2A]">🧪 配方卡计算参数</h3>
                <p className="text-[11px] text-[#8C7E6A]">配置稀释计算器与 PNG 配方卡导出的全局基准，保存后前台即时生效。</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-[#8C7E6A] mb-1">1ml 精油滴数基准（行业标准 20 滴）</label>
                    <input type="number" min={1} max={60}
                      value={formulaParams.drops_per_ml}
                      onChange={(e) => setFormulaParams({ ...formulaParams, drops_per_ml: Number(e.target.value) })}
                      className="px-3 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs w-full" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#8C7E6A] mb-1">默认稀释浓度 (%)</label>
                    <input type="number" step={0.1} min={0.1} max={10}
                      value={formulaParams.dilution_default}
                      onChange={(e) => setFormulaParams({ ...formulaParams, dilution_default: Number(e.target.value) })}
                      className="px-3 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs w-full" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#8C7E6A] mb-1">面部安全浓度上限 (%)</label>
                    <input type="number" step={0.5} min={0.5} max={10}
                      value={formulaParams.max_face_conc}
                      onChange={(e) => setFormulaParams({ ...formulaParams, max_face_conc: Number(e.target.value) })}
                      className="px-3 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs w-full" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#8C7E6A] mb-1">配方编号前缀</label>
                    <input value={formulaParams.card_prefix}
                      onChange={(e) => setFormulaParams({ ...formulaParams, card_prefix: e.target.value })}
                      placeholder="如 UNIO-EO"
                      className="px-3 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs w-full" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] text-[#8C7E6A] mb-1">导出卡片水印文案</label>
                    <input value={formulaParams.card_watermark}
                      onChange={(e) => setFormulaParams({ ...formulaParams, card_watermark: e.target.value })}
                      placeholder="UNIO BOTANICAL ARCHIVE · 元香芳疗档案"
                      className="px-3 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D2D2A]/15 text-xs w-full" />
                  </div>
                </div>

                <button onClick={saveFormulaParams} disabled={saving}
                  className="px-4 py-2 rounded-xl bg-[#0c120e] text-[#d2c4ad] text-xs font-bold flex items-center gap-1.5 disabled:opacity-50">
                  <Save className="w-3.5 h-3.5" /> {saving ? '保存中...' : '保存配方参数'}
                </button>
              </div>

              <div className="bg-[#EFEDE7] rounded-2xl border border-[#2D2D2A]/10 p-4">
                <h4 className="text-[11px] font-bold text-[#2D2D2A] mb-2">预览：配方编号规则</h4>
                <p className="text-[11px] text-[#8C7E6A] font-mono break-all">
                  {formulaParams.card_prefix}-101-30ML-{formulaParams.dilution_default}%-840291
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
