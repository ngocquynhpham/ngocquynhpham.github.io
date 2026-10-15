/** Component docs — GUI design system (desktop utility for HID devices) */

export const BUTTONS_DOC = {
  pillars: [
    { title: 'Hierarchy', text: 'Apply to device, Save profile, Revert — never three primaries on one panel.' },
    { title: 'Feedback', text: 'Loading while writing firmware; disabled when device disconnected.' },
    { title: 'Labels', text: 'Verb-first, no jargon unless the audience expects it (DPI, polling rate).' },
  ],
  sections: [
    {
      id: 'anatomy',
      title: 'Anatomy',
      blocks: [
        { t: 'p', text: 'Desktop targets: minimum 32×32 px hit area; prefer 36 px height for dense settings panels.' },
        { t: 'ol', items: ['Container', 'Label', 'Optional leading icon', 'Optional loading indicator'] },
        { t: 'figure', label: 'Button anatomy', asset: ['web', 'components/buttons', 'Mass_button_1.png'] },
      ],
    },
    {
      id: 'states',
      title: 'States',
      blocks: [
        { t: 'numbered', items: [
          { title: 'Default', text: 'Ready for input.' },
          { title: 'Hover', text: 'Pointer highlight on desktop shell.' },
          { title: 'Active', text: 'Mouse down / pressed.' },
          { title: 'Focus-visible', text: 'Keyboard navigation in utility apps.' },
          { title: 'Disabled', text: 'Device offline or setting not applicable — show reason in helper text.' },
          { title: 'Loading', text: '“Applying…” — block duplicate writes to device.' },
        ]},
        { t: 'figure', label: 'Button states', asset: ['web', 'components/buttons', 'Mass_button_3.png'] },
      ],
    },
    {
      id: 'usage',
      title: 'Usage',
      blocks: [
        { t: 'ul', items: [
          'Primary: “Apply to device” — one per settings surface.',
          'Destructive: “Reset to factory” — confirm modal + semantic error color.',
          'Ghost: “Learn more” for firmware / driver help links.',
        ]},
        { t: 'figure', label: 'Button usage', asset: ['web', 'components/buttons', 'Mass_button_11.png'] },
      ],
    },
  ],
};

export const SLIDER_DOC = {
  pillars: [
    { title: 'Value', text: 'Show live numeric readout (DPI, brightness %, polling Hz).' },
    { title: 'Range', text: 'Clamp to hardware limits; snap optional steps.' },
    { title: 'Commit', text: 'Debounce rapid drags before sending HID reports.' },
  ],
  sections: [
    {
      id: 'anatomy',
      title: 'Anatomy',
      blocks: [
        { t: 'p', text: 'Track, fill, thumb, optional tick marks, value label aligned end or above.' },
        { t: 'figure', label: 'Slider anatomy', asset: ['ios', 'components/slider', 'slider_image_01.png'] },
      ],
    },
    {
      id: 'states',
      title: 'States',
      blocks: [
        { t: 'numbered', items: [
          { title: 'Default', text: 'Draggable when device connected.' },
          { title: 'Dragging', text: 'Thumb enlarged slightly; value updates live.' },
          { title: 'Disabled', text: 'Device asleep or wired-only mode blocking wireless brightness.' },
        ]},
        { t: 'figure', label: 'Slider states', asset: ['ios', 'components/slider', 'slider_image_04.png'] },
      ],
    },
    {
      id: 'usage',
      title: 'Usage',
      blocks: [
        { t: 'ul', items: [
          'DPI, LED brightness, audio sidetone, analog deadzone.',
          'Pair with Reset default link when profile allows.',
          'Do not use slider for binary options — use Switch.',
        ]},
      ],
    },
  ],
};

export const SWITCH_DOC = {
  pillars: [
    { title: 'Immediate', text: 'Toggle applies on change unless marked “Requires Apply”.' },
    { title: 'Label', text: 'State + function: “Wireless mode”, not only “On”.' },
    { title: 'Safety', text: 'Risky toggles (macro, overclock) need confirmation.' },
  ],
  sections: [
    {
      id: 'anatomy',
      title: 'Anatomy',
      blocks: [
        { t: 'p', text: 'Switch control + label (right or left per layout grid). Helper text for side effects.' },
        { t: 'figure', label: 'Switch anatomy', asset: ['web', 'components/switch', 'Mass_switch_1.png'] },
      ],
    },
    {
      id: 'states',
      title: 'States',
      blocks: [
        { t: 'numbered', items: [
          { title: 'Off / On', text: 'Clear contrast on dark utility backgrounds.' },
          { title: 'Disabled', text: 'Firmware too old — link to update.' },
          { title: 'Pending', text: 'Waiting for device ACK after toggle.' },
        ]},
        { t: 'figure', label: 'Switch states', asset: ['web', 'components/switch', 'Mass_switch_5.png'] },
      ],
    },
    {
      id: 'usage',
      title: 'Usage',
      blocks: [
        { t: 'ul', items: ['Wireless on/off', 'RGB sync', 'Game mode', 'Noise cancellation'] },
      ],
    },
  ],
};

