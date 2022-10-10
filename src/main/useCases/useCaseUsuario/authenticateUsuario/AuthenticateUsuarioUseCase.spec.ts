import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUsuarioDTO } from "../../../dtos/ICreateUsuarioDTO";
import { UsuariosRepositoryEmMemoria } from "../../../repositories/emMemoria/UsuariosRepositoryEmMemoria";
import { CreateUsuarioUseCase } from "../createUsuario/CreateUsuarioUseCase";
import { AuthenticateUsuarioUseCase } from "./AuthenticateUsuarioUseCase";

let authenticateUsuarioUseCase: AuthenticateUsuarioUseCase;
let usuariosRepositoryEmMemoria: UsuariosRepositoryEmMemoria;
let createUsuarioUseCase: CreateUsuarioUseCase;

describe("Autenticacao do Usuario", () => {
    beforeEach(() => {
        usuariosRepositoryEmMemoria = new UsuariosRepositoryEmMemoria();
        authenticateUsuarioUseCase = new AuthenticateUsuarioUseCase(usuariosRepositoryEmMemoria);
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