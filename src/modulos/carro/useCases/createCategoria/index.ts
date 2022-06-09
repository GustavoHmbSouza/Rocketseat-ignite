import { CategoriasRepository } from "../../repositories/implementations/CaregoriasRepository";
import { CreateCategoriaController } from "./CreateCategoriaController";
import { CreateCategoriaUseCase } from "./CreateCategoriaUseCase";

const categoriasRepository = CategoriasRepository.getInstance();
const createCategoriaUseCase = new CreateCategoriaUseCase(categoriasRepository);

const createCategoriaController = new CreateCategoriaController(
    createCategoriaUseCase
);

export { createCategoriaController };
