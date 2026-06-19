import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { fixtures } from './data/fixtures'
import { useLiveResults } from './lib/useLiveResults'
import { formatRelativeTime } from './lib/relativeTime'
import { formatDayHeading, getMatchDay, matchDayKey } from './lib/matchday'
import FixtureCard from './components/FixtureCard'
import CompletedFixtureCard from './components/CompletedFixtureCard'

const GROUPS = Array.from(new Set(fixtures.map((f) => f.group))).sort()

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 4h10v4a5 5 0 0 1-10 0V4Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M7 5H4.5A1.5 1.5 0 0 0 3 6.5C3 9 5 10.5 7 10.5M17 5h2.5A1.5 1.5 0 0 1 21 6.5C21 9 19 10.5 17 10.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 13v3m-3 4h6m-5 0c0-1.5 1-2 2-2s2 .5 2 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function App() {
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming')
  const [search, setSearch] = useState('')
  const [group, setGroup] = useState('all')
  const todayRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  const { results, lastUpdated, loading, error, refresh } = useLiveResults()

  const todayKey = matchDayKey(new Date().toISOString())

  // Measure the sticky header so day headings can stick directly beneath it,
  // regardless of how tall the header grows (tabs/filters change its height).
  useLayoutEffect(() => {
    const el = headerRef.current
    if (!el) return
    const update = () => setHeaderHeight(el.offsetHeight)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const upcomingFixtures = useMemo(() => fixtures.filter((f) => !results[f.id]), [results])

  const completedFixtures = useMemo(
    () =>
      fixtures
        .filter((f) => results[f.id])
        .sort((a, b) => new Date(b.utcKickoff).getTime() - new Date(a.utcKickoff).getTime()),
    [results],
  )

  const days = useMemo(() => {
    const filtered = upcomingFixtures.filter((f) => {
      if (group !== 'all' && f.group !== group) return false
      if (search) {
        const q = search.trim().toLowerCase()
        const haystack = `${f.homeTeam} ${f.awayTeam} ${f.venue} ${f.city}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })

    const sorted = [...filtered].sort(
      (a, b) => new Date(a.utcKickoff).getTime() - new Date(b.utcKickoff).getTime(),
    )

    const map = new Map<string, { date: Date; fixtures: typeof fixtures }>()
    for (const fixture of sorted) {
      const key = matchDayKey(fixture.utcKickoff)
      if (!map.has(key)) {
        map.set(key, { date: getMatchDay(fixture.utcKickoff), fixtures: [] })
      }
      map.get(key)!.fixtures.push(fixture)
    }
    return Array.from(map.entries()).map(([key, value]) => ({ key, ...value }))
  }, [search, group, upcomingFixtures])

  const scrollToToday = () => {
    todayRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const tabClasses = (active: boolean) =>
    `px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${
      active ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-100 hover:text-white'
    }`

  return (
    <div className="min-h-svh bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <header
        ref={headerRef}
        className="sticky top-0 z-20 app-header text-white shadow-lg"
      >
        <div className="max-w-2xl mx-auto px-4 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 shadow-inner backdrop-blur-sm">
              <TrophyIcon className="h-6 w-6 text-amber-300" />
            </span>
            <div className="min-w-0">
              <h1 className="text-xl font-extrabold tracking-tight leading-none">
                World Cup <span className="text-amber-300">2026</span>
              </h1>
              <p className="mt-1 text-xs font-semibold text-emerald-50">
                Canada · Mexico · USA — kickoffs in UK time
              </p>
            </div>
          </div>
          <p className="mt-2 text-[11px] leading-snug text-emerald-100/85">
            Each day runs 4am&nbsp;&ndash;&nbsp;4am, so late-night games appear with the evening
            before.
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-4 pb-3">
          <div className="inline-flex rounded-xl bg-emerald-950/30 p-1 ring-1 ring-white/10">
            <button onClick={() => setTab('upcoming')} className={tabClasses(tab === 'upcoming')}>
              Upcoming
            </button>
            <button onClick={() => setTab('completed')} className={tabClasses(tab === 'completed')}>
              Completed
            </button>
          </div>
        </div>

        {tab === 'upcoming' && (
          <div className="max-w-2xl mx-auto px-4 pb-3 flex gap-2">
            <div className="relative flex-1 min-w-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-200"
              >
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search team, venue or city…"
                className="w-full rounded-lg pl-9 pr-3 py-2 text-sm bg-white/15 placeholder-emerald-200 text-white ring-1 ring-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>
            <select
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              className="rounded-lg px-2 py-2 text-sm bg-white/15 text-white ring-1 ring-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300 [&>option]:text-gray-900"
            >
              <option value="all">All groups</option>
              {GROUPS.map((g) => (
                <option key={g} value={g}>
                  Group {g}
                </option>
              ))}
            </select>
            <button
              onClick={scrollToToday}
              className="rounded-lg px-3 py-2 text-sm font-bold bg-amber-300 text-emerald-950 hover:bg-amber-200 transition-colors"
            >
              Today
            </button>
          </div>
        )}

        {tab === 'completed' && (
          <div className="max-w-2xl mx-auto px-4 pb-3 flex items-center justify-between gap-2">
            <span className="flex-1 text-xs font-medium text-emerald-50/90">
              {loading
                ? 'Updating scores…'
                : error
                  ? error
                  : lastUpdated
                    ? `Scores updated ${formatRelativeTime(lastUpdated)}`
                    : 'Scores not yet updated'}
            </span>
            <button
              onClick={refresh}
              disabled={loading}
              className="shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-bold bg-amber-300 text-emerald-950 hover:bg-amber-200 transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating…' : 'Refresh'}
            </button>
          </div>
        )}
      </header>

      <main className="max-w-2xl mx-auto pb-10">
        {tab === 'upcoming' ? (
          <>
            {days.length === 0 && (
              <p className="text-center text-gray-500 py-10">No fixtures match your search.</p>
            )}
            {days.map(({ key, date, fixtures: dayFixtures }, i) => (
              <section
                key={key}
                ref={key === todayKey ? todayRef : undefined}
                className="animate-rise"
                style={{ animationDelay: `${Math.min(i, 6) * 45}ms` }}
              >
                <h2
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wide sticky shadow-sm ${
                    key === todayKey
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200/95 text-gray-600 backdrop-blur dark:bg-gray-800/95 dark:text-gray-300'
                  }`}
                  style={{ top: headerHeight }}
                >
                  {formatDayHeading(date)}
                  {key === todayKey && <span className="ml-2 font-normal">· Today</span>}
                </h2>
                <ul>
                  {dayFixtures.map((fixture) => (
                    <FixtureCard key={fixture.id} fixture={fixture} />
                  ))}
                </ul>
              </section>
            ))}

            <p className="px-4 pt-6 text-xs text-gray-400 dark:text-gray-600">
              Fixture details (especially venues) are compiled from public schedules and may
              change &mdash; double-check against the official FIFA fixture list and BBC/ITV
              listings nearer the time.
            </p>
          </>
        ) : (
          <>
            {completedFixtures.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No completed matches yet.</p>
            ) : (
              <ul className="animate-rise">
                {completedFixtures.map((fixture) => (
                  <CompletedFixtureCard key={fixture.id} fixture={fixture} result={results[fixture.id]} />
                ))}
              </ul>
            )}

            <p className="px-4 pt-6 text-xs text-gray-400 dark:text-gray-600">
              Your watch status and notes are stored only on this device.
            </p>
          </>
        )}
      </main>
    </div>
  )
}

export default App
