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
  },
  extras: {
    whatWeBuild: "What We Build",
    webDevTitle: "A sharper digital front door for your business.",
    webDevBody: "Clear service pages, enquiry capture, and conversion-focused journeys built for service businesses.",
    webDevBtn: "View website builds",
    workflowHubTitle: "Booking Workflow Hub",
    workflowHubBody: "Manage intake, routing, confirmation, and internal handoff in one simple flow.",
    sharePartnersTitle: "Share with partners",
    sharePartnersBody: "Send structured updates and handoff links to partner teams and reviewers.",
    instantUpdatesTitle: "Instant updates",
    instantUpdatesBody: "Notify customers and internal owners when a workflow changes.",
    integrationsEyebrow: "Integrations",
    integrationsTitle: "Works with tools you already use.",
    integrationsBody: "Connect your website and workflow to the platforms your team already uses.",
    integrationsBtn: "See integrations",
    deliveryProcess: "Delivery Process",
    iphone: {
      projectFlow: "Project flow",
      activeStep: "Active step",
      processSteps: "Process steps",
      currentStep: "Current step",
      reviewLaunchPath: "Review launch path",
      live: "Live",
      selected: "Selected",
      auto: "Auto"
    },
    companyPurpose: "Company Purpose",
    operatingLoop: "Operating loop",
    serviceStack: "Service stack",
    coreWorkflow: "Core workflow",
    public: "Public",
    enquiry: "Enquiry",
    internal: "Internal",
    action: "Action",
    operatingSteps: ["Capture", "Qualify", "Route", "Update"],
    purposeEyebrow: "Practical digital infrastructure",
    purposeTitle: "Build the tools your service business actually needs.",
    purposeBody: "P2C Growth focuses on the practical systems behind a UK service business: a clear website, a reliable enquiry path, useful automation, visible customer records, and partner handoff where needed.",
    purposeList: [
      "Centralise enquiries that would otherwise arrive through calls, email, forms, and messaging.",
      "Give teams a simple status view so every request has an owner and next step.",
      "Automate useful customer and internal updates without hiding the human service experience.",
      "Prepare the platform for future CRM and partner-routing workflows without overbuilding early."
    ],
    whyTeamsChoose: "Why teams choose P2C Growth",
    whyCards: [
      {
        title: "One clear digital front door",
        body: "Bring service pages, enquiry capture, booking requests, and contact routes into a website customers can understand quickly."
      },
      {
        title: "Workflow before software",
        body: "Start with how the team actually works, then build screens and automation around the real operating path."
      },
      {
        title: "Simple systems teams can run",
        body: "Keep customer records, ownership, status, and partner context visible without forcing a heavy enterprise tool too early."
      }
    ],
    ctaEyebrow: "Start the conversation",
    ctaTitle: "Ready to improve your digital workflow?",
    ctaBody: "Talk to P2C Growth about your website, booking workflow, automation, CRM system, or customer-partner platform.",
    ctaBtn: "Contact P2C Growth",
    widgets: {
      websiteEnquiry: "Website enquiry",
      requestCaptured: "Request captured",
      source: "Source",
      websiteForm: "Website form",
      nextStep: "Next step",
      discoveryCall: "Discovery call",
      service: "Service",
      bookingWorkflow: "Booking workflow",
      internalView: "Internal view",
      workflowBoard: "Workflow board",
      active: "Active",
      newEnquiry: "New enquiry",
      ownerAssigned: "Owner assigned",
      customerUpdated: "Customer updated",
      completed: "Completed",
      serviceWorkflow: "Service workflow"
    },
    faqDescription: "Clear answers to common questions about our platform, features, and support."
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
  },
  extras: {
    whatWeBuild: "Chúng tôi xây dựng những gì",
    webDevTitle: "Cửa ngõ kỹ thuật số sắc nét hơn cho doanh nghiệp của bạn.",
    webDevBody: "Các trang dịch vụ rõ ràng, thu thập yêu cầu và hành trình tập trung vào chuyển đổi được xây dựng cho các doanh nghiệp dịch vụ.",
    webDevBtn: "Xem các trang web đã xây dựng",
    workflowHubTitle: "Trung tâm quy trình đặt lịch",
    workflowHubBody: "Quản lý việc tiếp nhận, định tuyến, xác nhận và bàn giao nội bộ trong một luồng đơn giản.",
    sharePartnersTitle: "Chia sẻ với đối tác",
    sharePartnersBody: "Gửi các cập nhật có cấu trúc và liên kết bàn giao cho các đội ngũ đối tác và người đánh giá.",
    instantUpdatesTitle: "Cập nhật tức thì",
    instantUpdatesBody: "Thông báo cho khách hàng và người sở hữu nội bộ khi quy trình thay đổi.",
    integrationsEyebrow: "Tích hợp",
    integrationsTitle: "Hoạt động với các công cụ bạn đã sử dụng.",
    integrationsBody: "Kết nối trang web và quy trình làm việc của bạn với các nền tảng mà đội ngũ của bạn đã sử dụng.",
    integrationsBtn: "Xem các tích hợp",
    deliveryProcess: "Quy trình bàn giao",
    iphone: {
      projectFlow: "Quy trình dự án",
      activeStep: "Bước hoạt động",
      processSteps: "Các bước quy trình",
      currentStep: "Bước hiện tại",
      reviewLaunchPath: "Xem lộ trình ra mắt",
      live: "Trực tiếp",
      selected: "Đã chọn",
      auto: "Tự động"
    },
    companyPurpose: "Mục tiêu công ty",
    operatingLoop: "Vòng lặp vận hành",
    serviceStack: "Ngăn xếp dịch vụ",
    coreWorkflow: "Quy trình cốt lõi",
    public: "Công khai",
    enquiry: "Yêu cầu hỗ trợ",
    internal: "Nội bộ",
    action: "Hành động",
    operatingSteps: ["Tiếp nhận", "Đánh giá", "Định tuyến", "Cập nhật"],
    purposeEyebrow: "Hạ tầng kỹ thuật số thực tế",
    purposeTitle: "Xây dựng các công cụ doanh nghiệp dịch vụ thực sự cần.",
    purposeBody: "P2C Growth tập trung vào các hệ thống thực tế phía sau doanh nghiệp dịch vụ tại UK: website rõ ràng, luồng yêu cầu đáng tin cậy, tự động hóa hữu ích, hồ sơ khách hàng hiển thị rõ ràng và bàn giao đối tác khi cần.",
    purposeList: [
      "Trung tâm hóa các yêu cầu hỗ trợ mà thông thường sẽ đến qua cuộc gọi, email, biểu mẫu và tin nhắn.",
      "Cung cấp chế độ xem trạng thái đơn giản cho các nhóm để mọi yêu cầu đều có người phụ trách và bước tiếp theo.",
      "Tự động hóa các cập nhật nội bộ và khách hàng hữu ích mà không làm mất đi trải nghiệm dịch vụ của con người.",
      "Chuẩn bị nền tảng cho quy trình CRM và định tuyến đối tác trong tương lai mà không cần thiết kế quá mức từ sớm."
    ],
    whyTeamsChoose: "Tại sao các đội ngũ chọn P2C Growth",
    whyCards: [
      {
        title: "Một cửa ngõ kỹ thuật số rõ ràng",
        body: "Đưa các trang dịch vụ, biểu mẫu tiếp nhận yêu cầu, đặt lịch và các kênh liên hệ vào một website mà khách hàng có thể hiểu nhanh chóng."
      },
      {
        title: "Quy trình trước khi làm phần mềm",
        body: "Bắt đầu với cách thức hoạt động thực tế của đội ngũ, sau đó xây dựng giao diện và tự động hóa xung quanh luồng vận hành thực tế."
      },
      {
        title: "Hệ thống đơn giản dễ vận hành",
        body: "Giữ thông tin khách hàng, quyền sở hữu, trạng thái và ngữ cảnh đối tác hiển thị rõ ràng mà không bắt buộc dùng các công cụ doanh nghiệp nặng nề quá sớm."
      }
    ],
    ctaEyebrow: "Bắt đầu cuộc trò chuyện",
    ctaTitle: "Sẵn sàng cải thiện quy trình làm việc kỹ thuật số của bạn?",
    ctaBody: "Trò chuyện với P2C Growth về trang web, quy trình đặt lịch, tự động hóa, hệ thống CRM hoặc nền tảng đối tác của bạn.",
    ctaBtn: "Liên hệ P2C Growth",
    widgets: {
      websiteEnquiry: "Yêu cầu từ Website",
      requestCaptured: "Yêu cầu đã ghi nhận",
      source: "Nguồn",
      websiteForm: "Biểu mẫu Website",
      nextStep: "Bước tiếp theo",
      discoveryCall: "Cuộc gọi tìm hiểu",
      service: "Dịch vụ",
      bookingWorkflow: "Quy trình đặt lịch",
      internalView: "Chế độ xem nội bộ",
      workflowBoard: "Bảng quy trình",
      active: "Hoạt động",
      newEnquiry: "Yêu cầu mới",
      ownerAssigned: "Đã phân công",
      customerUpdated: "Đã cập nhật khách hàng",
      completed: "Hoàn thành",
      serviceWorkflow: "Quy trình dịch vụ"
    },
    faqDescription: "Câu trả lời rõ ràng cho các câu hỏi phổ biến về nền tảng, tính năng và hỗ trợ của chúng tôi."
  }
};

