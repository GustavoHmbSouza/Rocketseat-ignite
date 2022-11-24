import { Router } from "express";
import { CreateAluguelController } from "../../../../main/useCases/UseCaseAluguel/createAluguel/CreateAluguelController";
import { DevolucaoAluguelController } from "../../../../main/useCases/UseCaseAluguel/devolucaoAluguel/DevolucaoAluguelController";
import { ListAluguelPorUsuarioController } from "../../../../main/useCases/UseCaseAluguel/listAluguelPorUsuario/ListAluguelPorUsuarioController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const alugueisRoutes = Router();

const createAluguelController = new CreateAluguelController();
const devolucaoAluguelController = new DevolucaoAluguelController();
const listAluguelPorUsuarioController = new ListAluguelPorUsuarioController();

alugueisRoutes.post("/", ensureAuthenticated, createAluguelController.handle);

alugueisRoutes.post("/devolucao/:id", ensureAuthenticated, devolucaoAluguelController.handle);

alugueisRoutes.get("/usuario", ensureAuthenticated, listAluguelPorUsuarioController.handle);

export { alugueisRoutes };
