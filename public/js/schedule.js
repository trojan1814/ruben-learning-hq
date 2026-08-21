/* ============================================================
   SCHEDULE — an editable weekly timetable + one-off events

   Everything lives in state.schedule so it saves to data/state.json:
     items: [ { id, title, kind, day|date, time, len, place, note } ]
     ticks: { '2026-08-21': ['id1','id2'] }   what got done, per day

   `day` 0-6 (0 = Sunday) makes it a weekly repeat.
   `date` 'YYYY-MM-DD' makes it a one-off event instead.
   ============================================================ */

const SCHED_KINDS = {
  school: { label: 'School',  icon: '🏫', rarity: 'rare' },
  class:  { label: 'Class',   icon: '📚', rarity: 'epic' },
  sport:  { label: 'Sport',   icon: '⚽', rarity: 'uncommon' },
  music:  { label: 'Music',   icon: '🎹', rarity: 'legendary' },
  study:  { label: 'Study',   icon: '🎯', rarity: 'mythic' },
  event:  { label: 'Event',   icon: '🎉', rarity: 'common' },
};

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/* A sensible starting timetable. Everything here is editable in the app —
   it exists so the page is never empty on day one. */
function starterSchedule() {
  const mk = (day, time, title, kind, len, place) =>
    ({ id: 'sc' + Math.random().toString(36).slice(2, 9), day, time, title, kind, len, place: place || '', note: '' });
  const out = [];
  for (let d = 1; d <= 5; d++) out.push(mk(d, '08:00', 'School', 'school', '6 h', ''));
  out.push(mk(1, '16:00', 'Maths practice', 'study', '30 min'));
  out.push(mk(1, '17:00', 'Piano practice', 'music', '30 min'));
  out.push(mk(2, '16:00', 'Science practice', 'study', '30 min'));
  out.push(mk(2, '17:30', 'Football', 'sport', '1 h'));
  out.push(mk(3, '16:00', 'English practice', 'study', '30 min'));
  out.push(mk(3, '17:00', 'Piano lesson', 'music', '45 min'));
  out.push(mk(4, '16:00', 'Computer practice', 'study', '30 min'));
  out.push(mk(4, '17:30', 'Swimming', 'sport', '1 h'));
  out.push(mk(5, '16:00', 'Olympiad mock', 'study', '45 min'));
  out.push(mk(6, '09:00', 'Golf lesson', 'sport', '1 h'));
  out.push(mk(6, '16:00', 'Free play', 'event', '1 h'));
  out.push(mk(0, '10:00', 'Piano practice', 'music', '30 min'));
  out.push(mk(0, '17:00', 'Weekly quiz', 'study', '30 min'));
  return out;
}

