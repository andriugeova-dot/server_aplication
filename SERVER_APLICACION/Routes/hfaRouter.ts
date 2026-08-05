import { Router } from "../Dependencies/dependencias.ts";
import { verificarToken, verificarRol } from "../Middlewares/verificarToken.ts";
import { GetHFA, GetHFAID, GetHFAPorFicha, PostHFA, PutHFA, DelateHFA } from "../controller/hfaController.ts";

const hfaRouter = new Router();
const ID_ROL_ADMIN = 3;

// Ruta específica ANTES de "/hfa/:id".
hfaRouter.get("/hfa/ficha/:idFicha", verificarToken, GetHFAPorFicha);
hfaRouter.get("/hfa", verificarToken, GetHFA);
hfaRouter.get("/hfa/:id", verificarToken, GetHFAID);
hfaRouter.post("/hfa", verificarToken, verificarRol(ID_ROL_ADMIN), PostHFA);
hfaRouter.put("/hfa/:id", verificarToken, verificarRol(ID_ROL_ADMIN), PutHFA);
hfaRouter.delete("/hfa/:id", verificarToken, verificarRol(ID_ROL_ADMIN), DelateHFA);

export { hfaRouter };
