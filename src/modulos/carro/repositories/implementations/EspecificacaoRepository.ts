import { Especificacao } from "../../model/Especificacao";
import {
    ICreateEspecificacaoDTO,
    IEspecificacaoRepository,
} from "../IEspecificacaoRepository";

class EspecificacaoRepository implements IEspecificacaoRepository {
    private especificacoes: Especificacao[];

    constructor() {
        this.especificacoes = [];
    }

    create({ nome, descricao }: ICreateEspecificacaoDTO): void {
        const especificacao = new Especificacao();

        Object.assign(especificacao, {
            nome,
            descricao,
            create_at: new Date(),
        });

        this.especificacoes.push(especificacao);
    }

    findByName(nome: string): Especificacao {
        const especificacao = this.especificacoes.find(
            (especificacao) => especificacao.nome === nome
        );

        return especificacao;
    }
}

export { EspecificacaoRepository };
