/** @typedef {{ id: string, collection: string, title: string, file: string, category: string, keywords?: string[] }} Book */
/** @typedef {{ id: string, name: string, desc: string, available: boolean }} Collection */

const COLLECTIONS = /** @type {Collection[]} */ ([
  {
    id: 'engbiz',
    name: 'English for Business',
    desc: 'Sách tiếng Anh thương mại — họp, thuyết trình, bán hàng, HR, logistics…',
    available: true,
  },
  {
    id: 'tech',
    name: 'Engineering & Tech',
    desc: 'Sẽ bổ sung sau.',
    available: false,
  },
]);

/** @type {Record<string, string>} */
const CATEGORY_LABELS = {
  all: 'Tất cả chủ đề',
  meetings: 'Meetings',
  presentations: 'Presentations',
  negotiating: 'Negotiating',
  sales: 'Sales & Purchasing',
  hr: 'Human Resources',
  logistics: 'Logistics',
  marketing: 'Marketing',
  accounting: 'Accounting',
  legal: 'Legal',
  management: 'Management',
};

/** @type {Book[]} */
const BOOKS = [
  {
    id: 'english-for-meetings',
    collection: 'engbiz',
    title: 'English For Meetings',
    file: 'engbiz/English For Meetings.pdf',
    category: 'meetings',
    keywords: ['meeting', 'agenda', 'minutes'],
  },
  {
    id: 'english-for-presentations',
    collection: 'engbiz',
    title: 'English for Presentations',
    file: 'engbiz/English for Presentations.pdf',
    category: 'presentations',
    keywords: ['presentation', 'slides', 'public speaking'],
  },
  {
    id: 'english-for-negotiating',
    collection: 'engbiz',
    title: 'English for Negotiating',
    file: 'engbiz/English for Negotiating.pdf',
    category: 'negotiating',
    keywords: ['negotiation', 'deal', 'contract'],
  },
  {
    id: 'english-for-sales-purchasing',
    collection: 'engbiz',
    title: 'English for Sales & Purchasing',
    file: 'engbiz/English for Sales & Purchasing.pdf',
    category: 'sales',
    keywords: ['sales', 'purchasing', 'procurement'],
  },
  {
    id: 'english-for-logistics',
    collection: 'engbiz',
    title: 'English for Logistics',
    file: 'engbiz/English for Logistics.pdf',
    category: 'logistics',
    keywords: ['supply chain', 'shipping', 'warehouse'],
  },
  {
    id: 'english-for-marketing',
    collection: 'engbiz',
    title: 'English for Marketing and Advertising',
    file: 'engbiz/English for marketing and advertising.pdf',
    category: 'marketing',
    keywords: ['marketing', 'advertising', 'brand'],
  },
  {
    id: 'management-and-marketing',
    collection: 'engbiz',
    title: 'Management and Marketing',
    file: 'engbiz/Management and Marketing.pdf',
    category: 'management',
    keywords: ['management', 'strategy'],
  },
  {
    id: 'english-for-human-resources',
    collection: 'engbiz',
    title: 'English for Human Resources',
    file: 'engbiz/English for Human Resources.pdf',
    category: 'hr',
    keywords: ['hr', 'recruitment', 'payroll'],
  },
  {
    id: 'vocabulary-human-resources',
    collection: 'engbiz',
    title: 'Check Your English Vocabulary for Human Resources',
    file: 'engbiz/Check Your English Vocabulary for Human Resources.pdf',
    category: 'hr',
    keywords: ['vocabulary', 'hr', 'exercises'],
  },
  {
    id: 'english-for-accounting',
    collection: 'engbiz',
    title: 'English for Accounting',
    file: 'engbiz/English for Accounting.pdf',
    category: 'accounting',
    keywords: ['accounting', 'finance', 'audit'],
  },
  {
    id: 'legal-professionals',
    collection: 'engbiz',
    title: 'English for Legal Professionals',
    file: 'engbiz/legal_professionals.pdf',
    category: 'legal',
    keywords: ['legal', 'law', 'contract'],
  },
];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

let collectionId = 'engbiz';
let searchQuery = '';
let categoryFilter = 'all';
/** @type {Book | null} */
let readingBook = null;

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getCollection(id) {
  return COLLECTIONS.find((c) => c.id === id) ?? COLLECTIONS[0];
}

function booksForCollection(id) {
  return BOOKS.filter((b) => b.collection === id);
}

function filteredBooks() {
  const q = searchQuery.trim().toLowerCase();
  return booksForCollection(collectionId).filter((b) => {
    if (categoryFilter !== 'all' && b.category !== categoryFilter) return false;
    if (!q) return true;
    const hay = [
      b.title,
      CATEGORY_LABELS[b.category] ?? b.category,
      ...(b.keywords ?? []),
    ]
      .join(' ')
      .toLowerCase();
    return hay.includes(q);
  });
}

