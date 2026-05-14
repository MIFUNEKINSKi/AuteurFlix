# AuteurFlix — Design Handover

**Prepared for:** Design team
**Date:** 2026-05-05
**Live site:** https://auteurflix-0vvx.onrender.com
**Repo:** https://github.com/MIFUNEKINSKi/AuteurFlix

---

## 1. What AuteurFlix is

A Netflix-style streaming UI built around the work of acclaimed auteur
directors — Kurosawa, Bergman, Lynch, Bong Joon-ho, and 27 more. It is a
discovery interface (browse + trailers), not a streaming service: "Play"
shows the official YouTube trailer, not the film.

- **31 directors**, **461 films**, ~389 with TMDB-keyed YouTube trailers
- **Stack:** Rails 7 API backend, React 18 + Redux Toolkit (TypeScript)
  frontend, SCSS compiled through webpack, Postgres (Neon), deployed on
  Render free tier
- The catalog is data-driven from TMDB; new directors are added by a rake
  task that ingests their full filmography automatically

## 2. How to look at it

- Live: https://auteurflix-0vvx.onrender.com — click **"Try the Demo"** on
  the splash, or log in with `dan@gmail.com` / `password`
- Free Render instance: first load may take ~30s to spin up
- Key routes once logged in:
  - `/#/browse` — main feed (hero + rows)
  - `/#/director/kurosawa` — a director landing page
  - `/#/directors` — the all-directors grid
  - `/#/search` — search
  - `/#/browse/my-list` — saved list
  - click any card's expand chevron — the details modal

## 3. What was already done (don't redo)

A recent engineering-side overhaul already shipped, so the baseline is
"Netflix-shaped" — please build on it rather than restart:

- Browse hero: poster→trailer crossfade, sound toggle, director/year/
  runtime/rating subtitle
- Card rows: edge-anchored hover scale, ~7-card peek, hover-revealed
  "Explore All", scroll-snap aligned to the 4vw gutter
- Details modal: director-led subtitle, two-column About aside, split
  "More from {director}" / "More Like This" recommendation rails
- Scroll-aware header (transparent over hero → solid on scroll)
- Director landing pages + a Featured Auteurs portrait rail
- Splash: lightened the Criterion poster-grid background, slow pan
  animation, rewrote copy, real FAQ accordion, "Try the Demo" CTA

## 4. Elements that need a design pass — prioritized

### P0 — Color system is incoherent
**Where:** global. **Files:** all of `app/assets/stylesheets/**`.

There are currently **three different reds and an off-brand teal** in
circulation with no system:
- `#e50914` — true Netflix red, used on hero/eyebrow accents
- `#dc2626` / `#ef4444` — the splash signup/demo buttons + splash eyebrow
- `#54b9c5` — a teal on the "Explore All" row-title hover (`.row-explore`,
  `genres_browse.scss`) — reads as a bug, not a choice
- Plus assorted grays (`#e5e5e5`, `#b8b8b8`, `#999`, `#888`, `#a8a8a8`)
  picked ad hoc per file

**Ask:** define one accent red + a small neutral ramp (say 4-5 grays) as
SCSS variables, and a rule for when the accent is allowed to appear.
Right now it's used on eyebrows, the auteur-portrait hover ring, FAQ
toggles, and buttons — no hierarchy.

### P1 — Typography has no shared scale
**Where:** global. **Files:** every SCSS file uses its own `clamp()`.

Each surface invented its own type sizes. The hero title, modal title,
director-page name, splash headline, and row titles are all
independently `clamp()`-ed and don't rhyme. There is no shared scale, no
defined weights-per-role, no line-height system.

**Ask:** a type scale (e.g. 6-7 steps), assigned to roles (page title,
section title, row title, card title, body, meta/caption), applied
consistently. Headings currently range across `clamp(1.8rem…)` to
`clamp(2.2rem, 4.8vw, 4.5rem)` with little logic.

### P1 — Director landing page is under-designed
**Where:** `/#/director/:slug`. **Files:**
`frontend/components/director/director_page.tsx`,
`app/assets/stylesheets/director/director.scss`.

