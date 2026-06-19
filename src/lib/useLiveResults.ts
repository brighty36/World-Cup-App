import { useCallback, useEffect, useRef, useState } from 'react'
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

  // Mirror the latest results in a ref so the stable fetch callback can tell
  // whether scores are already on screen without being recreated on every change.
  const resultsRef = useRef(results)
  useEffect(() => {
    resultsRef.current = results
  }, [results])

  const fetchAndApply = useCallback(async () => {
    try {
      const live = await fetchLiveResults()
      const haveExisting = Object.keys(resultsRef.current).length > 0
      if (Object.keys(live).length === 0 && !haveExisting) {
        // Reached the service but there are genuinely no results to show yet.
        setError('No live results available yet')
        return
      }
      if (Object.keys(live).length > 0) {
        setResults((prev) => {
          const merged = { ...prev, ...live }
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(merged))
          } catch {
            // localStorage unavailable - merged results still held in state
          }
          return merged
        })
      }
      // The fetch resolved, so we reached the service. Stamp the time (and clear
      // any prior error) so a refresh is visibly confirmed even when no newer
      // scores came back, rather than looking like it did nothing.
      setError(null)
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
