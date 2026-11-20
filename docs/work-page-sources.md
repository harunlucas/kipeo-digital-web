# Work page: sources for every claim

Where each project, credit and feature on `/work` and its case studies comes
from. Copy lives in `src/content/case-studies.ts`. Checked on 2026-11-20.

## BushLite WiFi (feature)

- **Features**: voucher authentication, internet packages, active-session
  monitoring and shared bandwidth across multiple access points. From
  https://harunlucas.com/projects/bushlite-wifi (Objectives, Approach,
  Development).
- **Credit**: "Built by the Kipeo Digital team", per the site owner's instruction (2026-11-20) that projects are credited to the Kipeo team, not to individuals. The published write-up lives on HarunLucas.com.
- **Status**: the case study says "completed, working Version 1.0 system, in
  active use". The Work page shows only "Version 1.0". It does not repeat "in
  active use" because of the conflict below.
- **Integrations, and a conflict**: the case study describes a "MikroTik
  integration layer". The portal screenshot it publishes says "This is a
  simulation. No real internet access is provided. MikroTik integration
  coming soon." The case-study page states both. The index makes no MikroTik
  claim, and the "MikroTik integration" tag was removed. No payment provider
  is documented anywhere, so none is named.
- **Image**: `bushlite-wifi-portal-voucher.webp` is a crop (x872 y292,
  552×590) of `bushlite-wifi-login-portal.webp`, which came from the
  HarunLucas.com case study. It shows the guest view, not an operator
  dashboard. `bushlite-wifi-dashboard.webp` was not used: it is a
  promotional composite (laptop mockup, marketing headline, sample figures
  such as "$512.00 revenue"), not a clean operator screen.

## SafetyOS / HSE Management System

- **Credit**: "Built by the Kipeo Digital team", per the site owner's instruction (2026-11-20). The project's repository history is under an individual team member's account, and its public write-up is on CynthiaMueni.com.
- **Workflow**: the six stages are copied verbatim from
  `client/src/components/corrective-actions/CorrectiveActionWorkflowStepper.tsx`.
  The owners and the closure rules come from `docs/PRODUCT_REQUIREMENTS.md`.
- **Roles**: Admin, EHS Officer, Supervisor and Worker appear as demo accounts
  on the app's public sign-in screen.
- **Stack**: React and TypeScript (client), Express with Prisma and PostgreSQL
  (server), from the project's package.json files.
- **Screens**: the sign-in and registration screens are the only ones
  captured. The sign-in screen is not reused on /work because it shows the
  shared demo password.

## CNC learning system

- **Credit**: "Research and engineering by the Kipeo Digital team", per the site owner's instruction (2026-11-20).
- **Example**: produced by running `python -m cnc_engine.sample_gcode` from
  the project's backend, on its documented demo task. The drilling
  operation's inputs, formulas, results and G-code lines are copied from
  that output. The engine labels its cutting data "illustrative test data"
  and its G-code "educational"; the page repeats this.
- **Status**: "Research prototype". The README describes a Phase 8A audit,
  and HarunLucas.com says "In Development".

## Not on the index

- **CynthiaMueni.com** and **HarunLucas.com** keep their `/work/[slug]` pages
  and sitemap entries. Neither the CynthiaMueni.com source (local copy in
  `Desktop/Cynthiamueni dev`, no git history) nor the live site says who
  designed or built it, so its contributor credit can't be stated.
- **Homepage automation images** (`/images/automation/*`) are labelled
  illustrative previews. They are not used on /work.

## Work index image pairs

Each indexed project shows two generated interface concepts on /work, captioned "Interface concepts". The genuine evidence (the BushLite portal screenshot, the SafetyOS workflow and the CNC engine output) stays on each case-study page. See `docs/asset-sources.md`.
