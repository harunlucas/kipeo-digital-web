# Homepage visual assets

## /work premium redesign, round two (this session, /work only)

Rebuilt /work's presentation without touching any component the homepage
or /studio depend on — three new components (`WorkFeaturedSpotlight`,
`CapabilityPanel`, `WorkHeroVisual`) were built fresh rather than extended
from `FeaturedProjectCard`/`CapabilityPathCard`, specifically because this
pass needed larger media, a dark capability-panel treatment, a
non-self-referencing CTA, and a shortened per-card disclaimer — all things
that would have changed those shared components' behaviour on the
homepage if edited in place instead.

Related-website attribution copy was rewritten to the exact wording
requested, dropping "same person behind Kipeo"/"same builder"/repeated
"not built by Kipeo" phrasing — Kipeo stays team-attributed, not
personalised to one name. New `AttributionLegend` explains the five
classification terms once, up front, instead of each card re-explaining
itself.

Verified: no `harunlucasdev.site` references exist anywhere in `src/`; no
personal name is used as Kipeo's public-facing identity anywhere in
content.

## /work redesign (this session, /work only — homepage and /studio untouched)

Rebuilt `/work` as a filterable portfolio page. New `src/content/work.ts`
defines the filter categories and a fresh `relatedWebsites` array
(CynthiaMueni.com, HarunLucas.com) with **per-site** classification —
CynthiaMueni.com as `related-work` (an independent professional site, not
built or managed by Kipeo), HarunLucas.com as `team-contribution` (built
and maintained by the same person behind Kipeo Digital). Deliberately
built fresh rather than reusing the homepage's merged "websites"
`CapabilityPath` entry, which shows both screenshots in one generic card
with no per-site distinction — not fine-grained enough for what this page
asks for, and changing that shared entry would have changed the homepage.

`selected-work.ts` was not modified — `/work` reuses `featuredWork` and
the `engineering`/`commerce`/`systems` (HSE) `capabilityPaths` entries by
id, purely by reading their existing fields.

`ProductSpotlight` gained an optional `screensLabel` prop (default
`"Current development screens"`, unchanged for the homepage's existing
call site) so `/work` alone can pass `"Current authentication screens"` —
more accurate, since the only real screenshots shown are the login and
registration screens.

Removed as no longer used anywhere: the three fake "Selected system — in
development" placeholders (`InDevelopmentSystems` component and
`content/projects.ts`, which had no other content once those were gone).

Filtering (`WorkExplorer`, a client component) is category-tag driven
across `all` / `live` / `websites` / `software-systems` /
`hse-operations` / `technical-systems` / `commerce-platforms`. First
attempt read the active filter via `useSearchParams()`, which forces Next
to skip static prerendering for that subtree — verified by curling the
built output and finding an `animate-pulse` skeleton in place of the real
content, meaning crawlers and no-JS visitors would have seen an empty
loading state on every filter, including the default "All" view. Fixed by
switching to plain `useState("all")` for reading the active filter (so
the full, real portfolio content is always in the static HTML) while
still writing to the URL via `router.replace` on each click — the
one-directional tradeoff being that a deep link like `/work?filter=live`
lands on the unfiltered view rather than pre-selecting that filter, since
reading it back would reintroduce the same prerendering problem.

## Real project imagery (added this session)

One genuine, verifiable software project — BushLite WiFi — is presented in
the "Selected digital work" section. Its screenshots were downloaded
locally (not hotlinked) from the original, non-optimized source path on
the public case-study site:

| Local file | Original source | Used |
|---|---|---|
| `public/images/projects/bushlite-wifi-dashboard.webp` | `https://harunlucas.com/images/projects/bushlite-dashboard.webp` | Featured image in the "Selected digital work" section |
| `public/images/projects/bushlite-wifi-login-portal.webp` | `https://harunlucas.com/images/projects/bushlite-wifi-login-portal.webp` | Downloaded, not currently used on the homepage — available for the future Work/Services page |
| `public/images/projects/bushlite-wifi-access-point.webp` | `https://harunlucas.com/images/projects/bushlite-network-device.webp` | Downloaded, not currently used — hardware photo, less relevant to a software-agency presentation than the UI screenshots |

