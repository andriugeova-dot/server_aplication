import { Application, oakCors } from "./Dependencies/dependencies.ts";
import { usuarioRouter } from "./Routes/usuarioRouter.ts";
import { aprendizRouter } from "./Routes/aprendizRouter.ts";
import { fichaRouter } from "./Routes/fichaRouter.ts";
import { programaRouter } from "./Routes/programaRouter.ts";
import { rolRouter } from "./Routes/rolRouter.ts";
import { asignaturaRouter } from "./Routes/asignaturaRouter.ts";
import { horarioRouter } from "./Routes/horarioRouter.ts";
import { hfaRouter } from "./Routes/hfaRouter.ts";
import { asignacionFichaRouter } from "./Routes/asignacionFichaRouter.ts";
import { asignacionUsuarioRouter } from "./Routes/asigancionUsuarioRouter.ts";
import { asistenciaRouter } from "./Routes/asistenciaRouter.ts";
import { loginRouter } from "./Routes/loginRouter.ts";

const app = new Application();

app.use(oakCors({
    origin: "*"
}));

const routes = [
    loginRouter,
    usuarioRouter,
    aprendizRouter,
    fichaRouter,
    programaRouter,
    rolRouter,
    asignaturaRouter,
    horarioRouter,
    hfaRouter,
    asignacionFichaRouter,
    asignacionUsuarioRouter,
    asistenciaRouter,
];

routes.forEach(router => {
    app.use(router.routes());
    app.use(router.allowedMethods());
});

console.log("Servidor corriendo por el puerto 8002");

app.listen({ port: 8002 });
