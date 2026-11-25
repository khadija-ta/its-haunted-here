# It's Haunted Here — project guide for Claude Code

A mobile-first website where people discover and share ghost stories, local legends and personal paranormal encounters pinned to real places in **Ann Arbor** and **Lahore**. Final project for SI 535 (vibe coding class, University of Michigan). Due early December 2026.

## About the person you're working with
- Khadija is a UX student with **no computer science background**.
- Explain what you're doing in plain language, one short paragraph at most. No jargon without a one-line explanation.
- When she needs to do something herself (sign up for a service, paste a key, run a command), give **2–3 steps at a time**.
- Build in small, working steps. After each step, tell her how to see it running.

## Tech stack
- React + Vite (JavaScript, not TypeScript)
- Leaflet for the map, with **CARTO Dark Matter** tiles (needs a free key; keep "© OpenStreetMap contributors, © CARTO" visible on the map)
- Browser Geolocation for "locate me" (ask for location only when the button is tapped)
- Nominatim (OpenStreetMap) for place search and pin → place name
- Supabase for the database and accounts
- Vercel for hosting
- All keys live in a local `.env` file. **Never commit `.env`**: add it to `.gitignore` and provide `.env.example`.
- Keep `README.md` up to date: what to install, how to add keys, which command runs it. Someone must be able to run the project from the README alone.

## Scope
**Must have (MVP):**
1. Story map: pins for the selected city (Ann Arbor / Lahore toggle + place search)
2. Story types: Local folklore, Personal encounter, Invented legend
3. Post a story: drop a pin (inside the two cities only), then type, title and story (required); type of place, time of day and "what happened" tags (optional)
4. Accounts: sign up / log in to post, vote and save; profile lists your stories with Pending / Live / Rejected
5. Upvote + "This happened to me too" (encounters only)
6. Growing legends (invented legend pins grow with votes + retellings) and hotspots (3+ personal encounters within ~100 m become a glowing zone)
7. Moderators: one per city; new stories stay hidden until a moderator in that city approves them. Moderators check for real living people's names and private homes.
8. Report a story: sends it back to that city's moderator queue

**Stretch (only if time allows):** Retellings (linked to the original legend, counts toward growth).
**Out of scope:** haunted walk routes, auto pre-check, moderator promotion. Moderators are assigned by hand in Supabase.

## Screens and navigation
- **Map (home):** small logo at top (tap = back to map), city toggle, search, pins, legend, locate-me button
- **Story sheet:** slides up over the map (~80% height), never a separate page
- **Post a story:** one scrolling page
- **Profile**, **Moderator queue** (Pending + Reported tabs, own city only)
- **Sign-in sheet:** slides up from the bottom only when someone tries to vote or post. Browsing never needs an account.
- **Bottom tab bar** on every screen: Map · + (Post) · Profile. No hamburger menu.
- No pop-ups or modals: use sheets and inline messages ("Sent for review!").

## Map pins
- Local folklore: teal circle
- Personal encounter: red diamond
- Invented legend: gold dashed circle that grows with votes + retellings
- Hotspot: large soft red glow
- Pins differ by **shape and color**, never color alone.

## Style guide (final, don't change without asking)
Dark theme. These are the only colors:

| Role | Hex |
|---|---|
| Page background | #0A0C1B |
| Sheets / cards | #171934 |
| Main text, headings, story titles | #E2DDBD |
| Secondary text (meta, author, dates) | #8E8E92 |
| Folklore pins + legend only | #4B8D77 |
| Encounter pins, hotspot glow, logo word "Haunted", + tab button | #D42F1E |
| Red text (Report, place names in titles, encounter badge) | #EE5A4A |
| Invented legend pins + main buttons | #DFC85E |
| Tags, links, Save, focus rings | #A8D2E8 |
| Borders | #2C3050 |

Rules:
- Gold is never used for headings or titles.
- Teal appears only on folklore pins and the legend.
- #D42F1E is never used for small text; use #EE5A4A for red text.

Fonts (Google Fonts):
- **Alfa Slab One**: logo, screen headings, story titles (cream)
- **Creepster** (sparingly, in #EE5A4A): the word "Haunted" in the logo, the place name inside a story title (e.g. "The well at *Cobblestone Farm*", ~32px), success and empty-state headlines
- **Inter**: all body text, buttons, forms, tags
- **Noto Nastaliq Urdu**: Urdu tag labels, **Lahore stories only**, never on Ann Arbor screens

Components:
- Every tap target is at least 44×44 px.
- Main button: gold fill + #0A0C1B text. Secondary: cream outline. Tertiary: ice blue text.
- Tags: ice blue outline + text. Selected (post form): solid ice blue + dark text.
- Story type badge: tinted background of the type's color + matching text.

## "What happened" tags
- Sounds: Whispers (سرگوشیاں sargoshiyan), Footsteps on stairs or roof, A voice calling your name, Knocking, Laughter or giggling
- Body: Cold spot, Unseen touch, Pressed down in sleep (بختک bakhtak), Feeling watched
- Surroundings: Things moving or falling, Doors opening or closing, Lights or electronics acting up, Food spoiling fast, Strange smell
- Sightings: A figure, Animals acting strange
- Urdu labels show on Lahore stories only.

## Type of place (optional field)
Old tree, Graveyard, Haveli / old house, Historic site, Campus, Restaurant / shop, Street / road, Other

## Accessibility and mobile
- Design for a 390px-wide phone first; it should still work on desktop.
- Text contrast at least 4.5:1. Real `<button>`, `<a>`, `<label>` elements. `aria-label` on icon-only buttons.
- Keep animations subtle and turn them off with `prefers-reduced-motion`.

## Content rules
- Seed stories are written by Khadija. Never copy text from websites. Use clearly marked placeholders until she supplies her own.
- Stories must not name real living people or point to private homes.
