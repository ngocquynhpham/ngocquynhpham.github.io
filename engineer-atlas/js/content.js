/** Static learning content — roadmap, optional tracks, topic curricula. */

import { TOPIC_DETAILS } from './topic-details/index.js';

export { TOPIC_DETAILS };

export const STATUS_LABELS = {
  todo: 'Chưa học',
  doing: 'Đang học',
  done: 'Đã hoàn thành',
  known: 'Đã biết · bỏ qua',
  later: 'Để sau',
};

export const MODULES = [
  {
    key: 'frontend',
    name: 'Frontend & Browser Engineering',
    desc: 'Browser Internals, React architecture, performance, rendering strategies và production quality.',
    weeks: [
      [
        'Browser & Web Fundamentals',
        [
          'Semantic HTML, responsive CSS, accessibility & WCAG',
          'DOM, CSSOM, critical rendering path, layout, paint, composite',
          'HTTP, DNS, TLS, browser caching, CDN, DevTools Network',
          'CSR, SSR, SSG, ISR, hydration, React Server Components',
        ],
      ],
      [
        'Tooling & Bundle Engineering',
        [
          'npm, package.json, package-lock, node_modules, npm ci',
          'Vite, HMR, production build, dist, bundlers (Rollup/Rolldown/Webpack)',
          'Raw/minified, gzip, Brotli, source maps, visualizer, bundle/chunk analysis',
          'ESM/module resolution, tree shaking, code splitting, dynamic import, React.lazy',
        ],
      ],
      [
        'React Architecture & Performance',
        [
          'Reconciliation, React Profiler, re-render diagnosis, memoization',
          'Component design, design system, local/global/server state',
          'REST integration, Axios/fetch, TanStack Query, cache, retry, abort',
          'Long tasks, event loop, virtualization, layout thrashing, API waterfalls',
        ],
      ],
      [
        'Frontend Production Quality',
        [
          'Core Web Vitals: LCP, INP, CLS; Lighthouse & real-user monitoring',
          'ESLint, Prettier, TS strict, react-hooks rules, Husky/lint-staged, CI quality gates',
          'SEO metadata, sitemap, canonical, robots.txt, structured data',
          'Vitest, RTL, Playwright, error boundaries, XSS, CSRF, CSP',
        ],
      ],
    ],
  },
  {
    key: 'database',
    name: 'Database Engineering',
    desc: 'SQL, relational modeling, PostgreSQL, performance, ORM và migrations.',
    weeks: [
      ['SQL Foundations', ['SELECT, WHERE, ORDER BY, JOIN', 'GROUP BY, HAVING, aggregate functions', 'Subqueries, CTE, window functions', 'NULL, constraints, PostgreSQL data types']],
      ['Data Modeling', ['ERD, entities, primary keys, foreign keys', 'One-to-many, many-to-many, join tables', 'Normalization, constraints, referential integrity', 'Schema design từ business requirements']],
      ['PostgreSQL & Optimization', ['Indexes, EXPLAIN ANALYZE, query plans', 'Transactions, ACID, isolation, locks', 'Connection pooling, query optimization', 'Backup, restore, migrations, data safety']],
      ['Application Data Layer', ['SQLAlchemy ORM & relationships', 'Alembic migrations and seed data', 'Repository/data access patterns', 'Integration tests, pgvector fundamentals']],
    ],
  },
  {
    key: 'backend',
    name: 'Backend Engineering',
    desc: 'Python, HTTP, FastAPI, authentication, security, testing và API performance.',
    weeks: [
      ['HTTP & API Design', ['Client/server lifecycle, HTTP methods, status codes', 'REST resource design, pagination, filtering', 'Headers, cookies, CORS, OpenAPI', 'API contracts, versioning, error formats']],
      ['Python & FastAPI', ['Python typing, environments, async/await', 'Pydantic, routers, dependency injection', 'Services, repositories, separation of concerns', 'File uploads, background tasks, validation']],
      ['Auth & Security', ['Password hashing, JWT vs sessions', 'Authentication, authorization, RBAC', 'Cookies, CSRF, CORS, rate limiting', 'Secrets, input validation, OWASP basics']],
      ['Backend Reliability', ['Pytest unit & integration tests', 'Logging, exceptions, structured errors', 'Timeouts, retries, concurrency basics', 'API profiling, DB bottlenecks, caching basics']],
    ],
  },
  {
    key: 'chatbot',
    name: 'LLM & Chatbot Engineering',
    desc: 'ProtonX foundation + FastAPI/React chatbot, streaming, chat history và cost.',
    weeks: [
      ['LLM & API Fundamentals', ['LLM, tokens, context window, inference', 'Current LLM APIs, model parameters, pricing', 'Prompt roles, limitations, hallucinations', 'Latency, retries, token tracking, rate limits']],
      ['Chatbot Interfaces', ['Streamlit chatbot prototype', 'React/Next.js chat interface', 'Server-Sent Events (SSE) streaming', 'Loading, error, cancel, optimistic UX']],
      ['Conversation Engineering', ['Conversation and message persistence', 'Context management, truncation/summarization', 'Structured outputs, JSON Schema, validation', 'User access controls, prompt safety']],
      ['Fullstack Chatbot MVP', ['FastAPI + React + PostgreSQL integration', 'System prompt testing and versioning', 'API key protection and cost controls', 'Chat history, streaming, basic evaluation']],
    ],
  },
  {
    key: 'rag',
    name: 'RAG Engineering',
    desc: 'Embeddings, document ingestion, vector retrieval, citations, reranking và evaluation.',
    weeks: [
      ['Embeddings & Vector Search', ['RAG pipeline and embeddings', 'Cosine similarity, dot product, L2 distance', 'Vector databases: Chroma, Qdrant, Supabase, pgvector', 'Metadata filtering, indexing, semantic search']],
      ['Document Ingestion', ['PDF parsing, cleaning and text extraction', 'Character, recursive, semantic chunking', 'Embedding pipelines, batch processing', 'Document metadata, indexing, re-indexing']],
      ['Retrieval & Reranking', ['Top-K retrieval, relevance thresholds', 'Keyword/BM25 vs semantic retrieval', 'Hybrid search and rerank fundamentals', 'Grounded answers, citations, no-answer behavior']],
      ['RAG Evaluation', ['Hit@K, Recall@K, MRR, nDCG', 'Answer relevance, groundedness, faithfulness', 'Golden question set and failure analysis', 'Ragas basics, latency, quality, cost']],
    ],
  },
  {
    key: 'infra',
    name: 'Infrastructure, Deployment & DevOps',
    desc: 'Git → VPS → Linux → Docker → HTTPS → CI/CD → monitoring → production.',
    weeks: [
      ['Web Infrastructure', ['Git, branching, GitHub/GitLab workflow', 'Server vs hosting vs VPS, Linux, shell, permissions', 'SSH, SCP, SFTP, IP, ports, firewall', 'Domain, DNS, TLS, HTTPS, Nginx, reverse proxy']],
      ['Deployment & Docker', ['Static React/Vite dist deployment', 'Dockerfile, images, containers, layers', 'Docker volumes, networking, Docker Compose', 'Environment variables, secrets, staging vs production']],
      ['CI/CD & Operations', ['GitHub Actions or GitLab CI', 'Build, lint, test, deploy pipelines', 'Health checks, application logs, uptime monitoring', 'Backup, restore, rollback, server hardening']],
      ['Production Capstone', ['Frontend bundle audit, lint/typecheck gates and Core Web Vitals', 'Backend profiling, caching, database indexing', 'AI safety, document access, cost/latency monitoring', 'Architecture diagrams, README, API docs, portfolio case study']],
    ],
  },
];

