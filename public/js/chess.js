/* ============================================================
   CHESS - full rules engine + battle-royale themed board
   Board indices: 0 = a8 (top-left) ... 63 = h1 (bottom-right)
   Pieces are 2-char strings: 'wq', 'bp', ... or null.
   ============================================================ */

const ChessEngine = (() => {

  const DIRS = {
    r: [[-1, 0], [1, 0], [0, -1], [0, 1]],
    b: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
    q: [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]],
    n: [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]],
    k: [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]],
  };

  const opp = (c) => (c === 'w' ? 'b' : 'w');

  function initial() {
    const back = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
    const b = new Array(64).fill(null);
    for (let f = 0; f < 8; f++) {
      b[f] = 'b' + back[f];
      b[8 + f] = 'bp';
      b[48 + f] = 'wp';
      b[56 + f] = 'w' + back[f];
    }
    return { b, turn: 'w', cast: { wk: true, wq: true, bk: true, bq: true }, ep: null, half: 0, full: 1 };
  }

  function kingSq(s, c) {
    for (let i = 0; i < 64; i++) if (s.b[i] === c + 'k') return i;
    return -1;
  }

  /** Is `sq` attacked by any piece of colour `by`? */
  function attacked(s, sq, by) {
    const r = sq >> 3, f = sq & 7;

    // Pawns: a white pawn attacking upward sits one rank below the target.
    const pd = by === 'w' ? 1 : -1;
    for (const df of [-1, 1]) {
      const rr = r + pd, ff = f + df;
      if (rr >= 0 && rr < 8 && ff >= 0 && ff < 8 && s.b[rr * 8 + ff] === by + 'p') return true;
    }
    for (const [dr, df] of DIRS.n) {
      const rr = r + dr, ff = f + df;
      if (rr >= 0 && rr < 8 && ff >= 0 && ff < 8 && s.b[rr * 8 + ff] === by + 'n') return true;
    }
    for (const [dr, df] of DIRS.k) {
      const rr = r + dr, ff = f + df;
      if (rr >= 0 && rr < 8 && ff >= 0 && ff < 8 && s.b[rr * 8 + ff] === by + 'k') return true;
    }
    const rays = [[DIRS.r, 'r'], [DIRS.b, 'b']];
    for (const [dirs, t] of rays) {
      for (const [dr, df] of dirs) {
        let rr = r + dr, ff = f + df;
        while (rr >= 0 && rr < 8 && ff >= 0 && ff < 8) {
          const p = s.b[rr * 8 + ff];
          if (p) {
            if (p[0] === by && (p[1] === t || p[1] === 'q')) return true;
            break;
          }
          rr += dr; ff += df;
        }
      }
    }
    return false;
  }

  function pseudo(s, i) {
    const p = s.b[i];
    if (!p) return [];
    const c = p[0], t = p[1];
    const r = i >> 3, f = i & 7;
    const out = [];

    if (t === 'p') {
      const dir = c === 'w' ? -1 : 1;
      const startRank = c === 'w' ? 6 : 1;
      const promoRank = c === 'w' ? 0 : 7;
      const addPawn = (to) => {
        if ((to >> 3) === promoRank) {
          for (const q of ['q', 'r', 'b', 'n']) out.push({ from: i, to, promo: q });
        } else out.push({ from: i, to });
      };
      const r1 = r + dir;
      if (r1 >= 0 && r1 < 8 && !s.b[r1 * 8 + f]) {
        addPawn(r1 * 8 + f);
        const r2 = r + 2 * dir;
        if (r === startRank && !s.b[r2 * 8 + f]) out.push({ from: i, to: r2 * 8 + f, dbl: true });
      }
      for (const df of [-1, 1]) {
        const ff = f + df;
        if (ff < 0 || ff > 7 || r1 < 0 || r1 > 7) continue;
        const j = r1 * 8 + ff, q = s.b[j];
        if (q && q[0] !== c) addPawn(j);
        else if (!q && s.ep === j) out.push({ from: i, to: j, ep: true });
      }
      return out;
    }

    const sliding = t === 'r' || t === 'b' || t === 'q';
    for (const [dr, df] of DIRS[t]) {
      let rr = r + dr, ff = f + df;
      while (rr >= 0 && rr < 8 && ff >= 0 && ff < 8) {
        const j = rr * 8 + ff, q = s.b[j];
        if (q && q[0] === c) break;
        out.push({ from: i, to: j });
        if (q || !sliding) break;
        rr += dr; ff += df;
      }
    }

    if (t === 'k') {
      const rank = c === 'w' ? 7 : 0;
      if (i === rank * 8 + 4) {
        if (s.cast[c + 'k'] && !s.b[rank * 8 + 5] && !s.b[rank * 8 + 6] && s.b[rank * 8 + 7] === c + 'r')
          out.push({ from: i, to: rank * 8 + 6, castle: 'k' });
        if (s.cast[c + 'q'] && !s.b[rank * 8 + 3] && !s.b[rank * 8 + 2] && !s.b[rank * 8 + 1] && s.b[rank * 8 + 0] === c + 'r')
          out.push({ from: i, to: rank * 8 + 2, castle: 'q' });
      }
    }
    return out;
  }

  function apply(s, m) {
    const b = s.b.slice();
    const p = b[m.from];
    const c = p[0], t = p[1];
    const cast = Object.assign({}, s.cast);
    const captured = s.b[m.to] || (m.ep ? opp(c) + 'p' : null);
    let ep = null;

    b[m.from] = null;
    if (m.ep) b[(m.from >> 3) * 8 + (m.to & 7)] = null;
    b[m.to] = m.promo ? c + m.promo : p;

    if (m.castle) {
      const rank = c === 'w' ? 7 : 0;
      if (m.castle === 'k') { b[rank * 8 + 5] = b[rank * 8 + 7]; b[rank * 8 + 7] = null; }
      else { b[rank * 8 + 3] = b[rank * 8 + 0]; b[rank * 8 + 0] = null; }
    }
    if (m.dbl) ep = ((m.from >> 3) + ((m.to >> 3) - (m.from >> 3)) / 2) * 8 + (m.from & 7);

    if (t === 'k') { cast[c + 'k'] = false; cast[c + 'q'] = false; }
    if (t === 'r') {
      const rank = c === 'w' ? 7 : 0;
      if (m.from === rank * 8 + 7) cast[c + 'k'] = false;
      if (m.from === rank * 8 + 0) cast[c + 'q'] = false;
    }
    const oc = opp(c);
    const orank = oc === 'w' ? 7 : 0;
    if (m.to === orank * 8 + 7) cast[oc + 'k'] = false;
    if (m.to === orank * 8 + 0) cast[oc + 'q'] = false;

    return {
      b, turn: oc, cast, ep,
      half: (t === 'p' || captured) ? 0 : s.half + 1,
      full: s.full + (c === 'b' ? 1 : 0),
      captured,
    };
  }

  function legalMoves(s) {
    const c = s.turn, out = [];
    for (let i = 0; i < 64; i++) {
      const p = s.b[i];
      if (!p || p[0] !== c) continue;
      for (const m of pseudo(s, i)) {
        if (m.castle) {
          const rank = c === 'w' ? 7 : 0;
          if (attacked(s, rank * 8 + 4, opp(c))) continue;
          const mid = m.castle === 'k' ? rank * 8 + 5 : rank * 8 + 3;
          if (attacked(s, mid, opp(c))) continue;
        }
        const ns = apply(s, m);
        if (!attacked(ns, kingSq(ns, c), opp(c))) out.push(m);
      }
    }
    return out;
  }

  const inCheck = (s, c) => attacked(s, kingSq(s, c || s.turn), opp(c || s.turn));

  function status(s) {
    const moves = legalMoves(s);
    if (moves.length === 0) return inCheck(s) ? 'checkmate' : 'stalemate';
    if (s.half >= 100) return 'draw50';
    // Insufficient material: bare kings, or king + single minor piece.
    const men = s.b.filter(Boolean);
    if (men.length <= 3 && men.every((p) => 'kbn'.includes(p[1]))) return 'material';
    return 'playing';
  }

  /* ---------------- Evaluation ---------------- */

  const VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };

  /* Piece-square tables, written from White's view (index 0 = a8). */
  const PST = {
    p: [ 0,0,0,0,0,0,0,0, 50,50,50,50,50,50,50,50, 10,10,20,30,30,20,10,10,
         5,5,10,25,25,10,5,5, 0,0,0,20,20,0,0,0, 5,-5,-10,0,0,-10,-5,5,
         5,10,10,-20,-20,10,10,5, 0,0,0,0,0,0,0,0 ],
    n: [ -50,-40,-30,-30,-30,-30,-40,-50, -40,-20,0,0,0,0,-20,-40, -30,0,10,15,15,10,0,-30,
         -30,5,15,20,20,15,5,-30, -30,0,15,20,20,15,0,-30, -30,5,10,15,15,10,5,-30,
         -40,-20,0,5,5,0,-20,-40, -50,-40,-30,-30,-30,-30,-40,-50 ],
    b: [ -20,-10,-10,-10,-10,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,5,10,10,5,0,-10,
         -10,5,5,10,10,5,5,-10, -10,0,10,10,10,10,0,-10, -10,10,10,10,10,10,10,-10,
         -10,5,0,0,0,0,5,-10, -20,-10,-10,-10,-10,-10,-10,-20 ],
    r: [ 0,0,0,0,0,0,0,0, 5,10,10,10,10,10,10,5, -5,0,0,0,0,0,0,-5,
         -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5,
         -5,0,0,0,0,0,0,-5, 0,0,0,5,5,0,0,0 ],
    q: [ -20,-10,-10,-5,-5,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,5,5,5,5,0,-10,
         -5,0,5,5,5,5,0,-5, 0,0,5,5,5,5,0,-5, -10,5,5,5,5,5,0,-10,
         -10,0,5,0,0,0,0,-10, -20,-10,-10,-5,-5,-10,-10,-20 ],
    k: [ -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30,
         -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30,
         -20,-30,-30,-40,-40,-30,-30,-20, -10,-20,-20,-20,-20,-20,-20,-10,
         20,20,0,0,0,20,20,20, 20,30,10,0,0,10,30,20 ],
  };

  function evaluate(s) {
    let score = 0;
    for (let i = 0; i < 64; i++) {
      const p = s.b[i];
      if (!p) continue;
      const v = VAL[p[1]] + PST[p[1]][p[0] === 'w' ? i : (i ^ 56)];
      score += p[0] === 'w' ? v : -v;
    }
    return s.turn === 'w' ? score : -score;
  }

  /** Try captures first so alpha-beta prunes hard. */
  function order(s, moves) {
    for (const m of moves) {
      const victim = s.b[m.to];
      m._s = victim ? VAL[victim[1]] * 10 - VAL[s.b[m.from][1]] : 0;
      if (m.promo === 'q') m._s += 800;
    }
    moves.sort((a, b) => b._s - a._s);
  }

  function negamax(s, depth, alpha, beta) {
    if (depth === 0) return evaluate(s);
    const moves = legalMoves(s);
    if (!moves.length) return inCheck(s) ? -100000 + (10 - depth) : 0;
    order(s, moves);
    let best = -Infinity;
    for (const m of moves) {
      const v = -negamax(apply(s, m), depth - 1, -beta, -alpha);
      if (v > best) best = v;
      if (best > alpha) alpha = best;
      if (alpha >= beta) break;
    }
    return best;
  }

  function bestMove(s, depth, noise) {
    const moves = legalMoves(s);
    if (!moves.length) return null;
    order(s, moves);
    let best = null, bestNoisy = -Infinity, alpha = -Infinity;
    for (const m of moves) {
      const raw = -negamax(apply(s, m), depth - 1, -Infinity, -alpha);
      const noisy = raw + (noise ? (Math.random() * 2 - 1) * noise : 0);
      if (noisy > bestNoisy) { bestNoisy = noisy; best = m; }
      if (raw > alpha) alpha = raw;
    }
    return best;
  }

  return { initial, legalMoves, apply, attacked, kingSq, inCheck, status, bestMove, evaluate, opp, VAL };
})();


