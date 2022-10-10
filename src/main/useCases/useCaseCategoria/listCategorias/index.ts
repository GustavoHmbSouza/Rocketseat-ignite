import { CategoriasRepository } from "../../infra/typeorm/repositories/CaregoriasRepository";
import { ListCategoriasController } from "./ListCategoriasController";
import { ListCategoriasUseCase } from "./ListCategoriasUseCase";

const categoriasRepository = null;
const listCategoriaUseCase = new ListCategoriasUseCase(categoriasRepository);

const listCategoriaController = new ListCategoriasController(

);

export { listCategoriaController };