import { Application, oakCors } from "./Dependencies/dependencies.ts";
import {usuarioRouter} from "./Routes/usuarioRouter.ts"
import {aprendizRouter} from "./Routes/aprendizRouter.ts"

const app = new Application();

app.use(oakCors({
    origin: "*"
}));

const routes = [usuarioRouter];

routes.forEach(router =>{
    app.use(router.routes());
    app.use(router.allowedMethods());
})

console.log("Servidor corriendo por el puerto 8002");

app.listen({port : 8002})