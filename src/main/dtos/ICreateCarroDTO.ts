import { Especificacao } from "../infra/typeorm/entities/Especificacao";

interface ICreateCarroDTO {
    nome: string;
    descricao: string;
    dia_rate: number;
    placa: string;
    valor_multa: number;
    marca: string;
    categoria_id: string;
    especificacoes?: Especificacao[];
    id?: string;
}

export { ICreateCarroDTO }