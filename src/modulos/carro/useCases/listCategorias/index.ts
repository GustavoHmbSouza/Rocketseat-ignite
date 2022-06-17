import { CategoriasRepository } from "../../repositories/implementations/CaregoriasRepository";
import { ListCategoriasController } from "./ListCategoriasController";
import { ListCategoriasUseCase } from "./ListCategoriasUseCase";

const categoriasRepository = null;
const listCategoriaUseCase = new ListCategoriasUseCase(categoriasRepository);

const listCategoriaController = new ListCategoriasController(
    listCategoriaUseCase
);

export { listCategoriaController };
