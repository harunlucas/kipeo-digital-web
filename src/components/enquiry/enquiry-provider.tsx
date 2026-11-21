"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import type { EnquiryServiceId } from "@/content/enquiry";
import { emptyEnquiryDraft, type EnquiryDraft } from "@/lib/contact-schema";

/**
 * Site-wide state for the project enquiry: the in-memory draft shared by the
 * right-side panel and the inline form on /contact, plus whether the panel
 * is open and which element opened it (so focus can return there).
 *
 * The draft lives only in React state — never localStorage — so it survives
 * closing/reopening the panel and client-side navigation during a visit,
 * and nothing is written to the browser (the Cookie Policy promises that).
 *
 * Service preselection rule: a CTA's service is applied only while the
 * draft is untouched. Once the visitor has typed anything or picked a
 * service themselves, opening from another CTA keeps their input as is.
 */

type EnquiryContextValue = {
  draft: EnquiryDraft;
  updateField: <K extends keyof EnquiryDraft>(key: K, value: EnquiryDraft[K]) => void;
  clearDraft: () => void;
  /** Apply a CTA's service (or none, for the general CTA) unless the visitor has already started. */
  applyCtaService: (service: EnquiryServiceId | undefined) => void;
  isPanelOpen: boolean;
  /** Increments on each open — keys the panel's form so each opening starts with a fresh status. */
  panelSession: number;
  openPanel: (options: { service?: EnquiryServiceId; trigger?: HTMLElement | null }) => void;
  closePanel: () => void;
  /** The element that opened the panel; read by the panel to restore focus on close. */
  triggerRef: React.RefObject<HTMLElement | null>;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<EnquiryDraft>(emptyEnquiryDraft);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelSession, setPanelSession] = useState(0);
  const serviceTouchedRef = useRef(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const openRef = useRef(false);

  const updateField = useCallback(<K extends keyof EnquiryDraft>(key: K, value: EnquiryDraft[K]) => {
    if (key === "service") serviceTouchedRef.current = true;
    setDraft((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearDraft = useCallback(() => {
    serviceTouchedRef.current = false;
    setDraft(emptyEnquiryDraft);
  }, []);

  const applyCtaService = useCallback((service: EnquiryServiceId | undefined) => {
    setDraft((prev) => {
      const started =
        serviceTouchedRef.current || Boolean(prev.fullName.trim() || prev.email.trim() || prev.projectSummary.trim());
      if (started) return prev;
      const next = service ?? "";
      return prev.service === next ? prev : { ...prev, service: next };
    });
  }, []);

  const openPanel = useCallback<EnquiryContextValue["openPanel"]>(
    ({ service, trigger }) => {
      triggerRef.current = trigger ?? null;
      applyCtaService(service);
      if (openRef.current) return;
      openRef.current = true;
      setPanelSession((n) => n + 1);
      setIsPanelOpen(true);
    },
    [applyCtaService],
  );

  const closePanel = useCallback(() => {
    openRef.current = false;
    setIsPanelOpen(false);
  }, []);

  const value = useMemo<EnquiryContextValue>(
    () => ({
      draft,
      updateField,
      clearDraft,
      applyCtaService,
      isPanelOpen,
      panelSession,
      openPanel,
      closePanel,
      triggerRef,
    }),
    [draft, updateField, clearDraft, applyCtaService, isPanelOpen, panelSession, openPanel, closePanel],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry(): EnquiryContextValue {
  const context = useContext(EnquiryContext);
  if (!context) throw new Error("useEnquiry must be used inside <EnquiryProvider>.");
  return context;
}
