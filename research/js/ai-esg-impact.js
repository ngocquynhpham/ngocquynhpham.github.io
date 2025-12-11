// GLOBAL STATE
let factors = [
  { id: 1, name: "Content & Branding AI", type: "surface", value: 0 },
  { id: 2, name: "Gamification (User App)", type: "surface", value: 0 },
  { id: 3, name: "Tối ưu hóa Logistics", type: "root", value: 0 },
  { id: 4, name: "Công nghệ Vật liệu/Phân loại", type: "root", value: 0 },
  { id: 5, name: "Tiết kiệm Năng lượng", type: "root", value: 0 },
];
let nextFactorId = 6;
let impactChart;

// --- MODAL LOGIC ---
function openModal() {
  const modal = document.getElementById("result-modal");
  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.add("opacity-100", "modal-open");
  }, 10);
}

function closeModal() {
  const modal = document.getElementById("result-modal");
  modal.classList.remove("opacity-100", "modal-open");
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 300);
}

// --- FACTOR MANAGEMENT ---
function getFactorElement(factor) {
  const factorTypeColor =
    factor.type === "surface" ? "text-warning-yellow" : "text-neon-green";
  return `
                <div id="factor-${factor.id}" class="flex flex-col gap-1 p-2 rounded-lg bg-gray-900/50">
                    <div class="flex items-center justify-between text-sm">
                        <input type="text" value="${factor.name}" oninput="updateFactorName(${factor.id}, this.value)"
                               class="bg-transparent font-medium focus:ring-0 focus:border-0 outline-none w-3/4 ${factorTypeColor}">
                        <div class="flex items-center gap-2">
                            <span id="val-${factor.id}" class="w-10 text-right">${factor.value}%</span>
                            <button onclick="removeFactor(${factor.id})" class="text-gray-500 hover:text-alert-red transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    </div>
                    <input type="range" min="0" max="100" value="${factor.value}" 
                           oninput="updateFactorValue(${factor.id}, this.value)"
                           class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb">
                </div>
            `;
}

function renderFactors() {
  document.getElementById("surface-factors").innerHTML = factors
    .filter((f) => f.type === "surface")
    .map(getFactorElement)
    .join("");

  document.getElementById("root-factors").innerHTML = factors
    .filter((f) => f.type === "root")
    .map(getFactorElement)
    .join("");

  updateChart(); // Update chart whenever factors are rendered/changed
}

function updateFactorValue(id, value) {
  const factor = factors.find((f) => f.id === id);
  if (factor) {
    factor.value = parseInt(value);
    document.getElementById(`val-${id}`).innerText = `${value}%`;
    updateChart();
  }
}

function updateFactorName(id, name) {
  const factor = factors.find((f) => f.id === id);
  if (factor) {
    factor.name = name;
    updateChart();
  }
}

function addFactor(type, name) {
  const newFactor = {
    id: nextFactorId++,
    name: name,
    type: type,
    value: 0,
  };
  factors.push(newFactor);
  renderFactors();
}

function removeFactor(id) {
  // Đảm bảo không xóa hết các yếu tố cốt lõi (ví dụ: giữ lại ít nhất 1)
  if (
    factors.filter(
      (f) => f.type === factors.find((item) => item.id === id).type
    ).length <= 1 &&
    factors.length > 1
  ) {
    alert("Không thể xóa yếu tố cuối cùng trong nhóm.");
    return;
  }
  factors = factors.filter((f) => f.id !== id);
  renderFactors();
}

function resetFactors() {
  // Reset về trạng thái ban đầu của 5 yếu tố
  factors = [
    { id: 1, name: "Content & Branding AI", type: "surface", value: 0 },
    { id: 2, name: "Gamification (User App)", type: "surface", value: 0 },
    { id: 3, name: "Tối ưu hóa Logistics", type: "root", value: 0 },
    { id: 4, name: "Công nghệ Vật liệu/Phân loại", type: "root", value: 0 },
    { id: 5, name: "Tiết kiệm Năng lượng", type: "root", value: 0 },
  ];
  nextFactorId = 6;
  document.getElementById("projectNameInput").value = "";
  renderFactors();
  updateChart();
}

// --- CHART LOGIC ---
function initChart() {
  const ctx = document.getElementById("impactChart").getContext("2d");
  impactChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: factors.map((f) => f.name),
      datasets: [
        {
          label: "Phân bổ nguồn lực",
          data: factors.map((f) => f.value),
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          borderColor: "#10b981",
          pointBackgroundColor: "#fff",
          pointBorderColor: "#10b981",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#10b981",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: "rgba(255, 255, 255, 0.1)" },
          grid: { color: "rgba(255, 255, 255, 0.1)" },
          pointLabels: { color: "#94a3b8", font: { size: 12 } },
          ticks: { display: false, backdropColor: "transparent" },
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
      plugins: {
        legend: { display: false },
      },
    },
  });
}

function updateChart() {
  if (impactChart) {
    impactChart.data.labels = factors.map((f) => f.name);
    impactChart.data.datasets[0].data = factors.map((f) => f.value);
    impactChart.update();
  }
}

