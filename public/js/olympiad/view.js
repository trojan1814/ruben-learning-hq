/* ============================================================
   OLYMPIAD PAGES — dashboard, per-subject prep, the testing plan
   and the Error Book.

   Progress lives in state.olympiad:
     attempts: { 'maths|imo-1': { best, last, secs:{core,lr,hots}, at, n } }
     planDone: ['w3', ...]
     errors:   [ { sid, pid, qi, q, chose, right, at } ]   the Error Book
   ============================================================ */

const OlympiadView = {

  store() {
    state.olympiad = state.olympiad || {};
    const o = state.olympiad;
    o.attempts = o.attempts || {};
    o.planDone = o.planDone || [];
    o.errors = o.errors || [];
    return o;
  },

  subject(id) { return OLYMPIAD.subjects.find((s) => s.id === id); },

  /* A subject may override the exam shape — IGKO does. Everything that
     draws a pattern, a section or a timer has to ask for the subject's
     own version rather than reading the defaults straight off OLYMPIAD. */
  patternOf(id) { const s = this.subject(id); return (s && s.pattern) || OLYMPIAD.pattern; },
  sectionsOf(id) { const s = this.subject(id); return (s && s.sections) || OLYMPIAD.sections; },
  marksOf(id, sec) { const d = this.sectionsOf(id)[sec]; return (d && d.marks) || 1; },
  papers(id) { return OLYMPIAD_PAPERS[id] || []; },
  attempt(sid, pid) { return this.store().attempts[sid + '|' + pid] || null; },

  /** Best score across every paper in a subject, as a percentage. */
  readiness(sid) {
    const ps = this.papers(sid);
    if (!ps.length) return { pct: 0, taken: 0, total: 0 };
    let sum = 0, taken = 0;
    ps.forEach((p) => {
      const a = this.attempt(sid, p.id);
      if (a) { sum += a.best; taken++; }
    });
    return { pct: taken ? Math.round(sum / taken) : 0, taken, total: ps.length };
  },

  /** The plan week that contains today, or the next one. */
  currentWeek() {
    const today = todayKey();
    let cur = OLYMPIAD.plan[0];
    for (const w of OLYMPIAD.plan) if (w.from <= today) cur = w;
    return cur;
  },

  /* ---------------- dashboard ---------------- */

  index() {
    document.getElementById('pageTitle').textContent = T('page.olympiad');
    const o = this.store();

    const upcoming = OLYMPIAD.subjects
      .map((s) => ({ s, d: daysUntil(s.date) }))
      .sort((a, b) => a.d - b.d);
    const next = upcoming.find((x) => x.d >= 0) || upcoming[0];
    const week = this.currentWeek();
    const weeksLeft = Math.max(0, Math.ceil(daysUntil(next.s.date) / 7));

    const overall = Math.round(
      OLYMPIAD.subjects.reduce((n, s) => n + this.readiness(s.id).pct, 0) / OLYMPIAD.subjects.length);

    return `
      <div class="panel clip hero oly-hero">
        <div class="hero-top">
          <div>
            <h3>🇮🇳 ${esc(OLYMPIAD.org)} · ${esc(OLYMPIAD.grade)}</h3>
            <div class="sub">
              Next up: <b class="hi">${esc(next.s.name)}</b> on <b class="hi">${fmtDate(next.s.date)}</b> —
              ${next.d >= 0 ? next.d + ' days away' : 'date has passed'}.
              The ${upcoming.length} papers run from ${fmtDate(upcoming[0].s.date)} to
              ${fmtDate(upcoming[upcoming.length - 1].s.date)} at their earliest slots.
            </div>
          </div>
          <div class="hero-tier clip">
            <div class="n">${Math.max(0, daysUntil(next.s.date))}</div>
            <div class="t">Days to go</div>
          </div>
        </div>
        <div class="oly-strip">
          ${upcoming.map(({ s, d }) => `
            <div class="oly-date" style="--rarity:var(--r-${s.rarity})">
              <span class="ico">${s.icon}</span>
              <div class="lv">${esc(s.code)}</div>
              <div class="rw">${fmtDate(s.date)}</div>
              <div class="dd">${d >= 0 ? d + ' days' : 'passed'}</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="notice reg-notice">
        <b>🏫 Entries go through his school.</b> ${esc(OLYMPIAD.orgShort)} does not take individual
        registrations — the school enters students and also chooses which of the published
        date slots to use, so confirm the chosen dates with them:
        <a class="hi-code" href="${OLYMPIAD.registerUrl}" target="_blank" rel="noopener">sofworld.org</a>.
        Every date shown here is the <b>earliest</b> slot ${esc(OLYMPIAD.orgShort)} publishes for that paper.
      </div>

      <div class="section-head"><h2>📊 Readiness</h2><div class="rule"></div>
        <span class="pill">${overall}% overall</span></div>

      <div class="grid">
        ${upcoming.map(({ s }, i) => {
          const r = this.readiness(s.id);
          const d = daysUntil(s.date);
          return `
            <div class="panel clip mcard" style="--rarity:var(--r-${s.rarity}); animation-delay:${i * 55}ms"
                 data-route="olysubject" data-param="${s.id}">
              <div class="mcard-head">
                <div class="mcard-icon">${s.icon}</div>
                <span class="rarity-tag" style="--rarity:var(--r-${s.rarity})">${esc(s.code)}</span>
              </div>
              <h3>${esc(s.short)}</h3>
              <div class="tagline">${fmtDate(s.date)}${d >= 0 ? ' · in ' + d + ' days' : ''}</div>
              <div class="blurb">${s.syllabus.length} chapters · ${this.patternOf(s.id).total} questions · ${this.patternOf(s.id).minutesOnline} min</div>
              <div class="mcard-foot">
                <div class="mcard-stats">
                  <span><b>${r.taken ? r.pct + '%' : '—'}</b> best</span>
                  <span>${r.taken}/${r.total} mock${r.total === 1 ? '' : 's'}</span>
                </div>
                <div class="xpbar thin"><span style="width:${r.pct}%"></span></div>
              </div>
            </div>`;
        }).join('')}
      </div>

      <div class="section-head" style="margin-top:30px"><h2>🗺️ The testing plan</h2><div class="rule"></div>
        <span class="pill">${weeksLeft} week${weeksLeft === 1 ? '' : 's'} left</span></div>

      <div class="notice">
        <b>Eight weeks, aimed at the earliest slot for each paper.</b> GK and Computer come first,
        then English, then a clear run at Maths and Science. Tick a week off when it is done.
      </div>

      <div class="plan-list">
        ${OLYMPIAD.plan.map((w) => this.planRow(w, week)).join('')}
      </div>

      <div class="section-head" style="margin-top:30px"><h2>🎯 Exam-day tactics</h2><div class="rule"></div></div>
      <div class="grid two">
        ${OLYMPIAD.tactics.map((t) => `
          <div class="panel clip tactic">
            <span class="t-ico">${t.icon}</span>
            <div><h4>${esc(t.h)}</h4><p>${esc(t.p)}</p></div>
          </div>`).join('')}
      </div>

      ${this.errorBookBlock()}`;
  },

  planRow(w, current) {
    const o = this.store();
    const done = o.planDone.includes('w' + w.w);
    const isNow = w.w === current.w;
    const ph = OLYMPIAD.phases[w.phase];
    return `
      <div class="panel clip plan-week ${done ? 'done' : ''} ${isNow ? 'now' : ''}" style="--rarity:${ph.color}">
        <button class="sch-tick" data-plan-tick="w${w.w}" title="Mark this week done">${done ? '✓' : ''}</button>
        <div class="pw-body">
          <div class="pw-head">
            <span class="pw-n">Week ${w.w}</span>
            <span class="pw-date">${fmtDate(w.from)}</span>
            <span class="pw-phase">${esc(ph.label)}</span>
            ${isNow ? '<span class="pw-now">THIS WEEK</span>' : ''}
          </div>
          <h4>${esc(w.title)}</h4>
          <ul class="pw-do">${w.do.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
          <div class="pw-test"><b>Checkpoint:</b> ${esc(w.test)}</div>
          <div class="pw-why">${esc(w.why)}</div>
        </div>
      </div>`;
  },

  errorBookBlock() {
    const errs = this.store().errors;
    return `
      <div class="section-head" style="margin-top:30px"><h2>📕 Error Book</h2><div class="rule"></div>
        <span class="pill">${errs.length} to fix</span>
        ${errs.length ? '<button class="btn btn-ghost btn-sm" data-oly="clearErrors">Clear</button>' : ''}</div>
      ${errs.length ? `<div class="err-list">${errs.slice(0, 25).map((e) => {
        const s = this.subject(e.sid);
        return `<div class="panel clip err-row">
          <span class="err-ico">${s ? s.icon : '❓'}</span>
          <div class="err-body">
            <div class="err-q">${e.q}</div>
            <div class="err-a"><s>${esc(e.chose)}</s> → <b>${esc(e.right)}</b></div>
            ${e.why ? `<div class="err-why">${e.why}</div>` : ''}
          </div>
        </div>`;
      }).join('')}</div>`
      : '<div class="muted tiny">Empty — nothing wrong yet. Every mock question he misses lands here automatically.</div>'}`;
  },

  /* ---------------- one subject ---------------- */

  subjectPage(id) {
    const s = this.subject(id);
    if (!s) return this.index();
    document.getElementById('pageTitle').textContent = s.short + ' Olympiad';
    const d = daysUntil(s.date);
    const p = this.patternOf(id);
    const secDefs = this.sectionsOf(id);
    const linked = SUBJECTS.find((x) => x.id === s.links);

    return `
      <button class="back-link" data-route="olympiad">← All Olympiad subjects</button>

      <div class="panel clip subject-banner" style="--rarity:var(--r-${s.rarity})">
        <div class="big-icon">${s.icon}</div>
        <div style="flex:1">
          <h2>${esc(s.name)}</h2>
          <div class="tagline">${esc(s.code)} · Earliest date ${fmtDate(s.date)}${d >= 0 ? ' · ' + d + ' days away' : ''}</div>
          <div class="tiny muted" style="margin-top:7px">${(s.slots || []).length
            ? 'Other slots the school may pick: ' + s.slots.map(fmtDate).join(' · ')
            : 'No alternative slot published'} · ${esc(OLYMPIAD.grade)}</div>
        </div>
        <span class="rarity-tag" style="--rarity:var(--r-${s.rarity})">${esc(s.code)}</span>
      </div>

      <div class="section-head"><h2>📝 The paper</h2><div class="rule"></div></div>
      <div class="grid">
        ${Object.values(secDefs).map((sec) => `
          <div class="panel clip pat-card">
            <span class="p-ico">${sec.icon}</span>
            <div class="p-n">${p[sec.key]}</div>
            <h4>${esc(sec.label)}</h4>
            <p>${esc(sec.blurb)}</p>
          </div>`).join('')}
        <div class="panel clip pat-card">
          <span class="p-ico">⏱️</span>
          <div class="p-n">${p.minutesOnline}</div>
          <h4>Minutes</h4>
          <p>${p.total} questions, 1 mark each, no negative marking. ${p.minutesOffline} minutes if taken at school on paper.</p>
        </div>
      </div>

      <div class="section-head" style="margin-top:28px"><h2>📚 Syllabus</h2><div class="rule"></div>
        <span class="pill">${s.syllabus.length} chapters</span></div>
      <div class="syl-grid">
        ${s.syllabus.map((c, i) => `<div class="syl-chip"><span>${i + 1}</span>${esc(c)}</div>`).join('')}
      </div>
      ${linked ? `<div class="notice" style="margin-top:16px">
        <b>Matching lessons.</b> Most of this syllabus is already taught in
        <button class="link-btn" data-route="subject" data-param="${linked.id}">${linked.icon} ${esc(linked.name)}</button>
        under ${esc(T('nav.subjects'))} — use those units for the chapter work, and these mocks to test it.
      </div>` : ''}

      <div class="section-head" style="margin-top:28px"><h2>🧪 Mock papers</h2><div class="rule"></div></div>
      ${this.papers(id).map((paper) => {
        const a = this.attempt(id, paper.id);
        const counts = {};
        Object.keys(secDefs).forEach((k) => { counts[k] = 0; });
        paper.questions.forEach((q) => { counts[q.sec] = (counts[q.sec] || 0) + 1; });
        const marks = paper.questions.reduce((n, q) => n + this.marksOf(id, q.sec), 0);
        return `
          <div class="panel clip mock-row" style="--rarity:var(--r-${s.rarity})">
            <div class="mock-body">
              <h4>${esc(paper.title)}</h4>
              <div class="mock-meta">${paper.questions.length} questions · ${marks} marks · ${Object.keys(secDefs).map((k) => counts[k] + ' ' + secDefs[k].label.toLowerCase()).join(' + ')}</div>
              ${a ? `<div class="mock-scores">
                  <span class="score-chip ${a.best >= 80 ? '' : a.best >= 60 ? 'mid' : 'low'}">Best ${a.best}%</span>
                  <span class="tiny muted">${a.n} attempt${a.n === 1 ? '' : 's'} · last ${a.last}% on ${fmtDate(a.at.slice(0, 10))}</span>
                </div>
                <div class="sec-bars">
                  ${Object.keys(secDefs).map((k) => `
                    <div class="sec-bar">
                      <span>${secDefs[k].label}</span>
                      <div class="xpbar thin"><span style="width:${a.secs && a.secs[k] != null ? a.secs[k] : 0}%"></span></div>
                      <b>${a.secs && a.secs[k] != null ? a.secs[k] + '%' : '—'}</b>
                    </div>`).join('')}
                </div>` : '<div class="tiny muted" style="margin-top:6px">Not attempted yet.</div>'}
            </div>
            <div class="mock-actions">
              <button class="btn btn-primary btn-sm" data-omock="${id}|${paper.id}|timed">⏱️ Timed (${p.minutesOnline} min)</button>
              <button class="btn btn-ghost btn-sm" data-omock="${id}|${paper.id}|open">📖 Practice, untimed</button>
            </div>
          </div>`;
      }).join('')}`;
  },
};
