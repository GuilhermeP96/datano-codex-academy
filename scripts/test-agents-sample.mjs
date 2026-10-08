import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {missions,buildPlan,starterDrafts} from '../agents-sample-data.js';
import {makeZip,calendarCSV,pageHTML} from '../agents-sample-zip.js';
const temp=await mkdtemp(join(tmpdir(),'datano-sample-'));
try{
 for(const mission of missions){const context={name:'Negócio fictício',goal:'Criar materiais claros para a prática de uma entrega completa.',audience:'Pessoas do bairro.',details:'Serviço fictício com escopo e condições confirmados pelo responsável.',contact:'Canal habitual'};const result={mission:mission.id,context,plan:buildPlan(mission.id,context),artifacts:starterDrafts(mission.id,context),review:'Os cinco materiais foram lidos e conferidos pelo responsável da prática. Não foram publicados nem enviados; não há promessa de resultado comercial.',approved:false};const input=join(temp,mission.id+'.json');await writeFile(input,JSON.stringify(result));let proc=spawnSync('node',['plugins/datano-sample/skills/delivery-kit/scripts/assemble-delivery.mjs',input,join(temp,mission.id)],{encoding:'utf8'});assert.notEqual(proc.status,0,'Unapproved work must not be assembled');result.approved=true;await writeFile(input,JSON.stringify(result));proc=spawnSync('node',['plugins/datano-sample/skills/delivery-kit/scripts/assemble-delivery.mjs',input,join(temp,mission.id)],{encoding:'utf8'});assert.equal(proc.status,0,proc.stderr);assert.match(await readFile(join(temp,mission.id,'plano.txt'),'utf8'),/PLANO/);proc=spawnSync('node',['plugins/datano-sample/skills/delivery-kit/scripts/assemble-delivery.mjs',input,join(temp,mission.id)],{encoding:'utf8'});assert.notEqual(proc.status,0,'Existing delivery directory must be preserved');}
 const html=pageHTML('<script>title</script>','Texto <img src=x onerror=alert(1)>');assert(!html.includes('<script>'));assert(html.includes('&lt;img'));
 const csv=calendarCSV('Dia 1 | Tema | =HYPERLINK("x") | Canal | Ação');assert(csv.includes("'=HYPERLINK"));
 const zip=makeZip({'texto.txt':'Conteúdo com ç e acentuação.','pagina.html':html});const path=join(temp,'browser.zip');await writeFile(path,Buffer.from(await zip.arrayBuffer()));const checked=spawnSync('python3',['-c','import sys,zipfile\nwith zipfile.ZipFile(sys.argv[1]) as z:\n assert z.testzip() is None\n assert z.read("texto.txt").decode()=="Conteúdo com ç e acentuação."',path],{encoding:'utf8'});assert.equal(checked.status,0,checked.stderr);
 console.log('Native delivery for all three missions, preservation, approval, ZIP CRC/UTF-8 and inert exports verified.');
}finally{await rm(temp,{recursive:true,force:true});}
