---
name: delivery-kit
description: >-
  Produza uma entrega prática completa com a amostra Datano-Agents: divulgação de negócio, atendimento ou decisão com dados. Use quando o usuário quiser materiais prontos para revisar e usar, inclusive sem saber programar.
---
# Entrega prática Datano-Agents

Use as três missões públicas da Academy em https://academy.datano.com.br/comecar#agents-sample. Explique em linguagem comum os papéis Organizador, Criador e Revisor. Eles são perspectivas sequenciais na IA do usuário, não prova de execução de agentes independentes.

1. Identifique a missão (`divulgacao`, `atendimento` ou `decisao`) e o contexto: nome, objetivo, público, informações confirmadas e contato opcional. Se o usuário trouxer brief-datano-agents.json ou um pacote da Academy, leia esses campos e conserve o trabalho existente.
2. Consulte `datano_sample_plan` pelo MCP quando disponível, ou [contratos locais](references/agents-sample-data.js) no plugin. As missões e contratos são os mesmos da página pública. Não depender do MCP quando ele estiver indisponível: a referência local contém os contratos e regras.
3. Como Organizador, produza um plano com os cinco materiais da missão e critérios de conclusão. Pergunte somente pelos dados ausentes que impedem a entrega. Marque os pontos ainda não confirmados.
4. Como Criador, produza os cinco materiais completos e contextualizados, não uma lista de instruções para o usuário escrever depois. Use texto comum, inclusive no campo `pagina`; o gerador da Academy monta o HTML. Para `calendario`, use sete linhas `Dia | Tema | Mensagem | Canal | Ação`.
5. Como Revisor, critique precisão, completude, clareza, utilidade e respeito às informações fornecidas. Corrija o conteúdo e registre o parecer e seus limites. A conferência de preenchimento do MCP não substitui esta revisão. Na missão decisao, use a base fictícia e confira R$129,50, três vendas incluídas/três excluídas.
6. Entregue os materiais legíveis e um resultado-datano-agents.json com `mission`, `context`, `plan`, `artifacts` (chaves da missão) e `review`. `approved` permanece false até o usuário confirmar a revisão. Ele pode abrir esse arquivo na amostra da Academy, revisar e baixar o pacote; explique onde clicar.
7. Se houver arquivos e Node disponíveis, e o usuário quiser concluir a entrega local, após a confirmação dele use o [helper local](scripts/assemble-delivery.mjs) com os argumentos `resultado-datano-agents.json PASTA_DA_ENTREGA`. O helper valida os campos, exige approved=true e não sobrescreve arquivos. Se essas ferramentas não estiverem disponíveis, entregue textos e JSON para importação na Academy.

Não invente preços, prazos, resultados, depoimentos ou políticas. Não publicar, enviar mensagens nem chamar APIs de modelos adicionais por conta própria. A amostra roda na ferramenta que o usuário já escolheu; não solicitar credenciais. Use um negócio fictício quando o usuário só quiser experimentar.

## Verificação proporcional por etapa

Durante os ajustes, confira apenas o ponto que mudou. Faça a revisão conjunta quando os materiais estiverem prontos. Reaproveite informações já confirmadas; não repita pesquisas, instalações ou testes amplos sem motivo. Antecipe a conferência quando houver risco concreto e informe o que ainda não foi validado.

## Entrega e encerramento

Um único executor acompanha a missão até a entrega utilizável autorizada. Organizador, Criador e Revisor são perspectivas na mesma conversa, não chamadas extras nem agentes independentes obrigatórios. Quando o pedido for a entrega completa, produza os materiais, corrija os erros e entregue o resultado; não pare no plano, parecer ou lista de pendências executáveis. Respeite uma etapa isolada escolhida pelo aluno. Faça uma revisão consolidada dos erros que impedem o uso; nova rodada só por falha concreta, risco ou mudança relevante. Não repita o mesmo pedido ou teste sem corrigir a causa. Confira primeiro o ponto alterado e reutilize informações e evidências válidas; testes amplos só no fechamento pertinente. Conserve a conferência humana final e approved=false até a confirmação do usuário. Não presuma autorização para publicar ou enviar materiais. Em trabalho técnico, use o checkout existente e Git, sem criar pastas por versão ou worktrees por rotina. Se uma exceção exigir worktree, defina responsável, destino e encerramento; conclua a integração já autorizada e encerre somente pelo mecanismo autorizado. Se houver bloqueio real, entregue o que ficou pronto e indique o passo exato, responsável e decisão necessária. Não transforme correção de agentes em limpeza de outros projetos. Não declare execução ou economia de tokens sem evidência.
