import {
  STATUS_LABELS,
  MODULES,
  MONTH_OUTCOMES,
  DOMAIN_SHORT,
  TOPIC_DETAILS,
  OPTIONAL_TRACKS,
  PROTON,
  PROTON_WEEK_REFS,
  allTopics,
  getTopicSubtopics,
  CORE_KNOWLEDGE_EXPANSION_PHASES,
  CORE_KNOWLEDGE_EXPANSION_TOPIC_IDS,
} from './content.js';
import {
  getData,
  loadLocal,
  patchProgress,
  exportBackup,
  importBackup,
  resetProgress,
  statusForTopic,
  onSyncStateChange,
  getSyncState,
  seedCapstoneIfNeeded,
} from './progress.js';
import {
  authModeLabel,
  getUser,
  initAuth,
  onAuthStateChanged,
  signInWithGoogle,
  signOutUser,
} from './auth.js';
import {
  knowledgeCoverage,
  topicsCompletedCount,
  moduleLearningProgress,
  overallSubtopicProgress,
  countPracticeArtifacts,
  activeLearningDaysCount,
  learningMomentumLabel,
  pickContinueTopic,
  nextUncheckedSubtopic,
  topicSubtopicStats,
  weakTopics,
  MODULE_SHORT,
} from './insights.js';
import { mountKnowledgeMap, getStoredMapMode } from './knowledge-map.js';
import {
  CAPSTONE_DRAFT_SEED_IDS,
  CAPSTONE_PHASES,
  CAPSTONE_SUBTITLE,
  CAPSTONE_TITLE,
  PUBLIC_CASE_STUDY_URL,
} from './capstone.js';
import {
  CAPSTONE_STATUS_LABELS,
  capstoneProgress,
  capstoneStatusFor,
  exportPublicCapstonePayload,
  nextCapstoneTask,
  phaseProgress,
} from './capstone-insights.js';
import { getLearningProgram } from './learning-programs/registry.js';
import { computeProgramStats } from './learning-programs/stats.js';
import { applyProgramDefaults } from './learning-programs/state.js';
import { programUrl } from './atlas-paths.js';

const TOPICS = allTopics();
const expandedTopics = new Set(['0-0-0']);

let view = 'dashboard';
let month = 0;
let search = '';
let filter = 'all';
let libModule = 'all';
let protonFilter = 'all';
let roadmapSubOpen = false;
let sidebarCollapsed = false;
const capstoneOpenPhases = new Set(CAPSTONE_PHASES.map((p) => p.id));
/** @type {ReturnType<typeof mountKnowledgeMap> | null} */
let knowledgeMapCtrl = null;

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );

function n(status) {
  return TOPICS.filter((t) => statusForTopic(t.id) === status).length;
}

function moduleProgress(mi) {
  const ts = TOPICS.filter((t) => t.module === mi);
  const covered = ts.filter((t) => ['done', 'known'].includes(statusForTopic(t.id))).length;
  return ts.length ? Math.round((covered / ts.length) * 100) : 0;
}

function overallPct() {
  const covered = n('done') + n('known');
  return TOPICS.length ? Math.round((covered / TOPICS.length) * 100) : 0;
}

function panelHeader(eyebrow, title, desc) {
  return `<header class="panel-header"><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1><p class="panel-desc">${esc(desc)}</p></header>`;
}

function bar(p) {
  const w = Math.max(0, Math.min(100, Number(p) || 0));
  return `<div class="bar"><div class="fill" style="width:${w}%"></div></div>`;
}

function statusOptions(_id, current) {
  return Object.entries(STATUS_LABELS)
    .map(([k, v]) => `<option value="${k}" ${current === k ? 'selected' : ''}>${esc(v)}</option>`)
    .join('');
}

function statusSelect(current, { ariaLabel, dataStatus, dataProton, dataOptional, plain } = {}) {
  let attrs = '';
  if (dataStatus != null) attrs += ` data-status="${dataStatus}"`;
  if (dataProton != null) attrs += ` data-proton="${dataProton}"`;
  if (dataOptional != null) attrs += ` data-optional="${dataOptional}"`;
  const wrapClass = plain ? 'select-wrap select-wrap--plain' : `select-wrap status-${current}`;
  return `<div class="${wrapClass}"><select class="select-status" aria-label="${esc(ariaLabel)}"${attrs}>${statusOptions('', current)}</select></div>`;
}

function capstoneStatusSelect(id, current) {
  const opts = Object.entries(CAPSTONE_STATUS_LABELS)
    .map(([k, v]) => `<option value="${k}" ${current === k ? 'selected' : ''}>${esc(v)}</option>`)
    .join('');
  return `<div class="select-wrap select-wrap--plain capstone-status-wrap capstone-status-${current}"><select class="select-status" data-capstone-status="${id}" aria-label="Trạng thái capstone">${opts}</select></div>`;
}

function syncCapstoneSelectWrap(selectEl) {
  const wrap = selectEl.closest('.capstone-status-wrap');
  if (!wrap) return;
  wrap.classList.remove('capstone-status-todo', 'capstone-status-draft', 'capstone-status-review', 'capstone-status-done');
  wrap.classList.add(`capstone-status-${selectEl.value}`);
}

function capstoneTaskRow(task, phase) {
  const data = getData();
  const st = capstoneStatusFor(task.id);
  const notes = data.capstoneNotes?.[task.id] || '';
  const link = data.capstoneLinks?.[task.id] || '';
  const doneClass = st === 'done' ? ' is-done' : st === 'draft' ? ' is-draft' : '';
  const hint = task.docHint ? `<p class="capstone-doc-hint">${esc(task.docHint)}</p>` : '';
  const pub =
    task.public === false
      ? '<span class="tag tag-muted">Không export public</span>'
      : `<span class="tag">Public: ${esc(task.publicLabel)}</span>`;

  return `<article class="capstone-task${doneClass}" data-capstone-id="${task.id}">
    <div class="capstone-task-main">
      <div class="capstone-task-title">${esc(task.privateLabel)}</div>
      ${hint}
      <div class="capstone-task-tags">${pub}</div>
      <details class="capstone-task-details">
        <summary>Ghi chú / link</summary>
        <label class="field-label" for="cap-note-${task.id}">Ghi chú</label>
        <textarea class="field" id="cap-note-${task.id}" data-capstone-note="${task.id}" rows="2" placeholder="Quyết định, blockers…">${esc(notes)}</textarea>
        <label class="field-label" for="cap-link-${task.id}">Link (repo, PR, demo)</label>
        <input class="field" id="cap-link-${task.id}" data-capstone-link="${task.id}" value="${esc(link)}" placeholder="https://...">
      </details>
    </div>
    ${capstoneStatusSelect(task.id, st)}
  </article>`;
}

function capstoneDashboardCard() {
  const prog = capstoneProgress();
  const next = nextCapstoneTask();
  const nextLine = next
    ? `<p class="continue-meta">Tiếp: <strong>${esc(next.privateLabel)}</strong> · ${esc(CAPSTONE_STATUS_LABELS[next.status] || next.status)}</p>`
    : '<p class="continue-meta">Checklist capstone đã xong.</p>';
  return `<div class="card capstone-dash-card">
    <div class="card-title">${esc(CAPSTONE_TITLE)}</div>
    <p class="muted">Capstone build · ${prog.done}/${prog.total} (${prog.pct}%)</p>
    ${bar(prog.pct)}
    ${nextLine}
    <div class="btn-row">${btn('Mở checklist', "go('capstone')", '')}</div>
  </div>`;
}

