import { loadLocal, patchProgress, onSyncStateChange, getSyncState } from './progress.js';
import { getLearningProgram } from './learning-programs/registry.js';
import { computeProgramStats } from './learning-programs/stats.js';
import { PROGRAM_DAY_STATUS } from './learning-programs/constants.js';
import { applyProgramDefaults, getProgramDayState } from './learning-programs/state.js';
import { atlasUrl } from './atlas-paths.js';

const PROGRAM_ID = document.body.dataset.programId || 'python-100-days-angela-yu';
const program = getLearningProgram(PROGRAM_ID);

let tab = 'overview';
let dayFilter = 'all';

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );

function bar(p) {
  const w = Math.max(0, Math.min(100, Number(p) || 0));
  return `<div class="bar"><div class="fill" style="width:${w}%"></div></div>`;
}

function dayTitle(day) {
  const st = getProgramDayState(day.id);
  return st.curriculumTitle?.trim() || day.placeholderTitle;
}

function isDayDone(dayId) {
  return getProgramDayState(dayId).status === PROGRAM_DAY_STATUS.COMPLETED;
}

function toggleDayDone(dayId, done) {
  return setDayStatus(dayId, done ? PROGRAM_DAY_STATUS.COMPLETED : PROGRAM_DAY_STATUS.NOT_STARTED);
}

function setDayStatus(dayId, status) {
  const now = new Date().toISOString();
  return patchProgress((d) => {
    if (!d.programDays) d.programDays = {};
    const prev = d.programDays[dayId] || {};
    const next = { ...prev, status, updatedAt: now };
    if (status === PROGRAM_DAY_STATUS.COMPLETED && !next.completedDate) {
      next.completedDate = now.slice(0, 10);
    }
    if (status === PROGRAM_DAY_STATUS.NOT_STARTED) {
      delete next.completedDate;
    }
    d.programDays[dayId] = next;
  });
}

function updateDayTitle(dayId, title) {
  return patchProgress((d) => {
    if (!d.programDays) d.programDays = {};
    d.programDays[dayId] = {
      ...(d.programDays[dayId] || {}),
      curriculumTitle: title,
      updatedAt: new Date().toISOString(),
    };
  });
}

function syncHashDay() {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash && program?.days.some((d) => d.id === hash)) {
    tab = 'curriculum';
  }
}

function renderOverview(stats) {
  const previewDays = program.days.slice(0, 4);
  const previewHtml = previewDays
    .map((day) => renderDayRow(day, { compact: true }))
    .join('');

  return `<div class="program-hero card">
    <div class="program-hero-top">
      <div>
        <div class="eyebrow">PYTHON ENGINEERING / LEARNING PROGRAM</div>
        <h1 class="program-hero-title">${esc(program.shortTitle)}</h1>
        <p class="muted">${esc(program.instructor)} · ${esc(program.platform)}</p>
      </div>
      <span class="tag program-status-badge">${esc(stats.programStatusLabel)}</span>
    </div>
    <div class="program-progress-row">
      <div class="program-progress-pct">${stats.completionPct}%</div>
      <div class="program-progress-meta">
        <p class="muted">${stats.completed} / ${stats.total} days completed</p>
        ${bar(stats.completionPct)}
      </div>
    </div>
    <div class="program-stat-grid program-stat-grid--2">
      <div><div class="program-stat-value">${stats.completed}</div><div class="program-stat-label">Completed</div></div>
      <div><div class="program-stat-value">${stats.notStarted}</div><div class="program-stat-label">Chưa tick</div></div>
    </div>
    <div class="btn-row">
      <a class="btn secondary" href="${esc(program.repositoryUrl)}" target="_blank" rel="noopener noreferrer">GitHub repo ↗</a>
      <a class="btn secondary" href="${esc(program.courseUrl)}" target="_blank" rel="noopener noreferrer">Udemy course ↗</a>
      <button type="button" class="btn" data-tab="curriculum">Xem chương trình →</button>
    </div>
  </div>
  <section class="card">
    <div class="card-title">Daily learning tracker — Preview</div>
    <div class="program-day-list">${previewHtml}</div>
  </section>`;
}

function renderDayRow(day, { compact = false } = {}) {
  const done = isDayDone(day.id);
  const title = dayTitle(day);
  const titleField = compact
    ? `<span class="muted">${esc(title)}</span>`
    : `<input class="field program-day-title-input" data-day-title="${day.id}" value="${esc(getProgramDayState(day.id).curriculumTitle)}" placeholder="${esc(day.placeholderTitle)}" aria-label="Tiêu đề Day ${day.dayNumber}">`;

  return `<article class="program-day-check-row${done ? ' is-done' : ''}" id="${day.id}">
    <label class="program-day-check-label">
      <input type="checkbox" data-program-day="${day.id}" ${done ? 'checked' : ''} aria-label="Hoàn thành Day ${day.dayNumber}">
      <span class="program-day-index">${String(day.dayNumber).padStart(2, '0')}</span>
      <span class="program-day-check-body">
        <strong>Day ${day.dayNumber}</strong>
        ${titleField}
      </span>
    </label>
  </article>`;
}

