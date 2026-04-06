(function () {
  'use strict';

  var BOOK_PAGE_SIZE = 4;
  var EVENT_PAGE_SIZE = 6;

  var state = {
    registry: null,
    bookPage: 1,
    eventPage: 1,
    filterYear: '',
    filterMonth: '',
    filterDay: ''
  };

  function $(id) {
    return document.getElementById(id);
  }

  function parseDate(iso) {
    if (!iso) return null;
    var d = new Date(iso + 'T12:00:00');
    return isNaN(d.getTime()) ? null : d;
  }

  function bookById(id) {
    return (state.registry.books || []).find(function (b) {
      return b.id === id;
    });
  }

  function bookTitleShort(b) {
    if (!b) return '—';
    var t = b.title || '';
    return t.length > 48 ? t.slice(0, 45) + '…' : t;
  }

  function statusLabel(status) {
    var map = {
      reading: { label: 'Đang đọc', className: 'bg-emerald-50 text-emerald-600' },
      planned: { label: 'Dự định', className: 'bg-slate-100 text-slate-600' },
      done: { label: 'Đã đọc', className: 'bg-indigo-50 text-indigo-600' }
    };
    var s = map[status] || map.planned;
    return (
      '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ' +
      s.className +
      '">' +
      s.label +
      '</span>'
    );
  }

  function filterEvents(events) {
    return events.filter(function (ev) {
      var d = parseDate(ev.date);
      if (!d) return true;
      var y = d.getFullYear();
      var m = d.getMonth() + 1;
      var day = d.getDate();
      if (state.filterYear !== '' && y !== Number(state.filterYear)) return false;
      if (state.filterMonth !== '' && m !== Number(state.filterMonth)) return false;
      if (state.filterDay !== '' && day !== Number(state.filterDay)) return false;
      return true;
    });
  }

  function paginate(arr, page, pageSize) {
    var total = arr.length;
    var pages = Math.max(1, Math.ceil(total / pageSize));
    if (page > pages) page = pages;
    var start = (page - 1) * pageSize;
    return { items: arr.slice(start, start + pageSize), page: page, pages: pages, total: total };
  }

  function renderBookList() {
    var books = state.registry.books || [];
    var pg = paginate(books, state.bookPage, BOOK_PAGE_SIZE);
    state.bookPage = pg.page;
    var root = $('book-list-root');
    if (!root) return;

    if (!pg.total) {
      root.innerHTML =
        '<p class="text-sm text-slate-400 text-center py-6">Chưa có sách trong <code class="text-xs bg-slate-100 px-1 rounded">data/registry.json</code>.</p>';
      $('book-pagination').innerHTML = '';
      return;
    }

    var html = pg.items
      .map(function (b) {
        var year = b.publishedYear != null ? ' · ' + b.publishedYear : '';
        return (
          '<div class="book-card bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-start gap-3">' +
          '<div class="flex-1 min-w-0">' +
          '<div class="flex flex-wrap items-center gap-2 mb-1">' +
          statusLabel(b.status) +
          '</div>' +
          '<h3 class="text-sm font-semibold text-slate-900 leading-snug">' +
          escapeHtml(b.title) +
          '</h3>' +
          (b.titleEn
            ? '<p class="text-[11px] text-slate-400 mt-0.5">' + escapeHtml(b.titleEn) + '</p>'
            : '') +
          '<p class="text-xs text-slate-500 mt-1">' +
          escapeHtml(b.author || '') +
          year +
          '</p>' +
          (b.shortNote
            ? '<p class="text-xs text-slate-400 mt-2 line-clamp-2">' + escapeHtml(b.shortNote) + '</p>'
            : '') +
          '</div>' +
          '<div class="flex sm:flex-col gap-2 flex-shrink-0">' +
          '<button type="button" class="btn-add-event-for-book px-3 py-2 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-medium hover:bg-indigo-100 transition-colors whitespace-nowrap" data-book-id="' +
          escapeAttr(b.id) +
          '" data-book-title="' +
          escapeAttr(b.title) +
          '">' +
          '<i class="fa-solid fa-plus mr-1"></i> Thêm sự kiện' +
          '</button>' +
          '</div>' +
          '</div>'
        );
      })
      .join('');

    root.innerHTML = html;
    root.querySelectorAll('.btn-add-event-for-book').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openAddEventModal(btn.getAttribute('data-book-id'), btn.getAttribute('data-book-title'));
      });
    });

    renderPagination('book-pagination', pg.page, pg.pages, function (p) {
      state.bookPage = p;
      renderBookList();
    });
  }

  function renderEventList() {
    var all = state.registry.events || [];
    var filtered = filterEvents(all);
    var pg = paginate(filtered, state.eventPage, EVENT_PAGE_SIZE);
    state.eventPage = pg.page;
    var root = $('event-list-root');
    if (!root) return;

    if (!filtered.length) {
      root.innerHTML =
        '<p class="text-sm text-slate-400 text-center py-8">Không có sự kiện nào khớp bộ lọc. Thử xoá năm/tháng/ngày hoặc thêm dữ liệu trong <code class="text-xs bg-slate-100 px-1 rounded">registry.json</code>.</p>';
      $('event-pagination').innerHTML = '';
      return;
    }

    var html = pg.items
      .map(function (ev) {
        var books = (ev.bookIds || [])
          .map(function (bid) {
            return bookById(bid);
          })
          .filter(Boolean);
        var bookLine =
          books.length === 0
            ? '<span class="text-slate-400 italic">Không gắn sách</span>'
            : books
                .map(function (b) {
                  return '<span class="text-indigo-600">' + escapeHtml(bookTitleShort(b)) + '</span>';
                })
                .join(' · ');

        var inner =
          '<div class="flex items-start gap-3">' +
          '<div class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">' +
          '<i class="fa-solid fa-clock-rotate-left text-red-400 text-sm"></i>' +
          '</div>' +
          '<div class="flex-1 min-w-0">' +
          '<div class="text-sm font-medium text-slate-900">' +
          escapeHtml(ev.title) +
          '</div>' +
          '<div class="text-xs text-slate-500 mt-0.5">' +
          formatDateVi(ev.date) +
          (ev.location ? ' · ' + escapeHtml(ev.location) : '') +
          '</div>' +
          '<div class="text-[11px] text-slate-400 mt-1 line-clamp-2">' +
          bookLine +
          '</div>' +
          '</div>' +
          '</div>';

        if (ev.href) {
          return (
            '<a href="' +
            escapeAttr(ev.href) +
            '" class="event-link block rounded-xl border border-slate-200 p-4 hover:border-indigo-300">' +
            inner +
            '<div class="text-right mt-2"><span class="text-xs text-indigo-500 font-medium">Xem chi tiết →</span></div>' +
            '</a>'
          );
        }
        return '<div class="rounded-xl border border-dashed border-slate-200 p-4 bg-slate-50/80">' + inner + '</div>';
      })
      .join('');

    root.innerHTML = html;
    renderPagination('event-pagination', pg.page, pg.pages, function (p) {
      state.eventPage = p;
      renderEventList();
    });
  }

  function formatDateVi(iso) {
    var d = parseDate(iso);
    if (!d) return iso || '—';
    var dd = String(d.getDate()).padStart(2, '0');
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    return dd + '/' + mm + '/' + d.getFullYear();
  }

  function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, '&#39;');
  }

  function renderPagination(containerId, page, pages, onPage) {
    var el = $(containerId);
    if (!el) return;
    if (pages <= 1) {
      el.innerHTML =
        '<p class="text-center text-xs text-slate-400">Trang ' + page + ' / ' + pages + '</p>';
      return;
    }
    var parts = [];
    parts.push('<div class="flex flex-wrap items-center justify-center gap-2">');
    parts.push(
      '<button type="button" class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-40" data-page="' +
        (page - 1) +
        '"' +
        (page <= 1 ? ' disabled' : '') +
        '>Trước</button>'
    );
    parts.push('<span class="text-xs text-slate-500">Trang ' + page + ' / ' + pages + '</span>');
    parts.push(
      '<button type="button" class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-40" data-page="' +
        (page + 1) +
        '"' +
        (page >= pages ? ' disabled' : '') +
        '>Sau</button>'
    );
    parts.push('</div>');
    el.innerHTML = parts.join('');
    el.querySelectorAll('button[data-page]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var p = Number(btn.getAttribute('data-page'));
        if (p >= 1 && p <= pages) onPage(p);
      });
    });
  }

  function fillYearMonthDayOptions() {
    var events = state.registry.events || [];
    var years = {};
    events.forEach(function (ev) {
      var d = parseDate(ev.date);
      if (d) years[d.getFullYear()] = true;
    });
    var yearSel = $('filter-year');
    var yHtml = '<option value="">Năm (tất cả)</option>';
    Object.keys(years)
      .map(Number)
      .sort(function (a, b) {
        return b - a;
      })
      .forEach(function (y) {
        yHtml += '<option value="' + y + '">' + y + '</option>';
      });
    yearSel.innerHTML = yHtml;
    yearSel.value = state.filterYear;

    var mSel = $('filter-month');
    var mHtml = '<option value="">Tháng (tất cả)</option>';
    for (var m = 1; m <= 12; m++) {
      mHtml += '<option value="' + m + '">' + String(m).padStart(2, '0') + '</option>';
    }
    mSel.innerHTML = mHtml;
    mSel.value = state.filterMonth;

    var dSel = $('filter-day');
    var dHtml = '<option value="">Ngày (tất cả)</option>';
    for (var day = 1; day <= 31; day++) {
      dHtml += '<option value="' + day + '">' + String(day).padStart(2, '0') + '</option>';
    }
    dSel.innerHTML = dHtml;
    dSel.value = state.filterDay;
  }

  function openModal(id) {
    var m = $(id);
    if (!m) return;
    m.classList.remove('hidden');
    m.setAttribute('aria-hidden', 'false');
  }

  function closeModal(id) {
    var m = $(id);
    if (!m) return;
    m.classList.add('hidden');
    m.setAttribute('aria-hidden', 'true');
  }

  function jsonTemplateBook() {
    return (
      '{\n' +
      '  "id": "slug-ten-sach-kebab",\n' +
      '  "title": "Tên sách (tiếng Việt)",\n' +
      '  "titleEn": "English title (tuỳ chọn)",\n' +
      '  "author": "Tác giả",\n' +
      '  "publishedYear": 2024,\n' +
      '  "status": "reading",\n' +
      '  "shortNote": "Ghi chú ngắn (tuỳ chọn)"\n' +
      '}'
    );
  }

  function jsonTemplateEvent(bookId) {
    var ids = bookId ? '["' + bookId + '"]' : '[]';
    return (
      '{\n' +
      '  "id": "slug-su-kien-kebab",\n' +
      '  "title": "Tên sự kiện",\n' +
      '  "date": "YYYY-MM-DD",\n' +
      '  "location": "Địa điểm",\n' +
      '  "summary": "Một dòng mô tả",\n' +
      '  "bookIds": ' +
      ids +
      ',\n' +
      '  "href": "ten-trang.html",\n' +
      '  "kind": "history"\n' +
      '}'
    );
  }

  function setupAddModals() {
    $('btn-add-book') &&
      $('btn-add-book').addEventListener('click', function () {
        $('modal-book-json').textContent = jsonTemplateBook();
        openModal('modal-add-book');
      });
    $('btn-add-event') &&
      $('btn-add-event').addEventListener('click', function () {
        $('modal-event-json').textContent = jsonTemplateEvent(null);
        $('modal-event-title').textContent = 'Thêm sự kiện';
        $('modal-event-hint').textContent =
          'Dán object vào mảng "events" trong data/registry.json. bookIds có thể để [] nếu chưa gắn sách.';
        openModal('modal-add-event');
      });
    $('modal-add-book-close') &&
      $('modal-add-book-close').addEventListener('click', function () {
        closeModal('modal-add-book');
      });
    $('modal-add-event-close') &&
      $('modal-add-event-close').addEventListener('click', function () {
        closeModal('modal-add-event');
      });
    $('modal-add-book') &&
      $('modal-add-book').addEventListener('click', function (e) {
        if (e.target.id === 'modal-add-book') closeModal('modal-add-book');
      });
    $('modal-add-event') &&
      $('modal-add-event').addEventListener('click', function (e) {
        if (e.target.id === 'modal-add-event') closeModal('modal-add-event');
      });

    $('btn-copy-book-json') &&
      $('btn-copy-book-json').addEventListener('click', function () {
        copyText($('modal-book-json').textContent);
      });
    $('btn-copy-event-json') &&
      $('btn-copy-event-json').addEventListener('click', function () {
        copyText($('modal-event-json').textContent);
      });
  }

  function openAddEventModal(bookId, bookTitle) {
    $('modal-event-json').textContent = jsonTemplateEvent(bookId);
    $('modal-event-title').textContent = 'Thêm sự kiện (gắn với sách)';
    $('modal-event-hint').textContent = 'Sách: ' + (bookTitle || bookId) + ' — bookIds đã điền sẵn.';
    openModal('modal-add-event');
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        alert('Đã copy vào clipboard.');
      });
      return;
    }
    var ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      alert('Đã copy vào clipboard.');
    } catch (e) {}
    document.body.removeChild(ta);
  }

  function exportCsv() {
    var rows = [['id', 'title', 'date', 'location', 'bookIds', 'href', 'summary']];
    (state.registry.events || []).forEach(function (ev) {
      rows.push([
        ev.id,
        ev.title,
        ev.date,
        ev.location || '',
        (ev.bookIds || []).join(';'),
        ev.href || '',
        (ev.summary || '').replace(/\n/g, ' ')
      ]);
    });
    var csv = rows
      .map(function (r) {
        return r
          .map(function (cell) {
            var s = String(cell == null ? '' : cell);
            if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
            return s;
          })
          .join(',');
      })
      .join('\n');
    var blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'events-export.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function init() {
    setupAddModals();
    $('btn-export-csv') && $('btn-export-csv').addEventListener('click', exportCsv);

    $('filter-year').addEventListener('change', function () {
      state.filterYear = this.value;
      state.eventPage = 1;
      renderEventList();
    });
    $('filter-month').addEventListener('change', function () {
      state.filterMonth = this.value;
      state.eventPage = 1;
      renderEventList();
    });
    $('filter-day').addEventListener('change', function () {
      state.filterDay = this.value;
      state.eventPage = 1;
      renderEventList();
    });
    $('btn-filter-reset') &&
      $('btn-filter-reset').addEventListener('click', function () {
        state.filterYear = '';
        state.filterMonth = '';
        state.filterDay = '';
        state.eventPage = 1;
        fillYearMonthDayOptions();
        renderEventList();
      });

    fetch('data/registry.json')
      .then(function (r) {
        if (!r.ok) throw new Error('Không đọc được registry.json');
        return r.json();
      })
      .then(function (data) {
        state.registry = data;
        fillYearMonthDayOptions();
        renderBookList();
        renderEventList();
      })
      .catch(function (err) {
        console.error(err);
        $('book-list-root').innerHTML =
          '<p class="text-sm text-red-600">Lỗi tải dữ liệu. Mở trang qua HTTP (không dùng file://) hoặc kiểm tra data/registry.json.</p>';
        $('event-list-root').innerHTML = '';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
