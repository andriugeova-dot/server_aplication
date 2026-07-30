import { conexion } from "./conexion.ts";

interface programaData {
  idPrograma: number | null;
  nombrePrograma: string;
}

export class Programa {
  public _ObjPrograma: programaData | null;
  public _idPrograma: number | null;

  constructor(ObjPrograma: programaData | null = null, idPrograma: number | null = null) {
    this._ObjPrograma = ObjPrograma;
    this._idPrograma = idPrograma;
  }

  public async SeleccionarProgramas(): Promise<programaData[]> {
    const { rows: programas } = await conexion.execute("SELECT * FROM programa");
    return programas as programaData[];
  }

  public async SeleccionarProgramaPorId(): Promise<programaData | null> {
    const { rows: programas } = await conexion.execute(
      "SELECT * FROM programa WHERE idPrograma = ?",
      [this._idPrograma],
    );
    const lista = programas as programaData[];
    return lista.length > 0 ? lista[0] : null;
  }

  public async InsertarPrograma(): Promise<number> {
    const datos = this._ObjPrograma as programaData;
    const resultado = await conexion.execute(
      "INSERT INTO programa (nombrePrograma) VALUES (?)",
      [datos.nombrePrograma],
    );
    return resultado.lastInsertId ?? 0;
  }

  public async ActualizarPrograma(): Promise<number> {
    const datos = this._ObjPrograma as programaData;
    const resultado = await conexion.execute(
      "UPDATE programa SET nombrePrograma = ? WHERE idPrograma = ?",
      [datos.nombrePrograma, this._idPrograma],
    );
    return resultado.affectedRows ?? 0;
  }

  public async EliminarPrograma(): Promise<number> {
    const resultado = await conexion.execute(
      "DELETE FROM programa WHERE idPrograma = ?",
      [this._idPrograma],
    );
    return resultado.affectedRows ?? 0;
  }
}
