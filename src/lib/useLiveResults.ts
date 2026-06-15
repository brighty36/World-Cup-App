import { useCallback, useEffect, useState } from 'react'
import { results as fallbackResults, type ResultsMap } from './results'
import { fetchLiveResults } from './liveResults'

const CACHE_KEY = 'wc2026-live-results'
const CACHE_TIME_KEY = 'wc2026-live-results-updated'

function loadCachedResults(): ResultsMap | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? (JSON.parse(raw) as ResultsMap) : null
  } catch {
    return null
  }
}

function loadCachedTime(): Date | null {
  try {
    const raw = localStorage.getItem(CACHE_TIME_KEY)
    return raw ? new Date(raw) : null
  } catch {
    return null
  }
}

/** Live match results, fetched from TheSportsDB and cached for offline use. */
export function useLiveResults() {
  const [results, setResults] = useState<ResultsMap>(() => loadCachedResults() ?? fallbackResults)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(() => loadCachedTime())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAndApply = useCallback(async () => {
    try {
      const live = await fetchLiveResults()
      if (Object.keys(live).length === 0) {
        setError('No live results available yet')
        return
      }
      setResults((prev) => {
        const merged = { ...prev, ...live }
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(merged))
        } catch {
          // localStorage unavailable - merged results still held in state
        }
        return merged
      })
      const now = new Date()
      setLastUpdated(now)
      try {
        localStorage.setItem(CACHE_TIME_KEY, now.toISOString())
      } catch {
        // localStorage unavailable - lastUpdated still held in state
      }
    } catch {
      setError('Could not reach the live results service')
    } finally {
      setLoading(false)
    }
  }, [])

  const refresh = useCallback(() => {
    setLoading(true)
    setError(null)
    void fetchAndApply()
  }, [fetchAndApply])

  useEffect(() => {
    // Fetching on mount and updating state once results arrive is the
    // standard data-fetching effect pattern (https://react.dev/learn/synchronizing-with-effects#fetching-data).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchAndApply()
  }, [fetchAndApply])

  return { results, lastUpdated, loading, error, refresh }
}
