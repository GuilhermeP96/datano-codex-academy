"""Exercício: implemente o contrato com sua ferramenta de IA."""
from pathlib import Path

def processar(origem: Path, destino: Path) -> None:
    raise NotImplementedError("Implemente processar conforme CONTRATO.md")

if __name__ == "__main__":
    processar(Path("vendas.csv"), Path("relatorio.json"))