export const MONTH_OUTCOMES = [
  'Audit portfolio + UI shell Operations Platform; bundle/performance before/after.',
  'Schema v1, SQL và migrations cho Operations Platform (capstone).',
  'FastAPI CRUD + RBAC + tests kết nối PostgreSQL (capstone).',
  'Chatbot streaming, lưu hội thoại và gọi LLM an toàn (song song / AI track).',
  'PDF ingestion → embeddings → retrieval → citations + RAG evaluation.',
  'Deploy capstone + portfolio lên VPS, CI/CD, backup và public case study.',
];

export const DOMAIN_SHORT = ['FE', 'DATA', 'BE', 'LLM', 'RAG', 'DEVOPS'];

export const OPTIONAL_TRACKS = [
  {
    key: 'manufacturing-integration',
    name: 'Data Integration & Manufacturing Systems',
    desc: 'Explore Later — không bắt buộc cho sprint FE/Fullstack',
    groups: [
      ['Data Engineering Foundations', ['SQL & Python for integration', 'ETL/ELT, batch and incremental pipelines', 'Data modelling, data quality and deduplication', 'API/CSV ingestion, validation and upsert']],
      ['Enterprise & Manufacturing Systems', ['ERP and Epicor overview', 'MES: work orders, production tracking, traceability', 'QMS: quality checks and audit trails', 'Manufacturing workflows and IT/OT integration']],
      ['Industrial Connectivity', ['OPC UA nodes and subscriptions', 'MQTT brokers, topics, publish/subscribe', 'PLC/sensor ingestion, timestamps', 'Retries, idempotency, buffering']],
      ['Data Platforms & Operations', ['Cloud vs on-premise', 'Semantic models and business metrics', 'Cybersecurity and access control', 'Monitoring, CI/CD, troubleshooting, documentation']],
    ],
    lab: 'FleetOps lab: CSV/API shipment ingestion → validate → deduplicate → PostgreSQL upsert → audit log → dashboard.',
  },
  {
    key: 'creative-web-3d',
    name: 'Creative Frontend & 3D Web',
    desc: 'Explore Later — học khi muốn làm creative developer, 3D configurator, warehouse digital twin.',
    groups: [
      ['Three.js Foundations', ['Scene, camera, renderer, coordinate systems', 'Geometry, materials, lights, shadows', 'Textures, models (glTF), asset loading', 'Animation loop, controls, resize and cleanup']],
      ['React & 3D Integration', ['React Three Fiber fundamentals', 'Drei helpers, canvas lifecycle', 'React state with 3D scene', '3D asset optimization, lazy loading']],
      ['Graphics & Performance', ['WebGL rendering pipeline and GPU basics', 'Shaders, GLSL concepts, postprocessing', 'Draw calls, geometry batching, instancing', 'FPS, memory, textures, profiling']],
      ['Advanced & Use Cases', ['WebGPU overview (optional)', '3D configurators and product viewers', 'FleetOps optional: 3D warehouse/yard visualization', 'Accessibility and 2D fallback for 3D UI']],
    ],
    lab: 'Optional FleetOps 3D experiment: small vehicle/warehouse viewer with FPS profiling.',
  },
  {
    key: 'baas-cloud-backend',
    name: 'Backend Architecture & BaaS — Firebase / Supabase',
    desc: 'Explore Later: Frontend kết nối managed backend. Không thay FastAPI + PostgreSQL trong roadmap Fullstack.',
    groups: [
      ['Backend Architecture', ['Traditional Frontend → REST API → Backend → Database', 'BaaS: managed authentication, database and JavaScript SDK', 'BaaS vs custom backend: trade-offs, limits and costs', 'Client/server trust boundary, secrets and API keys']],
      ['Firebase & Firestore', ['Firebase project setup and JavaScript SDK', 'Firebase Authentication and user identity', 'Cloud Firestore: collections, documents, indexes, queries', 'Firestore Security Rules and per-user access']],
      ['Supabase & Data Models', ['Supabase Auth, PostgreSQL and Row Level Security', 'SQL relational tables vs NoSQL documents', 'JOIN, foreign keys and transactions vs document references', 'Realtime, offline sync, quotas and vendor lock-in']],
      ['Engineer Atlas Cloud Sync', ['Per-user progress, status, notes and updatedAt model', 'GitHub Pages + cloud persistence across devices', 'Test security rules/RLS and least-privilege access', 'Explicit migration, JSON export/import and backup']],
    ],
    lab: 'Optional lab: Firebase Auth + Firestore for cross-device sync.',
  },
  {
    key: 'serverless-architecture',
    name: 'Backend Architecture — Cloud Functions & Serverless',
    desc: 'Học sau Firebase/FastAPI nền tảng; không bắt buộc cho job sprint.',
    groups: [
      ['Three Backend Approaches', ['BaaS: Firebase Auth/Firestore', 'Custom backend: FastAPI, REST, PostgreSQL', 'Serverless: Cloud Functions, Lambda', 'Combine BaaS, FastAPI and functions']],
      ['Functions & Events', ['HTTP triggers and callable functions', 'Event-driven: database and storage triggers', 'Webhooks and scheduled jobs', 'Auth, authorization and secret management']],
      ['Production Reliability', ['Retries, idempotency and duplicate events', 'Cold starts, timeouts and limits', 'Logging, tracing, monitoring', 'Costs, quotas, vendor lock-in']],
      ['Hands-on Architecture Labs', ['Firestore vs FastAPI vs function for one flow', 'Secure callable with per-user auth', 'Webhook with idempotency', 'Architecture diagram and trade-offs']],
    ],
    lab: 'Optional: Cloud Function for server-side AI or webhooks.',
  },
];

