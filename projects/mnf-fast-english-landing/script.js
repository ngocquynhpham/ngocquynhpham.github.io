// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }));
}

// Counter animation
document.querySelectorAll('[data-count]').forEach(counter => {
  let done = false;
  const obs = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting || done) return;
    done = true;
    const target = Number(counter.dataset.count);
    const suffix = counter.dataset.suffix || '';
    const start = performance.now();
    const duration = 1200;
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const val = Math.round(target * (1 - Math.pow(1 - p, 3)));
      counter.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else counter.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }, { threshold: 0.5 });
  obs.observe(counter);
});

// Hall of fame carousel
const hallTrack = document.getElementById('hallTrack');
const prevBtn = document.querySelector('.hall-arrow.prev');
const nextBtn = document.querySelector('.hall-arrow.next');
if (hallTrack && prevBtn && nextBtn) {
  const scroll = dir => hallTrack.scrollBy({ left: dir * 220, behavior: 'smooth' });
  prevBtn.addEventListener('click', () => scroll(-1));
  nextBtn.addEventListener('click', () => scroll(1));
}

// FAQ accordion
const faqData = [
  { q: 'Con tôi mấy tuổi thì có thể bắt đầu học?', a: 'Từ 6 tuổi, MNF nhận học viên Young Learners theo giáo trình Cambridge phù hợp từng lứa tuổi.' },
  { q: 'Học phí đã bao gồm giáo trình chưa?', a: 'Học phí chưa bao gồm giáo trình, học viên mua giáo trình một lần khi vào lớp.' },
  { q: 'Có học thử miễn phí không?', a: 'Có, mỗi học viên mới được học thử 1 buổi miễn phí trước khi đăng ký.' },
  { q: 'Lớp học offline hay online?', a: 'MNF dạy cả hai hình thức — học trực tiếp tại trung tâm hoặc online qua Zoom.' },
  { q: 'Cam kết đầu ra IELTS như thế nào?', a: 'Với gói IELTS Advanced, MNF cam kết bằng văn bản về band điểm đầu ra, hoàn phí một phần nếu không đạt.' }
];

const faqList = document.getElementById('faqList');
if (faqList) {
  faqData.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'faq-item';
    el.innerHTML = `
      <button class="faq-q" type="button" aria-expanded="false">
        <span>${item.q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a">${item.a}</div>`;
    el.querySelector('.faq-q').addEventListener('click', () => {
      const isOpen = el.classList.toggle('open');
      el.querySelector('.faq-q').setAttribute('aria-expanded', String(isOpen));
      faqList.querySelectorAll('.faq-item').forEach((other, j) => {
        if (j !== i && other.classList.contains('open')) {
          other.classList.remove('open');
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });
    });
    faqList.appendChild(el);
  });
}

// Lead form
const form = document.getElementById('leadForm');
const formNote = document.getElementById('formNote');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.elements.name.value.trim();
  formNote.textContent = `Cảm ơn ${name || 'bạn'}! MNF sẽ liên hệ sớm để tư vấn lộ trình phù hợp.`;
  form.reset();
});

// Header shadow on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (!header) return;
  header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(30,79,163,.1)' : '0 1px 0 #dde4ef';
});
