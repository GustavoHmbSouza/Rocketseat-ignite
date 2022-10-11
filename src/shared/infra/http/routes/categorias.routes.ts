import { Router } from "express";
import Multer from "multer";
import { CreateCategoriaController } from "../../../../main/useCases/useCaseCategoria/createCategoria/CreateCategoriaController";
import { ImportCategoriaController } from "../../../../main/useCases/useCaseCategoria/importCategoria/ImportCategoriaController";
import { ListCategoriasController } from "../../../../main/useCases/useCaseCategoria/listCategorias/ListCategoriasController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const categoriasRoutes = Router();

const upload = Multer({ dest: "./tmp" });

const createCategoriaController = new CreateCategoriaController();
const importCategoriaController = new ImportCategoriaController();
const listCategoriaController = new ListCategoriasController();

categoriasRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoriaController.handle);

categoriasRoutes.get("/", listCategoriaController.handle);

categoriasRoutes.post("/import", upload.single("file"), ensureAuthenticated, ensureAdmin, importCategoriaController.handle);

export { categoriasRoutes };
