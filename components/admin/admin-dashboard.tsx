"use client";

import { useMemo, useState } from "react";
import { Activity, ClipboardList, Inbox, Search, ShieldCheck, SlidersHorizontal } from "lucide-react";

import { updateBookingStatus } from "@/lib/actions";
import { bookingStatuses, getStatusLabel, type BookingStatus } from "@/lib/admin";

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
  status: BookingStatus;
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
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  partner_assigned: "bg-ocean/10 text-ocean border-ocean/20",
  confirmed: "bg-cyan-50 text-cyan-700 border-cyan-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200"
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
  const [status, setStatus] = useState<"all" | BookingStatus>("all");

  const filteredBookings = useMemo(() => {
    return bookings
      .filter((booking) => status === "all" || booking.status === status)
      .filter((booking) => {
        const haystack = `${booking.patient_name} ${booking.patient_email} ${booking.patient_phone} ${booking.service_category}`;
        return haystack.toLowerCase().includes(query.toLowerCase());
      })
      .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
  }, [bookings, query, status]);

  return (
    <div className="min-h-screen bg-porcelain text-ink font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-[260px] border-r border-slate-200 bg-white flex flex-col h-auto md:h-screen md:sticky md:top-0">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ocean text-white shadow-sm">
            <Activity className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-extrabold text-ink">P2C Growth</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Internal dispatch</p>
          </div>
        </div>
        <div className="p-4 flex-1">
          <nav className="grid gap-2">
            <button 
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${tab === "bookings" ? "bg-ocean/5 text-ocean" : "text-slate-500 hover:bg-slate-50 hover:text-ink"}`} 
              onClick={() => setTab("bookings")}
            >
              <ClipboardList className="h-4 w-4" aria-hidden />
              Bookings
            </button>
            <button 
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${tab === "enquiries" ? "bg-ocean/5 text-ocean" : "text-slate-500 hover:bg-slate-50 hover:text-ink"}`} 
              onClick={() => setTab("enquiries")}
            >
              <Inbox className="h-4 w-4" aria-hidden />
              Enquiries
            </button>
          </nav>

          <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <ShieldCheck className="h-5 w-5 text-ocean mb-2" aria-hidden />
            <p className="text-xs font-bold text-ink">Credential-aware</p>
            <p className="mt-1 text-[11px] font-medium leading-relaxed text-slate-500">
              Missing Supabase keys show local-safe states until credentials arrive.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-ocean mb-2">Operations cockpit</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink">P2C Admin Dashboard</h1>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm text-center min-w-[100px]">
              <p className="text-2xl font-black text-ink">{bookings.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Bookings</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm text-center min-w-[100px]">
              <p className="text-2xl font-black text-amber-600">{bookings.filter((item) => item.status === "pending").length}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Pending</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm text-center min-w-[100px]">
              <p className="text-2xl font-black text-ink">{enquiries.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Enquiries</p>
            </div>
          </div>
        </header>

        {tab === "bookings" ? (
          <section>
            <div className="mb-6 grid gap-4 md:grid-cols-[1fr_260px]">
              <label className="relative">
                <Search className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-400" aria-hidden />
                <input
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-ink placeholder-slate-400 outline-none transition-all focus:border-ocean focus:ring-4 focus:ring-ocean/10"
                  placeholder="Search bookings..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
              <label className="relative">
                <SlidersHorizontal className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-400" aria-hidden />
                <select
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-ink outline-none transition-all focus:border-ocean focus:ring-4 focus:ring-ocean/10 appearance-none"
                  value={status}
                  onChange={(event) => setStatus(event.target.value as "all" | BookingStatus)}
                >
                  <option value="all">All statuses</option>
                  {bookingStatuses.map((item) => (
                    <option key={item} value={item}>
                      {getStatusLabel(item)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Visit</th>
                    <th className="px-6 py-4">Preferred</th>
                    <th className="px-6 py-4">Status & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-6 py-4">
                        <p className="font-bold text-ink">{booking.patient_name}</p>
                        <p className="text-xs font-medium text-slate-500 mt-1">{booking.patient_email} · {booking.patient_phone}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">{booking.service_category}</td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {booking.is_home_visit ? (
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-ocean">
                            Home ({booking.uk_postcode || "No PC"})
                          </span>
                        ) : "In-clinic"}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">{new Date(booking.booking_date).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}</td>
                      <td className="px-6 py-4">
                        <form action={updateBookingStatus} className="flex items-center gap-3">
                          <input type="hidden" name="bookingId" value={booking.id} />
                          <div className={`px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${statusTone[booking.status]}`}>
                             <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                             {getStatusLabel(booking.status)}
                          </div>
                          <select name="status" defaultValue={booking.status} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 outline-none focus:border-ocean">
                            {bookingStatuses.map((item) => (
                              <option key={item} value={item}>
                                Change to {getStatusLabel(item)}
                              </option>
                            ))}
                          </select>
                          <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-ocean shadow-sm">Update</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-sm font-semibold text-slate-400">
                        No matching bookings found.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="grid gap-4 md:grid-cols-2">
            {enquiries.map((enquiry) => (
              <article key={enquiry.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                     <p className="font-bold text-ink text-base">{enquiry.name}</p>
                     <p className="text-sm font-medium text-ocean">{enquiry.email}</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{new Date(enquiry.created_at).toLocaleDateString()}</span>
                </div>
                {enquiry.company && (
                  <p className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600 mb-4">
                    {enquiry.company}
                  </p>
                )}
                <p className="text-sm leading-relaxed text-slate-600 font-medium whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {enquiry.message}
                </p>
              </article>
            ))}
            {enquiries.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm font-semibold text-slate-400">
                No enquiries yet.
              </div>
            ) : null}
          </section>
        )}
      </main>
    </div>
  );
}