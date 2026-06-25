"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Filter, MoreHorizontal, Mail, Phone, Calendar, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendCustomEmail } from "@/lib/admin-actions";

export function CustomersClient({ initialCustomers }: { initialCustomers: any[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [solutionFilter, setSolutionFilter] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [customers, setCustomers] = useState<any[]>(initialCustomers);

  // Email form state
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailResult, setEmailResult] = useState<{ success: boolean; message: string } | null>(null);

  // Sync state if initialCustomers changes
  useEffect(() => {
    setCustomers(initialCustomers);
  }, [initialCustomers]);

  // Sync selectedCustomer details if customers state is updated (like on delete)
  useEffect(() => {
    if (selectedCustomer) {
      const updated = customers.find((c) => c.email === selectedCustomer.email);
      if (!updated) {
        setSelectedCustomer(null);
      } else {
        setSelectedCustomer(updated);
      }
    }
  }, [customers, selectedCustomer]);

  const filteredCustomers = useMemo(() => {
    return customers
      .filter((c) => statusFilter === "all" || c.status.toLowerCase() === statusFilter.toLowerCase())
      .filter((c) => {
        if (solutionFilter === "all") return true;
        return c.solutions && c.solutions.includes(solutionFilter);
      })
      .filter((c) => {
        const haystack = `${c.name} ${c.email} ${c.phone} ${c.id}`.toLowerCase();
        return haystack.includes(query.toLowerCase());
      });
  }, [customers, query, statusFilter, solutionFilter]);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    setEmailSending(true);
    setEmailResult(null);

    const formData = new FormData();
    formData.append("to", selectedCustomer.email);
    formData.append("subject", emailSubject);
    formData.append("text", emailMessage);

    try {
      const res = await sendCustomEmail(formData);
      if (res.error) {
        setEmailResult({ success: false, message: res.error });
      } else {
        setEmailResult({ success: true, message: "Email sent successfully!" });
        setEmailSubject("");
        setEmailMessage("");
      }
    } catch (err: any) {
      setEmailResult({ success: false, message: err.message || "Failed to send email." });
    } finally {
      setEmailSending(false);
    }
  };

  const handleDeleteCustomer = (email: string) => {
    if (confirm("Are you sure you want to delete this customer? This will remove all their records from the local CRM view.")) {
      setCustomers((prev) => prev.filter((c) => c.email !== email));
      setSelectedCustomer(null);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col relative">
      {/* Toolbar */}
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/30">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search customers by name, email, or phone..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
          />
        </div>
        <div className="flex w-full md:w-auto gap-3 flex-col sm:flex-row">
          <div className="relative w-full sm:w-48">
            <select 
              value={solutionFilter}
              onChange={(e) => setSolutionFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-4 pr-10 py-2.5 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Solutions</option>
              <option value="P2C Health">P2C Health</option>
              <option value="Automation">Automation</option>
              <option value="Website Dev">Website Dev</option>
            </select>
            <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative w-full sm:w-40">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-4 pr-10 py-2.5 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Contact Details</th>
              <th className="px-6 py-4">Solutions</th>
              <th className="px-6 py-4">Total Requests</th>
              <th className="px-6 py-4">Last Active</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCustomers.map((customer) => (
              <tr 
                key={customer.email} 
                onClick={() => {
                  setSelectedCustomer(customer);
                  setEmailResult(null);
                }}
                className="transition-colors hover:bg-slate-50/50 cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{customer.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">ID: {customer.id.slice(0, 8)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 space-y-1">
                  <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
                    <Mail className="h-3.5 w-3.5 text-slate-400" /> {customer.email}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
                    <Phone className="h-3.5 w-3.5 text-slate-400" /> {customer.phone}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5 max-w-[220px]">
                    {customer.solutions && customer.solutions.map((sol: string) => {
                      let colorClass = "bg-blue-50 text-blue-700 border-blue-100";
                      if (sol === "Automation") colorClass = "bg-purple-50 text-purple-700 border-purple-100";
                      if (sol === "Website Dev") colorClass = "bg-emerald-50 text-emerald-700 border-emerald-100";
                      
                      return (
                        <span key={sol} className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${colorClass}`}>
                          {sol}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200">
                    {customer.requests}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    {new Date(customer.lastActive).toLocaleDateString('en-GB')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    customer.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setEmailResult(null);
                    }}
                    className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400 font-medium italic">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      {filteredCustomers.length > 0 && (
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm font-medium text-slate-500 bg-slate-50/30">
          <span>Showing 1 to {filteredCustomers.length} of {filteredCustomers.length} records</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-lg h-8 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="rounded-lg h-8 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50" disabled>Next</Button>
          </div>
        </div>
      )}

      {/* Details Side Panel/Drawer */}
      {selectedCustomer && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setSelectedCustomer(null)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 border-l border-slate-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-blue-600 text-white flex items-center justify-center text-base font-black shadow-lg shadow-blue-200">
                  {selectedCustomer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 leading-tight">{selectedCustomer.name}</h3>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">
                    ID: {selectedCustomer.id}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-xl hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              {/* Profile details card */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Profile Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</span>
                    <a href={`mailto:${selectedCustomer.email}`} className="text-xs font-bold text-blue-600 hover:underline break-all block mt-0.5">
                      {selectedCustomer.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Phone Number</span>
                    <span className="text-xs font-bold text-slate-800 block mt-0.5">
                      {selectedCustomer.phone}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">CRM Status</span>
                    <div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider mt-1 ${
                        selectedCustomer.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {selectedCustomer.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Requests</span>
                    <div>
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 mt-1 rounded-lg bg-white text-slate-700 font-bold text-xs border border-slate-200">
                        {selectedCustomer.requests}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/50">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Associated Solutions</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCustomer.solutions.map((sol: string) => {
                      let colorClass = "bg-blue-50 text-blue-700 border-blue-100";
                      if (sol === "Automation") colorClass = "bg-purple-50 text-purple-700 border-purple-100";
                      if (sol === "Website Dev") colorClass = "bg-emerald-50 text-emerald-700 border-emerald-100";
                      
                      return (
                        <span key={sol} className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${colorClass}`}>
                          {sol}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* History Timeline */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Request & Project History</h4>
                {selectedCustomer.bookings.length === 0 && selectedCustomer.projects.length === 0 ? (
                  <p className="text-xs text-slate-400 italic font-medium">No history found.</p>
                ) : (
                  <div className="relative border-l border-slate-150 pl-5 ml-2.5 space-y-6">
                    {selectedCustomer.bookings.map((booking: any) => (
                      <div key={booking.id} className="relative">
                        <span className="absolute -left-[26px] top-1 flex h-2.5 w-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
                        <div className="space-y-0.5">
                          <div className="flex justify-between items-start gap-4">
                            <span className="text-xs font-bold text-slate-800">
                              Physio Booking: {booking.service_category}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400">
                              {new Date(booking.booking_date).toLocaleDateString('en-GB')}
                            </span>
                          </div>
                          <p className="text-[11px] font-semibold text-slate-500">
                            Status: <span className="capitalize">{booking.status.replace(/_/g, ' ')}</span>
                            {booking.is_home_visit && " • Home Visit"}
                          </p>
                          {booking.address_details && (
                            <p className="text-[10px] text-slate-400 font-medium">
                              {booking.address_details}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}

                    {selectedCustomer.projects.map((project: any) => (
                      <div key={project.id} className="relative">
                        <span className={`absolute -left-[26px] top-1 flex h-2.5 w-2.5 rounded-full ring-4 ring-white ${
                          project.service_type === "automation" ? "bg-purple-600" : "bg-emerald-600"
                        }`} />
                        <div className="space-y-0.5">
                          <div className="flex justify-between items-start gap-4">
                            <span className="text-xs font-bold text-slate-800">
                              {project.service_type === "automation" ? "Automation Project" : "Website Dev Project"}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400">
                              {new Date(project.created_at).toLocaleDateString('en-GB')}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                            Objective: {project.core_objective}
                          </p>
                          <p className="text-[11px] font-semibold text-slate-500">
                            Status: <span className="capitalize">{project.status}</span>
                            {project.estimated_budget && ` • Budget: ${project.estimated_budget}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct email form */}
              <div className="border-t border-slate-100 pt-5">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Send Direct Email
                </h4>
                
                <form onSubmit={handleSendEmail} className="space-y-3">
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Subject</label>
                    <input 
                      type="text" 
                      required
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Project Follow-up / Appointment Schedule"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Message Body</label>
                    <textarea 
                      required
                      rows={3}
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      placeholder="Type your message to the customer..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none"
                    />
                  </div>

                  {emailResult && (
                    <div className={`p-3 rounded-xl border text-[11px] font-bold ${
                      emailResult.success 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}>
                      {emailResult.message}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={emailSending}
                    className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white shadow-lg shadow-blue-200 transition-all py-2"
                  >
                    {emailSending ? "Sending Email..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Actions footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
              <Button 
                variant="outline" 
                onClick={() => setSelectedCustomer(null)}
                className="rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-slate-100"
              >
                Close Details
              </Button>
              
              <Button 
                variant="destructive"
                onClick={() => handleDeleteCustomer(selectedCustomer.email)}
                className="rounded-xl font-bold bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 hover:text-rose-800 shadow-none transition-all flex items-center gap-1.5"
              >
                <Trash2 className="h-4 w-4" /> Delete Customer
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}