**Licence/ownership:** these are the project owner's own case-study
images, referenced from `https://harunlucas.com/projects/bushlite-wifi`,
which the user explicitly authorized linking to this session. Format is
already `.webp`; no further optimization was applied since file sizes
(79–97KB) are already reasonable for hero-sized imagery.

**Attribution:** BushLite WiFi is disclosed on-page as "Independently
developed software work, shared as an example of related systems
capability — not a Kipeo Digital client project," per the user's
instruction not to disguise it as Kipeo-delivered or Kipeo-owned work.
The featured card links out to the case study with a visible external-link
indicator (`<ExternalLink>` icon + `target="_blank"`, `rel="noopener
noreferrer"`).

## HSE Management System screenshots (added this session)

A second real, in-development product — an HSE/EHS management system
("SafetyOS") associated with the Kipeo team — is shown inside the
"Business and HSE systems" capability card.

| Local file | Original source | Used |
|---|---|---|
| `public/images/projects/hse-management-system/hse-login.webp` | `https://safety-management-system-seven.vercel.app/login` | Embedded-project screenshot 1 |
| `public/images/projects/hse-management-system/hse-create-account.webp` | `https://safety-management-system-seven.vercel.app/register` | Embedded-project screenshot 2 |

**What was and wasn't captured:** the app is fully auth-gated — no public
demo/dashboard route exists (`/demo`, `/dashboard`, `/features` etc. all
redirect to `/login`). Only the sign-in and registration screens were
safely reachable without authenticating. The login screen does publish its
own "Demo accounts" panel (fictional `@safetyos.local` emails, a shared
placeholder password) inviting exploration, but logging in — even with
those self-published demo credentials — was blocked by this session's
safety controls as a login action, so no dashboard, inspection,
hazard-reporting or corrective-action screens were captured. **If
richer product screens are wanted** (the dashboard/inspection/
corrective-action views originally requested), someone with authorization
should log in manually and supply screenshots, or explicitly grant
permission for an assisted login in a future session.

**Licence/ownership:** screenshots of the team's own product, downloaded
locally (not hotlinked) and converted to WebP (~15KB each). No personal
names, workplace data, incidents or credentials are visible — both
screens show only branding and empty/placeholder form fields.

**Attribution:** presented as "Digital product development associated
with Kipeo Digital, informed by related HSE practice documented at
CynthiaMueni.com," status "Active development" — explicitly not
described as a completed client project, per instruction.

## Related website screenshots (added this session)

Restrained homepage screenshots of the two personal/professional sites
associated with the Kipeo team, used in the "Websites and digital
presence" capability card as related-work evidence (not claimed as Kipeo
client projects).

| Local file | Original source | Used |
|---|---|---|
| `public/images/projects/related-websites/cynthiamueni-home.webp` | `https://cynthiamueni.com/` | Websites capability card, image 1 of 2 |
| `public/images/projects/related-websites/harunlucas-home.webp` | `https://harunlucas.com/` | Websites capability card, image 2 of 2 |

**Licence/ownership:** public marketing homepages belonging to the same
individuals already credited elsewhere on this site (BushLite WiFi
attribution, HSE-expertise link). Downloaded locally, converted to WebP.
Attribution on-page: "Related website work associated with the Kipeo
Digital team."

## Everything else: original SVG/CSS artwork, no stock photography

Every other visual on the homepage remains hand-built SVG/CSS/HTML,
authored directly in the component files below — no binary assets:

| Visual | Component | Purpose |
|---|---|---|
| Dimensional hero core + orbiting surfaces | `src/components/motion/hero-visual.tsx` | Pointer-responsive 3D composition (real `perspective`/`translateZ`, animated SVG data-paths via native `<animateMotion>`) representing connected digital capability |
| Per-pillar service artwork | `src/components/motion/service-tabs.tsx` | Distinct abstract SVG motif per service pillar |
| Capability path artwork | `src/components/motion/capability-path-card.tsx` | Abstract SVG illustrations for the "Engineering and technical systems" and "E-commerce and managed platforms" cards (the latter explicitly labelled "Commerce capability illustration," never styled as completed client work); the "Websites" and "Business and HSE systems" cards use real screenshots instead — see below |
| Problem→solution artwork | `src/components/motion/problems-showcase.tsx` | Five distinct interface illustrations (enquiry pipeline, operations dashboard, lead-gen website, automated workflow, commerce catalogue) matched to each selected problem |
| Layered architecture visual | `src/components/sections/home/capabilities.tsx` | Three offset "layer" cards (infrastructure / applications / frontend) suggesting system depth |
| Scheduling/collaboration panel | `src/components/ui/schedule-panel.tsx` | Premium-style meeting-availability interface (Nairobi/EAT row, generic "your time" row, overlap window, milestone checklist) |

