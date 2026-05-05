import type { DocumentProps } from 'react-pdf'
import type { PdfDocumentSource } from './types'

/**
 * `react-pdf` typings narrow `file`; runtime accepts URL strings, `ArrayBuffer`, etc.
 */
export function toReactPdfFile(
  source: PdfDocumentSource,
): NonNullable<DocumentProps['file']> {
  return source as NonNullable<DocumentProps['file']>
}
