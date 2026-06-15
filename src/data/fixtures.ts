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
  /** UK broadcaster, or 'TBC' where not yet confirmed. */
  channel: string
  /**
   * Final score, once the match has been played - presence of this field
   * marks a fixture as "completed" for the diary feature.
   */
  result?: { home: number; away: number }
}

// 2026 FIFA World Cup - group stage fixtures (Canada / Mexico / USA).
// Kickoff times are converted to UTC (UK local time during the tournament
// is UTC+1 / BST). Compiled from publicly reported schedules as of
// 15 June 2026 - double check exact venues against the official FIFA
// fixture list and adjust this file as needed.
// Final scores below for already-played matches are placeholders for
// testing the diary feature - replace with the actual final scores once
// each match has been played.
export const fixtures: Fixture[] = [
  // Group A - Mexico, South Korea, South Africa, Czechia
  { id: 'A1', utcKickoff: '2026-06-11T18:00:00Z', group: 'A', round: 'Group Stage', homeTeam: 'Mexico', awayTeam: 'South Africa', venue: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico', channel: 'ITV1', result: { home: 2, away: 0 } },
  { id: 'A2', utcKickoff: '2026-06-11T20:00:00Z', group: 'A', round: 'Group Stage', homeTeam: 'South Korea', awayTeam: 'Czechia', venue: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico', channel: 'ITV1', result: { home: 1, away: 1 } },
  { id: 'A3', utcKickoff: '2026-06-18T16:00:00Z', group: 'A', round: 'Group Stage', homeTeam: 'Czechia', awayTeam: 'South Africa', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA', channel: 'BBC One' },
  { id: 'A4', utcKickoff: '2026-06-19T03:00:00Z', group: 'A', round: 'Group Stage', homeTeam: 'Mexico', awayTeam: 'South Korea', venue: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico', channel: 'BBC One' },
  { id: 'A5', utcKickoff: '2026-06-25T01:00:00Z', group: 'A', round: 'Group Stage', homeTeam: 'Czechia', awayTeam: 'Mexico', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA', channel: 'BBC Two' },
  { id: 'A6', utcKickoff: '2026-06-25T01:00:00Z', group: 'A', round: 'Group Stage', homeTeam: 'South Africa', awayTeam: 'South Korea', venue: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico', channel: 'BBC One' },

  // Group B - Canada, Switzerland, Qatar, Bosnia and Herzegovina
  { id: 'B1', utcKickoff: '2026-06-12T20:00:00Z', group: 'B', round: 'Group Stage', homeTeam: 'Canada', awayTeam: 'Bosnia and Herzegovina', venue: 'BMO Field', city: 'Toronto', country: 'Canada', channel: 'BBC One', result: { home: 2, away: 1 } },
  { id: 'B2', utcKickoff: '2026-06-13T17:00:00Z', group: 'B', round: 'Group Stage', homeTeam: 'Qatar', awayTeam: 'Switzerland', venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', channel: 'ITV1', result: { home: 0, away: 2 } },
  { id: 'B3', utcKickoff: '2026-06-18T19:00:00Z', group: 'B', round: 'Group Stage', homeTeam: 'Switzerland', awayTeam: 'Bosnia and Herzegovina', venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', channel: 'ITV1' },
  { id: 'B4', utcKickoff: '2026-06-18T22:00:00Z', group: 'B', round: 'Group Stage', homeTeam: 'Canada', awayTeam: 'Qatar', venue: 'BC Place', city: 'Vancouver', country: 'Canada', channel: 'ITV1' },
  { id: 'B5', utcKickoff: '2026-06-24T19:00:00Z', group: 'B', round: 'Group Stage', homeTeam: 'Switzerland', awayTeam: 'Canada', venue: 'BC Place', city: 'Vancouver', country: 'Canada', channel: 'ITV4' },
  { id: 'B6', utcKickoff: '2026-06-24T19:00:00Z', group: 'B', round: 'Group Stage', homeTeam: 'Bosnia and Herzegovina', awayTeam: 'Qatar', venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', channel: 'ITV1' },

  // Group C - Brazil, Morocco, Scotland, Haiti
  { id: 'C1', utcKickoff: '2026-06-13T20:00:00Z', group: 'C', round: 'Group Stage', homeTeam: 'Brazil', awayTeam: 'Morocco', venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA', channel: 'BBC One', result: { home: 2, away: 1 } },
  { id: 'C2', utcKickoff: '2026-06-13T17:00:00Z', group: 'C', round: 'Group Stage', homeTeam: 'Scotland', awayTeam: 'Haiti', venue: 'Lincoln Financial Field', city: 'Philadelphia', country: 'USA', channel: 'BBC One', result: { home: 3, away: 0 } },
  { id: 'C3', utcKickoff: '2026-06-19T22:00:00Z', group: 'C', round: 'Group Stage', homeTeam: 'Scotland', awayTeam: 'Morocco', venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA', channel: 'ITV1 / STV' },
  { id: 'C4', utcKickoff: '2026-06-20T01:00:00Z', group: 'C', round: 'Group Stage', homeTeam: 'Brazil', awayTeam: 'Haiti', venue: 'Lincoln Financial Field', city: 'Philadelphia', country: 'USA', channel: 'ITV1' },
  { id: 'C5', utcKickoff: '2026-06-24T22:00:00Z', group: 'C', round: 'Group Stage', homeTeam: 'Scotland', awayTeam: 'Brazil', venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA', channel: 'BBC One' },
  { id: 'C6', utcKickoff: '2026-06-24T22:00:00Z', group: 'C', round: 'Group Stage', homeTeam: 'Morocco', awayTeam: 'Haiti', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA', channel: 'BBC Two' },

  // Group D - USA, Australia, Paraguay, Turkiye
  { id: 'D1', utcKickoff: '2026-06-12T20:00:00Z', group: 'D', round: 'Group Stage', homeTeam: 'USA', awayTeam: 'Paraguay', venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', channel: 'BBC One', result: { home: 1, away: 0 } },
  { id: 'D2', utcKickoff: '2026-06-14T17:00:00Z', group: 'D', round: 'Group Stage', homeTeam: 'Australia', awayTeam: 'Turkiye', venue: "Levi's Stadium", city: 'San Francisco', country: 'USA', channel: 'ITV1', result: { home: 1, away: 2 } },
  { id: 'D3', utcKickoff: '2026-06-19T19:00:00Z', group: 'D', round: 'Group Stage', homeTeam: 'USA', awayTeam: 'Australia', venue: "Levi's Stadium", city: 'San Francisco', country: 'USA', channel: 'BBC One' },
  { id: 'D4', utcKickoff: '2026-06-20T04:00:00Z', group: 'D', round: 'Group Stage', homeTeam: 'Turkiye', awayTeam: 'Paraguay', venue: 'AT&T Stadium', city: 'Dallas', country: 'USA', channel: 'ITV1' },
  { id: 'D5', utcKickoff: '2026-06-26T02:00:00Z', group: 'D', round: 'Group Stage', homeTeam: 'Turkiye', awayTeam: 'USA', venue: "Levi's Stadium", city: 'San Francisco', country: 'USA', channel: 'ITV4' },
  { id: 'D6', utcKickoff: '2026-06-26T02:00:00Z', group: 'D', round: 'Group Stage', homeTeam: 'Paraguay', awayTeam: 'Australia', venue: 'AT&T Stadium', city: 'Dallas', country: 'USA', channel: 'ITV1' },

  // Group E - Germany, Ecuador, Ivory Coast, Curacao
  { id: 'E1', utcKickoff: '2026-06-14T20:00:00Z', group: 'E', round: 'Group Stage', homeTeam: 'Germany', awayTeam: 'Curacao', venue: 'Lincoln Financial Field', city: 'Philadelphia', country: 'USA', channel: 'ITV1', result: { home: 4, away: 0 } },
  { id: 'E2', utcKickoff: '2026-06-14T17:00:00Z', group: 'E', round: 'Group Stage', homeTeam: 'Ivory Coast', awayTeam: 'Ecuador', venue: 'NRG Stadium', city: 'Houston', country: 'USA', channel: 'BBC One', result: { home: 1, away: 1 } },
  { id: 'E3', utcKickoff: '2026-06-20T20:00:00Z', group: 'E', round: 'Group Stage', homeTeam: 'Germany', awayTeam: 'Ivory Coast', venue: 'Lincoln Financial Field', city: 'Philadelphia', country: 'USA', channel: 'ITV1' },
  { id: 'E4', utcKickoff: '2026-06-21T00:00:00Z', group: 'E', round: 'Group Stage', homeTeam: 'Ecuador', awayTeam: 'Curacao', venue: 'NRG Stadium', city: 'Houston', country: 'USA', channel: 'BBC One' },
  { id: 'E5', utcKickoff: '2026-06-25T20:00:00Z', group: 'E', round: 'Group Stage', homeTeam: 'Ecuador', awayTeam: 'Germany', venue: 'MetLife Stadium', city: 'New York/New Jersey', country: 'USA', channel: 'BBC One' },
  { id: 'E6', utcKickoff: '2026-06-25T20:00:00Z', group: 'E', round: 'Group Stage', homeTeam: 'Curacao', awayTeam: 'Ivory Coast', venue: 'Lincoln Financial Field', city: 'Philadelphia', country: 'USA', channel: 'BBC Two' },

  // Group F - Netherlands, Japan, Tunisia, Sweden
  { id: 'F1', utcKickoff: '2026-06-14T20:00:00Z', group: 'F', round: 'Group Stage', homeTeam: 'Netherlands', awayTeam: 'Japan', venue: 'AT&T Stadium', city: 'Dallas', country: 'USA', channel: 'ITV1', result: { home: 2, away: 1 } },
  { id: 'F2', utcKickoff: '2026-06-14T17:00:00Z', group: 'F', round: 'Group Stage', homeTeam: 'Sweden', awayTeam: 'Tunisia', venue: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA', channel: 'ITV1', result: { home: 1, away: 0 } },
  { id: 'F3', utcKickoff: '2026-06-20T17:00:00Z', group: 'F', round: 'Group Stage', homeTeam: 'Netherlands', awayTeam: 'Sweden', venue: 'AT&T Stadium', city: 'Dallas', country: 'USA', channel: 'BBC One' },
  { id: 'F4', utcKickoff: '2026-06-21T04:00:00Z', group: 'F', round: 'Group Stage', homeTeam: 'Tunisia', awayTeam: 'Japan', venue: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA', channel: 'BBC One' },
  { id: 'F5', utcKickoff: '2026-06-25T23:00:00Z', group: 'F', round: 'Group Stage', homeTeam: 'Japan', awayTeam: 'Sweden', venue: 'AT&T Stadium', city: 'Dallas', country: 'USA', channel: 'BBC One' },
  { id: 'F6', utcKickoff: '2026-06-25T23:00:00Z', group: 'F', round: 'Group Stage', homeTeam: 'Tunisia', awayTeam: 'Netherlands', venue: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA', channel: 'BBC Two' },

  // Group G - Belgium, Iran, Egypt, New Zealand
  { id: 'G1', utcKickoff: '2026-06-15T19:00:00Z', group: 'G', round: 'Group Stage', homeTeam: 'Belgium', awayTeam: 'Egypt', venue: 'Lumen Field', city: 'Seattle', country: 'USA', channel: 'BBC One' },
  { id: 'G2', utcKickoff: '2026-06-16T01:00:00Z', group: 'G', round: 'Group Stage', homeTeam: 'Iran', awayTeam: 'New Zealand', venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico', channel: 'BBC One' },
  { id: 'G3', utcKickoff: '2026-06-21T19:00:00Z', group: 'G', round: 'Group Stage', homeTeam: 'Belgium', awayTeam: 'Iran', venue: 'Lumen Field', city: 'Seattle', country: 'USA', channel: 'ITV1' },
  { id: 'G4', utcKickoff: '2026-06-22T01:00:00Z', group: 'G', round: 'Group Stage', homeTeam: 'New Zealand', awayTeam: 'Egypt', venue: 'BC Place', city: 'Vancouver', country: 'Canada', channel: 'ITV1' },
  { id: 'G5', utcKickoff: '2026-06-27T03:00:00Z', group: 'G', round: 'Group Stage', homeTeam: 'Egypt', awayTeam: 'Iran', venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico', channel: 'BBC Two' },
  { id: 'G6', utcKickoff: '2026-06-27T03:00:00Z', group: 'G', round: 'Group Stage', homeTeam: 'New Zealand', awayTeam: 'Belgium', venue: 'BC Place', city: 'Vancouver', country: 'Canada', channel: 'BBC One' },

  // Group H - Spain, Uruguay, Saudi Arabia, Cape Verde
  { id: 'H1', utcKickoff: '2026-06-15T16:00:00Z', group: 'H', round: 'Group Stage', homeTeam: 'Spain', awayTeam: 'Cape Verde', venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA', channel: 'ITV1' },
  { id: 'H2', utcKickoff: '2026-06-15T22:00:00Z', group: 'H', round: 'Group Stage', homeTeam: 'Saudi Arabia', awayTeam: 'Uruguay', venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico', channel: 'ITV1' },
  { id: 'H3', utcKickoff: '2026-06-21T16:00:00Z', group: 'H', round: 'Group Stage', homeTeam: 'Spain', awayTeam: 'Saudi Arabia', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA', channel: 'BBC One' },
  { id: 'H4', utcKickoff: '2026-06-21T22:00:00Z', group: 'H', round: 'Group Stage', homeTeam: 'Uruguay', awayTeam: 'Cape Verde', venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA', channel: 'BBC One' },
  { id: 'H5', utcKickoff: '2026-06-27T00:00:00Z', group: 'H', round: 'Group Stage', homeTeam: 'Cape Verde', awayTeam: 'Saudi Arabia', venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico', channel: 'ITV4' },
  { id: 'H6', utcKickoff: '2026-06-27T00:00:00Z', group: 'H', round: 'Group Stage', homeTeam: 'Uruguay', awayTeam: 'Spain', venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA', channel: 'ITV1' },

  // Group I - France, Senegal, Norway, Iraq
  { id: 'I1', utcKickoff: '2026-06-16T19:00:00Z', group: 'I', round: 'Group Stage', homeTeam: 'France', awayTeam: 'Senegal', venue: 'MetLife Stadium', city: 'New York/New Jersey', country: 'USA', channel: 'BBC One' },
  { id: 'I2', utcKickoff: '2026-06-16T22:00:00Z', group: 'I', round: 'Group Stage', homeTeam: 'Iraq', awayTeam: 'Norway', venue: 'Gillette Stadium', city: 'Boston', country: 'USA', channel: 'BBC One' },
  { id: 'I3', utcKickoff: '2026-06-22T21:00:00Z', group: 'I', round: 'Group Stage', homeTeam: 'France', awayTeam: 'Iraq', venue: 'Lumen Field', city: 'Seattle', country: 'USA', channel: 'BBC One' },
  { id: 'I4', utcKickoff: '2026-06-23T00:00:00Z', group: 'I', round: 'Group Stage', homeTeam: 'Norway', awayTeam: 'Senegal', venue: 'MetLife Stadium', city: 'New York/New Jersey', country: 'USA', channel: 'ITV1' },
  { id: 'I5', utcKickoff: '2026-06-26T19:00:00Z', group: 'I', round: 'Group Stage', homeTeam: 'Norway', awayTeam: 'France', venue: 'Gillette Stadium', city: 'Boston', country: 'USA', channel: 'ITV1' },
  { id: 'I6', utcKickoff: '2026-06-26T19:00:00Z', group: 'I', round: 'Group Stage', homeTeam: 'Senegal', awayTeam: 'Iraq', venue: 'Lumen Field', city: 'Seattle', country: 'USA', channel: 'ITV4' },

  // Group J - Argentina, Austria, Algeria, Jordan
  { id: 'J1', utcKickoff: '2026-06-17T01:00:00Z', group: 'J', round: 'Group Stage', homeTeam: 'Argentina', awayTeam: 'Algeria', venue: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA', channel: 'ITV1' },
  { id: 'J2', utcKickoff: '2026-06-17T04:00:00Z', group: 'J', round: 'Group Stage', homeTeam: 'Austria', awayTeam: 'Jordan', venue: "Levi's Stadium", city: 'San Francisco', country: 'USA', channel: 'BBC One' },
  { id: 'J3', utcKickoff: '2026-06-22T17:00:00Z', group: 'J', round: 'Group Stage', homeTeam: 'Argentina', awayTeam: 'Austria', venue: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA', channel: 'BBC One' },
  { id: 'J4', utcKickoff: '2026-06-22T20:00:00Z', group: 'J', round: 'Group Stage', homeTeam: 'Algeria', awayTeam: 'Jordan', venue: "Levi's Stadium", city: 'San Francisco', country: 'USA', channel: 'ITV1' },
  { id: 'J5', utcKickoff: '2026-06-27T02:00:00Z', group: 'J', round: 'Group Stage', homeTeam: 'Algeria', awayTeam: 'Austria', venue: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA', channel: 'BBC Two' },
  { id: 'J6', utcKickoff: '2026-06-27T02:00:00Z', group: 'J', round: 'Group Stage', homeTeam: 'Jordan', awayTeam: 'Argentina', venue: "Levi's Stadium", city: 'San Francisco', country: 'USA', channel: 'BBC One' },

  // Group K - Portugal, Colombia, Uzbekistan, DR Congo
  { id: 'K1', utcKickoff: '2026-06-17T17:00:00Z', group: 'K', round: 'Group Stage', homeTeam: 'Portugal', awayTeam: 'DR Congo', venue: 'NRG Stadium', city: 'Houston', country: 'USA', channel: 'BBC One' },
  { id: 'K2', utcKickoff: '2026-06-18T02:00:00Z', group: 'K', round: 'Group Stage', homeTeam: 'Uzbekistan', awayTeam: 'Colombia', venue: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico', channel: 'BBC One' },
  { id: 'K3', utcKickoff: '2026-06-23T17:00:00Z', group: 'K', round: 'Group Stage', homeTeam: 'Portugal', awayTeam: 'Uzbekistan', venue: 'NRG Stadium', city: 'Houston', country: 'USA', channel: 'ITV1' },
  { id: 'K4', utcKickoff: '2026-06-24T02:00:00Z', group: 'K', round: 'Group Stage', homeTeam: 'Colombia', awayTeam: 'DR Congo', venue: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico', channel: 'ITV1' },
  { id: 'K5', utcKickoff: '2026-06-26T23:30:00Z', group: 'K', round: 'Group Stage', homeTeam: 'Colombia', awayTeam: 'Portugal', venue: 'NRG Stadium', city: 'Houston', country: 'USA', channel: 'BBC One' },
  { id: 'K6', utcKickoff: '2026-06-26T23:30:00Z', group: 'K', round: 'Group Stage', homeTeam: 'DR Congo', awayTeam: 'Uzbekistan', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA', channel: 'BBC Two' },

  // Group L - England, Croatia, Panama, Ghana
  { id: 'L1', utcKickoff: '2026-06-17T20:00:00Z', group: 'L', round: 'Group Stage', homeTeam: 'England', awayTeam: 'Croatia', venue: 'AT&T Stadium', city: 'Dallas', country: 'USA', channel: 'ITV1' },
  { id: 'L2', utcKickoff: '2026-06-17T23:00:00Z', group: 'L', round: 'Group Stage', homeTeam: 'Ghana', awayTeam: 'Panama', venue: 'BMO Field', city: 'Toronto', country: 'Canada', channel: 'ITV1' },
  { id: 'L3', utcKickoff: '2026-06-23T20:00:00Z', group: 'L', round: 'Group Stage', homeTeam: 'England', awayTeam: 'Ghana', venue: 'Gillette Stadium', city: 'Boston', country: 'USA', channel: 'BBC One' },
  { id: 'L4', utcKickoff: '2026-06-23T23:00:00Z', group: 'L', round: 'Group Stage', homeTeam: 'Panama', awayTeam: 'Croatia', venue: 'BMO Field', city: 'Toronto', country: 'Canada', channel: 'BBC One' },
  { id: 'L5', utcKickoff: '2026-06-27T21:00:00Z', group: 'L', round: 'Group Stage', homeTeam: 'Panama', awayTeam: 'England', venue: 'MetLife Stadium', city: 'New York/New Jersey', country: 'USA', channel: 'ITV1' },
  { id: 'L6', utcKickoff: '2026-06-27T21:00:00Z', group: 'L', round: 'Group Stage', homeTeam: 'Croatia', awayTeam: 'Ghana', venue: 'Lincoln Financial Field', city: 'Philadelphia', country: 'USA', channel: 'ITV4' },
]
