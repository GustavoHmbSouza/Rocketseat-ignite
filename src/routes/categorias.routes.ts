import { Router } from "express";
import Multer from "multer";

import createCategoriaController from "../modulos/carro/useCases/createCategoria";
import { importCategoriaController } from "../modulos/carro/useCases/importCategoria";
import { listCategoriaController } from "../modulos/carro/useCases/listCategorias";

const categoriasRoutes = Router();

const upload = Multer({ dest: "./tmp" });

categoriasRoutes.post("/", (request, response) => {
    return createCategoriaController().handle(request, response);
});

categoriasRoutes.get("/", (request, response) => {
    return listCategoriaController.handle(request, response);
});

categoriasRoutes.post("/import", upload.single("file"), (request, response) => {
    return importCategoriaController.handle(request, response);
});

export { categoriasRoutes };
