/**
 * Generate brands/brands.html — Quinn TV UX Guidelines SPA
 * node brands/scripts/build-brands-spa.mjs
 * Placeholders: https://placehold.co/
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'brands.html');
const BRAND = 'Quinn';

/** @see https://placehold.co/ */
const ph = (label, w = 800, h = 450) => {
  const text = encodeURIComponent(`${BRAND} · ${label}`.slice(0, 48));
  return `https://placehold.co/${w}x${h}/1e1b4b/e9e7ff/png?text=${text}`;
};

const fig = (label, cap) => ({ src: ph(label), cap: cap || label });

const SECTIONS = [
  {
    label: 'Start',
    items: [
      {
        id: 'overview',
        platform: 'all',
        title: 'Overview',
        desc: `${BRAND} design system — TV-first UX for streaming on Android TV and Apple TV. Principle, foundation tokens, and components for ten-foot UI.`,
        bullets: ['Principle — why we design for TV remotes', 'Foundation — color, type, layout, motion', 'Components — shippable UI patterns'],
        figures: [fig('Overview', 'Hero spec'), fig('Journey map', 'Discovery → play flow')],
      },
    ],
  },
  {
    label: 'Principle',
    items: [
      { id: 'principle', platform: 'all', title: 'Principle', desc: `${BRAND} core value: joy through media. Content over chrome. Household viewing, remote-only input.`, bullets: ['Core value & audience', 'TV, content, navigation, legacy, accessibility'], figures: [fig('Principle hub')] },
      { id: 'principle-tv', platform: 'all', title: 'TV Environment', desc: '16:9, 1920×1080 baseline, safe zones, viewing distance, high contrast displays.', bullets: ['Safe margins', 'D-pad + OK + Back', 'Low visual density at distance'], figures: [fig('Safe zone'), fig('Viewing distance')] },
      { id: 'principle-contents', platform: 'all', title: 'Contents', desc: 'Poster-led discovery. Live vs on-demand mental models. Media first.', bullets: ['Hierarchy on tiles', 'Live vs VOD', 'Rich thumbnails'], figures: [fig('Content rails')] },
      { id: 'principle-navigation', platform: 'all', title: 'Navigation', desc: 'Predictable focus. Fewest steps to playback. Align with platform norms.', bullets: ['Focus entry points', 'Information order', 'Cross-platform patterns'], figures: [fig('Focus map')] },
      { id: 'principle-legacy', platform: 'all', title: 'Respect for Legacy', desc: 'Evolve patterns without breaking learned behavior. Guide users through change.', bullets: ['Incremental rollout', 'Onboarding', 'Shared OTT conventions'], figures: [fig('Migration UX')] },
      { id: 'principle-a11y', platform: 'all', title: 'Accessibility', desc: 'Inclusive by default — captions, contrast, plain language, WCAG-oriented reviews.', bullets: ['Captions & descriptions', 'Inclusive visuals', 'Contrast & focus'], figures: [fig('A11y checklist')] },
    ],
  },
  {
    label: 'Foundation · Web',
    items: [
      { id: 'f-web', platform: 'web', title: 'Foundation (Android TV)', desc: `${BRAND} tokens for Android TV — color, typography, icons, layout, focus, assistant, voice profile.`, bullets: ['Dark-first theme', 'Quinn Blue accent', 'Grid & elevation'], figures: [fig('Foundation web')] },
      { id: 'f-web-color', platform: 'web', title: 'Color', desc: 'Brand, neutral, and semantic ramps. Sparingly use accent on dark UI.', bullets: ['Primary / neutral', 'States', 'Calibrate on TV'], figures: [fig('Color tokens'), fig('Dark UI swatches')] },
      { id: 'f-web-type', platform: 'web', title: 'Typography', desc: `${BRAND} type scale for titles, body, and captions at ten-foot distance.`, bullets: ['Weight roles', 'Size ramp', 'Line height'], figures: [fig('Type scale')] },
      { id: 'f-web-icon', platform: 'web', title: 'Iconography', desc: 'Tokenized icon states. Clear silhouettes from the couch.', bullets: ['Naming convention', 'Focus states', 'Grid alignment'], figures: [fig('Icon grid')] },
      { id: 'f-web-layout', platform: 'web', title: 'Layout', desc: 'Rails, blocks, and spacing for remote traversal.', bullets: ['8px grid', 'Horizontal rails', 'Vertical stacks'], figures: [fig('Layout grid')] },
      { id: 'f-web-focus', platform: 'web', title: 'Focus', desc: 'Visible focus for D-pad selection — scale, stroke, glow per component.', bullets: ['Default vs focused', 'Selected vs pressed', 'Initial focus rules'], figures: [fig('Focus states')] },
      { id: 'f-web-adot', platform: 'web', title: 'Quinn Assist', desc: 'Voice & chat assistant for media — STT, thinking state, answer layout.', bullets: ['Voice bubbles', 'Processing state', 'Multi-turn UI'], figures: [fig('Assist flow')] },
      { id: 'f-web-voiceid', platform: 'web', title: 'Voice profile', desc: 'Optional voice enrollment for personalized assistant responses.', bullets: ['Enrollment', 'Retry & errors', 'Privacy copy'], figures: [fig('Voice profile')] },
    ],
  },
  {
    label: 'Foundation · iOS',
    items: [
      { id: 'f-ios', platform: 'ios', title: 'Foundation (Apple TV)', desc: 'tvOS-aligned tokens with shared Quinn brand.', bullets: ['Parallax & motion', 'HIG alignment', 'Brand consistency'], figures: [fig('Foundation tvOS')] },
      { id: 'f-ios-color', platform: 'ios', title: 'Color (tvOS)', desc: 'Palettes tuned for Apple TV displays.', bullets: ['Brand on tvOS', 'Semantic colors', 'A11y'], figures: [fig('tvOS color')] },
      { id: 'f-ios-type', platform: 'ios', title: 'Typography (tvOS)', desc: 'Readable hierarchy for ten-foot UI.', bullets: ['Dynamic type', 'Roles', 'Localization'], figures: [fig('tvOS type')] },
      { id: 'f-ios-icon', platform: 'ios', title: 'Iconography (tvOS)', desc: 'Custom + system symbols for Siri Remote.', bullets: ['Export sizes', 'Focus parity', 'States'], figures: [fig('tvOS icons')] },
      { id: 'f-ios-layout', platform: 'ios', title: 'Layout (tvOS)', desc: 'Safe areas and parallax-friendly structure.', bullets: ['Top shelf', 'Section gaps', 'Rails'], figures: [fig('tvOS layout')] },
      { id: 'f-ios-focus', platform: 'ios', title: 'Focus (tvOS)', desc: 'Focus engine — parallax, scale, coordinated motion.', bullets: ['Focus guides', 'Groups', 'Reduce motion'], figures: [fig('tvOS focus')] },
      { id: 'f-ios-motion', platform: 'ios', title: 'Motion', desc: 'Transitions and timing for natural TV movement.', bullets: ['Screen changes', 'Duration', 'FPS'], figures: [fig('Motion curves')] },
    ],
  },
  {
    label: 'Components · Web',
    items: [
      { id: 'c-web', platform: 'web', title: 'Components (Web)', desc: 'Android TV kit — controls, navigation, feedback.', bullets: ['Token states', 'Remote targets', 'Modals & toasts'], figures: [fig('Component map')] },
      { id: 'c-web-buttons', platform: 'web', title: 'Buttons', desc: 'Primary, secondary, icon, destructive.', bullets: ['Label + container', 'Focus/disabled', 'Icon pairs'], figures: [fig('Buttons'), fig('Button states')] },
      { id: 'c-web-checkbox', platform: 'web', title: 'Checkbox', desc: 'Multi-select in lists.', bullets: ['Multi only', 'List consistency', 'Labels'], figures: [fig('Checkbox')] },
      { id: 'c-web-radio', platform: 'web', title: 'Radio', desc: 'Single choice per group.', bullets: ['Exclusive select', 'Optional artwork', 'Clear selected'], figures: [fig('Radio group')] },
      { id: 'c-web-switch', platform: 'web', title: 'Switch', desc: 'Binary settings with obvious on/off.', bullets: ['Contrast', 'Focus ring', 'No ambiguous states'], figures: [fig('Switch')] },
      { id: 'c-web-dropdowns', platform: 'web', title: 'Dropdown', desc: 'Expandable lists from a trigger.', bullets: ['Open/closed', 'Remote parity', 'Submenus'], figures: [fig('Dropdown')] },
      { id: 'c-web-dock', platform: 'web', title: 'Dock', desc: 'Collapsed hint vs expanded actions.', bullets: ['Simple dock', 'Expand to use', 'Entry point'], figures: [fig('Dock')] },
      { id: 'c-web-flag', platform: 'web', title: 'Flags', desc: 'Badges on tiles — live, new, promo.', bullets: ['On posters', 'Contrast', 'Minimal noise'], figures: [fig('Flags')] },
      { id: 'c-web-gnb', platform: 'web', title: 'GNB', desc: 'Global nav and brand lockup.', bullets: ['You are here', 'Subnav', 'Profile'], figures: [fig('GNB')] },
      { id: 'c-web-inputs', platform: 'web', title: 'Inputs', desc: 'Search and forms with errors and focus.', bullets: ['IME handoff', 'Validation', 'Search variant'], figures: [fig('Inputs')] },
      { id: 'c-web-ime', platform: 'web', title: 'IME', desc: 'On-screen keyboard grids.', bullets: ['Full keypad', 'Languages', 'Focus path'], figures: [fig('IME')] },
      { id: 'c-web-loading', platform: 'web', title: 'Loading', desc: 'Spinner vs progress thresholds.', bullets: ['>1s spinner', '>4s progress', 'Non-blocking'], figures: [fig('Loading')] },
      { id: 'c-web-menus', platform: 'web', title: 'Menus', desc: 'Overflow and context menus.', bullets: ['Placement', 'Dismiss', 'Depth'], figures: [fig('Menus')] },
      { id: 'c-web-pagination', platform: 'web', title: 'Pagination', desc: 'Position in long lists.', bullets: ['Index + total', 'Window', 'Wrap rules'], figures: [fig('Pagination')] },
      { id: 'c-web-popup', platform: 'web', title: 'Pop up', desc: 'Modal vs toast patterns.', bullets: ['Modal decisions', 'Toast info', 'Focus trap'], figures: [fig('Popup')] },
      { id: 'c-web-tabs', platform: 'web', title: 'Tabs', desc: 'Block vs page tabs.', bullets: ['One active', 'Focus memory', 'Swap content'], figures: [fig('Tabs')] },
      { id: 'c-web-tooltip', platform: 'web', title: 'Tooltip', desc: 'Rare hints on ten-foot UI.', bullets: ['Short copy', 'Non-blocking', 'Auto dismiss'], figures: [fig('Tooltip')] },
    ],
  },
  {
    label: 'Components · iOS',
    items: [
      { id: 'c-ios', platform: 'ios', title: 'Components (tvOS)', desc: 'Player, splash, badges, controls for Apple TV.', bullets: ['Parallax cards', 'Player chrome', 'Native feel'], figures: [fig('Components tvOS')] },
      { id: 'c-ios-badges', platform: 'ios', title: 'Badges', desc: 'Promo and status on artwork.', bullets: ['Poster badges', 'Live/new', 'Legibility'], figures: [fig('Badges')] },
      { id: 'c-ios-block', platform: 'ios', title: 'Block', desc: 'Content rail templates.', bullets: ['Tile families', 'Sizes', 'Focus scale'], figures: [fig('Blocks')] },
      { id: 'c-ios-buttons', platform: 'ios', title: 'Buttons', desc: 'tvOS actions with Quinn tokens.', bullets: ['Primary/destructive', 'Placement', 'Motion'], figures: [fig('tvOS buttons')] },
      { id: 'c-ios-checkbox', platform: 'ios', title: 'Checkbox', desc: 'Multi-select lists.', bullets: ['Parity with web', 'tvOS chrome', 'Groups'], figures: [fig('tvOS checkbox')] },
      { id: 'c-ios-radio', platform: 'ios', title: 'Radio', desc: 'Exclusive choices.', bullets: ['Single select', 'Artwork option', 'Default'], figures: [fig('tvOS radio')] },
      { id: 'c-ios-switch', platform: 'ios', title: 'Switch', desc: 'Settings toggles.', bullets: ['Label', 'Apply immediately', 'Focus order'], figures: [fig('tvOS switch')] },
      { id: 'c-ios-slider', platform: 'ios', title: 'Slider', desc: 'Scrubbing and values.', bullets: ['Steps', 'Preview', 'Commit'], figures: [fig('Slider')] },
      { id: 'c-ios-gnb', platform: 'ios', title: 'GNB', desc: 'Top-level tvOS navigation.', bullets: ['Tabs', 'Titles', 'Account'], figures: [fig('tvOS GNB')] },
      { id: 'c-ios-inputs', platform: 'ios', title: 'Inputs', desc: 'Search and fields with Siri Remote.', bullets: ['Search first', 'Errors', 'Dictation'], figures: [fig('tvOS inputs')] },
      { id: 'c-ios-ime', platform: 'ios', title: 'IME', desc: 'Text entry overlay.', bullets: ['Grid', 'Languages', 'Done/cancel'], figures: [fig('tvOS IME')] },
      { id: 'c-ios-loading', platform: 'ios', title: 'Loading', desc: 'Network-bound feedback.', bullets: ['Brand motion', 'Timeout', 'Background'], figures: [fig('tvOS loading')] },
      { id: 'c-ios-pagination', platform: 'ios', title: 'Pagination', desc: 'Carousel and list position.', bullets: ['Dots', 'Counts', 'Edges'], figures: [fig('tvOS pagination')] },
      { id: 'c-ios-player', platform: 'ios', title: 'Player', desc: 'Transport, timeline, related content.', bullets: ['Auto-hide chrome', 'Episodes', 'Errors'], figures: [fig('Player UI')] },
      { id: 'c-ios-popup', platform: 'ios', title: 'Pop up', desc: 'Alerts and sheets.', bullets: ['Action order', 'Destructive', 'Full-screen'], figures: [fig('tvOS alert')] },
      { id: 'c-ios-splash', platform: 'ios', title: 'Splash', desc: 'Launch brand moment.', bullets: ['Brief', 'Motion', 'No input'], figures: [fig('Splash')] },
      { id: 'c-ios-tabs', platform: 'ios', title: 'Tabs', desc: 'In-screen segments.', bullets: ['Block vs page', 'Focus', 'Swipe/remote'], figures: [fig('tvOS tabs')] },
      { id: 'c-ios-tooltip', platform: 'ios', title: 'Tooltip', desc: 'Optional hints.', bullets: ['Don’t cover focus', 'Brief', 'Rare'], figures: [fig('tvOS tooltip')] },
    ],
  },
];

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function figHtml(f) {
  return `<figure class="figure">
  <img src="${esc(f.src)}" alt="" loading="lazy" />
  <figcaption>${esc(f.cap)}</figcaption>
</figure>`;
}

