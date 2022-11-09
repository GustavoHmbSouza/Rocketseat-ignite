import { Especificacao } from "../infra/typeorm/entities/Especificacao";

interface ICreateEspecificacaoDTO {
    nome: string;
    descricao: string;
}

interface IEspecificacaoRepository {
    create({ nome, descricao }: ICreateEspecificacaoDTO): Promise<Especificacao>;
    findByName(nome: string): Promise<Especificacao>;
    findByIds(ids: string[]): Promise<Especificacao[]>;
}

export { IEspecificacaoRepository, ICreateEspecificacaoDTO };
