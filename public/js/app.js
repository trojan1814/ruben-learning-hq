/* ============================================================
   RUBEN'S LEARNING HQ - app shell, state and rendering
   ============================================================ */

/* ---------------- State ---------------- */

const DEFAULT_STATE = {
  player: { name: 'Ruben Sandhu', level: 1, xp: 0, coins: 0, streak: 0, lastActive: null },
  battlePass: { claimed: [] },
  subjects: {},
  quests: { date: null, completed: [] },
  theme: DEFAULT_THEME,
  olympiad: { attempts: {}, planDone: [], errors: [] },
  schedule: { items: null, ticks: {} },   // items: null = seed the starter timetable
  hobbies: {},
  news: { read: [], paid: {} },
  log: [],
};

let state = structuredClone(DEFAULT_STATE);
let books = {};
let route = 'home';
let routeParam = null;
let saveTimer = null;
let storageMode = 'unknown';   // 'redis' | 'disk' | 'local' — see api/state.js

const todayKey = () => new Date().toISOString().slice(0, 10);

async function loadState() {
  try {
    const res = await fetch('/api/state');
    storageMode = res.headers.get('X-Storage') || 'unknown';
    if (!res.ok) throw new Error('bad response');
    const loaded = await res.json();
    state = Object.assign(structuredClone(DEFAULT_STATE), loaded);
  } catch {
    // No server storage (deployed without a database, or opened as a plain
    // file) - the browser's own copy is the source of truth.
    if (storageMode === 'unknown') storageMode = 'local';
    try { state = Object.assign(structuredClone(DEFAULT_STATE), JSON.parse(localStorage.getItem('ruben-hq') || '{}')); }
    catch { state = structuredClone(DEFAULT_STATE); }
  }
  // localStorage already picked a skin before first paint; the saved state
  // only wins when it names one this browser has never seen.
  if (state.theme && THEMES[state.theme]) {
    if (!localStorage.getItem('ruben-theme')) setTheme(state.theme, { silent: true });
    else state.theme = themeId;
  } else {
    state.theme = themeId;
  }
  applyDailyRollover();
}

function save() {
  localStorage.setItem('ruben-hq', JSON.stringify(state));
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    }).catch(() => { /* offline: localStorage already has it */ });
  }, 350);
}

/* Reset daily quests and roll the streak forward on a new day. */
function applyDailyRollover() {
  const today = todayKey();
  if (state.quests.date !== today) {
    state.quests = { date: today, completed: [] };
  }
  const last = state.player.lastActive;
  if (last !== today) {
    const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    state.player.streak = last === yesterday ? (state.player.streak || 0) + 1 : 1;
    state.player.lastActive = today;
    save();
  }
}

/* ---------------- Derived values ---------------- */

const levelOf = (xp) => Math.floor(xp / XP_PER_LEVEL) + 1;
const xpIntoLevel = (xp) => xp % XP_PER_LEVEL;

function currentTier() {
  let tier = 1;
  for (const t of BATTLE_PASS) if (state.player.xp >= t.xp) tier = t.tier;
  return tier;
}

function totalLessonsDone() {
  return Object.values(state.subjects).reduce((n, s) => n + ((s.done && s.done.length) || 0), 0);
}

/* ---------------- Rewards ---------------- */

function addXp(amount, label) {
  const before = levelOf(state.player.xp);
  const beforeTier = currentTier();
  state.player.xp += amount;
  const after = levelOf(state.player.xp);
  state.player.level = after;

  floatXp('+' + amount + ' ' + T('xp.word'));
  if (label) toast(label);
  if (after > before) setTimeout(() => toast(T('levelup', { n: after }), 'gold'), 700);
  if (currentTier() > beforeTier) setTimeout(() => toast(T('tierup', { n: currentTier() }), 'gold'), 1200);

  state.log.unshift({ at: new Date().toISOString(), xp: amount, label: label || '' });
  state.log = state.log.slice(0, 200);
  save();
  renderChrome();
}

function addCoins(amount) {
  state.player.coins = Math.max(0, state.player.coins + amount);
  save();
  renderChrome();
}

/* ---------------- FX ---------------- */

