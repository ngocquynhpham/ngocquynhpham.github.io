/** Case study — Razer Synapse / Logitech G Hub style HID utility GUI */

export const CASE_STUDY_OVERVIEW_DOC = {
  pillars: [
    { title: 'GUI', text: 'The finished app users open — dashboard, device detail, sliders, device image.' },
    { title: 'Design System', text: 'Tokens, hardware components, and state rules engineers reuse on every screen.' },
    { title: 'Reference', text: 'Synapse & G Hub patterns — not a copy of either brand.' },
  ],
  sections: [
    {
      id: 'gui-house',
      title: 'GUI vs Design System',
      blocks: [
        {
          t: 'p',
          text: 'GUI is the house users live in. The Design System is the blueprint, standard bricks, and paint rules so every floor uses the same materials.',
        },
        { t: 'ul', items: [
          'Same DPI slider on Performance tab and onboard memory tab',
          'Same disconnect banner everywhere — not one screen custom-hacked',
          'Accent only on active controls and selected device regions',
        ]},
      ],
    },
    {
      id: 'screens',
      title: 'Two primary screens',
      blocks: [
        { t: 'h4', text: 'Dashboard (home)' },
        {
          t: 'p',
          text: 'Lists HID devices currently attached: product image, name, connection type, battery %. Click a tile to open configuration.',
        },
        { t: 'h4', text: 'Device detail' },
        {
          t: 'p',
          text: 'Left: capability menu (Performance, Lighting, Buttons, Macros). Center: interactive device image. Bottom or right: sliders and toggles for the active section.',
        },
      ],
    },
  ],
};

export const CASE_STUDY_GUI_DOC = {
  pillars: [
    { title: 'Dashboard', text: 'All devices at a glance — mouse + keyboard + % battery.' },
    { title: 'Detail', text: 'One device, deep settings — visualizer + controls.' },
    { title: 'Zones', text: 'Fixed regions so users never hunt for status or save.' },
  ],
  sections: [
    {
      id: 'dashboard',
      title: 'Dashboard layout',
      blocks: [
        { t: 'ol', items: [
          'Global header — app name, profile, settings',
          'Grid of device cards — hero image, name, badge, battery',
          'Empty state when no HID device detected — pair / plug in CTA',
        ]},
      ],
    },
    {
      id: 'detail',
      title: 'Mouse configuration (example)',
      blocks: [
        { t: 'p', text: 'User clicked the mouse card. Typical Synapse / G Hub structure:' },
        { t: 'numbered', items: [
          { title: 'Sidebar', text: 'Performance · Lighting · Buttons · Power · Firmware', prefix: '1.' },
          { title: 'Visualizer', text: 'Top-down mouse render — click Left / Right / Side buttons to remap.', prefix: '2.' },
          { title: 'Controls', text: 'DPI slider 100–16000, polling rate dropdown, surface tuning.', prefix: '3.' },
        ]},
      ],
    },
  ],
};

export const CASE_STUDY_TOKENS_DOC = {
  pillars: [
    { title: 'Dark shell', text: '#111111 canvas, #1F1F1F panels — LED previews pop.' },
    { title: 'Accent', text: 'Brand green/blue on thumbs, toggles, selected anchors only.' },
    { title: 'Type', text: 'Big bold DPI numerals; 12px regular helper copy.' },
  ],
  sections: [
    {
      id: 'color',
      title: 'Color tokens (gaming utility)',
      blocks: [
        { t: 'ul', items: [
          '--gui-bg-0: #111111 — main window background',
          '--gui-bg-1: #1F1F1F — cards, sidebar, control panels',
          'Accent — product theme (e.g. Razer #00FF00, Logitech blue); map to --gui-primary',
          'Semantic: connected green, error red, updating amber',
        ]},
        { t: 'p', text: 'Use data-product-theme="gaming-razer" | "gaming-logitech" on the app root to swap accent without forked components.' },
      ],
    },
    {
      id: 'type',
      title: 'Typography tokens',
      blocks: [
        { t: 'ul', items: [
          'DPI / polling value — Inter 24px Bold, tabular nums',
          'Section title — 14–16px Semibold',
          'Feature description — 12px Regular, secondary text color',
          'Legal / firmware notes — 11px caption',
        ]},
      ],
    },
  ],
};

export const CASE_STUDY_COMPONENTS_DOC = {
  pillars: [
    { title: 'DPI slider', text: 'Stepped ticks (e.g. 50 DPI), live value, debounced device write.' },
    { title: 'Device mapper', text: 'Anchor points on PNG/SVG — hover glow, click to assign.' },
    { title: 'Battery', text: 'Full · low · charging · unknown — four visual states.' },
  ],
  sections: [
    {
      id: 'dpi',
      title: 'DPI slider',
      blocks: [
        { t: 'p', text: 'Not a generic range input: snap to allowed steps, show min/max labels, optional stage presets (400 / 800 / 1600).' },
        { t: 'figure', label: 'DPI slider', asset: ['ios', 'components/slider', 'slider_image_01.png'] },
      ],
    },
    {
      id: 'mapper',
      title: 'Device image mapper',
      blocks: [
        { t: 'ol', items: [
          'Asset layer — device photo or illustrated silhouette',
          'Hit regions — % bounding boxes or SVG paths per button',
          'Hover — accent outline; selected — filled accent ring',
          'Sync — list view highlights same button for keyboard users',
        ]},
        { t: 'figure', label: 'Device visualizer', asset: ['ios', 'components/block', 'block_image_01.png'] },
      ],
    },
    {
      id: 'battery',
      title: 'Battery indicator',
      blocks: [
        { t: 'numbered', items: [
          { title: 'Full', text: 'Green fill, ≥20% or charging complete.' },
          { title: 'Low', text: 'Red, ≤15% — optional toast.' },
          { title: 'Charging', text: 'Lightning icon overlay.' },
          { title: 'Unknown', text: 'Gray — wired-only or missing telemetry.' },
        ]},
      ],
    },
  ],
};

