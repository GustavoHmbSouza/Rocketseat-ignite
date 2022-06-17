import { getRepository, Repository } from "typeorm";

import { Categoria } from "../../entities/Categoria";
import {
    ICategoriasRepository,
    ICreateCategoryDTO,
} from "../ICategoriasRepository";

class CategoriasRepository implements ICategoriasRepository {
    private repository: Repository<Categoria>;

    constructor() {
        this.repository = getRepository(Categoria);
    }

    async create({ nome, descricao }: ICreateCategoryDTO): Promise<void> {
        const categoria = this.repository.create({
            nome,
            descricao,
        });
        await this.repository.save(categoria);
    }

    async list(): Promise<Categoria[]> {
        const categorias = await this.repository.find();

        return categorias;
    }

    async findByName(nome: string): Promise<Categoria> {
        const cateroria = await this.repository.findOne({ nome });

        return cateroria;
    }
}

export { CategoriasRepository };
