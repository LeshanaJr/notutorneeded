import { questionBank, satDomains } from "./question-loader.js";
import {
  getActiveUser,
  initUserData,
  isFirebaseConfigured,
  recordQuestionAttempt,
  saveUserProgress,
  signInWithGoogle,
  signOutUser,
  trackUsageEvent
} from "./firebase.js";

const STORAGE_KEY = "noTutorNeeded:userProgress";
const today = new Date().toISOString().slice(0, 10);

const defaultState = {
  studentName: "",
  targetScore: 1400,
  dailyQuota: 20,
  testDate: "",
  attempts: [],
  currentQuestionId: null,
  quizMode: "weakness"
};

let state = loadState();
let currentQuestion = null;
let session = { correct: 0, total: 0 };

const $ = (selector) => document.querySelector(selector);

const els = {
  navLinks: document.querySelectorAll(".nav-link"),
  pages: document.querySelectorAll(".page"),
  pageTitle: $("#pageTitle"),
  pageEyebrow: $("#pageEyebrow"),
  profileForm: $("#profileForm"),
  studentName: $("#studentName"),
  coachHeadline: $("#coachHeadline"),
  coachText: $("#coachText"),
  todayCount: $("#todayCount"),
  quotaGoal: $("#quotaGoal"),
  quotaRing: $("#quotaRing"),
  quotaPercent: $("#quotaPercent"),
  sidebarQuotaBar: $("#sidebarQuotaBar"),
  totalAnswered: $("#totalAnswered"),
  overallAccuracy: $("#overallAccuracy"),
  targetScoreDisplay: $("#targetScoreDisplay"),
  testDateDisplay: $("#testDateDisplay"),
  weaknessChips: $("#weaknessChips"),
  dashboardFocus: $("#dashboardFocus"),
  domainGrid: $("#domainGrid"),
  startWeaknessQuiz: $("#startWeaknessQuiz"),
  reviewLessons: $("#reviewLessons"),
  categoryPractice: $("#categoryPractice"),
  practiceSection: $("#practiceSection"),
  lessonSection: $("#lessonSection"),
  quizMode: $("#quizMode"),
  quizTitle: $("#quizTitle"),
  questionDomain: $("#questionDomain"),
  questionSkill: $("#questionSkill"),
  questionDifficulty: $("#questionDifficulty"),
  questionText: $("#questionText"),
  choiceList: $("#choiceList"),
  feedback: $("#feedback"),
  nextQuestion: $("#nextQuestion"),
  skipQuestion: $("#skipQuestion"),
  sessionCorrect: $("#sessionCorrect"),
  sessionTotal: $("#sessionTotal"),
  sessionHint: $("#sessionHint"),
  sessionFocus: $("#sessionFocus"),
  lessonFilter: $("#lessonFilter"),
  lessonGrid: $("#lessonGrid"),
  settingsForm: $("#settingsForm"),
  targetScore: $("#targetScore"),
  dailyQuota: $("#dailyQuota"),
  testDate: $("#testDate"),
  googleSignIn: $("#googleSignIn"),
  googleSignOut: $("#googleSignOut"),
  accountStatus: $("#accountStatus"),
  resetData: $("#resetData")
};

const pageMeta = {
  dashboard: { title: "Dashboard", eyebrow: "Study Plan" },
  practice: { title: "Practice", eyebrow: "Personalized Quiz" },
  categories: { title: "Categories", eyebrow: "Weakness Tracking" },
  lessons: { title: "Lessons", eyebrow: "Mini Tutorials" },
  goals: { title: "Goals", eyebrow: "Targets and Data" }
};

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return { ...defaultState };
  }
}

async function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  try {
    await saveUserProgress({
      studentName: state.studentName,
      targetScore: state.targetScore,
      dailyQuota: state.dailyQuota,
      testDate: state.testDate,
      attempts: state.attempts
    });
    renderAccountStatus();
  } catch (error) {
    renderAccountStatus(`Cloud save failed: ${error.message}`);
  }
}

