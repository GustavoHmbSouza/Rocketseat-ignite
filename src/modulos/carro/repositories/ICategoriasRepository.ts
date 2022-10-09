import { Categoria } from "../infra/typeorm/entities/Categoria";

interface ICreateCategoryDTO {
    nome: string;
    descricao: string;
}

interface ICategoriasRepository {
    findByName(nome: string): Promise<Categoria>;
    list(): Promise<Categoria[]>;
    create({ nome, descricao }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriasRepository, ICreateCategoryDTO };
