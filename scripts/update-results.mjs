// Fetches 2026 FIFA World Cup results from TheSportsDB's free API and writes
// src/data/results.json. Run manually via:
//
//   node scripts/update-results.mjs
//
// or via the "Update results" GitHub Action (workflow_dispatch).

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FIXTURES_PATH = path.join(__dirname, '../src/data/fixtures.json')
const RESULTS_PATH = path.join(__dirname, '../src/data/results.json')

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
const TEAM_ALIASES = {
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

function canonicalTeam(name) {
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
function parseScorers(goalDetails) {
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

async function fetchSeasonEvents() {
  for (const season of SEASONS_TO_TRY) {
    const url = `${API_BASE}/eventsseason.php?id=${LEAGUE_ID}&s=${season}`
    const res = await fetch(url)
    if (!res.ok) continue
    const data = await res.json()
    if (data?.events?.length) return data.events
  }
  return []
}

async function fetchEventDetails(eventId) {
  const url = `${API_BASE}/lookupevent.php?id=${eventId}`
  const res = await fetch(url)
  if (!res.ok) return null
  const data = await res.json()
  return data?.events?.[0] ?? null
}

async function main() {
  const fixtures = JSON.parse(readFileSync(FIXTURES_PATH, 'utf-8'))
  const results = JSON.parse(readFileSync(RESULTS_PATH, 'utf-8'))

  const events = await fetchSeasonEvents()
  if (events.length === 0) {
    console.warn('No events returned from TheSportsDB - leaving results.json unchanged.')
    return
  }

  const eventsByTeamPair = new Map()
  for (const event of events) {
    const home = canonicalTeam(event.strHomeTeam ?? '')
    const away = canonicalTeam(event.strAwayTeam ?? '')
    eventsByTeamPair.set([home, away].sort().join('|'), event)
  }

  let updated = 0
  for (const fixture of fixtures) {
    const home = canonicalTeam(fixture.homeTeam)
    const away = canonicalTeam(fixture.awayTeam)
    const event = eventsByTeamPair.get([home, away].sort().join('|'))

    if (!event) {
      console.warn(`No matching TheSportsDB event for ${fixture.id}: ${fixture.homeTeam} v ${fixture.awayTeam}`)
      continue
    }

    if (NOT_STARTED_STATUSES.has(event.strStatus ?? '') || event.intHomeScore === null) {
      continue
    }

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
    updated += 1
  }

  writeFileSync(RESULTS_PATH, JSON.stringify(results, null, 2) + '\n')
  console.log(`Updated ${updated} fixture result(s).`)
}

main()
