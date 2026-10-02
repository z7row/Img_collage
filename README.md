# Image Collage

> A fast, minimal web tool that combines multiple images into a single downloadable PNG — with a full RTL Arabic UI, styled with the **Dark Tech Sharp** design system by [Zero to UI](https://designmd.info).

---

## Features

- **Three layouts** — Horizontal (single row), Vertical (single column), or a customizable Grid.
- **Auto grid** — Calculates optimal columns and rows based on image count (perfect square).
- **Three image fit modes:**
  - `Natural` — Original aspect ratio, no cropping and no letterboxing (row/column only).
  - `Contain` — The full image fits inside a fixed cell, with horizontal and vertical alignment.
  - `Cover` — Image fills the entire cell, cropping the overflow from the center.
- **Full style control** — Cell size, gap between images, outer padding, and background color (with presets).
- **Drag & drop** upload, plus a thumbnail list with individual removal.
- **Live preview** with debounce, and final PNG download at full resolution.
- **100% local** — Images never leave the browser. No uploads, no server.
- **Optimized performance** — Preview is rendered at a capped resolution (≤ 1600px); download uses the full resolution.

---

## Tech Stack

| Tech | Version | Purpose |
|---|---|---|
| [Vite](https://vitejs.dev) | 5+ | Build tool & dev server |
| [React](https://react.dev) | 18 | UI library |
| [Tailwind CSS](https://tailwindcss.com) | 3.4 | Styling |
| [lucide-react](https://lucide.dev) | latest | Icons |
| Canvas API | — | Image composition & export |

---

## Getting Started

Requires **Node.js ≥ 18**.

```bash
git clone <repo-url> image-collage
cd image-collage
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

The output goes to the `dist/` folder.

---

## How to Use

1. **Add images** — Drag them into the upload area, or click it to pick from your device.
2. **Pick a layout** from the right panel:
   - `Horizontal` — all images in a single row.
   - `Vertical` — all images in a single column.
   - `Grid` — with either **Auto grid** or manual columns and rows.
3. **Choose an image fit mode**:
   - `Contain` shows the full image without cropping; adjust horizontal and vertical alignment.
   - `Cover` fills the cell entirely, cropping the overflow.
   - `Natural` keeps the original aspect ratio (row/column only).
4. **Fine-tune the style** — cell size, gap, padding, and background color.
5. **Download** using the button at the top right — a full-resolution PNG is saved.

> **Note:** In `Grid` mode, only `columns × rows` images are rendered. Extra images are skipped, and a notice appears in the image list.

---

## Project Structure

```
image-collage/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── Section.jsx           # Reusable panel wrapper
│   │   ├── fields/
│   │   │   ├── NumberField.jsx       # Numeric input with − / + buttons
│   │   │   ├── RangeField.jsx        # Slider with live value
│   │   │   ├── SegmentedControl.jsx  # Multi-option toggle group
│   │   │   └── Toggle.jsx            # On/off switch
│   │   ├── NavBar.jsx                # Top bar (title + download + clear)
│   │   ├── UploadPanel.jsx           # Left column: image upload
│   │   ├── PreviewPanel.jsx          # Center column: live preview
│   │   └── SettingsPanel.jsx         # Right column: settings
│   ├── lib/
│   │   ├── collage.js                # Canvas drawing logic
│   │   └── constants.js              # Constants and option lists
│   ├── App.jsx                       # Root state & composition
│   ├── index.css                     # Tailwind + global styles
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── postcss.config.cjs
└── package.json
```

---

## Where to Change What

| I want to change... | File |
|---|---|
| Layout / fit mode / alignment options | `src/lib/constants.js` |
| Canvas drawing logic (crop, align, auto grid) | `src/lib/collage.js` |
| Input fields (number, slider, toggle, …) | `src/components/fields/` |
| Right panel copy and controls | `src/components/SettingsPanel.jsx` |
| Left panel copy (upload area) | `src/components/UploadPanel.jsx` |
| Default app state | `src/App.jsx` |
| Colors and fonts | `tailwind.config.js` + `src/index.css` |

---

## Design System

This project follows **Dark Tech Sharp** — a dark UI system built for developer tools and SaaS products.

- **Background** `#0A0A0A` — Soft black that reduces eye strain.
- **Surfaces** `#141414` / `#1C1C1C` — Quiet layered cards and states.
- **Borders** `#2A2A2A` — Depth is expressed through borders, never shadows.
- **Accent** `#FFFFFF` — Reserved for primary actions and active states.
- **Type** `Inter` for UI, `JetBrains Mono` for code.

Full reference: [`DESIGN.md`](https://designmd.info) — by Zero to UI.

---

## License

This project is licensed under the [MIT License](LICENSE).

The Dark Tech Sharp design system is by [Zero to UI](https://designmd.info) — free to use, adapt, and share.

