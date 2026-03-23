(function () {
  function sanitizeBasePath(basePath) {
    if (!basePath || basePath === ".") return ".";
    return basePath.replace(/\/+$/, "");
  }

  function resolveSharedBasePath() {
    var marker = document.querySelector("[data-base-path]");
    var basePath = marker ? marker.getAttribute("data-base-path") : ".";
    basePath = sanitizeBasePath(basePath);
    if (basePath === ".") return "../shared";
    return basePath + "/shared";
  }

  function applyBasePath(html, basePath) {
    var cleanedBase = sanitizeBasePath(basePath);
    var replacement = cleanedBase === "." ? "." : cleanedBase;
    return html.replace(/\{\{BASE\}\}/g, replacement);
  }

  function bindMobileMenu(container) {
    var toggle = container.querySelector("[data-menu-toggle='true']");
    var mobileMenu = container.querySelector("[data-mobile-menu='true']");
    if (!toggle || !mobileMenu) return;
    toggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }

  function injectPartial(selector, filePath, basePath, onDone) {
    var mount = document.querySelector(selector);
    if (!mount) {
      if (onDone) onDone(null);
      return;
    }
    fetch(filePath)
      .then(function (res) {
        if (!res.ok) throw new Error("Cannot load partial: " + filePath);
        return res.text();
      })
      .then(function (html) {
        mount.innerHTML = applyBasePath(html, basePath);
        if (onDone) onDone(mount);
      })
      .catch(function () {
        if (onDone) onDone(null);
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var baseMarker = document.querySelector("[data-base-path]");
    var basePath = baseMarker ? baseMarker.getAttribute("data-base-path") : ".";
    var sharedBase = resolveSharedBasePath();

    injectPartial("#site-header", sharedBase + "/header.html", basePath, function (headerRoot) {
      if (headerRoot) bindMobileMenu(headerRoot);
    });
    injectPartial("#site-footer", sharedBase + "/footer.html", basePath);
  });
})();
