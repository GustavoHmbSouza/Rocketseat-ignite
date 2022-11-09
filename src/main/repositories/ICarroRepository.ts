import { ICreateCarroDTO } from '../dtos/ICreateCarroDTO'
import { Carro } from '../infra/typeorm/entities/Carro';

interface ICarroRepository {
    create(ICreateCarroDTO): Promise<Carro>;
    findByPlaca(placa: string): Promise<Carro>;
    findAvailable(placa?: string, categoria_id?: string, nome?: string): Promise<Carro[]>;
    findById(id: string): Promise<Carro>;

}

export { ICarroRepository }