import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsuariosRepository } from '../modulos/conta/repositories/Implementations/UsuariosRepository';

interface IPayload {
    sub: string;
}
export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader)
        throw new Error("Token não existe");

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "f757a38a55fb3894cda96a228e5e28f2") as IPayload;

        const usuariosRepository = new UsuariosRepository();

        const usuario = usuariosRepository.findById(user_id);

        if (!usuario)
            throw new Error("Usuario não existe")

        next();
    } catch {
        throw new Error("Token invalido");
    }

}