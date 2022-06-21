import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateCategoriaUseCase } from "./CreateCategoriaUseCase";

class CreateCategoriaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { nome, descricao } = request.body;

        const createCategoriaUseCase = container.resolve(
            CreateCategoriaUseCase
        );

        await createCategoriaUseCase.execute({ nome, descricao });

        return response.status(201).send();
    }
}

export { CreateCategoriaController };