function applyRemoteState(remoteProgress) {
  if (!remoteProgress) {
    renderAccountStatus();
    return;
  }

  state = {
    ...state,
    studentName: state.studentName,
    ...pickProgressFields(remoteProgress)
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderAll();
  renderAccountStatus();
}

function pickProgressFields(progress) {
  return {
    studentName: progress.studentName || state.studentName,
    targetScore: Number(progress.targetScore) || defaultState.targetScore,
    dailyQuota: Number(progress.dailyQuota) || defaultState.dailyQuota,
    testDate: progress.testDate || "",
    attempts: Array.isArray(progress.attempts) ? progress.attempts : []
  };
}

function renderAccountStatus(message = "") {
  const user = getActiveUser();
  const configured = isFirebaseConfigured();

  els.googleSignIn.disabled = !configured;
  els.googleSignIn.hidden = Boolean(user);
  els.googleSignOut.hidden = !user;

  if (message) {
    els.accountStatus.textContent = message;
  } else if (user) {
    els.accountStatus.textContent = `Connected as ${user.email || user.displayName}. Progress is saving to Google.`;
  } else if (configured) {
    els.accountStatus.textContent = "Firebase is configured. Connect Google to save progress across devices.";
  } else {
    els.accountStatus.textContent = "Progress is saved on this device. Add Firebase config to enable Google cloud save.";
  }
}

function attemptsForDomain(domainId) {
  return state.attempts.filter((attempt) => attempt.domain === domainId);
}

function domainStats(domainId) {
  const attempts = attemptsForDomain(domainId);
  const correct = attempts.filter((attempt) => attempt.correct).length;
  const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : 0;
  return { attempts: attempts.length, correct, accuracy };
}

function overallStats() {
  const total = state.attempts.length;
  const correct = state.attempts.filter((attempt) => attempt.correct).length;
  const todayCount = state.attempts.filter((attempt) => attempt.date === today).length;
  return {
    total,
    correct,
    todayCount,
    accuracy: total ? Math.round((correct / total) * 100) : 0
  };
}

function weakestDomains(limit = 3) {
  return [...satDomains]
    .sort((a, b) => {
      const aStats = domainStats(a.id);
      const bStats = domainStats(b.id);
      const aScore = aStats.attempts ? aStats.accuracy : 45;
      const bScore = bStats.attempts ? bStats.accuracy : 45;
      return aScore - bScore || aStats.attempts - bStats.attempts;
    })
    .slice(0, limit);
}

function getQuestionPool() {
  if (state.quizMode === "math") {
    return questionBank.filter((question) => question.section === "Math");
  }

  if (state.quizMode === "reading") {
    return questionBank.filter((question) => question.section === "Reading and Writing");
  }

  if (state.quizMode === "weakness") {
    const weakDomainIds = weakestDomains(3).map((domain) => domain.id);
    return questionBank.filter((question) => weakDomainIds.includes(question.domain));
  }

  return questionBank;
}

function pickQuestion() {
  const pool = getQuestionPool();
  const currentIndex = pool.findIndex((question) => question.id === state.currentQuestionId);
  const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % pool.length : Math.floor(Math.random() * pool.length);
  return pool[nextIndex] || questionBank[0];
}

function renderDashboard() {
  const stats = overallStats();
  const quotaProgress = Math.min(100, Math.round((stats.todayCount / state.dailyQuota) * 100));
  const weakest = weakestDomains(1)[0];
  const weakestStats = domainStats(weakest.id);

  els.todayCount.textContent = stats.todayCount;
  els.quotaGoal.textContent = state.dailyQuota;
  els.quotaPercent.textContent = `${quotaProgress}%`;
  els.quotaRing.style.background = `conic-gradient(var(--sat-green) ${quotaProgress * 3.6}deg, var(--sat-line) 0deg)`;
  els.sidebarQuotaBar.style.width = `${quotaProgress}%`;
  els.totalAnswered.textContent = stats.total;
  els.overallAccuracy.textContent = `${stats.accuracy}%`;
  els.targetScoreDisplay.textContent = state.targetScore;
  els.testDateDisplay.textContent = state.testDate ? `Test date: ${state.testDate}` : "Set your test date";

  els.coachHeadline.textContent = stats.todayCount >= state.dailyQuota
    ? "Daily quota complete."
    : `Answer ${state.dailyQuota - stats.todayCount} more questions today.`;
  els.coachText.textContent = `${weakest.id} is the current priority: ${weakestStats.attempts ? `${weakestStats.accuracy}% accuracy` : "no attempts yet"}.`;

  els.weaknessChips.innerHTML = weakestDomains(3)
    .map((domain) => `<span class="chip">${domain.id}</span>`)
    .join("");

  els.dashboardFocus.innerHTML = weakestDomains(3).map((domain) => {
    const stats = domainStats(domain.id);
    return `
      <div class="roadmap-step">
        <strong>${domain.id}</strong>
        <p>${stats.attempts ? `${stats.accuracy}% accuracy after ${stats.attempts} attempts` : "No attempts yet"}</p>
      </div>
    `;
  }).join("");
}

function renderDomains() {
  els.domainGrid.innerHTML = satDomains.map((domain) => {
    const stats = domainStats(domain.id);
    const width = stats.attempts ? stats.accuracy : 0;
    const strength = width >= 75 ? "strong" : width >= 50 ? "mixed" : "weak";
    return `
      <article class="domain-card">
        <div class="domain-card-top">
          <div>
            <div class="eyebrow">${domain.section}</div>
            <h3>${domain.id}</h3>
          </div>
          <span>${stats.attempts} answered</span>
        </div>
        <p>${domain.description}</p>
        <div class="progress-bar ${strength}"><span style="width: ${width}%"></span></div>
        <strong>${stats.attempts ? `${stats.accuracy}% accuracy` : "Ready to practice"}</strong>
      </article>
    `;
  }).join("");
}

function renderLessons() {
  const selected = els.lessonFilter.value;
  const visible = selected === "all" ? satDomains : satDomains.filter((domain) => domain.id === selected);
  els.lessonGrid.innerHTML = visible.map((domain) => `
    <article class="lesson-card">
      <div class="eyebrow">${domain.section}</div>
      <h3>${domain.id}</h3>
      <p>${domain.description}</p>
      <ol>
        ${domain.lesson.map((step) => `<li>${step}</li>`).join("")}
      </ol>
      <button class="secondary-btn lesson-practice" data-domain="${domain.id}" type="button">Practice This Category</button>
    </article>
  `).join("");
}

function renderSettings() {
  els.studentName.value = state.studentName;
  els.targetScore.value = state.targetScore;
  els.dailyQuota.value = state.dailyQuota;
  els.testDate.value = state.testDate;
  els.quizMode.value = state.quizMode;
}

function renderSessionFocus() {
  els.sessionCorrect.textContent = session.correct;
  els.sessionTotal.textContent = session.total;
  els.sessionFocus.innerHTML = weakestDomains(3).map((domain) => {
    const stats = domainStats(domain.id);
    return `
      <div class="roadmap-step">
        <strong>${domain.id}</strong>
        <p>${stats.attempts ? `${stats.accuracy}% accuracy after ${stats.attempts} attempts` : "No attempts yet"}</p>
      </div>
    `;
  }).join("");
}

function renderQuestion(question) {
  currentQuestion = question;
  state.currentQuestionId = question.id;
  els.quizTitle.textContent = `${modeLabel(state.quizMode)} Practice`;
  els.questionDomain.textContent = question.domain;
  els.questionSkill.textContent = question.skill;
  els.questionDifficulty.textContent = question.difficulty;
  els.questionText.textContent = question.question;
  els.feedback.textContent = "";
  els.feedback.className = "feedback";
  els.nextQuestion.textContent = "Next Question";
  els.choiceList.innerHTML = question.choices.map((choice) => `
    <button class="choice-btn" data-choice="${escapeHtml(choice)}" type="button">${choice}</button>
  `).join("");
  saveState();
}

function modeLabel(mode) {
  if (mode === "math") return "Math";
  if (mode === "reading") return "Reading and Writing";
  if (mode === "all") return "All Category";
  return "Weakness";
}

function answerQuestion(choiceButton) {
  if (!currentQuestion || choiceButton.disabled) return;
  const selected = choiceButton.dataset.choice;
  const correct = selected === currentQuestion.answer;

  [...els.choiceList.querySelectorAll(".choice-btn")].forEach((button) => {
    button.disabled = true;
    if (button.dataset.choice === currentQuestion.answer) button.classList.add("correct");
    if (button === choiceButton && !correct) button.classList.add("wrong");
  });

  const attempt = {
    attemptId: crypto.randomUUID(),
    id: currentQuestion.id,
    domain: currentQuestion.domain,
    section: currentQuestion.section,
    skill: currentQuestion.skill,
    difficulty: currentQuestion.difficulty,
    correct,
    date: today,
    answeredAt: new Date().toISOString()
  };

  state.attempts.push(attempt);

  session.total += 1;
  if (correct) session.correct += 1;

  els.feedback.textContent = `${correct ? "Correct." : "Not quite."} ${currentQuestion.explanation}`;
  els.feedback.classList.add(correct ? "correct" : "wrong");
  els.sessionHint.textContent = correct
    ? "Nice. The app saved that strength."
    : "Saved. This category will show up more often in weakness mode.";

  saveState();
  recordQuestionAttempt(attempt).catch((error) => {
    renderAccountStatus(`Analytics save failed: ${error.message}`);
  });
  renderAll();
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function switchPage(page) {
  const nextPage = pageMeta[page] ? page : "dashboard";
  els.pages.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.pagePanel === nextPage);
  });
  els.navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.page === nextPage);
  });
  els.pageTitle.textContent = pageMeta[nextPage].title;
  els.pageEyebrow.textContent = pageMeta[nextPage].eyebrow;
  if (location.hash !== `#${nextPage}`) {
    history.pushState(null, "", `#${nextPage}`);
  }
  trackUsageEvent("page_view", { page: nextPage }).catch(() => {});
}

