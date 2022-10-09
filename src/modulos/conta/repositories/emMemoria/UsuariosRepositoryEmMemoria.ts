import { ICreateUsuarioDTO } from "../../dtos/ICreateUsuarioDTO";
import { Usuario } from "../../infra/typeorm/entities/Usuario";
import { IUsuarioRepository } from "../IUsuarioRepository";

class UsuariosRepositoryEmMemoria implements IUsuarioRepository {

    usuarios: Usuario[] = [];

    async create({ licenca_direcao, email, nome, senha }: ICreateUsuarioDTO): Promise<void> {
        const usuario = new Usuario();

        Object.assign(usuario, { licenca_direcao, email, nome, senha });

        this.usuarios.push(usuario);

    }
    async findByEmail(email: string): Promise<Usuario> {
        return this.usuarios.find((usuario) => usuario.email == email)
    }
    async findById(id: string): Promise<Usuario> {
        return this.usuarios.find((usuario) => usuario.id == id)
    }

}

export { UsuariosRepositoryEmMemoria };