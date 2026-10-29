const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "index2.html");
let h = fs.readFileSync(file, "utf8");

// Head
h = h.replace(
  '<meta content="web_standard" name="shell-type"/>',
  '<meta content="web_standard" name="shell-type"/><meta name="description" content="Chùa Phổ Giác – Enlightenment Buddhist Center. Thông tin cộng đồng, sự kiện, tin tức tại Marin, California."/><title>Chùa Phổ Giác · Enlightenment Buddhist Center</title>'
);
h = h.replace(
  "body{overscroll-behavior:none;}",
  "html{scroll-behavior:smooth;scroll-padding-top:5.5rem;}body{overscroll-behavior:none;}"
);

// Global renames
h = h.replace(/Chùa Diệu Pháp/g, "Chùa Phổ Giác");
h = h.replace(/chuadieuphapbinhloitrung\.com\.vn/g, "phogiacca.com");
h = h.replace(/chuadieuphapbinhloitrung@gmail\.com/g, "ChuaPhoGiacMarin@gmail.com");

// Header brand subtitle
h = h.replace(
  "Nơi hội tụ tâm linh &amp; văn hóa Phật giáo",
  "Enlightenment Buddhist Center · Marin County, CA"
);

// Nav — align with chua-pho-giac
const oldNav =
  '<nav class="hidden xl:flex items-center gap-1.5 lg:gap-2" data-active-classes="bg-primary-container text-on-primary font-label-md rounded-full px-4 py-1.5"><a class="px-3.5 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="trang-chu" href="#">Trang chủ</a><a class="px-3.5 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="gioi-thieu" href="#">Giới thiệu</a><a class="px-3.5 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="su-kien" href="#">Sự kiện</a><a class="px-3.5 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="bai-viet-va-phap-thoai" href="#">Bài viết &amp; Pháp thoại</a><a class="px-3.5 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="hoat-dong-tam-linh" href="#">Hoạt động tâm linh</a><a class="px-3.5 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="dang-ky-khoa-tu" href="#">Đăng ký khóa tu</a><a class="px-3.5 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="lien-he" href="#">Liên hệ</a></nav>';

const newNav =
  '<nav class="hidden xl:flex items-center gap-1.5 lg:gap-2" data-active-classes="bg-primary-container text-on-primary font-label-md rounded-full px-4 py-1.5"><a class="px-3.5 py-1.5 font-label-md text-label-md bg-primary-container text-on-primary rounded-full" data-path="trang-chu" href="#trang-chu">Trang chủ</a><a class="px-3.5 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="su-kien" href="#su-kien">Sự kiện</a><a class="px-3.5 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="tin-tuc" href="#tin-tuc">Tin tức</a><a class="px-3.5 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="gioi-thieu" href="#gioi-thieu">Giới thiệu</a><a class="px-3.5 py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="lien-he" href="#lien-he">Liên hệ</a></nav>';

h = h.replace(oldNav, newNav);

h = h.replace(
  'data-path="trang-chu" href="#"',
  'data-path="trang-chu" href="#trang-chu"'
);
h = h.replace(
  'data-path="cung-duong-thien-nguyen" href="#"',
  'data-path="cung-duong" href="#cung-duong"'
);

// Remove person icon, add mobile menu
h = h.replace(
  '<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header>',
  '<button type="button" id="mobile-menu-btn" class="xl:hidden w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center" aria-expanded="false" aria-controls="mobile-nav" aria-label="Mở menu"><span class="material-symbols-outlined">menu</span></button></div></div><div id="mobile-nav" class="hidden xl:hidden border-t border-outline-variant/40 bg-surface/95 backdrop-blur-xl"><nav class="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-col gap-1" aria-label="Menu di động"><a class="px-4 py-3 rounded-xl font-label-md" href="#trang-chu">Trang chủ</a><a class="px-4 py-3 rounded-xl font-label-md" href="#su-kien">Sự kiện</a><a class="px-4 py-3 rounded-xl font-label-md" href="#tin-tuc">Tin tức</a><a class="px-4 py-3 rounded-xl font-label-md" href="#gioi-thieu">Giới thiệu</a><a class="px-4 py-3 rounded-xl font-label-md" href="#lien-he">Liên hệ</a><a class="px-4 py-3 rounded-xl font-label-md bg-secondary-fixed" href="#cung-duong">Cúng dường</a></nav></div></header>'
);

