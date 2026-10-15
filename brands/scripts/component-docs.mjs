/** Shared component doc structures (English) for Quinn guidelines SPA */

export const COLOR_WEB_DOC = {
  pillars: [
    { title: 'Standardized color', text: 'Defined service colors and usage rules for the Quinn brand.' },
    { title: 'Consistent experience', text: 'A formal color system keeps UI predictable and strengthens brand recognition.' },
    { title: 'TV-first validation', text: 'Test on real displays — TV contrast and gamut differ from web.' },
  ],
  sections: [
    {
      id: 'principles-of-use',
      title: 'Principles of use',
      blocks: [
        { t: 'h4', text: 'Color testing on TV' },
        { t: 'p', text: 'TV screens have higher contrast than typical web monitors, so intended colors can look different. Higher saturation reads brighter and more vivid, so test across display settings and models.' },
        { t: 'p', text: 'Displays render color with RGB sub-pixels. Cool tones (blues) often reproduce more reliably. White balance and color temperature settings shift overall hue; many TVs are tuned with green as reference, so warm tones can appear more sensitive.' },
        { t: 'figure', label: 'Color testing on TV displays' },
        { t: 'h4', text: 'sRGB & DCI-P3' },
        { t: 'p', text: 'sRGB and DCI-P3 describe the gamut a TV can reproduce. sRGB is the most common and compatible across the widest range of sets.' },
        { t: 'p', text: 'DCI-P3 can look richer for video; content authored in P3 may not translate on all TVs and is best treated as a premium-display target.' },
        { t: 'ul', items: [
          'Prefer colors with clear lightness contrast and restrained saturation on UI chrome.',
          'Avoid assuming web-calibrated swatches will match living-room viewing.',
        ]},
        { t: 'figure', label: 'sRGB vs DCI-P3 gamut' },
      ],
    },
    {
      id: 'brand-color',
      title: 'Brand color',
      blocks: [
        { t: 'p', text: 'Brand color unifies the product and supports recognition — follow the token rules below.' },
        { t: 'p', text: 'Quinn is content-first: do not sprinkle arbitrary hues; use specified chips for UI chrome.' },
        { t: 'numbered', items: [
          { title: 'Three chip families', text: 'Use the three recommended Quinn brand chip families (primary, secondary, accent roles).' },
          { title: 'Stay on-brand', text: 'Avoid unrelated hues outside the defined palette.' },
          { title: 'Buttons & complement', text: 'Primary actions use brand color; complementary hues may pair for contrast on CTAs.' },
          { title: 'Dark theme hierarchy', text: 'On dark UI, combine low-saturation brand tones with point color to clarify layers.' },
        ]},
        { t: 'figure', label: 'Brand color chips' },
      ],
    },
    {
      id: 'tv-white-color',
      title: 'TV white color',
      blocks: [
        { t: 'p', text: 'High TV contrast makes white appear especially bright. Lower luminance in tokens reduces eye strain during long sessions.' },
        { t: 'figure', label: 'Adjusted white on TV' },
      ],
    },
    {
      id: 'tv-dark-theme',
      title: 'TV dark theme',
      blocks: [
        { t: 'p', text: 'Dark theme cuts glare, improves legibility, and keeps attention on content.' },
        { t: 'numbered', items: [
          { title: 'Point color visibility', text: 'Use bright (low-sat / pastel) or vivid (high-sat) accents so focus and CTAs read on dark backgrounds.' },
          { title: 'Avoid harsh saturation', text: 'Very saturated large fields on dark UI can halo or vibrate — limit area.' },
          { title: 'Small accent areas', text: 'Apply point color to narrow regions (focus rings, badges, key CTAs).' },
          { title: 'Comfort over decoration', text: 'If accent coverage grows too wide, reduce saturation or area.' },
        ]},
        { t: 'figure', label: 'Dark theme + point color' },
      ],
    },
    {
      id: 'color-palette',
      title: 'Color palette',
      blocks: [
        { t: 'numbered', items: [
          { title: 'Primary color', text: 'Hero brand hue. Core UI that defines the Quinn experience must stay within primary chips.' },
          { title: 'Gray color', text: 'Neutral ramp for structure and typography — mostly text and subtle surfaces.' },
          { title: 'Background color', text: 'Full-screen backdrop; usually derived from primary/secondary neutrals, sub tones when needed.' },
          { title: 'Dimmed color', text: 'Scrim over content for modals and overlays — opacity-based tokens.' },
          { title: 'Alert color', text: 'Errors, warnings, and critical system messages.' },
        ]},
        { t: 'figure', label: 'Primary · Gray · Background · Dimmed · Alert' },
      ],
    },
    {
      id: 'usage-color-guide',
      title: 'Usage color guide',
      blocks: [
        { t: 'p', text: 'Order color by information priority — the most important message should win contrast first.' },
        { t: 'figure', label: 'Hierarchy & contrast examples' },
      ],
    },
  ],
};

