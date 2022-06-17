import { Especificacao } from "../entities/Especificacao";

interface ICreateEspecificacaoDTO {
    nome: string;
    descricao: string;
}

interface IEspecificacaoRepository {
    create({ nome, descricao }: ICreateEspecificacaoDTO): void;
    findByName(nome: string): Especificacao;
}

export { IEspecificacaoRepository, ICreateEspecificacaoDTO };
