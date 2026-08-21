/* ============================================================
   RUBEN'S LEARNING HQ - shell configuration
   Subject metadata, games, quests and rewards.
   The actual lessons and exercises live in js/curriculum/*.js —
   one file per subject.
   ============================================================ */

const RARITY = {
  common:    { label: 'COMMON',    color: '#9aa6b2' },
  uncommon:  { label: 'UNCOMMON',  color: '#4ade80' },
  rare:      { label: 'RARE',      color: '#38bdf8' },
  epic:      { label: 'EPIC',      color: '#c084fc' },
  legendary: { label: 'LEGENDARY', color: '#fbbf24' },
  mythic:    { label: 'MYTHIC',    color: '#f97316' },
};

const SUBJECTS = [
  {
    id: 'english',
    name: 'English',
    folder: 'English',
    icon: '📖',
    rarity: 'rare',
    tagline: 'Words are weapons. Stack your vocab.',
    blurb: 'Reading, grammar, creative writing and spelling drops.',
  },
  {
    id: 'hindi',
    name: 'Hindi',
    folder: 'Hindi',
    icon: '🪔',
    rarity: 'epic',
    tagline: 'Matrubhasha mission - unlock the script.',
    blurb: 'Varnmala, matras, vyakaran and story writing.',
  },
  {
    id: 'math',
    name: 'Math',
    folder: 'Math',
    icon: '🔢',
    rarity: 'legendary',
    tagline: 'Build your number fortress.',
    blurb: 'Times tables, fractions, geometry and word-problem boss fights.',
  },
  {
    id: 'science',
    name: 'Science',
    folder: 'Science',
    icon: '🔬',
    rarity: 'uncommon',
    tagline: 'Experiment. Observe. Level up.',
    blurb: 'Plants, human body, matter, forces and space missions.',
  },
  {
    id: 'geography',
    name: 'Geography',
    folder: 'Geography',
    icon: '🗺️',
    rarity: 'rare',
    tagline: 'Read the terrain. Own the map.',
    blurb: 'The Earth, globes and maps, directions, landforms, rivers and India.',
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    folder: 'Computer-Science',
    icon: '💻',
    rarity: 'mythic',
    tagline: 'Learn to build the game, not just play it.',
    blurb: 'Typing, Scratch logic, algorithms and first lines of code.',
  },
  {
    id: 'general-knowledge',
    name: 'General Knowledge',
    folder: 'General-Knowledge',
    icon: '🌍',
    rarity: 'common',
    tagline: 'Know the map before you drop.',
    blurb: 'India, world capitals, current affairs and quiz rounds.',
  },
];

const GAMES = [
  {
    id: 'chess',
    name: 'Chess',
    icon: '♟️',
    rarity: 'legendary',
    tagline: 'Think 3 moves ahead.',
    blurb: 'Full rules, 3 difficulty levels, and a squad of battle-royale characters — the rarer the skin, the mightier the piece.',
    status: 'live',
    cta: 'Enter the Arena',
  },
  {
    id: 'ludo',
    name: 'Ludo',
    icon: '🎲',
    rarity: 'epic',
    tagline: 'Roll. Chase. Home run.',
    blurb: 'Classic 4-squad Ludo against three computer opponents. Knockouts, safe squares, extra turns.',
    status: 'live',
    cta: 'Roll the Dice',
  },
];

/* Daily quests - refresh each day, worth bonus coins. */
const DAILY_QUESTS = [
  { id: 'q-lesson', text: 'Finish 1 lesson in any subject', coins: 25, icon: '🎯' },
  { id: 'q-math',   text: 'Do a 5-minute Math drill',       coins: 15, icon: '⚡' },
  { id: 'q-read',   text: 'Read for 15 minutes',            coins: 15, icon: '📚' },
  { id: 'q-game',   text: 'Play 1 round of Chess or Ludo',  coins: 10, icon: '🎮' },
];

/* Battle Pass - real-world rewards, fully editable by the parent. */
const BATTLE_PASS = [
  { tier: 1,  xp: 0,    reward: '30 min extra screen time',    icon: '📺', rarity: 'common' },
  { tier: 2,  xp: 300,  reward: 'Pick dinner for the night',   icon: '🍕', rarity: 'common' },
  { tier: 3,  xp: 700,  reward: 'Ice cream run',               icon: '🍦', rarity: 'uncommon' },
  { tier: 4,  xp: 1200, reward: 'Movie night - your choice',   icon: '🎬', rarity: 'uncommon' },
  { tier: 5,  xp: 1800, reward: 'New book or comic',           icon: '📗', rarity: 'rare' },
  { tier: 6,  xp: 2500, reward: 'Friend over for a play date', icon: '🤝', rarity: 'rare' },
  { tier: 7,  xp: 3300, reward: 'Day out - park or arcade',    icon: '🎡', rarity: 'epic' },
  { tier: 8,  xp: 4200, reward: 'New game or skin',            icon: '🎮', rarity: 'epic' },
  { tier: 9,  xp: 5200, reward: 'Sleepover night',             icon: '🛏️', rarity: 'legendary' },
  { tier: 10, xp: 6500, reward: 'BIG reward - you pick it',    icon: '👑', rarity: 'mythic' },
];

/* The weekly timetable moved to js/schedule.js — it is editable in the app
   now and lives in state.schedule, so there is no static copy here. */

const XP_PER_LEVEL = 500;
