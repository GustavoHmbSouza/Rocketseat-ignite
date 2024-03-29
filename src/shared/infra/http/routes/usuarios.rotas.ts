import { Router } from "express";

import uploadConfig from '../../../../config/upload';
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUsuarioController } from "../../../../main/useCases/useCaseUsuario/createUsuario/CreateUsuarioController";
import { UpdateUsuarioAvatarController } from "../../../../main/useCases/useCaseUsuario/updateUsuarioAvatar/UpdateUsuarioAvatarController";

const usuariosRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("avatar"));

const createUsuarioController = new CreateUsuarioController();
const updateUsuarioAvatarController = new UpdateUsuarioAvatarController();

usuariosRoutes.post("/", createUsuarioController.handle);
usuariosRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUsuarioAvatarController.handle);


export { usuariosRoutes };
