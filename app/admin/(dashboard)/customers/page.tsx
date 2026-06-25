import { Button } from "@/components/ui/button";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { CustomersClient } from "@/components/admin/customers-client";

export const dynamic = "force-dynamic";

export default async function CrmPage() {
  const supabase = createSupabaseAdminClient();
  const { data: bookings } = supabase 
    ? await supabase.from("bookings").select("*").order("created_at", { ascending: false })
    : { data: [] };

  const { data: projects } = supabase
    ? await supabase.from("b2b_projects").select("*").order("created_at", { ascending: false })
    : { data: [] };

  // Aggregate bookings and projects into unique customers based on email
  const customerMap = new Map<string, any>();
  
  (bookings || []).forEach((booking) => {
    const email = booking.patient_email?.trim().toLowerCase();
    if (!email) return;
    
    if (!customerMap.has(email)) {
      customerMap.set(email, {
        id: booking.id, // using first booking id as a ref
        name: booking.customer_name || booking.patient_name,
        email: booking.patient_email,
        phone: booking.patient_phone,
        requests: 1,
        lastActive: booking.created_at,
        status: booking.status === "completed" ? "Inactive" : "Active",
        solutions: ["P2C Health"],
        bookings: [booking],
        projects: []
      });
    } else {
      const existing = customerMap.get(email);
      existing.requests += 1;
      if (new Date(booking.created_at) > new Date(existing.lastActive)) {
        existing.lastActive = booking.created_at;
      }
      if (booking.status !== "completed" && booking.status !== "cancelled" && booking.status !== "no_show") {
        existing.status = "Active";
      }
      if (!existing.solutions.includes("P2C Health")) {
        existing.solutions.push("P2C Health");
      }
      existing.bookings.push(booking);
      customerMap.set(email, existing);
    }
  });

  (projects || []).forEach((project) => {
    const email = project.contact_email?.trim().toLowerCase();
    if (!email) return;
    
    const solutionName = project.service_type === "automation" ? "Automation" : "Website Dev";
    const projectStatus = project.status === "completed" || project.status === "cancelled" ? "Inactive" : "Active";

    if (!customerMap.has(email)) {
      customerMap.set(email, {
        id: project.id,
        name: project.client_name,
        email: project.contact_email,
        phone: "-",
        requests: 1,
        lastActive: project.created_at,
        status: projectStatus,
        solutions: [solutionName],
        bookings: [],
        projects: [project]
      });
    } else {
      const existing = customerMap.get(email);
      existing.requests += 1;
      if (new Date(project.created_at) > new Date(existing.lastActive)) {
        existing.lastActive = project.created_at;
      }
      if (projectStatus === "Active") {
        existing.status = "Active";
      }
      if (!existing.solutions.includes(solutionName)) {
        existing.solutions.push(solutionName);
      }
      existing.projects.push(project);
      // Update name or phone if it was empty
      if (existing.phone === "-" && project.contact_email) {
        // keep phone if we find it later, B2B has no phone
      }
      customerMap.set(email, existing);
    }
  });

  const customers = Array.from(customerMap.values());

  return (
    <div className="p-6 md:p-10 lg:p-14 space-y-8 bg-slate-50/50 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Customer Directory
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Centralized directory of all patients, clients, and leads.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700">
            Export Directory
          </Button>
        </div>
      </header>

      <CustomersClient initialCustomers={customers} />
    </div>
  );
}
