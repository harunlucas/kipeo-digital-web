import { Hero } from "@/components/sections/home/hero";
import { TrustStrip } from "@/components/sections/home/trust-strip";
import { ServicesIntro } from "@/components/sections/home/services-intro";
import { SelectedWork } from "@/components/sections/home/selected-work";
import { ProblemsWeSolve } from "@/components/sections/home/problems-we-solve";
import { Process } from "@/components/sections/home/process";
import { Capabilities } from "@/components/sections/home/capabilities";
import { InteractiveStudioSection } from "@/components/sections/home/interactive-studio-section";
import { GlobalCollaboration } from "@/components/sections/home/global-collaboration";
import { ImpactBuildTeaser } from "@/components/sections/home/impact-build-teaser";
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
      <TrustStrip />
      <ServicesIntro />
      <SelectedWork />
      <ProblemsWeSolve />
      <Process />
      <Capabilities />
      <InteractiveStudioSection />
      <GlobalCollaboration />
      <ImpactBuildTeaser />
      <FinalCta />
    </>
  );
}
