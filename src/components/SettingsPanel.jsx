import { Columns3, Grid3x3, Rows3 } from 'lucide-react'
import Section from './ui/Section'
import SegmentedControl from './fields/SegmentedControl'
import NumberField from './fields/NumberField'
import RangeField from './fields/RangeField'
import Toggle from './fields/Toggle'
import {
  ALIGN_X,
  ALIGN_Y,
  BG_PRESETS,
  FIT_MODES,
  FIT_MODES_GRID,
  LAYOUTS,
} from '../lib/constants'
import { calcAutoGrid } from '../lib/collage'

const ICONS = { horizontal: Columns3, vertical: Rows3, grid: Grid3x3 }

export default function SettingsPanel({
  imageCount,
  layout,
  setLayout,
  cols,
  setCols,
  rows,
  setRows,
  autoGrid,
  setAutoGrid,
  baseSize,
  setBaseSize,
  gap,
  setGap,
  padding,
  setPadding,
  bgColor,
  setBgColor,
  fitMode,
  setFitMode,
  alignX,
  setAlignX,
  alignY,
  setAlignY,
}) {
  const fitOptions = layout === 'grid' ? FIT_MODES_GRID : FIT_MODES
  const showAlign = fitMode === 'contain'
  const auto = calcAutoGrid(imageCount || 0)

  return (
    <aside className="lg:h-full lg:min-h-0 lg:overflow-y-auto space-y-4 order-3">
      <Section title="التخطيط">
        <div className="grid grid-cols-3 gap-2">
          {LAYOUTS.map(({ id, label }) => {
            const Icon = ICONS[id]
            return (
              <button
                key={id}
                onClick={() => setLayout(id)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-md border text-[11px] font-medium transition-colors ${
                  layout === id
                    ? 'border-accent bg-accent-subtle text-primary'
                    : 'border-border-subtle text-secondary hover:text-primary hover:bg-surface-raised'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.75} />
                {label}
              </button>
            )
          })}
        </div>

        {layout === 'grid' && (
          <div className="mt-3 space-y-3">
            <Toggle
              checked={autoGrid}
              onChange={setAutoGrid}
              label="ترتيب تلقائي"
            />
            {autoGrid ? (
              <div className="text-[11px] text-muted text-center font-mono py-1.5 bg-surface-raised border border-border-subtle rounded-md">
                {auto.cols} × {auto.rows}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <NumberField
                  label="أعمدة"
                  value={cols}
                  min={1}
                  max={12}
                  onChange={setCols}
                />
                <NumberField
                  label="صفوف"
                  value={rows}
                  min={1}
                  max={12}
                  onChange={setRows}
                />
              </div>
            )}
          </div>
        )}
      </Section>

      <Section title="عرض الصور">
        <SegmentedControl
          value={fitMode}
          options={fitOptions}
          onChange={setFitMode}
        />
        {showAlign && (
          <div className="mt-3 space-y-2.5">
            <div>
              <label className="block text-[11px] text-secondary mb-1.5">
                محاذاة أفقية
              </label>
              <SegmentedControl
                value={alignX}
                options={ALIGN_X}
                onChange={setAlignX}
              />
            </div>
            <div>
              <label className="block text-[11px] text-secondary mb-1.5">
                محاذاة رأسية
              </label>
              <SegmentedControl
                value={alignY}
                options={ALIGN_Y}
                onChange={setAlignY}
              />
            </div>
          </div>
        )}
        {!showAlign && fitMode === 'cover' && (
          <p className="text-[10px] text-muted mt-2 leading-relaxed">
            يتم قص الصور لملء الخلية. اختر «كامل» لعرض الصورة بالكامل دون قص.
          </p>
        )}
        {!showAlign && fitMode === 'natural' && (
          <p className="text-[10px] text-muted mt-2 leading-relaxed">
            تحتفظ الصور بنسبها الأصلية بلا قص ولا فراغ.
          </p>
        )}
      </Section>

      <Section title="النمط" className="space-y-3.5">
        <RangeField
          label="حجم الوحدة"
          value={baseSize}
          min={120}
          max={800}
          step={20}
          onChange={setBaseSize}
          unit="px"
        />
        <RangeField
          label="المسافة بين الصور"
          value={gap}
          min={0}
          max={80}
          step={2}
          onChange={setGap}
          unit="px"
        />
        <RangeField
          label="الهامش"
          value={padding}
          min={0}
          max={120}
          step={4}
          onChange={setPadding}
          unit="px"
        />

        <div>
          <label className="block text-[11px] text-secondary mb-2">
            لون الخلفية
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-9 h-9 rounded-md border border-border bg-surface-raised cursor-pointer"
            />
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="flex-1 min-w-0 bg-surface-raised border border-border rounded-md px-2.5 py-2 text-[12px] font-mono text-primary focus-ring"
              spellCheck={false}
            />
          </div>
          <div className="flex gap-1.5 mt-2">
            {BG_PRESETS.map((c) => (
              <button
                key={c}
                onClick={() => setBgColor(c)}
                className="w-6 h-6 rounded-[4px] border border-border hover:border-[#3A3A3A] transition-colors"
                style={{ background: c }}
                aria-label={c}
              />
            ))}
          </div>
        </div>
      </Section>
    </aside>
  )
}