export const TYPOGRAPHY_WEB_DOC = {
  pillars: [
    { title: 'TV OS alignment', text: 'Standard fonts per platform keep design and engineering efficient.' },
    { title: 'Purpose-driven type', text: 'Pick family and style for defined roles — not decoration.' },
    { title: 'Balanced reading', text: 'Hierarchy improves scanability on ten-foot UI.' },
  ],
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      blocks: [
        { t: 'p', text: 'Standardized TV OS typography lets design and engineering work efficiently on the same type system.' },
        { t: 'p', text: 'Choose family and styles according to each token’s defined purpose and function — not ad hoc sizing on every screen.' },
        { t: 'p', text: 'Balanced type across the UI improves scanability and the overall Quinn TV viewing experience.' },
        { t: 'figure', label: 'Type scale overview' },
      ],
    },
    {
      id: 'brand-font',
      title: 'Brand font',
      blocks: [
        { t: 'p', text: 'Type carries brand identity and keeps visual consistency. Use Quinn’s defined family, styles, and color pairing so users recognize the product at a glance.' },
        { t: 'p', text: 'Quinn TV uses Quinn Sans as the shared brand typeface — tuned for LED and large displays with optimal spacing and legibility at viewing distance.' },
        { t: 'p', text: 'Supports Korean, Latin, and numerals. Weights: Bold, Medium, and Light.' },
        { t: 'numbered', items: [
          { title: 'Weight', text: 'Stroke weight minimizes clumping on LED panels and avoids a cramped, overly heavy look.' },
          { title: 'Legibility', text: 'Straight segments on the letterforms are widened so shapes read cleanly on screen.' },
          { title: 'Identity', text: 'Bottom-left skeleton rounding on select glyphs gives Quinn a distinct, recognizable brand character.' },
        ]},
        { t: 'figure', label: 'Quinn Sans · Bold / Medium / Light' },
      ],
    },
    {
      id: 'hierarchy',
      title: 'Hierarchy',
      blocks: [
        { t: 'p', text: 'Type emphasizes important information and builds visual hierarchy. Use headline, title, body, and supporting styles to show structure and priority.' },
        { t: 'p', text: 'Combine weight, style, color, and placement to guide attention so users find what they need quickly on ten-foot UI.' },
        { t: 'numbered', items: [
          { title: 'Headline', text: 'Largest type on screen — short, high-priority messages.' },
          { title: 'Title', text: 'Module or section titles that name a function or content block.' },
          { title: 'Body', text: 'Primary reading text for descriptions and metadata.' },
          { title: 'Label', text: 'Compact titles on small controls or chips.' },
          { title: 'Caption', text: 'Secondary hints — subtitles, breadcrumbs, or supporting paths.' },
        ]},
        { t: 'figure', label: 'Type hierarchy' },
      ],
    },
  ],
};

