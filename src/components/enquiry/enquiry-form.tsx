"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Turnstile } from "@/components/ui/turnstile";
import { enquiryCopy, enquiryServiceOptions, isEnquiryServiceId, type EnquiryServiceId } from "@/content/enquiry";
import { siteConfig } from "@/content/site-config";
import { contactFormSchema, enquiryFieldOrder, type EnquiryDraft } from "@/lib/contact-schema";
import { cn } from "@/lib/cn";
import { useEnquiry } from "./enquiry-provider";

type FieldKey = (typeof enquiryFieldOrder)[number];
type FieldErrors = Partial<Record<FieldKey, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "failed" }
  | { kind: "success"; confirmationSent: boolean };

const inputClasses =
  "mt-1.5 block min-h-11 w-full rounded-lg border bg-white/70 px-3.5 py-2.5 text-base text-paper-foreground transition-colors placeholder:text-slate-muted/70 focus-visible:border-teal-strong sm:text-sm";
const labelClasses = "flex items-baseline gap-1.5 text-sm font-medium text-paper-foreground";
const errorClasses = "mt-1.5 text-sm font-medium text-[#b3261e]";

function RequiredMark() {
  return (
    <>
      <span aria-hidden className="text-teal-strong">
        *
      </span>
      <span className="sr-only">(required)</span>
    </>
  );
}

function collectErrors(issues: readonly { path: readonly PropertyKey[]; message: string }[]): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string" && (enquiryFieldOrder as readonly string[]).includes(key)) {
      const field = key as FieldKey;
      if (!errors[field]) errors[field] = issue.message;
    }
  }
  return errors;
}

type EnquiryFormProps = {
  /** "panel" is the site-wide dialog; "page" is the inline form on /contact. */
  context: "panel" | "page";
  /** Panel only — the success view's close action. */
  onClose?: () => void;
};

/**
 * The one project enquiry form, shared by the right-side panel and /contact.
 * Values live in the site-wide draft (`useEnquiry`), so they survive closing
 * the panel, navigating, and a failed send; only a successful send clears
 * them. Submits to the existing `/api/contact` route.
 */
