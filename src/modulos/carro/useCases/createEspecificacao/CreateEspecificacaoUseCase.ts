import { EspecificacaoRepository } from "../../repositories/implementations/EspecificacaoRepository";

interface IRequest {
    nome: string;
    descricao: string;
}

class CreateEspecificacaoUseCase {
    constructor(private especificacaoRepository: EspecificacaoRepository) { }

    execute({ nome, descricao }: IRequest): void {
        const especificacaoAlreasyExists =
            this.especificacaoRepository.findByName(nome);

        if (especificacaoAlreasyExists)
            throw new Error("Especificação já existe!");

        this.especificacaoRepository.create({ nome, descricao });
    }
}

export { CreateEspecificacaoUseCase };
