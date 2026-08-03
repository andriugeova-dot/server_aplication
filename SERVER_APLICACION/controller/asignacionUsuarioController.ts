import { Context } from "../Dependencies/dependencias.ts";
import { AsignacionUsuario } from "../Model/asignacionUsuario.ts";
import { asignacionUsuarioSchema, asignacionUsuarioUpdateSchema } from "../Validators/schemas.ts";

export const GetAsignacionUsuario = async (ctx: Context) => {
  try {
    const asignacionUsuario = new AsignacionUsuario();
    ctx.response.status = 200;
    ctx.response.body = await asignacionUsuario.SeleccionarAsignacionesUsuario();
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener las asignaciones de usuario", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const GetAsignacionUsuarioID = async (ctx: any) => {
  try {
    const id = Number(ctx.params.id);
    const asignacionUsuario = new AsignacionUsuario(null, id);
    const resultado = await asignacionUsuario.SeleccionarAsignacionUsuarioPorId();
    if (!resultado) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Asignación de usuario no encontrada" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = resultado;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener la asignación de usuario", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const PostAsignacionUsuario = async (ctx: any) => {
  try {
    const body = await ctx.request.body.json();
    const datos = asignacionUsuarioSchema.parse(body);
    const asignacionUsuario = new AsignacionUsuario({ idAsignacionUsuario: null, ...datos });
    const idAsignacionUsuario = await asignacionUsuario.InsertarAsignacionUsuario();
    ctx.response.status = 201;
    ctx.response.body = { mensaje: "Asignación de usuario creada correctamente", idAsignacionUsuario };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al crear la asignación de usuario", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const PutAsignacionUsuario = async (ctx: any) => {
  try {
    const id = Number(ctx.params.id);
    const body = await ctx.request.body.json();
    const datos = asignacionUsuarioUpdateSchema.parse(body);

    const existente = new AsignacionUsuario(null, id);
    const actual = await existente.SeleccionarAsignacionUsuarioPorId();
    if (!actual) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Asignación de usuario no encontrada" };
      return;
    }

    const asignacionUsuario = new AsignacionUsuario({ ...actual, ...datos, idAsignacionUsuario: id }, id);
    const filasAfectadas = await asignacionUsuario.ActualizarAsignacionUsuario();
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Asignación de usuario actualizada correctamente", filasAfectadas };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al actualizar la asignación de usuario", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const DelateAsignacionUsuario = async (ctx: any) => {
  try {
    const id = Number(ctx.params.id);
    const asignacionUsuario = new AsignacionUsuario(null, id);
    const filasAfectadas = await asignacionUsuario.EliminarAsignacionUsuario();
    if (filasAfectadas === 0) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Asignación de usuario no encontrada" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Asignación de usuario eliminada correctamente" };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al eliminar la asignación de usuario", error: String(error) };
  }
};