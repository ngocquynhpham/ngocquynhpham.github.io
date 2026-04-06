/**
 * Trang Course: dashboard, lịch sử, kho đề — đọc cùng localStorage với Task 1/2.
 */
(function () {
    var T1Q = 'ielts-t1-questions-v1';
    var T1H = 'ielts-t1-writing-history-v1';
    var T2H = 'ielts-t2-writing-history-v1';

    /** Đồng bộ với writting-task2.html — dùng cho Kho đề & đếm đề. */
    window.IELTSCourseT2 = {
        categories: [
            {
                id: 'environment',
                name: 'Environment',
                icon: 'leaf',
                prompts: [
                    { id: 'env-1', title: 'Climate change is the most serious threat facing the world today. To what extent do you agree or disagree?' },
                    { id: 'env-2', title: 'Plastic waste should be reduced by banning single-use products. Discuss both views and give your opinion.' },
                ],
            },
            {
                id: 'education',
                name: 'Education',
                icon: 'graduation-cap',
                prompts: [
                    { id: 'edu-1', title: 'Some believe online learning will replace schools in the future. Others disagree. Discuss both views.' },
                    { id: 'edu-2', title: 'University education should be free for everyone. To what extent do you agree or disagree?' },
                ],
            },
            {
                id: 'technology',
                name: 'Technology',
                icon: 'microchip',
                prompts: [
                    { id: 'tech-1', title: 'Artificial intelligence will create more problems than it solves. To what extent do you agree or disagree?' },
                    { id: 'tech-2', title: 'Social media has a negative impact on young people. Discuss the advantages and disadvantages.' },
                ],
            },
            {
                id: 'health',
                name: 'Health & Society',
                icon: 'heart-pulse',
                prompts: [
                    { id: 'health-1', title: 'Governments should tax unhealthy food to reduce obesity. To what extent do you agree or disagree?' },
                    { id: 'health-2', title: 'Public healthcare should be available to all citizens free of charge. Discuss both views.' },
                ],
            },
            {
                id: 'work',
                name: 'Work & Economy',
                icon: 'briefcase',
                prompts: [
                    { id: 'work-1', title: 'People should work fewer hours and have more leisure time. Do the advantages outweigh the disadvantages?' },
                    { id: 'work-2', title: 'Remote work will become the norm. To what extent is this a positive development?' },
                ],
            },
            {
                id: 'culture',
                name: 'Culture & Media',
                icon: 'book-open',
                prompts: [
                    { id: 'cul-1', title: 'News media should not report violent crimes in detail. To what extent do you agree or disagree?' },
                    { id: 'cul-2', title: 'Traditional cultures are disappearing as globalization spreads. Is this a positive or negative development?' },
                ],
            },
        ],
        countPrompts: function () {
            var n = 0;
            this.categories.forEach(function (c) {
                n += c.prompts.length;
            });
            return n;
        },
    };

    function escapeHtml(s) {
        return String(s ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function loadJson(key, fallback) {
        try {
            var raw = localStorage.getItem(key);
            if (!raw) return fallback;
            var p = JSON.parse(raw);
            return p;
        } catch (e) {
            return fallback;
        }
    }

    function loadT1Questions() {
        var a = loadJson(T1Q, null);
        return Array.isArray(a) ? a : [];
    }

    function loadT1History() {
        var a = loadJson(T1H, []);
        return Array.isArray(a) ? a : [];
    }

    function loadT2History() {
        var a = loadJson(T2H, []);
        return Array.isArray(a) ? a : [];
    }

    function formatDateVi(ts) {
        try {
            return new Date(ts).toLocaleString('vi-VN', { dateStyle: 'medium', timeStyle: 'short' });
        } catch (e) {
            return '';
        }
    }

    function countByQuestionT1(history) {
        var m = {};
        history.forEach(function (h) {
            var qid = h.questionId != null ? String(h.questionId) : '';
            if (!qid) return;
            m[qid] = (m[qid] || 0) + 1;
        });
        return m;
    }

    function countT1EssaysForQuestion(qid, history) {
        var id = String(qid);
        var n = 0;
        (history || []).forEach(function (h) {
            if (h.questionId != null && String(h.questionId) === id) n++;
        });
        return n;
    }

    function countByPromptT2(history) {
        var m = {};
        history.forEach(function (h) {
            var pid = h.promptId != null ? String(h.promptId) : '';
            if (!pid) return;
            m[pid] = (m[pid] || 0) + 1;
        });
        return m;
    }

    function renderStats() {
        var j = window.IELTSJourney ? IELTSJourney.load() : { task1: 0, task2: 0 };
        var t1q = loadT1Questions();
        var t2n = window.IELTSCourseT2.countPrompts();

        var elJ1 = document.getElementById('stat-journey-t1');
        var elJ2 = document.getElementById('stat-journey-t2');
        var elB1 = document.getElementById('stat-bank-t1');
        var elB2 = document.getElementById('stat-bank-t2');
        if (elJ1) elJ1.textContent = String(j.task1 || 0);
        if (elJ2) elJ2.textContent = String(j.task2 || 0);
        if (elB1) elB1.textContent = String(t1q.length);
        if (elB2) elB2.textContent = String(window.IELTSCourseT2 ? window.IELTSCourseT2.countPrompts() : t2n);
    }

    function renderPixelYear() {
        var grid = document.getElementById('pixel-year-grid');
        var label = document.getElementById('pixel-year-label');
        var legend = document.getElementById('pixel-year-legend');
        var yearSel = document.getElementById('pixel-year-select');
        var monthSel = document.getElementById('pixel-month-select');
        if (!grid || !window.IELTSJourney || !IELTSJourney.loadPracticeDays) return;

        var daysArr = IELTSJourney.loadPracticeDays();
        var daysSet = {};
        daysArr.forEach(function (s) {
            daysSet[s] = true;
        });

        var currentY = new Date().getFullYear();
        var minY = currentY;
        daysArr.forEach(function (ymd) {
            var y = parseInt(ymd.slice(0, 4), 10);
            if (!isNaN(y) && y < minY) minY = y;
        });

        if (yearSel && yearSel.options.length === 0) {
            for (var yy = currentY; yy >= Math.min(minY, currentY) - 2; yy--) {
                var opt = document.createElement('option');
                opt.value = String(yy);
                opt.textContent = String(yy);
                yearSel.appendChild(opt);
            }
            if (!yearSel.querySelector('option[value="' + currentY + '"]')) {
                var o = document.createElement('option');
                o.value = String(currentY);
                o.textContent = String(currentY);
                yearSel.appendChild(o);
            }
            yearSel.value = String(currentY);
        }

        var year = yearSel ? parseInt(yearSel.value, 10) || currentY : currentY;
        var monthFilter = monthSel ? monthSel.value : ''; // '' = all

        if (label) label.textContent = String(year);

        var todayMid = new Date();
        todayMid.setHours(0, 0, 0, 0);
        var d = new Date(year, 0, 1);
        var parts = [];
        var daysInYear = 0;
        var practicedInFilter = 0;

        while (d.getFullYear() === year) {
            daysInYear++;
            var ymd = IELTSJourney.formatLocalYMD(d);
            var dm = new Date(d.getTime());
            dm.setHours(0, 0, 0, 0);
            var isFuture = dm > todayMid;
            var monthNum = d.getMonth() + 1;
            var inSelectedMonth = !monthFilter || String(monthNum) === String(monthFilter);

            var cls = 'px';
            if (isFuture) cls += ' future';
            else if (daysSet[ymd]) {
                cls += ' on';
                if (monthFilter && inSelectedMonth) practicedInFilter++;
                if (monthFilter && !inSelectedMonth) cls += ' dim';
            } else if (monthFilter && !inSelectedMonth) cls += ' dim';

            var title = ymd;
            if (daysSet[ymd] && monthFilter && !inSelectedMonth) title += ' (ngoài tháng đang xem)';
            parts.push('<span class="' + cls + '" title="' + escapeHtml(title) + '"></span>');
            d.setDate(d.getDate() + 1);
        }

        grid.innerHTML = parts.join('');

        var practicedYear = 0;
        for (var k in daysSet) {
            if (Object.prototype.hasOwnProperty.call(daysSet, k) && k.indexOf(String(year) + '-') === 0) practicedYear++;
        }

        if (legend) {
            if (monthFilter) {
                var mi = parseInt(monthFilter, 10);
                legend.textContent =
                    'Năm ' +
                    year +
                    ', tháng ' +
                    mi +
                    ': ' +
                    practicedInFilter +
                    ' ngày có luyện (ô indigo trong tháng; ô mờ = ngày khác tháng).';
            } else {
                legend.textContent =
                    practicedYear > 0
                        ? 'Năm ' + year + ': ' + practicedYear + ' ngày có luyện (trên ' + daysInYear + ' ngày).'
                        : 'Chưa có ngày nào trong năm này — luyện và lưu bài để tô màu.';
            }
        }
    }

    function renderHistoryT1() {
        var mount = document.getElementById('history-t1-list');
        if (!mount) return;
        var hist = loadT1History().sort(function (a, b) {
            return (b.completedAt || 0) - (a.completedAt || 0);
        });
        var byQ = countByQuestionT1(hist);

        if (!hist.length) {
            mount.innerHTML =
                '<p class="text-[13px] text-slate-500 py-8 text-center border border-dashed border-slate-200 rounded-xl">Chưa có bài Task 1.</p>';
            return;
        }

        mount.innerHTML = hist
            .map(function (h) {
                var qid = h.questionId != null ? String(h.questionId) : '';
                var nSame = qid ? byQ[qid] || 1 : 1;
                var hid = encodeURIComponent(h.id);
                return (
                    '<article class="rounded-xl border border-slate-200 bg-white p-4 flex flex-col sm:flex-row sm:items-start gap-3">' +
                    '<div class="min-w-0 flex-1">' +
                    '<p class="text-[11px] text-slate-400 mb-1">' +
                    escapeHtml(formatDateVi(h.completedAt)) +
                    ' · ' +
                    (h.wordCount || 0) +
                    ' từ · cùng đề: ' +
                    nSame +
                    ' lần</p>' +
                    '<h3 class="font-medium text-slate-800 text-[14px] leading-snug">' +
                    escapeHtml(h.title || '(Không tiêu đề)') +
                    '</h3>' +
                    '</div>' +
                    '<div class="flex flex-wrap gap-2 shrink-0">' +
                    '<a class="btn btn-primary text-[13px] px-3 py-2 rounded-lg inline-flex items-center gap-1 bg-indigo-600 text-white hover:brightness-105" href="./writting-task1.html?view=history&openHistory=' +
                    hid +
                    '">Xem &amp; export</a>' +
                    '<a class="btn btn-secondary text-[13px] px-3 py-2 rounded-lg border border-slate-200 bg-white" href="./writting-task1.html?practice=' +
                    encodeURIComponent(qid) +
                    '">Luyện lại</a>' +
                    '</div>' +
                    '</article>'
                );
            })
            .join('');
    }

    function renderHistoryT2() {
        var mount = document.getElementById('history-t2-list');
        if (!mount) return;
        var hist = loadT2History().sort(function (a, b) {
            return (b.completedAt || 0) - (a.completedAt || 0);
        });
        var byP = countByPromptT2(hist);

        if (!hist.length) {
            mount.innerHTML =
                '<p class="text-[13px] text-slate-500 py-8 text-center border border-dashed border-slate-200 rounded-xl">Chưa có bài Task 2.</p>';
            return;
        }

        mount.innerHTML = hist
            .map(function (h) {
                var pid = h.promptId != null ? String(h.promptId) : '';
                var nSame = pid ? byP[pid] || 1 : 1;
                return (
                    '<article class="rounded-xl border border-slate-200 bg-white p-4 flex flex-col sm:flex-row sm:items-start gap-3">' +
                    '<div class="min-w-0 flex-1">' +
                    '<p class="text-[11px] text-slate-400 mb-1">' +
                    escapeHtml(formatDateVi(h.completedAt)) +
                    ' · ' +
                    (h.wordCount || 0) +
                    ' từ · cùng đề: ' +
                    nSame +
                    ' lần</p>' +
                    '<p class="text-[11px] font-semibold text-amber-700 uppercase mb-1">' +
                    escapeHtml(h.categoryName || '') +
                    '</p>' +
                    '<h3 class="font-medium text-slate-800 text-[14px] leading-snug">' +
                    escapeHtml(h.promptTitle || '') +
                    '</h3>' +
                    '</div>' +
                    '<div class="flex flex-wrap gap-2 shrink-0">' +
                    '<a class="btn btn-primary text-[13px] px-3 py-2 rounded-lg inline-flex items-center gap-1 bg-amber-600 text-white hover:brightness-105" href="./writting-task2.html?view=history">Lịch sử Task 2</a>' +
                    '<a class="btn btn-secondary text-[13px] px-3 py-2 rounded-lg border border-slate-200 bg-white" href="./writting-task2.html?prompt=' +
                    encodeURIComponent(pid) +
                    '">Luyện lại</a>' +
                    '</div>' +
                    '</article>'
                );
            })
            .join('');
    }

    function renderBankT1() {
        var mount = document.getElementById('bank-t1-list');
        if (!mount) return;
        var qs = loadT1Questions();
        var hist = loadT1History();
        if (!qs.length) {
            mount.innerHTML =
                '<p class="text-[13px] text-slate-500 mb-4">Chưa có đề. Thêm đề mới bên dưới.</p>';
            return;
        }
        mount.innerHTML = qs
            .map(function (q) {
                var id = String(q.id);
                var qidAttr = id.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                var nEssay = countT1EssaysForQuestion(id, hist);
                var canDelete = nEssay === 0;
                var deleteBlock = canDelete
                    ? '<button type="button" onclick="IELTSCourseDeleteT1Question(\'' +
                      qidAttr +
                      '\')" class="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white text-red-600 text-[13px] font-medium px-3 py-2 shrink-0 hover:bg-red-50" title="Xóa đề khỏi kho">' +
                      '<i class="fas fa-trash-alt text-[12px]"></i> Xóa đề</button>'
                    : '<button type="button" disabled class="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-400 text-[13px] font-medium px-3 py-2 shrink-0 cursor-not-allowed" title="Đã có bài luyện tập — không thể xóa đề.">' +
                      '<i class="fas fa-lock text-[12px]"></i> Không xóa</button>';
                return (
                    '<div class="rounded-xl border border-slate-200 bg-slate-50/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">' +
                    '<div class="min-w-0 flex-1">' +
                    '<span class="text-[10px] font-bold uppercase text-indigo-600">' +
                    escapeHtml(q.type || 'chart') +
                    '</span>' +
                    '<h3 class="font-medium text-slate-800 text-[14px] mt-1">' +
                    escapeHtml(q.title || '(Không tiêu đề)') +
                    '</h3>' +
                    (nEssay > 0
                        ? '<p class="text-[11px] text-slate-500 mt-1">' +
                          nEssay +
                          ' bài luyện tập — xóa đề chỉ khi chưa có bài nào.</p>'
                        : '') +
                    '</div>' +
                    '<div class="flex flex-wrap items-center gap-2 shrink-0">' +
                    '<a href="./writting-task1.html?practice=' +
                    encodeURIComponent(id) +
                    '" class="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white text-[13px] font-medium px-4 py-2.5 hover:brightness-105">Luyện viết</a>' +
                    deleteBlock +
                    '</div>' +
                    '</div>'
                );
            })
            .join('');
    }

    window.IELTSCourseDeleteT1Question = function (id) {
        var hist = loadT1History();
        if (countT1EssaysForQuestion(id, hist) > 0) {
            alert('Đề đã có bài luyện tập — không thể xóa.');
            return;
        }
        if (!confirm('Xóa đề này khỏi kho? Thao tác không hoàn tác.')) return;
        hist = loadT1History();
        if (countT1EssaysForQuestion(id, hist) > 0) {
            alert('Đề đã có bài luyện tập — không thể xóa.');
            renderBankT1();
            return;
        }
        var qs = loadT1Questions().filter(function (q) {
            return String(q.id) !== String(id);
        });
        try {
            localStorage.setItem(T1Q, JSON.stringify(qs));
        } catch (e) {
            alert('Không thể lưu (bộ nhớ đầy hoặc chế độ riêng tư).');
            return;
        }
        renderBankT1();
        renderStats();
    };

    function renderBankT2() {
        var mount = document.getElementById('bank-t2-list');
        if (!mount) return;
        var cats = window.IELTSCourseT2.categories;
        mount.innerHTML = cats
            .map(function (cat) {
                var blocks = cat.prompts
                    .map(function (p) {
                        return (
                            '<div class="rounded-lg border border-slate-100 bg-slate-50/80 p-3 flex flex-col sm:flex-row sm:items-center gap-2">' +
                            '<p class="text-[13px] text-slate-800 flex-1 min-w-0 leading-snug">' +
                            escapeHtml(p.title) +
                            '</p>' +
                            '<a href="./writting-task2.html?prompt=' +
                            encodeURIComponent(p.id) +
                            '" class="inline-flex items-center justify-center shrink-0 rounded-lg bg-amber-600 text-white text-[13px] font-medium px-3 py-2 hover:brightness-105">Luyện viết</a>' +
                            '</div>'
                        );
                    })
                    .join('');
                return (
                    '<div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">' +
                    '<div class="flex items-center gap-2 mb-3">' +
                    '<div class="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"><i class="fas fa-' +
                    cat.icon +
                    '"></i></div>' +
                    '<h3 class="font-semibold text-slate-800">' +
                    escapeHtml(cat.name) +
                    '</h3>' +
                    '</div>' +
                    '<div class="space-y-2">' +
                    blocks +
                    '</div>' +
                    '</div>'
                );
            })
            .join('');
    }

    function showSection(id) {
        ['dashboard', 'history', 'bank'].forEach(function (s) {
            var el = document.getElementById('section-' + s);
            if (el) el.classList.toggle('hidden', s !== id);
        });
        document.querySelectorAll('[data-nav]').forEach(function (nav) {
            var s = nav.getAttribute('data-nav');
            var active = s === id;
            nav.classList.toggle('bg-indigo-50', active);
            nav.classList.toggle('text-indigo-700', active);
            nav.classList.toggle('font-semibold', active);
        });
        if (id === 'history') {
            renderHistoryT1();
            renderHistoryT2();
        }
        if (id === 'bank') {
            renderBankT1();
            renderBankT2();
        }
    }

    function applyHash() {
        var h = (window.location.hash || '#dashboard').replace('#', '') || 'dashboard';
        if (['dashboard', 'history', 'bank'].indexOf(h) === -1) h = 'dashboard';
        showSection(h);
    }

    window.IELTSCourseInit = function () {
        renderStats();
        renderPixelYear();

        document.querySelectorAll('[data-nav]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var id = btn.getAttribute('data-nav');
                window.location.hash = id;
                showSection(id);
            });
        });

        var ys = document.getElementById('pixel-year-select');
        var ms = document.getElementById('pixel-month-select');
        if (ys) ys.addEventListener('change', renderPixelYear);
        if (ms) ms.addEventListener('change', renderPixelYear);

        window.addEventListener('hashchange', applyHash);
        applyHash();
    };
})();
