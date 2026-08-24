import Link from "next/link";
import { footerCompanyLinks, footerLegalLinks, footerServiceLinks } from "@/content/navigation";
import { siteConfig } from "@/content/site-config";
import { Container } from "./container";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-medium text-ink-foreground">{title}</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-ink-muted hover:text-ink-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink-elevated/60 bg-ink text-ink-foreground">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-display text-lg font-semibold">
              {siteConfig.shortName}
              <span className="text-teal">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-ink-muted">{siteConfig.tagline}</p>
            <p className="mt-6 text-sm text-ink-muted">
              {siteConfig.location} · {siteConfig.serviceArea}
            </p>
            <div className="mt-4 flex flex-col gap-1 text-sm">
              <a href={`mailto:${siteConfig.email}`} className="text-teal hover:text-white">
                {siteConfig.email}
              </a>
              <a href={siteConfig.phoneHref} className="text-ink-muted hover:text-ink-foreground">
                {siteConfig.phone}
              </a>
            </div>
          </div>

          <FooterColumn title="Services" links={footerServiceLinks} />
          <FooterColumn title="Company" links={footerCompanyLinks} />
          <FooterColumn title="Legal" links={footerLegalLinks} />
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink-elevated pt-8 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="max-w-xl">{siteConfig.originStory}</p>
        </div>
      </Container>
    </footer>
  );
}
