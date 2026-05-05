import { Fragment, useCallback, useMemo } from 'react'
import { ConfigProvider, Empty, theme } from 'antd'
import { PdfPageSidebar } from './components/PdfPageSidebar'
import { SelectedPagesPanel } from './components/SelectedPagesPanel'
import { PdfDocumentSourceProvider } from './context/PdfDocumentSourceProvider'
import { usePersistedPageSelection } from './hooks/usePersistedPageSelection'
import {
  buildSelectionStorageKey,
  getDefaultPersistenceId,
} from './lib/persistenceKeys'
import type { PdfCutterLabels, PdfCutterProps, PdfDocumentSource } from './types'

const defaultLabels: Required<PdfCutterLabels> = {
  sidebarTitle: 'Pages',
  emptyPanelDescription: 'Click a page in the sidebar to add it here',
  downloadButton: 'Download as one PDF',
}

type WorkspaceProps = {
  file: PdfDocumentSource
  storageKey: string | null
  downloadFileName: string
  labels: Required<PdfCutterLabels>
}

function PdfCutterWorkspace({
  file,
  storageKey,
  downloadFileName,
  labels,
}: WorkspaceProps) {
  const [pickedPages, setPickedPages] = usePersistedPageSelection(storageKey)

  const handlePageClick = useCallback((pageNumber: number) => {
    setPickedPages((prev) =>
      prev.includes(pageNumber) ? prev : [...prev, pageNumber],
    )
  }, [setPickedPages])

  const handleRemovePage = useCallback(
    (pageNumber: number) => {
      setPickedPages((prev) => prev.filter((p) => p !== pageNumber))
    },
    [setPickedPages],
  )

  const handleReorderPages = useCallback(
    (pages: number[]) => {
      setPickedPages(pages)
    },
    [setPickedPages],
  )

  return (
    <PdfDocumentSourceProvider value={file}>
      <Fragment>
        <aside className="flex w-28 shrink-0 flex-col border-r border-zinc-200 dark:border-zinc-800 sm:w-32">
          <div className="shrink-0 border-b border-zinc-200 px-2 py-1.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            {labels.sidebarTitle}
          </div>
          <PdfPageSidebar
            selectedPages={pickedPages}
            onPageClick={handlePageClick}
          />
        </aside>
        <main className="min-h-0 min-w-0 flex-1 bg-zinc-50 dark:bg-zinc-950">
          <SelectedPagesPanel
            pageNumbers={pickedPages}
            onRemove={handleRemovePage}
            onReorder={handleReorderPages}
            downloadFileName={downloadFileName}
            labels={labels}
          />
        </main>
      </Fragment>
    </PdfDocumentSourceProvider>
  )
}

export function PdfCutter({
  file,
  persistenceId,
  persistSelection = true,
  downloadFileName = 'pdf-cutter-selection',
  labels: labelsProp,
  antdConfigProviderProps,
  wrapWithAntdConfigProvider = true,
  className = '',
}: PdfCutterProps) {
  const labels = useMemo(
    () => ({ ...defaultLabels, ...labelsProp }),
    [labelsProp],
  )

  const storageKey = useMemo(() => {
    if (file == null || !persistSelection) return null
    const id = persistenceId ?? getDefaultPersistenceId(file)
    return buildSelectionStorageKey(id)
  }, [file, persistSelection, persistenceId])

  const remountKey = useMemo(() => {
    if (file == null) return 'empty'
    return storageKey ?? `__np__:${getDefaultPersistenceId(file)}`
  }, [file, storageKey])

  const workspace = (
    <div
      className={`flex h-full min-h-[320px] w-full bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 ${className}`}
    >
      {file == null ? (
        <div className="flex flex-1 items-center justify-center p-6">
          <Empty description="Provide a PDF via the file prop" />
        </div>
      ) : (
        <PdfCutterWorkspace
          key={remountKey}
          file={file}
          storageKey={storageKey}
          downloadFileName={downloadFileName}
          labels={labels}
        />
      )}
    </div>
  )

  if (!wrapWithAntdConfigProvider) {
    return workspace
  }

  return (
    <ConfigProvider
      theme={{ algorithm: theme.defaultAlgorithm }}
      {...antdConfigProviderProps}
    >
      {workspace}
    </ConfigProvider>
  )
}