export const PROTON = [
  [1, 'Giới thiệu lớp học', 'foundation'],
  [2, 'RESTful API & ChatGPT APIs', 'core'],
  [3, 'Streamlit chatbot interface', 'core'],
  [4, 'RAG fundamentals & embeddings', 'core'],
  [5, 'Prompt engineering & Agent overview', 'core'],
  [6, 'Docker + Cloud', 'core'],
  [7, 'MongoDB + web crawling', 'optional'],
  [8, 'RAG với nhiều vector search', 'core'],
  [9, 'ChromaDB, Qdrant, MongoDB, Supabase', 'core'],
  [10, 'Qdrant local & production', 'optional'],
  [11, 'Supabase vector search', 'optional'],
  [12, 'OpenAI / Google File Search', 'later'],
  [13, 'Bài tập chatbot bán hoa', 'core'],
  [14, 'Semantic Router, Reflection, HyDE', 'later'],
  [15, 'Chunking techniques', 'core'],
  [16, 'LangChain & open-source RAG', 'later'],
  [17, 'LangGraph & LangGraph Studio', 'later'],
  [18, 'RAG + ReRank', 'core'],
  [19, 'Keyword Search + ReRank', 'core'],
  [20, 'Graph RAG / Neo4j', 'later'],
  [21, 'Hybrid RAG with graphs', 'later'],
  [22, 'Agentic RAG', 'later'],
  [23, 'Multimodal RAG', 'later'],
  [24, 'RAG Evaluation & Ragas', 'core'],
  [25, 'Model training / fine-tuning', 'later'],
  [26, 'Advanced tabular data', 'later'],
  [27, 'Kimi, GPT OSS & Agent workshop', 'later'],
];

