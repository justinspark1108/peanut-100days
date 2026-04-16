/* ============================================
   100 Days of You — Script
   
   Features:
   - Password gate → mode selection → app
   - Three modes: Blue (romantic), Red (passionate), Yellow (data)
   - Mode persistence in localStorage
   - Visit tracking, time tracking, streak calculation
   - Shuffle, browse, swipe, milestones, easter eggs
   ============================================ */

(() => {
  'use strict';

  // ─── Configuration ───
  const PASSWORD = 'nootnoot';
  const TOTAL_NOTES = 100;
  const PHOTO_NOTES = [3, 7, 12, 18, 23, 29, 34, 41, 47, 53, 58, 64, 71, 78, 85];
  const VIDEO_NOTES = [10, 27, 45, 62, 90];

  const NOTE_COLORS = [
    'color-yellow', 'color-blue', 'color-purple', 'color-pink',
    'color-lavender', 'color-mint', 'color-peach'
  ];

  // ─── 100 Love Notes ───
  const notes = [
    "You make every day brighter ☀️",
    "Your laugh is my favorite sound 🎵",
    "The way you look at me makes me melt 🫠",
    "You're the first person I want to talk to every morning ☀️",
    "Your smile could light up the darkest room ✨",
    "Even your silence feels comfortable to me 🤍",
    "You make the ordinary feel extraordinary 🌟",
    "I love how passionate you are about the things you care about 💫",
    "Your hugs feel like coming home 🏠",
    "Every love song finally makes sense because of you 🎶",
    "You see the best in me, even when I can't see it myself 🪞",
    "Your kindness inspires me to be a better person 💛",
    "I love the little faces you make when you're thinking 🤔",
    "You make me laugh harder than anyone else 😂",
    "The way you hold my hand makes everything feel okay 🤝",
    "You're my safe space 🛡️",
    "I could listen to you talk about anything forever 💬",
    "Your voice is the most comforting thing I know 🎧",
    "You make mundane moments magical ✨",
    "I love how your eyes light up when you're excited 💫",
    "You're the most beautiful person I've ever met 🌸",
    "Your strength amazes me every single day 💪",
    "You make my heart skip a beat every time I see you 💓",
    "I love how you care so deeply about the people in your life 🫶",
    "You have the cutest reactions to everything 🥺",
    "Your happiness is genuinely my happiness too 💛",
    "I love how honest you always are with me 💬",
    "You make the world a better place just by being in it 🌍",
    "Your creativity and imagination blow me away 🎨",
    "I'm so grateful you chose me 🥹",
    "You make even the worst days bearable ☂️",
    "Your optimism is contagious 🌈",
    "I love how you remember the little things 🧠",
    "You give the best advice, even when you don't realize it 💡",
    "Your presence alone is enough to calm my anxiety 🧘",
    "I love the way you scrunch your nose when you laugh 🤭",
    "You make me want to be the best version of myself 🌱",
    "Your stubbornness is secretly one of my favorite things 😤",
    "I could get lost in your eyes forever 👀",
    "You make coffee dates feel like the most romantic thing 🧋",
    "I love how you get excited about small things 🎉",
    "You've taught me what real love feels like 💛",
    "Your scent is my favorite smell in the world 🌸",
    "I love how you can be silly and serious in the same minute 🎭",
    "You're my favorite distraction 😏",
    "I love how you sing along to songs even when you don't know the words 🎤",
    "Your texts make me smile like an idiot every time 📱",
    "You make me believe in happily ever afters 🏰",
    "I love how you care about the world around you 🌎",
    "Your compassion is one of your superpowers 🦸‍♀️",
    "I love the way you say my name 🗣️",
    "You make lazy Sundays feel perfect 🛋️",
    "Your determination inspires me every day 🔥",
    "I love how you notice things others miss 🔍",
    "You're the reason I believe in love at all 💕",
    "Your cooking (or trying to cook) is adorable 🍳",
    "I love how you express yourself so freely 🎨",
    "You make my heart feel full just by existing 🫀",
    "Your cuddles are my absolute favorite thing 🧸",
    "I love how you always know how to make me feel better 💊",
    "You're smarter than you give yourself credit for 🧠",
    "I love the way you get lost in thought 🌌",
    "Your kisses feel like magic 💋",
    "I love how you're not afraid to be yourself 🦋",
    "You make everything more fun 🎡",
    "I love how you care about animals so much 🐾",
    "Your laugh lines are the most beautiful thing 💛",
    "I love how you push me out of my comfort zone 🚀",
    "You're the missing piece I didn't know I needed 🧩",
    "I love how you can make any situation better 💫",
    "Your patience with me means the world 🌸",
    "I love the way you play with my hair ☁️",
    "You're my favorite adventure partner 🗺️",
    "I love how you dream so big 🌠",
    "Your voice is the last thing I want to hear before falling asleep 🌙",
    "I love how you stand up for what you believe in ✊",
    "You make me feel understood like nobody else 💭",
    "Your weird habits are adorable 🤪",
    "I love how you keep me grounded 🌳",
    "You're the most interesting person I know 📚",
    "I love how you see beauty in everything 🌺",
    "Your energy is magnetic ⚡",
    "I love how comfortable silence is with you 🤫",
    "You make me want to protect you and also know you can protect yourself 🛡️",
    "I love how you wear your heart on your sleeve 💝",
    "You're the best thing that's ever happened to me 🌟",
    "I love how you make everyone around you feel special 🎀",
    "Your love language is the most beautiful one 💌",
    "I love how you never give up on things that matter 💎",
    "You make every season feel like my favorite 🍂🌸❄️☀️",
    "I love how you still give me butterflies 🦋",
    "You're my person. Plain and simple. 💛",
    "And I'll love you for 100 more days, and then some more 💛🩵",
    "You make life worth living. Every single day. 🫶"
  ];

  // ─── State ───
  const state = {
    currentNote: 0,
    discoveredNotes: new Set(),
    recentDiscoveries: [], // [{index, timestamp}]
    shuffleHistory: [],
    view: 'home', // 'home', 'note', 'browse', 'data'
    currentMode: 'blue', // 'blue', 'red', 'yellow'
    hasSelectedModeBefore: false,
    // Tracking data
    sessionStart: Date.now(),
    visitCount: 0,
    visitDates: [], // ['YYYY-MM-DD', ...]
    timeSpent: 0, // total seconds
    lastSessionStart: null,
  };

  // ─── DOM Elements ───
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const els = {
    lockScreen: $('#lock-screen'),
    modeSelect: $('#mode-select'),
    app: $('#app'),
    passwordInput: $('#password-input'),
    unlockBtn: $('#unlock-btn'),
    lockError: $('#lock-error'),
    homeView: $('#home-view'),
    noteView: $('#note-view'),
    browseView: $('#browse-view'),
    dataView: $('#data-view'),
    noteCard: $('#note-card'),
    noteNumber: $('#note-number'),
    noteText: $('#note-text'),
    noteMedia: $('#note-media'),
    navCounter: $('#nav-counter'),
    notesRead: $('#notes-read'),
    browseGrid: $('#browse-grid'),
    shuffleBtn: $('#shuffle-btn'),
    browseBtn: $('#browse-btn'),
    shuffleAgain: $('#shuffle-again'),
    noteBack: $('#note-back'),
    browseBack: $('#browse-back'),
    prevBtn: $('#prev-btn'),
    nextBtn: $('#next-btn'),
    transition: $('#transition-overlay'),
    eeLockPeanut: $('#ee-lock-peanut'),
    eeAppButter: $('#ee-app-butter'),
    // Data view elements
    dataDiscovered: $('#data-discovered'),
    dataRemaining: $('#data-remaining'),
    dataVisits: $('#data-visits'),
    dataStreak: $('#data-streak'),
    dataProgressText: $('#data-progress-text'),
    dataProgressFill: $('#data-progress-fill'),
    dataGrid: $('#data-grid'),
    dataRecentList: $('#data-recent-list'),
    dataRecentSection: $('#data-recent-section'),
    dataFunList: $('#data-fun-list'),
    dataBackBtn: $('#data-back-btn'),
    // Mode switcher
    modeDots: $$('.mode-dot'),
    modeCards: $$('.mode-card'),
  };

  // ─── localStorage helpers ───
  function loadState() {
    try {
      const saved = localStorage.getItem('100days-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.discoveredNotes) {
          state.discoveredNotes = new Set(parsed.discoveredNotes);
        }
        if (parsed.recentDiscoveries) {
          state.recentDiscoveries = parsed.recentDiscoveries || [];
        }
        if (parsed.currentMode) {
          state.currentMode = parsed.currentMode;
        }
        if (parsed.hasSelectedModeBefore) {
          state.hasSelectedModeBefore = true;
        }
        if (parsed.visitCount) {
          state.visitCount = parsed.visitCount;
        }
        if (parsed.visitDates) {
          state.visitDates = parsed.visitDates;
        }
        if (parsed.timeSpent) {
          state.timeSpent = parsed.timeSpent;
        }
        if (parsed.lastSessionStart) {
          state.lastSessionStart = parsed.lastSessionStart;
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  }

  function saveState() {
    try {
      localStorage.setItem('100days-state', JSON.stringify({
        discoveredNotes: [...state.discoveredNotes],
        recentDiscoveries: state.recentDiscoveries.slice(-20), // Keep last 20
        currentMode: state.currentMode,
        hasSelectedModeBefore: state.hasSelectedModeBefore,
        visitCount: state.visitCount,
        visitDates: state.visitDates,
        timeSpent: state.timeSpent,
        lastSessionStart: state.sessionStart,
      }));
    } catch (e) {
      // Ignore storage errors
    }
  }

  // ─── Tracking ───
  function trackVisit() {
    const today = new Date().toISOString().split('T')[0];
    state.visitCount++;
    
    // Track unique visit dates
    if (!state.visitDates.includes(today)) {
      state.visitDates.push(today);
    }
    
    // Calculate time from last session
    if (state.lastSessionStart) {
      const elapsed = Math.floor((Date.now() - state.lastSessionStart) / 1000);
      // Only count if less than 4 hours (avoid counting long absences)
      if (elapsed < 4 * 60 * 60) {
        state.timeSpent += elapsed;
      }
    }
    
    state.sessionStart = Date.now();
    saveState();
  }

  function updateTimeSpent() {
    const elapsed = Math.floor((Date.now() - state.sessionStart) / 1000);
    return state.timeSpent + elapsed;
  }

  function formatTime(seconds) {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  }

  function calculateStreak() {
    if (state.visitDates.length === 0) return 0;
    
    const sorted = [...state.visitDates].sort().reverse();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    // Streak must include today or yesterday
    if (sorted[0] !== today && sorted[0] !== yesterday) return 0;
    
    let streak = 1;
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1]);
      const curr = new Date(sorted[i]);
      const diff = Math.floor((prev - curr) / 86400000);
      
      if (diff === 1) {
        streak++;
      } else if (diff > 1) {
        break;
      }
      // diff === 0 means same day, skip
    }
    
    return streak;
  }

  function getMostVisitedHour() {
    // Track hour from visit timestamps in recent discoveries
    const hours = state.recentDiscoveries.map(d => new Date(d.timestamp).getHours());
    if (hours.length === 0) return null;
    
    const counts = {};
    hours.forEach(h => { counts[h] = (counts[h] || 0) + 1; });
    
    let maxHour = 0, maxCount = 0;
    for (const [hour, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        maxHour = parseInt(hour);
      }
    }
    
    const ampm = maxHour >= 12 ? 'PM' : 'AM';
    const display = maxHour === 0 ? 12 : maxHour > 12 ? maxHour - 12 : maxHour;
    return `${display}${ampm}`;
  }

  // ─── Password Gate ───
  function initLock() {
    els.passwordInput.focus();

    const attemptUnlock = () => {
      const val = els.passwordInput.value.trim().toLowerCase();
      if (val === PASSWORD) {
        unlock();
      } else {
        els.lockError.classList.remove('hidden');
        els.passwordInput.value = '';
        els.passwordInput.focus();
        setTimeout(() => els.lockError.classList.add('hidden'), 3000);
      }
    };

    els.unlockBtn.addEventListener('click', attemptUnlock);
    els.passwordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') attemptUnlock();
    });
  }

  function unlock() {
    els.transition.classList.add('active');
    setTimeout(() => {
      els.lockScreen.classList.remove('active');
      
      trackVisit();
      
      // If she's been here before and has a saved mode, skip mode select
      if (state.hasSelectedModeBefore && state.currentMode) {
        applyMode(state.currentMode, false);
        els.app.classList.add('active');
        updateProgress();
        setTimeout(() => els.transition.classList.remove('active'), 100);
      } else {
        // Show mode selection
        els.modeSelect.classList.add('active');
        setTimeout(() => els.transition.classList.remove('active'), 100);
      }
    }, 400);
  }

  // ─── Mode Management ───
  function selectMode(mode) {
    state.currentMode = mode;
    state.hasSelectedModeBefore = true;
    saveState();

    els.transition.classList.add('active');
    setTimeout(() => {
      els.modeSelect.classList.remove('active');
      applyMode(mode, true);
      els.app.classList.add('active');
      updateProgress();
      setTimeout(() => els.transition.classList.remove('active'), 100);
    }, 400);
  }

  function applyMode(mode, showDataView) {
    // Remove all mode classes
    document.body.classList.remove('mode-blue', 'mode-red', 'mode-yellow');
    document.body.classList.add(`mode-${mode}`);

    // Update mode switcher dots
    els.modeDots.forEach(dot => {
      dot.classList.toggle('active', dot.dataset.mode === mode);
    });

    // Show appropriate view
    if (mode === 'yellow' && showDataView !== false) {
      showView('data');
    } else {
      showView('home');
    }
  }

  function switchMode(mode) {
    if (mode === state.currentMode) return;

    state.currentMode = mode;
    saveState();

    // Brief transition
    document.body.classList.add('mode-transitioning');
    
    setTimeout(() => {
      document.body.classList.remove('mode-blue', 'mode-red', 'mode-yellow');
      document.body.classList.add(`mode-${mode}`);

      // Update dots
      els.modeDots.forEach(dot => {
        dot.classList.toggle('active', dot.dataset.mode === mode);
      });

      // Show appropriate view
      if (mode === 'yellow') {
        showView('data');
      } else {
        // If we were in data view, go home; otherwise keep current view
        if (state.view === 'data') {
          showView('home');
        }
      }

      setTimeout(() => {
        document.body.classList.remove('mode-transitioning');
      }, 50);
    }, 150);
  }

  // ─── View Management ───
  function showView(viewName) {
    const prevView = state.view;
    state.view = viewName;
    
    const views = [els.homeView, els.noteView, els.browseView];
    views.forEach(v => v.classList.remove('active'));
    els.dataView.classList.remove('active');

    switch (viewName) {
      case 'home':
        els.homeView.classList.add('active');
        break;
      case 'note':
        els.noteView.classList.add('active');
        break;
      case 'browse':
        els.browseView.classList.add('active');
        buildBrowseGrid();
        break;
      case 'data':
        els.dataView.classList.add('active');
        buildDataView();
        break;
    }
  }

  // ─── Note Display ───
  function getNoteColor(index) {
    return NOTE_COLORS[index % NOTE_COLORS.length];
  }

  function getRotation(colorClass) {
    const rotations = {
      'color-yellow': '-0.5deg',
      'color-blue': '0.8deg',
      'color-purple': '-0.3deg',
      'color-pink': '0.5deg',
      'color-lavender': '-0.7deg',
      'color-mint': '0.6deg',
      'color-peach': '-0.4deg'
    };
    return rotations[colorClass] || '-0.5deg';
  }

  function showNote(index, animate = true) {
    if (index < 0 || index >= TOTAL_NOTES) return;

    state.currentNote = index;
    const noteData = notes[index];
    const colorClass = getNoteColor(index);
    const rotation = getRotation(colorClass);

    // Track discovery
    const isNewDiscovery = !state.discoveredNotes.has(index);
    state.discoveredNotes.add(index);
    
    if (isNewDiscovery) {
      state.recentDiscoveries.push({
        index: index,
        timestamp: Date.now()
      });
      // Keep only last 20
      if (state.recentDiscoveries.length > 20) {
        state.recentDiscoveries = state.recentDiscoveries.slice(-20);
      }
    }
    
    saveState();
    updateProgress();

    // Update card
    els.noteCard.className = 'note-card';
    void els.noteCard.offsetWidth; // Force reflow

    els.noteCard.classList.add(colorClass);
    els.noteCard.style.setProperty('--rotation', rotation);

    els.noteNumber.textContent = `#${index + 1}`;
    els.noteText.textContent = noteData;
    els.navCounter.textContent = `${index + 1} / ${TOTAL_NOTES}`;

    // Handle media
    els.noteMedia.innerHTML = '';
    if (PHOTO_NOTES.includes(index + 1)) {
      els.noteMedia.innerHTML = `<img src="assets/photos/note-${index + 1}.jpg" alt="A special memory" loading="lazy" onerror="this.parentElement.style.display='none'">`;
    } else if (VIDEO_NOTES.includes(index + 1)) {
      els.noteMedia.innerHTML = `<video controls preload="none" onerror="this.parentElement.style.display='none'><source src="assets/videos/note-${index + 1}.mp4" type="video/mp4">Your browser does not support video.</video>`;
    }

    // Animation
    if (animate) {
      els.noteCard.classList.add('animating-in');
      els.noteCard.addEventListener('animationend', () => {
        els.noteCard.classList.remove('animating-in');
      }, { once: true });
    }

    // Update nav buttons
    els.prevBtn.style.opacity = index === 0 ? '0.3' : '1';
    els.nextBtn.style.opacity = index === TOTAL_NOTES - 1 ? '0.3' : '1';

    showView('note');

    // Check milestones
    checkMilestone(state.discoveredNotes.size);
  }

  function checkMilestone(count) {
    const milestones = {
      10: '🎉 10 notes discovered!',
      25: '🥳 25 reasons and counting!',
      50: '✨ Halfway there! 50 notes!',
      75: '💫 75 notes! You\'re amazing!',
      100: '🥺💛 You found them all... every single reason 🩵'
    };

    if (milestones[count]) {
      setTimeout(() => spawnCelebration(), 300);
    }
  }

  // ─── Shuffle ───
  function shuffleNote() {
    let newIndex;
    let attempts = 0;
    do {
      newIndex = Math.floor(Math.random() * TOTAL_NOTES);
      attempts++;
    } while (state.discoveredNotes.has(newIndex) && attempts < 20 && state.discoveredNotes.size < TOTAL_NOTES);

    // Animate card shuffle
    if (state.view === 'note') {
      const rotation = getRotation(getNoteColor(newIndex));
      els.noteCard.style.setProperty('--rotation', rotation);
      els.noteCard.classList.add('animating-shuffle');

      spawnSparkles();

      els.noteCard.addEventListener('animationend', () => {
        els.noteCard.classList.remove('animating-shuffle');
        showNote(newIndex, false);
      }, { once: true });

      setTimeout(() => {
        if (els.noteCard.classList.contains('animating-shuffle')) {
          els.noteCard.classList.remove('animating-shuffle');
          showNote(newIndex, false);
        }
      }, 700);
    } else {
      showNote(newIndex, true);
      spawnSparkles();
    }
  }

  // ─── Sparkle Effects ───
  function spawnSparkles() {
    const emojis = ['💛', '🩵', '✨', '💫', '⭐', '🌟'];
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        sparkle.style.left = `${Math.random() * 80 + 10}%`;
        sparkle.style.top = `${Math.random() * 60 + 20}%`;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
      }, i * 50);
    }
  }

  function spawnCelebration() {
    const emojis = ['💛', '🩵', '✨', '💖', '🎉', '🌸', '🦋', '⭐'];
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const heart = document.createElement('span');
        heart.className = 'celebration-heart';
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = '-20px';
        heart.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
      }, i * 80);
    }
  }

  // ─── Browse Grid ───
  function buildBrowseGrid() {
    els.browseGrid.innerHTML = '';

    for (let i = 0; i < TOTAL_NOTES; i++) {
      const item = document.createElement('div');
      const colorClass = getNoteColor(i);
      item.className = `browse-item ${colorClass}`;
      item.dataset.index = i;

      if (state.discoveredNotes.has(i)) {
        item.classList.add('discovered');
      } else {
        item.classList.add('undiscovered');
      }

      let mediaIndicator = '';
      if (PHOTO_NOTES.includes(i + 1)) {
        mediaIndicator = '<span class="item-media-indicator">📷</span>';
      } else if (VIDEO_NOTES.includes(i + 1)) {
        mediaIndicator = '<span class="item-media-indicator">🎬</span>';
      }

      item.innerHTML = `
        ${mediaIndicator}
        <span class="item-number">${String(i + 1).padStart(2, '0')}</span>
        <span class="item-preview">${state.discoveredNotes.has(i) ? notes[i] : '???'}</span>
      `;

      item.addEventListener('click', () => {
        showNote(i, true);
      });

      els.browseGrid.appendChild(item);
    }
  }

  // ─── Data View ───
  function buildDataView() {
    const discovered = state.discoveredNotes.size;
    const remaining = TOTAL_NOTES - discovered;
    const pct = Math.round((discovered / TOTAL_NOTES) * 100);
    const streak = calculateStreak();
    const totalTime = updateTimeSpent();

    // Update stat cards
    els.dataDiscovered.textContent = discovered;
    els.dataRemaining.textContent = remaining;
    els.dataVisits.textContent = state.visitCount;
    els.dataStreak.textContent = streak;

    // Update progress bar
    els.dataProgressText.textContent = `${pct}%`;
    setTimeout(() => {
      els.dataProgressFill.style.width = `${pct}%`;
    }, 100);

    // Build discovery grid
    els.dataGrid.innerHTML = '';
    for (let i = 0; i < TOTAL_NOTES; i++) {
      const dot = document.createElement('div');
      dot.className = `data-grid-dot ${state.discoveredNotes.has(i) ? 'discovered' : 'undiscovered'}`;
      dot.title = state.discoveredNotes.has(i) ? `#${i + 1}: ${notes[i]}` : `#${i + 1}: ???`;
      dot.addEventListener('click', () => {
        if (state.discoveredNotes.has(i)) {
          // Switch to notes mode and show this note
          state.currentMode = state.currentMode === 'yellow' ? 'blue' : state.currentMode;
          document.body.classList.remove('mode-yellow');
          document.body.classList.add(`mode-${state.currentMode}`);
          els.modeDots.forEach(d => d.classList.toggle('active', d.dataset.mode === state.currentMode));
          showNote(i, true);
        }
      });
      els.dataGrid.appendChild(dot);
    }

    // Recent discoveries (last 5)
    const recent = state.recentDiscoveries.slice(-5).reverse();
    if (recent.length > 0) {
      els.dataRecentSection.style.display = 'block';
      els.dataRecentList.innerHTML = '';
      recent.forEach(item => {
        const el = document.createElement('div');
        el.className = 'data-recent-item';
        el.innerHTML = `
          <span class="data-recent-num">#${item.index + 1}</span>
          <span class="data-recent-text">${notes[item.index]}</span>
        `;
        el.addEventListener('click', () => {
          state.currentMode = state.currentMode === 'yellow' ? 'blue' : state.currentMode;
          document.body.classList.remove('mode-yellow');
          document.body.classList.add(`mode-${state.currentMode}`);
          els.modeDots.forEach(d => d.classList.toggle('active', d.dataset.mode === state.currentMode));
          showNote(item.index, true);
        });
        els.dataRecentList.appendChild(el);
      });
    } else {
      els.dataRecentSection.style.display = 'none';
    }

    // Fun stats
    const funFacts = [];
    
    // Time spent
    funFacts.push({
      emoji: '⏰',
      text: `You've spent <strong>${formatTime(totalTime)}</strong> reading love notes`
    });

    // Most visited hour
    const peakHour = getMostVisitedHour();
    if (peakHour) {
      funFacts.push({
        emoji: '🌙',
        text: `You usually visit around <strong>${peakHour}</strong>`
      });
    }

    // Days visited
    funFacts.push({
      emoji: '📅',
      text: `You've visited on <strong>${state.visitDates.length}</strong> different days`
    });

    // First visit
    if (state.visitDates.length > 0) {
      const first = state.visitDates[0];
      const d = new Date(first);
      const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      funFacts.push({
        emoji: '🌟',
        text: `Your first visit was on <strong>${formatted}</strong>`
      });
    }

    // Completion percentage fact
    if (pct === 100) {
      funFacts.push({
        emoji: '🏆',
        text: `You've found every single reason — <strong>100%</strong> complete!`
      });
    } else if (pct >= 75) {
      funFacts.push({
        emoji: '🔥',
        text: `You're in the final stretch! <strong>${remaining}</strong> notes to go`
      });
    } else if (pct >= 50) {
      funFacts.push({
        emoji: '💫',
        text: `Halfway there! You're in the <strong>top 50%</strong>`
      });
    }

    // Notes with media
    const mediaNotes = PHOTO_NOTES.length + VIDEO_NOTES.length;
    const discoveredMedia = [...PHOTO_NOTES, ...VIDEO_NOTES].filter(n => state.discoveredNotes.has(n - 1)).length;
    if (discoveredMedia > 0) {
      funFacts.push({
        emoji: '📷',
        text: `You've unlocked <strong>${discoveredMedia}/${mediaNotes}</strong> special media notes`
      });
    }

    els.dataFunList.innerHTML = '';
    funFacts.forEach(fact => {
      const el = document.createElement('div');
      el.className = 'data-fun-item';
      el.innerHTML = `
        <span class="data-fun-emoji">${fact.emoji}</span>
        <span class="data-fun-text">${fact.text}</span>
      `;
      els.dataFunList.appendChild(el);
    });
  }

  // ─── Progress ───
  function updateProgress() {
    els.notesRead.textContent = state.discoveredNotes.size;

    // Update browse grid if visible
    const items = els.browseGrid.querySelectorAll('.browse-item');
    items.forEach((item, i) => {
      if (state.discoveredNotes.has(i)) {
        item.classList.add('discovered');
        item.classList.remove('undiscovered');
        const preview = item.querySelector('.item-preview');
        if (preview) preview.textContent = notes[i];
      }
    });
  }

  // ─── Sequential Navigation ───
  function prevNote() {
    if (state.currentNote > 0) {
      showNote(state.currentNote - 1, true);
    }
  }

  function nextNote() {
    if (state.currentNote < TOTAL_NOTES - 1) {
      showNote(state.currentNote + 1, true);
    }
  }

  // ─── Easter Eggs ───
  function initEasterEggs() {
    // Hidden peanut on lock screen — triple click reveals message
    let peanutClicks = 0;
    let peanutTimer = null;

    els.eeLockPeanut.addEventListener('click', () => {
      peanutClicks++;
      clearTimeout(peanutTimer);
      peanutTimer = setTimeout(() => { peanutClicks = 0; }, 1000);

      if (peanutClicks >= 5) {
        peanutClicks = 0;
        const toast = document.createElement('div');
        toast.style.cssText = `
          position: fixed;
          bottom: 80px;
          right: 20px;
          background: linear-gradient(135deg, #1a0a3e, #2d4af1);
          color: white;
          padding: 12px 20px;
          border-radius: 16px;
          font-size: 0.85rem;
          font-family: 'Caveat', cursive;
          font-size: 1.1rem;
          box-shadow: 0 8px 30px rgba(26, 10, 62, 0.3);
          z-index: 1000;
          animation: cardIn 0.5s ease-out forwards;
          max-width: 220px;
          text-align: center;
          line-height: 1.3;
        `;
        toast.textContent = '🥜 you found me! the peanut behind it all 💛';
        document.body.appendChild(toast);
        setTimeout(() => {
          toast.style.transition = 'opacity 0.5s ease';
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 500);
        }, 4000);
      }
    });

    // Hidden butter in app — hold for 2 seconds
    let butterHoldTimer = null;

    els.eeAppButter.addEventListener('mousedown', startButterHold);
    els.eeAppButter.addEventListener('touchstart', startButterHold);
    els.eeAppButter.addEventListener('mouseup', cancelButterHold);
    els.eeAppButter.addEventListener('mouseleave', cancelButterHold);
    els.eeAppButter.addEventListener('touchend', cancelButterHold);

    function startButterHold(e) {
      e.preventDefault();
      butterHoldTimer = setTimeout(() => {
        const toast = document.createElement('div');
        toast.style.cssText = `
          position: fixed;
          bottom: 40px;
          left: 20px;
          background: linear-gradient(135deg, #ffd54f, #ffb300);
          color: #2d2150;
          padding: 12px 20px;
          border-radius: 16px;
          font-size: 0.85rem;
          font-family: 'Caveat', cursive;
          font-size: 1.1rem;
          box-shadow: 0 8px 30px rgba(255, 179, 0, 0.3);
          z-index: 1000;
          animation: cardIn 0.5s ease-out forwards;
          max-width: 240px;
          text-align: center;
          line-height: 1.3;
        `;
        toast.textContent = '🧈 smooth like butter — that\'s how love feels with you';
        document.body.appendChild(toast);
        setTimeout(() => {
          toast.style.transition = 'opacity 0.5s ease';
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 500);
        }, 4000);
      }, 2000);
    }

    function cancelButterHold() {
      clearTimeout(butterHoldTimer);
    }

    // Konami-style Easter egg: type "peanut" anywhere
    let konamiBuffer = '';
    document.addEventListener('keydown', (e) => {
      konamiBuffer += e.key.toLowerCase();
      if (konamiBuffer.length > 10) konamiBuffer = konamiBuffer.slice(-10);

      if (konamiBuffer.includes('peanut')) {
        konamiBuffer = '';
        for (let i = 0; i < 15; i++) {
          setTimeout(() => {
            const nut = document.createElement('span');
            nut.className = 'celebration-heart';
            nut.textContent = '🥜';
            nut.style.left = `${Math.random() * 100}%`;
            nut.style.top = '-30px';
            nut.style.fontSize = `${0.8 + Math.random() * 0.8}rem`;
            nut.style.animationDuration = `${2 + Math.random() * 2}s`;
            document.body.appendChild(nut);
            setTimeout(() => nut.remove(), 4000);
          }, i * 100);
        }
      }

      if (konamiBuffer.includes('butter')) {
        konamiBuffer = '';
        for (let i = 0; i < 12; i++) {
          setTimeout(() => {
            const b = document.createElement('span');
            b.className = 'celebration-heart';
            b.textContent = '🧈';
            b.style.left = `${Math.random() * 100}%`;
            b.style.top = '-30px';
            b.style.fontSize = `${0.8 + Math.random() * 0.8}rem`;
            b.style.animationDuration = `${2 + Math.random() * 2}s`;
            document.body.appendChild(b);
            setTimeout(() => b.remove(), 4000);
          }, i * 120);
        }
      }
    });
  }

  // ─── Swipe Support ───
  let touchStartX = 0;
  let touchStartY = 0;

  function initSwipe() {
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (state.view !== 'note') return;

      const deltaX = e.changedTouches[0].screenX - touchStartX;
      const deltaY = e.changedTouches[0].screenY - touchStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 60) {
        if (deltaX > 0) prevNote();
        else nextNote();
      }
    }, { passive: true });
  }

  // ─── Event Listeners ───
  function initEvents() {
    // Mode selection cards
    els.modeCards.forEach(card => {
      card.addEventListener('click', () => {
        selectMode(card.dataset.mode);
      });
    });

    // Mode switcher dots in header
    els.modeDots.forEach(dot => {
      dot.addEventListener('click', () => {
        switchMode(dot.dataset.mode);
      });
    });

    // App buttons
    els.shuffleBtn.addEventListener('click', shuffleNote);
    els.browseBtn.addEventListener('click', () => showView('browse'));
    els.shuffleAgain.addEventListener('click', shuffleNote);
    els.noteBack.addEventListener('click', () => showView('home'));
    els.browseBack.addEventListener('click', () => showView('home'));
    els.prevBtn.addEventListener('click', prevNote);
    els.nextBtn.addEventListener('click', nextNote);

    // Data view back button
    els.dataBackBtn.addEventListener('click', () => {
      // Switch to blue mode and go home
      switchMode('blue');
    });

    // Keyboard nav
    document.addEventListener('keydown', (e) => {
      if (state.view !== 'note') return;
      if (e.key === 'ArrowLeft') prevNote();
      if (e.key === 'ArrowRight') nextNote();
      if (e.key === 'Escape') showView('home');
    });

    // Save time spent periodically
    setInterval(() => {
      saveState();
    }, 30000); // Every 30 seconds

    // Save on page unload
    window.addEventListener('beforeunload', () => {
      saveState();
    });
  }

  // ─── Init ───
  function init() {
    loadState();
    initLock();
    initEvents();
    initEasterEggs();
    initSwipe();
    
    // Apply saved mode class to body immediately
    if (state.currentMode) {
      document.body.classList.remove('mode-blue', 'mode-red', 'mode-yellow');
      document.body.classList.add(`mode-${state.currentMode}`);
    }
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
