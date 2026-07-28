import { conexion } from "./conexion.ts";

interface asignacionUsuarioData{
    idUsuario:number;
    idAsignatura:number;
}

export class AsignacionUsuario{

    public _ObjAsignacion:asignacionUsuarioData|null;
    public _idUsuario:number|null;

    constructor(ObjAsignacion:asignacionUsuarioData|null=null,idUsuario:number|null=null){
        this._ObjAsignacion=ObjAsignacion;
        this._idUsuario=idUsuario;
    }

    public async SeleccionarAsignaciones():Promise<asignacionUsuarioData[]>{
        const {rows:asignaciones}=await conexion.execute("SELECT * FROM AsignacionUsuario");
        return asignaciones as asignacionUsuarioData[];
    }

}