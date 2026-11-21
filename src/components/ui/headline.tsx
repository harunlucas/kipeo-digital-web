/**
 * The site's two-voice heading: a semibold sans lead and an italic serif
 * accent in teal, as on /about, /services and /work. Wrap it in an element
 * carrying `hero-headline` or `section-headline` for size.
 */
export function Headline({
  lead,
  accent,
  tone = "paper",
  stacked = false,
}: {
  lead: string;
  accent: string;
  tone?: "paper" | "ink";
  stacked?: boolean;
}) {
  const block = stacked ? "block [text-wrap:balance] " : "";
  return (
    <>
      <span className={`${block}font-display font-semibold ${tone === "ink" ? "text-ink-foreground" : "text-paper-foreground"}`}>
        {lead}
      </span>{" "}
      <span className={`${block}pb-[0.08em] font-serif-display italic ${tone === "ink" ? "text-teal" : "text-teal-strong"}`}>
        {accent}
      </span>
    </>
  );
}
