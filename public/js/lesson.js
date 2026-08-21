/* ============================================================
   LESSON PLAYER — teaching view + auto-graded exercise runner
   Question types: mcq, input, tf, match
   ============================================================ */

/* ---------------- progress helpers ---------------- */

function subjectStore(sid) {
  state.subjects[sid] = state.subjects[sid] || {};
  const s = state.subjects[sid];
  s.done = s.done || [];      // units passed (60%+)
  s.read = s.read || [];      // lessons read at least once
  s.scores = s.scores || {};  // unitId -> best percentage
  return s;
}

function unitsOf(sid) {
  return (CURRICULUM[sid] && CURRICULUM[sid].units) || [];
}

function findUnit(sid, uid) {
  return unitsOf(sid).find((u) => u.id === uid) || null;
}

function subjectProgress(sid) {
  const units = unitsOf(sid);
  const s = subjectStore(sid);
  const done = units.filter((u) => s.done.includes(u.id)).length;
  return { done, total: units.length, pct: units.length ? Math.round(done / units.length * 100) : 0 };
}

/* Total questions across the whole curriculum — used on the home page. */
function curriculumTotals() {
  let units = 0, questions = 0;
  Object.keys(CURRICULUM).forEach((sid) => {
    unitsOf(sid).forEach((u) => { units++; questions += u.questions.length; });
  });
  return { units, questions, subjects: Object.keys(CURRICULUM).length };
}

/* ---------------- shared utils ---------------- */

function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Loose answer matching — ignores case, spaces, commas and currency symbols. */
function normAns(s) {
  const v = String(s).toLowerCase().trim()
    .replace(/[₹$]/g, '')
    .replace(/,/g, '')
    .replace(/\s+/g, ' ');
  // Drop trailing punctuation — unless that IS the answer (e.g. "." or "!").
  const trimmed = v.replace(/[.!?]+$/, '');
  return trimmed === '' ? v : trimmed;
}

const XP_PER_CORRECT = 8;
const XP_LESSON_READ = 15;


/* ============================================================
   LESSON (teaching) VIEW
   ============================================================ */

const LessonView = {
  render(sid, uid) {
    const subject = SUBJECTS.find((s) => s.id === sid);
    const unit = findUnit(sid, uid);
    if (!unit) return '<div class="notice">That lesson could not be found.</div>';
    const store = subjectStore(sid);
    const deva = CURRICULUM[sid] && CURRICULUM[sid].deva ? ' deva' : '';

    const blocks = unit.lesson.map((b) => {
      if (b.tip) return `<div class="teach-tip${deva}"><span class="tip-ico">💡</span><div>${b.tip}</div></div>`;
      if (b.table) {
        return `<div class="teach-card${deva}"><div class="table-wrap"><table class="teach-table">
          <thead><tr>${b.table.head.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${b.table.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div></div>`;
      }
      return `<div class="teach-card${deva}">
        ${b.h ? `<h4>${b.h}</h4>` : ''}
        ${b.p ? `<p>${b.p}</p>` : ''}
        ${b.eg ? `<ul class="teach-eg">${b.eg.map((e) => `<li>${e}</li>`).join('')}</ul>` : ''}
      </div>`;
    }).join('');

    const best = store.scores[uid];

    return `
      <button class="back-link" data-route="subject" data-param="${sid}">← ${esc(subject.name)}</button>

      <div class="panel clip unit-banner" style="--rarity:var(--r-${subject.rarity})">
        <div class="big-icon">${unit.icon}</div>
        <div style="flex:1">
          <div class="unit-kicker">${esc(subject.name)} · ${CURRICULUM[sid].grade}</div>
          <h2 class="${deva}">${unit.title}</h2>
          <div class="unit-goal${deva}">${unit.goal}</div>
        </div>
        <div class="unit-badges">
          <span class="pill">${unit.questions.length} questions</span>
          ${best != null ? `<span class="pill hi-ok">Best ${best}%</span>` : ''}
        </div>
      </div>

      <div class="section-head"><h2>${T('lesson.learn')}</h2><div class="rule"></div></div>
      <div class="teach-wrap">${blocks}</div>

      <div class="start-bar panel clip">
        <div>
          <h3>${T('lesson.ready')}</h3>
          <p class="muted tiny" style="margin-top:4px">${unit.questions.length} questions · ${XP_PER_CORRECT} ${T('xp.word')} each · bonus ${T('xp.word')} for a high score</p>
        </div>
        <button class="btn btn-primary" data-quiz-start="${sid}|${uid}">${T('lesson.start')}</button>
      </div>`;
  },

  /* Reading a lesson is worth a small one-time reward. */
  markRead(sid, uid) {
    const store = subjectStore(sid);
    if (store.read.includes(uid)) return;
    store.read.push(uid);
    save();
    const unit = findUnit(sid, uid);
    if (typeof addXp === 'function') addXp(XP_LESSON_READ, '📖 Read: ' + (unit ? unit.title : uid));
  },
};


