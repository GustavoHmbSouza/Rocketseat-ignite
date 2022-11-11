import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";


@Entity("carro_imagens")
class CarroImagem {

    @PrimaryColumn()
    id: string;

    @Column()
    carro_id: string;

    @Column()
    imagem_nome: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { CarroImagem }