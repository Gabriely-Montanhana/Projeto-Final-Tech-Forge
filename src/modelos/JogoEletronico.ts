import { ItemAcervo } from "./ItemAcervo";

export class JogoEletronico extends ItemAcervo {
    constructor(
        titulo: string,
        private _plataforma: string,
        private _faixaEtaria: number
    ) {
        super(titulo);
    }

    public get plataforma(): string {
        return this._plataforma;
    }

    public get faixaEtaria(): number {
        return this._faixaEtaria;
    }

    public override calcularMulta(diasAtraso: number): number {
        if (diasAtraso <= 0) {
            return 0;
        }

        return diasAtraso * 3;
    }

    public override resumo(): string {
        return `${super.resumo()} | Jogo para ${this._plataforma} | +${this._faixaEtaria}`;
    }
}
