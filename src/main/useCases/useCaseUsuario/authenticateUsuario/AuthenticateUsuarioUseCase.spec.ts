import { AppError } from "../../../../shared/errors/AppError";
import { UsuariosRepositoryEmMemoria } from "../../../repositories/emMemoria/UsuariosRepositoryEmMemoria";
import { UsuariosTokensRepositoryEmMemoria } from "../../../repositories/emMemoria/UsuariosTokensRepositoryEmMemoria";
import { ICreateUsuarioDTO } from "../../../dtos/ICreateUsuarioDTO";
import { AuthenticateUsuarioUseCase } from "./AuthenticateUsuarioUseCase";
import { CreateUsuarioUseCase } from "../createUsuario/CreateUsuarioUseCase";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementacoes/DayjsDateProvider";


let usuariosRepositoryEmMemoria: UsuariosRepositoryEmMemoria;
let usuariosTokensRepositoryEmMemoria: UsuariosTokensRepositoryEmMemoria;
let authenticateUsuarioUseCase: AuthenticateUsuarioUseCase;
let createUsuarioUseCase: CreateUsuarioUseCase;
let dateProvider: DayjsDateProvider;

describe("Autenticacao do Usuario", () => {
    beforeEach(() => {
        usuariosRepositoryEmMemoria = new UsuariosRepositoryEmMemoria();
        usuariosTokensRepositoryEmMemoria = new UsuariosTokensRepositoryEmMemoria();
        dateProvider = new DayjsDateProvider();
        authenticateUsuarioUseCase = new AuthenticateUsuarioUseCase(usuariosRepositoryEmMemoria, usuariosTokensRepositoryEmMemoria, dateProvider);
        createUsuarioUseCase = new CreateUsuarioUseCase(usuariosRepositoryEmMemoria);
    })

    it("Deve ser possível autenticar um usuário", async () => {
        const usuario: ICreateUsuarioDTO = {
            licenca_direcao: "000123",
            email: "usuario@teste.com",
            senha: "1234",
            nome: "teste"
        };

        await createUsuarioUseCase.execute(usuario);

        const result = await authenticateUsuarioUseCase.execute({
            email: usuario.email,
            senha: usuario.senha
        })

        expect(result).toHaveProperty("token");
    })

    it("Não deve ser possivel autenticar um usuario por ele não existir", () => {
        expect(async () => {
            await authenticateUsuarioUseCase.execute({
                email: "false@email.com",
                senha: "1234"
            })
        }).rejects.toBeInstanceOf(AppError);
    })

    it("Não deve ser possivel autenticar um usuario por ele não existir", () => {
        expect(async () => {
            const usuario: ICreateUsuarioDTO = {
                licenca_direcao: "000123",
                email: "usuario@teste.com",
                senha: "1234",
                nome: "teste"
            };

            await createUsuarioUseCase.execute(usuario);

            const result = await authenticateUsuarioUseCase.execute({
                email: usuario.email,
                senha: "4321"
            })

            expect(result).toHaveProperty("token");
        }).rejects.toBeInstanceOf(AppError);
    })
})