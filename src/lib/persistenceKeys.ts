import type { PdfDocumentSource } from '../types'

export const SELECTION_STORAGE_NAMESPACE = 'pdf-cutter'

/** Default stable id used for storage keys when `persistenceId` is not provided. */
export function getDefaultPersistenceId(source: PdfDocumentSource): string {
  if (typeof source === 'string') {
    return source
  }
  if (source instanceof File) {
    return `file:${source.name}:${source.size}:${source.lastModified}`
  }
  return `bin:${source.byteLength}`
}

function encodeKeySegment(id: string): string {
  try {
    return btoa(encodeURIComponent(id)).replace(/=+$/, '')
  } catch {
    return `len:${id.length}`
  }
}

/** Full `localStorage` key for the selected page list. */
export function buildSelectionStorageKey(
  persistenceId: string,
  namespace = SELECTION_STORAGE_NAMESPACE,
): string {
  return `${namespace}:selected-pages:v1:${encodeKeySegment(persistenceId)}`
}
