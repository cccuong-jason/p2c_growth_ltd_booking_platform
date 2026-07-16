"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Mail, Phone, Calendar, MoreHorizontal, Clock, MapPin, X, Activity, User, ClipboardList, Save, AlertCircle, Eye, CheckCircle2 } from "lucide-react";
import { getStatusLabel, getStatusColor, bookingStatuses } from "@/lib/admin";
import { acceptBookingAction, updateBookingDetailsAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { type BookingRow } from "@/lib/supabase/schema";
import { cn } from "@/lib/utils";
import { ComposeEmailModal } from "@/components/admin/compose-email";

export function PhysioClient({ initialBookings }: { initialBookings: BookingRow[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<BookingRow | null>(null);
  const [emailModalBooking, setEmailModalBooking] = useState<BookingRow | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const filteredBookings = useMemo(() => {
    return initialBookings
      .filter((booking) => statusFilter === "all" || booking.status === statusFilter)
      .filter((booking) => {
        const haystack = `${booking.customer_name} ${booking.patient_name} ${booking.patient_email} ${booking.patient_phone} ${booking.id}`.toLowerCase();
        return haystack.includes(query.toLowerCase());
      });
  }, [initialBookings, query, statusFilter]);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID, patient, or contact..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
          />
        </div>
        <div className="flex w-full sm:w-auto gap-3">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            {bookingStatuses.map(s => (
              <option key={s} value={s}>{getStatusLabel(s)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
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
            {filteredBookings.map((booking) => (
              <tr 
                key={booking.id} 
                className="transition-colors hover:bg-slate-50/50 group cursor-pointer"
                onClick={() => {
                  setActionMessage(null);
                  setSelectedBooking(booking);
                }}
              >
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
                     <span className={cn(
                       "h-2 w-2 rounded-full",
                       booking.priority_level === 'high' || booking.priority_level === 'critical' ? 'bg-rose-500 animate-pulse' : 'bg-blue-400'
                     )} />
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActionMessage(null);
                        setSelectedBooking(booking);
                      }}
                      className="h-8 rounded-lg border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all"
                    >
                      <Eye className="mr-1.5 h-3.5 w-3.5" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setEmailModalBooking(booking);
                      }}
                      className="h-8 rounded-lg border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all"
                    >
                      Send Email
                    </Button>
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center text-slate-400 font-medium italic">
                  No bookings found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ComposeEmailModal 
        email={emailModalBooking?.patient_email || ""} 
        isOpen={!!emailModalBooking} 
        onClose={() => setEmailModalBooking(null)} 
      />

      {/* Slide-over Detail View */}
      {selectedBooking && (
        <>
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => setSelectedBooking(null)} />
          <aside className="fixed right-0 top-0 h-full w-full max-w-lg bg-white border-l border-slate-200 z-50 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Booking Dispatch</h2>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">ID: {selectedBooking.id}</p>
                </div>
                <button onClick={() => { setActionMessage(null); setSelectedBooking(null); }} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form action={async (formData) => {
                await updateBookingDetailsAction(formData);
                setActionMessage(null);
                setSelectedBooking(null);
                router.refresh();
              }} className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
                <input type="hidden" name="bookingId" value={selectedBooking.id} />
                
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Accept booking</p>
                      <p className="mt-1 text-sm font-medium leading-6 text-emerald-950">
                        Mark this request as confirmed and send the customer an acceptance email from medicoexpert@p2cgrowths.co.uk.
                      </p>
                    </div>
                    <Button
                      type="button"
                      disabled={selectedBooking.status === "appointment_confirmed"}
                      onClick={async () => {
                        const formData = new FormData();
                        formData.append("bookingId", selectedBooking.id);
                        const result = await acceptBookingAction(formData);
                        setActionMessage(result.message);
                        router.refresh();
                      }}
                      className="shrink-0 rounded-xl bg-emerald-600 px-4 font-bold text-white shadow-lg shadow-emerald-100 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Accept
                    </Button>
                  </div>
                  {actionMessage && (
                    <p className="mt-3 rounded-xl bg-white/80 px-3 py-2 text-xs font-bold text-emerald-900">
                      {actionMessage}
                    </p>
                  )}
                </div>

                {/* Status Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Activity className="h-3 w-3" />
                    Execution Status
                  </label>
                  <select 
                    name="status"
                    defaultValue={selectedBooking.status}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all appearance-none cursor-pointer"
                  >
                    {bookingStatuses.map(s => (
                      <option key={s} value={s}>{getStatusLabel(s)}</option>
                    ))}
                  </select>
                </div>

                {/* Priority Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <AlertCircle className="h-3 w-3" />
                    Priority Level
                  </label>
                  <select 
                    name="priority_level"
                    defaultValue={selectedBooking.priority_level}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all appearance-none cursor-pointer"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                {/* Partner Assignment */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <User className="h-3 w-3" />
                    Assigned Provider
                  </label>
                  <input 
                    type="text"
                    name="assigned_partner_name"
                    defaultValue={selectedBooking.assigned_partner_name || ""}
                    placeholder="Enter physiotherapist or clinic name..."
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    Provider Selection Reason
                  </label>
                  <textarea 
                    name="provider_reason"
                    rows={2}
                    defaultValue={selectedBooking.provider_reason || ""}
                    placeholder="Why was this provider chosen? (e.g., proximity, specialty)"
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none"
                  />
                </div>

                {/* Date Override */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    Confirmed Schedule (Override)
                  </label>
                  <input 
                    type="text"
                    name="booking_date"
                    defaultValue={selectedBooking.booking_date}
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  />
                </div>

                {/* Notes & Missing Info */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    Missing Information
                  </label>
                  <textarea 
                    name="missing_information"
                    rows={2}
                    defaultValue={selectedBooking.missing_information || ""}
                    placeholder="What details are missing from the customer?"
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <ClipboardList className="h-3 w-3" />
                    Internal Coordination Notes
                  </label>
                  <textarea 
                    name="internal_notes"
                    rows={4}
                    defaultValue={selectedBooking.internal_notes || ""}
                    placeholder="Log dispatcher actions, partner feedback, or patient updates..."
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none"
                  />
                </div>

                {/* Read-only Patient Info */}
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 bg-slate-100 w-fit px-2 py-1 rounded-md">Original Request Details</h4>
                  <div className="grid grid-cols-2 gap-6 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Phone</p>
                      <p className="text-sm font-bold text-slate-900">{selectedBooking.patient_phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Service Category</p>
                      <p className="text-sm font-bold text-slate-900 capitalize">{selectedBooking.service_category.replace('_', ' ')}</p>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Address / Location</p>
                      <p className="text-sm font-bold text-slate-900">
                        {selectedBooking.is_home_visit 
                          ? `${selectedBooking.address_details}, ${selectedBooking.uk_postcode}` 
                          : 'In-clinic Appointment'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 pt-6 pb-2 bg-white flex gap-3 border-t border-slate-100">
                  <Button type="button" variant="outline" onClick={() => { setActionMessage(null); setSelectedBooking(null); }} className="flex-1 rounded-xl font-bold border-slate-200 text-slate-600 hover:bg-slate-50">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
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
