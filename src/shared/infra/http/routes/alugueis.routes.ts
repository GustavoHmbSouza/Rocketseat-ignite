import { Router } from "express";
import { CreateAluguelController } from "../../../../main/useCases/UseCaseAluguel/createAluguel/CreateAluguelController";
import { AuthenticateUsuarioController } from "../../../../main/useCases/useCaseUsuario/authenticateUsuario/AuthenticateUsuarioController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const alugueisRoutes = Router();

const createAluguelController = new CreateAluguelController();

alugueisRoutes.post("/", ensureAuthenticated, createAluguelController.handle);

export { alugueisRoutes };
