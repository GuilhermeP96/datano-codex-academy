"""Verificador independente da entrega. Só usa biblioteca padrão."""
import json
import tempfile
from pathlib import Path
from pipeline import processar

with tempfile.TemporaryDirectory() as temp:
    destino = Path(temp) / "relatorio.json"
    origem = Path(__file__).with_name("vendas.csv")
    antes = origem.read_bytes()
    processar(origem, destino)
    r = json.loads(destino.read_text(encoding="utf-8"))
    assert type(r["receita_centavos"]) is int and r["receita_centavos"] == 12950, "Receita divergente"
    assert type(r["aceitas"]) is int and r["aceitas"] == 3, "Contagem divergente"
    assert len(r["rejeitadas"]) == 3, "Rejeições divergentes"
    assert sorted(x["linha"] for x in r["rejeitadas"]) == [4, 5, 6], "Linhas divergentes"
    assert all(isinstance(x["motivo"], str) and x["motivo"].strip() for x in r["rejeitadas"]), "Motivo ausente"
    assert origem.read_bytes() == antes, "Origem alterada"
    primeira = destino.read_bytes()
    processar(origem, destino)
    assert destino.read_bytes() == primeira, "Resultado não determinístico"
print("PASSOU: receita 12950 centavos, 3 aceitas, 3 rejeitadas; origem preservada; saída reproduzível.")
