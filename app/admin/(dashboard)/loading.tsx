import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex h-full min-h-[400px] w-full items-center justify-center p-8 bg-slate-50/50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-12 w-12 rounded-full border-4 border-blue-100" />
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 relative z-10" strokeWidth={3} />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">
          Syncing Operations...
        </p>
      </div>
    </div>
  );
}
