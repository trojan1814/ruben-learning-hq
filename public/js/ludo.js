/* ============================================================
   LUDO - standard 15x15 board, 4 squads, 1 human + 3 AI
   Token step values:
     -1        in base
      0 .. 50  on the shared 52-cell track (own start = step 0)
     51 .. 55  own home column
     56        centre / finished
   ============================================================ */

/** The 52 shared track cells, clockwise, as [col, row] on a 15x15 grid. */
const LUDO_PATH = (() => {
  const p = [];
  for (let x = 1; x <= 5; x++) p.push([x, 6]);      // 0-4
  for (let y = 5; y >= 0; y--) p.push([6, y]);      // 5-10
  p.push([7, 0]);                                   // 11
  for (let y = 0; y <= 5; y++) p.push([8, y]);      // 12-17
  for (let x = 9; x <= 14; x++) p.push([x, 6]);     // 18-23
  p.push([14, 7]);                                  // 24
  for (let x = 14; x >= 9; x--) p.push([x, 8]);     // 25-30
  for (let y = 9; y <= 14; y++) p.push([8, y]);     // 31-36
  p.push([7, 14]);                                  // 37
  for (let y = 14; y >= 9; y--) p.push([6, y]);     // 38-43
  for (let x = 5; x >= 0; x--) p.push([x, 8]);      // 44-49
  p.push([0, 7]);                                   // 50
  p.push([0, 6]);                                   // 51
  return p;
})();

/** Start squares plus the classic star squares 8 ahead of each. */
const LUDO_SAFE = new Set([0, 8, 13, 21, 26, 34, 39, 47]);

/* Board geometry only — the names and icons come from the active theme. */
const LUDO_PLAYERS = [
  {
    id: 0, color: '#4ade80', start: 0,
    home: [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7]],
    base: [[1, 1], [4, 1], [1, 4], [4, 4]], box: [0, 0],
  },
  {
    id: 1, color: '#fbbf24', start: 13,
    home: [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5]],
    base: [[10, 1], [13, 1], [10, 4], [13, 4]], box: [9, 0],
  },
  {
    id: 2, color: '#38bdf8', start: 26,
    home: [[13, 7], [12, 7], [11, 7], [10, 7], [9, 7]],
    base: [[10, 10], [13, 10], [10, 13], [13, 13]], box: [9, 9],
  },
  {
    id: 3, color: '#ff4d6d', start: 39,
    home: [[7, 13], [7, 12], [7, 11], [7, 10], [7, 9]],
    base: [[1, 10], [4, 10], [1, 13], [4, 13]], box: [0, 9],
  },
];

/** Themed cast for a seat: { name, short, icon }. */
function ludoCast(id) { return LU('players')[id]; }

const HUMAN = 3; // Ruben plays Red, bottom-left
const DICE_FACE = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

