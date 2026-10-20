import { buildPython100DayCatalog, PYTHON_100_FOCUS_AREAS } from './curriculum-python-100-days.js';

/**
 * @typedef {Object} LearningProgramDef
 * @property {string} id
 * @property {string} title
 * @property {string} shortTitle
 * @property {string} instructor
 * @property {string} platform
 * @property {string} track
 * @property {string} category
 * @property {string} type
 * @property {number} dayCount
 * @property {string} priority
 * @property {string} courseUrl
 * @property {string} repositoryUrl
 * @property {string} pathSegment — URL folder under /programs/
 * @property {string[]} roadmapTopicIds — related Atlas roadmap topics (no progress sync)
 * @property {typeof PYTHON_100_FOCUS_AREAS} focusAreas
 * @property {{ dayNumber: number, placeholderTitle: string, id: string }[]} days
 * @property {{ practiceProjects: string, portfolioFullstack: string }} learningGoals
 */

/** @type {Record<string, LearningProgramDef>} */
export const LEARNING_PROGRAMS = {
  'python-100-days-angela-yu': {
    id: 'python-100-days-angela-yu',
    title: '100 Days of Code — Python Bootcamp',
    shortTitle: '100 Days of Code',
    instructor: 'Angela Yu',
    platform: 'Udemy',
    track: 'Fullstack Engineering',
    category: 'Backend Engineering / Python Engineering',
    type: 'Learning Program',
    dayCount: 100,
    priority: 'medium',
    courseUrl: 'https://www.udemy.com/course/100-days-of-code/',
    repositoryUrl: 'https://github.com/ngocquynhpham/learning-python',
    pathSegment: 'python-100-days',
    roadmapTopicIds: ['2-0-0', '2-0-1', '2-1-0', '2-1-1', '2-3-0'],
    focusAreas: PYTHON_100_FOCUS_AREAS,
    days: buildPython100DayCatalog(),
    learningGoals: {
      practiceProjects: '20–30 completed projects',
      portfolioFullstack: '2–3 fullstack portfolio applications',
    },
  },
};

export function getLearningProgram(programId) {
  return LEARNING_PROGRAMS[programId] ?? null;
}

export function listLearningPrograms() {
  return Object.values(LEARNING_PROGRAMS);
}

export function programPageUrl(programId, hash = '') {
  const program = getLearningProgram(programId);
  if (!program) return '#';
  const base = `./programs/${program.pathSegment}/`;
  return hash ? `${base}#${hash}` : base;
}