export const ICONOGRAPHY_WEB_DOC = {
  pillars: [
    { title: 'Intuitive symbols', text: 'Familiar pictograms explain function faster than text on ten-foot UI.' },
    { title: 'Grid & stroke', text: 'Fixed grid, stroke weight, and corner rules keep sets visually balanced.' },
    { title: 'Shared state tokens', text: 'Enabled, selected, focused, and disabled apply the same tokens everywhere.' },
  ],
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      blocks: [
        { t: 'p', text: 'Icons use familiar, simplified shapes to express features and context more intuitively than copy alone — helping users understand Quinn TV at a glance.' },
        { t: 'figure', label: 'Icon set overview' },
      ],
    },
    {
      id: 'icon-design',
      title: 'Icon design',
      blocks: [
        { t: 'p', text: 'When drawing or exporting icons, follow these rules so the set feels cohesive on LED and living-room displays.' },
        { t: 'numbered', items: [
          { title: 'Visual weight', text: 'Balance optical weight across icons so none feel heavier or lighter than its neighbors in the same context.' },
          { title: 'Stroke width', text: 'Unify stroke width between 3px and 4px at the master artboard scale.' },
          { title: 'Corners', text: 'Set corner radius per icon so the shape reads clearly — do not force one global radius if it fights the metaphor.' },
          { title: 'Slant', text: 'Apply tilt only when the metaphor needs it (e.g. play, send); keep most UI icons upright.' },
        ]},
        { t: 'figure', label: 'Weight · stroke · corners' },
      ],
    },
    {
      id: 'grid',
      title: 'Grid',
      blocks: [
        { t: 'p', text: 'Work inside a fixed grid and keylines so icons align on screen with consistent balance and visual weight.' },
        { t: 'figure', label: '48px icon grid' },
      ],
    },
    {
      id: 'size',
      title: 'Size',
      blocks: [
        { t: 'p', text: 'Author icons at 48×48px as the master asset. Ship one source file per icon and scale down or up in UI — do not redraw per density unless platform requires it.' },
        { t: 'figure', label: '48px master · scaled usage' },
      ],
    },
    {
      id: 'color',
      title: 'Color',
      blocks: [
        { t: 'p', text: 'Default icon color is Quinn TV white (#F5F5FF). When an icon needs a distinct hue, export a separate colored asset — do not rely on runtime tinting that breaks token parity.' },
        { t: 'figure', label: 'Default white · colored variants' },
      ],
    },
    {
      id: 'states',
      title: 'States',
      blocks: [
        { t: 'p', text: 'Every icon supports the same four states. Apply the defined design tokens consistently — do not invent one-off treatments per screen.' },
        { t: 'numbered', items: [
          { title: 'Enabled', text: 'Default active icon — available for interaction.' },
          { title: 'Selected', text: 'User has chosen this icon (e.g. toggle on, current tab).' },
          { title: 'Focused', text: 'D-pad or pointer focus so the user can see where they are on screen.' },
          { title: 'Disabled', text: 'Unavailable — reduced contrast per disabled token.' },
        ]},
        { t: 'figure', label: 'Icon states' },
      ],
    },
    {
      id: 'naming-rules',
      title: 'Naming rules',
      blocks: [
        { t: 'p', text: 'Name assets with the rules below so engineering and design can find and ship icons predictably.' },
        { t: 'numbered', items: [
          { title: 'Lowercase only', text: 'Use US English lowercase a–z, underscore _, and digits 0–9. No other characters.' },
          { title: 'Start with a letter', text: 'The first character must be a–z. Do not start with a digit or underscore.' },
          { title: 'No hyphens', text: 'Spaces are not allowed. Separate words with underscore _, not hyphen -.' },
          { title: 'File extension', text: 'Use .png when alpha is required; use .jpg when the image has no transparency.' },
        ]},
      ],
    },
    {
      id: 'naming-structure',
      title: 'Name structure',
      blocks: [
        { t: 'p', text: 'Build each filename from prefix, root, and optional suffix segments.' },
        { t: 'numbered', items: [
          { title: 'Prefix', text: 'Asset type defines what the resource is. Namespace defines where it appears — omit namespace for icons reused across screens; add it only for icons tied to a specific surface or subclass.' },
          { title: 'Root', text: 'A noun that best describes the icon (e.g. search, home, settings).' },
          { title: 'Suffix', text: 'If prefix + root is ambiguous or collides with another asset, append the minimum extra segments in the order shown in the naming diagram.' },
        ]},
        { t: 'figure', label: 'Naming diagram' },
      ],
    },
    {
      id: 'sample',
      title: 'Sample',
      blocks: [
        { t: 'p', text: 'Example filenames following prefix, root, and suffix — use as a template for new Quinn TV icons.' },
        { t: 'figure', label: 'Naming samples' },
      ],
    },
  ],
};

