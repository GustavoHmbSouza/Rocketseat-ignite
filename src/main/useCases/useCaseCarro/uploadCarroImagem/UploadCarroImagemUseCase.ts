import { inject, injectable } from "tsyringe";
import { ICarroImagemRepository } from "../../../repositories/ICarroImagemRepository";

interface IRequest {
    carro_id: string;
    imagens_nome: string[];
}

@injectable()
class UploadCarroImagemUseCase {
    constructor(
        @inject("CarrosImagensRepository")
        private carroImagensRepository: ICarroImagemRepository
    ) { }

    async execute({ carro_id, imagens_nome }: IRequest): Promise<void> {
        imagens_nome.map(async (imagem) => {
            await this.carroImagensRepository.create(carro_id, imagem)
        })
    }
}

export { UploadCarroImagemUseCase }