import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {buildPlan,starterDrafts} from '../agents-sample-data.js';
import AxeBuilder from '@axe-core/playwright';
import {createHash} from 'node:crypto';
test('Setup prompts follow the chosen mission and client, preserve input and provide a manual copy fallback',async({page,request})=>{
 test.setTimeout(90000);await page.goto('/');await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.setupCopied=text;}}}));const s=page.locator('#agents-sample');
 await s.locator('[data-agents-mission="atendimento"]').click();await s.getByLabel('Nome do negócio ou da atividade').fill('Meu objetivo ainda está sendo escrito');
 await s.getByText('Conectar meus agentes, skills ou MCP · opcional',{exact:true}).click();await s.getByLabel('Minha ferramenta',{exact:true}).selectOption('codex');await s.getByRole('button',{name:'Copiar pedido para baixar e preparar'}).click();let copied=await page.evaluate(()=>window.setupCopied);
 expect(copied).toContain('https://academy.datano.com.br/datano-agents-sample.zip');expect(copied).toContain('datano-agents-sample.zip.sha256');expect(copied).toContain('.agents/skills/delivery-kit');expect(copied).toContain('id: atendimento');expect(copied).toContain('approved=false');
 await s.getByLabel('Minha ferramenta',{exact:true}).selectOption('mcp');await s.getByRole('button',{name:'Copiar pedido para baixar e preparar'}).click();copied=await page.evaluate(()=>window.setupCopied);expect(copied).toContain('datano_sample_plan');expect(copied).toContain('datano_sample_review');expect(copied).toContain('Python 3');
 await s.getByText('Já uso skills ou MCP: como conectar?',{exact:true}).click();await s.getByRole('button',{name:'Copiar comando do catálogo',exact:true}).click();expect(await page.evaluate(()=>window.setupCopied)).toBe('/plugin marketplace add GuilhermeP96/datano-codex-academy');
 await s.getByRole('button',{name:'Copiar exemplo de configuração MCP',exact:true}).click();const config=JSON.parse(await page.evaluate(()=>window.setupCopied));expect(config.mcpServers['datano-sample'].command).toBe('python3');expect(config.mcpServers['datano-sample'].args[0]).toContain('delivery-mcp.py');
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(Error('Clipboard blocked'))}}));await s.getByLabel('Minha ferramenta',{exact:true}).selectOption('claude');await s.locator('#agents-setup-copy').click();await expect(s.locator('#agents-setup-feedback')).toContainText('O texto está selecionado');await expect(s.locator('#agents-setup-full')).toHaveAttribute('open','');await expect(s.getByLabel('Pedido para baixar e preparar a amostra')).toHaveValue(/claude plugin install datano-sample@datano --scope local/);
 await expect(s.getByLabel('Nome do negócio ou da atividade')).toHaveValue('Meu objetivo ainda está sendo escrito');
 const packEvent=page.waitForEvent('download');await s.getByRole('link',{name:'Baixar amostra Datano-Agents'}).click();const pack=await packEvent;const bytes=await readFile(await pack.path());const digest=createHash('sha256').update(bytes).digest('hex');const checksum=await request.get('/datano-agents-sample.zip.sha256');expect(checksum.ok()).toBe(true);expect(await checksum.text()).toContain(digest);
 const check=spawnSync('python3',['-c',"import sys,zipfile,json\nwith zipfile.ZipFile(sys.argv[1]) as z:\n assert z.testzip() is None and len(z.namelist())==13\n assert 'codex mcp add datano-sample' in z.read('AGENTS-SETUP.md').decode()\n assert json.loads(z.read('.claude-plugin/plugin.json'))['version']=='1.1.2'",await pack.path()],{encoding:'utf8'});expect(check.status,check.stderr).toBe(0);
 for(const theme of ['dark','light']){await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);expect((await new AxeBuilder({page}).include('#agents-setup').withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('Datano-Agents sample produces an interoperable practical kit and requires renewed review after edits',async({page})=>{
 test.setTimeout(90000);const posts=[];let downloads=0;page.on('request',r=>{if(r.method()==='POST')posts.push(r.url())});page.on('download',()=>downloads++);
 await page.goto('/');const s=page.locator('#agents-sample');await s.getByRole('button',{name:'Começar com um exemplo fictício'}).click();await s.getByRole('button',{name:'Salvar objetivo e seguir'}).click();
 const briefEvent=page.waitForEvent('download');await s.getByRole('button',{name:'Baixar objetivo para meus agentes'}).click();const brief=JSON.parse(await readFile(await(await briefEvent).path(),'utf8'));expect(brief.mission).toBe('divulgacao');expect(brief.context.name).toBe('Ateliê Aurora');
 await s.getByRole('button',{name:'Preparar plano inicial'}).click();await s.getByRole('button',{name:'Conferi o plano'}).click();await s.getByRole('button',{name:'Preencher rascunhos editáveis'}).click();
 const custom='Apresentação revista pelo aluno: serviço de consertos de roupas para pessoas do bairro. Avaliamos cada peça antes de combinar condições. Não prometemos preço ou prazo antes da avaliação.';
 await s.getByLabel('Conteúdo: Apresentação da sua oferta').fill(custom);await s.getByRole('button',{name:'Preencher rascunhos editáveis'}).click();await expect(s.getByLabel('Conteúdo: Apresentação da sua oferta')).toHaveValue(custom);
 await s.locator('#artifact-next').click();await s.getByLabel('Conteúdo: Página de apresentação').fill(custom+' <script>window.parent.sampleAttack=true</script>');
 while(await s.locator('#artifact-next').count())await s.locator('#artifact-next').click();await s.getByRole('button',{name:'Materiais registrados'}).click();await s.getByLabel('Parecer e ajustes da revisão').fill('Revisei os cinco materiais: conferi o nome, o público e as condições. Retirei qualquer promessa de preço ou prazo. A divulgação será decidida por mim após ler os arquivos.');
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
 await page.goto('/');const s=page.locator('#agents-sample');await s.getByText('Conectar meus agentes, skills ou MCP · opcional',{exact:true}).click();await s.getByText('Minha ferramenta gerou um arquivo de resultado',{exact:true}).click();await s.getByLabel('Abrir resultado dos meus agentes').setInputFiles({name:'resultado-datano-agents.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(result))});
 await expect(s.locator('#agents-step-title')).toHaveText('Confira e ajuste');for(const c of await s.locator('[data-agents-approval]').all())await expect(c).not.toBeChecked();
 await page.reload();await expect(s.getByLabel('Parecer e ajustes da revisão')).toHaveValue(result.review);await s.getByRole('button',{name:'Revisão concluída'}).click();await expect(s.locator('#agents-feedback')).toContainText('confirme a revisão');
 for(const c of await s.locator('[data-agents-approval]').all())await c.check();await s.getByRole('button',{name:'Revisão concluída'}).click();await expect(s).toContainText('01-roteiro.txt');
});
