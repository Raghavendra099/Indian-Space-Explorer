/**
 * main.js — Indian Space Explorer (Home Page)
 * UI interactions and animations for home page only
 */

'use strict';

/* ─── DOM refs ───────────────────────────────────────────────────────────── */
const navbar         = document.getElementById('navbar');
const hamburger      = document.getElementById('hamburger');
const navLinks       = document.getElementById('navLinks');
const starsContainer = document.getElementById('starsContainer');
const toast          = document.getElementById('toast');
const toastMessage   = document.getElementById('toastMessage');
const toastIcon      = document.getElementById('toastIcon');

const loadingScreen   = document.getElementById('loading-screen');
const launchStars     = document.getElementById('launch-stars');
const rocketAssembly  = document.getElementById('rocket-assembly');
const rocketExhaust   = document.getElementById('rocket-exhaust');
const smokeCloud      = document.getElementById('smoke-cloud');
const countdownNumber = document.getElementById('countdown-num');
const launchStatus    = document.getElementById('launch-status');
const btnLaunch       = document.getElementById('btn-launch');
const btnReset        = document.getElementById('btn-reset');

const launchCheckIds  = ['chk-fuel', 'chk-nav', 'chk-comms', 'chk-go'];
let countdownInterval = null;
let countdownValue    = 10;
let launched          = false;

/* ─── Star field ─────────────────────────────────────────────────────────── */
const createStars = () => {
  if (!starsContainer) return;
  const starCount = 180;
  const fragment  = document.createDocumentFragment();

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2.5 + 0.5;
    star.classList.add('star');
    star.style.cssText = `
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 100}%;
      width:  ${size}px;
      height: ${size}px;
      --twinkle-duration: ${(Math.random() * 3 + 2).toFixed(1)}s;
      --twinkle-delay:    ${(Math.random() * 4).toFixed(1)}s;
      opacity: ${(Math.random() * 0.5 + 0.1).toFixed(2)};
    `;
    fragment.appendChild(star);
  }

  starsContainer.appendChild(fragment);
};

/* ─── Navbar scroll effect ───────────────────────────────────────────────── */
const handleNavbarScroll = () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

/* ─── Mobile menu ────────────────────────────────────────────────────────── */
const toggleMobileMenu = () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
};

const closeMobileMenu = () => {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};

const navLinkItems = document.querySelectorAll('.nav-link');
navLinkItems.forEach(link => link.addEventListener('click', closeMobileMenu));

/* ─── Animated stat counters ─────────────────────────────────────────────── */
let countersStarted = false;

const animateCounter = (el, target, duration = 1800) => {
  const start    = Date.now();
  const startVal = 0;

  const step = () => {
    const elapsed  = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(startVal + (target - startVal) * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  };

  requestAnimationFrame(step);
};

const startCounters = () => {
  if (countersStarted) return;
  countersStarted = true;

  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    animateCounter(el, target);
  });
};

const heroStats = document.getElementById('heroStats');
if (heroStats) {
  const counterObserver = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) startCounters();
    },
    { threshold: 0.4 }
  );
  counterObserver.observe(heroStats);
}

/* ─── Toast notification ─────────────────────────────────────────────────── */
let toastTimeout;

const showToast = (message, type = 'success') => {
  if (!toast) return;
  clearTimeout(toastTimeout);
  toastMessage.textContent = message;
  toastIcon.textContent    = type === 'success' ? '✅' : '❌';
  toast.className          = `toast ${type} show`;

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
};

/* ─── Check user login status ────────────────────────────────────────────── */
const checkUserLogin = () => {
  if (window.AuthHelper) {
    window.AuthHelper.updateAuthNav();
  }
};

