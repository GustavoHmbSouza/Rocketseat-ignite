import { ICategoriasRepository } from "../../repositories/ICategoriasRepository";

interface IRequest {
    nome: string;
    descricao: string;
}
class CreateCategoriaUseCase {
    constructor(private categoriasRepository: ICategoriasRepository) { }

    execute({ nome, descricao }: IRequest): void {
        console.log("teste Create");
        const categoriaAlreadyExists =
            this.categoriasRepository.findByName(nome);

        if (categoriaAlreadyExists) throw new Error("Categoria já existe!");

        this.categoriasRepository.create({ nome, descricao });
    }
}

export { CreateCategoriaUseCase };
