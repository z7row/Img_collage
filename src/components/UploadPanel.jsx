import { memo } from 'react'
import { ImagePlus, X } from 'lucide-react'
import Section from './ui/Section'

const ImageRow = memo(function ImageRow({ im, index, onRemove }) {
  return (
    <div className="flex items-center gap-2 bg-surface-raised border border-border-subtle rounded-md p-1.5 group">
      <span className="text-[10px] text-muted w-4 text-center tabular-nums">
        {index + 1}
      </span>
      <img
        src={im.url}
        alt=""
        className="w-8 h-8 object-cover rounded-[4px] border border-border-subtle"
        draggable={false}
      />
      <span className="text-[11px] text-secondary truncate flex-1">
        {im.name}
      </span>
      <button
        onClick={() => onRemove(im.id)}
        className="text-muted hover:text-error p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="حذف"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
})

export default function UploadPanel({
  images,
  isDragging,
  onDrop,
  onDragOver,
  onDragLeave,
  onAddClick,
  onFilesSelected,
  onRemove,
  inputRef,
  overflow,
  slots,
}) {
  return (
    <aside className="lg:h-full lg:min-h-0 lg:overflow-y-auto space-y-4 order-2 lg:order-1">
      <Section title="إضافة صور">
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={onAddClick}
          className={`cursor-pointer rounded-md border border-dashed px-3 py-6 flex flex-col items-center justify-center gap-1.5 transition-colors ${
            isDragging
              ? 'border-accent bg-accent-subtle'
              : 'border-border hover:border-[#3A3A3A] hover:bg-surface-raised'
          }`}
        >
          <ImagePlus className="w-5 h-5 text-secondary" strokeWidth={1.5} />
          <p className="text-[12px] text-secondary text-center">
            اسحب الصور أو <span className="text-primary font-medium">اضغط</span>
          </p>
          <p className="text-[10px] text-muted">PNG · JPG · WEBP</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) onFilesSelected(e.target.files)
            e.target.value = ''
          }}
        />

        {images.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-secondary">
              <span>{images.length} صورة</span>
              {overflow && <span className="text-error">أول {slots} فقط</span>}
            </div>
            <div className="max-h-[420px] overflow-y-auto space-y-1.5 pl-1">
              {images.map((im, i) => (
                <ImageRow
                  key={im.id}
                  im={im}
                  index={i}
                  onRemove={onRemove}
                />
              ))}
            </div>
          </div>
        )}
      </Section>
    </aside>
  )
}
