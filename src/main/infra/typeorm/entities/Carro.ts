import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid'
import { Categoria } from './Categoria';

@Entity("carros")
class Carro {

    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column()
    dia_rate: number;

    @Column()
    available: boolean;

    @Column()
    placa: string;

    @Column()
    valor_multa: number;

    @Column()
    marca: string;

    @ManyToOne(() => Categoria)
    @JoinColumn({ name: "categoria_id" })
    categoria: Categoria;

    @Column()
    categoria_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.available = true;
        }
    }
}

export { Carro }