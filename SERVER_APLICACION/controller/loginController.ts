import { bcrypt, create, getNumericDate } from "../Dependencies/dependencias.ts";
import { Usuario } from "../Model/usuario.ts";
import { loginSchema } from "../Validators/schemas.ts";
import { obtenerClaveJWT } from "../Middlewares/verificarToken.ts";

// deno-lint-ignore no-explicit-any
export async function login(ctx: any) {
  try {
    const body = await ctx.request.body.json();
    const datos = loginSchema.parse(body);

    const usuarioModel = new Usuario();
    const usuario = await usuarioModel.SeleccionarUsuarioPorCorreo(datos.correo);

    // Mismo mensaje tanto si el correo no existe como si la contraseña
    // es incorrecta, para no revelar qué correos están registrados.
    if (!usuario) {
      ctx.response.status = 401;
      ctx.response.body = { mensaje: "Correo o contraseña incorrectos" };
      return;
    }

    const passwordValida = bcrypt.compareSync(datos.password, usuario.password);
    if (!passwordValida) {
      ctx.response.status = 401;
      ctx.response.body = { mensaje: "Correo o contraseña incorrectos" };
      return;
    }

    const clave = await obtenerClaveJWT();
    const token = await create(
      { alg: "HS256", typ: "JWT" },
      {
        idUsuario: usuario.idUsuario,
        correo: usuario.correo,
        idRol: usuario.idRol,
        exp: getNumericDate(60 * 60 * 8), // el token expira en 8 horas
      },
      clave,
    );

    const { password: _password, ...usuarioSinPassword } = usuario;

    ctx.response.status = 200;
    ctx.response.body = {
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: usuarioSinPassword,
    };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al iniciar sesión", error: String(error) };
  }
}