function toast(msg, kind) {
  const el = document.createElement('div');
  el.className = 'toast' + (kind ? ' ' + kind : '');
  el.textContent = msg;
  document.getElementById('toastWrap').appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

function floatXp(text) {
  const el = document.createElement('div');
  el.className = 'xp-float';
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------------- Chrome (sidebar / rail / topbar) ---------------- */

function renderChrome() {
  const p = state.player;
  const lvl = levelOf(p.xp);
  const into = xpIntoLevel(p.xp);

  document.getElementById('playerName').textContent = p.name;
  document.getElementById('playerLevel').textContent = lvl;
  document.getElementById('playerXpBar').style.width = (into / XP_PER_LEVEL * 100) + '%';
  document.getElementById('playerXpNow').textContent = into + ' ' + T('xp.word');
  document.getElementById('playerXpNext').textContent = '/ ' + XP_PER_LEVEL;
  document.getElementById('coinAmount').textContent = p.coins.toLocaleString();
  document.getElementById('streakNum').textContent = p.streak;

  document.getElementById('statLessons').textContent = totalLessonsDone();
  document.getElementById('statXp').textContent = p.xp.toLocaleString();
  document.getElementById('statQuests').textContent = state.quests.completed.length;
  document.getElementById('statTier').textContent = currentTier();

  const h = new Date().getHours();
  document.getElementById('greeting').textContent =
    (h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening') + ', ' + T('greeting.suffix');

  const totalBooks = Object.values(books).reduce((n, f) => n + f.length, 0);
  const badge = document.getElementById('vaultBadge');
  badge.textContent = totalBooks;
  badge.classList.toggle('hidden', totalBooks === 0);

  const unread = typeof NewsView === 'object' ? NewsView.unreadCount() : 0;
  const nb = document.getElementById('newsBadge');
  if (nb) {
    nb.textContent = unread;
    nb.classList.toggle('hidden', unread === 0);
  }

  renderQuests();
  renderSchedule();
}

function renderQuests() {
  const done = state.quests.completed;
  document.getElementById('questDate').textContent =
    done.length + ' of ' + DAILY_QUESTS.length + ' complete';

  document.getElementById('questList').innerHTML = DAILY_QUESTS.map((q) => `
    <div class="panel clip quest ${done.includes(q.id) ? 'done' : ''}" data-quest="${q.id}">
      <div class="check">✓</div>
      <div class="q-text">${q.icon} ${esc(q.text)}</div>
      <div class="q-coins">+${q.coins}🪙</div>
    </div>`).join('');
}

/* The rail mirrors today's row from the editable Schedule page. */
function renderSchedule() {
  const now = new Date();
  document.getElementById('todayDate').textContent =
    now.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' });

  const items = Schedule.forDate(now);
  document.getElementById('scheduleList').innerHTML = items.length
    ? items.map((s) => {
        const k = SCHED_KINDS[s.kind] || SCHED_KINDS.event;
        const ticked = Schedule.isTicked(s.id);
        return `
          <div class="sched-item ${ticked ? 'ticked' : ''}" data-sched-tick="${s.id}">
            <div class="sched-time">${esc(fmtTime(s.time))}</div>
            <div class="sched-card" style="--rarity:var(--r-${k.rarity})">
              <div class="s">${k.icon} ${esc(s.title)}</div>
              <div class="l">${esc(s.len || '')}${s.place ? ' · ' + esc(s.place) : ''}</div>
            </div>
          </div>`;
      }).join('')
    : '<div class="muted tiny">' + esc(T('rail.restday')) + '</div>';
}

/* Where progress is being kept, in plain English for the Parent Zone. */
const STORAGE_INFO = {
  disk: { icon: '💾', tag: 'Saved on this PC',
    h: 'Saving to data/state.json on this computer',
    p: 'Progress is written to a file in the project folder, so it survives clearing the browser. Back that one file up and nothing is ever lost.' },
  redis: { icon: '☁️', tag: 'Saved to the cloud',
    h: 'Saving to the cloud database',
    p: 'Progress is stored online, so it follows him to any device that opens the site. Exporting now and then is still a sensible habit.' },
  local: { icon: '⚠️', tag: 'This browser only',
    h: 'Saving in this browser only',
    p: 'There is no server storage connected, so progress lives in this browser only. It is lost if the browser data is cleared, and it does not follow him to another device. <b>Export a backup regularly.</b>' },
  unknown: { icon: '❓', tag: 'Checking…',
    h: 'Working out where progress is saved',
    p: 'Give it a second, then reload the page.' },
};

/* ---------------- Pages ---------------- */

function subjectCard(s, i) {
  const prog = subjectProgress(s.id);
  const done = prog.done;
  const total = prog.total;
  const pct = prog.pct;
  const files = (books[s.folder] || []).length;
  return `
    <div class="panel clip mcard" style="--rarity:var(--r-${s.rarity}); animation-delay:${i * 55}ms" data-subject="${s.id}">
      <div class="mcard-head">
        <div class="mcard-icon">${s.icon}</div>
        <span class="rarity-tag" style="--rarity:var(--r-${s.rarity})">${rarityLabel(s.rarity)}</span>
      </div>
      <h3>${esc(s.name)}</h3>
      <div class="tagline ${s.id === 'hindi' ? 'deva' : ''}">${esc(s.tagline)}</div>
      <div class="blurb">${esc(s.blurb)}</div>
      <div class="mcard-foot">
        <div class="mcard-stats">
          <span><b>${done}</b>/${total} units</span>
          <span>${files ? '📕 ' + files + ' book' + (files > 1 ? 's' : '') : 'Class 3'}</span>
        </div>
        <div class="xpbar thin"><span style="width:${pct}%"></span></div>
      </div>
    </div>`;
}

function gameCard(g, i) {
  const live = g.status === 'live';
  return `
    <div class="panel clip mcard" style="--rarity:var(--r-${g.rarity}); animation-delay:${i * 55}ms" data-game="${g.id}">
      ${live ? '' : '<div class="soon-tag">COMING SOON</div>'}
      <div class="mcard-head">
        <div class="mcard-icon">${g.icon}</div>
        <span class="rarity-tag" style="--rarity:var(--r-${g.rarity})">${rarityLabel(g.rarity)}</span>
      </div>
      <h3>${esc(g.name)}</h3>
      <div class="tagline">${esc(g.tagline)}</div>
      <div class="blurb">${esc(g.blurb)}</div>
      <div class="mcard-foot">
        <button class="btn ${live ? 'btn-primary' : 'btn-ghost'} btn-sm" style="width:100%">
          ${live ? '▶ ' + esc(g.cta) : 'Not built yet'}
        </button>
      </div>
    </div>`;
}

function tierTrack() {
  const tier = currentTier();
  return BATTLE_PASS.map((t) => {
    const unlocked = state.player.xp >= t.xp;
    const claimed = state.battlePass.claimed.includes(t.tier);
    return `
      <div class="tier-node ${unlocked ? 'unlocked' : ''} ${claimed ? 'claimed' : ''}"
           style="--rarity:var(--r-${t.rarity})" data-tier="${t.tier}">
        <span class="ico">${t.icon}</span>
        <div class="lv">${T('tier.word')} ${t.tier}</div>
        <div class="rw">${esc(t.reward)}</div>
      </div>`;
  }).join('') + `<!-- current tier ${tier} -->`;
}

const PAGES = {

  home() {
    document.getElementById('pageTitle').innerHTML = T('page.home', { name: esc(state.player.name.split(' ')[0]) });
    const tier = currentTier();
    const next = BATTLE_PASS.find((t) => t.xp > state.player.xp);
    const toNext = next ? next.xp - state.player.xp : 0;

    return `
      <div class="panel clip hero">
        <div class="hero-top">
          <div>
            <h3>${T('hero.title')}</h3>
            <div class="sub">${next
              ? 'Earn <b class="hi">' + toNext + ' more ' + T('xp.word') + '</b> to unlock ' + T('tier.word') + ' ' + next.tier + ' — ' + esc(next.reward)
              : T('hero.done')}</div>
          </div>
          <div class="hero-tier clip">
            <div class="n">${tier}</div>
            <div class="t">${T('tier.current')}</div>
          </div>
        </div>
        <div class="tier-track">${tierTrack()}</div>
      </div>

      <div class="section-head"><h2>${T('home.subjects')}</h2><div class="rule"></div>
        <button class="btn btn-ghost btn-sm" data-route="subjects">View all</button></div>
      <div class="grid">${SUBJECTS.map(subjectCard).join('')}</div>

      <div class="section-head" style="margin-top:30px"><h2>${T('home.games')}</h2><div class="rule"></div>
        <button class="btn btn-ghost btn-sm" data-route="games">View all</button></div>
      <div class="grid two">${GAMES.map(gameCard).join('')}</div>
    `;
  },

  subjects() {
    document.getElementById('pageTitle').textContent = T('page.subjects');
    return `
      <div class="notice">
        <b>Framework mode.</b> Each zone below has placeholder lessons. Drop his real textbook PDFs into the
        <code class="hi-code">books\\</code> folders, then we generate the real lesson plan — chapter by chapter, with XP and rewards attached.
      </div>
      <div class="grid">${SUBJECTS.map(subjectCard).join('')}</div>`;
  },

  games() {
    document.getElementById('pageTitle').textContent = T('page.games');
    return `
      <div class="notice">
        <b>Both games are live.</b> Winning earns real ${T('xp.word')} and ${T('coins.label')} that feed straight into his
        ${T('nav.battlepass')} — so game time still moves the season forward.
      </div>
      <div class="grid two">${GAMES.map(gameCard).join('')}</div>`;
  },

  chess() {
    document.getElementById('pageTitle').innerHTML = T('page.chess');
    return `
      <button class="back-link" data-route="games">${T('back.games')}</button>
      <div id="chessMount"></div>`;
  },

  ludo() {
    document.getElementById('pageTitle').innerHTML = T('page.ludo');
    return `
      <button class="back-link" data-route="games">${T('back.games')}</button>
      <div id="ludoMount"></div>`;
  },

  battlepass() {
    document.getElementById('pageTitle').textContent = T('page.battlepass');
    const tier = currentTier();
    return `
      <div class="notice">
        <b>How it works.</b> Ruben earns ${T('xp.word')} from lessons and quests. Every ${T('tier.word').toLowerCase()} unlocks a real-world reward
        that you approve. Edit the reward list in <code class="hi-code">public\\js\\data.js</code>.
      </div>
      <div class="panel clip hero" style="margin-bottom:24px">
        <div class="hero-top">
          <div>
            <h3>${T('hero.progress')}</h3>
            <div class="sub">${state.player.xp.toLocaleString()} ${T('xp.word')} earned · ${T('tier.word')} ${tier} of ${BATTLE_PASS.length}</div>
          </div>
          <div class="hero-tier clip"><div class="n">${tier}</div><div class="t">${T('tier.word')}</div></div>
        </div>
        <div class="xpbar" style="margin-top:18px"><span style="width:${Math.min(100, state.player.xp / BATTLE_PASS[BATTLE_PASS.length - 1].xp * 100)}%"></span></div>
      </div>
      <div class="grid">${BATTLE_PASS.map((t) => {
        const unlocked = state.player.xp >= t.xp;
        const claimed = state.battlePass.claimed.includes(t.tier);
        return `
          <div class="panel clip mcard" style="--rarity:var(--r-${t.rarity}); cursor:default">
            <div class="mcard-head">
              <div class="mcard-icon">${t.icon}</div>
              <span class="rarity-tag" style="--rarity:var(--r-${t.rarity})">${T('tier.word').toUpperCase()} ${t.tier}</span>
            </div>
            <h3>${esc(t.reward)}</h3>
            <div class="tagline">${t.xp.toLocaleString()} ${T('xp.word')} required</div>
            <div class="mcard-foot">
              ${claimed
                ? '<button class="btn btn-ghost btn-sm" style="width:100%" disabled>✓ Claimed</button>'
                : unlocked
                  ? '<button class="btn btn-hot btn-sm" style="width:100%" data-claim="' + t.tier + '">Claim Reward</button>'
                  : '<button class="btn btn-ghost btn-sm" style="width:100%" disabled>🔒 Locked</button>'}
            </div>
          </div>`;
      }).join('')}</div>`;
  },

  vault() {
    document.getElementById('pageTitle').textContent = T('page.vault');
    const total = Object.values(books).reduce((n, f) => n + f.length, 0);
    return `
      <div class="dropzone">
        <h3>📥 Drop Ruben's textbooks here</h3>
        <p>
          Open the project folder and paste each PDF into its subject folder:<br />
          <code>books\\English\\</code> <code>books\\Hindi\\</code> <code>books\\Math\\</code>
          <code>books\\Science\\</code> <code>books\\Computer-Science\\</code> <code>books\\General-Knowledge\\</code><br />
          Then hit refresh below — I read them from there to build the real lesson plans.
        </p>
        <button class="btn btn-primary btn-sm" id="btnRescan" style="margin-top:14px">🔄 Rescan Vault</button>
      </div>

      <div class="section-head"><h2>Vault Contents</h2><div class="rule"></div>
        <span class="pill">${total} file${total === 1 ? '' : 's'}</span></div>

      ${SUBJECTS.map((s) => {
        const files = books[s.folder] || [];
        return `
          <div class="panel clip vault-row">
            <div class="v-icon">${s.icon}</div>
            <div class="v-body">
              <div class="v-title">${esc(s.name)}</div>
              <div class="v-meta">books\\${esc(s.folder)}\\ · ${files.length} file${files.length === 1 ? '' : 's'}</div>
              <div>
                ${files.length
                  ? files.map((f) => `<a class="file-chip" href="${f.url}" target="_blank">📄 ${esc(f.name)} <span class="muted">${f.sizeMB} MB</span></a>`).join('')
                  : '<span class="empty-slot">Empty — paste a PDF here</span>'}
              </div>
            </div>
          </div>`;
      }).join('')}`;
  },

  parent() {
    document.getElementById('pageTitle').textContent = T('page.parent');
    const recent = state.log.slice(0, 12);
    return `
      <div class="notice">
        <b>Your controls.</b> Award bonus XP for effort off-screen, spend coins on treats, or reset the season.
        Nothing here is visible from Ruben's normal flow unless you open this page.
      </div>

      <div class="grid two" style="margin-bottom:26px">
        <div class="panel clip mcard" style="--rarity:var(--r-legendary); cursor:default">
          <div class="mcard-head"><div class="mcard-icon">⚡</div></div>
          <h3>Award Bonus XP</h3>
          <div class="blurb">Great effort, good behaviour, homework done without being asked.</div>
          <div class="mcard-foot row gap-8">
            <button class="btn btn-ghost btn-sm" data-bonus="25">+25</button>
            <button class="btn btn-ghost btn-sm" data-bonus="50">+50</button>
            <button class="btn btn-primary btn-sm" data-bonus="100">+100</button>
          </div>
        </div>

        <div class="panel clip mcard" style="--rarity:var(--r-mythic); cursor:default">
          <div class="mcard-head"><div class="mcard-icon">${T('coins.icon')}</div></div>
          <h3>${T('coins.label')}: ${state.player.coins}</h3>
          <div class="blurb">Coins come from daily quests. Spend them on small treats.</div>
          <div class="mcard-foot row gap-8">
            <button class="btn btn-ghost btn-sm" data-coins="25">+25</button>
            <button class="btn btn-ghost btn-sm" data-coins="-25">Spend 25</button>
            <button class="btn btn-ghost btn-sm" data-coins="-100">Spend 100</button>
          </div>
        </div>
      </div>

      <div class="section-head"><h2>Recent Activity</h2><div class="rule"></div></div>
      ${recent.length ? recent.map((l) => `
        <div class="panel clip vault-row" style="padding:11px 15px">
          <div class="v-icon" style="width:34px;height:34px;font-size:15px">${l.xp < 0 ? '↩︎' : '⚡'}</div>
          <div class="v-body">
            <div class="v-title" style="font-size:13px">${esc(l.label || 'XP awarded')}</div>
            <div class="v-meta">${new Date(l.at).toLocaleString()}</div>
          </div>
          <div class="xp-tag" style="${l.xp < 0 ? 'color:var(--magenta)' : ''}">${l.xp < 0 ? '' : '+'}${l.xp} XP</div>
        </div>`).join('')
      : '<div class="muted tiny">No activity yet.</div>'}

      <div class="section-head" style="margin-top:28px"><h2>💾 Save &amp; Backup</h2><div class="rule"></div>
        <span class="pill">${esc(STORAGE_INFO[storageMode].tag)}</span></div>
      <div class="panel clip storage-card ${storageMode === 'local' ? 'warn' : ''}">
        <span class="st-ico">${STORAGE_INFO[storageMode].icon}</span>
        <div class="st-body">
          <h4>${esc(STORAGE_INFO[storageMode].h)}</h4>
          <p>${STORAGE_INFO[storageMode].p}</p>
          <div class="row gap-8" style="margin-top:12px;flex-wrap:wrap">
            <button class="btn btn-primary btn-sm" id="btnExport">⬇️ Export progress</button>
            <button class="btn btn-ghost btn-sm" id="btnImport">⬆️ Import a backup</button>
            <input type="file" id="importFile" accept="application/json,.json" class="hidden" />
          </div>
        </div>
      </div>

      <div class="section-head" style="margin-top:28px"><h2>Danger Zone</h2><div class="rule"></div></div>
      <button class="btn btn-ghost btn-sm" id="btnRename">✏️ Rename Player</button>
      <button class="btn btn-ghost btn-sm btn-danger" id="btnReset">🗑️ Reset Season</button>`;
  },

  subject() {
    const s = SUBJECTS.find((x) => x.id === routeParam);
    if (!s) return PAGES.subjects();
    document.getElementById('pageTitle').textContent = s.name;

    const cur = CURRICULUM[s.id];
    const units = unitsOf(s.id);
    const store = subjectStore(s.id);
    const prog = subjectProgress(s.id);
    const files = books[s.folder] || [];
    const deva = cur && cur.deva ? ' deva' : '';
    const totalQ = units.reduce((n, u) => n + u.questions.length, 0);

    return `
      <button class="back-link" data-route="subjects">${T('back.subjects')}</button>

      <div class="panel clip subject-banner" style="--rarity:var(--r-${s.rarity})">
        <div class="big-icon">${s.icon}</div>
        <div style="flex:1">
          <h2>${esc(s.name)}</h2>
          <div class="tagline${deva}">${esc(s.tagline)}</div>
          <div class="xpbar thin" style="margin-top:14px;max-width:340px"><span style="width:${prog.pct}%"></span></div>
          <div class="tiny muted" style="margin-top:7px">${prog.done} of ${prog.total} units complete · ${prog.pct}% · ${totalQ} questions</div>
        </div>
        <span class="rarity-tag" style="--rarity:var(--r-${s.rarity})">${rarityLabel(s.rarity)}</span>
      </div>

      ${files.length ? `<div class="notice">
        📕 <b>${files.length} book file${files.length > 1 ? 's' : ''}</b> found in this subject's folder.
        Say the word and I'll read them and retune these units to his exact school syllabus.
      </div>` : ''}

      <div class="section-head"><h2>${T('subjects.units')}</h2><div class="rule"></div>
        <span class="pill">${cur ? cur.grade : 'Class 3'}</span></div>

      <div class="unit-grid">${units.map((u, i) => {
        const best = store.scores[u.id];
        const isDone = store.done.includes(u.id);
        const wasRead = store.read.includes(u.id);
        const chip = best == null ? ''
          : `<span class="score-chip ${best >= 80 ? '' : best >= 60 ? 'mid' : 'low'}">${best}%</span>`;
        return `<div class="panel clip unit-card ${isDone ? 'done' : ''}"
             style="--rarity:var(--r-${s.rarity}); animation-delay:${i * 45}ms"
             data-route="unit" data-param="${s.id}|${u.id}">
          <div class="unit-head">
            <div class="unit-ico">${u.icon}</div>
            <div style="flex:1;min-width:0">
              <div class="unit-n">Unit ${i + 1}${wasRead ? ' · read' : ''}</div>
              <h4 class="${deva}">${u.title}</h4>
            </div>
            ${isDone ? '<span class="unit-check">✓</span>' : ''}
          </div>
          <div class="u-goal${deva}">${u.goal}</div>
          <div class="unit-foot">
            <span class="unit-stat">${u.questions.length} questions</span>
            ${chip}
          </div>
        </div>`;
      }).join('')}</div>

      ${files.length ? `
        <div class="section-head" style="margin-top:28px"><h2>Source Books</h2><div class="rule"></div></div>
        <div>${files.map((f) => `<a class="file-chip" href="${f.url}" target="_blank">📄 ${esc(f.name)} <span class="muted">${f.sizeMB} MB</span></a>`).join('')}</div>` : ''}`;
  },

  unit() {
    const [sid, uid] = String(routeParam || '').split('|');
    const s = SUBJECTS.find((x) => x.id === sid);
    const u = findUnit(sid, uid);
    if (!s || !u) return PAGES.subjects();
    document.getElementById('pageTitle').textContent = u.title;
    LessonView.markRead(sid, uid);
    return LessonView.render(sid, uid);
  },

  quiz() {
    const [sid, uid] = String(routeParam || '').split('|');
    const u = findUnit(sid, uid);
    if (!u) return PAGES.subjects();
    document.getElementById('pageTitle').textContent = u.title;
    return '<div id="quizMount"></div>';
  },

  /* ---- Olympiad ---- */
  olympiad()   { return OlympiadView.index(); },
  olysubject() { return OlympiadView.subjectPage(routeParam); },
  omock() {
    if (!Quiz.oly) return OlympiadView.index();
    document.getElementById('pageTitle').textContent = Quiz.oly.paper.title;
    return '<div id="quizMount"></div>';
  },

  /* ---- News ---- */
  news() { return NewsView.page(); },

  /* ---- Schedule ---- */
  schedule() { return Schedule.page(); },

  /* ---- Hobbies ---- */
  hobbies()     { return HobbiesView.index(); },
  hobby()       { return HobbiesView.page(routeParam); },
  hobbylesson() { return HobbiesView.lesson(routeParam); },
};

/* ---------------- Router ---------------- */

/* Pages that need to take over their container after the HTML lands. */
const AFTER = {
  chess: () => ChessGame.mount(document.getElementById('chessMount')),
  ludo: () => LudoGame.mount(document.getElementById('ludoMount')),
  quiz: () => Quiz.mount(document.getElementById('quizMount')),
  omock: () => Quiz.mount(document.getElementById('quizMount')),
};

/* Which sidebar item lights up for a given route. */
const NAV_OF = {
  subject: 'subjects', unit: 'subjects', quiz: 'subjects',
  chess: 'games', ludo: 'games',
  olysubject: 'olympiad', omock: 'olympiad',
  hobby: 'hobbies', hobbylesson: 'hobbies',
};

function go(next, param) {
  // Leaving a timed mock paper stops the clock.
  if (next !== 'omock' && typeof Quiz === 'object' && Quiz.timerId) Quiz.stopTimer();
  route = next;
  routeParam = param || null;
  const navRoute = NAV_OF[route] || route;
  document.querySelectorAll('.nav-item').forEach((b) => {
    b.classList.toggle('active', b.dataset.route === navRoute);
  });
  document.getElementById('view').innerHTML = (PAGES[route] || PAGES.home)();
  document.querySelector('.main').scrollTop = 0;
  if (AFTER[route]) AFTER[route]();
  renderChrome();
}

/* ---------------- Modal ---------------- */

function modal(title, bodyHtml, onConfirm, confirmLabel) {
  const root = document.getElementById('modalRoot');
  root.innerHTML = `
    <div class="modal-back">
      <div class="panel clip modal">
        <h3>${esc(title)}</h3>
        ${bodyHtml}
        <div class="modal-actions">
          <button class="btn btn-ghost btn-sm" data-modal="cancel">Cancel</button>
          <button class="btn btn-primary btn-sm" data-modal="ok">${esc(confirmLabel || 'Confirm')}</button>
        </div>
      </div>
    </div>`;
  root.querySelector('[data-modal="cancel"]').onclick = () => (root.innerHTML = '');
  root.querySelector('[data-modal="ok"]').onclick = () => {
    const ok = onConfirm(root);
    if (ok !== false) root.innerHTML = '';
  };
  const input = root.querySelector('input');
  if (input) input.focus();
}

/* ---------------- Events (delegated) ---------------- */

document.addEventListener('click', (e) => {
  const t = e.target;

  const pick = t.closest('[data-theme-pick]');
  if (pick) return setTheme(pick.dataset.themePick);

  const nav = t.closest('[data-route]');
  if (nav) return go(nav.dataset.route, nav.dataset.param);

  const subject = t.closest('[data-subject]');
  if (subject) return go('subject', subject.dataset.subject);

  const game = t.closest('[data-game]');
  if (game) {
    const g = GAMES.find((x) => x.id === game.dataset.game);
    if (g.status !== 'live') return toast(g.icon + ' ' + g.name + ' is not built yet — that comes next!');
    return go(g.id);
  }

  /* ---- Chess ---- */
  const csq = t.closest('[data-sq]');
  if (csq) return ChessGame.click(Number(csq.dataset.sq));

  const promo = t.closest('[data-promo]');
  if (promo) return ChessGame.choosePromo(promo.dataset.promo);

  const diff = t.closest('[data-diff]');
  if (diff) {
    ChessGame.difficulty = diff.dataset.diff;
    ChessGame.render();
    return toast('Difficulty set to ' + ChessGame.level(diff.dataset.diff).label);
  }

  const speed = t.closest('[data-speed]');
  if (speed) {
    ChessGame.speed = speed.dataset.speed;
    ChessGame.render();
    return toast('Animation speed: ' + ChessGame.SPEEDS[speed.dataset.speed].label);
  }

  const chessBtn = t.closest('[data-chess]');
  if (chessBtn) {
    if (chessBtn.dataset.chess === 'new') return ChessGame.newGame();
    if (chessBtn.dataset.chess === 'undo') return ChessGame.undo();
  }

  /* ---- Ludo ---- */
  const ltok = t.closest('[data-ludo-token]');
  if (ltok) {
    const [pid, idx] = ltok.dataset.ludoToken.split(':').map(Number);
    if (pid === HUMAN) return LudoGame.pick(idx);
    return;
  }

  const ludoBtn = t.closest('[data-ludo]');
  if (ludoBtn) {
    if (ludoBtn.dataset.ludo === 'roll') return LudoGame.roll();
    if (ludoBtn.dataset.ludo === 'new') return LudoGame.newGame();
  }

  /* ---- News ---- */
  const newsCard = t.closest('[data-news]');
  if (newsCard) return NewsView.open(newsCard.dataset.news);

  const newsAct = t.closest('[data-news-act]');
  if (newsAct && newsAct.dataset.newsAct === 'refresh') {
    toast('📰 Fetching the latest…');
    return NewsView.load(true);
  }

  /* ---- Prompt Lab (AI side quest) ---- */
  const pl = t.closest('[data-prompt]');
  if (pl) {
    const act = pl.dataset.prompt;
    if (act === 'score') return HobbiesView.renderPromptScore();
    if (act === 'clear') {
      const el = document.getElementById('promptInput');
      if (el) { el.value = ''; el.focus(); }
      const box = document.getElementById('promptResult');
      if (box) box.innerHTML = '';
      return;
    }
    if (act === 'next') { HobbiesView.promptEg++; return go('hobby', 'ai'); }
  }

  /* ---- Schedule ---- */
  const schTick = t.closest('[data-sched-tick]');
  if (schTick) {
    e.stopPropagation();
    Schedule.toggleTick(schTick.dataset.schedTick);
    if (route === 'schedule') go('schedule'); else renderChrome();
    return;
  }

  const schEdit = t.closest('[data-sched-edit]');
  if (schEdit) return Schedule.openEdit(schEdit.dataset.schedEdit);

  const schDel = t.closest('[data-sched-del]');
  if (schDel) {
    Schedule.remove(schDel.dataset.schedDel);
    document.getElementById('modalRoot').innerHTML = '';
    go('schedule');
    return toast('🗑️ Removed');
  }

  const schBtn = t.closest('[data-sched]');
  if (schBtn) {
    const act = schBtn.dataset.sched;
    if (act === 'add') return Schedule.openAdd(schBtn.dataset.day !== undefined ? Number(schBtn.dataset.day) : undefined, false);
    if (act === 'addEvent') return Schedule.openAdd(undefined, true);
    if (act === 'reset') {
      return modal('Reset the timetable?',
        '<p class="muted" style="font-size:14px;line-height:1.6;margin-top:10px">This replaces every weekly slot with the starter timetable. One-off events are kept.</p>',
        () => {
          const events = Schedule.items().filter((i) => i.date);
          state.schedule.items = starterSchedule().concat(events);
          save();
          go('schedule');
          toast('📅 Starter timetable restored');
        }, 'Reset');
    }
  }

  /* ---- Olympiad ---- */
  const omock = t.closest('[data-omock]');
  if (omock) {
    const [sid, pid, mode] = omock.dataset.omock.split('|');
    Quiz.startOlympiad(sid, pid, mode === 'timed');
    return go('omock', sid + '|' + pid);
  }

  const planTick = t.closest('[data-plan-tick]');
  if (planTick) {
    const o = OlympiadView.store();
    const id = planTick.dataset.planTick;
    const at = o.planDone.indexOf(id);
    if (at > -1) o.planDone.splice(at, 1);
    else { o.planDone.push(id); addXp(30, '🗺️ Olympiad plan — ' + id.toUpperCase() + ' done'); }
    save();
    return go('olympiad');
  }

  const olyBtn = t.closest('[data-oly]');
  if (olyBtn && olyBtn.dataset.oly === 'clearErrors') {
    return modal('Clear the Error Book?',
      '<p class="muted" style="font-size:14px;line-height:1.6;margin-top:10px">This wipes every logged mistake. Only do it once he has actually re-done them.</p>',
      () => { OlympiadView.store().errors = []; save(); go('olympiad'); toast('📕 Error Book cleared'); }, 'Clear');
  }

  /* ---- Hobbies ---- */
  const prac = t.closest('[data-practice]');
  if (prac) {
    const [hid, mins] = prac.dataset.practice.split('|');
    HobbiesView.logPractice(hid, Number(mins));
    return go('hobby', hid);
  }

  const hDone = t.closest('[data-hobby-done]');
  if (hDone) {
    const [hid, lid] = hDone.dataset.hobbyDone.split('|');
    HobbiesView.toggleLesson(hid, lid);
    return go('hobbylesson', hid + '|' + lid);
  }

  /* ---- Lessons & quizzes ---- */
  const quizStart = t.closest('[data-quiz-start]');
  if (quizStart) {
    const [sid, uid] = quizStart.dataset.quizStart.split('|');
    Quiz.start(sid, uid);
    return go('quiz', sid + '|' + uid);
  }

  const opt = t.closest('[data-opt]');
  if (opt) return Quiz.pick(Number(opt.dataset.opt));

  const mLeft = t.closest('[data-match-left]');
  if (mLeft) return Quiz.matchPickLeft(Number(mLeft.dataset.matchLeft));

  const mRight = t.closest('[data-match-right]');
  if (mRight) return Quiz.matchPickRight(Number(mRight.dataset.matchRight));

  const quizBtn = t.closest('[data-quiz]');
  if (quizBtn) {
    const act = quizBtn.dataset.quiz;
    if (act === 'check') return Quiz.check();
    if (act === 'next') return Quiz.next();
    if (act === 'retry') return Quiz.retry();
  }

  const quest = t.closest('[data-quest]');
  if (quest) {
    const q = DAILY_QUESTS.find((x) => x.id === quest.dataset.quest);
    const list = state.quests.completed;
    const at = list.indexOf(q.id);
    if (at > -1) {
      list.splice(at, 1);
      addCoins(-q.coins);
      toast('Quest un-marked.');
    } else {
      list.push(q.id);
      addCoins(q.coins);
      toast(T('coins.icon') + ' +' + q.coins + ' ' + T('coins.label') + ' — ' + q.text, 'gold');
      if (list.length === DAILY_QUESTS.length) setTimeout(() => addXp(100, T('allquests')), 600);
    }
    save();
    renderChrome();
    return;
  }

  const claim = t.closest('[data-claim]');
  if (claim) {
    const tier = Number(claim.dataset.claim);
    const reward = BATTLE_PASS.find((x) => x.tier === tier);
    state.battlePass.claimed.push(tier);
    save();
    toast('🎁 Claimed: ' + reward.reward + ' — go tell your parents!', 'gold');
    return go('battlepass');
  }

  const bonus = t.closest('[data-bonus]');
  if (bonus) { addXp(Number(bonus.dataset.bonus), '🎖️ Bonus XP from parent'); return go('parent'); }

  const coins = t.closest('[data-coins]');
  if (coins) {
    const n = Number(coins.dataset.coins);
    addCoins(n);
    toast(n > 0 ? '🪙 +' + n + ' coins added' : '🪙 ' + Math.abs(n) + ' coins spent', 'gold');
    return go('parent');
  }

  if (t.closest('#btnRescan')) return rescan();

  if (t.closest('#btnResume')) {
    // Jump straight to the first unit he has not cleared yet.
    for (const s of SUBJECTS) {
      const store = subjectStore(s.id);
      const next = unitsOf(s.id).find((u) => !store.done.includes(u.id));
      if (next) return go('unit', s.id + '|' + next.id);
    }
    toast('🏆 Every unit is complete. Legend.', 'gold');
    return go('subjects');
  }

  if (t.closest('#btnExport')) {
    const stamp = new Date().toISOString().slice(0, 10);
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ruben-hq-' + stamp + '.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return toast('💾 Backup downloaded');
  }

  if (t.closest('#btnImport')) {
    const input = document.getElementById('importFile');
    if (input) input.click();
    return;
  }

  if (t.closest('#btnRename')) {
    return modal('Rename Player',
      '<div class="field"><label>Player name</label><input id="nameInput" value="' + esc(state.player.name) + '" /></div>',
      (root) => {
        const v = root.querySelector('#nameInput').value.trim();
        if (!v) return false;
        state.player.name = v;
        save();
        go('parent');
        toast('Player renamed to ' + v);
      }, 'Save');
  }

  if (t.closest('#btnReset')) {
    return modal('Reset Season?',
      '<p class="muted" style="font-size:14px;line-height:1.6;margin-top:10px">This wipes all XP, levels, coins, completed lessons and claimed rewards. Book files are untouched. This cannot be undone.</p>',
      () => {
        state = structuredClone(DEFAULT_STATE);
        state.player.lastActive = todayKey();
        state.player.streak = 1;
        state.quests.date = todayKey();
        save();
        go('home');
        toast('Season reset. Fresh start! 🚀');
      }, 'Yes, reset');
  }
});

/* Enter checks the answer, then Enter again moves on. */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' || route !== 'quiz' || Quiz.finished) return;
  e.preventDefault();
  if (Quiz.checked) Quiz.next(); else Quiz.check();
});

/* Restoring a backup: read the file, sanity-check it, then swap it in. */
document.addEventListener('change', (e) => {
  if (e.target.id !== 'importFile' || !e.target.files || !e.target.files[0]) return;
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    let incoming;
    try { incoming = JSON.parse(reader.result); } catch { return toast('That file is not valid JSON.'); }
    if (!incoming || !incoming.player || typeof incoming.player.xp !== 'number') {
      return toast('That does not look like a Learning HQ backup.');
    }
    modal('Restore this backup?',
      '<p class="muted" style="font-size:14px;line-height:1.6;margin-top:10px">' +
      '<b>' + esc(incoming.player.name || 'Player') + '</b> · ' + incoming.player.xp.toLocaleString() + ' XP · ' +
      (incoming.player.coins || 0).toLocaleString() + ' coins<br />' +
      'This replaces everything currently saved. There is no undo, so export the current progress first if you want to keep it.</p>',
      () => {
        state = Object.assign(structuredClone(DEFAULT_STATE), incoming);
        state.theme = themeId;
        save();
        renderChrome();
        go('parent');
        toast('✅ Backup restored — ' + state.player.xp.toLocaleString() + ' XP', 'gold');
      }, 'Restore');
  };
  reader.readAsText(file);
  e.target.value = '';
});

