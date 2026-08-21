/* ============================================================
   CHESS CHARACTER SPRITES
   Two complete casts, drawn as inline SVG — the active theme picks one.

     hq     original battle-royale troopers; team = armour tone
     mario  the Mushroom Kingdom crew; team = true colours vs shadow

   Rarity climbs with the piece in both casts:
     Pawn = common ... King = mythic.
   ============================================================ */

/* ============================================================
   CAST 1 — BATTLE ROYALE
   ============================================================ */

const HQ_STYLE = {
  p: { rarity: 'common',    accent: '#9aa6b2', deep: '#4c5560', name: 'Recruit',      power: 1 },
  n: { rarity: 'uncommon',  accent: '#4ade80', deep: '#15803d', name: 'Beast Scout',  power: 3 },
  b: { rarity: 'rare',      accent: '#38bdf8', deep: '#0369a1', name: 'Tech Oracle',  power: 3 },
  r: { rarity: 'epic',      accent: '#c084fc', deep: '#6d28d9', name: 'Fortress',     power: 5 },
  q: { rarity: 'legendary', accent: '#fbbf24', deep: '#b45309', name: 'Storm Queen',  power: 9 },
  k: { rarity: 'mythic',    accent: '#f97316', deep: '#9a3412', name: 'Supreme King', power: 99 },
};

const HQ_LORE = {
  p: 'Front-line recruit. Marches forward only — but reach the far end and you respawn as any legend you like.',
  n: 'Rides the L-shaped jump. The only one who can leap clean over a blocked squad.',
  b: 'Locks onto a diagonal lane and never leaves it. Long-range lockdown.',
  r: 'Heavy armour. Rolls the full length of any row or column and flattens what it hits.',
  q: 'Every lane, every diagonal, unlimited range. The strongest mover on the board.',
  k: 'The rarest skin in the game — and the one you must protect. Lose the King, lose the match.',
};

/* Team armour tones */
const HQ_TEAM = {
  w: { base: '#eef2f9', shade: '#b9c3d4', line: '#8794aa', trim: '#ffffff' },
  b: { base: '#3a3a5c', shade: '#26263f', line: '#15152a', trim: '#5b5b86' },
};

function artPawn(a, d, t) {
  return `
    <rect x="21" y="29" width="22" height="15" rx="5" fill="${t.shade}"/>
    <rect x="25" y="45" width="6" height="15" rx="2.5" fill="${t.shade}"/>
    <rect x="33" y="45" width="6" height="15" rx="2.5" fill="${t.shade}"/>
    <rect x="22" y="57" width="10" height="6" rx="2.5" fill="${a}"/>
    <rect x="32" y="57" width="10" height="6" rx="2.5" fill="${a}"/>
    <g transform="rotate(16 46 30)">
      <rect x="44.5" y="14" width="3" height="32" rx="1.5" fill="${d}"/>
      <path d="M39 15q7-6 14 0" stroke="${a}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    </g>
    <rect x="15" y="30" width="7" height="16" rx="3.5" fill="${t.shade}"/>
    <rect x="42" y="30" width="7" height="16" rx="3.5" fill="${t.shade}"/>
    <path d="M24 26h16a4 4 0 014 4v15a4 4 0 01-4 4H24a4 4 0 01-4-4V30a4 4 0 014-4z" fill="${t.base}"/>
    <path d="M27 30h10v11l-5 4.5-5-4.5z" fill="${a}"/>
    <path d="M23 15a9 9 0 0118 0v7a4 4 0 01-4 4H27a4 4 0 01-4-4z" fill="${t.base}"/>
    <rect x="25" y="16" width="14" height="5" rx="2.5" fill="${a}"/>
    <rect x="25.5" y="16.5" width="6" height="1.6" rx="0.8" fill="#fff" opacity=".55"/>`;
}

function artKnight(a, d, t) {
  return `
    <path d="M18 20l-3-9 9 4z" fill="${a}"/>
    <path d="M46 20l3-9-9 4z" fill="${a}"/>
    <rect x="25" y="45" width="6" height="15" rx="2.5" fill="${t.shade}"/>
    <rect x="33" y="45" width="6" height="15" rx="2.5" fill="${t.shade}"/>
    <rect x="21" y="57" width="11" height="6" rx="2.5" fill="${a}"/>
    <rect x="32" y="57" width="11" height="6" rx="2.5" fill="${a}"/>
    <g transform="rotate(-24 47 32)">
      <path d="M45 10q9 10 3 26h-5q5-16 0-26z" fill="${a}"/>
      <rect x="42" y="35" width="6" height="9" rx="2" fill="${d}"/>
    </g>
    <rect x="14" y="31" width="7" height="16" rx="3.5" fill="${t.shade}"/>
    <rect x="43" y="31" width="7" height="16" rx="3.5" fill="${t.shade}"/>
    <path d="M23 26h18a4 4 0 014 4v15a4 4 0 01-4 4H23a4 4 0 01-4-4V30a4 4 0 014-4z" fill="${t.base}"/>
    <path d="M13 27h10l3 7-3 5H14z" fill="${a}"/>
    <path d="M51 27H41l-3 7 3 5h10z" fill="${a}"/>
    <path d="M26 31h12l-2 10-4 4-4-4z" fill="${d}"/>
    <path d="M22 16a10 10 0 0120 0v6a5 5 0 01-5 5h-4l-2 4-2-4h-2a5 5 0 01-5-5z" fill="${t.base}"/>
    <path d="M22 13l-2-8 7 5z" fill="${t.base}"/>
    <path d="M42 13l2-8-7 5z" fill="${t.base}"/>
    <path d="M25 17h14l-1.5 5H26.5z" fill="${a}"/>
    <path d="M29 22l3 5 3-5z" fill="${d}"/>
    <rect x="26" y="17.6" width="5" height="1.6" rx="0.8" fill="#fff" opacity=".5"/>`;
}

function artBishop(a, d, t) {
  return `
    <path d="M20 62l6-22h12l6 22z" fill="${t.shade}"/>
    <path d="M24 62l4-20h8l4 20z" fill="${t.base}"/>
    <path d="M28 44h8l-1 18h-6z" fill="${a}" opacity=".8"/>
    <g>
      <rect x="47" y="12" width="3" height="46" rx="1.5" fill="${d}"/>
      <circle cx="48.5" cy="11" r="6" fill="${a}" opacity=".3"/>
      <circle cx="48.5" cy="11" r="3.6" fill="${a}"/>
      <circle cx="47.4" cy="9.8" r="1.2" fill="#fff" opacity=".7"/>
    </g>
    <rect x="14" y="30" width="7" height="17" rx="3.5" fill="${t.shade}"/>
    <rect x="42" y="28" width="7" height="17" rx="3.5" fill="${t.shade}"/>
    <path d="M23 25h18a4 4 0 014 4v14a4 4 0 01-4 4H23a4 4 0 01-4-4V29a4 4 0 014-4z" fill="${t.base}"/>
    <path d="M26 29h12v10l-6 5-6-5z" fill="${a}" opacity=".9"/>
    <circle cx="32" cy="34" r="2.6" fill="${t.base}"/>
    <path d="M32 3c8 4 11 11 10 19l-3 6H25l-3-6c-1-8 2-15 10-19z" fill="${t.base}"/>
    <path d="M32 3c8 4 11 11 10 19l-2 4h-6V9z" fill="${t.shade}"/>
    <path d="M25 17h14v4a7 7 0 01-14 0z" fill="${a}"/>
    <rect x="26.5" y="18" width="5" height="1.7" rx="0.85" fill="#fff" opacity=".55"/>
    <circle cx="32" cy="6" r="2" fill="${a}"/>`;
}

function artRook(a, d, t) {
  return `
    <rect x="18" y="44" width="9" height="18" rx="2" fill="${t.shade}"/>
    <rect x="37" y="44" width="9" height="18" rx="2" fill="${t.shade}"/>
    <rect x="16" y="57" width="13" height="7" rx="2.5" fill="${a}"/>
    <rect x="35" y="57" width="13" height="7" rx="2.5" fill="${a}"/>
    <rect x="8" y="24" width="13" height="12" rx="2" fill="${t.shade}"/>
    <path d="M8 24h3v-5h3v5h3v-5h3v5" fill="none" stroke="${t.shade}" stroke-width="3"/>
    <rect x="43" y="24" width="13" height="12" rx="2" fill="${t.shade}"/>
    <path d="M43 24h3v-5h3v5h3v-5h3v5" fill="none" stroke="${t.shade}" stroke-width="3"/>
    <rect x="10" y="34" width="9" height="15" rx="3" fill="${t.shade}"/>
    <rect x="45" y="34" width="9" height="15" rx="3" fill="${t.shade}"/>
    <path d="M18 24h28a5 5 0 015 5v17a5 5 0 01-5 5H18a5 5 0 01-5-5V29a5 5 0 015-5z" fill="${t.base}"/>
    <rect x="19" y="29" width="26" height="6" rx="2" fill="${a}"/>
    <path d="M22 38h20v8l-10 6-10-6z" fill="${d}"/>
    <path d="M26 40h12v5l-6 4-6-4z" fill="${a}"/>
    <rect x="10" y="43" width="10" height="14" rx="2" fill="${a}" opacity=".85"/>
    <path d="M15 43v14" stroke="${d}" stroke-width="1.6"/>
    <path d="M22 12h20v9a5 5 0 01-5 5H27a5 5 0 01-5-5z" fill="${t.base}"/>
    <path d="M22 12h4V6h4v6h4V6h4v6h4" fill="none" stroke="${t.base}" stroke-width="4" stroke-linejoin="miter"/>
    <rect x="24" y="16" width="16" height="6" rx="2" fill="${a}"/>
    <rect x="25.5" y="17" width="6" height="1.8" rx="0.9" fill="#fff" opacity=".5"/>`;
}

