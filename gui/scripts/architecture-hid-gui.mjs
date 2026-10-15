/** Kiến trúc Design System — GUI cấu hình thiết bị HID */

export const ARCH_LAYOUT_IA_DOC = {
  pillars: [
    { title: 'Device Canvas', text: 'Trung tâm — hình 2D/3D, click nút vật lý → mở cấu hình.' },
    { title: 'Config sidebar', text: 'Cây danh mục — Remap, Performance, Lighting…' },
    { title: 'Profile top bar', text: 'Hồ sơ theo game / app / tác vụ.' },
  ],
  sections: [
    {
      id: 'zones',
      title: 'Ba phân vùng cốt lõi',
      blocks: [
        {
          t: 'numbered',
          items: [
            {
              title: 'Device Canvas (Bảng điều khiển thiết bị)',
              text: 'Khu vực trung tâm. Hiển thị thiết bị trực quan; click hotspot = chọn nút/phím để remap hoặc đổi LED vùng đó.',
            },
            {
              title: 'Configuration Sidebar (Cây danh mục cấu hình)',
              text: 'Trái hoặc phải: Manipulate/Remap · Performance/Tuning (DPI, polling) · Lighting/Effects · Macro · Firmware.',
            },
            {
              title: 'Profile Management (Thanh trên)',
              text: 'Dropdown hoặc tab profile — lưu bộ preset cho từng game, phần mềm, hoặc “Desktop / Travel”.',
            },
          ],
        },
        {
          t: 'p',
          text: 'Dashboard (danh sách thiết bị) là màn trước khi vào ba vùng trên — chỉ chọn thiết bị, chưa phải full canvas.',
        },
      ],
    },
    {
      id: 'ia',
      title: 'Information Architecture (IA)',
      blocks: [
        {
          t: 'ul',
          items: [
            'Cấp 1: Thiết bị (chuột A, bàn phím B)',
            'Cấp 2: Nhóm chức năng (sidebar)',
            'Cấp 3: Chi tiết (canvas + panel slider/input bên dưới hoặc bên phải)',
            'Profile xuyên suốt cấp 2–3 — đổi profile không đổi cấu trúc IA',
          ],
        },
      ],
    },
  ],
};

export const ARCH_COMPONENT_LIBRARY_DOC = {
  pillars: [
    { title: 'Software ↔ hardware', text: 'Mỗi component có hành vi ghi xuống HID/firmware.' },
    { title: 'Tokens', text: 'Hotspot, delay ms, semantic pin/warning — không hard-code.' },
    { title: 'Realtime', text: 'LED preview và trạng thái kết nối đồng bộ thiết bị.' },
  ],
  sections: [
    {
      id: 'library',
      title: 'Thư viện thành phần GUI HID',
      blocks: [
        {
          t: 'table',
          headers: ['Thành phần UI', 'Chức năng', 'Design tokens / lưu ý'],
          rows: [
            [
              'Interactive Device Map',
              'Mô phỏng thiết bị; click hotspot = cấu hình nút/phím/zone',
              'Hotspot khớp vị trí vật lý; hover/active rõ; sync list cho a11y',
            ],
            [
              'Macro Recorder',
              'Ghi chuỗi thao tác chuột/bàn phím',
              'Timeline hoặc step list; chỉnh delay (ms); token spacing bước',
            ],
            [
              'Slider + numeric input',
              'DPI, sensitivity, polling, debounce',
              'Slider + ô số chính xác; steps (50 DPI); tabular nums',
            ],
            [
              'Color Picker & LED zone',
              'RGB, hiệu ứng, multi-zone',
              'Chọn nhiều vùng; preview realtime lên canvas/map',
            ],
            [
              'Battery & signal',
              'Pin, sạc, sóng BT/2.4G',
              'Icon động; % hoặc cường độ; semantic warning/error',
            ],
          ],
        },
      ],
    },
  ],
};

