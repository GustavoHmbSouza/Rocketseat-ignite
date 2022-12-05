
interface ICreateUsuariosTokensDTO {
    usuario_id: string;
    data_expiracao: Date;
    refresh_token: string;
}

export { ICreateUsuariosTokensDTO }