import { Router } from "../Dependencies/dependencias.ts";
import {
  GetAsignatura,
  GetAsignaturaID,
  PostAsignatura,
  PutAsignatura,
  DelateAsignatura,
} from "../Controller/asignaturaController.ts";

const asignaturaRouter = new Router();

asignaturaRouter.get("/asignatura", GetAsignatura);
asignaturaRouter.get("/asignatura/:id", GetAsignaturaID);
asignaturaRouter.post("/asignatura", PostAsignatura);
asignaturaRouter.put("/asignatura/:id", PutAsignatura);
asignaturaRouter.delete("/asignatura/:id", DelateAsignatura);

export { asignaturaRouter };