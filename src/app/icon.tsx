import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
          background: "#0d1117",
          borderRadius: "9px",
        }}
      >
        <svg width="23" height="23" viewBox="0 0 32 32" fill="none">
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
