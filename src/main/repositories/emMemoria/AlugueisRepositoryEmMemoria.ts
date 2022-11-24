import { ICreateAluguelDTO } from "../../dtos/ICreateAluguelDTO";
import { Aluguel } from "../../infra/typeorm/entities/Aluguel";
import { IAlugueisRepository } from "../IAlugueisRepository";


class AlugueisRepositoryEmMemoria implements IAlugueisRepository {

    alugueis: Aluguel[] = []

    async findAluguelDisponivelParaCarro(carro_id: string): Promise<Aluguel> {
        return this.alugueis.find(aluguel => aluguel.carro_id === carro_id && !aluguel.tempo_final)
    }

    async findAluguelDisponivelParaUsuario(usuario_id: string): Promise<Aluguel> {
        return this.alugueis.find(aluguel => aluguel.usuario_id === usuario_id && !aluguel.tempo_final)
    }

    async create({ carro_id, usuario_id, tempo_previsto_retorno }: ICreateAluguelDTO): Promise<Aluguel> {
        const aluguel = new Aluguel();

        Object.assign(aluguel, { carro_id, usuario_id, tempo_previsto_retorno, tempo_inicial: new Date() })

        this.alugueis.push(aluguel);

        return aluguel;
    }

    async findById(id: string): Promise<Aluguel> {
        return this.alugueis.find(aluguel => aluguel.id === id)
    }

    async findByUsuario(usuario_id: string): Promise<Aluguel[]> {
        return this.alugueis.filter(aluguel => aluguel.usuario_id === usuario_id)
    }
}

export { AlugueisRepositoryEmMemoria }