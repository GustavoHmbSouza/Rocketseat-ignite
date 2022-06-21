import { Router } from "express";
import { CreateEspecificacaoController } from "../modulos/carro/useCases/createEspecificacao/CreateEspecificacaoController";


const especificacoesRoutes = Router();

const createEspecificacaoController = new CreateEspecificacaoController();

especificacoesRoutes.post("/", createEspecificacaoController.handle);

export { especificacoesRoutes };