/* ============================================================
   QUIZ RUNNER
   ============================================================ */

const Quiz = {
  sid: null, uid: null, unit: null,
  qs: [], idx: 0, answers: [], checked: false, lastCorrect: false,
  picked: null,        // mcq / tf selection
  matchState: null,    // { order, assigned, selectedLeft }
  finished: false,
  oly: null,           // { sid, pid, paper, timed } when running an Olympiad mock
  endsAt: null,        // timestamp the timer runs out
  timerId: null,

  start(sid, uid) {
    const unit = findUnit(sid, uid);
    if (!unit) return;
    this.stopTimer();
    this.oly = null;
    this.sid = sid; this.uid = uid; this.unit = unit;
    // Shuffle the questions, and shuffle MCQ options while tracking the answer.
    this.qs = shuffled(unit.questions).map((q) => {
      if (q.t !== 'mcq') return Object.assign({}, q);
      const order = shuffled(q.o.map((_, i) => i));
      return Object.assign({}, q, {
        o: order.map((i) => q.o[i]),
        a: order.indexOf(q.a),
      });
    });
    this.idx = 0; this.answers = []; this.checked = false;
    this.picked = null; this.matchState = null; this.finished = false;
  },

  /**
   * Run an Olympiad mock paper. Questions keep their published order so the
   * three sections stay together, exactly like the real paper.
   */
  startOlympiad(sid, pid, timed) {
    const paper = (OLYMPIAD_PAPERS[sid] || []).find((p) => p.id === pid);
    if (!paper) return;
    this.stopTimer();
    this.oly = { sid, pid, paper, timed: !!timed };
    this.sid = sid; this.uid = pid; this.unit = { title: paper.title, questions: paper.questions };
    this.qs = paper.questions.map((q) => Object.assign({}, q));
    this.idx = 0; this.answers = []; this.checked = false;
    this.picked = null; this.matchState = null; this.finished = false;
    this.endsAt = timed ? Date.now() + OLYMPIAD.pattern.minutesOnline * 60000 : null;
  },

  /* ---------- exam timer ---------- */

  stopTimer() {
    clearInterval(this.timerId);
    this.timerId = null;
    this.endsAt = null;
  },

  startTimer() {
    clearInterval(this.timerId);
    if (!this.endsAt) return;
    this.timerId = setInterval(() => {
      if (!this.alive() || this.finished) { clearInterval(this.timerId); this.timerId = null; return; }
      const left = this.endsAt - Date.now();
      const el = document.getElementById('quizTimer');
      if (el) {
        el.textContent = '⏱️ ' + this.clock(left);
        el.classList.toggle('low', left < 5 * 60000);
      }
      if (left <= 0) {
        clearInterval(this.timerId);
        this.timerId = null;
        toast("⏱️ Time's up — paper submitted.");
        this.finish();
      }
    }, 1000);
  },

  clock(ms) {
    const s = Math.max(0, Math.round(ms / 1000));
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  },

  mount(el) {
    this.el = el;
    if (!this.unit) return;
    this.render();
    this.startTimer();
  },

  alive() { return !!(this.el && document.body.contains(this.el)); },

  cur() { return this.qs[this.idx]; },

  /* ---------- grading ---------- */

  grade() {
    const q = this.cur();
    if (q.t === 'mcq') return this.picked === q.a;
    if (q.t === 'tf') return this.picked === (q.a ? 1 : 0);
    if (q.t === 'input') {
      const el = this.el.querySelector('#answerInput');
      const given = normAns(el ? el.value : '');
      if (!given) return null; // nothing typed yet
      return q.a.some((acc) => normAns(acc) === given);
    }
    if (q.t === 'match') {
      const ms = this.matchState;
      if (!ms) return null;
      if (Object.keys(ms.assigned).length < q.pairs.length) return null;
      return q.pairs.every((_, i) => this.matchRowOk(q, ms, i));
    }
    return null;
  },

  /**
   * Compare the chosen card by its TEXT, not its position. Categorisation
   * questions legitimately repeat a label ("Input", "क्रिया"), and picking
   * either identical card must count as right.
   */
  matchRowOk(q, ms, i) {
    const pos = ms.assigned[i];
    if (pos === undefined) return false;
    return q.pairs[ms.order[pos]][1] === q.pairs[i][1];
  },

  canCheck() {
    const q = this.cur();
    if (q.t === 'mcq' || q.t === 'tf') return this.picked !== null;
    if (q.t === 'input') {
      const el = this.el && this.el.querySelector('#answerInput');
      return !!(el && el.value.trim());
    }
    if (q.t === 'match') return this.matchState && Object.keys(this.matchState.assigned).length === q.pairs.length;
    return false;
  },

  check() {
    if (this.checked || !this.canCheck()) return;
    const ok = this.grade();
    if (ok === null) return;
    this.checked = true;
    this.lastCorrect = ok;
    this.answers[this.idx] = ok;
    if (ok && typeof floatXp === 'function') floatXp('+' + XP_PER_CORRECT + ' XP');
    if (!ok && this.oly) this.logError();
    this.render();
  },

  /** Wrong answers in a mock go straight into the Error Book. */
  logError() {
    const q = this.cur();
    const o = OlympiadView.store();
    const chose = q.t === 'mcq' ? q.o[this.picked]
      : q.t === 'tf' ? (this.picked ? 'True' : 'False')
      : q.t === 'input' ? ((this.el.querySelector('#answerInput') || {}).value || '—')
      : 'wrong pairing';
    o.errors = o.errors.filter((e) => !(e.sid === this.oly.sid && e.pid === this.oly.pid && e.qi === this.idx));
    o.errors.unshift({
      sid: this.oly.sid, pid: this.oly.pid, qi: this.idx,
      q: q.q, chose: String(chose), right: this.correctText(q), why: q.why || '',
      at: new Date().toISOString(),
    });
    o.errors = o.errors.slice(0, 60);
    save();
  },

  next() {
    if (!this.checked) return;
    if (this.idx >= this.qs.length - 1) { this.finish(); return; }
    this.idx++;
    this.checked = false;
    this.picked = null;
    this.matchState = null;
    this.render();
  },

  finish() {
    if (this.oly) return this.finishOlympiad();
    const total = this.qs.length;
    const right = this.answers.filter(Boolean).length;
    const pct = Math.round(right / total * 100);
    const store = subjectStore(this.sid);

    const prevBest = store.scores[this.uid];
    if (prevBest == null || pct > prevBest) store.scores[this.uid] = pct;
    const passed = pct >= 60;
    if (passed && !store.done.includes(this.uid)) store.done.push(this.uid);

    let bonusXp = 0, coins = 0;
    if (pct === 100) { bonusXp = 50; coins = 20; }
    else if (pct >= 80) { bonusXp = 30; coins = 10; }
    else if (pct >= 60) { bonusXp = 15; coins = 5; }

    const earnedXp = right * XP_PER_CORRECT + bonusXp;
    this.result = { right, total, pct, bonusXp, coins, earnedXp, passed, firstTime: prevBest == null };

    save();
    if (typeof addXp === 'function' && earnedXp > 0) {
      addXp(earnedXp, '✅ ' + this.unit.title + ' — ' + pct + '%');
      if (coins) addCoins(coins);
    }
    this.finished = true;
    this.render();
  },

  /** Score a mock paper: overall, plus a percentage for each of the 3 sections. */
  finishOlympiad() {
    this.stopTimer();
    const total = this.qs.length;
    const right = this.answers.filter(Boolean).length;
    const pct = Math.round(right / total * 100);

    const secs = {};
    ['core', 'lr', 'hots'].forEach((k) => {
      const idxs = this.qs.map((q, i) => (q.sec === k ? i : -1)).filter((i) => i > -1);
      if (!idxs.length) return;
      const got = idxs.filter((i) => this.answers[i]).length;
      secs[k] = Math.round(got / idxs.length * 100);
    });

    const o = OlympiadView.store();
    const key = this.oly.sid + '|' + this.oly.pid;
    const prev = o.attempts[key];
    o.attempts[key] = {
      best: prev ? Math.max(prev.best, pct) : pct,
      last: pct,
      secs: (!prev || pct >= prev.best) ? secs : prev.secs,
      lastSecs: secs,
      n: (prev ? prev.n : 0) + 1,
      at: new Date().toISOString(),
      timed: this.oly.timed,
    };

    // Mock papers pay the same per-answer XP, with a bonus for a strong score.
    let bonusXp = 0, coins = 0;
    if (pct === 100) { bonusXp = 80; coins = 30; }
    else if (pct >= 80) { bonusXp = 50; coins = 15; }
    else if (pct >= 60) { bonusXp = 25; coins = 8; }

    const earnedXp = right * XP_PER_CORRECT + bonusXp;
    this.result = { right, total, pct, bonusXp, coins, earnedXp, secs, passed: pct >= 60 };

    save();
    if (typeof addXp === 'function' && earnedXp > 0) {
      addXp(earnedXp, '🇮🇳 ' + this.oly.paper.title + ' — ' + pct + '%');
      if (coins) addCoins(coins);
    }
    this.finished = true;
    this.render();
  },

  retry() {
    if (this.oly) {
      const { sid, pid, timed } = this.oly;
      this.startOlympiad(sid, pid, timed);
      this.render();
      this.startTimer();
      return;
    }
    this.start(this.sid, this.uid);
    this.render();
  },

  /* ---------- interaction ---------- */

  pick(i) {
    if (this.checked) return;
    this.picked = i;
    this.render();
  },

  matchInit() {
    const q = this.cur();
    if (this.matchState) return;
    this.matchState = {
      order: shuffled(q.pairs.map((_, i) => i)), // position -> original pair index
      assigned: {},                              // leftIndex -> position in order
      selectedLeft: null,
    };
  },

  matchPickLeft(i) {
    if (this.checked) return;
    this.matchInit();
    // Tapping an already-filled row clears it so it can be redone.
    if (this.matchState.assigned[i] !== undefined) {
      delete this.matchState.assigned[i];
      this.matchState.selectedLeft = i;
    } else {
      this.matchState.selectedLeft = this.matchState.selectedLeft === i ? null : i;
    }
    this.render();
  },

  matchPickRight(pos) {
    if (this.checked) return;
    this.matchInit();
    const ms = this.matchState;
    if (ms.selectedLeft === null) return;
    if (Object.values(ms.assigned).includes(pos)) return; // already used
    ms.assigned[ms.selectedLeft] = pos;
    ms.selectedLeft = null;
    this.render();
  },

  /* ---------- rendering ---------- */

  render() {
    if (!this.alive()) return;
    if (this.finished) { this.el.innerHTML = this.resultsHtml(); return; }

    const q = this.cur();
    const deva = CURRICULUM[this.sid] && CURRICULUM[this.sid].deva ? ' deva' : '';
    const pct = Math.round(this.idx / this.qs.length * 100);
    const subject = SUBJECTS.find((s) => s.id === this.sid);

    let body = '';
    if (q.t === 'mcq') body = this.mcqHtml(q, deva);
    else if (q.t === 'tf') body = this.tfHtml(q);
    else if (q.t === 'input') body = this.inputHtml(q);
    else if (q.t === 'match') body = this.matchHtml(q, deva);

    const rightSoFar = this.answers.filter(Boolean).length;
    const oly = this.oly ? OlympiadView.subject(this.oly.sid) : null;
    const sec = this.oly && q.sec ? OLYMPIAD.sections[q.sec] : null;

    this.el.innerHTML = `
      <div class="quiz-top">
        ${this.oly
          ? `<button class="back-link" data-route="olysubject" data-param="${this.oly.sid}">← Leave the paper</button>`
          : `<button class="back-link" data-route="unit" data-param="${this.sid}|${this.uid}">← Back to the lesson</button>`}
        <div class="quiz-meta">
          ${this.oly
            ? `<span class="pill">${oly.icon} ${esc(oly.code)}</span>
               ${sec ? `<span class="pill sec-pill">${sec.icon} ${esc(sec.label)}</span>` : ''}
               ${this.endsAt ? `<span class="pill quiz-timer" id="quizTimer">⏱️ ${this.clock(this.endsAt - Date.now())}</span>` : ''}`
            : `<span class="pill">${subject.icon} ${esc(subject.name)}</span>`}
          <span class="pill hi-ok">✓ ${rightSoFar}</span>
        </div>
      </div>

      <div class="quiz-progress">
        <div class="qp-label"><b>Question ${this.idx + 1}</b> of ${this.qs.length}</div>
        <div class="xpbar"><span style="width:${pct}%"></span></div>
      </div>

      <div class="panel clip qcard ${this.checked ? (this.lastCorrect ? 'is-right' : 'is-wrong') : ''}">
        <div class="qtype">${sec ? sec.icon + ' ' + esc(sec.label) + ' · ' : ''}${this.typeLabel(q.t)}</div>
        <h3 class="qtext${deva}">${q.q}</h3>
        ${body}
        ${this.checked ? `
          <div class="feedback ${this.lastCorrect ? 'good' : 'bad'}">
            <div class="fb-head">${this.lastCorrect ? '✅ Correct! +' + XP_PER_CORRECT + ' XP' : '❌ Not quite'}</div>
            ${!this.lastCorrect ? `<div class="fb-answer${deva}">Answer: <b>${this.correctText(q)}</b></div>` : ''}
            ${q.why ? `<div class="fb-why${deva}">${q.why}</div>` : ''}
          </div>` : ''}
        <div class="qactions">
          ${this.checked
            ? `<button class="btn btn-primary" data-quiz="next">${this.idx >= this.qs.length - 1 ? T('quiz.results') : 'Next Question →'}</button>`
            : `<button class="btn btn-primary" data-quiz="check" ${this.canCheck() ? '' : 'disabled'}>Check Answer</button>`}
        </div>
      </div>`;

    const input = this.el.querySelector('#answerInput');
    if (input && !this.checked) input.focus();
  },

  typeLabel(t) {
    return { mcq: 'Choose one', tf: 'True or False', input: 'Type your answer', match: 'Match the pairs' }[t] || '';
  },

  correctText(q) {
    if (q.t === 'mcq') return q.o[q.a];
    if (q.t === 'tf') return q.a ? 'True' : 'False';
    if (q.t === 'input') return q.a[0];
    if (q.t === 'match') return q.pairs.map((p) => p[0] + ' → ' + p[1]).join(' · ');
    return '';
  },

  mcqHtml(q, deva) {
    return `<div class="opts">${q.o.map((o, i) => {
      const sel = this.picked === i;
      let cls = 'opt';
      if (this.checked) {
        if (i === q.a) cls += ' correct';
        else if (sel) cls += ' wrong';
      } else if (sel) cls += ' sel';
      return `<button class="${cls}${deva}" data-opt="${i}">
        <span class="opt-key">${String.fromCharCode(65 + i)}</span><span class="opt-text">${o}</span>
      </button>`;
    }).join('')}</div>`;
  },

  tfHtml(q) {
    const correctIdx = q.a ? 1 : 0;
    return `<div class="opts tf-opts">${['False', 'True'].map((label, i) => {
      const sel = this.picked === i;
      let cls = 'opt tf';
      if (this.checked) {
        if (i === correctIdx) cls += ' correct';
        else if (sel) cls += ' wrong';
      } else if (sel) cls += ' sel';
      return `<button class="${cls}" data-opt="${i}">
        <span class="tf-ico">${i ? '✔' : '✘'}</span><span class="opt-text">${label}</span>
      </button>`;
    }).join('')}</div>`;
  },

  inputHtml(q) {
    const val = this.checked ? (this.el.querySelector('#answerInput') || {}).value || '' : '';
    return `<div class="input-wrap">
      <input id="answerInput" type="text" autocomplete="off" spellcheck="false"
             placeholder="Type your answer here…" value="${esc(val)}"
             ${this.checked ? 'disabled' : ''} />
    </div>`;
  },

  matchHtml(q, deva) {
    this.matchInit();
    const ms = this.matchState;
    const usedPositions = Object.values(ms.assigned);

    const left = q.pairs.map((p, i) => {
      const pos = ms.assigned[i];
      const filled = pos !== undefined;
      let cls = 'match-row';
      if (ms.selectedLeft === i) cls += ' picking';
      if (filled) cls += ' filled';
      if (this.checked && filled) cls += this.matchRowOk(q, ms, i) ? ' ok' : ' no';
      return `<button class="${cls}" data-match-left="${i}">
        <span class="ml${deva}">${p[0]}</span>
        <span class="marrow">→</span>
        <span class="mr${deva}">${filled ? q.pairs[ms.order[pos]][1] : '<i>tap a card below</i>'}</span>
      </button>`;
    }).join('');

    const right = ms.order.map((origIdx, pos) => {
      if (usedPositions.includes(pos)) return '';
      return `<button class="match-chip${deva}" data-match-right="${pos}">${q.pairs[origIdx][1]}</button>`;
    }).join('');

    return `<div class="match-wrap">
      <div class="match-left">${left}</div>
      <div class="match-bank">
        <div class="bank-label">${ms.selectedLeft === null ? 'Tap a row above, then pick its match' : 'Now pick the match'}</div>
        <div class="bank-chips">${right || '<span class="tray-none">All matched — hit Check.</span>'}</div>
      </div>
    </div>`;
  },

  /** Mock-paper results: overall score plus where the marks actually went. */
  olyResultsHtml() {
    const r = this.result;
    const s = OlympiadView.subject(this.oly.sid);
    const stars = r.pct >= 90 ? 3 : r.pct >= 75 ? 2 : r.pct >= 50 ? 1 : 0;
    const weakest = ['core', 'lr', 'hots']
      .filter((k) => r.secs[k] != null)
      .sort((a, b) => r.secs[a] - r.secs[b])[0];

    return `
      <div class="results panel clip ${r.passed ? 'won' : 'lost'}">
        <div class="res-stars">${[0, 1, 2].map((i) => `<span class="star ${i < stars ? 'on' : ''}" style="animation-delay:${i * 140}ms">★</span>`).join('')}</div>
        <h2>${esc(s.code)} · ${r.pct >= 90 ? 'Olympiad ready!' : r.pct >= 75 ? 'Strong paper' : r.pct >= 50 ? 'Getting there' : 'Plenty to work on'}</h2>
        <div class="res-score">${r.right} <span>/ ${r.total}</span></div>
        <div class="res-pct">${r.pct}%${this.oly.timed ? ' · timed' : ' · untimed'}</div>

        <div class="res-secs">
          ${['core', 'lr', 'hots'].filter((k) => r.secs[k] != null).map((k) => `
            <div class="res-sec ${k === weakest ? 'weak' : ''}">
              <span class="rs-ico">${OLYMPIAD.sections[k].icon}</span>
              <div class="rs-body">
                <div class="rs-top"><b>${esc(OLYMPIAD.sections[k].label)}</b><span>${r.secs[k]}%</span></div>
                <div class="xpbar thin"><span style="width:${r.secs[k]}%"></span></div>
              </div>
            </div>`).join('')}
        </div>

        ${weakest ? `<div class="res-advice">
          Weakest section: <b>${esc(OLYMPIAD.sections[weakest].label)}</b>.
          ${weakest === 'lr' ? 'Reasoning needs no syllabus knowledge — pure practice fixes it fastest.'
            : weakest === 'hots' ? 'HOTs are two-step questions. Slow down and write the first step down.'
            : 'Go back to the matching chapters before re-sitting this paper.'}
        </div>` : ''}

        <div class="res-rewards">
          <div class="rw"><b>+${r.right * XP_PER_CORRECT}</b><span>Answer ${T('xp.word')}</span></div>
          ${r.bonusXp ? `<div class="rw"><b>+${r.bonusXp}</b><span>Score bonus</span></div>` : ''}
          ${r.coins ? `<div class="rw gold"><b>+${r.coins}</b><span>${T('res.coins')}</span></div>` : ''}
        </div>

        <div class="res-actions">
          <button class="btn btn-ghost" data-quiz="retry">↻ Sit it again</button>
          <button class="btn btn-primary" data-route="olysubject" data-param="${this.oly.sid}">Back to ${esc(s.short)} →</button>
        </div>
        <button class="btn btn-ghost btn-sm" data-route="olympiad" style="margin-top:12px">📕 Error Book &amp; plan</button>
      </div>`;
  },

  resultsHtml() {
    if (this.oly) return this.olyResultsHtml();
    const r = this.result;
    const subject = SUBJECTS.find((s) => s.id === this.sid);
    const stars = r.pct === 100 ? 3 : r.pct >= 80 ? 3 : r.pct >= 60 ? 2 : r.pct >= 40 ? 1 : 0;
    const units = unitsOf(this.sid);
    const at = units.findIndex((u) => u.id === this.uid);
    const nextUnit = at > -1 && at < units.length - 1 ? units[at + 1] : null;

    const headline = r.pct === 100 ? T('res.perfect')
      : r.pct >= 80 ? T('res.great')
      : r.pct >= 60 ? T('res.pass')
      : T('res.fail');

    return `
      <div class="results panel clip ${r.passed ? 'won' : 'lost'}">
        <div class="res-stars">${[0, 1, 2].map((i) => `<span class="star ${i < stars ? 'on' : ''}" style="animation-delay:${i * 140}ms">★</span>`).join('')}</div>
        <h2>${headline}</h2>
        <div class="res-score">${r.right} <span>/ ${r.total}</span></div>
        <div class="res-pct">${r.pct}%</div>

        <div class="res-rewards">
          <div class="rw"><b>+${r.right * XP_PER_CORRECT}</b><span>Answer ${T('xp.word')}</span></div>
          ${r.bonusXp ? `<div class="rw"><b>+${r.bonusXp}</b><span>Score bonus</span></div>` : ''}
          ${r.coins ? `<div class="rw gold"><b>+${r.coins}</b><span>${T('res.coins')}</span></div>` : ''}
        </div>

        <div class="res-actions">
          <button class="btn btn-ghost" data-quiz="retry">↻ Try Again</button>
          ${nextUnit
            ? `<button class="btn btn-primary" data-route="unit" data-param="${this.sid}|${nextUnit.id}">Next: ${esc(nextUnit.title)} →</button>`
            : `<button class="btn btn-primary" data-route="subject" data-param="${this.sid}">Back to ${esc(subject.name)}</button>`}
        </div>
        <button class="btn btn-ghost btn-sm" data-route="subject" data-param="${this.sid}" style="margin-top:12px">All units</button>
      </div>`;
  },
};
