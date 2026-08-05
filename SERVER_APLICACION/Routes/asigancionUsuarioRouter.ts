import { Router } from "../Dependencies/dependencias.ts";
import { verificarToken, verificarRol } from "../Middlewares/verificarToken.ts";
import {
  GetAsignacionUsuario,
  GetAsignacionUsuarioID,
  PostAsignacionUsuario,
  PutAsignacionUsuario,
  DelateAsignacionUsuario,
} from "../Controller/asignacionUsuarioController.ts";

const asignacionUsuarioRouter = new Router();
const ID_ROL_ADMIN = 3;

asignacionUsuarioRouter.get("/asignacionUsuario", verificarToken, verificarRol(ID_ROL_ADMIN), GetAsignacionUsuario);
asignacionUsuarioRouter.get("/asignacionUsuario/:id", verificarToken, verificarRol(ID_ROL_ADMIN), GetAsignacionUsuarioID);
asignacionUsuarioRouter.post("/asignacionUsuario", verificarToken, verificarRol(ID_ROL_ADMIN), PostAsignacionUsuario);
asignacionUsuarioRouter.put("/asignacionUsuario/:id", verificarToken, verificarRol(ID_ROL_ADMIN), PutAsignacionUsuario);
asignacionUsuarioRouter.delete("/asignacionUsuario/:id", verificarToken, verificarRol(ID_ROL_ADMIN), DelateAsignacionUsuario);

export { asignacionUsuarioRouter };