const LudoGame = {
  tokens: [],       // tokens[player][0..3] = step
  turn: 0,
  dice: null,
  movable: [],
  sixes: 0,
  rolling: false,
  busy: false,
  over: null,
  finished: [],     // player ids in finishing order
  message: '',

  newGame() {
    this.tokens = LUDO_PLAYERS.map(() => [-1, -1, -1, -1]);
    this.turn = HUMAN;
    this.dice = null;
    this.movable = [];
    this.sixes = 0;
    this.rolling = false;
    this.busy = false;
    this.over = null;
    this.finished = [];
    this.message = 'Your turn — roll the dice! You need a 6 to get a token out.';
    this.render();
  },

  mount(el) {
    this.el = el;
    if (!this.tokens.length) this.newGame(); else this.render();
  },

  alive() { return !!(this.el && document.body.contains(this.el)); },

  /* ---------------- rules ---------------- */

  /** Absolute track index for a token, or null if in base / home column. */
  trackIndex(player, step) {
    if (step < 0 || step > 50) return null;
    return (LUDO_PLAYERS[player].start + step) % 52;
  },

  legalMoves(player, dice) {
    const out = [];
    this.tokens[player].forEach((step, i) => {
      if (step === 56) return;
      if (step === -1) { if (dice === 6) out.push(i); return; }
      if (step + dice <= 56) out.push(i);
    });
    return out;
  },

  /** Move a token, resolve captures. Returns { captured, finished }. */
  applyMove(player, tokenIdx, dice) {
    const step = this.tokens[player][tokenIdx];
    const next = step === -1 ? 0 : step + dice;
    this.tokens[player][tokenIdx] = next;

    let captured = 0;
    const ti = this.trackIndex(player, next);
    if (ti !== null && !LUDO_SAFE.has(ti)) {
      LUDO_PLAYERS.forEach((p) => {
        if (p.id === player) return;
        this.tokens[p.id].forEach((s, j) => {
          if (this.trackIndex(p.id, s) === ti) { this.tokens[p.id][j] = -1; captured++; }
        });
      });
    }
    return { captured, finished: next === 56 };
  },

  homeCount(player) { return this.tokens[player].filter((s) => s === 56).length; },

  /* ---------------- turn flow ---------------- */

  roll() {
    if (this.busy || this.over || this.rolling) return;
    if (this.turn !== HUMAN) return;
    this.doRoll();
  },

  doRoll() {
    this.rolling = true;
    this.busy = true;
    this.render();

    let ticks = 0;
    const spin = setInterval(() => {
      this.dice = 1 + Math.floor(Math.random() * 6);
      this.render();
      if (++ticks >= 8) {
        clearInterval(spin);
        this.rolling = false;
        this.resolveRoll();
      }
    }, 70);
  },

  resolveRoll() {
    const player = this.turn;
    const d = this.dice;

    if (d === 6) this.sixes++; else this.sixes = 0;

    if (this.sixes === 3) {
      this.message = (player === HUMAN ? 'Three 6s in a row — ' : ludoCast(player).short + ' rolled three 6s — ') + 'turn forfeited!';
      this.sixes = 0;
      this.movable = [];
      this.render();
      setTimeout(() => this.nextTurn(), 900);
      return;
    }

    const moves = this.legalMoves(player, d);
    if (!moves.length) {
      this.message = (player === HUMAN ? 'You rolled a ' + d + ' — no legal move.' : ludoCast(player).short + ' rolled a ' + d + ' and is stuck.');
      this.movable = [];
      this.render();
      setTimeout(() => this.nextTurn(), 850);
      return;
    }

    if (player === HUMAN) {
      this.movable = moves;
      if (moves.length === 1) {
        this.message = 'You rolled a ' + d + '. Only one move — playing it.';
        this.render();
        setTimeout(() => this.pick(moves[0]), 550);
      } else {
        this.busy = false;
        this.message = 'You rolled a ' + d + '. Tap a glowing token to move it.';
        this.render();
      }
    } else {
      this.message = ludoCast(player).short + ' rolled a ' + d + '…';
      this.render();
      setTimeout(() => this.pick(this.aiChoose(player, d, moves)), 650);
    }
  },

  aiChoose(player, dice, moves) {
    let best = moves[0], bestScore = -Infinity;
    for (const i of moves) {
      const step = this.tokens[player][i];
      const next = step === -1 ? 0 : step + dice;
      let score = next;

      if (next === 56) score += 900;                              // finish a token
      else if (next > 50) score += 500;                           // safely into home column
      if (step === -1) score += 420;                              // get out of base

      const ti = this.trackIndex(player, next);
      if (ti !== null && !LUDO_SAFE.has(ti)) {
        for (const p of LUDO_PLAYERS) {
          if (p.id === player) continue;
          if (this.tokens[p.id].some((s) => this.trackIndex(p.id, s) === ti)) score += 1000;
        }
      }
      if (ti !== null && LUDO_SAFE.has(ti)) score += 120;         // land somewhere safe

      if (score > bestScore) { bestScore = score; best = i; }
    }
    return best;
  },

  pick(tokenIdx) {
    if (this.over) return;
    const player = this.turn;
    const d = this.dice;
    if (player === HUMAN && !this.movable.includes(tokenIdx)) return;

    this.busy = true;
    this.movable = [];
    const res = this.applyMove(player, tokenIdx, d);

    const who = player === HUMAN ? 'You' : ludoCast(player).short;
    if (res.captured) this.message = who + ' knocked out ' + res.captured + ' token' + (res.captured > 1 ? 's' : '') + '! Extra turn.';
    else if (res.finished) this.message = who + ' got a token home! Extra turn.';
    else this.message = who + ' moved ' + d + '.';

    // Did this player just finish all four?
    if (this.homeCount(player) === 4 && !this.finished.includes(player)) {
      this.finished.push(player);
      this.message = who + ' finished all 4 tokens!';
    }
    this.render();

    if (this.finished.includes(HUMAN) || this.finished.length >= 3) {
      setTimeout(() => this.finish(), 700);
      return;
    }

    const extra = d === 6 || res.captured > 0 || res.finished;
    setTimeout(() => (extra ? this.sameTurn() : this.nextTurn()), 800);
  },

  sameTurn() {
    if (!this.alive() || this.over) return;
    this.busy = this.turn !== HUMAN;
    if (this.turn === HUMAN) {
      this.message = 'Extra turn — roll again!';
      this.render();
    } else {
      this.render();
      setTimeout(() => this.doRoll(), 500);
    }
  },

  nextTurn() {
    if (!this.alive() || this.over) return;
    this.sixes = 0;
    let n = this.turn;
    do { n = (n + 1) % 4; } while (this.finished.includes(n) && n !== this.turn);
    this.turn = n;
    this.dice = null;

    if (this.turn === HUMAN) {
      this.busy = false;
      this.message = 'Your turn — roll the dice!';
      this.render();
    } else {
      this.busy = true;
      this.message = ludoCast(this.turn).name + ' is rolling…';
      this.render();
      setTimeout(() => this.doRoll(), 600);
    }
  },

  finish() {
    if (this.over) return;
    let place = this.finished.indexOf(HUMAN);
    if (place === -1) place = this.finished.length; // human did not finish

    const pay = [{ xp: 180, coins: 45 }, { xp: 110, coins: 25 }, { xp: 80, coins: 15 }, { xp: 40, coins: 5 }];
    const table = ['first', 'second', 'third', 'fourth'].map((k, i) => Object.assign({}, LU(k), pay[i]));
    this.over = table[Math.min(place, 3)];
    if (typeof addXp === 'function') {
      addXp(this.over.xp, '🎲 Ludo: ' + this.over.title);
      if (this.over.coins) addCoins(this.over.coins);
    }
    this.render();
  },

  /* ---------------- rendering ---------------- */

  cellClass(x, y) {
    // Centre finish block
    if (x >= 6 && x <= 8 && y >= 6 && y <= 8) return null;

    for (const p of LUDO_PLAYERS) {
      const hi = p.home.findIndex(([hx, hy]) => hx === x && hy === y);
      if (hi > -1) return { cls: 'lc-home', color: p.color };
    }
    const ti = LUDO_PATH.findIndex(([px, py]) => px === x && py === y);
    if (ti > -1) {
      const owner = LUDO_PLAYERS.find((p) => p.start === ti);
      if (owner) return { cls: 'lc-start', color: owner.color, mark: '★' };
      if (LUDO_SAFE.has(ti)) return { cls: 'lc-safe', color: '#98a0c8', mark: '✦' };
      return { cls: 'lc-track', color: null };
    }
    for (const p of LUDO_PLAYERS) {
      const [bx, by] = p.box;
      if (x >= bx && x < bx + 6 && y >= by && y < by + 6) {
        const isPad = p.base.some(([px, py]) => px === x && py === y);
        return { cls: isPad ? 'lc-pad' : 'lc-base', color: p.color };
      }
    }
    return null;
  },

  tokenPos(player, tokenIdx) {
    const step = this.tokens[player][tokenIdx];
    const p = LUDO_PLAYERS[player];
    if (step === -1) return p.base[tokenIdx];
    if (step === 56) {
      // Fan the finished tokens inside the centre block.
      const spread = [[6.7, 7], [7, 6.7], [7.3, 7], [7, 7.3]];
      return spread[tokenIdx];
    }
    if (step > 50) return p.home[step - 51];
    return LUDO_PATH[(p.start + step) % 52];
  },

  render() {
    if (!this.alive()) return;

    let cells = '';
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 15; x++) {
        const c = this.cellClass(x, y);
        if (!c) continue;
        const style = c.color ? `--cc:${c.color};` : '';
        cells += `<div class="lcell ${c.cls}" style="${style}grid-column:${x + 1};grid-row:${y + 1}">${c.mark || ''}</div>`;
      }
    }

    // Group tokens by cell so stacks fan out instead of overlapping.
    const spots = {};
    const placed = [];
    LUDO_PLAYERS.forEach((p) => {
      this.tokens[p.id].forEach((step, i) => {
        const [x, y] = this.tokenPos(p.id, i);
        const key = x + ',' + y;
        spots[key] = (spots[key] || 0);
        placed.push({ p, i, x, y, slot: spots[key]++, key, step });
      });
    });

    const tokensHtml = placed.map((t) => {
      const n = spots[t.key];
      const off = n > 1 ? (t.slot - (n - 1) / 2) * 1.6 : 0;
      const cx = (t.x + 0.5) / 15 * 100;
      const cy = (t.y + 0.5) / 15 * 100;
      const canMove = this.turn === HUMAN && t.p.id === HUMAN && this.movable.includes(t.i);
      return `<button class="ltoken ${canMove ? 'movable' : ''} ${t.step === 56 ? 'done' : ''}"
        style="--tc:${t.p.color};left:${cx + off}%;top:${cy - Math.abs(off) * 0.25}%;z-index:${10 + t.slot}"
        data-ludo-token="${t.p.id}:${t.i}" ${t.p.id === HUMAN ? '' : 'tabindex="-1"'}></button>`;
    }).join('');

    const cur = LUDO_PLAYERS[this.turn];
    const curCast = ludoCast(this.turn);
    const meCast = ludoCast(HUMAN);

    this.el.innerHTML = `
      <div class="game-wrap">
        <div class="board-col">
          <div class="lboard">
            ${cells}
            <div class="lcentre">
              <div class="lc-tri t-up"></div><div class="lc-tri t-right"></div>
              <div class="lc-tri t-down"></div><div class="lc-tri t-left"></div>
              <span class="lc-star">${LU('trophy')}</span>
            </div>
            <div class="ltokens">${tokensHtml}</div>
            ${this.over ? `<div class="board-over">
              <div class="over-card panel clip">
                <div class="over-icon">${this.over.icon}</div>
                <h3>${this.over.title}</h3>
                <p>${this.over.msg}</p>
                <div class="over-xp">+${this.over.xp} XP · +${this.over.coins} 🪙</div>
                <button class="btn btn-primary btn-sm" data-ludo="new">Play Again</button>
              </div></div>` : ''}
          </div>
        </div>

        <div class="side-col">
          <div class="panel clip status-card ${this.turn === HUMAN ? 'go' : 'wait'}">
            <div class="s-label">${this.turn === HUMAN ? meCast.icon + ' Your turn' : curCast.icon + ' ' + curCast.name}</div>
            <div class="s-sub">${esc(this.message)}</div>
          </div>

          <div class="panel clip pad dice-card">
            <div class="mini-head">Dice</div>
            <div class="dice ${this.rolling ? 'spin' : ''}" style="--tc:${cur.color}">${this.dice ? DICE_FACE[this.dice] : '🎲'}</div>
            <button class="btn btn-primary" style="width:100%" data-ludo="roll"
              ${this.turn !== HUMAN || this.busy || this.over ? 'disabled' : ''}>
              ${this.turn === HUMAN ? '🎲 Roll Dice' : 'Waiting…'}
            </button>
          </div>

          <div class="panel clip pad">
            <div class="mini-head">${LU('squads')}</div>
            ${LUDO_PLAYERS.map((p) => {
              const done = this.homeCount(p.id);
              const out = this.tokens[p.id].filter((s) => s >= 0 && s < 56).length;
              const cast = ludoCast(p.id);
              return `<div class="squad-row ${this.turn === p.id ? 'active' : ''}" style="--tc:${p.color}">
                <span class="squad-dot"></span>
                <span class="squad-name">${p.id === HUMAN ? 'You (' + cast.short + ')' : cast.name}</span>
                <span class="squad-stat">${done}/4 🏠 · ${out} out</span>
              </div>`;
            }).join('')}
          </div>

          <div class="panel clip pad">
            <div class="mini-head">How to win</div>
            <ul class="rules">
              <li>Roll a <b>6</b> to move a token out of base.</li>
              <li>Rolling a <b>6</b> gives you another turn.</li>
              <li>Land on an enemy token to <b>knock it home</b> — and take an extra turn.</li>
              <li><b>★</b> and <b>✦</b> squares are safe — nobody can knock you off them.</li>
              <li>You need the <b>exact</b> roll to reach the ${LU('trophy')}.</li>
              <li>First ${LU('squadWord')} to get all <b>4 tokens home</b> wins.</li>
            </ul>
          </div>

          <button class="btn btn-hot btn-sm" data-ludo="new">${C('newGame')}</button>
        </div>
      </div>`;
  },
};
