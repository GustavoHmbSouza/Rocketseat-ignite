import { Categoria } from "../../infra/typeorm/entities/Categoria";
import { ICategoriasRepository, ICreateCategoryDTO } from "../ICategoriasRepository";

class CategoriasRepositoryEmMemoria implements ICategoriasRepository {
    categorias: Categoria[] = [];

    async findByName(nome: string): Promise<Categoria> {
        const categoria = this.categorias.find((categoria) => categoria.nome == nome);
        return categoria;
    }
    async list(): Promise<Categoria[]> {
        const lista = this.categorias;
        return lista;
    }

    async create({ nome, descricao }: ICreateCategoryDTO): Promise<void> {
        const categoria = new Categoria();

        Object.assign(categoria, {
            nome, descricao
        });

        this.categorias.push(categoria);
    }
}

export { CategoriasRepositoryEmMemoria };