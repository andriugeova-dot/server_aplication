import { Router } from "../Dependencies/dependencias.ts";
import {
  GetAsistencia,
  GetAsistenciaID,
  GetAsistenciaPorAprendiz,
  PostAsistencia,
  PutAsistencia,
  DelateAsistencia,
} from "../Controller/asistenciaController.ts";

const asistenciaRouter = new Router();

asistenciaRouter.get("/asistencia", GetAsistencia);
asistenciaRouter.get("/asistencia/:id", GetAsistenciaID);
asistenciaRouter.get("/asistencia/aprendiz/:idAprendiz", GetAsistenciaPorAprendiz);
asistenciaRouter.post("/asistencia", PostAsistencia);
asistenciaRouter.put("/asistencia/:id", PutAsistencia);
asistenciaRouter.delete("/asistencia/:id", DelateAsistencia);

export { asistenciaRouter };