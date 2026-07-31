import { Router } from "../Dependencies/dependencies.ts";
import { Programa } from "../Model/programa.ts";
import { programaSchema, programaUpdateSchema } from "../Validators/schemas.ts";

const programaRouter = new Router();

programaRouter.get("/programa", async (ctx) => {
  try {
    const programa = new Programa();
    ctx.response.status = 200;
    ctx.response.body = await programa.SeleccionarProgramas();
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener los programas", error: String(error) };
  }
});

programaRouter.get("/programa/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const programa = new Programa(null, id);
    const resultado = await programa.SeleccionarProgramaPorId();
    if (!resultado) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Programa no encontrado" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = resultado;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener el programa", error: String(error) };
  }
});

programaRouter.post("/programa", async (ctx) => {
  try {
    const body = await ctx.request.body.json();
    const datos = programaSchema.parse(body);
    const programa = new Programa({ idPrograma: null, ...datos });
    const idPrograma = await programa.InsertarPrograma();
    ctx.response.status = 201;
    ctx.response.body = { mensaje: "Programa creado correctamente", idPrograma };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al crear el programa", error: String(error) };
  }
});

programaRouter.put("/programa/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const body = await ctx.request.body.json();
    const datos = programaUpdateSchema.parse(body);

    const existente = new Programa(null, id);
    const actual = await existente.SeleccionarProgramaPorId();
    if (!actual) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Programa no encontrado" };
      return;
    }

    const programa = new Programa({ ...actual, ...datos, idPrograma: id }, id);
    const filasAfectadas = await programa.ActualizarPrograma();
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Programa actualizado correctamente", filasAfectadas };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al actualizar el programa", error: String(error) };
  }
});

programaRouter.delete("/programa/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const programa = new Programa(null, id);
    const filasAfectadas = await programa.EliminarPrograma();
    if (filasAfectadas === 0) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Programa no encontrado" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Programa eliminado correctamente" };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al eliminar el programa", error: String(error) };
  }
});

export { programaRouter };
