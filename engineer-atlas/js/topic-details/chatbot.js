import { detail } from './helpers.js';

export default {
  '3-0-0': detail(
    'Hiểu token và context window tránh bill bất ngờ và truncate sai. Mục tiêu: ước lượng token một prompt system + 5 turn chat.',
    [
      {
        heading: 'LLM',
        items: [
          'Autoregressive next-token prediction mental model.',
          'System vs user vs assistant message roles.',
          'Temperature 0 factual vs 0.7 creative task pick.',
          'Model family trade-off quality speed (gpt-4o-mini vs larger).',
          'Log model name version mỗi request reproducibility.',
        ],
      },
      {
        heading: 'Tokens',
        items: [
          'tiktoken count prompt trước gửi API.',
          'Tiếng Việt token density cao hơn English — đo thực tế.',
          'Output max_tokens cap cost blow-up.',
          'Billing input + output separate line item.',
          'Dashboard spreadsheet cost per 1000 messages estimate.',
        ],
      },
      {
        heading: 'Context window',
        items: [
          '128k window không nghĩa nên nhét full PDF.',
          'Lost-in-the-middle effect long context awareness.',
          'Reserve tokens output + safety margin 10%.',
          'Truncate strategy drop oldest vs summarize.',
          'Measure tokens per conversation p95 app metric.',
        ],
      },
      {
        heading: 'Inference',
        items: [
          'Streaming vs complete response UX latency.',
          'Batch API offline jobs awareness.',
          'GPU cold start hosted API abstracted.',
          'Deterministic seed nếu API support testing.',
          'Fallback model smaller khi primary 503.',
        ],
      },
    ]
  ),
  '3-0-1': detail(
    'Chọn API và params phù hợp feature — pricing quyết định MVP viable. Mục tiêu: bảng so sánh 2 provider cho chatbot portfolio.',
    [
      {
        heading: 'Current LLM APIs',
        items: [
          'OpenAI chat completions endpoint shape messages[].',
          'Anthropic/Google optional second provider abstraction.',
          'Base URL env switch staging mock.',
          'API version header date pinned production.',
          'Health check lightweight models list call.',
        ],
      },
      {
        heading: 'Model parameters',
        items: [
          'top_p nucleus sampling khi nào thay temperature.',
          'frequency_penalty giảm lặp từ.',
          'response_format json_object gated models.',
          'stop sequences end generation early.',
          'Document default params repo config.yaml.',
        ],
      },
      {
        heading: 'Pricing',
        items: [
          '$/1M input vs output tokens current sheet.',
          'Embed model cost separate RAG budget.',
          'Free tier limit dev only not prod.',
          'Alert daily spend threshold email.',
          'Unit economics cost per active user month.',
        ],
      },
    ]
  ),
  '3-0-2': detail(
    'Prompt engineering giảm hallucination — biết giới hạn model. Mục tiêu: system prompt grounded “chỉ trả lời từ context” + test jailbreak cơ bản.',
    [
      {
        heading: 'Prompt roles',
        items: [
          'System set persona constraints tools available.',
          'User message rõ task format output.',
          'Assistant few-shot examples optional 2 turns.',
          'Developer message API newer role awareness.',
          'Template Jinja variables {{user_name}} inject safe.',
        ],
      },
      {
        heading: 'Limitations',
        items: [
          'Knowledge cutoff date state user facing.',
          'No real-time unless tool browse RAG.',
          'Math/code verify execution test cases.',
          'Refuse medical legal per policy template.',
          'Disclose AI assistant not human support.',
        ],
      },
      {
        heading: 'Hallucinations',
        items: [
          'Ask cite source chunk id in RAG path.',
          'Lower temperature factual Q&A 0–0.3.',
          'Self-check prompt “if unsure say không biết”.',
          'Eval set 20 questions known answers score.',
          'Log hallucination report user thumbs down.',
        ],
      },
    ]
  ),
  '3-0-3': detail(
    'Production LLM call cần retry, rate limit và token accounting. Mục tiêu: middleware log tokens + backoff 429 OpenAI.',
    [
      {
        heading: 'Latency',
        items: [
          'TTFB streaming first token metric.',
          'Parallel tool calls when independent.',
          'CDN không giúp LLM — region endpoint pick.',
          'Client timeout > server upstream timeout.',
          'p95 latency dashboard weekly review.',
        ],
      },
      {
        heading: 'Retries',
        items: [
          'Retry 429 Retry-After header respect.',
          'Idempotency key POST create conversation optional.',
          'Non-retry 400 bad prompt fix client.',
          'Circuit breaker pause provider outage.',
          'Test mock 429 sequence succeeds attempt 3.',
        ],
      },
      {
        heading: 'Token tracking',
        items: [
          'Parse usage prompt_tokens completion_tokens response.',
          'Persist per message row DB cost audit.',
          'Aggregate daily user_id sum tokens admin.',
          'Export CSV finance reconciliation.',
          'Anomaly spike alert 3x median hour.',
        ],
      },
      {
        heading: 'Rate limits',
        items: [
          'RPM TPM limits provider tier doc.',
          'Client-side queue semaphore global app.',
          '429 user message “hệ thống bận thử lại”.',
          'Per-user quota 100 msg/day free tier.',
          'Load test find RPM cliff before launch.',
        ],
      },
    ]
  ),
  '3-1-0': detail(
    'Streamlit prototype nhanh validate UX chat trước React. Mục tiêu: demo chat OpenAI 30 phút local st.session_state history.',
    [
      {
        heading: 'Streamlit setup',
        items: [
          'pip install streamlit openai secrets.toml gitignore.',
          'st.set_page_config title layout wide.',
          'Run streamlit run app.py port 8501.',
          'Deploy Streamlit Cloud optional demo link.',
          'Compare prototype vs prod React feature parity list.',
        ],
      },
      {
        heading: 'Chat message loop',
        items: [
          'st.chat_message user assistant render roles.',
          'st.chat_input bottom submit handler.',
          'Append messages list session state.',
          'Call API stream st.write_stream generator.',
          'Error st.error không crash whole app.',
        ],
      },
      {
        heading: 'Session & state',
        items: [
          'st.session_state.messages init empty.',
          'Clear chat button reset state.',
          'Sidebar model temperature slider debug.',
          'Persist session optional sqlite later.',
          'Screenshot demo portfolio ProtonX ref.',
        ],
      },
      {
        heading: 'Prototype limits',
        items: [
          'Auth multi-user không built-in — note gap.',
          'Custom CSS hacky — migrate React soon.',
          'Secret API key server-side only Streamlit secrets.',
          'Rate limit none — add before public URL.',
          'Exit criteria 5 user feedback items collected.',
        ],
      },
    ]
  ),
  '3-1-1': detail(
    'React chat UI production-grade accessibility và state. Mục tiêu: component ChatThread scroll stick bottom + message list virtual optional.',
    [
      {
        heading: 'React chat interface',
        items: [
          'Layout flex column input sticky footer.',
          'Message bubble role styling user vs assistant.',
          'Auto-scroll bottom new message useEffect ref.',
          'Empty state suggested prompts chips.',
          'Mobile keyboard viewport resize iOS fix.',
        ],
      },
      {
        heading: 'Next.js chat interface',
        items: [
          'App router client component "use client" chat page.',
          'Route /chat/[id] deep link conversation.',
          'Metadata title noindex private chat optional.',
          'API route proxy hide key server side.',
          'Compare Vite SPA vs Next SSR need SEO chat.',
        ],
      },
      {
        heading: 'UX polish',
        items: [
          'Markdown render assistant messages sanitized.',
          'Code block copy button prism optional.',
          'Timestamps relative hover absolute.',
          'Character limit input counter 4k warn.',
          'Dark mode tokens match design system.',
        ],
      },
    ]
  ),
  '3-1-2': detail(
    'SSE streaming cảm giác real-time — implement đúng browser API. Mục tiêu: FastAPI StreamingResponse + EventSource client hiển thị token stream.',
    [
      {
        heading: 'Server-Sent Events (SSE) streaming',
        items: [
          'Content-Type text/event-stream cache no.',
          'Format data: {json}\\n\\n chunk protocol.',
          'Heartbeat comment : ping every 15s proxy timeout.',
          'Close stream [DONE] sentinel client parse.',
          'Nginx proxy_buffering off SSE path config.',
        ],
      },
      {
        heading: 'Client consumption',
        items: [
          'fetch ReadableStream parse SSE không EventSource POST body.',
          'AbortController stop generation button.',
          'Append partial delta content state.',
          'Reconnect not automatic SSE — user retry.',
          'Test curl -N stream endpoint see chunks.',
        ],
      },
      {
        heading: 'Server integration',
        items: [
          'Async generator yield chunks OpenAI stream=True.',
          'Exception mid-stream send error event JSON.',
          'Timeout upstream cancel asyncio task.',
          'Log stream duration tokens at end.',
          'Load test 10 concurrent streams memory.',
        ],
      },
    ]
  ),
  '3-1-3': detail(
    'Chat UX tin cậy: loading, lỗi, hủy, optimistic. Mục tiêu: user gửi → optimistic bubble → rollback nếu 500.',
    [
      {
        heading: 'Loading',
        items: [
          'Skeleton assistant bubble pulsing stream pending.',
          'Disable send double-submit while in-flight.',
          'Progress “đang suy nghĩ…” >3s show.',
          'Aria live region announce new assistant msg.',
          'Timeout UI offer retry after 60s.',
        ],
      },
      {
        heading: 'Error',
        items: [
          'Inline error card last failed user message.',
          'Map 429 503 user friendly Vietnamese.',
          'Retry button resend same content idempotent.',
          'Log error code Sentry client boundary.',
          'Offline detect navigator.onLine banner.',
        ],
      },
      {
        heading: 'Cancel',
        items: [
          'Stop generation abort fetch signal.',
          'Partial content keep labeled incomplete.',
          'Server detect disconnect cancel upstream optional.',
          'Button visible only while streaming.',
          'Test abort mid-stream no memory leak.',
        ],
      },
      {
        heading: 'Optimistic UX',
        items: [
          'Insert user msg temp id before API ok.',
          'Replace temp id server id on success.',
          'Remove rollback optimistic on failure toast.',
          'Optimistic assistant placeholder optional risky skip.',
          'TanStack Query mutation pattern chat send.',
        ],
      },
    ]
  ),
  '3-2-0': detail(
    'Persistence hội thoại là feature table stakes — schema message order quan trọng. Mục tiêu: tables conversations + messages FK user migrate Alembic.',
    [
      {
        heading: 'Conversation persistence',
        items: [
          'conversation id uuid user_id title updated_at.',
          'Soft delete conversation archive flag.',
          'List conversations ORDER BY updated_at DESC paginate.',
          'Create conversation on first message lazy.',
          'RLS user_id match auth subject PostgreSQL.',
        ],
      },
      {
        heading: 'Message persistence',
        items: [
          'message role enum user assistant system tool.',
          'content text json multimodal later nullable.',
          'sequence integer monotonic per conversation.',
          'token_usage jsonb column optional cost.',
          'Index conversation_id sequence unique.',
        ],
      },
    ]
  ),
  '3-2-1': detail(
    'Context window finite — quản lý history là engineering not prompt hack. Mục tiêu: sliding window 20 messages + summarize older optional.',
    [
      {
        heading: 'Context management',
        items: [
          'Build prompt array system + last N messages.',
          'Inject RAG chunks separate system section.',
          'Tool results append assistant tool role OpenAI.',
          'Max chars budget tokenizer enforce trim.',
          'Debug log context token count dev panel.',
        ],
      },
      {
        heading: 'Truncation/summarization',
        items: [
          'Drop middle keep first system last k turns.',
          'Summarize old thread cheap model async job.',
          'Store summary row conversation summary_text.',
          'User pin message never drop flagged.',
          'A/B quality with vs without summarize 10 chats.',
        ],
      },
    ]
  ),
  '3-2-2': detail(
    'Structured output cho tool calling và form fill — validate strict. Mục tiêu: Pydantic model + OpenAI json_schema response parse.',
    [
      {
        heading: 'Structured outputs',
        items: [
          'Use case extract {intent, entities} from user msg.',
          'response_format type json_schema strict true.',
          'Retry parse once repair prompt on ValidationError.',
          'Fallback plain text if schema fail grace.',
          'Log schema version migration v1 v2.',
        ],
      },
      {
        heading: 'JSON Schema',
        items: [
          'Define schema properties required additionalProperties false.',
          'Enum status values limited set.',
          'Nested object max depth avoid hallucinate keys.',
          'Share schema TS zod from openapi optional.',
          'Unit test validator 5 valid 5 invalid samples.',
        ],
      },
      {
        heading: 'Validation',
        items: [
          'Pydantic model_validate_json assistant output.',
          'Coerce types string number safe.',
          'Reject oversize json 64kb limit.',
          'Sanitize string fields strip html.',
          'End-to-end test API returns schema conform.',
        ],
      },
    ]
  ),
  '3-2-3': detail(
    'Multi-user chatbot cần authZ và prompt injection defense. Mục tiêu: user A không đọc conversation B + system prompt không leak.',
    [
      {
        heading: 'User access controls',
        items: [
          'Every query filter by authenticated user_id.',
          'Admin role separate audit read with log.',
          'Share link token optional exp signed JWT.',
          'Delete account cascade conversations GDPR.',
          'Pen test IDOR change conversation uuid 403.',
        ],
      },
      {
        heading: 'Prompt safety',
        items: [
          'System prompt không user-editable raw.',
          'Delimiter ### user input ### injection hint.',
          'Block list ignore previous instructions test.',
          'Output filter PII regex optional redact.',
          'Moderation API flag harmful content route.',
        ],
      },
    ]
  ),
  '3-3-0': detail(
    'MVP fullstack nối React FastAPI PostgreSQL — end-to-end demo ship. Mục tiêu: deploy path login → chat → history persist một VPS.',
    [
      {
        heading: 'FastAPI + React + PostgreSQL integration',
        items: [
          'Monorepo or split repos CI both build.',
          'Vite proxy /api dev FastAPI uvicorn.',
          'Prod Nginx /api → backend / → static dist.',
          'Shared types openapi codegen optional.',
          'Smoke script curl login stream message list history.',
        ],
      },
      {
        heading: 'Integration checklist',
        items: [
          'Env DATABASE_URL CORS_ORIGINS JWT_SECRET prod.',
          'Migration alembic upgrade head deploy step.',
          'Health /health db ping included.',
          'Seed demo user document onboarding.',
          'README architecture diagram request flow.',
        ],
      },
    ]
  ),
  '3-3-1': detail(
    'System prompt là “spec” behavior — version như code. Mục tiêu: prompts/v1.yaml git + eval harness 10 cases regression.',
    [
      {
        heading: 'System prompt testing',
        items: [
          'Golden transcripts expected behavior assert.',
          'CI run eval against mock LLM deterministic.',
          'Human review rubric 1-5 helpfulness monthly.',
          'Edge cases refuse harmful summarize long.',
          'Track pass rate dashboard prompt version.',
        ],
      },
      {
        heading: 'Versioning',
        items: [
          'prompt_version column conversation metadata.',
          'A/B flag 10% traffic v2 measure quality.',
          'Changelog prompt markdown why changed.',
          'Rollback instant config env PROMPT_V1.',
          'Never hot-edit prod prompt without commit.',
        ],
      },
    ]
  ),
  '3-3-2': detail(
    'API key là liability — cost control tránh bankruptcy attack. Mục tiêu: key server-only + per-user daily token cap enforce.',
    [
      {
        heading: 'API key protection',
        items: [
          'OPENAI_API_KEY backend env never VITE_.',
          'Rotate key if leaked GitHub alert.',
          'Separate keys dev staging prod billing.',
          'Proxy all LLM calls no client direct.',
          'Audit log admin export keys touched.',
        ],
      },
      {
        heading: 'Cost controls',
        items: [
          'Hard cap $/day provider billing alert.',
          'Soft cap throttle user 429 friendly.',
          'Max tokens per request middleware.',
          'Disable signups open relay abuse prevention.',
          'Table spend daily review first month launch.',
        ],
      },
    ]
  ),
  '3-3-3': detail(
    'Ship MVP đủ history stream và đo chất lượng cơ bản. Mục tiêu: checklist launch + 5 manual eval scores documented.',
    [
      {
        heading: 'Chat history',
        items: [
          'Sidebar list conversations search title.',
          'Resume thread load messages paginate scroll up.',
          'Export json transcript user request.',
          'Delete thread confirm modal.',
          'Mobile responsive history drawer.',
        ],
      },
      {
        heading: 'Streaming',
        items: [
          'Production SSE stable nginx config verified.',
          'Reconnect guidance error not silent fail.',
          'Markdown stream incremental render safe.',
          'Performance 10 concurrent users VPS tier.',
          'Monitor stream error rate metric.',
        ],
      },
      {
        heading: 'Basic evaluation',
        items: [
          'Thumbs up/down per assistant message store.',
          'Sample 50 production thumbs weekly review.',
          'Latency p95 + thumbs correlation analysis.',
          'Top 3 failure categories tag manual.',
          'Portfolio case study section chatbot metrics.',
        ],
      },
    ]
  ),
};
