/* ============================================================
   HOBBIES — piano, golf, AI and 3D printing.

   Each hobby file registers itself into HOBBIES and provides:
     tagline/blurb, goal (minutes a day), routine[], lessons[], tips[]
   Optional: routineTitle, safety{} (red banner), extra ('promptLab').

   Progress lives in state.hobbies:
     { piano: { log: [{date, mins}], lessons: ['p1'] }, golf: {...} }
   Practice minutes pay XP, so time at the piano, on the range, building
   with AI or at the printer moves the same Battle Pass as schoolwork.
   ============================================================ */

const HOBBIES = {};

/* Order they appear on the Side Quests page. */
const HOBBY_ORDER = ['piano', 'golf', 'ai', 'printing'];

const HobbiesView = {

  store(id) {
    state.hobbies = state.hobbies || {};
    state.hobbies[id] = state.hobbies[id] || {};
    const h = state.hobbies[id];
    h.log = h.log || [];         // [{ date, mins }]
    h.lessons = h.lessons || []; // ids of lessons marked done
    return h;
  },

  totalMins(id) { return this.store(id).log.reduce((n, e) => n + e.mins, 0); },
  minsOn(id, key) { return this.store(id).log.filter((e) => e.date === key).reduce((n, e) => n + e.mins, 0); },

  /** Consecutive days with any practice, counting back from today. */
  streak(id) {
    const days = new Set(this.store(id).log.map((e) => e.date));
    let n = 0;
    const d = new Date();
    if (!days.has(dateKey(d))) d.setDate(d.getDate() - 1); // today not done yet is fine
    while (days.has(dateKey(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  },

  logPractice(id, mins) {
    const h = this.store(id);
    h.log.unshift({ date: todayKey(), mins });
    h.log = h.log.slice(0, 400);
    save();
    addXp(mins, HOBBIES[id].icon + ' ' + mins + ' min of ' + HOBBIES[id].name.toLowerCase());
    const today = this.minsOn(id, todayKey());
    if (today >= HOBBIES[id].goal) toast('🎯 Daily ' + HOBBIES[id].name.toLowerCase() + ' goal hit — ' + today + ' min!', 'gold');
  },

  toggleLesson(id, lid) {
    const h = this.store(id);
    const at = h.lessons.indexOf(lid);
    if (at > -1) h.lessons.splice(at, 1);
    else {
      h.lessons.push(lid);
      addXp(20, '✅ ' + HOBBIES[id].name + ' lesson complete');
    }
    save();
  },

  /* ---------------- pages ---------------- */

  index() {
    document.getElementById('pageTitle').textContent = T('page.hobbies');
    return `
      <div class="notice">
        <b>Practice counts.</b> Minutes logged here pay XP straight into the ${esc(T('nav.battlepass'))},
        so time at the piano, on the range, building with AI or at the printer moves the season
        forward exactly like schoolwork does.
      </div>

      <div class="grid two">
        ${HOBBY_ORDER.map((id, i) => {
          const h = HOBBIES[id];
          const today = this.minsOn(id, todayKey());
          const pct = Math.min(100, Math.round(today / h.goal * 100));
          const st = this.store(id);
          return `
            <div class="panel clip mcard" style="--rarity:var(--r-${h.rarity}); animation-delay:${i * 55}ms"
                 data-route="hobby" data-param="${id}">
              <div class="mcard-head">
                <div class="mcard-icon">${h.icon}</div>
                <span class="rarity-tag" style="--rarity:var(--r-${h.rarity})">${this.streak(id)} DAY STREAK</span>
              </div>
              <h3>${esc(h.name)}</h3>
              <div class="tagline">${esc(h.tagline)}</div>
              <div class="blurb">${esc(h.blurb)}</div>
              <div class="mcard-foot">
                <div class="mcard-stats">
                  <span><b>${today}</b>/${h.goal} min today</span>
                  <span>${st.lessons.length}/${h.lessons.length} lessons</span>
                </div>
                <div class="xpbar thin"><span style="width:${pct}%"></span></div>
              </div>
            </div>`;
        }).join('')}
      </div>

      <div class="section-head" style="margin-top:30px"><h2>📈 Practice this week</h2><div class="rule"></div></div>
      <div class="grid two">
        ${HOBBY_ORDER.map((id) => this.weekCard(id)).join('')}
      </div>`;
  },

  weekCard(id) {
    const h = HOBBIES[id];
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push({ key: dateKey(d), short: DAY_SHORT[d.getDay()], mins: this.minsOn(id, dateKey(d)) });
    }
    const max = Math.max(h.goal, ...days.map((d) => d.mins));
    const total = days.reduce((n, d) => n + d.mins, 0);
    return `
      <div class="panel clip week-chart" style="--rarity:var(--r-${h.rarity})">
        <div class="wc-head"><h4>${h.icon} ${esc(h.name)}</h4><span class="pill">${total} min</span></div>
        <div class="wc-bars">
          ${days.map((d) => `
            <div class="wc-day">
              <div class="wc-col"><span style="height:${max ? Math.round(d.mins / max * 100) : 0}%"></span></div>
              <div class="wc-lbl">${d.short[0]}</div>
              <div class="wc-min">${d.mins || ''}</div>
            </div>`).join('')}
        </div>
        <div class="tiny muted" style="margin-top:8px">Goal: ${h.goal} min a day · lifetime ${this.totalMins(id)} min</div>
      </div>`;
  },

  page(id) {
    const h = HOBBIES[id];
    if (!h) return this.index();
    document.getElementById('pageTitle').textContent = h.name;
    const st = this.store(id);
    const today = this.minsOn(id, todayKey());

    return `
      <button class="back-link" data-route="hobbies">← All hobbies</button>

      <div class="panel clip subject-banner" style="--rarity:var(--r-${h.rarity})">
        <div class="big-icon">${h.icon}</div>
        <div style="flex:1">
          <h2>${esc(h.name)}</h2>
          <div class="tagline">${esc(h.tagline)}</div>
          <div class="xpbar thin" style="margin-top:14px;max-width:340px"><span style="width:${Math.min(100, Math.round(today / h.goal * 100))}%"></span></div>
          <div class="tiny muted" style="margin-top:7px">${today} of ${h.goal} minutes today · ${this.streak(id)}-day streak · ${st.lessons.length}/${h.lessons.length} lessons done</div>
        </div>
        <span class="rarity-tag" style="--rarity:var(--r-${h.rarity})">${rarityLabel(h.rarity)}</span>
      </div>

      <div class="panel clip log-bar">
        <div>
          <h3>⏱️ Log practice</h3>
          <p class="tiny muted" style="margin-top:4px">Every minute is 1 XP. Tap what he actually did.</p>
        </div>
        <div class="row gap-8" style="flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" data-practice="${id}|10">+10 min</button>
          <button class="btn btn-ghost btn-sm" data-practice="${id}|15">+15 min</button>
          <button class="btn btn-primary btn-sm" data-practice="${id}|30">+30 min</button>
          <button class="btn btn-hot btn-sm" data-practice="${id}|45">+45 min</button>
        </div>
      </div>

      ${h.safety ? `<div class="safety-banner">
        <span class="sb-ico">⚠️</span>
        <div>
          <h4>${esc(h.safety.h)}</h4>
          <p>${esc(h.safety.p)}</p>
          <button class="btn btn-hot btn-sm" data-route="hobbylesson" data-param="${h.id}|${h.safety.lesson}" style="margin-top:10px">
            Read the safety lesson →
          </button>
        </div>
      </div>` : ''}

      <div class="section-head" style="margin-top:26px"><h2>${esc(h.routineTitle || '🔁 The practice routine')}</h2><div class="rule"></div>
        <span class="pill">${h.routine.reduce((n, r) => n + r.m, 0)} min</span></div>
      <div class="routine">
        ${h.routine.map((r, i) => `
          <div class="panel clip routine-step">
            <div class="rs-n">${i + 1}</div>
            <div class="rs-b">
              <div class="rs-h">${esc(r.h)} <span>${r.m} min</span></div>
              <p>${esc(r.p)}</p>
            </div>
          </div>`).join('')}
      </div>

      <div class="section-head" style="margin-top:28px"><h2>📗 Lessons</h2><div class="rule"></div>
        <span class="pill">${st.lessons.length} of ${h.lessons.length} done</span></div>
      <div class="unit-grid">
        ${h.lessons.map((l, i) => {
          const done = st.lessons.includes(l.id);
          return `<div class="panel clip unit-card ${done ? 'done' : ''}"
               style="--rarity:var(--r-${h.rarity}); animation-delay:${i * 45}ms"
               data-route="hobbylesson" data-param="${id}|${l.id}">
            <div class="unit-head">
              <div class="unit-ico">${l.icon}</div>
              <div style="flex:1;min-width:0">
                <div class="unit-n">${esc(l.level)}</div>
                <h4>${esc(l.title)}</h4>
              </div>
              ${done ? '<span class="unit-check">✓</span>' : ''}
            </div>
            <div class="u-goal">${esc(l.cards[0].p ? l.cards[0].p.slice(0, 90) + '…' : '')}</div>
            <div class="unit-foot"><span class="unit-stat">${l.cards.length} cards · 1 drill</span></div>
          </div>`;
        }).join('')}
      </div>

      ${h.extra === 'promptLab' ? this.promptLab() : ''}

      <div class="section-head" style="margin-top:28px"><h2>💡 Tips that matter</h2><div class="rule"></div></div>
      <div class="grid two">
        ${h.tips.map((t) => `
          <div class="panel clip tactic">
            <span class="t-ico">${t.icon}</span>
            <div><h4>${esc(t.h)}</h4><p>${esc(t.p)}</p></div>
          </div>`).join('')}
      </div>`;
  },

  /* ---------------- Prompt Lab (AI) ----------------
     Scores a prompt on the four parts taught in lesson a3. All local —
     no AI is called, it is a checklist with teeth. */

  promptEg: 0,

  PROMPT_PARTS: [
    { key: 'role', icon: '🎭', label: 'Role', hint: 'Start with "You are a…" or "Act as a…"',
      test: (p) => /\b(you are|act as|pretend (you|to be)|imagine you( a| are)?|be a|as an? [a-z]+ (teacher|coach|expert|tutor|programmer|scientist|vet|writer))\b/i.test(p) },
    { key: 'task', icon: '🎯', label: 'Task', hint: 'Use a doing word: explain, write, make, list, compare, teach',
      test: (p) => /\b(explain|write|make|build|create|list|give me|tell me|compare|teach|show me|design|plan|quiz|summarise|summarize|help me|turn|fix|check)\b/i.test(p) },
    { key: 'details', icon: '🧩', label: 'Details', hint: 'Say what you already know, your age, or what it is for',
      test: (p) => /\b(i am|i'm|i already|my |for a |aged|year[- ]old|class \d|i know|i keep|because|so that|i want)\b/i.test(p) || p.trim().split(/\s+/).length >= 25 },
    { key: 'format', icon: '📐', label: 'Format', hint: 'Say the shape: bullet points, a table, 3 sentences, one file',
      test: (p) => /\b(bullet|points?|table|steps?|list|sentences?|words|paragraphs?|short|one file|html|as a story|in \d+|no more than|under \d+|step by step)\b/i.test(p) },
  ],

  scorePrompt(text) {
    return this.PROMPT_PARTS.map((p) => Object.assign({ ok: p.test(text || '') }, p));
  },

  promptLab() {
    const eg = PROMPT_EXAMPLES[this.promptEg % PROMPT_EXAMPLES.length];
    return `
      <div class="section-head" style="margin-top:28px"><h2>🧪 Prompt Lab</h2><div class="rule"></div>
        <span class="pill">Score your own prompt</span></div>

      <div class="panel clip prompt-lab">
        <p class="pl-intro">Write a prompt below and score it against the four parts —
          <b>Role · Task · Details · Format</b>. Nothing is sent anywhere; this checks your
          wording right here.</p>

        <textarea id="promptInput" class="pl-input" rows="4"
          placeholder="You are a science teacher for 9-year-olds. Explain why volcanoes erupt. I already know the Earth has layers. Answer in 5 short bullet points."></textarea>

        <div class="row gap-8" style="margin-top:12px;flex-wrap:wrap">
          <button class="btn btn-primary btn-sm" data-prompt="score">⚡ Score it</button>
          <button class="btn btn-ghost btn-sm" data-prompt="clear">Clear</button>
        </div>

        <div id="promptResult" class="pl-result"></div>
      </div>

      <div class="panel clip prompt-eg">
        <div class="pe-head">
          <h4>Weak → Strong</h4>
          <button class="btn btn-ghost btn-sm" data-prompt="next">Another example →</button>
        </div>
        <div class="pe-row bad"><span class="pe-tag">👎 Weak</span><p>${esc(eg.weak)}</p></div>
        <div class="pe-row good"><span class="pe-tag">👍 Strong</span><p>${esc(eg.strong)}</p></div>
      </div>`;
  },

  renderPromptScore() {
    const box = document.getElementById('promptResult');
    const input = document.getElementById('promptInput');
    if (!box || !input) return;
    const text = input.value.trim();
    if (!text) { box.innerHTML = '<div class="pl-empty">Type a prompt first.</div>'; return; }

    const parts = this.scorePrompt(text);
    const got = parts.filter((p) => p.ok).length;
    const words = text.split(/\s+/).length;
    const verdict = got === 4 ? 'Brilliant prompt — that will work.'
      : got === 3 ? 'Good. One more part and it is excellent.'
      : got === 2 ? 'Halfway. Add the missing parts and try again.'
      : 'Too vague — the answer will be vague too.';

    box.innerHTML = `
      <div class="pl-score">
        <div class="pl-n">${got}<span>/4</span></div>
        <div>
          <div class="pl-verdict">${esc(verdict)}</div>
          <div class="tiny muted">${words} word${words === 1 ? '' : 's'}${words < 12 ? ' — most strong prompts are 25 or more' : ''}</div>
        </div>
      </div>
      <div class="pl-parts">
        ${parts.map((p) => `
          <div class="pl-part ${p.ok ? 'ok' : ''}">
            <span class="pp-ico">${p.ok ? '✅' : p.icon}</span>
            <div>
              <b>${p.label}</b>
              <span>${p.ok ? 'Found it' : esc(p.hint)}</span>
            </div>
          </div>`).join('')}
      </div>`;
  },

  lesson(param) {
    const [id, lid] = String(param || '').split('|');
    const h = HOBBIES[id];
    const l = h && h.lessons.find((x) => x.id === lid);
    if (!l) return this.index();
    document.getElementById('pageTitle').textContent = l.title;
    const done = this.store(id).lessons.includes(lid);

    const blocks = l.cards.map((b) => {
      if (b.tip) return `<div class="teach-tip"><span class="tip-ico">💡</span><div>${esc(b.tip)}</div></div>`;
      if (b.table) {
        return `<div class="teach-card"><div class="table-wrap"><table class="teach-table">
          <thead><tr>${b.table.head.map((x) => `<th>${x}</th>`).join('')}</tr></thead>
          <tbody>${b.table.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div></div>`;
      }
      return `<div class="teach-card">
        ${b.h ? `<h4>${esc(b.h)}</h4>` : ''}
        ${b.p ? `<p>${esc(b.p)}</p>` : ''}
        ${b.eg ? `<ul class="teach-eg">${b.eg.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>` : ''}
      </div>`;
    }).join('');

    return `
      <button class="back-link" data-route="hobby" data-param="${id}">← ${esc(h.name)}</button>

      <div class="panel clip unit-banner" style="--rarity:var(--r-${h.rarity})">
        <div class="big-icon">${l.icon}</div>
        <div style="flex:1">
          <div class="unit-kicker">${h.icon} ${esc(h.name)} · ${esc(l.level)}</div>
          <h2>${esc(l.title)}</h2>
        </div>
        ${done ? '<span class="pill hi-ok">✓ Done</span>' : ''}
      </div>

      <div class="teach-wrap">${blocks}</div>

      <div class="panel clip drill-card">
        <div class="unit-kicker">🏋️ Drill</div>
        <h3>${esc(l.drill.h)}</h3>
        <ol class="drill-steps">${l.drill.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
      </div>

      <div class="start-bar panel clip" style="margin-top:20px">
        <div>
          <h3>${done ? 'Marked as done' : 'Done this one?'}</h3>
          <p class="muted tiny" style="margin-top:4px">${done ? 'Tap again to un-mark it.' : 'Marking it done pays +20 XP.'}</p>
        </div>
        <button class="btn ${done ? 'btn-ghost' : 'btn-primary'}" data-hobby-done="${id}|${lid}">
          ${done ? '↺ Un-mark' : '✓ Mark done'}
        </button>
      </div>`;
  },
};
