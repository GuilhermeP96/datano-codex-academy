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

O GitHub Pages usa GitHub Actions. Configure a fonte de publicação como **GitHub Actions** nas configurações Pages do repositório. O workflow valida o conteúdo, executa os testes e publica o build após push na branch `main`. PRs executam validação sem deploy.

Para reverter uma atualização, reverta o commit pertinente e publique na `main`; a versão anterior do código será reconstruída. Confira o workflow e a URL após cada deploy. Não é necessário domínio próprio ou segredo de API.

## Atualizar o conteúdo

Confira primeiro a documentação oficial, depois `codex --help` na versão alvo. Atualize fontes e data editorial; não copie longos trechos de documentação. Comandos com `/` na biblioteca são identificados como CLI; confirme o menu disponível na extensão antes de usá-los no editor. Disponibilidade, modelos e limites podem variar conforme cliente e conta.

## Identidade e autoria

Logo branco e paleta DatanO derivados dos ativos canônicos de `GuilhermeP96/gp96combr`, mediante solicitação do proprietário. Tipografia: Manrope, DM Sans e IBM Plex Mono via Google Fonts, com fallback de sistema. O símbolo de editor no hero é uma ilustração didática; não é código executável.

Este material é independente, sem vínculo oficial com OpenAI ou Microsoft. Os nomes de produtos pertencem aos respectivos titulares. Não foi atribuída licença adicional aos ativos de marca; reutilização da marca exige autorização do titular.
