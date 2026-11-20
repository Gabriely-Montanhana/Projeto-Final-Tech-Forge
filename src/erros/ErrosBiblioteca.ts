export class ItemNaoEncontradoErro extends Error {
    constructor(id: number) {
        super(`Nenhum item com ID ${id} foi encontrado no acervo.`);
        this.name = "ItemNaoEncontradoErro";
    }
}

export class ItemIndisponivelErro extends Error {
    constructor(titulo: string) {
        super(`O item "${titulo}" não está disponível para empréstimo.`);
        this.name = "ItemIndisponivelErro";
    }
}

export class OperacaoInvalidaErro extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "OperacaoInvalidaErro";
    }
}
