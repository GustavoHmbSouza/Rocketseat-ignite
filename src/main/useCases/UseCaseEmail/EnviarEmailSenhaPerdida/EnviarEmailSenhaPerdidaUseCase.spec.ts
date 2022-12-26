import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementacoes/DayjsDateProvider";
import { MailProviderEmMemoria } from "../../../../shared/container/providers/MailProvider/EmMemoria/MailProviderEmMemoria";
import { AppError } from "../../../../shared/errors/AppError";
import { UsuariosRepositoryEmMemoria } from "../../../repositories/emMemoria/UsuariosRepositoryEmMemoria";
import { UsuariosTokensRepositoryEmMemoria } from "../../../repositories/emMemoria/UsuariosTokensRepositoryEmMemoria";
import { EnviarEmailSenhaPerdidaUseCase } from "./EnviarEmailSenhaPerdidaUseCase";

let usuariosRepositoryEmMemoria: UsuariosRepositoryEmMemoria;
let enviarEmailSenhaPerdidaUseCase: EnviarEmailSenhaPerdidaUseCase;
let dateProvider: DayjsDateProvider;
let usuariosTokensRepositoryEmMemoria: UsuariosTokensRepositoryEmMemoria;
let mailProvider: MailProviderEmMemoria;

describe("Enviar email senha perdida", () => {

    beforeEach(() => {
        usuariosRepositoryEmMemoria = new UsuariosRepositoryEmMemoria();
        dateProvider = new DayjsDateProvider();
        usuariosTokensRepositoryEmMemoria = new UsuariosTokensRepositoryEmMemoria();
        mailProvider = new MailProviderEmMemoria();
        enviarEmailSenhaPerdidaUseCase = new EnviarEmailSenhaPerdidaUseCase(
            usuariosRepositoryEmMemoria,
            usuariosTokensRepositoryEmMemoria,
            dateProvider,
            mailProvider
        );
    })

    it("deve ser possível enviar um email de senha perdida para o usuário", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usuariosRepositoryEmMemoria.create({
            licenca_direcao: "123456",
            email: "gustavo123@gmail.com",
            nome: "Cesar",
            senha: "123",
        });

        await enviarEmailSenhaPerdidaUseCase.execute("gustavo123@gmail.com");

        expect(sendMail).toHaveBeenCalled();
    })

    it("Não deve ser possível enviar um email de senha perdida para o usuário", async () => {
        await expect(
            enviarEmailSenhaPerdidaUseCase.execute("usuarioteste3214@gmail.com")
        ).rejects.toEqual(new AppError("Usuario não existe"));
    })

    it("deve ser possível criar o token do usuario", async () => {
        const tokenGerado = jest.spyOn(usuariosTokensRepositoryEmMemoria, "create");

        await usuariosRepositoryEmMemoria.create({
            licenca_direcao: "4214",
            email: "gustavo567@gmawil.com",
            nome: "Julio",
            senha: "123",
        });

        await enviarEmailSenhaPerdidaUseCase.execute("gustavo567@gmawil.com");

        expect(tokenGerado).toHaveBeenCalled();
    })
})