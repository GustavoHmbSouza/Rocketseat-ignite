import { ICreateUsuariosTokensDTO } from "../dtos/ICreateUsuariosTokensDTO";
import { UsuariosTokens } from "../infra/typeorm/entities/UsuariosTokens";


interface IUsuariosTokensRepository {
    create({ usuario_id, data_expiracao, refresh_token }: ICreateUsuariosTokensDTO): Promise<UsuariosTokens>;

    findByUsuarioAndRefreshToken(usuario_id: string, refresh_token: string): Promise<UsuariosTokens>

    deleteById(id: string): Promise<void>
}

export { IUsuariosTokensRepository }