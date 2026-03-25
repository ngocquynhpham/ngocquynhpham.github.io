(function () {
  const PAGE_SIZE = 9;
  const STORAGE_KEY = "demos-activeCat";

  /** @type {{ title: string, desc: string, href: string, cat: string }[]} */
  const PROJECTS = [
    {
      title: "GreenSpace case study",
      desc: "GreenSpace case study: a case study for the GreenSpace project.",
      href: "../projects/greenspace/index.html",
      cat: "research",
    },
    {
      title: "Wiki Economics",
      desc: "Wiki Economics: a collection of economic concepts and theories explained in a simple and easy-to-understand way.",
      href: "https://wiki.esg-tech.io.vn/",
      cat: "economic",
    },
    {
      title: "QR",
      desc: "A small utility page for generating or displaying QR-related content in the browser. Handy for quick tests when wiring up links, Wi‑Fi payloads, or sharing URLs from static hosting.",
      href: "../projects/qr/index.html",
      cat: "tools",
    },
    {
      title: "Transform Lab",
      desc: "Multi-format transformer: HTML, Markdown, JSON, LaTeX, SCSS, SVG, and more.",
      href: "../projects/tools/transform-lab.html",
      cat: "tools",
    },
    {
      title: "Happy.Stu wedding",
      desc: "Happy.Stu gallery landing: chapters on philosophy and aesthetics, filterable templates, contact form. Quiet-luxury typography and max-width layout.",
      href: "https://happy.id.vn/",
      cat: "landing",
    },
    {
      title: "Current portfolio",
      desc: "My current portfolio, built with React.js and Tailwind CSS. It showcases my projects and skills in a clean and modern design.",
      href: "https://ngocquynhpham.com/",
      cat: "portfolio",
    },
    {
      title: "My portfolio v0",
      desc: "My portfolio v0 - It showcases my projects and skills in a clean and modern design.",
      href: "https://v0.ngocquynhpham.com/",
      cat: "portfolio",
    },
    {
      title: "Greenspace",
      desc: "E-commerce style landing: hero, featured products, and navigation patterns typical of a storefront. Part of a larger Greenspace demo used to practice component structure and layout flow.",
      href: "../projects/greenspace/demo-page/index.html",
      cat: "ecommerce",
    },
    {
      title: "Poster Analysis",
      desc: "Poster-style page: bold composition, large type, and print-like constraints in the browser. Good for experimenting with display fonts and contrast.",
      href: "../projects/poster/index.html",
      cat: "research",
    },
    {
      title: "Basketball (Scrimba)",
      desc: "A scoreboard for two teams with increment buttons and reset—classic DOM practice from Scrimba’s front-end path. Reinforces event handlers, state in plain JS, and simple UI feedback.",
      href: "../projects/scrimba/solo-project/basketball-score-board/index.html",
      cat: "research",
    },
    {
      title: "Blackjack (Scrimba)",
      desc: "A small Blackjack game: draw cards, compute totals, and win/lose messaging. Good for practicing arrays, randomness, conditional rendering, and game loops in the browser.",
      href: "../projects/scrimba/solo-project/blackjack/index.html",
      cat: "research",
    },
    {
      title: "Hometown (Scrimba)",
      desc: "A multi-section “hometown” landing: hero, places, and storytelling blocks. Focuses on semantic sections, imagery, and building a cohesive static page from a brief.",
      href: "../projects/scrimba/HomeTown/index.html",
      cat: "research",
    },
    {
      title: "HR tool",
      desc: "Login screen for an HR-themed prototype: credentials layout, branding strip, and entry into the app shell. Part of a larger static HR dashboard exercise.",
      href: "../projects/hr-tool/login.html",
      cat: "apps",
    },
    {
      title: "Pomofocus",
      desc: "Pomodoro-style timer: work/break intervals, start/pause, and minimal chrome. Useful for experimenting with timers, accessibility labels, and focus-friendly UI.",
      href: "../projects/apps/pomofocus.html",
      cat: "landing",
    },
    {
      title: "Mood tracking",
      desc: "A mood logging interface: pick a mood, see history or trends depending on implementation. Practice for lightweight data capture and calm, low-friction forms.",
      href: "../projects/apps/moodtracking.html",
      cat: "apps",
    },
    {
      title: "Landing mood tracking",
      desc: "Marketing-style landing for the mood-tracking concept: value proposition, feature bullets, and call-to-action. Complements the app view with narrative and structure.",
      href: "../projects/apps/landing-moodtracking.html",
      cat: "landing",
    },
    {
      title: "LMS",
      desc: "Learning-management style demo: courses, modules, or lesson placeholders in a static shell. Explores education UI patterns without a real LMS backend.",
      href: "../projects/apps/lms.html",
      cat: "apps",
    },
    {
      title: "Qkcal",
      desc: "Calculator-oriented mini app for quick numeric work in the browser. Reinforces form controls, display formatting, and keyboard-friendly interaction.",
      href: "../projects/apps/qkcal.html",
      cat: "apps",
    },
  
    {
      title: "Indexing database",
      desc: "Educational demo around database indexing concepts: how lookups might behave with or without an index, explained through static visuals or copy.",
      href: "../projects/indexing-database/index.html",
      cat: "research",
    },
    {
      title: "Curved text",
      desc: "CSS and/or SVG techniques to place text along a curve or path. A focused lab for typography effects that break out of standard rectangular layouts.",
      href: "../projects/modules/curved-text/curved-text.html",
      cat: "ui",
    },
    {
      title: "Warranty",
      desc: "Warranty module UI: terms, registration, or status presentation. Practices form-heavy content and trust-oriented layout in a contained component.",
      href: "../projects/modules/warranty/index.html",
      cat: "ui",
    },
    {
      title: "Inert",
      desc: "Demonstration of the inert attribute: trapping focus, disabling subtrees, and modal-like behavior with modern HTML. Important for accessibility experiments.",
      href: "../projects/modules/inert/inert.html",
      cat: "ui",
    },
    {
      title: "Lottie test",
      desc: "Embedding or controlling a Lottie animation in the page. Useful for comparing performance, sizing, and interaction hooks on vector motion graphics.",
      href: "../projects/modules/lotiefile/test-animation.html",
      cat: "ui",
    },
    {
      title: "Progress bar",
      desc: "Progress indicators: determinate and indeterminate states, labels, and motion. Small component lab for feedback during uploads, steps, or loading.",
      href: "../projects/modules/progress-bar/progress-bar.html",
      cat: "ui",
    },
    {
      title: "Morph",
      desc: "Shape or layout morphing demo—SVG, CSS transitions, or FLIP-style animation. A playground for continuity between two visual states.",
      href: "../projects/modules/morph/index.html",
      cat: "ui",
    },
    {
      title: "Conic CSS",
      desc: "Conic gradients for clocks, pie segments, or decorative rings. Pure CSS angle-based color stops with minimal markup.",
      href: "../projects/modules/conic-css/index.html",
      cat: "ui",
    },
    {
      title: "Form validation",
      desc: "Forms with client-side validation: required fields, patterns, and error messaging. Centers on HTML5 constraints and accessible error association.",
      href: "../projects/modules/form/validation.html",
      cat: "ui",
    },
    {
      title: "Flex layout",
      desc: "Flexbox exercises: alignment, wrapping, ordering, and responsive behavior. Reference-style page for comparing flex properties side by side.",
      href: "../projects/modules/layout/flex/index.html",
      cat: "ui",
    },
    {
      title: "AI & ESG research",
      desc: "Research write-up on AI and environmental, social, and governance themes: structured article layout with citations or sections suitable for long-form reading.",
      href: "../projects/research/ai-esg-impact.html",
      cat: "research",
    },
    {
      title: "Case study",
      desc: "Case study document: problem, approach, and outcomes in a narrative format. Practices professional storytelling and scannable headings on static pages.",
      href: "../projects/research/case-study.html",
      cat: "research",
    },
    {
      title: "Gemini educator",
      desc: "Certificate or credential page related to Google’s Gemini educator program—layout for badges, dates, and verification-style content.",
      href: "../projects/google/gemini-certified-educator.html",
      cat: "research",
    },
    
    {
      title: "Portfolio 01",
      desc: "Portfolio 01",
      href: "../projects/portfolio-versions/portfolio-01.html",
      cat: "portfolio",
    },
    {
      title: "Portfolio 02",
      desc: "Personal or themed one-off page named Ethan—custom layout and content as a small sandbox. Kept as a snapshot of a particular design direction.",
      href: "../projects/portfolio-versions/portfolio-02.html",
      cat: "portfolio",
    },
    {
      title: "Portfolio 03",
      desc: "Portfolio 03",
      href: "../projects/portfolio-versions/portfolio-03.html",
      cat: "portfolio",
    },
    {
      title: "Portfolio 04",
      desc: "Portfolio 04",
      href: "../projects/portfolio-versions/portfolio-04.html",
      cat: "portfolio",
    },
    {
      title: "Portfolio 05",
      desc: "Portfolio 05",
      href: "../projects/portfolio-versions/portfolio-05.html",
      cat: "portfolio",
    },
  ];

  const TABS = [
    { id: "all", label: "All" },
    { id: "tools", label: "Tools" },
    { id: "apps", label: "Apps" },
    { id: "landing", label: "Landing pages" },
    { id: "portfolio", label: "Portfolio" },
    { id: "ecommerce", label: "Ecommerce" },
    { id: "economic", label: "Economic" },
    { id: "ui", label: "UI" },
    { id: "research", label: "Research & Learning materials" },
  ];

  const VALID_TAB_IDS = new Set(TABS.map((t) => t.id));

  function readCatFromUrl() {
    const params = new URLSearchParams(location.search);
    const fromUrl = params.get("cat");
    if (fromUrl && VALID_TAB_IDS.has(fromUrl)) return fromUrl;
    return "all";
  }

  function readPersistedCat() {
    const params = new URLSearchParams(location.search);
    if (params.has("cat")) {
      const cat = readCatFromUrl();
      try {
        sessionStorage.setItem(STORAGE_KEY, cat);
      } catch (_) {}
      return cat;
    }
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored && VALID_TAB_IDS.has(stored)) {
        if (stored !== "all") {
          const p = new URLSearchParams(location.search);
          p.set("cat", stored);
          history.replaceState(null, "", `${location.pathname}?${p.toString()}`);
        }
        return stored;
      }
    } catch (_) {}
    return "all";
  }

  let activeCat = readPersistedCat();
  let query = "";
  let currentPage = 1;

  const gridEl = document.getElementById("grid");
  const metaEl = document.getElementById("meta");
  const paginationEl = document.getElementById("pagination");
  const searchInput = document.getElementById("search");
  const tabsEl = document.getElementById("tabs");

  function persistCat(cat) {
    try {
      sessionStorage.setItem(STORAGE_KEY, cat);
    } catch (_) {}
    const params = new URLSearchParams(location.search);
    if (cat === "all") {
      params.delete("cat");
    } else {
      params.set("cat", cat);
    }
    const qs = params.toString();
    history.replaceState(null, "", `${location.pathname}${qs ? "?" + qs : ""}${location.hash}`);
  }

  function normalize(s) {
    return (s || "").toLowerCase().trim();
  }

  function filtered() {
    const q = normalize(query);
    return PROJECTS.filter((p) => {
      const catOk = activeCat === "all" || p.cat === activeCat;
      if (!catOk) return false;
      if (!q) return true;
      const hay = normalize(p.title + " " + p.desc + " " + p.href);
      return hay.includes(q);
    });
  }

  function renderCards(items, page) {
    const total = items.length;
    const start = (page - 1) * PAGE_SIZE;
    const slice = items.slice(start, start + PAGE_SIZE);

    metaEl.textContent =
      total === 0
        ? "No demos match."
        : `Showing ${start + 1}–${Math.min(start + slice.length, total)} of ${total} demos`;

    gridEl.innerHTML = "";
    if (slice.length === 0) {
      const p = document.createElement("p");
      p.className = "empty-state";
      p.textContent = "Try another keyword or category.";
      gridEl.appendChild(p);
      return;
    }

    for (const p of slice) {
      const a = document.createElement("a");
      a.className = "card";
      a.href = p.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.title = "Opens in a new tab — " + p.title;
      a.innerHTML =
        "<h2>" +
        escapeHtml(p.title) +
        "</h2>" +
        "<p class=\"card-desc\">" +
        escapeHtml(p.desc) +
        "</p>";
      gridEl.appendChild(a);
    }
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderPagination(totalItems) {
    const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;
    paginationEl.innerHTML = "";

    if (totalItems <= PAGE_SIZE) return;

    const prev = document.createElement("button");
    prev.type = "button";
    prev.textContent = "Prev";
    prev.disabled = currentPage <= 1;
    prev.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        update();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
    paginationEl.appendChild(prev);

    const maxNumericButtons = 12;
    if (totalPages <= maxNumericButtons) {
      for (let i = 1; i <= totalPages; i++) {
        addPageBtn(i);
      }
    } else {
      const windowSize = 5;
      let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
      let end = Math.min(totalPages, start + windowSize - 1);
      if (end - start < windowSize - 1) start = Math.max(1, end - windowSize + 1);

      if (start > 1) {
        addPageBtn(1);
        if (start > 2) addEllipsis();
      }
      for (let i = start; i <= end; i++) {
        addPageBtn(i);
      }
      if (end < totalPages) {
        if (end < totalPages - 1) addEllipsis();
        addPageBtn(totalPages);
      }
    }

    const next = document.createElement("button");
    next.type = "button";
    next.textContent = "Next";
    next.disabled = currentPage >= totalPages;
    next.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        update();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
    paginationEl.appendChild(next);

    function addEllipsis() {
      const span = document.createElement("span");
      span.className = "ellipsis";
      span.textContent = "…";
      paginationEl.appendChild(span);
    }

    function addPageBtn(num) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = String(num);
      if (num === currentPage) b.setAttribute("aria-current", "page");
      b.addEventListener("click", () => {
        currentPage = num;
        update();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      paginationEl.appendChild(b);
    }
  }

  function update() {
    const items = filtered();
    const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = 1;
    renderCards(items, currentPage);
    renderPagination(items.length);
  }

  TABS.forEach((t) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = t.label;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", t.id === activeCat ? "true" : "false");
    btn.dataset.cat = t.id;
    btn.addEventListener("click", () => {
      activeCat = t.id;
      currentPage = 1;
      persistCat(activeCat);
      tabsEl.querySelectorAll("button").forEach((b) => {
        b.setAttribute("aria-selected", b.dataset.cat === activeCat ? "true" : "false");
      });
      update();
    });
    tabsEl.appendChild(btn);
  });

  searchInput.addEventListener("input", () => {
    query = searchInput.value;
    currentPage = 1;
    update();
  });

  window.addEventListener("popstate", () => {
    activeCat = readCatFromUrl();
    try {
      sessionStorage.setItem(STORAGE_KEY, activeCat);
    } catch (_) {}
    currentPage = 1;
    tabsEl.querySelectorAll("button").forEach((b) => {
      b.setAttribute("aria-selected", b.dataset.cat === activeCat ? "true" : "false");
    });
    update();
  });

  update();
})();
