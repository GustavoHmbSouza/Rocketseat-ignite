import { Router } from "express";

import { AuthenticateUsuarioController } from "../modulos/conta/UseCases/authenticateUsuario/AuthenticateUsuarioController";

const authenticateRoutes = Router();

const authenticateUsuarioController = new AuthenticateUsuarioController();

authenticateRoutes.post("/sessions", authenticateUsuarioController.handle);

export { authenticateRoutes };
