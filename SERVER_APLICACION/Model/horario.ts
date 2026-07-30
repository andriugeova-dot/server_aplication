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
}
