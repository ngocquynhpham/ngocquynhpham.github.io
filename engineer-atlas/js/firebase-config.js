/**
 * Firebase web app config — fill when cloud sync is enabled.
 * Do not commit service account keys; this object is public on GitHub Pages.
 */

export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

/** Your Google account UID — used in Firestore rules allowlist. */
export const ALLOWED_UID = '';

export const FIREBASE_ENABLED =
  Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && ALLOWED_UID);
