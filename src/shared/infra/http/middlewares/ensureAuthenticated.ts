import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsuariosRepository } from '../../../../main/infra/typeorm/repositories/UsuariosRepository';
import { AppError } from '../../../errors/AppError';

interface IPayload {
    sub: string;
}
export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader)
        throw new AppError("Token não existe", 401);

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "f757a38a55fb3894cda96a228e5e28f2") as IPayload;

        const usuariosRepository = new UsuariosRepository();

        const usuario = usuariosRepository.findById(user_id);

        if (!usuario)
            throw new AppError("Usuario não existe", 401)

        request.usuario = { id: user_id };

        next();
    } catch {
        throw new AppError("Token invalido", 401);
    }

}