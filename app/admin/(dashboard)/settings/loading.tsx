import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="p-6 md:p-10 lg:p-14 space-y-8 bg-slate-50/50 min-h-screen">
      <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse" />
      <div className="bg-white border border-slate-200 rounded-3xl h-[500px] w-full animate-pulse shadow-sm" />
    </div>
  );
}
