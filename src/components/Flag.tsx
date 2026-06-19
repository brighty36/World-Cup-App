import { useState } from 'react'
import { getFlag, getFlagCode } from '../data/flags'

/**
 * Renders a crisp SVG flag from flagcdn.com, falling back to the emoji flag if
 * the team is unmapped or the image fails to load (e.g. offline). `className`
 * controls the size of the image box; the emoji fallback is sized to match.
 */
export default function Flag({
  team,
  className = 'h-6 w-9',
}: {
  team: string
  className?: string
}) {
  const code = getFlagCode(team)
  const [failed, setFailed] = useState(false)

  if (!code || failed) {
    return (
      <span
        className={`inline-grid place-items-center text-xl leading-none ${className}`}
        aria-label={`${team} flag`}
        role="img"
      >
        {getFlag(team)}
      </span>
    )
  }

  return (
    <img
      src={`https://flagcdn.com/${code}.svg`}
      alt={`${team} flag`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`inline-block rounded-[3px] object-cover shadow-sm ring-1 ring-black/10 dark:ring-white/15 ${className}`}
    />
  )
}
