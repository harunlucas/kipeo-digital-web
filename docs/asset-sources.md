# Homepage visual assets

## Decision: no external stock photography

The homepage redesign uses **no downloaded stock photographs**. This was a
deliberate art-direction choice, not an oversight:

- No genuine Kipeo Digital project screenshots have been approved yet
  (confirmed by inspecting `@reference-old-site`, whose own
  `IMAGE-CREDITS.md` explicitly states its stock imagery "must not be
  presented as Kipeo Digital client work"). Using generic stock photos in
  their place would misrepresent unfinished/placeholder content as real
  work, which the project brief explicitly prohibits.
- The brief's own preferred asset categories — "abstract technology
  imagery," "premium 3D compositions," "architectural or geometric digital
  forms" — describe exactly what this redesign builds natively in code
  (CSS 3D panels, SVG artwork, layered device frames), so no external image
  file is needed to satisfy them.
- The brief explicitly warns against "random decorative stock
  photographs" and staged office/handshake photography, which is the
  majority of what's freely available and relevant-sounding on Unsplash/
  Pexels for a "digital agency" search — reviewed the GHJ Dev reference
  site (which relies heavily on exactly this kind of generic staged
  photography plus fabricated stats and testimonials) as a negative
  example of what to avoid, not a pattern to follow.

All homepage imagery is instead original, hand-built SVG/CSS artwork,
authored directly in the component files below (no binary assets, so
nothing to store under `public/images/`):

| Visual | Component | Purpose |
|---|---|---|
| Dimensional hero cluster | `src/components/motion/hero-visual.tsx` | Layered "glass" panels in real 3D perspective, representing connected digital capability |
| Per-pillar service artwork | `src/components/motion/service-tabs.tsx` | Distinct abstract SVG motif per service pillar (nested windows, connected nodes, ascending bars, radiating rings) |
| System-type artwork | `src/components/motion/system-card.tsx` | Abstract dashboard/app/commerce device-frame illustrations for the "Systems we build" showcase |
| Problem→solution artwork | `src/components/motion/problems-showcase.tsx` | Generative connected-node illustration that reconfigures per selected problem |
| Global collaboration cards | `src/components/motion/global-stack.tsx` | Layered timezone/milestone cards |

## If real project imagery becomes available

`src/content/projects.ts` already defines a typed `Project` shape (title,
category, problem, solution, technologies, image, url, collaboration,
contribution, outcome) ready to receive genuine, approved screenshots.
When real images are supplied:

1. Save them under `public/images/projects/<project-slug>/` using
   descriptive lowercase filenames, converted to WebP.
2. Reference them via `next/image` with explicit `width`/`height` (or
   `fill` inside a sized container) to avoid layout shift.
3. Record the source/ownership of each screenshot in this file.
4. Swap the homepage's "Systems we build" capability showcase for the
   real "Selected work" section once at least one project is approved.

## Verification performed this session

- Checked `@reference-old-site` for any project the brief could point to:
  only "PlagAiReport" is named (About page), with no screenshot, no URL,
  no confirmed technologies, and an explicit note in the prior audit that
  it needs client confirmation before reuse.
- Fetched `harunlucas.com` directly: no "PlagAiReport," "GHJDev," or
  "Kipeo" project appears there. The one real, verified, documented
  project (BushLite WiFi — Node.js/Express hotspot management system) is
  presented as Harun Lucas's personal work, not as Kipeo Digital
  delivered/collaborative work, so using it as a Kipeo case study would
  misattribute authorship. It was not used.
