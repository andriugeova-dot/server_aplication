import { Router } from "../Dependencies/dependencias.ts";
import { verificarToken, verificarRol } from "../Middlewares/verificarToken.ts";
import {
  GetAsistencia,
  GetAsistenciaID,
  GetAsistenciaPorAprendiz,
  PostAsistencia,
  PutAsistencia,
  DelateAsistencia,
} from "../Controller/asistenciaController.ts";

const asistenciaRouter = new Router();
const ID_ROL_ADMIN = 3;
const ID_ROL_INSTRUCTOR = 2;

asistenciaRouter.get("/asistencia", verificarToken, verificarRol(ID_ROL_ADMIN, ID_ROL_INSTRUCTOR), GetAsistencia);
asistenciaRouter.get("/asistencia/:id", verificarToken, GetAsistenciaID);
asistenciaRouter.get("/asistencia/aprendiz/:idAprendiz", verificarToken, GetAsistenciaPorAprendiz);
// El controlador valida que el instructor solo marque aprendices de sus fichas.
asistenciaRouter.post("/asistencia", verificarToken, verificarRol(ID_ROL_ADMIN, ID_ROL_INSTRUCTOR), PostAsistencia);
asistenciaRouter.put("/asistencia/:id", verificarToken, verificarRol(ID_ROL_ADMIN, ID_ROL_INSTRUCTOR), PutAsistencia);
asistenciaRouter.delete("/asistencia/:id", verificarToken, verificarRol(ID_ROL_ADMIN), DelateAsistencia);

export { asistenciaRouter };
