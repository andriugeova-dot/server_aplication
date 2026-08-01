import { bcrypt, create, getNumericDate } from "../Dependencies/dependencias.ts";
import { Usuario } from "../Model/usuario.ts";
import { registroSchema } from "../Validators/schemas.ts";
import { obtenerClaveJWT } from "../Middlewares/verificarToken.ts";

// El registro público siempre crea cuentas con el rol "aprendiz" (idRol = 1,
// según el volcado de la tabla `rol`). Crear usuarios con otros roles
// (instructor, admin) debe seguir haciéndose por el endpoint protegido
// POST /usuario (requiere token + rol admin).
const ID_ROL_APRENDIZ = 1;

// deno-lint-ignore no-explicit-any
export async function registro(ctx: any) {
  try {
    const body = await ctx.request.body.json();
    const datos = registroSchema.parse(body);

    const usuarioModel = new Usuario();
    const existente = await usuarioModel.SeleccionarUsuarioPorCorreo(datos.correo);
    if (existente) {
      ctx.response.status = 409;
      ctx.response.body = { mensaje: "Ya existe una cuenta registrada con ese correo" };
      return;
    }

    const passwordHasheada = bcrypt.hashSync(datos.password);

    const nuevoUsuario = new Usuario({
      idUsuario: null,
      nombre: datos.nombre,
      apellido: datos.apellido,
      correo: datos.correo,
      password: passwordHasheada,
      idRol: ID_ROL_APRENDIZ,
    });
    const idUsuario = await nuevoUsuario.InsertarUsuario();

    // Se inicia sesión automáticamente tras el registro, igual que en /login,
    // para que el cliente reciba el token sin tener que pedirlo aparte.
    const clave = await obtenerClaveJWT();
    const token = await create(
      { alg: "HS256", typ: "JWT" },
      {
        idUsuario,
        correo: datos.correo,
        idRol: ID_ROL_APRENDIZ,
        exp: getNumericDate(60 * 60 * 8), // 8 horas, igual que en login
      },
      clave,
    );

    ctx.response.status = 201;
    ctx.response.body = {
      mensaje: "Cuenta creada correctamente",
      token,
      usuario: {
        idUsuario,
        nombre: datos.nombre,
        apellido: datos.apellido,
        correo: datos.correo,
        idRol: ID_ROL_APRENDIZ,
      },
    };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al registrar la cuenta", error: String(error) };
  }
}
