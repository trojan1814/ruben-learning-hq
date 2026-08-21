/* ============================================================
   THEMES
   Three complete skins for the whole app:
     hq    - the original battle-royale HUD (dark, neon, angular)
     mario - Super Mario (bright sky, blocks, chunky and round)
     ra3   - Red Alert 3 (gunmetal war room, Allies vs Soviets)

   A theme owns three things:
     1. a CSS token set        -> css/theme.css + mario.css + redalert.css
     2. every piece of wording -> LABELS below
     3. the chess/ludo cast    -> chess/ludo blocks below + js/sprites.js

   Anything user-visible should read from here, never be hard-coded,
   so switching skins changes the whole app and not just the colours.
   ============================================================ */

const THEMES = {

  /* ---------------------------------------------------------- */
  hq: {
    id: 'hq',
    name: 'Battle HQ',
    icon: '🎮',
    blurb: 'Neon drop-zone HUD',

    L: {
      /* shell */
      'brand.mark': '🎮',
      'brand.title': 'Learning HQ',
      'brand.season': 'Season 1',
      'player.avatar': '🦸',
      'player.level': 'Level',
      'coins.label': 'Star Coins',
      'coins.icon': '🪙',

      /* navigation */
      'nav.group.main': 'Command Center',
      'nav.group.adult': 'Grown-Ups',
      'nav.home': 'Home Base',
      'nav.subjects': 'Mission Zones',
      'nav.games': 'Game Arena',
      'nav.battlepass': 'Battle Pass',
      'nav.vault': 'Book Vault',
      'nav.parent': 'Parent Zone',
      'nav.news': 'News Desk',
      'ico.news': '📰',
      'page.news': 'News Desk',
      'news.lead': '🌍 Top story',
      'news.more': '📰 More from today',
      'nav.olympiad': 'Olympiad Ops',
      'nav.schedule': 'Mission Board',
      'nav.hobbies': 'Side Quests',
      'ico.olympiad': '🇮🇳',
      'ico.schedule': '📅',
      'ico.hobbies': '🎹',
      'page.olympiad': 'Olympiad Ops',
      'page.schedule': 'Mission Board',
      'page.hobbies': 'Side Quests',
      'ico.home': '🏠',
      'ico.subjects': '🎯',
      'ico.games': '🕹️',
      'ico.battlepass': '🏆',
      'ico.vault': '📚',
      'ico.parent': '🛡️',

      /* topbar + rail */
      'greeting.suffix': 'commander',
      'topbar.streak': 'Day Streak',
      'topbar.streakIcon': '🔥',
      'topbar.resume': '▶ Start Session',
      'rail.quests': 'Daily Quests',
      'rail.schedule': "Today's Schedule",
      'rail.stats': 'Career Stats',
      'stat.lessons': 'Lessons',
      'stat.xp': 'Total XP',
      'stat.quests': 'Quests',
      'stat.tier': 'Tier',
      'rail.restday': 'Rest day. Go outside. 🌤️',

      /* pages */
      'page.home': 'Drop In, <em>{name}</em>',
      'page.subjects': 'Mission Zones',
      'page.games': 'Game Arena',
      'page.battlepass': 'Battle Pass',
      'page.vault': 'Book Vault',
      'page.parent': 'Parent Zone',
      'page.chess': '♟️ Chess <em>Arena</em>',
      'page.ludo': '🎲 Ludo <em>Royale</em>',

      'tier.word': 'Tier',
      'tier.current': 'Current Tier',
      'hero.title': '🏆 Battle Pass · Season 1',
      'hero.progress': 'Season 1 Progress',
      'hero.done': 'Every tier unlocked. Absolute legend. 👑',
      'home.subjects': '🎯 Mission Zones',
      'home.games': '🕹️ Game Arena',
      'subjects.units': '📚 Units',
      'back.subjects': '← All mission zones',
      'back.games': '← Game Arena',

      /* rewards */
      'xp.word': 'XP',
      'levelup': '⭐ LEVEL UP! You are now level {n}',
      'tierup': '🏆 BATTLE PASS TIER {n} UNLOCKED!',
      'allquests': '🎉 All daily quests cleared!',

      /* lesson + quiz */
      'lesson.learn': '📖 Learn it first',
      'lesson.ready': 'Ready?',
      'lesson.start': '▶ Start Exercises',
      'quiz.results': '🏁 See Results',
      'res.perfect': 'PERFECT SCORE!',
      'res.great': 'Brilliant work!',
      'res.pass': 'Unit cleared!',
      'res.fail': 'Good try — run it again',
      'res.coins': 'Star Coins',
    },

    rarity: {
      common: 'COMMON', uncommon: 'UNCOMMON', rare: 'RARE',
      epic: 'EPIC', legendary: 'LEGENDARY', mythic: 'MYTHIC',
    },

    chess: {
      squad: '🎖️ Your Squad',
      squadHint: 'Rarest skin → most common',
      you: 'Your', foe: 'Enemy',
      ko: { p: 'K.O.', n: 'KNOCKED!', b: 'KNOCKED!', r: 'SMASHED!', q: 'ELIMINATED!', k: 'ELIMINATED!' },
      youHit: '⚔️ You knocked out their {name}!',
      foeHit: '💥 They knocked out your {name}!',
      thinking: 'Enemy squad is thinking',
      yourMove: '🎯 Your move',
      foeMove: 'Enemy squad moving…',
      moving: '⚡ Moving…',
      incoming: '💢 Incoming!',
      youCheck: '⚠️ You are in check!',
      foeCheck: '⚔️ Enemy King in check!',
      moves: '{n} legal moves available',
      holdOn: 'Hold tight…',
      holdStill: 'Hold still…',
      noMoves: 'No moves yet — you are White, you go first.',
      trayYou: 'You knocked', trayFoe: 'They knocked',
      promoTitle: '⭐ Pawn Upgraded!',
      promoSub: 'Your Recruit reached the far end. Pick their new skin.',
      win: { icon: '👑', title: 'VICTORY ROYALE!', msg: 'Checkmate. You took down the enemy King.' },
      loss: { icon: '💀', title: 'Knocked Out', msg: 'Checkmate. Your King fell — run it back.' },
      stale: { icon: '🤝', title: 'Stalemate', msg: 'No legal moves and no check. It is a draw.' },
      draw: { icon: '🤝', title: 'Draw' },
      log: 'Match Log', tray: 'Eliminations', diff: 'Difficulty', speedHead: 'Animation Speed',
      newGame: '⟲ New Match',
      levels: {
        recruit: { label: 'Recruit', blurb: 'Makes mistakes — start here' },
        soldier: { label: 'Soldier', blurb: 'Spots simple traps' },
        elite:   { label: 'Elite',   blurb: 'Plays to win' },
        legend:  { label: 'Legend',  blurb: 'Thinks 4 moves ahead' },
      },
    },

    ludo: {
      trophy: '🏆',
      squads: 'Squads',
      squadWord: 'squad',
      players: [
        { name: 'Green Squad', short: 'Green', icon: '🟢' },
        { name: 'Gold Squad',  short: 'Gold',  icon: '🟡' },
        { name: 'Blue Squad',  short: 'Blue',  icon: '🔵' },
        { name: 'Red Squad',   short: 'Red',   icon: '🔴' },
      ],
      first:  { icon: '👑', title: 'VICTORY ROYALE!', msg: 'All four tokens home first. Nobody caught you.' },
      second: { icon: '🥈', title: '2nd Place', msg: 'So close — you were one squad behind.' },
      third:  { icon: '🥉', title: '3rd Place', msg: 'Solid run. Podium finish.' },
      fourth: { icon: '🎲', title: 'Good Game', msg: 'The dice were not on your side this time.' },
    },
  },

  /* ---------------------------------------------------------- */
  mario: {
    id: 'mario',
    name: 'Super Mario',
    icon: '🍄',
    blurb: 'Mushroom Kingdom',

    L: {
      'brand.mark': '🍄',
      'brand.title': 'Mushroom Academy',
      'brand.season': 'World 1-1',
      'player.avatar': '🧑‍🔧',
      'player.level': 'Level',
      'coins.label': 'Gold Coins',
      'coins.icon': '🪙',

      'nav.group.main': 'Mushroom Kingdom',
      'nav.group.adult': 'Grown-Ups',
      'nav.home': "Peach's Castle",
      'nav.subjects': 'Worlds',
      'nav.games': 'Mini-Game Zone',
      'nav.battlepass': 'Star Road',
      'nav.vault': 'Library Level',
      'nav.parent': 'Toad House',
      'nav.news': 'News Flash',
      'ico.news': '📰',
      'page.news': 'News Flash',
      'news.lead': '⭐ Top story',
      'news.more': '📰 More from today',
      'nav.olympiad': 'Olympiad Quest',
      'nav.schedule': 'Level Map',
      'nav.hobbies': 'Bonus Rooms',
      'ico.olympiad': '🇮🇳',
      'ico.schedule': '🗓️',
      'ico.hobbies': '🎹',
      'page.olympiad': 'Olympiad Quest',
      'page.schedule': 'Level Map',
      'page.hobbies': 'Bonus Rooms',
      'ico.home': '🏰',
      'ico.subjects': '🗺️',
      'ico.games': '🎮',
      'ico.battlepass': '⭐',
      'ico.vault': '📖',
      'ico.parent': '🍄',

      'greeting.suffix': 'super star',
      'topbar.streak': 'Day Combo',
      'topbar.streakIcon': '🔥',
      'topbar.resume': "▶ Let's-a Go!",
      'rail.quests': "Toad's Tasks",
      'rail.schedule': "Today's Levels",
      'rail.stats': 'Score Card',
      'stat.lessons': 'Levels',
      'stat.xp': 'Total XP',
      'stat.quests': 'Tasks',
      'stat.tier': 'Star',
      'rail.restday': 'Warp pipe day off. Go outside. 🌤️',

      'page.home': "Let's-a go, <em>{name}</em>",
      'page.subjects': 'Worlds',
      'page.games': 'Mini-Game Zone',
      'page.battlepass': 'Star Road',
      'page.vault': 'Library Level',
      'page.parent': 'Toad House',
      'page.chess': '♟️ Chess <em>Castle</em>',
      'page.ludo': '🎲 Ludo <em>Party</em>',

      'tier.word': 'Star',
      'tier.current': 'Stars Won',
      'hero.title': '⭐ Star Road · World 1',
      'hero.progress': 'Star Road Progress',
      'hero.done': 'Every star collected. You are a Super Star! 👑',
      'home.subjects': '🗺️ Worlds',
      'home.games': '🎮 Mini-Game Zone',
      'subjects.units': '📚 Levels',
      'back.subjects': '← All worlds',
      'back.games': '← Mini-Game Zone',

      'xp.word': 'XP',
      'levelup': '🍄 LEVEL UP! You are now level {n}',
      'tierup': '⭐ STAR {n} COLLECTED!',
      'allquests': "🎉 All of Toad's tasks cleared!",

      'lesson.learn': '📖 Read the level map',
      'lesson.ready': 'Ready?',
      'lesson.start': '▶ Start the Level',
      'quiz.results': '🏁 See Results',
      'res.perfect': 'PERFECT RUN!',
      'res.great': 'Wahoo! Great run!',
      'res.pass': 'Course clear!',
      'res.fail': 'Try again — you got this',
      'res.coins': 'Gold Coins',
    },

    rarity: {
      common: 'MUSHROOM', uncommon: 'FIRE FLOWER', rare: 'SUPER LEAF',
      epic: 'CAPE FEATHER', legendary: 'SUPER STAR', mythic: 'RAINBOW STAR',
    },

    chess: {
      squad: '🍄 Your Crew',
      squadHint: 'Rarest power-up → most common',
      you: 'Your', foe: "Bowser's",
      ko: { p: 'STOMP!', n: 'BONK!', b: 'BONK!', r: 'SMASH!', q: 'WAHOO!', k: 'MAMMA MIA!' },
      youHit: '👟 You stomped their {name}!',
      foeHit: '💥 Bowser stomped your {name}!',
      thinking: "Bowser's crew is thinking",
      yourMove: '🍄 Your move',
      foeMove: "Bowser's crew is moving…",
      moving: '⚡ Moving…',
      incoming: '💢 Incoming!',
      youCheck: '⚠️ Mario is in danger!',
      foeCheck: '⚔️ Bowser is cornered!',
      moves: '{n} legal moves available',
      holdOn: 'Hold tight…',
      holdStill: 'Hold still…',
      noMoves: 'No moves yet — you are Team Mario, you go first.',
      trayYou: 'You stomped', trayFoe: 'They stomped',
      promoTitle: '🌟 SUPER STAR! Power up!',
      promoSub: 'Your Goomba reached the flagpole. Pick its power-up.',
      win: { icon: '🏁', title: 'COURSE CLEAR!', msg: 'Checkmate. Bowser is beaten — the Princess is safe.' },
      loss: { icon: '💀', title: 'GAME OVER', msg: 'Checkmate. Bowser got Mario — grab a 1-Up and retry.' },
      stale: { icon: '🤝', title: 'Stalemate', msg: 'No legal moves and no check. It is a draw.' },
      draw: { icon: '🤝', title: 'Draw' },
      log: 'Level Log', tray: 'Stomped', diff: 'Difficulty', speedHead: 'Animation Speed',
      newGame: '⟲ New Course',
      levels: {
        recruit: { label: 'Goomba',   blurb: 'Makes mistakes — start here' },
        soldier: { label: 'Koopa',    blurb: 'Spots simple traps' },
        elite:   { label: 'Hammer Bro', blurb: 'Plays to win' },
        legend:  { label: 'Bowser',   blurb: 'Thinks 4 moves ahead' },
      },
    },

    ludo: {
      trophy: '⭐',
      squads: 'Racers',
      squadWord: 'racer',
      players: [
        { name: 'Luigi',  short: 'Luigi',  icon: '🟢' },
        { name: 'Wario',  short: 'Wario',  icon: '🟡' },
        { name: 'Toad',   short: 'Toad',   icon: '🔵' },
        { name: 'Mario',  short: 'Mario',  icon: '🔴' },
      ],
      first:  { icon: '🏁', title: 'COURSE CLEAR!', msg: 'All four home first. Nobody caught you.' },
      second: { icon: '🥈', title: '2nd Place', msg: 'So close — one racer ahead of you.' },
      third:  { icon: '🥉', title: '3rd Place', msg: 'Solid run. Podium finish.' },
      fourth: { icon: '🎲', title: 'Good Game', msg: 'The dice were not on your side this time.' },
    },
  },

  /* ---------------------------------------------------------- */
  ra3: {
    id: 'ra3',
    name: 'Red Alert',
    icon: '🚨',
    blurb: 'Allied war room',

    L: {
      'brand.mark': '🚨',
      'brand.title': 'Allied Command',
      'brand.season': 'Operation One',
      'player.avatar': '🎖️',
      'player.level': 'Rank',
      'coins.label': 'War Funds',
      'coins.icon': '💰',

      'nav.group.main': 'War Room',
      'nav.group.adult': 'High Command',
      'nav.home': 'Command Center',
      'nav.subjects': 'Combat Zones',
      'nav.games': 'War Games',
      'nav.battlepass': 'Medal Board',
      'nav.vault': 'Intel Archive',
      'nav.parent': 'High Command',
      'nav.news': 'Global Feed',
      'ico.news': '📡',
      'page.news': 'Global Feed',
      'news.lead': '📡 Priority intel',
      'news.more': '🗞️ More off the wire',
      'nav.olympiad': 'Olympiad Front',
      'nav.schedule': 'Battle Plan',
      'nav.hobbies': 'Off-Duty',
      'ico.olympiad': '🇮🇳',
      'ico.schedule': '🗓️',
      'ico.hobbies': '🎹',
      'page.olympiad': 'Olympiad Front',
      'page.schedule': 'Battle Plan',
      'page.hobbies': 'Off-Duty',
      'ico.home': '🛰️',
      'ico.subjects': '🎯',
      'ico.games': '🎮',
      'ico.battlepass': '🎖️',
      'ico.vault': '🗄️',
      'ico.parent': '⭐',

      'greeting.suffix': 'Commander',
      'topbar.streak': 'Days Deployed',
      'topbar.streakIcon': '⚡',
      'topbar.resume': '▶ Deploy',
      'rail.quests': 'Daily Objectives',
      'rail.schedule': "Today's Orders",
      'rail.stats': 'Service Record',
      'stat.lessons': 'Ops Run',
      'stat.xp': 'Total XP',
      'stat.quests': 'Objectives',
      'stat.tier': 'Medal',
      'rail.restday': 'Stand down, Commander. Go outside. 🌤️',

      'page.home': 'Report In, <em>{name}</em>',
      'page.subjects': 'Combat Zones',
      'page.games': 'War Games',
      'page.battlepass': 'Medal Board',
      'page.vault': 'Intel Archive',
      'page.parent': 'High Command',
      'page.chess': '♟️ Chess <em>Front</em>',
      'page.ludo': '🎲 Ludo <em>Offensive</em>',

      'tier.word': 'Medal',
      'tier.current': 'Current Medal',
      'hero.title': '🎖️ Medal Board · Operation One',
      'hero.progress': 'Operation Progress',
      'hero.done': 'Every medal pinned. Hero of the Alliance. 🎖️',
      'home.subjects': '🎯 Combat Zones',
      'home.games': '🎮 War Games',
      'subjects.units': '📚 Briefings',
      'back.subjects': '← All combat zones',
      'back.games': '← War Games',

      'xp.word': 'XP',
      'levelup': '🎖️ PROMOTED! You are now rank {n}',
      'tierup': '🎖️ MEDAL {n} AWARDED!',
      'allquests': "🎉 All of today's objectives cleared!",

      'lesson.learn': '📖 Read the briefing',
      'lesson.ready': 'Ready?',
      'lesson.start': '▶ Begin Mission',
      'quiz.results': '🏁 Debrief',
      'res.perfect': 'FLAWLESS OPERATION!',
      'res.great': 'Outstanding work, Commander!',
      'res.pass': 'Mission accomplished!',
      'res.fail': 'Mission failed — redeploy',
      'res.coins': 'War Funds',
    },

    rarity: {
      common: 'STANDARD', uncommon: 'VETERAN', rare: 'ELITE',
      epic: 'HEROIC', legendary: 'COMMANDO', mythic: 'SUPREME',
    },

    chess: {
      squad: '🎖️ Allied Task Force',
      squadHint: 'Top clearance → standard issue',
      you: 'Allied', foe: 'Soviet',
      ko: { p: 'DOWN!', n: 'SCRAPPED!', b: 'SHOT DOWN!', r: 'DESTROYED!', q: 'ELIMINATED!', k: 'REGIME DOWN!' },
      youHit: '💥 You destroyed their {name}!',
      foeHit: '☭ The Soviets destroyed your {name}!',
      thinking: 'Soviet command is planning',
      yourMove: '🎯 Your orders, Commander',
      foeMove: 'Soviet forces advancing…',
      moving: '⚡ Units moving…',
      incoming: '💢 Incoming!',
      youCheck: '🚨 RED ALERT — the President is under fire!',
      foeCheck: '⚔️ Cherdenko is pinned down!',
      moves: '{n} legal orders available',
      holdOn: 'Stand by…',
      holdStill: 'Hold position…',
      noMoves: 'No orders yet — the Allies move first, Commander.',
      trayYou: 'You destroyed', trayFoe: 'They destroyed',
      promoTitle: '⭐ FIELD PROMOTION!',
      promoSub: 'Your Peacekeeper reached the Soviet line. Pick their new commission.',
      win: { icon: '🎖️', title: 'VICTORY!', msg: 'Checkmate. The Premier is captured — the Allies hold the field.' },
      loss: { icon: '☭', title: 'DEFEAT', msg: 'Checkmate. Cherdenko took the President — run the operation again.' },
      stale: { icon: '🤝', title: 'Stalemate', msg: 'No legal moves and no check. Ceasefire — it is a draw.' },
      draw: { icon: '🤝', title: 'Ceasefire' },
      log: 'Battle Log', tray: 'Casualties', diff: 'Threat Level', speedHead: 'Animation Speed',
      newGame: '⟲ New Operation',
      levels: {
        recruit: { label: 'Cadet',         blurb: 'Makes mistakes — start here' },
        soldier: { label: 'Conscript',     blurb: 'Spots simple traps' },
        elite:   { label: 'Shock Trooper', blurb: 'Plays to win' },
        legend:  { label: 'Cherdenko',     blurb: 'Thinks 4 moves ahead' },
      },
    },

    ludo: {
      trophy: '🎖️',
      squads: 'Commanders',
      squadWord: 'commander',
      players: [
        { name: 'Yuriko',  short: 'Yuriko',  icon: '🟢' },
        { name: 'Yoshiro', short: 'Yoshiro', icon: '🟡' },
        { name: 'Tanya',   short: 'Tanya',   icon: '🔵' },
        { name: 'Natasha', short: 'Natasha', icon: '🔴' },
      ],
      first:  { icon: '🎖️', title: 'TOTAL VICTORY!', msg: 'All four units home first. Nobody laid a finger on you.' },
      second: { icon: '🥈', title: '2nd Place', msg: 'So close — one commander beat you to it.' },
      third:  { icon: '🥉', title: '3rd Place', msg: 'Solid run. Podium finish.' },
      fourth: { icon: '🎲', title: 'Good Game', msg: 'The dice were not on your side this time.' },
    },
  },
};

