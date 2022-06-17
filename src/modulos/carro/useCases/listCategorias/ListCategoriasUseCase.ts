import { Categoria } from "../../entities/Categoria";
import { ICategoriasRepository } from "../../repositories/ICategoriasRepository";

class ListCategoriasUseCase {
    constructor(private categoriasRepository: ICategoriasRepository) { }

    execute(): Categoria[] {
        const categorias = this.categoriasRepository.list();

        return categorias;
    }
}

export { ListCategoriasUseCase };
