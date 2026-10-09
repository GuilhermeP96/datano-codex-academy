# Publicação da vitrine Datano no GitHub Pages

Estado confirmado em **09/10/2026, 21:17 UTC**. Vitrine: [guilhermep96.github.io/datano-codex-academy](https://guilhermep96.github.io/datano-codex-academy/).

| Item | Evidência |
| --- | --- |
| Fonte | `main` em `24cdd081a21b7978c82f502901e59539b906734d`, referência remota igual |
| CI na VPS | `20261009T211539836515Z`, academy-sample passed, 20 cenários desktop/mobile em 2,4 min |
| Publicação | `gh-pages` em `e4490faca863c8c2728b90b6be3fd5249b5c8acc`, referência remota igual |
| Estado anterior | `c277494ed9a49c4e1336badb24947ff3c380ca22`, preservado no histórico |
| Build | 22 arquivos da allowlist de `scripts/check.mjs`; nenhum curso pago ou fonte privada |
| Amostra | Plugin 1.1.2, 13 arquivos no ZIP |
| SHA-256 da amostra | `f7189d7118b87fe1e65741e411245026828b0a138d4b3c66de4cba85ef3f5bbf` |

A fonte foi extraída do commit validado em diretório temporário, construída com `node scripts/build.mjs` e copiada para worktree isolado baseado no `origin/gh-pages`. Nenhum CNAME existia; o procedimento preservaria esse arquivo caso presente. A atualização foi um push normal, sem reescrever histórico. Não foram ativados GitHub Actions, runners hospedados ou agendamentos.

Verificação externa por HTTP após o push: index, agents-sample.js, learning-account.js e learning-ui.js devolveram 200 e bytes idênticos ao estado publicado. O HTML contém a marca visível Datano; o ZIP e seu arquivo de checksum devolveram 200 e o SHA-256 da tabela. Hash do index: `c1d7b93780438ebce81f3a29f62870b78f5830d5051bc3b087544e41bcb4d3f4`. Esta checagem é de conteúdo servido; não houve uma nova sessão visual após a publicação, pois os navegadores da VPS estavam reservados à validação serial da Academy.

O main contém a fonte e a documentação; somente a branch gh-pages publica esta vitrine. O commit deste registro acrescenta documentação sem alterar os 22 arquivos publicados. As tentativas anteriores interrompidas por OOM não foram usadas como gate: a suite completa foi repetida com um worker e concluída antes da publicação.

## Reproduzir e recuperar

Na VPS, usar checkout limpo do commit de fonte e executar a validação versionada `bash scripts/ci/validate.sh`, serializada com outros navegadores/builds. Ela verifica a allowlist, as duas jornadas, os cenários desktop/mobile, o build e o módulo MCP da amostra. Copiar somente `dist/` para um worktree de gh-pages, preservando CNAME, e confirmar a referência remota após o push. Credenciais não fazem parte do build.

Para retornar ao estado anterior por um novo commit, sem force-push:

```bash
git fetch origin gh-pages
git worktree add -b rollback/pages-20261009 /tmp/datano-pages-rollback origin/gh-pages
git -C /tmp/datano-pages-rollback revert e4490faca863c8c2728b90b6be3fd5249b5c8acc
git -C /tmp/datano-pages-rollback push origin HEAD:gh-pages
git ls-remote origin refs/heads/gh-pages
```

Após qualquer recuperação, aguardar a atualização do Pages e repetir a comparação HTTP dos arquivos publicados. Não foi executado rollback nesta entrega.
