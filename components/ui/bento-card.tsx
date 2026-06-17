import { cn } from "@/lib/utils";

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BentoCard({ children, className, ...props }: BentoCardProps) {
  return (
    <div 
      className={cn(
        "rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-premium overflow-hidden relative",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
