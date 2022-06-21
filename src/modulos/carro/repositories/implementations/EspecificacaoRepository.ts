import { Especificacao } from "../../entities/Especificacao";
import {
    ICreateEspecificacaoDTO,
    IEspecificacaoRepository,
} from "../IEspecificacaoRepository";
import { getRepository, Repository } from "typeorm"

class EspecificacaoRepository implements IEspecificacaoRepository {
    private repository: Repository<Especificacao>;

    constructor() {
        this.repository = getRepository(Especificacao)
    }

    async create({ nome, descricao }: ICreateEspecificacaoDTO): Promise<void> {
        const especificacao = this.repository.create({ nome, descricao });

        await this.repository.save(especificacao);
    }

    async findByName(nome: string): Promise<Especificacao> {
        const especificacao = await this.repository.findOne({ nome })

        return especificacao;
    }
}

export { EspecificacaoRepository };
