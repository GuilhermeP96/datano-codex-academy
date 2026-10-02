import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { lessons, tracks, commands, sources } from '../src/content.js';
assert.equal(new Set(lessons.map(l => l.id)).size, lessons.length);
assert.equal(new Set(commands.map(c => c.command)).size, commands.length);
for (const l of lessons) {
  assert(tracks.some(t => t.id === l.track));
  assert(l.sections.length >= 3 && l.code && l.exercise && l.minutes > 0);
  assert(l.quiz.correct >= 0 && l.quiz.correct < l.quiz.choices.length);
  assert(l.refs.every(r => sources[r]));
}
for (const t of tracks) assert.equal(lessons.filter(l => l.track === t.id).length, 4);
const html = await readFile('index.html', 'utf8');
for (const path of ['src/app.js', 'src/styles.css', 'assets/logo.svg', 'downloads/AGENTS.md', 'downloads/config.toml', 'downloads/checklist.md', 'downloads/datano-academy.code-workspace']) await access(path);
assert(html.includes('lang="pt-BR"'));
JSON.parse(await readFile('downloads/datano-academy.code-workspace', 'utf8'));
console.log(`${lessons.length} aulas, ${tracks.length} trilhas, ${commands.length} comandos e artefatos validados.`);
