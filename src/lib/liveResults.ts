import fixturesData from '../data/fixtures.json'
import type { ResultsMap } from './results'

// TheSportsDB free API key "3" (no signup required).
const API_BASE = 'https://www.thesportsdb.com/api/v1/json/3'
// FIFA World Cup league ID on TheSportsDB.
const LEAGUE_ID = '4429'
const SEASONS_TO_TRY = ['2026', '2026-2026']

// Statuses that mean the match hasn't kicked off yet - skip these.
const NOT_STARTED_STATUSES = new Set(['', 'NS', 'Not Started', 'TBD'])
// Statuses we map to a simple "Full Time" marker.
const FINISHED_STATUSES = new Set(['Match Finished', 'FT', 'AOT', 'AET'])

// Maps differing team-name spellings (TheSportsDB vs our fixtures.json) to a
// shared canonical form so fixtures can be matched to events.
const TEAM_ALIASES: Record<string, string> = {
  'south korea': 'korea republic',
  'korea republic': 'korea republic',
  czechia: 'czech republic',
  'czech republic': 'czech republic',
  usa: 'usa',
  'united states': 'usa',
  'ivory coast': 'ivory coast',
  'cote divoire': 'ivory coast',
  'dr congo': 'dr congo',
  'congo dr': 'dr congo',
  'democratic republic of the congo': 'dr congo',
  'bosnia and herzegovina': 'bosnia and herzegovina',
  'bosnia-herzegovina': 'bosnia and herzegovina',
  turkiye: 'turkey',
  turkey: 'turkey',
  'cape verde': 'cape verde',
  'cabo verde': 'cape verde',
  'cape verde islands': 'cape verde',
  curacao: 'curacao',
}

function canonicalTeam(name: string): string {
  const normalized = name
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
  return TEAM_ALIASES[normalized] ?? normalized
}

// "Player Name:45';Player Name:90+2'" -> ["Player Name", "Player Name"]
function parseScorers(goalDetails?: string | null): string[] {
  if (!goalDetails) return []
  return goalDetails
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const parts = entry.split(':')
      return parts.length > 1 ? parts.slice(0, -1).join(':').trim() : entry
    })
    .filter(Boolean)
}

interface SportsDbEvent {
  idEvent: string
  strHomeTeam: string
  strAwayTeam: string
  intHomeScore: string | null
  intAwayScore: string | null
  strStatus: string
  strHomeGoalDetails?: string | null
  strAwayGoalDetails?: string | null
}

// Force a fresh network response on every call. Without this the browser (or a
// CDN in front of TheSportsDB) serves the previously cached response, so the
// Refresh button re-applies identical, stale scores. `cache: 'no-store'` skips
// the browser HTTP cache; the unique `_` param defeats any URL-keyed CDN cache.
async function fetchFresh(url: string): Promise<Response> {
  const separator = url.includes('?') ? '&' : '?'
  return fetch(`${url}${separator}_=${Date.now()}`, { cache: 'no-store' })
}

async function fetchSeasonEvents(): Promise<SportsDbEvent[]> {
  for (const season of SEASONS_TO_TRY) {
    const url = `${API_BASE}/eventsseason.php?id=${LEAGUE_ID}&s=${season}`
    const res = await fetchFresh(url)
    if (!res.ok) continue
    const data = await res.json()
    if (data?.events?.length) return data.events
  }
  return []
}

async function fetchEventDetails(eventId: string): Promise<SportsDbEvent | null> {
  const url = `${API_BASE}/lookupevent.php?id=${eventId}`
  const res = await fetchFresh(url)
  if (!res.ok) return null
  const data = await res.json()
  return data?.events?.[0] ?? null
}

/** Fetches current scores, status and scorers for our fixtures from TheSportsDB. */
export async function fetchLiveResults(): Promise<ResultsMap> {
  const events = await fetchSeasonEvents()
  if (events.length === 0) return {}

  const eventsByTeamPair = new Map<string, SportsDbEvent>()
  for (const event of events) {
    const home = canonicalTeam(event.strHomeTeam ?? '')
    const away = canonicalTeam(event.strAwayTeam ?? '')
    eventsByTeamPair.set([home, away].sort().join('|'), event)
  }

  const results: ResultsMap = {}

  for (const fixture of fixturesData) {
    const home = canonicalTeam(fixture.homeTeam)
    const away = canonicalTeam(fixture.awayTeam)
    const event = eventsByTeamPair.get([home, away].sort().join('|'))
    if (!event) continue
    if (NOT_STARTED_STATUSES.has(event.strStatus ?? '') || event.intHomeScore === null) continue

    const homeScore = Number(event.intHomeScore)
    const awayScore = Number(event.intAwayScore)
    const status = FINISHED_STATUSES.has(event.strStatus) ? 'FT' : event.strStatus

    // Swap scores/scorers back if TheSportsDB has home/away reversed vs our fixture.
    const reversed = canonicalTeam(event.strHomeTeam ?? '') !== home

    let homeGoalDetails = event.strHomeGoalDetails
    let awayGoalDetails = event.strAwayGoalDetails
    let resultHome = homeScore
    let resultAway = awayScore
    if (reversed) {
      ;[resultHome, resultAway] = [awayScore, homeScore]
      ;[homeGoalDetails, awayGoalDetails] = [awayGoalDetails, homeGoalDetails]
    }

    let scorers = { home: parseScorers(homeGoalDetails), away: parseScorers(awayGoalDetails) }

    // eventsseason often omits goal details - fetch the full event for finished matches.
    if (status === 'FT' && scorers.home.length === 0 && scorers.away.length === 0) {
      const details = await fetchEventDetails(event.idEvent)
      if (details) {
        let detailHome = details.strHomeGoalDetails
        let detailAway = details.strAwayGoalDetails
        if (reversed) {
          ;[detailHome, detailAway] = [detailAway, detailHome]
        }
        scorers = { home: parseScorers(detailHome), away: parseScorers(detailAway) }
      }
    }

    results[fixture.id] = { home: resultHome, away: resultAway, status, scorers }
  }

  return results
}
