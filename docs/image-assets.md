# Image assets — /services, /work and /insights

Internal record only. Nothing in this file is shown in the page UI — the
Services, Work and Insights pages carry no visible "Photo by…", source URL,
licence name or "representative photo" badges. See `docs/asset-sources.md`
for the fuller project history; this file covers the redesign, the
subsequent refinement pass, and the new /insights section.

## /insights (new section)

Same approach as /services and /work: every visual is an original hand-built
SVG/CSS composition — no photography, no AI-generated renders, nothing to
license or store as a binary file.

| Component | Used on | Depicts |
|---|---|---|
| `src/components/motion/insight-visual.tsx` | Article pages and their related-article cards | `custom-vs-off-the-shelf` (balance scale) / `plan-business-system` (discovery-node branches) / `website-vs-web-application` (rising complexity spectrum) — one per launch article |

### /insights landing page editorial illustrations (2026-11-21)

Three user-supplied editorial illustrations (pencil sketches on paper with
a hand and pencil). They are illustrations, not product screenshots or
client work, and carry no on-page credit. The landing page no longer uses
`InsightVisual`. An article shows an image on the landing page only when
its `meta.listingImage` is set and the image genuinely illustrates it.

Each web file is lossless WebP (sharp, `lossless: true, effort: 6, exact:
true`), compared against a maximum-compression PNG (`compressionLevel: 9,
adaptiveFiltering: true, palette: false`). Lossless WebP was smaller every
time and was kept; each was decoded and checked pixel-identical to its
source. The source PNGs in `public/images/` are left untouched and are not
referenced by any page. The page serves resized `next/image` variants at
quality 90 (fine pencil lines and handwriting): the hero is 78 KB at
1080w (a 3× phone and 1440px desktop) and 47 KB at 828w (1024px desktop);
the row image is 14 KB at 384w (desktop).

| Web asset (`public/images/insights/`) | Source (`public/images/`) | Original | Max PNG | Lossless WebP (kept) | Used |
|---|---|---|---|---|---|
| `insights-sketchbook-hero.webp` (1672×941) | `Sketching Ideas in Warm Light.png` | 2,454,294 B | 2,221,771 B | 1,599,644 B | /insights hero, `alt=""` (decorative behind the live heading), preloaded |
| `replacement-part-design-sketch.webp` (1672×941) | `Sketching the Right Replacement Part.png` | 2,514,546 B | 2,281,684 B | 1,628,216 B | `listingImage` of `website-vs-web-application` (index row, lazy-loaded): a product page leading to a confirmed request, matching the article's store → portal → internal system spectrum |
| `fieldwork-verification-sketch.webp` (1672×941) | `From fieldwork to working software.png` | 2,663,368 B | 2,387,328 B | 1,698,552 B | Not used yet. No published article is about inspections, corrective actions or verification. Reserve it for the first Engineering & safety systems article. |

The SafetyOS field-inspection photo briefly used as the featured article's
image in an uncommitted pass was removed: the featured article mentions
inspection steps only in passing, so it is now text-led.

Each article's `featuredImage` frontmatter field is a visual-variant key
(e.g. `"custom-vs-off-the-shelf"`), not a file path — `InsightVisual`
switches on it. `featuredImageAlt` is the real accessible description,
applied via `role="img"`/`aria-label` on the wrapping element. See the
comment on the `Insight` type in `src/content/insights.ts` for the reasoning.

## Refinement pass (this session)

- BushLite screenshots are no longer used in the /work hero — the hero now
  uses `WorkIndexVisual`, an original bento-grid composition (software
  systems / operational products / websites / integrations / managed
  platforms), so genuine BushLite screenshots are reserved for the
  Featured Project section only, per instruction.
- The previously-unused `bushlite-wifi-login-portal.webp` now appears as a
  secondary screenshot inside that same Featured Project section (still
  never in the hero, still never duplicated elsewhere).
- Added page-specific Open Graph / Twitter share images, generated at
  request time via `next/og` (`src/lib/og-image.tsx` + one
  `opengraph-image.tsx`/`twitter-image.tsx` pair per page). These are
  rendered code, not stored binaries — nothing to license or store
  locally.
- All four /services group visuals and one /work capability visual were
  revised for clarity/distinctness; no new binary assets were introduced.

## Raster images in active use on /services

