import { Router } from "../Dependencies/dependencias.ts";
import { verificarToken, verificarRol } from "../Middlewares/verificarToken.ts";
import {
  GetAsignacionFicha,
  GetAsignacionFichaID,
  PostAsignacionFicha,
  PutAsignacionFicha,
  DelateAsignacionFicha,
  GetFichasInstructor,
} from "../Controller/asignacionFichaController.ts";

const asignacionFichaRouter = new Router();
const ID_ROL_ADMIN = 3;

asignacionFichaRouter.get("/asignacionFicha", verificarToken, verificarRol(ID_ROL_ADMIN), GetAsignacionFicha);
asignacionFichaRouter.get("/asignacionFicha/:id", verificarToken, verificarRol(ID_ROL_ADMIN), GetAsignacionFichaID);
// El propio instructor consulta sus fichas asignadas (no requiere ser admin).
asignacionFichaRouter.get("/instructor/fichas/:id", verificarToken, GetFichasInstructor);
asignacionFichaRouter.post("/asignacionFicha", verificarToken, verificarRol(ID_ROL_ADMIN), PostAsignacionFicha);
asignacionFichaRouter.put("/asignacionFicha/:id", verificarToken, verificarRol(ID_ROL_ADMIN), PutAsignacionFicha);
asignacionFichaRouter.delete("/asignacionFicha/:id", verificarToken, verificarRol(ID_ROL_ADMIN), DelateAsignacionFicha);

export { asignacionFichaRouter };
