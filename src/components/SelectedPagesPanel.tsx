import { useState } from 'react'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button, Card, Empty, Spin, message } from 'antd'
import {
  CloseOutlined,
  DownloadOutlined,
  HolderOutlined,
} from '@ant-design/icons'
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { usePdfDocumentSource } from '../hooks/usePdfDocumentSource'
import { toReactPdfFile } from '../reactPdf'
import { downloadMergedPdf } from '../lib/pdfMerge'
import type { PdfCutterLabels } from '../types'

const CARD_PREVIEW_WIDTH = 168

type Props = {
  pageNumbers: number[]
  onRemove: (pageNumber: number) => void
  onReorder: (pageNumbers: number[]) => void
  downloadFileName: string
  labels: Required<PdfCutterLabels>
}

function SortablePageCard({
  pageNumber,
  onRemove,
}: {
  pageNumber: number
  onRemove: (pageNumber: number) => void
}) {
  const file = usePdfDocumentSource()
  const id = String(pageNumber)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.55 : undefined,
    zIndex: isDragging ? 10 : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} className="w-[200px] shrink-0">
      <Card
        size="small"
        className={`shadow-sm ${isDragging ? 'ring-2 ring-violet-400' : ''}`}
        title={
          <span className="flex min-w-0 items-center gap-1 text-sm">
            <button
              type="button"
              className="touch-none cursor-grab rounded p-0.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 active:cursor-grabbing dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              aria-label="Drag to reorder"
              {...listeners}
              {...attributes}
            >
              <HolderOutlined />
            </button>
            <span className="truncate">Page {pageNumber}</span>
          </span>
        }
        extra={
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            aria-label={`Remove page ${pageNumber}`}
            onClick={() => onRemove(pageNumber)}
          >
            <CloseOutlined className="text-xs" />
          </button>
        }
      >
        <div className="flex justify-center rounded border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
          <Document
            file={toReactPdfFile(file)}
            loading={
              <div className="flex h-40 items-center justify-center">
                <Spin size="small" />
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              width={CARD_PREVIEW_WIDTH}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </Card>
    </div>
  )
}

export function SelectedPagesPanel({
  pageNumbers,
  onRemove,
  onReorder,
  downloadFileName,
  labels,
}: Props) {
  const file = usePdfDocumentSource()
  const [downloading, setDownloading] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = pageNumbers.findIndex((p) => String(p) === active.id)
    const newIndex = pageNumbers.findIndex((p) => String(p) === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    onReorder(arrayMove(pageNumbers, oldIndex, newIndex))
  }

  const handleDownloadMerged = async () => {
    if (pageNumbers.length === 0) return
    setDownloading(true)
    try {
      await downloadMergedPdf(file, pageNumbers, downloadFileName)
      message.success(
        `Downloaded ${pageNumbers.length} page${pageNumbers.length === 1 ? '' : 's'} as one PDF`,
      )
    } catch {
      message.error('Download failed. Try again.')
    } finally {
      setDownloading(false)
    }
  }

  if (pageNumbers.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Empty
          description={labels.emptyPanelDescription}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    )
  }

  const sortableIds = pageNumbers.map(String)

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/80">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {pageNumbers.length} page{pageNumbers.length === 1 ? '' : 's'} — drag{' '}
          <HolderOutlined className="mx-0.5 inline text-zinc-400" /> to reorder;
          export uses this order
        </p>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          loading={downloading}
          onClick={handleDownloadMerged}
        >
          {labels.downloadButton}
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={sortableIds} strategy={rectSortingStrategy}>
            <div className="flex flex-wrap gap-4">
              {pageNumbers.map((pageNumber) => (
                <SortablePageCard
                  key={pageNumber}
                  pageNumber={pageNumber}
                  onRemove={onRemove}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