h = h.replace('<main class="w-full pt-20 bg-surface', '<main class="w-full pt-20 bg-surface" id="main"');

// Hero — Marin image + Phổ Giác copy
h = h.replace(
  "style=\"background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBWv_0u0TOtMxqlWKgHKC3PkYjeMAGBES6BUMeKrGlEJSSMD2jXTVUSLRmJnCERHZmy7e7JBAhQmyph8UZlTqrw-EGjk2d4NrXffGsE4sYPcDccL4zxCzKTdVgF19iAgIv9y4KAg3gsSi59qwbOXUU5zUIIEiEOPFhLMfGnFQMFxx-nhtpbO___hgHRvZJ1xyNmXpGdBgEpK85ElcgGGnfELijnTUyCTENHvm4VNrs_')\"",
  "style=\"background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_9gWdCSrXytx9KWJjhmholFjeysRpTlNlPq9x4rbH8Yuf-FsatYHMa6o3fPWARTwMYBd6FBRrWji6YhNZk0_yP4f4vzDz31dtMbsOUMvMGxg09bQJbfgOJFQuJar3rTPH3qH0AIL63LZpcAGRJoMpLnoUUQ1rg-Wz8p1op4cLbHdvEYUQML5XGM_gKS0P7NXnTg6NkRI5KBMaZHZV2FTgE66YI-h9wS6RTgTU7tQ')\""
);

h = h.replace(
  `<section class="relative w-full -mt-20 overflow-hidden bg-primary min-h-[680px] lg:min-h-[780px] flex items-center">`,
  `<section class="relative w-full -mt-20 overflow-hidden bg-primary min-h-[680px] lg:min-h-[780px] flex items-center" id="trang-chu">`
);

h = h.replace(
  `Tâm linh • Giác ngộ • Bình an`,
  `Một mái chùa Việt tại Marin`
);
h = h.replace(
  `<h1 class="font-display-lg text-display-lg font-semibold tracking-tight text-on-primary mb-6 leading-tight">
          Một chốn bình yên<br/>
<span class="text-secondary-fixed italic font-normal">để quay về</span>
        </h1>
<p class="font-body-lg text-body-lg text-primary-fixed-dim mb-8 max-w-xl leading-relaxed">
          Giữa những bộn bề của cuộc sống, Chùa Phổ Giác là nơi nương tựa tâm linh vững chãi, nuôi dưỡng lòng từ bi, bồi đắp bồ đề tâm và tìm lại sự lắng đọng an yên trong mỗi người.
        </p>`,
  `<h1 class="font-display-lg text-display-lg font-semibold tracking-tight text-on-primary mb-4 leading-tight">
          Chùa Phổ Giác
        </h1>
<p class="font-headline-sm text-secondary-fixed italic mb-4">Từ cộng đồng, và cho cộng đồng.</p>
<p class="font-body-lg text-body-lg text-primary-fixed-dim mb-8 max-w-xl leading-relaxed">
          Nơi kết nối quý Phật tử và cộng đồng người Việt tại quận hạt Marin, California, qua sinh hoạt Phật pháp và những hoạt động phục vụ cộng đồng.
        </p>`
);

