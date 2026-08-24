import { Hero } from "@/components/sections/home/hero";
import { TrustStrip } from "@/components/sections/home/trust-strip";
import { ServicesIntro } from "@/components/sections/home/services-intro";
import { SystemsShowcase } from "@/components/sections/home/systems-showcase";
import { ProblemsWeSolve } from "@/components/sections/home/problems-we-solve";
import { Process } from "@/components/sections/home/process";
import { Capabilities } from "@/components/sections/home/capabilities";
import { GlobalCollaboration } from "@/components/sections/home/global-collaboration";
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
      <SystemsShowcase />
      <ProblemsWeSolve />
      <Process />
      <Capabilities />
      <GlobalCollaboration />
      <FinalCta />
    </>
  );
}