export const ARCH_DEVICE_STATES_DOC = {
  pillars: [
    { title: 'Realtime sync', text: 'GUI phản ánh trạng thái vật lý — không “giả connected”.' },
    { title: 'Safe modes', text: 'Firmware update khóa toàn bộ tùy chỉnh.' },
    { title: 'Copy', text: 'Thông báo rõ: kết nối, đánh thức, không rút dây.' },
  ],
  sections: [
    {
      id: 'states',
      title: 'Trạng thái thiết bị trong GUI',
      blocks: [
        {
          t: 'numbered',
          items: [
            {
              title: 'Connected (Đã kết nối)',
              text: 'Giao diện đầy đủ độ sáng; mọi control ghi được (trừ khi firmware quá cũ).',
            },
            {
              title: 'Disconnected / Sleeping',
              text: 'Grey-out vùng cấu hình phần cứng; banner “Kết nối thiết bị” hoặc “Nhấn phím bất kỳ để đánh thức”.',
            },
            {
              title: 'Firmware updating',
              text: 'Khóa customization; progress %; cảnh báo không rút dây / không tắt thiết bị — modal hoặc full-width banner.',
            },
            {
              title: 'Error / Low battery',
              text: 'Cảnh báo đỏ/vàng góc dễ thấy; pin yếu ≤15% gợi ý sạc; lỗi link tới retry/diagnostics.',
            },
          ],
        },
      ],
    },
    {
      id: 'ui-mapping',
      title: 'Ánh xạ lên component DS',
      blocks: [
        {
          t: 'ul',
          items: [
            'Connected → Connection badge success + canvas opacity 100%',
            'Sleep → badge idle + canvas read-only',
            'Updating → badge updating + global overlay + progress component',
            'Low battery → Battery widget error + optional toast',
          ],
        },
      ],
    },
  ],
};

export const ARCH_UX_PRINCIPLES_DOC = {
  pillars: [
    { title: 'Zero perceived latency', text: 'Đổi LED/nút → thiết bị đổi ngay hoặc nút Apply rõ + onboard memory.' },
    { title: 'Plain language', text: 'Tooltip giải thích polling, debounce — không chỉ thuật ngữ thô.' },
    { title: 'Dark default', text: 'Nền tối, RGB và accent nổi; tránh chói khi dùng lâu.' },
  ],
  sections: [
    {
      id: 'latency',
      title: 'Độ trễ cảm nhận bằng 0',
      blocks: [
        {
          t: 'ul',
          items: [
            'Lighting: stream preview tới device khi có bandwidth; nếu không — spinner ngắn rồi apply',
            'Remap/DPI: debounce ghi firmware; hiển thị “Đang lưu…” trên đúng control',
            'Nút “Apply to onboard memory” tách biệt với “Save profile on PC”',
          ],
        },
      ],
    },
    {
      id: 'jargon',
      title: 'Đơn giản hóa thuật ngữ',
      blocks: [
        {
          t: 'p',
          text: 'Ví dụ tooltip: Polling rate — “Tốc độ báo vị trí chuột; cao hơn = mượt hơn, có thể tốn pin hơn.”',
        },
        {
          t: 'p',
          text: 'Debounce time — “Bỏ qua rung phím/nút trong X ms — hữu ích cho switch cơ.”',
        },
      ],
    },
    {
      id: 'dark',
      title: 'Dark mode mặc định',
      blocks: [
        {
          t: 'p',
          text: 'Token nền #111 / panel #1F1F; chữ primary/secondary; accent chỉ trên control active và hotspot selected. Light mode optional cho văn phòng / y tế.',
        },
      ],
    },
  ],
};

export const MACRO_RECORDER_DOC = {
  pillars: [
    { title: 'Record', text: 'Capture clicks, keys, delays between steps.' },
    { title: 'Edit', text: 'Step list with ms delay per row.' },
    { title: 'Assign', text: 'Bind finished macro to device button via canvas.' },
  ],
  sections: [
    {
      id: 'anatomy',
      title: 'Anatomy',
      blocks: [
        { t: 'ol', items: ['Record control', 'Timeline / step list', 'Delay editor (ms)', 'Save to profile / assign to button'] },
        { t: 'figure', label: 'Macro timeline' },
      ],
    },
    {
      id: 'usage',
      title: 'Usage',
      blocks: [
        {
          t: 'ul',
          items: [
            'Show recording indicator on device header',
            'Cap max steps; warn before overwrite onboard slot',
            'Disabled while firmware updating',
          ],
        },
      ],
    },
  ],
};

export const COLOR_LED_DOC = {
  pillars: [
    { title: 'Zones', text: 'Multi-select regions on device map.' },
    { title: 'Picker', text: 'HSV/RGB + presets + effect dropdown.' },
    { title: 'Preview', text: 'Realtime sync to hardware when linked.' },
  ],
  sections: [
    {
      id: 'anatomy',
      title: 'Anatomy',
      blocks: [
        { t: 'ol', items: ['Zone list or lasso on canvas', 'Color picker', 'Effect (static, wave, breathing…)', 'Brightness slider'] },
        { t: 'figure', label: 'LED zones' },
      ],
    },
    {
      id: 'usage',
      title: 'Usage',
      blocks: [
        {
          t: 'ul',
          items: [
            'Selected zones use accent outline token',
            'Effect changes debounced to avoid USB flood',
            'Show “preview unavailable” when disconnected',
          ],
        },
      ],
    },
  ],
};
