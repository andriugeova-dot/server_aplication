import { Router } from "../Dependencies/dependencias.ts";
import {
  GetHFA,
  GetHFAID,
  PostHFA,
  PutHFA,
  DelateHFA,
} from "../Controller/hfaController.ts";

const hfaRouter = new Router();

hfaRouter.get("/hfa", GetHFA);
hfaRouter.get("/hfa/:id", GetHFAID);
hfaRouter.post("/hfa", PostHFA);
hfaRouter.put("/hfa/:id", PutHFA);
hfaRouter.delete("/hfa/:id", DelateHFA);

export { hfaRouter };