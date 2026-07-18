(() => {
  const DATA = window.PORTFOLIO_DATA;
  const storage = {
    get(key, fallback) {
      try {
        return localStorage.getItem(key) || fallback;
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {}
    },
  };

  let lang = storage.get("language", "vi");
  let theme = storage.get("theme", "dark");
  let activeFilter = "all";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function t(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.en || obj.vi || "";
  }

  function linkHandle(url, fallback) {
    if (!url) return fallback;
    try {
      const u = new URL(url, window.location.origin);
      const parts = u.pathname.replace(/\/$/, "").split("/");
      return parts[parts.length - 1] || fallback;
    } catch {
      return fallback;
    }
  }

  function applyTheme() {
    document.documentElement.classList.toggle("dark", theme === "dark");
    const icon = $("#theme-icon");
    if (icon) icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    storage.set("theme", theme);
  }

  function setLang(next) {
    lang = next;
    storage.set("language", lang);
    document.documentElement.lang = lang;
    $("#lang-btn").textContent = lang === "vi" ? "EN" : "VI";
    render();
  }

  function renderNav() {
    const items = DATA.navigation
      .map(
        (item) =>
          `<li><a href="${item.href}" data-nav>${t(item)}</a></li>`
      )
      .join("");
    $("#nav-links").innerHTML = items;
    $("#mobile-menu").innerHTML = DATA.navigation
      .map((item) => `<a href="${item.href}" data-nav>${t(item)}</a>`)
      .join("");
    $("#footer-nav").innerHTML = DATA.navigation
      .map((item) => `<li><a href="${item.href}" class="site-footer__link">${t(item)}</a></li>`)
      .join("");
    $('[data-brand-name]').textContent = t(DATA.hero.name);
    $('[data-brand-role]').textContent = t(DATA.hero.title);
  }

  function renderHero() {
    const h = DATA.hero;
    $('[data-availability]').textContent = t(h.availability);
    $('[data-greeting]').textContent = t(h.greeting);
    $('[data-hero-name]').textContent = t(h.name);
    $('[data-hero-title]').textContent = t(h.title);
    $('[data-hero-years]').textContent = `${h.yearsExperience} ${lang === "vi" ? "năm" : "years"}`;
    $('[data-hero-desc]').textContent = t(h.shortDescription);

    const cvPath = h.buttons.cv[lang];
    const cvBtn = $('[data-btn-cv]');
    cvBtn.querySelector('span').textContent = t(h.buttons.resume);
    if (cvPath && cvPath !== '#') {
      const isRemote = cvPath.startsWith('http');
      const href = isRemote ? cvPath : `assets/${cvPath.split('/').pop()}`;
      cvBtn.href = href;
      if (isRemote) {
        cvBtn.target = '_blank';
        cvBtn.rel = 'noopener noreferrer';
        cvBtn.removeAttribute('download');
      } else {
        cvBtn.removeAttribute('target');
        cvBtn.removeAttribute('rel');
        cvBtn.setAttribute('download', cvPath.split('/').pop());
      }
    } else {
      cvBtn.href = '#';
      cvBtn.removeAttribute('target');
      cvBtn.removeAttribute('rel');
      cvBtn.removeAttribute('download');
    }
    $('[data-btn-contact] span').textContent = t(h.buttons.contact);

    const loc = t(DATA.contactInfo.location);
    $('[data-hero-location]').textContent = `${loc}, ${lang === "vi" ? "Việt Nam" : "Vietnam"}`;

    $('#hero-stats').innerHTML = DATA.about.stats
      .map((s) => {
        const value = s.fromYears ? DATA.hero.yearsExperience : s.value;
        return `
        <div class="hero-stat">
          <div class="hero-stat__value">${value}</div>
          <div class="hero-stat__label">${t(s.label)}</div>
        </div>`;
      })
      .join('');
  }

  function renderAbout() {
    const a = DATA.about;
    $('[data-about-badge]').textContent = `# ${t(a.title).toUpperCase()}`;
    $('[data-about-headline]').textContent = t(a.headline);
    $('[data-about-d1]').textContent = t(a.description1);
    $('[data-about-d2]').textContent = t(a.description2);
    $('[data-about-d3]').textContent = t(a.description3);
    $('#about-highlights').innerHTML = a.highlights
      .map(
        (item) => `
        <div class="about-highlight">
          <i class="fas fa-bolt about-highlight__icon" aria-hidden="true"></i>
          <p>${t(item)}</p>
        </div>`
      )
      .join('');
  }

  function renderSkills() {
    const s = DATA.skills;
    $('[data-skills-badge]').innerHTML = `<i class="fas fa-wand-magic-sparkles" aria-hidden="true"></i> ${t(s.title).toUpperCase()}`;
    $('[data-skills-headline]').textContent = t(s.headline);
    $('[data-skills-sub]').textContent = t(s.subtitle);
    $('#skills-grid').innerHTML = s.categories
      .map(
        (cat) => `
        <div class="skill-category-card">
          <div class="skill-category-card__decor" aria-hidden="true"></div>
          <div class="skill-category-card__icon"><i class="${cat.icon}" aria-hidden="true"></i></div>
          <h3 class="skill-category-card__title">${cat.title}</h3>
          <div class="skill-category-card__tags">${cat.skills
            .map((x) => `<span class="skill-tag">${x}</span>`)
            .join("\n")}</div>
        </div>`
      )
      .join('');
    $('[data-soft-title]').textContent = t(s.softSkillsTitle);
    $('#soft-skills').innerHTML = s.softSkills
      .map(
        (item) => `
        <div class="skill-category-card text-center">
          <div class="skill-category-card__decor" aria-hidden="true"></div>
          <div class="skill-category-card__icon"><i class="${item.icon}" aria-hidden="true"></i></div>
          <h4 class="skill-category-card__title">${t(item.title)}</h4>
          <p class="skill-category-card__desc">${t(item.description)}</p>
        </div>`
      )
      .join('');
  }

  function renderStrengths() {
    const s = DATA.strengths;
    $('[data-strengths-badge]').textContent = `# ${t(s.title).toUpperCase()}`;
    $('[data-strengths-headline]').textContent = t(s.headline);
    $('#strengths-grid').innerHTML = s.strengths
      .map(
        (item) => `
        <div class="strength-cell">
          <div class="strength-cell__icon"><i class="${item.icon || 'fas fa-star'}" aria-hidden="true"></i></div>
          <h3 class="strength-cell__title">${t(item.title)}</h3>
          <p class="strength-cell__desc">${t(item.description)}</p>
        </div>`
      )
      .join('');
  }

  function renderExperience() {
    const e = DATA.experience;
    $('[data-exp-badge]').innerHTML = `<i class="fas fa-wand-magic-sparkles" aria-hidden="true"></i> ${t(e.title).toUpperCase()}`;
    $('[data-exp-headline]').textContent = t(e.headline);

    const rows = e.items
      .map((job, i) => {
        const side = i % 2 === 0 ? 'experience-row--right' : 'experience-row--left';
        const firstLink = (job.links || [])[0];
        const href = typeof firstLink === 'string' ? firstLink : firstLink?.url || firstLink?.href;
        const linkBtn = href
          ? `<a href="${href}" target="_blank" rel="noopener" class="experience-card__link" aria-label="Link"><i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`
          : '';
        return `
        <article class="experience-row ${side} slide-up reveal">
          <div class="experience-dot" aria-hidden="true"></div>
          <div class="experience-meta">
            <p class="experience-period">${job.period}</p>
            <p class="experience-company">${job.company}</p>
          </div>
          <div class="experience-card-wrap">
            <div class="experience-card">
              ${linkBtn}
              <h3 class="experience-card__title">${job.title}</h3>
              <p class="experience-card__project">${job.project || ''}</p>
              <ul class="experience-card__list">
                ${job.responsibilities.map((r) => `<li>${t(r).replace(/^•\s*/, '')}</li>`).join('')}
              </ul>
              <div class="experience-tags">
                ${(job.technologies || []).map((x) => `<span class="experience-tag">${x}</span>`).join('')}
              </div>
            </div>
          </div>
        </article>`;
      })
      .join('');

    $('#experience-list').innerHTML = `<div class="experience-timeline__line" aria-hidden="true"></div>${rows}`;
  }

  function renderEducation() {
    const edu = DATA.education;
    const langData = DATA.languages;
    $('#education-card').innerHTML = `
      <p class="edu-lang-label">${t(edu.title).toUpperCase()}</p>
      ${(edu.items || [])
        .map(
          (item) => `
        <div>
          <h3 class="edu-lang-title">${t(item.institution)}</h3>
          <p class="edu-lang-detail">${t(item.major)}</p>
          <p class="edu-lang-period">${item.period}</p>
        </div>`
        )
        .join('')}`;

    $('#languages-card').innerHTML = `
      <p class="edu-lang-label">${t(langData.title).toUpperCase()}</p>
      ${langData.items
        .map(
          (item, idx) => `
        <div class="${idx ? 'edu-lang-entry' : ''}">
          <h3 class="edu-lang-title">${t(item.language)}</h3>
          <p class="edu-lang-detail">${t(item.proficiency)}</p>
        </div>`
        )
        .join('')}`;
  }

  function renderPersonalProject() {
    const p = DATA.personalProject;
    $('[data-pp-badge]').textContent = t(p.badge);
    $('[data-pp-brand]').textContent = p.brand;
    $('[data-pp-title]').textContent = t(p.title);
    $('[data-pp-desc]').textContent = t(p.description);
    $('[data-pp-cta]').innerHTML = `${t(p.cta)} <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>`;
    $('[data-pp-cta]').href = p.url || '#';
    const bannerLink = $('[data-pp-banner-link]');
    if (bannerLink) bannerLink.href = p.url || '#';
    $('#pp-tags').innerHTML = (p.technologies || [])
      .map((x) => `<span class="personal-project-tech">${x}</span>`)
      .join('');
  }

  function renderProjects() {
    const sw = DATA.selectedWork;
    $('[data-projects-badge]').textContent = `🚀 ${lang === 'vi' ? 'DỰ ÁN' : 'PROJECTS'}`;
    $('[data-projects-headline]').textContent = t(sw.headline);
    $('[data-projects-sub]').textContent = t(sw.subtitle);

    const tagSet = new Set();
    (sw.projects || []).forEach((p) => {
      (p.technologies || []).forEach((tag) => tagSet.add(tag));
    });
    const uniqueTags = [...tagSet];
    const filters = ['all', ...uniqueTags];

    // Nếu filter đang chọn không còn trong danh sách → về all
    if (activeFilter !== 'all' && !uniqueTags.some((f) => f === activeFilter)) {
      activeFilter = 'all';
    }

    $('#filter-chips').innerHTML = filters
      .map((f) => {
        const label = f === 'all' ? t(sw.allFilterLabel) : f;
        const active = activeFilter === f ? 'projects-filter-pill--active' : '';
        return `<button type="button" class="projects-filter-pill ${active}" data-filter="${f}">${label}</button>`;
      })
      .join('');

    $('#projects-grid').innerHTML = sw.projects
      .map((project) => {
        const title = t(project.title);
        const company = t(project.company);
        const desc = t(project.description);
        const tech = project.technologies || [];
        const matchFilter = activeFilter === 'all' || tech.some((x) => x.toLowerCase() === activeFilter.toLowerCase());
        const hidden = !matchFilter ? 'hidden' : '';
        const href = project.url || project.link || '';
        const link = href && href !== '#'
          ? `<a href="${href}" target="_blank" rel="noopener" class="project-card__link" aria-label="Link"><i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`
          : '';
        return `
        <article class="project-card ${hidden}">
          <div class="project-card__header">
            <span class="project-card__icon" aria-hidden="true"><i class="fas fa-diagram-project"></i></span>
            ${link}
          </div>
          <h3 class="project-card__title">${title}</h3>
          <p class="project-card__company">${company}</p>
          <p class="project-card__description">${desc}</p>
          <div class="project-card__tags">
            ${tech.map((x) => `<span class="project-tag">${x}</span>`).join('')}
          </div>
        </article>`;
      })
      .join('');

    $$('#filter-chips [data-filter]').forEach((btn) => {
      btn.onclick = () => {
        activeFilter = btn.dataset.filter;
        renderProjects();
      };
    });
  }

  function renderContact() {
    const c = DATA.contact;
    const info = DATA.contactInfo;
    $('[data-contact-badge]').textContent = `# ${t(c.title).toUpperCase()}`;
    $('[data-contact-headline]').textContent = t(c.headline);
    $('[data-contact-sub]').textContent = t(c.subtitle);

    const labels = lang === 'vi'
      ? { email: 'EMAIL', phone: 'ĐIỆN THOẠI', linkedin: 'LINKEDIN', github: 'GITHUB', loc: 'ĐỊA CHỈ' }
      : { email: 'EMAIL', phone: 'PHONE', linkedin: 'LINKEDIN', github: 'GITHUB', loc: 'LOCATION' };

    const cards = [];
    if (info.email) {
      cards.push(`<div class="contact-info-card"><span class="contact-info-card__icon"><i class="fas fa-envelope"></i></span><div><p class="contact-info-card__label">${labels.email}</p><p class="contact-info-card__value"><a href="mailto:${info.email}">${info.email}</a></p></div></div>`);
    }
    if (info.phone) {
      const tel = info.phone.replace(/\s+/g, '');
      cards.push(`<div class="contact-info-card"><span class="contact-info-card__icon"><i class="fas fa-phone"></i></span><div><p class="contact-info-card__label">${labels.phone}</p><p class="contact-info-card__value"><a href="tel:${tel}">${info.phone}</a></p></div></div>`);
    }
    if (info.linkedin) {
      cards.push(`<div class="contact-info-card"><span class="contact-info-card__icon"><i class="fab fa-linkedin"></i></span><div><p class="contact-info-card__label">${labels.linkedin}</p><p class="contact-info-card__value"><a href="${info.linkedin}" target="_blank" rel="noopener">${linkHandle(info.linkedin, 'LinkedIn')}</a></p></div></div>`);
    }
    if (info.github) {
      cards.push(`<div class="contact-info-card"><span class="contact-info-card__icon"><i class="fab fa-github"></i></span><div><p class="contact-info-card__label">${labels.github}</p><p class="contact-info-card__value"><a href="${info.github}" target="_blank" rel="noopener">${linkHandle(info.github, 'GitHub')}</a></p></div></div>`);
    }
    if (info.location) {
      cards.push(`<div class="contact-info-card"><span class="contact-info-card__icon"><i class="fas fa-location-dot"></i></span><div><p class="contact-info-card__label">${labels.loc}</p><p class="contact-info-card__value">${t(info.location)}, ${lang === 'vi' ? 'Việt Nam' : 'Vietnam'}</p></div></div>`);
    }
    $('#contact-list').innerHTML = cards.join('');

    $('label[for="name"]').textContent = lang === 'vi' ? 'Tên' : 'Name';
    $('#name').placeholder = t(c.form.namePlaceholder);
    $('#email').placeholder = t(c.form.emailPlaceholder);
    $('#message').placeholder = t(c.form.messagePlaceholder);
    $('#submit-btn').textContent = t(c.form.submitButton);
  }

  function renderFooter() {
    const f = DATA.footer;
    $('[data-footer-name]').textContent = t(DATA.hero.name);
    $('[data-footer-role]').textContent = t(DATA.hero.title);
    $('[data-footer-desc]').textContent = t(f.description);
    const navLabel = $('[data-footer-nav-label]');
    if (navLabel) navLabel.textContent = t(f.navLabel);
    const connectLabel = $('[data-footer-connect-label]');
    if (connectLabel) connectLabel.textContent = t(f.connectLabel);
    const info = DATA.contactInfo;
    const social = [];
    if (info.email) {
      social.push({
        href: `mailto:${info.email}`,
        icon: "fas fa-envelope",
        label: { vi: "Email", en: "Email" },
      });
    }
    if (info.linkedin) {
      social.push({
        href: info.linkedin,
        icon: "fab fa-linkedin-in",
        label: { vi: "LinkedIn", en: "LinkedIn" },
      });
    }
    if (info.github) {
      social.push({
        href: info.github,
        icon: "fab fa-github",
        label: { vi: "GitHub", en: "GitHub" },
      });
    }
    $('#footer-social').innerHTML = social
      .map(
        (s) =>
          `<a class="site-footer__social-link" href="${s.href}" target="_blank" rel="noopener" aria-label="${t(s.label)}"><i class="${s.icon}" aria-hidden="true"></i></a>`
      )
      .join('');
    $('[data-copyright]').textContent = t(f.copyright);
    $('[data-back-top]').innerHTML = `${t(f.backTop)} <i class="fas fa-arrow-up" aria-hidden="true"></i>`;
    $('[data-footer-cta]').innerHTML = `${t(f.cta)} <i class="fas fa-arrow-right" aria-hidden="true"></i>`;
  }

  function render() {
    document.title = lang === 'vi'
      ? 'Bùi Bảo Nhân - Senior Business Analyst'
      : 'Bui Bao Nhan - Senior Business Analyst';
    renderNav();
    renderHero();
    renderAbout();
    renderSkills();
    renderStrengths();
    renderExperience();
    renderEducation();
    renderPersonalProject();
    renderProjects();
    renderContact();
    renderFooter();
    observeReveal();
  }

  function observeReveal() {
    const els = $$('.reveal, .slide-up');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => {
      el.classList.remove('visible');
      io.observe(el);
    });
  }

  function setMobileMenu(open) {
    const panel = $('#mobile-menu-panel');
    const overlay = $('#menu-overlay');
    const btn = $('#menu-btn');
    panel.classList.toggle('mobile-menu-panel--open', open);
    panel.classList.toggle('mobile-menu-panel--closed', !open);
    overlay.classList.toggle('mobile-menu-overlay--open', open);
    overlay.classList.toggle('mobile-menu-overlay--closed', !open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function initNeuralCanvas() {
    const canvas = $('#neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let nodes = [];
    let mouse = { x: null, y: null };
    let raf = null;

    function resize() {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 18000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.6 + 0.8,
      }));
    }

    function color() {
      return document.documentElement.classList.contains('dark') ? '20, 184, 166' : '15, 118, 110';
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rgb = color();
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
          if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, 0.55)`;
        ctx.fill();
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(${rgb}, ${0.22 * (1 - dist / 140)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (mouse.x != null) {
          const dist = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
          if (dist < 180) {
            ctx.strokeStyle = `rgba(${rgb}, ${0.28 * (1 - dist / 180)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', () => {
      cancelAnimationFrame(raf);
      resize();
      draw();
    });
    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  function initUI() {
    applyTheme();
    $('#theme-btn').addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      applyTheme();
    });
    $('#lang-btn').addEventListener('click', () => setLang(lang === 'vi' ? 'en' : 'vi'));
    $('#lang-btn').textContent = lang === 'vi' ? 'EN' : 'VI';

    $('#menu-btn').addEventListener('click', () => setMobileMenu(true));
    $('#menu-close').addEventListener('click', () => setMobileMenu(false));
    $('#menu-overlay').addEventListener('click', () => setMobileMenu(false));
    $('#mobile-menu').addEventListener('click', (e) => {
      if (e.target.matches('a')) setMobileMenu(false);
    });

    let toastTimer = null;
    function showToast(message) {
      const toast = $('#toast');
      const msg = $('#toast-message');
      if (!toast || !msg) return;
      msg.textContent = message;
      toast.hidden = false;
      requestAnimationFrame(() => toast.classList.add('is-visible'));
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('is-visible');
        setTimeout(() => {
          toast.hidden = true;
          msg.textContent = '';
        }, 250);
      }, 3500);
    }

    $('#contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = $('#submit-btn');
      const form = DATA.contact.form;
      btn.disabled = true;
      btn.textContent = t(form.sendingButton);
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = t(form.submitButton);
        e.target.reset();
        showToast(t(form.successMessage));
      }, 1200);
    });

    const onScroll = () => {
      let current = 'home';
      for (const id of ['home', ...DATA.navigation.map((n) => n.href.slice(1))]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      $$('[data-nav]').forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initUI();
    render();
    initNeuralCanvas();
  });
})();
