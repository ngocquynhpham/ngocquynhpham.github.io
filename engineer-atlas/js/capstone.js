/** Operations Platform — fullstack capstone checklist (private labels + public export labels). */

export const CAPSTONE_TITLE = 'Operations Platform';
export const CAPSTONE_SUBTITLE = 'Fullstack capstone · lifecycle checklist';

export const CAPSTONE_STATUS_LABELS = {
  todo: 'Chưa làm',
  draft: 'Bản nháp',
  review: 'Cần review',
  done: 'Xong',
};

/** @typedef {{ id: string, privateLabel: string, publicLabel: string, public?: boolean, docHint?: string }} CapstoneTask */
/** @typedef {{ id: string, index: number, title: string, tags: string, tasks: CapstoneTask[] }} CapstonePhase */

export const CAPSTONE_PHASES = [
  {
    id: 'discovery',
    index: 1,
    title: 'Product Discovery',
    tags: 'PM · BA',
    tasks: [
      {
        id: 'cap-01-01',
        privateLabel: 'Xác định problem statement và mục tiêu MVP',
        publicLabel: 'Define problem statement and MVP goals',
        public: true,
      },
      {
        id: 'cap-01-02',
        privateLabel: 'Xác định nhóm người dùng và use cases',
        publicLabel: 'Identify user groups and core use cases',
        public: false,
      },
      {
        id: 'cap-01-03',
        privateLabel: 'Hoàn thiện Product Vision v1.0',
        publicLabel: 'Product scope document (internal)',
        public: false,
        docHint: 'Private: product-vision.md',
      },
      {
        id: 'cap-01-04',
        privateLabel: 'Rà soát PRD và acceptance criteria',
        publicLabel: 'Requirements and acceptance criteria (internal)',
        public: false,
        docHint: 'Private: prd.md',
      },
      {
        id: 'cap-01-05',
        privateLabel: 'Xác định phạm vi MVP và những gì chưa làm',
        publicLabel: 'MVP scope and out-of-scope list',
        public: true,
      },
    ],
  },
  {
    id: 'architecture',
    index: 2,
    title: 'System Architecture',
    tags: 'FE · BE',
    tasks: [
      {
        id: 'cap-02-01',
        privateLabel: 'Sơ đồ kiến trúc high-level (FE → API → DB → deploy)',
        publicLabel: 'High-level system architecture diagram',
        public: true,
      },
      {
        id: 'cap-02-02',
        privateLabel: 'Ran giới module / modular monolith',
        publicLabel: 'Module boundaries and separation of concerns',
        public: true,
      },
      {
        id: 'cap-02-03',
        privateLabel: 'Chiến lược multi-tenant (shared schema + org scope)',
        publicLabel: 'Multi-tenant data isolation approach',
        public: true,
      },
      {
        id: 'cap-02-04',
        privateLabel: 'Quy ước API v1, lỗi, pagination',
        publicLabel: 'REST API conventions and error format',
        public: true,
      },
      {
        id: 'cap-02-05',
        privateLabel: 'Chọn mô hình auth (JWT / session) và RBAC roles',
        publicLabel: 'Authentication and role-based access model',
        public: true,
      },
      {
        id: 'cap-02-06',
        privateLabel: 'Database schema v1.0 + rà ERD',
        publicLabel: 'Relational schema v1 and modeling review',
        public: true,
        docHint: 'Private: database-schema.md + migrations',
      },
    ],
  },
  {
    id: 'design',
    index: 3,
    title: 'UI/UX Design',
    tags: 'UI/UX · BA',
    tasks: [
      {
        id: 'cap-03-01',
        privateLabel: 'Wireframe user flows chính (admin + staff portal)',
        publicLabel: 'Core user flow wireframes',
        public: true,
      },
      {
        id: 'cap-03-02',
        privateLabel: 'Inventory component / design tokens cơ bản',
        publicLabel: 'Component inventory and design tokens',
        public: true,
      },
      {
        id: 'cap-03-03',
        privateLabel: 'Layout shell admin (nav, header, content)',
        publicLabel: 'Admin application shell layout',
        public: true,
      },
      {
        id: 'cap-03-04',
        privateLabel: 'Mobile-first layout cho staff/end-user portal',
        publicLabel: 'Mobile-first staff portal layout',
        public: true,
      },
      {
        id: 'cap-03-05',
        privateLabel: 'Accessibility pass trên flows chính',
        publicLabel: 'Accessibility review on primary flows',
        public: true,
      },
    ],
  },
  {
    id: 'frontend',
    index: 4,
    title: 'Frontend Development',
    tags: 'Frontend',
    tasks: [
      {
        id: 'cap-04-01',
        privateLabel: 'Scaffold React/Next.js + TypeScript + lint',
        publicLabel: 'Frontend project scaffold and tooling',
        public: true,
      },
      {
        id: 'cap-04-02',
        privateLabel: 'Routing, layout, theme',
        publicLabel: 'Routing and application layout',
        public: true,
      },
      {
        id: 'cap-04-03',
        privateLabel: 'Auth UI (login, session, protected routes)',
        publicLabel: 'Authentication UI and protected routes',
        public: true,
      },
      {
        id: 'cap-04-04',
        privateLabel: 'Pattern list/detail + filters cho records',
        publicLabel: 'List/detail CRUD patterns with filters',
        public: true,
      },
      {
        id: 'cap-04-05',
        privateLabel: 'Forms + validation + API client (TanStack Query)',
        publicLabel: 'Forms, validation, and API integration',
        public: true,
      },
      {
        id: 'cap-04-06',
        privateLabel: 'Dashboard KPI widgets (dữ liệu tenant)',
        publicLabel: 'Dashboard widgets backed by live data',
        public: true,
      },
      {
        id: 'cap-04-07',
        privateLabel: 'Bundle audit + Core Web Vitals smoke',
        publicLabel: 'Frontend performance and bundle review',
        public: true,
      },
    ],
  },
  {
    id: 'backend',
    index: 5,
    title: 'Backend Development',
    tags: 'Backend',
    tasks: [
      {
        id: 'cap-05-01',
        privateLabel: 'Scaffold FastAPI (routers, DI, settings)',
        publicLabel: 'Backend project structure (FastAPI)',
        public: true,
      },
      {
        id: 'cap-05-02',
        privateLabel: 'PostgreSQL + SQLAlchemy models',
        publicLabel: 'PostgreSQL models and data layer',
        public: true,
      },
      {
        id: 'cap-05-03',
        privateLabel: 'Alembic migrations + seed dev',
        publicLabel: 'Database migrations and seed data',
        public: true,
      },
      {
        id: 'cap-05-04',
        privateLabel: 'Organization + RBAC middleware',
        publicLabel: 'Multi-tenant RBAC enforcement',
        public: true,
      },
      {
        id: 'cap-05-05',
        privateLabel: 'CRUD APIs: customers, fleet/resources, records',
        publicLabel: 'Core REST resources and validation',
        public: true,
      },
      {
        id: 'cap-05-06',
        privateLabel: 'Assignment/workflow + conflict rules',
        publicLabel: 'Workflow state transitions and scheduling rules',
        public: true,
      },
      {
        id: 'cap-05-07',
        privateLabel: 'Upload evidence (files) + metadata',
        publicLabel: 'File upload for delivery evidence',
        public: true,
      },
      {
        id: 'cap-05-08',
        privateLabel: 'OpenAPI published + contract tests smoke',
        publicLabel: 'OpenAPI documentation and contract alignment',
        public: true,
      },
    ],
  },
  {
    id: 'integration',
    index: 6,
    title: 'Fullstack Integration',
    tags: 'FE · BE · BA',
    tasks: [
      {
        id: 'cap-06-01',
        privateLabel: 'Align FE types với OpenAPI / Pydantic',
        publicLabel: 'Frontend–backend contract alignment',
        public: true,
      },
      {
        id: 'cap-06-02',
        privateLabel: 'Caching, invalidation, optimistic updates',
        publicLabel: 'Client cache and mutation strategy',
        public: true,
      },
      {
        id: 'cap-06-03',
        privateLabel: 'Role-based UI (ẩn action theo quyền)',
        publicLabel: 'Role-based UI visibility',
        public: true,
      },
      {
        id: 'cap-06-04',
        privateLabel: 'E2E path: create → assign → update → complete',
        publicLabel: 'End-to-end critical workflow path',
        public: true,
      },
      {
        id: 'cap-06-05',
        privateLabel: 'Public read-only tracking page (token link)',
        publicLabel: 'Limited public status page (sample data)',
        public: true,
      },
      {
        id: 'cap-06-06',
        privateLabel: 'Error/empty/loading states thống nhất',
        publicLabel: 'Consistent error and loading UX',
        public: true,
      },
    ],
  },
  {
    id: 'quality',
    index: 7,
    title: 'Testing & Quality',
    tags: 'QA · All',
    tasks: [
      {
        id: 'cap-07-01',
        privateLabel: 'Pytest unit tests services quan trọng',
        publicLabel: 'Backend unit tests for core services',
        public: true,
      },
      {
        id: 'cap-07-02',
        privateLabel: 'Integration tests API + PostgreSQL',
        publicLabel: 'API integration tests with database',
        public: true,
      },
      {
        id: 'cap-07-03',
        privateLabel: 'Frontend component tests (RTL/Vitest)',
        publicLabel: 'Frontend component tests',
        public: true,
      },
      {
        id: 'cap-07-04',
        privateLabel: 'Playwright smoke một flow chính',
        publicLabel: 'E2E smoke test for primary flow',
        public: true,
      },
      {
        id: 'cap-07-05',
        privateLabel: 'CI: lint, typecheck, test gates',
        publicLabel: 'CI quality gates (lint, types, tests)',
        public: true,
      },
      {
        id: 'cap-07-06',
        privateLabel: 'Tenant isolation + auth negative tests',
        publicLabel: 'Security tests for access control',
        public: true,
      },
    ],
  },
  {
    id: 'deploy',
    index: 8,
    title: 'Deployment & Portfolio',
    tags: 'FE · BE · PM',
    tasks: [
      {
        id: 'cap-08-01',
        privateLabel: 'Dockerfile FE + BE',
        publicLabel: 'Container images for frontend and backend',
        public: true,
      },
      {
        id: 'cap-08-02',
        privateLabel: 'Docker Compose local stack',
        publicLabel: 'Local Docker Compose environment',
        public: true,
      },
      {
        id: 'cap-08-03',
        privateLabel: 'VPS provision + Nginx reverse proxy',
        publicLabel: 'Production hosting and reverse proxy',
        public: true,
      },
      {
        id: 'cap-08-04',
        privateLabel: 'TLS/HTTPS + env secrets',
        publicLabel: 'HTTPS and secrets management',
        public: true,
      },
      {
        id: 'cap-08-05',
        privateLabel: 'GitHub Actions build/test/deploy',
        publicLabel: 'CI/CD pipeline',
        public: true,
      },
      {
        id: 'cap-08-06',
        privateLabel: 'Backup/restore DB + rollback plan',
        publicLabel: 'Backup and rollback procedures',
        public: true,
      },
      {
        id: 'cap-08-07',
        privateLabel: 'Cập nhật trang public Operations Platform + export JSON',
        publicLabel: 'Public engineering case study page updated',
        public: true,
      },
      {
        id: 'cap-08-08',
        privateLabel: 'Link case study từ portfolio / projects grid',
        publicLabel: 'Portfolio links to case study',
        public: true,
      },
    ],
  },
];

/** Task ids that start as draft when docs exist but need review. */
export const CAPSTONE_DRAFT_SEED_IDS = ['cap-01-03', 'cap-01-04', 'cap-02-06'];

export const PUBLIC_CASE_STUDY_URL = '../projects/operations-platform/index.html';

export function allCapstoneTasks() {
  return CAPSTONE_PHASES.flatMap((p) =>
    p.tasks.map((t) => ({ ...t, phaseId: p.id, phaseTitle: p.title, phaseIndex: p.index }))
  );
}