// Announcement bar
h = h.replace(
  `<span class="font-semibold text-secondary uppercase tracking-wider font-label-sm text-label-sm">Sắp diễn ra:</span>
<span class="font-medium text-primary">Lễ phát nguyện Quy Y Tam Bảo</span>
<span class="hidden md:inline text-outline-variant">•</span>
<span class="flex items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined text-[16px] text-secondary">calendar_today</span>
            21/11/2026
          </span>
<span class="hidden md:inline text-outline-variant">•</span>
<span class="flex items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined text-[16px] text-secondary">schedule</span>
            14:00 - 16:00
          </span>
<span class="hidden md:inline text-outline-variant">•</span>
<span class="flex items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined text-[16px] text-secondary">location_on</span>
            Chánh điện Chùa Phổ Giác
          </span>`,
  `<span class="font-semibold text-secondary uppercase tracking-wider font-label-sm text-label-sm">Thông báo:</span>
<span class="font-medium text-primary">Lịch sinh hoạt đang cập nhật</span>
<span class="hidden md:inline text-outline-variant">•</span>
<span class="flex items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined text-[16px] text-secondary">schedule</span>
            Vui lòng gọi trước khi đến
          </span>
<span class="hidden md:inline text-outline-variant">•</span>
<span class="flex items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined text-[16px] text-secondary">location_on</span>
            Novato, Marin County, CA
          </span>`
);

// Replace events section grid (from <!-- Event Grid --> to <!-- Section Footer Action -->)
const evStart = "<!-- Event Grid (Card Layout inspired by reference image) -->";
const evEnd = "<!-- Section Footer Action -->";
const i0 = h.indexOf(evStart);
const i1 = h.indexOf(evEnd);
if (i0 !== -1 && i1 !== -1) {
  const eventsBlock = `<!-- Event Grid — nội dung chua-pho-giac -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
<div class="p-8 md:p-10 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex gap-6">
<span class="material-symbols-outlined text-secondary text-[48px] shrink-0">event_busy</span>
<div>
<h3 class="font-headline-md text-headline-md text-primary mb-3">Lịch sinh hoạt đang cập nhật</h3>
<p class="font-body-md text-on-surface-variant mb-5">Vui lòng liên hệ nhà chùa để biết thời gian và hướng dẫn tham dự chương trình sắp tới.</p>
<a class="inline-flex items-center gap-2 font-label-md text-secondary" href="tel:+14158472747">Gọi 415-847-2747 <span class="material-symbols-outlined text-[18px]">call</span></a>
</div>
</div>
<div class="space-y-0 border-t border-outline-variant/40">
<div class="grid grid-cols-[2.5rem_1fr] gap-4 py-6 border-b border-outline-variant/40">
<span class="font-headline-sm text-secondary italic">01</span>
<div><h3 class="font-headline-sm text-primary mb-1">Sinh hoạt Phật pháp</h3><p class="font-body-sm text-on-surface-variant">Gắn kết đạo hữu qua tu học và chia sẻ kiến thức Phật pháp.</p></div>
</div>
<div class="grid grid-cols-[2.5rem_1fr] gap-4 py-6 border-b border-outline-variant/40">
<span class="font-headline-sm text-secondary italic">02</span>
<div><h3 class="font-headline-sm text-primary mb-1">Hoạt động cộng đồng</h3><p class="font-body-sm text-on-surface-variant">Phục vụ cộng đồng Marin, chào đón mọi người cùng tham gia.</p></div>
</div>
</div>
</div>
<p class="font-body-sm text-on-surface-variant text-center mt-8 max-w-2xl mx-auto">Chưa có lịch sự kiện được xác nhận trên bản giao diện này. Các chương trình Phật sự được cập nhật theo thông báo của nhà chùa.</p>
`;
  h = h.slice(0, i0) + eventsBlock + h.slice(i1);
}

h = h.replace(
  "Lịch Lễ &amp; Khóa Tu",
  "Sự kiện tại chùa"
);
h = h.replace(
  "Những Pháp sự sắp tới tại Chùa Phổ Giác",
  "Sinh hoạt &amp; kết nối tại Marin"
);
h = h.replace(
  "“Sự kiện là cầu nối nhiệm mầu giữa đời sống tâm linh và cộng đồng thiện lành.”",
  "Các chương trình Phật sự và sinh hoạt cộng đồng được cập nhật theo thông báo của nhà chùa."
);

h = h.replace(
  `<a class="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors shadow-sm" href="#tat-ca-su-kien">
<span>Xem tất cả sự kiện &amp; Phật sự</span>`,
  `<a class="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors shadow-sm" href="tel:+14158472747">
<span>Liên hệ lịch sinh hoạt</span>`
);

