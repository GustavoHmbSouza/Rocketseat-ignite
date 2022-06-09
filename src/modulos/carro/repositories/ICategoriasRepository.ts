import { Categoria } from "../model/Categoria";

interface ICreateCategoryDTO {
    nome: string;
    descricao: string;
}

interface ICategoriasRepository {
    findByName(nome: string): Categoria;
    list(): Categoria[];
    create({ nome, descricao }: ICreateCategoryDTO): void;
}

export { ICategoriasRepository, ICreateCategoryDTO };
