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
}
