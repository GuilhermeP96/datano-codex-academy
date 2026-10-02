import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { lessons } from '../src/content.js';

test('aula exige quiz e prática; conclusão e anotações persistem', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Começar minha jornada' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading', { name: lessons[0].title })).toBeVisible();
  const complete = dialog.getByRole('button', { name: 'Concluir aula' });
  await expect(complete).toBeDisabled();
  await dialog.getByRole('radio', { name: lessons[0].quiz.choices[1] }).check();
  await dialog.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(dialog.getByRole('status')).toContainText('Tente novamente');
  await expect(complete).toBeDisabled();
  await dialog.getByRole('radio', { name: lessons[0].quiz.choices[0] }).check();
  await dialog.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(complete).toBeDisabled();
  await dialog.getByRole('checkbox').check();
  await dialog.getByRole('textbox', { name: 'Suas anotações' }).fill('Verifiquei o entrypoint.');
  await expect(complete).toBeEnabled();
  await complete.click();
  await expect(page.locator('#progress-count')).toContainText('1 de 16');
  await page.reload();
  await expect(page.locator('#progress-count')).toContainText('1 de 16');
  await page.goto('/#trilhas');
  await page.getByRole('button', { name: /Conheça seu parceiro/ }).click();
  await expect(page.locator('#lesson-notes')).toHaveValue('Verifiquei o entrypoint.');
});

test('busca e categoria combinam; vazio é explicativo', async ({ page }) => {
  await page.goto('/#comandos');
  await page.getByRole('searchbox').fill('consultar permissoes');
  await expect(page.locator('#command-count')).toContainText('1 comandos');
  await expect(page.locator('.command-card')).toHaveCount(1);
  await page.getByRole('combobox', { name: 'Categoria' }).selectOption('Automação');
  await expect(page.getByRole('heading', { name: 'Nenhum comando encontrado' })).toBeVisible();
  await page.getByRole('searchbox').fill('');
  await expect(page.locator('.command-card')).toHaveCount(2);
});

test('laboratório simula sem executar e escapa entrada do aluno', async ({ page }) => {
  await page.goto('/#laboratorio');
  await page.locator('[data-lab="/plan"]').click();
  await expect(page.getByRole('log')).toContainText('Plano de estudo');
  await page.getByRole('textbox', { name: 'Comando do laboratório' }).fill('<img src=x onerror=alert(1)>');
  await page.getByRole('button', { name: 'Enviar' }).click();
  await expect(page.getByRole('log')).toContainText('<img src=x onerror=alert(1)>');
  await expect(page.getByRole('log').locator('img')).toHaveCount(0);
  await expect(page.getByRole('log')).toContainText('Nenhuma ação foi executada');
});

test('estúdio atualiza o prompt e tema persiste', async ({ page }) => {
  await page.goto('/#prompts');
  await page.getByRole('combobox', { name: 'Tipo de tarefa' }).selectOption('depurar');
  await page.getByRole('textbox', { name: 'O que você quer alcançar?' }).fill('Corrigir a ordenação');
  await expect(page.locator('#prompt-output')).toContainText('Corrigir a ordenação');
  await expect(page.locator('#prompt-output')).toContainText('Critérios de aceitação');
  await page.getByRole('button', { name: 'Alternar tema' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('exportação e importação validam o progresso', async ({ page }) => {
  await page.goto('/#recursos');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar progresso' }).click();
  expect((await downloadPromise).suggestedFilename()).toBe('datano-academy-progresso.json');
  await page.locator('#import-progress').setInputFiles({ name: 'progresso.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ version: 1, completed: ['entenda', 'inexistente', 'entenda'], quizzes: { entenda: true }, notes: { entenda: '<script>teste</script>' } })) });
  await expect(page.locator('#progress-count')).toContainText('1 de 16');
  await page.goto('/#trilhas');
  await page.getByRole('button', { name: /Conheça seu parceiro/ }).click();
  await expect(page.locator('#lesson-notes')).toHaveValue('<script>teste</script>');
  await page.getByRole('button', { name: 'Fechar aula' }).click();
  await page.goto('/#recursos');
  await page.locator('#import-progress').setInputFiles({ name: 'invalid.json', mimeType: 'application/json', buffer: Buffer.from('{}') });
  await expect(page.getByRole('status')).toContainText('Arquivo inválido');
});

test('todas as páginas carregam sem erro, sem overflow e passam axe nos dois temas', async ({ page }) => {
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  for (const route of ['inicio', 'trilhas', 'comandos', 'laboratorio', 'vscode', 'prompts', 'recursos']) {
    await page.goto('/#' + route);
    await expect(page.locator('main h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    for (const theme of ['dark', 'light']) {
      await page.evaluate(t => { document.documentElement.dataset.theme = t; }, theme);
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(result.violations, `${route}/${theme}: ${JSON.stringify(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })))}`).toEqual([]);
    }
  }
  expect(errors).toEqual([]);
});

test('aulas têm navegação por teclado e modal acessível', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Começar minha jornada' }).click();
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.keyboard.press('/');
  await expect(page.getByRole('searchbox')).toBeFocused();
});

test('downloads e integração possuem destinos reais', async ({ page, request }) => {
  await page.goto('/#vscode');
  await expect(page.getByRole('link', { name: 'Abrir extensão no VS Code' })).toHaveAttribute('href', 'vscode:extension/OpenAI.chatgpt');
  const links = await page.locator('a[download]').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')));
  for (const link of links) expect((await request.get('/' + link)).ok()).toBe(true);
});

test('progresso inválido e storage bloqueado não quebram a página', async ({ page }) => {
  await page.addInitScript(() => { localStorage.setItem('datano-academy-v1', 'corrompido'); });
  await page.goto('/');
  await expect(page.locator('#progress-count')).toContainText('0 de 16');
  await page.evaluate(() => { Storage.prototype.setItem = () => { throw new Error('bloqueado'); }; });
  await page.getByRole('button', { name: 'Alternar tema' }).click();
  await expect(page.getByRole('status')).toContainText('Armazenamento indisponível');
});

test('menu móvel abre e fecha ao navegar', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile');
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir navegação' }).click();
  await expect(page.getByRole('button', { name: 'Abrir navegação' })).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('navigation').getByRole('link', { name: 'Laboratório' }).click();
  await expect(page.locator('main h1')).toHaveText('Seu laboratório de comandos');
  await expect(page.getByRole('button', { name: 'Abrir navegação' })).toHaveAttribute('aria-expanded', 'false');
});