const THEME_ORDER = ['hq', 'mario', 'ra3'];
const DEFAULT_THEME = 'hq';

let themeId = DEFAULT_THEME;

/* Read the saved choice before anything paints, so there is no flash of the
   wrong skin on a reload. State from the server catches up later and agrees. */
try {
  const saved = localStorage.getItem('ruben-theme');
  if (saved && THEMES[saved]) themeId = saved;
} catch { /* private mode - stay on the default */ }
document.documentElement.dataset.theme = themeId;

/** The whole theme object. */
function theme() { return THEMES[themeId] || THEMES[DEFAULT_THEME]; }

/**
 * One label, with {placeholder} substitution.
 * Falls back to the default theme so a missing key never renders blank.
 */
function T(key, vars) {
  const t = theme();
  let s = t.L[key];
  if (s === undefined) s = THEMES[DEFAULT_THEME].L[key];
  if (s === undefined) return '';
  if (vars) for (const k of Object.keys(vars)) s = s.split('{' + k + '}').join(vars[k]);
  return s;
}

/** Themed chess strings, e.g. C('win').title or C('yourMove'). */
function C(key) {
  const c = theme().chess;
  return c[key] !== undefined ? c[key] : THEMES[DEFAULT_THEME].chess[key];
}

/** Themed ludo strings. */
function LU(key) {
  const l = theme().ludo;
  return l[key] !== undefined ? l[key] : THEMES[DEFAULT_THEME].ludo[key];
}

