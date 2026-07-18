window.PORTFOLIO_DATA = {
  /** Nguồn chân lý duy nhất cho email / phone / social / location — about, hero, contact, footer đều reference. */
  contactInfo: {
    email: "buibaonhan.work@gmail.com",
    phone: "0901 234 567",
    linkedin: "https://www.linkedin.com/in/bui-bao-nhan",
    github: "https://github.com/buibaonhan",
    location: {
      vi: "TP. Hồ Chí Minh",
      en: "Ho Chi Minh City",
    },
  },

  navigation: [
    { href: "#about", vi: "Giới thiệu", en: "About" },
    { href: "#skills", vi: "Kỹ năng", en: "Skills" },
    { href: "#strengths", vi: "Điểm mạnh", en: "Strengths" },
    { href: "#experience", vi: "Kinh nghiệm", en: "Experience" },
    {
      href: "#education-languages",
      vi: "Học vấn & Ngôn ngữ",
      en: "Education & Languages",
    },
    { href: "#personal-project", vi: "Case study", en: "Case study" },
    { href: "#selected-work", vi: "Dự án", en: "Projects" },
    { href: "#contact", vi: "Liên hệ", en: "Contact" },
  ],

  personalProject: {
    badge: {
      vi: "Case study cá nhân",
      en: "Personal case study",
    },
    brand: "PropOps Blueprint",
    title: {
      vi: "Chuẩn hóa end-to-end quy trình giao dịch BĐS & CRM môi giới",
      en: "End-to-end blueprint for property deals & brokerage CRM",
    },
    description: {
      vi: "Problem: chuỗi lead → tư vấn → giữ chỗ → ký hợp đồng → bàn giao đang vận hành rời rạc giữa Excel, Zalo nhóm và CRM lỗi thời — sales không biết lead đang ở stage nào, vận hành không trace được lý do drop-off. Insight: workshop AS-IS với sales, legal và vận hành dự án cho thấy điểm gãy chính nằm ở handoff giữa tư vấn và giữ chỗ, thiếu definition of ready cho hồ sơ, và KPI chỉ đo doanh số chứ không đo cycle time từng bước. Solution: thiết kế TO-BE BPMN, user journey cho 3 persona (sale, trưởng nhóm, vận hành), backlog ưu tiên theo RICE, kèm mock dashboard KPI (conversion theo stage, thời gian trung bình giữ chỗ→ký HĐ, tỷ lệ hồ sơ thiếu giấy tờ). Impact: bộ tài liệu sẵn sàng handover cho PO/dev và UAT — kết quả vận hành thực tế: [số liệu] (đang chờ bổ sung từ stakeholder).",
      en: "Problem: the lead → consult → reservation → contract → handover chain ran across Excel, chat groups, and a legacy CRM — sales could not see stage status, and ops could not trace drop-off reasons. Insight: AS-IS workshops with sales, legal, and project ops showed the main break at the consult-to-reservation handoff, missing definition of ready for dossiers, and KPIs that tracked revenue only — not step-level cycle time. Solution: TO-BE BPMN, journeys for three personas (agent, team lead, ops), a RICE-prioritized backlog, and KPI dashboard mocks (stage conversion, reservation-to-contract cycle time, incomplete-dossier rate). Impact: an analysis pack ready for PO/dev and UAT — live business outcome: [metric] (pending stakeholder confirmation).",
    },
    technologies: [
      "AS-IS → TO-BE",
      "User journey",
      "RICE backlog",
      "KPI mocks",
    ],
    url: "#",
    cta: {
      vi: "Xem case study",
      en: "View case study",
    },
  },

  hero: {
    greeting: {
      vi: "Xin chào, tôi là",
      en: "Hello, I'm",
    },
    name: {
      vi: "Bùi Bảo Nhân",
      en: "Bui Bao Nhan",
    },
    title: {
      vi: "Senior Business Analyst",
      en: "Senior Business Analyst",
    },
    shortDescription: {
      vi: "Senior/Principal Business Analyst — cầu nối giữa C-level, vận hành và đội kỹ thuật. Tôi giúp tổ chức trả lời đúng câu hỏi trước khi viết code: vấn đề nghiệp vụ là gì, metric thành công ra sao, backlog nào đáng làm trước. Thành thạo elicitation, user story mapping, BRD/FRD, BPMN AS-IS/TO-BE, UAT và change management; quen làm việc Agile với PO, UX, dev và QA trên các nền tảng HRM (chấm công, C&B, tuyển dụng, performance), CRM (lead, pipeline, Customer 360) và PropTech (danh mục BĐS, CRM môi giới, quản lý giao dịch).",
      en: "Senior/Principal Business Analyst — bridging C-level, operations, and engineering. I help organizations answer the right questions before code: what is the business problem, what success looks like, and which backlog items deserve priority. Strong in elicitation, user story mapping, BRD/FRD, BPMN AS-IS/TO-BE, UAT, and change management; comfortable in Agile with PO, UX, dev, and QA across HRM (timekeeping, C&B, recruiting, performance), CRM (lead, pipeline, Customer 360), and PropTech (property inventory, brokerage CRM, deal management).",
    },
    availability: {
      vi: "Sẵn sàng cho cơ hội mới — Senior/Principal BA",
      en: "Open to new opportunities — Senior/Principal BA",
    },
    yearsExperience: "10+",
    buttons: {
      contact: {
        vi: "Liên hệ trao đổi",
        en: "Get in touch",
      },
      resume: {
        vi: "Tải CV",
        en: "Download CV",
      },
      cv: {
        vi: "#",
        en: "#",
      },
    },
  },

  selectedWork: {
    headline: {
      vi: "Hệ thống nội bộ",
      en: "Internal systems",
    },
    subtitle: {
      vi: "Đây là một vài ví dụ về các sản phẩm tôi đã triển khai trong lĩnh vực Bất động sản.",
      en: "Here are a few examples of products I have delivered in the real estate domain.",
    },
    allFilterLabel: {
      vi: "Tất cả",
      en: "All",
    },
    projects: [
      {
        title: {
          vi: "Human Resource Management (HRM)",
          en: "Human Resource Management (HRM)",
        },
        company: {
          vi: "Thắng Lợi Group",
          en: "Thang Loi Group",
        },
        description: {
          vi: "Business Analyst chủ trì đặc tả yêu cầu cho hệ thống Quản lý Nhân sự đa tính năng, tinh gọn vòng đời nhân viên (hợp đồng, chấm công, tính lương…). Hệ thống hỗ trợ nhiều công ty với phân quyền theo vai trò; phục vụ 200+ người dùng trên nhiều tổ chức.",
          en: "Business Analyst leading requirements for a multi-feature HRM system covering the employee lifecycle (contracts, attendance, payroll…). Multi-company with role-based access; 200+ users across organizations.",
        },
        technologies: ["HRM", "Payroll", "Attendance", "Access Control"],
        url: "#",
      },
      {
        title: {
          vi: "E-Signature & Workflow Automation Platform",
          en: "E-Signature & Workflow Automation Platform",
        },
        company: {
          vi: "Thắng Lợi Group",
          en: "Thang Loi Group",
        },
        description: {
          vi: "Nền tảng tự động hóa quy trình nghiệp vụ: chuyển luồng BPMN tĩnh thành phê duyệt động kèm chữ ký số. Quản lý chuỗi phê duyệt phức tạp, đảm bảo bảo mật tài liệu và tính toàn vẹn quy trình.",
          en: "Business-process automation platform: turning static BPMN into dynamic approval flows with e-signature. Manages complex approval chains while keeping document security and process integrity.",
        },
        technologies: ["E-Signature", "Workflow", "BPMN", "Approval"],
        url: "#",
      },
      {
        title: {
          vi: "Goal & Task Management",
          en: "Goal & Task Management",
        },
        company: {
          vi: "Thắng Lợi Group",
          en: "Thang Loi Group",
        },
        description: {
          vi: "Hệ thống quản lý từ họp đến thực thi: mục tiêu tổ chức, phân công nhiệm vụ và theo dõi tiến độ với cơ chế nhiệm vụ phân cấp (hierarchical).",
          en: "Meeting-to-execution system: organizational goals, task assignment, and progress tracking with hierarchical task management.",
        },
        technologies: ["Task Management", "Meeting", "Progress Tracking", "RBAC"],
        url: "#",
      },
      {
        title: {
          vi: "Document Management",
          en: "Document Management",
        },
        company: {
          vi: "Thắng Lợi Group",
          en: "Thang Loi Group",
        },
        description: {
          vi: "Hệ thống quản lý tài liệu tích hợp nền tảng E-Signature & Workflow — lên lịch phát hành, phân phối theo đối tượng và phân tích nâng cao.",
          en: "Document management integrated with E-Signature & Workflow — scheduled publishing, targeted distribution, and advanced analytics.",
        },
        technologies: ["Document Management", "E-Signature Integration", "Analytics"],
        url: "#",
      },
      {
        title: {
          vi: "Call Center & CRM Integration Platform",
          en: "Call Center & CRM Integration Platform",
        },
        company: {
          vi: "Thắng Lợi Group",
          en: "Thang Loi Group",
        },
        description: {
          vi: "Hệ thống quản lý tổng đài tích hợp CRM chăm sóc khách hàng sau bán: xử lý cuộc gọi thời gian thực, quản lý dữ liệu khách hàng và tự động hóa quy trình nâng cao.",
          en: "Call-center management integrated with post-sales CRM: real-time call handling, customer data management, and advanced workflow automation.",
        },
        technologies: ["Call Center", "CRM", "RBAC", "SMS Campaign"],
        url: "#",
      },
      {
        title: {
          vi: "Asset Management",
          en: "Asset Management",
        },
        company: {
          vi: "Thắng Lợi Group",
          en: "Thang Loi Group",
        },
        description: {
          vi: "Giải pháp quản lý tài sản với theo dõi bằng mã QR, quản lý vòng đời tài sản chi tiết, và vận hành responsive trên di động cho kiểm soát tài sản toàn doanh nghiệp.",
          en: "Asset management with QR tracking, detailed asset lifecycle, and mobile-responsive operations for enterprise-wide control.",
        },
        technologies: ["Asset Management", "QR Tracking", "Lifecycle Management"],
        url: "#",
      },
      {
        title: {
          vi: "Internal Digital Library",
          en: "Internal Digital Library",
        },
        company: {
          vi: "Thắng Lợi Group",
          en: "Thang Loi Group",
        },
        description: {
          vi: "Thư viện số nội bộ với streaming video, quản lý tài liệu, e-book và khả năng truy cập đa thiết bị.",
          en: "Internal digital library with video streaming, document management, e-books, and cross-device access.",
        },
        technologies: ["Digital Library", "Video Streaming", "Content Management"],
        url: "#",
      },
      {
        title: {
          vi: "Personalized Invitation Card (E-Thiệp)",
          en: "Personalized Invitation Card (E-Thiệp)",
        },
        company: {
          vi: "Thắng Lợi Group",
          en: "Thang Loi Group",
        },
        description: {
          vi: "Ứng dụng thiệp mời cá nhân hóa (E-Thiệp): cá nhân hóa và tự động gửi thiệp kèm mã QR check-in, mini-game — nâng cao trải nghiệm khách hàng tại sự kiện bán hàng.",
          en: "Personalized invitation app (E-Thiệp): personalized invites with QR check-in and mini-games to improve customer experience at sales events.",
        },
        technologies: ["Invitation", "QR Check-in", "Event Experience"],
        url: "#",
      },
    ],
  },

  about: {
    title: {
      vi: "Giới thiệu",
      en: "About",
    },
    headline: {
      vi: "Biến bài toán mơ hồ thành giải pháp chạy thật.",
      en: "Turn fuzzy problems into solutions that actually run.",
    },
    description1: {
      vi: "Tôi là Business Analyst với hơn một thập kỷ đồng hành các chương trình chuyển đổi số quy mô doanh nghiệp trên ba domain trọng tâm: HRM, CRM và PropTech. Công việc của tôi bắt đầu từ việc ngồi đúng phòng với đúng người — C-level, trưởng vận hành, HR, sales, legal — để làm rõ vấn đề thật sự cần giải, không phải vấn đề dễ viết vào ticket.",
      en: "I am a Business Analyst with more than a decade supporting enterprise digital programs across three focus domains: HRM, CRM, and PropTech. My work starts by sitting with the right people — C-level, operations leads, HR, sales, legal — to clarify the real problem, not the problem that is easiest to ticket.",
    },
    description2: {
      vi: "Trong vai trò cầu nối giữa business và kỹ thuật, tôi dẫn workshop elicitation, mô hình hóa quy trình AS-IS/TO-BE bằng BPMN, viết BRD/FRD và user story có acceptance criteria rõ, rồi ở lại đến UAT, đào tạo người dùng cuối và change management. Tôi coi tài liệu là sản phẩm: phải trace được từ epic xuống test case, và sign-off phải có người chịu trách nhiệm.",
      en: "As a bridge between business and engineering, I facilitate elicitation workshops, model AS-IS/TO-BE processes in BPMN, write BRD/FRD and user stories with clear acceptance criteria, and stay through UAT, end-user training, and change management. I treat documentation as a product: traceable from epics to test cases, with accountable sign-off.",
    },
    description3: {
      vi: "Trên HRM tôi quen các bài toán chấm công, C&B, tuyển dụng và performance; trên CRM là lead, sales pipeline và Customer 360; trên PropTech là quản lý danh mục BĐS, CRM môi giới và vòng đời giao dịch. Mục tiêu luôn giống nhau: giải pháp phải giúp vận hành đo được — giảm sai sót, rút ngắn cycle time, tăng độ tin cậy báo cáo — chứ không chỉ “lên hệ thống”.",
      en: "In HRM I work on timekeeping, C&B, recruiting, and performance; in CRM on leads, sales pipeline, and Customer 360; in PropTech on property inventory, brokerage CRM, and deal lifecycle. The goal is always the same: solutions operations can measure — fewer errors, shorter cycle time, more trustworthy reporting — not just “go-live for the sake of it”.",
    },
    highlights: [
      {
        vi: "Dẫn dắt requirement gathering, BRD/FRD writing, user story mapping, use case và BPMN process flow cho chương trình enterprise",
        en: "Lead requirement gathering, BRD/FRD writing, user story mapping, use cases, and BPMN process flows for enterprise programs",
      },
      {
        vi: "Thiết kế giải pháp HRM: chấm công & ca làm việc, công thức C&B, tuyển dụng (ATS), chu trình performance và phê duyệt đa cấp",
        en: "HRM solution design: timekeeping & shifts, C&B formulas, recruiting (ATS), performance cycles, and multi-level approvals",
      },
      {
        vi: "Thiết kế CRM: lead management, sales pipeline, Customer 360, rule routing và báo cáo vận hành cho quản lý",
        en: "CRM design: lead management, sales pipeline, Customer 360, routing rules, and ops reporting for management",
      },
      {
        vi: "Tư vấn PropTech: danh mục BĐS, CRM môi giới, quy trình giữ chỗ–ký HĐ–bàn giao, đồng bộ giữa sales / legal / vận hành dự án",
        en: "PropTech advisory: property inventory, brokerage CRM, reservation–contract–handover flows, sync across sales / legal / project ops",
      },
      {
        vi: "Điều phối UAT, đào tạo end-user, change management và khung đo ROI — số liệu cụ thể: [số liệu] (bổ sung khi có dữ kiện thật)",
        en: "Coordinate UAT, end-user training, change management, and ROI measurement frames — concrete figures: [metric] (when real data is available)",
      },
      {
        vi: "Làm việc thành thạo với Jira, Confluence, Visio, Miro; đọc hiểu SQL cơ bản & API spec ở mức nghiệp vụ; quen nền tảng SAP SuccessFactors, Oracle HCM, Salesforce, HubSpot, Zoho",
        en: "Hands-on with Jira, Confluence, Visio, Miro; business-level SQL & API-spec literacy; familiar with SAP SuccessFactors, Oracle HCM, Salesforce, HubSpot, Zoho",
      },
    ],
    stats: [
      {
        fromYears: true,
        label: {
          vi: "Năm kinh nghiệm",
          en: "Years Experience",
        },
      },
      {
        value: "20+",
        label: {
          vi: "Initiative đã phân tích",
          en: "Initiatives Analyzed",
        },
      },
      {
        value: "10+",
        label: {
          vi: "Công cụ & nền tảng",
          en: "Tools & Platforms",
        },
      },
      {
        value: "95%",
        label: {
          vi: "UAT commitment",
          en: "UAT Commitment",
        },
      },
    ],
  },

  skills: {
    title: {
      vi: "Kỹ năng chuyên môn",
      en: "Professional skills",
    },
    headline: {
      vi: "Phương pháp, công cụ và nền tảng tôi dùng hàng ngày",
      en: "Methods, tools, and platforms I use day to day",
    },
    subtitle: {
      vi: "Bộ kỹ năng thực chiến để đưa bài toán HRM · CRM · PropTech từ workshop đầu tiên đến UAT sign-off — không dừng ở slide đẹp.",
      en: "A practical toolkit to take HRM · CRM · PropTech problems from the first workshop to UAT sign-off — not slideware.",
    },
    categories: [
      {
        title: "Chuyên môn nghiệp vụ",
        icon: "fas fa-sitemap",
        skills: [
          "Requirement Gathering",
          "BRD / FRD Writing",
          "User Story Mapping",
          "Use Case Diagram",
          "BPMN Process Flow",
          "Gap Analysis",
          "RICE / MoSCoW",
          "UAT Coordination",
          "Change Management",
        ],
      },
      {
        title: "Công cụ & hệ thống",
        icon: "fas fa-tools",
        skills: [
          "SQL (đọc/viết truy vấn cơ bản)",
          "API spec (đọc hiểu)",
          "Jira & backlog grooming",
          "Confluence",
          "Visio",
          "Miro / workshop boards",
          "Excel (pivot, rule matrix)",
        ],
      },
      {
        title: "Nền tảng đã làm việc",
        icon: "fas fa-cloud",
        skills: [
          "SAP SuccessFactors",
          "Oracle HCM",
          "Salesforce",
          "HubSpot",
          "Zoho CRM",
        ],
      },
      {
        title: "Domain HRM · CRM · PropTech",
        icon: "fas fa-industry",
        skills: [
          "Chấm công & ca làm việc",
          "C&B / payroll rules",
          "Tuyển dụng & ATS",
          "Performance management",
          "Lead & sales pipeline",
          "Customer 360",
          "Danh mục / inventory BĐS",
          "CRM môi giới & giao dịch",
        ],
      },
    ],
    softSkillsTitle: {
      vi: "Kỹ năng mềm & cách làm việc",
      en: "Soft skills & working style",
    },
    softSkills: [
      {
        title: {
          vi: "Facilitation & giao tiếp đa cấp",
          en: "Multi-level facilitation & communication",
        },
        description: {
          vi: "Dẫn workshop 8–15 người với C-level, vận hành và kỹ thuật trong cùng một phòng. Biết tách vấn đề chính sách khỏi vấn đề hệ thống, tóm tắt quyết định và action item ngay sau buổi họp để không mất momentum.",
          en: "Facilitate 8–15 person workshops with C-level, operations, and engineering in one room. Separate policy problems from system problems; leave with clear decisions and action items so momentum is not lost.",
        },
        icon: "fas fa-comments",
      },
      {
        title: {
          vi: "Tư duy hệ thống end-to-end",
          en: "End-to-end systems thinking",
        },
        description: {
          vi: "Nhìn luồng nghiệp vụ xuyên suốt nhiều phòng ban và squad: edge case, handoff, audit trail, tác động chéo đến báo cáo và compliance. Tránh tối ưu một bước mà phá vỡ bước kế tiếp.",
          en: "See processes across departments and squads: edge cases, handoffs, audit trails, and knock-on effects on reporting and compliance. Avoid optimizing one step in a way that breaks the next.",
        },
        icon: "fas fa-project-diagram",
      },
      {
        title: {
          vi: "Ownership đến sign-off",
          en: "Ownership through sign-off",
        },
        description: {
          vi: "Không dừng ở tài liệu “đã gửi”. Chủ động clarify khi yêu cầu mơ hồ, escalate đúng lúc khi ưu tiên xung đột, theo dõi UAT và đào tạo đến khi nghiệp vụ thật sự nhận hệ thống.",
          en: "I do not stop at “document sent”. I clarify fuzzy requirements, escalate priority conflicts in time, and stay through UAT and training until the business truly owns the system.",
        },
        icon: "fas fa-check-double",
      },
      {
        title: {
          vi: "Đọc dữ liệu ở mức nghiệp vụ",
          en: "Business-level data literacy",
        },
        description: {
          vi: "Đủ SQL và tư duy KPI để tự kiểm tra báo cáo, validate assumption trước UAT, và nói chuyện được với data/BI team — không thay data engineer, nhưng không phụ thuộc hoàn toàn vào họ để hiểu con số.",
          en: "Enough SQL and KPI thinking to spot-check reports, validate assumptions before UAT, and talk with data/BI teams — not replacing data engineers, but not fully dependent on them to understand the numbers.",
        },
        icon: "fas fa-chart-line",
      },
    ],
  },

  strengths: {
    title: {
      vi: "Điểm mạnh",
      en: "Strengths",
    },
    headline: {
      vi: "Giá trị tôi mang lại cho đội sản phẩm và vận hành",
      en: "The value I bring to product and operations teams",
    },
    strengths: [
      {
        title: {
          vi: "Làm rõ yêu cầu nhanh, có cấu trúc",
          en: "Structured, fast requirement clarity",
        },
        description: {
          vi: "Biến ý tưởng mơ hồ thành epic/story có acceptance criteria sau 1–2 vòng workshop. Stakeholder biết mình đang đồng ý điều gì; dev biết điều kiện nào là “xong”.",
          en: "Turn fuzzy ideas into epics/stories with acceptance criteria in 1–2 workshop cycles. Stakeholders know what they agreed to; engineers know what “done” means.",
        },
        icon: "fas fa-bolt",
      },
      {
        title: {
          vi: "Cầu nối tin cậy giữa business và kỹ thuật",
          en: "Trusted bridge between business and engineering",
        },
        description: {
          vi: "Giữ C-level, vận hành và squad kỹ thuật trên cùng một definition of done. Dịch feedback UAT thành backlog ưu tiên rõ — giảm “nói mãi không thành ticket”.",
          en: "Keep C-level, operations, and engineering on one definition of done. Translate UAT feedback into a clear prioritized backlog — less talk that never becomes a ticket.",
        },
        icon: "fas fa-handshake",
      },
      {
        title: {
          vi: "UAT, đào tạo & change management",
          en: "UAT, training & change management",
        },
        description: {
          vi: "Điều phối nghiệm thu có checklist theo role, hỗ trợ đào tạo end-user và theo dõi adoption sau go-live. Hệ thống chỉ thành công khi người dùng thật sự dùng.",
          en: "Coordinate role-based acceptance checklists, support end-user training, and track adoption after go-live. A system only succeeds when people actually use it.",
        },
        icon: "fas fa-clipboard-check",
      },
      {
        title: {
          vi: "Chiều sâu domain HRM · CRM · PropTech",
          en: "Depth in HRM · CRM · PropTech",
        },
        description: {
          vi: "Không viết tài liệu generic. Hiểu ngữ cảnh nhân sự (lương, ca, phê duyệt), bán hàng (funnel, trùng lead) và bất động sản (giữ chỗ, pháp lý, bàn giao) để đặt đúng câu hỏi từ ngày đầu.",
          en: "Not generic documentation. I understand people-ops (payroll, shifts, approvals), sales (funnels, duplicate leads), and real estate (reservations, legal, handover) so the right questions start on day one.",
        },
        icon: "fas fa-building",
      },
      {
        title: {
          vi: "Giảm rework nhờ AC & mock sớm",
          en: "Less rework via early AC & mocks",
        },
        description: {
          vi: "Đưa acceptance criteria, rule matrix và wireframe feedback vào sớm để dev–QA–business bám cùng một kỳ vọng trước khi code chạy xa. Kết quả đo được trên từng chương trình: [số liệu].",
          en: "Bring acceptance criteria, rule matrices, and early wireframe feedback in so dev–QA–business share one expectation before code runs far. Program-level outcome: [metric].",
        },
        icon: "fas fa-recycle",
      },
      {
        title: {
          vi: "Compliance-aware & audit trail",
          en: "Compliance-aware & audit trail",
        },
        description: {
          vi: "Thiết kế yêu cầu có tính đến phê duyệt đa cấp, lịch sử thay đổi và trách nhiệm sign-off — đặc biệt quan trọng với C&B, hợp đồng BĐS và dữ liệu khách hàng.",
          en: "Design requirements with multi-level approvals, change history, and sign-off accountability in mind — critical for C&B, property contracts, and customer data.",
        },
        icon: "fas fa-shield-alt",
      },
    ],
  },

  education: {
    title: {
      vi: "Học vấn",
      en: "Education",
    },
    items: [
      {
        institution: {
          vi: "Đại học Sư phạm TP.HCM",
          en: "Ho Chi Minh City University of Education",
        },
        major: {
          vi: "Cử nhân Công nghệ thông tin",
          en: "Bachelor of Information Technology",
        },
        period: "2012 – 2016",
      },
    ],
  },

  languages: {
    title: {
      vi: "Ngôn ngữ",
      en: "Languages",
    },
    items: [
      {
        language: {
          vi: "Tiếng Việt",
          en: "Vietnamese",
        },
        proficiency: {
          vi: "Ngôn ngữ chính",
          en: "Primary language",
        },
      },
      {
        language: {
          vi: "Tiếng Anh",
          en: "English",
        },
        proficiency: {
          vi: "Đọc, viết & trao đổi kỹ thuật",
          en: "Read, write & technical communication",
        },
      },
    ],
  },

  experience: {
    title: {
      vi: "Kinh nghiệm làm việc",
      en: "Work experience",
    },
    headline: {
      vi: "Hành trình hơn 10 năm phân tích nghiệp vụ",
      en: "A decade-plus journey in business analysis",
    },
    items: [
      {
        title: "Business Analyst",
        company: "Thắng Lợi Group",
        period: "2021 – nay",
        project: "PropTech · CRM môi giới · đồng bộ vận hành dự án / HRM nội bộ",
        technologies: ["PropTech", "CRM", "BPMN", "Jira", "Confluence", "UAT"],
        links: [],
        responsibilities: [
          {
            vi: "Situation/Task: quy trình giao dịch BĐS và CRM môi giới còn phân mảnh giữa sales, legal và vận hành. Action: dẫn discovery, map AS-IS → TO-BE (BPMN), chuẩn hóa stage và gate hồ sơ. Result: [số liệu] (cycle time / conversion — cần bổ sung).",
            en: "Situation/Task: property deal and brokerage CRM flows were fragmented across sales, legal, and ops. Action: led discovery, mapped AS-IS → TO-BE (BPMN), standardized stages and dossier gates. Result: [metric] (cycle time / conversion — to be filled).",
          },
          {
            vi: "Action: viết BRD/FRD, user story và acceptance criteria; điều phối backlog grooming với PO/squad. Result: giảm ambiguity trước sprint — mức độ đo được: [số liệu].",
            en: "Action: authored BRD/FRD, user stories, and acceptance criteria; facilitated backlog grooming with PO/squads. Result: less ambiguity before sprints — measurable level: [metric].",
          },
          {
            vi: "Action: điều phối UAT theo role (sales, vận hành, legal), hỗ trợ đào tạo end-user và theo dõi adoption sau go-live. Result: [số liệu] (pass rate / số issue blocker — cần xác nhận).",
            en: "Action: coordinated role-based UAT (sales, ops, legal), supported end-user training and post go-live adoption. Result: [metric] (pass rate / blocker count — pending confirmation).",
          },
          {
            vi: "Action: làm cầu nối giữa C-level/vận hành và đội kỹ thuật khi ưu tiên xung đột; escalate có ngữ cảnh và đề xuất trade-off. Takeaway: giữ alignment chương trình dài hơi. [Mô tả công việc bổ sung nếu có].",
            en: "Action: bridged C-level/ops and engineering when priorities conflicted; escalated with context and trade-off options. Takeaway: sustained alignment on long-running programs. [Additional job description if available].",
          },
        ],
      },
      {
        title: "Business Analyst",
        company: "FIS",
        period: "2019",
        project: "[Mô tả công việc / chương trình — cần bổ sung]",
        technologies: ["BPMN", "Jira", "Confluence", "BRD/FRD", "UAT"],
        links: [],
        responsibilities: [
          {
            vi: "Situation/Task: tham gia các initiative chuyển đổi số cần làm rõ yêu cầu đa stakeholder. Action: hỗ trợ/đồng dẫn elicitation, ghi nhận quyết định và chuyển thành backlog có thể estimate. Result: [số liệu].",
            en: "Situation/Task: contributed to digital initiatives needing multi-stakeholder clarity. Action: co-led elicitation, captured decisions, and turned them into estimable backlog. Result: [metric].",
          },
          {
            vi: "Action: soạn thảo và review BRD/FRD, use case, acceptance criteria; phối hợp QA dựng kịch bản UAT. Result: [số liệu] (rework / defect liên quan requirement — cần bổ sung).",
            en: "Action: drafted and reviewed BRD/FRD, use cases, acceptance criteria; partnered with QA on UAT scenarios. Result: [metric] (requirement-related rework / defects — to be filled).",
          },
          {
            vi: "Action: map quy trình AS-IS/TO-BE và gap analysis cho hạng mục được giao. Result: [số liệu]. [Mô tả công việc] — cần bổ sung trách nhiệm và thành tích thật từ phía anh Nhân.",
            en: "Action: mapped AS-IS/TO-BE processes and gap analysis for assigned scope. Result: [metric]. [Job description] — real responsibilities and achievements to be provided.",
          },
        ],
      },
      {
        title: "Business Analyst",
        company: "FSI",
        period: "2016",
        project: "[Mô tả công việc / chương trình — cần bổ sung]",
        technologies: ["BPMN", "Excel", "Use Case", "Tài liệu yêu cầu"],
        links: [],
        responsibilities: [
          {
            vi: "Situation/Task: giai đoạn đầu nghề BA — học cách lắng nghe nghiệp vụ và chuyển thành tài liệu có cấu trúc. Action: hỗ trợ map AS-IS, tham gia phỏng vấn stakeholder dưới sự hướng dẫn senior. Result: [số liệu].",
            en: "Situation/Task: early BA career — learning to listen to the business and turn it into structured docs. Action: supported AS-IS mapping and stakeholder interviews under senior guidance. Result: [metric].",
          },
          {
            vi: "Action: viết use case, mô tả quy trình và test case cơ bản; theo dõi issue trong giai đoạn nghiệm thu. Result: [số liệu].",
            en: "Action: authored use cases, process descriptions, and basic test cases; tracked issues during acceptance. Result: [metric].",
          },
          {
            vi: "[Mô tả công việc] — cần bổ sung phạm vi domain và thành tích cụ thể.",
            en: "[Job description] — domain scope and concrete achievements to be filled.",
          },
        ],
      },
    ],
  },

  contact: {
    title: {
      vi: "Liên hệ",
      en: "Get in touch",
    },
    headline: {
      vi: "Cùng làm rõ bài toán HRM · CRM · PropTech",
      en: "Let's clarify your HRM · CRM · PropTech problem",
    },
    subtitle: {
      vi: "Tôi đang mở cho vai trò Senior/Principal Business Analyst, Lead BA hoặc vị trí discovery-focused gắn với chuyển đổi số doanh nghiệp. Nếu bạn cần người làm rõ yêu cầu, thiết kế quy trình và đưa giải pháp qua UAT một cách có trách nhiệm — hãy để lại lời nhắn. Tôi thường phản hồi trong vòng vài ngày làm việc.",
      en: "I am open to Senior/Principal Business Analyst, Lead BA, or discovery-focused roles on enterprise digital programs. If you need someone to clarify requirements, design processes, and own the path through UAT — leave a message. I typically reply within a few business days.",
    },
    form: {
      namePlaceholder: {
        vi: "Họ và tên của bạn",
        en: "Your full name",
      },
      emailPlaceholder: {
        vi: "Email công việc",
        en: "Work email",
      },
      messagePlaceholder: {
        vi: "Mô tả ngắn bối cảnh (domain, vai trò bạn đang tìm, timeline…)",
        en: "Brief context (domain, role you are hiring for, timeline…)",
      },
      submitButton: {
        vi: "Gửi tin nhắn",
        en: "Send message",
      },
      sendingButton: {
        vi: "Đang gửi...",
        en: "Sending...",
      },
      successMessage: {
        vi: "Cảm ơn bạn! Tin nhắn đã được ghi nhận (demo — chưa nối form backend). Tôi sẽ phản hồi qua email khi form được kích hoạt.",
        en: "Thanks! Your message was recorded (demo — backend not connected yet). I will reply by email once the form is live.",
      },
    },
  },

  footer: {
    description: {
      vi: "Senior Business Analyst — hơn 10 năm làm rõ nghiệp vụ, BRD/FRD, BPMN, backlog và UAT cho chương trình HRM · CRM · PropTech. Tài liệu có trách nhiệm, giải pháp đo được.",
      en: "Senior Business Analyst — 10+ years clarifying requirements, BRD/FRD, BPMN, backlog, and UAT for HRM · CRM · PropTech programs. Accountable docs, measurable solutions.",
    },
    navLabel: {
      vi: "Điều hướng",
      en: "Navigation",
    },
    connectLabel: {
      vi: "Kết nối",
      en: "Connect",
    },
    cta: {
      vi: "Liên hệ",
      en: "Get in touch",
    },
    backTop: {
      vi: "Về đầu trang",
      en: "Back to top",
    },
    copyright: {
      vi: "© 2026 Bùi Bảo Nhân. Tất cả quyền được bảo lưu.",
      en: "© 2026 Bui Bao Nhan. All rights reserved.",
    },
  },
};
