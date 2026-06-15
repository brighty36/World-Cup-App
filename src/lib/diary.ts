import { useState } from 'react'

export type WatchedStatus = 'full' | 'extended-highlights' | 'short-highlights' | null

export interface DiaryEntry {
  watched: WatchedStatus
  notes: string
}

const DEFAULT_ENTRY: DiaryEntry = { watched: null, notes: '' }

function storageKey(fixtureId: string): string {
  return `wc26-diary-${fixtureId}`
}

function loadEntry(fixtureId: string): DiaryEntry {
  try {
    const raw = localStorage.getItem(storageKey(fixtureId))
    return raw ? { ...DEFAULT_ENTRY, ...JSON.parse(raw) } : { ...DEFAULT_ENTRY }
  } catch {
    return { ...DEFAULT_ENTRY }
  }
}

/** Per-fixture diary entry (watched status + notes), persisted to localStorage. */
export function useDiaryEntry(fixtureId: string) {
  const [entry, setEntry] = useState<DiaryEntry>(() => loadEntry(fixtureId))

  const update = (patch: Partial<DiaryEntry>) => {
    setEntry((prev) => {
      const next = { ...prev, ...patch }
      try {
        localStorage.setItem(storageKey(fixtureId), JSON.stringify(next))
      } catch {
        // localStorage unavailable (e.g. private browsing) - entry won't persist
      }
      return next
    })
  }

  return [entry, update] as const
}
