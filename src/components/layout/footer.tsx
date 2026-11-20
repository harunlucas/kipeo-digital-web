import Link from "next/link";
import { footerCompanyLinks, footerLegalLinks, footerServiceLinks } from "@/content/navigation";
import { siteConfig } from "@/content/site-config";
import { cn } from "@/lib/cn";
import { BrandLockup } from "./brand-mark";
import { Container } from "./container";

/**
 * Site footer, shared by every page. The homepage's closing CTA carries the
 * invitation; this is for reaching Kipeo directly or finding a page.
 *
 * It shares the CTA's `bg-ink` and has no top border, so on the homepage
 * the CTA's grid fades straight into it with no seam (that fade lives in
 * `final-cta.tsx`). Content sits in the same `Container` as the homepage
 * sections, so its left edge matches theirs.
 *
 * Layout, from one markup structure: on mobile the brand and contact
 * details come first, then Services full width (its names are long), then
 * Company in two short columns; from `sm` Services and Company share a row;
 * from `lg` it is three columns. Links get a teal underline on hover and
 * keyboard focus; the focus ring is the brighter teal on this surface (see
 * `.site-footer :focus-visible` in globals.css).
 */

const linkClass =
  "rounded-sm underline decoration-transparent decoration-1 underline-offset-[5px] transition-[color,text-decoration-color] duration-200 hover:decoration-teal focus-visible:decoration-teal motion-reduce:transition-none";

const navLinkClass = cn(linkClass, "inline-block py-1 text-sm text-ink-muted hover:text-ink-foreground focus-visible:text-ink-foreground");

function FooterNav({
  id,
  title,
  links,
  listClassName,
}: {
  id: string;
  title: string;
  links: { label: string; href: string }[];
  listClassName?: string;
}) {
  return (
    <nav aria-labelledby={id}>
      <h2 id={id} className="text-xs font-medium uppercase tracking-[0.14em] text-ink-foreground/70">
        {title}
      </h2>
      <ul className={cn("mt-4 flex flex-col gap-2", listClassName)}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Thin divider with a small teal peak rising out of it near the brand
 *  column — a flattened triangle like the hero diagram's peak apertures. */
function PeakDivider() {
  return (
    <div aria-hidden className="mt-14 flex items-end sm:mt-16">
      <span className="mb-px h-px w-8 shrink-0 bg-ink-muted/15 sm:w-12" />
      <svg width="24" height="12" viewBox="0 0 24 12" className="block shrink-0 overflow-visible">
        <path d="M0.5 11.5 L12 1.5 L23.5 11.5 Z" className="fill-teal/10" />
        <path
          d="M0 11.5 L12 1.5 L24 11.5"
          fill="none"
          className="stroke-teal"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <span className="mb-px h-px flex-1 bg-ink-muted/15" />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="site-footer bg-ink text-ink-foreground">
      <Container className="pb-10 pt-12 sm:pt-16">
        <div className="grid gap-12 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] sm:gap-x-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.7fr)] lg:gap-x-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Kipeo Digital — Home" className="inline-flex rounded-md">
              <BrandLockup tone="on-dark" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              A Nairobi design and engineering studio building websites, software and connected systems.
            </p>
            <div className="mt-6 flex flex-col items-start gap-1">
              <a
                href={`mailto:${siteConfig.email}`}
                className={cn(
                  linkClass,
                  "inline-flex min-h-11 items-center text-base [overflow-wrap:anywhere] font-medium text-ink-foreground decoration-teal/40 hover:text-teal-200 sm:text-lg",
                )}
              >
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.phoneHref}
                className={cn(
                  linkClass,
                  "inline-flex min-h-11 items-center text-sm text-ink-muted hover:text-ink-foreground focus-visible:text-ink-foreground",
                )}
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>

          <FooterNav id="footer-services" title="Services" links={footerServiceLinks} />
          <FooterNav
            id="footer-company"
            title="Company"
            links={footerCompanyLinks}
            listClassName="grid grid-cols-2 gap-x-6 sm:flex sm:flex-col"
          />
        </div>

        <PeakDivider />

        <div className="mt-6 flex flex-col gap-4 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {footerLegalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(linkClass, "inline-block py-1.5 hover:text-ink-foreground focus-visible:text-ink-foreground")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
