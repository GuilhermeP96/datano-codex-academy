# Amostra e distribuição
A jornada gratuita completa está em https://academy.datano.com.br/comecar. A opção principal começa sem programação: o aluno conversa com sua IA, confere uma lista de vendas fictícias e baixa um relatório em texto. A prática com código e o kit são opcionais. Este repositório contém somente amostra pública autoral, kit de prática, skill e adaptador. A Academy privada oferece os projetos avançados por assinatura.

Claude Code: `/plugin marketplace add GuilhermeP96/datano-codex-academy`, depois `/plugin install datano-sample@datano`. A skill first-delivery funciona sem licença. O adaptador usa Python 3 (Windows pode usar python). O guia MCP gratuito não requer credencial. O serviço premium exige uma concessão agents específica já vigente e token no ambiente protegido DATANO_LICENSE_TOKEN. Nunca cole a credencial no chat ou em config versionada.

Uma skill instalada não fornece DRM nem revogação do texto. O servidor premium confere o direito em cada chamada. Licenças originais dos componentes são preservadas. Não há chamadas a modelos no servidor de consulta.

server.json é candidato para MCP Registry; não comprova listagem. Autenticação do publicador e submissão não foram feitas. Instalação nativa Claude CLI e diretórios oficiais dependem de validação específica. O diretório OpenAI também exige OAuth para o serviço premium e proíbe upsell digital dentro do plugin; o endpoint Bearer atual atende integração CLI manual, sem alegar essa compatibilidade OAuth.

CI/build/testes: `bash scripts/ci/validate.sh` na VPS. Workflow hospedado preservado em docs/ci-archive, desativado. A branch gh-pages é publicação histórica; não ativar pipeline hospedado para atualizá-la. A amostra atual é servida pela VPS no domínio Academy.
