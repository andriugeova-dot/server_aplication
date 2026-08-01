import { verify } from "../Dependencies/dependencias.ts";

const encoder = new TextEncoder();
let claveJWT: CryptoKey | null = null;

/**
 * Obtiene (y cachea) la CryptoKey usada para firmar y verificar los JWT.
 * El secreto se toma de la variable de entorno JWT_SECRET.
 * IMPORTANTE: en producción define JWT_SECRET con un valor largo y aleatorio.
 */
export async function obtenerClaveJWT(): Promise<CryptoKey> {
  if (claveJWT) return claveJWT;

  const secreto = Deno.env.get("JWT_SECRET") ??
    "cambia_esta_clave_secreta_en_produccion";

  claveJWT = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secreto),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );

  return claveJWT;
}

/**
 * Middleware que exige un JWT válido en el header Authorization: Bearer <token>.
 * Si es válido, guarda el payload (idUsuario, correo, idRol) en ctx.state.usuario.
 */
// deno-lint-ignore no-explicit-any
export async function verificarToken(ctx: any, next: () => Promise<unknown>) {
  const authHeader = ctx.request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    ctx.response.status = 401;
    ctx.response.body = { mensaje: "Token no proporcionado" };
    return;
  }

  const token = authHeader.slice("Bearer ".length).trim();

  try {
    const clave = await obtenerClaveJWT();
    const payload = await verify(token, clave);
    ctx.state.usuario = payload;
    await next();
  } catch (_error) {
    ctx.response.status = 401;
    ctx.response.body = { mensaje: "Token inválido o expirado" };
  }
}

/**
 * Middleware factory para restringir una ruta a ciertos roles.
 * Debe usarse siempre DESPUÉS de verificarToken.
 * Ejemplo: rolRouter.post("/rol", verificarToken, verificarRol(3), handler)
 */
export function verificarRol(...rolesPermitidos: number[]) {
  // deno-lint-ignore no-explicit-any
  return async (ctx: any, next: () => Promise<unknown>) => {
    const usuario = ctx.state.usuario;

    if (!usuario || !rolesPermitidos.includes(usuario.idRol)) {
      ctx.response.status = 403;
      ctx.response.body = { mensaje: "No tienes permisos para realizar esta acción" };
      return;
    }

    await next();
  };
}