export const PROTON_WEEK_REFS = {
  '2-0': 'ProtonX #2 — REST & LLM APIs',
  '2-1': 'ProtonX #3 — Streamlit',
  '2-2': 'ProtonX #5 — Prompt engineering',
  '2-3': 'ProtonX #13 — Chatbot bán hoa',
  '3-0': 'ProtonX #4, #8–11 — Embeddings & vector stores',
  '3-1': 'ProtonX #15 — Chunking',
  '3-2': 'ProtonX #18–19 — ReRank, Keyword Search',
  '3-3': 'ProtonX #24 — RAG Evaluation',
  '5-0': 'ProtonX #6 — Docker + Cloud',
  '5-1': 'ProtonX #6 — Docker + Cloud',
};

export function allTopics() {
  return MODULES.flatMap((m, mi) =>
    m.weeks.flatMap((w, wi) =>
      w[1].map((title, ti) => ({
        id: `${mi}-${wi}-${ti}`,
        title,
        module: mi,
        week: wi,
        topic: ti,
        weekName: w[0],
      }))
    )
  );
}

/** Subtopic checklist entries for a topic (stable ids). */
export function getTopicSubtopics(topicId) {
  const detail = TOPIC_DETAILS[topicId];
  if (!detail) return [];
  return detail.sections.flatMap((section, si) =>
    section.items.map((text, ii) => ({
      id: `${topicId}-${si}-${ii}`,
      text,
      heading: section.heading,
    }))
  );
}

export function getAllSubtopics() {
  return Object.keys(TOPIC_DETAILS).flatMap((topicId) => getTopicSubtopics(topicId));
}
