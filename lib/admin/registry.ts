import { LucideIcon, Activity, Stethoscope, Code, Briefcase } from "lucide-react";

export type WorkspaceId = "physio" | "tech" | "consulting";

export interface WorkspaceColumn {
  key: string;
  label: string;
  type: "text" | "badge" | "date" | "boolean" | "contact";
}

export interface WorkspaceStatus {
  value: string;
  label: string;
  color: string; // Tailwind color class or hex
}

export interface Workspace {
  id: WorkspaceId;
  label: string;
  slug: string;
  icon: any; // LucideIcon type issues in some environments, using any for now
  description: string;
  columns: WorkspaceColumn[];
  statuses: WorkspaceStatus[];
  metadataSchema: Record<string, "string" | "boolean" | "number">;
}

export const WORKSPACE_REGISTRY: Record<WorkspaceId, Workspace> = {
  physio: {
    id: "physio",
    label: "Physiotherapy",
    slug: "physio",
    icon: Stethoscope,
    description: "Manage medical coordination and home-visit requests.",
    columns: [
      { key: "patient", label: "Patient", type: "contact" },
      { key: "service_category", label: "Category", type: "badge" },
      { key: "is_home_visit", label: "Visit", type: "boolean" },
      { key: "booking_date", label: "Schedule", type: "date" },
      { key: "status", label: "Status", type: "badge" },
    ],
    statuses: [
      { value: "pending", label: "Pending", color: "amber" },
      { value: "partner_assigned", label: "Assigned", color: "blue" },
      { value: "confirmed", label: "Confirmed", color: "cyan" },
      { value: "completed", label: "Completed", color: "emerald" },
      { value: "cancelled", label: "Cancelled", color: "rose" },
    ],
    metadataSchema: {
      uk_postcode: "string",
      address_details: "string",
      dob: "string",
    },
  },
  tech: {
    id: "tech",
    label: "Tech Services",
    slug: "tech",
    icon: Code,
    description: "Manage software development and automation enquiries.",
    columns: [
      { key: "client", label: "Client", type: "contact" },
      { key: "project_type", label: "Project", type: "badge" },
      { key: "status", label: "Status", type: "badge" },
      { key: "created_at", label: "Received", type: "date" },
    ],
    statuses: [
      { value: "new", label: "New Inquiry", color: "blue" },
      { value: "discovery", label: "Discovery", color: "purple" },
      { value: "proposal", label: "Proposal", color: "cyan" },
      { value: "active", label: "In Development", color: "emerald" },
      { value: "closed", label: "Closed", color: "zinc" },
    ],
    metadataSchema: {
      github_url: "string",
      tech_stack: "string",
      estimated_budget: "number",
    },
  },
  consulting: {
    id: "consulting",
    label: "Consulting",
    slug: "consulting",
    icon: Briefcase,
    description: "Manage business strategy and growth consulting leads.",
    columns: [
      { key: "contact", label: "Contact", type: "contact" },
      { key: "topic", label: "Focus Area", type: "text" },
      { key: "status", label: "Status", type: "badge" },
    ],
    statuses: [
      { value: "lead", label: "Lead", color: "amber" },
      { value: "qualified", label: "Qualified", color: "blue" },
      { value: "onboarding", label: "Onboarding", color: "emerald" },
    ],
    metadataSchema: {
      company_size: "string",
      industry: "string",
    },
  },
};

export function getWorkspaceById(id: string): Workspace | undefined {
  return WORKSPACE_REGISTRY[id as WorkspaceId];
}

export function getAllWorkspaces(): Workspace[] {
  return Object.values(WORKSPACE_REGISTRY);
}
