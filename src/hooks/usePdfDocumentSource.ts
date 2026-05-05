import { useContext } from 'react'
import { PdfDocumentSourceContext } from '../context/pdfDocumentSourceContextValue'
import type { PdfDocumentSource } from '../types'

export function usePdfDocumentSource(): PdfDocumentSource {
  const ctx = useContext(PdfDocumentSourceContext)
  if (ctx == null) {
    throw new Error(
      'usePdfDocumentSource must be used within PdfDocumentSourceProvider',
    )
  }
  return ctx
}
