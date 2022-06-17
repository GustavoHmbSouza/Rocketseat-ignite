import { CategoriasRepository } from "../../repositories/implementations/CaregoriasRepository";
import { ImportCategoriaController } from "./ImportCategoriaController";
import { ImportCategoriaUseCase } from "./ImportCategoriaUseCase";

const categoriasRepository = null;
const importCategoriaUseCase = new ImportCategoriaUseCase(categoriasRepository);
const importCategoriaController = new ImportCategoriaController(
    importCategoriaUseCase
);

export { importCategoriaController };
