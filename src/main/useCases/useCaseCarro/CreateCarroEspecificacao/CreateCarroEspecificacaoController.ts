import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarroEspecificacaoUseCase } from './CreateCarroEspecificacaoUseCase';

class CreateCarroEspecificacaoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { especificacoes_id } = request.body;

        const createCarroEspecificacaoUseCase = container.resolve(CreateCarroEspecificacaoUseCase);

        const carros = await createCarroEspecificacaoUseCase.execute({ carro_id: id, especificacoes_id })

        return response.json(carros);
    }
}

export { CreateCarroEspecificacaoController }