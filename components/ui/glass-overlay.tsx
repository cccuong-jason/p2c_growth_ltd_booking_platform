import { cn } from "@/lib/utils";

interface GlassOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassOverlay({ children, className, ...props }: GlassOverlayProps) {
  return (
    <div 
      className={cn(
        "bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
