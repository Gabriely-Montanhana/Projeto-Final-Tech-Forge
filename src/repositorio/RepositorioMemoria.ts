import { ItemNaoEncontradoErro } from "../erros/ErrosBiblioteca";

export class RepositorioMemoria<T extends { readonly id: number }> {
    private readonly itens: T[] = [];

    public salvar(item: T): T {
        this.itens.push(item);
        return item;
    }

    public buscarPorId(id: number): T {
        const item = this.itens.find((atual) => atual.id === id);

        if (!item) {
            throw new ItemNaoEncontradoErro(id);
        }

        return item;
    }

    public listar(): readonly T[] {
        return [...this.itens];
    }

    public existe(id: number): boolean {
        return this.itens.some((atual) => atual.id === id);
    }

    public remover(id: number): void {
        const indice = this.itens.findIndex((atual) => atual.id === id);

        if (indice < 0) {
            throw new ItemNaoEncontradoErro(id);
        }

        this.itens.splice(indice, 1);
    }

    public atualizar(id: number, dados: Partial<T>): T {
        const item = this.buscarPorId(id);
        Object.assign(item, dados);
        return item;
    }
}
