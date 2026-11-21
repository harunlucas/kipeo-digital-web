import Image from "next/image";
import { Maximize2 } from "lucide-react";
import type { ServiceImage } from "@/content/services-page";
import { cn } from "@/lib/cn";

/**
 * One supplied interface image on /services, with its provenance label and
 * caption.
 *
 * The source file is lossless WebP at full resolution. `next/image` serves a
 * resized variant for the slot (`sizes`) at quality 90, so fine lettering
 * stays crisp without shipping the full file inline. Intrinsic width and
 * height reserve the space, so nothing shifts as it loads.
 *
 * These are detailed interfaces, so every figure offers the full-resolution
 * file: tapping the image opens it, and a visible "Open full size" text link
 * does the same for keyboard and screen-reader users. The image link is
 * hidden from assistive technology and the tab order so the same
 * destination isn't announced twice, and the image's alt text stays a
 * description of the interface rather than a link name.
 */
export function ServiceFigure({
  image,
  sizes,
  className,
}: {
  image: ServiceImage;
  sizes: string;
  className?: string;
}) {
  return (
    <figure className={cn("m-0", className)}>
      <a href={image.src} tabIndex={-1} aria-hidden className="block cursor-zoom-in">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          quality={90}
          loading="lazy"
          className="block h-auto w-full rounded-xl bg-paper-elevated shadow-[0_0_0_1px_rgb(13_17_23/0.08),0_22px_44px_-30px_rgb(13_17_23/0.45)]"
        />
      </a>
      <figcaption className="mt-3 max-w-[62ch] text-sm leading-relaxed text-slate">
        <span className="mr-2 inline-flex items-center rounded-full border border-neutral-300 px-2 py-px align-[1px] text-xs font-medium text-slate-muted">
          {image.label}
        </span>
        {image.caption}{" "}
        <a
          href={image.src}
          className="inline-flex min-h-6 items-center gap-1 whitespace-nowrap font-medium text-paper-foreground underline decoration-paper-foreground/30 underline-offset-4 transition-colors hover:text-teal-strong hover:decoration-teal-strong/50"
        >
          <Maximize2 aria-hidden className="h-3.5 w-3.5" />
          Open full size
          <span className="sr-only"> (full-resolution image)</span>
        </a>
      </figcaption>
    </figure>
  );
}