// News section id + content
h = h.replace(
  "<!-- 4. Section: Tin Tức & Hoạt Động Mới Nhất -->\n<section class=\"w-full py-20 lg:py-24 bg-surface-container-low\">",
  "<!-- 4. Tin tức từ Phổ Giác -->\n<section class=\"w-full py-20 lg:py-24 bg-surface-container-low scroll-mt-24\" id=\"tin-tuc\">"
);
h = h.replace("Tin Tức &amp; Hoạt Động", "Tin tức từ Phổ Giác");
h = h.replace(
  "Cập nhật Phật sự, từ thiện &amp; sinh hoạt thiền môn",
  "Thông tin &amp; chia sẻ với cộng đồng"
);
h = h.replace(
  "“Học hỏi là ánh sáng dẫn dắt tâm hồn đến với chân lý giải thoát.”",
  "Cùng tìm hiểu về ngôi chùa và những hoạt động hướng đến cộng đồng."
);

// Article 1
h = h.replace(
  `Chương trình “Mẹ ơi! Con yêu mẹ” – Lắng đọng tình mẹ trong mùa Vu Lan`,
  `Từ những buổi sinh hoạt Phật pháp năm 2021`
);
h = h.replace(
  `Những giây phút xúc động lắng đọng trong buổi lễ cài hoa hồng thiêng liêng, nơi các Phật tử hướng trọn vẹn lòng hiếu kính về hai đấng sinh thành dưỡng dục.`,
  `Khởi nguồn từ chương trình “Thiền Định Qua Dịch” dưới sự hướng dẫn của Thượng Tọa Thích Từ Lực.`
);
h = h.replace("03/09/2026 • Pháp Nhuận Thành", "Câu chuyện ngôi chùa");

// Article 2
h = h.replace(
  `“Tặng rừng cho mai sau” – Chùa Phổ Giác tiếp nối hành trình 4 năm gieo mầm xanh`,
  `Một mái chùa từ cộng đồng, cho cộng đồng`
);
h = h.replace(
  `Hành trình thiện nguyện phụng sự cộng đồng, bảo vệ môi trường sinh thái thông qua việc trồng hàng ngàn cây gỗ quý phủ xanh đất cằn cỗi cho thế hệ tương lai.`,
  `Được hình thành từ sự chung tay của cộng đồng người Việt sinh sống và làm việc tại vùng Marin.`
);
h = h.replace("09/08/2026 • Minh Ngộ", "Cộng đồng");

// Article 3
h = h.replace(
  `Khóa lễ Ngũ Bách Danh nhân ngày vía Bồ Tát Quán Thế Âm thành đạo`,
  `Kết nối và đồng hành cùng nhà chùa`
);
h = h.replace(
  `Đạo tràng trang nghiêm trì tụng danh hiệu Đức Quán Thế Âm Bồ Tát, nguyện cầu quốc thái dân an, dịch bệnh tiêu trừ, vạn sự cát tường và an lạc cho muôn loài.`,
  `Thông tin liên hệ và hướng dẫn tìm hiểu các hình thức đóng góp, cúng dường.`
);
h = h.replace("01/08/2026 • Pháp Nhuận Thành", "Hướng dẫn");

// News card links
h = h.replace(/<span class="font-label-md text-label-md group-hover:underline">Đọc bài viết<\/span>/g, (m, offset) => {
  // crude: first -> gioi-thieu, second gioi-thieu, third lien-he
  return m; // handled below
});
// Replace read links with anchors in news cards - do 3 replacements sequentially
let n = 0;
h = h.replace(
  /<div class="mt-auto pt-4 flex items-center justify-between text-secondary">\s*<span class="font-label-md text-label-md group-hover:underline">Đọc bài viết<\/span>/g,
  () => {
    n++;
    const href = n === 3 ? "#lien-he" : "#gioi-thieu";
    const label = n === 3 ? "Liên hệ" : "Đọc tiếp";
    return `<a href="${href}" class="mt-auto pt-4 flex items-center justify-between text-secondary w-full"><span class="font-label-md text-label-md group-hover:underline">${label}</span>`;
  }
);
h = h.replace(
  /<span class="material-symbols-outlined text-\[18px\]">arrow_forward<\/span>\s*<\/div>\s*<\/div>\s*<\/article>/g,
  '<span class="material-symbols-outlined text-[18px]">arrow_forward</span></a></div></article>'
);

