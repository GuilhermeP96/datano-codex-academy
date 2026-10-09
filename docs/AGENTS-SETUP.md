# Instalar e usar a amostra Datano-Agents

Você pode deixar seu agente baixar e preparar a amostra ou instalar com os passos abaixo. Um chat sem acesso a arquivos também pode fazer a missão pela Academy, copiando os pedidos e registrando os textos.

## Peça ao seu agente para localizar e baixar
Copie o pedido abaixo em uma conversa do Codex, Claude Code ou de outro agente com internet e acesso a arquivos. Ele usa as fontes oficiais e deve explicar o que realmente conseguiu instalar. A página da Academy permite adaptar esse pedido à sua ferramenta e à missão escolhida.

```text
Quero experimentar a amostra gratuita Datano-Agents integrada à Academy. Fale comigo em português e sem exigir conhecimento de programação.

Localize e leia a fonte oficial: https://github.com/GuilhermeP96/datano-codex-academy
Guia de instalação: https://github.com/GuilhermeP96/datano-codex-academy/blob/main/docs/AGENTS-SETUP.md
Download direto do pacote público: https://academy.datano.com.br/datano-agents-sample.zip
Conferência SHA-256: https://academy.datano.com.br/datano-agents-sample.zip.sha256
Espaço da missão: https://academy.datano.com.br/comecar#agents-sample

Se precisar pesquisar online, busque "Datano-Agents amostra Academy GuilhermeP96 datano-codex-academy" e confirme essas fontes. A amostra não exige assinatura, token nem API key.

Se você puder acessar a internet e trabalhar com arquivos, baixe o ZIP e a conferência SHA-256, compare o hash e extraia em uma pasta nova. Leia README.md e AGENTS-SETUP.md. Preserve meus arquivos e configurações existentes. Se o download falhar, consulte o mesmo repositório oficial; não use um espelho desconhecido. Se não tiver essas ferramentas, diga o que está disponível e me oriente a baixar pelo navegador, sem declarar uma instalação que não ocorreu.

Identifique qual cliente estou usando. No Codex, copie a pasta completa skills/delivery-kit (incluindo referências e scripts) para .agents/skills/delivery-kit no projeto atual, apenas se o destino não existir. No Claude Code, use o marketplace GuilhermeP96/datano-codex-academy e o plugin datano-sample@datano. Em outro cliente, consulte sua configuração de skills/MCP e me explique o passo disponível. O MCP é opcional para usar a skill; não registre conexões adicionais sem eu escolher essa opção.

Quero a missão "Divulgue seu negócio" (id: divulgacao). Use o objetivo do meu brief-datano-agents.json, se eu fornecer esse arquivo. Caso contrário, peça nome da atividade, objetivo, público e informações confirmadas; posso escolher um exemplo fictício.
Conduza os papéis Organizador, Criador e Revisor. Produza os cinco materiais completos: Apresentação da sua oferta; Página de apresentação; Calendário de sete dias; Três publicações; Mensagens de contato. Entregue plano, materiais e parecer de revisão, além de resultado-datano-agents.json com mission, context, plan, artifacts e review. Mantenha approved=false até minha conferência. Explique como voltar à Academy e abrir esse arquivo em "Minha ferramenta gerou um arquivo de resultado"; a página exigirá nova revisão antes do ZIP final.
Não publique nem envie materiais automaticamente, não invente informações e não habilite provedores pagos por conta própria. Relate somente downloads, instalação e testes realmente realizados.
```

## Baixar pelo navegador
1. Abra https://academy.datano.com.br/comecar#agents-sample e clique em Baixar amostra Datano-Agents.
2. Se preferir a URL direta: https://academy.datano.com.br/datano-agents-sample.zip. A conferência SHA-256 está em https://academy.datano.com.br/datano-agents-sample.zip.sha256. Compare o hash do ZIP com esse arquivo; ele verifica integridade, não substitui conferir a fonte.
3. Extraia em uma pasta nova e leia README.md. Preserve arquivos que já existirem. Não precisa criar assinatura, token ou API key para estas três missões.

## Codex: skill no projeto aberto
1. Abra no Codex o projeto em que quer fazer a atividade.
2. Peça para copiar a pasta completa skills/delivery-kit do ZIP para .agents/skills/delivery-kit desse projeto. Ela inclui SKILL.md, referências, scripts e package.json. Se o destino já existir, preserve e confira sua instalação antes de atualizar.
3. Abra uma nova conversa se a skill ainda não aparecer e peça: Use delivery-kit para conduzir a missão divulgação, atendimento ou decisão com dados.
4. O MCP é opcional para essa skill. Se quiser conectar, siga os passos MCP abaixo.

## Claude Code: marketplace próprio
Na conversa do Claude Code, envie um comando por vez:

```text
/plugin marketplace add GuilhermeP96/datano-codex-academy
/plugin install datano-sample@datano
```

