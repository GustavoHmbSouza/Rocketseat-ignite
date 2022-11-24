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
        const aluguel = await this.repository.findOne({ where: { carro_id, tempo_final: null } });

        return aluguel;
    }

    async findAluguelDisponivelParaUsuario(usuario_id: string): Promise<Aluguel> {
        const aluguel = await this.repository.findOne({ where: { usuario_id, tempo_final: null } });

        return aluguel;
    }

    async create({ carro_id, usuario_id, tempo_previsto_retorno, id, tempo_final, total }: ICreateAluguelDTO): Promise<Aluguel> {
        const aluguel = this.repository.create({
            carro_id,
            usuario_id,
            tempo_previsto_retorno,
            id,
            tempo_final,
            total
        });
        await this.repository.save(aluguel);

        return aluguel;
    }

    async findById(id: string): Promise<Aluguel> {
        const aluguel = await this.repository.findOne(id);

        return aluguel;
    }

    async findByUsuario(usuario_id: string): Promise<Aluguel[]> {
        const algueis = await this.repository.find({ where: { usuario_id }, relations: ["carro"] });

        return algueis;
    }
}

export { AlugueisRepository }