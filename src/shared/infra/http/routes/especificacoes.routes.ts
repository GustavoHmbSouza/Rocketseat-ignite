import { Router } from "express";
import { CreateEspecificacaoController } from "../../../../main/useCases/useCaseEspecificacao/createEspecificacao/CreateEspecificacaoController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const especificacoesRoutes = Router();

const createEspecificacaoController = new CreateEspecificacaoController();

especificacoesRoutes.post("/", ensureAuthenticated, ensureAdmin, createEspecificacaoController.handle);

export { especificacoesRoutes };
