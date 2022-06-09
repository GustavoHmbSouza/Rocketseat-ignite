import { Request, Response } from "express";

import { CreateEspecificacaoUseCase } from "./CreateEspecificacaoUseCase";

class CreateEspecificacaoController {
    constructor(
        private createEspecificacaoUseCase: CreateEspecificacaoUseCase
    ) { }

    handle(request: Request, response: Response): Response {
        const { nome, descricao } = request.body;

        this.createEspecificacaoUseCase.execute({ nome, descricao });

        return response.status(201).send();
    }
}

export { CreateEspecificacaoController };
