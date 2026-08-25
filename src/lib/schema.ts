import { siteConfig } from "@/content/site-config";

type FaqItem = { question: string; answer: string };

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    areaServed: "Worldwide",
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    areaServed: "Worldwide",
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${siteConfig.name}`,
    url: `${siteConfig.url}/contact`,
    about: organizationSchema(),
  };
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${siteConfig.name}`,
    url: `${siteConfig.url}/about`,
    about: organizationSchema(),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

type ArticleInput = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
};

export function articleSchema(insight: ArticleInput) {
  const publisher = { "@type": "Organization", name: siteConfig.name, url: siteConfig.url };
  const url = `${siteConfig.url}/insights/${insight.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: insight.title,
    description: insight.description,
    image: `${url}/opengraph-image`,
    datePublished: insight.publishedAt,
    dateModified: insight.updatedAt ?? insight.publishedAt,
    articleSection: insight.category,
    author: publisher,
    publisher,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function breadcrumbListSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
