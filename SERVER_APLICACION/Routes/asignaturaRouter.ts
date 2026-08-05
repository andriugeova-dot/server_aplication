import { Router } from "../Dependencies/dependencias.ts";
import { verificarToken, verificarRol } from "../Middlewares/verificarToken.ts";
import { GetAsignatura, GetAsignaturaID, PostAsignatura, PutAsignatura, DelateAsignatura } from "../Controller/asignaturaController.ts";

const asignaturaRouter = new Router();
const ID_ROL_ADMIN = 3;

asignaturaRouter.get("/asignatura", verificarToken, GetAsignatura);
asignaturaRouter.get("/asignatura/:id", verificarToken, GetAsignaturaID);
asignaturaRouter.post("/asignatura", verificarToken, verificarRol(ID_ROL_ADMIN), PostAsignatura);
asignaturaRouter.put("/asignatura/:id", verificarToken, verificarRol(ID_ROL_ADMIN), PutAsignatura);
asignaturaRouter.delete("/asignatura/:id", verificarToken, verificarRol(ID_ROL_ADMIN), DelateAsignatura);

export { asignaturaRouter };
