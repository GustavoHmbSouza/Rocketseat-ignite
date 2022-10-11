import { NextFunction, Response, Request } from "express";
import { UsuariosRepository } from "../../../../main/infra/typeorm/repositories/UsuariosRepository";
import { AppError } from "../../../errors/AppError";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.usuario;

    const usuariosRepository = new UsuariosRepository();
    const usuario = await usuariosRepository.findById(id);

    if (!usuario.is_admin) {
        throw new AppError("Usuario não é admin!")
    }

    return next();
}