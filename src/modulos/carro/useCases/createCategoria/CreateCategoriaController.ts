import { Response, Request } from "express";

import { CreateCategoriaUseCase } from "./CreateCategoriaUseCase";

class CreateCategoriaController {
    constructor(private createCategoriaUseCase: CreateCategoriaUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { nome, descricao } = request.body;

        await this.createCategoriaUseCase.execute({ nome, descricao });

        return response.status(201).send();
    }
}

export { CreateCategoriaController };
