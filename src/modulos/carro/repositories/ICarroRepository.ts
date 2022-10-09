import { ICreateCarroDTO } from '../dtos/ICreateCarroDTO'
import { Carro } from '../infra/typeorm/entities/Carro';

interface ICarroRepository {
    create(ICreateCarroDTO): Promise<Carro>;
    findByPlaca(placa: string): Promise<Carro>;
}

export { ICarroRepository }