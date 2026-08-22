(function () {
  'use strict';

  var PAGE_SIZE = 10;

  var state = {
    registry: { events: [] },
    page: 1,
    search: ''
  };

  function $(id) {
    return document.getElementById(id);
  }

  function parseDate(iso) {
    if (!iso) return null;
    var d = new Date(iso + 'T12:00:00');
    return isNaN(d.getTime()) ? null : d;
  }

  function formatDateVi(iso) {
    var d = parseDate(iso);
    if (!d) return iso || '—';
    var dd = String(d.getDate()).padStart(2, '0');
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    return dd + '/' + mm + '/' + d.getFullYear();
  }

  function escapeHtml(value) {
    if (value == null) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getFilteredEvents() {
    var term = (state.search || '').trim().toLowerCase();
    var list = state.registry.events || [];
    if (!term) return list;
    return list.filter(function (ev) {
      var haystack = [
        ev.title,
        ev.country,
        ev.location,
        ev.summary,
        ev.date
      ].join(' ').toLowerCase();
      return haystack.indexOf(term) !== -1;
    });
  }

  function paginate(items, currentPage, pageSize) {
    var total = items.length;
    var pages = Math.max(1, Math.ceil(total / pageSize));
    var safePage = Math.min(currentPage, pages);
    var start = (safePage - 1) * pageSize;
    return {
      items: items.slice(start, start + pageSize),
      page: safePage,
      pages: pages,
      total: total
    };
  }

  function renderPagination(allItems, currentPage, callback) {
    var pagination = $('event-pagination');
    if (!pagination) return;
    var totalPages = Math.max(1, Math.ceil(allItems.length / PAGE_SIZE));
    var safePage = Math.min(currentPage, totalPages);

    if (allItems.length === 0) {
      pagination.innerHTML = '';
      return;
    }

    var html = [
      '<button type="button" class="page-btn" data-page="' + (safePage - 1) + '" ' + (safePage <= 1 ? 'disabled' : '') + '>Trước</button>',
      '<span style="font-size: 0.8rem; color: var(--muted); font-weight: 600;">Trang ' + safePage + ' / ' + totalPages + '</span>',
      '<button type="button" class="page-btn" data-page="' + (safePage + 1) + '" ' + (safePage >= totalPages ? 'disabled' : '') + '>Sau</button>'
    ].join('');

    pagination.innerHTML = html;
    pagination.querySelectorAll('[data-page]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = Number(btn.getAttribute('data-page'));
        if (target >= 1 && target <= totalPages) {
          callback(target);
        }
      });
    });
  }

  function renderTable() {
    var filtered = getFilteredEvents();
    var dataset = paginate(filtered, state.page, PAGE_SIZE);
    state.page = dataset.page;

    var body = $('event-table-body');
    var summary = $('result-summary');
    if (!body || !summary) return;

    if (!filtered.length) {
      body.innerHTML = '<tr><td colspan="4" class="empty-state">Không tìm thấy sự kiện nào phù hợp với từ khoá này.</td></tr>';
      summary.textContent = '0 sự kiện';
      renderPagination(filtered, 1, function () {});
      return;
    }

    summary.textContent = filtered.length + ' sự kiện • Trang ' + dataset.page + ' / ' + dataset.pages;

    body.innerHTML = dataset.items.map(function (event, idx) {
      var itemNumber = (dataset.page - 1) * PAGE_SIZE + idx + 1;
      var country = escapeHtml(event.country || 'Chưa xác định');
      var title = escapeHtml(event.title || 'Sự kiện chưa đặt tên');
      var meta = event.date ? ' • ' + formatDateVi(event.date) : '';
      var detailHref = event.href ? '<a class="action-btn" href="' + escapeHtml(event.href) + '">Xem</a>' : '<span class="action-btn" aria-disabled="true">Xem</span>';

      return (
        '<tr>' +
        '  <td>' + itemNumber + '</td>' +
        '  <td>' +
        '    <span class="event-title">' + title + '</span>' +
        '    <span class="event-meta">' + escapeHtml(event.location || 'Không có địa điểm') + meta + '</span>' +
        '  </td>' +
        '  <td><span class="country-badge">' + country + '</span></td>' +
        '  <td>' + detailHref + '</td>' +
        '</tr>'
      );
    }).join('');

    renderPagination(filtered, dataset.page, function (nextPage) {
      state.page = nextPage;
      renderTable();
    });
  }

  function bindEvents() {
    var searchInput = $('event-search');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        state.search = this.value;
        state.page = 1;
        renderTable();
      });
    }
  }

  function init() {
    bindEvents();
    fetch('data/registry.json')
      .then(function (response) {
        if (!response.ok) throw new Error('Không đọc được registry.json');
        return response.json();
      })
      .then(function (data) {
        state.registry = data || { events: [] };
        renderTable();
      })
      .catch(function (error) {
        console.error(error);
        var body = $('event-table-body');
        if (body) {
          body.innerHTML = '<tr><td colspan="4" class="empty-state">Lỗi tải dữ liệu. Vui lòng kiểm tra lại file registry.json.</td></tr>';
        }
        var summary = $('result-summary');
        if (summary) summary.textContent = 'Không thể tải dữ liệu';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