export const QUINN_ASSIST_WEB_DOC = {
  pillars: [
    { title: 'Media LLM', text: 'Multi-turn dialogue specialized for media and entertainment.' },
    { title: 'Conversational search', text: 'Find and explore content through natural language.' },
    { title: 'Voice-first entry', text: 'Dock, search, banners, and remote mic / wake phrase.' },
  ],
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      blocks: [
        { t: 'p', text: 'Quinn Assist is an LLM-powered assistant focused on the media content domain. It supports multi-turn conversation, interactive content discovery, and voice-led navigation across the Quinn TV experience.' },
        { t: 'figure', label: 'Quinn Assist overview' },
      ],
    },
    {
      id: 'service-entry',
      title: 'How to open Assist',
      blocks: [
        { t: 'numbered', items: [
          { title: 'Dock menu', text: 'Launch from the dock menu icon.' },
          { title: 'Unified search', text: 'Enter via the assistant action on unified search.' },
          { title: 'Merchandising banner', text: 'Tap through featured placement in browse surfaces.' },
          { title: 'Voice invocation', text: 'Remote microphone key or platform voice input (e.g. FFV).' },
        ]},
        { t: 'figure', label: 'Entry points · Dock · Search · Banner · Voice' },
      ],
    },
    {
      id: 'voice-ui',
      title: 'Voice UI',
      blocks: [
        { t: 'p', text: 'Voice chrome communicates agent state: icon shape and helper copy change per state so users get clear feedback during voice input and responses.' },
        { t: 'figure', label: 'Voice chrome states' },
      ],
    },
    {
      id: 'agent-states',
      title: 'Agent states',
      blocks: [
        { t: 'numbered', items: [
          { title: 'Mic idle', text: 'Microphone is closed — default waiting state.' },
          { title: 'Mic active', text: 'Listening for user speech; no utterance detected yet.' },
          { title: 'User speaking', text: 'User speech is being captured.' },
          { title: 'Analyzing', text: 'Utterance finished; system parses intent and generates a reply.' },
          { title: 'Assist speaking', text: 'Answer is playing — TTS audio for the message region is active.' },
        ]},
      ],
    },
    {
      id: 'voice-ui-policy',
      title: 'Voice UI by state',
      blocks: [
        { t: 'p', text: 'Icon, on-screen copy, focus behavior, and STT bubble rules per agent state.' },
        { t: 'h4', text: 'Mic idle' },
        { t: 'ul', items: [
          'Voice chrome icon: state-specific asset (see design spec).',
          'Voice chrome copy: “Press the voice search key on your remote, or say ‘Hey Quinn…’ and ask your question.”',
          'Focus: shown normally.',
        ]},
        { t: 'h4', text: 'Mic active' },
        { t: 'ul', items: [
          'Voice chrome icon: state-specific asset.',
          'Voice chrome copy: “Go ahead — I’m listening.”',
          'Focus: hidden.',
        ]},
        { t: 'h4', text: 'User speaking' },
        { t: 'ul', items: [
          'Voice chrome icon: state-specific asset.',
          'Voice chrome copy: live partial utterance text.',
          'Focus: hidden.',
          'STT bubble: stream recognized speech in a right-aligned bubble in real time.',
        ]},
        { t: 'h4', text: 'Analyzing' },
        { t: 'ul', items: [
          'Entered when speech ends, until a reply is ready.',
          'Voice chrome icon: state-specific asset.',
          'Voice chrome copy: dimmed version of the last utterance.',
          'Focus: hidden.',
        ]},
        { t: 'h4', text: 'Assist speaking' },
        { t: 'ul', items: [
          'Voice chrome icon: state-specific asset.',
          'Voice chrome copy: not shown (answer body carries content).',
          'Focus: shown normally.',
        ]},
        { t: 'figure', label: 'Icon + copy matrix by state' },
      ],
    },
  ],
};

