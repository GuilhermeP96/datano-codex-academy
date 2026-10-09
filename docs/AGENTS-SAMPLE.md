# DatanO-Agents + Academy: amostra de entrega prática

Comece em https://academy.datano.com.br/comecar#agents-sample. Escolha divulgação de negócio, atendimento ou decisão com dados. Você passa por Organizador, Criador e Revisor e produz cinco materiais, mais plano e revisão. Use seu chat de IA, registre os textos e baixe a entrega em ZIP. Não precisa instalar este pacote para usar a Academy.

Os três papéis orientam a conversa na ferramenta de IA escolhida. A Academy monta pedidos, preserva textos no navegador e organiza arquivos; não executa modelos nem lê sua conversa. Rascunhos iniciais são modelos editáveis, identificados como tais. Você revisa informações antes de usar. A amostra não publica nem envia materiais.

## Baixar e preparar com seu agente
A amostra de instalação 1.1.1 inclui um [passo a passo de instalação e uso](AGENTS-SETUP.md), com pedido pronto para o agente localizar a fonte oficial, baixar o ZIP, conferir SHA-256 e preparar a skill ou o MCP. A Academy tem o botão Copiar pedido para baixar e preparar, adaptado à ferramenta e à missão. Sem ferramentas de arquivos, siga o caminho pelo navegador.

## A mesma missão na skill/MCP
No Claude Code, adicione o marketplace GuilhermeP96/datano-codex-academy e instale datano-sample@datano. Peça à skill delivery-kit a missão desejada. No Codex, copie a pasta completa skills/delivery-kit para .agents/skills/delivery-kit; ela já inclui suas referências, scripts e package.json. A skill também pode consultar os contratos via MCP datano-delivery. Os três contratos estão em skills/delivery-kit/references/agents-sample-data.js.

O adaptador stdio requer Python 3 e usa o endpoint HTTPS da Academy. Ferramentas gratuitas: datano_sample_plan e datano_sample_review. A segunda verifica preenchimento e aprovação declarada; a revisão de conteúdo é feita pela IA e pelo usuário. As ferramentas não fazem execução de modelos, publicação ou envio. Integrações premium continuam exigindo licença agents vigente. Não configurar token para estas três missões gratuitas.

Você pode baixar brief-datano-agents.json na Academy para fornecer à sua ferramenta. Depois, abra resultado-datano-agents.json no espaço da missão. O resultado contém mission, context, plan, artifacts e review. A importação sempre exige nova conferência do usuário, mesmo que approved venha true. Não há sincronização automática de conta ou envio desse arquivo ao servidor.

Se sua ferramenta trabalha com arquivos e Node, o helper skills/delivery-kit/scripts/assemble-delivery.mjs monta a pasta final após approved=true. Usa somente biblioteca padrão, exige uma pasta nova e preserva arquivos existentes. Sem Node, importe o resultado na Academy e baixe o ZIP pelo navegador. A página HTML é estática; o CSV tem proteção contra fórmulas em células. Conteúdo informado é tratado como texto.

## Fonte, distribuição e validação
Este pacote é público, autoral e MIT, com três papéis e três missões. Não contém o catálogo privado nem aulas pagas. build-agents-sample.py recria o ZIP determinístico por allowlist. O pacote completo e continuidade comercial seguem os direitos da assinatura; a amostra permanece gratuita.

A presença de um ZIP/manifesto não é aprovação em diretório oficial. CI e validação na VPS; instalação nativa no Claude permanece pendente quando o cliente não estiver disponível.
