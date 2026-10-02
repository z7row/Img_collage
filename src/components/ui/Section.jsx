export default function Section({ title, children, className = '' }) {
  return (
    <section
      className={`bg-surface border border-border-subtle rounded-lg p-4 ${className}`}
    >
      {title && (
        <h2 className="text-[12px] font-medium text-secondary mb-3 tracking-wide">
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}
