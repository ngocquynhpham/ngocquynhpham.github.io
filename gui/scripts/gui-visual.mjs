/** Vietnamese visual guide — help readers see the whole GUI, not isolated widgets */

export const GUI_LAYERS_HTML = `<div class="vg-layers" aria-label="Ba tầng: phần cứng, GUI, Design System">
  <div class="vg-layer vg-layer--hw">
    <span class="vg-layer__tag">Phần cứng HID</span>
    <span class="vg-layer__desc">Chuột, bàn phím — bạn cầm trên tay</span>
  </div>
  <div class="vg-layer__arrow" aria-hidden="true">↕ cắm USB / wireless</div>
  <div class="vg-layer vg-layer--gui">
    <span class="vg-layer__tag">GUI (cửa sổ app)</span>
    <span class="vg-layer__desc">Synapse / G Hub — <strong>một màn hình desktop</strong> gồm menu + hình thiết bị + slider</span>
  </div>
  <div class="vg-layer__arrow vg-layer__arrow--thin" aria-hidden="true">bên trong GUI, ghép từ</div>
  <div class="vg-layer vg-layer--ds">
    <span class="vg-layer__tag">Design System</span>
    <span class="vg-layer__desc">Nút, slider, badge pin — <strong>từng mảnh</strong> bạn đã tưởng tượng được (kể cả ảnh placeholder)</span>
  </div>
</div>`;

export const APP_PREVIEW_HTML = `<div class="card vg-card">
  <div class="card-title">Cửa sổ app (GUI) — bấm đổi màn hình</div>
  <div class="vg-tabs" role="tablist">
    <button type="button" class="vg-tab active" data-app-view="dashboard" onclick="setAppPreviewView('dashboard')" role="tab" aria-selected="true">① Dashboard</button>
    <button type="button" class="vg-tab" data-app-view="detail" onclick="setAppPreviewView('detail')" role="tab" aria-selected="false">② Cấu hình chuột</button>
  </div>
  <div class="app-win" data-product-theme="gaming-razer">
    <div class="app-win__titlebar">
      <span class="app-win__dots"><i></i><i></i><i></i></span>
      <span class="app-win__name">Device Utility · demo</span>
      <span class="app-win__spacer"></span>
      <span class="gui-badge gui-badge--connected"><span class="gui-badge__dot"></span>Đã kết nối</span>
    </div>
    <div class="app-preview" data-view="dashboard">
      <div class="app-win__zone app-win__zone--header">
        <span class="zone-pill">Profile Management — preset theo game / app</span>
        <span class="app-win__profile mono">Profile: FPS ▾</span>
      </div>
      <div class="app-win__body app-win__body--dash">
        <p class="vg-screen-title">Danh sách thiết bị đang cắm</p>
        <div class="vg-dash-cards">
          <div class="vg-dash-card vg-dash-card--on">
            <span class="vg-dash-card__emoji">🖱</span>
            <div>
              <strong>Chuột Pro X</strong>
              <span class="vg-dash-card__meta">USB · 🔋 78%</span>
            </div>
            <span class="zone-pill zone-pill--sm">Bấm vào → màn ②</span>
          </div>
          <div class="vg-dash-card">
            <span class="vg-dash-card__emoji">⌨</span>
            <div>
              <strong>Bàn phím K</strong>
              <span class="vg-dash-card__meta">2.4G · 🔋 12%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="app-preview" data-view="detail" hidden>
      <div class="app-win__body app-win__body--detail">
        <aside class="app-win__sidebar">
          <span class="zone-pill">Menu trái</span>
          <ul class="app-win__nav">
            <li class="on">Hiệu năng</li>
            <li>Đèn LED</li>
            <li>Gán nút</li>
            <li>Macro</li>
          </ul>
        </aside>
        <div class="app-win__main">
          <div class="app-win__viz">
            <span class="zone-pill zone-pill--float">Giữa — hình chuột (bấm nút L/R/S)</span>
            <div class="cs-mouse cs-mouse--lg">
              <button type="button" class="cs-mouse__btn cs-mouse__btn--l">L</button>
              <button type="button" class="cs-mouse__btn cs-mouse__btn--r">R</button>
              <button type="button" class="cs-mouse__btn cs-mouse__btn--s1">S</button>
              <span class="cs-mouse__body"></span>
            </div>
          </div>
          <div class="app-win__controls">
            <span class="zone-pill">Dưới — slider DPI, toggle…</span>
            <div class="cs-dpi-row"><span class="cs-dpi-label">DPI</span><span class="cs-dpi-value">1600</span></div>
            <input type="range" class="gui-slider cs-dpi-slider" min="100" max="16000" step="50" value="1600" aria-label="DPI" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="doc-p vg-foot">Placeholder ảnh spec = <em>một component</em>. GUI = <em>toàn bộ khung cửa sổ</em> xếp các component vào đúng chỗ.</p>
</div>`;

export const VISUAL_GUIDE_PANEL_HTML = `<div class="card">
  <div class="card-title">Vì sao GUI khó hình dung hơn component?</div>
  <p class="doc-p">Component docs (nút, slider…) giống <strong>ảnh từng chiếc ghế</strong>. GUI là <strong>ground plan phòng khách</strong> — bạn cần thấy ghế đặt ở đâu, cửa ở đâu, TV ở đâu cùng lúc.</p>
</div>
${GUI_LAYERS_HTML}
${APP_PREVIEW_HTML}
<div class="card">
  <div class="card-title">Checklist — nhìn app thật (Synapse / G Hub)</div>
  <ul class="bullet-list">
    <li><strong>Dashboard</strong>: chỉ thấy thẻ thiết bị — chưa có slider DPI.</li>
    <li><strong>Sau khi bấm chuột</strong>: menu trái + hình chuột giữa + chỉnh số dưới — đó mới là layout GUI điển hình.</li>
    <li><strong>Design System</strong> không thay thế GUI — nó quy định slider/nút <em>trông và hoạt động thế nào</em> khi được đặt vào layout đó.</li>
  </ul>
</div>`;
