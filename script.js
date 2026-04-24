/* ============================================
   100 Days of You — Script
   
   Features:
   - Password gate → mode selection → app
   - Four modes: Blue (romantic), Red (passionate), Yellow (data), Pink (picture mind)
   - ONE unified set of 100 notes, each tagged with a mode
   - Modes filter which notes are shown
   - Per-mode discovery tracking
   - Visit tracking, time tracking, streak calculation
   - Shuffle, browse, swipe, milestones, easter eggs
   ============================================ */

(() => {
  'use strict';

  // ─── Configuration ───
  const PASSWORD = 'nootnoot';
  const TOTAL_NOTES = 100;
  // Pink mode media mapping: global note 60→media1, 61→media2, ... 79→media20
  // media_number = globalNoteNumber - 59
  const PINK_MEDIA_MAP = {};
  for (let i = 60; i <= 79; i++) {
    PINK_MEDIA_MAP[i] = i - 59; // note 60 → media-1, note 61 → media-2, etc.
  }
  const PINK_PHOTO_MEDIA = [1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20]; // media numbers that are photos
  const PINK_VIDEO_MEDIA = [2, 3, 16, 17]; // media numbers that are videos
  const PHOTO_NOTES = Object.keys(PINK_MEDIA_MAP).map(Number).filter(n => PINK_PHOTO_MEDIA.includes(PINK_MEDIA_MAP[n]));
  const VIDEO_NOTES = Object.keys(PINK_MEDIA_MAP).map(Number).filter(n => PINK_VIDEO_MEDIA.includes(PINK_MEDIA_MAP[n]));

  const NOTE_COLORS = [
    'color-yellow', 'color-blue', 'color-purple', 'color-pink',
    'color-lavender', 'color-mint', 'color-peach'
  ];

  // ─── Mode hero config ───
  const modeConfig = {
    blue: {
      title1: 'romantic reasons',
      title2: 'why i love you',
      subtitle: "if you think the romance is fading 🩵",
      jarLabel: 'romance',
      browseTitle: 'romantic notes 🩵',
    },
    red: {
      title1: 'passionate reasons',
      title2: 'why i desire you',
      subtitle: "when you want to feel hot ❤️",
      jarLabel: 'desire',
      browseTitle: 'passionate notes ❤️',
    },
    yellow: {
      title1: 'data & facts',
      title2: 'why we just work',
      subtitle: "if you want to see the data 💛",
      jarLabel: 'data',
      browseTitle: 'data points 💛',
    },
    pink: {
      title1: "how my picture mind",
      title2: 'sees you/us',
      subtitle: 'snapshots, memories, and visions ❤️',
      jarLabel: 'pictures',
      browseTitle: 'picture mind notes ❤️',
    },
  };

  // ─── 100 Unified Notes — each tagged with a mode ───
  // Format: { text: "note text", mode: "blue"|"red"|"yellow"|"pink" }
  const allNotes = [
    // ── BLUE (romantic) — Notes 1-32: Justin's real notes ──
    { text: "You are delulu in exactly the best way 🩵", mode: "blue" },
    { text: "It's always been you 🙂‍↕️", mode: "blue" },
    { text: "From my setter to the love of my life, kismet is an understatement to our origin story 💕", mode: "blue" },
    { text: "There are so many moments when we make our own language, speak to each other telepathically, and are on the same wavelength *flat earth hand*", mode: "blue" },
    { text: "Your intelligence, morals, and everything to do with your way of thinking. I love figuring out the best way to handle certain things and we usually come to the same conclusions", mode: "blue" },
    { text: "~the fog~ 😱🤗 seriously this is a feeling people need drugs to experience. I get it by just looking in your eyes for a bit ☺️", mode: "blue" },
    { text: "Your drive is so attractive. We have been a bit too obsessed with each other these days, but building a life together with you and squeezing the shit out of life is a life worth living", mode: "blue" },
    { text: "I love that you feel safe enough to be your true baby self around me. Your aegyo is the only kind I love you cutie patootie", mode: "blue" },
    { text: "You are the perfect balance of kind and considerate to others while also being confident in yourself and staying true to what you believe in regardless of what others may think. You are a rare breed and one of a kind, sort of like a celebi !", mode: "blue" },
    { text: "Your nerdy side is actually more of a science/pursuit of knowledge side. You inspire me to have more passion in these sort of endeavors and I not only feel safe to dig too deep into topics, but encouraged 🤓", mode: "blue" },
    { text: "You aren't just down for everything, you are also good at the things we do together and get things so quickly! Snowboarding, lifting, video games, whatever I throw at you, you're a superstar ⭐️", mode: "blue" },
    { text: "I know I say you don't need to worry about this, but I do like that you want to maintain this feminine side to you of not smelling your poop and doing your make up so well. No expectation of course because you're beautiful to me all the time, but it tickles my masculinity :)", mode: "blue" },
    { text: "You are smart, decisive, and thorough when you are called to be. I trust and respect you 🤠", mode: "blue" },
    { text: "I love that you can sing hehe. I've never been to karaoke with just one person before and our circle date was the most fun I've had singing songs 🥹", mode: "blue" },
    { text: "You like to eat (yes even when it's snacks 😂) I love feeding you and you're so easy to eat with! Thanks for dealing with my particularity around meal timing 😬", mode: "blue" },
    { text: "That you are sporty and also driven in the sports you play. Wer going to kill it at 2v2 💪", mode: "blue" },
    { text: "You have such a cheery bright nature that really only gets shown to close friends and it really shines around me. I love and respect that. I'm so grateful that I get to experience your light honey ☀️", mode: "blue" },
    { text: "You are strong from past experiences and have only grown from harder parts of your life, rather than letting it change you in a negative way", mode: "blue" },
    { text: "I'm a lawyer and I don't deal with absolutes, but I can tell you I'll never ditch you 😌", mode: "blue" },
    { text: "I've been through hell and back in my love life, but I'd go through it all again if it means I get to meet you 🩵💛", mode: "blue" },
    { text: "Oxytocin, dopamine, serotonin, love you are everything to me :)", mode: "blue" },
    { text: "You are also someone who doesn't both trust and respect just any type of partner. This was apparent in our competitive friendship, but it's led to such a fulfilling romance and relationship :)", mode: "blue" },
    { text: "Forever feels too short when it's spent with you 😭 it's really a blessing that we have run into each other in this timeline 💛", mode: "blue" },
    { text: "We think similarly but you always have a way of asking questions that still make us think and discuss. This leads to hours of deep convos just sitting on our couch 🤗", mode: "blue" },
    { text: "Your chaotic side 🤪 I embrace this about you and I look forward to those moments when you (rightfully) choose violence", mode: "blue" },
    { text: "When you do something, you do it right and well. No half-assing", mode: "blue" },
    { text: "The way you are demure and classy while also down for almost anything :) another very unique combo 🩵", mode: "blue" },
    { text: "I don't have to choose between looks, kindness, intelligence, drive, and humor because you are THE COMPLETE PACKAGE 🎁 NEVER SETTLE", mode: "blue" },
    { text: "The way you look at me when you turn around and catch me checking you out", mode: "blue" },
    { text: "The way you say 'I love you' likes its a fact rather than saying it for me to say it back 😭", mode: "blue" },
    { text: "I love the contrast you have with your friends and when you're alone with me. I love it even more that the cute side is starting to break through the cracks in front of them LOL", mode: "blue" },
    { text: "How you want to inspect everything about me haha, I am just as obsessed with you too bb", mode: "blue" },

    // ── RED (passionate) — Notes 33-59: Justin's real notes ──
    { text: "Your fatty 😍", mode: "red" },
    { text: "Your screams 😏", mode: "red" },
    { text: "Them proportions DAMN", mode: "red" },
    { text: "Your equal parts cute and beautiful eyes :) (and how they roll back)", mode: "red" },
    { text: "The way you stick out your tongue", mode: "red" },
    { text: "How 💦 it gets down there", mode: "red" },
    { text: "Your small lips…", mode: "red" },
    { text: "Your desire to be my sub (your dom will take care of you)", mode: "red" },
    { text: "The way you call me daddy", mode: "red" },
    { text: "You're just a little too small for me…just a little ;)", mode: "red" },
    { text: "How I can grab your slim waist for maximum thrust", mode: "red" },
    { text: "You're my sweet sweet virgin ;)", mode: "red" },
    { text: "You passed my lessons with flying colors", mode: "red" },
    { text: "How you throw your butt in front of me when you're feeling some type of way", mode: "red" },
    { text: "How sensitive your nipples are and how you react when I just graze them", mode: "red" },
    { text: "You have small face big eyes, slender waist long legs….god tier combo", mode: "red" },
    { text: "Collar bone hehe", mode: "red" },
    { text: "How you like when I kiss your ear", mode: "red" },
    { text: "The dirty talk is CRAZY 🤪", mode: "red" },
    { text: "How you come to tears sometimes but just need some reassurance that you're loved", mode: "red" },
    { text: "How you made me like you being on top", mode: "red" },
    { text: "Selfish of me to say this but I love that I'm here for your sexual awakening of sorts. Daddy will help you make the most of it 😉", mode: "red" },
    { text: "How you taste…", mode: "red" },
    { text: "When you come I can die happy", mode: "red" },
    { text: "How you're a good girl and try to take it even when it's overwhelming", mode: "red" },
    { text: "Just thinking about putting my hands all over you can get me going", mode: "red" },
    { text: "How your ass is already getting bigger from working out a couple weeks…HUH 😍", mode: "red" },
    // ── PINK (picture mind) — Notes 59-78: Justin's photo/video notes ──
    { text: "You send things like this when I miss you", mode: "pink" },
    { text: "You will always be my setter! (We'll get the crazy quick eventually)", mode: "pink" },
    { text: "You love solving things together with me :)", mode: "pink" },
    { text: "You roll with the punches even when sick on your bday", mode: "pink" },
    { text: "Kismet and delulu for the best first date of all time", mode: "pink" },
    { text: "We are so lucky to have each other and together: look at this view on our first date!", mode: "pink" },
    { text: "I love that this is our idea of a great date 🍄", mode: "pink" },
    { text: "riding the subway with you is such an nyc cliche, but I hope we gross people out. They are just jealous", mode: "pink" },
    { text: "This was only 100 ish days ago, but it feels like I have known you forever already", mode: "pink" },
    { text: "I lowkey really like that you were shown off to my friends while I was passed out haha. This is the last time we do long distance though", mode: "pink" },
    { text: "Are we degenerates???", mode: "pink" },
    { text: "I love this simple date is all we really want tooooo", mode: "pink" },
    { text: "I love that you are a donut girly", mode: "pink" },
    { text: "Look at you so prettyyyy. This is phone wallpaper material right here LOL is that ok", mode: "pink" },
    { text: "I love that when we see stories about love, it just reminds us of us LOL honestly we are probably better", mode: "pink" },
    { text: "YOU ARE A SNOWBOARDER", mode: "pink" },
    { text: "Sneak peek to how much fun we will have when we go on trips together <3", mode: "pink" },
    { text: "Ok in n out > shake shack. I love you", mode: "pink" },
    { text: "I like that our drunk personalities are also compatible LOL I love when you get all silly", mode: "pink" },
    { text: "Can you believe this is us in a disagreement haha. I love how we handle conflict even in public circumstances. This ironically turned into a core memory for us <3", mode: "pink" },

    // ── YELLOW (data/facts) — Notes 74-94: Justin's real notes ──
    { text: "Our MBTIs are literally ideal matches and it's the only personality test we give any credence to.", mode: "yellow" },
    { text: "We can talk about anything ranging from poker strategy to 'I think therefore I am' (shoutout to my guy Descartes)", mode: "yellow" },
    { text: "We had an inexplicable attraction even when we tried to deny it/avoid it.", mode: "yellow" },
    { text: "A lot of fights between couples happen when they move in together but we are so chill this won't happen.", mode: "yellow" },
    { text: "Only 9% of relationships (according to some study lol) start from joining a hobby, clubs or sports league. We are definitely better than 100% of this lucky 9%.", mode: "yellow" },
    { text: "We have had conflicts, but were able to deal with them within that day or even within the hour. Small deal, small talk works like a charm with us.", mode: "yellow" },
    { text: "I thought I felt enough to (barely) get married, with us though it makes me think 'what was I thinking?! THIS is it!'", mode: "yellow" },
    { text: "We can play co op video games without being at each other's necks", mode: "yellow" },
    { text: "We view money VERY similarly. This is a huge factor in the success of marriages.", mode: "yellow" },
    { text: "My mom likes you :)", mode: "yellow" },
    { text: "Your mom likes/will like me :)", mode: "yellow" },
    { text: "Eldest children tend to be the more reliable partners. We are also similarly 'not family oriented'", mode: "yellow" },
    { text: "Our need to bite each other, pick each other up off the ground, and exhibit aggressive behaviors is actually something called 'cute aggression'. It's a way for humans to be able to cope with intense emotional feelings so we aren't paralyzed.", mode: "yellow" },
    { text: "Couples who met through a mutual friend report the highest satisfaction with their relationships", mode: "yellow" },
    { text: "Couple who celebrate their anniversaries are more likely to stay together (and I guess we can add this 100 day celebration too ;))", mode: "yellow" },
    { text: "People in love apparently have higher levels of nerve growth factor. Tracks for us since we had some strange psychological things that just don't seem to be present with each other. (My back issues, your quasi-anxiety). To me the craziest difference was how quickly my back flare up went away when I was with you :)", mode: "yellow" },
    { text: "Only 18% of people believe they have found true love. WE ARE SO LUCKY. It just makes sense to believe in what we have", mode: "yellow" },
    { text: "Love solves the 3 Body Problem of the mind, the heart, and the body being required to act in harmony. We have a connection through all 3 (Source: Justin)", mode: "yellow" },
    { text: "We have an epic friendship, a feeling of home, and a determination to be good at marriage (and our relationship) source: Tim Urban", mode: "yellow" },
    { text: "I always look forward to our 'Forgettable Wednesdays' and 'day four of vacation #56' together.", mode: "yellow" },
    { text: "It is a huge positive sign to me that I am so comfortable with you right from the get go and acting cute/weird. This is a big data point. It literally took me a year or so to get anywhere close to this before :o", mode: "yellow" },
  ];

  // ─── State ───
  const state = {
    currentNoteIndex: -1, // index within the mode's filtered notes
    discoveredNotes: {
      blue: new Set(),
      red: new Set(),
      yellow: new Set(),
      pink: new Set(),
    },
    recentDiscoveries: [], // [{globalIndex, timestamp, mode}]
    shuffleHistory: [],
    view: 'home', // 'home', 'note', 'browse', 'data'
    currentMode: 'blue', // 'blue', 'red', 'yellow', 'pink'
    hasSelectedModeBefore: false,
    // Tracking data
    sessionStart: Date.now(),
    visitCount: 0,
    visitDates: [], // ['YYYY-MM-DD', ...]
    timeSpent: 0, // total seconds
    lastSessionStart: null,
  };

  // ─── Mode helpers ───
  function getFilteredIndices(mode) {
    const indices = [];
    for (let i = 0; i < allNotes.length; i++) {
      if (allNotes[i].mode === mode) indices.push(i);
    }
    return indices;
  }

  function getFilteredNotes(mode) {
    return getFilteredIndices(mode).map(i => allNotes[i]);
  }

  function getModeNoteCount(mode) {
    return getFilteredIndices(mode).length;
  }

  function getCurrentFilteredIndices() {
    return getFilteredIndices(state.currentMode);
  }

  function getCurrentDiscoveries() {
    return state.discoveredNotes[state.currentMode] || state.discoveredNotes.blue;
  }

  // ─── DOM Elements ───
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const els = {
    lockScreen: $('#lock-screen'),
    app: $('#app'),
    passwordInput: $('#password-input'),
    unlockBtn: $('#unlock-btn'),
    lockError: $('#lock-error'),
    homeView: $('#home-view'),
    modeHomeView: $('#mode-home-view'),
    noteView: $('#note-view'),
    browseView: $('#browse-view'),
    noteCard: $('#note-card'),
    noteNumber: $('#note-number'),
    noteText: $('#note-text'),
    noteMedia: $('#note-media'),
    navCounter: $('#nav-counter'),
    browseGrid: $('#browse-grid'),
    browseTitle: $('.browse-title'),
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
    // Home / landing elements
    homeBtn: $('#home-btn'),
    globalShuffleBtn: $('#global-shuffle-btn'),
    globalProgress: $('#global-progress'),
    homeCards: $$('.home-card'),
    homeCardDiscovered: $$('.home-card-discovered'),
    // Mode hero elements
    heroLine1: $('#mode-hero-line1'),
    heroLine2: $('#mode-hero-line2'),
    heroSubtitle: $('#mode-hero-subtitle'),
    modeHeroProgress: $('#mode-hero-progress'),
    // Data view removed — fun stats are now part of home landing
  };

  // ─── localStorage helpers ───
  function loadState() {
    try {
      const saved = localStorage.getItem('100days-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.discoveredNotes) {
          for (const mode of ['blue', 'red', 'yellow', 'pink']) {
            state.discoveredNotes[mode] = new Set(parsed.discoveredNotes[mode] || []);
          }
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
      const discNotes = {};
      for (const mode of ['blue', 'red', 'yellow', 'pink']) {
        discNotes[mode] = [...state.discoveredNotes[mode]];
      }
      localStorage.setItem('100days-state', JSON.stringify({
        discoveredNotes: discNotes,
        recentDiscoveries: state.recentDiscoveries.slice(-20),
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
    
    if (!state.visitDates.includes(today)) {
      state.visitDates.push(today);
    }
    
    if (state.lastSessionStart) {
      const elapsed = Math.floor((Date.now() - state.lastSessionStart) / 1000);
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
    }
    
    return streak;
  }

  function getMostVisitedHour() {
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
      
      // Always go to the app's home/landing view (category cards)
      els.app.classList.add('active');
      if (state.hasSelectedModeBefore && state.currentMode) {
        applyMode(state.currentMode, false);
      } else {
        showView('home');
        updateGlobalProgress();
      }
      updateGlobalProgress();
      setTimeout(() => els.transition.classList.remove('active'), 100);
    }, 400);
  }

  // ─── Mode Management ───
  function selectMode(mode) {
    state.currentMode = mode;
    state.hasSelectedModeBefore = true;
    state.currentNoteIndex = -1;
    saveState();

    applyMode(mode, true);
  }

  function applyMode(mode) {
    document.body.classList.remove('mode-blue', 'mode-red', 'mode-yellow', 'mode-pink');
    document.body.classList.add(`mode-${mode}`);

    updateHeroText(mode);
    showView('modeHome');
    updateGlobalProgress();
  }

  function updateHeroText(mode) {
    const config = modeConfig[mode];
    if (!config) return;

    if (els.heroLine1) els.heroLine1.textContent = config.title1;
    if (els.heroLine2) els.heroLine2.textContent = config.title2;
    if (els.heroSubtitle) els.heroSubtitle.textContent = config.subtitle;

    // Update per-mode progress in mode home view
    const count = getModeNoteCount(mode);
    const discovered = getCurrentDiscoveries();
    if (els.modeHeroProgress) {
      els.modeHeroProgress.textContent = `${discovered.size} / ${count} notes discovered`;
    }
  }

  // ─── View Management ───
  function showView(viewName) {
    state.view = viewName;
    
    const views = [els.homeView, els.modeHomeView, els.noteView, els.browseView];
    views.forEach(v => v.classList.remove('active'));

    switch (viewName) {
      case 'home':
        els.homeView.classList.add('active');
        break;
      case 'modeHome':
        els.modeHomeView.classList.add('active');
        break;
      case 'note':
        els.noteView.classList.add('active');
        break;
      case 'browse':
        els.browseView.classList.add('active');
        buildBrowseGrid();
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

  function showNote(filteredIndex, animate = true) {
    const filtered = getCurrentFilteredIndices();
    if (filteredIndex < 0 || filteredIndex >= filtered.length) return;

    state.currentNoteIndex = filteredIndex;
    const globalIndex = filtered[filteredIndex];
    const noteData = allNotes[globalIndex];
    const colorClass = getNoteColor(filteredIndex);
    const rotation = getRotation(colorClass);
    const discoveries = getCurrentDiscoveries();

    // Track discovery (use global index for persistence)
    const isNewDiscovery = !discoveries.has(globalIndex);
    discoveries.add(globalIndex);
    
    if (isNewDiscovery) {
      state.recentDiscoveries.push({
        globalIndex: globalIndex,
        timestamp: Date.now(),
        mode: state.currentMode
      });
      if (state.recentDiscoveries.length > 20) {
        state.recentDiscoveries = state.recentDiscoveries.slice(-20);
      }
    }
    
    saveState();
    updateProgress();

    // Update card
    els.noteCard.className = 'note-card';
    void els.noteCard.offsetWidth;

    els.noteCard.classList.add(colorClass);
    els.noteCard.style.setProperty('--rotation', rotation);

    // Show the global note number (1-100) and the filtered position
    els.noteNumber.textContent = `#${globalIndex + 1}`;
    els.noteText.textContent = noteData.text;
    els.navCounter.textContent = `${filteredIndex + 1} / ${filtered.length}`;

    // Handle media
    els.noteMedia.innerHTML = '';
    const noteNum = globalIndex + 1;
    if (PINK_MEDIA_MAP[noteNum]) {
      const mediaNum = PINK_MEDIA_MAP[noteNum];
      if (PINK_VIDEO_MEDIA.includes(mediaNum)) {
        els.noteMedia.innerHTML = `<video controls preload="none" onerror="this.parentElement.style.display='none'"><source src="assets/videos/media-${mediaNum}.mp4" type="video/mp4">Your browser does not support video.</video>`;
      } else {
        els.noteMedia.innerHTML = `<img src="assets/photos/media-${mediaNum}.jpg" alt="A special memory" loading="lazy" onerror="this.parentElement.style.display='none'">`;
      }
    }

    if (animate) {
      els.noteCard.classList.add('animating-in');
      els.noteCard.addEventListener('animationend', () => {
        els.noteCard.classList.remove('animating-in');
      }, { once: true });
    }

    els.prevBtn.style.opacity = filteredIndex === 0 ? '0.3' : '1';
    els.nextBtn.style.opacity = filteredIndex === filtered.length - 1 ? '0.3' : '1';

    showView('note');

    checkMilestone(discoveries.size);
  }

  function checkMilestone(count) {
    const modeCount = getModeNoteCount(state.currentMode);
    const milestones = {};
    milestones[10] = '🎉 10 notes discovered!';
    milestones[25] = '🥳 25 notes and counting!';
    milestones[50] = '✨ Halfway there!';
    milestones[75] = '💫 75 notes! You\'re amazing!';
    milestones[Math.floor(modeCount * 0.5)] = '✨ Halfway through this collection!';
    milestones[modeCount] = `🥺💛 You found them all in ${modeConfig[state.currentMode].title1}... every single one 🩵`;

    if (milestones[count]) {
      setTimeout(() => spawnCelebration(), 300);
    }
  }

  // ─── Shuffle ───
  function shuffleNote() {
    const filtered = getCurrentFilteredIndices();
    const discoveries = getCurrentDiscoveries();
    let newFilteredIndex;
    let attempts = 0;
    do {
      newFilteredIndex = Math.floor(Math.random() * filtered.length);
      attempts++;
    } while (discoveries.has(filtered[newFilteredIndex]) && attempts < 20 && discoveries.size < filtered.length);

    if (state.view === 'note') {
      const rotation = getRotation(getNoteColor(newFilteredIndex));
      els.noteCard.style.setProperty('--rotation', rotation);
      els.noteCard.classList.add('animating-shuffle');

      spawnSparkles();

      els.noteCard.addEventListener('animationend', () => {
        els.noteCard.classList.remove('animating-shuffle');
        showNote(newFilteredIndex, false);
      }, { once: true });

      setTimeout(() => {
        if (els.noteCard.classList.contains('animating-shuffle')) {
          els.noteCard.classList.remove('animating-shuffle');
          showNote(newFilteredIndex, false);
        }
      }, 700);
    } else {
      showNote(newFilteredIndex, true);
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
    const filtered = getCurrentFilteredIndices();
    const discoveries = getCurrentDiscoveries();
    const config = modeConfig[state.currentMode];

    if (els.browseTitle) {
      els.browseTitle.textContent = config ? config.browseTitle : `all notes 💛`;
    }

    filtered.forEach((globalIndex, i) => {
      const item = document.createElement('div');
      const colorClass = getNoteColor(i);
      item.className = `browse-item ${colorClass}`;
      item.dataset.filteredIndex = i;

      if (discoveries.has(globalIndex)) {
        item.classList.add('discovered');
      } else {
        item.classList.add('undiscovered');
      }

      let mediaIndicator = '';
      if (PHOTO_NOTES.includes(globalIndex + 1)) {
        mediaIndicator = '<span class="item-media-indicator">📷</span>';
      } else if (VIDEO_NOTES.includes(globalIndex + 1)) {
        mediaIndicator = '<span class="item-media-indicator">🎬</span>';
      }

      item.innerHTML = `
        ${mediaIndicator}
        <span class="item-number">${String(globalIndex + 1).padStart(2, '0')}</span>
        <span class="item-preview">${discoveries.has(globalIndex) ? allNotes[globalIndex].text : '???'}</span>
      `;

      item.addEventListener('click', () => {
        showNote(i, true);
      });

      els.browseGrid.appendChild(item);
    });
  }

  // ─── Sequential Navigation ───
  function prevNote() {
    if (state.currentNoteIndex > 0) {
      showNote(state.currentNoteIndex - 1, true);
    }
  }

  function nextNote() {
    const filtered = getCurrentFilteredIndices();
    if (state.currentNoteIndex < filtered.length - 1) {
      showNote(state.currentNoteIndex + 1, true);
    }
  }

  // ─── Easter Eggs ───
  function initEasterEggs() {
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
          background: linear-gradient(135deg, #9B8EC4, #5B9BD5);
          color: white;
          padding: 12px 20px;
          border-radius: 16px;
          font-size: 0.85rem;
          font-family: 'Caveat', cursive;
          font-size: 1.1rem;
          box-shadow: 0 8px 30px rgba(155, 142, 196, 0.2);
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
    // Home card clicks → enter a mode
    els.homeCards.forEach(card => {
      card.addEventListener('click', () => {
        selectMode(card.dataset.mode);
      });
    });

    // Home button → back to categories
    els.homeBtn.addEventListener('click', goHome);

    // Global shuffle from landing
    els.globalShuffleBtn.addEventListener('click', globalShuffle);

    // Per-mode shuffle (used within a mode's home view)
    els.shuffleBtn.addEventListener('click', shuffleNote);
    els.browseBtn.addEventListener('click', () => showView('browse'));
    els.shuffleAgain.addEventListener('click', shuffleNote);

    // Navigation
    els.noteBack.addEventListener('click', () => showView('modeHome'));
    els.browseBack.addEventListener('click', () => showView('modeHome'));
    els.prevBtn.addEventListener('click', prevNote);
    els.nextBtn.addEventListener('click', nextNote);

    document.addEventListener('keydown', (e) => {
      if (state.view === 'note') {
        if (e.key === 'ArrowLeft') prevNote();
        if (e.key === 'ArrowRight') nextNote();
        if (e.key === 'Escape') showView('modeHome');
      }
    });

    setInterval(() => {
      saveState();
    }, 30000);

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
    
    if (state.currentMode) {
      document.body.classList.remove('mode-blue', 'mode-red', 'mode-yellow', 'mode-pink');
      document.body.classList.add(`mode-${state.currentMode}`);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
