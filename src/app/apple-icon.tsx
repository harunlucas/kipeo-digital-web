import { ImageResponse } from "next/og";
import { PEAK_PATH } from "@/components/layout/brand-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Full-bleed warm ivory (iOS applies its own corner mask) with the
 *  charcoal Kipeo peak. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8f3ea",
        }}
      >
        <svg width="124" height="124" viewBox="0 0 32 32">
          <path d={PEAK_PATH} fillRule="evenodd" fill="#14171a" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
