import { PDFDocument } from 'pdf-lib'
import type { PdfDocumentSource } from '../types'
import { loadPdfBytes } from './loadPdfBytes'

/**
 * Build a new PDF containing only the given 1-based page numbers, in order.
 */
export async function mergePdfPagesToBytes(
  source: PdfDocumentSource,
  oneBasedPageNumbers: number[],
): Promise<Uint8Array> {
  if (oneBasedPageNumbers.length === 0) {
    throw new Error('No pages selected.')
  }
  const raw = await loadPdfBytes(source)
  const src = await PDFDocument.load(raw)
  const out = await PDFDocument.create()
  const zeroBased = oneBasedPageNumbers.map((n) => n - 1)
  const copied = await out.copyPages(src, zeroBased)
  copied.forEach((page) => out.addPage(page))
  return out.save()
}

/** Merge selected pages and trigger a browser download. */
export async function downloadMergedPdf(
  source: PdfDocumentSource,
  oneBasedPageNumbers: number[],
  downloadBaseName = 'pdf-cutter-selection',
): Promise<void> {
  const bytes = await mergePdfPagesToBytes(source, oneBasedPageNumbers)
  const blob = new Blob([new Uint8Array(bytes)], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${downloadBaseName}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}
