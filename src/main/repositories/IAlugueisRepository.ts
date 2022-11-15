import { ICreateAluguelDTO } from "../dtos/ICreateAluguelDTO";
import { Aluguel } from "../infra/typeorm/entities/Aluguel";


interface IAlugueisRepository {
    findAluguelDisponivelParaCarro(carro_id: string): Promise<Aluguel>;
    findAluguelDisponivelParaUsuario(usuario_id: string): Promise<Aluguel>;
    create(data: ICreateAluguelDTO): Promise<Aluguel>;
}

export { IAlugueisRepository }