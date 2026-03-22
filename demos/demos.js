(function () {
  const PAGE_SIZE = 9;
  const STORAGE_KEY = "demos-activeCat";

  /** @type {{ title: string, desc: string, href: string, cat: string }[]} */
  const PROJECTS = [
    {
      title: "Food",
      desc: "A single-page food layout experiment: typography, imagery, and spacing for a simple restaurant or menu-style landing. Useful for practicing responsive sections and visual hierarchy.",
      href: "../food.html",
      cat: "tools",
    },
    {
      title: "QR",
      desc: "A small utility page for generating or displaying QR-related content in the browser. Handy for quick tests when wiring up links, Wi‑Fi payloads, or sharing URLs from static hosting.",
      href: "../qr/index.html",
      cat: "tools",
    },
    {
      title: "Greenspace — Home",
      desc: "E-commerce style landing: hero, featured products, and navigation patterns typical of a storefront. Part of a larger Greenspace demo used to practice component structure and layout flow.",
      href: "../greenspace/demo-page/index.html",
      cat: "greenspace",
    },
    {
      title: "Greenspace — Auth",
      desc: "Login and authentication UI for the Greenspace demo: form layout, validation states, and entry into the shopping experience. Focuses on clarity and a consistent brand shell.",
      href: "../greenspace/demo-page/auth/login.html",
      cat: "greenspace",
    },
    {
      title: "Greenspace — Blog",
      desc: "Blog listing page with cards or rows for articles, excerpts, and navigation into detail views. Good for practicing list/grid patterns and content-heavy responsive layouts.",
      href: "../greenspace/demo-page/blog/blog.html",
      cat: "greenspace",
    },
    {
      title: "Greenspace — Blog detail",
      desc: "Single article layout: title, meta, body typography, and related navigation. Used to refine reading width, spacing, and how media fits inside a content column.",
      href: "../greenspace/demo-page/blog/blog-detail.html",
      cat: "greenspace",
    },
    {
      title: "Greenspace — Cart",
      desc: "Shopping cart view: line items, quantities, and checkout affordances. Exercises stateful UI at a static level and how cart content reads on smaller screens.",
      href: "../greenspace/demo-page/cart/cart.html",
      cat: "greenspace",
    },
    {
      title: "Greenspace — Payment",
      desc: "Checkout and payment step: summary, form fields, and confirmation affordances. Intended to mirror a realistic payment flow without a live backend.",
      href: "../greenspace/demo-page/payment/payment.html",
      cat: "greenspace",
    },
    {
      title: "Greenspace — Products",
      desc: "Product listing with filters or grid layout depending on the build. Practice for card grids, badges, and navigating into product detail from a catalog.",
      href: "../greenspace/demo-page/product/product-list.html",
      cat: "greenspace",
    },
    {
      title: "Greenspace — Product detail",
      desc: "Single product page: gallery or hero image, price, description, and add-to-cart cues. Focuses on PDP structure and tying the listing flow to a detailed view.",
      href: "../greenspace/demo-page/product/product-detail.html",
      cat: "greenspace",
    },
    {
      title: "Greenspace — User",
      desc: "Account or profile area: identity, preferences, or order history placeholders. Supports the narrative of a logged-in shopper inside the Greenspace prototype.",
      href: "../greenspace/demo-page/user/user.html",
      cat: "greenspace",
    },
    {
      title: "Greenspace — Presentation",
      desc: "Slide-style or presentation view for summarizing the Greenspace project. Useful for walkthroughs, demos, or condensing the flow into a linear narrative.",
      href: "../greenspace/presentation.html",
      cat: "greenspace",
    },
    {
      title: "Scrimba — Basketball",
      desc: "A scoreboard for two teams with increment buttons and reset—classic DOM practice from Scrimba’s front-end path. Reinforces event handlers, state in plain JS, and simple UI feedback.",
      href: "../scrimba/solo-project/basketball-score-board/index.html",
      cat: "scrimba",
    },
    {
      title: "Scrimba — Blackjack",
      desc: "A small Blackjack game: draw cards, compute totals, and win/lose messaging. Good for practicing arrays, randomness, conditional rendering, and game loops in the browser.",
      href: "../scrimba/solo-project/blackjack/index.html",
      cat: "scrimba",
    },
    {
      title: "Scrimba — Hometown",
      desc: "A multi-section “hometown” landing: hero, places, and storytelling blocks. Focuses on semantic sections, imagery, and building a cohesive static page from a brief.",
      href: "../scrimba/HomeTown/index.html",
      cat: "scrimba",
    },
    {
      title: "HR tool — Login",
      desc: "Login screen for an HR-themed prototype: credentials layout, branding strip, and entry into the app shell. Part of a larger static HR dashboard exercise.",
      href: "../hr-tool/login.html",
      cat: "hr",
    },
    {
      title: "HR tool — Dashboard",
      desc: "High-level HR dashboard: summary widgets, tables or cards, and navigation into deeper views. Practices dense information layout while staying readable.",
      href: "../hr-tool/dashboard.html",
      cat: "hr",
    },
    {
      title: "HR tool — Main",
      desc: "Main application flow for the HR prototype: multi-panel layout, lists, and interactive placeholders. Intended to feel like a real internal tool built with static HTML/CSS/JS.",
      href: "../hr-tool/main.html",
      cat: "hr",
    },
    {
      title: "Pomofocus",
      desc: "Pomodoro-style timer: work/break intervals, start/pause, and minimal chrome. Useful for experimenting with timers, accessibility labels, and focus-friendly UI.",
      href: "../pomofocus.html",
      cat: "tools",
    },
    {
      title: "Mood tracking",
      desc: "A mood logging interface: pick a mood, see history or trends depending on implementation. Practice for lightweight data capture and calm, low-friction forms.",
      href: "../moodtracking.html",
      cat: "tools",
    },
    {
      title: "Landing mood tracking",
      desc: "Marketing-style landing for the mood-tracking concept: value proposition, feature bullets, and call-to-action. Complements the app view with narrative and structure.",
      href: "../landing.moodtracking.html",
      cat: "tools",
    },
    {
      title: "LMS demo",
      desc: "Learning-management style demo: courses, modules, or lesson placeholders in a static shell. Explores education UI patterns without a real LMS backend.",
      href: "../lms-demo.html",
      cat: "tools",
    },
    {
      title: "Gems",
      desc: "A compact “gems” showcase page—links, notes, or resources presented in a browsable layout. Flexible sandbox for cards, tags, and small interactive touches.",
      href: "../gems.html",
      cat: "tools",
    },
    {
      title: "Qkcal",
      desc: "Calculator-oriented mini app for quick numeric work in the browser. Reinforces form controls, display formatting, and keyboard-friendly interaction.",
      href: "../qkcal.html",
      cat: "tools",
    },
    {
      title: "Convert",
      desc: "Unit or value conversion utility: inputs, presets, and instant output. Good for practicing parsing, validation, and keeping the UI in sync with user input.",
      href: "../convert.html",
      cat: "tools",
    },
    {
      title: "Lucky draw",
      desc: "Random draw or wheel-style experience for picking winners from a list. Useful for events, standups, or experimenting with animation and fairness messaging.",
      href: "../lucky-draw/index.html",
      cat: "tools",
    },
    {
      title: "Indexing database",
      desc: "Educational demo around database indexing concepts: how lookups might behave with or without an index, explained through static visuals or copy.",
      href: "../indexing-database/index.html",
      cat: "tools",
    },
    {
      title: "Curved text",
      desc: "CSS and/or SVG techniques to place text along a curve or path. A focused lab for typography effects that break out of standard rectangular layouts.",
      href: "../modules/curved-text/curved-text.html",
      cat: "ui",
    },
    {
      title: "Warranty",
      desc: "Warranty module UI: terms, registration, or status presentation. Practices form-heavy content and trust-oriented layout in a contained component.",
      href: "../modules/warranty/index.html",
      cat: "ui",
    },
    {
      title: "Inert",
      desc: "Demonstration of the inert attribute: trapping focus, disabling subtrees, and modal-like behavior with modern HTML. Important for accessibility experiments.",
      href: "../modules/inert/inert.html",
      cat: "ui",
    },
    {
      title: "IDP",
      desc: "Identity-provider patterns: sign-in flows, account choosers, or federated login mockups. Static exploration of how auth screens are structured and labeled.",
      href: "../modules/idp/idp.html",
      cat: "ui",
    },
    {
      title: "Lottie test",
      desc: "Embedding or controlling a Lottie animation in the page. Useful for comparing performance, sizing, and interaction hooks on vector motion graphics.",
      href: "../modules/lotiefile/test-animation.html",
      cat: "ui",
    },
    {
      title: "Progress bar",
      desc: "Progress indicators: determinate and indeterminate states, labels, and motion. Small component lab for feedback during uploads, steps, or loading.",
      href: "../modules/progress-bar/progress-bar.html",
      cat: "ui",
    },
    {
      title: "Morph",
      desc: "Shape or layout morphing demo—SVG, CSS transitions, or FLIP-style animation. A playground for continuity between two visual states.",
      href: "../modules/morph/index.html",
      cat: "ui",
    },
    {
      title: "Conic CSS",
      desc: "Conic gradients for clocks, pie segments, or decorative rings. Pure CSS angle-based color stops with minimal markup.",
      href: "../modules/conic-css/index.html",
      cat: "ui",
    },
    {
      title: "Form validation",
      desc: "Forms with client-side validation: required fields, patterns, and error messaging. Centers on HTML5 constraints and accessible error association.",
      href: "../modules/form/validation.html",
      cat: "ui",
    },
    {
      title: "Flex layout",
      desc: "Flexbox exercises: alignment, wrapping, ordering, and responsive behavior. Reference-style page for comparing flex properties side by side.",
      href: "../modules/layout/flex/index.html",
      cat: "ui",
    },
    {
      title: "AI & ESG research",
      desc: "Research write-up on AI and environmental, social, and governance themes: structured article layout with citations or sections suitable for long-form reading.",
      href: "../research/ai-esg-impact.html",
      cat: "research",
    },
    {
      title: "Case study",
      desc: "Case study document: problem, approach, and outcomes in a narrative format. Practices professional storytelling and scannable headings on static pages.",
      href: "../research/case-study.html",
      cat: "research",
    },
    {
      title: "Gemini educator",
      desc: "Certificate or credential page related to Google’s Gemini educator program—layout for badges, dates, and verification-style content.",
      href: "../google/gemini-certified-educator.html",
      cat: "research",
    },
    {
      title: "Wedding",
      desc: "Wedding site prototype: invitation tone, schedule, RSVP placeholders, and photo sections. Emphasis on elegant typography and mobile-first guests.",
      href: "../wedding/index.html",
      cat: "other",
    },
    {
      title: "Poster",
      desc: "Poster-style page: bold composition, large type, and print-like constraints in the browser. Good for experimenting with display fonts and contrast.",
      href: "../poster/index.html",
      cat: "other",
    },
    {
      title: "Poster v2",
      desc: "Alternate poster layout: different grid or color treatment from the first version. Useful for A/B comparisons of the same content in two visual systems.",
      href: "../poster/index2.html",
      cat: "other",
    },
    {
      title: "Ethan",
      desc: "Personal or themed one-off page named Ethan—custom layout and content as a small sandbox. Kept as a snapshot of a particular design direction.",
      href: "../ethan.html",
      cat: "other",
    },
    {
      title: "Joke",
      desc: "Lightweight humor page: delivery of a punchline or rotating jokes with minimal chrome. Fun exercise for timing, reveal interactions, or randomization.",
      href: "../joke.html",
      cat: "other",
    },
    {
      title: "Index 0",
      desc: "Alternate home or index layout variant (0): different section order or hero treatment. Part of a series exploring portfolio shell iterations.",
      href: "../index0.html",
      cat: "other",
    },
    {
      title: "Index 01",
      desc: "Alternate home layout variant (01): spacing, nav, or content blocks compared to other index experiments. Useful for side-by-side review of structure.",
      href: "../index01.html",
      cat: "other",
    },
    {
      title: "Index 001",
      desc: "Another index variant (001) with its own typography and grid choices. Documents incremental changes while reusing the same underlying assets.",
      href: "../index001.html",
      cat: "other",
    },
    {
      title: "Index 2",
      desc: "Index layout variant 2: may emphasize projects, bio, or contact differently. Keeps exploration of landing-page patterns in one static site.",
      href: "../index2.html",
      cat: "other",
    },
    {
      title: "Index 3",
      desc: "Index layout variant 3: further iteration on navigation and above-the-fold messaging. Helps compare which hierarchy reads fastest for visitors.",
      href: "../index3.html",
      cat: "other",
    },
    {
      title: "Index 4",
      desc: "Index layout variant 4: experiments with darker or denser presentation. Part of the same family of portfolio front-door mockups.",
      href: "../index4.html",
      cat: "other",
    },
    {
      title: "Index 5",
      desc: "Index layout variant 5: often the latest or most experimental shell in the series. Captures direction before changes are merged into the main home page.",
      href: "../index5.html",
      cat: "other",
    },
  ];

  const TABS = [
    { id: "all", label: "All" },
    { id: "tools", label: "Tools & apps" },
    { id: "ui", label: "UI / CSS labs" },
    { id: "greenspace", label: "Greenspace" },
    { id: "scrimba", label: "Scrimba" },
    { id: "hr", label: "HR" },
    { id: "research", label: "Research" },
    { id: "other", label: "Other" },
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
        "</p>" +
        '<span class="card-url">' +
        escapeHtml(p.href) +
        "</span>";
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
