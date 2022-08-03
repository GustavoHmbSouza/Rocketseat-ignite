import { Router } from "express";

import { CreateUsuarioController } from "../modulos/conta/UseCases/createUsuario/CreateUsuarioController";
import { UpdateUsuarioAvatarController } from "../modulos/conta/UseCases/updateUsuarioAvatar/UpdateUsuarioAvatarController";
import uploadConfig from '../config/upload';
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usuariosRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("avatar"));

const createUsuarioController = new CreateUsuarioController();
const updateUsuarioAvatarController = new UpdateUsuarioAvatarController();

usuariosRoutes.post("/", createUsuarioController.handle);
usuariosRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUsuarioAvatarController.handle);


export { usuariosRoutes };
