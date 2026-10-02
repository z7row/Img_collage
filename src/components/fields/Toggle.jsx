export default function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-md border text-[11px] font-medium transition-colors ${
        checked
          ? 'border-accent bg-accent-subtle text-primary'
          : 'border-border-subtle text-secondary hover:text-primary hover:bg-surface-raised'
      }`}
    >
      <span>{label}</span>
      <span
        className={`w-2 h-2 rounded-full ${checked ? 'bg-accent' : 'bg-border'}`}
      />
    </button>
  )
}
