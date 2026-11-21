"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { mainNav } from "@/content/navigation";
import { siteConfig } from "@/content/site-config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { BrandMark, Wordmark } from "./brand-mark";
import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";
import { ServicesMenu } from "./services-menu";
import { Container } from "./container";

/**
 * Shared site header, in the same `Container` as the homepage hero so its
 * edges line up with the hero's.
 *
 * From 1200px it is three parts: brand left, the five primary links in the
 * true centre (a `1fr auto 1fr` grid, so the nav is centred on the page
 * rather than in the leftover space), and the phone link plus "Start a
 * project" right. 1200px is measured, not a stock breakpoint: below it the
 * right cluster runs into the centred nav, so the nav and phone move into
 * the menu drawer instead, and "Start a project" stays in the bar (from
 * `sm`) beside the menu button. The breakpoint is repeated literally in
 * `mobile-menu.tsx` (`min-[1200px]:hidden`) because Tailwind needs literal
 * class names.
 *
 * The Services link and its panel live in `ServicesMenu`; the panel is
 * positioned against this `<header>` (sticky, so it's the panel's
 * containing block).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[72px] border-b transition-colors duration-300",
        scrolled
          ? "border-neutral-200 bg-ivory/95 shadow-[0_1px_0_rgba(13,17,23,0.04)] backdrop-blur-md"
          : "border-transparent bg-ivory/80 backdrop-blur-sm",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-6 min-[1200px]:grid min-[1200px]:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label="Kipeo Digital — Home"
          className="flex min-w-0 items-center gap-2.5 justify-self-start overflow-hidden rounded-md"
        >
          <BrandMark className="h-8 w-8" />
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden min-[1200px]:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) =>
              item.label === "Services" ? (
                <li key={item.href}>
                  <ServicesMenu />
                </li>
              ) : (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className="group relative inline-block py-2 text-sm font-medium text-slate transition-colors hover:text-paper-foreground"
                    activeClassName="text-paper-foreground"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-teal-strong transition-transform duration-200 ease-out group-aria-[current=page]:scale-x-100 group-hover:scale-x-100 motion-reduce:transition-none" />
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-5 justify-self-end">
          <a
            href={siteConfig.phoneHref}
            aria-label={`Call ${siteConfig.name} on ${siteConfig.phone}`}
            className="hidden items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium text-slate transition-colors hover:text-paper-foreground min-[1200px]:inline-flex"
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            {siteConfig.phone}
          </a>
          <Button enquiry variant="primary" className="hidden whitespace-nowrap shadow-sm sm:inline-flex">
            Start a project
          </Button>
          <MobileMenu items={mainNav} phoneHref={siteConfig.phoneHref} phoneLabel={siteConfig.phone} />
        </div>
      </Container>
    </header>
  );
}