function categoriesInCollection(id) {
  const set = new Set(booksForCollection(id).map((b) => b.category));
  return ['all', ...[...set].sort((a, b) => (CATEGORY_LABELS[a] ?? a).localeCompare(CATEGORY_LABELS[b] ?? b))];
}

function panelHeader(eyebrow, title, desc) {
  return `<header class="panel-header"><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1><p class="panel-desc">${esc(desc)}</p></header>`;
}

function renderSidebar() {
  const nav = $('#sidebarNav');
  if (!nav) return;
  const items = COLLECTIONS.map((c) => {
    const count = booksForCollection(c.id).length;
    const active = !readingBook && collectionId === c.id;
    const disabled = !c.available ? ' is-disabled' : '';
    const meta = c.available ? String(count) : 'Soon';
    if (!c.available) {
      return `<button type="button" class="nav-item${disabled}" disabled><span class="nav-dot"></span><span class="nav-label">${esc(c.name)}</span><span class="nav-meta">${meta}</span></button>`;
    }
    return `<button type="button" class="nav-item${active ? ' active' : ''}" data-collection="${esc(c.id)}"><span class="nav-dot"></span><span class="nav-label">${esc(c.name)}</span><span class="nav-meta">${meta}</span></button>`;
  }).join('');
  nav.innerHTML = `<div class="nav-section-label">Bộ sách</div>${items}`;
}

function renderChipRow(categories) {
  return `<div class="chip-row" role="group" aria-label="Lọc chủ đề">${categories
    .map((cat) => {
      const active = categoryFilter === cat ? ' is-active' : '';
      const label = CATEGORY_LABELS[cat] ?? cat;
      return `<button type="button" class="chip${active}" data-category="${esc(cat)}">${esc(label)}</button>`;
    })
    .join('')}</div>`;
}

function bookCard(book) {
  const catLabel = CATEGORY_LABELS[book.category] ?? book.category;
  const pdfUrl = encodeURI(book.file);
  return `<article class="book-card">
    <div class="book-card-head">
      <div class="book-cover" aria-hidden="true">📕</div>
      <div>
        <h3 class="book-title">${esc(book.title)}</h3>
        <div class="book-tags"><span class="tag">${esc(catLabel)}</span><span class="tag">PDF</span></div>
      </div>
    </div>
    <div class="book-card-actions">
      <button type="button" class="btn" data-read="${esc(book.id)}">Đọc ngay</button>
      <a class="btn secondary" href="${esc(pdfUrl)}" target="_blank" rel="noopener">Mở tab mới</a>
    </div>
  </article>`;
}

function libraryView() {
  const col = getCollection(collectionId);
  const list = filteredBooks();
  const categories = categoriesInCollection(collectionId);
  const options = categories
    .map(
      (cat) =>
        `<option value="${esc(cat)}"${categoryFilter === cat ? ' selected' : ''}>${esc(CATEGORY_LABELS[cat] ?? cat)}</option>`
    )
    .join('');

  return `<div class="page">${panelHeader(
    'Thư viện',
    col.name,
    col.desc
  )}
  <div class="callout"><strong>Mẹo:</strong> Dùng ô tìm kiếm hoặc chip chủ đề bên dưới. Nhấn <strong>Đọc ngay</strong> để xem PDF ngay trong trang.</div>
  <div class="toolbar">
    <input id="bookSearch" type="search" value="${esc(searchQuery)}" placeholder="Tìm sách: meetings, HR, sales…" aria-label="Tìm sách" autocomplete="off">
    <div class="select-wrap"><select id="categorySelect" class="select-filter" aria-label="Chủ đề">${options}</select></div>
  </div>
  ${renderChipRow(categories)}
  <p class="muted">${list.length} / ${booksForCollection(collectionId).length} cuốn</p>
  <div class="book-grid">${list.length ? list.map(bookCard).join('') : '<div class="empty">Không tìm thấy sách phù hợp.</div>'}</div>
  </div>`;
}

function readerView(book) {
  const pdfUrl = encodeURI(book.file);
  const catLabel = CATEGORY_LABELS[book.category] ?? book.category;
  return `<div class="page page--reader">
    <div class="reader-shell">
      <div class="reader-bar">
        <button type="button" class="btn secondary" id="backToLibrary">← Thư viện</button>
        <h2>${esc(book.title)}</h2>
        <span class="tag">${esc(catLabel)}</span>
        <a class="btn ghost" href="${esc(pdfUrl)}" target="_blank" rel="noopener">Tải / tab mới</a>
      </div>
      <div class="reader-frame-wrap">
        <iframe class="reader-frame" title="${esc(book.title)}" src="${esc(pdfUrl)}#view=FitH"></iframe>
      </div>
    </div>
  </div>`;
}

