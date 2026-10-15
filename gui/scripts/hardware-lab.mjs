/** Interactive HID hardware components — dev-grade prototype for gui.html */

export const HARDWARE_LAB_HTML = `<div class="card hw-lab-card">
  <div class="card-title">Hardware Lab · mô phỏng runtime (như Synapse / G Hub)</div>
  <p class="doc-p hw-lab-intro">Chọn vùng trên chuột, chỉnh DPI, LED, macro. Dùng toolbar để mô phỏng mất kết nối / pin yếu / đang flash firmware.</p>
  <div id="hw-lab" class="hw-lab" data-product-theme="gaming-razer">
    <header class="hw-lab__titlebar">
      <span class="app-win__dots"><i></i><i></i><i></i></span>
      <span class="hw-lab__appname">HID Config · prototype</span>
      <select class="hw-lab__profile" id="hw-profile" aria-label="Profile">
        <option>Desktop</option>
        <option selected>FPS</option>
        <option>MOBA</option>
      </select>
      <span class="hw-lab__status" id="hw-status-badge"></span>
      <span class="hw-lab__battery" id="hw-battery" aria-live="polite"></span>
      <span class="hw-lab__signal mono" id="hw-signal">2.4G · ▂▄▆</span>
    </header>
    <div class="hw-lab__toolbar">
      <button type="button" class="gui-btn gui-btn--outline hw-tb-btn" onclick="hwSimulate('connected')">● Connected</button>
      <button type="button" class="gui-btn gui-btn--outline hw-tb-btn" onclick="hwSimulate('disconnect')">Disconnect</button>
      <button type="button" class="gui-btn gui-btn--outline hw-tb-btn" onclick="hwSimulate('sleep')">Sleep</button>
      <button type="button" class="gui-btn gui-btn--outline hw-tb-btn" onclick="hwSimulate('firmware')">Firmware 0→100%</button>
      <button type="button" class="gui-btn gui-btn--outline hw-tb-btn" onclick="hwSimulate('lowbat')">Pin yếu</button>
    </div>
    <div class="hw-lab__banner" id="hw-banner" role="alert" hidden></div>
    <div class="hw-lab__shell">
      <nav class="hw-lab__nav" aria-label="Configuration">
        <button type="button" class="hw-nav-item hw-nav-item--on" data-hw-tab="buttons" onclick="hwSwitchTab('buttons')">Buttons / Remap</button>
        <button type="button" class="hw-nav-item" data-hw-tab="performance" onclick="hwSwitchTab('performance')">Performance</button>
        <button type="button" class="hw-nav-item" data-hw-tab="lighting" onclick="hwSwitchTab('lighting')">Lighting</button>
        <button type="button" class="hw-nav-item" data-hw-tab="macro" onclick="hwSwitchTab('macro')">Macro</button>
      </nav>
      <div class="hw-lab__center">
        <div class="hw-lab__canvas-wrap" id="hw-canvas-wrap">
          <p class="hw-lab__canvas-hint">Interactive Device Map — hotspot khớp nút vật lý</p>
          <div class="hw-device-map" id="hw-device-map" role="application" aria-label="Mouse map">
            <div class="hw-mouse-led" id="hw-mouse-led" aria-hidden="true"></div>
            <div class="hw-mouse-body"></div>
            <button type="button" class="hw-hotspot hw-hotspot--l" data-btn="L" style="--hx:18%;--hy:22%" onclick="hwSelectButton('L')" title="Left click">L</button>
            <button type="button" class="hw-hotspot hw-hotspot--r" data-btn="R" style="--hx:72%;--hy:22%" onclick="hwSelectButton('R')" title="Right click">R</button>
            <button type="button" class="hw-hotspot hw-hotspot--m" data-btn="M" style="--hx:45%;--hy:18%" onclick="hwSelectButton('M')" title="Middle">M</button>
            <button type="button" class="hw-hotspot hw-hotspot--s1" data-btn="S1" style="--hx:8%;--hy:55%" onclick="hwSelectButton('S1')" title="Side 1">S1</button>
            <button type="button" class="hw-hotspot hw-hotspot--s2" data-btn="S2" style="--hx:8%;--hy:72%" onclick="hwSelectButton('S2')" title="Side 2">S2</button>
          </div>
        </div>
        <div class="hw-lab__log mono" id="hw-device-log" aria-live="polite">HID report: idle</div>
      </div>
      <aside class="hw-lab__panel" id="hw-panel">
        <div class="hw-panel" data-hw-panel="buttons">
          <h4 class="hw-panel__title">Gán chức năng · <span id="hw-sel-label">—</span></h4>
          <label class="hw-field">Action
            <select id="hw-action" disabled onchange="hwAssignAction(this.value)">
              <option value="default">Default click</option>
              <option value="back">Back</option>
              <option value="forward">Forward</option>
              <option value="dpi">DPI cycle</option>
              <option value="macro">Macro slot 1</option>
            </select>
          </label>
          <p class="hw-panel__hint" id="hw-assign-hint">Chọn hotspot trên chuột.</p>
          <button type="button" class="gui-btn gui-btn--primary hw-apply-btn" id="hw-apply-remap" disabled onclick="hwApplyRemap()">Apply to device</button>
          <span class="hw-save-feedback" id="hw-remap-save"></span>
        </div>
        <div class="hw-panel" data-hw-panel="performance" hidden>
          <h4 class="hw-panel__title">DPI / Sensitivity</h4>
          <div class="hw-dpi-display"><span class="hw-dpi-num" id="hw-dpi-num">1600</span><span class="hw-dpi-unit">DPI</span></div>
          <input type="range" class="gui-slider hw-dpi-range" id="hw-dpi-range" min="100" max="16000" step="50" value="1600" oninput="hwDpiFromSlider(this.value)" aria-label="DPI slider" />
          <label class="hw-field">Exact value
            <input type="number" class="hw-dpi-input" id="hw-dpi-input" min="100" max="16000" step="50" value="1600" onchange="hwDpiFromInput(this.value)" />
          </label>
          <div class="hw-presets">
            <button type="button" class="gui-btn gui-btn--outline" onclick="hwDpiPreset(400)">400</button>
            <button type="button" class="gui-btn gui-btn--outline" onclick="hwDpiPreset(800)">800</button>
            <button type="button" class="gui-btn gui-btn--outline" onclick="hwDpiPreset(1600)">1600</button>
            <button type="button" class="gui-btn gui-btn--outline" onclick="hwDpiPreset(3200)">3200</button>
          </div>
          <span class="hw-save-feedback" id="hw-dpi-save"></span>
        </div>
        <div class="hw-panel" data-hw-panel="lighting" hidden>
          <h4 class="hw-panel__title">Color · LED zones</h4>
          <label class="hw-field">Màu accent
            <input type="color" id="hw-led-color" value="#00ff00" oninput="hwLedPreview(this.value)" />
          </label>
          <fieldset class="hw-zones">
            <legend>Multi-zone</legend>
            <label><input type="checkbox" checked onchange="hwLedZone('body', this.checked)" /> Thân chuột</label>
            <label><input type="checkbox" onchange="hwLedZone('wheel', this.checked)" /> Vòng scroll</label>
            <label><input type="checkbox" onchange="hwLedZone('logo', this.checked)" /> Logo</label>
          </fieldset>
          <label class="hw-field">Effect
            <select id="hw-led-fx" onchange="hwLedFx(this.value)">
              <option value="static">Static</option>
              <option value="breathing">Breathing</option>
              <option value="wave">Wave</option>
            </select>
          </label>
          <button type="button" class="gui-btn gui-btn--primary" id="hw-led-apply" onclick="hwLedApply()">Sync to device</button>
          <span class="hw-save-feedback" id="hw-led-save"></span>
        </div>
        <div class="hw-panel" data-hw-panel="macro" hidden>
          <h4 class="hw-panel__title">Macro recorder</h4>
          <div class="hw-macro-actions">
            <button type="button" class="gui-btn gui-btn--primary" id="hw-rec-btn" onclick="hwToggleRecord()">● Record</button>
            <button type="button" class="gui-btn gui-btn--outline" onclick="hwAddMacroStep()">+ Add step</button>
            <button type="button" class="gui-btn gui-btn--outline" onclick="hwClearMacro()">Clear</button>
          </div>
          <ol class="hw-macro-list" id="hw-macro-list"></ol>
          <button type="button" class="gui-btn gui-btn--outline" onclick="hwAssignMacroToSelection()">Gán macro → nút đang chọn</button>
        </div>
      </aside>
    </div>
    <div class="hw-lab__fw-overlay" id="hw-fw-overlay" hidden>
      <p class="hw-fw-title">Firmware update</p>
      <div class="hw-fw-bar"><div class="hw-fw-fill" id="hw-fw-fill"></div></div>
      <p class="hw-fw-warn">Không rút dây hoặc tắt thiết bị.</p>
    </div>
  </div>
</div>`;

