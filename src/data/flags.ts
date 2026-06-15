// Maps team names to ISO 3166-1 alpha-2 codes (or special emoji tag sequences
// for non-ISO entries like England/Scotland) so we can render flag emoji.
const ALPHA2: Record<string, string> = {
  Mexico: 'MX',
  'South Korea': 'KR',
  'South Africa': 'ZA',
  Czechia: 'CZ',
  Canada: 'CA',
  Switzerland: 'CH',
  Qatar: 'QA',
  'Bosnia and Herzegovina': 'BA',
  Brazil: 'BR',
  Morocco: 'MA',
  Haiti: 'HT',
  USA: 'US',
  Australia: 'AU',
  Paraguay: 'PY',
  Turkiye: 'TR',
  Germany: 'DE',
  Ecuador: 'EC',
  'Ivory Coast': 'CI',
  Curacao: 'CW',
  Netherlands: 'NL',
  Japan: 'JP',
  Tunisia: 'TN',
  Sweden: 'SE',
  Belgium: 'BE',
  Iran: 'IR',
  Egypt: 'EG',
  'New Zealand': 'NZ',
  Spain: 'ES',
  Uruguay: 'UY',
  'Saudi Arabia': 'SA',
  'Cape Verde': 'CV',
  France: 'FR',
  Senegal: 'SN',
  Norway: 'NO',
  Iraq: 'IQ',
  Argentina: 'AR',
  Austria: 'AT',
  Algeria: 'DZ',
  Jordan: 'JO',
  Portugal: 'PT',
  Colombia: 'CO',
  Uzbekistan: 'UZ',
  'DR Congo': 'CD',
  Croatia: 'HR',
  Panama: 'PA',
  Ghana: 'GH',
}

// Emoji tag sequences for the home nations (no ISO alpha-2 flag exists).
const SPECIAL: Record<string, string> = {
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
}

function alpha2ToFlag(code: string): string {
  const codePoints = code
    .toUpperCase()
    .split('')
    .map((c) => 0x1f1e6 - 65 + c.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export function getFlag(team: string): string {
  if (SPECIAL[team]) return SPECIAL[team]
  const code = ALPHA2[team]
  return code ? alpha2ToFlag(code) : '🏳️'
}
