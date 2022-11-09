import { AppError } from "../../../../shared/errors/AppError";
import { CarroRepositoryEmMemoria } from "../../../repositories/emMemoria/CarroRepositoryEmMemoria";
import { EspecificacaoRepositoryEmMemoria } from "../../../repositories/emMemoria/EspecificacaoRepositoryEmMemoria";
import { CreateCarroEspecificacaoUseCase } from "./CreateCarroEspecificacaoUseCase"

let createCarroEspecificacaoUseCase: CreateCarroEspecificacaoUseCase;
let carrosRepositoryEmMemoria: CarroRepositoryEmMemoria;
let especificacoesRepositoryEmMemoria: EspecificacaoRepositoryEmMemoria;

describe("Cria carro especificacao", () => {

    beforeEach(() => {
        carrosRepositoryEmMemoria = new CarroRepositoryEmMemoria();
        especificacoesRepositoryEmMemoria = new EspecificacaoRepositoryEmMemoria();
        createCarroEspecificacaoUseCase = new CreateCarroEspecificacaoUseCase(carrosRepositoryEmMemoria, especificacoesRepositoryEmMemoria);
    })

    it("Deve ser possível adicinoar uma nova especificação de carro", async () => {
        const carro = await carrosRepositoryEmMemoria.create({ nome: "nome", descricao: "descricao", dia_rate: 5, placa: "placa", valor_multa: 4, marca: "marca", categoria_id: "categoria_id" })

        const especificacao = await especificacoesRepositoryEmMemoria.create({
            descricao: "teste",
            nome: "teste"
        })

        const especificacoes_id = [especificacao.id]
        const especificacoesCarros = await createCarroEspecificacaoUseCase.execute({ carro_id: carro.id, especificacoes_id });

        expect(especificacoesCarros).toHaveProperty("especificacoes")
        expect(especificacoesCarros.especificacoes.length).toBe(1)
    })

    it("Não deve ser possível adicinoar uma nova especificação de carro pois ele não existe", async () => {
        expect(async () => {
            const especificacoes_id = ["12345"]
            const carro_id = "123";
            await createCarroEspecificacaoUseCase.execute({ carro_id, especificacoes_id });
        }).rejects.toBeInstanceOf(AppError);
    })
})