function renderAll() {
  renderDashboard();
  renderDomains();
  renderLessons();
  renderSettings();
  renderSessionFocus();
}

function bindEvents() {
  els.navLinks.forEach((link) => {
    link.addEventListener("click", () => switchPage(link.dataset.page));
  });

  window.addEventListener("hashchange", () => {
    switchPage(location.hash.replace("#", "") || "dashboard");
  });

  els.profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.studentName = els.studentName.value.trim();
    saveState();
    renderAll();
  });

  els.startWeaknessQuiz.addEventListener("click", () => {
    state.quizMode = "weakness";
    renderQuestion(pickQuestion());
    renderAll();
    switchPage("practice");
    trackUsageEvent("quiz_started", { mode: "weakness", source: "dashboard" }).catch(() => {});
  });

  els.reviewLessons.addEventListener("click", () => switchPage("lessons"));
  els.categoryPractice.addEventListener("click", () => {
    state.quizMode = "weakness";
    renderQuestion(pickQuestion());
    renderAll();
    switchPage("practice");
    trackUsageEvent("quiz_started", { mode: "weakness", source: "categories" }).catch(() => {});
  });

  els.nextQuestion.addEventListener("click", () => {
    renderQuestion(pickQuestion());
    trackUsageEvent("question_loaded", { mode: state.quizMode }).catch(() => {});
  });
  els.skipQuestion.addEventListener("click", () => {
    trackUsageEvent("question_skipped", { questionId: currentQuestion?.id, mode: state.quizMode }).catch(() => {});
    renderQuestion(pickQuestion());
  });

  els.choiceList.addEventListener("click", (event) => {
    const choiceButton = event.target.closest(".choice-btn");
    if (choiceButton) answerQuestion(choiceButton);
  });

  els.quizMode.addEventListener("change", () => {
    state.quizMode = els.quizMode.value;
    saveState();
    renderAll();
  });

  els.lessonFilter.addEventListener("change", renderLessons);

  els.lessonGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".lesson-practice");
    if (!button) return;
    const question = questionBank.find((item) => item.domain === button.dataset.domain);
    state.quizMode = "all";
    renderQuestion(question);
    renderAll();
    switchPage("practice");
  });

  els.settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.targetScore = Number(els.targetScore.value);
    state.dailyQuota = Number(els.dailyQuota.value);
    state.testDate = els.testDate.value;
    saveState();
    renderAll();
  });

  els.resetData.addEventListener("click", () => {
    state = { ...defaultState, studentName: state.studentName };
    currentQuestion = null;
    session = { correct: 0, total: 0 };
    saveState();
    els.choiceList.innerHTML = "";
    els.questionText.textContent = "Start a quiz to see your first question.";
    els.feedback.textContent = "";
    renderAll();
  });

  els.googleSignIn.addEventListener("click", async () => {
    els.accountStatus.textContent = "Opening Google sign-in...";
    try {
      const result = await signInWithGoogle();
      if (!result.ok) {
        renderAccountStatus(result.reason);
        return;
      }
      await saveState();
      renderAccountStatus();
      trackUsageEvent("google_connected").catch(() => {});
    } catch (error) {
      renderAccountStatus(`Google sign-in failed: ${error.message}`);
    }
  });

  els.googleSignOut.addEventListener("click", async () => {
    try {
      await signOutUser();
      renderAccountStatus();
    } catch (error) {
      renderAccountStatus(`Sign out failed: ${error.message}`);
    }
  });
}

function init() {
  satDomains.forEach((domain) => {
    const option = document.createElement("option");
    option.value = domain.id;
    option.textContent = domain.id;
    els.lessonFilter.append(option);
  });

  bindEvents();
  renderAll();
  renderAccountStatus();
  initUserData(applyRemoteState).then(() => renderAccountStatus()).catch((error) => {
    renderAccountStatus(`Google save is unavailable: ${error.message}`);
  });
  switchPage(location.hash.replace("#", "") || "dashboard");
}

init();
