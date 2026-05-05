function parseStored(value: string | null): number[] {
  if (value == null || value === '') return []
  try {
    const data = JSON.parse(value) as unknown
    if (!Array.isArray(data)) return []
    return data.filter(
      (n): n is number =>
        typeof n === 'number' && Number.isInteger(n) && n > 0,
    )
  } catch {
    return []
  }
}

export function loadSelectedPagesFromStorage(storageKey: string): number[] {
  if (typeof window === 'undefined') return []
  return parseStored(window.localStorage.getItem(storageKey))
}

export function saveSelectedPagesToStorage(
  storageKey: string,
  pages: number[],
): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(storageKey, JSON.stringify(pages))
}
