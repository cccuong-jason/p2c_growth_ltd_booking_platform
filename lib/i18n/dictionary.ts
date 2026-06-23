// English home page translation strings
const homeEn = {
  eyebrow: "UK technology and software company",
  title: "Booking infrastructure for high-trust service teams.",
  subtitle:
    "Websites, booking workflows, automation, CRM, and customer-partner platforms for UK service companies.",
  heroTitle: "Software systems for modern UK service companies.",
  heroSubtitle:
    "Technology delivery for clear digital operations.",
  heroLead:
    "Streamlined intake and routing for high-trust teams.",
  primaryCta: "Explore services",
  secondaryCta: "Explore systems",
  socialProof: {
    value: "4-lane",
    label: "booking-to-dispatch workflow",
    body: "Designed for software-led intake, workflow automation, customer management, and partner coordination."
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
      role: "Medical experts workflow"
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
};

// Vietnamese home page translation strings
const homeVi = {
  eyebrow: "Công ty công nghệ và phần mềm tại UK",
  title: "Hạ tầng đặt lịch cho các đội ngũ dịch vụ uy tín cao.",
  subtitle:
    "Website, quy trình đặt lịch, tự động hóa, CRM và nền tảng kết nối đối tác cho các công ty dịch vụ tại UK.",
  heroTitle: "Hệ thống phần mềm cho các doanh nghiệp dịch vụ hiện đại tại UK.",
  heroSubtitle:
    "Giải pháp công nghệ giúp vận hành số hóa rõ ràng.",
  heroLead:
    "Tối ưu hóa quy trình tiếp nhận và phân phối cho các đội ngũ uy tín.",
  primaryCta: "Khám phá dịch vụ",
  secondaryCta: "Khám phá hệ thống",
  socialProof: {
    value: "Quy trình",
    label: "đặt lịch đến điều phối 4 làn",
    body: "Được thiết kế cho việc tiếp nhận bằng phần mềm, tự động hóa quy trình, quản lý khách hàng và điều phối đối tác."
  },
  brandStrip: [
    "Nhận diện thương hiệu",
    "Trang Landing",
    "Công cụ đặt lịch",
    "Email tự động",
    "Bảng điều khiển Admin",
    "Mini CRM"
  ],
  proofChips: [
    "HCPC/CSP sẵn sàng hiển thị uy tín",
    "Hỗ trợ Tiếng Anh / Tiếng Trung / Tiếng Việt",
    "Logic kiểm tra postcode cho Home Visit",
    "Email xác nhận tự động"
  ],
  heroMetrics: [
    { value: "42s", label: "tiếp nhận hướng dẫn" },
    { value: "5", label: "kiểm tra độ tin cậy" },
    { value: "4", label: "làn quy trình" }
  ],
  productMockup: {
    label: "Hệ điều hành P2C Growth",
    title: "Khoang lái điều phối trực tiếp",
    rows: [
      { step: "Đặt lịch", title: "Khả năng vận động người cao tuổi", meta: "Khám tại nhà · SW1A", status: "Mới" },
      { step: "Đồng ý", title: "Đã chấp nhận từ chối trách nhiệm", meta: "Xác nhận liên hệ + trường hợp khẩn cấp", status: "Đạt" },
      { step: "Email", title: "Đã xếp hàng gửi email xác nhận", meta: "Resend-sẵn sàng", status: "Đã gửi" },
      { step: "Admin", title: "Xem xét chỉ định đối tác", meta: "Hiển thị trên Mini CRM", status: "Chờ xử lý" }
    ],
    sideCards: [
      { icon: "languages", title: "Sẵn sàng ngôn ngữ", body: "Tiếng Anh, Tiếng Trung, Tiếng Việt" },
      { icon: "shield", title: "Tuân thủ quy định", body: "Lưu mốc thời gian đồng ý + nội dung UK GDPR" },
      { icon: "map", title: "Điều phối tại nhà", body: "Yêu cầu cung cấp postcode và địa chỉ cụ thể" }
    ]
  },
  orbitLabels: ["Landing", "Đặt lịch", "Đồng ý", "Điều phối", "Email"],
  featureCards: [
    {
      icon: "calendar",
      title: "Hệ thống đặt lịch",
      body: "Thu nhập yêu cầu nhanh chóng với thẻ dịch vụ, logic khám tại nhà, chấp thuận pháp lý và chuyển giao vận hành.",
      span: "wide"
    },
    {
      icon: "workflow",
      title: "Tự động hóa quy trình",
      body: "Email xác nhận và trạng thái theo dõi nội bộ giúp giảm thiểu công việc thủ công.",
      span: ""
    },
    {
      icon: "network",
      title: "Nền tảng đối tác",
      body: "Lớp điều phối được kiểm soát chặt chẽ giữa khách hàng và các chuyên gia đã được xác minh.",
      span: ""
    },
    {
      icon: "shield",
      title: "Tuân thủ pháp lý rõ ràng",
      body: "Giao diện ưu tiên từ chối trách nhiệm, hướng dẫn khẩn cấp, hồ sơ đồng ý và ngôn ngữ bảo mật.",
      span: ""
    },
    {
      icon: "sparkles",
      title: "Giao diện web cao cấp",
      body: "Nhận diện thương hiệu, kiểu chữ chuyên biệt, giao diện uy tín và thiết kế bóng bẩy như SaaS cao cấp.",
      span: "wide"
    }
  ],
  systemSteps: [
    { number: "01", title: "Landing", body: "Hiển thị thông tin uy tín, ngôn ngữ hỗ trợ và phạm vi đặt lịch trước khi bắt đầu." },
    { number: "02", title: "Yêu cầu", body: "Thu thập thông tin liên hệ, loại dịch vụ, thời gian, ngôn ngữ và tùy chọn khám tại nhà." },
    { number: "03", title: "Xác thực", body: "Áp dụng các quy tắc về địa chỉ Home Visit và sự đồng ý để bảo vệ quy trình làm việc." },
    { number: "04", title: "Điều phối", body: "Hàng đợi Admin giúp quá trình theo dõi và phân công công việc luôn hiển thị rõ ràng." }
  ],
  showcasePanels: [
    {
      title: "Tiếp nhận đặt lịch",
      body: "Thẻ dịch vụ, thông tin liên hệ, ngôn ngữ và thời gian mong muốn trong một luồng hướng dẫn.",
      meta: "Phía khách hàng"
    },
    {
      title: "Điều phối khám tại nhà",
      body: "Các trường địa chỉ chỉ xuất hiện khi chọn Home Visit.",
      meta: "Logic có điều kiện"
    },
    {
      title: "Điều phối nội bộ",
      body: "Thông tin đặt lịch, yêu cầu hỗ trợ, trạng thái và ngữ cảnh Mini CRM trong một chế độ xem vận hành.",
      meta: "Quy trình Admin"
    }
  ],
  statsBand: [
    { value: "03-04", label: "tuần bàn giao dự án" },
    { value: "50/50", label: "điều khoản thanh toán linh hoạt" },
    { value: "3 tháng", label: "hỗ trợ bảo trì lỗi sau bàn giao" }
  ],
  testimonials: [
    {
      quote: "Giao diện giống như một sản phẩm thực tế, chứ không chỉ là một biểu mẫu liên hệ được trang trí.",
      name: "Đánh giá vận hành",
      role: "Quy trình kết nối chuyên gia y tế"
    },
    {
      quote: "Thông tin đồng ý, ngôn ngữ và postcode được thu thập đồng thời trước khi theo dõi.",
      name: "Góc nhìn đối tác",
      role: "Sự sẵn sàng cho Home Visit"
    },
    {
      quote: "Luồng tiếp nhận hướng dẫn gia đình đầy đủ thông tin mà không làm yêu cầu trở nên nặng nề.",
      name: "Xem xét trải nghiệm khách hàng",
      role: "Tiếp nhận đa ngôn ngữ"
    }
  ],
  faq: [
    {
      question: "Đây có phải là lịch hẹn đã được xác nhận không?",
      answer: "Không. Giai đoạn 1 chỉ thu thập yêu cầu và giúp đội ngũ điều phối kết nối với đối tác chuyên môn phù hợp."
    },
    {
      question: "Tại sao dịch vụ khám tại nhà (Home Visit) yêu cầu cung cấp postcode và địa chỉ?",
      answer: "Các trường thông tin này chỉ bắt buộc khi chọn khám tại nhà để đội ngũ kiểm tra khu vực hỗ trợ trước khi phản hồi."
    },
    {
      question: "P2C có cung cấp dịch vụ điều trị lâm sàng không?",
      answer: "Không. P2C Growth chỉ cung cấp nền tảng đặt lịch và điều phối; việc chăm sóc lâm sàng do các chuyên gia đủ điều kiện đảm nhận."
    },
    {
      question: "Hệ thống có thể hỗ trợ nhiều ngôn ngữ hơn sau này không?",
      answer: "Có. Tiếng Anh được triển khai trước và cấu trúc nội dung đã sẵn sàng để tích hợp thêm Tiếng Trung và Tiếng Việt."
    }
  ],
  trustSignals: [
    { title: "HCPC / CSP", body: "Giao diện uy tín sẵn sàng hiển thị chứng nhận do khách hàng cung cấp." },
    { title: "UK GDPR", body: "Bảo mật ngôn ngữ và quyền truy cập Admin được bảo vệ là một phần của tiêu chuẩn Giai đoạn 1." },
    { title: "UAT → Go-live", body: "Kế hoạch theo dõi kiểm thử UAT, tinh chỉnh, bàn giao và các bước kiểm tra phụ thuộc thông tin xác thực." }
  ],
  finalCta: {
    eyebrow: "Phase 1 MVP",
    title: "Khởi chạy công cụ tiếp nhận yêu cầu, sau đó kết nối hệ thống backend.",
    body: "Giao diện người dùng đã sẵn sàng để xem xét; thông tin xác thực Supabase và Resend có thể được kết nối khi bạn cung cấp."
  }
};

export const dictionary = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      physiotherapy: "Medical Experts Booking",
      contact: "Contact",
      admin: "Admin"
    },
    layout: {
      footerDesc: "Building websites, booking systems, automation, CRM tools, and customer-partner platforms for UK service companies.",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      footerCta: "Start a medical expert request",
      rights: "ALL RIGHTS RESERVED."
    },
    home: homeEn,
    about: {
      eyebrow: "About P2C Growth",
      title: "Connecting businesses, partners, and customers.",
      subtitle: "P2C Growth LTD is a UK-based technology and software company that designs and builds practical digital systems to help businesses, partners, and customers connect more easily.",
      sectionTitle: "Partner to Customer (P2C) Journey",
      sectionLead: "We don't replace professional service providers. Instead, we develop workflow tools and coordination platforms to make business execution simpler, faster, and more reliable.",
      exploreCta: "Explore services",
      clinicalModel: "Clinical model",
      techOperations: "Tech operations",
      cards: [
        {
          title: "Workflow Automation",
          body: "Booking systems, email automation, status tracking, and mini CRM tools that keep operations moving without manual chasing."
        },
        {
          title: "Partner Connection",
          body: "Dedicated platforms that connect end-customers directly and securely with suitable professional partners and internal teams."
        },
        {
          title: "Focus on Execution",
          body: "Clean data capture, consent stop checks, and structured intake pipelines that minimize administrative work."
        }
      ]
    },
    servicesPage: {
      eyebrow: "Our Services",
      title: "Technology services for service businesses.",
      subtitle: "P2C Growth LTD builds practical digital systems: websites, booking workflows, CRM tools, and partner coordination platforms.",
      primaryCard: {
        tag: "Core Product",
        title: "P2C Health",
        body: "A guided booking and referral workflow for patients, legal cases, insurers, and expert follow-up.",
        cta: "Start booking"
      },
      webDevCard: {
        title: "Website Development",
        body: "Premium conversion-focused websites for UK service businesses.",
        cta: "View details"
      },
      suite: {
        tag: "Operational Suite",
        title: "Integrated Business Systems",
        items: [
          { title: "Booking System & Email Automation", body: "Forms, workflows, confirmations, notifications, and operational handoff." },
          { title: "Mini CRM", body: "Lightweight dashboards for teams managing high-trust customer relationships." },
          { title: "Customer-Partner Platform", body: "A reusable coordination layer between customers, internal teams, and professional partners." }
        ],
        cta: "View details"
      }
    },
    contact: {
      eyebrow: "Contact us",
      title: "Get in touch with our team",
      subtitle: "We have the team and know-how to help you scale your operations 10x faster.",
      formTitle: "Send an enquiry",
      formSubtitle: "Prefer to write? Fill out the form below and we'll get back to you.",
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Clear answers to common questions about our platform, features, and support.",
      faqCtaTitle: "Still have questions?",
      faqCtaSubtitle: "Can't find the answer you're looking for? Please chat to our friendly team.",
      faqDocBtn: "Documentation",
      faqContactBtn: "Get in touch",
      bannerTitle: "We're ready to scale when you are",
      bannerSubtitle: "Join other service businesses already growing with P2C Growth workflows and automations.",
      bannerContactBtn: "Contact Sales",
      bannerDemoBtn: "View demo",
      cards: {
        sales: { title: "Chat to sales", desc: "Speak to our friendly team.", btn: "sales@p2cgrowth.com" },
        support: { title: "Chat to support", desc: "We're here to help.", btn: "support@p2cgrowth.com" },
        visit: { title: "Visit us", desc: "Visit our office HQ.", btn: "View on Google Maps" },
        call: { title: "Call us", desc: "Mon-Fri from 8am to 5pm.", btn: "+44 (0) 20 1234 5678" }
      },
      form: {
        name: "Full Name",
        email: "Work Email",
        company: "Company Name (Optional)",
        help: "How can we help?",
        helpPlaceholder: "Tell us about your current workflow, the problems you are facing, and what you are looking to build.",
        btn: "Send enquiry",
        sending: "Sending..."
      },
      faqs: [
        { question: "Is there a free trial available?", answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running." },
        { question: "Can I change my plan later?", answer: "Of course you can! Our pricing scales with your company. Chat to our friendly team to find a solution that works for you as you grow." },
        { question: "What is your cancellation policy?", answer: "We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid." },
        { question: "Can other info be added to an invoice?", answer: "At the moment, the only way to add additional information to invoices is to add the information to the workspace's name manually." },
        { question: "How does billing work?", answer: "Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces." },
        { question: "How do I change my account email?", answer: "You can change the email address associated with your account by going to account settings from a laptop or desktop." }
      ]
    },
    comingSoon: {
      tag: "Under Construction",
      title: "Coming Soon",
      desc: "We are currently building this service module. Our primary focus right now is the Medical Experts Booking MVP. Check back later for updates on this feature.",
      btn: "Return Home"
    },
    privacy: {
      tag: "Privacy",
      title: "Privacy Policy",
      subtitle: "P2C Growth stores booking and enquiry data only to coordinate requested services and business follow-up.",
      p1: "Health inquiry data may be shared with appropriate professional partners for coordination purposes. P2C Growth does not sell personal data and does not provide medical diagnosis or treatment.",
      p2: "Data access is limited to internal administrators and configured service providers needed to operate the platform, including Supabase and email delivery services."
    },
    terms: {
      tag: "Terms",
      title: "Terms & Conditions",
      subtitle: "P2C Growth is a technology and coordination platform. Bookings are requests, not confirmed appointments or clinical advice.",
      p1: "No online payment is collected in Phase 1. Any clinical service, pricing, appointment confirmation, or treatment plan is handled by the relevant professional partner.",
      p2: "Users must provide accurate contact and visit information. Emergency or urgent medical situations should be directed to 999, NHS 111, or urgent care."
    },
    physiotherapy: {
      hero: {
        eyebrow: "P2C Health",
        title: "Physiotherapy Booking Support for the Asian Community in the UK",
        subtitle: "P2C Growth LTD supports customers in submitting home visit or online physiotherapy booking requests, then connects them with a suitable independent provider if available.",
        primaryCta: "Submit Physio Request",
        secondaryCta: "View Pricing",
        disclaimer: "P2C Growth LTD is not a clinic and does not directly diagnose, treat, or provide clinical medical advice."
      },
      notice: {
        title: "Important Notice",
        body1: "P2C Growth LTD is not a clinic, physiotherapy center, or medical service provider. We do not diagnose illnesses, directly treat, provide clinical medical advice, or offer emergency services.",
        body2: "P2C only acts as an intake, coordination, and connection assistant to match customers with suitable independent physiotherapists or partners if available.",
        body3: "Appointment slots, final prices, service areas, travel distances, and suitability are confirmed prior to official booking.",
        emergency: "This service is not for emergencies. If you have severe symptoms like intense pain, chest tightness, breathing difficulties, sudden weakness, stroke symptoms, or other medical emergencies, please call 999 or contact NHS 111 immediately."
      },
      audience: {
        title: "Who is this service for?",
        subtitle: "P2C supports clients and families seeking the right physiotherapy services in the UK, especially for mobility, language, waiting time, or home visit requirements.",
        items: [
          { title: "Elderly", body: "Suitable for those needing mobility support, balance training, muscle strengthening, movement improvement, or fall prevention." },
          { title: "Post-Surgery Recovery", body: "Suitable for recovery after joint replacement (knee/hip), ACL surgery, spinal surgery, or other orthopedic surgeries." },
          { title: "Stroke & Neurological Support", body: "Suitable for restoring mobility, walking practice, balance improvement, and activities of daily living." },
          { title: "Home Visit", body: "For clients with limited mobility, unable to visit clinics, or desiring home care from local providers." },
          { title: "Asian Community in the UK", body: "For Vietnamese, Chinese, and other Asian communities seeking language support and a simplified intake workflow." },
          { title: "Busy Families", body: "For children seeking care coordination for aging parents or relatives when they lack time to contact multiple providers." }
        ]
      },
      why: {
        title: "Why Do People Need Physio Support?",
        intro: "Many people wait too long before seeking help for pain, muscle weakness, balance loss, or walking difficulties. For the elderly, post-surgery, or stroke patients, early rehabilitation preserves long-term mobility and makes recovery more manageable.",
        problems: [
          "Long NHS waiting lists",
          "Language barriers",
          "Elderly mobility challenges",
          "Busy children unable to drive parents to clinics",
          "Immediate post-op or post-stroke care needed",
          "Enduring pain or self-treating too long",
          "Difficulty finding matching home-visit physios"
        ],
        summary: "P2C simplifies the process by collecting requirements (postcode, language, timing) and coordinating matching with independent providers.",
        quote: "Pain is not a normal part of aging. Early support preserves mobility, confidence, and daily independence."
      },
      services: {
        title: "Physio Coordinated Services",
        subtitle: "Submit your request based on your primary condition. P2C will review the details and match you with a suitable provider.",
        tabs: [
          {
            id: "elderly",
            name: "Elderly Rehab",
            desc: "Support for aging adults to improve mobility, balance, strength, and minimize fall risks.",
            items: ["Mobility support", "Balance problems", "Walking difficulties", "Muscle strengthening", "Fall prevention", "General elderly rehabilitation"]
          },
          {
            id: "stroke",
            name: "Stroke & Neuro",
            desc: "Support for individuals recovering from a stroke or managing neurological conditions to regain functional movement.",
            items: ["Stroke rehab", "Parkinson’s support", "Mobility retraining", "Walking practice", "Balance and coordination", "Daily movement support"]
          },
          {
            id: "surgery",
            name: "Post-Surgery",
            desc: "Rehabilitation support to restore strength, mobility, and confidence after major surgical operations.",
            items: ["Knee replacement", "Hip replacement", "ACL surgery", "Spine surgery", "Post-operative mobility", "Strength and movement recovery"]
          },
          {
            id: "sports",
            name: "Sports & Gym",
            desc: "Treatment coordination for muscle/joint pains, sports injuries, gym injuries, and prevention plans.",
            items: ["Shoulder pain", "Lower back pain", "Runner’s knee", "Gym injuries", "Sports injuries", "Injury prevention"]
          },
          {
            id: "workers",
            name: "Workers Program",
            desc: "Support for occupations prone to back pain, shoulder/neck strain, poor posture, or repetitive stress.",
            items: ["Nail salon workers", "Restaurant workers", "Office workers", "Business owners", "Posture problems", "Back/shoulder/neck pain", "Work-related pain"]
          }
        ]
      },
      steps: {
        title: "Our Simple 4-Step Process",
        items: [
          { number: "01", name: "Submit Request", desc: "Provide details on required care, location, language preference, and availability." },
          { number: "02", name: "Needs Review", desc: "P2C reviews your submission to identify the most appropriate type of physiotherapy support." },
          { number: "03", name: "Coordinate", desc: "P2C coordinates matching you with an independent, qualified physiotherapist." },
          { number: "04", name: "Confirm Appointment", desc: "Schedule, location, travel distance, and final pricing are confirmed before booking." }
        ]
      },
      pricing: {
        title: "Physio Coordination Reference Rates",
        subtitle: "Prices listed are reference guides. The final price varies by area, travel distance, provider availability, and client needs, and is confirmed prior to booking.",
        homeTitle: "Home Visits",
        onlineTitle: "Online Assessment & Training",
        note: "Note: Final pricing depends on location, provider availability, travel distance, and client needs.",
        homeItems: [
          { name: "Initial Assessment", duration: "60 mins", price: "£120" },
          { name: "Follow-up", duration: "45 mins", price: "£90" },
          { name: "Follow-up", duration: "30 mins", price: "£70" }
        ],
        onlineItems: [
          { name: "Online Assessment", duration: "30 mins", price: "£55" },
          { name: "Online Assessment / Training", duration: "60 mins", price: "£95" }
        ]
      },
      faqs: {
        title: "Frequently Asked Questions",
        items: [
          {
            question: "Is P2C Growth LTD a physiotherapy clinic?",
            answer: "No. P2C Growth LTD is not a physiotherapy clinic and does not directly provide physiotherapy, diagnosis, treatment, or clinical medical advice. P2C only assists in intake and coordinating matching with suitable independent physiotherapists or partners if available."
          },
          {
            question: "Can I book a home visit?",
            answer: "Yes. Clients can submit requests for home visits. Fulfillment depends on area coverage, provider schedules, travel distance, and specific needs."
          },
          {
            question: "Who is this service suitable for?",
            answer: "This service is suitable for the elderly, post-surgery recovery, stroke recovery, mobility challenges, back/joint pain, sports injuries, or any client seeking care support at home."
          },
          {
            question: "Can I request Vietnamese or Chinese language support?",
            answer: "Yes. Clients can specify their preferred language during request submission. Language support depends on matching provider availability at the time of booking."
          },
          {
            question: "Are prices fixed?",
            answer: "No. The prices on the website are reference rates. Final rates may vary based on location, travel distance, schedule, and specific needs, and will be confirmed prior to booking."
          },
          {
            question: "Is this service for medical emergencies?",
            answer: "No. This service is not for emergencies. In case of severe or urgent symptoms (e.g., chest pain, breathing difficulties, stroke signs), please call 999 or contact NHS 111 immediately."
          },
          {
            question: "Does P2C decide my treatment plan?",
            answer: "No. P2C does not diagnose or determine treatment. Clinical assessments and care plans are managed solely by qualified matching providers."
          }
        ]
      },
      footer: {
        title: "Need help finding a suitable physiotherapist?",
        desc: "Submit your request details. P2C will review your information and coordinate matching with independent physiotherapists or partners if available.",
        button: "Submit Physio Request",
        disclaimer: "P2C Growth LTD is not a clinic, medical service provider, or emergency service. We do not diagnose, treat, or provide clinical medical advice."
      }
    }
  },

  vi: {
    nav: {
      home: "Trang chủ",
      about: "Giới thiệu",
      services: "Dịch vụ",
      physiotherapy: "Đặt lịch vật lý trị liệu",
      contact: "Liên hệ",
      admin: "Quản trị"
    },
    layout: {
      footerDesc: "Xây dựng website, hệ thống đặt lịch, tự động hóa, công cụ CRM và nền tảng điều phối đối tác cho các doanh nghiệp dịch vụ tại UK.",
      privacy: "Chính sách bảo mật",
      terms: "Điều khoản & Điều kiện",
      footerCta: "Bắt đầu yêu cầu vật lý trị liệu",
      rights: "BẢO LƯU MỌI QUYỀN."
    },
    home: homeVi,
    about: {
      eyebrow: "Về P2C Growth",
      title: "Kết nối doanh nghiệp, đối tác và khách hàng.",
      subtitle: "P2C Growth LTD là một công ty công nghệ và phần mềm có trụ sở tại UK chuyên thiết kế và xây dựng các hệ thống kỹ thuật số thực tế để giúp các doanh nghiệp, đối tác và khách hàng kết nối dễ dàng hơn.",
      sectionTitle: "Hành trình kết nối Đối tác tới Khách hàng (P2C)",
      sectionLead: "Chúng tôi không thay thế các nhà cung cấp dịch vụ chuyên môn. Thay vào đó, chúng tôi phát triển các công cụ quy trình làm việc và nền tảng điều phối để giúp vận hành doanh nghiệp đơn giản hơn, nhanh hơn và đáng tin cậy hơn.",
      exploreCta: "Khám phá dịch vụ",
      clinicalModel: "Mô hình lâm sàng",
      techOperations: "Vận hành công nghệ",
      cards: [
        {
          title: "Tự động hóa quy trình",
          body: "Hệ thống đặt lịch, tự động hóa email, theo dõi trạng thái và các công cụ mini CRM giúp vận hành trôi chảy mà không cần xử lý thủ công."
        },
        {
          title: "Kết nối đối tác",
          body: "Các nền tảng chuyên biệt giúp kết nối trực tiếp và an toàn giữa khách hàng cuối với các đối tác chuyên môn phù hợp và đội ngũ nội bộ."
        },
        {
          title: "Tập trung vận hành",
          body: "Thu nhập dữ liệu sạch, kiểm tra chấp thuận pháp lý và các đường ống tiếp nhận cấu trúc giúp giảm thiểu công việc hành chính."
        }
      ]
    },
    servicesPage: {
      eyebrow: "Dịch vụ của chúng tôi",
      title: "Dịch vụ công nghệ cho các doanh nghiệp dịch vụ.",
      subtitle: "P2C Growth LTD xây dựng các hệ thống kỹ thuật số thực tế: website, quy trình đặt lịch, công cụ CRM và nền tảng điều phối đối tác.",
      primaryCard: {
        tag: "Sản phẩm cốt lõi",
        title: "P2C Health",
        body: "Một quy trình đặt lịch và giới thiệu có hướng dẫn dành cho bệnh nhân, các trường hợp pháp lý, bảo hiểm và theo dõi chuyên gia.",
        cta: "Bắt đầu đặt lịch"
      },
      webDevCard: {
        title: "Thiết kế Website",
        body: "Các trang web cao cấp tập trung vào chuyển đổi cho các doanh nghiệp dịch vụ tại UK.",
        cta: "Xem chi tiết"
      },
      suite: {
        tag: "Bộ giải pháp vận hành",
        title: "Hệ thống kinh doanh tích hợp",
        items: [
          { title: "Hệ thống đặt lịch & Tự động hóa email", body: "Biểu mẫu, quy trình làm việc, xác nhận, thông báo và bàn giao vận hành." },
          { title: "Mini CRM", body: "Bảng điều khiển nhẹ nhàng cho các đội ngũ quản lý mối quan hệ khách hàng uy tín cao." },
          { title: "Nền tảng Khách hàng - Đối tác", body: "Một lớp điều phối có thể tái sử dụng giữa khách hàng, đội ngũ nội bộ và các đối tác chuyên môn." }
        ],
        cta: "Xem chi tiết"
      }
    },
    contact: {
      eyebrow: "Liên hệ với chúng tôi",
      title: "Liên hệ với đội ngũ của chúng tôi",
      subtitle: "Chúng tôi có đội ngũ và bí quyết công nghệ để giúp bạn mở rộng quy trình vận hành nhanh hơn gấp 10 lần.",
      formTitle: "Gửi yêu cầu hỗ trợ",
      formSubtitle: "Bạn muốn gửi tin nhắn? Điền vào biểu mẫu bên dưới và chúng tôi sẽ phản hồi.",
      faqTitle: "Câu hỏi thường gặp",
      faqSubtitle: "Câu trả lời rõ ràng cho các câu hỏi phổ biến về nền tảng, tính năng và hỗ trợ của chúng tôi.",
      faqCtaTitle: "Bạn vẫn còn câu hỏi?",
      faqCtaSubtitle: "Không tìm thấy câu trả lời bạn đang tìm kiếm? Vui lòng trò chuyện với đội ngũ thân thiện của chúng tôi.",
      faqDocBtn: "Tài liệu hướng dẫn",
      faqContactBtn: "Liên hệ ngay",
      bannerTitle: "Chúng tôi sẵn sàng bứt phá cùng bạn",
      bannerSubtitle: "Đồng hành cùng các doanh nghiệp dịch vụ khác đang phát triển với quy trình và tự động hóa từ P2C Growth.",
      bannerContactBtn: "Liên hệ Sales",
      bannerDemoBtn: "Xem demo",
      cards: {
        sales: { title: "Trò chuyện với Sales", desc: "Trao đổi với đội ngũ thân thiện của chúng tôi.", btn: "sales@p2cgrowth.com" },
        support: { title: "Trò chuyện với hỗ trợ", desc: "Chúng tôi ở đây để giúp đỡ bạn.", btn: "support@p2cgrowth.com" },
        visit: { title: "Gặp gỡ chúng tôi", desc: "Ghé thăm văn phòng trụ sở chính.", btn: "Xem trên Google Maps" },
        call: { title: "Gọi cho chúng tôi", desc: "Thứ Hai - Thứ Sáu, từ 8 giờ sáng đến 5 giờ chiều.", btn: "+44 (0) 20 1234 5678" }
      },
      form: {
        name: "Họ và tên",
        email: "Email công việc",
        company: "Tên công ty (Tùy chọn)",
        help: "Chúng tôi có thể giúp gì cho bạn?",
        helpPlaceholder: "Hãy cho chúng tôi biết về quy trình hiện tại của bạn, những khó khăn bạn đang gặp phải, và sản phẩm bạn muốn thiết kế.",
        btn: "Gửi yêu cầu",
        sending: "Đang gửi..."
      },
      faqs: [
        { question: "Có bản dùng thử miễn phí không?", answer: "Có, bạn có thể dùng thử miễn phí trong 30 ngày. Chúng tôi sẽ cung cấp cuộc gọi hỗ trợ 30 phút miễn phí để giúp bạn bắt đầu." },
        { question: "Tôi có thể đổi gói dịch vụ sau này không?", answer: "Dĩ nhiên là được! Bảng giá của chúng tôi mở rộng cùng công ty của bạn. Trò chuyện với đội ngũ để tìm giải pháp phù hợp khi bạn phát triển." },
        { question: "Chính sách hủy dịch vụ là gì?", answer: "Chúng tôi hiểu rằng kế hoạch có thể thay đổi. Bạn có thể hủy gói bất kỳ lúc nào và chúng tôi sẽ hoàn trả phần chênh lệch đã thanh toán." },
        { question: "Có thể thêm thông tin khác vào hóa đơn không?", answer: "Hiện tại, cách duy nhất để thêm thông tin bổ sung vào hóa đơn là thêm thông tin vào tên workspace một cách thủ công." },
        { question: "Cơ chế thanh toán hoạt động như thế nào?", answer: "Các gói dịch vụ được tính theo workspace, không phải theo tài khoản. Bạn có thể nâng cấp một workspace và vẫn có số lượng workspace miễn phí không giới hạn." },
        { question: "Làm cách nào để thay đổi email tài khoản?", answer: "Bạn có thể thay đổi địa chỉ email được liên kết với tài khoản bằng cách đi tới phần cài đặt tài khoản từ máy tính." }
      ]
    },
    comingSoon: {
      tag: "Đang Thiết Kế",
      title: "Sắp Ra Mắt",
      desc: "Chúng tôi đang xây dựng phân hệ dịch vụ này. Trọng tâm chính hiện tại của chúng tôi là sản phẩm thử nghiệm Đặt Lịch Hẹn Với Chuyên Gia Y Tế. Vui lòng quay lại sau để cập nhật thông tin về tính năng này.",
      btn: "Quay lại Trang Chủ"
    },
    privacy: {
      tag: "Bảo mật",
      title: "Chính sách bảo mật",
      subtitle: "P2C Growth lưu trữ dữ liệu đặt lịch và yêu cầu hỗ trợ chỉ nhằm mục đích điều phối các dịch vụ được yêu cầu và theo dõi công việc.",
      p1: "Dữ liệu yêu cầu hỗ trợ sức khỏe có thể được chia sẻ với các đối tác chuyên môn phù hợp cho mục đích điều phối. P2C Growth không bán dữ liệu cá nhân và không trực tiếp chẩn đoán hoặc điều trị y tế.",
      p2: "Quyền truy cập dữ liệu được giới hạn cho các quản trị viên nội bộ và các nhà cung cấp dịch vụ được cấu hình cần thiết để vận hành nền tảng, bao gồm Supabase và dịch vụ gửi email."
    },
    terms: {
      tag: "Điều khoản",
      title: "Điều khoản & Điều kiện",
      subtitle: "P2C Growth là một nền tảng công nghệ và điều phối. Các lượt đặt lịch là yêu cầu, không phải là lịch hẹn đã được xác nhận hoặc tư vấn lâm sàng.",
      p1: "Không thu thập bất kỳ khoản thanh toán trực tuyến nào trong Giai đoạn 1. Mọi dịch vụ lâm sàng, giá cả, xác nhận lịch hẹn hoặc kế hoạch điều trị đều do đối tác chuyên môn có liên quan xử lý.",
      p2: "Người dùng phải cung cấp thông tin liên hệ và địa chỉ khám chính xác. Các tình huống cấp cứu hoặc khẩn cấp y tế nên được chuyển trực tiếp đến số 999, NHS 111 hoặc cơ sở y tế khẩn cấp."
    },
    physiotherapy: {
      hero: {
        eyebrow: "P2C Health",
        title: "Hỗ trợ đặt lịch vật lý trị liệu cho cộng đồng châu Á tại UK",
        subtitle: "P2C Growth LTD hỗ trợ khách hàng gửi yêu cầu đặt lịch vật lý trị liệu tại nhà hoặc tư vấn online, sau đó giúp kết nối với physiotherapist hoặc provider phù hợp nếu có sẵn.",
        primaryCta: "Gửi yêu cầu Physio Booking",
        secondaryCta: "Xem bảng giá",
        disclaimer: "P2C Growth LTD không phải phòng khám và không trực tiếp chẩn đoán, điều trị hoặc đưa ra tư vấn y tế."
      },
      notice: {
        title: "Thông báo quan trọng",
        body1: "P2C Growth LTD không phải là phòng khám, trung tâm vật lý trị liệu hoặc đơn vị cung cấp dịch vụ y tế. Chúng tôi không chẩn đoán bệnh, không trực tiếp điều trị, không đưa ra tư vấn y tế lâm sàng và không cung cấp dịch vụ cấp cứu.",
        body2: "P2C chỉ đóng vai trò là bên tiếp nhận yêu cầu, điều phối và hỗ trợ kết nối khách hàng với physiotherapist hoặc provider độc lập phù hợp nếu có sẵn.",
        body3: "Thông tin về lịch hẹn, giá cuối cùng, khu vực phục vụ, khoảng cách di chuyển và mức độ phù hợp sẽ được xác nhận trước khi booking chính thức.",
        emergency: "Dịch vụ này không dành cho trường hợp cấp cứu. Nếu có triệu chứng nghiêm trọng như đau dữ dội, đau ngực, khó thở, yếu liệt đột ngột, dấu hiệu đột quỵ hoặc tình trạng khẩn cấp khác, vui lòng gọi 999 hoặc liên hệ NHS 111."
      },
      audience: {
        title: "Dịch vụ này phù hợp với ai?",
        subtitle: "P2C hỗ trợ khách hàng và gia đình đang cần tìm dịch vụ physiotherapy phù hợp tại UK, đặc biệt là khi có khó khăn về đi lại, ngôn ngữ, thời gian chờ hoặc cần home visit.",
        items: [
          { title: "Người lớn tuổi", body: "Phù hợp với người cần hỗ trợ đi lại, giữ thăng bằng, tăng sức mạnh cơ thể, cải thiện vận động hoặc giảm nguy cơ té ngã." },
          { title: "Người sau phẫu thuật", body: "Phù hợp với người cần phục hồi sau các phẫu thuật như thay khớp gối, thay khớp háng, phẫu thuật ACL, phẫu thuật cột sống hoặc các phẫu thuật liên quan đến vận động." },
          { title: "Sau đột quỵ & Thần kinh", body: "Phù hợp với người cần hỗ trợ phục hồi vận động, tập đi lại, cải thiện thăng bằng và sinh hoạt hằng ngày." },
          { title: "Cần home visit", body: "Phù hợp với khách hàng khó di chuyển, không tiện đến clinic hoặc muốn được hỗ trợ tại nhà nếu có provider phù hợp trong khu vực." },
          { title: "Cộng đồng châu Á tại UK", body: "Phù hợp với khách hàng muốn có quy trình đặt lịch dễ hiểu hơn, có thể ghi rõ nhu cầu ngôn ngữ và được hỗ trợ điều phối." },
          { title: "Gia đình bận rộn", body: "Phù hợp với con cái muốn tìm hỗ trợ phục hồi cho bố mẹ hoặc người thân lớn tuổi nhưng không có nhiều thời gian tự liên hệ nhiều nơi." }
        ]
      },
      why: {
        title: "Vì sao nhiều người cần hỗ trợ Physio?",
        intro: "Nhiều người thường chờ quá lâu trước khi tìm hỗ trợ cho các vấn đề đau nhức, yếu cơ, mất thăng bằng hoặc đi lại khó khăn. Với người lớn tuổi, người sau phẫu thuật hoặc người sau đột quỵ, phục hồi sớm có thể giúp giảm nguy cơ hạn chế vận động lâu dài và giúp quá trình hồi phục dễ kiểm soát hơn.",
        problems: [
          "Chờ NHS quá lâu",
          "Rào cản ngôn ngữ",
          "Người lớn tuổi khó đi lại",
          "Con cái bận, khó đưa bố mẹ đi khám hoặc đi tập phục hồi",
          "Sau phẫu thuật hoặc sau đột quỵ cần phục hồi sớm",
          "Người châu Á thường chịu đau quá lâu hoặc tự điều trị quá lâu",
          "Khó tìm physiotherapist phù hợp có thể đến tận nhà"
        ],
        summary: "P2C giúp quy trình trở nên đơn giản hơn bằng cách tiếp nhận thông tin nhu cầu, ghi nhận khu vực, ngôn ngữ mong muốn, thời gian phù hợp và hỗ trợ kết nối với physiotherapist hoặc provider phù hợp nếu có sẵn.",
        quote: "Đau không phải là một phần bình thường của tuổi già. Tìm hỗ trợ sớm có thể giúp bảo vệ khả năng vận động, sự tự tin và tính độc lập trong sinh hoạt hằng ngày."
      },
      services: {
        title: "Các dịch vụ Physio hỗ trợ điều phối",
        subtitle: "Khách hàng có thể gửi yêu cầu dựa trên tình trạng chính của mình. P2C sẽ xem xét thông tin và hỗ trợ kết nối với provider phù hợp nếu có sẵn.",
        tabs: [
          {
            id: "elderly",
            name: "Phục hồi người cao tuổi",
            desc: "Hỗ trợ người lớn tuổi cải thiện khả năng đi lại, thăng bằng, sức mạnh cơ thể và giảm nguy cơ té ngã.",
            items: ["Mobility support", "Balance problems", "Walking difficulties", "Strengthening", "Fall prevention", "General elderly rehabilitation"]
          },
          {
            id: "stroke",
            name: "Đột quỵ & Thần kinh",
            desc: "Hỗ trợ người sau đột quỵ hoặc người có vấn đề thần kinh cần cải thiện khả năng vận động, đi lại, thăng bằng và sinh hoạt hằng ngày.",
            items: ["Stroke rehab", "Parkinson’s support", "Mobility retraining", "Walking practice", "Balance and coordination", "Daily movement support"]
          },
          {
            id: "surgery",
            name: "Sau phẫu thuật",
            desc: "Hỗ trợ khách hàng sau phẫu thuật lấy lại sức mạnh, khả năng vận động và sự tự tin khi di chuyển.",
            items: ["Knee replacement", "Hip replacement", "ACL surgery", "Spine surgery", "Post-operative mobility", "Strength and movement recovery"]
          },
          {
            id: "sports",
            name: "Chấn thương thể thao",
            desc: "Hỗ trợ các vấn đề đau nhức, chấn thương thể thao, chấn thương khi tập gym và phòng ngừa tái chấn thương.",
            items: ["Shoulder pain", "Lower back pain", "Runner’s knee", "Gym injuries", "Sports injuries", "Injury prevention"]
          },
          {
            id: "workers",
            name: "Người lao động",
            desc: "Hỗ trợ những người có công việc dễ gây đau lưng, đau vai, sai tư thế, căng cơ hoặc khó chịu kéo dài.",
            items: ["Nail salon workers", "Restaurant workers", "Office workers", "Business owners", "Posture problems", "Back pain", "Shoulder and neck pain", "Work-related pain"]
          }
        ]
      },
      steps: {
        title: "Quy trình hoạt động",
        items: [
          { number: "01", name: "Gửi yêu cầu", desc: "Khách hàng cho biết mình cần hỗ trợ gì, đang ở khu vực nào, ngôn ngữ mong muốn và thời gian phù hợp." },
          { number: "02", name: "P2C xem xét nhu cầu", desc: "P2C xem xét thông tin yêu cầu và xác định loại hỗ trợ physiotherapy có thể phù hợp." },
          { number: "03", name: "Điều phối với provider", desc: "P2C hỗ trợ kết nối khách hàng với physiotherapist hoặc provider phù hợp nếu có sẵn." },
          { number: "04", name: "Xác nhận lịch hẹn", desc: "Thông tin về lịch trống, giá cuối cùng, địa điểm, thời gian và khoảng cách di chuyển sẽ được xác nhận trước khi booking." }
        ]
      },
      pricing: {
        title: "Bảng giá tham khảo dịch vụ Physio",
        subtitle: "Giá dưới đây là giá tham khảo. Giá cuối cùng có thể thay đổi tùy khu vực, khoảng cách di chuyển, lịch trống và nhu cầu cụ thể của khách hàng, được xác nhận trước khi đặt lịch chính thức.",
        homeTitle: "Home Visit (Tại nhà)",
        onlineTitle: "Online Assessment / Training (Trực tuyến)",
        note: "Lưu ý: Giá cuối cùng có thể thay đổi tùy khu vực, khoảng cách di chuyển, lịch trống và nhu cầu cụ thể.",
        homeItems: [
          { name: "Đánh giá lần đầu", duration: "60 phút", price: "£120" },
          { name: "Follow-up", duration: "45 phút", price: "£90" },
          { name: "Follow-up", duration: "30 phút", price: "£70" }
        ],
        onlineItems: [
          { name: "Online assessment", duration: "30 phút", price: "£55" },
          { name: "Online assessment / training", duration: "60 phút", price: "£95" }
        ]
      },
      faqs: {
        title: "Câu hỏi thường gặp",
        items: [
          {
            question: "P2C Growth LTD có phải là phòng khám vật lý trị liệu không?",
            answer: "Không. P2C Growth LTD không phải là phòng khám vật lý trị liệu và không trực tiếp cung cấp physiotherapy, chẩn đoán, điều trị hoặc tư vấn y tế lâm sàng. P2C chỉ hỗ trợ tiếp nhận yêu cầu và điều phối kết nối với physiotherapist hoặc provider độc lập phù hợp nếu có sẵn."
          },
          {
            question: "Tôi có thể đặt lịch home visit không?",
            answer: "Có. Khách hàng có thể gửi yêu cầu home visit. Việc có đặt được hay không phụ thuộc vào khu vực, lịch trống của provider, khoảng cách di chuyển và thời gian hẹn."
          },
          {
            question: "Dịch vụ này phù hợp với ai?",
            answer: "Dịch vụ này có thể phù hợp với người lớn tuổi, người sau phẫu thuật, người sau đột quỵ, người gặp vấn đề về vận động, người bị đau lưng, chấn thương thể thao hoặc khách hàng muốn được hỗ trợ tại nhà."
          },
          {
            question: "Có thể yêu cầu hỗ trợ tiếng Việt hoặc tiếng Trung không?",
            answer: "Khách hàng có thể ghi rõ ngôn ngữ ưu tiên khi gửi yêu cầu. Việc hỗ trợ ngôn ngữ phụ thuộc vào provider có sẵn tại thời điểm booking."
          },
          {
            question: "Giá có cố định không?",
            answer: "Không. Giá trên website là giá tham khảo. Giá cuối cùng có thể thay đổi tùy khu vực, khoảng cách di chuyển, lịch trống, thời gian hẹn và nhu cầu cụ thể của khách hàng. Giá cuối cùng sẽ được xác nhận trước khi booking chính thức."
          },
          {
            question: "Dịch vụ này có dùng cho trường hợp cấp cứu không?",
            answer: "Không. Dịch vụ này không dành cho trường hợp cấp cứu. Nếu có triệu chứng nghiêm trọng hoặc khẩn cấp, vui lòng gọi 999 hoặc liên hệ NHS 111."
          },
          {
            question: "P2C có quyết định tôi cần điều trị gì không?",
            answer: "Không. P2C không chẩn đoán bệnh và không quyết định phương án điều trị. P2C chỉ hỗ trợ thu thập yêu cầu và điều phối với provider phù hợp nếu có sẵn. Việc đánh giá lâm sàng hoặc kế hoạch điều trị sẽ do provider có chuyên môn phụ trách."
          }
        ]
      },
      footer: {
        title: "Bạn cần hỗ trợ tìm physiotherapist phù hợp?",
        desc: "Gửi yêu cầu cho P2C. Chúng tôi sẽ xem xét thông tin và hỗ trợ điều phối với physiotherapist hoặc provider phù hợp nếu có sẵn.",
        button: "Gửi yêu cầu Physio Booking",
        disclaimer: "P2C Growth LTD không phải phòng khám, không phải đơn vị cung cấp dịch vụ y tế và không phải dịch vụ cấp cứu. Chúng tôi không chẩn đoán, không trực tiếp điều trị và không đưa ra tư vấn y tế lâm sàng."
      }
    }
  }
};

export type Locale = keyof typeof dictionary;
export const defaultLocale: Locale = "en";

export function getDictionary(locale: Locale = defaultLocale) {
  return dictionary[locale];
}