/** Rarity wording changes per theme; the colour comes from the CSS token. */
function rarityLabel(key) {
  return (theme().rarity[key] || (RARITY[key] && RARITY[key].label) || key).toUpperCase();
}

/**
 * Fill in every static bit of chrome in index.html.
 *   data-t="key"   -> textContent
 *   data-th="key"  -> innerHTML (labels that carry markup)
 */
function paintChrome() {
  document.querySelectorAll('[data-t]').forEach((el) => { el.textContent = T(el.dataset.t); });
  document.querySelectorAll('[data-th]').forEach((el) => { el.innerHTML = T(el.dataset.th); });
  document.querySelectorAll('[data-theme-pick]').forEach((b) => {
    b.classList.toggle('on', b.dataset.themePick === themeId);
  });
}

/**
 * Switch skins. Everything re-reads its labels, so the change is instant
 * and total — sidebar, pages, chess sprites, ludo cast, the lot.
 */
function setTheme(id, opts) {
  if (!THEMES[id] || id === themeId) return;
  themeId = id;

  // Swap with transitions off, then force a style recalc. Elements that are
  // not re-rendered (the sidebar, the rail) otherwise keep the old colours.
  const root = document.documentElement;
  root.classList.add('theme-swap');
  root.dataset.theme = id;
  void root.offsetHeight;
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-swap')));

  try { localStorage.setItem('ruben-theme', id); } catch { /* ignore */ }
  if (typeof state === 'object' && state && state.player) {
    state.theme = id;
    if (typeof save === 'function') save();
  }
  paintChrome();
  if (typeof go === 'function') go(route, routeParam);
  if (!(opts && opts.silent) && typeof toast === 'function') {
    toast(theme().icon + ' ' + theme().name + ' theme on!', id === 'mario' ? 'gold' : '');
  }
}
