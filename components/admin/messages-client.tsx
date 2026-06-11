"use client";

import { useState, useMemo } from "react";
import { Search, Filter, MoreHorizontal, Mail, Calendar, MessageSquare, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type EnquiryRow } from "@/lib/supabase/schema";

export function MessagesClient({ initialMessages }: { initialMessages: EnquiryRow[] }) {
  const [query, setQuery] = useState("");

  const filteredMessages = useMemo(() => {
    return initialMessages.filter((msg) => {
      const haystack = `${msg.name} ${msg.email} ${msg.company || ""} ${msg.message}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [initialMessages, query]);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, email, or message..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <tr>
              <th className="px-6 py-4">From</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Message Preview</th>
              <th className="px-6 py-4">Received</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredMessages.map((msg) => (
              <tr key={msg.id} className="transition-colors hover:bg-slate-50/50 group">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{msg.name}</span>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                       <Mail className="h-2.5 w-2.5" /> {msg.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
                     <Building2 className="h-3 w-3 text-slate-400" />
                     {msg.company || "Individual"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3 max-w-xs xl:max-w-md overflow-hidden">
                     <MessageSquare className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                     <p className="text-slate-600 font-medium text-xs line-clamp-2 leading-relaxed">
                       {msg.message}
                     </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-400 text-xs font-medium">
                  <div className="flex items-center gap-2">
                     <Calendar className="h-3 w-3" />
                     {new Date(msg.created_at).toLocaleDateString('en-GB')}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" className="h-8 rounded-lg border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all">
                      Reply
                    </Button>
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredMessages.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium italic">
                  No messages found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      {filteredMessages.length > 0 && (
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm font-medium text-slate-500 bg-slate-50/30">
          <span>Showing 1 to {filteredMessages.length} of {filteredMessages.length} records</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-lg h-8 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="rounded-lg h-8 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50" disabled>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}