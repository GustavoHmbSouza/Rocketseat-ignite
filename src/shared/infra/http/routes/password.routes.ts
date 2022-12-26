import { Router } from "express";
import { EnviarEmailSenhaPerdidaController } from "../../../../main/useCases/UseCaseEmail/EnviarEmailSenhaPerdida/EnviarEmailSenhaPerdidaController";
import { ResetPasswordUsuarioController } from "../../../../main/useCases/useCaseUsuario/resetPasswordUsuario/ResetPasswordUsuarioController";



const passwordRoutes = Router();

const enviarEmailSenhaPerdidaController = new EnviarEmailSenhaPerdidaController();
const resetPasswordUsuarioController = new ResetPasswordUsuarioController();

passwordRoutes.post("/forgot", enviarEmailSenhaPerdidaController.handle);
passwordRoutes.post("/reset", resetPasswordUsuarioController.handle);

export { passwordRoutes };