function artQueen(a, d, t) {
  return `
    <path d="M32 24c14 2 20 14 20 38H12c0-24 6-36 20-38z" fill="${d}" opacity=".55"/>
    <path d="M26 46h5v16h-5z" fill="${t.shade}"/>
    <path d="M33 46h5v16h-5z" fill="${t.shade}"/>
    <path d="M22 57h11v7H22z" fill="${a}"/>
    <path d="M31 57h11v7H31z" fill="${a}"/>
    <g transform="rotate(-18 12 34)">
      <path d="M10 8q6 14 2 28h-4q4-14-2-28z" fill="${a}" opacity=".9"/>
    </g>
    <g transform="rotate(18 52 34)">
      <path d="M54 8q-6 14-2 28h4q-4-14 2-28z" fill="${a}" opacity=".9"/>
    </g>
    <rect x="13" y="29" width="7" height="17" rx="3.5" fill="${t.shade}"/>
    <rect x="44" y="29" width="7" height="17" rx="3.5" fill="${t.shade}"/>
    <path d="M23 24h18a5 5 0 015 5v15a5 5 0 01-5 5H23a5 5 0 01-5-5V29a5 5 0 015-5z" fill="${t.base}"/>
    <path d="M12 26h11l3 7-3 6H13z" fill="${a}"/>
    <path d="M52 26H41l-3 7 3 6h11z" fill="${a}"/>
    <path d="M26 28h12v12l-6 6-6-6z" fill="${a}"/>
    <path d="M32 31l3 5-3 5-3-5z" fill="${t.base}"/>
    <path d="M23 14a9 9 0 0118 0v7a5 5 0 01-5 5h-8a5 5 0 01-5-5z" fill="${t.base}"/>
    <path d="M25 16h14l-1 5H26z" fill="${a}"/>
    <rect x="26.5" y="16.7" width="5" height="1.7" rx="0.85" fill="#fff" opacity=".6"/>
    <path d="M20 12l2-9 4 6 6-8 6 8 4-6 2 9z" fill="${a}"/>
    <circle cx="32" cy="2.5" r="2.4" fill="${a}"/>
    <circle cx="22" cy="4" r="1.6" fill="${a}"/>
    <circle cx="42" cy="4" r="1.6" fill="${a}"/>`;
}

function artKing(a, d, t) {
  return `
    <circle cx="32" cy="34" r="30" fill="none" stroke="${a}" stroke-width="1.4" opacity=".28"/>
    <circle cx="32" cy="34" r="25" fill="none" stroke="${a}" stroke-width="1" opacity=".2"/>
    <path d="M32 22c17 3 24 15 24 40H8c0-25 7-37 24-40z" fill="${d}" opacity=".7"/>
    <path d="M32 22c17 3 24 15 24 40H32z" fill="${d}" opacity=".4"/>
    <path d="M25 46h6v16h-6z" fill="${t.shade}"/>
    <path d="M33 46h6v16h-6z" fill="${t.shade}"/>
    <path d="M20 56h12v8H20z" fill="${a}"/>
    <path d="M32 56h12v8H32z" fill="${a}"/>
    <g transform="rotate(14 50 30)">
      <rect x="48.5" y="6" width="4" height="46" rx="2" fill="${d}"/>
      <circle cx="50.5" cy="6" r="7.5" fill="${a}" opacity=".28"/>
      <path d="M50.5 0l2.6 4.4 4.9.7-3.6 3.4.9 4.9-4.8-2.5-4.8 2.5.9-4.9-3.6-3.4 4.9-.7z" fill="${a}"/>
    </g>
    <rect x="11" y="28" width="8" height="18" rx="4" fill="${t.shade}"/>
    <rect x="45" y="28" width="8" height="18" rx="4" fill="${t.shade}"/>
    <path d="M22 22h20a6 6 0 016 6v16a6 6 0 01-6 6H22a6 6 0 01-6-6V28a6 6 0 016-6z" fill="${t.base}"/>
    <path d="M9 24h12l4 8-4 7H10z" fill="${a}"/>
    <path d="M55 24H43l-4 8 4 7h12z" fill="${a}"/>
    <path d="M24 26h16v14l-8 8-8-8z" fill="${a}"/>
    <path d="M32 29l4 6-4 7-4-7z" fill="${t.base}"/>
    <circle cx="32" cy="35" r="2.2" fill="${a}"/>
    <path d="M22 13a10 10 0 0120 0v7a5 5 0 01-5 5h-10a5 5 0 01-5-5z" fill="${t.base}"/>
    <path d="M24 15h16l-1 6H25z" fill="${a}"/>
    <rect x="25.5" y="15.8" width="6" height="1.8" rx="0.9" fill="#fff" opacity=".6"/>
    <path d="M17 11l2-11 5 7 4-9 4 9 5-7 2 11z" fill="${a}"/>
    <path d="M17 11h30v4H17z" fill="${a}"/>
    <circle cx="32" cy="-1" r="3" fill="${a}"/>
    <circle cx="19" cy="1" r="2" fill="${a}"/>
    <circle cx="45" cy="1" r="2" fill="${a}"/>`;
}

const HQ_ART = { p: artPawn, n: artKnight, b: artBishop, r: artRook, q: artQueen, k: artKing };


/* ============================================================
   CAST 2 — SUPER MARIO
   Your crew is drawn in true colours; Bowser's crew is the same
   silhouette mixed toward shadow-purple, so the piece stays
   readable while the side is obvious at a glance.
   ============================================================ */

const MARIO_STYLE = {
  p: { rarity: 'common',    accent: '#c98a3f', deep: '#6b3f18', name: 'Goomba',         power: 1 },
  n: { rarity: 'uncommon',  accent: '#4ade80', deep: '#166534', name: 'Yoshi',          power: 3 },
  b: { rarity: 'rare',      accent: '#38bdf8', deep: '#0369a1', name: 'Toad',           power: 3 },
  r: { rarity: 'epic',      accent: '#b0b6d8', deep: '#4a4f73', name: 'Thwomp',         power: 5 },
  q: { rarity: 'legendary', accent: '#ff9ecb', deep: '#b83280', name: 'Princess Peach', power: 9 },
  k: { rarity: 'mythic',    accent: '#e52521', deep: '#8c0f0f', name: 'Mario',          power: 99 },
};

const MARIO_LORE = {
  p: 'Marches forward and never turns back. Stomp your way to the flagpole and grab any power-up you like.',
  n: 'The L-shaped hop. The only one on the board who can leap clean over a blocked crew.',
  b: 'Locks onto a diagonal lane and rides it all the way. Small, fast, everywhere at once.',
  r: 'A slab of solid stone. Slams down any row or column and flattens whatever it lands on.',
  q: 'Every lane, every diagonal, no limit. The strongest mover in the whole Kingdom.',
  k: 'The one you must protect. Lose Mario and the course is over — so keep him behind the blocks.',
};

/* Character palettes, all in true colour. */
const MARIO_PAL = {
  p: { cap: '#a9713a', capDark: '#7a4d22', face: '#e8c88d', brow: '#3a2410', foot: '#4c2f14' },
  n: { body: '#3fc14f', bodyDark: '#2a9138', belly: '#fdf6e3', spike: '#e0393e', shoe: '#f2802a', shoeDark: '#c25c11' },
  b: { cap: '#fdfbf0', spot: '#e0393e', face: '#ffdcb0', vest: '#2f8fd8', vestDark: '#1d6ba8', trim: '#fbd000' },
  r: { stone: '#8f97bd', stoneLt: '#b8bfdd', stoneDk: '#5a6089', spike: '#d8dcf2', eye: '#fdfbf0' },
  q: { gown: '#ff8fc0', gownLt: '#ffb9d8', gownDk: '#d4457f', hair: '#ffd85e', hairDk: '#e0a92c', skin: '#ffdcb0', gem: '#3fa9f5', gold: '#fbd000' },
  k: { hat: '#e52521', hatDk: '#a8151a', skin: '#ffcb9a', hair: '#4a2c12', overall: '#2f6fd0', overallDk: '#1f4c96', shoe: '#6b3f18', glove: '#fdfbf0', gold: '#fbd000' },
};

/* ---- colour helpers ---------------------------------------- */

function hexToRgb(h) {
  const s = h.replace('#', '');
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
}

/** Blend `hex` toward `target` by `amt` (0 = untouched, 1 = fully target). */
function mixHex(hex, target, amt) {
  if (!amt) return hex;
  const a = hexToRgb(hex), b = hexToRgb(target);
  return rgbToHex(a[0] + (b[0] - a[0]) * amt, a[1] + (b[1] - a[1]) * amt, a[2] + (b[2] - a[2]) * amt);
}