export const LAYOUT_WEB_DOC = {
  pillars: [
    { title: 'Structural template', text: 'Keeps visual consistency across Quinn TV screens.' },
    { title: 'Grid & spacing', text: 'Defines columns, gutters, and regions for UI and content.' },
    { title: 'Content-first', text: 'Layout choices should optimize how information and media read on TV.' },
  ],
  sections: [
    {
      id: 'composition',
      title: 'Composition',
      blocks: [
        { t: 'h4', text: 'Screen layout definition' },
        { t: 'p', text: 'Baseline structure for Quinn streaming UI on Android TV — rails, safe areas, and page shells.' },
        { t: 'figure', label: 'Default screen composition' },
      ],
    },
    {
      id: 'rule',
      title: 'Rule',
      blocks: [
        { t: 'numbered', items: [
          {
            title: 'Resolution',
            text: 'Unlike web or mobile, TV is fixed 16:9. Design at 1920×1080 so elements scale proportionally on HD and 4K.',
          },
          {
            title: 'Unit',
            text: 'Layout values in px should land on even numbers for cleaner scaling and alignment.',
          },
          {
            title: 'Safe zone',
            text: 'Keep critical UI inside safe margins so overscan on older TVs does not clip content. Use 40px top/bottom and 72px left/right unless platform overrides apply.',
          },
        ]},
        { t: 'figure', label: 'Safe zone · 1920×1080' },
      ],
    },
    {
      id: 'grid',
      title: 'Grid',
      blocks: [
        { t: 'p', text: 'Each column has a fixed width; content aligns to defined columns for predictable rhythm and stable focus paths.' },
        { t: 'p', text: 'Quinn Android TV uses a 12-column grid — column width 114px, gutter 20px (adjust in tokens when platform requires).' },
        { t: 'figure', label: '12-column grid spec' },
      ],
    },
    {
      id: 'type',
      title: 'Type',
      blocks: [
        { t: 'p', text: 'Pick a grid type based on screen role — each type maps to a layout template.' },
        { t: 'numbered', items: [
          { title: 'Default', text: 'Standard browsing and content rails.' },
          { title: 'GNB', text: 'When global navigation is expanded or primary.' },
          { title: 'Synopsis', text: 'Detail / synopsis screens with metadata and actions.' },
        ]},
        { t: 'figure', label: 'Default · GNB · Synopsis layouts' },
      ],
    },
    {
      id: 'arrange-pattern',
      title: 'Arrange pattern',
      blocks: [
        { t: 'p', text: 'Lay out for D-pad movement: focus order should follow natural remote directions.' },
        { t: 'numbered', items: [
          { title: 'Horizontal', text: 'Default rail — items in a row, left-aligned; groups tiles and controls.', prefix: 'A.' },
          { title: 'Vertical', text: 'Stacks content vertically; groups text-heavy blocks and lists.', prefix: 'B.' },
        ]},
        { t: 'figure', label: 'Horizontal vs vertical rails' },
      ],
    },
  ],
};

