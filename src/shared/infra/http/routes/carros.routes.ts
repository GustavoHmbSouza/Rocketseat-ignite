import { Router } from "express";
import { CreateCarroController } from "../../../../main/useCases/useCaseCarro/createCarro/CreateCarroController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const carrosRoutes = Router();


const createCarroController = new CreateCarroController();


carrosRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarroController.handle);

export { carrosRoutes };
