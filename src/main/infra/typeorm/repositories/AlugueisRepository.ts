import { getRepository, Repository } from "typeorm";
import { ICreateAluguelDTO } from "../../../dtos/ICreateAluguelDTO";
import { IAlugueisRepository } from "../../../repositories/IAlugueisRepository";
import { Aluguel } from "../entities/Aluguel";


class AlugueisRepository implements IAlugueisRepository {
    private repository: Repository<Aluguel>;

    constructor() {
        this.repository = getRepository(Aluguel);
    }

    async findAluguelDisponivelParaCarro(carro_id: string): Promise<Aluguel> {
        const aluguel = await this.repository.findOne({ carro_id });

        return aluguel;
    }
    async findAluguelDisponivelParaUsuario(usuario_id: string): Promise<Aluguel> {
        const aluguel = await this.repository.findOne({ usuario_id });

        return aluguel;
    }
    async create({ carro_id, usuario_id, tempo_previsto_retorno }: ICreateAluguelDTO): Promise<Aluguel> {
        const aluguel = this.repository.create({
            carro_id,
            usuario_id,
            tempo_previsto_retorno
        });
        await this.repository.save(aluguel);

        return aluguel;
    }

}

export { AlugueisRepository }