import { Especificacao } from "../../infra/typeorm/entities/Especificacao";
import { ICreateEspecificacaoDTO, IEspecificacaoRepository } from "../IEspecificacaoRepository";

class EspecificacaoRepositoryEmMemoria implements IEspecificacaoRepository {

    especificacoes: Especificacao[] = [];

    async create({ nome, descricao }: ICreateEspecificacaoDTO): Promise<Especificacao> {
        const especificacao = new Especificacao;

        Object.assign(especificacao, {
            descricao, nome
        })

        this.especificacoes.push(especificacao);

        return especificacao;
    }
    async findByName(nome: string): Promise<Especificacao> {
        return this.especificacoes.find((especificacao) => especificacao.nome === nome);
    }
    async findByIds(ids: string[]): Promise<Especificacao[]> {
        const allEspecificacoes = this.especificacoes.filter((especificacao) => ids.includes(especificacao.id))

        return allEspecificacoes;
    }

}

export { EspecificacaoRepositoryEmMemoria }