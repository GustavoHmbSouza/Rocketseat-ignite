import { getRepository, Repository } from "typeorm"
import { ICreateEspecificacaoDTO, IEspecificacaoRepository } from "../../../repositories/IEspecificacaoRepository";
import { Especificacao } from "../entities/Especificacao";

class EspecificacoesRepository implements IEspecificacaoRepository {
    private repository: Repository<Especificacao>;

    constructor() {
        this.repository = getRepository(Especificacao)
    }

    async create({ nome, descricao }: ICreateEspecificacaoDTO): Promise<Especificacao> {
        const especificacao = this.repository.create({ nome, descricao });

        await this.repository.save(especificacao);

        return especificacao;
    }

    async findByName(nome: string): Promise<Especificacao> {
        const especificacao = await this.repository.findOne({ nome })

        return especificacao;
    }

    async findByIds(ids: string[]): Promise<Especificacao[]> {
        const especificacao = await this.repository.findByIds(ids)

        return especificacao;
    }
}

export { EspecificacoesRepository };
