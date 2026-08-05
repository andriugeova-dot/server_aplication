import { Router } from "../Dependencies/dependencias.ts";
import { verificarToken, verificarRol } from "../Middlewares/verificarToken.ts";
import { GetFicha, GetFichaID, PostFicha, PutFicha, DelateFicha } from "../Controller/fichaController.ts";

const fichaRouter = new Router();
const ID_ROL_ADMIN = 3;

fichaRouter.get("/ficha", verificarToken, GetFicha);
fichaRouter.get("/ficha/:id", verificarToken, GetFichaID);
fichaRouter.post("/ficha", verificarToken, verificarRol(ID_ROL_ADMIN), PostFicha);
fichaRouter.put("/ficha/:id", verificarToken, verificarRol(ID_ROL_ADMIN), PutFicha);
fichaRouter.delete("/ficha/:id", verificarToken, verificarRol(ID_ROL_ADMIN), DelateFicha);

export { fichaRouter };
