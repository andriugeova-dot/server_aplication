import { conexion } from "./conexion.ts";

interface usuarioData {
  idUsuario: number | null;
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  idRol: number;
}

export class Usuario {
  public _ObjUsuario: usuarioData | null;
  public _idUsuario: number | null;

  constructor(ObjUsuario: usuarioData | null = null, idUsuario: number | null = null) {
    this._ObjUsuario = ObjUsuario;
    this._idUsuario = idUsuario;
  }

  public async SeleccionarUsuarios(): Promise<usuarioData[]> {
    const { rows: usuarios } = await conexion.execute("SELECT * FROM usuario");
    return usuarios as usuarioData[];
  }

  public async SeleccionarUsuarioPorId(): Promise<usuarioData | null> {
    const { rows: usuarios } = await conexion.execute(
      "SELECT * FROM usuario WHERE idUsuario = ?",
      [this._idUsuario],
    );
    const lista = usuarios as usuarioData[];
    return lista.length > 0 ? lista[0] : null;
  }

  /**
   * Usada para llenar el <select> "Usuario" al crear un aprendiz en el
   * panel admin: solo debe listar usuarios con idRol = 1 (aprendiz).
   */
  public async SeleccionarUsuariosPorRol(idRol: number): Promise<usuarioData[]> {
  const { rows: usuarios } = await conexion.execute(
    "SELECT * FROM usuario WHERE idRol = ?",
    [idRol],
  );
  return usuarios as usuarioData[];
  }

  public async SeleccionarUsuarioPorCorreo(correo: string): Promise<usuarioData | null> {
    const { rows: usuarios } = await conexion.execute(
      "SELECT * FROM usuario WHERE correo = ?",
      [correo],
    );
    const lista = usuarios as usuarioData[];
    return lista.length > 0 ? lista[0] : null;
  }

  public async InsertarUsuario(): Promise<number> {
    const datos = this._ObjUsuario as usuarioData;
    const resultado = await conexion.execute(
      "INSERT INTO usuario (nombre, apellido, correo, password, idRol) VALUES (?, ?, ?, ?, ?)",
      [datos.nombre, datos.apellido, datos.correo, datos.password, datos.idRol],
    );
    return resultado.lastInsertId ?? 0;
  }

  public async ActualizarUsuario(): Promise<number> {
    const datos = this._ObjUsuario as usuarioData;
    const resultado = await conexion.execute(
      "UPDATE usuario SET nombre = ?, apellido = ?, correo = ?, password = ?, idRol = ? WHERE idUsuario = ?",
      [datos.nombre, datos.apellido, datos.correo, datos.password, datos.idRol, this._idUsuario],
    );
    return resultado.affectedRows ?? 0;
  }

  public async EliminarUsuario(): Promise<number> {
    const resultado = await conexion.execute(
      "DELETE FROM usuario WHERE idUsuario = ?",
      [this._idUsuario],
    );
    return resultado.affectedRows ?? 0;
  }

}
