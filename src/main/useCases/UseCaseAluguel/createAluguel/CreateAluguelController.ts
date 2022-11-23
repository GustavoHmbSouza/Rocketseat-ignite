import { Request, Response } from 'express';
import { CreateAluguelUseCase } from './CreateAluguelUseCase';
import { container } from 'tsyringe';


class CreateAluguelController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { carro_id, tempo_previsto_retorno } = request.body;
        const { id } = request.usuario;

        const createAluguelUseCase = container.resolve(CreateAluguelUseCase);

        const aluguel = await createAluguelUseCase.execute({
            carro_id,
            tempo_previsto_retorno,
            usuario_id: id
        })

        return response.status(201).json(aluguel);
    }
}

export { CreateAluguelController }