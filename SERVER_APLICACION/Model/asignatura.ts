import { conexion } from "./conexion.ts";

interface asignaturaData {
  idAsignatura: number | null;
  nombreAsignatura: string;
  descripcion?: string;
}

export class Asignatura {
  public _ObjAsignatura: asignaturaData | null;
  public _idAsignatura: number | null;

  constructor(ObjAsignatura: asignaturaData | null = null, idAsignatura: number | null = null) {
    this._ObjAsignatura = ObjAsignatura;
    this._idAsignatura = idAsignatura;
  }

  public async SeleccionarAsignaturas(): Promise<asignaturaData[]> {
    const { rows: asignaturas } = await conexion.execute("SELECT * FROM asignatura");
    return asignaturas as asignaturaData[];
  }

  public async SeleccionarAsignaturaPorId(): Promise<asignaturaData | null> {
    const { rows: asignaturas } = await conexion.execute(
      "SELECT * FROM asignatura WHERE idAsignatura = ?",
      [this._idAsignatura],
    );
    const lista = asignaturas as asignaturaData[];
    return lista.length > 0 ? lista[0] : null;
  }

  public async InsertarAsignatura(): Promise<number> {
    const datos = this._ObjAsignatura as asignaturaData;
    const resultado = await conexion.execute(
      "INSERT INTO asignatura (nombreAsignatura, descripcion) VALUES (?, ?)",
      [datos.nombreAsignatura, datos.descripcion ?? null],
    );
    return resultado.lastInsertId ?? 0;
  }

  public async ActualizarAsignatura(): Promise<number> {
    const datos = this._ObjAsignatura as asignaturaData;
    const resultado = await conexion.execute(
      "UPDATE asignatura SET nombreAsignatura = ?, descripcion = ? WHERE idAsignatura = ?",
      [datos.nombreAsignatura, datos.descripcion ?? null, this._idAsignatura],
    );
    return resultado.affectedRows ?? 0;
  }

  public async EliminarAsignatura(): Promise<number> {
    const resultado = await conexion.execute(
      "DELETE FROM asignatura WHERE idAsignatura = ?",
      [this._idAsignatura],
    );
    return resultado.affectedRows ?? 0;
  }
}
