/**
 * Firebase Authentication + session UI state.
 * Khi chưa cấu hình Firebase: mock session trong sessionStorage để minh họa UI.
 */

import { FIREBASE_ENABLED } from './firebase-config.js';

const MOCK_KEY = 'atlas-mock-user';
let currentUser = null;
const listeners = new Set();

function notify() {
  listeners.forEach((fn) => fn(currentUser));
}

export function getUser() {
  return currentUser;
}

export function onAuthStateChanged(fn) {
  listeners.add(fn);
  fn(currentUser);
  return () => listeners.delete(fn);
}

export function authModeLabel() {
  if (currentUser && FIREBASE_ENABLED) return 'Đã xác thực Firebase';
  if (currentUser) return 'Phiên demo (chưa Firebase)';
  return 'Chưa đăng nhập';
}

export async function initAuth() {
  if (FIREBASE_ENABLED) {
    // TODO: modular SDK — initializeApp, getAuth, onAuthStateChanged, GoogleAuthProvider
    currentUser = null;
    notify();
    return { mode: 'firebase', user: currentUser };
  }
  try {
    const raw = sessionStorage.getItem(MOCK_KEY);
    currentUser = raw ? JSON.parse(raw) : null;
    if (currentUser && currentUser.email === 'ban@example.com') {
      currentUser = {
        displayName: 'Quinn',
        email: 'quynhpham241.cv@gmail.com',
        photoURL: currentUser.photoURL || '',
      };
      sessionStorage.setItem(MOCK_KEY, JSON.stringify(currentUser));
    }
  } catch {
    currentUser = null;
  }
  notify();
  return { mode: 'demo', user: currentUser };
}

export async function signInWithGoogle() {
  if (FIREBASE_ENABLED) {
    // TODO: signInWithPopup(auth, googleProvider)
    return null;
  }
  currentUser = {
    displayName: 'Quinn',
    email: 'quynhpham241.cv@gmail.com',
    photoURL: '',
  };
  try {
    sessionStorage.setItem(MOCK_KEY, JSON.stringify(currentUser));
  } catch {
    /* ignore */
  }
  notify();
  return currentUser;
}

export async function signOutUser() {
  if (FIREBASE_ENABLED) {
    // TODO: signOut(auth)
  }
  currentUser = null;
  try {
    sessionStorage.removeItem(MOCK_KEY);
  } catch {
    /* ignore */
  }
  notify();
}
