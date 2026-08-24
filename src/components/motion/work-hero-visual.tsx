import Image from "next/image";
import type { HeroCollageImage } from "@/content/work";

const layout: Record<string, string> = {
  bushlite: "left-0 top-[6%] w-[60%] z-10",
  cynthiamueni: "left-[44%] top-0 w-[46%] z-20",
  harunlucas: "left-[50%] top-[46%] w-[46%] z-30",
  "hse-concept": "left-[2%] top-[54%] w-[38%] z-40",
};

/**
 * Layered hero collage: three genuine screenshots plus one clearly-tagged
 * concept render, overlapping with restrained depth. No pointer tilt here
 * (kept for the studio pages) — just a gentle per-tile hover lift, which
 * the site's global reduced-motion CSS already neutralises.
 */
export function WorkHeroVisual({ images }: { images: HeroCollageImage[] }) {
  return (
    <div className="relative aspect-square w-full max-w-[440px]">
      {images.map((image) => (
        <div
          key={image.id}
          className={`group absolute overflow-hidden rounded-xl border border-neutral-200 bg-ink shadow-panel transition-transform duration-300 ease-out hover:z-50 hover:-translate-y-1 hover:scale-[1.03] ${layout[image.id] ?? ""}`}
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-cover object-top"
            />
            <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-2.5 pb-1.5 pt-5">
              <p className="flex items-center gap-1.5 text-[10px] font-medium text-ink-foreground">
                {image.label}
                {image.isConcept && (
                  <span className="rounded-full border border-dashed border-white/40 px-1.5 py-0.5 text-[8px] uppercase tracking-wide text-ink-muted">
                    Concept
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
