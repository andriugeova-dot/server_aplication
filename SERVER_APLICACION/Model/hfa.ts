import { conexion } from "./conexion.ts";

interface hfaData {
  idHFA: number | null;
  idFicha: number;
  idHorario: number;
  idAsignatura: number;
}

export class HFA {
  public _ObjHFA: hfaData | null;
  public _idHFA: number | null;

  constructor(ObjHFA: hfaData | null = null, idHFA: number | null = null) {
    this._ObjHFA = ObjHFA;
    this._idHFA = idHFA;
  }

  public async SeleccionarHFA(): Promise<hfaData[]> {
    const { rows: hfa } = await conexion.execute("SELECT * FROM hfa");
    return hfa as hfaData[];
  }

  public async SeleccionarHFAPorId(): Promise<hfaData | null> {
    const { rows: hfa } = await conexion.execute(
      "SELECT * FROM hfa WHERE idHFA = ?",
      [this._idHFA],
    );
    const lista = hfa as hfaData[];
    return lista.length > 0 ? lista[0] : null;
  }

  public async InsertarHFA(): Promise<number> {
    const datos = this._ObjHFA as hfaData;
    const resultado = await conexion.execute(
      "INSERT INTO hfa (idFicha, idHorario, idAsignatura) VALUES (?, ?, ?)",
      [datos.idFicha, datos.idHorario, datos.idAsignatura],
    );
    return resultado.lastInsertId ?? 0;
  }

  public async ActualizarHFA(): Promise<number> {
    const datos = this._ObjHFA as hfaData;
    const resultado = await conexion.execute(
      "UPDATE hfa SET idFicha = ?, idHorario = ?, idAsignatura = ? WHERE idHFA = ?",
      [datos.idFicha, datos.idHorario, datos.idAsignatura, this._idHFA],
    );
    return resultado.affectedRows ?? 0;
  }

  public async EliminarHFA(): Promise<number> {
    const resultado = await conexion.execute(
      "DELETE FROM hfa WHERE idHFA = ?",
      [this._idHFA],
    );
    return resultado.affectedRows ?? 0;
  }
}
