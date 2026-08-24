# Image assets — /services and /work redesign

Internal record only. Nothing in this file is shown in the page UI — the
Services and Work pages carry no visible "Photo by…", source URL, licence
name or "representative photo" badges. See `docs/asset-sources.md` for the
fuller project history; this file covers only this redesign pass.

## Raster images in active use on /services

None. The Services hero (`EcosystemVisual`) and all four solution-group
visuals (`ServiceGroupVisual`) are original hand-built SVG/CSS
compositions — no photography, no AI-generated renders, no external
licensing to track.

## Raster images in active use on /work

| File | Role | Provenance / licence |
|---|---|---|
| `public/images/projects/bushlite-wifi-dashboard.webp` | Hero collage tile + Featured Project spotlight | Genuine BushLite WiFi product screenshot, downloaded locally in an earlier session from the project owner's own case-study site (`harunlucas.com/projects/bushlite-wifi`), which the user explicitly authorized referencing. Also shown on the homepage by explicit instruction ("Keep BushLite WiFi as featured project… use the verified project screenshot") — the one deliberate cross-page exception to the no-duplicate-imagery rule. |
| `public/images/projects/bushlite-wifi-login-portal.webp` | Hero collage tile | Same provenance/licence as above; downloaded in an earlier session but previously unused. Not shown on the homepage or /services. |

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
| `src/components/motion/service-group-visual.tsx` | /services, 4 group sections | `systems` / `operational` / `commerce` / `integration` variants |
| `src/components/motion/capability-visual.tsx` | /work, 6 capability panels | `workflow` / `inspection` / `maintenance` / `website-device` / `commerce-interface` / `automation-map` variants |
| `src/components/motion/hse-product-visual.tsx` | /work, Internal Products spotlight | A stats/roles mockup for the HSE Management System, distinct from every other HSE visual on the site |
