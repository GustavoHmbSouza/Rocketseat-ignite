import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUsuarioUseCase } from "./ResetPasswordUsuarioUseCase";

class ResetPasswordUsuarioController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;

        const resetPasswordUseCase = container.resolve(
            ResetPasswordUsuarioUseCase
        );

        resetPasswordUseCase.execute({ token: String(token), password });

        return response.send();
    }
}

export { ResetPasswordUsuarioController };
