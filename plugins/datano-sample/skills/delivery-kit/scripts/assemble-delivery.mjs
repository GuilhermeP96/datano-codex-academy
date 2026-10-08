#!/usr/bin/env node
import {readFile,mkdir,open} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {getMission,cleanContext,inspectDelivery} from '../references/agents-sample-data.js';
import {pageHTML,calendarCSV} from '../references/agents-sample-zip.js';
const [input,out]=process.argv.slice(2);if(!input||!out)throw Error('Use: node assemble-delivery.mjs resultado.json PASTA_NOVA');
const raw=await readFile(resolve(input),'utf8');if(Buffer.byteLength(raw)>150000)throw Error('Resultado excede limite');const work=JSON.parse(raw),mission=getMission(work.mission);const result=inspectDelivery(work.mission,work.context,work);if(!mission||!result.ready)throw Error(result.missing.join(' '));
const target=resolve(out);await mkdir(target,{recursive:false,mode:0o700});
const files={'00-como-usar.txt':`Entrega ${mission.title}. Confira os materiais antes de usar. A página HTML abre no navegador; CSV abre em planilha. Nada é publicado ou enviado por este programa.\n`,'plano.txt':work.plan,'revisao.txt':work.review,'resultado-datano-agents.json':JSON.stringify({...work,context:cleanContext(work.context)},null,2)};
for(const a of mission.artifacts)files[a.filename]=a.id==='pagina'?pageHTML(cleanContext(work.context).name,work.artifacts[a.id]):a.id==='calendario'?calendarCSV(work.artifacts[a.id]):work.artifacts[a.id];
for(const [name,text] of Object.entries(files)){const handle=await open(join(target,name),'wx',0o600);try{await handle.writeFile(text,'utf8');}finally{await handle.close();}}
console.log('Entrega criada: '+Object.keys(files).length+' arquivos. Nenhuma publicação ou envio.');
