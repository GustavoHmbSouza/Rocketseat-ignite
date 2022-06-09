import { Router } from "express";

import { categoriasRoutes } from "./categorias.routes";
import { especificacoesRoutes } from "./especificacoes.routes";

const router = Router();

router.use("/categorias", categoriasRoutes);
router.use("/especificacoes", especificacoesRoutes);

export { router };
