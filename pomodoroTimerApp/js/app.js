/* ============================================
   POMODORO FOCUS — Application Controller
   State, Web Audio API Synth, Bento Logic
   ============================================ */

(function () {
  'use strict';

  // --- Translation Dictionary ---
  const translations = {
    en: {
      back_home: "Back to Maravillium",
      mode_focus: "Focus",
      mode_short: "Short Break",
      mode_long: "Long Break",
      status_focusing: "Focusing",
      status_short: "Short Break",
      status_long: "Long Break",
      working_on: "Working on:",
      tasks_header: "Tasks",
      task_placeholder: "What are you focusing on?",
      clear_completed: "Clear Completed",
      ambient_header: "Focus Ambience",
      ambient_noise: "Brownian Focus",
      ambient_rain: "Rain Forest",
      ambient_volume: "Ambient Vol",
      stats_header: "Performance",
      stat_completed: "Sessions",
      stat_focus_time: "Focus Time",
      stat_streak: "Streak",
      stats_history_title: "Focus Log",
      history_empty: "No focus sessions completed yet. Focus to start!",
      settings_header: "Settings",
      settings_duration: "Durations (mins)",
      duration_focus: "Focus",
      duration_short: "Short",
      duration_long: "Long",
      settings_audio: "Alert Preferences",
      settings_sound_type: "End Alarm",
      sound_chime: "Melodic Chime",
      sound_bell: "Tibetan Bell",
      sound_digital: "Digital Alert",
      settings_ticking: "Ticking Audio",
      settings_volume: "Alarm Vol",
      settings_automation: "Automation",
      settings_auto_break: "Auto-start Breaks",
      settings_auto_focus: "Auto-start Focus",
      reset_settings: "Reset Defaults",
      footer_text: "© 2026 Maravillium. Built with obsession.",
      task_empty_alert: "Please enter a task name.",
      focus_completed_alert: "Focus session completed! Time to take a break.",
      break_completed_alert: "Break completed! Back to focus."
    },
    es: {
      back_home: "Volver a Maravillium",
      mode_focus: "Enfoque",
      mode_short: "Recreo Corto",
      mode_long: "Recreo Largo",
      status_focusing: "Enfocado",
      status_short: "Recreo Corto",
      status_long: "Recreo Largo",
      working_on: "Trabajando en:",
      tasks_header: "Tareas",
      task_placeholder: "¿En qué te vas a enfocar?",
      clear_completed: "Limpiar Completadas",
      ambient_header: "Ambiente de Enfoque",
      ambient_noise: "Ruido Marrón",
      ambient_rain: "Bosque Lluvioso",
      ambient_volume: "Vol. Ambiente",
      stats_header: "Rendimiento",
      stat_completed: "Sesiones",
      stat_focus_time: "Tiempo Foco",
      stat_streak: "Racha",
      stats_history_title: "Historial de Enfoque",
      history_empty: "No completaste sesiones de enfoque aún. ¡Enfócate para empezar!",
      settings_header: "Configuración",
      settings_duration: "Duración (min)",
      duration_focus: "Foco",
      duration_short: "Corto",
      duration_long: "Largo",
      settings_audio: "Preferencias de Alerta",
      settings_sound_type: "Alarma Fin",
      sound_chime: "Campana Melódica",
      sound_bell: "Cuenco Tibetano",
      sound_digital: "Alerta Digital",
      settings_ticking: "Sonido de Tic-Tac",
      settings_volume: "Vol. Alarma",
      settings_automation: "Automatización",
      settings_auto_break: "Auto-iniciar Recreo",
      settings_auto_focus: "Auto-iniciar Foco",
      reset_settings: "Valores por Defecto",
      footer_text: "© 2026 Maravillium. Construido con obsesión.",
      task_empty_alert: "Por favor, ingresá un nombre de tarea.",
      focus_completed_alert: "¡Sesión de enfoque completada! Hora de descansar.",
      break_completed_alert: "¡Recreo completado! De vuelta al enfoque."
    }
  };

  // --- Zen Quotes Database ---
  const quotes = {
    en: [
      { text: "Focus is a muscle, and you are building it right now.", author: "Zen Mind" },
      { text: "Simplicity is the ultimate sophistication.", author: "Steve Jobs" },
      { text: "Be here now. Be completely in the present moment.", author: "Ram Dass" },
      { text: "Flow is the state of optimal experience and concentration.", author: "M. Csikszentmihalyi" },
      { text: "One hour of deep focus beats ten hours of distracted work.", author: "Deep Work" },
      { text: "Make each day your masterpiece.", author: "John Wooden" }
    ],
    es: [
      { text: "El enfoque es un músculo, y lo estás fortaleciendo ahora mismo.", author: "Mente Zen" },
      { text: "La simplicidad es la sofisticación definitiva.", author: "Steve Jobs" },
      { text: "Estate aquí ahora. Estate completamente en el presente.", author: "Ram Dass" },
      { text: "El flujo es el estado de experiencia y concentración óptimas.", author: "M. Csikszentmihalyi" },
      { text: "Una hora de enfoque profundo vale por diez de trabajo distraído.", author: "Trabajo Profundo" },
      { text: "Haz de cada día tu obra maestra.", author: "John Wooden" }
    ]
  };

  // --- Default Application Configuration ---
  const DEFAULT_SETTINGS = {
    focusDuration: 25,
    shortDuration: 5,
    longDuration: 15,
    endSound: 'chime',
    tickingEnabled: false,
    alarmVolume: 80,
    ambientVolume: 50,
    autoBreak: false,
    autoFocus: false
  };

  // --- Core Application State Variables ---
  let appState = {
    timeLeft: 25 * 60,
    totalDuration: 25 * 60,
    currentMode: 'focus', // 'focus' | 'short' | 'long'
    isRunning: false,
    timerInterval: null,
    
    // Settings loaded from localStorage or defaults
    settings: { ...DEFAULT_SETTINGS },
    
    // Tasks lists
    tasks: [],
    activeTaskId: null,
    
    // Focus Statistics
    stats: {
      sessionsCompleted: 0,
      focusTimeMinutes: 0,
      streakDays: 0,
      lastCompletedDate: null,
      historyLog: []
    },
    
    // UI/UX Sync
    lang: 'en',
    theme: 'dark'
  };

  // --- Web Audio API Context & Node References ---
  let audioCtx = null;
  let ambientSourceNode = null;
  let ambientGainNode = null;
  let ambientNoiseBuffer = null;
  let ambientRainBuffer = null;
  let activeAmbientType = null; // 'brown' | 'rain' | null

  // --- Initialize Audio Context ---
  function initAudio() {
    if (audioCtx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
    
    ambientGainNode = audioCtx.createGain();
    ambientGainNode.gain.setValueAtTime(appState.settings.ambientVolume / 100, audioCtx.currentTime);
    ambientGainNode.connect(audioCtx.destination);

    // Pre-generate loop noise buffers asynchronously
    generateBrownNoiseBuffer();
    generateRainBuffer();
  }

  // --- Generate Brownian Noise Buffer (Static Loop) ---
  function generateBrownNoiseBuffer() {
    if (!audioCtx) return;
    const sampleRate = audioCtx.sampleRate;
    const bufferSize = 5 * sampleRate; // 5 seconds
    ambientNoiseBuffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
    const output = ambientNoiseBuffer.getChannelData(0);
    
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Gain compensation
    }
  }

  // --- Generate Rain Sound Buffer (Static Loop) ---
  function generateRainBuffer() {
    if (!audioCtx) return;
    const sampleRate = audioCtx.sampleRate;
    const bufferSize = 5 * sampleRate; // 5 seconds
    ambientRainBuffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
    const output = ambientRainBuffer.getChannelData(0);
    
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      // Soft low-passed/pink noise base
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.09 * white)) / 1.09;
      lastOut = output[i];
      
      // Random raindrop impulses
      if (Math.random() < 0.0004) {
        let decay = 0.993;
        let amplitude = Math.random() * 0.15;
        for (let j = 0; i + j < bufferSize && j < 600; j++) {
          output[i + j] += Math.sin(j * 0.12) * amplitude;
          amplitude *= decay;
        }
      }
    }
  }

  // --- Ambient Sounds Controls ---
  function playAmbientSound(type) {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    stopAmbientSound();

    let buffer = null;
    if (type === 'brown') {
      buffer = ambientNoiseBuffer;
    } else if (type === 'rain') {
      buffer = ambientRainBuffer;
    }

    if (!buffer) return;

    ambientSourceNode = audioCtx.createBufferSource();
    ambientSourceNode.buffer = buffer;
    ambientSourceNode.loop = true;
    ambientSourceNode.connect(ambientGainNode);
    ambientSourceNode.start(0);
    activeAmbientType = type;
  }

  function stopAmbientSound() {
    if (ambientSourceNode) {
      try {
        ambientSourceNode.stop();
      } catch (e) {}
      ambientSourceNode.disconnect();
      ambientSourceNode = null;
    }
    activeAmbientType = null;
  }

  // --- Programmatic Synth Alarm Sounds ---
  function triggerAlarmSound() {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const vol = appState.settings.alarmVolume / 100;
    const now = audioCtx.currentTime;

    if (appState.settings.endSound === 'chime') {
      // Melodic ascending chime
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc1.type = 'sine';
      osc2.type = 'triangle';
      
      const notes = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(vol * 0.35, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);
      
      notes.forEach((freq, idx) => {
        osc1.frequency.setValueAtTime(freq, now + idx * 0.15);
        osc2.frequency.setValueAtTime(freq * 1.5, now + idx * 0.15);
      });
      
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.8);
      osc2.stop(now + 1.8);

    } else if (appState.settings.endSound === 'bell') {
      // Tibetan bell resonance (multi-frequency resonant partials)
      const partials = [220, 442, 663, 924, 1188];
      partials.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        
        const gainVal = vol * (idx === 0 ? 0.35 : 0.1);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(gainVal, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0 - (idx * 0.4));
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 3.2);
      });

    } else if (appState.settings.endSound === 'digital') {
      // Digital double alert beep
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, now);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(vol * 0.25, now + 0.01);
      gain.gain.setValueAtTime(vol * 0.25, now + 0.1);
      gain.gain.setValueAtTime(0, now + 0.11);
      
      gain.gain.linearRampToValueAtTime(vol * 0.25, now + 0.17);
      gain.gain.setValueAtTime(vol * 0.25, now + 0.27);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.31);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.35);
    }
  }

  // --- Clock woodblock click ticking ---
  function playTickSound() {
    if (!audioCtx || !appState.settings.tickingEnabled) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, now);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.03 * (appState.settings.alarmVolume / 100), now + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(now);
    osc.stop(now + 0.02);
  }

  // --- State Persistence ---
  function loadPersistedState() {
    // 1. Language & Theme
    appState.lang = localStorage.getItem('maravillium-lang') || 'en';
    appState.theme = localStorage.getItem('maravillium-theme') || 'dark';

    // 2. Settings
    const savedSettings = localStorage.getItem('pomodoro-settings');
    if (savedSettings) {
      try {
        appState.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };
      } catch (e) {
        appState.settings = { ...DEFAULT_SETTINGS };
      }
    }

    // 3. Tasks
    const savedTasks = localStorage.getItem('pomodoro-tasks');
    if (savedTasks) {
      try {
        appState.tasks = JSON.parse(savedTasks);
      } catch (e) {
        appState.tasks = [];
      }
    }
    appState.activeTaskId = localStorage.getItem('pomodoro-active-task-id') || null;

    // 4. Performance Statistics
    const savedStats = localStorage.getItem('pomodoro-stats');
    if (savedStats) {
      try {
        appState.stats = { ...appState.stats, ...JSON.parse(savedStats) };
      } catch (e) {
        // Keeps defaults
      }
    }

    // Adjust timer for loaded durations
    setTimerMode(appState.currentMode);
  }

  function saveSettings() {
    localStorage.setItem('pomodoro-settings', JSON.stringify(appState.settings));
  }

  function saveTasks() {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(appState.tasks));
    if (appState.activeTaskId) {
      localStorage.setItem('pomodoro-active-task-id', appState.activeTaskId);
    } else {
      localStorage.removeItem('pomodoro-active-task-id');
    }
  }

  function saveStats() {
    localStorage.setItem('pomodoro-stats', JSON.stringify(appState.stats));
  }

  // --- i18n & Translations Renderer ---
  function applyLanguage(lang) {
    appState.lang = lang;
    localStorage.setItem('maravillium-lang', lang);
    document.documentElement.lang = lang;

    const dict = translations[lang];

    // standard translations
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // Option values
    const select = document.getElementById('alert-sound-select');
    if (select) {
      select.querySelector('option[value="chime"]').textContent = dict.sound_chime;
      select.querySelector('option[value="bell"]').textContent = dict.sound_bell;
      select.querySelector('option[value="digital"]').textContent = dict.sound_digital;
    }

    // Language button label
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
      langToggleBtn.textContent = lang === 'en' ? 'ES' : 'EN';
    }

    // Update active label
    updateActiveTaskLabel();
    // Update timer status text
    updateTimerStatusText();
    // Render completed stats text
    updateStatsDisplay();
    // Render log list
    renderHistoryList();
    // Render random quote
    displayRandomQuote();
  }

  // --- Theme Renderer ---
  function applyTheme(theme) {
    appState.theme = theme;
    localStorage.setItem('maravillium-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    const darkIcons = document.querySelectorAll('.theme-icon-dark');
    const lightIcons = document.querySelectorAll('.theme-icon-light');
    
    if (theme === 'light') {
      darkIcons.forEach(icon => icon.style.display = 'none');
      lightIcons.forEach(icon => icon.style.display = 'block');
    } else {
      darkIcons.forEach(icon => icon.style.display = 'block');
      lightIcons.forEach(icon => icon.style.display = 'none');
    }
  }

  // --- Timer Operations ---
  function setTimerMode(mode) {
    stopTimer();
    appState.currentMode = mode;
    
    // Set appropriate duration based on settings
    let mins = appState.settings.focusDuration;
    if (mode === 'short') mins = appState.settings.shortDuration;
    if (mode === 'long') mins = appState.settings.longDuration;
    
    appState.timeLeft = mins * 60;
    appState.totalDuration = mins * 60;

    // Update Tabs UI
    document.querySelectorAll('.mode-tab').forEach(tab => {
      if (tab.getAttribute('data-mode') === mode) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    updateTimerDisplay();
    updateTimerStatusText();
  }

  function updateTimerDisplay() {
    const mins = Math.floor(appState.timeLeft / 60);
    const secs = appState.timeLeft % 60;
    const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    // Set clock face
    document.getElementById('time-display').textContent = timeStr;

    // Set page tab title
    const modeKey = appState.currentMode === 'focus' ? 'mode_focus' : (appState.currentMode === 'short' ? 'mode_short' : 'mode_long');
    const modeName = translations[appState.lang][modeKey];
    if (appState.isRunning) {
      document.title = `(${timeStr}) ${modeName} | Pomodoro Focus`;
    } else {
      document.title = `Pomodoro Focus — Maravillium`;
    }

    // Set Circle progress bar dashoffset
    const bar = document.getElementById('progress-bar');
    if (bar) {
      // Circle radius is 140, circumference is ~879.64
      const circumference = 2 * Math.PI * 140;
      const progress = appState.timeLeft / appState.totalDuration;
      const offset = circumference * (1 - progress);
      bar.style.strokeDashoffset = offset;
    }
  }

  function updateTimerStatusText() {
    const label = document.getElementById('timer-status-text');
    if (!label) return;
    
    const key = appState.currentMode === 'focus' ? 'status_focusing' : (appState.currentMode === 'short' ? 'status_short' : 'status_long');
    label.textContent = translations[appState.lang][key];
  }

  function startTimer() {
    if (appState.isRunning) return;
    
    initAudio(); // Initialize audio session
    appState.isRunning = true;
    
    const playBtn = document.getElementById('btn-play');
    if (playBtn) {
      playBtn.querySelector('.icon-play').style.display = 'none';
      playBtn.querySelector('.icon-pause').style.display = 'block';
    }

    appState.timerInterval = setInterval(() => {
      if (appState.timeLeft > 0) {
        appState.timeLeft--;
        updateTimerDisplay();
        
        // play ticking sound if enabled
        if (appState.timeLeft > 0) {
          playTickSound();
        }
      } else {
        // Session Finished!
        handleSessionCompleted();
      }
    }, 1000);

    updateTimerDisplay();
  }

  function stopTimer() {
    if (!appState.isRunning) return;
    appState.isRunning = false;
    
    if (appState.timerInterval) {
      clearInterval(appState.timerInterval);
      appState.timerInterval = null;
    }

    const playBtn = document.getElementById('btn-play');
    if (playBtn) {
      playBtn.querySelector('.icon-play').style.display = 'block';
      playBtn.querySelector('.icon-pause').style.display = 'none';
    }

    updateTimerDisplay();
  }

  function handleSessionCompleted() {
    stopTimer();
    triggerAlarmSound();

    const currentMode = appState.currentMode;

    if (currentMode === 'focus') {
      // Record completed focus session
      const completedMinutes = appState.settings.focusDuration;
      recordFocusSession(completedMinutes);
      
      // Notify
      const alertMsg = translations[appState.lang].focus_completed_alert;
      setTimeout(() => alert(alertMsg), 100);

      // Auto start break or set mode
      if (appState.settings.autoBreak) {
        setTimerMode('short');
        startTimer();
      } else {
        setTimerMode('short');
      }
    } else {
      // Break Finished
      const alertMsg = translations[appState.lang].break_completed_alert;
      setTimeout(() => alert(alertMsg), 100);

      // Auto start focus or set mode
      if (appState.settings.autoFocus) {
        setTimerMode('focus');
        startTimer();
      } else {
        setTimerMode('focus');
      }
    }
  }

  function resetTimer() {
    setTimerMode(appState.currentMode);
  }

  function skipTimer() {
    stopTimer();
    if (appState.currentMode === 'focus') {
      setTimerMode('short');
    } else {
      setTimerMode('focus');
    }
  }

  // --- Statistics & History Logger ---
  function recordFocusSession(minutes) {
    const todayStr = new Date().toDateString();
    
    // Update main stats counters
    appState.stats.sessionsCompleted++;
    appState.stats.focusTimeMinutes += minutes;

    // Calculate streak
    if (appState.stats.lastCompletedDate) {
      const lastDate = new Date(appState.stats.lastCompletedDate);
      const today = new Date(todayStr);
      const diffTime = Math.abs(today - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Successive day streak increment
        appState.stats.streakDays++;
      } else if (diffDays > 1) {
        // Streak broken
        appState.stats.streakDays = 1;
      }
    } else {
      appState.stats.streakDays = 1;
    }
    appState.stats.lastCompletedDate = todayStr;

    // Add session to log
    let activeTaskName = null;
    if (appState.activeTaskId) {
      const task = appState.tasks.find(t => t.id === appState.activeTaskId);
      if (task) activeTaskName = task.name;
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      duration: minutes,
      taskName: activeTaskName,
      mode: 'focus'
    };

    appState.stats.historyLog.unshift(logEntry);
    
    // Cap log history list to latest 20 items to save space
    if (appState.stats.historyLog.length > 20) {
      appState.stats.historyLog.pop();
    }

    saveStats();
    updateStatsDisplay();
    renderHistoryList();
  }

  function updateStatsDisplay() {
    document.getElementById('stat-completed').textContent = appState.stats.sessionsCompleted;
    document.getElementById('stat-time').textContent = `${appState.stats.focusTimeMinutes}m`;
    document.getElementById('stat-streak').textContent = `${appState.stats.streakDays}d`;
  }

  function renderHistoryList() {
    const list = document.getElementById('history-list');
    const emptyMsg = document.getElementById('history-empty');
    if (!list) return;

    // Clear previous dynamic entries
    const items = list.querySelectorAll('.history-item');
    items.forEach(el => el.remove());

    if (appState.stats.historyLog.length === 0) {
      if (emptyMsg) emptyMsg.style.display = 'block';
      return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';

    appState.stats.historyLog.forEach(log => {
      const item = document.createElement('li');
      item.className = 'history-item';
      
      const date = new Date(log.timestamp);
      const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const dict = translations[appState.lang];
      const taskText = log.taskName ? `— ${log.taskName}` : '';
      const modeText = dict.mode_focus;

      item.innerHTML = `
        <div class="history-item-left">
          <span class="history-dot focus"></span>
          <span>${modeText} (${log.duration}m) ${taskText}</span>
        </div>
        <span class="history-item-right">${timeStr}</span>
      `;
      list.appendChild(item);
    });
  }

  // --- Task Manager Operations ---
  function addTask(name) {
    const newTask = {
      id: 'task_' + Date.now(),
      name: name,
      completed: false
    };

    appState.tasks.push(newTask);
    saveTasks();
    renderTaskList();

    // Auto set as active task if it is the first or only active task
    if (!appState.activeTaskId) {
      selectTask(newTask.id);
    }
  }

  function deleteTask(id) {
    appState.tasks = appState.tasks.filter(t => t.id !== id);
    if (appState.activeTaskId === id) {
      appState.activeTaskId = appState.tasks.length > 0 ? appState.tasks[0].id : null;
    }
    saveTasks();
    renderTaskList();
    updateActiveTaskLabel();
  }

  function toggleTaskCompleted(id) {
    appState.tasks = appState.tasks.map(t => {
      if (t.id === id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    saveTasks();
    renderTaskList();
  }

  function selectTask(id) {
    appState.activeTaskId = id;
    saveTasks();
    renderTaskList();
    updateActiveTaskLabel();
  }

  function updateActiveTaskLabel() {
    const container = document.getElementById('active-task-container');
    const label = document.getElementById('active-task-title');
    if (!container || !label) return;

    if (!appState.activeTaskId) {
      container.style.visibility = 'hidden';
      return;
    }

    const task = appState.tasks.find(t => t.id === appState.activeTaskId);
    if (!task) {
      appState.activeTaskId = null;
      container.style.visibility = 'hidden';
      saveTasks();
      return;
    }

    container.style.visibility = 'visible';
    label.textContent = task.name;
  }

  function renderTaskList() {
    const list = document.getElementById('task-list');
    const countBadge = document.getElementById('task-count');
    if (!list) return;

    list.innerHTML = '';
    
    // Active tasks count (uncompleted)
    const activeTasks = appState.tasks.filter(t => !t.completed);
    if (countBadge) countBadge.textContent = activeTasks.length;

    appState.tasks.forEach(task => {
      const item = document.createElement('li');
      item.className = `task-item ${task.completed ? 'completed' : ''} ${task.id === appState.activeTaskId ? 'active' : ''}`;
      item.setAttribute('data-id', task.id);
      
      item.innerHTML = `
        <div class="task-item-left">
          <div class="task-checkbox" aria-label="Toggle completed state">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" width="10" height="10"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </div>
          <span class="task-name">${task.name}</span>
        </div>
        <button class="task-delete-btn" aria-label="Delete task">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
        </button>
      `;

      // Event listener: select task on clicking item (except checkbox/delete button)
      item.addEventListener('click', (e) => {
        if (e.target.closest('.task-checkbox')) {
          e.stopPropagation();
          toggleTaskCompleted(task.id);
        } else if (e.target.closest('.task-delete-btn')) {
          e.stopPropagation();
          deleteTask(task.id);
        } else {
          selectTask(task.id);
        }
      });

      list.appendChild(item);
    });
  }

  function clearCompletedTasks() {
    appState.tasks = appState.tasks.filter(t => !t.completed);
    if (appState.activeTaskId) {
      const activeExists = appState.tasks.some(t => t.id === appState.activeTaskId);
      if (!activeExists) {
        appState.activeTaskId = appState.tasks.length > 0 ? appState.tasks[0].id : null;
      }
    }
    saveTasks();
    renderTaskList();
    updateActiveTaskLabel();
  }

  // --- Zen Quotes Selector ---
  function displayRandomQuote() {
    const list = quotes[appState.lang] || quotes.en;
    // select quote using standard random indexing or day-of-year index to stay consistent on reload
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const quote = list[dayOfYear % list.length];
    
    const quoteTextEl = document.getElementById('quote-text');
    const quoteAuthorEl = document.getElementById('quote-author');
    
    if (quoteTextEl && quote) {
      quoteTextEl.textContent = quote.text;
    }
    if (quoteAuthorEl && quote) {
      quoteAuthorEl.textContent = quote.author;
    }
  }

  // --- Initialize UI Event Listeners ---
  function setupEventListeners() {
    // 1. Language Toggle
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        const nextLang = appState.lang === 'en' ? 'es' : 'en';
        applyLanguage(nextLang);
      });
    }

    // 2. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const nextTheme = appState.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }

    // 3. Spotlight Mouse Tracking
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });

    // 4. Timer Controls
    const playBtn = document.getElementById('btn-play');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (appState.isRunning) {
          stopTimer();
        } else {
          startTimer();
        }
      });
    }

    const resetBtn = document.getElementById('btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetTimer);
    }

    const skipBtn = document.getElementById('btn-skip');
    if (skipBtn) {
      skipBtn.addEventListener('click', skipTimer);
    }

    // Timer Mode tabs
    const modeTabsContainer = document.getElementById('timer-modes-tabs');
    if (modeTabsContainer) {
      modeTabsContainer.querySelectorAll('.mode-tab').forEach(btn => {
        btn.addEventListener('click', () => {
          const mode = btn.getAttribute('data-mode');
          setTimerMode(mode);
        });
      });
    }

    // 5. Tasks Form Submit
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    if (taskForm && taskInput) {
      taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (text) {
          addTask(text);
          taskInput.value = '';
        } else {
          alert(translations[appState.lang].task_empty_alert);
        }
      });
    }

    // Clear completed tasks button
    const clearBtn = document.getElementById('btn-clear-completed');
    if (clearBtn) {
      clearBtn.addEventListener('click', clearCompletedTasks);
    }

    // 6. Ambient Sounds Controls
    const noiseBtn = document.getElementById('ambient-noise-toggle');
    if (noiseBtn) {
      noiseBtn.addEventListener('click', () => {
        if (activeAmbientType === 'brown') {
          stopAmbientSound();
          noiseBtn.classList.remove('active');
          noiseBtn.querySelector('.icon-play-sound').style.display = 'block';
          noiseBtn.querySelector('.icon-mute-sound').style.display = 'none';
        } else {
          playAmbientSound('brown');
          noiseBtn.classList.add('active');
          noiseBtn.querySelector('.icon-play-sound').style.display = 'none';
          noiseBtn.querySelector('.icon-mute-sound').style.display = 'block';
          
          // Deactivate Rain button UI
          const rainBtn = document.getElementById('ambient-rain-toggle');
          if (rainBtn) {
            rainBtn.classList.remove('active');
            rainBtn.querySelector('.icon-play-sound').style.display = 'block';
            rainBtn.querySelector('.icon-mute-sound').style.display = 'none';
          }
        }
      });
    }

    const rainBtn = document.getElementById('ambient-rain-toggle');
    if (rainBtn) {
      rainBtn.addEventListener('click', () => {
        if (activeAmbientType === 'rain') {
          stopAmbientSound();
          rainBtn.classList.remove('active');
          rainBtn.querySelector('.icon-play-sound').style.display = 'block';
          rainBtn.querySelector('.icon-mute-sound').style.display = 'none';
        } else {
          playAmbientSound('rain');
          rainBtn.classList.add('active');
          rainBtn.querySelector('.icon-play-sound').style.display = 'none';
          rainBtn.querySelector('.icon-mute-sound').style.display = 'block';

          // Deactivate Noise button UI
          const noiseBtn = document.getElementById('ambient-noise-toggle');
          if (noiseBtn) {
            noiseBtn.classList.remove('active');
            noiseBtn.querySelector('.icon-play-sound').style.display = 'block';
            noiseBtn.querySelector('.icon-mute-sound').style.display = 'none';
          }
        }
      });
    }

    // Ambient volume slider
    const ambientSlider = document.getElementById('ambient-volume');
    const ambientValText = document.getElementById('ambient-volume-val');
    if (ambientSlider && ambientValText) {
      ambientSlider.addEventListener('input', () => {
        const val = ambientSlider.value;
        ambientValText.textContent = `${val}%`;
        appState.settings.ambientVolume = parseInt(val);
        saveSettings();

        // Adjust live gain
        if (ambientGainNode) {
          ambientGainNode.gain.setValueAtTime(val / 100, audioCtx ? audioCtx.currentTime : 0);
        }
      });
    }

    // 7. Settings Inputs setup
    const focusDurationInput = document.getElementById('time-focus-input');
    const shortDurationInput = document.getElementById('time-short-input');
    const longDurationInput = document.getElementById('time-long-input');
    
    if (focusDurationInput) {
      focusDurationInput.value = appState.settings.focusDuration;
      focusDurationInput.addEventListener('change', () => {
        let val = parseInt(focusDurationInput.value) || DEFAULT_SETTINGS.focusDuration;
        if (val < 1) val = 1;
        if (val > 120) val = 120;
        focusDurationInput.value = val;
        appState.settings.focusDuration = val;
        saveSettings();
        if (appState.currentMode === 'focus') resetTimer();
      });
    }

    if (shortDurationInput) {
      shortDurationInput.value = appState.settings.shortDuration;
      shortDurationInput.addEventListener('change', () => {
        let val = parseInt(shortDurationInput.value) || DEFAULT_SETTINGS.shortDuration;
        if (val < 1) val = 1;
        if (val > 60) val = 60;
        shortDurationInput.value = val;
        appState.settings.shortDuration = val;
        saveSettings();
        if (appState.currentMode === 'short') resetTimer();
      });
    }

    if (longDurationInput) {
      longDurationInput.value = appState.settings.longDuration;
      longDurationInput.addEventListener('change', () => {
        let val = parseInt(longDurationInput.value) || DEFAULT_SETTINGS.longDuration;
        if (val < 1) val = 1;
        if (val > 60) val = 60;
        longDurationInput.value = val;
        appState.settings.longDuration = val;
        saveSettings();
        if (appState.currentMode === 'long') resetTimer();
      });
    }

    // Alarm sound select
    const soundSelect = document.getElementById('alert-sound-select');
    if (soundSelect) {
      soundSelect.value = appState.settings.endSound;
      soundSelect.addEventListener('change', () => {
        appState.settings.endSound = soundSelect.value;
        saveSettings();
        triggerAlarmSound(); // preview alert sound
      });
    }

    // Ticking audio checkbox
    const tickingCheckbox = document.getElementById('ticking-sound-toggle');
    if (tickingCheckbox) {
      tickingCheckbox.checked = appState.settings.tickingEnabled;
      tickingCheckbox.addEventListener('change', () => {
        appState.settings.tickingEnabled = tickingCheckbox.checked;
        saveSettings();
      });
    }

    // Alarm volume slider
    const alarmSlider = document.getElementById('alarm-volume');
    const alarmValText = document.getElementById('alarm-volume-val');
    if (alarmSlider && alarmValText) {
      alarmSlider.value = appState.settings.alarmVolume;
      alarmValText.textContent = `${appState.settings.alarmVolume}%`;
      alarmSlider.addEventListener('input', () => {
        const val = alarmSlider.value;
        alarmValText.textContent = `${val}%`;
        appState.settings.alarmVolume = parseInt(val);
        saveSettings();
      });
      alarmSlider.addEventListener('change', () => {
        triggerAlarmSound(); // preview alarm sound at new volume when released
      });
    }

    // Auto-start breaks checkbox
    const autoBreakCheckbox = document.getElementById('auto-break-toggle');
    if (autoBreakCheckbox) {
      autoBreakCheckbox.checked = appState.settings.autoBreak;
      autoBreakCheckbox.addEventListener('change', () => {
        appState.settings.autoBreak = autoBreakCheckbox.checked;
        saveSettings();
      });
    }

    // Auto-start focus checkbox
    const autoFocusCheckbox = document.getElementById('auto-focus-toggle');
    if (autoFocusCheckbox) {
      autoFocusCheckbox.checked = appState.settings.autoFocus;
      autoFocusCheckbox.addEventListener('change', () => {
        appState.settings.autoFocus = autoFocusCheckbox.checked;
        saveSettings();
      });
    }

    // Reset defaults button
    const resetSettingsBtn = document.getElementById('btn-reset-settings');
    if (resetSettingsBtn) {
      resetSettingsBtn.addEventListener('click', () => {
        appState.settings = { ...DEFAULT_SETTINGS };
        saveSettings();

        // Update inputs
        if (focusDurationInput) focusDurationInput.value = DEFAULT_SETTINGS.focusDuration;
        if (shortDurationInput) shortDurationInput.value = DEFAULT_SETTINGS.shortDuration;
        if (longDurationInput) longDurationInput.value = DEFAULT_SETTINGS.longDuration;
        if (soundSelect) soundSelect.value = DEFAULT_SETTINGS.endSound;
        if (tickingCheckbox) tickingCheckbox.checked = DEFAULT_SETTINGS.tickingEnabled;
        if (alarmSlider) {
          alarmSlider.value = DEFAULT_SETTINGS.alarmVolume;
          alarmValText.textContent = `${DEFAULT_SETTINGS.alarmVolume}%`;
        }
        if (ambientSlider) {
          ambientSlider.value = DEFAULT_SETTINGS.ambientVolume;
          ambientValText.textContent = `${DEFAULT_SETTINGS.ambientVolume}%`;
          if (ambientGainNode) {
            ambientGainNode.gain.setValueAtTime(DEFAULT_SETTINGS.ambientVolume / 100, audioCtx ? audioCtx.currentTime : 0);
          }
        }
        if (autoBreakCheckbox) autoBreakCheckbox.checked = DEFAULT_SETTINGS.autoBreak;
        if (autoFocusCheckbox) autoFocusCheckbox.checked = DEFAULT_SETTINGS.autoFocus;

        resetTimer();
      });
    }
  }

  // --- App Entry Initialization ---
  function init() {
    loadPersistedState();
    setupEventListeners();
    applyTheme(appState.theme);
    applyLanguage(appState.lang);
    renderTaskList();
    updateActiveTaskLabel();
    updateStatsDisplay();
    renderHistoryList();
    displayRandomQuote();
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
