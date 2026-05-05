import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import {
  loadSelectedPagesFromStorage,
  saveSelectedPagesToStorage,
} from '../lib/persistSelectionStorage'

/**
 * Keeps selected page numbers in sync with `localStorage` when `storageKey` is set.
 * Remount the consuming component (e.g. `key={storageKey}`) when the key changes
 * so the initial list reloads from storage.
 */
export function usePersistedPageSelection(
  storageKey: string | null,
): [number[], Dispatch<SetStateAction<number[]>>] {
  const [pages, setPages] = useState<number[]>(() =>
    storageKey ? loadSelectedPagesFromStorage(storageKey) : [],
  )

  useEffect(() => {
    if (storageKey == null) return
    saveSelectedPagesToStorage(storageKey, pages)
  }, [storageKey, pages])

  return [pages, setPages]
}
