import { Router } from "../Dependencies/dependencias.ts";
import { Rol } from "../Model/rol.ts";
import { rolSchema, rolUpdateSchema } from "../Validators/schemas.ts";
import { verificarToken, verificarRol } from "../Middlewares/verificarToken.ts";

const rolRouter = new Router();
const ID_ROL_ADMIN = 3;

rolRouter.get("/rol", async (ctx) => {
  try {
    const rol = new Rol();
    ctx.response.status = 200;
    ctx.response.body = await rol.SeleccionarRoles();
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener los roles", error: String(error) };
  }
});

rolRouter.get("/rol/:id", async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const rol = new Rol(null, id);
    const resultado = await rol.SeleccionarRolPorId();
    if (!resultado) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Rol no encontrado" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = resultado;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener el rol", error: String(error) };
  }
});

rolRouter.post("/rol", verificarToken, verificarRol(ID_ROL_ADMIN), async (ctx) => {
  try {
    const body = await ctx.request.body.json();
    const datos = rolSchema.parse(body);
    const rol = new Rol({ idRol: null, ...datos });
    const idRol = await rol.InsertarRol();
    ctx.response.status = 201;
    ctx.response.body = { mensaje: "Rol creado correctamente", idRol };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al crear el rol", error: String(error) };
  }
});

rolRouter.put("/rol/:id", verificarToken, verificarRol(ID_ROL_ADMIN), async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const body = await ctx.request.body.json();
    const datos = rolUpdateSchema.parse(body);

    const existente = new Rol(null, id);
    const actual = await existente.SeleccionarRolPorId();
    if (!actual) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Rol no encontrado" };
      return;
    }

    const rol = new Rol({ ...actual, ...datos, idRol: id }, id);
    const filasAfectadas = await rol.ActualizarRol();
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Rol actualizado correctamente", filasAfectadas };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { mensaje: "Error al actualizar el rol", error: String(error) };
  }
});

rolRouter.delete("/rol/:id", verificarToken, verificarRol(ID_ROL_ADMIN), async (ctx) => {
  try {
    const id = Number(ctx.params.id);
    const rol = new Rol(null, id);
    const filasAfectadas = await rol.EliminarRol();
    if (filasAfectadas === 0) {
      ctx.response.status = 404;
      ctx.response.body = { mensaje: "Rol no encontrado" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Rol eliminado correctamente" };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al eliminar el rol", error: String(error) };
  }
});

export { rolRouter };
