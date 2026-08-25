# /contact form — setup and configuration

Internal record only. Covers what's implemented, what still needs manual
provider/Vercel configuration, and the environment variables involved. See
`.env.example` for the copy-pasteable list.

## Email delivery (required for the form to actually send)

No transactional email provider was configured anywhere in this project
before this change, so — per the brief's example — this uses **Brevo**'s
transactional email HTTP API directly (`src/lib/email/brevo-client.ts`), via
plain `fetch`, no SDK dependency added.

Required environment variables:

| Variable | Purpose |
|---|---|
| `BREVO_API_KEY` | Brevo transactional API key. Server-only — read in `src/lib/email/brevo-client.ts`, never sent to the client. |
| `CONTACT_FROM_EMAIL` | The verified sender address both emails are sent from. **Must be a sender Brevo has verified for your account** (Brevo rejects sends from unverified senders) — set this up in Brevo → Senders before going live. |
| `CONTACT_FROM_NAME` | Optional. Display name shown for the sender (e.g. "Kipeo Digital"). Falls back to the site name if unset — never required for delivery to work. |
| `CONTACT_TO_EMAIL` | Where the internal notification email is delivered — set to `kipeo@harunlucas.com`. |

**Until these three are set, the form is fully wired but cannot send email.**
Submitting returns the exact error the brief specifies ("We couldn't send
your enquiry. Please try again or email kipeo@harunlucas.com.") — it never
reports a false success. `/contact` itself, the WhatsApp link and the
`tel:`/`mailto:` pathways all work independently of this configuration.

Two emails are sent per submission:

1. **Internal notification** → `CONTACT_TO_EMAIL`, `replyTo` set to the
   enquirer's own address (reply goes straight to them). If this send fails,
   the whole submission is reported as failed — this is the email that
   actually delivers the lead.
2. **Confirmation** → the enquirer's address. Best-effort: if this one
   fails, the submission still reports success (the lead reached Kipeo) and
   the failure is logged server-side only.

## Cloudflare Turnstile (optional)

Not previously used in this project. Added as an optional layer:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public site key. Read client-side by `src/components/ui/turnstile.tsx`, which only renders the widget when this is set. |
| `TURNSTILE_SECRET_KEY` | Server-only secret, verified against Cloudflare's `siteverify` endpoint in `src/lib/turnstile.ts`. Never exposed to the client. |

Leave both unset and Turnstile is inactive site-wide — the widget doesn't
render, and the server skips verification because it was never turned on
(this is different from a *configured-but-failing* check, which the server
never silently ignores). The form still has a honeypot field, in-memory rate
limiting, origin validation and full Zod validation regardless.

To enable it: create a Turnstile site at the Cloudflare dashboard, set both
variables (locally in `.env.local`, in production in Vercel), redeploy.

## Rate limiting — a known limitation

`src/lib/rate-limit.ts` is an in-memory, per-IP fixed window (5 requests /
10 minutes). No Redis/KV store is configured in this project, so this is a
best-effort layer, not a hard guarantee: each serverless instance keeps its
own counter, and a cold start resets it. It's one layer among several
(honeypot, origin check, Zod validation, optional Turnstile), not the only
one. For stronger guarantees under real traffic, consider Vercel KV or
Upstash Redis — that would need its own environment variables and is not
currently configured.

## Vercel configuration checklist

- [ ] Add `BREVO_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` in
      Project Settings → Environment Variables (Production **and** Preview
      if you want previews to send real email — consider a separate
      `CONTACT_TO_EMAIL` for previews to avoid test noise in the real inbox).
- [ ] Verify `CONTACT_FROM_EMAIL` as a sender in Brevo.
- [ ] Optional: add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and
      `TURNSTILE_SECRET_KEY` to enable Turnstile.
- [ ] Redeploy after adding/changing any of the above — environment
      variables are read at request time in serverless functions, but a
      redeploy ensures build-time output (if any) picks up
      `NEXT_PUBLIC_TURNSTILE_SITE_KEY` too.