Prefira a instalação local quando oferecida. Abra uma nova conversa ou recarregue os plugins pelo cliente. Peça à skill delivery-kit para conduzir sua missão. O plugin inclui o adaptador MCP: confirme Python 3; no Windows, o comando disponível pode ser python ou py -3, em vez de python3. Se necessário, adapte a conexão local preservando as demais.

Se seu agente usa o terminal do Claude Code, os equivalentes são:

```sh
claude plugin marketplace add GuilhermeP96/datano-codex-academy
claude plugin install datano-sample@datano --scope local
```

Dentro do Claude Code, /mcp mostra as conexões. Instalação da skill e disponibilidade de MCP são verificações separadas. Esse marketplace é da Datano; não implica aprovação em diretório oficial.

## Conectar MCP após extrair a amostra
1. Mantenha a pasta extraída: o cliente iniciará delivery-mcp.py nela.
2. Confirme um executável Python 3. Substitua python3 por python quando esse for o comando válido; com py -3, o argumento -3 deve vir antes do caminho do script.
3. No Codex, execute o comando abaixo, trocando CAMINHO_ABSOLUTO pelo local real do arquivo. O pedido para seu agente faz essa adaptação sem você precisar escrever o caminho.

```sh
codex mcp add datano-sample -- python3 "CAMINHO_ABSOLUTO/da/amostra/delivery-mcp.py"
codex mcp list
```

No Claude Code, se não instalou o plugin com MCP, use o adaptador diretamente:

```sh
claude mcp add --transport stdio datano-sample -- python3 "CAMINHO_ABSOLUTO/da/amostra/delivery-mcp.py"
claude mcp list
```

Em outro cliente que aceite mcpServers, acrescente esta entrada à configuração existente, com executável e caminho reais. No Windows, barras / evitam escapes; se usar barras invertidas, escape cada uma no JSON. Não copie o marcador de caminho como se fosse o caminho instalado.

```json
{"mcpServers":{"datano-sample":{"command":"python3","args":["CAMINHO_ABSOLUTO/da/amostra/delivery-mcp.py"]}}}
```

4. Reabra a conversa se necessário e confira a conexão. Peça: Chame datano_sample_plan com mission=divulgacao e meu contexto (nome, objetivo, público e informações confirmadas); mostre os cinco materiais e o plano.
5. Depois de produzir e revisar, peça datano_sample_review com mission, context, plan, artifacts, review e approved. Ela confere preenchimento e aprovação declarada; o conteúdo ainda precisa da revisão da IA e da sua conferência.
6. Não basta gravar a configuração. Peça a seu agente que confirme a resposta real e explique qualquer erro. O adaptador stdio conversa com https://academy.datano.com.br/api/mcp. Não configure token na amostra gratuita.

## Fazer a missão e voltar à Academy
1. Escolha sua missão e informe nome da atividade, objetivo, público e informações confirmadas; pode usar um negócio fictício.
2. No passo Planeje a entrega, baixe brief-datano-agents.json e entregue esse arquivo à sua IA, ou escreva seu objetivo na conversa.
3. Peça plano, cinco materiais completos e parecer de revisão, não apenas instruções de como escrever depois.
4. Peça resultado-datano-agents.json com mission, context, plan, artifacts e review, com approved=false até sua conferência.
5. Na Academy, abra Minha ferramenta gerou um arquivo de resultado e selecione o JSON. Confira os materiais e marque as três confirmações. A importação sempre exige uma nova revisão.
6. Baixe minha entrega completa: o ZIP final contém seus cinco materiais, plano, revisão, instruções e resultado JSON. Baixar não publica nem envia nada.

## Se minha IA só conversa
Use o navegador: preencha o objetivo, copie os pedidos do Organizador, Criador e Revisor, um por vez, para o chat e registre as respostas nos campos. Você pode revisar e baixar o pacote sem instalar skill, MCP, Python ou Node.

## Se algo não aparecer
- Sem internet/arquivos na IA: baixe no navegador e use os pedidos da página.
- Skill ausente no Codex: confira a pasta completa .agents/skills/delivery-kit no projeto aberto e inicie uma nova conversa.
- Plugin ausente no Claude Code: confira instalação, escopo e carregamento pelo cliente.
- MCP não conecta: confira Python 3, caminho absoluto e acesso HTTPS. Não habilite serviços pagos nem altere outras conexões para tentar resolver. Peça que o agente mostre o erro e o passo correspondente.

## Fontes dos comandos
Conferidas em 09/10/2026:
- Skills Codex: https://learn.chatgpt.com/docs/build-skills
- MCP Codex: https://learn.chatgpt.com/docs/extend/mcp?surface=cli
- Plugins Claude Code: https://code.claude.com/docs/en/discover-plugins
- MCP Claude Code: https://code.claude.com/docs/en/mcp
