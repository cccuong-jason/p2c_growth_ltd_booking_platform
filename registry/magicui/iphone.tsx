import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Iphone({
  children,
  className,
  screenClassName
}: {
  children?: ReactNode;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[433/882] w-[434px] max-w-full rounded-[3.45rem] bg-gradient-to-b from-slate-950 to-slate-900 p-[12px] shadow-[0_44px_110px_-34px_rgba(15,23,42,0.85)] ring-1 ring-slate-950/20",
        "before:absolute before:left-1/2 before:top-[14px] before:z-30 before:h-[27px] before:w-[118px] before:-translate-x-1/2 before:rounded-b-[1.15rem] before:bg-slate-950",
        "after:absolute after:left-1/2 after:top-[20px] after:z-40 after:h-[5px] after:w-[44px] after:-translate-x-1/2 after:rounded-full after:bg-slate-700/70",
        className
      )}
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-[2.7rem] bg-white ring-1 ring-white/40",
          screenClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
