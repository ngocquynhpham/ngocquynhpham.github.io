// --- 1. Tab Switching Logic ---
function switchTab(tabId) {
    // Hide all contents
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('block'));
    
    // Show selected content
    const selectedContent = document.getElementById(`tab-${tabId}`);
    selectedContent.classList.remove('hidden');
    selectedContent.classList.add('block');

    // Reset all button styles
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-emerald-400', 'border-b-2', 'border-emerald-400');
        btn.classList.add('text-slate-300');
    });

    // Active button style
    const activeBtn = document.getElementById(`btn-${tabId}`);
    activeBtn.classList.remove('text-slate-300');
    activeBtn.classList.add('text-emerald-400', 'border-b-2', 'border-emerald-400');
}

// --- 2. Accordion Logic (Model Tab) ---
function toggleAccordion(id) {
    const content = document.getElementById(`content-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

// --- 3. Analyzer Tool Logic ---
const inputSurface = document.getElementById('input-surface');
const inputRoot = document.getElementById('input-root');
const valSurface = document.getElementById('val-surface');
const valRoot = document.getElementById('val-root');

const resultCard = document.getElementById('result-card');
const resultIconBg = document.getElementById('result-icon-bg');
const resultStatus = document.getElementById('result-status');
const resultMessage = document.getElementById('result-message');
const resultVerdict = document.getElementById('result-verdict');

function calculateImpact() {
    const surfaceScore = parseInt(inputSurface.value);
    const rootScore = parseInt(inputRoot.value);

    // Update display numbers
    valSurface.textContent = `${surfaceScore}%`;
    valRoot.textContent = `${rootScore}%`;

    let result = {};

    if (rootScore < 30) {
        result = {
            status: "CẢNH BÁO ĐỎ: NỀN TẢNG YẾU",
            class: "bg-red-50 border-red-500 text-red-900",
            bgClass: "bg-red-200",
            icon: "alert-triangle",
            message: "Dự án thiếu nền tảng vận hành thực tế (Root). Mọi hoạt động bề mặt chỉ là vỏ bọc rỗng.",
            verdict: "Failed Model"
        };
    } else if (surfaceScore > rootScore * 1.5) {
        result = {
            status: "NGUY CƠ CAO: GREENWASHING",
            class: "bg-amber-50 border-amber-500 text-amber-900",
            bgClass: "bg-amber-200",
            icon: "shield-alert",
            message: "Nguồn lực Marketing (Ngọn) đang lấn át năng lực Vận hành (Gốc). Dấu hiệu điển hình của việc 'thổi phồng' thành tích.",
            verdict: "High Risk"
        };
    } else if (rootScore >= surfaceScore) {
        result = {
            status: "BỀN VỮNG: MÔ HÌNH CHUẨN",
            class: "bg-emerald-50 border-emerald-500 text-emerald-900",
            bgClass: "bg-emerald-200",
            icon: "check-circle",
            message: "Sự đầu tư vào công nghệ lõi và vận hành tương xứng hoặc cao hơn quảng bá. Đây là dấu hiệu của Intentionalism đúng đắn.",
            verdict: "Sustainable"
        };
    } else {
        result = {
            status: "CÂN BẰNG: CẦN THEO DÕI",
            class: "bg-blue-50 border-blue-500 text-blue-900",
            bgClass: "bg-blue-200",
            icon: "activity",
            message: "Tỷ lệ đầu tư khá cân bằng. Cần giám sát chặt chẽ để đảm bảo cam kết được thực hiện.",
            verdict: "Balanced"
        };
    }

    // Apply styles and text
    resultCard.className = `h-full p-6 rounded-xl border-2 flex flex-col items-center text-center justify-center transition-all duration-300 ${result.class}`;
    resultIconBg.className = `p-4 rounded-full mb-4 ${result.bgClass}`;
    resultStatus.textContent = result.status;
    resultMessage.textContent = `"${result.message}"`;
    resultVerdict.textContent = `Verdict: ${result.verdict}`;
    
    // Update Icon (Simple re-render check)
    // Note: Lucide needs to re-scan or we manually SVG. 
    // For simplicity in vanilla JS without re-rendering loop, we can just replace the innerHTML of the icon container if we want to change icons dynamically.
    // But since lucide.createIcons runs once, let's just update the data-lucide attribute and run it again specific to this element or just swap SVGs.
    // EASIER WAY: Just clear the icon container and add the new icon element, then scan.
    
    const iconContainer = document.getElementById('result-icon').parentElement;
    iconContainer.innerHTML = `<i data-lucide="${result.icon}" class="w-12 h-12"></i>`;
    lucide.createIcons();
}

// Listeners
inputSurface.addEventListener('input', calculateImpact);
inputRoot.addEventListener('input', calculateImpact);

// Initialize Icons & Logic
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    calculateImpact(); // Run once to set initial state
});