function syncRouteToHash() {
  if (readingBook) {
    const hash = `#/read/${readingBook.collection}/${readingBook.id}`;
    if (location.hash !== hash) history.replaceState(null, '', hash);
  } else {
    const hash = `#/c/${collectionId}`;
    if (location.hash !== hash) history.replaceState(null, '', hash);
  }
}

function parseHash() {
  const raw = location.hash.replace(/^#/, '');
  const readMatch = raw.match(/^\/read\/([^/]+)\/([^/]+)/);
  if (readMatch) {
    const book = BOOKS.find((b) => b.collection === readMatch[1] && b.id === readMatch[2]);
    if (book) {
      readingBook = book;
      collectionId = book.collection;
      return;
    }
  }
  const colMatch = raw.match(/^\/c\/([^/]+)/);
  if (colMatch) {
    const col = COLLECTIONS.find((c) => c.id === colMatch[1] && c.available);
    if (col) collectionId = col.id;
  }
  readingBook = null;
}

function render() {
  const root = $('#content');
  if (!root) return;
  root.innerHTML = readingBook ? readerView(readingBook) : libraryView();
  renderSidebar();
  bindViewEvents();
  syncRouteToHash();
  document.title = readingBook ? `${readingBook.title} — Books` : `${getCollection(collectionId).name} — Books`;
}

function openBook(id) {
  const book = BOOKS.find((b) => b.id === id);
  if (!book) return;
  readingBook = book;
  collectionId = book.collection;
  render();
}

function backToLibrary() {
  readingBook = null;
  render();
}

function bindViewEvents() {
  if (readingBook) {
    $('#backToLibrary')?.addEventListener('click', backToLibrary);
    return;
  }

  const searchEl = $('#bookSearch');
  searchEl?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const next = $('#bookSearch');
    if (next) {
      next.focus();
      next.setSelectionRange(pos, pos);
    }
  });

  $('#categorySelect')?.addEventListener('change', (e) => {
    categoryFilter = e.target.value;
    render();
  });

  $$('.chip[data-category]').forEach((btn) => {
    btn.addEventListener('click', () => {
      categoryFilter = btn.dataset.category ?? 'all';
      render();
    });
  });

  $$('[data-read]').forEach((btn) => {
    btn.addEventListener('click', () => openBook(btn.dataset.read ?? ''));
  });
}

function bindGlobalEvents() {
  $('#sidebarNav')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-collection]');
    if (!btn) return;
    collectionId = btn.dataset.collection ?? 'engbiz';
    readingBook = null;
    categoryFilter = 'all';
    searchQuery = '';
    render();
    closeMobileSidebar();
  });

  $('#themeBtn')?.addEventListener('click', toggleTheme);

  $('#sidebarToggle')?.addEventListener('click', () => {
    $('#layout')?.classList.toggle('sidebar-collapsed');
  });

  $('#menuBtn')?.addEventListener('click', () => {
    $('#layout')?.classList.toggle('sidebar-open');
    const open = $('#layout')?.classList.contains('sidebar-open');
    const backdrop = $('#sidebarBackdrop');
    if (backdrop) {
      backdrop.hidden = !open;
      backdrop.setAttribute('aria-hidden', String(!open));
    }
  });

  $('#sidebarBackdrop')?.addEventListener('click', closeMobileSidebar);

  window.addEventListener('hashchange', () => {
    parseHash();
    render();
  });
}

function closeMobileSidebar() {
  $('#layout')?.classList.remove('sidebar-open');
  const backdrop = $('#sidebarBackdrop');
  if (backdrop) {
    backdrop.hidden = true;
    backdrop.setAttribute('aria-hidden', 'true');
  }
}

function initTheme() {
  try {
    const stored = localStorage.getItem('books-theme');
    if (stored === 'dark' || stored === 'light') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch {
    /* ignore */
  }
  updateThemeIcons();
}

function toggleTheme() {
  const root = document.documentElement;
  const isDark =
    root.getAttribute('data-theme') === 'dark' ||
    (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const next = isDark ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try {
    localStorage.setItem('books-theme', next);
  } catch {
    /* ignore */
  }
  updateThemeIcons();
}

function updateThemeIcons() {
  const root = document.documentElement;
  const isDark =
    root.getAttribute('data-theme') === 'dark' ||
    (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  $('#themeIconSun')?.classList.toggle('hidden', isDark);
  $('#themeIconMoon')?.classList.toggle('hidden', !isDark);
}

parseHash();
initTheme();
bindGlobalEvents();
render();