h = h.replace(
  `<a class="inline-flex items-center gap-2 font-label-md text-label-md text-secondary hover:text-on-secondary-container transition-colors group" href="#tin-tuc">
<span>Xem tất cả bài viết &amp; giáo lý</span>`,
  `<a class="inline-flex items-center gap-2 font-label-md text-label-md text-secondary hover:text-on-secondary-container transition-colors group" href="https://phogiacca.com/" target="_blank" rel="noopener noreferrer">
<span>Website chính thức phogiacca.com</span>`
);

// Gioi thieu section
h = h.replace(
  "<section class=\"w-full py-20 lg:py-28 bg-surface overflow-hidden\" id=\"gioi-thieu\">",
  "<section class=\"w-full py-20 lg:py-28 bg-surface overflow-hidden scroll-mt-24\" id=\"gioi-thieu\">"
);

h = h.replace(
  `Bình yên soi bóng bên bờ sông Sài Gòn`,
  `Nơi bình an giữa thiên nhiên hạt Marin, California`
);
h = h.replace(
  `<p class="font-body-sm text-body-sm text-on-surface-variant">Bình Lợi Trung • TP. Hồ Chí Minh</p>`,
  `<p class="font-body-sm text-body-sm text-on-surface-variant">Novato • Marin County, CA</p>`
);

h = h.replace(
  `<h2 class="font-headline-xl text-headline-xl text-primary font-semibold tracking-tight leading-snug">
            Nơi nuôi dưỡng tâm an,<br/>
            lan tỏa tình thương bao la
          </h2>
<!-- Sacred Quotation -->
<blockquote class="p-5 rounded-xl bg-surface-container font-headline-sm text-headline-sm italic text-secondary leading-relaxed">
            “Tất cả những gì chúng ta làm là kết quả của những gì chúng ta đã nghĩ. Tâm là cội nguồn của mọi pháp.”
          </blockquote>
<div class="space-y-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
<p>
              Tọa lạc yên bình bên bờ sông Sài Gòn thơ mộng, <strong class="text-primary font-medium">Chùa Phổ Giác</strong> là một trong những ngôi chùa thanh tịnh nổi tiếng của TP. Hồ Chí Minh. Trải qua bao năm tháng gìn giữ nét đẹp văn hóa tâm linh truyền thống, ngôi chùa là chốn nương tựa bình yên cho hàng vạn Phật tử cùng thiện nam tín nữ.
            </p>
<p>
              Ngôi chùa không chỉ là nơi tu học giáo lý Giác ngộ mà còn là không gian xanh mát để mọi người tìm về kết nối nội tâm, thực hành chánh niệm, xoa dịu muộn phiền và sẻ chia yêu thương thông qua các chương trình thiện nguyện cứu trợ thiết thực.
            </p>
</div>`,
  `<h2 class="font-headline-xl text-headline-xl text-primary font-semibold tracking-tight leading-snug">
            Lịch sử hình thành
          </h2>
<blockquote class="p-5 rounded-xl bg-surface-container font-headline-sm text-headline-sm italic text-secondary leading-relaxed">
            “Một nơi sinh hoạt Phật pháp, cùng gìn giữ sự gắn kết trong cộng đồng.”
          </blockquote>
<div class="space-y-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
<p>
              <strong class="text-primary font-medium">Chùa Phổ Giác – Enlightenment Buddhist Center</strong> là ngôi chùa Việt Nam đầu tiên tại quận hạt Marin, tiểu bang California, Hoa Kỳ — thành lập từ hạnh nguyện của cộng đồng người Việt tại vùng Bắc California.
            </p>
<p>
              Bắt đầu từ những buổi sinh hoạt “Thiền Định Qua Dịch” năm 2021 dưới sự hướng dẫn của Thượng Tọa Thích Từ Lực, chùa hướng đến sinh hoạt Phật sự và phục vụ xã hội, chào đón mọi người không phân biệt văn hóa hay tín ngưỡng.
            </p>
</div>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
<div class="p-4 rounded-xl bg-surface-container-low"><p class="font-label-md text-secondary mb-1">2021 · Khởi nguồn</p><p class="font-body-sm text-on-surface-variant">“Thiền Định Qua Dịch” tại các trung tâm cộng đồng Marin.</p></div>
<div class="p-4 rounded-xl bg-surface-container-low"><p class="font-label-md text-secondary mb-1">Chung tay</p><p class="font-body-sm text-on-surface-variant">Cộng đồng cùng xây dựng đạo tràng phục vụ sinh hoạt chung.</p></div>
<div class="p-4 rounded-xl bg-surface-container-low"><p class="font-label-md text-secondary mb-1">Sứ nguyện</p><p class="font-body-sm text-on-surface-variant">Phục vụ cộng đồng Marin và Phật tử gần xa.</p></div>
</div>`
);

