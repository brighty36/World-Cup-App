# World Cup 2026 Fixtures

A mobile-friendly PWA for following the 2026 FIFA World Cup. Add it to your
phone's home screen for a quick fixture list.

## Features

- All group-stage fixtures in chronological order, grouped by day.
- **Days run 4am to 4am (UK time)**, so a match kicking off at, say, 2am on
  Sunday is shown under Saturday night (marked with a 🌙 and the actual day).
- Each fixture shows the UK kickoff time, group, venue/city, and the UK TV
  channel (BBC/ITV).
- Search by team, venue or city, and filter by group.
- "Today" button jumps to the current match day.
- Installable as a PWA (works offline once loaded).

## Running locally

```bash
npm install
npm run dev
```

Open the printed URL on your phone (same Wi-Fi network) or in a desktop
browser's mobile emulation view. To install it as an app, open it in your
phone's browser and use "Add to Home Screen".

## Updating fixture data

All fixture data lives in [`src/data/fixtures.ts`](src/data/fixtures.ts) as a
plain array — each match has a date/time (`utcKickoff`, stored in UTC),
group, teams, venue, city, country and UK `channel`.

This data was compiled from publicly reported schedules as of 15 June 2026.
Entries marked `channel: 'TBC'` are not yet confirmed — cross-check the
official FIFA fixture list and the BBC/ITV TV guide
(e.g. the [Metro World Cup 2026 TV schedule](https://metro.co.uk/2026/06/11/watch-world-cup-2026-tv-full-bbc-itv-channel-schedule-28255205/))
and edit the `channel` field for each match as it's confirmed. Venues for a
few later group games were inferred from each group's venue cluster and
should also be double-checked.

Knockout-stage fixtures (Round of 32 onwards) aren't included yet since the
teams aren't determined during the group stage — they can be added to the
same array once the bracket is known.
