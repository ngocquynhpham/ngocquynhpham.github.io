import { detail } from './helpers.js';

export default {
  '2-0-0': detail(
    'HTTP là giao thức mọi client-server — status và method sai là bug khó debug. Mục tiêu: trace lifecycle một request CRUD.',
    [
      {
        heading: 'Client/server lifecycle',
        items: [
          'DNS → TCP → TLS → request → response → close/keep-alive.',
          'Diagram một GET /health từ browser tới FastAPI.',
          'Idempotent GET/PUT vs POST non-idempotent.',
          'Timeout client 30s vs server worker hang.',
          'Log correlation request_id header end-to-end.',
        ],
      },
      {
        heading: 'HTTP methods',
        items: [
          'GET safe cacheable — no body side effect.',
          'POST create 201 Location header.',
          'PATCH partial vs PUT replace semantics.',
          'DELETE 204 no content vs 200 body policy.',
          '405 Method Not Allowed route chỉ register allowed.',
        ],
      },
      {
        heading: 'Status codes',
        items: [
          '201 Created + resource URI response.',
          '400 validation vs 422 Pydantic FastAPI default.',
          '401 unauthenticated vs 403 forbidden authorized.',
          '429 rate limit Retry-After header.',
          '500 hide internal detail public JSON error shape.',
        ],
      },
    ]
  ),
  '2-0-1': detail(
    'REST resource design scalable — pagination/filter chuẩn giảm custom endpoint. Mục tiêu: API list topics filter module + page cursor.',
    [
      {
        heading: 'REST resource design',
        items: [
          'Nouns plural /users/{id}/topics nested shallow.',
          'HATEOAS links optional portfolio level.',
          'Bulk operations subresource /imports job async.',
          'Consistent envelope { data, meta } or plain array pick one.',
          'OpenAPI tag group by domain module.',
        ],
      },
      {
        heading: 'Pagination',
        items: [
          'Limit max 100 cap abuse.',
          'Cursor opaque base64 last_id stable sort.',
          'Response meta has_next next_cursor.',
          'Offset ok admin low volume only.',
          'Test empty page last page partial.',
        ],
      },
      {
        heading: 'Filtering',
        items: [
          'Query ?status=done&module=frontend validate enum.',
          'Sort ?sort=-updated_at whitelist fields.',
          'Full-text search q= param document min length.',
          'Combine filters AND semantics document.',
          'Integration test filter returns subset correct count.',
        ],
      },
    ]
  ),
  '2-0-2': detail(
    'Headers, cookies, CORS là nơi auth và browser security gặp nhau. Mục tiêu: CORS + cookie session hoạt động local và prod.',
    [
      {
        heading: 'Headers',
        items: [
          'Content-Type application/json charset utf-8.',
          'Authorization Bearer vs custom header.',
          'Cache-Control API no-store private.',
          'ETag conditional GET optional optimize.',
          'Security headers X-Content-Type-Options nosniff.',
        ],
      },
      {
        heading: 'Cookies',
        items: [
          'HttpOnly session cookie không đọc JS.',
          'Secure flag production HTTPS only.',
          'SameSite=Lax CSRF mitigation cookie.',
          'Max-Age vs Expires session length policy.',
          'Set-Cookie Domain path scope subdomains.',
        ],
      },
      {
        heading: 'CORS',
        items: [
          'Access-Control-Allow-Origin whitelist not * credentialed.',
          'Preflight OPTIONS 204 Allow-Methods Headers.',
          'Credentials include fetch frontend config.',
          'FastAPI CORSMiddleware allow_origins env list.',
          'Debug CORS failure browser network preflight.',
        ],
      },
      {
        heading: 'OpenAPI',
        items: [
          'FastAPI auto /docs Swagger UI local.',
          'Schema example response 200 documented.',
          'Export openapi.json commit or CI artifact.',
          'Client codegen typescript optional.',
          'Version openapi info.version semver API.',
        ],
      },
    ]
  ),
  '2-0-3': detail(
    'Contract ổn định giúp FE/BE song song — versioning tránh break app cũ. Mục tiêu: error JSON schema thống nhất mọi route.',
    [
      {
        heading: 'API contracts',
        items: [
          'Shared OpenAPI source truth review PR.',
          'Breaking change checklist field remove rename.',
          'Consumer driven contract test optional Pact.',
          'Mock server Prism from openapi dev FE.',
          'Changelog API markdown per release.',
        ],
      },
      {
        heading: 'Versioning',
        items: [
          'URL /v1/ vs header Accept versioning pick one.',
          'Deprecate sunset header Deprecation date.',
          'Parallel v1 v2 route share service layer.',
          'Mobile app long tail old version support.',
          'Document policy 6 month deprecation min.',
        ],
      },
      {
        heading: 'Error formats',
        items: [
          'RFC 7807 problem+json type title detail.',
          'Field errors array loc msg type validation.',
          'Stable error code enum CLIENT_VALIDATION.',
          'Never stack trace production response.',
          'Frontend map code → i18n user message.',
        ],
      },
    ]
  ),
  '2-1-0': detail(
    'Python typing và async giúp FastAPI scale I/O bound. Mục tiêu: endpoint async gọi DB + external API typed.',
    [
      {
        heading: 'Python typing',
        items: [
          'def fn(x: int) -> str mypy/pyright strict gradual.',
          'Optional Union Python 3.10+ | syntax.',
          'TypedDict response shape static check.',
          'Generic list[T] repository return type.',
          'Fix 5 Any usages concrete types codebase.',
        ],
      },
      {
        heading: 'Environments',
        items: [
          'venv python -m venv .venv activate.',
          'requirements.txt pin or poetry lock team standard.',
          'PYTHONPATH src layout package import clean.',
          '.env.example document vars no secrets.',
          'Match Python 3.11+ VPS Docker image.',
        ],
      },
      {
        heading: 'async/await',
        items: [
          'async def route await httpx.AsyncClient.',
          'Không await blocking open() — run_in_executor.',
          'SQLAlchemy async session 2.0 pattern.',
          'Concurrent gather two IO calls latency.',
          'Load test sync vs async route awareness qual.',
        ],
      },
    ]
  ),
  '2-1-1': detail(
    'FastAPI structure với Pydantic và DI giữ route mỏng. Mục tiêu: router module topics Depends get_db + get_current_user.',
    [
      {
        heading: 'Pydantic',
        items: [
          'BaseModel Field validation min_length pattern.',
          'model_config from_attributes ORM mode read.',
          'Create vs Read schema password write only.',
          'Validator email normalize lower strip.',
          'OpenAPI schema_extra example JSON.',
        ],
      },
      {
        heading: 'Routers',
        items: [
          'APIRouter prefix /topics tags topics.',
          'include_router app mount version.',
          'Status code response_model list generics.',
          'Dependency common pagination Params.',
          'Split routers by domain ≤300 lines file.',
        ],
      },
      {
        heading: 'Dependency injection',
        items: [
          'Depends(get_db) yield session finally close.',
          'Depends(get_current_user) raises 401.',
          'Nested Depends reuse permission check.',
          'Override Depends pytest fixture app.',
          'Document dependency graph one endpoint.',
        ],
      },
    ]
  ),
  '2-1-2': detail(
    'Layered architecture test được từng phần — fat route là tech debt. Mục tiêu: TopicService orchestrate repo + rules.',
    [
      {
        heading: 'Services',
        items: [
          'Business rule status transition doing→done valid.',
          'Raise domain exception service catch route HTTP map.',
          'No HTTP objects inside service pure Python.',
          'Transaction service method multiple repo calls.',
          'Unit test service mock repository.',
        ],
      },
      {
        heading: 'Repositories',
        items: [
          'SQL only repository — link DB module.',
          'Return domain dataclass not ORM optional.',
          'Interface inject test double.',
          'Query filter parameters typed.',
          'One repository per aggregate root.',
        ],
      },
      {
        heading: 'Separation of concerns',
        items: [
          'Route: parse HTTP, call service, return schema.',
          'Service: rules orchestration.',
          'Repo: persistence.',
          'Config settings pydantic-settings env.',
          'Folder layout app/api app/services app/repositories.',
        ],
      },
    ]
  ),
  '2-1-3': detail(
    'Upload và background work cần validation và queue awareness. Mục tiêu: upload PDF validate type/size + BackgroundTasks job.',
    [
      {
        heading: 'File uploads',
        items: [
          'UploadFile max size middleware check.',
          'Allowlist mime application/pdf image/jpeg.',
          'Store disk path uuid filename not user supplied.',
          'Virus scan hook awareness production.',
          'Return 413 Payload Too Large clear message.',
        ],
      },
      {
        heading: 'Background tasks',
        items: [
          'BackgroundTasks add_task process_embedding after response.',
          'Không dùng cho heavy job — Celery/RQ later.',
          'Task idempotent retry safe.',
          'Log task start fail duration.',
          'User poll status endpoint job_id pattern.',
        ],
      },
      {
        heading: 'Validation',
        items: [
          'Pydantic conint ge le bounds.',
          'Cross-field validator end_date after start.',
          'Sanitize filename path traversal block.',
          'Rate limit upload per user id.',
          'Test invalid file 400 not 500.',
        ],
      },
    ]
  ),
  '2-2-0': detail(
    'Auth bắt đầu từ hash password — JWT vs session trade-off cho SPA. Mục tiêu: register/login flow secure không lưu plain password.',
    [
      {
        heading: 'Password hashing',
        items: [
          'passlib bcrypt hashpw verify constant time.',
          'Never log password request body.',
          'Password min entropy policy zxcvbn optional.',
          'Migration rehash on login algorithm upgrade.',
          'Test verify wrong password fails.',
        ],
      },
      {
        heading: 'JWT vs sessions',
        items: [
          'JWT stateless access short 15m + refresh rotation.',
          'Session server store Redis revoke instant.',
          'JWT payload sub exp only no PII.',
          'HttpOnly cookie refresh XSS steal harder.',
          'Decision doc SPA same domain pick cookie session.',
        ],
      },
    ]
  ),
  '2-2-1': detail(
    'Authentication biết ai — authorization biết được làm gì. Mục tiêu: RBAC admin vs learner trên route PATCH progress.',
    [
      {
        heading: 'Authentication',
        items: [
          'OAuth2PasswordBearer token URL login.',
          'get_current_user decode JWT verify signature.',
          '401 WWW-Authenticate Bearer challenge.',
          'Logout invalidate refresh token server list.',
          'MFA awareness future not block MVP.',
        ],
      },
      {
        heading: 'Authorization',
        items: [
          'Check resource owner user_id match subject.',
          '403 when authenticated but not allowed.',
          'Policy function can_edit_topic(user, topic).',
          'Admin bypass role admin enum.',
          'Test user A cannot PATCH user B progress.',
        ],
      },
      {
        heading: 'RBAC',
        items: [
          'Roles table user_roles junction DB module.',
          'Permission strings topic:write optional fine grain.',
          'Default role learner register.',
          'Seed admin dev only env flag.',
          'Matrix role × endpoint markdown security doc.',
        ],
      },
    ]
  ),
  '2-2-2': detail(
    'Defense in depth — CORS, CSRF, rate limit bảo vệ public API. Mục tiêu: slowapi limit login + CSRF double cookie pattern sketch.',
    [
      {
        heading: 'Cookies',
        items: [
          'Session fixation regenerate id post login.',
          'Dual cookie access HttpOnly settings review.',
          'Subdomain cookie scope minimal.',
          'Logout clear cookie Set-Cookie expired.',
          'Inspect Set-Cookie browser devtools security tab.',
        ],
      },
      {
        heading: 'CSRF',
        items: [
          'SameSite Strict sensitive actions optional.',
          'CSRF token header X-CSRF-Token double submit.',
          'Skip CSRF pure Bearer API mobile ok.',
          'Test cross-origin POST blocked 403.',
          'Document when CSRF applies cookie auth.',
        ],
      },
      {
        heading: 'CORS & rate limiting',
        items: [
          'CORS not substitute auth — still need token.',
          'slowapi 5/minute /login IP+username.',
          '429 JSON consistent error format.',
          'Whitelist health check no limit.',
          'Monitor 429 spike attack vs legit.',
        ],
      },
    ]
  ),
  '2-2-3': detail(
    'Secrets và validation là OWASP top 10 baseline backend. Mục tiêu: pydantic input sanitize + env secrets không commit.',
    [
      {
        heading: 'Secrets',
        items: [
          'DATABASE_URL JWT_SECRET from env only.',
          '.gitignore .env pre-commit detect secrets.',
          'Rotate API key procedure doc.',
          'Docker secrets mount not ARG build.',
          'Audit repo history no leaked key.',
        ],
      },
      {
        heading: 'Input validation',
        items: [
          'Pydantic max length all strings.',
          'Reject unknown fields extra=forbid.',
          'SQL injection ORM parameterized only.',
          'Path param uuid validate format.',
          'File upload zip bomb size cap.',
        ],
      },
      {
        heading: 'OWASP basics',
        items: [
          'A01 broken access control — test horizontal priv esc.',
          'A02 crypto — TLS transit at rest DB encrypt optional.',
          'A03 injection — ORM + validation.',
          'A05 misconfig — disable debug prod.',
          'Checklist OWASP API top 10 skim mark N/A done.',
        ],
      },
    ]
  ),
  '2-3-0': detail(
    'Pytest coverage giúp refactor FastAPI an tâm — integration bắt wiring. Mục tiêu: 80% critical paths auth + CRUD tests.',
    [
      {
        heading: 'Pytest unit',
        items: [
          'Test service pure function mock repo MagicMock.',
          'pytest.mark.parametrize status transitions.',
          'Fixture conftest.py shared client.',
          'Coverage pytest-cov fail under threshold optional.',
          'Fast test suite <30s local dev loop.',
        ],
      },
      {
        heading: 'Integration tests',
        items: [
          'TestClient app post login get cookie.',
          'DB fixture rollback per test.',
          'Test OpenAPI schema 200 /openapi.json.',
          'Negative test 404 422 paths.',
          'CI parallel workers pytest-xdist optional.',
        ],
      },
    ]
  ),
  '2-3-1': detail(
    'Log structured và error nhất quán giúp debug prod nhanh. Mục tiêu: JSON log request_id + global exception handler.',
    [
      {
        heading: 'Logging',
        items: [
          'structlog or logging JSON stdout Docker.',
          'Levels INFO prod DEBUG dev only.',
          'Never log password token full PAN.',
          'Request middleware log method path duration_ms.',
          'Aggregate Loki/CloudWatch query example.',
        ],
      },
      {
        heading: 'Exceptions',
        items: [
          'Custom AppError code status message.',
          '@app.exception_handler map to JSON.',
          'Unhandled 500 log exc_info stack internal.',
          'ValidationError 422 uniform body.',
          'Alert Sentry capture_exception sample rate.',
        ],
      },
      {
        heading: 'Structured errors',
        items: [
          'Client sees code message fields[] only.',
          'Internal error_id uuid support reference.',
          'i18n message key optional future.',
          'Retryable flag 503 upstream LLM.',
          'Document error catalog wiki 10 codes.',
        ],
      },
    ]
  ),
  '2-3-2': detail(
    'Reliability patterns timeout/retry — concurrency bug hay gặp async. Mục tiêu: httpx call LLM timeout + tenacity retry 429.',
    [
      {
        heading: 'Timeouts',
        items: [
          'httpx timeout connect read write pool.',
          '504 Gateway Timeout upstream slow client.',
          'DB statement_timeout PostgreSQL ms.',
          'Graceful shutdown cancel in-flight asyncio.',
          'Test mock slow server triggers timeout.',
        ],
      },
      {
        heading: 'Retries',
        items: [
          'Retry idempotent GET only default.',
          'Exponential backoff jitter 429 503.',
          'Max attempts 3 then fail circuit.',
          'tenacity decorator log before sleep.',
          'Non-retry 400 validation fail fast.',
        ],
      },
      {
        heading: 'Concurrency basics',
        items: [
          'asyncio Semaphore limit 10 parallel LLM.',
          'Race update row SELECT FOR UPDATE.',
          'Thread pool CPU bound not block loop.',
          'Load test locust 50 rps find bottleneck.',
          'Document max workers Uvicorn prod.',
        ],
      },
    ]
  ),
  '2-3-3': detail(
    'Profile trước cache — DB thường là bottleneck đầu tiên. Mục tiêu: py-spy hoặc logging slow query + Redis cache GET topic list.',
    [
      {
        heading: 'API profiling',
        items: [
          'Middleware timing header Server-Timing.',
          'cProfile one endpoint script analysis.',
          'py-spy dump running container low overhead.',
          'Compare p95 latency before after fix.',
          'Flamegraph save portfolio perf case.',
        ],
      },
      {
        heading: 'DB bottlenecks',
        items: [
          'pg_stat_statements top total_time query.',
          'Missing index EXPLAIN seq scan fix link DB.',
          'Connection pool wait metric.',
          'N+1 sqlalchemy echo count queries fix joinedload.',
          'Read replica awareness read-heavy future.',
        ],
      },
      {
        heading: 'Caching basics',
        items: [
          'Redis cache-aside get set TTL 60s topic list.',
          'Invalidate key on PATCH progress.',
          'Cache stampede single flight lock optional.',
          'HTTP Cache-Control static OpenAPI long TTL.',
          'Measure hit rate metric cache effectiveness.',
        ],
      },
    ]
  ),
};
