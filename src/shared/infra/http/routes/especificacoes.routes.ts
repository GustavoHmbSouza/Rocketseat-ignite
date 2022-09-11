import { Router } from "express";
import { CreateEspecificacaoController } from "../../../../modulos/carro/useCases/createEspecificacao/CreateEspecificacaoController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const especificacoesRoutes = Router();

const createEspecificacaoController = new CreateEspecificacaoController();

especificacoesRoutes.use(ensureAuthenticated);
especificacoesRoutes.post("/", createEspecificacaoController.handle);

export { especificacoesRoutes };
