"use client";

import { useMemo, useState } from "react";
import { Activity, ClipboardList, Inbox, Search, ShieldCheck, SlidersHorizontal, User, Calendar, MapPin, MoreHorizontal, X, Check, Save } from "lucide-react";

import { updateBookingStatusAction, updateBookingDetailsAction } from "@/lib/actions";
import { bookingStatuses, getStatusLabel, type BookingStatus } from "@/lib/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type AdminBooking = {
  id: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string;
  service_category: string;
  booking_date: string;
  preferred_language: string;
  is_home_visit: boolean;
  uk_postcode: string | null;
  address_details: string | null;
  status: BookingStatus;
  assigned_partner_name: string | null;
  internal_notes: string | null;
  created_at: string;
};

export type AdminEnquiry = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
};

const statusTone: Record<BookingStatus, string> = {
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  partner_assigned: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  confirmed: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  cancelled: "bg-rose-500/10 text-rose-500 border-rose-500/20"
};

const statusDot: Record<BookingStatus, string> = {
  pending: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
  partner_assigned: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]",
  confirmed: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]",
  completed: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
  cancelled: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"
};

export function AdminDashboard({
  bookings,
  enquiries
}: {
  bookings: AdminBooking[];
  enquiries: AdminEnquiry[];
}) {
  const [tab, setTab] = useState<"bookings" | "enquiries">("bookings");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BookingStatus>("all");
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);

  const filteredBookings = useMemo(() => {
    return bookings
      .filter((booking) => statusFilter === "all" || booking.status === statusFilter)
      .filter((booking) => {
        const haystack = `${booking.patient_name} ${booking.patient_email} ${booking.patient_phone} ${booking.service_category}`;
        return haystack.toLowerCase().includes(query.toLowerCase());
      })
      .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
  }, [bookings, query, statusFilter]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-zinc-950 text-zinc-50 font-sans relative overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-[240px] border-r border-zinc-800 bg-zinc-900/50 backdrop-blur-xl flex flex-col h-auto md:h-screen md:sticky md:top-0 z-20">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500 text-zinc-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Activity className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-bold tracking-tight">P2C Growth</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Dispatch Hub</p>
          </div>
        </div>
        
        <div className="p-4 flex-1 space-y-8">
          <nav className="space-y-1">
            <button 
              onClick={() => setTab("bookings")}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                tab === "bookings" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              }`}
            >
              <ClipboardList className="h-4 w-4" />
              Bookings
            </button>
            <button 
              onClick={() => setTab("enquiries")}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                tab === "enquiries" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              }`}
            >
              <Inbox className="h-4 w-4" />
              Enquiries
            </button>
          </nav>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 space-y-3">
            <div className="flex items-center gap-2 text-cyan-500">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">System Status</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Dispatching engine active. No live credentials detected; using secure local simulation.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 lg:p-12 relative z-10 overflow-x-hidden">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-zinc-800">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Admin Cockpit
              <Badge variant="outline" className="text-[10px] bg-zinc-900 text-zinc-400 border-zinc-800 py-0">V1.0</Badge>
            </h1>
            <p className="text-sm text-zinc-400">Manage, dispatch, and track service requests across the platform.</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 min-w-[120px]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Total Requests</p>
              <p className="text-xl font-bold">{bookings.length}</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 min-w-[120px]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500/70 mb-1">Pending</p>
              <p className="text-xl font-bold text-amber-500">{bookings.filter(b => b.status === 'pending').length}</p>
            </div>
          </div>
        </header>

        {tab === "bookings" ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input 
                  type="text"
                  placeholder="Search by name, email, or service..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                />
              </div>
              <div className="relative sm:w-64">
                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm appearance-none outline-none focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  {bookingStatuses.map(s => (
                    <option key={s} value={s}>{getStatusLabel(s)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border border-zinc-800 rounded-xl bg-zinc-900/30 overflow-hidden backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-500 font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Request Detail</th>
                      <th className="px-6 py-4">Fulfillment</th>
                      <th className="px-6 py-4">Schedule</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => setSelectedBooking(booking)}>
                        <td className="px-6 py-4">
                          <p className="font-bold text-zinc-100">{booking.patient_name}</p>
                          <p className="text-zinc-500 mt-0.5">{booking.patient_email}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-zinc-800/50 border-zinc-700 text-zinc-400">
                              {booking.service_category}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {booking.assigned_partner_name ? (
                            <div className="space-y-1">
                              <p className="text-zinc-300 flex items-center gap-1.5">
                                <User className="h-3 w-3 text-cyan-500" />
                                {booking.assigned_partner_name}
                              </p>
                            </div>
                          ) : (
                            <p className="text-zinc-600 italic">No partner assigned</p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-zinc-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                            {new Date(booking.booking_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                            {booking.is_home_visit ? `Home (${booking.uk_postcode})` : 'Clinic'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 border text-[10px] font-bold uppercase tracking-tight ${statusTone[booking.status]}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${statusDot[booking.status]}`} />
                            {getStatusLabel(booking.status)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredBookings.length === 0 && (
                  <div className="p-12 text-center space-y-2">
                    <p className="text-sm font-medium text-zinc-500">No requests found</p>
                    <p className="text-xs text-zinc-600">Try adjusting your filters or search query.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {enquiries.map(enquiry => (
              <div key={enquiry.id} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-white">{enquiry.name}</h3>
                    <p className="text-xs text-cyan-500">{enquiry.email}</p>
                  </div>
                  <Badge variant="outline" className="bg-zinc-800/50 border-zinc-700 text-zinc-500 text-[9px]">
                    {new Date(enquiry.created_at).toLocaleDateString()}
                  </Badge>
                </div>
                {enquiry.company && (
                  <div className="flex items-center gap-2 text-[10px] text-zinc-400 bg-zinc-800/30 w-fit px-2 py-1 rounded-md mb-4 border border-zinc-800">
                    <Activity className="h-3 w-3" />
                    {enquiry.company}
                  </div>
                )}
                <div className="bg-black/20 rounded-lg p-4 text-sm text-zinc-400 leading-relaxed border border-white/5 italic">
                  &quot;{enquiry.message}&quot;
                </div>
              </div>
            ))}
            {enquiries.length === 0 && (
              <div className="col-span-full border border-dashed border-zinc-800 rounded-xl p-20 text-center">
                <p className="text-sm text-zinc-500 font-medium">No business inquiries yet</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Slide-over Detail View */}
      {selectedBooking && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={() => setSelectedBooking(null)} />
          <aside className="fixed right-0 top-0 h-full w-full max-w-lg bg-zinc-900 border-l border-zinc-800 z-50 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Booking Dispatch</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">ID: {selectedBooking.id}</p>
                </div>
                <button onClick={() => setSelectedBooking(null)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form action={async (formData) => {
                await updateBookingDetailsAction(formData);
                setSelectedBooking(null);
              }} className="flex-1 overflow-y-auto p-6 space-y-8">
                <input type="hidden" name="bookingId" value={selectedBooking.id} />
                
                {/* Status Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <Activity className="h-3 w-3" />
                    Execution Status
                  </label>
                  <select 
                    name="status"
                    defaultValue={selectedBooking.status}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2.5 px-4 text-sm outline-none focus:ring-1 focus:ring-cyan-500 transition-all appearance-none cursor-pointer"
                  >
                    {bookingStatuses.map(s => (
                      <option key={s} value={s}>{getStatusLabel(s)}</option>
                    ))}
                  </select>
                </div>

                {/* Partner Assignment */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <User className="h-3 w-3" />
                    Assigned Partner
                  </label>
                  <input 
                    type="text"
                    name="assigned_partner_name"
                    defaultValue={selectedBooking.assigned_partner_name || ""}
                    placeholder="Enter partner or clinic name..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2.5 px-4 text-sm outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                {/* Date Override */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    Reschedule (Date/Time)
                  </label>
                  <input 
                    type="text"
                    name="booking_date"
                    defaultValue={selectedBooking.booking_date}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2.5 px-4 text-sm outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                {/* Internal Notes */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <ClipboardList className="h-3 w-3" />
                    Internal Coordination Notes
                  </label>
                  <textarea 
                    name="internal_notes"
                    rows={6}
                    defaultValue={selectedBooking.internal_notes || ""}
                    placeholder="Log dispatcher actions, partner feedback, or patient updates..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2.5 px-4 text-sm outline-none focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                  />
                </div>

                {/* Read-only Patient Info */}
                <div className="pt-6 border-t border-zinc-800 space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Patient Original Request</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] text-zinc-500">Phone</p>
                      <p className="text-xs font-medium">{selectedBooking.patient_phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-zinc-500">Service Category</p>
                      <p className="text-xs font-medium">{selectedBooking.service_category}</p>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <p className="text-[10px] text-zinc-500">Address / Location</p>
                      <p className="text-xs font-medium">
                        {selectedBooking.is_home_visit 
                          ? `${selectedBooking.address_details}, ${selectedBooking.uk_postcode}` 
                          : 'In-clinic Appointment'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 pt-6 pb-2 bg-zinc-900 flex gap-3">
                  <Button type="submit" className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setSelectedBooking(null)} className="border-zinc-700 hover:bg-zinc-800 text-zinc-300">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
