/*
 * GET /api/news         -> today's kid-safe headlines (3-hour cache)
 * GET /api/news?refresh=1 -> skip the cache and refetch now
 *
 * Locally the cache is a file in data/. On Vercel the disk is read-only, so
 * it caches in module memory instead — warm invocations reuse it, and a cold
 * start costs a single fetch.
 */

const path = require('path');
const news = require('../news');
const { sendJSON, ON_VERCEL } = require('./_shared');

const DATA = ON_VERCEL ? null : path.join(__dirname, '..', 'data');

module.exports = async function handler(req, res) {
  let refresh = false;
  try {
    refresh = new URL(req.url, 'http://localhost').searchParams.get('refresh') === '1';
  } catch { /* malformed url: just use the cache */ }

  try {
    const out = await news.getNews(DATA, refresh);
    return sendJSON(res, 200, out);
  } catch (e) {
    return sendJSON(res, 200, { items: [], count: 0, offline: true, error: String(e && e.message || e) });
  }
};
