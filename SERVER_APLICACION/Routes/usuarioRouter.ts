import { Router } from "../Dependencies/dependencias.ts";
import { verificarToken, verificarRol } from "../Middlewares/verificarToken.ts";
import { GetUsuario, GetUsuarioID,  GetUsuarioPorRol, PostUsuario, PutUsuario, DelateUsuario } from "../controller/usuarioController.ts";

const usuarioRouter = new Router();
const ID_ROL_ADMIN = 3;

// IMPORTANTE: "/usuario/rol/:idRol" va ANTES de "/usuario/:id", si no Oak
// interpretaría "rol" como si fuera el :id (igual que ya se hizo con
// "/aprendiz/ficha/:idFicha" en aprendizRouter.ts).
usuarioRouter.get("/usuario/rol/:idRol", verificarToken, verificarRol(ID_ROL_ADMIN), GetUsuarioPorRol);
usuarioRouter.get("/usuario", verificarToken, GetUsuario);
usuarioRouter.get("/usuario/:id", verificarToken, GetUsuarioID);
usuarioRouter.post("/usuario", verificarToken, verificarRol(ID_ROL_ADMIN), PostUsuario);
usuarioRouter.put("/usuario/:id", verificarToken, verificarRol(ID_ROL_ADMIN), PutUsuario);
usuarioRouter.delete("/usuario/:id", verificarToken, verificarRol(ID_ROL_ADMIN), DelateUsuario);

export { usuarioRouter };
