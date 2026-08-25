import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background: "#0d1117",
        }}
      >
        <svg width="128" height="128" viewBox="0 0 32 32" fill="none">
          <path
            d="M8.5 22.5 16 15.5 23.5 8.5"
            stroke="#14b8a6"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8.5" cy="22.5" r="3" fill="#14b8a6" />
          <circle cx="16" cy="15.5" r="3" fill="#14b8a6" />
          <circle cx="23.5" cy="8.5" r="3" fill="#14b8a6" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
