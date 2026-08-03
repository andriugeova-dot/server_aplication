import { Router } from "../Dependencies/dependencias.ts";
import { GetAprendiz, GetAprendizID, PostAprendiz, PutAprendiz, DelateAprendiz } from "../Controller/aprendizController.ts";

const aprendizRouter = new Router();

aprendizRouter.get("/aprendiz", GetAprendiz);
aprendizRouter.get("/aprendiz/:id", GetAprendizID);
aprendizRouter.post("/aprendiz", PostAprendiz);
aprendizRouter.put("/aprendiz/:id", PutAprendiz);
aprendizRouter.delete("/aprendiz/:id", DelateAprendiz);

export { aprendizRouter };