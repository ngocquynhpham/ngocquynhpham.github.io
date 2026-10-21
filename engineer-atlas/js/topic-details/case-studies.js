import { detail } from './helpers.js';

/** Real-world production case studies — Fullstack FE-first. */

export default {
  '0-5-0': detail(
    'Case study MyHappyClass: CTA landing Astro `/signup` vs React (TanStack Router) `/register` gây 404; biểu hiện khác nhau Chrome/Edge do cache, session và auth redirect. Fix đã implement — cần verification checklist trước khi đánh dấu hoàn thành. Liên quan (không thay thế): CORS `0-0-4`, Browser Storage `0-4-0`.',
    [
      {
        heading: 'Problem — Vấn đề',
        items: [
          'User bấm CTA "Dùng thử miễn phí" trên landing → gặp 404 Not Found.',
          'Hành vi khác Chrome vs Edge — đặc biệt khi đã login hoặc cache khác nhau.',
          'Ghi lại URL thực tế trên Network tab khi reproduce.',
          'Phân biệt triệu chứng (404 page) vs giả thuyết chưa xác nhận (SW, env build).',
        ],
      },
      {
        heading: 'Root cause — Nguyên nhân gốc (đã xác định)',
        items: [
          'Landing (Astro) dùng `/signup`; React app chỉ có route `/register`.',
          'Route `/signup` không tồn tại trong client router.',
          'Auth redirect có thể đưa user về `/signup` không hợp lệ.',
          'Global 404 fallback chưa cover URL ngoài workspace đầy đủ.',
          'Investigate thêm (chưa chốt root cause): Service Worker/PWA, cookie/session, SPA server fallback, `.env.production` build.',
        ],
      },
      {
        heading: 'Solution — Giải pháp đã làm',
        items: [
          'Chuẩn hóa URL đăng ký → `/register` trên landing và app.',
          'Alias `/signup` → redirect `/register` (liên kết cũ).',
          'Auth redirect: chỉ về route hợp lệ, an toàn sau login.',
          'Astro production build dùng đúng `.env.production`.',
          'Nếu cần: kiểm tra SPA fallback (nginx/GitHub Pages), SW, global 404.',
        ],
      },
      {
        heading: 'Technical knowledge — Kiến thức rút ra',
        items: [
          'SPA routing: client router vs direct URL — server phải fallback `index.html` cho deep links.',
          'Auth & redirect: post-login path phải tồn tại trong router config.',
          'Browser cache & Service Worker: có thể serve bundle/route map cũ — test Incognito + clear site data.',
          'Env config: Vite/Astro vars thường bake at build time — sai env → sai API/base URL.',
          'Production debugging: Network (status, redirect chain), Console, Application (cookies, SW, storage).',
        ],
      },
      {
        heading: 'Verification checklist',
        items: [
          'Landing CTA mở đúng `/register`.',
          'Direct `/signup` → `/register` (alias/redirect).',
          'User chưa login: flow signup/login đúng, không 404.',
          'User đã login: không redirect vào route lỗi.',
          'Hard refresh / direct URL deep link hoạt động.',
          'Chrome + Edge Incognito — cùng kết quả mong đợi.',
          'Sau clear cache + unregister Service Worker (nếu có PWA).',
          'Production build verified đúng environment variables.',
        ],
      },
      {
        heading: 'Interview evidence — TTI Web System Engineer',
        items: [
          'Prompt: How do you debug a production issue?',
          'Answer (B1): MyHappyClass — landing `/signup` vs app `/register`; checked routing + auth redirect; aligned routes; learned SPA routing, cross-browser testing.',
          'Key takeaway: bug không always complex code — routing/config/integration inconsistency.',
          'Evidence: link PR/commit, screenshot Network redirect, hoặc ghi chú verification ticked ở trên.',
        ],
      },
    ],
    {
      moduleKind: 'case_study',
      priority: 'medium',
      durationEstimate: 'Case study · 2–4 giờ',
      difficulty: 'intermediate',
      caseStudyProject: 'MyHappyClass',
      fixStatus: 'pending_verification',
      relatedTopicIds: ['0-0-4', '0-4-0', '0-3-3'],
    }
  ),
};
