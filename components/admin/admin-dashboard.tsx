"use client";

import { useMemo, useState } from "react";
import { ClipboardList, Inbox, Search } from "lucide-react";

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
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Internal Dispatch</p>
            <h1 className="mt-3 text-3xl font-semibold">P2C Admin Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <button className={`admin-tab ${tab === "bookings" ? "admin-tab-active" : ""}`} onClick={() => setTab("bookings")}>
              <ClipboardList className="h-4 w-4" aria-hidden />
              Bookings
            </button>
            <button className={`admin-tab ${tab === "enquiries" ? "admin-tab-active" : ""}`} onClick={() => setTab("enquiries")}>
              <Inbox className="h-4 w-4" aria-hidden />
              Enquiries
            </button>
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
              <select
                className="h-10 rounded-md border border-white/10 bg-slate-900 px-3 text-sm"
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
            </div>
            <div className="overflow-hidden rounded-lg border border-white/10">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
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
                    <tr key={booking.id}>
                      <td className="px-4 py-3">
                        <p className="font-medium">{booking.patient_name}</p>
                        <p className="text-xs text-slate-400">{booking.patient_email} · {booking.patient_phone}</p>
                      </td>
                      <td className="px-4 py-3">{booking.service_category}</td>
                      <td className="px-4 py-3">{booking.is_home_visit ? `Home ${booking.uk_postcode || ""}` : "In-clinic"}</td>
                      <td className="px-4 py-3">{booking.booking_date}</td>
                      <td className="px-4 py-3">
                        <form action={updateBookingStatus}>
                          <input type="hidden" name="bookingId" value={booking.id} />
                          <select name="status" defaultValue={booking.status} className="rounded-md border border-white/10 bg-slate-900 px-2 py-1 text-xs">
                            {bookingStatuses.map((item) => (
                              <option key={item} value={item}>
                                {getStatusLabel(item)}
                              </option>
                            ))}
                          </select>
                          <button className="ml-2 rounded-md bg-cyan-300 px-2 py-1 text-xs font-semibold text-slate-950">Save</button>
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
              <article key={enquiry.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="font-medium">{enquiry.name} · {enquiry.email}</p>
                <p className="mt-1 text-xs text-slate-400">{enquiry.company || "No company"} · {enquiry.created_at}</p>
                <p className="mt-3 text-sm text-slate-200">{enquiry.message}</p>
              </article>
            ))}
            {enquiries.length === 0 ? <p className="rounded-lg border border-white/10 p-8 text-center text-slate-400">No enquiries yet.</p> : null}
          </section>
        )}
      </div>
    </div>
  );
}
