import { inject, injectable } from "tsyringe";
import { ICreateUsuarioDTO } from "../../dtos/ICreateUsuarioDTO";
import { IUsuarioRepository } from "../../repositories/IUsuarioRepository";
import { hash } from 'bcryptjs'

@injectable()
class CreateUsuarioUseCase {
    constructor(
        @inject("UsuariosRepository")
        private usuarioRepository: IUsuarioRepository
    ) { }

    async execute({ nome, email, licenca_direcao, senha }: ICreateUsuarioDTO): Promise<void> {

        const usuarioAlreadyExists = this.usuarioRepository.findByEmail(email);

        if (usuarioAlreadyExists)
            throw new Error("Usuario já existe!")

        const hashsenha = await hash(senha, 8);

        await this.usuarioRepository.create({ nome, email, licenca_direcao, senha: hashsenha })
    }
}

export { CreateUsuarioUseCase }