import { Router } from "express";

import { CreateUsuarioController } from "../modulos/conta/UseCases/createUsuario/CreateUsuarioController";

const usuariosRoutes = Router();

const createUsuarioController = new CreateUsuarioController();

usuariosRoutes.post("/", createUsuarioController.handle);



export { usuariosRoutes };
