import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";
import { UsuariosRepository } from "../../repositories/Implementations/UsuariosRepository";


interface IRequest {
    usuario_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUsuarioAvatarUseCase {

    constructor(
        @inject("UsuariosRepository")
        private usuariosRepository: UsuariosRepository
    ) { }

    async execute({ usuario_id, avatar_file }: IRequest): Promise<void> {
        const usuario = await this.usuariosRepository.findById(usuario_id);

        if (usuario.avatar)
            await deleteFile("avatar", usuario.avatar);

        usuario.avatar = avatar_file;

        await this.usuariosRepository.create(usuario)
    }
}

export { UpdateUsuarioAvatarUseCase };