function capstoneView() {
  const prog = capstoneProgress();
  const next = nextCapstoneTask();

  const phasesHtml = CAPSTONE_PHASES.map((phase) => {
    const pp = phaseProgress(phase.id);
    const open = capstoneOpenPhases.has(phase.id);
    const rows = phase.tasks.map((t) => capstoneTaskRow(t, phase)).join('');
    return `<section class="capstone-phase card">
      <button type="button" class="capstone-phase-head" data-capstone-phase-toggle="${phase.id}" aria-expanded="${open}">
        <span class="capstone-phase-index">${String(phase.index).padStart(2, '0')}</span>
        <span class="capstone-phase-title">${esc(phase.title)}</span>
        <span class="tag">${esc(phase.tags)}</span>
        <span class="capstone-phase-progress">${pp.done}/${pp.total}</span>
      </button>
      <div class="capstone-phase-body${open ? '' : ' hidden'}" id="cap-phase-${phase.id}">${rows}</div>
    </section>`;
  }).join('');

  const nextBlock = next
    ? `<div class="continue-card capstone-next">
        <div class="eyebrow">◎ Việc capstone tiếp theo</div>
        <h2 class="continue-title">${esc(next.privateLabel)}</h2>
        <p class="continue-meta">Phase ${String(next.phaseIndex).padStart(2, '0')} · ${esc(next.phaseTitle)} · ${esc(CAPSTONE_STATUS_LABELS[next.status] || next.status)}</p>
      </div>`
    : `<div class="callout"><strong>Capstone checklist hoàn tất.</strong> Cập nhật trang public và portfolio.</div>`;

  return `<div class="page capstone-page">${panelHeader(
    'Capstone',
    CAPSTONE_TITLE,
    `${CAPSTONE_SUBTITLE}. Checklist nội bộ — tên task có thể nhắc tài liệu riêng; export public chỉ dùng nhãn kỹ thuật generic.`
  )}
  <div class="card capstone-summary">
    <div class="capstone-summary-top">
      <div><div class="card-title">Tiến độ capstone</div><p class="muted">${prog.done} / ${prog.total} xong · ${prog.pct}%</p></div>
      <a class="btn secondary" href="${esc(PUBLIC_CASE_STUDY_URL)}" target="_blank" rel="noopener">Trang public ↗</a>
    </div>
    ${bar(prog.pct)}
  </div>
  ${nextBlock}
  <div class="callout"><strong>Private workspace:</strong> PRD/schema thật giữ ngoài GitHub Pages. <strong>Public:</strong> export JSON → thay nội dung <code>projects/operations-platform/public-progress.json</code> rồi commit.</div>
  <div class="btn-row">
    <button type="button" class="btn" id="exportCapstonePublicBtn">↓ Export public progress JSON</button>
    <button type="button" class="btn secondary" id="copyCapstonePublicBtn">Copy JSON</button>
  </div>
  <div class="capstone-phases">${phasesHtml}</div>
  </div>`;
}

function filterSelect(id, options, current) {
  const opts = options
    .map(([val, label]) => `<option value="${val}" ${String(current) === String(val) ? 'selected' : ''}>${esc(label)}</option>`)
    .join('');
  return `<div class="select-wrap select-wrap--plain"><select class="select-status" id="${id}">${opts}</select></div>`;
}

function syncSelectWrap(selectEl) {
  const wrap = selectEl.closest('.select-wrap');
  if (!wrap || wrap.classList.contains('select-wrap--plain')) return;
  wrap.classList.remove('status-todo', 'status-doing', 'status-done', 'status-known', 'status-later');
  wrap.classList.add(`status-${selectEl.value}`);
}

function renderCurriculum(id) {
  const detail = TOPIC_DETAILS[id];
  if (!detail) return '';
  const subs = getTopicSubtopics(id);
  const data = getData();
  const sections = detail.sections
    .map((s, si) => {
      const items = s.items
        .map((text, ii) => {
          const sid = `${id}-${si}-${ii}`;
          const checked = Boolean(data.subtopicChecks?.[sid]);
          return `<li class="subtopic-item${checked ? ' is-done' : ''}"><label><input type="checkbox" data-subtopic="${sid}" ${checked ? 'checked' : ''}><span>${esc(text)}</span></label></li>`;
        })
        .join('');
      return `<div class="learn-block"><h4>${esc(s.heading)}</h4><ul class="subtopic-list">${items}</ul></div>`;
    })
    .join('');
  const stats = subs.length
    ? `<p class="muted" style="margin:0 0 10px">Tiến độ checklist: <strong>${subs.filter((s) => data.subtopicChecks?.[s.id]).length}/${subs.length}</strong> mục con</p>`
    : '';
  const intro = detail.intro ? `<p class="muted">${esc(detail.intro)}</p>` : '';
  return `<div class="card-title" style="margin-top:4px">Nội dung cần học</div>${stats}${intro}${sections}`;
}

function topicRow(t) {
  const id = t.id;
  const data = getData();
  const status = statusForTopic(id);
  const weekName = t.weekName || MODULES[t.module].weeks[t.week][0];
  const weekNum = t.module * 4 + t.week + 1;
  const hasDetail = Boolean(TOPIC_DETAILS[id]);
  const isOpen = expandedTopics.has(id);
  const notes = data.notes[id] || '';
  const link = data.links[id] || '';
  const doingClass = status === 'doing' ? ' is-doing' : '';
  const meta = TOPIC_DETAILS[id];
  const badgeParts = [];
  if (meta?.moduleKind === 'core') badgeParts.push('<span class="tag">Core knowledge</span>');
  if (meta?.moduleKind === 'optional') badgeParts.push('<span class="tag tag-muted">Explore later · Tùy chọn</span>');
  if (meta?.priority === 'high') badgeParts.push('<span class="tag">Ưu tiên cao</span>');
  if (meta?.durationEstimate) badgeParts.push(`<span class="tag tag-muted">${esc(meta.durationEstimate)}</span>`);
  if (meta?.expansionPhase) badgeParts.push(`<span class="tag tag-muted">Phase ${meta.expansionPhase}</span>`);
  const badges = badgeParts.length ? `<div class="topic-badges" style="margin-top:6px;display:flex;flex-wrap:wrap;gap:6px">${badgeParts.join('')}</div>` : '';

  const expandLabel = hasDetail
    ? isOpen
      ? '▾ Thu gọn nội dung học'
      : '▸ Xem nội dung cần học'
    : notes || link
      ? '▾ Ghi chú'
      : '＋ Ghi chú / tài liệu';

  return `<article class="topic-row${doingClass}" data-id="${id}">
    <div>
      <div class="topic-title">${esc(t.title)}</div>
      ${badges}
      <div class="topic-meta">${esc(MODULES[t.module].name)} · Tuần ${weekNum} · <span class="week-name">${esc(weekName)}</span></div>
      <div class="topic-expand">
        <button type="button" class="expand-btn" data-expand="${id}" aria-expanded="${isOpen}">${expandLabel}</button>
      </div>
      <div class="topic-body${isOpen ? '' : ' hidden'}" id="body-${id}">
        ${hasDetail ? renderCurriculum(id) : ''}
        <label class="field-label" for="note-${id}">Ghi chú của bạn</label>
        <textarea class="field" id="note-${id}" data-note="${id}" placeholder="Khái niệm, ví dụ, lỗi đã gặp...">${esc(notes)}</textarea>
        <label class="field-label" for="link-${id}">Link tài liệu</label>
        <input class="field" id="link-${id}" data-link="${id}" value="${esc(link)}" placeholder="https://...">
        <div class="notehint">Tự động lưu khi nhập</div>
      </div>
    </div>
    ${statusSelect(status, { ariaLabel: `Trạng thái ${t.title}`, dataStatus: id })}
  </article>`;
}