/* Typing in the answer box should enable the Check button live. */
document.addEventListener('input', (e) => {
  if (e.target.id !== 'answerInput' || route !== 'quiz') return;
  const btn = document.querySelector('[data-quiz="check"]');
  if (btn) btn.disabled = !e.target.value.trim();
});

/* ---------------- Boot ---------------- */

/**
 * The vault listing. Locally /api/books scans the folder live. On a deployed
 * copy the folder is read-only and baked in at build time, so fall back to the
 * static manifest build.js writes — that always ships with the site.
 */
async function loadBooks() {
  try {
    const res = await fetch('/api/books');
    const listed = await res.json();
    if (Object.values(listed).some((f) => f.length)) return listed;
  } catch { /* try the manifest instead */ }
  try {
    const res = await fetch('/books-manifest.json');
    if (res.ok) return await res.json();
  } catch { /* no manifest either */ }
  return {};
}

async function rescan() {
  books = await loadBooks();
  const n = Object.values(books).reduce((a, f) => a + f.length, 0);
  toast(n ? '📚 Vault rescanned — ' + n + ' file(s) found' : '📚 Vault rescanned — no books found');
  go(route, routeParam);
}

(async function boot() {
  paintChrome();
  await loadState();
  books = await loadBooks();
  NewsView.load();   // background — the page and the nav badge fill in when it lands
  paintChrome();
  go('home');
})();
