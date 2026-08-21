/*
 * GET /api/books -> { 'English': [ {name, url, sizeMB, ...} ], ... }
 *
 * Locally this scans the books/ folder live, so dropping a PDF in and hitting
 * "Rescan Vault" works instantly. On Vercel the folder is read-only and baked
 * in at deploy time, so build.js writes a manifest and this just serves it.
 */

const fs = require('fs');
const path = require('path');
const { sendJSON } = require('./_shared');

const BOOKS = path.join(__dirname, '..', 'books');
const BOOK_EXTS = new Set(['.pdf', '.epub', '.doc', '.docx', '.png', '.jpg', '.jpeg', '.webp']);

/** Built by build.js at deploy time. Missing locally, which is fine. */
function manifest() {
  try { return require('../public/books-manifest.json'); } catch { return null; }
}

function scan() {
  const out = {};
  let subjects = [];
  try {
    subjects = fs.readdirSync(BOOKS, { withFileTypes: true })
      .filter((d) => d.isDirectory()).map((d) => d.name);
  } catch { return out; }

  for (const subject of subjects) {
    const dir = path.join(BOOKS, subject);
    let files = [];
    try {
      files = fs.readdirSync(dir, { withFileTypes: true })
        .filter((f) => f.isFile() && !f.name.startsWith('.') && BOOK_EXTS.has(path.extname(f.name).toLowerCase()))
        .map((f) => {
          const st = fs.statSync(path.join(dir, f.name));
          return {
            name: f.name,
            ext: path.extname(f.name).toLowerCase().replace('.', ''),
            sizeMB: +(st.size / (1024 * 1024)).toFixed(2),
            modified: st.mtime.toISOString(),
            url: '/books/' + encodeURIComponent(subject) + '/' + encodeURIComponent(f.name),
          };
        });
    } catch { /* unreadable */ }
    out[subject] = files;
  }
  return out;
}

module.exports = function handler(req, res) {
  const live = scan();
  const hasFiles = Object.values(live).some((f) => f.length);
  return sendJSON(res, 200, hasFiles ? live : (manifest() || live));
};

module.exports.scan = scan;
