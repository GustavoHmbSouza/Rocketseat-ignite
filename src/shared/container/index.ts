import { container } from "tsyringe";

import { ICategoriasRepository } from "../../modulos/carro/repositories/ICategoriasRepository";
import { IEspecificacaoRepository } from "../../modulos/carro/repositories/IEspecificacaoRepository";
import { CategoriasRepository } from "../../modulos/carro/infra/typeorm/repositories/CaregoriasRepository";
import { EspecificacoesRepository } from "../../modulos/carro/infra/typeorm/repositories/EspecificacoesRepository";
import { UsuariosRepository } from "../../modulos/conta/infra/typeorm/repositories/UsuariosRepository";
import { IUsuarioRepository } from "../../modulos/conta/repositories/IUsuarioRepository";
import { ICarroRepository } from "../../modulos/carro/repositories/ICarroRepository";
import { CarrosRepository } from "../../modulos/carro/infra/typeorm/repositories/CarrosRepository";

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

container.registerSingleton<ICarroRepository>(
    "CarrosRepository",
    CarrosRepository
);