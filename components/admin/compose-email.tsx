"use client";

import { useState } from "react";
import { Mail, X, Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendCustomEmail } from "@/lib/admin-actions";
import { cn } from "@/lib/utils";

export function ComposeEmailModal({ email, isOpen, onClose }: { email: string; isOpen: boolean; onClose: () => void }) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function onSubmit(formData: FormData) {
    setIsPending(true);
    setMessage(null);
    
    const result = await sendCustomEmail(formData);
    
    if (result?.error) {
      setMessage({ type: "error", text: result.error });
      setIsPending(false);
    } else if (result?.success) {
      setMessage({ type: "success", text: "Email sent successfully!" });
      setTimeout(() => {
        onClose();
        setIsPending(false);
        setMessage(null);
      }, 1500);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-ink">Compose Message</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form action={onSubmit} className="space-y-4">
          <label className="block">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">To</span>
            <input 
              type="email" 
              name="to"
              defaultValue={email}
              readOnly
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500 font-medium cursor-not-allowed"
            />
          </label>
          
          <label className="block">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Subject</span>
            <input 
              type="text" 
              name="subject"
              required
              placeholder="e.g. Update on your physiotherapy request"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ocean focus:ring-4 focus:ring-ocean/10"
            />
          </label>

          <label className="block">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Message</span>
            <textarea 
              name="text"
              required
              rows={6}
              placeholder="Type your message here..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-ink focus:outline-none focus:border-ocean focus:ring-4 focus:ring-ocean/10 resize-none"
            />
          </label>

          {message && (
            <div className={cn("p-4 rounded-xl text-sm font-medium flex items-center gap-3", 
              message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
            )}>
              {message.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              {message.text}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl font-bold border-slate-200 text-slate-600 hover:bg-slate-50">
              Cancel
            </Button>
            <Button disabled={isPending} className="flex-1 rounded-xl bg-ocean font-bold text-white hover:bg-blue-600 transition-all shadow-lg shadow-blue-200">
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Send Email
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