/* w = your crew, true colour. b = Bowser's crew, cast in shadow. */
const MARIO_TEAM = {
  w: { mix: 0,   target: '#000000', line: '#2b1a10' },
  b: { mix: .46, target: '#3a1f5c', line: '#150a26' },
};

/** Every colour in a character palette, toned for the given side. */
function marioPalette(type, side) {
  const src = MARIO_PAL[type];
  const t = MARIO_TEAM[side];
  const out = {};
  for (const k of Object.keys(src)) out[k] = mixHex(src[k], t.target, t.mix);
  // Eye whites stay bright on both sides — that is what keeps a face readable.
  out.white = mixHex('#ffffff', t.target, t.mix * .35);
  out.ink = '#17110f';
  return out;
}

function marioGoomba(c) {
  return `
    <ellipse cx="21" cy="57" rx="10" ry="6" fill="${c.foot}"/>
    <ellipse cx="43" cy="57" rx="10" ry="6" fill="${c.foot}"/>
    <path d="M32 5c15 0 25 11 25 22 0 9-11 16-25 16S7 36 7 27C7 16 17 5 32 5z" fill="${c.cap}"/>
    <path d="M32 5c15 0 25 11 25 22 0 5-3 9-8 12 3-4 4-8 4-13 0-10-8-19-21-21z" fill="${c.capDark}"/>
    <path d="M13 33q8 10 19 10t19-10q0 13-8 18H21q-8-5-8-18z" fill="${c.face}"/>
    <ellipse cx="24" cy="28" rx="6.4" ry="7.6" fill="${c.white}"/>
    <ellipse cx="40" cy="28" rx="6.4" ry="7.6" fill="${c.white}"/>
    <circle cx="26.4" cy="29.5" r="3.1" fill="${c.ink}"/>
    <circle cx="37.6" cy="29.5" r="3.1" fill="${c.ink}"/>
    <path d="M15 18l12 6-1.5 4.5-12-7z" fill="${c.brow}"/>
    <path d="M49 18l-12 6 1.5 4.5 12-7z" fill="${c.brow}"/>
    <path d="M24 43q8 6 16 0-2 7-8 7t-8-7z" fill="${c.brow}"/>
    <path d="M26.5 44.6l2 3.4 2.5-3.4 2.5 3.4 2-3.4z" fill="${c.white}"/>`;
}

function marioYoshi(c) {
  return `
    <rect x="14" y="51" width="17" height="11" rx="5.5" fill="${c.shoe}"/>
    <rect x="33" y="51" width="17" height="11" rx="5.5" fill="${c.shoe}"/>
    <path d="M14 58h17v4H14zM33 58h17v4H33z" fill="${c.shoeDark}"/>
    <path d="M32 22c11 0 17 11 17 20 0 7-7 12-17 12s-17-5-17-12c0-9 6-20 17-20z" fill="${c.body}"/>
    <ellipse cx="32" cy="45" rx="11" ry="9" fill="${c.belly}"/>
    <path d="M15 33q-7 2-8 8t5 8 7-6z" fill="${c.body}"/>
    <path d="M49 33q7 2 8 8t-5 8-7-6z" fill="${c.body}"/>
    <path d="M20 28q12-6 24 0v7q-12-6-24 0z" fill="${c.spike}"/>
    <path d="M20 32h24v3H20z" fill="${c.belly}" opacity=".55"/>
    <path d="M18 4l-2-9 7 5zM26 0l-1-9 6 6z" fill="${c.spike}"/>
    <ellipse cx="30" cy="13" rx="15" ry="13.5" fill="${c.body}"/>
    <path d="M40 4q15 0 15 10t-15 10z" fill="${c.body}"/>
    <ellipse cx="49" cy="10" rx="2.4" ry="1.7" fill="${c.bodyDark}"/>
    <ellipse cx="30" cy="8" rx="7" ry="8.6" fill="${c.belly}"/>
    <ellipse cx="31" cy="9.5" rx="3" ry="4.2" fill="${c.ink}"/>
    <ellipse cx="29.8" cy="7.4" rx="1.1" ry="1.4" fill="${c.belly}"/>
    <path d="M38 20q7 3 12 0" stroke="${c.bodyDark}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
}

function marioToad(c) {
  return `
    <ellipse cx="24" cy="59" rx="8" ry="4.6" fill="${c.cap}"/>
    <ellipse cx="40" cy="59" rx="8" ry="4.6" fill="${c.cap}"/>
    <path d="M22 40h20v13a6 6 0 01-6 6H28a6 6 0 01-6-6z" fill="${c.vest}"/>
    <path d="M32 40h10v13a6 6 0 01-6 6h-4z" fill="${c.vestDark}"/>
    <rect x="27" y="40" width="10" height="6" rx="3" fill="${c.trim}"/>
    <rect x="14" y="41" width="8" height="12" rx="4" fill="${c.face}"/>
    <rect x="42" y="41" width="8" height="12" rx="4" fill="${c.face}"/>
    <ellipse cx="32" cy="34" rx="13" ry="11.5" fill="${c.face}"/>
    <path d="M32 3c15 0 24 10 24 20 0 8-11 12-24 12S8 31 8 23C8 13 17 3 32 3z" fill="${c.cap}"/>
    <ellipse cx="32" cy="12" rx="7" ry="6" fill="${c.spot}"/>
    <ellipse cx="15" cy="23" rx="5.4" ry="4.6" fill="${c.spot}"/>
    <ellipse cx="49" cy="23" rx="5.4" ry="4.6" fill="${c.spot}"/>
    <ellipse cx="23" cy="33" rx="2.6" ry="3.6" fill="${c.ink}"/>
    <ellipse cx="41" cy="33" rx="2.6" ry="3.6" fill="${c.ink}"/>
    <ellipse cx="22.2" cy="31.8" rx="0.9" ry="1.2" fill="${c.cap}"/>
    <ellipse cx="40.2" cy="31.8" rx="0.9" ry="1.2" fill="${c.cap}"/>
    <path d="M28 39q4 3 8 0" stroke="${c.ink}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
}

function marioThwomp(c) {
  return `
    <path d="M8 12h48l-4 46H12z" fill="${c.stone}"/>
    <path d="M32 12h24l-4 46H32z" fill="${c.stoneDk}" opacity=".45"/>
    <path d="M8 12h48l-2 5H10z" fill="${c.stoneLt}"/>
    <path d="M12 4l4 8H8zM24 2l4 10h-8zM36 2l4 10h-8zM48 4l4 8h-8z" fill="${c.spike}"/>
    <path d="M4 22l6 4-6 4zM4 36l6 4-6 4z" fill="${c.spike}"/>
    <path d="M60 22l-6 4 6 4zM60 36l-6 4 6 4z" fill="${c.spike}"/>
    <path d="M14 62l4-6h28l4 6z" fill="${c.spike}"/>
    <ellipse cx="24" cy="30" rx="6" ry="7" fill="${c.eye}"/>
    <ellipse cx="40" cy="30" rx="6" ry="7" fill="${c.eye}"/>
    <ellipse cx="25.4" cy="31" rx="2.8" ry="3.6" fill="${c.ink}"/>
    <ellipse cx="38.6" cy="31" rx="2.8" ry="3.6" fill="${c.ink}"/>
    <path d="M15 20l11 5-1 4-11-6z" fill="${c.stoneDk}"/>
    <path d="M49 20l-11 5 1 4 11-6z" fill="${c.stoneDk}"/>
    <path d="M20 43h24v7H20z" fill="${c.ink}"/>
    <path d="M22 43l2 7 3-7 3 7 3-7 3 7 3-7 3 7 2-7z" fill="${c.eye}"/>`;
}

function marioPeach(c) {
  return `
    <path d="M32 27c11 0 18 16 20 35H12c2-19 9-35 20-35z" fill="${c.gown}"/>
    <path d="M32 27c11 0 18 16 20 35H32z" fill="${c.gownDk}" opacity=".45"/>
    <path d="M20 55q12 6 24 0v7H20z" fill="${c.gownLt}"/>
    <ellipse cx="14" cy="34" rx="6" ry="5.5" fill="${c.gownLt}"/>
    <ellipse cx="50" cy="34" rx="6" ry="5.5" fill="${c.gownLt}"/>
    <rect x="9" y="37" width="8" height="12" rx="4" fill="${c.gownLt}"/>
    <rect x="47" y="37" width="8" height="12" rx="4" fill="${c.gownLt}"/>
    <path d="M24 24h16v8a8 8 0 01-16 0z" fill="${c.gownDk}"/>
    <circle cx="32" cy="30" r="3" fill="${c.gem}"/>
    <path d="M19 12q0 20 4 26l3-10h12l3 10q4-6 4-26z" fill="${c.hair}"/>
    <path d="M32 12q13 0 13 12-3 20-4 14l-3-10H32z" fill="${c.hairDk}" opacity=".5"/>
    <ellipse cx="32" cy="17" rx="10" ry="10.5" fill="${c.skin}"/>
    <path d="M21 11a11 11 0 0122 0q-6 5-11 5t-11-5z" fill="${c.hair}"/>
    <ellipse cx="27" cy="17" rx="2.3" ry="3.2" fill="${c.ink}"/>
    <ellipse cx="37" cy="17" rx="2.3" ry="3.2" fill="${c.ink}"/>
    <ellipse cx="26.4" cy="16" rx="0.8" ry="1" fill="${c.skin}"/>
    <ellipse cx="36.4" cy="16" rx="0.8" ry="1" fill="${c.skin}"/>
    <path d="M29 23q3 2.5 6 0" stroke="${c.gownDk}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M22 3h20l-2 6H24z" fill="${c.gold}"/>
    <path d="M22 3l-1-6 5 4 6-6 6 6 5-4-1 6z" fill="${c.gold}"/>
    <circle cx="32" cy="5.5" r="2.2" fill="${c.gem}"/>`;
}

