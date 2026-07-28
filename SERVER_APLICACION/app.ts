import { Application, oakCors } from "./Dependencies/dependencies.ts";
import {UserRouter} from "./Routes/userRouter.ts"

const app = new Application();

app.use(oakCors({
    origin: "*"
}));

const routes = [UserRouter];

routes.forEach(router =>{
    app.use(router.routes());
    app.use(router.allowedMethods());
})

console.log("Servidor corriendo por el puerto 8002");

app.listen({port : 8002})