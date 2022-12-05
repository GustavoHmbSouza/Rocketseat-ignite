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

}

export { UsuariosTokensRepository }