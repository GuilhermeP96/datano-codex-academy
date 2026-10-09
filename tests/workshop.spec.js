import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Simulations teach failure and correction without running commands or contacting providers',async({page})=>{
 test.setTimeout(90000);await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 await page.waitForFunction(()=>Boolean(customElements.get('datano-simulation')));
 const calls=[];page.on('request',r=>{if(['xhr','fetch'].includes(r.resourceType()))calls.push({url:r.url(),method:r.method()});});
 const scenarios=[['brief','Pedido incompleto','Pedido com objetivo e limites'],['review','Texto com promessa sem confirmação','Texto revisado'],['terminal','Verificador com falha','Verificador corrigido'],['mcp','Conexão indisponível','Consulta válida']];
 for(const [scenario,bad,good] of scenarios){
  await page.evaluate(s=>{document.querySelector('#qa-simulation')?.remove();const el=document.createElement('datano-simulation');el.id='qa-simulation';el.setAttribute('scenario',s);document.querySelector('main').append(el);},scenario);
  const sim=page.locator('#qa-simulation');await expect(sim).toContainText(/simulação/i);
  await sim.getByRole('radio',{name:bad,exact:true}).check();await sim.getByRole('button',{name:/Executar simulação/}).click();
  await expect(sim.locator('[data-sim-output]')).toContainText('Falha');await sim.getByRole('button',{name:'Ver como corrigir',exact:true}).click();
  await sim.getByRole('radio',{name:good,exact:true}).check();await sim.getByRole('button',{name:'Tentar novamente',exact:true}).click();
  await expect(sim.locator('[data-sim-output]')).toContainText('Concluído');
  // Keyboard users can reach and activate the next simulated run.
  await sim.locator('[data-sim-run]').focus();await page.keyboard.press('Enter');await expect(sim.locator('[data-sim-output]')).toContainText('Concluído');
  for(const theme of ['dark','light']){await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);expect((await new AxeBuilder({page}).include('#qa-simulation').withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 // axe fetches the page's existing font stylesheet while checking contrast.
 expect(calls.filter(r=>r.method!=='GET'||(!r.url.startsWith('http://127.0.0.1:4173')&&!r.url.startsWith('https://fonts.googleapis.com/css2?')))).toEqual([]);
});

test('A failed real sample check preserves writing and a corrected stage survives reload',async({page})=>{
 await page.goto('/');const s=page.locator('#free-delivery');const note='Conferi o objetivo desta etapa e preservei minha explicação mesmo quando a conferência falhou.';
 await s.getByLabel('Minha anotação desta etapa').fill(note);await s.getByRole('button',{name:/Salvar etapa e continuar/}).click();
 await expect(s.locator('#delivery-feedback')).not.toBeEmpty();await expect(s.getByLabel('Minha anotação desta etapa')).toHaveValue(note);
 await expect(s.locator('.delivery-stage h3')).toHaveText('Conheça sua missão');
 for(const box of await s.locator('#delivery-evidence input[type=checkbox]').all())await box.check();
 await s.getByRole('button',{name:/Salvar etapa e continuar/}).click();await expect(s.locator('.delivery-stage h3')).toHaveText('Conheça as vendas');
 await page.reload();await expect(s.locator('.delivery-stage h3')).toHaveText('Conheça as vendas');
 await s.locator('[data-delivery-stage="0"]').click();await expect(s.getByLabel('Minha anotação desta etapa')).toHaveValue(note);
 await expect(s).toContainText('1 de 8 etapas concluídas');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
