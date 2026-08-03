import { Router } from "../Dependencies/dependencias.ts";
import { registro } from "../controller/registroController.ts";

const registroRouter = new Router();

// Ruta pública: no lleva verificarToken porque es justamente para
// que alguien SIN cuenta pueda crear una.
registroRouter.post("/registro", registro);

export { registroRouter };
