import { detail } from './helpers.js';

/** Core Engineering Knowledge Expansion — append-only topic IDs (see content.js). */

export default {
  '0-4-0': detail(
    'Web Storage là persistence phía client — chọn sai loại storage gây lộ dữ liệu hoặc mất state. Mục tiêu: so sánh localStorage, sessionStorage, cookies; lab playground + migration thật trong project (Engineer Atlas dùng localStorage cho progress — phân tích, không thay thế cloud target).',
    [
      {
        heading: 'Web Storage API',
        items: [
          'localStorage vs sessionStorage — persistence lifecycle (tab vs origin).',
          'Refresh, đóng tab, tab mới, restart browser — ghi bảng hành vi.',
          'Storage isolation theo origin; không chia sẻ cross-origin.',
          'API: setItem, getItem, removeItem, clear, key — demo từng method.',
          'JSON.stringify / JSON.parse — try/catch khi parse invalid JSON.',
          'QuotaExceededError và xử lý dữ liệu corrupt.',
        ],
      },
      {
        heading: 'Browser storage comparison',
        items: [
          'So sánh: localStorage, sessionStorage, cookies, IndexedDB (overview), in-memory state.',
          'Browser storage vs cloud database (Firestore) — trust boundary.',
          'Chọn đúng loại cho: UI prefs, draft form, session token (không!), cache nhỏ.',
          'Activity: decision matrix 5 tình huống app thật của bạn.',
        ],
      },
      {
        heading: 'Security & browser behavior',
        items: [
          'Same-Origin Policy ảnh hưởng storage như thế nào (không lặp lại CORS module — chỉ storage angle).',
          'Storage quota và storage event (sync giữa tab cùng origin).',
          'XSS đọc localStorage — không lưu secret/PII trong Web Storage.',
          'Cookie HttpOnly, Secure, SameSite — khi auth phải dùng cookie/server.',
          'Phân biệt CORS (cross-origin request) vs CSRF (cross-site action) — 1 câu mỗi loại.',
        ],
      },
      {
        heading: 'Lab 01 — Browser Storage Playground',
        items: [
          'HTML/CSS/JS app: save/load field, toggle localStorage ↔ sessionStorage.',
          'Refresh + verify data; mở 2 tab cùng origin — quan sát storage event.',
          'Clear + hiển thị trạng thái storage trên UI.',
          'Evidence: repo hoặc folder trong learning-python / portfolio.',
        ],
      },
      {
        heading: 'Lab 02 — Storage migration',
        items: [
          'Liệt kê localStorage keys trong một project (vd. theme, sidebar prefs).',
          'Phân tích case chuyển sessionStorage khi cần tab-scoped.',
          'Refactor read/write/clear + migration key version (v1 → v2).',
          'Test: refresh, đóng tab, logout flow (nếu có).',
        ],
      },
      {
        heading: 'Evidence & completion',
        items: [
          'GitHub commit + demo HTML hoặc README lifecycle diagram.',
          'Screenshots 2 tab + sau refresh.',
          'Completion: giải thích được localStorage vs sessionStorage vs cookies và chọn an toàn.',
        ],
      },
    ],
    { moduleKind: 'core', priority: 'high', durationEstimate: '3–5 giờ', expansionPhase: 1 },
  ),
  '0-4-1': detail(
    'Stack, heap, GC và event loop giải thích jank và memory leak — bổ sung cho tuần React performance, không thay checklist event loop cơ bản. Mục tiêu: quan sát call stack, tạo/fix leak đơn giản, profile Memory tab.',
    [
      {
        heading: 'Stack vs heap & references',
        items: [
          'Stack (call frames) vs heap (objects) — mental model JavaScript.',
          'Value vs reference — copy object vs primitive.',
          'Call stack overflow vs heap growth — ví dụ recursion.',
          'Activity: sketch stack khi gọi nested function 3 cấp.',
        ],
      },
      {
        heading: 'Garbage collection & leaks',
        items: [
          'Reachability và GC — khi nào object bị thu hồi.',
          'Leak pattern: detached DOM, forgotten interval, closure giữ reference lớn.',
          'Tạo leak cố ý → Memory snapshot → fix.',
          'Evidence: before/after heap snapshot screenshot.',
        ],
      },
      {
        heading: 'Event loop & profiling',
        items: [
          'Event loop: macrotask, microtask, render — liên hệ long task đã học FE.',
          'Performance/Memory profiling DevTools — 1 recording có long task.',
          'Runtime experiment notes: 5 bullet quan sát thực tế.',
        ],
      },
    ],
    { moduleKind: 'core', priority: 'medium', durationEstimate: '1 tuần part-time', expansionPhase: 3 },
  ),
  '1-4-0': detail(
    'Bổ sung chiều sâu interview cho Database module — giả định đã học SQL/JOIN/index cơ bản. Mục tiêu: 10k+ rows, EXPLAIN ANALYZE, N+1 reproduce & fix, pagination/filtering có index.',
    [
      {
        heading: 'Relational model refresh (lab context)',
        items: [
          'PK/FK và normalization — schema mẫu orders + line_items + users.',
          'JOIN types trong query thực tế — không lý thuyết lại tuần SQL Foundations.',
          'Activity: ERD nhỏ cho lab dataset.',
        ],
      },
      {
        heading: 'Index & query plans',
        items: [
          'B-tree index, composite index — chọn cột filter/sort.',
          'EXPLAIN / EXPLAIN ANALYZE — đọc seq scan vs index scan.',
          'Import ≥10.000 rows — so sánh query có/không index (timing ghi lại).',
          'Pagination OFFSET vs keyset — trade-off performance.',
        ],
      },
      {
        heading: 'N+1 problem',
        items: [
          'Tái hiện N+1 với ORM hoặc loop query trong script.',
          'Fix bằng JOIN hoặc eager load — đo số query trước/sau.',
          'Evidence: SQL scripts + số query log.',
        ],
      },
      {
        heading: 'Connection pooling (intro)',
        items: [
          'Vì sao pool tồn tại — không deep config production.',
          'Link tới capstone FastAPI + PostgreSQL pool settings.',
        ],
      },
    ],
    { moduleKind: 'core', priority: 'critical', durationEstimate: '1–2 tuần', expansionPhase: 2 },
  ),
  '1-4-1': detail(
    'Transactions và isolation — mở rộng tuần PostgreSQL ACID, tập trung lab concurrency. Mục tiêu: dirty/non-repeatable/phantom read, deadlock, race condition, FastAPI transaction boundary.',
    [
      {
        heading: 'ACID & transaction control',
        items: [
          'BEGIN, COMMIT, ROLLBACK — script psql 2 session.',
          'Isolation levels: READ COMMITTED, REPEATABLE READ — quan sát khác biệt.',
          'Dirty read, non-repeatable read, phantom read — 1 ví dụ mỗi loại (hoặc giải thích vì sao PG không dirty read).',
        ],
      },
      {
        heading: 'Locking & concurrency',
        items: [
          'Optimistic vs pessimistic locking — khi nào dùng.',
          'Row-level lock, deadlock — mô phỏng 2 transaction update cùng row.',
          'Lost update và race condition — fix bằng transaction hoặc version column.',
        ],
      },
      {
        heading: 'FastAPI + PostgreSQL lab',
        items: [
          'Service method với session transaction — commit/rollback on error.',
          'Test concurrent requests (2 terminal curl) — ghi kết quả.',
          'Evidence: SQL scripts + transaction experiment notes.',
        ],
      },
    ],
    { moduleKind: 'core', priority: 'high', durationEstimate: '1 tuần', expansionPhase: 2 },
  ),
  '2-5-0': detail(
    'OOP và SOLID intro phục vụ đọc code FastAPI/React class component legacy — không thay Python typing tuần FastAPI. Mục tiêu: class design học sinh/lớp, composition vs inheritance, DI intro TS/Python.',
    [
      {
        heading: 'OOP core',
        items: [
          'Class, object, constructor — ví dụ TypeScript hoặc Python.',
          'Encapsulation, abstraction, inheritance, polymorphism — 1 ví dụ mỗi khái niệm.',
          'Interface / abstract class (TS) hoặc ABC (Python) — khi nào cần.',
          'Composition vs inheritance — refactor ví dụ “is-a” sai thành “has-a”.',
        ],
      },
      {
        heading: 'SOLID & DI (introduction)',
        items: [
          'SRP và DIP — áp dụng vào service class nhỏ.',
          'Dependency Injection manual — inject repository vào service.',
          'Exception handling trong domain layer — không nuốt lỗi.',
          'Practice: thiết kế Student/Classroom classes + README.',
        ],
      },
    ],
    { moduleKind: 'core', priority: 'high', durationEstimate: '1 tuần', expansionPhase: 1 },
  ),
  '2-5-1': detail(
    'DSA cho interview readiness — song song roadmap, không thay CS degree. Mục tiêu: 15–20 Easy, Big O giải thích, implement Stack/Queue/Linked List/HashMap đơn giản.',
    [
      {
        heading: 'Complexity & structures',
        items: [
          'Big O time/space — phân tích 3 hàm của bạn.',
          'Array vs linked list — insert/delete trade-offs.',
          'Stack, queue — implement array-based.',
          'HashMap/hash table — collision concept; Map/ dict usage.',
          'Set vs Map — khi nào dùng.',
        ],
      },
      {
        heading: 'Patterns & algorithms',
        items: [
          'Binary search, two pointers, sliding window — 1 bài mỗi pattern.',
          'Sorting/searching — biết complexity sort mặc định runtime.',
          'Recursion — base case + stack depth awareness.',
        ],
      },
      {
        heading: 'Practice & evidence',
        items: [
          'Giải 15–20 bài Easy (LeetCode/CodeWars) — ghi complexity mỗi bài.',
          'GitHub repo solutions + notes so sánh cấu trúc dữ liệu.',
          'Không auto-mark done — tick subtopic khi bài tương ứng xong.',
        ],
      },
    ],
    { moduleKind: 'core', priority: 'high', durationEstimate: '2–3 tuần', expansionPhase: 3 },
  ),
  '2-6-0': detail(
    'Security cross-stack — bổ sung XSS/CSRF/CORS tuần FE production và Auth tuần BE; một lab tích hợp React + FastAPI. Mục tiêu: auth vs authz, parameterized SQL, token storage an toàn, OWASP overview.',
    [
      {
        heading: 'Auth models',
        items: [
          'Authentication vs authorization — ví dụ RBAC capstone.',
          'Cookies/sessions vs JWT — storage location và XSS risk.',
          'Secure token handling — không localStorage cho refresh token nhạy cảm.',
          'HTTPS/TLS overview — link tuần infra TLS.',
        ],
      },
      {
        heading: 'Attack surfaces',
        items: [
          'CSRF scenario analysis — mitigations đã học + 1 lab form.',
          'XSS stored/reflected — sanitize output.',
          'CORS misconfig vs CSRF — tham chiếu module CORS (0-0-4), không học lại từ đầu.',
          'SQL injection — parameterized queries SQLAlchemy/text() an toàn.',
        ],
      },
      {
        heading: 'Labs & OWASP',
        items: [
          'Demo CORS + credentials với FastAPI CORSMiddleware (local).',
          'Checklist auth state storage cho app của bạn.',
          'OWASP Top 10 overview — đánh dấu 3 risk relevant stack bạn.',
          'Evidence: security lab notes + mitigation checklist.',
        ],
      },
    ],
    { moduleKind: 'core', priority: 'critical', durationEstimate: '1–2 tuần', expansionPhase: 1 },
  ),
  '2-6-1': detail(
    'Kiến trúc Router → Service → Repository — align với FastAPI tuần hiện có, thêm transaction boundary và lifecycle. Mục tiêu: diagram + code mẫu DI session, middleware, request lifecycle.',
    [
      {
        heading: 'Patterns & lifecycle',
        items: [
          'IoC và DI trong FastAPI Depends — map tới Unit OOP.',
          'Service layer vs repository — trách nhiệm từng lớp.',
          'Middleware — logging, request id, timing.',
          'Request lifecycle: ASGI → router → deps → service → repo → DB.',
        ],
      },
      {
        heading: 'Transactions & components',
        items: [
          'Transaction boundary ở service — một use-case một transaction.',
          'Transaction propagation (conceptual) — nested call awareness.',
          'Component lifecycle (React) vs request lifecycle (API) — 1 đoạn so sánh.',
        ],
      },
      {
        heading: 'Practice & evidence',
        items: [
          'Refactor hoặc scaffold API nhỏ Router → Service → Repository.',
          'Architecture diagram (draw.io/excalidraw) + link GitHub.',
          'Completion: trace một POST request qua các layer.',
        ],
      },
    ],
    { moduleKind: 'core', priority: 'medium', durationEstimate: '1 tuần', expansionPhase: 3 },
  ),
};
