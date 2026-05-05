import './styles/pdf-cutter.css'

export { PdfCutter } from './PdfCutter'
export type { PdfCutterLabels, PdfCutterProps, PdfDocumentSource } from './types'

export { configurePdfWorker } from './pdf/setupPdfWorker'
export type { ConfigurePdfWorkerOptions } from './pdf/setupPdfWorker'

export { mergePdfPagesToBytes, downloadMergedPdf } from './lib/pdfMerge'
export { loadPdfBytes } from './lib/loadPdfBytes'
export {
  buildSelectionStorageKey,
  getDefaultPersistenceId,
  SELECTION_STORAGE_NAMESPACE,
} from './lib/persistenceKeys'
export {
  loadSelectedPagesFromStorage,
  saveSelectedPagesToStorage,
} from './lib/persistSelectionStorage'

export { usePersistedPageSelection } from './hooks/usePersistedPageSelection'

export { PdfDocumentSourceProvider } from './context/PdfDocumentSourceProvider'
export { usePdfDocumentSource } from './hooks/usePdfDocumentSource'

export { PdfPageSidebar } from './components/PdfPageSidebar'
export { SelectedPagesPanel } from './components/SelectedPagesPanel'
export { ExportedWatermark } from './components/ExportedWatermark'
