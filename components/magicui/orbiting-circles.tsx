import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function OrbitingCircles({
  children,
  className,
  radius = 120,
  duration = 22,
  reverse = false
}: {
  children: ReactNode[];
  className?: string;
  radius?: number;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className={cn("absolute inset-0", className)}>
      {children.map((child, index) => {
        const angle = (360 / children.length) * index;

        return (
          <div
            key={index}
            className="absolute left-1/2 top-1/2 will-change-transform"
            style={{
              animation: `${reverse ? "orbit-reverse" : "orbit"} ${duration}s linear infinite`,
              transformOrigin: "0 0",
              ["--orbit-radius" as string]: `${radius}px`,
              ["--orbit-angle" as string]: `${angle}deg`,
            }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2">{child}</div>
          </div>
        );
      })}
    </div>
  );
}
