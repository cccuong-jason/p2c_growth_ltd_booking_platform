---
name: skill-architect-drawing
description: Professional VMS architectural diagramming standards. Enforces specific visual language, component breakdown, and professional styling for Draw.io diagrams.
---

# VMS Architect Drawing Visual Standards

This skill defines the rigorous standards required when building or updating architectural diagrams for VMS.

## 1. Output Mandate
Every visualization must result in two files in `docs/diagrams/`:
- **Source**: `.drawio` (XML) for editing.
- **Asset**: `.png` or `.svg` for embedding in README/Confluence. (Exported manually if automation is unavailable).

## 2. Trigger Cases
- **Architecture**: Proposing new services, workflows, or macro-level system interactions.
- **Pipeline**: Event flow visualization, message routing, or data ingestion pipelines.
- **Deep Dives**: Exploring specific microservice boundaries, data sources, and cloud interactions.

## 3. Structural & Layout Rules
- **Horizontal Flow**: Diagrams MUST flow horizontally (left-to-right) rather than stacking vertically. 
- **Breathing Room**: Expand canvas sizes to provide generous spacing between layers and components. Elements should feel comfortable, free, and well-aligned. Avoid cramping and "tangled" line crossings.
- **Boundaries**: Use explicit grouping boxes with distinct outlines (e.g., `AWS Cloud`, `VPC`, `EKS Cluster`, `Stateful & Data Layer`) to denote network and platform boundaries.

## 4. Visual Styling
- **Sharp & Professional**: Do NOT use rounded corners (`rounded=0`). Maintain a strong, professional style.
- **Orthogonal Edges**: All connecting lines MUST use orthogonal routing (`edgeStyle=orthogonalEdgeStyle`). Ensure clear horizontal/vertical paths that do not cross components awkwardly.
- **Specific Icons**: Never use generic shapes for managed services. You MUST use customized, styled isometric icons for:
  - AWS Services (Route 53, CloudFront, KMS, S3, RDS, ElastiCache)
  - Databases (PostgreSQL, Qdrant, Redis, Elasticsearch)
  - Messaging (Kafka/Redpanda)

## 5. Architectural Depth & Accuracy
- **Granular Microservices**: Do not use monolithic generic boxes (e.g., `vms_agents`). Break workloads down into their specific components based on code/infrastructure analysis (e.g., `Agent: OS Affected`, `Agent: AI Summary`, `Vendor Scrapers`, `Cron: DB Backup`).
- **Data Flow Focus**: Reflect the main business value accurately in the component interactions and data flow.
- **Explicit Storage Links**: Do not leave storage entities (like S3 buckets) unlinked. Trace the specific infrastructure (e.g., OS Metadata S3, Raw Data S3) and explicitly link them to their respective producing and consuming services.
- **Simplified Messaging Layers**: Minimize "tangled connections" at the messaging layer. Abstract complexity by routing through a central `Kafka / Central Event Bus` component rather than drawing dense web connections for individual topics, while keeping the overall architectural data flow accurate.

## 6. Execution Flow
1. **Analyze First**: Analyze Terraform/Terragrunt infrastructure (`vms-control-plane`) and application code to discover true boundaries, IAM policies, and specific resources (e.g., specific S3 buckets) before drawing.
2. **Draft**: Create the `.drawio` file programmatically or natively following the styling rules.
3. **Align**: Discuss and verify any architectural assumptions with the user.
