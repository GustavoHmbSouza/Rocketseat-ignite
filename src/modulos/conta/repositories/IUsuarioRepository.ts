import { ICreateUsuarioDTO } from "../dtos/ICreateUsuarioDTO";
import { Usuario } from "../entities/Usuario";


interface IUsuarioRepository {

    create(data: ICreateUsuarioDTO): Promise<void>;
    findByEmail(email: string): Promise<Usuario>;
    findById(id: string): Promise<Usuario>;
}

export { IUsuarioRepository }