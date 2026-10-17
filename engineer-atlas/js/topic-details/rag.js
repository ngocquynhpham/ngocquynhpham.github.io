import { detail } from './helpers.js';

export default {
  '4-0-0': detail(
    'RAG = retrieve then generate — embedding là bước đầu pipeline. Mục tiêu: diagram ingest → embed → store → query → answer.',
    [
      {
        heading: 'RAG pipeline',
        items: [
          'Offline: parse chunk embed upsert vector DB.',
          'Online: query embed → top-k → prompt LLM.',
          'Failure modes empty retrieval hallucination.',
          'Latency budget retrieve 200ms + LLM 2s.',
          'Implement minimal pipeline notebook then code.',
        ],
      },
      {
        heading: 'Embeddings',
        items: [
          'text-embedding-3-small dimensions 1536 default.',
          'Same model index and query mandatory.',
          'Normalize vectors cosine equivalent dot product.',
          'Batch embed 100 chunks per API call.',
          'Store model version metadata chunk row.',
        ],
      },
    ]
  ),
  '4-0-1': detail(
    'Distance metric phải khớp index và query — sai là ranking vô nghĩa. Mục tiêu: numpy verify cosine vs pgvector <=> same order.',
    [
      {
        heading: 'Cosine similarity',
        items: [
          'cosine = dot(a,b)/(|a||b|) range [-1,1].',
          'Normalized vectors cosine = dot product.',
          'pgvector operator <=> cosine distance.',
          'Threshold min score filter irrelevant.',
          'Plot histogram scores 50 queries calibrate.',
        ],
      },
      {
        heading: 'Dot product',
        items: [
          'OpenAI embeddings normalized — dot ≈ cosine.',
          'Unnormalized dot favors long vectors bias.',
          'Inner product index faiss ip awareness.',
          'Choose metric document vendor recommendation.',
          'Unit test identical ranking cosine vs dot norm.',
        ],
      },
      {
        heading: 'L2 distance',
        items: [
          'Euclidean <-> sqrt(2(1-cosine)) normalized vectors.',
          'L2 sensitive magnitude if not normalized.',
          'When L2 preferred image embeddings note.',
          'Convert threshold L2 to cosine intuitive.',
          'Benchmark no meaningful diff if normalized ok.',
        ],
      },
    ]
  ),
  '4-0-2': detail(
    'Chọn vector store phù hợp scale và ops — pgvector hợp stack PostgreSQL. Mục tiêu: POC search trên Chroma local + pgvector same docs compare.',
    [
      {
        heading: 'Vector databases: Chroma',
        items: [
          'PersistentClient path ./chroma_db collection.',
          'add documents ids embeddings metadatas.',
          'query query_embeddings n_results 5.',
          'Dev prototype fast zero docker.',
          'Limitation multi-tenant prod note migrate.',
        ],
      },
      {
        heading: 'Qdrant',
        items: [
          'Docker qdrant REST gRPC clients.',
          'Payload filter must user_id match.',
          'HNSW params m ef_construct tune intro.',
          'Cloud cluster vs self-host cost.',
          'ProtonX course exercises cross-ref.',
        ],
      },
      {
        heading: 'Supabase & pgvector',
        items: [
          'Supabase pgvector extension enable dashboard.',
          'RLS policy embedding table user scope.',
          'match_documents RPC function SQL.',
          'Single stack auth + vectors advantage.',
          'Engineer Atlas prod target pgvector justify.',
        ],
      },
    ]
  ),
  '4-0-3': detail(
    'Metadata filter thu hẹp search space — semantic alone không đủ ACL. Mục tiêu: query filter document_id + user_id top-k.',
    [
      {
        heading: 'Metadata filtering',
        items: [
          'Chunk metadata source page lang created_at.',
          'Pre-filter SQL WHERE before vector order.',
          'Composite index btree + vector ivfflat.',
          'Filter too aggressive zero results fallback.',
          'Test user A doc never retrieve user B.',
        ],
      },
      {
        heading: 'Indexing',
        items: [
          'ivfflat lists = sqrt(n) rule thumb start.',
          'REINDEX after bulk insert quality.',
          'Monitor recall@10 drop index stale.',
          'HNSW pgvector newer option read docs.',
          'Benchmark seq scan vs index 10k chunks.',
        ],
      },
      {
        heading: 'Semantic search',
        items: [
          'Query rewrite expand acronym optional.',
          'HyDE generate hypothetical doc embed advanced.',
          'Multi-query retrieve union dedupe.',
          'Highlight chunk snippet UI citation.',
          'Log query embedding cache redis optional.',
        ],
      },
    ]
  ),
  '4-1-0': detail(
    'Garbage in garbage out — PDF parse quyết định chunk quality. Mục tiêu: pipeline extract text 10 page PDF loại header/footer lặp.',
    [
      {
        heading: 'PDF parsing',
        items: [
          'pypdf/pdfplumber compare table extraction.',
          'Detect scanned PDF needs OCR tesseract flag.',
          'Extract per page preserve page number metadata.',
          'Handle multi-column reading order fix.',
          'Store raw text blob audit reparse.',
        ],
      },
      {
        heading: 'Cleaning',
        items: [
          'Remove repeated headers footers regex.',
          'Normalize unicode NFC whitespace collapse.',
          'Strip hyphen line break join words.',
          'Language detect filter non-target docs.',
          'Quality metric chars per page sanity band.',
        ],
      },
      {
        heading: 'Text extraction',
        items: [
          'Max file size 20MB upload policy.',
          'Encoding utf-8 errors replace.',
          'Tables export markdown or skip note loss.',
          'Images captions OCR optional later.',
          'Unit test golden PDF text snapshot hash.',
        ],
      },
    ]
  ),
  '4-1-1': detail(
    'Chunk size trade-off precision vs context — recursive phổ biến. Mục tiêu: thử 512 vs 1024 token cùng doc measure retrieval MRR.',
    [
      {
        heading: 'Character chunking',
        items: [
          'Fixed 1000 char overlap 200 simple baseline.',
          'Fast no tokenizer dependency.',
          'Breaks mid-word sentence bad boundaries.',
          'Use only uniform short notes.',
          'Benchmark vs recursive same corpus.',
        ],
      },
      {
        heading: 'Recursive chunking',
        items: [
          'LangChain RecursiveCharacterTextSplitter separators hierarchy.',
          'chunk_size 800 chunk_overlap 100 tokens.',
          'Split \\n\\n then \\n then space.',
          'Preserve paragraph semantic units.',
          'Default choice document portfolio RAG.',
        ],
      },
      {
        heading: 'Semantic chunking',
        items: [
          'Embed sentences merge until breakpoint similarity drop.',
          'Higher cost embed many sentences once offline.',
          'Better variable length sections papers.',
          'ProtonX #15 chunking course lab ref.',
          'Try semantic 5 docs compare manual review.',
        ],
      },
    ]
  ),
  '4-1-2': detail(
    'Embedding pipeline batch robust — idempotent re-run. Mục tiêu: Celery/BackgroundTasks job embed 500 chunks retry failed ids.',
    [
      {
        heading: 'Embedding pipelines',
        items: [
          'Queue job per document status pending processing done.',
          'Idempotent upsert chunk_id unique constraint.',
          'Dead letter queue failed after 3 retries.',
          'Progress webhook UI percent complete.',
          'Dry run count tokens cost estimate pre-flight.',
        ],
      },
      {
        heading: 'Batch processing',
        items: [
          'Batch size 64 respect API max input.',
          'Rate limit sleep between batches TPM.',
          'Parallel workers 2 not exceed account RPM.',
          'Checkpoint last processed page crash recovery.',
          'Metrics throughput chunks/minute log.',
        ],
      },
    ]
  ),
  '4-1-3': detail(
    'Document lifecycle index versioning — re-index khi đổi model. Mục tiêu: document version column re-embed job trigger on model bump.',
    [
      {
        heading: 'Document metadata',
        items: [
          'Fields title source_url uploaded_by checksum sha256.',
          'Version int increment content replace.',
          'Soft delete exclude retrieval filter.',
          'MIME type size uploaded_at audit.',
          'Glossary map metadata → filter UI facets.',
        ],
      },
      {
        heading: 'Indexing',
        items: [
          'Transactional delete old chunks insert new same doc_id.',
          'Bulk COPY insert performance optional.',
          'Verify chunk count matches expectation alert.',
          'Search index warm after large import.',
          'Staging index validate before swap prod.',
        ],
      },
      {
        heading: 'Re-indexing',
        items: [
          'Migration embedding_model v2 → full re-embed plan.',
          'Blue index collection swap zero downtime pattern.',
          'Compare recall@5 v1 vs v2 golden set.',
          'Schedule off-peak weekend maintenance window.',
          'Rollback keep v1 vectors until v2 validated.',
        ],
      },
    ]
  ),
  '4-2-0': detail(
    'Top-K và threshold cân bằng recall vs noise context. Mục tiêu: tune k=5 score>0.75 trên golden 30 questions.',
    [
      {
        heading: 'Top-K retrieval',
        items: [
          'Start k=5 increase if recall low eval.',
          'Dedupe same document multiple chunks collapse.',
          'MMR diversity optional reduce redundancy.',
          'Token budget fit k chunks in context window.',
          'Log retrieved ids per query debug panel.',
        ],
      },
      {
        heading: 'Relevance thresholds',
        items: [
          'Min cosine similarity 0.7 calibrate empirically.',
          'If none pass threshold no-answer path.',
          'Dynamic k stop when score drop cliff.',
          'Plot precision@k curve choose knee.',
          'Document threshold per corpus language.',
        ],
      },
    ]
  ),
  '4-2-1': detail(
    'Hybrid beat pure semantic on keyword-heavy queries SKUs codes. Mục tiêu: BM25 + vector fusion RRF 20 queries compare.',
    [
      {
        heading: 'Keyword/BM25',
        items: [
          'PostgreSQL tsvector GIN full text search.',
          'ts_rank_cd combine with vector score.',
          'Strong on exact SKU error code matches.',
          'Vietnamese tokenizer config if needed.',
          'Baseline BM25 alone recall@5 metric.',
        ],
      },
      {
        heading: 'Semantic retrieval',
        items: [
          'Paraphrase question same meaning different words.',
          'Weak exact match rare token.',
          'Embedding query same model as index.',
          'Baseline vector alone recall@5 metric.',
          'Failure cases list where semantic wins loses.',
        ],
      },
    ]
  ),
  '4-2-2': detail(
    'Reranker polish top-20 → top-5 — latency cost trade-off. Mục tiêu: cross-encoder rerank API or local ms-marco MiniLM pipeline.',
    [
      {
        heading: 'Hybrid search',
        items: [
          'RRF score = sum 1/(k+rank) merge lists.',
          'Weight alpha*semantic + (1-alpha)*bm25 tune.',
          'Retrieve 20 candidates rerank to 5.',
          'ProtonX keyword + rerank labs reference.',
          'AB test user satisfaction hybrid vs vector.',
        ],
      },
      {
        heading: 'Rerank fundamentals',
        items: [
          'Cross-encoder query doc pair score costly.',
          'Cohere rerank API simple integration.',
          'Latency +100ms budget acceptable.',
          'Cache rerank query doc hash optional.',
          'Measure nDCG@5 before after rerank.',
        ],
      },
    ]
  ),
  '4-2-3': detail(
    'Answer phải grounded cite source — no answer tốt hơn bịa. Mục tiêu: prompt bắt buộc [doc_id:page] citation + eval faithfulness.',
    [
      {
        heading: 'Grounded answers',
        items: [
          'System: chỉ dùng provided context chunks.',
          'Quote verbatim short spans when precise.',
          'Conflict chunks acknowledge uncertainty.',
          'Temperature 0 Q&A factual mode.',
          'Human review 10 answers spot hallucination.',
        ],
      },
      {
        heading: 'Citations',
        items: [
          'UI footnote link chunk source preview.',
          'Format [1] doc title page 3 in response.',
          'Store citation chunk ids message metadata.',
          'Click citation scroll highlight PDF viewer.',
          'Invalid citation id validation post-process.',
        ],
      },
      {
        heading: 'No-answer behavior',
        items: [
          'Template “Không tìm thấy trong tài liệu” standard.',
          'Suggest rephrase query narrower topic.',
          'Do not general knowledge fill gap policy.',
          'Log no-answer rate product insight gap.',
          'Fallback human support ticket link optional.',
        ],
      },
    ]
  ),
  '4-3-0': detail(
    'Retrieval metrics objective — không đoán cảm giác. Mục tiêu: golden set 50 Q + judged relevant doc ids compute Hit@5 Recall@5.',
    [
      {
        heading: 'Hit@K',
        items: [
          'Hit@5 = any relevant in top 5 binary.',
          'Per question compute aggregate mean.',
          'Stratify by question type factual vs conceptual.',
          'Track Hit@5 over embedding model changes.',
          'Target Hit@5 > 0.85 sprint goal write down.',
        ],
      },
      {
        heading: 'Recall@K',
        items: [
          'Recall@5 = relevant found / total relevant.',
          'Multi relevant docs per question set.',
          'Recall@10 higher easier compare fairly same k.',
          'Identify questions zero recall root cause.',
          'Spreadsheet golden q rel_doc_ids maintain.',
        ],
      },
      {
        heading: 'MRR & nDCG',
        items: [
          'MRR mean reciprocal rank first hit.',
          'nDCG graded relevance 0-3 human judge.',
          'sklearn or ranx library compute.',
          'Report MRR alongside Hit for ranking quality.',
          'Executive summary one paragraph metrics month 5.',
        ],
      },
    ]
  ),
  '4-3-1': detail(
    'Generation quality separate retrieval — Ragas framework intro. Mục tiêu: score 20 answers relevance groundedness faithfulness labels.',
    [
      {
        heading: 'Answer relevance',
        items: [
          'LLM judge prompt rate 1-5 answers question.',
          'Irrelevant despite good retrieval diagnose prompt.',
          'User thumbs proxy relevance production.',
          'Filter training data low relevance retrain N/A.',
          'Dashboard avg relevance weekly trend.',
        ],
      },
      {
        heading: 'Groundedness',
        items: [
          'Each claim supported by chunk yes/no audit.',
          'Unsupported sentence count metric.',
          'Auto checker NLI model optional advanced.',
          'Compare groundedness temp 0 vs 0.7.',
          'Block publish if groundedness < threshold internal bot.',
        ],
      },
      {
        heading: 'Faithfulness',
        items: [
          'Answer contradict context = unfaithful.',
          'Numerical facts must match source exactly.',
          'Ragas faithfulness score API run sample.',
          'Error analysis top 5 unfaithful patterns.',
          'Fix prompt cite-only reduce faithfulness errors.',
        ],
      },
    ]
  ),
  '4-3-2': detail(
    'Golden set living document — failure analysis drives iteration. Mục tiêu: add 10 failures from prod to golden + fix retrieve or prompt.',
    [
      {
        heading: 'Golden question set',
        items: [
          'Cover all doc sections min 2 questions each.',
          'Include Vietnamese English mixed if applicable.',
          'Negative questions should no-answer.',
          'Version golden v1 git json file.',
          'Review quarterly stale remove obsolete.',
        ],
      },
      {
        heading: 'Failure analysis',
        items: [
          'Tag failure retrieve | rerank | generate | citation.',
          'Matrix count tags prioritize max impact.',
          'Spike session 2h five failures deep dive.',
          'Ticket per systemic issue chunk size etc.',
          'Before after metric prove fix worked.',
        ],
      },
    ]
  ),
  '4-3-3': detail(
    'RAG prod = quality + latency + cost triangle — Ragas automate. Mục tiêu: run Ragas batch report latency p95 cost/query cent.',
    [
      {
        heading: 'Ragas basics',
        items: [
          'pip install ragas dataset Question answer contexts ground_truth.',
          'Metrics context_precision context_recall faithfulness.',
          'Run offline CI nightly golden subset.',
          'Interpret score 0-1 target thresholds team.',
          'Link ProtonX #24 evaluation module.',
        ],
      },
      {
        heading: 'Latency',
        items: [
          'Breakdown embed_ms retrieve_ms llm_ms total.',
          'Cache query embedding repeat questions.',
          'Async pipeline overlap retrieve prep prompt.',
          'SLA p95 < 4s user facing chat.',
          'Optimize bottleneck highest ms component.',
        ],
      },
      {
        heading: 'Quality & cost',
        items: [
          'Cost per query embed + llm + rerank USD.',
          'Quality metric vs cost Pareto chart models.',
          'Cheaper model rerank only top doc answer.',
          'Monthly report stakeholders ragas + spend.',
          'Portfolio case study RAG eval section publish.',
        ],
      },
    ]
  ),
};
