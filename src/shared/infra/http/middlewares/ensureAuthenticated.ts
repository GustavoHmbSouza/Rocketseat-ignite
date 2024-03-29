import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../../../config/auth';
import { UsuariosRepository } from '../../../../main/infra/typeorm/repositories/UsuariosRepository';
import { UsuariosTokensRepository } from '../../../../main/infra/typeorm/repositories/UsuariosTokensRepository';
import { AppError } from '../../../errors/AppError';

interface IPayload {
    sub: string;
}
export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    const usuariosTokensRepository = new UsuariosTokensRepository;

    if (!authHeader)
        throw new AppError("Token não existe", 401);

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload;

        const usuario = await usuariosTokensRepository.findByUsuarioAndRefreshToken(user_id, token);
        if (!usuario)
            throw new AppError("Usuario não existe", 401)

        request.usuario = { id: user_id };

        next();
    } catch {
        throw new AppError("Token invalido", 401);
    }

}