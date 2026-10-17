/**
 * Personal progress layer. Uses localStorage until Firebase is wired in auth.js.
 * Export shape matches future Firestore document fields.
 */

const STORE_KEY = 'quinn-engineering-atlas-v1';

const EMPTY = () => ({
  statuses: {},
  notes: {},
  links: {},
  proton: {},
  protonNotes: {},
  optionalStatuses: {},
  optionalNotes: {},
  assessments: {},
  subtopicChecks: {},
  activityDays: [],
  capstoneStatuses: {},
  capstoneNotes: {},
  capstoneLinks: {},
  capstoneMeta: {},
});

let data = EMPTY();
let syncState = 'idle'; // idle | saving | saved | error
let syncListeners = [];

export function getData() {
  return data;
}

export function getSyncState() {
  return syncState;
}

export function onSyncStateChange(fn) {
  syncListeners.push(fn);
  return () => {
    syncListeners = syncListeners.filter((x) => x !== fn);
  };
}

function setSyncState(next) {
  syncState = next;
  syncListeners.forEach((fn) => fn(next));
}

export function loadLocal() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return;
    const v = JSON.parse(raw);
    for (const k of Object.keys(EMPTY())) {
      if (v[k] && typeof v[k] === 'object') data[k] = v[k];
    }
  } catch {
    /* keep defaults */
  }
}

export function persistLocal() {
  setSyncState('saving');
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
    setSyncState('saved');
    window.setTimeout(() => {
      if (syncState === 'saved') setSyncState('idle');
    }, 2000);
    return true;
  } catch {
    setSyncState('error');
    return false;
  }
}

/** Entry point for saves — later delegates to Firestore when cloud ready. */
export async function saveProgress() {
  const ok = persistLocal();
  return ok;
}

function touchActivityDay() {
  const today = new Date().toISOString().slice(0, 10);
  if (!Array.isArray(data.activityDays)) data.activityDays = [];
  if (!data.activityDays.includes(today)) {
    data.activityDays.push(today);
    data.activityDays.sort();
  }
}

export function patchProgress(mutator) {
  mutator(data);
  touchActivityDay();
  return saveProgress();
}

export function exportBackup() {
  return {
    version: 3,
    exportedAt: new Date().toISOString(),
    ...data,
  };
}

export function importBackup(json) {
  if (!json || typeof json !== 'object' || typeof json.statuses !== 'object') {
    throw new Error('Invalid backup');
  }
  for (const k of Object.keys(EMPTY())) {
    data[k] = json[k] && typeof json[k] === 'object' ? json[k] : {};
  }
  return saveProgress();
}

export function resetProgress() {
  data = EMPTY();
  return saveProgress();
}

export function statusForTopic(id) {
  return data.statuses[id] || 'todo';
}

/** Seed draft statuses for capstone doc tasks (once). */
export async function seedCapstoneIfNeeded(draftIds = []) {
  if (data.capstoneMeta?.seeded) return;
  await patchProgress((d) => {
    if (!d.capstoneStatuses) d.capstoneStatuses = {};
    for (const id of draftIds) {
      if (!d.capstoneStatuses[id]) d.capstoneStatuses[id] = 'draft';
    }
    d.capstoneMeta = { ...(d.capstoneMeta || {}), seeded: true, seededAt: new Date().toISOString() };
  });
}