/* ─── Launch pad controls (disabled) ─────────────────────────────────────── */
/*
const initLaunchStars = () => {
  const container = document.getElementById('launch-stars');
  if (!container) return;

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 60; i++) {
    const s = document.createElement('div');
    Object.assign(s.style, {
      position: 'absolute',
      width: `${Math.random() * 2 + 0.5}px`,
      height: `${Math.random() * 2 + 0.5}px`,
      borderRadius: '50%',
      background: `rgba(200,230,255,${Math.random() * 0.8 + 0.2})`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    });
    fragment.appendChild(s);
  }
  container.appendChild(fragment);
};

const startCountdown = () => {
  if (launched) return;
  const _btnLaunch = document.getElementById('btn-launch');
  if (_btnLaunch) _btnLaunch.disabled = true;
  try { window.__events = window.__events || []; window.__events.push('startCountdown-enter'); } catch (e) {}
  try { console.log('startCountdown invoked'); } catch (e) {}

  const checks = ['chk-fuel', 'chk-nav', 'chk-comms', 'chk-go'];
  checks.forEach((id, i) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.add('checked');
      const icon = el.querySelector('.chk-icon');
      if (icon) icon.textContent = '';
    }, i * 350);
  });

  setTimeout(() => {
    countdownValue = 10;
    try { window.__launchStarted = true; } catch (e) {}
    try { window.__events.push('startCountdown-timer-started'); } catch (e) {}
    tick();
    countdownInterval = setInterval(tick, 1000);
  }, 1600);
};

const tick = () => {
  const num = document.getElementById('countdown-num');
  const status = document.getElementById('launch-status');
  if (!num || !status) return;
  try { window.__countdownValue = countdownValue; } catch (e) {}
  try { window.__events = window.__events || []; window.__events.push('tick-' + countdownValue); } catch (e) {}
  try { console.log('tick', countdownValue); } catch (e) {}

  num.textContent = String(countdownValue);
  num.classList.toggle('urgent', countdownValue <= 3);

  if (countdownValue <= 5 && countdownValue > 0) {
    status.textContent = `T-${countdownValue} — IGNITION SEQUENCE`;
    status.className = 'launch-status warning';
  }

  if (countdownValue === 3) {
    rocketExhaust?.classList.add('active');
    smokeCloud?.classList.add('active');
  }

  if (countdownValue === 0) {
    clearInterval(countdownInterval);
    num.textContent = '🚀';
    status.textContent = 'LIFTOFF! JAI HIND!';
    status.className = 'launch-status success';
    launchRocket();
    return;
  }

  countdownValue -= 1;
};

const launchRocket = () => {
  launched = true;
  rocketAssembly?.classList.add('launched');
  setTimeout(() => {
    if (btnReset) btnReset.style.display = 'block';
    if (launchStatus) launchStatus.textContent = 'ORBIT ACHIEVED ✓';
  }, 3200);
  // Navigate to missions page after liftoff visuals complete
  try {
    const redirectTarget = '/pages/missions.html';
    setTimeout(() => {
      try { window.location.href = redirectTarget; } catch (e) { try { window.location.href = '/index.html'; } catch (_) {} }
    }, 1200);
  } catch (e) {
    console.warn('Redirect scheduling failed:', e);
  }
};

const resetLaunch = () => {
  launched = false;
  countdownValue = 10;
  clearInterval(countdownInterval);

  const num = document.getElementById('countdown-num');
  const status = document.getElementById('launch-status');
  if (num) {
    num.textContent = '10';
    num.classList.remove('urgent');
  }
  if (status) {
    status.textContent = 'SYSTEMS NOMINAL';
    status.className = 'launch-status';
  }

  rocketAssembly?.classList.remove('launched');
  rocketExhaust?.classList.remove('active');
  smokeCloud?.classList.remove('active');
  const _btnLaunch = document.getElementById('btn-launch');
  const _btnReset = document.getElementById('btn-reset');
  if (_btnLaunch) _btnLaunch.disabled = false;
  if (_btnReset) _btnReset.style.display = 'none';

  ['chk-fuel', 'chk-nav', 'chk-comms', 'chk-go'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('checked');
    const icon = el.querySelector('.chk-icon');
    if (icon) icon.textContent = '⬜';
  });
};

const setupLaunchControls = () => {
  try { window.__events = window.__events || []; window.__events.push('setupLaunchControls-enter'); } catch (e) {}
  const _btnLaunch = document.getElementById('btn-launch');
  const _btnReset = document.getElementById('btn-reset');
  if (_btnLaunch) _btnLaunch.addEventListener('click', () => { window.location.href = '/pages/missions.html'; });
  if (_btnReset) _btnReset.addEventListener('click', resetLaunch);
  // Ensure direct onclick binding so the launch button always redirects
  if (_btnLaunch) _btnLaunch.onclick = () => { window.location.href = '/pages/missions.html'; };
};

// Expose functions for debugging and to allow invocation from inline handlers
try { window.startCountdown = startCountdown; window.tick = tick; window.resetLaunch = resetLaunch; } catch (e) {}

/* ─── QUIZ FEATURE ────────────────────────────────────────────────────── */
const quizData = [
  { q: 'Which year did India’s Chandrayaan-3 successfully land on the Moon?', opts: ['2022', '2023', '2021', '2020'], ans: 1, exp: 'Chandrayaan-3 landed on August 23, 2023!' },
  { q: 'What was the name of the rover deployed by Chandrayaan-3?', opts: ['Vikram', 'Pragyan', 'Aryabhata', 'Nandi'], ans: 1, exp: 'Pragyan rover explored the lunar south pole!' },
  { q: 'In which year did India launch the Mars Orbiter Mission (Mangalyaan)?', opts: ['2014', '2012', '2013', '2015'], ans: 2, exp: 'MOM was launched on November 5, 2013.' },
  { q: 'Who was the first Indian to go to space?', opts: ['Kalpana Chawla', 'Sunita Williams', 'Rakesh Sharma', 'S. Nambi Narayanan'], ans: 2, exp: 'Rakesh Sharma flew to space in April 1984!' },
  { q: 'What is the full form of ISRO?', opts: ['Indian Space Research Organisation', 'Indian Satellite Research Organisation', 'International Space Research Org', 'Indian Science Research Office'], ans: 0, exp: 'Indian Space Research Organisation, founded in 1969!' },
  { q: 'Aditya-L1 was launched to study which celestial body?', opts: ['Moon', 'Mars', 'The Sun', 'Jupiter'], ans: 2, exp: 'Aditya-L1 studies the Sun from the L1 Lagrange point!' },
  { q: 'What is the name of India’s first crewed spaceflight mission?', opts: ['Mangalyaan', 'Gaganyaan', 'Chandrayaan', 'Astroyaan'], ans: 1, exp: 'Gaganyaan will carry Vyomanauts to low Earth orbit!' },
  { q: 'India’s first satellite launched in 1975 was named after whom?', opts: ['Vikram Sarabhai', 'APJ Abdul Kalam', 'Aryabhata', 'Brahmaguptha'], ans: 2, exp: 'Aryabhata — named after the ancient Indian mathematician!' },
  { q: 'What does the "L1" in Aditya-L1 stand for?', opts: ['Lunar 1', 'Lagrange Point 1', 'Launch 1', 'Light Level 1'], ans: 1, exp: 'L1 is a Lagrange point ~1.5 million km from Earth!' },
  { q: 'Which was India’s first rocket launch site?', opts: ['Sriharikota', 'Bangalore', 'Thumba, Kerala', 'Chennai'], ans: 2, exp: 'Thumba Equatorial Rocket Launching Station (TERLS), Kerala!' },
];