This was a deliberate choice, not an oversight, for the sections above:
the brief's own preferred asset categories ("abstract technology imagery,"
"premium 3D compositions," "architectural or geometric digital forms")
describe exactly what these components build natively, and the brief
explicitly warns against generic stock photography (staged offices,
handshakes, unrelated laptops) — most of what's readily available and
"agency"-relevant on Unsplash/Pexels falls into that category. The GHJ Dev
reference site, which leans heavily on exactly that kind of staged
photography plus fabricated stats and testimonials, was reviewed as a
negative example to avoid, not a pattern to follow.

## 3D approach used in the hero

CSS/HTML dimensional composition (Option C), not WebGL. `three` /
`@react-three/fiber` / `@react-three/drei` were **not** installed. The
hero uses real 3D CSS (`perspective`, `translateZ`, `preserve-3d`), a
pointer-responsive tilt via Motion's `useMotionValue`/`useSpring`, and
native SVG `<animateMotion>` for the data-path flow dots. Rationale:

- No WebGL asset or scene could be procedurally justified as "clearly
  better" within this session's verification constraints (SSR/dynamic-
  import correctness, static fallback, mobile GPU behaviour) versus the
  reliability of a CSS-native approach that needs no fallback because
  there is nothing that can fail to load.
- `[data-hero-stage]` on the outer container remains the intended future
  mount point if a real WebGL scene is ever justified later — the
  surrounding hero layout would not need to change.

## If more real project imagery becomes available

`src/content/projects.ts` still defines a typed `Project` shape ready to
receive additional genuine, approved case studies beyond BushLite. When
supplied:

1. Save under `public/images/projects/<project-slug>/` with descriptive
   lowercase filenames (WebP where practical).
2. Reference via `next/image` with explicit `sizes` to avoid layout shift.
3. Record source/ownership/licence in this file.
4. Expand "Selected digital work" from one featured project to up to
   three, per the brief's cap.

## Homepage restructure and /work, /studio (added this session)

The Interactive Studio 3D canvas moved off the homepage entirely — it now
mounts only on the new `/studio` page (`src/app/studio/page.tsx`), reached
from a compact static teaser on the homepage
(`src/components/sections/home/interactive-studio-section.tsx`) that reuses
the existing `StudioFallback` SVG (no new art asset) plus a CTA. This
removes the large, unreliable inline WebGL section the user flagged, without
discarding the original low-poly scene — it's kept, refined (the previously
decorative commerce/CMS panel mesh is now wired to the same hotspot as
"deployment", matching the brief's "commerce, deployment and support"
grouping), and given a full page.

`hse-create-account.webp` (downloaded previously, unused until now) is now
shown as the second screenshot in the HSE Management System embedded
project, alongside `hse-login.webp`.

The "engineering" capability card intentionally remains a labelled
illustration (`illustrationLabel`, dashed-border badge), not a screenshot.
Per the verification already recorded above, HarunLucas.com's own listed
projects beyond BushLite are personal engineering research explicitly
excluded by the brief, so no genuine, on-topic engineering screenshot exists
to use — forcing an unrelated one would misrepresent it. This is the one
open item still awaiting real project material (see the session's final
report for the same note).

`/work` (`src/app/work/page.tsx`) fixes the previous 404 by reusing the
same `featuredWork` / `capabilityPaths` content and card components as the
homepage — no new or fabricated case studies — plus an honest "in
development" section built from the existing `content/projects.ts`
placeholders, unchanged in substance.

## Engineering-capability image search, re-checked (this session)

Re-verified whether a genuine, on-topic image exists for the "Engineering
and technical systems" capability card, since the brief names
HarunLucas.com as a source for it. Fetched `harunlucas.com/projects`
directly and downloaded the two most relevant candidate images
(`predictive-featured.webp`, "AI-Based Predictive Maintenance", and
`cnc-python-automation.webp`, "Python CNC Automation") to inspect them
directly rather than assume.

