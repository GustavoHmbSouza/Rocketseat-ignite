import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAluguelPorUsuarioUseCase } from "./ListAluguelPorUsuarioUseCase";


class ListAluguelPorUsuarioController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.usuario;

        const devolucaoAluguelUseCase = container.resolve(ListAluguelPorUsuarioUseCase);

        const alugueis = await devolucaoAluguelUseCase.execute(id);

        return response.status(200).json(alugueis);
    }
}

export { ListAluguelPorUsuarioController }