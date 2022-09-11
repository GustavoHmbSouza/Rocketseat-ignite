import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("especificacoes")
class Especificacao {

    @PrimaryColumn()
    id?: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) this.id = uuidv4();
    }
}

export { Especificacao };
