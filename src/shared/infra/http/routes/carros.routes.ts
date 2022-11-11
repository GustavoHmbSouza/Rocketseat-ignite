import { Router } from "express";
import uploadConfig from '../../../../config/upload';
import multer from "multer";
import { CreateCarroController } from "../../../../main/useCases/useCaseCarro/createCarro/CreateCarroController";
import { CreateCarroEspecificacaoController } from "../../../../main/useCases/useCaseCarro/CreateCarroEspecificacao/CreateCarroEspecificacaoController";
import { ListAvailableCarrosController } from "../../../../main/useCases/useCaseCarro/ListAvailableCarros/ListAvailableCarrosController";
import { UploadCarroImagemController } from "../../../../main/useCases/useCaseCarro/uploadCarroImagem/UploadCarroImagemController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carrosRoutes = Router();

const createCarroController = new CreateCarroController();
const listAvailableCarrosController = new ListAvailableCarrosController();
const createCarroEspecificacaoController = new CreateCarroEspecificacaoController();
const uploadCarroImagemController = new UploadCarroImagemController();

const upload = multer(uploadConfig.upload("carros"));

carrosRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarroController.handle);

carrosRoutes.get("/available", listAvailableCarrosController.handle);

carrosRoutes.post("/especificacoes/:id", ensureAuthenticated, ensureAdmin, createCarroEspecificacaoController.handle);

carrosRoutes.post("/imagens/:id", ensureAuthenticated, ensureAdmin, upload.array("imagens"), uploadCarroImagemController.handle);

export { carrosRoutes };
