import {test,expect} from '@playwright/test';
const home=process.env.HOME_URL||'http://127.0.0.1:4198';
test('Jornadas gratuitas, progresso independente e continuação paga',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(navigator,'clipboard',{value:{async writeText(t){window.copiedExample=t;}}}));
 await page.goto(home);await page.getByRole('link',{name:'Começar gratuitamente'}).click();
 const section=page.locator('#jornadas');await expect(section.locator('details')).toHaveCount(3);
 await section.getByRole('button',{name:'Copiar exemplo da aula 1'}).click();await expect(section.locator('#journey-feedback')).toContainText('Exemplo copiado');
 expect(await page.evaluate(()=>window.copiedExample)).toContain('codex login');
 for(let i=0;i<3;i++){const lesson=section.locator('details').nth(i);if(i>0)await lesson.locator('summary').click();await lesson.getByRole('checkbox').check();}
 await expect(section.locator('#journey-progress-label')).toContainText('3 de 3');await expect(section.getByRole('link',{name:'Continuar com Codex na Academy'})).toHaveAttribute('href','https://academy.datano.com.br/#planos');
 await section.getByRole('button',{name:'Começar com Claude'}).click();await expect(section.locator('#journey-progress-label')).toContainText('Claude · 0 de 3');await expect(section.locator('details').first()).toContainText('claude --version');
 await section.locator('details').first().getByRole('checkbox').check();await page.reload();await expect(section.locator('#journey-progress-label')).toContainText('Codex · 3 de 3');
 await section.getByRole('button',{name:'Começar com Claude'}).click();await expect(section.locator('#journey-progress-label')).toContainText('Claude · 1 de 3');await expect(section.getByRole('link',{name:'Continuar com Claude na Academy'})).toHaveAttribute('href','https://academy.datano.com.br/#planos');
 await page.screenshot({path:'test-results/journeys-'+test.info().project.name+'.png'});
});