/* ============================================================
   CHESS UI
   ============================================================ */

const ChessGame = {
  state: null,
  history: [],
  log: [],
  selected: null,
  targets: [],
  lastMove: null,
  captured: { w: [], b: [] },
  difficulty: 'soldier',
  thinking: false,
  over: null,
  promoPending: null,

  /* Strength only — the names and blurbs are the theme's, see js/theme.js. */
  LEVELS: {
    recruit: { depth: 1, noise: 130 },
    soldier: { depth: 2, noise: 40 },
    elite:   { depth: 3, noise: 0 },
    legend:  { depth: 4, noise: 0 },
  },

  /** Themed name + blurb for a difficulty key. */
  level(k) { return C('levels')[k] || { label: k, blurb: '' }; },

  /* Animation timings in ms. Multiplied by the chosen speed. */
  SPEEDS: {
    chill:  { label: 'Chill',  mult: 1.45 },
    normal: { label: 'Normal', mult: 1 },
    quick:  { label: 'Quick',  mult: 0.6 },
  },
  speed: 'normal',
  animating: false,

  TIMING: {
    glide: 520,     // ordinary move
    lunge: 340,     // attacker charges in
    impact: 480,    // clash + knockout
    settle: 190,    // attacker lands on the square
    thinkMin: 1000, // minimum time the AI appears to think
    thinkVar: 700,
  },

  t(key) { return this.TIMING[key] * this.SPEEDS[this.speed].mult; },

  sq(i) { return String.fromCharCode(97 + (i & 7)) + (8 - (i >> 3)); },

  alive() { return !!(this.el && document.body.contains(this.el)); },

  wait(ms) { return new Promise((r) => setTimeout(r, ms)); },

  /**
   * Wait for an animation, but never longer than the clock says it should take.
   * Browsers freeze Web Animations while a tab is hidden, so `finished` alone
   * can hang forever and leave the move uncommitted.
   */
  settle(anim, ms) {
    return Promise.race([
      anim.finished.catch(() => {}),
      this.wait(ms + 150).then(() => { try { anim.cancel(); } catch { /* already done */ } }),
    ]);
  },

  newGame() {
    this.state = ChessEngine.initial();
    this.history = [];
    this.log = [];
    this.selected = null;
    this.targets = [];
    this.lastMove = null;
    this.captured = { w: [], b: [] };
    this.over = null;
    this.thinking = false;
    this.animating = false;
    this.promoPending = null;
    // Force every square to redraw so the whole board deals in together.
    this.trackedPieces = new Array(64).fill(undefined);
    this.dealing = true;
    this.render();
    setTimeout(() => { this.dealing = false; if (this.boardEl) this.boardEl.classList.remove('dealing'); }, 600);
  },

  mount(el) {
    this.el = el;
    this.animating = false;
    this.thinking = false;
    this.trackedPieces = new Array(64).fill(undefined);
    if (!this.state) this.newGame(); else this.render();
  },

  /* ============ animation ============
     Rendering shows the board BEFORE the move is applied, so the sprites we
     animate are still sitting on their old squares. Once the animation
     finishes, the caller applies the move and re-renders. */

  /** Lift a piece out of the grid into an absolutely positioned clone. */
  makeFly(board, br, fromIdx, piece) {
    const cell = board.querySelector('[data-sq="' + fromIdx + '"]');
    if (!cell) return null;
    const r = cell.getBoundingClientRect();
    const inner = cell.querySelector('.cpiece');
    if (inner) inner.style.visibility = 'hidden';

    const fly = document.createElement('div');
    fly.className = 'fly-piece';
    fly.style.width = r.width + 'px';
    fly.style.height = r.height + 'px';
    fly.style.left = (r.left - br.left) + 'px';
    fly.style.top = (r.top - br.top) + 'px';
    fly.innerHTML = pieceSprite(piece[1], piece[0]);
    board.appendChild(fly);
    return fly;
  },

  offsetBetween(board, from, to) {
    const a = board.querySelector('[data-sq="' + from + '"]');
    const b = board.querySelector('[data-sq="' + to + '"]');
    if (!a || !b) return null;
    const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
    return { dx: rb.left - ra.left, dy: rb.top - ra.top };
  },

  spawnImpact(board, br, sqIdx, color, word) {
    const cell = board.querySelector('[data-sq="' + sqIdx + '"]');
    if (!cell) return;
    const r = cell.getBoundingClientRect();
    const fx = document.createElement('div');
    fx.className = 'impact-fx';
    fx.style.left = (r.left - br.left + r.width / 2) + 'px';
    fx.style.top = (r.top - br.top + r.height / 2) + 'px';
    fx.style.setProperty('--fx', color);
    fx.innerHTML =
      '<span class="fx-flash"></span>' +
      '<span class="fx-ring"></span><span class="fx-ring d2"></span>' +
      '<span class="fx-slash" style="--rot:38deg"></span>' +
      '<span class="fx-slash s2" style="--rot:-52deg"></span>' +
      Array.from({ length: 9 }, (_, i) => '<span class="fx-spark" style="--a:' + (i * 40) + 'deg"></span>').join('') +
      '<span class="fx-word">' + word + '</span>';
    board.appendChild(fx);
    setTimeout(() => fx.remove(), 1000);
  },

  /**
   * Animate one move. `onLand` commits the move to the game state and is
   * called while the flying sprite is still on screen at its destination —
   * so the real piece appears underneath before the clone is removed, with
   * no frame where neither is visible. It always runs exactly once, even if
   * the animation is cut short.
   */
  async animateMove(m, mover, victim, victimSq, onLand) {
    let landed = false;
    const land = () => { if (!landed) { landed = true; if (onLand) onLand(); } };

    if (!this.alive()) return land();
    const board = this.el.querySelector('.cboard');
    if (!board || typeof board.animate !== 'function') return land();

    const br = board.getBoundingClientRect();
    const flies = [];

    const main = this.makeFly(board, br, m.from, mover);
    const mainOff = this.offsetBetween(board, m.from, m.to);
    if (!main || !mainOff) { flies.forEach((f) => f && f.remove()); return land(); }
    flies.push(main);

    // A castling rook travels alongside the king.
    let rookFly = null, rookOff = null;
    if (m.castle) {
      const rank = mover[0] === 'w' ? 7 : 0;
      const rFrom = m.castle === 'k' ? rank * 8 + 7 : rank * 8 + 0;
      const rTo = m.castle === 'k' ? rank * 8 + 5 : rank * 8 + 3;
      rookFly = this.makeFly(board, br, rFrom, mover[0] + 'r');
      rookOff = this.offsetBetween(board, rFrom, rTo);
      if (rookFly) flies.push(rookFly);
    }

    // Commit the move first, then drop the clone: the piece never blinks out.
    const cleanup = () => { land(); flies.forEach((f) => f && f.remove()); };
    const hop = mover[1] === 'n' ? 26 : 0; // knights leap

    try {
      if (!victim) {
        const { dx, dy } = mainOff;
        const dur = this.t('glide');
        const anims = [main.animate([
          { transform: 'translate(0,0) scale(1)' },
          { transform: `translate(${dx * .5}px, ${dy * .5 - hop}px) scale(1.14)`, offset: .5 },
          { transform: `translate(${dx}px, ${dy}px) scale(1)` },
        ], { duration: dur, easing: 'cubic-bezier(.34,.85,.3,1)', fill: 'forwards' })];

        if (rookFly && rookOff) {
          anims.push(rookFly.animate([
            { transform: 'translate(0,0)' },
            { transform: `translate(${rookOff.dx}px, ${rookOff.dy}px)` },
          ], { duration: dur, easing: 'cubic-bezier(.34,.85,.3,1)', fill: 'forwards' }));
        }
        await Promise.all(anims.map((a) => this.settle(a, dur)));
        cleanup();
        return;
      }

      /* ---- Capture: charge, clash, knock out, settle ---- */
      const { dx, dy } = mainOff;
      const victimCell = board.querySelector('[data-sq="' + victimSq + '"]');
      const victimEl = victimCell && victimCell.querySelector('.cpiece');
      const vColor = pieceStyle(victim[1]).accent;

      // 1. Charge in, stopping just short of contact.
      await this.settle(main.animate([
        { transform: 'translate(0,0) scale(1)' },
        { transform: `translate(${dx * .72}px, ${dy * .72 - hop}px) scale(1.2)` },
      ], { duration: this.t('lunge'), easing: 'cubic-bezier(.5,0,.85,.45)', fill: 'forwards' }), this.t('lunge'));

      if (!this.alive()) { cleanup(); return; }

      // 2. Impact. Bigger pieces get a louder callout.
      this.spawnImpact(board, br, victimSq, vColor, C('ko')[victim[1]]);
      board.classList.add('shake');

      if (victimEl) {
        victimEl.classList.add('dying');
        victimEl.animate([
          { transform: 'scale(1) rotate(0deg)', opacity: 1, filter: 'brightness(1)' },
          { transform: 'scale(1.28) rotate(-10deg)', opacity: 1, filter: 'brightness(4) saturate(0)', offset: .16 },
          { transform: 'scale(1.1) rotate(14deg)', opacity: .9, filter: 'brightness(1.6)', offset: .34 },
          { transform: 'scale(.35) rotate(78deg) translateY(22px)', opacity: 0, filter: 'brightness(1)' },
        ], { duration: this.t('impact'), easing: 'cubic-bezier(.4,.1,.7,1)', fill: 'forwards' });
      }

      // 3. Attacker drives through onto the square.
      await this.settle(main.animate([
        { transform: `translate(${dx * .72}px, ${dy * .72 - hop}px) scale(1.2)` },
        { transform: `translate(${dx * .95}px, ${dy * .95}px) scale(1.3)`, offset: .28 },
        { transform: `translate(${dx}px, ${dy}px) scale(1)` },
      ], { duration: this.t('impact'), easing: 'cubic-bezier(.2,.9,.3,1)', fill: 'forwards' }), this.t('impact'));

      board.classList.remove('shake');
      await this.wait(this.t('settle'));
      cleanup();
    } catch {
      cleanup(); // animation interrupted (navigated away, new game, etc.)
    }
  },

  /* ---- rendering ----
     The shell is built once. Every later update touches only what actually
     changed — rebuilding all 64 squares per move made the whole board flicker
     and replayed the entrance animation on all 32 sprites. */

  ROLE: { p: 'Pawn', n: 'Knight', b: 'Bishop', r: 'Rook', q: 'Queen', k: 'King' },

  render() {
    if (!this.alive()) return;
    if (!this.el.querySelector('.cboard')) this.buildShell();
    this.syncBoard();
    this.syncPanels();
  },

  buildShell() {
    let squares = '';
    for (let i = 0; i < 64; i++) {
      const r = i >> 3, f = i & 7;
      squares += `<div class="csq ${(r + f) % 2 ? 'dark' : 'light'}" data-sq="${i}">
        ${f === 0 ? `<span class="coord rank">${8 - r}</span>` : ''}
        ${r === 7 ? `<span class="coord file">${String.fromCharCode(97 + f)}</span>` : ''}
        <div class="piece-slot"></div>
      </div>`;
    }

    this.el.innerHTML = `
      <div class="game-wrap">
        <div class="board-col">
          <div class="cboard">${squares}<div class="board-over-host"></div></div>
        </div>

        <div class="side-col">
          <div class="panel clip status-card" data-c="status"></div>

          <div class="panel clip pad">
            <div class="mini-head">${C('diff')}</div>
            <div class="diff-row">
              ${Object.keys(this.LEVELS).map((k) => {
                const lv = this.level(k);
                return `<button class="diff-btn" data-diff="${k}"><b>${lv.label}</b><span>${lv.blurb}</span></button>`;
              }).join('')}
            </div>
          </div>

          <div class="panel clip pad">
            <div class="mini-head">${C('speedHead')}</div>
            <div class="speed-row">
              ${Object.entries(this.SPEEDS).map(([k, v]) => `
                <button class="speed-btn" data-speed="${k}">${v.label}</button>`).join('')}
            </div>
          </div>

          <div class="panel clip pad">
            <div class="mini-head">${C('tray')}</div>
            <div class="tray-row" data-c="trays"></div>
          </div>

          <div class="panel clip pad">
            <div class="mini-head">${C('log')}</div>
            <div class="move-log" data-c="log"></div>
          </div>

          <div class="row gap-8">
            <button class="btn btn-ghost btn-sm" data-chess="undo">↶ Undo</button>
            <button class="btn btn-hot btn-sm" data-chess="new">${C('newGame')}</button>
          </div>
        </div>
      </div>

      <div data-c="modal"></div>

      <div class="section-head" style="margin-top:30px"><h2>${C('squad')}</h2><div class="rule"></div>
        <span class="pill">${C('squadHint')}</span></div>
      <div class="roster">${ROSTER_ORDER.map((t) => {
        const st = pieceStyle(t);
        return `<div class="panel clip roster-card" style="--rarity:var(--r-${st.rarity})">
          <div class="roster-art">${pieceSprite(t, 'w')}</div>
          <span class="rarity-tag" style="--rarity:var(--r-${st.rarity})">${rarityLabel(st.rarity)}</span>
          <h4>${st.name}</h4>
          <div class="roster-piece">${PIECE_GLYPH[t]} ${this.ROLE[t]}</div>
          <p>${pieceLore(t)}</p>
        </div>`;
      }).join('')}</div>`;

    this.cells = Array.from(this.el.querySelectorAll('.csq'));
    this.boardEl = this.el.querySelector('.cboard');
    this.trackedPieces = new Array(64).fill(null);
  },

  syncBoard() {
    const s = this.state;
    const checkSq = ChessEngine.inCheck(s, s.turn) ? ChessEngine.kingSq(s, s.turn) : -1;
    if (this.boardEl) this.boardEl.classList.toggle('dealing', !!this.dealing);

    for (let i = 0; i < 64; i++) {
      const cell = this.cells[i];
      if (!cell) continue;
      const r = i >> 3, f = i & 7;
      const p = s.b[i];
      const isTarget = this.targets.some((m) => m.to === i);
      const cls = [
        'csq', (r + f) % 2 ? 'dark' : 'light',
        this.selected === i ? 'sel' : '',
        isTarget ? (p ? 'capture' : 'target') : '',
        this.lastMove && (this.lastMove.from === i || this.lastMove.to === i) ? 'last' : '',
        i === checkSq ? 'check' : '',
      ].filter(Boolean).join(' ');
      if (cell.className !== cls) cell.className = cls;

      // Only rewrite a square's sprite when the piece standing on it changed.
      if (this.trackedPieces[i] !== p) {
        this.trackedPieces[i] = p;
        const slot = cell.querySelector('.piece-slot');
        if (slot) {
          slot.innerHTML = p
            ? `<div class="cpiece ${p[0] === 'w' ? 'mine' : 'foe'} rar-${pieceStyle(p[1]).rarity}">${pieceSprite(p[1], p[0])}</div>`
            : '';
        }
      }
    }
  },

  syncPanels() {
    const q = (name) => this.el.querySelector('[data-c="' + name + '"]');

    const status = q('status');
    if (status) {
      status.className = 'panel clip status-card ' + this.statusKind();
      status.innerHTML =
        '<div class="s-label">' + (this.thinking
          ? C('thinking') + '<span class="thinking-dots"><i></i><i></i><i></i></span>'
          : this.statusLabel()) + '</div>' +
        '<div class="s-sub">' + this.statusSub() + '</div>';
    }

    this.el.querySelectorAll('[data-diff]').forEach((b) => b.classList.toggle('on', b.dataset.diff === this.difficulty));
    this.el.querySelectorAll('[data-speed]').forEach((b) => b.classList.toggle('on', b.dataset.speed === this.speed));

    const trays = q('trays');
    const trayKey = this.captured.b.join('') + '|' + this.captured.w.join('');
    if (trays && trays.dataset.key !== trayKey) {
      trays.dataset.key = trayKey;
      const tray = (list, side, label) =>
        `<div class="tray"><span class="tray-lbl">${label}</span><div class="tray-pieces">${
          list.map((t) => `<span class="tiny-sprite rar-${pieceStyle(t).rarity}">${pieceSprite(t, side, { glow: false })}</span>`).join('')
          || '<span class="tray-none">—</span>'}</div></div>`;
      trays.innerHTML = tray(this.captured.b, 'b', C('trayYou')) + tray(this.captured.w, 'w', C('trayFoe'));
    }

    const log = q('log');
    if (log && log.dataset.n !== String(this.log.length)) {
      log.dataset.n = String(this.log.length);
      log.innerHTML = this.log.length
        ? this.log.map((m, i) => `<div class="move-line ${i === this.log.length - 1 ? 'now' : ''}"><span class="mn">${Math.floor(i / 2) + 1}.</span> ${m}</div>`).reverse().join('')
        : '<div class="tray-none">' + C('noMoves') + '</div>';
    }

    const undo = this.el.querySelector('[data-chess="undo"]');
    if (undo) undo.disabled = this.history.length < 2 || this.thinking || this.animating;

    const modal = q('modal');
    const modalKey = this.promoPending ? 'promo' : '';
    if (modal && modal.dataset.key !== modalKey) {
      modal.dataset.key = modalKey;
      modal.innerHTML = this.promoPending ? this.promoModal() : '';
    }

    const host = this.el.querySelector('.board-over-host');
    const overKey = this.over ? this.over.title : '';
    if (host && host.dataset.key !== overKey) {
      host.dataset.key = overKey;
      host.innerHTML = this.over ? `<div class="board-over">
        <div class="over-card panel clip">
          <div class="over-icon">${this.over.icon}</div>
          <h3>${this.over.title}</h3>
          <p>${this.over.msg}</p>
          ${this.over.xp ? `<div class="over-xp">+${this.over.xp} XP${this.over.coins ? ` · +${this.over.coins} 🪙` : ''}</div>` : ''}
          <button class="btn btn-primary btn-sm" data-chess="new">Play Again</button>
        </div></div>` : '';
    }
  },

  statusKind() {
    if (this.over) return this.over.kind;
    if (this.animating) return this.state.turn === 'w' ? 'go' : 'wait';
    if (ChessEngine.inCheck(this.state, this.state.turn)) return 'warn';
    return this.state.turn === 'w' ? 'go' : 'wait';
  },
  statusLabel() {
    if (this.over) return this.over.title;
    if (this.animating) return this.state.turn === 'w' ? C('moving') : C('incoming');
    if (ChessEngine.inCheck(this.state, this.state.turn))
      return this.state.turn === 'w' ? C('youCheck') : C('foeCheck');
    return this.state.turn === 'w' ? C('yourMove') : C('foeMove');
  },
  statusSub() {
    if (this.over) return this.over.msg;
    if (this.animating) return C('holdStill');
    const n = ChessEngine.legalMoves(this.state).length;
    return this.state.turn === 'w' ? C('moves').replace('{n}', n) : C('holdOn');
  },

  promoModal() {
    return `<div class="modal-back"><div class="panel clip modal promo-modal">
      <h3>${C('promoTitle')}</h3>
      <p class="muted" style="font-size:14px;margin-top:6px">${C('promoSub')}</p>
      <div class="promo-row">
        ${['q', 'r', 'b', 'n'].map((t) => {
          const st = pieceStyle(t);
          return `<button class="promo-pick" data-promo="${t}" style="--rarity:var(--r-${st.rarity})">
            <div class="promo-art">${pieceSprite(t, 'w')}</div>
            <b>${st.name}</b>
            <span>${rarityLabel(st.rarity)}</span>
          </button>`;
        }).join('')}
      </div>
    </div></div>`;
  },

  /* ---- interaction ---- */

  click(i) {
    if (this.over || this.thinking || this.animating || this.promoPending) return;
    const s = this.state;
    if (s.turn !== 'w') return;

    const hit = this.targets.find((m) => m.to === i);
    if (hit) {
      const promos = this.targets.filter((m) => m.to === i && m.promo);
      if (promos.length) { this.promoPending = promos; this.render(); return; }
      this.play(hit);
      return;
    }

    const p = s.b[i];
    if (p && p[0] === 'w') {
      this.selected = i;
      this.targets = ChessEngine.legalMoves(s).filter((m) => m.from === i);
    } else {
      this.selected = null;
      this.targets = [];
    }
    this.render();
  },

  choosePromo(t) {
    const m = this.promoPending.find((x) => x.promo === t);
    this.promoPending = null;
    this.play(m);
  },

  /** Square the captured piece actually stands on (differs for en passant). */
  victimSquare(m) { return m.ep ? (m.from >> 3) * 8 + (m.to & 7) : m.to; },

  /** Animate a move, then commit it to the game state. */
  async commit(m) {
    const s = this.state;
    const mover = s.b[m.from];
    const vSq = this.victimSquare(m);
    const victim = s.b[vSq];

    this.animating = true;
    this.render();

    // Runs at the moment the sprite lands, underneath the still-visible clone.
    const applyMove = () => {
      const ns = ChessEngine.apply(s, m);
      if (victim) this.captured[victim[0]].push(victim[1]);
      this.state = ns;
      this.lastMove = m;
      this.log.push(this.notate(m, mover, victim, ns));
      this.animating = false;
      this.render();
    };

    await this.animateMove(m, mover, victim, vSq, applyMove);
    if (!this.alive()) { this.animating = false; return null; }
    return { victim, mover };
  },

  async play(m) {
    if (this.animating) return;
    this.history.push({
      state: this.state,
      log: this.log.slice(),
      captured: { w: this.captured.w.slice(), b: this.captured.b.slice() },
      lastMove: this.lastMove,
    });
    this.selected = null;
    this.targets = [];
    const res = await this.commit(m);
    if (!res) return;
    if (res.victim && typeof toast === 'function') {
      toast(C('youHit').replace('{name}', pieceStyle(res.victim[1]).name));
    }
    await this.afterMove();
  },

  notate(m, mover, victim, ns) {
    if (m.castle) return m.castle === 'k' ? '🏰 O-O' : '🏰 O-O-O';
    const glyph = PIECE_GLYPH[mover[1]];
    const mark = ChessEngine.status(ns) === 'checkmate' ? '#' : ChessEngine.inCheck(ns, ns.turn) ? '+' : '';
    return `${glyph} ${this.sq(m.from)}${victim ? '×' : '→'}${this.sq(m.to)}${m.promo ? '=' + PIECE_GLYPH[m.promo] : ''}${mark}`;
  },

  async afterMove() {
    const st = ChessEngine.status(this.state);
    if (st !== 'playing') { this.finish(st); this.render(); return; }
    if (this.state.turn !== 'b') { this.render(); return; }

    // --- enemy turn ---
    this.thinking = true;
    this.render();

    const lv = this.LEVELS[this.difficulty];
    const t0 = Date.now();
    const m = ChessEngine.bestMove(this.state, lv.depth, lv.noise);
    // The search finishes in well under 100ms, so hold the "thinking" beat
    // long enough that the move reads as a decision rather than a twitch.
    const target = this.t('thinkMin') + Math.random() * this.t('thinkVar');
    await this.wait(Math.max(160, target - (Date.now() - t0)));

    if (!this.alive()) return;
    this.thinking = false;
    if (!m) { this.finish(ChessEngine.status(this.state)); this.render(); return; }

    const res = await this.commit(m);
    if (!res) return;
    if (res.victim && typeof toast === 'function') {
      toast(C('foeHit').replace('{name}', pieceStyle(res.victim[1]).name));
    }

    const st2 = ChessEngine.status(this.state);
    if (st2 !== 'playing') this.finish(st2);
    this.render();
  },

  finish(st) {
    const loser = this.state.turn; // side to move has no moves
    if (st === 'checkmate') {
      const r = loser === 'b' ? C('win') : C('loss');
      this.over = loser === 'b'
        ? { kind: 'win', icon: r.icon, title: r.title, msg: r.msg, xp: 200, coins: 50 }
        : { kind: 'loss', icon: r.icon, title: r.title, msg: r.msg, xp: 30, coins: 0 };
    } else if (st === 'stalemate') {
      const r = C('stale');
      this.over = { kind: 'draw', icon: r.icon, title: r.title, msg: r.msg, xp: 70, coins: 15 };
    } else {
      const r = C('draw');
      this.over = { kind: 'draw', icon: r.icon, title: r.title, xp: 70, coins: 15,
        msg: st === 'draw50' ? '50 moves with no captures or pawn moves.' : 'Not enough pieces left to checkmate.' };
    }
    if (this.over.xp && typeof addXp === 'function') {
      addXp(this.over.xp, '♟️ Chess: ' + this.over.title);
      if (this.over.coins) addCoins(this.over.coins);
    }
  },

  undo() {
    // Step back past the AI reply as well, so it is the player's turn again.
    if (this.history.length < 2 || this.animating || this.thinking) return;
    this.history.pop();
    const prev = this.history.pop();
    this.state = prev.state;
    this.log = prev.log;
    this.captured = prev.captured;
    this.lastMove = prev.lastMove;
    this.selected = null;
    this.targets = [];
    this.over = null;
    this.render();
  },
};