The browse page got real polish; the director page did not. It's a
circular portrait + name + one-line meta + bio paragraph + a flat grid
of cards. It's functional but flat — no hero treatment, no visual
hierarchy between the bio and the filmography, no sense of "this is the
auteur's room." This is the page the whole "auteur-first" concept hinges
on, so it's the highest-value single surface to elevate.

### P1 — Home feed is extremely long
**Where:** `/#/browse`. **Files:**
`frontend/components/browse/genres_index.tsx`.

The feed is now: hero → Featured Auteurs rail → My List → Critics' Picks
→ **31 director rows** → National Cinema header → **~14 country rows** →
By Decade header → **~10 decade rows**. That's ~55 rows on one page.
Netflix caps visible rows and lazy-loads; we render everything.

**Ask:** this is a structural/IA design problem, not just CSS. Options to
weigh: cap director rows to top-N with a "see all directors" link, lazy
mount rows on scroll, collapse National Cinema / By Decade into their own
landing pages reached from section headers, or introduce tabs. Want
design's call on the IA before engineering builds it.

### P2 — Director portrait monogram fallback
**Where:** Featured Auteurs rail, director pages, `/#/directors`.
**Files:** `frontend/components/browse/auteurs_row.tsx`,
`director_page.tsx`, `directors_index.tsx`.

When a director has no TMDB portrait we render a 3-letter monogram
(`KUR`, `BON`) on a per-name gradient. After the TMDB sync most directors
DO have real photos now — design should (a) confirm whether any still
fall back, and (b) decide if the monogram treatment is good enough as a
permanent fallback or should be redesigned.

### P2 — Profiles / auth surfaces untouched
**Where:** `/` (splash login), profile picker, add/edit profile.
**Files:** `frontend/components/profiles/**`,
`frontend/components/splash/login_form.tsx`, `signup_form.tsx`.

These were not part of the overhaul. The profile picker still uses an
image-overlay pattern for the "add profile" tile and basic form styling.
Netflix's profile picker is a distinctive surface — this one is
serviceable but plain.

### P2 — Watch page (`/#/watch/:id`)
**Files:** `frontend/components/movies/show_movie.tsx`,
`app/assets/stylesheets/browse/show_movie.scss`.

Plays a local video or a YouTube iframe fallback, with a "Trailer not
available" empty state for films with neither. The empty state and the
iframe framing are minimal — worth a quick look for polish and for the
back-button affordance.

### P3 — Details modal recommendation cards
**Files:** `frontend/components/browse/details_modal.tsx`, `modal.scss`.

The "More from {director}" / "More Like This" cards show thumb + title +
year + director + rating. Netflix's equivalents are richer (summary
snippet, match %, runtime). Lowest priority — they already function.

## 5. Constraints the design team should know

- **SCSS, not a component/design-token system.** Styles live in
  `app/assets/stylesheets/**` and are plain SCSS compiled by webpack.
  Introducing SCSS variables/maps for color + type is in-scope and
  welcome; a full design-token pipeline would be a bigger lift.
- **No image hosting budget.** All film imagery comes from TMDB
  (posters/backdrops) — design can rely on those being available, but we
  don't commission or host custom art. Director portraits are TMDB
  person photos.
- **It's a portfolio project, not a commercial product.** Copy can be
  honest about that ("built as a portfolio piece", "trailers not full
  films"). Don't design toward a fake subscription flow.
- **Free-tier hosting.** Keep an eye on payload — the home feed already
  loads 461 films' metadata; design choices that add per-card weight
  (big images, heavy effects) compound.
- **Engineering can implement design feedback.** Hand back annotated
  screenshots, a Figma, or written direction — whatever's fastest for
  the team. File/component references above should make it
  straightforward to route changes.

## 6. Suggested order of operations

1. **Color + type systems first** (P0/P1) — everything else inherits
   from these, so doing them first avoids rework.
2. **Director landing page** (P1) — highest-value single surface.
3. **Home feed IA** (P1) — needs a design decision before engineering
   can act; start the conversation early.
4. Monogram fallback, profiles, watch page, modal rec cards as capacity
   allows.
