import type { ReactNode } from 'react'
import type { PdfDocumentSource } from '../types'
import { PdfDocumentSourceContext } from './pdfDocumentSourceContextValue'

export function PdfDocumentSourceProvider({
  value,
  children,
}: {
  value: PdfDocumentSource
  children: ReactNode
}) {
  return (
    <PdfDocumentSourceContext.Provider value={value}>
      {children}
    </PdfDocumentSourceContext.Provider>
  )
}
