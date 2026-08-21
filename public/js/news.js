/* ============================================================
   NEWS — today's world, filtered for a 9-year-old.

   Stories come from /api/news, which the server refreshes every few
   hours from BBC Newsround (the BBC's own service for 6-12 year olds),
   Science News Explores and NASA — and keyword-filters before serving.

   state.news = { read: ['story-key'], lastSeen: 'YYYY-MM-DD' }
   Reading a story pays a small XP nudge, capped per day.
   ============================================================ */

let NEWS = { items: [], count: 0, fetchedAt: null, loading: true };

const NEWS_XP = 5;
const NEWS_XP_CAP = 5;   // how many stories a day can pay out

const NewsView = {

  store() {
    state.news = state.news || {};
    state.news.read = state.news.read || [];
    state.news.paid = state.news.paid || {};   // { 'YYYY-MM-DD': n }
    // Only the last fortnight of payout counters is worth keeping.
    const keys = Object.keys(state.news.paid).sort();
    if (keys.length > 14) keys.slice(0, keys.length - 14).forEach((k) => delete state.news.paid[k]);
    return state.news;
  },

  key(item) { return item.link || item.title; },
  isRead(item) { return this.store().read.includes(this.key(item)); },

  unreadCount() {
    if (!NEWS.items.length) return 0;
    return NEWS.items.filter((i) => !this.isRead(i)).length;
  },

  /** Opening a story marks it read and pays out, up to the daily cap. */
  open(key) {
    const item = NEWS.items.find((i) => this.key(i) === key);
    if (!item) return;
    const s = this.store();
    if (!s.read.includes(key)) {
      s.read.push(key);
      s.read = s.read.slice(-300);
      const today = todayKey();
      s.paid[today] = s.paid[today] || 0;
      if (s.paid[today] < NEWS_XP_CAP) {
        s.paid[today]++;
        addXp(NEWS_XP, '📰 Read: ' + item.title.slice(0, 40));
      }
      save();
    }
    window.open(item.link, '_blank', 'noopener');
    if (route === 'news') go('news');
  },

  async load(force) {
    NEWS.loading = true;
    if (route === 'news') go('news');
    try {
      const res = await fetch('/api/news' + (force ? '?refresh=1' : ''));
      NEWS = await res.json();
    } catch {
      NEWS = { items: [], count: 0, offline: true };
    }
    NEWS.loading = false;
    if (route === 'news') go('news');
    renderChrome();
  },

  /* ---------------- rendering ---------------- */

  when(iso) {
    if (!iso) return '';
    const mins = Math.round((Date.now() - new Date(iso)) / 60000);
    if (mins < 60) return mins <= 1 ? 'just now' : mins + ' min ago';
    const hrs = Math.round(mins / 60);
    if (hrs < 24) return hrs + (hrs === 1 ? ' hour ago' : ' hours ago');
    const days = Math.round(hrs / 24);
    if (days === 1) return 'yesterday';
    if (days < 7) return days + ' days ago';
    return fmtDate(iso.slice(0, 10));
  },

  card(item, big) {
    const read = this.isRead(item);
    const k = esc(this.key(item));
    return `
      <div class="panel clip news-card ${big ? 'big' : ''} ${read ? 'read' : ''}" data-news="${k}">
        ${item.image ? `<div class="news-img"><img src="${esc(item.image)}" alt=""
             onerror="this.parentElement.style.display='none'" /></div>` : ''}
        <div class="news-body">
          <div class="news-top">
            <span class="news-topic">${item.icon} ${esc(item.topic)}</span>
            <span class="news-when">${esc(this.when(item.date))}</span>
          </div>
          <h4>${esc(item.title)}</h4>
          ${item.summary ? `<p>${esc(item.summary.slice(0, big ? 260 : 150))}${item.summary.length > (big ? 260 : 150) ? '…' : ''}</p>` : ''}
          <div class="news-foot">
            <span class="news-src">${esc(item.source)}</span>
            <span class="news-go">${read ? '✓ Read' : 'Read it →'}</span>
          </div>
        </div>
      </div>`;
  },

  page() {
    document.getElementById('pageTitle').textContent = T('page.news');

    if (NEWS.loading) {
      return `<div class="panel clip news-loading">
        <div class="thinking-dots"><i></i><i></i><i></i></div>
        <h3>Fetching today's news…</h3>
        <p class="muted tiny">Checking BBC Newsround, Science News Explores and NASA.</p>
      </div>`;
    }

    if (!NEWS.items.length) {
      return `<div class="notice">
        <b>No stories right now.</b> ${NEWS.offline
          ? 'The server could not reach the internet. Check the connection and hit refresh.'
          : 'Every story was filtered out, which is unusual — try refreshing.'}
      </div>
      <button class="btn btn-primary btn-sm" data-news-act="refresh">🔄 Try again</button>`;
    }

    const [lead, ...rest] = NEWS.items;
    const topics = [...new Set(NEWS.items.map((i) => i.topic))];
    const unread = this.unreadCount();

    return `
      <div class="notice news-notice">
        <b>📰 Today's world, kid-safe.</b> Stories come from
        <b>BBC Newsround</b> — the BBC's own news service written for 6–12 year olds —
        plus Science News Explores and NASA. Every headline is keyword-filtered before
        it reaches this page, so anything violent, criminal or grown-up is dropped rather
        than shown. Tapping a story opens the original site in a new tab.
      </div>

      <div class="news-bar">
        <div class="news-meta">
          <span class="pill">${NEWS.items.length} stories</span>
          <span class="pill hi-ok">${unread} unread</span>
          ${topics.map((t) => `<span class="pill">${esc(t)}</span>`).join('')}
          ${NEWS.fetchedAt ? `<span class="tiny muted">Updated ${this.when(NEWS.fetchedAt)}${NEWS.stale ? ' · offline copy' : ''}</span>` : ''}
        </div>
        <button class="btn btn-ghost btn-sm" data-news-act="refresh">🔄 Refresh</button>
      </div>

      <div class="section-head"><h2>${T('news.lead')}</h2><div class="rule"></div></div>
      ${this.card(lead, true)}

      <div class="section-head" style="margin-top:26px"><h2>${T('news.more')}</h2><div class="rule"></div></div>
      <div class="news-grid">${rest.map((i) => this.card(i)).join('')}</div>

      <div class="panel clip talk-box">
        <h3>💬 Talk about it</h3>
        <p>Pick one story and ask him these — it turns reading into thinking:</p>
        <ul class="rules">
          <li><b>What happened?</b> Retell it in three sentences, no looking.</li>
          <li><b>Who does it affect?</b> Who is better off, who is worse off?</li>
          <li><b>How do they know?</b> Who told the reporter — and could they be wrong?</li>
          <li><b>What would you do?</b> If you were in charge, what happens next?</li>
          <li><b>What else do you want to know?</b> Every good question beats a fact.</li>
        </ul>
      </div>`;
  },
};
