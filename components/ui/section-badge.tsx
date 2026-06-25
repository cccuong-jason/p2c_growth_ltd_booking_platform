import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "lg";
}

export function SectionBadge({ icon: Icon, children, className, size = "default" }: SectionBadgeProps) {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 rounded-full bg-ocean/5 border border-ocean/10 text-ocean",
      size === "lg" ? "px-6 py-2.5 mb-4" : "px-4 py-1.5 mb-6",
      className
    )}>
      {Icon && <Icon className={cn(size === "lg" ? "h-5 w-5" : "h-4 w-4", "text-current")} aria-hidden="true" />}
      <span className={cn(
        "font-bold text-current uppercase tracking-[0.2em]",
        size === "lg" ? "text-xs md:text-sm" : "text-[11px]"
      )}>
        {children}
      </span>
    </div>
  );
}

