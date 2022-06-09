import { parse } from "csv-parse";
import fs from "fs";

import { CategoriasRepository } from "../../repositories/implementations/CaregoriasRepository";

interface IImportCategoria {
    nome: string;
    descricao: string;
}
class ImportCategoriaUseCase {
    constructor(private categoriasRepository: CategoriasRepository) { }

    loadCategorias(file: Express.Multer.File): Promise<IImportCategoria[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categorias: IImportCategoria[] = [];
            const parseFile = parse();

            stream.pipe(parseFile);
            console.log("teste");

            parseFile
                .on("data", async (line) => {
                    const [nome, descricao] = line;
                    categorias.push({ nome, descricao });
                })
                .on("end", () => {
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
            const existCategoria = this.categoriasRepository.findByName(nome);

            if (!existCategoria)
                this.categoriasRepository.create({
                    nome,
                    descricao,
                });
        });
    }
}

export { ImportCategoriaUseCase };
