import { Router } from "../Dependencies/dependencias.ts";
import { verificarToken, verificarRol } from "../Middlewares/verificarToken.ts";
import { GetUsuario, GetUsuarioID, PostUsuario, PutUsuario, DelateUsuario } from "../Controller/usuarioController.ts";

const usuarioRouter = new Router();
const ID_ROL_ADMIN = 3;

usuarioRouter.get("/usuario", verificarToken, GetUsuario);
usuarioRouter.get("/usuario/:id", verificarToken, GetUsuarioID);
usuarioRouter.post("/usuario", verificarToken, verificarRol(ID_ROL_ADMIN), PostUsuario);
usuarioRouter.put("/usuario/:id", verificarToken, verificarRol(ID_ROL_ADMIN), PutUsuario);
usuarioRouter.delete("/usuario/:id", verificarToken, verificarRol(ID_ROL_ADMIN), DelateUsuario);

export { usuarioRouter };
