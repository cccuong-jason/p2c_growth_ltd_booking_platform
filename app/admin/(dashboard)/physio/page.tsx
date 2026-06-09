import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { type BookingRow } from "@/lib/supabase/schema";
import { PhysioClient } from "@/components/admin/physio-client";

export const dynamic = "force-dynamic";

export default async function PhysioDashboard() {
  const supabase = createSupabaseAdminClient();
  
  const { data: bookings } = supabase 
    ? await supabase.from("bookings").select("*").order("created_at", { ascending: false })
    : { data: [] as BookingRow[] };

  const records = bookings || [];

  return (
    <div className="p-6 md:p-10 lg:p-14 space-y-8 bg-slate-50/50 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Physio Booking Management
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Track and coordinate all health and physiotherapy requests.
          </p>
        </div>
      </header>

      <PhysioClient initialBookings={records} />
    </div>
  );
}
