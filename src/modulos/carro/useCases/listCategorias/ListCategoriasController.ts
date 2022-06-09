import { Request, Response } from "express";

import { ListCategoriasUseCase } from "./ListCategoriasUseCase";

class ListCategoriasController {
    constructor(private listCategoriaUseCase: ListCategoriasUseCase) { }
    handle(request: Request, response: Response): Response {
        const categorias = this.listCategoriaUseCase.execute();

        return response.status(201).json(categorias);
    }
}

export { ListCategoriasController };
