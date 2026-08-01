import { Router } from "../Dependencies/dependencias.ts";
import { Aprendiz } from "../Model/aprendiz.ts";
import { aprendizSchema, aprendizUpdateSchema } from "../Validators/schemas.ts";

const aprendizRouter = new Router();

aprendizRouter.get("/aprendiz", async (ctx) => {
  try {
    const aprendiz = new Aprendiz();
    ctx.response.status = 200;
    ctx.response.body = await aprendiz.SeleccionarAprendices();
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener los aprendices", error: String(error) };
  }
});

aprendizRouter.get("/aprendiz/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const aprendiz = new Aprendiz(null, id);
    const resultado = await aprendiz.SeleccionarAprendizPorId();
    if (!resultado) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Aprendiz no encontrado" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = resultado;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener el aprendiz", error: String(error) };
  }
});

aprendizRouter.post("/aprendiz", async (ctx) => {
  try {
    const body = await ctx.request.body.json();
    const datos = aprendizSchema.parse(body);
    const aprendiz = new Aprendiz({ idAprendiz: null, ...datos });
    const idAprendiz = await aprendiz.InsertarAprendiz();
    ctx.response.status = 201;
    ctx.response.body = { mensaje: "Aprendiz creado correctamente", idAprendiz };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al crear el aprendiz", error: String(error) };
  }
});

aprendizRouter.put("/aprendiz/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const body = await ctx.request.body.json();
    const datos = aprendizUpdateSchema.parse(body);

    const existente = new Aprendiz(null, id);
    const actual = await existente.SeleccionarAprendizPorId();
    if (!actual) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Aprendiz no encontrado" };
      return;
    }

    const aprendiz = new Aprendiz({ ...actual, ...datos, idAprendiz: id }, id);
    const filasAfectadas = await aprendiz.ActualizarAprendiz();
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Aprendiz actualizado correctamente", filasAfectadas };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al actualizar el aprendiz", error: String(error) };
  }
});

aprendizRouter.delete("/aprendiz/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const aprendiz = new Aprendiz(null, id);
    const filasAfectadas = await aprendiz.EliminarAprendiz();
    if (filasAfectadas === 0) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Aprendiz no encontrado" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Aprendiz eliminado correctamente" };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al eliminar el aprendiz", error: String(error) };
  }
});

export { aprendizRouter };
