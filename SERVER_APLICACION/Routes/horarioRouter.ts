import { Router } from "../Dependencies/dependencias.ts";
import { verificarToken, verificarRol } from "../Middlewares/verificarToken.ts";
import { GetHorario, GetHorarioID, PostHorario, PutHorario, DelateHorario } from "../controller/horarioController.ts";

const horarioRouter = new Router();
const ID_ROL_ADMIN = 3;

horarioRouter.get("/horario", verificarToken, GetHorario);
horarioRouter.get("/horario/:id", verificarToken, GetHorarioID);
horarioRouter.post("/horario", verificarToken, verificarRol(ID_ROL_ADMIN), PostHorario);
horarioRouter.put("/horario/:id", verificarToken, verificarRol(ID_ROL_ADMIN), PutHorario);
horarioRouter.delete("/horario/:id", verificarToken, verificarRol(ID_ROL_ADMIN), DelateHorario);

export { horarioRouter };
