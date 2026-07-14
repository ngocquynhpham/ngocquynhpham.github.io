kofiWidgetOverlay.draw("happyidvn", {
  type: "floating-chat",
  "floating-chat.donateButton.text": "Support me",
  "floating-chat.donateButton.background-color": "#323842",
  "floating-chat.donateButton.text-color": "#fff",
});

// Mobile: icon-only (hide "Support me" label inside Ko-fi iframe)
(function hideKofiMobileLabel() {
  var tries = 0;
  var timer = setInterval(function () {
    tries += 1;
    var iframe = document.querySelector(".floatingchat-container-mobi");
    if (!iframe) {
      if (tries > 40) clearInterval(timer);
      return;
    }
    try {
      var doc = iframe.contentDocument || iframe.contentWindow.document;
      var btn = doc && doc.querySelector(".floatingchat-donate-button");
      if (!btn) {
        if (tries > 40) clearInterval(timer);
        return;
      }
      var label = btn.querySelector("span");
      if (label) label.style.display = "none";
      btn.style.padding = "0";
      btn.style.width = "46px";
      btn.style.height = "46px";
      btn.style.justifyContent = "center";
      clearInterval(timer);
    } catch (e) {
      if (tries > 40) clearInterval(timer);
    }
  }, 200);
})();
