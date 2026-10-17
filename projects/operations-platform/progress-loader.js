(async function loadPublicProgress() {
  const pctEl = document.getElementById('progressPct');
  const metaEl = document.getElementById('progressMeta');
  const fillEl = document.getElementById('progressFill');
  const updatedEl = document.getElementById('progressUpdated');
  const phaseGrid = document.getElementById('phaseGrid');
  const listEl = document.getElementById('milestoneList');

  let data = null;
  try {
    const res = await fetch('./public-progress.json', { cache: 'no-store' });
    if (res.ok) data = await res.json();
  } catch {
    /* static defaults */
  }

  if (!data || !data.progress) return;

  const { progress, phases, milestones, updatedAt } = data;
  pctEl.textContent = `${progress.percent ?? 0}%`;
  metaEl.textContent = `${progress.completed ?? 0} / ${progress.total ?? '—'} tasks done (public export)`;
  fillEl.style.width = `${progress.percent ?? 0}%`;
  if (updatedAt) {
    updatedEl.textContent = `Last updated: ${new Date(updatedAt).toLocaleString()}`;
  }

  if (Array.isArray(phases) && phaseGrid) {
    phaseGrid.innerHTML = phases
      .map(
        (p) =>
          `<div class="phase-card"><strong>${String(p.index).padStart(2, '0')} ${escapeHtml(p.title)}</strong>${p.completed}/${p.total}</div>`
      )
      .join('');
  }

  if (Array.isArray(milestones) && listEl) {
    if (milestones.length === 0) {
      listEl.innerHTML = '<li class="muted">No public milestones marked done yet.</li>';
    } else {
      listEl.innerHTML = milestones
        .map((m) => {
          const link = m.evidenceUrl
            ? ` <a href="${escapeHtml(m.evidenceUrl)}" target="_blank" rel="noopener">evidence</a>`
            : '';
          return `<li><span class="muted">${String(m.phase).padStart(2, '0')}</span> ${escapeHtml(m.label)}${link}</li>`;
        })
        .join('');
    }
  }

  if (progress.percent >= 100) {
    const badge = document.getElementById('statusBadge');
    if (badge) badge.textContent = 'Complete';
  }
})();

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
