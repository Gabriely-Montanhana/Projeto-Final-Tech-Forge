export type CadastroLivro = {
    titulo: string;
    autor: string;
    isbn: string;
};

export type CadastroJogo = {
    titulo: string;
    plataforma: string;
    faixaEtaria: number;
};

export type AtualizacaoTitulo = Partial<Pick<CadastroLivro, "titulo">>;

export type ResumoItem = {
    id: number;
    titulo: string;
    status: string;
};

export type CadastroSemIsbn = Omit<CadastroLivro, "isbn">;