h = h.replace("Đạo tràng tu học trang nghiêm", "501(c)(3) bất vụ lợi");
h = h.replace("Bếp cơm từ thiện vì cộng đồng", "Hoạt động cộng đồng Marin");

// Pillars section — shorten descriptions to Pho Giac relevant
h = h.replace(
  "Pháp Sự &amp; Hoạt Động Tâm Linh",
  "Hoạt động Phật sự &amp; cộng đồng"
);
h = h.replace(
  "Chương trình tu học &amp; phụng sự thường nhật",
  "Từ cộng đồng và cho cộng đồng"
);

// Donation section id
h = h.replace(
  "<!-- 7. Section: Hướng Dẫn Cúng Dường & Thiện Nguyện (Donation Guide) -->\n<section class=\"w-full py-20 lg:py-28 bg-surface\">",
  "<!-- 7. Cúng dường -->\n<section class=\"w-full py-20 lg:py-28 bg-surface scroll-mt-24\" id=\"cung-duong\">"
);
h = h.replace(
  "Chung tay cùng Chùa Phổ Giác trùng tu đạo tràng, duy trì các hoạt động hoằng pháp và bảo trợ bữa ăn thiện nguyện cho các hoàn cảnh khó khăn.",
  "Quý Phật tử có thể liên hệ nhà chùa để được hướng dẫn cúng dường và đồng hành cùng các sinh hoạt của cộng đồng. Tổ chức bất vụ lợi · FEIN: 87-3119444."
);

h = h.replace(
  `<h3 class="font-headline-sm text-headline-sm text-primary mb-2">Cúng dường trực tiếp tại chùa</h3>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Phật tử có thể trực tiếp phát tâm cúng dường tại bàn Thư ký/Công đức (Chánh điện Chùa Phổ Giác). Mọi sự phát tâm thiện lành đều được ghi nhận trang nghiêm, hoan hỷ và công đức vô lượng.
              </p>`,
  `<h3 class="font-headline-sm text-headline-sm text-primary mb-2">Trực tiếp tại chùa</h3>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Quý đồng hương có thể ghé thăm chùa (8:00 AM – 7:00 PM) để thắp hương, lễ Phật và cúng dường vào thùng Tam Bảo. 100 Pinkston Rd., Novato, CA 94945.
              </p>`
);
h = h.replace(
  `<span>Tiếp nhận: 06:00 – 21:00 hàng ngày</span>`,
  `<span>Mở cửa: 8:00 AM – 7:00 PM hằng ngày</span>`
);

