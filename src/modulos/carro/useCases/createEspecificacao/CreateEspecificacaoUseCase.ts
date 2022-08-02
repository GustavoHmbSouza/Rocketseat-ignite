import { inject, injectable } from "tsyringe";
import { IEspecificacaoRepository } from "../../repositories/IEspecificacaoRepository";

interface IRequest {
    nome: string;
    descricao: string;
}

@injectable()
class CreateEspecificacaoUseCase {
    constructor(
        @inject("EspecificacoesRepository")
        private especificacaoRepository: IEspecificacaoRepository) { }

    async execute({ nome, descricao }: IRequest): Promise<void> {
        const especificacaoAlreasyExists =
            await this.especificacaoRepository.findByName(nome);

        if (especificacaoAlreasyExists)
            throw new AppError("Especificação já existe!");

        await this.especificacaoRepository.create({ nome, descricao });
    }
}

export { CreateEspecificacaoUseCase };
