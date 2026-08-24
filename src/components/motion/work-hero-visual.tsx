import Image from "next/image";
import type { HeroCollageImage } from "@/content/work";

const layout: Record<string, string> = {
  "bushlite-dashboard": "left-0 top-[8%] w-[64%] z-10",
  "bushlite-login": "left-[38%] top-[38%] w-[58%] z-20",
};

/**
 * Two-tile hero collage of genuine BushLite WiFi screenshots — no personal
 * websites, no AI-concept imagery, no stock photography. Gentle per-tile
 * hover lift only (no pointer tilt, kept for the studio pages), neutralised
 * under reduced motion by the site's global CSS.
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
              sizes="(min-width: 1024px) 28vw, 55vw"
              className="object-cover object-top"
            />
            <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-2.5 pb-1.5 pt-5">
              <p className="text-[10px] font-medium text-ink-foreground">{image.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