h = h.replace(
  `<h3 class="font-headline-sm text-headline-sm text-primary mb-2">Chuyển khoản &amp; Thiện nguyện</h3>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Phật tử ở xa có thể phát tâm cúng dường Tam Bảo hoặc ủng hộ Quỹ Từ Thiện qua tài khoản ngân hàng chính thức của Chùa Phổ Giác với nội dung rõ ràng, minh bạch.
              </p>`,
  `<h3 class="font-headline-sm text-headline-sm text-primary mb-2">Zelle &amp; Check</h3>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Cúng dường qua Zelle: <strong>ChuaPhoGiacMarin@gmail.com</strong>. Gửi check ghi trả cho Chùa Phổ Giác (Enlightenment Buddhist Center) về địa chỉ chùa. Vui lòng xác nhận thông tin với nhà chùa trước khi chuyển tiền.
              </p>`
);
h = h.replace(
  `Vui lòng xem thông tin số tài khoản chính thức`,
  `Email Zelle / liên hệ`
);
h = h.replace('href="#thong-tin-ngan-hang"', 'href="mailto:ChuaPhoGiacMarin@gmail.com"');

// Gallery caption
h = h.replace(
  "Những góc thanh tịnh và thiền vị tại Chùa Phổ Giác",
  "Ảnh minh họa giao diện · Chờ thay bằng ảnh thật của chùa"
);

// Contact section
h = h.replace(
  "<!-- 9. Section: Mời Quý Phật Tử Về Thăm Chùa & Bản Đồ Vị Trí -->\n<section class=\"w-full py-20 lg:py-28 bg-surface\">",
  "<!-- 9. Liên hệ -->\n<section class=\"w-full py-20 lg:py-28 bg-surface scroll-mt-24\" id=\"lien-he\">"
);
h = h.replace(
  `Mời Quý Phật Tử<br/>
            Về Thăm Chùa Phổ Giác`,
  `Liên hệ &amp;<br/>
            đường đi đến chùa`
);
h = h.replace(
  `Chùa Phổ Giác luôn rộng mở cánh cửa đón chào chư thiện nam tín nữ, Phật tử gần xa về chiêm bái, tụng kinh, hành thiền và tìm lại sự bình an đích thực giữa lòng đô thị náo nhiệt.`,
  `Quý Phật tử vui lòng gọi điện hoặc gửi email để tìm hiểu lịch sinh hoạt và hướng dẫn trước khi đến chùa.`
);
h = h.replace(
  `106/47/9 Đường Bình Lợi, Phường Bình Lợi Trung, TP. Hồ Chí Minh`,
  `100 Pinkston Rd., Novato, California 94945, Hoa Kỳ (trước là Black John Rd.)`
);
h = h.replace(
  `Điện thoại Phật vụ`,
  `Điện thoại`
);
h = h.replace(
  `                  091 378 07 01`,
  `                  <a href="tel:+14158472747" class="hover:text-secondary">415-847-2747</a>`
);
h = h.replace(
  `                  06:00 – 21:00 hàng ngày (Bao gồm các ngày Lễ, Rằm &amp; Mùng Một)`,
  `                  8:00 AM – 7:00 PM hằng ngày (sinh hoạt)`
);
h = h.replace(
  `href="https://www.google.com/maps/dir//10.83286075128335,106.70706544911441"`,
  `href="https://www.google.com/maps/search/?api=1&query=100+Pinkston+Rd+Novato+CA+94945"`
);
h = h.replace(
  `data-location="106/47/9 Đường Bình Lợi, Phường Bình Lợi Trung, TP. Hồ Chí Minh"`,
  `data-location="100 Pinkston Rd, Novato, CA 94945"`
);
h = h.replace(
  `<p class="font-body-sm text-body-sm text-on-surface-variant">Bình Lợi Trung, Bình Thạnh, TP.HCM</p>`,
  `<p class="font-body-sm text-body-sm text-on-surface-variant">Novato, Marin County, CA</p>`
);

h = h.replace(
  `“Mỗi bước chân trên con đường tu tập đều dẫn về sự bình an thanh tịnh”`,
  `Nam Mô Bổn Sư Thích Ca Mâu Ni Phật`
);

