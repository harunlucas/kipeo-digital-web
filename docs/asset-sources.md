# Homepage visual assets

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

## Everything else: original SVG/CSS artwork, no stock photography

Every other visual on the homepage remains hand-built SVG/CSS/HTML,
authored directly in the component files below — no binary assets:

| Visual | Component | Purpose |
|---|---|---|
| Dimensional hero core + orbiting surfaces | `src/components/motion/hero-visual.tsx` | Pointer-responsive 3D composition (real `perspective`/`translateZ`, animated SVG data-paths via native `<animateMotion>`) representing connected digital capability |
| Per-pillar service artwork | `src/components/motion/service-tabs.tsx` | Distinct abstract SVG motif per service pillar |
| Capability path artwork | `src/components/motion/capability-path-card.tsx` | Abstract dashboard/commerce device-frame illustrations for the two "What we build" cards adjacent to the BushLite feature |
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
