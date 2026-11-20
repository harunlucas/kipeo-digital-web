import { ImageResponse } from "next/og";
import { PEAK_PATH } from "@/components/layout/brand-mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** The charcoal Kipeo peak on a warm-ivory tile, so it reads on both light
 *  and dark browser tab strips. */
export default function Icon() {
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
          borderRadius: "7px",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 32 32">
          <path d={PEAK_PATH} fillRule="evenodd" fill="#14171a" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
