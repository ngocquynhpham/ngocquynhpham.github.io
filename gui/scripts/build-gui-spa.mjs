/**
 * Generate gui/gui.html — GUI Design System (utility apps for HID devices)
 * node gui/scripts/build-gui-spa.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  BUTTONS_DOC,
  SLIDER_DOC,
  SWITCH_DOC,
  CONNECTION_BADGE_DOC,
  DEVICE_VISUALIZER_DOC,
  ERROR_GUIDELINES_DOC,
  genericComponentDoc,
  COMPONENT_ASSETS,
} from './component-docs.mjs';
import {
  CASE_STUDY_OVERVIEW_DOC,
  CASE_STUDY_GUI_DOC,
  CASE_STUDY_TOKENS_DOC,
  CASE_STUDY_COMPONENTS_DOC,
  CASE_STUDY_STATES_DOC,
  CASE_STUDY_MOCK_HTML,
} from './case-study-synapse.mjs';
import { VISUAL_GUIDE_PANEL_HTML, APP_PREVIEW_HTML } from './gui-visual.mjs';
import {
  ARCH_LAYOUT_IA_DOC,
  ARCH_COMPONENT_LIBRARY_DOC,
  ARCH_DEVICE_STATES_DOC,
  ARCH_UX_PRINCIPLES_DOC,
  MACRO_RECORDER_DOC,
  COLOR_LED_DOC,
} from './architecture-hid-gui.mjs';
import { HARDWARE_LAB_HTML, HARDWARE_LAB_SCRIPT } from './hardware-lab.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'gui.html');
const BRANDS_IMG = path.join(__dirname, '..', '..', 'brands', 'assets', 'images');
const BRAND = 'GUI';
const STORAGE = 'gui';

const PH_BG = '0d1117';
const PH_FG = '58d68d';

const ph = (label, w = 800, h = 450) => {
  const text = encodeURIComponent(`GUI DS · ${label}`.slice(0, 48));
  return `https://placehold.co/${w}x${h}/${PH_BG}/${PH_FG}/png?text=${text}`;
};

function brandsRel(platform, ...parts) {
  const abs = path.join(BRANDS_IMG, platform, ...parts);
  if (fs.existsSync(abs)) {
    return ['..', 'brands', 'assets', 'images', platform, ...parts].join('/').replace(/\\/g, '/');
  }
  return null;
}

function fig(label, cap, assetParts) {
  let src = ph(label);
  if (assetParts) {
    const rel = brandsRel(assetParts[0], ...assetParts.slice(1));
    if (rel) src = rel;
  }
  return { src, cap: cap || label };
}

const SECTIONS = [
  {
    label: 'Start',
    items: [
      {
        id: 'visual-guide',
        platform: 'all',
        title: 'Hình dung GUI',
        desc: 'GUI = cả cửa sổ desktop (layout), không phải từng widget lẻ. Hướng dẫn trực quan tiếng Việt + mock hai màn Dashboard / Cấu hình chuột.',
        bullets: [
          'Ba tầng: phần cứng HID → GUI (app) → Design System (mảnh ghép)',
          'Mock có nhãn vùng: menu trái, hình thiết bị, slider dưới',
          'Bấm tab ① / ② trên mock để đổi màn hình',
        ],
        figures: [],
      },
      {
        id: 'hw-lab',
        platform: 'device',
        title: 'Hardware Lab (live)',
        desc: 'Sandbox runtime như GUI dev ship: Device Map hotspots, DPI (bước 50), LED multi-zone, macro steps, pin/signal, overlay firmware + disconnect.',
        bullets: [
          'Buttons: hotspot → action → Apply · log HID report',
          'Performance / Lighting / Macro — tab trái; canvas giữa luôn là device map',
          'Toolbar: Connected · Disconnect · Sleep · Firmware · Pin yếu',
        ],
        figures: [],
      },
      {
        id: 'overview',
        platform: 'all',
        title: 'Overview',
        desc: 'GUI Design System — tokens, components, and behavior guidelines for desktop utility apps that configure Human Interface Devices (keyboards, mice, controllers). Dark-first shells (Electron, WPF, Qt). Complements Quinn TV docs in brands/.',
        bullets: [
          'Design tokens — brand, semantic device status, spacing',
          'Component library — controls, status, device visualizer',
          'Case study — Synapse / G Hub pattern + interactive mock',
        ],
        figures: [fig('App shell', 'Sidebar + header + canvas'), fig('Device utility', 'Configurator layout')],
      },
      {
        id: 'layout',
        platform: 'shell',
        title: 'App shell layout',
        desc: 'Standard three-zone layout for device utilities: header (device + status), sidebar (capabilities), main (visualizer + settings).',
        bullets: [
          'Header: device picker, connection badge, battery',
          'Sidebar: Lighting, Performance, Macros, Settings',
          'Main: visualizer top, detail controls below',
        ],
        figures: [fig('Shell wireframe', 'Zones')],
      },
      {
        id: 'changelog',
        platform: 'all',
        title: 'Changelog',
        desc: 'GUI DS v0.4 — Kiến trúc HID GUI (Layout/IA, thư viện, trạng thái, UX).',
        bullets: [
          'v0.4 — Architecture section (VN) + macro / LED components',
          'v0.3 — Synapse case study + visual guide',
          'Import gui/tokens.css in Electron or WPF host',
        ],
        figures: [fig('Roadmap', 'Previews → Figma')],
      },
    ],
  },
  {
    label: 'Kiến trúc · HID GUI',
    items: [
      {
        id: 'arch-layout',
        platform: 'shell',
        title: 'Layout & IA',
        desc: 'Ba vùng: Device Canvas (giữa), Configuration Sidebar (Remap / Performance / Lighting), Profile Management (top bar). Mục tiêu: cấu hình & cá nhân hóa thiết bị trực quan.',
        doc: ARCH_LAYOUT_IA_DOC,
      },
      {
        id: 'arch-library',
        platform: 'all',
        title: 'Thư viện component HID',
        desc: 'Device map, macro recorder, slider+DPI, color/LED zone, battery & signal — tương tác phần mềm ↔ phần cứng.',
        doc: ARCH_COMPONENT_LIBRARY_DOC,
      },
      {
        id: 'arch-device-states',
        platform: 'device',
        title: 'Trạng thái thiết bị',
        desc: 'Connected, disconnected/sleep, firmware updating, error/low battery — realtime sync lên GUI.',
        doc: ARCH_DEVICE_STATES_DOC,
      },
      {
        id: 'arch-ux',
        platform: 'all',
        title: 'Nguyên tắc UX',
        desc: 'Zero perceived latency, tooltip giải thích thuật ngữ, dark mode mặc định.',
        doc: ARCH_UX_PRINCIPLES_DOC,
      },
      {
        id: 'arch-product',
        platform: 'all',
        title: 'Nền tảng & đối tượng',
        desc: 'Design System giữ nguyên component; shell và copy thay theo sản phẩm — chọn dimension khi implement.',
        bullets: [
          'Windows / macOS desktop (Synapse, G Hub) — layout 3 vùng, chuột + bàn phím',
          'Mobile BLE companion — dashboard + ít slider, pin/signal quan trọng hơn',
          'Embedded touch trên thiết bị — canvas = chính mặt thiết bị, sidebar thu gọn',
          'Gamer vs văn phòng vs công nghiệp/y tế — jargon tooltips bật mức “pro” hoặc “plain”',
        ],
        figures: [fig('Product matrix', 'Platform × audience')],
      },
    ],
  },
  {
    label: '1 · Design tokens',
    items: [
      {
        id: 'f-color',
        platform: 'all',
        title: 'Color',
        desc: 'Primary brand, neutral surfaces (dark-first), and semantic colors tied to device state. Gaming utilities often fix #111111 / #1F1F1F — see Case study tokens.',
        bullets: [
          'Primary — brand accent (slider thumb, active nav)',
          'Connected / updating / error / warning',
          'Optional data-product-theme for Razer / Logitech accents',
        ],
        figures: [
          fig('Semantic status', 'Connected · Error', ['web', 'foundation/color', 'Mass_color_1.png']),
          fig('Dark surfaces', 'Utility chrome'),
        ],
      },
      {
        id: 'f-type',
        platform: 'all',
        title: 'Typography',
        desc: 'Inter, Segoe UI, or Roboto — clear hierarchy for dense settings. Tabular figures for DPI and polling values.',
        bullets: ['Title / section / body / caption / mono data', '11–14px body in sidebars', '16–20px panel titles'],
        figures: [fig('Type roles', 'Utility density', ['web', 'foundation/typography', 'Mass_typography_2.png'])],
      },
      {
        id: 'f-spacing',
        platform: 'all',
        title: 'Spacing & grid',
        desc: '4px base, 8px rhythm — consistent padding in sidebar rows and control groups.',
        bullets: ['4, 8, 12, 16, 24, 32', 'Align labels to 8px grid', 'Min 12px between unrelated groups'],
        figures: [fig('Spacing scale', '8px grid', ['web', 'foundation/layout', 'Mass_layout_2.png'])],
      },
    ],
  },
  {
    label: '2 · Components · Shell',
    items: [
      { id: 'c-nav', platform: 'shell', title: 'Sidebar navigation', desc: 'Capability-based sections; icon + label; active state matches device context.' },
      { id: 'c-header', platform: 'shell', title: 'Device header', desc: 'Product name, profile dropdown, connection badge, battery widget.' },
      {
        id: 'c-connection',
        platform: 'device',
        title: 'Connection badge',
        desc: 'Live transport status in the header — connected, updating firmware, disconnected.',
        doc: CONNECTION_BADGE_DOC,
      },
      { id: 'c-battery', platform: 'device', title: 'Battery widget', desc: 'Percent + charging state for wireless HID; warn below 15%.' },
      { id: 'c-toast', platform: 'shell', title: 'Toast', desc: 'Non-blocking feedback — profile saved, minor retry.' },
      { id: 'c-modal', platform: 'shell', title: 'Modal & dialog', desc: 'Destructive reset, firmware failure, incompatible device.' },
    ],
  },
  {
    label: '2 · Components · Controls',
    items: [
      { id: 'c-buttons', platform: 'controls', title: 'Buttons', desc: 'Apply to device, save profile, revert.', doc: BUTTONS_DOC },
      { id: 'c-slider', platform: 'controls', title: 'Slider', desc: 'DPI, brightness, polling rate, deadzone.', doc: SLIDER_DOC },
      { id: 'c-switch', platform: 'controls', title: 'Toggle switch', desc: 'Wireless, RGB sync, game mode.', doc: SWITCH_DOC },
      { id: 'c-dropdown', platform: 'controls', title: 'Dropdown', desc: 'LED effects, profile slot, layout preset.' },
      { id: 'c-tabs', platform: 'controls', title: 'Tabs', desc: 'Sub-sections within Lighting or Performance.' },
      { id: 'c-loading', platform: 'controls', title: 'Progress & loading', desc: 'Firmware flash, syncing profile to device.' },
    ],
  },
  {
    label: '2 · Components · Device',
    items: [
      {
        id: 'c-visualizer',
        platform: 'device',
        title: 'Device visualizer',
        desc: '2D/3D map of hardware — click keys for remap or per-key RGB.',
        doc: DEVICE_VISUALIZER_DOC,
      },
      { id: 'c-keycap', platform: 'device', title: 'Key / button cell', desc: 'Atomic interactive region on the visualizer canvas.' },
      { id: 'c-firmware', platform: 'device', title: 'Firmware banner', desc: 'Inline update available — version, size, CTA.' },
      { id: 'c-macro', platform: 'device', title: 'Macro recorder', desc: 'Timeline / step list, delay ms, assign to button on canvas.', doc: MACRO_RECORDER_DOC },
      { id: 'c-color-led', platform: 'device', title: 'Color picker & LED zone', desc: 'Multi-zone selection, effects, realtime preview.', doc: COLOR_LED_DOC },
    ],
  },
  {
    label: '3 · Guidelines',
    items: [
      {
        id: 'g-states',
        platform: 'all',
        title: 'Interaction states',
        desc: 'How controls look across default, hover, active, focus-visible, disabled, loading, and device-pending.',
        bullets: [
          'Never remove focus ring on desktop utilities',
          'Disabled = lower contrast + no pointer events',
          'Loading blocks duplicate device writes',
        ],
        figures: [fig('State matrix', 'Controls')],
      },
      {
        id: 'g-errors',
        platform: 'all',
        title: 'Error & disconnect',
        desc: 'Behavior when the HID link drops or firmware fails — banners, modals, toasts.',
        doc: ERROR_GUIDELINES_DOC,
      },
      {
        id: 'g-apply',
        platform: 'all',
        title: 'Apply to device',
        desc: 'When settings commit immediately vs explicit Apply — consistent copy and undo.',
        bullets: [
          'Immediate: low-risk toggles with fast ACK',
          'Explicit Apply: macro tables, lighting zones',
          'Revert restores last synced profile',
        ],
        figures: [fig('Apply flow', 'Sync')],
      },
      {
        id: 'g-a11y',
        platform: 'all',
        title: 'Accessibility',
        desc: 'Keyboard path through sidebar and visualizer; ARIA on custom sliders; don’t rely on color alone for connection status.',
        bullets: ['Name + role on icon buttons', 'Live regions for connect/disconnect', 'Contrast on dark surfaces'],
        figures: [fig('A11y', 'Checklist')],
      },
    ],
  },
  {
    label: 'Case study · Synapse / G Hub',
    items: [
      {
        id: 'cs-overview',
        platform: 'all',
        title: 'GUI vs Design System',
        desc: 'Reference pattern from Razer Synapse and Logitech G Hub — classic HID configuration GUIs. Educational; not affiliated with either brand.',
        doc: CASE_STUDY_OVERVIEW_DOC,
      },
      {
        id: 'cs-screens',
        platform: 'shell',
        title: 'On-screen layout',
        desc: 'Dashboard device grid and detail view — Performance, Lighting, Buttons, visualizer, DPI slider.',
        doc: CASE_STUDY_GUI_DOC,
      },
      {
        id: 'cs-tokens',
        platform: 'all',
        title: 'Visual tokens (example)',
        desc: 'Dark shell #111 / #1F1F, accent for active controls, typography for DPI numerals vs 12px body.',
        doc: CASE_STUDY_TOKENS_DOC,
      },
      {
        id: 'cs-hardware',
        platform: 'device',
        title: 'Hardware components',
        desc: 'DPI slider steps, device image mapper anchors, four-state battery indicator.',
        doc: CASE_STUDY_COMPONENTS_DOC,
      },
      {
        id: 'cs-states',
        platform: 'all',
        title: 'Connection & save states',
        desc: 'Connected vs disconnected (opacity, disabled controls, banner). Spinner → checkmark when writing to device.',
        doc: CASE_STUDY_STATES_DOC,
      },
      {
        id: 'cs-demo',
        platform: 'all',
        title: 'Interactive mock',
        desc: 'Mini dashboard + mouse Performance panel. Use “Simulate unplug” to validate disconnect rules from the case study.',
        bullets: [
          'Dashboard cards — battery + transport badge',
          'Detail — nav, mouse hit targets, DPI slider',
          'Disconnect — banner, dim visualizer, lock slider',
        ],
        figures: [fig('Case study mock', 'Wireframe')],
      },
    ],
  },
];

const DOC_BY_ID = {
  'c-buttons': BUTTONS_DOC,
  'c-slider': SLIDER_DOC,
  'c-switch': SWITCH_DOC,
  'c-connection': CONNECTION_BADGE_DOC,
  'c-visualizer': DEVICE_VISUALIZER_DOC,
  'g-errors': ERROR_GUIDELINES_DOC,
  'cs-overview': CASE_STUDY_OVERVIEW_DOC,
  'cs-screens': CASE_STUDY_GUI_DOC,
  'cs-tokens': CASE_STUDY_TOKENS_DOC,
  'cs-hardware': CASE_STUDY_COMPONENTS_DOC,
  'cs-states': CASE_STUDY_STATES_DOC,
  'arch-layout': ARCH_LAYOUT_IA_DOC,
  'arch-library': ARCH_COMPONENT_LIBRARY_DOC,
  'arch-device-states': ARCH_DEVICE_STATES_DOC,
  'arch-ux': ARCH_UX_PRINCIPLES_DOC,
  'c-macro': MACRO_RECORDER_DOC,
  'c-color-led': COLOR_LED_DOC,
};

for (const sec of SECTIONS) {
  for (const item of sec.items) {
    if (DOC_BY_ID[item.id]) item.doc = DOC_BY_ID[item.id];
    else if (item.id.startsWith('c-') && item.doc === undefined) {
      const title = item.title.replace(/\s*\([^)]*\)\s*$/, '');
      item.doc = genericComponentDoc(item.title, item.desc);
      const asset = COMPONENT_ASSETS[title];
      if (asset && item.doc.sections[0]?.blocks) {
        item.doc.sections[0].blocks.push({ t: 'figure', label: `${item.title} spec`, asset });
      }
    }
  }
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function resolveFigureSrc(block, fallbackLabel) {
  if (block.asset) {
    const rel = brandsRel(block.asset[0], ...block.asset.slice(1));
    if (rel) return rel;
  }
  return ph(block.label || fallbackLabel);
}

function figHtml(f) {
  return `<figure class="figure">
  <img src="${esc(f.src)}" alt="" loading="lazy" />
  <figcaption>${esc(f.cap)}</figcaption>
</figure>`;
}

function renderBlock(block) {
  switch (block.t) {
    case 'p':
      return `<p class="doc-p">${esc(block.text)}</p>`;
    case 'h4':
      return `<h4 class="doc-h4">${esc(block.text)}</h4>`;
    case 'ol':
      return `<ol class="doc-list">${block.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ol>`;
    case 'ul':
      return `<ul class="doc-list">${block.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
    case 'numbered':
      return `<ol class="doc-numbered">${block.items
        .map((item, i) => {
          const label = item.prefix ? `${item.prefix} ${item.title}` : item.title;
          return `<li class="doc-numbered-item">
            <span class="doc-numbered-idx">${i + 1}.</span>
            <div class="doc-numbered-body">
              <strong class="doc-numbered-title">${esc(label)}</strong>
              <p class="doc-numbered-desc">${esc(item.text)}</p>
            </div>
          </li>`;
        })
        .join('')}</ol>`;
    case 'figure':
      return figHtml({ src: resolveFigureSrc(block, 'Spec'), cap: block.label || 'Spec' });
    case 'table': {
      const head = block.headers.map((h) => `<th>${esc(h)}</th>`).join('');
      const rows = block.rows
        .map((row) => `<tr>${row.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`)
        .join('');
      return `<div class="doc-table-wrap"><table class="doc-table"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    default:
      return '';
  }
}

const OVERVIEW_LIVE = `<div class="card">
  <div class="card-title">Live preview (gui/tokens.css)</div>
  <div class="live-demos live-demos--stack">
    <div class="demo-row">
      <span class="gui-badge gui-badge--connected"><span class="gui-badge__dot"></span>Connected</span>
      <span class="gui-badge gui-badge--updating"><span class="gui-badge__dot"></span>Updating…</span>
      <span class="gui-badge gui-badge--error"><span class="gui-badge__dot"></span>Disconnected</span>
      <span class="gui-battery" aria-label="Battery 78%">🔋 78%</span>
    </div>
    <div class="demo-row">
      <button type="button" class="gui-btn gui-btn--primary">Apply to device</button>
      <button type="button" class="gui-btn gui-btn--outline">Revert</button>
      <label class="gui-switch"><input type="checkbox" checked /><span class="gui-switch__track"></span>Wireless</label>
    </div>
    <div class="demo-row demo-row--slider">
      <span class="gui-label">DPI</span>
      <input type="range" class="gui-slider" min="400" max="3200" value="1600" aria-label="DPI" />
      <span class="gui-value mono">1600</span>
    </div>
  </div>
</div>`;

const HW_LAB_LINK = `<div class="card hw-lab-link-card">
  <div class="card-title">Interactive build</div>
  <p class="doc-p" style="margin:0 0 10px">Component này chạy trong <strong>Hardware Lab</strong> — bấm để mở sandbox.</p>
  <button type="button" class="gui-btn gui-btn--primary" onclick="show('hw-lab')">Mở Hardware Lab →</button>
</div>`;

function liveBlockForItem(item) {
  if (item.id === 'hw-lab') return HARDWARE_LAB_HTML;
  if (['c-visualizer', 'c-slider', 'c-macro', 'c-color-led', 'c-battery', 'c-connection', 'arch-library'].includes(item.id)) {
    return HW_LAB_LINK;
  }
  if (item.id === 'visual-guide') return VISUAL_GUIDE_PANEL_HTML;
  if (item.id === 'arch-layout' || item.id === 'layout') return APP_PREVIEW_HTML;
  if (item.id === 'arch-device-states') {
    return `<div class="card"><div class="card-title">Trạng thái (demo)</div><div class="live-demos">
      <span class="gui-badge gui-badge--connected"><span class="gui-badge__dot"></span>Connected</span>
      <span class="gui-badge gui-badge--updating"><span class="gui-badge__dot"></span>Firmware 42%</span>
      <span class="gui-badge gui-badge--error"><span class="gui-badge__dot"></span>Disconnected</span>
    </div><p class="doc-p vg-foot">Updating = khóa slider; disconnected = grey-out canvas (xem Case study mock).</p></div>`;
  }
  if (item.id === 'cs-demo') return CASE_STUDY_MOCK_HTML;
  if (item.id === 'cs-tokens') {
    return `<div class="card"><div class="card-title">Token preview · gaming-razer</div>
    <div class="cs-mock cs-mock--swatch" data-product-theme="gaming-razer">
      <div class="cs-swatch cs-swatch--bg0"><span class="mono">#111 bg-0</span></div>
      <div class="cs-swatch cs-swatch--bg1"><span class="mono">#1F1F bg-1</span></div>
      <div class="cs-swatch cs-swatch--accent"><span class="mono">accent</span></div>
    </div></div>`;
  }
  if (item.id === 'overview') return APP_PREVIEW_HTML;
  if (item.id === 'layout') return OVERVIEW_LIVE;
  if (item.id === 'c-buttons') return OVERVIEW_LIVE;
  if (item.id === 'c-connection') {
    return `<div class="card"><div class="card-title">Live preview</div><div class="live-demos">
      <span class="gui-badge gui-badge--connected"><span class="gui-badge__dot"></span>Connected</span>
      <span class="gui-badge gui-badge--updating"><span class="gui-badge__dot"></span>Updating…</span>
      <span class="gui-badge gui-badge--error"><span class="gui-badge__dot"></span>Disconnected</span>
    </div></div>`;
  }
  return '';
}

function panelDocHtml(item) {
  const doc = item.doc;
  const pillars = doc.pillars
    .map((p) => `<div class="pillar"><strong>${esc(p.title)}</strong><span>${esc(p.text)}</span></div>`)
    .join('');
  const sections = doc.sections
    .map((sec) => {
      const body = sec.blocks.map((b) => renderBlock(b)).join('\n');
      return `<article class="doc-section" id="sec-${item.id}-${sec.id}" data-doc-section>
        <h3 class="doc-h3">${esc(sec.title)}</h3>
        ${body}
      </article>`;
    })
    .join('\n');
  const toc = doc.sections
    .map(
      (sec) =>
        `<a class="doc-toc-link" href="#sec-${item.id}-${sec.id}" data-toc-href="#sec-${item.id}-${sec.id}">${esc(sec.title)}</a>`
    )
    .join('');

  return `<section class="panel panel--doc" id="panel-${item.id}" data-platform="${item.platform}">
  <div class="doc-layout">
    <div class="doc-body">
      <header class="panel-header">
        <h2>${esc(item.title)}</h2>
        <p class="panel-desc">${esc(item.desc)}</p>
      </header>
      ${liveBlockForItem(item)}
      <div class="pillar-grid">${pillars}</div>
      ${sections}
    </div>
    <aside class="doc-toc" aria-label="On this page">
      <div class="doc-toc-rail"><div class="doc-toc-marker" id="toc-marker-${item.id}"></div></div>
      <div class="doc-toc-inner">
        <div class="doc-toc-title">On this page</div>
        ${toc}
      </div>
    </aside>
  </div>
</section>`;
}

function panelHtml(item) {
  if (item.doc) return panelDocHtml(item);
  const bullets = (item.bullets || []).map((b) => `<li>${esc(b)}</li>`).join('');
  const figures = (item.figures || []).map(figHtml).join('\n');
  return `<section class="panel" id="panel-${item.id}" data-platform="${item.platform}">
  <header class="panel-header">
    <h2>${esc(item.title)}</h2>
    <p class="panel-desc">${esc(item.desc)}</p>
  </header>
  ${liveBlockForItem(item)}
  <div class="card">
    <div class="card-title">Key points</div>
    <ul class="bullet-list">${bullets}</ul>
  </div>
  <div class="figure-grid">${figures}</div>
</section>`;
}

function navHtml() {
  return SECTIONS.map((sec) => {
    const items = sec.items
      .map(
        (it) =>
          `<div class="nav-item" onclick="show('${it.id}')" data-panel="${it.id}" data-platform="${it.platform}">
        <span class="nav-dot"></span>${esc(it.title)}
      </div>`
      )
      .join('');
    return `<div class="nav-section">
      <div class="nav-section-label">${esc(sec.label)}</div>
      ${items}
    </div>`;
  }).join('');
}

const panels = SECTIONS.flatMap((s) => s.items).map(panelHtml).join('\n');
const favicon = ph('G', 32, 32);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
<title>GUI Design System</title>
<meta name="description" content="Design tokens, components, and guidelines for desktop GUI apps that configure HID devices." />
<link rel="icon" href="${favicon}" />
<link rel="stylesheet" href="tokens.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" />
<style>
:root {
  --bg: hsl(220, 13%, 9%);
  --bg2: hsl(220, 10%, 12%);
  --bg3: hsl(220, 12%, 16%);
  --border: hsla(0, 0%, 100%, 0.08);
  --fg: hsl(0, 0%, 96%);
  --fg2: hsl(0, 0%, 65%);
  --fg3: hsl(0, 0%, 48%);
  --accent: hsl(155, 100%, 65%);
  --accent-bg: hsla(155, 100%, 65%, 0.12);
  --status-connected: hsl(152, 60%, 48%);
  --status-updating: hsl(38, 92%, 55%);
  --status-error: hsl(4, 72%, 58%);
  --sidebar-w: 268px; --radius: 8px;
  --font-sans: 'Inter', 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  color-scheme: dark;
}
:root[data-theme="light"] {
  --bg: #f4f6f8; --bg2: #ffffff; --bg3: #e8ecf0; --border: #d0d7de;
  --fg: #121212; --fg2: #424a53; --fg3: #656d76;
  --accent: hsl(155, 70%, 32%);
  --accent-bg: hsla(155, 100%, 65%, 0.14);
  color-scheme: light;
}
*, *::before, *::after { box-sizing: border-box; }
html, body { height: 100%; margin: 0; }
body { font-family: var(--font-sans); background: var(--bg); color: var(--fg); font-size: 14px; line-height: 1.6; display: flex; flex-direction: column; min-height: 100%; }
.mono { font-family: var(--font-mono); font-size: 12px; }
.topbar {
  position: sticky; top: 0; z-index: 100; background: var(--bg2);
  border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 8px;
  padding: 10px 16px; flex-wrap: wrap;
}
.topbar-title { font-size: 15px; font-weight: 700; flex: 1; min-width: 200px; }
.topbar-title span { color: var(--accent); }
.topbar-badge { font-size: 11px; font-weight: 600; color: var(--fg2); background: var(--bg3); border: 1px solid var(--border); padding: 2px 8px; border-radius: 20px; }
.topbar-link { font-size: 12px; color: var(--fg3); text-decoration: none; }
.topbar-link:hover { color: var(--accent); }
.theme-btn, .plat-btn {
  background: var(--bg3); border: 1px solid var(--border); color: var(--fg2);
  border-radius: 6px; padding: 4px 10px; font-size: 12px; cursor: pointer; font-family: var(--font-sans);
}
.plat-btn.active { background: var(--accent); border-color: var(--accent); color: hsl(0, 0%, 7%); }
.menu-btn { display: none; background: none; border: none; color: var(--fg2); cursor: pointer; font-size: 20px; }
.layout { display: flex; flex: 1; min-height: 0; }
.sidebar {
  width: var(--sidebar-w); min-width: var(--sidebar-w); background: var(--bg2);
  border-right: 1px solid var(--border); overflow-y: auto; padding: 12px 0 32px;
  position: sticky; top: 49px; height: calc(100vh - 49px);
}
.nav-section-label { font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--fg3); padding: 8px 16px 4px; }
.nav-item {
  display: flex; align-items: center; gap: 8px; padding: 6px 16px; font-size: 13px; font-weight: 500;
  color: var(--fg2); cursor: pointer; border-left: 2px solid transparent; transition: all .12s; user-select: none;
}
.nav-item:hover { background: var(--bg3); color: var(--fg); }
.nav-item.active { color: var(--accent); border-left-color: var(--accent); background: var(--accent-bg); }
.nav-item.hidden { display: none; }
.nav-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--fg3); flex-shrink: 0; }
.nav-item.active .nav-dot { background: var(--accent); }
.main { flex: 1; min-width: 0; overflow-y: auto; padding: 28px 28px 48px; }
.panel { display: none; max-width: 100%; }
.panel:not(.panel--doc) { max-width: 920px; }
.panel.active { display: block; }
.panel--doc .doc-layout { display: grid; grid-template-columns: minmax(0, 1fr) 180px; gap: 32px; align-items: start; }
.doc-body { min-width: 0; max-width: 720px; }
.doc-h3 { font-size: 17px; font-weight: 700; margin: 28px 0 12px; padding-top: 8px; scroll-margin-top: 64px; }
.doc-h4 { font-size: 14px; font-weight: 600; margin: 16px 0 8px; }
.doc-p, .doc-list { color: var(--fg2); font-size: 13.5px; line-height: 1.65; }
.doc-table-wrap { overflow-x: auto; margin: 12px 0 18px; border: 1px solid var(--border); border-radius: var(--radius); }
.doc-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
.doc-table th { text-align: left; padding: 10px 12px; background: var(--bg3); color: var(--fg); font-weight: 600; border-bottom: 1px solid var(--border); }
.doc-table td { padding: 10px 12px; border-bottom: 1px solid var(--border); color: var(--fg2); vertical-align: top; line-height: 1.5; }
.doc-table tr:last-child td { border-bottom: none; }
.doc-p { margin: 0 0 12px; }
.doc-list { margin: 0 0 14px; padding-left: 20px; }
.doc-numbered { list-style: none; margin: 0 0 18px; padding: 0; display: flex; flex-direction: column; gap: 20px; }
.doc-numbered-item { display: flex; gap: 10px; align-items: flex-start; }
.doc-numbered-idx { font-size: 15px; font-weight: 700; min-width: 1.5em; }
.doc-numbered-title { display: block; font-size: 15px; font-weight: 700; margin: 0 0 4px; }
.doc-numbered-desc { margin: 0; font-size: 13.5px; color: var(--fg2); }
.pillar-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-bottom: 20px; }
.pillar { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 12px 14px; font-size: 12.5px; color: var(--fg2); }
.pillar strong { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: var(--accent); margin-bottom: 4px; }
.doc-toc { position: sticky; top: 64px; display: flex; max-height: calc(100vh - 80px); }
.doc-toc-rail { width: 2px; background: var(--border); margin-right: 12px; position: relative; min-height: 120px; }
.doc-toc-marker { position: absolute; left: 0; width: 2px; height: 22px; background: var(--accent); transition: transform .2s; }
.doc-toc-link { display: block; font-size: 13px; color: var(--fg3); text-decoration: none; padding: 5px 0; }
.doc-toc-link.active { color: var(--fg); font-weight: 600; }
.panel-header { margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
.panel-header h2 { font-size: 22px; font-weight: 700; margin: 0 0 6px; }
.panel-desc { color: var(--fg2); font-size: 13.5px; margin: 0; max-width: 640px; }
.card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px 18px; margin-bottom: 16px; }
.card-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--fg3); margin-bottom: 10px; }
.bullet-list { margin: 0; padding-left: 18px; color: var(--fg2); font-size: 13.5px; line-height: 1.7; }
.figure-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
.figure { margin: 0; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.figure img { display: block; width: 100%; aspect-ratio: 16/9; object-fit: contain; background: var(--bg3); }
.figure figcaption { font-size: 11px; color: var(--fg3); padding: 8px 10px; border-top: 1px solid var(--border); }
.live-demos { padding: 14px; background: var(--bg3); border-radius: var(--radius); border: 1px solid var(--border); margin: 12px 0 18px; }
.live-demos--stack { display: flex; flex-direction: column; gap: 12px; }
.demo-row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.demo-row--slider { gap: 12px; }
.gui-btn { font-family: var(--font-sans); font-size: 13px; font-weight: 600; border-radius: var(--radius); padding: 8px 14px; cursor: pointer; border: 1px solid transparent; }
.gui-btn--primary { background: var(--accent); color: hsl(0, 0%, 7%); }
.gui-btn--outline { background: transparent; border-color: var(--border); color: var(--fg); }
.gui-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 999px; border: 1px solid var(--border); background: var(--bg2); }
.gui-badge__dot { width: 8px; height: 8px; border-radius: 50%; }
.gui-badge--connected .gui-badge__dot { background: var(--status-connected); }
.gui-badge--updating .gui-badge__dot { background: var(--status-updating); }
.gui-badge--error .gui-badge__dot { background: var(--status-error); }
.gui-battery { font-size: 12px; color: var(--fg2); }
.gui-label { font-size: 12px; color: var(--fg2); min-width: 2.5rem; }
.gui-value { font-size: 12px; color: var(--accent); min-width: 3rem; }
.gui-slider { flex: 1; min-width: 120px; max-width: 280px; accent-color: var(--accent); }
.gui-switch { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer; }
.gui-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.gui-switch__track {
  width: 36px; height: 20px; border-radius: 999px; background: var(--border); position: relative; transition: background .15s;
}
.gui-switch__track::after {
  content: ''; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: transform .15s;
}
.gui-switch input:checked + .gui-switch__track { background: var(--accent); }
.gui-switch input:checked + .gui-switch__track::after { transform: translateX(16px); }
.cs-mock[data-product-theme="gaming-razer"] { --accent: #00ff00; --gui-primary: #00ff00; --cs-bg-0: #111111; --cs-bg-1: #1f1f1f; }
.cs-mock[data-product-theme="gaming-logitech"] { --accent: #0099ff; --gui-primary: #0099ff; --cs-bg-0: #111111; --cs-bg-1: #1f1f1f; }
.cs-mock { background: var(--cs-bg-0, var(--bg)); border: 1px solid var(--border); border-radius: var(--radius); padding: 12px; position: relative; }
.cs-mock__banner { display: none; background: hsla(4, 72%, 58%, 0.15); color: var(--status-error); border: 1px solid var(--status-error); padding: 8px 12px; border-radius: 6px; margin-bottom: 10px; font-size: 12px; font-weight: 600; }
.cs-mock.is-disconnected .cs-mock__banner { display: block; }
.cs-mock.is-disconnected .cs-mock__viz { opacity: 0.5; pointer-events: none; }
.cs-mock.is-disconnected .cs-dpi-slider { opacity: 0.45; pointer-events: none; }
.cs-mock-toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; flex-wrap: wrap; }
.cs-mock-hint { font-size: 11px; color: var(--fg3); }
.cs-mock__grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 10px; }
@media (max-width: 720px) { .cs-mock__grid { grid-template-columns: 1fr; } }
.cs-mock__panel { background: var(--cs-bg-1, var(--bg2)); border: 1px solid var(--border); border-radius: var(--radius); padding: 10px; }
.cs-mock__title { margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: var(--fg3); }
.cs-mock__cards { display: flex; flex-direction: column; gap: 8px; }
.cs-device-card { display: grid; grid-template-columns: auto 1fr; gap: 4px 8px; align-items: center; padding: 10px; border-radius: var(--radius); border: 1px solid var(--border); background: var(--bg3); text-align: left; cursor: pointer; color: inherit; font: inherit; }
.cs-device-card--active { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent); }
.cs-device-card__icon { grid-row: span 2; font-size: 22px; }
.cs-device-card__name { font-weight: 600; font-size: 13px; }
.cs-device-card__badge { grid-column: 2; justify-self: start; }
.cs-battery--ok { color: var(--status-connected); }
.cs-battery--low { color: var(--status-error); }
.cs-mock__detail { display: grid; grid-template-columns: 88px 1fr; grid-template-rows: auto auto; gap: 8px; }
.cs-mock__nav { display: flex; flex-direction: column; gap: 4px; grid-row: span 2; }
.cs-mock__nav-item { font-size: 11px; padding: 6px 8px; border-radius: 4px; color: var(--fg2); }
.cs-mock__nav-item--on { background: var(--accent-bg); color: var(--accent); font-weight: 600; }
.cs-mock__viz { display: flex; align-items: center; justify-content: center; min-height: 100px; background: var(--bg3); border-radius: 6px; transition: opacity .2s; }
.cs-mouse { position: relative; width: 56px; height: 88px; }
.cs-mouse__body { position: absolute; inset: 8px 4px; background: var(--border); border-radius: 28px 28px 20px 20px; }
.cs-mouse__btn { position: absolute; z-index: 1; width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--accent); background: var(--bg2); color: var(--fg); font-size: 9px; font-weight: 700; cursor: pointer; }
.cs-mouse__btn:hover { background: var(--accent-bg); }
.cs-mouse__btn--l { top: 18px; left: 6px; }
.cs-mouse__btn--r { top: 18px; right: 6px; }
.cs-mouse__btn--s1 { bottom: 22px; left: 50%; transform: translateX(-50%); }
.cs-mock__controls { grid-column: 2; }
.cs-dpi-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
.cs-dpi-label { font-size: 12px; color: var(--fg2); }
.cs-dpi-value { font-size: 24px; font-weight: 700; color: var(--accent); font-variant-numeric: tabular-nums; }
.cs-dpi-slider { width: 100%; accent-color: var(--accent); }
.cs-save { font-size: 12px; color: var(--status-connected); }
.cs-mock--swatch { display: flex; gap: 8px; padding: 12px; }
.cs-swatch { flex: 1; height: 48px; border-radius: 6px; display: flex; align-items: flex-end; padding: 6px; font-size: 10px; }
.cs-swatch--bg0 { background: #111; color: #888; }
.cs-swatch--bg1 { background: #1f1f1f; color: #888; border: 1px solid #333; }
.cs-swatch--accent { background: var(--accent); color: #111; font-weight: 600; }
.vg-layers { display: flex; flex-direction: column; gap: 6px; margin: 0 0 16px; }
.vg-layer { border-radius: var(--radius); border: 1px solid var(--border); padding: 12px 14px; background: var(--bg2); }
.vg-layer--hw { border-left: 3px solid var(--fg3); }
.vg-layer--gui { border-left: 3px solid var(--accent); background: var(--accent-bg); }
.vg-layer--ds { border-left: 3px solid var(--status-connected); }
.vg-layer__tag { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--accent); margin-bottom: 4px; }
.vg-layer--hw .vg-layer__tag { color: var(--fg3); }
.vg-layer--ds .vg-layer__tag { color: var(--status-connected); }
.vg-layer__desc { font-size: 13px; color: var(--fg2); line-height: 1.5; }
.vg-layer__arrow { text-align: center; font-size: 12px; color: var(--fg3); padding: 2px 0; }
.vg-layer__arrow--thin { font-size: 11px; }
.vg-tabs { display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
.vg-tab { font-family: var(--font-sans); font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg3); color: var(--fg2); cursor: pointer; }
.vg-tab.active { background: var(--accent); border-color: var(--accent); color: hsl(0, 0%, 7%); }
.vg-card { margin-bottom: 16px; }
.vg-foot { margin: 10px 0 0; font-size: 12.5px; }
.vg-screen-title { margin: 0 0 10px; font-size: 13px; color: var(--fg2); }
.vg-dash-cards { display: flex; flex-direction: column; gap: 8px; }
.vg-dash-card { display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: var(--radius); border: 1px solid var(--border); background: var(--bg3); }
.vg-dash-card--on { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent); }
.vg-dash-card__emoji { font-size: 28px; }
.vg-dash-card__meta { display: block; font-size: 11px; color: var(--fg3); margin-top: 2px; }
.app-win { border: 1px solid var(--border); border-radius: 10px; overflow: hidden; background: #111; box-shadow: var(--gui-shadow-panel, 0 8px 32px rgba(0,0,0,.4)); }
.app-win[data-product-theme="gaming-razer"] { --accent: #00ff00; }
.app-win__titlebar { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: #1a1a1a; border-bottom: 1px solid #333; font-size: 12px; }
.app-win__dots { display: flex; gap: 4px; }
.app-win__dots i { width: 8px; height: 8px; border-radius: 50%; background: #444; display: block; }
.app-win__dots i:first-child { background: #ff5f57; }
.app-win__dots i:nth-child(2) { background: #febc2e; }
.app-win__dots i:nth-child(3) { background: #28c840; }
.app-win__name { color: #aaa; }
.app-win__spacer { flex: 1; }
.app-win__zone--header { padding: 8px 12px; background: #151515; border-bottom: 1px solid #2a2a2a; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
.app-win__profile { font-size: 11px; color: #9cf; }
.app-win__body { min-height: 220px; padding: 12px; background: #111; }
.app-win__body--detail { display: flex; gap: 10px; min-height: 260px; }
.app-win__sidebar { width: 100px; flex-shrink: 0; background: #1f1f1f; border-radius: 6px; padding: 8px; }
.app-win__nav { list-style: none; margin: 8px 0 0; padding: 0; font-size: 11px; color: #888; }
.app-win__nav li { padding: 5px 6px; border-radius: 4px; margin-bottom: 2px; }
.app-win__nav li.on { background: rgba(0,255,0,.12); color: #0f0; font-weight: 600; }
.app-win__main { flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.app-win__viz { position: relative; flex: 1; min-height: 120px; background: #1a1a1a; border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 1px dashed #333; }
.app-win__controls { background: #1f1f1f; border-radius: 6px; padding: 10px; }
.zone-pill { display: inline-block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; color: var(--accent); background: rgba(0,0,0,.35); padding: 3px 8px; border-radius: 4px; border: 1px solid #333; }
.zone-pill--sm { font-size: 9px; margin-left: auto; white-space: nowrap; }
.zone-pill--float { position: absolute; top: 8px; left: 8px; z-index: 2; color: #9cf; }
.cs-mouse--lg { transform: scale(1.15); }
.hw-lab-hint { margin: 0 0 12px; padding: 8px 12px; background: var(--accent-bg); border-radius: var(--radius); border-left: 3px solid var(--accent); }
.hw-lab-card { max-width: none; }
.hw-lab-intro { margin-top: 0; }
.hw-lab { position: relative; border-radius: 10px; overflow: hidden; background: #111; border: 1px solid #333; font-size: 13px; }
.hw-lab[data-product-theme="gaming-razer"] { --accent: #00ff00; --status-connected: #3ddc84; --status-error: #ff6b6b; --status-updating: #ffb020; }
.hw-lab__titlebar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding: 8px 12px; background: #1a1a1a; border-bottom: 1px solid #333; }
.hw-lab__appname { color: #aaa; font-size: 12px; }
.hw-lab__profile { font-size: 11px; background: #252525; color: #eee; border: 1px solid #444; border-radius: 4px; padding: 4px 8px; }
.hw-lab__battery { font-size: 12px; margin-left: auto; }
.hw-lab__signal { font-size: 11px; color: #888; }
.hw-lab__toolbar { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 12px; background: #151515; border-bottom: 1px solid #2a2a2a; }
.hw-lab__banner { margin: 0; padding: 10px 12px; background: rgba(255,80,80,.12); color: #ff8a8a; font-size: 12px; font-weight: 600; border-bottom: 1px solid #522; }
.hw-lab__shell { display: grid; grid-template-columns: 140px 1fr 240px; min-height: 340px; }
@media (max-width: 900px) { .hw-lab__shell { grid-template-columns: 1fr; } .hw-lab__nav { flex-direction: row !important; flex-wrap: wrap; } }
.hw-lab__nav { display: flex; flex-direction: column; gap: 2px; padding: 8px; background: #1f1f1f; border-right: 1px solid #333; }
.hw-nav-item { text-align: left; font: inherit; font-size: 11px; padding: 8px 10px; border: none; border-radius: 4px; background: transparent; color: #aaa; cursor: pointer; }
.hw-nav-item--on { background: rgba(0,255,0,.12); color: #0f0; font-weight: 600; }
.hw-nav-item:disabled { opacity: .4; cursor: not-allowed; }
.hw-lab__center { padding: 10px; display: flex; flex-direction: column; gap: 8px; min-width: 0; transition: opacity .2s; }
.hw-lab--dim .hw-lab__center { opacity: 0.45; }
.hw-lab__canvas-hint { margin: 0; font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: .05em; }
.hw-device-map { position: relative; width: 100%; max-width: 280px; margin: 0 auto; aspect-ratio: 0.55; background: #1a1a1a; border-radius: 12px; border: 1px dashed #444; }
.hw-mouse-body { position: absolute; inset: 12% 18% 8% 18%; background: #2a2a2a; border-radius: 40% 40% 45% 45%; box-shadow: inset 0 0 20px #111; }
.hw-mouse-led { position: absolute; inset: 12% 18% 8% 18%; border-radius: 40% 40% 45% 45%; opacity: 0.35; pointer-events: none; mix-blend-mode: screen; transition: background .15s; }
.hw-mouse-led--wave { animation: hw-wave 2s ease-in-out infinite; }
@keyframes hw-wave { 0%,100% { opacity: 0.25; } 50% { opacity: 0.7; } }
.hw-hotspot { position: absolute; left: var(--hx); top: var(--hy); width: 28px; height: 28px; margin: -14px 0 0 -14px; border-radius: 50%; border: 2px solid #666; background: #111; color: #ccc; font-size: 10px; font-weight: 700; cursor: pointer; z-index: 2; transition: border-color .12s, box-shadow .12s, transform .08s; }
.hw-hotspot:hover { border-color: var(--accent); box-shadow: 0 0 12px rgba(0,255,0,.35); }
.hw-hotspot--selected { border-color: var(--accent); background: rgba(0,255,0,.15); color: #fff; box-shadow: 0 0 0 2px rgba(0,255,0,.4); }
.hw-hotspot:disabled { cursor: not-allowed; opacity: .5; }
.hw-lab__log { font-size: 10px; color: #6a6; background: #0a0a0a; padding: 6px 8px; border-radius: 4px; border: 1px solid #222; }
.hw-lab__panel { padding: 10px; background: #1f1f1f; border-left: 1px solid #333; overflow-y: auto; }
.hw-panel__title { margin: 0 0 10px; font-size: 12px; font-weight: 600; color: #eee; }
.hw-panel__hint { font-size: 11px; color: #888; margin: 0 0 8px; }
.hw-field { display: block; font-size: 11px; color: #aaa; margin-bottom: 10px; }
.hw-field select, .hw-field input[type="number"] { display: block; width: 100%; margin-top: 4px; padding: 6px 8px; background: #111; border: 1px solid #444; border-radius: 4px; color: #eee; font: inherit; }
.hw-dpi-display { display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px; }
.hw-dpi-num { font-size: 28px; font-weight: 700; color: var(--accent); font-variant-numeric: tabular-nums; }
.hw-dpi-unit { font-size: 12px; color: #888; }
.hw-dpi-range { width: 100%; margin-bottom: 8px; accent-color: var(--accent); }
.hw-presets { display: flex; flex-wrap: wrap; gap: 6px; margin: 8px 0; }
.hw-presets .gui-btn { padding: 4px 10px; font-size: 11px; }
.hw-zones { border: none; margin: 0 0 10px; padding: 0; }
.hw-zones legend { font-size: 10px; color: #888; margin-bottom: 6px; }
.hw-zones label { display: block; font-size: 11px; color: #ccc; margin-bottom: 4px; }
.hw-macro-actions { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
.hw-macro-list { margin: 0 0 10px; padding-left: 18px; font-size: 11px; color: #bbb; max-height: 120px; overflow-y: auto; }
.hw-macro-delay { color: #888; }
.hw-apply-btn { width: 100%; margin-top: 6px; }
.hw-save-feedback { display: block; font-size: 11px; margin-top: 8px; min-height: 1.2em; }
.hw-save-feedback.is-saving { color: #ffb020; }
.hw-save-feedback.is-ok { color: var(--status-connected); }
.hw-lab--firmware .hw-lab__shell { pointer-events: none; opacity: 0.5; }
.hw-lab__fw-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.85); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 20; padding: 24px; }
.hw-lab__fw-overlay[hidden] { display: none !important; }
.hw-fw-title { color: #fff; font-weight: 700; margin: 0 0 12px; }
.hw-fw-bar { width: min(320px, 90%); height: 8px; background: #333; border-radius: 4px; overflow: hidden; }
.hw-fw-fill { height: 100%; width: 0; background: var(--accent); transition: width .1s linear; }
.hw-fw-warn { color: #ff8a8a; font-size: 12px; margin-top: 12px; }
@media (max-width: 960px) { .panel--doc .doc-layout { grid-template-columns: 1fr; } .doc-toc { display: none; } }
@media (max-width: 680px) {
  .sidebar { display: none; position: fixed; top: 49px; left: 0; bottom: 0; z-index: 200; width: 280px; box-shadow: 4px 0 24px rgba(0,0,0,.3); }
  .sidebar.open { display: block; }
  .menu-btn { display: block; }
  .main { padding: 20px 16px 40px; }
}
</style>
</head>
<body>
<div class="topbar">
  <button class="menu-btn" onclick="toggleMenu()" aria-label="Menu">☰</button>
  <div class="topbar-title"><span>${BRAND}</span> Design System</div>
  <span class="topbar-badge">HID utility apps</span>
  <a class="topbar-link" href="../brands/brands.html">Quinn TV ↗</a>
  <button type="button" class="plat-btn active" data-plat="all" onclick="setPlatform('all')">All</button>
  <button type="button" class="plat-btn" data-plat="shell" onclick="setPlatform('shell')">Shell</button>
  <button type="button" class="plat-btn" data-plat="controls" onclick="setPlatform('controls')">Controls</button>
  <button type="button" class="plat-btn" data-plat="device" onclick="setPlatform('device')">Device</button>
  <button class="theme-btn" onclick="toggleTheme()">Theme</button>
</div>
<div class="layout">
  <nav class="sidebar" id="sidebar">${navHtml()}</nav>
  <main class="main">${panels}</main>
</div>
<script>
function toggleTheme() {
  const root = document.documentElement;
  const cur = root.getAttribute('data-theme');
  const next = cur === 'light' ? '' : 'light';
  if (next) root.setAttribute('data-theme', next); else root.removeAttribute('data-theme');
  try { localStorage.setItem('${STORAGE}-theme', next || 'dark'); } catch (e) {}
}
try {
  const t = localStorage.getItem('${STORAGE}-theme');
  if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
} catch (e) {}

function toggleSynapseDisconnect() {
  const el = document.getElementById('synapse-mock');
  if (el) el.classList.toggle('is-disconnected');
}
function setAppPreviewView(view) {
  document.querySelectorAll('.app-preview').forEach(function (el) {
    el.hidden = el.getAttribute('data-view') !== view;
  });
  document.querySelectorAll('[data-app-view]').forEach(function (btn) {
    var on = btn.getAttribute('data-app-view') === view;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-selected', on ? 'true' : 'false');
  });
}
function toggleMenu() { document.getElementById('sidebar').classList.toggle('open'); }
document.addEventListener('click', e => {
  const sb = document.getElementById('sidebar');
  if (sb.classList.contains('open') && !sb.contains(e.target) && !e.target.closest('.menu-btn')) sb.classList.remove('open');
});

function setPlatform(p) {
  document.querySelectorAll('.plat-btn').forEach(b => b.classList.toggle('active', b.dataset.plat === p));
  document.querySelectorAll('[data-platform]').forEach(el => {
    const plat = el.getAttribute('data-platform');
    const show = p === 'all' || plat === 'all' || plat === p;
    el.classList.toggle('hidden', !show);
    if (el.classList.contains('panel') && !show) el.classList.remove('active');
  });
  if (!document.querySelector('.nav-item.active:not(.hidden)')) show('overview');
  try { localStorage.setItem('${STORAGE}-plat', p); } catch (e) {}
}

let docObserver = null;
function initDocToc(panelEl) {
  if (docObserver) { docObserver.disconnect(); docObserver = null; }
  if (!panelEl || !panelEl.classList.contains('panel--doc')) return;
  const sections = panelEl.querySelectorAll('[data-doc-section]');
  const links = panelEl.querySelectorAll('.doc-toc-link');
  const marker = panelEl.querySelector('.doc-toc-marker');
  const rail = panelEl.querySelector('.doc-toc-rail');
  function moveMarker(link) {
    if (!marker || !rail || !link) return;
    const y = link.getBoundingClientRect().top - rail.getBoundingClientRect().top + (link.getBoundingClientRect().height - 22) / 2;
    marker.style.transform = 'translateY(' + Math.max(0, y) + 'px)';
  }
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(link.getAttribute('data-toc-href').slice(1));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  docObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(en => en.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const id = visible.target.id;
    links.forEach(l => {
      const on = l.getAttribute('data-toc-href') === '#' + id;
      l.classList.toggle('active', on);
      if (on) moveMarker(l);
    });
  }, { root: document.querySelector('.main'), rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5] });
  sections.forEach(sec => docObserver.observe(sec));
  if (links[0]) { links[0].classList.add('active'); moveMarker(links[0]); }
}

function show(id) {
  const panel = document.getElementById('panel-' + id);
  if (!panel || panel.classList.contains('hidden')) return;
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  panel.classList.add('active');
  const nav = document.querySelector('.nav-item[data-panel="' + id + '"]');
  if (nav) nav.classList.add('active');
  document.getElementById('sidebar').classList.remove('open');
  document.querySelector('.main').scrollTop = 0;
  requestAnimationFrame(() => initDocToc(panel));
  if (id === 'hw-lab' && typeof hwLabInit === 'function') hwLabInit();
  try { localStorage.setItem('${STORAGE}-panel', id); } catch (e) {}
}

${HARDWARE_LAB_SCRIPT}

try {
  const sp = localStorage.getItem('${STORAGE}-plat');
  if (sp) setPlatform(sp);
  else setPlatform('all');
  const saved = localStorage.getItem('${STORAGE}-panel');
  if (saved && document.getElementById('panel-' + saved)) show(saved);
  else show('hw-lab');
} catch (e) { show('hw-lab'); }
</script>
</body>
</html>`;

fs.writeFileSync(OUT, html, 'utf8');
console.log('Wrote', OUT, '—', BRAND, '·', SECTIONS.flatMap((s) => s.items).length, 'panels');
