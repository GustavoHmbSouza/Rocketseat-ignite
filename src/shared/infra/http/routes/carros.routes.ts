import { Router } from "express";
import { CreateCarroController } from "../../../../modulos/carro/useCases/createCarro/CreateCarroController";


const carrosRoutes = Router();


const createCarroController = new CreateCarroController();


carrosRoutes.post("/", createCarroController.handle);

export { carrosRoutes };