function panelHtml(item) {
  const bullets = item.bullets.map((b) => `<li>${esc(b)}</li>`).join('');
  const figures = item.figures.map(figHtml).join('\n');
  return `<section class="panel" id="panel-${item.id}" data-platform="${item.platform}">
  <header class="panel-header">
    <h2>${esc(item.title)}</h2>
    <p class="panel-desc">${esc(item.desc)}</p>
  </header>
  <div class="card">
    <div class="card-title">Key points</div>
    <ul class="bullet-list">${bullets}</ul>
  </div>
  <div class="figure-grid">${figures}</div>
  <div class="callout callout-info">
    <span class="callout-icon">ℹ️</span>
    <span>Replace placeholders via <a href="https://placehold.co/" target="_blank" rel="noopener">placehold.co</a> URLs in <code class="mono">brands/scripts/build-brands-spa.mjs</code>, then <code class="mono">node brands/scripts/build-brands-spa.mjs</code>.</span>
  </div>
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
const favicon = ph('Q', 32, 32);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
<title>${BRAND} UX Guidelines</title>
<link rel="icon" href="${favicon}" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" />
<style>
:root {
  --bg: #f8f8f7; --bg2: #ffffff; --bg3: #f0efed; --border: #e2e0db;
  --fg: #1a1917; --fg2: #5c5a55; --fg3: #9c9890;
  --accent: #6366f1; --accent-bg: #eef2ff;
  --sidebar-w: 240px; --radius: 8px;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0f0f14; --bg2: #16161f; --bg3: #222230; --border: #2e2e3d;
    --fg: #f2f2f8; --fg2: #a8a8b8; --fg3: #6b6b7a;
    --accent: #818cf8; --accent-bg: #1e1b4b;
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --bg: #0f0f14; --bg2: #16161f; --bg3: #222230; --border: #2e2e3d;
  --fg: #f2f2f8; --fg2: #a8a8b8; --fg3: #6b6b7a;
  --accent: #818cf8; --accent-bg: #1e1b4b;
  color-scheme: dark;
}
*, *::before, *::after { box-sizing: border-box; }
html, body { height: 100%; margin: 0; }
body { font-family: var(--font-sans); background: var(--bg); color: var(--fg); font-size: 14px; line-height: 1.6; display: flex; flex-direction: column; min-height: 100%; }
.mono { font-family: var(--font-mono); font-size: 12px; }
.topbar {
  position: sticky; top: 0; z-index: 100; background: var(--bg2);
  border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px;
  padding: 10px 16px;
}
.topbar-title { font-size: 15px; font-weight: 700; flex: 1; }
.topbar-title span { color: var(--accent); }
.topbar-badge { font-size: 11px; font-weight: 600; color: var(--fg2); background: var(--bg3); border: 1px solid var(--border); padding: 2px 8px; border-radius: 20px; }
.theme-btn, .plat-btn {
  background: var(--bg3); border: 1px solid var(--border); color: var(--fg2);
  border-radius: 6px; padding: 4px 10px; font-size: 12px; cursor: pointer; font-family: var(--font-sans);
}
.plat-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; }
.menu-btn { display: none; background: none; border: none; color: var(--fg2); cursor: pointer; font-size: 20px; }
.layout { display: flex; flex: 1; min-height: 0; }
.sidebar {
  width: var(--sidebar-w); min-width: var(--sidebar-w); background: var(--bg2);
  border-right: 1px solid var(--border); overflow-y: auto; padding: 12px 0 32px;
  position: sticky; top: 49px; height: calc(100vh - 49px);
}
.nav-section-label { font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--fg3); padding: 8px 16px 4px; }
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
.panel { display: none; max-width: 920px; }
.panel.active { display: block; }
.panel-header { margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
.panel-header h2 { font-size: 22px; font-weight: 700; margin: 0 0 6px; }
.panel-desc { color: var(--fg2); font-size: 13.5px; margin: 0; max-width: 640px; }
.card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px 18px; margin-bottom: 16px; }
.card-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--fg3); margin-bottom: 10px; }
.bullet-list { margin: 0; padding-left: 18px; color: var(--fg2); font-size: 13.5px; line-height: 1.7; }
.figure-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; margin-bottom: 16px; }
.figure { margin: 0; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.figure img { display: block; width: 100%; aspect-ratio: 16/9; object-fit: cover; background: var(--bg3); }
.figure figcaption { font-size: 11px; color: var(--fg3); padding: 8px 10px; border-top: 1px solid var(--border); }
.callout { display: flex; gap: 10px; padding: 12px 14px; border-radius: var(--radius); font-size: 13px; color: var(--fg2); }
.callout-info { background: var(--accent-bg); border-left: 3px solid var(--accent); }
@media (max-width: 680px) {
  .sidebar { display: none; position: fixed; top: 49px; left: 0; bottom: 0; z-index: 200; width: 260px; box-shadow: 4px 0 24px rgba(0,0,0,.15); }
  .sidebar.open { display: block; }
  .menu-btn { display: block; }
  .main { padding: 20px 16px 40px; }
  .topbar-badge { display: none; }
}
</style>
</head>
<body>
<div class="topbar">
  <button class="menu-btn" onclick="toggleMenu()" aria-label="Menu">☰</button>
  <div class="topbar-title">✦ <span>${BRAND}</span> UX Guidelines</div>
  <span class="topbar-badge">TV design system</span>
  <button type="button" class="plat-btn active" data-plat="all" onclick="setPlatform('all')">All</button>
  <button type="button" class="plat-btn" data-plat="web" onclick="setPlatform('web')">Android TV</button>
  <button type="button" class="plat-btn" data-plat="ios" onclick="setPlatform('ios')">Apple TV</button>
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
  root.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
  try { localStorage.setItem('quinn-theme', root.getAttribute('data-theme')); } catch (e) {}
}
try {
  const t = localStorage.getItem('quinn-theme');
  if (t) document.documentElement.setAttribute('data-theme', t);
} catch (e) {}

function toggleMenu() {
  document.getElementById('sidebar').classList.toggle('open');
}
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
  try { localStorage.setItem('quinn-plat', p); } catch (e) {}
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
  try { localStorage.setItem('quinn-panel', id); } catch (e) {}
}

try {
  const sp = localStorage.getItem('quinn-plat');
  if (sp) setPlatform(sp);
  else setPlatform('all');
  const saved = localStorage.getItem('quinn-panel');
  if (saved && document.getElementById('panel-' + saved)) show(saved);
  else show('overview');
} catch (e) { show('overview'); }
</script>
</body>
</html>`;

fs.writeFileSync(OUT, html, 'utf8');
console.log('Wrote', OUT, '—', BRAND, '·', SECTIONS.flatMap((s) => s.items).length, 'panels');
