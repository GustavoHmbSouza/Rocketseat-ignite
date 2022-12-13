import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { UsuariosTokensRepository } from "../../../infra/typeorm/repositories/UsuariosTokensRepository";

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsuariosTokensRepository")
        private usuariosTokensRepository: UsuariosTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute(token: string): Promise<string> {
        const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

        const usuario_id = sub;

        const usuario_token = await this.usuariosTokensRepository.findByUsuarioAndRefreshToken(usuario_id, token);

        if (!usuario_token)
            throw new AppError("Refresh token não existe!")

        await this.usuariosTokensRepository.deleteById(usuario_token.id);

        const refresh_token_expires_days = this.dateProvider.addDays(auth.expires_refresh_token_days);

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token
        })

        await this.usuariosTokensRepository.create({
            data_expiracao: refresh_token_expires_days,
            refresh_token,
            usuario_id
        })

        return refresh_token;
    }
}

export { RefreshTokenUseCase }  
