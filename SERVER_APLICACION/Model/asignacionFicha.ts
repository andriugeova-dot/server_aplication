import { conexion } from "./conexion.ts";

interface asignacionFichaData{
    idUsuario:number;
    idFicha:number;
}

export class AsignacionFicha{

    public _ObjAsignacion:asignacionFichaData|null;
    public _idUsuario:number|null;

    constructor(ObjAsignacion:asignacionFichaData|null=null,idUsuario:number|null=null){
        this._ObjAsignacion=ObjAsignacion;
        this._idUsuario=idUsuario;
    }

    public async SeleccionarAsignacionesFicha():Promise<asignacionFichaData[]>{
        const {rows:asignaciones}=await conexion.execute("SELECT * FROM AsignacionFicha");
        return asignaciones as asignacionFichaData[];
    }

}