function topicLearningProgressFallback(topicId) {
  const st = statusForTopic(topicId);
  if (st === 'done') return 100;
  if (st === 'doing') return 15;
  return 0;
}

function dashboardView() {
  const cov = knowledgeCoverage(TOPICS);
  const doneStats = topicsCompletedCount(TOPICS);
  const subOverall = overallSubtopicProgress(TOPICS);
  const continueT = pickContinueTopic(TOPICS);
  const weak = weakTopics(TOPICS);

  let continueBlock = `<div class="empty">Chưa có chủ đề ưu tiên. Mở lộ trình và chọn “Đang học” hoặc bắt đầu một chủ đề “Chưa học”.</div>`;
  if (continueT) {
    const wn = continueT.weekName || MODULES[continueT.module].weeks[continueT.week][0];
    const weekNum = continueT.module * 4 + continueT.week + 1;
    const st = topicSubtopicStats(continueT.id);
    const next = nextUncheckedSubtopic(continueT.id);
    const subLine =
      st.total > 0
        ? `${st.checked}/${st.total} mục con · ${st.pct}% tiến độ học`
        : 'Chưa có checklist chi tiết — thêm đề cương dần cho từng chủ đề';
    continueBlock = `<div class="continue-card">
      <div class="eyebrow">◎ Tiếp tục học hôm nay</div>
      <h2 class="continue-title">${esc(continueT.title)}</h2>
      <p class="continue-meta">${esc(MODULES[continueT.module].name)} · Tuần ${weekNum} · ${esc(wn)}</p>
      <div class="bar"><div class="fill" style="width:${st.total ? st.pct : topicLearningProgressFallback(continueT.id)}%"></div></div>
      <p class="continue-meta">${subLine}</p>
      ${next ? `<p class="continue-next">Tiếp theo: <strong>${esc(next.text)}</strong></p>` : '<p class="continue-next">Checklist đã xong — cập nhật trạng thái “Đã hoàn thành” hoặc ghi link thực hành.</p>'}
      <div class="btn-row">${btn('Mở chủ đề', `openTopic('${continueT.id}')`, '')}${btn('Lộ trình tháng ' + (continueT.module + 1), `openTopic('${continueT.id}')`, 'secondary')}</div>
    </div>`;
  }

  const domainBars = MODULES.map((m, i) => {
    const pct = moduleLearningProgress(i, TOPICS);
    return `<div class="domain-row"><div class="domain-row-top"><span>${esc(MODULE_SHORT[i])}</span><span>${pct}%</span></div>${bar(pct)}</div>`;
  }).join('');

  const weakList =
    weak.length > 0
      ? `<ul class="subtopic-list">${weak
          .map(
            (w) =>
              `<li class="subtopic-item"><span><strong>${esc(w.topic.title)}</strong> — ${w.pct}% checklist (${w.checked}/${w.total})</span></li>`
          )
          .join('')}</ul>`
      : '<p class="muted">Không có mục “Đang học” cần ưu tiên, hoặc chưa có checklist chi tiết.</p>';

  return `<div class="page dash-page">
  <div class="dash-hero">
    <div>${panelHeader(
      'Tổng quan / Bảng học tập',
      'Hành trình học của bạn',
      'Phạm vi kiến thức và tiến độ checklist tách riêng. “Đã biết” không tính là vừa học xong; “Để sau” không làm lệch sprint hiện tại.'
    )}</div>
    <div class="dash-hero-icon" aria-hidden="true">🎓</div>
  </div>
  <div class="kpi-grid">
    <div class="kpi-card"><div class="kpi-value">${cov.pct}%</div><div class="kpi-label">Phạm vi kiến thức</div><div class="kpi-hint">Hoàn thành + đã biết · ${cov.covered}/${cov.total} chủ đề sprint</div></div>
    <div class="kpi-card"><div class="kpi-value">${doneStats.done}<span style="font-size:14px;font-weight:600;color:var(--fg3)">/${doneStats.total}</span></div><div class="kpi-label">Chủ đề hoàn thành</div><div class="kpi-hint">Chỉ tính “Đã hoàn thành”, không gồm “Đã biết”</div></div>
    <div class="kpi-card"><div class="kpi-value">${subOverall.pct}%</div><div class="kpi-label">Tiến độ học (checklist)</div><div class="kpi-hint">${subOverall.checked}/${subOverall.total} mục con</div></div>
    <div class="kpi-card"><div class="kpi-value">${activeLearningDaysCount()}</div><div class="kpi-label">Ngày có hoạt động</div><div class="kpi-hint">${countPracticeArtifacts()} bằng chứng (link/ghi chú)</div></div>
  </div>
  ${continueBlock}
  ${pythonProgramDashboardCard()}
  ${coreExpansionDashboardCard()}
  ${capstoneDashboardCard()}
  <div class="domain-block">
    <div class="domain-head"><h2 style="margin:0;font-size:15px">Tiến độ học theo lĩnh vực</h2><span class="tag">Checklist + “Đã hoàn thành”</span></div>
    ${domainBars}
  </div>
  <div class="card insight-card">
    <div class="card-title">Xu hướng & điểm cần củng cố</div>
    <p class="muted">${esc(learningMomentumLabel())}</p>
    <p class="muted" style="margin-top:10px"><strong>Đang yếu / chưa xong:</strong></p>
    ${weakList}
  </div>
  </div>`;
}

function coreExpansionDashboardCard() {
  const ids = CORE_KNOWLEDGE_EXPANSION_TOPIC_IDS;
  const done = ids.filter((id) => statusForTopic(id) === 'done').length;
  const doing = ids.filter((id) => statusForTopic(id) === 'doing').length;
  const pct = ids.length ? Math.round((done / ids.length) * 100) : 0;
  const phases = CORE_KNOWLEDGE_EXPANSION_PHASES.map((ph) => {
    const phaseTopics = ph.topicIds?.length
      ? ph.topicIds
      : ph.optionalTrackKey
        ? []
        : [];
    const phaseDone = phaseTopics.filter((id) => ['done', 'known'].includes(statusForTopic(id))).length;
    const sub =
      ph.optionalTrackKey
        ? `<span class="muted">Explore later → tab Optional</span>`
        : `<span class="muted">${phaseDone}/${phaseTopics.length} chủ đề</span>`;
    return `<li class="subtopic-item"><strong>${esc(ph.label)}</strong> — ${esc(ph.note)} ${sub}</li>`;
  }).join('');
  return `<div class="card insight-card">
    <div class="card-title">Core Engineering Knowledge Expansion</div>
    <p class="muted">FE-first + interview depth · ${done}/${ids.length} hoàn thành · ${doing} đang học · ${pct}% checklist roadmap expansion.</p>
    ${bar(pct)}
    <p class="muted" style="margin-top:12px"><strong>Thứ tự đề xuất (không học tuần tự cả khối):</strong></p>
    <ul class="subtopic-list">${phases}</ul>
    <div class="btn-row">${btn('Tháng 1 · Browser Storage', "openTopic('0-4-0')", 'secondary')}${btn('Tháng 2 · SQL depth', "openTopic('1-4-0')", 'secondary')}</div>
  </div>`;
}