function marioMario(c) {
  return `
    <ellipse cx="21" cy="58" rx="11" ry="6" fill="${c.shoe}"/>
    <ellipse cx="43" cy="58" rx="11" ry="6" fill="${c.shoe}"/>
    <rect x="13" y="34" width="9" height="15" rx="4.5" fill="${c.hat}"/>
    <rect x="42" y="34" width="9" height="15" rx="4.5" fill="${c.hat}"/>
    <circle cx="15" cy="50" r="5.5" fill="${c.glove}"/>
    <circle cx="49" cy="50" r="5.5" fill="${c.glove}"/>
    <path d="M21 33h22v18a7 7 0 01-7 7h-8a7 7 0 01-7-7z" fill="${c.overall}"/>
    <path d="M32 33h11v18a7 7 0 01-7 7h-4z" fill="${c.overallDk}" opacity=".5"/>
    <path d="M21 33h6v10h-6zM37 33h6v10h-6z" fill="${c.hat}"/>
    <circle cx="25" cy="41" r="2.6" fill="${c.gold}"/>
    <circle cx="39" cy="41" r="2.6" fill="${c.gold}"/>
    <ellipse cx="32" cy="22" rx="12" ry="11" fill="${c.skin}"/>
    <path d="M20 20q-2-8 3-8l2 6zM44 20q2-8-3-8l-2 6z" fill="${c.skin}"/>
    <path d="M20 21q1-6 4-8v11q-3 0-4-3z" fill="${c.hair}"/>
    <path d="M44 21q-1-6-4-8v11q3 0 4-3z" fill="${c.hair}"/>
    <ellipse cx="27" cy="19" rx="2.2" ry="3.2" fill="${c.ink}"/>
    <ellipse cx="37" cy="19" rx="2.2" ry="3.2" fill="${c.ink}"/>
    <ellipse cx="26.4" cy="17.9" rx="0.8" ry="1" fill="${c.glove}"/>
    <ellipse cx="36.4" cy="17.9" rx="0.8" ry="1" fill="${c.glove}"/>
    <circle cx="32" cy="25" r="4.4" fill="${c.skin}"/>
    <path d="M21 27q11 7 22 0-1 7-6 7h-10q-5 0-6-7z" fill="${c.hair}"/>
    <path d="M18 11a14 14 0 0128 0v3H18z" fill="${c.hat}"/>
    <path d="M14 12h26q9 0 10 4H14z" fill="${c.hat}"/>
    <path d="M14 12h26q9 0 10 4H32z" fill="${c.hatDk}" opacity=".4"/>
    <circle cx="32" cy="8" r="6" fill="${c.glove}"/>
    <path d="M29 11V5.5l3 3.5 3-3.5V11h-1.6V8l-1.4 1.7L30.6 8v3z" fill="${c.hat}"/>`;
}

const MARIO_ART = { p: marioGoomba, n: marioYoshi, b: marioToad, r: marioThwomp, q: marioPeach, k: marioMario };


/* ============================================================
   CAST 3 — RED ALERT 3
   Two armies that are genuinely different drawings, not one
   silhouette recoloured: the Allies (steel blue, white, gold)
   are your side, the Soviets (red, olive drab, brass) play black.
   Rarity still climbs with the piece, Pawn -> King.
   ============================================================ */

/* The Allied cast is the base; RA3_SOVIET below overrides the name,
   the colours and the bio for the same square on the other side. */
const RA3_STYLE = {
  p: { rarity: 'common',    accent: '#8ab4f0', deep: '#1f4a8f', name: 'Peacekeeper',       power: 1 },
  n: { rarity: 'uncommon',  accent: '#5fbf72', deep: '#1c6b34', name: 'Attack Dog',        power: 3 },
  b: { rarity: 'rare',      accent: '#7fe3ff', deep: '#0a6f96', name: 'Cryocopter',        power: 3 },
  r: { rarity: 'epic',      accent: '#a58bff', deep: '#4b2f9e', name: 'Guardian Tank',     power: 5 },
  q: { rarity: 'legendary', accent: '#ffcf3f', deep: '#a86b00', name: 'Tanya',             power: 9 },
  k: { rarity: 'mythic',    accent: '#ff5b4a', deep: '#8c1c10', name: 'President Ackerman', power: 99 },
};

const RA3_LORE = {
  p: 'Riot shield forward, shotgun ready. Marches toward the Soviet line and never back — reach it and Command commissions you as anything you like.',
  n: 'The L-shaped pounce. The only unit on the field that leaps clean over a blocked column.',
  b: 'Holds one diagonal lane and freezes everything down it. Never leaves the colour it lifted off from.',
  r: 'Rolls the full length of any rank or file and flattens what it finds. Nothing about this one is subtle.',
  q: 'Every lane, every diagonal, unlimited range. One commando, total field control — the strongest unit you have.',
  k: 'The one you protect. Lose the President and the operation is over, no matter what is still standing.',
};

const RA3_SOVIET = {
  p: {
    name: 'Conscript', accent: '#ef7a6e', deep: '#8a1712',
    lore: 'Cheap, loud, and endless. Marches forward only — and Moscow has plenty more where that came from.',
  },
  n: {
    name: 'War Bear', accent: '#d2a05e', deep: '#6b4a26',
    lore: 'Trained to pounce in the same L-shaped jump, and the only Soviet unit that clears a blocked column.',
  },
  b: {
    name: 'Twinblade', accent: '#f0a24a', deep: '#8a4a10',
    lore: 'Twin rotors, one diagonal lane, a full rocket pod. Locked to the colour it took off from.',
  },
  r: {
    name: 'Hammer Tank', accent: '#c98bff', deep: '#4b2f9e',
    lore: 'Grinds down any rank or file and keeps the gun off whatever it kills. Heavy armour, heavier temper.',
  },
  q: {
    name: 'Natasha', accent: '#ff9f3f', deep: '#a03a00',
    lore: 'Every lane, every diagonal, no limit — and she calls in an airstrike on whatever she cannot reach herself.',
  },
  k: {
    name: 'Premier Cherdenko', accent: '#ff5b4a', deep: '#8c1c10',
    lore: 'The Premier himself. Corner him and the war is over — which is exactly the plan, Commander.',
  },
};

/* Two fixed palettes. No blending here: each army is drawn in its own colours. */
const RA3_PAL = {
  w: {
    hull: '#3f7fd0', hullDk: '#1f4a8f', hullLt: '#7fb4ee',
    steel: '#dbe6f5', steelDk: '#9aadc6', metal: '#5c6f88',
    glass: '#8ce6ff', gold: '#ffcf3f', red: '#d8392f',
    skin: '#f2c69c', hair: '#f0d488', fur: '#cfa06a', furDk: '#6b4a26',
    boot: '#16202e', ink: '#0e1723', white: '#f8fbff',
  },
  b: {
    hull: '#c8342c', hullDk: '#7d120e', hullLt: '#ec6a5c',
    steel: '#b6bda4', steelDk: '#6d7359', metal: '#5a5f45',
    glass: '#a9e4ff', gold: '#ffd23f', red: '#c8342c',
    skin: '#e9b78c', hair: '#3b2b1e', fur: '#8a6134', furDk: '#4f371c',
    boot: '#1b1410', ink: '#160f0b', white: '#f6f1e4',
    olive: '#7d8153', oliveDk: '#4c5034',
  },
};

/** Five-pointed star as a path — both armies stamp them on everything. */
function ra3Star(cx, cy, r, fill, opacity) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 ? r * 0.42 : r;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push((cx + Math.cos(a) * rad).toFixed(1) + ',' + (cy + Math.sin(a) * rad).toFixed(1));
  }
  const op = opacity === undefined ? '' : ` opacity="${opacity}"`;
  return `<path d="M${pts.join('L')}Z" fill="${fill}"${op}/>`;
}

/* ---------------- ALLIED — your army ---------------- */

