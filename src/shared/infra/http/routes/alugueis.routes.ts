import { Router } from "express";
import { CreateAluguelController } from "../../../../main/useCases/UseCaseAluguel/createAluguel/CreateAluguelController";
import { DevolucaoAluguelController } from "../../../../main/useCases/UseCaseAluguel/devolucaoAluguel/DevolucaoAluguelController";
import { AuthenticateUsuarioController } from "../../../../main/useCases/useCaseUsuario/authenticateUsuario/AuthenticateUsuarioController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const alugueisRoutes = Router();

const createAluguelController = new CreateAluguelController();
const devolucaoAluguelController = new DevolucaoAluguelController();

alugueisRoutes.post("/", ensureAuthenticated, createAluguelController.handle);
alugueisRoutes.post("/devolucao/:id", ensureAuthenticated, devolucaoAluguelController.handle);

export { alugueisRoutes };
