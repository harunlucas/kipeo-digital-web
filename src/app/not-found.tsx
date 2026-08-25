import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

function BrokenRouteVisual() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" aria-hidden className="mx-auto">
      <circle cx="14" cy="58" r="5" className="fill-teal" />
      <path
        d="M19 55 45 30"
        className="stroke-teal"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />
      <circle cx="52" cy="24" r="5" className="fill-neutral-300" />
      <path
        d="M63 22 88 16"
        className="stroke-neutral-300"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />
      <circle cx="106" cy="14" r="5" className="fill-neutral-300" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-paper py-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <BrokenRouteVisual />
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-teal-strong">404</p>
          <h1 className="text-display-2 mt-3 text-paper-foreground">This page could not be found.</h1>
          <p className="mt-4 text-base leading-relaxed text-slate">
            The link may be outdated, the address may have changed, or the page may no longer be available.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/" variant="primary" size="lg">
              Return home
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Explore services
            </Button>
            <Button href="/work" variant="outline" size="lg">
              View our work
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Kipeo
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
