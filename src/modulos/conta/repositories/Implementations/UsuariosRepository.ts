import { getRepository, Repository } from "typeorm";
import { IUsuarioRepository } from "../IUsuarioRepository";
import { Usuario } from "../../entities/Usuario"
import { ICreateUsuarioDTO } from "../../dtos/ICreateUsuarioDTO";

class UsuariosRepository implements IUsuarioRepository {
    private repository: Repository<Usuario>;

    constructor() {
        this.repository = getRepository(Usuario);
    }


    async create({ nome, email, licenca_direcao, senha, avatar, id }: ICreateUsuarioDTO): Promise<void> {
        const usuario = this.repository.create({ nome, email, licenca_direcao, senha, avatar, id });

        await this.repository.save(usuario);
    }

    async findByEmail(email: string): Promise<Usuario> {
        const usuario = await this.repository.findOne({ email })

        return usuario;
    }

    async findById(id: string): Promise<Usuario> {
        const usuario = await this.repository.findOne(id)

        return usuario;
    }
}

export { UsuariosRepository }