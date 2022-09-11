import { Router } from "express";
import Multer from "multer";
import { CreateCategoriaController } from "../../../../modulos/carro/useCases/createCategoria/CreateCategoriaController";
import { ImportCategoriaController } from "../../../../modulos/carro/useCases/importCategoria/ImportCategoriaController";
import { ListCategoriasController } from "../../../../modulos/carro/useCases/listCategorias/ListCategoriasController";


const categoriasRoutes = Router();

const upload = Multer({ dest: "./tmp" });

const createCategoriaController = new CreateCategoriaController();
const importCategoriaController = new ImportCategoriaController();
const listCategoriaController = new ListCategoriasController();

categoriasRoutes.post("/", createCategoriaController.handle);

categoriasRoutes.get("/", listCategoriaController.handle);

categoriasRoutes.post("/import", upload.single("file"), importCategoriaController.handle);

export { categoriasRoutes };
