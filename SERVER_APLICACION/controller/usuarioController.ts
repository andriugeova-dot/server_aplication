import { Context, bcrypt } from "../Dependencies/dependencias.ts";
import { Usuario } from "../Model/usuario.ts";
import { usuarioSchema, usuarioUpdateSchema } from "../Validators/schemas.ts";

// Nunca devolvemos la contraseña en las respuestas
// deno-lint-ignore no-explicit-any
export function ocultarPassword(usuario: any) {
  if (!usuario) return usuario;
  const { password: _password, ...resto } = usuario;
  return resto;
}

// deno-lint-ignore no-explicit-any
export const GetUsuario = async (ctx: any) => {
  try {
    const usuario = new Usuario();
    const usuarios = await usuario.SeleccionarUsuarios();
    ctx.response.status = 200;
    ctx.response.body = usuarios.map(ocultarPassword);
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener los usuarios", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const GetUsuarioID = async (ctx: any) => {
  try {
    const id = Number(ctx.params.id);
    const usuario = new Usuario(null, id);
    const resultado = await usuario.SeleccionarUsuarioPorId();
    if (!resultado) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Usuario no encontrado" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = ocultarPassword(resultado);
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener el usuario", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const GetUsuarioPorRol = async (ctx: any) => {
  try {
    const idRol = Number(ctx.params.idRol);
    const usuario = new Usuario();
    const usuarios = await usuario.SeleccionarUsuariosPorRol(idRol);
    ctx.response.status = 200;
    ctx.response.body = usuarios.map(ocultarPassword);
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener los usuarios por rol", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const PostUsuario = async (ctx: any) => {
  try {
    const body = await ctx.request.body.json();
    const datos = usuarioSchema.parse(body);

    const usuarioModel = new Usuario();
    const existente = await usuarioModel.SeleccionarUsuarioPorCorreo(datos.correo);
    if (existente) {
      ctx.response.status = 409;
      ctx.response.body = { mensaje: "Ya existe un usuario con ese correo" };
      return;
    }

    const passwordHasheada = bcrypt.hashSync(datos.password);
    const usuario = new Usuario({ idUsuario: null, ...datos, password: passwordHasheada });
    const idUsuario = await usuario.InsertarUsuario();
    ctx.response.status = 201;
    ctx.response.body = { mensaje: "Usuario creado correctamente", idUsuario };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al crear el usuario", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const PutUsuario = async (ctx: any) => {
  try {
    const id = Number(ctx.params.id);
    const body = await ctx.request.body.json();
    const datos = usuarioUpdateSchema.parse(body);

    const existente = new Usuario(null, id);
    const actual = await existente.SeleccionarUsuarioPorId();
    if (!actual) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Usuario no encontrado" };
      return;
    }

    // Si viene una nueva contraseña en la actualización, se hashea antes de guardar
    const passwordFinal = datos.password ? bcrypt.hashSync(datos.password) : actual.password;

    const usuario = new Usuario(
      { ...actual, ...datos, password: passwordFinal, idUsuario: id },
      id,
    );
    const filasAfectadas = await usuario.ActualizarUsuario();
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Usuario actualizado correctamente", filasAfectadas };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al actualizar el usuario", error: String(error) };
  }
};

// deno-lint-ignore no-explicit-any
export const DelateUsuario = async (ctx: any) => {
  try {
    const id = Number(ctx.params.id);
    const usuario = new Usuario(null, id);
    const filasAfectadas = await usuario.EliminarUsuario();
    if (filasAfectadas === 0) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Usuario no encontrado" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Usuario eliminado correctamente" };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al eliminar el usuario", error: String(error) };
  }
};