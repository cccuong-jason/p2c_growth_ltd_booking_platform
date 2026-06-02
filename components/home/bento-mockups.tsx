import React from "react";
import { Zap, ShieldCheck } from "lucide-react";

export const MockupPrecision = () => (
  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] shadow-2xl transition-all duration-500 group-hover:-translate-x-2 group-hover:shadow-soft-xl rounded-l-2xl border border-r-0 border-slate-200 bg-white overflow-hidden">
    <div className="bg-slate-50 px-4 py-3 border-b flex items-center gap-2">
       <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
       <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
       <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
    </div>
    <div className="p-5 space-y-4 bg-white min-h-[160px]">
      <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 shadow-sm">
        <div>
           <p className="text-sm font-bold text-slate-900">Physiotherapy Intake</p>
           <p className="text-[10px] font-bold text-slate-500 mt-1">10:42 AM</p>
        </div>
        <div className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700">
           Approved
        </div>
      </div>
      <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 shadow-sm opacity-50">
        <div>
           <p className="text-sm font-bold text-slate-900">Neuro Assessment</p>
           <p className="text-[10px] font-bold text-slate-500 mt-1">09:15 AM</p>
        </div>
      </div>
    </div>
  </div>
);

export const MockupDispatch = () => (
  <div className="absolute inset-0 bg-[#0A101D] overflow-hidden rounded-[inherit] flex items-center justify-center">
     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)]" style={{ backgroundSize: "24px 24px" }} />
     
     <div className="relative flex items-center justify-center w-full h-full">
        <div className="absolute w-[400px] h-[400px] rounded-full border border-blue-500/10 border-dashed animate-[spin_30s_linear_infinite]" />
        <div className="absolute w-[250px] h-[250px] rounded-full border border-blue-500/20 border-dashed animate-[spin_20s_linear_infinite_reverse]" />
        
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-blue-600 shadow-[0_0_60px_rgba(18,100,255,0.6)] flex items-center justify-center z-10 transition-transform duration-500 group-hover:scale-110">
           <Zap className="h-10 w-10 text-white" />
        </div>
        
        {/* Abstract nodes */}
        <div className="absolute right-[30%] top-[20%] w-12 h-12 rounded-full border border-emerald-500/30 flex items-center justify-center">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="absolute right-[20%] bottom-[20%] w-12 h-12 rounded-full border border-amber-500/30 flex items-center justify-center">
           <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        </div>
     </div>
  </div>
);

export const MockupLanguages = () => (
  <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center overflow-hidden">
     <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
       <div className="absolute w-24 h-24 bg-blue-600 rounded-3xl shadow-[0_20px_40px_rgba(18,100,255,0.3)] flex items-center justify-center z-20 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
          <span className="text-4xl font-extrabold text-white">VI</span>
       </div>
       <div className="absolute left-[10%] bottom-[20%] w-20 h-20 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center z-10 transform -rotate-12 transition-transform duration-500 group-hover:-translate-x-4">
          <span className="text-2xl font-bold text-slate-800">EN</span>
       </div>
       <div className="absolute right-[10%] top-[20%] w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center z-10 transform rotate-12 transition-transform duration-500 group-hover:translate-x-4">
          <span className="text-xl font-bold text-slate-800">ZH</span>
       </div>
     </div>
  </div>
);

export const MockupHCPC = () => (
  <div className="absolute inset-0 bg-porcelain rounded-[inherit] overflow-hidden pointer-events-none">
     <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(-45deg, #cbd5e1 0, #cbd5e1 1px, transparent 1px, transparent 12px)" }} />
     
     <div className="absolute top-8 right-8 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Verified</span>
     </div>

     <div className="absolute bottom-[-20%] right-[-10%] w-[300px] h-[300px] border-[12px] border-slate-200/50 rounded-full flex items-center justify-center opacity-30 transform rotate-[-15deg]">
        <div className="w-[200px] h-[200px] border-[4px] border-slate-200/50 rounded-full flex items-center justify-center">
           <span className="text-3xl font-black text-slate-300 tracking-[0.3em]">OFFICIAL</span>
        </div>
     </div>
  </div>
);