**Both are generic stock photography** — a staged studio photo of a person
at a laptop next to automotive wiring-harness rigging, and a staged
macro shot of a CNC drill bit — not real screenshots or photos of
HarunLucas's own project work. Using either would be exactly the kind of
"generic stock photography" the brief prohibits and would misrepresent
stock imagery as related engineering work. **Not used** on HarunLucas.com
grounds specifically — the card's image was later replaced anyway, see
"Capability-card imagery, final state" below. The existing text link to
`harunlucas.com/projects` stays as the honest "related expertise" pointer.

## Badge-logic fix (this session)

`CapabilityPathCard` computed its "Real screenshots" vs. illustration
badge from whether `illustrationLabel` was set in content, rather than
from whether the card actually had `screenshots`. The "Engineering and
technical systems" card had neither field set, so it fell through to the
"Real screenshots" default while rendering the SVG illustration —
mislabeling an illustration as a real screenshot. Fixed in two places:
`illustrationLabel` is now set on the engineering entry in
`selected-work.ts`, and the badge logic itself now derives `isIllustration`
from `!path.screenshots` so this class of bug can't recur regardless of
what content authors remember to set.

## Studio homepage preview, superseded CSS-3D pass (history only)

The homepage teaser's static preview was first upgraded from a reused copy
of `StudioFallback` (the WebGL loading-fallback SVG) to a purpose-built
`StudioPreviewStatic` component using genuine CSS-3D depth (`perspective`/
`translateZ`, the same technique as `hero-visual.tsx`). **Superseded** by
the section below once the user supplied real studio images — kept here
only as a record.

## Kipeo Studio redesign: WebGL scene retired, image-based studio built (this session)

The user supplied two AI-generated concept renders directly into
`public/images/projects/studio/` (ChatGPT-generated, converted to WebP via
the same local `sharp` conversion used for the capability-card images —
`kipeo-studio-isometric.webp`, a full round-platform view of a "Kipeo
Studio" workspace with distinct zones for design, application dev,
integrations/servers, HSE and deployment; `kipeo-studio-workstation.webp`,
a closer single-desk crop of the same illustrated workspace) and asked for
the whole Kipeo Studio experience to be redesigned around them.

This **replaces** the earlier React Three Fiber / Drei low-poly 3D scene
entirely — the brief's original request for an orbit/drag WebGL scene is
superseded by this explicit, detailed, image-based redesign instruction.
Removed as dead code once nothing else referenced it:
`src/components/three/` (all six files — `kipeo-studio.tsx`,
`kipeo-studio-scene.tsx`, `studio-hotspots.tsx`, `studio-fallback.tsx`,
`studio-error-boundary.tsx`, `studio-preview-static.tsx`) and the
`three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`
dependencies (`npm uninstall`, confirmed nothing else imported them via
`grep` first).

New structure:
- **Homepage teaser** (`interactive-studio-section.tsx`): the isometric
  image via `StudioTeaserVisual` — a restrained (max 2°), mouse-only
  pointer tilt plus CSS hover-scale and a soft glow, disabled for
  touch/pen input and under `prefers-reduced-motion` (same guard pattern
  as `hero-visual.tsx`'s `pointerType !== "mouse"` check).
- **`/studio` hero**: the workstation image, same `StudioTeaserVisual`
  component reused for visual consistency.
- **`/studio` interactive workspace** (`StudioWorkspace`): the isometric
  image again, full-width, with six real `<button>` pins positioned by
  percentage — native keyboard/mouse/touch support (no custom key
  handling needed), 44px minimum touch target, `aria-live` description
  panel below. Pin coordinates are estimated against the image's visible
  zones (top-left device/wireframe shelf → interface; top-right
  servers/robotics → integrations; center desk → applications; bottom-left
  lounge → strategy; bottom-center clipboard/shield → operations;
  bottom-right monitor/cloud → deployment) — worth a visual check against
  the actual rendered positions since they weren't pixel-measured.
- **Project journey, Behind the interface, Capability selector,
  Collaboration model**: new `src/content/studio.ts` content, reusing
  existing components/content wherever the shape matched instead of
  duplicating — `ServiceTabs` (widened from a `ServicePillarId`-only prop
  to plain `string` so it can carry a new studio-only pillar) for the
  capability selector, `TrustPath` + the existing `trustCommitments` verbatim
  for the collaboration model, a new lightweight non-animated
  `StudioJourney` for the 8-stage path.

## Capability-card imagery, superseded stock-photo pass (this session, history only)

Per the user's request for better images sourced from the open web (not
restricted to HarunLucas.com/CynthiaMueni.com), free Pexels photos were
initially sourced and used for the "Business and HSE systems,"
"Engineering and technical systems" and "E-commerce and managed platforms"
cards (Mikael Blomkvist's hard-hat/clipboard photo, Bulat843's control-panel
photo, Tiger Lily's warehouse-scanning photo — all Pexels License, verified
"Free to use," and checked to confirm they weren't the paid `plus.unsplash.com`
tier two earlier Unsplash candidates turned out to be). **These files were
removed later the same session** and replaced by the user's own images —
see "Capability-card imagery, final state" directly below. Kept here only
as a record of what was tried; there is nothing left in the repo from this
pass.

