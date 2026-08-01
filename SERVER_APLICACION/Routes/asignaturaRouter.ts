import { Router } from "../Dependencies/dependencias.ts";
import { Asignatura } from "../Model/asignatura.ts";
import { asignaturaSchema, asignaturaUpdateSchema } from "../Validators/schemas.ts";

const asignaturaRouter = new Router();

asignaturaRouter.get("/asignatura", async (ctx) => {
  try {
    const asignatura = new Asignatura();
    ctx.response.status = 200;
    ctx.response.body = await asignatura.SeleccionarAsignaturas();
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener las asignaturas", error: String(error) };
  }
});

asignaturaRouter.get("/asignatura/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const asignatura = new Asignatura(null, id);
    const resultado = await asignatura.SeleccionarAsignaturaPorId();
    if (!resultado) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Asignatura no encontrada" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = resultado;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener la asignatura", error: String(error) };
  }
});

asignaturaRouter.post("/asignatura", async (ctx) => {
  try {
    const body = await ctx.request.body.json();
    const datos = asignaturaSchema.parse(body);
    const asignatura = new Asignatura({ idAsignatura: null, ...datos });
    const idAsignatura = await asignatura.InsertarAsignatura();
    ctx.response.status = 201;
    ctx.response.body = { mensaje: "Asignatura creada correctamente", idAsignatura };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al crear la asignatura", error: String(error) };
  }
});

asignaturaRouter.put("/asignatura/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const body = await ctx.request.body.json();
    const datos = asignaturaUpdateSchema.parse(body);

    const existente = new Asignatura(null, id);
    const actual = await existente.SeleccionarAsignaturaPorId();
    if (!actual) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Asignatura no encontrada" };
      return;
    }

    const asignatura = new Asignatura({ ...actual, ...datos, idAsignatura: id }, id);
    const filasAfectadas = await asignatura.ActualizarAsignatura();
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Asignatura actualizada correctamente", filasAfectadas };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al actualizar la asignatura", error: String(error) };
  }
});

asignaturaRouter.delete("/asignatura/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const asignatura = new Asignatura(null, id);
    const filasAfectadas = await asignatura.EliminarAsignatura();
    if (filasAfectadas === 0) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Asignatura no encontrada" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Asignatura eliminada correctamente" };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al eliminar la asignatura", error: String(error) };
  }
});

export { asignaturaRouter };