let quizIdx = 0;
let quizScore = 0;
let quizTimer = null;
let quizTimeLeft = 30;

const updateQuizScore = () => {
  const scoreEl = document.getElementById('quiz-score');
  if (scoreEl) scoreEl.textContent = String(quizScore);
};

const startQuiz = () => {
  quizIdx = 0;
  quizScore = 0;
  quizTimeLeft = 30;
  updateQuizScore();
  document.getElementById('btn-quiz-start')?.classList.add('hidden');
  document.getElementById('btn-quiz-restart')?.classList.remove('hidden');
  const _btnQuizNext = document.getElementById('btn-quiz-next');
  if (_btnQuizNext) _btnQuizNext.style.display = 'none';
  showQuestion();
};

const showQuestion = () => {
  const quizQuestion = document.getElementById('quiz-question');
  const quizOptions = document.getElementById('quiz-options');
  const quizFeedback = document.getElementById('quiz-feedback');
  const progressFill = document.getElementById('quiz-progress-fill');
  const quizQnum = document.getElementById('quiz-qnum');
  const q = quizData[quizIdx];

  if (!quizQuestion || !quizOptions || !quizFeedback || !progressFill || !quizQnum) return;

  quizQuestion.textContent = q.q;
  quizQnum.textContent = String(quizIdx + 1);
  progressFill.style.width = `${(quizIdx / quizData.length) * 100}%`;
  quizFeedback.textContent = '';
  quizFeedback.className = 'quiz-feedback';
  quizOptions.innerHTML = '';

  q.opts.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quiz-option';
    button.textContent = option;
    button.addEventListener('click', () => selectAnswer(index, q.ans, q.exp));
    quizOptions.appendChild(button);
  });

  startQuizTimer();
};

const startQuizTimer = () => {
  clearInterval(quizTimer);
  quizTimeLeft = 30;
  const timerEl = document.getElementById('quiz-timer');
  if (timerEl) timerEl.textContent = String(quizTimeLeft);

  quizTimer = window.setInterval(() => {
    quizTimeLeft -= 1;
    if (timerEl) timerEl.textContent = String(quizTimeLeft);
    if (quizTimeLeft <= 0) {
      clearInterval(quizTimer);
      timeOut();
    }
  }, 1000);
};

const timeOut = () => {
  const q = quizData[quizIdx];
  document.querySelectorAll('.quiz-option').forEach((button, index) => {
    button.disabled = true;
    if (index === q.ans) button.classList.add('correct');
  });
  const feedback = document.getElementById('quiz-feedback');
  if (feedback) {
    feedback.textContent = `⏱ Time's up! Correct: ${q.opts[q.ans]}`;
    feedback.className = 'quiz-feedback wrong';
  }
  document.getElementById('btn-quiz-next')?.setAttribute('style', 'display:block');
};

