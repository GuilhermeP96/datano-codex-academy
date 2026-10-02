import { mkdir, cp, readdir } from 'node:fs/promises';
import { publicFiles } from './check.mjs';
await mkdir('dist', { recursive: true });
// Explicit allowlist: never copy course files or source repositories.
const existing = await readdir('dist', { recursive: true });
const allowed = new Set([...publicFiles, 'assets']);
if (existing.some(path => !allowed.has(path.replaceAll('\\', '/')))) throw new Error('dist contains files outside the public allowlist; review before publishing.');
for (const path of publicFiles) {
  await mkdir(`dist/${path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : ''}`, { recursive: true });
  await cp(path, `dist/${path}`);
}
console.log(`${publicFiles.length} public files ready in dist/`);
