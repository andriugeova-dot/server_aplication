import { Router } from "../Dependencies/dependencias.ts";
import {
  GetAsignacionUsuario,
  GetAsignacionUsuarioID,
  PostAsignacionUsuario,
  PutAsignacionUsuario,
  DelateAsignacionUsuario,
} from "../Controller/asignacionUsuarioController.ts";

const asignacionUsuarioRouter = new Router();

asignacionUsuarioRouter.get("/asignacionUsuario", GetAsignacionUsuario);
asignacionUsuarioRouter.get("/asignacionUsuario/:id", GetAsignacionUsuarioID);
asignacionUsuarioRouter.post("/asignacionUsuario", PostAsignacionUsuario);
asignacionUsuarioRouter.put("/asignacionUsuario/:id", PutAsignacionUsuario);
asignacionUsuarioRouter.delete("/asignacionUsuario/:id", DelateAsignacionUsuario);

export { asignacionUsuarioRouter };