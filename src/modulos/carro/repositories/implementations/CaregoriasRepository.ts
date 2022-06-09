import { Categoria } from "../../model/Categoria";
import {
    ICategoriasRepository,
    ICreateCategoryDTO,
} from "../ICategoriasRepository";

class CategoriasRepository implements ICategoriasRepository {
    private categorias: Categoria[];

    private static INSTANCE: CategoriasRepository;

    private constructor() {
        this.categorias = [];
    }

    public static getInstance(): CategoriasRepository {
        if (!this.INSTANCE) this.INSTANCE = new CategoriasRepository();

        return this.INSTANCE;
    }

    create({ nome, descricao }: ICreateCategoryDTO): void {
        const categoria: Categoria = new Categoria();

        Object.assign(categoria, {
            nome,
            descricao,
            created_at: new Date(),
        });

        this.categorias.push(categoria);
    }

    list(): Categoria[] {
        return this.categorias;
    }

    findByName(nome: string): Categoria {
        const cateroria = this.categorias.find(
            (categoria) => categoria.nome === nome
        );

        return cateroria;
    }
}

export { CategoriasRepository };
