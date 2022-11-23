

interface IDateProvider {
    comparacaoHoras(tempo_final: Date): number;
    converteParaUtc(data: Date): string;
    dateNow(): Date;
    compareEmDias(tempo_inicial: Date, tempo_final: Date): number;
}

export { IDateProvider };