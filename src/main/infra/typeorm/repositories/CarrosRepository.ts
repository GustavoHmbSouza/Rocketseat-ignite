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
        categoria_id
    }: ICreateCarroDTO): Promise<Carro> {
        const carro = this.repositoty.create({
            nome,
            descricao,
            dia_rate,
            placa,
            valor_multa,
            marca,
            categoria_id
        })

        await this.repositoty.save(carro);

        return carro;
    }
    async findByPlaca(placa: string): Promise<Carro> {
        const carro = await this.repositoty.findOne({ placa });

        return carro;
    }

}

export { CarrosRepository }