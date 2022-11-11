import { CarroImagem } from "../infra/typeorm/entities/CarroImagem";


interface ICarroImagemRepository {

    create(carro_id: string, imagem_nome: string): Promise<CarroImagem>;
}

export { ICarroImagemRepository }