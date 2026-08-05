import { conexion } from "./conexion.ts";

interface aprendizData {
  idAprendiz: number | null;
  documento: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  idFicha: number;
  numeroFicha?: string;
  programa?: string;
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
  
  public async SeleccionarAprendizPorId(): Promise<aprendizData | null> {
  const { rows: aprendices } = await conexion.execute(
    `SELECT 
       a.idAprendiz,
       a.nombre,
       a.apellido,
       a.documento,
       a.correo,
       a.telefono,
       a.idFicha,
       f.numeroFicha,
       p.nombrePrograma AS programa
     FROM aprendiz a
     INNER JOIN ficha f ON a.idFicha = f.idFicha
     INNER JOIN programa p ON f.idPrograma = p.idPrograma
     WHERE a.idAprendiz = ?`,
    [this._idAprendiz],
  );
  const lista = aprendices as aprendizData[];
  return lista.length > 0 ? lista[0] : null;
}

  public async SeleccionarAprendizPorCorreo(correo: string): Promise<aprendizData | null> {
    const { rows: aprendices } = await conexion.execute(
      `SELECT
         a.idAprendiz,
         a.nombre,
         a.apellido,
         a.documento,
         a.correo,
         a.telefono,
         a.idFicha,
         f.numeroFicha,
         p.nombrePrograma AS programa
       FROM aprendiz a
       LEFT JOIN ficha f ON a.idFicha = f.idFicha
       LEFT JOIN programa p ON f.idPrograma = p.idPrograma
       WHERE a.correo = ?`,
      [correo],
    );
    const lista = aprendices as aprendizData[];
    return lista.length > 0 ? lista[0] : null;
  }

  public async Seleccionarporficha(): Promise<aprendizData[]> {
  const { rows: aprendices } = await conexion.execute(
    "SELECT * FROM aprendiz WHERE idFicha = ?",
    [this._idAprendiz], // o la propiedad que uses para la ficha
  );
  return aprendices as aprendizData[];
}

  public async InsertarAprendiz(): Promise<number> {
    const datos = this._ObjAprendiz as aprendizData;
    const resultado = await conexion.execute(
      "INSERT INTO aprendiz (documento, nombre, apellido, correo, telefono, idFicha) VALUES (?, ?, ?, ?, ?, ?)",
      [datos.documento, datos.nombre, datos.apellido, datos.correo, datos.telefono, datos.idFicha],
    );
    return resultado.lastInsertId ?? 0;
  }
  

  public async ActualizarAprendiz(): Promise<number> {
    const datos = this._ObjAprendiz as aprendizData;
    const resultado = await conexion.execute(
      "UPDATE aprendiz SET nombre = ?, telefono = ? WHERE idAprendiz = ?",
      [datos.nombre, datos.telefono, this._idAprendiz],
    );
    return resultado.affectedRows ?? 0;
}

  public async EliminarAprendiz(): Promise<number> {
    const resultado = await conexion.execute(
      "DELETE FROM aprendiz WHERE idAprendiz = ?",
      [this._idAprendiz],
    );
    return resultado.affectedRows ?? 0;
  }
}
