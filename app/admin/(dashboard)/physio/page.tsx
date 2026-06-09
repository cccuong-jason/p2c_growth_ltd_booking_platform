import { Search, Filter, Mail, Phone, Calendar, MoreHorizontal, Clock, MapPin, Languages } from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { getStatusLabel, getStatusColor } from "@/lib/admin";
import { Button } from "@/components/ui/button";
import { type BookingRow } from "@/lib/supabase/schema";
import { cn } from "@/lib/utils";

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
        <div className="flex gap-3">
          <Button className="rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700">
            Export requests
          </Button>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID, patient, or contact..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>
          <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-700 hover:bg-slate-50">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Customer / Patient</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Service Type</th>
                <th className="px-6 py-4">Schedule</th>
                <th className="px-6 py-4">Area</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((booking) => (
                <tr key={booking.id} className="transition-colors hover:bg-slate-50/50 group">
                  <td className="px-6 py-4 font-bold text-slate-500 text-xs">
                    #{booking.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{booking.customer_name || booking.patient_name}</span>
                      {booking.customer_name && booking.customer_name !== booking.patient_name && (
                        <span className="text-[10px] text-slate-500 font-medium italic">For: {booking.patient_name} ({booking.relationship_to_patient})</span>
                      )}
                      {!booking.customer_name && (
                        <span className="text-[10px] text-slate-500 font-medium italic">Self-booking</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 space-y-1">
                    <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
                      <Mail className="h-3 w-3 text-slate-400" /> {booking.patient_email}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
                      <Phone className="h-3 w-3 text-slate-400" /> {booking.patient_phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <span className="h-2 w-2 rounded-full bg-blue-400" />
                       <span className="font-bold text-slate-700 text-xs uppercase tracking-tight">{booking.service_category.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                        <Calendar className="h-3 w-3 text-blue-500" />
                        {new Date(booking.booking_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 font-medium text-[11px]">
                        <Clock className="h-3 w-3" />
                        {new Date(booking.booking_date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
                       <MapPin className="h-3 w-3 text-slate-400" />
                       {booking.uk_postcode || "Clinic"}
                       {booking.is_home_visit && <span className="ml-1 text-[9px] bg-blue-50 text-blue-600 px-1 rounded font-black uppercase">Home</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      getStatusColor(booking.status)
                    )}>
                      {getStatusLabel(booking.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs font-medium">
                    {new Date(booking.created_at).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 rounded-lg border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all">
                        Send Email
                      </Button>
                      <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-slate-400 font-medium italic">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
