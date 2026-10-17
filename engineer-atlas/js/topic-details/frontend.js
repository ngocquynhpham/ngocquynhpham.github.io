import { detail } from './helpers.js';

export default {
  '0-0-0': detail(
    'Nền tảng markup và layout trước khi đi sâu DOM, performance hay React. Mục tiêu: trang đọc được bằng cả mắt, bàn phím và trình đọc màn hình.',
    [
      {
        heading: 'Semantic HTML',
        items: [
          'Dùng đúng landmark: header, nav, main, footer, section, article — không div soup.',
          'Heading một cấp một lần (h1 → h2 → h3), không nhảy cấp vì styling.',
          'Nút hành động dùng button; điều hướng dùng a với href có nghĩa.',
          'Form: label gắn input (for/id hoặc wrap), fieldset/legend cho nhóm.',
          'img có alt mô tả nội dung; bảng chỉ cho dữ liệu tabular, không layout.',
        ],
      },
      {
        heading: 'Responsive CSS',
        items: [
          'meta viewport; thiết kế mobile-first rồi mở rộng breakpoint.',
          'Layout bằng flex/grid thay vì width cố định.',
          'Typography và spacing co giãn (rem, clamp, fluid type nếu cần).',
          'Ảnh responsive: max-width 100%, srcset/picture khi nhiều density.',
          'Kiểm tra overflow ngang và touch target tối thiểu ~44px.',
        ],
      },
      {
        heading: 'Accessibility & WCAG',
        items: [
          'Tab qua toàn trang: focus visible, không keyboard trap.',
          'Contrast chữ/nền đạt mức dùng hàng ngày (hướng WCAG 2.2 AA).',
          'Tên accessible cho control (aria-label khi không có text hiển thị).',
          'Thông báo lỗi form rõ ràng, liên kết label ↔ input ↔ error.',
          'Smoke test: VoiceOver/NVDA với một flow chính của trang.',
        ],
      },
    ]
  ),
  '0-0-1': detail(
    'Hiểu pipeline render giúp debug jank và tối ưu trước khi blame React. Mục tiêu: đọc Performance panel và biết layout/paint/composite đang tốn ở đâu.',
    [
      {
        heading: 'DOM',
        items: [
          'Vẽ sơ đồ cây DOM của một trang portfolio: node type, depth, số lượng element.',
          'document.querySelector vs getElementById — khi nào reflow đắt hơn.',
          'MutationObserver: log thay đổi subtree khi toggle accordion.',
          'So sánh innerHTML vs createElement — bảo mật và parse cost.',
          'DevTools Elements: highlight node, scroll into view, break on subtree modified.',
        ],
      },
      {
        heading: 'CSSOM',
        items: [
          'Liệt kê thứ tự cascade: inline, id, class, tag — một ví dụ specificity cụ thể.',
          'Blocked rendering: @import vs link rel=stylesheet trong head.',
          'Computed styles: tại sao width 100% không full như mong đợi.',
          'will-change và contain — chỉ bật khi đo được, tránh overuse.',
          'Ghi chú selector phức tạp (>3 cấp) cần refactor trong codebase.',
        ],
      },
      {
        heading: 'Critical rendering path',
        items: [
          'Thứ tự: HTML → DOM, CSS → CSSOM, Render Tree → Layout → Paint.',
          'Đo First Contentful Paint trước/sau defer non-critical CSS.',
          'Font loading: font-display swap và flash of unstyled text.',
          'Script async/defer/module — impact lên DOMContentLoaded vs load.',
          'Viết 5 bullet “bottleneck CRP” cho trang demo thật của bạn.',
        ],
      },
      {
        heading: 'Layout, paint, composite',
        items: [
          'Phân biệt layout trigger (width, top) vs paint-only (color) vs composite (transform).',
          'Layers panel: xem promotion do transform/opacity.',
          'Tránh forced sync layout: đọc offsetHeight sau khi ghi style trong loop.',
          'Reproduce layout thrashing một lần, fix bằng batch read/write.',
          'Recording Performance: đếm Layout và Paint events trong 3s interaction.',
        ],
      },
    ]
  ),
  '0-0-2': detail(
    'Mọi API call và asset đều đi qua network stack — sai caching hoặc DNS là chậm toàn app. Mục tiêu: đọc waterfall và quyết định cache/CDN hợp lý.',
    [
      {
        heading: 'HTTP',
        items: [
          'Giải thích request/response: method, path, status, body — trace một GET thật.',
          'Conditional requests: ETag và If-None-Match → 304 trong Network tab.',
          'Cache-Control: max-age vs no-store cho HTML vs hashed assets.',
          'HTTP/2 multiplex — nhiều request cùng origin không còn 6-connection cap.',
          'Ghi lại status code phù hợp cho lỗi client (4xx) vs server (5xx) trong API giả định.',
        ],
      },
      {
        heading: 'DNS',
        items: [
          'Resolve một domain: A/AAAA record bằng dig hoặc DevTools.',
          'DNS prefetch/preconnect trong head — khi nào đáng thêm.',
          'Hiểu TTL ảnh hưởng deploy DNS mới.',
          'Subdomain vs path routing cho CDN origin.',
          'Checklist pre-launch: apex, www, CNAME chain không loop.',
        ],
      },
      {
        heading: 'TLS',
        items: [
          'Handshake tóm tắt: certificate, cipher, TLS 1.2 vs 1.3 latency.',
          'Mixed content: block HTTP asset trên HTTPS page — fix một ví dụ.',
          'Security tab DevTools: cert expiry, chain trust.',
          'HSTS — browser nhớ chỉ HTTPS cho domain.',
          'Liệt kê 3 lỗi TLS thường gặp khi deploy VPS lần đầu.',
        ],
      },
      {
        heading: 'Browser caching, CDN, DevTools Network',
        items: [
          'Phân biệt memory cache vs disk cache trong Size column.',
          'CDN: cache hit, edge location — test bằng curl -I hoặc response headers.',
          'Disable cache vs hard reload — khi debug vs khi đo performance.',
          'Throttling: Fast 3G replay một trang nặng, note TTFB vs download.',
          'Export HAR một session login flow, tìm request redundant.',
        ],
      },
    ]
  ),
  '0-0-3': detail(
    'Chọn rendering strategy ảnh hưởng SEO, TTFB và complexity React. Mục tiêu: biết khi nào CSR đủ, khi nào cần SSR/SSG/RSC.',
    [
      {
        heading: 'CSR',
        items: [
          'Mô tả lifecycle: shell HTML → bundle JS → fetch data → render.',
          'Trade-off: TTFB nhanh nhưng LCP chờ JS + API.',
          'Skeleton UI trong lúc fetch — pattern cho list page.',
          'SEO risk với pure CSR — khi nào prerender đủ.',
          'Audit một route CSR: số round-trip trước first meaningful paint.',
        ],
      },
      {
        heading: 'SSR',
        items: [
          'Server render HTML với data — client hydrate cùng markup.',
          'Mismatch hydration: nguyên nhân Date/random trong SSR.',
          'Streaming HTML (concept) vs buffer full page.',
          'So sánh load server CPU vs client work.',
          'Checklist: env secrets chỉ ở server, không leak vào bundle.',
        ],
      },
      {
        heading: 'SSG & ISR',
        items: [
          'Build time generate static HTML cho N paths.',
          'ISR: revalidate interval — stale-while-revalidate mental model.',
          'On-demand revalidation khi CMS publish.',
          'Khi nào SSG không scale (quá nhiều paths).',
          'Chọn 2 routes portfolio: SSG vs SSR và justify 1 câu mỗi route.',
        ],
      },
      {
        heading: 'Hydration & React Server Components',
        items: [
          'Hydration = attach event listeners + reconcile server HTML.',
          'Selective hydration / islands (concept) giảm JS client.',
          'RSC: server component vs client component boundary ("use client").',
          'Serialization props server → client — không pass function.',
          'Đọc doc RSC một feature page — liệt kê component nào phải client.',
        ],
      },
    ]
  ),
  '0-1-0': detail(
    'Dependency hygiene tránh “works on my machine” và supply-chain surprises. Mục tiêu: reproducible install và hiểu lockfile.',
    [
      {
        heading: 'npm',
        items: [
          'npm install vs npm ci — CI pipeline chỉ dùng ci.',
          'semver: ^ vs ~ vs exact pin cho dependency critical.',
          'npm audit — phân biệt fixable vs accepted risk.',
          'Workspaces (monorepo) — khi portfolio thêm package con.',
          'Script npm run build/test — document trong README.',
        ],
      },
      {
        heading: 'package.json',
        items: [
          'dependencies vs devDependencies — không ship eslint vào production bundle logic.',
          'engines field Node version khớp VPS/CI.',
          'exports/import type module — "type": "module" impact.',
          'Script pre/post hooks — tránh side effect bất ngờ.',
          'Review một package.json: 3 dependency có thể gỡ hoặc thay nhẹ hơn.',
        ],
      },
      {
        heading: 'package-lock',
        items: [
          'Lock ghi exact tree — commit lock cùng code.',
          'Merge conflict lock — regenerate bằng npm install sau resolve package.json.',
          'Diff lock khi upgrade major — số package indirect thay đổi.',
          'npm ls package-name — ai pull version nào.',
          'Policy: không hand-edit lock trừ khi biết rõ.',
        ],
      },
      {
        heading: 'node_modules & npm ci',
        items: [
          'Xóa node_modules + ci — thời gian install baseline trên máy bạn.',
          'Hoisting vs nested — một lỗi duplicate React version.',
          '.npmrc: registry, legacy-peer-deps — document lý do nếu dùng.',
          'CI cache node_modules hoặc npm cache path.',
          'Verify ci fail khi package.json và lock lệch (test một lần).',
        ],
      },
    ]
  ),
  '0-1-1': detail(
    'Tooling quyết định dev UX và shape bundle production. Mục tiêu: chạy Vite dev/prod và giải thích output dist.',
    [
      {
        heading: 'Vite',
        items: [
          'Khởi tạo project Vite + React — cấu trúc index.html entry.',
          'vite.config: alias @, proxy API local.',
          'Env VITE_* expose client — không put secret.',
          'Build target browserslist nếu cần legacy.',
          'So sánh cold start Vite vs webpack memory (qualitative).',
        ],
      },
      {
        heading: 'HMR',
        items: [
          'Sửa component — state giữ hay mất? test với useState form.',
          'HMR boundary: lỗi syntax → overlay, recover sau fix.',
          'CSS HMR không full reload.',
          '@vitejs/plugin-react — Fast Refresh rules (named export).',
          'Log một lần full reload vs hot update trong console.',
        ],
      },
      {
        heading: 'Production build & dist',
        items: [
          'npm run build → liệt kê file trong dist/assets hashed names.',
          'index.html reference script type=module.',
          'Base path /repo-name/ cho GitHub Pages — config base.',
          'Preview vite preview serve dist locally.',
          'Check dist không chứa source map public nếu policy cấm.',
        ],
      },
      {
        heading: 'Bundlers (Rollup/Rolldown/Webpack)',
        items: [
          'Vite dev esbuild transform, prod Rollup bundle — đọc doc 1 paragraph.',
          'Khi nào cần webpack (legacy CRA) vs Vite greenfield.',
          'Rolldown (future) — awareness, không deep dive bắt buộc.',
          'Plugin ecosystem: visualizer, legacy plugin.',
          'Viết 3 câu cho interviewer: “Vite khác webpack ở chỗ…”.',
        ],
      },
    ]
  ),
  '0-1-2': detail(
    'Bytes on wire = thời gian load — minify và compression là free win. Mục tiêu: đọc bundle report và source map khi debug prod.',
    [
      {
        heading: 'Raw/minified',
        items: [
          'So sánh size một component trước/sau minify (rollup output).',
          'Terser/esbuild drop console trong production build flag.',
          'Dead code trong bundle — link tới tree shaking topic.',
          'Measure transfer size vs content size trong Network.',
          'Target: JS initial chunk budget (ví dụ <200KB gzip) cho app của bạn.',
        ],
      },
      {
        heading: 'gzip & Brotli',
        items: [
          'Server gzip_static hoặc CDN auto compress.',
          'Brotli thường nhỏ hơn gzip ~15–20% cho text assets.',
          'Precompress .br/.gz files trong deploy script (optional).',
          'Content-Encoding header verify bằng curl -H "Accept-Encoding: br".',
          'Không nén ảnh đã nén — chỉ text/js/css.',
        ],
      },
      {
        heading: 'Source maps',
        items: [
          'hidden-source-map vs source-map — public exposure risk.',
          'Sentry upload source map — stack trace readable.',
          'DevTools load map — map minified name về file gốc.',
          'CI artifact maps không deploy lên static host public.',
          'Checklist release: map version khớp commit hash.',
        ],
      },
      {
        heading: 'Visualizer & bundle/chunk analysis',
        items: [
          'rollup-plugin-visualizer hoặc vite-plugin-visualizer — chạy một lần.',
          'Identify top 3 module chiếm KB (lodash, moment, chart lib).',
          'Duplicate package trong graph — dedupe strategy.',
          'Chunk manual split vendor vs app code.',
          'Action item: một import thay bằng lighter alternative có số liệu.',
        ],
      },
    ]
  ),
  '0-1-3': detail(
    'Modern ESM và code splitting giữ initial load nhỏ. Mục tiêu: lazy route và chứng minh tree shaking hoạt động.',
    [
      {
        heading: 'ESM/module resolution',
        items: [
          'import/export static vs dynamic — bundler analyze.',
          'Node resolution: package.json exports field.',
          'Extension .js trong import type module.',
          'Barrel file index.ts — risk re-export cả thư viện.',
          'Trace một failed import path trong Vite error overlay.',
        ],
      },
      {
        heading: 'Tree shaking',
        items: [
          'sideEffects: false trong dependency package.json.',
          'Dùng named import lodash-es thay import cả namespace.',
          'Verify unused export biến mất khỏi prod bundle (grep dist).',
          'Class/static side effect ngăn shake — refactor một ví dụ.',
          'Document 1 dependency không shake được và workaround.',
        ],
      },
      {
        heading: 'Code splitting',
        items: [
          'Route-based split: mỗi page một async chunk.',
          'Vendor chunk tách react/react-dom.',
          'Prefetch link rel=modulepreload cho critical chunk.',
          'Analyze số chunk Network tab khi navigate SPA.',
          'Tránh quá nhiều chunk nhỏ — HTTP overhead.',
        ],
      },
      {
        heading: 'Dynamic import & React.lazy',
        items: [
          'const Page = lazy(() => import("./Page")) — wrap Suspense fallback.',
          'Error boundary quanh lazy route khi chunk load fail.',
          'Preload on hover link (pattern) cho admin page.',
          'SSR + lazy: loadable pattern nếu dùng Next.',
          'Measure LCP route trước/sau lazy heavy chart library.',
        ],
      },
    ]
  ),
  '0-2-0': detail(
    'React nhanh khi biết vì sao re-render — không memo mù. Mục tiêu: dùng Profiler chẩn đoán một bug performance thật.',
    [
      {
        heading: 'Reconciliation',
        items: [
          'Key stable trong list — anti-pattern index as key khi reorder.',
          'Element type đổi → unmount/remount vs update props.',
          'Controlled vs uncontrolled input — re-render frequency.',
          'React 19 features awareness (optional read release notes).',
          'Vẽ sơ đồ parent state change → children nào render.',
        ],
      },
      {
        heading: 'React Profiler',
        items: [
          'Record interaction: click filter → flame chart commit time.',
          'Ranked view: component tốn ms nhất.',
          '“Why did this render?” (React DevTools) một component.',
          'Baseline commit trước optimize, sau optimize so sánh.',
          'Export profile JSON lưu vào case study portfolio.',
        ],
      },
      {
        heading: 'Re-render diagnosis',
        items: [
          'Context value object inline → memoize value useMemo.',
          'Prop callback inline → useCallback child memoized.',
          'State lift quá cao — tách state xuống leaf.',
          'React.memo cho pure list item — measure trước/sau.',
          'Checklist 5 nguyên nhân re-render thừa trong app bạn.',
        ],
      },
      {
        heading: 'Memoization',
        items: [
          'useMemo cho expensive compute — không wrap mọi thứ.',
          'useCallback dependency array đúng — eslint exhaustive-deps.',
          'Memoization cost > benefit — Profiler quyết định.',
          'TanStack Table/virtualization thay memo 1000 rows.',
          'Rule thumb: fix architecture trước, memo sau.',
        ],
      },
    ]
  ),
  '0-2-1': detail(
    'Kiến trúc component và state quyết định maintainability fullstack app. Mục tiêu: map state đúng layer (local/global/server).',
    [
      {
        heading: 'Component design',
        items: [
          'Presentational vs container — một ví dụ Table + TableContainer.',
          'Props API nhỏ, composition (children) thay prop drilling 10 tầng.',
          'Colocate styles/tests cùng component folder.',
          'Storybook hoặc isolated demo cho design system atom.',
          'Refactor một God component >200 lines thành 3 file.',
        ],
      },
      {
        heading: 'Design system',
        items: [
          'Token màu spacing typography — CSS variables hoặc Tailwind config.',
          'Button variants: primary/ghost/disabled — một source truth.',
          'Accessible focus ring consistent mọi interactive.',
          'Document usage do/don’t 1 page nội bộ.',
          'Replace 5 hardcoded hex bằng token.',
        ],
      },
      {
        heading: 'Local/global/server state',
        items: [
          'useState/useReducer cho UI local (modal open, input).',
          'Zustand/Context cho theme, auth snapshot client.',
          'Server state = TanStack Query — không copy vào Redux thừa.',
          'URL searchParams cho shareable filter state.',
          'Diagram: một feature flow — state nằm ở đâu.',
        ],
      },
      {
        heading: 'Integration note',
        items: [
          'Optimistic UI chỉ khi rollback path rõ.',
          'Stale server data — invalidation query key convention.',
          'Form draft localStorage vs server save.',
          'SSR initial data hydrate Query dehydrate (nếu Next).',
          'Checklist anti-pattern: duplicate source of truth.',
        ],
      },
    ]
  ),
  '0-2-2': detail(
    'Data fetching layer tách khỏi UI giúp retry, cache và test. Mục tiêu: một resource CRUD qua TanStack Query chuẩn.',
    [
      {
        heading: 'REST integration',
        items: [
          'Resource naming plural nouns — GET /topics/:id.',
          'Map JSON DTO → view model trong selector.',
          'Handle 401 redirect login, 403 message, 404 empty state.',
          'Pagination query page/limit sync URL.',
          'OpenAPI spec đọc một endpoint — ghi request/response mẫu.',
        ],
      },
      {
        heading: 'Axios/fetch',
        items: [
          'fetch wrapper trả { data, error } typed.',
          'Axios instance baseURL, interceptors attach JWT.',
          'AbortController signal cancel on unmount.',
          'Content-Type application/json vs multipart.',
          'Compare axios vs fetch: khi nào chọn gì trong project.',
        ],
      },
      {
        heading: 'TanStack Query',
        items: [
          "useQuery queryKey ['topics', filters] — staleTime gcTime config.",
          'useMutation invalidateQueries on success.',
          'PlaceholderData keepPreviousData pagination UX.',
          'Query devtools inspect cache entry.',
          'Prefetch on hover detail page query.',
        ],
      },
      {
        heading: 'Cache, retry, abort',
        items: [
          'retry: 3 network only, không retry 400.',
          'global onError toast vs per-query.',
          'Dedupe parallel same queryKey — một network call.',
          'Offline refetchOnReconnect behavior.',
          'Test MSW mock latency + abort — UI không setState after unmount.',
        ],
      },
    ]
  ),
  '0-2-3': detail(
    'Main thread busy = INP tệ — tối ưu event loop và layout. Mục tiêu: fix một long task >50ms trên interaction thật.',
    [
      {
        heading: 'Long tasks',
        items: [
          'Performance long task overlay >50ms — identify script.',
          'Chunk work requestIdleCallback hoặc setTimeout(0).',
          'Web Worker cho parse CSV lớn (optional lab).',
          'Debounce search 300ms — measure INP trước/sau.',
          'Document long task root cause + fix trong changelog.',
        ],
      },
      {
        heading: 'Event loop',
        items: [
          'Microtask queue: Promise.then trước macrotask setTimeout.',
          'Không block loop sync JSON.parse 5MB.',
          'requestAnimationFrame cho DOM write batch.',
          'async handler không imply parallel CPU — vẫn single thread.',
          'Vẽ timeline một click handler 200ms — chia nhỏ.',
        ],
      },
      {
        heading: 'Virtualization',
        items: [
          '@tanstack/react-virtual list 10k rows — chỉ render visible.',
          'Estimate size dynamic row height strategy.',
          'Scroll container overscan 5 items smooth scroll.',
          'Compare DOM node count virtual vs full render.',
          'Apply virtualization một bảng admin thật trong portfolio app.',
        ],
      },
      {
        heading: 'Layout thrashing & API waterfalls',
        items: [
          'Sequential await 3 API — parallel Promise.all khi independent.',
          'GraphQL/BFF một round-trip thay 5 REST (concept).',
          'Suspense data waterfall — nested queries anti-pattern.',
          'Prefetch route data on link hover.',
          'Waterfall diagram before/after optimize load dashboard.',
        ],
      },
    ]
  ),
  '0-3-0': detail(
    'Core Web Vitals là metric Google và user cảm nhận — đo được mới tối ưu đúng. Mục tiêu: báo cáo LCP/INP/CLS before/after.',
    [
      {
        heading: 'Core Web Vitals: LCP, INP, CLS',
        items: [
          'LCP element thường là hero img — preload fetchpriority=high.',
          'INP: optimize slow event handlers (link long tasks topic).',
          'CLS: width/height img, không inject banner trên content.',
          'Field vs lab — PageSpeed Insights cả hai.',
          'Ghi 3 số field CWV trang production (CrUX hoặc RUM).',
        ],
      },
      {
        heading: 'Lighthouse',
        items: [
          'Run Lighthouse CI hoặc local mobile simulated throttling.',
          'Opportunities tab — implement 2 suggestion có impact cao.',
          'Performance ≠ Accessibility — chạy cả category.',
          'Treemap JS breakdown trong Lighthouse 10+.',
          'Save report HTML vào portfolio audit folder.',
        ],
      },
      {
        heading: 'Real-user monitoring',
        items: [
          'web-vitals npm sendBeacon analytics endpoint.',
          'p75 LCP aggregate — alert nếu vượt ngưỡng.',
          'Segment by country/device — tìm outlier.',
          'Privacy: không log PII trong RUM payload.',
          'So sánh RUM vs Lighthouse lab cùng route — explain gap.',
        ],
      },
    ]
  ),
  '0-3-1': detail(
    'Quality gates bắt lỗi sớm — rẻ hơn fix prod. Mục tiêu: CI fail khi lint/type/test fail.',
    [
      {
        heading: 'ESLint',
        items: [
          'eslint-config-react-app hoặc eslint-plugin-react-hooks flat config.',
          'Fix no-unused-vars và exhaustive-deps warnings — zero warn policy.',
          'Custom rule ban console.log trong src/ (optional).',
          'eslint --max-warnings 0 trong CI script.',
          'Document disable comment chỉ kèm lý do ticket.',
        ],
      },
      {
        heading: 'Prettier',
        items: [
          'format on save VS Code — share .prettierrc team.',
          'eslint-config-prettier tránh conflict.',
          'CI prettier --check không chỉ eslint.',
          'Ignore build artifacts .prettierignore.',
          'One PR chỉ format — tách khỏi logic PR.',
        ],
      },
      {
        heading: 'TS strict & react-hooks rules',
        items: [
          'strict: true, noImplicitAny — fix 10 lỗi đầu trong codebase.',
          'Typed props/export type API response.',
          'rules-of-hooks — không gọi hook trong if.',
          'react-hooks/exhaustive-deps — intentional omit comment.',
          'tsc --noEmit trong CI pipeline step.',
        ],
      },
      {
        heading: 'Husky/lint-staged & CI quality gates',
        items: [
          'lint-staged chạy eslint prettier trên staged files only.',
          'husky pre-commit hook — fast <30s.',
          'CI: install ci → lint → typecheck → test → build.',
          'Branch protection require status checks.',
          'Badge README build passing (optional).',
        ],
      },
    ]
  ),
  '0-3-2': detail(
    'SEO giúp portfolio và product page được index đúng. Mục tiêu: validate metadata và structured data một trang.',
    [
      {
        heading: 'SEO metadata',
        items: [
          'Unique title/description mỗi route — template + suffix brand.',
          'Open Graph og:image 1200×630 — test Facebook debugger.',
          'Twitter card summary_large_image.',
          'lang attribute html vi/en đúng content.',
          'React Helmet hoặc meta export Next.js — một implementation.',
        ],
      },
      {
        heading: 'Sitemap',
        items: [
          'Generate sitemap.xml static build cho mọi public route.',
          'lastmod realistic — không fake daily.',
          'Submit Google Search Console property.',
          'Sitemap index nếu >50k URL (unlikely portfolio).',
          'Exclude draft/admin paths khỏi sitemap.',
        ],
      },
      {
        heading: 'Canonical & robots.txt',
        items: [
          'link rel=canonical tránh duplicate www/non-www.',
          'robots.txt Allow/Disallow staging vs prod.',
          'noindex trên preview deploy URL.',
          'Test robots.txt fetch Google tool.',
          'Canonical self-reference trên primary URL.',
        ],
      },
      {
        heading: 'Structured data',
        items: [
          'JSON-LD Person hoặc WebSite schema portfolio.',
          'Rich Results Test validate không error.',
          'Article schema cho blog post nếu có.',
          'Không spam schema ẩn content.',
          'Document schema type chọn và lý do.',
        ],
      },
    ]
  ),
  '0-3-3': detail(
    'Test và security baseline trước ship user-facing app. Mục tiêu: một E2E flow + biết XSS/CSRF/CSP mitigations.',
    [
      {
        heading: 'Vitest & RTL',
        items: [
          'Vitest + @testing-library/react render component assert text.',
          'userEvent click thay fireEvent khi có thể.',
          'Mock fetch/QueryClientProvider wrapper test hook.',
          'Coverage threshold statements 70% module critical (optional).',
          'Test regression bug một lần — commit test cùng fix.',
        ],
      },
      {
        heading: 'Playwright',
        items: [
          'E2E login → create item → assert list — happy path.',
          'Trace on failure debug CI screenshot.',
          'Run headed local, headless CI.',
          'Storage state reuse auth session speed up.',
          'Cross-browser chromium minimum, firefox webkit optional.',
        ],
      },
      {
        heading: 'Error boundaries',
        items: [
          'class or react-error-boundary wrap route level.',
          'Fallback UI có nút reload, log error service.',
          'Boundary không catch event handler — try/catch local.',
          'Test throw component → fallback hiện.',
          'Production gửi stack sanitized Sentry.',
        ],
      },
      {
        heading: 'XSS, CSRF, CSP',
        items: [
          'dangerouslySetInnerHTML chỉ với sanitize DOMPurify.',
          'Cookie SameSite=Lax/Strict session auth.',
          'CSRF token double-submit hoặc SameSite + custom header.',
          'CSP header default-src self; script-src nonce — report-only trước.',
          'Checklist deploy: HTTPS, secure cookie, CSP documented exceptions.',
        ],
      },
    ]
  ),
};
