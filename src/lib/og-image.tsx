import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

/**
 * Shared renderer for page-specific Open Graph / Twitter share images
 * (`opengraph-image.tsx` / `twitter-image.tsx` route files). Generated at
 * request time via Satori/`next/og` — no binary asset, so nothing to
 * license or store. Each page passes its own eyebrow/heading so no two
 * pages share the same share image.
 */
export function renderOgImage({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0d1117",
          backgroundImage:
            "radial-gradient(ellipse 60% 60% at 78% 12%, rgba(20,184,166,0.28), transparent), radial-gradient(ellipse 50% 50% at 10% 95%, rgba(108,99,224,0.22), transparent)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              display: "flex",
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              backgroundColor: "#0d1117",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <path
                d="M8.5 22.5 16 15.5 23.5 8.5"
                stroke="#14b8a6"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="8.5" cy="22.5" r="3.2" fill="#14b8a6" />
              <circle cx="16" cy="15.5" r="3.2" fill="#14b8a6" />
              <circle cx="23.5" cy="8.5" r="3.2" fill="#14b8a6" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: "28px", fontWeight: 700, color: "#f5f2ea" }}>Kipeo Digital</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "980px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#14b8a6",
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: "56px", lineHeight: 1.1, fontWeight: 700, color: "#f5f2ea" }}>
            {heading}
          </div>
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}
