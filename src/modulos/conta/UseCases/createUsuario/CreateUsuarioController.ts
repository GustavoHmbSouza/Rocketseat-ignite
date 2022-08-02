import { container } from "tsyringe";
import { CreateUsuarioUseCase } from "./CreateUsuarioUseCase"
import { Request, Response } from 'express'


class CreateUsuarioController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { nome, email, licenca_direcao, senha } = request.body;
        const createUsuarioUseCase = container.resolve(CreateUsuarioUseCase);

        await createUsuarioUseCase.execute({ nome, email, licenca_direcao, senha });

        return response.status(201).send();
    }
}

export { CreateUsuarioController }