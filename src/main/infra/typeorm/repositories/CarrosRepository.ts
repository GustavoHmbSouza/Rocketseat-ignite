import { getRepository, Repository } from "typeorm";
import { ICreateCarroDTO } from "../../../dtos/ICreateCarroDTO";
import { ICarroRepository } from "../../../repositories/ICarroRepository";

import { Carro } from "../entities/Carro";


class CarrosRepository implements ICarroRepository {

    private repositoty: Repository<Carro>;

    constructor() {
        this.repositoty = getRepository(Carro);
    }

    async create({
        nome,
        descricao,
        dia_rate,
        placa,
        valor_multa,
        marca,
        categoria_id,
        especificacoes,
        id,
    }: ICreateCarroDTO): Promise<Carro> {
        const carro = this.repositoty.create({
            nome,
            descricao,
            dia_rate,
            placa,
            valor_multa,
            marca,
            categoria_id,
            especificacoes,
            id,
        })

        await this.repositoty.save(carro);

        return carro;
    }

    async findByPlaca(placa: string): Promise<Carro> {
        const carro = await this.repositoty.findOne({ placa });

        return carro;
    }

    async findAvailable(placa?: string, categoria_id?: string, nome?: string): Promise<Carro[]> {
        const carrosQuery = await this.repositoty
            .createQueryBuilder("c")
            .where("available= :available", { available: true });

        if (placa)
            carrosQuery.andWhere("c.placa= :placa", { placa })

        if (nome)
            carrosQuery.andWhere("c.nome= :nome", { nome })

        if (categoria_id)
            carrosQuery.andWhere("c.categoria_id= :categoria_id", { categoria_id })

        const carros = await carrosQuery.getMany();

        return carros;
    }

    async findById(id: string): Promise<Carro> {
        const carro = await this.repositoty.findOne(id);

        return carro;
    }
}

export { CarrosRepository }