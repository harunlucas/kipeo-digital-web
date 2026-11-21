import Image from "next/image";
import { Container } from "@/components/layout/container";

/**
 * The /insights hero: the sketchbook illustration with the live HTML
 * heading. On desktop the heading and introduction sit over the open paper
 * on the left of the image, with the hand and pencil kept on the right. Below
 * `lg` the text comes first and the image follows, cropped toward the pencil
 * tip.
 *
 * The image is decorative behind equivalent text, so `alt=""`. It is the
 * main above-the-fold image, so it is preloaded.
 *
 * `#e6ccad` is the illustration's own paper colour (sampled from its plain
 * left edge). On desktop the image is narrowed and anchored right so the
 * text keeps clear of the notebook; the panel fills the gap in the same
 * colour and a short fade hides the join.
 *
 * The illustration is light paper in both appearances, so where the text
 * sits on it (from `lg`) it keeps the Light charcoal (`#14171a`, ~11:1 on
 * the paper) even when the rest of the page is dark. Below `lg` the text is
 * on the page itself and follows the theme.
 */
export function InsightsHero({ intro }: { intro: string }) {
  return (
    <section aria-labelledby="insights-title" className="pt-6 sm:pt-8 lg:pt-10">
      <Container>
        <div className="relative lg:h-[420px] lg:overflow-hidden lg:rounded-[1.75rem] lg:bg-[#e6ccad]">
          <div className="relative lg:absolute lg:inset-y-0 lg:left-0 lg:z-10 lg:flex lg:flex-col lg:justify-center lg:pl-10 xl:pl-14">
            <h1 id="insights-title" className="hero-headline font-display font-semibold text-paper-foreground lg:text-[#14171a]">
              Insights
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate sm:text-lg lg:mt-5 lg:max-w-[19rem] lg:text-[#14171a]/80">
              {intro}
            </p>
          </div>

          <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl bg-[#e6ccad] sm:aspect-[2/1] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[88%] lg:rounded-none xl:w-[90%]">
            <Image
              src="/images/insights/insights-sketchbook-hero.webp"
              alt=""
              fill
              preload
              quality={90}
              sizes="(min-width: 1280px) 1066px, (min-width: 1024px) calc(88vw - 84px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 48px)"
              className="object-cover object-[78%_55%] sm:object-[72%_50%] lg:object-[50%_40%]"
            />
            {/* Softens the image's left edge into the panel's matching paper colour. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/5 bg-gradient-to-r from-[#e6ccad] to-transparent lg:block"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
