import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DevolucaoAluguelUseCase } from './DevolucaoAluguelUseCase';


class DevolucaoAluguelController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: usuario_id } = request.usuario;
        const { id } = request.params;
        const devolucaoAluguelUseCase = container.resolve(DevolucaoAluguelUseCase);

        const aluguel = await devolucaoAluguelUseCase.execute({
            id, usuario_id
        });

        return response.status(200).json(aluguel);
    }
}

export { DevolucaoAluguelController }