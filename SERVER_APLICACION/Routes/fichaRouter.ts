import { Router } from "../Dependencies/dependencies.ts";
import { Ficha } from "../Model/ficha.ts";
import { fichaSchema, fichaUpdateSchema } from "../Validators/schemas.ts";

const fichaRouter = new Router();

fichaRouter.get("/ficha", async (ctx) => {
  try {
    const ficha = new Ficha();
    ctx.response.status = 200;
    ctx.response.body = await ficha.SeleccionarFichas();
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener las fichas", error: String(error) };
  }
});

fichaRouter.get("/ficha/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const ficha = new Ficha(null, id);
    const resultado = await ficha.SeleccionarFichaPorId();
    if (!resultado) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Ficha no encontrada" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = resultado;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener la ficha", error: String(error) };
  }
});

fichaRouter.post("/ficha", async (ctx) => {
  try {
    const body = await ctx.request.body.json();
    const datos = fichaSchema.parse(body);
    const ficha = new Ficha({ idFicha: null, ...datos });
    const idFicha = await ficha.InsertarFicha();
    ctx.response.status = 201;
    ctx.response.body = { mensaje: "Ficha creada correctamente", idFicha };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al crear la ficha", error: String(error) };
  }
});

fichaRouter.put("/ficha/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const body = await ctx.request.body.json();
    const datos = fichaUpdateSchema.parse(body);

    const existente = new Ficha(null, id);
    const actual = await existente.SeleccionarFichaPorId();
    if (!actual) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Ficha no encontrada" };
      return;
    }

    const ficha = new Ficha({ ...actual, ...datos, idFicha: id }, id);
    const filasAfectadas = await ficha.ActualizarFicha();
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Ficha actualizada correctamente", filasAfectadas };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al actualizar la ficha", error: String(error) };
  }
});

fichaRouter.delete("/ficha/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const ficha = new Ficha(null, id);
    const filasAfectadas = await ficha.EliminarFicha();
    if (filasAfectadas === 0) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Ficha no encontrada" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Ficha eliminada correctamente" };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al eliminar la ficha", error: String(error) };
  }
});

export { fichaRouter };
