import { Router } from "express";
import { AuthenticateUsuarioController } from "../../../../main/useCases/useCaseUsuario/authenticateUsuario/AuthenticateUsuarioController";


const authenticateRoutes = Router();

const authenticateUsuarioController = new AuthenticateUsuarioController();

authenticateRoutes.post("/sessions", authenticateUsuarioController.handle);

export { authenticateRoutes };
