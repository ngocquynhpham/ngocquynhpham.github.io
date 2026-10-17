import { CAPSTONE_PHASES, CAPSTONE_STATUS_LABELS, allCapstoneTasks } from './capstone.js';
import { getData } from './progress.js';

export function capstoneStatusFor(id) {
  const d = getData();
  return d.capstoneStatuses?.[id] || 'todo';
}

export function capstoneProgress() {
  const tasks = allCapstoneTasks();
  const done = tasks.filter((t) => capstoneStatusFor(t.id) === 'done').length;
  const total = tasks.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { done, total, pct };
}

export function phaseProgress(phaseId) {
  const phase = CAPSTONE_PHASES.find((p) => p.id === phaseId);
  if (!phase) return { done: 0, total: 0, pct: 0 };
  const done = phase.tasks.filter((t) => capstoneStatusFor(t.id) === 'done').length;
  const total = phase.tasks.length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

/** First task not done (todo/draft/review), in phase order. */
export function nextCapstoneTask() {
  for (const phase of CAPSTONE_PHASES) {
    for (const task of phase.tasks) {
      const st = capstoneStatusFor(task.id);
      if (st !== 'done') return { ...task, phaseTitle: phase.title, phaseIndex: phase.index, status: st };
    }
  }
  return null;
}

export function exportPublicCapstonePayload() {
  const tasks = allCapstoneTasks();
  const publicTasks = tasks.filter((t) => t.public !== false);
  const publicDone = publicTasks.filter((t) => capstoneStatusFor(t.id) === 'done').length;
  const publicTotal = publicTasks.length;
  const publicPct = publicTotal ? Math.round((publicDone / publicTotal) * 100) : 0;

  const milestones = publicTasks
    .filter((t) => capstoneStatusFor(t.id) === 'done')
    .map((t) => ({
      id: t.id,
      phase: t.phaseIndex,
      phaseTitle: t.phaseTitle,
      label: t.publicLabel,
      evidenceUrl: getData().capstoneLinks?.[t.id] || null,
    }));

  return {
    version: 1,
    project: 'Operations Platform',
    updatedAt: new Date().toISOString(),
    progress: { completed: publicDone, total: publicTotal, percent: publicPct },
    milestones,
    phases: CAPSTONE_PHASES.map((p) => {
      const pts = p.tasks.filter((t) => t.public !== false);
      const done = pts.filter((t) => capstoneStatusFor(t.id) === 'done').length;
      return {
        index: p.index,
        title: p.title,
        completed: done,
        total: pts.length,
      };
    }),
  };
}

export { CAPSTONE_STATUS_LABELS };
