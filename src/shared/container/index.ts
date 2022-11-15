import { container } from "tsyringe";
import "../container/providers";
import { AlugueisRepository } from "../../main/infra/typeorm/repositories/AlugueisRepository";
import { CategoriasRepository } from "../../main/infra/typeorm/repositories/CaregoriasRepository";
import { CarrosImagensRepository } from "../../main/infra/typeorm/repositories/CarrosImagensRepository";
import { CarrosRepository } from "../../main/infra/typeorm/repositories/CarrosRepository";
import { EspecificacoesRepository } from "../../main/infra/typeorm/repositories/EspecificacoesRepository";
import { UsuariosRepository } from "../../main/infra/typeorm/repositories/UsuariosRepository";
import { IAlugueisRepository } from "../../main/repositories/IAlugueisRepository";
import { ICarroImagemRepository } from "../../main/repositories/ICarroImagemRepository";
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

container.registerSingleton<ICarroImagemRepository>(
    "CarrosImagensRepository",
    CarrosImagensRepository
);

container.registerSingleton<IAlugueisRepository>(
    "AlugueisRepository",
    AlugueisRepository
);