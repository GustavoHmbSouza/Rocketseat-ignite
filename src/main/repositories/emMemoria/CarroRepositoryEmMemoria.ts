import { ICreateCarroDTO } from "../../dtos/ICreateCarroDTO";
import { Carro } from "../../infra/typeorm/entities/Carro";
import { ICarroRepository } from "../ICarroRepository";

class CarroRepositoryEmMemoria implements ICarroRepository {

    carros: Carro[] = [];

    async create({
        nome,
        descricao,
        dia_rate,
        placa,
        valor_multa,
        marca,
        categoria_id
    }: ICreateCarroDTO): Promise<Carro> {
        const carro = new Carro();

        Object.assign(carro, {
            nome,
            descricao,
            dia_rate,
            placa,
            valor_multa,
            marca,
            categoria_id
        })

        this.carros.push(carro);


        return carro;
    }

    async findByPlaca(placa: string): Promise<Carro> {
        return this.carros.find(carro => carro.placa === placa);
    }

    async findAvailable(placa?: string, categoria_id?: string, nome?: string): Promise<Carro[]> {
        const carros = this.carros
            .filter(carro => {
                if (carro.available == true && (((placa && carro.placa === placa) ||
                    (categoria_id && carro.categoria_id === categoria_id) ||
                    (nome && carro.nome === nome)) || (!placa && !categoria_id && !nome))
                ) {
                    return carro
                }
                return null;
            })

        return carros;
    }
}

export { CarroRepositoryEmMemoria }