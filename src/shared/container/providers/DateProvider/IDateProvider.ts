

interface IDateProvider {
    comparacaoHoras(tempo_final: Date): number;
    converteParaUtc(data: Date): string;
    dateNow(): Date;
}

export { IDateProvider };