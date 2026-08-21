/*
 * Helpers shared by the API handlers.
 *
 * The handlers are written against plain Node req/res only, so the SAME code
 * runs as a Vercel serverless function and inside the local server.js.
 * (Vercel's res is a Node ServerResponse with extras bolted on, so anything
 * written with writeHead/end works in both places.)
 */

function sendJSON(res, code, body) {
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(body));
}

/** Vercel pre-parses JSON bodies; the local server does not. Handle both. */
function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body !== undefined && req.body !== null) {
      if (typeof req.body === 'string') {
        try { return resolve(JSON.parse(req.body)); } catch (e) { return reject(e); }
      }
      return resolve(req.body);
    }
    let raw = '';
    req.on('data', (c) => {
      raw += c;
      if (raw.length > 4e6) { req.destroy(); reject(new Error('body too large')); }
    });
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

/** True when running on Vercel (read-only filesystem, no long-lived process). */
const ON_VERCEL = !!process.env.VERCEL;

module.exports = { sendJSON, readBody, ON_VERCEL };
