import { conexion } from "./conexion.ts";

interface rolData {
  idRol: number | null;
  nombreRol: string;
}

export class Rol {
  public _ObjRol: rolData | null;
  public _idRol: number | null;

  constructor(ObjRol: rolData | null = null, idRol: number | null = null) {
    this._ObjRol = ObjRol;
    this._idRol = idRol;
  }

  public async SeleccionarRoles(): Promise<rolData[]> {
    const { rows: roles } = await conexion.execute("SELECT * FROM rol");
    return roles as rolData[];
  }

  public async SeleccionarRolPorId(): Promise<rolData | null> {
    const { rows: roles } = await conexion.execute(
      "SELECT * FROM rol WHERE idRol = ?",
      [this._idRol],
    );
    const lista = roles as rolData[];
    return lista.length > 0 ? lista[0] : null;
  }

  public async InsertarRol(): Promise<number> {
    const datos = this._ObjRol as rolData;
    const resultado = await conexion.execute(
      "INSERT INTO rol (nombreRol) VALUES (?)",
      [datos.nombreRol],
    );
    return resultado.lastInsertId ?? 0;
  }

  public async ActualizarRol(): Promise<number> {
    const datos = this._ObjRol as rolData;
    const resultado = await conexion.execute(
      "UPDATE rol SET nombreRol = ? WHERE idRol = ?",
      [datos.nombreRol, this._idRol],
    );
    return resultado.affectedRows ?? 0;
  }

  public async EliminarRol(): Promise<number> {
    const resultado = await conexion.execute(
      "DELETE FROM rol WHERE idRol = ?",
      [this._idRol],
    );
    return resultado.affectedRows ?? 0;
  }
}
