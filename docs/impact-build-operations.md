# Kipeo Impact Build — operations

Internal record only. Covers how to run a cycle of the Impact Build initiative: the config file that drives everything, how the banner/homepage/apply page respond to it, and how to review and record a selection. See `docs/contact-form-setup.md` for the underlying email/Turnstile/rate-limit contract this reuses — nothing new is introduced there.

## The single control: `src/content/impact-build.ts`

Everything public — the announcement bar, the homepage teaser, `/impact-build`'s status section, whether `/impact-build/apply` renders a form or a closed message, and whether the three routes appear in the sitemap — reads from one exported object, `impactBuildConfig`. There is no admin UI; editing this file and redeploying is the entire workflow.

### Changing status

`impactBuildConfig.status` is one of `"draft" | "open" | "reviewing" | "closed" | "selected"`.

| Status | Announcement bar | Homepage teaser | `/impact-build` | `/impact-build/apply` | Sitemap |
|---|---|---|---|---|---|
| `draft` | Default consultation message (unchanged) | Shows, "Learn about the initiative" only | Shows, status section says details are pending | Shows a "not yet open" message, no form | Excluded entirely |
| `open` | Switches to the Impact Build message + CTA | Both CTAs shown | Status section says applications are open | Renders the application stepper | `/impact-build` + `/impact-build/terms` + `/impact-build/apply` |
| `reviewing` | Reverts to default consultation message | "Learn about the initiative" only | Status section says applications are under review | Shows a "being reviewed" message, no form | `/impact-build` + `/impact-build/terms` (not `/apply`) |
| `closed` | Reverts to default consultation message | "Learn about the initiative" only | Status section says applications are closed | Shows a "closed" message, no form | `/impact-build` + `/impact-build/terms` (not `/apply`) |
| `selected` | Reverts to default consultation message | "Learn about the initiative" only | Status section confirms a project was selected | Shows a "selected" message, no form | `/impact-build` + `/impact-build/terms` (not `/apply`) |

The `/api/impact-build` route also independently checks `impactBuildConfig.status === "open"` server-side and rejects any submission otherwise — the apply page's form isn't the only gate, so status changes take effect immediately even against a direct POST.

### Testing "open" without changing Production

`status` is committed as `"draft"` — that's what ships to Production. To exercise the real application flow (form, Turnstile, emails) without touching that default or opening the programme publicly:

- **Locally**: set `NEXT_PUBLIC_IMPACT_BUILD_STATUS_OVERRIDE=open` in `.env.local`.
- **On a Vercel Preview deployment**: set `NEXT_PUBLIC_IMPACT_BUILD_STATUS_OVERRIDE=open` as an environment variable scoped to the **Preview** environment only (Vercel Project Settings → Environment Variables → uncheck Production).

`src/content/impact-build.ts` reads this override at module load and falls back to the committed `"draft"` default whenever it's unset — which is always true for Production, since the variable is never set there. Remove/leave unset once testing is done; there's nothing to revert in source. This same mechanism means the sitemap, banner and homepage teaser also reflect the override automatically wherever you've set it, and revert automatically wherever you haven't.

Being `NEXT_PUBLIC_`, Next.js inlines this value at build time (not read live per-request) — after adding or changing it in Vercel's Preview environment variables, trigger a new Preview deployment (push a commit, or redeploy) for it to take effect. Locally, restart `next dev` after editing `.env.local`.

### Setting dates

`openingDate`, `closingDate`, `reviewPeriod` and `expectedProjectStart` all default to `null` and are only rendered where set — never invent a date to fill the field. Edit them directly in `src/content/impact-build.ts` at the `EDIT HERE` comment once a cycle's dates are confirmed. `reviewPeriod` (a short string, e.g. `"2–3 weeks"`) is also used to add one sentence to the applicant confirmation email if set.

### Recording a selection

When a recipient is selected:

1. Set `status` to `"selected"`.
2. Only set `selectedApplicantName` and `selectedApplicantPublished: true` **after** obtaining the recipient's separate written consent to be publicly named — this is a hard requirement of the Impact Build Terms, not just a UI nicety. `selectedApplicantConsent` must also be `true` before the name renders anywhere; both flags are checked together on `/impact-build`.
3. If consent is never given, leave `selectedApplicantPublished`/`selectedApplicantName` unset — the status section still confirms a project was selected, without naming anyone.

### Preparing the next annual cycle

1. Set `status` back to `"draft"` at the end of a cycle (this pulls all three routes out of the sitemap and reverts the banner/homepage automatically).
2. Reset `selectedApplicantPublished`, `selectedApplicantName`, `selectedApplicantConsent` to their defaults.
3. Update `cycleLabel` (e.g. `"2027 Cycle"`).
4. Clear or update `openingDate`/`closingDate`/`reviewPeriod`/`expectedProjectStart` for the new cycle.
5. When ready to launch, flip `status` to `"open"`.

## Environment variables

No new variables. `/api/impact-build` reuses exactly what `/api/contact` already uses: `BREVO_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_FROM_NAME`, `CONTACT_TO_EMAIL`, and (optionally) `NEXT_PUBLIC_TURNSTILE_SITE_KEY`/`TURNSTILE_SECRET_KEY`. See `.env.example` and `docs/contact-form-setup.md` for what each does and how to provision them — nothing here is Impact-Build-specific.

Application notifications land in the same inbox as ordinary contact enquiries (`CONTACT_TO_EMAIL`). Distinguish them by subject line (`New Impact Build application — KIB-XXXXXX`) or the reference itself.

## Reviewing applications

There is deliberately no admin dashboard or database — applications arrive as email, exactly like contact enquiries. To review a cycle's applications:

1. Filter the `CONTACT_TO_EMAIL` inbox for `New Impact Build application` subjects.
2. Copy `docs/impact-build-review-template.md` per application and complete it. That file is internal-only — never link it from the app or send it to an applicant.
3. To contact a shortlisted applicant, reply to the internal notification email directly — `replyTo` is already set to the applicant's own address.
4. Record the outcome by updating `impactBuildConfig` as described above.

## If storage changes

The current design intentionally keeps applications out of any database — they exist only as email, same as `/contact`. If a database or admin tool is introduced later, update the "Retention" and "Information you provide" sections of `/privacy-policy` (`src/app/privacy-policy/page.tsx`) to accurately describe the new storage and retention approach before shipping it — do not let the policy's "Kipeo does not maintain a database of visitor information" claim go stale.
