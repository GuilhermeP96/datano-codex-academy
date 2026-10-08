# DatanO — amostra completa de entrega com IA

Jornada atual: https://academy.datano.com.br/comecar, gratuita e sem cadastro. Oito etapas levam de contrato e baseline a código validado, revisão e entrega reproduzível. Baixe starter-kit.zip, abra no seu editor, use sua IA e confira com Python. As introduções anteriores de Codex e Claude seguem disponíveis na vitrine.

O repositório contém apenas material público autoral, kit, skill de amostra e adaptador MCP. Conteúdo pago e fontes privadas ficam fora dele. Veja [distribuição](docs/DISTRIBUTION.md) para Claude Code/Codex e estado das submissões. Serviço premium exige direito vigente; a amostra não requer licença.

CI e build executam na VPS com scripts/ci/validate.sh. A publicação histórica gh-pages não foi tratada como pipeline local. O domínio Academy serve a amostra atual pela VPS.

# DatanO · Vitrine pública

Projetos públicos, MCPs públicos e apresentação das possibilidades do IRobot-Not, com identidade visual DatanO. A simulação usa volumes fictícios no navegador e não acessa bases reais.

Jornadas gratuitas: três aulas de Codex e três de Claude Code, com primeiros comandos, prompts, MCP de documentação, exercícios e progresso local. Conteúdo autoral em journeys.js, separado do currículo privado. Links para continuar a trilha paga ao final de cada jornada. Fontes oficiais: https://learn.chatgpt.com/docs/codex/cli, https://learn.chatgpt.com/docs/developer-commands, https://developers.openai.com/learn/docs-mcp, https://code.claude.com/docs/en/quickstart e https://code.claude.com/docs/en/mcp. Revisão: 2026-10-02.

A Academy para assinantes fica em https://academy.datano.com.br. Aulas, materiais pagos, backend, configurações e credenciais pertencem ao repositório privado datano-academy e não entram neste build.

Node.js 20+; npm ci, npm run check, npm test, npm run build. O build usa uma lista explícita de nove arquivos públicos. Playwright verifica desktop/celular, links, temas, teclado, simulação e acessibilidade WCAG A/AA.

URL: https://guilhermep96.github.io/datano-codex-academy/. GitHub Pages nativo, branch gh-pages, pasta /. Copiar somente os arquivos da lista de scripts/check.mjs para o checkout de publicação, revisar, fazer commit/push e solicitar o build nativo. O workflow valida o código; a publicação inclui somente a vitrine e as introduções gratuitas autorizadas, sem materiais pagos ou outros repositórios.

A página inicial https://guilhermep96.github.io/ está em outro repositório, GuilhermeP96.github.io. Os dois sites públicos apontam à Academy privada.

O histórico inicial de 16 aulas, que já foi publicado, permanece nos commits antigos. A mudança retira o currículo antigo da versão atual sem reescrever o histórico. Novos materiais privados nunca devem ser enviados a este repositório.
