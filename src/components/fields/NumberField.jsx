export default function NumberField({ label, value, min, max, onChange }) {
  return (
    <div>
      <label className="block text-[11px] text-secondary mb-1.5">{label}</label>
      <div className="flex items-center bg-surface-raised border border-border rounded-md overflow-hidden focus-within:shadow-[0_0_0_2px_rgba(255,255,255,0.15)]">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-9 text-secondary hover:text-primary hover:bg-[#242424] transition-colors flex items-center justify-center text-base leading-none"
          aria-label="تقليل"
        >
          −
        </button>
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10)
            if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n)))
          }}
          className="w-full min-w-0 bg-transparent text-center text-[13px] font-mono tabular-nums text-primary focus:outline-none py-2"
        />
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-9 text-secondary hover:text-primary hover:bg-[#242424] transition-colors flex items-center justify-center text-base leading-none"
          aria-label="زيادة"
        >
          +
        </button>
      </div>
    </div>
  )
}