export const CASE_STUDY_STATES_DOC = {
  pillars: [
    { title: 'Connected', text: 'Sharp device art, controls enabled.' },
    { title: 'Disconnected', text: '50% opacity, controls disabled, red banner copy.' },
    { title: 'Saving', text: 'Spinner on control → success checkmark on device ACK.' },
  ],
  sections: [
    {
      id: 'device',
      title: 'Device connection states',
      blocks: [
        { t: 'numbered', items: [
          { title: 'Connected', text: 'Image full opacity; Performance / Lighting editable.' },
          { title: 'Disconnected', text: 'Image opacity 50%; sliders disabled; label: “Connect your device” (localized).' },
          { title: 'Sleep / idle', text: 'Read-only profile; wake on first input.' },
        ]},
      ],
    },
    {
      id: 'save',
      title: 'Saving configuration',
      blocks: [
        { t: 'p', text: 'When DPI or remap changes, show inline spinner on the control (or row), then green check + “Saved to device memory” — not a blocking modal for success.' },
        { t: 'ul', items: [
          'Failure: keep spinner → error icon + retry',
          'Debounce rapid slider drags before HID write storm',
          'Disable Apply while a write is in flight',
        ]},
      ],
    },
  ],
};

/** Interactive wireframe for gui.html (Synapse / G Hub pattern) */
export const CASE_STUDY_MOCK_HTML = `<div class="card">
  <div class="card-title">Interactive mock · Dashboard + mouse detail</div>
  <p class="doc-p" style="margin-top:0">Toggle disconnect to see Design System rules: dim device, lock sliders, show banner.</p>
  <div class="cs-mock-toolbar">
    <button type="button" class="gui-btn gui-btn--outline cs-mock-btn" onclick="toggleSynapseDisconnect()">Simulate unplug</button>
    <span class="cs-mock-hint mono">data-product-theme=&quot;gaming-razer&quot;</span>
  </div>
  <div class="cs-mock" id="synapse-mock" data-product-theme="gaming-razer">
    <div class="cs-mock__banner" role="alert">Connect your device to change settings.</div>
    <div class="cs-mock__grid">
      <section class="cs-mock__panel" aria-label="Dashboard">
        <h4 class="cs-mock__title">Dashboard</h4>
        <div class="cs-mock__cards">
          <button type="button" class="cs-device-card cs-device-card--active" aria-pressed="true">
            <span class="cs-device-card__icon">🖱</span>
            <span class="cs-device-card__name">Pro Mouse X</span>
            <span class="gui-badge gui-badge--connected cs-device-card__badge"><span class="gui-badge__dot"></span>USB</span>
            <span class="gui-battery cs-battery--ok">🔋 78%</span>
          </button>
          <div class="cs-device-card">
            <span class="cs-device-card__icon">⌨</span>
            <span class="cs-device-card__name">Mechanical K</span>
            <span class="gui-badge gui-badge--connected cs-device-card__badge"><span class="gui-badge__dot"></span>2.4G</span>
            <span class="gui-battery cs-battery--low">🔋 12%</span>
          </div>
        </div>
      </section>
      <section class="cs-mock__panel cs-mock__panel--detail" aria-label="Device detail">
        <h4 class="cs-mock__title">Performance · Mouse</h4>
        <div class="cs-mock__detail">
          <nav class="cs-mock__nav">
            <span class="cs-mock__nav-item cs-mock__nav-item--on">Performance</span>
            <span class="cs-mock__nav-item">Lighting</span>
            <span class="cs-mock__nav-item">Buttons</span>
          </nav>
          <div class="cs-mock__viz">
            <div class="cs-mouse">
              <button type="button" class="cs-mouse__btn cs-mouse__btn--l" title="Left click">L</button>
              <button type="button" class="cs-mouse__btn cs-mouse__btn--r" title="Right click">R</button>
              <button type="button" class="cs-mouse__btn cs-mouse__btn--s1" title="Side">S1</button>
              <span class="cs-mouse__body"></span>
            </div>
          </div>
          <div class="cs-mock__controls">
            <div class="cs-dpi-row">
              <span class="cs-dpi-label">DPI</span>
              <span class="cs-dpi-value">1600</span>
            </div>
            <input type="range" class="gui-slider cs-dpi-slider" min="100" max="16000" step="50" value="1600" aria-label="DPI" />
            <div class="cs-save-row">
              <span class="cs-save cs-save--ok" aria-live="polite">✓ Saved to device memory</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>`;