function ra3Peacekeeper(c) {
  return `
    <rect x="25" y="44" width="6.5" height="16" rx="3" fill="${c.hullDk}"/>
    <rect x="33" y="44" width="6.5" height="16" rx="3" fill="${c.hullDk}"/>
    <rect x="22" y="57" width="11" height="6" rx="2" fill="${c.boot}"/>
    <rect x="32" y="57" width="11" height="6" rx="2" fill="${c.boot}"/>
    <g transform="rotate(-18 47 30)">
      <rect x="45" y="14" width="4.5" height="27" rx="1.6" fill="${c.ink}"/>
      <rect x="42.5" y="26" width="10" height="6" rx="2" fill="${c.metal}"/>
      <rect x="44" y="11" width="6" height="5" rx="1.6" fill="${c.steelDk}"/>
    </g>
    <rect x="41" y="30" width="7" height="16" rx="3.5" fill="${c.hull}"/>
    <path d="M23 26h18a5 5 0 015 5v14a5 5 0 01-5 5H23a5 5 0 01-5-5V31a5 5 0 015-5z" fill="${c.hull}"/>
    <path d="M32 26h9a5 5 0 015 5v14a5 5 0 01-5 5h-9z" fill="${c.hullDk}" opacity=".4"/>
    <path d="M26 30h12v10l-6 5.5-6-5.5z" fill="${c.steel}"/>
    ${ra3Star(32, 35, 4.4, c.hull)}
    <rect x="18" y="27" width="28" height="4" rx="2" fill="${c.hullDk}"/>
    <path d="M23 15.5a9 9 0 0118 0V21a4 4 0 01-4 4H27a4 4 0 01-4-4z" fill="${c.steel}"/>
    <path d="M24.6 16.4h14.8V21a2 2 0 01-2 2H26.6a2 2 0 01-2-2z" fill="${c.glass}"/>
    <rect x="25.8" y="17.2" width="6" height="1.7" rx=".85" fill="#fff" opacity=".65"/>
    <path d="M22.5 12.5h19l-2-3.5h-15z" fill="${c.hullDk}"/>
    <path d="M3 21h16v20q0 8-8 12-8-4-8-12z" fill="${c.white}"/>
    <path d="M3 21h16v6H3z" fill="${c.hull}"/>
    <path d="M3 41q0 8 8 12 8-4 8-12z" fill="${c.hull}" opacity=".2"/>
    ${ra3Star(11, 36, 6.5, c.hull)}`;
}

function ra3AttackDog(c) {
  return `
    <path d="M13 33q-8-3-10-12 9 2 14 8z" fill="${c.fur}"/>
    <rect x="16" y="43" width="6.5" height="18" rx="3" fill="${c.furDk}"/>
    <rect x="25" y="45" width="6.5" height="16" rx="3" fill="${c.fur}"/>
    <rect x="34" y="45" width="6.5" height="16" rx="3" fill="${c.furDk}"/>
    <rect x="43" y="43" width="6.5" height="18" rx="3" fill="${c.fur}"/>
    <path d="M13 44q0-15 13-15h16q10 0 10 14t-10 14H26q-13 0-13-13z" fill="${c.fur}"/>
    <path d="M19 30h22q9 1 9 9H19z" fill="${c.furDk}" opacity=".55"/>
    <path d="M23 30h9v27h-9z" fill="${c.hull}"/>
    ${ra3Star(27.5, 43, 5, c.gold)}
    <path d="M36 6l7 15-9-4z" fill="${c.fur}"/>
    <path d="M57 6l-7 15 9-4z" fill="${c.fur}"/>
    <path d="M37.6 9.5l4.2 9-5.4-2.4z" fill="${c.furDk}"/>
    <path d="M55.4 9.5l-4.2 9 5.4-2.4z" fill="${c.furDk}"/>
    <path d="M38 20q0-11 8.5-11T55 20v5q0 8-8.5 8T38 25z" fill="${c.fur}"/>
    <path d="M46 22h12a3.5 3.5 0 010 7H46z" fill="${c.fur}"/>
    <path d="M46 26h12a3.5 3.5 0 010 3H46z" fill="${c.furDk}"/>
    <ellipse cx="58" cy="25" rx="2.6" ry="2.2" fill="${c.ink}"/>
    <ellipse cx="43" cy="19" rx="2" ry="2.4" fill="${c.ink}"/>
    <ellipse cx="52" cy="19" rx="2" ry="2.4" fill="${c.ink}"/>
    <ellipse cx="42.4" cy="18.2" rx=".7" ry=".9" fill="${c.white}"/>
    <ellipse cx="51.4" cy="18.2" rx=".7" ry=".9" fill="${c.white}"/>`;
}

function ra3Cryocopter(c) {
  return `
    <path d="M33 5.4h27a1.8 1.8 0 010 3.6H33z" fill="${c.steelDk}"/>
    <path d="M31 5.4H4a1.8 1.8 0 000 3.6h27z" fill="${c.steelDk}"/>
    <rect x="30" y="8" width="4" height="10" rx="1.8" fill="${c.metal}"/>
    <ellipse cx="32" cy="7.2" rx="4" ry="2.6" fill="${c.metal}"/>
    <path d="M22 16h20a10 10 0 0110 10v9a9 9 0 01-9 9H24a10 10 0 01-10-10v-8a10 10 0 018-10z" fill="${c.hull}"/>
    <path d="M32 16h10a10 10 0 0110 10v9a9 9 0 01-9 9h-11z" fill="${c.hullDk}" opacity=".4"/>
    <path d="M16 22q7-5 15-4v13q-9 1-16-3z" fill="${c.glass}"/>
    <path d="M16 22q7-5 15-4v4q-9-1-15 3z" fill="${c.white}" opacity=".5"/>
    <path d="M44 20h9l4 6-4 6h-9z" fill="${c.steelDk}"/>
    ${ra3Star(48.5, 26, 4, c.hull)}
    <rect x="18" y="42" width="30" height="4" rx="2" fill="${c.metal}"/>
    <path d="M20 46l-4 9h4l3-9zM46 46l4 9h-4l-3-9z" fill="${c.metal}"/>
    <path d="M12 55h42v3.5H12z" fill="${c.steelDk}"/>
    <ellipse cx="20" cy="40" rx="7" ry="5" fill="${c.glass}" opacity=".75"/>
    <ellipse cx="18" cy="41" rx="3.4" ry="2.6" fill="${c.white}"/>
    <path d="M13 41l-8 3 8 1-6 4 8-3z" fill="${c.glass}" opacity=".9"/>
    <path d="M8 33l2.4 3.4 4-.6-2.2 3.4 2.2 3.4-4-.6L8 45.4l-.6-4.2L3.4 40l4-1.2z" fill="${c.glass}" opacity=".55"/>`;
}

function ra3GuardianTank(c) {
  return `
    <rect x="4" y="42" width="56" height="18" rx="8" fill="${c.ink}"/>
    <rect x="8" y="46" width="48" height="10" rx="5" fill="${c.metal}"/>
    <circle cx="14" cy="51" r="5" fill="${c.steelDk}"/>
    <circle cx="26" cy="51" r="5" fill="${c.steelDk}"/>
    <circle cx="38" cy="51" r="5" fill="${c.steelDk}"/>
    <circle cx="50" cy="51" r="5" fill="${c.steelDk}"/>
    <path d="M6 43l4-6h44l4 6z" fill="${c.hullLt}"/>
    <path d="M9 28h46a4 4 0 014 4v10H5V32a4 4 0 014-4z" fill="${c.hull}"/>
    <path d="M32 28h23a4 4 0 014 4v10H32z" fill="${c.hullDk}" opacity=".35"/>
    <path d="M9 28h46l-3-4H12z" fill="${c.hullLt}"/>
    ${ra3Star(14, 35, 5, c.white)}
    <path d="M22 12h20a5 5 0 015 5v9a3 3 0 01-3 3H20a3 3 0 01-3-3v-9a5 5 0 015-5z" fill="${c.hullLt}"/>
    <path d="M32 12h10a5 5 0 015 5v9a3 3 0 01-3 3H32z" fill="${c.hullDk}" opacity=".3"/>
    <rect x="44" y="16.5" width="18" height="5" rx="2.5" fill="${c.metal}"/>
    <rect x="58" y="15" width="5" height="8" rx="2" fill="${c.steelDk}"/>
    <rect x="24" y="16" width="14" height="4" rx="2" fill="${c.glass}"/>
    <rect x="25" y="16.6" width="5" height="1.5" rx=".75" fill="#fff" opacity=".6"/>
    <rect x="20" y="6" width="5" height="8" rx="2" fill="${c.metal}"/>
    <circle cx="22.5" cy="5" r="6" fill="${c.glass}" opacity=".22"/>
    <circle cx="22.5" cy="5" r="3" fill="${c.glass}"/>`;
}

