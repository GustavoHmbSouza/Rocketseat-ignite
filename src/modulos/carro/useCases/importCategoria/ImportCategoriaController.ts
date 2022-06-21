import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoriaUseCase } from "./ImportCategoriaUseCase";

class ImportCategoriaController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;

        const importCategoriaUseCase = container.resolve(ImportCategoriaUseCase);

        await importCategoriaUseCase.execute(file);
        return response.status(201).send();
    }
}

export { ImportCategoriaController };
