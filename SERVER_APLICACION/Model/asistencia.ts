import { conexion } from "./conexion.ts";

interface asistenciaData {
  idAsistencia: number | null;
  idAprendiz: number;
  idHFA: number;
  fecha: string;
  horaEntrada?: string;
  horaSalida?: string;
  estado: "Presente" | "Ausente" | "Tarde" | "Justificado";
  observacion?: string;
}

export class Asistencia {
  public _ObjAsistencia: asistenciaData | null;
  public _idAsistencia: number | null;

  constructor(ObjAsistencia: asistenciaData | null = null, idAsistencia: number | null = null) {
    this._ObjAsistencia = ObjAsistencia;
    this._idAsistencia = idAsistencia;
  }

  public async SeleccionarAsistencias(): Promise<asistenciaData[]> {
    const { rows: asistencias } = await conexion.execute("SELECT * FROM asistencia");
    return asistencias as asistenciaData[];
  }
}