// Footer
h = h.replace(
  `Chốn tịnh độ an lành nuôi dưỡng bồ đề tâm, gìn giữ nét đẹp văn hóa và truyền thống Phật giáo giữa lòng thành phố.`,
  `Ngôi chùa Việt Nam đầu tiên tại quận hạt Marin. Không gian thiền định phụng sự cộng đồng và hoằng dương chánh pháp.`
);
h = h.replace(
  `<span>106/47/9 Đường Bình Lợi, P. Bình Lợi Trung, TP. Hồ Chí Minh</span>`,
  `<span>100 Pinkston Rd., Novato, CA 94945</span>`
);
h = h.replace(`<span>091 378 07 01</span>`, `<span>415-847-2747</span>`);
h = h.replace(`<span>06:00 - 21:00 (Mỗi ngày)</span>`, `<span>8:00 AM – 7:00 PM</span>`);
h = h.replace(
  `<h3 class="font-headline-sm text-headline-sm text-secondary-fixed">Phật sự thường nhật</h3>`,
  `<h3 class="font-headline-sm text-headline-sm text-secondary-fixed">Liên kết nhanh</h3>`
);
h = h.replace(
  `<li><a class="hover:text-secondary-fixed transition-colors flex items-center gap-2" data-path="su-kien" href="#"><span class="material-symbols-outlined text-[14px]">arrow_forward</span>Lịch Sám Hối &amp; Tụng Kinh</a></li><li><a class="hover:text-secondary-fixed transition-colors flex items-center gap-2" data-path="dang-ky-khoa-tu" href="#"><span class="material-symbols-outlined text-[14px]">arrow_forward</span>Khóa Tu Một Ngày An Lạc</a></li><li><a class="hover:text-secondary-fixed transition-colors flex items-center gap-2" data-path="hoat-dong-tam-linh" href="#"><span class="material-symbols-outlined text-[14px]">arrow_forward</span>Phóng Sanh &amp; Bát Quan Trai</a></li><li><a class="hover:text-secondary-fixed transition-colors flex items-center gap-2" data-path="cung-duong-thien-nguyen" href="#"><span class="material-symbols-outlined text-[14px]">arrow_forward</span>Bếp Cơm Từ Thiện &amp; Thiện Nguyện</a></li>`,
  `<li><a class="hover:text-secondary-fixed transition-colors flex items-center gap-2" href="#su-kien"><span class="material-symbols-outlined text-[14px]">arrow_forward</span>Sự kiện tại chùa</a></li><li><a class="hover:text-secondary-fixed transition-colors flex items-center gap-2" href="#tin-tuc"><span class="material-symbols-outlined text-[14px]">arrow_forward</span>Tin tức</a></li><li><a class="hover:text-secondary-fixed transition-colors flex items-center gap-2" href="#gioi-thieu"><span class="material-symbols-outlined text-[14px]">arrow_forward</span>Giới thiệu</a></li><li><a class="hover:text-secondary-fixed transition-colors flex items-center gap-2" href="#cung-duong"><span class="material-symbols-outlined text-[14px]">arrow_forward</span>Cúng dường</a></li>`
);
h = h.replace(
  `Chung tay hộ trì chánh pháp, bảo trợ tu học và hỗ trợ các mảnh đời cơ nhỡ tại địa phương.`,
  `Mọi đóng góp công đức được miễn trừ thuế liên bang theo luật định (501(c)(3)).`
);
h = h.replace(
  `<p>© 2025 Chùa Phổ Giác (phogiacca.com). Nam Mô A Di Đà Phật.</p>`,
  `<p>© 2026 Chùa Phổ Giác · <a href="https://phogiacca.com/" class="underline" target="_blank" rel="noopener noreferrer">phogiacca.com</a></p>`
);

// Script
if (!h.includes("mobile-menu-btn")) {
  // already added
}
h = h.replace(
  "</footer></body></html>",
  `</footer><script>
(function(){
  var b=document.getElementById("mobile-menu-btn"),n=document.getElementById("mobile-nav");
  if(b&&n){b.addEventListener("click",function(){n.classList.toggle("hidden");b.setAttribute("aria-expanded",String(!n.classList.contains("hidden")));});
  n.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){n.classList.add("hidden");b.setAttribute("aria-expanded","false");});});}
})();
</script></body></html>`
);

fs.writeFileSync(file, h, "utf8");
console.log("Wrote", file, "length", h.length);
