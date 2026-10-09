import { readFile, access } from 'node:fs/promises';
export const publicFiles = ['learning-ui.js','learning-ui.css','learning-account.js','index.html', 'styles.css', 'app.js', 'public-projects.css', 'public-projects.js', 'journeys.css', 'journeys.js', 'delivery.js', 'delivery.css', 'starter-kit.zip', 'agents-sample.js', 'agents-sample-data.js', 'agents-sample-zip.js', 'agents-sample.css', 'agents-sample-setup.js', 'datano-agents-sample.zip', 'datano-agents-sample.zip.sha256', 'assets/logo.svg', '.nojekyll'];
for (const path of publicFiles) await access(path);
const html = await readFile('index.html', 'utf8');
const js = await readFile('agents-sample-setup.js','utf8') + await readFile('agents-sample.js','utf8') + await readFile('agents-sample-data.js','utf8') + await readFile('agents-sample-zip.js','utf8') + await readFile('delivery.js','utf8') + await readFile('public-projects.js', 'utf8') + await readFile('journeys.js', 'utf8');
if (!html.includes('https://academy.datano.com.br')) throw new Error('Missing private Academy destination');
if (/src\/content|downloads\/|src\/app|course\//.test(html + js)) throw new Error('Course files referenced by public showcase');
if (/(?:gh[pousr]_|github_pat_|APP_USR-)[A-Za-z0-9_-]{15,}/.test(html + js)) throw new Error('Credential-like value found in public output');
console.log('Public allowlist and private Academy link verified');

for(const name of ["agents-sample-data.js","agents-sample-zip.js"]){if((await readFile(name,"utf8"))!==(await readFile("plugins/datano-sample/skills/delivery-kit/references/"+name,"utf8")))throw Error("Public sample and plugin contracts differ");}
