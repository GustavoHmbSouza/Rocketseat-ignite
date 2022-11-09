import { CarroRepositoryEmMemoria } from "../../../repositories/emMemoria/CarroRepositoryEmMemoria";
import { ListAvailableCarrosUseCase } from "./ListAvailableCarrosUseCase"

let listAvailableCarrosUseCase: ListAvailableCarrosUseCase;
let carrosRepositoryEmMemory: CarroRepositoryEmMemoria;

describe("Lista Carros", () => {

    beforeEach(() => {
        carrosRepositoryEmMemory = new CarroRepositoryEmMemoria()
        listAvailableCarrosUseCase = new ListAvailableCarrosUseCase(carrosRepositoryEmMemory);
    })

    it("Deve listar todos os carros disponíveis", async () => {
        const carro = await carrosRepositoryEmMemory.create({
            nome: "carro",
            descricao: "Carro descricao",
            dia_rate: 2.0,
            placa: "placa_carro",
            valor_multa: 1231,
            marca: "forda",
            categoria_id: "e407d043-7dc7-4fa4-a705-a8a779c6b532"
        })

        const carros = await listAvailableCarrosUseCase.execute({});

        expect(carros).toEqual([carro])
    })

    it("Deve listar todos os carros disponíveis por placa", async () => {
        const carro = await carrosRepositoryEmMemory.create({
            nome: "carro2",
            descricao: "Carro descricao",
            dia_rate: 2.0,
            placa: "placa_carro2",
            valor_multa: 1231,
            marca: "forda",
            categoria_id: "e407d043-7dc7-4fa4-a705-a8a779c6b532"
        })

        const carros = await listAvailableCarrosUseCase.execute({ placa: "placa_carro2" });

        expect(carros).toEqual([carro])
    })

    it("Deve listar todos os carros disponíveis por nome", async () => {
        const carro = await carrosRepositoryEmMemory.create({
            nome: "carro3",
            descricao: "Carro descricao",
            dia_rate: 2.0,
            placa: "placa_carro3",
            valor_multa: 1231,
            marca: "forda",
            categoria_id: "e407d043-7dc7-4fa4-a705-a8a779c6b532"
        })

        const carros = await listAvailableCarrosUseCase.execute({ nome: "carro3" });

        expect(carros).toEqual([carro])
    })

    it("Deve listar todos os carros disponíveis por categoria", async () => {
        const carro = await carrosRepositoryEmMemory.create({
            nome: "carro4",
            descricao: "Carro descricao",
            dia_rate: 2.0,
            placa: "placa_carro4",
            valor_multa: 1231,
            marca: "forda",
            categoria_id: "12345"
        })

        const carros = await listAvailableCarrosUseCase.execute({ categoria_id: "12345" });

        expect(carros).toEqual([carro])
    })
})