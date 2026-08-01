import { Router } from "../Dependencies/dependencias.ts";
import { HFA } from "../Model/hfa.ts";
import { hfaSchema, hfaUpdateSchema } from "../Validators/schemas.ts";

const hfaRouter = new Router();

hfaRouter.get("/hfa", async (ctx) => {
  try {
    const hfa = new HFA();
    ctx.response.status = 200;
    ctx.response.body = await hfa.SeleccionarHFA();
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener los registros de hfa", error: String(error) };
  }
});

hfaRouter.get("/hfa/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const hfa = new HFA(null, id);
    const resultado = await hfa.SeleccionarHFAPorId();
    if (!resultado) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Registro de hfa no encontrado" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = resultado;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener el registro de hfa", error: String(error) };
  }
});

hfaRouter.post("/hfa", async (ctx) => {
  try {
    const body = await ctx.request.body.json();
    const datos = hfaSchema.parse(body);
    const hfa = new HFA({ idHFA: null, ...datos });
    const idHFA = await hfa.InsertarHFA();
    ctx.response.status = 201;
    ctx.response.body = { mensaje: "Registro de hfa creado correctamente", idHFA };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al crear el registro de hfa", error: String(error) };
  }
});

hfaRouter.put("/hfa/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const body = await ctx.request.body.json();
    const datos = hfaUpdateSchema.parse(body);

    const existente = new HFA(null, id);
    const actual = await existente.SeleccionarHFAPorId();
    if (!actual) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Registro de hfa no encontrado" };
      return;
    }

    const hfa = new HFA({ ...actual, ...datos, idHFA: id }, id);
    const filasAfectadas = await hfa.ActualizarHFA();
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Registro de hfa actualizado correctamente", filasAfectadas };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al actualizar el registro de hfa", error: String(error) };
  }
});

hfaRouter.delete("/hfa/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const hfa = new HFA(null, id);
    const filasAfectadas = await hfa.EliminarHFA();
    if (filasAfectadas === 0) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Registro de hfa no encontrado" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Registro de hfa eliminado correctamente" };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al eliminar el registro de hfa", error: String(error) };
  }
});

export { hfaRouter };
