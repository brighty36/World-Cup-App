import resultsData from '../data/results.json'

export interface MatchResult {
  home: number
  away: number
  /** e.g. "FT", "HT", "LIVE", "1H", "2H". */
  status?: string
  scorers?: { home: string[]; away: string[] }
}

export type ResultsMap = Record<string, MatchResult>

export const results: ResultsMap = resultsData
