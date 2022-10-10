import { container } from "tsyringe";
import { CreateCarroUseCase } from "./CreateCarroUseCase";
import { Response, Request } from "express";


class CreateCarroController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { nome, descricao, dia_rate, placa, valor_multa, marca, categoria_id } = request.body;

        const createCategoriaUseCase = container.resolve(
            CreateCarroUseCase
        );

        await createCategoriaUseCase.execute({ nome, descricao, dia_rate, placa, valor_multa, marca, categoria_id });

        return response.status(201).send();
    }
}

export { CreateCarroController }