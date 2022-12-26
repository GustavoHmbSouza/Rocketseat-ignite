import { getRepository, Repository } from "typeorm";
import { ICreateUsuariosTokensDTO } from "../../../dtos/ICreateUsuariosTokensDTO";
import { IUsuariosTokensRepository } from "../../../repositories/IUsuariosTokensRepository";
import { UsuariosTokens } from "../entities/UsuariosTokens";


class UsuariosTokensRepository implements IUsuariosTokensRepository {
    private repository: Repository<UsuariosTokens>

    constructor() {
        this.repository = getRepository(UsuariosTokens);
    }

    async create({ usuario_id, data_expiracao, refresh_token }: ICreateUsuariosTokensDTO): Promise<UsuariosTokens> {
        const usuarioToken = this.repository.create({ usuario_id, data_expiracao, refresh_token });

        await this.repository.save(usuarioToken);

        return usuarioToken;
    }

    async findByUsuarioAndRefreshToken(usuario_id: string, refresh_token: string): Promise<UsuariosTokens> {
        const usuariosTokens = await this.repository.findOne({ usuario_id, refresh_token })

        return usuariosTokens;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async findByRefreshToken(refresh_token: string): Promise<UsuariosTokens> {
        const usuariosTokens = await this.repository.findOne({ refresh_token })

        return usuariosTokens;
    }
}

export { UsuariosTokensRepository }