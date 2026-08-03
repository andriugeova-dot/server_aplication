import { Context } from "../Dependencies/dependencias.ts";
import { Ficha } from "../Model/ficha.ts";
import { fichaSchema, fichaUpdateSchema } from "../Validators/schemas.ts";

export const GetFicha = async (ctx: Context) => {
  try {
    const ficha = new Ficha();
    ctx.response.status = 200;
    ctx.response.body = await ficha.SeleccionarFichas();
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener las fichas", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const GetFichaID = async (ctx: any) => {
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
};

// deno-lint-ignore no-explicit-any
export const PostFicha = async (ctx: any) => {
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
};

// deno-lint-ignore no-explicit-any
export const PutFicha = async (ctx: any) => {
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
};

// deno-lint-ignore no-explicit-any
export const DelateFicha = async (ctx: any) => {
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
};