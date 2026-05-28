export const dictionary = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      physiotherapy: "Physiotherapy",
      contact: "Contact",
      admin: "Admin"
    },
    home: {
      eyebrow: "Healthcare coordination + SaaS delivery",
      title: "Booking infrastructure for high-trust service teams.",
      subtitle:
        "Modern booking systems and coordination platforms for UK physiotherapy providers serving multilingual communities.",
      heroTitle: "The operating layer for modern healthcare.",
      heroSubtitle:
        "Cinematic booking, consent, and dispatch for elite UK practitioners.",
      heroLead:
        "Streamlined intake and routing for high-trust teams.",
      primaryCta: "Start physio request",
      secondaryCta: "Explore systems",
      socialProof: {
        value: "4-lane",
        label: "booking-to-dispatch workflow",
        body: "Designed for multilingual UK physiotherapy requests, Home Visit routing, consent capture, and internal follow-up."
      },
      brandStrip: [
        "Brand identity",
        "Landing page",
        "Booking engine",
        "Auto email",
        "Admin dashboard",
        "Mini CRM"
      ],
      proofChips: [
        "HCPC/CSP-ready trust display",
        "EN / Chinese / Vietnamese",
        "Home Visit postcode logic",
        "Auto confirmation email"
      ],
      heroMetrics: [
        { value: "42s", label: "guided intake" },
        { value: "5", label: "trust checks" },
        { value: "4", label: "workflow lanes" }
      ],
      productMockup: {
        label: "P2C Growth OS",
        title: "Live request cockpit",
        rows: [
          { step: "Booking", title: "Elderly mobility", meta: "Home Visit · SW1A", status: "New" },
          { step: "Consent", title: "Disclaimer accepted", meta: "Contact + emergency acknowledgement", status: "Passed" },
          { step: "Email", title: "Confirmation queued", meta: "Resend-ready", status: "Sent" },
          { step: "Admin", title: "Assignment review", meta: "Mini CRM visible", status: "Pending" }
        ],
        sideCards: [
          { icon: "languages", title: "Language-ready", body: "English, Chinese, Vietnamese" },
          { icon: "shield", title: "Compliance posture", body: "Consent timestamps + UK GDPR copy" },
          { icon: "map", title: "Home routing", body: "Postcode and address required" }
        ]
      },
      orbitLabels: ["Landing", "Booking", "Consent", "Dispatch", "Email"],
      featureCards: [
        {
          icon: "calendar",
          title: "Booking systems",
          body: "Fast request capture with service cards, visit logic, consent, and operational handoff.",
          span: "wide"
        },
        {
          icon: "workflow",
          title: "Workflow automation",
          body: "Confirmation emails and internal follow-up states reduce manual chasing.",
          span: ""
        },
        {
          icon: "network",
          title: "Partner platforms",
          body: "A controlled coordination layer between customers and verified professionals.",
          span: ""
        },
        {
          icon: "shield",
          title: "Compliance clarity",
          body: "Disclaimer-first UX, emergency guidance, consent records, and privacy language.",
          span: ""
        },
        {
          icon: "sparkles",
          title: "Premium web presence",
          body: "Brand identity, medical typography, trust surfaces, and high-ticket SaaS polish.",
          span: "wide"
        }
      ],
      systemSteps: [
        { number: "01", title: "Landing", body: "Show trust, language support, and booking scope before intake starts." },
        { number: "02", title: "Request", body: "Capture contact, service, timing, language, and visit preference." },
        { number: "03", title: "Validate", body: "Consent and Home Visit address rules protect the workflow." },
        { number: "04", title: "Coordinate", body: "Admin queue keeps follow-up and assignment visible." }
      ],
      showcasePanels: [
        {
          title: "Booking intake",
          body: "Service cards, contact details, language, and preferred time in one guided flow.",
          meta: "Client-facing"
        },
        {
          title: "Home Visit routing",
          body: "Address fields appear only when Home Visit is selected.",
          meta: "Conditional logic"
        },
        {
          title: "Internal dispatch",
          body: "Bookings, enquiries, statuses, and Mini CRM context in one operations view.",
          meta: "Admin workflow"
        }
      ],
      statsBand: [
        { value: "03-04", label: "week delivery plan" },
        { value: "50/50", label: "handover payment terms" },
        { value: "3 mo", label: "post go-live bug maintenance" }
      ],
      testimonials: [
        {
          quote: "It feels like a real product, not a dressed-up contact form.",
          name: "Operations reviewer",
          role: "Physio dispatch workflow"
        },
        {
          quote: "Consent, language, and postcode context arrive together before follow-up.",
          name: "Clinical partner view",
          role: "Home Visit readiness"
        },
        {
          quote: "The flow gives families enough guidance without making the request feel heavy.",
          name: "Customer journey review",
          role: "Multilingual intake"
        }
      ],
      faq: [
        {
          question: "Is this a confirmed appointment?",
          answer: "No. Phase 1 captures a request and lets the team coordinate follow-up with the right professional partner."
        },
        {
          question: "Why do Home Visits ask for postcode and address?",
          answer: "Those fields are required only for Home Visits so the team can check coverage and routing before follow-up."
        },
        {
          question: "Does P2C provide clinical treatment?",
          answer: "No. P2C Growth provides the booking and coordination platform; clinical care is handled by qualified professionals."
        },
        {
          question: "Can this support more languages later?",
          answer: "Yes. English ships first, and the content structure is ready for Chinese Traditional, Chinese Simplified, and Vietnamese."
        }
      ],
      trustSignals: [
        { title: "HCPC / CSP", body: "Trust display prepared for customer-supplied certificate assets." },
        { title: "UK GDPR", body: "Privacy language and protected admin access are part of the Phase 1 baseline." },
        { title: "UAT → Go-live", body: "The plan tracks UAT, refinement, handover, and credential-dependent checks." }
      ],
      finalCta: {
        eyebrow: "Phase 1 MVP",
        title: "Launch the request engine, then connect the live backend.",
        body: "The UI is ready for review now; Supabase and Resend credentials can be connected when you provide them."
      }
    }
  }
};

export type Locale = keyof typeof dictionary;
export const defaultLocale: Locale = "en";

export function getDictionary(locale: Locale = defaultLocale) {
  return dictionary[locale];
}
