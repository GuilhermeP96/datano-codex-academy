import { mkdir, cp, writeFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const path of ['index.html', 'src', 'assets', 'downloads']) await cp(path, `dist/${path}`, { recursive: true });
await writeFile('dist/.nojekyll', '');
console.log('Portal estático pronto em dist/');