export function EnquiryForm({ context, onClose }: EnquiryFormProps) {
  const idPrefix = useId();
  const { draft, updateField, clearDraft, applyCtaService } = useEnquiry();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const submittingRef = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const failureRef = useRef<HTMLDivElement>(null);

  const id = (key: string) => `${idPrefix}-${key}`;

  // /contact?service=… — carries a service-specific CTA's choice into the
  // full-page form (new tab, no-JS-then-hydrate, or a shared link). Applied
  // only while the draft is untouched, like any other CTA.
  useEffect(() => {
    if (context !== "page") return;
    const service = new URLSearchParams(window.location.search).get("service");
    if (isEnquiryServiceId(service)) applyCtaService(service);
  }, [context, applyCtaService]);

  function setField<K extends keyof EnquiryDraft>(key: K, value: EnquiryDraft[K]) {
    updateField(key, value);
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function focusFirstInvalid(fieldErrors: FieldErrors) {
    const first = enquiryFieldOrder.find((key) => fieldErrors[key]);
    if (first) requestAnimationFrame(() => document.getElementById(id(first))?.focus());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const candidate = { ...draft, honeypot, turnstileToken };
    const local = contactFormSchema.safeParse(candidate);
    if (!local.success) {
      const fieldErrors = collectErrors(local.error.issues);
      setErrors(fieldErrors);
      setStatus({ kind: "idle" });
      focusFirstInvalid(fieldErrors);
      return;
    }

    submittingRef.current = true;
    setErrors({});
    setStatus({ kind: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidate),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        kind?: string;
        fieldErrors?: Record<string, string>;
        confirmationSent?: boolean;
      } | null;

      if (response.ok && result?.ok) {
        clearDraft();
        setTurnstileToken("");
        setStatus({ kind: "success", confirmationSent: Boolean(result.confirmationSent) });
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }

      if (result?.kind === "validation" && result.fieldErrors) {
        const fieldErrors = collectErrors(
          Object.entries(result.fieldErrors).map(([key, message]) => ({ path: [key], message })),
        );
        if (Object.keys(fieldErrors).length > 0) {
          setErrors(fieldErrors);
          setStatus({ kind: "idle" });
          focusFirstInvalid(fieldErrors);
          return;
        }
      }

      setStatus({ kind: "failed" });
      requestAnimationFrame(() => failureRef.current?.focus());
    } catch {
      setStatus({ kind: "failed" });
      requestAnimationFrame(() => failureRef.current?.focus());
    } finally {
      submittingRef.current = false;
    }
  }

  if (status.kind === "success") {
    return (
      <div ref={successRef} role="status" tabIndex={-1} className="focus:outline-none">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-tint text-teal-strong">
          <Check className="h-5 w-5" aria-hidden />
        </span>
        <p className="mt-5 font-display text-2xl leading-tight tracking-[-0.01em] text-paper-foreground">
          {enquiryCopy.success}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate sm:text-base">
          {status.confirmationSent ? "We’ve sent a copy to your email address. " : null}
          We’ll review it and reply to the email address you gave us.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {context === "panel" ? (
            <Button type="button" variant="primary" onClick={onClose}>
              Close
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={() => setStatus({ kind: "idle" })}>
              Send another enquiry
            </Button>
          )}
          <Button href="/work" variant={context === "panel" ? "outline" : "primary"}>
            Explore our work
          </Button>
        </div>
      </div>
    );
  }

  const isSubmitting = status.kind === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
      <p className="text-xs text-slate-muted">
        <span aria-hidden className="text-teal-strong">
          *
        </span>{" "}
        Required
      </p>

      <div className={cn("mt-4 grid gap-5", context === "page" && "sm:grid-cols-2")}>
        <div>
          <label htmlFor={id("fullName")} className={labelClasses}>
            Name <RequiredMark />
          </label>
          <input
            id={id("fullName")}
            name="fullName"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            value={draft.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? id("fullName-error") : undefined}
            className={cn(inputClasses, errors.fullName ? "border-[#b3261e]" : "border-neutral-300")}
          />
          {errors.fullName && (
            <p id={id("fullName-error")} className={errorClasses}>
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={id("email")} className={labelClasses}>
            Email <RequiredMark />
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            spellCheck={false}
            required
            maxLength={254}
            value={draft.email}
            onChange={(e) => setField("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? id("email-error") : undefined}
            className={cn(inputClasses, errors.email ? "border-[#b3261e]" : "border-neutral-300")}
          />
          {errors.email && (
            <p id={id("email-error")} className={errorClasses}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={id("service")} className={labelClasses}>
          Service of interest <span className="text-xs font-normal text-slate-muted">Optional</span>
        </label>
        <select
          id={id("service")}
          name="service"
          value={draft.service}
          onChange={(e) => setField("service", (e.target.value as EnquiryServiceId | "") ?? "")}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? id("service-error") : undefined}
          className={cn(inputClasses, "cursor-pointer", errors.service ? "border-[#b3261e]" : "border-neutral-300")}
        >
          <option value="">Choose a service</option>
          {enquiryServiceOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.service && (
          <p id={id("service-error")} className={errorClasses}>
            {errors.service}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor={id("projectSummary")} className={labelClasses}>
          Project details <RequiredMark />
        </label>
        <p id={id("projectSummary-hint")} className="mt-1 text-xs leading-relaxed text-slate-muted">
          An early idea is fine — no technical requirements, budget or timeline needed. Please leave out passwords
          and sensitive personal information.
        </p>
        <textarea
          id={id("projectSummary")}
          name="projectSummary"
          required
          rows={context === "page" ? 6 : 5}
          maxLength={4000}
          value={draft.projectSummary}
          onChange={(e) => setField("projectSummary", e.target.value)}
          aria-invalid={Boolean(errors.projectSummary)}
          aria-describedby={`${id("projectSummary-hint")}${errors.projectSummary ? ` ${id("projectSummary-error")}` : ""}`}
          className={cn(
            inputClasses,
            "min-h-32 resize-y py-3 leading-relaxed",
            errors.projectSummary ? "border-[#b3261e]" : "border-neutral-300",
          )}
        />
        {errors.projectSummary && (
          <p id={id("projectSummary-error")} className={errorClasses}>
            {errors.projectSummary}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from sighted and assistive-tech users, left open for scripted bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={id("companyRole")}>Leave this field blank</label>
        <input
          id={id("companyRole")}
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="mt-5 empty:hidden">
        <Turnstile onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} />
      </div>

      {status.kind === "failed" && (
        <div
          ref={failureRef}
          role="alert"
          tabIndex={-1}
          className="mt-6 rounded-lg border border-[#b3261e]/30 bg-[#fbeceb] p-4 focus:outline-none"
        >
          <p className="text-sm font-medium text-[#8c1d17]">We couldn’t send your enquiry.</p>
          <p className="mt-1 text-sm leading-relaxed text-[#8c1d17]">
            Your message is still here. Try again, or email it to{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-medium underline underline-offset-2">
              {siteConfig.email}
            </a>
            .
          </p>
          <button
            type="submit"
            className="mt-3 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-[#b3261e]/40 px-4 text-sm font-medium text-[#8c1d17] transition-colors hover:bg-white/60"
          >
            <RotateCw className="h-4 w-4" aria-hidden />
            Try again
          </button>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          aria-disabled={isSubmitting}
          className={cn("w-full sm:w-auto sm:self-start", isSubmitting && "pointer-events-none opacity-70")}
        >
          {isSubmitting ? enquiryCopy.submitting : enquiryCopy.submit}
          {!isSubmitting && <ArrowUpRight className="h-4 w-4" aria-hidden />}
        </Button>
        <p className="text-xs leading-relaxed text-slate-muted">
          We’ll use these details only to respond to your enquiry. See our{" "}
          <Link href="/privacy-policy" className="font-medium text-teal-strong underline underline-offset-2 hover:text-ink">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
