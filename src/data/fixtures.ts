import fixturesData from './fixtures.json'

export interface Fixture {
  id: string
  /** Kickoff time in UTC, ISO 8601. */
  utcKickoff: string
  group: string
  round: string
  homeTeam: string
  awayTeam: string
  venue: string
  city: string
  country: string
  /** UK broadcaster. */
  channel: string
}

// 2026 FIFA World Cup - group stage fixtures (Canada / Mexico / USA).
// Kickoff times are converted to UTC (UK local time during the tournament
// is UTC+1 / BST). Compiled from publicly reported schedules as of
// 15 June 2026 - double check exact venues against the official FIFA
// fixture list and adjust src/data/fixtures.json as needed.
//
// Results (scores, scorers, status) live separately in
// src/data/results.json and are updated by the "Update results" GitHub
// Action, which fetches them from TheSportsDB.
export const fixtures: Fixture[] = fixturesData
