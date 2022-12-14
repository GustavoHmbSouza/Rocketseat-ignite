import { Router } from "express";
import { EnviarEmailSenhaPerdidaController } from "../../../../main/useCases/UseCaseEmail/EnviarEmailSenhaPerdida/EnviarEmailSenhaPerdidaController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const passwordRoutes = Router();

const enviarEmailSenhaPerdidaController = new EnviarEmailSenhaPerdidaController();

passwordRoutes.post("/forgot", enviarEmailSenhaPerdidaController.handle);

export { passwordRoutes };
