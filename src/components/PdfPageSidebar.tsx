import { useState } from 'react'
import { Popover, Spin } from 'antd'
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import type { PdfDocumentSource } from '../types'
import { toReactPdfFile } from '../reactPdf'
import { usePdfDocumentSource } from '../hooks/usePdfDocumentSource'
import { ExportedWatermark } from './ExportedWatermark'

const THUMB_WIDTH = 72
const PREVIEW_WIDTH = 340

type Props = {
  selectedPages: number[]
  onPageClick: (pageNumber: number) => void
}

function PagePreview({
  pageNumber,
  file,
  showExportedWatermark,
}: {
  pageNumber: number
  file: PdfDocumentSource
  showExportedWatermark: boolean
}) {
  return (
    <div className="relative inline-block">
      <Document
        file={toReactPdfFile(file)}
        loading={
          <div className="flex justify-center py-8">
            <Spin size="small" />
          </div>
        }
      >
        <Page
          pageNumber={pageNumber}
          width={PREVIEW_WIDTH}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      {showExportedWatermark ? <ExportedWatermark large /> : null}
    </div>
  )
}

function PageThumbnail({
  pageNumber,
  isSelected,
  onPageClick,
}: {
  pageNumber: number
  isSelected: boolean
  onPageClick: (pageNumber: number) => void
}) {
  const file = usePdfDocumentSource()

  return (
    <Popover
      trigger="hover"
      placement="right"
      mouseEnterDelay={0.12}
      mouseLeaveDelay={0.05}
      overlayInnerStyle={{ padding: 8 }}
      content={
        <div className="max-h-[80vh] overflow-auto rounded border border-zinc-200 bg-white shadow-sm dark:border-zinc-600 dark:bg-zinc-900">
          <PagePreview
            pageNumber={pageNumber}
            file={file}
            showExportedWatermark={isSelected}
          />
        </div>
      }
    >
      <div
        role="button"
        tabIndex={0}
        className={`mb-2 cursor-pointer rounded border bg-white p-0.5 shadow-sm transition-shadow last:mb-0 dark:bg-zinc-800 ${
          isSelected
            ? 'border-violet-500 ring-2 ring-violet-400/60 dark:border-violet-400'
            : 'border-zinc-200 hover:border-violet-400 hover:shadow-md dark:border-zinc-600 dark:hover:border-violet-500'
        }`}
        onClick={() => onPageClick(pageNumber)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onPageClick(pageNumber)
          }
        }}
      >
        <div className="relative">
          <Document
            file={toReactPdfFile(file)}
            loading={<div className="h-24 w-[72px] animate-pulse bg-zinc-200 dark:bg-zinc-700" />}
          >
            <Page
              pageNumber={pageNumber}
              width={THUMB_WIDTH}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
          {isSelected ? <ExportedWatermark /> : null}
        </div>
      </div>
    </Popover>
  )
}

export function PdfPageSidebar({ selectedPages, onPageClick }: Props) {
  const file = usePdfDocumentSource()
  const [numPages, setNumPages] = useState<number | null>(null)

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-zinc-100 dark:bg-zinc-900">
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2 py-2">
        <Document
          file={toReactPdfFile(file)}
          loading={
            <div className="flex justify-center py-12">
              <Spin />
            </div>
          }
          onLoadSuccess={({ numPages: n }) => setNumPages(n)}
        >
          {numPages
            ? Array.from({ length: numPages }, (_, i) => {
                const n = i + 1
                return (
                  <PageThumbnail
                    key={n}
                    pageNumber={n}
                    isSelected={selectedPages.includes(n)}
                    onPageClick={onPageClick}
                  />
                )
              })
            : null}
        </Document>
      </div>
    </div>
  )
}