function ra3Tanya(c) {
  return `
    <rect x="25" y="43" width="7" height="15" rx="3" fill="${c.hullDk}"/>
    <rect x="33" y="43" width="7" height="15" rx="3" fill="${c.hullDk}"/>
    <rect x="23" y="55" width="11" height="8" rx="2.5" fill="${c.boot}"/>
    <rect x="32" y="55" width="11" height="8" rx="2.5" fill="${c.boot}"/>
    <g transform="rotate(-34 13 40)">
      <rect x="4" y="33.6" width="16" height="5" rx="1.6" fill="${c.steelDk}"/>
      <rect x="4" y="33.6" width="16" height="2" rx="1" fill="${c.steel}"/>
      <path d="M15 38.6h5.5v8h-5.5z" fill="${c.ink}"/>
      <circle cx="18" cy="40" r="3.6" fill="${c.white}"/>
    </g>
    <g transform="rotate(34 51 40)">
      <rect x="44" y="33.6" width="16" height="5" rx="1.6" fill="${c.steelDk}"/>
      <rect x="44" y="33.6" width="16" height="2" rx="1" fill="${c.steel}"/>
      <path d="M43.5 38.6H49v8h-5.5z" fill="${c.ink}"/>
      <circle cx="46" cy="40" r="3.6" fill="${c.white}"/>
    </g>
    <rect x="14" y="30" width="7" height="14" rx="3.5" fill="${c.skin}"/>
    <rect x="43" y="30" width="7" height="14" rx="3.5" fill="${c.skin}"/>
    <path d="M23 39h18v7H23z" fill="${c.skin}"/>
    <path d="M24 26h16a4 4 0 014 4v9a4 4 0 01-4 4H24a4 4 0 01-4-4v-9a4 4 0 014-4z" fill="${c.red}"/>
    <path d="M32 26h8a4 4 0 014 4v9a4 4 0 01-4 4h-8z" fill="#9e1f18" opacity=".45"/>
    <path d="M27 30h4l1 7-3 3.5-3-3.5z" fill="${c.white}" opacity=".45"/>
    <rect x="22" y="44" width="20" height="5" rx="2" fill="${c.hullDk}"/>
    <rect x="29" y="43.4" width="6" height="6.2" rx="1.6" fill="${c.gold}"/>
    <path d="M20 12q-6 10-8 25l5.5 1.5q2-14 6.5-21z" fill="${c.hair}"/>
    <ellipse cx="32" cy="17" rx="9" ry="9.5" fill="${c.skin}"/>
    <path d="M22 14q0-10 10-10t10 10q-4-5-10-5t-10 5z" fill="${c.hair}"/>
    <path d="M22 13.5a10 10 0 0120 0q-5 3.5-10 3.5t-10-3.5z" fill="${c.hair}"/>
    <ellipse cx="28" cy="17.5" rx="2" ry="2.6" fill="${c.ink}"/>
    <ellipse cx="36" cy="17.5" rx="2" ry="2.6" fill="${c.ink}"/>
    <ellipse cx="27.4" cy="16.6" rx=".7" ry=".9" fill="${c.white}"/>
    <ellipse cx="35.4" cy="16.6" rx=".7" ry=".9" fill="${c.white}"/>
    <path d="M29 22.5q3 2.2 6 0" stroke="#b4382e" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M22.5 8.5h19l1.5-4.5h-22z" fill="${c.hull}"/>
    ${ra3Star(32, 5, 3.4, c.gold)}`;
}

function ra3Ackerman(c) {
  return `
    <circle cx="32" cy="32" r="30" fill="none" stroke="${c.hullLt}" stroke-width="1.3" opacity=".3"/>
    <circle cx="32" cy="32" r="24" fill="none" stroke="${c.hullLt}" stroke-width="1" opacity=".2"/>
    <path d="M32 16l23 6v15q0 17-23 25-23-8-23-25V22z" fill="${c.hull}" opacity=".22"/>
    <rect x="25" y="44" width="7" height="15" rx="2.5" fill="${c.ink}"/>
    <rect x="33" y="44" width="7" height="15" rx="2.5" fill="${c.ink}"/>
    <rect x="21" y="57" width="12" height="6" rx="2" fill="${c.boot}"/>
    <rect x="32" y="57" width="12" height="6" rx="2" fill="${c.boot}"/>
    <rect x="13" y="30" width="8" height="17" rx="4" fill="${c.hullDk}"/>
    <rect x="44" y="30" width="8" height="17" rx="4" fill="${c.hullDk}"/>
    <circle cx="16" cy="49" r="4.4" fill="${c.skin}"/>
    <circle cx="49" cy="49" r="4.4" fill="${c.skin}"/>
    <path d="M21 26h22a5 5 0 015 5v16a4 4 0 01-4 4H20a4 4 0 01-4-4V31a5 5 0 015-5z" fill="${c.hullDk}"/>
    <path d="M26 26h12l-6 25z" fill="${c.white}"/>
    <path d="M26 26l6 6 6-6-2-2h-8z" fill="${c.hullDk}"/>
    <path d="M30.8 30h2.4l1.8 5-3 10-3-10z" fill="${c.red}"/>
    <path d="M22 26h6l4 6-4 4-4-4z" fill="${c.hull}" opacity=".5"/>
    <path d="M42 26h-6l-4 6 4 4 4-4z" fill="${c.hull}" opacity=".5"/>
    <rect x="20.5" y="31" width="5" height="6.6" rx="1" fill="${c.hull}"/>
    <path d="M20.5 31h5v1.4h-5zM20.5 33.4h5v1.4h-5zM20.5 35.8h5v1.4h-5z" fill="${c.white}" opacity=".85"/>
    <ellipse cx="32" cy="16" rx="9.5" ry="10" fill="${c.skin}"/>
    <path d="M22 15q0-12 10-12t10 12q-3-6-10-6t-10 6z" fill="${c.steel}"/>
    <path d="M21.6 14q-1 6 1.4 8V14zM42.4 14q1 6-1.4 8V14z" fill="${c.steel}"/>
    <ellipse cx="28" cy="16.5" rx="2" ry="2.4" fill="${c.ink}"/>
    <ellipse cx="36" cy="16.5" rx="2" ry="2.4" fill="${c.ink}"/>
    <path d="M24.5 12.6l6 2.2-.6 1.8-6-2.6zM39.5 12.6l-6 2.2.6 1.8 6-2.6z" fill="${c.steel}"/>
    <path d="M28.5 22q3.5 2 7 0-1 3-3.5 3t-3.5-3z" fill="#a8564a"/>
    <path d="M18 2.5l14 3.5 14-3.5-2 5-12 3.2-12-3.2z" fill="${c.gold}"/>
    ${ra3Star(32, 1.5, 5.4, c.gold)}
    ${ra3Star(32, 1.5, 2.3, c.hullDk)}`;
}

/* ---------------- SOVIET — the other side of the board ---------------- */

function ra3Conscript(c) {
  return `
    <rect x="25" y="44" width="6.5" height="16" rx="3" fill="${c.oliveDk}"/>
    <rect x="33" y="44" width="6.5" height="16" rx="3" fill="${c.oliveDk}"/>
    <rect x="22" y="56" width="11" height="7" rx="2" fill="${c.boot}"/>
    <rect x="32" y="56" width="11" height="7" rx="2" fill="${c.boot}"/>
    <path d="M22 26h20a5 5 0 015 5v15a4 4 0 01-4 4H21a4 4 0 01-4-4V31a5 5 0 015-5z" fill="${c.olive}"/>
    <path d="M32 26h10a5 5 0 015 5v15a4 4 0 01-4 4H32z" fill="${c.oliveDk}" opacity=".5"/>
    <path d="M25 26h14l-7 9z" fill="${c.hullDk}"/>
    <rect x="15" y="31" width="7" height="15" rx="3.5" fill="${c.olive}"/>
    <rect x="42" y="31" width="7" height="15" rx="3.5" fill="${c.olive}"/>
    <rect x="19" y="41" width="26" height="4.5" rx="1.6" fill="${c.oliveDk}"/>
    <rect x="29" y="40.4" width="6" height="6" rx="1.4" fill="${c.gold}"/>
    <g transform="rotate(-26 32 40)">
      <rect x="13" y="36" width="35" height="3.8" rx="1.4" fill="${c.ink}"/>
      <path d="M26 39.6h7.5l-1.6 8h-4.8z" fill="${c.ink}"/>
      <rect x="42" y="32.6" width="4" height="3.6" rx="1" fill="${c.metal}"/>
      <rect x="16" y="34.6" width="7" height="3" rx="1.2" fill="${c.metal}"/>
    </g>
    <circle cx="14" cy="49" r="4.2" fill="${c.skin}"/>
    <circle cx="50" cy="49" r="4.2" fill="${c.skin}"/>
    <ellipse cx="32" cy="18" rx="9" ry="9.5" fill="${c.skin}"/>
    <ellipse cx="27.8" cy="18.4" rx="1.9" ry="2.4" fill="${c.ink}"/>
    <ellipse cx="36.2" cy="18.4" rx="1.9" ry="2.4" fill="${c.ink}"/>
    <ellipse cx="27.2" cy="17.5" rx=".7" ry=".9" fill="${c.white}"/>
    <ellipse cx="35.6" cy="17.5" rx=".7" ry=".9" fill="${c.white}"/>
    <path d="M28.4 23.4q3.6 2 7.2 0" stroke="${c.ink}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <path d="M17.5 11h5v12a2.5 2.5 0 01-5 0z" fill="${c.fur}"/>
    <path d="M41.5 11h5v12a2.5 2.5 0 01-5 0z" fill="${c.fur}"/>
    <path d="M20 14a12 12 0 0124 0v3.5H20z" fill="${c.fur}"/>
    <path d="M20 15.6h24v2.6H20z" fill="${c.furDk}"/>
    ${ra3Star(32, 9.5, 4.4, c.hull)}`;
}

