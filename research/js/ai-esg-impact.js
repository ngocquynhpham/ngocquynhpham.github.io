// --- 1. Tab Switching Logic ---
function switchTab(tabId) {
  // Hide all contents
  document
    .querySelectorAll(".tab-content")
    .forEach((el) => el.classList.add("hidden"));
  document
    .querySelectorAll(".tab-content")
    .forEach((el) => el.classList.remove("block"));

  // Show selected content
  const selectedContent = document.getElementById(`tab-${tabId}`);
  selectedContent.classList.remove("hidden");
  selectedContent.classList.add("block");

  // Reset all button styles
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.remove(
      "text-emerald-400",
      "border-b-2",
      "border-emerald-400"
    );
    btn.classList.add("text-slate-300");
  });

  // Active button style
  const activeBtn = document.getElementById(`btn-${tabId}`);
  activeBtn.classList.remove("text-slate-300");
  activeBtn.classList.add(
    "text-emerald-400",
    "border-b-2",
    "border-emerald-400"
  );
}

// --- 2. Accordion Logic (Model Tab) ---
function toggleAccordion(id) {
  const content = document.getElementById(`content-${id}`);
  const icon = document.getElementById(`icon-${id}`);

  if (content.classList.contains("hidden")) {
    content.classList.remove("hidden");
    icon.style.transform = "rotate(180deg)";
  } else {
    content.classList.add("hidden");
    icon.style.transform = "rotate(0deg)";
  }
}

// Initialize Icons & Logic
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});
