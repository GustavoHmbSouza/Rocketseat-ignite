import { container } from "tsyringe";
import { CategoriasRepository } from "../../main/infra/typeorm/repositories/CaregoriasRepository";
import { CarrosRepository } from "../../main/infra/typeorm/repositories/CarrosRepository";
import { EspecificacoesRepository } from "../../main/infra/typeorm/repositories/EspecificacoesRepository";
import { UsuariosRepository } from "../../main/infra/typeorm/repositories/UsuariosRepository";
import { ICarroRepository } from "../../main/repositories/ICarroRepository";
import { ICategoriasRepository } from "../../main/repositories/ICategoriasRepository";
import { IEspecificacaoRepository } from "../../main/repositories/IEspecificacaoRepository";
import { IUsuarioRepository } from "../../main/repositories/IUsuarioRepository";

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