import { pdfjs } from 'react-pdf'

export type ConfigurePdfWorkerOptions = {
  /**
   * Custom worker URL. Defaults to unpkg for the installed `pdfjs-dist` version
   * so library consumers do not need bundler-specific worker wiring.
   */
  workerSrc?: string
}

/**
 * Call once at app startup (e.g. in `main.tsx`) before rendering any `react-pdf` `Document`.
 */
export function configurePdfWorker(options?: ConfigurePdfWorkerOptions): void {
  pdfjs.GlobalWorkerOptions.workerSrc =
    options?.workerSrc ??
    `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
}