// Hong Kong home page translation strings (Traditional Chinese)
const homeHk = {
  eyebrow: "英國技術與軟件公司",
  title: "為高信任度服務團隊提供預約基礎設施。",
  subtitle:
    "為英國服務型公司提供網站建設、預約工作流、自動化流程、CRM工具及客戶與合作夥伴協調平台。",
  heroTitle: "為現代英國服務型公司提供軟件系統。",
  heroSubtitle:
    "提供清晰數字化運營的技術交付。",
  heroLead:
    "為高信任度團隊提供優化的接收與路由流程。",
  primaryCta: "探索服務",
  secondaryCta: "探索系統",
  socialProof: {
    value: "4通道",
    label: "預約至分派工作流",
    body: "專為軟件導向的接收、流程自動化、客戶管理和合作夥伴協調而設計。"
  },
  brandStrip: [
    "品牌識別",
    "登陸頁面",
    "預約引擎",
    "自動電子郵件",
    "管理面版",
    "微型 CRM"
  ],
  proofChips: [
    "HCPC/CSP 就緒信譽顯示",
    "英文 / 中文 / 越南文",
    "上門服務郵編路由邏輯",
    "自動確認電子郵件"
  ],
  heroMetrics: [
    { value: "42秒", label: "引導式接收" },
    { value: "5項", label: "信譽檢查" },
    { value: "4個", label: "流程通道" }
  ],
  productMockup: {
    label: "P2C Growth 系統",
    title: "實時請求控制台",
    rows: [
      { step: "預約", title: "長者活動能力", meta: "上門服務 · SW1A", status: "新增" },
      { step: "同意", title: "免責聲明已接受", meta: "聯絡 + 緊急確認", status: "通過" },
      { step: "郵件", title: "確認郵件已排隊", meta: "已對接 Resend", status: "已發送" },
      { step: "管理", title: "指派審核", meta: "微型 CRM 可見", status: "待處理" }
    ],
    sideCards: [
      { icon: "languages", title: "多語言就緒", body: "英文、中文、越南文" },
      { icon: "shield", title: "合規狀態", body: "同意時間戳 + 英國 GDPR 文本" },
      { icon: "map", title: "上門路由", body: "需要郵編與詳細地址" }
    ]
  },
  orbitLabels: ["登陸頁", "預約", "同意書", "分派", "郵件"],
  featureCards: [
    {
      icon: "calendar",
      title: "預約系統",
      body: "利用服務卡、拜訪邏輯、同意書和運營對接快速捕獲請求。",
      span: "wide"
    },
    {
      icon: "workflow",
      title: "工作流自動化",
      body: "確認郵件和內部跟進狀態可減少人工催促。",
      span: ""
    },
    {
      icon: "network",
      title: "合作夥伴平台",
      body: "客戶與經過驗證的專業人員之間的受控協調層。",
      span: ""
    },
    {
      icon: "shield",
      title: "合規透明度",
      body: "免責聲明優先、緊急指引、同意記錄和隱私語言。",
      span: ""
    },
    {
      icon: "sparkles",
      title: "高端網站展示",
      body: "品牌識別、醫學排版、信任頁面和高端 SaaS 質感。",
      span: "wide"
    }
  ],
  systemSteps: [
    { number: "01", title: "登陸頁", body: "在啟動接收流程前，展示信譽、語言支持和預約範圍。" },
    { number: "02", title: "請求", body: "捕獲聯絡方式、服務類型、時間、語言和拜訪偏好。" },
    { number: "03", title: "驗證", body: "同意書和上門服務郵編規則以保護工作流程。" },
    { number: "04", title: "協調", body: "管理隊列保持跟進與指派清晰可見。" }
  ],
  showcasePanels: [
    {
      title: "預約接收",
      body: "服務卡、聯絡詳情、語言和首選時間，全在一個引導流中。",
      meta: "面向客戶"
    },
    {
      title: "上門拜訪路由",
      body: "僅在選擇上門服務時才顯示地址欄位。",
      meta: "條件邏輯"
    },
    {
      title: "內部指派",
      body: "預約、諮詢、狀態 and 微型 CRM 上下文，全在一個運營視圖中。",
      meta: "管理工作流"
    }
  ],
  statsBand: [
    { value: "03-04", label: "周交付計劃" },
    { value: "50/50", label: "階段性付款條件" },
    { value: "3個月", label: "上線後系統維護" }
  ],
  testimonials: [
    {
      quote: "這感覺像是一個真實的產品，而不是簡單的聯絡表單。",
      name: "運營評審員",
      role: "醫療專家工作流"
    },
    {
      quote: "同意書、語言和郵編上下文在跟進前會一同送達。",
      name: "臨床合作夥伴",
      role: "上門拜訪準備"
    },
    {
      quote: "該流程為家庭提供了足夠的引導，而不會顯得繁重。",
      name: "客戶旅程評審員",
      role: "多語言接收"
    }
  ],
  faq: [
    {
      question: "這是已確認的預約嗎？",
      answer: "不是。第一階段僅捕獲請求，以便團隊協調合適的專業合作夥伴進行後續跟進。"
    },
    {
      question: "為什麼上門服務需要填寫郵編和地址？",
      answer: "這些欄位僅在上門服務時需要，以便團隊在跟進前檢查服務覆蓋範圍和路線。"
    },
    {
      question: "P2C 提供臨床治療嗎？",
      answer: "不提供。P2C Growth 提供預約和協調平台；臨床護理由符合資格의專業人員處理。"
    },
    {
      question: "此系統以後可以支持更多語言嗎？",
      answer: "可以。英文版本首先發布，內容結構已準備好集成繁體中文、簡體中文和越南文。"
    }
  ],
  trustSignals: [
    { title: "HCPC / CSP", body: "信譽顯示區已為客戶提供的證書資產做好準備。" },
    { title: "UK GDPR", body: "隱私語言與受保護的管理員權限是第一階段基準的一部分。" },
    { title: "UAT → Go-live", body: "計劃包括 UAT 測試、精細調整、交付以及依賴憑證的檢查。" }
  ],
  finalCta: {
    eyebrow: "Phase 1 MVP",
    title: "啟動請求引擎，隨後連接實時後端。",
    body: "用戶界面現已準備好供審查；當您提供時，即可連接 Supabase 和 Resend 憑證。"
  },
  extras: {
    whatWeBuild: "我們開發的系統",
    webDevTitle: "為您的企業提供更清晰的數字化門戶。",
    webDevBody: "專為服務型企業構建的清晰服務頁面、諮詢捕獲和以轉化為中心的旅程。",
    webDevBtn: "查看網站建設案例",
    workflowHubTitle: "預約工作流中心",
    workflowHubBody: "在一個簡單的流程中管理接收、路由、確認和內部交接。",
    sharePartnersTitle: "與合作夥伴分享",
    sharePartnersBody: "向合作夥伴團隊和評審員發送結構化更新和交接鏈接。",
    instantUpdatesTitle: "即時更新",
    instantUpdatesBody: "當工作流更改時通知客戶和內部負責人。",
    integrationsEyebrow: "系統整合",
    integrationsTitle: "與您已使用的工具無縫協作。",
    integrationsBody: "將您的網站 and 工作流連接到您團隊已使用的平台。",
    integrationsBtn: "查看集成項目",
    deliveryProcess: "交付流程",
    iphone: {
      projectFlow: "項目流程",
      activeStep: "當前步驟",
      processSteps: "流程步驟",
      currentStep: "當前步驟",
      reviewLaunchPath: "查看上線路徑",
      live: "實時",
      selected: "已選擇",
      auto: "自動"
    },
    companyPurpose: "公司宗旨",
    operatingLoop: "運營閉環",
    serviceStack: "服務堆棧",
    coreWorkflow: "核心工作流",
    public: "公開",
    enquiry: "客戶諮詢",
    internal: "內部",
    action: "執行操作",
    operatingSteps: ["捕獲", "評估", "路由", "更新"],
    purposeEyebrow: "實用的數字化基礎設施",
    purposeTitle: "構建您服務業務真正需要的工具。",
    purposeBody: "P2C Growth 專注於英國服務型企業背後的實用系統：清晰的網站、可靠的諮詢路徑、實用的自動化、可見的客戶記錄以及必要時的合作夥伴交接。",
    purposeList: [
      "集中管理原本通過電話、電子郵件、表單和即時通訊發送的諮詢。",
      "為團隊提供簡單的狀態視圖，使每個請求都有負責人和下一步行動。",
      "自動化實用的客戶和內部更新，同時保留人性化的服務體驗。",
      "為未來的 CRM 和合作夥伴路由工作流做好準備，避免早期過度開發。"
    ],
    whyTeamsChoose: "為什麼團隊選擇 P2C Growth",
    whyCards: [
      {
        title: "一個清晰的數字門戶",
        body: "將服務頁面、諮詢捕獲、預約申請和聯絡管道整合到客戶能快速理解的網站中。"
      },
      {
        title: "工作流先於軟件開發",
        body: "從團隊的實際工作方式開始，然後圍繞真實的運營路徑構建界面和自動化。"
      },
      {
        title: "團隊能輕鬆運行的簡單系統",
        body: "保持客戶記錄、所有權、狀態和合作夥伴上下文可見，避免過早引入繁重的企業級工具。"
      }
    ],
    ctaEyebrow: "開始對話",
    ctaTitle: "準備好改進您的數字工作流了嗎？",
    ctaBody: "與 P2C Growth 探討您的網站、預約工作流、自動化、CRM 系統或客戶與合作夥伴平台。",
    ctaBtn: "聯絡 P2C Growth",
    widgets: {
      websiteEnquiry: "網站諮詢",
      requestCaptured: "請求已捕獲",
      source: "來源",
      websiteForm: "網站表單",
      nextStep: "下一步",
      discoveryCall: "電話諮詢",
      service: "服務項目",
      bookingWorkflow: "預約工作流",
      internalView: "內部視圖",
      workflowBoard: "工作流看板",
      active: "活動中",
      newEnquiry: "新諮詢",
      ownerAssigned: "負責人已分配",
      customerUpdated: "客戶已更新",
      completed: "已完成",
      serviceWorkflow: "服務工作流"
    },
    faqDescription: "關於我們平台、功能和支持的清晰解答。"
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
      rights: "ALL RIGHTS RESERVED.",
      legal: "Legal",
      action: "Action"
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
      },
      bookingWizard: {
        backToLanding: "Back to Physio Landing",
        requestSystem: "REQUEST SYSTEM",
        submitTitle: "Submit Physio Request",
        submitDesc: "Please fill in the form below to book an expert physiotherapy session.",
        steps: {
          service: { label: "SERVICE", desc: "Area of support" },
          details: { label: "DETAILS", desc: "Patient info" },
          schedule: { label: "SCHEDULE", desc: "Select date" },
          confirm: { label: "CONFIRM", desc: "Review consent" }
        },
        needHelp: "Need help?",
        helpDesc: "Our team is available Mon-Fri, 9am - 5pm to assist with your booking request.",
        complete: "Complete",
        stepIndicator: "Step {current} of {total}",
        chooseSupport: "Choose support area",
        chooseSupportDesc: "Select the closest category for your coordination request.",
        scheduleVisitTitle: "Schedule Visit",
        scheduleVisitDesc: "Pick a preferred date and time for your coordination.",
        confirmTitle: "Review & Confirm",
        confirmDesc: "Make sure everything looks correct before submitting.",
        categories: {
          elderly: "Elderly mobility",
          neurological: "Neurological / stroke",
          post_surgery: "Post-surgery recovery",
          sports_gym: "Sports and gym injuries",
          occupational: "Office and occupational pain",
          medico_legal: "Medical legal referrals"
        },
        referralReason: "Referral reason",
        selectReferralReason: "Select referral reason...",
        referralReasons: {
          personal_injury: "Personal injury claim (e.g., car accident, workplace injury)",
          insurance_claim: "Insurance claim",
          legal_proceedings: "Legal proceedings (supporting evidence)"
        },
        patientDetails: "Patient details",
        patientDetailsDesc: "Tell us a bit about who you are and what you need.",
        nameLabel: "Patient's Full Name",
        yourNameLabel: "Your Full Name",
        relationshipLabel: "Relationship to Patient",
        phoneLabel: "Phone Number",
        emailLabel: "Email Address",
        dobLabel: "Date of Birth",
        langLabel: "Preferred Communication Language",
        visitLabel: "Visit Preference",
        homeVisit: "Home Visit",
        homeVisitDesc: "Available inside specific UK postcodes only",
        onlineAssessment: "Online Assessment",
        onlineAssessmentDesc: "Video call consultation for advice and setup",
        postcode: "UK Postcode",
        address: "Address Details",
        isSelf: "Is this request for yourself?",
        isSelfYes: "Yes, I am the patient",
        isSelfNo: "No, I am booking on behalf of someone else",
        consentIntro: "Required Acknowledgements",
        agreeCoordinator: "I understand that P2C Growth is a technology and coordination assistant, not a clinical provider.",
        agreeContact: "I consent to P2C Growth contacting me via phone/email to coordinate this request.",
        agreeEmergency: "I confirm I have read the emergency advice and understand this service is not for urgent clinical emergencies.",
        submitBtn: "Submit Request",
        submittingBtn: "Submitting...",
        backBtn: "Back",
        continueBtn: "Continue",
        successTitle: "Request Received!",
        successDesc: "Your request has been successfully recorded and a confirmation email has been sent. Our team will review the details and coordinate your booking arrangement shortly.",
        errors: {
          referralReason: "Please select a referral reason.",
          patientName: "Patient name is required.",
          yourName: "Your name is required.",
          relationship: "Relationship is required.",
          email: "Email address is required.",
          invalidEmail: "Please enter a valid email address.",
          phone: "Phone number is required.",
          invalidPhone: "Enter 7-15 digits only.",
          dob: "Date of birth is required.",
          invalidAge: "Max age is 150 years.",
          postcode: "Postcode is required.",
          address: "Address is required.",
          date: "Please select a date and time slot."
        }
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
      rights: "BẢO LƯU MỌI QUYỀN.",
      legal: "Pháp lý",
      action: "Hành động"
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
      },
      bookingWizard: {
        backToLanding: "Quay lại trang Physio",
        requestSystem: "HỆ THỐNG GỬI YÊU CẦU",
        submitTitle: "Gửi Yêu Cầu Physio Booking",
        submitDesc: "Vui lòng điền thông tin bên dưới để gửi yêu cầu đặt lịch hẹn vật lý trị liệu.",
        steps: {
          service: { label: "DỊCH VỤ", desc: "Phạm vi hỗ trợ" },
          details: { label: "CHI TIẾT", desc: "Thông tin bệnh nhân" },
          schedule: { label: "LỊCH TRÌNH", desc: "Chọn ngày giờ" },
          confirm: { label: "XÁC NHẬN", desc: "Xem điều khoản" }
        },
        needHelp: "Cần hỗ trợ?",
        helpDesc: "Đội ngũ của chúng tôi sẵn sàng hỗ trợ từ Thứ 2 - Thứ 6, 9:00 - 17:00.",
        complete: "Hoàn thành",
        stepIndicator: "Bước {current} trên {total}",
        chooseSupport: "Chọn phạm vi hỗ trợ",
        chooseSupportDesc: "Chọn danh mục phù hợp nhất cho yêu cầu điều phối của bạn.",
        scheduleVisitTitle: "Lịch trình hẹn",
        scheduleVisitDesc: "Chọn ngày giờ thuận tiện nhất cho bạn.",
        confirmTitle: "Xem lại & Xác nhận",
        confirmDesc: "Đảm bảo mọi thông tin chính xác trước khi gửi.",
        categories: {
          elderly: "Vận động người cao tuổi",
          neurological: "Thần kinh / Đột quỵ",
          post_surgery: "Phục hồi sau phẫu thuật",
          sports_gym: "Chấn thương thể thao & gym",
          occupational: "Đau mỏi văn phòng & nghề nghiệp",
          medico_legal: "Giới thiệu giám định y khoa pháp lý"
        },
        referralReason: "Lý do giới thiệu",
        selectReferralReason: "Chọn lý do giới thiệu...",
        referralReasons: {
          personal_injury: "Yêu cầu bồi thường tai nạn cá nhân (ví dụ: tai nạn xe cộ, tai nạn lao động)",
          insurance_claim: "Yêu cầu bảo hiểm",
          legal_proceedings: "Thủ tục pháp lý (cung cấp bằng chứng hỗ trợ)"
        },
        patientDetails: "Thông tin bệnh nhân",
        patientDetailsDesc: "Cung cấp một số thông tin về người cần hỗ trợ và nhu cầu của bạn.",
        nameLabel: "Họ và tên bệnh nhân",
        yourNameLabel: "Họ và tên của bạn",
        relationshipLabel: "Mối quan hệ với bệnh nhân",
        phoneLabel: "Số điện thoại",
        emailLabel: "Địa chỉ Email",
        dobLabel: "Ngày sinh",
        langLabel: "Ngôn ngữ giao tiếp ưu tiên",
        visitLabel: "Hình thức hẹn",
        homeVisit: "Khám tại nhà",
        homeVisitDesc: "Chỉ hỗ trợ cho một số mã bưu điện tại UK",
        onlineAssessment: "Đánh giá Online",
        onlineAssessmentDesc: "Tư vấn qua video call để nhận lời khuyên và sắp xếp lịch",
        postcode: "Mã bưu điện UK",
        address: "Địa chỉ chi tiết",
        isSelf: "Yêu cầu này dành cho chính bạn?",
        isSelfYes: "Đúng, tôi là bệnh nhân",
        isSelfNo: "Không, tôi đặt lịch thay cho người khác",
        consentIntro: "Các điều khoản bắt buộc",
        agreeCoordinator: "Tôi hiểu rằng P2C Growth là đơn vị hỗ trợ công nghệ và điều phối, không phải cơ sở lâm sàng.",
        agreeContact: "Tôi đồng ý để P2C Growth liên hệ qua điện thoại/email để điều phối yêu cầu này.",
        agreeEmergency: "Tôi xác nhận đã đọc hướng dẫn khẩn cấp và hiểu rằng dịch vụ này không dành cho các tình huống lâm sàng khẩn cấp.",
        submitBtn: "Gửi yêu cầu",
        submittingBtn: "Đang gửi...",
        backBtn: "Quay lại",
        continueBtn: "Tiếp tục",
        successTitle: "Đã nhận yêu cầu!",
        successDesc: "Yêu cầu của bạn đã được ghi lại thành công và email xác nhận đã được gửi. Đội ngũ của chúng tôi sẽ sớm xem xét và liên hệ điều phối.",
        errors: {
          referralReason: "Vui lòng chọn một lý do giới thiệu.",
          patientName: "Họ tên bệnh nhân là bắt buộc.",
          yourName: "Họ tên của bạn là bắt buộc.",
          relationship: "Mối quan hệ là bắt buộc.",
          email: "Email là bắt buộc.",
          invalidEmail: "Vui lòng nhập một email hợp lệ.",
          phone: "Số điện thoại là bắt buộc.",
          invalidPhone: "Chỉ nhập từ 7-15 chữ số.",
          dob: "Ngày sinh là bắt buộc.",
          invalidAge: "Tuổi tối đa là 150 tuổi.",
          postcode: "Mã bưu điện là bắt buộc.",
          address: "Địa chỉ là bắt buộc.",
          date: "Vui lòng chọn ngày và giờ hẹn."
        }
      }
    }
  },

  hk: {
    nav: {
      home: "首頁",
      about: "關於我們",
      services: "服務項目",
      physiotherapy: "醫療專家預約",
      contact: "聯絡我們",
      admin: "系統管理"
    },
    layout: {
      footerDesc: "為英國服務型公司提供網站建設、預約系統、自動化流程、CRM工具及客戶與合作夥伴協調平台。",
      privacy: "隱私政策",
      terms: "服務條款",
      footerCta: "開始醫療專家預約申請",
      rights: "保留所有權利。",
      legal: "法律",
      action: "行動"
    },
    home: homeHk,
    about: {
      eyebrow: "關於 P2C Growth",
      title: "連接企業、合作夥伴和客戶。",
      subtitle: "P2C Growth LTD 業是一家總部位於英國的技術與軟件公司，致力於設計和構建實用的數字系統，幫助企業、合作夥伴和客戶更輕鬆地建立聯絡。",
      sectionTitle: "合作夥伴至客戶 (P2C) 旅程",
      sectionLead: "我們不取代專業服務提供商。相反，我們開發工作流工具和協調平台，使業務執行更簡單、更快速、更可靠。",
      exploreCta: "探索服務",
      clinicalModel: "臨床模式",
      techOperations: "技術運營",
      cards: [
        {
          title: "工作流自動化",
          body: "預約系統、自動電子郵件、狀態追踪和微型 CRM 工具，無需人工跟進即可保持業務運轉。"
        },
        {
          title: "合作夥伴連接",
          body: "專用平台，將終端客戶直接、安全地與合適的專業合作夥伴和內部團隊連接起來。"
        },
        {
          title: "專注於執行",
          body: "乾淨的數據捕獲、同意終止檢查和結構化的接收管道，最大限度地減少行政工作。"
        }
      ]
    },
    servicesPage: {
      eyebrow: "我們的服務",
      title: "為服務型企業提供的技術服務。",
      subtitle: "P2C Growth LTD 構建實用的數字系統：網站、預約工作流、CRM工具和合作夥伴協調平台。",
      primaryCard: {
        tag: "核心產品",
        title: "P2C Health",
        body: "為患者、法律案例、保險公司和專家跟進提供引導式預約和轉介工作流。",
        cta: "開始預約"
      },
      webDevCard: {
        title: "網站開發",
        body: "為英國服務型企業提供以轉化為中心的高端網站。",
        cta: "查看詳情"
      },
      suite: {
        tag: "運營套件",
        title: "集成業務系統",
        items: [
          { title: "預約系統與電子郵件自動化", body: "表單、工作流、確認、通知和運營交接。" },
          { title: "微型 CRM", body: "為管理高信任度客戶關係的團隊提供輕量級儀表板。" },
          { title: "客戶與合作夥伴平台", body: "客戶、內部團隊和專業合作夥伴之間的可重用協調層。" }
        ],
        cta: "查看詳情"
      }
    },
    contact: {
      eyebrow: "聯絡我們",
      title: "與我們的團隊取得聯絡",
      subtitle: "我們擁有專業的團隊和技術訣竅，幫助您將運營效率提升10倍。",
      formTitle: "發送諮詢",
      formSubtitle: "更喜歡寫信？填寫下方表單，我們會盡快與您聯絡。",
      faqTitle: "常見問題",
      faqSubtitle: "關於我們平台、功能和支持的清晰解答。",
      faqCtaTitle: "還有其他問題嗎？",
      faqCtaSubtitle: "找不到您要的答案？請與我們親切的團隊聯絡。",
      faqDocBtn: "文件庫",
      faqContactBtn: "取得聯絡",
      bannerTitle: "我們隨時準備好與您一同擴展",
      bannerSubtitle: "加入其他已通過 P2C Growth 工作流和自動化實現增長的服務型企業。",
      bannerContactBtn: "聯絡銷售",
      bannerDemoBtn: "查看演示",
      cards: {
        sales: { title: "聯絡銷售", desc: "與我們親切的團隊交流。", btn: "sales@p2cgrowth.com" },
        support: { title: "聯絡支持", desc: "我們隨時為您提供幫助。", btn: "support@p2cgrowth.com" },
        visit: { title: "拜訪我們", desc: "參觀我們的總部辦公室。", btn: "在 Google 地圖上查看" },
        call: { title: "致電我們", desc: "週一至週五，上午8點至下午5點。", btn: "+44 (0) 20 1234 5678" }
      },
      form: {
        name: "全名",
        email: "工作電子郵件",
        company: "公司名稱（選填）",
        help: "我們能如何幫助您？",
        helpPlaceholder: "告訴我們您目前的工作流、面臨的問題以及您希望構建的內容。",
        btn: "發送諮詢",
        sending: "正在發送..."
      },
      faqs: [
        { question: "有免費試用嗎？", answer: "是的，您可以免費試用30天。如果您需要，我們將提供免費的30分鐘新手引導通話，幫助您快速上手。" },
        { question: "我以後可以更改方案嗎？", answer: "當然可以！我們的定價隨您的公司規模擴展。與我們親切的團隊聯絡，為您在成長過程中找到合適的解決方案。" },
        { question: "你們的取消政策是什麼？", answer: "我們理解計劃會變。您可以隨時取消方案，我們將退還已支付的差額。" },
        { question: "發票上可以添加其他信息嗎？", answer: "目前，在發票上添加額外信息的唯一方法是手動將信息添加到工作區의名稱中。" },
        { question: "計費是如何運作的？", answer: "方案是按工作區計算的，而不是按帳戶。您可以升級一個工作區，但仍擁有任意數量的免費工作區。" },
        { question: "如何更改我的帳戶電子郵件？", answer: "您可以通過從筆記本電腦或台式電腦進入帳戶設置來更改與帳戶相關聯的電子郵件地址。" }
      ]
    },
    comingSoon: {
      tag: "建設中",
      title: "即將推出",
      desc: "我們目前正在構建此服務模塊。我們目前的重點是醫療專家預約 MVP。請稍後查看此功能的更新。",
      btn: "返回首頁"
    },
    privacy: {
      tag: "隱私",
      title: "隱私政策",
      subtitle: "P2C Growth 存儲預約和諮詢數據僅用於協調所請求的服務和業務跟進。",
      p1: "健康諮詢數據可能會與合適的專業合作夥伴共享，以用於協調目的。P2C Growth 不出售個人數據，亦不提供醫療診斷或治療。",
      p2: "數據訪問權限僅限於內部管理員及運營平台所需的已配置服務提供商，包括 Supabase 和電子郵件發送服務。"
    },
    terms: {
      tag: "條款",
      title: "服務條款",
      subtitle: "P2C Growth 是一個技術和協調平台。預約是申請，而非已確認的預約或臨床建議。",
      p1: "第一階段不收取任何在線費用。任何臨床服務、價格、預約確認或治療方案均由相關的專業合作夥伴處理。",
      p2: "用戶必須提供準確的聯絡和拜訪信息。緊急或突發醫療狀況應直接撥打 999、NHS 111 或前往急診中心。"
    },
    physiotherapy: {
      hero: {
        eyebrow: "P2C Health",
        title: "為在英亞裔社群提供物理治療預約協調",
        subtitle: "P2C Growth LTD 支持客戶提交上門物理治療或在線評估申請，並在有合適的物理治療師或服務商時協助建立聯絡。",
        primaryCta: "提交物理治療預約申請",
        secondaryCta: "查看參考價格",
        disclaimer: "P2C Growth LTD 並非診所，亦不直接提供臨床物理治療、診斷、治療或醫療建議。"
      },
      notice: {
        title: "重要通知",
        body1: "P2C Growth LTD 並非診所、物理治療中心或醫療機構。我們不診斷疾病、不提供臨床治療、不提供醫療建議，亦不提供任何緊急醫療服務。",
        body2: "P2C 僅作為請求接收、協調和平台提供者，協助客戶在有合適的獨立物理治療師或服務商時進行聯絡。",
        body3: "預約時間、最終費用、服務覆蓋區域、交通距離以及適用性將在正式預約前予以確認。",
        emergency: "此服務不適用於緊急醫療狀況。如果您出現嚴重症狀（如劇烈疼痛、胸痛、呼吸困難、突發無力、中風跡象或其他緊急狀況），請立即撥打 999 或聯絡 NHS 111。"
      },
      audience: {
        title: "此服務適合哪些人士？",
        subtitle: "P2C 協助在英國需要物理治療服務的客戶及家庭，特別是當面臨出行不便、語言障礙、等待時間長或需要上門服務時。",
        items: [
          { title: "長者", body: "適合需要改善活動能力、平衡力、肌力、步行能力或預防跌倒的長者。" },
          { title: "手術後康復者", body: "適合需要進行關節置換（膝/髖）、前交叉韌帶（ACL）手術、脊椎手術或其他骨科手術後康復的人士。" },
          { title: "中風及神經系統康復者", body: "適合需要重新訓練步行、平衡協調能力及日常生活自理能力的人士。" },
          { title: "需要上門服務者", body: "適合出行不便、不便前往診所，或希望在所屬區域有合適服務商時接受上門物理治療的人士。" },
          { title: "在英亞裔社群", body: "適合希望使用更清晰的預約流程、能夠註明語言偏好並獲得協調支持的人士。" },
          { title: "繁忙的家庭", body: "適合希望為年長父母或親屬尋求物理治療支持，但沒有時間自行聯絡多個機構的子女。" }
        ]
      },
      why: {
        title: "為什麼需要及早尋求物理治療支持？",
        intro: "許多人在面對疼痛、肌肉無力、失衡或步行困難時往往等待太久。對於長者、手術後或中風康復者而言，及早開展物理治療康復有助於預防長期的活動受限，並使康復過程更易於管理。",
        problems: [
          "NHS 等待時間過長",
          "語言溝通障礙",
          "長者出行前往診所困難",
          "子女工作繁忙，難以抽空陪同就醫或複康運動",
          "手術後或中風後需要黃金期康復",
          "亞裔人士往往過度耐痛或延誤就醫",
          "難以尋找能提供上門服務的合適物理治療師"
        ],
        summary: "P2C 通過收集您的具體需求、首選區域、語言偏好和時間安排，並在有合適的物理治療師或服務商時協助建立聯絡，從而簡化流程。",
        quote: "疼痛並非衰老的必然現象。及早尋求支持有助於保護您的活動能力、自信心和日常生活的獨立性。"
      },
      services: {
        title: "支持協調的物理治療領域",
        subtitle: "客戶可根據自身的主要狀況提交申請。P2C 將在有合適的服務商時協助進行協調。",
        tabs: [
          {
            id: "elderly",
            name: "長者複康",
            desc: "協助長者改善步行、平衡、肌力，降低跌倒風險。",
            items: ["活動能力支持", "平衡問題", "步行困難", "肌力強化", "跌倒預防", "一般長者複康"]
          },
          {
            id: "stroke",
            name: "中風及神經複康",
            desc: "協助中風或神經系統疾病患者改善運動、步行、平衡以及日常生活能力。",
            items: ["中風復康", "帕金森氏症支持", "活動重新訓練", "步行練習", "平衡與協調", "日常運動支持"]
          },
          {
            id: "surgery",
            name: "手術後康復",
            desc: "協助手術後客戶重建肌力、活動範圍和步行信心。",
            items: ["全膝關節置換", "全髖關節置換", "前交叉韌帶 (ACL) 手術", "脊椎手術", "術後活動能力", "肌力與運動恢復"]
          },
          {
            id: "sports",
            name: "運動損傷",
            desc: "協助改善急慢性疼痛、運動損傷、健身拉傷，並預防再次受傷。",
            items: ["肩部疼痛", "腰部疼痛", "跑步者膝", "健身損傷", "運動損傷", "損傷預防"]
          },
          {
            id: "workers",
            name: "職業健康",
            desc: "協助改善因工作引起的腰酸背痛、肩頸痠痛、姿勢不良或肌肉緊張。",
            items: ["美甲從業者", "餐飲從業者", "辦公室職員", "企業主", "姿勢問題", "腰痛", "肩頸疼痛", "與工作相關的疼痛"]
          }
        ]
      },
      steps: {
        title: "運作流程",
        items: [
          { number: "01", name: "提交申請", desc: "告知您的具體需求、所在區域、語言偏好和首選時間。" },
          { number: "02", name: "P2C 評估需求", desc: "P2C 審核您的申請，並確定可能適合您的物理治療類型。" },
          { number: "03", name: "協調對接", desc: "在有合適的獨立物理治療師或服務商時，P2C 協助為您進行聯絡。" },
          { number: "04", name: "確認並預約", desc: "預約時間、最終費用、地址及交通距離將在確認後正式完成預約。" }
        ]
      },
      pricing: {
        title: "物理治療服務參考價格",
        subtitle: "以下價格僅供參考。最終費用可能因地區、交通距離、時間安排及客戶具體需求而有所不同，將在正式預約前予以確認。",
        homeTitle: "Home Visit (上門服務)",
        onlineTitle: "Online Assessment / Training (在線評估與訓練)",
        note: "請注意：最終價格可能因地區、交通距離、服務商空閒情況和具體需求而有所調整。",
        homeItems: [
          { name: "首次評估", duration: "60 分鐘", price: "£120" },
          { name: "後續跟進", duration: "45 分鐘", price: "£90" },
          { name: "後續跟進", duration: "30 分鐘", price: "£70" }
        ],
        onlineItems: [
          { name: "在線評估", duration: "30 分鐘", price: "£55" },
          { name: "在線評估與訓練", duration: "60 分鐘", price: "£95" }
        ]
      },
      faqs: {
        title: "常見問題",
        items: [
          {
            question: "P2C Growth LTD 是物理治療診所嗎？",
            answer: "不是。P2C Growth LTD 並非物理治療診所，亦不直接提供臨床物理治療、診斷、治療或醫療建議。P2C 僅提供預約協調平台，在有合適的獨立物理治療師或服務商時協助建立聯絡。"
          },
          {
            question: "我可以申請上門物理治療嗎？",
            answer: "可以。客戶可以提交上門服務申請。最終能否成行取決於您所在的區域、服務商的空閒情況、交通距離和預約時間。"
          },
          {
            question: "此服務適合什麼人？",
            answer: "此服務可能適合長者、手術後人士、中風患者、面臨活動障礙人士、腰背疼痛、運動損傷或希望在家中接受物理治療的客戶。"
          },
          {
            question: "我可以要求中文（粵語/國語）或越南語支持嗎？",
            answer: "客戶可在提交申請時註明語言偏好。最終的語言支持將取決於預約時該區域有空閒的合適服務商。"
          },
          {
            question: "價格是固定的嗎？",
            answer: "不是。網站上顯示的價格僅供參考。最終費用可能因地區、交通距離、服務商空閒情況、預約時間和您的具體康復需求而有所不同，將在正式預約前予以確認。"
          },
          {
            question: "此服務可用於緊急醫療情況嗎？",
            answer: "不能。此服務不適用於緊急醫療狀況。如果您遇到緊急醫療情況，請立即撥打 999 或聯絡 NHS 111。"
          },
          {
            question: "P2C 會決定我需要什麼治療嗎？",
            answer: "不會。P2C 不診斷疾病，亦不制定治療方案。P2C 僅協助收集您的申請並在合適時協調服務商。臨床評估和具體治療方案將完全由合格的服務商獨立負責。"
          }
        ]
      },
      footer: {
        title: "需要協助尋找合適的物理治療師嗎？",
        desc: "提交您的申請給 P2C。我們將審核信息，並在有合適的物理治療師或服務商時協助進行協調。",
        button: "提交物理治療預約申請",
        disclaimer: "P2C Growth LTD 並非診所，亦不直接提供臨床物理治療、診斷、治療、醫療建議或任何緊急服務。"
      },
      bookingWizard: {
        backToLanding: "返回物理治療主頁",
        requestSystem: "申請系統",
        submitTitle: "提交物理治療申請",
        submitDesc: "請填寫以下表格以提交您的物理治療預約申請。",
        steps: {
          service: { label: "服務項目", desc: "支援範圍" },
          details: { label: "填寫詳情", desc: "患者資訊" },
          schedule: { label: "預約時間", desc: "選擇日期" },
          confirm: { label: "確認提交", desc: "閱讀條款" }
        },
        needHelp: "需要協助？",
        helpDesc: "我們的團隊於週一至週五上午 9 點至下午 5 點提供服務，以協助您的預約。",
        complete: "完成",
        stepIndicator: "第 {current} 步，共 {total} 步",
        chooseSupport: "選擇支援範圍",
        chooseSupportDesc: "為您的協調申請選擇最合適的類別。",
        scheduleVisitTitle: "預約時間",
        scheduleVisitDesc: "選擇最適合您的預約日期和時間段。",
        confirmTitle: "確認並提交",
        confirmDesc: "在提交前，請確保所有填寫資訊正確無誤。",
        categories: {
          elderly: "長者活動能力",
          neurological: "神經系統 / 中風復康",
          post_surgery: "手術後復康",
          sports_gym: "運動及健身損傷",
          occupational: "辦公室及職業痛症",
          medico_legal: "醫療法律轉介"
        },
        referralReason: "轉介原因",
        selectReferralReason: "選擇轉介原因...",
        referralReasons: {
          personal_injury: "人身傷害索償（例如：交通意外、工作意外）",
          insurance_claim: "保險索償",
          legal_proceedings: "法律訴訟（支持性證據）"
        },
        patientDetails: "患者詳情",
        patientDetailsDesc: "請提供一些關於患者情況和需求的資訊。",
        nameLabel: "患者全名",
        yourNameLabel: "您的全名",
        relationshipLabel: "與患者的關係",
        phoneLabel: "電話號碼",
        emailLabel: "電子郵件地址",
        dobLabel: "出生日期",
        langLabel: "偏好的溝通語言",
        visitLabel: "預約方式",
        homeVisit: "上門物理治療",
        homeVisitDesc: "僅適用於特定的英國郵政編碼",
        onlineAssessment: "線上評估",
        onlineAssessmentDesc: "提供諮詢和安排的視訊通話",
        postcode: "英國郵政編碼",
        address: "詳細地址",
        isSelf: "此申請是為您自己提交的嗎？",
        isSelfYes: "是的，我是患者",
        isSelfNo: "不是，我代表其他人預約",
        consentIntro: "必要確認事項",
        agreeCoordinator: "我明白 P2C Growth 是一家技術和協調機構，而非臨床服務提供商。",
        agreeContact: "我同意 P2C Growth 通過電話/電子郵件與我聯繫以協調此申請。",
        agreeEmergency: "我確認已閱讀緊急情況指引，並理解此服務不適用於緊急臨床狀況。",
        submitBtn: "提交申請",
        submittingBtn: "提交中...",
        backBtn: "返回",
        continueBtn: "繼續",
        successTitle: "申請已接收！",
        successDesc: "您的申請已成功記錄，確認郵件已發送。我們的團隊將盡快審核詳情並與您聯絡協調預約。",
        errors: {
          referralReason: "請選擇轉介原因。",
          patientName: "必須填寫患者姓名。",
          yourName: "必須填寫您的姓名。",
          relationship: "必須填寫關係。",
          email: "必須填寫電子郵件。",
          invalidEmail: "請輸入有效的電子郵件地址。",
          phone: "必須填寫電話號碼。",
          invalidPhone: "僅限輸入 7-15 位數字。",
          dob: "出生日期必須填寫。",
          invalidAge: "最大年齡為 150 歲。",
          postcode: "必須填寫郵政編碼。",
          address: "必須填寫詳細地址。",
          date: "請選擇日期和時間段。"
        }
      }
    }
  }
};

export type Locale = keyof typeof dictionary;
export const defaultLocale: Locale = "en";

export function getDictionary(locale: Locale = defaultLocale) {
  return dictionary[locale];
}
