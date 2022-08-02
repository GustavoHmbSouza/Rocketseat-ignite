import { container } from "tsyringe";

import { ICategoriasRepository } from "../../modulos/carro/repositories/ICategoriasRepository";
import { IEspecificacaoRepository } from "../../modulos/carro/repositories/IEspecificacaoRepository";
import { CategoriasRepository } from "../../modulos/carro/repositories/implementations/CaregoriasRepository";
import { EspecificacoesRepository } from "../../modulos/carro/repositories/implementations/EspecificacoesRepository";
import { UsuariosRepository } from "../../modulos/conta/repositories/Implementations/UsuariosRepository";
import { IUsuarioRepository } from "../../modulos/conta/repositories/IUsuarioRepository";

container.registerSingleton<ICategoriasRepository>(
    "CategoriasRepository",
    CategoriasRepository
);

container.registerSingleton<IEspecificacaoRepository>(
    "EspecificacoesRepository",
    EspecificacoesRepository
);

container.registerSingleton<IUsuarioRepository>(
    "UsuariosRepository",
    UsuariosRepository
);