/** Learning program day statuses (separate from roadmap todo/doing/done). */

export const PROGRAM_DAY_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  SKIPPED: 'skipped',
  REVIEW_LATER: 'review_later',
};

export const PROGRAM_DAY_STATUS_LABELS = {
  not_started: 'Chưa học',
  in_progress: 'Đang học',
  completed: 'Đã hoàn thành',
  skipped: 'Bỏ qua',
  review_later: 'Ôn lại sau',
};

export const PROGRAM_EVIDENCE_TYPES = {
  github_dir: 'GitHub folder',
  github_file: 'Source file',
  github_commit: 'Commit',
  github_pr: 'Pull request',
  readme: 'README',
  demo: 'Live demo',
  other: 'Other',
};

export const PORTFOLIO_PROJECT_TAGS = {
  practice: 'Practice Project',
  portfolio_candidate: 'Portfolio Candidate',
  portfolio_ready: 'Portfolio Ready',
};

export const PORTFOLIO_PROJECT_TAG_LABELS = {
  practice: 'Dự án thực hành',
  portfolio_candidate: 'Ứng viên portfolio',
  portfolio_ready: 'Sẵn sàng portfolio',
};
