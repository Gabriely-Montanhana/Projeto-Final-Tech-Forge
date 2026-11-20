import { ItemAcervo } from "./modelos/ItemAcervo";
import { Livro } from "./modelos/Livro";
import { JogoEletronico } from "./modelos/JogoEletronico";
import { RepositorioMemoria } from "./repositorio/RepositorioMemoria";
import { CadastroLivro, ResumoItem } from "./tipos/TiposUtilitarios";
import { ItemIndisponivelErro, ItemNaoEncontradoErro, OperacaoInvalidaErro } from "./erros/ErrosBiblioteca";

const acervo = new RepositorioMemoria<ItemAcervo>();

function cadastrarLivro(dados: CadastroLivro): Livro {
    const livro = new Livro(dados.titulo, dados.autor, dados.isbn);
    acervo.salvar(livro);
    return livro;
}

function montarResumo(item: ItemAcervo): ResumoItem {
    return {
        id: item.id,
        titulo: item.titulo,
        status: item.statusDisponibilidade
    };
}

function formatarMoeda(valor: number): string {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

console.log("==============================================");
console.log("  SISTEMA DE ACERVO - BIBLIOTECA / GAMES");
console.log("==============================================\n");

const livro1 = cadastrarLivro({
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    isbn: "978-85-359-0277-8"
});

const livro2 = cadastrarLivro({
    titulo: "O Hobbit",
    autor: "J. R. R. Tolkien",
    isbn: "978-85-359-0051-4"
});

const jogo1 = new JogoEletronico("The Legend of Zelda", "Nintendo Switch", 10);
const jogo2 = new JogoEletronico("God of War", "PlayStation 5", 18);
acervo.salvar(jogo1);
acervo.salvar(jogo2);

console.log("Itens cadastrados:");
for (const item of acervo.listar()) {
    console.log(" - " + item.resumo());
}

console.log("\n--- Empréstimo ---");
livro1.emprestar();
jogo1.emprestar();
console.log(livro1.resumo());
console.log(`Tempo emprestado de "${livro1.titulo}": ${livro1.tempoEmprestado} dia(s)`);
console.log(jogo1.resumo());

console.log("\n--- Multas (regras diferentes por tipo) ---");
console.log(`Livro com 4 dias de atraso: ${formatarMoeda(livro1.calcularMulta(4))}`);
console.log(`Jogo com 4 dias de atraso: ${formatarMoeda(jogo1.calcularMulta(4))}`);

console.log("\n--- Reserva de livro ---");
livro2.reservar("Gabriely");
console.log(livro2.resumo());
livro2.cancelarReserva();
console.log(`Reserva cancelada. Possui reserva? ${livro2.possuiReserva ? "sim" : "não"}`);

console.log("\n--- Resumo com utility type Pick ---");
const resumos = acervo.listar().map(montarResumo);
console.log(resumos);

console.log("\n--- Devolução ---");
livro1.devolver();
console.log(livro1.resumo());

console.log("\n--- Exceções ---");
try {
    livro1.devolver();
} catch (erro) {
    if (erro instanceof OperacaoInvalidaErro) {
        console.log("Operação inválida:", erro.message);
    }
}

try {
    jogo1.emprestar();
} catch (erro) {
    if (erro instanceof ItemIndisponivelErro) {
        console.log("Item indisponível:", erro.message);
    }
}

try {
    acervo.buscarPorId(99);
} catch (erro) {
    if (erro instanceof ItemNaoEncontradoErro) {
        console.log("Busca no repositório:", erro.message);
    }
}

console.log("\nAcervo final:");
for (const item of acervo.listar()) {
    console.log(" - " + item.resumo());
}

console.log("\nExecução concluída.");
