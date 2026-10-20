import { getData } from '../progress.js';
import { PROGRAM_DAY_STATUS } from './constants.js';

const DEFAULT_SCHEDULE = {
  daysOfWeek: [1, 2, 3, 4],
  time: '08:00',
  timezone: 'Asia/Ho_Chi_Minh',
};

export function isValidHttpUrl(value) {
  if (!value || typeof value !== 'string') return false;
  try {
    const u = new URL(value.trim());
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

export function emptyDayState() {
  return {
    status: PROGRAM_DAY_STATUS.NOT_STARTED,
    curriculumTitle: '',
    category: '',
    objectives: '',
    estimatedMinutes: null,
    studyDate: '',
    timeSpentMinutes: null,
    notes: '',
    challenges: '',
    solutions: '',
    takeaways: '',
    githubEvidence: '',
    projectUrl: '',
    completedDate: '',
    updatedAt: '',
  };
}

/** @param {string} dayId */
export function getProgramDayState(dayId) {
  const raw = getData().programDays?.[dayId];
  if (!raw || typeof raw !== 'object') return emptyDayState();
  return { ...emptyDayState(), ...raw };
}

/** @param {string} programId */
export function getProgramSettings(programId) {
  const raw = getData().learningPrograms?.[programId];
  if (!raw || typeof raw !== 'object') {
    return { schedule: { ...DEFAULT_SCHEDULE } };
  }
  return {
    schedule: { ...DEFAULT_SCHEDULE, ...(raw.schedule || {}) },
    ...raw,
  };
}

/**
 * Idempotent defaults — does not overwrite user day progress.
 * @param {string} programId
 * @param {ReturnType<import('../progress.js').getData>} [data]
 */
export function applyProgramDefaults(programId, data = getData()) {
  if (!data.learningPrograms) data.learningPrograms = {};
  if (!data.programDays) data.programDays = {};
  if (!Array.isArray(data.programEvidence)) data.programEvidence = [];
  if (!Array.isArray(data.programProjects)) data.programProjects = [];

  const existing = data.learningPrograms[programId];
  if (!existing) {
    data.learningPrograms[programId] = {
      schedule: { ...DEFAULT_SCHEDULE },
      initializedAt: new Date().toISOString(),
    };
  } else if (!existing.schedule) {
    existing.schedule = { ...DEFAULT_SCHEDULE };
  }
}

export function evidenceForProgram(programId) {
  return (getData().programEvidence || []).filter((e) => e.programId === programId);
}

export function projectsForProgram(programId) {
  return (getData().programProjects || []).filter((p) => p.programId === programId);
}

export function newEvidenceId(programId, dayId) {
  return `pe-${programId}-${dayId}-${Date.now().toString(36)}`;
}

export function newProjectId(programId) {
  return `pp-${programId}-${Date.now().toString(36)}`;
}
