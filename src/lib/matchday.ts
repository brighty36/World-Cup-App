const LONDON_TZ = 'Europe/London'

/** The hour (in UK local time) at which a new "day" begins for display purposes. */
export const DAY_START_HOUR = 4

function londonParts(date: Date) {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: LONDON_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const parts = fmt.formatToParts(date)
  const map: Record<string, string> = {}
  for (const p of parts) map[p.type] = p.value
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    // "24:00" is sometimes returned for midnight instead of "00:00"
    hour: Number(map.hour) % 24,
    minute: Number(map.minute),
  }
}

/**
 * Returns a UTC-midnight Date representing the "match day" a fixture belongs
 * to, where days run from 04:00 to 03:59 UK time. A 03:00 Sunday kickoff
 * therefore belongs to the Saturday match day.
 */
export function getMatchDay(utcKickoff: string): Date {
  const date = new Date(utcKickoff)
  const { year, month, day, hour } = londonParts(date)
  let matchDay = Date.UTC(year, month - 1, day)
  if (hour < DAY_START_HOUR) {
    matchDay -= 24 * 60 * 60 * 1000
  }
  return new Date(matchDay)
}

export function matchDayKey(utcKickoff: string): string {
  return getMatchDay(utcKickoff).toISOString().slice(0, 10)
}

export function formatDayHeading(matchDay: Date): string {
  return matchDay.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  })
}

/** Formats the UK kickoff time, e.g. "19:00". */
export function formatKickoffTime(utcKickoff: string): string {
  return new Date(utcKickoff).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: LONDON_TZ,
  })
}

/** True if the kickoff falls between midnight and the 4am day-start cutoff. */
export function isOvernightKickoff(utcKickoff: string): boolean {
  return londonParts(new Date(utcKickoff)).hour < DAY_START_HOUR
}