const selectAnswer = (selected, correct, explanation) => {
  clearInterval(quizTimer);
  document.querySelectorAll('.quiz-option').forEach((button, index) => {
    button.disabled = true;
    if (index === correct) button.classList.add('correct');
    if (index === selected && selected !== correct) button.classList.add('wrong');
  });

  const feedback = document.getElementById('quiz-feedback');
  if (!feedback) return;

  if (selected === correct) {
    quizScore += 1;
    updateQuizScore();
    feedback.textContent = `✅ Correct! ${explanation}`;
    feedback.className = 'quiz-feedback correct';
  } else {
    feedback.textContent = `❌ Wrong! ${explanation}`;
    feedback.className = 'quiz-feedback wrong';
  }

  document.getElementById('btn-quiz-next')?.setAttribute('style', 'display:block');
};

const nextQuestion = () => {
  quizIdx += 1;
  if (quizIdx >= quizData.length) {
    endQuiz();
  } else {
    showQuestion();
  }
};

const endQuiz = () => {
  clearInterval(quizTimer);
  const scorePercent = Math.round((quizScore / quizData.length) * 100);
  let title = '🌙 Cadet';
  let titleColor = 'var(--color-text-muted)';
  if (scorePercent >= 80) { title = '🚀 Space Commander'; titleColor = 'var(--color-primary)'; }
  else if (scorePercent >= 60) { title = '⭐ Astronaut'; titleColor = 'var(--color-accent)'; }
  else if (scorePercent >= 40) { title = '🛸 Pilot'; titleColor = '#22c55e'; }

  const questionEl = document.getElementById('quiz-question');
  const optionsEl = document.getElementById('quiz-options');
  const feedback = document.getElementById('quiz-feedback');
  const progressFill = document.getElementById('quiz-progress-fill');

  if (questionEl) {
    questionEl.innerHTML = `
      <div style="text-align:center;">
        <div style="font-size:3rem;margin-bottom:12px;">🏆</div>
        <div style="font-family:var(--font-display);font-size:1.2rem;color:${titleColor};margin-bottom:8px;">${title}</div>
        <div style="color:var(--color-text);font-size:1rem;">Score: ${quizScore}/${quizData.length} (${scorePercent}%)</div>
      </div>
    `;
  }

  if (optionsEl) optionsEl.innerHTML = '';
  if (feedback) feedback.textContent = '';
  if (progressFill) progressFill.style.width = '100%';
  document.getElementById('btn-quiz-next')?.setAttribute('style', 'display:none');
  document.getElementById('btn-quiz-restart')?.setAttribute('style', 'display:block');
};

const hideLoadingScreen = () => {
  if (!loadingScreen) return;
  loadingScreen.classList.add('hidden');
  document.body.style.overflow = '';

  const removeSplash = () => {
    if (!loadingScreen.parentElement) return;
    loadingScreen.remove();
  };

  loadingScreen.addEventListener('transitionend', removeSplash, { once: true });
  setTimeout(removeSplash, 900);
};

const scheduleSplashHide = () => {
  const splashDelay = 2000;
  setTimeout(() => {
    hideLoadingScreen();
  }, splashDelay);
};

const initSplash = () => {
  if (loadingScreen) {
    loadingScreen.style.transition = 'opacity 0.18s ease, visibility 0.18s ease';
    loadingScreen.classList.remove('hidden');
  }
  document.body.style.overflow = 'hidden';
  scheduleSplashHide();
};

const initApp = () => {
  try { window.__events = window.__events || []; window.__events.push('initApp-enter'); } catch (e) {}
  createStars();
  checkUserLogin();
  try {
    if (typeof setupLaunchControls === 'function') {
      setupLaunchControls();
    } else {
      // defer shortly to allow function declarations below to load
      setTimeout(() => { if (typeof setupLaunchControls === 'function') setupLaunchControls(); }, 50);
    }
  } catch (e) {
    console.warn('Failed to initialize launch controls immediately, deferring:', e);
    setTimeout(() => { try { if (typeof setupLaunchControls === 'function') setupLaunchControls(); } catch (_) {} }, 50);
  }
  initSplash();
  // Extra safety: ensure splash is removed after a short delay
  setTimeout(() => { try { hideLoadingScreen(); } catch (e) { /* ignore */ } }, 2500);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Safety fallback: if something prevents the splash from hiding, force-hide it.
setTimeout(() => {
  if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
    console.warn('Forced hide of loading screen (fallback)');
    hideLoadingScreen();
  }
}, 5000);

/* ─── Event listeners ────────────────────────────────────────────────────── */
window.addEventListener('scroll', handleNavbarScroll);
hamburger.addEventListener('click', toggleMobileMenu);
document.addEventListener('click', (e) => {
  if (!e.target.closest('nav') && navLinks.classList.contains('open')) {
    closeMobileMenu();
  }
});

// Ensure launch controls are attached after the full script evaluation
document.addEventListener('DOMContentLoaded', () => {
  try { if (typeof setupLaunchControls === 'function') setupLaunchControls(); } catch (e) { /* ignore */ }
});
