import { detail } from './helpers.js';

export default {
  '1-0-0': detail(
    'SQL đọc/ghi là nền mọi feature data — sai JOIN là duplicate hoặc mất row. Mục tiêu: viết query 3 bảng không cần ORM.',
    [
      {
        heading: 'SELECT',
        items: [
          'SELECT cột cụ thể thay SELECT * trên bảng >20 cột.',
          'Alias AS cho expression và subquery.',
          'DISTINCT loại duplicate hàng hợp lệ.',
          'LIMIT/OFFSET pagination — note performance offset lớn.',
          'EXPLAIN (preview) một SELECT đơn giản trên PostgreSQL.',
        ],
      },
      {
        heading: 'WHERE',
        items: [
          'Index-friendly: cột trong WHERE không wrap function.',
          'AND/OR grouping parentheses rõ ràng.',
          'IN vs EXISTS — chọn EXISTS cho subquery lớn.',
          'BETWEEN date inclusive — timezone lưu UTC.',
          'Parameterized query $1 — không nối string SQL injection.',
        ],
      },
      {
        heading: 'ORDER BY',
        items: [
          'Sort cột indexed khi list lớn.',
          'NULLS FIRST/LAST explicit behavior.',
          'Multi-column sort priority: status, updated_at DESC.',
          'Stable sort pagination — thêm id tie-breaker.',
          'Benchmark ORDER BY trên 10k rows seed local.',
        ],
      },
      {
        heading: 'JOIN',
        items: [
          'INNER vs LEFT — khi nào giữ orphan rows.',
          'Join condition ON fk = pk — không quên predicate.',
          'Many-to-many qua bảng trung gian — ví dụ user_roles.',
          'Detect Cartesian product row count explosion.',
          'Viết query 2 JOIN lấy topic + module name cho Engineer Atlas schema giả định.',
        ],
      },
    ]
  ),
  '1-0-1': detail(
    'Aggregate đúng grain tránh số liệu sai dashboard. Mục tiêu: GROUP BY + HAVING một metric thật (count theo status).',
    [
      {
        heading: 'GROUP BY',
        items: [
          'Mọi cột SELECT non-aggregate phải có trong GROUP BY.',
          'GROUP BY 1 shorthand — dùng cẩn thận readability.',
          'Rollup nhiều dimension: module_id, week_id.',
          'Grouping sets awareness (optional advanced).',
          'Fix một query bug “column must appear in GROUP BY”.',
        ],
      },
      {
        heading: 'HAVING',
        items: [
          'HAVING filter sau aggregate — WHERE filter trước.',
          'HAVING COUNT(*) > 5 vs subquery equivalent.',
          'Không lạm dụng HAVING cho điều kiện có thể WHERE.',
          'Combine HAVING với JOIN aggregated alias.',
          'Report: topics done per user HAVING completion_rate > 0.8.',
        ],
      },
      {
        heading: 'Aggregate functions',
        items: [
          'COUNT(*) vs COUNT(column) NULL behavior.',
          'SUM/AVG/MIN/MAX trên numeric — cast nếu cần.',
          'COUNT(DISTINCT user_id) active learners.',
          'STRING_AGG hoặc array_agg PostgreSQL list ids.',
          'Validate aggregate kết quả tay trên 5 rows sample.',
        ],
      },
    ]
  ),
  '1-0-2': detail(
    'Subquery và CTE giúp query phức tạp đọc được và tái sử dụng. Mục tiêu: refactor nested SELECT thành CTE rõ ràng.',
    [
      {
        heading: 'Subqueries',
        items: [
          'Scalar subquery trong SELECT — đảm bảo 1 row.',
          'IN (subquery) vs JOIN performance note.',
          'Correlated subquery — khi nào chậm.',
          'EXISTS anti-join pattern users without progress.',
          'Rewrite một subquery thành JOIN và compare EXPLAIN.',
        ],
      },
      {
        heading: 'CTE',
        items: [
          'WITH active AS (...) SELECT FROM active readability.',
          'Multiple CTE chain step-by-step pipeline.',
          'CTE không tự optimize — PostgreSQL inline/materialize.',
          'Recursive CTE tree category (optional sketch).',
          'Document một CTE dùng trong app view/report.',
        ],
      },
      {
        heading: 'Window functions',
        items: [
          'ROW_NUMBER() PARTITION BY user ORDER BY date.',
          'RANK vs DENSE_RANK ties handling.',
          'LAG/LEAD so sánh row trước sau.',
          'Running SUM OVER (ORDER BY) cumulative progress.',
          'Query: top 3 topics per module by time spent window fn.',
        ],
      },
    ]
  ),
  '1-0-3': detail(
    'NULL và constraints bảo vệ data integrity từ đầu. Mục tiêu: schema PostgreSQL với PK/FK/NOT NULL hợp lý.',
    [
      {
        heading: 'NULL',
        items: [
          'IS NULL / IS NOT NULL — không dùng = NULL.',
          'COALESCE default display value.',
          'NULL trong UNIQUE constraint PostgreSQL behavior.',
          'COUNT(*) includes NULL rows vs COUNT(col).',
          'Migration backfill NULL trước SET NOT NULL.',
        ],
      },
      {
        heading: 'Constraints',
        items: [
          'PRIMARY KEY surrogate uuid vs serial trade-off.',
          'UNIQUE email partial index WHERE deleted_at IS NULL.',
          'CHECK constraint status IN enum values.',
          'FOREIGN KEY ON DELETE CASCADE vs RESTRICT document.',
          'Name constraints explicit migration review.',
        ],
      },
      {
        heading: 'PostgreSQL data types',
        items: [
          'timestamptz lưu UTC — app format local.',
          'text vs varchar — PostgreSQL prefer text.',
          'jsonb index GIN query path.',
          'numeric money — dùng numeric không float.',
          'uuid gen_random_uuid() default pk.',
        ],
      },
    ]
  ),
  '1-1-0': detail(
    'ERD là contract giữa product và database — sai key là refactor đau. Mục tiêu: vẽ ERD AI Knowledge Assistant (3–5 entities).',
    [
      {
        heading: 'ERD',
        items: [
          'Tool: dbdiagram.io hoặc draw.io notation crow foot.',
          'Entity = noun business: User, Document, Chunk.',
          'Attribute type và nullable trên diagram.',
          'Version ERD trong repo docs/schema.md.',
          'Walkthrough stakeholder 5 phút giải thích diagram.',
        ],
      },
      {
        heading: 'Entities',
        items: [
          'Mỗi entity một responsibility — không mega table.',
          'Soft delete deleted_at vs hard delete policy.',
          'Audit created_at/updated_at mọi bảng mutable.',
          'Natural key vs surrogate — email natural, id surrogate.',
          'List 3 entity core cho sprint DB tháng 2.',
        ],
      },
      {
        heading: 'Primary keys',
        items: [
          'Single column PK — composite PK hiếm khi cần.',
          'UUID client generate vs DB default.',
          'Never reuse PK — immutable identity.',
          'PK index automatic — verify pg_catalog.',
          'Migration add PK bảng legacy without — plan downtime.',
        ],
      },
      {
        heading: 'Foreign keys',
        items: [
          'FK column type khớp referenced PK type.',
          'Index FK column join performance.',
          'ON UPDATE CASCADE rarely — document if used.',
          'Deferrable FK bulk load (awareness).',
          'Diagram label cardinality 1:N trên mỗi quan hệ.',
        ],
      },
    ]
  ),
  '1-1-1': detail(
    'Cardinality đúng mô hình hóa quan hệ thực tế — M:N luôn cần bảng trung. Mục tiêu: implement users ↔ roles M:N.',
    [
      {
        heading: 'One-to-many',
        items: [
          'FK ở phía “many”: order.user_id → users.id.',
          'Không duplicate parent columns trên child rows.',
          'Fetch children WHERE parent_id = $1 index hit.',
          'Cascade delete children khi xóa parent? product decision.',
          'Example: module 1:N topics trong schema học.',
        ],
      },
      {
        heading: 'Many-to-many',
        items: [
          'Junction table user_topics (user_id, topic_id) composite UNIQUE.',
          'Payload trên junction: status, completed_at.',
          'Query M:N 2 JOIN qua junction.',
          'Avoid M:N fake bằng array column — normalize.',
          'Seed data junction 10 rows test integrity.',
        ],
      },
      {
        heading: 'Join tables',
        items: [
          'Surrogate id junction optional — composite PK ok.',
          'Extra columns chỉ thuộc relationship không entity.',
          'Historical junction effective_date (advanced).',
          'ORM secondary relationship config preview.',
          'EXPLAIN JOIN 3 tables qua junction.',
        ],
      },
    ]
  ),
  '1-1-2': detail(
    'Normalization giảm anomaly — denormalize có chủ đích sau. Mục tiêu: đưa bảng về 3NF một case denormalized sai.',
    [
      {
        heading: 'Normalization',
        items: [
          '1NF: atomic columns — không multi-value phone list string.',
          '2NF: không partial dependency composite key.',
          '3NF: không transitive dependency city → zip → state.',
          'Khi denormalize cache count — trigger hoặc app sync.',
          'Before/after table split exercise một spreadsheet import.',
        ],
      },
      {
        heading: 'Constraints',
        items: [
          'UNIQUE business key song song surrogate id.',
          'NOT NULL required fields product rules.',
          'CHECK enforce enum domain small set.',
          'Defer constraint add validate existing data first.',
          'Migration rollback plan drop constraint.',
        ],
      },
      {
        heading: 'Referential integrity',
        items: [
          'Orphan scan LEFT JOIN NULL find broken FK.',
          'FK enable TRUNCATE caution CASCADE.',
          'Soft delete parent — FK still valid or nullify?',
          'Integration test insert child invalid parent fails.',
          'Document integrity rules README data layer.',
        ],
      },
    ]
  ),
  '1-1-3': detail(
    'Schema từ requirements tránh over-engineering và thiếu cột audit. Mục tiêu: user story → tables + columns list.',
    [
      {
        heading: 'Schema design từ business requirements',
        items: [
          'Extract nouns/verbs user story → entities/relationships.',
          'Non-functional: retention, GDPR delete, multi-tenant?',
          'Naming snake_case plural tables convention team.',
          'Version schema v1 scope — defer nice-to-have tables.',
          'Review ERD với checklist acceptance criteria story.',
        ],
      },
      {
        heading: 'Workflow',
        items: [
          'Interview PM 5 câu cardinality và lifecycle.',
          'Prototype 5 queries app cần trước lock schema.',
          'Migration v1 create tables — seed dev data.',
          'Change request process alter migration Alembic.',
          'Sign-off document tables/columns glossary.',
        ],
      },
      {
        heading: 'Validation',
        items: [
          'Sample load CSV realistic volume 1k rows.',
          'Edge case: empty string vs NULL policy.',
          'Concurrent insert same unique — test race.',
          'Backup restore empty DB apply migrations fresh.',
          'Link schema doc từ Engineer Atlas README.',
        ],
      },
    ]
  ),
  '1-2-0': detail(
    'Index sai = full table scan — EXPLAIN là kỹ năng DBA junior. Mục tiêu: giảm cost query list 10x bằng index đúng.',
    [
      {
        heading: 'Indexes',
        items: [
          'B-tree default equality range — user_id, created_at.',
          'Composite index (a,b) vs two single — left prefix rule.',
          'Partial index WHERE status = active smaller faster.',
          'Không index mọi cột — write amplification.',
          'pg_indexes liệt kê index bảng progress.',
        ],
      },
      {
        heading: 'EXPLAIN ANALYZE',
        items: [
          'EXPLAIN (ANALYZE, BUFFERS) SELECT ... actual timings.',
          'Seq Scan red flag trên bảng lớn.',
          'Index Scan vs Bitmap Heap Scan đọc ý nghĩa.',
          'Rows estimate vs actual — run ANALYZE table.',
          'Save before/after plan text vào perf note.',
        ],
      },
      {
        heading: 'Query plans',
        items: [
          'Nested Loop vs Hash Join vs Merge Join khi nào.',
          'Sort node expensive — index ORDER BY avoid.',
          'Limit pushdown optimization awareness.',
          'Prepared statements plan cache PostgreSQL.',
          'Kill N+1 app — một JOIN thay 100 queries.',
        ],
      },
    ]
  ),
  '1-2-1': detail(
    'Transaction đảm bảo transfer/upsert atomic — isolation hiểu tránh bug hiếm. Mục tiêu: wrap 2 writes một transaction rollback test.',
    [
      {
        heading: 'Transactions',
        items: [
          'BEGIN; UPDATE ...; INSERT ...; COMMIT;',
          'ROLLBACK on business validation fail.',
          'Savepoint partial rollback nested logic.',
          'App layer SQLAlchemy session.begin().',
          'Test: kill connection mid transaction — no partial commit.',
        ],
      },
      {
        heading: 'ACID',
        items: [
          'Atomicity all or nothing transfer balance example.',
          'Consistency constraints satisfied post commit.',
          'Isolation concurrent sessions behavior.',
          'Durability WAL fsync — trust after COMMIT ok.',
          'Explain ACID một ví dụ chat message + thread update.',
        ],
      },
      {
        heading: 'Isolation & locks',
        items: [
          'READ COMMITTED default PostgreSQL phantom read.',
          'SELECT FOR UPDATE row lock checkout inventory.',
          'Deadlock log — retry exponential app.',
          'Long transaction block vacuum — keep short.',
          'Simulate 2 tabs update same row — observe behavior.',
        ],
      },
    ]
  ),
  '1-2-2': detail(
    'Pool và query tune giữ API nhanh dưới load. Mục tiêu: config pool size và fix một slow query production-like.',
    [
      {
        heading: 'Connection pooling',
        items: [
          'PgBouncer transaction mode vs session — FastAPI async note.',
          'pool_size max overflow SQLAlchemy settings.',
          'Connection leak — always close/session context manager.',
          'Monitor active connections pg_stat_activity.',
          'Rule: pool < max_connections PostgreSQL * 0.7.',
        ],
      },
      {
        heading: 'Query optimization',
        items: [
          'Select only needed columns reduce IO.',
          'Pagination keyset WHERE id > $cursor not OFFSET.',
          'Batch INSERT executemany 500 rows.',
          'Materialized view refresh schedule heavy report.',
          'Document top 3 slow queries và fix applied.',
        ],
      },
    ]
  ),
  '1-2-3': detail(
    'Backup và migration an toàn — mất data không recover được. Mục tiêu: restore dump lên DB dev và verify row count.',
    [
      {
        heading: 'Backup',
        items: [
          'pg_dump custom format -Fc file backup.',
          'Schedule cron nightly off-peak VPS.',
          'Encrypt backup at rest gpg or cloud KMS.',
          'Test restore quarterly drill calendar.',
          'Retain 7 daily 4 weekly policy document.',
        ],
      },
      {
        heading: 'Restore',
        items: [
          'pg_restore -d dbname --clean cautious prod.',
          'Restore to new DB rename swap blue-green.',
          'Verify checksum row count critical tables.',
          'Point-in-time recovery WAL awareness.',
          'Runbook restore steps markdown ops.',
        ],
      },
      {
        heading: 'Migrations & data safety',
        items: [
          'Expand-contract pattern rename column safe.',
          'Backfill batch UPDATE LIMIT sleep avoid lock.',
          'Never edit applied migration — new revision forward.',
          'Downgrade script optional but document manual.',
          'Pre-prod backup mandatory before migrate prod.',
        ],
      },
    ]
  ),
  '1-3-0': detail(
    'ORM map object ↔ SQL — lạm dụng lazy load gây N+1. Mục tiêu: model relationships load eager một endpoint.',
    [
      {
        heading: 'SQLAlchemy ORM',
        items: [
          'Declarative Base model __tablename__ columns.',
          'Session query 2.0 style select(Model).where().',
          'flush vs commit — when id generated.',
          'Relationship back_populates both sides.',
          'Map Engineer Atlas User ↔ Progress entities sketch.',
        ],
      },
      {
        heading: 'Relationships',
        items: [
          'relationship lazy select vs joinedload eager.',
          'cascade delete-orphan children config.',
          'Many-to-many secondary table parameter.',
          'Hybrid property computed column optional.',
          'Debug echo=True SQL log dev only.',
        ],
      },
    ]
  ),
  '1-3-1': detail(
    'Alembic version schema git như code — drift là incident. Mục tiêu: revision add column + seed script idempotent.',
    [
      {
        heading: 'Alembic migrations',
        items: [
          'alembic revision --autogenerate review diff manual.',
          'upgrade head CI migrate test DB.',
          'Offline SQL generation awareness.',
          'Multiple heads merge revision fix.',
          'Stamp baseline existing DB once.',
        ],
      },
      {
        heading: 'Seed data',
        items: [
          'Seed dev modules/topics JSON import script.',
          'Idempotent INSERT ON CONFLICT DO NOTHING.',
          'Separate seed from migration data vs structure.',
          'Fixture pytest factory_boy optional.',
          'Never seed prod secrets — env specific.',
        ],
      },
    ]
  ),
  '1-3-2': detail(
    'Repository pattern tách SQL khỏi route — test dễ mock. Mục tiêu: TopicRepository với list/get/update status.',
    [
      {
        heading: 'Repository/data access patterns',
        items: [
          'Interface Protocol get_by_id list_by_user.',
          'Implementation SQLAlchemy session inject.',
          'Unit of Work session per request FastAPI Depends.',
          'DTO return không leak ORM entity ra API nếu policy.',
          'Swap in-memory repo test không DB.',
        ],
      },
      {
        heading: 'Practice',
        items: [
          'One method one query — no business logic in repo.',
          'Pagination params dataclass PageResult.',
          'Transaction boundary service layer not repo.',
          'Log slow repo method >100ms.',
          'Diagram layer Controller → Service → Repository → DB.',
        ],
      },
    ]
  ),
  '1-3-3': detail(
    'Integration test DB thật bắt lỗi constraint — pgvector mở đường RAG. Mục tiêu: test CRUD pytest + embedding column insert.',
    [
      {
        heading: 'Integration tests',
        items: [
          'pytest fixture PostgreSQL docker testcontainers.',
          'Rollback transaction per test isolation.',
          'Test FK violation raises IntegrityError.',
          'Factory create user + progress assert join.',
          'CI service postgres:15 health wait.',
        ],
      },
      {
        heading: 'pgvector fundamentals',
        items: [
          'CREATE EXTENSION vector; column embedding vector(1536).',
          "INSERT vector literal '[0.1,...]'::vector.",
          'ORDER BY embedding <=> query LIMIT 5 cosine.',
          'Index ivfflat lists probes tuning intro.',
          'Link chunk table design forward RAG module.',
        ],
      },
    ]
  ),
};
