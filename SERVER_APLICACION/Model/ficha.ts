import { conexion } from "./conexion.ts";

interface fichaData {
  idFicha: number | null;
  numeroFicha: string;
  jornada: string;
  idPrograma: number;
}

export class Ficha {
  public _ObjFicha: fichaData | null;
  public _idFicha: number | null;

  constructor(ObjFicha: fichaData | null = null, idFicha: number | null = null) {
    this._ObjFicha = ObjFicha;
    this._idFicha = idFicha;
  }

  public async SeleccionarFichas(): Promise<fichaData[]> {
    const { rows: fichas } = await conexion.execute("SELECT * FROM ficha");
    return fichas as fichaData[];
  }

  public async SeleccionarFichaPorId(): Promise<fichaData | null> {
    const { rows: fichas } = await conexion.execute(
      "SELECT * FROM ficha WHERE idFicha = ?",
      [this._idFicha],
    );
    const lista = fichas as fichaData[];
    return lista.length > 0 ? lista[0] : null;
  }

  public async InsertarFicha(): Promise<number> {
    const datos = this._ObjFicha as fichaData;
    const resultado = await conexion.execute(
      "INSERT INTO ficha (numeroFicha, jornada, idPrograma) VALUES (?, ?, ?)",
      [datos.numeroFicha, datos.jornada, datos.idPrograma],
    );
    return resultado.lastInsertId ?? 0;
  }

  public async ActualizarFicha(): Promise<number> {
    const datos = this._ObjFicha as fichaData;
    const resultado = await conexion.execute(
      "UPDATE ficha SET numeroFicha = ?, jornada = ?, idPrograma = ? WHERE idFicha = ?",
      [datos.numeroFicha, datos.jornada, datos.idPrograma, this._idFicha],
    );
    return resultado.affectedRows ?? 0;
  }

  public async EliminarFicha(): Promise<number> {
    const resultado = await conexion.execute(
      "DELETE FROM ficha WHERE idFicha = ?",
      [this._idFicha],
    );
    return resultado.affectedRows ?? 0;
  }
}
