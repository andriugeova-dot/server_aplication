import { Router } from "../Dependencies/dependencias.ts";
import { verificarToken, verificarRol } from "../Middlewares/verificarToken.ts";
import {
  GetAprendiz,
  GetAprendizID,
  GetAprendizMiPerfil,
  GetAprendizPorFicha,
  PostAprendiz,
  PutAprendiz,
  DelateAprendiz,
} from "../Controller/aprendizController.ts";

const aprendizRouter = new Router();
const ID_ROL_ADMIN = 3;

// IMPORTANTE: las rutas específicas van ANTES de "/aprendiz/:id", si no
// Oak interpretaría "miperfil" o "ficha" como si fueran el :id.
aprendizRouter.get("/aprendiz/miperfil", verificarToken, GetAprendizMiPerfil);
aprendizRouter.get("/aprendiz/ficha/:idFicha", verificarToken, GetAprendizPorFicha);
aprendizRouter.get("/aprendiz", verificarToken, GetAprendiz);
aprendizRouter.get("/aprendiz/:id", verificarToken, GetAprendizID);
aprendizRouter.post("/aprendiz", verificarToken, verificarRol(ID_ROL_ADMIN), PostAprendiz);
aprendizRouter.put("/aprendiz/:id", verificarToken, verificarRol(ID_ROL_ADMIN), PutAprendiz);
aprendizRouter.delete("/aprendiz/:id", verificarToken, verificarRol(ID_ROL_ADMIN), DelateAprendiz);

export { aprendizRouter };
