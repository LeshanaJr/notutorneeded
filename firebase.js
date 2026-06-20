import { firebaseConfig } from "./firebase-config.js";

const LOCAL_SYNC_KEY = "ntn:lastSyncPreview";
const FIREBASE_VERSION = "10.12.5";

let firebaseApp = null;
let auth = null;
let db = null;
let activeUser = null;
let initPromise = null;

export function isFirebaseConfigured() {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  );
}

export function getActiveUser() {
  return activeUser;
}

export async function initUserData(onRemoteProgress) {
  if (!isFirebaseConfigured()) {
    return { ok: false, mode: "local", reason: "Firebase is not configured yet." };
  }

  const { onAuthStateChanged } = await ensureFirebase();
  onAuthStateChanged(auth, async (user) => {
    activeUser = user;
    if (!user) {
      onRemoteProgress(null);
      return;
    }

    const remoteProgress = await loadUserProgress();
    onRemoteProgress(remoteProgress);
  });

  return { ok: true, mode: "firebase" };
}

export async function signInWithGoogle() {
  if (!isFirebaseConfigured()) {
    return { ok: false, reason: "Add your Firebase web config first." };
  }

  const { GoogleAuthProvider, signInWithPopup } = await ensureFirebase();
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  activeUser = result.user;
  return { ok: true, user: publicUser(activeUser) };
}

export async function signOutUser() {
  if (!auth) return;
  const { signOut } = await ensureFirebase();
  await signOut(auth);
  activeUser = null;
}

export async function saveUserProgress(profile) {
  localStorage.setItem(LOCAL_SYNC_KEY, JSON.stringify(profile));

  if (!activeUser || !db) {
    return { ok: true, mode: "local" };
  }

  const { doc, setDoc, serverTimestamp } = await ensureFirebase();
  await setDoc(doc(db, "users", activeUser.uid), {
    ...profile,
    uid: activeUser.uid,
    email: activeUser.email,
    displayName: activeUser.displayName,
    metrics: buildMetrics(profile.attempts || []),
    updatedAt: serverTimestamp()
  }, { merge: true });

  return { ok: true, mode: "firebase" };
}

export async function recordQuestionAttempt(attempt) {
  if (!activeUser || !db) {
    return { ok: true, mode: "local" };
  }

  const { collection, doc, setDoc, serverTimestamp } = await ensureFirebase();
  const attemptId = attempt.attemptId || crypto.randomUUID();
  const payload = {
    ...attempt,
    attemptId,
    uid: activeUser.uid,
    email: activeUser.email,
    displayName: activeUser.displayName,
    createdAt: serverTimestamp()
  };

  await Promise.all([
    setDoc(doc(db, "questionAttempts", attemptId), payload, { merge: true }),
    setDoc(doc(collection(db, "users", activeUser.uid, "attempts"), attemptId), payload, { merge: true })
  ]);

  return { ok: true, mode: "firebase" };
}

export async function trackUsageEvent(eventName, eventData = {}) {
  if (!activeUser || !db) {
    return { ok: true, mode: "local" };
  }

  const { collection, addDoc, serverTimestamp } = await ensureFirebase();
  await addDoc(collection(db, "usageEvents"), {
    eventName,
    ...eventData,
    uid: activeUser.uid,
    email: activeUser.email,
    displayName: activeUser.displayName,
    createdAt: serverTimestamp()
  });

  return { ok: true, mode: "firebase" };
}

async function loadUserProgress() {
  if (!activeUser || !db) return null;

  const { doc, getDoc } = await ensureFirebase();
  const snapshot = await getDoc(doc(db, "users", activeUser.uid));
  return snapshot.exists() ? snapshot.data() : null;
}

async function ensureFirebase() {
  if (initPromise) return initPromise;

  initPromise = Promise.all([
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`)
  ]).then(([appModule, authModule, firestoreModule]) => {
    firebaseApp = appModule.getApps().length
      ? appModule.getApps()[0]
      : appModule.initializeApp(firebaseConfig);
    auth = authModule.getAuth(firebaseApp);
    db = firestoreModule.getFirestore(firebaseApp);

    return {
      ...appModule,
      ...authModule,
      ...firestoreModule
    };
  });

  return initPromise;
}

function publicUser(user) {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL
  };
}

function buildMetrics(attempts) {
  const totalAnswered = attempts.length;
  const correctAnswers = attempts.filter((attempt) => attempt.correct).length;
  const domainStats = attempts.reduce((stats, attempt) => {
    const current = stats[attempt.domain] || { answered: 0, correct: 0 };
    current.answered += 1;
    if (attempt.correct) current.correct += 1;
    stats[attempt.domain] = current;
    return stats;
  }, {});

  Object.values(domainStats).forEach((domain) => {
    domain.accuracy = domain.answered ? Math.round((domain.correct / domain.answered) * 100) : 0;
  });

  return {
    totalAnswered,
    correctAnswers,
    overallAccuracy: totalAnswered ? Math.round((correctAnswers / totalAnswered) * 100) : 0,
    domainStats,
    lastAnsweredAt: attempts.at(-1)?.answeredAt || null
  };
}
