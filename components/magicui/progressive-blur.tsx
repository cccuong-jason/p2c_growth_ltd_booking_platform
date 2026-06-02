import { cn } from "@/lib/utils";

export function ProgressiveBlur({
  className,
  direction = "bottom"
}: {
  className?: string;
  direction?: "top" | "bottom";
}) {
  const gradient =
    direction === "bottom"
      ? "linear-gradient(to bottom, transparent, black)"
      : "linear-gradient(to top, transparent, black)";

  return (
    <div className={cn("pointer-events-none absolute inset-x-0", className)}>
      {[2, 4, 8, 16].map((blur, index) => (
        <div
          key={blur}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            maskImage: gradient,
            WebkitMaskImage: gradient,
            opacity: 0.18 + index * 0.16,
          }}
        />
      ))}
    </div>
  );
}
