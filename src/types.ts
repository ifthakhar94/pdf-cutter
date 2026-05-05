import type { ConfigProviderProps } from 'antd'

/** Supported sources for `react-pdf` `file` and merge helpers. */
export type PdfDocumentSource = string | File | ArrayBuffer | Uint8Array

export type PdfCutterLabels = {
  sidebarTitle?: string
  emptyPanelDescription?: string
  downloadButton?: string
}

export type PdfCutterProps = {
  /** PDF to display and export from (URL, `File`, or binary). */
  file: PdfDocumentSource | null
  /**
   * Stable id for `localStorage` when persisting selection.
   * Defaults are derived from the URL, `File` metadata, or byte length.
   */
  persistenceId?: string
  /** Persist selected page order in `localStorage` (default: `true` when `file` is set). */
  persistSelection?: boolean
  /** Download filename without `.pdf`. */
  downloadFileName?: string
  /** Optional UI copy. */
  labels?: PdfCutterLabels
  /** Forwarded to Ant Design `ConfigProvider` when `wrapWithAntdConfigProvider` is `true`. */
  antdConfigProviderProps?: ConfigProviderProps
  /**
   * Wrap the workspace in `ConfigProvider` (default: `true`).
   * Set `false` if your app already wraps Ant Design at the root.
   */
  wrapWithAntdConfigProvider?: boolean
  /** Root element class names (Tailwind-friendly). */
  className?: string
}
