import dayjs from "dayjs";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementacoes/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { AlugueisRepositoryEmMemoria } from "../../../repositories/emMemoria/AlugueisRepositoryEmMemoria";
import { CreateAluguelUseCase } from "./CreateAluguelUseCase";

let createAluguelUseCase: CreateAluguelUseCase;
let alugueisRepositoryInMemory: AlugueisRepositoryEmMemoria;
let dayjsDateProvider: DayjsDateProvider;

describe("Criando aluguel", () => {
    const diaAdd24Horas = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        alugueisRepositoryInMemory = new AlugueisRepositoryEmMemoria()
        dayjsDateProvider = new DayjsDateProvider();

        createAluguelUseCase = new CreateAluguelUseCase(alugueisRepositoryInMemory, dayjsDateProvider);
    });

    it("Deve criar um novo aluguel", async () => {
        const aluguel = await createAluguelUseCase.execute({
            usuario_id: "12345",
            carro_id: "121212",
            tempo_previsto_retorno: diaAdd24Horas
        })

        expect(aluguel).toHaveProperty("id");
        expect(aluguel).toHaveProperty("tempo_inicial");

    })

    it("Não deve criar um novo aluguel se já existir um em aberto para o mesmo usuário", async () => {
        expect(async () => {
            await createAluguelUseCase.execute({
                usuario_id: "12345",
                carro_id: "123",
                tempo_previsto_retorno: diaAdd24Horas
            })

            await createAluguelUseCase.execute({
                usuario_id: "12345",
                carro_id: "321",
                tempo_previsto_retorno: diaAdd24Horas
            })
        }).rejects.toBeInstanceOf(AppError);
    });


    it("Não deve criar um novo aluguel se já existir um em aberto para o mesmo carro", async () => {
        expect(async () => {
            await createAluguelUseCase.execute({
                usuario_id: "123",
                carro_id: "test",
                tempo_previsto_retorno: diaAdd24Horas
            })

            await createAluguelUseCase.execute({
                usuario_id: "321",
                carro_id: "test",
                tempo_previsto_retorno: diaAdd24Horas
            })
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve criar um novo aluguel se o tempo de locação for menor que 24 horas", async () => {
        expect(async () => {
            await createAluguelUseCase.execute({
                usuario_id: "123",
                carro_id: "test",
                tempo_previsto_retorno: dayjs().toDate()
            })

        }).rejects.toBeInstanceOf(AppError);
    });
})