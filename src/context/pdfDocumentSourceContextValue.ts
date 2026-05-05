import { createContext } from 'react'
import type { PdfDocumentSource } from '../types'

export const PdfDocumentSourceContext =
  createContext<PdfDocumentSource | null>(null)
