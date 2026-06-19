import type { Fixture } from '../data/fixtures'
import { getTeamColor } from '../data/teamColors'
import Flag from './Flag'
import { useDiaryEntry, type WatchedStatus } from '../lib/diary'
import type { MatchResult } from '../lib/results'

const WATCH_OPTIONS: { value: WatchedStatus; label: string }[] = [
  { value: 'full', label: 'Full 90 mins' },
  { value: 'extended-highlights', label: 'Extended highlights' },
  { value: 'short-highlights', label: 'Short highlights' },
]

function bbcMatchReportUrl(fixture: Fixture): string {
  const query = `${fixture.homeTeam} ${fixture.awayTeam} match report`
  return `https://www.bbc.co.uk/search?q=${encodeURIComponent(query)}&d=news_gnl`
}

const LIVE_STATUSES = new Set(['LIVE', '1H', '2H', 'HT', 'ET', 'PEN', 'BT'])

export default function CompletedFixtureCard({
  fixture,
  result,
}: {
  fixture: Fixture
  result: MatchResult
}) {
  const [entry, updateEntry] = useDiaryEntry(fixture.id)

  const dateLabel = new Date(fixture.utcKickoff).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'Europe/London',
  })

  const isLive = !!result.status && LIVE_STATUSES.has(result.status)
  const homeScorers = result.scorers?.home ?? []
  const awayScorers = result.scorers?.away ?? []

  const homeColor = getTeamColor(fixture.homeTeam)
  const awayColor = getTeamColor(fixture.awayTeam)

  return (
    <li className="relative mx-3 my-2 overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200/70 dark:ring-gray-800">
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1.5"
        style={{ background: `linear-gradient(to bottom, ${homeColor}, ${awayColor})` }}
      />

      <div className="pl-5 pr-4 py-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{dateLabel}</span>
          <div className="flex items-center gap-1.5">
            {isLive && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                {result.status === 'HT' ? 'HT' : 'LIVE'}
              </span>
            )}
            <span className="text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              Group {fixture.group}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
          <span className="flex flex-1 items-center justify-end gap-2 text-right">
            <span className="font-bold leading-tight">{fixture.homeTeam}</span>
            <Flag team={fixture.homeTeam} className="h-6 w-9" />
          </span>
          <span className="shrink-0 rounded-lg bg-gray-900 dark:bg-gray-100 px-3 py-1 text-lg font-extrabold tabular-nums tracking-wide text-white dark:text-gray-900">
            {result.home}<span className="px-0.5 text-gray-400 dark:text-gray-500">-</span>{result.away}
          </span>
          <span className="flex flex-1 items-center justify-start gap-2 text-left">
            <Flag team={fixture.awayTeam} className="h-6 w-9" />
            <span className="font-bold leading-tight">{fixture.awayTeam}</span>
          </span>
        </div>

        {(homeScorers.length > 0 || awayScorers.length > 0) && (
          <div className="flex items-start gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex-1 text-right">
              {homeScorers.map((scorer, i) => (
                <span key={i} className="block">
                  {scorer} ⚽
                </span>
              ))}
            </span>
            <span className="shrink-0 px-2" />
            <span className="flex-1 text-left">
              {awayScorers.map((scorer, i) => (
                <span key={i} className="block">
                  ⚽ {scorer}
                </span>
              ))}
            </span>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          {fixture.venue}, {fixture.city}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {WATCH_OPTIONS.map((opt) => {
            const active = entry.watched === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                aria-pressed={active}
                onClick={() => updateEntry({ watched: active ? null : opt.value })}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {active && '✓ '}
                {opt.label}
              </button>
            )
          })}
        </div>

        <a
          href={bbcMatchReportUrl(fixture)}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-sm font-semibold text-pink-700 dark:text-pink-400 hover:underline"
        >
          BBC match report ↗
        </a>

        <textarea
          value={entry.notes}
          onChange={(e) => updateEntry({ notes: e.target.value })}
          placeholder="Your thoughts on the match…"
          rows={2}
          className="mt-2 w-full rounded-lg px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
        />
      </div>
    </li>
  )
}
