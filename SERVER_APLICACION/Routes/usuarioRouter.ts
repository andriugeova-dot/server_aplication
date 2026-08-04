import { Router } from "../Dependencies/dependencias.ts";
import { verificarToken, verificarRol } from "../Middlewares/verificarToken.ts";
import {
  GetUsuario,
  GetUsuarioID,
  PostUsuario,
  PutUsuario,
  DelateUsuario,
} from "../Controller/usuarioController.ts";

const usuarioRouter = new Router();

const ID_ROL_ADMIN = 3;

// Solo un administrador puede listar todos los usuarios
usuarioRouter.get("/usuario", verificarToken, verificarRol(ID_ROL_ADMIN), GetUsuario);

// Cualquier usuario autenticado puede consultar un usuario por id
usuarioRouter.get("/usuario/:id",  GetUsuarioID);

// Solo un administrador puede crear usuarios
usuarioRouter.post("/usuario", verificarToken, verificarRol(ID_ROL_ADMIN), PostUsuario);

// Solo un administrador puede actualizar usuarios
usuarioRouter.put("/usuario/:id", verificarToken, verificarRol(ID_ROL_ADMIN), PutUsuario);

// Solo un administrador puede eliminar usuarios
usuarioRouter.delete("/usuario/:id", verificarToken, verificarRol(ID_ROL_ADMIN), DelateUsuario);

export { usuarioRouter };