import type { MDXComponents } from "mdx/types";
import { ArticleCta } from "@/components/sections/insights/article-cta";

/**
 * Global MDX styling for /insights articles — maps markdown output to the
 * Kipeo editorial type system instead of relying on a typography plugin,
 * so the site doesn't take on an extra dependency for three articles.
 */
const components: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2 className="text-display-3 mt-12 scroll-mt-28 text-paper-foreground first:mt-0" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-8 scroll-mt-28 text-xl font-semibold text-paper-foreground" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mt-4 text-base leading-relaxed text-slate" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mt-4 flex flex-col gap-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mt-4 flex list-decimal flex-col gap-2 pl-5 marker:font-mono marker:text-sm marker:text-teal-strong" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="flex items-start gap-2.5 pl-0.5 text-base leading-relaxed text-slate [ol_&]:block [ol_&]:pl-0" {...props}>
      <span className="mt-2.5 hidden h-1.5 w-1.5 shrink-0 rounded-full bg-teal-strong [ul_&]:block" aria-hidden />
      <span>{children}</span>
    </li>
  ),
  a: ({ children, href = "", ...props }) => {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="font-medium text-teal-strong underline decoration-neutral-300 underline-offset-2 hover:text-ink"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-paper-foreground" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-6 border-l-2 border-teal-strong pl-5 text-base leading-relaxed text-slate italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props) => <hr className="my-10 border-neutral-200" {...props} />,
  ArticleCta,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
