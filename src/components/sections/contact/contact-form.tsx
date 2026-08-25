"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Turnstile } from "@/components/ui/turnstile";
import {
  budgetOptions,
  preferredContactOptions,
  projectStageOptions,
  projectTypeOptions,
  timelineOptions,
} from "@/content/contact";
import { contactFormDefaults, contactFormSchema, type ContactFormState } from "@/lib/contact-schema";

const inputClasses =
  "min-h-11 w-full rounded-lg border border-neutral-300 bg-paper px-3.5 py-2.5 text-sm text-paper-foreground placeholder:text-slate-muted/70 focus-visible:border-teal-strong disabled:opacity-60";
const labelClasses = "text-sm font-medium text-paper-foreground";
const helperClasses = "mt-1.5 text-xs leading-relaxed text-slate-muted";
const errorClasses = "mt-1.5 text-xs font-medium text-[#b3261e]";

type SubmitState = { status: "idle" | "submitting" | "success" | "error"; message?: string };
type StringFieldKey = Exclude<keyof ContactFormState, "privacyAcknowledged">;

export function ContactForm() {
  const idPrefix = useId();
  const [values, setValues] = useState<ContactFormState>(contactFormDefaults);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });
  const [turnstileToken, setTurnstileToken] = useState("");
  const isSubmittingRef = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  function field<K extends StringFieldKey>(key: K) {
    return {
      id: `${idPrefix}-${key}`,
      name: key,
      value: values[key],
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValues((prev) => ({ ...prev, [key]: e.target.value }) as ContactFormState);
      },
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmittingRef.current) return;

    const candidate = { ...values, turnstileToken };
    const localCheck = contactFormSchema.safeParse(candidate);
    if (!localCheck.success) {
      const errors: Record<string, string> = {};
      for (const issue of localCheck.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !(key in errors)) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      setSubmit({ status: "error", message: "Please check the highlighted fields." });
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    isSubmittingRef.current = true;
    setSubmit({ status: "submitting" });
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidate),
      });
      const result = await response.json();

      if (response.ok && result.ok) {
        setSubmit({ status: "success" });
        requestAnimationFrame(() => statusRef.current?.focus());
      } else if (result.kind === "validation" && result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
        setSubmit({ status: "error", message: "Please check the highlighted fields." });
        requestAnimationFrame(() => errorSummaryRef.current?.focus());
      } else {
        setSubmit({
          status: "error",
          message: result.message || "We couldn't send your enquiry. Please try again or email kipeo@harunlucas.com.",
        });
        requestAnimationFrame(() => statusRef.current?.focus());
      }
    } catch {
      setSubmit({
        status: "error",
        message: "We couldn't send your enquiry. Please try again or email kipeo@harunlucas.com.",
      });
      requestAnimationFrame(() => statusRef.current?.focus());
    } finally {
      isSubmittingRef.current = false;
    }
  }

  if (submit.status === "success") {
    return (
      <div
        ref={statusRef}
        role="status"
        tabIndex={-1}
        className="rounded-2xl border border-teal-strong/25 bg-teal-tint p-6 focus:outline-none sm:p-8"
      >
        <h2 className="text-xl font-semibold text-paper-foreground">Thank you — your enquiry has been received.</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          We&apos;ll review the information and respond using your preferred contact method.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/" variant="primary">
            Return to homepage
          </Button>
          <Button href="/work" variant="outline">
            Explore Kipeo&apos;s work
          </Button>
        </div>
      </div>
    );
  }

  const isSubmitting = submit.status === "submitting";
  const hasErrors = Object.keys(fieldErrors).length > 0;

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-neutral-200 bg-paper-elevated p-6 shadow-card sm:p-8">
      {submit.status === "error" && (
        <div
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
          className="mb-6 rounded-lg border border-[#b3261e]/30 bg-[#fbeceb] p-4 focus:outline-none"
        >
          <p className="text-sm font-medium text-[#b3261e]">{submit.message}</p>
          {hasErrors && (
            <ul className="mt-2 flex flex-col gap-1">
              {Object.entries(fieldErrors).map(([key, message]) => (
                <li key={key}>
                  <a href={`#${idPrefix}-${key}`} className="text-xs font-medium text-[#b3261e] underline underline-offset-2">
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-fullName`} className={labelClasses}>
            Full name <span aria-hidden>*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            {...field("fullName")}
            type="text"
            required
            autoComplete="name"
            maxLength={120}
            className={`mt-1.5 ${inputClasses}`}
            aria-invalid={Boolean(fieldErrors.fullName)}
            aria-describedby={fieldErrors.fullName ? `${idPrefix}-fullName-error` : undefined}
          />
          {fieldErrors.fullName && (
            <p id={`${idPrefix}-fullName-error`} className={errorClasses}>
              {fieldErrors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${idPrefix}-email`} className={labelClasses}>
            Email address <span aria-hidden>*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            {...field("email")}
            type="email"
            required
            autoComplete="email"
            maxLength={254}
            className={`mt-1.5 ${inputClasses}`}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? `${idPrefix}-email-error` : undefined}
          />
          {fieldErrors.email && (
            <p id={`${idPrefix}-email-error`} className={errorClasses}>
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${idPrefix}-company`} className={labelClasses}>
            Company or organisation
          </label>
          <input {...field("company")} type="text" autoComplete="organization" maxLength={160} className={`mt-1.5 ${inputClasses}`} />
        </div>

        <div>
          <label htmlFor={`${idPrefix}-phone`} className={labelClasses}>
            Phone or WhatsApp
          </label>
          <input {...field("phone")} type="tel" autoComplete="tel" maxLength={40} className={`mt-1.5 ${inputClasses}`} />
        </div>

        <div>
          <label htmlFor={`${idPrefix}-countryOrTimezone`} className={labelClasses}>
            Country or timezone
          </label>
          <input
            {...field("countryOrTimezone")}
            type="text"
            autoComplete="country-name"
            maxLength={120}
            className={`mt-1.5 ${inputClasses}`}
          />
        </div>

        <div>
          <label htmlFor={`${idPrefix}-websiteUrl`} className={labelClasses}>
            Website or existing system URL
          </label>
          <input {...field("websiteUrl")} type="text" autoComplete="url" maxLength={200} className={`mt-1.5 ${inputClasses}`} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${idPrefix}-preferredContact`} className={labelClasses}>
            Preferred contact method
          </label>
          <select {...field("preferredContact")} className={`mt-1.5 ${inputClasses}`}>
            <option value="">No preference</option>
            {preferredContactOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-projectType`} className={labelClasses}>
            Project type
          </label>
          <select {...field("projectType")} className={`mt-1.5 ${inputClasses}`}>
            {projectTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-projectStage`} className={labelClasses}>
            Project stage
          </label>
          <select {...field("projectStage")} className={`mt-1.5 ${inputClasses}`}>
            {projectStageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-timeline`} className={labelClasses}>
            Timeline
          </label>
          <select {...field("timeline")} className={`mt-1.5 ${inputClasses}`}>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-budget`} className={labelClasses}>
            Budget guidance
          </label>
          <select {...field("budget")} className={`mt-1.5 ${inputClasses}`}>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p className={helperClasses}>These ranges help us understand likely project scale. They are not fixed Kipeo prices.</p>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${idPrefix}-projectSummary`} className={labelClasses}>
            Project summary <span aria-hidden>*</span>
            <span className="sr-only">(required)</span>
          </label>
          <p id={`${idPrefix}-projectSummary-helper`} className="mt-1 text-xs leading-relaxed text-slate-muted">
            Describe the problem, who will use the result, what currently exists and what you would like to improve.
          </p>
          <textarea
            {...field("projectSummary")}
            required
            rows={5}
            maxLength={4000}
            aria-describedby={`${idPrefix}-projectSummary-helper${fieldErrors.projectSummary ? ` ${idPrefix}-projectSummary-error` : ""}`}
            aria-invalid={Boolean(fieldErrors.projectSummary)}
            className={`mt-2 ${inputClasses} min-h-32 resize-y py-3`}
          />
          {fieldErrors.projectSummary && (
            <p id={`${idPrefix}-projectSummary-error`} className={errorClasses}>
              {fieldErrors.projectSummary}
            </p>
          )}
          <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-slate-muted">
            <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            Please do not include passwords, access keys or sensitive personal information.
          </p>
        </div>
      </div>

      {/* Honeypot — hidden from sighted and assistive-tech users, left open for scripted bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${idPrefix}-companyRole`}>Leave this field blank</label>
        <input
          id={`${idPrefix}-companyRole`}
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={(e) => setValues((prev) => ({ ...prev, honeypot: e.target.value }))}
        />
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id={`${idPrefix}-privacyAcknowledged`}
          type="checkbox"
          checked={values.privacyAcknowledged}
          onChange={(e) => setValues((prev) => ({ ...prev, privacyAcknowledged: e.target.checked }))}
          required
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-neutral-300 text-teal-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-strong"
          aria-describedby={fieldErrors.privacyAcknowledged ? `${idPrefix}-privacy-error` : undefined}
        />
        <label htmlFor={`${idPrefix}-privacyAcknowledged`} className="text-sm leading-relaxed text-slate">
          I understand that Kipeo Digital will use these details to review and respond to my enquiry.{" "}
          <Link href="/privacy-policy" className="font-medium text-teal-strong underline underline-offset-2 hover:text-ink">
            Privacy Policy
          </Link>
        </label>
      </div>
      {fieldErrors.privacyAcknowledged && (
        <p id={`${idPrefix}-privacy-error`} className={errorClasses}>
          {fieldErrors.privacyAcknowledged}
        </p>
      )}

      <Turnstile onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} />

      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="mt-6 w-full sm:w-auto">
        {isSubmitting ? "Sending enquiry…" : "Send project enquiry"}
        {!isSubmitting && <ArrowUpRight className="h-4 w-4" aria-hidden />}
      </Button>
    </form>
  );
}
