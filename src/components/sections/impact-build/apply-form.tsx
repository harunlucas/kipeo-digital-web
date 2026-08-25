"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ArrowUpRight, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Turnstile } from "@/components/ui/turnstile";
import { preferredContactOptions, timelineOptions } from "@/content/contact";
import { organisationTypeOptions, readinessOptions, requestedProjectTypeOptions } from "@/content/impact-build";
import {
  impactBuildApplicationDefaults,
  impactBuildApplicationSchema,
  impactBuildStepFieldGroups,
  type ImpactBuildApplicationState,
  type ImpactBuildStepId,
} from "@/lib/impact-build-schema";
import { siteConfig } from "@/content/site-config";

const inputClasses =
  "min-h-11 w-full rounded-lg border border-neutral-300 bg-paper px-3.5 py-2.5 text-sm text-paper-foreground placeholder:text-slate-muted/70 focus-visible:border-teal-strong disabled:opacity-60";
const labelClasses = "text-sm font-medium text-paper-foreground";
const errorClasses = "mt-1.5 text-xs font-medium text-[#b3261e]";
const GENERIC_ERROR_MESSAGE = `We couldn't send your application. Please try again or email ${siteConfig.email}.`;

type SubmitState = { status: "idle" | "submitting" | "success" | "error"; message?: string };
type FieldKey = keyof ImpactBuildApplicationState;

type Step = { id: ImpactBuildStepId; title: string; legend: string };

const steps: Step[] = [
  { id: "applicant", title: "Applicant", legend: "About you" },
  { id: "organisation", title: "Organisation", legend: "Organisation or initiative" },
  { id: "project", title: "Project", legend: "Problem and proposed solution" },
  { id: "readiness", title: "Readiness", legend: "Readiness and responsibilities" },
  { id: "consent", title: "Consent", legend: "Costs, declarations and consent" },
  { id: "review", title: "Review", legend: "Review and submit" },
];

const fieldLabels: Record<string, string> = {
  fullName: "Full name",
  email: "Email address",
  phone: "Phone or WhatsApp",
  country: "Country",
  preferredContact: "Preferred contact method",
  organisationName: "Organisation or initiative name",
  organisationType: "Organisation type",
  existingWebsite: "Existing website",
  organisationDescription: "Short description",
  primaryAreaOfWork: "Primary area of work",
  requestedProjectType: "Requested project type",
  problemToSolve: "Problem to be solved",
  intendedUsers: "Who will use or benefit",
  whyItMatters: "Why the project matters",
  whatCurrentlyExists: "What currently exists",
  desiredResult: "Desired result",
  essentialFeatures: "Essential features",
  contentAvailable: "Content currently available",
  preferredTimeline: "Preferred timeline",
  decisionMakerRole: "Decision-maker name or role",
  canParticipateInDiscovery: "Can participate in discovery and reviews",
  canProvideContent: "Can provide content",
  canCoverThirdPartyCosts: "Can cover approved third-party costs",
  canMaintainAfterHandover: "Can maintain the project after handover",
  anythingElse: "Anything else",
};

