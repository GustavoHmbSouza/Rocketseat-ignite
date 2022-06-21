import { Especificacao } from "../entities/Especificacao";

interface ICreateEspecificacaoDTO {
    nome: string;
    descricao: string;
}

interface IEspecificacaoRepository {
    create({ nome, descricao }: ICreateEspecificacaoDTO): Promise<void>;
    findByName(nome: string): Promise<Especificacao>;
}

export { IEspecificacaoRepository, ICreateEspecificacaoDTO };
