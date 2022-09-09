import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsuarioRepository } from "../../repositories/IUsuarioRepository";

interface IRequest {
    email: string;
    senha: string;
}

interface IResponse {
    usuario: {
        nome: string;
        email: string
    };
    token: string;
}

@injectable()
class AuthenticateUsuarioUseCase {
    constructor(
        @inject("UsuariosRepository")
        private usuarioRepository: IUsuarioRepository
    ) { }

    async execute({ email, senha }: IRequest): Promise<IResponse> {
        const usuario = await this.usuarioRepository.findByEmail(email);

        if (!usuario) {
            throw new AppError("Email ou senha incorretos");
        }

        const senhaMatch = await compare(senha, usuario.senha);

        if (!senhaMatch) {
            throw new AppError("Email ou senha incorretos");
        }

        const token = sign({}, "f757a38a55fb3894cda96a228e5e28f2", {
            subject: usuario.id,
            expiresIn: "1d"
        })

        return {
            usuario: {
                nome: usuario.nome,
                email: usuario.email
            }, token
        }
    }
}

export { AuthenticateUsuarioUseCase }