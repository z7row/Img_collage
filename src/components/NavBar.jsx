import { Download, Grid3x3 } from 'lucide-react'

export default function NavBar({ hasImages, onClear, onDownload }) {
  return (
    <nav className="shrink-0 h-[52px] flex items-center px-6 bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-b border-border-subtle">
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-[4px] bg-accent-subtle border border-border flex items-center justify-center">
          <Grid3x3 className="w-3.5 h-3.5 text-primary" strokeWidth={1.75} />
        </div>
        <span className="text-[13px] font-medium tracking-tight">
          مُجمِّع الصور
        </span>
      </div>
      <div className="mr-auto flex items-center gap-2">
        {hasImages && (
          <button
            onClick={onClear}
            className="text-[12px] font-medium text-secondary hover:text-primary px-3 py-1.5 rounded-md transition-colors"
          >
            مسح الكل
          </button>
        )}
        <button
          onClick={onDownload}
          disabled={!hasImages}
          className="text-[12px] font-medium bg-accent text-bg px-4 py-2 rounded-md hover:bg-[#E0E0E0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" strokeWidth={2} />
          تحميل
        </button>
      </div>
    </nav>
  )
}