function pythonProgramDashboardCard() {
  const program = getLearningProgram('python-100-days-angela-yu');
  if (!program) return '';
  applyProgramDefaults(program.id);
  const stats = computeProgramStats(program);
  return `<div class="card program-dash-card">
    <div class="eyebrow">Python Engineering / Learning Program</div>
    <h2 style="margin:6px 0 4px;font-size:17px">${esc(program.shortTitle)}</h2>
    <p class="muted">${esc(program.instructor)} · ${esc(program.platform)} · <span class="tag">${esc(stats.programStatusLabel)}</span></p>
    <div class="program-progress-row" style="margin-top:12px">
      <div class="program-progress-pct" style="font-size:28px">${stats.completionPct}%</div>
      <div class="program-progress-meta" style="flex:1">
        <p class="muted">${stats.completed} / ${stats.total} days completed</p>
        ${bar(stats.completionPct)}
      </div>
    </div>
    <div class="program-stat-grid program-stat-grid--2" style="margin-top:12px">
      <div><div class="program-stat-value">${stats.completed}</div><div class="program-stat-label">Completed</div></div>
      <div><div class="program-stat-value">${stats.notStarted}</div><div class="program-stat-label">Chưa tick</div></div>
    </div>
    <div class="btn-row">
      <a class="btn" href="${esc(programUrl(program.pathSegment))}">Mở chương trình →</a>
    </div>
    <p class="muted notehint">Tiến độ khóa học tách khỏi roadmap — không double-count sprint.</p>
  </div>`;
}

function accountView() {
  const user = getUser();
  return `<div class="page">${panelHeader(
    'Tài khoản',
    'Hồ sơ & cài đặt',
    'Sau này: mục tiêu nghề nghiệp, thời gian học/tuần, giao diện. Hiện tại: thông tin đăng nhập và phiên làm việc.'
  )}
  <div class="card">${user ? `<p><strong>${esc(user.displayName)}</strong><br><span class="muted">${esc(user.email)}</span></p><p class="muted">${esc(authModeLabel())}</p>` : '<p class="muted">Chưa đăng nhập. Dùng thẻ tài khoản ở sidebar để đăng nhập Google (demo nếu chưa Firebase).</p>'}
  ${user ? `<div class="btn-row"><button type="button" class="btn ghost" id="accountSignOut">Đăng xuất</button></div>` : `<div class="btn-row"><button type="button" class="btn" id="accountSignIn">Đăng nhập Google</button></div>`}
  </div></div>`;
}

function renderAccountCard() {
  const el = $('#sidebarAccount');
  if (!el) return;
  const user = getUser();
  if (!user) {
    el.innerHTML = `<div class="account-card account-login">
      <p>Đăng nhập để đồng bộ tiến độ (Firebase).</p>
      <button type="button" class="btn" id="sidebarSignIn" style="width:100%">Đăng nhập Google</button>
    </div>`;
    $('#sidebarSignIn')?.addEventListener('click', () => signInWithGoogle());
    return;
  }
  const initial = (user.displayName || user.email || '?').charAt(0).toUpperCase();
  const avatar = user.photoURL ? `<img src="${esc(user.photoURL)}" alt="">` : initial;
  el.innerHTML = `<div class="account-card" id="accountCard">
    <button type="button" class="account-head" id="accountToggle" aria-expanded="false">
      <div class="account-avatar">${avatar}</div>
      <div class="account-meta">
        <div class="account-name">${esc(user.displayName || 'Tài khoản')}</div>
        <div class="account-sub">${esc(authModeLabel())}</div>
      </div>
      <svg class="account-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
    </button>
    <div class="account-menu" id="accountMenu" hidden>
      <button type="button" class="account-menu-item" data-go-account="1">Hồ sơ</button>
      <button type="button" class="account-menu-item danger" id="sidebarSignOut">Đăng xuất</button>
    </div>
  </div>`;
  $('#accountToggle')?.addEventListener('click', () => {
    const card = $('#accountCard');
    const menu = $('#accountMenu');
    const open = card?.classList.toggle('is-open');
    if (menu) menu.hidden = !open;
    $('#accountToggle')?.setAttribute('aria-expanded', String(Boolean(open)));
  });
  $$('[data-go-account]').forEach((b) => b.addEventListener('click', () => go('account')));
  $('#sidebarSignOut')?.addEventListener('click', () => signOutUser());
}

function mapNavigateFromNode(node) {
  if (!node || node.kind === 'root') return;
  if (node.kind === 'topic') {
    openTopic(node.topicId);
    return;
  }
  month = node.moduleIndex;
  roadmapSubOpen = true;
  go('roadmap');
}

