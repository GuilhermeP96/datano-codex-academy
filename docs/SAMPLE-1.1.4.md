# Amostra gratuita Datano-Agents 1.1.4 — 04/11/2026

A política de encoding passou a fazer parte das duas skills gratuitas, dos pedidos gerados na Academy, do guia de instalação, do starter e do contrato compartilhado com o MCP.

## Regra incluída

- Diagnosticar CMD, Windows PowerShell ou pwsh antes do primeiro comando textual pertinente.
- Conferir separadamente o ambiente remoto e a máquina local: shell/versão, página de código, ANSI/OEM, localidade e contrato do arquivo/programa.
- Incluir pipes, transporte da integração e processos filhos no diagnóstico.
- Usar UTF-8 somente quando toda a cadeia e o consumidor aceitarem; respeitar encodings legados quando exigidos.
- Preservar BOM, quebras de linha, separadores e bytes binários.
- Validar, quando seguro, uma pequena ida e volta com `ação, João, ç`.
- Reutilizar o diagnóstico só enquanto sessão, ambiente e integração não mudarem; não alterar perfil ou console compartilhado globalmente.

## Validação esperada

Os testes verificam que a política aparece nos planos, em todos os papéis, nos quatro clientes de instalação e no fluxo de navegador. O build recria por allowlist o ZIP público de 13 arquivos e sua conferência SHA-256. Publicação e leitura nos canais Academy e GitHub Pages são verificações separadas.
