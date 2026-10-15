/**
 * Generate brands/brands.html — Quinn TV UX Guidelines SPA
 * node brands/scripts/build-brands-spa.mjs
 * Placeholders: https://placehold.co/
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  BUTTONS_WEB_DOC,
  COLOR_WEB_DOC,
  LAYOUT_WEB_DOC,
  QUINN_ASSIST_WEB_DOC,
  TYPOGRAPHY_WEB_DOC,
  ICONOGRAPHY_WEB_DOC,
  genericComponentDoc,
} from './component-docs.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'brands.html');
const BRAND = 'Quinn';

/** Match site palette from /index.css (hsl 155 green) */
const PH_BG = '122820'; /* ~ hsl(156, 51%, 14%) */
const PH_FG = 'd4ffe8'; /* ~ hsl(155, 100%, 85%) */

/** @see https://placehold.co/ */
const ph = (label, w = 800, h = 450) => {
  const text = encodeURIComponent(`${BRAND} · ${label}`.slice(0, 48));
  return `https://placehold.co/${w}x${h}/${PH_BG}/${PH_FG}/png?text=${text}`;
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
      { id: 'f-web', platform: 'web', title: 'Foundation (Android TV)', desc: `${BRAND} tokens for Android TV — color, typography, icons, layout, focus, assistant, voice profile.`, bullets: ['Dark-first theme', 'Quinn green accent', 'Grid & elevation'], figures: [fig('Foundation web')] },
      {
        id: 'f-web-color',
        platform: 'web',
        title: 'Color',
        desc: 'Standardized Quinn color and usage guidelines. A formal system keeps the brand consistent and easier to recognize across TV UI.',
        doc: COLOR_WEB_DOC,
      },
      {
        id: 'f-web-type',
        platform: 'web',
        title: 'Typography',
        desc: 'Standard TV OS typography for efficient design and dev. Choose styles by role to balance text and improve the Quinn viewing experience.',
        doc: TYPOGRAPHY_WEB_DOC,
      },
      {
        id: 'f-web-icon',
        platform: 'web',
        title: 'Iconography',
        desc: 'Pictograms for faster recognition on TV. Grid, stroke, color, states, and naming rules for Quinn icon assets.',
        doc: ICONOGRAPHY_WEB_DOC,
      },
      {
        id: 'f-web-layout',
        platform: 'web',
        title: 'Layout',
        desc: 'Structural template for visual consistency. Grid, spacing, and regions define where information and UI live — tuned so content reads well on TV.',
        doc: LAYOUT_WEB_DOC,
      },
      { id: 'f-web-focus', platform: 'web', title: 'Focus', desc: 'Visible focus for D-pad selection — scale, stroke, glow per component.', bullets: ['Default vs focused', 'Selected vs pressed', 'Initial focus rules'], figures: [fig('Focus states')] },
      {
        id: 'f-web-adot',
        platform: 'web',
        title: 'Quinn Assist',
        desc: 'LLM multi-turn assistant for media — conversational search with entry from dock, search, banners, and voice.',
        doc: QUINN_ASSIST_WEB_DOC,
      },
      { id: 'f-web-voiceid', platform: 'web', title: 'Voice profile', desc: 'Optional voice enrollment for personalized assistant responses.', bullets: ['Enrollment', 'Retry & errors', 'Privacy copy'], figures: [fig('Voice profile')] },
    ],
  },
  {
    label: 'Foundation · iOS',
    items: [
      { id: 'f-ios', platform: 'ios', title: 'Foundation (Apple TV)', desc: 'tvOS-aligned tokens with shared Quinn brand.', bullets: ['Parallax & motion', 'HIG alignment', 'Brand consistency'], figures: [fig('Foundation tvOS')] },
      {
        id: 'f-ios-color',
        platform: 'ios',
        title: 'Color (tvOS)',
        desc: 'Same Quinn color principles on tvOS — validate on Apple TV displays and parallax-heavy UI.',
        doc: COLOR_WEB_DOC,
      },
      {
        id: 'f-ios-type',
        platform: 'ios',
        title: 'Typography (tvOS)',
        desc: 'Quinn hierarchy on tvOS — platform fonts where required, Quinn tokens for brand surfaces.',
        doc: TYPOGRAPHY_WEB_DOC,
      },
      {
        id: 'f-ios-icon',
        platform: 'ios',
        title: 'Iconography (tvOS)',
        desc: 'Same Quinn icon grid, states, and naming on tvOS — pair custom assets with SF Symbols where HIG requires.',
        doc: ICONOGRAPHY_WEB_DOC,
      },
      {
        id: 'f-ios-layout',
        platform: 'ios',
        title: 'Layout (tvOS)',
        desc: 'Same Quinn layout rules on tvOS — respect safe areas, focus paths, and parallax-friendly rails.',
        doc: LAYOUT_WEB_DOC,
      },
      { id: 'f-ios-focus', platform: 'ios', title: 'Focus (tvOS)', desc: 'Focus engine — parallax, scale, coordinated motion.', bullets: ['Focus guides', 'Groups', 'Reduce motion'], figures: [fig('tvOS focus')] },
      { id: 'f-ios-motion', platform: 'ios', title: 'Motion', desc: 'Transitions and timing for natural TV movement.', bullets: ['Screen changes', 'Duration', 'FPS'], figures: [fig('Motion curves')] },
    ],
  },
  {
    label: 'Components · Web',
    items: [
      { id: 'c-web', platform: 'web', title: 'Components (Web)', desc: 'Android TV kit — controls, navigation, feedback.', bullets: ['Token states', 'Remote targets', 'Modals & toasts'], figures: [fig('Component map')] },
      {
        id: 'c-web-buttons',
        platform: 'web',
        title: 'Buttons',
        desc: 'Used to trigger actions. Pick a shape and type that match the function — combine style, content, and type so intent is obvious on TV.',
        doc: BUTTONS_WEB_DOC,
      },
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
      {
        id: 'c-ios-buttons',
        platform: 'ios',
        title: 'Buttons',
        desc: 'tvOS actions with Quinn tokens — same anatomy, states, and types as Android TV where possible.',
        doc: BUTTONS_WEB_DOC,
      },
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

for (const sec of SECTIONS) {
  for (const item of sec.items) {
    if (item.id.startsWith('c-') && !item.doc) {
      item.doc = genericComponentDoc(item.title, item.desc);
    }
  }
}

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

function renderBlock(block, panelId) {
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
      return figHtml(fig(block.label || 'Spec', block.label));
    default:
      return '';
  }
}

function panelDocHtml(item) {
  const doc = item.doc;
  const pillars = doc.pillars
    .map(
      (p) =>
        `<div class="pillar"><strong>${esc(p.title)}</strong><span>${esc(p.text)}</span></div>`
    )
    .join('');
  const sections = doc.sections
    .map((sec) => {
      const body = sec.blocks.map((b) => renderBlock(b, item.id)).join('\n');
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
  --bg: #f4f7f5; --bg2: #ffffff; --bg3: #e8f2ec; --border: #d4e4da;
  --fg: #121212; --fg2: #3d4a42; --fg3: #6b7a72;
  --accent: hsl(155, 70%, 32%);
  --accent-bg: hsla(155, 100%, 65%, 0.14);
  --sidebar-w: 240px; --radius: 8px;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: hsl(0, 0%, 7%);
    --bg2: hsl(0, 0%, 10%);
    --bg3: hsl(156, 51%, 14%);
    --border: hsla(0, 0%, 100%, 0.08);
    --fg: hsl(0, 0%, 99%);
    --fg2: hsl(0, 0%, 60%);
    --fg3: hsl(0, 0%, 45%);
    --accent: hsl(155, 100%, 65%);
    --accent-bg: hsla(155, 100%, 65%, 0.12);
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --bg: hsl(0, 0%, 7%);
  --bg2: hsl(0, 0%, 10%);
  --bg3: hsl(156, 51%, 14%);
  --border: hsla(0, 0%, 100%, 0.08);
  --fg: hsl(0, 0%, 99%);
  --fg2: hsl(0, 0%, 60%);
  --fg3: hsl(0, 0%, 45%);
  --accent: hsl(155, 100%, 65%);
  --accent-bg: hsla(155, 100%, 65%, 0.12);
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
.plat-btn.active { background: var(--accent); border-color: var(--accent); color: hsl(0, 0%, 7%); }
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
.panel { display: none; max-width: 100%; }
.panel:not(.panel--doc) { max-width: 920px; }
.panel.active { display: block; }
.panel--doc .doc-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px;
  gap: 32px;
  align-items: start;
}
.doc-body { min-width: 0; max-width: 720px; }
.doc-h3 { font-size: 17px; font-weight: 700; margin: 28px 0 12px; padding-top: 8px; scroll-margin-top: 64px; }
.doc-h3:first-of-type { margin-top: 8px; }
.doc-h4 { font-size: 14px; font-weight: 600; margin: 16px 0 8px; color: var(--fg); }
.doc-p { color: var(--fg2); font-size: 13.5px; margin: 0 0 12px; line-height: 1.65; }
.doc-list { margin: 0 0 14px; padding-left: 20px; color: var(--fg2); font-size: 13.5px; line-height: 1.65; }
.doc-numbered {
  list-style: none; margin: 0 0 18px; padding: 0;
  display: flex; flex-direction: column; gap: 20px;
}
.doc-numbered-item {
  display: flex; gap: 10px; align-items: flex-start;
}
.doc-numbered-idx {
  font-size: 15px; font-weight: 700; color: var(--fg);
  min-width: 1.5em; line-height: 1.4; flex-shrink: 0;
}
.doc-numbered-body { flex: 1; min-width: 0; }
.doc-numbered-title {
  display: block; font-size: 15px; font-weight: 700; color: var(--fg);
  margin: 0 0 4px; line-height: 1.35;
}
.doc-numbered-desc {
  margin: 0; font-size: 13.5px; color: var(--fg2); line-height: 1.6;
}
.doc-section { margin-bottom: 8px; }
.pillar-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;
  margin-bottom: 20px;
}
.pillar {
  background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 12px 14px; font-size: 12.5px; color: var(--fg2); line-height: 1.5;
}
.pillar strong { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: var(--accent); margin-bottom: 4px; }
.doc-toc {
  position: sticky; top: 64px;
  display: flex; gap: 0; max-height: calc(100vh - 80px);
}
.doc-toc-rail {
  width: 2px; flex-shrink: 0; background: var(--border); border-radius: 1px;
  position: relative; margin-right: 12px; align-self: stretch; min-height: 120px;
}
.doc-toc-marker {
  position: absolute; left: 0; width: 2px; height: 22px;
  background: var(--accent); border-radius: 1px;
  transition: transform .2s ease, height .2s ease;
  transform: translateY(0);
}
.doc-toc-inner { flex: 1; overflow-y: auto; padding-bottom: 24px; }
.doc-toc-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--fg3); margin-bottom: 10px; }
.doc-toc-link {
  display: block; font-size: 13px; color: var(--fg3); text-decoration: none;
  padding: 5px 0; line-height: 1.35; transition: color .12s;
}
.doc-toc-link:hover { color: var(--fg); }
.doc-toc-link.active { color: var(--fg); font-weight: 600; }
.panel--doc .figure-grid { grid-template-columns: 1fr; margin: 12px 0 16px; }
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
@media (max-width: 960px) {
  .panel--doc .doc-layout { grid-template-columns: 1fr; }
  .doc-toc { display: none; }
}
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
    const railRect = rail.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const y = linkRect.top - railRect.top + (linkRect.height - 22) / 2;
    marker.style.transform = 'translateY(' + Math.max(0, y) + 'px)';
  }

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('data-toc-href').slice(1);
      const target = document.getElementById(id);
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
