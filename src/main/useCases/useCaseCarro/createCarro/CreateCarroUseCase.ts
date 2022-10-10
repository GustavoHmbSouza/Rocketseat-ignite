import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Carro } from "../../infra/typeorm/entities/Carro";
import { ICarroRepository } from "../../repositories/ICarroRepository";

interface IRequest {
    nome: string;
    descricao: string;
    dia_rate: number;
    placa: string;
    valor_multa: number;
    marca: string;
    categoria_id: string;
}

@injectable()
class CreateCarroUseCase {
    constructor(
        @inject("CarrosRepository")
        private carrosRepository: ICarroRepository) { }

    async execute({ nome, descricao, dia_rate, placa, valor_multa, marca, categoria_id }: IRequest): Promise<Carro> {
        const carroJaExiste = await this.carrosRepository.findByPlaca(placa);

        if (carroJaExiste) {
            throw new AppError("Carro ja existe!");
        }

        const carro = await this.carrosRepository.create({ nome, descricao, dia_rate, placa, valor_multa, marca, categoria_id });

        return carro;
    }

}

export { CreateCarroUseCase }