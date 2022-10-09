import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";

import { categoriasRoutes } from "./categorias.routes";
import { especificacoesRoutes } from "./especificacoes.routes";
import { usuariosRoutes } from "./usuarios.rotas";
import { carrosRoutes } from "./carros.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/categorias", categoriasRoutes);
router.use("/especificacoes", especificacoesRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/carros", carrosRoutes);

export { router };
