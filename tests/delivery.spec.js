import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
test('A beginner completes a delivery without code and exports their actual report',async({page})=>{
 test.setTimeout(120000); // Eight real stages, reload, validation and downloads on the shared VPS.
 const calls=[];page.on('request',r=>{if(r.method()==='POST')calls.push(r.url())});
 await page.goto('/');await page.getByLabel('Jornada gratuita',{exact:true}).selectOption('free-delivery');const s=page.locator('#free-delivery');
 await expect(s.getByLabel('Como quero praticar')).toHaveValue('guided');
 await expect(s.getByRole('link',{name:'Baixar kit de prática'})).toHaveCount(0);
 await expect(s.locator('[data-delivery-stage]')).toHaveCount(8);
 for(let stage=0;stage<8;stage++){
  await s.getByLabel('Minha anotação desta etapa').fill('Li a orientação, conversei com a IA e conferi o resultado com a lista fictícia.');
  if(stage===3){
   await s.getByLabel('Total em reais').fill('154,50');await s.getByLabel('Quantas vendas entraram').fill('4');await s.getByLabel('Quantas vendas ficaram').fill('2');
   await s.getByRole('button',{name:'Conferir os números'}).click();await expect(s.locator('#delivery-number-result')).toContainText('Há uma diferença');
   for(const c of await s.locator('#delivery-evidence input[type=checkbox]').all())await c.check();
   await s.getByRole('button',{name:'Salvar etapa e continuar'}).click();await expect(s.locator('#delivery-feedback')).toContainText('Confira os três números');
   await s.getByLabel('Total em reais').fill('129,50');await s.getByLabel('Quantas vendas entraram').fill('3');await s.getByLabel('Quantas vendas ficaram').fill('3');
   await s.getByRole('button',{name:'Conferir os números'}).click();await expect(s.locator('#delivery-number-result')).toContainText('Números conferidos');
  }
  if(stage===5){
   for(const c of await s.locator('#delivery-evidence input[type=checkbox]').all())await c.check();await s.getByRole('button',{name:'Salvar etapa e continuar'}).click();await expect(s.locator('#delivery-feedback')).toContainText('Prepare um relatório');
   await s.getByLabel('Meu relatório final').fill('Relatório da loja fictícia: total de R$ 129,50 em três vendas válidas. Excluí três vendas: número repetido, data impossível e quantidade negativa. Conferi os valores com a lista original.');
   await page.reload();await expect(s.getByLabel('Meu relatório final')).toContainText('R$ 129,50');
  }
  for(const c of await s.locator('#delivery-evidence input[type=checkbox]').all())await c.check();
  await s.getByRole('button',{name:'Salvar etapa e continuar'}).click();
 }
 await expect(s).toContainText('8 de 8 etapas concluídas');
 const reportEvent=page.waitForEvent('download');await s.getByRole('button',{name:'Baixar meu relatório'}).click();const report=await reportEvent;
 expect(report.suggestedFilename()).toBe('meu-relatorio-datano.txt');expect(await readFile(await report.path(),'utf8')).toContain('total de R$ 129,50 em três vendas válidas');
 const recordEvent=page.waitForEvent('download');await s.getByRole('button',{name:'Baixar meu registro'}).click();const record=await recordEvent;expect(record.suggestedFilename()).toBe('minha-jornada-datano.txt');expect(await readFile(await record.path(),'utf8')).toContain('Concluído pelo aluno');
 await expect(s.getByRole('link',{name:'Continuar na Academy'})).toHaveAttribute('href','https://academy.datano.com.br/#planos');
 expect(calls).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('The optional code practice retains earlier learner progress separately',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('datano-free-delivery-v1',JSON.stringify({stage:2,completed:[0,1],evidence:{1:'Erro inicial registrado na versão anterior.'}})));
 await page.goto('/');await page.getByLabel('Jornada gratuita',{exact:true}).selectOption('free-delivery');const s=page.locator('#free-delivery');await expect(s.locator('.delivery-stage h3')).toHaveText('Conheça sua missão');
 await s.getByLabel('Como quero praticar').selectOption('technical');await expect(s.locator('.delivery-stage h3')).toHaveText('Dados: calcule o esperado');
 await expect(s).toContainText('2 de 8 etapas concluídas');await expect(s.getByRole('link',{name:'Baixar kit de prática'})).toHaveAttribute('href','starter-kit.zip');
 await s.locator('[data-delivery-stage="1"]').click();await expect(s.getByLabel('Evidência da sua execução')).toHaveValue('Erro inicial registrado na versão anterior.');
 await s.getByLabel('Como quero praticar').selectOption('guided');await expect(s).toContainText('0 de 8 etapas concluídas');
});
