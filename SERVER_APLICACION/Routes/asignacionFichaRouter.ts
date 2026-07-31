import { Router } from "../Dependencies/dependencies.ts";
import { AsignacionFicha } from "../Model/asignacionFicha.ts";
import { asignacionFichaSchema, asignacionFichaUpdateSchema } from "../Validators/schemas.ts";

const asignacionFichaRouter = new Router();

asignacionFichaRouter.get("/asignacionFicha", async (ctx) => {
  try {
    const asignacionFicha = new AsignacionFicha();
    ctx.response.status = 200;
    ctx.response.body = await asignacionFicha.SeleccionarAsignacionesFicha();
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener las asignaciones de ficha", error: String(error) };
  }
});

asignacionFichaRouter.get("/asignacionFicha/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const asignacionFicha = new AsignacionFicha(null, id);
    const resultado = await asignacionFicha.SeleccionarAsignacionFichaPorId();
    if (!resultado) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Asignación de ficha no encontrada" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = resultado;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener la asignación de ficha", error: String(error) };
  }
});

asignacionFichaRouter.post("/asignacionFicha", async (ctx) => {
  try {
    const body = await ctx.request.body.json();
    const datos = asignacionFichaSchema.parse(body);
    const asignacionFicha = new AsignacionFicha({ idAsignacionFicha: null, ...datos });
    const idAsignacionFicha = await asignacionFicha.InsertarAsignacionFicha();
    ctx.response.status = 201;
    ctx.response.body = { mensaje: "Asignación de ficha creada correctamente", idAsignacionFicha };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al crear la asignación de ficha", error: String(error) };
  }
});

asignacionFichaRouter.put("/asignacionFicha/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const body = await ctx.request.body.json();
    const datos = asignacionFichaUpdateSchema.parse(body);

    const existente = new AsignacionFicha(null, id);
    const actual = await existente.SeleccionarAsignacionFichaPorId();
    if (!actual) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Asignación de ficha no encontrada" };
      return;
    }

    const asignacionFicha = new AsignacionFicha({ ...actual, ...datos, idAsignacionFicha: id }, id);
    const filasAfectadas = await asignacionFicha.ActualizarAsignacionFicha();
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Asignación de ficha actualizada correctamente", filasAfectadas };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al actualizar la asignación de ficha", error: String(error) };
  }
});

asignacionFichaRouter.delete("/asignacionFicha/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const asignacionFicha = new AsignacionFicha(null, id);
    const filasAfectadas = await asignacionFicha.EliminarAsignacionFicha();
    if (filasAfectadas === 0) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Asignación de ficha no encontrada" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Asignación de ficha eliminada correctamente" };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al eliminar la asignación de ficha", error: String(error) };
  }
});

export { asignacionFichaRouter };