export const BUTTONS_WEB_DOC = {
  pillars: [
    { title: 'Style', text: 'Visual layer: size, color, and shape.' },
    { title: 'Content', text: 'Icon and label inside the button that communicates purpose.' },
    { title: 'Types', text: 'Functional meaning of the button; type influences which style to use.' },
  ],
  sections: [
    {
      id: 'anatomy',
      title: 'Anatomy',
      blocks: [
        { t: 'p', text: 'Elements that may appear in a button. All variants use the same token set.' },
        { t: 'h4', text: 'Common button' },
        { t: 'ol', items: ['Icon (optional)', 'Text label', 'Container'] },
        { t: 'figure', label: 'Common button anatomy' },
        { t: 'h4', text: 'Time mapping button' },
        { t: 'ol', items: ['Text label', 'Time count', 'Container'] },
        { t: 'figure', label: 'Time mapping anatomy' },
        { t: 'h4', text: 'Key button' },
        { t: 'ol', items: ['Text label', 'Key icon', 'Container'] },
        { t: 'figure', label: 'Key button anatomy' },
        { t: 'h4', text: 'Icon button' },
        { t: 'ol', items: ['Icon', 'Container'] },
        { t: 'figure', label: 'Icon button anatomy' },
      ],
    },
    {
      id: 'states',
      title: 'States',
      blocks: [
        { t: 'p', text: 'Definition of elements per button. All state visuals use the same tokens.' },
        { t: 'numbered', items: [
          { title: 'Enabled', text: 'Default interactive button — ready for input.' },
          { title: 'Selected', text: 'The user has chosen this button (when selection applies).' },
          { title: 'Focused', text: 'D-pad / remote focus is on this button.' },
          { title: 'Disabled', text: 'Inactive — action unavailable.' },
        ]},
        { t: 'figure', label: 'Enabled · Selected · Focused · Disabled' },
      ],
    },
    {
      id: 'types',
      title: 'Types',
      blocks: [
        { t: 'p', text: 'Types depend on what the button includes and when to use each pattern.' },
        { t: 'numbered', items: [
          { title: 'Common button', text: 'The default pattern for primary actions.', prefix: 'A.' },
          { title: 'Time mapping button', text: 'Use when the action is tied to time (elapsed or remaining).', prefix: 'B.' },
          { title: 'Key button', text: 'Includes guidance for a specific remote key.', prefix: 'C.' },
          { title: 'Icon button', text: 'Use when an icon alone is intuitive enough.', prefix: 'D.' },
        ]},
        { t: 'figure', label: 'Button types overview' },
      ],
    },
    {
      id: 'style',
      title: 'Style',
      blocks: [
        { t: 'p', text: 'Shape and size combine to express visual priority on TV.' },
        { t: 'h4', text: 'Shape' },
        { t: 'p', text: 'Container shape defines the family. Square → higher importance than Rounded for the same size tier.' },
        { t: 'h4', text: 'Size' },
        { t: 'p', text: 'Height tiers: Large > Medium > Small (importance follows the same order).' },
        { t: 'figure', label: 'Shape × size matrix' },
      ],
    },
    {
      id: 'icon',
      title: 'Icon',
      blocks: [
        { t: 'ul', items: [
          'Use icons only when meaning stays obvious at ten-foot distance.',
          'Do not stack icon and label vertically inside one button.',
          'Fixed 8px gap between icon and label.',
          'One icon per button.',
          'Icon color is flat; state colors come from tokens.',
        ]},
        { t: 'figure', label: 'Icon + label layout' },
      ],
    },
    {
      id: 'container',
      title: 'Container',
      blocks: [
        { t: 'p', text: 'Text labels must sit inside a container (solid fill or equivalent token treatment).' },
        { t: 'ul', items: [
          'Width grows with label length; min horizontal padding per size tier.',
          'Content is center-aligned (except time-mapping and key button layouts).',
          'Container fill is solid; state colors from tokens.',
        ]},
        { t: 'figure', label: 'Container padding & alignment' },
      ],
    },
    {
      id: 'usage',
      title: 'Usage',
      blocks: [
        { t: 'p', text: 'Combine icon and label so the action is scannable on a TV screen.' },
        { t: 'ul', items: [
          'Prefer a short label when it is clearer than an icon alone.',
          'Labels are concise nouns — not full sentences.',
          'Label must match the action; no extra metadata in the label.',
          'Use loading/disabled patterns so users know work is in progress — not a mistaken tap.',
        ]},
        { t: 'figure', label: 'Do / Don’t examples' },
      ],
    },
  ],
};

export function genericComponentDoc(title, desc) {
  const slug = title.replace(/\s+/g, '-');
  return {
    pillars: [
      { title: 'Anatomy', text: 'Required parts and optional slots for this control.' },
      { title: 'States', text: 'Enabled, focused, selected, disabled — token-driven.' },
      { title: 'Usage', text: 'When to use on TV vs patterns to avoid.' },
    ],
    sections: [
      {
        id: 'anatomy',
        title: 'Anatomy',
        blocks: [
          { t: 'p', text: `${title}: structural elements and spacing. Replace diagram when final spec is ready.` },
          { t: 'figure', label: `${title} anatomy` },
        ],
      },
      {
        id: 'states',
        title: 'States',
        blocks: [
          { t: 'p', text: 'All visual states must use foundation tokens (focus, disabled, selected).' },
          { t: 'numbered', items: [
            { title: 'Enabled', text: 'Default interactive state.' },
            { title: 'Selected', text: 'User has selected this control (if applicable).' },
            { title: 'Focused', text: 'Remote focus is on this control.' },
            { title: 'Disabled', text: 'Unavailable — no activation.' },
          ]},
          { t: 'figure', label: `${title} states` },
        ],
      },
      {
        id: 'types',
        title: 'Types',
        blocks: [
          { t: 'p', text: desc },
          { t: 'figure', label: `${title} variants` },
        ],
      },
      {
        id: 'style',
        title: 'Style',
        blocks: [
          { t: 'p', text: 'Shape, size, and color roles for Quinn on Android TV / tvOS.' },
          { t: 'figure', label: `${title} style` },
        ],
      },
      {
        id: 'usage',
        title: 'Usage',
        blocks: [
          { t: 'p', text: 'Remote-first placement, copy, and focus order for this component.' },
          { t: 'figure', label: `${title} usage` },
        ],
      },
    ],
  };
}
