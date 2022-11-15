import { IDateProvider } from "../IDateProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {

    comparacaoHoras(tempo_final: Date): number {
        const tempo_final_utc = this.converteParaUtc(tempo_final);
        const tempo_incial_utc = this.converteParaUtc(this.dateNow());

        return dayjs(tempo_final_utc).diff(tempo_incial_utc, "hours");
    }

    converteParaUtc(data: Date): string {
        return dayjs(data).utc().local().format();
    }

    dateNow() {
        return dayjs().toDate();
    }
}

export { DayjsDateProvider }