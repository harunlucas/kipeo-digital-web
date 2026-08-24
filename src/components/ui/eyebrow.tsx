type EyebrowProps = {
  children: React.ReactNode;
  tone?: "paper" | "ink";
  className?: string;
};

export function Eyebrow({ children, tone = "paper", className = "" }: EyebrowProps) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-[0.2em] ${
        tone === "ink" ? "text-teal" : "text-teal-strong"
      } ${className}`}
    >
      {children}
    </p>
  );
}
