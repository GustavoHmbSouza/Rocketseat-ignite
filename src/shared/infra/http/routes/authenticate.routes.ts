import { Router } from "express";
import { AuthenticateUsuarioController } from "../../../../main/useCases/useCaseUsuario/authenticateUsuario/AuthenticateUsuarioController";
import { RefreshTokenController } from "../../../../main/useCases/useCaseUsuario/refreshToken/RefreshTokenController";


const authenticateRoutes = Router();

const authenticateUsuarioController = new AuthenticateUsuarioController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUsuarioController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
