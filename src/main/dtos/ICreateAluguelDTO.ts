
interface ICreateAluguelDTO {
    usuario_id: string;
    carro_id: string;
    tempo_previsto_retorno: Date;
    id?: string;
    tempo_final?: Date;
    total?: number;
}

export { ICreateAluguelDTO }