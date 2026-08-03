import { Router } from "../Dependencies/dependencias.ts";
import {
  GetFicha,
  GetFichaID,
  PostFicha,
  PutFicha,
  DelateFicha,
} from "../Controller/fichaController.ts";

const fichaRouter = new Router();

fichaRouter.get("/ficha", GetFicha);
fichaRouter.get("/ficha/:id", GetFichaID);
fichaRouter.post("/ficha", PostFicha);
fichaRouter.put("/ficha/:id", PutFicha);
fichaRouter.delete("/ficha/:id", DelateFicha);

export { fichaRouter };