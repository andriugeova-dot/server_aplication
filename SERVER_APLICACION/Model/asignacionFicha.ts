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
}
