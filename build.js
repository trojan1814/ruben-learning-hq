/*
 * Deploy build step (Vercel runs this; you never need to).
 *
 * Vercel serves public/ as the site root, so anything that has to be reachable
 * on the live site has to live under it. This copies books/ and lesson-plans/
 * in, and writes the manifest that /api/books serves when the filesystem is
 * read-only.
 *
 * Locally, server.js reads the real folders directly — so run this or don't,
 * it changes nothing about how the app works on your machine.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PUBLIC = path.join(ROOT, 'public');
const BOOK_EXTS = new Set(['.pdf', '.epub', '.doc', '.docx', '.png', '.jpg', '.jpeg', '.webp']);

function copyDir(from, to) {
  if (!fs.existsSync(from)) return 0;
  fs.mkdirSync(to, { recursive: true });
  let n = 0;
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) n += copyDir(src, dst);
    else { fs.copyFileSync(src, dst); n++; }
  }
  return n;
}

function buildManifest(booksDir) {
  const out = {};
  if (!fs.existsSync(booksDir)) return out;
  for (const d of fs.readdirSync(booksDir, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    const dir = path.join(booksDir, d.name);
    out[d.name] = fs.readdirSync(dir, { withFileTypes: true })
      .filter((f) => f.isFile() && !f.name.startsWith('.') && BOOK_EXTS.has(path.extname(f.name).toLowerCase()))
      .map((f) => {
        const st = fs.statSync(path.join(dir, f.name));
        return {
          name: f.name,
          ext: path.extname(f.name).toLowerCase().replace('.', ''),
          sizeMB: +(st.size / (1024 * 1024)).toFixed(2),
          modified: st.mtime.toISOString(),
          url: '/books/' + encodeURIComponent(d.name) + '/' + encodeURIComponent(f.name),
        };
      });
  }
  return out;
}

const books = copyDir(path.join(ROOT, 'books'), path.join(PUBLIC, 'books'));
const plans = copyDir(path.join(ROOT, 'lesson-plans'), path.join(PUBLIC, 'lesson-plans'));

const manifest = buildManifest(path.join(ROOT, 'books'));
fs.writeFileSync(path.join(PUBLIC, 'books-manifest.json'), JSON.stringify(manifest, null, 2));

const total = Object.values(manifest).reduce((n, f) => n + f.length, 0);
console.log(`build: copied ${books} book file(s), ${plans} lesson plan(s); manifest lists ${total} book(s)`);
