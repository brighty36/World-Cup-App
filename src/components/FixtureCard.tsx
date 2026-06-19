import type { Fixture } from '../data/fixtures'
import { getTeamColor } from '../data/teamColors'
import Flag from './Flag'
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

  const homeColor = getTeamColor(fixture.homeTeam)
  const awayColor = getTeamColor(fixture.awayTeam)

  return (
    <li className="group relative mx-3 my-2 overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200/70 dark:ring-gray-800 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Team-colour accent bar: home colour fades into away colour. */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1.5"
        style={{ background: `linear-gradient(to bottom, ${homeColor}, ${awayColor})` }}
      />

      <div className="pl-5 pr-4 py-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold tabular-nums text-gray-900 dark:text-gray-100">
              {formatKickoffTime(fixture.utcKickoff)}
            </span>
            {overnight && (
              <span
                className="text-xs text-gray-400 dark:text-gray-500"
                title={`Kicks off in the early hours of ${nextDayLabel}`}
              >
                🌙 {nextDayLabel} night
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              Group {fixture.group}
            </span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${channelClasses(fixture.channel)}`}>
              {fixture.channel}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
          <span className="flex flex-1 items-center justify-end gap-2 text-right">
            <span className="font-bold leading-tight">{fixture.homeTeam}</span>
            <Flag team={fixture.homeTeam} className="h-6 w-9" />
          </span>
          <span className="shrink-0 rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            v
          </span>
          <span className="flex flex-1 items-center justify-start gap-2 text-left">
            <Flag team={fixture.awayTeam} className="h-6 w-9" />
            <span className="font-bold leading-tight">{fixture.awayTeam}</span>
          </span>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          {fixture.venue}, {fixture.city}
        </div>
      </div>
    </li>
  )
}
