import { container } from "tsyringe";

import { ICategoriasRepository } from "../../modulos/carro/repositories/ICategoriasRepository";
import { IEspecificacaoRepository } from "../../modulos/carro/repositories/IEspecificacaoRepository";
import { CategoriasRepository } from "../../modulos/carro/repositories/implementations/CaregoriasRepository";
import { EspecificacaoRepository } from "../../modulos/carro/repositories/implementations/EspecificacaoRepository";

container.registerSingleton<ICategoriasRepository>(
    "CategoriasRepository",
    CategoriasRepository
);

container.registerSingleton<IEspecificacaoRepository>(
    "EspecificacaoRepository",
    EspecificacaoRepository
);