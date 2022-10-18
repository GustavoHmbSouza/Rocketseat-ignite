import { inject, injectable } from "tsyringe";
import { Carro } from "../../../infra/typeorm/entities/Carro";
import { ICarroRepository } from "../../../repositories/ICarroRepository";

interface IRequest {
    categoria_id?: string;
    placa?: string;
    nome?: string;
}

@injectable()
class ListAvailableCarrosUseCase {
    constructor(
        @inject("CarrosRepository")
        private carroRepository: ICarroRepository
    ) { }

    async execute({ categoria_id, placa, nome }: IRequest): Promise<Carro[]> {
        const carros = await this.carroRepository.findAvailable(placa, categoria_id, nome);
        return carros;
    }
}

export { ListAvailableCarrosUseCase }