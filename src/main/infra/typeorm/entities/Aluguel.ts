import { Column, CreateDateColumn, Entity, UpdateDateColumn, JoinTable, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid'
import { Carro } from './Carro';

@Entity("alugueis")
class Aluguel {

    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Carro)
    @JoinColumn({ name: "carro_id" })
    carro: Carro;

    @Column()
    carro_id: string;

    @Column()
    usuario_id: string;

    @Column()
    tempo_inicial: Date;

    @Column()
    tempo_final: Date;

    @Column()
    tempo_previsto_retorno: Date;

    @Column()
    total: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Aluguel }