None. The Services hero (`EcosystemVisual`) and all four solution-group
visuals (`ServiceGroupVisual`) are original hand-built SVG/CSS
compositions — no photography, no AI-generated renders, no external
licensing to track.

## Raster images in active use on /work

| File | Role | Provenance / licence |
|---|---|---|
| `public/images/projects/bushlite-wifi-dashboard.webp` | Featured Project spotlight (primary image) | Genuine BushLite WiFi product screenshot, downloaded locally in an earlier session from the project owner's own case-study site (`harunlucas.com/projects/bushlite-wifi`), which the user explicitly authorized referencing. Also shown on the homepage by explicit instruction ("Keep BushLite WiFi as featured project… use the verified project screenshot") — the one deliberate cross-page exception to the no-duplicate-imagery rule. |
| `public/images/projects/bushlite-wifi-login-portal.webp` | Featured Project spotlight (secondary image) | Same provenance/licence as above. Not shown on the homepage, /services, or the /work hero — reserved exclusively for the Featured Project section. |

No screenshot of the HSE Management System (`hse-login.webp`,
`hse-create-account.webp` — both already shown on the homepage) is used on
/work. The Internal Products section instead uses a hand-built SVG concept
composition (`HseProductVisual`), specifically so /work does not repeat
homepage imagery for the same product. The six capability-area panels
(`CapabilityVisual`) are likewise all original SVG/CSS — no photography.

## Removed this session

Six Pexels-licensed stock photographs, added to /services in the prior
session and superseded by this redesign's shift to original interface
compositions (per the "Original or generated 3D software visuals" >
"credible interface compositions" > "photography" priority order). Deleted
from `public/images/services/` as fully orphaned once no content
referenced them. Recorded here only so the licence history isn't lost:

| Former file | Source | Photographer | Licence |
|---|---|---|---|
| `software-systems-code.webp` | pexels.com/photo/coding-script-965345 | Markus Spiske | Pexels License (free to use, no attribution required) |
| `hse-safety-helmets.webp` | pexels.com/photo/collection-of-construction-safety-helmet-38070 | ClickerHappy | Pexels License |
| `engineering-equipment-gauge.webp` | pexels.com/photo/steel-pipes-with-pressure-gauge-7937300 | Pavel Danilyuk | Pexels License |
| `growth-market-chart.webp` | pexels.com/photo/close-up-photo-of-monitor-159888 | energepic.com | Pexels License |
| `integrations-connected-cables.webp` | pexels.com/photo/ethernet-cables-plugged-on-a-server-rack-1054397 | Josh Sorenson | Pexels License |
| `hosting-data-center.webp` | pexels.com/photo/black-hardwares-on-data-server-room-4597280 | Brett Sayles | Pexels License |

The prior session's on-page credit line ("Photo by … (Pexels) —
representative photo, not a Kipeo Digital project") is gone along with the
images themselves — moot now, but note for the record that the Pexels
License never required that attribution to begin with; it was a
transparency choice at the time, since revised.

## SVG/CSS compositions authored this session

All are plain code — no binary asset, no licence to track, and each is
authored once per component so no two pages can end up sharing the literal
same file.

| Component | Used on | Depicts |
|---|---|---|
| `src/components/motion/ecosystem-visual.tsx` | /services hero | Six labelled nodes (interface, app logic, database, automation, deployment, monitoring) around a central core |
| `src/components/motion/service-group-visual.tsx` | /services, 4 group sections | `systems` (fanned layered-architecture card stack) / `operational` (inspection record + equipment state) / `commerce` (device + catalogue + enquiry path + trend line) / `integration` (APIs → pipeline → cloud health) |
| `src/components/motion/work-index-visual.tsx` | /work hero | A 5-tile bento grid — software systems, operational products, websites, integrations, managed platforms |
| `src/components/motion/capability-visual.tsx` | /work, 6 capability panels | `workflow` (process canvas) / `inspection` (hazard → corrective action) / `maintenance` (equipment-state list) / `website-device` (browser + device + enquiry path) / `commerce-interface` (catalogue + orders + status) / `automation-map` (connected-tools + trigger) |
| `src/components/motion/hse-product-visual.tsx` | /work, Internal Products spotlight | An icon/roles mockup for the HSE Management System, with no numeric statistics — distinct from every other HSE visual on the site |
| `src/lib/og-image.tsx` | /services and /work Open Graph + Twitter images | Branded share-image template, parameterised per page |
