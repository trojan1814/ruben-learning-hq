/*
 * Ruben's Learning HQ - zero-dependency local server.
 *
 * Serves the dashboard and the books/ folder, and hands every /api/ request
 * to the handlers in api/ — the exact same files Vercel runs as serverless
 * functions when the site is deployed. One implementation, two runtimes.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const API = {
  '/api/state': require('./api/state'),
  '/api/books': require('./api/books'),
  '/api/news': require('./api/news'),
};

const ROOT = __dirname;
const PUBLIC = path.join(ROOT, 'public');
const BOOKS = path.join(ROOT, 'books');
const PLANS = path.join(ROOT, 'lesson-plans');
const DATA = path.join(ROOT, 'data');
const PORT = process.env.PORT || 4173;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.md': 'text/markdown; charset=utf-8',
  '.mp3': 'audio/mpeg',
};

function ensureDirs() {
  [DATA, PLANS, BOOKS].forEach((d) => fs.mkdirSync(d, { recursive: true }));
}

function listPlans() {
  try {
    return fs.readdirSync(PLANS)
      .filter((f) => f.toLowerCase().endsWith('.md'))
      .map((f) => ({ name: f, url: '/lesson-plans/' + encodeURIComponent(f) }));
  } catch {
    return [];
  }
}

function sendJSON(res, code, body) {
  const payload = JSON.stringify(body);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(payload);
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, buf) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(buf);
  });
}

// Resolve a URL path under a base dir, refusing anything that escapes it.
function safeJoin(base, urlPath) {
  const decoded = decodeURIComponent(urlPath).replace(/^\/+/, '');
  const full = path.normalize(path.join(base, decoded));
  if (!full.startsWith(base)) return null;
  return full;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname;

  // ---- API ----
  // These are the very same handler files Vercel runs as serverless
  // functions, so local and live never drift apart.
  if (API[pathname]) {
    Promise.resolve(API[pathname](req, res))
      .catch((e) => { try { sendJSON(res, 500, { error: String(e) }); } catch { /* already sent */ } });
    return;
  }
  if (pathname === '/api/plans') return sendJSON(res, 200, listPlans());

  // ---- Static: books & lesson plans ----
  if (pathname.startsWith('/books/')) {
    const f = safeJoin(BOOKS, pathname.slice('/books'.length));
    if (!f) return sendJSON(res, 403, { error: 'forbidden' });
    return serveFile(res, f);
  }
  if (pathname.startsWith('/lesson-plans/')) {
    const f = safeJoin(PLANS, pathname.slice('/lesson-plans'.length));
    if (!f) return sendJSON(res, 403, { error: 'forbidden' });
    return serveFile(res, f);
  }

  // ---- Static: app ----
  const rel = pathname === '/' ? '/index.html' : pathname;
  const f = safeJoin(PUBLIC, rel);
  if (!f) return sendJSON(res, 403, { error: 'forbidden' });
  fs.stat(f, (err, st) => {
    if (err || !st.isFile()) return serveFile(res, path.join(PUBLIC, 'index.html'));
    serveFile(res, f);
  });
});

ensureDirs();
server.listen(PORT, () => {
  console.log('');
  console.log('  ============================================');
  console.log('    RUBEN\'S LEARNING HQ is live');
  console.log('    ->  http://localhost:' + PORT);
  console.log('  ============================================');
  console.log('');
  console.log('  Drop your PDFs into:  books/<Subject>/');
  console.log('  Progress saves to:    data/state.json');
  console.log('  Stop the server:      Ctrl + C');
  console.log('');
});
