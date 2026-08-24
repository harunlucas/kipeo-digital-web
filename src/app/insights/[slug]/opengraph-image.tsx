import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";
import { getInsightBySlug } from "@/lib/insights";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getInsightBySlug(slug);

  return renderOgImage({
    eyebrow: result?.insight.category ?? "Insights",
    heading: result?.insight.title ?? "Kipeo Digital",
  });
}
