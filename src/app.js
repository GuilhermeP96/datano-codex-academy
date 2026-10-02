import { lessons, tracks, commands, sources, promptTemplates } from './content.js';

const $ = (s) => document.querySelector(s);
const escape = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const storageKey = 'datano-academy-v1';
let state = { completed: [], quizzes: {}, theme: 'dark', notes: {} };
try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved && typeof saved === 'object') {
    state.completed = Array.isArray(saved.completed) ? saved.completed.filter(id => lessons.some(l => l.id === id)) : [];
    state.completed = [...new Set(state.completed)];
    state.quizzes = saved.quizzes && typeof saved.quizzes === 'object' ? saved.quizzes : {};
    state.notes = saved.notes && typeof saved.notes === 'object' ? saved.notes : {};
    state.theme = saved.theme === 'light' ? 'light' : 'dark';
  }
} catch { /* Storage unavailable or corrupt: keep a working in-memory session. */ }
let toastTimer;
function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3200); }
function persist() { try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { toast('Armazenamento indisponível. O progresso dura nesta sessão.'); } updateProgress(); }
function updateProgress() {
  const percent = Math.round(state.completed.length / lessons.length * 100);
  $('#progress').value = percent; $('#progress-label').textContent = `Seu progresso · ${percent}%`;
  $('#progress-count').textContent = `${state.completed.length} de ${lessons.length} aulas concluídas`;
}
document.documentElement.dataset.theme = state.theme;
updateProgress();
const minutes = (list) => list.reduce((n, l) => n + l.minutes, 0);
const nextLesson = () => lessons.find(l => !state.completed.includes(l.id)) || lessons[0];
const header = (eyebrow, title, description) => `<div class="page-heading"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${description}</p></div>`;
const codeBlock = (text, label = 'EXEMPLO PRÁTICO') => `<div class="code-block"><div class="code-header"><span>${label}</span><button class="copy" data-copy="${escape(text)}">Copiar</button></div><pre><code>${escape(text)}</code></pre></div>`;
const reference = (key) => `<a href="${sources[key][1]}" target="_blank" rel="noopener">${sources[key][0]} ↗</a>`;
function trackCard(track) {
  const list = lessons.filter(l => l.track === track.id);
  const done = list.filter(l => state.completed.includes(l.id)).length;
  return `<a class="track-card ${track.color}" href="#trilhas/${track.id}"><div class="card-top"><span class="track-icon">${track.icon}</span><span class="badge">${track.level}</span></div><h3>${track.name}</h3><p>${track.description}</p><div class="card-meta"><span>${list.length} aulas · ${minutes(list)} min</span><span>↗</span></div><div class="mini-progress"><span style="width:${done / list.length * 100}%"></span></div><small>${done} de ${list.length} concluídas</small></a>`;
}
function home() {
  const next = nextLesson();
  return `<div class="welcome-line"><span>APRENDA. PRATIQUE. CONSTRUA.</span><span class="live-dot">Seu próximo passo está aqui</span></div>
    <section class="hero"><div class="hero-content"><span class="pill">〈〉 CODEX + VS CODE</span><h1>Seu próximo nível<br>começa com<br><em>um prompt.</em></h1><p>Da primeira conversa à automação.<br>Aprenda a construir com Codex, no seu ritmo<br>e direto no seu editor.</p><div class="hero-actions"><button class="button primary" data-lesson="${next.id}">${state.completed.length ? 'Continuar aprendendo' : 'Começar minha jornada'} <span>→</span></button><a class="button ghost" href="#laboratorio">Explorar laboratório ↗</a></div><div class="hero-caption"><span>✓ Conteúdo em português</span><span>✓ Aprendizado na prática</span></div></div>
    <div class="hero-visual" aria-label="Exemplo ilustrativo de uma tarefa no Codex"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="floating-tag">✦ Da ideia ao código</div><div class="editor-preview"><div class="editor-top"><span class="dots"><i></i><i></i><i></i></span><span>seu-projeto / Codex</span><span>〈〉</span></div><div class="editor-tabs"><span>app.js</span><span>Codex <b>✧</b></span></div><div class="preview-code"><span class="muted">01</span> <b>const</b> ideia = <em>"algo incrível"</em>;<br><span class="muted">02</span><br><span class="muted">03</span> <b>async function</b> construir() {<br><span class="muted">04</span> &nbsp; <b>return await</b> codex(ideia);<br><span class="muted">05</span> }</div><div class="preview-chat"><span class="tiny-label">VOCÊ</span><p>Crie uma interface acessível para<br>minha lista de tarefas.</p><div class="preview-response"><span>✧</span><div><strong>Vamos construir.</strong><small>Primeiro, vou entender seu projeto<br>e definir como validar a mudança.</small></div></div></div><div class="editor-bottom"><span>◉ workspace</span><span>Contexto + intenção + validação</span></div></div><div class="floating-status"><span>✓</span><div>Aprenda fazendo<small>Um passo de cada vez</small></div></div></div></section>
    <section class="stats" aria-label="Conteúdo da Academy"><div><strong>04</strong><span>Trilhas de aprendizado</span></div><div><strong>${lessons.length}</strong><span>Aulas com exercícios</span></div><div><strong>${commands.length}</strong><span>Comandos para consultar</span></div><div><strong>100%</strong><span>No seu ritmo</span></div></section>
    <section><div class="section-heading"><div><span class="eyebrow">SEU CAMINHO, DO INÍCIO AO AVANÇADO</span><h2>Escolha por onde começar</h2></div><a href="#trilhas">Ver todas as aulas →</a></div><div class="track-grid">${tracks.map(trackCard).join('')}</div></section>
    <section class="bottom-grid"><div class="continue-card"><div class="track-icon">↳</div><div><span class="eyebrow">${state.completed.length ? 'PRÓXIMO PASSO' : 'COMECE POR AQUI'}</span><h3>${next.title}</h3><p>${next.summary}</p></div><button class="button ghost" data-lesson="${next.id}">Abrir aula →</button></div><a class="lab-callout" href="#laboratorio"><span>❯_</span><div><h3>Menos teoria. Mais prática.</h3><p>Experimente comandos no laboratório didático.</p></div><span>↗</span></a></section>`;
}
function trails(trackId) {
  const selected = tracks.find(t => t.id === trackId);
  const list = selected ? lessons.filter(l => l.track === selected.id) : lessons;
  return header('UM PASSO DE CADA VEZ', selected?.name || 'Trilhas de aprendizado', 'Leia a aula, pratique no editor e responda ao quiz para registrar sua conclusão.') +
    `<div class="filter-tabs"><a class="${selected ? '' : 'active'}" href="#trilhas">Todas as aulas</a>${tracks.map(t => `<a class="${selected?.id === t.id ? 'active' : ''}" href="#trilhas/${t.id}">${t.name}</a>`).join('')}</div><div class="lesson-list">${list.map((l) => `<button class="lesson-row" data-lesson="${l.id}"><span class="lesson-number ${state.completed.includes(l.id) ? 'done' : ''}">${state.completed.includes(l.id) ? '✓' : String(lessons.indexOf(l) + 1).padStart(2, '0')}</span><span><small>${tracks.find(t => t.id === l.track).name}</small><strong>${l.title}</strong><span>${l.summary}</span></span><span class="lesson-time">${l.minutes} min <b>→</b></span></button>`).join('')}</div>`;
}
function commandPage() {
  return header('SEU GUIA DE BOLSO', 'Biblioteca de comandos', 'Encontre o comando, confira onde usar e copie para seu ambiente.') +
    `<div class="notice">Os comandos com barra abaixo são da CLI. No VS Code, abra o menu da extensão para conferir os disponíveis. Versões e superfícies podem oferecer opções diferentes.</div><div class="toolbar"><label class="search-field"><span>⌕</span><input id="command-search" type="search" placeholder="Buscar por comando ou finalidade…" aria-label="Buscar comandos"></label><label class="select-field">Categoria<select id="command-category"><option value="">Todas</option>${[...new Set(commands.map(c => c.category))].map(c => `<option>${c}</option>`).join('')}</select></label></div><p id="command-count" class="muted" aria-live="polite"></p><div id="command-results" class="command-grid"></div><p class="source-line">Referência: ${reference('cli')} · ${reference('docs')} · Revisão: 02/10/2026</p>`;
}
function filterCommands() {
  const query = ($('#command-search')?.value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const category = $('#command-category')?.value || '';
  const list = commands.filter(c => (!category || c.category === category) && `${c.command} ${c.title} ${c.description}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(query));
  $('#command-count').textContent = `${list.length} comandos encontrados`;
  $('#command-results').innerHTML = list.length ? list.map(c => `<article class="command-card"><div><span class="badge">${c.category}</span><span class="where">${c.where}</span></div><h2>${c.title}</h2><p>${c.description}</p>${codeBlock(c.command, 'COMANDO')}</article>`).join('') : '<div class="empty"><h2>Nenhum comando encontrado</h2><p>Tente outra palavra ou selecione todas as categorias.</p></div>';
}
const labResponses = {
  '/plan': 'Plano de estudo: 1. Ler o projeto. 2. Definir o aceite. 3. Fazer uma mudança pequena. 4. Executar a validação.\nNa sessão real, Codex propõe um plano para seu pedido.',
  '/diff': 'Exemplo de diff:\n- <input placeholder="Tarefa">\n+ <label for="task">Nova tarefa</label>\n+ <input id="task" placeholder="Tarefa">\nNo projeto real, confira todas as alterações antes de entregar.',
  '/status': 'Ambiente: laboratório didático\nExecução real: nenhuma\nDados: somente neste navegador\nPróximo passo: leve um exercício ao VS Code.',
  '/permissions': 'Leitura → inspecionar o projeto.\nWorkspace → editar dentro das regras do ambiente.\nPublicação → precisa estar no pedido.\nConfira o alcance no cliente real.',
  '/mcp': 'Exemplo de servidor: openaiDeveloperDocs\nFinalidade: consultar documentação oficial.\nConfigure no ambiente real com codex mcp add; este simulador não instala servidores.',
  'codex --version': 'Exemplo ilustrativo: codex-cli <versão instalada>\nExecute no terminal integrado para obter sua versão real.',
  'codex mcp list': 'Exemplo: openaiDeveloperDocs — documentação de leitura.\nAqui não há conexão a servidores.',
  'codex --help': 'Terminal real: codex [opções] [prompt]\nExperimente aqui: /plan, /diff, /status, /permissions, /mcp.',
};
function lab() {
  return header('APRENDIZADO NA PRÁTICA', 'Seu laboratório de comandos', 'Experimente o fluxo antes de levar a tarefa ao seu projeto.') +
    `<div class="lab-layout"><section class="terminal"><div class="terminal-top"><span class="dots"><i></i><i></i><i></i></span><span>datano / laboratório</span><span class="badge">SIMULAÇÃO</span></div><div id="terminal-output" class="terminal-output" role="log" aria-live="polite"><p class="terminal-welcome">Bem-vindo à bancada de estudo.</p><p>Digite /plan ou escolha um comando à direita.<br>As respostas são didáticas. Nenhum comando é executado.</p></div><form id="terminal-form"><span aria-hidden="true">❯</span><input id="terminal-input" aria-label="Comando do laboratório" placeholder="Digite um comando…" autocomplete="off" maxlength="500"><button class="button primary" type="submit">Enviar ↵</button></form></section><aside class="lab-guide"><span class="eyebrow">EXPERIMENTE</span><h2>Conheça o ciclo</h2><p>Planeje, confira o diff e entenda o contexto.</p>${Object.keys(labResponses).map(c => `<button class="lab-command" data-lab="${escape(c)}"><code>${c}</code><span>↵</span></button>`).join('')}<button class="button ghost" id="clear-terminal">Limpar laboratório</button><a href="#vscode">Ir para o ambiente real →</a></aside></div>`;
}
function runLab(command) {
  const output = $('#terminal-output');
  const entry = document.createElement('div'); entry.className = 'terminal-entry';
  const prompt = document.createElement('strong'); prompt.textContent = '❯ ' + command;
  const result = document.createElement('pre'); result.textContent = labResponses[command] || 'Este comando não está no simulador. Consulte a Biblioteca de comandos ou use /plan, /diff e /status. Nenhuma ação foi executada.';
  entry.append(prompt, result); output.append(entry); output.scrollTop = output.scrollHeight; $('#terminal-input').value = ''; $('#terminal-input').focus();
}
function vscode() {
  return header('SEU AMBIENTE DE CONSTRUÇÃO', 'Codex encontra o VS Code', 'Instale, abra um projeto e leve os exercícios para o editor desktop.') +
    `<div class="vscode-banner"><span class="vscode-mark">〈〉</span><div><h2>Contexto no editor. Intenção no prompt.</h2><p>Arquivos, seleções e diffs juntos no seu fluxo.</p><a class="button primary" href="vscode:extension/OpenAI.chatgpt">Abrir extensão no VS Code ↗</a><a class="button ghost" href="https://marketplace.visualstudio.com/items?itemName=OpenAI.chatgpt" target="_blank" rel="noopener">Ver extensão oficial ↗</a></div></div>
    <div class="step-grid"><article class="panel"><span class="step-number">01</span><h2>Prepare o editor</h2><p>Use VS Code desktop com Git. Para a CLI via npm, tenha Node.js/npm. Instale a extensão oficial OpenAI e siga o login.</p>${codeBlock('code --install-extension OpenAI.chatgpt')}</article><article class="panel"><span class="step-number">02</span><h2>Abra este projeto</h2><p>Clone o portal para estudar um exemplo real. Com o comando code disponível, abra a pasta no editor.</p>${codeBlock('git clone https://github.com/GuilhermeP96/datano-codex-academy.git\ncd datano-codex-academy\ncode .')}</article><article class="panel"><span class="step-number">03</span><h2>Execute e confira</h2><p>No terminal integrado, instale as dependências de desenvolvimento e abra o endereço mostrado pelo servidor.</p>${codeBlock('npm ci\nnpm run dev')}<p>Depois da mudança: npm run check e npm test. Para o primeiro teste, instale o Chromium com npx playwright install chromium.</p></article></div>
    <section class="panel"><h2>Seu kit de partida</h2><p>Baixe os modelos e adapte ao seu projeto. O workspace deve ficar na raiz do clone.</p><div class="download-grid"><a href="downloads/datano-academy.code-workspace" download>↓ Workspace VS Code</a><a href="downloads/AGENTS.md" download>↓ Modelo AGENTS.md</a><a href="downloads/config.toml" download>↓ Exemplo config.toml</a><a href="downloads/checklist.md" download>↓ Checklist de entrega</a></div></section>
    <section class="panel"><h2>Qual ambiente escolher?</h2><div class="table-wrap"><table><thead><tr><th>Ambiente</th><th>Uso</th><th>Execução</th></tr></thead><tbody><tr><td>VS Code desktop + Codex</td><td>Trabalhar com arquivos e terminal locais</td><td>Usa seu runtime e permissões</td></tr><tr><td>github.dev</td><td>Consultar e editar o código no navegador</td><td>Não fornece terminal/runtime para CLI</td></tr><tr><td>GitHub Codespaces</td><td>Ambiente de desenvolvimento remoto</td><td>Requer provisionamento; confira limites e custos da conta</td></tr><tr><td>Este portal</td><td>Aprender, montar prompts e simular comandos</td><td>Interações didáticas no navegador</td></tr></tbody></table></div><p class="source-line">${reference('ide')} · <a href="https://docs.github.com/en/codespaces/the-githubdev-web-based-editor" target="_blank" rel="noopener">Editor github.dev ↗</a></p></section>`;
}
function promptPage() {
  return header('CLAREZA ANTES DE CÓDIGO', 'Estúdio de prompts', 'Transforme uma ideia em um pedido com contexto, limites e critérios de aceitação.') +
    `<div class="prompt-layout"><form id="prompt-form" class="panel"><label>Tipo de tarefa<select id="prompt-template"><option value="implementar">Implementar uma melhoria</option><option value="depurar">Depurar um problema</option><option value="revisar">Revisar código</option><option value="documentar">Documentar projeto</option></select></label><label>O que você quer alcançar?<textarea id="prompt-objective" rows="2" maxlength="3000"></textarea></label><label>Qual é o contexto?<textarea id="prompt-context" rows="2" maxlength="3000"></textarea></label><label>Quais limites devem ser respeitados?<textarea id="prompt-constraints" rows="2" maxlength="3000"></textarea></label><label>Como verificar o resultado?<textarea id="prompt-validation" rows="2" maxlength="3000"></textarea></label></form><section class="panel prompt-preview"><span class="eyebrow">PRONTO PARA SEU EDITOR</span><h2>Seu pedido, bem definido</h2><pre id="prompt-output"></pre><button class="button primary" id="copy-prompt">Copiar prompt →</button><p class="muted">Cole na conversa do Codex e adapte o escopo. Estes campos ficam apenas nesta página; não envie credenciais.</p></section></div>`;
}
function fillPrompt() { const t = promptTemplates[$('#prompt-template').value]; for (const field of ['objective', 'context', 'constraints', 'validation']) $(`#prompt-${field}`).value = t[field]; updatePrompt(); }
function updatePrompt() {
  const titles = { objective: 'Objetivo', context: 'Contexto', constraints: 'Limites', validation: 'Critérios de aceitação e validação' };
  $('#prompt-output').textContent = Object.entries(titles).map(([id, title]) => `${title}:\n${$(`#prompt-${id}`).value.trim() || '[Defina este ponto]'}`).join('\n\n') + '\n\nAntes de editar, leia as instruções e confira o estado do projeto. Ao final, informe arquivos alterados, validação executada e limitações.';
}
function resources() {
  return header('CONHECIMENTO COM ORIGEM', 'Recursos e referências', 'Aulas autorais DatanO com links para aprofundar nas fontes oficiais.') +
    `<div class="notice">Revisão editorial: 02/10/2026. Comandos conferidos na documentação oficial e na CLI local 0.159.0-alpha.12.1. A versão instalada no seu ambiente é a referência para disponibilidade. Consulte codex --help e o menu /.</div><div class="resource-grid">${Object.entries(sources).map(([id, s]) => `<a class="resource-card" href="${s[1]}" target="_blank" rel="noopener"><span class="eyebrow">OPENAI · DOCUMENTAÇÃO</span><h2>${s[0]}</h2><span>Abrir referência ↗</span></a>`).join('')}</div>
    <section class="panel"><h2>Seu progresso pertence a você</h2><p>Aulas concluídas, quizzes, tema e anotações são guardados localmente neste navegador. Não há sincronização entre dispositivos. Exporte uma cópia para guardar seu histórico; o arquivo pode conter suas anotações.</p><div class="button-row"><button class="button primary" id="export-progress">Exportar progresso ↓</button><label class="button ghost" for="import-progress">Importar progresso ↑</label><input type="file" id="import-progress" accept="application/json,.json" class="visually-hidden"><button class="button ghost" id="reset-progress">Reiniciar progresso</button></div></section><section class="panel"><h2>Sobre a Academy</h2><p>Uma iniciativa independente DatanO para ensinar desenvolvimento com Codex. Sem vínculo oficial com a OpenAI. Os exercícios são exemplos de estudo; o laboratório oferece respostas predefinidas. A marca, o logo e a paleta vêm da identidade DatanO.</p><p><a href="https://github.com/GuilhermeP96/datano-codex-academy/issues" target="_blank" rel="noopener">Sugerir melhoria ou relatar conteúdo desatualizado ↗</a></p></section>`;
}
const pages = { inicio: home, trilhas: trails, comandos: commandPage, laboratorio: lab, vscode, prompts: promptPage, recursos: resources };
const pageLabels = { inicio: 'Visão geral', trilhas: 'Trilhas de aprendizado', comandos: 'Biblioteca de comandos', laboratorio: 'Laboratório', vscode: 'Codex + VS Code', prompts: 'Estúdio de prompts', recursos: 'Recursos e referências' };
function closeMenu() { $('#sidebar').classList.remove('open'); $('#menu-toggle').setAttribute('aria-expanded', 'false'); }
function render(focus = false) {
  if ($('#lesson-dialog').open) $('#lesson-dialog').close();
  const [raw, id] = location.hash.slice(1).split('/');
  const page = Object.hasOwn(pages, raw) ? raw : 'inicio';
  $('#main').innerHTML = pages[page](id);
  $('#page-label').textContent = pageLabels[page]; document.title = `${pageLabels[page]} · DatanO Codex Academy`;
  document.querySelectorAll('[data-nav]').forEach(el => { const active = el.dataset.nav === page; el.classList.toggle('active', active); if (active) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current'); });
  closeMenu(); window.scrollTo(0, 0);
  if (page === 'comandos') filterCommands(); if (page === 'prompts') fillPrompt();
  if (focus) $('#main').focus({ preventScroll: true });
}
function showLesson(id) {
  const l = lessons.find(l => l.id === id); if (!l) return;
  const passed = state.quizzes[id] === true;
  const complete = state.completed.includes(id);
  $('#lesson-content').innerHTML = `<div class="lesson-dialog-top"><span class="eyebrow">${tracks.find(t => t.id === l.track).name} · ${l.minutes} min</span><button class="icon-button" data-close aria-label="Fechar aula">×</button></div><h1 id="lesson-title">${l.title}</h1><p class="lesson-summary">${l.summary}</p>${l.sections.map(([title, body]) => `<section class="lesson-section"><h2>${title}</h2><p>${body}</p></section>`).join('')}${codeBlock(l.code)}<section class="exercise"><span class="eyebrow">AGORA É COM VOCÊ</span><h2>Pratique no seu editor</h2><p>${l.exercise}</p><label class="practice-check"><input type="checkbox" id="practice-done" ${complete ? 'checked' : ''}> Pratiquei o exercício e conferi o resultado</label></section><form id="quiz-form" data-id="${id}" class="quiz"><span class="eyebrow">CONFIRA O QUE APRENDEU</span><fieldset><legend>${l.quiz.question}</legend>${l.quiz.choices.map((choice, i) => `<label><input type="radio" name="answer" value="${i}" required> ${choice}</label>`).join('')}</fieldset><button class="button ghost" type="submit">Verificar resposta</button><p id="quiz-feedback" role="status">${passed ? '✓ Você já acertou este quiz. ' + l.quiz.explanation : ''}</p></form><label class="notes-label">Suas anotações <small>Salvas neste navegador</small><textarea id="lesson-notes" data-id="${id}" rows="3" maxlength="5000" placeholder="O que você descobriu no exercício?">${escape(state.notes[id] || '')}</textarea></label><div class="source-line">Aprofunde: ${l.refs.map(reference).join(' · ')}</div><div class="lesson-dialog-bottom"><button class="button ghost" data-close>Voltar</button><button class="button primary" id="complete-lesson" data-id="${id}" ${passed && complete ? '' : 'disabled'}>${complete ? 'Aula concluída ✓' : 'Concluir aula ✓'}</button></div><p class="completion-hint">Para concluir, acerte o quiz e confirme a prática. O progresso é autodeclarado e não constitui certificação.</p>`;
  $('#lesson-dialog').showModal();
}
async function copy(text) {
  try { await navigator.clipboard.writeText(text); toast('Copiado. Pronto para levar ao editor.'); }
  catch { toast('Não foi possível copiar automaticamente. Selecione e copie o texto.'); }
}
function download(name, text) { const url = URL.createObjectURL(new Blob([text], { type: 'application/json' })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
document.addEventListener('click', (event) => {
  const target = event.target.closest('button, a'); if (!target) return;
  if (target.dataset.lesson) showLesson(target.dataset.lesson);
  if (target.hasAttribute('data-close')) $('#lesson-dialog').close();
  if (target.dataset.copy !== undefined) copy(target.dataset.copy);
  if (target.dataset.lab) runLab(target.dataset.lab);
  if (target.id === 'theme-toggle') { state.theme = state.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = state.theme; persist(); }
  if (target.id === 'menu-toggle') { const open = $('#sidebar').classList.toggle('open'); target.setAttribute('aria-expanded', String(open)); }
  if (target.id === 'copy-prompt') copy($('#prompt-output').textContent);
  if (target.id === 'clear-terminal') { $('#terminal-output').textContent = 'Laboratório limpo. Digite /plan para começar.'; $('#terminal-input').focus(); }
  if (target.id === 'complete-lesson') { if (state.quizzes[target.dataset.id] !== true || !$('#practice-done').checked) return; state.completed = [...new Set([...state.completed, target.dataset.id])]; persist(); $('#lesson-dialog').close(); render(); toast('Aula concluída. Seu próximo passo está nas trilhas.'); }
  if (target.id === 'export-progress') download('datano-academy-progresso.json', JSON.stringify({ version: 1, ...state }, null, 2));
  if (target.id === 'reset-progress' && window.confirm('Reiniciar aulas, quizzes e anotações neste navegador?')) { state.completed = []; state.quizzes = {}; state.notes = {}; persist(); render(); toast('Progresso reiniciado.'); }
});
document.addEventListener('input', e => {
  if (e.target.id === 'command-search') filterCommands();
  if (e.target.id.startsWith('prompt-') && e.target.id !== 'prompt-template') updatePrompt();
  if (e.target.id === 'lesson-notes') { state.notes[e.target.dataset.id] = e.target.value; persist(); }
});
document.addEventListener('change', async e => {
  if (e.target.id === 'command-category') filterCommands();
  if (e.target.id === 'prompt-template') fillPrompt();
  if (e.target.id === 'practice-done') $('#complete-lesson').disabled = !(e.target.checked && state.quizzes[$('#complete-lesson').dataset.id] === true);
  if (e.target.id === 'import-progress') {
    const file = e.target.files[0]; if (!file) return;
    try {
      if (file.size > 1000000) throw new Error('Arquivo muito grande');
      const data = JSON.parse(await file.text());
      if (data.version !== 1 || !Array.isArray(data.completed) || !data.quizzes || !data.notes) throw new Error('Formato incompatível');
      const valid = lessons.map(l => l.id);
      const completed = [...new Set(data.completed.filter(id => valid.includes(id) && data.quizzes[id] === true))];
      const quizzes = Object.fromEntries(valid.filter(id => data.quizzes[id] === true).map(id => [id, true]));
      const notes = Object.fromEntries(valid.filter(id => typeof data.notes[id] === 'string').map(id => [id, data.notes[id].slice(0, 5000)]));
      state = { completed, quizzes, notes, theme: state.theme }; persist(); render(); toast('Progresso importado.');
    } catch { toast('Arquivo inválido. Use uma exportação da Academy de até 1 MB.'); e.target.value = ''; }
  }
});
document.addEventListener('submit', e => {
  if (e.target.id === 'terminal-form') { e.preventDefault(); const command = $('#terminal-input').value.trim(); if (command) runLab(command); }
  if (e.target.id === 'quiz-form') {
    e.preventDefault(); const l = lessons.find(l => l.id === e.target.dataset.id); const selected = new FormData(e.target).get('answer');
    const correct = selected !== null && Number(selected) === l.quiz.correct;
    if (correct) { state.quizzes[l.id] = true; persist(); }
    $('#quiz-feedback').textContent = (correct ? '✓ Correto. ' : 'Tente novamente. ') + (correct ? l.quiz.explanation : 'Releia o conceito e escolha outra resposta.');
    $('#complete-lesson').disabled = !(state.quizzes[l.id] === true && $('#practice-done').checked);
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
  if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !$('#lesson-dialog').open) { e.preventDefault(); if (location.hash !== '#comandos') { location.hash = 'comandos'; setTimeout(() => $('#command-search')?.focus(), 50); } else $('#command-search').focus(); }
});
window.addEventListener('hashchange', () => render(true));
render();
