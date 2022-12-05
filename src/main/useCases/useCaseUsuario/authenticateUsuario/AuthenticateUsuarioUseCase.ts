import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { UsuariosTokensRepository } from "../../../infra/typeorm/repositories/UsuariosTokensRepository";
import { IUsuarioRepository } from "../../../repositories/IUsuarioRepository";

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
    refresh_token: string;
}

@injectable()
class AuthenticateUsuarioUseCase {
    constructor(
        @inject("UsuariosRepository")
        private usuarioRepository: IUsuarioRepository,

        @inject("UsuariosTokensRepository")
        private usuariosTokensRepository: UsuariosTokensRepository,


        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ email, senha }: IRequest): Promise<IResponse> {
        const usuario = await this.usuarioRepository.findByEmail(email);
        const { expires_in_token, secret_token, secret_refresh_token, expires_in_refresh_token, expires_refresh_token_days } = auth;

        if (!usuario) {
            throw new AppError("Email ou senha incorretos");
        }

        const senhaMatch = await compare(senha, usuario.senha);

        if (!senhaMatch) {
            throw new AppError("Email ou senha incorretos");
        }

        const token = sign({}, secret_token, {
            subject: usuario.id,
            expiresIn: expires_in_token
        });

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: usuario.id,
            expiresIn: expires_in_refresh_token
        })

        const refresh_token_expires_days = this.dateProvider.addDays(expires_refresh_token_days);

        await this.usuariosTokensRepository.create({
            usuario_id: usuario.id,
            data_expiracao: refresh_token_expires_days,
            refresh_token
        })

        return {
            usuario: {
                nome: usuario.nome,
                email: usuario.email
            },
            token,
            refresh_token
        }
    }
}

export { AuthenticateUsuarioUseCase }