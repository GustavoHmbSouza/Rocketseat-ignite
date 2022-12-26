import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsuarioRepository } from "../../../repositories/IUsuarioRepository";
import { v4 as uuidV4 } from 'uuid';
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { resolve } from "path";
import { useContainer } from "typeorm";
import { IUsuariosTokensRepository } from "../../../repositories/IUsuariosTokensRepository";

@injectable()
class EnviarEmailSenhaPerdidaUseCase {
    constructor(
        @inject("UsuariosRepository")
        private usuarioRepository: IUsuarioRepository,

        @inject("UsuariosTokensRepository")
        private usuariosTokensRepository: IUsuariosTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) { }

    async execute(email: string): Promise<void> {
        const usuario = await this.usuarioRepository.findByEmail(email);

        const templatePath = resolve(__dirname, "..", "..", "..", "views", "emails", "SenhaPerdida.hbs")

        if (!usuario)
            throw new AppError("Usuario não existe")


        const token = uuidV4();

        const data_expiracao = this.dateProvider.addHours(3);

        await this.usuariosTokensRepository.create({
            refresh_token: token,
            usuario_id: usuario.id,
            data_expiracao
        });

        const variables = {
            nome: usuario.nome,
            link: `${process.env.SENHA_PERDIDA_EMAIL_URL}${token}`,
        }

        await this.mailProvider.sendMail(email, "Recuperação de senha", variables, templatePath)
    }
}

export { EnviarEmailSenhaPerdidaUseCase }