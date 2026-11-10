// Fails if an HTML page links to a local file that doesn't exist.
// Usage: node scripts/check-local-refs.mjs index.html other.html
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const pages = process.argv.slice(2);
const external = /^(https?:|mailto:|tel:|data:|javascript:|#|\/\/)/i;
let missing = 0;

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const [, ref] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    if (external.test(ref) || ref.includes('${')) continue;
    const path = decodeURIComponent(ref.split(/[?#]/)[0]);
    if (!path) continue;
    const target = join(dirname(page), path);
    if (!existsSync(target)) {
      console.error(`${page}: missing ${ref}`);
      missing += 1;
    }
  }
}

if (missing) process.exit(1);
console.log(`Checked ${pages.length} page(s): every local link and asset exists.`);
