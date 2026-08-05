import { Context } from "../Dependencies/dependencias.ts";
import { Aprendiz } from "../Model/aprendiz.ts";
import { Usuario } from "../Model/usuario.ts";
import { aprendizSchema, aprendizUpdateSchema } from "../Validators/schemas.ts";

const ID_ROL_APRENDIZ = 1;

export const GetAprendiz = async (ctx: Context) => {
  try {
    const aprendiz = new Aprendiz();
    ctx.response.status = 200;
    ctx.response.body = await aprendiz.SeleccionarAprendices();
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener los aprendices", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const GetAprendizID = async (ctx: any) => {
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
};

// deno-lint-ignore no-explicit-any
export const GetAprendizMiPerfil = async (ctx: any) => {
  try {
    const correo = ctx.state.usuario?.correo;
    if (!correo) {
      ctx.response.status = 401;
      ctx.response.body = { mensaje: "Token inválido" };
      return;
    }
    const aprendiz = new Aprendiz();
    const resultado = await aprendiz.SeleccionarAprendizPorCorreo(correo);
    if (!resultado) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Todavía no tienes un perfil de aprendiz asociado. Contacta a un administrador." };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = resultado;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener tu perfil de aprendiz", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const GetAprendizPorFicha = async (ctx: any) => {
  try {
    const idFicha = Number(ctx.params.idFicha);
    const aprendiz = new Aprendiz(null, idFicha);
    const resultado = await aprendiz.Seleccionarporficha();
    ctx.response.status = 200;
    ctx.response.body = resultado;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener los aprendices de la ficha", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const PostAprendiz = async (ctx: any) => {
  try {
    const body = await ctx.request.body.json();
    const datos = aprendizSchema.parse(body);

    // El usuario debe existir y tener rol "aprendiz" (idRol = 1); si no,
    // estaríamos creando una ficha de aprendiz para un admin/instructor.
    const usuarioModel = new Usuario(null, datos.idUsuario);
    const usuarioVinculado = await usuarioModel.SeleccionarUsuarioPorId();
    if (!usuarioVinculado) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "El usuario indicado no existe" };
      return;
    }
    if (usuarioVinculado.idRol !== ID_ROL_APRENDIZ) {
      ctx.response.status = 400;
      ctx.response.body = { mensaje: "El usuario indicado no tiene rol de aprendiz" };
      return;
    }

    // Un usuario no puede tener dos fichas de aprendiz (la BD también lo
    // impide con una UNIQUE KEY; esto solo da un mensaje más claro).
    const aprendizModel = new Aprendiz();
    const yaExiste = await aprendizModel.SeleccionarAprendizPorIdUsuario(datos.idUsuario);
    if (yaExiste) {
      ctx.response.status = 409;
      ctx.response.body = { mensaje: "Ese usuario ya tiene una ficha de aprendiz asociada" };
      return;
    }

    const aprendiz = new Aprendiz({ idAprendiz: null, ...datos });
    const idAprendiz = await aprendiz.InsertarAprendiz();
    ctx.response.status = 201;
    ctx.response.body = { mensaje: "Aprendiz creado correctamente", idAprendiz };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al crear el aprendiz", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const PutAprendiz = async (ctx: any) => {
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
};

// deno-lint-ignore no-explicit-any
export const DelateAprendiz = async (ctx: any) => {
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
};