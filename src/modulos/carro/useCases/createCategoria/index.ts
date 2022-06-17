import { CategoriasRepository } from "../../repositories/implementations/CaregoriasRepository";
import { CreateCategoriaController } from "./CreateCategoriaController";
import { CreateCategoriaUseCase } from "./CreateCategoriaUseCase";

export default (): CreateCategoriaController => {
    const categoriasRepository = new CategoriasRepository();

    const createCategoriaUseCase = new CreateCategoriaUseCase(
        categoriasRepository
    );

    const createCategoriaController = new CreateCategoriaController(
        createCategoriaUseCase
    );

    return createCategoriaController;
};
