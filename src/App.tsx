import { useMemo, useRef, useState } from 'react'
import { fixtures } from './data/fixtures'
import { formatDayHeading, getMatchDay, matchDayKey } from './lib/matchday'
import FixtureCard from './components/FixtureCard'
import CompletedFixtureCard from './components/CompletedFixtureCard'

const GROUPS = Array.from(new Set(fixtures.map((f) => f.group))).sort()

function App() {
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming')
  const [search, setSearch] = useState('')
  const [group, setGroup] = useState('all')
  const todayRef = useRef<HTMLDivElement>(null)

  const todayKey = matchDayKey(new Date().toISOString())

  const upcomingFixtures = useMemo(() => fixtures.filter((f) => !f.result), [])

  const completedFixtures = useMemo(
    () =>
      fixtures
        .filter((f) => f.result)
        .sort((a, b) => new Date(b.utcKickoff).getTime() - new Date(a.utcKickoff).getTime()),
    [],
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

  return (
    <div className="min-h-svh bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-10 bg-emerald-900 text-white shadow">
        <div className="max-w-2xl mx-auto px-4 pt-4 pb-3">
          <h1 className="text-xl font-bold">World Cup 2026 Fixtures</h1>
          <p className="text-emerald-200 text-sm">
            Kickoff times shown in UK time. Each day runs 4am&nbsp;&ndash;&nbsp;4am, so late-night
            games appear with the evening before.
          </p>
        </div>
        <div className="max-w-2xl mx-auto px-4 flex gap-1 border-b border-emerald-800/60">
          <button
            onClick={() => setTab('upcoming')}
            className={`px-3 py-2 text-sm font-semibold border-b-2 transition-colors ${
              tab === 'upcoming'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-emerald-300 hover:text-white'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setTab('completed')}
            className={`px-3 py-2 text-sm font-semibold border-b-2 transition-colors ${
              tab === 'completed'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-emerald-300 hover:text-white'
            }`}
          >
            Completed
          </button>
        </div>

        {tab === 'upcoming' && (
          <div className="max-w-2xl mx-auto px-4 py-3 flex gap-2">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search team, venue or city…"
              className="flex-1 min-w-0 rounded-lg px-3 py-2 text-sm bg-emerald-800 placeholder-emerald-300 text-white border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <select
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              className="rounded-lg px-2 py-2 text-sm bg-emerald-800 text-white border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
              className="rounded-lg px-3 py-2 text-sm font-medium bg-emerald-400 text-emerald-950 hover:bg-emerald-300 transition-colors"
            >
              Today
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
            {days.map(({ key, date, fixtures: dayFixtures }) => (
              <section key={key} ref={key === todayKey ? todayRef : undefined}>
                <h2
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wide sticky top-[217px] ${
                    key === todayKey
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  {formatDayHeading(date)}
                  {key === todayKey && <span className="ml-2 font-normal">· Today</span>}
                </h2>
                <ul className="bg-white dark:bg-gray-900">
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
              <ul className="bg-white dark:bg-gray-900">
                {completedFixtures.map((fixture) => (
                  <CompletedFixtureCard key={fixture.id} fixture={fixture} />
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
