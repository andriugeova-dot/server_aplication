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
}
