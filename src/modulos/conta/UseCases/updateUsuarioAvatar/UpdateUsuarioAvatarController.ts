import { Request, Response } from 'express'
import { container } from 'tsyringe';

import { UpdateUsuarioAvatarUseCase } from './UpdateUsuarioAvatarUseCase';

class UpdateUsuarioAvatarController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.usuario;
        const avatar_file = request.file.filename;

        const updateUsuarioAvatarUseCase = container.resolve(UpdateUsuarioAvatarUseCase)

        await updateUsuarioAvatarUseCase.execute({ usuario_id: id, avatar_file });

        return response.status(204).send();
    }

}

export { UpdateUsuarioAvatarController };