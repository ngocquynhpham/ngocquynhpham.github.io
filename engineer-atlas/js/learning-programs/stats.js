import { PROGRAM_DAY_STATUS } from './constants.js';
import { getProgramDayState, evidenceForProgram, projectsForProgram } from './state.js';

/**
 * @param {import('./registry.js').LearningProgramDef} program
 */
export function computeProgramStats(program) {
  let completed = 0;
  let inProgress = 0;
  let skipped = 0;
  let reviewLater = 0;
  let notStarted = 0;
  let lastActivity = null;

  for (const day of program.days) {
    const st = getProgramDayState(day.id);
    switch (st.status) {
      case PROGRAM_DAY_STATUS.COMPLETED:
        completed += 1;
        break;
      case PROGRAM_DAY_STATUS.IN_PROGRESS:
        inProgress += 1;
        break;
      case PROGRAM_DAY_STATUS.SKIPPED:
        skipped += 1;
        break;
      case PROGRAM_DAY_STATUS.REVIEW_LATER:
        reviewLater += 1;
        break;
      default:
        notStarted += 1;
    }
    const activityTs = st.updatedAt || st.studyDate || st.completedDate;
    if (activityTs && (!lastActivity || activityTs > lastActivity)) lastActivity = activityTs;
  }

  const total = program.dayCount;
  const completionPct = total ? Math.round((completed / total) * 100) : 0;
  const coveragePct = total ? Math.round(((completed + skipped) / total) * 100) : 0;

  const evidenceList = evidenceForProgram(program.id);
  const daysWithEvidence = program.days.filter((d) => {
    const st = getProgramDayState(d.id);
    return Boolean(st.githubEvidence?.trim());
  }).length;
  const evidenceCount = evidenceList.length + daysWithEvidence;

  const projects = projectsForProgram(program.id);
  const portfolioReady = projects.filter((p) => p.portfolioTag === 'portfolio_ready').length;

  const nextDay =
    program.days.find((d) => getProgramDayState(d.id).status === PROGRAM_DAY_STATUS.IN_PROGRESS) ||
    program.days.find((d) => getProgramDayState(d.id).status === PROGRAM_DAY_STATUS.NOT_STARTED) ||
    null;

  const currentDay =
    program.days.find((d) => getProgramDayState(d.id).status === PROGRAM_DAY_STATUS.IN_PROGRESS) || nextDay;

  let programStatusLabel = 'Chưa học';
  if (completed === total && total > 0) programStatusLabel = 'Đã hoàn thành';
  else if (completed > 0 || inProgress > 0 || reviewLater > 0) programStatusLabel = 'Đang học';

  return {
    total,
    completed,
    inProgress,
    skipped,
    reviewLater,
    notStarted,
    completionPct,
    coveragePct,
    evidenceCount,
    projectCount: projects.length,
    portfolioReady,
    nextDay,
    currentDay,
    programStatusLabel,
    lastActivity,
    recentDays: recentActivityDays(program, 5),
  };
}

function recentActivityDays(program, limit) {
  const rows = program.days
    .map((day) => {
      const st = getProgramDayState(day.id);
      const ts = st.updatedAt || st.completedDate || st.studyDate;
      return ts ? { day, state: st, ts } : null;
    })
    .filter(Boolean)
    .sort((a, b) => (a.ts < b.ts ? 1 : -1));
  return rows.slice(0, limit);
}