function ra3WarBear(c) {
  return `
    <path d="M12 40q-7 1-9-4 6-4 11-2z" fill="${c.fur}"/>
    <rect x="15" y="44" width="8" height="17" rx="4" fill="${c.furDk}"/>
    <rect x="41" y="44" width="8" height="17" rx="4" fill="${c.furDk}"/>
    <rect x="13" y="58" width="12" height="5.5" rx="2.6" fill="${c.ink}"/>
    <rect x="39" y="58" width="12" height="5.5" rx="2.6" fill="${c.ink}"/>
    <path d="M16 34q0-12 16-12t16 12v10q0 12-16 12T16 44z" fill="${c.fur}"/>
    <path d="M32 22q16 0 16 12v10q0 12-16 12z" fill="${c.furDk}" opacity=".4"/>
    <ellipse cx="32" cy="44" rx="10" ry="11" fill="${c.furDk}" opacity=".35"/>
    <path d="M8 30q-6 4-4 10t9 4l4-9z" fill="${c.fur}"/>
    <path d="M56 30q6 4 4 10t-9 4l-4-9z" fill="${c.fur}"/>
    <path d="M9 42q3 4 8 3l-1-5z" fill="${c.ink}"/>
    <path d="M55 42q-3 4-8 3l1-5z" fill="${c.ink}"/>
    <path d="M23 27h18v10q-4 4-9 4t-9-4z" fill="${c.hull}"/>
    ${ra3Star(32, 32, 5, c.gold)}
    <circle cx="17" cy="10" r="6" fill="${c.fur}"/>
    <circle cx="47" cy="10" r="6" fill="${c.fur}"/>
    <circle cx="17" cy="10" r="3" fill="${c.furDk}"/>
    <circle cx="47" cy="10" r="3" fill="${c.furDk}"/>
    <ellipse cx="32" cy="15" rx="14" ry="12.5" fill="${c.fur}"/>
    <ellipse cx="32" cy="20" rx="8" ry="6.5" fill="${c.steel}" opacity=".6"/>
    <ellipse cx="32" cy="17.4" rx="3.4" ry="2.6" fill="${c.ink}"/>
    <path d="M26 22q6 5 12 0-2 5-6 5t-6-5z" fill="${c.ink}"/>
    <path d="M27.6 22.8l1.6 2.8 2-2.4 2 2.4 1.4-2.8z" fill="${c.white}"/>
    <ellipse cx="25" cy="11" rx="2.2" ry="2.6" fill="${c.ink}"/>
    <ellipse cx="39" cy="11" rx="2.2" ry="2.6" fill="${c.ink}"/>
    <ellipse cx="24.4" cy="10.1" rx=".8" ry="1" fill="${c.white}"/>
    <ellipse cx="38.4" cy="10.1" rx=".8" ry="1" fill="${c.white}"/>`;
}

function ra3Twinblade(c) {
  return `
    <path d="M15 4.6h24a1.7 1.7 0 010 3.4H15z" fill="${c.metal}"/>
    <path d="M13 4.6H1a1.7 1.7 0 000 3.4h12z" fill="${c.metal}"/>
    <path d="M51 9.6h12a1.7 1.7 0 010 3.4H51z" fill="${c.metal}"/>
    <path d="M49 9.6H25a1.7 1.7 0 000 3.4h24z" fill="${c.metal}"/>
    <rect x="11" y="7" width="4" height="11" rx="1.8" fill="${c.steelDk}"/>
    <rect x="49" y="12" width="4" height="8" rx="1.8" fill="${c.steelDk}"/>
    <path d="M18 20h30a11 11 0 0111 11v6a10 10 0 01-10 10H21a12 12 0 01-12-12v-4a11 11 0 019-11z" fill="${c.hull}"/>
    <path d="M32 20h16a11 11 0 0111 11v6a10 10 0 01-10 10H32z" fill="${c.hullDk}" opacity=".45"/>
    <path d="M12 26q7-5 15-4v13q-9 1-16-4z" fill="${c.glass}"/>
    <path d="M12 26q7-5 15-4v4q-9-1-15 3z" fill="${c.white}" opacity=".45"/>
    <rect x="7" y="15" width="10" height="7" rx="2.5" fill="${c.olive}"/>
    <rect x="47" y="16" width="10" height="7" rx="2.5" fill="${c.olive}"/>
    ${ra3Star(43, 31, 5, c.gold)}
    <rect x="14" y="44" width="36" height="5" rx="2.4" fill="${c.oliveDk}"/>
    <rect x="10" y="48" width="18" height="6" rx="2.6" fill="${c.metal}"/>
    <rect x="36" y="48" width="18" height="6" rx="2.6" fill="${c.metal}"/>
    <circle cx="14" cy="51" r="1.5" fill="${c.hullDk}"/>
    <circle cx="19" cy="51" r="1.5" fill="${c.hullDk}"/>
    <circle cx="24" cy="51" r="1.5" fill="${c.hullDk}"/>
    <circle cx="40" cy="51" r="1.5" fill="${c.hullDk}"/>
    <circle cx="45" cy="51" r="1.5" fill="${c.hullDk}"/>
    <circle cx="50" cy="51" r="1.5" fill="${c.hullDk}"/>
    <path d="M52 34h8l3 5-3 5h-8z" fill="${c.oliveDk}"/>`;
}

function ra3HammerTank(c) {
  return `
    <rect x="3" y="41" width="58" height="19" rx="8" fill="${c.ink}"/>
    <rect x="7" y="45" width="50" height="11" rx="5" fill="${c.metal}"/>
    <circle cx="14" cy="50.5" r="5.4" fill="${c.oliveDk}"/>
    <circle cx="27" cy="50.5" r="5.4" fill="${c.oliveDk}"/>
    <circle cx="40" cy="50.5" r="5.4" fill="${c.oliveDk}"/>
    <circle cx="52" cy="50.5" r="5.4" fill="${c.oliveDk}"/>
    <path d="M5 42l5-7h44l5 7z" fill="${c.olive}"/>
    <path d="M8 26h48a4 4 0 014 4v11H4V30a4 4 0 014-4z" fill="${c.hull}"/>
    <path d="M32 26h24a4 4 0 014 4v11H32z" fill="${c.hullDk}" opacity=".4"/>
    <path d="M8 26h48l-4-5H12z" fill="${c.hullLt}"/>
    ${ra3Star(14, 33, 5.4, c.gold)}
    <path d="M20 10h24a6 6 0 016 6v8a3 3 0 01-3 3H17a3 3 0 01-3-3v-8a6 6 0 016-6z" fill="${c.hull}"/>
    <path d="M32 10h12a6 6 0 016 6v8a3 3 0 01-3 3H32z" fill="${c.hullDk}" opacity=".35"/>
    <rect x="46" y="14.5" width="18" height="6.5" rx="2" fill="${c.metal}"/>
    <rect x="60" y="12.5" width="5" height="11" rx="2" fill="${c.oliveDk}"/>
    <rect x="49" y="16" width="11" height="1.6" fill="${c.steelDk}" opacity=".6"/>
    <rect x="22" y="14" width="12" height="4" rx="1.6" fill="${c.oliveDk}"/>
    <rect x="18" y="4" width="4.5" height="8" rx="1.8" fill="${c.metal}"/>
    <path d="M15 1.5h11v3.5H15z" fill="${c.oliveDk}"/>
    <path d="M35.5 12h8.5l2 4-2 4h-8.5z" fill="${c.oliveDk}"/>`;
}

function ra3Natasha(c) {
  return `
    <rect x="25" y="43" width="7" height="15" rx="3" fill="${c.ink}"/>
    <rect x="33" y="43" width="7" height="15" rx="3" fill="${c.ink}"/>
    <rect x="22" y="54" width="12" height="9" rx="2.6" fill="${c.boot}"/>
    <rect x="31" y="54" width="12" height="9" rx="2.6" fill="${c.boot}"/>
    <g transform="rotate(-38 34 30)">
      <rect x="14" y="28" width="44" height="4" rx="1.5" fill="${c.steelDk}"/>
      <rect x="14" y="28" width="44" height="1.6" rx=".8" fill="${c.steel}"/>
      <rect x="50" y="26.2" width="13" height="2.4" rx="1" fill="${c.steel}"/>
      <rect x="30" y="22.8" width="13" height="4.6" rx="1.6" fill="${c.gold}"/>
      <path d="M20 32h7l-2 8h-4z" fill="${c.ink}"/>
      <rect x="14" y="26.4" width="5" height="7" rx="2" fill="${c.hullDk}"/>
    </g>
    <rect x="15" y="30" width="7" height="15" rx="3.5" fill="${c.ink}"/>
    <rect x="43" y="30" width="7" height="15" rx="3.5" fill="${c.ink}"/>
    <path d="M23 26h18a5 5 0 015 5v13a4 4 0 01-4 4H22a4 4 0 01-4-4V31a5 5 0 015-5z" fill="${c.ink}"/>
    <path d="M32 26h9a5 5 0 015 5v13a4 4 0 01-4 4h-10z" fill="#000" opacity=".3"/>
    <path d="M26 26h12l-6 10z" fill="${c.hull}"/>
    <rect x="21" y="42" width="22" height="5" rx="2" fill="${c.hullDk}"/>
    <rect x="29" y="41.4" width="6" height="6.2" rx="1.4" fill="${c.gold}"/>
    <rect x="21" y="30" width="4.6" height="3" rx="1" fill="${c.gold}"/>
    <rect x="21" y="34" width="4.6" height="3" rx="1" fill="${c.steel}"/>
    <path d="M20 11q-5 12-4 26l6-1q-2-14 2-21z" fill="${c.hair}"/>
    <path d="M44 11q5 12 4 26l-6-1q2-14-2-21z" fill="${c.hair}"/>
    <ellipse cx="32" cy="17" rx="9" ry="9.5" fill="${c.skin}"/>
    <path d="M22 14q0-10 10-10t10 10q-4-5-10-5t-10 5z" fill="${c.hair}"/>
    <ellipse cx="28" cy="17.5" rx="2" ry="2.6" fill="${c.ink}"/>
    <ellipse cx="36" cy="17.5" rx="2" ry="2.6" fill="${c.ink}"/>
    <ellipse cx="27.4" cy="16.6" rx=".7" ry=".9" fill="${c.white}"/>
    <ellipse cx="35.4" cy="16.6" rx=".7" ry=".9" fill="${c.white}"/>
    <path d="M29 22.6q3 2 6 0" stroke="#a33228" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M21 9.6q0-7.4 11-7.4t11 7.4q0 2.6-11 2.6t-11-2.6z" fill="${c.hull}"/>
    <path d="M21 9.6h22q0 2.6-11 2.6t-11-2.6z" fill="${c.hullDk}"/>
    ${ra3Star(37.5, 7, 3.2, c.gold)}`;
}