function Field({ label, htmlFor, required, error, helper, children }: { label: string; htmlFor: string; required?: boolean; error?: string; helper?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClasses}>
        {label}
        {required && (
          <>
            {" "}
            <span aria-hidden>*</span>
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>
      {helper && <p className="mt-1 text-xs leading-relaxed text-slate-muted">{helper}</p>}
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${htmlFor}-error`} className={errorClasses}>
          {error}
        </p>
      )}
    </div>
  );
}

export function ImpactBuildApplyForm() {
  const idPrefix = useId();
  const [values, setValues] = useState<ImpactBuildApplicationState>(impactBuildApplicationDefaults);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const isSubmittingRef = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Move focus to the new step's heading on every step change, including
    // the initial mount, so screen-reader users land on the new section.
    stepHeadingRef.current?.focus();
  }, [currentStep]);

  function field<K extends Exclude<FieldKey, "privacyAcknowledged" | "termsAccepted" | "accuracyDeclared">>(key: K) {
    return {
      id: `${idPrefix}-${key}`,
      name: key,
      value: values[key],
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValues((prev) => ({ ...prev, [key]: e.target.value }) as ImpactBuildApplicationState);
      },
    };
  }

  function clearGroupErrors(groupFields: readonly string[]) {
    setFieldErrors((prev) => {
      const next = { ...prev };
      for (const key of groupFields) delete next[key];
      return next;
    });
  }

  /** Validates only the current step's fields against the full schema, filtering issues down to that step so later, untouched steps don't block progress. */
  function validateStep(stepId: Exclude<ImpactBuildStepId, "review">): boolean {
    const groupFields = impactBuildStepFieldGroups[stepId] as readonly string[];
    const result = impactBuildApplicationSchema.safeParse({ ...values, turnstileToken });

    if (result.success) {
      clearGroupErrors(groupFields);
      return true;
    }

    const groupErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && groupFields.includes(key) && !(key in groupErrors)) {
        groupErrors[key] = issue.message;
      }
    }

    setFieldErrors((prev) => {
      const next = { ...prev };
      for (const key of groupFields) delete next[key];
      return { ...next, ...groupErrors };
    });

    return Object.keys(groupErrors).length === 0;
  }

  function goNext() {
    const stepId = steps[currentStep]!.id;
    if (stepId === "review") return;
    if (!validateStep(stepId)) {
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }
    setCurrentStep((i) => Math.min(i + 1, steps.length - 1));
  }

  function goBack() {
    setCurrentStep((i) => Math.max(i - 1, 0));
  }

  async function handleSubmit() {
    if (isSubmittingRef.current) return;

    const candidate = { ...values, turnstileToken };
    const localCheck = impactBuildApplicationSchema.safeParse(candidate);
    if (!localCheck.success) {
      const errors: Record<string, string> = {};
      for (const issue of localCheck.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !(key in errors)) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      setSubmit({ status: "error", message: "Please check the highlighted fields." });

      const firstInvalidStepIndex = steps.findIndex(
        (step) => step.id !== "review" && (impactBuildStepFieldGroups[step.id] as readonly string[]).some((key) => key in errors),
      );
      if (firstInvalidStepIndex >= 0) setCurrentStep(firstInvalidStepIndex);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    isSubmittingRef.current = true;
    setSubmit({ status: "submitting" });
    setFieldErrors({});

    try {
      const response = await fetch("/api/impact-build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidate),
      });
      const result = await response.json();

      if (response.ok && result.ok) {
        setSubmit({ status: "success", message: result.reference });
        requestAnimationFrame(() => statusRef.current?.focus());
      } else if (result.kind === "validation" && result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
        setSubmit({ status: "error", message: "Please check the highlighted fields." });
        const firstInvalidStepIndex = steps.findIndex(
          (step) =>
            step.id !== "review" &&
            (impactBuildStepFieldGroups[step.id] as readonly string[]).some((key) => key in result.fieldErrors),
        );
        if (firstInvalidStepIndex >= 0) setCurrentStep(firstInvalidStepIndex);
        requestAnimationFrame(() => errorSummaryRef.current?.focus());
      } else {
        setSubmit({ status: "error", message: result.message || GENERIC_ERROR_MESSAGE });
        requestAnimationFrame(() => statusRef.current?.focus());
      }
    } catch {
      setSubmit({ status: "error", message: GENERIC_ERROR_MESSAGE });
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
        <h2 className="text-xl font-semibold text-paper-foreground">Your Impact Build application has been received.</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          Thank you for explaining the problem and the work behind it. Kipeo will assess the application against the
          published criteria.
        </p>
        <p className="mt-4 text-sm font-medium text-paper-foreground">
          Application reference: <span className="font-mono">{submit.message}</span>
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-muted">
          A confirmation email has been sent to the address you provided.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/impact-build" variant="primary">
            Return to Impact Build
          </Button>
          <Button href="/services" variant="outline">
            Explore Kipeo&apos;s services
          </Button>
        </div>
      </div>
    );
  }

  const isSubmitting = submit.status === "submitting";
  const hasErrors = Object.keys(fieldErrors).length > 0;
  const step = steps[currentStep]!;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-paper-elevated p-6 shadow-card sm:p-8">
      {/* Progress indicator */}
      <div role="list" aria-label="Application progress" className="flex flex-wrap items-center gap-2">
        {steps.map((s, index) => (
          <div
            key={s.id}
            role="listitem"
            aria-current={index === currentStep ? "step" : undefined}
            className={`flex min-h-8 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              index === currentStep
                ? "bg-teal-strong text-white"
                : index < currentStep
                  ? "bg-teal-tint text-teal-strong"
                  : "bg-mist text-slate-muted"
            }`}
          >
            <span aria-hidden>{index + 1}</span>
            <span>{s.title}</span>
          </div>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Step {currentStep + 1} of {steps.length}: {step.legend}
      </p>

      {submit.status === "error" && (
        <div
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
          className="mt-6 rounded-lg border border-[#b3261e]/30 bg-[#fbeceb] p-4 focus:outline-none"
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

      <fieldset className="mt-6 min-w-0 border-0 p-0">
        <legend className="sr-only">{step.legend}</legend>
        <h2 ref={stepHeadingRef} tabIndex={-1} className="text-lg font-semibold text-paper-foreground focus:outline-none">
          {step.legend}
        </h2>

        {step.id === "applicant" && (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Full name" htmlFor={`${idPrefix}-fullName`} required error={fieldErrors.fullName}>
              <input {...field("fullName")} type="text" autoComplete="name" maxLength={120} className={inputClasses} aria-invalid={Boolean(fieldErrors.fullName)} aria-describedby={fieldErrors.fullName ? `${idPrefix}-fullName-error` : undefined} />
            </Field>
            <Field label="Email address" htmlFor={`${idPrefix}-email`} required error={fieldErrors.email}>
              <input {...field("email")} type="email" autoComplete="email" maxLength={254} className={inputClasses} aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? `${idPrefix}-email-error` : undefined} />
            </Field>
            <Field label="Phone or WhatsApp" htmlFor={`${idPrefix}-phone`} required error={fieldErrors.phone}>
              <input {...field("phone")} type="tel" autoComplete="tel" maxLength={40} className={inputClasses} aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? `${idPrefix}-phone-error` : undefined} />
            </Field>
            <Field label="Country" htmlFor={`${idPrefix}-country`} required error={fieldErrors.country}>
              <input {...field("country")} type="text" autoComplete="country-name" maxLength={120} className={inputClasses} aria-invalid={Boolean(fieldErrors.country)} aria-describedby={fieldErrors.country ? `${idPrefix}-country-error` : undefined} />
            </Field>
            <Field label="Preferred contact method" htmlFor={`${idPrefix}-preferredContact`} required error={fieldErrors.preferredContact}>
              <select {...field("preferredContact")} className={inputClasses}>
                {preferredContactOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {step.id === "organisation" && (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Organisation or initiative name" htmlFor={`${idPrefix}-organisationName`} required error={fieldErrors.organisationName}>
              <input {...field("organisationName")} type="text" maxLength={160} className={inputClasses} aria-invalid={Boolean(fieldErrors.organisationName)} aria-describedby={fieldErrors.organisationName ? `${idPrefix}-organisationName-error` : undefined} />
            </Field>
            <Field label="Organisation type" htmlFor={`${idPrefix}-organisationType`} required error={fieldErrors.organisationType}>
              <select {...field("organisationType")} className={inputClasses}>
                {organisationTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Existing website" htmlFor={`${idPrefix}-existingWebsite`} error={fieldErrors.existingWebsite} helper="If available.">
              <input {...field("existingWebsite")} type="url" inputMode="url" placeholder="example.org" maxLength={200} className={inputClasses} aria-invalid={Boolean(fieldErrors.existingWebsite)} aria-describedby={fieldErrors.existingWebsite ? `${idPrefix}-existingWebsite-error` : undefined} />
            </Field>
            <Field label="Primary area of work" htmlFor={`${idPrefix}-primaryAreaOfWork`} required error={fieldErrors.primaryAreaOfWork}>
              <input {...field("primaryAreaOfWork")} type="text" maxLength={200} className={inputClasses} aria-invalid={Boolean(fieldErrors.primaryAreaOfWork)} aria-describedby={fieldErrors.primaryAreaOfWork ? `${idPrefix}-primaryAreaOfWork-error` : undefined} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Short description of the organisation or initiative" htmlFor={`${idPrefix}-organisationDescription`} required error={fieldErrors.organisationDescription}>
                <textarea {...field("organisationDescription")} rows={4} maxLength={2000} className={`${inputClasses} min-h-28 resize-y py-3`} aria-invalid={Boolean(fieldErrors.organisationDescription)} aria-describedby={fieldErrors.organisationDescription ? `${idPrefix}-organisationDescription-error` : undefined} />
              </Field>
            </div>
          </div>
        )}

        {step.id === "project" && (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Requested project type" htmlFor={`${idPrefix}-requestedProjectType`} required error={fieldErrors.requestedProjectType}>
              <select {...field("requestedProjectType")} className={inputClasses}>
                {requestedProjectTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Preferred timeline" htmlFor={`${idPrefix}-preferredTimeline`} required error={fieldErrors.preferredTimeline}>
              <select {...field("preferredTimeline")} className={inputClasses}>
                {timelineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Problem to be solved" htmlFor={`${idPrefix}-problemToSolve`} required error={fieldErrors.problemToSolve}>
                <textarea {...field("problemToSolve")} rows={4} maxLength={4000} className={`${inputClasses} min-h-28 resize-y py-3`} aria-invalid={Boolean(fieldErrors.problemToSolve)} aria-describedby={fieldErrors.problemToSolve ? `${idPrefix}-problemToSolve-error` : undefined} />
              </Field>
            </div>
            <Field label="Who will use or benefit from the solution" htmlFor={`${idPrefix}-intendedUsers`} required error={fieldErrors.intendedUsers}>
              <textarea {...field("intendedUsers")} rows={3} maxLength={2000} className={`${inputClasses} min-h-20 resize-y py-3`} aria-invalid={Boolean(fieldErrors.intendedUsers)} aria-describedby={fieldErrors.intendedUsers ? `${idPrefix}-intendedUsers-error` : undefined} />
            </Field>
            <Field label="Why the project matters" htmlFor={`${idPrefix}-whyItMatters`} required error={fieldErrors.whyItMatters}>
              <textarea {...field("whyItMatters")} rows={3} maxLength={2000} className={`${inputClasses} min-h-20 resize-y py-3`} aria-invalid={Boolean(fieldErrors.whyItMatters)} aria-describedby={fieldErrors.whyItMatters ? `${idPrefix}-whyItMatters-error` : undefined} />
            </Field>
            <Field label="What currently exists" htmlFor={`${idPrefix}-whatCurrentlyExists`} error={fieldErrors.whatCurrentlyExists} helper="Leave blank if nothing currently exists.">
              <textarea {...field("whatCurrentlyExists")} rows={3} maxLength={2000} className={`${inputClasses} min-h-20 resize-y py-3`} aria-invalid={Boolean(fieldErrors.whatCurrentlyExists)} aria-describedby={fieldErrors.whatCurrentlyExists ? `${idPrefix}-whatCurrentlyExists-error` : undefined} />
            </Field>
            <Field label="Desired result" htmlFor={`${idPrefix}-desiredResult`} required error={fieldErrors.desiredResult}>
              <textarea {...field("desiredResult")} rows={3} maxLength={2000} className={`${inputClasses} min-h-20 resize-y py-3`} aria-invalid={Boolean(fieldErrors.desiredResult)} aria-describedby={fieldErrors.desiredResult ? `${idPrefix}-desiredResult-error` : undefined} />
            </Field>
            <Field label="Essential features" htmlFor={`${idPrefix}-essentialFeatures`} required error={fieldErrors.essentialFeatures}>
              <textarea {...field("essentialFeatures")} rows={3} maxLength={2000} className={`${inputClasses} min-h-20 resize-y py-3`} aria-invalid={Boolean(fieldErrors.essentialFeatures)} aria-describedby={fieldErrors.essentialFeatures ? `${idPrefix}-essentialFeatures-error` : undefined} />
            </Field>
            <Field label="Content currently available" htmlFor={`${idPrefix}-contentAvailable`} required error={fieldErrors.contentAvailable}>
              <select {...field("contentAvailable")} className={inputClasses}>
                {readinessOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {step.id === "readiness" && (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Name or role of the person who will make project decisions" htmlFor={`${idPrefix}-decisionMakerRole`} required error={fieldErrors.decisionMakerRole}>
                <input {...field("decisionMakerRole")} type="text" maxLength={160} className={inputClasses} aria-invalid={Boolean(fieldErrors.decisionMakerRole)} aria-describedby={fieldErrors.decisionMakerRole ? `${idPrefix}-decisionMakerRole-error` : undefined} />
              </Field>
            </div>
            <Field label="Ability to participate in discovery and reviews" htmlFor={`${idPrefix}-canParticipateInDiscovery`} required error={fieldErrors.canParticipateInDiscovery}>
              <select {...field("canParticipateInDiscovery")} className={inputClasses}>
                {readinessOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Ability to provide content" htmlFor={`${idPrefix}-canProvideContent`} required error={fieldErrors.canProvideContent}>
              <select {...field("canProvideContent")} className={inputClasses}>
                {readinessOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Ability to cover approved third-party costs" htmlFor={`${idPrefix}-canCoverThirdPartyCosts`} required error={fieldErrors.canCoverThirdPartyCosts}>
              <select {...field("canCoverThirdPartyCosts")} className={inputClasses}>
                {readinessOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Ability to maintain the project after handover" htmlFor={`${idPrefix}-canMaintainAfterHandover`} required error={fieldErrors.canMaintainAfterHandover}>
              <select {...field("canMaintainAfterHandover")} className={inputClasses}>
                {readinessOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Is there anything else Kipeo should understand when reviewing this application?" htmlFor={`${idPrefix}-anythingElse`} error={fieldErrors.anythingElse}>
                <textarea {...field("anythingElse")} rows={3} maxLength={2000} className={`${inputClasses} min-h-20 resize-y py-3`} aria-invalid={Boolean(fieldErrors.anythingElse)} aria-describedby={fieldErrors.anythingElse ? `${idPrefix}-anythingElse-error` : undefined} />
              </Field>
            </div>
          </div>
        )}

        {step.id === "consent" && (
          <div className="mt-5 flex flex-col gap-6">
            <p className="flex items-start gap-2 rounded-lg border border-[#b3261e]/25 bg-[#fbeceb] p-3.5 text-xs leading-relaxed text-[#7a2b26]">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              Do not submit passwords, access keys, identification documents, confidential records, health
              information or sensitive beneficiary data.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <input
                  id={`${idPrefix}-privacyAcknowledged`}
                  type="checkbox"
                  checked={values.privacyAcknowledged}
                  onChange={(e) => setValues((prev) => ({ ...prev, privacyAcknowledged: e.target.checked }))}
                  aria-invalid={Boolean(fieldErrors.privacyAcknowledged)}
                  aria-describedby={fieldErrors.privacyAcknowledged ? `${idPrefix}-privacyAcknowledged-error` : undefined}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-neutral-300 text-teal-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-strong"
                />
                <label htmlFor={`${idPrefix}-privacyAcknowledged`} className="text-sm leading-relaxed text-slate">
                  I understand that Kipeo Digital will use these details to assess and respond to this Impact Build
                  application.{" "}
                  <Link href="/privacy-policy" className="font-medium text-teal-strong underline underline-offset-2 hover:text-ink">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {fieldErrors.privacyAcknowledged && <p className={errorClasses}>{fieldErrors.privacyAcknowledged}</p>}

              <div className="flex items-start gap-3">
                <input
                  id={`${idPrefix}-termsAccepted`}
                  type="checkbox"
                  checked={values.termsAccepted}
                  onChange={(e) => setValues((prev) => ({ ...prev, termsAccepted: e.target.checked }))}
                  aria-invalid={Boolean(fieldErrors.termsAccepted)}
                  aria-describedby={fieldErrors.termsAccepted ? `${idPrefix}-termsAccepted-error` : undefined}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-neutral-300 text-teal-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-strong"
                />
                <label htmlFor={`${idPrefix}-termsAccepted`} className="text-sm leading-relaxed text-slate">
                  I have read and accept the{" "}
                  <Link href="/impact-build/terms" className="font-medium text-teal-strong underline underline-offset-2 hover:text-ink">
                    Kipeo Impact Build Terms
                  </Link>
                  .
                </label>
              </div>
              {fieldErrors.termsAccepted && <p className={errorClasses}>{fieldErrors.termsAccepted}</p>}

              <div className="flex items-start gap-3">
                <input
                  id={`${idPrefix}-accuracyDeclared`}
                  type="checkbox"
                  checked={values.accuracyDeclared}
                  onChange={(e) => setValues((prev) => ({ ...prev, accuracyDeclared: e.target.checked }))}
                  aria-invalid={Boolean(fieldErrors.accuracyDeclared)}
                  aria-describedby={fieldErrors.accuracyDeclared ? `${idPrefix}-accuracyDeclared-error` : undefined}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-neutral-300 text-teal-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-strong"
                />
                <label htmlFor={`${idPrefix}-accuracyDeclared`} className="text-sm leading-relaxed text-slate">
                  I confirm that the information provided is accurate to the best of my knowledge.
                </label>
              </div>
              {fieldErrors.accuracyDeclared && <p className={errorClasses}>{fieldErrors.accuracyDeclared}</p>}
            </div>
          </div>
        )}

        {step.id === "review" && (
          <div className="mt-5 flex flex-col gap-6">
            <p className="text-sm leading-relaxed text-slate">
              Review your answers before submitting. Use Back to change anything.
            </p>
            {steps
              .filter((s) => s.id !== "review" && s.id !== "consent")
              .map((s) => (
                <div key={s.id} className="rounded-xl border border-neutral-200 bg-paper p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-muted">{s.legend}</p>
                  <dl className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {(impactBuildStepFieldGroups[s.id as Exclude<ImpactBuildStepId, "review">] as (keyof ImpactBuildApplicationState)[]).map((key) => (
                      <div key={String(key)}>
                        <dt className="text-xs text-slate-muted">{fieldLabels[key as string]}</dt>
                        <dd className="text-sm text-paper-foreground">{String(values[key]) || "—"}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            <div className="rounded-xl border border-neutral-200 bg-paper p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-muted">Declarations</p>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm text-paper-foreground">
                <li>Privacy acknowledgement: {values.privacyAcknowledged ? "Accepted" : "Not yet accepted"}</li>
                <li>Impact Build Terms: {values.termsAccepted ? "Accepted" : "Not yet accepted"}</li>
                <li>Accuracy declaration: {values.accuracyDeclared ? "Confirmed" : "Not yet confirmed"}</li>
              </ul>
            </div>

            <Turnstile onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} />
          </div>
        )}
      </fieldset>

      {/* Honeypot — hidden from sighted and assistive-tech users, left open for scripted bots. Present regardless of step. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${idPrefix}-organisationRole`}>Leave this field blank</label>
        <input
          id={`${idPrefix}-organisationRole`}
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={(e) => setValues((prev) => ({ ...prev, honeypot: e.target.value }))}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Button type="button" variant="outline" size="md" onClick={goBack} disabled={currentStep === 0} className="min-w-11">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back
        </Button>

        {step.id === "review" ? (
          <Button type="button" variant="primary" size="lg" disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? "Submitting application…" : "Submit application"}
            {!isSubmitting && <ArrowUpRight className="h-4 w-4" aria-hidden />}
          </Button>
        ) : (
          <Button type="button" variant="primary" size="md" onClick={goNext}>
            Next
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        )}
      </div>
    </div>
  );
}