function mapNodeDetailPanel(node) {
  if (!node) {
    return `<div class="km-detail-empty"><p class="muted">Chọn một nút trên sơ đồ để xem chi tiết.</p></div>`;
  }

  if (node.kind === 'root') {
    return `<div class="km-detail">
      <div class="km-detail-kicker">Topology</div>
      <h2 class="km-detail-title">Engineer Atlas</h2>
      <p class="muted">${esc(DOMAIN_SHORT.join(' → '))}</p>
      <div class="callout"><strong>Graph:</strong> sơ đồ mạng nhện — hub giữa, 6 module tỏa ra, rồi tuần và chủ đề. <strong>Mind map:</strong> cùng cấp, bố cục cột.</div>
      <p class="muted km-detail-hint"><strong>Graph:</strong> mạng force — chấm neon, kéo nền pan/zoom. <strong>Mind map:</strong> cột roadmap. Click ▸ mở con · Double-click / tên → lộ trình.</p>
    </div>`;
  }

  if (node.kind === 'module') {
    const mi = node.moduleIndex;
    const m = MODULES[mi];
    const pct = moduleProgress(mi);
    return `<div class="km-detail">
      <div class="km-detail-kicker">Tháng ${mi + 1}</div>
      <h2 class="km-detail-title"><button type="button" class="km-detail-link" data-month="${mi}">${esc(m.name)}</button></h2>
      <p class="muted">${esc(m.desc)}</p>
      <div class="bar"><div class="fill" style="width:${pct}%"></div></div>
      <p class="muted">${pct}% phạm vi · ${esc(MONTH_OUTCOMES[mi])}</p>
      <div class="btn-row">
        <button type="button" class="btn" data-month="${mi}">Mở lộ trình tháng ${mi + 1}</button>
        <button type="button" class="btn secondary" data-km-expand-module="${mi}">Mở rộng tuần trên sơ đồ</button>
      </div>
    </div>`;
  }

  if (node.kind === 'week') {
    const { moduleIndex: mi, weekIndex: wi } = node;
    const w = MODULES[mi].weeks[wi];
    const topics = w[1].map((title, ti) => ({ id: `${mi}-${wi}-${ti}`, title }));
    const done = topics.filter((t) => ['done', 'known'].includes(statusForTopic(t.id))).length;
    return `<div class="km-detail">
      <div class="km-detail-kicker">${esc(MODULES[mi].name)} · Tuần ${mi * 4 + wi + 1}</div>
      <h2 class="km-detail-title"><button type="button" class="km-detail-link" data-month="${mi}">${esc(w[0])}</button></h2>
      <p class="muted">${done}/${topics.length} chủ đề đã bao phủ</p>
      <ul class="km-topic-preview">${topics
        .map((t) => {
          const st = statusForTopic(t.id);
          return `<li><button type="button" class="km-topic-link" data-km-open-topic="${t.id}"><span class="km-st-dot status-${st}"></span>${esc(t.title)}</button></li>`;
        })
        .join('')}</ul>
      <div class="btn-row">
        <button type="button" class="btn secondary" data-km-expand-week="${mi}-${wi}">Mở rộng chủ đề trên sơ đồ</button>
        <button type="button" class="btn" data-month="${mi}">Mở tháng ${mi + 1}</button>
      </div>
    </div>`;
  }

  if (node.kind === 'topic') {
    const t = TOPICS.find((x) => x.id === node.topicId);
    if (!t) return mapNodeDetailPanel(null);
    const st = statusForTopic(t.id);
    const hasDetail = Boolean(TOPIC_DETAILS[t.id]);
    const intro = TOPIC_DETAILS[t.id]?.intro;
    return `<div class="km-detail">
      <div class="km-detail-kicker">${esc(MODULES[t.module].name)} · ${esc(t.weekName)}</div>
      <h2 class="km-detail-title"><button type="button" class="km-detail-link" data-km-open-topic="${t.id}">${esc(t.title)}</button></h2>
      ${intro ? `<p class="muted">${esc(intro)}</p>` : ''}
      <div class="km-detail-status">${statusSelect(st, { ariaLabel: `Trạng thái ${t.title}`, dataStatus: t.id })}</div>
      ${hasDetail ? `<p class="muted">Có đề cương chi tiết + checklist trong lộ trình.</p>` : ''}
      <div class="btn-row">
        <button type="button" class="btn" data-km-open-topic="${t.id}">Mở trong lộ trình</button>
      </div>
    </div>`;
  }

  return mapNodeDetailPanel(null);
}

function mapView() {
  const initialMode = getStoredMapMode();
  return `<div class="page page--map">${panelHeader(
    'Sơ đồ',
    'Knowledge map',
    'Graph force (pan / zoom) · Mind map cột Atlas → Tháng → Tuần → Chủ đề.'
  )}
  <div class="card knowledge-map-card" id="knowledgeMapShell">
    <div class="knowledge-map-toolbar">
      <div class="km-toolbar-left">
        <div class="km-mode-toggle" role="tablist" aria-label="Chế độ sơ đồ">
          <button type="button" class="km-mode-btn${initialMode === 'graph' ? ' is-active' : ''}" data-km-mode="graph" role="tab" aria-selected="${initialMode === 'graph'}">Graph</button>
          <button type="button" class="km-mode-btn${initialMode === 'mindmap' ? ' is-active' : ''}" data-km-mode="mindmap" role="tab" aria-selected="${initialMode === 'mindmap'}">Mind map</button>
        </div>
        <div class="km-toolbar-actions">
          <button type="button" class="btn secondary km-tool-btn" id="kmCollapseAll" title="Thu gọn mọi tuần và chủ đề">Thu gọn</button>
          <button type="button" class="btn ghost km-tool-btn" id="kmResetView" title="Căn lại zoom / vị trí sơ đồ">Reset góc</button>
          <button type="button" class="btn secondary km-tool-btn" id="kmFullscreen" title="Toàn màn hình (Esc để thoát)">Toàn màn hình</button>
        </div>
      </div>
      <p class="muted km-toolbar-hint">Graph: chấm xanh neon (done = xanh lá) · Mind map: cột roadmap · Click mở con · Double-click / tên → lộ trình</p>
    </div>
    <div class="knowledge-map-layout">
      <div class="knowledge-map-stage-wrap">
        <div class="knowledge-map-stage" id="knowledgeMapStage"></div>
      </div>
      <aside class="knowledge-map-detail card" id="knowledgeMapDetail" aria-live="polite"></aside>
    </div>
  </div>
  <div class="callout"><strong>Explore later:</strong> Manufacturing, Three.js, BaaS, Serverless; roadmap Backend tháng 3 có thêm Server-Driven UI (mặc định Để sau). <button type="button" class="expand-btn" onclick="go('optional')">Xem →</button></div></div>`;
}

function roadmapView() {
  const m = MODULES[month];
  const weeks = m.weeks
    .map((w, wi) => {
      const rows = w[1]
        .map((title, ti) =>
          topicRow({
            id: `${month}-${wi}-${ti}`,
            title,
            module: month,
            week: wi,
            topic: ti,
            weekName: w[0],
          })
        )
        .join('');
      const ref = PROTON_WEEK_REFS[`${month}-${wi}`];
      const hint = ref ? `<div class="proton-hint">✧ ${esc(ref)}</div>` : '';
      return `<section class="week-section"><div class="week-head"><span class="week-pill">W${month * 4 + wi + 1}</span><h3>${esc(w[0])}</h3></div><div class="topic-list">${rows}</div>${hint}</section>`;
    })
    .join('');

  return `<div class="page">${panelHeader(
    `Tháng ${month + 1} / 6`,
    m.name,
    m.desc
  )}
  <div class="card"><span class="tag">${moduleProgress(month)}% bao phủ</span><div class="bar"><div class="fill" style="width:${moduleProgress(month)}%"></div></div>
  <div class="callout"><strong>Outcome:</strong> ${esc(MONTH_OUTCOMES[month])}</div></div>
  ${weeks}
  <div class="btn-row">${btn('← Tháng trước', 'prevMonth()', 'secondary')}${btn('Tháng tiếp →', 'nextMonth()', '')}</div></div>`;
}

function libraryView() {
  const q = search.toLowerCase();
  const results = TOPICS.filter(
    (t) =>
      (libModule === 'all' || String(t.module) === libModule) &&
      (filter === 'all' || statusForTopic(t.id) === filter) &&
      `${t.title} ${MODULES[t.module].name} ${t.weekName}`.toLowerCase().includes(q)
  );
  return `<div class="page">${panelHeader(
    'Tra cứu',
    'Topic library',
    'Tìm theo tên, module hoặc trạng thái. Topic đầu tiên có đề cương chi tiết mẫu.'
  )}
  <div class="toolbar"><input id="search" value="${esc(search)}" placeholder="Tìm: React, Docker, RAG..." aria-label="Tìm chủ đề">
  ${filterSelect('moduleFilter', [['all', 'Tất cả modules'], ...MODULES.map((m, i) => [String(i), m.name])], libModule)}
  ${filterSelect('statusFilter', [['all', 'Mọi trạng thái'], ...Object.entries(STATUS_LABELS)], filter)}</div>
  <p class="muted">${results.length} / ${TOPICS.length} topics</p>
  <div class="topic-list">${results.length ? results.map(topicRow).join('') : '<div class="empty">Không tìm thấy.</div>'}</div></div>`;
}

