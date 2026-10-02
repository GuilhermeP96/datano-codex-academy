# Decisões do portal

## Escopo e arquitetura

Pedido: criar e publicar no GitHub do usuário um portal completo de ensino de Codex, com comandos, integração com VS Code, identidade DatanO e interatividade.

Repositório independente `datano-codex-academy` em `GuilhermeP96`; publicação no GitHub Pages. `github.dev` é atalho de edição, não hospedagem do site. HTML/CSS/JS nativos com rotas por hash e caminhos relativos permitem funcionar sob o prefixo do Pages sem servidor de aplicação. Nenhuma chave de IA é necessária.

As aulas têm três blocos de conteúdo, exemplo, exercício, quiz e anotações. A conclusão exige resposta correta e confirmação de prática. O progresso usa localStorage versionado, com importação que filtra IDs desconhecidos e exportação explícita. O simulador nunca chama shell, modelo ou serviço externo.

## Marca

Fonte canônica: `GuilhermeP96/gp96combr`, `public/logo-datano-white.svg` e escala `datano` em `tailwind.config.ts`. Base `#142838`, destaque azul `#8fc0df`, ação `#2c6999`. Cores secundárias das trilhas são extensões didáticas. O kit GP96 aberto no IDE era outra marca; sua paleta não foi usada como identidade DatanO.

## Memória e orquestração

Animus: guia obrigatório consultado, mapa `Sistema/Projetos/Datano.md` aberto. O mapa só continha candidatos; busca verificada por DatanO/Codex não retornou notas. Recall amplo não estabeleceu identidade visual. Decisões foram confrontadas com código atual e fontes oficiais.

DatanO Commander lido, validação estrutural passou em 18 squads. Dry-run de `product-launch` resolveu Design Chief → Fullstack Chief → DevOps Chief → Traffic Chief. O workflow integral inclui backend, banco e aquisição paga fora do pedido; não foi executado. Foram aplicadas as orientações Tier 0 de design, arquitetura e publicação no escopo do portal. Nenhum especialista foi invocado diretamente e nenhuma campanha foi lançada.

## Qualidade e privacidade

Testes Playwright em Chromium desktop e celular, auditoria axe nos dois temas, checks do currículo e build estático. Fontes externas de tipografia são carregadas do Google Fonts; o conteúdo continua legível com fontes do sistema quando elas não carregam. O Google pode receber os metadados normais dessa requisição; progresso e anotações não são enviados pela aplicação. GitHub Pages recebe as requisições normais de acesso à hospedagem.

Não há certificação, validação automatizada de exercício real, sincronização entre dispositivos, chatbot de IA nem alteração da instalação pessoal do usuário. Os atalhos e arquivos de exemplo tornam a integração com o editor concreta; a execução do exercício ocorre no ambiente do aluno.
