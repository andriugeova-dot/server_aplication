import { Router } from "../Dependencies/dependencias.ts";
import {
  GetAsignacionFicha,
  GetAsignacionFichaID,
  PostAsignacionFicha,
  PutAsignacionFicha,
  DelateAsignacionFicha,
} from "../Controller/asignacionFichaController.ts";

const asignacionFichaRouter = new Router();

asignacionFichaRouter.get("/asignacionFicha", GetAsignacionFicha);
asignacionFichaRouter.get("/asignacionFicha/:id", GetAsignacionFichaID);
asignacionFichaRouter.post("/asignacionFicha", PostAsignacionFicha);
asignacionFichaRouter.put("/asignacionFicha/:id", PutAsignacionFicha);
asignacionFichaRouter.delete("/asignacionFicha/:id", DelateAsignacionFicha);

export { asignacionFichaRouter };