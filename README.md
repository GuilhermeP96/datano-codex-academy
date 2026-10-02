# DatanO · Vitrine pública

Projetos públicos, MCPs públicos e apresentação das possibilidades do IRobot-Not, com identidade visual DatanO. A simulação usa volumes fictícios no navegador e não acessa bases reais.

A Academy para assinantes fica em https://academy.datano.com.br. Aulas, materiais pagos, backend, configurações e credenciais pertencem ao repositório privado datano-academy e não entram neste build.

Node.js 20+; npm ci, npm run check, npm test, npm run build. O build usa uma lista explícita de sete arquivos públicos. Playwright verifica desktop/celular, links, temas, teclado, simulação e acessibilidade WCAG A/AA.

URL: https://guilhermep96.github.io/datano-codex-academy/. GitHub Pages nativo, branch gh-pages, pasta /. Copiar somente os arquivos da lista de scripts/check.mjs para o checkout de publicação, revisar, fazer commit/push e solicitar o build nativo. O workflow valida o código; não publica aulas ou outros repositórios.

A página inicial https://guilhermep96.github.io/ está em outro repositório, GuilhermeP96.github.io. Os dois sites públicos apontam à Academy privada.

O histórico inicial de 16 aulas, que já foi publicado, permanece nos commits antigos. A mudança retira aulas da versão atual sem reescrever o histórico. Novos materiais privados nunca devem ser enviados a este repositório.
