import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function SectionBadge({ icon: Icon, children, className }: SectionBadgeProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full bg-ocean/5 border border-ocean/10 px-4 py-1.5 mb-6", className)}>
      {Icon && <Icon className="h-4 w-4 text-ocean" aria-hidden="true" />}
      <span className="text-[11px] font-bold text-ocean uppercase tracking-[0.2em]">
        {children}
      </span>
    </div>
  );
}
