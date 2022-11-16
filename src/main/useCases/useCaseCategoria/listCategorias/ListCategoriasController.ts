import { Request, Response } from "express";
import { container, inject } from "tsyringe";

import { ListCategoriasUseCase } from "./ListCategoriasUseCase";

class ListCategoriasController {

    async handle(request: Request, response: Response): Promise<Response> {

        const listCategoriaUseCase = container.resolve(ListCategoriasUseCase);

        const categorias = await listCategoriaUseCase.execute();

        return response.status(200).json(categorias);
    }
}

export { ListCategoriasController };
