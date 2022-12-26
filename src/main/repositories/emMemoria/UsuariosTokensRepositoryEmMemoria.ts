import { ICreateUsuariosTokensDTO } from "../../dtos/ICreateUsuariosTokensDTO";
import { UsuariosTokens } from "../../infra/typeorm/entities/UsuariosTokens";
import { IUsuariosTokensRepository } from "../IUsuariosTokensRepository";


class UsuariosTokensRepositoryEmMemoria implements IUsuariosTokensRepository {

    usuariosTokens: UsuariosTokens[] = [];

    async create({ usuario_id, data_expiracao, refresh_token }: ICreateUsuariosTokensDTO): Promise<UsuariosTokens> {
        const usuarioToken = new UsuariosTokens();

        Object.assign(usuarioToken, { usuario_id, data_expiracao, refresh_token });

        this.usuariosTokens.push(usuarioToken);

        return usuarioToken;
    }
    async findByUsuarioAndRefreshToken(usuario_id: string, refresh_token: string): Promise<UsuariosTokens> {
        return this.usuariosTokens.find((ut) => ut.usuario_id === usuario_id && ut.refresh_token === refresh_token)
    }
    async deleteById(id: string): Promise<void> {
        const usuarioToken = this.usuariosTokens.find((ut) => ut.id === id);
        this.usuariosTokens.splice(this.usuariosTokens.indexOf(usuarioToken))
    }
    async findByRefreshToken(refresh_token: string): Promise<UsuariosTokens> {
        return this.usuariosTokens.find((ut) => ut.refresh_token === refresh_token)
    }

}

export { UsuariosTokensRepositoryEmMemoria }