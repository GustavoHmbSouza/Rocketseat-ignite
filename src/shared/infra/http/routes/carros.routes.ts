import { Router } from "express";
import { CreateCarroController } from "../../../../main/useCases/useCaseCarro/createCarro/CreateCarroController";
import { ListAvailableCarrosController } from "../../../../main/useCases/useCaseCarro/ListAvailableCarros/ListAvailableCarrosController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const carrosRoutes = Router();


const createCarroController = new CreateCarroController();
const listAvailableCarrosController = new ListAvailableCarrosController();


carrosRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarroController.handle);

carrosRoutes.get("/available", listAvailableCarrosController.handle);

export { carrosRoutes };
