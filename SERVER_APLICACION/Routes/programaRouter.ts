import { Router } from "../Dependencies/dependencias.ts";
import { verificarToken, verificarRol } from "../Middlewares/verificarToken.ts";
import { GetPrograma, GetProgramaID, PostPrograma, PutPrograma, DelatePrograma } from "../Controller/programaController.ts";

const programaRouter = new Router();
const ID_ROL_ADMIN = 3;

programaRouter.get("/programa", verificarToken, GetPrograma);
programaRouter.get("/programa/:id", verificarToken, GetProgramaID);
programaRouter.post("/programa", verificarToken, verificarRol(ID_ROL_ADMIN), PostPrograma);
programaRouter.put("/programa/:id", verificarToken, verificarRol(ID_ROL_ADMIN), PutPrograma);
programaRouter.delete("/programa/:id", verificarToken, verificarRol(ID_ROL_ADMIN), DelatePrograma);

export { programaRouter };