function protonView() {
  const data = getData();
  const visible = PROTON.filter((p) => protonFilter === 'all' || p[2] === protonFilter);
  const doneCount = Object.values(data.proton).filter((s) => s === 'done').length;
  const labels = { core: 'Ưu tiên 6 tháng đầu', later: 'Giai đoạn sau', optional: 'Tùy chọn', foundation: 'Giới thiệu' };

  const rows = visible
    .map((p) => {
      const st = data.proton[p[0]] || 'todo';
      return `<article class="topic-row"><div><div class="topic-title">#${p[0]} — ${esc(p[1])}</div><div class="topic-meta">${esc(labels[p[2]] || p[2])}</div></div>
      ${statusSelect(st, { ariaLabel: `ProtonX ${p[0]}`, dataProton: p[0] })}</article>`;
    })
    .join('');

  return `<div class="page">${panelHeader('Kèm khóa', 'ProtonX Chatbot & RAG', 'Companion tracker — ưu tiên core trước.')}
  <div class="card"><span class="tag">${doneCount}/27 hoàn thành</span><div class="bar"><div class="fill" style="width:${Math.round((doneCount / 27) * 100)}%"></div></div></div>
  <div class="toolbar">${filterSelect('protonFilter', [['all', 'Tất cả'], ['core', 'Core'], ['later', 'Later'], ['optional', 'Optional']], protonFilter)}</div>
  <div class="topic-list">${rows}</div></div>`;
}

function optionalView() {
  const data = getData();
  const blocks = OPTIONAL_TRACKS.map((track) => {
    const groups = track.groups
      .map((g, gi) => {
        const rows = g[1]
          .map((topic, ti) => {
            const id = `${track.key}-${gi}-${ti}`;
            const st = data.optionalStatuses[id] || 'later';
            return `<article class="topic-row"><div class="topic-title">${esc(topic)}</div>${statusSelect(st, { ariaLabel: topic, dataOptional: id })}</article>`;
          })
          .join('');
        return `<div class="week-section"><div class="week-head"><h3>${esc(g[0])}</h3></div><div class="topic-list">${rows}</div></div>`;
      })
      .join('');
    return `<section class="card"><h3 style="margin:0 0 6px;font-size:15px">${esc(track.name)}</h3><p class="muted">${esc(track.desc)}</p>${groups}<div class="callout"><strong>Lab:</strong> ${esc(track.lab)}</div></section>`;
  }).join('');

  return `<div class="page">${panelHeader('Để sau', 'Explore later', 'Manufacturing, 3D, BaaS, Serverless — không ảnh hưởng sprint 3 tháng.')}
  <div class="callout"><strong>Focus:</strong> FE / Fullstack, Nov 2026 – Jan 2027.</div>${blocks}</div>`;
}

function backupView() {
  return `<div class="page">${panelHeader('Dữ liệu', 'Backup & settings', 'Export JSON độc lập. Cloud sync (Firebase) sẽ thay local khi bật.')}
  <div class="grid2"><div class="card"><div class="card-title">Export</div><p class="muted">Trạng thái, ghi chú, ProtonX, Explore later.</p><button type="button" class="btn" id="exportBtn">↓ Download JSON</button></div>
  <div class="card"><div class="card-title">Import</div><p class="muted">Thay thế dữ liệu hiện tại.</p><input type="file" id="importFile" accept=".json,application/json" class="field"></div></div>
  <div class="card"><div class="card-title">Reset</div><p class="muted">Xóa tiến độ trên trình duyệt này. Export trước.</p><button type="button" class="btn ghost" id="resetBtn">Xóa dữ liệu</button></div></div>`;
}

function btn(text, onclick, cls = '') {
  return `<button type="button" class="btn ${cls}" onclick="${onclick}">${text}</button>`;
}

function applyRoadmapSubUi() {
  const sub = $('#roadmap-sub');
  const chevron = $('#roadmapChevron');
  const group = $('#roadmap-group');
  if (!sub || !chevron) return;
  sub.hidden = !roadmapSubOpen;
  chevron.setAttribute('aria-expanded', String(roadmapSubOpen));
  group?.classList.toggle('is-open', roadmapSubOpen);
  try {
    localStorage.setItem('atlas-roadmap-sub', roadmapSubOpen ? '1' : '0');
  } catch {
    /* ignore */
  }
}

function updateSidebar() {
  $$('.nav-item[data-view]').forEach((el) => {
    el.classList.toggle('active', el.dataset.view === view);
  });
  const sub = $('#roadmap-sub');
  if (sub) {
    $$('.nav-item[data-month]', sub).forEach((el) => {
      el.classList.toggle('active', view === 'roadmap' && Number(el.dataset.month) === month);
    });
  }
  applyRoadmapSubUi();
}

function syncMapFullscreenUi() {
  const shell = $('#knowledgeMapShell');
  const btn = $('#kmFullscreen');
  if (!shell || !btn) return;
  const native = document.fullscreenElement === shell;
  const fallback = shell.classList.contains('is-fs-fallback');
  const on = native || fallback;
  shell.classList.toggle('is-fs-active', on);
  document.body.classList.toggle('km-fs-open', fallback);
  btn.textContent = on ? 'Thoát full' : 'Toàn màn hình';
  btn.setAttribute('aria-pressed', String(on));
}

function exitMapFullscreen() {
  const shell = $('#knowledgeMapShell');
  if (!shell) return;
  if (document.fullscreenElement === shell) {
    document.exitFullscreen().catch(() => {});
  }
  shell.classList.remove('is-fs-fallback', 'is-fs-active');
  document.body.classList.remove('km-fs-open');
  syncMapFullscreenUi();
}

async function toggleMapFullscreen() {
  const shell = $('#knowledgeMapShell');
  if (!shell) return;
  if (document.fullscreenElement === shell || shell.classList.contains('is-fs-fallback')) {
    exitMapFullscreen();
    return;
  }
  try {
    if (shell.requestFullscreen) {
      await shell.requestFullscreen();
    } else {
      shell.classList.add('is-fs-fallback');
      document.body.classList.add('km-fs-open');
    }
  } catch {
    shell.classList.add('is-fs-fallback');
    document.body.classList.add('km-fs-open');
  }
  syncMapFullscreenUi();
}

function renderContent() {
  if (view !== 'map') exitMapFullscreen();

  knowledgeMapCtrl?.destroy();
  knowledgeMapCtrl = null;

  const views = {
    dashboard: dashboardView,
    capstone: capstoneView,
    map: mapView,
    roadmap: roadmapView,
    library: libraryView,
    optional: optionalView,
    protonx: protonView,
    backup: backupView,
    account: accountView,
  };
  try {
    const html = views[view]?.() || '';
    $('#content').innerHTML = html;
    updateSidebar();
    attachHandlers();
    if (view === 'map') initMapView();
  } catch (err) {
    console.error(err);
    $('#content').innerHTML = `<div class="page"><div class="empty">Không tải được nội dung. ${esc(err.message)}</div></div>`;
  }
}

