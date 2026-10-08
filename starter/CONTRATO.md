# Contrato da amostra fictícia
CSV UTF-8 com colunas id,data,quantidade,preco_centavos.
ID não vazio e único: conservar primeira linha válida.
Data real em ISO YYYY-MM-DD; quantidade inteira > 0; preco_centavos inteiro >= 0.
Linhas inválidas devem ser rejeitadas individualmente com número da linha e motivo.
`relatorio.json`: receita_centavos (inteiro), aceitas (inteiro), rejeitadas (lista).
Cada item de rejeitadas: linha (inteiro, cabeçalho é linha 1) e motivo (texto).
Entrada imutável. A mesma entrada produz a mesma saída.
Gabarito: 12950 centavos, 3 aceitas, 3 rejeitadas (linhas 4, 5 e 6).
Linhas válidas: 2*2500 + 1*3950 + 4*1000 = 12950.
