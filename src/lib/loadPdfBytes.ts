import type { PdfDocumentSource } from '../types'

/**
 * Load PDF bytes for `pdf-lib` / merging. For URL strings, performs `fetch`.
 */
export async function loadPdfBytes(
  source: PdfDocumentSource,
): Promise<ArrayBuffer | Uint8Array> {
  if (typeof source === 'string') {
    const res = await fetch(source)
    if (!res.ok) {
      throw new Error(`Failed to fetch PDF (${res.status})`)
    }
    return res.arrayBuffer()
  }
  if (source instanceof File) {
    return source.arrayBuffer()
  }
  if (source instanceof ArrayBuffer) {
    return source
  }
  return source
}
