import { AppError } from "../../../../shared/errors/AppError";
import { CategoriasRepositoryEmMemoria } from "../../../repositories/emMemoria/CategoriasRepositoryEmMemoria";
import { CreateCategoriaUseCase } from "./CreateCategoriaUseCase";

let categoriasRepositoryEmMemoria: CategoriasRepositoryEmMemoria;
let createCategoriaUseCase: CreateCategoriaUseCase;

describe("Criar categoria", () => {
    beforeEach(() => {
        categoriasRepositoryEmMemoria = new CategoriasRepositoryEmMemoria();
        createCategoriaUseCase = new CreateCategoriaUseCase(categoriasRepositoryEmMemoria);
    });

    it("Deve criar uma nova categoria", async () => {
        const categoria = {
            nome: "Categoria Teste",
            descricao: "Descricao da categoria de teste"
        };

        await createCategoriaUseCase.execute(categoria);

        const categoriaExiste = await categoriasRepositoryEmMemoria.findByName(categoria.nome);

        expect(categoriaExiste).toHaveProperty("id");
    });

    it("Não deve criar uma nova categoria por já existir uma", async () => {
        expect(async () => {
            const categoria = {
                nome: "Categoria Teste",
                descricao: "Descricao da categoria de teste"
            };

            await createCategoriaUseCase.execute(categoria);

            await createCategoriaUseCase.execute(categoria);
        }).rejects.toBeInstanceOf(AppError);
    });
})