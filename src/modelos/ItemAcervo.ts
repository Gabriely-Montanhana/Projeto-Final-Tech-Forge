import { ItemIndisponivelErro, OperacaoInvalidaErro } from "../erros/ErrosBiblioteca";

export abstract class ItemAcervo {
    private static _contadorId = 1;

    public readonly id: number;
    private _emprestado = false;
    private _dataEmprestimo: Date | null = null;

    protected constructor(private _titulo: string) {
        this.id = ItemAcervo._contadorId;
        ItemAcervo._contadorId++;
    }

    public get titulo(): string {
        return this._titulo;
    }

    public get statusDisponibilidade(): string {
        return this._emprestado ? "Emprestado" : "Disponível";
    }

    public get tempoEmprestado(): number {
        if (!this._dataEmprestimo) {
            return 0;
        }

        const milissegundos = Date.now() - this._dataEmprestimo.getTime();
        return Math.floor(milissegundos / (1000 * 60 * 60 * 24));
    }

    public emprestar(): void {
        if (this._emprestado) {
            throw new ItemIndisponivelErro(this._titulo);
        }

        this._emprestado = true;
        this._dataEmprestimo = new Date();
    }

    public devolver(): void {
        if (!this._emprestado) {
            throw new OperacaoInvalidaErro(`O item "${this._titulo}" não está emprestado.`);
        }

        this._emprestado = false;
        this._dataEmprestimo = null;
    }

    public abstract calcularMulta(diasAtraso: number): number;

    public resumo(): string {
        return `#${this.id} | ${this._titulo} | ${this.statusDisponibilidade}`;
    }
}
