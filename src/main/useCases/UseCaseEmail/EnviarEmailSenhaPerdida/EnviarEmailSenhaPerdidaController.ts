import { Request, Response } from "express";
import { container } from "tsyringe";
import { EnviarEmailSenhaPerdidaUseCase } from "./EnviarEmailSenhaPerdidaUseCase";

class EnviarEmailSenhaPerdidaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const enviarEmailSenhaPerdidaUseCase = container.resolve(EnviarEmailSenhaPerdidaUseCase);

        await enviarEmailSenhaPerdidaUseCase.execute(email);
        return response.send();
    }
}

export { EnviarEmailSenhaPerdidaController }