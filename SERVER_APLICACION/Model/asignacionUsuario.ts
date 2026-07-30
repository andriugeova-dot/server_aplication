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
}
