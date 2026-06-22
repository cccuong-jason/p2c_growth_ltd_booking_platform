// Shared home page translation strings to avoid duplication and maintain type safety
const homeShared = {
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
    home: homeShared,
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
    home: homeShared,
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
