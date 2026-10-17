import { detail } from './helpers.js';

export default {
  '5-0-0': detail(
    'Git workflow chuyên nghiệp trước khi deploy — branch và PR là safety net. Mục tiêu: feature branch → PR → merge main deploy GitHub Pages.',
    [
      {
        heading: 'Git',
        items: [
          'Commit message imperative mood subject 50 chars.',
          'Atomic commits one logical change revert easy.',
          'git status diff before commit no secrets.',
          'Stash pop conflict resolution practice once.',
          'Tag release v1.0.0 annotated changelog.',
        ],
      },
      {
        heading: 'Branching',
        items: [
          'main protected direct push disabled.',
          'feature/ea-topic-details naming convention.',
          'hotfix/* production urgent minimal diff.',
          'Delete branch after merge remote cleanup.',
          'Rebase vs merge team policy document one page.',
        ],
      },
      {
        heading: 'GitHub/GitLab workflow',
        items: [
          'PR template checklist test lint deploy preview.',
          'Required review one approver minimum.',
          'Link issue Closes #123 auto close.',
          'Squash merge clean history optional.',
          'Fork PR external contributor CI runs same.',
        ],
      },
    ]
  ),
  '5-0-1': detail(
    'Hiểu hosting stack chọn VPS phù hợp budget — Linux shell daily driver ops. Mục tiêu: SSH vào VPS chạy 10 lệnh diagnostic cơ bản.',
    [
      {
        heading: 'Server vs hosting vs VPS',
        items: [
          'Shared hosting no SSH — limit fullstack app.',
          'VPS root access Docker FastAPI PostgreSQL ok.',
          'PaaS Render/Fly trade cost vs control.',
          'Engineer Atlas target VPS + Docker Compose doc.',
          'Compare monthly cost table 3 providers pick.',
        ],
      },
      {
        heading: 'Linux',
        items: [
          'Ubuntu LTS 22.04/24.04 server edition.',
          'systemctl status nginx docker postgresql.',
          'journalctl -u service -f tail logs.',
          'df -h disk du -sh /var/log cleanup.',
          'uname -a kernel glibc awareness containers.',
        ],
      },
      {
        heading: 'Shell & permissions',
        items: [
          'chmod 644 file 755 dir least privilege.',
          'chown deploy:www-data app files.',
          'Never run app root create deploy user.',
          'sudoers specific commands not NOPASSWD ALL.',
          'Script bash set -euo pipefail deploy.sh.',
        ],
      },
    ]
  ),
  '5-0-2': detail(
    'Remote access và network firewall là cửa vào VPS — sai là bị scan. Mục tiêu: SSH key only + ufw allow 22 80 443 deny rest.',
    [
      {
        heading: 'SSH',
        items: [
          'ssh-keygen ed25519 no password prod key or use agent.',
          'Disable PasswordAuthentication /etc/ssh/sshd_config.',
          'Fail2ban ssh jail optional brute force.',
          'Config ~/.ssh/config Host alias IdentityFile.',
          'Rotate key yearly document procedure.',
        ],
      },
      {
        heading: 'SCP & SFTP',
        items: [
          'scp -r dist/ user@host:/var/www/app/.',
          'sftp batch script upload env not in git.',
          'rsync -avz --delete safer deploy static.',
          'Verify checksum after large upload.',
          'Never scp .env slack — use secrets manager.',
        ],
      },
      {
        heading: 'IP, ports, firewall',
        items: [
          'Public IP vs private VPC awareness cloud.',
          'Port 22 ssh 80 http 443 https 5432 not public.',
          'ufw enable default deny incoming.',
          'Docker publish ports explicit map only needed.',
          'nmap self scan verify exposure from outside.',
        ],
      },
    ]
  ),
  '5-0-3': detail(
    'Domain TLS Nginx reverse proxy — user thấy HTTPS một domain thống nhất. Mục tiêu: certbot LetsEncrypt + Nginx /api proxy FastAPI.',
    [
      {
        heading: 'Domain & DNS',
        items: [
          'A record @ and www → VPS IP TTL 300 deploy window.',
          'Subdomain api.app.com separate service optional.',
          'Verify propagation dig + online checker.',
          'Registrar lock prevent hijack.',
          'Document DNS provider login 2FA enabled.',
        ],
      },
      {
        heading: 'TLS & HTTPS',
        items: [
          'certbot --nginx -d domain.com auto renew cron.',
          'TLS 1.2+ ssl_protocols modern cipher.',
          'HTTP → HTTPS 301 redirect all paths.',
          'HSTS max-age after stable cert not day one.',
          'SSL Labs test A rating target.',
        ],
      },
      {
        heading: 'Nginx & reverse proxy',
        items: [
          'server_name root try_files SPA fallback index.html.',
          'location /api proxy_pass http://127.0.0.1:8000 headers.',
          'client_max_body_size 20M upload PDF.',
          'gzip_static on precompressed assets.',
          'nginx -t before reload systemctl reload nginx.',
        ],
      },
    ]
  ),
  '5-1-0': detail(
    'Static deploy Vite dist đơn giản nhưng base path và cache headers quan trọng. Mục tiêu: GitHub Pages hoặc Nginx serve dist fingerprint assets.',
    [
      {
        heading: 'Static React/Vite dist deployment',
        items: [
          'npm run build CI artifact upload Pages.',
          'base: "/repo-name/" vite.config GitHub Project Pages.',
          '404.html redirect SPA hack GitHub Pages optional.',
          'Cache-Control immutable hashed assets 1y.',
          'index.html no-cache must-revalidate.',
        ],
      },
      {
        heading: 'Verification',
        items: [
          'curl -I index.html verify headers.',
          'Hard refresh still get new deploy hash js.',
          'Check broken asset 404 console clean.',
          'Lighthouse prod URL not localhost.',
          'Rollback previous dist tarball kept releases/.',
        ],
      },
    ]
  ),
  '5-1-1': detail(
    'Docker chuẩn hóa runtime dev=prod — image layer cache speed build. Mục tiêu: multi-stage Dockerfile frontend + backend images push GHCR.',
    [
      {
        heading: 'Dockerfile',
        items: [
          'Multi-stage build stage npm run build runtime nginx alpine.',
          'Python slim base non-root USER app.',
          'COPY requirements before code layer cache deps.',
          '.dockerignore node_modules venv git.',
          'LABEL org.opencontainers.image.source repo url.',
        ],
      },
      {
        heading: 'Images, containers, layers',
        items: [
          'docker build -t app:tag . docker run -p 8000:8000.',
          'docker history see layer size bloat.',
          'Pin base image digest supply chain.',
          'Scan trivy image CVE high fix or accept.',
          'Tag semver git sha deploy traceability.',
        ],
      },
    ]
  ),
  '5-1-2': detail(
    'Compose orchestrate local prod-like stack — volumes persist DB. Mục tiêu: docker-compose.yml app db nginx one docker compose up.',
    [
      {
        heading: 'Docker volumes',
        items: [
          'Named volume postgres_data survive container recreate.',
          'Bind mount ./data dev only not prod pattern.',
          'Backup volume pg_dump sidecar cron.',
          'Permission uid mapping postgres volume fix.',
          'Document volume location disk monitoring.',
        ],
      },
      {
        heading: 'Networking',
        items: [
          'Compose network app talks db hostname service name.',
          'Expose only nginx 443 internal api not published.',
          'DNS embedded docker network debug ping.',
          'extra_hosts dev optional host.docker.internal.',
          'Network isolate prod compose project name.',
        ],
      },
      {
        heading: 'Docker Compose',
        items: [
          'Services web api db nginx depends_on healthcheck.',
          'healthcheck pg_isready interval retries.',
          'profiles dev tools adminer optional.',
          'compose watch sync dev hot reload optional.',
          'Production compose -f compose.prod.yml override.',
        ],
      },
    ]
  ),
  '5-1-3': detail(
    'Secrets và env tách staging prod — 12-factor app. Mục tiêu: .env.example + prod secrets file chmod 600 không git.',
    [
      {
        heading: 'Environment variables',
        items: [
          'DATABASE_URL REDIS_URL LOG_LEVEL documented example.',
          'Vite only VITE_ public vars client.',
          'Validate required env startup fail fast pydantic-settings.',
          'Default dev sane never prod default secret.',
          'Print env keys not values debug startup.',
        ],
      },
      {
        heading: 'Secrets',
        items: [
          'GitHub Actions secrets OPENAI_KEY deploy inject.',
          'Docker secrets mount /run/secrets file read.',
          'Rotate JWT secret invalidate sessions plan.',
          'Never echo secrets CI log mask.',
          'Audit who accessed prod env last quarter.',
        ],
      },
      {
        heading: 'Staging vs production',
        items: [
          'Separate DB instance no prod data copy anonymized.',
          'Staging subdomain staging.app.com basic auth optional.',
          'Feature flags test prod config parity.',
          'Promote image same tag staging → prod tested.',
          'Checklist pre-prod smoke before prod deploy.',
        ],
      },
    ]
  ),
  '5-2-0': detail(
    'CI automates trust — mỗi push chạy lint test build. Mục tiêu: GitHub Actions workflow on PR main green required.',
    [
      {
        heading: 'GitHub Actions or GitLab CI',
        items: [
          'Workflow .github/workflows/ci.yml on push pull_request.',
          'Matrix node 20 python 3.11 parallel jobs.',
          'Cache npm pip speed up minutes.',
          'Concurrency cancel in-progress same PR.',
          'Badge README status shield optional.',
        ],
      },
      {
        heading: 'Pipeline basics',
        items: [
          'Job checkout setup install lint test build artifacts.',
          'Fail fast first job lint before e2e slow.',
          'Secrets only main deploy workflow protected.',
          'Manual workflow_dispatch deploy prod approval.',
          'Log retention days cost hygiene.',
        ],
      },
    ]
  ),
  '5-2-1': detail(
    'CD deploy sau CI pass — immutable artifact. Mục tiêu: deploy job SSH docker compose pull up only on main tag.',
    [
      {
        heading: 'Build, lint, test, deploy pipelines',
        items: [
          'CI artifact dist docker image ghcr push.',
          'Deploy needs: [test] job dependency.',
          'SSH action appleboy deploy script remote.',
          'Zero downtime compose up --no-deps -d api rolling.',
          'Post deploy curl smoke /health fail rollback alert.',
        ],
      },
      {
        heading: 'Quality gates',
        items: [
          'Lint test must pass no skip unless emergency.',
          'Typecheck tsc mypy parallel.',
          'E2E Playwright nightly not every commit optional.',
          'Coverage report trend not block MVP.',
          'Document break glass deploy bypass process.',
        ],
      },
    ]
  ),
  '5-2-2': detail(
    'Observability biết app sống và vì sao chết — logs first. Mục tiêu: Uptime Kuma + structured JSON logs grep error rate.',
    [
      {
        heading: 'Health checks',
        items: [
          '/health liveness 200 ok simple.',
          '/ready readiness db connection check 503 if down.',
          'Docker HEALTHCHECK curl interval start_period.',
          'Load balancer use health remove bad node.',
          'Synthetic check external cron 5 min.',
        ],
      },
      {
        heading: 'Application logs',
        items: [
          'JSON log docker logs -f aggregate.',
          'Rotate logrotate maxsize prevent disk full.',
          'Correlation request_id grep trace request.',
          'Log level ERROR alert threshold 10/min.',
          'PII scrubbing regex log pipeline.',
        ],
      },
      {
        heading: 'Uptime monitoring',
        items: [
          'UptimeRobot or Kuma ping HTTPS homepage + API.',
          'Alert email Telegram on 2 consecutive fail.',
          'Status page public optional stakeholders.',
          'Incident postmortem template blameless.',
          'SLA 99.5% monthly calculate uptime percent.',
        ],
      },
    ]
  ),
  '5-2-3': detail(
    'Ops mature: backup rollback hardening — sleep better on-call. Mục tiêu: restore drill + rollback deploy previous image documented.',
    [
      {
        heading: 'Backup & restore',
        items: [
          'Automated pg_dump nightly S3 or offsite rsync.',
          'Test restore fresh VM quarterly calendar invite.',
          'RTO RPO numbers write down 4h 24h example.',
          'Encrypt backups at rest gpg age.',
          'Monitor backup job success alert if missing file.',
        ],
      },
      {
        heading: 'Rollback',
        items: [
          'Keep last 3 docker image tags deploy script.',
          'Rollback compose image tag previous one command.',
          'DB migration backward compatible expand-contract.',
          'Feature flag kill switch disable AI endpoint.',
          'Runbook rollback decision tree when error rate >5%.',
        ],
      },
      {
        heading: 'Server hardening',
        items: [
          'Automatic security updates unattended-upgrades.',
          'Disable root login ssh PermitRootLogin no.',
          'Install fail2ban nginx ssh jails.',
          'Minimal open ports ufw status numbered.',
          'CIS benchmark skim top 10 apply feasible.',
        ],
      },
    ]
  ),
  '5-3-0': detail(
    'Capstone FE audit chứng minh production quality — số liệu before/after. Mục tiêu: Lighthouse CWV report + CI lint typecheck green screenshot.',
    [
      {
        heading: 'Frontend bundle audit',
        items: [
          'Visualizer top modules action reduced KB documented.',
          'Lazy routes heavy pages implemented.',
          'Dependency audit npm outdated critical only.',
          'Image optimization webp compress hero.',
          'Publish audit markdown portfolio month 6.',
        ],
      },
      {
        heading: 'Lint/typecheck gates & Core Web Vitals',
        items: [
          'CI eslint tsc --noEmit zero errors main.',
          'Field CWV CrUX or RUM p75 LCP INP CLS pass.',
          'Compare month 1 vs month 6 metrics table.',
          'Accessibility axe scan zero serious.',
          'Executive summary 3 bullets hiring manager skim.',
        ],
      },
    ]
  ),
  '5-3-1': detail(
    'Capstone BE perf — profile guided fixes not random cache. Mục tiêu: pg_stat_statements top query optimized + cache hit rate logged.',
    [
      {
        heading: 'Backend profiling',
        items: [
          'py-spy or middleware slow request log >500ms.',
          'Fix N+1 or missing index proven EXPLAIN.',
          'Load test locust 50 users p95 documented.',
          'Memory leak check 24h docker stats stable.',
          'Before after latency chart case study.',
        ],
      },
      {
        heading: 'Caching & database indexing',
        items: [
          'Redis cache hot read endpoints TTL justified.',
          'Invalidate on write paths listed.',
          'Composite index match WHERE ORDER BY query.',
          'Vacuum analyze schedule autovacuum healthy.',
          'Link DB module EXPLAIN skill demonstrated.',
        ],
      },
    ]
  ),
  '5-3-2': detail(
    'AI prod safety cost — RAG ACL và spend cap live. Mục tiêu: pen test doc access + dashboard daily LLM cost token.',
    [
      {
        heading: 'AI safety',
        items: [
          'Prompt injection test suite 10 attacks blocked.',
          'Moderation harmful content route refuse log.',
          'System prompt confidentiality no leak tests.',
          'Human review process escalation harmful thread.',
          'Policy page user-facing AI limitations.',
        ],
      },
      {
        heading: 'Document access',
        items: [
          'RLS chunk retrieval user_id enforce integration test.',
          'Share link exp signed scope read only.',
          'Audit log admin view document download.',
          'Delete user purge vectors GDPR.',
          'IDOR scan automated uuid neighbor 403.',
        ],
      },
      {
        heading: 'Cost/latency monitoring',
        items: [
          'Grafana or spreadsheet daily token spend.',
          'Alert 80% monthly budget email.',
          'p95 chat latency SLO 4s breach notify.',
          'Cost per active user trend week over week.',
          'Optimize model tier if quality acceptable downgrade.',
        ],
      },
    ]
  ),
  '5-3-3': detail(
    'Portfolio capstone packaging — architecture và story sell skill. Mục tiêu: README case study diagram OpenAPI publish hiring ready.',
    [
      {
        heading: 'Architecture diagrams',
        items: [
          'C4 context container diagram draw.io export svg.',
          'Sequence diagram chat RAG request flow.',
          'Data model ERD link schema doc.',
          'Deploy diagram VPS Docker Nginx TLS.',
          'Embed diagrams README top fold.',
        ],
      },
      {
        heading: 'README, API docs, portfolio case study',
        items: [
          'README quickstart 5 min docker compose up.',
          'Link live demo HTTPS credentials test user.',
          'OpenAPI /docs screenshot exported pdf optional.',
          'Case study: problem approach metrics lessons 800 words.',
          'LinkedIn post bullet metrics CWV cost eval Hit@5.',
        ],
      },
    ]
  ),
};
