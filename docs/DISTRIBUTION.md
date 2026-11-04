# Amostra e distribuição
A jornada gratuita conectada à amostra Datano-Agents está em https://academy.datano.com.br/comecar#agents-sample, com três missões de cinco materiais. Veja o [guia passo a passo e pedido para baixar com seu agente](AGENTS-SETUP.md). A atividade de fundamentos também começa sem programação: o aluno conversa com sua IA, confere uma lista de vendas fictícias e baixa um relatório em texto. A prática com código e o kit são opcionais. Este repositório contém somente amostra pública autoral, kit de prática, skill e adaptador. A Academy privada oferece os projetos avançados por assinatura.

Claude Code: `/plugin marketplace add GuilhermeP96/datano-codex-academy`, depois `/plugin install datano-sample@datano`. As skills delivery-kit e first-delivery funcionam sem licença; as ferramentas gratuitas datano_sample_plan e datano_sample_review apoiam as missões. O adaptador usa Python 3 (Windows pode usar python). O guia MCP gratuito não requer credencial. O serviço premium exige uma concessão agents específica já vigente e token no ambiente protegido DATANO_LICENSE_TOKEN. Nunca cole a credencial no chat ou em config versionada.

Uma skill instalada não fornece DRM nem revogação do texto. O servidor premium confere o direito em cada chamada. Licenças originais dos componentes são preservadas. Não há chamadas a modelos no servidor de consulta.

server.json é candidato para MCP Registry; não comprova listagem. Autenticação do publicador e submissão não foram feitas. Instalação nativa Claude CLI e diretórios oficiais dependem de validação específica. O diretório OpenAI também exige OAuth para o serviço premium e proíbe upsell digital dentro do plugin; o endpoint Bearer atual atende integração CLI manual, sem alegar essa compatibilidade OAuth.

CI/build/testes: `bash scripts/ci/validate.sh` na VPS. Workflow hospedado preservado em docs/ci-archive, desativado. A branch gh-pages é publicação histórica; não ativar pipeline hospedado para atualizá-la. A amostra atual é servida pela VPS no domínio Academy.

## Amostra 1.1.4 — encoding de ponta a ponta e entrega

As duas skills, os pedidos da página e o contrato compartilhado com o MCP passam a exigir um executor até o resultado autorizado, revisão consolidada de bloqueantes e reaproveitamento de evidências. Os papéis não exigem agentes ou chamadas adicionais. Plano não substitui entrega completa solicitada. A aprovação humana final, limites de publicação e preservação de arquivos permanecem. O kit técnico gratuito também orienta checkout existente, integração autorizada e encerramento responsável de worktrees.

A política de texto agora cobre CMD, Windows PowerShell, pwsh e integrações entre ambiente remoto e máquina local. Ela exige diagnóstico das duas pontas e do transporte/pipe, escolha de encoding pelo consumidor, preservação de BOM/quebras de linha/separadores/binários e uma amostra acentuada segura. UTF-8 deixa de ser uma suposição global.

Validação desta mudança: três missões pelo helper, prompts de todas as missões/papéis/clientes com o mesmo contrato, seis cenários de navegador desktop/celular, allowlist pública e build estático. O ZIP conserva 13 arquivos públicos e MIT; a versão 1.1.4 identifica a atualização. Não há medição de tokens faturados nem promessa de comportamento de todos os modelos.
