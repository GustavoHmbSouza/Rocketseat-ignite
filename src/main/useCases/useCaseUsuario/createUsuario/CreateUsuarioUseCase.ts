import { inject, injectable } from "tsyringe";
import { ICreateUsuarioDTO } from "../../../dtos/ICreateUsuarioDTO";
import { IUsuarioRepository } from "../../../repositories/IUsuarioRepository";
import { hash } from 'bcryptjs'
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class CreateUsuarioUseCase {
    constructor(
        @inject("UsuariosRepository")
        private usuarioRepository: IUsuarioRepository
    ) { }

    async execute({ nome, email, licenca_direcao, senha }: ICreateUsuarioDTO): Promise<void> {

        const usuarioAlreadyExists = await this.usuarioRepository.findByEmail(email);

        if (usuarioAlreadyExists)
            throw new AppError("Usuario já existe!")

        const hashsenha = await hash(senha, 8);

        await this.usuarioRepository.create({ nome, email, licenca_direcao, senha: hashsenha })
    }
}

export { CreateUsuarioUseCase }