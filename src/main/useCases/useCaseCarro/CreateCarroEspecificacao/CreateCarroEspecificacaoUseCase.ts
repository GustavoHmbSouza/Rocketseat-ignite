import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Carro } from "../../../infra/typeorm/entities/Carro";
import { ICarroRepository } from "../../../repositories/ICarroRepository";
import { IEspecificacaoRepository } from "../../../repositories/IEspecificacaoRepository";

interface IRequest {
    carro_id: string;
    especificacoes_id: string[];
}

@injectable()
class CreateCarroEspecificacaoUseCase {

    constructor(
        @inject("CarrosRepository")
        private carrosRepository: ICarroRepository,

        @inject("EspecificacoesRepository")
        private especificacoesRepository: IEspecificacaoRepository
    ) { }

    async execute({ carro_id, especificacoes_id }: IRequest): Promise<Carro> {

        const carroExiste = await this.carrosRepository.findById(carro_id);

        if (!carroExiste)
            throw new AppError("Carro não existe!")

        const especificacoes = await this.especificacoesRepository.findByIds(especificacoes_id);

        carroExiste.especificacoes = especificacoes;

        const carroCriado = await this.carrosRepository.create(carroExiste);

        return carroCriado;
    }
}

export { CreateCarroEspecificacaoUseCase }