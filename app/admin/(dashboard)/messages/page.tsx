import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { type EnquiryRow } from "@/lib/supabase/schema";
import { MessagesClient } from "@/components/admin/messages-client";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const supabase = createSupabaseAdminClient();
  
  const { data: enquiries } = supabase 
    ? await supabase.from("enquiries").select("*").order("created_at", { ascending: false })
    : { data: [] as EnquiryRow[] };

  const records = enquiries || [];

  return (
    <div className="p-6 md:p-10 lg:p-14 space-y-8 bg-slate-50/50 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Inbox & Messages
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            View all contact enquiries from the website.
          </p>
        </div>
      </header>

      <MessagesClient initialMessages={records} />
    </div>
  );
}
