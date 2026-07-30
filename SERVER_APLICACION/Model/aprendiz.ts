import { conexion } from "./conexion.ts";

interface aprendizData {
  idAprendiz: number | null;
  documento: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  idFicha: number;
}

export class Aprendiz {
  public _ObjAprendiz: aprendizData | null;
  public _idAprendiz: number | null;

  constructor(ObjAprendiz: aprendizData | null = null, idAprendiz: number | null = null) {
    this._ObjAprendiz = ObjAprendiz;
    this._idAprendiz = idAprendiz;
  }

  public async SeleccionarAprendices(): Promise<aprendizData[]> {
    const { rows: aprendices } = await conexion.execute("SELECT * FROM aprendiz");
    return aprendices as aprendizData[];
  }
}
