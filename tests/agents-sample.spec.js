import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {buildPlan,starterDrafts} from '../agents-sample-data.js';
test('DatanO-Agents sample produces an interoperable practical kit and requires renewed review after edits',async({page})=>{
 test.setTimeout(90000);const posts=[];let downloads=0;page.on('request',r=>{if(r.method()==='POST')posts.push(r.url())});page.on('download',()=>downloads++);
 await page.goto('/');const s=page.locator('#agents-sample');await s.getByRole('button',{name:'Começar com um exemplo fictício'}).click();await s.getByRole('button',{name:'Salvar objetivo e seguir'}).click();
 const briefEvent=page.waitForEvent('download');await s.getByRole('button',{name:'Baixar objetivo para meus agentes'}).click();const brief=JSON.parse(await readFile(await(await briefEvent).path(),'utf8'));expect(brief.mission).toBe('divulgacao');expect(brief.context.name).toBe('Ateliê Aurora');
 await s.getByRole('button',{name:'Preparar plano inicial'}).click();await s.getByRole('button',{name:'Conferi o plano'}).click();await s.getByRole('button',{name:'Preencher rascunhos editáveis'}).click();
 const custom='Apresentação revista pelo aluno: serviço de consertos de roupas para pessoas do bairro. Avaliamos cada peça antes de combinar condições. Não prometemos preço ou prazo antes da avaliação.';
 await s.getByLabel('Conteúdo: Apresentação da sua oferta').fill(custom);await s.getByRole('button',{name:'Preencher rascunhos editáveis'}).click();await expect(s.getByLabel('Conteúdo: Apresentação da sua oferta')).toHaveValue(custom);
 await s.getByLabel('Conteúdo: Página de apresentação').fill(custom+' <script>window.parent.sampleAttack=true</script>');
 await s.getByRole('button',{name:'Materiais registrados'}).click();await s.getByLabel('Parecer e ajustes da revisão').fill('Revisei os cinco materiais: conferi o nome, o público e as condições. Retirei qualquer promessa de preço ou prazo. A divulgação será decidida por mim após ler os arquivos.');
 await s.getByRole('button',{name:'Revisão concluída'}).click();await expect(s.locator('#agents-feedback')).toContainText('confirme a revisão');
 for(const c of await s.locator('[data-agents-approval]').all())await c.check();await s.getByRole('button',{name:'Revisão concluída'}).click();
 await expect(s.frameLocator('#agents-preview').getByRole('heading',{name:'Ateliê Aurora'})).toBeVisible();expect(await page.evaluate(()=>window.sampleAttack)).toBeUndefined();
 const kitEvent=page.waitForEvent('download');await s.getByRole('button',{name:'Baixar minha entrega completa'}).click();const kit=await kitEvent;expect(kit.suggestedFilename()).toBe('minha-entrega-datano-agents-divulgacao.zip');
 const check=spawnSync('python3',['-c',`import json,sys,zipfile
with zipfile.ZipFile(sys.argv[1]) as z:
 assert z.testzip() is None
 assert len(z.namelist()) == 9
 result=json.loads(z.read('resultado-datano-agents.json'))
 assert result['mission']=='divulgacao' and result['approved'] is True
 assert 'Apresentação revista pelo aluno' in result['artifacts']['oferta']
 assert '&lt;script&gt;' in z.read('02-pagina.html').decode()
 assert len(z.read('03-calendario.csv').decode('utf-8-sig').splitlines())==8
 print('ZIP verified')`,await kit.path()],{encoding:'utf8'});expect(check.status,check.stderr).toBe(0);
 await s.locator('[data-agents-step="2"]').click();await s.getByLabel('Conteúdo: Apresentação da sua oferta').fill(custom+' Informação atualizada depois da revisão.');await s.locator('[data-agents-step="4"]').click();const before=downloads;await s.getByRole('button',{name:'Baixar minha entrega completa'}).click();await expect(s.locator('#agents-feedback')).toContainText('confirme a revisão');expect(downloads).toBe(before);
 expect(posts).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('A native agents result imports into Academy with human approval reset',async({page})=>{
 const context={name:'Atendimento Aurora',goal:'Organizar o atendimento com respostas claras e combinados registrados.',audience:'Pessoas do bairro.',details:'Consertos de roupas com avaliação de cada peça antes de combinar condições.',contact:'Canal habitual'};
 const result={mission:'atendimento',context,plan:buildPlan('atendimento',context),artifacts:starterDrafts('atendimento',context),review:'Revisei as informações e os cinco materiais. Preços, prazos e condições serão confirmados por uma pessoa antes do uso. O atendimento será feito pelo responsável.',approved:true};
 await page.goto('/');const s=page.locator('#agents-sample');await s.getByText('Minha ferramenta gerou um arquivo de resultado',{exact:true}).click();await s.getByLabel('Abrir resultado dos meus agentes').setInputFiles({name:'resultado-datano-agents.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(result))});
 await expect(s.locator('#agents-step-title')).toHaveText('Confira e ajuste');for(const c of await s.locator('[data-agents-approval]').all())await expect(c).not.toBeChecked();
 await page.reload();await expect(s.getByLabel('Parecer e ajustes da revisão')).toHaveValue(result.review);await s.getByRole('button',{name:'Revisão concluída'}).click();await expect(s.locator('#agents-feedback')).toContainText('confirme a revisão');
 for(const c of await s.locator('[data-agents-approval]').all())await c.check();await s.getByRole('button',{name:'Revisão concluída'}).click();await expect(s).toContainText('01-roteiro.txt');
});
