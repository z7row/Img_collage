export const LAYOUTS = [
  { id: 'horizontal', label: 'أفقي' },
  { id: 'vertical', label: 'رأسي' },
  { id: 'grid', label: 'شبكة' },
]

export const BG_PRESETS = ['#141414', '#0A0A0A', '#1C1C1C', '#FFFFFF', '#F5F5F5']

export const FIT_MODES = [
  { id: 'natural', label: 'طبيعي' },
  { id: 'contain', label: 'كامل' },
  { id: 'cover', label: 'ملء' },
]

export const FIT_MODES_GRID = FIT_MODES.filter((m) => m.id !== 'natural')

export const ALIGN_X = [
  { id: 'start', label: 'بداية' },
  { id: 'center', label: 'وسط' },
  { id: 'end', label: 'نهاية' },
]

export const ALIGN_Y = [
  { id: 'start', label: 'أعلى' },
  { id: 'center', label: 'وسط' },
  { id: 'end', label: 'أسفل' },
]

export const PREVIEW_MAX = 1600
export const PREVIEW_DEBOUNCE = 90
