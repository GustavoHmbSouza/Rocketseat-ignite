import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateEspecificacaoController } from "../modulos/carro/useCases/createEspecificacao/CreateEspecificacaoController";


const especificacoesRoutes = Router();

const createEspecificacaoController = new CreateEspecificacaoController();

especificacoesRoutes.use(ensureAuthenticated);
especificacoesRoutes.post("/", createEspecificacaoController.handle);

export { especificacoesRoutes };
