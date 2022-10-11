import { AppError } from "../../../../shared/errors/AppError";
import { CarroRepositoryEmMemoria } from "../../../repositories/emMemoria/CarroRepositoryEmMemoria";
import { CreateCarroUseCase } from "./CreateCarroUseCase";

let createCarroUseCase: CreateCarroUseCase;
let carroRespositoryEmMemoria: CarroRepositoryEmMemoria;

describe("Criar carro", () => {
    beforeEach(() => {
        carroRespositoryEmMemoria = new CarroRepositoryEmMemoria();
        createCarroUseCase = new CreateCarroUseCase(carroRespositoryEmMemoria);
    });

    it("Deve criar um novo carro", async () => {
        const car = await createCarroUseCase.execute({ nome: "nome", descricao: "descricao", dia_rate: 5, placa: "placa", valor_multa: 4, marca: "marca", categoria_id: "categoria_id" });

        expect(car).toHaveProperty("id");
    });


    it("Não deve criar um novo carro se já existir um", async () => {
        expect(async () => {
            const carro = { nome: "nome", descricao: "descricao", dia_rate: 5, placa: "placa", valor_multa: 4, marca: "marca", categoria_id: "categoria_id" };
            const carro2 = { nome: "nome2", descricao: "descricao2", dia_rate: 4, placa: "placa", valor_multa: 1, marca: "marca2", categoria_id: "categoria_id2" };

            await createCarroUseCase.execute(carro);

            await createCarroUseCase.execute(carro2);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve criar um novo carro com avaliable true", async () => {
        const carro = await createCarroUseCase.execute({ nome: "nome2", descricao: "descricao2", dia_rate: 4, placa: "placa", valor_multa: 1, marca: "marca2", categoria_id: "categoria_id2" });

        expect(carro.available).toBe(true);
    });
})