function filteredDays() {
  return program.days.filter((day) => {
    const done = isDayDone(day.id);
    if (dayFilter === 'done') return done;
    if (dayFilter === 'todo') return !done;
    return true;
  });
}

function renderCurriculum() {
  const days = filteredDays();
  const rows = days.map((day) => renderDayRow(day)).join('');
  return `<section class="card program-curriculum-card">
    <div class="card-title">100 ngày · Chương trình học</div>
    <p class="muted">Tick khi hoàn thành ngày đó. Tiêu đề Udemy có thể điền dần — mặc định placeholder.</p>
    <div class="toolbar">
      <select class="select-status" id="dayFilter">
        <option value="all" ${dayFilter === 'all' ? 'selected' : ''}>Tất cả</option>
        <option value="todo" ${dayFilter === 'todo' ? 'selected' : ''}>Chưa tick</option>
        <option value="done" ${dayFilter === 'done' ? 'selected' : ''}>Đã tick</option>
      </select>
      <span class="muted">${days.length} / ${program.dayCount} ngày</span>
    </div>
    <div class="program-day-list">${rows || '<div class="empty">Không có ngày nào khớp bộ lọc.</div>'}</div>
  </section>`;
}

function renderTabs() {
  const tabs = [
    ['overview', 'Tổng quan'],
    ['curriculum', 'Chương trình học'],
  ];
  return `<div class="program-tabs" role="tablist">${tabs
    .map(
      ([k, label]) =>
        `<button type="button" class="program-tab${tab === k ? ' is-active' : ''}" data-tab="${k}" role="tab" aria-selected="${tab === k}">${esc(label)}</button>`
    )
    .join('')}</div>`;
}

function render() {
  if (!program) {
    $('#content').innerHTML = '<div class="page program-page"><div class="empty">Không tìm thấy chương trình học.</div></div>';
    return;
  }

  const stats = computeProgramStats(program);
  let body = renderTabs();
  if (tab === 'overview') body += renderOverview(stats);
  if (tab === 'curriculum') body += renderCurriculum();

  $('#content').innerHTML = `<div class="page program-page">${body}</div>`;
  attachHandlers();

  const hash = window.location.hash.replace(/^#/, '');
  if (hash && tab === 'curriculum') {
    requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  }
}

function attachHandlers() {
  $$('[data-tab]').forEach((el) => {
    el.addEventListener('click', () => {
      tab = el.dataset.tab;
      if (tab === 'curriculum') window.location.hash = '';
      render();
    });
  });

  $$('[data-program-day]').forEach((el) => {
    el.addEventListener('change', () => {
      toggleDayDone(el.dataset.programDay, el.checked).then(render);
    });
  });

  $$('[data-day-title]').forEach((el) => {
    el.addEventListener('input', () => {
      updateDayTitle(el.dataset.dayTitle, el.value);
    });
  });

  $('#dayFilter')?.addEventListener('change', (e) => {
    dayFilter = e.target.value;
    render();
  });
}

function updateSyncPill(state) {
  const map = { idle: 'Lưu cục bộ', saving: 'Đang lưu…', saved: 'Đã lưu', error: 'Lỗi lưu' };
  const el = $('#syncPill');
  if (el) el.textContent = map[state] || state;
}

function initTheme() {
  try {
    const saved = localStorage.getItem('atlas-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  } catch {
    /* ignore */
  }
  const dark =
    document.documentElement.getAttribute('data-theme') === 'dark' ||
    (!document.documentElement.getAttribute('data-theme') &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
  $('#themeIconSun')?.classList.toggle('hidden', dark);
  $('#themeIconMoon')?.classList.toggle('hidden', !dark);
}

$('#themeBtn')?.addEventListener('click', () => {
  const root = document.documentElement;
  const dark =
    root.getAttribute('data-theme') === 'dark' ||
    (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  root.setAttribute('data-theme', dark ? 'light' : 'dark');
  try {
    localStorage.setItem('atlas-theme', dark ? 'light' : 'dark');
  } catch {
    /* ignore */
  }
  initTheme();
});

async function boot() {
  if (!program) return;
  initTheme();
  const home = atlasUrl('index.html');
  const homeEl = $('#atlasHomeLink');
  if (homeEl) homeEl.href = home;

  loadLocal();
  await patchProgress((d) => {
    applyProgramDefaults(PROGRAM_ID, d);
  });
  syncHashDay();
  onSyncStateChange(updateSyncPill);
  updateSyncPill(getSyncState());
  window.addEventListener('hashchange', () => {
    syncHashDay();
    render();
  });
  render();
}

boot();