function ra3Cherdenko(c) {
  return `
    <circle cx="32" cy="32" r="30" fill="none" stroke="${c.hullLt}" stroke-width="1.3" opacity=".3"/>
    <circle cx="32" cy="32" r="24" fill="none" stroke="${c.hullLt}" stroke-width="1" opacity=".2"/>
    ${ra3Star(32, 32, 29, c.hull, '.16')}
    <rect x="25" y="45" width="7" height="14" rx="2.5" fill="${c.ink}"/>
    <rect x="33" y="45" width="7" height="14" rx="2.5" fill="${c.ink}"/>
    <rect x="20" y="57" width="12" height="6" rx="2" fill="${c.boot}"/>
    <rect x="32" y="57" width="12" height="6" rx="2" fill="${c.boot}"/>
    <path d="M18 30h28l4 22a4 4 0 01-4 4H18a4 4 0 01-4-4z" fill="${c.olive}"/>
    <path d="M32 30h14l4 22a4 4 0 01-4 4H32z" fill="${c.oliveDk}" opacity=".5"/>
    <path d="M20 26h24a5 5 0 015 5v18a4 4 0 01-4 4H19a4 4 0 01-4-4V31a5 5 0 015-5z" fill="${c.olive}"/>
    <path d="M32 26h12a5 5 0 015 5v18a4 4 0 01-4 4H32z" fill="${c.oliveDk}" opacity=".5"/>
    <path d="M26 26h12l-6 12z" fill="${c.hullDk}"/>
    <path d="M26 26l6 6-4 24h-3zM38 26l-6 6 4 24h3z" fill="${c.oliveDk}"/>
    <rect x="14.5" y="26" width="10" height="5" rx="2" fill="${c.gold}"/>
    <rect x="39.5" y="26" width="10" height="5" rx="2" fill="${c.gold}"/>
    <rect x="19" y="42" width="26" height="5" rx="2" fill="${c.hullDk}"/>
    <rect x="29" y="41.4" width="6" height="6.2" rx="1.4" fill="${c.gold}"/>
    <circle cx="21.5" cy="34" r="2.4" fill="${c.gold}"/>
    <circle cx="27" cy="34" r="2.4" fill="${c.steel}"/>
    <circle cx="21.5" cy="39.4" r="2.4" fill="${c.hull}"/>
    <ellipse cx="32" cy="17" rx="9" ry="9.5" fill="${c.skin}"/>
    <ellipse cx="28" cy="17.4" rx="2" ry="2.5" fill="${c.ink}"/>
    <ellipse cx="36" cy="17.4" rx="2" ry="2.5" fill="${c.ink}"/>
    <path d="M24.5 13.6l6.5 1.8-.4 2-6.6-2.2zM39.5 13.6L33 15.4l.4 2 6.6-2.2z" fill="${c.hair}"/>
    <path d="M27 23q5 2.5 10 0-2 3.5-5 3.5t-5-3.5z" fill="#a33228"/>
    <path d="M20 12h24v2.4H20z" fill="${c.oliveDk}"/>
    <path d="M14 11.4h36a1.8 1.8 0 010 3.6H14a1.8 1.8 0 010-3.6z" fill="${c.ink}"/>
    <path d="M22 3h20a4 4 0 014 4v5H18V7a4 4 0 014-4z" fill="${c.olive}"/>
    <path d="M32 3h10a4 4 0 014 4v5H32z" fill="${c.oliveDk}" opacity=".45"/>
    ${ra3Star(32, 7, 4.4, c.hull)}`;
}

/* One art map per army — pieceSprite picks by side, not by recolour. */
const RA3_ART = {
  w: { p: ra3Peacekeeper, n: ra3AttackDog, b: ra3Cryocopter, r: ra3GuardianTank, q: ra3Tanya,   k: ra3Ackerman },
  b: { p: ra3Conscript,   n: ra3WarBear,   b: ra3Twinblade,  r: ra3HammerTank,   q: ra3Natasha, k: ra3Cherdenko },
};

/* Outline tone per army: dark navy for the Allies, dark earth for the Soviets. */
const RA3_TEAM = {
  w: { line: '#0b1522' },
  b: { line: '#160f0b' },
};

/* ============================================================
   CAST REGISTRY + PUBLIC API
   ============================================================ */

const SPRITE_SETS = {
  hq:    { style: HQ_STYLE,    lore: HQ_LORE,    art: HQ_ART,    kind: 'hq' },
  mario: { style: MARIO_STYLE, lore: MARIO_LORE, art: MARIO_ART, kind: 'mario' },
  /* `sides` is optional: only Red Alert gives the two armies different
     names, colours and bios for the same square. */
  ra3:   { style: RA3_STYLE,   lore: RA3_LORE,   art: RA3_ART,   kind: 'ra3', sides: { b: RA3_SOVIET } },
};

/** The cast the active theme uses. `themeId` comes from js/theme.js. */
function spriteSet() {
  return SPRITE_SETS[typeof themeId === 'string' ? themeId : 'hq'] || SPRITE_SETS.hq;
}

/** Whatever the active cast overrides for one side, or nothing. */
function sideOverride(set, type, side) {
  return (side && set.sides && set.sides[side] && set.sides[side][type]) || null;
}

/**
 * Rarity, accent colour, deep colour and character name for a piece type.
 * Pass the side when the name or colour matters — casts where both armies
 * share a character (Battle HQ, Mario) simply ignore it.
 */
function pieceStyle(type, side) {
  const set = spriteSet();
  const base = set.style[type];
  const over = sideOverride(set, type, side);
  return over ? Object.assign({}, base, over) : base;
}

/** The character's one-line bio, in the active theme's voice. */
function pieceLore(type, side) {
  const set = spriteSet();
  const over = sideOverride(set, type, side);
  return (over && over.lore) || set.lore[type];
}

/**
 * Render a chess character in the active theme.
 * @param {string} type - p n b r q k
 * @param {string} side - 'w' (yours) or 'b' (theirs)
 * @param {object} opts - { size, glow }
 */
function pieceSprite(type, side, opts) {
  opts = opts || {};
  const set = spriteSet();
  const st = pieceStyle(type, side);
  const size = opts.size || 100;
  const glow = opts.glow !== false;
  const who = side === 'w'
    ? (typeof C === 'function' ? C('you') : 'Your')
    : (typeof C === 'function' ? C('foe') : 'Enemy');

  let body, line;
  if (set.kind === 'mario') {
    const pal = marioPalette(type, side);
    body = set.art[type](pal);
    line = MARIO_TEAM[side].line;
  } else if (set.kind === 'ra3') {
    body = set.art[side][type](RA3_PAL[side]);
    line = RA3_TEAM[side].line;
  } else {
    const t = HQ_TEAM[side];
    body = set.art[type](st.accent, st.deep, t);
    line = t.line;
  }

  return `<svg class="sprite" viewBox="-4 -12 72 82" width="${size}%" height="${size}%"
      role="img" aria-label="${who} ${st.name}">
    ${glow ? `<ellipse cx="32" cy="65" rx="17" ry="5" fill="${st.accent}" opacity=".32"/>` : ''}
    <g class="sprite-body" stroke="${line}" stroke-width="0.6" stroke-linejoin="round">
      ${body}
    </g>
  </svg>`;
}

/** Small rarity-coloured badge with the classic chess glyph, for clarity. */
const PIECE_GLYPH = { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚' };

/** Roster order: rarest skin first, exactly as the power ladder reads. */
const ROSTER_ORDER = ['k', 'q', 'r', 'b', 'n', 'p'];
