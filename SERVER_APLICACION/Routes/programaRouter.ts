import { Router } from "../Dependencies/dependencias.ts";
import {
  GetPrograma,
  GetProgramaID,
  PostPrograma,
  PutPrograma,
  DelatePrograma,
} from "../Controller/programaController.ts";

const programaRouter = new Router();

programaRouter.get("/programa", GetPrograma);
programaRouter.get("/programa/:id", GetProgramaID);
programaRouter.post("/programa", PostPrograma);
programaRouter.put("/programa/:id", PutPrograma);
programaRouter.delete("/programa/:id", DelatePrograma);

export { programaRouter };