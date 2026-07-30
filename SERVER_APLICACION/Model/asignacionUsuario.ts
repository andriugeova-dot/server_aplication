import { conexion } from "./conexion.ts";

interface asignacionUsuarioData {
  idAsignacionUsuario: number | null;
  idUsuario: number;
  idAsignatura: number;
}

export class AsignacionUsuario {
  public _ObjAsignacionUsuario: asignacionUsuarioData | null;
  public _idAsignacionUsuario: number | null;

  constructor(ObjAsignacionUsuario: asignacionUsuarioData | null = null, idAsignacionUsuario: number | null = null) {
    this._ObjAsignacionUsuario = ObjAsignacionUsuario;
    this._idAsignacionUsuario = idAsignacionUsuario;
  }

  public async SeleccionarAsignacionesUsuario(): Promise<asignacionUsuarioData[]> {
    const { rows: asignaciones } = await conexion.execute("SELECT * FROM asignacionusuario");
    return asignaciones as asignacionUsuarioData[];
  }

  public async SeleccionarAsignacionUsuarioPorId(): Promise<asignacionUsuarioData | null> {
    const { rows: asignaciones } = await conexion.execute(
      "SELECT * FROM asignacionusuario WHERE idAsignacionUsuario = ?",
      [this._idAsignacionUsuario],
    );
    const lista = asignaciones as asignacionUsuarioData[];
    return lista.length > 0 ? lista[0] : null;
  }

  public async InsertarAsignacionUsuario(): Promise<number> {
    const datos = this._ObjAsignacionUsuario as asignacionUsuarioData;
    const resultado = await conexion.execute(
      "INSERT INTO asignacionusuario (idUsuario, idAsignatura) VALUES (?, ?)",
      [datos.idUsuario, datos.idAsignatura],
    );
    return resultado.lastInsertId ?? 0;
  }

  public async ActualizarAsignacionUsuario(): Promise<number> {
    const datos = this._ObjAsignacionUsuario as asignacionUsuarioData;
    const resultado = await conexion.execute(
      "UPDATE asignacionusuario SET idUsuario = ?, idAsignatura = ? WHERE idAsignacionUsuario = ?",
      [datos.idUsuario, datos.idAsignatura, this._idAsignacionUsuario],
    );
    return resultado.affectedRows ?? 0;
  }

  public async EliminarAsignacionUsuario(): Promise<number> {
    const resultado = await conexion.execute(
      "DELETE FROM asignacionusuario WHERE idAsignacionUsuario = ?",
      [this._idAsignacionUsuario],
    );
    return resultado.affectedRows ?? 0;
  }
}
