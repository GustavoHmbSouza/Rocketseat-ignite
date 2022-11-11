import { getRepository, Repository } from "typeorm";
import { ICarroImagemRepository } from "../../../repositories/ICarroImagemRepository";
import { CarroImagem } from "../entities/CarroImagem";


class CarrosImagensRepository implements ICarroImagemRepository {
    private repository: Repository<CarroImagem>;

    constructor() {
        this.repository = getRepository(CarroImagem);
    }

    async create(carro_id: string, imagem_nome: string): Promise<CarroImagem> {
        const carroImagem = this.repository.create({
            carro_id,
            imagem_nome
        })

        await this.repository.save(carroImagem);

        return carroImagem;
    }

}

export { CarrosImagensRepository }