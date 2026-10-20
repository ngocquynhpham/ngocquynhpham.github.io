/** Static curriculum shell — official Udemy titles are filled in by the learner (no invented lesson names). */

export const PYTHON_100_DAY_COUNT = 100;

export function pythonDayId(dayNumber) {
  return `python-day-${String(dayNumber).padStart(3, '0')}`;
}

/** @returns {{ id: string, dayNumber: number, placeholderTitle: string }[]} */
export function buildPython100DayCatalog() {
  const days = [];
  for (let n = 1; n <= PYTHON_100_DAY_COUNT; n += 1) {
    days.push({
      id: pythonDayId(n),
      dayNumber: n,
      placeholderTitle: 'Curriculum title pending',
    });
  }
  return days;
}

/** Learning focus areas for flexible path — not mapped to official course days. */
export const PYTHON_100_FOCUS_AREAS = [
  {
    key: 'foundations',
    label: 'Python Foundations',
    topics: [
      'Syntax & data structures',
      'Functions & modules',
      'OOP',
      'Error handling',
      'File I/O',
      'Virtual environments',
      'Package management',
    ],
  },
  {
    key: 'backend',
    label: 'Backend & APIs',
    topics: ['Flask', 'REST APIs', 'HTTP requests', 'Authentication', 'WTForms', 'SQL & databases', 'CRUD apps'],
  },
  {
    key: 'automation',
    label: 'Automation',
    topics: ['Scripting', 'BeautifulSoup', 'Selenium', 'Browser automation', 'Data extraction'],
  },
  {
    key: 'data-ml',
    label: 'Data & Machine Learning',
    topics: ['NumPy', 'Pandas', 'Matplotlib', 'Plotly', 'Scikit-learn'],
  },
  {
    key: 'deployment',
    label: 'Deployment',
    topics: [
      'App configuration',
      'Environment variables',
      'WSGI / Gunicorn',
      'Production deploy (VPS, PaaS — not Heroku-only)',
      'Logging',
      'Basic monitoring',
    ],
  },
];
