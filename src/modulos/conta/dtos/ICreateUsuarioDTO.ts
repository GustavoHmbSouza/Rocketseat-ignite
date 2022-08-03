interface ICreateUsuarioDTO {
    nome: string;
    senha: string;
    email: string;
    licenca_direcao: string;
    id?: string;
    avatar?: string;
}

export { ICreateUsuarioDTO }
