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
  pending: "bg-amber-300",
  partner_assigned: "bg-blue-300",
  confirmed: "bg-cyan-300",
  completed: "bg-emerald-300",
  cancelled: "bg-rose-300"
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(36,107,254,0.22),transparent_28%),radial-gradient(circle_at_84%_4%,rgba(69,221,255,0.18),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-8">
        <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-slate-950/30 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-cyan-300 text-slate-950">
                <Activity className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold">P2C Growth</p>
                <p className="text-xs text-slate-400">Internal dispatch</p>
              </div>
            </div>
            <div className="mt-6 grid gap-2">
              <button className={`admin-tab justify-start ${tab === "bookings" ? "admin-tab-active" : ""}`} onClick={() => setTab("bookings")}>
                <ClipboardList className="h-4 w-4" aria-hidden />
                Bookings
              </button>
              <button className={`admin-tab justify-start ${tab === "enquiries" ? "admin-tab-active" : ""}`} onClick={() => setTab("enquiries")}>
                <Inbox className="h-4 w-4" aria-hidden />
                Enquiries
              </button>
            </div>
            <div className="mt-6 rounded-lg border border-white/10 bg-slate-900/80 p-4">
              <ShieldCheck className="h-5 w-5 text-cyan-200" aria-hidden />
              <p className="mt-3 text-sm font-semibold">Credential-aware</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Missing Supabase keys show local-safe states until credentials arrive.
              </p>
            </div>
          </aside>

          <div>
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Operations cockpit</p>
                <h1 className="mt-3 text-3xl font-semibold">P2C Admin Dashboard</h1>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-xl font-bold">{bookings.length}</p>
                  <p className="text-xs text-slate-400">Bookings</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-xl font-bold">{bookings.filter((item) => item.status === "pending").length}</p>
                  <p className="text-xs text-slate-400">Pending</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-xl font-bold">{enquiries.length}</p>
                  <p className="text-xs text-slate-400">Enquiries</p>
                </div>
              </div>
            </div>

            {tab === "bookings" ? (
              <section className="mt-6">
                <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px]">
                  <label className="relative">
                    <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" aria-hidden />
                    <input
                      className="h-10 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-3 text-sm outline-none ring-cyan-300/30 focus:ring-4"
                      placeholder="Search bookings"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </label>
                  <label className="relative">
                    <SlidersHorizontal className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" aria-hidden />
                    <select
                      className="h-10 w-full rounded-md border border-white/10 bg-slate-900 pl-9 pr-3 text-sm"
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
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-slate-950/20">
                  <table className="w-full min-w-[900px] text-left text-sm">
                    <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-slate-400">
                      <tr>
                        <th className="px-4 py-3">Patient</th>
                        <th className="px-4 py-3">Service</th>
                        <th className="px-4 py-3">Visit</th>
                        <th className="px-4 py-3">Preferred</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="transition hover:bg-white/[0.04]">
                          <td className="px-4 py-4">
                            <p className="font-medium">{booking.patient_name}</p>
                            <p className="text-xs text-slate-400">{booking.patient_email} · {booking.patient_phone}</p>
                          </td>
                          <td className="px-4 py-4">{booking.service_category}</td>
                          <td className="px-4 py-4">{booking.is_home_visit ? `Home ${booking.uk_postcode || ""}` : "In-clinic"}</td>
                          <td className="px-4 py-4">{booking.booking_date}</td>
                          <td className="px-4 py-4">
                            <form action={updateBookingStatus} className="flex items-center gap-2">
                              <input type="hidden" name="bookingId" value={booking.id} />
                              <span className={`h-2.5 w-2.5 rounded-full ${statusTone[booking.status]}`} />
                              <select name="status" defaultValue={booking.status} className="rounded-md border border-white/10 bg-slate-900 px-2 py-1 text-xs">
                                {bookingStatuses.map((item) => (
                                  <option key={item} value={item}>
                                    {getStatusLabel(item)}
                                  </option>
                                ))}
                              </select>
                              <button className="rounded-md bg-cyan-300 px-2 py-1 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200">Save</button>
                            </form>
                          </td>
                        </tr>
                      ))}
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                            No matching bookings.
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : (
              <section className="mt-6 grid gap-3">
                {enquiries.map((enquiry) => (
                  <article key={enquiry.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-slate-950/10">
                    <p className="font-medium">{enquiry.name} · {enquiry.email}</p>
                    <p className="mt-1 text-xs text-slate-400">{enquiry.company || "No company"} · {enquiry.created_at}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-200">{enquiry.message}</p>
                  </article>
                ))}
                {enquiries.length === 0 ? <p className="rounded-xl border border-white/10 p-8 text-center text-slate-400">No enquiries yet.</p> : null}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
