import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IDevolucaoCarroDTO } from "../../../dtos/IDevolucaoCarroDTO";
import { Aluguel } from "../../../infra/typeorm/entities/Aluguel";
import { IAlugueisRepository } from "../../../repositories/IAlugueisRepository";
import { ICarroRepository } from "../../../repositories/ICarroRepository";

@injectable()
class DevolucaoAluguelUseCase {

    constructor(
        @inject("AlugueisRepository")
        private alugueisRepository: IAlugueisRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("CarrosRepository")
        private carrosRepository: ICarroRepository
    ) { }

    async execute({ id, usuario_id }: IDevolucaoCarroDTO): Promise<Aluguel> {
        const aluguel = await this.alugueisRepository.findById(id);
        const carro = await this.carrosRepository.findById(aluguel.carro_id);

        const minimo_diaria = 1;

        if (!aluguel)
            throw new AppError("Aluguel não existe!!");

        let diaria = this.dateProvider.compareEmDias(aluguel.tempo_previsto_retorno, this.dateProvider.dateNow());

        const delay = this.dateProvider.compareEmDias(this.dateProvider.dateNow(), aluguel.tempo_previsto_retorno);

        if (diaria <= 0) {
            diaria = minimo_diaria;
        }

        let total = 0;

        if (delay > 0) {
            const calculo_multa = delay * carro.valor_multa;
            total = calculo_multa;
        }

        total += diaria * carro.dia_rate;

        aluguel.tempo_final = this.dateProvider.dateNow();
        aluguel.total = total;

        await this.alugueisRepository.create(aluguel);
        await this.carrosRepository.updateAvailable(carro.id, true);

        return aluguel;
    };
}

export { DevolucaoAluguelUseCase }