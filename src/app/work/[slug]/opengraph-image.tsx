import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";
import { caseStudies } from "@/content/case-studies";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  return renderOgImage({
    eyebrow: study?.category ?? "Work",
    heading: study?.title ?? "Kipeo Digital",
  });
}
