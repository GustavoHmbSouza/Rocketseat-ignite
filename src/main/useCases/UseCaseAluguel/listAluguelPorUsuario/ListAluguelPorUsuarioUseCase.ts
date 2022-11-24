import { inject, injectable } from "tsyringe";
import { Aluguel } from "../../../infra/typeorm/entities/Aluguel";
import { IAlugueisRepository } from "../../../repositories/IAlugueisRepository";

@injectable()
class ListAluguelPorUsuarioUseCase {
    constructor(
        @inject("AlugueisRepository")
        private alugueisRepository: IAlugueisRepository
    ) { }

    async execute(usuario_id: string): Promise<Aluguel[]> {
        const alugueisPosUsuario = await this.alugueisRepository.findByUsuario(usuario_id);

        return alugueisPosUsuario;
    }
}

export { ListAluguelPorUsuarioUseCase }