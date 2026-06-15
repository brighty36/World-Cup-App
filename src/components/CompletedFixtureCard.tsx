import { useId } from 'react'
import type { Fixture } from '../data/fixtures'
import { getFlag } from '../data/flags'
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
  const radioName = useId()

  const dateLabel = new Date(fixture.utcKickoff).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'Europe/London',
  })

  const isLive = !!result.status && LIVE_STATUSES.has(result.status)
  const homeScorers = result.scorers?.home ?? []
  const awayScorers = result.scorers?.away ?? []

  return (
    <li className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{dateLabel}</span>
        <div className="flex items-center gap-1.5">
          {isLive && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-600 text-white animate-pulse">
              {result.status === 'HT' ? 'HT' : 'LIVE'}
            </span>
          )}
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            Group {fixture.group}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100">
        <span className="text-xl leading-none shrink-0">{getFlag(fixture.homeTeam)}</span>
        <span className="flex-1 text-right">{fixture.homeTeam}</span>
        <span className="text-lg font-bold tabular-nums shrink-0 px-2">
          {result.home} - {result.away}
        </span>
        <span className="flex-1 text-left">{fixture.awayTeam}</span>
        <span className="text-xl leading-none shrink-0">{getFlag(fixture.awayTeam)}</span>
      </div>

      {(homeScorers.length > 0 || awayScorers.length > 0) && (
        <div className="flex items-start gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
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

      <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
        {fixture.venue}, {fixture.city}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {WATCH_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              name={`watched-${radioName}`}
              checked={entry.watched === opt.value}
              onChange={() => updateEntry({ watched: entry.watched === opt.value ? null : opt.value })}
              className="accent-emerald-600"
            />
            {opt.label}
          </label>
        ))}
      </div>

      <a
        href={bbcMatchReportUrl(fixture)}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-sm font-medium text-pink-700 dark:text-pink-400 hover:underline"
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
    </li>
  )
}
