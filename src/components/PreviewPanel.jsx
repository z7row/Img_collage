import { Upload } from 'lucide-react'

export default function PreviewPanel({ previewUrl, infoLabel }) {
  return (
    <section className="min-h-0 flex flex-col order-1 lg:order-2">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[12px] font-medium text-secondary tracking-wide">
          المعاينة
        </h2>
        {previewUrl && infoLabel && (
          <span className="text-[11px] text-muted font-mono">{infoLabel}</span>
        )}
      </div>
      <div className="flex-1 min-h-0 bg-surface border border-border-subtle rounded-lg p-4 flex items-center justify-center overflow-hidden">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="معاينة"
            className="max-w-full max-h-full object-contain rounded-[4px]"
            draggable={false}
          />
        ) : (
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-accent-subtle border border-border-subtle flex items-center justify-center mx-auto mb-4">
              <Upload className="w-5 h-5 text-muted" strokeWidth={1.5} />
            </div>
            <p className="text-[13px] text-secondary">
              لم تتم إضافة أي صور بعد
            </p>
            <p className="text-[11px] text-muted mt-1">
              أضف صوراً من اليسار لبدء الإنشاء
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
