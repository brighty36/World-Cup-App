# World Cup 2026 Fixtures

A mobile-friendly PWA for following the 2026 FIFA World Cup. Add it to your
phone's home screen for a quick fixture list.

## Features

- Two tabs: **Upcoming** and **Completed**.
- **Upcoming** shows all group-stage fixtures still to be played, in
  chronological order, grouped by day.
  - **Days run 4am to 4am (UK time)**, so a match kicking off at, say, 2am on
    Sunday is shown under Saturday night (marked with a 🌙 and the actual day).
  - Each fixture shows the UK kickoff time, group, venue/city, and the UK TV
    channel (BBC/ITV).
  - Search by team, venue or city, and filter by group.
  - "Today" button jumps to the current match day.
- **Completed** shows finished (and in-progress) matches with their score and
  goal scorers, most recent first. For each match you can:
  - Check off how you watched it (full 90 mins / extended highlights / short
    highlights).
  - Open a BBC Sport search for the match report.
  - Jot down your own notes.
  - This diary data (watched status + notes) is saved in your browser's
    local storage, so it stays on your device only.
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

All fixture data lives in [`src/data/fixtures.json`](src/data/fixtures.json)
as a plain array — each match has a date/time (`utcKickoff`, stored in UTC),
group, teams, venue, city, country and UK `channel`.

This data was compiled from publicly reported schedules as of 15 June 2026,
including the UK TV channel (BBC One/Two or ITV1/ITV4, plus STV for
Scotland's games) for every group-stage match. Venues for a few later group
games were inferred from each group's venue cluster and should be
double-checked against the official FIFA fixture list.

Knockout-stage fixtures (Round of 32 onwards) aren't included yet since the
teams aren't determined during the group stage — they can be added to the
same array once the bracket is known.

## Match results, scorers and live updates

Results, status and goal scorers live separately in
[`src/data/results.json`](src/data/results.json), keyed by fixture `id`. A
fixture moves to the **Completed** tab once it has an entry there.

This file is updated by running:

```bash
npm run update-results
```

which fetches the latest scores and goal scorers for the tournament from
[TheSportsDB](https://www.thesportsdb.com/) and merges them into
`results.json`. You can also run this from GitHub via the **Update results**
action (Actions tab → "Update results" → "Run workflow") — it commits and
pushes any changes, which triggers a redeploy of the site. There's no
automatic schedule, so run it manually whenever you want the latest scores.
