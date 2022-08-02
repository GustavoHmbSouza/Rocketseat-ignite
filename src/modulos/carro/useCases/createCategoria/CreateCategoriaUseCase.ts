import { inject, injectable } from "tsyringe";

import { ICategoriasRepository } from "../../repositories/ICategoriasRepository";

interface IRequest {
    nome: string;
    descricao: string;
}

@injectable()
class CreateCategoriaUseCase {
    constructor(
        @inject("CategoriasRepository")
        private categoriasRepository: ICategoriasRepository
    ) { }

    async execute({ nome, descricao }: IRequest): Promise<void> {
        const categoriaAlreadyExists =
            await this.categoriasRepository.findByName(nome);

        if (categoriaAlreadyExists) throw new AppError("Categoria já existe!");

        this.categoriasRepository.create({ nome, descricao });
    }
}

export { CreateCategoriaUseCase };
