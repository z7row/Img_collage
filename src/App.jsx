import { useState, useRef, useCallback, useEffect } from 'react'
import NavBar from './components/NavBar'
import UploadPanel from './components/UploadPanel'
import PreviewPanel from './components/PreviewPanel'
import SettingsPanel from './components/SettingsPanel'
import { buildCanvas, calcAutoGrid } from './lib/collage'
import { PREVIEW_MAX, PREVIEW_DEBOUNCE } from './lib/constants'

export default function App() {
  const [images, setImages] = useState([])
  const [layout, setLayout] = useState('grid')
  const [cols, setCols] = useState(3)
  const [rows, setRows] = useState(3)
  const [autoGrid, setAutoGrid] = useState(false)
  const [baseSize, setBaseSize] = useState(400)
  const [gap, setGap] = useState(16)
  const [padding, setPadding] = useState(24)
  const [bgColor, setBgColor] = useState('#141414')
  const [fitMode, setFitMode] = useState('cover')
  const [alignX, setAlignX] = useState('center')
  const [alignY, setAlignY] = useState('center')
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  const inputRef = useRef(null)
  const previewUrlRef = useRef(null)

  // في الشبكة لا يوجد معنى لـ "طبيعي" — حوّله تلقائيًا إلى "ملء"
  useEffect(() => {
    if (layout === 'grid' && fitMode === 'natural') setFitMode('cover')
  }, [layout, fitMode])

  const addFiles = useCallback((files) => {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'))
    list.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          setImages((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              url: e.target.result,
              img,
              name: file.name,
            },
          ])
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files)
  }
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = () => setIsDragging(false)

  const removeImage = useCallback(
    (id) => setImages((prev) => prev.filter((i) => i.id !== id)),
    []
  )
  const clearAll = () => setImages([])

  const buildOptions = useCallback(
    (maxDim = null) => ({
      images,
      layout,
      cols,
      rows,
      baseSize,
      gap,
      padding,
      bgColor,
      fitMode,
      alignX,
      alignY,
      autoGrid,
      maxDim,
    }),
    [
      images,
      layout,
      cols,
      rows,
      baseSize,
      gap,
      padding,
      bgColor,
      fitMode,
      alignX,
      alignY,
      autoGrid,
    ]
  )

  useEffect(() => {
    if (!images.length) {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
        previewUrlRef.current = null
      }
      setPreviewUrl(null)
      return
    }
    const t = setTimeout(() => {
      const canvas = buildCanvas(buildOptions(PREVIEW_MAX))
      if (!canvas) return
      canvas.toBlob((blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
        previewUrlRef.current = url
        setPreviewUrl(url)
      }, 'image/png')
    }, PREVIEW_DEBOUNCE)
    return () => clearTimeout(t)
  }, [buildOptions, images.length])

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
    }
  }, [])

  const handleDownload = () => {
    const canvas = buildCanvas(buildOptions())
    if (!canvas) return
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `collage-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(() => URL.revokeObjectURL(url), 2000)
    }, 'image/png')
  }

  const effGrid = autoGrid ? calcAutoGrid(images.length) : { cols, rows }
  const slots = layout === 'grid' ? effGrid.cols * effGrid.rows : null
  const overflow = slots !== null && images.length > slots
  const infoLabel =
    layout === 'grid'
      ? `${effGrid.cols} × ${effGrid.rows}`
      : layout === 'horizontal'
        ? `${images.length} في صف`
        : `${images.length} في عمود`

  return (
    <div
      dir="rtl"
      className="h-screen flex flex-col bg-bg text-primary font-sans overflow-hidden"
    >
      <NavBar
        hasImages={images.length > 0}
        onClear={clearAll}
        onDownload={handleDownload}
      />
      <main className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-4 p-4 overflow-hidden">
        <UploadPanel
          images={images}
          isDragging={isDragging}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onAddClick={() => inputRef.current?.click()}
          onFilesSelected={addFiles}
          onRemove={removeImage}
          inputRef={inputRef}
          overflow={overflow}
          slots={slots}
        />
        <PreviewPanel
          previewUrl={previewUrl}
          infoLabel={images.length > 0 ? infoLabel : ''}
        />
        <SettingsPanel
          imageCount={images.length}
          layout={layout}
          setLayout={setLayout}
          cols={cols}
          setCols={setCols}
          rows={rows}
          setRows={setRows}
          autoGrid={autoGrid}
          setAutoGrid={setAutoGrid}
          baseSize={baseSize}
          setBaseSize={setBaseSize}
          gap={gap}
          setGap={setGap}
          padding={padding}
          setPadding={setPadding}
          bgColor={bgColor}
          setBgColor={setBgColor}
          fitMode={fitMode}
          setFitMode={setFitMode}
          alignX={alignX}
          setAlignX={setAlignX}
          alignY={alignY}
          setAlignY={setAlignY}
        />
      </main>
    </div>
  )
}
