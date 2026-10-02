export default function SegmentedControl({ value, options, onChange, columns }) {
  const cols = columns || options.length
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={`py-2 rounded-md border text-[11px] font-medium transition-colors ${
            value === o.id
              ? 'border-accent bg-accent-subtle text-primary'
              : 'border-border-subtle text-secondary hover:text-primary hover:bg-surface-raised'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
