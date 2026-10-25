/* TYT Đông Thạnh — Demo UI (mock data, Technical Spec V1.6) */
(function () {
  "use strict";

  const TZ = "Asia/Ho_Chi_Minh";
  const DEMO_PASSWORD = "demo123";

  const ROLES = {
    ROOT: "ROOT",
    ADMIN: "ADMIN",
    NVYT: "NVYT",
    MANAGER: "MANAGER",
    BOD: "BOD",
  };

  const STATUS_LABEL = {
    VERIFYING: "Đang xác minh",
    VERIFIED: "Đã xác minh",
    RESOLVED: "Đã xử lý",
  };

  const LOCATION_LABEL = {
    IN_COMMUNE: "Trong xã · biết ấp",
    UNKNOWN_HAMLET: "Chưa rõ ấp",
    OUTSIDE_COMMUNE: "Ngoài xã",
  };

  const SLA_LABEL = {
    NONE: "Trong hạn",
    VERIFICATION_DUE_SOON: "Sắp trễ xác minh",
    PROCESSING_DUE_SOON: "Sắp trễ xử lý",
    PROCESSING_OVERDUE: "Quá hạn xử lý",
  };

  let hamlets = [];
  let catalogMeta = null;
  let pcdAssignmentRows = [];

  const diseaseTypes = [
    { id: "d1", code: "SXH", name: "Sốt xuất huyết" },
    { id: "d2", code: "CUM", name: "Cúm mùa" },
    { id: "d3", code: "COVID", name: "COVID-19" },
    { id: "d4", code: "KHAC", name: "Bệnh truyền nhiễm khác" },
  ];

  const SEED_USERS = [
    { id: "u-root", username: "root", full_name: "Nguyễn Văn Root", email: null, role: ROLES.ROOT, is_active: true },
    { id: "u-admin", username: "admin", full_name: "Trần Thị Admin", email: null, role: ROLES.ADMIN, is_active: true },
    { id: "u-nvyt1", username: "nvyt.le", full_name: "Lê Văn Y", email: null, role: ROLES.NVYT, is_active: true },
    { id: "u-nvyt2", username: "nvyt.pham", full_name: "Phạm Thị H", email: null, role: ROLES.NVYT, is_active: true },
    { id: "u-mgr", username: "manager", full_name: "Hoàng Quản Lý", email: null, role: ROLES.MANAGER, is_active: true },
    { id: "u-bod", username: "bod", full_name: "Võ Ban Giám Đốc", email: null, role: ROLES.BOD, is_active: true },
  ];

  const REG_STORAGE_KEY = "tyt_demo_registered_v1";

  let users = SEED_USERS.slice();
  let passwords = Object.fromEntries(SEED_USERS.map((u) => [u.id, DEMO_PASSWORD]));

  function loadRegisteredUsers() {
    try {
      const raw = localStorage.getItem(REG_STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      (data.users || []).forEach((u) => {
        if (!users.some((x) => x.username === u.username)) users.push(u);
      });
      Object.assign(passwords, data.passwords || {});
    } catch (_) {
      /* ignore corrupt storage */
    }
  }

  function saveRegisteredUsers() {
    const registered = users.filter((u) => !SEED_USERS.some((s) => s.id === u.id));
    const subset = {};
    registered.forEach((u) => {
      if (passwords[u.id]) subset[u.id] = passwords[u.id];
    });
    localStorage.setItem(REG_STORAGE_KEY, JSON.stringify({ users: registered, passwords: subset }));
  }

  loadRegisteredUsers();

  function applyCatalogFromExcel() {
    const cat = window.TYT_CATALOG;
    if (!cat) {
      hamlets = [
        { id: "h1", code: "AP01", name: "Ấp 1", active: true },
        { id: "h2", code: "AP02", name: "Ấp 2", active: true },
      ];
      return;
    }
    catalogMeta = cat.meta || null;
    hamlets = cat.hamlets.map((h) => ({
      id: h.id,
      code: h.code,
      name: h.name,
      num: h.num,
      active: h.active !== false,
      leader_name: h.leader_name || null,
      leader_phone: h.leader_phone || null,
    }));
    pcdAssignmentRows = cat.pcd_assignments || [];

    (cat.pcd_nvyt_users || []).forEach((u) => {
      if (users.some((x) => x.username === u.username)) return;
      users.push({
        id: u.id,
        username: u.username,
        full_name: u.full_name,
        email: null,
        role: ROLES.NVYT,
        is_active: true,
        from_pcd: true,
      });
      passwords[u.id] = DEMO_PASSWORD;
    });

    const pcdStart = new Date(Date.UTC(2026, 6, 9, 2, 0)).toISOString();
    userHamletAssignments = (cat.pcd_user_hamlet_pairs || []).map((p) => ({
      user_id: p.user_id,
      hamlet_id: "h" + p.hamlet_num,
      assigned_at: pcdStart,
      revoked_at: null,
      source_row: p.source_row,
      department: p.department || null,
    }));

    userHamletAssignments.push(
      { user_id: "u-nvyt1", hamlet_id: "h1", assigned_at: isoDaysAgo(30, 9), revoked_at: null, source_row: "Demo" },
      { user_id: "u-nvyt1", hamlet_id: "h2", assigned_at: isoDaysAgo(20, 9), revoked_at: null, source_row: "Demo" }
    );
  }

  let userHamletAssignments = [];

  let caseSupport = [
    { case_id: "c2", user_id: "u-nvyt2", revoked_at: null },
  ];

  let accessRestrictions = [];

  let auditLogs = [
    { id: "a1", actor_id: "u-admin", action: "LOGIN", entity_type: "session", entity_id: "-", created_at: isoDaysAgo(0, 8) },
    { id: "a2", actor_id: "u-nvyt1", action: "CASE_CREATE", entity_type: "case", entity_id: "c1", created_at: isoDaysAgo(2, 10) },
  ];

  function isoDaysAgo(days, hour) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    d.setHours(hour, 30, 0, 0);
    return d.toISOString();
  }

  function dateOnlyDaysAgo(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().slice(0, 10);
  }

  let cases = [
    {
      id: "c1",
      case_code: "DT-2026-0142",
      patient_code: "BN-8842",
      patient_name: "Nguyễn Văn A",
      disease_type_id: "d1",
      received_date: dateOnlyDaysAgo(0),
      location_type: "IN_COMMUNE",
      hamlet_id: "h1",
      external_locality_name: null,
      location_note: null,
      primary_user_id: "u-nvyt1",
      status: "VERIFYING",
      verified_at: null,
      resolved_at: null,
      verification_notes: "Đang liên hệ hộ dân",
      created_by: "u-admin",
      version: 1,
      is_lost_to_followup: false,
    },
    {
      id: "c2",
      case_code: "DT-2026-0138",
      patient_code: "BN-8801",
      patient_name: "Trần Thị B",
      disease_type_id: "d2",
      received_date: dateOnlyDaysAgo(1),
      location_type: "IN_COMMUNE",
      hamlet_id: "h2",
      external_locality_name: null,
      location_note: null,
      primary_user_id: "u-nvyt1",
      status: "VERIFYING",
      verified_at: null,
      resolved_at: null,
      created_by: "u-nvyt1",
      version: 2,
    },
    {
      id: "c3",
      case_code: "DT-2026-0120",
      patient_code: "BN-8700",
      patient_name: "Lê Văn C",
      disease_type_id: "d1",
      received_date: dateOnlyDaysAgo(2),
      location_type: "IN_COMMUNE",
      hamlet_id: "h3",
      external_locality_name: null,
      location_note: null,
      primary_user_id: "u-nvyt2",
      status: "VERIFIED",
      verified_at: isoDaysAgo(1, 9),
      resolved_at: null,
      created_by: "u-nvyt2",
      version: 3,
    },
    {
      id: "c4",
      case_code: "DT-2026-0099",
      patient_code: "BN-8600",
      patient_name: "Phạm Thị D",
      disease_type_id: "d3",
      received_date: dateOnlyDaysAgo(4),
      location_type: "IN_COMMUNE",
      hamlet_id: "h1",
      external_locality_name: null,
      location_note: null,
      primary_user_id: "u-nvyt1",
      status: "VERIFYING",
      verified_at: null,
      resolved_at: null,
      created_by: "u-admin",
      version: 1,
    },
    {
      id: "c5",
      case_code: "DT-2026-0088",
      patient_code: "DEMO-001",
      patient_name: "Ca mẫu · chưa rõ ấp",
      disease_type_id: "d4",
      received_date: dateOnlyDaysAgo(1),
      location_type: "UNKNOWN_HAMLET",
      hamlet_id: null,
      external_locality_name: null,
      location_note: "Đã xác minh ca, chưa xác định ấp cụ thể",
      primary_user_id: null,
      status: "VERIFYING",
      verified_at: null,
      resolved_at: null,
      created_by: "u-admin",
      version: 1,
      is_lost_to_followup: false,
    },
    {
      id: "c6",
      case_code: "DT-2026-0080",
      patient_code: "DEMO-002",
      patient_name: "Ca mẫu · ngoài xã",
      disease_type_id: "d2",
      received_date: dateOnlyDaysAgo(3),
      location_type: "OUTSIDE_COMMUNE",
      hamlet_id: null,
      external_locality_name: "Xã Tân Phú (huyện lân cận)",
      location_note: "Ghi nhận để theo dõi và phối hợp",
      primary_user_id: "u-admin",
      status: "VERIFIED",
      verified_at: isoDaysAgo(2, 14),
      resolved_at: null,
      created_by: "u-admin",
      version: 2,
    },
    {
      id: "c7",
      case_code: "DT-2026-0075",
      patient_code: "BN-8500",
      patient_name: "Hoàng Văn E",
      disease_type_id: "d1",
      received_date: dateOnlyDaysAgo(5),
      location_type: "IN_COMMUNE",
      hamlet_id: "h4",
      external_locality_name: null,
      location_note: null,
      primary_user_id: "u-nvyt2",
      status: "RESOLVED",
      verified_at: isoDaysAgo(4, 11),
      resolved_at: isoDaysAgo(3, 16),
      created_by: "u-admin",
      version: 4,
      is_lost_to_followup: true,
      lost_reason: "Không liên lạc được sau 2 lần đi thăm",
    },
  ];

  let transfers = [
    {
      case_id: "c7",
      from_location_type: "UNKNOWN_HAMLET",
      from_hamlet_id: null,
      to_location_type: "IN_COMMUNE",
      to_hamlet_id: "h4",
      reason: "Đã xác định đúng ấp sau xác minh",
      transferred_by: "u-admin",
      transferred_at: isoDaysAgo(5, 15),
    },
  ];

  let state = {
    user: null,
    route: "dashboard",
    selectedCaseId: null,
    detailTab: "info",
    demoNow: null,
    assignPrefillUserId: null,
    caseSearchQuery: "",
  };
  let renderDepth = 0;

  /** Mốc SLA theo chu kỳ hiện hành · Asia/Ho_Chi_Minh (UTC+7), spec V1.6 */
  function vnDateTime(y, m, d, hour, minute) {
    return new Date(Date.UTC(y, m - 1, d, hour - 7, minute, 0));
  }

  function activeSlaCycle(c) {
    const cycles = c.sla_cycles || [];
    return cycles.find((x) => !x.ended_at) || cycles[cycles.length - 1] || null;
  }

  function slaCycleStartDate(c) {
    const cycle = activeSlaCycle(c);
    const iso = cycle?.started_at || c.received_at || c.received_date || "";
    return iso.slice(0, 10);
  }

  function computeSla(receivedDateStr, status, now) {
    const [y, m, d] = receivedDateStr.split("-").map(Number);
    const warnVerify = vnDateTime(y, m, d + 1, 12, 0);
    const warnProcess = vnDateTime(y, m, d + 2, 12, 0);
    const overdueProcess = vnDateTime(y, m, d + 3, 0, 0);

    if (status === "RESOLVED") return "NONE";
    if (now >= overdueProcess) return "PROCESSING_OVERDUE";
    if (now >= warnProcess) return "PROCESSING_DUE_SOON";
    if (status === "VERIFYING" && now >= warnVerify) return "VERIFICATION_DUE_SOON";
    return "NONE";
  }

  function getNow() {
    return state.demoNow ? new Date(state.demoNow) : new Date();
  }

  function userById(id) {
    return users.find((u) => u.id === id);
  }

  function hamletById(id) {
    return hamlets.find((h) => h.id === id);
  }

  function diseaseById(id) {
    return diseaseTypes.find((d) => d.id === id);
  }

  function isReadOnlyRole(role) {
    return role === ROLES.MANAGER || role === ROLES.BOD;
  }

  function isAdminLike(role) {
    return role === ROLES.ROOT || role === ROLES.ADMIN;
  }

  function activeHamletsForUser(userId) {
    return userHamletAssignments
      .filter((a) => a.user_id === userId && !a.revoked_at)
      .map((a) => a.hamlet_id);
  }

  function isSupportOnCase(caseId, userId) {
    return caseSupport.some((s) => s.case_id === caseId && s.user_id === userId && !s.revoked_at);
  }

  function isRestricted(caseId, userId) {
    return accessRestrictions.some((r) => r.case_id === caseId && r.user_id === userId && !r.revoked_at);
  }

  function canViewCase(c, user) {
    if (!user || !c) return false;
    if (isAdminLike(user.role)) return true;
    if (isReadOnlyRole(user.role)) return true;
    if (user.role === ROLES.NVYT) {
      if (c.location_type !== "IN_COMMUNE" || !c.hamlet_id) return false;
      if (isRestricted(c.id, user.id)) return false;
      if (isSupportOnCase(c.id, user.id)) return true;
      return activeHamletsForUser(user.id).includes(c.hamlet_id);
    }
    return false;
  }

  function canEditCase(c, user) {
    if (!canViewCase(c, user)) return false;
    if (isReadOnlyRole(user.role)) return false;
    if (isRestricted(c.id, user.id)) return false;
    if (isAdminLike(user.role)) return true;
    if (isSupportOnCase(c.id, user.id)) return true;
    if (c.location_type === "IN_COMMUNE" && c.hamlet_id) {
      return activeHamletsForUser(user.id).includes(c.hamlet_id);
    }
    return false;
  }

  function canCreateCase(user) {
    return user && isAdminLike(user.role);
  }

  function enrichCase(c) {
    const now = getNow();
    const sla = computeSla(slaCycleStartDate(c), c.status, now);
    return { ...c, sla_alert: sla };
  }

  function visibleCases(user) {
    return cases.filter((c) => canViewCase(c, user)).map(enrichCase);
  }

  function myCases(user) {
    if (!user || user.role !== ROLES.NVYT) return [];
    return visibleCases(user);
  }

  function formatReceivedAt(c) {
    const iso = c.received_at || (c.received_date ? c.received_date + "T01:00:00.000Z" : "");
    if (!iso) return "—";
    return new Date(iso).toLocaleString("vi-VN", { timeZone: TZ });
  }

  function lostChip(c) {
    if (!c.is_lost_to_followup) return "";
    return '<span class="chip lost">Mất dấu</span>';
  }

  function normalizeCase(c) {
    if (c.jurisdiction_type && !c.location_type) c.location_type = c.jurisdiction_type;
    if (c.received_date && !c.received_at) {
      c.received_at = c.received_date + "T01:30:00.000Z";
    }
    if (c.is_lost_to_followup == null) c.is_lost_to_followup = false;
    if (!c.sla_cycles || !c.sla_cycles.length) {
      c.sla_cycles = [
        {
          started_at: c.received_at,
          start_reason: "CREATED",
          ended_at: null,
          cycle_number: 1,
        },
      ];
    }
    return c;
  }

  cases.forEach(normalizeCase);

  function slaChip(sla) {
    if (sla === "NONE") return '<span class="chip neutral">' + SLA_LABEL[sla] + "</span>";
    if (sla === "VERIFICATION_DUE_SOON" || sla === "PROCESSING_DUE_SOON")
      return '<span class="chip amber">' + SLA_LABEL[sla] + "</span>";
    return '<span class="chip red">' + SLA_LABEL[sla] + "</span>";
  }

  function statusChip(st) {
    const cls = st === "VERIFYING" ? "verify" : st === "VERIFIED" ? "verified" : "resolved";
    return '<span class="chip ' + cls + '">' + STATUS_LABEL[st] + "</span>";
  }

  function locationText(c) {
    if (c.location_type === "IN_COMMUNE" && c.hamlet_id) {
      const h = hamletById(c.hamlet_id);
      return h ? h.name + " (" + h.code + ")" : "—";
    }
    if (c.location_type === "UNKNOWN_HAMLET") return "Chưa rõ ấp · Đông Thạnh";
    return c.external_locality_name || "Ngoài xã";
  }

  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2800);
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function pageHeader(title, desc, actionsHtml) {
    return (
      '<div class="heading"><div><div class="eyebrow">HỆ THỐNG GIÁM SÁT DỊCH BỆNH · TYT ĐÔNG THẠNH</div><h1>' +
      esc(title) +
      "</h1>" +
      (desc ? '<p class="sub">' + desc + "</p>" : "") +
      "</div>" +
      (actionsHtml ? '<div class="actions">' + actionsHtml + "</div>" : "") +
      "</div>"
    );
  }

  function metricCard(label, value, foot, tint) {
    return (
      '<div class="card metric" style="--tint:' +
      (tint || "#2764ad") +
      '"><div class="label">' +
      esc(label) +
      '</div><div class="value">' +
      esc(value) +
      '</div><div class="foot">' +
      esc(foot) +
      "</div></div>"
    );
  }

  function showModal(title, bodyHtml, onConfirm, confirmLabel) {
    const root = document.getElementById("modal-root");
    if (!root) return;
    root.innerHTML =
      '<div class="modal-bg" role="dialog" aria-modal="true"><div class="modal-panel"><h3>' +
      esc(title) +
      "</h3>" +
      bodyHtml +
      '<div class="modal-actions"><button type="button" class="btn btn-secondary btn-sm" id="modal-cancel">Hủy</button><button type="button" class="btn btn-primary btn-sm" id="modal-confirm">' +
      esc(confirmLabel || "Xác nhận") +
      "</button></div></div></div>";
    const close = () => {
      root.innerHTML = "";
    };
    root.querySelector("#modal-cancel").addEventListener("click", close);
    root.querySelector(".modal-bg").addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-bg")) close();
    });
    root.querySelector("#modal-confirm").addEventListener("click", () => {
      if (onConfirm && onConfirm() === false) return;
      close();
    });
  }

  function closeModal() {
    const root = document.getElementById("modal-root");
    if (root) root.innerHTML = "";
  }

  function demoUserForRole(role) {
    if (role === ROLES.NVYT) {
      return (
        users.find((u) => u.username === "nvyt.le" && u.is_active) ||
        users.find((u) => u.role === ROLES.NVYT && u.is_active)
      );
    }
    const idMap = {
      [ROLES.ROOT]: "u-root",
      [ROLES.ADMIN]: "u-admin",
      [ROLES.MANAGER]: "u-mgr",
      [ROLES.BOD]: "u-bod",
    };
    return users.find((u) => u.id === idMap[role] && u.is_active);
  }

  function switchDemoRole(role) {
    const u = demoUserForRole(role);
    if (!u) {
      toast("Không tìm thấy user demo cho vai trò " + role);
      return;
    }
    state.user = u;
    state.route = u.role === ROLES.NVYT ? "dashboard-nvyt" : "dashboard";
    state.selectedCaseId = null;
    pushAudit("DEMO_ROLE_SWITCH", "session", u.id, null, { role });
    render();
    toast("Vai trò demo: " + role + " · " + u.full_name);
  }

  function syncDemoRolePicker() {
    const sel = document.getElementById("demo-role-picker");
    if (!sel) return;
    if (!state.user) {
      sel.classList.add("hidden");
      return;
    }
    sel.classList.remove("hidden");
    if (!sel.dataset.bound) {
      sel.dataset.bound = "1";
      [ROLES.ROOT, ROLES.ADMIN, ROLES.NVYT, ROLES.MANAGER, ROLES.BOD].forEach((r) => {
        const o = document.createElement("option");
        o.value = r;
        o.textContent = r;
        sel.appendChild(o);
      });
      sel.addEventListener("change", () => switchDemoRole(sel.value));
    }
    if (sel.value !== state.user.role) sel.value = state.user.role;
  }

  function resetDemo() {
    if (
      !window.confirm(
        "Khôi phục dữ liệu demo? Trang sẽ tải lại — giữ danh mục 52 ấp/PCD từ catalog-data.js."
      )
    ) {
      return;
    }
    location.reload();
  }

  function filterCasesBySearch(list, q) {
    const needle = (q || "").trim().toLowerCase();
    if (!needle) return list;
    return list.filter((c) => {
      const dis = diseaseById(c.disease_type_id);
      const blob = [
        c.case_code,
        c.patient_code,
        c.patient_name,
        dis ? dis.name : "",
        locationText(c),
      ]
        .join(" ")
        .toLowerCase();
      return blob.includes(needle);
    });
  }

  function exportVisibleCasesCsv() {
    const u = state.user;
    if (!u) return;
    let filtered = visibleCases(u);
    const page = document.getElementById("page-reports");
    if (page) {
      const st = page.querySelector("#f-status");
      const sla = page.querySelector("#f-sla");
      const jur = page.querySelector("#f-jur");
      if (st && st.value) filtered = filtered.filter((c) => c.status === st.value);
      if (sla && sla.value) filtered = filtered.filter((c) => c.sla_alert === sla.value);
      if (jur && jur.value) filtered = filtered.filter((c) => c.location_type === jur.value);
    }
    const header = ["case_code", "patient_code", "patient_name", "status", "location_type", "hamlet", "received_at", "sla_alert"];
    const lines = [header.join(",")];
    filtered.forEach((c) => {
      const h = c.hamlet_id ? hamletById(c.hamlet_id) : null;
      const row = [
        c.case_code,
        c.patient_code || "",
        c.patient_name || "",
        c.status,
        c.location_type,
        h ? h.name : "",
        c.received_at || "",
        c.sla_alert,
      ].map((cell) => '"' + String(cell).replace(/"/g, '""') + '"');
      lines.push(row.join(","));
    });
    const blob = new Blob(["\ufeff" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "tyt-cases-demo-" + new Date().toISOString().slice(0, 10) + ".csv";
    a.click();
    URL.revokeObjectURL(a.href);
    toast("Đã xuất " + filtered.length + " ca (CSV mock)");
  }

  function catalogSourceBanner() {
    if (!catalogMeta) return "";
    return (
      '<div class="note-box"><strong>52 ấp / trưởng ấp:</strong> ' +
      catalogMeta.hamlets_source +
      "<br><strong>Phân công PCD:</strong> " +
      catalogMeta.pcd_source +
      " · cập nhật " +
      (catalogMeta.updated || "") +
      "</div>"
    );
  }

  function catalogNav(active) {
    const tabs = [
      { id: "users", label: "Tài khoản" },
      { id: "hamlets", label: "Ấp" },
      { id: "assignments", label: "Phân công" },
    ];
    let html = '<div class="catalog-nav tabs">';
    tabs.forEach((t) => {
      html +=
        '<button type="button" class="tab' +
        (active === t.id ? " active" : "") +
        '" data-catalog-route="' +
        t.id +
        '">' +
        t.label +
        "</button>";
    });
    return html + "</div>";
  }

  function bindCatalogNav(root) {
    if (!root) return;
    root.querySelectorAll("[data-catalog-route]").forEach((btn) => {
      btn.addEventListener("click", () => navigate(btn.getAttribute("data-catalog-route")));
    });
  }

  function hamletLabelsForUser(userId) {
    const names = userHamletAssignments
      .filter((a) => a.user_id === userId && !a.revoked_at)
      .map((a) => {
        const h = hamletById(a.hamlet_id);
        return h ? h.name : null;
      })
      .filter(Boolean);
    return names.length ? names.join(", ") : "—";
  }

  function assignableRoles(viewerRole) {
    const all = [ROLES.NVYT, ROLES.ADMIN, ROLES.MANAGER, ROLES.BOD];
    if (viewerRole === ROLES.ROOT) return [ROLES.NVYT, ROLES.ADMIN, ROLES.MANAGER, ROLES.BOD];
    return all.filter((r) => r !== ROLES.ADMIN || viewerRole === ROLES.ROOT);
  }

  function navigate(route, caseId) {
    state.route = String(route || "dashboard").trim();
    if (caseId !== undefined) state.selectedCaseId = caseId;
    render();
  }

  function setBreadcrumb(text) {
    const el = document.getElementById("topbar-breadcrumb");
    if (el) el.innerHTML = text;
  }

  function buildNav() {
    const u = state.user;
    if (!u) return;
    const nav = document.getElementById("sb-nav");
    const items = [];

    const add = (id, label, icon, section) => {
      items.push({ id, label, icon, section });
    };

    if (u.role === ROLES.NVYT) {
      add("dashboard-nvyt", "Dashboard NVYT", "◉", "Giám sát");
    } else {
      add("dashboard", "Dashboard toàn trạm", "◉", "Giám sát");
    }
    add("cases", "Danh sách ca bệnh", "▤", "Nghiệp vụ");
    add("history", "Lịch sử ca", "◷", "Nghiệp vụ");
    if (isAdminLike(u.role)) {
      add("classify-queue", "Phân loại địa bàn", "◎", "Nghiệp vụ");
      add("unassigned", "Ca chưa có người chính", "○", "Nghiệp vụ");
      add("create-case", "Tạo ca thủ công", "+", "Nghiệp vụ");
      add("import", "Import Excel", "↑", "Nghiệp vụ");
    }
    if (state.selectedCaseId && canViewCase(cases.find((x) => x.id === state.selectedCaseId), u)) {
      add("case-detail", "Chi tiết ca", "→", "Đang xem");
    }
    if (isAdminLike(u.role)) {
      add("users", "Tài khoản", "☺", "Danh mục");
      add("hamlets", "Ấp", "⌂", "Danh mục");
      add("assignments", "Phân công", "⊕", "Danh mục");
      add("audit", "Audit log", "≡", "Quản trị");
    }
    if (isAdminLike(u.role) || isReadOnlyRole(u.role)) {
      add("reports", "Báo cáo & xuất", "⎙", "Báo cáo");
    }
    add("notifications", "Thông báo", "◔", "Hệ thống");
    if (u.role === ROLES.ROOT) {
      add("root-config", "Cấu hình ROOT", "⚙", "Hệ thống");
    }

    let html = "";
    let lastSection = "";
    items.forEach((it) => {
      if (it.section !== lastSection) {
        html += '<div class="sb-section">' + it.section + "</div>";
        lastSection = it.section;
      }
      const active = state.route === it.id ? " active" : "";
      let badge = "";
      if (it.id === "classify-queue" && isAdminLike(u.role)) {
        const n = cases.filter(
          (c) => c.location_type === "UNKNOWN_HAMLET" || c.location_type === "OUTSIDE_COMMUNE"
        ).length;
        if (n) badge = '<span class="badge">' + n + "</span>";
      }
      if (it.id === "dashboard-nvyt") {
        const overdue = myCases(u).filter((c) => c.sla_alert === "PROCESSING_OVERDUE").length;
        if (overdue) badge = '<span class="badge">' + overdue + "</span>";
      }
      html +=
        '<button type="button" class="nav-item' +
        active +
        '" data-route="' +
        it.id +
        '"><span class="nav-dot" aria-hidden="true"></span><span class="nav-label">' +
        esc(it.label) +
        "</span>" +
        badge +
        "</button>";
    });
    nav.innerHTML = html;
    nav.querySelectorAll("[data-route]").forEach((btn) => {
      btn.addEventListener("click", () => {
        navigate(btn.getAttribute("data-route"));
        closeMobileSidebar();
      });
    });

    document.getElementById("sb-user-name").textContent = u.full_name;
    document.getElementById("sb-user-role").textContent = u.role;
  }

  function dashboardSummary(all) {
    const now = getNow();
    const enriched = all.map((c) => enrichCase(c));
    const slaCounts = { VERIFICATION_DUE_SOON: 0, PROCESSING_DUE_SOON: 0, PROCESSING_OVERDUE: 0 };
    enriched.forEach((c) => {
      if (c.sla_alert !== "NONE") slaCounts[c.sla_alert]++;
    });
    const resolved = enriched.filter((c) => c.status === "RESOLVED");
    let onTime = 0;
    resolved.forEach((c) => {
      const [y, m, d] = slaCycleStartDate(c).split("-").map(Number);
      const due = vnDateTime(y, m, d + 3, 0, 0);
      if (c.resolved_at && new Date(c.resolved_at) < due) onTime++;
    });
    const onTimePct = resolved.length ? Math.round((onTime / resolved.length) * 100) : null;

    return {
      total: enriched.length,
      verifying: enriched.filter((c) => c.status === "VERIFYING").length,
      verified: enriched.filter((c) => c.status === "VERIFIED").length,
      resolved: resolved.length,
      unknown: enriched.filter((c) => c.location_type === "UNKNOWN_HAMLET").length,
      outside: enriched.filter((c) => c.location_type === "OUTSIDE_COMMUNE").length,
      slaCounts,
      onTimePct,
      byHamlet: groupByHamlet(enriched),
      byDisease: groupByDisease(enriched),
      alerts: enriched.filter((c) => c.sla_alert !== "NONE").sort((a, b) => slaCycleStartDate(b).localeCompare(slaCycleStartDate(a))),
    };
  }

  function groupByHamlet(list) {
    const m = {};
    list.forEach((c) => {
      let key;
      if (c.location_type === "UNKNOWN_HAMLET") key = "__unknown__";
      else if (c.location_type === "OUTSIDE_COMMUNE") key = "__outside__";
      else key = c.hamlet_id || "__unknown__";
      m[key] = (m[key] || 0) + 1;
    });
    return m;
  }

  function groupByDisease(list) {
    const m = {};
    list.forEach((c) => {
      m[c.disease_type_id] = (m[c.disease_type_id] || 0) + 1;
    });
    return m;
  }

  function renderCaseTable(list, opts) {
    opts = opts || {};
    const readonly = opts.readonly;
    const rich = opts.rich;
    const rows = list
      .map((c) => {
        const dis = diseaseById(c.disease_type_id);
        const patientCell = rich
          ? "<b>" + esc(c.patient_name || "—") + '</b><br><span class="muted mini">' + esc(c.patient_code || "") + "</span>"
          : esc(c.patient_code || "—");
        const caseCell = rich
          ? "<b>" + esc(c.case_code) + "</b>" + (dis ? '<span class="tag">' + esc(dis.code) + "</span>" : "")
          : "<b>" + esc(c.case_code) + "</b>";
        return (
          "<tr data-case-id=\"" +
          c.id +
          "\"><td>" +
          caseCell +
          "</td><td>" +
          patientCell +
          "</td><td>" +
          (dis ? esc(dis.name) : "—") +
          "</td><td>" +
          formatReceivedAt(c) +
          "</td><td>" +
          esc(locationText(c)) +
          "</td><td>" +
          statusChip(c.status) +
          " " +
          lostChip(c) +
          "</td><td>" +
          slaChip(c.sla_alert) +
          "</td></tr>"
        );
      })
      .join("");
    const cls = readonly ? "data readonly" : "data";
    return (
      '<table class="' +
      cls +
      '"><thead><tr><th>Mã ca</th><th>Mã BN</th><th>Loại bệnh</th><th>received_at</th><th>Địa bàn</th><th>Trạng thái</th><th>SLA</th></tr></thead><tbody>' +
      (rows || '<tr><td colspan="7" class="empty">Không có ca</td></tr>') +
      "</tbody></table>"
    );
  }

  function bindCaseRows(container) {
    if (!container) return;
    container.querySelectorAll("tr[data-case-id]").forEach((tr) => {
      tr.addEventListener("click", () => navigate("case-detail", tr.getAttribute("data-case-id")));
    });
  }

  function renderNvytDashboard() {
    const u = state.user;
    const list = myCases(u);
    const s = dashboardSummary(list);
    setBreadcrumb("Giám sát / <b>Dashboard NVYT</b>");
    document.getElementById("topbar-title").textContent = "Dashboard NVYT";

    const todo = list.filter((c) => c.status === "VERIFYING" || c.status === "VERIFIED");
    const kpi =
      '<div class="kpi-grid">' +
      kpiCell(todo.filter((c) => c.status === "VERIFYING").length, "Cần xác minh", "highlight") +
      kpiCell(todo.filter((c) => c.status === "VERIFIED").length, "Cần xử lý", "highlight") +
      kpiCell(s.slaCounts.VERIFICATION_DUE_SOON + s.slaCounts.PROCESSING_DUE_SOON, "Sắp trễ SLA", "alert-amber") +
      kpiCell(s.slaCounts.PROCESSING_OVERDUE, "Quá hạn", "alert-red") +
      "</div>";

    document.getElementById("page-dashboard-nvyt").innerHTML =
      pageHeader("Dashboard NVYT", "Chỉ ca thuộc ấp được phân công và ca hỗ trợ — không lộ ngoài xã / chưa rõ ấp (S03).") +
      '<div class="note-box">NVYT <strong>không được tạo ca</strong> và không thấy hàng chờ phân loại toàn trạm (V1.6).</div>' +
      kpi +
      '<div class="card"><h3>Việc ưu tiên</h3>' +
      renderCaseTable(todo.slice(0, 12)) +
      "</div>";
    bindCaseRows(document.getElementById("page-dashboard-nvyt"));
  }

  function renderDashboard() {
    const u = state.user;
    const all = visibleCases(u);
    const s = dashboardSummary(all);
    setBreadcrumb("Giám sát / <b>Dashboard toàn trạm</b>");
    document.getElementById("topbar-title").textContent = "Dashboard toàn trạm";
    const readOnlyNote = isReadOnlyRole(u.role)
      ? '<div class="warn-box">Chế độ <strong>chỉ đọc</strong> — Manager/BOD không gọi API ghi (S02).</div>'
      : "";

    let kpi =
      '<div class="kpi-grid">' +
      kpiCell(s.total, "Tổng ca") +
      kpiCell(s.verifying, "Đang xác minh") +
      kpiCell(s.verified, "Đã xác minh") +
      kpiCell(s.resolved, "Đã xử lý") +
      kpiCell(s.slaCounts.VERIFICATION_DUE_SOON, "Sắp trễ xác minh", "alert-amber") +
      kpiCell(s.slaCounts.PROCESSING_DUE_SOON, "Sắp trễ xử lý", "alert-amber") +
      kpiCell(s.slaCounts.PROCESSING_OVERDUE, "Quá hạn xử lý", "alert-red") +
      kpiCell(s.onTimePct != null ? s.onTimePct + "%" : "—", "Xử lý đúng hạn") +
      kpiCell(s.unknown, "Chưa rõ ấp") +
      kpiCell(s.outside, "Ngoài xã") +
      "</div>";

    const maxH = Math.max(...Object.values(s.byHamlet), 1);
    let bars = "";
    Object.keys(s.byHamlet).forEach((key) => {
      let label;
      if (key === "__unknown__") label = "Chưa rõ ấp";
      else if (key === "__outside__") label = "Ngoài xã";
      else {
        const h = hamletById(key);
        label = h ? h.name : key;
      }
      const n = s.byHamlet[key];
      bars +=
        '<div class="bar-row"><span>' +
        label +
        '</span><div class="bar-track"><div class="bar-fill" style="width:' +
        (n / maxH) * 100 +
        '%"></div></div><b>' +
        n +
        "</b></div>";
    });

    let alertRows = s.alerts
      .slice(0, 8)
      .map(
        (c) =>
          "<tr data-case-id=\"" +
          c.id +
          "\"><td>" +
          c.case_code +
          "</td><td>" +
          formatReceivedAt(c) +
          "</td><td>" +
          statusChip(c.status) +
          "</td><td>" +
          slaChip(c.sla_alert) +
          "</td></tr>"
      )
      .join("");

    const hero =
      '<div class="hero"><div><h2>Chào mừng, ' +
      esc(u.full_name) +
      "</h2><p>" +
      (isReadOnlyRole(u.role) ? "Chế độ chỉ đọc · " : "") +
      "Demo V1.6 · 52 ấp & PCD từ Excel · múi giờ VN</p></div></div>";
    const metrics =
      '<div class="metrics">' +
      metricCard("Tổng ca", s.total, "Trong phạm vi vai trò", "#2764ad") +
      metricCard("Đang xác minh", s.verifying, "VERIFYING", "#6366f1") +
      metricCard("Cảnh báo SLA", s.slaCounts.PROCESSING_OVERDUE + s.slaCounts.PROCESSING_DUE_SOON + s.slaCounts.VERIFICATION_DUE_SOON, "Sắp trễ / quá hạn", "#d97706") +
      metricCard("Xử lý đúng hạn", s.onTimePct != null ? s.onTimePct + "%" : "—", "RESOLVED trong cycle", "#059669") +
      "</div>";

    document.getElementById("page-dashboard").innerHTML =
      pageHeader("Dashboard toàn trạm", "KPI tổng ca, theo ấp, bệnh, trạng thái và cảnh báo SLA — GET /dashboard/overview") +
      hero +
      metrics +
      readOnlyNote +
      kpi +
      '<div class="grid-2">' +
      '<div class="card"><h3>Theo ấp / địa bàn</h3><div class="bar-chart">' +
      bars +
      "</div></div>" +
      '<div class="card"><h3>Theo loại bệnh</h3>' +
      renderDiseaseBars(s.byDisease) +
      "</div></div>" +
      '<div class="card"><h3>Cảnh báo SLA</h3><table class="data"><thead><tr><th>Mã ca</th><th>Tiếp nhận</th><th>Trạng thái</th><th>Cảnh báo</th></tr></thead><tbody>' +
      (alertRows || '<tr><td colspan="4">Không có cảnh báo</td></tr>') +
      "</tbody></table></div>";

    bindCaseRows(document.getElementById("page-dashboard"));
  }

  function kpiCell(val, label, extra) {
    return '<div class="kpi ' + (extra || "") + '"><b>' + val + "</b><small>" + label + "</small></div>";
  }

  function renderDiseaseBars(byDisease) {
    const max = Math.max(...Object.values(byDisease), 1);
    return Object.keys(byDisease)
      .map((id) => {
        const d = diseaseById(id);
        const n = byDisease[id];
        return (
          '<div class="bar-row"><span>' +
          (d ? d.code : id) +
          '</span><div class="bar-track"><div class="bar-fill" style="width:' +
          (n / max) * 100 +
          '%"></div></div><b>' +
          n +
          "</b></div>"
        );
      })
      .join("");
  }

  function renderCaseListPage(pageId, list, title, readonly, desc) {
    document.getElementById("topbar-title").textContent = title;
    setBreadcrumb("Nghiệp vụ / <b>" + title + "</b>");
    const html =
      pageHeader(title, desc || "GET /cases — lọc theo scope vai trò · phân trang trên production") +
      '<div class="card"><div class="toolbar">' +
      '<div class="search-wrap"><input type="search" id="f-search" placeholder="Tìm mã ca, BN, bệnh, địa bàn…" value="' +
      esc(state.caseSearchQuery) +
      '"></div>' +
      filterFields() +
      '</div><div id="case-table-wrap">' +
      renderCaseTable(filterCasesBySearch(list, state.caseSearchQuery), { readonly, rich: true }) +
      "</div></div>";
    document.getElementById(pageId).innerHTML = html;
    bindCaseRows(document.getElementById(pageId));
    bindFilters(pageId, list, readonly);
  }

  function filterFields() {
    return (
      '<div class="field"><label>Trạng thái</label><select id="f-status"><option value="">Tất cả</option><option>VERIFYING</option><option>VERIFIED</option><option>RESOLVED</option></select></div>' +
      '<div class="field"><label>SLA</label><select id="f-sla"><option value="">Tất cả</option><option>VERIFICATION_DUE_SOON</option><option>PROCESSING_DUE_SOON</option><option>PROCESSING_OVERDUE</option></select></div>' +
      '<div class="field"><label>Địa bàn</label><select id="f-jur"><option value="">Tất cả</option><option>IN_COMMUNE</option><option>UNKNOWN_HAMLET</option><option>OUTSIDE_COMMUNE</option></select></div>'
    );
  }

  function bindFilters(pageId, list, readonly) {
    const page = document.getElementById(pageId);
    const apply = () => {
      let filtered = list.slice();
      const st = page.querySelector("#f-status").value;
      const sla = page.querySelector("#f-sla").value;
      const jur = page.querySelector("#f-jur").value;
      const searchEl = page.querySelector("#f-search");
      if (searchEl) state.caseSearchQuery = searchEl.value;
      if (st) filtered = filtered.filter((c) => c.status === st);
      if (sla) filtered = filtered.filter((c) => c.sla_alert === sla);
      if (jur) filtered = filtered.filter((c) => c.location_type === jur);
      filtered = filterCasesBySearch(filtered, state.caseSearchQuery);
      page.querySelector("#case-table-wrap").innerHTML = renderCaseTable(filtered, { readonly, rich: true });
      bindCaseRows(page);
    };
    ["#f-status", "#f-sla", "#f-jur"].forEach((sel) => {
      const el = page.querySelector(sel);
      if (el) el.addEventListener("change", apply);
    });
    const searchEl = page.querySelector("#f-search");
    if (searchEl) {
      searchEl.addEventListener("input", apply);
    }
  }

  function renderCreateCase() {
    if (!canCreateCase(state.user)) {
      document.getElementById("page-create-case").innerHTML =
        '<div class="empty">403 — Chỉ Root/Admin được tạo ca (V1.6)</div>';
      return;
    }
    document.getElementById("topbar-title").textContent = "Tạo ca thủ công";
    setBreadcrumb("Nghiệp vụ / <b>Tạo ca</b>");
    const hamletOpts = hamlets.map((h) => '<option value="' + h.id + '">' + h.name + "</option>").join("");
    const disOpts = diseaseTypes.map((d) => '<option value="' + d.id + '">' + d.name + "</option>").join("");
    document.getElementById("page-create-case").innerHTML =
      pageHeader("Tạo ca thủ công", "POST /cases — received_at do backend ghi · mặc định VERIFYING (S06)") +
      '<div class="card"><form id="form-create-case">' +
      '<div class="note-box">Ngày bệnh viện / trạng thái báo cáo nguồn (nếu có) là thông tin tham khảo — <strong>không</strong> dùng tính SLA.</div>' +
      '<div class="grid-2">' +
      '<div><label>Mã bệnh nhân</label><input name="patient_code" placeholder="BN-..." required></div>' +
      '<div><label>Tên bệnh nhân (nhạy cảm)</label><input name="patient_name" placeholder="Họ tên"></div>' +
      '<div><label>Loại bệnh</label><select name="disease_type_id" required>' +
      disOpts +
      "</select></div>" +
      '<div><label>Ngày BV (nguồn, tùy chọn)</label><input type="date" name="source_reported_at"></div>' +
      "</div>" +
      '<label>Phân loại địa bàn</label><select name="location_type" id="jur-select"><option value="IN_COMMUNE">IN_COMMUNE — biết ấp</option><option value="UNKNOWN_HAMLET">UNKNOWN_HAMLET — chưa rõ ấp</option><option value="OUTSIDE_COMMUNE">OUTSIDE_COMMUNE — ngoài xã</option></select>' +
      '<div id="field-hamlet"><label>Ấp (bắt buộc khi IN_COMMUNE)</label><select name="hamlet_id"><option value="">— Chọn ấp —</option>' +
      hamletOpts +
      "</select></div>" +
      '<div id="field-external" class="hidden"><label>Tên xã/phường ngoài xã</label><input name="external_locality_name" placeholder="Bắt buộc với OUTSIDE_COMMUNE"></div>' +
      '<label>Ghi chú vị trí</label><textarea name="location_note" placeholder="Tùy chọn"></textarea>' +
      '<button type="submit" class="btn btn-primary">Tạo ca · received_at = now (server)</button>' +
      "</form></div>";

    const form = document.getElementById("form-create-case");
    const jurSelect = document.getElementById("jur-select");
    const toggleJur = () => {
      const v = jurSelect.value;
      document.getElementById("field-hamlet").classList.toggle("hidden", v !== "IN_COMMUNE");
      document.getElementById("field-external").classList.toggle("hidden", v !== "OUTSIDE_COMMUNE");
    };
    jurSelect.addEventListener("change", toggleJur);
    toggleJur();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const jur = fd.get("location_type");
      const hamletId = fd.get("hamlet_id") || null;
      const ext = fd.get("external_locality_name") || null;
      if (jur === "IN_COMMUNE" && !hamletId) {
        toast("IN_COMMUNE: hamlet_id bắt buộc");
        return;
      }
      if (jur === "OUTSIDE_COMMUNE" && !ext) {
        toast("OUTSIDE_COMMUNE: external_locality_name bắt buộc");
        return;
      }
      const id = "c" + Date.now();
      const code = "DT-2026-" + String(Math.floor(Math.random() * 9000) + 1000);
      const receivedAt = getNow().toISOString();
      const nc = normalizeCase({
        id,
        case_code: code,
        patient_code: fd.get("patient_code"),
        patient_name: fd.get("patient_name"),
        disease_type_id: fd.get("disease_type_id"),
        source_reported_at: fd.get("source_reported_at") || null,
        received_at: receivedAt,
        location_type: jur,
        hamlet_id: jur === "IN_COMMUNE" ? hamletId : null,
        external_locality_name: jur === "OUTSIDE_COMMUNE" ? ext : null,
        location_note: fd.get("location_note") || null,
        primary_user_id: null,
        status: "VERIFYING",
        verified_at: null,
        resolved_at: null,
        created_by: state.user.id,
        version: 1,
        is_lost_to_followup: false,
      });
      cases.unshift(nc);
      pushAudit("CASE_CREATE", "case", id, null, { case_code: code, received_at: receivedAt });
      toast("Đã tạo ca " + code);
      navigate("case-detail", id);
    });
  }

  function renderCaseDetail() {
    const u = state.user;
    const raw = cases.find((c) => c.id === state.selectedCaseId);
    if (!raw || !canViewCase(raw, u)) {
      document.getElementById("page-case-detail").innerHTML =
        '<div class="empty">403 — Không có quyền hoặc ca không tồn tại</div>';
      return;
    }
    const c = enrichCase(raw);
    const editable = canEditCase(raw, u);
    document.getElementById("topbar-title").textContent = c.case_code;
    setBreadcrumb("Nghiệp vụ / <b>" + c.case_code + "</b>");

    const tabs = ["info", "status", "transfer", "support", "history"];
    const tabLabels = {
      info: "Thông tin",
      status: "Trạng thái",
      transfer: "Chuyển địa bàn",
      support: "Hỗ trợ",
      history: "Lịch sử",
    };
    let tabHtml = '<div class="tabs">';
    tabs.forEach((t) => {
      tabHtml +=
        '<button type="button" class="tab' +
        (state.detailTab === t ? " active" : "") +
        '" data-tab="' +
        t +
        '">' +
        tabLabels[t] +
        "</button>";
    });
    tabHtml += "</div>";

    const pri = c.primary_user_id ? userById(c.primary_user_id) : null;
    const dis = diseaseById(c.disease_type_id);
    const supporters = caseSupport
      .filter((s) => s.case_id === c.id && !s.revoked_at)
      .map((s) => userById(s.user_id))
      .filter(Boolean);

    let panels = "";
    panels +=
      '<div class="tab-panel' +
      (state.detailTab === "info" ? " active" : "") +
      '" data-panel="info"><dl class="dl">' +
      dt("Mã ca", c.case_code) +
      dt("Mã BN", c.patient_code) +
      dt("Tên BN", c.patient_name) +
      dt("Loại bệnh", dis ? dis.name : "—") +
      dt("received_at", formatReceivedAt(c) + " <span class=\"muted\">(không reset)</span>") +
      dt("Chu kỳ SLA", "Cycle #" + (activeSlaCycle(c)?.cycle_number || 1) + " · bắt đầu " + formatReceivedAt({ received_at: activeSlaCycle(c)?.started_at })) +
      dt("Địa bàn", locationText(c) + ' <span class="chip jur">' + LOCATION_LABEL[c.location_type] + "</span> " + lostChip(c)) +
      dt("SLA (tính động)", slaChip(c.sla_alert)) +
      dt("Trạng thái", statusChip(c.status)) +
      dt("Phụ trách chính (nullable)", pri ? pri.full_name : "— · quyền theo ấp, không auto-chọn NVYT") +
      dt("Người hỗ trợ", supporters.map((x) => x.full_name).join(", ") || "—") +
      dt("Version", String(c.version)) +
      "</dl>" +
      (editable
        ? '<button type="button" class="btn btn-secondary btn-sm" id="btn-save-notes">Lưu ghi chú (PATCH)</button>'
        : "") +
      "</div>";

    panels +=
      '<div class="tab-panel' +
      (state.detailTab === "status" ? " active" : "") +
      '" data-panel="status">' +
      '<p>Chuyển trạng thái <strong>hai chiều</strong> (V1.6) — POST <code>/cases/{id}/status</code> · audit mỗi lần.</p>';
    if (editable && !isReadOnlyRole(u.role)) {
      const next = {
        VERIFYING: ["VERIFIED"],
        VERIFIED: ["VERIFYING", "RESOLVED"],
        RESOLVED: ["VERIFIED"],
      };
      (next[c.status] || []).forEach((st) => {
        panels += '<button class="btn btn-primary btn-sm" data-next="' + st + '">→ ' + STATUS_LABEL[st] + "</button> ";
      });
      if (c.status === "RESOLVED") panels += '<p class="muted">Đổi lùi RESOLVED → VERIFIED mở lại ca quá hạn theo cycle hiện tại.</p>';
    } else {
      panels += "<p class=\"muted\">Chỉ xem — không đổi trạng thái.</p>";
    }
    panels += "</div>";

    panels +=
      '<div class="tab-panel' +
      (state.detailTab === "transfer" ? " active" : "") +
      '" data-panel="transfer">';
    if (editable && (u.role === ROLES.NVYT || isAdminLike(u.role))) {
      panels +=
        '<p>POST <code>/cases/{id}/transfer</code> — transaction, thu hồi quyền người chuyển (NVYT).</p>' +
        '<label>Loại địa bàn đích</label><select id="transfer-jur"><option value="IN_COMMUNE">IN_COMMUNE</option><option value="UNKNOWN_HAMLET">UNKNOWN_HAMLET</option><option value="OUTSIDE_COMMUNE">OUTSIDE_COMMUNE</option></select>' +
        '<div id="transfer-hamlet"><label>Ấp đích</label><select id="transfer-hamlet-id">' +
        hamlets.map((h) => '<option value="' + h.id + '">' + h.name + "</option>").join("") +
        "</select></div>" +
        '<div id="transfer-ext" class="hidden"><label>Tên ngoài xã</label><input id="transfer-ext-name"></div>' +
        '<label>Lý do</label><textarea id="transfer-reason"></textarea>' +
        '<button type="button" class="btn btn-primary" id="btn-transfer">Chuyển địa bàn</button>';
    } else {
      panels += "<p class=\"muted\">Không có quyền chuyển địa bàn.</p>";
    }
    panels += "</div>";

    panels +=
      '<div class="tab-panel' +
      (state.detailTab === "support" ? " active" : "") +
      '" data-panel="support">';
    if (editable && !isReadOnlyRole(u.role)) {
      const nvytOpts = users
        .filter((x) => x.role === ROLES.NVYT && x.is_active)
        .map((x) => '<option value="' + x.id + '">' + x.full_name + "</option>")
        .join("");
      panels +=
        "<p>Thêm/thu hồi người hỗ trợ — <strong>lý do bắt buộc</strong> (S12).</p>" +
        '<label>NVYT</label><select id="support-user">' +
        nvytOpts +
        '</select><label>Lý do cấp quyền</label><input id="support-reason" placeholder="Bắt buộc">' +
        '<button type="button" class="btn btn-secondary btn-sm" id="btn-add-support">Thêm hỗ trợ</button>' +
        "<ul>" +
        supporters.map((s) => "<li>" + s.full_name + ' <button type="button" class="btn btn-danger btn-sm" data-revoke="' + s.id + '">Thu hồi</button></li>').join("") +
        "</ul>";
    } else {
      panels += "<p>Danh sách hỗ trợ: " + (supporters.map((s) => s.full_name).join(", ") || "—") + "</p>";
    }
    panels += "</div>";

    const caseTransfers = transfers.filter((t) => t.case_id === c.id);
    let hist = caseTransfers
      .map(
        (t) =>
          '<div class="timeline-item"><time>' +
          new Date(t.transferred_at).toLocaleString("vi-VN") +
          "</time><p><b>Chuyển địa bàn</b> — " +
          t.reason +
          " (bởi " +
          (userById(t.transferred_by)?.full_name || "?") +
          ")</p></div>"
      )
      .join("");
    hist +=
      auditLogs
        .filter((a) => a.entity_id === c.id)
        .map(
          (a) =>
            '<div class="timeline-item"><time>' +
            new Date(a.created_at).toLocaleString("vi-VN") +
            "</time><p>" +
            a.action +
            " — " +
            (userById(a.actor_id)?.full_name || "?") +
            "</p></div>"
        )
        .join("");

    panels +=
      '<div class="tab-panel' +
      (state.detailTab === "history" ? " active" : "") +
      '" data-panel="history">' +
      (hist || "<p class=\"muted\">Chưa có lịch sử.</p>") +
      "</div>";

    let sideActions = "";
    if (editable && !isReadOnlyRole(u.role)) {
      sideActions +=
        '<button type="button" class="btn btn-secondary btn-sm" id="btn-quick-transfer">Chuyển địa bàn…</button>' +
        '<button type="button" class="btn btn-secondary btn-sm" id="btn-quick-lost">' +
        (c.is_lost_to_followup ? "Bỏ đánh dấu mất dấu" : "Đánh dấu mất dấu") +
        "</button>";
    }
    sideActions += '<button type="button" class="btn btn-ghost btn-sm" id="btn-back-cases">← Danh sách ca</button>';

    document.getElementById("page-case-detail").innerHTML =
      pageHeader(c.case_code, esc(c.patient_name || "") + " · " + locationText(c)) +
      '<div class="detail-header"><div><h3>' +
      esc(c.case_code) +
      "</h3><p class=\"muted\">" +
      esc(c.patient_name || "") +
      "</p></div><div>" +
      slaChip(c.sla_alert) +
      " " +
      statusChip(c.status) +
      " " +
      lostChip(c) +
      '</div></div><div class="detail-grid"><div class="card">' +
      tabHtml +
      panels +
      '</div><div class="card detail-side"><h4>Thao tác nhanh</h4>' +
      sideActions +
      '<p class="muted mini" style="margin-top:12px">Tham chiếu UI panel trượt · modals trong bản All Roles.</p></div></div>';

    document.querySelectorAll(".tab[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.detailTab = btn.getAttribute("data-tab");
        renderCaseDetail();
      });
    });

    document.querySelectorAll("[data-next]").forEach((btn) => {
      btn.addEventListener("click", () => changeStatus(c.id, btn.getAttribute("data-next")));
    });

    const transferJur = document.getElementById("transfer-jur");
    if (transferJur) {
      const syncTransferFields = () => {
        const v = transferJur.value;
        document.getElementById("transfer-hamlet").classList.toggle("hidden", v !== "IN_COMMUNE");
        document.getElementById("transfer-ext").classList.toggle("hidden", v !== "OUTSIDE_COMMUNE");
      };
      transferJur.addEventListener("change", syncTransferFields);
      syncTransferFields();
      document.getElementById("btn-transfer").addEventListener("click", () => openTransferModal(c.id));
    }

    const addSup = document.getElementById("btn-add-support");
    if (addSup) {
      addSup.addEventListener("click", () => {
        const uid = document.getElementById("support-user").value;
        const reason = (document.getElementById("support-reason").value || "").trim();
        if (!reason) {
          toast("Lý do cấp quyền hỗ trợ là bắt buộc");
          return;
        }
        caseSupport.push({ case_id: c.id, user_id: uid, revoked_at: null, grant_reason: reason });
        pushAudit("SUPPORT_ADD", "case", c.id, null, { user_id: uid, reason });
        toast("Đã thêm người hỗ trợ");
        renderCaseDetail();
      });
    }
    document.querySelectorAll("[data-revoke]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const reason = window.prompt("Lý do thu hồi quyền hỗ trợ (bắt buộc):");
        if (!reason || !reason.trim()) {
          toast("Đã hủy — cần lý do");
          return;
        }
        const uid = btn.getAttribute("data-revoke");
        const row = caseSupport.find((s) => s.case_id === c.id && s.user_id === uid && !s.revoked_at);
        if (row) {
          row.revoked_at = new Date().toISOString();
          row.revoke_reason = reason.trim();
        }
        pushAudit("SUPPORT_REVOKE", "case", c.id, null, { user_id: uid, reason: reason.trim() });
        toast("Đã thu hồi hỗ trợ");
        renderCaseDetail();
      });
    });

    const backCases = document.getElementById("btn-back-cases");
    if (backCases) backCases.addEventListener("click", () => navigate("cases"));

    const quickTransfer = document.getElementById("btn-quick-transfer");
    if (quickTransfer) {
      quickTransfer.addEventListener("click", () => {
        state.detailTab = "transfer";
        renderCaseDetail();
      });
    }

    const quickLost = document.getElementById("btn-quick-lost");
    if (quickLost) {
      quickLost.addEventListener("click", () => {
        const next = !c.is_lost_to_followup;
        showModal(
          next ? "Đánh dấu mất dấu" : "Bỏ đánh dấu mất dấu",
          '<p class="muted">Ghi nhận theo nghiệp vụ V1.6 · audit bắt buộc.</p><label>Lý do</label><textarea id="lost-reason" rows="3" placeholder="Bắt buộc"></textarea>',
          () => {
            const reason = (document.getElementById("lost-reason").value || "").trim();
            if (!reason) {
              toast("Cần lý do");
              return false;
            }
            const rawCase = cases.find((x) => x.id === c.id);
            if (rawCase) rawCase.is_lost_to_followup = next;
            pushAudit(next ? "LOST_MARK" : "LOST_CLEAR", "case", c.id, null, { reason });
            toast(next ? "Đã đánh dấu mất dấu" : "Đã bỏ mất dấu");
            renderCaseDetail();
            return true;
          },
          "Lưu"
        );
      });
    }
  }

  function renderHistory() {
    const u = state.user;
    document.getElementById("topbar-title").textContent = "Lịch sử ca";
    setBreadcrumb("Nghiệp vụ / <b>Lịch sử ca</b>");
    const visibleIds = new Set(visibleCases(u).map((c) => c.id));
    const rows = auditLogs
      .filter((a) => a.entity_type === "case" && visibleIds.has(a.entity_id))
      .slice(0, 80)
      .map((a) => {
        const c = cases.find((x) => x.id === a.entity_id);
        return (
          "<tr data-case-id=\"" +
          a.entity_id +
          '"><td><b>' +
          esc(c ? c.case_code : a.entity_id) +
          "</b></td><td>" +
          esc(a.action) +
          "</td><td>" +
          esc(userById(a.actor_id)?.full_name || "—") +
          "</td><td>" +
          new Date(a.created_at).toLocaleString("vi-VN", { timeZone: TZ }) +
          "</td></tr>"
        );
      })
      .join("");
    document.getElementById("page-history").innerHTML =
      pageHeader("Lịch sử ca", "Audit theo ca trong phạm vi vai trò · tham chiếu tab Lịch sử chi tiết") +
      '<div class="card"><table class="data readonly"><thead><tr><th>Mã ca</th><th>Hành động</th><th>Người thực hiện</th><th>Thời điểm</th></tr></thead><tbody>' +
      (rows || '<tr><td colspan="4" class="empty">Chưa có lịch sử</td></tr>') +
      "</tbody></table></div>";
    bindCaseRows(document.getElementById("page-history"));
  }

  function dt(label, value) {
    return "<dt>" + label + "</dt><dd>" + value + "</dd>";
  }

  function changeStatus(caseId, next) {
    const c = cases.find((x) => x.id === caseId);
    if (!c || !canEditCase(c, state.user)) {
      toast("403 — Không có quyền");
      return;
    }
    const now = getNow().toISOString();
    const before = { status: c.status, verified_at: c.verified_at, resolved_at: c.resolved_at };
    c.status = next;
    c.version++;
    if (next === "VERIFIED") c.verified_at = now;
    else if (next === "VERIFYING") c.verified_at = c.resolved_at ? c.verified_at : null;
    if (next === "RESOLVED") c.resolved_at = now;
    else if (next === "VERIFIED" && c.resolved_at) c.resolved_at = null;
    pushAudit("STATUS_CHANGE", "case", caseId, before, { status: next, verified_at: c.verified_at, resolved_at: c.resolved_at });
    toast("POST /cases/{id}/status → " + STATUS_LABEL[next]);
    renderCaseDetail();
  }

  function openTransferModal(caseId) {
    state.pendingTransferCaseId = caseId;
    document.getElementById("modal-transfer").classList.add("open");
  }

  function executeTransfer() {
    const caseId = state.pendingTransferCaseId;
    const c = cases.find((x) => x.id === caseId);
    if (!c) return;
    const jur = document.getElementById("transfer-jur").value;
    const reason = document.getElementById("transfer-reason").value || "Không ghi lý do";
    const from = {
      location_type: c.location_type,
      hamlet_id: c.hamlet_id,
      external: c.external_locality_name,
    };

    c.location_type = jur;
    if (jur === "IN_COMMUNE") {
      c.hamlet_id = document.getElementById("transfer-hamlet-id").value;
      c.external_locality_name = null;
    } else if (jur === "OUTSIDE_COMMUNE") {
      c.hamlet_id = null;
      c.external_locality_name = document.getElementById("transfer-ext-name").value || "Ngoài xã";
    } else {
      c.hamlet_id = null;
      c.external_locality_name = null;
    }
    c.version++;
    const nowIso = getNow().toISOString();
    const hamletChanged =
      jur === "IN_COMMUNE" && from.location_type === "IN_COMMUNE" && from.hamlet_id && c.hamlet_id && from.hamlet_id !== c.hamlet_id;
    if (hamletChanged && c.sla_cycles) {
      const active = activeSlaCycle(c);
      if (active) active.ended_at = nowIso;
      c.sla_cycles.push({
        started_at: nowIso,
        start_reason: "HAMLET_TRANSFER",
        ended_at: null,
        cycle_number: (active?.cycle_number || 1) + 1,
      });
    }
    transfers.push({
      case_id: caseId,
      from_location_type: from.location_type,
      from_hamlet_id: from.hamlet_id,
      to_location_type: jur,
      to_hamlet_id: c.hamlet_id,
      reason,
      transferred_by: state.user.id,
      transferred_at: nowIso,
    });
    pushAudit("TRANSFER", "case", caseId, from, { location_type: jur, hamlet_id: c.hamlet_id, sla_reset: hamletChanged });

    if (state.user.role === ROLES.NVYT) {
      accessRestrictions.push({
        case_id: caseId,
        user_id: state.user.id,
        reason: "Thu hồi sau chuyển ấp",
        created_at: getNow().toISOString(),
        revoked_at: null,
      });
      document.getElementById("modal-transfer").classList.remove("open");
      toast("Chuyển thành công — bạn đã mất quyền truy cập ca");
      navigate("cases");
      return;
    }
    document.getElementById("modal-transfer").classList.remove("open");
    toast("Chuyển địa bàn thành công");
    renderCaseDetail();
  }

  function pushAudit(action, entityType, entityId, before, after) {
    auditLogs.unshift({
      id: "a" + Date.now(),
      actor_id: state.user.id,
      action,
      entity_type: entityType,
      entity_id: entityId,
      created_at: getNow().toISOString(),
      before_data: before,
      after_data: after,
    });
  }

  function renderUsers() {
    document.getElementById("topbar-title").textContent = "Danh mục · Tài khoản";
    setBreadcrumb("Danh mục / <b>Tài khoản</b>");
    const viewer = state.user;
    const list = users.filter((x) => !(viewer.role === ROLES.ADMIN && x.role === ROLES.ROOT));
    const roleOpts = assignableRoles(viewer.role)
      .map((r) => '<option value="' + r + '">' + r + "</option>")
      .join("");

    let rows = list
      .map((x) => {
        const hamletsCol = x.role === ROLES.NVYT ? hamletLabelsForUser(x.id) : '<span class="muted">—</span>';
        const srcTag = x.from_pcd ? ' <span class="chip jur">PCD 9.7</span>' : "";
        const canManage = !(viewer.role === ROLES.ADMIN && x.role === ROLES.ROOT);
        const actions = canManage
          ? '<button type="button" class="btn btn-secondary btn-sm" data-user-assign="' +
            x.id +
            '">Phân công ấp</button> ' +
            '<button type="button" class="btn btn-ghost btn-sm" data-user-toggle="' +
            x.id +
            '">' +
            (x.is_active ? "Khóa" : "Mở khóa") +
            "</button>"
          : '<span class="muted">—</span>';
        return (
          "<tr><td>" +
          x.full_name +
          srcTag +
          "</td><td><code>" +
          x.username +
          "</code></td><td><span class=\"role-badge\">" +
          x.role +
          "</span></td><td>" +
          hamletsCol +
          "</td><td>" +
          (x.is_active ? '<span class="chip verified">Hoạt động</span>' : '<span class="chip red">Khóa</span>') +
          "</td><td>" +
          actions +
          "</td></tr>"
        );
      })
      .join("");

    const page = document.getElementById("page-users");
    page.innerHTML =
      pageHeader("Danh mục — Tài khoản", "GET/POST /users · ROOT ẩn với Admin · bàn giao trước khi khóa NVYT (S21/S22)") +
      catalogSourceBanner() +
      catalogNav("users") +
      '<div class="grid-2">' +
      '<div class="card"><h3>Tạo tài khoản</h3>' +
      '<form id="form-create-user"><label>Họ tên</label><input name="full_name" required>' +
      '<label>Username</label><input name="username" required pattern="[a-z0-9._-]{3,32}">' +
      '<label>Vai trò</label><select name="role">' +
      roleOpts +
      '</select><button type="submit" class="btn btn-primary btn-sm">POST /users</button></form></div>' +
      '<div class="card"><h3>Ghi chú V1.6</h3><ul class="muted" style="margin:0;padding-left:18px;font-size:13px">' +
      "<li>Admin không thấy / sửa ROOT</li>" +
      "<li>NVYT: phân công ấp ở tab <strong>Phân công</strong></li>" +
      "<li>Vô hiệu hóa NVYT: cần bàn giao ca mở (mock)</li></ul></div></div>" +
      '<div class="card"><h3>Danh sách (' +
      list.length +
      ')</h3><table class="data readonly"><thead><tr><th>Họ tên</th><th>Username</th><th>Vai trò</th><th>Ấp (NVYT)</th><th>Trạng thái</th><th></th></tr></thead><tbody>' +
      rows +
      "</tbody></table></div>";

    bindCatalogNav(page);
    page.querySelector("#form-create-user").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const username = String(fd.get("username") || "")
        .trim()
        .toLowerCase();
      if (users.some((x) => x.username === username)) {
        toast("Username đã tồn tại");
        return;
      }
      const id = "u-new-" + Date.now();
      users.push({
        id,
        username,
        full_name: String(fd.get("full_name") || "").trim(),
        email: null,
        role: fd.get("role"),
        is_active: true,
      });
      passwords[id] = DEMO_PASSWORD;
      pushAudit("USER_CREATE", "user", id, null, { username, role: fd.get("role") });
      toast("Đã tạo tài khoản · mật khẩu demo: " + DEMO_PASSWORD);
      renderUsers();
    });
    page.querySelectorAll("[data-user-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = userById(btn.getAttribute("data-user-toggle"));
        if (!target || target.role === ROLES.ROOT) return;
        if (target.is_active && target.role === ROLES.NVYT) {
          const open = cases.filter(
            (c) =>
              c.status !== "RESOLVED" &&
              c.location_type === "IN_COMMUNE" &&
              activeHamletsForUser(target.id).includes(c.hamlet_id)
          ).length;
          if (open && !window.confirm("NVYT còn ~" + open + " ca mở thuộc ấp — nên bàn giao (S22). Vẫn khóa?")) return;
        }
        target.is_active = !target.is_active;
        pushAudit("USER_TOGGLE", "user", target.id, null, { is_active: target.is_active });
        toast(target.is_active ? "Đã mở khóa" : "Đã khóa tài khoản");
        renderUsers();
      });
    });
    page.querySelectorAll("[data-user-assign]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.assignPrefillUserId = btn.getAttribute("data-user-assign");
        navigate("assignments");
      });
    });
  }

  function renderHamlets() {
    document.getElementById("topbar-title").textContent = "Danh mục · Ấp";
    setBreadcrumb("Danh mục / <b>Ấp</b>");
    const page = document.getElementById("page-hamlets");
    const rows = hamlets
      .map(
        (h) =>
          "<tr><td><code>" +
          h.code +
          "</code></td><td>" +
          h.name +
          "</td><td>" +
          (h.leader_name || "—") +
          "</td><td>" +
          (h.leader_phone ? '<a href="tel:' + h.leader_phone + '">' + h.leader_phone + "</a>" : "—") +
          "</td><td>" +
          (h.active !== false ? '<span class="chip verified">Hoạt động</span>' : '<span class="chip neutral">Ngưng</span>') +
          '</td><td><button type="button" class="btn btn-ghost btn-sm" data-hamlet-toggle="' +
          h.id +
          '">' +
          (h.active !== false ? "Ngưng" : "Kích hoạt") +
          "</button></td></tr>"
      )
      .join("");

    page.innerHTML =
      pageHeader("Danh mục — Ấp", "GET/POST /hamlets · 52 ấp xã Đông Thạnh + trưởng ấp lâm thời (S20)") +
      catalogSourceBanner() +
      catalogNav("hamlets") +
      '<div class="grid-2">' +
      '<div class="card"><h3>Thêm ấp (thủ công)</h3><form id="form-create-hamlet">' +
      '<label>Mã ấp</label><input name="code" required placeholder="AP53" pattern="[A-Za-z0-9._-]+">' +
      '<label>Tên ấp</label><input name="name" required placeholder="Ấp mới">' +
      '<button type="submit" class="btn btn-primary btn-sm">Thêm ấp</button></form></div>' +
      '<div class="card"><h3>Thống kê</h3><p class="muted" style="margin:0"><strong>' +
      hamlets.length +
      "</strong> ấp · trưởng ấp & SĐT từ file 30.6.2026 / DS Trưởng ấp (9.7).</p></div></div>" +
      '<div class="card"><h3>Danh sách ấp & trưởng ấp</h3><div class="tablewrap" style="overflow:auto;max-height:420px"><table class="data readonly"><thead><tr><th>Mã</th><th>Tên</th><th>Trưởng ấp</th><th>SĐT</th><th>Trạng thái</th><th></th></tr></thead><tbody>' +
      rows +
      "</tbody></table></div></div>";

    bindCatalogNav(page);
    page.querySelector("#form-create-hamlet").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const code = String(fd.get("code") || "").trim().toUpperCase();
      if (hamlets.some((h) => h.code === code)) {
        toast("Mã ấp đã tồn tại");
        return;
      }
      const id = "h-" + Date.now();
      hamlets.push({ id, code, name: String(fd.get("name") || "").trim(), active: true });
      pushAudit("HAMLET_CREATE", "hamlet", id, null, { code });
      toast("Đã thêm ấp " + code);
      renderHamlets();
    });
    page.querySelectorAll("[data-hamlet-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const h = hamletById(btn.getAttribute("data-hamlet-toggle"));
        if (!h) return;
        h.active = h.active === false ? true : false;
        pushAudit("HAMLET_TOGGLE", "hamlet", h.id, null, { active: h.active !== false });
        renderHamlets();
      });
    });
  }

  function renderAssignments() {
    document.getElementById("topbar-title").textContent = "Danh mục · Phân công";
    setBreadcrumb("Danh mục / <b>Phân công</b>");
    const page = document.getElementById("page-assignments");

    let rows = userHamletAssignments
      .filter((a) => !a.revoked_at)
      .map((a) => {
        const usr = userById(a.user_id);
        const h = hamletById(a.hamlet_id);
        const at = a.assigned_at ? new Date(a.assigned_at).toLocaleString("vi-VN") : "—";
        return (
          "<tr><td>" +
          (usr ? usr.full_name + " <span class=\"muted\">(" + usr.username + ")</span>" : a.user_id) +
          "</td><td>" +
          (h ? h.code + " · " + h.name : a.hamlet_id) +
          "</td><td>" +
          (a.source_row || "—") +
          "</td><td>" +
          (a.department || "—") +
          "</td><td>" +
          at +
          '</td><td><button type="button" class="btn btn-danger btn-sm" data-revoke-assignment="' +
          a.user_id +
          "|" +
          a.hamlet_id +
          '">Thu hồi</button></td></tr>'
        );
      })
      .join("");

    const nvytUsers = users.filter((x) => x.role === ROLES.NVYT && x.is_active);
    const nvytOpts = nvytUsers
      .map((x) => '<option value="' + x.id + '">' + x.full_name + "</option>")
      .join("");
    const hamletOpts = hamlets
      .filter((h) => h.active !== false)
      .map((h) => '<option value="' + h.id + '">' + h.code + " — " + h.name + "</option>")
      .join("");

    const prefill = state.assignPrefillUserId || (nvytUsers[0] && nvytUsers[0].id);

    let pcdTable = "";
    if (pcdAssignmentRows.length) {
      pcdTable =
        '<div class="card"><h3>Bảng gốc · PCD mới (Excel)</h3><div class="tablewrap" style="overflow:auto"><table class="data readonly"><thead><tr><th>Nhóm ấp</th><th>SL</th><th>Nhân sự PCD</th><th>Chức danh</th><th>Khoa/phòng</th><th>Quản lý</th></tr></thead><tbody>' +
        pcdAssignmentRows
          .map(
            (r) =>
              "<tr><td>" +
              r.hamlet_label +
              "</td><td>" +
              (r.hamlet_nums ? r.hamlet_nums.length : "—") +
              "</td><td>" +
              (r.staff || []).join(", ") +
              "</td><td>" +
              (r.title || "—") +
              "</td><td>" +
              (r.department || "—") +
              "</td><td>" +
              (r.manager || "—") +
              "</td></tr>"
          )
          .join("") +
        "</tbody></table></div></div>";
    }

    page.innerHTML =
      pageHeader(
        "Danh mục — Phân công NVYT ↔ ấp",
        "user_hamlet_assignments N:N · import từ PHAN CONG PCD theo ấp mới (9.7)"
      ) +
      catalogSourceBanner() +
      catalogNav("assignments") +
      pcdTable +
      '<div class="card"><h3>Phân công mới</h3>' +
      '<div class="filters"><div class="field"><label>NVYT</label><select id="assign-user">' +
      nvytOpts +
      '</select></div><div class="field"><label>Ấp</label><select id="assign-hamlet">' +
      hamletOpts +
      '</select></div><button type="button" class="btn btn-primary btn-sm" id="btn-assign">Gán ấp</button></div>' +
      '<p class="muted">Không chọn NVYT chính trên ca — mọi NVYT được gán ấp đều thấy ca IN_COMMUNE thuộc ấp đó.</p></div>' +
      '<div class="card"><h3>Đang hiệu lực (' +
      userHamletAssignments.filter((a) => !a.revoked_at).length +
      ' cặp NVYT–ấp)</h3><div class="tablewrap" style="overflow:auto;max-height:360px"><table class="data readonly"><thead><tr><th>NVYT</th><th>Ấp</th><th>Nhóm (Excel)</th><th>Khoa/phòng</th><th>Gán lúc</th><th></th></tr></thead><tbody>' +
      (rows || '<tr><td colspan="6" class="empty">Chưa có phân công</td></tr>') +
      "</tbody></table></div>";

    bindCatalogNav(page);
    const assignUser = page.querySelector("#assign-user");
    if (prefill && assignUser) assignUser.value = prefill;
    state.assignPrefillUserId = null;

    page.querySelector("#btn-assign").addEventListener("click", () => {
      const uid = assignUser.value;
      const hid = page.querySelector("#assign-hamlet").value;
      const dup = userHamletAssignments.some((a) => a.user_id === uid && a.hamlet_id === hid && !a.revoked_at);
      if (dup) {
        toast("Phân công đã tồn tại");
        return;
      }
      userHamletAssignments.push({
        user_id: uid,
        hamlet_id: hid,
        assigned_at: getNow().toISOString(),
        revoked_at: null,
      });
      pushAudit("HAMLET_ASSIGN", "user", uid, null, { hamlet_id: hid });
      toast("Đã phân công ấp");
      renderAssignments();
    });
    page.querySelectorAll("[data-revoke-assignment]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const [uid, hid] = btn.getAttribute("data-revoke-assignment").split("|");
        const row = userHamletAssignments.find((a) => a.user_id === uid && a.hamlet_id === hid && !a.revoked_at);
        if (row) row.revoked_at = getNow().toISOString();
        pushAudit("HAMLET_REVOKE", "user", uid, null, { hamlet_id: hid });
        toast("Đã thu hồi phân công");
        renderAssignments();
      });
    });
  }

  function renderClassifyQueue() {
    const list = cases.filter(
      (c) => c.location_type === "UNKNOWN_HAMLET" || c.location_type === "OUTSIDE_COMMUNE"
    );
    renderCaseListPage(
      "page-classify-queue",
      list,
      "Chờ phân loại địa bàn",
      !isAdminLike(state.user.role),
      "Ca ngoài xã / chưa rõ ấp — S14 · NVYT không thấy"
    );
  }

  function renderUnassigned() {
    const list = cases.filter((c) => !c.primary_user_id);
    renderCaseListPage(
      "page-unassigned",
      list,
      "Ca chưa có người chính",
      isReadOnlyRole(state.user.role),
      "Primary nullable theo V1.6 — quyền NVYT vẫn theo ấp (S15)"
    );
  }

  const XLSX_CDN = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
  let xlsxLoadPromise = null;

  function loadXlsxLib() {
    if (window.XLSX) return Promise.resolve(window.XLSX);
    if (!xlsxLoadPromise) {
      xlsxLoadPromise = new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = XLSX_CDN;
        s.async = true;
        s.onload = () => (window.XLSX ? resolve(window.XLSX) : reject(new Error("XLSX không load")));
        s.onerror = () => reject(new Error("Không tải được thư viện đọc Excel (CDN)"));
        document.head.appendChild(s);
      });
    }
    return xlsxLoadPromise;
  }

  function isExcelImportFile(file) {
    const name = (file.name || "").toLowerCase();
    return (
      name.endsWith(".xlsx") ||
      name.endsWith(".xls") ||
      name.endsWith(".xlsm") ||
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel"
    );
  }

  function parseCsvToRows(text) {
    const lines = String(text || "")
      .split(/\r?\n/)
      .filter((line) => line.trim() !== "");
    return lines.map((line) => {
      const cells = [];
      let cur = "";
      let inQ = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (inQ && line[i + 1] === '"') {
            cur += '"';
            i++;
          } else inQ = !inQ;
        } else if (ch === "," && !inQ) {
          cells.push(cur);
          cur = "";
        } else cur += ch;
      }
      cells.push(cur);
      return cells;
    });
  }

  function workbookSheetNames(wb) {
    return (wb.SheetNames || []).slice();
  }

  function sheetToRows(wb, sheetName) {
    const ws = wb.Sheets[sheetName];
    if (!ws) return [];
    const rows = window.XLSX.utils.sheet_to_json(ws, { header: 1, defval: "", raw: false });
    return rows.filter((row) => row.some((cell) => String(cell ?? "").trim() !== ""));
  }

  function renderImportPreviewTable(rows, meta) {
    const previewRows = rows.slice(0, 6);
    const colCount = Math.max(...previewRows.map((r) => r.length), 1);
    const body = previewRows
      .map((row, i) => {
        const cells = [];
        for (let c = 0; c < colCount; c++) {
          cells.push("<td>" + esc(row[c] != null ? row[c] : "") + "</td>");
        }
        return "<tr" + (i === 0 ? ' class="muted"' : "") + ">" + cells.join("") + "</tr>";
      })
      .join("");
    return (
      '<h3 style="margin:0 0 8px;font-size:14px">Preview · ' +
      esc(meta.sheetLabel) +
      "</h3>" +
      (meta.sheetSelectHtml || "") +
      '<div style="overflow-x:auto"><table class="data readonly"><tbody>' +
      body +
      '</tbody></table></div><p class="muted mini">' +
      meta.rowCount +
      " dòng (trừ header nếu có) · " +
      esc(meta.fileName) +
      " · trùng mã ca sẽ bỏ qua trên production.</p>"
    );
  }

  function renderImport() {
    document.getElementById("topbar-title").textContent = "Import Excel";
    setBreadcrumb("Nghiệp vụ / <b>Import</b>");
    document.getElementById("page-import").innerHTML =
      pageHeader("Import Excel — wizard", "S16 → S19 · upload · mapping · preview · commit idempotent") +
      '<div class="placeholder-steps">' +
      '<div class="step">Upload .xlsx</div><span class="arrow">→</span>' +
      '<div class="step">Mapping cột</div><span class="arrow">→</span>' +
      '<div class="step">Preview trùng/lỗi</div><span class="arrow">→</span>' +
      '<div class="step">Xác nhận import</div></div>' +
      '<div class="card"><p class="muted">Demo: đọc <strong>.xlsx / .xls</strong> trên trình duyệt (SheetJS). Production validate kích thước, không overwrite ca trùng, <code>received_at</code> = thời điểm commit.</p>' +
      '<label>Tệp Excel ca bệnh</label>' +
      '<input type="file" id="import-file" accept=".xlsx,.xls,.xlsm,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,.csv,text/csv">' +
      '<p class="muted mini" style="margin:-6px 0 12px">Chính: <code>.xlsx</code> · hỗ trợ thêm <code>.csv</code> để thử nhanh.</p>' +
      '<div id="import-preview" class="hidden" style="margin-top:16px"></div>' +
      '<button type="button" class="btn btn-primary btn-sm hidden" id="btn-import-commit">Xác nhận import (mock)</button></div>';

    const fileInput = document.getElementById("import-file");
    const preview = document.getElementById("import-preview");
    const commitBtn = document.getElementById("btn-import-commit");
    let importWorkbook = null;
    let importFileName = "";
    let importSheetName = "";

    function showPreviewFromRows(rows, fileName, sheetLabel, sheetNames) {
      const dataRows = rows.length > 1 ? rows.length - 1 : 0;
      let sheetSelectHtml = "";
      if (sheetNames && sheetNames.length > 1) {
        sheetSelectHtml =
          '<label>Sheet</label><select id="import-sheet">' +
          sheetNames.map((n) => '<option value="' + esc(n) + '">' + esc(n) + "</option>").join("") +
          "</select>";
      }
      preview.classList.remove("hidden");
      preview.innerHTML = renderImportPreviewTable(rows, {
        fileName,
        sheetLabel,
        rowCount: dataRows,
        sheetSelectHtml,
      });
      commitBtn.classList.remove("hidden");
      const sheetSel = document.getElementById("import-sheet");
      if (sheetSel) {
        sheetSel.value = importSheetName;
        sheetSel.addEventListener("change", () => {
          if (!importWorkbook) return;
          importSheetName = sheetSel.value;
          const next = sheetToRows(importWorkbook, importSheetName);
          showPreviewFromRows(next, importFileName, importSheetName, workbookSheetNames(importWorkbook));
        });
      }
    }

    if (fileInput) {
      fileInput.addEventListener("change", () => {
        const file = fileInput.files && fileInput.files[0];
        if (!file) return;
        importWorkbook = null;
        importFileName = file.name;
        preview.classList.add("hidden");
        commitBtn.classList.add("hidden");
        preview.innerHTML = '<p class="muted">Đang đọc tệp…</p>';
        preview.classList.remove("hidden");

        if (isExcelImportFile(file)) {
          loadXlsxLib()
            .then(() => {
              const reader = new FileReader();
              reader.onload = () => {
                try {
                  const wb = window.XLSX.read(reader.result, { type: "array" });
                  importWorkbook = wb;
                  const names = workbookSheetNames(wb);
                  importSheetName = names[0] || "";
                  const rows = importSheetName ? sheetToRows(wb, importSheetName) : [];
                  if (!rows.length) {
                    toast("Sheet trống hoặc không đọc được dữ liệu");
                    preview.classList.add("hidden");
                    return;
                  }
                  showPreviewFromRows(rows, file.name, importSheetName, names);
                  toast("Đã đọc Excel · " + names.length + " sheet");
                } catch (e) {
                  toast("Lỗi đọc Excel: " + e.message);
                  preview.classList.add("hidden");
                }
              };
              reader.onerror = () => toast("Không đọc được tệp");
              reader.readAsArrayBuffer(file);
            })
            .catch((e) => {
              toast(e.message || "Lỗi tải thư viện Excel");
              preview.classList.add("hidden");
            });
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          const rows = parseCsvToRows(String(reader.result || ""));
          if (!rows.length) {
            toast("CSV trống");
            preview.classList.add("hidden");
            return;
          }
          showPreviewFromRows(rows, file.name, "CSV", null);
        };
        reader.readAsText(file, "UTF-8");
      });
    }
    if (commitBtn) {
      commitBtn.addEventListener("click", () => {
        toast("Import mock — chưa ghi ca vào store demo");
        fileInput.value = "";
        importWorkbook = null;
        preview.classList.add("hidden");
        preview.innerHTML = "";
        commitBtn.classList.add("hidden");
      });
    }
  }

  function renderReports() {
    document.getElementById("topbar-title").textContent = "Báo cáo";
    setBreadcrumb("Báo cáo / <b>Xuất dữ liệu</b>");
    document.getElementById("page-reports").innerHTML =
      pageHeader(
        "Báo cáo & xuất",
        "GET /reports/cases — lọc địa bàn, SLA, quá hạn · S24",
        '<button type="button" class="btn btn-primary btn-sm" id="btn-export-csv">⎙ Xuất CSV</button>'
      ) +
      '<div class="card"><div class="filters">' +
      filterFields() +
      '</div><p class="muted">Xuất file theo scope vai trò · Manager/BOD chỉ đọc.</p></div>';
    const btn = document.getElementById("btn-export-csv");
    if (btn) btn.addEventListener("click", exportVisibleCasesCsv);
  }

  function renderNotifications() {
    document.getElementById("topbar-title").textContent = "Thông báo";
    setBreadcrumb("Hệ thống / <b>Thông báo</b>");
    const u = state.user;
    const items = [];
    if (isAdminLike(u.role)) {
      const q = cases.filter((c) => c.location_type !== "IN_COMMUNE" || !c.hamlet_id).length;
      if (q) items.push({ t: "Hàng chờ phân loại", d: q + " ca cần phân loại địa bàn" });
    }
    myCases(u)
      .filter((c) => c.sla_alert !== "NONE")
      .slice(0, 5)
      .forEach((c) => items.push({ t: c.case_code, d: SLA_LABEL[c.sla_alert] }));
    const rows =
      items.map((x) => "<tr><td>" + x.t + "</td><td>" + x.d + "</td></tr>").join("") ||
      '<tr><td colspan="2" class="empty">Không có thông báo mới</td></tr>';
    document.getElementById("page-notifications").innerHTML =
      pageHeader("Thông báo / việc cần xử lý", "GET /notifications — S26") +
      '<div class="card"><table class="data readonly"><thead><tr><th>Tiêu đề</th><th>Nội dung</th></tr></thead><tbody>' +
      rows +
      "</tbody></table></div>";
    const bell = document.getElementById("btn-notifications");
    if (bell) bell.setAttribute("data-count", String(Math.min(items.length, 9)));
  }

  function renderAudit() {
    document.getElementById("topbar-title").textContent = "Audit log";
    setBreadcrumb("Quản trị / <b>Audit</b>");
    const rows = auditLogs
      .map(
        (a) =>
          "<tr><td>" +
          new Date(a.created_at).toLocaleString("vi-VN") +
          "</td><td>" +
          (userById(a.actor_id)?.full_name || a.actor_id) +
          "</td><td>" +
          a.action +
          "</td><td>" +
          a.entity_type +
          "</td><td>" +
          a.entity_id +
          "</td></tr>"
      )
      .join("");
    document.getElementById("page-audit").innerHTML =
      pageHeader("Audit log toàn hệ thống", "GET /audit-logs — S23 · immutable") +
      '<div class="card"><table class="data readonly"><thead><tr><th>Thời điểm</th><th>Người thực hiện</th><th>Action</th><th>Entity</th><th>ID</th></tr></thead><tbody>' +
      rows +
      "</tbody></table></div>";
  }

  function renderRootConfig() {
    document.getElementById("topbar-title").textContent = "Cấu hình ROOT";
    setBreadcrumb("Hệ thống / <b>ROOT</b>");
    document.getElementById("page-root-config").innerHTML =
      pageHeader("Cấu hình ROOT", "Giả lập thời gian SLA · quyền đặc biệt") +
      '<div class="card"><h3>Giả lập thời gian (SLA demo)</h3><p>Dùng để kiểm tra mốc D+1 12:00, D+2 12:00, D+3 00:00 (Asia/Ho_Chi_Minh).</p>' +
      '<label>Thời điểm giả lập</label><input type="datetime-local" id="demo-now">' +
      '<button type="button" class="btn btn-primary btn-sm" id="apply-demo-now">Áp dụng</button> ' +
      '<button type="button" class="btn btn-secondary btn-sm" id="reset-demo-now">Dùng giờ thật</button></div>' +
      '<div class="card"><h3>Quyền đặc biệt</h3><p>Quản trị ROOT, cấu hình hệ thống — chỉ role ROOT.</p></div>';
    const inp = document.getElementById("demo-now");
    if (state.demoNow) {
      const d = new Date(state.demoNow);
      inp.value = d.toISOString().slice(0, 16);
    }
    document.getElementById("apply-demo-now").addEventListener("click", () => {
      state.demoNow = inp.value ? new Date(inp.value).toISOString() : null;
      toast("Đã đặt thời gian demo");
      render();
    });
    document.getElementById("reset-demo-now").addEventListener("click", () => {
      state.demoNow = null;
      toast("Dùng giờ hệ thống");
      render();
    });
  }

  function render() {
    if (!state.user) return;
    if (renderDepth > 4) {
      console.error("TYT demo: render() bị gọi lặp quá nhiều — dừng để tránh treo trình duyệt.");
      return;
    }
    renderDepth++;
    try {
      renderInner();
    } finally {
      renderDepth--;
    }
  }

  function renderInner() {
    buildNav();

    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    const pageEl = document.getElementById("page-" + state.route);
    if (pageEl) pageEl.classList.add("active");

    const u = state.user;
    switch (state.route) {
      case "dashboard":
        renderDashboard();
        break;
      case "dashboard-nvyt":
        renderNvytDashboard();
        break;
      case "cases":
        renderCaseListPage(
          "page-cases",
          visibleCases(u),
          u.role === ROLES.NVYT ? "Ca thuộc quyền" : "Danh sách ca bệnh",
          isReadOnlyRole(u.role),
          "S04 · tìm kiếm, lọc, export trên production"
        );
        break;
      case "history":
        renderHistory();
        break;
      case "classify-queue":
        renderClassifyQueue();
        break;
      case "unassigned":
        renderUnassigned();
        break;
      case "create-case":
        renderCreateCase();
        break;
      case "import":
        renderImport();
        break;
      case "case-detail":
        renderCaseDetail();
        break;
      case "hamlets":
        renderHamlets();
        break;
      case "assignments":
        renderAssignments();
        break;
      case "users":
        renderUsers();
        break;
      case "audit":
        renderAudit();
        break;
      case "reports":
        renderReports();
        break;
      case "notifications":
        renderNotifications();
        break;
      case "root-config":
        renderRootConfig();
        break;
      default: {
        const fallback = u.role === ROLES.NVYT ? "dashboard-nvyt" : "dashboard";
        state.route = fallback;
        if (pageEl) pageEl.classList.remove("active");
        const fb = document.getElementById("page-" + fallback);
        if (fb) fb.classList.add("active");
        if (fallback === "dashboard-nvyt") renderNvytDashboard();
        else renderDashboard();
        break;
      }
    }

    const topCreate = document.getElementById("topbar-create");
    const topImport = document.getElementById("topbar-import");
    if (topCreate) {
      topCreate.classList.toggle("hidden", !canCreateCase(u));
    }
    if (topImport) {
      topImport.classList.toggle("hidden", !canCreateCase(u));
    }
    if (state.route !== "notifications") {
      const bell = document.getElementById("btn-notifications");
      if (bell && u) {
        const n = isAdminLike(u.role)
          ? cases.filter((c) => c.location_type !== "IN_COMMUNE" || !c.hamlet_id).length
          : myCases(u).filter((c) => c.sla_alert !== "NONE").length;
        bell.setAttribute("data-count", String(Math.min(n, 9)));
      }
    }
    syncDemoRolePicker();
  }

  function showAuthScreen(which) {
    document.getElementById("login-screen").classList.toggle("hidden", which !== "login");
    document.getElementById("register-screen").classList.toggle("hidden", which !== "register");
  }

  function hideAuthScreens() {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("register-screen").classList.add("hidden");
  }

  function passwordFor(user) {
    return passwords[user.id] || DEMO_PASSWORD;
  }

  function login(username, password) {
    const name = username.trim().toLowerCase();
    const u = users.find((x) => x.username === name && x.is_active);
    if (!u || password !== passwordFor(u)) {
      toast("Sai tài khoản hoặc mật khẩu");
      return false;
    }
    state.user = u;
    state.route = u.role === ROLES.NVYT ? "dashboard-nvyt" : "dashboard";
    state.selectedCaseId = null;
    hideAuthScreens();
    document.getElementById("app").classList.add("active");
    pushAudit("LOGIN", "session", u.id, null, null);
    render();
    return true;
  }

  function register(form) {
    const fd = new FormData(form);
    const full_name = String(fd.get("full_name") || "").trim();
    const username = String(fd.get("username") || "")
      .trim()
      .toLowerCase();
    const email = String(fd.get("email") || "").trim() || null;
    const password = String(fd.get("password") || "");
    const password2 = String(fd.get("password2") || "");

    if (username.length < 3) {
      toast("Tên đăng nhập tối thiểu 3 ký tự");
      return false;
    }
    if (!/^[a-z0-9._-]+$/.test(username)) {
      toast("Tên đăng nhập chỉ dùng chữ thường, số, . _ -");
      return false;
    }
    if (password.length < 6) {
      toast("Mật khẩu tối thiểu 6 ký tự");
      return false;
    }
    if (password !== password2) {
      toast("Mật khẩu nhập lại không khớp");
      return false;
    }
    if (users.some((x) => x.username === username)) {
      toast("Tên đăng nhập đã tồn tại");
      return false;
    }

    const id = "u-reg-" + Date.now();
    const nu = {
      id,
      username,
      full_name,
      email,
      role: ROLES.NVYT,
      is_active: true,
    };
    users.push(nu);
    passwords[id] = password;
    saveRegisteredUsers();

    auditLogs.unshift({
      id: "a" + Date.now(),
      actor_id: id,
      action: "USER_REGISTER",
      entity_type: "user",
      entity_id: id,
      created_at: new Date().toISOString(),
    });

    toast("Đăng ký thành công — không cần xác thực email");
    form.reset();
    login(username, password);
    return true;
  }

  function logout() {
    state.user = null;
    state.route = "dashboard";
    state.selectedCaseId = null;
    closeModal();
    document.getElementById("app").classList.remove("active");
    syncDemoRolePicker();
    showAuthScreen("login");
  }

  function showBootError(msg) {
    const el = document.getElementById("boot-error");
    if (!el) return;
    el.textContent = msg;
    el.classList.remove("hidden");
  }

  const SIDEBAR_COLLAPSE_KEY = "tyt-demo-sidebar-collapsed";
  let sidebarCollapsed = false;

  function applySidebarCollapsed() {
    const layout = document.getElementById("app-layout");
    const btn = document.getElementById("sidebar-toggle");
    layout?.classList.toggle("sidebar-collapsed", sidebarCollapsed);
    if (btn) {
      btn.setAttribute("aria-expanded", String(!sidebarCollapsed));
      btn.setAttribute("aria-label", sidebarCollapsed ? "Mở sidebar" : "Thu gọn sidebar");
    }
  }

  function toggleSidebarCollapse() {
    sidebarCollapsed = !sidebarCollapsed;
    applySidebarCollapsed();
    try {
      localStorage.setItem(SIDEBAR_COLLAPSE_KEY, sidebarCollapsed ? "1" : "0");
    } catch (_) {
      /* ignore */
    }
  }

  function closeMobileSidebar() {
    document.getElementById("sidebar")?.classList.remove("open");
    const bd = document.getElementById("sidebar-backdrop");
    if (bd) {
      bd.classList.remove("visible");
      bd.hidden = true;
    }
  }

  function toggleMobileSidebar() {
    const sidebar = document.getElementById("sidebar");
    const bd = document.getElementById("sidebar-backdrop");
    if (!sidebar) return;
    const open = !sidebar.classList.contains("open");
    sidebar.classList.toggle("open", open);
    if (bd) {
      bd.classList.toggle("visible", open);
      bd.hidden = !open;
    }
  }

  function init() {
    try {
      sidebarCollapsed = localStorage.getItem(SIDEBAR_COLLAPSE_KEY) === "1";
      applySidebarCollapsed();
    } catch (_) {
      /* ignore */
    }
    try {
      if (!window.TYT_CATALOG) {
        console.warn("TYT_CATALOG chưa load — dùng dữ liệu ấp rút gọn.");
      }
    } catch (e) {
      showBootError("Lỗi khởi tạo dữ liệu: " + e.message);
    }

    document.getElementById("login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      login(document.getElementById("login-user").value.trim(), document.getElementById("login-pass").value);
    });

    document.getElementById("register-form").addEventListener("submit", (e) => {
      e.preventDefault();
      register(e.target);
    });

    document.getElementById("go-register").addEventListener("click", () => showAuthScreen("register"));
    document.getElementById("go-login").addEventListener("click", () => showAuthScreen("login"));

    document.querySelectorAll(".demo-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.getElementById("login-user").value = btn.getAttribute("data-user");
        document.getElementById("login-pass").value = DEMO_PASSWORD;
      });
    });

    document.getElementById("btn-logout").addEventListener("click", logout);
    document.getElementById("btn-reset-demo").addEventListener("click", resetDemo);
    document.getElementById("topbar-create").addEventListener("click", () => navigate("create-case"));
    document.getElementById("topbar-import").addEventListener("click", () => navigate("import"));
    document.getElementById("btn-notifications").addEventListener("click", () => navigate("notifications"));
    document.getElementById("sidebar-toggle")?.addEventListener("click", toggleSidebarCollapse);
    document.getElementById("menu-btn")?.addEventListener("click", toggleMobileSidebar);
    document.getElementById("sidebar-backdrop")?.addEventListener("click", closeMobileSidebar);
    document.getElementById("modal-transfer-cancel").addEventListener("click", () => {
      document.getElementById("modal-transfer").classList.remove("open");
    });
    document.getElementById("modal-transfer-confirm").addEventListener("click", executeTransfer);
  }

  function boot() {
    try {
      applyCatalogFromExcel();
      init();
    } catch (e) {
      console.error(e);
      showBootError(
        "JavaScript lỗi khi khởi động (" +
          e.message +
          "). Nếu trang cứ reload: mở DevTools → Console; tắt Live Reload; chạy server tĩnh trong tyt/demo."
      );
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
