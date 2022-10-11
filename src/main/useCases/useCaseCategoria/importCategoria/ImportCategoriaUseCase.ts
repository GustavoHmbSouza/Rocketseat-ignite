import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";
import { ICategoriasRepository } from "../../../repositories/ICategoriasRepository";


interface IImportCategoria {
    nome: string;
    descricao: string;
}

@injectable()
class ImportCategoriaUseCase {
    constructor(
        @inject("CategoriasRepository")
        private categoriasRepository: ICategoriasRepository) { }

    loadCategorias(file: Express.Multer.File): Promise<IImportCategoria[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categorias: IImportCategoria[] = [];
            const parseFile = parse();

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [nome, descricao] = line;
                    categorias.push({ nome, descricao });
                })
                .on("end", () => {
                    fs.promises.unlink(file.path);
                    resolve(categorias);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categorias = await this.loadCategorias(file);

        categorias.map(async (categoria) => {
            const { nome, descricao } = categoria;
            const existCategoria = await this.categoriasRepository.findByName(nome);

            if (!existCategoria)
                await this.categoriasRepository.create({
                    nome,
                    descricao,
                });
        });
    }
}

export { ImportCategoriaUseCase };
