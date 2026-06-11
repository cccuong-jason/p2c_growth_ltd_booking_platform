"use client";

import { useState, useMemo } from "react";
import { Search, Filter, MoreHorizontal, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CustomersClient({ initialCustomers }: { initialCustomers: any[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredCustomers = useMemo(() => {
    return initialCustomers
      .filter((c) => statusFilter === "all" || c.status.toLowerCase() === statusFilter.toLowerCase())
      .filter((c) => {
        const haystack = `${c.name} ${c.email} ${c.phone} ${c.id}`.toLowerCase();
        return haystack.includes(query.toLowerCase());
      });
  }, [initialCustomers, query, statusFilter]);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/30">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search customers by name, email, or phone..." 
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Contact Details</th>
              <th className="px-6 py-4">Total Requests</th>
              <th className="px-6 py-4">Last Active</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="transition-colors hover:bg-slate-50/50">
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
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium italic">
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
    </div>
  );
}