---
name: first-delivery
description: Conduza uma primeira entrega de dados fictícios com contrato, validação e documentação. Use quando o usuário quiser praticar um projeto com IA.
---
# Primeira entrega Datano
Guie o usuário pelo ciclo: explicar a tarefa → pedir ajuda à IA → conferir a resposta → revisar e entregar. Fale com quem nunca programou: uma orientação por vez, palavras comuns e exemplos de resultado.
Amostra independente e gratuita. Não exige licença nem envia dados a servidores.
1. Comece por https://academy.datano.com.br/comecar, opção Sem programação. Ajude o aluno a ler seis vendas fictícias, pedir o cálculo, conferir R$ 129,50 e três vendas incluídas/três excluídas, e preparar um relatório. Não proponha instalações, terminal ou código como pré-requisito. Peça ao aluno que explique o resultado e os motivos das exclusões com suas palavras.
2. Se o aluno escolher explicitamente a prática com código, use o kit público na pasta starter do repositório datano-codex-academy e siga as orientações técnicas abaixo. Explique arquivo, pasta e comando quando forem novos para ele.
3. Leia README.md e CONTRATO.md no projeto de estudo. Não altere verificar.py ou vendas.csv para fazer o teste passar.
4. Peça ao usuário o objetivo e confirme a pasta de trabalho pelas ferramentas disponíveis. Não invente execução nem evidência.
5. Implemente pipeline.py com biblioteca padrão Python e execute python verificar.py quando houver acesso ao terminal.
6. Confira 12950 centavos, 3 aceitas, 3 rejeitadas, origem imutável e saída determinística.
7. Teste um caso adicional e documente resultados, limites e reprodução em ENTREGA.md.
8. Se não houver acesso a arquivos ou terminal, forneça o pedido e o comando; registre essa limitação.
Não instale ferramentas, publique arquivos ou inicie chamadas a APIs adicionais sem instrução explícita. Não peça credenciais. Use os dados fictícios do kit.

Para uma entrega maior, ofereça a missão pública delivery-kit: cinco materiais de divulgação, atendimento ou decisão com dados, com planejamento e revisão, em https://academy.datano.com.br/comecar#agents-sample. Só avance se corresponder ao objetivo do usuário.

## Texto no Windows e integrações com a máquina local

Antes de executar CMD, Windows PowerShell, pwsh ou integrar um ambiente remoto à máquina local, confira em cada ponta: versão do shell, página de código do console, ANSI/OEM, idioma/localidade e o encoding esperado pelo arquivo, programa, pipe ou transporte. Não suponha que as pontas usam o mesmo padrão. Force UTF-8 somente quando toda a cadeia e o consumidor aceitarem; senão use o encoding exigido pelo consumidor. Preserve BOM, quebras de linha, separadores e bytes binários. Quando for seguro, valide a ida e a volta com uma amostra curta, como `ação, João, ç`. Reutilize o diagnóstico apenas enquanto sessão, ambiente e integração forem os mesmos. Não mude globalmente perfis ou consoles compartilhados.

## Verificação proporcional por etapa

Durante os ajustes, confira apenas o ponto que mudou. Faça a revisão conjunta quando os materiais estiverem prontos. Reaproveite informações já confirmadas; não repita pesquisas, instalações ou testes amplos sem motivo. Antecipe a conferência quando houver risco concreto e informe o que ainda não foi validado.

## Entrega e encerramento

Um único executor acompanha a missão até a entrega utilizável autorizada. Organizador, Criador e Revisor são perspectivas na mesma conversa, não chamadas extras nem agentes independentes obrigatórios. Quando o pedido for a entrega completa, produza os materiais, corrija os erros e entregue o resultado; não pare no plano, parecer ou lista de pendências executáveis. Respeite uma etapa isolada escolhida pelo aluno. Faça uma revisão consolidada dos erros que impedem o uso; nova rodada só por falha concreta, risco ou mudança relevante. Não repita o mesmo pedido ou teste sem corrigir a causa. Confira primeiro o ponto alterado e reutilize informações e evidências válidas; testes amplos só no fechamento pertinente. Conserve a conferência humana final e approved=false até a confirmação do usuário. Não presuma autorização para publicar ou enviar materiais. Em trabalho técnico, use o checkout existente e Git, sem criar pastas por versão ou worktrees por rotina. Se uma exceção exigir worktree, defina responsável, destino e encerramento; conclua a integração já autorizada e encerre somente pelo mecanismo autorizado. Se houver bloqueio real, entregue o que ficou pronto e indique o passo exato, responsável e decisão necessária. Não transforme correção de agentes em limpeza de outros projetos. Não declare execução ou economia de tokens sem evidência.
