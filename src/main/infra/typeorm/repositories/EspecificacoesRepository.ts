import {
    ICreateEspecificacaoDTO,
    IEspecificacaoRepository,
} from "../../../repositories/IEspecificacaoRepository";
import { getRepository, Repository } from "typeorm"
import { Especificacao } from "../entities/Especificacao";

class EspecificacoesRepository implements IEspecificacaoRepository {
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

export { EspecificacoesRepository };