export const CONNECTION_BADGE_DOC = {
  pillars: [
    { title: 'Truth', text: 'Reflect real transport state (USB, dongle, BLE), not last known.' },
    { title: 'Color', text: 'Semantic tokens: connected, updating, error, idle.' },
    { title: 'Action', text: 'Click opens troubleshoot or pair flow when error.' },
  ],
  sections: [
    {
      id: 'anatomy',
      title: 'Anatomy',
      blocks: [
        { t: 'ol', items: ['Status dot or icon', 'Short label (“Connected”, “Updating…”, “Disconnected”)', 'Optional chevron'] },
        { t: 'figure', label: 'Connection badge' },
      ],
    },
    {
      id: 'states',
      title: 'States',
      blocks: [
        { t: 'numbered', items: [
          { title: 'Connected', text: 'Semantic success — device ready for read/write.' },
          { title: 'Updating', text: 'Warning / pulse — block conflicting settings.' },
          { title: 'Disconnected', text: 'Error — show banner + disable write controls.' },
          { title: 'Sleep', text: 'Neutral — wake on input, read-only profile.' },
        ]},
      ],
    },
    {
      id: 'usage',
      title: 'Usage',
      blocks: [
        { t: 'p', text: 'Always visible in app header next to device selector. Never rely on badge alone for critical errors — pair with inline banner.' },
      ],
    },
  ],
};

export const DEVICE_VISUALIZER_DOC = {
  pillars: [
    { title: 'Mapping', text: '1:1 layout of keys / buttons on hardware.' },
    { title: 'Selection', text: 'Click key → assign macro, color, or DPI zone.' },
    { title: 'Performance', text: '2D SVG first; 3D only when it aids understanding.' },
  ],
  sections: [
    {
      id: 'anatomy',
      title: 'Anatomy',
      blocks: [
        { t: 'ol', items: ['Device canvas', 'Interactive regions (keys, zones)', 'Legend / layer switch (FN layer)', 'Zoom for compact keyboards'] },
        { t: 'figure', label: 'Device visualizer', asset: ['ios', 'components/block', 'block_image_01.png'] },
      ],
    },
    {
      id: 'states',
      title: 'States',
      blocks: [
        { t: 'numbered', items: [
          { title: 'Default', text: 'Neutral key caps.' },
          { title: 'Selected', text: 'Accent outline on active key.' },
          { title: 'Assigned', text: 'Dot or tint when remapped / lit.' },
          { title: 'Disabled', text: 'Dim entire canvas when disconnected.' },
        ]},
      ],
    },
    {
      id: 'usage',
      title: 'Usage',
      blocks: [
        { t: 'ul', items: [
          'Remap, per-key RGB, gaming mode exclusions.',
          'Sync selection with sidebar list for accessibility.',
          'Support keyboard navigation across keys where possible.',
        ]},
      ],
    },
  ],
};

export const ERROR_GUIDELINES_DOC = {
  pillars: [
    { title: 'Predictable', text: 'Same disconnect pattern everywhere in the app.' },
    { title: 'Recoverable', text: 'Tell user what to do: replug, wake device, retry pairing.' },
    { title: 'Non-destructive', text: 'Keep unsaved profile locally until user discards.' },
  ],
  sections: [
    {
      id: 'disconnect',
      title: 'Device disconnected',
      blocks: [
        { t: 'p', text: 'When the HID device is unplugged or link lost mid-session:' },
        { t: 'ol', items: [
          'Show sticky banner below header — semantic error background.',
          'Disable Apply, sliders, and visualizer writes; allow export profile.',
          'Toast optional for transient blips (<2s); banner for sustained loss.',
        ]},
      ],
    },
    {
      id: 'firmware',
      title: 'Firmware & errors',
      blocks: [
        { t: 'ul', items: [
          'Modal for failed flash — do not close silently.',
          'Progress component with cancel only when safe.',
          'Log link for support (copy diagnostics).',
        ]},
        { t: 'figure', label: 'Error modal', asset: ['web', 'components/popup', 'Mass_popup_1.png'] },
      ],
    },
    {
      id: 'toast',
      title: 'Toast vs modal',
      blocks: [
        { t: 'p', text: 'Toast: profile saved, minor retry success. Modal: data loss, firmware failure, incompatible device.' },
        { t: 'figure', label: 'Toast', asset: ['web', 'components/popup', 'Mass_popup_2.png'] },
      ],
    },
  ],
};

export function genericComponentDoc(title, desc) {
  return {
    pillars: [
      { title: 'Anatomy', text: 'Structure for dense desktop utility layouts.' },
      { title: 'States', text: 'Include disconnected / pending device states when writes are involved.' },
      { title: 'Usage', text: 'When to use in device configuration flows.' },
    ],
    sections: [
      {
        id: 'anatomy',
        title: 'Anatomy',
        blocks: [
          { t: 'p', text: `${title}: parts and spacing. Align with foundation 8px grid.` },
          { t: 'figure', label: `${title} anatomy` },
        ],
      },
      {
        id: 'states',
        title: 'States',
        blocks: [
          { t: 'numbered', items: [
            { title: 'Default', text: 'Interactive.' },
            { title: 'Hover / focus', text: 'Desktop pointer and keyboard.' },
            { title: 'Disabled', text: 'Device offline or read-only mode.' },
            { title: 'Loading', text: 'Waiting on device or driver.' },
          ]},
          { t: 'figure', label: `${title} states` },
        ],
      },
      {
        id: 'usage',
        title: 'Usage',
        blocks: [{ t: 'p', text: desc }, { t: 'figure', label: `${title} usage` }],
      },
    ],
  };
}

export const COMPONENT_ASSETS = {
  Dropdown: ['web', 'components/dropdown', 'Mass_dropdown_1.png'],
  Inputs: ['web', 'components/inputs', 'Mass_input_1.png'],
  Tabs: ['web', 'components/tabs', 'Mass_tab_1.png'],
  Loading: ['web', 'components/loading', 'Mass_loading_1.png'],
  Navigation: ['web', 'components/gnb', 'Mass_gnb_1.png'],
};
