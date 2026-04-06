/**
 * Shared Writing Journey counts (Task 1 data essays + Task 2 argument essays).
 * Migrates from history lengths when key is missing.
 */
(function (global) {
    var KEY = 'ielts-lab-journey-v1';
    var DAYS_KEY = 'ielts-lab-practice-days-v1';
    var T1H = 'ielts-t1-writing-history-v1';
    var T2H = 'ielts-t2-writing-history-v1';

    function pad2(n) {
        return n < 10 ? '0' + n : String(n);
    }

    /** Local calendar YYYY-MM-DD (for pixel-year tracking). */
    function formatLocalYMD(d) {
        return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
    }

    function loadPracticeDays() {
        try {
            var raw = localStorage.getItem(DAYS_KEY);
            var arr = raw ? JSON.parse(raw) : [];
            return Array.isArray(arr) ? arr : [];
        } catch (e) {
            return [];
        }
    }

    function savePracticeDays(arr) {
        try {
            localStorage.setItem(DAYS_KEY, JSON.stringify(arr));
        } catch (e) {}
    }

    function recordPracticeDay() {
        var today = formatLocalYMD(new Date());
        var arr = loadPracticeDays();
        if (arr.indexOf(today) === -1) {
            arr.push(today);
            savePracticeDays(arr);
        }
    }

    function migrateFromHistory() {
        var t1 = 0;
        var t2 = 0;
        try {
            var a = JSON.parse(localStorage.getItem(T1H) || '[]');
            if (Array.isArray(a)) t1 = a.length;
        } catch (e) {}
        try {
            var b = JSON.parse(localStorage.getItem(T2H) || '[]');
            if (Array.isArray(b)) t2 = b.length;
        } catch (e) {}
        var j = { task1: t1, task2: t2 };
        try {
            localStorage.setItem(KEY, JSON.stringify(j));
        } catch (e) {}
        return j;
    }

    function load() {
        try {
            var raw = localStorage.getItem(KEY);
            if (raw) {
                var j = JSON.parse(raw);
                return {
                    task1: Math.max(0, parseInt(j.task1, 10) || 0),
                    task2: Math.max(0, parseInt(j.task2, 10) || 0),
                };
            }
        } catch (e) {}
        return migrateFromHistory();
    }

    function save(j) {
        try {
            localStorage.setItem(KEY, JSON.stringify(j));
        } catch (e) {}
    }

    function bumpTask1() {
        var j = load();
        j.task1 = (j.task1 || 0) + 1;
        save(j);
        recordPracticeDay();
    }

    function bumpTask2() {
        var j = load();
        j.task2 = (j.task2 || 0) + 1;
        save(j);
        recordPracticeDay();
    }

    global.IELTSJourney = {
        load: load,
        bumpTask1: bumpTask1,
        bumpTask2: bumpTask2,
        loadPracticeDays: loadPracticeDays,
        formatLocalYMD: formatLocalYMD,
    };
})(typeof window !== 'undefined' ? window : globalThis);
