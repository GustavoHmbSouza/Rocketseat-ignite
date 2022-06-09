import { EspecificacaoRepository } from "../../repositories/implementations/EspecificacaoRepository";
import { CreateEspecificacaoController } from "./CreateEspecificacaoController";
import { CreateEspecificacaoUseCase } from "./CreateEspecificacaoUseCase";

const especificacaoRepository = new EspecificacaoRepository();

const createEspecificacaoUseCase = new CreateEspecificacaoUseCase(
    especificacaoRepository
);

const createEspecificacaoController = new CreateEspecificacaoController(
    createEspecificacaoUseCase
);

export { createEspecificacaoController };
