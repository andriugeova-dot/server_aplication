import { conexion } from "./conexion.ts";

interface horarioData {
  idHorario: number | null;
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
}

export class Horario {
  public _ObjHorario: horarioData | null;
  public _idHorario: number | null;

  constructor(ObjHorario: horarioData | null = null, idHorario: number | null = null) {
    this._ObjHorario = ObjHorario;
    this._idHorario = idHorario;
  }

  public async SeleccionarHorarios(): Promise<horarioData[]> {
    const { rows: horarios } = await conexion.execute("SELECT * FROM horario");
    return horarios as horarioData[];
  }

  public async SeleccionarHorarioPorId(): Promise<horarioData | null> {
    const { rows: horarios } = await conexion.execute(
      "SELECT * FROM horario WHERE idHorario = ?",
      [this._idHorario],
    );
    const lista = horarios as horarioData[];
    return lista.length > 0 ? lista[0] : null;
  }

  public async InsertarHorario(): Promise<number> {
    const datos = this._ObjHorario as horarioData;
    const resultado = await conexion.execute(
      "INSERT INTO horario (diaSemana, horaInicio, horaFin) VALUES (?, ?, ?)",
      [datos.diaSemana, datos.horaInicio, datos.horaFin],
    );
    return resultado.lastInsertId ?? 0;
  }

  public async ActualizarHorario(): Promise<number> {
    const datos = this._ObjHorario as horarioData;
    const resultado = await conexion.execute(
      "UPDATE horario SET diaSemana = ?, horaInicio = ?, horaFin = ? WHERE idHorario = ?",
      [datos.diaSemana, datos.horaInicio, datos.horaFin, this._idHorario],
    );
    return resultado.affectedRows ?? 0;
  }

  public async EliminarHorario(): Promise<number> {
    const resultado = await conexion.execute(
      "DELETE FROM horario WHERE idHorario = ?",
      [this._idHorario],
    );
    return resultado.affectedRows ?? 0;
  }
}
