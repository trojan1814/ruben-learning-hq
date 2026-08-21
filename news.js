/*
 * DAILY NEWS — kid-safe world news for the dashboard.
 *
 * Sources are all written FOR children or about science, with BBC Newsround
 * (the BBC's own news service for 6-12 year olds) as the backbone. On top of
 * that every story passes a keyword filter before it is ever served, so
 * anything violent, criminal or otherwise unsuitable is dropped rather than
 * shown and explained away.
 *
 * Zero dependencies: https.get + a small regex RSS parse.
 * Results cache to data/news-cache.json and refresh every 3 hours, so the
 * page still works with the internet unplugged.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CACHE_HOURS = 3;
const MAX_ITEMS = 24;

const FEEDS = [
  { id: 'newsround', source: 'BBC Newsround', topic: 'World',    icon: '🌍', url: 'https://feeds.bbci.co.uk/newsround/rss.xml', take: 14 },
  { id: 'snex',      source: 'Science News Explores', topic: 'Science', icon: '🔬', url: 'https://www.snexplores.org/feed', take: 6 },
  { id: 'nasa',      source: 'NASA', topic: 'Space',            icon: '🚀', url: 'https://www.nasa.gov/feeds/iotd-feed/', take: 4 },
];

/* ---------------------------------------------------------------
   THE FILTER
   A story is dropped if its title or summary trips any of these.
   Deliberately blunt: for a 9-year-old, a false positive (a fine
   story dropped) costs nothing, a false negative costs a lot.
   --------------------------------------------------------------- */
const BLOCK = [
  // violence & death
  'kill', 'killed', 'killing', 'murder', 'dead', 'death', 'died', 'dies', 'fatal',
  'shot', 'shooting', 'gunman', 'gun ', 'stabb', 'attack', 'assault', 'massacre',
  'bomb', 'explosion', 'blast', 'terror', 'hostage', 'kidnap', 'execution',
  'war', 'troops', 'missile', 'airstrike', 'strikes on', 'invasion', 'militant',
  'casualt', 'wounded', 'injured in', 'body found', 'bodies',
  // crime & courts
  'arrest', 'jail', 'prison', 'sentenc', 'convict', 'guilty', 'court case',
  'abuse', 'assaulted', 'trafficking', 'kidnapp', 'scam', 'fraud',
  // adult themes
  'sex', 'sexual', 'rape', 'porn', 'nude', 'drug', 'cocaine', 'alcohol', 'drunk',
  'suicide', 'self-harm', 'overdose', 'gambl',
  // distressing
  'disaster', 'earthquake kill', 'famine', 'starv', 'refugee crisis', 'genocide',
  'racist', 'racism row', 'hate crime', 'protest violence', 'riot',
  'cancer', 'disease outbreak', 'virus outbreak', 'pandemic death',
];

/* Words that mark a story as extra good for a curious 9-year-old. */
const BOOST = [
  'space', 'planet', 'dinosaur', 'animal', 'ocean', 'robot', 'invent', 'discover',
  'science', 'record', 'youngest', 'kid', 'school', 'sport', 'football', 'olympic',
  'game', 'lego', 'volcano', 'shark', 'whale', 'panda', 'penguin', 'rescue',
  'nasa', 'rocket', 'moon', 'mars', 'ai ', 'technology', 'award', 'won ', 'wins',
];

function isSafe(text) {
  const t = ' ' + String(text).toLowerCase() + ' ';
  return !BLOCK.some((w) => t.includes(w));
}

function score(item) {
  const t = (item.title + ' ' + item.summary).toLowerCase();
  return BOOST.reduce((n, w) => n + (t.includes(w) ? 1 : 0), 0);
}

/* ---- tiny RSS parse ---- */

