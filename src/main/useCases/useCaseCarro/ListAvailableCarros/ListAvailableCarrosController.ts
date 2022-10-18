import { Response, Request } from "express";
import { container } from "tsyringe";
import { ListAvailableCarrosUseCase } from "./ListAvailableCarrosUseCase";


class ListAvailableCarrosController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { placa, nome, categoria_id } = request.query;

        console.log(placa);
        console.log(nome);
        console.log(categoria_id);

        const listAvailableCarrosUseCase = container.resolve(ListAvailableCarrosUseCase);

        const carros = await listAvailableCarrosUseCase.execute(
            { placa: placa as string, nome: nome as string, categoria_id: categoria_id as string })

        return response.json(carros);
    }
}

export { ListAvailableCarrosController }