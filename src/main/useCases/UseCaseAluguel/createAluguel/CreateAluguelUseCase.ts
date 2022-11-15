import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateAluguelDTO } from "../../../dtos/ICreateAluguelDTO";
import { Aluguel } from "../../../infra/typeorm/entities/Aluguel";
import { IAlugueisRepository } from "../../../repositories/IAlugueisRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateAluguelUseCase {

    constructor(
        @inject("AlugueisRepository")
        private alugueisRepository: IAlugueisRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ usuario_id, carro_id, tempo_previsto_retorno }: ICreateAluguelDTO): Promise<Aluguel> {
        const minimoHoras = 24;
        const carroIndisponivel = await this.alugueisRepository.findAluguelDisponivelParaCarro(carro_id);

        if (carroIndisponivel)
            throw new AppError("Carro não esta disponível!");

        const aluguelDisponivelParaUsuario = await this.alugueisRepository.findAluguelDisponivelParaUsuario(usuario_id);

        if (aluguelDisponivelParaUsuario)
            throw new AppError("Aluguel não disponível para usuario!");

        const comparacao = this.dateProvider.comparacaoHoras(tempo_previsto_retorno)

        if (comparacao < minimoHoras)
            throw new AppError("Quantidade de horas invalida! Minimo deve ser 24!");


        const aluguel = await this.alugueisRepository.create({
            usuario_id,
            carro_id,
            tempo_previsto_retorno
        });

        return aluguel
    }
}

export { CreateAluguelUseCase }