function tag(block, name) {
  const m = block.match(new RegExp('<' + name + '[^>]*>([\\s\\S]*?)</' + name + '>', 'i'));
  if (!m) return '';
  return m[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
}

function clean(s) {
  return String(s)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;|&apos;|&#8217;/g, "'")
    .replace(/&#8216;|&#8220;|&#8221;/g, '"').replace(/&hellip;|&#8230;/g, '…')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* BBC feeds hand out 240px thumbnails; the same URL serves larger sizes. */
function bigger(url) {
  return url ? url.replace('/standard/240/', '/standard/640/') : url;
}

function parseFeed(xml, feed) {
  const out = [];
  const blocks = xml.split(/<item[\s>]/i).slice(1);
  for (const raw of blocks) {
    const block = raw.split(/<\/item>/i)[0];
    const title = clean(tag(block, 'title'));
    const summary = clean(tag(block, 'description'));
    const link = clean(tag(block, 'link')) || (block.match(/<link[^>]*href="([^"]+)"/i) || [])[1] || '';
    const date = tag(block, 'pubDate') || tag(block, 'dc:date');
    const img = (block.match(/<media:thumbnail[^>]*url="([^"]+)"/i)
      || block.match(/<enclosure[^>]*url="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i)
      || block.match(/<media:content[^>]*url="([^"]+)"/i) || [])[1] || '';
    if (!title || !link) continue;
    out.push({
      title, summary: summary.slice(0, 400), link, image: bigger(img),
      date: date ? new Date(date).toISOString() : null,
      source: feed.source, topic: feed.topic, icon: feed.icon,
    });
  }
  return out;
}

function get(url) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      timeout: 12000,
      headers: { 'User-Agent': 'Mozilla/5.0 (RubenLearningHQ/1.0)', Accept: 'application/rss+xml, application/xml, text/xml' },
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(get(res.headers.location));
      }
      if (res.statusCode !== 200) { res.resume(); return resolve(''); }
      let d = '';
      res.setEncoding('utf8');
      res.on('data', (c) => { d += c; if (d.length > 4e6) req.destroy(); });
      res.on('end', () => resolve(d));
    });
    req.on('timeout', () => { req.destroy(); resolve(''); });
    req.on('error', () => resolve(''));
  });
}

/* ---- the public bit ---- */

async function fetchNews() {
  const all = [];
  const results = await Promise.all(FEEDS.map((f) => get(f.url).then((xml) => ({ f, xml }))));

  for (const { f, xml } of results) {
    if (!xml) continue;
    const items = parseFeed(xml, f)
      .filter((it) => isSafe(it.title) && isSafe(it.summary))
      // "Watch Newsround" style bulletins have no story of their own.
      .filter((it) => !/^watch newsround|^newsround\b/i.test(it.title))
      .sort((a, b) => score(b) - score(a))
      .slice(0, f.take);
    all.push(...items);
  }

  // Newest first, de-duplicated by title.
  const seen = new Set();
  const items = all
    .filter((it) => { const k = it.title.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, MAX_ITEMS);

  return { fetchedAt: new Date().toISOString(), count: items.length, items };
}

function cacheFile(dataDir) { return path.join(dataDir, 'news-cache.json'); }

/* Serverless has a read-only disk, so the cache also lives in module memory.
   That survives between invocations on a warm instance, and the 3-hour window
   means a cold start costs one fetch. */
let memCache = null;

function readCache(dataDir) {
  if (dataDir) {
    try { return JSON.parse(fs.readFileSync(cacheFile(dataDir), 'utf8')); } catch { /* no file yet */ }
  }
  return memCache;
}

function writeCache(dataDir, news) {
  memCache = news;
  if (!dataDir) return;
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(cacheFile(dataDir), JSON.stringify(news, null, 2));
  } catch { /* read-only filesystem: memory copy is enough */ }
}

function fresh(cache) {
  if (!cache || !cache.fetchedAt) return false;
  return (Date.now() - new Date(cache.fetchedAt).getTime()) < CACHE_HOURS * 3600e3;
}

/**
 * Cached news. Refreshes at most every 3 hours; `force` skips the cache.
 * Pass dataDir = null for memory-only caching (Vercel).
 * If the network is down, the last good cache is served with stale:true —
 * the page never ends up blank.
 */
async function getNews(dataDir, force) {
  const cache = readCache(dataDir);
  if (!force && fresh(cache)) return Object.assign({ cached: true }, cache);

  try {
    const news = await fetchNews();
    if (news.items.length) {
      writeCache(dataDir, news);
      return Object.assign({ cached: false }, news);
    }
  } catch { /* fall through to the cache */ }

  if (cache) return Object.assign({ cached: true, stale: true }, cache);
  return { fetchedAt: null, count: 0, items: [], offline: true };
}

module.exports = { getNews, fetchNews, isSafe };
