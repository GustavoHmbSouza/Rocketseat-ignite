import dayjs from "dayjs";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementacoes/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { AlugueisRepositoryEmMemoria } from "../../../repositories/emMemoria/AlugueisRepositoryEmMemoria";
import { CarroRepositoryEmMemoria } from "../../../repositories/emMemoria/CarroRepositoryEmMemoria";
import { CreateAluguelUseCase } from "./CreateAluguelUseCase";

let createAluguelUseCase: CreateAluguelUseCase;
let alugueisRepositoryInMemory: AlugueisRepositoryEmMemoria;
let carroRepositoryEmMemoria: CarroRepositoryEmMemoria;
let dayjsDateProvider: DayjsDateProvider;

describe("Criando aluguel", () => {
    const diaAdd24Horas = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        alugueisRepositoryInMemory = new AlugueisRepositoryEmMemoria()
        dayjsDateProvider = new DayjsDateProvider();
        carroRepositoryEmMemoria = new CarroRepositoryEmMemoria();

        createAluguelUseCase = new CreateAluguelUseCase(alugueisRepositoryInMemory, dayjsDateProvider, carroRepositoryEmMemoria);
    });

    it("Deve criar um novo aluguel", async () => {
        const carro = await carroRepositoryEmMemoria.create({
            nome: "teste",
            descricao: "testee",
            dia_rate: 100,
            placa: "teste",
            valor_multa: 40,
            categoria_id: "1234",
            marca: "marca"
        });

        const aluguel = await createAluguelUseCase.execute({
            usuario_id: "12345",
            carro_id: carro.id,
            tempo_previsto_retorno: diaAdd24Horas
        })

        expect(aluguel).toHaveProperty("id");
        expect(aluguel).toHaveProperty("tempo_inicial");

    })

    it("Não deve criar um novo aluguel se já existir um em aberto para o mesmo usuário", async () => {
        expect(async () => {
            const carro = await carroRepositoryEmMemoria.create({
                nome: "teste",
                descricao: "testee",
                dia_rate: 100,
                placa: "teste",
                valor_multa: 40,
                categoria_id: "1234",
                marca: "marca"
            });

            await createAluguelUseCase.execute({
                usuario_id: "12345",
                carro_id: carro.id,
                tempo_previsto_retorno: diaAdd24Horas
            })

            await createAluguelUseCase.execute({
                usuario_id: "12345",
                carro_id: carro.id,
                tempo_previsto_retorno: diaAdd24Horas
            })
        }).rejects.toBeInstanceOf(AppError);
    });


    it("Não deve criar um novo aluguel se já existir um em aberto para o mesmo carro", async () => {
        expect(async () => {
            const carro = await carroRepositoryEmMemoria.create({
                nome: "teste",
                descricao: "testee",
                dia_rate: 100,
                placa: "teste",
                valor_multa: 40,
                categoria_id: "1234",
                marca: "marca"
            });

            await createAluguelUseCase.execute({
                usuario_id: "123",
                carro_id: carro.id,
                tempo_previsto_retorno: diaAdd24Horas
            })

            await createAluguelUseCase.execute({
                usuario_id: "321",
                carro_id: carro.id,
                tempo_previsto_retorno: diaAdd24Horas
            })
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve criar um novo aluguel se o tempo de locação for menor que 24 horas", async () => {
        expect(async () => {
            const carro = await carroRepositoryEmMemoria.create({
                nome: "teste",
                descricao: "testee",
                dia_rate: 100,
                placa: "teste",
                valor_multa: 40,
                categoria_id: "1234",
                marca: "marca"
            });

            await createAluguelUseCase.execute({
                usuario_id: "123",
                carro_id: carro.id,
                tempo_previsto_retorno: dayjs().toDate()
            })

        }).rejects.toBeInstanceOf(AppError);
    });
})