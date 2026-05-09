# @ifthakhar8/pdf-cutter

React PDF cutter UI: preview pages, pick pages, reorder with drag-and-drop, persist selection, and export selected pages as one merged PDF.

## Live demo

**Playground:** [pdf-cutter-chi.vercel.app](https://pdf-cutter-chi.vercel.app/)

**Screenshot (Lightshot):** [prnt.sc/u8uYP3q9Ac_e](https://prnt.sc/u8uYP3q9Ac_e)

Preview (bundled in repo for GitHub / npm):

![PDF Cutter playground — sidebar pages and selection panel](./docs/playground-screenshot.png)

## Features

- Left sidebar with page thumbnails (`react-pdf`)
- Hover popover preview for each page
- Click-to-select pages into right panel
- Drag-and-drop reorder selected pages (`@dnd-kit`)
- "Exported" watermark on selected pages in sidebar
- Single merged PDF download (`pdf-lib`)
- Optional localStorage persistence of selected page order

## Install

```bash
npm i @ifthakhar8/pdf-cutter
```

Required peer dependencies in your app:

```bash
npm i react react-dom antd @ant-design/icons react-pdf pdf-lib @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

## Quick Start

```tsx
import { PdfCutter, configurePdfWorker } from '@ifthakhar8/pdf-cutter'
import '@ifthakhar8/pdf-cutter/styles.css'

configurePdfWorker()

export function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <PdfCutter file="/sample.pdf" />
    </div>
  )
}
```

## Props (`PdfCutter`)

- `file`: `string | File | ArrayBuffer | Uint8Array | null`
- `persistenceId?`: string key for localStorage identity
- `persistSelection?`: boolean (default `true` when file exists)
- `downloadFileName?`: output file base name (default `pdf-cutter-selection`)
- `labels?`: `{ sidebarTitle?, emptyPanelDescription?, downloadButton? }`
- `antdConfigProviderProps?`: pass-through Ant Design ConfigProvider props
- `wrapWithAntdConfigProvider?`: boolean (default `true`)
- `className?`: root container className

## Exports

- `PdfCutter`
- `configurePdfWorker`
- `mergePdfPagesToBytes`
- `downloadMergedPdf`
- `loadPdfBytes`
- `usePersistedPageSelection`
- `buildSelectionStorageKey`
- `getDefaultPersistenceId`
- `loadSelectedPagesFromStorage`
- `saveSelectedPagesToStorage`
- `PdfDocumentSourceProvider`
- `usePdfDocumentSource`
- `PdfPageSidebar`
- `SelectedPagesPanel`
- `ExportedWatermark`

## Tailwind Note

This package ships a prebuilt stylesheet at:

```ts
import '@ifthakhar8/pdf-cutter/styles.css'
```

If your setup needs explicit source scanning:

```css
@source "../node_modules/@ifthakhar8/pdf-cutter/dist/index.js";
```

## Troubleshooting

- If PDF pages do not render, call `configurePdfWorker()` once at app startup.
- If npm page still shows "no README", publish a new version after updating this file:

```bash
npm version patch
npm publish --access public
```

## License

MIT
