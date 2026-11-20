import { OperacaoInvalidaErro } from "../erros/ErrosBiblioteca";
import { Reservavel } from "../interfaces/Reservavel";
import { ItemAcervo } from "./ItemAcervo";

export class Livro extends ItemAcervo implements Reservavel {
    private _reservadoPor: string | null = null;

    constructor(
        titulo: string,
        private _autor: string,
        private _isbn: string
    ) {
        super(titulo);
    }

    public get autor(): string {
        return this._autor;
    }

    public get isbn(): string {
        return this._isbn;
    }

    public get possuiReserva(): boolean {
        return this._reservadoPor !== null;
    }

    public reservar(nomeUsuario: string): void {
        if (this.possuiReserva) {
            throw new OperacaoInvalidaErro(`O livro "${this.titulo}" já está reservado por ${this._reservadoPor}.`);
        }

        if (nomeUsuario.trim().length === 0) {
            throw new OperacaoInvalidaErro("Informe o nome de quem vai reservar o livro.");
        }

        this._reservadoPor = nomeUsuario.trim();
    }

    public cancelarReserva(): void {
        if (!this.possuiReserva) {
            throw new OperacaoInvalidaErro(`O livro "${this.titulo}" não possui reserva.`);
        }

        this._reservadoPor = null;
    }

    public override calcularMulta(diasAtraso: number): number {
        if (diasAtraso <= 0) {
            return 0;
        }

        return diasAtraso * 1.5;
    }

    public override resumo(): string {
        const reserva = this.possuiReserva ? ` | Reservado por ${this._reservadoPor}` : "";
        return `${super.resumo()} | Livro de ${this._autor} | ISBN ${this._isbn}${reserva}`;
    }
}
