import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { UsuariosTokensRepository } from "../../../infra/typeorm/repositories/UsuariosTokensRepository";
import { IUsuarioRepository } from "../../../repositories/IUsuarioRepository";

interface IRequest {
    token: string;
    password: string;
}
@injectable()
class ResetPasswordUsuarioUseCase {
    constructor(
        @inject("UsuariosTokensRepository")
        private usuariosTokensRepository: UsuariosTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("UsuariosRepository")
        private usuarioRepository: IUsuarioRepository
    ) { }

    async execute({ token, password }: IRequest): Promise<void> {
        const usuario_token =
            await this.usuariosTokensRepository.findByRefreshToken(token);

        if (!usuario_token) throw new AppError("Token invalido");

        if (
            this.dateProvider.compareIfBefore(
                usuario_token.data_expiracao,
                this.dateProvider.dateNow()
            )
        )
            throw new AppError("Token expirado!");

        const usuario = await this.usuarioRepository.findById(
            usuario_token.usuario_id
        );

        usuario.senha = await hash(password, 8);

        await this.usuarioRepository.create(usuario);

        await this.usuariosTokensRepository.deleteById(usuario_token.id);
    }
}

export { ResetPasswordUsuarioUseCase };
