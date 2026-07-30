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
}
