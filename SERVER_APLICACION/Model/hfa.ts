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
}
