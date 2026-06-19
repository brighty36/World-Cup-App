// A representative, reasonably vibrant accent colour for each team (drawn from
// flag / kit colours). Used for the gradient accent bar on each fixture card so
// the list feels less uniform. Pure black / white / pale-yellow are avoided so
// the accent always reads on light and dark card surfaces.
const TEAM_COLORS: Record<string, string> = {
  Mexico: '#006847',
  'South Africa': '#007749',
  'South Korea': '#cd2e3a',
  Czechia: '#d7141a',
  Canada: '#d80621',
  'Bosnia and Herzegovina': '#002395',
  Qatar: '#8a1538',
  Switzerland: '#d52b1e',
  Brazil: '#009c3b',
  Morocco: '#c1272d',
  Scotland: '#005eb8',
  Haiti: '#00209f',
  USA: '#1f2a6e',
  Paraguay: '#d52b1e',
  Australia: '#00843d',
  Turkiye: '#e30a17',
  Germany: '#161616',
  Curacao: '#002b7f',
  'Ivory Coast': '#ff8200',
  Ecuador: '#034ea2',
  Netherlands: '#ff6200',
  Japan: '#bc002d',
  Sweden: '#006aa7',
  Tunisia: '#e70013',
  Belgium: '#c8102e',
  Iran: '#239f40',
  Egypt: '#ce1126',
  'New Zealand': '#00247d',
  Spain: '#aa151b',
  Uruguay: '#0038a8',
  'Saudi Arabia': '#006c35',
  'Cape Verde': '#003893',
  France: '#0055a4',
  Senegal: '#00853f',
  Norway: '#ba0c2f',
  Iraq: '#007a3d',
  Argentina: '#75aadb',
  Austria: '#ed2939',
  Algeria: '#006233',
  Jordan: '#007a3d',
  Portugal: '#da291c',
  Colombia: '#003893',
  Uzbekistan: '#0099b5',
  'DR Congo': '#007fff',
  Croatia: '#d10000',
  Panama: '#005293',
  Ghana: '#006b3f',
  England: '#cf142b',
}

const FALLBACK = '#059669' // emerald-600

export function getTeamColor(team: string): string {
  return TEAM_COLORS[team] ?? FALLBACK
}
