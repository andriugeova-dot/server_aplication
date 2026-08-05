import { conexion } from "./conexion.ts";

interface asignacionFichaData {
  idAsignacionFicha: number | null;
  idUsuario: number;
  idFicha: number;
}

export class AsignacionFicha {
  public _ObjAsignacionFicha: asignacionFichaData | null;
  public _idAsignacionFicha: number | null;

  constructor(ObjAsignacionFicha: asignacionFichaData | null = null, idAsignacionFicha: number | null = null) {
    this._ObjAsignacionFicha = ObjAsignacionFicha;
    this._idAsignacionFicha = idAsignacionFicha;
  }

  public async SeleccionarAsignacionesFicha(): Promise<asignacionFichaData[]> {
    const { rows: asignaciones } = await conexion.execute("SELECT * FROM asignacionficha");
    return asignaciones as asignacionFichaData[];
  }

  public async SeleccionarAsignacionFichaPorId(): Promise<asignacionFichaData | null> {
    const { rows: asignaciones } = await conexion.execute(
      "SELECT * FROM asignacionficha WHERE idAsignacionFicha = ?",
      [this._idAsignacionFicha],
    );
    const lista = asignaciones as asignacionFichaData[];
    return lista.length > 0 ? lista[0] : null;
  }

  public async InsertarAsignacionFicha(): Promise<number> {
    const datos = this._ObjAsignacionFicha as asignacionFichaData;
    const resultado = await conexion.execute(
      "INSERT INTO asignacionficha (idUsuario, idFicha) VALUES (?, ?)",
      [datos.idUsuario, datos.idFicha],
    );
    return resultado.lastInsertId ?? 0;
  }

  public async ActualizarAsignacionFicha(): Promise<number> {
    const datos = this._ObjAsignacionFicha as asignacionFichaData;
    const resultado = await conexion.execute(
      "UPDATE asignacionficha SET idUsuario = ?, idFicha = ? WHERE idAsignacionFicha = ?",
      [datos.idUsuario, datos.idFicha, this._idAsignacionFicha],
    );
    return resultado.affectedRows ?? 0;
  }

  public async EliminarAsignacionFicha(): Promise<number> {
    const resultado = await conexion.execute(
      "DELETE FROM asignacionficha WHERE idAsignacionFicha = ?",
      [this._idAsignacionFicha],
    );
    return resultado.affectedRows ?? 0;
  }
  
    public async SeleccionarFichasInstructor(idUsuario: number) {
    const { rows } = await conexion.execute(
      `SELECT
          f.idFicha,
          f.numeroFicha,
          f.jornada,
          p.nombrePrograma,
          COUNT(a.idAprendiz) AS totalAprendices
       FROM asignacionficha af
       INNER JOIN ficha f
          ON af.idFicha = f.idFicha
       INNER JOIN programa p
          ON f.idPrograma = p.idPrograma
       LEFT JOIN aprendiz a
          ON a.idFicha = f.idFicha
       WHERE af.idUsuario = ?
       GROUP BY f.idFicha, f.numeroFicha, f.jornada, p.nombrePrograma`,
      [idUsuario],
    );

    return rows;
  }
}
