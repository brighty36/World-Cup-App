import type { Fixture } from '../data/fixtures'
import { getFlag } from '../data/flags'
import { formatKickoffTime, isOvernightKickoff } from '../lib/matchday'

function channelClasses(channel: string): string {
  if (channel.startsWith('BBC')) return 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300'
  if (channel.startsWith('ITV')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
  return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
}

export default function FixtureCard({ fixture }: { fixture: Fixture }) {
  const overnight = isOvernightKickoff(fixture.utcKickoff)
  const nextDayLabel = new Date(fixture.utcKickoff).toLocaleDateString('en-GB', {
    weekday: 'short',
    timeZone: 'Europe/London',
  })

  return (
    <li className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-semibold tabular-nums text-gray-900 dark:text-gray-100">
            {formatKickoffTime(fixture.utcKickoff)}
          </span>
          {overnight && (
            <span className="text-xs text-gray-400 dark:text-gray-500" title={`Kicks off in the early hours of ${nextDayLabel}`}>
              🌙 {nextDayLabel} night
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            Group {fixture.group}
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${channelClasses(fixture.channel)}`}>
            {fixture.channel}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100">
        <span className="text-xl leading-none shrink-0">{getFlag(fixture.homeTeam)}</span>
        <span className="flex-1 text-right">{fixture.homeTeam}</span>
        <span className="text-gray-400 font-normal text-sm shrink-0">v</span>
        <span className="flex-1 text-left">{fixture.awayTeam}</span>
        <span className="text-xl leading-none shrink-0">{getFlag(fixture.awayTeam)}</span>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
        {fixture.venue}, {fixture.city}
      </div>
    </li>
  )
}
