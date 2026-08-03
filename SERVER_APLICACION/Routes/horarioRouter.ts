import { Router } from "../Dependencies/dependencias.ts";
import {
  GetHorario,
  GetHorarioID,
  PostHorario,
  PutHorario,
  DelateHorario,
} from "../Controller/horarioController.ts";

const horarioRouter = new Router();

horarioRouter.get("/horario", GetHorario);
horarioRouter.get("/horario/:id", GetHorarioID);
horarioRouter.post("/horario", PostHorario);
horarioRouter.put("/horario/:id", PutHorario);
horarioRouter.delete("/horario/:id", DelateHorario);

export { horarioRouter };