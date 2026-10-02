# DatanO · Codex Academy

[Acessar o portal](https://GuilhermeP96.github.io/datano-codex-academy/) · [Abrir no github.dev](https://github.dev/GuilhermeP96/datano-codex-academy) · [Extensão oficial Codex](https://marketplace.visualstudio.com/items?itemName=OpenAI.chatgpt)

Portal educacional em português para aprender Codex no terminal e no VS Code, com a identidade DatanO. Inclui 4 trilhas, 16 aulas autorais com exercícios e quizzes, 32 comandos pesquisáveis, laboratório didático, estúdio de prompts e kit para VS Code.

O progresso e as anotações ficam no navegador, com exportação/importação JSON. Não há login de aluno, backend ou API de IA. O laboratório usa respostas predefinidas; os exercícios reais são feitos pelo aluno no seu editor. Conclusão é autodeclarada e não representa certificação.

## Executar localmente

Node.js 20 ou superior, npm e Git.

```sh
git clone https://github.com/GuilhermeP96/datano-codex-academy.git
cd datano-codex-academy
npm ci
npm run dev
```

Abra http://127.0.0.1:4173. Para usar o workspace baixado, coloque o arquivo `.code-workspace` na raiz do clone. A pasta `.vscode` recomenda a extensão oficial, sem instalar ou alterar configurações pessoais automaticamente.

## Validar

```sh
npm run check
npx playwright install chromium
npm test
npm run build
```

Os testes cobrem quizzes, conclusão, persistência, busca/filtros, laboratório, prompts, tema, importação/exportação, downloads, teclado, menu móvel e auditoria axe nos temas claro/escuro. O build gera `dist/` somente com artefatos públicos. Para conferir a saída: no PowerShell, defina `$env:SERVE_DIR='dist'` e execute `npm run dev`.

## Estrutura

- `src/content.js`: currículo, comandos, templates e fontes.
- `src/app.js`: navegação e interações; entradas do aluno são escapadas.
- `src/styles.css`: tokens de marca, temas e layouts responsivos.
- `downloads/`: workspace, instruções, configuração de exemplo e checklist.
- `tests/`: validação funcional e acessibilidade em desktop e celular.
- `docs/SOURCES.md`: fontes e revisão editorial.
- `docs/DECISIONS.md`: decisões de arquitetura e marca.

## Publicar

O modo ativo de publicação usa a branch **gh-pages**, raiz `/`, com o build estático validado localmente. Em 02/10/2026, o workflow personalizado não iniciou por bloqueio de cobrança da conta; o build nativo de Pages baseado em branch funcionou. Nenhuma configuração de faturamento foi alterada.

Para atualizar no modo atual, execute os checks, testes e build, copie o conteúdo de `dist/` (incluindo `.nojekyll`) para um checkout separado da branch `gh-pages`, revise e publique nessa branch. A branch `main` contém o código-fonte e o histórico editorial; ela não publica automaticamente enquanto Pages estiver neste modo.

O workflow de GitHub Actions está pronto para uso quando a conta permitir execução. Para ativá-lo, selecione **GitHub Actions** como fonte nas configurações Pages. Ele valida conteúdo, executa testes e publica após push na `main`; PRs executam validação sem deploy.

Para reverter no modo atual, reverta o commit pertinente da branch `gh-pages`. No modo Actions, reverta na `main` para reconstruir. Confira o build e a URL após cada deploy. Não é necessário domínio próprio ou segredo de API.

## Atualizar o conteúdo

Confira primeiro a documentação oficial, depois `codex --help` na versão alvo. Atualize fontes e data editorial; não copie longos trechos de documentação. Comandos com `/` na biblioteca são identificados como CLI; confirme o menu disponível na extensão antes de usá-los no editor. Disponibilidade, modelos e limites podem variar conforme cliente e conta.

## Identidade e autoria

Logo branco e paleta DatanO derivados dos ativos canônicos de `GuilhermeP96/gp96combr`, mediante solicitação do proprietário. Tipografia: Manrope, DM Sans e IBM Plex Mono via Google Fonts, com fallback de sistema. O símbolo de editor no hero é uma ilustração didática; não é código executável.

Este material é independente, sem vínculo oficial com OpenAI ou Microsoft. Os nomes de produtos pertencem aos respectivos titulares. Não foi atribuída licença adicional aos ativos de marca; reutilização da marca exige autorização do titular.
