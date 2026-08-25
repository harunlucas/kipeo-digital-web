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
import { ServicesDropdown } from "./services-dropdown";
import { Container } from "./container";

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
          ? "border-neutral-200 bg-paper/95 shadow-[0_1px_0_rgba(13,17,23,0.04)] backdrop-blur-md"
          : "border-transparent bg-paper/70 backdrop-blur-sm",
      )}
    >
      <Container className="flex h-full items-center justify-between">
        <Link href="/" aria-label="Kipeo Digital — Home" className="flex items-center gap-2.5">
          <BrandMark />
          <Wordmark className="hidden sm:inline-block" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) =>
              item.label === "Services" ? (
                <li key={item.href}>
                  <ServicesDropdown />
                </li>
              ) : (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className="group relative inline-block py-2 text-sm font-medium text-slate transition-colors hover:text-paper-foreground"
                    activeClassName="text-paper-foreground"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-teal-strong transition-transform duration-200 ease-out group-aria-[current=page]:scale-x-100 group-hover:scale-x-100" />
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={siteConfig.phoneHref}
            aria-label={`Call ${siteConfig.name} at ${siteConfig.phone}`}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate transition-colors hover:bg-mist hover:text-paper-foreground lg:flex xl:hidden"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Call us
          </a>
          <a
            href={siteConfig.phoneHref}
            className="hidden items-center gap-2 text-sm font-medium text-slate transition-colors hover:text-paper-foreground xl:flex"
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            {siteConfig.phone}
          </a>
          <Button href="/contact" variant="primary">
            Start a project
          </Button>
        </div>

        <MobileMenu items={mainNav} phoneHref={siteConfig.phoneHref} phoneLabel={siteConfig.phone} />
      </Container>
    </header>
  );
}
