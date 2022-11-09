import { Router } from "express";
import { CreateCarroController } from "../../../../main/useCases/useCaseCarro/createCarro/CreateCarroController";
import { CreateCarroEspecificacaoController } from "../../../../main/useCases/useCaseCarro/CreateCarroEspecificacao/CreateCarroEspecificacaoController";
import { ListAvailableCarrosController } from "../../../../main/useCases/useCaseCarro/ListAvailableCarros/ListAvailableCarrosController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const carrosRoutes = Router();


const createCarroController = new CreateCarroController();
const listAvailableCarrosController = new ListAvailableCarrosController();
const createCarroEspecificacaoController = new CreateCarroEspecificacaoController();

carrosRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarroController.handle);

carrosRoutes.get("/available", listAvailableCarrosController.handle);

carrosRoutes.post("/especificacoes/:id", ensureAuthenticated, ensureAdmin, createCarroEspecificacaoController.handle);

export { carrosRoutes };