export const HARDWARE_LAB_SCRIPT = `
var hwState = {
  mode: 'connected',
  selected: null,
  bindings: { L: 'default', R: 'default', M: 'default', S1: 'default', S2: 'default' },
  dpi: 1600,
  ledColor: '#00ff00',
  ledZones: { body: true, wheel: false, logo: false },
  ledFx: 'static',
  macroSteps: [],
  recording: false,
  battery: 78,
  fwTimer: null
};

function hwSnapDpi(v) {
  v = Math.max(100, Math.min(16000, Number(v) || 1600));
  return Math.round(v / 50) * 50;
}

function hwLocked() {
  return hwState.mode === 'disconnect' || hwState.mode === 'sleep' || hwState.mode === 'firmware';
}

function hwRenderStatus() {
  var badge = document.getElementById('hw-status-badge');
  var bat = document.getElementById('hw-battery');
  var banner = document.getElementById('hw-banner');
  var lab = document.getElementById('hw-lab');
  var wrap = document.getElementById('hw-canvas-wrap');
  if (!badge || !lab) return;

  lab.classList.remove('hw-lab--disconnect', 'hw-lab--sleep', 'hw-lab--firmware', 'hw-lab--lowbat');
  wrap && wrap.classList.toggle('hw-lab--dim', hwState.mode === 'disconnect' || hwState.mode === 'sleep');

  if (hwState.mode === 'connected' || hwState.mode === 'lowbat') {
    badge.className = 'gui-badge gui-badge--connected hw-lab__status';
    badge.innerHTML = '<span class="gui-badge__dot"></span>Connected';
    banner.hidden = true;
  } else if (hwState.mode === 'disconnect') {
    badge.className = 'gui-badge gui-badge--error hw-lab__status';
    badge.innerHTML = '<span class="gui-badge__dot"></span>Disconnected';
    banner.hidden = false;
    banner.textContent = 'Vui lòng kết nối thiết bị để thay đổi cấu hình.';
    lab.classList.add('hw-lab--disconnect');
  } else if (hwState.mode === 'sleep') {
    badge.className = 'gui-badge gui-badge--connected hw-lab__status';
    badge.innerHTML = '<span class="gui-badge__dot"></span>Sleep';
    banner.hidden = false;
    banner.textContent = 'Nhấn phím bất kỳ trên thiết bị để đánh thức.';
    lab.classList.add('hw-lab--sleep');
  } else if (hwState.mode === 'firmware') {
    badge.className = 'gui-badge gui-badge--updating hw-lab__status';
    badge.innerHTML = '<span class="gui-badge__dot"></span>Updating…';
    banner.hidden = true;
    lab.classList.add('hw-lab--firmware');
  }

  if (hwState.mode === 'lowbat') lab.classList.add('hw-lab--lowbat');

  var pct = hwState.battery;
  var batClass = pct <= 15 ? 'cs-battery--low' : 'cs-battery--ok';
  var icon = pct <= 15 ? '⚠' : '🔋';
  bat.className = 'hw-lab__battery gui-battery ' + batClass;
  bat.textContent = icon + ' ' + pct + '%' + (pct <= 15 ? ' · Sạc ngay' : '');

  hwSyncControlDisabled();
}

function hwSyncControlDisabled() {
  var lock = hwLocked();
  document.querySelectorAll('#hw-lab input, #hw-lab select, #hw-lab .hw-hotspot, #hw-lab .hw-nav-item, #hw-lab .gui-btn').forEach(function (el) {
    if (el.closest('.hw-lab__toolbar')) return;
    if (el.id === 'hw-fw-overlay') return;
    el.disabled = lock && !el.classList.contains('hw-tb-btn');
  });
  var ov = document.getElementById('hw-fw-overlay');
  if (ov) ov.hidden = hwState.mode !== 'firmware';
}

function hwSimulate(kind) {
  if (hwState.fwTimer) { clearInterval(hwState.fwTimer); hwState.fwTimer = null; }
  if (kind === 'firmware') {
    hwState.mode = 'firmware';
    hwRenderStatus();
    var fill = document.getElementById('hw-fw-fill');
    var p = 0;
    if (fill) fill.style.width = '0%';
    hwState.fwTimer = setInterval(function () {
      p += 4;
      if (fill) fill.style.width = p + '%';
      if (p >= 100) {
        clearInterval(hwState.fwTimer);
        hwState.fwTimer = null;
        hwState.mode = 'connected';
        hwRenderStatus();
        hwLog('Firmware OK · device rebooted');
      }
    }, 120);
    return;
  }
  if (kind === 'lowbat') { hwState.mode = 'lowbat'; hwState.battery = 12; hwRenderStatus(); return; }
  if (kind === 'disconnect') { hwState.mode = 'disconnect'; hwRenderStatus(); hwLog('Transport lost'); return; }
  if (kind === 'sleep') { hwState.mode = 'sleep'; hwRenderStatus(); return; }
  hwState.mode = 'connected';
  if (hwState.battery < 20) hwState.battery = 78;
  hwRenderStatus();
  hwLog('Link up · ready');
}

function hwLog(msg) {
  var el = document.getElementById('hw-device-log');
  if (el) el.textContent = 'HID report: ' + msg;
}

function hwSwitchTab(tab) {
  document.querySelectorAll('.hw-nav-item').forEach(function (b) {
    b.classList.toggle('hw-nav-item--on', b.getAttribute('data-hw-tab') === tab);
  });
  document.querySelectorAll('.hw-panel').forEach(function (p) {
    p.hidden = p.getAttribute('data-hw-panel') !== tab;
  });
}

function hwSelectButton(id) {
  if (hwLocked()) return;
  hwState.selected = id;
  document.querySelectorAll('.hw-hotspot').forEach(function (h) {
    h.classList.toggle('hw-hotspot--selected', h.getAttribute('data-btn') === id);
  });
  var label = document.getElementById('hw-sel-label');
  var sel = document.getElementById('hw-action');
  var apply = document.getElementById('hw-apply-remap');
  if (label) label.textContent = id;
  if (sel) { sel.disabled = false; sel.value = hwState.bindings[id] || 'default'; }
  if (apply) apply.disabled = false;
  var hint = document.getElementById('hw-assign-hint');
  if (hint) hint.textContent = 'Chỉnh action rồi Apply — ghi xuống onboard memory.';
  hwLog('SELECT btn=' + id);
}

function hwAssignAction(val) {
  if (!hwState.selected) return;
  hwState.bindings[hwState.selected] = val;
}

function hwApplyRemap() {
  if (!hwState.selected || hwLocked()) return;
  var fb = document.getElementById('hw-remap-save');
  if (fb) { fb.textContent = 'Đang ghi…'; fb.className = 'hw-save-feedback is-saving'; }
  setTimeout(function () {
    if (fb) { fb.textContent = '✓ Đã lưu vào bộ nhớ thiết bị · ' + hwState.selected + ' → ' + hwState.bindings[hwState.selected]; fb.className = 'hw-save-feedback is-ok'; }
    hwLog('SET_BINDING ' + hwState.selected + '=' + hwState.bindings[hwState.selected]);
  }, 550);
}

function hwDpiFromSlider(v) { hwSetDpi(hwSnapDpi(v)); }
function hwDpiFromInput(v) { hwSetDpi(hwSnapDpi(v)); }
function hwDpiPreset(v) { hwSetDpi(hwSnapDpi(v)); }

function hwSetDpi(v) {
  if (hwLocked()) return;
  hwState.dpi = hwSnapDpi(v);
  var num = document.getElementById('hw-dpi-num');
  var range = document.getElementById('hw-dpi-range');
  var input = document.getElementById('hw-dpi-input');
  if (num) num.textContent = hwState.dpi;
  if (range) range.value = hwState.dpi;
  if (input) input.value = hwState.dpi;
  var fb = document.getElementById('hw-dpi-save');
  if (fb) { fb.textContent = 'Đang sync DPI…'; fb.className = 'hw-save-feedback is-saving'; }
  clearTimeout(hwState._dpiT);
  hwState._dpiT = setTimeout(function () {
    if (fb) { fb.textContent = '✓ DPI ' + hwState.dpi + ' · onboard updated'; fb.className = 'hw-save-feedback is-ok'; }
    hwLog('SET_DPI ' + hwState.dpi);
  }, 400);
}

function hwLedPreview(hex) {
  hwState.ledColor = hex;
  hwApplyLedGlow();
}

function hwLedZone(zone, on) {
  hwState.ledZones[zone] = on;
  hwApplyLedGlow();
}

function hwLedFx(fx) { hwState.ledFx = fx; hwLog('LED_FX ' + fx); }

function hwApplyLedGlow() {
  var el = document.getElementById('hw-mouse-led');
  if (!el || !hwState.ledZones.body) { if (el) el.style.opacity = '0'; return; }
  el.style.background = hwState.ledColor;
  el.style.opacity = hwState.ledFx === 'breathing' ? '0.85' : '1';
  el.classList.toggle('hw-mouse-led--wave', hwState.ledFx === 'wave');
}

function hwLedApply() {
  if (hwLocked()) return;
  var fb = document.getElementById('hw-led-save');
  if (fb) { fb.textContent = 'Realtime preview → device…'; fb.className = 'hw-save-feedback is-saving'; }
  setTimeout(function () {
    if (fb) { fb.textContent = '✓ LED zones synced'; fb.className = 'hw-save-feedback is-ok'; }
    hwLog('SET_LED ' + hwState.ledColor);
  }, 500);
}

function hwToggleRecord() {
  if (hwLocked()) return;
  hwState.recording = !hwState.recording;
  var btn = document.getElementById('hw-rec-btn');
  if (btn) btn.textContent = hwState.recording ? '■ Stop' : '● Record';
  if (hwState.recording) hwLog('MACRO_REC start');
  else hwLog('MACRO_REC stop · ' + hwState.macroSteps.length + ' steps');
}

function hwRenderMacro() {
  var list = document.getElementById('hw-macro-list');
  if (!list) return;
  list.innerHTML = hwState.macroSteps.map(function (s, i) {
    return '<li><span class="hw-macro-idx">' + (i + 1) + '.</span> ' + s.action + ' <span class="hw-macro-delay">' + s.delay + 'ms</span></li>';
  }).join('');
}

function hwAddMacroStep() {
  if (hwLocked()) return;
  var n = hwState.macroSteps.length + 1;
  hwState.macroSteps.push({ action: 'Click L @ (' + (120 + n * 8) + ',' + (200 + n * 3) + ')', delay: 50 + n * 15 });
  hwRenderMacro();
  if (hwState.recording) hwLog('MACRO step added');
}

function hwClearMacro() {
  hwState.macroSteps = [];
  hwRenderMacro();
}

function hwAssignMacroToSelection() {
  if (!hwState.selected || hwLocked()) return;
  hwState.bindings[hwState.selected] = 'macro';
  var sel = document.getElementById('hw-action');
  if (sel) sel.value = 'macro';
  hwLog('BIND macro → ' + hwState.selected);
}

function hwLabInit() {
  hwRenderStatus();
  hwApplyLedGlow();
  hwRenderMacro();
  hwLog('ready · click hotspot');
}

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('hw-lab')) hwLabInit();
});
`;
