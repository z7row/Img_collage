// كل منطق الرسم هنا — عدّل بحرية

function drawCover(ctx, img, x, y, w, h) {
  const ir = img.width / img.height
  const tr = w / h
  let sx, sy, sw, sh
  if (ir > tr) {
    sh = img.height
    sw = sh * tr
    sx = (img.width - sw) / 2
    sy = 0
  } else {
    sw = img.width
    sh = sw / tr
    sx = 0
    sy = (img.height - sh) / 2
  }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h)
}

function drawContain(ctx, img, x, y, w, h, alignX, alignY) {
  const ir = img.width / img.height
  const tr = w / h
  let dw, dh
  if (ir > tr) {
    dw = w
    dh = w / ir
  } else {
    dh = h
    dw = h * ir
  }
  let dx = x
  let dy = y
  if (alignX === 'center') dx = x + (w - dw) / 2
  else if (alignX === 'end') dx = x + (w - dw)
  if (alignY === 'center') dy = y + (h - dh) / 2
  else if (alignY === 'end') dy = y + (h - dh)
  ctx.drawImage(img, dx, dy, dw, dh)
}

export function calcAutoGrid(n) {
  if (n <= 1) return { cols: 1, rows: 1 }
  const cols = Math.ceil(Math.sqrt(n))
  const rows = Math.ceil(n / cols)
  return { cols, rows }
}

export function buildCanvas(opts) {
  const {
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
    maxDim = null,
  } = opts

  if (!images.length) return null

  const effCols = autoGrid ? calcAutoGrid(images.length).cols : cols
  const effRows = autoGrid ? calcAutoGrid(images.length).rows : rows

  // في وضع "طبيعي" للصف/العمود تكون الخلايا متغيّرة الحجم
  // في أي وضع آخر تكون كل خلية مربعة بحجم baseSize
  const useFixedCells = layout === 'grid' || fitMode !== 'natural'

  const cells = []
  let totalW = 0
  let totalH = 0

  if (layout === 'horizontal') {
    const h = baseSize
    let x = padding
    for (const im of images) {
      const w = useFixedCells
        ? baseSize
        : Math.round((im.img.width / im.img.height) * h)
      cells.push({
        img: im.img,
        x,
        y: padding,
        w,
        h,
        fit: fitMode === 'natural' ? 'natural' : fitMode,
      })
      x += w + gap
    }
    totalW = x - gap + padding
    totalH = padding * 2 + h
  } else if (layout === 'vertical') {
    const w = baseSize
    let y = padding
    for (const im of images) {
      const h = useFixedCells
        ? baseSize
        : Math.round((im.img.height / im.img.width) * w)
      cells.push({
        img: im.img,
        x: padding,
        y,
        w,
        h,
        fit: fitMode === 'natural' ? 'natural' : fitMode,
      })
      y += h + gap
    }
    totalW = padding * 2 + w
    totalH = y - gap + padding
  } else {
    const cell = baseSize
    totalW = padding * 2 + effCols * cell + gap * Math.max(0, effCols - 1)
    totalH = padding * 2 + effRows * cell + gap * Math.max(0, effRows - 1)
    const cap = effCols * effRows
    images.slice(0, cap).forEach((im, i) => {
      const r = Math.floor(i / effCols)
      const c = i % effCols
      cells.push({
        img: im.img,
        x: padding + c * (cell + gap),
        y: padding + r * (cell + gap),
        w: cell,
        h: cell,
        fit: fitMode === 'natural' ? 'cover' : fitMode,
      })
    })
  }

  const scale =
    maxDim != null ? Math.min(1, maxDim / Math.max(totalW, totalH)) : 1

  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(totalW * scale))
  canvas.height = Math.max(1, Math.round(totalH * scale))
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (const c of cells) {
    const cx = c.x * scale
    const cy = c.y * scale
    const cw = c.w * scale
    const ch = c.h * scale
    if (c.fit === 'natural') ctx.drawImage(c.img, cx, cy, cw, ch)
    else if (c.fit === 'cover') drawCover(ctx, c.img, cx, cy, cw, ch)
    else drawContain(ctx, c.img, cx, cy, cw, ch, alignX, alignY)
  }

  return canvas
}
