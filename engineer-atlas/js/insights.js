import { MODULES, getTopicSubtopics } from './content.js';
import { getData, statusForTopic } from './progress.js';

/** Chủ đề trong sprint — loại trừ “Để sau”. */
export function sprintTopicIds(allTopics) {
  return allTopics.filter((t) => statusForTopic(t.id) !== 'later');
}

/** Phạm vi kiến thức: đã hoàn thành hoặc xác nhận đã biết (không tính “Để sau”). */
export function knowledgeCoverage(allTopics) {
  const pool = sprintTopicIds(allTopics);
  if (!pool.length) return { pct: 0, covered: 0, total: 0 };
  const covered = pool.filter((t) => ['done', 'known'].includes(statusForTopic(t.id))).length;
  return { pct: Math.round((covered / pool.length) * 100), covered, total: pool.length };
}

/** Chỉ chủ đề hoàn thành thực sự (không gồm “Đã biết”). */
export function topicsCompletedCount(allTopics) {
  const pool = sprintTopicIds(allTopics);
  const done = pool.filter((t) => statusForTopic(t.id) === 'done').length;
  return { done, total: pool.length };
}

export function isSubtopicChecked(subtopicId) {
  return Boolean(getData().subtopicChecks?.[subtopicId]);
}

export function topicLearningProgress(topicId) {
  const st = statusForTopic(topicId);
  if (st === 'done' || st === 'known') return 100;
  const subs = getTopicSubtopics(topicId);
  if (!subs.length) {
    if (st === 'doing') return 0;
    return 0;
  }
  const checked = subs.filter((s) => isSubtopicChecked(s.id)).length;
  return Math.round((checked / subs.length) * 100);
}

export function topicSubtopicStats(topicId) {
  const subs = getTopicSubtopics(topicId);
  const st = statusForTopic(topicId);
  if (st === 'done' && subs.length) {
    return { checked: subs.length, total: subs.length, pct: 100 };
  }
  const checked = subs.filter((s) => isSubtopicChecked(s.id)).length;
  return { checked, total: subs.length, pct: subs.length ? Math.round((checked / subs.length) * 100) : 0 };
}

/** Tiến độ học theo module — trung bình tiến độ subtopic / trạng thái (known không tính là vừa học). */
export function moduleLearningProgress(moduleIndex, allTopics) {
  const topics = allTopics.filter((t) => t.module === moduleIndex);
  const active = topics.filter((t) => {
    const st = statusForTopic(t.id);
    return st !== 'later' && st !== 'known';
  });
  if (!active.length) return 0;
  const sum = active.reduce((acc, t) => acc + topicLearningProgress(t.id), 0);
  return Math.round(sum / active.length);
}

export function overallSubtopicProgress(allTopics) {
  let checked = 0;
  let total = 0;
  for (const t of allTopics) {
    const subs = getTopicSubtopics(t.id);
    if (!subs.length) continue;
    const st = statusForTopic(t.id);
    if (['later', 'known'].includes(st)) continue;
    total += subs.length;
    if (st === 'done') checked += subs.length;
    else checked += subs.filter((s) => isSubtopicChecked(s.id)).length;
  }
  return { checked, total, pct: total ? Math.round((checked / total) * 100) : 0 };
}

export function countPracticeArtifacts() {
  const d = getData();
  let n = 0;
  for (const v of Object.values(d.links || {})) if (String(v).trim()) n += 1;
  for (const v of Object.values(d.notes || {})) if (String(v).trim().length > 40) n += 1;
  return n;
}

export function activeLearningDaysCount() {
  return (getData().activityDays || []).length;
}

export function learningMomentumLabel() {
  const days = [...(getData().activityDays || [])].sort();
  if (days.length === 0) return 'Chưa có dữ liệu hoạt động — bắt đầu tick checklist hoặc cập nhật trạng thái.';
  if (days.length >= 3) return 'Đang duy trì nhịp học — tiếp tục checklist trong tuần này.';
  return 'Mới bắt đầu ghi nhận hoạt động — thêm vài phiên học để thấy xu hướng.';
}

/** Gợi ý “Hôm nay học gì”: đang học → chưa học (sprint) → null */
export function pickContinueTopic(allTopics) {
  const doing = allTopics.find((t) => statusForTopic(t.id) === 'doing');
  if (doing) return doing;
  return allTopics.find((t) => statusForTopic(t.id) === 'todo');
}

export function nextUncheckedSubtopic(topicId) {
  const subs = getTopicSubtopics(topicId);
  return subs.find((s) => !isSubtopicChecked(s.id)) || null;
}

export function weakTopics(allTopics, limit = 3) {
  return allTopics
    .filter((t) => statusForTopic(t.id) === 'doing')
    .map((t) => ({ topic: t, ...topicSubtopicStats(t.id) }))
    .filter((x) => x.total > 0 && x.pct < 100)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, limit);
}

export const MODULE_SHORT = [
  'Frontend',
  'Database',
  'Backend',
  'LLM & Chatbot',
  'RAG',
  'Hạ tầng & DevOps',
];