## Capability-card imagery, final state (this session)

The user then supplied five AI-generated concept renders directly (saved
into `public/images/projects/capability-photos/` from outside this
session, ChatGPT-generated), asking that they replace the Pexels photos.
Three map one-to-one onto the three capability cards and are in use. The
other two (`hse-app-multidevice-concept.webp`, a general multi-device app
UI, and `hse-mobile-capture-concept.webp`, a phone-based hazard-photo
capture flow) are both HSE-themed — asked the user where they should go
rather than guess, since the one place they'd obviously fit (the "HSE
Management System" embedded panel) shows a real, disclosed, in-development
product, and mixing in an AI mockup there needed to stay unambiguous. User
chose to add them alongside the real screenshots. They're rendered in
their own separate, visually distinct row (`EmbeddedProject.conceptVisuals`
in `selected-work.ts`) below the real `hse-login`/`hse-create-account`
screenshots — dashed borders, a small per-thumbnail "Concept" tag, and the
row header "Concept previews — not the real product" — never merged into
the `screenshots` array itself, so the real/generated distinction stays
visible at the component level, not just in a caption.

| Local file | Used on | Nature |
|---|---|---|
| `public/images/projects/capability-photos/hse-systems-concept.webp` | "Business and HSE systems" card (top visual) | AI-generated concept render |
| `public/images/projects/capability-photos/engineering-systems-concept.webp` | "Engineering and technical systems" card (top visual) | AI-generated concept render |
| `public/images/projects/capability-photos/commerce-platform-concept.webp` | "E-commerce and managed platforms" card (top visual) | AI-generated concept render |
| `public/images/projects/capability-photos/hse-app-multidevice-concept.webp` | HSE Management System embedded panel, concept-previews row | AI-generated concept render |
| `public/images/projects/capability-photos/hse-mobile-capture-concept.webp` | HSE Management System embedded panel, concept-previews row | AI-generated concept render |

Converted from the user's original JPGs to WebP locally via the `sharp`
package already in `node_modules` (quality 82, no external upload needed).
Each card badge reads **"Concept visual"** (not "Real screenshots" or
"Representative photo") and shows an explicit text disclosure: **"AI-
generated concept visual — not a real product screenshot or client."**
This is the third category on `CapabilityPath.capabilityVisual.kind` in
`src/content/selected-work.ts` (`"photo"` for a credited real stock photo,
`"concept"` for a generated render) — `CapabilityPathCard` derives its
badge and disclosure from `kind`, never from a label content forgot to
set, the same fix applied earlier to the screenshots-vs-illustration case.

## Verification performed

- Checked `@reference-old-site`: only "PlagAiReport" is named (About
  page), with no screenshot, URL or confirmed technologies — not usable.
- Fetched `harunlucas.com/projects` directly: confirmed BushLite WiFi is
  the only mature, fully-documented project with a public case-study page,
  verified technologies, and real screenshots. The other two listed
  projects (AI/predictive-maintenance research, CNC/Python automation) are
  personal engineering research, explicitly excluded by the brief.
- Confirmed the BushLite screenshots' original (non-Next.js-optimized)
  URLs resolve directly (HTTP 200) before downloading, so the local copies
  are full quality, not resized `_next/image` proxies.
