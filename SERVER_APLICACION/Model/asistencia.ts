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

  public async SeleccionarAsistenciaPorId(): Promise<asistenciaData | null> {
    const { rows: asistencias } = await conexion.execute(
      "SELECT * FROM asistencia WHERE idAsistencia = ?",
      [this._idAsistencia],
    );
    const lista = asistencias as asistenciaData[];
    return lista.length > 0 ? lista[0] : null;
  }

  public async SeleccionarAsistenciasPorAprendiz(idAprendiz: number): Promise<asistenciaData[]> {
    const { rows: asistencias } = await conexion.execute(
      "SELECT * FROM asistencia WHERE idAprendiz = ?",
      [idAprendiz],
    );
    return asistencias as asistenciaData[];
  }

  public async InsertarAsistencia(): Promise<number> {
    const datos = this._ObjAsistencia as asistenciaData;
    const resultado = await conexion.execute(
      "INSERT INTO asistencia (idAprendiz, idHFA, fecha, horaEntrada, horaSalida, estado, observacion) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        datos.idAprendiz,
        datos.idHFA,
        datos.fecha,
        datos.horaEntrada ?? null,
        datos.horaSalida ?? null,
        datos.estado ?? "Presente",
        datos.observacion ?? null,
      ],
    );
    return resultado.lastInsertId ?? 0;
  }

  public async ActualizarAsistencia(): Promise<number> {
    const datos = this._ObjAsistencia as asistenciaData;
    const resultado = await conexion.execute(
      "UPDATE asistencia SET idAprendiz = ?, idHFA = ?, fecha = ?, horaEntrada = ?, horaSalida = ?, estado = ?, observacion = ? WHERE idAsistencia = ?",
      [
        datos.idAprendiz,
        datos.idHFA,
        datos.fecha,
        datos.horaEntrada ?? null,
        datos.horaSalida ?? null,
        datos.estado ?? "Presente",
        datos.observacion ?? null,
        this._idAsistencia,
      ],
    );
    return resultado.affectedRows ?? 0;
  }

  public async EliminarAsistencia(): Promise<number> {
    const resultado = await conexion.execute(
      "DELETE FROM asistencia WHERE idAsistencia = ?",
      [this._idAsistencia],
    );
    return resultado.affectedRows ?? 0;
  }
}