function attachHandlers() {
  $$('[data-status]').forEach((el) => {
    el.addEventListener('change', () => {
      syncSelectWrap(el);
      const id = el.dataset.status;
      patchProgress((d) => {
        d.statuses[id] = el.value;
        if (el.value === 'done') {
          if (!d.subtopicChecks) d.subtopicChecks = {};
          for (const s of getTopicSubtopics(id)) d.subtopicChecks[s.id] = true;
        }
      }).then(() => {
        if (view === 'roadmap' || view === 'library' || view === 'dashboard') {
          const y = window.scrollY;
          renderContent();
          window.scrollTo(0, y);
        }
      });
    });
  });

  $$('[data-subtopic]').forEach((el) => {
    el.addEventListener('change', () => {
      const sid = el.dataset.subtopic;
      patchProgress((d) => {
        if (!d.subtopicChecks) d.subtopicChecks = {};
        if (el.checked) d.subtopicChecks[sid] = true;
        else delete d.subtopicChecks[sid];
      }).then(() => {
        if (view === 'dashboard') {
          const y = window.scrollY;
          renderContent();
          window.scrollTo(0, y);
        }
      });
    });
  });

  $$('[data-expand]').forEach((el) => {
    el.addEventListener('click', () => {
      const id = el.dataset.expand;
      if (expandedTopics.has(id)) expandedTopics.delete(id);
      else expandedTopics.add(id);
      const body = $(`#body-${id}`);
      if (body) body.classList.toggle('hidden');
      el.setAttribute('aria-expanded', String(expandedTopics.has(id)));
      const hasDetail = Boolean(TOPIC_DETAILS[id]);
      if (hasDetail) {
        el.textContent = expandedTopics.has(id) ? '▾ Thu gọn nội dung học' : '▸ Xem nội dung cần học';
      }
    });
  });

  $$('[data-note]').forEach((el) => {
    el.addEventListener('input', () => {
      const id = el.dataset.note;
      patchProgress((d) => {
        d.notes[id] = el.value;
      });
    });
  });

  $$('[data-link]').forEach((el) => {
    el.addEventListener('input', () => {
      const id = el.dataset.link;
      patchProgress((d) => {
        d.links[id] = el.value;
      });
    });
  });

  $$('[data-proton]').forEach((el) => {
    el.addEventListener('change', () => {
      syncSelectWrap(el);
      patchProgress((d) => {
        d.proton[el.dataset.proton] = el.value;
      });
    });
  });

  $$('[data-optional]').forEach((el) => {
    el.addEventListener('change', () => {
      syncSelectWrap(el);
      patchProgress((d) => {
        d.optionalStatuses[el.dataset.optional] = el.value;
      });
    });
  });

  $$('[data-capstone-status]').forEach((el) => {
    el.addEventListener('change', () => {
      syncCapstoneSelectWrap(el);
      patchProgress((d) => {
        if (!d.capstoneStatuses) d.capstoneStatuses = {};
        d.capstoneStatuses[el.dataset.capstoneStatus] = el.value;
      }).then(() => {
        if (view === 'capstone' || view === 'dashboard') {
          const y = window.scrollY;
          renderContent();
          window.scrollTo(0, y);
        }
      });
    });
  });

  $$('[data-capstone-note]').forEach((el) => {
    el.addEventListener('input', () => {
      patchProgress((d) => {
        if (!d.capstoneNotes) d.capstoneNotes = {};
        d.capstoneNotes[el.dataset.capstoneNote] = el.value;
      });
    });
  });

  $$('[data-capstone-link]').forEach((el) => {
    el.addEventListener('input', () => {
      patchProgress((d) => {
        if (!d.capstoneLinks) d.capstoneLinks = {};
        d.capstoneLinks[el.dataset.capstoneLink] = el.value;
      });
    });
  });

  $$('[data-capstone-phase-toggle]').forEach((el) => {
    el.addEventListener('click', () => {
      const id = el.dataset.capstonePhaseToggle;
      if (capstoneOpenPhases.has(id)) capstoneOpenPhases.delete(id);
      else capstoneOpenPhases.add(id);
      const body = $(`#cap-phase-${id}`);
      const open = capstoneOpenPhases.has(id);
      body?.classList.toggle('hidden', !open);
      el.setAttribute('aria-expanded', String(open));
    });
  });

  $('#exportCapstonePublicBtn')?.addEventListener('click', () => {
    const payload = exportPublicCapstonePayload();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'operations-platform-public-progress.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  $('#copyCapstonePublicBtn')?.addEventListener('click', async () => {
    const text = JSON.stringify(exportPublicCapstonePayload(), null, 2);
    try {
      await navigator.clipboard.writeText(text);
      alert('Đã copy JSON public progress.');
    } catch {
      alert('Không copy được — dùng nút Download.');
    }
  });

  $$('[data-month]').forEach((el) => {
    el.addEventListener('click', () => {
      month = Number(el.dataset.month);
      go('roadmap');
    });
  });

  const searchEl = $('#search');
  if (searchEl) {
    searchEl.addEventListener('input', (e) => {
      search = e.target.value;
      const pos = e.target.selectionStart;
      renderContent();
      const next = $('#search');
      next.focus();
      next.setSelectionRange(pos, pos);
    });
  }
  const mf = $('#moduleFilter');
  if (mf) mf.addEventListener('change', (e) => { libModule = e.target.value; renderContent(); });
  const sf = $('#statusFilter');
  if (sf) sf.addEventListener('change', (e) => { filter = e.target.value; renderContent(); });
  const pf = $('#protonFilter');
  if (pf) pf.addEventListener('change', (e) => { protonFilter = e.target.value; renderContent(); });

  $('#exportBtn')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(exportBackup(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'engineering-atlas-backup.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  $('#importFile')?.addEventListener('change', async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    try {
      const v = JSON.parse(await f.text());
      if (!confirm('Thay thế toàn bộ tiến độ hiện tại?')) return;
      await importBackup(v);
      renderContent();
      alert('Đã nhập dữ liệu.');
    } catch {
      alert('File JSON không hợp lệ.');
    }
  });

  $('#resetBtn')?.addEventListener('click', async () => {
    if (!confirm('Xóa toàn bộ tiến độ?')) return;
    await resetProgress();
    renderContent();
  });

  $('#accountSignIn')?.addEventListener('click', () => signInWithGoogle());
  $('#accountSignOut')?.addEventListener('click', () => signOutUser());

  $$('[data-km-mode]').forEach((btn) => {
    btn.addEventListener('click', () => knowledgeMapCtrl?.setMode(btn.dataset.kmMode));
  });
  $('#kmCollapseAll')?.addEventListener('click', () => knowledgeMapCtrl?.collapseAll());
  $('#kmResetView')?.addEventListener('click', () => knowledgeMapCtrl?.resetView());
  $('#kmFullscreen')?.addEventListener('click', () => toggleMapFullscreen());
  syncMapFullscreenUi();

  const mapDetail = $('#knowledgeMapDetail');
  mapDetail?.addEventListener('click', (e) => {
    const open = e.target.closest('[data-km-open-topic]');
    if (open) {
      openTopic(open.dataset.kmOpenTopic);
      return;
    }
    const em = e.target.closest('[data-km-expand-module]');
    if (em) {
      knowledgeMapCtrl?.expandModule(Number(em.dataset.kmExpandModule));
      return;
    }
    const ew = e.target.closest('[data-km-expand-week]');
    if (ew) {
      const [mi, wi] = ew.dataset.kmExpandWeek.split('-').map(Number);
      knowledgeMapCtrl?.expandWeek(mi, wi);
    }
  });
}

