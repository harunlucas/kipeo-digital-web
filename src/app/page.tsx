import { Hero } from "@/components/sections/home/hero";
import { WhatWeBuild } from "@/components/sections/home/what-we-build";
import { HowWeWork } from "@/components/sections/home/how-we-work";
import { StudioIntro } from "@/components/sections/home/studio-intro";
import { FinalCta } from "@/components/sections/home/final-cta";
import { organizationSchema, professionalServiceSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema()) }}
      />

      <Hero />
      <WhatWeBuild />
      <HowWeWork />
      <StudioIntro />
      <FinalCta />
    </>
  );
}
