import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateEspecificacaoUseCase } from "./CreateEspecificacaoUseCase";

class CreateEspecificacaoController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { nome, descricao } = request.body;

        const createEspecificacaoUseCase = container.resolve(CreateEspecificacaoUseCase);

        await createEspecificacaoUseCase.execute({ nome, descricao });

        return response.status(201).send();
    }
}

export { CreateEspecificacaoController };