function initMapView() {
  const stage = $('#knowledgeMapStage');
  const detail = $('#knowledgeMapDetail');
  if (!stage || !detail) return;

  const setDetail = (node) => {
    detail.innerHTML = mapNodeDetailPanel(node);
    $$('#knowledgeMapDetail [data-status]').forEach((el) => {
      el.addEventListener('change', () => {
        syncSelectWrap(el);
        const id = el.dataset.status;
        patchProgress((d) => {
          d.statuses[id] = el.value;
        }).then(() => knowledgeMapCtrl?.refresh());
      });
    });
  };

  knowledgeMapCtrl = mountKnowledgeMap(stage, {
    modules: MODULES,
    domainShort: DOMAIN_SHORT,
    moduleShort: MODULE_SHORT,
    getStatus: statusForTopic,
    onSelect: setDetail,
    onNavigate: mapNavigateFromNode,
    onModeChange: (mode) => {
      $$('[data-km-mode]').forEach((btn) => {
        const active = btn.dataset.kmMode === mode;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
      });
    },
  });
}

function updateSyncPill(state) {
  const el = $('#syncPill');
  if (!el) return;
  el.classList.remove('is-saving', 'is-saved', 'is-error');
  const labels = {
    idle: 'Lưu cục bộ',
    saving: 'Đang lưu…',
    saved: 'Đã lưu',
    error: 'Lỗi lưu',
  };
  el.textContent = labels[state] || labels.idle;
  if (state === 'saving') el.classList.add('is-saving');
  if (state === 'saved') el.classList.add('is-saved');
  if (state === 'error') el.classList.add('is-error');
}

function openTopic(topicId) {
  const [mi] = topicId.split('-').map(Number);
  month = mi;
  expandedTopics.add(topicId);
  roadmapSubOpen = true;
  go('roadmap');
}

function go(v) {
  view = v;
  if (v === 'roadmap' && !roadmapSubOpen) {
    roadmapSubOpen = true;
  }
  renderContent();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeMobileSidebar();
}

function prevMonth() {
  month = Math.max(0, month - 1);
  renderContent();
}

function nextMonth() {
  month = Math.min(5, month + 1);
  renderContent();
}

function closeMobileSidebar() {
  $('#sidebar')?.classList.remove('open');
  const bd = $('#sidebarBackdrop');
  if (bd) {
    bd.hidden = true;
    bd.classList.remove('visible');
    bd.setAttribute('aria-hidden', 'true');
  }
}

function toggleMenu() {
  const sidebar = $('#sidebar');
  const bd = $('#sidebarBackdrop');
  if (!sidebar) return;
  const open = !sidebar.classList.contains('open');
  sidebar.classList.toggle('open', open);
  if (bd) {
    bd.hidden = !open;
    bd.classList.toggle('visible', open);
    bd.setAttribute('aria-hidden', String(!open));
  }
}

function toggleRoadmapSub() {
  roadmapSubOpen = !roadmapSubOpen;
  applyRoadmapSubUi();
}

function applySidebarCollapsed() {
  const layout = $('#layout');
  const btn = $('#sidebarToggle');
  layout?.classList.toggle('sidebar-collapsed', sidebarCollapsed);
  if (btn) {
    btn.setAttribute('aria-expanded', String(!sidebarCollapsed));
    btn.setAttribute('aria-label', sidebarCollapsed ? 'Mở sidebar' : 'Thu gọn sidebar');
  }
  try {
    localStorage.setItem('atlas-sidebar-collapsed', sidebarCollapsed ? '1' : '0');
  } catch {
    /* ignore */
  }
}

function toggleSidebar() {
  sidebarCollapsed = !sidebarCollapsed;
  applySidebarCollapsed();
}

function isDarkTheme() {
  const root = document.documentElement;
  const t = root.getAttribute('data-theme');
  if (t === 'dark') return true;
  if (t === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function updateThemeIcons() {
  const dark = isDarkTheme();
  $('#themeIconSun')?.classList.toggle('hidden', dark);
  $('#themeIconMoon')?.classList.toggle('hidden', !dark);
  $('#themeBtn')?.setAttribute('aria-label', dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
}

function toggleTheme() {
  const root = document.documentElement;
  const dark = isDarkTheme();
  root.setAttribute('data-theme', dark ? 'light' : 'dark');
  try {
    localStorage.setItem('atlas-theme', dark ? 'light' : 'dark');
  } catch {
    /* ignore */
  }
  updateThemeIcons();
}

function initTheme() {
  try {
    const saved = localStorage.getItem('atlas-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  } catch {
    /* ignore */
  }
  updateThemeIcons();
}

function bindNav() {
  $$('.nav-item[data-view]').forEach((el) => {
    el.addEventListener('click', () => go(el.dataset.view));
  });
  $$('#roadmap-sub .nav-item[data-month]').forEach((el) => {
    el.addEventListener('click', () => {
      month = Number(el.dataset.month);
      go('roadmap');
    });
  });
  $('#roadmapChevron')?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleRoadmapSub();
  });
  $('#sidebarBackdrop')?.addEventListener('click', closeMobileSidebar);
}

function initLayoutPrefs() {
  try {
    roadmapSubOpen = localStorage.getItem('atlas-roadmap-sub') === '1';
    sidebarCollapsed = localStorage.getItem('atlas-sidebar-collapsed') === '1';
  } catch {
    /* ignore */
  }
  applySidebarCollapsed();
  applyRoadmapSubUi();
}

window.go = go;
window.prevMonth = prevMonth;
window.nextMonth = nextMonth;
window.toggleMenu = toggleMenu;
window.toggleSidebar = toggleSidebar;
window.toggleTheme = toggleTheme;
window.openTopic = openTopic;

function reconcileDoneTopicChecklists() {
  const d = getData();
  let need = false;
  for (const t of TOPICS) {
    if (statusForTopic(t.id) !== 'done') continue;
    for (const s of getTopicSubtopics(t.id)) {
      if (!d.subtopicChecks?.[s.id]) {
        need = true;
        break;
      }
    }
    if (need) break;
  }
  if (!need) return;
  patchProgress((data) => {
    if (!data.subtopicChecks) data.subtopicChecks = {};
    for (const t of TOPICS) {
      if (statusForTopic(t.id) !== 'done') continue;
      for (const s of getTopicSubtopics(t.id)) data.subtopicChecks[s.id] = true;
    }
  });
}

async function boot() {
  document.addEventListener('fullscreenchange', syncMapFullscreenUi);
  initTheme();
  initLayoutPrefs();
  loadLocal();
  await seedCapstoneIfNeeded(CAPSTONE_DRAFT_SEED_IDS);
  reconcileDoneTopicChecklists();
  onSyncStateChange(updateSyncPill);
  updateSyncPill(getSyncState());
  await initAuth();
  onAuthStateChanged(() => {
    renderAccountCard();
    if (view === 'account' || view === 'dashboard') renderContent();
  });
  renderAccountCard();
  bindNav();
  renderContent();
  const topicParam = new URLSearchParams(window.location.search).get('topic');
  if (topicParam) openTopic(topicParam);
}

boot();
