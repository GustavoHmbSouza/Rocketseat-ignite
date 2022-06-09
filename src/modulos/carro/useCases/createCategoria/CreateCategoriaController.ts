import { Response, Request } from "express";

import { CreateCategoriaUseCase } from "./CreateCategoriaUseCase";

class CreateCategoriaController {
    constructor(private createCategoriaUseCase: CreateCategoriaUseCase) { }

    handle(request: Request, response: Response): Response {
        const { nome, descricao } = request.body;

        this.createCategoriaUseCase.execute({ nome, descricao });

        return response.status(201).send();
    }
}

export { CreateCategoriaController };
