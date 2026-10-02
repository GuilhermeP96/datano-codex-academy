import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const home = process.env.HOME_URL || 'http://127.0.0.1:4176';
test('página inicial reúne destinos e mantém tema acessível', async ({ page }) => {
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  expect((await page.goto(home)).ok()).toBe(true);
  await expect(page.getByRole('heading',{level:1})).toContainText('construção');
  const destinations=await page.locator('#destinos .destination').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
  expect(destinations).toEqual(['https://github.com/GuilhermeP96','https://gp96.com.br','https://datano.com.br','https://academy.datano.com.br']);
  await expect(page.getByRole('link',{name:'Explorar possibilidades'})).toHaveAttribute('href','#irobot');
  await expect(page.locator('#mcps a.destination')).toHaveCount(2);
  await expect(page.locator('#projetos a.destination')).toHaveCount(8);
  for (const path of ['src/content.js', 'src/app.js', 'downloads/AGENTS.md', 'course/index.html', '.env']) {
    expect((await page.request.get(`${home.replace(/\/$/, '')}/${path}`)).status(), path).toBe(404);
  }
  await page.locator('#demo-issue').check();
  await page.locator('#demo-start').click();
  await expect(page.locator('#demo-result')).toContainText('pausa para análise humana');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  for(const theme of ['dark','light']) {
    await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
    await page.waitForTimeout(250);
    const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),theme).toEqual([]);
  }
  await page.getByRole('button',{name:'Alternar tema'}).click();
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.keyboard.press('Tab'); await expect(page.getByRole('link',{name:'Pular para o conteúdo'})).toBeFocused();
  await page.evaluate(() => { document.activeElement.blur(); window.scrollTo(0,0); });
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:`test-results/home-${test.info().project.name}.png`,fullPage:true});
  expect(errors).toEqual([]);
});
