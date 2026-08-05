import { Context } from "../Dependencies/dependencias.ts";
import { Asistencia } from "../Model/asistencia.ts";
import { Aprendiz } from "../Model/aprendiz.ts";
import { AsignacionFicha } from "../Model/asignacionFicha.ts";
import { asistenciaSchema, asistenciaUpdateSchema } from "../Validators/schemas.ts";

const ID_ROL_ADMIN = 3;
const ID_ROL_INSTRUCTOR = 2;

/**
 * Un instructor solo puede registrar/editar asistencia de aprendices que
 * pertenecen a una ficha que tiene asignada (tabla asignacionficha).
 * El admin no tiene esta restricción.
 */
// deno-lint-ignore no-explicit-any
async function instructorPuedeMarcar(ctx: any, idAprendiz: number): Promise<boolean> {
  const usuario = ctx.state.usuario;
  if (usuario?.idRol === ID_ROL_ADMIN) return true;
  if (usuario?.idRol !== ID_ROL_INSTRUCTOR) return false;

  const aprendiz = new Aprendiz(null, idAprendiz);
  const datosAprendiz = await aprendiz.SeleccionarAprendizPorId();
  if (!datosAprendiz || !datosAprendiz.idFicha) return false;

  const asignacionFicha = new AsignacionFicha();
  const fichasInstructor = (await asignacionFicha.SeleccionarFichasInstructor(usuario.idUsuario)) as Array<{ idFicha: number }>;

  return fichasInstructor.some((f) => f.idFicha === datosAprendiz.idFicha);
}

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

    // Un aprendiz solo puede ver SU PROPIA asistencia, no la de otros.
    const usuario = ctx.state.usuario;
    if (usuario?.idRol === 1) {
      const aprendiz = new Aprendiz();
      const propio = await aprendiz.SeleccionarAprendizPorCorreo(usuario.correo);
      if (!propio || propio.idAprendiz !== idAprendiz) {
        ctx.response.status = 403;
        ctx.response.body = { mensaje: "No puedes consultar la asistencia de otro aprendiz" };
        return;
      }
    }

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

    if (!(await instructorPuedeMarcar(ctx, datos.idAprendiz))) {
      ctx.response.status = 403;
      ctx.response.body = { mensaje: "Solo puedes marcar asistencia de aprendices de tus fichas asignadas" };
      return;
    }

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

    const idAprendizAfectado = datos.idAprendiz ?? actual.idAprendiz;
    if (!(await instructorPuedeMarcar(ctx, idAprendizAfectado))) {
      ctx.response.status = 403;
      ctx.response.body = { mensaje: "Solo puedes editar asistencia de aprendices de tus fichas asignadas" };
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