// --- ANALYSIS LOGIC ---
function triggerAnalysis() {
  const projectName =
    document.getElementById("projectNameInput").value || "Dự án không tên";

  // Check for empty factors
  if (factors.length === 0) {
    alert("Vui lòng thêm ít nhất một yếu tố cấu hình.");
    return;
  }

  const surfaceFactors = factors.filter((f) => f.type === "surface");
  const rootFactors = factors.filter((f) => f.type === "root");

  // Must have at least one factor in each main group for meaningful analysis
  if (surfaceFactors.length === 0 || rootFactors.length === 0) {
    alert(
      "Vui lòng thêm ít nhất một yếu tố vào nhóm 'Phần Ngọn' và một yếu tố vào nhóm 'Phần Gốc' để thực hiện kiểm toán."
    );
    return;
  }

  const totalSurfaceValue = surfaceFactors.reduce((sum, f) => sum + f.value, 0);
  const totalRootValue = rootFactors.reduce((sum, f) => sum + f.value, 0);

  const surfaceCount = surfaceFactors.length;
  const rootCount = rootFactors.length;

  const surfaceScore = totalSurfaceValue / surfaceCount;
  const rootScore = totalRootValue / rootCount;

  // Determine Status
  let status;
  let statusColor;
  let statusIcon;
  let description;

  if (rootScore < 30 && surfaceScore > 60) {
    status = "CẢNH BÁO: GREENWASHING";
    statusColor = "text-alert-red";
    statusIcon = "⚠️";
    description =
      "Phân tích cho thấy nguồn lực AI tập trung quá mức vào bề nổi (Marketing, UX). Tác động thực tế (Root Impact) rất thấp. Rủi ro Tẩy Xanh cao.";
  } else if (rootScore > 65) {
    status = "TÁC ĐỘNG THỰC (REAL IMPACT)";
    statusColor = "text-neon-green";
    statusIcon = "🌱";
    description =
      "Tuyệt vời! Dự án tập trung nguồn lực mạnh mẽ vào giải quyết vấn đề cốt lõi (Quy trình, Vật liệu, Năng lượng). Hướng đi bền vững và có chiều sâu.";
  } else if (rootScore > 40 && surfaceScore < 50) {
    status = "CÂN BẰNG & TIỀM NĂNG";
    statusColor = "text-info-blue";
    statusIcon = "⚖️";
    description =
      "Dự án có sự cân bằng hợp lý giữa truyền thông và kỹ thuật. Cần đẩy mạnh hơn nữa các yếu tố gốc để đảm bảo hiệu quả dài hạn.";
  } else {
    status = "CẦN ĐIỀU CHỈNH";
    statusColor = "text-warning-yellow";
    statusIcon = "🟡";
    description =
      "Phân bổ nguồn lực chưa rõ ràng. Đội ngũ cần quyết định tập trung vào việc tạo tác động thực chất (Root) hay chỉ giới thiệu sản phẩm (Surface).";
  }

  // --- RENDER MODAL CONTENT ---
  document.getElementById("modal-project-name").innerText = projectName;
  const content = `
                <div class="space-y-4">
                    <div class="text-center p-4 rounded-xl bg-gray-800/50">
                        <p class="text-sm text-gray-400">Trạng thái Kiểm Toán:</p>
                        <p class="4xl mt-1 mb-2">${statusIcon}</p>
                        <p class="text-xl font-bold ${statusColor}">${status}</p>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-gray-800 p-3 rounded-lg text-center">
                            <p class="text-xs text-gray-400">Điểm Surface (Ngọn)</p>
                            <p class="text-2xl font-bold mt-1 text-warning-yellow">${surfaceScore.toFixed(
                              1
                            )}/100</p>
                        </div>
                        <div class="bg-gray-800 p-3 rounded-lg text-center">
                            <p class="text-xs text-gray-400">Điểm Root (Gốc)</p>
                            <p class="text-2xl font-bold mt-1 text-neon-green">${rootScore.toFixed(
                              1
                            )}/100</p>
                        </div>
                    </div>

                    <h4 class="font-bold text-lg text-white pt-2 border-t border-gray-700">Đánh giá chung:</h4>
                    <p class="text-gray-300 text-sm">${description}</p>
                </div>
            `;
  document.getElementById("modal-result-content").innerHTML = content;
  openModal();
}

// --- INITIALIZATION ---
window.onload = () => {
  initChart();
  renderFactors();
  // Bắt đầu với tab Curriculum
  switchTab("curriculum");
};

// --- TAB SWITCHING (Duplicate for full code inclusion) ---
function switchTab(tabName) {
  document.getElementById("tab-curriculum").classList.add("hidden");
  document.getElementById("tab-tool").classList.add("hidden");

  document
    .getElementById("tab-btn-curriculum")
    .classList.remove("bg-neon-green", "text-black");
  document
    .getElementById("tab-btn-curriculum")
    .classList.add("bg-gray-800", "text-gray-300");

  document
    .getElementById("tab-btn-tool")
    .classList.remove("bg-neon-green", "text-black");
  document.getElementById("tab-btn-tool").classList.add("text-gray-300");

  document.getElementById("tab-" + tabName).classList.remove("hidden");

  const activeBtn = document.getElementById("tab-btn-" + tabName);
  activeBtn.classList.remove("bg-gray-800", "text-gray-300");
  activeBtn.classList.add("bg-neon-green", "text-black");
}
