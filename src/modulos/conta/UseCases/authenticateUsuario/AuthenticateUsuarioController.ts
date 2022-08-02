import { container } from "tsyringe";
import { AuthenticateUsuarioUseCase } from "./AuthenticateUsuarioUseCase";
import { Request, Response } from 'express';

class AuthenticateUsuarioController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, senha } = request.body;

        const authenticateUsuarioUseCase = container.resolve(AuthenticateUsuarioUseCase);

        const token = await authenticateUsuarioUseCase.execute({ email, senha })

        return response.json(token);
    }
}

export { AuthenticateUsuarioController }