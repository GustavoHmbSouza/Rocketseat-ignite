import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid'
import { Usuario } from './Usuario';

@Entity("usuarios_tokens")
class UsuariosTokens {

    @PrimaryColumn()
    id: string;

    @Column()
    refresh_token: string;

    @Column()
    usuario_id: string;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "usuario_id" })
    carro: Usuario;

    @Column()
    data_expiracao: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { UsuariosTokens }