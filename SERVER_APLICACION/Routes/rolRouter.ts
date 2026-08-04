import { Router } from "../Dependencies/dependencias.ts";
import { verificarToken, verificarRol } from "../Middlewares/verificarToken.ts";
import {
  GetRol,
  GetRolID,
  PostRol,
  PutRol,
  DelateRol,
} from "../Controller/rolController.ts";

const rolRouter = new Router();
const ID_ROL_ADMIN = 3;

rolRouter.get("/rol", GetRol);
rolRouter.get("/rol/:id", GetRolID);
rolRouter.post("/rol", verificarToken, verificarRol(ID_ROL_ADMIN), PostRol);
rolRouter.put("/rol/:id", verificarToken, verificarRol(ID_ROL_ADMIN), PutRol);
rolRouter.delete("/rol/:id", verificarToken, verificarRol(ID_ROL_ADMIN), DelateRol);

export { rolRouter };