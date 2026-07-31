import { Router } from "../Dependencies/dependencies.ts";
import { login } from "../controller/loginController.ts";

const loginRouter = new Router();

loginRouter.post("/login", login);

export { loginRouter };
