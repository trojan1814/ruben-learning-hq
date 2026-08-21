/*
 * GET  /api/state  -> the saved progress
 * POST /api/state  -> save progress
 *
 * Storage, in order of preference:
 *   1. Upstash Redis (Vercel Marketplace) when the env vars are present.
 *      This is what makes progress follow him across devices online.
 *   2. A local data/state.json file when running on your own machine.
 *   3. Nothing — respond 501 and let the browser keep its own copy in
 *      localStorage. The app already falls back to that on its own, so the
 *      site still works fully before the database is connected.
 */

const fs = require('fs');
const path = require('path');
const { sendJSON, readBody, ON_VERCEL } = require('./_shared');

const KEY = 'ruben-hq:state';

/* Vercel's Upstash integration sets KV_REST_API_*; a direct Upstash account
   sets UPSTASH_REDIS_REST_*. Accept either. */
function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ''), token } : null;
}

async function redisGet(cfg) {
  const r = await fetch(cfg.url + '/get/' + encodeURIComponent(KEY), {
    headers: { Authorization: 'Bearer ' + cfg.token },
  });
  if (!r.ok) throw new Error('redis get ' + r.status);
  const body = await r.json();
  return body.result ? JSON.parse(body.result) : null;
}

async function redisSet(cfg, value) {
  const r = await fetch(cfg.url + '/set/' + encodeURIComponent(KEY), {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + cfg.token, 'Content-Type': 'text/plain' },
    body: JSON.stringify(value),
  });
  if (!r.ok) throw new Error('redis set ' + r.status);
}

/* ---- local disk (only off Vercel) ---- */

const DATA = path.join(__dirname, '..', 'data');
const FILE = path.join(DATA, 'state.json');

function diskRead() {
  try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return null; }
}

function diskWrite(state) {
  fs.mkdirSync(DATA, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(state, null, 2));
}

const DEFAULT_STATE = {
  player: { name: 'Ruben Sandhu', level: 1, xp: 0, coins: 0, streak: 0, lastActive: null },
  battlePass: { claimed: [] },
  subjects: {},
  quests: { date: null, completed: [] },
  log: [],
};

module.exports = async function handler(req, res) {
  const cfg = redisConfig();
  // Lets the Parent Zone tell you where progress is actually being kept.
  res.setHeader('X-Storage', cfg ? 'redis' : ON_VERCEL ? 'local' : 'disk');

  try {
    if (req.method === 'GET') {
      if (cfg) {
        const saved = await redisGet(cfg);
        return sendJSON(res, 200, saved || DEFAULT_STATE);
      }
      if (!ON_VERCEL) return sendJSON(res, 200, diskRead() || DEFAULT_STATE);
      // Live with no database yet: tell the browser to use its own storage.
      return sendJSON(res, 501, { error: 'no-server-storage', storage: 'local' });
    }

    if (req.method === 'POST') {
      const state = await readBody(req);
      if (!state || typeof state !== 'object') return sendJSON(res, 400, { ok: false });
      if (cfg) { await redisSet(cfg, state); return sendJSON(res, 200, { ok: true, storage: 'redis' }); }
      if (!ON_VERCEL) { diskWrite(state); return sendJSON(res, 200, { ok: true, storage: 'disk' }); }
      return sendJSON(res, 501, { ok: false, error: 'no-server-storage', storage: 'local' });
    }

    return sendJSON(res, 405, { error: 'method not allowed' });
  } catch (e) {
    return sendJSON(res, 500, { ok: false, error: String(e && e.message || e) });
  }
};

/* Let the app tell the parent where progress is actually being kept. */
module.exports.storageMode = () => (redisConfig() ? 'redis' : ON_VERCEL ? 'local' : 'disk');
