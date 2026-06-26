import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "lg" | "sm";
}

export function SectionBadge({ icon: Icon, children, className, size = "default" }: SectionBadgeProps) {
  const isSmall = size === "sm";
  return (
    <div className={cn(
      "inline-flex items-center gap-2 rounded-full bg-ocean/5 border border-ocean/10 text-ocean",
      isSmall ? "px-4 py-1.5 mb-6" : "px-6 py-2.5 mb-4",
      className
    )}>
      {Icon && <Icon className={cn(isSmall ? "h-4 w-4" : "h-5 w-5", "text-current")} aria-hidden="true" />}
      <span className={cn(
        "font-bold text-current uppercase tracking-[0.2em]",
        isSmall ? "text-[11px]" : "text-xs md:text-sm"
      )}>
        {children}
      </span>
    </div>
  );
}