const Schedule = {

  store() {
    state.schedule = state.schedule || {};
    if (!Array.isArray(state.schedule.items)) state.schedule.items = starterSchedule();
    state.schedule.ticks = state.schedule.ticks || {};
    return state.schedule;
  },

  items() { return this.store().items; },

  /** Everything happening on a given Date, in time order. */
  forDate(d) {
    const key = dateKey(d);
    const day = d.getDay();
    return this.items()
      .filter((it) => (it.date ? it.date === key : it.day === day))
      .sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  },

  forDay(day) {
    return this.items()
      .filter((it) => !it.date && it.day === day)
      .sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  },

  /** One-off events from today onwards. */
  upcoming() {
    const today = todayKey();
    return this.items()
      .filter((it) => it.date && it.date >= today)
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  },

  find(id) { return this.items().find((it) => it.id === id); },

  add(item) {
    item.id = 'sc' + Math.random().toString(36).slice(2, 9);
    this.items().push(item);
    save();
    return item;
  },

  update(id, patch) {
    const it = this.find(id);
    if (it) Object.assign(it, patch);
    save();
  },

  remove(id) {
    const list = this.items();
    const i = list.findIndex((x) => x.id === id);
    if (i > -1) list.splice(i, 1);
    save();
  },

  /** Tick something off for today. Ticking the whole day pays a bonus. */
  toggleTick(id) {
    const st = this.store();
    const key = todayKey();
    st.ticks[key] = st.ticks[key] || [];
    const at = st.ticks[key].indexOf(id);
    const item = this.find(id);
    if (at > -1) {
      st.ticks[key].splice(at, 1);
    } else {
      st.ticks[key].push(id);
      if (item) toast('✅ ' + item.title + ' done!');
      const todays = this.forDate(new Date());
      if (todays.length && todays.every((t) => st.ticks[key].includes(t.id))) {
        setTimeout(() => addXp(40, '📅 Whole day ticked off!'), 500);
      }
    }
    save();
  },

  isTicked(id) {
    const st = this.store();
    return (st.ticks[todayKey()] || []).includes(id);
  },

  /* ---------------- rendering ---------------- */

  chip(it, opts) {
    opts = opts || {};
    const k = SCHED_KINDS[it.kind] || SCHED_KINDS.event;
    const ticked = opts.tickable && this.isTicked(it.id);
    return `
      <div class="sch-item ${ticked ? 'ticked' : ''}" style="--rarity:var(--r-${k.rarity})" data-sched-edit="${it.id}">
        ${opts.tickable ? `<button class="sch-tick" data-sched-tick="${it.id}" title="Tick off">${ticked ? '✓' : ''}</button>` : ''}
        <span class="sch-ico">${k.icon}</span>
        <div class="sch-body">
          <div class="sch-title">${esc(it.title)}</div>
          <div class="sch-meta">${esc(fmtTime(it.time))}${it.len ? ' · ' + esc(it.len) : ''}${it.place ? ' · ' + esc(it.place) : ''}</div>
          ${it.note ? `<div class="sch-note">${esc(it.note)}</div>` : ''}
        </div>
        <span class="sch-kind">${k.label}</span>
      </div>`;
  },

  page() {
    document.getElementById('pageTitle').textContent = T('page.schedule');
    const today = new Date();
    const todays = this.forDate(today);
    const doneToday = (this.store().ticks[todayKey()] || []).length;
    const ups = this.upcoming();

    // Monday-first week order, with today highlighted.
    const order = [1, 2, 3, 4, 5, 6, 0];

    return `
      <div class="notice">
        <b>This is his real week.</b> Add school, classes, sports, lessons and one-off events —
        then tick them off as they happen. Everything here saves to disk, and today's list also
        shows in the side rail.
      </div>

      <div class="row gap-8" style="margin-bottom:20px;flex-wrap:wrap">
        <button class="btn btn-primary btn-sm" data-sched="add">＋ Add to the week</button>
        <button class="btn btn-ghost btn-sm" data-sched="addEvent">📅 Add a one-off event</button>
        <button class="btn btn-ghost btn-sm" data-sched="reset">↺ Starter timetable</button>
      </div>

      <div class="panel clip today-strip">
        <div>
          <div class="unit-kicker">Today · ${DAY_NAMES[today.getDay()]}</div>
          <h3>${todays.length ? doneToday + ' of ' + todays.length + ' done' : 'Nothing scheduled'}</h3>
        </div>
        <div class="xpbar" style="flex:1;max-width:320px">
          <span style="width:${todays.length ? Math.round(doneToday / todays.length * 100) : 0}%"></span>
        </div>
      </div>

      <div class="today-list">
        ${todays.length ? todays.map((it) => this.chip(it, { tickable: true })).join('')
          : '<div class="muted tiny" style="padding:8px 2px">Free day. Add something with the button above.</div>'}
      </div>

      ${ups.length ? `
        <div class="section-head" style="margin-top:28px"><h2>📅 Coming up</h2><div class="rule"></div></div>
        <div class="today-list">${ups.map((it) => `
          <div class="sch-item" style="--rarity:var(--r-${(SCHED_KINDS[it.kind] || SCHED_KINDS.event).rarity})" data-sched-edit="${it.id}">
            <span class="sch-ico">${(SCHED_KINDS[it.kind] || SCHED_KINDS.event).icon}</span>
            <div class="sch-body">
              <div class="sch-title">${esc(it.title)}</div>
              <div class="sch-meta">${fmtDate(it.date)} · ${esc(fmtTime(it.time))}${it.len ? ' · ' + esc(it.len) : ''}</div>
              ${it.note ? `<div class="sch-note">${esc(it.note)}</div>` : ''}
            </div>
            <span class="sch-kind">${(SCHED_KINDS[it.kind] || SCHED_KINDS.event).label}</span>
          </div>`).join('')}</div>` : ''}

      <div class="section-head" style="margin-top:28px"><h2>🗓️ The whole week</h2><div class="rule"></div>
        <span class="pill">${this.items().filter((i) => !i.date).length} weekly slots</span></div>

      <div class="week-grid">
        ${order.map((d) => {
          const list = this.forDay(d);
          const isToday = d === today.getDay();
          return `
            <div class="panel clip day-col ${isToday ? 'is-today' : ''}">
              <div class="day-head">
                <span>${DAY_SHORT[d]}</span>
                <button class="day-add" data-sched="add" data-day="${d}" title="Add to ${DAY_NAMES[d]}">＋</button>
              </div>
              ${list.length ? list.map((it) => this.chip(it)).join('')
                : '<div class="day-empty">—</div>'}
            </div>`;
        }).join('')}
      </div>

      <div class="tiny muted" style="margin-top:16px">Tap any card to edit or delete it.</div>`;
  },

  /* ---------------- add / edit form ---------------- */

  form(existing, presetDay, asEvent) {
    const it = existing || {};
    const isEvent = asEvent || !!it.date;
    const kindOpts = Object.entries(SCHED_KINDS)
      .map(([k, v]) => `<option value="${k}" ${it.kind === k ? 'selected' : ''}>${v.icon} ${v.label}</option>`).join('');
    const dayOpts = [1, 2, 3, 4, 5, 6, 0]
      .map((d) => `<option value="${d}" ${(it.day !== undefined ? it.day : presetDay) === d ? 'selected' : ''}>${DAY_NAMES[d]}</option>`).join('');

    return `
      <div class="field"><label>What is it?</label>
        <input id="scTitle" value="${esc(it.title || '')}" placeholder="Piano lesson" /></div>
      <div class="form-row">
        <div class="field"><label>Type</label><select id="scKind">${kindOpts}</select></div>
        ${isEvent
          ? `<div class="field"><label>Date</label><input id="scDate" type="date" value="${esc(it.date || todayKey())}" /></div>`
          : `<div class="field"><label>Day</label><select id="scDay">${dayOpts}</select></div>`}
      </div>
      <div class="form-row">
        <div class="field"><label>Start time</label><input id="scTime" type="time" value="${esc(it.time || '16:00')}" /></div>
        <div class="field"><label>How long</label><input id="scLen" value="${esc(it.len || '30 min')}" placeholder="30 min" /></div>
      </div>
      <div class="field"><label>Where (optional)</label>
        <input id="scPlace" value="${esc(it.place || '')}" placeholder="Club / home / school" /></div>
      <div class="field"><label>Note (optional)</label>
        <input id="scNote" value="${esc(it.note || '')}" placeholder="Bring golf shoes" /></div>
      ${existing ? '<button class="btn btn-ghost btn-sm btn-danger" data-sched-del="' + existing.id + '" style="margin-top:16px">🗑️ Delete this</button>' : ''}`;
  },

  read(root, isEvent) {
    const v = (id) => { const el = root.querySelector('#' + id); return el ? el.value.trim() : ''; };
    const title = v('scTitle');
    if (!title) return null;
    const out = {
      title, kind: v('scKind') || 'event', time: v('scTime') || '16:00',
      len: v('scLen'), place: v('scPlace'), note: v('scNote'),
    };
    if (isEvent) out.date = v('scDate') || todayKey();
    else out.day = Number(root.querySelector('#scDay').value);
    return out;
  },

  openAdd(presetDay, asEvent) {
    modal(asEvent ? 'Add an event' : 'Add to the week',
      this.form(null, presetDay === undefined ? 1 : presetDay, asEvent),
      (root) => {
        const data = this.read(root, asEvent);
        if (!data) return false;
        this.add(data);
        go('schedule');
        toast('📅 ' + data.title + ' added');
      }, 'Add');
  },

  openEdit(id) {
    const it = this.find(id);
    if (!it) return;
    modal('Edit · ' + it.title, this.form(it), (root) => {
      const data = this.read(root, !!it.date);
      if (!data) return false;
      if (it.date) delete it.day; else delete it.date;
      this.update(id, data);
      go('schedule');
      toast('📅 Updated');
    }, 'Save');
  },
};

/* ---- shared date helpers ---- */

function dateKey(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

/** '16:30' -> '4:30 PM' */
function fmtTime(t) {
  if (!t) return '';
  const [h, m] = String(t).split(':').map(Number);
  if (isNaN(h)) return t;
  const ap = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return hh + ':' + String(m || 0).padStart(2, '0') + ' ' + ap;
}

/** '2026-12-01' -> 'Tue 1 Dec' */
function fmtDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
}

/** Whole days from today until an ISO date. Negative once it has passed. */
function daysUntil(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const then = new Date(y, m - 1, d);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((then - now) / 864e5);
}
