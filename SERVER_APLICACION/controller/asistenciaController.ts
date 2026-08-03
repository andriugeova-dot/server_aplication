import { Context } from "../Dependencies/dependencias.ts";
import { Asistencia } from "../Model/asistencia.ts";
import { asistenciaSchema, asistenciaUpdateSchema } from "../Validators/schemas.ts";

export const GetAsistencia = async (ctx: Context) => {
  try {
    const asistencia = new Asistencia();
    ctx.response.status = 200;
    ctx.response.body = await asistencia.SeleccionarAsistencias();
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener las asistencias", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const GetAsistenciaID = async (ctx: any) => {
  try {
    const id = Number(ctx.params.id);
    const asistencia = new Asistencia(null, id);
    const resultado = await asistencia.SeleccionarAsistenciaPorId();
    if (!resultado) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Asistencia no encontrada" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = resultado;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener la asistencia", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const GetAsistenciaPorAprendiz = async (ctx: any) => {
  try {
    const idAprendiz = Number(ctx.params.idAprendiz);
    const asistencia = new Asistencia();
    ctx.response.status = 200;
    ctx.response.body = await asistencia.SeleccionarAsistenciasPorAprendiz(idAprendiz);
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener las asistencias del aprendiz", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const PostAsistencia = async (ctx: any) => {
  try {
    const body = await ctx.request.body.json();
    const datos = asistenciaSchema.parse(body);
    const asistencia = new Asistencia({ idAsistencia: null, estado: "Presente", ...datos });
    const idAsistencia = await asistencia.InsertarAsistencia();
    ctx.response.status = 201;
    ctx.response.body = { mensaje: "Asistencia registrada correctamente", idAsistencia };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al registrar la asistencia", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const PutAsistencia = async (ctx: any) => {
  try {
    const id = Number(ctx.params.id);
    const body = await ctx.request.body.json();
    const datos = asistenciaUpdateSchema.parse(body);

    const existente = new Asistencia(null, id);
    const actual = await existente.SeleccionarAsistenciaPorId();
    if (!actual) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Asistencia no encontrada" };
      return;
    }

    const asistencia = new Asistencia({ ...actual, ...datos, idAsistencia: id }, id);
    const filasAfectadas = await asistencia.ActualizarAsistencia();
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Asistencia actualizada correctamente", filasAfectadas };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al actualizar la asistencia", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const DelateAsistencia = async (ctx: any) => {
  try {
    const id = Number(ctx.params.id);
    const asistencia = new Asistencia(null, id);
    const filasAfectadas = await asistencia.EliminarAsistencia();
    if (filasAfectadas === 0) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Asistencia no encontrada" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Asistencia eliminada correctamente" };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al eliminar la asistencia", error: String(error) };
  }
};