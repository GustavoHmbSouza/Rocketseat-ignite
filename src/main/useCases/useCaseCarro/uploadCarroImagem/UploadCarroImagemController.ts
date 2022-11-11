import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarroImagemUseCase } from './UploadCarroImagemUseCase';

interface IFiles {
    filename: string;
}

class UploadCarroImagemController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const imagens = request.files as IFiles[];

        const uploadCarroImagemUseCase = container.resolve(UploadCarroImagemUseCase);

        const imagens_nome = imagens.map((file) => file.filename)

        await uploadCarroImagemUseCase.execute({ carro_id: id, imagens_nome })

        return response.status(201).send();
    }
}

export { UploadCarroImagemController }