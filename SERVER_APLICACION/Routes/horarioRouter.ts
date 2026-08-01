import { Router } from "../Dependencies/dependencias.ts";
import { Horario } from "../Model/horario.ts";
import { horarioSchema, horarioUpdateSchema } from "../Validators/schemas.ts";

const horarioRouter = new Router();

horarioRouter.get("/horario", async (ctx) => {
  try {
    const horario = new Horario();
    ctx.response.status = 200;
    ctx.response.body = await horario.SeleccionarHorarios();
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener los horarios", error: String(error) };
  }
});

horarioRouter.get("/horario/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const horario = new Horario(null, id);
    const resultado = await horario.SeleccionarHorarioPorId();
    if (!resultado) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Horario no encontrado" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = resultado;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener el horario", error: String(error) };
  }
});

horarioRouter.post("/horario", async (ctx) => {
  try {
    const body = await ctx.request.body.json();
    const datos = horarioSchema.parse(body);
    const horario = new Horario({ idHorario: null, ...datos });
    const idHorario = await horario.InsertarHorario();
    ctx.response.status = 201;
    ctx.response.body = { mensaje: "Horario creado correctamente", idHorario };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al crear el horario", error: String(error) };
  }
});

horarioRouter.put("/horario/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const body = await ctx.request.body.json();
    const datos = horarioUpdateSchema.parse(body);

    const existente = new Horario(null, id);
    const actual = await existente.SeleccionarHorarioPorId();
    if (!actual) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Horario no encontrado" };
      return;
    }

    const horario = new Horario({ ...actual, ...datos, idHorario: id }, id);
    const filasAfectadas = await horario.ActualizarHorario();
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Horario actualizado correctamente", filasAfectadas };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al actualizar el horario", error: String(error) };
  }
});

horarioRouter.delete("/horario/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const horario = new Horario(null, id);
    const filasAfectadas = await horario.EliminarHorario();
    if (filasAfectadas === 0) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Horario no encontrado" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Horario eliminado correctamente" };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al eliminar el horario", error: String(error) };
  }
});

export { horarioRouter };
